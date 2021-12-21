/* eslint-disable comma-dangle */
const ticTacToeModel = {

    empty : '—',
    player : 'X',
    bot : 'O',

    stringToArray : function(strBoard) {
        const board = new Array(3).fill(0).map(() => new Array(3).fill('f'));
        for (let i = 0; i < 9; i++) {
            board[Math.floor(i / 3)][i % 3] = strBoard[i];
        }
        return board;
    },

    arrayToString : function(board) {
        let strBoard = '';
        for (let i = 0; i < 9; i++) {
            strBoard += board[Math.floor(i / 3)][i % 3];
        }
        return strBoard;
    },

    getRandomAIMove : function(board) {
        let move = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)];
        while (board[move[0]][move[1]] != this.empty) {
            move = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)];
        }
        return move;
    },

    checkGameOver : function(board) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == this.empty) return false;
            }
        }
        return true;
    },

    checkForWin : function(board) {
        const empty = this.empty;
        for (let i = 0; i < 3; i++) {
            let temp = board[i][0];
            if (temp == board[i][1] && temp == board[i][2] && temp != empty) {
                if (temp == this.bot) return 10; else return -10;
            }
            temp = board[0][i];
            if (temp == board[1][i] && temp == board[2][i] && temp != empty) {
                if (temp == this.bot) return 10; else return -10;
            }
        }

        const temp = board[1][1];
        if ((board[0][0] == temp && temp == board[2][2] && temp != empty) ||
            (board[0][2] == temp && temp == board[2][0] && temp != empty)) {
                if (temp == this.bot) return 10; else return -10;
            }
        return 0;
    },

    minimax : function(board, depth, isMax) {
        const score = this.checkForWin(board);

        if (this.checkGameOver(board) || score != 0) return score;

        if (isMax) {
            let best = -1000;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] == this.empty) {
                        board[i][j] = this.bot;
                        best = Math.max(best, this.minimax(board, depth + 1, !isMax));
                        board[i][j] = this.empty;
                    }
                }
            }
            return best - depth;
        } else {
            let best = 1000;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] == this.empty) {
                        board[i][j] = this.player;
                        best = Math.min(best, this.minimax(board, depth + 1, !isMax));
                        board[i][j] = this.empty;
                    }
                }
            }
            return best + depth;
        }
    },

    findBestAIMove : function(board) {
        let bestVal = -1000;
        const bestMove = [-1, -1];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == this.empty) {
                    board[i][j] = this.bot;
                    const moveVal = this.minimax(board, 0, false);
                    board[i][j] = this.empty;

                    if (moveVal > bestVal) {
                        bestMove[0] = i;
                        bestMove[1] = j;
                        bestVal = moveVal;
                    }
                }
            }
        }

        return bestMove;
    },

    printBoard : function(board) {
        let str = '';
        for (let i = 0; i < 3; i++) {
            str += ' ';
            for (let j = 0; j < 3; j++) {
                str += board[i][j];
                if (j < 2) str += ' | ';
            }
            if (i < 2) str += '\n—————\n';
        }
        return str;
    }
// eslint-disable-next-line semi
}

// eslint-disable-next-line semi
module.exports = ticTacToeModel