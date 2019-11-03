import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.deepPurple.accent4,
      },
      dark: {
        primary: colors.lightBlue,
      },
    },
  },
  icons: {
    iconfont: 'md',
  },
})
