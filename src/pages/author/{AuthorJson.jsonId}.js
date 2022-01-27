import React from "react"
import Layout from "../../components/layout"
import { graphql } from 'gatsby'

import * as styles from "./author.module.scss"
import CardList from "../../components/cardList"
import SEO from "../../components/seo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  faTwitter,
  faLinkedin,
  faStackOverflow,
  faMedium,
} from "@fortawesome/free-brands-svg-icons"
const AuthorTemplate = ({
  data: {
    authorJson: { jsonId, bio, github, stackoverflow, linkedin, medium, twitter },
    allMarkdownRemark: { edges: postNodes },
  },
  location,
}) => (
  <Layout hideTagMenu={true}>
    <SEO
      title={`${jsonId} - Author | LoginRadius Blog`}
      description={`${jsonId} - ${bio}`}
      image={`https://github.com/${github}.png`}
      pathname={location.pathname}
    />
    <main>
      <section>
        <div className={`${styles.authorPage} pt-96`}>
          <div className={`${styles.author} d-flex`}>
            <div className={styles.authorImage}>
              <img
                src={
                  github
                    ? `https://github.com/${github}.png?size=100`
                    : `https://ui-avatars.com/api/?name=${jsonId}&size=460`
                }
                alt={jsonId}
                className="circle extra-large"
              />
            </div>
            <div className={styles.aboutAuthor}>
              <h1>{jsonId}</h1>
              <p>{bio}</p>
            </div>
            <div className={styles.authorSocialIcon}>
              <ul>
                {github && (
                  <li>
                    <a
                      href={`https://github.com/${github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon icon={faGithub} title={"Github"} />
                    </a>
                  </li>
                )}
                {stackoverflow && (
                  <li>
                    <a
                      href={`https://stackoverflow.com/users/${stackoverflow}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        title={"StackOverflow"}
                        icon={faStackOverflow}
                      />
                    </a>
                  </li>
                )}
                {linkedin && (
                  <li>
                    <a
                      href={`https://linkedin.com/in/${linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon title={"Linkedin"} icon={faLinkedin} />
                    </a>
                  </li>
                )}
                {medium && (
                  <li>
                    <a
                      href={`https://medium.com/${medium}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon title={"Medium"} icon={faMedium} />
                    </a>
                  </li>
                )}
                {twitter && (
                  <li>
                    <a
                      href={`https://twitter.com/${twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon title={"Twitter"} icon={faTwitter} />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <CardList posts={postNodes} />
    </main>
  </Layout>
)

export default AuthorTemplate

export const pageQuery = graphql`
  query PostsByAuthorId($id: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { author: { id: { eq: $id } } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            author {
              jsonId
              github
            }
            date(formatString: "MMMM DD, YYYY")
            tags
            coverImage {
              childImageSharp {
                gatsbyImageData(layout: FIXED)
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
    authorJson(id: { eq: $id }) {
      jsonId
      bio
      github
      stackoverflow
      linkedin
      medium
      twitter
    }
  }
`
