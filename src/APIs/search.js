import axios from 'axios'

export const searchByKeyword = (searchType, keyword) => {
    return axios({
        method: 'GET',
        url: `/api/user/getUserInfo?searchType=${searchType}&keyword=${keyword}`
    })
}