$(function () {
    var faID = $('#faID').val()
    var name = $('#faID').attr('name')
    localStorage.setItem('selectID', faID)
    var arrID = []
    var codeData = []
    layui.config({
        base: '/lib/layuiCascader/mods/ajaxCascader/'
        , version: '1.6'
    });
    layui.use(['jquery', 'ajaxCascader'], function () {
        var $ = layui.jquery;
        var cascader = layui.ajaxCascader;
        $.ajax({
            url: '/prodcutListCategory',
            type: 'post',
            dataType: 'json',
            async: false,
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                let data = res.prodcutListCategory
                res.prodcutListCategory.length > 10 ? '' : $('.newsPagination').hide()
                //存在ArrID就是二级，不存在就是三级
                for (let i of data) {
                    for (let j of i.sonList) {
                        // arrID.push(j.id)//二级
                        if (j.osThirdCategory.length != 0) {
                            for (let z = 0; z < j.osThirdCategory.length; z++) {
                                arrID.push(j.osThirdCategory[z].id)//三级id
                            }
                        }
                    }
                }
                if(arrID.includes(parseInt(localStorage.getItem('selectID')))){//解决无法显示三级列表的数据
                    for (let i of data) {
                        for (let j of i.sonList) {
                            if (j.osThirdCategory.length != 0) {
                                for (let z = 0; z < j.osThirdCategory.length; z++) {
                                   if(j.osThirdCategory[z].id == faID){
                                       faID = j.osThirdCategory[z].category_pid
                                   }
                                }
                            }
                        }
                    }
                }
                for (let i of data) {//列表数据初始化
                    for (let j of i.sonList) {//j为二级
                        if (j.id == faID) {
                            for (let index in i.sonList) {
                                let child = []
                                if (i.sonList[index].osThirdCategory.length == 0) {
                                    codeData.push({
                                        value: `${i.sonList[index].id}`,
                                        label: i.sonList[index].category_cate_name,
                                    })
                                } else {
                                    for (let ind in i.sonList[index].osThirdCategory) {
                                        child.push({
                                            value: `${i.sonList[index].osThirdCategory[ind].id}`,
                                            label: i.sonList[index].osThirdCategory[ind].category_cate_name,
                                        })
                                    }
                                    codeData.push({
                                        value: `${i.sonList[index].id}`,
                                        label: i.sonList[index].category_cate_name,
                                        children: child
                                    })
                                }
                            }
                        }
                    }
                }

                // 直接赋值模式
                cascader.load({
                    elem: '#category',                 
                    data: codeData,
                    showlast: true,
                    width: '250',
                    height: 50,
                    chooseData: [faID]
                });
                // $.ajax({
                //     url: '/getUserCommunityList/65/1',
                //     type: 'get',
                //     dataType: 'json',
                //     async: false,
                //     contentType: "application/json;charset=UTF-8",
                //     success: function (res) {

                //     }
                // })
            }
        });
        if(arrID.includes(parseInt(localStorage.getItem('selectID')))){
            $('.cascader-input').val(name)
        }
      
        cascader.on('click', '#category', function (e) {
            faID = e.value
            localStorage.setItem('selectID', codeData)
            localStorage.setItem('selectname', e.label)
            window.location.href = `/showOsCommunity/${e.value}/${e.label}`
        });

        $('.layui-btn').click(function () {
            console.log(cascader.getChooseData('#category'))
        })


    });

    //   $('#category').change(function(){
    //     selectCategory($(this).find('option:selected').attr('num'))
    // })
    // function selectCategory  (type) {//1新发2热门3精华4所有
    //     window.location.href = `/showUserCommunity?type=${type}&pageNum=1`
    // }
    
    var postType = {
        4: '',
        3: '<img src="/OSCAL/oscal-test/static/img/blog-img/import.png" alt="import">',
        2: '<img src="/OSCAL/oscal-test/static/img/blog-img/hot.png" alt="hot">',
        1: '<img src="/OSCAL/oscal-test/static/img/blog-img/new.png" alt="new">'
    }
    checkList()

    function checkList() {
        $('.OSContent .osSys-left .osSysList ul li').each(function () {
            let icon = $(this).find('p.postsTit').attr('posttype')
            if (icon == '' || icon == null) return false
            $(this).find('p.postsTit').after(`<span>${postType[icon]}</span>`);
        })
    }

})