import { Link } from "gatsby"
import { kebabCase } from "lodash"
import React from "react"
import * as styles from "./bio.module.scss"

const Bio = ({ date, author, pinned, readingTime }) => {
  const githubUrl = author.github
    ? `https://github.com/${author.github}.png?size=50`
    : `https://ui-avatars.com/api/?name=${author.jsonId}&size=460`
  return (
    <div
      className={`${styles.bio} d-flex align-items-center ${
        pinned ? styles.pinned : ""
      }`}
    >
      <div>
        <Link to={`/author/${kebabCase(author.jsonId)}/`}>
          <img
            className={` circle medium ${pinned ? styles.pinned : "large"}`}
            src={githubUrl}
            alt={author.jsonId}
          />
        </Link>
      </div>
      <div className="text ml-sm">
        <span>By&nbsp;</span>
        <Link to={`/author/${kebabCase(author.jsonId)}/`}>
          <strong>{author.jsonId}</strong>
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
