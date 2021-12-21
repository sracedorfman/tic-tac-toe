const { SlashCommandBuilder } = require('@discordjs/builders');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');
const TTTM = require('../tictactoe-model.js');
const wait = require('util').promisify(setTimeout);
// const jsoning = require('jsoning');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('move')
		.setDescription('Enter your move.')
        .addIntegerOption(option =>
            option.setName('y')
                .setDescription('y-coordinate of your move')
                .setRequired(true)
                .addChoice('top', 0)
                .addChoice('middle', 1)
                .addChoice('bottom', 2))
        .addIntegerOption(option =>
            option.setName('x')
                .setDescription('x-coordinate of your move')
                .setRequired(true)
                .addChoice('left', 0)
                .addChoice('middle', 1)
                .addChoice('right', 2)),
	async execute(interaction) {

        const db = new JsonDB(new Config('db', true, false, '/'));
        const activeGame = db.getData('/' + interaction.member.id + '/activeGame');
        const board = TTTM.stringToArray(db.getData('/' + interaction.member.id + '/board'));

        if (activeGame) {
            const move = [interaction.options.getInteger('y'), interaction.options.getInteger('x')];
            if (board[move[0]][move[1]] == '—') {
                board[move[0]][move[1]] = 'X';
                db.push('/' + interaction.member.id + '/board', TTTM.arrayToString(board));
                await interaction.reply({ content: TTTM.printBoard(board), ephemeral: true });
                if (TTTM.checkForWin(board)) {
                    await interaction.followUp({ content: 'You win!', ephemeral: true });
                    db.push('/' + interaction.member.id + '/activeGame', false);
                    return;
                }
                if (TTTM.checkGameOver(board)) {
                    await interaction.followUp({ content: 'Tie game.', ephemeral: true });
                    db.push('/' + interaction.member.id + '/activeGame', false);
                    return;
                }
                await wait(300);
                await interaction.editReply({ content: TTTM.printBoard(board) + '\nI\'m thinking...', ephemeral: true });
                await wait(1000);
                const aiMove = TTTM.getAIMove(board);
                board[aiMove[0]][aiMove[1]] = 'O';
                db.push('/' + interaction.member.id + '/board', TTTM.arrayToString(board));
                await interaction.followUp({ content: TTTM.printBoard(board), ephemeral: true });
                if (TTTM.checkForWin(board)) {
                    await interaction.followUp({ content: 'You lose!', ephemeral: true });
                    db.push('/' + interaction.member.id + '/activeGame', false);
                    return;
                }
                if (TTTM.checkGameOver(board)) {
                    await interaction.followUp({ content: 'Tie game.', ephemeral: true });
                    db.push('/' + interaction.member.id + '/activeGame', false);
                    return;
                }
            } else {
                await interaction.reply({ content: 'That spot is already taken. Try again.', ephemeral: true });
            }
        } else {
            await interaction.reply({ content: 'No active game. Use /playtictactoe to start a game.', ephemeral: true });
        }
	},
};