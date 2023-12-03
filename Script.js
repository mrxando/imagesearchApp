const searchForm = document.getElementById('searchForm')
const searchBox = document.getElementById('searchBox')
const searchResult = document.getElementById('searchResult')
const showMoreBtn = document.getElementById('showMoreBtn')



let keyword= ''
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=web3ukHdMa0Lg3yh0q9DR8A2USJMDoO1agucE_nSd1o&per_page=12`
    if( page === 1){
        searchResult.innerHTML = '';
    }
    await fetch(url).then((res) => res.json())
    .then((data) => {
        const results = data.results;
        results.map((results) =>{
            const image = document.createElement('img')
            image.src = results.urls.small;
            const imageLink = document.createElement('a')
            imageLink.href = results.links.html;
            imageLink.target = "_blank";
            imageLink.appendChild(image)
            searchResult.appendChild(imageLink)
        })
        
    })
    if(searchResult.children.length > 11){
        showMoreBtn.style.display = 'block'
    }
}

searchForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    page = 1;
    searchImages();
})

showMoreBtn.addEventListener('click', ()=>{
    page++
    searchImages();
})