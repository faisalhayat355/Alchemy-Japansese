(function(c){c.register("click-to-tweet",b);
function b(e,d){return e.w('<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc--><a href="').f(d.get(["url"],false),d,"h").w('" class="click-to-tweet-link" target="_blank"><span class="click-to-tweet-content-container ').f(d.get(["view"],false),d,"h").w('"><svg viewbox="0 0 20 18" class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="').f(d.get(["spritePath"],false),d,"h").w('#icon-tw"></use></svg>').h("eq",d,{block:a},{key:d.get(["view"],false),value:"icon-and-title-view"},"h").w("</span></a>")
}b.__dustBody=!0;
function a(e,d){return e.h("i18n",d,{},{key:"rte.click-to-tweet.link-title"},"h")
}a.__dustBody=!0;
return b
}(dust));
(function(c){c.register("field-validation-error",b);
function b(e,d){return e.w("<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc-->").s(d.get(["errors"],false),d,{block:a},{})
}b.__dustBody=!0;
function a(e,d){return e.w('<span class="field-error-message">').f(d.getPath(true,[]),d,"h").w("</span>")
}a.__dustBody=!0;
return b
}(dust));
(function(b){b.register("file-input",a);
function a(d,c){return d.w('<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc--><div class="input-file-wrap"><div class="input-file-row"><div class="input-file-name"><input type="text" readonly="readonly" class="input-file-field" value="').f(c.get(["title"],false),c,"h").w('"></div><label class="input-file-button" for="').f(c.get(["id"],false),c,"h").w('">').f(c.get(["label"],false),c,"h").w("</label></div></div>")
}a.__dustBody=!0;
return a
}(dust));
(function(c){c.register("lca-listing-table-items-23",b);
function b(e,d){return e.w("<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc-->").s(d.get(["items"],false),d,{block:a},{})
}b.__dustBody=!0;
function a(e,d){return e.w("<tr><td>").f(d.get(["number"],false),d,"h").w("</td><td>").f(d.get(["position"],false),d,"h").w("</td><td>").f(d.get(["primaryLocation"],false),d,"h").w("</td><td>").f(d.get(["secondLocation"],false),d,"h").w("</td><td>").f(d.get(["thirdLocation"],false),d,"h").w("</td><td>").f(d.get(["postingDate"],false),d,"h").w("</td><td>").f(d.get(["expirationDate"],false),d,"h").w('</td><td><a href="').f(d.get(["publicFile"],false),d,"h").w('" target="_blank">Link</a></td></tr>')
}a.__dustBody=!0;
return b
}(dust));
(function(c){c.register("lca-listing-table-items",b);
function b(e,d){return e.w("<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc-->").s(d.get(["items"],false),d,{block:a},{})
}b.__dustBody=!0;
function a(e,d){return e.w("<tr><td>").f(d.get(["number"],false),d,"h").w("</td><td>").f(d.get(["position"],false),d,"h").w("</td><td>").f(d.get(["primaryLocation"],false),d,"h").w("</td><td>").f(d.get(["secondLocation"],false),d,"h").w("</td><td>").f(d.get(["thirdLocation"],false),d,"h").w("</td><td>").f(d.get(["postingDate"],false),d,"h").w("</td><td>").f(d.get(["expirationDate"],false),d,"h").w('</td><td><a href="').f(d.get(["publicFile"],false),d,"h").w('" target="_blank">Link</a></td></tr>')
}a.__dustBody=!0;
return b
}(dust));
(function(f){f.register("multi-select-dropdown",o);
function o(s,r){return s.w('<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc--><div class="selected-params ').h("gt",r,{block:m},{key:r.get(["selectedCount"],false),value:0},"h").w('"><div class="default-label">').f(r.get(["defaultText"],false),r,"h").w('</div><div class="selected-label"><span class="label">').h("i18n",r,{},{key:r.get(["selectedCountKey"],false)},"h").w(' </span><span class="counter">').f(r.get(["selectedCount"],false),r,"h").w('</span></div><img class="dark-style-arrow" src="/etc/designs/epam-core/images/components/redesign/multi-select-dropdown/Arrow 3.svg" /></div><div class="multi-select-dropdown-container"><div class="multi-select-dropdown hidden" role="tree" aria-expanded="true" aria-hidden="false"><ul class="multi-select-column">').s(r.get(["options"],false),r,{block:k},{}).w("</ul>").s(r.get(["emptyOptions"],false),r,{block:n},{}).w("</div></div>").x(r.get(["showTags"],false),r,{block:l},{})
}o.__dustBody=!0;
function m(s,r){return s.w("selected")
}m.__dustBody=!0;
function k(s,r){return s.w('<li role="treeitem" aria-selected="false" data-index="').f(r.get(["$idx"],false),r,"h").w('"><label><input type="checkbox" class="checkbox-custom is-a11y-only" data-value="').f(r.get(["value"],false),r,"h").w('" ').x(r.get(["selected"],false),r,{block:i},{}).w('/><span class="checkbox-custom-label">').f(r.get(["text"],false),r,"h",["s"]).w("</span></label></li>").h("math",r,{block:g},{key:q,method:"multiply",operand:p},"h")
}k.__dustBody=!0;
function i(s,r){return s.w("checked")
}i.__dustBody=!0;
function g(s,r){return s.h("gt",r,{block:e},{value:r.get(["$idx"],false),type:"number"},"h")
}g.__dustBody=!0;
function e(s,r){return s.h("math",r,{block:d},{key:r.get(["$idx"],false),method:"mod",operand:a},"h")
}e.__dustBody=!0;
function d(s,r){return s.h("eq",r,{block:c},{value:b,type:"number"},"h")
}d.__dustBody=!0;
function c(s,r){return s.w('</ul><ul class="multi-select-column">')
}c.__dustBody=!0;
function b(s,r){return s.f(r.get(["columnLastItemIndex"],false),r,"h")
}b.__dustBody=!0;
function a(s,r){return s.f(r.get(["columnSize"],false),r,"h")
}a.__dustBody=!0;
function q(s,r){return s.f(r.get(["columnSize"],false),r,"h")
}q.__dustBody=!0;
function p(s,r){return s.f(r.get(["fixedLengthColumns"],false),r,"h")
}p.__dustBody=!0;
function n(s,r){return s.w('<span class="search-result__error-message">').f(r.get(["value"],false),r,"h").w("</span>")
}n.__dustBody=!0;
function l(s,r){return s.s(r.get(["options"],false),r,{block:j},{})
}l.__dustBody=!0;
function j(s,r){return s.x(r.get(["selected"],false),r,{block:h},{})
}j.__dustBody=!0;
function h(s,r){return s.p("multi-select-filter-tag",r,r,{})
}h.__dustBody=!0;
return o
}(dust));
(function(b){b.register("multi-select-filter-tag",a);
function a(d,c){return d.w('<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc--><li class="filter-tag" data-value="').f(c.get(["value"],false),c,"h").w('">').f(c.get(["text"],false),c,"h",["s"]).w('<button class="unselect-tag"><span class="is-a11y-only">').f(c.get(["text"],false),c,"h",["s"]).w(" ").h("i18n",c,{},{key:"component.multi-select-filter.remove-button"},"h").w("</span></button></li>")
}a.__dustBody=!0;
return a
}(dust));
(function(f){f.register("multi-select-filter",k);
function k(m,l){return m.w('<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc--><div class="selected-params"><div class="default-label ').x(l.get(["isSomethingSelected"],false),l,{block:j},{}).w('">').f(l.get(["filterText"],false),l,"h").w(" <span>").f(l.get(["defaultText"],false),l,"h").w('</span></div><div class="selected-items ').nx(l.get(["isSomethingSelected"],false),l,{block:i},{}).w('">').x(l.get(["isSomethingSelected"],false),l,{block:h},{}).w('</div></div><div class="multi-select-dropdown-container"><div class="multi-select-dropdown"><ul class="multi-select-column">').s(l.get(["options"],false),l,{block:d},{}).w("</ul></div></div>")
}k.__dustBody=!0;
function j(m,l){return m.w("hidden")
}j.__dustBody=!0;
function i(m,l){return m.w("hidden")
}i.__dustBody=!0;
function h(m,l){return m.s(l.get(["options"],false),l,{block:g},{})
}h.__dustBody=!0;
function g(m,l){return m.x(l.get(["selected"],false),l,{block:e},{})
}g.__dustBody=!0;
function e(m,l){return m.w('<span class="filter-tag" data-value="').f(l.get(["value"],false),l,"h").w('">').f(l.get(["text"],false),l,"h",["s"]).w('<span class="unselect-tag"></span></span>')
}e.__dustBody=!0;
function d(m,l){return m.w('<li><label><input type="checkbox" class="blue-checkbox" data-value="').f(l.get(["value"],false),l,"h").w('" ').x(l.get(["selected"],false),l,{block:c},{}).w('/><span class="blue-checkbox-label">').f(l.get(["text"],false),l,"h",["s"]).w("</span></label></li>").h("if",l,{block:b},{cond:a},"h")
}d.__dustBody=!0;
function c(m,l){return m.w("checked")
}c.__dustBody=!0;
function b(m,l){return m.w('</ul><ul class="multi-select-column">')
}b.__dustBody=!0;
function a(m,l){return m.w("(((").f(l.get(["$idx"],false),l,"h").w(" + 1) % ").f(l.get(["itemsInColumn"],false),l,"h").w(") == 0) && (").f(l.get(["$idx"],false),l,"h").w(" + 1) != ").f(l.getPath(false,["options","length"]),l,"h")
}a.__dustBody=!0;
return k
}(dust));
(function(e){e.register("search-result-info",j);
function j(l,k){return l.w("<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc-->").x(k.get(["results"],false),k,{block:i},{})
}j.__dustBody=!0;
function i(l,k){return l.x(k.get(["suggestedQuery"],false),k,{"else":h,block:a},{})
}i.__dustBody=!0;
function h(l,k){return l.x(k.get(["query"],false),k,{block:g},{})
}h.__dustBody=!0;
function g(l,k){return l.h("eq",k,{"else":f,block:b},{key:k.get(["total"],false),value:k.get(["condition"],false)},"h")
}g.__dustBody=!0;
function f(l,k){return l.h("eq",k,{"else":d,block:c},{key:k.get(["total"],false),value:0},"h")
}f.__dustBody=!0;
function d(l,k){return l.w('<h2 class="asset-library-search__counter">').f(k.get(["total"],false),k,"h").w(' RESULTS FOR "').f(k.get(["query"],false),k,"h").w('"</h2>')
}d.__dustBody=!0;
function c(l,k){return l.w('<h2 class="asset-library-search__counter"></h2>')
}c.__dustBody=!0;
function b(l,k){return l.w('<h2 class="asset-library-search__counter">').f(k.get(["total"],false),k,"h").w(' RESULT FOR "').f(k.get(["query"],false),k,"h").w('"</h2>')
}b.__dustBody=!0;
function a(l,k){return l.w('<div class="asset-library-search__exception-message" role="alert">').f(k.get(["noresultMessage"],false),k,"h").w('</div><div class="asset-library-search__auto-correct-message">Did you mean <a class="asset-library-search____auto-correct-term">').f(k.get(["suggestedQuery"],false),k,"h").w("</a>: ").f(k.get(["suggestedResultTotal"],false),k,"h").w("</div>")
}a.__dustBody=!0;
return j
}(dust));
(function(f){f.register("search-results",e);
function e(h,g){return h.w("<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc-->").s(g.get(["items"],false),g,{block:d},{})
}e.__dustBody=!0;
function d(h,g){return h.w('<article class="search-results__item"><h3 class="search-results__title"><a class="search-results__title-link" href="').f(g.get(["path"],false),g,"h").x(g.get(["isAuthor"],false),g,{block:c},{}).w('">').f(g.get(["title"],false),g,"h").w('</a></h3><p class="search-results__description">').x(g.get(["highlight"],false),g,{"else":b,block:a},{}).w("</p></article>")
}d.__dustBody=!0;
function c(h,g){return h.w(".html")
}c.__dustBody=!0;
function b(h,g){return h.f(g.get(["description"],false),g,"h")
}b.__dustBody=!0;
function a(h,g){return h.f(g.get(["highlight"],false),g,"h",["s"])
}a.__dustBody=!0;
return e
}(dust));
(function(b){b.register("select-filter-tag",a);
function a(d,c){return d.w('<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc--><li class="select-filter-tag" data-value="').f(c.get(["value"],false),c,"h").w('">').f(c.get(["text"],false),c,"h",["s"]).w('<button class="select-unselect-tag ').f(c.get(["customClass"],false),c,"h").w('"><span class="is-a11y-only">').f(c.get(["text"],false),c,"h",["s"]).w(" ").h("i18n",c,{},{key:"component.multi-select-filter.remove-button"},"h").w("</span></button></li>")
}a.__dustBody=!0;
return a
}(dust));
(function(b){b.register("wechat-popup",a);
function a(d,c){return d.w('<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc--><div role="dialog" aria-labelledby="wechat-popup-title" class="wechat-popup"><div class="wechat-popup__head"><h4 id="wechat-popup-title" class="wechat-popup__id"></h4><button class="wechat-popup__close"><span class="is-a11y-only">').h("i18n",c,{},{key:"component.general.popup.close"},"h").w('</span></button></div><div class="wechat-popup__wrapper"><img src="" alt="QrCode" class="wechat-popup__qr"></div></div>')
}a.__dustBody=!0;
return a
}(dust));
(function(f){f.register("detail-pages-list",m);
function m(q,p){return q.w("<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc-->").s(p.get(["pages"],false),p,{block:k},{})
}m.__dustBody=!0;
function k(q,p){return q.w('<li class="detail-pages-list__item').h("gte",p,{block:i},{key:p.get(["$idx"],false),value:p.get(["lastRowIdx"],false)},"h").w('"><a class="detail-pages-list__link" href="').f(p.get(["path"],false),p,"h").x(p.get(["isAuthor"],false),p,{block:h},{}).w('"><div class="detail-pages-list__img"><div style="background-image: url(\'').x(p.get(["filterImage"],false),p,{"else":g,block:e},{}).w("')\">").x(p.get(["contentReference"],false),p,{block:d},{}).w('</div></div><div class="detail-pages-list__content"><h5 class="detail-pages-list__title">').f(p.get(["title"],false),p,"h").w('</h5><ul class="detail-pages-list__tag-list">').s(p.getPath(false,["contentType","localizedTitle"]),p,{block:a},{}).h("eq",p,{"else":o,block:l},{key:p.get(["viewType"],false),value:"careers-blog"},"h").w("</ul></div></a></li>")
}k.__dustBody=!0;
function i(q,p){return q.w(" detail-pages-list__item-last-row")
}i.__dustBody=!0;
function h(q,p){return q.w(".html")
}h.__dustBody=!0;
function g(q,p){return q.f(p.get(["defaultImage"],false),p,"h")
}g.__dustBody=!0;
function e(q,p){return q.f(p.get(["filterImage"],false),p,"h")
}e.__dustBody=!0;
function d(q,p){return q.h("eq",p,{block:c},{key:p.get(["contentReferenceLabelsView"],false),value:"yellow-label"},"h").h("eq",p,{block:b},{key:p.get(["contentReferenceLabelsView"],false),value:"white-box"},"h")
}d.__dustBody=!0;
function c(q,p){return q.w('<strong class="detail-pages-list__label">').h("i18n",p,{},{key:"component.detail-pages-filter.content-reference-label"},"h").w("</strong>")
}c.__dustBody=!0;
function b(q,p){return q.w('<span class="detail-pages-list__white-label-container"><svg class="detail-pages-list__white-label"><use xlink:href="/etc/designs/epam-com/images/continuum/logo.svg#logo"/></svg></span>')
}b.__dustBody=!0;
function a(q,p){return q.w('<li class="detail-pages-list__tag detail-pages-list__tag--content-type">').f(p.getPath(false,["contentType","localizedTitle"]),p,"h").w("</li>")
}a.__dustBody=!0;
function o(q,p){return q.s(p.get(["filteredIndustries"],false),p,{block:n},{})
}o.__dustBody=!0;
function n(q,p){return q.w('<li class="detail-pages-list__tag">').f(p.get(["localizedTitle"],false),p,"h").w("</li>")
}n.__dustBody=!0;
function l(q,p){return q.s(p.get(["filteredCareersBlogTopics"],false),p,{block:j},{})
}l.__dustBody=!0;
function j(q,p){return q.w('<li class="detail-pages-list__tag">').f(p.get(["localizedTitle"],false),p,"h").w("</li>")
}j.__dustBody=!0;
return m
}(dust));
(function(f){f.register("events-viewer-items",k);
function k(n,m){return n.w("<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc-->").s(m.get(["content"],false),m,{block:j},{})
}k.__dustBody=!0;
function j(n,m){return n.w('<li class="events-viewer__item"><time class="events-viewer__date">').f(m.get(["dateRange"],false),m,"h").w('</time><h3 class="events-viewer__title"><a href="').f(m.get(["pagePath"],false),m,"h").x(m.get(["isAuthor"],false),m,{block:i},{}).w('">').f(m.get(["title"],false),m,"h").w('</a></h3><div class="events-viewer__details">').s(m.get(["format"],false),m,{"else":h,block:e},{}).w('</div><div class="events-viewer__details">').f(m.get(["audience"],false),m,"h").w('</div><div class="events-viewer__details">').f(m.get(["comments"],false),m,"h").w('</div><div class="events-viewer__details">').f(m.get(["locationString"],false),m,"h").w('</div><time class="events-viewer__details">').f(m.get(["time"],false),m,"h").w('</time><div class="events-viewer__button-wrapper"><a class="button-ui bg-color-light-blue" href="').f(m.get(["pagePath"],false),m,"h").x(m.get(["isAuthor"],false),m,{block:b},{}).w('"><span class="button__content">').h("eq",m,{"else":a,block:l},{key:m.get(["category"],false),value:"upcoming"},"h").w("</span></a></div></li>")
}j.__dustBody=!0;
function i(n,m){return n.w(".html")
}i.__dustBody=!0;
function h(n,m){return n.s(m.get(["place"],false),m,{block:g},{})
}h.__dustBody=!0;
function g(n,m){return n.f(m.get(["place"],false),m,"h")
}g.__dustBody=!0;
function e(n,m){return n.s(m.get(["place"],false),m,{"else":d,block:c},{})
}e.__dustBody=!0;
function d(n,m){return n.f(m.get(["format"],false),m,"h")
}d.__dustBody=!0;
function c(n,m){return n.f(m.get(["format"],false),m,"h").w(" | ").f(m.get(["place"],false),m,"h")
}c.__dustBody=!0;
function b(n,m){return n.w(".html")
}b.__dustBody=!0;
function a(n,m){return n.h("i18n",m,{},{key:"component.events-viewer.learn-more"},"h")
}a.__dustBody=!0;
function l(n,m){return n.h("i18n",m,{},{key:"component.upcoming-event.meet-us"},"h")
}l.__dustBody=!0;
return k
}(dust));
(function(f){f.register("news-list",l);
function l(p,o){return p.w("<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc-->").s(o.get(["pages"],false),o,{block:j},{})
}l.__dustBody=!0;
function j(p,o){return p.w('<li class="news-filter__item"><article>').s(o.get(["dateString"],false),o,{block:i},{}).w('<h3 class="news-filter__title"><a href="').f(o.get(["path"],false),o,"h").x(o.get(["isAuthor"],false),o,{block:h},{}).w('">').f(o.get(["title"],false),o,"h").w('</a></h3><div class="news-filter__share-wrapper"><div class="news-filter__share"><button class="news-filter__share-button" aria-label="Share menu">').h("i18n",o,{},{key:"component.news-filter.share"},"h").w('</button><ul class="news-filter__icons-list" aria-label="Share links">').s(o.get(["socialIcons"],false),o,{block:g},{}).w("</ul></div></div></article></li>")
}j.__dustBody=!0;
function i(p,o){return p.w('<time class="news-filter__date">').f(o.getPath(true,[]),o,"h").w("</time>")
}i.__dustBody=!0;
function h(p,o){return p.w(".html")
}h.__dustBody=!0;
function g(p,o){return p.w('<li class="news-filter__icon-item" tabindex="0" role="link" aria-label="').h("eq",o,{block:e},{key:d,value:"fb"},"h").h("eq",o,{block:c},{key:b,value:"tw"},"h").h("eq",o,{block:a},{key:n,value:"li"},"h").h("eq",o,{block:m},{key:k,value:"vk"},"h").w('"><a class="news-filter__social-link" data-type="').f(o.getPath(true,[]),o,"h").w('" data-url="').f(o.get(["origin"],false),o,"h").f(o.get(["path"],false),o,"h").w('"data-count_url="').f(o.get(["origin"],false),o,"h").f(o.get(["path"],false),o,"h").w('" data-share_title="').f(o.get(["title"],false),o,"h").w('"><svg><use xlink:href="').f(o.get(["spritePath"],false),o,"h").w("#icon-").f(o.getPath(true,[]),o,"h").w('"/></svg></a></li>')
}g.__dustBody=!0;
function e(p,o){return p.w("Facebook")
}e.__dustBody=!0;
function d(p,o){return p.f(o.getPath(true,[]),o,"h")
}d.__dustBody=!0;
function c(p,o){return p.w("Twitter")
}c.__dustBody=!0;
function b(p,o){return p.f(o.getPath(true,[]),o,"h")
}b.__dustBody=!0;
function a(p,o){return p.w("LinkedIn")
}a.__dustBody=!0;
function n(p,o){return p.f(o.getPath(true,[]),o,"h")
}n.__dustBody=!0;
function m(p,o){return p.w("VK")
}m.__dustBody=!0;
function k(p,o){return p.f(o.getPath(true,[]),o,"h")
}k.__dustBody=!0;
return l
}(dust));
(function(a){a.register("recruiting-search-result",n);
function n(v,u){return v.w("<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc-->").s(u.get(["list"],false),u,{block:m},{})
}n.__dustBody=!0;
function m(v,u){return v.w('<li class="search-result__item"><div class="search-result__item-info"><h5><a class="search-result__item-name" href="').f(u.get(["url"],false),u,"h").w('">').f(u.get(["name"],false),u,"h").w('</a></h5><strong class="search-result__location">').x(u.get(["remote"],false),u,{"else":k,block:i},{}).w('</strong><ul class="search-result__item-types">').x(u.get(["urgent"],false),u,{block:c},{}).x(u.get(["nowOpen"],false),u,{block:b},{}).x(u.get(["office"],false),u,{block:t},{}).x(u.get(["remote"],false),u,{block:s},{}).x(u.get(["relocation"],false),u,{block:r},{}).w("</ul>").x(u.get(["continuum"],false),u,{block:q},{}).w('</div><p class="search-result__item-description">').f(u.get(["shortDescription"],false),u,"h",["s"]).w("</p>").x(u.get(["showFooter"],false),u,{block:p},{}).w("</li>")
}m.__dustBody=!0;
function k(v,u){return v.f(u.get(["displayedLocation"],false),u,"h")
}k.__dustBody=!0;
function i(v,u){return v.x(u.get(["office"],false),u,{"else":g,block:e},{})
}i.__dustBody=!0;
function g(v,u){return v.h("i18n",u,{},{key:"component.general.vacancy.remote-location-label",locale:f},"h")
}g.__dustBody=!0;
function f(v,u){return v.f(u.get(["language"],false),u,"h")
}f.__dustBody=!0;
function e(v,u){return v.f(u.get(["displayedLocation"],false),u,"h").h("i18n",u,{},{key:"component.general.vacancy.remote-label",locale:d},"h")
}e.__dustBody=!0;
function d(v,u){return v.f(u.get(["language"],false),u,"h")
}d.__dustBody=!0;
function c(v,u){return v.w('<li class="search-result__item-type search-result__item-type--hot">Hot</li>')
}c.__dustBody=!0;
function b(v,u){return v.w('<li class="search-result__item-type search-result__item-type--hot">').h("i18n",u,{},{key:"component.training-search.sorting.open"},"h").w("</li>")
}b.__dustBody=!0;
function t(v,u){return v.w('<li class="search-result__item-type search-result__item-type--remote"><span class="search-result__item-icon tooltip" data-title=\'').h("i18n",u,{},{key:"component.general.vacancy.office-tooltip"},"h").w('\'><svg class="icon"><use xlink:href="').f(u.get(["spritePath"],false),u,"h").w('#icon-office"></use></svg></span></li>')
}t.__dustBody=!0;
function s(v,u){return v.w('<li class="search-result__item-type search-result__item-type--remote"><span class="search-result__item-icon tooltip tooltip--multiline" data-title=\'').h("i18n",u,{},{key:"component.general.vacancy.remote-tooltip"},"h").w('\'><svg class="icon"><use xlink:href="').f(u.get(["spritePath"],false),u,"h").w('#icon-work-anywhere"></use></svg></span></li>')
}s.__dustBody=!0;
function r(v,u){return v.w('<li class="search-result__item-type search-result__item-type--relocation"><span class="is-a11y-only">').h("i18n",u,{},{key:"component.job-search.filter.relocation-help"},"h").w('</span><span class="search-result__item-icon tooltip" data-title=\'').h("i18n",u,{},{key:"component.job-search.filter.relocation-help"},"h").w('\'><svg class="icon"><use xlink:href="').f(u.get(["spritePath"],false),u,"h").w('#icon-relocation"></use></svg></span></li>')
}r.__dustBody=!0;
function q(v,u){return v.w('<span class="search-result__logo-wrapper"><svg class="search-result__logo"><use xlink:href="/etc/designs/epam-com/images/continuum/logo.svg#logo"/></svg></span>')
}q.__dustBody=!0;
function p(v,u){return v.w('<div class="search-result__item-footer search-result__clearfix"><div class="search-result__item-wrapper"><div class="search-result__item-controls"><a href="').f(u.get(["url"],false),u,"h").w('" class="search-result__item-apply">').h("i18n",u,{},{key:"component.job-search.apply"},"h").w("</a><div class='search-result__wrapper-link'>").x(u.get(["externalReferralFormLink"],false),u,{block:o},{}).x(u.get(["socialIcons"],false),u,{"else":l,block:j},{}).w("</div>")
}p.__dustBody=!0;
function o(v,u){return v.w('<span class="search-result__share-button-holder search-result__refer-button-holder"><a class="search-result__share-button search-result__refer-button" href="').f(u.get(["externalReferralFormLink"],false),u,"h").w('"data-gtm-label="').f(u.get(["gtmLabel"],false),u,"h").w('"data-gtm-category="referral-link"data-gtm-action="click">').h("i18n",u,{},{key:"component.job-search.refer"},"h").w("</a></span>")
}o.__dustBody=!0;
function l(v,u){return v.w("</div></div>")
}l.__dustBody=!0;
function j(v,u){return v.w('<span class="search-result__share-button-holder"><button class="search-result__share-button search-result__share-button-socials">').h("i18n",u,{},{key:"component.job-search.share"},"h").w('</button><ul class="search-result__icons-list">').s(u.get(["socialIcons"],false),u,{block:h},{}).w("</ul></span></div></div></div>")
}j.__dustBody=!0;
function h(v,u){return v.w('<li class="search-result__icon-item"><a class="search-result__social-link" data-type="').f(u.get(["type"],false),u,"h").w('" data-url="').f(u.get(["url"],false),u,"h").w('"data-share_title="').f(u.get(["name"],false),u,"h").w('" data-utm-content="job_listing_share_button" tabindex="0"><span class="is-a11y-only">').f(u.get(["title"],false),u,"h").w('</span><span class="is-a11y-only">').h("i18n",u,{},{key:"component.general.pop-up-warning"},"h").w('</span><svg><use xlink:href="').f(u.get(["spritePath"],false),u,"h").w("#icon-").f(u.get(["type"],false),u,"h").w('"/></svg></a></li>')
}h.__dustBody=!0;
return n
}(dust));
(function(f){f.register("detail-pages-list-23",k);
function k(o,n){return o.w("<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc-->").s(n.get(["pages"],false),n,{block:j},{})
}k.__dustBody=!0;
function j(o,n){return o.w('<li class="detail-pages-list-23__item').h("gte",n,{block:i},{key:n.get(["$idx"],false),value:n.get(["lastRowIdx"],false)},"h").w('"><a class="detail-pages-list-23__link" href="').f(n.get(["path"],false),n,"h").x(n.get(["isAuthor"],false),n,{block:h},{}).w('"><ul class="detail-pages-list-23__type-list">').s(n.getPath(false,["contentType","localizedTitle"]),n,{block:g},{}).w('</ul><div class="detail-pages-list-23__img"><img class="detail-pages-list-23__img-inner" src="').x(n.get(["filterImage"],false),n,{"else":e,block:d},{}).w('" alt=""/>').s(n.get(["contentReference"],false),n,{block:c},{}).w('</div><ul class="detail-pages-list-23__tag-list">').h("eq",n,{"else":b,block:m},{key:n.get(["viewType"],false),value:"careers-blog"},"h").w('</ul><div class="detail-pages-list-23__content"><h5 class="detail-pages-list-23__title">').f(n.get(["title"],false),n,"h").w('</h5><span class="detail-pages-list-23__arrow"><svg width="24" height="12" viewBox="0 0 24 12" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.7849 0.220747L23.1721 5.01708C23.5026 5.3114 23.5026 5.7886 23.1721 6.08293L17.7849 10.8793C17.4544 11.1736 16.9184 11.1736 16.5878 10.8793C16.2572 10.5849 16.2572 10.1077 16.5878 9.8134L20.5298 6.30367L-5.51084e-07 6.30367L-4.19308e-07 4.79633L20.5298 4.79633L16.5878 1.2866C16.2572 0.992271 16.2572 0.515073 16.5878 0.220747C16.9184 -0.0735802 17.4544 -0.0735802 17.7849 0.220747Z" /></svg></span></div></a></li>')
}j.__dustBody=!0;
function i(o,n){return o.w(" detail-pages-list-23__item-last-row")
}i.__dustBody=!0;
function h(o,n){return o.w(".html")
}h.__dustBody=!0;
function g(o,n){return o.w('<li class="detail-pages-list-23__type detail-pages-list-23__type--content">').f(n.getPath(false,["contentType","localizedTitle"]),n,"h").w("</li>")
}g.__dustBody=!0;
function e(o,n){return o.f(n.get(["defaultImage"],false),n,"h")
}e.__dustBody=!0;
function d(o,n){return o.f(n.get(["filterImage"],false),n,"h")
}d.__dustBody=!0;
function c(o,n){return o.w('<div class="detail-pages-list-23__continuum-container"><p class="detail-pages-list-23__continuum">EPAM<span class="detail-pages-list-23__continuum--normal-weight"> CONTINUUM</span></p></div>')
}c.__dustBody=!0;
function b(o,n){return o.s(n.get(["filteredIndustries"],false),n,{block:a},{})
}b.__dustBody=!0;
function a(o,n){return o.w('<li class="detail-pages-list-23__tag">').f(n.get(["localizedTitle"],false),n,"h").w("</li>")
}a.__dustBody=!0;
function m(o,n){return o.s(n.get(["filteredCareersBlogTopics"],false),n,{block:l},{})
}m.__dustBody=!0;
function l(o,n){return o.w('<li class="detail-pages-list-23__tag">').f(n.get(["localizedTitle"],false),n,"h").w("</li>")
}l.__dustBody=!0;
return k
}(dust));
(function(f){f.register("events-viewer23-items",k);
function k(m,l){return m.w("<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc-->").s(l.get(["content"],false),l,{block:j},{})
}k.__dustBody=!0;
function j(m,l){return m.w('<li class="events-viewer23__item"><div class="events-viewer23__arrow-wrapper"><a tabindex="-1" focusable="false" aria-hidden="true" href="').f(l.get(["pagePath"],false),l,"h").x(l.get(["isAuthor"],false),l,{block:i},{}).w('"><svg class="svg-link-arrow independent-svg-link-arrow" viewBox="0 0 34 16"><path d="M33.574 8.707a1 1 0 0 0 0-1.414L27.21.929a1 1 0 1 0-1.415 1.414L31.452 8l-5.657 5.657a1 1 0 0 0 1.415 1.414l6.364-6.364ZM0 9h32.867V7H0v2Z"/></svg></a></div><time class="events-viewer23__date">').f(l.get(["dateRange"],false),l,"h").w('</time><p class="events-viewer23__title"><a href="').f(l.get(["pagePath"],false),l,"h").x(l.get(["isAuthor"],false),l,{block:h},{}).w('" class="events-viewer23__title-link custom-link link-with-bottom-arrow color-link body-text-900">').f(l.get(["title"],false),l,"h").w('</a></p><div class="events-viewer23__venue">').s(l.get(["format"],false),l,{"else":g,block:d},{}).w('</div><div class="events-viewer23__location">').f(l.get(["locationString"],false),l,"h").w("</div>").x(l.get(["contentReference"],false),l,{block:a},{}).w("</li>")
}j.__dustBody=!0;
function i(m,l){return m.w(".html")
}i.__dustBody=!0;
function h(m,l){return m.w(".html")
}h.__dustBody=!0;
function g(m,l){return m.s(l.get(["place"],false),l,{block:e},{})
}g.__dustBody=!0;
function e(m,l){return m.f(l.get(["place"],false),l,"h")
}e.__dustBody=!0;
function d(m,l){return m.s(l.get(["place"],false),l,{"else":c,block:b},{})
}d.__dustBody=!0;
function c(m,l){return m.f(l.get(["format"],false),l,"h")
}c.__dustBody=!0;
function b(m,l){return m.f(l.get(["format"],false),l,"h").w(" | ").f(l.get(["place"],false),l,"h")
}b.__dustBody=!0;
function a(m,l){return m.w('<div class="events-viewer23__content-reference"><span class="events-viewer23__content-reference-bold">epam </span><span>').f(l.get(["contentReference"],false),l,"h").w("</span></div>")
}a.__dustBody=!0;
return k
}(dust));
(function(f){f.register("news-list-23",k);
function k(n,m){return n.w("<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc-->").s(m.get(["pages"],false),m,{block:j},{})
}k.__dustBody=!0;
function j(n,m){return n.w('<li class="news-filter-23__item"><div class="news-filter-23__item-border"><article><div class="news-filter-23__item-content">').s(m.get(["dateString"],false),m,{block:i},{}).w('<h3 class="news-filter-23__title"><a href="').f(m.get(["path"],false),m,"h").x(m.get(["isAuthor"],false),m,{block:h},{}).w('" class="link-with-bottom-arrow color-link body-text font-700">').f(m.get(["title"],false),m,"h").w('<svg class="svg-link-arrow"><use xlink:href="').f(m.get(["spritePath"],false),m,"h").w('#icon-pointing-arrow"/></svg></a></h3></div><div class="news-filter-23__share-wrapper"><div class="news-filter-23__share"><ul class="news-filter-23__icons-list" aria-label="Share links">').s(m.get(["socialIcons"],false),m,{block:g},{}).w("</ul></div></div></article><div></li>")
}j.__dustBody=!0;
function i(n,m){return n.w('<time class="news-filter-23__date">').f(m.getPath(true,[]),m,"h").w("</time>")
}i.__dustBody=!0;
function h(n,m){return n.w(".html")
}h.__dustBody=!0;
function g(n,m){return n.w('<li class="news-filter-23__icon-item" tabindex="0" role="link" aria-label="').h("eq",m,{block:e},{key:d,value:"fb"},"h").h("eq",m,{block:c},{key:b,value:"tw"},"h").h("eq",m,{block:a},{key:l,value:"li"},"h").w('"><a class="news-filter-23__social-link icon-').f(m.getPath(true,[]),m,"h").w('-sm-gradient" data-type="').f(m.getPath(true,[]),m,"h").w('" data-url="').f(m.get(["origin"],false),m,"h").f(m.get(["path"],false),m,"h").w('"data-count_url="').f(m.get(["origin"],false),m,"h").f(m.get(["path"],false),m,"h").w('" data-share_title="').f(m.get(["title"],false),m,"h").w('"></a></li>')
}g.__dustBody=!0;
function e(n,m){return n.w("Facebook")
}e.__dustBody=!0;
function d(n,m){return n.f(m.getPath(true,[]),m,"h")
}d.__dustBody=!0;
function c(n,m){return n.w("Twitter")
}c.__dustBody=!0;
function b(n,m){return n.f(m.getPath(true,[]),m,"h")
}b.__dustBody=!0;
function a(n,m){return n.w("LinkedIn")
}a.__dustBody=!0;
function l(n,m){return n.f(m.getPath(true,[]),m,"h")
}l.__dustBody=!0;
return k
}(dust));
(function(a){a.register("recruiting-search-23-result",o);
function o(w,v){return w.w("<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc-->").s(v.get(["list"],false),v,{block:n},{})
}o.__dustBody=!0;
function n(w,v){return w.w('<li class="search-result__item"><div class="search-result__share-button-menu"><div class="menu"><div class="menu-close-icon"></div><div class="menu-share-icon icon-share-lg-gradient"></div></div><div class="menu-share-label small-preheader">').h("i18n",v,{},{key:"component.job-search.share"},"h").w('</div><ul class="search-result__icons-list">').s(v.get(["socialIcons"],false),v,{block:l},{}).w('</ul></div><div class="search-result__item-info"><div class="search-result__item-info-group"><div class="search-result__item-name-section"><h5><a class="search-result__item-name-23 heading-5" href="').f(v.get(["url"],false),v,"h").w('">').f(v.get(["name"],false),v,"h").w('</a></h5><span class="search-result__share-button-holder"><button class="search-result__share-button-23 search-result__share-button-socials icon-share-lg-gradient"></button></span></div><strong class="search-result__location-23 list">').x(v.get(["remote"],false),v,{"else":j,block:h},{}).w('</strong></div><ul class="search-result__item-types">').x(v.get(["urgent"],false),v,{block:b},{}).x(v.get(["nowOpen"],false),v,{block:u},{}).x(v.get(["office"],false),v,{block:t},{}).x(v.get(["remote"],false),v,{block:s},{}).x(v.get(["relocation"],false),v,{block:r},{}).w("</ul>").x(v.get(["continuum"],false),v,{block:q},{}).w('</div><div class="search-result-description-section"><p class="search-result__item-description body-text">').f(v.get(["shortDescription23"],false),v,"h",["s"]).w("</p>").x(v.get(["showFooter"],false),v,{block:p},{}).w("</div></li>")
}n.__dustBody=!0;
function l(w,v){return w.w('<li class="search-result__icon-item"><a class="search-result__social-link" data-type="').f(v.get(["type"],false),v,"h").w('" data-url="').f(v.get(["url"],false),v,"h").w('"data-share_title="').f(v.get(["name"],false),v,"h").w('" data-utm-content="job_listing_share_button" tabindex="0"><div class="icon-').f(v.get(["type"],false),v,"h").w('-gradient"></div><span class="menu-link-label">').f(v.get(["title"],false),v,"h").w('</span><span class="is-a11y-only">').f(v.get(["title"],false),v,"h").w('</span><span class="is-a11y-only">').h("i18n",v,{},{key:"component.general.pop-up-warning"},"h").w("</span></a></li>")
}l.__dustBody=!0;
function j(w,v){return w.f(v.get(["displayedLocation"],false),v,"h")
}j.__dustBody=!0;
function h(w,v){return w.x(v.get(["office"],false),v,{"else":f,block:d},{})
}h.__dustBody=!0;
function f(w,v){return w.h("i18n",v,{},{key:"component.general.vacancy.remote-location-label",locale:e},"h")
}f.__dustBody=!0;
function e(w,v){return w.f(v.get(["language"],false),v,"h")
}e.__dustBody=!0;
function d(w,v){return w.f(v.get(["displayedLocation"],false),v,"h").h("i18n",v,{},{key:"component.general.vacancy.remote-label",locale:c},"h")
}d.__dustBody=!0;
function c(w,v){return w.f(v.get(["language"],false),v,"h")
}c.__dustBody=!0;
function b(w,v){return w.w('<li class="search-result__item-type  search-result__item-type--hot ">Hot</li>')
}b.__dustBody=!0;
function u(w,v){return w.w('<li class="search-result__item-type search-result__item-type--hot">').h("i18n",v,{},{key:"component.training-search.sorting.open"},"h").w("</li>")
}u.__dustBody=!0;
function t(w,v){return w.w('<li class="search-result__item-type search-result__item-type--remote"><span class="search-result__item-icon tooltip" data-title=\'').h("i18n",v,{},{key:"component.general.vacancy.office-tooltip"},"h").w('\'><svg class="icon"><use xlink:href="').f(v.get(["spritePath"],false),v,"h").w('#icon-office-23"></use></svg></span></li>')
}t.__dustBody=!0;
function s(w,v){return w.w('<li class="search-result__item-type search-result__item-type--remote"><span class="search-result__item-icon tooltip tooltip--multiline" data-title=\'').h("i18n",v,{},{key:"component.general.vacancy.remote-tooltip"},"h").w('\'><svg class="icon"><use xlink:href="').f(v.get(["spritePath"],false),v,"h").w('#icon-remote-23"></use></svg></span></li>')
}s.__dustBody=!0;
function r(w,v){return w.w('<li class="search-result__item-type search-result__item-type--relocation"><span class="is-a11y-only">').h("i18n",v,{},{key:"component.job-search.filter.relocation-help"},"h").w('</span><span class="search-result__item-icon tooltip" data-title=\'').h("i18n",v,{},{key:"component.job-search.filter.relocation-help"},"h").w('\'><svg class="icon"><use xlink:href="').f(v.get(["spritePath"],false),v,"h").w('#icon-relocate-23"></use></svg></span></li>')
}r.__dustBody=!0;
function q(w,v){return w.w('<span class="search-result__logo-wrapper"><svg class="search-result__logo"><use xlink:href="/etc/designs/epam-com/images/continuum/logo.svg#logo"/></svg></span>')
}q.__dustBody=!0;
function p(w,v){return w.w('<div class="search-result__item-footer search-result__clearfix"><div class="search-result__item-wrapper">').x(v.get(["externalReferralFormLink"],false),v,{block:m},{}).x(v.get(["socialIcons"],false),v,{"else":k,block:i},{}).w("</div>")
}p.__dustBody=!0;
function m(w,v){return w.w("<div class='search-result__wrapper-link'><span class=\"search-result__share-button-holder search-result__refer-button-holder\"><a  class='custom-link link-with-right-arrow color-link body-text font-900'href=\"").f(v.get(["externalReferralFormLink"],false),v,"h").w('"data-gtm-label="').f(v.get(["gtmLabel"],false),v,"h").w('"data-gtm-category="referral-link"data-gtm-action="click">').h("i18n",v,{},{key:"component.job-search.refer"},"h").w("<span class='link-arrow'></span></a></span></div>")
}m.__dustBody=!0;
function k(w,v){return w.w("</div></div>")
}k.__dustBody=!0;
function i(w,v){return w.w('<span class="search-result__share-button-holder desktop"><button class="search-result__share-button-23 search-result__share-button-socials icon-share-lg-gradient"></button><ul class="search-result__icons-list">').s(v.get(["socialIcons"],false),v,{block:g},{}).w('</ul></span><div class="search-result__item-controls"><a href="').f(v.get(["url"],false),v,"h").w('" class="button-text primary-button-preset white-background-preset search-result__item-apply-23"></a></div></div>')
}i.__dustBody=!0;
function g(w,v){return w.w('<li class="search-result__icon-item"><a class="search-result__social-link" data-type="').f(v.get(["type"],false),v,"h").w('" data-url="').f(v.get(["url"],false),v,"h").w('"data-share_title="').f(v.get(["name"],false),v,"h").w('" data-utm-content="job_listing_share_button" tabindex="0"><div class="icon-').f(v.get(["type"],false),v,"h").w('-gradient"></div><span class="is-a11y-only">').f(v.get(["title"],false),v,"h").w('</span><span class="is-a11y-only">').h("i18n",v,{},{key:"component.general.pop-up-warning"},"h").w("</span></a></li>")
}g.__dustBody=!0;
return o
}(dust));
(function(b){b.register("recruiting-search-no-result",a);
function a(d,c){return d.w('<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc--><div class="search-result__redirect-message"><h3 class="search-result__redirect-heading-23" role="alert" aria-live="assertive">').h("i18n",c,{},{key:"component.redesign23.job-search.result_header.no_query.redirect_en"},"h").w('</h3><h3 class="search-result__redirect-heading-23" role="alert" aria-live="assertive">').h("i18n",c,{},{key:"component.redesign23.job-search.result_header.no_query.redirect_uk"},"h").w('</h3><a class="search-result__redirect-button-23 button-ui-23 btn-focusable" href="https://careers.epam.ua/vacancies/job-listings" data-gtm-action="click" target="_blank"><span class="button__inner"><span class="button__content button__content--desktop">').h("i18n",c,{},{key:"component.redesign23.job-search.result_button"},"h").w('</span><span class="button__content button__content--mobile">').h("i18n",c,{},{key:"component.redesign23.job-search.result_button"},"h").w("</span></span></a></div>")
}a.__dustBody=!0;
return a
}(dust));
(function(f){f.register("search",e);
function e(h,g){return h.w("<!--All Rights Reserved. All information contained herein is, and remains the property of EPAM Systems, Inc.and/or its suppliers and is protected by international intellectual property law. Dissemination of thisinformation or reproduction of this material is strictly forbidden, unless prior written permission isobtained from EPAM Systems, Inc-->").s(g.get(["items"],false),g,{block:d},{})
}e.__dustBody=!0;
function d(h,g){return h.w('<article class="search-results__item"><h3 class="search-results__title"><a class="search-results__title-link" href="').f(g.get(["path"],false),g,"h").x(g.get(["isAuthor"],false),g,{block:c},{}).w('">').f(g.get(["title"],false),g,"h").w('</a></h3><p class="search-results__description">').x(g.get(["highlight"],false),g,{"else":b,block:a},{}).w("</p></article>")
}d.__dustBody=!0;
function c(h,g){return h.w(".html")
}c.__dustBody=!0;
function b(h,g){return h.f(g.get(["description"],false),g,"h")
}b.__dustBody=!0;
function a(h,g){return h.f(g.get(["highlight"],false),g,"h",["s"])
}a.__dustBody=!0;
return e
}(dust));