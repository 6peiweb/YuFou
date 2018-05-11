class Http {

  getUserInfo (params: any) {
    return ILib.http.get('/api/user/info', params)
  }
}

export default new Http()
