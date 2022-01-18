import React from "react"
import { Link } from "gatsby"

import styles from "./pagination.module.scss"

const Pagination = ({ pages, currentPage, type }) => {
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
    <section className={styles.paginationWrap}>
      <div className={styles.pagination}>
        {!isFirst && (
          <Link to={`/${type}/${prevPage}/#all-articles`} rel="prev">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.375 5.25L8.625 12L15.375 18.75"
                  stroke="#0D8DCF"
                  stroke-width="2.25"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
              </svg>
            </span>
          </Link>
        )}
        {!intialPages && (
          <Link
            to={`/${type}/`}
            className={currentPage === 1 ? styles.active : ""}
          >
            <span>{1}</span>
          </Link>
        )}
        {!intialPages && currentPage != 4 && <p to="">...</p>}
        {pageArray.map((k, i) => (
          <Link
            to={`${k === 1 ? `/${type}/` : `/${type}/${k}/#all-articles`}`}
            key={k}
            className={currentPage === k ? styles.active : ""}
          >
            <span>{k}</span>
          </Link>
        ))}
        {!lastPages && currentPage != pages - 3 && <p>...</p>}
        {!lastPages && (
          <Link
            to={`/${type}/${pages}/#all-articles`}
            key={pages}
            className={currentPage === pages ? styles.active : ""}
          >
            <span>{pages}</span>
          </Link>
        )}

        {!isLast && (
          <Link to={`/${type}/${nextPage}/#all-articles`} rel="next">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.625 5.25L15.375 12L8.625 18.75"
                  stroke="#0D8DCF"
                  stroke-width="2.25"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
              </svg>
            </span>
          </Link>
        )}
      </div>
    </section>
  )
}

export default Pagination
