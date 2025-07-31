import React, { useEffect, useRef } from 'react';
import { FiGithub, FiLinkedin, FiDownload, FiArrowDown } from 'react-icons/fi';
import { SiReact, SiNodedotjs, SiMongodb, SiExpress } from 'react-icons/si';
import resumePDF from '../../assets/mohamed_hany_resume.pdf';
import profileImage from '../../assets/me.jpg';
import styles from './Hero.module.css';

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    // Simple CSS-based animations instead of GSAP
    const elements = [titleRef.current, subtitleRef.current, descriptionRef.current];
    
    elements.forEach((el, index) => {
      if (el) {
        el.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`;
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
      }
    });

    // Add CSS animation keyframes if not already present
    if (!document.querySelector('#heroAnimations')) {
      const style = document.createElement('style');
      style.id = 'heroAnimations';
      style.textContent = `
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .tech-icon-float {
          animation: float 2s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }

    // Add floating animation to tech icons
    setTimeout(() => {
      const techIcons = document.querySelectorAll(`.${styles.techIcon}`);
      techIcons.forEach((icon, index) => {
        icon.classList.add('tech-icon-float');
        icon.style.animationDelay = `${index * 0.3}s`;
      });
    }, 1000);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Mohamed_Hany_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const techStack = [
    { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
    { icon: SiExpress, name: 'Express.js', color: '#000000' },
    { icon: SiReact, name: 'React.js', color: '#61DAFB' },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
  ];

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.profileSection}>
            <div className={styles.profileImageContainer}>
              <div className={styles.profileImage}>
                <img 
                  src={profileImage} 
                  alt="Mohamed Hany" 
                  className={styles.profileImg}
                />
                <div className={styles.profileGlow}></div>
              </div>
            </div>

            <div className={styles.textSection}>
              <div className={styles.greeting}>
                Hello, I'm
              </div>

              <h1 className={styles.title} ref={titleRef}>Mohamed Hany</h1>
              <h2 className={styles.subtitle} ref={subtitleRef}>Full Stack Web Developer</h2>
              <p className={styles.description} ref={descriptionRef}>Backend Specialist | MERN Stack</p>

              <div className={styles.techStack}>
                <span className={styles.techLabel}>Specialized in:</span>
                <div className={styles.techIcons}>
                  {techStack.map((tech, index) => (
                    <div
                      key={tech.name}
                      className={styles.techIcon}
                      style={{ '--tech-color': tech.color }}
                      title={tech.name}
                    >
                      <tech.icon />
                      <span className={styles.tooltip}>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={scrollToProjects}
                >
                  View My Work
                  <FiArrowDown className={styles.btnIcon} />
                </button>

                <button
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={handleDownloadResume}
                >
                  <FiDownload className={styles.btnIcon} />
                  Download Resume
                </button>
              </div>

              <div className={styles.socialLinks}>
                <a
                  href="https://github.com/Mohamed-Hany1211?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <FiGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohamed-hany-bb2770228/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <FiLinkedin />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.scrollIndicator}>
            <div className={styles.scrollMouse}>
              <div className={styles.scrollWheel}></div>
            </div>
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 