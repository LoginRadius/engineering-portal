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
import Img from 'gatsby-image'

export default ({
  data: {
    authorYaml: { id, bio, github, stackoverflow, featuredImage, linkedin, medium, twitter },
    allMarkdownRemark: { edges: postNodes },
  },
  location,
}) => {
  const authorImagePath = featuredImage && featuredImage.childImageSharp.fluid
  let imageName = `https://github.com/${github}.png?size=50`


  return (
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
                
                {authorImagePath ?
                  <Img fluid={authorImagePath} className={`circle large`} Tag="div" alt={id}/>
                  : <img className={`circle large`} src={imageName} alt={id} />
                }

            </div>
            <div class={styles.aboutAuthor}>
              <h3>{id}</h3>
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
)}

export const pageQuery = graphql`
  query PostsByAuthorId($authorId: String!) {
    allMarkdownRemark(
      filter: { fields: { authorId: { eq: $authorId } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            author {
            id
            github
            featuredImage {
            childImageSharp {
                fluid(maxWidth: 100, quality: 100){
                      ...GatsbyImageSharpFluid
                }
              }
            }
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
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 100, quality: 100){
                  ...GatsbyImageSharpFluid
            }
          }
      }
      linkedin
      medium
      twitter
    }
}
`
