// local storig
function local_storig(){
    let mainColor = localStorage.getItem("color_option");
    if (mainColor !== null){
        document.documentElement.style.setProperty("--main--color",mainColor)

        // chick for items class
        document.querySelectorAll(".colors-list li").forEach(element => {
            element.classList.remove("active");

            // add active class to elemnt
            if(element.getAttribute("data-color") == mainColor){
                element.classList.add("active")
            }
        })
        // add active class to elemnt


    }
}
local_storig()

// sidebar 
function setting_box(){
    // toggel spin class
    document.querySelector(".toggle-settings i").onclick = function() {
        this.classList.toggle("fa-spin")
        //open setting box
        document.querySelector(".setting-box").classList.toggle("open");
    }

    // list color
    const list = document.querySelectorAll(".colors-list li");
        for( i = 0 ; i < list.length ; i++){
          var color = list[i].getAttribute("data-color");
            list[i].style.backgroundColor = color
        }

    // switch colors
    list.forEach(li => {
        
        li.addEventListener("click",function(e){
            // set color on root
        document.documentElement.style.setProperty("--main--color", e.target.getAttribute("data-color"));

            //set color on local storage

            localStorage.setItem("color_option",e.target.getAttribute("data-color"))

            // remove active class from all chid
            handelActive(e)
        })
    });
    
}
setting_box()

    //background stop or go

    let backgroundOption = true;

    // bg interval

    let backgroundInterval;

    // bg localstorage

    let backgroundLocal = localStorage.getItem("background_option");

    if(backgroundLocal !== null){
        if(backgroundLocal === "true"){
            backgroundOption = true
        }else{
            backgroundOption = false;
        }
        // remove class form span
        document.querySelectorAll(".random-background span").forEach(element => {
            element.classList.remove("active");
        })
        if(backgroundLocal === "true"){
            document.querySelector('.yes').classList.add("active")
        }else{
            document.querySelector('.no').classList.add("active")
        }
    }

//switch random background

function switch_bg(){
    const random_bg = document.querySelectorAll(".random-background span");

    random_bg.forEach(span => {
        //onclik span

        span.addEventListener("click",function(e){

            handelActive(e)

            if(e.target.getAttribute("data-background") == "yes"){
                backgroundOption = true
                background();
                localStorage.setItem("background_option", true);
            }else{
                backgroundOption = false;
                clearInterval(backgroundInterval);
                localStorage.setItem("background_option", false)
            }
        })
    })


}
switch_bg()

