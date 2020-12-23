// 页面加载时所需要进行的操作
// var ajaxStatus = true;
import jQuery from 'jquery';


function ajax(url, data, successFn, async, type, dataType, errorFn) {
    var token = '';
    // console.log(window.sessionStorage.getItem("userInfo"));
    if (window.sessionStorage.getItem("userInfo")) {
        token = JSON.parse(window.sessionStorage.getItem("userInfo")).token;
    }
    var type = type || 'post'; // 请求类型
    var dataType = dataType || 'json'; // 接收数据类型
    var async = async || true; // 是否异步请求
    // var alone = alone || false; // 独立提交（一次有效的提交）
    // var cache = cache || false; // 浏览器历史缓存
    var successFn = successFn || function (res) {
        // layer.closeAll('loading');
        setTimeout(function () {
            promptMsg(data.msg); // 通过layer插件来进行信息提示
        }, 500);
        if (res.status === 0) { // 服务器处理成功
            setTimeout(function () {
                if (data.url) {
                    location.replace(res.url);
                } else {
                    location.reload(true);
                }
            }, 1500);
        } else { // 服务器处理失败
            // if (alone) { // 改变ajax提交状态
            //     ajaxStatus = true
            // }
        }
    }
    var errorFn = errorFn || function (err) {
        // layer.closeAll('loading');
        setTimeout(function () {
            if (err.status === 404) {
                promptMsg('请求失败，请求未找到', 2);
            } else if (err.status === 503) {
                promptMsg('请求失败，服务器内部错误', 2);
            } else {
                promptMsg('请求失败，网络连接超时', 2);
            }
            // ajaxStatus = true;
        }, 500);
    }
    // 判断是否可以发送ajax请求
    // if(!ajaxStatus) {
    //     return false
    // }
    // ajaxStatus = false; // 禁用ajax请求
    // 正常情况下1秒后可以再次进行异步请求，但alone为true时只可以有一次有效请求
    // if(!alone) {
    //     setTimeout(function() {
    //         ajaxStatus = true
    //     }, 500)
    // }
    // if (!getCookie('user') && (url != 'common/getKey' && url != 'common/login' && url != 'common/loginOut')) {
    //     location.href = './login.html';
    //     window.sessionStorage.clear();
    // } else {
    // data['token'] =
    $.ajax({
        url: baseUrl + url,
        data: data,
        type: type,
        dataType: dataType,
        async: async,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        headers: {
            "token": token
        },
        // timeout: 3000,
        // cache: cache, // 浏览器缓存
        // xhrFields: {
        //     withCredentials: true
        // },
        // crossDomain: true,
        success: function (res) {
            // console.log(window.location.href.split('/')[window.location.href.split('/').length - 1]);
            if (res.status == 302) {
                window.sessionStorage.removeItem("userInfo");
                window.sessionStorage.removeItem("userRoute");
                window.sessionStorage.removeItem("curUrl");
                window.sessionStorage.removeItem("menuId");
                window.sessionStorage.removeItem("secondMenuId");
                if (window != top) {
                    top.location.href = baseUrl + 'login.html';
                    // if(url == 'wastewater' || url == 'wastegas' || url == 'noise' || url == 'general' || url == 'danger' || url == 'envirrisk'){
                    //
                    // }
                } else {
                    window.location.href = baseUrl + 'login.html';
                }
                return false;
            }
            successFn(res);
        },
        error: errorFn,
    });
    // }
}

// submitAjax(post方式提交)
// function submitAjax(form, success, cache, alone) {
//     cache = cache || true;
//     var form = $(form);
//     var url = form.attr('action');
//     var data = form.serialize();
//     ajax(url, data, success, cache, alone, false, 'post','json');
// }
/*//调用实例
$(function () {
    $('#form-login').submit(function () {
        submitAjax('#form-login');
        return false;
    });
});*/

jQuery.postAjax = function (url, data, successFn, errorFn, async) {
    ajax(url, data, successFn, async, 'POST', 'json', errorFn)
}

// ajax GET请求
jQuery.getAjax = function (url, data, successFn) {
    ajax(url, data, successFn, true, 'GET', 'json')
}

// jsonp跨域请求(get方式提交)
jQuery.jsonpAjax = function (url, success) {
    ajax(url, {}, success, true, 'GET', 'jsonp');
}

