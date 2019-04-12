import getBaseUrl from './baseUrl';
import 'whatwg-fetch';

const baseUrl = getBaseUrl();

export function getPortfolios() {
  return get('portfolios');
}

function get(url) {
  return fetch(baseUrl + url).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error); // eslint-disable-line no-console
}
