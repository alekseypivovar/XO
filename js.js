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

        const number = Math.pow(sign, pole + 1);
        // Вызов функции из другого файла для отправки на сервер:
        //postRequest(number);

        sign === 2 ? button.innerHTML = "X" : button.innerHTML = "O";

        checkForWinning(sign);
    }
}

// Функция для обработки числа с информацией о ходе оппонента  
// Ее необходимо вызвать из getRequest()
function opponentTurn(number) {
    let pole;
    const log2 = Math.log(number) / Math.log(2);

    Number.isInteger(log2) ? pole = Math.round(log2 - 1) : pole = Math.round(Math.log(number) / Math.log(3) - 1);

    let button = document.getElementById(`pole${pole}`);

    const sign = getSign();
    board[pole] = sign;

    sign === 2 ? button.innerHTML = "X" : button.innerHTML = "O";

    checkForWinning(sign);
}

// Служебная функция для определения того, чей сейчас ход. 
// Пробегает по массиву и считает количество измененных ячеек. Если число нечетное - крестики (2), четное - нолики (3).
function getSign() {
    const turnCount = 1 + board.reduce((sum, currentValue) => {
        if (currentValue !== 1) {
            ++sum;
        }
        return sum;
    }, 0);

    if (Number.isInteger(turnCount / 2)) {
        return 3;
    }
    return 2;
}

// Служебная функция проверки на победу. 
// Думаю есть смысл проверять на победу у клиентов, 
// т.к. непонятно как сервер должен передать клиентам информацию о том, кто победил
//
// Одномерный массив представим в виде лжедвумерного размером size х size:
// 0 1 2
// 3 4 5
// 6 7 8

function checkForWinning(sign) {
    const size = 3;
    // проверка горизонталей:
    for (let firstNumberInRow = 0; firstNumberInRow <= size * 2; firstNumberInRow += size) {
        for (let currentNumberInRow = firstNumberInRow, counter = 1; counter <= size; currentNumberInRow++ , counter++) {
            if (board[currentNumberInRow] !== sign) {
                break;
            }
            if (counter === size) {
            //    showWinner();
            if (sign===2){
            alert(`X WIN!!!`);
            } else {
                alert(`O WIN!!!`);
            }

            }
        }
    }
    // Проверка столбцов:
    for (let firstNumberInColumn = 0; firstNumberInColumn <= size - 1; firstNumberInColumn++) {
        for (let currentNumberInColumn = firstNumberInColumn, counter = 1; counter <= size; currentNumberInColumn += size, counter++) {
            if (board[currentNumberInColumn] !== sign) {
                break;
            }
            if (counter === size) {
            //    showWinner();
            if (sign===2){
                alert(`X WIN!!!`);
                } else {
                    alert(`O WIN!!!`);
                }
            }
        }
    }
    // Проверка диагонали 0-8
    for (let number = 0, counter = 1; counter <= size; number += (size + 1), counter++) {
        if (board[number] !== sign) {
            break;
        }
        if (counter === size) {
        //    showWinner();
        if (sign===2){
            alert(`X WIN!!!`);
            } else {
                alert(`O WIN!!!`);
            }
        }
    }
    // Проверка диагонали 2-6
    for (let number = size - 1, counter = 1; counter <= size; number += (size - 1), counter++) {
        if (board[number] !== sign) {
            break;
        }
        if (counter === size) {
        //    showWinner();
        if (sign===2){
            alert(`X WIN!!!`);
            } else {
                alert(`O WIN!!!`);
            }
        }
    }
    return false;
    /* Справка-обоснование к этой жести:
    Хранить board в одномерном массиве на мой взгляд намного удобнее, чем в двумерном. 
    При этом каждый раз производить преобразование в двумерный массив для проверки на победу слишком расточительно в плане ресурсов.
    Поэтому здесь такие дикие циклы. Но они работают, я все возможные варианты варианты затестил))
    Ну собственно даже в случае двумерного массива джаваскриптовыми методами типа every тут все равно нормально не проверишь, 
    все равно нужен цикл в цикле.
    */
}
/*
export {
    board,
    turn,
    opponentTurn
}
*/