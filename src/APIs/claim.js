import axios from "axios";
import {QS} from "./global";

export const claimPaper = (applicantId,uploadExpertId,paperId) => {
  return axios({
    method: 'POST',
    url: `/api/paper/claimPaper`,
    data: QS({applicantId,uploadExpertId,paperId}),
  })
}

export const passClaim = (paperId,expertEmail) => {
  window.console.log(paperId+' '+expertEmail);
  return axios({
    method: 'POST',
    url: `/api/paper/passClaim`,
    data: QS({paperId,expertEmail}),
  })
}

export const refuseClaim = (paperId,expertEmail) => {
  return axios({
    method: 'POST',
    url: `/api/paper/refuseClaim`,
    data: QS({paperId,expertEmail}),
  })
}
