// ✅ Register Service Worker (PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker: Registered successfully');
            })
            .catch(error => {
                console.log('⚠️ Service Worker: Registration failed -', error);
            });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🪷 Lotus Script: Initializing...');

    // --- NAVBAR SCROLL EFFECT ---
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 50;

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- MOBILE MENU TOGGLE ---
    const hamburger = document.querySelector('.hamburger') || document.querySelector('.burger') || document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Toggle Nav
            navLinks.classList.toggle('nav-active');

            // Animate Links
            navLinksItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            hamburger.classList.toggle('toggle');
        });

        // Close mobile menu when clicking a link
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                    hamburger.classList.remove('toggle');
                    navLinksItems.forEach(link => link.style.animation = '');
                }
            });
        });
    }

    // --- TRANSLATION SYSTEM (REFACTORED) ---
    let translations = {};
    const defaultLang = 'pt';
    const savedLang = localStorage.getItem('lotus-lang') || defaultLang;

    const loadTranslations = async (lang) => {
        try {
            const response = await fetch(`./locales/${lang}.json`);
            if (!response.ok) throw new Error(`Could not load ${lang} translations`);
            translations = await response.json();
            return translations;
        } catch (error) {
            console.error('Translation error:', error);
            if (lang !== 'pt') return loadTranslations('pt');
            return {};
        }
    };

    const changeLanguage = async (lang) => {
        try {
            await loadTranslations(lang);

            // Translate innerHTML
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[key]) {
                    if (el.tagName === 'TITLE') {
                        document.title = translations[key];
                    } else {
                        el.innerHTML = translations[key];
                    }
                }
            });

            // Translate placeholders
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if (translations[key]) {
                    el.placeholder = translations[key];
                }
            });

            // Translate meta tags content
            document.querySelectorAll('[data-i18n-content]').forEach(el => {
                const key = el.getAttribute('data-i18n-content');
                if (translations[key]) {
                    el.setAttribute('content', translations[key]);
                }
            });

            const currentLangLabel = document.getElementById('currentLang');
            if (currentLangLabel) currentLangLabel.textContent = lang.toUpperCase();

            localStorage.setItem('lotus-lang', lang);
            document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;

            console.log(`Language changed to: ${lang}`);
        } catch (e) {
            console.error('Change language error:', e);
        }
    };

    // Initialize Language
    changeLanguage(savedLang).then(() => {
        console.log('Lotus Script: Localization complete.');

        // --- REVEAL ON SCROLL (Only initialize after content is loaded/translated) ---
        const revealElements = document.querySelectorAll('.reveal');
        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealOnScroll.observe(el);
        });

        // Trigger initial scroll to reveal top elements
        window.dispatchEvent(new Event('scroll'));
    });

    // Lang Dropdown - Click Toggle (more reliable than hover-only)
    const langDropBtn = document.getElementById('langDropBtn');
    const langDropdownContent = document.getElementById('langOptions');
    const langDropdown = langDropBtn ? langDropBtn.closest('.lang-dropdown') : null;

    if (langDropBtn && langDropdownContent && langDropdown) {
        langDropBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('open');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!langDropdown.contains(e.target)) {
                langDropdown.classList.remove('open');
            }
        });
    }

    const langOptions = document.querySelectorAll('.lang-dropdown-content a');
    langOptions.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = opt.getAttribute('data-lang');
            changeLanguage(lang);
            if (langDropdown) langDropdown.classList.remove('open');
        });
    });

    // --- CONTACT FORM HANDLER (✅ MELHORADO) ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        // ✅ Validação em tempo real
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
            input.addEventListener('input', () => {
                if (input.value) validateField(input);
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validar todos os campos
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) isValid = false;
            });

            if (!isValid) {
                const lang = document.documentElement.lang;
                alert(lang.startsWith('pt')
                    ? 'Por favor, preencha todos os campos obrigatórios corretamente.'
                    : 'Please fill in all required fields correctly.');
                return;
            }

            const btn = contactForm.querySelector('.btn-send');
            const originalText = btn.textContent;
            btn.disabled = true;
            btn.innerHTML = '<span data-i18n="form-sending">Enviando...</span>';

            // Simular envio
            setTimeout(() => {
                const lang = document.documentElement.lang;
                alert(lang.startsWith('pt')
                    ? '✓ Mensagem enviada com sucesso! Responderemos em breve.'
                    : '✓ Message sent successfully! We will respond soon.');
                contactForm.reset();
                btn.disabled = false;
                btn.innerHTML = originalText;
                inputs.forEach(input => input.classList.remove('valid'));
            }, 1500);
        });
    }

    // ✅ Função de validação
    function validateField(field) {
        if (field.type === 'email') {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
            field.classList.toggle('valid', isValid && field.value);
            field.classList.toggle('invalid', !isValid && field.value);
            return isValid || !field.required;
        }

        if (field.hasAttribute('required')) {
            const isValid = field.value.trim() !== '';
            field.classList.toggle('valid', isValid);
            return isValid;
        }
        return true;
    }

    // --- ACTIVE LINK ON SCROLL ---
    const scrollSections = document.querySelectorAll('header, section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        scrollSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href').slice(1);
            if (href === current) {
                item.classList.add('active');
            }
        });
    });

    // Initial trigger
    window.dispatchEvent(new Event('scroll'));
});
