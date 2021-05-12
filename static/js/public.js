$(function () {
    var ImgWidth = document.body.clientWidth //获取默认宽度
    var top_height = ImgWidth * .4

    var vh = ImgWidth * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', () => {
        var vh = document.body.clientWidth * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    })

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