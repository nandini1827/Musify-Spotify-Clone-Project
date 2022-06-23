let songIndex = 0;
let audioElement = new Audio("");
let playMusic = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');

let songItem = Array.from(document.getElementsByClassName('songItem'));
let songs = [
  {
    songName: "You - Armaan Malik", filePath: "songs/1.mp3", coverPath: "covers/10.jpg", time: "03:14"
  },
  {
    songName: "Pehla Pyaar - Kabir Singh", filePath: "songs/2.mp3", coverPath: "covers/9.jpg", time: "04:32"
  },
  {
    songName: "Ranjha - Shershaah", filePath: "songs/3.mp3", coverPath: "covers/8.jpg", time: "03:48"
  },
  {
    songName: "Tera Hone Laga Hoon - AJPKGK", filePath: "songs/4.mp3", coverPath: "covers/7.jpg", time: "05:00"
  },
  {
    songName: "Kasoor Acoustic - Prateek-Kuhad", filePath: "songs/5.mp3", coverPath: "covers/6.jpg", time: "03:31"
  },
  {
    songName: "Tum Se Hi - Jab We Met", filePath: "songs/6.mp3", coverPath: "covers/5.jpg", time: "05:23"
  },
  {
    songName: "Zehnaseeb - Hasee Toh Phasee", filePath: "songs/7.mp3", coverPath: "covers/4.jpg", time: "03:37"
  },
  {
    songName: "Dil Ke Dastakk - Please Find Attached", filePath: "songs/8.mp3", coverPath: "covers/3.jpg", time: "03:03"
  },
  {
    songName: "Tumse Hi Tumse - Anjana Anjani", filePath: "songs/9.mp3", coverPath: "covers/2.jpg", time: "04:23"
  },
  {
    songName: "Raabta - Agent Vinod", filePath: "songs/10.mp3", coverPath: "covers/1.jpg", time: "04:04"
  }
]

songItem.forEach((element, i)=>{
  element.getElementsByTagName('img')[0].src = songs[i].coverPath;
  element.getElementsByClassName('songsName')[0].innerText = songs[i].songName;
  element.getElementsByClassName('timestamp')[0].innerText = songs[i].time;
});

playMusic.addEventListener('click', ()=>{
  if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
  }
  else{
    audioElement.pause();
    masterPlay.classList.add('fa-circle-play');
    masterPlay.classList.remove('fa-circle-pause');
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener('timeupdate', ()=>{
  let progress = parseInt(audioElement.currentTime/audioElement.duration * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () =>{
  Array.from(document.getElementsByClassName('songItem-play')).forEach((element)=>{
    element.classList.add('fa-circle-play');
  });
}

Array.from(document.getElementsByClassName('songItem-play')).forEach((element)=>{
  element.addEventListener('click', (e)=>{
    if(e.target.classList.contains('fa-circle-pause')){
      makeAllPlays();
      audioElement.pause();
      playMusic.classList.add('fa-circle-play');
      playMusic.classList.remove('fa-circle-pause');
    }
    else{
      makeAllPlays();
      gif.style.opacity = 1;
      songIndex = parseInt(e.target.id);
      masterSongName.innerText = songs[songIndex].songName;
      e.target.classList.remove('fa-circle-play');
      e.target.classList.add('fa-circle-pause');
      audioElement.src = 'songs/' + (songIndex+1) + '.mp3';
      audioElement.play();
      playMusic.classList.remove('fa-circle-play');
      playMusic.classList.add('fa-circle-pause');
    }
});
});


document.getElementById('next').addEventListener('click', ()=>{
  makeAllPlays();
  if(songIndex>=9){
    songIndex = 0;
  }
  else{
    songIndex += 1;
  }

  pauseButton = document.getElementById(songIndex.toString());
  pauseButton.classList.remove('fa-circle-play');
  pauseButton.classList.add('fa-circle-pause');

  audioElement.src = 'songs/' + (songIndex+1) + '.mp3';
  audioElement.play();
  masterSongName.innerText = songs[songIndex].songName;
  playMusic.classList.remove('fa-circle-play');
  playMusic.classList.add('fa-circle-pause');

});

document.getElementById('previous').addEventListener('click', ()=>{
  makeAllPlays();
  if(songIndex<=0){
    songIndex = 9;
  }
  else{
    songIndex -= 1;
  }
  audioElement.src = 'songs/' + (songIndex+1) + '.mp3';
  audioElement.play();
  masterSongName.innerText = songs[songIndex].songName;
  playMusic.classList.remove('fa-circle-play');
  playMusic.classList.add('fa-circle-pause');
});

let popupElement = document.getElementById('popup');
let popup;
popupElement.addEventListener('click', ()=>{

  const favAnimation = () =>{
    popup.classList.add("show");
    setTimeout(()=>{
      popup.classList.remove("show");
      popup.classList.add("hide");
    }, 3000);
  }

  if(popupElement.classList.contains('fa-solid')){
    popup = document.getElementById("myPopup");
    favAnimation();
    popupElement.classList.remove('fa-solid');
    popupElement.classList.add('fa-regular');
  }
  else{
    popup = document.getElementById("myPopupAdd");
    favAnimation();
    popupElement.classList.add('fa-solid');
    popupElement.classList.remove('fa-regular');
  }

});

document.getElementById('dropbtn').addEventListener('click', ()=>{
  document.getElementById("myDropdown").classList.add("show");
});

// Close the dropdown if the user clicks outside of it
document.addEventListener('click', (event) => {
  if (!event.target.classList.contains('dropbtn')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let j;
    for (j = 0; j < dropdowns.length; j++) {
      var openDropdown = dropdowns[j];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
});
