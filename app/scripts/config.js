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

    //服务器地址
    $rootScope.BASEURLbeta = "http://192.168.1.222:8082/";
    $rootScope.BASEURL = "http://192.168.2.194:8080/";
    // api地址
    $rootScope.api = {
        //登陆接口
        login: $rootScope.BASEURLbeta + "login/doLogin",

        //根据条件查询列表
        getLsSublist: $rootScope.BASEURL + "lsSub/list",
        //根据条件导出订单
        getLsSubexp: $rootScope.BASEURLbeta + "lsSub/exp",

        //目前用到的代替省份
        getProvinces: "api/lifeHouseInFo/getProvinces.json",
        //当月销售额与之前11个月销售额对比
        getMonthCompare: $rootScope.BASEURL+"api/report/vips/summary/moncompare"+$rootScope.developerMode

    };

}]);
