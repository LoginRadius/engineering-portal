import React from "react"
import { graphql } from "gatsby"
import SearchResult from "../components/search-result"
import Layout from "../components/layout"


const SearchPage = ({ data }) => {
    return(
        <Layout>
            <SearchResult index={ data.siteSearchIndex.index } />
        </Layout>
    )
}

export default SearchPage

export const pageQuery = graphql`
    query SearchIndex{
         siteSearchIndex {
            index
         }
      }
`
