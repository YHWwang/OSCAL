$(function () {
  var ImgWidth = document.body.clientWidth
  var product_img_height = $('.product-img')
  if (ImgWidth < 800) {
    // product_img_height.css('height',ImgWidth / .6)
  } else {
    product_img_height.css('height', ImgWidth / 5.5)
  }

  $(window).resize(function () {
    ImgWidth = document.body.clientWidth
    if (ImgWidth < 800) {
      // product_img_height.css('height',ImgWidth / .6)
    } else {
      product_img_height.css('height', ImgWidth / 5.5)
    }
  });
  
  function GetQueryString() {
    // var regex = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    // var r = window.location.search.substr(1).match(regex);
    // if (r != null) return unescape(r[2]);
    // return null;
    var arr =  window.location.href.split("/")
    var len = arr.length
    var params = arr[len-1];
    var name = params.split("&")[1]
    return name;
  }
  // console.log(GetQueryString("id"))
  if (GetQueryString()) { //url传值
    switch (GetQueryString()) {
      case 'Phones': selectTab(0); break;
      case 'Laptops': selectTab(1); break;
      case 'Tablets': selectTab(2); break;
      case 'Accessories': selectTab(3); break;
    }
  }
  else {
    selectTab(0)
  }
  function selectTab(index) {
    $('.productsBox .products-sort .products-tabs .item-tags').eq(index).addClass('active')
    $('.item-list').eq(index).addClass('active')
  }
  $('.productsBox .products-sort .products-tabs a').click(function () { //产品标签页导航
    let ds = 0
    $(this).addClass('active').siblings().removeClass('active')
    switch ($(this).find('span').text()) {
      case 'Phones': ds = 0; break;
      case 'Laptops': ds = 1; break;
      case 'Tablets': ds = 2; break;
      case 'Accessories':  ds = 3; break;
    }
    $('.item-list').eq(ds).addClass('active').siblings().removeClass('active')
  })
  $('.productsBox .products-sort .products-filters .reset').click(function () {
    $('.filters-cate li .cate-box span').removeClass('on')
  })

  var flag_sort = true
  $('.productsBox .products-sort .products-filters .filter-btn').click(function () { //筛选
    console.log($(this).find('.text').text())
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

  $('.filters-cate li .cate-box span').click(function () {
    $(this).toggleClass('on')
  })

  $('.products-lists ul li .product-color div').click(function () {//颜色切换
    $(this).addClass('on').siblings().removeClass('on')
    let index = $(this).index()
    let ds = $(this).parent().siblings('.product-img')
    $(this).parent().siblings('.product-img').find('img').eq(index).addClass('on').siblings().removeClass('on')
    imgLoad(ds, function () {
      ds.removeClass('on')
    })
  })
  $('.products-lists ul li .product-img .on').each(function () {
    let that = $(this)
    imgLoad(that, function () {
      that.parent().parent().removeClass('on')
    })
  })

  function imgLoad(img, callback) {
    var timer = setInterval(function () {
      var flag = true
      if (img.find('img.on').attr('data-src')) {
        if (img.find('img.on')[0].complete) {
          callback(img);
          clearInterval(timer);
        } else if (flag) {
          flag = false
          img.addClass('on')
        }
      }
      else {
        if (img[0].complete) {
          callback(img);
          clearInterval(timer);
        } else {
          img.parent().parent().addClass('on')
          img.parent().siblings('.product-img').addClass('on')
        }
      }
    }, 200);
  }
})