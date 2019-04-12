import axios from 'axios';

import getBaseUrl from './baseUrl';
const baseUrl = getBaseUrl();


export function postNewBoard(userId, board) {
  return axios.post(baseUrl + '/board-update', {
    userId,
    board
  }).then(onSuccess);

}

export function getBoardData(userId) {
  return axios.get(baseUrl + '/board/' + userId).then(onSuccess);
}

export function resetBoard() {
  return axios.post(baseUrl + '/reset-board/').then(onSuccess);
}

function onSuccess(response) {
  return response.data;
}
