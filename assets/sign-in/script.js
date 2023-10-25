function signIn(event) {
  event.preventDefault();

  // Get email and password from the form
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // authentication logic (validate email and password)
  /*
  if (email == (get email data) && password == (get password data)) {
      const isAuthenticated = true;
  }
  else {
      const isAuthenticated = false;
  }
  */

  // For demo purposes, let's assume successful authentication
  const isAuthenticated = true;

  if (isAuthenticated) {
      // Set a cookie with the user's email
      document.cookie = `userEmail=${email}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;

      // Redirect to the home page
      window.location.href = '/';
  } else {
      // Display an error message (you can customize this based on your authentication logic)
      alert('Authentication failed. Please check your email and password.');
  }
}
