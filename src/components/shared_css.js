import styled from "styled-components"

export const PRIMARY = "#4B627D"
export const SECONDARY = "#01912a"
export const BASIC = "#2a2b2a"
export const RADIUS = "4px"

export const Button = styled.button`
  background-color: #58a4b0;
  border: none;
  border-radius: ${RADIUS};
  width: 60px;
  color: white;
  margin: 10px;
`

export const VizColors = [
  "#00919d",
  "#23475c",
  "#f95136",
  "#ffa700",
  "#00c5ce",
  "#bce7d3",
]

export const SpacedElements = styled.div`
  & > * {
    margin: 0 10px;
  }
`
