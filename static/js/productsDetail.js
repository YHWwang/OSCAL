$(function () {
    var active = $('.spesc-img-right .spesc-img-right-ul .spesc-active').find('.spescColor').attr('style')
    setColor(active)
    function setColor(color) {//选中颜色块显示自身的颜色圆圈
        color = `<style>
    .spesc-img-right .spesc-img-right-ul .spesc-active .spescColor::after{
    position: absolute;
    content: '';
    left: 50%;
    border: 4px solid ${color.slice(35, 42)};
    top: 50%;
    transform: translate(-50%,-50%);
    width: 65px;
    height: 65px;
    border-radius: 50%;
    }
    </style>`
        $('.spesc-img-right .spesc-img-right-ul .spesc-active .spescColor').append(color)
    }

    $('.spesc-img-right .spesc-img-right-ul .spesc-img-right-ul-li').click(function (e) {
        $('.spesc-img-right .spesc-img-right-ul .spesc-active .spescColor').empty()
        $(this).addClass('spesc-active').siblings().removeClass('spesc-active')
        setColor($(this).find('.spescColor').attr('style'))
        showImg($(this).attr('num'))
    })
    function showImg(index) {//切换对应颜色图片
        $('.spesc-img-left img').eq(index).addClass('image-active').siblings().removeClass('image-active')
        var ds = $('.spesc-img-left img.image-active')
        imgLoad(ds, function () {
            ds.removeClass('on')
        })
    }
    function imgLoad(img, callback) {
        var timer = setInterval(function () {
            var flag = true
            if (img[0].complete) {
                callback();
                clearInterval(timer);
            } else if (flag) {
                flag = false
                img.addClass('on')
            }
        }, 200);
    }
})