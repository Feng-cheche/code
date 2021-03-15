// 开发环境服务器地址
let baseURL = "http://api-breakingnews-web.itheima.net"


// 拦截所有的ajax请求
$.ajaxPrefilter(function(options) {
    console.log(options);
    console.log(options.url);


    // 拼接对应的环境的服务器地址
    options.url = baseURL + options.url

    // 身份信息优化
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function(res) {
        console.log(res.responseJSON)
        console.log(res);

        let obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html'
        }
    }
})