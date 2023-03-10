const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#signup-username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#signup-password').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert("You did it! Congrats!!!")
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the home page
      document.location.replace('/');
    } else {
      console.log(password);
    }
  }
};


document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);