import { ComponentChildren, createContext, FunctionComponent, h } from "preact"

import { route } from "preact-router"
import { useEffect, useState } from "preact/hooks"

type Props = {
  children: ComponentChildren
}

type AuthContextType = {
  token: string | null
  exp: string | null
  logoutFunc: () => void
  setTokenFunc: (token: string, exp: string) => void
}

export const AuthContext = createContext<AuthContextType>({ token: null, exp: null, logoutFunc: () => null, setTokenFunc: () => null })

const AuthProvider: FunctionComponent<Props> = ({ children }: Props) => {
  const [token, setToken] = useState<string>("")
  const [exp, setExp] = useState<string>("")

  const logoutFunc: () => void = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("TOKEN")
      localStorage.removeItem("EXP")
    }
    route("/login", true)
  }

  const setTokenFunc = (token: string, exp: string) => {
    setToken(token)
    setExp(exp)
    if (typeof window !== "undefined") {
      localStorage.setItem("TOKEN", token)
      localStorage.setItem("EXP", exp)
    }
  }

  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem("TOKEN") : ""
    const e = typeof window !== "undefined" ? localStorage.getItem("EXP") : ""
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
        setTokenFunc,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
