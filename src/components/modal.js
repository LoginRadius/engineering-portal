import React, { useEffect, useState } from "react"
import styles from "./modal.module.scss"
import { toast } from "react-toastify"
import { validEmail } from "./regex.js"

import "react-toastify/dist/ReactToastify.css"

toast.configure()

const Modal = ({ type, email, isOpen, toggle, toggleEmail }) => {
  const [newsLetterSubscription, setNewsLetterSubscription] = useState({
    subscribeEmail: "",
    subscribeCall: false,
    responseMsg: "",
    respClass: "",
  })
  const [async, setAsync] = useState(() => (type === "async" ? true : false))
  const [fuel, setFuel] = useState(() => (type === "fuel" ? true : false))
  const [identity, setIdentity] = useState(() =>
    type === "start-with-identity" ? true : false
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
      "https://7b214b8d.sibforms.com/serve/MUIEAEF8n18XivpuJIaBkdU9WqFwLX9Jyw4tftr7sucfONVH3neyxUoT96-GLKbvG2XNErWp9O_PulTWQkjxwMDDCECPzvWressylUfBxyOp7cRr0levyjI4o4qtescHBvWd7AF1gxJ9xA0roVaMek-2WZ5sEhFZb-RsbcOLZHUwnWT6ICVTGUsWhOiWusq0aQY4rVnTDaM_S_O7"
    var data = new FormData()

    /*const bodyType = (id) => {
      data.append("lists_25[]",id)
    }*/
    if (async) {
      data.append("list_25[]", 154)
    }
    if (fuel) {
      data.append("list_25[]", 157)
    }
    if (identity) {
      data.append("list_25[]", 158)
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
        let notify = () => toast.info(resp.message)
        notify()
        toggleEmail()
        toggle()
        //document.getElementById("subscription-form").reset()
      } else if (xmlhttp.status === 500) {
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
        <a className={styles.modalClose} onClick={toggle}>
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
              className={`${"btn btn-primary"} ${noType() ? "disabled" : ""}`}
              disabled={
                newsLetterSubscription.subscribeCall || loading || noType()
              }
              onClick={() => !loading && subscribeSIB()}
            >
              {loading ? "Please Wait" : "Subscribe"}
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
