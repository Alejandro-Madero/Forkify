// Módulo que contiene funciones que reutilizamos frecuentemente.
import { TIMEOUT_TIMER } from './config.js';

export const AJAX = async function (url, uploadData = null) {
  try {
    console.log(url);
    const fetchReq = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchReq, timeOut(TIMEOUT_TIMER)]);
    const data = await res.json();

    if (!res.ok)
      throw new Error(`There was an error (${res.status}) ${data.message}`);

    return data;
  } catch (err) {
    console.log('Lo lanzo en el helper');
    throw err;
  }
};

const timeOut = function (s) {
  return new Promise((_, rej) => {
    setTimeout(() => rej, s * 1000);
  });
};
