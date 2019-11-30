import store from '../store'
import { siteTitleInFull } from '../strings'

export function updateTitleTo(value) {
  store.dispatch('updateNavTitle', value)
  document.title = `${value} ~ ${siteTitleInFull}`
}
