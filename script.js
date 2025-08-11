document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const languageSelect = document.getElementById('language-select');
    const welcomeText = document.getElementById('welcome-text');
    const langLabel = document.getElementById('lang-label');
    const themeLabel = document.getElementById('theme-label');
    const footer = document.querySelector('.footer p');
    const body = document.body;
    const positionButtons = document.querySelectorAll('.position-button');
    const h1elements = document.querySelectorAll('h1.welcome-text');
    const backButtonSpan = document.querySelector('.back-button span');
    const actionButtons = document.querySelectorAll('.action-button');
    const contactInfoParagraphs = document.querySelectorAll('.contact-info p strong');
    const contactsDescriptionParagraph = document.querySelector('.contacts-page .main-content p');
    const choosePositionParagraph = document.querySelector('#choose-position-paragraph');
    
    // Nové elementy pro profilové menu
    const profileButton = document.getElementById('profile-button');
    const profileMenu = document.getElementById('profile-menu');
    const userNameMenu = document.getElementById('user-name-menu');
    const userPositionMenu = document.getElementById('user-position-menu');

    // Překlady
    const translations = {
        'cs': {
            welcome: 'Vítejte v Edukaci.DPD',
            choosePosition: 'Vyberte si prosím svou pracovní pozici:',
            loginTitle: 'Přihlášení',
            contactsTitle: 'Důležité kontakty',
            contactsDescription: 'Zde naleznete kontakty na klíčové osoby pro vaše vzdělávání a podporu.',
            contactPositions: {
                'Koordinátor vzdělávání': 'Koordinátor vzdělávání',
                'HR Manager / Manažer personálního oddělení': 'HR Manager / Manažer personálního oddělení'
            },
            lang: 'Jazyk:',
            theme: 'Tmavý režim:',
            positions: {
                'skladnik': 'Skladník',
                'admin': 'Admin',
                'shiftleader': 'Shift Leader',
                'driver': 'Driver',
                'depotmanager': 'Depot Manager',
                'kuryr': 'Kurýr'
            },
            positionsFull: {
                'Skladník': 'Skladník',
                'Admin': 'Admin',
                'Shift Leader': 'Shift Leader',
                'Driver': 'Driver',
                'Depot Manager': 'Depot Manager',
                'Kurýr': 'Kurýr'
            },
            back: 'Zpět',
            logout: 'Odhlásit se',
            materials: {
                'skladnik': 'Materiály pro skladníka',
                'admin': 'Materiály pro Admina',
                'shiftleader': 'Materiály pro Shift Leadera',
                'driver': 'Materiály pro Drivera',
                'depotmanager': 'Materiály pro Depot Managera',
                'kuryr': 'Materiály pro Kurýra'
            },
            actionButtons: {
                'CheckList - PDF': 'CheckList - PDF',
                'Procesy a Manuály': 'Procesy a Manuály',
                'Video návody': 'Video návody',
                'Kontakty': 'Kontakty'
            },
            changePassword: 'Změna hesla',
            footer: '© 2025 Edukace.DPD. Všechna práva vyhrazena.'
        },
        'en': {
            welcome: 'Welcome to Edukace.DPD',
            choosePosition: 'Please select your job position:',
            loginTitle: 'Login',
            contactsTitle: 'Important Contacts',
            contactsDescription: 'Here you will find contacts for key people for your education and support.',
            contactPositions: {
                'Koordinátor vzdělávání': 'Education Coordinator',
                'HR Manager / Manažer personálního oddělení': 'HR Manager'
            },
            lang: 'Language:',
            theme: 'Dark mode:',
            positions: {
                'skladnik': 'Warehouse Worker',
                'admin': 'Admin',
                'shiftleader': 'Shift Leader',
                'driver': 'Driver',
                'depotmanager': 'Depot Manager',
                'kuryr': 'Courier'
            },
            positionsFull: {
                'Skladník': 'Warehouse Worker',
                'Admin': 'Admin',
                'Shift Leader': 'Shift Leader',
                'Driver': 'Driver',
                'Depot Manager': 'Depot Manager',
                'Kurýr': 'Courier'
            },
            back: 'Back',
            logout: 'Logout',
            materials: {
                'skladnik': 'Materials for Warehouse Worker',
                'admin': 'Materials for Admin',
                'shiftleader': 'Materials for Shift Leader',
                'driver': 'Materials for Driver',
                'depotmanager': 'Materials for Depot Manager',
                'kuryr': 'Materials for Courier'
            },
            actionButtons: {
                'CheckList - PDF': 'CheckList - PDF',
                'Procesy a Manuály': 'Processes and Manuals',
                'Video návody': 'Video guides',
                'Kontakty': 'Contacts'
            },
            changePassword: 'Change Password',
            footer: '© 2025 Edukace.DPD. All rights reserved.'
        },
        'ru': {
            welcome: 'Добро пожаловать в Edukace.DPD',
            choosePosition: 'Пожалуйста, выберите свою должность:',
            loginTitle: 'Вход',
            contactsTitle: 'Важные контакты',
            contactsDescription: 'Здесь вы найдете контакты ключевых лиц для вашего обучения и поддержки.',
            contactPositions: {
                'Koordinátor vzdělávání': 'Координатор обучения',
                'HR Manager / Manažer personálního oddělení': 'Менеджер по персоналу'
            },
            lang: 'Язык:',
            theme: 'Темный режим:',
            positions: {
                'skladnik': 'Работник склада',
                'admin': 'Админ',
                'shiftleader': 'Руководитель смены',
                'driver': 'Водитель',
                'depotmanager': 'Менеджер склада',
                'kuryr': 'Курьер'
            },
            positionsFull: {
                'Skladník': 'Работник склада',
                'Admin': 'Админ',
                'Shift Leader': 'Руководитель смены',
                'Driver': 'Водитель',
                'Depot Manager': 'Менеджер склада',
                'Kurýr': 'Курьер'
            },
            back: 'Назад',
            logout: 'Выйти',
            materials: {
                'skladnik': 'Материалы для работника склада',
                'admin': 'Материалы для админа',
                'shiftleader': 'Материалы для руководителя смены',
                'driver': 'Материалы для водителя',
                'depotmanager': 'Материалы для менеджера склада',
                'kuryr': 'Материалы для курьера'
            },
            actionButtons: {
                'CheckList - PDF': 'Чек-лист - PDF',
                'Procesy a Manuály': 'Процессы и руководства',
                'Video návody': 'Видеоуроки',
                'Kontakty': 'Контакты'
            },
            changePassword: 'Сменить пароль',
            footer: '© 2025 Edukace.DPD. Все права защищены.'
        }
    };

    const applyTranslations = (lang) => {
        const t = translations[lang];
        if (!t) return;
        
        if (document.URL.includes('index.html')) {
            if (welcomeText) welcomeText.textContent = t.welcome;
            if (choosePositionParagraph) choosePositionParagraph.textContent = t.choosePosition;
        }

        h1elements.forEach(h1 => {
            if (document.URL.includes('kontakty.html')) {
                h1.textContent = t.contactsTitle;
            } else if (document.URL.includes('skladnik.html')) {
                h1.textContent = t.materials.skladnik;
            } else if (document.URL.includes('admin.html')) {
                h1.textContent = t.materials.admin;
            } else if (document.URL.includes('shiftleader.html')) {
                h1.textContent = t.materials.shiftleader;
            } else if (document.URL.includes('driver.html')) {
                h1.textContent = t.materials.driver;
            } else if (document.URL.includes('depotmanager.html')) {
                h1.textContent = t.materials.depotmanager;
            } else if (document.URL.includes('kuryr.html')) {
                h1.textContent = t.materials.kuryr;
            }
        });

        if (document.URL.includes('kontakty.html') && contactsDescriptionParagraph) {
            contactsDescriptionParagraph.textContent = t.contactsDescription;
        }
        
        if (langLabel) langLabel.textContent = t.lang;
        if (themeLabel) themeLabel.textContent = t.theme;
        if (footer) footer.textContent = t.footer;
        
        if (backButtonSpan) backButtonSpan.textContent = t.back;

        const logoutButton = document.querySelector('.profile-menu-item i.fa-sign-out-alt')?.nextElementSibling;
        if(logoutButton) logoutButton.textContent = t.logout;

        const changePasswordButton = document.querySelector('.profile-menu-item i.fa-lock')?.nextElementSibling;
        if(changePasswordButton) changePasswordButton.textContent = t.changePassword;

        if (positionButtons.length > 0) {
            positionButtons.forEach(button => {
                const originalText = button.dataset.pos;
                const icon = button.querySelector('i').outerHTML;
                const newText = t.positionsFull[originalText];
                button.innerHTML = icon + ' ' + newText;
            });
        }
        
        // OPRAVENÁ SEKCE
        if (actionButtons.length > 0) {
            actionButtons.forEach(button => {
                const buttonTextElement = button.querySelector('.button-text');
                const originalText = buttonTextElement.textContent.trim();
                const allActionButtons = translations['cs'].actionButtons;
                for (const key in allActionButtons) {
                    if (originalText === translations['en'].actionButtons[key] || originalText === translations['ru'].actionButtons[key] || originalText === translations['cs'].actionButtons[key]) {
                        buttonTextElement.textContent = t.actionButtons[key];
                        break;
                    }
                }
            });
        }

        if (contactInfoParagraphs.length > 0) {
            contactInfoParagraphs.forEach(p => {
                const originalText = p.textContent.trim();
                const allContactPositions = translations['cs'].contactPositions;
                for (const key in allContactPositions) {
                    if (originalText === translations['en'].contactPositions[key] || originalText === translations['ru'].contactPositions[key] || originalText === translations['cs'].contactPositions[key]) {
                        p.textContent = t.contactPositions[key];
                        break;
                    }
                }
            });
        }
        // KONEC OPRAVENÉ SEKCE
    };

    const updateThemeState = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            if (themeToggle) {
                themeToggle.checked = true;
            }
        } else {
            body.classList.remove('dark-mode');
            if (themeToggle) {
                themeToggle.checked = false;
            }
        }
    };

    // Načtení a aplikování uloženého jazyka
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

    // Načtení a aplikování uloženého stavu tmavého režimu
    updateThemeState();

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
    
    // Zbytek vašeho kódu pro navigaci a profilové menu
    const backButton = document.getElementById('back-to-position');
    if (backButton) {
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.history.back();
        });
    }

    if (profileButton && profileMenu) {
        profileButton.addEventListener('click', () => {
            profileMenu.classList.toggle('visible');
        });
        
        const loggedInUser = localStorage.getItem('loggedInUser');
        const userRoleShort = document.title.split(' - ')[1]?.toLowerCase().replace(' ', '');
        const userRole = translations[savedLang].positions[userRoleShort];
        
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