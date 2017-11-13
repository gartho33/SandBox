jQuery.fn.scrollTo = function(elm, speed) { 
    var destination = $(this).scrollTop() - $(this).offset().top + $(elm).offset().top;
    speed = speed == undefined ? 1500 : speed;
    
    $(this).animate({scrollTop: destination - 10}, speed, function(){
        flash(elm);
    }); 
};

function flash(elm){
    if(elm.removeClass){
        elm.removeClass('flash');
        setTimeout(function(){
            elm.addClass('flash');
        }, 10);
    }
};

function isScrollDiv(elm){
    return $(elm)[0].scrollHeight > $(elm)[0].clientHeight;
};

function bringToView(targetID){
    var target = $('#'+targetID),
        scrollDivs = [],
        stop = $('html')[0],
        ansestor = target.parent();
    while(ansestor[0] != stop){
        if(isScrollDiv(ansestor)){
            scrollDivs.push(ansestor[0]);
        }
        ansestor = ansestor.parent();
    }
    
    for(var i=scrollDivs.length-1; i>=0; i--){
        var here = scrollDivs[i],
            next = scrollDivs[i-1];
        if(next){
            $(here).scrollTo(next)
        }else{
           $(here).scrollTo(target); 
        }
    }
};

function test(){
    setTimeout(function(){
        bringToView('tMiddle');
        bringToView('middle');
        setTimeout(function(){
            bringToView('tFirst');
            bringToView('last');
            setTimeout(function(){
                bringToView('tLast');
                bringToView('first');
            }, 4000);
        }, 4000);
    },1000);
};
test();