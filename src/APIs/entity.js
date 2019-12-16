import axios from 'axios'
import { QS } from './global'

//论文基础
export const uploadPaper = paper => {
  return axios({
    method: 'POST',
    url: `/api/paper/uploadPaper`,
    data: QS({ paper })
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
    url: `/api/paper/uploadPaper`,
    data: QS({ paperId })
  })
}

export const addPaperStar = (userId, paperId) => {
  return axios({
    method: 'POST',
    url: `/api/paper/addPaperStar`,
    data: QS({ userId,paperId })
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

export const addPatentReading = patentId => {
  return axios({
    method: 'POST',
    url: `/api/patent/uploadPatent`,
    data: QS({ patentId })
  })
}

export const addPatentStar = (userId, patentId) => {
  return axios({
    method: 'POST',
    url: `/api/patent/addPatentStar`,
    data: QS({ userId,patentId })
  })
}
