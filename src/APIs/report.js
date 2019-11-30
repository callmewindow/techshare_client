import axios from 'axios'
import { QS } from './global'

export const uploadReport = (type, content, discussionId) => {
  return axios({
    method: 'PUT',
    url: `/discussionsAudit`,
    data: QS({ type, content, discussionId }),
  })
}

export const deleteReport = id => {
  return axios({
    method: 'DELETE',
    url: `/discussionAudit/${id}`,
  })
}

export const getDiscussionReportList = page => {
  return axios({
    method: 'GET',
    url: `/discussionAudit/index`,
    params: { page },
  })
}

export const getDiscussionReportByState = state => {
  return axios({
    method: 'GET',
    url: `/discussionAudit/search`,
    params: { state },
  })
}

export const isCurrentUserAdmin = () => {
  return axios({
    method: 'GET',
    url: `/user/is-admin`,
  })
}

export const getDiscussionReportById = id => {
  return axios({
    method: 'GET',
    url: `/discussionAudit/${id}`,
  })
}

export const dealDiscussionReport = (id, state, feedBack) => {
  return axios({
    method: 'POST',
    url: `/discussionAudit/${id}`,
    data: QS({ state, feedBack }),
  })
}
