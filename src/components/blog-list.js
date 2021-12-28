import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import CardList from "../components/cardList"
import Pagination from "../components/pagination"
import SEO from "../components/seo"

import { Tab, Tabs, TabList, TabPanel } from "react-tabs"

import Hamburger from "../../static/iconHamburger.svg"
import iconClose from "../../static/icon-close.svg"

import styles from "../components/tabs.module.scss"
import PinnedCard from "./pinnedCard"
import layoutStyles from "./layout.module.scss"

const BlogList = props => {
  const { data, pathname, currentPage } = props
  const total = data.allMarkdownRemark.totalCount
  const numPages = Math.ceil(total / 9)
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <Layout>
      <SEO
        title={currentPage === 1 ? "" : `Page ${currentPage}`}
        image={data.allMarkdownRemark.edges[0].node.frontmatter.coverImage}
        pathname={pathname}
        description={
          currentPage === 1
            ? ""
            : `LoginRadius Async Blog - Page ${currentPage} of ${Math.ceil(
                total / 6
              )}`
        }
      />
      <main>
        {
          <Tabs className={styles.blogTabs}>
            <div className={styles.containerTabs}>
              <TabList>
                <Tab>
                  <Link to="/async">Engineering</Link>
                </Tab>
                <Tab>
                  <Link to="/fuel">Identity</Link>
                </Tab>
                <Tab>
                  <Link to="/swi">Growth</Link>
                </Tab>
                <Tab>Culture</Tab>
                <Tab>Announcements</Tab>
                {/* <hr /> */}
              </TabList>
            </div>
            {openMenu && (
              <div className={styles.containerTabsMobile}>
                <TabList>
                  <Tab>
                    <Link to="/async">Engineering</Link>
                  </Tab>
                  <Tab>
                    <Link to="/fuel">Identity</Link>
                  </Tab>
                  <Tab>
                    <Link to="/swi">Growth</Link>
                  </Tab>
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
              <div className={styles.closeMenu}>
                <img
                  src={iconClose}
                  alt={`logo`}
                  onClick={() => {
                    setOpenMenu(!openMenu)
                  }}
                />
              </div>
            )}
            <div className={layoutStyles.pinnedwrap}>
              <div className={layoutStyles.blogContentPinned}>
                {<PinnedCard />}
              </div>
            </div>

            <TabPanel>
              <CardList
                posts={data.allMarkdownRemark.edges}
                total={total}
                currentPage={currentPage}
              />
              <Pagination
                pages={numPages}
                currentPage={parseInt(currentPage)}
                type={data.allMarkdownRemark.edges[0].node.frontmatter.type}
              />
            </TabPanel>

            <TabPanel>
              <CardList
                posts={data.allMarkdownRemark.edges}
                total={total}
                currentPage={currentPage}
              />
              <Pagination
                pages={numPages}
                currentPage={parseInt(currentPage)}
                type={data.allMarkdownRemark.edges[0].node.frontmatter.type}
              />
            </TabPanel>

            <TabPanel>
              <CardList
                posts={data.allMarkdownRemark.edges}
                total={total}
                currentPage={currentPage}
              />
              <Pagination
                pages={numPages}
                currentPage={parseInt(currentPage)}
                type={data.allMarkdownRemark.edges[0].node.frontmatter.type}
              />
            </TabPanel>

            <TabPanel>
              <h2>Any content 4</h2>
            </TabPanel>

            <TabPanel>
              <h2>Any content 5</h2>
            </TabPanel>
          </Tabs>
        }
      </main>
    </Layout>
  )
}

export default BlogList
