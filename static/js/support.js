$(function () {
  let ds = $('.newsPagination .page-item')
  let len = ds.length - 2
  $('.page-item-current').click(function () {
    if ($(this).hasClass('next')) { // next下一页
      if ($('.newsPagination .page-item.active').text() == len) {
        $(this).addClass('disabled')
        return false
      } else {
        $(this).removeClass('disabled')
      }
      ds.eq(parseInt($('.newsPagination .page-item.active').text()) + 1).addClass('active').siblings().removeClass('active')
    } else { // prev上一页
      if ($('.newsPagination .page-item.active').text() == 1) {
        $('.newsPagination li:nth-child(0)').addClass('disabled')
        return false
      } else {
        $('.newsPagination li:nth-child(0)').removeClass('disabled')
      }
      ds.eq(parseInt($('.newsPagination .page-item.active').text()) - 1).addClass('active').siblings().removeClass('active')
    }
  })
  $('.newsPagination li.index').click(function () { //点击跳转页码
    $(this).addClass('active').siblings().removeClass('active')
    if ($('.newsPagination .page-item.active').text() == len) {
      $('.newsPagination li:nth-child(' + len + 2 + ')').addClass('disabled')
    } else {
      $('.newsPagination li:nth-child(' + len + 2 + ')').removeClass('disabled')
    }
    if ($('.newsPagination .page-item.active').text() == 1) {
      $('.newsPagination li:nth-child(1)').addClass('disabled')
    } else {
      $('.newsPagination li:nth-child(1)').removeClass('disabled')
    }
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