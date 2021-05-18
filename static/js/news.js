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
})