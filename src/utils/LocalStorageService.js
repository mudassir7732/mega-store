const LocalStorageService=(function (){
  let _service;
  function _getService(){
    if(!_service){
      _service=this;
      console.log(this,' = this')
      return _service;
    }
    return _service;
  }
  function _setCurrentUser(userObj){
    localStorage.setItem("current_user", JSON.stringify(userObj))
  }
  function _setUserType(userType){
    localStorage.setItem("user_type", userType)
  }
  function _setToken(token){
    localStorage.setItem("access_token", token)
  }
  function _getAccessToken(){
    return localStorage.getItem("access_token")
  }
  return{
    getService: _getService,
    setCurrentUser: _setCurrentUser,
    setUserType: _setUserType,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
  }
})()
export default LocalStorageService;