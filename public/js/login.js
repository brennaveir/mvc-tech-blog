const signupForm = document.querySelector('.signup-form');
const loginForm = document.querySelector('.login-form')

async function signUp(event) {
    event.preventDefault();
    const signUpUsername = document.querySelector('#signup-username').value.trim();
    const signUpPassword = document.querySelector('#signup-password').value.trim();

    const newUser = {
        username: signUpUsername,
        password: signUpPassword
    }
   
    if (username && password) {
        const response = await fetch('/api/users/signup', {
            body: JSON.stringify(newUser),
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }
        })
    }
    
    if (response.ok) {
        document.location.replace('/blogpost')
    }
    else {
        alert(response.statusText);
    }

    //clears input after form submission 
    signupForm.reset();
}

const login = async (event) => {
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
        // If successful, redirect the browser to the profile page
        document.location.replace('/blogpost');
      } else {
        alert(response.statusText);
      }
    }
  };

signupForm.addEventListener("submit", signUp)
loginForm.addEventListener("submit", login)