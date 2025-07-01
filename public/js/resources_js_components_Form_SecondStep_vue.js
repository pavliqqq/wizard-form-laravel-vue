"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Form_SecondStep_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Form/SecondStep.vue?vue&type=script&setup=true&lang=js":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Form/SecondStep.vue?vue&type=script&setup=true&lang=js ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _router_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../router.js */ "./resources/js/router.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'SecondStep',
  props: {
    errors: Object
  },
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();
    var showErrors = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)('showErrors');
    var clearErrors = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)('clearErrors');
    var Data = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      id: '',
      company: '',
      position: '',
      about_me: '',
      photo: null
    });
    function fileChange(event) {
      var file = event.target.files[0];
      if (!file) return;
      var maxSizeKb = 500;
      var maxSizeBytes = maxSizeKb * 1024;
      if (file.size > maxSizeBytes) {
        showErrors({
          photo: ["File must be less than ".concat(maxSizeKb, "Kb")]
        });
        return;
      }
      clearErrors();
      Data.value.photo = file;
    }
    function goToFirstStep() {
      _router_js__WEBPACK_IMPORTED_MODULE_1__["default"].push({
        name: 'first.step'
      });
    }
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(function () {
      clearErrors();
      var saved = localStorage.getItem('secondStep');
      if (saved) {
        var parsed = JSON.parse(saved);
        Object.assign(Data.value, parsed);
      }
    });
    function secondStepSubmit() {
      return _secondStepSubmit.apply(this, arguments);
    }
    function _secondStepSubmit() {
      _secondStepSubmit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var sendFormData, res, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              Data.value.id = localStorage.getItem('id');
              localStorage.setItem('secondStep', JSON.stringify(Data.value));
              sendFormData = new FormData();
              sendFormData.append('id', Data.value.id);
              sendFormData.append('company', Data.value.company);
              sendFormData.append('position', Data.value.position);
              sendFormData.append('about_me', Data.value.about_me);
              if (Data.value.photo instanceof File) {
                sendFormData.append('photo', Data.value.photo);
              }
              _context.p = 1;
              _context.n = 2;
              return axios.post('/api/members/second', sendFormData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            case 2:
              res = _context.v;
              localStorage.setItem('count', res.data.count);
              _context.n = 3;
              return _router_js__WEBPACK_IMPORTED_MODULE_1__["default"].push({
                name: 'third.step'
              });
            case 3:
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              if (_t.response && _t.response.status === 422) {
                showErrors(_t.response.data.errors);
              }
            case 5:
              return _context.a(2);
          }
        }, _callee, null, [[1, 4]]);
      }));
      return _secondStepSubmit.apply(this, arguments);
    }
    var __returned__ = {
      showErrors: showErrors,
      clearErrors: clearErrors,
      Data: Data,
      fileChange: fileChange,
      goToFirstStep: goToFirstStep,
      secondStepSubmit: secondStepSubmit,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref,
      inject: vue__WEBPACK_IMPORTED_MODULE_0__.inject,
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted,
      get router() {
        return _router_js__WEBPACK_IMPORTED_MODULE_1__["default"];
      }
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Form/SecondStep.vue?vue&type=template&id=6b616290":
/*!*************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Form/SecondStep.vue?vue&type=template&id=6b616290 ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "max-w-2xl mx-auto mt-10 mb-10 p-6 bg-white shadow rounded"
};
var _hoisted_2 = {
  "class": "space-y-4 mb-4"
};
var _hoisted_3 = {
  "class": "flex flex-col"
};
var _hoisted_4 = {
  key: 0,
  "class": "text-red-600 text-sm mt-1"
};
var _hoisted_5 = {
  "class": "flex flex-col"
};
var _hoisted_6 = {
  key: 0,
  "class": "text-red-600 text-sm mt-1"
};
var _hoisted_7 = {
  "class": "flex flex-col"
};
var _hoisted_8 = {
  key: 0,
  "class": "text-red-600 text-sm mt-1"
};
var _hoisted_9 = {
  "class": "flex flex-col"
};
var _hoisted_10 = {
  key: 0,
  "class": "text-red-600 text-sm mt-1"
};
var _hoisted_11 = {
  "class": "flex justify-between pt-2"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    "class": "text-xl text-center font-semibold mb-6",
    id: "form_title"
  }, "To participate in the conference, please fill out the form", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    name: "company",
    type: "text",
    placeholder: "Company",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $setup.Data.company = $event;
    }),
    "class": "border p-2 rounded w-full outline-none focus-within:border-gray-800 focus:border-gray-800"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.Data.company]]), $props.errors.company ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.errors.company), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    name: "position",
    type: "text",
    placeholder: "Position",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $setup.Data.position = $event;
    }),
    "class": "border p-2 rounded w-full outline-none focus-within:border-gray-800 focus:border-gray-800"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.Data.position]]), $props.errors.position ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.errors.position), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    name: "about_me",
    placeholder: "About me",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $setup.Data.about_me = $event;
    }),
    "class": "border p-2 rounded w-full resize-y outline-none focus-within:border-gray-800 focus:border-gray-800"
  }, "                ", 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.Data.about_me]]), $props.errors.about_me ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.errors.about_me), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    name: "photo",
    type: "file",
    accept: "image/*",
    onChange: $setup.fileChange,
    "class": "border p-2 rounded w-full focus-within:border-gray-800 focus:border-gray-800"
  }, null, 32 /* NEED_HYDRATION */), $props.errors.photo ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.errors.photo), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: $setup.goToFirstStep,
    "class": "bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded transition-colors duration-200"
  }, " Back "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($setup.secondStepSubmit, ["prevent"]),
    "class": "bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors duration-200"
  }, " Next ")])]);
}

/***/ }),

/***/ "./resources/js/components/Form/SecondStep.vue":
/*!*****************************************************!*\
  !*** ./resources/js/components/Form/SecondStep.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SecondStep_vue_vue_type_template_id_6b616290__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SecondStep.vue?vue&type=template&id=6b616290 */ "./resources/js/components/Form/SecondStep.vue?vue&type=template&id=6b616290");
/* harmony import */ var _SecondStep_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SecondStep.vue?vue&type=script&setup=true&lang=js */ "./resources/js/components/Form/SecondStep.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var D_learning_wizard_form_laravel_vue_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_learning_wizard_form_laravel_vue_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_SecondStep_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_SecondStep_vue_vue_type_template_id_6b616290__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/Form/SecondStep.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/Form/SecondStep.vue?vue&type=script&setup=true&lang=js":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/Form/SecondStep.vue?vue&type=script&setup=true&lang=js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SecondStep_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SecondStep_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SecondStep.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Form/SecondStep.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/js/components/Form/SecondStep.vue?vue&type=template&id=6b616290":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/Form/SecondStep.vue?vue&type=template&id=6b616290 ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SecondStep_vue_vue_type_template_id_6b616290__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SecondStep_vue_vue_type_template_id_6b616290__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SecondStep.vue?vue&type=template&id=6b616290 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Form/SecondStep.vue?vue&type=template&id=6b616290");


/***/ })

}]);