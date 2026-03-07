document.getElementById('login-btn').addEventListener('click', () => {
    const userName = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (userName === 'admin' && password === 'admin123') {
        alert('Login Successfully....!')
        window.location.href = "main.html";
    }
    else{
        alert("Wrong username or password");
    }

})