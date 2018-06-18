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
    },
    {
        'sectionID': '#page3',
        'DarkBg': false,
        'enterPoint': function(){
            $('#charDaLa').on('click',()=>{
                $('body').data("char", "DaLa");
                $('#charDaLa').addClass('selected');
                $('#charBuDo').removeClass('selected');
            });
            $('#charBuDo').on('click',()=>{
                $('body').data("char", "BuDo");
                $('#charBuDo').addClass('selected');
                $('#charDaLa').removeClass('selected');
            });
        }
    },
    {
        'sectionID': '#page4',
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
                transitPage(pages[$('body').data('nowPage')], pages[$('body').data('nowPage')+1]);
            }
            setTimeout(()=>{$('body').data('scrolling', false)}, 400);
        }
    });
    $('.next-page').on('click',function(){
        transitPage(pages[$('body').data('nowPage')], pages[$('body').data('nowPage')+1]);
    });
    var p = window.location.hash.substr(1) || 0;
    $('body').data('nowPage', p);
    for(var i of pages){
        $(i.sectionID).hide();
    }
    $(pages[p].sectionID).show();
    if(pages[p].DarkBg != true){
        $('#nav-arrow').addClass("black");
    }
    pages[p].enterPoint();
    setTimeout(()=>window.scrollTo(0,1),0);
    //landArrow();
}
function transitPage(a,b){
    $(b.sectionID).css("z-index", "-2");
    $(b.sectionID).show();
    $(a.sectionID).slideUp(1000)
    
    // Hide nav arrow on the last page
    var p = $('body').data('nowPage');
    $('body').data('nowPage', p+1);
    if(p+1==(pages.length)-1){
        $('#nav-arrow').hide();
    }
    setTimeout(()=>$(b.sectionID).css("z-index", ""), 1000);

    if(a.DarkBg != b.DarkBg){
        $('#nav-arrow').toggleClass("black");
    }
    b.enterPoint();
    landArrow();
}

function landArrow(){
    if($('#nav-arrow').data("landed") == true) return;
    $('#nav-arrow').data("landed", true);
    var nowPos = $('#nav-arrow').css("padding-top");
    //console.log(nowPos);
    $('#nav-arrow').removeClass("bounce");
    $('#nav-arrow').css("padding-top", nowPos);
    /* Transit using pure css */
    setTimeout(()=>$('#nav-arrow').css("padding-top", "10vh"), 1);
    setTimeout(() => {
        $('#nav-arrow').css("transition", "color 2s");
        $('#nav-arrow').css("padding-top", "1em");
        $('#nav-arrow').css("height", "2em");
    }, 1500);
}