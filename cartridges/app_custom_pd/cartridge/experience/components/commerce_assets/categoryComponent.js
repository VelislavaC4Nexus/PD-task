'use strict';
/* global response */

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');
var pageCacheUtils = require('*/cartridge/experience/utils/pageCacheUtils');

/**
 * Render logic for the storefront.popularCategories.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content;

    var catObj = {};
    var cat = content.category;
    if (cat) {
        catObj.ID = cat.ID;
        catObj.compID = context.component.ID;

        if (content.categoryDisplayName) {
            catObj.name = content.categoryDisplayName;
        } else {
            catObj.name = cat.displayName;
        }
        
        if (content.categoryCustomImageUrl) {
            catObj.customImageUrl = content.categoryCustomImageUrl;
        } 
        if (content.categoryShortDescription) {
            catObj.description = content.categoryShortDescription;
        } else {
            catObj.description = cat.description;
        }

        if (cat.custom.slotBannerImage) {
            catObj.imageURL = cat.custom.slotBannerImage.getURL().toString();
        }
    
        // catObj.categoryShortDescription = content.categoryShortDescription;
        catObj.ctaTitle = content.ctaTitleLink;
        catObj.ctaPosition = content.ctaPosition;

        catObj.url = cat.custom && 'alternativeUrl' in cat.custom && cat.custom.alternativeUrl
            ? cat.custom.alternativeUrl
            : URLUtils.url('Search-Show', 'cgid', cat.getID()).toString();
    }

    model.category = catObj;
    var sth = model

    // instruct 24 hours relative pagecache
    pageCacheUtils.setCacheExpiry(response);

    return new Template('experience/components/commerce_assets/categoryComponent').render(model).text;
};