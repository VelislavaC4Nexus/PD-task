'use strict';
/* global response */

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
var pageCacheUtils = require('*/cartridge/experience/utils/pageCacheUtils');

/**
 * Render logic for the storefront.3 Row x 1 Col (Mobile) 1 Row x 3 Col (Desktop) layout
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var component = context.component;

    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    // instruct 24 hours relative pagecache
    pageCacheUtils.setCacheExpiry(response);

    return new Template('experience/components/commerce_layouts/categoryLayoutGrid1row3col').render(model).text;
};