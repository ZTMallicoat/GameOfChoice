let Yy = [];
let TextboxT= ["Room 1a","Room 2a","Room 3a","Room 4a","Room 1b","Room 2b","Room 3b", "Room 4b", "Room 1c", "Room 2c", "Room 3c", "Room 4c", "The notorious Danger Mole, oh no!  Run away or he'll attack!", "Room 2d", "A Mysterious Door...", "Room 4d"];
TextInsert = 0;
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
var RoomType = "FRRoom.png"
var MoleIsPlaying = false;
var JavaBeat = document.createElement('audio');
JavaBeat.src = 'Music/JavaTypeBeat.mp3';
var DangerMole = document.createElement('audio');
DangerMole.src = 'Music/DangerMole.mp3';
document.getElementById('Postloader').style.display = "none";
//replace
//document.getElementById("demo").innerHTML=NumNum;
//with NumNum based
function ScreenCheck() {
    document.getElementById("Up").addEventListener("click", () => NextPage(1))
    document.getElementById("Left").addEventListener("click", () => NextPage(2))
    document.getElementById("Down").addEventListener("click", () => NextPage(3))
    document.getElementById("Right").addEventListener("click", () => NextPage(4))
    document.getElementById("Preloader").addEventListener("click", () => Activation())
};
function Activation() {
    JavaBeat.play();
    document.getElementById('Preloader').style.display = "none";
}
function NextPage(NumNum) {
    Posx = false;
    Posy = false;
    Negx = false;
    Negy = false;
    // document.getElementById("TextBox").innerHTML=TextboxT[NumNum-1];
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