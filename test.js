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
    const response = await fetch(`/data`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    console.log(data)

    // Select the section element where you want to create the data
    const container = document.querySelector('.container')

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
