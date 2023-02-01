/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
const BASE_URL = 'https://api.novaposhta.ua/v2.0/json/';
// 'http://winelibrary-env-1.eba-h5tcvqpg.eu-west-1.elasticbeanstalk.com'

// returns a promise resolved after a given delay
function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

function request<T>(
  method: RequestMethod = 'GET',
  data: any = null, // we can send any data to the server
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    // We add body and Content-Type only for the requests with data
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  // we wait for testing purpose to see loaders
  return wait(300)
    .then(() => fetch(BASE_URL, options))
    .then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error();
      }

      return response.json().then(a => a.data);
    });
}

export const NPclient = {
  get: <T>() => request<T>(),
  post: <T>(data: unknown) => request<T>('POST', data),
  // patch: <T>(url: string, data: unknown) => request<T>(url, 'PATCH', data),
  // put: <T>(url: string, data: unknown) => request<T>(url, 'PUT', data),
  // delete: (url: string) => request(url, 'DELETE'),
};
