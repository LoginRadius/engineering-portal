import { Link } from "gatsby"
import _ from "lodash"
import React from "react"
import styles from "./bio.module.scss"

const Bio = ({ date, author, pinned }) => {
  const githubUrl = author.github
    ? `https://github.com/${author.github}.png?size=50`
    : `https://ui-avatars.com/api/?name=${author.id}&size=460`
  return (
    <div className={`${styles.bio} d-flex ${pinned ? styles.pinned : ""}`}>
      <div>
        <img className={`circle large`} src={githubUrl} alt={author.id} />
      </div>
      <div className="text ml-sm">
        <Link to={`/blog/author/${_.kebabCase(author.id)}/`}>
          <strong>{author.id}</strong>
        </Link>
        <div className={styles.date}>{date}</div>
      </div>
    </div>
  )
}

export default Bio
