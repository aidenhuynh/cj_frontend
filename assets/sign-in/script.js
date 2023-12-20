document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var url = "http://127.0.0.1:8087/human/authenticate"
    
        if (!window.location.href.includes("127.0.0.1")) {
            url = "https://cj-backend.stu.nighthawkcodingsociety.com/human/authenticate"
        }

    // Make a POST request to your authentication endpoint

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
})
.then(response => {
    if (response.status === 401) {
        alert("Invalid username/password, please try again or make a new account")
        throw new Error("401: Unauthorized")
    }

    return response.json()})
.then(data => {
        // Assuming the response contains a 'token' field
        var token = data.token;
        // Store the token in localStorage or a cookie for future use
        // For simplicity, we're using localStorage here
            console.log(token);
            localStorage.setItem('token', token);

            alert('Sign in successful!');
    })
    .catch(error => console.error('Error:', error));
});