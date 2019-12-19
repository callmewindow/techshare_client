import axios from 'axios'
import { QS } from './global'

export const getExpertInfo = (expertId) => {
    return axios({
        method: 'GET',
        url: `/api/expert/getExpertInfo?expertId=${expertId}`,
    })
}
export const getExpertPaper = (expertId) => {
    return axios({
        method: 'GET',
        url: `/api/paper/getAllPaperByExpertId?expertId=${expertId}`
    })
}
export const getExpertPatent = (expertId) => {
    return axios({
        method: 'GET',
        url: `/api/patent/getAllPatentByExpertId?expertId=${expertId}`
    })
}
export const editExpertIntro = (expertId,newExpertIntro) => {
    return axios({
        method: 'POST',
        url: `/api/expert/editExpertIntro`,
        data: QS({expertId, newExpertIntro})
    })
}
//接口还没有
 export const getAllExpert = (expertname) => {
    return axios({
        method: 'GET',
        url: `/api/patent/getAllExpert?expertname=${expertname}`,
    })
}
export const followExpert = (userId,expertId) => {
    return axios({
        method: 'POST',
        url: `/api/user/followExpert?userId=${userId}&expertId=${expertId}`,
        data: QS({ userId, expertId}),
    })
}
export const cancelExpert = (userId,expertId) => {
    return axios({
        method: 'POST',
        url: `/api/user/cancelFollow?userId=${userId}&expertId=${expertId}`,
        data: QS({ userId, expertId}),

    })
}
export const checkExpert = (userId,expertId) => {
    return axios({
        method: 'GET',
        url: `/api/user/checkFollow?userId=${userId}&expertId=${expertId}`,
    })
}