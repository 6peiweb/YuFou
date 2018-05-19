class Http {

  getGroupInfo (params: any) {
    return ILib.http.get('/api/group/info', params)
  }

  getGroupMemberInfo (params: any) {
    return ILib.http.get('/api/group/member', params)
  }

  deleteGroupMember (params: any) {
    return ILib.http.delete('/api/group/member', params)
  }

}

export default new Http()
