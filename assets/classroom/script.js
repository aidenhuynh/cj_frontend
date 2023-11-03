'use strict';

const url = "images/classroom/"
var playing = false
var looping = false
var shuffling = false
var muted = false
var savedVol = 0
var playlist = []
var tick;
var savedTime;

class Track {
    // Method to set the data for initial run, as we already fetched it
    setData(data) {
        this.songData = data
        this.setInfo()
    }

    // Method to get song data from API
    async getData(URI) {
        // Fetch song information from Spotify API
        await spotifyAPI("tracks/" + URI, "GET").then(data => {
            this.songData = data
        })
    }

    // Set data from object
    setInfo() {
        const songData = this.songData

        // set title and cover image url
        this.title = songData["name"]
        this.cover = songData["album"]["images"][0]["url"]
        this.length = songData["duration_ms"]

        // Get list of artists and set object artist to concatenation with commas
        const artists = songData.artists;
        this.artist = artists.map(artist => artist.name).join(", ")
    }

    // Get information from the current song
    async getCurrent() {
        await spotifyAPI("me/player/currently-playing/", "GET").then(data => {
            this.songData = data.item
        })
    }
}

console.log("what the fricdge!")




var username = "tester"
var socket = new SockJS('https://cj-backend.stu.nighthawkcodingsociety.com/ws');
var stompClient = Stomp.over(socket);

stompClient.connect({}, onConnected, onError);

function onConnected() {
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )

}


function onError(error) {
    console.log(error)
}


