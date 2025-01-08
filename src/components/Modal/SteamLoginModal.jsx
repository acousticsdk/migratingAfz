import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import styles from './Modal.module.css';

function SteamLoginModal({ isOpen, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Preload video when modal is opened
    if (isOpen && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(error => {
        console.log('Auto-play prevented:', error);
      });
    }
  }, [isOpen]);

  // Preload video metadata when component mounts
  useEffect(() => {
    const video = new Image();
    video.src = '/assets/steam.webm';
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.modalTitle}>Где взять логин?</h2>
      <p className={styles.modalText}>
        Обратите внимание! Логин, это то, что Вы указываете при входе в Steam. Если Вы
        укажете неверный логин, то средства уйдут другому пользователю.
      </p>
      <video
        ref={videoRef}
        className={styles.modalVideo}
        loop
        muted
        playsInline
        preload="metadata"
        src="/assets/steam.webm"
      >
        <source src="/assets/steam.webm" type="video/webm" />
      </video>
      <button className={styles.closeButton} onClick={onClose}>
        Понятно
      </button>
    </Modal>
  );
}

SteamLoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default SteamLoginModal;