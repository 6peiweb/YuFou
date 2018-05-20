class Http {

  getGroupInfo (params: any) {
    return ILib.http.get('/api/group/info', params)
  }

  getGroupMessages (params: any) {
    return ILib.http.get('/api/group/messages', params)
  }

  postGroupMessage (params: any) {
    return ILib.http.post('/api/group/message', params)
  }

  getGroupMessage (params: any) {
    return ILib.http.get('/api/group/message', params)
  }

}

export default new Http()
