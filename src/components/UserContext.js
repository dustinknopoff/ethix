import React, { useState } from "react"

const UserContext = React.createContext([{}, () => {}])

const UserContextProvider = props => {
  const [state, setState] = useState({
    name: "",
    loggedIn: true,
  })
  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
