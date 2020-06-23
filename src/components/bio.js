/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { Link } from "gatsby"
import _ from "lodash"
import React from "react"
import styles from "./bio.module.scss"

const Bio = ({ date, author }) => {
  const githubUrl = author.github
    ? `https://github.com/${author.github}.png?size=50`
    : `https://ui-avatars.com/api/?name=${author.id}&size=460`
  return (
    <div className={styles.container}>
      <img src={githubUrl} alt={author.id} />
      <p className={styles.text}>
        <Link to={`/blog/author/${_.kebabCase(author.id)}/`}>
          <strong>{author.id}</strong>
        </Link>
        {` `}
        <div className={styles.date}>{date}</div>
      </p>
    </div>
  )
}

export default Bio
