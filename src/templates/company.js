import React, { useContext } from "react"
import { graphql } from "gatsby"
import { BarChart } from "react-chartkick"
import "chart.js"
import { UserContext } from "../components/UserContext"
import Layout from "../components/layout"
import { BASIC, VizColors } from "../components/shared_css"
import { apply } from "../components/math"

const Company = ({ data }) => {
  const [state, setState] = React.useContext(UserContext)
  let info = [
    {
      name: "Default",
      data: state.defaultCategories.map((val, idx) => {
        return [val, data.markdownRemark.frontmatter[val.replace(" ", "_")]]
      }),
    },
  ]
  state.loggedIn &&
    info.push({
      name: "Weighted",
      data: state.categories.map((val, idx) => {
        return [
          val,
          apply(
            data.markdownRemark.frontmatter[val.replace(" ", "_")],
            5 - idx
          ),
        ]
      }),
    })

  return (
    <Layout>
      <h1 style={{ fontSize: "72px", paddingTop: "40px" }}>
        {data.markdownRemark.frontmatter.title}
      </h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <BarChart
          data={info}
          colors={["#00919d", "#00c5ce"]}
          max={5}
          library={{ fontColor: BASIC }}
          round={2}
        />
        <h1 style={{ fontSize: "72px", flexGrow: 2, padding: "80px" }}>A</h1>
      </div>
      <article
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        style={{ columnCount: 2 }}
      ></article>
    </Layout>
  )
}

export default Company

export const query = graphql`
  query CompanyQuery($title: String) {
    markdownRemark(frontmatter: { title: { eq: $title } }) {
      frontmatter {
        Age_Match
        category
        imgSrc
        Labor
        Local_Source
        Recent_Scandals
        Price
        Sustainability
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
