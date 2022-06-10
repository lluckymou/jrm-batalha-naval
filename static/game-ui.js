$( document ).ready(function() {
    // Random Photo
    var countries = [ 'CR', 'CN', 'NU', 'NZ', 'NC', 'RS', 'UM', 'GE', 'SL', 'GI', 'PA', 'SC', 'VA', 'IO', 'JM', 'KW', 'BT', 'BN', 'AS', 'GD', 'IR', 'MD', 'BO', 'SG', 'UZ', 'PR', 'ID', 'IN', 'HK', 'EC', 'CI', 'QA', 'LT', 'GM', 'SCOTLAND', 'CU', 'KG', 'MU', 'MK', 'WF', 'FM', 'MT', 'BJ', 'CX', 'MG', 'CW', 'NL', 'ST', 'VN', 'AQ', 'ET', 'US', 'BF', 'DO', 'VC', 'PK', 'LA', 'IQ', 'EU', 'BY', 'VU', 'CH', 'TN', 'AW', 'KR', 'ES', 'NR', 'JO', 'KZ', 'WALES', 'SY', 'AR', 'BH', 'ME', 'PY', 'VE', 'PM', 'GQ', 'EA', 'DJ', 'CZ', 'MM', 'UG', 'CP', 'CL', 'PF', 'TA', 'KY', 'MC', 'ZM', 'TD', 'UN', 'CG', 'LY', 'JE', 'GS', 'ZW', 'SS', 'MY', 'TF', 'TJ', 'BG', 'GP', 'TV', 'AZ', 'KE', 'GL', 'VI', 'BD', 'LC', 'EE', 'CK', 'GG', 'PH', 'BV', 'SN', 'AX', 'AF', 'CC', 'GU', 'LR', 'GN', 'SI', 'HR', 'GY', 'MA', 'BE', 'SE', 'GT', 'MS', 'ENGLAND', 'IC', 'IM', 'KI', 'NE', 'ER', 'MP', 'LI', 'LV', 'TL', 'GH', 'BS', 'AU', 'FR', 'PN', 'MH', 'MZ', 'HN', 'BR', 'PS', 'RO', 'YE', 'PT', 'MN', 'AM', 'SA', 'TC', 'TO', 'MW', 'CY', 'NI', 'IT', 'BQ', 'GA', 'DG', 'BA', 'CM', 'TK', 'TT', 'SB', 'HT', 'TM', 'PE', 'MV', 'TG', 'TR', 'TZ', 'BM', 'XK', 'NF', 'MX', 'KN', 'CA', 'MQ', 'JP', 'AI', 'RE', 'AL', 'CV', 'TH', 'LU', 'DE', 'AT', 'UY', 'MR', 'GR', 'ML', 'OM', 'IE', 'SD', 'BZ', 'NA', 'PG', 'FJ', 'EH', 'NG', 'BL', 'KP', 'RW', 'KM', 'VG', 'CD', 'MO', 'IL', 'SH', 'DM', 'LS', 'NP', 'TW', 'IS', 'SR', 'FK', 'SK', 'ZA', 'LK', 'AC', 'SO', 'BB', 'SJ', 'SX', 'LB', 'SM', 'BW', 'AE', 'HU', 'AD', 'CF', 'SZ', 'AG', 'CO', 'NO', 'BI', 'FO', 'KH', 'AO', 'EG', 'DK', 'PW', 'PL', 'MF', 'SV', 'RU', 'FI', 'DZ', 'GW', 'GF', 'UA', 'GB', 'WS', 'HM', 'YT' ];
    $("#player-profile-picture").attr('src', `nations/${countries[Math.floor(Math.random() * countries.length)]}.svg`);
    $("#enemy-profile-picture").attr('src', `nations/${countries[Math.floor(Math.random() * countries.length)]}.svg`);

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
        if(gameStarted) return;
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

    $( "#confirm" ).click(function() { 
        console.log("iniciou jogo");

        var totalShipCount = 0;
        for (let i = 0; i < p1Grid.length; i++)
            if($(p1Grid[i]).hasClass("taken"))
                totalShipCount++;

        if(totalShipCount < 25) {
            alert('Favor colocar todos os navios para confirmar participação');
            return;
        }

        $( "#confirm" ).addClass("d-none");
        $( "#inventory-container" ).addClass("d-none");
        $( "#rh-player" ).removeClass("d-none");
        
        // Sets squares as clickable
        $( p2Grid ).each(function(index) {
            $(this).on("click", function(){
                revealEnemySquare(this);
            });
        });

        // Inicia o jogo com um turno
        $("#log").text('Partida Iniciada');
        gameStarted = true;
        gameTurn();
    });

    // Boat dragging and dropping
    var selectedName, draggedShip, draggedShipLength;
    var draggedLocations = [];

    const ships = document.querySelectorAll('.ship');
    ships.forEach(ship => ship.addEventListener('dragstart', dragStart));
    ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
        selectedName = e.target.id;
        console.log('Navio Selecionado: ' + selectedName);
    }))

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
            || localCoordinate % 10 < coordinate % 10) 
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