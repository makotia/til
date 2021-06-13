export const getToken: () => string | null = () => {
  return localStorage.getItem("TOKEN")
}

export const setToken: (token: string) => void = token => {
  localStorage.setItem("TOKEN", token)
}

export const clearToken: () => void = () => {
  localStorage.removeItem("TOKEN")
}
