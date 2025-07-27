import React, { useEffect, useState } from 'react';
import styles from './Loading.module.css';

const Loading = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Ensure body is hidden during loading
    document.body.style.overflow = 'hidden';
    
    // Faster loading simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsComplete(true);
            // Restore body scroll after animation
            setTimeout(() => {
              document.body.style.overflow = 'unset';
              onComplete();
            }, 800); // Wait for exit animation
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5; // Controlled progress
      });
    }, 150); // Slightly slower for better UX

    return () => {
      clearInterval(progressInterval);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <div className={`${styles.loading} ${isComplete ? styles.exit : ''}`}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <div className={styles.logoInner}>
            <span>MH</span>
          </div>
          <div className={styles.logoGlow}></div>
        </div>

        <div className={styles.text}>
          <h1>Mohamed Hany</h1>
          <p>Full Stack Web Developer</p>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <span className={styles.progressText}>{Math.floor(progress)}%</span>
        </div>
      </div>

      {/* Animated background elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.particle1}></div>
        <div className={styles.particle2}></div>
        <div className={styles.particle3}></div>
        <div className={styles.particle4}></div>
        <div className={styles.particle5}></div>
      </div>
    </div>
  );
};

export default Loading; 