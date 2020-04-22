// use localStorage to store the authority info, which might be sent from server in actual project.
// 获取用户信息
export function getUserInfo() {
  const userinfo = localStorage.getItem('userinfo')
  try {
    return JSON.parse(userinfo)
  } catch (e) {
    return {}
  }
}
// 设置用户信息
export function setUserInfo(userinfo) {
  return localStorage.setItem('userinfo', JSON.stringify(userinfo))
}
// 清除用户信息
export function clearUserInfo() {
  return localStorage.removeItem('userinfo')
}

// 获取权限
export function getAuthority() {
  // console.log('getAuthority');
  // 这里要判断下能不能取到用户信息 token。
  const userinfo = getUserInfo()
  if (
    !(
      userinfo &&
      userinfo.userToken != null &&
      userinfo.userToken !== undefined
    )
  ) {
    return []
  }else{
    // 没有用户信息跳转登陆页面
    clearUserInfo()
    this.$router.push('/user/login')
  }
  const authority = localStorage.getItem('hams-sso-authority') || ''
  try {
    return [...JSON.parse(authority), 'sso-dashboard-workspace']
  } catch (e) {
    return []
  }
}
// 设置权限
export function setAuthority(authority) {
  return localStorage.setItem('hams-sso-authority', JSON.stringify(authority))
}

// 清除权限
export function clearAuthority() {
  return localStorage.removeItem('hams-sso-authority')
}
