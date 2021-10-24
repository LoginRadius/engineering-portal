import { graphql, StaticQuery } from "gatsby"
import React from "react"
import Footer from "./footer"
import FreeTrial from "./freeTrial"
import Header from "./header"
import * as layoutStyles from "./layout.module.scss"
import favicon from "../../static/favicon.png"
import Helmet from "react-helmet"
import SEO from "./seo"
import PinnedCard from "./pinnedCard"

const Layout = ({ hideTagMenu, postPage, children, pinned }) => {
  return (
    <div className={layoutStyles.container}>
      <Helmet>
        <link rel="icon" href={favicon} />
      </Helmet>
      <StaticQuery
        query={graphql`
          query {
            siteSearchIndex {
              index
            }
            site {
              siteMetadata {
                title
                description
                menuLinks {
                  name
                  slug
                  class
                }
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
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
            ) {
              group(field: frontmatter___tags) {
                tag: fieldValue
                totalCount
              }
            }
          }
        `}
        render={data => {
          return (
            <>
              <SEO />
              <Header
                menuLinks={data.site.siteMetadata.menuLinks}
                searchIndex={data.siteSearchIndex.index}
              />
              <div className={layoutStyles.pinnedwrap}>
                <div className={layoutStyles.blogContentPinned}>
                  {pinned && <PinnedCard />}
                </div>
              </div>
              <div className={layoutStyles.blogContent}>
                <div className={layoutStyles.content}>{children}</div>
              </div>
              <FreeTrial />
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
