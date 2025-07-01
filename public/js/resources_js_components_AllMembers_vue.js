"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_AllMembers_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AllMembers.vue?vue&type=script&setup=true&lang=js":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AllMembers.vue?vue&type=script&setup=true&lang=js ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'AllMembers',
  props: {
    errors: Object,
    isAdmin: Boolean
  },
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();
    var members = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var editMemberId = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    var editPhoto = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    var editPhotoPreview = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    var showErrors = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)('showErrors');
    var clearErrors = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)('clearErrors');
    var props = __props;
    var editForm = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      full_name: '',
      report_subject: '',
      email: ''
    });
    function isEdit(id) {
      return editMemberId.value === id;
    }
    function changeMemberId(member) {
      editMemberId.value = member.id;
      editForm.value = {
        full_name: member.full_name,
        report_subject: member.report_subject,
        email: member.email
      };
      editPhoto.value = null;
      editPhotoPreview.value = null;
      clearErrors();
    }
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
      editPhoto.value = file;
      editPhotoPreview.value = URL.createObjectURL(file);
    }
    function getMembers() {
      return _getMembers.apply(this, arguments);
    }
    function _getMembers() {
      _getMembers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var res, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.p = 0;
              if (!props.isAdmin) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return axios.get('/api/members/all', {
                headers: {
                  Authorization: "Bearer ".concat(localStorage.getItem('token'))
                }
              });
            case 1:
              res = _context.v;
              _context.n = 4;
              break;
            case 2:
              _context.n = 3;
              return axios.get('/api/members/all');
            case 3:
              res = _context.v;
            case 4:
              members.value = res.data.members;
              _context.n = 6;
              break;
            case 5:
              _context.p = 5;
              _t = _context.v;
              console.error('Failed to load members', _t);
            case 6:
              return _context.a(2);
          }
        }, _callee, null, [[0, 5]]);
      }));
      return _getMembers.apply(this, arguments);
    }
    function updateMember(_x) {
      return _updateMember.apply(this, arguments);
    }
    function _updateMember() {
      _updateMember = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(id) {
        var sendFormData, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              sendFormData = new FormData();
              sendFormData.append('full_name', editForm.value.full_name);
              sendFormData.append('report_subject', editForm.value.report_subject);
              sendFormData.append('email', editForm.value.email);
              if (editPhoto.value) {
                sendFormData.append('photo', editPhoto.value);
              }
              _context2.p = 1;
              _context2.n = 2;
              return axios.post("api/admin/members/".concat(id), sendFormData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: "Bearer ".concat(localStorage.getItem('token'))
                }
              });
            case 2:
              editMemberId.value = null;
              editPhoto.value = null;
              editPhotoPreview.value = null;
              _context2.n = 3;
              return getMembers();
            case 3:
              _context2.n = 5;
              break;
            case 4:
              _context2.p = 4;
              _t2 = _context2.v;
              if (_t2.response && _t2.response.status === 422) {
                showErrors(_t2.response.data.errors);
              }
            case 5:
              return _context2.a(2);
          }
        }, _callee2, null, [[1, 4]]);
      }));
      return _updateMember.apply(this, arguments);
    }
    function toggleVisibility(_x2) {
      return _toggleVisibility.apply(this, arguments);
    }
    function _toggleVisibility() {
      _toggleVisibility = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(member) {
        var res, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.p = 0;
              _context3.n = 1;
              return axios.post("api/admin/members/toggle/".concat(member.id), null, {
                headers: {
                  Authorization: "Bearer ".concat(localStorage.getItem('token'))
                }
              });
            case 1:
              res = _context3.v;
              member.visibility = res.data.visible;
              _context3.n = 3;
              break;
            case 2:
              _context3.p = 2;
              _t3 = _context3.v;
              console.error('Failed to toggle visibility:', _t3);
            case 3:
              return _context3.a(2);
          }
        }, _callee3, null, [[0, 2]]);
      }));
      return _toggleVisibility.apply(this, arguments);
    }
    function deleteMember(_x3) {
      return _deleteMember.apply(this, arguments);
    }
    function _deleteMember() {
      _deleteMember = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(id) {
        var _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.p = 0;
              _context4.n = 1;
              return axios["delete"]("api/admin/members/".concat(id), {
                headers: {
                  Authorization: "Bearer ".concat(localStorage.getItem('token'))
                }
              });
            case 1:
              _context4.n = 2;
              return getMembers();
            case 2:
              _context4.n = 4;
              break;
            case 3:
              _context4.p = 3;
              _t4 = _context4.v;
              console.error('Failed to delete member', _t4);
            case 4:
              return _context4.a(2);
          }
        }, _callee4, null, [[0, 3]]);
      }));
      return _deleteMember.apply(this, arguments);
    }
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(function () {
      getMembers();
    });
    var __returned__ = {
      members: members,
      editMemberId: editMemberId,
      editPhoto: editPhoto,
      editPhotoPreview: editPhotoPreview,
      showErrors: showErrors,
      clearErrors: clearErrors,
      props: props,
      editForm: editForm,
      isEdit: isEdit,
      changeMemberId: changeMemberId,
      fileChange: fileChange,
      getMembers: getMembers,
      updateMember: updateMember,
      toggleVisibility: toggleVisibility,
      deleteMember: deleteMember,
      inject: vue__WEBPACK_IMPORTED_MODULE_0__.inject,
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AllMembers.vue?vue&type=template&id=94505e3a":
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AllMembers.vue?vue&type=template&id=94505e3a ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "max-w-7xl mx-auto mt-10 mb-10 p-6 bg-white shadow rounded"
};
var _hoisted_2 = {
  "class": "w-full border border-gray-300 rounded overflow-hidden table-fixed"
};
var _hoisted_3 = {
  "class": "bg-gray-100"
};
var _hoisted_4 = {
  key: 0,
  "class": "p-3 text-left border-b w-[80px] truncate"
};
var _hoisted_5 = {
  key: 1,
  "class": "p-3 text-left border-b w-[80px] truncate"
};
var _hoisted_6 = {
  key: 2,
  "class": "p-3 text-left border-b w-[80px] truncate"
};
var _hoisted_7 = {
  "class": "hidden"
};
var _hoisted_8 = {
  "class": "p-3"
};
var _hoisted_9 = ["src", "alt"];
var _hoisted_10 = {
  "class": "p-3 break-words"
};
var _hoisted_11 = {
  "class": "p-3 break-words"
};
var _hoisted_12 = {
  "class": "p-3 break-words"
};
var _hoisted_13 = ["href"];
var _hoisted_14 = {
  key: 0,
  "class": "p-3"
};
var _hoisted_15 = ["onClick"];
var _hoisted_16 = {
  key: 1,
  "class": "p-3"
};
var _hoisted_17 = ["onClick"];
var _hoisted_18 = {
  key: 2,
  "class": "p-3"
};
var _hoisted_19 = ["onClick", "title"];
var _hoisted_20 = {
  "class": "hidden"
};
var _hoisted_21 = {
  "class": "p-3"
};
var _hoisted_22 = {
  "class": "block w-12 h-12 relative"
};
var _hoisted_23 = ["src"];
var _hoisted_24 = {
  "class": "text-red-600 text-sm mt-1 min-h-[1.25rem]"
};
var _hoisted_25 = {
  "class": "p-3"
};
var _hoisted_26 = {
  "class": "text-red-600 text-sm mt-1 min-h-[1.25rem]"
};
var _hoisted_27 = {
  "class": "p-3"
};
var _hoisted_28 = {
  "class": "text-red-600 text-sm mt-1 min-h-[1.25rem]"
};
var _hoisted_29 = {
  "class": "p-3"
};
var _hoisted_30 = {
  "class": "text-red-600 text-sm mt-1 min-h-[1.25rem]"
};
var _hoisted_31 = {
  "class": "p-3"
};
var _hoisted_32 = ["onClick"];
var _hoisted_33 = {
  "class": "p-3"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    "class": "text-xl text-center font-semibold mb-4"
  }, "All Members", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    "class": "p-3 text-left border-b w-[80px]"
  }, "Photo", -1 /* CACHED */)), _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    "class": "p-3 text-left border-b w-[200px] truncate"
  }, "Full Name", -1 /* CACHED */)), _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    "class": "p-3 text-left border-b w-[300px] truncate"
  }, "Report Subject", -1 /* CACHED */)), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
    "class": "p-3 text-left border-b w-[250px] truncate"
  }, "Email", -1 /* CACHED */)), $props.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("th", _hoisted_4, "Edit")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $props.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("th", _hoisted_5, "Delete")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $props.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("th", _hoisted_6, "Visible")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.members, function (member) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: member.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", {
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.isEdit(member.id) ? 'hidden' : 'border-b')
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(member.id), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
      src: "/storage/".concat(member.photo),
      alt: member.full_name,
      "class": "h-12 w-12 object-cover rounded-full"
    }, null, 8 /* PROPS */, _hoisted_9)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(member.full_name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(member.report_subject), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=".concat(member.email),
      target: "_blank",
      "class": "text-blue-600 hover:underline"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(member.email), 9 /* TEXT, PROPS */, _hoisted_13)]), $props.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("td", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
        return $setup.changeMemberId(member);
      }, ["prevent"]),
      "class": "underline text-orange-600"
    }, " Edit ", 8 /* PROPS */, _hoisted_15)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $props.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("td", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
        return $setup.deleteMember(member.id);
      }, ["prevent"]),
      "class": "underline text-red-600"
    }, " Delete ", 8 /* PROPS */, _hoisted_17)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $props.isAdmin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("td", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
        return $setup.toggleVisibility(member);
      }, ["prevent"]),
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([member.visibility ? 'text-green-600' : 'text-gray-400', "underline"]),
      title: member.visibility ? 'Visible' : 'Hidden'
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(member.visibility ? 'Visible' : 'Hidden'), 11 /* TEXT, CLASS, PROPS */, _hoisted_19)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", {
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.isEdit(member.id) ? 'border-b bg-white hover:bg-gray-50' : 'hidden')
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(member.id), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
      src: $setup.editPhotoPreview || "/storage/".concat(member.photo),
      alt: "Current photo",
      "class": "w-12 h-12 object-cover rounded-full"
    }, null, 8 /* PROPS */, _hoisted_23), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "file",
      accept: "image/*",
      "class": "absolute inset-0 opacity-0",
      onChange: $setup.fileChange
    }, null, 32 /* NEED_HYDRATION */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.errors.photo || ' '), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "text",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
        return $setup.editForm.full_name = $event;
      }),
      "class": "w-full border border-gray-300 rounded px-2 py-1 text-sm"
    }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.editForm.full_name]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.errors.full_name || ' '), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "text",
      "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
        return $setup.editForm.report_subject = $event;
      }),
      "class": "w-full border border-gray-300 rounded px-2 py-1 text-sm"
    }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.editForm.report_subject]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.errors.report_subject || ' '), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "text",
      "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
        return $setup.editForm.email = $event;
      }),
      "class": "w-full border border-gray-300 rounded px-2 py-1 text-sm"
    }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.editForm.email]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.errors.email || ' '), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: "#",
      "class": "inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
        return $setup.updateMember(member.id);
      }, ["prevent"])
    }, " Update ", 8 /* PROPS */, _hoisted_32)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: "#",
      onClick: _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
        return $setup.editMemberId = null;
      }, ["prevent"])),
      "class": "ml-2 text-sm text-gray-500 hover:underline"
    }, " Cancel")])], 2 /* CLASS */)], 64 /* STABLE_FRAGMENT */);
  }), 128 /* KEYED_FRAGMENT */))])])]);
}

