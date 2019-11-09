import React, { useContext, useEffect } from "react"
import { SearchContext } from "../components/SearchContext"
import { SearchForm, Results } from "../components/searchresult"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const SearchPage = ({ location, data }) => {
  const [search, setSearch] = useContext(SearchContext)

  useEffect(() => {
    if (location.state.query) {
      setSearch(state => ({
        ...state,
        query: location.state.query,
        results: location.state.results,
      }))
    }
  }, [location.state])

  return (
    <Layout>
      <p>Searching</p>
      <div style={{ display: "flex" }}>
        <div>
          <span>Categories</span>
        </div>
        <div>
          <SearchForm index={data.siteSearchIndex.index} />
          <Results />
          <pre>{JSON.stringify(search)}</pre>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query SearchIndexer {
    siteSearchIndex {
      index
    }
  }
`

export default SearchPage
