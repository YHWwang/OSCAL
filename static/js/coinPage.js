$(function () {
    var totalPage = 0
    var index = 1
    var obj = {
        currentPage: 1
    }
    var lastPage = 0
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
    getTabData(1, 1)
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
    function getTabData(pageNum, type) {
        $.ajax({
            type: "post",
            url: "/web/user/login/getOcinIncomeAndExpenditure",
            dataType: 'json',
            data: '{"pageNum":' + pageNum + ',"message_type":' + type + '}',
            async: false,
            contentType: "application/json;charset=UTF-8",
            success: function (req) {
                let index = 1
                totalPage = req.data.total
                totalPage > 10 ? $('.paginationActive').html(html) : $('.paginationActive .rightdiv').hide()
                lastPage = req.data.lastPage
                console.log(totalPage,lastPage)
                var coinHtml = ''
                type == 1 ? coinHtml = `
                    <tr><th>Rank</th>
                    <th>Name</th>
                    <th>Reward times</th>
                    <th>Reward of the month</th>
                    <th>Cumulative rewards</th>
                    </tr>`: coinHtml = `
                    <tr> <th>Rank</th>
                    <th>Rewarding blogger</th>
                    <th>Reward times</th>
                    <th>Reward of the month</th>
                    <th>Cumulative rewards</th>
                    </tr>`
                for (let data of req.data.list) {
                    coinHtml += `
                    <tr>
                    <td><span>${index++}</span></td>
                    <td>${data.sys_user_account}</td>
                    <td>${data.userInfoRankMap[0].num}</td>
                    <td>${data.userInfoRankMap[0].monthCoin}</td>
                    <td>${data.userInfoRankMap[0].totalCoin}</td>
                </tr>`
                }
                clickFun()
                type == 1 ? $('#nav-income table').html(coinHtml) : $('#nav-expenditure table').html(coinHtml)
            }
        })
    }
    gotoUsers = function (type) {//前往用户中心
        window.location.href = `/web/user/login/toUserCenter?name=${type}`
    }
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

    navMain = function (type) {
        $('.Pagination').removeClass('paginationActive')
        watchedObj.currentPage = 1 //初始化当前页
        switch (type) {
            case 1:
                $('.incomePagination').html(html).addClass('paginationActive');
                clickFun()
                getTabData(1, 1)
                index = 1
                break;
            case 2:
                $('.expenditurePagination').html(html).addClass('paginationActive');
                getTabData(1, 2)
                index = 2
                clickFun()
                break;
            default:
                break;
        }
    }


    var watchedObj = observe1(obj, (val) => {
        // console.log(`哈哈哈，监听到值变化为${val}了`);
    });
  


    function watchedFun(size) {
        getTabData(size, index)
        watchedObj.currentPage = size
        size == 1 ? $('.rightdiv .prePage').hide() : $('.rightdiv .prePage').show()
        size == lastPage ? $('.rightdiv .nextPage').hide() : $('.rightdiv .nextPage').show()
    }

})