const signupBtn = document.querySelector('.signup-form');

async function signUp(event) {
    event.preventDefault();
    const signUpUsername = document.querySelector('#signup-username').value.trim();
    const signUpPassword = document.querySelector('#signup-password').value.trim();
    console.log({ signUpPassword, signUpUsername });
//clears input after form submission
    const clearInputs = document.querySelectorAll('input');
clearInputs.forEach(input => input.value = '');
}

signupBtn.addEventListener("submit", signUp)