// ==================== SCROLL TO TOP ON LOAD ====================
// Force scroll to top on page load/refresh
(function() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
})();

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', function() {
    setTimeout(function() {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, 0);
});

// ==================== TERMINAL FUNCTIONALITY ====================
const terminal = document.getElementById('terminal');
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = terminal.querySelector('.terminal-output');
let commandHistory = [];
let historyIndex = -1;

// Portfolio Data
const portfolioData = {
    name: 'Souvagya Dey',
    title: 'Full Stack Developer | Software Engineer',
    email: 'souvagya@example.com',
    github: 'https://github.com/souvagyadey',
    linkedin: 'https://linkedin.com/in/souvagyadey',
    
    about: `Hello! I'm Souvagya Dey, a passionate Full Stack Developer with expertise in 
building modern web applications. I love creating elegant solutions to complex problems 
and am constantly learning new technologies to stay at the cutting edge of development.

I specialize in JavaScript/TypeScript, Python, and various modern frameworks. 
My goal is to create impactful applications that make a difference.`,

    skills: {
        'Programming Languages': ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'SQL'],
        'Frontend': ['React', 'Next.js', 'Vue.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'SASS'],
        'Backend': ['Node.js', 'Express', 'Django', 'FastAPI', 'REST APIs', 'GraphQL'],
        'Database': ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Firebase'],
        'DevOps & Tools': ['Docker', 'Kubernetes', 'Git', 'CI/CD', 'AWS', 'Azure'],
        'Other': ['Machine Learning', 'Data Structures', 'Algorithms', 'System Design']
    },

    projects: [
        {
            name: 'DocsCure',
            tech: 'Django REST Framework, MySQL, MongoDB',
            description: 'Developed a DRF-based healthcare platform with RESTful APIs for appointments, hospital management, and e-store using hybrid databases (MySQL + MongoDB). Implemented cookie-based JWT authentication with role-based access control for patients, doctors, and administrators.',
            link: 'github.com/souvagyadey/docscure'
        },
        {
            name: 'MovieZone',
            tech: 'React, Django REST Framework, NLP',
            description: 'Developed a full-stack movie review platform featuring JWT authentication, wishlists, reviews, and comment sections. Integrated NLP-based sentiment analysis and dynamic filtering for search, trending, and top-rated movies to enable personalized recommendations.',
            link: 'github.com/souvagyadey/moviezone'
        }
    ],

    experience: [
        {
            role: 'Senior Software Engineer',
            company: 'Tech Corp',
            period: '2023 - Present',
            responsibilities: [
                'Lead development of microservices architecture',
                'Mentor junior developers and conduct code reviews',
                'Implement CI/CD pipelines and DevOps practices'
            ]
        },
        {
            role: 'Full Stack Developer',
            company: 'StartUp Inc',
            period: '2021 - 2023',
            responsibilities: [
                'Built responsive web applications using React and Node.js',
                'Designed and implemented RESTful APIs',
                'Collaborated with cross-functional teams'
            ]
        },
        {
            role: 'Software Developer Intern',
            company: 'Innovation Labs',
            period: '2020 - 2021',
            responsibilities: [
                'Developed features for mobile and web applications',
                'Participated in agile development processes',
                'Wrote unit tests and documentation'
            ]
        }
    ],

    education: [
        {
            degree: 'Bachelor of Technology in Computer Science',
            institution: 'University Name',
            year: '2020',
            gpa: '8.5/10'
        },
        {
            degree: 'High School',
            institution: 'School Name',
            year: '2016',
            percentage: '90%'
        }
    ]
};

