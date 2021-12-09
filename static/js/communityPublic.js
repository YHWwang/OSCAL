$(function () {

  $('.check_login').click(function () {//签到
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
          $('.main').append(`
          <div id="alertBox">
          <div class="alert alert-danger  alert-dismissible fade show" role="alert">
          ${data.msg}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
          </div>
          </div>
          `)
          setTimeout(() => {
            $('.alert').alert('close')
            window.location.href = '/login'
          }, 2000);
        }
      }
    })
  })
  $('.check_day .day .check_num').click(function(){//点击查看O币领取规则
    $('.alertBox').remove()
    $('.main').append(`
    <div class="alertBox">
        <div class="alert alert-success  alert-dismissible fade show" role="alert">
          <br>
            <h4 class="alert-heading">Rules for earning o currency</h4>
            <p>1: Log in to the community and sign in, you can get 5 O coins each time</p>
            <p>2: Every time a post is published and the number of likes and comments exceeds 10 people, 10 O coins will be awarded, and the number of likes and comments greater than 20 people will be awarded 20 O coins.</p>
            <p>3: Every time a post is published, other users can give rewards according to their preferences. Each time each user can give rewards on the same post of the same blogger, no more than 10 O coins can be given.</p>
          <br>
          <hr>
          <br>
            <h4 class="alert-heading">The use of O coins</h4>
            <p>1: After getting O coins, you can reward the posts posted by bloggers you like</p>
            <p>2: A certain amount of O Coins can be exchanged, lottery, and bid for your favorite products in the O Coin Mall (Points Mall)</p>
            <p>3: Opportunities to participate in our product experience after obtaining a certain amount of O coins</p>
          <br>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
        </div>
    </div>
    `)
})

  var timestr = new Date($('#nowTime').val() * 1000) //获取时间节点
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
    case 0: week = 'Sun'; break;
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
})