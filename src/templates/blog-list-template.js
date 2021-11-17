import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import CardList from "../components/cardList"
import Pagination from "../components/pagination"
import SEO from "../components/seo"

import { Tab, Tabs, TabList, TabPanel } from "react-tabs"

import Hamburger from "../../static/iconHamburger.svg"

import styles from "../components/tabs.module.scss"

const BlogList = ({ data, pageContext, location }) => {
  const total = data.allMarkdownRemark.totalCount
  const { currentPage, numPages } = pageContext
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <Layout>
      <SEO
        title={currentPage === 1 ? "" : `Page ${currentPage}`}
        image={data.allMarkdownRemark.edges[0].node.frontmatter.coverImage}
        pathname={location.pathname}
        description={
          currentPage === 1
            ? ""
            : `LoginRadius Async Blog - Page ${currentPage} of ${Math.ceil(
                total / 6
              )}`
        }
      />
      <main>
        <Tabs className={styles.blogTabs}>
          <div className={styles.containerTabs}>
            <TabList>
              <Tab>Engineering</Tab>
              <Tab>Identity</Tab>
              <Tab>Growth</Tab>
              <Tab>Culture</Tab>
              <Tab>Announcements</Tab>
            </TabList>
          </div>
          {openMenu && (
            <div className={styles.containerTabsMobile}>
              <TabList>
                <Tab>Engineering</Tab>
                <Tab>Identity</Tab>
                <Tab>Growth</Tab>
                <Tab>Culture</Tab>
                <Tab>Announcements</Tab>
              </TabList>
            </div>
          )}
          {!openMenu ? (
            <div>
              <img
                src={Hamburger}
                alt={`logo`}
                className={styles.Hamburger}
                onClick={() => {
                  setOpenMenu(!openMenu)
                }}
              />
            </div>
          ) : (
            <div
              className={styles.closeMenu}
              onClick={() => {
                setOpenMenu(!openMenu)
              }}
            >
              x
            </div>
          )}

          <TabPanel>
            <CardList posts={data.allMarkdownRemark.edges} total={total} />
            <Pagination pages={numPages} currentPage={currentPage} />
          </TabPanel>

          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>

          <TabPanel>
            <h2>Any content 3</h2>
          </TabPanel>

          <TabPanel>
            <h2>Any content 4</h2>
          </TabPanel>

          <TabPanel>
            <h2>Any content 5</h2>
          </TabPanel>
        </Tabs>
      </main>
    </Layout>
  )
}

export default BlogList

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            description
            title
            tags
            coverImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            author {
              id
              github
            }
          }
        }
      }
    }
  }
`
