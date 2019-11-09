import React, { useContext } from "react"
import { graphql } from "gatsby"
import { BarChart } from "react-chartkick"
import "chart.js"
import { UserContext } from "../components/UserContext"
import Layout from "../components/layout"

const Company = ({ data }) => {
  const [state, setstate] = useContext(UserContext)
  console.log([...state.preferences, ...state.defaultPreferences])
  return (
    <Layout>
      <h1>{data.markdownRemark.frontmatter.title}</h1>
      <BarChart
        data={[
          { name: "Preferences", data: state.preferences },
          { name: "Default", data: state.defaultPreferences },
        ]}
      />
      <article
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      ></article>
    </Layout>
  )
}

export default Company

export const query = graphql`
  query CompanyQuery($title: String) {
    markdownRemark(frontmatter: { title: { eq: $title } }) {
      frontmatter {
        age
        category
        imgSrc
        labor
        price
        sustainability
        title
      }
      html
      excerpt(pruneLength: 120)
      fields {
        slug
      }
    }
  }
`
