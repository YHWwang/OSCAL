$(function () {

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