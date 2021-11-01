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
        normal:'',
        new: '<svg t="1625109556262" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7497" width="32" height="32"><path d="M0 256h1024v512H0V256z m162.112 155.52V640h37.44V472.96h1.28L315.072 640h36.48V411.52h-37.76v164.8h-1.28L199.552 411.52h-37.44z m234.24 0V640h170.24v-32H433.728V538.88h119.68v-32h-119.68v-63.36h127.36v-32H396.224z m184.64 0L646.528 640h40l44.8-171.84h1.28L777.152 640h39.68l65.92-228.48h-42.24l-42.88 173.76h-1.28l-45.12-173.76h-38.72l-45.12 173.76h-1.28l-42.88-173.76h-42.24z" fill="#e0620d" p-id="7498"></path></svg>',
        hot: '<svg t="1625109163666" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2163" data-spm-anchor-id="a313x.7781069.0.i8" width="20" height="20"><path d="M545.833 621.298c-36.088 0-54.132 27.066-54.132 67.665 0 45.11 18.044 67.665 54.132 67.665 36.088 0 54.132-22.555 54.132-67.665-4.511-40.599-18.044-63.154-54.132-67.665z" p-id="2164" fill="#e0620d" data-spm-anchor-id="a313x.7781069.0.i7" class="selected"></path><path d="M739.806 201.774c22.555 54.132 27.066 135.33-18.044 180.441C645.075 84.488 451.101 21.334 451.101 21.334c22.555 153.374-81.198 320.282-184.952 446.59-4.511-63.154-9.022-103.753-40.599-162.396-9.022 112.775-90.22 202.996-117.286 311.26-18.044 94.731-4.511 180.441 63.154 257.128 108.264 103.753 387.947 234.573 672.141 4.511 261.639-266.15-40.599-631.542-103.753-676.652zM415.013 797.228h-49.621v-85.709h-90.22v85.709h-49.621V585.21h49.621v85.709h94.731V585.21h49.621v212.018z m130.82 4.511c-67.665-4.511-103.753-40.599-108.264-108.264 4.511-72.176 40.599-108.264 108.264-112.775 67.665 4.511 99.242 40.599 103.753 112.775 0 67.665-36.088 103.753-103.753 108.264z m243.594-175.93v175.93h-49.621v-175.93h-67.665V585.21h184.952v40.599h-67.665z" p-id="2165" fill="#e0620d"></path></svg>'
    }
    checkList()

    function checkList() {
        $('.forumContent .forum-left .forumList ul li').each(function () {
            let icon = $(this).find('p.postsTit').attr('posttype')
            if(icon == '' || icon == null) return false
            $(this).find('p.titleLable').after(`<p class='titleLable'>${postType[icon]}</p>`);
            if($(this).find('.titleLable span').text() == 'Excellent'){
               $(this).find('p.postsTit').css('color','#F1734F')
            }else if($(this).find('.titleLable span').text() == 'Pretty'){
               $(this).find('p.postsTit').css('color','#04BEF0')
            }
        })
    }
  function GetQueryString(name) { //url传值
    var regex = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(regex);
    if (r != null) return unescape(r[2]);
    return name;
  }
})