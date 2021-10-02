import React from "react"
import * as styles from "./static.module.scss"

const Static = (props) => {
  return (
    <section
      className={styles.mainContainer}>
        <div className={styles.imageContainer}>
          <img src={props.image} className={styles.customImg} alt="Logo" />
        </div>
        {props.children}
    </section>
  )
}

export default Static;
