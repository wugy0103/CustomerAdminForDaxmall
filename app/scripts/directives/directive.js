/*
 * @Author: 唐文雍
 * @Date:   2016-04-20 22:10:28
 * @Last Modified by:   wugy
 * @Last Modified time: 2016-07-11 17:51:16
 */

'use strict';
App.directive('percentage', function() {
  //百分比
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ctrl) {
      ctrl.$formatters.push(function(modelValue) {
        return parseFloat((modelValue * 100).toFixed(2));
      });
      ctrl.$parsers.push(function(viewValue) {
        return (viewValue / 100).toFixed(4);
      });
    }
  };
});
<<<<<<< HEAD
App.directive('dateToTimestamp',function(){
    //日期转为时间戳
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ctrl){
            ctrl.$parsers.push(function(viewValue){
                return Math.floor(new Date(viewValue).getTime()/1000);
            })
        }
    }
});
App.directive('dateToTimestampPlus',function(){
    //给短时间戳加1天的秒数(86400)
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ctrl){
            ctrl.$parsers.push(function(viewValue){
                return Math.floor(new Date(viewValue).getTime()/1000)+86400;
            })
        }
=======
App.directive('dateToTimestamp', function() {
  //日期转为短时间戳
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ctrl) {
      ctrl.$parsers.push(function(viewValue) {
        return Math.floor(new Date(viewValue).getTime() / 1000);
      })
>>>>>>> c7ae6eb8cea2d6bcfa4576f368761ab07625663b
    }
  }
});
<<<<<<< HEAD
App.directive('datetimeTransform', function($filter, $timeout){
    //时间戳和时间互转
    return {
        restrict: 'A',
        require: 'ngModel',
        scope:{
            format: '@'
        },
        link: function(scope, element, attr, ctrl){
            var datetimeFormat = scope.format;
            ctrl.$formatters.push(function (modelValue){
                var datetime = isNaN(modelValue) ? modelValue : new Date(modelValue);
                return $filter('date')(datetime, datetimeFormat);
            });
            ctrl.$parsers.push(function (viewValue){
                var datetime = new Date(viewValue).getTime();
                return datetime;
            });
        }
    }
});

