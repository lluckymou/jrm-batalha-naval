const { v4: uuidv4 } = require('uuid');

const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;
const io = socketio(server);

// Static folder
app.use(express.static(path.join(__dirname, "static")));

// Start server
server.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});

// Handle a socket connection request from web client
let usedRooms = [];
var players = [];

io.on('connection', socket => {
    const player = {
        id: uuidv4(),
        country: Math.floor(Math.random() * 261),
        room: undefined
    }

    players.push(player);
    console.log(`Jogador novo! Temos ${players.length} jogadores no servidor`);
    
    console.log(`Jogador ${player.id.split('-')[0]} conectado!`);

    // Passa ao jogador sua identidade
    socket.emit('load', {id: player.id, country: player.country});

    // Join room
    socket.on('join-attempt', room => {
        console.log(`Jogador ${player.id.split('-')[0]} vai tentar se conectar a partida ${room}`);
        var fail = 0, wasntEmpty = false, wasntEmptyEnemyFlag = 'none', roomName = "No Room";

        // Verifica se o jogador já está em uma sala
        if(player.room != undefined) {
            fail = 2;
            
        // Encontra sala com aquele nome
        } else {
            var roomID = -1;
            for (i = 0; i < usedRooms.length; i++)
                if(usedRooms[i] != undefined)
                    if(usedRooms[i].name === room) {
                        roomID = i;
                        break;
                    }

            console.log(`Sala encontrada foi a ${i}`);

            // Sala não existe, vai criar uma
            if(roomID === -1) {
                var newRoom = {
                    name: room,
                    players: [player.id],
                    started: false
                };

                // Procura no array de salas uma sala que já fechou (undefined) para usar esse espaço como o lugar da nova sala
                var availiableSlot = -1;
                for (i = 0; i < usedRooms.length; i++)
                    if(usedRooms[i] == undefined) {
                        availiableSlot = i;
                        break;
                    }

                if(availiableSlot === -1) {
                    // Se não achar nada, adiciona a nova sala no final do array
                    usedRooms.push(newRoom);
                    roomID = usedRooms.length-1;
                } else {
                    usedRooms[availiableSlot] = newRoom;
                    roomID = availiableSlot;
                }

                fail = -1;
            
            // Se existir, verifica se há espaço para o jogador entrar
            } else if(usedRooms[roomID].players.length < 2) {

                // Checa se a sala já tinha algum jogador
                if(usedRooms[roomID].players.length > 0) {
                    wasntEmpty = true;

                    // Gets connected player info
                    var connectedPlayer = -1;
                    for (i = 0; i < players.length; i++)
                        if(players[i].id === usedRooms[roomID].players[0]) {
                            connectedPlayer = i;
                            break;
                        }

                    // Salva a informação da bandeira do jogador
                    wasntEmptyEnemyFlag = players[connectedPlayer].country;
                }

                // Coloca o jogador na sala
                usedRooms[roomID].players.push(player.id);

                fail = -1;
            } else fail = 1;

            // Coloca o jogador naquela sala
            if(fail === -1) {
                player.room = roomID;
                roomName = usedRooms[roomID].name;

                console.log(`sala ${roomID}, com jogadores:  ${usedRooms[roomID].players.length > 0?usedRooms[roomID].players[0].split('-')[0] : 'vazio'} e ${usedRooms[roomID].players.length > 1? usedRooms[roomID].players[1].split('-')[0] : 'vazio'} `);
            }
        }

        // Passa ao jogador sua sala e se conseguiu entrar nela
        socket.emit('join', {room: roomID, roomName: roomName, fail : fail, wasntEmpty: wasntEmpty, wasntEmptyEnemyFlag: wasntEmptyEnemyFlag});

        // Passa ao oponente a ação que agora ele está acompanhado
        socket.broadcast.emit('player-join', {room: roomID, player: player, country: player.country});
    });

    // Quando jogador desconecta
    socket.on('disconnect', () => {
        players = players.filter(p => p != player);
        console.log(`Jogador ${player.id.split('-')[0]} desconectou!`);
        console.log(`Agora temos ${players.length} jogadores no servidor.`);
    
        // Se o jogador já estava em uma sala
        if(player.room != undefined)
        {
            if(usedRooms[player.room] == undefined) return;

            // E nela a partida já começou, encerra
            if(usedRooms[player.room].started == true) {
                usedRooms[player.room] = undefined;
                socket.broadcast.emit('game-ended', { player: player, room: player.room });
            
            // Se a partida ainda não começou, remove ele da quantidade de jogadores
            } else {
                var where = usedRooms[player.room].players.indexOf(player.id);
                
                if(where != -1) {
                    usedRooms[player.room].players.splice(where, 1);
                    socket.broadcast.emit('player-disconnect', { player: player, room: player.room });
                }

                if(usedRooms[player.room].players.length == 0)
                    usedRooms[player.room] = undefined;
            }
        }
    });

    // Confirmar participação
    socket.on('confirm', data => {
        socket.broadcast.emit('enemy-ready', { room: data.room, player: data.player });
    });

    // Inicia jogo
    socket.on('start', data => {
        usedRooms[data.room].started = true;

        // Aleatoriza qual dos dois vai iniciar
        var randomFirstPlayer = usedRooms[data.room].players[Math.floor(Math.random() * usedRooms[data.room].players.length)];

        // Manda o comando de inicio para o inimigo
        io.emit('start-game', { room: data.room, player: randomFirstPlayer });
    });

    socket.on('shoot', data => {
        console.log(`Tiro de ${player.id.split('-')[0]} na casa ${data.square}`);

        // Aqui seria legal verificar de quem é o turno para evitar cheats, mas como segurança é opcional, não faremos :)

        socket.broadcast.emit('reveal-check', data);
    });

    socket.on('reveal-confirm', data => {
        io.emit('reveal', data);
    });
});