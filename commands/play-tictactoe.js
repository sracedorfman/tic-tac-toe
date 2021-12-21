const { SlashCommandBuilder } = require('@discordjs/builders');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');
const TTTM = require('../tictactoe-model.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playtictactoe')
		.setDescription('Starts a game of Tic Tac Toe'),
	async execute(interaction) {

        if (interaction.member.roles.cache.has('922685936012251156')) {
            await interaction.reply('You are already a tic tac toe god.');
        } else {
            // const db = new jsoning('./db/boards.json');
            const db = new JsonDB(new Config('db', true, false, '/'));
            const newBoard = '—————————';

            await interaction.reply({ content: 'Use /move y x to enter your move. Top left is 0,0.\n' + TTTM.printBoard(TTTM.stringToArray(newBoard)), ephemeral: true });
            db.push('/' + interaction.member.id + '/activeGame', true);
            db.push('/' + interaction.member.id + '/board', newBoard);
            // interaction.member.roles.add('921418494774501438').catch(console.error);
        }
	},
};