import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import headerStyles from "./header.module.scss"

import logoAsync from "../../static/async.svg"
import logoAsyncDark from "../../static/async-dark.svg"
import logoSwi from "../../static/swi.svg"
import logoFuel from "../../static/fuel.svg"
import LogoLr from "../../static/logo.svg"
import Search from "./search"
import ReactGA from "react-ga"

const logger = function (linkName, headerLink) {
  ReactGA.event({
    category: "Header Menu Clicks",
    action: `User clicked on ${linkName}`,
    label: `${headerLink}`,
  })
}

const demologger = function () {
  ReactGA.event({
    category: "Live Demo",
    action: "User clicked on Live Demo button",
    label: "Live Demo",
  })
}

let _shouldBlogClose = false

const Header = ({ menuLinks, searchIndex }) => {
  const [shouldClose, close] = useState(false)
  const [showMenu, toggleMenu] = useState(false)
  const [blogType, toggleType] = useState("")

  const bodyClickHandler = () => _shouldBlogClose && toggleType("")

  useEffect(() => {
    document.body.addEventListener("click", bodyClickHandler)

    return () => {
      document.body.removeEventListener("click", bodyClickHandler)
    }
  }, [])

  return (
    <>
      {!shouldClose ? (
        <div className={headerStyles.topStrip}>
          <p>
            <a
              href={"https://www.loginradius.com/resources/#live-product-demo"}
              key={"live_demo"}
              target="_blank"
              className="ga_event"
              rel="noopener noreferrer"
              onClick={() => demologger()}
            >
              {"Join us on the demo"}
            </a>
            , while our product experts provide a detailed walkthrough of our
            enterprise platform.
          </p>
          <button
            onClick={() => close(true)}
            className={headerStyles.closeIcon}
          ></button>
        </div>
      ) : null}

      <div
        className={`${showMenu ? headerStyles.headerShowMenu : ""} ${
          headerStyles.header
        }`}
      >
        <Link className={headerStyles.logo} to={"/"}>
          <img src={LogoLr} alt={`logo`} className={headerStyles.lrLogo} />
          <img
            src={logoAsyncDark}
            alt="Async"
            className={headerStyles.asycnLogo}
          />
        </Link>
        <input
          type="checkbox"
          id={headerStyles.navCheck}
          onChange={() => toggleMenu(!showMenu)}
        />
        <div className={headerStyles.navBtn}>
          <label for="navCheck">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div className={headerStyles.menuLinks}>
          <div
            className={`${blogType ? headerStyles.allBlogActive : ""} ${
              headerStyles.allBlogsLogo
            } `}
            onMouseOver={() => (_shouldBlogClose = false)}
            onMouseLeave={() => (_shouldBlogClose = true)}
          >
            <div
              className={`${
                ["async", ""].includes(blogType)
                  ? headerStyles.active
                  : "inactive"
              } ${headerStyles.logoWrap} ${headerStyles.async}`}
              onClick={() =>
                blogType === "async" ? toggleType("") : toggleType("async")
              }
            >
              <div className={headerStyles.blogLogo}>
                <div className={headerStyles.logo}>
                  <img src={logoAsync} alt="" />
                </div>
              </div>
            </div>
            <div
              className={`${
                blogType == "swi" ? headerStyles.active : "inactive"
              } ${headerStyles.logoWrap} ${headerStyles.swi} `}
              onClick={() =>
                blogType === "swi" ? toggleType("") : toggleType("swi")
              }
            >
              <div className={headerStyles.blogLogo}>
                <div className={headerStyles.logo}>
                  <img src={logoSwi} alt="" />
                </div>
              </div>
            </div>
            <div
              className={`${
                blogType == "fuel" ? headerStyles.active : "inactive"
              } ${headerStyles.logoWrap} ${headerStyles.fuel}`}
              onClick={() =>
                blogType === "fuel" ? toggleType("") : toggleType("fuel")
              }
            >
              <div className={headerStyles.blogLogo}>
                <div className={headerStyles.logo}>
                  <img src={logoFuel} alt="Fuel" />
                </div>
              </div>
            </div>
            <div
              className={`${
                blogType ? headerStyles.slideDown : headerStyles.slideUp
              } ${headerStyles.logoDescription}`}
              onMouseOver={() => (_shouldBlogClose = false)}
              onMouseLeave={() => (_shouldBlogClose = true)}
            >
              <div
                className={`${
                  blogType == "async"
                    ? headerStyles.slideDesDown
                    : headerStyles.slideDesUp
                }  ${headerStyles.description} ${headerStyles.async}`}
              >
                <p>The latest news in the world of engineering.</p>
              </div>
              <div
                className={`${
                  blogType == "swi"
                    ? headerStyles.slideDesDown
                    : headerStyles.slideDesUp
                }  ${headerStyles.description} ${headerStyles.swi}`}
              >
                <p>
                  Identity and Access Management (IAM), including security and
                  customer experience.
                </p>
                <a
                  href="#"
                  className={`${headerStyles.btnPrimary} btn-primary`}
                >
                  Visit Blog
                </a>
              </div>
              <div
                className={`${
                  blogType == "fuel"
                    ? headerStyles.slideDesDown
                    : headerStyles.slideDesUp
                }  ${headerStyles.description} ${headerStyles.fuel}`}
              >
                <p>
                  Grow your business to millions.Engage and retain your
                  customers.
                </p>
                <a
                  href="#"
                  className={`${headerStyles.btnPrimary} btn-primary`}
                >
                  Visit Blog
                </a>
              </div>
            </div>
          </div>
          <nav className={headerStyles.menuLinksinner}>
            <ul>
              {menuLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.slug}
                    key={index}
                    target="_blank"
                    class={`${
                      link.class ? headerStyles[link.class] : ""
                    } ga_event`}
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
              <form>
                <div className={headerStyles.formGroup}>
                  <input type="text" placeholder="Enter your email" />
                  <input
                    type="submit"
                    value="Subscribe"
                    className={`${headerStyles.navcta} btn-primary`}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <Search searchIndex={searchIndex} />
        <div className={headerStyles.backdrop} />
      </div>
    </>
  )
}

export default Header
