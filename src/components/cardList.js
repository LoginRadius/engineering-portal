import React from "react"
import styles from "./cardlist.module.scss"
import Card from "./card"
import TagMenu from "./tagMenu"
import Opensource from "../../static/open-source.png"
import Writeforus from "../../static/write-for-us.png"
export default function CardList({ posts, currentPage, isPagination }) {
  const limit = 6
  return (
    <section className="pt-96" id="all-articles">
      <div className={styles.cardlist}>
        <div className="grid-67-33">
          <div className="grid-50">
            {posts &&
              posts.map(({ node }, index) => {
                if (isPagination) {
                  if (
                    (currentPage - 1) * limit <= index &&
                    index < (currentPage - 1) * limit + limit
                  ) {
                    return <Card node={node} />
                  }
                } else {
                  return <Card node={node} />
                }
              })}
          </div>
          <div className={`${styles.landing} ${styles.sidebar}`}>
            <div className={styles.subscribe}>
              <form>
                <input type="text" placeholder="Enter your email" />
                <button className={`${styles.btn} btn-primary`} type="submit">
                  Subscribe
                </button>
              </form>
            </div>
            <div className={`${styles.tag} ${styles.pinned}`}>
              <TagMenu />
            </div>

            <div className={`${styles.openSource} ${styles.card}`}>
              <a href="#">
                <img src={Opensource} alt="LoginRadius Open Source" />
                <h3>LoginRadius Open Source</h3>
              </a>
            </div>
            <div className={`${styles.openSource} ${styles.card}`}>
              <a href="#">
                <img src={Writeforus} alt="Write for us" />
                <h3>Write for us</h3>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
