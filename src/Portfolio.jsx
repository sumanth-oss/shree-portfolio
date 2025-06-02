import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
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
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Three.js background setup
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = { scene, camera, renderer };

    // Create floating objects - smaller and more subtle
    const objects = [];
    const trails = [];

    // Create different geometric shapes - smaller sizes
    for (let i = 0; i < 25; i++) {
      let geometry;
      const shapeType = Math.floor(Math.random() * 6);

      switch (shapeType) {
        case 0:
          geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
          break;
        case 1:
          geometry = new THREE.SphereGeometry(0.6, 12, 12);
          break;
        case 2:
          geometry = new THREE.ConeGeometry(0.5, 1.0, 8);
          break;
        case 3:
          geometry = new THREE.CylinderGeometry(0.4, 0.4, 1.0, 8);
          break;
        case 4:
          geometry = new THREE.TorusGeometry(0.5, 0.2, 8, 16);
          break;
        default:
          geometry = new THREE.RingGeometry(0.3, 0.8, 8);
      }

      // Materials with reduced opacity
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.4 + 0.3, 0.9, 0.7),
        transparent: true,
        opacity: 0.6,
        wireframe: true,
        emissive: new THREE.Color().setHSL(Math.random() * 0.4 + 0.3, 0.5, 0.1),
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Reduced position range
      mesh.position.x = (Math.random() - 0.5) * 20;
      mesh.position.y = (Math.random() - 0.5) * 20;
      mesh.position.z = (Math.random() - 0.5) * 20;

      mesh.userData = {
        originalX: mesh.position.x,
        originalY: mesh.position.y,
        originalZ: mesh.position.z,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        floatSpeed: Math.random() * 0.01 + 0.005,
        floatRange: Math.random() * 1.5 + 1,
        mouseInfluence: Math.random() * 1 + 0.5,
        originalColor: mesh.material.color.clone(),
        originalEmissive: mesh.material.emissive.clone(),
      };

      scene.add(mesh);
      objects.push(mesh);

      // Create trail effect for each object
      const trailGeometry = new THREE.BufferGeometry();
      const trailPositions = new Float32Array(30 * 3);
      trailGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(trailPositions, 3)
      );

      const trailMaterial = new THREE.LineBasicMaterial({
        color: mesh.material.color,
        transparent: true,
        opacity: 0.2,
        linewidth: 1,
      });

      const trail = new THREE.Line(trailGeometry, trailMaterial);
      scene.add(trail);
      trails.push({
        line: trail,
        positions: [],
        maxLength: 8,
      });
    }

    // Lighting with reduced intensity
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x00ff88, 0.8);
    directionalLight1.position.set(10, 10, 10);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x0088ff, 0.6);
    directionalLight2.position.set(-10, -10, 5);
    scene.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(0xff0088, 0.4);
    directionalLight3.position.set(0, 10, -10);
    scene.add(directionalLight3);

    // Particle system with smaller particles
    const particleSystems = [];
    for (let layer = 0; layer < 3; layer++) {
      const particleCount = 200;
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 40;
        positions[i + 1] = (Math.random() - 0.5) * 40;
        positions[i + 2] = (Math.random() - 0.5) * 40;

        velocities[i] = (Math.random() - 0.5) * 0.01;
        velocities[i + 1] = (Math.random() - 0.5) * 0.01;
        velocities[i + 2] = (Math.random() - 0.5) * 0.01;
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
      particleGeometry.setAttribute(
        'velocity',
        new THREE.BufferAttribute(velocities, 3)
      );

      const colors = [0x00ff88, 0x0088ff, 0xff0088];
      const particleMaterial = new THREE.PointsMaterial({
        color: colors[layer],
        size: 0.1 + layer * 0.05,
        transparent: true,
        opacity: 0.5 - layer * 0.1,
        blending: THREE.AdditiveBlending,
      });

      const particleSystem = new THREE.Points(
        particleGeometry,
        particleMaterial
      );
      scene.add(particleSystem);
      particleSystems.push(particleSystem);
    }

    camera.position.z = 15;

    // Mouse movement handler
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Mouse click handler
    const handleMouseClick = (event) => {
      objects.forEach((object, index) => {
        const distance = Math.random();
        setTimeout(() => {
          object.material.emissive.setHSL(Math.random(), 1, 0.3);
          setTimeout(() => {
            object.material.emissive.copy(object.userData.originalEmissive);
          }, 300);
        }, index * 50);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animate floating objects with reduced movement
      objects.forEach((object, index) => {
        // Rotation
        object.rotation.x += object.userData.rotationSpeed.x;
        object.rotation.y += object.userData.rotationSpeed.y;
        object.rotation.z += object.userData.rotationSpeed.z;

        // Floating motion
        object.position.y =
          object.userData.originalY +
          Math.sin(time * object.userData.floatSpeed + index) *
            object.userData.floatRange;

        // Reduced mouse interaction
        const mouseInfluence = object.userData.mouseInfluence;
        const targetX =
          object.userData.originalX + mouseRef.current.x * mouseInfluence * 1.5;
        const targetZ =
          object.userData.originalZ + mouseRef.current.y * mouseInfluence * 1;

        // Smooth interpolation
        object.position.x += (targetX - object.position.x) * 0.08;
        object.position.z += (targetZ - object.position.z) * 0.08;

        // Color shift based on mouse proximity
        const mouseDistance = Math.sqrt(
          Math.pow(mouseRef.current.x * 10 - object.position.x, 2) +
            Math.pow(mouseRef.current.y * 10 - object.position.y, 2)
        );

        const colorShift = Math.max(0, 1 - mouseDistance / 15);
        object.material.emissive.setRGB(
          object.userData.originalEmissive.r + colorShift * 0.2,
          object.userData.originalEmissive.g + colorShift * 0.3,
          object.userData.originalEmissive.b + colorShift * 0.1
        );

        // Update trails
        if (trails[index]) {
          trails[index].positions.push(object.position.clone());
          if (trails[index].positions.length > trails[index].maxLength) {
            trails[index].positions.shift();
          }

          const trailPositions =
            trails[index].line.geometry.attributes.position.array;
          for (let i = 0; i < trails[index].positions.length; i++) {
            trailPositions[i * 3] = trails[index].positions[i].x;
            trailPositions[i * 3 + 1] = trails[index].positions[i].y;
            trailPositions[i * 3 + 2] = trails[index].positions[i].z;
          }
          trails[index].line.geometry.attributes.position.needsUpdate = true;
        }
      });

      // Animate particle systems
      particleSystems.forEach((particleSystem, layerIndex) => {
        const positions = particleSystem.geometry.attributes.position.array;
        const velocities = particleSystem.geometry.attributes.velocity.array;

        for (let i = 0; i < positions.length; i += 3) {
          // Mouse attraction effect
          const dx = mouseRef.current.x * 10 - positions[i];
          const dy = mouseRef.current.y * 10 - positions[i + 1];
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 10) {
            velocities[i] += dx * 0.00005;
            velocities[i + 1] += dy * 0.00005;
          }

          // Apply velocity
          positions[i] += velocities[i];
          positions[i + 1] +=
            velocities[i + 1] + Math.sin(time + positions[i]) * 0.005;
          positions[i + 2] += velocities[i + 2];

          // Boundary wrapping
          if (positions[i] > 40) positions[i] = -40;
          if (positions[i] < -40) positions[i] = 40;
          if (positions[i + 1] > 40) positions[i + 1] = -40;
          if (positions[i + 1] < -40) positions[i + 1] = 40;
        }

        particleSystem.geometry.attributes.position.needsUpdate = true;
        particleSystem.rotation.y += 0.001 * (layerIndex + 1);
        particleSystem.rotation.x += 0.0005 * (layerIndex + 1);
      });

      // Camera movement with reduced mouse following
      const targetCameraX = mouseRef.current.x * 1;
      const targetCameraY = mouseRef.current.y * 1;

      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // ... [Rest of your component code remains exactly the same]
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
    <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-green-500/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-green-400 font-bold text-xl animate-pulse">
            SHREELAXMI
          </div>
          <div className="hidden md:flex space-x-8">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm cursor-pointer font-medium transition-all duration-300 transform hover:scale-110 ${
                    activeSection === item.toLowerCase()
                      ? 'text-green-400 animate-pulse'
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
    <div className="bg-gray-900 text-white min-h-screen relative overflow-hidden">
      {/* Three.js Background */}
      <div
        ref={mountRef}
        className="fixed inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />

      {/* Animated background overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-green-900/20"></div>

      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent animate-fade-in-up">
                SHREELAXMI HEGDE
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-300 mb-6 animate-fade-in-up animation-delay-200">
                Cyber Security Analyst
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-400">
                Experienced in threat detection, vulnerability assessment, and
                incident response. Skilled in penetration testing, security
                monitoring, and network defense.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up animation-delay-600">
              <a
                href="mailto:shreelaxmihegde39@gmail.com"
                className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:rotate-1 flex items-center gap-2 animate-bounce-subtle"
              >
                <Mail size={20} />
                Email Me
              </a>
              <a
                href="tel:+918296054774"
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:-rotate-1 flex items-center gap-2"
              >
                <Phone size={20} />
                Call
              </a>
              <a
                href="#"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:rotate-1 flex items-center gap-2"
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:-rotate-1 flex items-center gap-2"
              >
                <Download size={20} />
                Resume
              </a>
            </div>

            <div className="flex justify-center animate-fade-in-up animation-delay-800">
              <a
                href="#"
                className="text-green-400 hover:text-green-300 transition-all duration-300 transform hover:scale-125 animate-pulse"
              >
                <Github size={32} />
              </a>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => scrollToSection('about')}
                className="text-green-400 animate-bounce hover:text-green-300 transition-colors duration-300"
              >
                <ChevronDown size={32} />
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-green-400 animate-fade-in-up">
              About Me
            </h2>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 hover:border-green-400/50 transition-all duration-500 transform hover:scale-105 animate-fade-in-up">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                I'm a passionate Cybersecurity Analyst with expertise in threat
                detection, vulnerability assessment, and incident response.
                Currently pursuing Bachelor of Technology in Cyber Security and
                Cyber Forensics at SUIET Mukka, Mangalore with a CGPA of 8.9/10.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                My experience spans across penetration testing, security
                monitoring, and network defense using industry-standard tools
                like Burp Suite, Wireshark, Nmap, and Metasploit. I'm
                particularly interested in threat hunting, SIEM implementation,
                and developing innovative security solutions.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-green-400 font-semibold mb-2">
                    Certifications
                  </h3>
                  <p className="text-gray-400">
                    AWS Cloud Foundation, Dark Web & Cryptocurrency, Web
                    Application Security
                  </p>
                </div>
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-green-400 font-semibold mb-2">
                    Location
                  </h3>
                  <p className="text-gray-400 flex items-center justify-center gap-1">
                    <MapPin size={16} className="animate-pulse" />
                    Bengaluru, India
                  </p>
                </div>
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
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
            <h2 className="text-4xl font-bold text-center mb-12 text-green-400 animate-fade-in-up">
              Technical Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={index}
                    className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 hover:border-green-400/50 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:rotate-2 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-center">
                      <IconComponent
                        className="mx-auto mb-3 text-green-400 group-hover:text-green-300 transition-all duration-300 group-hover:animate-spin"
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
            <h2 className="text-4xl font-bold text-center mb-12 text-green-400 animate-fade-in-up">
              Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105 hover:rotate-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-green-400 mb-1 hover:animate-pulse">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-gray-300">{exp.company}</p>
                    </div>
                    <span className="text-gray-400 md:text-right mt-2 md:mt-0 animate-fade-in">
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
            <h2 className="text-4xl font-bold text-center mb-12 text-green-400 animate-fade-in-up">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105 hover:-rotate-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <h3 className="text-xl font-bold text-green-400 mb-3 hover:animate-pulse">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium transform hover:scale-110 transition-transform duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.demo}
                      className="text-green-400 hover:text-green-300 transition-all duration-300 flex items-center gap-1 transform hover:scale-110"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                    <a
                      href={project.github}
                      className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-1 transform hover:scale-110"
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
            <h2 className="text-4xl font-bold mb-12 text-green-400 animate-fade-in-up">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Ready to strengthen your cybersecurity posture? Let's connect and
              discuss how I can help protect your digital assets.
            </p>
            <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up animation-delay-400">
              <a
                href="mailto:shreelaxmihegde39@gmail.com"
                className="bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:rotate-1 flex items-center gap-2"
              >
                <Mail size={24} />
                shreelaxmihegde39@gmail.com
              </a>
              <a
                href="tel:+918296054774"
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:-rotate-1 flex items-center gap-2"
              >
                <Phone size={24} />
                +91 82960 54774
              </a>
            </div>
            <div className="flex justify-center gap-6 mt-8 animate-fade-in-up animation-delay-600">
              <a
                href="#"
                className="text-green-400 hover:text-green-300 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
              >
                <Linkedin size={32} />
              </a>
              <a
                href="#"
                className="text-green-400 hover:text-green-300 transition-all duration-300 transform hover:scale-125 hover:-rotate-12"
              >
                <Github size={32} />
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 py-8 px-4 border-t border-green-500/20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400 animate-fade-in">
              © 2025 Shreelaxmi Hegde. Securing the digital future, one
              vulnerability at a time.
            </p>
          </div>
        </footer>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce-subtle {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-3px);
          }
          60% {
            transform: translateY(-2px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-800 {
          animation-delay: 800ms;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
