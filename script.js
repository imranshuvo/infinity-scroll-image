const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];


// Display the photos
function displayPhotos(){
    if(photosArray.length > 0){
        photosArray.forEach((photo) => {
            // Create <a> to linked to Unsplash
            const item = document.createElement('a');
            item.setAttribute('href', photo.links.html);
            item.setAttribute('target','_blank');

            // Create <img> for photo
            const img = document.createElement('img');
            img.setAttribute('src', photo.urls.regular);
            img.setAttribute('alt', photo.alt_description);
            img.setAttribute('title', photo.alt_description);

            //Put the <img> inside the <a>, then put both inside imageContainer
            item.appendChild(img);
            imageContainer.appendChild(item);
        });
    }
}
    

// Unsplaash API
const count = 10;
const accesKey = 't7ZHQlOgH3sSm95KOIkDpovONi7c-BSs5bKvuFATnQY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accesKey}&count=${count}`;

async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch (error){
        console.log(error);
    }
   
}

// Run the function on load
getPhotos();