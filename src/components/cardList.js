import React from "react"
import styles from "./cardlist.module.scss"
import Card from "./card"
import Opensource from "../../static/open-source.png"
import Writeforus from "../../static/write-for-us.png"
export default function CardList({ posts, currentPage }) {
  const limit = 9
  return (
    <section className="pt-96" id="all-articles">
      <div className={styles.cardlist}>
        <div className="grid-67-33">
          <div className="grid-50">
            {posts && posts.map(({ node }) => <Card node={node} />)}
          </div>
          <div className={`${styles.landing} ${styles.sidebar}`}>
            <div>
              <form>
                <input type="text" placeholder="Enter your email" />
                <button className={`${styles.btn} btn-primary`} type="submit">
                  Subscribe
                </button>
              </form>
            </div>
            <div className={`${styles.tag} ${styles.pinned}`}>
              <a href="#">Authentication</a>
              <a href="#">JWT</a>
              <a href="#">Cookie</a>
              <a href="#">C#</a>
              <a href="#">Init</a>
              <a href="#">Properties</a>
              <a href="#">CSP</a>
              <a href="#">OAuth</a>
              <a href="#">QA</a>
              <a href="#">Cloud</a>
              <a href="#">Testing</a>
              <a href="#">Design</a>
              <a href="#">UI</a>
              <a href="#">UX</a>
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
