/*
 * @Author: wuguoyuan
 * @Date:   2016-11-10 11:23:56
 * @Last Modified by:   wuguoyuan
 * @Last Modified time: 2016-11-21 16:24:51
 */

'use strict';
App.controller("orderManageController", function ($scope, ngProgressFactory, restful, $rootScope, Session, $uibModal, toastr) {
  $scope.progressbar = ngProgressFactory.createInstance();
  $scope.data = {subType: "N"};
  $scope.orderClass = [{
    stauts: "正常订单",
    status_id: "N"
  }, {
    stauts: "定金",
    status_id: "D"
  }, {
    stauts: "尾款",
    status_id: "F"
  }];
  //分页
  $scope.PageIndex = $rootScope.PAGINATION_CONFIG.PAGEINDEX;
  $scope.PageSize = $rootScope.PAGINATION_CONFIG.PAGESIZE;
  $scope.maxSize = $rootScope.PAGINATION_CONFIG.MAXSIZE;
  //加载
  $scope.demo = function () {
    var params = {
      PageIndex: parseInt($scope.PageIndex),
      PageSize: parseInt($scope.PageSize),
      condition: angular.copy($scope.data)
    };
    params.condition.reportBegintime = new Date(params.condition.reportBegintime * 1000).setHours("00", "00", "00") / 1000;
    params.condition.reportEndtime = new Date(params.condition.reportEndtime * 1000).setHours("23", "59", "59") / 1000;
    //$scope.ReportPromise = restful.fetch("privatechat/getReportInfo", "POST", params).then(function(res) {
    //$scope.ReportInfoList = res.data;
    //}, function(rej) {
    //    console.info(rej);
    //});
  };
  $scope.demo();
  $scope.show = function (PermissionName) {
    return Session.$storage.accessRoute.indexOf(PermissionName) != -1;
  };
  // //重置
  $scope.reset = function () {
    $scope.data = {state: [0]};
    $scope.PageIndex = 1;
    $scope.toPageNum = 1;
  }
  // //搜索
  $scope.search = function () {
    $scope.query();
  }

  $scope.pageChanged = function () {
    $scope.query();
  };
  $scope.setPage = function () {
    $scope.PageIndex = $scope.toPageNum;
    $scope.query();
  };

  $scope.query = function () {
    $scope.progressbar.start();
    $scope.demo();
    $scope.progressbar.complete();
  }
  //举报内容
  $scope.btReportDetails = function (items) {
    var modalInstance = $uibModal.open({
      templateUrl: 'btReportDetails.html',
      controller: 'ReportControllerFormbtReportDetailsController',
      size: "lg",
      resolve: {
        items: function () {
          return items;
        }
      },
    });
  }
  // 封号 解封操作
  $scope.updateReport = function (ReportInfo, reportFlag, msgFlag) {
    $scope.progressbar.start();
    var params = {
      reportid: ReportInfo.reportid,
      state: reportFlag,
      byreportuser: ReportInfo.byreportuser,
      reportuser: ReportInfo.reportuser,
      isSendIm: msgFlag,
      byreportname: ReportInfo.byreportname,
      reporttype: ReportInfo.reporttype
    };
    $scope.updateReportPromise = restful.fetch("privatechat/updateReport", "POST", params).then(function (res) {
      if (res.success) {
        $scope.demo();
      } else {
        toastr.error('获取数据失败！', res.msg);
      }
    }, function (rej) {
      toastr.error('获取数据失败！', rej);
    });
    $scope.progressbar.complete();

  }
  // 举报不受理操作
  $scope.updateReportForUntreated = function (ReportInfo) {
    $scope.progressbar.start();
    var params = {
      reportid: ReportInfo.reportid,
      reportuser: ReportInfo.reportuser,
      byreportuser: ReportInfo.byreportuser,
      byreportname: ReportInfo.byreportname,
      reporttype: ReportInfo.reporttype
    };
    $scope.updateReportForUntreatedPromise = restful.fetch("privatechat/updateReportForUntreated", "POST", params).then(function (res) {
      if (res.success) {
        $scope.demo();
      } else {
        toastr.error('获取数据失败！', res.msg);
      }
    }, function (rej) {
      toastr.error('获取数据失败！', rej);
    });
    $scope.progressbar.complete();
  }

  //-----------------时间控件 start-----------------------
  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: false,
  };

  $scope.dateOptions = {
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1,
    showWeeks: false
  };

  $scope.toggleMin = function () {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };
  $scope.toggleMin();
  //点击open1的时候
  $scope.open1 = function () {
    $scope.startMonthOpened.opened = true;
  };
  //点击open2的时候
  $scope.open2 = function () {
    $scope.endMonthOpened.opened = true;
  };
  $scope.startMonthOpened = {
    opened: false
  };
  $scope.endMonthOpened = {
    opened: false
  };
  //月份开始
  $scope.setDate = function (year, month, day) {
    $scope.startMonth = new Date(year, month, day);
  };
  //月份结束
  $scope.setDate = function (year, month, day) {
    $scope.endMonth = new Date(year, month, day);
  };
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'yyyy-MM-dd'];
  $scope.format = $scope.formats[4];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    return '';
  }

  //-----------------时间控件  end-----------------------
});
//举报内容
App.controller("ReportControllerFormbtReportDetailsController", function ($scope, $uibModalInstance, items) {
  $scope.items = JSON.parse(items.dialoguecontent);
  $scope.close = function () {
    $uibModalInstance.dismiss('close');
  };
});
