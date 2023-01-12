

let pokedexData = {
    searchExtract: function() {
        this.fetchPokemonData(document.querySelector(".search-bar").value.toLowerCase());
    },
    fetchPokemonData: function(pokemonName){
        fetch("https://pokeapi.co/api/v2/pokemon/"+pokemonName).then((response) => response.json())
        .then((data) => this.validationPokemonInfo(data))
    },
    validationPokemonInfo: function(data){

        var i =0;

        //Array for the Move List
        moveListArray = [];

        console.log(`This function is working!  With this, we'll be able to extract the Pokemon information from the PokeAPI database!`);
        console.log(`The information for this Pokemon is: `);
        console.log(data);

        const { name } = data;
        const types = data.types[0].type.name;

        document.querySelector(".Name").innerText = name;
        document.querySelector(".Type").innerText = types;


        //This needs to be in a loop for it to work.  Otherwise, data.types[0].type.name ONLY selects the first type
        console.log(`Trying to get the information from a specific line: `);
        console.log(data.types[0].type.name);

        //This is for the stats for the Pokemon.  We need to retrieve this information and then apply it in the dex somehow:

        const { stats } = data;
        console.log(`The information for the stats is: `);
        console.log(stats);
        console.log(`=============================================
        Trying to retrieve the information stats.  This becomes: `);
        console.log(stats[0]);

        const hp = stats[0].base_stat;
        const attack = stats[1].base_stat;
        const defense = stats[2].base_stat;
        const sp_attack = stats[3].base_stat;
        const sp_defense = stats[4].base_stat;
        const speed = stats[5].base_stat;
        const total = hp+attack+defense+sp_attack+sp_defense+speed
        //console.log(name + ` stat for total is: ` + total);

        document.querySelector(".Hp").innerText = "HP: " + hp;
        document.querySelector(".Attack").innerText = "Attack: " + attack;
        document.querySelector(".Defense").innerText = "Defense: " + defense;
        document.querySelector(".Sp_Attack").innerText = "Sp. Attack: " + sp_attack;
        document.querySelector(".Sp_Defense").innerText = "Sp. Defense: " + sp_defense;
        document.querySelector(".Speed").innerText = "Speed: " + speed;
        document.querySelector(".Total").innerText = "Total: " + total;

        //To get the specific name of the move of the Pokemon, do the following:
        //data.moves[0].move.name
        const first_move = data.moves[0].move.name;
        console.log(`The first move for ` + name + `is the following:
        =======================================================`);
        //This is going to be "mega-punch"
        console.log(first_move);
        
        //On the database, there's a '-' on it in case it's a two letter word.  We need to take the '-' out when doing the Dex

        const moveNameExt = first_move;

        //If there's a space between the words:
        const wordsSplitSpace = moveNameExt.split("-");
        console.log(`The words currently are: 
        ========================================
        `+ wordsSplitSpace);

        for (let j = 0; j < wordsSplitSpace.length; j++){
            
            wordsSplitSpace[j] = wordsSplitSpace[j][0].toUpperCase() + wordsSplitSpace[j].substr(1);
        }
        var finalWords = wordsSplitSpace.join(" ");

        console.log(`After the method of capitalizing the words, this is the result:
        =================================================================`);
        console.log(finalWords);

        //Last step to putting in the list:
        document.querySelector(".FirstMove").innerText = finalWords;



        const moveList = data.moves;
        console.log(`The information for the moves are:
        =============================================`);
        console.log(moveList);
        console.log(`The array for the this is: 
        =============================================`);
        console.log(moveList.length);


        while (i<moveList.length)
        {
            console.log(`Counting up: ` + i + `
            ===================================
            Also, the move is: `);
            console.log(data.moves[i].move.name);

            moveListArray.push(
                `
                <h2 class="moveListForPokemon">${data.moves[i].move.name}</h2>
                `
            );
            let finalString = moveListArray.join("");
            document.querySelector(".move_name_list").innerHTML = finalString;

            i++;
        }




    }
};

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter")
    {
        pokedexData.searchExtract();
    }
});