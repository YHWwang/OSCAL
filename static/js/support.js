$(function () {
  $('.page-item.page-item-current').click(function () {
    for (let i = 1; i <= $('.newsPagination .page-item').length - 2; i++) {
      if ($('.newsPagination .page-item').eq(i).hasClass('active')) {
        $('.newsPagination .page-item').next().addClass('active')
        $('.newsPagination .page-item').eq(i).removeClass('active')
        break
      }
    }
  })
  $('.newsPagination li.index').click(function () {
    $(this).addClass('active').siblings().removeClass('active')
  })
  $('.supportBox .productBox ul li').click(function () {
    $('.supportBox .productBox .faq_box').toggleClass('open_faq')
  })
  var flag_1 = false
  $('.sup-ContentBox .leftBox .pro_type .name').click(function () {
    if (flag_1) {
      $(this).parent().find('.name span').text('-')
      $(this).parent().find('.pro_ul').show('fast')
      flag_1 = false
    } else {
      $(this).parent().find('.name span').text('+')
      $(this).parent().find('ul').hide('fast')
      flag_1 = true
    }
  })
  var flag_2 = false
  $('.sup-ContentBox .leftBox .art_type .name').click(function () {
    if (flag_2) {
      $(this).parent().find('.name span').text('-')
      $(this).parent().find('ul').show('fast')
      flag_2 = false
    } else {
      $(this).parent().find('.name span').text('+')
      $(this).parent().find('ul').hide('fast')
      flag_2 = true
    }
  })
})