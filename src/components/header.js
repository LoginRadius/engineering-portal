import { Link } from "gatsby"
import React, { useCallback, useEffect, useState } from "react"
import lrLogoAdj from "../../static/logo.svg"
import lrLogoBlogText from "../../static/lr-logo-blog-text.svg"
import headerStyles from "./header.module.scss"
import searchStyles from "./search.module.scss"
import Search from "./search"

const Header = ({ searchIndex, pathname, type }) => {
  const [showMenu, toggleMenu] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(0)
  const [scrollClass, setClass] = useState("")
  const [backdrop, showBackdrop] = useState(null)

  const handleNavigation = useCallback(e => {
    const currWin = e.currentTarget
    if (currWin.scrollY < 1) {
      setClass("")
    } else if (currWin.scrollY > 1) {
      setClass("scrollUp")
    }
  })

  const toggleNavigation = menuNumber => {
    if (isMenuOpen === menuNumber) {
      setIsMenuOpen(0)
    } else if ([1, 2, 3, 4].indexOf(menuNumber) !== -1) {
      setIsMenuOpen(menuNumber)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleNavigation)

    return () => {
      window.removeEventListener("scroll", handleNavigation)
    }
  }, [handleNavigation])

  return (
    <>
      <div
        className={`${headerStyles.header} ${
          showMenu === null
            ? ""
            : showMenu === true
            ? headerStyles.open
            : headerStyles.close
        }`}
      >
        <div
          className={`${headerStyles.hamburger} ${
            showMenu ? headerStyles.active : ""
          }`}
          onClick={() => {
            toggleMenu(!showMenu)
            if (showMenu) {
              document.body.classList.add("menu-close")
              document.body.classList.remove("menu-open")
              setTimeout(() => {
                showBackdrop(!showMenu)
              }, 300)
            } else {
              document.body.classList.add("menu-open")
              document.body.classList.remove("menu-close")
              showBackdrop(!showMenu)
            }
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <section className={headerStyles.hellobar}>
          <div className="content">
            <div className={headerStyles.hellobartext}>
              <span className={headerStyles.kcicon}>
                <img src="https://www.loginradius.com/wp-content/uploads/2024/07/kc-icon-tran.png" />
                2024 KuppingerCole Leadership Compass recognizes LoginRadius as
                Overall Leader.
              </span>
              <a href="https://www.loginradius.com/resource/analyst-report/kuppingercole-names-loginradius-top-ciam-platform-2024/">
                Learn more
              </a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 -960 960 960"
                fill="#ffffff"
              >
                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
              </svg>
            </div>
          </div>
        </section>
        {/* <Link className={headerStyles.logo} to={"https://www.loginradius.com/"}>
          <img src={LogoLr} alt={`logo`} className={headerStyles.lrLogo} />
        </Link> */}
        <div className={headerStyles.logo}>
          <Link target="_blank" to={"https://www.loginradius.com/"}>
            <img
              src={lrLogoAdj}
              alt={`loginradius`}
              className={headerStyles.lrLogo}
            />
          </Link>
        </div>
        <div
          className={`${headerStyles.primarymenu} ${
            showMenu === null
              ? ""
              : showMenu === true
              ? headerStyles.open
              : headerStyles.close
          }`}
        >
          <Link
            to="#"
            onClick={() => {
              toggleNavigation(1)
            }}
          >
            <span className="text">
              CIAM Platform{" "}
              <i
                className={`${headerStyles.slideoutpartarrow} ${
                  isMenuOpen === 1
                    ? headerStyles.slideoutpartarrowup
                    : headerStyles.slideoutpartarrowdown
                }`}
              ></i>
            </span>
            <div
              id="ciam-platform"
              className={
                headerStyles.slideoutpart +
                (isMenuOpen === 1 ? " " + headerStyles.slideoutpartshow : "")
              }
            >
              <div className={headerStyles.columns}>
                <div>
                  <h4>
                    <span
                      style={{
                        backgroundImage:
                          "url(https://www.loginradius.com/wp-content/themes/login-radius/images/v5-megamenu/ciam-platform.svg)",
                      }}
                    ></span>
                    CIAM Platform
                  </h4>
                  <ul>
                    <li>
                      <Link to="https://www.loginradius.com/authentication/">
                        Authentication
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/single-sign-on/">
                        Single Sign-on
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/user-management/">
                        User Management
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/directory-service/">
                        Directory Service
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/data-governance/">
                        Data Governance
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/customer-insights/">
                        Customer Insights
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={headerStyles.columns}>
                <div>
                  <h4>
                    <span
                      style={{
                        backgroundImage:
                          "url(https://www.loginradius.com/wp-content/themes/login-radius/images/v5-megamenu/features.svg)",
                      }}
                    ></span>
                    Features
                  </h4>
                  <ul>
                    <li>
                      <Link to="https://www.loginradius.com/web-and-mobile-sso/">
                        Web and Mobile SSO
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/federated-sso/">
                        Federated SSO
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/passwordless-login/">
                        Passwordless Login
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/social-login/">
                        Social Login
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/multi-factor-authentication/">
                        Multi-Factor Authentication
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/gdpr-and-privacy/">
                        GDPR and Privacy
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/consent-preference-management/">
                        Consent Management
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/cloud-integrations/">
                        Cloud Integrations
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={headerStyles.columns}>
                <div>
                  <h4>
                    <span
                      style={{
                        backgroundImage:
                          "url(https://www.loginradius.com/wp-content/themes/login-radius/images/v5-megamenu/deployment.svg)",
                      }}
                    ></span>
                    Deployment
                  </h4>
                  <ul>
                    <li>
                      <Link to="https://www.loginradius.com/multi-tenant-cloud/">
                        Multi-Tenant Cloud
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/private-cloud/">
                        Private Cloud
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/on-premises-deployment/">
                        On-Premises Deployment
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className={headerStyles.logos}>
                  <Link to="">
                    <img src="https://www.loginradius.com/wp-content/themes/login-radius/images/v5-megamenu/logos-developers.svg" />
                  </Link>
                </div>
              </div>
            </div>
          </Link>
          <Link
            to="#"
            onClick={() => {
              toggleNavigation(2)
            }}
          >
            <span className="text">
              Solutions{" "}
              <i
                className={`${headerStyles.slideoutpartarrow} ${
                  isMenuOpen === 2
                    ? headerStyles.slideoutpartarrowup
                    : headerStyles.slideoutpartarrowdown
                }`}
              ></i>
            </span>
            <div
              id="solutions"
              className={
                headerStyles.slideoutpart +
                (isMenuOpen === 2 ? " " + headerStyles.slideoutpartshow : "")
              }
            >
              <div className={headerStyles.columns}>
                <div>
                  <h4>
                    <span
                      style={{
                        backgroundImage:
                          "url(https://www.loginradius.com/wp-content/themes/login-radius/images/v5-megamenu/industries.svg)",
                      }}
                    ></span>
                    Industries
                  </h4>
                  <ul>
                    <li>
                      <Link to="https://www.loginradius.com/industry-media-and-communications/">
                        Media and Communications
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/industry-government/">
                        Government
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/industry-retail-and-ecommerce/">
                        Retail and Ecommerce
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/industry-consumer-brands/">
                        Consumer Brands
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/industry-travel-and-hospitality/">
                        Travel and Hospitality
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/industry-finance-and-banking/">
                        Finance and Banking
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/industry-healthcare/">
                        Healthcare
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={headerStyles.columns}>
                <div>
                  <h4>
                    <span
                      style={{
                        backgroundImage:
                          "url(https://www.loginradius.com/wp-content/themes/login-radius/images/v5-megamenu/use-cases.svg)",
                      }}
                    ></span>
                    Use Cases
                  </h4>
                  <ul>
                    <li>
                      <Link to="https://www.loginradius.com/b2c-identity/">
                        B2C Identity
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/b2b-identity/">
                        B2B Identity
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={headerStyles.columns}>
                <div>
                  <h4>
                    <span
                      style={{
                        backgroundImage:
                          "url(https://www.loginradius.com/wp-content/themes/login-radius/images/v5-megamenu/initiatives.svg)",
                      }}
                    ></span>
                    Initiatives
                  </h4>
                  <ul>
                    <li>
                      <Link to="https://www.loginradius.com/customer-experience-solutions/">
                        Customer Experience
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/customer-security/">
                        Customer Security
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/customer-privacy/">
                        Customer Privacy
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/unified-customer-experience/">
                        Unified Customer Experience
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/digital-transformation/">
                        Digital Transformation
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/privacy-consent/">
                        Privacy & Consent
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/account-data-security/">
                        Account Security
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Link>
          <Link
            to="#"
            onClick={() => {
              toggleNavigation(3)
            }}
          >
            <span className="text">
              Customers{" "}
              <i
                className={`${headerStyles.slideoutpartarrow} ${
                  isMenuOpen === 3
                    ? headerStyles.slideoutpartarrowup
                    : headerStyles.slideoutpartarrowdown
                }`}
              ></i>
            </span>
            <div
              id="customers"
              className={
                headerStyles.slideoutpart +
                " " +
                headerStyles.customersmenu +
                (isMenuOpen === 3 ? " " + headerStyles.slideoutpartshow : "")
              }
            >
              <div className={headerStyles.columns}>
                <div>
                  <h4>
                    <span
                      style={{
                        backgroundImage:
                          "url(https://www.loginradius.com/wp-content/themes/login-radius/images/v5-megamenu/customers3.svg)",
                      }}
                    ></span>
                    Customers
                  </h4>
                  <ul>
                    <li>
                      <Link to="https://www.loginradius.com/customers/">
                        Customers
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/customers/#case-studies">
                        Success Stories
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/customers/#videos">
                        Video Testimonials
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/customers/#press-releases">
                        Press Releases
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={headerStyles.columns}>
                <div className="logos">
                  <h4 className={headerStyles.logotitle}>
                    Trusted by over 500 Brands
                  </h4>
                  <div>
                    <Link to="https://www.loginradius.com/customers">
                      <img src="https://www.loginradius.com/wp-content/themes/login-radius/images/v5-megamenu/customer-logos-1.png" />
                    </Link>
                    <Link to="https://www.loginradius.com/customers">
                      <img src="https://www.loginradius.com/wp-content/themes/login-radius/images/v5-megamenu/customer-logos-2.png" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link
            to="#"
            onClick={() => {
              toggleNavigation(4)
            }}
          >
            <span className="text">
              Docs & Resources{" "}
              <i
                className={`${headerStyles.slideoutpartarrow} ${
                  isMenuOpen === 4
                    ? headerStyles.slideoutpartarrowup
                    : headerStyles.slideoutpartarrowdown
                }`}
              ></i>
            </span>
            <div
              id="docs--resources"
              className={
                headerStyles.slideoutpart +
                (isMenuOpen === 4 ? " " + headerStyles.slideoutpartshow : "")
              }
            >
              <div className={headerStyles.columns}>
                <div>
                  <h4>
                    <span
                      style={{
                        backgroundImage:
                          "url(https://www.loginradius.com/wp-content/themes/login-radius/images/v5-megamenu/developers.svg)",
                      }}
                    ></span>
                    Developers
                  </h4>
                  <ul>
                    <li>
                      <Link to="https://www.loginradius.com/developers/">
                        Overview
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/docs/">
                        Developer Docs
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/docs/api/v2/getting-started/introduction/">
                        API References
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/docs/libraries/js-libraries/getting-started/">
                        JS Libraries
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/docs/libraries/sdk-libraries/overview/">
                        Web SDK Libraries
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/docs/libraries/mobile-sdk-libraries/overview/">
                        Mobile SDK Libraries
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={headerStyles.columns}>
                <div>
                  <h4>
                    <span
                      style={{
                        backgroundImage:
                          "url(https://www.loginradius.com/wp-content/themes/login-radius/images/v5-megamenu/resources.svg)",
                      }}
                    ></span>
                    Resources
                  </h4>
                  <ul>
                    <li>
                      <Link to="https://www.loginradius.com/resources/">
                        All Resources
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/resources/#industry-report">
                        Industry Reports
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/resources/#white-paper">
                        White Papers
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/resources/#ebooks">
                        E-Books
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/resources/#case-study">
                        Case Studies
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/resources/#data-sheet">
                        Product Sheets
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/resources/#infographics">
                        Infographics
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/resources/#webinars">
                        Webinars
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/blog/identity">
                        Identity Blog
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/blog/growth">
                        Growth Blog
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={headerStyles.columns}>
                <div>
                  <h4>
                    <span
                      style={{
                        backgroundImage:
                          "url(https://www.loginradius.com/wp-content/themes/login-radius/images/v5-megamenu/events.svg)",
                      }}
                    ></span>
                    Press & Events
                  </h4>
                  <ul>
                    <li>
                      <Link to="https://www.loginradius.com/press/">
                        All Press Releases
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.loginradius.com/events-and-conferences/">
                        All Events & Conferences
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Link>
          <div
            className={`${headerStyles.rightmenu} ${
              showMenu === null
                ? ""
                : showMenu === true
                ? headerStyles.open
                : headerStyles.close
            }`}
          >
            <Link
              to="https://www.loginradius.com/book-a-demo/"
              target="_blank"
              className={`${"btn-primary"} ${headerStyles.signupbutton}`}
            >
              Request Demo
            </Link>
            <Link
              to="https://www.loginradius.com/contact-sales"
              target="_blank"
              className={`btn-secondary ` + headerStyles.contactsales}
            >
              CONTACT SALES
            </Link>
            <Link
              className="btn-login"
              to="https://accounts.loginradius.com/auth.aspx?return_url=https://adminconsole.loginradius.com/login"
              target="_blank"
            >
              Login
            </Link>
            <Search
              customclassName={`${
                showMenu ? searchStyles.deactive : searchStyles.active
              }`}
              searchIndex={searchIndex}
            />
          </div>
        </div>
        <div
          className={`${headerStyles.navigation} ${
            showMenu === null
              ? ""
              : showMenu === true
              ? headerStyles.open
              : headerStyles.close
          }  ${scrollClass}`}
        >
          <ul>
            <li className={type === "" ? headerStyles.active : ""}>
              <Link
                to={"/"}
                activeClassName={headerStyles.active}
                partiallyActive={true}
                onClick={e => {
                  document.body.classList.remove("menu-open")
                }}
              >
                All
              </Link>
            </li>
            <li className={type === "engineering" ? headerStyles.active : ""}>
              <Link
                to={"/engineering"}
                activeClassName={headerStyles.active}
                partiallyActive={true}
                onClick={e => {
                  document.body.classList.remove("menu-open")
                }}
              >
                Engineering
              </Link>
            </li>
            <li className={type === "identity" ? headerStyles.active : ""}>
              <Link
                to={"/identity"}
                activeClassName={headerStyles.active}
                partiallyActive={true}
                onClick={e => {
                  document.body.classList.remove("menu-open")
                }}
              >
                Identity
              </Link>
            </li>
            <li className={type === "growth" ? headerStyles.active : ""}>
              <Link
                to={"/growth"}
                activeClassName={headerStyles.active}
                partiallyActive={true}
                onClick={e => {
                  document.body.classList.remove("menu-open")
                }}
              >
                Growth
              </Link>
            </li>
            <hr />
          </ul>
        </div>
      </div>

      {backdrop === true && (
        <div
          onClick={() => {
            toggleMenu(!showMenu)
            if (showMenu) {
              document.body.classList.add("menu-close")
              document.body.classList.remove("menu-open")
              setTimeout(() => {
                showBackdrop(!showMenu)
              }, 300)
            } else {
              document.body.classList.add("menu-open")
              document.body.classList.remove("menu-close")
              showBackdrop(!showMenu)
            }
          }}
          className={`${headerStyles.backdrop} ${
            showMenu === null
              ? ""
              : showMenu === true
              ? headerStyles.open
              : headerStyles.close
          }`}
        >
          &nbsp;
        </div>
      )}
    </>
  )
}
export default Header
