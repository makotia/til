export const getToken: () => string | null = () => {
  return typeof window !== "undefined" ? localStorage.getItem("TOKEN") : ""
}

export const setToken: (token: string) => void = token => {
  typeof window !== "undefined" && localStorage.setItem("TOKEN", token)
}

export const clearToken: () => void = () => {
  typeof window !== "undefined" && localStorage.removeItem("TOKEN")
}
