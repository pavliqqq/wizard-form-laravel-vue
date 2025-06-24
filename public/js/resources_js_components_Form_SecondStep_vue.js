"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Form_SecondStep_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Form/SecondStep.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Form/SecondStep.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "SecondStep",
  data: function data() {
    return {
      company: null,
      position: null,
      about_me: null,
      photo: null
    };
  },
  methods: {}
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
  "class": "max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, _cache[0] || (_cache[0] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<h2 class=\"text-xl text-center font-semibold mb-6\" id=\"form_title\">To participate in the conference, please fill out the form</h2><div class=\"space-y-4 mb-4\"><div class=\"flex flex-col\"><input name=\"company\" type=\"text\" placeholder=\"Company\" class=\"border p-2 rounded w-full\"><div class=\"error-message text-red-600 text-sm mt-1\"></div></div><div class=\"flex flex-col\"><input name=\"position\" type=\"text\" placeholder=\"Position\" class=\"border p-2 rounded w-full\"><div class=\"error-message text-red-600 text-sm mt-1\"></div></div><div class=\"flex flex-col\"><textarea name=\"about_me\" placeholder=\"About me\" class=\"border p-2 rounded w-full resize-y\"></textarea><div class=\"error-message text-red-600 text-sm mt-1\"></div></div><div class=\"flex flex-col\"><input name=\"photo\" type=\"file\" class=\"border p-2 rounded w-full\"><div class=\"error-message text-red-600 text-sm mt-1\"></div></div></div>", 2), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "flex justify-between pt-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onclick: "WizardForm.goToStep1()",
    "class": "bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded transition-colors duration-200"
  }, " Back "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "submit",
    "class": "bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors duration-200"
  }, " Next ")], -1 /* CACHED */)]));
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
/* harmony import */ var _SecondStep_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SecondStep.vue?vue&type=script&lang=js */ "./resources/js/components/Form/SecondStep.vue?vue&type=script&lang=js");
/* harmony import */ var D_learning_wizard_form_laravel_vue_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,D_learning_wizard_form_laravel_vue_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_SecondStep_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_SecondStep_vue_vue_type_template_id_6b616290__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/Form/SecondStep.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/Form/SecondStep.vue?vue&type=script&lang=js":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/Form/SecondStep.vue?vue&type=script&lang=js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SecondStep_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SecondStep_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SecondStep.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Form/SecondStep.vue?vue&type=script&lang=js");
 

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