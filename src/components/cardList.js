import React from "react"
import styles from "./cardlist.module.scss"
import Card from "./card"
import TagMenu from "./tagMenu"
import Subscribe from "./subscribe"
import AsyncTagMenu from "./tagmenu/async"
import IdentityTagMenu from "./tagmenu/identity"
import { withPrefix } from "gatsby"
export default function CardList({ posts, currentPage, isPagination, type }) {
  const limit = 6
  return (
    <section id="all-articles">
      <div className={styles.cardlist}>
        <div className="grid-67-33">
          <div className="grid-50 py-96">
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
          <div className={` ${styles.sidebar} py-96`}>
            <Subscribe type={type} />
            {type !== "fuel" && (
              <div className={`${styles.sidebarWidget} ${styles.tags}`}>
                {type === "all" && <TagMenu />}
                {type === "async" && <AsyncTagMenu />}
                {type === "start-with-identity" && <IdentityTagMenu />}
              </div>
            )}
            {type !== "all" && (
              <a
                className={`${styles.sidebarWidget} ${styles.link}`}
                href="https://www.loginradius.com/open-source/"
                target="_blank"
              >
                <div
                  style={{
                    backgroundImage: `url(${withPrefix("/open-source.png")})`,
                  }}
                />
                <h3>LoginRadius Open Source</h3>
              </a>
            )}

            <a
              className={`${styles.sidebarWidget} ${styles.link}`}
              href="https://www.loginradius.com/blog/async/page/guest-blog"
              target="_blank"
            >
              <div
                style={{
                  backgroundImage: `url(${withPrefix("/write-for-us.png")})`,
                }}
              />
              <h3>Write for us</h3>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
