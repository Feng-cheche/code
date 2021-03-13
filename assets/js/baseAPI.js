// 开发环境服务器地址
let baseURL = "http://api-breakingnews-web.itheima.net"


// 拦截所有的ajax请求
$.ajaxPrefilter(function(options) {
    console.log(options);
    console.log(options.url);


    // 拼接对应的环境的服务器地址
    options.url = baseURL + options.url
})