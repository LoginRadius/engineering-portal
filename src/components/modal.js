import React from "react"
import styles from "./modal.module.scss"
const Modal = ({}) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalBody}>
        <a href="#" className={styles.modalClose}>
          <svg
            width="512"
            height="512"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M368 144L144 368M368 368L144 144L368 368Z"
              stroke="#B3B6B8"
              stroke-width="32"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
        <div className={styles.modalInner}>
          <h2 className={styles.modalHeader}>Subscribe To Our Blog</h2>
          <div className={styles.modalContent}>
            <p>Select as many topics as you like:</p>
            <ul className={`${styles.unstyled} ${styles.centered}`}>
              <li>
                <input
                  className={styles.styledCheckbox}
                  id="engineering"
                  type="checkbox"
                  value="value1"
                />
                <label for="engineering">Engineering</label>
              </li>
              <li>
                <input
                  className={styles.styledCheckbox}
                  id="identity"
                  type="checkbox"
                  value="value2"
                />
                <label for="identity">Identity</label>
              </li>
              <li>
                <input
                  className={styles.styledCheckbox}
                  id="growth"
                  type="checkbox"
                  value="value3"
                />
                <label for="growth">Growth</label>
              </li>
            </ul>
          </div>
          <div className={`${styles.modalFooter} d-flex`}>
            <a href="#" className="btn btn-primary">
              Subscribe
            </a>
            <a href="#" className="btn btn-secondary">
              Cancel
            </a>
          </div>
        </div>
      </div>
      <div className={styles.overlay}></div>
    </div>
  )
}

export default Modal
