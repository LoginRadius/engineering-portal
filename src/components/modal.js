import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import styles from "./modal.module.scss"

toast.configure()

const Modal = ({ type, email, isOpen, toggle, toggleEmail }) => {
  const [newsLetterSubscription, setNewsLetterSubscription] = useState({
    subscribeEmail: "",
    subscribeCall: false,
    responseMsg: "",
    respClass: "",
  })
  const [async, setAsync] = useState(() =>
    type === "async" || type === "all" ? true : false
  )
  const [fuel, setFuel] = useState(() =>
    type === "fuel" || type === "all" ? true : false
  )
  const [identity, setIdentity] = useState(() =>
    type === "start-with-identity" || type === "all" ? true : false
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

  const subscribeSIB = () => {
    setLoading(true)
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
    // data.append("token", "a8a0147575b32dfa7f5e76d83afbf189")
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
      } else {
        setNewsLetterSubscription({
          ...newsLetterSubscription,
          responseMsg: resp.message,
          respClass: "error",
        })
      }
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
              stroke-width="32"
              stroke-linecap="round"
              stroke-linejoin="round"
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
                  value="async"
                  checked={async}
                  onChange={() => setAsync(!async)}
                />
                <label for="engineering">Engineering</label>
              </li>
              <li>
                <input
                  className={styles.styledCheckbox}
                  id="identity"
                  type="checkbox"
                  value="start-with-identity"
                  checked={identity}
                  onChange={() => setIdentity(!identity)}
                />
                <label for="identity">Identity</label>
              </li>
              <li>
                <input
                  className={styles.styledCheckbox}
                  id="growth"
                  type="checkbox"
                  value="fuel"
                  checked={fuel}
                  onChange={() => setFuel(!fuel)}
                />
                <label for="growth">Growth</label>
              </li>
            </ul>
          </div>
          <div className={`${styles.modalFooter} d-flex`}>
            <a
              className={`${"btn btn-primary"} ${loading ? "btn_wait" : ""} ${
                newsLetterSubscription.respClass === "success"
                  ? "btn_success"
                  : newsLetterSubscription.respClass === "error"
                  ? "btn_error"
                  : ""
              } ${noType() ? "disabled" : ""}`}
              disabled={
                newsLetterSubscription.subscribeCall || loading || noType()
              }
              onClick={() => !loading && subscribeSIB()}
            >
              {loading
                ? "Please Wait"
                : newsLetterSubscription.respClass === "success"
                ? "Subscribed"
                : "Subscribe"}
            </a>
            <a className="btn btn-secondary" onClick={toggle}>
              Cancel
            </a>
          </div>
        </div>
      </div>
      <div className={styles.overlay}></div>
    </div>
  )
}

export default Modal
