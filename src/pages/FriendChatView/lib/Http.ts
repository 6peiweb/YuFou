class Http {

  getFriendInfo (params: any) {
    return ILib.http.get('/api/friend/info', params)
  }

  getFriendMessages (params: any) {
    return ILib.http.get('/api/friend/messages', params)
  }

  postFriendMessage (params: any) {
    return ILib.http.post('/api/friend/message', params)
  }

  getFriendMessage (params: any) {
    return ILib.http.get('/api/friend/message', params)
  }

}

export default new Http()
