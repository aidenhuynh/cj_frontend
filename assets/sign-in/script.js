// script.js for both sign-in and home pages

function signIn(event) {
    event.preventDefault();

    // Get email and password from the form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Add your authentication logic here (validate email and password)

    // For demo purposes, let's assume successful authentication
    const isAuthenticated = true;

    if (isAuthenticated) {
        // Redirect to the home page
        window.location.href = '{{site.baseurl}}/';
    } else {
        // Display an error message (you can customize this based on your authentication logic)
        alert('Authentication failed. Please check your email and password.');
    }
}