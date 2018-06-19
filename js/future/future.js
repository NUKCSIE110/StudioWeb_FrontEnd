var game
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
                $('body').data("block-next", false);
            });
            $('#charBuDo').on('click',()=>{
                $('body').data("char", "BuDo");
                $('#charBuDo').addClass('selected');
                $('#charDaLa').removeClass('selected');
                $('#nav-arrow').fadeIn('slow');
                $('body').data("block-next", false);
            });
            $('body').data("block-next", true);
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
    game = new Vue({
        el: '#game',
        data:{
            'scrolling':  false,
            'blockNext': false,
            'char': '',
            'nowPage': 0,
            'arrow': {
                'landed': false,
                'seen': true,
                'isBlack': false,
                'bouncing': true,
                'css': {}
            }
        },
        methods:{
            'transitPage': function (){
                var a = pages[this.nowPage];
                var newP = a.nextPage();
                var b = pages[newP];
                $(b.sectionID).css("z-index", "-2");
                $(b.sectionID).show();
                $(a.sectionID).slideUp(1000)
                
                // Hide nav arrow on the last page
                this.nowPage = newP;
                if(b.nextPage==undefined){
                    this.arrow.seen = false;
                }
                setTimeout(()=>$(b.sectionID).css("z-index", ""), 1000);
            
                if(a.DarkBg != b.DarkBg){
                    this.arrow.isBlack = !this.arrow.isBlack;
                }
                b.enterPoint();
                this.landArrow();
            },
            'landArrow': function(){
                if(this.arrow.landed == true) return;
                this.arrow.landed = true;
                var nowPos = $('#nav-arrow').css("padding-top");
                this.arrow.bouncing = false;
                this.arrow.css['padding-top'] = nowPos;
                this.$forceUpdate();
                /* Transit using pure css */
                setTimeout(()=>{
                    this.arrow.css['padding-top']="10vh";
                    this.$forceUpdate();
                }, 100);
                setTimeout(() => {
                    this.arrow.css['transition'] = "color 2s";
                    this.arrow.css['padding-top'] = "1em";
                    this.arrow.css['height'] = "2em";
                    this.$forceUpdate();
                }, 1500);
            },
            'fullScreen': function() {
                $('#goFS').fadeOut();
                $('#page1 h1').text("DALABONBA I");
                //$('#page1 h1').fadeOut(8000);
                this.$forceUpdate();
                toggleFullScreen();
            }
        },
    });

    var mc = new Hammer($('body').get(0));
    mc.get('pan').set({ direction: Hammer.DIRECTION_UP });
    mc.on("panup", function(ev) {
        if(!game.scrolling && !game.blockNext){
            game.scrolling = true;
            game.transitPage(pages[game.nowPage].nextPage());
            setTimeout(()=>{
                game.scrolling = false;
            }, 1000);
        }
    });

    var p = window.location.hash.substr(1) || 0;
    game.nowPage = p;
    for(var i of pages){
        $(i.sectionID).hide();
    }
    $(pages[p].sectionID).show();
    if(pages[p].DarkBg != true){
        game.arrow.isBlack = true;
    }
    pages[p].enterPoint();
    setTimeout(()=>window.scrollTo(0,1),0);
    if(p!=0) game.landArrow();
}