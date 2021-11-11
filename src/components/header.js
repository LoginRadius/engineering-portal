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
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
      let notify = () => toast.error("The email is a required field.")
      notify()
      return
    }
    if (!validEmail.test(newsLetterSubscription.subscribeEmail)) {
      setNewsLetterSubscription({
        ...newsLetterSubscription,
        responseMsg: "The email must be a valid email address.",
        respClass: "error",
      })
      let notify = () => toast.error("The email must be a valid email address.")
      notify()
      return
    }

    let url =
      "https://7b214b8d.sibforms.com/serve/MUIEABjlbtas8SGeh1_RHkqf-_rjMNzQ_3u_4maezMOZVA-Y8EhuES3-7h1h1an4yYoFbmXE-yi_3mvlfauUKpZxhhpOfH-eEcDiwn1SFnCLVyXROs6Z1Qiz6-_7-Bi-3cGVPJgdXXUuWgo2nQXMnkCl7NiAhIO1lUCHGg6EPo6jH1MahkllNh1mJtf4HeL-sQy6fDXP7WdtwJbA?isAjax=1"
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
        let notify = () => toast.info(resp.message)
        notify()
        document.getElementById("subscription-form").reset()
      } else if (xmlhttp.status == 500) {
        setNewsLetterSubscription({
          ...newsLetterSubscription,
          responseMsg: resp.message,
          respClass: "error",
        })
        let notify = () => toast.error(resp.message)
        notify()
      } else {
        setNewsLetterSubscription({
          ...newsLetterSubscription,
          subscribeCall: false,
          respClass: "",
        })
        let notify = () =>
          toast.error("An error has occured, please try again!")
        notify()
      }
    }
    xmlhttp.send(data)
  }

  const checkKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault()
      subscribeSIB()
    }
  }

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
