import React, { useState } from "react"
import { Link } from "gatsby"

import headerStyles from "./header.module.scss"

import logo from "../../static/engineering-blog.svg"
import Search from "./search"
import ReactGA from "react-ga"

const logger = function (linkName, headerLink) {
  ReactGA.event({
    category: "Header Menu Clicks",
    action: `User clicked on ${linkName}`,
    label: `${headerLink}`,
  })
}

const signUplogger = function () {
  ReactGA.event({
    category: "Signup",
    action: "User clicked on Free signup button",
    label: "Signup",
  })
}

const demologger = function () {
  ReactGA.event({
    category: "Live Demo",
    action: "User clicked on Live Demo button",
    label: "Live Demo",
  })
}

const hacktoberfestLogger = function () {
  ReactGA.event({
    category: "Hacktoberfest",
    action: "User clicked on Hacktoberfest Page button",
    label: "Hacktoberfest Page - Header Button",
  })
}

const Header = ({ menuLinks, searchIndex }) => {
  const [shouldClose, close] = useState(false)
  return (
    <>
      {!shouldClose ? (
        <div className={headerStyles.topStrip}>
          <p>
            <a
              href={"https://www.loginradius.com/resources/#live-product-demo"}
              key={"live_demo"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => demologger()}
            >
              {"Join us on the demo"}
            </a>
            , while our product experts provide a detailed walkthrough of our
            enterprise platform.
            <br />
            Get LoginRadius Swags in Hacktoberfest 2020. Check our
            <a
              href={"/hacktoberfest2020"}
              key={"hacktoberfest"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => hacktoberfestLogger()}
            >
              {" hacktoberfest page "}
            </a>
            for more details.
          </p>
          <button
            onClick={() => close(true)}
            className={headerStyles.closeIcon}
          ></button>
        </div>
      ) : null}

      <div className={headerStyles.header}>
        <Link className={logo} to={"/blog"}>
          <img src={logo} alt={`logo`} />
        </Link>
        <div className={headerStyles.menuLinks}>
          <nav className={headerStyles.menuLinksinner}>
            <ul>
              {menuLinks.map((link, index) => (
                <li>
                  <a
                    href={link.slug}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => logger(link.name, link.slug)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={headerStyles.navRightSide}>
            <div className={headerStyles.freeSignup}>
              <a
                className={"btn-primary small"}
                href={`https://accounts.loginradius.com/auth.aspx?action=register&return_url=https://dashboard.loginradius.com/login`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={signUplogger}
              >
                {"Free Sign Up"}
              </a>
            </div>
            <Search searchIndex={searchIndex} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
