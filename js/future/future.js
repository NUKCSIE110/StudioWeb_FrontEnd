var game;
var arrow;
var pages = {};

$(document).ready(init);
function init(){
    game = new Vue({
        el: '#game',
        data:{
            'scrolling':  false,
            'blockNext': false,
            'nowPage': 0,
            'isDaLa': false,
            'isBuDo': false,
            'seenFgBtn': true,
            'title': "我們來玩個遊戲"
        },
        computed:{
            'char':{
                get: function(){
                    if(this.isDaLa) return "達拉崩吧";
                    if(this.isBuDo) return "卜多比魯翁";
                    return "undefined";
                },
                set: function(x){
                    this.isDaLa = (x=="DaLa");
                    this.isBuDo = (x=="BuDo");
                    arrow.seen = true;
                    this.blockNext = false;
                }
            }
        },
        methods:{
            'transitPage': function (){
                if(this.blockNext) return;
                this.blockNext = true;
                var a = pages[this.nowPage];
                var newP = a.nextPage();
                var b = pages[newP];
                $(b.sectionID).css("z-index", "-2");
                $(b.sectionID).show();
                $(a.sectionID).slideUp(700);
                
                // Hide nav arrow on the last page
                this.nowPage = newP;
                if(b.nextPage==undefined){
                    arrow.seen = false;
                }
                setTimeout(()=>{
                    game.blockNext = false;
                    $(b.sectionID).css("z-index", "")
                }, 1000);
            
                if(a.DarkBg != b.DarkBg){
                    Vue.nextTick(()=>{arrow.black = !arrow.black});
                }
                b.enterPoint();
                arrow.landArrow();
            },
            'fullScreen': function() {
                this.seenFgBtn = false;
                this.title = "DALABONBA I";
                setTimeout(toggleFullScreen, 10);
            }
        }
    });

    arrow = new Vue({
        el: '#nav-arrow',
        data:{
            'landed': false,
            'seen': false,
            'css': {},
            'black': false,
            'bounce': true
        },
        methods: {
            'landArrow': function(){
                if(this.landed == true) return;
                this.bounce = false;
                var nowPos = $('#nav-arrow i').css("padding-top");
                this.css['padding-top'] = nowPos;
                this.$nextTick(()=>{this.landed = true});
            },
            'beforeLand': function(el){
                this.transitPage();
            },
            'landing': function(el, done){
                Velocity(el, {'padding-top': '10vh', 'color': 'black'},
                    { complete: done, easing: "linear" });
            },
            'afterLanded': function(){
                this.css['padding-top'] = "1em";
                this.css['height'] = "2em";
                this.seen = true;
            },
            'transitPage': function(){
                game.transitPage();
            }
        }
    });

    /* Register panning event for mobile */
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

    /* Get page number from anchor */
    var p = window.location.hash.substr(1) || 'page1';
    game.nowPage = p;
    $(pages[p].sectionID).show();
    if(pages[p].DarkBg != true){
        arrow.classes['black'] = true;
    }
    pages[p].enterPoint();
    if(p!='page1') arrow.landArrow();
}