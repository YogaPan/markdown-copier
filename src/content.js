const copyToClipBoard = markdownLink => {
  const hiddenInput = document.createElement('input')
  document.body.appendChild(hiddenInput)

  hiddenInput.value = markdownLink
  hiddenInput.select()
  const copyStatus = document.execCommand('copy')

  window.getSelection().removeAllRanges()
  hiddenInput.remove()

  return copyStatus
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const copyStatus = copyToClipBoard(request.payload)
  sendResponse({ result: copyStatus ? 'success' : 'failure' })
})

console.log('markdown copier content script loaded.')
