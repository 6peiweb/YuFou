class Http {

  getGroupInfo (params: any) {
    return ILib.http.get('/api/group/info', params)
  }

  putGroupInfo (params: any) {
    return ILib.http.put('/api/group/info', params)
  }

}

export default new Http()
