const songs = [
    {
        id: 0,
        name: "Amplifier",
        artist: "Imran khan",
        img: "desktop-wallpaper-amplifier-2-lyrics-video-song-by-imran-khan-imran-khan-singer.jpg",
        genre: "Pop",
        source: "Amplifier_64-(PagalWorld).mp3"
    },
    {
        id: 1,
        name: "I cant stop",
        artist: "Punch deck",
        img: "hq720.jpg",
        genre: "Rock",
        source: "I-Cant-Stop-Mastered(chosic.com).mp3"
    },
    {
        id: 2,
        name: "Desi hip-hop",
        artist: "Bohemia",
        img: "baf7c2d38553658bbae936888686bdb5.1000x1000x1.jpg",
        genre: "Hip-Hop",
        source: "Desi Hip Hop(PagalWorld.com.se).mp3"
    },
    // Add more songs here as needed
];


function currplay(curid) {
    console.log('curr');
    const song = songs[curid];
    const songpic = document.getElementById('song-picture');
    const songcon = document.getElementById('song-control');
    songpic.innerHTML = `
    <div class="card card1">
        <img src="${song.img}" alt="${song.name}" class="card-img-top card-img">
       
    </div>
    
    <h5 class="card11">${song.name}</h5>
    <p class="card11">${song.artist}</p>
`;
    console.log(song.source);
    songcon.innerHTML = `<audio controls>
        <source src="${song.source}" type="audio/mp3">
        Your browser does not support the audio element.
    </audio>`;

    const ar2 = document.getElementById('area-2');
    // ar2.innerHTML = ''; // Clear the existing content in "area-2"







}



function showsongs(genre) {
    const songlist = document.getElementById('all-songs');
    songlist.innerHTML = '';
    const filteredSongs = [];
    for (let i = 0; i < songs.length; i++) {
        if (!genre || songs[i].genre === genre) {
            filteredSongs.push(songs[i]);
        }
    }
    for (let i = 0; i < filteredSongs.length; i++) {
        const songItem = document.createElement('button');
        const song = filteredSongs[i];
        songItem.innerHTML = `
       
        <p>${song.name} - ${song.artist}</p>
        
    `;


        songlist.appendChild(songItem);

        songItem.addEventListener('click', () => {
            currplay(song.id);
            currentSongindex = song.id;
        })
    }
}
const genreSelect = document.getElementById('genre-select');
genreSelect.addEventListener('change', () => {
    showsongs(genreSelect.value);
});
showsongs();
currplay(0);



const toggleTheme = document.getElementById('toggle-theme');
const themeStylesheet = document.getElementById('theme-stylesheet');
const currentTheme = localStorage.getItem('theme'); // Check for the saved theme

if (currentTheme) {
    themeStylesheet.href = currentTheme; // Set the theme based on the saved theme
}

// Add a change event listener to the theme toggle checkbox
toggleTheme.addEventListener('change', () => {
    // Toggle between dark and light themes
    if (themeStylesheet.href.endsWith('cnj-music.css')) {
        themeStylesheet.href = 'cnj-musicdark.css'; // Switch to dark theme
    } else {
        themeStylesheet.href = 'cnj-music.css'; // Switch to light theme
    }

    // Save the theme choice to localStorage
    localStorage.setItem('theme', themeStylesheet.href);
});












const ply = document.getElementById('add-playlist-btn');

const inputplay = document.getElementById('playlist-name-input');
const createplaybtn = document.getElementById('create-playlist-button');
const playlistSongs = document.getElementById('playlist-songs'); // Add this line

// Initialize the playlists array
const playlists = [];
let playlistIndex = 0; // Initialize the index

// Function to create a new playlist
function createPlaylist(playlistName) {
    if (playlistName) {

        const newPlaylist = { index: playlistIndex, name: playlistName, songs: [] };
        playlists.push(newPlaylist);
        inputplay.value = '';
        displayPlaylists(playlistName);
        playlistIndex++; // Increment the playlist index for the next playlist
    }
}



