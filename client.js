// import showWinner(), postRequest() !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 

// Массив, содержащий все значения на доске. 
// Здесь и далее: 1 - пусто, 2 - 'Х', 3 - 'О'
let board = [1, 1, 1, 1, 1, 1, 1, 1, 1];

// Функция преобразования значения в поле в число. Проверка поля на возможность хода,
function turn(pole) {
    if (board[pole] === 1) {
        let button = document.getElementById(`pole${pole}`);
        const sign = getSign();
        board[pole] = sign;
        
        const number = Math.pow(sign, pole+1);
        // Вызов функции из другого файла для отправки на сервер:
        postRequest(number);
        
        sign===2 ? button.innerHTML="X" : button.innerHTML="O";
       
        checkForWinning(sign);
    }
}

// Функция для обработки числа с информацией о ходе оппонента  
// Ее необходимо вызвать из getRequest()
function opponentTurn(number) {
    let pole;
    const log2=Math.log(number)/Math.log(2);

    Number.isInteger(log2) ? pole=Math.round(log2-1) : pole = Math.round(Math.log(number)/Math.log(3)-1);

    let button = document.getElementById(`pole${pole}`);
    
    const sign = getSign();
    board[pole] = sign;

    sign===2 ? button.innerHTML="X" : button.innerHTML="O";
       
    checkForWinning(sign);
}

// Служебная функция для определения того, чей сейчас ход. 
// Пробегает по массиву и считает количество измененных ячеек. Если число нечетное - крестики (2), четное - нолики (3).
function getSign() {
    const turnCount = 1 + board.reduce((sum, currentValue) => {
        if (currentValue!==1){
            ++sum;
        }
        return sum;
    },0);
  
    if (Number.isInteger(turnCount/2)){
        return 3;
    }
    return 2;
}

// Служебная функция проверки на победу. 
// Думаю есть смысл проверять на победу у клиентов, 
// т.к. непонятно как сервер должен передать клиентам информацию о том, кто победил
function checkForWinning(sign) {
    // Реализация!!
    showWinner();
}

export {
    board,
    turn,
    opponentTurn
}