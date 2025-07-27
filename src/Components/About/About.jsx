import React, { useEffect, useRef, useState } from 'react';
import { 
  SiJavascript, SiTypescript, SiReact, SiNodedotjs, 
  SiMongodb, SiExpress, SiPostgresql, SiRedis,
  SiGit, SiDocker, SiNestjs
} from 'react-icons/si';
import { FiCode, FiServer, FiDatabase, FiTool, FiCloud } from 'react-icons/fi';
import styles from './About.module.css';

const About = () => {
  const sectionRef = useRef(null);
  const skillsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const skills = {
    frontend: [
      { name: 'JavaScript', level: 90, icon: SiJavascript, color: '#F7DF1E' },
      // { name: 'TypeScript', level: 85, icon: SiTypescript, color: '#3178C6' },
      { name: 'React.js', level: 88, icon: SiReact, color: '#61DAFB' },
    ],
    backend: [
      { name: 'Node.js', level: 90, icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', level: 90, icon: SiExpress, color: '#000000' },
      { name: 'Nest.js', level: 60, icon: SiNestjs, color: '#E0234E' },
    ],
    database: [
      { name: 'MongoDB', level: 88, icon: SiMongodb, color: '#47A248' }
    ],
    tools: [
      { name: 'Git', level: 85, icon: SiGit, color: '#F05032' },
      { name: 'Docker', level: 60, icon: SiDocker, color: '#2496ED' }
    ]
  };

  const skillCategories = [
    { key: 'frontend', title: 'Frontend', icon: FiCode, skills: skills.frontend },
    { key: 'backend', title: 'Backend', icon: FiServer, skills: skills.backend },
    { key: 'database', title: 'Database', icon: FiDatabase, skills: skills.database },
    { key: 'tools', title: 'Tools & DevOps', icon: FiTool, skills: skills.tools },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Animate skill bars with CSS
          setTimeout(() => {
            const progressBars = skillsRef.current?.querySelectorAll(`.${styles.progressFill}`);
            progressBars?.forEach((bar, index) => {
              const level = bar.dataset.level;
              setTimeout(() => {
                bar.style.width = `${level}%`;
              }, index * 100);
            });
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>About Me</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.content}>
          <div className={`${styles.introduction} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.introCard}>
              <h3>Full Stack Developer with Backend Focus</h3>
              <p>
                I'm a passionate Full Stack Web Developer specializing in backend development 
                with expertise in the MERN stack. I love creating efficient, scalable web 
                applications that solve real-world problems.
              </p>
              <p>
                With a strong foundation in Node.js and Express.js, I build robust APIs and 
                server-side applications. My frontend skills in React.js allow me to create 
                seamless user experiences that connect perfectly with the backend architecture.
              </p>
              <p>
                I'm always eager to learn new technologies and best practices, constantly 
                improving my skills to deliver high-quality solutions that exceed expectations.
              </p>
            </div>

            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <span className={styles.number}>1+</span>
                <span className={styles.label}>Years Experience</span>
              </div>
              <div className={styles.highlight}>
                <span className={styles.number}>7+</span>
                <span className={styles.label}>Projects Completed</span>
              </div>
              <div className={styles.highlight}>
                <span className={styles.number}>100%</span>
                <span className={styles.label}>Client Satisfaction</span>
              </div>
            </div>
          </div>

          <div className={`${styles.skillsSection} ${isVisible ? styles.visible : ''}`} ref={skillsRef}>
            <h3 className={styles.skillsTitle}>Technical Skills</h3>
            
            <div className={styles.skillsGrid}>
              {skillCategories.map((category, categoryIndex) => (
                <div key={category.key} className={styles.skillCategory}>
                  <div className={styles.categoryHeader}>
                    <category.icon className={styles.categoryIcon} />
                    <h4>{category.title}</h4>
                  </div>
                  
                  <div className={styles.skillsList}>
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name} className={styles.skill}>
                        <div className={styles.skillHeader}>
                          <div className={styles.skillInfo}>
                            <skill.icon 
                              className={styles.skillIcon} 
                              style={{ color: skill.color }}
                            />
                            <span className={styles.skillName}>{skill.name}</span>
                          </div>
                          <span className={styles.skillLevel}>{skill.level}%</span>
                        </div>
                        <div className={styles.progressBar}>
                          <div 
                            className={styles.progressFill}
                            data-level={skill.level}
                            style={{ '--skill-color': skill.color }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 