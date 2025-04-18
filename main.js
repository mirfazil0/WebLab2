const CONFIG = {
    animationDelay: 0.2,
    scrollOffset: 100,
    defaultLanguage: 'az',
    translations: {
        az: {
            'contact': 'ƏLAQƏ',
            'education': 'TƏHSİL',
            'skills': 'BACARIQLAR',
            'languages': 'DİLLƏR',
            'profile': 'PROFİL',
            'experience': 'TƏCRÜBƏ',
            'references': 'İSTİNADLAR',
            'download-pdf': 'PDF Yüklə',
            'contact-form': 'Əlaqə Formu',
            'name': 'Ad Soyad',
            'email': 'E-poçt',
            'message': 'Mesaj',
            'send': 'Göndər',
            'close': 'Bağla'
        },
        en: {
            'contact': 'CONTACT',
            'education': 'EDUCATION',
            'skills': 'SKILLS',
            'languages': 'LANGUAGES',
            'profile': 'PROFILE',
            'experience': 'EXPERIENCE',
            'references': 'REFERENCES',
            'download-pdf': 'Download PDF',
            'contact-form': 'Contact Form',
            'name': 'Full Name',
            'email': 'Email',
            'message': 'Message',
            'send': 'Send',
            'close': 'Close'
        }
    }
};

