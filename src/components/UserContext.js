import React, { useState } from "react"

const UserContext = React.createContext()

const UserContextProvider = props => {
  const [state, setState] = useState({
    name: "",
    loggedIn: false,
    info: {
      age: 0,
      location: "",
    },
    categories: [
      "Labor",
      "Sustainability",
      "Local Source",
      "Recent Scandals",
      "Price",
      "Privacy",
    ],
    defaultCategories: [
      "Labor",
      "Sustainability",
      "Local Source",
      "Recent Scandals",
      "Price",
      "Privacy",
    ],
  })
  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
