$(function () {
    var ImgWidth = document.body.clientWidth //获取默认宽度
    if (ImgWidth < 800) {
       $('.foot-list .ul_1 .li_1').click(function(){
           $(this).find('ul').toggle('fast')
           $(this).find('.app-plus-icon').toggleClass('clicked')
       })
    }
})