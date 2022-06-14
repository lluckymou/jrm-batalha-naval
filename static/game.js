// Variáveis globais
var currentPlayer = 'user';
var p1Grid = [], p2Grid = [];
var damageTaken = 0, damageDealt = 0;
var gameStarted = false, gameEnded = false;
var p1FirstOneSunk = false, p1SecondOneSunk = false, p1ThirdOneSunk = false, p1FourthOneSunk = false, p1FirstTwoSunk = false, p1SecondTwoSunk = false, p1ThirdTwoSunk = false, p1FirstThreeSunk = false, p1SecondThreeSunk = false, p1FourSunk = false, p1FiveSunk = false; 
var p2FirstOneSunk = false, p2SecondOneSunk = false, p2ThirdOneSunk = false, p2FourthOneSunk = false, p2FirstTwoSunk = false, p2SecondTwoSunk = false, p2ThirdTwoSunk = false, p2FirstThreeSunk = false, p2SecondThreeSunk = false, p2FourSunk = false, p2FiveSunk = false; 
var enemyReady = false, playerReady = false;

// Game Functions
function gameTurn() {
    if (gameEnded || !gameStarted) return;

    if (currentPlayer == 'user') {
        $("#player-profile-picture").addClass("active");
        $("#enemy-profile-picture").removeClass("active");
        
        $("#turn-player").text('Seu Turno');
    }

    if (currentPlayer == 'enemy') {
        $("#enemy-profile-picture").addClass("active");
        $("#player-profile-picture").removeClass("active");

        $("#turn-player").text('Turno do Oponente');
    }
}

function checkDamage(isUser, shipType, left) {
    // Checks for a new ship destroyed
    isSunk(isUser, shipType, left);

    // Checks for game over
    if (damageDealt >= 25) {
        $("#log").text("Você venceu, parabéns!");
        $("#player-profile-picture").addClass("winner");
        gameEnded = true;
    }

    if (damageTaken >= 25) {
        $("#log").text("O oponente venceu!");
        $("#enemy-profile-picture").addClass("winner");
        gameEnded = true;
    }

    // Game Over
    if(gameEnded)
    {
        $("#enemy-profile-picture").removeClass("active");
        $("#player-profile-picture").removeClass("active");
        $("#turn-player").text('Jogo encerrado. Recarregue a página para jogar novamente.');
    }
}

function who() { return currentPlayer == 'user' ? "Você": "O oponente" }

function isSunk(isUser, ship, left) {
    if(left <= 0)
    {
        var shipName = 'none';

        switch(ship) {
            case "first-one-ship":
                if(isUser) p1FirstOneSunk = true;
                else p2FirstOneSunk = true;
                shipName = "Hidroavião 1";
                break;

            case "second-one-ship":
                if(isUser) p1SecondOneSunk = true;
                else p2SecondOneSunk = true;
                shipName = "Hidroavião 2";
                break;

            case "third-one-ship":
                if(isUser) p1ThirdOneSunk = true;
                else p2ThirdOneSunk = true;
                shipName = "Hidroavião 3";
                break;

            case "fourth-one-ship":
                if(isUser) p1FourthOneSunk = true;
                else p2FourthOneSunk = true;
                shipName = "Hidroavião 4";
                break;

            case "first-two-ship":
                if(isUser) p1FirstTwoSunk = true;
                else p2FirstTwoSunk = true;
                shipName = "Submarino 1";
                break;

            case "second-two-ship":
                if(isUser) p1SecondTwoSunk = true;
                else p2SecondTwoSunk = true;
                shipName = "Submarino 2";
                break;

            case "third-two-ship":
                if(isUser) p1ThirdTwoSunk = true;
                else p2ThirdTwoSunk = true
                shipName = "Submarino 3";
                break;

            case "first-three-ship":
                if(isUser) p1FirstThreeSunk = true;
                else p2FirstThreeSunk = true;
                shipName = "Destróier 1";
                break;

            case "second-three-ship":
                if(isUser) p1SecondThreeSunk = true;
                else p2SecondThreeSunk = true;
                shipName = "Destróier 2";
                break;

            case "four-ship":
                if(isUser) p1FourSunk = true;
                else p2FourSunk = true
                shipName = "Cruzador";
                break;

            case "five-ship":
                if(isUser) p1FiveSunk = true;
                else p2FiveSunk = true;
                shipName = "Porta-aviões";
                break;

        }

        $("#log").text(`${who()} afundou o ${shipName}`);
    }
}

// Random ship generation
function generateShips(grid) {
    generate(
        {
            name: 'first-one-ship',
            base_coordinates: [ [0], [0] ]
        },
        grid
    )
    generate(
        {
            name: 'second-one-ship',
            base_coordinates: [ [0], [0] ]
        },
        grid
    )
    generate(
        {
            name: 'third-one-ship',
            base_coordinates: [ [0], [0] ]
        },
        grid
    )
    generate(
        {
            name: 'fourth-one-ship',
            base_coordinates: [ [0], [0] ]
        },
        grid
    )
    generate(
        {
            name: 'first-two-ship',
            base_coordinates: [ [0, 1], [0, 10] ]
        },
        grid
    )
    generate(
        {
            name: 'second-two-ship',
            base_coordinates: [ [0, 1], [0, 10] ]
        },
        grid
    )
    generate(
        {
            name: 'third-two-ship',
            base_coordinates: [ [0, 1], [0, 10] ]
        },
        grid
    )
    generate(
        {
            name: 'first-three-ship',
            base_coordinates: [ [0, 1, 2], [0, 10, 20] ]
        },
        grid
    )
    generate(
        {
            name: 'second-three-ship',
            base_coordinates: [ [0, 1, 2], [0, 10, 20] ]
        },
        grid
    )
    generate(
        {
            name: 'four-ship',
            base_coordinates: [ [0, 1, 2, 3], [0, 10, 20, 30] ]
        },
        grid
    )
    generate(
        {
            name: 'five-ship',
            base_coordinates: [ [0, 1, 2, 3, 4], [0, 10, 20, 30, 40] ]
        },
        grid
    )
}

// Gera navios do inimigo
function generate(ship, grid) {
    let randomDirection = Math.floor(Math.random() * ship.base_coordinates.length);
    let current = ship.base_coordinates[randomDirection];

    if (randomDirection === 0) direction = 1;
    if (randomDirection === 1) direction = 10;

    let randomStart = Math.abs(Math.floor(Math.random() * grid.length - (ship.base_coordinates[0].length * direction)));

    const isTaken = current.some(index => grid[randomStart + index].classList.contains('taken'));
    const isAtRightEdge = current.some(index => (randomStart + index) % 10 === 10 - 1);
    const isAtLeftEdge = current.some(index => (randomStart + index) % 10 === 0);

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge)
        current.forEach(index => $(grid[randomStart + index]).addClass(ship.name + ' taken'));

    else generate(ship, grid);
}