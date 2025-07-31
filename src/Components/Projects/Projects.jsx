import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FiGithub, FiExternalLink, FiCode, FiServer, FiDatabase, 
  FiFilter, FiSearch, FiX, FiImage, FiEye, FiCloud, FiPlus,
  FiUpload, FiTrash2, FiLock, FiCheck, FiAlertCircle, FiEdit
} from 'react-icons/fi';
import { 
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiJavascript, 
  SiTypescript, SiPostgresql, SiRedis, SiDocker
} from 'react-icons/si';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const projectsGridRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditPasswordModal, setShowEditPasswordModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Form state for new project
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    longDescription: '',
    type: '',
    technologies: [],
    githubLink: '',
    liveLink: '',
    images: [],
    featured: false
  });
  const [currentTech, setCurrentTech] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [imageFiles, setImageFiles] = useState([]);

  // Function to save projects to localStorage
  const saveProjectsToStorage = (projectsData) => {
    try {
      localStorage.setItem('portfolioProjects', JSON.stringify(projectsData));
    } catch (error) {
      console.error('Error saving projects to localStorage:', error);
    }
  };

  // Icon mapping for serialization
  const iconMap = {
    'SiNodedotjs': SiNodedotjs,
    'SiExpress': SiExpress,
    'SiMongodb': SiMongodb,
    'SiRedis': SiRedis,
    'SiReact': SiReact,
    'SiTypescript': SiTypescript,
    'SiJavascript': SiJavascript,
    'SiDocker': SiDocker,
    'SiPostgresql': SiPostgresql,
    'FiCloud': FiCloud,
    'FiCode': FiCode
  };

  // Default project data
  const defaultProjects = [
    {
      id: 1,
      title: "Task Management System",
      description: "Developed a comprehensive Node.js task management system designed as a collaborative productivity platform with user registration and email verification, Implemented customizable task organization with three category types (To Do, In Progress, Done) and flexible task visibility options (public/private), Built secure authentication system using JWT tokens, integrated Cloudinary for user profile image storage, and implemented MongoDB for data persistence, Created full CRUD operations with pagination functionality, enabling both personal task organization and public task sharing for collaborative workflows",
      type: "backend",
      technologies: ["Node.js", "JavaScript", "Express.js", "MongoDB"],
      githubLink: "https://github.com/Mohamed-Hany1211/Tech-Summit-Task",
      liveLink: null,
      images: [],
      featured: true,
      longDescription: "Comprehensive Node.js task management system designed as a collaborative productivity platform with user registration and email verification, customizable task organization with three category types (To Do, In Progress, Done) and flexible task visibility options (public/private), secure authentication system using JWT tokens, integrated Cloudinary for user profile image storage, and MongoDB for data persistence with full CRUD operations and pagination functionality.",
      techIconNames: ['SiNodedotjs', 'SiJavascript', 'SiExpress', 'SiMongodb']
    },
    {
      id: 2,
      title: "E-commerce Backend API (in progress)",
      description: "Built comprehensive e-commerce backend API using Node.js, Express, and MongoDB with full CRUD operations, Implemented user authentication, product catalog management, and shopping cart functionality, Integrated Stripe payment processing, coupon system, and role-based access control, Developed order processing workflows and comprehensive API documentation",
      type: "backend",
      technologies: ["Node.js", "JavaScript", "Express.js", "MongoDB"],
      githubLink: "https://github.com/Mohamed-Hany1211/ecommerce-dev",
      liveLink: null,
      images: [],
      featured: true,
      longDescription: "Comprehensive e-commerce backend API using Node.js, Express, and MongoDB with full CRUD operations, user authentication, product catalog management, shopping cart functionality, Stripe payment processing, coupon system, role-based access control, and order processing workflows with comprehensive API documentation.",
      techIconNames: ['SiNodedotjs', 'SiJavascript', 'SiExpress', 'SiMongodb']
    },
    {
      id: 3,
      title: "Fresh Cart- E-commerce Web Application",
      description: "Developed a comprehensive online shopping platform using React with modern development practices, Implemented user authentication, product management, and cart functionality using React hooks, Integrated payment processing and utilized Context API for state management, Built responsive user interface with seamless RESTful API integration",
      type: "frontend",
      technologies: ["React", "JavaScript", "HTML5", "CSS3"],
      githubLink: "https://github.com/Mohamed-Hany1211/Fresh_Cart",
      liveLink: null,
      images: [],
      featured: true,
      longDescription: "Comprehensive online shopping platform using React with modern development practices, user authentication, product management, and cart functionality using React hooks, payment processing integration, Context API for state management, and responsive user interface with seamless RESTful API integration.",
      techIconNames: ['SiReact', 'SiJavascript', 'FiCode', 'FiCode']
    },
    {
      id: 4,
      title: "Job Board Platform",
      description: "Created a comprehensive job board platform connecting employers with job seekers, Implemented functionality for employers to post job listings and manage applications, Built job search and application features for job seekers with filtering capabilities, Developed user authentication and role-based access for different user type",
      type: "backend",
      technologies: ["Node.js", "JavaScript", "Express.js", "MongoDB"],
      githubLink: "https://github.com/Mohamed-Hany1211/job_board",
      liveLink: null,
      images: [],
      featured: true,
      longDescription: "Comprehensive job board platform connecting employers with job seekers, functionality for employers to post job listings and manage applications, job search and application features for job seekers with filtering capabilities, user authentication and role-based access for different user types.",
      techIconNames: ['SiNodedotjs', 'SiJavascript', 'SiExpress', 'SiMongodb']
    },
    {
      id: 5,
      title: "Upvote Community Platform",
      description: "Developed a community-driven platform where users can express approval through voting mechanisms, Implemented content ranking system based on community upvotes and engagement, Built user interaction features to promote community participation and content discovery, Created responsive design with real-time voting updates and content popularity trackin",
      type: "backend",
      technologies: ["Node.js", "JavaScript", "Express.js", "MongoDB"],
      githubLink: "https://github.com/Mohamed-Hany1211/upVote",
      liveLink: null,
      images: [],
      featured: true,
      longDescription: "Community-driven platform where users can express approval through voting mechanisms, content ranking system based on community upvotes and engagement, user interaction features to promote community participation and content discovery, responsive design with real-time voting updates and content popularity tracking.",
      techIconNames: ['SiNodedotjs', 'SiJavascript', 'SiExpress', 'SiMongodb']
    },
    {
      id: 6,
      title: "Moktashif– AI-Powered Cybersecurity Web Application (Frontend)",
      description: "Developed Moktashif, an automated vulnerability web scanner that analyzes websites by taking their URLs and scanning them to identify security vulnerabilities. The system employs two distinct scanning approaches: the first utilizes Nuclei templates for comprehensive vulnerability detection, while the second leverages three specialized AI agents to identify potential security flaws. Both approaches send raw vulnerability data to a search agent that categorizes findings and provides detailed vulnerability descriptions, remediation steps, risk levels, and additional learning resources. Built a full-stack React application featuring automated vulnerability scanning, AI chatbot integration for cybersecurity consultation, interactive dashboards with data visualization, and secure user authentication, Integrated a specialized cybersecurity chatbot that exclusively answers cybersecurity-related questions, providing expert consultation and guidance to users, Implemented PDF report generation and comprehensive security analysis capabilities for web applications and infrastructure assessment",
      type: "fullstack",
      technologies: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "React"],
      githubLink: "https://github.com/MoktashifAI/Moktashif-front-end",
      liveLink: null,
      images: [],
      featured: true,
      longDescription: "AI-Powered Cybersecurity Web Application featuring automated vulnerability web scanner that analyzes websites by taking their URLs and scanning them to identify security vulnerabilities. The system employs two distinct scanning approaches: Nuclei templates for comprehensive vulnerability detection and specialized AI agents. Built with React application featuring automated vulnerability scanning, AI chatbot integration for cybersecurity consultation, interactive dashboards with data visualization, secure user authentication, specialized cybersecurity chatbot, and PDF report generation with comprehensive security analysis capabilities.",
      techIconNames: ['FiCode', 'FiCode', 'SiJavascript', 'FiCode', 'SiReact']
    },
    {
      id: 7,
      title: "Moktashif– AI-Powered Cybersecurity Web Application (Backend)",
      description: "Developed Moktashif, an automated vulnerability web scanner that analyzes websites by taking their URLs and scanning them to identify security vulnerabilities. The system employs two distinct scanning approaches: the first utilizes Nuclei templates for comprehensive vulnerability detection, while the second leverages three specialized AI agents to identify potential security flaws. Both approaches send raw vulnerability data to a search agent that categorizes findings and provides detailed vulnerability descriptions, remediation steps, risk levels, and additional learning resources. Built a full-stack React application featuring automated vulnerability scanning, AI chatbot integration for cybersecurity consultation, interactive dashboards with data visualization, and secure user authentication, Developed comprehensive backend using Node.js, Express, and MongoDB with user authentication, automated vulnerability scanning through external APIs, AI-powered threat analysis, scan history management, and secure file uploads with Cloudinary integration, Integrated a specialized cybersecurity chatbot that exclusively answers cybersecurity-related questions, providing expert consultation and guidance to users, Implemented PDF report generation and comprehensive security analysis capabilities for web applications and infrastructure assessment",
      type: "fullstack",
      technologies: ["Node.js", "JavaScript", "Express.js", "MongoDB"],
      githubLink: "https://github.com/MoktashifAI/Moktashef-back-end",
      liveLink: null,
      images: [],
      featured: true,
      longDescription: "AI-Powered Cybersecurity Web Application backend featuring automated vulnerability web scanner with two distinct scanning approaches: Nuclei templates and specialized AI agents. Comprehensive backend using Node.js, Express, and MongoDB with user authentication, automated vulnerability scanning through external APIs, AI-powered threat analysis, scan history management, secure file uploads with Cloudinary integration, specialized cybersecurity chatbot, and PDF report generation with comprehensive security analysis capabilities.",
      techIconNames: ['SiNodedotjs', 'SiJavascript', 'SiExpress', 'SiMongodb']
    }
  ];

  // Function to process projects and ensure they have techIconNames
  const processProjects = (projects) => {
    return projects.map(project => {
      // If project has old techIcons property, convert it or remove it
      if (project.techIcons && !project.techIconNames) {
        // Generate techIconNames based on technologies if missing
        const techIconNames = [];
        project.technologies?.forEach(tech => {
          const lowerTech = tech.toLowerCase();
          if (lowerTech.includes('react')) techIconNames.push('SiReact');
          else if (lowerTech.includes('node')) techIconNames.push('SiNodedotjs');
          else if (lowerTech.includes('mongo')) techIconNames.push('SiMongodb');
          else if (lowerTech.includes('express')) techIconNames.push('SiExpress');
          else if (lowerTech.includes('javascript')) techIconNames.push('SiJavascript');
          else if (lowerTech.includes('typescript')) techIconNames.push('SiTypescript');
          else if (lowerTech.includes('docker')) techIconNames.push('SiDocker');
          else if (lowerTech.includes('redis')) techIconNames.push('SiRedis');
          else if (lowerTech.includes('postgres')) techIconNames.push('SiPostgresql');
        });
        
        const { techIcons, ...cleanProject } = project;
        return {
          ...cleanProject,
          techIconNames: techIconNames.length > 0 ? techIconNames : ['FiCode']
        };
      }
      
      return project;
    });
  };

  // Load projects from localStorage or use default projects
  const [projects, setProjects] = useState(() => {
    try {
      const savedProjects = localStorage.getItem('portfolioProjects');
      if (savedProjects) {
        const parsedProjects = JSON.parse(savedProjects);
        return processProjects(parsedProjects);
      }
      return defaultProjects;
    } catch (error) {
      console.error('Error loading projects from localStorage:', error);
      return defaultProjects;
    }
  });

  const filters = [
    { id: 'all', label: 'All Projects', icon: FiCode },
    { id: 'frontend', label: 'Frontend', icon: FiCode },
    { id: 'backend', label: 'Backend', icon: FiServer },
    { id: 'fullstack', label: 'Full Stack', icon: FiDatabase }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.type === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Password verification
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === '1598') {
      setShowPasswordModal(false);
      setShowAddProjectModal(true);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Access denied.');
      setPassword('');
    }
  };

  // Form handlers
  const handleInputChange = (field, value) => {
    setNewProject(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAddTechnology = (e) => {
    e.preventDefault();
    if (currentTech.trim() && !newProject.technologies.includes(currentTech.trim())) {
      setNewProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, currentTech.trim()]
      }));
      setCurrentTech('');
    }
  };

  const handleRemoveTechnology = (techToRemove) => {
    setNewProject(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Convert files to URLs for preview
      const imageUrls = files.map(file => URL.createObjectURL(file));
      setNewProject(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls]
      }));
      setImageFiles(prev => [...prev, ...files]);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setNewProject(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
    setImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!newProject.title.trim()) errors.title = 'Title is required';
    if (!newProject.description.trim()) errors.description = 'Description is required';
    if (!newProject.type) errors.type = 'Project type is required';
    if (!newProject.githubLink.trim()) errors.githubLink = 'GitHub link is required';
    if (newProject.technologies.length === 0) errors.technologies = 'At least one technology is required';
    
    // Validate GitHub URL format
    if (newProject.githubLink && !newProject.githubLink.includes('github.com')) {
      errors.githubLink = 'Please enter a valid GitHub URL';
    }
    
    // Validate live link if provided
    if (newProject.liveLink && !newProject.liveLink.startsWith('http')) {
      errors.liveLink = 'Please enter a valid URL starting with http or https';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitProject = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Generate tech icon names based on technologies
    const techIconNames = [];
    newProject.technologies.forEach(tech => {
      const lowerTech = tech.toLowerCase();
      if (lowerTech.includes('react')) techIconNames.push('SiReact');
      else if (lowerTech.includes('node')) techIconNames.push('SiNodedotjs');
      else if (lowerTech.includes('mongo')) techIconNames.push('SiMongodb');
      else if (lowerTech.includes('express')) techIconNames.push('SiExpress');
      else if (lowerTech.includes('javascript')) techIconNames.push('SiJavascript');
      else if (lowerTech.includes('typescript')) techIconNames.push('SiTypescript');
      else if (lowerTech.includes('docker')) techIconNames.push('SiDocker');
      else if (lowerTech.includes('redis')) techIconNames.push('SiRedis');
      else if (lowerTech.includes('postgres')) techIconNames.push('SiPostgresql');
    });

    const projectToAdd = {
      ...newProject,
      id: Date.now(), // Simple ID generation
      longDescription: newProject.description, // Use description for both card and modal
      techIconNames: techIconNames.length > 0 ? techIconNames : ['FiCode']
    };

    const updatedProjects = [projectToAdd, ...projects];
    setProjects(updatedProjects);
    saveProjectsToStorage(updatedProjects);
    
    // Reset form
    setNewProject({
      title: '',
      description: '',
      longDescription: '',
      type: '',
      technologies: [],
      githubLink: '',
      liveLink: '',
      images: [],
      featured: false
    });
    setImageFiles([]);
    setCurrentTech('');
    setFormErrors({});
    setShowAddProjectModal(false);
  };

  const handleCloseAddProjectModal = () => {
    setShowAddProjectModal(false);
    setNewProject({
      title: '',
      description: '',
      longDescription: '',
      type: '',
      technologies: [],
      githubLink: '',
      liveLink: '',
      images: [],
      featured: false
    });
    setImageFiles([]);
    setCurrentTech('');
    setFormErrors({});
  };

  const handleDeleteProject = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = (e) => {
    e.preventDefault();
    if (password === '1598') {
      const updatedProjects = projects.filter(project => project.id !== projectToDelete.id);
      setProjects(updatedProjects);
      saveProjectsToStorage(updatedProjects);
      setShowDeleteModal(false);
      setProjectToDelete(null);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Access denied.');
      setPassword('');
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProjectToDelete(null);
    setPassword('');
    setPasswordError('');
  };

  const handleEditProject = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    setProjectToEdit(project);
    setShowEditPasswordModal(true);
  };

  const handleEditPasswordSubmit = (e) => {
    e.preventDefault();
    if (password === '1598') {
      setShowEditPasswordModal(false);
      // Populate form with existing project data
      setNewProject({
        title: projectToEdit.title,
        description: projectToEdit.description,
        type: projectToEdit.type,
        technologies: [...projectToEdit.technologies],
        githubLink: projectToEdit.githubLink,
        liveLink: projectToEdit.liveLink || '',
        images: [...(projectToEdit.images || [])],
        featured: projectToEdit.featured
      });
      setShowEditModal(true);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Access denied.');
      setPassword('');
    }
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Generate tech icon names based on technologies
    const techIconNames = [];
    newProject.technologies.forEach(tech => {
      const lowerTech = tech.toLowerCase();
      if (lowerTech.includes('react')) techIconNames.push('SiReact');
      else if (lowerTech.includes('node')) techIconNames.push('SiNodedotjs');
      else if (lowerTech.includes('mongo')) techIconNames.push('SiMongodb');
      else if (lowerTech.includes('express')) techIconNames.push('SiExpress');
      else if (lowerTech.includes('javascript')) techIconNames.push('SiJavascript');
      else if (lowerTech.includes('typescript')) techIconNames.push('SiTypescript');
      else if (lowerTech.includes('docker')) techIconNames.push('SiDocker');
      else if (lowerTech.includes('redis')) techIconNames.push('SiRedis');
      else if (lowerTech.includes('postgres')) techIconNames.push('SiPostgresql');
    });

    const updatedProject = {
      ...newProject,
      id: projectToEdit.id, // Keep original ID
      longDescription: newProject.description,
      techIconNames: techIconNames.length > 0 ? techIconNames : ['FiCode']
    };

    const updatedProjects = projects.map(project => 
      project.id === projectToEdit.id ? updatedProject : project
    );
    setProjects(updatedProjects);
    saveProjectsToStorage(updatedProjects);
    
    // Reset form and close modal
    setNewProject({
      title: '',
      description: '',
      longDescription: '',
      type: '',
      technologies: [],
      githubLink: '',
      liveLink: '',
      images: [],
      featured: false
    });
    setImageFiles([]);
    setCurrentTech('');
    setFormErrors({});
    setShowEditModal(false);
    setProjectToEdit(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setProjectToEdit(null);
    setNewProject({
      title: '',
      description: '',
      longDescription: '',
      type: '',
      technologies: [],
      githubLink: '',
      liveLink: '',
      images: [],
      featured: false
    });
    setImageFiles([]);
    setCurrentTech('');
    setFormErrors({});
  };

  const handleCloseEditPasswordModal = () => {
    setShowEditPasswordModal(false);
    setProjectToEdit(null);
    setPassword('');
    setPasswordError('');
  };

  useEffect(() => {
    if (isInView && projectsGridRef.current) {
      const cards = projectsGridRef.current.querySelectorAll(`.${styles.projectCard}`);
      
      if (cards.length > 0) {
        gsap.fromTo(cards, 
          { 
            opacity: 0, 
            y: 50, 
            scale: 0.9 
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out", // Changed from back.out to power2.out
            scrollTrigger: {
              trigger: projectsGridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }
  }, [isInView, filteredProjects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'frontend': return '#61DAFB';
      case 'backend': return '#339933';
      case 'fullstack': return '#667eea';
      default: return '#fff';
    }
  };

  return (
    <section id="projects" className={styles.projects} ref={sectionRef}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 className={styles.title} variants={itemVariants}>
            My Projects
          </motion.h2>
          <motion.div className={styles.titleUnderline} variants={itemVariants}></motion.div>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            A showcase of my latest work and technical expertise
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.controls}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className={styles.filters} variants={itemVariants}>
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                className={`${styles.filterBtn} ${activeFilter === filter.id ? styles.active : ''}`}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <filter.icon className={styles.filterIcon} />
                {filter.label}
              </motion.button>
            ))}
          </motion.div>

          <motion.div className={styles.searchContainer} variants={itemVariants}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </motion.div>

          <motion.button
            className={styles.addProjectBtn}
            onClick={() => setShowPasswordModal(true)}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiPlus className={styles.addIcon} />
            Add New Project
          </motion.button>
        </motion.div>

        <motion.div
          className={styles.projectsGrid}
          ref={projectsGridRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className={`${styles.projectCard} ${project.featured ? styles.featured : ''}`}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.projectType} style={{ color: getTypeColor(project.type) }}>
                    {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                  </div>
                  {project.featured && (
                    <div className={styles.featuredBadge}>Featured</div>
                  )}
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>

                  <div className={styles.techStack}>
                    <div className={styles.techIcons}>
                      {project.techIconNames?.map((iconName, index) => {
                        const Icon = iconMap[iconName] || FiCode;
                        return <Icon key={index} className={styles.techIcon} />;
                      })}
                    </div>
                    <div className={styles.techTags}>
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className={styles.techTag}>{tech}</span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className={styles.techTag}>+{project.technologies.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <motion.a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionBtn}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiGithub />
                  </motion.a>
                  
                  {project.liveLink && (
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionBtn}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiExternalLink />
                    </motion.a>
                  )}

                  <motion.button
                    className={styles.actionBtn}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiEye />
                  </motion.button>
                </div>

                {/* Edit Button */}
                <motion.button
                  className={styles.editBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditProject(project.id);
                  }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <FiEdit />
                </motion.button>

                {/* Delete Button */}
                <motion.button
                  className={styles.deleteBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProject(project.id);
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <FiTrash2 />
                </motion.button>

                {project.images && project.images.length > 0 && (
                  <div className={styles.imagePreview}>
                    <img src={project.images[0]} alt={project.title} />
                    <div className={styles.imageOverlay}>
                      <FiImage />
                      <span>{project.images.length} images</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            className={styles.noResults}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>No projects found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h3>{selectedProject.title}</h3>
                <button 
                  className={styles.closeBtn}
                  onClick={() => setSelectedProject(null)}
                >
                  <FiX />
                </button>
              </div>

              <div className={styles.modalContent}>
                {selectedProject.images && selectedProject.images.length > 0 && (
                  <div className={styles.imageGallery}>
                    {selectedProject.images.map((image, index) => (
                      <img key={index} src={image} alt={`${selectedProject.title} ${index + 1}`} />
                    ))}
                  </div>
                )}

                <div className={styles.projectDetails}>
                  <p className={styles.longDescription}>{selectedProject.longDescription}</p>
                  
                  <div className={styles.techStackFull}>
                    <h4>Technologies Used:</h4>
                    <div className={styles.techList}>
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className={styles.techBadge}>{tech}</span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.modalActions}>
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.modalBtn} ${styles.primaryBtn}`}
                    >
                      <FiGithub />
                      View Code
                    </a>
                    {selectedProject.liveLink && (
                      <a
                        href={selectedProject.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.modalBtn} ${styles.secondaryBtn}`}
                      >
                        <FiExternalLink />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h3>Enter Password</h3>
                <button 
                  className={styles.closeBtn}
                  onClick={() => setShowPasswordModal(false)}
                >
                  <FiX />
                </button>
              </div>

                             <div className={styles.modalContent}>
                 <div className={styles.passwordMessage}>
                   <FiLock className={styles.lockIcon} />
                   <h4>Protected Access</h4>
                   <p>Only the owner of this portfolio can add new projects. Please enter the password to continue.</p>
                 </div>
                <form onSubmit={handlePasswordSubmit}>
                  <div className={styles.inputGroup}>
                    <FiLock className={styles.inputIcon} />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={styles.inputField}
                      required
                    />
                  </div>
                  {passwordError && (
                    <div className={styles.errorMessage}>
                      <FiAlertCircle /> {passwordError}
                    </div>
                  )}
                  <motion.button
                    type="submit"
                    className={`${styles.modalBtn} ${styles.primaryBtn}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiCheck />
                    Submit
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add New Project Modal */}
      <AnimatePresence>
        {showAddProjectModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseAddProjectModal}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h3>Add New Project</h3>
                <button 
                  className={styles.closeBtn}
                  onClick={handleCloseAddProjectModal}
                >
                  <FiX />
                </button>
              </div>

              <div className={styles.modalContent}>
                <form onSubmit={handleSubmitProject}>
                  <div className={styles.inputGroup}>
                    <FiCode className={styles.inputIcon} />
                    <input
                      type="text"
                      placeholder="Project Title"
                      value={newProject.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className={styles.inputField}
                      required
                    />
                  </div>
                  {formErrors.title && (
                    <div className={styles.errorMessage}>
                      <FiAlertCircle /> {formErrors.title}
                    </div>
                  )}

                  <div className={styles.inputGroup}>
                    <FiCode className={styles.inputIcon} />
                    <input
                      type="text"
                      placeholder="Project Description"
                      value={newProject.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className={styles.inputField}
                      required
                    />
                  </div>
                  {formErrors.description && (
                    <div className={styles.errorMessage}>
                      <FiAlertCircle /> {formErrors.description}
                    </div>
                  )}

                  <div className={styles.inputGroup}>
                    <FiCode className={styles.inputIcon} />
                    <input
                      type="text"
                      placeholder="Project Type (e.g., frontend, backend, fullstack)"
                      value={newProject.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className={styles.inputField}
                      required
                    />
                  </div>
                  {formErrors.type && (
                    <div className={styles.errorMessage}>
                      <FiAlertCircle /> {formErrors.type}
                    </div>
                  )}

                  <div className={styles.inputGroup}>
                    <FiGithub className={styles.inputIcon} />
                    <input
                      type="url"
                      placeholder="GitHub Repository URL"
                      value={newProject.githubLink}
                      onChange={(e) => handleInputChange('githubLink', e.target.value)}
                      className={styles.inputField}
                      required
                    />
                  </div>
                  {formErrors.githubLink && (
                    <div className={styles.errorMessage}>
                      <FiAlertCircle /> {formErrors.githubLink}
                    </div>
                  )}

                  <div className={styles.inputGroup}>
                    <FiExternalLink className={styles.inputIcon} />
                    <input
                      type="url"
                      placeholder="Live Demo URL (optional)"
                      value={newProject.liveLink}
                      onChange={(e) => handleInputChange('liveLink', e.target.value)}
                      className={styles.inputField}
                    />
                  </div>
                  {formErrors.liveLink && (
                    <div className={styles.errorMessage}>
                      <FiAlertCircle /> {formErrors.liveLink}
                    </div>
                  )}

                  <div className={styles.inputGroup}>
                    <FiCode className={styles.inputIcon} />
                    <input
                      type="text"
                      placeholder="Add Technology (e.g., React, Node.js) - Press Enter to add"
                      value={currentTech}
                      onChange={(e) => setCurrentTech(e.target.value)}
                      className={styles.inputField}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTechnology(e)}
                      onBlur={handleAddTechnology}
                    />
                  </div>

                                     <div className={styles.techListContainer}>
                     {newProject.technologies.map((tech, index) => (
                       <span key={index} className={styles.techBadgeForm}>
                         {tech}
                         <button 
                           type="button" 
                           className={styles.removeTechBtn}
                           onClick={() => handleRemoveTechnology(tech)}
                         >
                           <FiTrash2 />
                         </button>
                       </span>
                     ))}
                   </div>
                  {formErrors.technologies && (
                    <div className={styles.errorMessage}>
                      <FiAlertCircle /> {formErrors.technologies}
                    </div>
                  )}

                  <div className={styles.fileUploadSection}>
                    <label className={styles.fileUploadLabel}>
                      <FiUpload className={styles.uploadIcon} />
                      <span className={styles.uploadText}>
                        <strong>Upload Project Images</strong>
                        <small>Click to browse or drag & drop images here</small>
                      </span>
                      <input
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                        className={styles.hiddenFileInput}
                        accept="image/*"
                      />
                    </label>
                    <div className={styles.uploadHint}>
                      PNG, JPG, GIF up to 10MB each • Optional for all project types
                    </div>
                  </div>
                                     <div className={styles.imagePreviewContainer}>
                     {newProject.images.map((imageUrl, index) => (
                       <div key={index} className={styles.imagePreviewItem}>
                         <img src={imageUrl} alt={`Preview ${index + 1}`} />
                         <button 
                           type="button" 
                           className={styles.removeImageBtn}
                           onClick={() => handleRemoveImage(index)}
                         >
                           <FiTrash2 />
                         </button>
                       </div>
                     ))}
                   </div>

                  <div className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      id="featured"
                      checked={newProject.featured}
                      onChange={(e) => setNewProject(prev => ({ ...prev, featured: e.target.checked }))}
                    />
                    <label htmlFor="featured">Mark as Featured</label>
                  </div>

                  

                                     <motion.button
                     type="submit"
                     className={`${styles.modalBtn} ${styles.primaryBtn} ${styles.addProjectSubmitBtn}`}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.98 }}
                   >
                     <FiCheck />
                     <span>Add Project</span>
                   </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && projectToDelete && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseDeleteModal}
          >
            <motion.div
              className={`${styles.modal} ${styles.deleteModal}`}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h3>Delete Project</h3>
                <button 
                  className={styles.closeBtn}
                  onClick={handleCloseDeleteModal}
                >
                  <FiX />
                </button>
              </div>

              <div className={styles.modalContent}>
                <div className={styles.deleteWarning}>
                  <FiAlertCircle className={styles.warningIcon} />
                  <h4>⚠️ Danger Zone</h4>
                  <p>You are about to permanently delete this project:</p>
                  <div className={styles.projectToDelete}>
                    <strong>"{projectToDelete.title}"</strong>
                    <span>{projectToDelete.type} project</span>
                  </div>
                  <p className={styles.warningText}>
                    This action cannot be undone. All project data, images, and information will be permanently lost.
                  </p>
                </div>

                <div className={styles.passwordSection}>
                  <div className={styles.passwordMessage}>
                    <FiLock className={styles.lockIcon} />
                    <h4>Enter Password to Confirm</h4>
                    <p>Only the owner of this portfolio can delete projects. Please enter the password to continue.</p>
                  </div>

                  <form onSubmit={handleConfirmDelete}>
                    <div className={styles.inputGroup}>
                      <FiLock className={styles.inputIcon} />
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.inputField}
                        required
                      />
                    </div>
                    {passwordError && (
                      <div className={styles.errorMessage}>
                        <FiAlertCircle /> {passwordError}
                      </div>
                    )}

                    <div className={styles.deleteModalActions}>
                      <motion.button
                        type="button"
                        onClick={handleCloseDeleteModal}
                        className={`${styles.modalBtn} ${styles.cancelBtn}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiX />
                        <span>Cancel</span>
                      </motion.button>

                      <motion.button
                        type="submit"
                        className={`${styles.modalBtn} ${styles.deleteConfirmBtn}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiTrash2 />
                        <span>Delete Forever</span>
                      </motion.button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Password Modal */}
      <AnimatePresence>
        {showEditPasswordModal && projectToEdit && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseEditPasswordModal}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h3>Edit Project</h3>
                <button 
                  className={styles.closeBtn}
                  onClick={handleCloseEditPasswordModal}
                >
                  <FiX />
                </button>
              </div>

              <div className={styles.modalContent}>
                <div className={styles.editMessage}>
                  <FiEdit className={styles.editIcon} />
                  <h4>Edit Project Access</h4>
                  <p>You are about to edit this project:</p>
                  <div className={styles.projectToEdit}>
                    <strong>"{projectToEdit.title}"</strong>
                    <span>{projectToEdit.type} project</span>
                  </div>
                  <p>Only the owner of this portfolio can edit projects. Please enter the password to continue.</p>
                </div>

                <form onSubmit={handleEditPasswordSubmit}>
                  <div className={styles.inputGroup}>
                    <FiLock className={styles.inputIcon} />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={styles.inputField}
                      required
                    />
                  </div>
                  {passwordError && (
                    <div className={styles.errorMessage}>
                      <FiAlertCircle /> {passwordError}
                    </div>
                  )}
                  <motion.button
                    type="submit"
                    className={`${styles.modalBtn} ${styles.primaryBtn}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiCheck />
                    Continue to Edit
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Project Modal */}
      <AnimatePresence>
        {showEditModal && projectToEdit && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseEditModal}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h3>Edit Project</h3>
                <button 
                  className={styles.closeBtn}
                  onClick={handleCloseEditModal}
                >
                  <FiX />
                </button>
              </div>

              <div className={styles.modalContent}>
                <form onSubmit={handleUpdateProject}>
                  <div className={styles.inputGroup}>
                    <FiCode className={styles.inputIcon} />
                    <input
                      type="text"
                      placeholder="Project Title"
                      value={newProject.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className={styles.inputField}
                      required
                    />
                  </div>
                  {formErrors.title && (
                    <div className={styles.errorMessage}>
                      <FiAlertCircle /> {formErrors.title}
                    </div>
                  )}

                  <div className={styles.inputGroup}>
                    <FiCode className={styles.inputIcon} />
                    <input
                      type="text"
                      placeholder="Project Description"
                      value={newProject.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className={styles.inputField}
                      required
                    />
                  </div>
                  {formErrors.description && (
                    <div className={styles.errorMessage}>
                      <FiAlertCircle /> {formErrors.description}
                    </div>
                  )}

                  <div className={styles.inputGroup}>
                    <FiCode className={styles.inputIcon} />
                    <input
                      type="text"
                      placeholder="Project Type (e.g., frontend, backend, fullstack)"
                      value={newProject.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className={styles.inputField}
                      required
                    />
                  </div>
                  {formErrors.type && (
                    <div className={styles.errorMessage}>
                      <FiAlertCircle /> {formErrors.type}
                    </div>
                  )}

                  <div className={styles.inputGroup}>
                    <FiGithub className={styles.inputIcon} />
                    <input
                      type="url"
                      placeholder="GitHub Repository URL"
                      value={newProject.githubLink}
                      onChange={(e) => handleInputChange('githubLink', e.target.value)}
                      className={styles.inputField}
                      required
                    />
                  </div>
                  {formErrors.githubLink && (
                    <div className={styles.errorMessage}>
                      <FiAlertCircle /> {formErrors.githubLink}
                    </div>
                  )}

                  <div className={styles.inputGroup}>
                    <FiExternalLink className={styles.inputIcon} />
                    <input
                      type="url"
                      placeholder="Live Demo URL (optional)"
                      value={newProject.liveLink}
                      onChange={(e) => handleInputChange('liveLink', e.target.value)}
                      className={styles.inputField}
                    />
                  </div>
                  {formErrors.liveLink && (
                    <div className={styles.errorMessage}>
                      <FiAlertCircle /> {formErrors.liveLink}
                    </div>
                  )}

                  <div className={styles.inputGroup}>
                    <FiCode className={styles.inputIcon} />
                    <input
                      type="text"
                      placeholder="Add Technology (e.g., React, Node.js) - Press Enter to add"
                      value={currentTech}
                      onChange={(e) => setCurrentTech(e.target.value)}
                      className={styles.inputField}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTechnology(e)}
                      onBlur={handleAddTechnology}
                    />
                  </div>

                  <div className={styles.techListContainer}>
                    {newProject.technologies.map((tech, index) => (
                      <span key={index} className={styles.techBadgeForm}>
                        {tech}
                        <button 
                          type="button" 
                          className={styles.removeTechBtn}
                          onClick={() => handleRemoveTechnology(tech)}
                        >
                          <FiTrash2 />
                        </button>
                      </span>
                    ))}
                  </div>
                  {formErrors.technologies && (
                    <div className={styles.errorMessage}>
                      <FiAlertCircle /> {formErrors.technologies}
                    </div>
                  )}

                  <div className={styles.fileUploadSection}>
                    <label className={styles.fileUploadLabel}>
                      <FiUpload className={styles.uploadIcon} />
                      <span className={styles.uploadText}>
                        <strong>Upload Project Images</strong>
                        <small>Click to browse or drag & drop images here</small>
                      </span>
                      <input
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                        className={styles.hiddenFileInput}
                        accept="image/*"
                      />
                    </label>
                    <div className={styles.uploadHint}>
                      PNG, JPG, GIF up to 10MB each • Optional for all project types
                    </div>
                  </div>
                  <div className={styles.imagePreviewContainer}>
                    {newProject.images.map((imageUrl, index) => (
                      <div key={index} className={styles.imagePreviewItem}>
                        <img src={imageUrl} alt={`Preview ${index + 1}`} />
                        <button 
                          type="button" 
                          className={styles.removeImageBtn}
                          onClick={() => handleRemoveImage(index)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      id="editFeatured"
                      checked={newProject.featured}
                      onChange={(e) => setNewProject(prev => ({ ...prev, featured: e.target.checked }))}
                    />
                    <label htmlFor="editFeatured">Mark as Featured</label>
                  </div>

                  <motion.button
                    type="submit"
                    className={`${styles.modalBtn} ${styles.primaryBtn} ${styles.addProjectSubmitBtn}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiCheck />
                    <span>Update Project</span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects; 