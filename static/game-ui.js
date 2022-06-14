$( document ).ready(function() {
    // Setup Functions
    function createBoard(grid, squares) {
        for (let i = 0; i < 100; i++) {
            const div = document.createElement("div");
            div.dataset.id = i;
            
            grid.append(div);
            squares.push(div);
        }
    }

    createBoard($(".player-1"), p1Grid);
    createBoard($(".player-2"), p2Grid);

    // User interface Functions
    $( ".ship-container" ).click(function() { $(this).toggleClass("vertical"); });

    p1Grid.forEach(item => item.addEventListener('click', removeShip));

    function removeShip() {
        if(gameStarted || playerReady) return;
        if(!$(this).hasClass("taken")) return;

        var shipToRemove = $(this).attr('class').split(' ')[0];

        console.log('Will return boat: '  + shipToRemove);
        
        for (let i = 0; i < p1Grid.length; i++)
            if($(p1Grid[i]).hasClass(shipToRemove))
            {
                draggedLocations = draggedLocations.filter(indexes => indexes != i);
                $(p1Grid[i]).removeClass(shipToRemove + " taken");
            }

        $(`.${shipToRemove}-container`).removeClass("d-none");
    }

    $( "#shuffle" ).click(function() {
        // Cleans board
        for (let i = 0; i < p1Grid.length; i++)
            if($(p1Grid[i]).removeClass())
            
        // Removes containers
        $( ".ship-container" ).each(function() {
            $(this).addClass("d-none");
        });
    
        // Randomizes ships
        generateShips(p1Grid);
    });

    // Boat dragging and dropping
    var selectedName, draggedShip, draggedShipLength;
    var draggedLocations = [];

    const ships = document.querySelectorAll('.ship');
    ships.forEach(ship => ship.addEventListener('dragstart', dragStart));
    ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
        selectedName = e.target.id;
        console.log('Navio Selecionado: ' + selectedName);
    }));

    p1Grid.forEach(item => item.addEventListener('drop', dragDrop));
    p1Grid.forEach(item => item.addEventListener('dragover', dragOver));
    p1Grid.forEach(item => item.addEventListener('dragstart', dragStart));
    p1Grid.forEach(item => item.addEventListener('dragenter', dragEnter));

    function dragStart() {
        draggedShip = this;
        draggedShipLength = this.childElementCount;
        console.log(draggedShip);
    }
    
    function dragOver(e) { e.preventDefault(); }
    function dragEnter(e) { e.preventDefault(); }

    function dragDrop(e) {
        var shipChildId = $(draggedShip).children().last().attr('id');
        console.log(shipChildId);

        var shipClass = shipChildId.slice(0, -2);
        var vertical = $(draggedShip).hasClass("vertical");
        console.log(shipClass);

        // Qual bloco do navio foi selecionado
        var shipIndex = parseInt(selectedName.substr(-1));

        // Coordenada colocada com referencia ao bloco colocado
        var coordinate = parseInt(this.dataset.id);
        coordinate -= vertical ? shipIndex*10: shipIndex;

        console.log('base coordinate: ' + coordinate);

        // Checks
        for (i = 0; i < draggedShipLength; i++) {
            var fail = false;

            var localCoordinate = coordinate;
            localCoordinate += vertical ? i*10: i;

            if(localCoordinate < 0
            || draggedLocations.includes(localCoordinate)
            || localCoordinate % 10 < coordinate % 10
            || localCoordinate > 99) 
                fail = true;

            if(fail)
            {
                alert('Local inválido para o navio!');
                return;
            }
        }

        // Placement
        for (i = 0; i < draggedShipLength; i++) {
            var localCoordinate = coordinate;
            localCoordinate += vertical ? i*10: i;

            draggedLocations.push(localCoordinate);
            p1Grid[localCoordinate].classList.add(shipClass, 'taken');
        }

        $(draggedShip).addClass("d-none");
    }
});

function startGame() {
    // Sets squares as clickable
    $( p2Grid ).each(function(index) {
        $(this).on("click", function(){
            shootEnemySquare(this);
        });
    });

    // Inicia o jogo com um turno
    gameStarted = true;
    gameTurn();
};