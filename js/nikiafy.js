// Nikiafy code

// URL for all the nikia photos
var nikias = [
   "https://news.usc.edu/files/2015/09/nikias.1800x1200-824x549.jpg",
   "https://about.usc.edu/files/2011/07/Nikias.jpg",
   "https://www.president.usc.edu/files/2011/07/nikias_color.jpg",
   "https://news.usc.edu/files/2013/01/Nikias.jpg",
   "https://www.president.usc.edu/files/2015/04/portrait.jpg",
   "https://www.neontommy.com/sites/default/files/uploads/Nikias_f.jpg",
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuMVZMganuIg0nUNC41TZ75qDs9JYeWw6NzEMOAY0JyTbSoZTz",
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeHkTF7OqEOsozY3lvqgQLSb54hRwexo8kY-UlwUL26pIXCWHpcg",
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIyxnq8vnEKKxZUT1XJBIh70bFW5Um9ruJJwW2iyz_FDhVTp9vA",
   "https://i.ytimg.com/vi/uj9z93ulL-w/maxresdefault.jpg",
   "https://i.vimeocdn.com/video/514048321_1280x720.jpg"
]

var totalImage;
// On page load, replace all images with a rondom one from nikias
// $(document).ready(function() {
$(document).ready(function() {
   nikiafy();   
})

function nikiafy() {
   var images = document.getElementsByTagName("img");
   totalImage = images.length;
   var imagesLoaded = 0;
   console.log(totalImage);
   for(var i = 0; i < totalImage; i++) {
      images[i].addEventListener('load', function() {
         imagesLoaded ++;
      }, false);
      if(imagesLoaded == totalImage) {
         break;
      }
   }

   for(var i = 0; i < images.length; i++)
   {
      images[i].src = randomize();
   }
}

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
   console.log("notified nikiafy.js");
   if(msg.request === 'getNumImage') {
      console.log("returning num");
      response(totalImage);
   }
})

function getImageNum() {
   return totalImage;
}


function randomize() {
   var randNumber = Math.floor(Math.random() * nikias.length);

   return nikias[randNumber];
}