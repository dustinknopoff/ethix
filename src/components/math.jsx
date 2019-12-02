import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"

export const MAX = 5

export const apply = (raw, weight) => (raw * weight) / MAX

export const categoryToIcon = {
  Labor: <FontAwesomeIcon icon={fas.faUserFriends} />,
  Sustainability: <FontAwesomeIcon icon={fab.faEnvira} />,
  Price: <FontAwesomeIcon icon={fas.faDollarSign} />,
  "Local Source": <FontAwesomeIcon icon={fas.faStreetView} />,
  "Recent Scandals": <FontAwesomeIcon icon={fas.faHourglassStart} />,
  "Age Match": <FontAwesomeIcon icon={fas.faHourglassStart} />,
  Privacy: <FontAwesomeIcon icon={fas.faUserSecret} />,
}

export const numberToGrade = val => {
  let num = parseInt(val < 1 ? val * 100 : val)
  if (num <= 50) return "F"
  if (num <= 63) return "D-"
  if (num <= 66) return "D"
  if (num <= 69) return "D+"
  if (num <= 73) return "C-"
  if (num <= 76) return "C"
  if (num <= 79) return "C+"
  if (num <= 83) return "B-"
  if (num <= 86) return "B"
  if (num <= 89) return "B+"
  if (num <= 93) return "A-"
  if (num <= 96) return "A"
  if (num <= 100) return "A+"
}
