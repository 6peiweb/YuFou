class Http {

  getFriendInfo (params: any) {
    return ILib.http.get('/api/friend/info', params)
  }

}

export default new Http()
