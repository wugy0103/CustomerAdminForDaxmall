/**
 * Created by wugy on 2016/12/28.
 */
'use strict';
App.run(['$rootScope', 'Session', function ($rootScope) {
    //分页配置
    $rootScope.PAGINATION_CONFIG = {
        PAGEINDEX: "1", //默认当前页数
        PAGESIZE: "20", //每页显示多少条
        MAXSIZE: "10" //最多显示的分页按钮数
    };
    //正则验证
    $rootScope.PATTERN_CONFIG = {
        //手机号
        TEL: /^1\d{10}$/,
        //身份证号
        IDCARD: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
    };
    //开发地址
    $rootScope.BASEURL = "http://192.168.1.243:8080/";
    //$rootScope.BASEURL = "http://192.168.2.194:8082/";
    $rootScope.LoaclBASEURL = "http://localhost:3002/api/";
    //服务器地址
    //$rootScope.BASEURL = "http://test.customer.daxmall.com/";
    //$rootScope.BASEURL = "http://customer.daxmall.com/";
    // api地址
    //接口模式
    $rootScope.api = {
        //登陆接口
        login: $rootScope.BASEURL + "login/doLogin",
        //查询订单
        getLsSublist: $rootScope.BASEURL + "lsSub/list",
        //导出订单
        getLsSubexp: $rootScope.BASEURL + "lsSub/exp",
        //查询用户
        getLsUserlist: $rootScope.BASEURL + "lsUser/list",
        //导出用户
        getLsUserexportExcel: $rootScope.BASEURL + "lsUser/exportExcel",
        //查询退换货
        getLsProdReturnlist: $rootScope.BASEURL + "lsProdReturn/list",
        //导出退换货
        getLsProdReturnexp: $rootScope.BASEURL + "lsProdReturn/exp",
        //销售统计
        getLsSubCountlist: $rootScope.BASEURL + "lsSubCount/list",
        //导出销售统计
        getLsSubCountexp: $rootScope.BASEURL + "lsSubCount/exp"
    };
   /* //本地json模式
    $rootScope.api = {
        //登陆接口
        login: $rootScope.LoaclBASEURL + "login.json",
        //查询订单
        getLsSublist: $rootScope.LoaclBASEURL + "orderManage/getLsSublist.json",
        //导出订单
        getLsSubexp: $rootScope.LoaclBASEURL + "lsSub/exp",
        //查询用户
        getLsUserlist: $rootScope.LoaclBASEURL + "orderManage/getLsSublist.json",
        //导出用户
        getLsUserexportExcel: $rootScope.LoaclBASEURL + "lsUser/exportExcel",
        //查询退换货
        getLsProdReturnlist: $rootScope.LoaclBASEURL + "orderManage/getLsSublist.json",
        //导出退换货
        getLsProdReturnexp: $rootScope.LoaclBASEURL + "lsProdReturn/exp",
        //销售统计
        getLsSubCountlist: $rootScope.LoaclBASEURL + "orderManage/getLsSublist.json",
        //导出销售统计
        getLsSubCountexp: $rootScope.LoaclBASEURL + "lsSubCount/exp"
    };*/
}]);
