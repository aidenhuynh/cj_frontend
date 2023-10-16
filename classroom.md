<link rel="stylesheet" href="{{ site.baseurl }}/assets/classroom/styles.css">
<script src="{{ site.baseurl }}/assets/classroom/script.js"></script>

<div class="main">
    <div class="player">
        <div class="songMetaData" id="songMetaData">
            <div class="background">
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

<button onclick="createPlaylist()">create playlist</button>
<br>
<input id="titleInput" placeholder="Enter song title">
<br>
<input id="artistInput" placeholder="Enter song artist">
<br>
<input id="coverInput" placeholder="Enter song cover img url">
<br>
<button onclick="addSong()">add song</button>
<br>\
<input id="lengthInput" placeholder="Enter a song length (00:00)">
<br>
<button onclick="setLength(document.getElementById('lengthInput').value)">change length</button>