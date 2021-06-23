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
import { validEmail } from './regex.js';

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
  const [newsLetterSubscription, setNewsLetterSubscription] = useState({ subscribeEmail: "", subscribeCall: false, responseMsg: "", respClass: "" });

  const bodyClickHandler = () => _shouldBlogClose && toggleType("")

  useEffect(() => {
    document.body.addEventListener("click", bodyClickHandler)

    return () => {
      document.body.removeEventListener("click", bodyClickHandler)
    }
  }, [])
  const subscribe = () => {
    setNewsLetterSubscription({ ...newsLetterSubscription, subscribeCall: true })
    if (newsLetterSubscription.subscribeEmail == "") {
      setNewsLetterSubscription({ ...newsLetterSubscription, responseMsg: "The email field is required.", respClass: "error" })
      return
    }
    if (!validEmail.test(newsLetterSubscription.subscribeEmail)) {
      setNewsLetterSubscription({ ...newsLetterSubscription, responseMsg: "The email must be a valid email address.", respClass: "error" })
      return
    }

    let url = 'https://app.sgwidget.com/v2/api/newsletter-signup';
    var data = new FormData();
    data.append('email', newsLetterSubscription.subscribeEmail);
    data.append('token', "a8a0147575b32dfa7f5e76d83afbf189");
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, true);
    xmlhttp.onload = function () {
      var resp = JSON.parse(xmlhttp.responseText);
      if (xmlhttp.status == 200) {
        setNewsLetterSubscription({ ...newsLetterSubscription, responseMsg: resp.message, respClass: "success" })
      } else if (xmlhttp.status == 500) {
        setNewsLetterSubscription({ ...newsLetterSubscription, responseMsg: resp.message, respClass: "error" })
      } else {
        setNewsLetterSubscription({ ...newsLetterSubscription, subscribeCall: false, respClass: "" })
      }
    };
    xmlhttp.send(data);
  }

  return (
    <>
      <div className={`sg-response ${newsLetterSubscription.respClass}`}>{newsLetterSubscription.responseMsg}</div>
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
        className={`${showMenu ? headerStyles.headerShowMenu : ""} ${headerStyles.header
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
          <label htmlFor="navCheck">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <div className={headerStyles.bloglogoWrap}>
          <div
            className={`${blogType ? headerStyles.allBlogActive : ""} ${headerStyles.allBlogsLogo
              } `}
            onMouseOver={() => (_shouldBlogClose = false)}
            onMouseLeave={() => (_shouldBlogClose = true)}
          >
            <div
              className={`${["async", ""].includes(blogType)
                ? headerStyles.active
                : headerStyles.inactive
                } ${headerStyles.logoWrap} ${headerStyles.async}`}
              onClick={() => (blogType === "async" ? "" : toggleType("async"))}
            >
              <div className={headerStyles.blogLogo}>
                <div className={headerStyles.logo}>
                  <img src={logoAsync} alt="" />
                </div>
              </div>
              <div
                className={`${blogType == "async"
                  ? headerStyles.slideDesDown1
                  : headerStyles.slideDesUp1
                  }  ${headerStyles.description} ${headerStyles.async}`}
              >
                <p>The latest news in the world of engineering.</p>
              </div>
            </div>
            <div
              className={`${blogType == "swi" ? headerStyles.active : headerStyles.inactive
                } ${headerStyles.logoWrap} ${headerStyles.swi} `}
              onClick={() => (blogType === "swi" ? "" : toggleType("swi"))}
            >
              <div className={headerStyles.blogLogo}>
                <div className={headerStyles.logo}>
                  <img src={logoSwi} alt="" />
                </div>
              </div>
              <div
                className={`${blogType == "swi"
                  ? headerStyles.slideDesDown1
                  : headerStyles.slideDesUp1
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
            </div>
            <div
              className={`${blogType == "fuel" ? headerStyles.active : headerStyles.inactive
                } ${headerStyles.logoWrap} ${headerStyles.fuel}`}
              onClick={() => (blogType === "fuel" ? "" : toggleType("fuel"))}
            >
              <div className={headerStyles.blogLogo}>
                <div className={headerStyles.logo}>
                  <img src={logoFuel} alt="Fuel" />
                </div>
              </div>
              <div
                className={`${blogType == "fuel"
                  ? headerStyles.slideDesDown1
                  : headerStyles.slideDesUp1
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
        </div>
        <div className={headerStyles.menuLinks}>
          <nav className={headerStyles.menuLinksinner}>
            <ul>
              {menuLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.slug}
                    key={index}
                    target="_blank"
                    className={`${link.class ? headerStyles[link.class] : ""
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

              <div id="sg-widget-event">
                <form className="sg-widget">
                  <div className={headerStyles.formGroup}>
                    <input
                      className="sg_email required"
                      type="email"
                      name="sg_email"
                      placeholder="you@example.com"
                      required="required"
                      onChange={(e) => { setNewsLetterSubscription({ ...newsLetterSubscription, subscribeEmail: e.target.value }) }}
                    />
                    <input
                      className={`${headerStyles.navcta} btn-primary sg-submit-btn`}
                      type="button"
                      id="widget-1919"
                      disabled={setNewsLetterSubscription.subscribeCall || !!setNewsLetterSubscription.subscribeEmail}
                      onClick={() => subscribe()}
                      value="Subscribe"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Search searchIndex={searchIndex} />
      </div>
      <div className={headerStyles.backdrop} />
    </>
  )
}
export default Header
