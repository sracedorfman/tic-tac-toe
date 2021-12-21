/* eslint-disable comma-dangle */
const ticTacToeModel = {

    empty : '—',

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

    getAIMove : function(board) {
        let move = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)];
        while (board[move[0]][move[1]] != ticTacToeModel.empty) {
            move = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)];
        }
        return move;
    },

    checkForWin : function(board) {
        const empty = ticTacToeModel.empty;
        for (let i = 0; i < 3; i++) {
            let temp = board[i][0];
            if (temp == board[i][1] && temp == board[i][2] && temp != empty) return true;
            temp = board[0][i];
            if (temp == board[1][i] && temp == board[2][i] && temp != empty) return true;
        }

        const temp = board[1][1];
        return ((board[0][0] == temp && temp == board[2][2] && temp != empty) ||
                (board[0][2] == temp && temp == board[2][0] && temp != empty));
    },

    checkGameOver : function(board) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == ticTacToeModel.empty) return false;
            }
        }
        return true;
    },

    printBoard : function(board) {
        let str = '';
        for (let i = 0; i < 3; i++) {
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