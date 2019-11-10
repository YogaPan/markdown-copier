const copyToClipBoard = markdownLink => {
  const hiddenInput = document.getElementById('copied-url')
  hiddenInput.value = markdownLink
  hiddenInput.select()
  document.execCommand('copy')
  window.getSelection().removeAllRanges()
}

document.getElementById('changeColor').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const currentTab = tabs[0]
    copyToClipBoard(`[${currentTab.title}](${currentTab.url})`)
  })

  // const newURL = 'http://stackoverflow.com/'
  // chrome.tabs.create({ url: newURL })
})

document.addEventListener('DOMContentLoaded', () => {
  console.log('loaded')
})
