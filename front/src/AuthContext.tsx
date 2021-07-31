import { ComponentChildren, createContext, FunctionComponent, h } from "preact"

import { route } from "preact-router"
import { useEffect, useState } from "preact/hooks"

import { clearToken, getExp, getToken } from "./lib/token"

type Props = {
  children: ComponentChildren
}

type AuthContextType = {
  token: string | null
  exp: string | null
  logoutFunc: () => void
}

export const AuthContext = createContext<AuthContextType>({ token: null, exp: null, logoutFunc: () => null })

const AuthProvider: FunctionComponent<Props> = ({ children }: Props) => {
  const [token, setToken] = useState<string>("")
  const [exp, setExp] = useState<string>("")

  const logoutFunc: () => void = () => {
    clearToken()
    route("/login", true)
  }

  useEffect(() => {
    const t = getToken()
    const e = getExp()
    if (t) setToken(t)
    if (e) {
      setExp(e)
      if (new Date(e) < new Date()) logoutFunc()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        token,
        exp,
        logoutFunc,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
