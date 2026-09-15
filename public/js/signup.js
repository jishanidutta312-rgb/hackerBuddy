$('button,span').click(function(){
    var curr=this;
    $(this).addClass('pressed')
    setTimeout(function(){
        $(curr).removeClass('pressed');
    },170);
});