// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


var arcGenerator = {
  genArc: function(url) {
    /* If on twitter also send to tweetsave */
    if(url.match(/twitter.com\/[^\/]+\/status/)){
      setTimeout(function(){
        open('http://tweetsave.com/?tweet='+encodeURIComponent(url))
      },10)
      
    } 
    setTimeout(function(){
      open('https://archive.today/?run=1&url='+encodeURIComponent(url))  
    },10)    
    //Because 1 is never enough, peep needs a post request, so FORM it is
    setTimeout(function(){
      var form = document.createElement('form')
      form.method = 'POST'
      form.action = 'http://www.peeep.us/upload.php'
      form.setAttribute('enctype', "application/x-www-form-urlencoded")

      var urlInput = document.createElement('input')
      urlInput.setAttribute('name','r_url')
      
      urlInput.setAttribute('value',url)
      urlInput.textContent = url

      form.appendChild(urlInput)

      var formurl = 'data:text/html;charset=utf8,';
      formurl += encodeURIComponent(form.outerHTML);
      formurl += encodeURIComponent('<h1><marquee direction=right>Archiving.Please Wait</marquee></h1><script>document.forms[0].submit();</script>');

      open(formurl)
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
