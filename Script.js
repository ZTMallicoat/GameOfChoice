//Yy is an empty array that is assigned values from array TextboxT for values 0-3,10-13,20-23, and 30-33.
let Yy = [];
let TextboxT = ["Room 1a", "Room 2a", "Room 3a", "Room 4a", "Room 1b", "Room 2b", "Room 3b", "Room 4b", "Room 1c", "Room 2c", "Room 3c", "Room 4c", "The notorious Danger Mole, oh no!  Run away or he'll attack!", "Room 2d", "A Mysterious Door...", "Room 4d"];
TextInsert = 0;
//All other values are passed as undefined by the for loop below instantiation.
for (i = 0; i <= 33; i++) {
    if (i <= 3 || i <= 13 && i > 9 || i <= 23 && i > 19 || i <= 33 && i > 29) {
        Yy.push(`${TextboxT[TextInsert]} (${i})`);
        TextInsert++;
    }
    else {
        Yy.push(undefined)
    }
}
y = 0;
x = 0;
//Instatiation of variables referenced in the future.
//RoomType is the image referenced by the img on HTML Page.
var RoomType = "FRRoom.png"
//MoleIsPlaying is a bool checking if DangerMole.mp3 is playing and it starts as false.
var MoleIsPlaying = false;
//if this bool is true, JavaTypeBeat cannot play until DangerMole stops playing and this bool is false again.
//Instatiation of music as objects within Javascript environment
var JavaBeat = document.createElement('audio');
JavaBeat.src = 'Music/JavaTypeBeat.mp3';
var DangerMole = document.createElement('audio');
DangerMole.src = 'Music/DangerMole.mp3';
//ScreenCheck() constantly watches for button presses in any of the 4 directions.
function ScreenCheck() {
    document.getElementById("Up").addEventListener("click", () => NextPage(1))
    document.getElementById("Left").addEventListener("click", () => NextPage(2))
    document.getElementById("Down").addEventListener("click", () => NextPage(3))
    document.getElementById("Right").addEventListener("click", () => NextPage(4))
    document.getElementById("Preloader").addEventListener("click", () => Activation())
};

//Once the ugly button is pressed, music plays and the button is removed from being displayed with CSS Javascript manipulation.
//This happens in Activation()

function Activation() {
    JavaBeat.play();
    document.getElementById('Preloader').style.display = "none";
}
//The button functions as a work around for browser safety measures, which ensure that until a user has interacted with a page,
//audio cannot be played from it.

//NextPage() decides based on which direction is selected in ScreenCheck() where the user is trying to go and if they can go there
//based on an imaginary grid represented by Var Coordinate.
//To picture this, imagine a 4 by 4 grid, where the first box is represented by a y value of 0 and an x value of 0.
//this would translate to a Coordinate location of 00 or 0.
// Likewise, if you were in a box 3 y values higher, the Coordinate value would be 30 ()=(y,x)
function NextPage(NumNum) {
    Posx = false;
    Posy = false;
    Negx = false;
    Negy = false;
    if (NumNum == 1) {
        y++
        Posy = true;
    }
    else if (NumNum == 2) {
        x--
        Negx = true;
    }
    else if (NumNum == 3) {
        y--
        Negy = true;
    }
    else if (NumNum == 4) {
        x++
        Posx = true;
    }

//Due to our grid being only a 4x4, as well as having some spaces on the grid remain empty,
//we must filter out which movements the player may NOT make with the code below.
    if (y < 0 || y > 3 || x < 0 || x > 3 || x == 1 && y == 1 || x == 2 && y == 1 || x == 1 && y == 2 || x == 1 && y == 3 || x == 3 && y == 3) {
        document.getElementById("TextBox2").innerHTML = "You Cannot go that way!";
        if (NumNum == 1) {
            if (y == 4 && x == 2) {
                document.getElementById("TextBox2").innerHTML += "  It's Locked..."
            }
            y--
        }
        else if (NumNum == 2 && x > 0) {
            x++
        }
        else if (NumNum == 3) {
            y++
        }
        else if (NumNum == 4) {
            x--
        }
    }
//Once it is confirmed that the player may make a desired move they are directed down the following path,
//which ensures the correct image and music are loaded for the room they have moved into.
    else {
        document.getElementById("TextBox2").innerHTML = "";
    }
    Coordinate = (10 * y) + x;
    if (Coordinate == 0 || Coordinate == 22) {
        RoomType = "Images/FRRoom.png"
    }
    else if (Coordinate == 10 || Coordinate == 13) {
        RoomType = "Images/FRoom.png"
    }
    else if (Coordinate == 20) {
        RoomType = "Images/FERoom.png"
    }
    else if (Coordinate == 30) {
        RoomType = "Images/EncounterRoom.png"
    }
    else if (Coordinate == 1 || Coordinate == 2) {
        RoomType = "Images/LRRoom.png"
    }
    else if (Coordinate == 3) {
        RoomType = "Images/FLRoom.png"
    }
    else if (Coordinate == 23) {
        RoomType = "Images/LRoom.png"
    }
    else if (Coordinate == 32) {
        RoomType = "Images/ExitRoom.png"
    }
    document.getElementById("ImageSpace").src = RoomType;
    document.getElementById("TextBox").innerHTML = Yy[Coordinate]

    if (Coordinate == 30) {
        Music(true)
        MoleIsPlaying = true;
    }
    else if (MoleIsPlaying == true) {
        MoleIsPlaying = false;
        Music(false)
    }
};
//Music() handles music toggling, making sure the songs never overlap and always play from the beginning when switching.
function Music(SongTog) {
    if (SongTog == true) {
        JavaBeat.pause();
        DangerMole.currentTime = 0;
        DangerMole.play();
    }
    else {
        DangerMole.pause();
        JavaBeat.currentTime = 0;
        JavaBeat.play();
    }
}