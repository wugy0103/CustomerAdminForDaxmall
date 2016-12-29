/*
 * @Author: 唐文雍
 * @Date:   2016-04-17 11:51:44
 * @Last Modified by:   wugy
 * @Last Modified time: 2016-11-18 17:39:31
 */
'use strict';
angular.module("AdminService", [])
    .factory("restful", function($http) {
        var promise;
        return {
            get: function(resource, _id) {
                promise = $http.get(resource + _id + '/').then(function(response) {
                    return response.data;
                });
                return promise;
            },
            query: function(resource, params) { //查询
                params = (typeof params) !== 'undefined' ? params : {}; //params 请求参数，将在URL上被拼接成？key=value

                promise = $http({ url: resource, method: "GET", params: params })
                    .then(function(response) {
                        return response.data;
                    });
                return promise;
            },
            remove: function(resource, _id) {
                promise = $http({ url: resource + _id + '/?type=all', method: "DELETE" })
                    .then(function(response) {
                        return response.data;
                    });
                return promise;
            },
            update: function(resource, _id, data) { //更新
                promise = $http({ url: resource + _id + '/', method: "PATCH", data: data }) //  数据，将被放入请求内发送至服务器
                    .then(function(response) {
                        return response.data;
                    });
                return promise;
            },
            save: function(resource, data) {
                promise = $http({ url: resource, method: "POST", data: data })
                    .then(function(response) {
                        return response.data;
                    });
                return promise;
            },
            fetch: function(resource, method, params) {
                var setMethod = typeof(method) == "undefined" ? "GET" : method;
                var paramsObj = method == "POST" ? {} : params;
                var config = {
                    url: resource,
                    method: setMethod,
                    data: params,
                    params: paramsObj
                };
                //console.log(config);
                promise = $http(config)
                    .then(function(response) {
                        //console.log(response);
                        return response.data;
                    });
                return promise;
            }
        };
    })
    .factory('AuthService', ['$http', 'Session', '$rootScope', function($http, Session, $rootScope) {
        var authService = {};
        authService.login = function(credentials) {
            //登录，成功后返回用户名
            return $http
                .get($rootScope.api.login, credentials)
                .then(function(res) {
                    console.log("login", res.data)
                    if (res.data.code == 2000) {
                        Session.create(res.data.data.userName, res.data.data.accessToken);
                        //开发者模式
                        $rootScope.developerMode = "?accessToken=" + Session.$storage.accessToken;
                        //集成环境
                        //$rootScope.developerMode="";
                    }
                    return res.data;
                });
        };

        authService.isAuthenticated = function() {
            //是否登录，返回true或者false
            return !!Session.$storage.userName;
        };

        authService.isAuthorized = function(nextRoute) {
            //是否有权限，返回true或者false
            var refuseRoute = Session.$storage.refuseRoute;
            if (refuseRoute) {
                return (authService.isAuthenticated() && refuseRoute.indexOf(nextRoute) == -1);
            } else {
                return authService.isAuthenticated();
            }

        };
        return authService;
    }])
    .service('Session', ['$sessionStorage', function($sessionStorage) {
        this.$storage = $sessionStorage;
        this.create = function(userName, accessToken, refuseRoute) {
            this.$storage.userName = userName;
            this.$storage.accessToken = accessToken;
            this.$storage.refuseRoute = refuseRoute;

        };
        this.destroy = function() {
            delete this.$storage.userName;
            delete this.$storage.accessToken;
            delete this.$storage.refuseRoute;
        };
        return this;
    }])
    .factory('AuthInterceptor', ['$injector', '$q', function($injector, $q) {
        // http拦截器
        return {
            response: function(response) {
                var errorNum = response.data.status;
                if (errorNum == 401 || errorNum == 403 || errorNum == 417) {
                    // 401 未登陆
                    // 403 已登录但拒绝访问
                    // 417 登陆超时，session过期
                    // 暂时全部跳转到登录界面
                    $injector.get('$state').go("login");
                }
                return $q.resolve(response);
            }
        };
    }])
    .factory('msgBus', ['$rootScope', function($rootScope) {
        //供controller之间通讯，用法参考login页面和header
        var msgBus = {};
        msgBus.emitMsg = function(msg) {
            $rootScope.$emit(msg);
        };
        msgBus.onMsg = function(msg, scope, func) {
            var unbind = $rootScope.$on(msg, func);
            scope.$on('$destroy', unbind);
        };
        return msgBus;
    }])
    .factory('lifeHouseAreaSelector', ['$http', '$localStorage', '$q', '$rootScope', function($http, $localStorage, $q, $rootScope) {
        //生活馆省市联动
        var selector = {
            getProvinces: function() {
                //获取所有省份
                return $http({ url: $rootScope.api.getProvinces, method: "get" }).then(function(response) {
                    console.log("getProvinces", response.data.data);
                    return response.data.data;
                });
            },
            getCitys: function(params) {
                //获取所有市
                return $http({ url: $rootScope.api.getArea + params + $rootScope.developerMode, method: "get" }).then(function(response) {
                    console.log("获取所有市地址", $rootScope.api.getArea + params + $rootScope.developerMode);
                    console.log("getCitys", response.data.data);
                    return response.data.data;
                });
            },
            getCountys: function(params) {
                //获取所有县
                return $http({ url: $rootScope.api.getArea + params + $rootScope.developerMode, method: "get" }).then(function(response) {
                    console.log("获取所有区地址", $rootScope.api.getArea + params + $rootScope.developerMode);
                    console.log("getCountys", response.data.data);
                    return response.data.data;
                });
            },
            getLifeHouse: function(params) {
                //获取数字名
                return $http({ url: $rootScope.api.getLifeHouse + params + $rootScope.developerMode, method: "get" }).then(function(response) {
                    console.log("进行生活馆请求，请求地址为", $rootScope.api.getLifeHouse + params + $rootScope.developerMode);
                    console.log("getLifeHouse", response.data);
                    return response.data.data;
                });
            }
        };
        return selector;
    }])
    .factory('ImageInfo', ['$q', function($q) {
        //获取file image 的信息，依赖angular-base64-upload
        var deferred = $q.defer();
        var info = {
            getInfo: function(base64, key) {
                this._getInfoByKey(base64, key).then(function(imageInfo) {
                    if (imageInfo) {
                        deferred.resolve(imageInfo);
                    }
                });
                return deferred.promise;
            },
            _getInfoByKey: function(base64, key) {
                var d = $q.defer();
                var type = base64.filetype;
                var code = base64.base64;
                var size = base64.filesize;
                var name = base64.filename;
                var src = "data:" + type + ";base64," + code;

                var img = new Image();
                img.src = src;
                img.onload = function() {
                    var imageInfos = {
                        dimension: {
                            width: img.width,
                            height: img.height
                        },
                        width: img.width,
                        height: img.height,
                        base64: code,
                        base64Str: src,
                        filetype: type,
                        filesize: size,
                        filename: name,
                    }
                    if (key) {
                        d.resolve(imageInfos[key]);
                    } else {
                        d.resolve(imageInfos);
                    }
                }
                return d.promise;
            }
        };
        return info;
    }]).factory('AuthServiceTest', ['$http', 'Session', '$rootScope', function($http, Session, $rootScope) {
        var authService = {};
        authService.login = function(credentials) {
            //登录，成功后返回用户名

            return $http
                .post($rootScope.api.login, credentials)
                .then(function(res) {
                    console.log("login", res.data)
                    if (res.data.code == 2000) {
                        Session.create(res.data.userName, res.data.data);
                    }
                    return res.data;
                });
        };
        authService.isAuthenticated = function() {
            //是否登录，返回true或者false
            return !!Session.$storage.userName;
        };

        authService.isAuthorized = function(nextRoute) {
            //是否有权限，返回true或者false
            var refuseRoute = Session.$storage.refuseRoute;
            if (refuseRoute) {
                return (authService.isAuthenticated() && refuseRoute.indexOf(nextRoute) == -1);
            } else {
                return authService.isAuthenticated();
            }

        };
        return authService;
    }]);
/*.config(function($httpProvider) {
        //解决angularjs-post提交为json时候，改为form data
        $httpProvider.defaults.transformRequest = function(obj) {
            var str = [];
            for(var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        }
        $httpProvider.defaults.headers.post = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })*/