function sendMessage(message) {
    if(message && stompClient) {
        var chatMessage = {
            sender: username,
            content: message,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    }
}

function onMessageReceived(payload){
    addSong(JSON.parse(payload.body).content)
}

function changeBG() {
    document.getElementById('bg').src = '{{site.baseurl}}/images/stackoverflow.png'
}

function createPlaylistDiv(track) {
    // Get the playlist HTML to put new divs into
    var playlistDiv = document.getElementsByClassName('playlist')[0]
    
    // Make a frame for the new div
    var divComponents = {
        "playlistItem":null,
        "numDiv":null,
        "coverDiv":null,
        "songDiv":null,
    }

    // Make a list from the components
    const keys = Object.keys(divComponents)

    // Make a new div for each component
    for (let i = 0; i < keys.length; i ++) {
        var component = keys[i]

        divComponents[component] = document.createElement("div")
        divComponents[component].className = component
    }

    // Add a delete button
    var deleteDiv = document.createElement("div")
    deleteDiv.className = "delete"

    // Define variables to be shortened if needed
    var title = track.title
    var artist = track.artist

    // Get the length of the playlist to number the track in the playlist
    const count = document.getElementsByClassName('playlistItem').length

    // Add full title and artist when hovering over text
    divComponents["songDiv"].title = title + " - " + artist

    // Shorten title and artist
    title = lengthCheck(title, 24)
    artist = lengthCheck(artist, 32)

    // Add data to appropriate div sections
    divComponents["numDiv"].innerHTML = count + 1
    divComponents["coverDiv"].innerHTML = "<img src='" + track.cover + "'>"
    divComponents["songDiv"].innerHTML = "<h1>" + title + "</h1><h2>" + artist + "</h2>"
    deleteDiv.innerHTML = "&#x2715"

    // Append the new div to the playlist
    playlistDiv.appendChild(divComponents["playlistItem"])

    // Append all div components to the playlist item div
    for (let i = 1; i < keys.length; i ++) {
        divComponents["playlistItem"].appendChild(divComponents[keys[i]])
    }

    // Append delete button to div
    divComponents["playlistItem"].appendChild(deleteDiv)

    // Add delete functionality
    deleteDiv.onclick = function() { removePlaylistDiv(count) }

    // Remove from the playlist
    playlist.slice(1)
}

// Function for checking the length strings and shortening them
function lengthCheck(data, maxLength) {
    // If isn't longer than the max defined length, don't run
    if (data.length <= maxLength) {
        return data
    }

    // Cut off past the max length
    data = data.slice(0, maxLength)

    // Make a list of characters to cut off because something ending in "...." or "-..." will look weird
    const characters = [
        " ", "/", ".", ",", "-",
        "|", "+", "=", ")", "(",
        "*", "&", "^", '"', "'",
        ";", ":", "%", "$", "#",
        "@", "!", "[", "]", "{",
        "}", "<", ">", "'", "~"
    ]

    const loops = data.length - 1

    // Cut off all special characters from the end
    for (let i = loops; i > 0; i --) {
        if (characters.includes(data[i])) {
            data = data.slice(0, i)
        }
        
        else {
            data += "..."

            return data
        }
    }
}

// Initialize playlist
async function updateQueue() {
    await spotifyAPI("me/player/queue", "GET").then(data => {
        playlist = []
        document.getElementById('playlistDiv').innerHTML = null

        const nowPlaying = data["currently_playing"]
        const queue = data["queue"]

        for (let track of queue) {
            // Get URI
            const URI = track["uri"].slice(14)
            
            // Initialize object
            var temp = new Track()
    
            temp.setData(track)
    
            // Add to local queue
            playlist.push(temp)
    
            createPlaylistDiv(temp)
        }
    })
}

// Function to initialize new song objects and add to queue
async function addSong(URI) {
    // Initialize object
    var temp = new Track()

    await temp.getData(URI)

    temp.setInfo()

    // Add to local queue
    playlist.push(temp)

    // Add to actual spotify queue
    await spotifyAPI("me/player/queue?uri=spotify%3Atrack%3A" + URI, "POST")

    // Update visible queue
    updateQueue()
}

async function initialize() {
    dynamicBars()
    updateQueue()

    // Initialize now playing object
    var temp = new Track()

    await temp.getCurrent()

    temp.setInfo()

    if (temp.songData == null) {
        return
    }

    // Add to local queue
    playlist.push(temp)

    setSong(0)

    startTimer()
}

function removePlaylistDiv(index) {
    let items = document.getElementsByClassName('playlistItem')
    
    items[index].remove()
    playlist[index].remove()

    // items = document.getElementsByClassName('playlistItem')

    for (let i = 0; i < items.length; i ++) {
        items[i].children[0].innerHTML = i + 1
        items[i].children[3].onclick = function() { removePlaylistDiv(i) }
    }
}

function tempAddSong(input) {
    const index = input.indexOf("track/")
    const URI = input.slice(index + 6, index + 28)
    addSong(URI)
}

function startTimer() {
    tick = setInterval(function() {updateTime()}, 1000)
}

function stopTimer() {
    clearInterval(tick)
}

function setLength(length) {
    const progressBar = document.getElementById("progress-bar")
    const lengthText = document.getElementById('length')
    const totalSeconds = length/1000
    const minutes = Math.floor(totalSeconds/60)
    const seconds = Math.floor(totalSeconds % 60)
    progressBar.max = totalSeconds
    progressBar.value = 0
    document.getElementById('current').innerHTML = "0:00"
    
    lengthText.innerHTML = minutes + ":"

    if (seconds < 10) {
        lengthText.innerHTML += "0"
    }

    lengthText.innerHTML += seconds

    progressBar.dispatchEvent(new Event('input'))
}

function setSong(index) {
    try {
        removePlaylistDiv(index)
    }
    catch {}

    var track = playlist[index]
    var cover = track.cover
    var artist = lengthCheck(track.artist, 10)
    var title = lengthCheck(track.title, 18)

    // Update background image
    document.querySelector('.songMetaData').style.setProperty(`--background-image`, `url("${cover}")`)

    // Update album cover
    document.getElementById('album-cover').src = cover

    // Update song name
    document.getElementById('song-name').innerHTML = title

    // Update artist name
    document.getElementById('artist-name').innerHTML = artist

    // Update length
    setLength(playlist[0].length)
}

function setVolume(percent) {
    spotifyAPI("me/player/volume?volume_percent=" + percent, "PUT")
}

async function seek(ms) {
    stopTimer()
    await spotifyAPI("me/player/seek?position_ms=" + ms, "PUT")
    startTimer()
}

function play() {
    const playIcon = document.getElementById('play')

    if (playing == false) {
        setTime(savedTime)
        playIcon.src = url + "pause.png"
        spotifyAPI("me/player/play", "PUT")
        playing = true
    }

    else {
        playIcon.src = url + "play.png"
        spotifyAPI("me/player/pause", "PUT")
        playing = false
    }
}

function shuffle() {
    const shuffleIcon = document.getElementById('shuffle')

    if (shuffling == false) {
        shuffleIcon.src = url + "shuffle-active.png"
        spotifyAPI("me/player/shuffle?state=true", "PUT")
        shuffling = true
    }

    else {
        shuffleIcon.src = url + "shuffle-inactive.png"
        spotifyAPI("me/player/shuffle?state=false", "PUT")
        shuffling = false
    }
}

function loop() {
    const loopIcon = document.getElementById('loop')

    if (looping == false) {
        loopIcon.src = url + "loop-active.png"
        spotifyAPI("me/player/repeat?state=track", "PUT")
        looping = true
    }

    else {
        loopIcon.src = url + "loop-inactive.png"
        spotifyAPI("me/player/repeat?state=off", "PUT")
        looping = false
    }
}

function skip() {
    if (playing == false) {
        document.getElementById('play').src = url + "pause.png"
        playing = true
    }

    if (playlist.length != 0) {
        setSong(0)
    }

    spotifyAPI("me/player/next", "POST")
}

function back() {
    spotifyAPI("me/player/previous", "POST")
}

function mute() {
    const volumeBar = document.getElementById('volume-bar')
    
    if (muted == true) {
        volumeBar.value = savedVol
        setVolume(Math.round(savedVol))
        muted = false
    }

    else {
        savedVol = volumeBar.value
        setVolume(0)
        volumeBar.value = 0
        muted = true
    }

    volumeBar.dispatchEvent(new Event('input'))
    volumeBar.dispatchEvent(new Event('mouseleave'))
}

function dynamicBars() {
    const bars = {
        volumeBar:document.getElementById('volume-bar'),
        progressBar:document.getElementById('progress-bar')
    }

    var volTemp = bars["volumeBar"].value

    const volumeIcon = document.getElementById('volume-icon')

    for (const barKey in bars) {
        const barValue = bars[barKey]

        barValue.addEventListener('mouseenter', function() {
            const percent = barValue.value/barValue.max
            const bg = `linear-gradient(to right, #924BEE 0%, #924BEE ${percent * 100}%, #4D4D4D ${percent * 100}%, #4D4D4D 100%)`
            barValue.style.background = bg
        })
    
        barValue.addEventListener('mouseleave', function() {
            const percent = barValue.value/barValue.max
            const bg = `linear-gradient(to right, #ffffff 0%, #ffffff ${percent * 100}%, #4D4D4D ${percent * 100}%, #4D4D4D 100%)`
            barValue.style.background = bg
        })

        barValue.addEventListener('input', function() {
            const percent = barValue.value/barValue.max
            const bg = `linear-gradient(to right, #924BEE 0%, #924BEE ${percent * 100}%, #4D4D4D ${percent * 100}%, #4D4D4D 100%)`
            barValue.style.background = bg
        })

        if (barKey == "volumeBar") {
            barValue.addEventListener('input', function() {
                const value = barValue.value
                const percent = value/barValue.max

                // Change this value for the minimum change in volume bar for a request to be sent
                let minDiff = 5

                if (Math.abs(value - volTemp) > minDiff) {
                    setVolume(Math.round(value))
                    volTemp = Math.round(value)
                }

                if (percent > 2/3) {
                    volumeIcon.src = url + "volume-high.png"
                }
                
                else if (percent > 1/3) {
                    volumeIcon.src = url + "volume-mid.png"
                }
        
                else if (percent > 0) {
                    volumeIcon.src = url + "volume-low.png"
                }
        
                else {
                    volumeIcon.src = url + "volume-muted.png"
        
                }
            })
        }

        else {
            barValue.addEventListener('input', function() {
                const length = document.getElementById('length').innerHTML
                const progress = document.getElementById('current')
                const percent = barValue.value/barValue.max
                
                const index = length.indexOf(":")
                const totalSeconds = length.slice(0, index) * 60 + Number(length.slice(index + 1))

                const currentTotalSeconds = Math.floor(percent * totalSeconds)
                const currentSeconds = Math.floor(currentTotalSeconds % 60)
                const currentMinutes = Math.floor(currentTotalSeconds/60)
        
                var temp = ":"

                if (currentSeconds < 10) {
                    temp = ":0"
                }

                progress.innerHTML = currentMinutes + temp + currentSeconds
            })

            barValue.addEventListener('mouseup', function() {
                const length = document.getElementById('length').innerHTML
                const percent = barValue.value/barValue.max
                const index = length.indexOf(":")
                const totalSeconds = length.slice(0, index) * 60 + Number(length.slice(index + 1))
                const currentTotalSeconds = Math.floor(percent * totalSeconds)
                
                seek(currentTotalSeconds * 1000)
            })
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initialize()
})

let codeVerifier2 = localStorage.getItem('code_verifier');
const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');
var redirectUri = "";
var siteUrl = "{{ site.url }}"
if (siteUrl.includes("localhost")){
    redirectUri = 'http://127.0.0.1:4100/classroom';
}
else {
    redirectUri = 'https://classroomjukebox.com/classroom';
}

const clientId = 'a76d4532c6e14dd7bd7393e3fccc1185';

let body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier2
});

fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
})
    .then(response => {
        if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
        }

        return response.json();
    })
    .then(data => {
        console.log("localStorageIng")
        localStorage.setItem('access_token', data.access_token);
    })
    .catch(error => {
        console.error('Error:', error);
    });

async function playSong() {
    var accessToken = localStorage.getItem('access_token');

    const response = await fetch('https://api.spotify.com/v1/me/player/queue?uri=spotify:track:4cOdK2wGLETKBW3PvgPWqT', {
        method : "POST",
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log(data)  
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

async function spotifyAPI(url, method) {
    var accessToken = localStorage.getItem('access_token')

    try {
        const response = await fetch('https://api.spotify.com/v1/' + url, {
            method: method,
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })

        if (!response.ok) {
            throw new Error('HTTP status ' + response.status)
        }

        const contentType = response.headers.get('content-type')

        if (contentType && contentType.includes('application/json')) {
            return response.json()
        }

        else {
            return null
        }
    } 
    
    catch (error) {
        console.error('Error:', error)
        throw error
    }
}

function setTime(ms) {
    savedTime = ms

    const progressBar = document.getElementById("progress-bar")
    const lengthText = document.getElementById('current')

    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.floor(totalSeconds % 60)

    progressBar.value = totalSeconds
    document.getElementById('current').innerHTML = "0:00"
    
    lengthText.innerHTML = minutes + ":"

    if (seconds < 10) {
        lengthText.innerHTML += "0"
    }

    lengthText.innerHTML += seconds

    progressBar.dispatchEvent(new Event('input'))
}

async function updateTime() {
    if (playing == false) {
        return
    }

    console.log("run")

    await spotifyAPI("me/player/currently-playing/", "GET").then(data => {
        savedTime = data.progress_ms
        setTime(savedTime)
        
    })
}