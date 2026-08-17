// // =====================================
// // DANH SÁCH BÀI HÁT
// // =====================================

// const songs = [

//     {
//         title: "Missing You",
//         artist: "Our Memories",
//         file: "music/song1.mp3",
//         image: "images/song1.jpg"
//     },

//     {
//         title: "Love Song",
//         artist: "Our Memories",
//         file: "music/song2.mp3",
//         image: "images/song2.jpg"
//     },

//     {
//         title: "Only You",
//         artist: "Our Memories",
//         file: "music/song3.mp3",
//         image: "images/song3.jpg"
//     }

// ];


// // =====================================
// // BIẾN
// // =====================================

// let currentSong = 0;

// let isPlaying = false;


// // =====================================
// // DOM
// // =====================================

// const audio =
//     document.getElementById("audioPlayer");

// const albumImage =
//     document.getElementById("albumImage");

// const songTitle =
//     document.getElementById("songTitle");

// const progress =
//     document.getElementById("progress");

// const currentTime =
//     document.getElementById("currentTime");

// const duration =
//     document.getElementById("duration");

// const playButton =
//     document.getElementById("playButton");

// const albumContainer =
//     document.querySelector(".album-container");

// const playlistContainer =
//     document.getElementById(
//         "playlistContainer"
//     );


// // =====================================
// // LOAD SONG
// // =====================================

// function loadSong(index) {

//     currentSong = index;

//     const song =
//         songs[currentSong];

//     audio.src =
//         song.file;

//     albumImage.src =
//         song.image;

//     songTitle.textContent =
//         song.title.toUpperCase();

//     updatePlaylist();

//     progress.value = 0;

//     currentTime.textContent =
//         "0:00";

//     duration.textContent =
//         "0:00";

// }


// // =====================================
// // PLAY / PAUSE
// // =====================================

// function togglePlay() {

//     if (isPlaying) {

//         pauseSong();

//     } else {

//         playSong();

//     }

// }


// // =====================================
// // PLAY
// // =====================================

// function playSong() {

//     audio.play()
//         .then(() => {

//             isPlaying = true;

//             playButton.textContent =
//                 "❚❚";

//             albumContainer.classList.add(
//                 "playing"
//             );

//         })
//         .catch(error => {

//             console.log(
//                 "Không thể phát nhạc:",
//                 error
//             );

//         });

// }


// // =====================================
// // PAUSE
// // =====================================

// function pauseSong() {

//     audio.pause();

//     isPlaying = false;

//     playButton.textContent =
//         "▶";

//     albumContainer.classList.remove(
//         "playing"
//     );

// }


// // =====================================
// // NEXT
// // =====================================

// function nextSong() {

//     currentSong++;

//     if (
//         currentSong >= songs.length
//     ) {

//         currentSong = 0;

//     }

//     loadSong(currentSong);

//     playSong();

// }


// // =====================================
// // PREVIOUS
// // =====================================

// function previousSong() {

//     currentSong--;

//     if (currentSong < 0) {

//         currentSong =
//             songs.length - 1;

//     }

//     loadSong(currentSong);

//     playSong();

// }


// // =====================================
// // PROGRESS
// // =====================================

// audio.addEventListener(
//     "timeupdate",
//     () => {

//         if (!audio.duration) {
//             return;
//         }

//         const percent =
//             (audio.currentTime /
//                 audio.duration) * 100;

//         progress.value =
//             percent;

//         currentTime.textContent =
//             formatTime(
//                 audio.currentTime
//             );

//     }
// );


// // =====================================
// // DURATION
// // =====================================

// audio.addEventListener(
//     "loadedmetadata",
//     () => {

//         duration.textContent =
//             formatTime(
//                 audio.duration
//             );

//     }
// );


// // =====================================
// // CLICK PROGRESS
// // =====================================

// progress.addEventListener(
//     "input",
//     () => {

//         if (!audio.duration) {
//             return;
//         }

//         audio.currentTime =
//             (progress.value / 100)
//             * audio.duration;

//     }
// );


// // =====================================
// // HẾT BÀI
// // =====================================

// audio.addEventListener(
//     "ended",
//     () => {

//         nextSong();

//     }
// );


// // =====================================
// // FORMAT TIME
// // =====================================

// function formatTime(seconds) {

//     if (
//         isNaN(seconds) ||
//         !isFinite(seconds)
//     ) {

//         return "0:00";

//     }

//     const minutes =
//         Math.floor(
//             seconds / 60
//         );

//     const secs =
//         Math.floor(
//             seconds % 60
//         );

//     return (
//         minutes +
//         ":" +
//         String(secs).padStart(2, "0")
//     );

// }


// // =====================================
// // PLAYLIST
// // =====================================

// function updatePlaylist() {

//     playlistContainer.innerHTML = "";

//     songs.forEach(
//         (song, index) => {

//             const item =
//                 document.createElement(
//                     "div"
//                 );

//             item.className =
//                 "song-item";

//             if (
//                 index === currentSong
//             ) {

//                 item.classList.add(
//                     "active"
//                 );

//             }

//             item.innerHTML = `

//                 <img
//                     src="${song.image}"
//                     alt="${song.title}"
//                 >

//                 <div class="song-info">

//                     <strong>
//                         ${song.title}
//                     </strong>

//                     <span>
//                         ${song.artist}
//                     </span>

//                 </div>

//             `;

//             item.addEventListener(
//                 "click",
//                 () => {

//                     loadSong(index);

//                     playSong();

//                 }
//             );

//             playlistContainer.appendChild(
//                 item
//             );

//         }
//     );

// }


// // =====================================
// // QUAY VỀ HOME
// // =====================================

// function goHome() {

//     audio.pause();

//     window.location.href =
//         "home.html";

// }


// // =====================================
// // KHỞI TẠO
// // =====================================

// loadSong(0);