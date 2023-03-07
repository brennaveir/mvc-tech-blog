const signupForm = document.querySelector('.signup-form');

async function signUp(event) {
    event.preventDefault();
    const signUpUsername = document.querySelector('#signup-username').value.trim();
    const signUpPassword = document.querySelector('#signup-password').value.trim();

    const newUser = {
        username: signUpUsername,
        password: signUpPassword
    }

   const response = await fetch('/api/users/login', {
        body: JSON.stringify(newUser),
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    })

    if (response.ok) {
        console.log('!')
    }
    else {
        console.log('nah')
    }

    //clears input after form submission 
    signupForm.reset();
}
signupForm.addEventListener("submit", signUp)