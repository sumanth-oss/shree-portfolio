import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  Mail,
  Phone,
  Github,
  Linkedin,
  Download,
  Shield,
  Terminal,
  Eye,
  Lock,
  Server,
  Code,
  ExternalLink,
  MapPin,
} from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'hero',
        'about',
        'skills',
        'experience',
        'projects',
        'contact',
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Skills data
  const skills = [
    { name: 'Burp Suite', icon: Shield },
    { name: 'Wireshark', icon: Eye },
    { name: 'Nmap', icon: Terminal },
    { name: 'Metasploit', icon: Lock },
    { name: 'Python', icon: Code },
    { name: 'Linux', icon: Terminal },
    { name: 'SIEM', icon: Server },
    { name: 'Vulnerability Assessment', icon: Shield },
    { name: 'Penetration Testing', icon: Lock },
    { name: 'Incident Response', icon: Eye },
    { name: 'Threat Hunting', icon: Shield },
    { name: 'Network Security', icon: Server },
  ];

  // Experience data
  const experience = [
    {
      title: 'Cyber Security Intern',
      company: 'NullClass Edtech Pvt Ltd',
      duration: 'Feb 2024 - May 2024',
      description:
        'Authored research paper on 3+ live CTF exercises, analyzing advanced exploitation and defense techniques. Conducted OWASP ZAP assessments on 4+ live websites, addressing OWASP Top 10 vulnerabilities.',
    },
    {
      title: 'Ethical Hacking and Linux Intern',
      company: 'Thaniya Technologies',
      duration: 'Mar 2021 - Dec 2022',
      description:
        'Built foundational skills in Linux and ethical hacking tools, including DVWA, Shodan, and basic penetration testing techniques. Gained hands-on experience with vulnerability scanning and exploitation methods.',
    },
  ];

  // Projects data
  const projects = [
    {
      title: 'Phishing Detection and Threat Intelligence Tool',
      description:
        'Advanced NLP and logistic regression-based tool to analyze emails with 96.3% accuracy in detecting phishing attempts.',
      tech: ['Python', 'NLP', 'Machine Learning', 'Logistic Regression'],
      demo: '#',
      github: '#',
    },
    {
      title: 'SIEM System Implementation',
      description:
        'Built comprehensive SIEM system with Kibana, Fluentd, and ElastAlert for real-time threat detection and alerting.',
      tech: ['Kibana', 'Fluentd', 'ElastAlert', 'SIEM', 'Security Monitoring'],
      demo: '#',
      github: '#',
    },
    {
      title: 'Criminal Face Detection System',
      description:
        'Developed facial recognition system using Python and OpenCV to assist law enforcement in identifying criminals.',
      tech: ['Python', 'OpenCV', 'Computer Vision', 'Machine Learning'],
      demo: '#',
      github: '#',
    },
  ];

  // Navigation
  const Navigation = () => (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-green-400 font-bold text-xl">SHREELAXMI</div>
          <div className="hidden md:flex space-x-8">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm cursor-pointer font-medium transition-colors duration-200 ${
                    activeSection === item.toLowerCase()
                      ? 'text-green-400'
                      : 'text-gray-300 hover:text-green-400'
                  }`}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-green-900/20"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              SHREELAXMI HEGDE
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
              Cyber Security Analyst
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Experienced in threat detection, vulnerability assessment, and
              incident response. Skilled in penetration testing, security
              monitoring, and network defense.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="mailto:shreelaxmihegde39@gmail.com"
              className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Mail size={20} />
              Email Me
            </a>
            <a
              href="tel:+918296054774"
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Phone size={20} />
              Call
            </a>
            <a
              href="#"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
            <a
              href="#"
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Download size={20} />
              Resume
            </a>
          </div>

          <div className="flex justify-center">
            <a
              href="#"
              className="text-green-400 hover:text-green-300 transition-colors duration-300"
            >
              <Github size={32} />
            </a>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => scrollToSection('about')}
              className="text-green-400 animate-bounce"
            >
              <ChevronDown size={32} />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-400">
            About Me
          </h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I'm a passionate Cybersecurity Analyst with expertise in threat
              detection, vulnerability assessment, and incident response.
              Currently pursuing Bachelor of Technology in Cyber Security and
              Cyber Forensics at SUIET Mukka, Mangalore with a CGPA of 8.9/10.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              My experience spans across penetration testing, security
              monitoring, and network defense using industry-standard tools like
              Burp Suite, Wireshark, Nmap, and Metasploit. I'm particularly
              interested in threat hunting, SIEM implementation, and developing
              innovative security solutions.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <h3 className="text-green-400 font-semibold mb-2">
                  Certifications
                </h3>
                <p className="text-gray-400">
                  AWS Cloud Foundation, Dark Web & Cryptocurrency, Web
                  Application Security
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-green-400 font-semibold mb-2">Location</h3>
                <p className="text-gray-400 flex items-center justify-center gap-1">
                  <MapPin size={16} />
                  Bengaluru, India
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-green-400 font-semibold mb-2">
                  Focus Areas
                </h3>
                <p className="text-gray-400">
                  Threat Detection, VAPT, Incident Response
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-400">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div
                  key={index}
                  className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 hover:border-green-400/50 transition-all duration-300 cursor-pointer transform hover:scale-105"
                  style={{
                    animation: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.animation = 'shine 2s ease-in-out';
                  }}
                  onAnimationEnd={(e) => {
                    e.currentTarget.style.animation = 'none';
                  }}
                >
                  <div className="text-center">
                    <IconComponent
                      className="mx-auto mb-3 text-green-400 group-hover:text-green-300 transition-colors duration-300"
                      size={32}
                    />
                    <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors duration-300">
                      {skill.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-400">
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 hover:border-green-400/50 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-green-400 mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-lg text-gray-300">{exp.company}</p>
                  </div>
                  <span className="text-gray-400 md:text-right mt-2 md:mt-0">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-400">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-xl font-bold text-green-400 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.demo}
                    className="text-green-400 hover:text-green-300 transition-colors duration-300 flex items-center gap-1"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </a>
                  <a
                    href={project.github}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-1"
                  >
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-green-400">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to strengthen your cybersecurity posture? Let's connect and
            discuss how I can help protect your digital assets.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:shreelaxmihegde39@gmail.com"
              className="bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Mail size={24} />
              shreelaxmihegde39@gmail.com
            </a>
            <a
              href="tel:+918296054774"
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Phone size={24} />
              +91 82960 54774
            </a>
          </div>
          <div className="flex justify-center gap-6 mt-8">
            <a
              href="#"
              className="text-green-400 hover:text-green-300 transition-colors duration-300"
            >
              <Linkedin size={32} />
            </a>
            <a
              href="#"
              className="text-green-400 hover:text-green-300 transition-colors duration-300"
            >
              <Github size={32} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-4 border-t border-green-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Shreelaxmi Hegde. Securing the digital future, one
            vulnerability at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
