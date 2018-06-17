$(document).ready(init);
function init(){
    $(window).bind('mousewheel', function(e){
        if(!($('body').data('scrolling') || false)){
            $('body').data('scrolling', true);
            if(e.originalEvent.wheelDelta /120 > 0) {
                console.log('scrolling up !');
            }
            else{
                console.log('scrolling down !');
                transitPage();
            }
            setTimeout(()=>{$('body').data('scrolling', false)}, 400);
        }
    });
    $('.next-page').on('click',function(){
        transitPage();
    });
}

function transitPage(){
    $('#page1').slideToggle(1000);
    $('#nav-arrow').toggleClass("black");
    landArrow();
}

function landArrow(){
    var nowPos = $('#nav-arrow').css("padding-top");
    //console.log(nowPos);
    $('#nav-arrow').removeClass("bounce");
    $('#nav-arrow').css("padding-top", nowPos);
    setTimeout(()=>$('#nav-arrow').css("padding-top", "10vh"), 1);
}