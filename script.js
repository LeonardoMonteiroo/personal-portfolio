// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtém os valores dos campos
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validação básica
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Simula envio do formulário
            console.log('Dados do formulário:', {
                name: name,
                email: email,
                subject: subject,
                message: message
            });
            
            // Mostra mensagem de sucesso
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Limpa o formulário
            contactForm.reset();
            
            // Esconde a mensagem de sucesso após 5 segundos
            setTimeout(function() {
                successMessage.style.display = 'none';
                contactForm.style.display = 'block';
            }, 5000);
        });
    }
    
    // Adiciona classe ativa ao link do menu baseado na página atual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });    
}); 