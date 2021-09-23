import getEnvName from './getEnv.js';
import hosts from './hosts.js';
export const loginWithAliAuthCode = async (authCode) => {
  const envName = await getEnvName();
  const res = await new Promise((resolve, reject) => {
    const host = hosts[envName].GAPI;
    const path = '/users/login/alipay';
    my.request({
      url: host + path,
      headers: {},
      method: 'POST',
      data: {
        auth_code: authCode
      },
      timeout: 0,
      dataType: 'json',
      success: (result) => {
        
      },
      fail: () => {
        
      },
      complete: () => {
        
      }
    });
  })

})