var game;
var arrow;
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
            game.isDaLa = false;
            game.isBuDo = false;
            game.blockNext = true;
        },
        'nextPage': function(){
            return 3;
        }
    },
    {
        'sectionID': '#story2',
        'DarkBg': true,
        'enterPoint': function(){
            
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
            'nowPage': 0,
            'isDaLa': false,
            'isBuDo': false
        },
        computed:{
            'char':{
                get: function(){
                    if(this.isDaLa) return "達拉崩吧";
                    if(this.isBuDo) return "卜多比魯翁";
                    return undefined;
                },
                set: function(x){
                    this.isDaLa = (x=="DaLa");
                    this.isBuDo = (x=="BuDo");
                    $('#nav-arrow').fadeIn('slow');
                    this.blockNext = false;
                }
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
                    arrow.seen = false;
                }
                setTimeout(()=>$(b.sectionID).css("z-index", ""), 1000);
            
                if(a.DarkBg != b.DarkBg){
                    arrow.classes['black'] = !arrow.classes['black'];
                }
                b.enterPoint();
                arrow.landArrow();
            },
            'fullScreen': function() {
                $('#goFS').fadeOut();
                $('#page1 h1').text("DALABONBA I");
                //$('#page1 h1').fadeOut(8000);
                this.$forceUpdate();
                setTimeout(toggleFullScreen, 10);
            }
        }
    });

    arrow = new Vue({
        el: '#nav-arrow',
        data:{
            'landed': false,
            'seen': true,
            'css': {},
            'classes':{
                'black': false,
                'bounce': true
            }
        },
        methods: {
            'landArrow': function(){
                if(this.landed == true) return;
                this.landed = true;
                var nowPos = $('#nav-arrow').css("padding-top");
                this.classes['bounce'] = false;
                this.css['padding-top'] = nowPos;
                this.$forceUpdate();
                /* Transit using pure css */
                setTimeout(()=>{
                    this.css['padding-top']="10vh";
                    this.$forceUpdate();
                }, 100);
                setTimeout(() => {
                    this.css['transition'] = "color 2s";
                    this.css['padding-top'] = "1em";
                    this.css['height'] = "2em";
                    this.$forceUpdate();
                }, 1500);
            },
            'transitPage': function(){
                game.transitPage();
            }
        }
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
        game.arrow.classes['black'] = true;
    }
    pages[p].enterPoint();
    //setTimeout(()=>window.scrollTo(0,1),0);
    if(p!=0) game.landArrow();
}