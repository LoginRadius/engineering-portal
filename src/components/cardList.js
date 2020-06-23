import React from "react"
import styles from "./cardlist.module.scss"
import Card from "./card"

export default function CardList({ posts }) {
  return (
    <div className={styles.container}>
      {posts && posts.map(({ node }) => <Card node={node} />)}
    </div>
  )
}
