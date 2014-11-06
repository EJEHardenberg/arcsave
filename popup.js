// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


var arcGenerator = {
  genArc: function(url) {
    /* If on twitter also send to tweetsave */
    if(url.match(/twitter.com/)){
      setTimeout(function(){
        open('http://tweetsave.com/?tweet='+encodeURIComponent(url))
      },10)
      
    } 
    setTimeout(function(){
      open('https://archive.today/?run=1&url='+encodeURIComponent(url))  
    },10)    
  },
};

document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query(
    {
      'active': true,   
      'windowId' : chrome.windows.WINDOW_ID_CURRENT
    }, 
    function(tabs){
      var tab = tabs[0];
      var url = tab.url;
      arcGenerator.genArc(url);
    });
});
