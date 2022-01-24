$(function () {
    var dataAll = ''
    var dom = $('.createPostBox .sort .item') //选择帖子的类型
    var sort = 0
    var url_opstId = GetQueryString('postId') == 'postId' ? 0 : GetQueryString('postId')
    var category_id = url_opstId
    var postSelect = {
        one: 0,
        two: 0
    }
    $.ajax({//渲染一级标签
        type: "post",
        url: "/prodcutListCategory",
        dataType: 'json',
        async: true,
        contentType: "application/json;charset=UTF-8",
        success: function (req) {
            dataAll = req.prodcutListCategory
            let categoryHtml = "<option value='' disabled selected style='display:none;'>category</option>"
            for (let i of dataAll) {
                i.id == url_opstId ? postSelect.one = i.id : ''
                for (let j of i.sonList) {//二级
                    if (j.id == url_opstId) {//判断postId是否在二级菜单里
                        postSelect = {
                            one: j.category_pid,
                            two: j.id
                        }
                    }
                }
                sectionFun1()
                categoryHtml += `<option value='${i.id}' ${i.id == postSelect.one ? 'selected' : ''} >${i.category_cate_name}</option>`
            }
            $('#category').html(categoryHtml)
        }
    })
    function sectionFun1() {//渲染二级标签
        let category_pidHtml = "<option value='' disabled selected style='display:none;'>Section</option>"
        for (let id of dataAll) {
            if (id.id == postSelect.one && id.sonList.length > 0) {
                for (let j of id.sonList) {//二级
                    category_pidHtml += `<option value='${j.id}' ${j.id == postSelect.two ? 'selected' : ''} >${j.category_cate_name}</option>`
                }
            }
        }
        $('#section').html(category_pidHtml)
    }
    $('#category').off('change').change(function () {//一级标签改变重新渲染二级标签
        category_id = $(this).val()
        postSelect.one = category_id
        sectionFun1()
    })
    $('#section').off('change').change(function () {//二级标签改变重新渲染三级标签
        category_id = $(this).val()
    })


    // 手动上传图片--start--
    var cover = `
    <div class="upload-coverImage-remove">Remove</div>
    <div class="upload-coverImage-cover"></div>
    `
    $('.upload-coverImage-list ul li').hover(function () {
        $(this).append(cover)
    }, function () {
        $('.upload-coverImage-remove').remove()
        $('.upload-coverImage-cover').remove()
    })
    $('.upload-coverImage-list ul li').click(function () {
        $(this).remove()//清除节点和上传图片的数组
        console.log($(this).attr('removeIndex'))
    })

    $('.upload-coverImage').attr({
        'data-toggle': "modal",
        'data-target': "#updateImageModal",
    })

    var FileInput = function () {
        var oFile = new Object();

        //初始化fileinput控件（第一次初始化）
        oFile.Init = function (ctrlName, uploadUrl) {
            var control = $('#' + ctrlName);

            //初始化上传控件的样式
            control.fileinput({
                language: 'en', //设置语言
                uploadUrl: uploadUrl, //上传的地址
                allowedFileExtensions: ['jpg', 'gif', 'png', 'webp', 'jpeg'],//接收的文件后缀
                uploadAsync: false, //默认异步上传，这里如果不是异步上传，多个图片一次性提交到后台，只发一次请求，如果为异步上传，每张图片都会发一次请求，多次请求
                showUpload: true, //是否显示上传按钮
                showRemove: true, //显示移除按钮
                showPreview: true, //是否显示预览
                showCaption: false,//是否显示标题
                browseClass: "btn btn-primary", //按钮样式
                maxFileSize: 1000,
                maxFileCount: 4, //允许同时上传的最大文件个数
                enctype: 'multipart/form-data',
                validateInitialCount: true,
                msgSizeTooLarge: 'File "{name}" ({size} KB) exceeds maximum allowed upload size of {maxSize} KB. Please retry your upload!',
                previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
                msgFilesTooMany: "The number of files selected for upload ({n}) exceeds the maximum allowed value {m}!",
            })

            //导入文件上传完成之后的事件
            $("#input-id").on("filebatchuploadsuccess", function (event, data, previewId, index) {
                // var data = data.response;
                // var last = data.lastIndexOf("Upload");
                // EmImg = data.substring(last + 7);
               console.log(data.response.url)
                $("#updateImageModal").modal('hide');
                $('div.modal-backdrop').hide();
                // 得到的返回地址在渲染到html中
                // $('.upload-coverImage-list ul').html()
            });
        }
        return oFile;
    };
    var oFileInput = new FileInput();
    oFileInput.Init("input-id", "/uploadFile");   // **注意：这里是导入地址写好你的控制器  和方法名**
    // --end--


    postSort = function (index) {//顶部选择的帖子类型
        $(dom).eq(index).addClass('active').find('img:nth-child(' + (index + 1) + ')').show().siblings('img').hide().parent().siblings().removeClass('active').find('img:nth-child(' + (index + 1) + ')').show().siblings('img').hide()
        index == 0 ? sort = 0 : sort = 1
    }

    postCancel = function () {//取消按钮
        var r = confirm("Are you sure to leave the page?");
        if (r == true) {
            console.log('yes')
        }
    }
    document.emojiSource = '/lib/Summernote/summernote-emoji-master/tam-emoji/img'
    $('#summernote').summernote({//富文本编辑
        placeholder: '',
        tabsize: 2,
        height: 462,
        toolbar: [
            ['history', ['undo', 'redo']],
            ['style', ['style']],
            ['insert', ['emoji']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture']],
            ['view', ['codeview', 'help']]
        ],
        callbacks: {
            onImageUpload: function (files) {
                $('#maskLayer').show()
                sendFile($('#summernote'), files[0]);
            }
        }
    });
    $('.note-insert .note-btn').eq(1).click(function () {
        $('.note-editable').attr('contenteditable', false)
    })
    $('.comments_bottom .note-popover .note-btn-group .note-btn').eq(0).click(function () {
        $('.note-editable').attr('contenteditable', false)
    })
    $('.note-editor').focusin(function () {
        return false
    })
    $('.note-editor').focusout(function () {
        $('.note-editable').focus()
    })
    $(document).click(function (event) {
        let dom = $('.note-editor')[0]
        if (event.target != dom && !$.contains(dom, event.target)) {
            $('.note-editable').attr('contenteditable', false)
        } else {
            $('.note-editable').attr('contenteditable', true)
        }
    })

    //ajax上传图片
    function sendFile($summernote, file) {
        if ((file.size / 1024 / 1024) > 1) {//限制图片的文件大小
            $('#alertBox').html(`
            <div class="alert alert-warning  alert-dismissible fade show" role="alert">
            Picture cannot exceed 1M...
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
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

    window.addEventListener('load', function () { //创建帖子验证
        var forms = document.getElementsByClassName('needs-validation-createPostsForm');
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                window.event.returnValue = false;
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                else {
                    $('#createPostsForm .postSubmit').prop({ disabled: true })
                    let data = {
                        community_title: $('#postTitle').val(),
                        community_content: event.currentTarget[1].value,
                        oscal_comment_category_id: category_id,
                        community_type: sort
                    }
                    $.ajax({
                        type: "post",
                        url: "/discuss/add",
                        data: {
                            "community_title": data.community_title,
                            "community_content": data.community_content,
                            "oscal_comment_category_id": data.oscal_comment_category_id
                        },
                        async: true,
                        success: function (req) {
                            req = $.parseJSON(req);
                            if (req.code == 999999) {
                                $('#alertBox').html(`
                                <div class="alert alert-success alert-dismissible fade show" role="alert">
                                    <strong>Post successfully</strong>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                `)
                                //清空表单
                                // $('#postTitle').val('')
                                // $('.note-editable p').text('')
                                // $('#category').prop('selectedIndex', 0)
                                // $('#section').prop('selectedIndex', 0)
                                // $('#threeSection').prop('selectedIndex', 0)
                                setTimeout(() => {
                                    $('#createPostsForm .postSubmit').removeAttr('disabled')
                                    location.href = '/user/communityUserPosts'
                                }, 2000);
                            } else {
                                $('#alertBox').html(`
                                <div class="alert alert-warning  alert-dismissible fade show" role="alert">
                                    ${req.msg}
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                `)
                                setTimeout(() => {
                                    $('#createPostsForm .postSubmit').removeAttr('disabled')
                                }, 500);
                            }
                        }
                    })
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);

    function GetQueryString(name) { //url传值
        var regex = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(regex);
        if (r != null) return unescape(r[2]);
        return name;
    }
})