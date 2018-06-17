var pages = [
    {
        'sectionID': '#page1',
        'DarkBg': true,
        'enterPoint': function(){}
    },
    {
        'sectionID': '#page2',
        'DarkBg': false,
        'enterPoint': function(){}
    }
]

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
                transitPage(pages[0], pages[1]);
            }
            setTimeout(()=>{$('body').data('scrolling', false)}, 400);
        }
    });
    $('.next-page').on('click',function(){
        transitPage(pages[0], pages[1]);
    });
    var p = window.location.hash.substr(1) || 0;
    for(var i of pages){
        $(i.sectionID).hide();
    }
    $(pages[p].sectionID).show();
    if(pages[p].DarkBg != true){
        $('#nav-arrow').addClass("black");
    }
}
function transitPage(a,b){
    $(b.sectionID).css("z-index", "-2");
    $(b.sectionID).show();
    $(a.sectionID).slideUp(1000)
    setTimeout(()=>$(b.sectionID).css("z-index", ""), 1000);

    if(a.DarkBg != b.DarkBg){
        $('#nav-arrow').toggleClass("black");
    }
    landArrow();
}

function landArrow(){
    var nowPos = $('#nav-arrow').css("padding-top");
    //console.log(nowPos);
    $('#nav-arrow').removeClass("bounce");
    $('#nav-arrow').css("padding-top", nowPos);
    /* Transit using pure css */
    setTimeout(()=>$('#nav-arrow').css("padding-top", "10vh"), 1);
}