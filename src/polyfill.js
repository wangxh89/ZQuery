    /**************** polyfill ***************/
    
    /**
     * @description Object.assign()
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
     */
    if (typeof Object.assign != 'function') {
        (function () {
            Object.assign = function (target) {
                'use strict';
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }
        
                var output = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (source !== undefined && source !== null) {
                        for (var nextKey in source) {
                            if (source.hasOwnProperty(nextKey)) {
                                output[nextKey] = source[nextKey];
                            }
                        }
                    }
                }
              return output;
            };
        })();
    }


    /**
     * description
     * refer to [https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm]
     */
    deepClone = function(obj) {
        var rst = obj,
            Constructor;
        
        if (obj instanceof Object) {
            Constructor = obj.constructor;
            switch (Constructor) {
                case RegExp:
                    rst = new Constructor(obj);
                    break;
                case Date:
                    rst = new Constructor(obj.getTime());
                    break;
                default:
                    rst = new Constructor();
            }
            
            for (var prop in obj) {
                rst[prop] = zQuery.deepClone(obj[prop]);
            }
        }
        
        return rst;
    }
    ;


    /**
     * @description Merge two arrays.
     * TODO: distinct?
     */
    zQuery.merge = function(arr1, arr2) {
        var
        len = arr1.length;

        for(var i = 0; i < arr2.length; i++) {
            arr1[i + len] = arr2[i++];
        }
        
        return arr1;
    }
    ;
    
    /**
     * @description perform shallow or deep cloning.
     * @param {boolean} [ifDeep=false]
     * @param {object} obj
     */
    zQuery.clone = function(ifDeep, obj) {
        var
        idx = 0;
        _deep = false,
        _obj;
        
        if (arguments.length <= 0) return null;
        
        if (typeof arguments[idx] === "boolean") {
            _deep = arguments[idx++];
        } else {
            if (!(_obj = arguments[idx])) {
                return null;
            }
        }
        
        if (_deep) {
            zQuery.shallowClone(_obj);
        } else {
            zQuery.deepClone(_obj);
        }
    }
    
    zQuery.extend = function(ifDeep, target, obj) {
        var
        idx = 0,
        _deep = false,
        _target = this;
        
        if (arguments.length <= 0) {
            return _target;
        }
        
        if (typeof arguments[idx] === "boolean") {
            _deep = arguments[idx++];
        }
        
        if (idx >= arguments.length || !arguments[idx]) {
            return _target;
        }
        
        for (; idx < arguments.length; idx++) {
            var o = arguments[i];
            if (o == null || o == undefined) continue;
            
            if (Array.isArray(o)) {
                for(var i=0; i<o.length; i++) {
                    _target[i] = zQuery.clone(_deep, o[i]);
                }
            } else {
                for (var prop in o) {
                    _target[i] = zQuery.clone(_deep, o[prop]);
                }
            }
        }
        
        return _target;
    }
    ;        