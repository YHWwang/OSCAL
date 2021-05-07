$(function () {
    var ImgWidth = document.body.clientWidth
    var height = window.innerHeight
    var dom_1 = $('.sect1 .banner')

    if (ImgWidth < 800) {
        dom_1.css('height', ImgWidth / 0.50)
    } else {
        dom_1.css('height', ImgWidth / 2.91)
    }
    $(window).resize(function () {
        ImgWidth = document.body.clientWidth
        if (ImgWidth < 800) {
            dom_1.css('height', ImgWidth / .5)
        } else {
            dom_1.css('height', ImgWidth / 2.91)
        }
    });
    $('.watch_video .tit').addClass('show')
    $('.watch_video .watch_vid').addClass('show')
    var scroll_2 = $('.content-item-1').offset().top - height/2
    var scroll_3, scroll_4 = false
    var pro_scroll_1,pro_scroll_2,pro_scroll_3 = false
    $(window).scroll(function () {
        var winp = $(document).scrollTop();
        if (scroll_2 && winp > scroll_2) {
            let dom = $('.mainContent .content-item-1 .product_word')
            dom.find('.tit').addClass('show')
            dom.find('.msg').addClass('show')
            dom.find('.buy_href').addClass('show')
            pro_scroll_1 = $('.mainContent .content-item-1 .product_img').offset().top - height*.7
            scroll_3 = $('.content-item-2').offset().top - height/2
            scroll_2 = false
        }
        if( pro_scroll_1 && winp > pro_scroll_1){
            $('.mainContent .content-item-1 .product_img img').addClass('product_show')
        }
        else{
            $('.mainContent .content-item-1 .product_img img').removeClass('product_show')
        }
        if (scroll_3 && winp > scroll_3) {
            let dom = $('.mainContent .content-item-2 .product_word')
            dom.find('.tit').addClass('show')
            dom.find('.msg').addClass('show')
            dom.find('.buy_href').addClass('show')
            pro_scroll_2 = $('.mainContent .content-item-2 .product_img').offset().top - height*.7
            scroll_4 = $('.content-item-3').offset().top - height/2
            scroll_3 = false
        }
        if( pro_scroll_2 && winp > pro_scroll_2){
            $('.mainContent .content-item-2 .product_img img').addClass('product_show')
        }
        else{
            $('.mainContent .content-item-2 .product_img img').removeClass('product_show')
        }
        if (scroll_4 && winp > scroll_4) {
            let dom = $('.mainContent .content-item-3 .product_word')
            dom.find('.tit').addClass('show')
            dom.find('.msg').addClass('show')
            dom.find('.buy_href').addClass('show')
            pro_scroll_3 = $('.mainContent .content-item-3 .product_img').offset().top - height*.7
            scroll_4 = $('.content-item-3').offset().top - height/2
            scroll_4 = false
        }
        if( pro_scroll_3 && winp > pro_scroll_3){
            $('.mainContent .content-item-3 .product_img img').addClass('product_show')
        }
        else{
            $('.mainContent .content-item-3 .product_img img').removeClass('product_show')
        }
    })


    var vh = height * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
        var vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    })

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