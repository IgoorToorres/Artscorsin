document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Divide o texto em spans (um por letra)
    function splitTextToSpans(elementId) {
        const el = document.getElementById(elementId);
        const text = el.getAttribute('data-text');
        el.innerHTML = '';
        text.split('').forEach((char) => {
            const span = document.createElement('span');
            span.innerHTML = (char === ' ') ? '&nbsp;' : char;
            span.style.display = 'inline-block';
            span.style.opacity = 0;
            span.style.transform = 'translateY(20px) scale(0.9) rotateX(90deg)';
            el.appendChild(span);
        });
    }

    // Anima as letras e move o carro junto com elas
    function animateTextWithCar(elementId, carId) {
        const spans = document.getElementById(elementId).querySelectorAll('span');
        const car = document.getElementById(carId);
        const trail = document.getElementById('carTrail');

        const positions = [];
        spans.forEach(span => {
            positions.push({ x: span.offsetLeft });
        });

        spans.forEach((span, index) => {
            // Move o carro antes da letra aparecer
            gsap.to(car, {
                delay: index * 0.04,
                duration: 0.3,
                x: positions[index].x,
                y: 0,
                ease: "power2.out",
                onUpdate: () => {
                    // Posiciona o rastro no mesmo X do carro
                    trail.style.left = car.style.left;
                    trail.style.top = car.offsetTop + car.offsetHeight / 2 + 'px';

                    // Anima rastro com opacidade temporária
                    gsap.fromTo(trail, {
                        opacity: 0.4,
                        scaleX: 1
                    }, {
                        opacity: 0,
                        scaleX: 1.5,
                        duration: 0.3,
                        ease: 'power1.out'
                    });
                }
            });

            // Depois que o carro passou, a letra aparece
            gsap.to(span, {
                delay: index * 0.04 + 0.1,
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                ease: 'back.out(1.7)',
                duration: 0.5
            });
        });

        // Após o fim da animação, carro desaparece
        gsap.to(car, {
            delay: spans.length * 0.04 + 0.5,
            duration: 1,
            x: "+=200",
            opacity: 0,
            ease: "power4.in"
        });
    }

    // Inicializa texto e carro
    splitTextToSpans('scrollText');
    animateTextWithCar('scrollText', 'carImage');

    // Menu mobile toggle
    document.getElementById('menuToggle').addEventListener('click', () => {
        const menu = document.getElementById('menu');
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
    });

    // Animação do fundo do hero
    gsap.fromTo("#hero",
        { backgroundSize: "250%", opacity: 0 },
        {
            backgroundSize: "200%",
            opacity: 1,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#hero",
                start: "top center",
                toggleActions: "play none none reset"
            }
        }
    );

    // Conteúdo do hero
    gsap.from("#heroContent", {
        scrollTrigger: {
            trigger: "#heroContent",
            start: "top 80%",
            toggleActions: "play none none reset"
        },
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power2.out"
    });

    // Produto
    gsap.from("#produtoSection", {
        scrollTrigger: {
            trigger: "#produtoSection",
            start: "top 80%",
            toggleActions: "play none none reset"
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power2.out"
    });

    // Comprar
    gsap.from("#comprarSection", {
        scrollTrigger: {
            trigger: "#comprarSection",
            start: "top 80%",
            toggleActions: "play none none reset"
        },
        opacity: 0,
        x: 60,
        duration: 0.8,
        ease: "power2.out"
    });

    // Empresa
    gsap.from("#empresaSection", {
        scrollTrigger: {
            trigger: "#empresaSection",
            start: "top 80%",
            toggleActions: "play none none reset"
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power2.out"
    });
});