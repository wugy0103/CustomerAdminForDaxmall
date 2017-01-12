/*
 * @Author: snoob
 * @Date:   2016-12-15 10:36:37
 * @Last Modified by:   snoob
 * @Last Modified time: 2016-12-21 16:34:40
 */
//技术考评管理》考评员申请管理

'use strict';
App.controller('EvaluationApplyController', function($scope, $log, $rootScope, $http, $uibModal, restful, ngProgressFactory, AreaSelector) {
    $scope.progressbar = ngProgressFactory.createInstance();
    var areaResourceUri = '/common/getCityInfo';
    AreaSelector.getProvinces(areaResourceUri).then(function(areas) {
        //获取省份
        $scope.provinces = areas;
    });
    $scope.initCity = function(province) {
        if (!province) {
            return;
        }
        AreaSelector.getCitiesByProvinceCode(areaResourceUri, province.city_code).then(function(res) {
            //获取城市
            $scope.cities = res;
        });
    }
    $scope.data = {};
    //分页
    $scope.PageIndex = $rootScope.PAGINATION_CONFIG.PAGEINDEX;
    $scope.PageSize = $rootScope.PAGINATION_CONFIG.PAGESIZE;
    $scope.maxSize = $rootScope.PAGINATION_CONFIG.MAXSIZE;
    $scope.pageChanged = function() {
        $scope.query();
    };
    $scope.setPage = function() {
        $scope.PageIndex = $scope.toPageNum;
        $scope.query();
    };

    //时间控件
    $scope.beginDatepickerOptions = {
        showWeeks: false
    };
    $scope.endDatepickerOptions = {
        showWeeks: false
    };
    $scope.openBegintime = function() {
        $scope.BegintimeOpened.opened = true;
    };
    $scope.openEndtime = function() {
        $scope.EndtimeOpened.opened = true;
    };
    $scope.BegintimeOpened = {
        opened: false
    };
    $scope.EndtimeOpened = {
        opened: false
    };
    $scope.updateEndDate = function() {
        $scope.endDatepickerOptions.minDate = moment($scope.data.orderBegintime * 1000).add(1, "days");
    }
    $scope.updateBeginDate = function() {
        $scope.beginDatepickerOptions.maxDate = moment($scope.data.orderEndtime * 1000).subtract(1, "days");
    }

    //获取项目
    restful.fetch("/item/getItemListInfo").then(function(res) {
        $scope.projects = res.data;
    });
    //获取段位
    $scope.levels = [
        { es_level: 4, es_leveldesc: "四段" },
        { es_level: 5, es_leveldesc: "五段" },
        { es_level: 6, es_leveldesc: "六段" },
        { es_level: 7, es_leveldesc: "七段" },
        { es_level: 8, es_leveldesc: "八段" },
        { es_level: 9, es_leveldesc: "九段" }
    ];

    //申请状态
    $scope.applyType = [
        { applytype_id: 0, applytype_name: "未审核" }, { applytype_id: 2, applytype_name: "已通过" }, { applytype_id: 3, applytype_name: "未通过" },
    ]

    //考评点
    $scope.examroomType = [
        { examroomtype_id: 0, examroomtype_name: "否" }, { examroomtype_id: 1, examroomtype_name: "是" }
    ]

    //重置
    $scope.reset = function() {
        $scope.data = {};
        $scope.PageIndex = $rootScope.PAGINATION_CONFIG.PAGEINDEX;
        $scope.toPageNum = $rootScope.PAGINATION_CONFIG.PAGEINDEX;
    }

    //加载
    $scope.query = function() {
        $scope.progressbar.start();
        var params = {
            PageIndex: parseInt($scope.PageIndex),
            PageSize: parseInt($scope.PageSize),
            condition: $scope.data
        };
        $scope.EvaluationApplyPromise = restful.fetch("/teacherapply/getTeacherApplyInfo", "POST", params).then(function(res) {
            console.log(params);
            console.log(res);
            if (res.success) {
                $scope.EvaluationApplys = res.msg.rows;
                $scope.EvaluationApplyCount = res.msg.count;
            }
            $scope.progressbar.complete();
        }, function(rej) {
            console.info(rej);
        });
    };
    $scope.query();

    $scope.timeStampToDate = function(tm) {
            return new Date(tm).toLocaleString()
        }
        //审核
    $scope.check = function(EvaluationApply) {
            var modalInstance = $uibModal.open({
                templateUrl: 'CheckEvaluationApply.html',
                controller: 'CheckEvaluationApplyController',
                resolve: {
                    EvaluationApply: function() {
                        return EvaluationApply;
                    }
                },
                size: 'lg'
            });
            modalInstance.result.then(function() {
                //close
            }, function() {
                //dismissed
                $scope.query();
            })
        }
        //拒绝理由
    $scope.reject = function(EvaluationApply) {
        var modalInstance = $uibModal.open({
            templateUrl: 'reject.html',
            controller: 'RejectController',
            resolve: {
                EvaluationApply: function() {
                    return EvaluationApply;
                }
            },
            size: 'md'
        });
        modalInstance.result.then(function() {
            //close
        }, function() {
            //dismissed
            $scope.query();
        })
    }
});

//审核
App.controller("CheckEvaluationApplyController", function($scope, $uibModalInstance, $q, EvaluationApply, restful, toastr, $uibModal) {
    //时间戳转换
    $scope.timeStampToDate = function(tm) {
        return new Date(tm).toLocaleString()
    }
    console.log(EvaluationApply);
    //数据绑定
    $scope.data = EvaluationApply;


    //审核
    $scope.audit = function(apply_id, real_name, status) {
        var EvaluationApply;
        var modalInstance = $uibModal.open({
            templateUrl: 'passOrReject.html',
            controller: 'passOrRejectController',
            resolve: {
                EvaluationApply: function() {
                    return {
                        apply_id: apply_id,
                        real_name: real_name,
                        status: status
                    }
                }
            },
            size: 'md'
        });
        modalInstance.result.then(function() {
            //close
            $uibModalInstance.close('close');
        }, function() {
            //dismissed
            $uibModalInstance.dismiss('success');
        })
    }
});

//通过or拒绝
App.controller("passOrRejectController", function($scope, $uibModalInstance, $q, EvaluationApply, restful, toastr) {
    console.log(EvaluationApply);
    $scope.data = EvaluationApply;
    $scope.pass = function() {
        var params = {
            apply_id: EvaluationApply.apply_id,
            apply_status: $scope.data.status,
            apply_comment: $scope.data.apply_comment
        };
        console.log(params);
        restful.fetch("/teacherapply/checkTeacher", "POST", params).then(function(res) {
            console.log(res);
            if (res.success) {
                $uibModalInstance.dismiss('success');
            } else {
                $scope.error = res.msg;
            }
        }, function(rej) {
            console.info(rej);
        });
    }
    $scope.close = function() {
        $uibModalInstance.close('close');
    };
});

//查看拒绝理由
App.controller("RejectController", function($scope, $uibModalInstance, $q, EvaluationApply, restful, toastr, $uibModal) {
    //时间戳转换
    $scope.timeStampToDate = function(tm) {
        return new Date(tm).toLocaleString()
    }
    $scope.EvaluationApply = EvaluationApply;


    $scope.close = function() {
        $uibModalInstance.close('close');
    };
});
