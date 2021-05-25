$(function () {
    var html = ''
    var data = [
        {//Phones �ֻ�
            name: 'OSCAL C20',
            url: '#',
            img: ['/img/menu_pho1.jpg', '/img/menu_pho2.png']
        },
        {//Laptopsƽ��
            name: 'OSCAL Acebook 1',
            url: '#',
            img: ['/img/menu_Laptop1.jpg', '/img/menu_Laptop2.png']
        },
        {//Tablets����
            name: 'OSCAL Tab 9',
            url: '#',
            img: ['/img/menu_Tablet1.jpg', '/img/menu_Tablet2.png'],

        },
        {//Accessories ���
            name: 'OSCAL Airbuds 3',
            url: '#',
            img: ['/img/menu_air1.jpg', '/img/menu_air2.png']
        },
    ]
    function fillHtml(proName, index) {
        html =
            `
<div class="lf-menu">
<ul class="main-menu">
<li><a href="/products/`+ proName + `" target="_self">All ` + proName + `</a></li>
<!-- <li class="child-menu"><a href="#" target="_self">S Series</a></li>
 <li class="child-menu"><a href="#" target="_self">C Series</a></li>
 -->
</ul>
</div>
<div class="rg-content">
<div class="content-box">
<ul class="lf-box area-box">
    <li class="box-lv1 item-box">
        <div class="img-box">
            <a href="`+ data[index].url + `" target="_self">
                <img class="item-img lazyload" data-src="${data[index].img[0]}"
                    alt="Oscal">
            </a>
        </div>

    </li>
    <li class="box-lv1 item-box">
        <a href="`+ data[index].url + `" target="_self">
            <div class="img-box right_img ${proName == 'Phones' ? 'mobileImg' : ''}">
                <img class="item-img lazyload" data-src="${data[index].img[1]}"
                    alt="Oscal">
                <p class="item-title">${data[index].name}</p>
            </div>
        </a>
    </li>
</ul>
</div>
</div>
`
        $('.show-box').html(html)
    }
    VideoWith()
    switchProduct = function (proName) {
        $('body').css('overflow', 'hidden')
        switch (proName) {
            case 'Phones': fillHtml(proName, 0); break;
            case 'Accessories': fillHtml(proName, 3); break;
            case 'Tablets': fillHtml(proName, 2); break;
            case 'Laptops': fillHtml(proName, 1); break;
        }
        if (proName == 'Phones' || proName == 'Tablet') {
            $('.nav-content .menu_lab div').addClass('active')
        } else {
            $('.nav-content .menu_lab div').removeClass('active')
        }
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
    $('.nav-content .menu_lab div').click(function () {
        $(this).addClass('on').siblings().removeClass('on')
    })

    $('.menu_box .pc-header .menu ul li').click(function () {
        $('.menu_box .pc-header .menu ul li .mhref').removeClass('on')
        $(this).find('a').addClass('on')
    })

    $('.close-icon').click(function () {
        $('.menu_box .pc-header .menu ul li .mhref').removeClass('on')
        menuHide()
        $('body').css('overflow', 'auto')
    })




    function menuHide() {
        $('.nav-content').removeClass('nav-menu-hide')
        return false
    }
    function menuShow() {
        $('.nav-content').addClass('nav-menu-hide')
        return true
    }
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
})