// script.js for the header

document.addEventListener('DOMContentLoaded', function () {
    // Check if the user is signed in (you can use your authentication logic here)
    const userEmail = localStorage.getItem('userEmail');

    if (userEmail) {
        // User is signed in, replace "Sign Up" with user's email
        updateHeader(userEmail);
    } else {
        // User is not signed in, keep "Sign Up" link
        updateHeaderSignUp();
    }
});

function updateHeader(email) {
    const headerRight = document.getElementById('headerRight');
    headerRight.innerHTML = `
        <a href="{{site.baseurl}}/">Home</a>
        <a href="{{site.baseurl}}/Statistics/">Statistics</a>
        <a href="{{site.baseurl}}/About">About</a>
        <span>${email}</span>
    `;
}

function updateHeaderSignUp() {
    const headerRight = document.getElementById('headerRight');
    headerRight.innerHTML = `
        <a href="{{site.baseurl}}/">Home</a>
        <a href="{{site.baseurl}}/Statistics/">Statistics</a>
        <a href="{{site.baseurl}}/About">About</a>
        <a href="{{site.baseurl}}/assets/sign-in/sign_in">Sign Up</a>
    `;
}
