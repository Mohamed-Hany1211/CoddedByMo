import React from 'react';
import { FiHeart } from 'react-icons/fi';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3>Mohamed Hany</h3>
            <p>Full Stack Web Developer</p>
          </div>

          <div className={styles.copyright}>
            <p>
              © {currentYear} Mohamed Hany. Made with{' '}
              <span className={styles.heart}>
                <FiHeart />
              </span>{' '}
              in Egypt
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 