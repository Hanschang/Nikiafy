function setInfo(info) {
   console.log("got info: " + info);
   document.getElementById('nikias').textContent = "Images replaced by Nikias: " + info;
}
// "DOMContentLoaded"

$(document).ready(function() {
   document.getElementById('numImg').addEventListener('click', function() {
   // window.addEventListener('DOMContentLoaded', function() {
      console.log("sending getNumImage request");

      chrome.tabs.query({
         active:true,
         currentWindow:true
      }, function(tabs) {
         chrome.tabs.sendMessage(
            tabs[0].id,
            {'request': 'getNumImage'},
            setInfo);
      });
      // chrome.runtime.sendMessage({'request': 'getNumImage'}, setInfo);
   });
})