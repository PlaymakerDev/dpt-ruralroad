import axios, { AxiosError } from 'axios';
import { setLoginSession, getUserSession } from '@/utils/auth';
import { MAX_AGE } from '@/utils/auth/authCookies';
import config from '@/config';
import pm from '@/utils/auth/permission';

const toLoginAgain = async (
  res,
  response,
  locale,
  role
) => {
  // const MAX_AGE = 4;
  const MAX_AGE = 60 * 60 * 24;
  await setLoginSession(res, response, MAX_AGE);
  let p = config.basePath;
  if (locale === 'en') {
    p = p + '/en';
  }
  return res.redirect(302, '/login');
};

const url = config.hostBackendServerSide + '/api/v1/auth/token'
const authmeUrl = config.hostBackendServerSide + '/api/v1/auth/me'

async function handler(
  req,
  res
) {
  const { username, password, role, locale, remember_me_checked } = req.body;

  // Check if all required fields are provided
  if (![username, password, role].every(val => String(val).trim())) {
    return res.status(400).json({ success: false, message: 'Bad request' });
  }

  const body = {
    username,
    password,
    role,
  };

  try {
    const { data, status } = await axios.post(url, body);

    let authUser

    if (!data?.access_token) {
      const response = {
        success: false,
        message: data?.message || 'Internal server error',
        username: username,
      };
      return toLoginAgain(res, response, locale, role);
    } else {
      const response = await axios.get(authmeUrl, {
        headers: {
          'Authorization': `Bearer ${data?.access_token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response?.status === 200) {
        authUser = {
          ...data,
          ...response?.data?.data,
          token: data?.access_token,
          map_group_name: response?.data?.group_name ? response?.data?.group_name.toUpperCase() : (role || 'ADMIN')
        }
      } else {
        authUser = {
          ...data,
          token: data?.access_token
        }
      }
    }
    // let refCode
    // let id
    // if (role === 'CORPORATE' && data.token) {
    //   const res = await axios.get(`${config.hostBackendServerSide}/company/0`, { headers: { 'Authorization': `Bearer ${data.token}` } })
    //     .then((response) => ({ ...response?.data }))
    //     .catch((error) => console.log('Error!!!', error))

    //   refCode = res?.refCode
    //   id = res?.id
    // }

    // if (role === 'AGENT' && data.token) {
    //   const res = await axios.get(`${config.hostBackendServerSide}/agent/0`, { headers: { 'Authorization': `Bearer ${data.token}` } })
    //     .then((response) => ({ ...response?.data }))
    //     .catch((error) => console.log('Error!!!', error))

    //   refCode = res?.refCode
    //   id = res?.id
    // }

    const user = getUserSession(authUser);
    // console.log("=== user ===", user)
    await setLoginSession(res, user, remember_me_checked === '1' ? MAX_AGE : 60 * 60 * 24);
    let redirectURL = (config.basePath);
    if (locale === 'en') {
      redirectURL = redirectURL + '/en';
    }

    const pUser = pm(user);
    redirectURL = redirectURL + pUser.indexPage();

    return res.redirect(302, redirectURL);
  } catch (error) {
    let response = {
      success: false,
      message: error || error?.message,
      username: username,
      role,
    };

    if (error instanceof AxiosError) {
      response = {
        ...response,
        ...(error?.response?.data),
      };
    }

    let _redirectURL = config.basePath;
    if (locale === 'en') {
      // _redirectURL = _redirectURL + '/en' + `/login-corporate?type=${role}`;
      _redirectURL = _redirectURL + '/en' + `/login`;
    }

    response = { ...response };
    return toLoginAgain(res, response, locale, role);
  }
}

export default handler;
