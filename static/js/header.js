$(function () {
    VideoWith()
    function VideoWith() {
        var width = document.body.offsetWidth;
        if (width < 800) {
            $('.big-img').each(function () {
                var _this = $(this)
                var src = $(this).attr('data-phone')
                _this.attr('src', src);
            });
        };
    }
    switchProduct =  function(proName){
        menuHide()
        setTimeout(() => {
            menuShow()
        }, 500);
    }
    $('.app-header .menu-icon').click(function () {
        $(this).toggleClass('clicked')
        $('.app-header .menu').toggleClass('active')
    })
    $('.menu_box .app-header .menu ul li.has-child').click(function () {
        $('.app-header .plus-icon').toggleClass('clicked')
        $('.app-header .menu .app-nav-content').toggleClass('active')
    })
    $('.nav-content .menu_lab div').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
    })
    // $(".head_svg").click(function () {
    //     if ($('.head_iframe').height() == 60) {
    //         $('.head_iframe').css('height', '300px')
    //     } else {
    //         $('.head_iframe').css('height', '60px')
    //     }
    // });

    var menu_click = 1
    $('#menu_href').click(function () {
        if (menu_click == 2) {
            menuHide()
        }
        else {
            menuShow()
        }
    })
    $('.close-icon').click(function () {
        menuHide()
    })
    function menuHide() {
        $('.nav-content').removeClass('nav-menu-hide')
        menu_click = 1
    }
    function menuShow() {
        $('.nav-content').addClass('nav-menu-hide')
        menu_click = 2
    }

})