$(function () {
    let dom = $('.header_main .pc-header .menuBox .nav li')
    // console.log(localStorage.getItem('communityMenu'))
    if (localStorage.getItem('communityMenu') != null) {
        dom.removeClass('active')
        dom.each((index, item) => {
            if (dom.eq(index).find('a').text() == localStorage.getItem('communityMenu')) {
                dom.eq(index).addClass('active')
                return false
            }
        })
    } else {
        dom.eq(0).addClass('active')
    }
    let num = $('.communityMenu_box .login .loginIcon ul li .usersInfo').text()
    if(num != 0){
        $('.communityMenu_box .login .loginIcon ul li .usersInfo').show()
    }
    let userInfoDom = $('.communityMenu_box .login .loginIcon ul li .usersInfo')
    userInfoDom.text() == 0 ? userInfoDom.hide() : ''
    userInfoDom.text() > 99 ? userInfoDom.text('∞') : ''

    var M1 = $('.communityMenu_box .login .loginIcon ul li.loginSvg')
    M1.on('click', function (e) { e.stopPropagation(); })
        .find('a').on('click', function () {
            M1.find('.dropdown-menu').show();
        });
    $(document).on('click', function () { M1.find('.dropdown-menu').hide() })

    $('.communityMenu_box .logo a').click(()=>{
        localStorage.setItem('menu', null)
    } )

    $('.header_main .pc-header .menuBox .nav li').click(function () {//菜单点击记录当前页面
        // $('.header_main .pc-header .menuBox .nav li').removeClass('active')
        $(this).addClass('active').siblings().removeClass('active')
        localStorage.setItem('communityMenu', $(this).find('a').text())
    })

    $('.searchIcon').click(function () {
        $('.searchIconBox .searchInput').addClass('active')
        $('.searchInput').focus()
    })
    $(".searchIcon").on('keypress',function(event){
　　　　if(event.keyCode == 13){
　　　　　location.href = '/forumresult?search='+$('.searchInput').val()
　　　　}
　　});
    $(".searchInput").blur(function () {
        $('.searchIconBox .searchInput').removeClass('active')
    });


})