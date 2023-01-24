//const { renderSync } = require("sass");


let pokedexData = {
    //Lower the case of the search before fetching data
    searchExtract: function() {
        this.fetchPokemonData(document.querySelector(".search-bar").value.toLowerCase());
    },
    //Fetching the data of the Pokemon
    fetchPokemonData: function(pokemonName){
        fetch("https://pokeapi.co/api/v2/pokemon/"+pokemonName).then((response) => response.json())
        .then((data) => this.validationPokemonInfo(data))
    },
    //Validating the information of the Pokemon
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
            /*
            console.log(`The name of the move that is on the list is: 
            =========================================================`);
            console.log(finalMoveName);
            */

            //This is for the list and display in the block
            moveListArray.push(
                `
                <h2 class="moveListForPokemon">${finalMoveName}</h2>
                `
            );
            let finalString = moveListArray.join("");
            document.querySelector(".move_name_list").innerHTML = finalString;

            const { url } = data.moves[i].move;
            // Verifying that the move is being read
            //console.log(`The url for the move is: 
            //=====================================`);
            //console.log(url);

            //Attempting to use the URL for the move that was extracted
            this.moveListInfo(url);

            i++;
        }
    },
    //Looking up the move list before displaying
    moveListInfo: function(url) {
        fetch(url).then((response) => response.json())
        .then((data) => this.verifyMove(data))
    },
    verifyMove: function(data) {
        //Start out with an empty array
        moveTableArray = [];
        //Information safely extracted after giving the URL
        /*
        console.log(`The information for the move is: 
        ======================================`);
        console.log(data);
        */
        //We need:  accuracy, power, pp, type.name
        const { accuracy, name, power, pp } = data;
        //We need the type of attack:
        const type_attack = data.type.name;
        //Need a damage class:
        const damageClass = data.damage_class.name;
        //Description of the attack
        const { effect } = data.effect_entries[0];
        console.log(`The effect for the attack is: ` + effect);

        const moveNameSplit = name.split("-");
        for (let j=0; j< moveNameSplit.length; j++)
        {
            //Move Name changing to cap on the first letter of each word
            moveNameSplit[j] = moveNameSplit[j][0].toUpperCase() + moveNameSplit[j].substr(1);
        }
        var nameChange = moveNameSplit.join(" ");
        //Capitalize the type of attack
        var typeAttackChange = type_attack.charAt(0).toUpperCase()+type_attack.slice(1);
        var damageClassChange = damageClass.charAt(0).toUpperCase()+damageClass.slice(1);

        //What if the info says null?
        var accuracyNumber;
        var powerNumber;
        if (!accuracy)
        {
            accuracyNumber = "-";
        }
        else
        {
            accuracyNumber = accuracy;
        }

        if (!power)
        {
            powerNumber = "-";
        }
        else
        {
            powerNumber = power;
        }

        console.log(
        `
        Accuracy is: ` + accuracyNumber + `
        Power is: ` + powerNumber + `
        pp is: `+ pp + `
        name is: `+ nameChange + `
        Type of attack: `+ typeAttackChange+`
        Damage class is: `+ damageClassChange);

        moveTableArray.push(
            `
            <p class="accuracy" >Accuracy: ${accuracyNumber} </p>
            <p class="power" >Power: ${powerNumber}</p>
            <p class="pp" >PP: ${pp}</p>
            <p class="name" >Name: ${nameChange}</p>
            <p class="type" >Type: ${typeAttackChange}</p>
            <p class="damageClass" >Damage Class: ${damageClassChange}</p>
            `
        )

        //Writing the code to the HTML
        document.querySelector(".move_block").innerHTML = moveTableArray;
    }
};

