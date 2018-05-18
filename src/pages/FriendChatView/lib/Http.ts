class Http {

  getFriendInfo (params: any) {
    return ILib.http.get('/api/friend/info', params)
  }

  getFriendMessage (params: any) {
    return ILib.http.get('/api/friend/message', params)
  }

}

export default new Http()
