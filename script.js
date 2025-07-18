const songs = [
  {
    name: "AeWatan.mp3",
    title: "Ae Watan",
    artist: "Arijit Singh",
    image: "ArjitSingh.jpg"
  },
  {
    name: "TeriMitti.mp3",
    title: "Teri Mitti",
    artist: "B Praak",
     image: "BPraak.jpg"  
  },
  {
    name: "DeshMera.mp3",
    title: "Desh Mera",
    artist: "Arijit Singh",
    image: "ArjitSingh.jpg"
  },
  {
    name: "LehraDo.mp3",
    title: "Lehra Do",
    artist: "Arijit Singh",
    image: "ArjitSingh.jpg"
  },
   {
    name: "OShera.mp3",
    title: "O Shera",
    artist: "Unknown",
    image: "Unknown.jpg"
  }
];

let isPlaying = false;
let songIndex = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");



function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
audio.src = `music/${song.name}`;  
cover.src = `images/${song.image}`;

   loadLyrics(song.name);

}
loadSong(songs[songIndex]);

function loadLyrics(songFileName) {
  const lyricsBox = document.getElementById("lyrics");
  const lyricsData = lyricsMap[songFileName] || [];
  lyricsBox.innerHTML = lyricsData
    .map((line) => `<p data-time="${line.time}">${line.text}</p>`)
    .join("");
}

function playSong() {
  audio.play();
  isPlaying = true;
   playBtn.innerHTML = "⏸️";
  cover.classList.add("rotating");
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
   playBtn.innerHTML = "▶️";
  cover.classList.remove("rotating");
}

function togglePlay() {
  isPlaying ? pauseSong() : playSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);

  const current = Math.floor(audio.currentTime);
const lyricsBox = document.getElementById("lyrics");
const lines = lyricsBox.querySelectorAll("p");

lines.forEach((line) => {
  const lineTime = parseInt(line.dataset.time);
  if (lineTime === current) {
    lines.forEach((l) => l.classList.remove("active"));
    line.classList.add("active");
    line.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
  nextSong();
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});



const lyricsMap = {
  "AeWatan.mp3": [
    { time: 0, text: "Ae watan, watan mere aabaad rahe tu" },
    { time: 5, text: "Main jahan rahoon, jahan mein yaad rahe tu" },
    { time: 10, text: "Ae watan, mere watan..." }
  ],
  "TeriMitti.mp3": [
    { time: 0, text: "Teri mitti mein mil jaawaan" },
    { time: 5, text: "Gul ban ke main khil jaawaan" },
    { time: 10, text: "Itni si hai dil ki aarzu..." }
  ],
  // Add more as needed...
};









audio.addEventListener("loadedmetadata", () => {
  console.log("Duration loaded: ", audio.duration); // 🧪 Debug log
  durationEl.textContent = formatTime(audio.duration);
});
function formatTime(time) {
  if (!time || isNaN(time)) return "0:00";  // ✅ Safer
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}
