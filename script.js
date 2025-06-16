// Smooth scrolling para links de navegação
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Botão de busca
    const searchButton = document.querySelector('.btn-search');
    const searchInput = document.querySelector('.search-input');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function () {
            const location = searchInput.value.trim();
            if (location) {
                alert(`Buscando enfermeiros em: ${location}`);
            } else {
                alert('Por favor, digite uma localização');
            }
        });

        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }

    // Botões de chamada (CTA)
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = this.textContent.trim();
            if (buttonText === 'Buscar Enfermeiros') {
                redirectWithFade('enfermeiros.html');
            } else if (buttonText === 'Sou Enfermeiro') {
                redirectWithFade('cadastro-enfermeiro.html');
            }
        });
    });

    // Botões do header (Entrar / Cadastrar)
    const headerButtons = document.querySelectorAll('.nav-buttons .btn');
    headerButtons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = this.textContent.trim();
            if (buttonText === 'Entrar') {
                redirectWithFade('login.html');
            } else if (buttonText === 'Cadastrar') {
                redirectWithFade('cadastro.html');
            }
        });
    });

    // Animações quando os elementos entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .stat-item');
    animatedElements.forEach(el => {
        el.classList.add('animated-element');
        observer.observe(el);
    });

    // Navbar escondida ao rolar para baixo e reaparece ao subir
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    navbar.style.transition = 'transform 0.3s ease';

    // Toggle de menu mobile (opcional)
    const mobileToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});

// Redirecionamento com animação de fade
function redirectWithFade(url) {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = url;
    }, 400);
}

// Validação básica de formulário
function validateForm(formData) {
    const errors = [];

    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }

    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Email inválido');
    }

    if (!formData.phone || formData.phone.trim().length < 10) {
        errors.push('Telefone deve ter pelo menos 10 dígitos');
    }

    return errors;
}

// Verifica se e-mail é válido
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Formata número de telefone
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);

    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phone;
}

// Exibe uma notificação na tela
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    if (type === 'success') {
        notification.style.backgroundColor = '#10b981';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ef4444';
    } else {
        notification.style.backgroundColor = '#3b82f6';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
