//const { renderSync } = require("sass");
var modal = document.getElementById(`myModal`);

// Get the button that opens the modal.  Triggers the quesitons
var btn = document.getElementById(`myBtn`);

// Get the <span> element that closes the modal.  AKA, X button
var span = document.getElementsByClassName(`close`)[0];

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

        //move List
        moveListWords = [];

        //Box design
        boxDesign = [];

        var finalMoveList;

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

            //moveListWords
            moveListWords.push(
                `
                <div class="cellMove moveWindow">
                    <p>${k+1}. ${moveListFormatted[k]}</p>
                </div>
                `
            )
            finalMoveList = moveListWords.join("");

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
            <div class="hover_bkgr_fricc">
                <span class="helper"></span>
                <div>
                    <div class="popupCloseButton">&times</div>
                    <h2 class="${moveTypeListFormatted[0]}">${moveListFormatted[0]}</h2>
                    <p>Type:    ${moveTypeListFormatted[0]}</p>
                    <p>PP:  ${moveList[0].PP}</p>
                    <p>Power: ${moveList[0].power}</p>
                    <p>Category:    ${moveClassNameFormatted[0]}<p>
                    <p>Description of the attack will be added a bit later.  Still need
                    to find a way to extract the information.</p>
                </div>
            </div>
            `
        );
        console.log(`
        The list for each move is:
        =============================================`);
        console.log(moveListWords);

        //Put it in the list
        document.querySelector(".moveListOfPokemon").innerHTML = finalMoveList;

        //Able to apply the information in a design
        document.querySelector(".move_list").innerHTML = boxDesign;
    }

};

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter")
    {
        pokedexDataTwo.searchExtractTwo();
    }
});

//Make the block appear funtion
btn.onclick = function() {
    modal.style.display = `block`;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = `none`;
    //Reset the counter
    wordsentence = 0;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = `none`;
    wordsentence = 0;
    }
} 