=======
App.directive('datetimeTransform', ['$filter', '$timeout', function($filter, $timeout) {
  //时间戳和时间互转
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      format: '@'
    },
    link: function(scope, element, attr, ctrl) {
      var datetimeFormat = scope.format;
      ctrl.$formatters.push(function(modelValue) {
        var datetime = isNaN(modelValue) ? modelValue : new Date(modelValue);
        return $filter('date')(datetime, datetimeFormat);
      });
      ctrl.$parsers.push(function(viewValue) {
        var datetime = new Date(viewValue).getTime();
        return datetime;
      });
    }
  }
}]);
>>>>>>> c7ae6eb8cea2d6bcfa4576f368761ab07625663b
App.directive('stringToNumber', function() {
  //字符串转数字
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      ctrl.$formatters.push(function(modelValue) {
        return parseFloat(modelValue, 10);
      });
      ctrl.$parsers.push(function(viewValue) {
        return '' + viewValue;
      });
    }
  };
});
App.directive('lowerThan', function() {
  //inpuit a要小于某个值
  var link = function($scope, $element, $attrs, ctrl) {

    var validate = function(viewValue) {
      var comparisonModel = $attrs.lowerThan;

      if (!viewValue || !comparisonModel) {
        // It's valid because we have nothing to compare against
        ctrl.$setValidity('lowerThan', true);
      }

      if (!viewValue && !comparisonModel) {
        //NaN，可留空
        ctrl.$setValidity('lowerThan', true);
      } else {
        // It's valid if model is lower than the model we're comparing against
        ctrl.$setValidity('lowerThan', parseInt(viewValue, 10) < parseInt(comparisonModel, 10));
      }
      return viewValue;
    };

    ctrl.$parsers.unshift(validate);
    ctrl.$formatters.push(validate);

    $attrs.$observe('lowerThan', function(comparisonModel) {
      return validate(ctrl.$viewValue);
    });

  };

<<<<<<< HEAD
    return {
        require: 'ngModel',
        link: link
    };
=======
  return {
    require: 'ngModel',
    link: link
  };

>>>>>>> c7ae6eb8cea2d6bcfa4576f368761ab07625663b
});
App.directive('focusOnFirstInvalidInput', function() {
  //提交表单时，如有验证不通过的表单即将焦点定在第一个invalid input
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.on('submit', function() {
        var firstInvalid = element[0].querySelector('.ng-invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      });
    }
  };
});
<<<<<<< HEAD
App.directive('setClassWhenAtTop', function($window) {
    //当某个元素滚动到顶部时，设置class, 用法如 set-class-when-at-top="fix-to-top"
    var $win = angular.element($window);
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            var topClass = attr.setClassWhenAtTop,
                offsetTop = element.offset().top;
            $win.on('scroll', function(e) {
                if ($win.scrollTop() >= offsetTop) {
                    element.addClass(topClass);
                } else {
                    element.removeClass(topClass);
                }
            });
        }
    };
});
App.directive('ignoreMouseWheel', function($rootScope) {
    //禁用鼠标滚动，用在type=number的标签上
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            element.bind('mousewheel', function(event) {
                element.blur();
            });
        }
    }
});
App.directive('activeLink', function($location) {
    //路由改变时，给菜单栏 对应的链接父元素加上active
    return {
        restrict: 'A',
        replace: false,
        link: function(scope, elem) {
            scope.$on("$stateChangeStart", function() {
                var hrefs = ['/#' + $location.path(),
                    '#' + $location.path(), //html5: false
                    $location.path()
                ]; //html5: true
                angular.forEach(elem.find('a'), function(a) {
                    a = angular.element(a);
                    if (-1 !== hrefs.indexOf(a.attr('href'))) {
                        a.parent().addClass('active');
                    } else {
                        a.parent().removeClass('active');
                    };
                });
            });
        }
    }
});
=======
App.directive('setClassWhenAtTop', ['$window', function($window) {
  //当某个元素滚动到顶部时，设置class, 用法如 set-class-when-at-top="fix-to-top"
  var $win = angular.element($window);
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      var topClass = attr.setClassWhenAtTop,
        offsetTop = element.offset().top;
      $win.on('scroll', function(e) {
        if ($win.scrollTop() >= offsetTop) {
          element.addClass(topClass);
        } else {
          element.removeClass(topClass);
        }
      });
    }
  };
}]);
App.directive('ignoreMouseWheel', ['$rootScope', function($rootScope) {
  //禁用鼠标滚动，用在type=number的标签上
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      element.bind('mousewheel', function(event) {
        element.blur();
      });
    }
  }
}]);
App.directive('activeLink', ['$location', function($location) {
  //路由改变时，给菜单栏 对应的链接父元素加上active
  return {
    restrict: 'A',
    replace: false,
    link: function(scope, elem) {
      scope.$on("$stateChangeStart", function() {
        var hrefs = ['/#' + $location.path(),
          '#' + $location.path(), //html5: false
          $location.path()
        ]; //html5: true
        angular.forEach(elem.find('a'), function(a) {
          a = angular.element(a);
          if (-1 !== hrefs.indexOf(a.attr('href'))) {
            a.parent().addClass('active');
          } else {
            a.parent().removeClass('active');
          };
        });
      });
    }
  }
}]);
>>>>>>> c7ae6eb8cea2d6bcfa4576f368761ab07625663b
App.directive('ngEnter', function() {
  //回车键，ng-enter='doSomething()'
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if (event.which === 13) {
        scope.$apply(function() {
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
});
<<<<<<< HEAD
App.directive('imageViewer', function($window) {
    //图片查看器, 依赖viewer.js插件
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var Viewer = $window.Viewer;
            var options = {
                navbar: false,
                zoomRatio: 0.3,
                show: function(e) {
                    //本身viewer部分的html是追加在目标img后面，不能全屏浏览，暂时办法为：移动viewer html到body
                    $("body").append($(".viewer-container"));
=======
App.directive('imageViewer', ['$window', function($window) {
  //图片查看器, 依赖viewer.js插件
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var Viewer = $window.Viewer;
      var options = {
        navbar: false,
        zoomRatio: 0.3,
        show: function(e) {
          //本身viewer部分的html是追加在目标img后面，不能全屏浏览，暂时办法为：移动viewer html到body
          $("body").append($(".viewer-container"));
>>>>>>> c7ae6eb8cea2d6bcfa4576f368761ab07625663b

          //暂时不需要以下这些按钮，所以去掉
          $(".viewer-container .viewer-prev,.viewer-play,.viewer-next,.viewer-reset,.viewer-flip-horizontal,.viewer-flip-vertical").remove();

<<<<<<< HEAD
                    var viewerCanvas = $(".viewer-canvas");
                    viewerCanvas.on('mousedown', function(evt) {
                        viewerCanvas.on('mouseup mousemove', function handler(evt) {
                            console.info(evt.type);
                            if (evt.type === 'mouseup') {
                                // 点击，关闭
                                viewer.hide();
                            } else {
                                // 拖拽
                            }
                            viewerCanvas.off('mouseup mousemove', handler);
                        });
                    });
                }
            };
            var dom = $(element).context;
            var viewer = new Viewer(dom, options);
        },
    };
});
App.directive('toggleMenu', function() {
    //左侧菜单伸缩
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.click(function() {
                $(this).parent().children('ul.tree').toggle(200);
                $(this).children('i.pull-right').toggleClass('fa-angle-right fa-angle-down');
=======
          var viewerCanvas = $(".viewer-canvas");
          viewerCanvas.on('mousedown', function(evt) {
            viewerCanvas.on('mouseup mousemove', function handler(evt) {
              console.info(evt.type);
              if (evt.type === 'mouseup') {
                // 点击，关闭
                viewer.hide();
              } else {
                // 拖拽
              }
              viewerCanvas.off('mouseup mousemove', handler);
>>>>>>> c7ae6eb8cea2d6bcfa4576f368761ab07625663b
            });
          });
        }
      };
      var dom = $(element).context;
      var viewer = new Viewer(dom, options);
    },
  };
}]);
App.directive('toggleMenu', function() {
  //左侧菜单伸缩
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.click(function() {
        $(this).parent().children('ul.tree').toggle(200);
        $(this).children('i.pull-right').toggleClass('fa-angle-right fa-angle-down');
      });
    }
  }
});
App.directive('booleanToNumber', function() {
  //布尔值转数字，数字转布尔值
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ctrl) {
      ctrl.$formatters.push(function(modelValue) {
        return modelValue === 1 ? true : false;
      });
      ctrl.$parsers.push(function(viewValue) {
        return viewValue === true ? 1 : 0;
      });
    }
  };
});
<<<<<<< HEAD
App.directive('hideParent', function($timeout){
    //当子元素的内容为空时，隐藏父元素，本项目用在侧栏菜单
    return {
        restrict: 'A',
        link: function(scope, element, attr, ctrl){
            $timeout(function(){
                var childLength = element.find(attr.hideParent+":first").children().length;
                if(!childLength){
                    element.hide();
                }else{
                    element.show();
                }
            });
=======
App.directive('hideParent', ['$timeout', function($timeout) {
  //当子元素的内容为空时，隐藏父元素，本项目用在侧栏菜单
  return {
    restrict: 'A',
    link: function(scope, element, attr, ctrl) {
      $timeout(function() {
        var childLength = element.find(attr.hideParent + ":first").children().length;
        if (!childLength) {
          element.hide();
        } else {
          element.show();
>>>>>>> c7ae6eb8cea2d6bcfa4576f368761ab07625663b
        }
      });
    }
<<<<<<< HEAD
});
App.directive('evaluationPointSelector', function(AreaSelector, restful){
    //考评点选择器
    var link = function($scope, $ele, $attr, $ctrl){
        var areaResourceUri = '/common/getCityInfo';
        var schoolResourceUri = '/common/getSchoolByCityAndSchoolType';
        var schoolTypeResourceUri = '/common/getSchoolType';
        var pointResourceUri = '/common/getEvaluationLocation';
        $scope.address = {
            provinceandcity: $scope.provinceandcity,
            province: $scope.province,
            city: $scope.city,
            schooltype: $scope.schooltype,
            school: $scope.school,
            point: $scope.point
        };
        AreaSelector.getProvinces(areaResourceUri).then(function(areas) {
            //获取省份
            $scope.provinces = areas;
        });

        $scope.getcities = function(province){
            AreaSelector.getCitiesByProvinceCode(areaResourceUri, province).then(function(res) {
                $scope.cities = res;
            });
        };
        $scope.initCity = function(province) {
            if (!province) {
                return;
            }
            $scope.getcities(province);
            $scope.address.city = null;
            $scope.address.schooltype = null;
            $scope.address.school = null;
            $scope.address.point = null;
            $scope.schoolTypes = null;
            $scope.schools = null;
            $scope.points = null;
            AreaSelector.getNameByCode(areaResourceUri, province.city_code).then(function(res) {
                $scope.address.provinceName = res;
            });
        };
        $scope.getSchoolTypes = function() {
            restful.fetch(schoolTypeResourceUri, "GET").then(function(res) {
                if (res.success) {
                    $scope.schoolTypes = res.data;
                }
            });
        }
        $scope.initSchoolType = function() {
            $scope.getSchoolTypes();
            $scope.address.schooltype = null;
            $scope.address.school = null;
            $scope.address.point = null;
            $scope.schools = null;
            $scope.points = null;
            AreaSelector.getNameByCode(areaResourceUri, $scope.address.city).then(function(res) {
                $scope.address.cityName = res;
            });
        };
        $scope.getSchools = function() {
            var params = {
                city_code: $scope.address.city,
                school_typeid: $scope.address.schooltype===0?null:$scope.address.schooltype
            }
            restful.fetch(schoolResourceUri, "GET", params).then(function(res) {
                if (res.success) {
                    $scope.schools = res.data;
                }
            });
        }
        $scope.initSchool = function() {
            $scope.getSchools();
            $scope.address.school = null;
            $scope.address.point = null;
            $scope.points = null;
        };
        $scope.getLocations = function() {
            var params = {
                city_code: $scope.address.city,
                school_code: $scope.address.school
            }
            restful.fetch(pointResourceUri, "GET", params).then(function(res) {
                if (res.success) {
                    $scope.points = res.data;
                }
            });
        }
        $scope.initPoint = function() {
            $scope.getLocations();
            $scope.address.point = null;
        };
        $scope.$watch('address', function(newValue, oldValue) {
            if ($scope.address.provinceName && $scope.address.cityName) {
                $scope.address.provinceandcity = $scope.address.provinceName + "|" + $scope.address.cityName;
            }
            $scope.address.province&&$scope.getcities($scope.address.province);
            if($scope.address.schooltype||$scope.address.schooltype===0){
                $scope.getSchoolTypes();
            }
            $scope.address.school&&$scope.getSchools();
            $scope.address.point&&$scope.getLocations();
            $scope.provinceandcity = $scope.address.provinceandcity; 
            $scope.province = $scope.address.province; 
            $scope.city = $scope.address.city; 
            $scope.schooltype = $scope.address.schooltype; 
            $scope.school = $scope.address.school; 
            $scope.point = $scope.address.point; 
        }, true);
    };
    return{
        scope: {
            provinceandcity: '=',
            province: '=',
            city: '=',
            schooltype: '=',
            school: '=',
            point: '='
        },
        link: link,
        templateUrl: 'app/scripts/directives/template/EvaluationPointSelector.html'
=======
  }
}]);
App.directive('goBack', ['$window', function($window) {
  //后退一个页面
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      element.on('click', function() {
        $window.history.back();
      });
    }
  }
}]);
App.directive('upImg', function() {
  /*上传图片说明：lrz(file, [options]);
   * options参数
   * width {Number} 图片最大不超过的宽度，默认为原图宽度，高度不设时会适应宽度。
   * height {Number} 同上
   * quality {Number} 图片压缩质量，取值 0 - 1，默认为0.7
   * fieldName {String} 后端接收的字段名，默认：file*/
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      element.on('change', function() {
        element.next("img").remove();
        console.log("上传图片按钮");
        lrz(this.files[0])
          .then(function(rst) {
            // 处理成功会执行
            console.log(rst);
            var img = new Image();
            scope.rst = rst;
            img.src = rst.base64;
            img.width = 60;
            img.height = 60;
            img.onload = function() {
              element.after(img);
            };
          })
          .catch(function(err) {
            // 处理失败会执行
            console.log("失败");
          })
          .always(function() {
            // 不管是成功失败，都会执行
          });
      });
>>>>>>> c7ae6eb8cea2d6bcfa4576f368761ab07625663b
    }
  }
});
App.directive('imageUploader', function($rootScope, $q, restful, toastr){
    //图片上传器，依赖naif.base64模块
    var link = function($scope, $ele, $attr, $ctrl){
        $scope.label = $attr.label;
        $scope.getImageInfo = function(file, base64) {
            var deferred = $q.defer();
            var type = base64.filetype;
            var code = base64.base64;
            var size = base64.filesize;
            var name = base64.filename;
            var src = "data:" + type + ";base64," + code;
            var img = new Image();
            img.src = src;
            if (!$rootScope.PATTERN_CONFIG.IMG.test(name)) {
                toastr.error("请上传图片文件！");
                deferred.reject();
            }
            img.onload = function() {
                var imageInfo = {
                    dimension: {
                        width: img.width,
                        height: img.height
                    },
                    base64: code,
                    base64Str: src,
                    filetype: type,
                    filesize: size,
                    filename: name
                }
                deferred.resolve(imageInfo);
            }

<<<<<<< HEAD
            return deferred.promise;
        };
        $scope.$watch('image', function(newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.isLoading = true;
                var params = {
                    base64Str: newValue.base64Str,
                    type: newValue.filetype,
                    xy: {
                        width: newValue.dimension.width,
                        height: newValue.dimension.height
                    },
                    size: newValue.filesize,
                    name: newValue.filename
                };
                restful.fetch("/common/uploadImg", "POST", params).then(function(res) {
                    if (res.success) {
                        var image = res.msg;
                        $scope.src = image;
                    } else {
                        $scope.uploadError = res.msg;
                    }
                }, function(rej) {
                    toastr.error('上传失败！', 'Error');
                }).finally(function() {
                    $scope.isLoading = false;
                });
            }
        }, true);
    };
    return{
        scope: {
            src: '=',
            placeholder: '@'
        },
        link: link,
        templateUrl: 'app/scripts/directives/template/ImageUploader.html'
    }
});
=======
App.directive('line', ['$interval', function($interval) {
  return {
    scope: {
      id: "@",
      legend: "=",
      item: "=",
      data: "=",
      type: "="
    },
    restrict: 'EA',
    template: '<div style="height:400px;width:1000px"></div>',
    replace: true,
    link: function($scope, element, attrs, controller) {
      element.width($(window).width() * 0.80);
      var option = {
        // 提示框，鼠标悬浮交互时的信息提示
        tooltip: {
          show: true,
          trigger: 'item'
        },
        //工具
        toolbox: {
          show: true,
          right: '10%',
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {
              readOnly: false
            },
            magicType: {
              type: ['line', 'bar']
            },
            restore: {},
            saveAsImage: {}
          }
        },
        // 图例
        legend: {
          data: $scope.legend
        },
        // 横轴坐标轴
        xAxis: [{
          type: 'category',
          data: $scope.item
        }],
        // 纵轴坐标轴
        yAxis: [{
          type: 'value'
        }],
        // 数据内容数组
        series: function() {
          var serie = [];
          for (var i = 0; i < $scope.legend.length; i++) {
            var item = {
              name: $scope.legend[i],
              type: $scope.type,
              data: $scope.data[i]
            };
            serie.push(item);
          }
          console.log($scope.type);
          return serie;
        }()
      };
      var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
      myChart.showLoading();
      //模拟数据载入过程
      var time = 1;
      var timer = $interval(function() {
        time--;
        if (time <= 0) {
          $interval.cancel(timer);
          console.log("数据载入成功");
          myChart.hideLoading();
          myChart.setOption(option);
        }
      }, 1000);
    }
  };
}]);
>>>>>>> c7ae6eb8cea2d6bcfa4576f368761ab07625663b
