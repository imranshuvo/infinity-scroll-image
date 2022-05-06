const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        //page is ready and everything is ready
        ready = true;
        loader.hidden = true;
        console.log('ready = ' + ready);
    }
}

// Helper to create an Attribute
// function setAttributes(element, attributes) {
//     for ( const key  )
// }
// Display the photos
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
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
            // Event Listener, check when each is finished loading
            img.addEventListener('load', imageLoaded);
            //Put the <img> inside the <a>, then put both inside imageContainer
            item.appendChild(img);
            imageContainer.appendChild(item);
        });
    }
}
    

// Unsplaash API
const count = 30;
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



// Event Listener
// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', function() {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos();
        console.log('Loaded more');
        // console.log('Window InnerHeight: ' + window.innerHeight);
        // console.log('Window ScrollY: ' + window.scrollY);
        // console.log('Body OffsetHeight: ' + document.body.offsetHeight);
    }
});

// Run the function on load
getPhotos();