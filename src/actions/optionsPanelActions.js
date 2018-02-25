export function setErrorMsg(msg = '') {
  this.setState({
    error: {
      showError: true,
      msg,
    }
  })
}
