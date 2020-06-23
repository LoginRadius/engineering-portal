import React from "react"
import styles from "./post.module.scss"

const Post = ({ children }) => {
  return (
    <div className={styles.container}>
      <main>{children}</main>
    </div>
  )
}

export default Post
