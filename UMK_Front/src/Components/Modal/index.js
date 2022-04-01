// @src/components/Modal/index.js

import React, { useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = ({ setIsOpen, title, children, isOpen }) => {
  useEffect(() => {
    // if (isOpen) 
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{title}</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <i className="fas fa-close"></i>
          </button>
          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
