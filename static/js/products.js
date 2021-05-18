$(function () {

  $('.productsBox .products-sort .products-tabs a').click(function () {
    $(this).addClass('active').siblings().removeClass('active')
  })

  var ImgWidth = document.body.clientWidth
  var product_img_height = $('.product-img')
  if (ImgWidth < 800) {
    // product_img_height.css('height',ImgWidth / .6)
  } else {
    product_img_height.css('height', ImgWidth / 4.53)
  }

  $(window).resize(function () {
    ImgWidth = document.body.clientWidth
    if (ImgWidth < 800) {
      // product_img_height.css('height',ImgWidth / .6)
    } else {
      product_img_height.css('height', ImgWidth / 4.53)
    }
  });
  var flag_sort = true
  $('.productsBox .products-sort .products-filters .filter-btn').click(function() {
    console.log($(this).find('.text').text())
    if(flag_sort){
      $(this).find('.text').text('Colse')
      flag_sort = false
    }else{
      $(this).find('.text').text('Filters')
      flag_sort = true
    }
    $(this).find('.filter-close-btn').toggleClass('active')
    $('.productsBox .products-sort .products-filters .reset').toggle()
  })

  $('.filters-cate li .cate-box span').click(function () {
    $(this).toggleClass('on')
  })

  $('.products-lists ul li .product-color div').click(function () {
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