// script for handling login
if(document.querySelector('#loginSubmit')) {
    const $loginBTN = document.querySelector('#loginSubmit');
    
    const loginHandler = async () => {
        const username = document.querySelector('#loginUsername').value.trim();
        const password = document.querySelector('#loginPassword').value.trim();
    
        console.log(username);
        console.log(password);
    
        if (username && password) {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            (response.ok) ? document.location.replace('/') : alert('Invalid Credentials');
        }
    }
    
    $loginBTN.addEventListener("click", loginHandler);
}