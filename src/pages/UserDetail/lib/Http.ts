class Http {

  getFriendInfo (params: any) {
    return ILib.http.get('/api/friend/info', params)
  }

  putFriendRemark (params: any) {
    return ILib.http.put('/api/friend/remark', params)
  }

  deleteFriend (params: any) {
    return ILib.http.delete('/api/friend/info', params)
  }

}

export default new Http()
