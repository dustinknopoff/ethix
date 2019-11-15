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
}
