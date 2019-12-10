import axios from 'axios'
import { QS } from './global'

// search板块先略过


//论文基础
export const uploadPaper = paper => {
  return axios({
    method: 'POST',
    url: `/api/paper/uploadPaper`,
    data: QS({ paper }),
  })
}

export const getPaperInfo = paperId => {
  return axios({
    method: 'GET',
    url: `/api/paper/getPaperInfo`,
    data: { paperId },
  })
}

export const addPaperReading = paperId => {
  return axios({
    method: 'POST',
    url: `/api/paper/uploadPaper`,
    data: { paperId },
  })
}

export const addPaperStar = (userId, paperId) => {
  return axios({
    method: 'POST',
    url: `/api/paper/addPaperStar`,
    data: { userId,paperId },
  })
}

//专利基础
export const uploadPatent = patent => {
  return axios({
    method: 'POST',
    url: `/api/patent/uploadPatent`,
    data: QS({ patent }),
  })
}

export const getPatentInfo = patentId => {
  return axios({
    method: 'GET',
    url: `/api/patent/getPatentInfo`,
    data: { patentId },
  })
}

export const addPatentReading = patentId => {
  return axios({
    method: 'POST',
    url: `/api/patent/uploadPatent`,
    data: { patentId },
  })
}

export const addPatentStar = (userId, patentId) => {
  return axios({
    method: 'POST',
    url: `/api/patent/addPatentStar`,
    data: { userId,patentId },
  })
}
