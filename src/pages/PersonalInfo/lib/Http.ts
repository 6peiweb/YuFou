class Http {

  getUserInfo (params: any) {
    return ILib.http.get('/api/user/info', params)
  }

  putUserInfo (params: any) {
    return ILib.http.put('/api/user/info', params)
  }

}

export default new Http()
