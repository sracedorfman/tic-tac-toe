const { SlashCommandBuilder } = require('@discordjs/builders');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');
const TTTM = require('../tictactoe-model.js');
// const jsoning = require('jsoning');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('move')
		.setDescription('Starts a game of Tic Tac Toe')
        .addIntegerOption(option =>
            option.setName('x')
                .setDescription('x position of your move')
                .setRequired(true)
                .addChoice('left', 0)
                .addChoice('middle', 1)
                .addChoice('right', 2))
        .addIntegerOption(option =>
            option.setName('y')
                .setDescription('x position of your move')
                .setRequired(true)
                .addChoice('top', 0)
                .addChoice('middle', 1)
                .addChoice('bottom', 2)),
	async execute(interaction) {

        const db = new JsonDB(new Config('db', true, false, '/'));
        const activeGame = db.getData('/' + interaction.member.id + '/activeGame');
        const board = TTTM.stringToArray(db.getData('/' + interaction.member.id + '/board'));
        console.log(board[0][0]);

        if (activeGame) {
            board[interaction.options.getInteger('y')][interaction.options.getInteger('x')] = 'X';
            db.push('/' + interaction.member.id + '/board', TTTM.arrayToString(board));
            await interaction.reply(TTTM.printBoard(board));
        } else {
            await interaction.reply({ content: 'No active game. Use /playtictactoe to start a game.', ephemeral: true });
        }
	},
};