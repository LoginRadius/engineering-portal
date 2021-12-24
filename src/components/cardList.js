import React from "react"
import styles from "./cardlist.module.scss"
import Card from "./card"

export default function CardList({ posts, currentPage }) {
  const limit = 9
  return (
    <section className="pt-80" id="all-articles">
      <div className={styles.cardlist}>
        <div className="grid-33">
          {posts &&
            posts.map(({ node }, index) => {
              if (
                (currentPage - 1) * limit <= index &&
                index < (currentPage - 1) * limit + 9
              ) {
                return <Card node={node} />
              }
            })}
        </div>
      </div>
    </section>
  )
}
