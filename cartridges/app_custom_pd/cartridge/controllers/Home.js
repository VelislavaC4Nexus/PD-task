'use strict';

var server = require("server");
server.extend(module.superModule);

var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

server.append("Show", function (req, res, next) {
    var Site = require("dw/system/Site");
    var PageMgr = require("dw/experience/PageMgr");
    var pageMetaHelper = require("*/cartridge/scripts/helpers/pageMetaHelper");

    pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);

    var customHomepage = Site.getCurrent().getCustomPreferenceValue("PDTaskConfig");
    if(customHomepage){
        var page = PageMgr.getPage(customHomepage);
    }

    if (page && page.isVisible()) {
        res.page(customHomepage);
    } else {
        res.render("home/homePage");
    }

    next();
},
    pageMetaData.computedPageMetaData
);

module.exports = server.exports();