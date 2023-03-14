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
      console.log("Yay!")
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log("login form listening")
  // Collect values from the login form
  const username = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      // Send a POST request to the API endpoint
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(response.body)

    if (response.ok) {
       document.location.replace('/');
      console.log("Good work!")
      // If successful, redirect the browser to the home page
     
    } else {
      alert("Oops, still not working. Try again");
    }
  }
};


document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
