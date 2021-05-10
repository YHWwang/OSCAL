$(function () {
    var ImgWidth = document.body.clientWidth //获取默认宽度
    var height = null
    if(ImgWidth>1200){ 
        height = ImgWidth * .45
    }else{
        height = ImgWidth * .8
    }
    if(ImgWidth<800){
        $('.pho_image').each(function(){
            var _this = $(this)
            var src = $(this).attr('data-phone')
            _this.attr('data-src', src);
        })
    }
    var top_height = ImgWidth * .4
    var flag = true
    var scroll_1, scroll_2, scroll_3 = false
    var pro_scroll_1, pro_scroll_2, pro_scroll_3 = false

    $('.watch_video .tit').addClass('show')
    $('.watch_video .watch_vid').addClass('show')

    $(window).scroll(function () {
        var winp = $(document).scrollTop();
        window.onscroll = throttle(() => top_scroll(winp), 100)
        if (flag && winp > $('.mainContent').offset().top - height / 2) { // 滚动大于产品盒子高度时开始执行移动效果
            scroll_1 = $('.mainContent .content-item-1').offset().top - height / 2
            flag = false
        }
        if (scroll_1 && winp > scroll_1) {
            dom_fun($('.mainContent .content-item-1 .product_word'))
            scroll_2 = $('.mainContent .content-item-2').offset().top - height / 2
            if ($('.mainContent .content-item-1 .product_img img').hasClass('lazyloaded')) {
                pro_scroll_1 = $('.mainContent .content-item-1 .product_img').offset().top - height * .7
                scroll_1 = false
            }
        }
        if (scroll_2 && winp > scroll_2) {
            dom_fun($('.mainContent .content-item-2 .product_word'))
            scroll_3 = $('.mainContent .content-item-3').offset().top - height / 2
            if ($('.mainContent .content-item-2 .product_img img').hasClass('lazyloaded')) {
                scroll_2 = false
                pro_scroll_2 = $('.mainContent .content-item-2 .product_img').offset().top - height * .7
            }
        }
        if (scroll_3 && winp > scroll_3) {
            dom_fun($('.mainContent .content-item-3 .product_word'))
            if ($('.mainContent .content-item-3 .product_img img').hasClass('lazyloaded')) {
                scroll_3 = false
                pro_scroll_3 = $('.mainContent .content-item-3 .product_img').offset().top - height * .7
            }
        }

        if (winp > pro_scroll_1 && winp < pro_scroll_1 + 100){
            $('.mainContent .content-item-1 .product_img img').addClass('product_show')
        } else if (winp < pro_scroll_1 && winp > pro_scroll_1 - 100) {
            $('.mainContent .content-item-1 .product_img img').removeClass('product_show')
        }
        if (winp > pro_scroll_2 && winp < pro_scroll_2 + 100) {
            $('.mainContent .content-item-2 .product_img img').addClass('product_show')
        } else if (winp < pro_scroll_2 && winp > pro_scroll_2 - 100) {
            $('.mainContent .content-item-2 .product_img img').removeClass('product_show')
        }
        if (pro_scroll_3 && winp > pro_scroll_3 && winp < pro_scroll_3 + 100) {
            $('.mainContent .content-item-3 .product_img img').addClass('product_show')
        } else if (winp < pro_scroll_3 && winp > pro_scroll_3 - 100) {
            $('.mainContent .content-item-3 .product_img img').removeClass('product_show')
        }
    })

    function dom_fun(dom) {
        dom.find('.tit').addClass('show')
        dom.find('.msg').addClass('show')
        dom.find('.buy_href').addClass('show')
    }

    // let debounce_timer = null
    // function debounce(fun, delay) {
    //     return function () {
    //         var self = this, arg = arguments
    //         clearTimeout(debounce_timer)
    //         debounce_timer = setTimeout(() => {
    //             fun.apply(self, arg)
    //         }, delay)
    //     }
    // }

    var throttle_flag = true // 由于有参数，不可在匿名函数进行传值
    function throttle(fun, delay) {
        let self = this, arg = arguments
        return function () {
            if (!throttle_flag) {
                return false
            }
            throttle_flag = false
            setTimeout(() => {
                fun.apply(self, arg)
                throttle_flag = true
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

    $('.go-top .top-icon').click(() => { //置顶
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    })

    var vh = ImgWidth * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
        var vh = document.body.clientWidth * 0.01
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