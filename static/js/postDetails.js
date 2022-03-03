$(function () {
  var addCommentsuserId = ''
  var addCommentsPostId = ''
  var community_id = ''
  var vote = 1
  var height = window.innerHeight
  // var ImgWidth = document.body.clientWidth //获取默认宽度
  var toUserId = ''
  var follow = 'follow'
  var likeStatus = $('#likeStatus').val()
  var hasFollowed = $('#hasFollowed').val()
  getParenthesesStr($('.likesSvg').attr('onclick'))
  detailFun()

  function getParenthesesStr(text) {
    let result = ''
    let regex = /\((.+?)\)/g;
    let options = text.match(regex)
    let option = options[0]
    result = option.substring(1, option.length - 1)
    addCommentsuserId = result.substring(result.indexOf(',') + 1, option.length)
    community_id = addCommentsPostId = result.substring(0, result.indexOf(','))
  }
  function alertBox(type, text) {
    $('#alertBox').html(`
    <div class="alert alert-${type}  alert-dismissible fade show" role="alert">
    ${text}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    `)
  }

  function formatDate(date) {
    var date = new Date(date);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    var time = YY + MM + DD + " " + hh + mm + ss
    return time
  }
  if (likeStatus == 1) { // 判断是否已经点击点赞按钮
    $('.likesSvg').find('.active').removeClass('active').siblings().addClass('active')
    $('.likesSvg').find('.active').hasClass('bi-hand-thumbs-up-fill') ? $('.likesSvg').addClass('act') : $('.likesSvg').removeClass('act')
  }

  if (hasFollowed == 'true') { // 判断是否已经关注
    $('.userBtn .followBtn').removeClass('btn-outline-primary').addClass('btn-outline-secondary')
    $('.userBtn .followBtn').find('svg').show().parent().find('span').hide()
    follow = 'unfollow'
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
    $('.likesSvg').prop({ disabled: true })
    $.ajax({
      type: "post",
      url: "/like",
      dataType: 'json',
      data: '{"entityType":' + vote + ',"entityId":' + postID + ',"entityUserId":' + entityUserId + ',"postId":' + postID + '}',
      async: true,
      contentType: "application/json;charset=UTF-8",
      success: function (req) {
        if (req.code == 'code_990000') {
          window.location.href = '/web/user/login/toLogin'
        } else {
          vote == 1 ? vote = 0 : vote = 1
          $('.likesSvg').find('.active').removeClass('active').siblings().addClass('active')
          $('.likesSvg').find('.active').hasClass('bi-hand-thumbs-up-fill') ? $('.likesSvg').addClass('act') : $('.likesSvg').removeClass('act')
          setTimeout(() => {
            $('.likesSvg').removeAttr('disabled')
          }, 500);
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

  document.emojiSource = '/lib/Summernote/summernote-emoji-master/tam-emoji/img'
  $('#summernote').summernote({//富文本编辑
    placeholder: '',
    tabsize: 2,
    height: 300,
    toolbar: [
      ['history', ['undo', 'redo']],
      ['style', ['style']],
      ['insert', ['emoji']],
      ['font', ['bold', 'underline', 'clear']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link']],
      ['view', ['codeview', 'help']]
    ],
    callbacks: {
      onImageUpload: function (files) {
        $('#maskLayer').show()
        sendFile($('#summernote'), files[0]);
      }
    }
  });
  //ajax上传图片
  function sendFile($summernote, file) {
    if ((file.size / 1024 / 1024) > 1) {//限制图片的文件大小
      alertBox('warning', ' Picture cannot exceed 1M...')
      $('#maskLayer').hide()
      return false;
    }
    var formData = new FormData();
    formData.append("file", file);
    $.ajax({
      url: "/uploadFile",//路径
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',
      success: function (data) {
        data = $.parseJSON(data);
        $('#maskLayer').hide()
        $summernote.summernote('insertImage', data.url, function ($image) {
          $image.attr('src', data.url);
        });
      }
    });
  }
  $('.note-editor').focusin(function () {
    return false
  })
  $('.note-editor').focusout(function () {
    $('.note-editable').focus()
  })
  $('.note-insert .note-btn').eq(1).click(function () {
    $('.note-editable').attr('contenteditable', false)
  })
  $('#summernoteBox .note-popover .note-btn-group .note-btn').eq(0).click(function () {
    $('.note-editable').attr('contenteditable', false)
  })
  $(document).click(function (event) {
    let dom = $('.note-editor')[0]
    if (event.target != dom && !$.contains(dom, event.target)) {
      $('.note-editable').attr('contenteditable', false)
    } else {
      $('.note-editable').attr('contenteditable', true)
    }
  })
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
    let that = this
    $(that).prop({ disabled: true })
    let val = $('#messageModal .modal-body .submitReplay').val()
    if (val == '' || val == null) {
      $('#messageModal .modal-body .invalid-feedback').show()
      $(that).removeAttr('disabled')
    } else {
      $.ajax({
        type: "post",
        url: "/letter/send",
        dataType: 'json',
        data: '{"toUserId":"' + toUserId + '","content":"' + val + '"}',
        async: true,
        contentType: "application/json;charset=UTF-8",
        success: function (req) {
          if (req.code == 'code_990000') {
            window.location.href = '/login'
          }
          alertBox('success', 'Message sent successfully')
          setTimeout(() => {
            $('#alertBox .alert').alert('close')
            $(that).removeAttr('disabled')
          }, 2000);
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
    let that = this
    $(that).prop({ disabled: true })
    let coin = $('#userInfoOcin').val()//总数
    let val = parseInt($('#rewardNum').val())//打赏值
    if (val > coin) {
      $('#rewardModal .modal-body .invalid-feedback').show()
      $(that).removeAttr('disabled')
    } else {
      $.ajax({
        type: "post",
        url: "/rewardCoin",
        dataType: 'json',
        data: '{"community_id":"' + community_id + '","number":"' + val + '"}',
        async: true,
        contentType: "application/json;charset=UTF-8",
        success: function (req) {
          if (req.code == 100000) {
            window.location.href = '/login'
          }
          if (req.code == 999999) {
            alertBox('success', 'Reward for success')
            setTimeout(() => {
              $(that).removeAttr('disabled')
              $('#rewardModal').modal('hide')
              $('#rewardBtn').attr('disabled', 'disabled')
              location.reload()
            }, 500);
          } else {
            alertBox('danger', req.msg)
            setTimeout(() => {
              $(that).removeAttr('disabled')
            }, 500);
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
      async: true,
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
  function sendComment(type, entity_id, target_id, content) {//回复评论
    let that = $('#exampleModal .commentsSubmit')
    $(that).prop({ disabled: true })
    $.ajax({
      type: "post",
      url: "/comment/add",
      // dataType: 'json',
      data: {
        "entity_type": type,
        "comment": content,
        "entity_id": entity_id,
        "target_id": target_id,
      },
      async: true,
      success: function (req) {
        req = $.parseJSON(req);
        if (req.code == '999999') {
          alertBox('success', 'Comment successful')
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
        else {
          alertBox('danger', req.msg)
          setTimeout(() => {
            $(that).removeAttr('disabled')
          }, 500);
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
          let that = $('#summernoteBox .createPostsBtn')
          $(that).prop({ disabled: true })

          let data = {
            // content: $('#summernote').val(),
            content: event.target[0].value
          }
          var regex = data.content.replace(/(<([^>]+)>)/ig, '')
          let len = regex.length
          if (len < 5) {
            $('#summernoteBox .invalid-feedback').show()
            setTimeout(() => {
              $(that).prop({ disabled: false })
            }, 500);
            return false
          } else {
            $('#summernoteBox .invalid-feedback').hide()
          }
          $.ajax({
            type: "post",
            url: "/comment/add",
            data: {
              "entity_type": 1,
              "comment": data.content,
              "entity_id": addCommentsPostId,
              "target_id": addCommentsuserId,
            },
            async: true,
            success: function (req) {
              req = $.parseJSON(req);
              if (req.code == 999999) {
                alertBox('success', 'Comment successful')
                $(that).prop({ disabled: true })
                setTimeout(() => {
                  location.reload();
                }, 2000);
              }
              else {
                alertBox('danger', req.msg)
              }
            }
          })
        }
        form.classList.add('was-validated');

      }, false);
    });

  }, false);

  replyComment = function (entity_id, target_id) {//提交回复评论
    $('.commentsSubmit').off()
    $('.commentsSubmit').on('click', function () {
      commentsData.comment = $('#exampleModal .modal-body .reply_content').text()

      if (commentsData.comment == '' || commentsData.comment == null) {
        alertBox('warning', 'Comment cannot be empty')
        return false
      } else {
        sendComment(2, entity_id, target_id, commentsData.comment)
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

  function detailFun() { // 初始化加载
    $.ajax({//浏览量
      type: "post",
      url: "/web/user/login/userLookThrough",
      dataType: 'json',
      data: '{"community_id":"' + community_id + '"}',
      async: true,
      contentType: "application/json;charset=UTF-8",
    })

    $.ajax({//评论列表数据
      type: "post",
      url: "/comment/detail",
      dataType: 'json',
      data: '{"discussPostId":"' + community_id + '","current":"' + 1 + '"}',
      async: true,
      contentType: "application/json;charset=UTF-8",
      success: function (req) {
        renderList(req.comments)
        var totalPage = req.totalPage
        totalPage <= 10 ? $('.newsPagination').hide() : ''
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
            url: "/comment/detail",
            dataType: 'json',
            data: '{"discussPostId":"' + community_id + '","current":"' + size + '"}',
            async: true,
            contentType: "application/json;charset=UTF-8",
            success: function (req) {
              var totalPage = req.totalPage
              totalPage <= 10 ? $('.newsPagination').hide() : ''
              $('.postContent .comments .commentsTop span').text(`Comments ( ${totalPage} )`)
              renderList(req.comments)
            }
          })
        }
      }
    })
    function renderList(req) {
      var commentList = ''
      var hasComments = 0
      var commentsChlid = {}
      for (let data of req) {
        hasComments = 0
        commentsChlid = data.replys
        commentsChlidHtml = ''
        if (commentsChlid.length > 0) {
          for (let child of commentsChlid) {
            commentsChlidHtml += `
              <li>
              <div class="comments_reply_item">
                  <div class="comments_reply_users">
                      <span class="comments_user_img phoneHide">
                          <img src="${child.reply.userPhoto}"
                              alt="users">
                      </span>
                      <div class="comments_reply_name">
                          <p>
                              <span class="reply_user users">${child.reply.userAccount}</span>
                              <!-- 评论用户名 -->
                              <span>reply to</span>
                              <span class="reply_user author">${child.reply.targrtAccount}</span>
                              <!-- 评论人名称 -->
                          </p>
                      </div>
                  </div>
                  <div class="comments_reply_content">
                      <p>${child.reply.content} </p>
                      <!-- 评论内容 -->
                  </div>
                  <div class="comments_reply_icon phoneHide">
                      <span class="comments_reply_icon_flag commomModal" onclick="replyComment('${child.reply.entityId}','${child.reply.userId}','${child.reply.targrtAccount}')"
                      value='${child.reply.userAccount}'>
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
                      ${formatDate(child.reply.createTime)}
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
                          <img src="${data.comment.userPhoto}" alt="users">
                          <!-- �û�ͷ�� -->
                      </span>
                      <div class="comments_user_info">
                          <p class="user_name">${data.comment.userAccount}</p>
                          <!-- �û����� -->
                          <p class="user_grade">
                             ${formatDate(data.comment.createTime)}
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
                      ${data.comment.content}
                      </p>
                      <!-- �������� -->
                  </div>
                   <div class="comments_btn">
                   <!--  <span class="likeIcon">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                       fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                       <path
                           d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                   </svg>
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style='color:red' fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                   <span class="number">2</span>
               </span> -->
                  
                      <span class="commentsIcon commomModal" onclick="replyComment('${data.comment.id}','${data.comment.userId}','${data.comment.userAccount}')" value='${data.comment.userAccount}'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                              fill="currentColor" class="bi bi-chat-square-dots" viewBox="0 0 16 16">
                              <path
                                  d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                              <path
                                  d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                          </svg>
                           <span class="number">${commentsChlid.length}</span>
                      </span>
                  </div>
                 ${hasComments == 1 ? `
                  <div class="comments_reply hasComments" id='comments-${data.comment.id}'>
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