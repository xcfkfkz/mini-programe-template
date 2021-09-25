import getEnvName from './getEnv.js';
import hosts from './hosts.js';
export const loginWithAliAuthCode = async (authCode) => {
  const envName = await getEnvName();
  const res = await new Promise((resolve, reject) => {
    const host = hosts[envName].GAPI;
    const path = '/users/login/alipay';
    my.request({
      url: host + path,
      headers: {
        'X-Request-Package-ID': '1000',
        'X-Request-Device': 'web',
        'X-Request-Version': 'none'
      },
      method: 'POST',
      data: {
        auth_code: authCode
      },
      timeout: 0,
      dataType: 'json',
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        resolve(err)
      }
    });
  });
  return res
};
export const loadCollectCodeInfo = async (sellerCode) => {
  const envName = await getEnvName();
  const res = await new Promise((resolve, reject) => {
    const host = hosts[envName].GAPI;
    const path = '/org/collect_code/info';
    my.request({
      url: host + path,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      data: {
        u: sellerCode
      },
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        resolve(err)
      }
    })
  });
  return res
};
export const loginByPhone = async (phone) => {
  const envName = await getEnvName();
  const res = await new Promise((resolve, reject) => {
    const host = hosts[envName].GAPI;
    const path = '/login/phone';
    my.request({
      url: host + path,
      headers: {
        'X-Request-Package-ID': '1000',
        'X-Request-Device': 'web',
        'X-Request-Version': 'none'
      },
      method: 'POST',
      data: {
        auth_code: phone
      },
      timeout: 0,
      dataType: 'json',
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        resolve(err)
      }
    });
  });
  return res
}