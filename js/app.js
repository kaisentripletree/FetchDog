const select = document.getElementById('breeds');
const card = document.querySelector('.card');

// ------------------------------------------
//  ADD YOUR FETCH FUNCTIONS & CODE
// ------------------------------------------



// ------------------------------------------
//  ADD YOUR CODE TO REPLACE BELOW WITH THE BREED LIST FROM THE API
// ------------------------------------------
// select.innerHTML = " <option value='Breed 1'>Breed 1</option>" +
//     " <option value='Breed 2'>Breed 2</option>" +
//     "<option value='Breed 3'>Breed 3</option>";


async function showRandomImg() {
    const imgItem = await getRandomImgUrl() 
    const imgStn = imgItem.message;
    card.innerHTML = `<img src=${imgStn} />`
}


async function getRandomImgUrl() {
    return fetch('https://dog.ceo/api/breeds/image/random')
            .then((response) => response.json())
            .catch((err) => console.error(err));
}

async function showList() {
    const listItem = await getList();
    const listMsg = listItem.message;
    const listArr = Object.keys(listMsg)
    let listStr = "<option disabled selected value></option>"
    for(let i=0; i<listArr.length; i++) {
        listStr += "<option value='Breed " + (i+1) + "'>" + listArr[i] +"</option>"
    }
    select.innerHTML = listStr;
}

async function getList() {
    return fetch('https://dog.ceo/api/breeds/list/all')
            .then((response) => response.json())
            .catch((err) => console.error(err));
}

async function showSelectedImg() { 
    const imgItem = await generateSelectedUrl();
    const imgStn = imgItem.message;
    card.innerHTML = `<img src=${imgStn} />`
}

function generateSelectedUrl() {
    const e = document.getElementById("breeds");
    const selectedBreed = e.options[e.selectedIndex].text;   
    let url = `https://dog.ceo/api/breed/${selectedBreed}/images/random` 
    return fetch(url)
            .then((response) => response.json())
            .catch((err) => console.error(err));
}

showRandomImg()
showList()

select.addEventListener('change', showSelectedImg)