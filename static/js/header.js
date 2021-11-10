$(function () {
    var localHref = window.location.href

    // 临时链接

    $('.app-header .app-nav-content .item-box').click(function () {
        if ($(this).find('.item-title').text() == 'OSCAL C20') {
            window.location.href = '/c20'
        }
        if ($(this).find('.item-title').text() == 'OSCAL Pad 8') {
            window.location.href = '/pad8'
        }
    })
    $('.app-header .menu ul li').click(function () {
        if ($(this).find(' a:first span').text() == 'Phones') {
            $(this).find('a').click(function () {
                location.href = '/c20'
            })
        } else {
            $(this).find('a').click(function () {
                location.href = '/pad8'
            })
        }
    })
    // 临时链接

    changeWindow()
    if (localHref.includes('/products/phones/')) {//选中菜单
        selectMenu(0)
    } else if (localHref.includes('/products/tablets/')) {
        selectMenu(1)
    }
    else if (localHref.includes('brand')) {
        selectMenu(2)
    }
    else if (localHref.includes('news')) {
        selectMenu(3)
    }
    else if (localHref.includes('support')) {
        selectMenu(4)
    }
    else if (localHref.includes('contact-us')) {
        selectMenu(6)
    }

    function selectMenu(number) {
        let dom = $('.menu_box .pc-header .menu ul li a')
        dom.eq(number).addClass('on')
    }
    VideoWith()

    $('.app-header .menu-icon').click(function () {
        $(this).toggleClass('clicked')
        $('.app-header .menu').toggleClass('active')
    })
    $('.menu_box .app-header .menu ul li.has-child').click(function () { //移动端点击产品的显示与隐藏
        if ($('.app-header .has-child .plus-icon').hasClass('clicked')) {
            if (!$(this).find('.plus-icon').hasClass('clicked')) {
                $('.app-header .has-child .plus-icon').removeClass('clicked')
                $('.app-header .has-child .app-nav-content').removeClass('active')
                $(this).find('.plus-icon').addClass('clicked')
                $(this).find('.app-nav-content').addClass('active')

            } else {
                $('.app-header .has-child .plus-icon').removeClass('clicked')
                $('.app-header .has-child .app-nav-content').removeClass('active')
            }

        } else {
            $(this).find('.plus-icon').toggleClass('clicked')
            $(this).find('.app-nav-content').toggleClass('active')
        }

    })
    $('.nav-content .menu_lab div').click(function () {
        $(this).addClass('on').siblings().removeClass('on')
    })

    $('.menu_box .pc-header .menu ul li').click(function () {//菜单点击记录当前页面
        $('.menu_box .pc-header .menu ul li .mhref').removeClass('on')
        $(this).find('a').addClass('on')
    })
    $('.close-icon').click(function () {
        window.location.href = '/'
    })

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
    function changeWindow() {
        let setHeight = setInterval(() => {
            if ($('.nav-content .content .show-box .rg-content .item-box:nth-child(1) .item-img').hasClass('lazyloaded')) {
                window.clearInterval(setHeight)
                let Bheight = $('.nav-content .content .show-box .rg-content .item-box:nth-child(1) .item-img').height()
                $('.nav-content .content .show-box .rg-content .item-box').height(Bheight / 2)
                $('.nav-content .content .show-box .rg-content .item-box:nth-child(1)').height(Bheight + 10)
            }
        }, 100);
    }
})