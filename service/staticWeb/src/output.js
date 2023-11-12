/* /output.js */

export const promptSendRequest = ({
  accessToken, prompt, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, postRequest,
}) => {
  const path = `/api/${API_VERSION}/chatgpt/register`
  const param = {
    prompt,
  }

  return postRequest(CLIENT_ID, accessToken, API_SERVER_ORIGIN, path, param)
}
/* to http client */
export const endResponse = ({
  res, json, redirect, ERROR_PAGE,
}) => {
  if (redirect) {
    return res.redirect(redirect)
  } if (json) {
    return res.json(json)
  }
  return res.redirect(ERROR_PAGE)
}

export default {}

