function startReadingBox(){
 
  // 'global' vars
  var i=0;
  var limit;
  var words = [];
  var count = 0;
  var speedValue=125;
  var pause = false;
  var readingBox;
  var excludes = ['.',',','-','(',')','$','#','\'','"','’'];


//html string helper function
function insertHTML(htmlStr) {
    var rBFrag = document.createDocumentFragment(),
    temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        rBFrag.appendChild(temp.firstChild);
    }
    return rBFrag;
}

//speedRead sets up components needed for ReadingBox
function speedRead(){

  // setup ReadingBox divs
  document.body.insertBefore(insertHTML("<div id=\"RBWrap\"><div id=\"RBMain\"></div></div>"),null);
  document.getElementById('RBMain').insertBefore(insertHTML("\
    <span id=\"RBConfigurationBtn\">&#x2699;</span>\
    <span id=\"RBMenu\">\
      <span class=\"wpmWrap\">\
        <span class=\"wpmLabel\">WPM: </span>\
        <input value=\""+60000/speedValue+"\"type=\"text\"class=\"wpm\" id=\"wpmController\">\
      </span>\
      <span id=\"pausedRB\" style=\"display: none;\"></span>\
      <span id=\"RBThemeWrap\">\
        <span id=\"RBThemeLabel\">Theme: </span>\
        <span id=\"RBThemeTheme\">\
          <button class=\"RBMenuBtn\" id=\"RBThemeVanillaBtn\">Vanilla</button>\
          <button class=\"RBMenuBtn\" id=\"RBThemeWhiteThatchBtn\">White Thatch</button>\
          <button class=\"RBMenuBtn\" id=\"RBThemeSoftBlueBtn\">Soft Blue</button>\
          <button class=\"RBMenuBtn\" id=\"RBThemeLoudOrangeBtn\">Loud Orange</button>\
        </span>\
        <span id=\"RBThemeHidden\">RBThemeVanilla</span>\
      </span>\
      <span id=\"RBFontSizeWrap\">\
        <span id=\"RBFontSizeLabel\">Font Size: </span>\
        <span id=\"RBFontSizeBtns\">\
          <button class=\"RBMenuBtn\" id=\"RBFontSizeSmall\">Small</button>\
          <button class=\"RBMenuBtn\" id=\"RBFontSizeMedium\">Medium Thatch</button>\
          <button class=\"RBMenuBtn\" id=\"RBFontSizeLarge\">Large</button>\
          <button class=\"RBMenuBtn\" id=\"RBFontSizeExtraLarge\">Extra Large</button>\
        </span>\
        <span id=\"RBFontSizeHidden\">RBFontSmall</span>\
      </span>\
    </span>"),null);


//grab localStorage values if exist
if(localStorage.WPM != undefined){
  speedValue = localStorage.WPM;
}
if(localStorage.theme != undefined){
  $("#SRinactive").removeClass("RBThemeSoftBlue RBThemeVanilla RBThemeLoudOrange RBThemeWhiteThatch");
  $("#SRinactive").addClass(localStorage.theme);
  $('#RBThemeHidden').text(localStorage.theme);
}
if(localStorage.fontSize != undefined){
  $(".SRwrap").removeClass("RBFontSizeMedium RBFontSizeLarge RBFontSizeExtraLarge RBFontSizeSmall");
  $(".SRwrap").addClass(localStorage.fontSize);
  $('#RBFontSizeHidden').text(localStorage.fontSize);
}
  //make ReadingBox draggable
  $( "#RBMain" ).draggable();

  //pause on hover and clear timeouts queued if any -- restart readingBox on mouse out
  $("#RBMain").hover(
    function(){
      document.getElementById('pausedRB').innerHTML = i;
      pause = true;
      clearTimeout(readingBox);
      $("#SRinactive").removeClass('unpause');
      document.getElementById('RBConfigurationBtn').style.display = "inline";
    },
    function(){
      pause = false;
      speedRead1();
      document.getElementById('pausedRB').innerHTML = "";
      $("#SRinactive").addClass('unpause');
      document.getElementById('RBConfigurationBtn').style.display = "none";
      $("#RBMenu").slideUp();
    });

 //   document.getElementById('RBConfigurationBtn').onclick = "showMenu()"

$("#RBConfigurationBtn").click(function(){
  $("#RBMenu").slideToggle();
});
    //dynamically change WPM
    $('#wpmController').bind('input', function() { 
      speedValue = 60000/$(this).val(); // get the current value of the input field.
      localStorage.setItem("WPM", speedValue);
  });

// Theme Click Controllers

// White Thatch
$("#RBThemeWhiteThatchBtn").click(function(){
  $("#SRinactive").removeClass("RBThemeSoftBlue RBThemeVanilla RBThemeLoudOrange").addClass("RBThemeWhiteThatch");
  $('#RBThemeHidden').text("RBThemeWhiteThatch");
  localStorage.setItem('theme',"RBThemeWhiteThatch");
});

// Soft Blue
$("#RBThemeSoftBlueBtn").click(function(){
   $("#SRinactive").removeClass("RBThemeWhiteThatch RBThemeLoudOrange RBThemeVanilla").addClass("RBThemeSoftBlue");
   $('#RBThemeHidden').text("RBThemeSoftBlue");
   localStorage.setItem('theme',"RBThemeSoftBlue");

});

// Vanilla
$("#RBThemeVanillaBtn").click(function(){
   $("#SRinactive").removeClass("RBThemeWhiteThatch RBThemeSoftBlue RBThemeLoudOrange").addClass("RBThemeVanilla");
   $("#RBMenu").removeClass("RBThemeWhiteThatch RBThemeSoftBlue RBThemeLoudOrange").addClass("RBThemeVanilla");
     $('#RBThemeHidden').text("RBThemeVanilla");
       localStorage.setItem('theme',"RBThemeVanilla");

});

// Loud Orange
$("#RBThemeLoudOrangeBtn").click(function(){
   $("#SRinactive").removeClass("RBThemeSoftBlue RBThemeVanilla RBThemeWhiteThatch").addClass("RBThemeLoudOrange");
  $('#RBThemeHidden').text("RBThemeLoudOrange");
    localStorage.setItem('theme',"RBThemeLoudOrange");
});


// Font Size Controllers
$("#RBFontSizeSmall").click(function(){
  $(".SRwrap").removeClass("RBFontSizeMedium RBFontSizeLarge RBFontSizeExtraLarge").addClass("RBFontSizeSmall");
    $('#RBFontSizeHidden').text("RBFontSizeSmall");
      localStorage.setItem('fontSize',"RBFontSizeSmall");

});

$("#RBFontSizeMedium").click(function(){
  $(".SRwrap").removeClass("RBFontSizeSmall RBFontSizeLarge RBFontSizeExtraLarge").addClass("RBFontSizeMedium");
    $('#RBFontSizeHidden').text("RBFontSizeMedium");
    localStorage.setItem('fontSize',"RBFontSizeMedium");

});

$("#RBFontSizeLarge").click(function(){
  $(".SRwrap").removeClass("RBFontSizeSmall RBFontSizeMedium RBFontSizeExtraLarge").addClass("RBFontSizeLarge");
    $('#RBFontSizeHidden').text("RBFontSizeLarge");
    localStorage.setItem('fontSize',"RBFontSizeLarge");

});

$("#RBFontSizeExtraLarge").click(function(){
  $(".SRwrap").removeClass("RBFontSizeSmall RBFontSizeMedium RBFontSizeLarge").addClass("RBFontSizeExtraLarge");
    $('#RBFontSizeHidden').text("RBFontSizeExtraLarge");
        localStorage.setItem('fontSize',"RBFontSizeExtraLarge");

});

  //start readability alg--
  function grabArticle() {
    var allParagraphs = document.getElementsByTagName("p");
    var topDivCount = 0;
    var topDiv = null;
    var topDivParas;
    
    var articleContent = document.createElement("DIV");
    var articleTitle = document.createElement("H1");
    var articleFooter = document.createElement("DIV");
    
    // Replace all doubled-up <BR> tags with <P> tags, and remove fonts.
    var pattern =  new RegExp ("<br/?>[ \r\n\s]*<br/?>", "g");
    
    
    // Grab the title from the <title> tag and inject it as the title.
    articleTitle.innerHTML = document.title;
    
    // Study all the paragraphs and find the chunk that has the best score.
    // A score is determined by things like: Number of <p>'s, commas, special classes, etc.
    for (var j=0; j < allParagraphs.length; j++) {
      parentNode = allParagraphs[j].parentNode;

      // Initialize readability data
      if(typeof parentNode.readability == 'undefined')
      {
        parentNode.readability = {"contentScore": 0};     

        // Look for a special classname
        if(parentNode.className.match(/(comment|meta|footer|footnote)/))
          parentNode.readability.contentScore -= 50;
        else if(parentNode.className.match(/((^|\\s)(post|hentry|entry[-]?(content|text|body)?|article[-]?(content|text|body)?)(\\s|$))/))
          parentNode.readability.contentScore += 25;

        // Look for a special ID
        if(parentNode.id.match(/(comment|meta|footer|footnote)/))
          parentNode.readability.contentScore -= 50;
        else if(parentNode.id.match(/^(post|hentry|entry[-]?(content|text|body)?|article[-]?(content|text|body)?)$/))
          parentNode.readability.contentScore += 25;
      }

      // Add a point for the paragraph found
      if(getInnerText(allParagraphs[j]).length > 10)
        parentNode.readability.contentScore++;

      // Add points for any commas within this paragraph
      parentNode.readability.contentScore += getCharCount(allParagraphs[j]);
    }

    // Assignment from index for performance. See http://www.peachpit.com/articles/article.aspx?p=31567&seqNum=5 
    for(nodeIndex = 0; (node = document.getElementsByTagName('*')[nodeIndex]); nodeIndex++)
      if(typeof node.readability != 'undefined' && (topDiv == null || node.readability.contentScore > topDiv.readability.contentScore))
        topDiv = node;

    if(topDiv == null)
    {
      topDiv = document.createElement('div');
      topDiv.innerHTML = 'Sorry, readability was unable to parse this page for content. If you feel like it should have been able to, please <a href="http://code.google.com/p/arc90labs-readability/issues/entry">let us know by submitting an issue.</a>';
    }
    
    

   // console.log($(topDiv).text.split(/[\r\n ]/).filter(function(v){return v!==''}));
   // return $(topDiv).text
    return topDiv.innerText.split(/[\r\n ]/).filter(function(v){return v!==''});
  }

  // Get the inner text of a node - cross browser compatibly.
  function getInnerText(e) {
    if (navigator.appName == "Microsoft Internet Explorer")
      return e.innerText;
    else
      return e.textContent;
  }

  // Get character count
  function getCharCount ( e,s ) {
      s = s || ",";
    return getInnerText(e).split(s).length;
  }
  // end readability code

  words = grabArticle();
  
  speedRead1();
}

