document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const changePasswordForm = document.getElementById('change-password-form');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const messageElement = document.getElementById('message');
    const backButtonSpan = document.querySelector('.back-button span');
    const h1element = document.querySelector('h1.welcome-text');
    const newPasswordLabel = document.querySelector('label[for="new-password"]');
    const confirmPasswordLabel = document.querySelector('label[for="confirm-password"]');
    const submitButton = document.querySelector('.submit-button');
    const themeLabel = document.getElementById('theme-label');
    const footer = document.querySelector('.footer p');
    
    // Nové elementy pro profilové menu
    const profileButton = document.getElementById('profile-button');
    const profileMenu = document.getElementById('profile-menu');
    const userNameMenu = document.getElementById('user-name-menu');
    const userPositionMenu = document.getElementById('user-position-menu');

    // Překlady
    const translations = {
        'cs': {
            changePasswordTitle: 'Změna hesla',
            newPassword: 'Nové heslo',
            confirmPassword: 'Potvrzení nového hesla',
            submit: 'Změnit heslo',
            successMessage: 'Heslo bylo úspěšně změněno!',
            mismatchError: 'Hesla se neshodují. Zkuste to prosím znovu.',
            back: 'Zpět',
            logout: 'Odhlásit se',
            theme: 'Tmavý režim:',
            positions: {
                'skladnik': 'Skladník',
                'admin': 'Admin',
                'shiftleader': 'Shift Leader',
                'driver': 'Driver',
                'depotmanager': 'Depot Manager',
                'kuryr': 'Kurýr'
            },
            footer: '© 2025 Edukace.DPD. Všechna práva vyhrazena.'
        },
        'en': {
            changePasswordTitle: 'Change Password',
            newPassword: 'New password',
            confirmPassword: 'Confirm new password',
            submit: 'Change Password',
            successMessage: 'Password has been successfully changed!',
            mismatchError: 'Passwords do not match. Please try again.',
            back: 'Back',
            logout: 'Logout',
            theme: 'Dark mode:',
            positions: {
                'skladnik': 'Warehouse Worker',
                'admin': 'Admin',
                'shiftleader': 'Shift Leader',
                'driver': 'Driver',
                'depotmanager': 'Depot Manager',
                'kuryr': 'Courier'
            },
            footer: '© 2025 Edukace.DPD. All rights reserved.'
        },
        'ru': {
            changePasswordTitle: 'Сменить пароль',
            newPassword: 'Новый пароль',
            confirmPassword: 'Подтвердите новый пароль',
            submit: 'Сменить пароль',
            successMessage: 'Пароль успешно изменен!',
            mismatchError: 'Пароли не совпадают. Пожалуйста, попробуйте снова.',
            back: 'Назад',
            logout: 'Выйти',
            theme: 'Темный режим:',
            positions: {
                'skladnik': 'Кладовщик',
                'admin': 'Админ',
                'shiftleader': 'Руководитель смены',
                'driver': 'Водитель',
                'depotmanager': 'Менеджер склада',
                'kuryr': 'Курьер'
            },
            footer: '© 2025 Edukace.DPD. Все права защищены.'
        }
    };

    const applyTranslations = (lang) => {
        const t = translations[lang];
        if (!t) return;
        
        if (h1element) h1element.textContent = t.changePasswordTitle;
        if (newPasswordLabel) newPasswordLabel.textContent = t.newPassword;
        if (confirmPasswordLabel) confirmPasswordLabel.textContent = t.confirmPassword;
        if (submitButton) submitButton.textContent = t.submit;
        if (backButtonSpan) backButtonSpan.textContent = t.back;
        const logoutButton = document.querySelector('.profile-menu-item i.fa-sign-out-alt').nextElementSibling;
        if(logoutButton) logoutButton.textContent = t.logout;
        const changePasswordButton = document.querySelector('.profile-menu-item i.fa-lock').nextElementSibling;
        if(changePasswordButton) changePasswordButton.textContent = t.changePasswordTitle;
        if (themeLabel) themeLabel.textContent = t.theme;
        if (footer) footer.textContent = t.footer;
    };

    const updateThemeState = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            if (themeToggle) themeToggle.checked = true;
        } else {
            body.classList.remove('dark-mode');
            if (themeToggle) themeToggle.checked = false;
        }
    };

    const savedLang = localStorage.getItem('language') || 'cs';
    applyTranslations(savedLang);

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                localStorage.removeItem('theme');
            }
        });
    }

    window.addEventListener('pageshow', updateThemeState);
    updateThemeState();
    
    // Funkce pro profilové menu
    if (profileButton && profileMenu) {
        profileButton.addEventListener('click', () => {
            profileMenu.classList.toggle('visible');
        });
        
        const loggedInUser = localStorage.getItem('loggedInUser');
        const userRoleShort = new URLSearchParams(window.location.search).get('role');
        const userPosition = translations[savedLang].positions[userRoleShort];

        if (loggedInUser) {
            userNameMenu.textContent = loggedInUser;
        }
        if (userPosition) {
            userPositionMenu.textContent = userPosition;
        }

        document.addEventListener('click', (event) => {
            if (!profileButton.contains(event.target) && !profileMenu.contains(event.target)) {
                profileMenu.classList.remove('visible');
            }
        });
    }

    changePasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (newPassword === confirmPassword) {
            // V reálné aplikaci by se zde odeslal požadavek na server pro změnu hesla
            // Pro účely simulace jen uložíme heslo do localStorage
            localStorage.setItem('userPassword', newPassword);
            messageElement.textContent = translations[savedLang].successMessage;
            messageElement.style.color = 'green';
            setTimeout(() => {
                window.history.back();
            }, 2000);
        } else {
            messageElement.textContent = translations[savedLang].mismatchError;
            messageElement.style.color = 'red';
        }
    });
});