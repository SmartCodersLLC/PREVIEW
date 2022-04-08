// @src/components/Modal/index.js

import React, { useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = ({ setIsOpen, title, children, isOpen, id }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => (document.body.style.overflow = "unset");
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal} id={id}> 
          <div className={styles.modalHeader}>
            <h5 className={`${styles.heading} text-center`}>{title}</h5>
          </div>
          <button className={`${styles.closeBtn} no-print`} onClick={() => setIsOpen(false)}>
            <i className="fas fa-close"></i>
          </button>
          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
