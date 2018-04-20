class Http {
  constructor () {} /* tslint:disable */

  postRegisterInfo (params: lp.UserConfig) {
    return ILib.http.post('/api/user/register', params)
  }
}

export default new Http()
