javascript:(function(){
var jsCode = document.createElement('script'),
	cssCode = document.createElement('link');

    jsCode.setAttribute('src', 'http://ptkwilliams.com/readingBox/speedread.js');
    cssCode.setAttribute('rel', 'stylesheet');
    cssCode.setAttribute("type", "text/css");
    cssCode.setAttribute('href', 'http://ptkwilliams.com/readingBox/speedread.css')                 
  document.body.appendChild(jsCode);
  document.getElementsByTagName("head")[0].appendChild(cssCode);

})();