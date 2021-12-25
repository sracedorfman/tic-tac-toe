const { SlashCommandBuilder } = require('@discordjs/builders');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');
const { rewardRoleId } = require('../config.json');
const TTTM = require('../tictactoe-model.js');
const wait = require('util').promisify(setTimeout);
let secret;
try {
    secret = require('../secret.js');
} catch (error) {
    console.log(error);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('move')
		.setDescription('Enter your move.')
        .addIntegerOption(option =>
            option.setName('vertical')
                .setDescription('vertical position of your move')
                .setRequired(true)
                .addChoice('top', 0)
                .addChoice('middle', 1)
                .addChoice('bottom', 2))
        .addIntegerOption(option =>
            option.setName('horizontal')
                .setDescription('horizontal position of your move')
                .setRequired(true)
                .addChoice('left', 0)
                .addChoice('middle', 1)
                .addChoice('right', 2)),
	async execute(interaction) {

        const db = new JsonDB(new Config('db', true, false, '/'));
        const activeGame = db.getData('/' + interaction.member.id + '/activeGame');
        const board = TTTM.stringToArray(db.getData('/' + interaction.member.id + '/board'));
        const difficulty = db.getData('/' + interaction.member.id + '/difficulty');

        if (activeGame) {
            const move = [interaction.options.getInteger('y'), interaction.options.getInteger('x')];
            if (board[move[0]][move[1]] == TTTM.empty) {
                board[move[0]][move[1]] = 'X';
                db.push('/' + interaction.member.id + '/board', TTTM.arrayToString(board));
                await interaction.reply({ content: TTTM.printBoard(board), ephemeral: true });
                if (TTTM.checkForWin(board) == -10) {
                    await wait(200);
                    await interaction.followUp({ content: 'You win!', ephemeral: true });
                    db.push('/' + interaction.member.id + '/activeGame', false);
                    if (difficulty == 'hard') interaction.member.roles.add(rewardRoleId).catch(console.error);
                    return;
                }
                if (TTTM.checkGameOver(board)) {
                    // board = TTTM.stringToArray('XOXOXOXOX');
                    await wait(200);
                    await interaction.followUp({ content: 'Tie game.', ephemeral: true });
                    db.push('/' + interaction.member.id + '/activeGame', false);
                    if (secret != null) {
                        let level;
                        try {
                            level = db.getData('/' + interaction.member.id + '/level');
                        } catch (error) {
                            level = 1;
                            db.push('/' + interaction.member.id + '/level', level);
                        }
                        if (secret.levelPassed(board, level)) {
                            db.push('/' + interaction.member.id + '/level', level + 1);
                        }
                    }
                    return;
                }
                await wait(300);
                await interaction.editReply({ content: TTTM.printBoard(board) + '\nI\'m thinking...', ephemeral: true });
                await wait(1000);
                let aiMove;
                if (difficulty == 'easy') {
                    aiMove = TTTM.getRandomAIMove(board);
                } else if (difficulty == 'medium') {
                    const prob = Math.random();
                    if (prob < 0.9) aiMove = TTTM.findBestAIMove(board); else aiMove = TTTM.getRandomAIMove(board);
                } else {
                    aiMove = TTTM.findBestAIMove(board);
                }
                board[aiMove[0]][aiMove[1]] = 'O';
                db.push('/' + interaction.member.id + '/board', TTTM.arrayToString(board));
                await interaction.followUp({ content: TTTM.printBoard(board), ephemeral: true });
                if (TTTM.checkForWin(board) == 10) {
                    await wait(200);
                    await interaction.followUp({ content: 'You lose!', ephemeral: true });
                    db.push('/' + interaction.member.id + '/activeGame', false);
                    return;
                }
                if (TTTM.checkGameOver(board)) {
                    await wait(200);
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