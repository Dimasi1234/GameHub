const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const navLoginBtn = document.getElementById('nav-login-btn');

// Mengatur tampilan form (Login/Register toggle)
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

// Simpan data pengguna saat Register
const registerForm = document.querySelector('.form-box.register form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = registerForm.querySelector('input[type="text"]').value.trim();
    const email = registerForm.querySelector('input[type="email"]').value.trim();
    const password = registerForm.querySelector('input[type="password"]').value;

    if (username && email && password) {
        const user = { username, email, password };
        localStorage.setItem('userData', JSON.stringify(user));

        alert('Registration Successful! Redirecting to login...');
        window.location.href = 'form.html'; // Redirect ke halaman login
    } else {
        alert('Please fill out all fields!');
    }
});

// Validasi Login (menggunakan username dan password)
const loginForm = document.querySelector('.form-box.login form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = loginForm.querySelector('input[type="text"]').value.trim(); // Gunakan input "email" untuk username
    const password = loginForm.querySelector('input[type="password"]').value;

    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && userData.username === username && userData.password === password) {
        alert(`Welcome, ${userData.username}! Redirecting to main page...`);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', userData.username);

        window.location.href = 'main.html'; // Redirect ke halaman utama
    } else {
        alert('Invalid username or password!');
    }
});

// Fungsi untuk mengatur tombol Sign-In
function updateNavButton() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');

    if (isLoggedIn === 'true' && currentUser) {
        navLoginBtn.textContent = currentUser;
        navLoginBtn.href = 'profile.html'; // Redirect ke halaman profil
    } else {
        navLoginBtn.textContent = 'Sign In';
        navLoginBtn.href = 'form.html'; // Redirect ke halaman login/register
    }
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', updateNavButton);
