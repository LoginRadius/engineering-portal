import React from "react"
import { Link } from "gatsby"
import styles from "./cardlist.module.scss"

// Utilities
import kebabCase from "lodash/kebabCase"

const TagMenu = ({ list }) => {
  list.sort((t1, t2) => {
    return t2.totalCount - t1.totalCount
  })
  return (
    <div className={styles.tagContainer}>
      <h2 className={styles.tagHeader}> Tags </h2>
      <div className={styles.tagMenu}>
        {list.map(item => (
          <Link to={`/blog/tags/${kebabCase(item.tag)}/`}> {item.tag} </Link>
        ))}
      </div>
    </div>
  )
}

export default TagMenu
