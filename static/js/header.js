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