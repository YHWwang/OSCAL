$(function () {
    var brandList = {
        '2021': [{
            'img': '/img/brand_swiper.jpg',
            'time': '10th May 2021',
            'messages': 'OSCAL launched the C20, a budget smart phone packing with stylish appearance, Android 11 GO and a range of great features, to push the boundaries of affordable smart phones.'
        }],
        '2020': [{
            'img': '/img/brand_swiper3.jpg',
            'time': '10th April 2020',
            'messages': 'OSCAL was born with the mission of letting more people enjoy the smart life brought by the beauty of technology at a very friendly price.'
        }],
        '2018': [{
            'img': '/img/brand_swiper2.jpg',
            'time': '10th May 2018',
            'messages': 'The R&D team was established. A new brand began to take shape.'
        }],
    }
    function AddYearList() {
        $.each(brandList, function (list, detail) {
            var yearList = "<li><p>" + list + "</p></li>"
            $('.line-year').prepend(yearList)
        })
        $('.line-year li:first').addClass('line-year-active');
    }
    function ChangeMonth(index) {
        var monthList = ''
        $('.swiper_box .swiper-wrapper').empty();
        $.each(brandList[index], function (list, detail) {
            if (detail.img == '' || !detail.img) {
                monthList = ` <div class="swiper-slide"><div class="middle"><div class="time"> <p>${detail.time}</p> </div>
                 <div class="messages"><p>  ${detail.messages}</p></div> </div></div>`
            } else {
                monthList = `  <div class="swiper-slide"><div class="left"> <img class="big-img lazyload" data-src="${detail.img}" alt="OSCAL"></div>
            <div class="right"><div class="time"> <p>${detail.time}</p> </div> <div class="messages"><p> ${detail.messages}</p></div></div></div>`
            }
            $('.swiper_box .swiper-wrapper').append(monthList);
        })
    }
    AddYearList()
    ChangeMonth('2021')

    $('.mainContent .introduction .line-year li').click(function () {
        ChangeMonth($(this).find('p').text())
        $(this).addClass('line-year-active').siblings().removeClass('line-year-active')
        setTimeout(function () {
            mySwiper.slideTo(0);
        }, 80)
    })
    // 轮播初始化设置
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        slidesPerView: 'auto',
        observer: true,
        centeredSlides: true,
        spaceBetween: 10,
        autoplay: false,
        speed: 500,
        autoHeight: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChangeTransitionEnd: function () {
                if (this.isEnd) {
                    this.navigation.$nextEl.css('display', 'none');
                } else {
                    this.navigation.$nextEl.css('display', 'block');
                }
            },
            slideNextTransitionStart: function () {
                myTweenIn()
            },
            slidePrevTransitionStart: function () {
                myTweenOut()
            }
        },
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 2,
            loadOnTransitionStart: true,
        }
    });
    // slide in
    var myTweenIn = function () {
        new TweenMax.staggerFrom(
            [
                '.swiper-slide-active .left',
                '.swiper-slide-active .time ',
                '.swiper-slide-active .messages'
            ], 1, {
            cycle: {
                x: function (index) {
                    return (index) * 30;
                },
                opacity: function (index) {
                    return index * 0.05
                }
            }
        }, 0.1)
    }


    // slide out
    var myTweenOut = function () {
        new TweenMax.staggerFrom(
            [
                '.swiper-slide-active .left',
                '.swiper-slide-active .time ',
                '.swiper-slide-active .messages'
            ], 1, {
            cycle: {
                x: function (index) {
                    return (index) * -20;
                },
                opacity: function (index) {
                    return index * -0.05
                }

            }
        }, 0.1)
    }

    $('.swiper-button-next').click(function () {
        if ((mySwiper.realIndex + 1) % 2 == 0) {
            $('.swiper-container .swiper-button-prev').addClass('swiper-middle-prev')
        } else {
            $('.swiper-button-prev').removeClass('swiper-middle-prev')
        }
    })
    $('.swiper-button-prev').click(function () {
        if ((mySwiper.realIndex + 1) % 2 == 0) {
            $('.swiper-button-prev').addClass('swiper-middle-prev')
        } else {
            $('.swiper-button-prev').removeClass('swiper-middle-prev')
        }
    })
})