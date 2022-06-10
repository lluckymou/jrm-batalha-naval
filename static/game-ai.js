// Enquanto não fazemos a integração com o node, um jogador robô será usado para testar a funcionalidade do jogo

// Gera um tabuleiro para o """bot"""
$( document ).ready(function() {
    generateShips(p2Grid);
});

// Escolhe um lugar aleatório para acertar
function randomShot() {
    var random = Math.floor(Math.random() * p1Grid.length);

    if (!$(p1Grid[random]).hasClass('hit')) {
        $(p1Grid[random]).addClass('hit');
        
        if ($(p1Grid[random]).hasClass('taken'))
        {
            damageTaken++;
            $("#log").text(`${who()} acertou o tiro`);
            checkDamage($(p1Grid[random]).attr('class').split(' ')[0]);
        } else $("#log").text(`${who()} errou o tiro`);
    } else randomShot();

    if(gameEnded) return;

    currentPlayer = 'user';
    gameTurn();
}