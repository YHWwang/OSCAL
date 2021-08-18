$(function () {
    InitData()
   function InitData (){
        /* 放假通知 */
       $.ajax({ url: "https://www.blackview.hk/api/yxSystemGroupData?page=0&size=10&sort=id%2Cdesc&groupName=routine_home_roll_news&differ=pre",
           type:"GET",
           contentType:"application/x-www-form-urlencoded",
           success:function ( res ) {
               if(res.content.length == 0){
                    $(".contact-us-tips").hide();
                }else{
                    $(".contact-us-tips").html( res.content[0].map.info)
                    $(".contact-us-tips").show()
                }
           }
       })
    }


$(".contact-email-box li").on('click',function () {
    let index =  $(this).index()
    $(this)
        .addClass("active")
        .siblings()
        .removeClass("active")
    $(".email-content li").eq(index)
        .addClass("active")
        .siblings()
        .removeClass("active")
})
    $(".form-ipt").focus(function () {
        $(this).parent().find(".error").hide()
    })
    /* 提交 */
    $(".submit span").click(function () {
        if(  $(this).html() == 'waiting...'){
            return
        }
        var flag = true
        $(".form-ipt").each((index, item)=>{
            flag = true
            if(item.value == false && item.getAttribute("data-name") != 'orderId'){
                let value = ""
                value = $(".ipt-name").eq(index).html()
                value = value + ' is required'
                $(".error").eq(index).html(value)
                $(".error").eq(index).show()
                flag = false
            }else{
                $(".error").eq(index).hide()
            }
        })
        if(flag){
            var Email =   $("[data-name = email ]").val()
            var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if(!reg.test(Email)){
                $(".error-email").html('please enter your vaild emai!')
                $(".error-email").show()
                return false
            }
            var ruleForm = {}
            ruleForm.email = $("[data-name = email ]").val()
            ruleForm.contractName = $("[data-name = contractName ]").val()
            ruleForm.content = $("[data-name = content ]").val()
            ruleForm.category = $("[data-name = category ]").val()
            ruleForm.contractModel  = $("[data-name =model ]").val()/*型号*/
            ruleForm.subject = $("[data-name = subject ]").val()
            ruleForm.orderId = $("[data-name = orderId ]").val()
            $.ajax({ url: "/contactUs",
                type:"POST",
        
                contentType:"application/json",
                data:JSON.stringify(ruleForm) ,
                beforeSend:function(){
                    $(".submit span").html("waiting...")
                },
                success: function(res){
                    $(".submit span").html("Submit")
                    $(".form-ipt").val("")
                    $(".success").show()
                    setTimeout(function () {
                        $(".success").hide()
                    },5000)
                },
                error:function (e) {
                    $(".submit span").html("Submit")
                    console.log(e);
                }
            });

        }

    })




})