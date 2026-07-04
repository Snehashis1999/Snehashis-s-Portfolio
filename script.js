/*=========================================
    LIGHTBOX
=========================================*/
console.log("Script Loaded");

let currentImage = null;

function openLightbox(src, title = "") {

    let lightbox = document.getElementById("lightbox");

    if (!lightbox) {

        lightbox = document.createElement("div");

        lightbox.id = "lightbox";

        lightbox.className = "lightbox";

        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img src="" alt="">
        `;

        document.body.appendChild(lightbox);

        lightbox.addEventListener("click", function(e){

            if(
                e.target === lightbox ||
                e.target.classList.contains("lightbox-close")
            ){

                closeLightbox();

            }

        });

    }

    currentImage = lightbox.querySelector("img");

    currentImage.src = src;

    currentImage.alt = title;

    lightbox.classList.add("active");

}



function closeLightbox(){

    const lightbox = document.getElementById("lightbox");

    if(lightbox){

        lightbox.classList.remove("active");

    }

}



/*=========================================
    ESC TO CLOSE
=========================================*/

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        closeLightbox();

    }

});



/*=========================================
    IMAGE CLICK
=========================================*/

document.querySelectorAll(".dashboard-card img").forEach(img=>{

    img.addEventListener("click",function(){

        openLightbox(this.src,this.alt);

    });

});



/*=========================================
    SCROLL REVEAL
=========================================*/

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:.15

}

);



document.querySelectorAll(

".problem-card,.stack-card,.feature-card,.dashboard-card,.recommendation-card,.insight-card,.stat-card"

).forEach(card=>{

card.classList.add("hidden");

observer.observe(card);

});



/*=========================================
    ACTIVE NAVIGATION
=========================================*/

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-120;

if(pageYOffset>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});



/*=========================================
    BACK TO TOP BUTTON
=========================================*/

const topButton=document.createElement("button");

topButton.innerHTML="↑";

topButton.id="topBtn";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topButton.classList.add("show");

}

else{

topButton.classList.remove("show");

}

});

topButton.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});



/*=========================================
    HERO PARALLAX
=========================================*/

window.addEventListener("scroll",()=>{

const hero=document.querySelector(".hero");

if(hero){

hero.style.backgroundPositionY=(window.scrollY*0.4)+"px";

}

});



/*=========================================
    TECH BADGE HOVER
=========================================*/

document.querySelectorAll(".tech-badges span").forEach(tag=>{

tag.addEventListener("mouseenter",()=>{

tag.style.transform="translateY(-4px)";

});

tag.addEventListener("mouseleave",()=>{

tag.style.transform="translateY(0px)";

});

});



/*=========================================
    COUNTER ANIMATION
=========================================*/

document.querySelectorAll(".stat-card h3").forEach(counter=>{

const text=counter.innerText.replace(/,/g,'');

const target=parseInt(text);

if(isNaN(target)) return;

let count=0;

const step=Math.ceil(target/100);

function update(){

count+=step;

if(count>target){

count=target;

}

counter.innerText=count.toLocaleString();

if(count<target){

requestAnimationFrame(update);

}

}

observer.observe(counter.parentElement);

counter.parentElement.addEventListener("transitionend",update,{once:true});

});



/*=========================================
    SMOOTH BUTTON HOVER
=========================================*/

document.querySelectorAll("a").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transition=".3s";

});

});