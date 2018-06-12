$(document).ready(init);
function init(){
    $('body').bind('mousewheel', function(e){
        if(e.originalEvent.wheelDelta /120 > 0) {
            console.log('scrolling up !');
        }
        else{
            console.log('scrolling down !');
        }
    });
    $('.next-page').on('click',function(){
        $('#page1').slideToggle(1000);
    });
}