let qqq;
let clickedPlaylistIndex;
let currentSongindex = 0; // Initialize it with the index of the first song
let listItem;
function displayPlaylists() {
    playlistSongs.innerHTML = ''; // Clear the existing list

    let q = 0;

    playlists.forEach((playlist, index) => {
        listItem = document.createElement('button');
        listItem.textContent = ` ${playlist.name}`;
        q++;
        playlistSongs.appendChild(listItem);
        // listItem.value = index;
        listItem.id='bttio';
        listItem.addEventListener('click', () => {
            clickedPlaylistIndex = index;


            displaysongs(clickedPlaylistIndex);
            console.log(`Button with value ${clickedPlaylistIndex} was clicked.`);
        });
    });

    // Create the "Add to Playlist" button
    const addPlaylistBtn = document.createElement('button');
    addPlaylistBtn.textContent = 'Add to Playlist';
    addPlaylistBtn.id = 'add-playlist-btn';

    addPlaylistBtn.addEventListener('click', () => {
        const playlistIndexToAddTo = clickedPlaylistIndex;
        //  qqq=clickedPlaylistIndex;
        addToPlaylist(songs[currentSongindex], playlistIndexToAddTo);

        displaysongs(playlistIndexToAddTo);
    });

    // Append the "Add to Playlist" button to the document

    playlistSongs.appendChild(addPlaylistBtn);

}


function addToPlaylist(song, playlistIndex) {
    if (playlists[playlistIndex]) {
        playlists[playlistIndex].songs.push(song);

        console.log(`Added "${song.name}" to the playlist ${playlistIndex}`);
    }

}
createplaybtn.addEventListener('click', () => {
    const inputname = inputplay.value;
    createPlaylist(inputname);
});

// Initial call to displayPlaylists
displayPlaylists();


let igh = null;

function displaysongs(id) {
    console.log('display');
    const songlistt = document.getElementById('all-playlist');
    songlistt.innerHTML = ''; // Clear the existing content before adding new songs
    console.log(playlists[id]);
    let ip = id;
    if (!playlists[id]) {
        console.log(`Playlist with ID ${id} does not exist.`);
        return;
    }


    for (let i = 0; i < playlists[id].songs.length; i++) {
        const song = playlists[id].songs[i];
        const songItem = document.createElement('button');

        songItem.innerHTML = `
            <p>${song.name} - ${song.artist}</p>
        `;

        songlistt.appendChild(songItem);



        songItem.addEventListener('click', () => {
            currplay(song.id);
            console.log(`Song with ID ${song.id} clicked.`);
            igh = i;
        });
        songItem.songIndex = i;
    }

}


// Initialize the current playlist and song index
let currentPlaylistIndex = 0;
let currentSongIndex = 0;



// Function to display the songs of the current playlist
function displayCurrentPlaylist() {
    const playlist = playlists[clickedPlaylistIndex];
    if (!playlist) {
        console.log(`Playlist with ID ${clickedPlaylistIndex} does not exist.`);
        return;
    }

    const songlistt = document.getElementById('all-playlist');
    songlistt.innerHTML = ''; // Clear the existing content before adding new songs

    for (let i = 0; i < playlist.songs.length; i++) {
        const song = playlist.songs[i];
        const songItem = document.createElement('button');

        songItem.innerHTML = `
            <p>${song.name} - ${song.artist}</p>
        `;

        songlistt.appendChild(songItem);




        songItem.addEventListener('click', () => {
            currplay(song.id);
            console.log(`Song with ID ${song.id} clicked.`);

        });
    }
}


// Function to go to the previous song in the current playlist
function previousSong() {
    const playlist = playlists[clickedPlaylistIndex];
    if (currentSongIndex > 0) {
        currentSongIndex--;
        displayCurrentPlaylist(); // Update the displayed songs
        currplay(playlist.songs[currentSongIndex].id); // Update the currently playing song
    } else {
        // Handle the case when already at the first song in the playlist
        // You can choose to loop back to the last song or take any other desired action
        // For example, you can do nothing or show a message.
        // This is just a sample approach; you can modify it to fit your requirements.
        console.log("Already at the first song in the playlist.");
    }
}


