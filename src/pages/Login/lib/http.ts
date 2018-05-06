class Http {

    postRegisterInfo (params: lp.UserConfig) {
        return ILib.http.post('/api/user/register', params)
    }
}
  
  export default new Http()
  