/* /action.js */

export const getHandlerPromptSend = ({ handlePromptSend, createResponse }) => {
  return async (req, res) => {
    const { accessToken } = req.session.auth
    const { prompt } = req.body

    const handleResult = await handlePromptSend({ accessToken, prompt })

    createResponse({ req, res, handleResult })
  }
}

export const getHandlerChatList = ({ handleInvalidSession, handleChatList, createResponse }) => {
  return async (req, res) => {
    if (handleInvalidSession({ req, res })) {
      return
    }

    const { accessToken } = req.session.auth

    const handleResult = await handleChatList({ accessToken })

    createResponse({ req, res, handleResult })
  }
}

export default {}

