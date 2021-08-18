$(function () {
    // console.log(GetQueryString("type"))
    switch (GetQueryString("type")) {
        case '1': $('#category option[num="1"]').prop("selected",true);break;
        case '2':$('#category option[num="2"]').prop("selected",true);break;
        case '3':$('#category option[num="3"]').prop("selected",true);break;
        case 'type':$('#category option[num="4"]').prop("selected",true);break;
        default:$('#category option[num="4"]').prop("selected",true);break;
    }
    $('#category').change(function(){
        selectCategory($(this).find('option:selected').attr('num'))
    })
    selectCategory = function (type) {//1新发2热门3精华4所有
        window.location.href = `/showUserCommunity?type=${type}&pageNum=1`
    }
    var postType = {
        //1新发2热门3精华4所有
        4: '',
        3: '<img src="/img/blog-img/import.png" alt="import">',
        2: '<img src="/img/blog-img/hot.png" alt="hot">',
        1: '<img src="/img/blog-img/new.png" alt="new">'
    }
    checkList()

    function checkList() {
        $('.forumContent .forum-left .forumList ul li').each(function () {
            let icon = $(this).find('p.postsTit').attr('posttype')
            if (icon == '' || icon == null) return false
            $(this).find('p.postsTit').after(`<span>${postType[icon]}</span>`);
        })
    }
  function GetQueryString(name) { //url传值
    var regex = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(regex);
    if (r != null) return unescape(r[2]);
    return name;
  }
})