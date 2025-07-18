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
  "DeshMera.mp3": [
  { time: 0, text: "Desh mera, rangila, pyara" },
  { time: 5, text: "Desh mera, basera tera mera" },
  { time: 10, text: "Desh mera, sapna sa lagta hai" },
  { time: 15, text: "Yeh desh hai veer jawaano ka" }
],
"LehraDo.mp3": [
  { time: 0, text: "Lehra do, lehra do" },
  { time: 5, text: "Yeh tiranga lehra do" },
  { time: 10, text: "Jahan shaheed soye hain" },
  { time: 15, text: "Unki yaadon mein lehra do" }
],

"OShera.mp3": [
  { time: 0, text: "O Shera vali gallan, kad ke na jaavin" },
  { time: 5, text: "Tu shera wali baat karein, darr ke na jaavin" },
  { time: 10, text: "Jo bhi aaye saamne, tu seedha thok de" },
  { time: 15, text: "Tu sher hai, tu shera hai, himmat na chhod de" }
],
};

let isPlaying = false;
let songIndex = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const playlist = document.getElementById("playlist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const volume = document.getElementById("volume");
const volumeLabel = document.getElementById("volume-label");


audio.volume = 0.5;
volumeLabel.textContent = "50%";

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


volume.addEventListener("input", () => {
  audio.volume = volume.value;
  const percent = Math.round(volume.value * 100);
  volumeLabel.textContent = `${percent}%`; 
});


audio.addEventListener("loadedmetadata", () => {
  console.log("Duration loaded: ", audio.duration);
  durationEl.textContent = formatTime(audio.duration);
});
function formatTime(time) {
  if (!time || isNaN(time)) return "0:00";  
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}
