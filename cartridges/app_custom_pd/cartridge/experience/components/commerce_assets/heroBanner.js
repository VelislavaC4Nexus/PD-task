'use strict';
/* global response */

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');
var pageCacheUtils = require('*/cartridge/experience/utils/pageCacheUtils');

/**
 * Render logic for the storefront.MainBanner component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    model.title = content.title;
    model.ctaTitle = content.ctaTitleLink;
    model.shortDescription = content.shortDescription;
    model.image = ImageTransformation.getScaledImage(content.image);
    model.categoryLink = URLUtils.url('Search-Show', 'cgid', content.categoryLink.getID()).toString();

    // instruct 24 hours relative pagecache
    pageCacheUtils.setCacheExpiry(response);

    return new Template('experience/components/commerce_assets/heroBanner').render(model).text;
};
