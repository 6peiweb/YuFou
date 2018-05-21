class Http {

  getUserSearch (params: any) {
    return ILib.http.get('/api/user/search', params)
  }

}

export default new Http()
