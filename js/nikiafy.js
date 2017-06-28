// Nikiafy code
// URL for all the nikia photos
var nikias = [
   "https://news.usc.edu/files/2015/09/nikias.1800x1200-824x549.jpg", //783x521 (1.50)
   "https://about.usc.edu/files/2011/07/Nikias.jpg", //400x600 (0.67)
   "https://www.president.usc.edu/files/2011/07/nikias_color.jpg", //200x300 (0.67)
   "https://news.usc.edu/files/2013/01/Nikias.jpg", //335x376 (0.89)
   "https://www.president.usc.edu/files/2015/04/portrait.jpg", // 400x676 (0.59)
   "https://www.neontommy.com/sites/default/files/uploads/Nikias_f.jpg", //397x476 (0.83)
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuMVZMganuIg0nUNC41TZ75qDs9JYeWw6NzEMOAY0JyTbSoZTz", //183x275 (0.66)
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeHkTF7OqEOsozY3lvqgQLSb54hRwexo8kY-UlwUL26pIXCWHpcg", //275x183 (1.50)
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIyxnq8vnEKKxZUT1XJBIh70bFW5Um9ruJJwW2iyz_FDhVTp9vA", //151x200 (0.755)
   "https://i.ytimg.com/vi/uj9z93ulL-w/maxresdefault.jpg", //783x440 (1.78)
   "https://i.vimeocdn.com/video/514048321_1280x720.jpg", //783x440 (1.78)
   // "http://dailytrojan.com/wp-content/uploads/2010/04/nikiasGaryFung-web.jpg", //1000x898 (1.11)
   //"https://usa.greekreporter.com/files/2010/03/Nikias.jpg", //335x353 (0.94)
   //"https://www.lamag.com/wp-content/uploads/sites/9/2014/10/educationovemberfeature-e1412714842442.jpg", //850x640 (1.33)
   "https://static1.squarespace.com/static/578022a246c3c42c52698f88/t/578c550cf7e0ab358fd6c279/1468814608272/", //600x600 (1.00)
   // "https://media.gettyimages.com/photos/president-cl-max-nikias-commemorates-the-usc-shoah-foundations-20th-picture-id486735427", //1024x872 (1.17)
   "https://i0.wp.com/situne-ic.com/wp-content/uploads/2015/12/team6.jpg?w=640", // 325x425 (0.76)
   "https://4.bp.blogspot.com/_ioI1_pQKUAU/TNQymSDq60I/AAAAAAAACmc/99MTrlxqZz4/s320/PA159931.jpg", // 640x420 (0.75)
   "https://1.bp.blogspot.com/_ioI1_pQKUAU/TNQyyPyasoI/AAAAAAAACnI/EEUP2mkvq9A/s320/PA150005.JPG", //320x240 (1.33)
   // "http://www.trojancandy.com/2014/nikiasm.jpg", // 800x600 (1.33)
   // "https://incubate.usc.edu/wp-content/uploads/2015/07/Max-Nikias_sm.jpg", //1361x1361 (1.00)
   // "http://dailytrojan.com/wp-content/uploads/2012/03/GSG_web.jpg", //900x900 (1.00)
   "http://latimesblogs.latimes.com/.a/6a00d8341c630a53ef01539193918d970b-pi" //620x418 (1.53)
   // "https://media.gettyimages.com/photos/university-of-southern-california-president-c-l-max-nikias-attends-picture-id487662544?k=6&m=487662544&s=594x594&w=0&h=NrmyzMnNjSDDTZNVeg7gWy3bMIHNq7gNOjRAqmODGuA=", //1.46
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
         images[i].src = randomize(images[i].width/images[i].height);
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

// Return a random image src, passes in the original image's dimensions
function randomize(dim) {
   // Set the initial variables
   var flag = false;
   var repeat = 0;
   var maxRepeat = nikias.length;
   var randNumber

   // As long as flag is not set and haven't repeated enough times yet
   while(!flag && repeat < maxRepeat) {
      // Increment repeat
      repeat ++;
      // Get a random number, and set image's source
      randNumber = Math.floor(Math.random() * nikias.length);
      var image = new Image();
      image.src = nikias[randNumber];
      // Calculate the difference between dimensions when image's loaded
      image.addEventListener("load", function() {
         var nDim = parseInt(this.width) / parseInt(this.height);
         // If within 0.2 of each other, set flag to true
         if(Math.abs(nDim - dim) <= 0.2) {
            console.log("Replacing... " + dim + " ---> " + nDim);
            flag = true;
         }
      })
   }
   // If flag is never set (no image is found), then just replace with random photo
   if(repeat >= maxRepeat) {
      randNumber = Math.floor(Math.random() * nikias.length);
   }

   // Return the url
   return nikias[randNumber];
}







