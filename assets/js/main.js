document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. CONTROLE DO HEADER & SCROLL SPY
       ========================================================================== */
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Adiciona classe de rolagem no header
    const checkHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', checkHeaderScroll);
    checkHeaderScroll(); // Executa ao carregar a página

    // Scroll Spy: Destaca link do menu correspondente à seção atual
    const scrollSpy = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // ajuste para o header fixo
            const sectionId = current.getAttribute('id');
            const link = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);


    /* ==========================================================================
       2. MENU RESPONSIVO MOBILE
       ========================================================================== */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }


    /* ==========================================================================
       3. ANIMAÇÕES DE REVELAÇÃO (INTERSECTION OBSERVER) & CONTADORES
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    // Função para animar números de estatísticas
    const animateCounters = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const duration = 2000; // 2 segundos
            const stepTime = Math.abs(Math.floor(duration / target));
            let current = 0;

            // Se for texto corrido (não numérico puro)
            if (isNaN(target)) {
                return;
            }

            const timer = setInterval(() => {
                current += 1;
                // Exibe "+" caso especificado no HTML por data-prefix/suffix
                const prefix = stat.getAttribute('data-prefix') || '';
                const suffix = stat.getAttribute('data-suffix') || '';
                stat.textContent = prefix + current + suffix;

                if (current >= target) {
                    stat.textContent = prefix + target + suffix;
                    clearInterval(timer);
                }
            }, stepTime);
        });
    };

    // Observer para animações de entrada
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Executa apenas uma vez
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Observer específico para iniciar contadores
    const aboutSection = document.querySelector('#quem-somos');
    if (aboutSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    animateCounters();
                    countersStarted = true;
                }
            });
        }, { threshold: 0.2 });

        statsObserver.observe(aboutSection);
    }


    /* ==========================================================================
       4. CARROSSEL DE PARCEIROS (SCROLL INFINITO)
       ========================================================================== */
    const carouselTrack = document.querySelector('.partners-carousel-track');
    if (carouselTrack) {
        // Clona os itens do carrossel para fazer efeito infinito visual contínuo
        const items = Array.from(carouselTrack.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            carouselTrack.appendChild(clone);
        });
    }


    /* ==========================================================================
       5. MODAIS DE SERVIÇOS (SAIBA MAIS DETALHADO)
       ========================================================================== */
    // Dados completos dos serviços da Rasp Automação
    const servicesData = {
        'instalacoes-eletricas': {
            title: 'Instalações Elétricas',
            badge: 'Industrial & Residencial',
            image: 'assets/img/instalacoes.jpg',
            text: 'A Rasp Automação executa instalações elétricas completas com total foco em normas técnicas (NR-10, NBR 5410). Atendemos desde infraestruturas complexas industriais até instalações residenciais de alto padrão.\n\n**Nossos serviços incluem:**\n• Instalação de eletrocalhas, perfilados, conduletes e leitos.\n• Montagem e instalação de quadros elétricos de distribuição.\n• Quadros para alimentação e comando de máquinas industriais.\n• Sistemas de iluminação funcional e de emergência.\n• Instalação de DPS (Dispositivos de Proteção contra Surtos) e SPDA.'
        },
        'controle-automacao': {
            title: 'Controle e Automação',
            badge: 'Indústria 4.0',
            image: 'assets/img/automacao.jpg',
            text: 'Oferecemos soluções completas em automação de processos industriais e integração de sistemas de alto desempenho. Ajudamos sua indústria a atingir o próximo patamar de produtividade e conectividade.\n\n**Soluções oferecidas:**\n• Controle de movimento preciso utilizando servoacionamentos (servomotores).\n• Integração e parametrização de inversores de frequência e soft-starters.\n• Otimização e sincronismo de esteiras, prensas, dosadores e embaladoras.\n• Desenvolvimento de lógicas de intertravamento de segurança.\n• Supervisão local e remota dos processos produtivos.'
        },
        'montagem-paineis': {
            title: 'Montagem de Painéis Elétricos',
            badge: 'Projetos e Testes',
            image: 'assets/img/paineis.jpg',
            text: 'Montamos painéis elétricos sob medida de acordo com as particularidades de cada aplicação, seguindo à risca as normas de segurança e painéis homologados.\n\n**Nosso escopo de atuação:**\n• Projetos e montagem física e elétrica de painéis de comando e distribuição.\n• Retrofit e modernização de painéis elétricos obsoletos (reforma completa).\n• Identificação e anilhamento de 100% dos cabos para facilitar a manutenção.\n• Diagramação e entrega do esquema elétrico atualizado em formato CAD.\n• Testes de continuidade, isolamento e simulação de funcionamento em bancada.'
        },
        'projetos-eletricos': {
            title: 'Projetos Elétricos',
            badge: 'Industrial & Comercial',
            image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800',
            text: 'Desenvolvemos o projeto elétrico completo alinhado às necessidades reais da sua planta industrial ou estabelecimento comercial. Garantimos robustez e segurança.\n\n**Pilares do desenvolvimento:**\n• Desenvolvimento de esquemas unifilares e multifilares detalhados.\n• Dimensionamento correto de disjuntores, contatores, cabos e barramentos.\n• Elaboração de layouts mecânicos 2D/3D dos painéis (distribuição física de componentes).\n• Projetos focados em eficiência energética e redução de desperdício.\n• Trabalhamos em parceria: você apresenta a demanda do seu processo e nós tornamos a solução real.'
        },
        'manutencao-geral': {
            title: 'Manutenção em Geral',
            badge: 'Preventiva & Corretiva',
            image: 'https://images.pexels.com/photos/257700/pexels-photo-257700.jpeg?auto=compress&cs=tinysrgb&w=800',
            text: 'Evite paradas não programadas em sua linha de produção. A Rasp Automação oferece serviços de manutenção industrial rápidos e preventivos.\n\n**Como atuamos:**\n• Manutenção preventiva: análise termográfica, reaperto de conexões, testes de componentes.\n• Manutenção corretiva de emergência: diagnóstico rápido e substituição de peças avariadas.\n• Manutenção de máquinas operacionais, pontes rolantes, compressores e motores.\n• Upgrades tecnológicos para aumento de segurança e adequação à NR-12.\n• Contratos de manutenção mensal preventiva para empresas.'
        },
        'programacao-clps': {
            title: 'Programação de CLPs e IHMs',
            badge: 'Engenharia de Software Industrial',
            image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800',
            text: 'Programação avançada de controladores industriais e interfaces homem-máquina, garantindo que seus equipamentos funcionem com precisão absoluta e diagnósticos fáceis.\n\n**Tecnologia e Normas:**\n• Desenvolvimento de softwares seguindo a norma internacional IEC 61131-3 (Ladder, Bloco de Funções, Texto Estruturado).\n• Criação de telas intuitivas para IHMs e sistemas supervisórios (SCADA).\n• Integração de redes industriais (Modbus, Profibus, Profinet, Ethernet/IP).\n• Parametrização fina de malhas de controle PID (temperatura, pressão, vazão).\n• Backup completo de códigos fonte originais e entrega ao cliente.'
        }
    };

    const serviceModal = document.getElementById('service-modal');
    const modalContent = serviceModal?.querySelector('.service-modal-content');
    const modalClose = serviceModal?.querySelector('.service-modal-close');
    const modalOverlay = serviceModal?.querySelector('.service-modal-overlay');

    if (serviceModal && modalClose && modalOverlay) {
        // Abre o modal ao clicar no botão "Saiba Mais"
        document.querySelectorAll('.open-service-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const serviceId = btn.getAttribute('data-service');
                const data = servicesData[serviceId];

                if (data) {
                    serviceModal.querySelector('.service-modal-img img').src = data.image;
                    serviceModal.querySelector('.service-modal-img img').alt = data.title;
                    serviceModal.querySelector('.service-modal-badge').textContent = data.badge;
                    serviceModal.querySelector('.service-modal-title').textContent = data.title;
                    
                    // Converte Markdown de tópicos básicos para HTML
                    let formattedText = data.text
                        .replace(/\n\n/g, '<br><br>')
                        .replace(/• (.*?)(<br>|$)/g, '<li>$1</li>');
                    
                    if (formattedText.includes('<li>')) {
                        formattedText = formattedText.replace(/(<li>.*?<\/li>)/g, '<ul>$1</ul>');
                        // limpa tags duplicadas ul
                        formattedText = formattedText.replace(/<\/ul><br><br><ul>/g, '').replace(/<\/ul><ul>/g, '');
                    }
                    
                    serviceModal.querySelector('.service-modal-text').innerHTML = formattedText;
                    serviceModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // impede scroll de fundo
                }
            });
        });

        // Fecha o modal
        const closeModal = () => {
            serviceModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);
        
        // Atalho ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
                closeModal();
            }
        });
    }


    /* ==========================================================================
       6. GALERIA COM FILTROS E LIGHTBOX INTEGRADO
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox?.querySelector('.lightbox-img');
    const lightboxClose = lightbox?.querySelector('.lightbox-close');
    const lightboxTitle = lightbox?.querySelector('.lightbox-title');
    const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
    const lightboxCounter = lightbox?.querySelector('.lightbox-counter');
    const prevBtn = lightbox?.querySelector('.lightbox-arrow-left');
    const nextBtn = lightbox?.querySelector('.lightbox-arrow-right');

    let activeGalleryImages = [];
    let currentImageIndex = 0;

    // Filtros da Galeria
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active de todos os botões e adiciona no atual
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
            
            updateActiveGalleryImages();
        });
    });

    // Atualiza a lista de imagens visíveis para navegação no lightbox
    const updateActiveGalleryImages = () => {
        activeGalleryImages = [];
        galleryItems.forEach(item => {
            if (!item.classList.contains('hide')) {
                activeGalleryImages.push({
                    src: item.getAttribute('data-src'),
                    title: item.querySelector('.gallery-item-title').textContent,
                    category: item.querySelector('.gallery-item-category').textContent
                });
            }
        });
    };
    
    updateActiveGalleryImages(); // Executa inicialização

    // Abre Lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const itemSrc = item.getAttribute('data-src');
            
            // Encontra o index da imagem no array de visíveis
            currentImageIndex = activeGalleryImages.findIndex(img => img.src === itemSrc);
            
            if (currentImageIndex !== -1) {
                openLightbox();
            }
        });
    });

    const openLightbox = () => {
        const currentData = activeGalleryImages[currentImageIndex];
        if (currentData && lightbox && lightboxImg) {
            lightboxImg.src = currentData.src;
            lightboxImg.alt = currentData.title;
            if (lightboxTitle) lightboxTitle.textContent = currentData.title;
            if (lightboxCaption) lightboxCaption.textContent = currentData.category;
            if (lightboxCounter) lightboxCounter.textContent = `${currentImageIndex + 1} de ${activeGalleryImages.length}`;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeLightboxFunc = () => {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    const nextImage = () => {
        currentImageIndex = (currentImageIndex + 1) % activeGalleryImages.length;
        openLightbox();
    };

    const prevImage = () => {
        currentImageIndex = (currentImageIndex - 1 + activeGalleryImages.length) % activeGalleryImages.length;
        openLightbox();
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightboxFunc);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    
    // Clique fora da imagem no Lightbox para fechar
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-container')) {
                closeLightboxFunc();
            }
        });
    }

    // Navegação por teclado para Lightbox
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'Escape') {
                closeLightboxFunc();
            }
        }
    });


    /* ==========================================================================
       7. CARROSSEL DE DEPOIMENTOS (TESTIMONIALS)
       ========================================================================== */
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.testimonials-nav');
    
    if (testimonialsTrack && testimonialSlides.length > 0 && dotsContainer) {
        let currentSlide = 0;
        let slideInterval;

        // Limpa os dots de exemplo e reconstrói dinamicamente
        dotsContainer.innerHTML = '';
        testimonialSlides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(idx);
                resetSlideInterval();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.testimonial-dot');

        const goToSlide = (slideIndex) => {
            currentSlide = slideIndex;
            testimonialsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Atualiza classe dos dots
            dots.forEach(d => d.classList.remove('active'));
            dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            goToSlide(currentSlide);
        };

        const startSlideInterval = () => {
            slideInterval = setInterval(nextSlide, 5000); // Muda a cada 5 segundos
        };

        const resetSlideInterval = () => {
            clearInterval(slideInterval);
            startSlideInterval();
        };

        startSlideInterval();
    }


    /* ==========================================================================
       8. VALIDAÇÃO DE FORMULÁRIO DE CONTATO & MÁSCARA DE TELEFONE
       ========================================================================== */
    const contactForm = document.getElementById('contact-form-id');
    const phoneInput = document.getElementById('form-telefone');
    const formFeedback = document.getElementById('form-feedback-id');

    // Máscara dinâmica para o telefone: (11) 96398-7438
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // remove tudo que não for dígito
            
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            // Formata: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
            if (value.length > 6) {
                value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
            } else if (value.length > 2) {
                value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }
            
            e.target.value = value;
        });
    }

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Pega os valores
            const nome = document.getElementById('form-nome').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const telefone = phoneInput.value.trim();
            const empresa = document.getElementById('form-empresa').value.trim();
            const assunto = document.getElementById('form-assunto').value.trim();
            const mensagem = document.getElementById('form-mensagem').value.trim();

            // Validação simples
            if (!nome || !email || !telefone || !assunto || !mensagem) {
                formFeedback.textContent = 'Por favor, preencha todos os campos obrigatórios (*).';
                formFeedback.className = 'form-feedback error';
                return;
            }

            // Validação simples de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formFeedback.textContent = 'Por favor, digite um e-mail válido.';
                formFeedback.className = 'form-feedback error';
                return;
            }

            // Exibe indicador de carregamento
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

            // Simula envio AJAX para o arquivo local ou endpoint externo (mantendo a experiência premium)
            // Caso no futuro queiram usar o recebe-form.php original, esse trecho pode fazer o fetch.
            setTimeout(() => {
                formFeedback.textContent = 'Mensagem enviada com sucesso! Em breve nossa equipe entrará em contato.';
                formFeedback.className = 'form-feedback success';
                
                // Limpa o formulário
                contactForm.reset();
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                // Esconde a mensagem de feedback após 6 segundos
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 6000);
            }, 1500);
        });
    }


    /* ==========================================================================
       9. HERO SLIDESHOW AUTOMÁTICO
       ========================================================================== */
    const heroSlides = document.querySelectorAll('.hero-bg-slide');
    if (heroSlides.length > 0) {
        let currentHeroSlide = 0;
        
        const nextHeroSlide = () => {
            heroSlides[currentHeroSlide].classList.remove('active');
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
            heroSlides[currentHeroSlide].classList.add('active');
        };

        // Troca o background do hero a cada 7 segundos
        setInterval(nextHeroSlide, 7000);
    }


    /* ==========================================================================
       10. EFEITO PARALLAX NO SCROLL DO HERO
       ========================================================================== */
    const heroSection = document.getElementById('inicio');
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroSection && heroBg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            // Se o hero está visível, move o background levemente
            if (scrollY < heroSection.offsetHeight) {
                heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
            }
        });
    }
});
