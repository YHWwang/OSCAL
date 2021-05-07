$(function () {
    var faq_li = $('.sect2 .faq_content ul li')
    var support_li = $('.sect2 .suooprt_contact ul li')
    var su_len = ''
    prepend_num(faq_li)
    prepend_num(support_li)
    //append|prepend这类函数在li中插入标签时注意要使用eq()，不可使用$(node)[index]这种格式，否则将输出字符串而不是html代码
    function prepend_num(li){
        if (li) {
            su_len = li.length
            for (let i = 0; i < su_len; i++) {
                var row = '<div class="support_num">0' + (i + 1) + '</div>'
                li.eq(i).prepend(row)
            }
        }
    }

})