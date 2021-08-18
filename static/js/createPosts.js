$(function () {
    var categoryHtml = "<option value='' disabled selected style='display:none;'>category</option>"
    var category_pidHtml = "<option value='' disabled selected style='display:none;'>Section</option>"
    var obj = {
        category: 1,
        two: 1
    }
    var category2_pidHtml = "<option value='' disabled selected style='display:none;'>Section</option>"
    var select_one = GetQueryString('id')//获取一级
    var select_two = GetQueryString('se')//获取二级
    var select_three = GetQueryString('se2')//获取三级
    var category_id = select_three
    $('#threeSection').hide()
    var dataAll = ''
    var dataAll2 = ''
    var flag = true
    var flag_2 = true
    //proxy监听值的变化
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
    var observe2 = (object, onChange) => {
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
        // console.log(`一级监听到值变化为${val}了`);
        if (flag) {
            flag = false
            sectionFun1()

        }
    });
    var watchedObj2 = observe2(obj, (val) => {
        // console.log(`二级监听到值变化为${val}了`);
        if (flag_2) {
            flag_2 = false
            sectionFun2()
        }
    });
    let dom = $('.createPostBox .sort .item') //选择帖子的类型
    var sort = 0

    $.ajax({//渲染一级标签
        type: "post",
        url: "/prodcutListCategory",
        dataType: 'json',
        async: false,
        contentType: "application/json;charset=UTF-8",
        success: function (req) {
            // console.log(req.data)
            dataAll = req.data
            for (let i of req.data) {
                if (i.category_pid == 0) {
                    categoryHtml += `<option value='${i.id}'>${i.category_cate_name}</option>`
                }
            }

            $('#category').html(categoryHtml)
            select_one == 'id' ? '' : $('#category').val(select_one)
            watchedObj.category = select_one
        }
    })
    $('#category').off('change').change(function () {//一级标签改变重新渲染二级标签
        select_one = $(this).val()
        category_id = $(this).val()
        sectionFun1()
    })
    $('#section').off('change').change(function () {//二级标签改变重新渲染三级标签
        // console.log($(this).val())
        select_two = $(this).val()
        category_id = select_two
        if (category_id == 'se') {
            category_id = $(this).val()
        }
        sectionFun2()
    })
    function sectionFun1() {//渲染二级标签
        watchedObj.category = select_one
        category_pidHtml = "<option value='' disabled selected style='display:none;'>Section</option>"
        for (let id of dataAll) {
            if (watchedObj.category == id.id) {
                if (id.sonList.length > 0) {
                    $('#section').show()
                    for (let j of id.sonList) {//二级
                        category_pidHtml += `<option value='${j.id}'>${j.category_cate_name}</option>`
                    }
                    dataAll2 = id.sonList
                    sectionFun2()
                }
            }
        }
        $('#section').html(category_pidHtml)
        // console.log(select_two)
        select_two == 'se'?'': $('#section').val(select_two)
        $('#threeSection').val(select_three)
    }

    function sectionFun2() {//渲染三级标签
        watchedObj2.two = select_two
        var Bid = dataAll2
        for (let data of Bid) {
            // console.log(data.osThirdCategory)
            if (data.osThirdCategory.length > 0) {
                $('#threeSection').show()
                if (watchedObj2.two == data.id) {
                    for (let z of data.osThirdCategory) {//三级
                        category2_pidHtml = "<option value='' disabled selected style='display:none;'>Section</option>"
                        category2_pidHtml += `<option value='${z.id}'>${z.category_cate_name}</option>`
                    }
                    $('#threeSection').html(category2_pidHtml)
                    return false
                }
            }
            else {
                $('#threeSection').hide().siblings('.invalid-feedback').hide()
            }
        }
    }

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
    $('#summernote').summernote({//富文本编辑
        placeholder: '',
        tabsize: 2,
        height: 462,
        toolbar: [
            ['style', ['style']],
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
                $('#maskLayer').hide()
                $summernote.summernote('insertImage', data.data, function ($image) {
                    $image.attr('src', data.data);
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
                    let data = {
                        community_title: $('#postTitle').val(),
                        community_content: event.currentTarget[1].value,
                        oscal_comment_category_id: category_id,
                        community_type: sort
                    }
                    data.community_content = JSON.stringify(data.community_content).replace(/\"/g, "'");
                    data.community_content = JSON.stringify(data.community_content).replace(/\\/g, "");
                    $.ajax({
                        type: "post",
                        url: "/toCommunityUser",
                        dataType: 'json',
                        data: '{"community_title":"' + data.community_title + '","community_content":' + data.community_content + ',"oscal_comment_category_id":"' + data.oscal_comment_category_id + '","community_type":"' + data.community_type + '"}',
                        async: false,
                        contentType: "application/json;charset=UTF-8",
                        success: function (req) {
                            if (req.success) {
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
                                    location.href = '/communityUserPosts'
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