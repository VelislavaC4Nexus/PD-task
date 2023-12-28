"use strict";

var server = require("server");
server.extend(module.superModule);

var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

server.append("Show", function (req, res, next) {
    var Site = require("dw/system/Site");
    var PageMgr = require("dw/experience/PageMgr");
    var pageMetaHelper = require("*/cartridge/scripts/helpers/pageMetaHelper");

    pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);

    var pdCustomPreferenceValue = Site.getCurrent().getCustomPreferenceValue("PDTaskConfig");
    if(pdCustomPreferenceValue){
        var page = PageMgr.getPage(pdCustomPreferenceValue);
    }

    if (page && page.isVisible()) {
        res.page(pdCustomPreferenceValue);
    } else {
        res.render("home/homePage");
    }

    next();
},
    pageMetaData.computedPageMetaData
);

module.exports = server.exports();