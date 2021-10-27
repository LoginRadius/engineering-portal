import React from "react"
import Helmet from "react-helmet"
import PropTypes from "prop-types"
import { StaticQuery, withPrefix } from "gatsby"

const SEO = ({
  title = 'Async Blog — A place for developers, created by developers',
  description = 'Async Blog is a place for developers to share their expertise, find solutions for development problems, and become more efficient.',
  image = null,
  pathname = null,
  article = false,
}) => (
  <StaticQuery
    query={graphql`
      query SEOQuery {
        site {
          siteMetadata {
            defaultTitle: title
            titleTemplate
            defaultDescription: description
            siteUrl
            defaultImage: image
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          titleTemplate,
          defaultDescription,
          siteUrl,
          defaultImage,
        },
      },
    }) => {
      const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${withPrefix(pathname || "/")}`,
      }

      return (
        <>
          <Helmet
            title={seo.title}
            titleTemplate={titleTemplate}
            link={
              article
                ? [
                  {
                    rel: "canonical",
                    hreflang: "en",
                    href: seo.url,
                  },
                ]
                : [
                  {
                    rel: "canonical",
                    hreflang: "en",
                    href: `${siteUrl}${pathname || "/"}`,
                  },]
            }
          >
            <meta http-equiv="content-language" content="en"></meta>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
            <meta name="twitter:site" content="@LoginRadius" />
            <meta name="twitter:creator" content="@LoginRadius" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:url" content={seo.url} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={seo.image} />
            <meta name="twitter:image:height" content="512" />
            <meta name="twitter:image:width" content="1024" />
          </Helmet>
        </>
      )
    }}
  />
)

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
}

export default SEO
