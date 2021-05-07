export default function backToLogin(history :any) {
  sessionStorage.removeItem('token')
  history.push('/')
  history.go(0)
}
