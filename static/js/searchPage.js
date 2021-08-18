$(function () {
    $('#rightdiv .prePage').hide()
    var totalPage = 0
    var pageSize = 10
    var obj = {
        currentPage: 1
    }
    var lastPage = 0
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

    if(GetQueryString("search")!= ''){
        $('#searchTitle').val(GetQueryString("search"))
        searchList(1)
    }
    clickFun()
    function clickFun() {
        $('.newsPagination #rightdiv .firstPage').click(() => {//第一页
            watchedFun(1)
            $('.newsPagination #rightdiv .currentPage span').text(watchedObj.currentPage)
        })
        $('.newsPagination #rightdiv .lastPage').click(() => {//最后一页
            watchedFun(lastPage)
            $('.newsPagination #rightdiv .currentPage span').text(watchedObj.currentPage)
        })
        $('.newsPagination #rightdiv .prePage').click(() => {//上一页
            watchedFun(watchedObj.currentPage > 1 ? watchedObj.currentPage - 1 : 1)
            $('.newsPagination #rightdiv .currentPage span').text(watchedObj.currentPage)
        })
        $('.newsPagination #rightdiv .nextPage').click(() => {//下一页
            watchedFun(watchedObj.currentPage < lastPage ? watchedObj.currentPage + 1 : lastPage)
            $('.newsPagination #rightdiv .currentPage span').text(watchedObj.currentPage)
        })
    }
  
    function watchedFun(size) {
        searchList(size)
        watchedObj.currentPage = size
        $('#rightdiv .currentPage span').text(size)
        size == 1 ? $('#rightdiv .prePage').hide() : $('#rightdiv .prePage').show()
        size == lastPage ? $('#rightdiv .nextPage').hide() : $('#rightdiv .nextPage').show()
    }
    window.addEventListener('load', function () { //搜索功能验证
        var forms = document.getElementsByClassName('needs-validation-searchPostsForm');
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                window.event.returnValue = false;
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                else {
                    searchList(1)
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
    $('.searchListBox .searchNum').hide()
    $('.newsPagination').hide()
    function searchList(size) {
        $.ajax({//搜索列表数据
            type: "post",
            url: "/forum/search/topics",
            dataType: 'json',
            data: '{"pageNum":"' + size + '","community_title":"' + $('#searchTitle').val() + '"}',
            async: false,
            contentType: "application/json;charset=UTF-8",
            success: function (req) {
                totalPage = req.data.total
                lastPage = Math.ceil(totalPage / pageSize)
                totalPage == 0 ? $('.newsPagination').hide() : $('.newsPagination').show()
                watchedObj.currentPage == lastPage ? $('#rightdiv .nextPage').hide() : $('#rightdiv .nextPage').show()
                $('.searchListBox .searchNum').show()
                $('.searchListBox .searchNum span').text(totalPage)
                let html = ''
                $('.searchNum span').text(req.totalTopics)
                for (let data of req.data.list) {
                    html += `
                 <li>
                            <div class="itemList">
                                <a href="/communityUserDetail/${data.id}" target="_blank">
                                    <div class="title">
                                        <p class="postsTit">${data.community_title}</p>
                                    </div>
                                    <p class="msg">
                                        <span class="lastReply">${data.community_title}</span>
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
                                                <span class="browse_num">${data.community_num}</span>
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
                                                <span class="reply_num">${data.community_comment}</span>
                                            </span>
                                        </span>
                                    </p>
                                </a>
                            </div>
                        </li>
                 `
                }
                $('.searchListBox ul').html(html)
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