import React, { useEffect } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import { PRIMARY } from "../components/shared_css"
import { Results, SearchForm } from "../components/searchresult"

const IndexPage = ({ data }) => {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function(e) {
        e.preventDefault()

        document.querySelector(anchor.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        })
      })
    })
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener("click", function(e) {
          e.preventDefault()

          document.querySelector(anchor.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
          })
        })
      })
    }
  }, [])
  return (
    <Layout showFooter>
      <div
        style={{
          display: "flex",
          height: `80vh`,
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <Link to="/">
            <h1 style={{ color: PRIMARY, margin: `0`, fontSize: "4vmax" }}>
              ethix
            </h1>
          </Link>
          <SearchForm index={data.siteSearchIndex.index} />
          <Results />
          <span>
            Brand discovery that matches what you care about.
            <a href="#info" style={{ marginLeft: "20px" }}>
              See how it works
            </a>
          </span>
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
