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
                <img id="back" src="">
                <img id="play" src="">
                <img id="skip" src="">
            </div>
            <div class="scrubber">
            </div>
            <div class="search">
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

