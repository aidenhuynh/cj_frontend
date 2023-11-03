document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Make a POST request to your authentication endpoint
    fetch('https://cj-backend.stu.nighthawkcodingsociety.com/human/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
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