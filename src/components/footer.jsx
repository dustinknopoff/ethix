import React, { useState, Fragment } from "react"
import { ChevronDown } from "react-feather"
import { PRIMARY, BASIC } from "./shared_css"
import styled, { css } from "styled-components"
import { categoryToIcon } from "./math"
import { PlayPreferences } from "../pages/profile"
import { Link } from "gatsby"

const Footer = () => {
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
        </Panels>
        <Flex80>
          <h3 style={{ paddingRight: "15px" }}>Find the right brand for you</h3>
          <p style={{ flexGrow: 2, fontSize: "22px" }}>
            With ethix you build a profile of the things you care about. From
            companies for your age group to sustainability practices, we provide
            scores for over 100 brands defining how they align with you.
          </p>
        </Flex80>
      </div>

      <Flex80 min={true}>
        <h3>What We Measure</h3>
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

      <Flex80 min={true}>
        <h3>Interactive Chart Explorer</h3>
        <div>
          <PlayPreferences />
          <Link to="/login">
            See it in action on a real company by making an account today!
          </Link>
        </div>
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
  ${props =>
    props.min &&
    css`
      min-height: 80vh;
    `}

  @media only screen and (max-width: 440px) {
    flex-direction: column;
  }
`

const Panels = styled.div`
  height: 40vh;
  overflow: hidden;
  display: flex;
  max-width: 960px;
  margin: 0 auto;
  margin-top: 10vh;
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
