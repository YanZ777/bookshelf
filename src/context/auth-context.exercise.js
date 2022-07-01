import * as React from 'react'

const AuthContext = React.createContext()

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a context provider`)
  }
  return context
}

export {AuthContext, useAuth}