function speedRead1() {
      //get current i value from div if paused
    if(document.getElementById('pausedRB').innerHTML > 0){
        i = document.getElementById('pausedRB').innerHTML;
    }
    
    //need to make middleChar var           
    var middleChar;
    var startOfWord;
    var endOfWord;
    var theme = document.getElementById('RBThemeHidden').innerText;
    var fontSize = document.getElementById('RBFontSizeHidden').innerText;

    limit = words.length;
    var halflength = words[i].length/2;

    if(excludes.indexOf(words[i].substr(halflength,1)) === -1){
      startOfWord = words[i].substr(0,halflength);
      middleChar = words[i].substr(halflength,1);
      endOfWord = words[i].substr(halflength+1,words[i].length);
    } else {
      startOfWord = words[i].substr(0,halflength-1);
      middleChar = words[i].substr(halflength-1,1);
      endOfWord = words[i].substr(halflength,words[i].length);
    }


    var currentWord = 
      // start html wrap
      "<span id=\"SRinactive\" class=\"" + theme + " unpause\">" +
        // start active word
        " <span class=\"" + fontSize + " SRwrap\">" +
          //  first half of active word
          startOfWord +
          // highlight middle letter
          "<span class=\"SRactive\">" +
            middleChar +
          // end middle letter
          "</span>" +
          // last half of active word
          endOfWord +
        // end active word
        "</span>" +
      // end html wrap
      "</span>" ;

    // increment count -- not currently used
    count+=words[i].length+1;



    // replace word
    $('#SRinactive').remove();
    document.getElementById('RBMain').insertBefore(insertHTML(currentWord),document.getElementById('RBConfigurationBtn'));
    // increment i
    i++;


    // run RB if not paused
    if (i < limit && (!pause)){
        readingBox = setTimeout(speedRead1,speedValue);
    }
  
}
//kick it off when startReadingBox is called
speedRead();
}

