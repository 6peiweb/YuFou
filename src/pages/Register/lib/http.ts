class Http {

  postValidEmail (params: any) {
    return ILib.http.post('/api/user/email', params)
  }
}

export default new Http()
