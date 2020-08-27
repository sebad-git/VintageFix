
$(document).ready(function(){ smoothScroll(); translate(); });

  function smoothScroll(){

    $("a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
      $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 900, function(){
         window.location.hash = hash;
        });
      }
    });

  }

 function translate(){
   try {
    if(navigator.language.includes("es")){ setSpanish(); }
   }
   catch (error) { alert(error); }
  }

  function setSpanish(){
      //LINKS
      setTextById('nav-home'," Inicio");
      setTextById('projects-link'," Proyectos");
      setTextById('contact-link'," Contacto");
      //HEADERS
      setTextById('movies-lbl',"Peliculas");
  }

  function setTextById(tagId,text){
    try {
      const tag = document.getElementById(tagId);
      if(tag){ tag.textContent = text; }
    } catch (error) { alert(error); }
  }
   
  function setPlaceHolderById(tagId,text){
    try {
      const tag = document.getElementById(tagId);
      if(tag){ tag.placeholder = text; }
    } catch (error) { alert(error); }
  }

  function setTextByClass(className,text){
    try {
      const tags = document.getElementsByClassName(className);
      if(tags && tags.length>0){ 
        for (i = 0; i < tags.length; i++) { tags[i].textContent = text; }
      }
    } catch (error) { alert(error); }

  }