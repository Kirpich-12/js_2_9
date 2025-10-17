
const tracks = [
  {
    title: "Бабобаб",
    artist: "Иван Золо",
    cover: "assets/krt1.jpg",
    audio: "songs/duhast.mp3",
    textFile: "texts/tet.txt"
  },
  {
    title: "Песня 2",
    artist: "Исполнитель 2",
    cover: "assets/krt2.jpg",
    audio: "songs/duhast.mp3",
    textFile: "texts/tet.txt"
  },
  {
    title: "Песня 3",
    artist: "Исполнитель 3",
    cover: "assets/krt3.jpg",
    audio: "audio/song3.mp3",
    textFile: "texts/tt.txt"
  }
];



const trackSelectSection = document.getElementById("trackSelectSection");
const playerSection = document.getElementById("playerSection");
const trackGallery = document.getElementById("trackGallery");
const backToSelect = document.getElementById("backToSelect");
const trackListContainer = document.getElementById("trackListContainer");
const trackList = document.getElementById("trackList");
const toggleListBtn = document.getElementById("toggleListBtn");
const obl = document.getElementById("obl");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const audio = document.getElementById("audio");
const volumeControl = document.getElementById("volumeControl");
const textBtn = document.getElementById("text");
const textListContainer = document.getElementById("textListContainer");
const downloadBtn = document.getElementById("downloadBtn");


let Index = 0;
let isPlaying = false;

function loadGallery() {
  trackGallery.innerHTML = "";
  tracks.forEach((track, index) => {
    const card = document.createElement("div");
    card.classList.add("track-card");
    card.innerHTML = `
      <img src="${track.cover}" alt="${track.title}" />
      <h3>${track.title}</h3>
      <p>${track.artist}</p>
    `;
    card.addEventListener("click", () => {
      Index = index;
      openPlayer();
    });
    trackGallery.appendChild(card);
  });
}

function openPlayer() {
  trackSelectSection.classList.add("hidden");
  playerSection.classList.remove("hidden");
  loadTrack(Index);
  loadTrackList();
}

backToSelect.addEventListener("click", () => {
  playerSection.classList.add("hidden");
  trackSelectSection.classList.remove("hidden");
  audio.pause();
  isPlaying = false;
  playPauseBtn.textContent = "▶";
  textListContainer.classList.add("hidden");
});

function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.audio;
  obl.src = track.cover;
  titleEl.textContent = track.title;
  artistEl.textContent = track.artist;
  downloadBtn.href = track.audio;
  downloadBtn.download = track.title + ".mp3";
}

playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
});

audio.addEventListener("play", () => {
  isPlaying = true;
  playPauseBtn.textContent = "⏸";
});

audio.addEventListener("pause", () => {
  isPlaying = false;
  playPauseBtn.textContent = "▶";
});

nextBtn.addEventListener("click", () => {
  Index = (Index + 1) % tracks.length;
  loadTrack(Index);
  audio.play();
  textListContainer.classList.add("hidden");
});

prevBtn.addEventListener("click", () => {
  Index = (Index - 1 + tracks.length) % tracks.length;
  loadTrack(Index);
  audio.play();
  textListContainer.classList.add("hidden");
});

volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});

toggleListBtn.addEventListener("click", () => {
  trackListContainer.classList.toggle("hidden");
});

function loadTrackList() {
  trackList.innerHTML = "";
  tracks.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = track.title;
    li.addEventListener("click", () => {
      Index = index;
      loadTrack(Index);
      audio.play();
      textListContainer.classList.add("hidden");
    });
    trackList.appendChild(li);
  });
}

shuffleBtn.addEventListener("click", () => {
  Index = Math.floor(Math.random() * tracks.length);
  loadTrack(Index);
  audio.play();
  textListContainer.classList.add("hidden");
});

 function loadTrackText(trackIndex) {
  const track = tracks[trackIndex];
  textListContainer.innerHTML = `<h2>Текст: ${track.title}</h2><pre>${text}</pre>`;
  textListContainer.classList.remove("hidden");
  

}

textBtn.addEventListener("click", () => {
  if (textListContainer.classList.contains("hidden")) {
    loadTrackText(Index);
  } else {
    textListContainer.classList.add("hidden");
  }
});

loadGallery();
