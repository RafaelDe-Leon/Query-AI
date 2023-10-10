function revealContent(button, contentId) {
  const hiddenContent = document.getElementById(contentId)

  hiddenContent.classList.toggle('hidden')
  hiddenContent.classList.toggle('revealed')

  if (hiddenContent.classList.contains('revealed')) {
    button.textContent = 'Hide Filters'
  } else {
    button.textContent = 'Show Advanced Filters'
  }
}
