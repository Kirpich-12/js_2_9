class Player {
  constructor(container, tracks) {
    this.container = container;
    this.tracks = tracks;
    this.index = 0;
    this.isPlaying = false;

    this.render();
    this.getElements();
    this.init();
  }

  render() {
    this.container.innerHTML = `
      <div class="player-section">
        <div class="player-container">
          <div class="track-list hidden">
            <h2>Список треков</h2>
            <ul></ul>
          </div>

          <div class="player full-width">
            <button class="toggle-list">Показать / Скрыть список</button>

            <img src="" alt="Обложка трека" class="obl" />
            <h3 class="title">Выберите трек</h3>
            <p class="artist"></p>

            <div class="controls">
              <button class="prev">⏮</button>
              <button class="play-pause">▶</button>
              <button class="next">⏭</button>
              <button class="text-btn">📚</button>
              <button class="new-player">Add new player</button>
            </div>

            <div class="volume">
              <label>🔊</label>
              <input type="range" class="volume-control" min="0" max="1" step="0.01" value="1" />
            </div>

            <button class="shuffle">Перемешать</button>
            <a class="download" href="" download>⬇ Скачать</a>
          </div>

          <div class="text-list hidden"></div>
        </div>

        <audio></audio>
      </div>
    `;
  }

  getElements() {
    this.audio = this.container.querySelector("audio");
    this.obl = this.container.querySelector(".obl");
    this.titleEl = this.container.querySelector(".title");
    this.artistEl = this.container.querySelector(".artist");
    this.playBtn = this.container.querySelector(".play-pause");
    this.nextBtn = this.container.querySelector(".next");
    this.prevBtn = this.container.querySelector(".prev");
    this.shuffleBtn = this.container.querySelector(".shuffle");
    this.volumeControl = this.container.querySelector(".volume-control");
    this.textBtn = this.container.querySelector(".text-btn");
    this.textContainer = this.container.querySelector(".text-list");
    this.downloadBtn = this.container.querySelector(".download");
    this.listContainer = this.container.querySelector(".track-list");
    this.toggleListBtn = this.container.querySelector(".toggle-list");
    this.list = this.container.querySelector("ul");
    this.addBtn = this.container.querySelector(".new-player")
  }

  init() {
    this.loadList();
    this.playBtn.addEventListener("click", () => this.playPause());
    this.nextBtn.addEventListener("click", () => this.next());
    this.prevBtn.addEventListener("click", () => this.prev());
    this.shuffleBtn.addEventListener("click", () => this.shuffle());
    this.volumeControl.addEventListener("input", () => this.changeVolume());
    this.textBtn.addEventListener("click", () => this.toggleText());
    this.toggleListBtn.addEventListener("click", () => this.toggleList());
  }

  loadList() {
    this.list.innerHTML = "";
    this.tracks.forEach((track, i) => {
      const li = document.createElement("li");
      li.textContent = track.title;
      li.addEventListener("click", () => {
        this.index = i;
        this.loadTrack();
        this.audio.play();
        this.isPlaying = true;
        this.playBtn.textContent = "⏸";
      });
      this.list.appendChild(li);
    });
  }

  loadTrack() {
    const track = this.tracks[this.index];
    this.titleEl.textContent = track.title;
    this.artistEl.textContent = track.artist;
    this.obl.src = track.cover;
    this.audio.src = track.audio;
    this.downloadBtn.href = track.audio;
    this.downloadBtn.download = track.title + ".mp3";
  }

  playPause() {
    if (this.isPlaying) {
      this.audio.pause();
      this.playBtn.textContent = "▶";
      this.isPlaying = false;
    } else {
      this.audio.play();
      this.playBtn.textContent = "⏸";
      this.isPlaying = true;
    }
  }

  next() {
    this.index = (this.index + 1) % this.tracks.length;
    this.loadTrack();
    this.audio.play();
  }

  prev() {
    this.index = (this.index - 1 + this.tracks.length) % this.tracks.length;
    this.loadTrack();
    this.audio.play();
  }

  shuffle() {
    this.index = Math.floor(Math.random() * this.tracks.length);
    this.loadTrack();
    this.audio.play();
  }

  changeVolume() {
    this.audio.volume = this.volumeControl.value;
  }

  toggleList() {
    this.listContainer.classList.toggle("hidden");
  }

  toggleText() {
    if (this.textContainer.classList.contains("hidden")) {
      const track = this.tracks[this.index];
      this.textContainer.innerHTML = `<h3>${track.title}</h3><p>${track.text}</p>`;
      this.textContainer.classList.remove("hidden");
    } else {
      this.textContainer.classList.add("hidden");
    }
  }
}



const track = [
  {
    title: "Бабобаб",
    artist: "Иван Золо",
    cover: "assets/krt1.jpg",
    audio: "songs/duhast.mp3",
    text: "sadasdasd"
  },
  {
    title: "Песня 2",
    artist: "Исполнитель 2",
    cover: "assets/krt2.jpg",
    audio: "songs/duhast.mp3",
    text: "Текст песни 2"
  }
];

const track2 = [
  {
    title: "Трек 1",
    artist: "Артист B1",
    cover: "assets/krt3.jpg",
    audio: "songs/duhast.mp3",
    text: "Текст трека 1"
  },
  {
    title: "Трек 2",
    artist: "Артист B2",
    cover: "assets/krt2.jpg",
    audio: "songs/duhast.mp3",
    text: "Текст трека 2"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  const player1Container = document.createElement("div");
  app.appendChild(player1Container);
  const player1 = new Player(player1Container, track);
});


function addNewPlayer(){
  const playerContainer = document.createElement("div");
  app.appendChild(playerContainer);
  const player2 = new Player(playerContainer, track)
}