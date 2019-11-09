import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import { MAROON } from "../components/shared_css"
import { Results, SearchForm } from "../components/searchresult"

const IndexPage = ({ data }) => {
  return (
    <Layout showFooter>
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
    </Layout>
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
