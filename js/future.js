var pages = [
    {
        'sectionID': '#page1',
        'DarkBg': true,
        'enterPoint': function(){},
        'nextPage': function(){
            return 1;
        }
    },
    {
        'sectionID': '#page2',
        'DarkBg': false,
        'enterPoint': function(){},
        'nextPage': function(){
            return 2;
        }
    },
    {
        'sectionID': '#page3',
        'DarkBg': false,
        'enterPoint': function(){
            $('#nav-arrow').fadeOut();
            $('#charDaLa').removeClass('selected');
            $('#charBuDo').removeClass('selected');
            $('#charDaLa').on('click',()=>{
                $('body').data("char", "DaLa");
                $('#charDaLa').addClass('selected');
                $('#charBuDo').removeClass('selected');
                $('#nav-arrow').fadeIn('slow');
            });
            $('#charBuDo').on('click',()=>{
                $('body').data("char", "BuDo");
                $('#charBuDo').addClass('selected');
                $('#charDaLa').removeClass('selected');
                $('#nav-arrow').fadeIn('slow');
            });
        },
        'nextPage': function(){
            return 3;
        }
    },
    {
        'sectionID': '#story2',
        'DarkBg': true,
        'enterPoint': function(){
            if($('body').data("char")=="DaLa"){
                $('#story2 p span').text("達拉崩吧");
            }
            if($('body').data("char")=="BuDo"){
                $('#story2 p span').text("卜多比魯翁");
            }
        },
        'nextPage': function(){
            return 4;
        }
    },
    {
        'sectionID': '#end',
        'DarkBg': true,
        'enterPoint': function(){
            
        },
        'nextPage': function(){
            return 0;
        }
    }
]

$(document).ready(init);
function init(){
    /*$(window).bind('mousewheel', function(e){
        if(!($('body').data('scrolling') || false)){
            $('body').data('scrolling', true);
            if(e.originalEvent.wheelDelta /120 > 0) {
                console.log('scrolling up !');
            }
            else{
                console.log('scrolling down !');
                transitPage(pages[$('body').data('nowPage')].nextPage());
            }
            setTimeout(()=>{$('body').data('scrolling', false)}, 400);
        }
    });*/
    $('.next-page').on('click',function(){
        transitPage(pages[$('body').data('nowPage')].nextPage());
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
    if(p!=0) landArrow();
}
function transitPage(newP){
    var a = pages[$('body').data('nowPage')];
    var b = pages[newP];
    $(b.sectionID).css("z-index", "-2");
    $(b.sectionID).show();
    $(a.sectionID).slideUp(1000)
    
    // Hide nav arrow on the last page
    var p = $('body').data('nowPage');
    $('body').data('nowPage', newP);
    if(b.nextPage==undefined){
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