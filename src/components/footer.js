import React from "react"

import styles from "./footer.module.scss"

import lrLogo from "../../static/logo-new.svg"

const Footer = ({ menuLinks, socialLinks, postPage }) => {
  return (
    <section class={styles.footerWrap}>
      <div>
        <div class={styles.lrContent}>
          <img src={lrLogo} alt={"lr-logo"} />
          <p>
            LoginRadius empowers businesses to deliver a delightful customer
            experience and win customer trust. Using the LoginRadius Identity
            Platform, companies can offer a streamlined login process while
            protecting customer accounts and complying with data privacy
            regulations.
          </p>
          <nav class={styles.social}>
            <ul>
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.slug} target="_blank" rel="noopener noreferrer">
                    <img
                      src={require(`../../static/${link.name}.svg`)}
                      width="40px"
                      height="40px"
                      alt={link.name}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.copyrightwrap}>
          <div className={styles.copyright}>
            © Copyright {new Date().getFullYear()}
            {`, `}
            <a
              style={{ boxShadow: "none" }}
              href={"https://www.loginradius.com"}
              target="_blank"
              rel="noopener noreferrer"
            >
              LoginRadius Inc.
            </a>
          </div>
          <nav className={styles.menuLinks}>
            <ul>
              {menuLinks.map((link, index) => (
                <li>
                  <a
                    href={link.slug}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  )
}

export default Footer
