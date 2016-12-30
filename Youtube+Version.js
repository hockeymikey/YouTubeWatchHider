// ==UserScript==
// @version        1.0.0
// @name           YoutubeWatchHider - Hide watched videos on sub feed.
// @namespace      https://github.com/hockeymikey/YouTubeWatchHider
// @match          *://www.youtube.com/*
// @updateURL      https://raw.githubusercontent.com/hockeymikey/YouTubeWatchHider/master/YouTubeWatchHider.js
// @downloadURL    https://raw.githubusercontent.com/hockeymikey/YouTubeWatchHider/master/YouTubeWatchHider.js
// @grant          none
// @run-at document-idle
// ==/UserScript==

var HideVideos = function () {
  var toggleVal = localStorage.getItem('hockeyYTubeToggle');
  if (toggleVal == 'true') {
    var i,
    element,
    feed = document.querySelectorAll('#browse-items-primary ol li');
    for (i = 0; i < feed.length; i++) {
      element = feed[i];
      if (element.style.display == 'none' && element.querySelector('div.contains-percent-duration-watched') !== null) {
        element.style.display = 'none';
      }
    }
  }
};
var undoHide = function () {
  var i,
  element,
  feed = document.querySelectorAll('#browse-items-primary ol li');
  for (i = 0; i < feed.length; i++) {
    element = feed[i];
    if (element.style.display == 'none' && element.querySelector('div.contains-percent-duration-watched') !== null) {
      element.style.display = 'inline-block';
    }
  }
};
function toggleHiddenYT(el) {
  if (el.target.checked == true) {
    localStorage.setItem('hockeyYTubeToggle', 'true');
    HideVideos();
  } else {
    localStorage.setItem('hockeyYTubeToggle', 'false');
    undoHide();
  }
}
console.log('ee');
//var div = document.querySelector('ul.yt-uix-menu-top-level-button-container');branded-page-v2-top-row
var div = document.querySelector('div.yt-card.clearfix');
console.log('end');
var toggleVal = localStorage.getItem('hockeyYTubeToggle');
var liEl = document.createElement('div');
var cBox = document.createElement('input');
cBox.type = 'checkbox';
cBox.addEventListener('click', function (event) {
  toggleHiddenYT(event);
});
if (toggleVal == 'true') {
  cBox.checked = true;
}
liEl.appendChild(cBox);
liEl.title = "Hide watched videos.";
div.insertBefore(liEl,div.childNodes[0]);
console.log('end');
if (window.location.pathname.startsWith('/feed/subscriptions')) {
  HideVideos();
  if (MutationObserver) {
    new MutationObserver(HideVideos).observe(document.querySelector('.feed-list, #browse-items-primary ol'), {
      childList: true
    });
  }
}
document.addEventListener('spfdone', function (e) {
  if (e.detail.url.includes('/feed/subscriptions')) {
    HideVideos();
  }
});
console.log('end');
