$(function () {
    setTimeout(() => {
        if (localStorage.email && localStorage.passpword && (localStorage.remember == 'true')) {//记住密码
            $('#validationCustom01').val(localStorage.email)
            $('#validationCustom02').val(localStorage.passpword)
            $('#invalidCheck').attr("checked", true)
        }
        $('.goSignPage').click(function () {
            localStorage.setItem('goSignPage', true)
        })
    }, 200);
    $('.eyeIcon').click(function () {
        $(this).find('.active').removeClass('active').siblings().addClass('active')
        if ($(this).siblings('.form-control').attr('type') == 'password') {
            $(this).siblings('.form-control').attr('type', 'text')
        } else {
            $(this).siblings('.form-control').attr('type', 'password')
        }
    })

    $('.loginContent .goSign a').click(function () {
        $('#profile-tab').click()
    })
    $('.loginContent .goLogin a').click(function () {
        $('#home-tab').click()
    })

    $('.sendCode').click(function () {//获取验证码
        if ($(this).hasClass('disabled')) {
            return false
        }
        let data = {
            email: '',
            busType: 'register'
        }
        data.email = $('#validationCustom03').val()
        if ($(this).hasClass('forget')) {
            // debugger
            data = {
                busType: 'userForgetPass'
            }
            data.email = $('#validationForgotPwd01').val()
        }
        var reg = /^(\w|\.|\-)+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
        if (data.email == '' || data.email == null) {
            alertBox('danger', 'E-mail can not be empty')
            return false
        } else if (reg.test(data.email)) {
            $.ajax({
                type: "post",
                url: "/sendCode/getCode",
                dataType: 'json',
                data: '{"email":"' + data.email + '","busType":"' + data.busType + '"}',
                async: true,
                contentType: "application/json;charset=UTF-8",
                success: function (req) {
                    if (req.code == 999999) {
                        alertBox('success', req.msg)
                        setTimeout(() => {
                            $('#alertBox .alert').alert('close')
                        }, 4000);
                    } else {
                        alertBox('danger', req.msg)
                        setTimeout(() => {
                            $('#alertBox .alert').alert('close')
                        }, 4000);
                    }
                },
            })
        }
        else {
            alertBox('danger', 'The email format is wrong!')
            return false;
        }
        $(this).addClass('disabled')
        let count = 60
        let text = $(this).text()
        let timer = null
        timer = setInterval(() => {
            count--
            $(this).text(count + ' S')
            if (count <= 0) {
                clearInterval(timer)
                $(this).removeClass('disabled')
                $(this).text(text)
            }
        }, 1000);

    })
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
    window.addEventListener('load', function () { //登录功能验证
        var forms = document.getElementsByClassName('needs-validation-signInForm');
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                window.event.returnValue = false;
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                else {
                    let data = {
                        email: event.currentTarget[0].value,
                        passpword: event.currentTarget[1].value,
                        remember: false
                    }
                    if ($('#invalidCheck').is(':checked')) {
                        data.remember = true
                        localStorage.setItem("email", data.email);
                        localStorage.setItem("passpword", data.passpword);
                        localStorage.setItem("remember", data.remember);
                        // console.log(data)
                        login(data.email, data.passpword)
                    } else {
                        data.remember = false
                        localStorage.setItem("remember", data.remember);
                        // console.log(data.email, data.passpword)
                        login(data.email, data.passpword)
                    }
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);

    function login(email, passpword) {//登录
        let that = $('.loginSubmitBtn')
        that.prop({ disabled: true })
        $.ajax({
            type: "post",
            url: "/login",
            data: {
                "username": email,
                "password": passpword
            },
            async: true,
            success: function (req) {
                req = $.parseJSON(req);
                $('#AMain .form-control').css({
                    'border-color': '#ced4da'
                })
                if (req.code == 999999) {
                    alertBox('success', 'Login successful')
                    setTimeout(() => {
                        window.location.href = '/home'
                    }, 1000);
                } else {
                    if (req.msg.includes('Password')) {
                        $('#validationCustom02.form-control:valid').css('border-color', 'red')
                    } else {
                        $('#validationCustom01.form-control:valid').css('border-color', 'red')
                    }
                    alertBox('danger', req.msg)
                    setTimeout(() => {
                        that.removeAttr('disabled')
                    }, 500);
                    setTimeout(() => {
                        $('#alertBox .alert').alert('close')
                    }, 4000);
                }
            }
        })
    }

    window.addEventListener('load', function () { //创建用户功能验证
        var forms = document.getElementsByClassName('needs-validation-signUpForm');
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                window.event.returnValue = false;
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                else {
                    let that = $('.loginSubmitBtn')
                    that.prop({ disabled: true })
                    let data = {
                        name: event.currentTarget[0].value,
                        email: event.currentTarget[1].value,
                        code: event.currentTarget[2].value,
                        passpword: event.currentTarget[3].value,
                        rePasspword: event.currentTarget[4].value,
                    }
                    if (data.passpword != data.rePasspword) {
                        event.currentTarget[3].value = ''
                        event.currentTarget[4].value = ''
                        alertBox('danger', 'Inconsistent passwords')
                        setTimeout(() => {
                            $('#alertBox .alert').alert('close')
                        }, 5000);
                        return false
                    }
                    $.ajax({
                        type: "post",
                        url: "/register",
                        data: {
                            "parentChain": data.code,
                            "userEmail": data.email,
                            "sysUserAccount": data.name,
                            "loginPassword": data.passpword
                        },
                        async: true,
                        success: function (req) {
                            $('#AMain .form-control').css({
                                'border-color': '#ced4da'
                            })
                            req = $.parseJSON(req);
                            if (req.code == 999999) {
                                alertBox('success', 'Registration success')
                                setTimeout(() => {
                                    $('#alertBox .alert').alert('close')
                                    window.location.href = '/login'
                                }, 2000);

                            } else {
                                if (req.msg.includes('account')) {
                                    $('#validationCustom05.form-control:valid').css('border-color', 'red')
                                } else if (req.msg.includes('mailbox')) {
                                    $('#validationCustom03.form-control:valid').css('border-color', 'red')
                                } else if (req.msg.includes('code')) {
                                    $('.form-control-lg.form-control:valid').css('border-color', 'red')
                                }
                                alertBox('warning', req.msg)
                                setTimeout(() => {
                                    $('#alertBox .alert').alert('close')
                                }, 2000);
                                setTimeout(() => {
                                    that.removeAttr('disabled')
                                }, 500);
                            }
                        }
                    })
                }
                form.classList.add('was-validated');

            }, false);
        });
    }, false);

    window.addEventListener('load', function () { //忘记密码功能验证
        var forms = document.getElementsByClassName('needs-validation-forgotPwdForm');
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                window.event.returnValue = false;
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                else {
                    let that = $('.forgotPwdSubmitBtn')
                    that.prop({ disabled: true })
                    let data = {
                        email: event.target[0].value,
                        code: event.target[1].value,
                        passpword: event.target[2].value,
                    }
                    $.ajax({
                        type: "post",
                        url: "/userForgetPass",
                        data: {
                            "username": data.email,
                            "emailVerifyCode": data.code,
                            "password": data.passpword
                        },
                        async: true,
                        success: function (req) {
                            $('#AMain .form-control').css({
                                'border-color': '#ced4da'
                            })
                            req = $.parseJSON(req);
                            if (req.code == 999999) {
                                alertBox('success', 'Successfully change password')
                                setTimeout(() => {
                                    $('#alertBox .alert').alert('close')
                                    window.location.href = '/login'
                                }, 2000);
                            } else {
                                if (req.msg.includes('account')) {
                                    $('#validationForgotPwd01.form-control:valid').css('border-color', 'red')
                                } else if (req.msg.includes('code')) {
                                    $('#validationCustomforget.form-control:valid').css('border-color', 'red')
                                } else if (req.msg.includes('password')) {
                                    $('#validationForgotPwd02.form-control:valid').css('border-color', 'red')
                                }
                                alertBox('danger', req.msg)
                                setTimeout(() => {
                                    $('#alertBox .alert').alert('close')
                                }, 2000);
                                setTimeout(() => {
                                    that.removeAttr('disabled')
                                }, 500);
                            }
                        }
                    })

                }
                form.classList.add('was-validated');

            }, false);
        });
    }, false);

    if (localStorage.goSignPage == 'true') {
        $('#profile-tab').trigger('click')
        localStorage.setItem('goSignPage', false)
    }

})