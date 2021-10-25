$(function () {
    var num = $('.communityMenu_box .login .loginIcon ul li .usersInfo').text()
    var localHref = window.location.href
    var userInfoDom = $('.communityMenu_box .login .loginIcon ul li .usersInfo')
    var M1 = $('.communityMenu_box .login .loginIcon ul li.loginSvg')

    if (localHref.includes('showUserCommunity')) {//选中菜单
        selectMenu(1)
    } else if (localHref.includes('toOsSystem')||localHref.includes('showOsCommunity')) {
        selectMenu(2)
    }else{
        selectMenu(0)
    }
    function selectMenu(number) {
        let dom = $('.header_main .pc-header .menuBox .nav li')
        dom.eq(number).addClass('active')
    }

    if(num != 0){//信息角标
        $('.communityMenu_box .login .loginIcon ul li .usersInfo').show()
    }
    userInfoDom.text() == 0 ? userInfoDom.hide() : ''
    userInfoDom.text() > 99 ? userInfoDom.text('∞') : ''

    //用户下拉菜单
    M1.on('click', function (e) { e.stopPropagation(); })
        .find('a').on('click', function () {
            M1.find('.dropdown-menu').show();
        });
    $(document).on('click', function () { M1.find('.dropdown-menu').hide() })

    //搜索功能
    $('.searchIcon').click(function () {
        $('.searchIconBox .searchInput').addClass('active')
        $('.searchInput').focus()
    })
    $(".searchIcon").on('keypress',function(event){//监听搜索键盘事件
　　　　if(event.keyCode == 13){
　　　　　location.href = '/forumresult?search='+$('.searchInput').val()
　　　　}
　　});
    $(".searchInput").blur(function () {
        $('.searchIconBox .searchInput').removeClass('active')
    });


})