const AnimationManager = {
    init() {
        this.setupScrollAnimations();
        this.setupClickEffects();
    },

    setupScrollAnimations() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * CONFIG.animationDelay}s`;
        });

        window.addEventListener('scroll', () => {
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - CONFIG.scrollOffset) {
                    element.classList.add('visible');
                }
            });
        });

        window.dispatchEvent(new Event('scroll'));
    },

    setupClickEffects() {
        const clickableElements = document.querySelectorAll('a');
        clickableElements.forEach(element => {
            element.classList.add('click-effect');
        });
    }
};

const ThemeManager = {
    init() {
        this.loadSavedTheme();
        this.setupThemeToggle();
    },

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    },

    setTheme(theme) {
        document.body.classList.toggle('dark-theme', theme === 'dark');
        const themeButton = document.querySelector('.theme-toggle');
        if (themeButton) {
            themeButton.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
        localStorage.setItem('theme', theme);
    },

    setupThemeToggle() {
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.onclick = () => {
                const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
                this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
            };
        }
    }
};

const LanguageManager = {
    currentLanguage: CONFIG.defaultLanguage,

    init() {
        this.loadSavedLanguage();
        this.setupLanguageToggle();
    },

    loadSavedLanguage() {
        const savedLanguage = localStorage.getItem('language') || CONFIG.defaultLanguage;
        this.setLanguage(savedLanguage);
    },

    setLanguage(lang) {
        this.currentLanguage = lang;
        document.documentElement.lang = lang;
        this.updateTexts();
        localStorage.setItem('language', lang);
    },

    updateTexts() {
        const translations = CONFIG.translations[this.currentLanguage];
        Object.keys(translations).forEach(key => {
            const elements = document.querySelectorAll(`[data-translate="${key}"]`);
            elements.forEach(element => {
                element.textContent = translations[key];
            });
        });

        if (this.currentLanguage === 'en') {
            document.querySelector('.job-title').textContent = 'Web & Game Developer | Programmer | InfoSec Specialist';
            document.querySelector('.profile p').textContent = 'I am an experienced specialist in setting up security systems and managing IT infrastructure. I have skills in Windows and Linux systems, network security, and data protection. Additionally, I have knowledge in both backend and frontend web programming. I have experience in creating websites from scratch, writing programs, and developing PC or mobile games.';
            
            const workItems = document.querySelectorAll('.work-item');
            workItems[0].querySelector('.work-title').textContent = 'Freelance Web Designer';
            workItems[0].querySelector('.work-date').textContent = '2023 - Present';
            workItems[0].querySelector('.work-subtitle').textContent = 'Remote';
            workItems[0].querySelectorAll('.work-description li')[0].textContent = 'Designed and developed responsive websites using HTML, CSS, and JavaScript.';
            workItems[0].querySelectorAll('.work-description li')[1].textContent = 'Collaborated with clients to understand UI/UX needs and present optimized solutions.';
            workItems[0].querySelectorAll('.work-description li')[2].textContent = 'Integrated SEO best practices and ensured cross-browser compatibility.';

            workItems[1].querySelector('.work-title').textContent = 'Founder & Lead Game Developer';
            workItems[1].querySelector('.work-date').textContent = '2026 - Present';
            workItems[1].querySelectorAll('.work-description li')[0].textContent = 'Founded Rey Studio to develop creative and immersive gaming experiences for PC and mobile platforms.';
            workItems[1].querySelectorAll('.work-description li')[1].textContent = 'Designed and programmed game mechanics, character systems, and level designs using Unity and C#.';
            workItems[1].querySelectorAll('.work-description li')[2].textContent = 'Led a small team of artists and programmers, managed development cycles, and oversaw publishing processes.';

            workItems[2].querySelector('.work-title').textContent = 'Cybersecurity Specialist';
            workItems[2].querySelectorAll('.work-description li')[0].textContent = 'Assisted in monitoring network activity and detecting potential threats.';
            workItems[2].querySelectorAll('.work-description li')[1].textContent = 'Learned the basics of penetration testing and participated in internal audits.';
            workItems[2].querySelectorAll('.work-description li')[2].textContent = 'Worked with open-source OSINT tools to collect and analyze public information.';

            const educationItems = document.querySelectorAll('.education-item');
            educationItems[0].querySelector('h3').textContent = 'Azerbaijan Technical University';
            educationItems[0].querySelectorAll('p')[1].textContent = 'BSc Cybersecurity';
            educationItems[1].querySelector('h3').textContent = 'Delft University of Technology';
            educationItems[1].querySelectorAll('p')[1].textContent = 'MSc Computer Science';

            const skillsList = document.querySelectorAll('.skills-list li');
            skillsList[0].textContent = 'HTML & CSS';
            skillsList[1].textContent = 'JavaScript';
            skillsList[2].textContent = 'Python';
            skillsList[3].textContent = 'C++ / C#';
            skillsList[4].textContent = 'Responsive Web Design';
            skillsList[5].textContent = 'Game Development (Unity / Unreal Engine)';
            skillsList[6].textContent = 'Cybersecurity Principles';
            skillsList[7].textContent = 'Network Security';
            skillsList[8].textContent = 'Information Security Management';

            const languagesList = document.querySelectorAll('.languages-list li');
            languagesList[0].textContent = 'Azerbaijani (Native)';
            languagesList[1].textContent = 'English (Intermediate)';
            languagesList[2].textContent = 'Turkish (Fluent)';
            languagesList[3].textContent = 'Spanish (Basic)';

            const referenceItems = document.querySelectorAll('.reference-item');
            referenceItems[0].querySelector('p').textContent = 'SkyTech / Information Security Manager';
            referenceItems[1].querySelector('p').textContent = 'Rey Studio / Game Artist';
        } else {

            document.querySelector('.job-title').textContent = 'Veb & Oyun Dizayner | Proqramçı | İnfoSec Mütəxəssis';
            document.querySelector('.profile p').textContent = 'Təhlükəsizlik sistemlərinin qurulması və İT infrastrukturunun idarə edilməsi sahəsində təcrübəli mütəxəssisəm. Windows və Linux sistemləri, şəbəkə təhlükəsizliyi və məlumatların qorunması sahələrində bacarıqlarım var. Bundan əlavə, həm backend, həm də frontend veb proqramlaşdırma biliklərim var. Sıfırdan vebsaytlar yaratmaq, proqramlar yazmaq və PC və ya mobil oyunlar inkişaf etdirmək təcrübəm var.';

            const workItems = document.querySelectorAll('.work-item');
            workItems[0].querySelector('.work-title').textContent = 'Freelance Veb Dizayner';
            workItems[0].querySelector('.work-date').textContent = '2023 - Günümüzə qədər';
            workItems[0].querySelector('.work-subtitle').textContent = 'Uzaqdan';
            workItems[0].querySelectorAll('.work-description li')[0].textContent = 'HTML, CSS və JavaScript istifadə edərək responsiv vebsaytlar dizayn edib və inkişaf etdirdim.';
            workItems[0].querySelectorAll('.work-description li')[1].textContent = 'Müştərilərlə UI/UX ehtiyaclarını başa düşmək və optimallaşdırılmış həllər təqdim etmək üçün əməkdaşlıq etdim.';
            workItems[0].querySelectorAll('.work-description li')[2].textContent = 'SEO ən yaxşı təcrübələrini inteqrasiya etdim və brauzerlərarası uyğunluğu təmin etdim.';

            workItems[1].querySelector('.work-title').textContent = 'Qurucu & Baş Oyun Dizayneri';
            workItems[1].querySelector('.work-date').textContent = '2026 - Günümüzə qədər';
            workItems[1].querySelectorAll('.work-description li')[0].textContent = 'PC və mobil platformalar üçün yaradıcı və immersiv oyun təcrübələri inkişaf etdirmək üçün Rey Studio-nu qurdum.';
            workItems[1].querySelectorAll('.work-description li')[1].textContent = 'Unity və C# istifadə edərək oyun mexanikası, personaj sistemləri və səviyyə dizaynlarını dizayn edib proqramlaşdırdım.';
            workItems[1].querySelectorAll('.work-description li')[2].textContent = 'Kiçik bir rəssam və proqramçı komandasına rəhbərlik etdim, inkişaf dövrlərini idarə etdim və nəşr proseslərini nəzarət etdim.';

            workItems[2].querySelector('.work-title').textContent = 'Kiber Təhlükəsizlik Mütəxəssisi';
            workItems[2].querySelectorAll('.work-description li')[0].textContent = 'Şəbəkə fəaliyyətini monitorinq etməkdə və potensial təhlükələri aşkarlamaqda kömək etdim.';
            workItems[2].querySelectorAll('.work-description li')[1].textContent = 'Penetrasiya testlərinin əsaslarını öyrəndim və daxili auditlərdə iştirak etdim.';
            workItems[2].querySelectorAll('.work-description li')[2].textContent = 'İctimai məlumatları toplamaq və təhlil etmək üçün açıq mənbəli OSINT alətləri ilə işlədim.';

            const educationItems = document.querySelectorAll('.education-item');
            educationItems[0].querySelector('h3').textContent = 'Azərbaycan Texniki Universiteti';
            educationItems[0].querySelectorAll('p')[1].textContent = 'BSc Kiber Təhlükəsizlik';
            educationItems[1].querySelector('h3').textContent = 'Delft Texnologiya Universiteti';
            educationItems[1].querySelectorAll('p')[1].textContent = 'MSc Kompüter Elmləri';

            const skillsList = document.querySelectorAll('.skills-list li');
            skillsList[0].textContent = 'Html & Css';
            skillsList[1].textContent = 'JavaScript';
            skillsList[2].textContent = 'Python';
            skillsList[3].textContent = 'C++ / C#';
            skillsList[4].textContent = 'Responsive Veb Dizayn';
            skillsList[5].textContent = 'Oyun Dizaynı (Unity / Unreal Engine)';
            skillsList[6].textContent = 'Kiber Təhlükəsizlik Prinsipləri';
            skillsList[7].textContent = 'Şəbəkə Təhlükəsizliyi';
            skillsList[8].textContent = 'İnformasiya Təhlükəsizliyi İdarəetməsi';

            const languagesList = document.querySelectorAll('.languages-list li');
            languagesList[0].textContent = 'Azərbaycan (Ana dili)';
            languagesList[1].textContent = 'İngilis (Orta)';
            languagesList[2].textContent = 'Türk (Sərbəst)';
            languagesList[3].textContent = 'İspan (Başlanğıc)';

            const referenceItems = document.querySelectorAll('.reference-item');
            referenceItems[0].querySelector('p').textContent = 'SkyTech / İnformasiya Təhlükəsizliyi Meneceri';
            referenceItems[1].querySelector('p').textContent = 'Rey Studio / Oyun Rəssamı';
        }
    },

    setupLanguageToggle() {
        const toggleButton = document.querySelector('.language-toggle');
        if (toggleButton) {
            toggleButton.onclick = () => {
                const newLang = this.currentLanguage === 'az' ? 'en' : 'az';
                this.setLanguage(newLang);
            };
        }
    }
};

const PDFManager = {
    init() {
        const downloadButton = document.querySelector('.download-pdf');
        if (downloadButton) {
            downloadButton.addEventListener('click', this.downloadPDF);
        }
    },

    downloadPDF() {
        const element = document.querySelector('.cv-container');
        const opt = {
            margin: 1,
            filename: 'cv.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    }
};

const ContactFormManager = {
    init() {
        this.setupForm();
    },

    setupForm() {
        const form = document.getElementById('contactFormElement');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    },

    openForm() {
        document.getElementById('overlay').classList.add('active');
        document.getElementById('contactForm').classList.add('active');
    },

    closeForm() {
        document.getElementById('overlay').classList.remove('active');
        document.getElementById('contactForm').classList.remove('active');
    },

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        console.log('Form göndərildi:', formData);

        e.target.reset();
        this.closeForm();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    AnimationManager.init();
    LanguageManager.init();
    PDFManager.init();
    ContactFormManager.init();
    ThemeManager.init();
});

function openWhatsApp(number) {
    window.open(`https://wa.me/${number}`, '_blank');
}

function sendEmail(email) {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=CV%20Haqqında&body=`, '_blank');
}

console.log('main.js yüklendi'); 