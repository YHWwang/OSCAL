$(function () {
    var messageId = ''
    var modelsIds = ''
    var totalPage = 0
    var pageSize = 10
    var obj = {
        currentPage: 1
    }
    var lastPage = 0
    var allUserId = ''
    var type = 'letter'
    var checkAllFlag = false
    var checkAllFlag2 = false
    htmlList(1)
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
    var html = `
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
    // $('.Pagination.paginationActive').html(html)

    navMain = function (tabName) {
        $('.Pagination').removeClass('paginationActive')
        watchedObj.currentPage = 1 //初始化当前页
        switch (tabName) {
            case 'messages':
                type = 'letter'
                watchedFun(1)
                $('.messagesPagination').html(html).addClass('paginationActive');
                clickFun()
                break;
            case 'notifications':
                type = 'notice'
                watchedFun(1)
                $('.notificationsPagination').html(html).addClass('paginationActive');
                clickFun()
                break;
            default:
                break;
        }
    }

    $('.messagesPagination').html(html)
    var watchedObj = observe1(obj, (val) => {
        // console.log(`哈哈哈，监听到值变化为${val}了`);
    });
    clickFun()
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

    watchedObj.currentPage == lastPage ? $('.rightdiv .nextPage').hide() : $('.rightdiv .nextPage').show()
    function watchedFun(size) {
        type == 'letter' ? htmlList(size) : noticeHtml(size)
        console.log(size)
        watchedObj.currentPage = size
        size == 1 ? $('.paginationActive .rightdiv .prePage').hide() : $('.paginationActive .rightdiv .prePage').show()
        size == lastPage ? $('.paginationActive .rightdiv .nextPage').hide() : $('.paginationActive .rightdiv .nextPage').show()
    }
    function htmlList(size) {
        $.ajax({//信息标签页
            type: "post",
            url: "/letter/lists",
            dataType: 'json',
            data: '{"pageNum":"' + size + '"}',
            async: false,
            contentType: "application/json;charset=UTF-8",
            success: function (req) {
                totalPage = req.letterUnreadCount
                totalPage > 10 ? '' : $('.paginationActive').hide()
                lastPage = Math.ceil(totalPage / pageSize)
                $('#nav-tab .messages-total').text(`(${req.letterUnreadCount})`)
                $('#nav-tab .notifications-total').text(`(${req.noticeUnreadCount})`)
                let msgHtml = ''
                for (let data of req.conversations) {
                    allUserId += data.id + ','
                    msgHtml += `<li class=" list-group-item">
                    <a href="javascript:void(0)">
                        <div class="message-left">
                            <div class="sub-checkbox">
                            ${data.status == 0 ? `<span class="badgeMessage"></span>` : ''}
                            </div>
                            <div class="message-contents" onclick="messageFun('${data.fromId}','${data.fromAccount}','${data.id}',this)">
                                <p>${data.content}
                                </p>
                            </div>
                            <div class="comments_user_btn">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                        fill="currentColor" class="bi bi-three-dots-vertical"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    </svg>
                                </span>
                                <div class="comments_user_menu">
                                    <ul>
                                        <li onclick="ReadStatusFun('${data.id}')">
                                            <span>Mark this article</span>
                                        </li>
                                        <li onclick="messageFun('${data.fromId}','${data.fromAccount}','${data.id}',this)">
                                        <span>Reply</span>
                                    </li>
                                        <li onclick="delMessages(${data.id})">
                                            <span>Delete</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </a>
                    <p class="time">${formatDate(data.createTime)}</p>
                </li>`
                }
                allUserId = allUserId.substring(0, allUserId.length - 1)
                $('#nav-messages .item').html(msgHtml)
                let flag = true
                $(' .comments_user_btn').on('click', function (event) {
                    if (flag) {
                        $(this).find('.comments_user_menu').show('fast')
                        flag = false
                    } else {
                        $(this).find('.comments_user_menu').hide('fast')
                        flag = true
                    }
                })
            }
        })
    }
    function noticeHtml(size){
        $.ajax({//通知标签页
            type: "post",
            url: "/notice/lists",
            dataType: 'json',
            data: '{"pageNum":"' + size + '"}',
            async: false,
            contentType: "application/json;charset=UTF-8",
            success: function (req) {
                totalPage = req.noticeUnreadCount
                totalPage > 10 ? '' : $('.paginationActive').hide()
                lastPage = Math.ceil(totalPage / pageSize)
                $('#nav-tab .messages-total').text(`(${req.letterUnreadCount})`)
                $('#nav-tab .notifications-total').text(`(${req.noticeUnreadCount})`)
                var notifiHtml = ''
                for (let data of req.conversations) {
                    allUserId += data.id + ','
                    notifiHtml += `<li class=" list-group-item">
                    <a href="javascript:void(0)">
                        <div class="notifications-left">
                            <div class="sub-checkbox">
                            ${data.status == 0 ? `<span class="badgeMessage"></span>` : ''}
                            </div>
                            <div class="message-contents">
                                <p>${data.information}
                                </p>
                            </div>
                            <div class="comments_user_btn">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                        fill="currentColor" class="bi bi-three-dots-vertical"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    </svg>
                                </span>
                                <div class="comments_user_menu">
                                    <ul>
                                        <li onclick="ReadStatusFun('${data.id}')">
                                            <span>Mark this article</span>
                                        </li>
                                        <li onclick="delMessages(${data.id})">
                                            <span>Delete</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </a>
                    <p class="time">${formatDate(data.createTime)}</p>
                </li>`
                }
                allUserId = allUserId.substring(0, allUserId.length - 1)
                $('#nav-notifications .item').html(notifiHtml)
                let flag = true
                $(' .comments_user_btn').on('click', function (event) {
                    if (flag) {
                        $(this).find('.comments_user_menu').show('fast')
                        flag = false
                    } else {
                        $(this).find('.comments_user_menu').hide('fast')
                        flag = true
                    }
                })
            }
        })
    }
    $('#nav-messages-tab').click(function () {
        allUserId = ''

        htmlList(1)
    })
    $('#nav-notifications-tab').click(function () {
        allUserId = ''
        noticeHtml(1)
    })
    checkall = function (num) {
        if (num == 1) {
            let checked = $('#nav-messages input[name=subcheck]')
            if (checkAllFlag) {//全不选
                checkAllFlag = false
                for (var i = 0; i < checked.length; i++) {
                    checked[i].checked = false;
                }
            } else {//全选
                checkAllFlag = true
                for (var i = 0; i < checked.length; i++) {
                    checked[i].checked = true;
                }
            }
        }
        else if (num == 2) {
            let checked = $('#nav-notifications input[name=subcheck]')
            if (checkAllFlag2) {//全不选
                checkAllFlag2 = false
                for (var i = 0; i < checked.length; i++) {
                    checked[i].checked = false;
                }
            } else {//全选
                checkAllFlag2 = true
                for (var i = 0; i < checked.length; i++) {
                    checked[i].checked = true;
                }
            }
        }
    }
    function formatDate(date) {
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        var time = YY + MM + DD + " " + hh + mm
        return time
    }
    $("body").on("click", function () {
        let dom = $('.comments_user_btn .comments_user_menu')
        for (let i = 0; i < dom.length; i++) {
            if (dom.eq(i).attr('style') == 'display: block;') {
                dom.eq(i).hide('fast')
            }
        }
    });

    ReadStatusFun = function (id) { // 信息已读状态
        let user_id = id
        if (user_id == 'all') {
            //将本页的全部id赋值给变量id
            user_id = allUserId
        }
        $.ajax({
            type: "put",
            url: "/web/user/login/" + user_id,
            dataType: 'json',
            async: true,
            contentType: "application/json;charset=UTF-8",
            success: function (req) {
                location.reload()
            }
        })
    }

    delMessages = function (num) {//删除消息
        let id = num
        if (id == 'all') {
            //将本页的全部id赋值给变量id
            id = allUserId
        }
        $.ajax({
            type: "delete",
            url: "/web/user/login/" + id,
            dataType: 'json',
            async: true,
            contentType: "application/json;charset=UTF-8",
            success: function (req) {
                location.reload()
            }
        })
    }
    messageFun = function (userId, name, id, that) {//回复弹窗信息
        $(that).attr({
            'data-toggle': "modal",
            'data-target': "#messageModal",
        })
        $('#messageModal .modal-header h5').text('Reply ' + name)
        messageId = userId
        modelsIds = id
    }

    $('#messageModal .modal-footer .submitReplayBtn').click(function () {//提交回复信息
        let val = $('#messageModal .modal-body .modalInput').val()
        if (val == '' || val == null) {
            $('#messageModal .modal-body .invalid-feedback').show()
        } else {
            $.ajax({
                type: "post",
                url: "/letter/send",
                dataType: 'json',
                data: '{"toUserId":"' + messageId + '","content":"' + $('#messageModal .modal-body .modalInput').val() + '"}',
                async: false,
                contentType: "application/json;charset=UTF-8",
                success: function (req) {
                    $('#messageModal').hide()
                    $('div.modal-backdrop').hide()
                    ReadStatusFun(modelsIds)
                }
            })

        }
    })

})