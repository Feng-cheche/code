$(function() {
    // login and register change
    $("#link_reg").on("click", function() {
        $(".login-box").hide();
        $(".reg-box").show();
    });

    $("#link_login").on("click", function() {
        $(".login-box").show();
        $(".reg-box").hide();
    });
    // 自定义验证规则
    var form = layui.form;
    // console.log(form);

    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,16}$/,
            '密码必须6 - 16 位， 且不能输入空格'
        ],


        // 确认密码规则
        repwd: function(value, item) {
            // value 代表的是再次输入密码的数字
            // item是获取到再次输入密码里面的值
            // console.log($('.reg_box input[name=password]').val());
            // console.log(value);
            if (value !== $('.reg-box input[name=password]').val()) {
                return "两次输入的密码不正确";
            }
        }
    });

    let layer = layui.layer;
    $('#reg_form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val(),
            },
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                layer.msg('注册成功', { icon: 6 })
                    // 手动跳转到登录页面
                $('#link_login').click()
                    // 清空注册表单  
                $('#reg_form')[0].reset()

            }
        })
    })

    // let ww = layui.ww;
    $('#login_form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                // 不为0就是登录失败，执行代码
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                layer.msg('注册成功', { icon: 6 })
                    // 保存token到后台
                localStorage.setItem('token', res.token);
                // 跳转页面
                location.href = "/index.html"

            }
        })
    })
})