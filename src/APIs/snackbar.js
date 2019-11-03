// @ts-check

import store from '../store'
import { siteTitle } from '../strings'

function displaySnackbarWith(content, color) {
  store.commit('updateSnackbar', { content, color })
}

const Snackbar = {
  emitsError: content => {
    displaySnackbarWith(content, 'error')
  },
  emitsWarning: content => {
    displaySnackbarWith(content, 'warning')
  },
  emitsSuccess: content => {
    displaySnackbarWith(content, 'success')
  },
  emitsInfo: content => {
    displaySnackbarWith(content, 'info')
  },
  collapse: () => {
    store.commit('updateSnackbar')
  },
  showInfoAboutUnderDevelopment: () => {
    Snackbar.emitsInfo(
      `客官，小的帮您问了，${siteTitle}的开发小哥们说他们正在很努力地开发此功能。您再等等吧。`,
    )
  },
}

export default Snackbar
