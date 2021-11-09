import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"
import styles from "./searchpage.module.scss"

export default class SearchResult extends Component {
  constructor(props) {
    super(props)

    const query =
      typeof window !== "undefined" &&
      window.location.search.replace("%20", " ").replace("?", "")
    const index = Index.load(this.props.index)

    this.state = {
      query: query,
      results: index
        .search(query, { expand: true })
        // Map over each ID and return the full document
        .map(({ ref }) => index.documentStore.getDoc(ref)),
    }
  }

  render() {
    const { results, query } = this.state

    return results.length ? (
      <section className="py-80">
        <div className={styles.searchContent}>
          <h2>Search results for: "{query}"</h2>

          {results.map(page => (
            <div key={page.id}>
              <h3>
                <Link to={"/" + page.path}>{page.title}</Link>
              </h3>
              <p>{page.text}</p>
              {/*<p>{page.tags ? page.tags.join(`, `) : ""}</p>*/}
            </div>
          ))}
        </div>
      </section>
    ) : (
      <section className="py-80">
        <div className={styles.searchContent}>
          <h2>Search results for: "{query}"</h2>

          <div>
            <h3>There are no matches for your search, please try again.</h3>
          </div>
        </div>
      </section>
    )
  }
}
