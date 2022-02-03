import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link, navigate } from "gatsby"
import styles from "./searchpage.module.scss"

export default class SearchResult extends Component {
  constructor(props) {
    super(props)

    const index = Index.load(this.props.index)
    const query = props.location.state ? props.location.state.query : ""
    this.state = {
      query: query,
      results: index
        .search(query, { expand: true })
        .map(({ ref }) => index.documentStore.getDoc(ref)),
    }
  }

  componentDidMount() {
    if (!this.state.query) {
      navigate("/")
    }
  }

  componentDidUpdate(prevProps) {
    const query = this.props.location.state.query
    const prevquery = prevProps.location.state.query
    if (query != prevquery) {
      const index = Index.load(this.props.index)
      this.setState({
        query: query,
        results: index
          .search(query, { expand: true })
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
