module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/kontent-model-visualizer/'
  : '',
  "transpileDependencies": [
    "vuetify"
  ]
}
