class Http {

  postValidEmail (params: any) {
    return ILib.http.post('/api/user/email', params)
  }

  postRegister (params: any) {
    return ILib.http.post('/api/user/register', params)
  }

}

export default new Http()
