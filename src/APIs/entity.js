import axios from 'axios'
import { QS } from './global'

//论文基础
export const uploadPaper = (expertId, paper) => {
  return axios({
    method: 'POST',
    url: `/api/paper/uploadPaper`,
    data: QS({ expertId, paper })
  })
}

export const getPaperInfo = paperId => {
  return axios({
    method: 'GET',
    url: `/api/paper/getPaperInfo?paperId=${paperId}`
  })
}

export const addPaperReading = paperId => {
  return axios({
    method: 'POST',
    url: `/api/paper/addPaperReading`,
    data: QS({ paperId })
  })
}

export const addPaperStar = (userId, paperId) => {
  return axios({
    method: 'POST',
    url: `/api/paper/addPaperStar`,
    data: QS({ userId, paperId })
  })
}

export const getRelatedPaper = paperId => {
  return axios({
    method: 'GET',
    url: `/api/paper/getRelatedPaper?paperId=${paperId}`
  })
}

//专利基础
export const uploadPatent = patent => {
  return axios({
    method: 'POST',
    url: `/api/patent/uploadPatent`,
    data: QS({ patent })
  })
}

export const getPatentInfo = patentId => {
  return axios({
    method: 'GET',
    url: `/api/patent/getPatentInfo?patentId=${patentId}`
  })
}

export const addPaperQuote = (paperId) => {
  return axios({
    method: 'POST',
    url: `/api/paper/addPaperQuote`,
    data: QS({ paperId })
  })
}


export const addPatentReading = patentId => {
  return axios({
    method: 'POST',
    url: `/api/patent/addPatentReading`,
    data: QS({ patentId })
  })
}

export const addPatentStar = (userId, patentId) => {
  return axios({
    method: 'POST',
    url: `/api/patent/addPatentStar`,
    data: QS({ userId, patentId })
  })
}
