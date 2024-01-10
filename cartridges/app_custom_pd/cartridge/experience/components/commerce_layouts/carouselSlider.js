'use strict';
/* global response */

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var sliderBuilder = require('*/cartridge/scripts/experience/utilities/sliderBuilder.js');
var pageCacheUtils = require('*/cartridge/experience/utils/pageCacheUtils');

/**
 * Render logic for storefront.carousel layout.
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();


    model = sliderBuilder.init(model, context);

    // instruct 24 hours relative pagecache
    pageCacheUtils.setCacheExpiry(response);

    return new Template('experience/components/commerce_layouts/carouselSlider').render(model).text;
};
