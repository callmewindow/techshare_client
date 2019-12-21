import axios from 'axios'
import { QS } from './global'

//如果get出错，与后端确认请求URL的格式

//如果post出错，特别是500 Internet serve error
//例：将data: QS({ paper })换成data: { paper }   或反向操作  （obj是自动的，不是代码）

//论文基础
export const uploadPaper = (paperEntity) => {
  return axios({
    method: 'POST',
    url: `/api/paper/uploadPaper`,
    data: { paperEntity }
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

export const addPaperQuote = (paperId) => {
  return axios({
    method: 'POST',
    url: `/api/paper/addPaperQuote`,
    data: QS({ paperId })
  })
}

export const addPaperStar = (userId, paperId) => {
  return axios({
    method: 'POST',
    url: `/api/paper/addPaperStar`,
    data: { userId,paperId }
  })
}

export const getRelatedPaper = paperId => {
  return axios({
    method: 'GET',
    url: `/api/paper/getRelatedPaper?paperId=${paperId}`
  })
}

//专利基础
export const uploadPatent = patentEntity => {
  return axios({
    method: 'POST',
    url: `/api/patent/uploadPatent`,
    data: { patentEntity }
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
    url: `/api/patent/addPatentReading`,
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