// Command definitions
const commands = {
    help: () => {
        return `
<div class="success">Available Commands:</div>
<div style="margin-left: 20px;">
  <div><span class="highlight">about</span>      - Learn more about me</div>
  <div><span class="highlight">skills</span>     - View my technical skills</div>
  <div><span class="highlight">projects</span>   - See my projects</div>
  <div><span class="highlight">experience</span> - View my work experience</div>
  <div><span class="highlight">education</span>  - See my educational background</div>
  <div><span class="highlight">contact</span>    - Get my contact information</div>
  <div><span class="highlight">clear</span>      - Clear the terminal</div>
  <div><span class="highlight">history</span>    - Show command history</div>
  <div><span class="highlight">banner</span>     - Display welcome banner</div>
  <div><span class="highlight">date</span>       - Show current date and time</div>
  <div><span class="highlight">whoami</span>     - Display current user</div>
  <div><span class="highlight">ls</span>         - List available sections</div>
  <div><span class="highlight">matrix</span>     - Enter the Matrix 🕶️</div>
  <div><span class="highlight">secret</span>     - Discover a secret 🎉</div>
  <div><span class="highlight">joke</span>       - Get a programming joke 😄</div>
  <div><span class="highlight">quote</span>      - Get an inspirational quote ✨</div>
</div>`;
    },

    about: () => {
        return `
<div class="success">About ${portfolioData.name}</div>
<div style="margin-left: 20px; margin-top: 10px;">
  ${portfolioData.about.split('\n').map(line => `<div>${line}</div>`).join('')}
</div>`;
    },

    skills: () => {
        let output = '<div class="success">Technical Skills</div>';
        for (const [category, skills] of Object.entries(portfolioData.skills)) {
            output += `<div style="margin-top: 15px;">
                <div class="highlight">${category}:</div>
                <div style="margin-left: 20px; color: var(--text-secondary);">${skills.join(' • ')}</div>
            </div>`;
        }
        return output;
    },

    projects: () => {
        let output = '<div class="success">Featured Projects</div>';
        portfolioData.projects.forEach((project, index) => {
            output += `
            <div style="margin-top: 15px; padding: 15px; background: rgba(0,255,136,0.05); border-left: 3px solid var(--primary-color); border-radius: 5px;">
                <div class="highlight">${index + 1}. ${project.name}</div>
                <div style="margin-left: 15px; margin-top: 8px;">
                    <div><strong>Tech Stack:</strong> ${project.tech}</div>
                    <div style="color: var(--text-secondary);">${project.description}</div>
                    <div style="margin-top: 5px;"><strong>🔗 Link:</strong> <a href="https://${project.link}" target="_blank" style="color: var(--secondary-color);">${project.link}</a></div>
                </div>
            </div>`;
        });
        return output;
    },

    experience: () => {
        let output = '<div class="success">Work Experience</div>';
        portfolioData.experience.forEach((exp, index) => {
            output += `
            <div style="margin-top: 15px; padding: 15px; background: rgba(0,212,255,0.05); border-left: 3px solid var(--secondary-color); border-radius: 5px;">
                <div class="highlight">${exp.role}</div>
                <div style="margin-left: 15px; margin-top: 5px;">
                    <div><strong>${exp.company}</strong> | ${exp.period}</div>
                    <div style="margin-top: 8px;">
                        ${exp.responsibilities.map(resp => `<div>• ${resp}</div>`).join('')}
                    </div>
                </div>
            </div>`;
        });
        return output;
    },

    education: () => {
        let output = '<div class="success">Education</div>';
        portfolioData.education.forEach((edu) => {
            output += `
            <div style="margin-top: 15px; padding: 15px; background: rgba(255,0,255,0.05); border-left: 3px solid var(--accent-color); border-radius: 5px;">
                <div class="highlight">${edu.degree}</div>
                <div style="margin-left: 15px; margin-top: 5px;">
                    <div><strong>${edu.institution}</strong></div>
                    <div>Year: ${edu.year} ${edu.gpa ? `| GPA: ${edu.gpa}` : `| Percentage: ${edu.percentage}`}</div>
                </div>
            </div>`;
        });
        return output;
    },

    contact: () => {
        return `
<div class="success">Contact Information</div>
<div style="margin-left: 20px; margin-top: 10px;">
  <div>📧 Email: <a href="mailto:${portfolioData.email}" style="color: var(--secondary-color);">${portfolioData.email}</a></div>
  <div>💼 LinkedIn: <a href="${portfolioData.linkedin}" target="_blank" style="color: var(--secondary-color);">${portfolioData.linkedin}</a></div>
  <div>🐙 GitHub: <a href="${portfolioData.github}" target="_blank" style="color: var(--secondary-color);">${portfolioData.github}</a></div>
</div>
<div style="margin-top: 15px; padding: 10px; background: rgba(0,255,136,0.1); border-radius: 5px;">
  <div>💡 Feel free to reach out for collaborations, opportunities, or just to say hi!</div>
</div>`;
    },

    clear: () => {
        terminalOutput.innerHTML = '';
        return '';
    },

    history: () => {
        if (commandHistory.length === 0) {
            return '<div class="info-text">No command history yet.</div>';
        }
        let output = '<div class="success">Command History</div><div style="margin-left: 20px;">';
        commandHistory.forEach((cmd, index) => {
            output += `<div>${index + 1}. ${cmd}</div>`;
        });
        output += '</div>';
        return output;
    },

    banner: () => {
        return `
<p class="neon-text">╔═══════════════════════════════════════════════════════════════╗</p>
<p class="neon-text">║   Welcome to Souvagya's Interactive Portfolio Terminal v1.0  ║</p>
<p class="neon-text">╚═══════════════════════════════════════════════════════════════╝</p>
<p></p>
<p class="info-text">Type <span class="highlight">'help'</span> to see available commands</p>`;
    },

    date: () => {
        return `<div class="info-text">${new Date().toString()}</div>`;
    },

    whoami: () => {
        return `<div class="info-text">visitor</div>`;
    },

    ls: () => {
        return `<div class="info-text">about  skills  projects  experience  education  contact</div>`;
    },

    matrix: () => {
        startMatrix();
        return '<div class="success matrix-effect">Entering the Matrix... 🕶️</div>';
    },

    secret: () => {
        return `
<div class="rainbow-text" style="font-size: 1.2em; text-align: center; padding: 20px;">
  🎉 Congratulations! You found the secret! 🎉
</div>
<div style="text-align: center; margin-top: 10px;">
  <div>You're curious and that's awesome! 🌟</div>
  <div style="margin-top: 10px;">Here's a secret tip: Always stay curious and keep learning! 📚</div>
</div>`;
    },

    joke: () => {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "Why did the programmer quit his job? Because he didn't get arrays! 😄",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
            "Why do Java developers wear glasses? Because they don't C#! 👓",
            "A SQL query walks into a bar, walks up to two tables and asks... 'Can I JOIN you?' 🍺",
            "Programming is like sex: One mistake and you have to support it for the rest of your life. 😅",
            "There are only 10 types of people: those who understand binary and those who don't. 🔢"
        ];
        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        return `<div class="info-text">${joke}</div>`;
    },

    quote: () => {
        const quotes = [
            "The best way to predict the future is to invent it. - Alan Kay",
            "Code is like humor. When you have to explain it, it's bad. - Cory House",
            "First, solve the problem. Then, write the code. - John Johnson",
            "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
            "The only way to learn a new programming language is by writing programs in it. - Dennis Ritchie",
            "Simplicity is the soul of efficiency. - Austin Freeman",
            "Make it work, make it right, make it fast. - Kent Beck"
        ];
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        return `<div class="info-text" style="font-style: italic;">✨ ${quote}</div>`;
    }
};

