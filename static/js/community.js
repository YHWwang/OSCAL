$(function () {
  var timestr = new Date($('#nowTime').val() * 1000)
  var year = timestr.getFullYear();
  var month = timestr.getMonth() + 1;
  var week = timestr.getDay()
  var date = timestr.getDate();
  switch (week) {
    case 1: week = 'Mon'; break;
    case 2: week = 'Tue'; break;
    case 3: week = 'Wed'; break;
    case 4: week = 'Thu'; break;
    case 5: week = 'Fri'; break;
    case 6: week = 'Sat'; break;
    case 7: week = 'Sun'; break;
    default:
      break;
  }
  switch (month) {
    case 1: month = 'Jan'; break;
    case 2: month = 'Feb'; break;
    case 3: month = 'Mar'; break;
    case 4: month = 'Apr'; break;
    case 5: month = 'May'; break;
    case 6: month = 'Jun'; break;
    case 7: month = 'Jul'; break;
    case 8: month = 'Aug'; break;
    case 9: month = 'Spt'; break;
    case 10: month = 'Oct'; break;
    case 11: month = 'Nov'; break;
    case 12: month = 'Dec'; break;
    default:
      break;
  }
  $('.check_day .year').text(year)
  $('.check_day .week').text(week)
  $('.check_day .month').text(month)
  $('.check_day .date').text(date)
  // let domtimer = setInterval(() => {
  //   if ($('.swiper-slide.swiper-slide-active a img').hasClass('lazyloaded')) {
  //     $('.communityBox .content-right .top_image').css('height', $('.swiper-container').height())
  //     clearInterval(domtimer)
  //   }
  // }, 10);

  var swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  });

  //  var imgBox = $('.content-right .top_image div')
  //  for (let index in imgBox) {
  //    if (index > 1) {
  //      imgBox.eq(index).hide()
  //    }
  //  }


  $('.check_login').click(function () {
    $.ajax({
      type: "post",
      url: "/user/toSign",
      async: true,
      contentType: "application/json;charset=UTF-8",
      success: function (data) {
        data = $.parseJSON(data);
        if (data.code == 999999) {
          $('.check_login').text('Signed in today').attr('disabled', 'disabled')
        } else {
          // window.location.href = '/login'
        }
      }
    })


  })
  $('.ViewMore').click(function () {
    let index = $('.post-list ul li:last-child a').attr('value')
    if(!index){
      $('.content-left .ViewMore:hover').css('background', 'gray')
      $('.toast').toast('show')
      return false
    }
    $.ajax({
      type: "post",
      url: "/discuss/getMoreCommunity",
      data: { "id": index },
      success: function (data) {
        data = $.parseJSON(data);
        if (data.conmmunityMoreList.length == 0) {
          $('.content-left .ViewMore:hover').css('background', 'gray')
          $('.toast').toast('show')
          return false
        }

        let html = '';
        for (let i = 0; i < data.conmmunityMoreList.length; i++) {
          let req = data.conmmunityMoreList[i];
          html += `
        <li>
                                <a class="news" href="/communityUserDetail/${req.id}" value='${req.id}'>News</a>
                                <div class="post-main">
                                    <div class="left">
                                        <p class="tit">
                                            <a href="/communityUserDetail/${req.id}"  value='${req.id}' target="_blank">
                                                <span>${req.community_title}</span>
                                            </a>
                                        </p>
                                        <p class="msg">
                                              <a href="/communityUserDetail/${req.id}" value='${req.id}' target="_blank">
                                                <span>${req.community_name}</span>
                                            </a>
                                        </p>
                                    </div>
                                    <div class="right">
                                        <a href="/communityUserDetail/${req.id}" value='${req.id}' target="_blank">
                                            <img class="big-img lazyload" data-src="${req.community_img}">
                                        </a>
                                    </div>
                                </div>
                                <div class="user-info">
                                    <div class="user-left">
                                        <img class="big-img lazyload" data-src="${req.head_photo}" alt="oscal">
                                        <div>
                                            <p class="name">
                                            ${req.sys_user_account}
                                            </p>
                                        </div>
                                    </div>  
                                    <div class="user-right">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                                            </svg>
                                            <span class="browse_num"> ${req.community_num}</span>
                                        </span>
                                        <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                              <path
                                  d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                          </svg>
                                            <span class="reply_num"> ${req.likeCount}</span>
                                        </span>
                                        <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">
                                        <path
                                            d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                        <path
                                            d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                                    </svg>
                                        <span class="browse_num">${req.community_comment}</span>
                                    </span>
                                    </div>
                                </div>
                            </li>
        `
        }
        $('.post-list ul').append(html)
      }
    })
  })
})