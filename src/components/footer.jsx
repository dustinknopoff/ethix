import React, { useState, Fragment } from "react"
import { ChevronDown } from "react-feather"
import { PRIMARY, BASIC } from "./shared_css"
import styled from "styled-components"
import { categoryToIcon } from "./math"

const Footer = () => {
  const [category, setcategory] = useState("Labor")
  return (
    <div
      style={{
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        color: BASIC,
      }}
    >
      <a
        href="#info"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span>Tell Me More</span>
        <ChevronDown size={60} color={PRIMARY} />
      </a>
      <div style={{ minHeight: "80vh" }}>
        <Panels name="info" id="info">
          <Panel
            src={
              "https://res.cloudinary.com/dknopoff/image/upload/e_improve,w_300,h_600,c_thumb,g_auto/v1573138553/ethix/marianne-krohn-ZEn36ZMaloc-unsplash.jpg"
            }
          />
          <Panel
            src={
              "https://res.cloudinary.com/dknopoff/image/upload/e_improve,w_300,h_600,c_thumb,g_auto/v1573138562/ethix/christopher-burns-8KfCR12oeUM-unsplash.jpg"
            }
          />
          <Panel
            src={
              "https://res.cloudinary.com/dknopoff/image/upload/e_improve,w_300,h_600,c_thumb,g_auto/v1573138563/ethix/omar-lopez-9w20MZ0lsK8-unsplash.jpg"
            }
          />
          <Panel
            src={
              "https://res.cloudinary.com/dknopoff/image/upload/v1573138551/ethix/pierre-chatel-innocenti-LGblf4EH4yk-unsplash.jpg"
            }
          />
        </Panels>
        <h3 style={{ width: "100%" }}>Find the right brand for you</h3>
        <p>
          With ethix you build a profile of the things you care about. From
          companies for your age group to sustainability practices, we provide
          scores for over 100 brands defining how they align with you.
        </p>
      </div>

      <Flex80>
        <FlexColumn>
          {Array.from(Object.keys(categoryToInfo)).map(ky => (
            <Fragment>
              <h4
                style={{
                  textAlign: "left",
                  padding: "20px",
                }}
              >
                {ky} {categoryToIcon[ky]}
              </h4>
              <p
                style={{
                  padding: "20px",
                  fontSize: "22px",
                }}
              >
                {categoryToInfo[ky]}
              </p>
            </Fragment>
          ))}
        </FlexColumn>
      </Flex80>
    </div>
  )
}

const categoryToInfo = {
  Labor: `Our experts take in to account fair trade certifications, safe working
          environments, employee treatment and more in determining the score on labor practices for
          companies.`,
  Sustainability: `Our experts take in to account environmental certifications, membership in environmentally conscious organizations, lobbying, recyclability and safety of materials utilized, and more in determining the score on sustainability for companies.`,
  "Local Source": `Our experts take in to account proximity to users, company usage of local community products, impact on communities of a company, and more in determining the score on local source for companies.`,
  "Recent Scandals": `Our experts scour all of the latest news stories pertaining to a companies violation of standards of labor practices, environmental issues, privacy violations, and more in determining the score on recent scandals for companies.`,
  Privacy: `Our experts take in to account GDPR compliance, past hacks, privacy policies, terms of service, and more to determine the score on privacy for companies.`,
}

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  @media only screen and (max-width: 440px) {
    flex-direction: row;
    max-width: 90vw;
    flex-wrap: wrap;

    > button {
      width: 50% !important;
      height: 40px;
    }
  }
`

const Flex80 = styled.div`
  width: 100%;
  display: flex;
  min-height: 80vh;

  @media only screen and (max-width: 440px) {
    flex-direction: column;
  }
`

const Panels = styled.div`
  margin-top: 10vh;
  height: 40vh;
  overflow: hidden;
  display: flex;
  max-width: 960px;
`

const Panel = styled.img`
  color: white;
  text-align: center;
  align-items: center;
  /* Safari transitionend event.propertyName === flex */
  /* Chrome + FF transitionend event.propertyName === flex-grow */
  transition: font-size 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11),
    flex 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11), background 0.2s;
  font-size: 20px;
  background-size: cover;
  background-position: center;
  flex: 1;
  justify-content: center;
  display: flex;
  flex-direction: column;
`

export default Footer
