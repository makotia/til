import { FunctionComponent, h } from "preact"

import axios from "axios"
import { route } from "preact-router"
import { useState } from "preact/hooks"

import Spacer from "../../components/Spacer"
import { BASE_URL } from "../../consts"
import { setToken } from "../../lib/token"

const Login: FunctionComponent = () => {
  const [screenName, setScreenName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const postLogin = () => {
    axios.post<{ token: string }>(`${BASE_URL}/login`, {
      screen_name: screenName,
      password,
    })
      .then(res => {
        setToken(res.data.token)
        route("/", true)
      })
      .catch(e => console.error(e))
  }
  return (
    <div>
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