// Handle terminal input
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();
        if (command) {
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            processCommand(command);
        }
        terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        autocomplete();
    }
});

function processCommand(command) {
    // Add command to output
    const commandLine = document.createElement('div');
    commandLine.className = 'command-line';
    commandLine.innerHTML = `<span class="prompt">visitor@portfolio:~$</span> ${command}`;
    terminalOutput.appendChild(commandLine);

    // Process command
    const output = document.createElement('div');
    output.className = 'command-output';

    if (commands[command]) {
        output.innerHTML = commands[command]();
    } else if (command === '') {
        output.innerHTML = '';
    } else {
        output.innerHTML = `<div class="error">Command not found: ${command}</div><div class="info-text">Type <span class="highlight">'help'</span> to see available commands.</div>`;
        output.classList.add('shake');
    }

    terminalOutput.appendChild(output);
    terminal.scrollTop = terminal.scrollHeight;
}

function autocomplete() {
    const input = terminalInput.value.toLowerCase();
    if (!input) return;

    const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
    if (matches.length === 1) {
        terminalInput.value = matches[0];
    } else if (matches.length > 1) {
        const output = document.createElement('div');
        output.className = 'command-output info-text';
        output.textContent = matches.join('  ');
        terminalOutput.appendChild(output);
        terminal.scrollTop = terminal.scrollHeight;
    }
}

