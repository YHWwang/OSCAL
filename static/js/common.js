$(function () {
    var ImgWidth = document.body.clientWidth //获取默认宽度
    var height = null
    if (ImgWidth > 1200) {
        height = ImgWidth * .45
    } else {
        height = ImgWidth * .8
    }

    var scrollH = null

    $(window).scroll(function () {
        var winp = $(document).scrollTop();
        productScrollFun($('.content-item-1 .product_img img'), $('.content-item-1'), winp, scrollH)
        productScrollFun($('.content-item-2 .product_img img'), $('.content-item-2'), winp, scrollH)
        productScrollFun($('.content-item-3 .product_img img'), $('.content-item-3'), winp, scrollH)
        productScrollFun($('.two_Column .product_img img'), $('.two_Column'), winp, scrollH)
    })

    function productScrollFun(img, dom, winp, scrollH) {
        if (img.hasClass('lazyloaded')) {
            scrollH = dom.offset().top
            if (winp > scrollH - height / 2 && winp < scrollH + height * .5) {
                dom.find('.delay-1').addClass('mainShow')
                dom.find('.delay-2').addClass('mainShow')
                dom.find('.delay-3').addClass('mainShow')
                dom.find('.product_img img').addClass('product_show')
            }else if(winp > scrollH + height){
                dom.find('.product_img img').removeClass('product_show')
            }
        }
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


    $('.watch_video .tit').addClass('mainShow')
    $('.watch_video .watch_vid').addClass('mainShow')
    $('.watch_video .box1 .watch').click(function () {
        $(this).parents('.box1').addClass('on')

    })
    $('#exampleModal').on('hidden.bs.modal', function (event) {
        $('.watch_video .box1').removeClass('on')
        var elevideo = document.getElementById("indexVideo");
        elevideo.pause()
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