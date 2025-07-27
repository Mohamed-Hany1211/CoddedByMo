import React, { useState, useRef, useEffect } from 'react';
import { 
  FiMail, FiPhone, FiMapPin, FiSend, FiUser, FiMessageSquare,
  FiLinkedin, FiInstagram 
} from 'react-icons/fi';
import styles from './Contact.module.css';

const Contact = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Using Formsubmit.co - a free form backend that forwards to email
      const response = await fetch('https://formsubmit.co/m.serag1905@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Portfolio Contact: ${formData.subject}`,
          message: formData.message,
          _next: window.location.origin,
          _captcha: false,
          _template: 'table'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback to mailto if the service fails
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
      const body = encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n` +
        `Subject: ${formData.subject}\n\n` +
        `Message:\n${formData.message}\n\n` +
        `---\nSent from Mohamed Hany's Portfolio Website`
      );
      
      const mailtoLink = `mailto:m.serag1905@gmail.com?subject=${subject}&body=${body}`;
      window.open(mailtoLink, '_blank');
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'm.serag1905@gmail.com',
      link: 'mailto:m.serag1905@gmail.com'
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+201010356966',
      link: 'tel:+201010356966'
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Giza, Egypt',
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: FiLinkedin,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mohamed-hany-bb2770228/',
      color: '#0077B5'
    },
    {
      icon: FiInstagram,
      label: 'Instagram',
      url: 'https://www.instagram.com/x129h?igsh=ZTVsNjRlZW5hd3ow',
      color: '#E4405F'
    }
  ];

  return (
    <section id="contact" className={styles.contact} ref={sectionRef}>
      {/* Floating Background Elements */}
      <div className={styles.floatingShape1} />
      <div className={styles.floatingShape2} />
      <div className={styles.floatingShape3} />

      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>Get In Touch</h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.subtitle}>
            Have a project in mind? Let's work together to bring your ideas to life!
          </p>
        </div>

        <div className={styles.content}>
          <div className={`${styles.contactInfo} ${isVisible ? styles.visible : ''}`}>
            <h3 className={styles.sectionTitle}>
              Contact Information
            </h3>
            
            <div className={styles.infoCards}>
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className={styles.infoCard}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={styles.iconContainer}>
                    <info.icon className={styles.infoIcon} />
                  </div>
                  <div className={styles.infoContent}>
                    <h4>{info.label}</h4>
                    {info.link ? (
                      <a href={info.link} className={styles.infoLink}>
                        {info.value}
                      </a>
                    ) : (
                      <p>{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.socialSection}>
              <h4>Follow Me</h4>
              <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    style={{ '--social-color': social.color }}
                  >
                    <social.icon />
                    <span className={styles.socialTooltip}>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className={`${styles.formSection} ${isVisible ? styles.visible : ''}`}>
            <h3 className={styles.sectionTitle}>
              Send a Message
            </h3>

            <form 
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <FiUser className={styles.inputIcon} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <FiMail className={styles.inputIcon} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <FiMessageSquare className={styles.inputIcon} />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={`${styles.input} ${styles.textarea}`}
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className={styles.spinner} />
                ) : (
                  <>
                    <FiSend className={styles.btnIcon} />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus && (
                <div
                  className={`${styles.statusMessage} ${
                    submitStatus === 'success' ? styles.success : styles.error
                  }`}
                >
                  {submitStatus === 'success' 
                    ? '✅ Message sent successfully! I\'ll get back to you soon.'
                    : '❌ Failed to send message. Please try again or contact me directly.'
                  }
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 