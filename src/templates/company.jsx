import React from "react"
import { graphql, Link } from "gatsby"
import "chart.js"
import { UserContext } from "../components/UserContext"
import Layout from "../components/layout"
import { BASIC } from "../components/shared_css"
import { apply, numberToGrade, categoryToIcon } from "../components/math"
import { BarChart } from "react-chartkick"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import Popup from "reactjs-popup"

const numToWeight = {
  6: 44,
  5: 22,
  4: 12,
  3: 10,
  2: 7,
  1: 5,
}

const Raw = ({ content, max, score }) => (
  <div>
    <h3>How we calculate a raw score</h3>
    <p>
      All categories are rated by our experts on a scale of 1 to 5. We then
      average these scores to generate a letter grade.
    </p>
    <ul style={{ listStyleType: "none" }}>
      {content.map(([name, val], idx) => {
        if (val) {
          return (
            <li style={{ padding: "5px" }}>
              <span>
                {categoryToIcon[name]} {name}
              </span>
              : <span style={{ paddingRight: "5px" }}>{(val / max) * 100}</span>
            </li>
          )
        }
      })}
    </ul>
    <hr />
  </div>
)

const Criterion = ({ content, max, score }) => (
  <div>
    <h3>How we calculate a weighted score</h3>
    <p>
      All categories are rated by our experts on a scale of 1 to 5. We then
      weigh these scores based on your ordering on the{" "}
      <Link to="/profile">profile page.</Link>
    </p>
    <div className="crits">
      <div>
        <h5 style={{ textAlign: "center", fontSize: "22px", color: BASIC }}>
          Raw
        </h5>
        <ul style={{ listStyleType: "none" }}>
          {content[0].data.map(([name, val], idx) => {
            if (val) {
              return (
                <li style={{ padding: "5px" }} key={idx}>
                  <span>
                    {categoryToIcon[name]} {name}
                  </span>
                  :{" "}
                  <span style={{ paddingRight: "5px" }}>
                    {(val / max) * 100}
                  </span>
                </li>
              )
            }
          })}
        </ul>
      </div>
      <div>
        <h5 style={{ textAlign: "center", fontSize: "22px", color: BASIC }}>
          Weighed
        </h5>
        <ul style={{ listStyleType: "none" }}>
          {content[1].data.map(([name, val], idx) => {
            if (val) {
              return (
                <li style={{ padding: "5px" }} key={idx}>
                  <span>
                    {categoryToIcon[name]} {name}
                  </span>
                  :{" "}
                  <span style={{ paddingRight: "5px" }}>
                    {(val / max) * 100}
                  </span>
                </li>
              )
            }
          })}
        </ul>
      </div>
    </div>
    <hr />
  </div>
)

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
        let weight = MAX - idx
        weight = weight <= 0 ? weight + 1 : weight
        return [val, parseFloat(apply(attrs[val.replace(" ", "_")], weight))]
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
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "8vw", paddingTop: "40px" }}>
          {data.mdx.frontmatter.title}
        </h1>
        <img
          src={data.mdx.frontmatter.imgSrc}
          alt={`${data.mdx.frontmatter.title}'s logo`}
          className="logo"
        />
      </div>
      <GraphScore>
        <BarChart
          data={info}
          colors={["#4b627d", "#56B8B8"]}
          max={5}
          library={{ fontColor: BASIC }}
          round={2}
        />
        <div className="scores">
          {state.loggedIn && (
            <div>
              <h1 style={{ fontSize: "6vw", textAlign: "center" }}>
                <span>{numberToGrade(weighted_sum)}</span>
              </h1>
              <Popup
                trigger={
                  <button className="button">Based on your criteria</button>
                }
                modal
              >
                <Criterion content={info} max={MAX} score={weighted_sum} />
              </Popup>
            </div>
          )}
          <div>
            <h1
              style={{
                fontSize: "6vw",
                textAlign: "center",
              }}
            >
              <span>{numberToGrade(unweighted_sum)}</span>
            </h1>
            {state.loggedIn ? (
              <Popup
                trigger={<button className="button">Raw Score</button>}
                modal
              >
                <Raw content={info[0].data} max={MAX} score={unweighted_sum} />
              </Popup>
            ) : (
              <HoverLink
                as={Link}
                to="/profile"
                style={{
                  textAlign: "center",
                  fontSize: state.loggedIn && "18px",
                }}
              >
                {`Create an account to see how 
              ${data.mdx.frontmatter.title} matches with what you care
              about!`}
              </HoverLink>
            )}
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

  @media only screen and (max-width: 440px) {
    width: 30vw;
  }
`
