$(function () {
    var ImgWidth = document.body.clientWidth //获取默认宽度
    var height = window.innerHeight //获取可用高度
    let top_height = height / 2
    var flag = true
    var scroll_2, scroll_3, scroll_4 = false
    var pro_scroll_1, pro_scroll_2, pro_scroll_3 = false

    $('.watch_video .tit').addClass('show')
    $('.watch_video .watch_vid').addClass('show')

    $(window).scroll(function () {
        var winp = $(document).scrollTop();
        window.onscroll = throttle(() => top_scroll(winp), 100)
        if (flag && winp > $('.mainContent').offset().top - height / 2) {
            scroll_2 = $('.mainContent .content-item-1').offset().top - height / 2
            flag = false
        }
        if (scroll_2 && winp > scroll_2) {
            dom_fun($('.mainContent .content-item-1 .product_word'))
            pro_scroll_1 = $('.mainContent .content-item-1 .product_img').offset().top - height * .7
            scroll_3 = $('.content-item-2').offset().top - height / 2
            scroll_2 = false
        }
        if (scroll_3 && winp > scroll_3) {
            dom_fun($('.mainContent .content-item-2 .product_word'))
            pro_scroll_2 = $('.mainContent .content-item-2 .product_img').offset().top - height * .7
            scroll_4 = $('.content-item-3').offset().top - height / 2
            scroll_3 = false
        }
        if (scroll_4 && winp > scroll_4) {
            dom_fun($('.mainContent .content-item-3 .product_word'))
            pro_scroll_3 = $('.mainContent .content-item-3 .product_img').offset().top - height * .7
            scroll_4 = $('.content-item-3').offset().top - height / 2
            scroll_4 = false
        }

        if (winp > pro_scroll_1 && winp < pro_scroll_1 + 50) {
            $('.mainContent .content-item-1 .product_img img').addClass('product_show')
        } else if (winp < pro_scroll_1 && winp > pro_scroll_1 - 50) {
            $('.mainContent .content-item-1 .product_img img').removeClass('product_show')
        }

        if (winp > pro_scroll_2 && winp < pro_scroll_2 + 50) {
            $('.mainContent .content-item-2 .product_img img').addClass('product_show')
        } else if (winp < pro_scroll_2 && winp > pro_scroll_2 - 50) {
            $('.mainContent .content-item-2 .product_img img').removeClass('product_show')
        }

        if (pro_scroll_3 && winp > pro_scroll_3 && winp < pro_scroll_3 + 50) {
            $('.mainContent .content-item-3 .product_img img').addClass('product_show')
        } else if (winp < pro_scroll_3 && winp > pro_scroll_3 - 50) {
            $('.mainContent .content-item-3 .product_img img').removeClass('product_show')
        }
    })

    function dom_fun(dom) {
        dom.find('.tit').addClass('show')
        dom.find('.msg').addClass('show')
        dom.find('.buy_href').addClass('show')
    }

    var timer = true
    function throttle(fun, delay) {
        let self = this, arg = arguments
        return function () {
            if (!timer) {
                return false
            }
            timer = false
            setTimeout(() => {
                fun.apply(self, arg)
                timer = true
            }, delay)
        }
    }

    function top_scroll(winp) {
        if (winp < top_height) {
            $('.go-top').css('display', 'none')
        } else {
            $('.go-top').css('display', 'block')
        }
    }

    $('.go-top .top-icon').click(() => {//置顶
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    })

    // 获取屏幕可用高度的百分数 
    var vh = height * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
        var vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    })

    // 轮播初始化设置
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 5000,
        },
        speed: 1000,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // mySwiper.el.onmouseover = function () {
    //     mySwiper.autoplay.stop();
    // }
    // mySwiper.el.onmouseleave = function () {
    //     mySwiper.autoplay.start();
    // }
})