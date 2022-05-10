import { graphql, StaticQuery } from "gatsby"
import React from "react"
import Footer from "./footer"
import Header from "./header"
import layoutStyles from "./layout.module.scss"
import PinnedCard from "./pinnedCard"

const Layout = ({ postPage, children, pinned, pinnedData, pathname, type }) => {
  return (
    <div className={layoutStyles.container}>
      <StaticQuery
        query={graphql`
          query {
            siteSearchIndex {
              index
            }
            site {
              siteMetadata {
                footerLinks {
                  name
                  slug
                }
                socialLinks {
                  name
                  slug
                }
              }
            }
          }
        `}
        render={data => {
          return (
            <>
              <Header
                searchIndex={data.siteSearchIndex.index}
                pathname={pathname}
                type={type}
              />
              {pinned ? (
                <div className={layoutStyles.pinnedwrap}>
                  <div className={layoutStyles.blogContentPinned}>
                    <PinnedCard node={pinnedData} />
                  </div>
                </div>
              ) : null}
              <div className={layoutStyles.blogContent}>
                <div className={layoutStyles.content}>{children}</div>
              </div>
              <Footer
                menuLinks={data.site.siteMetadata.footerLinks}
                socialLinks={data.site.siteMetadata.socialLinks}
                postPage={postPage}
              />
            </>
          )
        }}
      />
    </div>
  )
}

export default Layout
