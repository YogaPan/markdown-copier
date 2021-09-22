chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  navigator.clipboard
    .writeText(request.payload)
    .then(() => {
      sendResponse({ result: 'success' })
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error(err)
      sendResponse({ result: 'failed' })
    })
})

// eslint-disable-next-line no-console
console.log('markdown copycat content script loaded.')
