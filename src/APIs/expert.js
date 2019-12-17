import axios from 'axios'

export const getExpertInfo = (expertId) => {
    return axios({
        method: 'GET',
        url: `/api/expert/getExpertInfo?expertId=${expertId}`,
    })
}