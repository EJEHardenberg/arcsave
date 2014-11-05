// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


var arcGenerator = {
  genArc: function(url) {
    open('https://archive.today/?run=1&url='+encodeURIComponent(url))
    /* If on twitter also send to tweetsave */
    if(url.match(/twitter.com/)){
      open('http://tweetsave.com/?tweet='+encodeURIComponent(url))
    } 
  },
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query(
    {
      active: true,               // Select active tabs
      lastFocusedWindow: true 
    }, 
    function(array_of_tab){
      var tab = array_of_tab[0];
      var url = tab.url;
      arcGenerator.genArc(url);
    });
});
