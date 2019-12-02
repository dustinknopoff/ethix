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
        <div style={{ width: "25vw" }}>
          <img
            src="https://res.cloudinary.com/dknopoff/image/upload/v1575319116/ethix/Screen_Shot_2019-12-02_at_3.37.55_PM.png"
            width="150px"
          />
        </div>
        <div>
          <SearchForm
            index={data.siteSearchIndex.index}
            existing={search.query}
          />
          <Results more />
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
    site {
      siteMetadata {
        categories
      }
    }
  }
`

export default SearchPage
