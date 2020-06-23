import React from "react"
import styles from "./freeTrial.module.scss"
// import { OutboundLink } from "gatsby-plugin-google-analytics"
import ReactGA from 'react-ga'

const logger = function() {
  ReactGA.event({
    category: 'Signup',
    action: 'User clicked on Free signup button',
    label: 'Signup'
  })
}

const FreeTrial = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2> Authenticate Your App</h2>
        <div className={styles.heading}>
          <p>
            {" "}
            <span className={styles.number}>$0</span>/ month{" "}
          </p>
          <a
            className={styles.button}
            href={`https://accounts.loginradius.com/auth.aspx?return_url=https://dashboard.loginradius.com/login`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={logger}
          >
            {"Free Sign Up"}
          </a>
        </div>
      </div>
      <div className={styles.lists}>
        <ul>
          <li> 5,000 MAU </li>
          <li>1 Web or mobile app </li>
          <li>Standard login </li>
          <li>3 Social Login Providers </li>
          <li>Transactional Email Template </li>
          <li>Customizable Login Interfaces </li>
        </ul>
      </div>
    </div>
  )
}

export default FreeTrial
