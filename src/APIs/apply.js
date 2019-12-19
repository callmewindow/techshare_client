import axios from 'axios'
import { QS } from './global'

export const uploadApply = (expertApply) => {
  return axios({
    method: 'POST',
    url: `/api/expert/uploadApplyInfo`,
    data: { expertApply }
  })
}

export const getApplyState = (userId) => {
  return axios({
    method: 'GET',
    url: `/api/apply/getApplyState?userId=${userId}`,
  })
}
export const getAllApplyInfo = () => {
    return axios({
        method: 'GET',
        url: `/api/apply/getAllApplyInfo`,
    })
}

export const applyPassed = (applyId, resultReason) => {
    return axios({
        method: 'POST',
        url: `/api/apply/applyPassed`,
        data: QS({ applyId, resultReason }),
    })
}

export const applyRefused = (applyId, resultReason) => {
    return axios({
        method: 'POST',
        url: `/api/apply/applyRefused`,
        data: QS({ applyId, resultReason }),
    })
}
