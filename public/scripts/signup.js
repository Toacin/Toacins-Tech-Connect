if(document.querySelector('#signUpButton')) {
    const $signUpBTN = document.querySelector('#signUpButton');
    
    const loginHandler = async () => {
        const username = document.querySelector('#signUpUsername').value.trim();
        const password = document.querySelector('#signUpPassword').value.trim();
        const confPassword = document.querySelector('#confirmPassword').value.trim();

        if (password !== confPassword) {
            alert("Passwords don't match");
            return;
        }
    
        if (username && password && confPassword) {
            const response = await fetch('/api/user', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            (response.ok) ? document.location.replace('/') : alert('Oops, something went wrong');
        }
    }
    
    $signUpBTN.addEventListener("click", loginHandler);
}