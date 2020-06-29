require("dotenv").config({ path: `${__dirname}/.env` })

module.exports = {
  siteMetadata: {
    title: `LoginRadius Engineering`,
    titleTemplate: "%s · LoginRadius Engineering",
    description:
      "LoginRadius empowers businesses to deliver a delightful customer experience and win customer trust. Using the LoginRadius Identity Platform, companies can offer a streamlined login process while protecting customer accounts and complying with data privacy regulations.",
    siteUrl: "https://www.loginradius.com",
    feedUrl: "https://www.loginradius.com/engineering",
    image: "/engineering-blog.svg",
    owner: "LoginRadius",
    menuLinks: [
      {
        name: "Developers",
        slug: "https://www.loginradius.com/identity-experience-framework/",
      },
      {
        name: "Docs",
        slug: "https://www.loginradius.com/docs/developer",
      },
      {
        name: "Open Source",
        slug: "https://github.com/LoginRadius/",
      },
    ],
    footerLinks: [
      {
        name: "Privacy Policy",
        slug: "https://www.loginradius.com/privacy-policy",
      },
      {
        name: "Terms",
        slug: "https://www.loginradius.com/terms/",
      },
      {
        name: "Security Policy",
        slug: "https://www.loginradius.com/security-policy/",
      },
      {
        name: "Site Map",
        slug: "https://www.loginradius.com/site-map/",
      },
    ],
    socialLinks: [
      {
        name: "twitter",
        slug: "https://twitter.com/LoginRadius",
      },
      {
        name: "linkedin",
        slug: "https://www.linkedin.com/company/loginradius/",
      },
      {
        name: "youtube",
        slug: "https://www.youtube.com/user/LoginRadius",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 768,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: "Dark+ (default dark)",
              languageAliases: {
                html: "js",
              },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
        head: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `LoginRadius Engineering`,
        short_name: `LR Blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/lr-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `tags`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            tags: node => node.frontmatter.tags,
            path: node => node.fields.slug,
          },
        },
        // Optional filter to limit indexed nodes
        filter: (node, getNode) => node.frontmatter.tags !== "exempt",
      },
    },
    `gatsby-transformer-yaml`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                feedUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              let _this = this
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.feedUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.feedUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
          },
        ],
      },
    },
    {
      resolve:`gatsby-plugin-netlify`,
      options: {
        headers: {
          "/public/**/*.html": [
            "cache-control: public",
            "cache-control:  max-age=0", 
            "cache-control: must-revalidate"
          ],
          "/sw.js": [
            "cache-control: public",
            "cache-control:  max-age=0", 
            "cache-control: must-revalidate"
          ],
          "/public/page-data/*": [
            "cache-control: public",
            "cache-control:  max-age=0", 
            "cache-control: must-revalidate"
          ]
        }
      }
    }
  ],
  mapping: {
    "MarkdownRemark.frontmatter.author": `AuthorYaml`,
  },
  pathPrefix: `/engineering`,
}
