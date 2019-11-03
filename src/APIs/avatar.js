import axios from 'axios'
import { QS } from './global'

export async function getAvatarUrl(username) {
  try {
    const response = await axios({
      method: 'GET',
      url: `/user/at/${username}/avatar`,
    })
    return response.data
      ? `http://114.115.155.144:7123/img/${response.data}`
      : `/default-avatar.jpg`
  } catch (e) {
    return '/default-avatar.jpg'
  }
}

export async function updateAvatar(file) {
  const formData = new FormData()
  formData.append('file', file)
  const response = await axios({
    method: 'POST',
    url: `/add-image`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  await axios({
    method: 'POST',
    url: '/user/update-avatar',
    data: QS({ avatarId: response.data.name }),
  })
  return response.data.url
}
