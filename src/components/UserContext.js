import React, { useState, useContext } from "react"

const UserContext = React.createContext([{}, () => {}])

const UserContextProvider = props => {
  const [state, setState] = useState({
    name: "",
    loggedIn: false,
  })
  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  )
}

const useUserContext = () => {
  const [, setState] = useContext(UserContext)

  const updateUser = async name => {
    if (name) {
      console.log(name)
      await setState({ name: name, loggedIn: true })
    } else {
      await setState(state => ({ ...state, name: ``, loggedIn: false }))
    }
  }

  return [updateUser]
}

export { UserContext, UserContextProvider, useUserContext }
