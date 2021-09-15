$(function () {
    // 临时链接
    $('.nav-content .content .show-box .rg-content .item-box').click(function () {
        if ($(this).find('.item-title').text() == 'OSCAL C20') {
            location.href = '/c20'
        }
        if ($(this).find('.item-title').text() == 'OSCAL Pad 8') {
            location.href = '/pad8'
        }
    })

    if (GetQueryString("name") == 'Tablets') {
        $('.nav-content .content .show-box .rg-content .item-box:nth-child(1)').click(function () {
            location.href = '/pad8'
        })
    } else if (GetQueryString("name") == 'Phones') {
        $('.nav-content .content .show-box .rg-content .item-box:nth-child(1)').click(function () {
            location.href = '/c20'
        })
    }

    // 临时链接

    var localHref = window.location.href
    if (localHref.includes('Phones')) {//选中菜单
        selectMenu(0)
    } else if (localHref.includes('Tablets')) {
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
    else if (localHref.includes('contact_us')) {
        selectMenu(6)
    }

    function selectMenu(number) {
        let dom = $('.menu_box .pc-header .menu ul li a')
        dom.eq(number).addClass('on')
    }
    changeWindow()
    if (window.location.href.includes('productsMenu')) {
        window.onresize = debounce(() => location.reload(), 500)//改变屏幕后刷新
    }
    function debounce(fn, delay) {
        let timer = null
        return () => {
            if (timer) {
                clearTimeout(timer)
            }
            let arg = arguments
            timer = setTimeout(() => {
                fn.apply(this, arg)
            }, delay)
        }
    }
    function changeWindow() {
        let setHeight = setInterval(() => {
            if ($('.nav-content .content .show-box .rg-content .item-box:nth-child(1) .item-img').hasClass('lazyloaded')) {
                window.clearInterval(setHeight)
                let Bheight = $('.nav-content .content .show-box .rg-content .item-box:nth-child(1) .item-img').height()
                $('.nav-content .content .show-box .rg-content .item-box').height(Bheight / 2)
                $('.nav-content .content .show-box .rg-content .item-box:nth-child(1)').height(Bheight + 10)
                if (GetQueryString("name") == 'Tablets') {
                    $('.nav-content .content .show-box .rg-content .item-box:nth-child(1)').css('height', 'auto')
                }
            }
        }, 100);
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
        // if ($(this).find('a').text() == 'Community') {
        //     localStorage.setItem('communityMenu', 'Home')
        // }
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

    function GetQueryString(name) {
        var regex = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(regex);
        if (r != null) return unescape(r[2]);
        return null;
    }
})