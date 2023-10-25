document.addEventListener('DOMContentLoaded', function () {
  // Read the user's email from the cookie
  const cookies = document.cookie.split('; ');
  let userEmail = '';
  for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === 'userEmail') {
          userEmail = value;
          break;
      }
  }

  if (userEmail) {
      // User is signed in, replace "Sign Up" with user's email
      updateHeader(userEmail);
  } else {
      // User is not signed in, keep "Sign Up" link
      updateHeaderSignUp();
  }

  displayCookies(cookies);
});

function displayCookies(cookies) {
  const cookieDisplay = document.getElementById('cookieDisplay');
  if (cookieDisplay) {
      const cookiesList = cookies.map(cookie => {
          const [name, value] = cookie.split('=');
          return `${name}: ${value}`;
      });

      cookieDisplay.innerHTML = cookiesList.join('<br>');
  }
}

function updateHeader(email) {
  const headerRight = document.getElementById('headerRight');
  headerRight.innerHTML = `
      <a href="/">Home</a>
      <a href="/stats/">Statistics</a>
      <a href="/About">About</a>
      <span>${email}</span>
      <a href="javascript:signOut()">Sign Out</a>
  `;
}

function updateHeaderSignUp() {
  const headerRight = document.getElementById('headerRight');
  headerRight.innerHTML = `
      <a href="/">Home</a>
      <a href="/stats/">Statistics</a>
      <a href="/About">About</a>
      <a href="/sign_in">Sign Up</a>
  `;
}

function signOut() {
  // Remove the "userEmail" cookie
  document.cookie = 'userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

  // Redirect to the sign-in page or any other desired page
  window.location.href = '/sign_in';
}