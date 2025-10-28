const player = {
  tracks: [
    {
      title: "Бабобаб",
      artist: "Иван Золо",
      cover: "assets/krt1.jpg",
      audio: "songs/duhast.mp3",
      textFile: "sadasdasd"
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
  ],

  index: 0,
  isPlaying: false,
  audio: document.getElementById("audio"),

  init: function() {
    this.showGallery();
    document.getElementById("backToSelect").addEventListener("click", () => this.back());
    document.getElementById("playPauseBtn").addEventListener("click", () => this.playPause());
    document.getElementById("nextBtn").addEventListener("click", () => this.next());
    document.getElementById("prevBtn").addEventListener("click", () => this.prev());
    document.getElementById("shuffleBtn").addEventListener("click", () => this.shuffle());
    document.getElementById("volumeControl").addEventListener("input", () => this.changeVolume());
    document.getElementById("toggleListBtn").addEventListener("click", () => this.toggleList());
    document.getElementById("text").addEventListener("click", () => this.toggleText());
  },

  showGallery: function() {
    const gallery = document.getElementById("trackGallery");
    gallery.innerHTML = "";
    this.tracks.forEach((track, i) => {
      let div = document.createElement("div");
      div.className = "track-card";
      div.innerHTML = `
        <img src="${track.cover}" alt="">
        <h3>${track.title}</h3>
        <p>${track.artist}</p>
      `;
      div.addEventListener("click", () => {
        this.index = i;
        this.openPlayer();
      });
      gallery.appendChild(div);
    });
  },

  openPlayer: function() {
    document.getElementById("trackSelectSection").classList.add("hidden");
    document.getElementById("playerSection").classList.remove("hidden");
    this.loadTrack();
    this.loadTrackList();
  },

  back: function() {
    document.getElementById("playerSection").classList.add("hidden");
    document.getElementById("trackSelectSection").classList.remove("hidden");
    this.audio.pause();
    this.isPlaying = false;
  },

  loadTrack: function() {
    let track = this.tracks[this.index];
    document.getElementById("obl").src = track.cover;
    document.getElementById("title").textContent = track.title;
    document.getElementById("artist").textContent = track.artist;
    this.audio.src = track.audio;
    document.getElementById("downloadBtn").href = track.audio;
    document.getElementById("downloadBtn").download = track.title + ".mp3";
  },

  playPause: function() {
    if (this.isPlaying) {
      this.audio.pause();
      document.getElementById("playPauseBtn").textContent = "▶";
      this.isPlaying = false;
    } else {
      this.audio.play();
      document.getElementById("playPauseBtn").textContent = "⏸";
      this.isPlaying = true;
    }
  },

  next: function() {
    this.index++;
    if (this.index >= this.tracks.length) this.index = 0;
    this.loadTrack();
    this.audio.play();
    this.isPlaying = true;
  },

  prev: function() {
    this.index--;
    if (this.index < 0) this.index = this.tracks.length - 1;
    this.loadTrack();
    this.audio.play();
    this.isPlaying = true;
  },

  shuffle: function() {
    this.index = Math.floor(Math.random() * this.tracks.length);
    this.loadTrack();
    this.audio.play();
    this.isPlaying = true;
  },

  changeVolume: function() {
    let volume = document.getElementById("volumeControl").value;
    this.audio.volume = volume;
  },

  loadTrackList: function() {
    const list = document.getElementById("trackList");
    list.innerHTML = "";
    this.tracks.forEach((track, i) => {
      let li = document.createElement("li");
      li.textContent = track.title;
      li.addEventListener("click", () => {
        this.index = i;
        this.loadTrack();
        this.audio.play();
        this.isPlaying = true;
      });
      list.appendChild(li);
    });
  },

  toggleList: function() {
    document.getElementById("trackListContainer").classList.toggle("hidden");
  },

  toggleText: function() {
    let textBlock = document.getElementById("textListContainer");
    if (textBlock.classList.contains("hidden")) {
      let track = this.tracks[this.index];
      textBlock.innerHTML = `<h3>${track.title}</h3><p>${track.textFile}</p>`;
      textBlock.classList.remove("hidden");
    } else {
      textBlock.classList.add("hidden");
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  player.init();
});
