class Http {

  getFriendGroup (params: any) {
    return ILib.http.get('/api/group/friends', params)
  }

}

export default new Http()
