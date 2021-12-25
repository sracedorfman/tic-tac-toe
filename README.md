# Tic Tac Toe Discord Bot
This is a Discord bot I made with Node.js that uses slash commands to play a text-based tic tac toe game.

## Commands
- /play-tictactoe - starts a new game of tic tac toe
- /move vertical horizontal - enters a move for the player, who is always X and always starts
- /show-board - shows the current board

## Implementation
The bot uses the Discord.js module to implement basic features like registering slash commands, replying to slash commands, and changing roles. Slash commands can be used to play a text-based tic tac toe game against an AI with three difficulty settings. On easy, the AI picks moves randomly, while on hard, the AI uses a minimax algorithm, which makes it impossible for the player to win. On medium difficulty, the AI will mostly move based on the minimax algorithm but has a chance to make a random move, making it possible to beat if you are lucky.