
// add Jquery and JqueryUI
script = document.createElement( 'script' );
script2 = document.createElement('script');
script2.src= 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js'
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js'; 
document.body.appendChild(script);
document.body.appendChild(script2);
setTimeout(startReadingBox(),1000);

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
 
  words = ['bleep','bloop','blork','blamp','sksksk'];
  
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
    var readingBox;
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
       readingBox = setTimeout(speedRead1,speedValue);
    }
    else{
        clearTimeout(readingBox);
    }
}

speedRead();
}