// Function to go to the next song in the current playlist
function nextSong() {
    const playlist = playlists[clickedPlaylistIndex];
    if (currentSongIndex < playlist.songs.length - 1) {
        currentSongIndex++;
    } else {
        // If at the last song, wrap around to the first song
        currentSongIndex = 0;
    }
    displayCurrentPlaylist(); // Update the displayed songs
    currplay(playlist.songs[currentSongIndex].id); // Update the currently playing song
}




// Example usage of previous and next buttons for songs
document.getElementById('prev-song-btn').addEventListener('click', previousSong);
document.getElementById('next-song-btn').addEventListener('click', nextSong);







// Reference to the search input element
const searchInput = document.getElementById('search-input');

// Function to filter and display search results
function searchSongs() {
    const searchTerm = searchInput.value.toLowerCase(); // Convert the search query to lowercase for case-insensitive search
    const songlistt = document.getElementById('search-songs');
    songlistt.innerHTML = ''; // Clear the existing content before displaying search results

    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        if (song.name.toLowerCase().includes(searchTerm) || song.artist.toLowerCase().includes(searchTerm)) {
            // Create a button for the matching song and add it to the display
            const songItem = document.createElement('button');
            songItem.innerHTML = `<p>${song.name} - ${song.artist}</p>`;
            songlistt.appendChild(songItem);

            songItem.addEventListener('click', () => {
                // Call your function with the song ID or perform the desired action
                currplay(song.id);
                console.log(`Song with ID ${song.id} clicked.`);
            });
        }
    }
}

// Event listener for the search input
searchInput.addEventListener('input', searchSongs);










// Reference to the search input element for playlists
const searchPlaylistInput = document.getElementById('search-playlist-input');

// Function to filter and display search results for playlists
function searchPlaylists() {
    const searchTerm = searchPlaylistInput.value.toLowerCase(); // Convert the search query to lowercase for case-insensitive search
    const playlistList = document.getElementById('search-playlist');
    playlistList.innerHTML = ''; // Clear the existing content before displaying search results

    for (let i = 0; i < playlists.length; i++) {
        const playlist = playlists[i];
        if (playlist.name.toLowerCase().includes(searchTerm)) {
            // Create a button for the matching playlist and add it to the display
           const playlistItem = document.createElement('button');
        //   const playlistItem = document.getElementById('bttio');
            playlistItem.innerHTML = playlist.name;
            playlistList.appendChild(playlistItem);

            playlistItem.addEventListener('click', () => {
               // displaysongs(clickedPlaylistIndex);
                // Call your function to display the songs in the selected playlist or perform the desired action
                console.log(`Playlist with name "${playlist.name}" clicked.`);
            });
        }
    }
}

// Event listener for the playlist search input
searchPlaylistInput.addEventListener('input', searchPlaylists);




let rem = document.createElement('button');
rem.textContent = 'remove';
document.getElementById('remove').appendChild(rem);

rem.addEventListener('click', () => {
    console.log('r click');
    console.log(clickedPlaylistIndex);
    // console.log(currentSongindex);
    console.log(igh);
    removeFromPlaylist(igh, clickedPlaylistIndex);
})

function removeFromPlaylist(songIndex, playlistIndex) {
    if (playlists[playlistIndex]) {
        // Find the song in the playlist and remove it
        const playlist = playlists[playlistIndex];
        if (playlist.songs.length > songIndex) {
            const songId = playlist.songs[songIndex].id;
            playlist.songs.splice(songIndex, 1);
            console.log(`Removed song with ID ${songId} from the playlist ${playlistIndex}`);
            displayCurrentPlaylist();
        }
    }
}