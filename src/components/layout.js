import { graphql, StaticQuery } from "gatsby"
import React from "react"
import Footer from "./footer"
import Header from "./header"
import PinnedCard from "./pinnedCard"

const Layout = ({ postPage, children, pinned, pinnedData, pathname, type }) => {
  return (
    <div>
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
              <div className={layoutStyles.pinnedwrap}>
                <div className={layoutStyles.blogContentPinned}>
                  {pinned && <PinnedCard pinnedData={pinnedData} />}
                </div>
              </div>
              <div>
                <div>{children}</div>
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
