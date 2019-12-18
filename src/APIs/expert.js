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
        data:QS({expertId,newExpertIntro})
    })
}