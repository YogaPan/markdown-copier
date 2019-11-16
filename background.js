chrome.browserAction.onClicked.addListener(tab =>
  chrome.tabs.sendMessage(
    tab.id,
    { action: 'COPY', payload: { title: tab.title, url: tab.url } },
    response => console.log(`copy ${response.result}`)
  )
)

console.log('markdown copier background script loaded.')
