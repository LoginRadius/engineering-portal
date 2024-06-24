import React, { useEffect, useState } from "react"
import styles from "./modal.module.scss"

const Modal = ({ type, email, isOpen, toggle, toggleEmail }) => {
  const [newsLetterSubscription, setNewsLetterSubscription] = useState({
    subscribeEmail: "",
    subscribeCall: false,
    responseMsg: "",
    respClass: "",
  })
  const [async, setAsync] = useState(() =>
    type === "engineering" || type === "all" ? true : false
  )
  const [fuel, setFuel] = useState(() =>
    type === "growth" || type === "all" ? true : false
  )
  const [identity, setIdentity] = useState(() =>
    type === "identity" || type === "all" ? true : false
  )
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (newsLetterSubscription.subscribeEmail != email) {
      setNewsLetterSubscription({
        ...newsLetterSubscription,
        subscribeEmail: email,
        subscribeCall: true,
      })
    }
  }, [email])

  let timer = null

  const subscribeSIB = () => {
    setLoading(true)
    setNewsLetterSubscription({
      subscribeEmail: "",
      subscribeCall: false,
      responseMsg: "",
      respClass: "",
    })
    let url =
      "https://7b214b8d.sibforms.com/serve/MUIEAEF8n18XivpuJIaBkdU9WqFwLX9Jyw4tftr7sucfONVH3neyxUoT96-GLKbvG2XNErWp9O_PulTWQkjxwMDDCECPzvWressylUfBxyOp7cRr0levyjI4o4qtescHBvWd7AF1gxJ9xA0roVaMek-2WZ5sEhFZb-RsbcOLZHUwnWT6ICVTGUsWhOiWusq0aQY4rVnTDaM_S_O7?isAjax=1"
    var data = new FormData()

    if (async) {
      data.append("lists_25[]", "154")
    }
    if (fuel) {
      data.append("lists_25[]", "157")
    }
    if (identity) {
      data.append("lists_25[]", "158")
    }

    data.append("EMAIL", newsLetterSubscription.subscribeEmail)
    let xmlhttp = new XMLHttpRequest()
    xmlhttp.open("POST", url, true)
    xmlhttp.onload = function () {
      var resp = JSON.parse(xmlhttp.responseText)
      if (xmlhttp.status === 200) {
        setNewsLetterSubscription({
          ...newsLetterSubscription,
          subscribeEmail: "",
          responseMsg: resp.message,
          respClass: "success",
        })
        timer = setTimeout(() => {
          toggle()
          toggleEmail()
          clearTimeout(timer)
        }, 7000)
      } else {
        setNewsLetterSubscription({
          ...newsLetterSubscription,
          responseMsg: resp.message,
          respClass: "error",
        })
      }
      setLoading(false)
    }
    xmlhttp.onerror = function (ev) {
      setNewsLetterSubscription({
        ...newsLetterSubscription,
        responseMsg: ev.message,
        respClass: "error",
      })
      setLoading(false)
    }
    xmlhttp.send(data)
  }
  const noType = () => {
    return !async && !fuel && !identity //check this
  }

  return (
    <div className={`${styles.modal} ${isOpen ? "" : styles.hide}`}>
      <div className={styles.modalBody}>
        <a
          className={styles.modalClose}
          onClick={() => {
            toggle()
            toggleEmail()
            clearTimeout(timer)
          }}
        >
          <svg
            width="512"
            height="512"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M368 144L144 368M368 368L144 144L368 368Z"
              stroke="#B3B6B8"
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <div className={styles.modalInner}>
          <h2 className={styles.modalHeader}>Subscribe To Our Blog</h2>
          <div className={styles.modalContent}>
            <p>Select as many topics as you like:</p>
            <ul className={`${styles.unstyled} ${styles.centered}`}>
              <li>
                <input
                  className={styles.styledCheckbox}
                  id="engineering"
                  type="checkbox"
                  value="engineering"
                  checked={async}
                  onChange={() => setAsync(!async)}
                />
                <label htmlFor="engineering">Engineering</label>
              </li>
              <li>
                <input
                  className={styles.styledCheckbox}
                  id="identity"
                  type="checkbox"
                  value="identity"
                  checked={identity}
                  onChange={() => setIdentity(!identity)}
                />
                <label htmlFor="identity">Identity</label>
              </li>
              <li>
                <input
                  className={styles.styledCheckbox}
                  id="growth"
                  type="checkbox"
                  value="growth"
                  checked={fuel}
                  onChange={() => setFuel(!fuel)}
                />
                <label htmlFor="growth">Growth</label>
              </li>
            </ul>
          </div>
          <div className={`${styles.modalFooter} d-flex`}>
            <a
              className={`btn btn-primary ${
                newsLetterSubscription.respClass === "success"
                  ? "btn_success active"
                  : newsLetterSubscription.respClass === "error"
                  ? "btn_error"
                  : loading
                  ? "btn_wait"
                  : ""
              } ${noType() ? "disabled" : ""}`}
              onClick={() =>
                !loading &&
                newsLetterSubscription.respClass !== "success" &&
                subscribeSIB()
              }
            >
              {newsLetterSubscription.respClass === "success"
                ? "Subscribed"
                : newsLetterSubscription.respClass === "error"
                ? "Try Again"
                : loading
                ? "Please Wait"
                : "Subscribe"}
            </a>
            <a
              className="btn btn-secondary"
              onClick={() => {
                toggle()
                toggleEmail()
                clearTimeout(timer)
              }}
            >
              Cancel
            </a>
          </div>
        </div>
      </div>
      <div
        className={styles.overlay}
        onClick={() => {
          toggle()
          toggleEmail()
          clearTimeout(timer)
        }}
      ></div>
    </div>
  )
}

export default Modal
