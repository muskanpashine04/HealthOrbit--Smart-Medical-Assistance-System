// Admin Panel JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const adminWrapper = document.querySelector('.admin-wrapper');
    const adminSidebar = document.querySelector('.admin-sidebar');
    const adminContent = document.querySelector('.admin-content');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            adminSidebar.classList.toggle('collapsed');
            adminContent.classList.toggle('expanded');
        });
    }
    
    // Admin Login Form
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember')?.checked || false;
            
            // Validate form data
            if (!username || !password) {
                showAdminMessage('Please fill in all required fields', 'error');
                return;
            }
            
            // In a real application, you would send this data to a server for authentication
            // For this demo, we'll use a simple check for admin credentials
            if (username === 'ElonDADA' && password === 'ElonDADA123@!') {
                // Simulate API call delay
                showAdminMessage('Logging in...', 'info');
                
                setTimeout(() => {
                    // Simulate successful login
                    showAdminMessage('Login successful! Redirecting...', 'success');
                    
                    // Store admin info in localStorage if remember me is checked
                    if (remember) {
                        localStorage.setItem('med_aids_admin', 'true');
                        localStorage.setItem('med_aids_admin_username', username);
                    } else {
                        // Use sessionStorage if remember me is not checked
                        sessionStorage.setItem('med_aids_admin', 'true');
                        sessionStorage.setItem('med_aids_admin_username', username);
                    }
                    
                    // Redirect to admin dashboard after successful login
                    setTimeout(() => {
                        window.location.href = 'admin-dashboard.html';
                    }, 1500);
                }, 1000);
            } else {
                showAdminMessage('Invalid username or password', 'error');
            }
        });
    }
    
    // Check if user is logged in as admin
    function checkAdminAuth() {
        const isAdminPage = window.location.pathname.includes('admin-') && !window.location.pathname.includes('admin-login');
        const isAdminLoggedIn = localStorage.getItem('med_aids_admin') === 'true' || sessionStorage.getItem('med_aids_admin') === 'true';
        
        if (isAdminPage && !isAdminLoggedIn) {
            // Redirect to admin login if trying to access admin page without being logged in
            window.location.href = 'admin-login.html';
        }
    }
    
    // Run auth check
    checkAdminAuth();
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear admin session
            localStorage.removeItem('med_aids_admin');
            localStorage.removeItem('med_aids_admin_username');
            sessionStorage.removeItem('med_aids_admin');
            sessionStorage.removeItem('med_aids_admin_username');
            
            // Redirect to login page
            window.location.href = 'admin-login.html';
        });
    }
    
    // Section tabs functionality
    const sectionTabs = document.querySelectorAll('.section-tab');
    if (sectionTabs.length > 0) {
        sectionTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                sectionTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all section content
                const sectionContents = document.querySelectorAll('.section-content');
                sectionContents.forEach(content => content.classList.remove('active'));
                
                // Show selected section content
                const sectionId = this.getAttribute('data-section');
                const selectedSection = document.getElementById(`${sectionId}-section`);
                if (selectedSection) {
                    selectedSection.classList.add('active');
                }
            });
        });
    }
    
    // Page selection functionality
    const pageItems = document.querySelectorAll('.page-item');
    if (pageItems.length > 0) {
        pageItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                pageItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
            });
        });
    }
    
    // Function to show admin messages
    function showAdminMessage(message, type = 'info') {
        // Remove any existing message
        const existingMessage = document.querySelector('.admin-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `admin-message ${type}`;
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
    
    // Add CSS for admin messages
    const style = document.createElement('style');
    style.textContent = `
        .admin-message {
            padding: 12px 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .admin-message.success {
            background-color: rgba(52, 168, 83, 0.1);
            color: #34a853;
        }
        
        .admin-message.error {
            background-color: rgba(234, 67, 53, 0.1);
            color: #ea4335;
        }
        
        .admin-message.info {
            background-color: rgba(66, 133, 244, 0.1);
            color: #4285f4;
        }
    `;
    document.head.appendChild(style);
    
    // Populate admin user info if logged in
    const adminName = document.querySelector('.admin-name');
    if (adminName) {
        const username = localStorage.getItem('med_aids_admin_username') || sessionStorage.getItem('med_aids_admin_username') || 'Admin User';
        adminName.textContent = username;
    }
    
    // Create admin avatar if it doesn't exist
    const adminAvatar = document.querySelector('.admin-avatar');
    if (adminAvatar && adminAvatar.src.includes('https://via.placeholder.com/40/007bff/ffffff?text=AU')) {
        // Create a placeholder SVG for admin avatar
        const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="20" fill="#1a73e8" />
            <text x="20" y="25" font-family="Arial" font-size="16" fill="white" text-anchor="middle">A</text>
        </svg>
        `;
        
        // Convert SVG to data URL
        const dataUrl = 'data:image/svg+xml;base64,' + btoa(svgContent);
        adminAvatar.src = dataUrl;
    }

    // Add more admin-specific JavaScript functionalities here as needed

    function showMessage(message, type) {
        const messageContainer = document.getElementById('messageContainer');
        if (!messageContainer) {
            console.warn('Message container not found. Creating one.');
            const body = document.querySelector('body');
            const newContainer = document.createElement('div');
            newContainer.id = 'messageContainer';
            newContainer.style.position = 'fixed';
            newContainer.style.top = '20px';
            newContainer.style.left = '50%';
            newContainer.style.transform = 'translateX(-50%)';
            newContainer.style.zIndex = '1000';
            newContainer.style.width = 'fit-content';
            newContainer.style.maxWidth = '90%';
            body.prepend(newContainer);
            messageContainer = newContainer;
        }

        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        messageElement.textContent = message;

        messageContainer.appendChild(messageElement);

        // Automatically remove the message after 3 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }

    // Example usage (can be removed after integration):
    // showMessage('Welcome to the Admin Panel!', 'success');
    // showMessage('Error: Something went wrong.', 'error');
    // showMessage('Info: Please review the changes.', 'info');


});