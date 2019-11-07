import React, { useRef } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import { MAROON } from "../components/shared_css"
import { Search } from "react-feather"
import useSearch from "../components/search"
import { SearchContextProvider } from "../components/SearchContext"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SearchContextProvider>
        <div
          style={{
            display: "flex",
            height: `80vh`,
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h1 style={{ color: MAROON, margin: `0` }}>ethix</h1>
          <SearchForm index={data.siteSearchIndex.index} />
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
        <Search />
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
