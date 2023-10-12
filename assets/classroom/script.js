var playlist = [
    {
        title: "Sneaky Snitch",
        artist: "Kevin MacLeod",
        cover: "https://i.scdn.co/image/ab67616d0000b273ad5ff10a04a737d3ea8ae0f7",
    },
    {
        title: "Cipher",
        artist: "Kevin MacLeod",
        cover: "https://i.scdn.co/image/ab67616d0000b27331dd4699f0ba3a18851f0092",
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
    if (data.length <= 18) {
        return data
    }

    data = data.slice(0, 18)

    const characters = [
        " ", "/", ".", ",", "-",
        "|", "+", "=", ")", "(",
        "*", "&", "^", '"', "'",
        ";", ":", "%", "$", "#",
        "@", "!", "[", "]", "{",
        "}", "<", ">", "`", "~"
    ]

    const loops = data.length - 1

    for (let i = loops; i > 0; i --) {
        if (characters.includes(data[i])) {
            data = data.slice(0, i)
            console.log("true")
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