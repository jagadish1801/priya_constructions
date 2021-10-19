$(document).ready(function(){
    generateProjectSection();
    generateClientSection();
    initPage();
    initTimers();
    $('.scrollToElement').on('click',function(){
        var target = $(this).data("target");
        removeSelectedMenu();
        $(this).addClass("active");
        scrollToElement(target);
        $('div.sidenav-overlay').click();
    });
    window.onscroll = selectMenuBasedOnSelection;
});

function selectMenuBasedOnSelection(){
    var position = document.documentElement.scrollTop
    var aboutMenu = $(`#aboutSection`).offset().top - 100
    var projectMenu = $(`#projectSection`).offset().top - 100
    var clientMenu = $(`#clientSection`).offset().top - 100
    var target = "homeMenu"
    // console.log(position,aboutMenu)
    if(position < aboutMenu){
        target = "homeMenu"
    }else if(aboutMenu < position && position < clientMenu){
        target = "aboutMenu"
    }else if(clientMenu < position && position < projectMenu){
        target = "clientMenu"
    }else if(projectMenu < position && $(window).scrollTop() + $(window).height() != $(document).height()){
        target = "projectMenu"
    }else if($(window).scrollTop() + $(window).height() == $(document).height()){
        target = "contactMenu"
    }else{
        target = "homeMenu"
    }
    removeSelectedMenu();
    $(`.${target}`).addClass("active");
}
function removeSelectedMenu(){
    $(".scrollToElement").removeClass("active");
}

function scrollToElement(element){
    var position = $(`#${element}`).offset().top - 90
    $('html, body').animate({
        scrollTop: position
    }, 1000);
}
function generateClientSection(){
    var temp = "";
    $.each(clients,function(index,value){
        temp+= `<div class="col s6 m3">`
        temp+= `<div class="card">`
        temp+= `<div class="card-image">`
        temp+= `<img src="image/clients/${value.image}">`
        temp+= `</div>`
        temp+= `<div class="card-action">`
        temp+= `<p class="truncate">${value.name}</p>`
        temp+= `</div></div></div>`
    });
    $('#clients').html(temp);
}
function generateProjectSection(){
    var temp = "";
    var width = screen.width;
    var trim = false;
    var trimLength = 0
    if(993 <= width && width <= 1119){
        trim = true;
        trimLength = 15;
        alert("in")
    }else if(601 <= width && width <= 764){
        trim = true;
        trimLength = 12;
    }
    $.each(projects,function(index,value){
        var companyNameShort = value.companyName;
        if(trim && value.companyName.length > trimLength){
            companyNameShort = value.companyName.slice(0,trimLength)+"...";
        }
        temp+=`<div class="col s12 m6 l4"><div class="card">`;
        temp+=`<div class="card-image waves-effect waves-block waves-light">`;
        temp+=`<div id="projectImages" class="carousel carousel-slider">`;
        temp+=getProjectImages(value.images)
        temp+=`</div></div>`;
        temp+=`<div class="card-content">`;
        temp+=`<span class="card-title activator grey-text text-darken-4">${companyNameShort}<i class="material-icons right">more_vert</i></span>`;
        temp+=`<p> <i class="material-icons">location_on</i> <span>${value.shortLocation}</span></p>`;
        temp+=`</div>`;
        temp+=`<div class="card-reveal">`;
        temp+=`<span class="card-title grey-text text-darken-4">${companyNameShort}<i class="material-icons right">close</i></span>`;
        temp+=`<p>`;
        temp+=`<div class="row"><span class="col s6 subHeading">Company Name: </span> <span class="col s6">${value.companyName}</span></div>`;
        temp+=`<div class="row"><span class="col s6 subHeading">Nature Of The Company: </span> <span class="col s6">${value.natureOfTheCompany}</span></div>`;
        temp+=`<div class="row"><span class="col s6 subHeading">location: </span> <span class="col s6">${value.location}</span></div>`; 
        temp+=`<div class="row"><span class="col s6 subHeading">Estimated Value: </span> <span class="col s6">${value.estimatedValue}</span></div>`;
        temp+=getProjectHighlights(value.highlights);
        temp+=`</p></div></div></div>`;
    });
    $('#projects').html(temp);
}

function getProjectImages(images){
    var temp = "";
    $.each(images,function(index,value){
        temp+=`<a class="carousel-item" ><img src="image/project/${value}"></a>`;
    });
    return temp;
}

function getProjectHighlights(highlights){
    var temp = "";
    temp+=`<div class="row">`
    $.each(highlights,function(index,value){
        temp+=`<span class="col s2 points"><i class="material-icons right">chevron_right</i></span> <span class="col s10">${value}</span>`;
    });
    temp+=`</div>`
    return temp;
}

function initPage(){
    $('.sidenav').sidenav();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true,
        padding:0
    });
    
}

function initTimers(){
    setInterval(function() {
        $('#homeSection').carousel('next');
    }, 5000);
    setInterval(function() {
        $('#projectImages.carousel-slider').carousel('next');
    }, 10000);
}