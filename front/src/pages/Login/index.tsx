import { FunctionComponent, h } from "preact"

import axios from "axios"
import Helmet from "preact-helmet"
import { route } from "preact-router"
import { useState, useContext } from "preact/hooks"

import { AuthContext } from "../../AuthContext"
import Spacer from "../../components/Spacer"
import { BASE_URL } from "../../consts"

const Login: FunctionComponent = () => {
  const [screenName, setScreenName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { setTokenFunc } = useContext(AuthContext)
  const postLogin = () => {
    axios.post<{ token: string; exp: number }>(`${BASE_URL}/login`, {
      screen_name: screenName,
      password,
    })
      .then(res => {
        setTokenFunc(res.data.token, String(res.data.exp))
        route("/", true)
      })
      .catch(e => console.error(e))
  }
  return (
    <div>
      <Helmet title="LOGIN | TIL" />
      <h2>ログイン</h2>
      <Spacer height={16} />
      <label>ユーザー名</label>
      <input type="text" value={screenName} onInput={e => setScreenName(e.currentTarget.value)} />
      <Spacer height={16} />
      <label>パスワード</label>
      <input type="password" value={password} onChange={e => setPassword(e.currentTarget.value)} />
      <Spacer height={16} />
      <button onClick={postLogin}>ログイン</button>
    </div>
  )
}

export default Login
