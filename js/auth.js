let users = JSON.parse(localStorage.getItem('users')) || [];

    // Show/hide forms based on tab selection
    function showTab(tabName) {
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const forgotPasswordForm = document.getElementById('forgot-password-form');
        const tabs = document.querySelectorAll('.tab-btn');

        // Hide all forms
        loginForm.classList.add('hidden');
        signupForm.classList.add('hidden');
        forgotPasswordForm.classList.add('hidden');

        // Remove active class from all tabs
        tabs.forEach(tab => tab.classList.remove('active'));

        // Show selected form and activate tab
        if (tabName === 'login') {
            loginForm.classList.remove('hidden');
            tabs[0].classList.add('active');
        } else if (tabName === 'signup') {
            signupForm.classList.remove('hidden');
            tabs[1].classList.add('active');
        }
    }

    // Show forgot password form
    function showForgotPassword() {
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('forgot-password-form').classList.remove('hidden');
    }

    // Handle signup form submission
    document.getElementById('signup-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value;
        const phone = document.getElementById('signup-phone').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        // Check if user already exists
        if (users.some(user => user.phone === phone)) {
            alert('Phone number already registered!');
            return;
        }

        // Add new user
        users.push({ name, phone, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registration successful! Please login.');
        showTab('login');
    });

    // Handle login form submission
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const phone = document.getElementById('login-phone').value;
        const password = document.getElementById('login-password').value;

        // Find user
        const user = users.find(u => u.phone === phone && u.password === password);

        if (user) {
            // Store logged in user
            localStorage.setItem('currentUser', JSON.stringify(user));
            // Redirect to homepage
            window.location.href = 'home.html';
        } else {
            alert('Invalid phone number or password!');
        }
    });

    // Handle forgot password form submission
    document.getElementById('forgot-password-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('reset-email').value;
        const user = users.find(u => u.email === email);

        if (user) {
            const newPassword = prompt('Enter new password:');
            if (newPassword) {
                user.password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));
                alert('Password reset successful! Please login with your new password.');
                showTab('login');
            }
        } else {
            alert('Email not found!');
        }
    });

    // Initialize the page with login form
    showTab('login');