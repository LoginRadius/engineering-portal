import { Link } from "gatsby"
import { kebabCase } from "lodash"
import React from "react"
import styles from "./bio.module.scss"

const Bio = ({ date, author, pinned, readingTime }) => {
  const githubUrl = author.github
    ? `https://github.com/${author.github}.png?size=50`
    : `https://ui-avatars.com/api/?name=${author.id}&size=460`
  return (
    <div
      className={`${styles.bio} d-flex align-items-center ${
        pinned ? styles.pinned : ""
      }`}
    >
      <div>
        <img
          className={` circle medium ${pinned ? styles.pinned : "large"}`}
          src={githubUrl}
          alt={author.id}
        />
      </div>
      <div className="text ml-sm">
        <span>By&nbsp;</span>
        <Link to={`/author/${kebabCase(author.id)}/`}>
          <strong>{author.id}</strong>
        </Link>
        <div className={styles.dateWrap}>
          <div className={styles.date}>{date}</div>
          <div className={styles.time}>{readingTime}</div>
        </div>
      </div>
    </div>
  )
}

export default Bio
