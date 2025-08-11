document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const loginForm = document.getElementById('login-form');
    const welcomeText = document.getElementById('welcome-text');
    const roleText = document.getElementById('role-text');
    const usernameLabel = document.querySelector('label[for="username"]');
    const passwordLabel = document.querySelector('label[for="password"]');
    const submitButton = document.querySelector('.submit-button');
    const backButtonSpan = document.querySelector('.back-button span');
    const footer = document.querySelector('.footer p');
    const themeLabel = document.getElementById('theme-label');

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

    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');

    const savedLang = localStorage.getItem('language') || 'cs';

    const translations = {
        'cs': {
            loginTitle: 'Přihlášení',
            roleText: 'Vybrali jste pozici: ',
            username: 'Jméno',
            password: 'Heslo',
            submit: 'Přihlásit se',
            positions: {
                'skladnik': 'Skladník',
                'admin': 'Admin',
                'shiftleader': 'Shift Leader',
                'driver': 'Driver',
                'depotmanager': 'Depot Manager',
                'kuryr': 'Kurýr'
            },
            back: 'Zpět',
            theme: 'Tmavý režim:',
            footer: '© 2025 Edukace.DPD. Všechna práva vyhrazena.'
        },
        'en': {
            loginTitle: 'Login',
            roleText: 'You have selected a position: ',
            username: 'Username',
            password: 'Password',
            submit: 'Log in',
            positions: {
                'skladnik': 'Warehouse Worker',
                'admin': 'Admin',
                'shiftleader': 'Shift Leader',
                'driver': 'Driver',
                'depotmanager': 'Depot Manager',
                'kuryr': 'Courier'
            },
            back: 'Back',
            theme: 'Dark mode:',
            footer: '© 2025 Edukace.DPD. All rights reserved.'
        },
        'ru': {
            loginTitle: 'Вход',
            roleText: 'Вы выбрали позицию: ',
            username: 'Имя',
            password: 'Пароль',
            submit: 'Войти',
            positions: {
                'skladnik': 'Кладовщик',
                'admin': 'Админ',
                'shiftleader': 'Руководитель смены',
                'driver': 'Водитель',
                'depotmanager': 'Менеджер склада',
                'kuryr': 'Курьер'
            },
            back: 'Назад',
            theme: 'Темный режим:',
            footer: '© 2025 Edukace.DPD. Все права защищены.'
        }
    };

    const applyLoginTranslations = (lang) => {
        const t = translations[lang];
        if (!t) return;
        
        if (welcomeText) welcomeText.textContent = t.loginTitle;
        if (roleText && role) {
            roleText.textContent = `${t.roleText} ${t.positions[role] || 'Unknown position'}`;
        }
        if (usernameLabel) usernameLabel.textContent = t.username;
        if (passwordLabel) passwordLabel.textContent = t.password;
        if (submitButton) submitButton.textContent = t.submit;
        if (backButtonSpan) backButtonSpan.textContent = t.back;
        if (themeLabel) themeLabel.textContent = t.theme;
        if (footer) footer.textContent = t.footer;
    };
    
    applyLoginTranslations(savedLang);

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const usernameInput = document.getElementById('username');
            const enteredUsername = usernameInput.value;

            localStorage.setItem('loggedInUser', enteredUsername);

            if (role) {
                window.location.href = `${role}.html`;
            }
        });
    }
});