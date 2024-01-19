// logging in
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const emailElement = document.querySelector('#email-login');
  const email = emailElement.value.trim();
  const passwordElement = document.querySelector('#password-login');
  const password = passwordElement.value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint /api/users/login for logging in
    console.log('Email:', email); 
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the homepage page
      document.location.replace('/homepage');
    } else {
      alert(response.statusText);
    }
  }
};

// sign up for the website
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // sign up endpoint /api/users
  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
 // If successful, redirect the browser to the homepage page
    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
