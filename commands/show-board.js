const { SlashCommandBuilder } = require('@discordjs/builders');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');
const TTTM = require('../tictactoe-model.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('show-board')
		.setDescription('Shows your current game of Tic Tac Toe'),
	async execute(interaction) {

        const db = new JsonDB(new Config('db', true, false, '/'));
        const activeGame = db.getData('/' + interaction.member.id + '/activeGame');
        const board = TTTM.stringToArray(db.getData('/' + interaction.member.id + '/board'));

        if (activeGame) {
            await interaction.reply({ content: TTTM.printBoard(board), ephemeral: true });
        } else {
            await interaction.reply({ content: 'No active game. Use /playtictactoe to start a game.', ephemeral: true });
        }
	},
};