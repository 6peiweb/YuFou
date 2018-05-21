class Http {

  getUserRecords (params: any) {
    return ILib.http.get('/api/user/records', params)
  }

  getUserMessage (params: any) {
    return ILib.http.get('/api/user/message', params)
  }

}

export default new Http()
