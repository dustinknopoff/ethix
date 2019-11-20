import React from "react"
import { ChevronDown } from "react-feather"
import { PRIMARY, BASIC } from "./shared_css"
import styled from "styled-components"

const Footer = () => (
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
    <div>
      <h3>Placeholder: Labor Info</h3>
      <h3>Placeholder: Sustainability</h3>
      <h3>Placeholder: Age Match</h3>
      <h3>Placeholder: Recent Scandals</h3>
    </div>
  </div>
)

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
