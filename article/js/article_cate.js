$(function() {
    initArtCateList();

    function initArtCateList() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: (res) => {
                console.log(res);
                let htmStr = template('tpl-art-cate', { data: res.data });
                $('tbody').html(htmStr)
            }
        })
    };
    let indexAdd = null;
    let layer = layui.layer
    $('#btnAdd').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })


    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('添加成功')
                $('#form-add')[0].reset()
                initArtCateList()
                layer.close(indexAdd)

            }
        })
    })


    let indexEdit = null;
    let form = layui.form
    $('tbody').on('click', '#btn-edit', function(e) {
        e.preventDefault()
            // 遮罩层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        let Id = $(this).attr('data-id');
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + Id,
            success: (res) => {
                console.log(res);
                form.val('form-edit', res.data)
            }
        })
    })

    // 修改提交-文章分类
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('添加成功')
                $('#form-edit')[0].reset()
                initArtCateList()
                layer.close(indexEdit)

            }
        })
    })

    $('tbody').on('click', '#btn-del', function(e) {
        e.preventDefault()
        let Id = $(this).attr('data-id');
        // 遮罩层
        //eg1
        layer.confirm('确定删除咩?', { icon: 3, title: '提示' }, function(index) {
            //do something

            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + Id,
                success: (res) => {
                    console.log(res);
                    if (res.status != 0) {
                        return layui.layer.msg(res.message)
                    }
                    layui.layer.msg('删除成功')
                    initArtCateList()
                    layer.close(index)


                }
            })
        })
    })

})