export const getToken: () => string | null = () => {
  return typeof window !== "undefined" ? localStorage.getItem("TOKEN") : ""
}

export const getExp: () => string | null = () => {
  return typeof window !== "undefined" ? localStorage.getItem("EXP") : ""
}

export const setToken: (token: string, exp: string) => void = (token, exp) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("TOKEN", token)
    localStorage.setItem("EXP", exp)
  }
}

export const clearToken: () => void = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("TOKEN")
    localStorage.removeItem("EXP")
  }
}
