class Http {

  getFriendGroup (params: any) {
    return ILib.http.get('/api/classify/friends', params)
  }

  getUserGroup (params: any) {
    return ILib.http.get('/api/classify/users', params)
  }

}

export default new Http()
