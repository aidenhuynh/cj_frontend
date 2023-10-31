<link rel="stylesheet" href="{{ site.baseurl }}/assets/classroom/styles.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.4/sockjs.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
<script src="{{ site.baseurl }}/assets/classroom/script.js"></script>

<div class="main">
    <div class="player">
        <div class="songMetaData" id="songMetaData">
            <div class="songText">
                <div class="status" id="status-div">NOW PLAYING:</div>
                <div class="info" id="info-div">
                    <h1 id="song-name">Song name</h1>
                    <h2 id="artist-name">Artist</h2>
                </div>
                <div class="sender" id="sender-div">
                    <h1 id="queue-status">Queued by:</h1>
                    <h2 id="queue-name">Sample Name</h2>
                </div>
        </div>
        <div class="albumCover" id="album-cover">
            <img src="https://cdns-images.dzcdn.net/images/cover/6bed681d3fd25550ef733dfbcf3cd67e/350x350.jpg">
        </div>
        </div>
        <div class="mediaControls">
            <div class="buttons">
                <img id="shuffle" src="{{site.baseurl}}/images/classroom/shuffle-inactive.png" onclick="shuffle()">
                <img id="back" src="{{site.baseurl}}/images/classroom/back.png" onclick="back()">
                <img class="play" id="play" src="{{site.baseurl}}/images/classroom/play.png" onclick="play()">
                <img id="skip" src="{{site.baseurl}}/images/classroom/skip.png" onclick="skip()">
                <img id="loop" src="{{site.baseurl}}/images/classroom/loop-inactive.png" onclick="loop()">
            </div>
            <div class="scrubber">
                <span id="current">0:00</span>
                <input id="progress-bar" type="range">
                <span id="length">3:00</span>
            </div>
            <div class="search">
                <input id="search" type="text" placeholder="Search song title here...">
                <img class="search-icon" src="{{site.baseurl}}/images/classroom/search.png">
                <img class="volume-icon" src="{{site.baseurl}}/images/classroom/volume-mid.png" id="volume-icon" onclick="mute()">
                <input id="volume-bar" type="range" max="100">
            </div>
        </div>
    </div>
    <div id="playlistDiv" class="playlist">
    </div>
</div>

<button onclick="window.location = '{{site.baseurl}}/spotifyconnect'">login</button>
<br>
<button onclick="createPlaylist()">create playlist</button>
<br>
<input id="titleInput" placeholder="Enter song title">
<br>
<input id="artistInput" placeholder="Enter song artist">
<br>
<input id="coverInput" placeholder="Enter song cover img url">
<br>
<button onclick="addSong()">add song</button>
<br>
<input id="lengthInput" placeholder="Enter a song length (00:00)">
<br>
<button onclick="setLength(document.getElementById('lengthInput').value)">change length</button>
<br>
<input id="linkInput" placeholder="Enter song link">
<br>
<button onclick="tempAddSong(document.getElementById('linkInput').value)">add song</button>

