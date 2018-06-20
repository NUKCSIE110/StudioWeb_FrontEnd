pages['page1'] = {
    'sectionID': '#page1',
    'DarkBg': true,
    'enterPoint': function(){},
    'nextPage': function(){
        return 'story1';
    }
};

pages['story1'] = {
    'sectionID': '#story1',
    'DarkBg': false,
    'enterPoint': function(){},
    'nextPage': function(){
        return 'charSel';
    }
};

pages['charSel'] = {
    'sectionID': '#charSel',
    'DarkBg': false,
    'enterPoint': function(){
        game.blockNext = true;
        Vue.nextTick(()=>{
            arrow.seen = false;
            game.isDaLa = false;
            game.isBuDo = false;
        });
    },
    'nextPage': function(){
        return 'story2';
    }
};

pages['story2'] = {
    'sectionID': '#story2',
    'DarkBg': true,
    'enterPoint': function(){
        
    },
    'nextPage': function(){
        return 'end';
    }
};

pages['end'] = {
    'sectionID': '#end',
    'DarkBg': true,
    'enterPoint': function(){
        
    },
    'nextPage': function(){
        return 'page1';
    }
};
