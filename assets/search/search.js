curl -X GET "https://api.spotify.com/v1/search?q=track%3Anumb+artist%3Alinkin+park&type=track" -H "Accept: application/json"

$.get( "https://api.spotify.com/v1/search?q=track%3Anumb+artist%3Alinkin+park&type=track", 
    function( data ) {
        console.log(data);  
    });

    curl H "Authorization: Basic YOUR_CLIENT_CREDENTIALS" -d grant_type=client_credentials https://accounts.spotify.com/api/token

    btoa('')

    curl -X GET "https://api.spotify.com/v1/audio-features/YOUR_TRACK_ID" -H "Authorization: Bearer {YOUR_Access-TOKEN}"

    $.ajax({
        url: 'https://api.spotify.com/v1/audio-features/2nLtzopw4rPReszdYBJU6h',
        headers: {
            'Authorization': 'Bearer ' + 'YOUR_ACCESS_TOKEN'
        },
        success: function(response) {
            console.log(response);
        }
     });

console.log("Search for + searchInput); // Taylor Swift30
async function search() {31,32,33, 34, 35,36,37}

var artistParameters = {
method: 'GET',
headers: {
'Content-Type': 'application/json', 'Authorization': 'Bearer
+accessToken
38,39,70,#1,42}
}
var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', artistParameters)
.then(response => response.json())
.then(data => { return data.artists.items[0].id })
48
#43
14
46
47
56789a
45
console.log("Artist ID is "+artistID);
{49,5
}