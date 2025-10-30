// ========================================
// MENU MOBILE
// ========================================
const btnMobile = document.getElementById('btn-mobile');
const nav = document.getElementById('nav');
const menu = document.getElementById('menu');

function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();
    nav.classList.toggle('active');
    const active = nav.classList.contains('active');
    event.currentTarget.setAttribute('aria-expanded', active);
    if (active) {
        event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
    } else {
        event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
    }
}

if (btnMobile) {
    btnMobile.addEventListener('click', toggleMenu);
    btnMobile.addEventListener('touchstart', toggleMenu);
}

// Fecha o menu ao clicar em um link
const menuLinks = document.querySelectorAll('.menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
});

// ========================================
// HEADER SCROLL
// ========================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// SLIDER DE DEPOIMENTOS
// ========================================
let currentSlide = 0;
const slides = document.querySelectorAll('.depoimento-card');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove active de todos
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Adiciona active no slide atual
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    
    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Auto slide (opcional - a cada 5 segundos)
let autoSlideInterval = setInterval(() => {
    changeSlide(1);
}, 5000);

// Para o auto slide quando usuário interagir
const sliderBtns = document.querySelectorAll('.slider-btn');
sliderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        // Reinicia o auto slide após 10 segundos de inatividade
        autoSlideInterval = setInterval(() => {
            changeSlide(1);
        }, 5000);
    });
});

// ========================================
// BOTÃO VOLTAR AO TOPO
// ========================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// ANIMAÇÃO AO SCROLL (fade in)
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elementos para animar
const animatedElements = document.querySelectorAll('.atuacao-card, .diferencial-item, .advogado-card, .stat-item');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// FORMULÁRIO DE CONTATO
// ========================================
const formContato = document.getElementById('form-contato');

if (formContato) {
    formContato.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Pega os valores
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value;
        
        // Validação simples
        if (!nome || !email || !telefone || !assunto || !mensagem) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido!');
            return;
        }
        
        // Simulação de envio (aqui você conectaria com um backend real)
        alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve!`);
        
        // Limpa o formulário
        formContato.reset();
        
        // Em produção, você faria algo como:
        // fetch('/api/contato', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ nome, email, telefone, assunto, mensagem })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     alert('Mensagem enviada com sucesso!');
        //     formContato.reset();
        // })
        // .catch(error => {
        //     alert('Erro ao enviar mensagem. Tente novamente.');
        // });
    });
}

// ========================================
// MÁSCARA DE TELEFONE
// ========================================
const telefoneInput = document.getElementById('telefone');

if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
        }
        
        e.target.value = value;
    });
}

// ========================================
// LAZY LOADING DE IMAGENS (se houver)
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// CONTADOR ANIMADO (números das estatísticas)
// ========================================
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.innerHTML = value + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[0-9]/g, '');
                
                statNumber.dataset.suffix = suffix;
                statNumber.classList.add('animated');
                animateValue(statNumber, 0, number, 2000);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statItems = document.querySelectorAll('.stat-item');
statItems.forEach(item => statsObserver.observe(item));

// ========================================
// PREVENÇÃO DE SPAM NO FORMULÁRIO
// ========================================
let lastSubmitTime = 0;
const submitCooldown = 5000; // 5 segundos

if (formContato) {
    formContato.addEventListener('submit', function(e) {
        const now = Date.now();
        if (now - lastSubmitTime < submitCooldown) {
            e.preventDefault();
            alert('Por favor, aguarde alguns segundos antes de enviar outra mensagem.');
            return false;
        }
        lastSubmitTime = now;
    });
}
// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Landing Page DKL Advogados carregada com sucesso!');
    
    // Mostra o primeiro slide
    if (slides.length > 0) {
        showSlide(0);
    }
    
    // Adiciona classe para animações iniciais
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});