// Authentication JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            
            // Toggle password visibility
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember')?.checked || false;
            
            // Validate form data
            if (!email || !password) {
                showMessage('Please fill in all required fields', 'error');
                return;
            }
            
            // In a real application, you would send this data to a server for authentication
            // For this demo, we'll simulate a successful login
            console.log('Login attempt:', { email, password, remember });
            
            // Simulate API call delay
            showMessage('Logging in...', 'info');
            
            setTimeout(() => {
                // Simulate successful login
                showMessage('Login successful! Redirecting...', 'success');
                
                // Store user info in localStorage if remember me is checked
                if (remember) {
                    localStorage.setItem('med_aids_user_email', email);
                }
                
                // Redirect to dashboard or home page after successful login
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1500);
            }, 1000);
        });
    }
    
    // Registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const dob = document.getElementById('dob').value;
            const gender = document.querySelector('input[name="gender"]:checked')?.value;
            const terms = document.getElementById('terms').checked;
            
            // Validate form data
            if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !dob || !gender) {
                showMessage('Please fill in all required fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showMessage('Passwords do not match', 'error');
                return;
            }
            
            if (!terms) {
                showMessage('You must agree to the Terms of Service and Privacy Policy', 'error');
                return;
            }
            
            // In a real application, you would send this data to a server for registration
            // For this demo, we'll simulate a successful registration
            console.log('Registration attempt:', { firstName, lastName, email, phone, password, dob, gender, terms });
            
            // Simulate API call delay
            showMessage('Creating your account...', 'info');
            
            setTimeout(() => {
                // Simulate successful registration
                showMessage('Registration successful! Redirecting to login...', 'success');
                
                // Redirect to login page after successful registration
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            }, 1000);
        });
    }
    
    // Function to show messages
    function showMessage(message, type = 'info') {
        // Remove any existing message
        const existingMessage = document.querySelector('.auth-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `auth-message ${type}`;
        messageElement.innerHTML = `<i class="fas ${getIconForMessageType(type)}"></i> ${message}`;
        
        // Insert message after form
        const form = document.querySelector('.auth-form');
        if (form) {
            form.insertAdjacentElement('afterbegin', messageElement);
            
            // Auto-remove success and info messages after 5 seconds
            if (type === 'success' || type === 'info') {
                setTimeout(() => {
                    messageElement.remove();
                }, 5000);
            }
        }
    }
    
    // Helper function to get icon for message type
    function getIconForMessageType(type) {
        switch (type) {
            case 'success':
                return 'fa-check-circle';
            case 'error':
                return 'fa-exclamation-circle';
            case 'info':
            default:
                return 'fa-info-circle';
        }
    }
    
    // Check if user email is stored in localStorage and pre-fill the email field
    const emailInput = document.getElementById('email');
    const storedEmail = localStorage.getItem('med_aids_user_email');
    
    if (emailInput && storedEmail) {
        emailInput.value = storedEmail;
        
        // If on login page, check the remember me checkbox
        const rememberCheckbox = document.getElementById('remember');
        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }
    }
    
    // Add CSS for auth messages
    const style = document.createElement('style');
    style.textContent = `
        .auth-message {
            padding: 12px 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .auth-message.success {
            background-color: rgba(52, 168, 83, 0.1);
            color: #34a853;
        }
        
        .auth-message.error {
            background-color: rgba(234, 67, 53, 0.1);
            color: #ea4335;
        }
        
        .auth-message.info {
            background-color: rgba(66, 133, 244, 0.1);
            color: #4285f4;
        }
    `;
    document.head.appendChild(style);
});