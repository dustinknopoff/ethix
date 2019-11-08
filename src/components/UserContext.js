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
    preferences: [
      ["Labor", 17],
      ["Sustainability", 16],
      ["Age Match", 16],
      ["Local Source", 17],
      ["Recent Scandals", 17],
      ["Price", 17],
    ],
    defaultPreferences: [
      ["Labor", 17],
      ["Sustainability", 16],
      ["Age Match", 16],
      ["Local Source", 17],
      ["Recent Scandals", 17],
      ["Price", 17],
    ],
  })
  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
