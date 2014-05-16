

//jqueryUI drag isn't working consistently

//startReadingBox is running before jquery is fully loaded or something... need to time that better

// add Jquery and JqueryUI


function startReadingBox(){


 
  // 'global' vars
  var i=0;
  var limit;
  var words = [];
  var count = 0;
  var speedValue=125;
  var pause = false;




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


function speedRead(){

  // setup ReadingBox
  document.body.insertBefore(insertHTML("<div id=\"RBWrap\"><div id=\"RBMain\"></div></div>"));
  document.getElementById('RBMain').insertBefore(insertHTML("<span id=\"RBMenu\"><span class=\"wpmWrap\"><span class=\"wpmLabel\">WPM: </span><input value=\""+60000/speedValue+"\"type=\"text\"class=\"wpm\"></span><span id=\"pausedRB\" style=\"display: none;\"></span></span>"));
  // document.getElementById('speedValue').innerHTML = speedValue;
$( "#RBMain" ).draggable();

$("#RBMain").hover(
  function(){
    document.getElementById('pausedRB').innerHTML = i;
    pause = true;
    $(".SRinactive").removeClass('unpause');
    $("#RBMenu").fadeIn();
  },
  function(){
    pause = false;
    speedRead1();
    document.getElementById('pausedRB').innerHTML = "";
    $(".SRinactive").addClass('unpause');
    $("#RBMenu").fadeOut();
    

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
  
  

  
  
  return topDiv.innerText.split(' ');
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


words = grabArticle();
  
  speedRead1();
}

function speedRead1() {
      if(document.getElementById('pausedRB').innerHTML > 0){
        i = document.getElementById('pausedRB').innerHTML;
      }
      if(document.getElementsByClassName('SRactive').length!== 0){
      document.getElementsByClassName('SRactive')[0].className = '';
  }
    limit = words.length;
    var halflength = words[i].length/2;
    var currentWord = 
      // start html wrap
      "<span class=\"SRinactive unpause\">" +
        // preceding word text
        //words[i-1] +
        // start active word
        " <span class=\"SRwrap\">" +
          //  first half of active word
          words[i].substr(0,halflength) +
          // highlight middle letter
          "<span class=\"SRactive\">" +
            words[i].substr(halflength,1) +
          // end middle letter
          "</span>" +
          // last half of active word
          words[i].substr(halflength+1,words[i].length) +
        // end active word
        "</span>" +
      // end html wrap
      "</span>" ;
    count+=words[i].length+1;




    $('.SRinactive').remove();
    document.getElementById('RBMain').insertBefore(insertHTML(currentWord),document.getElementById('RBMenu'));

    i++;


    // run RB

    if (i < limit && (!pause)){
       var readingBox = setTimeout(speedRead1,speedValue);
    }
    else{
        clearTimeout(readingBox);
    }
}

speedRead();
}


