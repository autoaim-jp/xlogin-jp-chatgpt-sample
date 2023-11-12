/* /core.js */
/**
 * @name コア機能を集約したファイル
 * @memberof file
 */

/* local setting */
const mod = {}

export const init = (setting, output, input, lib) => {
  mod.setting = setting
  mod.output = output
  mod.input = input
  mod.lib = lib
}

export const handleSplitPermissionList = async ({ splitPermissionList }) => {
  const clientId = mod.setting.xdevkitSetting.getValue('env.CLIENT_ID')
  const result = { splitPermissionList, clientId }

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')

  const handleResult = { response: { status, result } }
  return handleResult
}

export const handlePromptSend = async ({ accessToken, prompt }) => {
  const promptSendResponse = await mod.output.promptSendRequest(argNamed({
    param: { accessToken, prompt },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    lib: [mod.lib.postRequest],
  }))
  console.log({ promptSendResponse })

  const handleResult = { response: { status: mod.setting.browserServerSetting.getValue('statusList.OK') } }
  return handleResult
}

export const handleChatList = async ({ accessToken }) => {
  const chatListResponse = await mod.input.chatListRequest(argNamed({
    param: { accessToken },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    lib: [mod.lib.getRequest],
  }))

  if (!chatListResponse || !chatListResponse.data) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    const result = {}
    const handleResult = { response: { status, result } }
    return handleResult
  }

  const { result } = chatListResponse.data
  const status = mod.setting.browserServerSetting.getValue('statusList.OK')

  const handleResult = { response: { status, result } }
  return handleResult
}

export const createResponse = ({ req, res, handleResult }) => {
  console.log('endResponse:', req.url, handleResult)
  // req.session.auth = handleResult.session

  const ERROR_PAGE = mod.setting.xdevkitSetting.getValue('url.ERROR_PAGE')
  const { redirect } = handleResult

  if (handleResult.response) {
    const json = handleResult.response
    return mod.output.endResponse({ res, json, ERROR_PAGE })
  }

  if (req.method === 'GET') {
    if (handleResult.redirect) {
      return mod.output.endResponse({ res, redirect: handleResult.redirect, ERROR_PAGE })
    }

    return mod.output.endResponse({ res, redirect: ERROR_PAGE, ERROR_PAGE })
  }

  if (redirect) {
    const json = { redirect }
    return mod.output.endResponse({ res, json, ERROR_PAGE })
  }

  const json = { redirect: ERROR_PAGE }
  return mod.output.endResponse({ res, json, ERROR_PAGE })
}

export const handleInvalidSession = ({ req, res }) => {
  if (!req.session || !req.session.auth) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    return res.json({ status })
  }

  return null
}

export default {}

