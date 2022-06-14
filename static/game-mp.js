// Conecta player
const socket = io();

var myId = undefined;
var myRoom = undefined;
var hasOponent = false;

socket.on('load', data => {
    myId = data.id;

    $("#player-profile-picture, .lobby-profile").attr('src', `nations/${nations[data.country].image}.svg`);
    $(".who-am-i").text(nations[data.country].name);
});

// Implementação multiplayer batalha naval
$( document ).ready(function() {

    // Game Multiplayer listeners
    socket.on('player-join', data => {
        if(data.player != myId && data.room == myRoom) {
            hasOponent = true;
            $( "#turn-player" ).text("Oponente entrou na partida.");
            $("#enemy-profile-picture").attr('src', `nations/${nations[data.country].image}.svg`);
            $(".who-is-my-enemy").text(nations[data.country].name);
        }
    });

    socket.on('join', data => {
        if (data.fail != -1) {
            switch(data.fail) {
                case 1:
                    alert("A sala requisitada já possui dois jogadores.");
                    break;
                case 2:
                    alert("Você já está em uma sala, recarregue a página para entrar em outra.");
                    break;
                default:
                    alert("Não foi possível entrar nessa sala");
                    break;
            }
            
            return;    
        }

        $( "#main-game" ).removeClass("d-none");
        $( "#lobby" ).addClass("d-none");
        $( "#roomCode" ).attr("placeholder", data.roomName);
        $( "#log" ).html(`Batalha Naval - ${data.roomName}<span class="text-muted">#${data.room}</span>`);
        
        if(data.wasntEmpty) {
            hasOponent = true;
            $( "#turn-player" ).text("Esperando seu posicionamento de navios.");
            $("#enemy-profile-picture").attr('src', `nations/${nations[data.wasntEmptyEnemyFlag].image}.svg`);
            $(".who-is-my-enemy").text(nations[data.wasntEmptyEnemyFlag].name);
        } else $( "#turn-player" ).text("Esperando um inimigo.");

        myRoom = data.room;
    });

    // Lobby
    $( "#submit-room-enter-code" ).click(function() { findRoom(); });

    function findRoom() {
        console.log("Player join room attempt");
        var roomName = $( "#room-enter-code" ).val();
        if(empty(roomName)) return;
        
        // Will try to join room
        socket.emit('join-attempt', roomName);
    }

    socket.on('player-disconnect', data => {
        if(data.player != myId && data.room == myRoom) {
            hasOponent = false;
            $( "#turn-player" ).text("Oponente saiu na partida.");
            $("#enemy-profile-picture").attr('src', '');
            $(".who-is-my-enemy").text("");

            if(playerReady) {
                playerReady = false;
                $( "#confirm" ).removeClass("d-none");
                $( "#inventory-container" ).removeClass("d-none");
                $( "#rh-player" ).addClass("d-none");
            }
        }
    });

    // Controles do jogo
    $( "#confirm" ).click(function() {
        if(!hasOponent){
            alert('Espere um oponente entrar na sala para confirmar participação!');
            return;
        }

        var totalShipCount = 0;
        for (let i = 0; i < p1Grid.length; i++)
            if($(p1Grid[i]).hasClass("taken"))
                totalShipCount++;

        if(totalShipCount < 25) {
            $( "#turn-player" ).text('Favor colocar todos os navios para confirmar participação');
            return;
        }

        console.log("Jogador confirmado!");
        playerReady = true;

        socket.emit('confirm', { room: myRoom, player: myId });
        
        if(enemyReady) {
            socket.emit('start', { room: myRoom, player: myId });
        } else {
            $( "#turn-player" ).text("Esperando seu inimigo posicionar os navios.");
        }

        $( "#confirm" ).addClass("d-none");
        $( "#inventory-container" ).addClass("d-none");
        $( "#rh-player" ).removeClass("d-none");
    });

    socket.on('enemy-ready', data => {
        if(myRoom != data.room) return;
        if(data.player == myId) return;
        
        enemyReady = true;
        if(!playerReady)
            $( "#turn-player" ).text("Inimigo está pronto. Esperando seu posicionamento de navios.");
    });

    socket.on('start-game', data => {
        if(data.room == myRoom) {
            if(!playerReady || gameStarted) {
                alert("Fatal! Jogo não pôde ser inicializado.");
                location.reload();
                return;
            } else {
                currentPlayer = ((data.player == myId) ? 'user' : 'enemy');
                startGame();
            }
        }
    });

    socket.on('game-ended', data => {
        if(data.player != myId && data.room == myRoom) {
            if(!gameEnded)
                alert("Fatal! O oponente abandonou a partida. Fechando sala...");
            location.reload();
        }
    });

    socket.on('reveal-check', data => {
        if(data.player != myId && data.room == myRoom) {
            if ($(p1Grid[data.square]).hasClass('hit')) return;

            $(p1Grid[data.square]).addClass('hit');
            
            // Se acertou tiro
            var hit = false;
            if($(p1Grid[data.square]).hasClass('taken'))
                hit = $(p1Grid[data.square]).attr('class').split(' ')[0]

            // Quantos navios daquele tipo ainda faltam
            var left = 99;
            if(hit) left = $(`.player-1 .${hit}:not(.hit)`).length;

            socket.emit('reveal-confirm', { room: myRoom, player: myId, square: data.square, hit: hit, left: left });
        }
    });

    socket.on('reveal', data => {
        if(data.room != myRoom) return;
        
        // Acertou algo
        if(data.hit !== false) {
            $("#log").text(`${who()} acertou o tiro`);
            
            if(data.player == myId) {
                damageTaken++;
            } else {
                $(p2Grid[data.square]).addClass('hit');
                damageDealt++;
            }

            // Checa os danos para verificar se alguém ganhou o jogo
            checkDamage((data.player === myId), data.hit, data.left);
        
        // Errou
        } else {
            if(data.player != myId)
                $(p2Grid[data.square]).addClass('miss');
                
            $("#log").text(`${who()} errou o tiro`);
        
            // Troca quem está atirando
            currentPlayer = data.player === myId ? 'user' : 'enemy';
            gameTurn();
        }
    });
});

function shootEnemySquare(square) {
    if(gameEnded || currentPlayer != 'user') return;

    socket.emit('shoot', { room: myRoom, player: myId, square: p2Grid.indexOf(square) });
}

function updateP2Status() {
    
}

function empty(e) {
    switch (e) {
        case "":
        case 0:
        case "0":
        case null:
        case false:
        case undefined:
            return true;
        default:
            return false;
    }
}