import getEnvName from './getEnv.js';
import hosts from './hosts.js';
export const loginWithAliAuth = async (data = {}) => {
  const envName = await getEnvName();
  const { grant_type = 'authorization_code', auth_code:code = '', phone:encrypted_data = '' } = data;
  const res = await new Promise((resolve, reject) => {
    const host = hosts[envName].GAPI;
    const path = '/users/alipay/login';
    my.request({
      url: host + path,
      headers: {
        'X-Request-Package-ID': '1000',
        'X-Request-Device': 'web',
        'X-Request-Version': 'none'
      },
      method: 'POST',
      data: {
        grant_type,
        code,
        encrypted_data
      },
      timeout: 0,
      dataType: 'json',
      success: (result) => {
        resolve(result.data)
      },
      fail: (err) => {
        resolve(err.data)
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
        resolve(result.data)
      },
      fail: (err) => {
        resolve(err.data)
      }
    })
  });
  return res
};
export const getWholeUrl = async (shortUri) => {
  const res = await new Promise(resolve => {
    my.request({
      url: shortUri,
      success: result => {
        resolve(result.headers && result.headers.location)
      },
      fail: err => {
        resolve(err.headers && err.headers.location)
      }
    })
  })
  return res
}
