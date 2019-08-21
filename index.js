(function () {
        'use strict';

        console.log('****custom-event****');

        if (typeof window.CustomEvent === 'function' && typeof window.Event === 'function') {
            return false;
        }

        function CustomEvent(event, params) {
            var evt;

            params = params || { bubbles: false, cancelable: false, detail: undefined };
            evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }

        CustomEvent.prototype = window.Event.prototype;

        if (typeof window.CustomEvent !== 'function') {
            window.CustomEvent = CustomEvent;
        }
        if (typeof window.Event !== 'function') {
            window.Event = CustomEvent;
        }
    })();
    (function (Object, GOPS) {
      'use strict';

      console.log('****getOwnPropertySymbols****');

      if (GOPS in Object) return;

      console.log('****getOwnPropertySymbols1****');
      var
        setDescriptor,
        G = typeof global === typeof G ? window : global,
        id = 0,
        random = '' + Math.random(),
        prefix = '__\x01symbol:',
        prefixLength = prefix.length,
        internalSymbol = '__\x01symbol@@' + random,
        DP = 'defineProperty',
        DPies = 'defineProperties',
        GOPN = 'getOwnPropertyNames',
        GOPD = 'getOwnPropertyDescriptor',
        PIE = 'propertyIsEnumerable',
        gOPN = Object[GOPN],
        gOPD = Object[GOPD],
        create = Object.create,
        keys = Object.keys,
        freeze = Object.freeze || Object,
        defineProperty = Object[DP],
        $defineProperties = Object[DPies],
        descriptor = gOPD(Object, GOPN),
        ObjectProto = Object.prototype,
        hOP = ObjectProto.hasOwnProperty,
        pIE = ObjectProto[PIE],
        toString = ObjectProto.toString,
        addInternalIfNeeded = function (o, uid, enumerable) {
          if (!hOP.call(o, internalSymbol)) {
            defineProperty(o, internalSymbol, {
              enumerable: false,
              configurable: false,
              writable: false,
              value: {}
            });
          }
          o[internalSymbol]['@@' + uid] = enumerable;
        },
        createWithSymbols = function (proto, descriptors) {
          var self = create(proto);
          gOPN(descriptors).forEach(function (key) {
            if (propertyIsEnumerable.call(descriptors, key)) {
              $defineProperty(self, key, descriptors[key]);
            }
          });
          return self;
        },
        copyAsNonEnumerable = function (descriptor) {
          var newDescriptor = create(descriptor);
          newDescriptor.enumerable = false;
          return newDescriptor;
        },
        get = function get(){},
        onlyNonSymbols = function (name) {
          return  name != internalSymbol &&
                  !hOP.call(source, name);
        },
        onlySymbols = function (name) {
          return  name != internalSymbol &&
                  hOP.call(source, name);
        },
        propertyIsEnumerable = function propertyIsEnumerable(key) {
          var uid = '' + key;
          return onlySymbols(uid) ? (
            hOP.call(this, uid) &&
            this[internalSymbol]['@@' + uid]
          ) : pIE.call(this, key);
        },
        setAndGetSymbol = function (uid) {
          var descriptor = {
            enumerable: false,
            configurable: true,
            get: get,
            set: function (value) {
              setDescriptor(this, uid, {
                enumerable: false,
                configurable: true,
                writable: true,
                value: value
              });
              addInternalIfNeeded(this, uid, true);
            }
          };
          defineProperty(ObjectProto, uid, descriptor);
          return freeze(source[uid] = defineProperty(
            Object(uid),
            'constructor',
            sourceConstructor
          ));
        },
        Symbol = function Symbol(description) {
          if (this instanceof Symbol) {
            throw new TypeError('Symbol is not a constructor');
          }
          return setAndGetSymbol(
            prefix.concat(description || '', random, ++id)
          );
        },
        source = create(null),
        sourceConstructor = {value: Symbol},
        sourceMap = function (uid) {
          return source[uid];
        },
        $defineProperty = function defineProp(o, key, descriptor) {
          var uid = '' + key;
          if (onlySymbols(uid)) {
            setDescriptor(o, uid, descriptor.enumerable ?
                copyAsNonEnumerable(descriptor) : descriptor);
            addInternalIfNeeded(o, uid, !!descriptor.enumerable);
          } else {
            defineProperty(o, key, descriptor);
          }
          return o;
        },
        $getOwnPropertySymbols = function getOwnPropertySymbols(o) {
          return gOPN(o).filter(onlySymbols).map(sourceMap);
        }
      ;

      descriptor.value = $defineProperty;
      defineProperty(Object, DP, descriptor);

      descriptor.value = $getOwnPropertySymbols;
      defineProperty(Object, GOPS, descriptor);

      var cachedWindowNames = typeof window === 'object' ? Object.getOwnPropertyNames(window) : [];
      var originalObjectGetOwnPropertyNames = Object.getOwnPropertyNames;
      descriptor.value = function getOwnPropertyNames(o) {
        if (toString.call(o) === '[object Window]') {
          try {
            return originalObjectGetOwnPropertyNames(o);
          } catch (e) {
            return [].concat([], cachedWindowNames);
          }
        }
        return gOPN(o).filter(onlyNonSymbols);
      };
      defineProperty(Object, GOPN, descriptor);

      descriptor.value = function defineProperties(o, descriptors) {
        var symbols = $getOwnPropertySymbols(descriptors);
        if (symbols.length) {
          keys(descriptors).concat(symbols).forEach(function (uid) {
            if (propertyIsEnumerable.call(descriptors, uid)) {
              $defineProperty(o, uid, descriptors[uid]);
            }
          });
        } else {
          $defineProperties(o, descriptors);
        }
        return o;
      };
      defineProperty(Object, DPies, descriptor);

      descriptor.value = propertyIsEnumerable;
      defineProperty(ObjectProto, PIE, descriptor);

      descriptor.value = Symbol;
      defineProperty(G, 'Symbol', descriptor);

      descriptor.value = function (key) {
        var uid = prefix.concat(prefix, key, random);
        return uid in ObjectProto ? source[uid] : setAndGetSymbol(uid);
      };
      defineProperty(Symbol, 'for', descriptor);

      descriptor.value = function (symbol) {
        if (onlyNonSymbols(symbol))
          throw new TypeError(symbol + ' is not a symbol');
        if (!hOP.call(source, symbol)) {
          return void 0;
        }
        var label = symbol.slice(prefixLength);
        if (label.slice(0, prefixLength) !== prefix) {
          return void 0;
        }
        label = label.slice(prefixLength);
        if (label === random) {
          return void 0;
        }
        label = label.slice(0, label.length - random.length);
        return label.length > 0 ? label : void 0;
      };
      defineProperty(Symbol, 'keyFor', descriptor);

      descriptor.value = function getOwnPropertyDescriptor(o, key) {
        var descriptor = gOPD(o, key);
        if (descriptor && onlySymbols(key)) {
          descriptor.enumerable = propertyIsEnumerable.call(o, key);
        }
        return descriptor;
      };
      defineProperty(Object, GOPD, descriptor);

      descriptor.value = function (proto, descriptors) {
        return (arguments.length === 1 || typeof descriptors === "undefined") ?
          create(proto) :
          createWithSymbols(proto, descriptors);
      };
      defineProperty(Object, 'create', descriptor);

      descriptor.value = function () {
        var str = toString.call(this);
        return (str === '[object String]' && onlySymbols(this)) ? '[object Symbol]' : str;
      };
      defineProperty(ObjectProto, 'toString', descriptor);

      try {
        if (true === create(
          defineProperty(
            {},
            prefix,
            {
              get: function () {
                return defineProperty(this, prefix, {value: true})[prefix];
              }
            }
          )
        )[prefix]) {
          setDescriptor = defineProperty;
        } else {
          throw 'IE11';
        }
      } catch(o_O) {
        setDescriptor = function (o, key, descriptor) {
          var protoDescriptor = gOPD(ObjectProto, key);
          delete ObjectProto[key];
          defineProperty(o, key, descriptor);
          defineProperty(ObjectProto, key, protoDescriptor);
        };
      }

    }(Object, 'getOwnPropertySymbols'));
