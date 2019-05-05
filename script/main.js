document.getElementsByTagName("html")[0].className += " js";

window.onload = function () {
    
    getArticleData();
    
};

function handleToggleImage() {
        
    var blackoutElem = document.getElementById("blackout-background"); 
    var imageElem = document.getElementById("image-container"); 
    var currentPosition = window.pageYOffset;
    blackoutElem.style.top = currentPosition + 'px';
    var body = document.body,
    html = document.documentElement;
    var pageHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    blackoutElem.style.height = pageHeight + 'px';
    
    if(this.tagName === "IMG"){
        var selectedImageSrc = this.src;
    }else{
        var selectedImageSrc = '';
    }
    
    if(blackoutElem.style.display === 'none'){
        //Not open, hence needs to be opened.
        blackoutElem.style.display = 'block';
        document.getElementsByTagName("html")[0].style.overflow = 'hidden';
        
    }else if(blackoutElem.style.display === 'block'){
        //Open, hence needs to be closed. 
        blackoutElem.style.display = 'none';
        document.getElementsByTagName("html")[0].style.overflow = 'auto';

    }
    
    imageElem.src = selectedImageSrc;

}

function getArticleData() {
    
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            
            var json = JSON.parse(this.responseText);
            
            for (var i = 0; i < json.length; i++) {
                //createItem(type,title,text,images,date)
                createItem(json[i]['article_type'],json[i]['article_title'],json[i]['article_description'],json[i]['images'], json[i]['date_created']);
            }
            
            prepTimeline();
        }
    };

    xhttp.open("GET", "php/get_articles.php", true);
    xhttp.send();
    
}

function createItem(type,title,text,images,date) {
    
    var parentElem = document.createElement("DIV");
    parentElem.classList.add("cd-timeline__block");
    
    var typeContainer = document.createElement("DIV");
    typeContainer.classList.add("cd-timeline__img");
    
    var typeImgElem = document.createElement("IMG");
    typeImgElem.alt = type;
    
    var mainContainer = document.createElement("DIV");
    mainContainer.classList.add("cd-timeline__content");
    mainContainer.classList.add("text-component");
    
    switch(type) {
        case 'article':
            typeContainer.classList.add("cd-timeline__img--picture");
            typeImgElem.src = 'images/cd-icon-article.svg';
            
            var titleElem = document.createElement("H2");
            titleElem.innerHTML = title;
            mainContainer.appendChild(titleElem);

            var paragraphElem = document.createElement("P");
            paragraphElem.innerHTML = text;
            paragraphElem.classList.add="text--subtle";
            mainContainer.appendChild(paragraphElem);
            
            for (var i = 0; i < images.length; i++) {
            
                var imgContainer = document.createElement("DIV");
                imgContainer.classList.add("thumbnail-container");
                
                var imgElem = document.createElement("IMG");
                imgElem.src = images[i]['image_url'];
                imgElem.alt = images[i]['image_alt'];
                imgElem.classList.add("thumbnail");
                imgElem.addEventListener("click", handleToggleImage);
                
                imgContainer.appendChild(imgElem);
                mainContainer.appendChild(imgContainer);
            }
            
            break;
            
        case 'location':
            typeContainer.classList.add("cd-timeline__img--location");
            typeImgElem.src = 'images/cd-icon-location.svg';
            break;
            
        case 'movie':
            typeContainer.classList.add("cd-timeline__img--movie");
            typeImgElem.src = 'images/cd-icon-movie.svg';
            break;
            
        case 'picture':
            typeContainer.classList.add("cd-timeline__img--picture");
            typeImgElem.src = 'images/cd-icon-picture.svg';
            
            for (var i = 0; i < images.length; i++) {
            
                var imgContainer = document.createElement("DIV");
                imgContainer.classList.add("thumbnail-container");
                
                var imgElem = document.createElement("IMG");
                imgElem.src = images[i]['image_url'];
                imgElem.alt = images[i]['image_alt'];
                imgElem.classList.add("thumbnail");
                imgElem.addEventListener("click", handleToggleImage);
                
                imgContainer.appendChild(imgElem);
                mainContainer.appendChild(imgContainer);
            }
            
            break;
        
    }
    
    var dateParentElem = document.createElement("DIV");
    dateParentElem.classList.add("flex");
    dateParentElem.classList.add("flex--space-between");
    dateParentElem.classList.add("flex--center-y");
    
    var dateElem = document.createElement("SPAN");
    dateElem.classList.add("cd-timeline__date");
    dateElem.innerHTML = date;
    
    dateParentElem.appendChild(dateElem);
    mainContainer.appendChild(dateParentElem);
    
    
    typeContainer.appendChild(typeImgElem);
    
    parentElem.appendChild(typeContainer);
    parentElem.appendChild(mainContainer);
    
    document.getElementById("timeline").appendChild(parentElem);

}