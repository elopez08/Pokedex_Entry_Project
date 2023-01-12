

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
        var k =0;

        //Array for the Move List
        moveListArray = [];
        typeListArray = [];

        console.log(`This function is working!  With this, we'll be able to extract the Pokemon information from the PokeAPI database!`);
        console.log(`The information for this Pokemon is: `);
        console.log(data);

        //Extract the name from the data
        const { name } = data;
        //Extract the typing from the data
        const typings = data.types;

        //Capatalize the first letter of the name
        const capFirstName = name.charAt(0).toUpperCase() + name.slice(1);        

        //Extract the typing from each array (since some Pokemon have 2 typings)
        while (k<typings.length)
        {
           typeListArray.push(data.types[k].type.name);
            k++;
        }
        //With the array made, for each word, capatalize before joining the array
        for (let j=0; j<typeListArray.length; j++)
        {
            //wordsSplitSpace[j][0].toUpperCase() + wordsSplitSpace[j].substr(1);
            typeListArray[j] = typeListArray[j][0].toUpperCase() + typeListArray[j].substr(1);
        }
        //Have the words join together with a "/" symbol
        var finalTyping = typeListArray.join("/");

        //Display the name on the HTML
        document.querySelector(".Name").innerText = capFirstName;
        //Display the typings on the HTML
        document.querySelector(".Type").innerText = finalTyping;


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

        //  This test works to have the first move extracted and displayed
        //console.log(`The first move for ` + name + `is the following:
        //=======================================================`);
        //This is going to be "mega-punch"
        //console.log(first_move);

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
            //console.log(`Counting up: ` + i + `
            //===================================
            //Also, the move is: `);
            //The name that is extracted
            //console.log(data.moves[i].move.name);

            //Split
            const moveNameListSplit = data.moves[i].move.name;
            const moveNameListExt = moveNameListSplit.split("-");

            for (let j=0; j< moveNameListExt.length; j++)
            {
                moveNameListExt[j] = moveNameListExt[j][0].toUpperCase() + moveNameListExt[j].substr(1);
            }
            //Splicing with space
            var finalMoveName = moveNameListExt.join(" ");
            console.log(`The name of the move that is on the list is: 
            =========================================================`);
            console.log(finalMoveName);

            //This is for the list and display in the block
            moveListArray.push(
                `
                <h2 class="moveListForPokemon">${finalMoveName}</h2>
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