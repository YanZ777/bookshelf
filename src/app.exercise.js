/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {client} from './utils/api-client'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

const checkLogin = async () => {
   const token = await auth.getToken()

   let user = null;
   if (token) {
      // we're logged in! Let's go get the user's data:
      user = client('me', {token}).then(data => {
         return data.user
      })
   }
   return user
}

function App() {
   const [user, setUser] = React.useState(null)

   React.useEffect(() => {
      checkLogin().then(u => setUser(u));
   }, [])

  const login = form => auth.login(form).then(u => setUser(u))
  const register = form => auth.register(form).then(u => setUser(u))
  const logout = () => {
    auth.logout()
    setUser(null)
  }

  return user ? (
    <AuthenticatedApp user={user} logout={logout} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  )
}

export {App}
