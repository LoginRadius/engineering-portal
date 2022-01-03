import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import headerStyles from "./header.module.scss"
import LogoLr from "../../static/logo-blog.svg"
import Search from "./search"
import ReactGA from "react-ga"
import { validEmail } from "./regex.js"
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
  const [openMenu, setOpenMenu] = useState(false)
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

  let pathname = "async"
  if (typeof window !== `undefined`) {
    pathname = window.location.pathname.substr(1)
  }

  const [active, setActive] = useState(pathname)

  return (
    <>
      <ToastContainer style={{ fontSize: "15px" }} />
      <div
        className={`${showMenu ? headerStyles.headerShowMenu : ""} ${
          headerStyles.header
        }`}
      >
        <Link className={headerStyles.logo} to={"/"}>
          <img src={LogoLr} alt={`logo`} className={headerStyles.lrLogo} />
        </Link>
        <Search searchIndex={searchIndex} />
      </div>
      <div className={headerStyles.navigation}>
        <ul>
          <li className={active === "async" ? headerStyles.active : ""}>
            <Link to={"/async"} onClick={() => setActive("async")}>
              Engineering
            </Link>
          </li>
          <li
            className={
              active === "start-with-identity" ? headerStyles.active : ""
            }
          >
            <Link
              to={"/start-with-identity"}
              onClick={() => setActive("start-with-identity")}
            >
              Identity
            </Link>
          </li>
          <li className={active === "fuel" ? headerStyles.active : ""}>
            <Link to={"/fuel"} onClick={() => setActive("fuel")}>
              {" "}
              Growth
            </Link>
          </li>
          <hr />
        </ul>
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
