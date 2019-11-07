import React, { useRef } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import { MAROON } from "../components/shared_css"
import { Search } from "react-feather"
import useSearch from "../components/search"
import { SearchContextProvider } from "../components/SearchContext"
import { Results } from "../components/searchresult"

const IndexPage = ({ data }) => {
  return (
    <Layout showFooter>
      <SearchContextProvider>
        <div
          style={{
            display: "flex",
            height: `80vmin`,
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <Link to="/">
              <h1 style={{ color: MAROON, margin: `0`, fontSize: "4vmax" }}>
                ethix
              </h1>
            </Link>
            <SearchForm index={data.siteSearchIndex.index} />
            <Results />
          </div>
        </div>
      </SearchContextProvider>
    </Layout>
  )
}

const SearchForm = ({ index }) => {
  const [, search] = useSearch(index)
  const ipt = useRef(null)
  return (
    <form
      style={{
        display: `flex`,
        alignContent: `center`,
      }}
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        search(ipt.current.value)
      }}
    >
      <input
        placeholder="Start your search here"
        style={{ width: "50vw" }}
        ref={ipt}
      ></input>
      <button
        style={{
          position: `relative`,
          padding: `6px 15px`,
          left: `-4vw`,
          border: `none`,
          background: `none`,
        }}
      >
        <Search color={MAROON} />
      </button>
    </form>
  )
}

export const query = graphql`
  query SearchIndex {
    siteSearchIndex {
      index
    }
  }
`

export default IndexPage
