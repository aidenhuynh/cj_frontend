<p>Connecting to Spotify API! If you don't get redirected click the button below.</p>
<button type="button" id="login-button">Click Me!</button>


<script type="module">
    function generateRandomString(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
        for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    
    async function generateCodeChallenge(codeVerifier) {
        function base64encode(string) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
        }
    
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
    
        return base64encode(digest);
    }



    const clientId = 'a76d4532c6e14dd7bd7393e3fccc1185';
    var redirectUri = "";
    var url = "{{ site.url }}"
    if (url.includes("localhost")){
        redirectUri = 'http://127.0.0.1:4100/classroom';
    }
    else {
        redirectUri = 'https://classroomjukebox.com/classroom';
    }

    
    let codeVerifier = generateRandomString(128);
    
    function redirectToSpotifyAuthorizeEndpoint(){
        generateCodeChallenge(codeVerifier).then(codeChallenge => {
            let state = generateRandomString(16);
            let scope = 'user-read-private user-read-email user-modify-playback-state user-library-read user-read-playback-state';
        
            localStorage.setItem('code_verifier', codeVerifier);
        
            let args = new URLSearchParams({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
            state: state,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge
            });
        
            window.location = 'https://accounts.spotify.com/authorize?' + args;
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
        
    if(code){

    }else{
        document.getElementById('login-button').addEventListener('click', function() { redirectToSpotifyAuthorizeEndpoint();}, false);
    }

    redirectToSpotifyAuthorizeEndpoint();
</script>