$('button,.icons h2').click(function(){
    var curr=this;
    $(this).addClass('pressed')
    setTimeout(function(){
        $(curr).removeClass('pressed');
    },170);
});