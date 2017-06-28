function setInfo(info) {
   // console.log("got info: " + info);
   document.getElementById('nikias').textContent = "Images replaced by Nikias: " + info;
}

window.onload = function() {
   // console.log("sending getNumImage request");

   chrome.tabs.query({
      active:true,
      currentWindow:true
   }, function(tabs) {
      chrome.tabs.sendMessage(
         tabs[0].id,
         {'request': 'getNumImage'},
         setInfo);
   });
}

chrome.runtime.onMessage.addListener(function(msg, sender, response) {
   if(msg.request === "updatePopup") {
      setInfo(msg.info);
   }
})


