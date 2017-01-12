/*
 * @Author: 唐文雍
 * @Date:   2016-07-12 16:36:37
 * @Last Modified by:   snoob
 * @Last Modified time: 2016-12-14 16:34:40
 */
//技术考评管理》考评员管理

'use strict';
App.controller('EvaluationClerkController', function($scope, $log, $rootScope, $http, $uibModal, restful, ngProgressFactory, AreaSelector) {
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
        console.log(params);
        $scope.EvaluationClerkPromise = restful.fetch("/teacher/getTeachersInfo", "POST", params).then(function(res) {
            console.log(res);
            if (res.success) {
                $scope.EvaluationClerks = res.data.rows;
                $scope.EvaluationClerkCount = res.data.count;
            }
            $scope.progressbar.complete();
        }, function(rej) {
            console.info(rej);
        });
    };
    $scope.query();

    $scope.add = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'AddEvaluationClerk.html',
            controller: 'AddEvaluationClerkController',
            size: 'lg'
        });
        modalInstance.result.then(function() {
            //close
        }, function() {
            //dismissed
            $scope.query();
        })
    }
    $scope.update = function(EvaluationClerk) {
            var modalInstance = $uibModal.open({
                templateUrl: 'UpdateEvaluationClerk.html',
                controller: 'UpdateEvaluationClerkController',
                resolve: {
                    EvaluationClerk: function() {
                        return EvaluationClerk;
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
        //删除
    $scope.remove = function(EvaluationClerk) {
        var params = {
            userId: EvaluationClerk.user_id,
            teacherId: EvaluationClerk.teacher_id
        };
        restful.fetch("/teacher/remove", "POST", params).then(function(res) {
            if (res.success) {
                $scope.query();
            }
        });
    };

});


//添加
App.controller("AddEvaluationClerkController", function($scope, $rootScope, $q, $uibModalInstance, restful, AreaSelector, toastr) {
    //获取项目
    restful.fetch("/item/getItemListInfo").then(function(res) {
        $scope.projects = res.data;
        console.log(res);
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
    $scope.isLoading = false;
    $scope.data = {
        userInfo: {},
        teacherInfo: {},
        addressInfo: [{
            Address: "",
            IsDefault: false
        }, {
            Address: "",
            IsDefault: false
        }, {
            Address: "",
            IsDefault: false
        }, {
            Address: "",
            IsDefault: false
        }, {
            Address: "",
            IsDefault: false
        }]
    };
    $scope.save = function() {
        if (!$scope.data.addressInfo[$scope.data.defaultAddressIndex] ||
            !$scope.data.addressInfo[$scope.data.defaultAddressIndex].Address) {
            toastr.error('默认地址不能为空');
            return
        }
        $scope.data.addressInfo[$scope.data.defaultAddressIndex].IsDefault = true;

        console.info($scope.data);
        restful.fetch("/teacher/add", "POST", $scope.data).then(function(res) {
            console.info(res);
            if (res.success) {
                $uibModalInstance.dismiss('success');
            } else {
                $scope.error = res.msg;
            }
        });
    };
    $scope.close = function() {
        $uibModalInstance.close('close');
    };

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
        $scope.endDatepickerOptions.minDate = moment($scope.data.teacherInfo.issue_date * 1000).add(1, "days");
    }
    $scope.updateBeginDate = function() {
        $scope.beginDatepickerOptions.maxDate = moment($scope.data.teacherInfo.valid_date * 1000).subtract(1, "days");
    }

});

//修改
App.controller("UpdateEvaluationClerkController", function($scope, $uibModalInstance, $q, EvaluationClerk, restful, AreaSelector, toastr) {
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
    $scope.isLoading = false;
    //当前的用户信息
    $scope.EvaluationClerk = angular.copy(EvaluationClerk);
    //获取其他地址
    angular.forEach($scope.EvaluationClerk.evaluatoraddresses, function(val, index) {
        if (val.IsDefault) {
            $scope.EvaluationClerk.defaultAddressIndex = index;
        }
    });
    $scope.EvaluationClerk.userInfo.pro_code = Math.floor($scope.EvaluationClerk.evaluationlocation.city_code / 100);
    $scope.EvaluationClerk.userInfo.city_code = $scope.EvaluationClerk.evaluationlocation.city_code;
    $scope.EvaluationClerk.teacherInfo = {
        teacher_id: $scope.EvaluationClerk.teacher_id,
        teacher_bankcard: $scope.EvaluationClerk.teacher_bankcard,
        teacher_devidepercent: $scope.EvaluationClerk.teacher_devidepercent,
        el_id: $scope.EvaluationClerk.el_id,
        evaluator_number: $scope.EvaluationClerk.evaluator_number,
        teacher_number: $scope.EvaluationClerk.teacher_number
    }
    $scope.issue_date = angular.copy($scope.EvaluationClerk.issue_date) * 1000;
    $scope.valid_date = angular.copy($scope.EvaluationClerk.valid_date) * 1000;

    $scope.save = function() {
        if (!$scope.EvaluationClerk.evaluatoraddresses[$scope.EvaluationClerk.defaultAddressIndex] ||
            !$scope.EvaluationClerk.evaluatoraddresses[$scope.EvaluationClerk.defaultAddressIndex].Address) {
            toastr.error('默认地址不能为空');
            return
        }
        angular.forEach($scope.EvaluationClerk.evaluatoraddresses, function(val, index) {
            val.UserId = $scope.EvaluationClerk.user_id;
            if (index == $scope.EvaluationClerk.defaultAddressIndex) {
                val.IsDefault = true;

            } else {
                val.IsDefault = false;
            }
        });
        $scope.EvaluationClerk.teacherInfo.issue_date = angular.copy($scope.issue_date) / 1000;
        $scope.EvaluationClerk.teacherInfo.valid_date = angular.copy($scope.valid_date) / 1000;

        var params = {
            userInfo: $scope.EvaluationClerk.userInfo,
            teacherInfo: {
                teacher_id: $scope.EvaluationClerk.teacher_id,
                teacher_bankcard: $scope.EvaluationClerk.teacher_bankcard,
                teacher_devidepercent: $scope.EvaluationClerk.teacher_devidepercent,
                el_id: $scope.EvaluationClerk.el_id,
                evaluator_number: $scope.EvaluationClerk.evaluator_number,
                teacher_number: $scope.EvaluationClerk.teacher_number,
                teacher_item: $scope.EvaluationClerk.teacher_item,
                teacher_level: $scope.EvaluationClerk.teacher_level
            },
            addressInfo: $scope.EvaluationClerk.evaluatoraddresses
        }
        console.info(params);
        restful.fetch("/teacher/update", "POST", params).then(function(res) {
            console.log(params.teacherInfo);
            console.log($scope.EvaluationClerk.teacher_item);
            console.log($scope.EvaluationClerk.teacher_level);
            if (res.success) {
                $uibModalInstance.dismiss('success');
            } else {
                $scope.error = res.msg;
            }
        });
    };
    $scope.close = function() {
        $uibModalInstance.close('close');
    };

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
        $scope.endDatepickerOptions.minDate = moment($scope.issue_date).add(1, "days");
    }
    $scope.updateBeginDate = function() {
        $scope.beginDatepickerOptions.maxDate = moment($scope.valid_date).subtract(1, "days");
    }

});
