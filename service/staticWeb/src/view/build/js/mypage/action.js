export const getOnSubmitSendPromptForm = ({ sendPrompt, loadChatHistory }) => {
  return async () => {
    await sendPrompt()
    await loadChatHistory()
  }
}

export default {}

