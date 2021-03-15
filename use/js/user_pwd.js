$(function() {
    // 表单验证
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位之间'
        ],
        samePwd: function(value) {
            if (value.trim() == $('[name=oldPwd]').val()) {
                return '原密码不能与新密码一直'
            }
        },

        rePwd: function(value) {
            if (value.trim() != $('[name=newPwd]').val()) {
                return '两次新密码输入不一致'
            }
        }
    })

    $('form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg('修改密码成功！', { icon: 6 })
                $('.layui-form')[0].reset()
            }
        })
    })
})