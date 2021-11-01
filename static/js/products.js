$(function () {
  var localHref = window.location.href

  // 临时链接
  $('.products-lists ul li').click(function () {
    console.log($(this).find('.products-name').text())
    if ($(this).find('.products-name').text() == 'OSCAL C20') {
      location.href = '/c20'
    }
    if ($(this).find('.products-name').text() == 'OSCAL Pad 8') {
      location.href = '/pad8'
    }
  })
  // 临时链接

  var flag_sort = true

  let dom = ''
  $('.products-lists ul li .product-img .on').each(function () { // 图片未加载时显示加载中图片
    dom = $(this)
    imgLoad(dom, function () {
      $('.product-img').removeClass('on')
    })
  })

  if (localHref.includes('/products/detail/1')) {//选中菜单
    selectTab(0)
  } else if (localHref.includes('/products/detail/2')) {
    selectTab(1)
  } else {
    selectTab(0)
  }

  function selectTab(index) { // 根据url的值显示对于的产品块
    $('.productsBox .products-sort .products-tabs .item-tags').eq(index).addClass('active')
    // data = $('.productsBox .products-sort .products-tabs a')
  }

  $('.productsBox .products-sort .products-filters .reset').click(function () { //重置
    $('.filters-cate li .cate-box span').removeClass('on')
  })


  $('.productsBox .products-sort .products-filters .filter-btn').click(function () { //筛选
    if (flag_sort) {
      $(this).find('.text').text('Colse')
      flag_sort = false
    } else {
      $(this).find('.text').text('Filters')
      flag_sort = true
    }
    $(this).find('.filter-close-btn').toggleClass('active')
    $('.productsBox .products-sort .products-filters .reset').toggle()
  })

  $('.filters-cate li .cate-box span').click(function () { //选中与取消选中
    $(this).toggleClass('on')
  })

  $('.products-lists ul li .product-color div').click(function () { //颜色切换
    $(this).addClass('on').siblings().removeClass('on')
    let index = $(this).index()
    let ds = $(this).parent().siblings('.product-img')
    $(this).parent().siblings('.product-img').find('img').eq(index).addClass('on').siblings().removeClass('on')
    imgLoad(ds, function () {
      ds.removeClass('on')
    })
  })

  function imgLoad(img, callback) { // 判断图片是否加载
    var timer = setInterval(function () {
      if (img[0].complete) {
        callback(img);
        clearInterval(timer);
      } else {
        img.parent().parent().addClass('on')
      }
    }, 200);
  }
})