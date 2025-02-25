import React from "react"
import Layout from "../../components/layout"
import { withPrefix } from "gatsby"
import styles from "./author.module.scss"
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
    authorYaml: {
      id,
      bio,
      github,
      stackoverflow,
      linkedin,
      medium,
      twitter,
      avatar,
    },
    allMarkdownRemark: { edges: postNodes },
  },
  location,
}) => (
  <Layout hideTagMenu={true}>
    <SEO
      title={`${id} - Author`}
      description={`${id} - ${bio}`}
      image={
        avatar
          ? `${withPrefix("avatar/")}${avatar}`
          : github
          ? `https://github.com/${github}.png?size=100`
          : `https://ui-avatars.com/api/?name=${id}&size=460`
      }
      pathname={location.pathname}
    />
    <main>
      <section>
        <div className={`${styles.authorPage} pt-96`}>
          <div className={`${styles.author} d-flex`}>
            <div className={styles.authorImage}>
              <img
                src={
                  avatar
                    ? `${withPrefix("avatar/")}${avatar}`
                    : github
                    ? `https://github.com/${github}.png?size=100`
                    : `https://ui-avatars.com/api/?name=${id}&size=460`
                }
                alt={id}
                className="circle extra-large"
                width={100}
                height={100}
              />
            </div>
            <div className={styles.aboutAuthor}>
              <h1>{id}</h1>
              <p dangerouslySetInnerHTML={{ __html: bio }}></p>
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
      filter: { fields: { authorId: { eq: $id } } }
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
              avatar
            }
            date(formatString: "MMMM DD, YYYY")
            updated_date(formatString: "MMMM DD, YYYY")
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
    authorYaml(id: { eq: $id }) {
      id
      bio
      github
      stackoverflow
      linkedin
      medium
      twitter
      avatar
    }
  }
`