let pokedexDataTwo = {
    //Search.  Allow user to capitalize, but lower case the letters to have the data search correctly
    searchExtractTwo: function() {
        this.fetchPokemonDataTwo(document.querySelector(".search-bar").value.toLowerCase());
    },
    fetchPokemonDataTwo: function(pokemonName){
        fetch("https://pokeapi.co/api/v2/pokemon/"+pokemonName).then((response) => response.json())
        .then((data) => this.extractMove(data))
    },
    extractMove(data){
        const moveListNames = data.moves;
        this.nameAndMoveSetUp(data, moveListNames);
    },
    nameAndMoveSetUp(data, moveListNames){

        console.log(`The list of the names are as follows for the nameAndMoveSetup
        =========================================================================`);
        console.log(moveListNames);
        console.log(`The data for the Pokemon is:
        =========================================`);
        console.log(data);
        console.log(`How many moves are there for this Pokemon? ` + moveListNames.length);

        const promises = [];

        for (let j=0; j<moveListNames.length; j++)
        {   
            const { url } = data.moves[j].move;

            //In order for this to work PROPERLY without any issues with the time, we need to make sure that ALL PROMISES are read asynced.  The reason why is because on this particular area, we want to get the information on ALL moves, NOT just one name.  Thus, we need to create PROMISES
            promises.push(fetch(url).then(res => res.json()));
           
        }
        Promise.all(promises).then(results => {
            console.log(`Promise test results: `);
            console.log(results);
            this.nameAndMoveDisplay (data, results);
        })
        
    },
    nameAndMoveDisplay: function (data, moveListTest){

        //name, accuracy, power, pp, type, damage class
        var moveInfoList;
        var moveStoreList = [];
        console.log(`moveListTest data: `);
        console.log(moveListTest);

        console.log(`
        Get the information for the first move List: 
        =========================================================`);
        console.log(moveListTest[0]);

        for (let i = 0; i<moveListTest.length; i++)
        {
            var move_name, accuracy, power, pp, typing, className;
            move_name = moveListTest[i].name;
            accuracy = moveListTest[i].accuracy;
            power = moveListTest[i].power;
            pp = moveListTest[i].pp;
            typing = moveListTest[i].type.name;
            className = moveListTest[i].damage_class.name;

            moveInfoList = {move_name: move_name, accuracy:accuracy, power:power, PP:pp, typing:typing, className:className};

            moveStoreList.push(moveInfoList);

        }

        this.moveAttempt(data, moveStoreList);

    },
    moveAttempt: function(data, moveList){

        //Information:
        //Move List Words for display
        moveListFormatted = [];
        //Typing
        moveTypeListFormatted = [];
        //The Class Name formatted
        moveClassNameFormatted = [];

        //Box design
        boxDesign = [];

        console.log(`
        The information for the moveList is:
        ===================================`);
        console.log(moveList);

        console.log(`
        The information for ${moveList[0]} is the following:
        ===================================================`);
        console.log(`
        Move name: ${moveList[0].move_name}
        Accuracy: ${moveList[0].accuracy}
        Power: ${moveList[0].power}
        PP: ${moveList[0].PP}
        Move Type: ${moveList[0].typing}
        Class Name: ${moveList[0].className}
        Number of moves: ${moveList.length}
        `)

        //Organizing the name to display
        for (let k=0; k<moveList.length; k++)
        {
            const moveNameTemp = moveList[k].move_name;
            //If it detects '-', separate it
            const wordsSplitCap = moveNameTemp.split("-");
    
            //When we detected the move being split, apply this:
            /*
                1.  Separate it when it detects the '-'
                2.  Separate EACH word from the first letter, capatilize it
                3.  Tie together the string with the other letters, but this time, without the first letter
            */
            for (let j=0; j< wordsSplitCap.length; j++)
            {
                wordsSplitCap[j] = wordsSplitCap[j][0].toUpperCase() + wordsSplitCap[j].substr(1);
            }

            //Have finalNameLaytout be the result of the words(s) and have it join with a " " if it's appropriate
            var finalNameLayout = wordsSplitCap.join(" ");

            moveListFormatted.push(finalNameLayout);

            const moveTypeCap = moveList[k].typing;
            const typeListCap = moveTypeCap.charAt(0).toUpperCase() + moveTypeCap.slice(1);
            moveTypeListFormatted.push(typeListCap);

            const classNameCap = moveList[k].className;
            const classNameTest = classNameCap.charAt(0).toUpperCase() + classNameCap.slice(1);
            moveClassNameFormatted.push(classNameTest);

        }
        
        console.log(`
        The format for the name of the list is:
        ===============================`);
        console.log(moveListFormatted);

        console.log(`
        The type of the move format is:
        ===============================`);
        console.log(moveTypeListFormatted);

        console.log(`
        The class name List for the whole thing is:
        ===============================`);
        console.log(moveClassNameFormatted);
        //FINALLY WE CAN CONSTRUCT THE DESIGN
        //Input a move on this:
        //boxDesign
        boxDesign.push(
            `
            <div class="move_block">
                <h2>${moveListFormatted[0]}</h2>
                <p>Type:    ${moveTypeListFormatted[0]}</p>
                <p>PP:  ${moveList[0].PP}</p>
                <p>Power: ${moveList[0].power}</p>
                <p>Category:    ${moveClassNameFormatted[0]}<p>
                <p>Description of the attack will be added a bit later.  Still need
                to find a way to extract the information.</p>
            </div>
            `
        );
        console.log(`
        The Design information for the move so far is:
        =============================================`);
        console.log(boxDesign);
        document.querySelector(".move_list").innerHTML = boxDesign;

    }

};

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter")
    {
        pokedexDataTwo.searchExtractTwo();
    }
});