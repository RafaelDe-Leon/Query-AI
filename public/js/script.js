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

async function fetchDataAndCreateElements() {
  try {
    // Fetch data from your database or server
    const isLocal =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    const response = await fetch(`${isLocal ? '/data' : '/api/data'}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()

    // Select the section element where you want to create the data
    const container = document.querySelector('.container')

    // Select the author select element
    const authorSelect = document.getElementById('author')

    // Create and append an initial empty option
    const initialOption = document.createElement('option')
    initialOption.textContent = '' // Empty text content
    initialOption.value = '' // Empty value
    authorSelect.appendChild(initialOption)

    // Loop through the data to create HTML elements
    for (const item of data) {
      const name = item.name
      const author = item.author

      const section = document.createElement('section')
      section.classList.add('queries-container')

      const queriesDiv = document.createElement('div')
      queriesDiv.classList.add('queries')

      const nameParagraph = document.createElement('p')
      nameParagraph.classList.add('queries-heading')
      nameParagraph.textContent = name

      const authorParagraph = document.createElement('p')
      authorParagraph.classList.add('queries-text')
      authorParagraph.textContent = `Author: ${author}`

      queriesDiv.appendChild(nameParagraph)
      queriesDiv.appendChild(authorParagraph)

      const logoDiv = document.createElement('div')
      logoDiv.classList.add('queries-logo')

      // You can add logic here to create and append the logo images as needed
      // For simplicity, we'll add five identical images
      for (let i = 0; i < 5; i++) {
        const img = document.createElement('img')
        img.src =
          'https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-png-instagram-logo-camel-productions-website-25.png'
        img.alt = 'logo'
        img.style.width = '20px'
        logoDiv.appendChild(img)
      }

      // Create a new option for each author
      const option = document.createElement('option')
      option.textContent = author
      option.value = author
      authorSelect.appendChild(option)

      // remove duplicate authors
      const options = document.querySelectorAll('#author option')
      const values = Array.from(options).map((option) => option.value)
      const uniqueValues = [...new Set(values)]
      authorSelect.innerHTML = uniqueValues
        .map((value) => `<option value="${value}">${value}</option>`)
        .join('')

      section.appendChild(queriesDiv)
      section.appendChild(logoDiv)

      container.appendChild(section)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

// Call the fetchDataAndCreateElements function to fetch data and create HTML elements
fetchDataAndCreateElements()

function filterResults() {
  const input = document.getElementById('searchInput')
  const filter = input.value.toUpperCase()
  const authorSelect = document.getElementById('author')
  const selectedAuthor = authorSelect.value

  const sectionTags = document.getElementsByTagName('section')
  const pAuthor = document.getElementsByClassName('queries-text')

  Array.from(sectionTags).forEach((section, i) => {
    const authorText = pAuthor[i].innerText
    const authorName = authorText.replace(/^Author:\s*/, '')

    // Check if the section matches the selected author, only if an author is selected
    const matchesAuthor = selectedAuthor ? authorName === selectedAuthor : true

    // Check if the author name includes the text input filter, only if text is entered
    const matchesFilter = filter
      ? authorName.toUpperCase().includes(filter)
      : true

    // Show or hide the section based on whether it matches all criteria
    section.style.display = matchesAuthor && matchesFilter ? '' : 'none'
  })
}
