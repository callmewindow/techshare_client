import axios from 'axios'
import { QS } from './global'
import store from '../store'

export const addEntry = entry => {
  //return id
  return axios({
    method: 'PUT',
    url: '/subject/create',
    data: QS({ entry }),
  })
}

export const updateEntry = entry => {
  //return entry
  return axios({
    method: 'POST',
    url: '/subject',
    data: QS({ entry }),
  })
}

export const removeEntry = entryId => {
  //return result
  return axios({
    method: 'DELETE',
    url: '/subject',
    query: QS({ entryId }),
  })
}

export const getEntryById = id => {
  //return entry
  return axios({
    method: 'GET',
    url: `/subject/${id}`,
  })
}

export const getEntryByKeywords = (keywords, category) => {
  const options = {
    method: 'GET',
    url: `/search/subject/${encodeURI(keywords)}`,
  }
  if (category) options.params = { category }
  return axios(options)
}

export const submitRating = (entryId, value, content, type) => {
  return axios({
    method: 'POST',
    url: `/rating/subject`,
    data: QS({ entryId, type, value, content }),
  })
}

export const getRatingById = entryId => {
  return axios({
    method: 'GET',
    url: `/mark/subject/${entryId}`,
  })
}

export const getCommentsById = entryId => {
  return axios({
    method: 'GET',
    url: `/rating/subject/${entryId}`,
  })
}

export const getPreviousRating = entryId => {
  return axios({
    method: 'GET',
    url: `/rating/subject/${entryId}/current`,
  })
}

export const getPersonalHistories = () => {
  return axios({
    method: 'GET',
    url: `/rating/current-user`,
  })
}

export const updatePersonalInterests = topics => {
  return axios({
    method: 'POST',
    url: `/user/update-preference`,
    data: QS({ topics: topics.toString() }),
  })
}

export const loadPersonalInfo = username => {
  if (!username) username = store.state.username
  return axios({
    method: 'GET',
    url: `/user/at/${username}`,
  })
}

export const getSimilar = (tags, itemPerPage) => {
  if (!itemPerPage) itemPerPage = 6
  return axios({
    method: 'GET',
    url: `/subject/get-random`,
    params: { tags: tags.toString(), itemPerPage },
  })
}
