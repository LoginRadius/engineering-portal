import React, { useEffect, useState } from "react"
import * as styles from "./cardlist.module.scss"
import Modal from "./modal"
import { validEmail } from "./regex.js"

const Subscribe = ({ type }) => {
  const [email, setEmail] = useState("")
  const [isError, setError] = useState(false)
  const [isClicked, setClicked] = useState(false)
  const checkKeyDown = e => {
    if (e.key === "Enter" && !isError) {
      e.preventDefault()
      setClicked(true)
    }
  }

  useEffect(() => {
    if (email === "" || !validEmail.test(email)) {
      setError(true)
    } else {
      setError(false)
    }
  }, [email])

  return (
    <div className={`${styles.sidebarWidget} ${styles.subscribe}`}>
      <input
        type="text"
        placeholder="Enter your email"
        onKeyDown={e => checkKeyDown(e)}
        value={email}
        onChange={e => {
          setEmail(e.target.value)
        }}
      />
      <input
        className={`btn btn-primary ${isError ? styles.disabled : ""}`}
        type="submit"
        disabled={isError}
        onClick={() => {
          setClicked(true)
        }}
        value="Subscribe"
      />

      {!isError && (
        <Modal
          type={type || "all"}
          email={email}
          isOpen={isClicked}
          toggle={() => {
            setClicked(false)
          }}
          toggleEmail={() => {
            setEmail("")
          }}
        />
      )}
    </div>
  )
}

export default Subscribe
