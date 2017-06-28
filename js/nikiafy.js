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
// Global variable
var totalImage = 0;

// Reset totalImage on loading page, call nikiafy
window.onload = function() {
   totalImage = 0;
   nikiafy();
}

// On scroll, call nikiafy, and tell the popup to update totalImage
window.onscroll = function() {
   nikiafy();
   chrome.runtime.sendMessage({
      "request": "updatePopup",
      "info": totalImage
   });
}

// Main function to replace images
function nikiafy() {
   // Get all the images on the page
   var images = document.getElementsByTagName("img");

   // Check each one to see if they are already a nikias photo
   //if not, call randomize and replace, update totalImage replace
   for(var i = 0; i < images.length; i++) {
      var isInArray = inArray(images[i].src, nikias);
      if(!isInArray) {
         images[i].src = randomize();
         totalImage++;
      }
   }
}

// Send the totalImage variable to popup on request
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
   // console.log("notified nikiafy.js");
   if(msg.request === 'getNumImage') {
      // console.log("returning num");
      response(totalImage);
   }
})

// Check if a image is already part of the array
function inArray(check, array) {
   for(var i = 0; i < array.length; i++) {
      if(check === array[i]) return 1;
   }
   return 0;
}

// Return a random image src
function randomize() {
   var randNumber = Math.floor(Math.random() * nikias.length);

   return nikias[randNumber];
}