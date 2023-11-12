/* /input.js */

export const chatListRequest = async ({
  accessToken, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, getRequest,
}) => {
  const origin = API_SERVER_ORIGIN
  const path = `/api/${API_VERSION}/chatgpt/response`
  const param = {}
  return getRequest(CLIENT_ID, accessToken, origin, path, param)
}
export default {}