// Command suggestion cards
document.querySelectorAll('.suggestion-card').forEach(card => {
    card.addEventListener('click', () => {
        const command = card.getAttribute('data-command');
        terminalInput.value = command;
        terminalInput.focus();
        processCommand(command);
        terminalInput.value = '';
    });
});

// Keep input focused
terminal.addEventListener('click', () => {
    terminalInput.focus();
});

// ==================== ANIMATIONS ====================

// Typing effect for tagline
const taglineText = "< Full Stack Developer | Problem Solver | Tech Enthusiast />";
const taglineElement = document.getElementById('tagline');
let taglineIndex = 0;

function typeTagline() {
    if (taglineIndex < taglineText.length) {
        taglineElement.textContent += taglineText.charAt(taglineIndex);
        taglineIndex++;
        setTimeout(typeTagline, 50);
    }
}

setTimeout(typeTagline, 500);

// ASCII Art
const asciiArt = `
   _____                                            
  / ____|                                           
 | (___   ___  _   ___   ____ _  __ _ _   _  __ _  
  \\___ \\ / _ \\| | | \\ \\ / / _\` |/ _\` | | | |/ _\` | 
  ____) | (_) | |_| |\\ V / (_| | (_| | |_| | (_| | 
 |_____/ \\___/ \\__,_| \\_/ \\__,_|\\__, |\\__, |\\__,_| 
                                 __/ | __/ |        
                                |___/ |___/         
`;

document.getElementById('ascii-logo').textContent = asciiArt;

// Stats counter animation
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value');
            const target = parseInt(statValue.getAttribute('data-target'));
            animateValue(statValue, 0, target, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// ==================== PARTICLE SYSTEM ====================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = 'rgba(0, 255, 136, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw connections
    particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(0, 255, 136, ${1 - distance / 100})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ==================== MATRIX EFFECT ====================
function startMatrix() {
    const duration = 3000;
    const startTime = Date.now();
    
    const matrixInterval = setInterval(() => {
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        let line = '';
        for (let i = 0; i < 50; i++) {
            line += chars[Math.floor(Math.random() * chars.length)] + ' ';
        }
        
        const matrixLine = document.createElement('div');
        matrixLine.className = 'matrix-effect';
        matrixLine.textContent = line;
        terminalOutput.appendChild(matrixLine);
        terminal.scrollTop = terminal.scrollHeight;

        if (Date.now() - startTime > duration) {
            clearInterval(matrixInterval);
        }
    }, 50);
}

// ==================== FOCUS MANAGEMENT ====================
terminalInput.focus();

document.addEventListener('click', (e) => {
    if (!e.target.closest('.social-btn') && !e.target.closest('a')) {
        terminalInput.focus();
    }
});

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + L to clear
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        processCommand('clear');
    }
});

// ==================== EASTER EGGS ====================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        const output = document.createElement('div');
        output.className = 'command-output rainbow-text';
        output.innerHTML = '<div style="font-size: 1.5em; text-align: center;">🎮 KONAMI CODE ACTIVATED! You\'re a legend! 🎮</div>';
        terminalOutput.appendChild(output);
        terminal.scrollTop = terminal.scrollHeight;
        konamiCode = [];
    }
});

console.log('%c🚀 Welcome to my portfolio!', 'font-size: 20px; color: #00ff88; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 14px; color: #00d4ff;');
console.log('%cTry the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 12px; color: #ff00ff; font-style: italic;');
