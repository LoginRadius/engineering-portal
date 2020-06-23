import React from "react"
import styles from "./cardlist.module.scss"
import Card from "./card"

export default function CardList({ posts }) {
  return (
    <section className="pt-80">
      <div className={styles.cardlist}>
        <div className="grid-33">
          {posts && posts.map(({ node }) => <Card node={node} />)}
        </div>
      </div>
    </section>
  )
}
