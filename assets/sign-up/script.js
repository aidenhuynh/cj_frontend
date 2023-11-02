document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;

    // Construct the request URL with the form values
    var url = 'https://cj-backend.stu.nighthawkcodingsociety.com/human/post/?' +
              'email=' + email +
              '&password=' + password +
              '&name=' + name +
              '&dob=01-01-1840' +  // You can add the dob value as needed
              '&role=Teacher';  // You can add the role value as needed

    // Make a POST request to the constructed URL
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        // Assuming the response contains a 'token' field
        var token = data.token;
        // Store the token in localStorage or a cookie for future use
        // For simplicity, we're using localStorage here
        console.log(token);
        localStorage.setItem('token', token);

        alert('Sign up successful!');
    })
    .catch(error => console.error('Error:', error));
});
