import axios from 'axios'
import { QS } from './global'

export const addPaperReading = (userId,noticeType,noticeContent,noticePlusContent) => {
  return axios({
    method: 'POST',
    url: `/api/user/setNewNotice`,
    data: QS({ userId,noticeType,noticeContent,noticePlusContent })
  })
}

export const setOneNoticeRead = (userId,offset) => {
  return axios({
    method: 'POST',
    url: `/api/user/setOneNoticeRead`,
    data: QS({ userId,offset })
  })
}

export const setAllNoticesRead = (userId) => {
  return axios({
    method: 'POST',
    url: `/api/user/setAllNoticesRead`,
    data: QS({ userId })
  })
}
