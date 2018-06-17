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
            }
            $('#page1').slideToggle(1000);
            $('#nav-arrow').toggleClass("black bounce");
            setTimeout(()=>{$('body').data('scrolling', false)}, 400);
        }
    });
    $('.next-page').on('click',function(){
        $('#page1').slideToggle(1000);
        $('#nav-arrow').toggleClass("black bounce");
    });
}