/*
 * @Author: 唐文雍
 * @Date:   2016-04-27 18:27:43
 * @Last Modified by:   snoob
 * @Last Modified time: 2016-11-15 18:24:15
 * 站点常量配置
 */

'use strict';

App.run(['$rootScope', 'Session', function($rootScope, Session) {
    //图片服务器地址
    $rootScope.PHOTOS = "http://img.healthmall.me/photos/";
    //分页配置
    $rootScope.PAGINATION_CONFIG = {
        PAGEINDEX: "1", //默认当前页数
        PAGESIZE: "20", //每页显示多少条
        MAXSIZE: "10" //最多显示的分页按钮数
    };

    //订单状态：-1 退款成功、 0 前往支付、1 报名成功、2 已取消
    $rootScope.ORDER_CONFIG = [{
        STATUS: -1,
        NAME: "退款成功"
    }, {
        STATUS: 0,
        NAME: "前往支付"
    }, {
        STATUS: 1,
        NAME: "报名成功"
    }, {
        STATUS: 2,
        NAME: "已取消"
    }];

    //题型： 是否必选（1为必选，0为非必选）
    $rootScope.QUESTION_CONFIG = [{
        STATUS: 1,
        NAME: "必选"
    }, {
        STATUS: 0,
        NAME: "非必选"
    }];

    //晋段成绩： 是否合格（1为合格，0为不合格）
    $rootScope.RESULT_CONFIG = [{
        STATUS: 1,
        NAME: "合格"
    }, {
        STATUS: 0,
        NAME: "不合格"
    }];

    //晋段状态： 是否合格（1为合格，0为不合格）
    $rootScope.PROMOTION_CONFIG = [{
        STATUS: 1,
        NAME: "通过或降级通过"
    }, {
        STATUS: 0,
        NAME: "未通过"
    }];

    //正则验证
    $rootScope.PATTERN_CONFIG = {
        //手机号
        TEL: /^1\d{10}$/,
        //身份证号
        IDCARD: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
    };


    //开发者模式
    $rootScope.developerMode = "?accessToken=" + Session.$storage.accessToken;
    //集成环境
    //$rootScope.developerMode="";

    //服务器地址
    $rootScope.BASEURL = "http://10.0.0.222:8081/";
    // api地址
    $rootScope.api = {
        //登陆接口
        login: $rootScope.BASEURL + "api/login",
        //获取省市区
        getArea: $rootScope.BASEURL + "api/region/component/getregion/",
        //获取生活馆
        getLifeHouse: $rootScope.BASEURL + "api/lifehouse/component/region/",
        //目前用到的代替省份
        getProvinces: "api/lifeHouseInFo/getProvinces.json",
        //当月销售额与之前11个月销售额对比
        getMonthCompare: $rootScope.BASEURL+"api/report/vips/summary/moncompare"+$rootScope.developerMode,

        logout: "api/logout.json",
        getSideNav: $rootScope.BASEURL + "api/menu/myMenu",
        getLifeHouseList: "api/lifeHouseInFo/getLifeHouseList.json",
        getProvinces: "api/lifeHouseInFo/getProvinces.json",
        getCitys: "api/lifeHouseInFo/getCitys.json",
        getCountys: "api/lifeHouseInFo/getCountys.json",
        getNumName: "api/lifeHouseInFo/getNumName.json",
        getLifeHouseDetail: "api/lifeHouseInFo/getLifeHouseDetail.json",
        getAllProgram: "api/lifeHouseInFo/getAllProgram.json",
        lifeHouseAdd: "api/lifeHouseInFo/lifeHouseAdd.json",
        lifeHouseEdit: "api/lifeHouseInFo/lifeHouseEdit.json",
        getVipDetails: "api/memberInfo/getVipDetails.json",
        getUserByLife: "api/memberInfo/getUserByLife.json",
        modifiSalesPersonnel: "api/memberInfo/modifiSalesPersonnel.json",
        getUserInfoList: "api/userInfo/getUserInfoList.json",
        getUserInfoSportItem: "api/userInfo/getUserInfoSportItem.json",
        getClubCardResult: "api/clubCard/getClubCardResult.json",
        getScheduleDetail: "api/personnelScheduling/getScheduleDetail.json",
        getHouseDetail: "api/personnelScheduling/getHouseDetail.json",
        getLifeCardData: "api/clubCard/getLifeCardData.json",
        
        getVipType: "api/memberInfo/getViptype.json",
        getRegion: "api/memberInfo/getRegion.json",
        getorderinfos: "api/orderManagement/getorderinfos.json",
        getVideoUploadList: "api/video/getVideoUploadList.json"
    };

    //本地开发模式
    /*
    $rootScope.api = {
        //登陆接口
        login: $rootScope.BASEURL + "api/login",
        //获取省市区
        getArea: $rootScope.BASEURL + "api/region/component/getregion/",
        //获取生活馆
        getLifeHouse: $rootScope.BASEURL + "api/lifehouse/component/region",
        //目前用到的
        getProvinces: "api/lifeHouseInFo/getProvinces.json",


        logout: "api/logout.json",
        getSideNav: $rootScope.BASEURL + "api/menu/myMenu",
        getLifeHouseList: "api/lifeHouseInFo/getLifeHouseList.json",
        getProvinces: "api/lifeHouseInFo/getProvinces.json",
        getCitys: "api/lifeHouseInFo/getCitys.json",
        getCountys: "api/lifeHouseInFo/getCountys.json",
        getNumName: "api/lifeHouseInFo/getNumName.json",
        getLifeHouseDetail: "api/lifeHouseInFo/getLifeHouseDetail.json",
        getAllProgram: "api/lifeHouseInFo/getAllProgram.json",
        lifeHouseAdd: "api/lifeHouseInFo/lifeHouseAdd.json",
        lifeHouseEdit: "api/lifeHouseInFo/lifeHouseEdit.json",
        getVipDetails: "api/memberInfo/getVipDetails.json",
        getUserByLife: "api/memberInfo/getUserByLife.json",
        modifiSalesPersonnel: "api/memberInfo/modifiSalesPersonnel.json",
        getUserInfoList: "api/userInfo/getUserInfoList.json",
        getUserInfoSportItem: "api/userInfo/getUserInfoSportItem.json",
        getClubCardResult: "api/clubCard/getClubCardResult.json",
        getScheduleDetail: "api/personnelScheduling/getScheduleDetail.json",
        getHouseDetail: "api/personnelScheduling/getHouseDetail.json",
        getLifeCardData: "api/clubCard/getLifeCardData.json",
        getMonthCompare: "api/salaData/getMonthCompare.json",
        getVipType: "api/memberInfo/getViptype.json",
        getRegion: "api/memberInfo/getRegion.json",
        getorderinfos: "api/orderManagement/getorderinfos.json",
        getVideoUploadList: "api/video/getVideoUploadList.json"
    };*/
}]);
