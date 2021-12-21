const ticTacToeModel = {

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

    printBoard : function(board) {
        let str = '';
        for (let i = 0; i < 3; i++) {
            str += board[i][0];
            str += ' | ';
            str += board[i][1];
            str += ' | ';
            str += board[i][2];
            if (i < 2) {
                str += '\n—————\n';
            }
        }
        return str;
    }
// eslint-disable-next-line semi
}

// eslint-disable-next-line semi
module.exports = ticTacToeModel