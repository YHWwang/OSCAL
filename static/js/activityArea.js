$(function () {
    
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
      ['insert', ['link','picture']],
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
  $('.note-insert .note-btn').eq(1).click(function(){
    $('.note-editable').attr('contenteditable', false)
  })
  $('#summernoteBox .note-popover .note-btn-group .note-btn').eq(0).click(function(){
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
                    setTimeout(() => {
                      location.reload();
                      $(that).removeAttr('disabled')
                    }, 2000);
                  }
                  else {
                    alertBox('danger', req.msg)
                    $(that).removeAttr('disabled')
                  }
                }
              })
            }
            form.classList.add('was-validated');
    
          }, false);
        });
      }, false);
})