// chande head background
function background(){
    // selece landing-page
    let landingPage = document.querySelector(".landing-page");

    //arry for src img
    let imgsArray=["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];





// random bg function

    function stop_go_bg() {

        if(backgroundOption){
            backgroundInterval = setInterval(function () {
                // get random number
                    let randomNumber = Math.floor(Math.random() * imgsArray.length);
                //change background img url
                landingPage.style.backgroundImage = 'url("img/'+imgsArray[randomNumber]+'")'; 
        
            },1000)
        }
        
    }
    stop_go_bg()
}
background();

// our skill anmation
function skills (){
    let ourSkills = document.querySelector('.skills');

    window.onscroll = function(){
        //skills offset top
        let skillsOffset = ourSkills.offsetTop;

        //skills outer Height
        let skillsOuter = ourSkills.offsetHeight;

        //window Height
        let windowHeight = window.innerHeight;

        //window ScrollTop
        let windowScrollTop = this.pageYOffset;

        if(windowScrollTop > (skillsOffset + skillsOuter - windowHeight)){
            let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
            allSkills.forEach(el => {
                el.style.width = el.getAttribute("data-progerss");
            })
        }
    }
}
skills()

// popu imges

function popUp(){
    let ourGallery = document.querySelectorAll(".gallery img");
    
    ourGallery.forEach(img => {
        
        img.addEventListener('click', (e) => {
            // creat overlay element
            let overLay = document.createElement("div");

            //add class to overLay
            overLay.className='popup-overlay';

            //append overLay to body
            document.body.appendChild(overLay);

            //creat img cont
            let popupBox = document.createElement("div");

            popupBox.className = "popup-box"

            // creat alt text

            if(img.alt !== null){
                // creat alt title
                let imgHead = document.createElement("h3");
                
                // get imghead cont from elt

                let imgText = document.createTextNode(img.alt);

                //add text to img 
                imgHead.prepend(imgText);

                // add img to the box

                popupBox.appendChild(imgHead)
            }

            // creat img
            popupImg = document.createElement('img');

            // set img src
            popupImg.src = img.src;

            //add img to popup
            popupBox.appendChild(popupImg);

            // add box to body
            document.body.appendChild(popupBox);

            // creat close span
            let closeBox = document.createElement("span");

            //ceart X 
            let colseText = document.createTextNode("X");

            closeBox.appendChild(colseText);

            //creat class
            closeBox.className = "close-box";
            
            popupBox.appendChild(closeBox)
        })

        // close popup

        document.addEventListener('click', function(e) {
            if(e.target.classList == "close-box"){
                e.target.parentNode.remove();
                document.querySelector('.popup-overlay').remove();
            }
        })

    })
}
popUp()

//select el

    let bullets = document.querySelectorAll(".nav-bullets .bullet");
    let links = document.querySelectorAll(".links a");
     
//smooth scroll function
function scrollToSomeWhere(element){
    element.forEach(el => {
        el.addEventListener('click',function(e){
            e.preventDefault();

            document.querySelector(e.target.getAttribute('data-section')).scrollIntoView({
                behavior : 'smooth'
            })
        })
    })
}
scrollToSomeWhere(bullets)
scrollToSomeWhere(links)

// handel class active

function handelActive(ev){
    // remove Active class
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    })
    ev.target.classList.add("active");
}

// show or hiden bullets
    function bulletsDisplay(){
        let bulletsSpan = document.querySelectorAll('.bullets-option span');
        let bulletsCont = document.querySelector('.nav-bullets');
        let bulletsLocal = localStorage.getItem("bullets_option");
        // save in local storig
        if(bulletsLocal !== null){

            bulletsSpan.forEach(span => {
                span.classList.remove("active")
            })
        }

        if(bulletsLocal === "block"){
            bulletsCont.style.display = "block";

            document.querySelector(".bullets-option .yes").classList.add("active");
        }else{
            bulletsCont.style.display = "none";
            document.querySelector(".bullets-option .no").classList.add("active");
        }
        


        bulletsSpan.forEach(span => {

            span.addEventListener('click', function(e){

                handelActive(e)
                
                if(span.getAttribute("data-display") == "show"){
                    bulletsCont.style.display = "block";
                    localStorage.setItem("bullets_option", "block");
                }else{
                    bulletsCont.style.display = "none";
                    localStorage.setItem("bullets_option", "none");
                }
            })
        })
    }
    bulletsDisplay()

    // reset option

    function reset(){
        document.querySelector(".reset-option").onclick = function(){
            localStorage.removeItem("color_option");
            localStorage.removeItem("background_option");
            localStorage.removeItem("bullerts_option");

            window.location.reload()

        }
    }
    reset()

    //open navbar
    let toggleButtom = document.querySelector(".toggle");
    let tLinks = document.querySelector(".links");
    
    function nav_open(){



        toggleButtom.onclick = function(e){

            e.stopPropagation();

            this.classList.toggle("active");

            tLinks.classList.toggle("open");
        }
    }
    nav_open()

    tLinks.onclick = function(e){
        e.stopPropagation()
    }

    document.addEventListener("click",function(e){
        if(e.target !== toggleButtom && e.target !== tLinks){

            if(tLinks.classList.contains("open")){
                toggleButtom.classList.toggle("active")
                tLinks.classList.toggle("open")
            }
        }
    })

