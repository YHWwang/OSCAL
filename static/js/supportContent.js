$(function () {
  $('.app-icon svg').click(function () {
    $(this).parents('.leftBox').toggleClass('boxClose')
  })
  var faqArr = []
      let hideVal = $('#categoryId').val()
      faqArr = $('.sup-ContentBox .pro_li')
      for( let i =0;i<faqArr.length;i++){
        if(faqArr.eq(i).attr('id') ==  hideVal ){
          faqArr.eq(i).addClass('active').siblings().removeClass('active')
          break
        }
      }

  function getSupportData(type,id) {
    let data = {}
    $.ajax({
      type: "post",
      url: "/getSupportContent",
      dataType: 'json',
      data: '{"type":' + type + ',"categoryId":' + id + '}',
      async: false,
      contentType: "application/json;charset=UTF-8",
      success: function (req) {
        data = req
      }
    })
    return data
  }

  ProductType = function (id) {
    let html = ''
    let typeData = {}
    if (document.body.offsetWidth < 800) {
      $('.sup-ContentBox .leftBox').addClass('boxClose')
    }
    typeData = getSupportData(1,id);
  }

  // $('.sup-ContentBox .pro_li').click(function () {
  //   $('.sup-ContentBox .pro_li').removeClass('active')
  //   $(this).addClass('active')

  // })
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