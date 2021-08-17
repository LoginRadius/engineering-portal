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
import { validEmail } from "./regex.js"
import Helmet from "react-helmet"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [newsLetterSubscription, setNewsLetterSubscription] = useState({
    subscribeEmail: "",
    subscribeCall: false,
    responseMsg: "",
    respClass: "",
  })

  const bodyClickHandler = () => _shouldBlogClose && toggleType("")

  useEffect(() => {
    document.body.addEventListener("click", bodyClickHandler)

    return () => {
      document.body.removeEventListener("click", bodyClickHandler)
    }
  }, [])


  const subscribeSIB = () => {
    setNewsLetterSubscription({
      ...newsLetterSubscription,
      subscribeCall: true,
    })
    if (newsLetterSubscription.subscribeEmail == "") {
      setNewsLetterSubscription({
        ...newsLetterSubscription,
        responseMsg: "The email is a required field.",
        respClass: "error",
      })
      let notify = () => toast.error("The email is a required field.");
      notify();
      return
    }
    if (!validEmail.test(newsLetterSubscription.subscribeEmail)) {
      setNewsLetterSubscription({
        ...newsLetterSubscription,
        responseMsg: "The email must be a valid email address.",
        respClass: "error",
      })
      let notify = () => toast.error("The email must be a valid email address.");
      notify();
      return
    }

    let url = "https://7b214b8d.sibforms.com/serve/MUIEABjlbtas8SGeh1_RHkqf-_rjMNzQ_3u_4maezMOZVA-Y8EhuES3-7h1h1an4yYoFbmXE-yi_3mvlfauUKpZxhhpOfH-eEcDiwn1SFnCLVyXROs6Z1Qiz6-_7-Bi-3cGVPJgdXXUuWgo2nQXMnkCl7NiAhIO1lUCHGg6EPo6jH1MahkllNh1mJtf4HeL-sQy6fDXP7WdtwJbA?isAjax=1"
    var data = new FormData()
    data.append("EMAIL", newsLetterSubscription.subscribeEmail)
    // data.append("token", "a8a0147575b32dfa7f5e76d83afbf189")
    let xmlhttp = new XMLHttpRequest()
    xmlhttp.open("POST", url, true)
    xmlhttp.onload = function () {
      var resp = JSON.parse(xmlhttp.responseText)
      if (xmlhttp.status == 200) {
        setNewsLetterSubscription({
          ...newsLetterSubscription,
          subscribeEmail: "",
          responseMsg: resp.message,
          respClass: "success",
        })
        let notify = () => toast.info(resp.message);
        notify();
        document.getElementById("subscription-form").reset()
      } else if (xmlhttp.status == 500) {
        setNewsLetterSubscription({
          ...newsLetterSubscription,
          responseMsg: resp.message,
          respClass: "error",
        })
        let notify = () => toast.error(resp.message);
        notify();
      } else {
        setNewsLetterSubscription({
          ...newsLetterSubscription,
          subscribeCall: false,
          respClass: "",
        })
        let notify = () => toast.error("An error has occured, please try again!");
        notify();
      }
    }
    xmlhttp.send(data)
  }

  const checkKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      subscribeSIB();
    }

  };
  return (
    <>
      {/* <Helmet>
        <script src="https://sibforms.com/forms/end-form/build/main.js"></script>
      </Helmet> */}
      <ToastContainer style={{ fontSize: "15px" }} />
      {/* <div
        className={`${headerStyles.sgResponse} ${headerStyles[newsLetterSubscription.respClass]
          } `}
      >
        <div>{newsLetterSubscription.responseMsg}</div>
        <button
          onClick={() =>
            setNewsLetterSubscription({
              subscribeEmail: newsLetterSubscription.subscribeEmail,
            })
          }
          class={`${headerStyles.closeIcon}`}
        ></button>
        <ToastContainer />
      </div> */}
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


        <a className={[headerStyles.logo, headerStyles.lrLogo].join(' ')} href='https://www.loginradius.com/'>
          <img src={LogoLr} alt="LR Logo" />
        </a>

        <Link className={[headerStyles.logo, headerStyles.asycnLogo].join(' ')} to={"/"}>
          <img
            src={logoAsyncDark}
            alt="Async"
          />
        </Link>



        <input
          type="checkbox"
          id={headerStyles.navCheck}
          checked={showMenu}
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
                  href={menuLinks[0].slug}
                  target="_blank"
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
                  href={menuLinks[1].slug}
                  target="_blank"
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
                <form className="sg-widget" id="subscription-form" onKeyDown={(e) => checkKeyDown(e)}>
                  <div className={headerStyles.formGroup}>
                    <input
                      className="sg_email required"
                      type="email"
                      name="sg_email"
                      id="sg_email"
                      placeholder="you@example.com"
                      required="required"
                      onChange={e => {
                        setNewsLetterSubscription({
                          ...newsLetterSubscription,
                          subscribeEmail: e.target.value,
                        })
                      }}
                    />
                    <input
                      className={`${headerStyles.navcta} ${headerStyles.sgSubmitBtn} btn-primary`}
                      type="button"
                      disabled={
                        newsLetterSubscription.subscribeCall
                      }

                      onClick={() => subscribeSIB()}
                      value="Subscribe"
                    />
                  </div>
                </form>
              </div>

              {/* <div className="sib-form">
                <div id="sib-form-container" className="sib-form-container">
                  <div id="error-message" className="sib-form-message-panel">
                    <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
                      <svg
                        viewBox="0 0 512 512"
                        className="sib-icon sib-notification__icon"
                      >
                        <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
                      </svg>
                      <span className="sib-form-message-panel__inner-text">
                        Your subscription could not be saved. Please try again.
                      </span>
                    </div>
                  </div>
                  <div></div>
                  <div id="success-message" className="sib-form-message-panel">
                    <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
                      <svg
                        viewBox="0 0 512 512"
                        className="sib-icon sib-notification__icon"
                      >
                        <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
                      </svg>
                      <span className="sib-form-message-panel__inner-text">
                        Please verify your email address.
                      </span>
                    </div>
                  </div>
                  <div></div>
                  <div
                    id="sib-container"
                    className="sib-container--large sib-container--vertical"
                  >
                    <form
                      id="sib-form"

                      data-type="subscription"
                    >
                      <div>
                        <div className="sib-input sib-form-block">
                          <div className="form__entry entry_block">
                            <div className="form__label-row ">
                              <div className="entry__field">
                                <input
                                  className="input"
                                  type="text"
                                  id="EMAIL"
                                  name="EMAIL"
                                  autocomplete="off"
                                  placeholder="you@example.com"
                                  data-required="true"
                                  required
                                />
                              </div>
                            </div>

                            <label className="entry__error entry__error--primary"></label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="sib-form-block">
                          <button
                            className={`${headerStyles.navcta} ${headerStyles.sgSubmitBtn} btn-primary sib-form-block__button sib-form-block__button-with-loader`}
                            form="sib-form"
                            // type="submit"
                            onClick={() => subscribeSIB()}
                          >
                            <svg
                              className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon"
                              viewBox="0 0 512 512"
                            >
                              <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
                            </svg>
                            SUBSCRIBE
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        name="email_address_check"
                        value=""
                        className="input--hidden"
                      />
                      <input type="hidden" name="locale" value="en" />
                    </form>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <Search searchIndex={searchIndex} />
      </div>
      <div
        className={headerStyles.backdrop}
        onClick={() => {
          toggleMenu(false)
        }}
      />
    </>
  )
}
export default Header
