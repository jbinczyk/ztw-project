import React from "react"

import { UserContext } from "../../../contexts/UserContext"
import { Redirect } from "react-router-dom"

const Signout = () => {

  return (
    <UserContext.Consumer>
      {(context) => {
        const { signOut } = context

        signOut()
        return (
          <Redirect to="/" />
        )
      }}
    </UserContext.Consumer>
  )
}

export default Signout
