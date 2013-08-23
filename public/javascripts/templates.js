var toffee;(void 0===toffee||null===toffee)&&(toffee={}),toffee.templates||(toffee.templates={}),toffee.states={TOFFEE:1,COFFEE:2},toffee.__json=function(e,t){return null==t?"null":""+JSON.stringify(t).replace(/</g,"\\u003C").replace(/>/g,"\\u003E").replace(/&/g,"\\u0026")},toffee.__raw=function(e,t){return t},toffee.__html=function(e,t){return(""+t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},toffee.__escape=function(e,t){var n;return n=null!=e.__toffee.autoEscape?e.__toffee.autoEscape:!0,n?void 0===t?"":null!=t&&"object"==typeof t?e.json(t):e.html(t):t},toffee.__augmentLocals=function(e,t){var n,f;return n=e,f=n.__toffee={out:[]},null==n.print&&(n.print=function(e){return toffee.__print(n,e)}),null==n.json&&(n.json=function(e){return toffee.__json(n,e)}),null==n.raw&&(n.raw=function(e){return toffee.__raw(n,e)}),null==n.html&&(n.html=function(e){return toffee.__html(n,e)}),null==n.escape&&(n.escape=function(e){return toffee.__escape(n,e)}),null==n.partial&&(n.partial=function(e,f){return toffee.__partial(toffee.templates[""+t],n,e,f)}),null==n.snippet&&(n.snippet=function(e,f){return toffee.__snippet(toffee.templates[""+t],n,e,f)}),f.print=n.print,f.json=n.json,f.raw=n.raw,f.html=n.html,f.escape=n.escape,f.partial=n.partial,f.snippet=n.snippet},toffee.__print=function(e,t){return e.__toffee.state===toffee.states.COFFEE?(e.__toffee.out.push(t),""):""+t},toffee.__normalize=function(e){var t,n,f,o,l;if(null==e||"/"===e)return e;for(f=e.split("/"),t=[],f[0]&&t.push(""),o=0,l=f.length;l>o;o++)n=f[o],".."===n?t.length>1?t.pop():t.push(n):"."!==n&&t.push(n);return e=t.join("/"),e||(e="/"),e},toffee.__partial=function(e,t,n,f){return n=toffee.__normalize(e.bundlePath+"/../"+n),toffee.__inlineInclude(n,f,t)},toffee.__snippet=function(e,t,n,f){return n=toffee.__normalize(e.bundlePath+"/../"+n),f=null!=f?f:{},f.__toffee=f.__toffee||{},f.__toffee.noInheritance=!0,toffee.__inlineInclude(n,f,t)},toffee.__inlineInclude=function(e,t,n){var f,o,l;if(o=t||{},o.__toffee=o.__toffee||{},!o.__toffee.noInheritance)for(f in n)l=n[f],null==(null!=t?t[f]:void 0)&&"print"!==f&&"partial"!==f&&"snippet"!==f&&"layout"!==f&&"__toffee"!==f&&(o[f]=l);return toffee.templates[e]?toffee.templates[e].pub(o):"Inline toffee include: Could not find "+e};
;

;
(function() {
  var tmpl;

  tmpl = toffee.templates["/pageList.toffee"] = {
    bundlePath: "/pageList.toffee"
  };

  tmpl.render = tmpl.pub = function(__locals) {
    var page, _i, _len, _ln, _ref, _to, _ts;
    _to = function(x) {
      return __locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return __locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return __locals.__toffee.state = x;
    };
    toffee.__augmentLocals(__locals, "/pageList.toffee");
    with (__locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("<ul>\n");
    _ln(2);
    _to("\t<li>\n");
    _ln(3);
    _to("\t\t");
    _ts(2);
    _ts(2);
    if (user.activePage._id != null) {
      _ts(1);
      _ts(1);
      _ln(4);
      _to("\n");
      _ln(5);
      _to("\t\t\t\t<img src=\"https://graph.facebook.com/");
      _to("" + (escape(user.activePage._id)));
      _to("/picture\" alt=\"page_avatar\" class=\"user_avatar\" width=\"24\" height=\"24\">\n");
      _ln(6);
      _to("\t\t\t\t<a href=\"#\" title=\"Pages\">\n");
      _ln(7);
      _to("\t\t\t\t\t<span class=\"label\">");
      _to("" + (escape(user.activePage.name)));
      _to("</span>\n");
      _ln(8);
      _to("\t\t\t\t</a>\n");
      _ln(9);
      _to("\t\t\t");
      _ts(2);
    } else {
      _ts(1);
      _ts(1);
      _ln(11);
      _to("\n");
      _ln(12);
      _to("\t\t\t\t<img src=\"https://graph.facebook.com/whoislikingyou/picture\" alt=\"page_avatar\" class=\"user_avatar\" width=\"24\" height=\"24\">\n");
      _ln(13);
      _to("\t\t\t\t<a href=\"#\" title=\"Pages\">\n");
      _ln(14);
      _to("\t\t\t\t\t<span class=\"label\">add pages here</span>\n");
      _ln(15);
      _to("\t\t\t\t</a>\n");
      _ln(16);
      _to("\t\t\t");
      _ts(2);
    }
    _ts(1);
    _ln(18);
    _to("\t\t\n");
    _ln(19);
    _to("\t\t<!-- Drop Menu -->\n");
    _ln(20);
    _to("\t\t<ul class=\"drop_menu menu_without_icons\">\n");
    _ln(21);
    _to("\t\t\t");
    _ts(2);
    _ts(2);
    _ref = user.pages;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      page = _ref[_i];
      if (page._id !== user.activePage._id) {
        _ts(1);
        _ts(1);
        _ln(23);
        _to("\n");
        _ln(24);
        _to("\t\t\t\t\t\t<li>\n");
        _ln(25);
        _to("\t\t\t\t\t\t\t<a title=" + '"');
        _to("" + (escape(page.name)));
        _to('"' + "  onclick=\"activatePage('");
        _to("" + (escape(page._id)));
        _to("', '");
        _to("" + (escape(page.name)));
        _to("');\" href=\"#\">\n");
        _ln(26);
        _to("\t\t\t\t\t\t\t\t<span class=\"label\">");
        _to("" + (escape(page.name)));
        _to("</span>\n");
        _ln(27);
        _to("\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\n");
        _ln(28);
        _to("\t\t\t\t\t\t</li>\n");
        _ln(29);
        _to("\t\t\t\t\t");
        _ts(2);
      }
    }
    _ts(1);
    _ln(30);
    _to("\n");
    _ln(31);
    _to("\t\t\t<li>\n");
    _ln(32);
    _to("\t\t\t\t<a class=\"i_16_add\" onclick=\"openPagePopup();\" title=\"Add more pages\">\n");
    _ln(33);
    _to("\t\t\t\t\t<span class=\"label\" style=\"margin-left:24px\">Add more</span>\n");
    _ln(34);
    _to("\t\t\t\t</a>\n");
    _ln(35);
    _to("\t\t\t</li>\n");
    _ln(36);
    _to("\t\t</ul>\n");
    _ln(37);
    _to("\t</li>\n");
    _ln(38);
    _to("</ul>");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return true; } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

;
(function() {
  var tmpl;

  tmpl = toffee.templates["/pagePopup.toffee"] = {
    bundlePath: "/pagePopup.toffee"
  };

  tmpl.render = tmpl.pub = function(__locals) {
    var page, _i, _len, _ln, _to, _ts;
    _to = function(x) {
      return __locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return __locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return __locals.__toffee.state = x;
    };
    toffee.__augmentLocals(__locals, "/pagePopup.toffee");
    with (__locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("<div class=\"widget_header\">\n");
    _ln(2);
    _to("\t<h4 class=\"widget_header_title wwIcon i_16_settings\">Add pages to \"Who Is LIKing You?\"</h4>\n");
    _ln(3);
    _to("</div>\n");
    _ln(4);
    _to("<div class=\"widget_contents noPadding\">\n");
    _ln(5);
    _ts(2);
    _ts(2);
    if (!(typeof message !== "undefined" && message !== null)) {
      _ts(1);
      _ts(1);
      _ln(7);
      _to(" <div class=\"line_grid\"><div class=\"iPreview\"><img src=\"../Images/Icons/Load/load-8.gif\" alt=\"load\"></div></div>");
      _ts(2);
    } else {
      if (typeof message !== "undefined" && message !== null) {
        for (_i = 0, _len = message.length; _i < _len; _i++) {
          page = message[_i];
          _ts(1);
          _ts(1);
          _ln(11);
          _to("\n");
          _ln(12);
          _to("\t\t\t\t<div class=\"line_grid\">\n");
          _ln(13);
          _to("\t\t\t\t\t<div class=\"g_10\">\n");
          _ln(14);
          _to("\t\t\t\t\t\t<span class=\"label\">");
          _to("" + (escape(page.name)));
          _to("</span>\n");
          _ln(15);
          _to("\t\t\t\t\t\t<div class=\"field_notice\">");
          _to("" + (escape(page.category)));
          _to("</div>\n");
          _ln(16);
          _to("\t\t\t\t\t</div>\t\t\t\t\n");
          _ln(17);
          _to("\t\t\t\t\t<div class=\"g_2\" id=" + '"');
          _to("" + (escape(page.id)));
          _to('"' + ">\n");
          _ln(18);
          _to("\t\t\t\t\t\t");
          _ts(2);
          _ts(2);
          if (page.exists != null) {
            _ts(1);
            _ts(1);
            _ln(19);
            _to(" <div class=\"simple_buttons\"><div class=\"bwIcon i_16_checkbox ui-state-active\" style=\"cursor:default;\">Added</div></div> ");
            _ts(2);
          } else {
            _ts(1);
            _ts(1);
            _ln(21);
            _to(" <div class=\"simple_buttons addPage\"><div class=\"bwIcon i_16_add\" id=" + '"');
            _to("" + (escape(page.id)));
            _to('"' + " name=" + '"');
            _to("" + (escape(page.name)));
            _to('"' + " category=" + '"');
            _to("" + (escape(page.category)));
            _to('"' + " accessKey=" + '"');
            _to("" + (escape(page.access_token)));
            _to('"' + " onclick=\"addPages(this);\">Add</div></div> ");
            _ts(2);
          }
          _ts(1);
          _ln(22);
          _to("\n");
          _ln(23);
          _to("\t\t\t\t\t</div>\n");
          _ln(24);
          _to("\t\t\t\t</div>\n");
          _ln(25);
          _to("\t\t\t\t");
          _ts(2);
        }
      }
    }
    _ts(1);
    _ln(26);
    _to("\n");
    _ln(27);
    _to("\t<div class=\"line_grid\">\n");
    _ln(28);
    _to("\t\t<div class=\"g_12\">\n");
    _ln(29);
    _to("\t\t\t<div class=\"simple_buttons\">\n");
    _ln(30);
    _to("\t\t\t\t<div id=\"closeButton\" onclick=\"closeModal(this);\">Close</div>\n");
    _ln(31);
    _to("\t\t\t</div>\n");
    _ln(32);
    _to("\t\t</div>\n");
    _ln(33);
    _to("\t</div>\n");
    _ln(34);
    _to("</div>");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return true; } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);
