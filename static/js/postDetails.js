$(function () {
  var community_id = getParenthesesStr($('.likesSvg').attr('onclick'))
  var vote = 1
  var height = window.innerHeight
  // var ImgWidth = document.body.clientWidth //获取默认宽度
  var toUserId = ''
  var follow = 'follow'
  detailFun()

  function getParenthesesStr(text) {
    let result = ''
    let regex = /\((.+?)\)/g;
    let options = text.match(regex)
    let option = options[0]
    result = option.substring(1, option.length - 1)
    return result
  }

  var commentsData = {
    comment_id: '',//评论id
    comment: '',//评论内容
    to_user_id: 'test',//接收者id
    sys_user_account: '',//接收者账号
  }
  // if (ImgWidth < 800) {//移动端评论弹窗
  //   $(' .postContent .comments .comments_user_item .comments_reply .comments_reply_item').click(function () {
  //     let tit = $(this).find('.comments_reply_icon .comments_reply_icon_flag').attr('value')
  //     $('#exampleModalLabel').text('Reply ' + tit)
  //     commentsData.commentator = tit
  //     commentsData.id = id
  //     $(this).attr({
  //       'data-toggle': "modal",
  //       'data-target': "#exampleModal"
  //     })
  //   })
  // }

  $('.postContent .comments .commentsTop .order').click(function () {
    $(this).find('.active').removeClass('active').siblings().addClass('active')
  })

  $('.replyPost').click(() => { //创建帖子按钮
    $('body,html').animate({
      scrollTop: $('#summernoteBox').offset().top - height * .3
    }, 500);
  })
  likesSvg = function (postID, entityUserId) {//点赞
    $.ajax({
      type: "post",
      url: "/like",
      dataType: 'json',
      data: '{"entityType":' + vote + ',"entityId":' + postID + ',"entityUserId":' + entityUserId + ',"postId":' + postID + '}',
      async: false,
      contentType: "application/json;charset=UTF-8",
      success: function (req) {
        console.log(req)
        if (req.code == 'code_990000') {
          window.location.href = '/web/user/login/toLogin'
        } else {
          vote == 1 ? vote = 0 : vote = 1
          $('.likesSvg').find('.active').removeClass('active').siblings().addClass('active')
          $('.likesSvg').find('.active').hasClass('bi-hand-thumbs-up-fill') ? $('.likesSvg').addClass('act') : $('.likesSvg').removeClass('act')
        }
      }
    })
  }

  $('.commomModal').on('click', function () {//打开评论模块框
    $(this).attr({
      'data-toggle': "modal",
      'data-target': "#exampleModal"
    })
    $('#exampleModalLabel').text('Reply ' + $(this).attr('value'))
    commentsData.sys_user_account = $(this).attr('value')
  })

  $('#summernote').summernote({//富文本编辑
    placeholder: '',
    tabsize: 2,
    height: 300,
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'underline', 'clear']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link']],
      ['view', ['codeview', 'help']]
    ]
  });

  MessageFun = function (id) {//修改弹窗信息
    $('#messageModal .modal-body .modalInput').val('')
    $('#messageModal .modal-body .invalid-feedback').hide()
    $('.usersBox .userBtn .followMessage').attr({
      'data-toggle': "modal",
      'data-target': "#messageModal",
    })
    toUserId = id
    $('#messageModal .modal-header h5').text($('.usersInfo span.usersName').text())
    $('#messageModal .modal-body .modalInput').addClass('submitReplay')
  }
  $('#messageModal .modal-footer .submitReplayBtn').click(function () {//提交回复信息
    let val = $('#messageModal .modal-body .submitReplay').val()
    if (val == '' || val == null) {
      $('#messageModal .modal-body .invalid-feedback').show()
    } else {
      $.ajax({
        type: "post",
        url: "/letter/send",
        dataType: 'json',
        data: '{"toUserId":"' + toUserId + '","content":"' + val + '"}',
        async: false,
        contentType: "application/json;charset=UTF-8",
        success: function (req) {
          if (req.code == 'code_990000') {
            window.location.href = '/web/user/login/toLogin'
          }
          $('#messageModal').modal('hide')
          // $('div.modal-backdrop').hide()
          setTimeout(() => {
            $('div.modal-backdrop').hide()
            $('.submitReplayBtn').removeAttr('disabled')
          }, 100);
        }
      })

    }
  })
  rewardInput = function (value) { //打赏数字限制
    value = value.replace(/[^\d]/g, '')
    if (value < 1) {
      value = 1
    }
    if (value > 10) {
      value = 10
    }
    return value
  }
  $('#rewardModal .modal-body .coin span').text($('#userInfoOcin').val())
  $('#rewardModal .rewardBtn').click(function () {//打赏功能
    let coin = $('#userInfoOcin').val()//总数
    let val = parseInt($('#rewardNum').val())//打赏值
    if (val > coin) {
      $('#rewardModal .modal-body .invalid-feedback').show()
    } else {
      $.ajax({
        type: "post",
        url: "/rewardCoin",
        dataType: 'json',
        data: '{"community_id":"' + community_id + '","number":"' + val + '"}',
        async: false,
        contentType: "application/json;charset=UTF-8",
        success: function (req) {
          if (req.code == 'code_990000') {
            window.location.href = '/web/user/login/toLogin'
          }
          if (req.success) {
            setTimeout(() => {
              $('#rewardModal').modal('hide')
              $('#rewardBtn').attr('disabled', 'disabled')
              window.location.href = '/communityUserDetail/' + community_id
            }, 500);
          } else {
            $('.alertSuccess').html(`
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
              ${req.msg}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            `)
            $('.main .alert:not(.alert-warning)').show()
            $('.alertSuccess .alert-warning').show()
          }
        }
      })

    }
  })
  followBtn = function (entityId) {//关注功能
    $('.followBtn').prop({ disabled: true })
    $.ajax({
      type: "post",
      url: "/" + follow,
      dataType: 'json',
      data: '{"entityId":' + entityId + ',"entityType":' + 3 + '}',
      async: false,
      contentType: "application/json;charset=UTF-8",
      success: function (req) {
        if (req.code == 'code_990000') {
          window.location.href = '/web/user/login/toLogin'
        }
        setTimeout(() => {
          $('.followBtn').removeAttr('disabled')
          if (follow == 'follow') {
            follow = 'unfollow'
            $('.userBtn .followBtn').removeClass('btn-outline-primary').addClass('btn-outline-secondary')
            $('.userBtn .followBtn').find('svg').show().parent().find('span').hide()
          } else {
            follow = 'follow'
            $('.userBtn .followBtn').removeClass('btn-outline-secondary').addClass('btn-outline-primary')
            $('.userBtn .followBtn').find('svg').hide().parent().find('span').show()
          }
        }, 500);
      }
    })
  }
  function sendComment(type,entity_id,target_id,content) {//评论和回复评论
    $.ajax({
      type: "post",
      url: "/comment/add/" + community_id,
      dataType: 'json',
      data: '{"entity_type":' + type + ',"comment":' + content + ',"entity_id":' + entity_id + ',"target_id":' + target_id + '}',
      async: false,
      contentType: "application/json;charset=UTF-8",
      success: function (req) {
        if (type == 1) {
          if (req.code == 'code_990000') {
            window.location.href = '/web/user/login/toLogin'
          }
          let alert = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
         Comment successful
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>`
          $('.alertSuccess').html(alert)
          $('.alertSuccess .alert-warning').show()
          setTimeout(() => {
            $('.alertSuccess .alert-warning').hide()
            location.reload();
          }, 2000);
        } else if(type == 2){
          if (req.code == 'code_990000') {
            window.location.href = '/web/user/login/toLogin'
          } else {
            location.reload()
          }
          $('#exampleModal').modal('hide')
        }
      }
    })

  }
  window.addEventListener('load', function () { //创建评论验证
    var forms = document.getElementsByClassName('needs-validation-createPostsForm');
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        window.event.returnValue = false;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        else {
          let data = {
            content: $('#summernote').val(),
          }
          var regex = data.content.replace(/(<([^>]+)>)/ig, '')
          if (regex.length < 5) {
            $('#summernoteBox .invalid-feedback').show()
            return false
          } else {
            $('#summernoteBox .invalid-feedback').hide()
          }
          // console.log(data.content)
          sendComment(1,'','',data.content)
        }
        form.classList.add('was-validated');

      }, false);
    });
  }, false);
  replyComment = function (entity_id, target_id) {//提交回复评论
    $('.commentsSubmit').off()
    $('.commentsSubmit').on('click', function () {
      commentsData.comment =  $('#exampleModal .modal-body .reply_content').text()

      if (commentsData.comment == '' || commentsData.comment == null) {
        alert('Comment cannot be empty')
        return false
      } else {
        sendComment(2,entity_id,target_id,commentsData.comment)
      }
    })

  }

  $('#exampleModal').on('hidden.bs.modal', function (event) {//清空弹窗评论内容
    $('.modal .modal-body .comments_reply_content_wrap .reply_content').html('')
  })

  commentsDel = function () {
    var r = confirm("Are you sure to delete this comment?");
    if (r == true) {
      console.log('yes')
    }
  }

  $('.postContent .comments .comments_user_item .comments_users .comments_user_btn span svg').click(function (event) {
    $(this).parent().siblings().toggle('fast')
  })

  $("body").on("click", function () {
    if ($('.postContent .comments .comments_user_item .comments_users .comments_user_btn .comments_user_menu').attr('style') == 'display: block;') {
      $('.postContent .comments .comments_user_item .comments_users .comments_user_btn .comments_user_menu').hide('fast')
    }
  });

  function detailFun() {
    $.ajax({//浏览量
      type: "post",
      url: "/web/user/login/userLookThrough",
      dataType: 'json',
      data: '{"community_id":"' + community_id + '"}',
      async: false,
      contentType: "application/json;charset=UTF-8",

    })
    $.ajax({//评论列表数据
      type: "post",
      url: "/getCommentList",
      dataType: 'json',
      data: '{"community_id":"' + community_id + '","pageNum":"' + 1 + '"}',
      async: false,
      contentType: "application/json;charset=UTF-8",
      success: function (req) {
        renderList(req.data)
        var totalPage = req.data.total
        totalPage == 0 ? $('.newsPagination').hide() : ''
        $('.postContent .comments .commentsTop span').text(`Comments ( ${totalPage} )`)
        var pageSize = 10
        var obj = {
          currentPage: 1
        }
        var lastPage = Math.ceil(totalPage / pageSize)
        var observe1 = (object, onChange) => {
          const handler = {
            get(target, property, receiver) {
              try {
                return new Proxy(target[property], handler);
              } catch (err) {
                return Reflect.get(target, property, receiver);
              }
            },
            set(target, key, value, receiver) {
              onChange(value);
              return Reflect.set(target, key, value, receiver);
            }
          };
          return new Proxy(object, handler);
        };
        var watchedObj = observe1(obj, (val) => {
          // console.log(`哈哈哈，监听到值变化为${val}了`);
        });
        clickFun()
        function clickFun() {
          $('.newsPagination #rightdiv .firstPage').click(() => {//第一页
            watchedFun(1)
            $('.newsPagination #rightdiv .currentPage span').text(watchedObj.currentPage)
          })
          $('.newsPagination #rightdiv .lastPage').click(() => {//最后一页
            watchedFun(lastPage)
            $('.newsPagination #rightdiv .currentPage span').text(watchedObj.currentPage)
          })
          $('.newsPagination #rightdiv .prePage').click(() => {//上一页
            watchedFun(watchedObj.currentPage > 1 ? watchedObj.currentPage - 1 : 1)
            $('.newsPagination #rightdiv .currentPage span').text(watchedObj.currentPage)
          })
          $('.newsPagination #rightdiv .nextPage').click(() => {//下一页
            watchedFun(watchedObj.currentPage < lastPage ? watchedObj.currentPage + 1 : lastPage)
            $('.newsPagination #rightdiv .currentPage span').text(watchedObj.currentPage)
          })
        }
        $('#rightdiv .prePage').hide()
        // console.log(lastPage,watchedObj.currentPage)
        watchedObj.currentPage == lastPage ? $('#rightdiv .nextPage').hide() : $('#rightdiv .nextPage').show()
        function watchedFun(size) {
          htmlList(size)
          watchedObj.currentPage = size
          $('#rightdiv .currentPage span').text(size)
          size == 1 ? $('#rightdiv .prePage').hide() : $('#rightdiv .prePage').show()
          size == lastPage ? $('#rightdiv .nextPage').hide() : $('#rightdiv .nextPage').show()
        }
        function htmlList(size) {
          $.ajax({//评论列表数据
            type: "post",
            url: "/getCommentList",
            dataType: 'json',
            data: '{"community_id":"' + community_id + '","pageNum":"' + size + '"}',
            async: false,
            contentType: "application/json;charset=UTF-8",
            success: function (req) {
              renderList(req.data)
            }
          })
        }

      }
    })
    function renderList(req) {
      var commentList = ''
      var hasComments = 0
      var commentsChlid = {}
      $('.postContent .comments .commentsTop span').text(`Comments ( ${req.total} )`)
      for (let data of req.list) {
        hasComments = 0
        commentsChlid = data.replyCommentList
        commentsChlidHtml = ''
        if (commentsChlid.length > 0) {
          for (let child of commentsChlid) {
            commentsChlidHtml += `
              <li>
              <div class="comments_reply_item">
                  <div class="comments_reply_users">
                      <span class="comments_user_img phoneHide">
                          <img src="${child.head_photo}"
                              alt="users">
                      </span>
                      <div class="comments_reply_name">
                          <p>
                              <span class="reply_user users">${child.sys_user_account}</span>
                              <!-- 评论用户名 -->
                              <span>reply to</span>
                              <span class="reply_user author">${child.receive_user_account}</span>
                              <!-- 评论人名称 -->
                          </p>
                      </div>
                  </div>
                  <div class="comments_reply_content">
                      <p>${child.comment} </p>
                      <!-- 评论内容 -->
                  </div>
                  <div class="comments_reply_icon phoneHide">
                      <span class="comments_reply_icon_flag commomModal" onclick="replyComment('${child.comment_id}','${child.user_id}','${child.sys_user_account}')"
                      value='${child.sys_user_account}'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16"
                              height="16" fill="currentColor"
                              class="bi bi-chat-square-dots" viewBox="0 0 16 16">
                              <path
                                  d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                              <path
                                  d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                          </svg>
                      </span>
                      <span class="comments_reply_datetime">
                      ${child.comment_cre}
                          <!-- 评论时间 -->
                      </span>
                  </div>
                  <hr>
              </div>
          </li>
              `
          }
          hasComments = 1
        }
        commentList += `
              <li>
              <div class="comments_user_item">
                  <div class="comments_users">
                      <span class="comments_user_img">
                          <img src="${data.head_photo}" alt="users">
                          <!-- �û�ͷ�� -->
                      </span>
                      <div class="comments_user_info">
                          <p class="user_name">${data.sys_user_account}</p>
                          <!-- �û����� -->
                          <p class="user_grade">
                             ${data.comment_cre}
                              <!-- ����ʱ�� -->
                          </p>
                      </div>
                      <!-- <div class="comments_user_btn">
                          <span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                  fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                  <path
                                      d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                              </svg>
                          </span>
                          <div class="comments_user_menu">
                              <ul>
                                  <li data-toggle="modal" data-target="#exampleModal">
                                      <span>Reply</span>
                                  </li>
                                  <li onclick="commentsDel()">
                                      <span>Delete</span>
                                  </li>
                              </ul>
                          </div>
                      </div> -->
                  </div>
                  <div class="comments_content">
                      <p class="comments_content_info">
                      ${data.comment}
                      </p>
                      <!-- �������� -->
                  </div>
                   <div class="comments_btn">
                      <span class="commentsIcon commomModal" onclick="replyComment('${data.id}','${data.user_id}','${data.sys_user_account}')" value='${data.sys_user_account}'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                              fill="currentColor" class="bi bi-chat-square-dots" viewBox="0 0 16 16">
                              <path
                                  d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                              <path
                                  d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                          </svg>
                           <span class="number">${data.replyCommentList.length}</span>
                      </span>
                  </div>
                 ${hasComments == 1 ? `
                  <div class="comments_reply hasComments" id='comments-${data.id}'>
                 <ul>
                 ${commentsChlidHtml}
                 </ul>
             </div>`: ''}
              </div>
              <hr>
          </li>
              `
      }
      $('.comment-list').html(commentList)

      $('.commomModal').click(function () {//打开评论模块框
        $(this).off('.commomModal')
        $(this).attr({
          'data-toggle': "modal",
          'data-target': "#exampleModal"
        })
        $('#exampleModalLabel').text('Reply ' + $(this).attr('value'))
        commentsData.sys_user_account = $(this).attr('value')
      })

      // $(`#comments-${data.id} ul`).html(commentsChlid)
    }
  }
})