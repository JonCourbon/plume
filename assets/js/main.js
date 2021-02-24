function switchMode(el,switchToLight,switchToDark) {
  const bodyClass = document.body.classList;
  const switchers=document.getElementsByClassName('theme-switch');
  if( bodyClass.contains('dark')){
    for(i=0;i<switchers.length;i++){
      switchers[i].innerHTML='☀️';
      switchers[i].title=switchToDark;
    }
    bodyClass.remove('dark');
    setTimeout(function() {
      localStorage.setItem('lightMode','true');
    }, 100);
  }
  else{
    for(i=0;i<switchers.length;i++){
      switchers[i].innerHTML='🌙';
      switchers[i].title=switchToLight;
    }
    bodyClass.add('dark');
    setTimeout(function() {
      localStorage.setItem('lightMode','false');
    }, 100);
  }
}

function pageMenuMode(el,switchToLight,switchToDark){
  console.log("pageMenuMode");
  const bodyClass = document.body.classList;
  const switchers=el.getElementsByClassName('theme-switch');
  if( bodyClass.contains('dark')){
    for(i=0;i<switchers.length;i++){
      switchers[i].innerHTML='🌙';
      switchers[i].title=switchToLight;
    }
  }
  else{
    for(i=0;i<switchers.length;i++){
      switchers[i].innerHTML='☀️';
      switchers[i].title=switchToDark;
    }
  }  
}

window.addEventListener('load', (event) => {
  var firstRun = true;
  var textInputElement = document.getElementById('searchField');
  textInputElement.addEventListener('keyup', function(){
    if(firstRun){
      loadSearch("index.json");
      firstRun=false;
      document.getElementById("fastSearch").style.visibility = "visible";
    }
    else{
      var text = this.value;
      if(fuse && text.length > 2){
        executeSearch(this.value);
      }
    }
  });
  
  var submenus = document.getElementsByClassName('submenu');
  for(i=0;i<submenus.length;i++){
    submenus[i].addEventListener('click', (e)=>{
      var submenus_item = document.getElementsByClassName("submenu-"+e.target.id);
      for(j=0;j<submenus_item.length;j++){
        submenus_item[j].classList.remove("invisible");
      }
      
    })
  }
});

/* Video lazy loading 
From: https://webdesign.tutsplus.com/tutorials/how-to-lazy-load-embedded-youtube-videos--cms-26743
*/
prepareVideos();
function prepareVideos(){
  var youtube_div = document.querySelectorAll( ".youtube" );
  for (var i = 0; i < youtube_div.length; i++) {
    // thumbnail image source.
    var source = "https://img.youtube.com/vi/"+ youtube_div[i].dataset.embed +"/sddefault.jpg"; 
    // Load the image asynchronously
    var image = new Image();
    image.src = source;
    image.alt = youtube_div[i].dataset.alt;
    image.addEventListener( "load", function() {
      youtube_div[i].appendChild( image );
    }(i));
    
    youtube_div[i].addEventListener( "click", function() {
      var iframe = document.createElement( "iframe" );
      iframe.setAttribute( "frameborder", "0" );
      iframe.setAttribute( "allowfullscreen", "" );
      iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1" );
      this.innerHTML = "";
      this.appendChild( iframe );
    } );
  }
}
