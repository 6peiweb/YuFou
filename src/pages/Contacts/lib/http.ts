class Http {

  getFriendGroup (params: any) {
    return ILib.http.get('/api/group/friends', params)
  }

  getUserGroup (params: any) {
    return ILib.http.get('/api/group/users', params)
  }

}

export default new Http()
