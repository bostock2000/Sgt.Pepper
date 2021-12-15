window.addEventListener(
    "keydown",
    function(event){
        if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1){
            event.preventDefault();
        }
    },
    false
);

let songArray = [
    "audio/The Beatles - Sgt. Pepper's Lonely Hearts Club Band.mp3",
    "audio/The Beatles - With a Little Help from My Friends.mp3",
    "audio/The Beatles - Lucy in the Sky with Diamonds.mp3",
    "audio/The Beatles - Getting Better.mp3",
    "audio/The Beatles - Fixing a Hole.mp3",
    "audio/The Beatles - She's Leaving Home.mp3",
    "audio/The Beatles - Being for the Benefit of Mr. Kite!.mp3",
    "audio/The Beatles - Within You Without You.mp3",
    "audio/The Beatles - When I'm Sixty-Four.mp3",
    "audio/The Beatles - Lovely Rita.mp3",
    "audio/The Beatles - Good Morning Good Morning.mp3",
    "audio/The Beatles - Sgt. Pepper's Lonely Hearts Club Band (Reprise).mp3",
    "audio/The Beatles - A Day in the Life.mp3"
];

let currentSong = 0;
let song = new Audio();
window.onload = function(){
    playSong();
};

function playSong() {
    song.src = songArray[currentSong];
    document.getElementById("title").textContent = songArray[currentSong].slice(20, -4);
}

function playOrPause() {
    if (song.paused) {
        song.play();
        document.getElementById("play").src = "images/pause.png";
    } else {
        song.pause();
        document.getElementById("play").src = "images/play.png";
    }
}

song.addEventListener("timeupdate", function() {
    convertTime(song.currentTime);
    if (song.ended) {
        next();
    }
});

function convertTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    document.getElementById("currentTime").textContent = min + ":" + sec;
    totalTime(Math.floor(song.duration));
}

function totalTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    document.getElementById("currentTime").textContent += " / " + min + ":" + sec;
}

function next() {
    currentSong++;
    if (currentSong >= songArray.length) {
        currentSong = 0;
    }
    playSong();
    song.play();
    document.getElementById("play").src = "images/pause.png";
}

function prev() {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songArray.length - 1;
    }
    playSong();
    song.play();
    document.getElementById("play").src = "images/pause.png";
}

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 39) {
        next();
    } else if (event.keyCode === 37) {
        prev();;
    } else if (
        event.keyCode === 32
    ) {
        playOrPause();
    }
});

document.getElementById("volumeSlider").addEventListener("mousemove", setvolume);

function setvolume() {
    song.volume = document.getElementById("volumeSlider").value / 100;
}


