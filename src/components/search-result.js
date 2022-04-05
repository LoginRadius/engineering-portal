import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link, navigate } from "gatsby"
import styles from "./searchpage.module.scss"

export default class SearchResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      results: [],
    }
  }

  componentDidMount() {
    const query = this.props.location.href.split("?")[1]
    if (query) {
      const index = Index.load(this.props.index)
      let searchParams = new URLSearchParams(query)
      const queryString = searchParams.get("query")
      this.setState({
        query: queryString,
        results: index
          .search(queryString, { expand: true })
          .map(({ ref }) => index.documentStore.getDoc(ref)),
      })
    } else {
      navigate("/")
    }
  }

  componentDidUpdate(prevProps) {
    const url = this.props.location.href
    const prevUrl = prevProps.location.href
    if (url != prevUrl) {
      const query = url.split("?")[1]
      const index = Index.load(this.props.index)
      let searchParams = new URLSearchParams(query)
      const queryString = searchParams.get("query")
      this.setState({
        query: queryString,
        results: index
          .search(queryString, { expand: true })
          .map(({ ref }) => index.documentStore.getDoc(ref)),
      })
    }
  }

  render() {
    const { results, query } = this.state

    return results.length ? (
      <section className="py-96">
        <div className={styles.searchContent}>
          <h2>Search results for: "{query}"</h2>

          {results.map(page => (
            <div key={page.id}>
              <h3>
                <Link to={page.slug}>{page.title}</Link>
              </h3>
              <p>{page.text}</p>
            </div>
          ))}
        </div>
      </section>
    ) : (
      <section className="py-96">
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
