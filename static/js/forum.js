$(function () {

    var localHref = window.location.href
    var postId = 0
    var filterObj = {
        lastIndex: 0,
        current: 0,
        id: 0
    }
    // 分页Start------
    var pageSize = 3
    var totalPage = 0
    var lastPage = 0
    var obj = {
        currentPage: 1
    }
    var observe1 = (object, onChange) => {
        const handler = {
            get(target, property, receiver) {
                try {
                    return new Proxy(target[property], handler);
                } catch (err) {
                    return Reflect.get(target, property, receiver);
                }
            },
            set(target, key, value, receiver) {
                onChange(value);
                return Reflect.set(target, key, value, receiver);
            }
        };
        return new Proxy(object, handler);
    };
    var watchedObj = observe1(obj, (val) => {
        // console.log(`哈哈哈，监听到值变化为${val}了`);
    });
    function watchedFun(size) {
        watchedObj.currentPage = size
        filterData()
    }
    let dom = $('.newsPagination #rightdiv .currentPage span')
    $('.newsPagination #rightdiv .firstPage').click(() => {//第一页
        watchedFun(1)
        dom.text(watchedObj.currentPage)
    })
    $('.newsPagination #rightdiv .lastPage').click(() => {//最后一页
        watchedFun(lastPage)
        dom.text(watchedObj.currentPage)
    })
    $('.newsPagination #rightdiv .prePage').click(() => {//上一页
        watchedFun(watchedObj.currentPage > 1 ? watchedObj.currentPage - 1 : 1)
        dom.text(watchedObj.currentPage)
    })
    $('.newsPagination #rightdiv .nextPage').click(() => {//下一页
        watchedFun(watchedObj.currentPage < lastPage ? watchedObj.currentPage + 1 : lastPage)
        dom.text(watchedObj.currentPage)
    })
    // 分页End------

    if (localHref.includes('forum/2/')) {
        selectMenu(1)
    } else if (localHref.includes('forum/3/')) {
        selectMenu(2)
    } else {
        selectMenu(0)
    }
    function selectMenu(number) {//选着对应菜单
        let dom = $('#nav-tab .nav-link')
        dom.eq(number).addClass('active').siblings().removeClass('active')
    }

    $('.follow').click(() => {//关注板块
        let name = $('.follow').siblings('.type').text()
        $.ajax({
            type: "post",
            url: "/sectionFollow",
            data: '{"categoryName":"' + name + '"}',
            dataType: 'json',
            async: true,
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                location.reload();
            }
        })
    })

    $('.following').click(() => {//取消关注板块
        let name = $('.following').siblings('.type').text()
        $.ajax({
            type: "get",
            url: "/sectionUnFollow/" + name,
            dataType: 'json',
            async: true,
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                location.reload()
            }
        })
    })

    forgetUrl()
    function forgetUrl() { // 格式化url获取数据
        let url = localHref
        let lastIndex = url.lastIndexOf('/')
        filterObj = {
            lastIndex,
            current: url.slice(lastIndex - 1, lastIndex),//当前页码
            id: url.slice(url.lastIndexOf('/', url.lastIndexOf('/', lastIndex - 1) - 1) + 1, url.lastIndexOf('/', lastIndex - 1))//分类帖子id
        }
        postId = filterObj.id
    }

    $('.filterSearchBtn').click(() => {//点击筛选按钮
        watchedObj.currentPage = 1
        $('.mt-5').remove()
        $('.newsPagination').show()
        filterData()
    })
    function filterData() {
        $.ajax({
            type: "post",
            url: "/discuss/getDiscussByTypeAndTime",
            data: '{"categoryId":' + filterObj.id + ',"discussDay":' + $('#filterTime').val() + ',"busType":"' + $('#filterSort').val() + '","current":' + watchedObj.currentPage + '}',
            dataType: 'json',
            async: true,
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                let data = res;
                let html = ''

                for (let item of data.discussMoreList) {
                    let imgBox = ''
                    if (item.community_cover_urls) {
                        let coverUrl = item.community_cover_urls.split(",")
                        for (let img of coverUrl) {
                            imgBox += `<img class="lazyload" data-src="${img}" alt="">`
                        }
                    }

                    html += `
                <li>
                <div class="itemList">
                    <!-- 帖子编号 -->
                    <a href="/communityUserDetail/${item.id}" target="_self">
                        <div class="title">
                            <!-- 置顶帖子置顶图标 -->
                            <div class="topIcon">
                                <svg t="1635319336151" class="icon" viewBox="0 0 1024 1024"
                                     version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1203"
                                     width="25" height="25">
                                    <path
                                        d="M719.984 680.563c-20.436 0-38.611-8.925-51.498-22.668l-87.032-95.687v286.624c0 37.853-31.018 68.509-69.258 68.509-38.239 0-69.262-30.656-69.262-68.509V562.208l-87.249 95.495c-12.66 13.932-30.83 22.856-51.271 22.856-38.244 0-69.262-30.684-69.262-68.512 0-17.615 6.916-33.513 17.764-45.823l208-228.2c12.665-13.9 30.835-22.839 51.28-22.839 20.441 0 38.612 8.939 51.493 22.689l207.57 228.514c11.061 12.146 17.987 28.044 17.987 45.666 0 37.821-31.028 68.509-69.262 68.509z m-12.297-436.889H318.489c-38.235 0-69.263-30.681-69.263-68.519 0-37.828 31.028-68.494 69.263-68.494h389.198c38.234 0 69.262 30.666 69.262 68.494 0 37.838-31.028 68.519-69.262 68.519z"
                                        fill="#00BDF0" p-id="1204"></path>
                                </svg>
                            </div>
                            <!-- postType帖子种类（new,hot,普通） -->
                            <p class="postsTit" postType='new'>
                                <!-- 帖子类型 -->
                                <span class="type lab">【 <span>${item.category_cate_name}</span> 】</span> 
                                <!-- 帖子标题 -->
                                <span>${item.community_title}</span>
                            </p>
                            <p class="titleLable">
                                <!-- 帖子种类（Excellent，Pretty） -->
                                <span class="lab">Excellent</span>
                            </p>
                        </div>
                        <div class="imageBox">
                            <!-- 帖子展示的封面图0-4张 -->
                        ${imgBox}
                        </div>
                    </a>
                    <p class="msg">
                        <a href="/web/user/login/toUserOthersCenter/${item.user_id}" target="_self">
                            <!-- 帖子用户头像 -->
                            <img src="${item.head_photo}" alt="oscal">
                            <!-- 帖子用户姓名 -->
                            <span class="name">${item.sys_user_account}</span>
                        </a>
                        <!-- 帖子发布时间 -->
                        <span class="time">${formatDate(item.community_cre)}</span>
                        <span class="number">
                                <span class="num browse">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                        <path
                                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z">
                                        </path>
                                        <path
                                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z">
                                        </path>
                                    </svg>
                                    <!-- 帖子浏览数 -->
                                    <span class="browse_num">${item.community_num}</span>
                                </span>
                                <span class="num">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                        <path
                                            d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                    </svg>
                                    <span class="reply_num">${item.community_like}</span>
                                </span>
                                <span class="num reply">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">
                                        <path
                                            d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z">
                                        </path>
                                        <path
                                            d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z">
                                        </path>
                                    </svg>
                                    <!-- 帖子评论数 -->
                                    <span class="reply_num">${item.community_comment}</span>
                                </span>
                            </span>
                    </p>
                </div>
            </li>
                `
                }
                $('.forumContent .forum-left .forumList ul').html(html)
                watchedObj.currentPage == 1 ? $('#rightdiv .prePage').hide() : $('#rightdiv .prePage').show()
                watchedObj.currentPage == lastPage ? $('#rightdiv .nextPage').hide() : $('#rightdiv .nextPage').show()
                totalPage = data.totalPage
                lastPage = Math.ceil(totalPage / pageSize)
                totalPage <= 3 ? $('.newsPagination').hide() : ''
                $('#rightdiv .currentPage span').text(watchedObj.currentPage)
                checkList()
            }
        })
    }
    $('.otherForumContent .forum-right .newBtn').click(() => {//页面跳转到创建帖子页面自动选中对应类型
        window.location.href = '/discuss/jumpNewPost?postId=' + postId
    })

    $('#nav-home-tab').click(() => {
        addIframe()
        window.location.href = '/discuss/forum/1/1'
    })
    $('#nav-profile-tab').click(() => {
        addIframe()
        window.location.href = '/discuss/forum/2/1'
    })
    $('#nav-contact-tab').click(() => {
        addIframe()
        window.location.href = '/discuss/forum/3/1'
    })

    function addIframe() {//切换帖子类型出现遮布层
        let iframe = `
        <div class="switchIframe">
            <div class="d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
                </div>
        </div>
        </div>
    `
        $('#nav-tabContent').append(iframe)
    }

    var postType = {
        normal: '',
        new: '<svg t="1625109556262" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7497" width="32" height="32"><path d="M0 256h1024v512H0V256z m162.112 155.52V640h37.44V472.96h1.28L315.072 640h36.48V411.52h-37.76v164.8h-1.28L199.552 411.52h-37.44z m234.24 0V640h170.24v-32H433.728V538.88h119.68v-32h-119.68v-63.36h127.36v-32H396.224z m184.64 0L646.528 640h40l44.8-171.84h1.28L777.152 640h39.68l65.92-228.48h-42.24l-42.88 173.76h-1.28l-45.12-173.76h-38.72l-45.12 173.76h-1.28l-42.88-173.76h-42.24z" fill="#e0620d" p-id="7498"></path></svg>',
        hot: '<svg t="1625109163666" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2163" data-spm-anchor-id="a313x.7781069.0.i8" width="20" height="20"><path d="M545.833 621.298c-36.088 0-54.132 27.066-54.132 67.665 0 45.11 18.044 67.665 54.132 67.665 36.088 0 54.132-22.555 54.132-67.665-4.511-40.599-18.044-63.154-54.132-67.665z" p-id="2164" fill="#e0620d" data-spm-anchor-id="a313x.7781069.0.i7" class="selected"></path><path d="M739.806 201.774c22.555 54.132 27.066 135.33-18.044 180.441C645.075 84.488 451.101 21.334 451.101 21.334c22.555 153.374-81.198 320.282-184.952 446.59-4.511-63.154-9.022-103.753-40.599-162.396-9.022 112.775-90.22 202.996-117.286 311.26-18.044 94.731-4.511 180.441 63.154 257.128 108.264 103.753 387.947 234.573 672.141 4.511 261.639-266.15-40.599-631.542-103.753-676.652zM415.013 797.228h-49.621v-85.709h-90.22v85.709h-49.621V585.21h49.621v85.709h94.731V585.21h49.621v212.018z m130.82 4.511c-67.665-4.511-103.753-40.599-108.264-108.264 4.511-72.176 40.599-108.264 108.264-112.775 67.665 4.511 99.242 40.599 103.753 112.775 0 67.665-36.088 103.753-103.753 108.264z m243.594-175.93v175.93h-49.621v-175.93h-67.665V585.21h184.952v40.599h-67.665z" p-id="2165" fill="#e0620d"></path></svg>'
    }
    checkList()

    function checkList() {
        $('.forumContent .forum-left .forumList ul li').each(function () {
            let icon = $(this).find('p.postsTit').attr('posttype')
            if (icon == '' || icon == null) return false
            $(this).find('p.titleLable').after(`<p class='titleLable'>${postType[icon]}</p>`);
            if ($(this).find('.titleLable span').text() == 'Excellent') {
                $(this).find('p.postsTit').css('color', '#F1734F')
            } else if ($(this).find('.titleLable span').text() == 'Pretty') {
                $(this).find('p.postsTit').css('color', '#04BEF0')
            }
        })
    }
    function formatDate(date) {
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        var time = YY + MM + DD + " " + hh + mm + ss
        return time
    }
})