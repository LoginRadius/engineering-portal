import { graphql, StaticQuery } from "gatsby"
import React from "react"
import Footer from "./footer"
import Header from "./header"
import layoutStyles from "./layout.module.scss"
import PinnedCard from "./pinnedCard"
import AllPinned from "./pinnedNode/allPinned"
import EngPinned from "./pinnedNode/engineeringPinned"
import GrowthPinned from "./pinnedNode/growthPinned"
import IdentityPinned from "./pinnedNode/identityPinned"

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
              <div className={layoutStyles.pinnedwrap}>
                <div className={layoutStyles.blogContentPinned}>
                  {pinned ? (
                    pinnedData.length ? (
                      <PinnedCard node={pinnedData[0].node} />
                    ) : (
                      getFirstNode(type)
                    )
                  ) : null}
                </div>
              </div>
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

const getFirstNode = type => {
  if (type === "engineering") {
    return <EngPinned />
  } else if (type === "growth") {
    return <GrowthPinned />
  } else if (type === "identity") {
    return <IdentityPinned />
  } else {
    return <AllPinned />
  }
}

export default Layout
