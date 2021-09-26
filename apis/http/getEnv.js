export default (p => () => {
  if (p) return p;
  return (p = new Promise(res => {
    my.getRunScene({
      success(result) {
        res(result.envVersion === 'release' ? 'production' : 'development')
      }
    })
  }))
})()
