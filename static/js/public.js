$(function () {
    var ImgWidth = document.body.clientWidth //获取默认宽度
    var top_height = ImgWidth * .4

    var vh = ImgWidth * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
        var vh = document.body.clientWidth * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
    $("#contactForm").submit(function (e) {
        let data = $('#contactSubmit').val()
        e.preventDefault();
        let email = JSON.stringify(data)
        var reg = /^(\w|\.|\-)+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
        if (email == null || email == '""') {
            alert('Please enter your email address!')
            return false
        } else if (reg.test(data)) {
            // $.ajax({
            //     type: "POST",
            //     url: "",
            //     dataType: 'json',
            //     async: false,
            //     contentType: "application/json;charset=UTF-8",
            //     data: data,
            //     success: function (res) {
            //         alert('success')
            //     }
            // })
            alert('success')
        }
    });

    $(window).scroll(function () {
        var winp = $(document).scrollTop();
        window.onscroll = throttle(() => top_scroll(winp), 100)

    })
    function top_scroll(winp) {
        if (winp < top_height) {
            $('.go-top').css('display', 'none')
        } else {
            $('.go-top').css('display', 'block')
        }
    }
    $('.go-top .top-icon').click(() => { //置顶
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    })
    var throttle_flag = true // 由于有参数，不可在匿名函数进行传值
    function throttle(fun, delay) {
        let self = this, arg = arguments
        return function () {
            if (!throttle_flag) {
                return false
            }
            throttle_flag = false
            setTimeout(() => {
                fun.apply(self, arg)
                throttle_flag = true
            }, delay)
        }
    }
})