document.addEventListener('DOMContentLoaded', () => {
    // Form elements
    const signupForm = document.querySelector('.signup-form');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const termsCheckbox = document.getElementById('terms');
    const createAccountBtn = document.querySelector('.create-account-btn');

    // Password visibility toggle
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update eye icon (assuming we have both open and closed eye icons)
        const img = togglePasswordBtn.querySelector('img');
        img.src = type === 'password' ? 'eye-icon.svg' : 'eye-open-icon.svg';
        img.alt = type === 'password' ? 'Show password' : 'Hide password';
    });

    // Form validation
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstname = document.getElementById('firstname').value.trim();
        const lastname = document.getElementById('lastname').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;

        // Simple validation
        if (!firstname || !lastname || !email || !password) {
            showError('Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        if (password.length < 8) {
            showError('Password must be at least 8 characters long');
            return;
        }

        if (!termsCheckbox.checked) {
            showError('Please agree to the Terms & Conditions');
            return;
        }

        // If validation passes, submit the form
        submitForm({
            firstname,
            lastname,
            email,
            password
        });
    });

    // Social sign-in buttons
    document.querySelector('.google-btn').addEventListener('click', () => {
        // Implement Google sign-in
        console.log('Google sign-in clicked');
    });

    document.querySelector('.apple-btn').addEventListener('click', () => {
        // Implement Apple sign-in
        console.log('Apple sign-in clicked');
    });

    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(message) {
        // Create and show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;

        // Remove any existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Insert error message after the form
        signupForm.insertAdjacentElement('beforebegin', errorDiv);

        // Remove error message after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    function submitForm(data) {
        // Show loading state
        createAccountBtn.disabled = true;
        createAccountBtn.textContent = 'Creating account...';

        // Simulate API call
        setTimeout(() => {
            console.log('Form submitted:', data);
            
            // Reset form
            signupForm.reset();
            createAccountBtn.disabled = false;
            createAccountBtn.textContent = 'Create account';

            // Show success message
            alert('Account created successfully!');
        }, 1500);
    }

    // Add input validation styles
    const inputs = signupForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.classList.add('valid');
                input.classList.remove('invalid');
            } else {
                input.classList.remove('valid');
                input.classList.add('invalid');
            }
        });
    });
});