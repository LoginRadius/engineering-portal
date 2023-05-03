import React from "react"
import styles from "./cardlist.module.scss"
import Card from "./card"
import Subscribe from "./subscribe"
import headStyles from "./cardlist.module.scss"
import Docs from "../../static/consumer-identity-trend.jpg"
import AsyncTagMenu from "./tagmenu/async"
import IdentityTagMenu from "./tagmenu/identity"
import { Link, withPrefix } from "gatsby"
import TagMenu from "./tagmenu"
export default function CardList({ posts, currentPage, type }) {
  const limit = 6
  return (
    <section id="all-articles">
      <div className={styles.cardlist}>
        <div className="grid-67-33">
          <div className="grid-50 py-96">
            {type == "all"
              ? posts.map(({ node }, index) => {
                  if (
                    (currentPage - 1) * limit <= index &&
                    index < (currentPage - 1) * limit + limit
                  ) {
                    return <Card node={node} />
                  }
                })
              : posts.map(({ node }, index) => (
                  <Card node={node} key={`${type}_${index}`} />
                ))}
          </div>
          <div className={` ${styles.sidebar} py-96`}>
            <Subscribe type={type} />
            {type !== "growth" && (
              <div className={`${styles.sidebarWidget} ${styles.tags}`}>
                {type === "all" && <TagMenu />}
                {type === "engineering" && <AsyncTagMenu />}
                {type === "identity" && <IdentityTagMenu />}
              </div>
            )}
            {type === "engineering" && (
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

            <Link
              to={"/guest-blog"}
              target="_blank"
              className={`${styles.sidebarWidget} ${styles.link}`}
            >
              <div
                style={{
                  backgroundImage: `url(${withPrefix("/write-for-us.png")})`,
                }}
              />
              <h3>Write for us</h3>
            </Link>
            <div className={`${headStyles.sidebarWidget} ${headStyles.cta}`}>
              {type !== "engineering" && (
                <>
                  <div className={headStyles.image}>
                    <img src={Docs} alt="LoginRadius Docs" />
                  </div>
                  <div className={headStyles.text}>
                    <h3>Consumer Identity Trend 2022 Report</h3>
                    <a
                      className={`${headStyles.btnPrimary} btn-primary ga_event`}
                      // className={"btn-primary ga_event"}
                      href={
                        "https://www.loginradius.com/resource/consumer-digital-identity-trend-report-2022"
                      }
                      key={"consumer-identity-trend"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        eventLogger({
                          category: "Consumer Identity Trend 2022 Report",
                          action: "User clicked on Free Download button",
                          label: "Consumer Identity Trend 2022 Report",
                        })
                      }
                    >
                      {"FREE DOWNLOAD"}
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
