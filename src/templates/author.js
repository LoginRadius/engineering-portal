import React from "react"
import Layout from "../components/layout"

import styles from "./author.module.scss"
import CardList from "../components/cardList"
import SEO from "../components/seo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  faTwitter,
  faLinkedin,
  faStackOverflow,
  faMedium,
} from "@fortawesome/free-brands-svg-icons"

export default ({
  data: {
    authorYaml: { id, bio, github, stackoverflow, linkedin, medium, twitter },
    allMarkdownRemark: { edges: postNodes },
  },
  location,
}) => (
  <Layout hideTagMenu={true}>
    <SEO
      title={id}
      description={`${id} - ${bio}`}
      image={github}
      location={location.pathname}
    />
    <main>
      <section>
        <div class={`${styles.authorPage} pt-80`}>
          <div class={`${styles.author} d-flex`}>
            <div class={styles.authorImage}>
              <img
                src={
                  github
                    ? `https://github.com/${github}.png?size=100`
                    : `https://ui-avatars.com/api/?name=${id}&size=460`
                }
                alt={id}
                class="circle extra-large"
              />
            </div>
            <div class={styles.aboutAuthor}>
              <h1>{id}</h1>
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

export const pageQuery = graphql`
  query PostsByAuthorId($authorId: String!) {
    allMarkdownRemark(
      filter: { fields: { authorId: { eq: $authorId } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            author {
              id
              github
            }
            date(formatString: "MMMM DD, YYYY")
            tags
            coverImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          fields {
            authorId
            slug
          }
        }
      }
    }
    authorYaml(id: { eq: $authorId }) {
      id
      bio
      github
      stackoverflow
      linkedin
      medium
      twitter
    }
  }
`
