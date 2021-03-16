$(function() {

    template.defaults.imports.dateFormat = function(dtStr) {
        // console.log(dtStr);
        let dt = new Date(dtStr)
        let y = dt.getFullYear()
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDate())
        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + '    ' + hh + ':' + mm + ':' + ss
    }

    // 在个位数的左侧填充0
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: "",
    };

    initTable();

    function initTable() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: q,
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg('获取文章列表失败')
                }
                let htmlStr = template('tpl-table', { data: res.data })
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }

    let form = layui.form;
    initCate()

    function initCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message)
                }
                let htmlStr = template('tpl-cate', { data: res.data })
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    $('#form-search').on('submit', function(e) {
        e.preventDefault();
        // 获取
        let state = $('[name=state]').val()
        let cate_id = $('[name=cate_id]').val()

        // 赋值
        q.state = state;
        q.cate_id = cate_id;

        // 初始化文章列表
        initTable()

    })

    let laypage = layui.laypage;

    function renderPage(total) {
        //执行一个laypage实例
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            // 每页显示的条数
            limit: q.pagesize,
            // 起始页
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10, ],

            jump: function(obj, first) {
                console.log(obj, first);
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) {
                    initTable()
                }
            }
        });
    }


    // 删除
    let layer = layui.layer;
    $('tbody').on('click', '#btn-del', function() {
        let id = $(this).attr('data-id');
        //eg1
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                type: 'get',
                url: '/my/article/delete/' + id,
                success: (res) => {
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功')
                        // 页面汇总删除按钮等于一，页码大于1
                    if ($('#btn-del').length == 1 && q.pagenum > 1) {
                        // 删除一个页码
                        q.pagenum--;
                    }
                    initTable()
                }
            })
            layer.close(index);
        });
    })
})