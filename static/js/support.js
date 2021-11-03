$(function () {
  var faq_list = ''
  var preSale_list = ''
  var afterSale_list = ''
  //let index = 0
  selectProSort = function (selProName) {
    let data = {}
    $.ajax({
      type: "post",
      url: "/getProductList",
      dataType: 'json',
      data: '{"categoryId": ' + selProName + '}',
      async: false,
      contentType: "application/json;charset=UTF-8",
      success: function (req) {
        data = req
        // console.log(data,req)
      }
    })
    data.oscalFaqList.forEach((element, index) => {
      switch (index) {
        case 0: {
          faq_list = `<li>
              <img class="lazyload" data-src="${element.faqIco}" alt="oscal">
              <p class="number">
                  ${element.faqName}
              </p>
                  <p class="msg">
                  ${element.faqTitle}
                  </p>
              </li>`
          element.oscalFaqDetailList.forEach((ele, index) => {
            faq_list += `<li>
              <a href="/faqs/${ele.id}/" target="_self">
                  <p>
                ${index + 1}.${ele.faqDetailTitle}
                  </p>
              </a>
              </li>`
          })
        } break;
        case 1: {
          preSale_list = `<li>
          <img class="lazyload" data-src="${element.faqIco}" alt="oscal">
          <p class="number">
              ${element.faqName}
          </p>
              <p class="msg">
              ${element.faqTitle}
              </p>
          </li>`
          element.oscalFaqDetailList.forEach((ele, index) => {
            preSale_list += `<li>
          <a href="/faqs/${ele.id}/" target="_self">
              <p>
            ${index + 1}.${ele.faqDetailTitle}
              </p>
          </a>
          </li>`
          })
        } break;
        case 2: {
          afterSale_list = `<li>
          <img class="lazyload" data-src="${element.faqIco}" alt="oscal">
          <p class="number">
              ${element.faqName}
          </p>
              <p class="msg">
              ${element.faqTitle}
              </p>
          </li>`
          element.oscalFaqDetailList.forEach((ele, index) => {
            afterSale_list += `<li>
          <a href="/faqs/${ele.id}/" target="_self">
              <p>
            ${index + 1}.${ele.faqDetailTitle}
              </p>
          </a>
          </li>`
          })
        } break;
        default:
          break;
      }
    });
    //0-phone,1-Tablets,2-Laptops,3-Accessories
    // switch (selProName) {
    //   case 'Phones': index = 0; break;
    //   case 'Laptops': index = 1; break;
    //   case 'Tablets': index = 2; break;
    //   case 'Accessories': index = 3; break;
    // }
    // index == 1 ? $('.preSale-list').hide() : $('.preSale-list').show()
    if (document.body.offsetWidth < 800) {
      $('.go-top').hide()
      $('body').css('overflow', 'hidden')
    }
    $('.supportBox .productBox .faq_box').show()
    $('.faq-list').html(faq_list)
    $('.preSale-list').html(preSale_list)
    $('.afterSale-list').html(afterSale_list)
  }

  $('.supportBox .productBox .faq_box div .app-close svg').click(function () {
    $(this).parent().parents('.faq_box').toggle()
    $('body').css('overflow', 'auto')
    $('.go-top').show()
  })

  

})