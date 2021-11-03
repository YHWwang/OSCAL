$(function () {
    var totalPage = 0
    var index = 'nav-following'
    var pageSize = 10
    var obj = {
        currentPage: 1
    }
    var toUserId = 0
    var lastPage = 0
    var sys_user_id = $('#sys_user_id').val()
    //proxy监听值的变化
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
    var paginationHtml = `
    <div class="rightdiv">
        <a class="firstPage">
            <span >First</span>
        </a>
        <a class="prePage" >
            <span >&lt;</span>
        </a>
        <a class="currentPage">
            <span>1</span>
        </a>
        <a class="nextPage" >
            <span >&gt;</span>
        </a>
        <a class="lastPage">
            <span >Last</span>
        </a>
    </div>
   `
    var alertbox = `<div id="alertBox"></div>`
    $('.main').append(alertbox);
    setTimeout(() => {
        if (GetQueryString('name')) {//o币跳转标签页
            $(`#nav-${GetQueryString('name')}-tab`).trigger('click')
        }
    }, 100);

    getTabData(1, 'nav-following')
    function getTabData(size, name) {//根据选择不同获取对应的数据并渲染
        switch (name) {
            case 'nav-following':
                $.ajax({
                    type: "post",
                    url: "/followees",
                    dataType: 'json',
                    data: '{"sys_user_id":"' + sys_user_id + '","current":"' + size + '"}',
                    async: true,
                    contentType: "application/json;charset=UTF-8",
                    success: function (req) {
                        totalPage = req.totalPage
                        totalPage > 10 ? '' : $('.paginationActive').hide()
                        lastPage = Math.ceil(totalPage / pageSize)
                        var html = ''
                        for (let i of req.user) {
                            html += `
                            <li >
                            <div class="following-left">
                                <img src="${i.user.headPhoto}" alt="usersImg">
                                <div class="usersMessage">
                                    <p class="name" >${i.user.sysUserAccount}</p>
                                    <p class="info">
                                        Followers <span >${i.followerCount}</span>
                                        Posts <span >${i.userPosts}</span>
                                        Likes <span >${i.userLikeCount}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="following-right">
                                <button type="button" class="btn btn-outline-primary followMessage"
                                        onclick="followMessageFun('${i.user.id}','${i.user.sysUserAccount}')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                         fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                                        <path
                                                d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                                    </svg>
                                    Message
                                </button>
                                <button type="button" class="btn btn-outline-secondary followBtn" onclick="followBtn(${i.user.id},this)" value='unfollow'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                         fill="currentColor" class="bi bi-person-check" viewBox="0 0 16 16">
                                        <path
                                                d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                        <path fill-rule="evenodd"
                                              d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                    </svg>
                                    <span class="followWord">+ Follow</span>
                                </button>
                            </div>
                        </li>
                            `
                        }
                        $(`#${name} ul`).html(html)

                    }
                })
                break;
            case 'nav-posts':
                $.ajax({
                    type: "post",
                    url: "/user/discuss",
                    data: '{"sys_user_id":"' + sys_user_id + '","current":"' + size + '"}',
                    dataType: 'json',
                    async: true,
                    contentType: "application/json;charset=UTF-8",
                    success: function (req) {
                        totalPage = req.totalPage
                        totalPage > 10 ? '' : $('.paginationActive').hide()
                        lastPage = Math.ceil(totalPage / pageSize)
                        var html = ''
                        for (let data of req.discussPosts) {
                            html += `
                            <li >
                            <div class="postsBox">
                                <div class="usersMessage">
                                    <p class="postsLabel"  >${data.post.oscalCommentCategoryName}</p>
                                    <p class="postsTitle">
                                        <a href="/communityUserDetail/${data.post.id}" target="_blank">
                                                <span>  ${data.post.communityTitle}
                                                </span>
                                        </a>
                                    </p>
                                    <p class="postsTime">
                                        <span class="dataTime">${formatDate(data.post.communityCre)}</span>
                                        <span class="comments">
                                                <span class="browse">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                        <path
                                                                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z">
                                                        </path>
                                                        <path
                                                                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z">
                                                        </path>
                                                    </svg>
                                                    <span class="browse_num" >${data.post.communityNum}</span>
                                                </span>
                                                <span class="reply">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">
                                                        <path
                                                                d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z">
                                                        </path>
                                                        <path
                                                                d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z">
                                                        </path>
                                                    </svg>
                                                    <span class="reply_num" >${data.post.communityComment}</span>
                                                </span>
                                            </span>
                                    </p>
                                </div>
                            </div>
                        </li>
                            `
                        }
                        $(`#${name} ul`).html(html)
                    }
                })
                break;
            case 'nav-likes':
                $.ajax({
                    type: "post",
                    url: "/user/like",
                    data: '{"sys_user_id":"' + sys_user_id + '","current":"' + size + '"}',
                    dataType: 'json',
                    async: true,
                    contentType: "application/json;charset=UTF-8",
                    success: function (req) {
                        totalPage = req.totalPage
                        totalPage > 10 ? '' : $('.paginationActive').hide()
                        lastPage = Math.ceil(totalPage / pageSize)
                        var html = ''
                        for (let i of req.postVoList) {
                            html += `
                            <li >
                            <div class="postsBox">
                                <div class="usersMessage">
                                    <p class="postsLabel" >${i.oscalCommentCategoryName}</p>
                                    <p class="postsTitle">
                                        <a href="/communityUserDetail/${i.id}" target="_blank">
                                                <span>
                                                ${i.communityTitle}
                                                </span>

                                        </a>
                                    </p>
                                    <p class="postsTime">
                                        <span class="dataTime" >${formatDate(i.communityCre)}</span>
                                        <span class="comments">
                                                <span class="browse">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                        <path
                                                                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z">
                                                        </path>
                                                        <path
                                                                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z">
                                                        </path>
                                                    </svg>
                                                    <span class="browse_num" >${i.communityNum}</span>
                                                </span>
                                                <span class="reply">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">
                                                        <path
                                                                d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z">
                                                        </path>
                                                        <path
                                                                d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z">
                                                        </path>
                                                    </svg>
                                                    <span class="reply_num" >${i.communityComment}</span>
                                                </span>
                                            </span>
                                    </p>
                                </div>
                            </div>
                        </li>
                            `
                        }
                        $(`#${name} ul`).html(html)
                    }
                })
                break;
            case 'nav-followers':
                $.ajax({
                    type: "post",
                    url: "/followers",
                    data: '{"sys_user_id":"' + sys_user_id + '","current":"' + size + '"}',
                    dataType: 'json',
                    async: true,
                    contentType: "application/json;charset=UTF-8",
                    success: function (req) {
                        totalPage = req.totalPage
                        totalPage > 10 ? '' : $('.paginationActive').hide()
                        lastPage = Math.ceil(totalPage / pageSize)
                        var html = ''
                        for (let i of req.user) {
                            html += `
                        <li >
                        <div class="following-left">
                            <img src="${i.user.headPhoto}" alt="usersImg">
                            <div class="usersMessage">
                                <p class="name" >${i.user.sysUserAccount}</p>
                                <p class="info">
                                    Followers <span >${i.followerCount}</span>
                                    Posts <span >${i.userPosts}</span>
                                    Likes <span >${i.userLikeCount}</span>
                                </p>
                            </div>
                        </div>
                        <div class="following-right">
                            <button type="button" class="btn btn-outline-primary followMessage"
                                    onclick="followMessageFun('${i.user.id}','${i.user.sysUserAccount}')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                     fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                                    <path
                                            d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                                </svg>
                                Message
                            </button>
                        </div>
                    </li>
                        `
                        }
                        $(`#${name} ul`).html(html)
                    }
                })
                break;
            case 'nav-comments':
                $.ajax({
                    type: "post",
                    url: "/user/comment",
                    data: '{"sys_user_id":"' + sys_user_id + '","current":"' + size + '"}',
                    dataType: 'json',
                    async: true,
                    contentType: "application/json;charset=UTF-8",
                    success: function (req) {
                        totalPage = req.totalPage
                        totalPage > 10 ? '' : $('.paginationActive').hide()
                        lastPage = Math.ceil(totalPage / pageSize)
                        var html = ''
                        for (let i of req.comments) {
                            html += `
                                <li >
                                <div class="postsBox">
                                    <div class="usersMessage">
                                        <p class="postsLabel" >${i.post.oscalCommentCategoryName}</p>
                                        <p class="postsTitle">
                                            <a href="/communityUserDetail/${i.entityId}" target="_blank">
                                                    <span >
                                                    ${i.post.communityTitle}
                                                    </span>
    
                                            </a>
                                        </p>
                                        <p class="postsTime">
                                            <span class="dataTime" >${formatDate(i.post.communityCre)}</span>
                                            <span class="comments">
                                                    <span class="browse">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                             fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                            <path
                                                                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z">
                                                            </path>
                                                            <path
                                                                    d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z">
                                                            </path>
                                                        </svg>
                                                        <span class="browse_num" >${i.post.communityNum}</span>
                                                    </span>
                                                    <span class="reply">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                             fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">
                                                            <path
                                                                    d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z">
                                                            </path>
                                                            <path
                                                                    d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z">
                                                            </path>
                                                        </svg>
                                                        <span class="reply_num" >${i.post.communityComment}</span>
                                                    </span>
                                                </span>
                                        </p>
                                       <div class='myCommentsBox'>
                                            <p>${i.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                                `
                        }
                        $(`#${name} ul`).html(html)
                        let domLen = $('#nav-comments').find('.myCommentsBox').length
                        for (let i = 0; i < domLen; i++) {
                            $('#nav-comments').find('.myCommentsBox').eq(i).html($('#nav-comments').find('.myCommentsBox p').eq(i).text())
                        }
                    }
                })
                break;
            default:
                break;
        }
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

    $('#allCheck').click(function () { // 全选/全不选
        let len = $('.plate-item .form-check-input').length
        if ($(this)[0].checked) {
            for (let i = 0; i < len; i++) {
                $('.plate-item .form-check-input')[i].checked = true;
            }
        } else {
            for (let i = 0; i < len; i++) {
                $('.plate-item .form-check-input')[i].checked = false;
            }
        }
    })

    navMain = function (tabName) { // 点击标签页
        $('.Pagination').removeClass('paginationActive')
        watchedObj.currentPage = 1 //初始化当前页
        switch (tabName) {
            case 'following':
                $('.followingsPagination').html(paginationHtml).addClass('paginationActive');
                clickFun()
                getTabData(1, 'nav-following')
                index = 'nav-following'
                break;
            case 'posts':
                $('.postsPagination').html(paginationHtml).addClass('paginationActive');
                getTabData(1, 'nav-posts')
                index = 'nav-posts'
                clickFun()
                break;
            case 'likes':
                $('.likesPagination').html(paginationHtml).addClass('paginationActive');
                getTabData(1, 'nav-likes')
                index = 'nav-likes'
                clickFun()
                break;
            case 'followers':
                $('.followersPagination').html(paginationHtml).addClass('paginationActive');
                getTabData(1, 'nav-followers')
                index = 'nav-followers'
                clickFun()
                break;
            case 'comments':
                $('.commentsPagination').html(paginationHtml).addClass('paginationActive');
                getTabData(1, 'nav-comments')
                index = 'nav-comments'
                clickFun()
                break;
            default:
                break;
        }
    }

    $('.usersInfo .user_image').attr({
        'data-toggle': "modal",
        'data-target': "#updateImageModal",
    })

    $('.usersInfo .usersName svg').click(function () {//修改弹窗信息
        $('#modifyModal .modal-footer .submitReplayBtn').hide()
        $('#modifyModal .modal-footer .modifyUsersNameBtn').show()
        $('#modifyModal .modal-body .modalInput').val('')
        $('#modifyModal .modal-body .invalid-feedback').hide()
        $(this).attr({
            'data-toggle': "modal",
            'data-target': "#modifyModal",
        })
        $('#modifyModal .modal-header h5').text('Modify Name')
        $('#modifyModal .modal-body .modalInput').addClass('modifyUsersName')
        $('#modifyModal .modal-body .modifyUsersName').val($(this).parents('.usersName').find('.usersName').text())
    })

    $('.followingsPagination').html(paginationHtml)
    var watchedObj = observe1(obj, (val) => {
        // console.log(`哈哈哈，监听到值变化为${val}了`);
    });
    clickFun()//分页
    function clickFun() {
        $('.paginationActive .rightdiv .firstPage').click(() => {//第一页
            watchedFun(1)
            $('.paginationActive .rightdiv .currentPage span').text(watchedObj.currentPage)
        })
        $('.paginationActive .rightdiv .lastPage').click(() => {//最后一页
            watchedFun(lastPage)
            $('.paginationActive .rightdiv .currentPage span').text(watchedObj.currentPage)
        })
        $('.paginationActive .rightdiv .prePage').click(() => {//上一页
            watchedFun(watchedObj.currentPage > 1 ? watchedObj.currentPage - 1 : 1)
            $('.paginationActive .rightdiv .currentPage span').text(watchedObj.currentPage)
        })
        $('.paginationActive .rightdiv .nextPage').click(() => {//下一页
            watchedFun(watchedObj.currentPage < lastPage ? watchedObj.currentPage + 1 : lastPage)
            $('.paginationActive .rightdiv .currentPage span').text(watchedObj.currentPage)
        })
    }
    function watchedFun(size) {
        getTabData(size, index)
        watchedObj.currentPage = size
        size == 1 ? $('.rightdiv .prePage').hide() : $('.rightdiv .prePage').show()
        size == lastPage ? $('.rightdiv .nextPage').hide() : $('.rightdiv .nextPage').show()
    }

    clickNav = function (index) {
        $('#' + index).trigger('click')
    }

    $('#modifyModal .modal-footer .modifyUsersNameBtn').click(() => {//提交修改用户名
        let that = $('#modifyModal .modal-footer .modifyUsersNameBtn')
        $(that).prop({ disabled: true })
        let name = $('#modifyModal .modal-body .modifyUsersName').val()
        if (name == '' || name == null) {
            $('#modifyModal .modal-body .invalid-feedback').show()
        } else {
            $.ajax({
                type: "post",
                url: "/user/userToUpdateNick",
                dataType: 'json',
                data: '{"sys_user_account":"' + name + '"}',
                async: true,
                contentType: "application/json;charset=UTF-8",
                success: function (req) {
                    if (req.code == 999999) {
                        alertBox('success', req.msg)
                        setTimeout(() => {
                            $(that).removeAttr('disabled')
                            $('#alertBox .alert').alert('close')
                            location.reload();
                        }, 2000);
                    } else {
                        alertBox('danger', req.msg)
                        setTimeout(() => {
                            $(that).removeAttr('disabled')
                            $('#alertBox .alert').alert('close')
                        }, 2000);
                    }
                }
            })
        }
    })

    $('.usersInfo ul li').click(function () {
        $('#' + $(this).attr('aria-controls')).addClass('active').siblings().removeClass('active')
    })

    followMessageFun = function (id, name) {//修改弹窗信息
        toUserId = id
        $('#modifyModal .modal-footer .submitReplayBtn').show()
        $('#modifyModal .modal-footer .modifyUsersNameBtn').hide()
        $('#modifyModal .modal-body .modalInput').val('')
        $('#modifyModal .modal-body .invalid-feedback').hide()
        $('.following-right .followMessage').attr({
            'data-toggle': "modal",
            'data-target': "#modifyModal",
        })
        $('#modifyModal .modal-header h5').text(name)
        $('#modifyModal .modal-body .modalInput').addClass('submitReplay')
    }
    $('#modifyModal .modal-footer .submitReplayBtn').click(function () {//提交回复信息
        let val = $('#modifyModal .modal-body .submitReplay').val()
        let that = this
        $(that).prop({ disabled: true })
        if (val == '' || val == null) {
            $('#modifyModal .modal-body .invalid-feedback').show()
            $(that).removeAttr('disabled')
        } else {
            $.ajax({
                type: "post",
                url: "/letter/send",
                dataType: 'json',
                data: '{"toUserId":"' + toUserId + '","content":"' + $('.submitReplay').val() + '"}',
                async: true,
                contentType: "application/json;charset=UTF-8",
                success: function (req) {
                    if (req.code == 0) {
                        alertBox('success', 'Sent successfully')
                    }
                    if (req.code == 'code_990000') {
                        window.location.href = '/web/user/login/toLogin'
                    }
                    setTimeout(() => {
                        $('#alertBox .alert').alert('close')
                        $(that).removeAttr('disabled')
                    }, 2000);

                }
            })

        }
    })
    followBtn = function (id, that) {//关注功能
        var _this = that
        $(_this).prop({ disabled: true })
        let follow = $(_this).prop('value')
        $.ajax({
            type: "post",
            url: "/" + follow,
            dataType: 'json',
            data: '{"entityId":' + id + ',"entityType":3}',
            async: true,
            contentType: "application/json;charset=UTF-8",
            success: function (req) {
                if (req.code == 'code_990000') {
                    window.location.href = '/web/user/login/toLogin'
                }
                setTimeout(() => {
                    $(_this).removeAttr('disabled')
                    if (follow == 'follow') {
                        $(_this).prop({ 'value': 'unfollow' })
                        $('#nav-following .userBtn .followBtn').removeClass('btn-outline-primary').addClass('btn-outline-secondary')
                        $('#nav-following .userBtn .followBtn').find('svg').show().parent().find('span').hide()
                    } else {
                        $(_this).prop({ 'value': 'follow' })
                        $('#nav-following .userBtn .followBtn').removeClass('btn-outline-secondary').addClass('btn-outline-primary')
                        $('#nav-following .userBtn .followBtn').find('svg').hide().parent().find('span').show()
                    }
                }, 500);
            }
        })
    }
    function alertBox(type, text) {
        $('#alertBox').html(`
        <div class="alert alert-${type}  alert-dismissible fade show" role="alert">
        ${text}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `)
    }
    $('.following-right .followBtn').click(function () {
        if ($(this).hasClass('btn-outline-secondary')) {//已关注状态
            $(this).removeClass('btn-outline-secondary').addClass('btn-outline-primary')
            $(this).find('svg').hide().parent().find('span').show()
        } else {//未关注状态
            $(this).removeClass('btn-outline-primary').addClass('btn-outline-secondary')
            $(this).find('svg').show().parent().find('span').hide()
        }
    })

    //上传头像
    initFileInput("input-id");
    function initFileInput(ctrlName) {
        var control = $('#' + ctrlName);
        control.fileinput({
            language: 'zh', //设置语言
            uploadUrl: "/user/updateUserPhoto", //上传的地址
            allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
            uploadAsync: false, //默认异步上传，这里如果不是异步上传，多个图片一次性提交到后台，只发一次请求，如果为异步上传，每张图片都会发一次请求，多次请求
            showUpload: true, //是否显示上传按钮
            showRemove: true, //显示移除按钮
            showPreview: true, //是否显示预览
            showCaption: false,//是否显示标题
            browseClass: "btn btn-primary", //按钮样式
            maxFileSize: 100,
            maxFileCount: 1, //允许同时上传的最大文件个数
            enctype: 'multipart/form-data',
            validateInitialCount: true,
            msgFilesTooMany: "The number of files selected for upload ({n}) exceeds the maximum allowed value {m}!",
            msgSizeTooLarge: 'The maximum size of the pictures allowed to be uploaded is 100kb!',
            layoutTemplates: {
                // actionDelete:'', //去除上传预览的缩略图中的删除图标
                // actionUpload:'',//去除上传预览缩略图中的上传图片；
                // actionZoom:'',   //去除上传预览缩略图详情的图标
                // actionDownload:'' //去除上传预览缩略图中的下载图标
            },
            uploadExtraData: function () {   //向后台传递的附带参数
                var data = {
                    id: "10000",
                    msg: "这里可以添加参数"
                }
                return data;
            }
        }).on('filebatchuploadsuccess', function (event, data, previewId, index) {     //上传中
            // console.log($('.file-error-message ul li').text());
            if ($('.file-error-message ul li').text() != '') {
                alert('The maximum size of the pictures allowed to be uploaded is 100kb!')
                $("#updateImageModal").modal('hide');
                $('div.modal-backdrop').hide();
                return false
            }
            console.log('文件正在上传');
        }).on("filebatchuploadsuccess", function (event, data, previewId, index) {    //一个文件上传成功
            var form = data.form, files = data.files, extra = data.extra,
                response = data.response, reader = data.reader;
            var data = data.response;
            $("#updateImageModal").modal('hide');
            // $("#usersImage").attr("src", data.data);
            $('div.modal-backdrop').hide();
            location.reload()
            console.log(response);//打印出返回的json
            console.log(response.status);//打印出状态
        }).on('filebatchuploaderror', function (event, data, msg) {  //一个文件上传失败
            console.log('文件上传失败！' + data.status);
        })
    }

    // 获取地址栏用户id
    function GetQueryString(name) {
        var regex = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(regex);
        if (r != null) return unescape(r[2]);
        return null;
    }
})