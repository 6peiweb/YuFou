class Http {

    getLoginSystem (params: lp.UserConfig) {
        return ILib.http.get('/api/user/login', params)
    }
}
  
export default new Http()
