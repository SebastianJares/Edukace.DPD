document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const languageSelect = document.getElementById('language-select');
    const langLabel = document.getElementById('lang-label');
    const themeLabel = document.getElementById('theme-label');
    const footer = document.querySelector('.footer p');
    const body = document.body;
    const h1element = document.querySelector('h1.welcome-text');
    const backButton = document.getElementById('back-to-position');
    const backButtonSpan = document.querySelector('.back-button span');
    const contactsDescriptionParagraph = document.getElementById('contacts-description');
    const contactInfoParagraphs = document.querySelectorAll('.contact-info p strong');

    // Nové elementy pro profilové menu
    const profileButton = document.getElementById('profile-button');
    const profileMenu = document.getElementById('profile-menu');
    const userNameMenu = document.getElementById('user-name-menu');
    const userPositionMenu = document.getElementById('user-position-menu');
    
    // Překlady
    const translations = {
        'cs': {
            contactsTitle: 'Důležité kontakty',
            contactsDescription: 'Zde naleznete kontakty na klíčové osoby pro vaše vzdělávání a podporu.',
            contactPositions: {
                'Koordinátor vzdělávání': 'Koordinátor vzdělávání',
                'HR Manager / Manažer personálního oddělení': 'HR Manager / Manažer personálního oddělení'
            },
            lang: 'Jazyk:',
            theme: 'Tmavý režim:',
            back: 'Zpět',
            logout: 'Odhlásit se',
            changePassword: 'Změna hesla',
            footer: '© 2025 Edukace.DPD. Všechna práva vyhrazena.'
        },
        'en': {
            contactsTitle: 'Important Contacts',
            contactsDescription: 'Here you will find contacts for key people for your education and support.',
            contactPositions: {
                'Koordinátor vzdělávání': 'Education Coordinator',
                'HR Manager / Manažer personálního oddělení': 'HR Manager'
            },
            lang: 'Language:',
            theme: 'Dark mode:',
            back: 'Back',
            logout: 'Logout',
            changePassword: 'Change Password',
            footer: '© 2025 Edukace.DPD. All rights reserved.'
        },
        'ru': {
            contactsTitle: 'Важные контакты',
            contactsDescription: 'Здесь вы найдете контакты ключевых лиц для вашего обучения и поддержки.',
            contactPositions: {
                'Koordinátor vzdělávání': 'Координатор обучения',
                'HR Manager / Manažer personálního oddělení': 'Менеджер по персоналу'
            },
            lang: 'Язык:',
            theme: 'Темный режим:',
            back: 'Назад',
            logout: 'Выйти',
            changePassword: 'Сменить пароль',
            footer: '© 2025 Edukace.DPD. Все права защищены.'
        }
    };
    
    const applyTranslations = (lang) => {
        const t = translations[lang];
        if (!t) return;

        if (h1element) h1element.textContent = t.contactsTitle;
        if (contactsDescriptionParagraph) contactsDescriptionParagraph.textContent = t.contactsDescription;
        if (langLabel) langLabel.textContent = t.lang;
        if (themeLabel) themeLabel.textContent = t.theme;
        if (footer) footer.textContent = t.footer;
        if (backButtonSpan) backButtonSpan.textContent = t.back;
        
        const logoutButton = document.querySelector('.profile-menu-item i.fa-sign-out-alt').nextElementSibling;
        if(logoutButton) logoutButton.textContent = t.logout;

        const changePasswordButton = document.querySelector('.profile-menu-item i.fa-lock').nextElementSibling;
        if(changePasswordButton) changePasswordButton.textContent = t.changePassword;
        
        if (contactInfoParagraphs.length > 0) {
            contactInfoParagraphs.forEach(p => {
                const originalText = p.textContent.trim();
                const newText = t.contactPositions[originalText];
                if (newText) {
                    p.textContent = newText;
                }
            });
        }
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
    if (languageSelect) {
        languageSelect.value = savedLang;
        languageSelect.addEventListener('change', (e) => {
            const lang = e.target.value;
            localStorage.setItem('language', lang);
            applyTranslations(lang);
        });
    }
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

    if (backButton) {
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.history.back();
        });
    }

    // Funkce pro profilové menu
    if (profileButton && profileMenu) {
        profileButton.addEventListener('click', () => {
            profileMenu.classList.toggle('visible');
        });
        
        const loggedInUser = localStorage.getItem('loggedInUser');
        const urlParams = new URLSearchParams(window.location.search);
        const userRoleShort = urlParams.get('role');
        const userRole = localStorage.getItem('userPosition');
        
        if (loggedInUser) {
            userNameMenu.textContent = loggedInUser;
        }
        if (userRole) {
            userPositionMenu.textContent = userRole;
        }
        
        document.addEventListener('click', (event) => {
            if (!profileButton.contains(event.target) && !profileMenu.contains(event.target)) {
                profileMenu.classList.remove('visible');
            }
        });
    }
});