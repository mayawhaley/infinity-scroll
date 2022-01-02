const container = document.querySelector(".container")

const URL = "https://images-api.nasa.gov/search?q=galaxy&keywords=star,space,hubble,galaxy&media_type=image"


function getRanNumber() {
    return Math.floor(Math.random() * 79)
}

function getData() {
    return fetch(URL).then(response => response.json()).then(data => {return data})
}

async function getImages(numImages = 10) {
    let data = await getData()
    let i = 0;

    // load 10 images at a time
    while (i < numImages) {
        let randomNum = getRanNumber();
        
        const utc_date = document.createElement('h2')
        const div = document.createElement('div')
        
        img = data.collection.items[randomNum].links[0].href
        title = data.collection.items[randomNum].data[0].title
        desc = data.collection.items[randomNum].data[0].description
        center = data.collection.items[randomNum].data[0].center

        let iso_date = data.collection.items[randomNum].data[0].date_created
        utc_date.innerHTML = new Date(iso_date)

        div.classList.add('data-container')
        div.innerHTML = `
                        <h2> ${title}</h2>
                        <img src="${img}" alt=${title}>
                        <div class="data">
                            <div> Center: ${center}</div>
                            <div> Date: ${utc_date.innerHTML = new Date(iso_date)}</div>
                            <p> ${desc}</p>
                        </div>`
        container.appendChild(div)

        i++
    }
}
getImages()

window.addEventListener("scroll", () => {
    // if we've reached the end of the screen, load more images
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        getImages()
    }
})

// toggles between light and dark mode
function toggleButton() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

