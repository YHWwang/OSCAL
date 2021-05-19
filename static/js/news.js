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
})