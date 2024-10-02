// Smooth scroll for navigation link

document.querySelectorAll('nav ul li a').forEach(anchor =>{
    anchor.addEventListener('click', function(e){
        e.preventDefault();

        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});