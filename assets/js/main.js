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
});
