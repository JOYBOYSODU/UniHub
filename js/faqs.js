
    document.addEventListener('DOMContentLoaded', function() {
        // Toggle FAQ answers
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const icon = this.querySelector('i');
                
                // Toggle answer visibility
                answer.classList.toggle('active');
                
                // Toggle icon
                if (answer.classList.contains('active')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });
        });
        
        // Search functionality
        const searchInput = document.getElementById('faq-search-input');
        const faqItems = document.querySelectorAll('.faq-item');
        const noResults = document.querySelector('.no-results');
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            let matchFound = false;
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    matchFound = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show/hide no results message
            if (matchFound) {
                noResults.style.display = 'none';
            } else {
                noResults.style.display = 'block';
            }
        });
        
        // Mobile menu toggle
        const menuToggle = document.querySelector('.navbar-toggle');
        const navbarLinks = document.querySelector('.navbar-links');
        
        menuToggle.addEventListener('click', function() {
            navbarLinks.classList.toggle('active');
        });
    });
