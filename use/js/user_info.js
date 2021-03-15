$(function() {
    // 表单验证
    let form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称程度为1-6位之间！';
            }
        }
    })

    let layer = layui.layer
    initUserinfo();

    // 展示用户信息
    function initUserinfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserinfo()

    })

    // 修改信息提交
    $('form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg('用户修改失败！', { icon: 5 })
                }
                layer.msg('恭喜你，修改成功！', { icon: 6 })
                window.parent.getUserInof()
            }
        })
    })
})