/***/ }),

/***/ "./resources/js/components/AllMembers.vue":
/*!************************************************!*\
  !*** ./resources/js/components/AllMembers.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AllMembers_vue_vue_type_template_id_94505e3a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AllMembers.vue?vue&type=template&id=94505e3a */ "./resources/js/components/AllMembers.vue?vue&type=template&id=94505e3a");
/* harmony import */ var _AllMembers_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AllMembers.vue?vue&type=script&setup=true&lang=js */ "./resources/js/components/AllMembers.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var D_learning_wizard_form_laravel_vue_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_learning_wizard_form_laravel_vue_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_AllMembers_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_AllMembers_vue_vue_type_template_id_94505e3a__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/AllMembers.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/AllMembers.vue?vue&type=script&setup=true&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/AllMembers.vue?vue&type=script&setup=true&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AllMembers_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AllMembers_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AllMembers.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AllMembers.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/js/components/AllMembers.vue?vue&type=template&id=94505e3a":
/*!******************************************************************************!*\
  !*** ./resources/js/components/AllMembers.vue?vue&type=template&id=94505e3a ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AllMembers_vue_vue_type_template_id_94505e3a__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_AllMembers_vue_vue_type_template_id_94505e3a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./AllMembers.vue?vue&type=template&id=94505e3a */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/AllMembers.vue?vue&type=template&id=94505e3a");


/***/ })

}]);