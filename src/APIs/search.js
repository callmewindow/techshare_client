import axios from 'axios'

export const searchByKeyword = (searchType, keyword) => {
    return axios({
        method: 'GET',
        url: `/api/search/searchByKeyword?searchType=${searchType}&keyword=${keyword}`
    })
}