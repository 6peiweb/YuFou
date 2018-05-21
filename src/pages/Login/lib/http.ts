class Http {

  getLoginSystem (params: any) {
    return ILib.http.get('/api/user/login', params)
  }

}

export default new Http()
