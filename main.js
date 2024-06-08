const searchElement = document.getElementById("search-bar-element");
const  musicCategoryElement = document.getElementById("music-categories-element");
const  musicPlayerElement = document.getElementById("music-player-element");
const audioElement = document.getElementById("audio-element");

const playerBackBtn = document.getElementById("player-back-btn-element");
const playerBtnImageElement = document.getElementById("player-btn-image-element");
const playerBtnElement = document.getElementById("player-btn-element");

const musicCoverImageElement = document.getElementById("cover-img-element");

async function fetchDataMusic() {
  const musicRequest = await fetch("./data.json");
  const musicData = await musicRequest.json();

  return musicData;
}

async function createMusicList(){
    const musicListRequest = await fetchDataMusic();
    const musicListCategories = musicListRequest.musicList;

    for(const musicCategory in musicListCategories){
        const musicByCategory = musicListRequest.musicList[musicCategory];

        document.getElementById("music-categories-element").append(createSongSection(musicCategory,musicByCategory));
    }
}

function createSongSection(musicCategoryTitle,categoryMusicList) {
  const musicSection = createStyledElement("section",{class:"music-section"});
  const musicSectionTitle = createStyledElement("div",{class:"music-section-title"});
  const musicTitle = createStyledElement("p",{class:"music-title"});
  const musicList = createStyledElement("div",{class:"music-list"});

  musicTitle.textContent = musicCategoryTitle;
  categoryMusicList.forEach(music => musicList.append(createMusicProfile(music)))

  musicSection.append(musicSectionTitle);
  musicSectionTitle.append(musicTitle);
  musicSection.append(musicList);

  return musicSection;
}

function createMusicProfile(music){
  const {musicTitle,musicImage} = music
  const song = createStyledElement("button", { class: "song" });
  const songCover = createStyledElement("img", { class: "song-cover",src:musicImage });
  const songName = createStyledElement("p", { class: "song-name" });

  songName.textContent = musicTitle;
  song.addEventListener("click",() => showMusicPlayer(music))
  song.append(songCover,songName);
  return song;
}

function showMusicPlayer(music){
   searchElement.classList.add("search-bar-container-hidden");
   musicCategoryElement.classList.add("music-categories-hidden");

   musicPlayerElement.classList.remove("music-player-hidden");

  setMusicPlayer(music)
}

function hideMusicPlayer(){
   searchElement.classList.remove("search-bar-container-hidden");
   musicCategoryElement.classList.remove("music-categories-hidden");

   musicPlayerElement.classList.add("music-player-hidden");

   clearAudio();
}

function setMusicPlayer(music){
    const {musicTitle,musicImage,musicSrc,musicArtist} = music;
    const coverImageElement = document.getElementById("cover-img-element");
    const currentMusicTitleElement = document.getElementById("current-music-title-element");
    const currentMusicArtistElement = document.getElementById("current-music-artist-element");

    coverImageElement.src = musicImage;

    audioElement.src = musicSrc;

    currentMusicTitleElement.textContent = musicTitle;
    currentMusicArtistElement.textContent = musicArtist;
}

function playMusic(){
  if(this.dataset.playing === "pause"){
    audioElement.play();
    playerBtnImageElement.src = "./icons/pause_icon.svg";
    this.dataset.playing = "playing" 
  }
  else if(this.dataset.playing === "playing") {
    audioElement.pause()
    playerBtnImageElement.src = "./icons/play_icon.svg";
    this.dataset.playing = "pause";
  }
}

function clearAudio(){
    audioElement.pause();
    audioElement.src= "";

    playerBtnElement.dataset.playing = "pause";
    playerBtnImageElement.src = "./icons/play_icon.svg";
}

function createStyledElement(type, attributes = {}) {
  const element = document.createElement(type);

  for (const attributeName in attributes) {
    element.setAttribute(attributeName, attributes[attributeName]);
  }

  return element;
}

playerBackBtn.addEventListener("click",hideMusicPlayer);
playerBtnElement.addEventListener("click",playMusic);

createMusicList();