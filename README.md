# Pokedex_Entry_Project

DATA LOGS
I wanted to add a data log on what's going on each time this is pushed in GitHub.  Starting 01/12/2023, I'll right on the log when pushed and the approximation time that it occurred.  For now, here's the log I did for this time around:

01/12/2023 at 1:20PM
I've decided to go and do a personal project.  I'm one person on this, so this is something I'm going to do what I can to make sure that it is running properly.  HUGE thanks to the PokeAPI for providing the information needed for this project to work.  For now, I'll describe what I did everythiing prior

The first thing I did was look up on how to make a Pokedex using nothing, but CSS.  This is what's showing in the style.css.  This was taken from the site itself to see how to make each individual part.  I want to make my own design, but this helped me understand how things go.  With the rough draft on how things work and how to get it started, I decided to use my own style (style2.css)

With the style2.css, I wanted to see what Pokedex works best.  I thought of using the 3DS model as a basis to see how things go.  For me, the 3DS is probably the best representation on making something mobile and friendly user access.  So it was decided to use this as a base.  I've added things such as button selections for people to click on and interact the Pokedex itself.  I wanted to do a dual screen:  One for the display of the picture of the Pokemon and the bottom (touch interactive) to have the user be able to scroll the information.  The plan is to have the information display such as the bio and moves that the Pokemon can learn.  With all that in mind and the buttons placed, I decided to move on to the next part that does take time:  The API


With the API, I have the design on top so I can work on it in peace.  On the bottom, I have rows to display how it's going to show.  One of the biggest obstacles I've stumbled upon is that for each Pokemon, NONE are capatalized in the API.  So I needed to find a way to lowercase all letters.  That way when the user interacts with the search, even if they should capatalized out of habit, they'll be able to pull up the information.  Speaking of the cases of the letters, though, there's another problem that was stumbled upon:  None of the words in the database are capatalized.  This is a problem since it'll display a bit off on the information.  To counter this, I needed to go back and see how to capatalize each letter.  That's right, I said EACH.  The other problem I ran into was when I looked up Pikachu, the first move was "mega-punch".  I needed to split this into two words, then capatalize the first letter of each word, and then join with a space, causing it to be "Mega Punch" instead.  Typing is another issue I ran into.  Basically, in short, this will help me out with the move problem I'm running into.  Why?  It's all in array.  I needed to learn on how to extract the information from the API again depending on the list.  By following the list and how to read, I am able to extract said information about the Pokemon and the list.  For now, I am able to extract the name, stats, typing, and move list.  For now, I am able to capatalize the letters of the name, typing, and the first move.  Now I need to do the same FOR EACH move to have a better visualization.  More information needs to be extracted from the database, but we'll see what we can do next!

Data Log:  01/12/2023 ~5:45PM
I've added a way for me to extract the information that is on the list and then getting the power, pp, type, and what kind of attack it is.  I've also changed the layout of the words so that the "-" is taking out and replaced with " " as well as capitalizing all first letters of the word that has been split.


Data Log:  01/24/2023
I had to find a way to get the code to work under a different circumstance.  One of the biggest struggles was trying to get the code to output from multiple sources.  After tampering with the code, I was able to find out that there was indeed a way:  Using the All Promise.  

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


When I did this, what it'll do is the follwoing:  With the "promises" as its guidance, I use that as the URL and rather than having it immediately extract the information, I had this go on an array and WAIT for all the promises to be made.  With all the promises then fetched, I then do "Promise.all".  With this, I was able to finally extract the information on the move that was given.  So now all I had to do was simply do this:

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

With the i going on a loop and the moveListTest being the guidance, I then have it go on a loop and extract that information data.  I then have it formed its own information that was changed in accordance to the power, pp, etc.  Afterwards, the array is then stored for further use.

I made a table where the moves will be able to be displayed by a certain size window.  I then have added a scroll in case we need to go down and see what else we can do to search any further moves.  In addition to this, I have another array waiting with the extracted information.


My next task is to get the window to pop up.  My idea now is to click on a certain move and then have that information display on the window to see if it displays the information correctly.  I was able to get the design and the window to pop up as well as being able to close, but now I need to find a way to get the proper information being display in accordance to the move.