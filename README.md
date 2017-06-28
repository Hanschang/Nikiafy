NIKIAFY
===
creater: @Hanschang

The beginning of what is going to be a simple Chrome extension.
It replaces all images on a website into one of our beloved USC president
<b>C. L. Max Nikias</b>

TODO
---
1. Add more images of different dimensions
2. Images aren't being replaced in some scenarios
3. A lot of photos resulted in error codes when being replaced
4. Check if correct number is shown on popup
5. Increase accuracy of replacement
6. Add button in popup to enable/disable the extension

Changelog
---
* 1.0.0: Initial commit. Simply replaces all initially loaded images with a single photo of Max Nikias
* 1.1.0: Images will now be replaced with a random nikias photo. Now instead of replacing photos on page load, it will now wait until all the photos are loaded to continue with replacing photos.
* 1.2.0: Added button in the popup that display the number of images replaced on the site
* 1.3.0: Now works for sites with infite scrolling (Ex. Reddit, Youtube, etc.). Newly loaded images are now properly replaced. Made it so the popup automatically updates with the latest number.s
* 1.4.0: Implemented methods to check the dimensions of the photos, and only replace images with nikias photos of similar dimensions. (Still needs to be worked on)