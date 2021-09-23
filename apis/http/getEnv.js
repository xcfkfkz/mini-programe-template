export default new Promise(res => {
  my.getRunScene({
    success(result) {
      res(result.envVersion === 'release' ? 'production' : 'development')
    }
  })
})