class Http {

  putUserPassword (params: any) {
    return ILib.http.put('/api/user/password', params)
  }

}

export default new Http()
