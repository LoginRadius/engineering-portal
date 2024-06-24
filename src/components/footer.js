import React from "react"

import styles from "./footer.module.scss"

import LogoLr from "../../static/logo.svg"
import Modal from "./modal"
const Footer = ({ menuLinks, socialLinks, postPage }) => {
  return (
    <React.Fragment>
      <section className={styles.footerWrap}>
        <div>
          <div className={styles.lrContent}>
            <div className={styles.links}>
              <div>
                <h4>CIAM Platform</h4>
                <ul className={styles.list}>
                  <li>
                    <a href="https://www.loginradius.com/authentication/">Authentication</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/single-sign-on/">Single Sign-on</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/directory-service/">Directory Service</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/data-governance/">Data Governance</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/user-management/">User Management</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/cloud-integrations/">Cloud Integrations</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4>Features</h4>
                <ul className={styles.list}>
                  <li>
                    <a href="https://www.loginradius.com/single-sign-on/">Single Sign-on</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/federated-sso/">Federated SSO</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/passwordless-login/">Passwordless Login</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/multi-factor-authentication/">Multi-Factor Authentication</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/gdpr-and-privacy/">GDPR and Privacy</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/consent-preference-management/">Consent Management</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/cloud-integrations/">Cloud Integrations</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4>Industries</h4>
                <ul className={styles.list}>
                  <li>
                    <a href="https://www.loginradius.com/industry-media-and-communications/">Media and Communications</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/industry-government/">Government</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/industry-retail-and-ecommerce/">Retail and Ecommerce</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/industry-consumer-brands/">Consumer Brands</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/industry-travel-and-hospitality/">Travel and Hospitality</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/industry-finance-and-banking/">Finance and Banking</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/industry-healthcare/">Healthcare</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4>Developers</h4>
                <ul className={styles.list}>
                  <li>
                    <a href="https://www.loginradius.com/developers/">Overview</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/docs/">Developer Docs</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/docs/api/v2/getting-started/introduction/">API References</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/docs/libraries/js-libraries/getting-started/">JS Libraries</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/docs/libraries/sdk-libraries/overview/">Web SDK Libraries</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/docs/libraries/mobile-sdk-libraries/overview/">Mobile SDK Libraries</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/security/">Security</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/scalability/">Scalability</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/blog/">Engineering blog</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4>About</h4>
                <ul className={styles.list}>
                  <li>
                    <a href="https://www.loginradius.com/company/">Company</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/customers/">Customers</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/partner-with-us/">Partners</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/leadership/">Leadership</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/press/" target="_blank">Press</a>
                  </li>
                  <li>
                    <a href="https://loginradius.org/" target="_blank">Foundation</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/careers/">Careers</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/legal/">Legal</a>
                  </li>
                  <li>
                    <a href="https://www.loginradius.com/contact-us/">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.compliances}>
              <div className={styles.bar}>
                <a href="https://www.loginradius.com/compliance-list/iso-iec-270012013/">
                  <img alt="ISO 27001" src="https://www.loginradius.com/wp-content/themes/login-radius/images/ui-elements/footer-compliance-06.png" />
                </a>
                <a href="https://www.loginradius.com/compliance-list/soc-2-type-ii/">
                  <img alt="SOC2 logo" src="https://www.loginradius.com/wp-content/themes/login-radius/images/ui-elements/footer-compliance-02.png" />
                </a>
                <a href="https://www.loginradius.com/compliance-list/iso-iec-270172015/">
                  <img alt="ISO 27017" src="https://www.loginradius.com/wp-content/themes/login-radius/images/ui-elements/footer-compliance-08.png" />
                </a>
                <a href="https://www.loginradius.com/compliance-list/iso-iec-270182019/">
                  <img alt="ISO 27018" src="https://www.loginradius.com/wp-content/themes/login-radius/images/ui-elements/footer-compliance-07.png" />
                </a>
                <a href="https://www.loginradius.com/compliance-list/nist-cybersecurity-framework/">
                  <img alt="NIST" src="https://www.loginradius.com/wp-content/themes/login-radius/images/ui-elements/footer-compliance-09.png" />
                </a>
                <a href="https://www.loginradius.com/compliance-list/gdpr-compliant/">
                  <img alt="GDPR logo" src="https://www.loginradius.com/wp-content/themes/login-radius/images/ui-elements/footer-compliance-01.png" />
                </a>
                <a href="https://www.loginradius.com/compliance-list/csa-star-ccm/">
                  <img alt="CSA Star CCM logo" src="https://www.loginradius.com/wp-content/themes/login-radius/images/ui-elements/footer-compliance-05.png" />
                </a>
              </div>
            </div>
            <div className={styles.copyrightwrap}>
              <p className={styles.copyright}>©Copyright 2013-{new Date().getFullYear()}, LoginRadius Inc.
                <nav className={styles.menuLinks}>
                  <ul>
                    {menuLinks.map((link, index) => (
                      <li key={index}>
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
              </p>
              <nav className={styles.social}>
                <ul>
                  {socialLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.slug}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={require(`../../static/${link.name}.svg`)}
                          width="38px"
                          height="38px"
                          alt={link.name}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <Modal></Modal>
    </React.Fragment>
  )
}

export default Footer
