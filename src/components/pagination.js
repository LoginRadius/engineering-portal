import React from "react"
import { Link } from "gatsby"

import styles from "./pagination.module.scss"

const Pagination = ({ pages, currentPage }) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === pages
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  let pageArray = []
  let intialPages = false
  let lastPages = false
  let startIndex = 0
  if (currentPage <= 3) {
    startIndex = 1
    intialPages = true
  } else if (currentPage + 3 > pages) {
    startIndex = pages - 4
    lastPages = true
  } else {
    startIndex = currentPage - 2
  }
  pageArray = [
    startIndex,
    startIndex + 1,
    startIndex + 2,
    startIndex + 3,
    startIndex + 4,
  ]

  return (
    <section className="bg-light py-40">
      <div className={styles.pagination}>
        {!isFirst && <Link to={`/blog/${prevPage}`} rel="prev" />}
        {!intialPages && (
          <Link
            to={`/blog/`}
            className={currentPage === 1 ? styles.active : ""}
          >
            {1}
          </Link>
        )}
        {!intialPages && <p to="">...</p>}
        {pageArray.map((k, i) => (
          <Link
            to={`${k === 1 ? `/blog/` : `/blog/${k}`}`}
            key={k}
            className={currentPage === k ? styles.active : ""}
          >
            {k}
          </Link>
        ))}
        {!lastPages && <p>...</p>}
        {!lastPages && (
          <Link
            to={`/blog/${pages}`}
            key={pages}
            className={currentPage === pages ? styles.active : ""}
          >
            {pages}
          </Link>
        )}

        {!isLast && <Link to={`/blog/${nextPage}`} rel="next" />}
      </div>
    </section>
  )
}

export default Pagination
