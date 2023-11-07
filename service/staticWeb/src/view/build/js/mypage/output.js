/* create elm */

/* request */
export const getSendPrompt = ({ apiEndpoint, getPromptValue, postRequest }) => {
  const url = `${apiEndpoint}/prompt/send`
  return () => {
    const prompt = getPromptValue()
    const param = { prompt, }
    return postRequest(url, param)
  }
}

export const getRegisterResponse = ({ apiEndpoint, postRequest }) => {
  const url = `${apiEndpoint}/prompt/register`
  return ({ responseList }) => {
    const param = { responseList }
    return postRequest(url, param)
  }
}

/* onClick */
export const setOnClickSaveMessageButton = ({ onClickSaveMessageButton }) => {
  const saveMessageBtn = document.querySelector('#saveMessageBtn')
  saveMessageBtn.onclick = (e) => {
    e.preventDefault()
    onClickSaveMessageButton()
  }
}

/* onSubmit */
export const setOnSubmitSendPromptForm = ({ onSubmitSendPromptForm }) => {
  const sendPromptFormElm = document.querySelector('#sendPromptForm')
  sendPromptFormElm.onsubmit = (e) => {
    e.preventDefault()
    onSubmitSendPromptForm()
  }
}

/* show data */
const rightMessageTemplateElm = document.querySelector('#rightMessageTemplate')
const leftMessageTemplateElm = document.querySelector('#leftMessageTemplate')
export const showChatList = ({ simpleChatList }) => {
  const chatAreaElm = document.querySelector('#chatArea')
  simpleChatList.forEach((chatObj) => {
    let chatElm = null
    if (chatObj.isMine) {
      chatElm = rightMessageTemplateElm.cloneNode(true)
    } else {
      chatElm = leftMessageTemplateElm.cloneNode(true)
    }
    chatElm.id = ''

    chatElm.querySelector('[data-id="messageBody"]').innerText = chatObj.message

    chatAreaElm.appendChild(chatElm)
  })
}

export const showChatHistory = ({ splitPermissionListResult }) => {
  const { splitPermissionList, clientId } = splitPermissionListResult.result
  if (splitPermissionList.optional[`rw:${clientId}:json`]) {
    document.querySelector('#chatArea').classList.remove('hidden')
  } else {
    document.querySelector('#jsonPermissionRequestContainer').classList.remove('hidden')
  }
}

export const showPromptForm = ({ splitPermissionListResult }) => {
  const { splitPermissionList, clientId } = splitPermissionListResult.result
  if (splitPermissionList.optional[`rw:auth:chatgpt`]) {
    document.querySelector('#sendPromptForm').classList.remove('hidden')
  } else {
    document.querySelector('#chatgptPermissionRequestContainer').classList.remove('hidden')
  }
}

