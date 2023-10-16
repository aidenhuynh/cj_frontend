const url = "images/classroom/"
var playing = false
var looping = false
var shuffling = false
var muted = false
var savedVol = 0

var playlist = [
    {
        title: "Sneaky Snitch",
        artist: "Kevin MacLeod",
        cover: "https://i.scdn.co/image/ab67616d0000b273ad5ff10a04a737d3ea8ae0f7",
    },
    {
        title: "Cipher",
        artist: "Kevin MacLeod",
        cover: "https://cdns-images.dzcdn.net/images/cover/6bed681d3fd25550ef733dfbcf3cd67e/350x350.jpg",
    },
    {
        title: "Fluffing a Duck",
        artist: "Kevin MacLeod",
        cover: "https://i.scdn.co/image/ab67616d0000b27339441d79f068f2e65e55eedc",
    },
    {
        title:"Carefree",
        artist:"Kevin MacLeod",
        cover:"https://i.scdn.co/image/ab67616d0000b2733581aa1ca8780d7ee6461551"
    },
    {
        title:"Monkeys Spinning Monkeys",
        artist:"Kevin Macleod",
        cover:"https://i.scdn.co/image/ab67616d0000b2731f81d415360fd941332ff0f8"
    },
    {
        title:"Really long name, with a space",
        artist:"special characters at the end are removed!",
        cover:"https://m.media-amazon.com/images/I/519yS6S9DAL.jpg"
    },
    {
        title:"but, before the *break* is still safe",
        artist:"Artist names are also shortened to fit properly",
        cover:"https://m.media-amazon.com/images/I/519yS6S9DAL.jpg"
    }
]

function changeBG() {
    document.getElementById('bg').src = '{{site.baseurl}}/images/stackoverflow.png'
}

function lengthCheck(data) {
    // set to whatever lol
    const maxLength = 24

    if (data.length <= maxLength) {
        return data
    }

    data = data.slice(0, maxLength)

    const characters = [
        " ", "/", ".", ",", "-",
        "|", "+", "=", ")", "(",
        "*", "&", "^", '"', "'",
        ";", ":", "%", "$", "#",
        "@", "!", "[", "]", "{",
        "}", "<", ">", "'", "~"
    ]

    const loops = data.length - 1

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

function createPlaylistDiv(index) {
    var playlistDiv = document.getElementsByClassName('playlist')[0]
    let item = playlist[index]
    
    var divComponents = {
        "playlistItem":null,
        "numDiv":null,
        "coverDiv":null,
        "songDiv":null,
    }

    const keys = Object.keys(divComponents)

    for (let i = 0; i < keys.length; i ++) {
        var component = keys[i]

        divComponents[component] = document.createElement("div")
        divComponents[component].className = component
    }

    var deleteDiv = document.createElement("div")
    deleteDiv.className = "delete"

    var title = item["title"]
    var artist = item["artist"]
    const count = document.getElementsByClassName('playlistItem').length

    divComponents["songDiv"].title = title + " - " + artist

    title = lengthCheck(title)
    artist = lengthCheck(artist)

    divComponents["numDiv"].innerHTML = count + 1
    divComponents["coverDiv"].innerHTML = "<img src='" + item["cover"] + "'>"
    divComponents["songDiv"].innerHTML = "<h1>" + title + "</h1><h2>" + artist + "</h2>"
    deleteDiv.innerHTML = "&#x2715"

    playlistDiv.appendChild(divComponents["playlistItem"])

    for (let i = 1; i < keys.length; i ++) {
        divComponents["playlistItem"].appendChild(divComponents[keys[i]])
    }

    divComponents["playlistItem"].appendChild(deleteDiv)

    deleteDiv.onclick = function() { removePlaylistDiv(count) }

    playlist.slice(1)
}

function createPlaylist() {
    for (let i = 0; i < playlist.length; i ++) {
        createPlaylistDiv(i)
    }
}

function removePlaylistDiv(index) {
    let items = document.getElementsByClassName('playlistItem')
    
    items[index].remove()

    items = document.getElementsByClassName('playlistItem')

    for (let i = 0; i < items.length; i ++) {
        items[i].children[0].innerHTML = i + 1
        items[i].children[3].onclick = function() { removePlaylistDiv(i) }
    }
}

function addSong() {
    const title = document.getElementById('titleInput').value
    const artist = document.getElementById('artistInput').value
    const cover = document.getElementById('coverInput').value

    playlist.push({
        title:title,
        artist:artist,
        cover:cover,
    })

    createPlaylistDiv(playlist.length - 1)
}

function setSong() {
    document.getElementsByClassName('background')[0].style.backgroundImage.src = playlist[0][cover]
}

function setLength(length) {
    const progressBar = document.getElementById("progress-bar")
    const index = length.indexOf(":")
    progressBar.max = length.slice(0, index) * 60 + Number(length.slice(index + 1))
    progressBar.value = 0
    document.getElementById('current').innerHTML = "0:00"
    document.getElementById('length').innerHTML = length

    progressBar.dispatchEvent(new Event('input'))
}

function play() {
    const playIcon = document.getElementById('play')

    if (playing == false) {
        playIcon.src = url + "pause.png"
        playing = true
    }

    else {
        playIcon.src = url + "play.png"
        playing = false
    }
}

function shuffle() {
    const shuffleIcon = document.getElementById('shuffle')

    if (shuffling == false) {
        shuffleIcon.src = url + "shuffle-active.png"
        shuffling = true
    }

    else {
        shuffleIcon.src = url + "shuffle-inactive.png"
        shuffling = false
    }
}

function loop() {
    const loopIcon = document.getElementById('loop')

    if (looping == false) {
        loopIcon.src = url + "loop-active.png"
        looping = true
    }

    else {
        loopIcon.src = url + "loop-inactive.png"
        looping = false
    }
}

function skip() {
    console.log("skip lol")
}

function back() {
    console.log("coding!")
}

function mute() {
    const volumeBar = document.getElementById('volume-bar')
    
    if (muted == true) {
        volumeBar.value = savedVol
        muted = false
    }

    else {
        savedVol = volumeBar.value
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
                const percent = barValue.value/barValue.max

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
                const currentSeconds = currentTotalSeconds % 60
                const currentMinutes = Math.floor(currentTotalSeconds/60)
        
                var temp = ":"

                if (currentSeconds < 10) {
                    temp = ":0"
                }

                progress.innerHTML = currentMinutes + temp + currentSeconds
            })
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    dynamicBars()
    setLength("4:00")    
})

    
