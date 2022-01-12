import React, { useEffect, useState } from "react"
import styles from "./modal.module.scss"
import { toast } from "react-toastify"
import { validEmail } from "./regex.js"

const Modal = ({ type, email, isOpen, toggle, toggleEmail }) => {
  const [newsLetterSubscription, setNewsLetterSubscription] = useState({
    subscribeEmail: "",
    subscribeCall: false,
    responseMsg: "",
    respClass: "",
  })
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
      "https://7b214b8d.sibforms.com/serve/MUIEABjlbtas8SGeh1_RHkqf-_rjMNzQ_3u_4maezMOZVA-Y8EhuES3-7h1h1an4yYoFbmXE-yi_3mvlfauUKpZxhhpOfH-eEcDiwn1SFnCLVyXROs6Z1Qiz6-_7-Bi-3cGVPJgdXXUuWgo2nQXMnkCl7NiAhIO1lUCHGg6EPo6jH1MahkllNh1mJtf4HeL-sQy6fDXP7WdtwJbA?isAjax=1"
    var data = new FormData()
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
  return (
    <div className={`${styles.modal} ${isOpen ? "" : styles.hide}`}>
      <div className={styles.modalBody}>
        <a href="#" className={styles.modalClose} onClick={toggle}>
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
                  value="value1"
                />
                <label for="engineering">Engineering</label>
              </li>
              <li>
                <input
                  className={styles.styledCheckbox}
                  id="identity"
                  type="checkbox"
                  value="value2"
                />
                <label for="identity">Identity</label>
              </li>
              <li>
                <input
                  className={styles.styledCheckbox}
                  id="growth"
                  type="checkbox"
                  value="value3"
                />
                <label for="growth">Growth</label>
              </li>
            </ul>
          </div>
          <div className={`${styles.modalFooter} d-flex`}>
            <a
              className="btn btn-primary"
              disabled={newsLetterSubscription.subscribeCall || loading}
              onClick={() => !loading && subscribeSIB()}
            >
              {loading ? "Please Wait" : "Subscribe"}
            </a>
            <a href="#" className="btn btn-secondary" onClick={toggle}>
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
