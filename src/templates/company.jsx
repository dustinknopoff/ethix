import React from "react"
import { graphql, Link } from "gatsby"
import "chart.js"
import { UserContext } from "../components/UserContext"
import Layout from "../components/layout"
import { BASIC } from "../components/shared_css"
import { apply, numberToGrade } from "../components/math"
import { BarChart } from "react-chartkick"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"

const numToWeight = {
  6: 44,
  5: 22,
  4: 12,
  3: 10,
  2: 7,
  1: 5,
}

const Company = ({ data }) => {
  let [state] = React.useContext(UserContext)
  const attrs = data.mdx.frontmatter.attributes
  console.log(attrs)
  const MAX = Array.from(Object.keys(attrs)).filter(ky => attrs[ky] !== null)
    .length
  let info = [
    {
      name: "Default",
      data: state.defaultCategories.map((val, _) => {
        return [val, attrs[val.replace(" ", "_")]]
      }),
    },
  ]
  state.loggedIn &&
    info.push({
      name: "Weighted",
      data: state.categories.map((val, idx) => {
        return [val, parseInt(apply(attrs[val.replace(" ", "_")], MAX - idx))]
      }),
    })
  let unweighted_sum =
    state.defaultCategories.reduce((acc, val, idx) => {
      if (attrs[val.replace(" ", "_")] !== null) {
        let vll = (attrs[val.replace(" ", "_")] / MAX) * 100
        return acc + vll
      }
      return acc
    }, 0) / MAX
  let weighted_sum =
    state.categories.reduce((acc, val, idx) => {
      if (attrs[val.replace(" ", "_")] !== null) {
        let out_of_one_h =
          (parseFloat(attrs[val.replace(" ", "_")]) / MAX) * 100
        let weight = numToWeight[MAX - idx + 1] / 100
        let vll = out_of_one_h * weight
        return acc + vll * MAX
      } else {
        return acc
      }
    }, 0) / MAX
  console.log(weighted_sum)
  return (
    <Layout>
      <h1 style={{ fontSize: "72px", paddingTop: "40px" }}>
        {data.mdx.frontmatter.title}
      </h1>
      <GraphScore>
        <BarChart
          data={info}
          colors={["#4b627d", "#56B8B8"]}
          max={5}
          library={{ fontColor: BASIC }}
          round={2}
        />
        <div
          style={{
            flexGrow: 2,
            padding: "80px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {state.loggedIn && (
            <div>
              <h1 style={{ fontSize: "10vmin", textAlign: "center" }}>
                <span style={{ color: "#4a7b7c" }}>
                  {numberToGrade(weighted_sum)}
                </span>
              </h1>
              <HoverLink as={Link} to="/profile">
                Based on your criteria
              </HoverLink>
            </div>
          )}
          <div>
            <h1
              style={{
                fontSize: state.loggedIn ? "5vmin" : "10vmin",
                textAlign: "center",
              }}
            >
              <span>{numberToGrade(unweighted_sum)}</span>
            </h1>
            <HoverLink
              as={Link}
              to="/profile"
              style={{
                textAlign: "center",
                fontSize: state.loggedIn && "18px",
              }}
            >
              {state.loggedIn
                ? "Raw Score"
                : `Create an account to see how 
              ${data.mdx.frontmatter.title} matches with what you care
              about!`}
            </HoverLink>
          </div>
        </div>
      </GraphScore>
      <Article>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </Article>
    </Layout>
  )
}

export default Company

export const query = graphql`
  query CompanyQuery($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        category
        imgSrc
        attributes {
          Labor
          Local_Source
          Recent_Scandals
          Price
          Sustainability
          Privacy
        }
        title
      }
      body
      fields {
        slug
      }
    }
  }
`
export const GraphScore = styled.div`
  display: flex;
  alignitems: center;

  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`

export const Article = styled.article`
  columns: 2;

  @media only screen and (max-width: 768px) {
    columns: 1;
  }
`
export const HoverLink = styled.a`
  &:hover {
    text-decoration: underline;
  }
`
