"use strict";
var _createClass=function(){function a(e,c){for(var b=0;
b<c.length;
b++){var d=c[b];
d.enumerable=d.enumerable||false;
d.configurable=true;
if("value" in d){d.writable=true
}Object.defineProperty(e,d.key,d)
}}return function(d,b,c){if(b){a(d.prototype,b)
}if(c){a(d,c)
}return d
}
}();
function _toConsumableArray(a){if(Array.isArray(a)){for(var c=0,b=Array(a.length);
c<a.length;
c++){b[c]=a[c]
}return b
}else{return Array.from(a)
}}function _classCallCheck(a,b){if(!(a instanceof b)){throw new TypeError("Cannot call a class as a function")
}}define("ColumnControl23",["media","utils"],function(e,b){var f={COLUMN_CONTROL_COLUMN:"colctrl__col",TEXT_UI:"text-ui-23",COLUMN_CONTROL_HOLDER:"colctrl__holder",TWO_COLUMNS_FOR_RESPONSIVE:"colctrl--two-columns-for-responsive",HIDE_COLUMN_ON_RESPONSIVE:" colctrl__col--hide-on-responsive",RESPONSIVE_COLUMN:["colctrl__col","colctrl__col--width-50","colctrl__col--hide-on-desktop"],RESPONSIVE_COLUMN_PADDINGS:["colctrl__col--top-0","colctrl__col--right-0","colctrl__col--bottom-0","colctrl__col--left-0"]};
var c={LOGICAL_BLOCK_ELEMENTS_NUMBER:2,RESPONSIVE_COLUMNS_NUMBER:2};
var a=["input","textarea"];
var d=function(){function p(u){var w=this;
_classCallCheck(this,p);
this.el=u[0];
this.twoColumnsForResponsive=this.el.classList.contains(f.TWO_COLUMNS_FOR_RESPONSIVE);
if(this.twoColumnsForResponsive){this.initResponsiveColumns();
if(this.originalColumnsHolders.length!==c.RESPONSIVE_COLUMNS_NUMBER){this.setColumns();
window.addEventListener("resize",b.debounceExtend(this.setColumns.bind(this),500))
}}var v=this.el.getAttribute("data-is-list");
v&&window.addEventListener("DOMContentLoaded",function(){w.items=w.getInteractiveItems();
w.items.length&&w.init()
})
}_createClass(p,[{key:"initResponsiveColumns",value:function t(){var x=this;
this.originalColumnsHolders=[].concat(_toConsumableArray(this.el.getElementsByClassName(f.COLUMN_CONTROL_HOLDER)));
if(this.originalColumnsHolders.length===c.RESPONSIVE_COLUMNS_NUMBER){return
}var w=this.originalColumnsHolders[0].parentElement?this.originalColumnsHolders[0].parentElement.tagName:"div";
var u=this.originalColumnsHolders[0].tagName;
this.originalColumnsElements=this.originalColumnsHolders.map(function(A){return[].concat(_toConsumableArray(A.children))
});
this.isResponsiveView=false;
[].concat(_toConsumableArray(this.el.children)).forEach(function(A){return A.classList+=f.HIDE_COLUMN_ON_RESPONSIVE
});
var v=[].concat(_toConsumableArray(this.el.querySelectorAll("."+f.COLUMN_CONTROL_HOLDER+" > *")));
var z=v.length/c.LOGICAL_BLOCK_ELEMENTS_NUMBER;
var y=Math.ceil(z/c.RESPONSIVE_COLUMNS_NUMBER)*c.LOGICAL_BLOCK_ELEMENTS_NUMBER;
this.responsiveColumnsElements=[v.slice(0,y),v.slice(y)];
this.responsiveColumnsHolders=this.responsiveColumnsElements.map(function(){var B;
var C=document.createElement(w);
var A=document.createElement(u);
(B=C.classList).add.apply(B,_toConsumableArray(f.RESPONSIVE_COLUMN).concat(_toConsumableArray(f.RESPONSIVE_COLUMN_PADDINGS)));
A.classList.add(f.COLUMN_CONTROL_HOLDER);
C.appendChild(A);
x.el.appendChild(C);
return A
})
}},{key:"setColumns",value:function s(){var v=this;
var u=window.matchMedia("(max-width: 767px)").matches;
if(u===this.isResponsiveView){return
}if(this.isResponsiveView){this.originalColumnsHolders.forEach(function(w,x){w.append.apply(w,_toConsumableArray(v.originalColumnsElements[x]))
})
}else{this.responsiveColumnsHolders.forEach(function(w,x){w.append.apply(w,_toConsumableArray(v.responsiveColumnsElements[x]))
})
}this.isResponsiveView=!this.isResponsiveView
}},{key:"getInteractiveItems",value:function q(){var u=this;
return Array.from(this.el.querySelectorAll("."+f.COLUMN_CONTROL_COLUMN)).map(function(w){var v=w.querySelectorAll("img, ."+f.TEXT_UI);
if(v.length===0){return w
}if(v.length===1){return v[0]
}return u.getClosestCommonParent(Array.from(v))
})
}},{key:"getClosestCommonParent",value:function h(u){var v=u[0];
while(v.parentNode){v=v.parentNode;
if(u.every(function(w){return v.contains(w)
})){return v
}}}},{key:"init",value:function r(){var u;
if(!window.accessibility){window.accessibility={startIndexes:[],items:[],indexOfCurrentItem:-1};
this.addEventListenerForNavigationOnPage();
this.addEventListenerForNavigationInList();
this.addEventListenerOnTabPress()
}this.createRefresherForIndexOfCurrentItem();
window.accessibility.startIndexes.push(window.accessibility.items.length);
(u=window.accessibility.items).push.apply(u,_toConsumableArray(this.items))
}},{key:"addEventListenerForNavigationOnPage",value:function l(){var u=this;
window.addEventListener("keydown",function(v){if(a.indexOf(v.target.tagName.toLowerCase())===-1){if(v.key.toLowerCase()==="l"){!v.shiftKey?u.changeIndexOfCurrentItem(u.findNextStartIndex()):u.changeIndexOfCurrentItem(u.findPreviousStartIndex())
}}})
}},{key:"findNextStartIndex",value:function n(){for(var u=0;
u<window.accessibility.startIndexes.length;
u++){if(window.accessibility.startIndexes[u]>window.accessibility.indexOfCurrentItem){return window.accessibility.startIndexes[u]
}}return -1
}},{key:"findPreviousStartIndex",value:function j(){for(var u=window.accessibility.startIndexes.length-1;
u>=0;
u--){if(window.accessibility.startIndexes[u]<window.accessibility.indexOfCurrentItem){return window.accessibility.startIndexes[u]
}}return -1
}},{key:"changeIndexOfCurrentItem",value:function i(u){if(u>=0&&u<=window.accessibility.items.length-1){window.accessibility.indexOfCurrentItem=u;
this.setFocusToCurrentItem()
}}},{key:"setFocusToCurrentItem",value:function o(){var w=window.accessibility.items[window.accessibility.indexOfCurrentItem];
var v=w.getAttribute("tabindex")&&w.getAttribute("tabindex")!=="-1";
if(!v){w.setAttribute("tabindex",0);
w.addEventListener("focusout",function u(){w.setAttribute("tabindex",-1);
w.removeEventListener("focusout",u)
})
}w.focus()
}},{key:"addEventListenerForNavigationInList",value:function m(){var u=this;
window.addEventListener("keydown",function(v){if(a.indexOf(v.target.tagName.toLowerCase())===-1){if(v.key==="ArrowRight"||!v.shiftKey&&v.key.toLowerCase()==="i"){u.changeIndexOfCurrentItem(window.accessibility.indexOfCurrentItem+1)
}else{if(v.key==="ArrowLeft"||v.shiftKey&&v.key.toLowerCase()==="i"){u.changeIndexOfCurrentItem(window.accessibility.indexOfCurrentItem-1)
}}}})
}},{key:"addEventListenerOnTabPress",value:function g(){window.addEventListener("keydown",function(u){if(u.key==="Tab"){setTimeout(function(){var v=window.accessibility.items.findIndex(function(w){return document.activeElement.compareDocumentPosition(w)!==Node.DOCUMENT_POSITION_PRECEDING
});
window.accessibility.indexOfCurrentItem=v===-1?window.accessibility.items.length-1:v
},0)
}})
}},{key:"createRefresherForIndexOfCurrentItem",value:function k(){this.items.forEach(function(u){u.addEventListener("focus",function(){window.accessibility.indexOfCurrentItem=window.accessibility.items.indexOf(u)
})
})
}}]);
return p
}();
d.moduleName="Column Control 23";
d.selector=".colctrl-ui-23";
return d
});
define("LocationsViewer23",["media","utils","SocialIcons","jquery-plugins"],function(b,h,d){var a=$(window),f=76,c=194,g=100;
var e={carousel:".locations-viewer-23__carousel",country:"locations-viewer-23__country",countryButton:".locations-viewer-23__country-btn",countryList:".locations-viewer-23__country-list",active:"active",owlLoaded:"owl-loaded",carouselButtons:".owl-nav button",nextLocationBtn:".locations-viewer-23__next-country-btn",activeCountry:".locations-viewer-23__country .active",activeCountryTile:".owl-item.active .locations-viewer-23__country",countryCounter:".locations-viewer-23__country-counter",horizontalScrollbar:".carousel-horizontal-scrollbar",horizontalScrollbarWrapper:".horizontal-scrollbar-wrapper",slider:".slider",progressBar:"slider__progress-bar",navigationContainer:"slider__navigation",pagination:"slider__pagination",sumPage:"slider__pagination--sum-page",currentPage:"slider__pagination--current-page",leftArrow:"slider__left-arrow",rightArrow:"slider__right-arrow",dot:"slider__dot"};
function i(o){this.$el=o;
this.$carousel=this.$el.find(e.carousel);
this.$countryCounter=this.$el.find(e.countryCounter);
this.$countryList=this.$el.find(e.countryList);
this.countryCount=this.$countryList.children().length;
this.$countryButton=this.$el.find(e.countryButton);
this.$horizontalScrollbar=this.$el.find(e.horizontalScrollbar);
this.$horizontalScrollbarWrapper=this.$el.find(e.horizontalScrollbarWrapper);
this.$nextLocationBtn=this.$el.find(e.nextLocationBtn);
this.windowWidth=a.width();
this.$slider=this.$el.find(e.slider);
this.currentCount=1;
this.isTablet=b.currentMode().greaterThan(b.modes.WideMobile);
var p={};
p[b.modes.WideMobile.start]={items:this.countryCount>2?2:this.countryCount};
p[b.modes.Desktop.start]={items:this.countryCount>3?3:this.countryCount};
p[b.modes.Broad.start]={items:this.countryCount>4?4:this.countryCount};
var m="ontouchstart" in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;
var n=window.innerWidth<992;
var l=$.extend({},this.config,{dots:false,lazyLoad:false,loop:!m&&!n,mouseDrag:!m,touchDrag:!m,nav:false,onInitialized:this.carouselInitialized.bind(this),navElement:'button type="button"',navText:["Previous card","Next card"]});
this.$el.attr("data-item-count",this.countryCount);
this.$parentTabItem=this.$carousel.parents(".js-tabs-item");
if(!this.$parentTabItem.length){this.$carousel.owlCarousel(l)
}a.on("tab.loaded tab.changed tab.change",function(){this.$parentTabItem.removeAttr("tabindex");
if(this.$carousel.parents(".js-tabs-item.active").length&&!this.$carousel.hasClass(e.owlLoaded)){this.$carousel.owlCarousel(l);
this.$carouselButtons=this.$carousel.find(e.carouselButtons);
this.addEventListenersToCarouselButtons();
this.addEventListenersToNextLocation()
}}.bind(this));
this.$actualElements=this.$carousel.find(".owl-item:not(.cloned)");
this.$countries=this.$carousel.find(".owl-item:not(.cloned) ."+e.country);
this.$carousel.on("click","."+e.country,this.carouselClickHandler.bind(this)).on("refreshed.owl.carousel",this.updateSelectors.bind(this)).on("translated.owl.carousel",this.onTranslated.bind(this));
a.on("resize orientationchange",function(){if(a.width()!==this.windowWidth){h.debounce(this.recalculateHeight(),g);
this.reInitCarousel(l).done(this.focusOnActive.bind(this))
}}.bind(this));
this.socialIcons=new d(this.$el);
h.addExtensionToPhoneNumber(this.$el);
this.isUrlContainsHash(l);
this.addEventListenersToCountryButtons(this.countryCount);
var k={};
var j={onChanged:this.setCurrentSlideCount.bind(this),onDrag:this.onDrag.bind(k),onDragged:this.onDragged.bind(k),onInitialized:this.onInitialized.bind(this),loop:true,margin:10,touchDrag:true,autoplay:false,navClass:[e.leftArrow,e.rightArrow],dotClass:e.dot,dotsClass:e.progressBar,navContainerClass:e.navigationContainer,responsiveRefreshRate:0,nav:true,navText:[" "," "],responsive:{0:{items:1},768:{items:2,slideBy:2}}};
this.$slider.owlCarousel(j);
var q=this.$el.find("."+e.leftArrow);
q.after('<div class="'+e.pagination+'"><span class="'+e.currentPage+'"></span><span class="'+e.sumPage+'"></span></div>')
}i.prototype.setHorizontalScrollbar=function(){var q=this.countryCount;
if(q<=4){return
}var l=this.$horizontalScrollbarWrapper.width();
this.$horizontalScrollbarWrapper.css({visibility:"visible"});
var x=this.$horizontalScrollbar;
var m=x.find(".horizontal-scrollbar-item");
var j=this.$carousel.find(".owl-stage");
j.on("mousedown",function(){u=true
});
var y=+j[0].style.width.slice(0,-2);
var s=1108*(Math.ceil(y/1108)/4);
var o=277*q/l;
m.css({width:l/q*4});
var w=l*2+l/q*4;
x.css({width:w,transform:"translateX(-"+l+"px)"});
var u=false;
var n=false;
var p=0;
var r=0;
var t=0;
function v(z){var k=j[0].style.transform.slice(13,-13);
r=parseInt((k-s)/o);
x.css({left:r+"px",transition:"left "+z+"s ease 0s"})
}this.$carousel.on("changed.owl.carousel",function(){setTimeout(function(){v(0)
},0)
});
x.on("mousedown",function(k){if(k.target.getAttribute("data-horizontal-scrollbar")==="item"){n=true;
p=k.clientX
}});
document.addEventListener("mouseup",function(){if(n){r=(r+t+l)%l
}n=false;
if(u){setTimeout(function(){v(1.5)
},0)
}u=false
});
document.addEventListener("mousemove",function(k){if(n){t=k.clientX-p;
x.css({left:(r+t)%l+"px",transition:"left 0s ease 0s"});
j.css({transform:"translate3d(-"+(s+(r+t+l)%l*o)+"px, 0px, 0px)",transition:"all 0s ease 0s"})
}if(u){v(0)
}})
};
i.prototype.setMobileCarouselView=function(){var j="ontouchstart" in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;
if(j){var k=this.$carousel.find(".owl-stage");
k.css({position:"relative",left:"-32px",width:"100vw","padding-left":"32px","padding-right":"calc(100vw - 229px + 8px + 32px)",transform:"none",transition:"none","overflow-x":"auto"})
}};
i.prototype.onInitialized=function(j){if(this.isTablet&&j.item.count!==1&&j.item.count%2!==0){j.item.count+=1;
j.relatedTarget._items.push($('<div class="owl-item"></div>'));
j.relatedTarget._mergers.push(1)
}};
i.prototype.openSlider=function(){var k={responsive:{0:{items:1},768:{items:2,slideBy:2}}};
var j=$.extend({},this.defaultSliderOptions,k);
this.$slider.trigger("refresh.owl.carousel",j)
};
i.prototype.onDrag=function(j){this.initialCurrent=j.relatedTarget.current()
};
i.prototype.onDragged=function(k){var j=k.relatedTarget;
j.current(this.initialCurrent);
if(j._drag.direction==="left"){j.next()
}if(j._drag.direction==="right"){j.prev()
}};
i.prototype.setSlidesTotal=function(){var k=this.$el.find("."+e.country+"."+e.active).data().cities;
var j=this.isTablet?Math.ceil(k/2).toString().padStart(2,"0"):k.toString().padStart(2,"0");
this.$el.find("."+e.sumPage).text(" / "+j)
};
i.prototype.addItem=function(){var j=this.$el.find('[data-country="'+this.currentActiveCountry+'"]').find(".owl-item:not(.cloned)");
if(this.isTablet&&j.length%2!==0){j.last().after('<div class="owl-item-placeholder" aria-hidden="true"></div>')
}};
i.prototype.setCurrentSlideCount=function(j){if(j.page.index===-1){this.currentCount=1
}else{this.currentCount=j.page.index+1
}this.$el.find("."+e.currentPage).text(this.currentCount.toString().padStart(2,"0"))
};
i.prototype.isUrlContainsHash=function(l){var k=window.location.href;
var m=new RegExp("(/?#.{1,})","i");
var j=m.test(k);
if(j){this.reInitCarousel(l).done(this.focusOnActive.bind(this))
}};
i.prototype.carouselInitialized=function(){this.$carouselButtons=this.$carousel.find(e.carouselButtons);
this.setHorizontalScrollbar();
this.setMobileCarouselView()
};
i.prototype.reInitCarousel=function(j){var k=$.Deferred();
setTimeout(function(){this.$carousel.trigger("to.owl.carousel");
this.$carousel.owlCarousel(j);
k.resolve()
}.bind(this),g);
return k.promise()
};
i.prototype.recalculateHeight=function(){if(!this.$countryList.hasClass(e.active)){return
}setTimeout(function(){this.$countryList.height(this.$opened.outerHeight())
}.bind(this),0)
};
i.prototype.scrollToList=function(k){var j=window.innerWidth>window.innerHeight&&b.currentMode().lessThan(b.modes.Tablet);
if(j&&k.hasClass(e.active)){return
}var l=j?-c:f;
this.$carousel.scrollToSelector({reservedSpace:l,duration:400})
};
i.prototype.updateSelectors=function(){this.$countries=this.$carousel.find(".owl-item:not(.cloned) ."+e.country);
this.setMobileCarouselView();
this.updateActiveCountryScrollPosition()
};
i.prototype.clearState=function(){this.$countries.removeClass(e.active);
this.$countryList.children().removeClass(e.active).attr("aria-hidden",true);
if(this.$carouselButtons){this.$carouselButtons.removeAttr("tabindex")
}};
i.prototype.updateHeight=function(){var j=this.$opened.outerHeight();
this.$countryList.toggleClass(e.active,!!j);
setTimeout(function(){this.$countryList.height(this.$opened.outerHeight())
}.bind(this),0)
};
i.prototype.onTranslated=function(){if(!this.currentActiveCountry){return
}this.$countries.filter('[data-country="'+this.currentActiveCountry+'"]').removeClass("active");
this.$el.find(".owl-item.active").find('[data-country="'+this.currentActiveCountry+'"]').addClass("active")
};
i.prototype.carouselClickHandler=function(j){this.toggleExpand(j);
this.updateCountryCounterLabel();
this.addItem();
this.openSlider();
this.setSlidesTotal()
};
i.prototype.toggleActiveCountry=function(k,o,n){this.$el.find(".locations-viewer-23__country .locations-viewer-23__country-title").removeClass("active");
if(!n){this.$el.find('.locations-viewer-23__country[data-country="'+o+'"] .locations-viewer-23__country-title').addClass("active")
}var p=this.$carousel.find(".owl-stage");
var m="ontouchstart" in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;
if(m){var l=$(p).scrollLeft();
var j=$(k).offset().left;
$(p).animate({scrollLeft:l+j-32},400)
}};
i.prototype.updateActiveCountryScrollPosition=function(){var m=this.$carousel.find(".owl-stage");
var j=this.$el.find(e.activeCountry);
var l="ontouchstart" in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;
if(l&&j.length){var k=$(j).offset().left;
$(m).scrollLeft(k-32)
}};
i.prototype.toggleExpand=function(l){var j=$(l.currentTarget),m=j.data("country");
this.$opened=this.$countryList.find('[data-country="'+m+'"]');
var k=this.$opened.hasClass(e.active);
this.currentActiveCountry=k?null:m;
this.toggleActiveCountry(j,m,k);
this.toggleBlock(k,m,j);
this.updateHeight();
this.scrollToList(j)
};
i.prototype.updateCountryCounterLabel=function(){var k=this.$el.find('.locations-viewer-23__country[data-country="'+this.currentActiveCountry+'"]');
if(k.length>0){var l=k[0].dataset.cities;
var j=l>=2?"locations":"location";
var m=l+" "+j;
this.$countryCounter.html(m);
this.$countryCounter.removeClass("hidden")
}else{this.$countryCounter.addClass("hidden")
}};
i.prototype.toggleBlock=function(r,l,p){this.clearState();
var q=this.$countries.filter('[data-country="'+l+'"]'),m=this.$carousel.find(".owl-item.active").find(e.countryButton),j=p.find("button"),n=this.$carousel.find(e.countryButton),o=this.$countries.index(q);
q.toggleClass(e.active,!r);
this.$opened.toggleClass(e.active,!r);
this.$carousel.toggleClass(e.active,!r);
var k="ontouchstart" in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;
if(!k){this.$carousel.trigger("to.owl.carousel",[o,300])
}if(!r){this.$opened.removeAttr("aria-hidden");
if(this.$carouselButtons){this.$carouselButtons.attr("tabindex","-1")
}n.attr("tabindex","-1");
n.attr("aria-expanded",true);
j.attr("tabindex","0")
}else{this.$opened.attr("aria-hidden",true);
n.attr("aria-expanded",false);
m.attr("tabindex","0")
}};
i.prototype.focusOnActive=function(){if(!this.currentActiveCountry){return
}this.$actualElements=this.$carousel.find(".owl-item:not(.cloned)");
var j=this.$actualElements.has("."+e.country+'[data-country="'+this.currentActiveCountry+'"]');
this.$carousel.trigger("to.owl.carousel",this.$actualElements.index(j))
};
i.prototype.config={loop:true,callbacks:true,items:4,autoWidth:true,responsive:{},lazyLoad:false,nav:true};
i.prototype.addEventListenersToCountryButtons=function(j){this.$countryButton.each(function(n){var q=$(this);
var o=q.attr("data-country-title");
var p=q.attr("data-cities-count");
var k=p>1?" locations":" location";
var m="Card "+(n+1)+" of "+j+" "+o;
q.attr("aria-label",m);
function l(){return q.attr("aria-expanded")!=="false"
}q.on("unfocus",function(){!l()&&q.attr("aria-label",m)
});
q.on("click",function(){l()?q.attr("aria-label",m):q.attr("aria-label",o+" button "+p+k)
})
})
};
i.prototype.addEventListenersToCarouselButtons=function(){var j=this;
this.$carouselButtons.on("focus",function(){var l=this.closest(".section__wrapper");
var k=l.getBoundingClientRect().top;
if(k<0){var m=$(l).offset().top;
$("html, body").animate({scrollTop:m},0)
}});
this.$carouselButtons.on("click",function(){j.refreshActiveCardsCounts();
var k=j.createCarouselButtonAriaLabelText();
$(this).attr("aria-label",k)
});
this.$carouselButtons.on("blur",function(){$(this).removeAttr("aria-label")
})
};
i.prototype.addEventListenersToNextLocation=function(){var j=this;
this.$nextLocationBtn.on("click",function(){var l=j.$countries.filter(".active"),k=j.$countries.index(l);
if(k!==j.countryCount-1){l.parent().next().find(e.countryButton).click()
}else{j.$countries.first().find(e.countryButton).click()
}})
};
i.prototype.refreshActiveCardsCounts=function(){var j=this.$carousel.find(e.activeCountryTile);
this.activeCardsCounts=j.map(function(){return $(this).attr("data-count")
})
};
i.prototype.createCarouselButtonAriaLabelText=function(){var n=this.activeCardsCounts.length;
for(var m=0;
m<this.activeCardsCounts.length-1;
m++){if(this.activeCardsCounts[m]>this.activeCardsCounts[m+1]){n=m+1
}}var o=[];
var l=this.activeCardsCounts.slice(0,n);
var k=this.activeCardsCounts.slice(n);
var p=this.createRange(l);
var j=this.createRange(k);
p&&o.push(p);
j&&o.push(j);
return"Cards "+o.join(", ")+" out of "+this.countryCount+" are shown"
};
i.prototype.createRange=function(j){if(j.length===0){return""
}if(j.length===1){return j[0]
}return j[0]+" - "+j[j.length-1]
};
i.moduleName="Locations Viewer 23";
i.selector=".locations-viewer-ui-23";
return i
});
define("ScrollingInfographic23",["utils","media","gradients"],function(b,g,a){var h={item:".scroll-infographic-ui-23__item",title:".scroll-infographic-ui-23__item-title",heading:".scroll-infographic-ui-23__item-heading",transparent:"transparent",continuum:"ec-mode",verticalScroll:"vertical-scroll",scrollableSection:".scroll-infographic-ui-23__scrollable-section"};
var d=4;
var e=0.5;
var f=1.4;
var c=function(){function o(r){_classCallCheck(this,o);
this.$el=r[0];
this.$items=this.$el.querySelectorAll(h.item);
this.$scrollableSection=this.$el.querySelectorAll(h.scrollableSection)[0];
this.onLoad=this.onLoad.bind(this);
this.onResize=this.onResize.bind(this);
this.isPropsVertical=this.$scrollableSection.dataset.propsVertical==="true";
this.size=this.$scrollableSection.dataset.stickyScrollSize;
this.gradientText=new a.GradientText();
this.init()
}_createClass(o,[{key:"init",value:function p(){this.bindEvents();
this.setTitleHeight()
}},{key:"onLoad",value:function l(){var r=document.querySelectorAll(h.heading);
this.gradientText.init(r,{rightRatio:e,middleRatio:f});
this.defineBehaviour()
}},{key:"onResize",value:function i(){this.setTitleHeight();
this.defineBehaviour()
}},{key:"bindEvents",value:function j(){window.addEventListener("load",this.onLoad);
window.addEventListener("resize",b.debounce(this.onResize,300))
}},{key:"setTitleHeight",value:function q(){var r=this.getMaxTitleHeight();
[].concat(_toConsumableArray(this.$items)).forEach(function(s){var t=s.querySelector(h.title);
if(t&&t.offsetHeight<r){t.style.height=r+"px"
}})
}},{key:"getMaxTitleHeight",value:function k(){return[].concat(_toConsumableArray(this.$items)).reduce(function(s,r){var t=r.querySelector(h.title);
return t?Math.max(s,t.offsetHeight):s
},0)
}},{key:"isVertical",value:function m(){return this.isPropsVertical||this.size<d&&!this.isPropsVertical&&g.currentMode().lessThan(g.modes.Tablet)
}},{key:"defineBehaviour",value:function n(){if(this.isVertical()){this.$scrollableSection.classList.add(h.verticalScroll);
this.$el.classList.add(h.verticalScroll)
}else{this.$scrollableSection.classList.remove(h.verticalScroll);
this.$el.classList.remove(h.verticalScroll)
}}}]);
return o
}();
c.selector=".scroll-infographic-ui-23";
c.moduleName="Scrolling Infographic 23";
return c
});
define("Tabs23",["TabsUtil","utils","media","jquery-plugins"],function(f,a,d){var e=$(window);
var c={title:".tabs__title",hideDivider:"tabs__title--no-divider",tabsWrapper:".tabs-23__ul-wrapper"};
function b(g){f.call(this,g,{useHistory:true,responsiveView:false,scrollToElement:g,responsiveBreakpoint:d.modes.Tablet.end,autoWidth:false,nav:false,dots:false});
this.$titles=this.$el.find(c.title);
e.on("popstate",this.onPopState.bind(this));
a.checkDividers(this.$titles,c.hideDivider);
a.redirectToPageAnchor();
$(window).on("load",this.clearInitialFocus.bind(this));
$(window).on("click",this.closeTabOnOutsideClick.bind(this))
}b.prototype=Object.create(f.prototype);
b.prototype.onPopState=function(j){var h='[href="'+location.hash+'"]',g=this.$links.filter(h),i=g.data("item");
if(!g.length&&j.state){history.back()
}g.length&&this.$el.trigger(f.events.tabChange,{tab:i})
};
b.prototype.closeTabOnOutsideClick=function(){var g=this.$el.find(c.tabsWrapper);
g.hasClass("open")&&g.toggleClass("open")
};
b.prototype.clearInitialFocus=function(){var g=document.querySelectorAll(".tabs-23__ul .tabs-23__title");
g.forEach(function(h){var i=h.querySelector(".tabs-23__link");
i.blur()
})
};
b.moduleName="Tabs-23";
b.selector=".tabs-ui-23";
return b
});
define("VideoShowcasesClasses23",[],function(){return{PLAYER:"video-showcase__player-section",VIDEO:"video-showcase__video",VIDEO_TITLE:"video-showcase__title",VIDEO_TITLE_ACTIVE:"video-showcase__title--active",OVERLAY_ICONS:"video-showcase__overlay-icons",OVERLAY_PLAY_ACTIVE:"overlay-play-active",OVERLAY_PAUSE_ACTIVE:"overlay-pause-active",PROGRESS_BAR:"video-showcase__progress-bar",DURATION:"video-showcase__duration",TIME_ELAPSED:"video-showcase__time-elapsed",VOLUME_BUTTON:"video-showcase__volume-button",VOLUME_ICONS:"video-showcase__volume-button svg",VOLUME_HIGH:"volume-high",VOLUME_LOW:"volume-low",VOLUME_MUTE:"volume-mute",VOLUME:"video-showcase__volume",FULLSCREEN_BUTTON:"video-showcase__fullscreen-button",PLAY_BUTTON:"video-showcase__play-button",CONTROL_SECTION:"video-showcase__controls-section",SLIDER_IMG_WRAPPER:"video-showcase__img-wrapper",TRAY_SEEK:"video-showcase__tray-seek",DELAY_PLAY:"video-showcase__delay-play",WAIT_FOR_PLAY:"video-showcase__wait-for-play",OWL:"owl-carousel",NEXT_ICON:"video-showcase__nav-control-next",PREV_ICON:"video-showcase__nav-control-prev",BLACK_FRAME:"video-showcase__black-frame",VIDEO_SHOWCASE_PROGRESS_BAR_PROGRESS:"video-showcase__progress-bar-progress",VIDEO_SHOWCASE_PROGRESS_BAR_TRACK:"video-showcase__progress-bar-track",VIDEO_SHOWCASE_PROGRESS_BAR_HIDDEN_AREA:"video-showcase__progress-bar-hidden-area",events:{PLAY_EVENT:"customPlayEvent",PAUSE_EVENT:"customPauseEvent",PLAY_FROM_START:"customPlayFromStartEvent",PLAY_TILE_EVENT:"customTilePlayEvent",NEW_LOAD_REQUEST:"customNewLoadEvent"}}
});
define("VideoShowcases23",["utils-browser","utils","VideoShowcasePlayerFunctions23","VideoShowcasesInitA11Y23","VideoShowcasesClasses23","utils-env"],function(d,a,c,f,e,h){var g=!!document.createElement("video").canPlayType;
var b=function(){function D(L){_classCallCheck(this,D);
this.$el=L[0];
this.isIE=d.isInternetExplorer();
this.$player=this.$el.querySelector("."+e.PLAYER);
this.$video=this.$el.querySelector("."+e.VIDEO);
this.$owl=$(this.$el.querySelector("."+e.OWL));
this.$isHideSlider=this.$el.dataset.hideCarousel;
this.$videoSliderItems=this.$el.querySelectorAll("."+e.SLIDER_IMG_WRAPPER);
this.$videoTitleActive=this.$el.querySelector("."+e.VIDEO_TITLE_ACTIVE);
this.$progressBar=this.$el.querySelector("."+e.PROGRESS_BAR);
this.$controlSection=this.$el.querySelector("."+e.CONTROL_SECTION);
this.$duration=this.$el.querySelector("."+e.DURATION);
this.$timeElapsed=this.$el.querySelector("."+e.TIME_ELAPSED);
this.$overlayIcons=this.$el.querySelector("."+e.OVERLAY_ICONS);
this.$volumeButton=this.$el.querySelector("."+e.VOLUME_BUTTON);
this.$volumeIcons=this.$el.querySelectorAll("."+e.VOLUME_ICONS);
this.$volumeLow=this.$el.querySelector(".video-showcase__volume-button svg:nth-child(2)");
this.$volumeHigh=this.$el.querySelector(".video-showcase__volume-button svg:nth-child(3)");
this.$volumeMute=this.$el.querySelector(".video-showcase__volume-button svg:nth-child(1)");
this.$volume=this.$el.querySelector("."+e.VOLUME);
this.$fullscreenButton=this.$el.querySelector("."+e.FULLSCREEN_BUTTON);
this.$playButton=this.$el.querySelector("."+e.PLAY_BUTTON);
this.$delayPlayContainer=this.$el.querySelector("."+e.DELAY_PLAY);
this.$waitForPlay=this.$el.querySelector("."+e.WAIT_FOR_PLAY);
this.nextIcon=this.$el.querySelector("."+e.NEXT_ICON);
this.prevIcon=this.$el.querySelector("."+e.PREV_ICON);
this.blackFrame=this.$el.querySelector("."+e.BLACK_FRAME);
this.$videoProgressBar=this.$el.querySelector("."+e.VIDEO_SHOWCASE_PROGRESS_BAR_PROGRESS);
this.$videoProgressBarTrack=this.$el.querySelector("."+e.VIDEO_SHOWCASE_PROGRESS_BAR_TRACK);
this.$videoProgressBarHiddenArea=this.$el.querySelector("."+e.VIDEO_SHOWCASE_PROGRESS_BAR_HIDDEN_AREA);
this.isFirstPlay=true;
this.isOverlayRemoved=false;
this.activeVideoIndex=0;
this.userClick=false;
this.delayPlayRemoved=true;
this.activeIndex=[];
this.owlItems=[];
this.fromStart=false;
this.promisePending=false;
this.publishMode=!h.isEditMode();
this.customPlayEvent=document.createEvent("Event");
this.customPauseEvent=document.createEvent("Event");
this.customPlayFromStartEvent=document.createEvent("Event");
this.customTilePlayEvent=document.createEvent("Event");
this.customNewLoadRequestEvent=document.createEvent("Event");
this.customPlayEvent.initEvent(e.events.PLAY_EVENT,true,true);
this.customPauseEvent.initEvent(e.events.PAUSE_EVENT,true,true);
this.customPlayFromStartEvent.initEvent(e.events.PLAY_FROM_START,true,true);
this.customTilePlayEvent.initEvent(e.events.PLAY_TILE_EVENT,true,true);
this.customNewLoadRequestEvent.initEvent(e.events.NEW_LOAD_REQUEST,true,true);
this.init()
}_createClass(D,[{key:"init",value:function I(){this.setDefaultVideo();
this.setVideoIndex();
this.initOwlCarousel();
if(this.publishMode){this.setDefaultVideo();
this.initEventsHandlers(this);
this.initOwlCarousel();
f.loadDelayPlayIconAnimation.call(this);
this.activeTraySeek();
if(this.isIE||d.detectIOSDevice()){c.removeVideoOverlay.call(this)
}else{f.loadWaitAnimation.call(this);
this.isSupportPlayer();
this.customVideoEvents()
}if(d.isSafari()&&!d.isIOS()){this.fixWebSafariVideoControls()
}}}},{key:"setVideoIndex",value:function u(){Array.prototype.forEach.call(this.$videoSliderItems,function(M,L){M.setAttribute("data-index",L)
})
}},{key:"initOwlCarousel",value:function t(){if(this.$isHideSlider==="1"){this.$el.querySelector(".video-showcase__slider-section").classList.add("hidden");
return
}var L=this.$videoSliderItems.length>3;
var M=this.$videoSliderItems.length>3?3:this.$videoSliderItems.length;
this.$owl.on("initialized.owl.carousel",function(){if(this.publishMode){f.initA11y.call(this);
f.stopVideoBySpaceA11y.call(this)
}this.$owl.on("refreshed.owl.carousel",function(){this.removeOwlAriaAttr();
f.reInitA11yAttr.call(this)
}.bind(this));
this.nextIcon.addEventListener("click",function(){this.activeTraySeek.call(this);
c.updateTrayProgress.call(this)
}.bind(this));
this.prevIcon.addEventListener("click",function(){this.activeTraySeek.call(this);
c.updateTrayProgress.call(this)
}.bind(this))
}.bind(this));
this.$owl.addClass("owl-item-count-"+M);
this.$owl.owlCarousel({nav:true,dots:false,items:M,responsive:false,mouseDrag:L,loop:L,navText:[this.prevIcon,this.nextIcon],navElement:"div"});
this.$owl[0].removeAttribute("style")
}},{key:"isSupportPlayer",value:function w(){if(g){this.$video.controls=false;
this.$controlSection.classList.remove("hidden");
c.updateVolumeIcon.call(this);
this.$normalProgressbarLength=this.$videoProgressBar.getBoundingClientRect().width;
this.$videoProgressBarLen=function(){return this.getBoundingClientRect().width
}.bind(this.$videoProgressBar)
}}},{key:"setDefaultVideo",value:function A(M){var L=M?M:this.$videoSliderItems[0];
if(L){this.changeActiveVideo(this.getVideoDataFromItem(L));
this.$video.load()
}}},{key:"delayPlayHandler",value:function r(){this.blackFrame.classList.add("hidden");
c.removeDelayPlay.call(this);
c.togglePlay.call(this)
}},{key:"sliderClickHandler",value:function z(N){var O=N.target;
var L=768;
if(this.isIE||O.tagName==="svg"||O.tagName==="use"||$(O).hasClass("video-showcase__img-wrapper-overlay")||$(O).hasClass("video-showcase__tray-text")||$(window).width()<L){var M=$(O).closest("."+e.SLIDER_IMG_WRAPPER);
if(M.length!==0){this.videoSlideClick(M.data().index,M[0])
}}}},{key:"videoSlideClick",value:function E(L,M){this.tileState=$(M).hasClass("active")||$(M).hasClass("pause");
!this.isFirstPlay&&c.saveVideoProgress.call(this);
this.activeVideoIndex=L;
this.activeItem=M;
this.fixPlayerHeight();
this.$video.classList.add("video-showcase__invincible");
this.changeActiveTile(M,L);
this.changeActiveVideo(this.getVideoDataFromItem(M));
this.$video.dispatchEvent(this.customNewLoadRequestEvent)
}},{key:"clearPlayerStyleProperties",value:function q(){this.$video.classList.remove("video-showcase__invincible");
this.$player.removeAttribute("style")
}},{key:"changeActiveTile",value:function k(N,L){var Q=this.$el.querySelectorAll("."+e.SLIDER_IMG_WRAPPER);
for(var M=0;
M<Q.length;
M++){Q[M].classList.remove("active");
Q[M].classList.remove("pause")
}var P=this.$el.querySelectorAll('[data-index="'+L+'"]');
for(var O=0;
O<P.length;
O++){P[O].classList.add("active")
}}},{key:"getVideoDataFromItem",value:function o(L){return L?{sources:L.querySelector("img").getAttribute("data-source"),poster:L.querySelector("img").getAttribute("poster-source"),title:L.dataset.title}:null
}},{key:"changeActiveVideo",value:function G(P){var L=this;
var M=P.sources,O=P.poster,N=P.title;
this.$video.innerHTML="";
if(this.isFirstPlay){this.$video.poster=O
}JSON.parse(M).forEach(function(T){var Q=T.type,S=T.src;
var R=document.createElement("source");
R.setAttribute("type",Q);
R.setAttribute("src",S);
L.$video.appendChild(R)
});
if(!N){this.$videoTitleActive.classList.add("hidden")
}else{this.$videoTitleActive.classList.remove("hidden");
if(this.$videoTitleActive){this.$videoTitleActive.textContent=N
}}}},{key:"initializeVideo",value:function F(){var L=this;
this.videoDuration=Math.floor(this.$video.duration);
var M=c.formatTime(this.videoDuration);
this.$duration.innerText=M.minutes+":"+M.seconds;
this.$duration.setAttribute("datetime",M.minutes+"m "+M.seconds+"s");
if(this.traySeek!==undefined){this.traySeek.setAttribute("max",this.videoDuration)
}if(this.clonedTraySeekStart!==undefined){this.clonedTraySeekStart.setAttribute("max",this.videoDuration)
}if(this.clonedTraySeekEnd!==undefined){this.clonedTraySeekEnd.setAttribute("max",this.videoDuration)
}if(!this.isFirstPlay&&!this.fromStart){c.applyVideoProgress.call(this)
}this.fromStart=false;
$.each(this.activeIndex,function(N,O){$(L.owlItems[O]).removeClass("hide-tray-seek")
})
}},{key:"loadMetadataCallback",value:function J(){this.initializeVideo();
this.clearPlayerStyleProperties()
}},{key:"updatePlayButton",value:function y(){this.$playButton.classList.toggle("play")
}},{key:"updateFullscreenButton",value:function x(){this.$fullscreenButton.classList.toggle("fullscreen")
}},{key:"videoBorderTracker",value:function v(){var L=this.$el.getBoundingClientRect().top;
var R=window.pageYOffset||document.documentElement.scrollTop;
var N=R+L;
var M=R+L+this.$video.offsetHeight;
var Q=R;
var P=Q+window.innerHeight;
var O=function(){if(!this.$video.paused){c.togglePlay.call(this)
}}.bind(this);
if(Q>M){O();
return
}if(P<N){O();
return
}}},{key:"activeTraySeek",value:function n(){this.activeIndex=[];
this.owlItems=$(this.$el).find(".owl-item");
$.each(this.owlItems,function(L,N){var O=$(N).find("."+e.VIDEO_TITLE)[0];
if(O){N.dataset.title=O.textContent
}var M=$(N).find('[data-index="'+this.activeVideoIndex+'"]');
if(M.length!==0){this.activeIndex.push(L)
}else{$(N).addClass("hide-tray-seek");
N.querySelector("."+e.TRAY_SEEK).value=0
}}.bind(this));
if(this.owlItems[this.activeIndex[0]]!==undefined){this.traySeek=this.owlItems[this.activeIndex[0]].querySelector("."+e.TRAY_SEEK)
}if(this.owlItems[this.activeIndex[1]]!==undefined){this.clonedTraySeekStart=this.owlItems[this.activeIndex[1]].querySelector("."+e.TRAY_SEEK)
}if(this.owlItems[this.activeIndex[2]]!==undefined){this.clonedTraySeekEnd=this.owlItems[this.activeIndex[2]].querySelector("."+e.TRAY_SEEK)
}}},{key:"mouseMove",value:function p(){this.$player.classList.add("mouse-move");
if(this.setTimeoutId!==undefined||this.setTimeoutId!==null){clearTimeout(this.setTimeoutId)
}this.setTimeoutId=setTimeout(function(){this.$player.classList.remove("mouse-move");
this.setTimeoutId=null
}.bind(this),15000)
}},{key:"fixPlayerHeight",value:function i(){var L=this.$player.getBoundingClientRect();
this.$player.setAttribute("style","height:"+L.height+"px")
}},{key:"resizeEventHandler",value:function m(){this.$owl.trigger("refresh.owl.carousel")
}},{key:"fullscreenchangeEventHandler",value:function l(L){if(L.target===this.$player){c.updateFullscreenButtonsAriaLabel.call(this)
}}},{key:"iosEventHandler",value:function s(L){if(L.type==="play"){c.activeCarouselSlide.call(this,"add")
}else{c.activeCarouselSlide.call(this,"remove")
}}},{key:"removeOwlAriaAttr",value:function K(){var M=this.$el.querySelectorAll('[role="tab"]');
for(var L=0;
L<M.length;
L++){M[L].removeAttribute("tabindex");
M[L].removeAttribute("aria-selected");
M[L].removeAttribute("role")
}}},{key:"customVideoEvents",value:function H(){this.$video.addEventListener("timeupdate",c.timeUpdate.bind(this));
this.$volume.addEventListener("input",c.updateVolume.bind(this));
this.$video.addEventListener("volumechange",c.updateVolumeIcon.bind(this));
this.$player.addEventListener("click",c.playerClick.bind(this));
this.$player.addEventListener("fullscreenchange",this.updateFullscreenButton.bind(this));
this.$player.addEventListener("mousemove",a.debounceExtend(this.mouseMove.bind(this),100))
}},{key:"initEventsHandlers",value:function j(){this.$video.addEventListener("timeupdate",c.updateTrayProgress.bind(this));
this.$video.addEventListener("ended",c.videoEnded.bind(this));
this.$video.addEventListener("loadedmetadata",this.loadMetadataCallback.bind(this));
this.$video.addEventListener("canplay",c.videoCanPlayEvent.bind(this));
this.$video.addEventListener("waiting",c.videoWaitEvent.bind(this));
if(d.detectIOSDevice()){this.$video.addEventListener("play",this.iosEventHandler.bind(this));
this.$video.addEventListener("pause",this.iosEventHandler.bind(this))
}this.$video.addEventListener(e.events.PLAY_EVENT,c.handlePlayEvent.bind(this));
this.$video.addEventListener(e.events.PAUSE_EVENT,c.handlePauseEvent.bind(this));
this.$video.addEventListener(e.events.PLAY_FROM_START,c.handlePlayFromStartEvent.bind(this));
this.$video.addEventListener(e.events.PLAY_TILE_EVENT,c.handlePLayTileEvent.bind(this));
this.$video.addEventListener(e.events.NEW_LOAD_REQUEST,c.handleNewLoadEvent.bind(this));
this.$videoProgressBarHiddenArea.addEventListener("click",c.progressBarClickHandler.bind(this));
this.$owl[0].addEventListener("click",this.sliderClickHandler.bind(this));
window.addEventListener("scroll",a.debounceExtend(this.videoBorderTracker.bind(this),100));
window.addEventListener("resize",a.debounceExtend(this.resizeEventHandler.bind(this),300));
window.addEventListener("fullscreenchange",this.fullscreenchangeEventHandler.bind(this));
this.initMouseMoveEvents()
}},{key:"initMouseMoveEvents",value:function C(){this.$videoProgressBarHiddenArea.addEventListener("mousedown",c.changeMouseState.bind(this,true));
this.$videoProgressBarHiddenArea.addEventListener("mouseup",c.changeMouseState.bind(this,false));
this.$videoProgressBarHiddenArea.addEventListener("mouseleave",c.changeMouseState.bind(this,false));
this.$videoProgressBarHiddenArea.addEventListener("mousemove",c.mouseMoveEventHandler.bind(this));
this.$videoProgressBarHiddenArea.addEventListener("touchmove",c.mouseMoveEventHandler.bind(this));
this.$videoProgressBarHiddenArea.addEventListener("touchstart",c.changeMouseState.bind(this,true));
this.$videoProgressBarHiddenArea.addEventListener("touchend",c.changeMouseState.bind(this,false))
}},{key:"fixWebSafariVideoControls",value:function B(){this.$player.classList.add("safari-web")
}}]);
return D
}();
b.moduleName="Video Showcases 23";
b.selector=".video-showcase-ui-23";
return b
});
define("VideoShowcasesInitA11Y23",["utils","VideoShowcasePlayerFunctions23","VideoShowcaseA11y23"],function(l,c,a){function b(m){if(this.$videoSliderItems.length>3){m(this);
this.$owl.trigger("to.owl.carousel",[this.currentSlide,0])
}}function k(){b.call(this,function(){if(this.$videoSliderItems.length-1>=this.currentSlideindex){this.currentSlideindex=0
}}.bind(this))
}function f(){b.call(this,function(){this.currentSlideindex--;
if(this.currentSlideindex<=0){this.currentSlideindex=this.$videoSliderItems.length-1
}}.bind(this))
}function d(n){var m=Number(n.querySelector(".video-showcase__img-wrapper").dataset.index);
if(this.activeVideoIndex===m){c.togglePlay.call(this);
return
}this.fixPlayerHeight();
this.videoSlideClick(m,n)
}function g(){$(this.$el).find(".owl-stage").addClass("a11y-navigation-panel");
a.init.call(this,{"list-item":"owl-item:not(.cloned)","move-forward-callback":k.bind(this),"move-downward-callback":f.bind(this),"enter-action":d.bind(this)})
}function h(){a.setSpecialAttribute.call(this)
}function i(){l.loadLottieFile({container:this.$waitForPlay,loop:true,autoplay:true,path:"/etc/designs/epam-com/json-animations/loading-balls.json"})
}function e(){this.delayAnimation=l.loadLottieFile({container:this.$delayPlayContainer,loop:false,autoplay:false,path:"/etc/designs/epam-com/json-animations/delay-play.json"});
this.delayAnimation.addEventListener("complete",this.delayPlayHandler.bind(this))
}function j(){var m=this;
var n=this.$el.querySelector(".video-showcase__video-progress");
n.addEventListener("keydown",function(p){var o=p.keyCode;
if(o===32){c.togglePlay.call(m)
}})
}return{loadWaitAnimation:i,loadDelayPlayIconAnimation:e,initA11y:g,reInitA11yAttr:h,stopVideoBySpaceA11y:j}
});
define("VideoShowcasePlayerFunctions23",["VideoShowcasesClasses23"],function(g){function k(){if(this.$video.paused||this.$video.ended){this.$video.dispatchEvent(this.customPlayEvent)
}else{this.$video.dispatchEvent(this.customPauseEvent)
}}function r(){this.$video.play();
v.call(this);
K.call(this);
B(this.$playButton,"Play (k)","Pause (k)");
i.call(this,"add");
n.call(this,g.OVERLAY_PAUSE_ACTIVE,g.OVERLAY_PLAY_ACTIVE)
}function O(){var Q=this;
if(!this.promisePending){var P=this.$video.play();
this.promisePending=true;
if(P!==undefined){P.then(function(){Q.promisePending=false;
Q.$video.load();
Q.tileState?Q.$video.dispatchEvent(Q.customPlayFromStartEvent):Q.$video.dispatchEvent(Q.customTilePlayEvent);
Q.isFirstPlay=false
})
}}}function E(){this.activeTraySeek();
this.$video.play();
v.call(this);
y.call(this);
K.call(this,"play");
B(this.$playButton,"Play (k)","Pause (k)");
i.call(this,"add")
}function h(){this.fromStart=true;
this.$video.play()
}function i(P){this.$el.querySelectorAll('[data-index="'+this.activeVideoIndex+'"]').forEach(function(Q){P==="add"?Q.classList.add("active"):Q.classList.remove("active")
})
}function f(){var Q=this;
if(!this.promisePending){var P=this.$video.play();
this.promisePending=true;
if(P!==undefined){P.then(function(){Q.$video.pause();
Q.promisePending=false;
K.call(Q);
n.call(Q,g.OVERLAY_PLAY_ACTIVE,g.OVERLAY_PAUSE_ACTIVE);
B(Q.$playButton,"Play (k)","Pause (k)");
i.call(Q,"remove")
})
}}}function n(P,R){var Q=this;
this.overlayTimerId&&clearTimeout(this.overlayTimerId);
this.$overlayIcons.classList.remove("hidden");
this.$player.classList.remove(P);
this.$player.classList.add(R);
this.overlayTimerId=setTimeout(function(){Q.$overlayIcons.classList.add("hidden")
},1000)
}function B(Q,R,P){var S=Q.getAttribute("title");
var T=S===R?P:R;
Q.setAttribute("title",T)
}function I(){B(this.$fullscreenButton,"Full screen (f)","Exit full screen (f)")
}function C(){sessionStorage.removeItem("track"+this.activeVideoIndex)
}function N(){this.$video.muted=!this.$video.muted;
if(this.$video.muted){this.$volume.setAttribute("data-volume",this.$volume.value);
this.$volume.value=0
}else{this.$volume.value=this.$volume.dataset.volume
}}function u(P){if(this.$video.muted){this.$video.muted=false
}this.$video.volume=this.$volume.value;
P.stopPropagation()
}function D(Q){if(!isNaN(Q)){var P=new Date(Q*1000).toISOString().substr(11,8);
return{minutes:P.substr(3,2),seconds:P.substr(6,2)}
}}function p(){var P=D(Math.floor(this.$video.currentTime));
this.$timeElapsed.innerText=P.minutes+":"+P.seconds;
this.$timeElapsed.setAttribute("datetime",P.minutes+"m "+P.seconds+"s")
}function j(){if(this.videoDuration&&this.$videoProgressBarLen()){var Q=F.call(this);
this.videoCurPosPercent=Math.round(Q/this.videoDuration*100);
var P=this.$videoProgressBarLen()*this.videoCurPosPercent/100;
this.$videoProgressBarTrack.style.width=P+"px"
}}function a(){var P=this.$normalProgressbarLength*this.videoCurPosPercent/100;
this.$videoProgressBarTrack.style.width=P+"px"
}function G(){p.call(this);
j.call(this)
}function F(){return this.$video?Math.floor(this.$video.currentTime):null
}function d(){var P=F.call(this);
if(this.traySeek!==undefined){this.traySeek.value=P
}if(this.clonedTraySeekEnd!==undefined){this.clonedTraySeekEnd.value=P
}if(this.clonedTraySeekStart!==undefined){this.clonedTraySeekStart.value=P
}}function J(){if(document.fullscreenElement){a.call(this);
document.exitFullscreen()
}else{if(document.webkitFullscreenElement){a.call(this);
document.webkitExitFullscreen()
}else{if(this.$player.requestFullscreen){this.$player.requestFullscreen()
}else{if(this.$player.webkitRequestFullscreen){this.$player.webkitRequestFullscreen()
}else{if(this.$player.mozRequestFullScreen){this.$player.mozRequestFullScreen()
}else{if(this.$player.msRequestFullscreen){this.$player.msRequestFullscreen()
}}}}}}}function M(){if(this.timerId){clearTimeout(this.timerId)
}}function L(){M.call(this);
this.$waitForPlay.classList.add("hidden")
}function l(){var P=this;
M.call(this);
this.timerId=setTimeout(function(){P.$waitForPlay.classList.remove("hidden")
},1000)
}function e(){this.$volumeIcons.forEach(function(P){P.classList.add("hidden")
});
this.$volumeButton.setAttribute("data-title","Mute (m)");
if(this.$video.muted||this.$video.volume===0){this.$volumeMute.classList.remove("hidden");
this.$volumeButton.setAttribute("data-title","Unmute (m)")
}else{if(this.$video.volume>0&&this.$video.volume<=0.5){this.$volumeLow.classList.remove("hidden")
}else{this.$volumeHigh.classList.remove("hidden")
}}this.$volume.setAttribute("aria-valuetext",this.$video.volume*100+"% volume")
}function o(){this.blackFrame.classList.remove("hidden");
this.fromStart=true;
K.call(this);
B(this.$playButton,"Play (k)","Pause (k)");
C.call(this);
this.activeVideoIndex===this.$videoSliderItems.length-1?this.activeVideoIndex=0:this.activeVideoIndex+=1;
var Q=this.$videoSliderItems[this.activeVideoIndex];
var P=Q.querySelector("img").getAttribute("poster-source");
c.call(this,P);
this.changeActiveVideo(this.getVideoDataFromItem(Q));
this.$video.load();
this.changeActiveTile(this.$videoSliderItems[this.activeVideoIndex],this.activeVideoIndex);
w.call(this);
this.$player.classList.add("delay-overlay");
this.$delayPlayContainer.classList.remove("hidden");
this.delayAnimation.goToAndPlay(0)
}function w(){this.$owl.trigger("next.owl.carousel");
this.activeTraySeek()
}function s(){if(this.$video.ended){return
}sessionStorage.setItem("track"+this.activeVideoIndex,this.$video.currentTime)
}function t(){var P=sessionStorage.getItem("track"+this.activeVideoIndex);
if(P){this.$video.currentTime=P
}}function v(){if(!this.isOverlayRemoved){this.$player.classList.remove("overlay");
this.$overlayIcons.classList.add("hidden");
this.isOverlayRemoved=true
}}function A(T){var U=T.target,R=T.target.tagName;
var Q=U.getAttribute("id");
var V=U;
var P=R;
if($(V).hasClass("overlay")||P==="VIDEO"||Q==="play"){k.call(this);
return
}if(Q==="volume-button"){N.call(this);
B(this.$volumeButton,"Mute (m)","Unmute (m)");
return
}if(Q==="fullscreen-button"){J.call(this);
return
}if($(V).hasClass("delay-overlay")){y.call(this);
k.call(this);
return
}if(P==="use"){P="svg";
V=$(V).parent()[0]
}if(P==="svg"){var S=$(V).parent();
var W=S.attr("id");
if(W==="play"||W==="pause"||W==="overlay"||W==="play-overlay"){k.call(this)
}if(W==="fullscreen-button"){J.call(this)
}if(W==="volume-button"){N.call(this);
B(this.$volumeButton,"Mute (m)","Unmute (m)")
}}}function K(P){P?this.$playButton.classList.add("play"):this.$playButton.classList.toggle("play")
}function y(){this.delayAnimation.stop();
this.$delayPlayContainer.classList.add("hidden");
this.$player.classList.remove("delay-overlay")
}function c(R){var Q=this;
var P=new Image();
P.onload=function(){Q.blackFrame.classList.add("hidden");
Q.$video.poster=R
};
P.src=R
}function x(Q,S){var R=S;
if(R.touches){R=R.touches[0]
}var P=Math.round(R.pageX-Q.getBoundingClientRect().left);
var T=Math.round(R.pageY-Q.getBoundingClientRect().left);
return{x:P,y:T}
}function z(P){this.$videoProgressBarTrack.style.width=P+"px";
this.trackValue=P
}function q(){var Q=Math.round(this.trackValue/this.$videoProgressBarLen()*100);
var P=this.videoDuration*Q/100;
this.$video.currentTime=P
}function m(Q){var R=x(this.$videoProgressBar,Q),P=R.x;
z.call(this,P);
q.call(this)
}function b(R){if(this.mousePressed){var Q=x(this.$videoProgressBar,R),P=Q.x;
z.call(this,P);
q.call(this)
}}function H(P){this.mousePressed=P
}return{togglePlay:k,wipeVideoProgress:C,toggleMute:N,updateVolume:u,timeUpdate:G,updateTrayProgress:d,toggleFullScreen:J,formatTime:D,videoCanPlayEvent:L,videoWaitEvent:l,updateVolumeIcon:e,videoEnded:o,saveVideoProgress:s,applyVideoProgress:t,handlePlayEvent:r,handlePauseEvent:f,removeVideoOverlay:v,playerClick:A,handlePlayFromStartEvent:h,handlePLayTileEvent:E,removeDelayPlay:y,imageLoader:c,handleNewLoadEvent:O,progressBarClickHandler:m,mouseMoveEventHandler:b,changeMouseState:H,updateFullscreenButtonsAriaLabel:I,activeCarouselSlide:i}
});
"use strict";
define("ObserversAPI",[],function(){var b={root:null,rootMargin:"0px",threshold:1};
var a=function a(f,d){var c=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};
var e=new IntersectionObserver(f,Object.assign(b,c));
e.observe(d)
};
return{intersectionObserver:a}
});
define("RequestAnimationFrame",[],function(){var e=60;
var g=[];
var d=0;
function f(i,h){i.fps=h?h:e;
i.then=Date.now();
i.fpsInterval=1000/i.fps;
g.push(i);
b()
}function b(){if(d!==0){return
}a()
}function a(){d=Date.now();
c()
}function c(){if(g.length===0){d=0;
return
}requestAnimationFrame(c);
var j=Date.now();
for(var k=0;
k<g.length;
k++){var h=j-g[k].then;
if(h>g[k].fpsInterval){g[k].then=j-h%g[k].fpsInterval;
g[k].func();
if(g[k].isEnd()){g.splice(k,1)
}}}}return{increaseAnimationQueue:f}
});
define(["utils","RequestAnimationFrame"],function(o,g){var d=window.innerHeight/100*80;
var e=2;
var h=9*e;
var b=[];
var j=function j(){var r=this.el.getBoundingClientRect();
if(r.top<=d){this.startValue+=this.step;
if(this.startValue===this.string||this.startValue>this.string){this.el.innerHTML=this.originalString;
this.finish=true;
return
}this.el.innerHTML=c.call(this,this.startValue.toString())
}};
var a=function a(){if(this.finish){return true
}};
function c(s){var r=this.signCount>1?m.call(this,s):i.call(this,s);
return this.sign===-1?Math.ceil(r):r
}var q=function q(s,r){var t=s/r;
if(this.signCount>1){return Math.ceil(t)
}if(t>0.1){return +parseFloat(t).toFixed(this.precise)
}return +parseFloat(t).toFixed(2)
};
function p(){if(this.originalString.indexOf(",")!==-1){this.sign=","
}else{if(this.originalString.indexOf(".")!==-1){this.sign="."
}}}function n(){var r=this.originalString.lastIndexOf(this.sign);
if(r!==-1){this.precise=this.originalString.length-1-r;
return
}if(this.string<h){this.precise=1
}}function l(r){if(this.sign&&this.sign===","){return r.replaceAll(".",",")
}return r
}function i(r){if(this.precise!==0){return l.call(this,parseFloat(r).toFixed(this.precise))
}else{return l.call(this,r)
}}function m(v){var s=v;
var u=s.length;
var r=Math.floor(u/this.precise);
var t=u-this.precise*r;
while(t<=u){if(t===0){t+=this.precise
}else{s=s.slice(0,t)+this.sign+s.slice(t);
t+=this.precise+1
}}return s
}function f(t){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:1;
if(this.sign!==-1){var s=t.indexOf(this.sign,r);
if(s!==-1){this.signCount+=1;
f.call(this,t,s+1)
}}}var k=function k(r){Array.prototype.forEach.call(r,function(t){var s={signCount:0,startValue:0,finish:false,sign:-1,precise:0};
s.originalString=t.innerHTML;
p.call(s);
f.call(s,s.originalString);
if(s.signCount>1){s.string=parseFloat(s.originalString.replaceAll(s.sign,""))
}else{s.string=parseFloat(s.originalString.replaceAll(",","."))
}if(!isNaN(s.string)){n.call(s);
s.step=q.call(s,s.string,h);
s.el=t;
t.innerHTML=0;
b.push({func:j.bind(s),endFunc:a.bind(s)})
}})
};
document.addEventListener("DOMContentLoaded",function(){var r=document.querySelectorAll(".rte-number-animation");
k(r);
Array.prototype.forEach.call(b,function(s){g.increaseAnimationQueue({func:s.func,isEnd:s.endFunc},10)
})
})
});
define("animation-tools",["utils"],function(l){var n=window.innerHeight;
var b=n/2;
var d={multipleBlock:"multiple-topics-list__block-image-wrapper",multipleParallaxSection:"multiple-topics-list__animation-placeholder-wrapper",parallaxSection:"parallax-section",featureParallaxBlock:"featured-content-card__parallax-block",featureSection:"featured-content-card__image-wrapper"};
var f=10;
var e=function e(){return window.scrollY
};
var c=function c(o){var p=o.getBoundingClientRect();
return{top:p.top+e(),rawTop:p.top,bottom:p.bottom+e(),rawBottom:p.bottom,height:o.offsetHeight}
};
var g=function g(s,r,p,o){var q=c(s);
var u=Math.ceil(q.height/100*o);
var t=u/100*r*p;
s.style.transform="translateY("+t+"px)"
};
var h=function h(p){var r=c(p);
var q=0;
var o=0;
if(r.rawTop<b){q=100-r.rawTop/b*100;
o=1
}else{q=r.rawTop/b*100-100;
o=-1
}return{percent:q,translateDirection:o}
};
function k(q){if(l.isElementInViewport(q)){var r=h(q),p=r.percent,o=r.translateDirection;
g(this,p,o,f)
}}var j=function j(o){var p=void 0;
if(o.classList.contains(d.multipleBlock)){p=o.closest("."+d.multipleParallaxSection)
}else{if(o.classList.contains(d.featureParallaxBlock)){p=o.closest("."+d.featureSection)
}else{p=o.closest(".section")
}}p.classList.add(d.parallaxSection);
return p
};
var a={applyParallax:function i(o){var p=j(o);
return k.bind(o,p)
},parallaxStopCondition:function m(){return false
}};
return{Parallax:a,getElRect:c}
});
define(["utils","RequestAnimationFrame"],function(a,b){document.addEventListener("DOMContentLoaded",function(){var d=document.querySelectorAll(".rte-text-animation");
var e=Array.prototype.slice.call(d);
function c(){for(var g=0;
g<e.length;
g++){if(a.isElementInViewport(e[g])){e[g].classList.add("live-text");
e.splice(g,1)
}}}function f(){return e.length===0
}if(e.length!==0){b.increaseAnimationQueue({func:c,isEnd:f})
}})
});
define(["RequestAnimationFrame","animation-tools","constants"],function(e,d,b){var a="applied-parallax";
var c=function c(){var f=document.querySelectorAll(".parallax-wrapper:not(."+a+")");
f.forEach(function(g){g.classList.add(a);
e.increaseAnimationQueue({func:d.Parallax.applyParallax(g),isEnd:d.Parallax.parallaxStopCondition})
})
};
document.addEventListener(b.Events.featureGridAddedNewItems,function(){c()
});
document.addEventListener("DOMContentLoaded",function(){c()
})
});
define("SolutionsHubReferrer",[],function(){var d={referrerKey:"SolutionsHubReferrer",referrerField:'.hidden-field-ui[name="source"]'};
var a=function a(){var e=sessionStorage.getItem(d.referrerKey);
if(e===null){sessionStorage.setItem(d.referrerKey,JSON.stringify({referrer:document.referrer,isPaidTraffic:b()}))
}};
var c=function c(e){var f=e.querySelector(d.referrerField);
if(f){f.value=sessionStorage.getItem(d.referrerKey)
}};
var b=function b(){var e=/gclid|gclsrc|compaignSource|utm_source/gi;
var f=document.location.search;
return e.test(f)
};
a();
return{setReferrerHiddenField:c}
});
define("sticky-scroll",["utils","media"],function(A,k){var y='[data-sticky-scroll="true"]';
var p="#main > div";
var u=10;
var D=10;
var o=4;
var n="pinned-filter--fixed";
var j="invisible";
var s=[];
window.addEventListener("load",w);
function w(){var G=document.querySelectorAll(y);
var F=G.length>0;
if(!F){return
}C();
E();
c();
d();
i();
setTimeout(function(){m()
},0)
}function m(){if(!document.querySelectorAll("a[id]").length){return
}if(window.location.hash){f(window.location.hash)
}document.querySelectorAll('a[href^="#"]').forEach(function(F){F.addEventListener("click",function(G){G.preventDefault();
l(false);
if(window.location.hash===F.getAttribute("href")){f(window.location.hash)
}else{window.location.hash=F.getAttribute("href")
}})
});
window.onhashchange=function(F){F.preventDefault();
var G=window.location.hash;
if(!G){r();
return
}f(G)
}
}function l(G){var F=$(p);
if(G){F.removeClass(j)
}else{F.addClass(j)
}}function b(H){var G=$(y+", "+H);
var F=G.toArray().findIndex(function(I){return I.id===H.substring(1)
});
if(F===0){return[]
}return G.slice(0,F)
}function f(L){var K=$(""+L);
if(!K.length){return
}var I=b(L);
var J=I.length?I.toArray().reduce(function(P,N){var O=q(N);
var M=O.end-O.start;
return P+M
},0):0;
var G=K.offset().top||0;
var F=$(".pin-spacer").offset().top||0;
var H=G+J+u;
if($(window).scrollTop()>s[0].start){H-=F
}$(window).scrollTop(H);
setTimeout(function(){r();
l(true)
},D)
}function i(){var G=document.documentElement.scrollTop;
var F=s.find(function(I){var J=I.start,H=I.end;
return G>=J&&G<=H
});
if(F){z(G,F)
}else{B(G)
}}function C(){var G=document.createElement("div");
G.classList.add("pin-spacer");
G.style.width="100%";
G.style.position="relative";
var F=document.querySelector("body");
while(F.firstChild){G.appendChild(F.firstChild)
}F.appendChild(G)
}function x(I,H,J){var G=document.querySelector(".pin-spacer");
var F=I?{position:"fixed",top:"-"+H+"px"}:{position:"relative",top:H+"px"};
Object.assign(G.style,F);
Array.from(document.querySelectorAll(y)).forEach(function(L){var M=q(L),N=M.start,K=M.end;
L.dataset.stickyScrollStarted=N<=J;
L.dataset.stickyScrollEnded=K<=J;
if(J>K){g(L,K-N);
return
}if(J<N){g(L,0);
return
}g(L,J-N)
})
}function d(){window.addEventListener("scroll",e);
var I=document.querySelector(".pin-spacer");
if(window.ResizeObserver){var H=new ResizeObserver(function(){r()
});
H.observe(I)
}else{r();
var G=$(I);
var F=[G.width(),G.height()];
$(window).bind("click resize",A.debounceExtend(function(){var L=[G.width(),G.height()];
var K=F[0]!==L[0]||F[1]!==L[1];
var J=G.css("position")==="fixed";
if(K&&!J){F=L;
r()
}},300))
}}function r(){E();
c();
i()
}function a(H){var G=0;
var F=H;
var I=document.querySelector(".pin-spacer");
while(F.offsetParent){if(F!==I&&!isNaN(F.offsetTop)){G+=F.offsetTop
}F=F.offsetParent
}return G
}function h(G){var F=G.dataset.stickyScrollVertical==="true";
if(G.dataset.stickyScrollSize&&G.dataset.stickyScrollSize<o&&!F&&k.currentMode().lessThan(k.modes.Tablet)){F=true
}return F
}function q(G){var T=h(G);
var I=G.offsetHeight,U=G.scrollHeight,Q=G.offsetWidth,N=G.scrollWidth;
var H=a(G);
var F=H+I;
var O=document.documentElement.clientHeight;
var M=(O-I)/2;
if(document.getElementsByClassName(n).length){var S=document.getElementsByClassName(n)[0];
M=(O-I-S.offsetHeight)/2
}var K=T?0:-1*M;
var J=s.filter(function(V){return V.offsetTop+u<H
}).reduce(function(W,Y){var X=Y.start,V=Y.end;
return W+V-X
},0);
var L=F-O-K<0?J:F-O-K+J;
var R=T?U-I:N-Q;
var P=L+R;
return{start:L,end:P,offsetTop:H}
}function E(){s=[];
document.querySelectorAll(y).forEach(function(F){s.push(q(F))
})
}function c(){var G=document.querySelector("body");
var J=document.querySelector(".pin-spacer");
var F=J.offsetHeight;
var I=s.reduce(function(L,M){var N=M.start,K=M.end;
return L+K-N
},0);
var H=F+I;
G.style.height=H+"px"
}function v(G,I){var H=G.start,F=G.end;
return I>=H&&I<=F
}function t(F){Array.from(document.querySelectorAll(y)).some(function(G){var H=q(G);
if(!v(H,F)){return null
}g(G,F-H.start);
return true
})
}function g(F,G){if(h(F)){F.style.transform="translate3d(0px, -"+G+"px, 0px)"
}else{F.style.transform="translate3d(-"+G+"px, 0px, 0px)"
}}function z(I,H){var G=H.start;
var F=s.filter(function(J){return J.start<G
}).reduce(function(J,K){return J-K.end+K.start
},G);
x(true,F,I)
}function B(G){var F=s.filter(function(I){var H=I.end;
return G>H
}).reduce(function(I,J){var K=J.start,H=J.end;
return I+H-K
},0);
x(false,F,G)
}function e(){var H=document.body.scrollTop||document.documentElement.scrollTop;
var G=s.find(function(J){var K=J.start,I=J.end;
return H>=K&&H<=I
});
var F=document.querySelector(".pin-spacer").style.position==="fixed";
if(G&&!F){z(H,G)
}if(!G&&F){B(H)
}if(F){t(H)
}}});
define("SwipeCarousel",["utils","utils-browser"],function(a,c){var d={HIDDEN:"hidden",SIMPLE_SCROLL:"simple-scroll",OWL_STAGE:".owl-stage",OWL_STAGE_OUTER:".owl-stage-outer"};
var e={initialAnimation:"initial",transitionAnimation:"all 0.3s ease 0s"};
function b(){this.element=null;
this.owl=null;
this.owlStage=null;
this.owlStageOuter=null;
this.progressBar=null;
this.slider=null;
this.progressBar=null;
this.scrollContainer=null;
this.sliderThumbWidth=0;
this.maximalSliderTransformValue=0;
this.maximalCarouselTransformValue=0;
this.sliderLeft=0;
this.carouselSpeed=300;
this.isSliderActive=false
}b.prototype.initCarousel=function(h){var g=this;
var f=c.isTouchDevice();
if(f){this.scrollContainer.classList.add(d.SIMPLE_SCROLL);
this.progressBar.classList.add(d.HIDDEN)
}else{$(document).ready(function(){$(g.owl).owlCarousel({autoWidth:true,freeDrag:false,smartSpeed:300,fluidSpeed:300,merge:true,mergeFit:false,dots:false,removeLastItemMargin:true,trackProgressEvent:true,animation:{watchBoundaries:true,onAnimationCallback:g.animationCallback.bind(g)},responsive:h||{0:{margin:23.7},991:{margin:49}}});
g.owlStage=g.element.querySelector(d.OWL_STAGE);
g.owlStageOuter=g.element.querySelector(d.OWL_STAGE_OUTER);
g.initCarouselEvents()
})
}};
b.prototype.initCarouselEvents=function(){var f=this;
this.setMaximalCarouselTransformValue();
this.initSlider();
this.initSliderEvents();
this.setSliderDisplay();
window.addEventListener("resize",a.debounceExtend(function(){f.updateCarousel();
f.toCarouselStart()
},300));
$(this.owl).on("refreshed.owl.carousel",function(){f.updateCarousel();
f.toCarouselStart()
})
};
b.prototype.updateCarousel=function(){this.setMaximalCarouselTransformValue();
this.initSlider();
this.setSliderDisplay()
};
b.prototype.toCarouselStart=function(){this.setSliderPosition(0,false,true);
$(this.owl).trigger("to.owl.carousel",[0,300])
};
b.prototype.initSliderEvents=function(){var f=this;
this.slider.addEventListener("mousedown",function(){f.isSliderActive=true;
f.slider.classList.add("active")
});
window.addEventListener("mouseup",function(){f.isSliderActive=false;
f.slider.classList.remove("active")
});
window.addEventListener("mousemove",function(g){if(!f.isSliderActive){return
}g.preventDefault();
f.setSliderPosition(f.getMouseRelativePosition(g.clientX),true)
});
this.progressBar.addEventListener("click",function(g){f.isSliderActive=true;
f.setSliderPosition(f.getMouseRelativePosition(g.clientX),true,true);
f.isSliderActive=false
})
};
b.prototype.initSlider=function(){this.setSliderThumbWidth();
this.isSliderActive=false;
this.sliderLeft=this.progressBar.getBoundingClientRect().left;
this.maximalSliderTransformValue=this.owlStageOuter.clientWidth-this.sliderThumbWidth
};
b.prototype.setSliderDisplay=function(){if(this.maximalCarouselTransformValue>=0){this.progressBar.classList.add(d.HIDDEN)
}else{this.progressBar.classList.remove(d.HIDDEN)
}};
b.prototype.getMouseRelativePosition=function(g){var f=g-this.sliderLeft-0.5*this.sliderThumbWidth;
if(f<=0){return 0
}if(f>=this.maximalSliderTransformValue){return this.maximalSliderTransformValue
}return f
};
b.prototype.setMaximalCarouselTransformValue=function(){var g=this.owlStageOuter.clientWidth;
var f=this.owlStage.clientWidth;
this.maximalCarouselTransformValue=g-f
};
b.prototype.setSliderThumbWidth=function(){var g=this.owlStageOuter.clientWidth;
var f=this.owlStage.clientWidth;
this.slider.style.width=Math.round(g*g/f)+"px";
this.sliderThumbWidth=this.slider.clientWidth
};
b.prototype.setSliderPosition=function(i){var f=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;
var h=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;
if(h){this.slider.style.transition=e.transitionAnimation
}else{this.slider.style.transition=e.initialAnimation
}this.slider.style.transform="translate3d("+i+"px,9px,0px)";
if(f){var g=i===0?0:this.maximalCarouselTransformValue*i/this.maximalSliderTransformValue;
this.owl.dispatchEvent(new CustomEvent("progress.owl.carousel",{detail:{transform:g,speed:h?this.carouselSpeed:0}}))
}};
b.prototype.animationCallback=function(h){if(this.isSliderActive){return
}var f=h;
if(h>=0){f=0
}if(h<=this.maximalCarouselTransformValue){f=this.maximalCarouselTransformValue
}var g=Math.abs(f)*this.maximalSliderTransformValue/Math.abs(this.maximalCarouselTransformValue);
this.setSliderPosition(g)
};
return b
});
"use strict";
var _createClass=function(){function a(e,c){for(var b=0;
b<c.length;
b++){var d=c[b];
d.enumerable=d.enumerable||false;
d.configurable=true;
if("value" in d){d.writable=true
}Object.defineProperty(e,d.key,d)
}}return function(d,b,c){if(b){a(d.prototype,b)
}if(c){a(d,c)
}return d
}
}();
function _toConsumableArray(a){if(Array.isArray(a)){for(var c=0,b=Array(a.length);
c<a.length;
c++){b[c]=a[c]
}return b
}else{return Array.from(a)
}}function _classCallCheck(a,b){if(!(a instanceof b)){throw new TypeError("Cannot call a class as a function")
}}define("ColumnControl",[],function(){var b={COLUMN_CONTROL_COLUMN:"colctrl__col",TEXT_UI:"text-ui"};
var a=function(){function l(o){var q=this;
_classCallCheck(this,l);
this.el=o[0];
var p=this.el.getAttribute("data-is-list");
p&&window.addEventListener("DOMContentLoaded",function(){q.items=q.getInteractiveItems();
q.items.length&&q.init()
})
}_createClass(l,[{key:"getInteractiveItems",value:function m(){var o=this;
return Array.from(this.el.querySelectorAll("."+b.COLUMN_CONTROL_COLUMN)).map(function(q){var p=q.querySelectorAll("img, ."+b.TEXT_UI);
if(p.length===0){return q
}if(p.length===1){return p[0]
}return o.getClosestCommonParent(Array.from(p))
})
}},{key:"getClosestCommonParent",value:function d(o){var p=o[0];
while(p.parentNode){p=p.parentNode;
if(o.every(function(q){return p.contains(q)
})){return p
}}}},{key:"init",value:function n(){var o;
if(!window.accessibility){window.accessibility={startIndexes:[],items:[],indexOfCurrentItem:-1};
this.addEventListenerForNavigationOnPage();
this.addEventListenerForNavigationInList();
this.addEventListenerOnTabPress()
}this.createRefresherForIndexOfCurrentItem();
window.accessibility.startIndexes.push(window.accessibility.items.length);
(o=window.accessibility.items).push.apply(o,_toConsumableArray(this.items))
}},{key:"addEventListenerForNavigationOnPage",value:function h(){var o=this;
window.addEventListener("keydown",function(p){if(p.key.toLowerCase()==="l"){!p.shiftKey?o.changeIndexOfCurrentItem(o.findNextStartIndex()):o.changeIndexOfCurrentItem(o.findPreviousStartIndex())
}})
}},{key:"findNextStartIndex",value:function j(){for(var o=0;
o<window.accessibility.startIndexes.length;
o++){if(window.accessibility.startIndexes[o]>window.accessibility.indexOfCurrentItem){return window.accessibility.startIndexes[o]
}}return -1
}},{key:"findPreviousStartIndex",value:function e(){for(var o=window.accessibility.startIndexes.length-1;
o>=0;
o--){if(window.accessibility.startIndexes[o]<window.accessibility.indexOfCurrentItem){return window.accessibility.startIndexes[o]
}}return -1
}},{key:"changeIndexOfCurrentItem",value:function f(o){if(o>=0&&o<=window.accessibility.items.length-1){window.accessibility.indexOfCurrentItem=o;
this.setFocusToCurrentItem()
}}},{key:"setFocusToCurrentItem",value:function k(){var q=window.accessibility.items[window.accessibility.indexOfCurrentItem];
var p=q.getAttribute("tabindex")&&q.getAttribute("tabindex")!=="-1";
if(!p){q.setAttribute("tabindex",0);
q.addEventListener("focusout",function o(){q.setAttribute("tabindex",-1);
q.removeEventListener("focusout",o)
})
}q.focus()
}},{key:"addEventListenerForNavigationInList",value:function i(){var o=this;
window.addEventListener("keydown",function(p){if(p.key==="ArrowRight"||!p.shiftKey&&p.key.toLowerCase()==="i"){o.changeIndexOfCurrentItem(window.accessibility.indexOfCurrentItem+1)
}else{if(p.key==="ArrowLeft"||p.shiftKey&&p.key.toLowerCase()==="i"){o.changeIndexOfCurrentItem(window.accessibility.indexOfCurrentItem-1)
}}})
}},{key:"addEventListenerOnTabPress",value:function c(){window.addEventListener("keydown",function(o){if(o.key==="Tab"){setTimeout(function(){var p=window.accessibility.items.findIndex(function(q){return document.activeElement.compareDocumentPosition(q)!==Node.DOCUMENT_POSITION_PRECEDING
});
window.accessibility.indexOfCurrentItem=p===-1?window.accessibility.items.length-1:p
},0)
}})
}},{key:"createRefresherForIndexOfCurrentItem",value:function g(){this.items.forEach(function(o){o.addEventListener("focus",function(){window.accessibility.indexOfCurrentItem=window.accessibility.items.indexOf(o)
})
})
}}]);
return l
}();
a.moduleName="Column Control";
a.selector=".colctrl-ui";
return a
});
define("PaddingComponent",["utils"],function(a){var d={DATA_DESKTOP_HEIGHT:"data-desktopHeight",DATA_RESPONSIVE_HEIGHT:"data-responsiveHeight",DATA_RESPONSIVE_BREAKPOINTS:"data-responsiveBreakpoints",TABLET:"tablet",MOBILE:"mobile"};
var c={mobile:"(max-width: 767px)",tablet:"(min-width: 768px) and (max-width: 991px)"};
var b=function(){function e(h){_classCallCheck(this,e);
this._el=h[0];
this.desktopHeight=this._el.getAttribute(d.DATA_DESKTOP_HEIGHT);
this.responsiveHeight=this._el.getAttribute(d.DATA_RESPONSIVE_HEIGHT)||this.desktopHeight;
this.breakPoint=this._el.getAttribute(d.DATA_RESPONSIVE_BREAKPOINTS);
this.isTabletBreakPoint=this.breakPoint===d.TABLET;
this.isMobileBreakPoint=this.breakPoint===d.MOBILE;
this.init()
}_createClass(e,[{key:"init",value:function g(){this.resizeEventHandler();
window.addEventListener("resize",a.debounce(this.resizeEventHandler.bind(this),300))
}},{key:"resizeEventHandler",value:function f(){var i=window.matchMedia(c.tablet).matches;
var h=window.matchMedia(c.mobile).matches;
if(this.isTabletBreakPoint&&(h||i)){this._el.style.height=this.responsiveHeight+"px"
}else{if(this.isMobileBreakPoint&&h){this._el.style.height=this.responsiveHeight+"px"
}else{this._el.style.height=this.desktopHeight+"px"
}}}}]);
return e
}();
b.moduleName="Padding Component";
b.selector=".padding-component-ui";
return b
});
define("RolloverBlocks",[],function(){var b={BLOCK:"rollover-blocks__block",FOCUSED_BLOCK:"rollover-blocks__block--focused",BLOCK_CONTENT:"rollover-blocks__content",ROLLOVER_BLOCK:"rollover-blocks__description-rollover",LINK_A11Y:"rollover-blocks__link-holder--a11y",LINK_LEARN_MORE:"rollover-blocks__link",RTE_LINKS:"rollover-blocks__text a"};
var a=function(){function d(h){_classCallCheck(this,d);
this.el=h[0];
this.blocks=this.el.querySelectorAll("."+b.BLOCK);
this.addEventListenersToBlocks()
}_createClass(d,[{key:"addEventListenersToBlocks",value:function g(){var h=this;
this.blocks.forEach(function(p,n){var m=p.querySelector("."+b.BLOCK_CONTENT);
var j=p.querySelector("."+b.LINK_A11Y);
var l=p.querySelector("."+b.ROLLOVER_BLOCK);
var i=p.querySelector("."+b.LINK_LEARN_MORE);
var o=p.querySelectorAll("."+b.RTE_LINKS);
var k=[i].concat(_toConsumableArray(o));
if(n===0){h.showForAccessibility(m)
}m.addEventListener("click",function(){if(i){i.click()
}else{if(o[0]){o[0].click()
}}});
h.hideForAccessibility.apply(h,_toConsumableArray(o));
h.addEventListenerToRolloverBlock(p,l,k);
j.addEventListener("click",function(){h.showForAccessibility.apply(h,[l].concat(_toConsumableArray(k)));
l.focus({preventScroll:true})
})
})
}},{key:"addEventListenerToRolloverBlock",value:function c(k,j,i){var h=this;
j.addEventListener("focus",function(){setTimeout(function(){k.classList.add(b.FOCUSED_BLOCK);
h.showForAccessibility.apply(h,[j].concat(_toConsumableArray(i)))
},5)
});
j.addEventListener("blur",function(){k.classList.remove(b.FOCUSED_BLOCK);
h.hideForAccessibility.apply(h,[j].concat(_toConsumableArray(i)))
});
i.forEach(function(l){if(l){l.addEventListener("focus",function(){k.classList.add(b.FOCUSED_BLOCK);
h.showForAccessibility.apply(h,[j].concat(_toConsumableArray(i)))
});
l.addEventListener("blur",function(){k.classList.remove(b.FOCUSED_BLOCK);
h.hideForAccessibility.apply(h,[j].concat(_toConsumableArray(i)))
})
}})
}},{key:"showForAccessibility",value:function e(){for(var i=arguments.length,h=Array(i),j=0;
j<i;
j++){h[j]=arguments[j]
}h.forEach(function(k){if(k){k.setAttribute("tabindex",0);
k.removeAttribute("aria-hidden")
}})
}},{key:"hideForAccessibility",value:function f(){for(var i=arguments.length,h=Array(i),j=0;
j<i;
j++){h[j]=arguments[j]
}h.forEach(function(k){if(k){k.setAttribute("tabindex",-1);
k.setAttribute("aria-hidden",true)
}})
}}]);
return d
}();
a.selector=".rollover-blocks-ui";
a.moduleName="Rollover Blocks";
return a
});
define("TileList",[],function(){var b={TILE:"tile-list__item",TILE_ACTIVE:"tile-list__item--active",TILE_LINK:"tile-list__link",TILE_LINK_EXTERNAL:"tile-list__external-link",LINK_A11Y:"tile-list__link--a11y",LINK_A11Y_HOLDER:"tile-list__link-holder--a11y",TILE_CONTENT:"tile-list__content",TABS_UI:"tabs-ui",TABS_ITEM:"tabs__item"};
var a=function(){function k(m){_classCallCheck(this,k);
this.el=m[0];
this.tiles=this.el.querySelectorAll("."+b.TILE);
this.addEventListeners();
this.disableTabsFocus()
}_createClass(k,[{key:"addEventListeners",value:function g(){var m=this;
this.tiles.forEach(function(s,q){var p=s.querySelector("."+b.LINK_A11Y);
var r=s.querySelector("."+b.LINK_A11Y_HOLDER);
var o=s.querySelector("."+b.TILE_LINK);
var n=s.querySelector("."+b.TILE_CONTENT);
var u=s.querySelector("."+b.TILE_LINK_EXTERNAL);
var t=[o,u];
if(q===0){m.showA11yForTile(n,s)
}m.hideA11yForTile(n);
m.addEventListenersToTileContent(s,n,t);
m.addEventListenersToA11yLink(s,n,p,r,t);
m.addEventListenerToTile(s,r,t);
m.addEventListenersToLinks(s,n,t)
})
}},{key:"addEventListenersToLinks",value:function l(o,n,p){var m=this;
p.forEach(function(q){if(q){q.addEventListener("focus",function(){o.classList.add(b.TILE_ACTIVE);
m.showA11yForTile.apply(m,[n].concat(_toConsumableArray(p)))
});
q.addEventListener("focusout",function(){o.classList.remove(b.TILE_ACTIVE);
m.hideA11yForTile.apply(m,[n].concat(_toConsumableArray(p)))
})
}})
}},{key:"addEventListenerToTile",value:function j(n,m,o){var p=this;
n.addEventListener("focus",function(){m.setAttribute("aria-hidden",true)
});
n.addEventListener("click",function(){p.simulateClickOnTileLinks(o)
})
}},{key:"addEventListenersToA11yLink",value:function i(p,m,n,o,q){var r=this;
n.addEventListener("focus",function(){o.setAttribute("aria-hidden",false)
});
n.addEventListener("click",function(s){s.stopPropagation();
p.classList.add(b.TILE_ACTIVE);
r.showA11yForTile.apply(r,[m].concat(_toConsumableArray(q)));
setTimeout(function(){m.focus()
},5)
})
}},{key:"addEventListenersToTileContent",value:function c(n,m,p){var o=this;
m.addEventListener("focus",function(){setTimeout(function(){n.classList.add(b.TILE_ACTIVE);
o.showA11yForTile.apply(o,[m].concat(_toConsumableArray(p)))
},5)
});
m.addEventListener("focusout",function(){n.classList.remove(b.TILE_ACTIVE);
o.hideA11yForTile.apply(o,[m].concat(_toConsumableArray(p)))
});
m.addEventListener("click",function(q){q.stopPropagation();
o.simulateClickOnTileLinks(p)
})
}},{key:"simulateClickOnTileLinks",value:function h(m){m.forEach(function(n){if(n){n.click()
}})
}},{key:"showA11yForTile",value:function d(){for(var o=arguments.length,m=Array(o),n=0;
n<o;
n++){m[n]=arguments[n]
}m.forEach(function(p){if(p){p.setAttribute("tabindex",0);
p.removeAttribute("aria-hidden")
}})
}},{key:"hideA11yForTile",value:function f(){for(var o=arguments.length,m=Array(o),n=0;
n<o;
n++){m[n]=arguments[n]
}m.forEach(function(p){if(p){p.setAttribute("tabindex",-1);
p.setAttribute("aria-hidden",true)
}})
}},{key:"disableTabsFocus",value:function e(){var m=this.el.closest("."+b.TABS_UI);
if(m){m.querySelectorAll("."+b.TABS_ITEM).forEach(function(n){n.setAttribute("tabindex",-1)
})
}}}]);
return k
}();
a.moduleName="Tile List";
a.selector=".tile-list-ui";
return a
});
define("VideoShowcaseA11y23",[],function(){var i={container:"a11y-container",navigationPanel:"a11y-navigation-panel"};
var j=0;
function l(n){this.$optionsA11=n;
this.$elA11=$(this.$el).find("."+i.container);
this.$navigationPanelA11=this.$elA11.find("."+i.navigationPanel);
this.$navigationItemsA11=this.$navigationPanelA11.find("."+this.$optionsA11["list-item"]);
this.$navigationItemsLengthA11=this.$navigationItemsA11.length;
d.call(this);
f.call(this)
}function d(o){this.$navigationPanelA11.attr("role","tablist");
var n=o?o:j;
$.each(this.$navigationItemsA11,function(p,q){if(p===n){$(q).attr("aria-selected","true").attr("role","tab").attr("tabindex","0");
return
}$(q).attr("aria-selected","false").attr("role","tab").attr("tabindex","-1")
})
}function b(){$.each(m.call(this),function(n,o){$(o).attr("aria-selected","false").attr("tabindex","-1")
})
}function m(){return this.$navigationPanelA11.find('[aria-selected="true"]')
}function h(){var n=m.call(this).next("."+this.$optionsA11["list-item"]);
return n.length!==0?n:$(this.$navigationItemsA11[0])
}function e(){var n=m.call(this).prev("."+this.$optionsA11["list-item"]);
return n.length!==0?n:$(this.$navigationItemsA11[this.$navigationItemsLengthA11-1])
}function c(o){var n=o();
b.call(this);
n.attr("aria-selected","true").attr("tabindex","0").focus()
}function g(){c.call(this,h.bind(this))
}function k(){c.call(this,e.bind(this))
}function a(o){var n=o.keyCode;
if(n===39||n===40){g.call(this);
this.$optionsA11["move-forward-callback"]&&this.$optionsA11["move-forward-callback"].call(this)
}if(n===37||n===38){k.call(this);
this.$optionsA11["move-downward-callback"]&&this.$optionsA11["move-downward-callback"].call(this)
}if(n===35||n===36){}if(n===13||n===32){this.$optionsA11["enter-action"]&&this.$optionsA11["enter-action"].call(null,o.target)
}}function f(){this.$navigationPanelA11.on("keydown",a.bind(this))
}return{init:l,setSpecialAttribute:d}
});
define("Text23",["utils","gradients"],function(b,a){function c(e){var d={allNodesSelector:"."+a.classes.RTE_TEXT_GRADIENT,overridenNodesSelector:"."+this.classes.ecModeOverride+" ."+a.classes.RTE_TEXT_GRADIENT,alwaysDarkNodesSelector:"."+this.classes.mediaContent+" ."+a.classes.RTE_TEXT_GRADIENT,alwaysDarkGradientText:new a.GradientText(),alwaysLightGradientText:new a.GradientText(),gradientText:new a.GradientText(),ecModeGradientText:new a.GradientText(),darkMode:a.modes.DARK,lightMode:a.modes.LIGHT,ecMode:a.modes.EC};
this.$el=e;
this.$el.find("table").wrap('<div class="'+this.classes.tableWrapper+'"></div>');
b.insertArrowPictureForLinks(this.$el);
b.applyTextGradients.call(this,d)
}c.prototype.classes={tableWrapper:"text__table-wrapper",ecModeOverride:"ec-mode-override",mediaContent:"media-content"};
c.moduleName="Text23";
c.selector=".text-ui-23";
return c
});
define("Slider23",["utils-env","ResponsiveImage23","utils","media","SliderUtils23","SliderClasses23","constants","gradients"],function(f,g,i,b,m,c,l,e){var h={singleFullWidth:"single-full-width",twoColumns:"text-in-two-columns",textImage:"text-and-image-in-two-columns"};
var k={video:{end:"ended"},slider:{translate:"translate.owl.carousel",stopAutoplay:"stop.owl.autoplay",destroy:"destroy.owl.carousel",playAutoplay:"play.owl.autoplay",next:"next.owl.carousel",prev:"prev.owl.carousel",resized:"resized.owl.carousel"}};
var d=0.5;
var a={allNodesSelector:c.clonedSlideSelector+" ."+e.classes.RTE_TEXT_GRADIENT,overridenNodesSelector:c.ecModeOverride+e.classes.RTE_TEXT_GRADIENT,alwaysDarkNodesSelector:c.mediaContent+" "+c.clonedSlideSelector+" ."+e.classes.RTE_TEXT_GRADIENT,alwaysDarkGradientText:new e.GradientText(),alwaysLightGradientText:new e.GradientText(),gradientText:new e.GradientText(),ecModeGradientText:new e.GradientText(),darkMode:e.modes.DARK,lightMode:e.modes.LIGHT,ecMode:e.modes.EC};
function j(n){this.timerId=null;
this.$parentNode=n;
this.$el=n.find("."+c.owlRoot);
this.isEditMode=f.isEditMode();
this.itemCount=this.$el.children().length;
this.$sliderSlide=this.$el.find("."+c.sliderSlide);
this.singleSlideContentContainer=this.$el.find("."+c.singleSlideContentContainer);
this.playspeed=this._setPlaySpeed();
this.currentCount=1;
this.slidesCount=this.$parentNode.data("slides-count");
this.slidesCountDesktop=Math.ceil(this.slidesCount/2);
this.dotsColor=this.$parentNode.data("dots-color");
this.dotActiveColor=this.$parentNode.data("dot-active-color");
this.contentWidth=n.data("content-width");
this.configuration=n.data("configuration");
this.autorotationByVideo=n.data("autorotation");
this.isDragging=false;
this.isMobile=b.currentMode().lessThan(b.modes.Desktop);
this.activeSlide=this.$el.find(".owl-item.active");
this.endVideoHandler=this.endVideoCallback.bind(this);
this.endVideoHandlerMobile=this.endVideoCallbackMobile.bind(this);
this.$stopAutoRotate=false;
this._timer=null;
this._isSliderMoving=false;
this._playedVideo=null;
this.userAction=false;
this.isHasVideo=this.$el.find(" > .slider__slide video");
this.$observerCallback=this.getObserverCallback();
this.$observerSecondCallback=this.autorotationByVideo?this.freeze.bind(this):this.freezeSlider.bind(this);
this.revealCurrentCarousel();
this.adjustContentWidth();
m.setDotsHiddenText.call(this);
this.setEcModeForDots=m.setEcModeForSlider.call(this).bind(this);
this.$handlers={mouseleave:[],mouseenter:[],run:function(o){o.forEach(function(p){p.call(this)
}.bind(this))
}.bind(this)};
this.init();
i.applyShadowOnImage(this.$el,this.$el.find(".single-slide__image--mobile"));
this.adjustSliderContainersHeight=m.adjustSliderContainersHeight.bind(this);
this.$hasCTALink=this.$el.find(c.ctaLink).length>0;
this.windowWidth=window.innerWidth
}j.prototype.init=function(){m.markNewActiveVideoTypeRegardingTheme.call(this);
this.stopSliderWhenMouseOver();
this.initEvents();
this.initNavigationEvents()
};
j.prototype._setPlaySpeed=function(){var n=this.$parentNode.data("playSpeed")>=0?this.$parentNode.data("playSpeed"):5;
return n*1000
};
j.prototype._clearTimer=function(){if(this._timer){clearTimeout(this._timer)
}};
j.prototype.observerHandler=function(n){n.forEach(function(o){if(o.intersectionRatio>=d){this.$observerCallback()
}else{this.$observerSecondCallback()
}}.bind(this))
};
j.prototype.getSliderConfig=function(){return $.extend({},this.defaultConfig,this._sliderConfig(),{dotsData:true,onChanged:this.setCurrentSlide.bind(this),dotClass:c.dot+" "+this.dotsColor,navContainerClass:c.navigationContainer+" "+this.dotsColor})
};
j.prototype._sliderConfig=function(){if(this.playspeed&&!this.autorotationByVideo){var n={autoplay:true,autoplayTimeout:this.playspeed,autoplayHoverPause:true,onInitialized:this.onInitializedHandler.bind(this),onTranslate:this.onTranslateHandler.bind(this)};
if(b.currentMode().lessThan(b.modes.Desktop)){return $.extend(n,{onDrag:this.onDragHandler.bind(this),onTranslated:this.onTranslatedMobile.bind(this)})
}return $.extend(n,{onTranslated:this.onTranslated.bind(this),onDrag:this.navigationArrowsClickHandler.bind(this)})
}if(this.playspeed&&this.autorotationByVideo){var o={autoplay:false,autoplayHoverPause:false,onTranslate:this.onTranslateHandlerV2.bind(this),onInitialized:this.onInitializedHandler.bind(this),onDrag:function(){this._clearTimer()
}.bind(this)};
if(b.currentMode().lessThan(b.modes.Desktop)){return $.extend(o,{onDrag:function(){this._clearTimer();
this.onDragHandler()
}.bind(this),onTranslated:this.onTranslatedV2Mobile.bind(this)})
}return $.extend(o,{onTranslated:this.onTranslatedV2.bind(this),onDrag:function(){this._clearTimer();
this.navigationArrowsClickHandler()
}.bind(this)})
}return{autoplay:false,onInitialized:this.onInitializedHandler.bind(this),onTranslate:this.onTranslateHandler.bind(this),onTranslated:this.onTranslated.bind(this)}
};
j.prototype.getObserverCallback=function(){if(this.playspeed===0){return this.releaseSliderZeroSpeed.bind(this)
}return this.autorotationByVideo?this.autoRotationByVideo.bind(this):this.releaseSlider.bind(this)
};
j.prototype.onDragHandler=function(){this.userAction=true
};
j.prototype.onTranslateHandler=function(){this._isSliderMoving=true;
if(this.isHasVideo){this.pauseAllVideos()
}};
j.prototype.onTranslateHandlerV2=function(){this._isSliderMoving=true;
if(this.isHasVideo){this._clearTimer();
this.pauseAllVideos()
}};
j.prototype.onTranslated=function(){this._isSliderMoving=false;
this.playActiveVideo()
};
j.prototype.onTranslatedMobile=function(){this._isSliderMoving=false;
this.playActiveVideo();
if(this.userAction){this.$el.trigger(k.slider.stopAutoplay)
}};
j.prototype.onTranslatedV2=function(){this._isSliderMoving=false;
this.autoRotationByVideo();
this.prepareVideoToPlayAgain()
};
j.prototype.onTranslatedV2Mobile=function(){this._isSliderMoving=false;
if(this.userAction){this.autoRotationByVideoMobile()
}else{this.autoRotationByVideo();
this.prepareVideoToPlayAgain()
}};
j.prototype.onInitializedHandler=function(){this.initSliderButtons();
m.setDotsPosition.call(this);
m.updatePagination.call(this);
this.playActiveVideo();
i.applyTextGradients.call(this,a)
};
j.prototype.syncClonedVideo=function(p){if(p){var n=p.getAttribute("src");
var o=m.getClonedVideoByUrl.call(this,n,p);
if(o){o.currentTime=p.duration===p.currentTime?0:p.currentTime;
o.play()
}}};
j.prototype.prepareVideoToPlayAgain=function(){if(this._playedVideo===null){return
}var n=m.getClonedVideoByUrl.call(this,this._playedVideo.getAttribute("src"),this._playedVideo);
if(n){if(this._playedVideo.duration===this._playedVideo.currentTime){this._playedVideo.currentTime=n.currentTime=0;
this._playedVideo=null
}}};
j.prototype.revealCurrentCarousel=function(){if(this.configuration!==h.twoColumns){this.$el=this.$parentNode.find("."+c.owlRoot);
this.itemCount=this.$el.children().length;
return
}if(b.currentMode().lessThan(b.modes.Desktop)){this.$el=this.$parentNode.find("."+c.owlRoot+c.mobileMod);
this.$parentNode.find("."+c.owlRoot+c.desktopMod).hide()
}else{this.$el=this.$parentNode.find("."+c.owlRoot+c.desktopMod);
this.$parentNode.find("."+c.owlRoot+c.mobileMod).hide()
}this.$el.show();
this.itemCount=this.$el.children().length
};
j.prototype.onLoadHandler=function(){this.initSliding(f.isEditMode());
if(this.$el[0]!==undefined){this._observer=new IntersectionObserver(this.observerHandler.bind(this),{threshold:d,rootMargin:"-100px 0px 0px 0px"});
this._observer.observe(this.$el[0])
}if(!this.autorotationByVideo&&this.configuration===h.singleFullWidth||this.configuration===h.singleFullWidth&&this.playspeed===0){this.setInfiniteLoopForAllVideos()
}};
j.prototype.onResizeHandler=function(){if(window.innerWidth!==this.windowWidth){this.windowWidth=window.innerWidth;
m.changeContentHeightToAuto.call(this);
m.setDotsPosition.call(this);
this.adjustContentWidth();
if(this.isMobile!==b.currentMode().lessThan(b.modes.Desktop)){this.isMobile=b.currentMode().lessThan(b.modes.Desktop);
this.onChangeMediaQuery()
}if(this.$hasCTALink){m.hideCTALinks.call(this);
if(this.timerId){clearTimeout(this.timerId)
}this.timerId=setTimeout(function(){this.adjustSliderContainersHeight();
m.showCTALinks.call(this)
}.bind(this),150)
}}};
j.prototype.initEvents=function(){window.addEventListener("load",this.onLoadHandler.bind(this));
window.addEventListener("resize",i.debounce(this.onResizeHandler.bind(this),300));
$(document.body).on(l.Events.themeSwitch,this.themeSwitchEventHandler.bind(this));
if(this.$el.parents(".tabs-ui-23").length>0){$(window).on(l.Events.tabChanged,m.tabChangedCallback.bind(this))
}$(window).on("load",this.loadEventHandler.bind(this));
if(this.$handlers.mouseenter.length===0){return
}this.$parentNode.on("mouseenter ",function(){this.$handlers.mouseenter.forEach(function(n){n.call(this)
}.bind(this))
}.bind(this));
this.$parentNode.on("mouseleave",function(){this.$handlers.mouseleave.forEach(function(n){n.call(this)
}.bind(this))
}.bind(this))
};
j.prototype.themeSwitchEventHandler=function(){m.markNewActiveVideoTypeRegardingTheme.call(this);
this.updateVideoEventsAfterSwitchMode();
this.setVideoClasses();
this.setOwlItemsMode()
};
j.prototype.loadEventHandler=function(){if(this.$hasCTALink){setTimeout(function(){this.adjustSliderContainersHeight();
m.showCTALinks.call(this)
}.bind(this),150)
}};
j.prototype.additionalEvents=function(){this.$parentNode.on("mouseenter ",function(){this.$stopAutoRotate=true
}.bind(this));
this.$parentNode.on("mouseleave",function(){this.$stopAutoRotate=false;
if(!this._isSliderMoving){this.autoRotationByVideo()
}}.bind(this))
};
j.prototype.stopSliderWhenMouseOver=function(){if(this.autorotationByVideo&&this.playspeed>0){this.$handlers.mouseenter.push(function(){this.$stopAutoRotate=true
});
this.$handlers.mouseleave.push(function(){this.$stopAutoRotate=false;
if(!this._isSliderMoving){this.autoRotationByVideo()
}})
}else{if(this.playspeed>0){this.$handlers.mouseenter.push(function(){this.$el.trigger(k.slider.stopAutoplay)
});
this.$handlers.mouseleave.push(function(){this.$el.trigger(k.slider.playAutoplay)
})
}}};
j.prototype.onChangeMediaQuery=function(){if(this.configuration===h.twoColumns){this.switchOwl()
}if(this.configuration===h.singleFullWidth&&this.isMobile){m.changeContentWidthToAuto.call(this)
}};
j.prototype.switchOwl=function(){var n=this.$el.height();
this.$parentNode.find("."+c.owlRoot+c.mobileMod).height(n);
this.$parentNode.find("."+c.owlRoot+c.desktopMod).height(n);
this.$el.trigger(k.slider.destroy).removeClass("owl-carousel owl-loaded");
this.$el.find(".owl-stage-outer").children().unwrap();
this.revealCurrentCarousel();
this.$el.removeAttr("style");
m.setDotsHiddenText.call(this);
this.initSliding(f.isEditMode())
};
j.prototype.adjustContentWidth=function(){if(this.configuration===h.singleFullWidth&&!this.isEditMode){if(this.isMobile){this.contentWidth=100
}this.singleSlideContentContainer.width(this.contentWidth+"%")
}};
j.prototype.setCurrentSlide=function(n){if(n.page.index===-1){this.currentCount=1
}else{this.currentCount=n.page.index+1
}this.$el.parents("."+c.sliderContainer).find("."+c.currentPage).text(this.currentCount.toString().padStart(2,"0"))
};
j.prototype.toggleActiveDotClass=function(n,o){n.toggleClass(this.dotsColor,!o).toggleClass(this.dotActiveColor,o)
};
j.prototype.initSliding=function(o){var n=!o&&this.itemCount>1;
if(!n){return
}this.$el.owlCarousel(this.getSliderConfig());
this.carouselData=this.$el.data("owl.carousel");
this.dots=this.$el.find("."+c.dot);
if(this.playspeed){this.$el.find("."+c.dot).on("click",this.pauseAllVideos.bind(this))
}this.reloadClonedImages();
m.initDotsColors.call(this);
this.setVideoClasses();
this.setEcModeForDots(0);
this.$el.on(k.slider.translate,function(p){this.setVideoClasses();
this.setEcModeForDots(p.page.index)
}.bind(this));
this.$el.on(k.slider.next+" "+k.slider.prev,function(){a.alwaysDarkGradientText.stop();
a.alwaysLightGradientText.stop();
a.gradientText.stop();
a.ecModeGradientText.stop();
i.applyTextGradients.call(this,a)
}.bind(this));
this.setOwlItemsMode()
};
j.prototype.initNavigationEvents=function(){var p=this.$el.parents("."+c.sliderContainer);
var n=p.find(c.leftArrowSelector);
var o=p.find(c.rightArrowSelector);
this.$navigationArrousContainer=this.$parentNode.find("."+c.navigationContainer);
n.click(function(){this.$el.trigger(k.slider.prev)
}.bind(this));
o.click(function(){this.$el.trigger(k.slider.next)
}.bind(this));
this.$navigationArrousContainer.on("click",".slider-navigation-arrow",function(){this.navigationArrowsClickHandler()
}.bind(this))
};
j.prototype.navigationArrowsClickHandler=function(){this._observer&&this._observer.disconnect();
this.$handlers.run(this.$handlers.mouseenter);
this.$parentNode.off("mouseenter");
this.$parentNode.off("mouseleave");
this.$navigationArrousContainer.off("click")
};
j.prototype.setOwlItemsMode=function(){setTimeout(function(){var n=this.$el.find(".owl-item");
n.each(function(){var q=$(this).find(c.videoContainer);
var o=$(document.body).hasClass("dark-mode");
var s=$(document.body).hasClass("light-mode");
if(q.length!==0){var r=$(q).attr("data-src-dark-video");
var p=$(q).attr("data-src-light-video");
if(r&&p){if(o){$(this).addClass("dark-owl-item");
$(this).removeClass("light-owl-item")
}else{if(s){$(this).addClass("light-owl-item");
$(this).removeClass("dark-owl-item")
}}}else{if(r){$(this).addClass("dark-owl-item");
$(this).removeClass("light-owl-item")
}else{if(p){$(this).addClass("light-owl-item");
$(this).removeClass("dark-owl-item")
}}}}})
}.bind(this),0)
};
j.prototype.setVideoClasses=function(){var n=function(t,u,r){var v=$(t).attr("data-src-dark-video");
var s=$(t).attr("data-src-light-video");
var q=$(t).attr("src");
var p=false;
if(v&&s){if(u==="dark"){if(q!==v){$(t).attr("src",v);
p=true
}this.$el.addClass("dark-video");
this.$el.removeClass("light-video")
}else{if(u==="light"){if(q!==s){$(t).attr("src",s);
p=true
}this.$el.addClass("light-video");
this.$el.removeClass("dark-video")
}}}else{if(v){if(q!==v){$(t).attr("src",v);
p=true
}this.$el.addClass("dark-video");
this.$el.removeClass("light-video")
}else{if(s){if(q!==s){$(t).attr("src",s);
p=true
}this.$el.addClass("light-video");
this.$el.removeClass("dark-video")
}}}if(p){t.load()
}if(r){t.play()
}}.bind(this);
var o=function(q,r){var t=q[0];
var s=q[1];
var p=$(document.body).hasClass("dark-mode");
var u=$(document.body).hasClass("light-mode");
if(p){n(t,"dark",r)
}else{if(u){n(s,"light",r)
}}};
setTimeout(function(){var r=this.$el.find(".owl-item.active");
var q=r.next();
var p=r.find(c.videoContainer);
var s=q.find(c.videoContainer);
if(p.length){o(p,true)
}else{this.$el.removeClass("dark-video light-video")
}if(s.length){this.$el.one(k.slider.translate,function(){o(s,false)
})
}}.bind(this),0)
};
j.prototype.initSliderButtons=function(){this.$el.find("."+c.rightArrow).click(this.$observerSecondCallback.bind(this));
this.$el.find("."+c.leftArrow).click(this.$observerSecondCallback.bind(this))
};
j.prototype.wcmModeChange=function(n){if(this.carouselData){this.carouselData.destroy()
}this.initSliding(n==="edit")
};
j.prototype.setInfiniteLoopForAllVideos=function(){var n=this.$el.find(c.videoContainer);
for(var o=0;
o<n.length;
o++){n[o].loop=true
}};
j.prototype.freeze=function(){this._clearTimer();
this.pauseAllVideos()
};
j.prototype.freezeSlider=function(){this.$el.trigger(k.slider.stopAutoplay);
this.pauseAllVideos()
};
j.prototype.pauseAllVideos=function(){var o=this.$el.find(c.videoContainer);
for(var n=0;
n<o.length;
n++){o[n].pause()
}};
j.prototype.playActiveVideo=function(o){var n=o||this.getActiveVideo();
if(n){this.syncClonedVideo(n);
n.play()
}};
j.prototype.releaseSlider=function(){this.playActiveVideo();
this.$el.trigger(k.slider.playAutoplay,[this.playspeed])
};
j.prototype.releaseSliderZeroSpeed=function(){this.playActiveVideo()
};
j.prototype.reloadClonedImages=function(){var n=this.$el.find(".cloned .responsive-image-ui-23");
if(n.length===1){new g(n)
}};
j.prototype.getActiveVideo=function(){var n=this.$el.find(c.activeVideo);
if(n.length>0){return n[0]
}return null
};
j.prototype.endVideoCallback=function(){var n=this.getActiveVideo();
if(!this.$stopAutoRotate){this._playedVideo=n;
this.$el.trigger(k.slider.next)
}else{this.playActiveVideo(n);
this.autoRotationByVideo()
}};
j.prototype.endVideoCallbackMobile=function(){this.autoRotationByVideoMobile()
};
j.prototype.updateVideoEventsAfterSwitchMode=function(){var n=this.getActiveVideo();
if(n){var p=this.$el.find(c.videoTags);
for(var o=0;
o<p.length;
o++){p[o].removeEventListener(k.video.end,this.endVideoHandler)
}n.addEventListener(k.video.end,this.endVideoHandler,{once:true})
}};
j.prototype.autoRotationByVideo=function(){var n=this.getActiveVideo();
if(n){n.removeEventListener(k.video.end,this.endVideoHandler);
n.addEventListener(k.video.end,this.endVideoHandler,{once:true});
this.playActiveVideo(n)
}else{this._clearTimer();
this._timer=setTimeout(function(){if(!this.$stopAutoRotate){this.$el.trigger(k.slider.next)
}}.bind(this),this.playspeed)
}};
j.prototype.autoRotationByVideoMobile=function(){if(this.userAction){var n=this.getActiveVideo();
if(n){n.removeEventListener(k.video.end,this.endVideoHandlerMobile);
n.addEventListener(k.video.end,this.endVideoHandlerMobile,{once:true});
this.playActiveVideo(n)
}}else{this.autoRotationByVideo()
}};
j.prototype.defaultConfig={loop:true,center:false,autoplay:false,playspeed:0,items:1,loadedClass:c.sliderLoaded,dragClass:c.sliderDrag,dotClass:c.dot,dotsClass:c.progressBar,responsiveRefreshRate:0,lazyLoad:true,lazyLoadEager:3,nav:false};
j.selector=".slider-ui-23";
j.moduleName="Slider23";
return j
});
define("SliderUtils23",["SliderClasses23"],function(r){var q={singleFullWidth:"single-full-width",twoColumns:"text-in-two-columns",textImage:"text-and-image-in-two-columns"};
var p=52;
function o(){this.$el.find("."+r.singleSlideContentContainer).each(function(){$(this).css("height","")
})
}function b(){if(!this.isEditMode){var s=this.$el.find(r.ctaLink);
for(var t=0;
t<s.length;
t++){$(s[t]).removeClass(r.invisible)
}}}function h(){var s=this.$el.find(r.ctaLink);
for(var t=0;
t<s.length;
t++){$(s[t]).addClass(r.invisible)
}}function e(){var s=this.$el.find(r.singleSlideContentSelector);
if(s.length>0){var t=0;
for(var u=0;
u<s.length;
u++){var w=s[u].clientHeight;
if(t<w){t=w
}}var v=this.$el.find("."+r.singleSlideContentContainer);
for(u=0;
u<v.length;
u++){$(v[u]).css("height",t+"px")
}}}function d(){this.$el.find("."+r.singleSlideContentContainer).each(function(){$(this).css("width","")
})
}function i(){for(var v=0;
v<this.$sliderSlide.length;
v++){var s=v+1;
var w=this.$sliderSlide[v].querySelector(".layout-box__wrapper");
var x=this.$sliderSlide[v].querySelector(".text-ui");
var u=this.$sliderSlide[v].querySelector(r.twoCellsSlideContent);
var A=this.$sliderSlide[v].querySelector(".button");
var y="";
if(A){var t=A.querySelector(".button__content--mobile");
y=this.$sliderSlide[v].textContent.replace(t.textContent,"")
}var z="";
if(w&&A||u&&A){z='<span class="rs-only"> Slide '+s+": "+y+"</span>";
$(this.$sliderSlide[v]).attr("data-dot",z)
}else{if(w){z='<span class="rs-only"> Slide '+s+": "+w.textContent+"</span>";
$(this.$sliderSlide[v]).attr("data-dot",z)
}else{if(u){z='<span class="rs-only"> Slide '+s+": "+u.textContent+"</span>";
$(this.$sliderSlide[v]).attr("data-dot",z)
}else{if(x){z='<span class="rs-only"> Slide '+s+": "+x.textContent+"</span>";
$(this.$sliderSlide[v]).attr("data-dot",z)
}}}}}}function l(){if(this.$el.hasClass(r.singleSlider)&&this.$el.hasClass(r.sliderPositionContentSide)){k.call(this,r.singleSlideContentContainer,0)
}if(this.$el.hasClass(r.sliderPositionContentSide)){if(this.$el.find(r.twoCellsSlideUi).hasClass(r.twoCellsSlideContentLeft)){k.call(this,r.twoCellsSlideContent,0,".two-cells-slide__content-left")
}if(this.$el.find(r.twoCellsSlideUi).hasClass(r.twoCellsSlideContentRight)){k.call(this,r.twoCellsSlideContent,0,".two-cells-slide__content-right")
}}}function c(){if(this.dotsColor===this.dotActiveColor){return
}this.toggleActiveDotClass(this.dots.filter(r.active),true);
this.$el.on("translated.owl.carousel",function(){setTimeout(function(){if(!this.isDragging){this.setDotsPosition();
l.call(this)
}}.bind(this),50)
}.bind(this));
this.$el.on("drag.owl.carousel",function(){this.isDragging=true
}.bind(this));
this.$el.on("dragged.owl.carousel",function(){this.isDragging=false
}.bind(this));
this.$el.on("changed.owl.carousel",function(){this.toggleActiveDotClass(this.dots,false);
this.toggleActiveDotClass(this.dots.filter(r.active),true)
}.bind(this))
}function g(){var v=$(window).scrollTop(),t=v+$(window).height(),s=this.$el.offset().top,u=s+this.$el.outerHeight()/2;
return !(v+p>u||u>t)
}function k(u,t,x){var w=this.$el.find(".owl-item.active "+(x?x:"")+" "+u)[0];
if(w){var v=this.$el.find("."+r.progressBar);
v.css({left:""});
var y=v.offset().left;
var A=w.firstElementChild?w.firstElementChild:w;
var z=A.getBoundingClientRect().left;
var s=parseInt(window.getComputedStyle(A,null).getPropertyValue("padding-left"));
v.css({left:z+t+s-y+"px"})
}}function j(){if(this.isEditMode){return
}var t=this.slidesCount;
if(this.configuration===q.twoColumns){t=this.isMobile?this.slidesCount:this.slidesCountDesktop
}var s=t.toString().padStart(2,"0");
this.$el.parents("."+r.sliderContainer).find("."+r.sumPage).text("/ "+s)
}function a(u,s){var v=this.$el.find('.owl-item .background-video[src="'+u+'"]');
if(v.length){for(var t=0;
t<v.length;
t++){if(!v[t].isSameNode(s)){return v[t]
}}}return null
}function f(){this.onResizeHandler()
}function n(){var t=this.$el.find(".single-slide-ui");
var s=this.$el.parent(".slider-ui-23");
var u=function(){var v=s.find(".slider-ui-23__owl-root.ec-mode-override");
v.removeClass("ec-mode-override")
};
return function(v){u.call(this);
var x=t[v];
var w=$(x).hasClass("ec-mode-override");
if(w){this.$el.addClass("ec-mode-override")
}}
}function m(){var s=this.$el.find("."+r.allActiveVideos);
if(s.length===0){return
}setTimeout(function(){s.removeClass(r.allActiveVideos);
var t=$(document.body).hasClass("dark-mode");
if(t){$(".dark-background-video").addClass(r.allActiveVideos)
}else{$(".light-background-video").addClass(r.allActiveVideos)
}},300)
}return{changeContentHeightToAuto:o,changeContentWidthToAuto:d,setDotsHiddenText:i,setDotsPosition:l,initDotsColors:c,isOnScreen:g,updatePagination:j,getClonedVideoByUrl:a,tabChangedCallback:f,setEcModeForSlider:n,adjustSliderContainersHeight:e,showCTALinks:b,hideCTALinks:h,markNewActiveVideoTypeRegardingTheme:m}
});
define("SliderClasses23",[],function(){return{sliderContainer:"slider-ui-23",progressBar:"slider__progress-bar",owlRoot:"slider-ui-23__owl-root",desktopMod:"--desktop",mobileMod:"--mobile",navigationContainer:"slider__navigation",pagination:"slider__pagination",sumPage:"slider__pagination--sum-page",currentPage:"slider__pagination--current-page",leftArrow:"slider__left-arrow slider-navigation-arrow",rightArrow:"slider__right-arrow slider-navigation-arrow",leftArrowSelector:".slider__left-arrow",rightArrowSelector:".slider__right-arrow",dot:"slider__dot",sliderSlide:"slider__slide",active:".active",sliderDrag:"slider--drag",sliderLoaded:"slider--loaded",expanded:"slider--expanded",twoCellsSlideUi:".two-cells-slide-ui",singleSlideUi:"single-slide-ui",singleSlider:"slider--single",singleSlideContent:"single-slide__content",singleSlideContentContainer:"single-slide__content-container",singleSlideContentSelector:".owl-item:not(.cloned) .single-slide__content-container",clonedSlideSelector:".owl-item.cloned",twoCellsSlideContent:".two-cells-slide__content",sliderPositionContentSide:"slider-position-content-side",twoCellsSlideContentLeft:"two-cells-slide__content-left",twoCellsSlideContentRight:"two-cells-slide__content-right",videoContainer:".background-video",activeVideo:".owl-item.active .background-video.active-video",videoTags:".owl-item.active .background-video",tabsComponentActiveTab:".tabs-23__item.active",allActiveVideos:"active-video",ecModeOverride:".owl-item.cloned .ec-mode-override .",mediaContent:".media-content",ctaLink:".slider-cta-link",invisible:"invisible"}
});
define("Section",["utils","media"],function(a,c){var d={SECTION_IMAGE:".section__image",PARALLAX_WRAPPER:".section-ui__parallax-wrapper.parallax-wrapper",ANIMATION_RENDERER:".section-ui__animation-renderer",EC_MODE:"ec-mode"};
function b(e){this.$el=e;
this.$body=$("body");
this.$imageContainer=this.$el[0].querySelector(d.ANIMATION_RENDERER);
this.imageName=e.attr("data-animation-name");
this.hideOnMobile=e.attr("data-hide-on-mobile");
this.isEditMode=e.is("[is-edit-mode]");
this.isDesktop=c.currentMode().greaterThan(c.modes.Tablet);
this.continuum=this.$body.hasClass(d.EC_MODE);
this.init()
}b.prototype.init=function(){a.applyShadowOnImage(this.$el,this.$el.find(d.SECTION_IMAGE),this.$el.find(d.PARALLAX_WRAPPER).length);
this.applyAnimation()
};
b.prototype.setImage=function(g,e){var f="";
if(this.isDesktop){f=g
}else{if(!this.hideOnMobile){f=e
}}return f||""
};
b.prototype.getFileName=function(){switch(this.imageName){case"style1":return this.setImage("Circle_Blur_Style2_Desktop","Circle_Blur_Style5_Mobile");
case"style2":return this.setImage("Circle_Blur_Style5_Desktop","Circle_Blur_Style5_Mobile");
case"style3":return this.setImage("Circle_Blur_Style5_Desktop");
case"style4":return this.setImage("Circle_Blur_Style2_Desktop","Circle_Blur_Style2_Mobile");
case"style5":return this.setImage("Circle_Blur_Style5_Desktop","Circle_Blur_Style5_Mobile");
case"style6":return this.setImage(this.continuum?"Main_Blur_Style1_EC_Desktop":"Main_Blur_Style1_Desktop",this.continuum?"Main_Blur_Style1_EC_Mobile":"Main_Blur_Style1_Mobile");
case"style7":return this.setImage("Main_Blur_Style2_V1_Desktop","Main_Blur_Style2_V1_Mobile");
case"style8":case"style9":return this.setImage("Main_Blur_Style2_V1_LM_Desktop","Main_Blur_Style2_V1_LM_Desktop");
case"style10":return this.setImage("Main_Blur_Style2_V2_Desktop","Main_Blur_Style2_V2_Mobile");
case"style11-1":return this.setImage("Main_Blur_Style3_Desktop","Main_Blur_Style3_Mobile");
case"style11-2":return this.setImage("Main_Blur_Style3_Desktop","Main_Blur_Style1_Mobile");
case"style12":return this.setImage("Circle_Blur_Style4_Desktop","Circle_Blur_Style1_Mobile");
case"style13":return this.setImage("Circle_Blur_Style1_Desktop","Circle_Blur_Style4_Mobile");
case"style14":return this.setImage("Main_Blur_Style2_V2_Desktop");
case"style15":return this.setImage("Main_Blur_Style2_V2_Desktop","Main_Blur_Style3_Mobile");
case"style16":return this.setImage("Main_Blur_Style2_V1_Desktop");
default:return""
}};
b.prototype.applyAnimation=function(){var e=this.getFileName();
if(this.imageName&&e.length&&!this.isEditMode){bodymovin.loadAnimation({container:this.$imageContainer,renderer:"canvas",loop:true,path:"/etc/designs/epam-com/json-animations/metamorphosis/"+e+".json",rendererSettings:{className:"animation__object",viewBoxOnly:true}})
}};
b.moduleName="Section";
b.selector=".section-ui";
return b
});
define("Search23",["utils","utils-dust","utils-env","constants"],function(a,f,e,d){var g=$(window);
var c={form:".search-results__panel",field:".search__field",container:".search-results__items",more:".search-results__view-more",exception:".search-results__exception-message",error:".search-results--error",emptyResult:".search-results--empty-result",counter:".search-results__counter",input:".frequent-searches__input",searchInput:".search__input",searchWithoutResultsInput:".search-without-result__input",titleLink:".search-results__title-link",autoCorrectMessage:".search-results__auto-correct-message",autoCorrectTotal:".search-results__auto-correct-total",autoCorrectTerm:".search-results__auto-correct-term",opened:"opened"};
function b(h){this.$form=h.find(c.form);
this.$field=h.find(c.field);
this.$searchInput=this.$field.find(c.searchWithoutResultsInput);
this.$query=h.find(c.searchInput);
this.$input=this.$form.find(c.input);
this.defaultPlaceholder=this.$input.attr("placeholder");
this.$container=h.find(c.container);
this.$counter=h.find(c.counter);
this.$preloader=h.find("."+d.Classes.preloader);
this.$viewMore=h.find(c.more);
this.$exceptionMessages=h.find(c.exception);
this.$autoCorrectMessage=h.find(c.autoCorrectMessage);
this.$autoCorrectTerm=this.$autoCorrectMessage.find(c.autoCorrectTerm);
this.$autoCorrectTotal=this.$autoCorrectMessage.find(c.autoCorrectTotal);
this.$errorMessage=this.$exceptionMessages.filter(c.error);
this.$emptyResultMessage=this.$exceptionMessages.filter(c.emptyResult);
this.isAuthor=e.isAuthor();
this.configPath=h.data("config-path");
this.openEl=this.openEl.bind(this);
this.closeEl=this.closeEl.bind(this);
this.$form.on("submit",this.submit.bind(this));
this.$viewMore.on("click",this.loadMoreResults.bind(this));
g.on("scroll",this.loadResultsOnScroll.bind(this));
g.on("popstate",this.refreshResult.bind(this));
this.init()
}b.prototype.refreshResult=function(){var i=this.getParameters().q;
var h=a.getQueryParameters(location.href.replace(location.hash,"")).q;
if(i!==h){this.cleanResult();
this.init()
}};
b.prototype.init=function(){this.$input.on("focus",this.openEl).on("keyup",this.openEl);
this.$searchInput.on("focus",this.openEl).on("keyup",this.openEl);
this.updateForm();
this.loadResults(this.getParameters())
};
b.prototype.toggleEl=function(){const h=$(document).find(".frequent-searches-23--hidden");
this.$form.toggleClass(c.opened,!h.length);
this.$field.toggleClass(c.opened,!h.length)
};
b.prototype.openEl=function(){this.toggleEl();
g.on("click",this.closeEl)
};
b.prototype.closeEl=function(h){if(h&&this.$input.is(h.target)){return
}if(h&&this.$searchInput.is(h.target)){return
}this.toggleEl();
g.off("click",this.closeEl)
};
b.prototype.updateElState=function(h){if(!h){this.$searchInput.off("keydown");
this.$input.off("keydown");
return
}this.clearElState()
};
b.prototype.clearElState=function(){this.$searchInput.off("keydown");
this.$searchInput.attr("placeholder",this.defaultPlaceholder);
this.$input.off("keydown");
this.$input.attr("placeholder",this.defaultPlaceholder)
};
b.prototype.getParameters=function(h){return{q:this.$query.val().trim(),offset:h||0,config:this.configPath,bf:["events","news"]}
};
b.prototype.updateForm=function(){var h=window.location,i=a.getQueryParameters(h.href.replace(h.hash,"")).q||"";
this.$query.val(i)
};
b.prototype.loadResults=function(h){if(!h.q){this.$query.val("");
return
}$.ajax({url:this.config.searchUrl,data:h,beforeSend:this.toggleLoadingState.bind(this,true),complete:this.toggleLoadingState.bind(this,false),success:this.updateSearchResults.bind(this,h),error:this.showErrorMessage.bind(this)})
};
b.prototype.loadMoreResults=function(i){i&&i.preventDefault();
var j=this.$container.children().length,h=this.getParameters(j);
if(i){h.shouldFocusOnResult=true
}this.loadResults(h)
};
b.prototype.loadResultsOnScroll=function(){if(this.loading||!this.shouldLoadOnScroll){return
}var j=g.height(),i=g.scrollTop(),h=this.$container.children().last().offset().top;
if(j+i>h){this.loadMoreResults()
}};
b.prototype.toggleLoadingState=function(h){h&&this.$viewMore.addClass(d.Classes.hidden);
this.$preloader.toggleClass(d.Classes.hidden,!h);
this.loading=h
};
b.prototype.showErrorMessage=function(){this.$errorMessage.removeClass(d.Classes.hidden)
};
b.prototype.showAutoCorrectMessage=function(h){this.$autoCorrectMessage.removeClass(d.Classes.hidden);
this.$autoCorrectTotal.text(h.suggestedResultTotal);
this.$autoCorrectTerm.text(h.suggestedQuery);
this.$autoCorrectTerm.attr("href",this.getLink(h.suggestedQuery))
};
b.prototype.updateSearchResults=function(m,k){var l=k.total,j=k.result.length&&k.result||k.suggestedResult,i=m.offset===0,h=l>m.offset+this.config.limit;
this.shouldLoadOnScroll=i&&h;
i&&this.showResultMessage(m.q,l);
k.suggestedResultTotal&&this.showAutoCorrectMessage(k);
f.append("search-results",{items:j,isAuthor:this.isAuthor},this.$container);
this.$viewMore.toggleClass(d.Classes.hidden,i||!h);
m.shouldFocusOnResult&&this.$container.find(c.titleLink).eq(m.offset).focus()
};
b.prototype.showResultMessage=function(i,h){this.$counter.text(h?this.getResultMessage(i,h):"");
if(h){this.$counter.removeClass(d.Classes.hidden).focus();
return
}this.$emptyResultMessage.removeClass(d.Classes.hidden)
};
b.prototype.getResultMessage=function(j,i){var h=i===1?"component.search-results.found-single-result":"component.search-results.found-multiple-results";
return CQ.I18n.getMessage(h,[j,i])
};
b.prototype.submit=function(i){i.preventDefault();
this.cleanResult();
var h=this.getParameters();
this.updateUrl(h);
this.loadResults(h)
};
b.prototype.cleanResult=function(){this.$counter.addClass(d.Classes.hidden);
this.$container.empty();
this.$exceptionMessages.addClass(d.Classes.hidden);
this.$autoCorrectMessage.addClass(d.Classes.hidden);
this.$viewMore.addClass(d.Classes.hidden)
};
b.prototype.updateUrl=function(h){if(h.q!==a.getQueryParameters(window.location.href).q){window.history.pushState({},"",this.getLink(h.q))
}};
b.prototype.getLink=function(h){return window.location.pathname+"?q="+encodeURIComponent(h)
};
b.prototype.config={searchUrl:"/services/search/global",limit:10};
b.moduleName="Search 23";
b.selector=".search-ui-23";
return b
});
define("ResponsiveImage23",["require","media","utils","imager"],function(b,c){var d=$(window);
function a(e){this.$el=e;
this.$placeholder=this.$el.find("."+this.classes.placeholder);
this.data=$.extend({},this.$placeholder.data(),this.$el.data());
this.hideOnMobile=this.$el.hasClass(this.classes.hideOnMobile);
this.zoomOnHover=this.$el.hasClass(this.classes.zoomOnHover);
this.isDownloaded=false;
this.$el.on("renderImage",function(){this.render()
}.bind(this));
if(this.shouldBeShown()){this.render()
}d.on("resize",b("utils").debounce(this.render.bind(this),100))
}a.prototype.shouldBeShown=function(){if(b("utils-env").isEditMode()){return true
}return this.data.width!==0&&(c.currentMode().greaterThan(c.modes.WideMobile)||!this.hideOnMobile)
};
a.prototype.setMaxWidth=function(e){e.width?this.$img.css({maxWidth:e.width+e.widthUnits}):this.initContainerStyles()
};
a.prototype.render=function(){var f=this.isDownloaded||!this.shouldBeShown()||!this.$placeholder.is(":visible");
if(f){d.one("tab.changed",this.render.bind(this));
return
}var e={};
if(this.zoomOnHover){e={beforeImagesReplaced:this.initContainerStyles.bind(this),onImagesReplaced:this.setContainerStyles.bind(this)}
}b("imager").create(this.$placeholder,e);
this.isDownloaded=true;
this.$img=this.$el.find("."+this.classes.img);
this.$img.attr("title",this.data.title);
this.setMaxWidth(this.data)
};
a.prototype.setContainerStyles=function(){this.$img.css({width:"fit-content"})
};
a.prototype.initContainerStyles=function(){this.$img.css({width:"100%"})
};
a.prototype.classes={placeholder:"responsive-image__placeholder",img:"image-container",hideOnMobile:"responsive-image--hide-on-mobile",zoomOnHover:"zoom-on-hover"};
a.selector=".responsive-image-ui-23";
a.moduleName="Responsive Image 23";
return a
});
define("ThemeSwitcher",["constants"],function(d){var e=$(document.body);
var c={clearAll:d.Themes.dark+" "+d.Themes.light+" no-theme-animation",switcherLabel:".theme-switcher-label"};
var a={key:d.StorageKey.themeSwitcher,set:function(f){localStorage.setItem(this.key,f)
},get:function(){return localStorage.getItem(this.key)
}};
function b(f){this.$el=f;
this.$label=$(document.body).find(c.switcherLabel);
this.init()
}b.prototype.init=function(){this.$el.on("click",this.toggleThemes.bind(this));
this.$label.html(d.Themes.labelText[this.getMode().currentMode])
};
b.prototype.toggleThemes=function(g){g.stopPropagation();
var h=this.getMode().nextNode;
this.$label.html(d.Themes.labelText[h]);
e.removeClass(c.clearAll).addClass(d.Themes.animation).addClass(h);
a.set(h);
this.triggerThemeSwitching();
var f=new CustomEvent(d.Events.themeSwitch);
e[0].dispatchEvent(f);
e.trigger(d.Events.themeSwitch)
};
b.prototype.triggerThemeSwitching=function(){setTimeout(function(){e.removeClass(d.Themes.animation)
},d.Themes.animationDuration)
};
b.prototype.getMode=function(){if(e.hasClass(d.Themes.dark)){return{currentMode:d.Themes.dark,nextNode:d.Themes.light}
}return{currentMode:d.Themes.light,nextNode:d.Themes.dark}
};
b.moduleName="Theme Switcher";
b.selector=".theme-switcher-ui";
return b
});
define("HeaderSearch23",["Header23","media","constants"],function(g,f,e){var b=$("html"),a=$("body").children("."+e.Classes.overlay).last();
var d={button:".header-search__button",panel:".header-search__panel",input:".header-search__input",submit:".header-search__submit",opened:"opened",frequentSearch:".frequent-searches-ui-23"};
function c(h){this.$el=h;
this.$button=this.$el.find(d.button);
this.$panel=this.$el.find(d.panel);
this.$input=this.$panel.find(d.input);
this.$submit=this.$panel.find(d.submit);
this.openPanel=this.openPanel.bind(this);
this.closePanel=this.closePanel.bind(this);
this.closeWhenClickedOutside=this.closeWhenClickedOutside.bind(this);
this.onShiftTabOnButton=this.onShiftTabOnButton.bind(this);
this.$button.one("click",this.triggerOpen);
this.$el.on("keyup",this.onEscPress.bind(this));
this.$submit.on("keydown",this.onTabOnSubmit.bind(this));
this.$el.on("click",this.preventEventBubbling.bind(this));
this.$input.on("keydown",this.preventEventBubbling.bind(this));
g.registerMenu({name:c.moduleName,hasOverlay:true,hasDisabledScroll:function(){return f.currentMode().lessThan(f.modes.Desktop)
},onOpen:this.openPanel,onClose:this.closePanel,closeWhenClickedOutside:this.closeWhenClickedOutside})
}c.prototype.preventEventBubbling=function(h){h.stopPropagation()
};
c.prototype.onEscPress=function(h){if(h.key!==e.Keys.esc){return
}this.triggerClose();
this.$button.focus()
};
c.prototype.onTabOnSubmit=function(h){if(h.key!==e.Keys.tab||h.shiftKey){return
}h.preventDefault();
this.$button.focus()
};
c.prototype.onShiftTabOnButton=function(h){if(h.key!==e.Keys.tab||!h.shiftKey){return
}h.preventDefault();
this.$submit.focus()
};
c.prototype.triggerOpen=function(){b.trigger(e.Events.menuOpen,{opened:c.moduleName})
};
c.prototype.triggerClose=function(){b.trigger(e.Events.menuClose)
};
c.prototype.openPanel=function(){this.$panel.stop(true).slideDown().queue(function(){this.$input.focus();
this.$panel.addClass(d.opened)
}.bind(this));
this.$button.attr("aria-expanded",true).addClass(d.opened).one("click",this.triggerClose).on("keydown",this.onShiftTabOnButton);
a.one("click",this.triggerClose)
};
c.prototype.closePanel=function(){this.$input.blur();
this.$panel.removeClass(d.opened);
this.$panel.stop(true).slideUp();
a.off("click",this.triggerClose);
this.$button.attr("aria-expanded",false).removeClass(d.opened).off("click",this.triggerClose).one("click",this.triggerOpen).off("keydown",this.onShiftTabOnButton)
};
c.prototype.closeWhenClickedOutside=function(){var h=this.$el.find(d.frequentSearch);
if(h.length===0){this.closePanel();
return
}if(h.length>0&&h.hasClass("frequent-searches-23--hidden")){this.closePanel()
}};
c.prototype.classes=d;
c.moduleName="Header Search 23";
c.selector=".header-search-ui-23";
return c
});
define("LocationSelector23",["Header23","utils-a11y","constants"],function(g,b,j){var d=$("html"),e=$("body"),h=e.children("."+j.Classes.overlay).last();
var c={button:".location-selector__button",locations:".location-selector__panel",link:".location-selector__link",opened:"opened"};
function a(){d.trigger(j.Events.menuOpen,{opened:i.moduleName})
}function f(){d.trigger(j.Events.menuClose)
}function i(k){this.$el=k;
this.$button=this.$el.find(c.button);
this.$locations=this.$el.find(c.locations);
this.$lastLink=this.$locations.find(c.link).last();
this.hideLocations=this.toggleLocations.bind(this,false);
this.showLocations=this.showLocations.bind(this);
this.$button.one("click",a);
this.$el.on("keyup",this.closeOnEsc.bind(this));
this.$lastLink.on("keydown",this.cycleForwardTabNavigation.bind(this));
g.registerMenu({name:i.moduleName,onOpen:this.showLocations,onClose:this.hideLocations,hasOverlay:true});
this.ariaLabelHidden=this.$button.attr("aria-label-hidden")
}i.prototype.closeOnEsc=function(k){if(k.key!==j.Keys.esc){return
}f();
this.$button.focus()
};
i.prototype.cycleForwardTabNavigation=function(k){if(k.key!==j.Keys.tab||k.shiftKey){return
}k.preventDefault();
this.$button.focus()
};
i.prototype.cycleBackwardTabNavigation=function(k){if(k.key!==j.Keys.tab||!k.shiftKey){return
}k.preventDefault();
this.$lastLink.focus()
};
i.prototype.showLocations=function(){this.toggleLocations(true);
this.$button.on("keydown",this.cycleBackwardTabNavigation.bind(this))
};
i.prototype.toggleLocations=function(k){this.$button.attr("aria-label",k?this.ariaLabelHidden:"");
this.$locations[k?"slideDown":"slideUp"]();
h[k?"one":"off"]("click",f);
this.$button.attr("aria-expanded",k).toggleClass(c.opened,k).off().one("click",k?f:a)
};
i.moduleName="Location Selector";
i.selector=".location-selector-ui-23";
return i
});
define("MobileLocationSelector23",[],function(){var c=$(window);
var b={button:".mobile-location-selector__button",panel:".mobile-location-selector__panel"};
function a(d){this.$el=d;
this.$button=this.$el.find(b.button);
this.openMenu=this.openMenu.bind(this);
this.closeMenu=this.closeMenu.bind(this);
this.$button.one("click",this.openMenu)
}a.prototype.openMenu=function(){this.$el.addClass("opened");
this.$button.attr("aria-expanded",true).one("click",this.closeMenu);
c.on("click",this.closeMenu);
this.reApplyMenuButtonFocus();
return false
};
a.prototype.closeMenu=function(){this.$el.removeClass("opened");
this.$button.attr("aria-expanded",false).one("click",this.openMenu);
c.off("click",this.closeMenu);
this.reApplyMenuButtonFocus()
};
a.prototype.reApplyMenuButtonFocus=function(){this.$button.blur();
setTimeout(function(){this.$button.focus()
}.bind(this),100)
};
a.moduleName="Location Selector Mobile";
a.selector=".mobile-location-selector-ui-23";
return a
});
define("Header23",["constants"],function(d){var b=$("html"),a=$("body").children("."+d.Classes.overlay).last(),e=10;
function c(f){this.$el=f;
this.$hamburgerMenu=this.$el.find(".hamburger-menu-ui-23");
$(window).on("scroll",this.shrinkMenu.bind(this));
b.on(d.Events.menuOpen,this.openMenu).on(d.Events.menuClose,this.closeMenu);
b.on("focusin",this.closeMenuWhenLooseFocus.bind(this));
$(document).on("click",this.bodyClickEventHandler.bind(this))
}c.prototype.closeMenuWhenLooseFocus=function(f){if(!this.$hamburgerMenu.find(f.target).length){this.activeMenu="Hamburger Menu 23";
this.closeMenu()
}};
c.prototype.bodyClickEventHandler=function(){var f=c.menus["Header Search 23"];
f.closeWhenClickedOutside()
};
c.prototype.openMenu=function(i,h){if(!h){return
}var g=c.menus[h.opened];
this.activeMenu&&c.menus[this.activeMenu].onClose();
this.activeMenu=h.opened;
g.onOpen();
g.opened=true;
a.toggleClass(d.Classes.hidden,!g.hasOverlay);
var f=typeof g.hasDisabledScroll==="function"?g.hasDisabledScroll():!!g.hasDisabledScroll;
b.toggleClass(d.Classes.noscroll,f)
};
c.prototype.closeMenu=function(j,i){if(!this.activeMenu){return
}var h=c.menus[this.activeMenu],g=i&&i.couldBeIgnored&&h.ignoresWhenPossible,f=i&&i.closed&&this.activeMenu!==i.closed;
if(g||f||h===undefined||!h.opened){return
}h.onClose();
h.opened=false;
a.addClass(d.Classes.hidden);
b.removeClass(d.Classes.noscroll);
this.activeMenu=null
};
c.prototype.shrinkMenu=function(){var f=window.pageYOffset||document.documentElement.scrollTop;
this.$el.toggleClass(this.classes.shrink,f>=e);
$(document.body).toggleClass(this.classes.shrink,f>=e)
};
c.menus={};
c.registerMenu=function(f){c.menus[f.name]={onOpen:f.onOpen,onClose:f.onClose,closeWhenClickedOutside:f.closeWhenClickedOutside,hasOverlay:f.hasOverlay,hasDisabledScroll:f.hasDisabledScroll,ignoresWhenPossible:f.ignoresWhenPossible}
};
c.prototype.classes={shrink:"header--animated"};
c.moduleName="Header23";
c.selector=".header-ui-23";
return c
});
define("HamburgerMenu23",["Header23","constants","media","utils"],function(f,i,a,g){var d=$("html"),e=$("body");
var c={button:".hamburger-menu__button",menu:".hamburger-menu__dropdown",menuSection:".hamburger-menu__dropdown-section",accordeon:".item--collapsed",thirdLevelAccordion:"third-level-item--collapsed",link:".hamburger-menu__link",expandedAccordeon:"item--expanded",expandedThirdLevelAccordion:"third-level-item--expanded",menuExpanded:"hamburger-menu--expanded",child:"item--child",active:".active",expandChildButton:"hamburger-menu__sub-menu-toggle-button",clickableLink:"hamburger-menu__active-button",ctaButton:".cta-button-ui",openedArrowNode:'[aria-expanded="true"]',hamburgerMenuList:".hamburger-menu__list",thirdLevelSubMenuToggleButton:"hamburger-menu__third-level-sub-menu-toggle-button",thirdLevelItem:"hamburger-menu__third-level-item",firstLevelLink:"first-level-link",fixedSidePanelPosition:"fixed-position"};
var b={sidePanelFixPositionQuery:"(min-width: 1920px)",responsive:"(min-width: 1151px)"};
function h(j){this.$el=j;
this.$button=this.$el.find(c.button);
this.$menu=this.$el.find(c.menu);
this.$menuSection=this.$el.find(c.menuSection);
this.$hamburgerMenuList=this.$el.find(c.hamburgerMenuList);
this.$accordeon=this.$el.find(c.accordeon);
this.$thirdLevelAccordions=this.$el.find("."+c.thirdLevelAccordion);
this.$link=this.$el.find(c.link);
var k=this.$el.find(c.ctaButton);
this.$lastLink=k.length&&k||this.$link.last();
this.$expandChildButton=j.find("."+c.expandChildButton);
this.$expandThirdLevelChildButton=j.find("."+c.thirdLevelSubMenuToggleButton);
this.openMenu=this.openMenu.bind(this);
this.closeMenu=this.closeMenu.bind(this);
this.$menu.on("keyup",this.keysPressHandler.bind(this));
this.$link.on("click",function(l){l.stopPropagation()
});
this.$button.one("click",this.triggerOpen);
this.$accordeon.on("click",this.onArrowClick.bind(this));
this.$expandChildButton.on("click",this.onRealArrowClick.bind(this));
this.$expandThirdLevelChildButton.on("click",this.onRealArrowClick.bind(this));
this.$clickableLinks=j.find("."+c.clickableLink);
this.$clickableLinks.on("click",this.onClickableLinkHandler.bind(this));
f.registerMenu({name:h.moduleName,onOpen:this.openMenu,onClose:this.closeMenu,hasDisabledScroll:true,ignoresWhenPossible:true});
this.expandActiveDropdown();
this.init()
}h.prototype.init=function(){if(this.mediaQuery().isDesktop()){$(window).on("resize",g.debounce(this.resizeHandler.bind(this),200));
this.adjustSidePanelPositions()
}var j=e.hasClass("dark-mode")||e.hasClass("light-mode");
if(j){OverlayScrollbars(this.$hamburgerMenuList,{className:"os-theme-dark hamburger-menu__scrollbar-color"})
}};
h.prototype.resizeHandler=function(){this.adjustSidePanelPositions()
};
h.prototype.adjustSidePanelPositions=function(){if(this.mediaQuery().fixedSidePanel()){this.$menuSection.addClass(c.fixedSidePanelPosition)
}else{this.$menuSection.removeClass(c.fixedSidePanelPosition)
}};
h.prototype.onEscPress=function(j){if(j.key!==i.Keys.esc){return
}this.triggerClose();
this.$button.focus()
};
h.prototype.triggerOpen=function(){d.trigger(i.Events.menuOpen,{opened:h.moduleName});
return false
};
h.prototype.triggerClose=function(){d.trigger(i.Events.menuClose,{closed:h.moduleName})
};
h.prototype.mediaQuery=function(){return{isDesktop:function(){return window.matchMedia(b.responsive).matches
},fixedSidePanel:function(){return window.matchMedia(b.sidePanelFixPositionQuery).matches
}}
};
h.prototype.openMenu=function(){d.addClass(c.menuExpanded);
this.$button.attr("aria-expanded",true).one("click",this.triggerClose)
};
h.prototype.closeMenu=function(){d.removeClass(c.menuExpanded);
this.$button.attr("aria-expanded",false).off().one("click",this.triggerOpen)
};
h.prototype.onArrowClick=function(k){var j=$(k.target);
if(j.hasClass(c.thirdLevelAccordion)){j.has("ul").length&&this.toggleThirdLevelDropdown(j,k)
}else{j.has("ul").length&&this.toggleDropdown(j,k)
}};
h.prototype.onRealArrowClick=function(k){var l=$(k.target);
var j=l.parent();
if(l.hasClass(c.thirdLevelSubMenuToggleButton)){j.has("ul").length&&this.toggleThirdLevelDropdown(j,k)
}else{j.has("ul").length&&this.toggleDropdown(j,k)
}};
h.prototype.closedOpenedHamburgerMenuItem=function(k){var j=this.$hamburgerMenuList.find(c.openedArrowNode);
if(j.length&&!k.is(j)){j.attr("aria-expanded","false")
}};
h.prototype.toggleAriaAttribute=function(j){j.attr("aria-expanded",function(k,l){return l==="false"
})
};
h.prototype.adjustAriaAttributes=function(j){if(j){var k=$(j.target);
this.closedOpenedHamburgerMenuItem(k);
this.toggleAriaAttribute(k)
}};
h.prototype.toggleDropdown=function(j,k){this.adjustAriaAttributes(k);
j.toggleClass(c.expandedAccordeon);
this.$accordeon.not(j).removeClass(c.expandedAccordeon)
};
h.prototype.toggleThirdLevelDropdown=function(j,k){this.adjustAriaAttributes(k);
j.toggleClass(c.expandedThirdLevelAccordion);
this.$thirdLevelAccordions.not(j).removeClass(c.expandedThirdLevelAccordion)
};
h.prototype.expandActiveDropdown=function(){var k=this.$link.filter(c.active);
var j=k.parent();
if(k.hasClass(c.firstLevelLink)){return
}if(j.hasClass(c.thirdLevelItem)){this.toggleThirdLevelDropdown(k.parents("."+c.thirdLevelAccordion))
}this.toggleDropdown(k.parents(c.accordeon))
};
h.prototype.enterKeyPressHandler=function(k){var j=k.key;
var l=$(k.target);
if(j==="Enter"&&(l.hasClass(c.clickableLink)||l.hasClass(c.expandChildButton))){this.toggleDropdown(l.parent(),k)
}};
h.prototype.onClickableLinkHandler=function(j){var k=$(j.target);
this.toggleDropdown(k.parent(),j)
};
h.prototype.keysPressHandler=function(j){this.enterKeyPressHandler(j);
this.onEscPress(j)
};
h.prototype.classes=c;
h.moduleName="Hamburger Menu 23";
h.selector=".hamburger-menu-ui-23";
return h
});
define("TopNavigation23",["constants","utils"],function(i,f){var c=$("html");
var d=null;
var h=null;
var b={item:".top-navigation__item",itemLink:"top-navigation__item-link",dropdown:".top-navigation__flyout",dropdownClassName:"top-navigation__flyout",openSubmenu:"js-opened",linkA11y:".top-navigation__item-link--a11y",flyout:".top-navigation__flyout-inner-section",topNavigationAnimation:"top-navigation-animation"};
var e={startAnimation:"forward-animation",endAnimation:"backward-animation",allAnimation:".forward-animation, .backward-animation"};
var a=10;
function g(j){this.$el=j;
this.$items=this.$el.find(b.item);
this.$dropdowns=this.$el.find(b.dropdown);
this.$linkA11y=this.$el.find(b.linkA11y);
this.$flyout=this.$el.find(b.flyout);
this.$itemsWithSubmenu=this.$items.filter(this.hasDropdown);
this.$lastSubLinks=$([]);
this.$dropdowns.each(function(l,k){this.$lastSubLinks=this.$lastSubLinks.add($(k).find("a").last())
}.bind(this));
this.bindMouseMoveHanler=f.debounceExtend(this.mouseMoveNavigationEvent.bind(this),50);
this.$el.on("mouseenter ",function(){this.$el.on("mousemove",this.bindMouseMoveHanler)
}.bind(this));
this.$el.on("mouseleave",function(){this.closeAll();
this.$el.off("mousemove",this.bindMouseMoveHanler)
}.bind(this));
this.$dropdowns.on("keydown",this.onEscOnItem.bind(this));
this.$linkA11y.on("click",this.openSubmenuA11y.bind(this));
this.$linkA11y.on("focus",this.closeAll.bind(this));
this.$lastSubLinks.on("keydown",this.closeAllWithoutShiftKey.bind(this));
$(document).on("click",this.closeAll.bind(this));
this.$flyout.on("click",function(k){k.stopPropagation()
})
}g.prototype.closeAllWithoutShiftKey=function(j){if(j.shiftKey){return
}this.closeAll()
};
g.prototype.mouseMoveNavigationEvent=function(l){var j=this.elementUnderMousePosition(l);
if(j.hasClass(b.itemLink)&&j.hasClass("js-op")){if(h===null||!h.is(j)){h=j;
var k=j.parents(b.item);
this.onItemHover(k)
}return
}if(j.hasClass("top-navigation-ui-23")||j.hasClass(b.dropdownClassName)||j.hasClass(b.itemLink)){this.closeAll()
}};
g.prototype.onItemHover=function(j){var k=j;
if(d){clearTimeout(d)
}d=setTimeout(function(){this.onItemLeave();
k.one("animationend",this.forwardAnimationEnd.bind(k));
this.openSubmenu(k);
k.addClass(e.startAnimation)
}.bind(this),a)
};
g.prototype.onItemLeave=function(){var j=this.$el.find(".js-opened");
if(j.length>0){j.removeClass(b.openSubmenu);
this.showFakeBackground(true);
this.onItemLeave();
j.one("animationend",this.backwardAnimationEnd.bind(j));
j.addClass(e.endAnimation)
}};
g.prototype.showFakeBackground=function(j){if(j){c.addClass(b.topNavigationAnimation)
}else{c.removeClass(b.topNavigationAnimation)
}};
g.prototype.elementUnderMousePosition=function(k){var j=k.clientX;
var l=k.clientY;
return $(document.elementFromPoint(j,l))
};
g.prototype.forwardAnimationEnd=function(){this.removeClass(e.startAnimation)
};
g.prototype.backwardAnimationEnd=function(){this.removeClass(e.endAnimation)
};
g.prototype.openSubmenuA11y=function(j){j.stopPropagation();
var k=$(j.currentTarget).parents(b.item);
this.openSubmenu(k);
k.find("a").eq(1).focus()
};
g.prototype.onEscOnItem=function(j){if(j.key!==i.Keys.esc){return
}this.closeAll();
$(j.currentTarget).parent().find(b.linkA11y).focus()
};
g.prototype.openSubmenu=function(j){c.trigger(i.Events.menuClose,{couldBeIgnored:true});
j.addClass(b.openSubmenu)
};
g.prototype.closeAll=function(){h=null;
this.onItemLeave();
this.showFakeBackground(false)
};
g.prototype.hasDropdown=function(){if($(this).children(b.dropdown).length>0){$(this).find(".top-navigation__item-link").addClass("js-op");
return true
}return false
};
g.moduleName="Top Navigation 23";
g.selector=".top-navigation-ui-23";
return g
});
define("Breadcrumbs",["media","constants"],function(g,e){var f=5,b={shown:"shown",hidden:"hidden"},d={hidden:"breadcrumbs--hidden",lastBreadcrumbItemLink:".breadcrumbs__item:last > a"};
var h=$(window),a=$("html");
function c(i){this.$el=i;
this.lastScrollTop=0;
this.toggleBreadcrumbs=this.toggleBreadcrumbs.bind(this);
this.activateScroll();
this.addA11YAttributes();
a.on(e.Events.menuOpen,this.detach.bind(this)).on(e.Events.menuClose,this.activate.bind(this))
}c.prototype.addA11YAttributes=function(){var i=this.$el.find(d.lastBreadcrumbItemLink);
if(i.length){i.attr("aria-current","page")
}};
c.prototype.toggleBreadcrumbs=function(){var j=!g.currentMode().greaterThan(g.modes.Desktop),n=h.scrollTop(),m=Math.abs(this.lastScrollTop-n)<=f;
if(j||m){return
}var k=n>this.lastScrollTop&&n>=0,i=n+h.height()<$(document).height(),l=this.$el;
this.lastScrollTop=n;
if(k){l.addClass(d.hidden).on(e.Events.transitionEnd,function(){requestAnimationFrame(function(){l.addClass(e.Classes.hidden)
});
l.off(e.Events.transitionEnd)
});
return
}if(i){l.removeClass(e.Classes.hidden);
requestAnimationFrame(function(){l.removeClass(d.hidden).off(e.Events.transitionEnd)
})
}};
c.prototype.detach=function(){this.ignoreScroll();
this.previousState=this.$el.hasClass(this.classes.hidden)?b.hidden:b.shown;
this.$el.addClass(this.classes.hidden)
};
c.prototype.activate=function(k,j){var i=j&&j.couldBeIgnored;
if(!this.previousState||i){return
}this.activateScroll();
this.previousState===b.shown&&this.$el.removeClass(this.classes.hidden);
this.previousState=null
};
c.prototype.ignoreScroll=function(){h.off("scroll",this.toggleBreadcrumbs)
};
c.prototype.activateScroll=function(){h.on("scroll",this.toggleBreadcrumbs)
};
c.prototype.classes=d;
c.moduleName="Breadcrumbs";
c.selector=".breadcrumbs-ui";
return c
});
define("FrequentSearches23",["constants"],function(c){var b={frequentSearches:".frequent-searches-ui-23",hidden:"frequent-searches-23--hidden",input:".frequent-searches__input",headerSearchInput:".header-search__input",headerSearchField:".header-search__field",searchInput:".search__input",searchResultsInput:".search-results__input",item:".frequent-searches__item",itemActive:"frequent-searches__item--active",footer:".footer-ui-23"};
var d=$(window);
function a(e){this.$el=e;
this.elHeight=e.height();
this.$input=$(document).find(b.input);
this.$headerSearchField=$(document).find(b.headerSearchField);
this.$headerSearchInput=$(document).find(b.headerSearchInput);
this.$searchResultsInput=$(document).find(b.searchResultsInput);
this.$searchInput=$(document).find(b.searchInput);
this.$items=e.find(b.item);
this.currentItemIndex=-1;
this.defaultPlaceholder=this.$input.attr("placeholder");
this.$footer=$(b.footer);
this.openEl=this.openEl.bind(this);
this.closeEl=this.closeEl.bind(this);
this.markActiveItem=this.markActiveItem.bind(this);
this.resetActiveItem=this.resetActiveItem.bind(this);
this.$input.attr("autocomplete","off");
this.initEvents();
this.updateHeight()
}a.prototype.initEvents=function(){this.$input.on("focus",this.openEl).on("keyup",this.openEl);
this.$items.on("click",this.onItemClick.bind(this));
d.on("resize",this.updateHeight.bind(this))
};
a.prototype.updateHeight=function(){var g=this.$footer.offset().top-20,e=this.$el.offset().top,f=e+this.elHeight;
this.$el.css("max-height",f>g?g-e:"none")
};
a.prototype.toggleEl=function(e){if($(".header-search__button").hasClass("opened")){if(e||!!this.$headerSearchInput.val().length){this.resetActiveItem()
}this.$headerSearchField.children(b.frequentSearches).toggleClass(b.hidden,e||!!this.$headerSearchInput.val().length);
return
}if(this.$searchInput.length!==0){if(e||!!this.$searchInput.val().length){this.resetActiveItem()
}this.$el.toggleClass(b.hidden,e||!!this.$searchInput.val().length);
return
}if(this.$searchResultsInput.length!==0){if(e||!!this.$searchResultsInput.val().length){this.resetActiveItem()
}this.$el.toggleClass(b.hidden,e||!!this.$searchResultsInput.val().length);
return
}this.updateElState(e);
if(this.$input.val().length){this.$input.removeAttr("aria-describedby")
}else{this.$input.attr("aria-describedby","search-label")
}};
a.prototype.openEl=function(){this.toggleEl(false);
d.on("click",this.closeEl)
};
a.prototype.closeEl=function(e){if(e&&this.$input.is(e.target)){return
}this.toggleEl(true);
d.off("click",this.closeEl)
};
a.prototype.updateElState=function(e){if(!e){this.$input.off("keydown");
this.$input.on("keydown",this.onKeyDown.bind(this));
this.updateHeight();
return
}this.clearElState()
};
a.prototype.clearElState=function(){this.$input.off("keydown");
this.currentItemIndex=-1;
this.$items.removeClass(b.itemActive);
this.resetActiveItem();
this.$input.attr("placeholder",this.defaultPlaceholder)
};
a.prototype.onItemClick=function(e){this.$input.val(e.target.innerText).focus();
this.closeEl()
};
a.prototype.resetActiveItem=function(){this.$input.removeAttr("aria-activedescendant");
this.$items.removeAttr("aria-selected id")
};
a.prototype.markActiveItem=function(e){var f="selected-option";
this.$input.attr("aria-activedescendant",f);
e.attr({"aria-selected":"true",id:f})
};
a.prototype.selectItem=function(e){this.activeItem=this.$items.eq(e);
this.$items.removeClass(b.itemActive);
this.activeItem.addClass(b.itemActive);
this.resetActiveItem();
this.markActiveItem(this.activeItem);
this.$input.attr("placeholder",this.activeItem[0].innerText);
this.currentItemIndex=e
};
a.prototype.selectPrev=function(){if(this.currentItemIndex<=0){this.selectItem(this.$items.length-1);
return
}this.selectItem(this.currentItemIndex-1)
};
a.prototype.selectNext=function(){if(this.currentItemIndex>=this.$items.length-1){this.selectItem(0);
return
}this.selectItem(this.currentItemIndex+1)
};
a.prototype.onKeyDown=function(e){switch(e.key){case c.Keys.arrowUp:this.selectPrev();
break;
case c.Keys.arrowDown:this.selectNext();
break;
case c.Keys.enter:this.$input.removeAttr("aria-describedby");
if(this.currentItemIndex>-1){e.preventDefault();
this.$input.val(this.$items.eq(this.currentItemIndex)[0].innerText);
this.clearElState()
}break;
case c.Keys.tab:this.closeEl();
break;
default:break
}};
a.prototype.classes=b;
a.moduleName="Frequent Searches 23";
a.selector=".frequent-searches-ui-23";
return a
});
define("Footer23",["WeChatPopup","jquery-plugins"],function(b){function a(d){this.$el=d;
this.$linksContainer=this.$el.find("."+this.classes.linksContainer);
this.$weChatLink=this.$el.find("."+this.classes.link+'[data-type="wechat"]');
this.data={src:this.$el.data("wechatQrSrc"),id:this.$el.data("wechatId")};
$(document).ready(function(){var e=this.$el.find("a, button");
e.each(function(f,g){$(g).on("focus",function(){this.centerElementInView($(g))
}.bind(this))
}.bind(this))
}.bind(this));
var c=document.querySelectorAll(".scroll-blocks-ui-23__list");
c.forEach(function(e){if(e.childElementCount<4){$(e).addClass("scroll-blocks-ui-23__disable-scrolling")
}});
$(window).on("resize",this.removeLinksDot.bind(this));
$.onFontLoad(this.removeLinksDot.bind(this));
this.$weChatLink.length&&this.initWeChatPopup();
$("#scroll-top").click(function(){$("html, body").animate({scrollTop:0},1000)
});
this.markEmptyItems();
this.isSingleLine()
}a.prototype.markEmptyItems=function(){this.$el.find(this.classes.couldBeEmpty).each(function(c,d){if(!d.innerText.trim()){$(d).addClass("empty")
}})
};
a.prototype.isSingleLine=function(){window.addEventListener("load",function(){var c=this.$el.find(this.classes.footerLinks)[0];
if(c&&c.getBoundingClientRect().height<30){this.$el.addClass("single-line")
}}.bind(this))
};
a.prototype.removeLinksDot=function(){var d=this.classes.pipe,c;
this.$linksContainer.each(function(){var e=$(this);
e.toggleClass(d,$.isOffsetEqual([c||e,e]));
c=e
})
};
a.prototype.initWeChatPopup=function(){this.$popup=new b();
this.$weChatLink.on("click",function(c){c.preventDefault();
this.$popup.open(this.data,this.$weChatLink)
}.bind(this))
};
a.prototype.centerElementInView=function(d){var g=$(window).height();
var c=d.offset().top;
var e=d.outerHeight();
var f=c-g/2+e/2;
$(window).scrollTop(f)
};
a.prototype.classes={linksContainer:"social-links",link:"social-link",pipe:"item--piped",couldBeEmpty:".heading, .rte",footerLinks:".footer-links"};
a.selector=".footer-ui-23";
a.moduleName="Footer23";
return a
});
define("Anchor23",[],function(){var b={title:"anchors-23__title",link:"anchors-23__link",tabsWrapper:".anchors-23__ul-wrapper",backToTopButton:".to-top-button",backToTopButtonWrapper:".to-top-button-wrapper",backToTopButtonContainer:".to-top-button-container",open:"open",active:"active",hideButton:"hide-button",pinnedToBottom:"pinned-to-bottom"};
function a(c){this.$el=c;
this.selectAnchorFromHash();
$(".touchevents "+b.tabsWrapper).on("click",this.openDropdown.bind(this));
this.$el.find(b.tabsWrapper).on("click",this.switchActiveAnchor.bind(this));
$(window).on("click",this.closeTabOnOutsideClick.bind(this));
this.$el.find(b.backToTopButton).on("click",this.backToTop.bind(this));
$(window).on("scroll",this.backToTopButtonScrollHandler.bind(this));
$(window).on("resize",this.backToTopButtonResizeHandler.bind(this));
$(window).load(function(){this.backToTopButtonScrollHandler();
this.backToTopButtonResizeHandler()
}.bind(this))
}a.prototype.openDropdown=function(e){var c=$(e.target);
if(c.hasClass(b.title)){var d=this.$el.find(b.tabsWrapper);
if(c.hasClass(b.active)&&!d.hasClass(b.open)){d.addClass(b.open);
e.stopPropagation()
}}};
a.prototype.backToTop=function(){this.$el.scrollToSelector({duration:400,reservedSpace:140})
};
a.prototype.switchActiveAnchor=function(e){var c=$(e.target);
if(c.hasClass(b.link)){var d=c.parent("."+b.title);
if(!d.hasClass(b.active)){this.$el.find("."+b.title+"."+b.active).removeClass(b.active);
d.addClass(b.active)
}}};
a.prototype.selectAnchorFromHash=function(){var d=this.$el.find('a[href="'+location.hash+'"]');
if(d.length){this.$el.find("."+b.title+"."+b.active).removeClass(b.active);
d.parent("."+b.title).addClass(b.active)
}var c=this.$el.find(location.hash);
if(c.length){$(window).load(function(){c.scrollToSelector()
})
}};
a.prototype.backToTopButtonScrollHandler=function(){var c=this.$el.find(b.backToTopButtonContainer)[0];
var d=this.$el[0];
var e=d.getBoundingClientRect();
if(e.y<0){this.$el.removeClass(b.hideButton);
if(e.bottom>window.innerHeight){$(c).removeClass(b.pinnedToBottom)
}else{$(c).addClass(b.pinnedToBottom)
}}else{this.$el.addClass(b.hideButton)
}};
a.prototype.backToTopButtonResizeHandler=function(){var g=this.$el.find(b.backToTopButtonWrapper);
if(window.innerWidth<1308){var c=this.$el.find(b.backToTopButtonContainer);
var f=this.$el[0].getBoundingClientRect().right;
var e=window.innerWidth<991;
var h=e?0:15;
var d=window.innerWidth-f;
var i=c[0].offsetWidth;
g.css("margin-right","-"+d+"px");
g.css("right",h+i+"px")
}else{g.css("margin-right","");
g.css("right","-28px")
}};
a.prototype.closeTabOnOutsideClick=function(){var c=this.$el.find(b.tabsWrapper);
c.hasClass(b.open)&&c.removeClass(b.open)
};
a.moduleName="Anchors-23";
a.selector=".anchors-ui-23";
return a
});
define("WeChatPopup",["utils-dust","utils-a11y","constants"],function(b,a,j){var c={id:".wechat-popup__id",close:".wechat-popup__close",qr:".wechat-popup__qr"};
var d=$(document),e=$("html"),f=$("body"),h=f.find("."+j.Classes.overlay),g;
function i(){if(g){return g
}g=this;
b.render("wechat-popup",{},function(k){this.markup=k
}.bind(this));
this.close=this.close.bind(this);
this.keyupHandler=this.keyupHandler.bind(this)
}i.prototype.keyupHandler=function(k){if(k.key===j.Keys.esc){this.close()
}};
i.prototype.setData=function(k){this.$qr.attr("src",k.src);
this.$id.text(CQ.I18n.getMessage("component.we-chat-popup.title",k.id));
return this
};
i.prototype.render=function(){this.$popup=f.append(this.markup).children("."+i.selector);
this.$id=this.$popup.find(c.id);
this.$close=this.$popup.find(c.close);
this.$qr=this.$popup.find(c.qr);
this.$close.on("click",this.close);
i.rendered=true
};
i.prototype.open=function(l,k){if(!i.rendered){this.render()
}this.focusTarget=k;
this.setData(l);
d.on("keyup",this.keyupHandler);
e.addClass(j.Classes.noscroll);
this.$popup.show();
h.removeClass(j.Classes.hidden).addClass(j.Classes.overlayCoverHeader).on("click",this.close);
a.handlePopupFocus(this.$popup)
};
i.prototype.close=function(){e.removeClass(j.Classes.noscroll);
this.$popup.hide();
d.off("keyup",this.keyupHandler);
h.addClass(j.Classes.hidden).removeClass(j.Classes.overlayCoverHeader).off("click",this.close);
this.focusTarget.focus();
this.focusTarget=null
};
i.selector="wechat-popup";
i.classes=c;
return i
});
define("TabsUtil",["HistoryUtil","constants","utils","utils-env","media"],function(h,l,j,i,c){var b=$(window);
var d={item:".js-tabs-item",link:".js-tabs-link",links:".js-tabs-links-list",active:"active",stage:".owl-stage",owlItem:".owl-item",controls:".js-tabs-controls",nav:".js-tabs-nav",prevButton:".js-tabs-prev",nextButton:".js-tabs-next",navAllyActiveTab:".js-nav-a11y-active-tab",navAllyContent:".js-tab-a11y-content",navAlly:".js-nav-a11y",linkContent:".js-tabs-link-content"};
var m={tabChange:"tab.change",tabLoaded:"tab.loaded"};
var a=[];
function g(o){var n={};
n[o.componentId]=o.activeItem;
h.push("activeTabs",n,o.hash&&location.pathname+o.hash)
}function e(o,n){n.dataset.item=o
}function f(n,o){return n+$(o).outerWidth(true)
}function k(n,o){this.config=o||{};
this.$el=n;
this.$list=this.config.links||n.find(d.links).first();
this.$links=this.config.link||this.$list.find(d.link);
this.$items=this.config.items||n.children(d.item);
this.$nav=n.find(d.nav);
this.$prevButton=n.find(d.prevButton);
this.$nextButton=n.find(d.nextButton);
this.$navA11y=this.$nav.find(d.navAlly);
this.subTabs=this.config.multiLevelSubTabs;
this.subItemsDataCorrect=false;
!this.subTabs&&this.$links.each(e);
!this.subTabs&&this.$items.each(e);
this.subTabs&&!this.subItemsDataCorrect&&this.updateSubItemsData();
this.lastIndex=this.$links.length-1;
this.useHistory=this.config.useHistory;
this.skipSwitching=this.config.skipSwitching;
this.responsiveView=this.config.responsiveView;
this.carouselView=this.config.carouselView;
this.carouselForPages=this.config.carouselForPages;
this.responsiveBreakpoint=this.config.responsiveBreakpoint;
this.scrollToElement=this.config.scrollToElement;
this.scrollToElementSelector=this.config.scrollToElementSelector;
this.scrollToReservedSpace=this.config.scrollToReservedSpace;
this.multiLevelTabsView=this.config.multiLevelTabsView;
this.verticalNavigation=this.config.verticalNavigation;
this.scrollToTopOnTabChange=this.config.scrollToTopOnTabChange;
this.id=this.$el.attr("id");
this.onTabChange=this.onTabChange.bind(this);
this.setEventListeners();
this.$el.trigger(m.tabChange,{tab:0,skipHistory:true,skipFocus:true});
a.push(this);
this.$controls=this.config.controls||n.find(d.controls);
this.dragEnabled=this.shouldEnableDrag();
this.windowWidth=b.width();
this.responsiveView&&c.getViewportWidth()<=this.responsiveBreakpoint&&this.initCarousel();
this.responsiveView&&!i.isEditMode()&&b.on("resize orientationchange",function(){if(b.width()!==this.windowWidth){this.reInitCarousel();
this.reInitCarouselOnResponsiveView()
}}.bind(this));
this.multiLevelTabsView&&!i.isEditMode()&&b.on("orientationchange",function(){setTimeout(function(){this.reInitCarousel()
}.bind(this),100)
}.bind(this));
this.carouselView&&this.initCarousel();
$(".slider-ui").on("initialized.owl.carousel",function(r){var s=$(r.target);
var p=s.find(".owl-item").css("width");
if(parseFloat(p)!==0){this.$sliderItemWidth=p
}if(parseFloat(p)===0){var q=s.find(".owl-item");
q.css("width",this.$sliderItemWidth)
}}.bind(this))
}k.prototype.updateSubItemsData=function(){this.$links.each(function(p,o){var n=this.$items.filter('[data-item-sub="'+o.dataset.itemSub+'"]');
o.dataset.itemSub=p;
n.attr("data-item-sub",p)
}.bind(this));
this.subItemsDataCorrect=true
};
k.prototype.initCarousel=function(){if(this.config.multiLevelSubTabs){return
}this.$list.owlCarousel($.extend({},this.config,{mouseDrag:this.dragEnabled,touchDrag:this.dragEnabled}));
this.$controls.find(d.stage).attr("role","tablist");
this.$controls.find(d.owlItem).attr("role","presentation");
this.$owlStage=this.$el.find(d.stage);
this.carouselWidth=this.$owlStage.width();
this.updateStagePosition=j.updateStagePosition(this.$owlStage,this.$controls);
this.dragEnabled&&this.$list.on("translated.owl.carousel",this.updateStagePosition.bind(this,this.carouselWidth))
};
k.prototype.shouldEnableDrag=function(){return this.$controls.width()<[].reduce.call(this.$links,f,0)
};
k.prototype.reInitCarousel=function(){var n=this.shouldEnableDrag()||this.multiLevelTabsView;
if(!n){return
}this.dragEnabled=n;
this.$list.owlCarousel("destroy");
this.initCarousel();
this.scrollTo()
};
k.prototype.reInitCarouselOnResponsiveView=function(){var n=c.getViewportWidth();
if(this.responsiveView&&n>this.responsiveBreakpoint){this.$list.owlCarousel("destroy");
return
}this.$list.owlCarousel("destroy");
this.initCarousel();
this.scrollTo()
};
k.prototype.onLoad=function(){if(location.hash){this.switchByHash();
return
}this.useHistory&&this.updateFromHistory();
this.$el.trigger(m.tabLoaded)
};
k.prototype.setEventListeners=function(){this.$el.on(m.tabChange,this.onTabChange);
this.$links.on("click",this.onLinkClick.bind(this)).on("keydown",this.onKeydown.bind(this));
this.$nav.on("click","button",this.onNavClick.bind(this));
this.$navA11y.length&&this.$nav.on("focus blur","button",this.onNavFocusToggle.bind(this));
this.useHistory&&b.on("popstate",this.updateFromHistory.bind(this));
b.on("load",this.onLoad.bind(this))
};
k.prototype.onNavFocusToggle=function(){if(this.$navA11y.attr("aria-atomic")||this.$navA11y.attr("aria-polite")){this.$navA11y.removeAttr("aria-atomic aria-live")
}else{this.$navA11y.attr({"aria-atomic":true,"aria-live":"polite"})
}};
k.prototype.updateFromHistory=function(){var o=h.getStateByKey("activeTabs"),n=o[this.id]||0;
this.$el.trigger(m.tabChange,{tab:n,skipHistory:true})
};
k.prototype.afterClick=null;
k.prototype.onLinkClick=function(n){var q=$(n.currentTarget),u=q.attr("href"),t=this.subTabs?q.data("item-sub"):q.data("item"),w=this.scrollToElementSelector||this.$el,o=c.getViewportWidth()<=c.modes.Tablet.end,p=q.parents(d.links).parent(),v=o&&p.hasClass("open");
var s=this.scrollToElement;
if(typeof this.scrollToElement==="function"){s=this.scrollToElement()
}this.$el.trigger(m.tabChange,{tab:t,hash:u});
this.afterClick&&this.afterClick(q);
var r=typeof this.scrollToReservedSpace==="function"?this.scrollToReservedSpace():100;
(s&&v||this.scrollToTopOnTabChange)&&w.scrollToSelector({reservedSpace:r,duration:400});
p.toggleClass("open");
return false
};
k.prototype.beforeTabChange=function(n){!n.skipSwitching&&this.$items.removeClass(d.active).attr("tabindex",-1);
this.$links.removeClass(d.active).attr({"aria-selected":"false",tabindex:-1});
this.$links.parent(".js-tabs-title").removeClass(d.active)
};
k.prototype.afterTabChange=function(p){this.$list.trigger("to.owl.carousel",this.activeItem);
var o=this.subTabs?this.$links.filter("[data-item-sub="+this.activeItem+"]"):this.$links.filter("[data-item="+this.activeItem+"]");
var n=this.subTabs?this.$links.filter("[data-item-sub="+this.activeItem+"]").parent(".js-tabs-title"):this.$links.filter("[data-item="+this.activeItem+"]").parent(".js-tabs-title");
o.addClass(d.active).attr({"aria-selected":"true",tabindex:0});
n.addClass(d.active);
this.$nav.find(d.navAllyContent).text(o.find(d.linkContent).text());
this.$nav.find(d.navAllyActiveTab).text(this.activeItem+1);
!p.skipFocus&&o.focus();
this.useHistory&&!p.skipHistory&&g({componentId:this.id,activeItem:this.activeItem,hash:p.hash});
this.multiLevelAfterTabChange&&this.multiLevelAfterTabChange();
b.trigger(l.Events.tabChanged)
};
k.prototype.multiLevelAfterTabChange=null;
k.prototype.onTabChange=function(o,p){if(!$.isNumeric(p.tab)||!p.forceSwitching&&this.activeItem===p.tab){return false
}this.beforeTabChange(p);
if(p.tab<0){this.activeItem=this.lastIndex
}else{if(p.tab>this.lastIndex){this.activeItem=0
}else{this.activeItem=p.tab
}}var n=this.subTabs?"[data-item-sub=":"[data-item=";
!p.skipSwitching&&this.$items.filter(n+this.activeItem+"]").addClass(d.active).attr("tabindex",0);
this.afterTabChange(p);
return false
};
k.prototype.onNavClick=function(p){var n=this.scrollToElementSelector||this.$el;
p.preventDefault();
$(p.currentTarget).is(d.nextButton)&&this.$el.trigger(m.tabChange,{tab:this.activeItem+1,skipSwitching:this.skipSwitching,skipFocus:true});
$(p.currentTarget).is(d.prevButton)&&this.$el.trigger(m.tabChange,{tab:this.activeItem-1,skipSwitching:this.skipSwitching,skipFocus:true});
var o=typeof this.scrollToReservedSpace==="function"?this.scrollToReservedSpace():100;
this.scrollToTopOnTabChange&&n.scrollToSelector({reservedSpace:o,duration:400})
};
k.prototype.onKeydown=function(p){var n=this.verticalNavigation?l.Keys.arrowDown:l.Keys.arrowRight,o=this.verticalNavigation?l.Keys.arrowUp:l.Keys.arrowLeft;
switch(p.key){case l.Keys.home:p.preventDefault();
this.$el.trigger(m.tabChange,{tab:0});
break;
case l.Keys.end:p.preventDefault();
this.$el.trigger(m.tabChange,{tab:this.lastIndex});
break;
case n:p.preventDefault();
this.$el.trigger(m.tabChange,{tab:this.activeItem+1,skipSwitching:this.skipSwitching});
break;
case o:p.preventDefault();
this.$el.trigger(m.tabChange,{tab:this.activeItem-1,skipSwitching:this.skipSwitching});
break;
case l.Keys.space:case l.Keys.enter:p.preventDefault();
this.$el.trigger(m.tabChange,{tab:this.activeItem,forceSwitching:true});
this.afterClick&&this.afterClick($(p.target));
break;
default:break
}if(p.key===l.Keys.arrowLeft||p.key===l.Keys.arrowRight){this.scrollTo()
}};
k.prototype.beforeScroll=null;
k.prototype.scrollTo=function(){var n=this.$links.filter("."+this.classes.active),o=this.subTabs?n.data("item-sub"):n.data("item");
this.beforeScroll&&this.beforeScroll(n);
this.$list.trigger("to.owl.carousel",o)
};
k.prototype.switchByHash=function(){var p=location.hash.slice(1),n=this.$items.filter('[data-anchor="'+p+'"]'),o=this.subTabs?n.data("item-sub"):n.data("item");
if(!n.length||!p){return
}this.$el.trigger(m.tabChange,{tab:o,skipHistory:true});
n.scrollToSelector({reservedSpace:100})
};
k.prototype.classes=d;
k.pushToHistory=g;
k.activatedComponents=a;
k.events=m;
k.moduleName="TabsUtil";
return k
});
define("SocialIcons",["WeChatPopup","constants"],function(c,e){var d={weChatLink:".social-icons__link-wechat, .social-icons-23__link-wechat"};
var a=$("html");
function b(g,f){this.$el=g;
this.focusTarget=f;
this.$weChatLink=this.$el.find(d.weChatLink);
if(this.$weChatLink.length){this.initWeChatPopup()
}}b.prototype.initWeChatPopup=function(){this.$weChatPopup=new c();
this.$weChatLink.on("click",this.openWeChat.bind(this))
};
b.prototype.openWeChat=function(f){f.preventDefault();
var g=$(f.currentTarget);
a.trigger(e.Events.menuClose);
this.$weChatPopup.open({src:g.data("src"),id:g.data("id")},this.focusTarget||this.$weChatLink)
};
b.classes=d;
return b
});
define("ReCaptcha",[],function(){var c=$(window);
var b={siteKey:"sitekey",widgetId:"recaptcha-widget-id"};
function a(e,f){var d=f||{};
this.$el=e;
this.reCaptchaEnabled=this.$el.data("recaptcha-enabled");
this.recaptchaId=this.$el.attr("id");
this.siteKey=this.$el.data(b.siteKey);
this.submitForm=d.submitForm
}a.prototype.render=function(){this.reCaptchaEnabled&&c.on("load",function(){this.id=grecaptcha.render(this.recaptchaId,{size:"invisible",sitekey:this.siteKey,callback:this.submitForm});
this.$el.data(b.widgetId,this.id)
}.bind(this))
};
a.prototype.execute=function(){grecaptcha.execute(this.id)
};
a.prototype.reset=function(){setTimeout(function(){grecaptcha.reset(this.id)
},500)
};
a.moduleName="ReCaptcha";
return a
});
define("multi-select",["utils-dust","constants","jquery-plugins"],function(e,d){var g=$(window),f=$("body");
var c={open:"open",selectedParams:".selected-params",dropdown:".multi-select-dropdown",filterWrap:".multi-select-filter-wrapper",selectedItems:".selected-items",counter:".counter",unselectTag:".unselect-tag",filterTag:".filter-tag",checkboxLabel:".checkbox-custom-label",showWaitMessage:"show-wait-message"},b={close:"dropdown:close",open:"dropdown:open",focusItem:"dropdown:focus",next:"dropdown:next",prev:"dropdown:prev",change:"dropdown:change"};
function a(i,h){this.$el=$("<div/>").addClass("multi-select-filter").addClass("validation-focus-target").attr("role","combobox").attr("tabindex",0).attr("aria-autocomplete","list").attr("aria-haspopup",true).attr("aria-expanded",false).attr("aria-required",h.required).attr("aria-labelledby",h.labelId).attr("aria-describedby",h.errorId);
h.className&&this.$el.addClass(h.className);
this.$select=i;
this.config=h;
this.$options=this.$select.find("option");
this.selectedCount=this.$select.find("option:checked").length;
a.counter=a.counter||0;
this.init();
this.initItemsUpdateEvent();
this.isDropdownAbove=this.isDropdownAbove.bind(this)
}a.prototype.init=function(){this.eventNamespace="multiSelectFilter"+a.counter++;
this.$select.hide().data("multiSelectFilter",this);
this.render()
};
a.prototype.isOpened=function(){return this.$el.hasClass(c.open)
};
a.prototype.renderCallback=function(h,i){if(i){console.log('"multi-select-dropdown" rendering error: '+i);
return
}this.draw(h);
typeof this.config.callback==="function"&&this.config.callback()
};
a.prototype.render=function(){e.render("multi-select-dropdown",this.generateRenderContext(),this.renderCallback.bind(this))
};
a.prototype.generateRenderContext=function(){var i={defaultText:this.$select.data("defaultText"),selectedCountKey:this.config.selectedCount||"component.multi-select-filter.selected-count",selectedCount:this.selectedCount,columns:this.config.columns||2,columnSize:this.config.columnSize,showTags:this.config.showTags||false,options:[],emptyOptions:[]};
this.$options.each(function(){var k=$(this),j=k.prop("selected");
i.options.push({text:k.html(),value:k.val(),selected:j})
});
if(this.$options.length===0){var h=CQ.I18n.getMessage("component.general.search-empty-result-for-combination");
i.emptyOptions=[{value:h}]
}i.columnSize=i.columnSize||Math.ceil(i.options.length/i.columns);
i.columnLastItemIndex=i.columnSize-1;
i.fixedLengthColumns=i.columns-1;
return i
};
a.prototype.setDrawElements=function(h){this.$el.html(h);
this.$select.after(this.$el);
this.$selectedParams=this.$el.find(c.selectedParams);
this.$checkboxesContainer=this.$el.find(c.dropdown);
this.$checkboxes=this.$checkboxesContainer.find(":checkbox");
this.currentItemIndex=0;
this.$tagsContainer=this.$el.parents(c.filterWrap).find(c.selectedItems);
this.$counterHolder=this.$el.find(c.counter)
};
a.prototype.draw=function(h){this.setDrawElements(h);
this.initEvents();
this.onLoad()
};
a.prototype.initItemsUpdateEvent=function(){this.$select.on(d.Events.multiSelectUpdate,function(){$(".multi-select-dropdown").removeClass(c.showWaitMessage);
var h=this.$select.find("option");
this.findMatchOptions(h);
this.$options=h;
e.render("multi-select-dropdown",this.generateRenderContext(),function(i){this.reInitDropdownOptions(i);
this.resetSkillsCounter();
this.resetAllTags();
this.toggleDropdown(true)
}.bind(this));
this.checkMatchTags()
}.bind(this));
this.$select.one(d.Events.multiSelectFirstUpdate,function(){$(".multi-select-dropdown").removeClass(c.showWaitMessage);
this.$options=this.$select.find("option");
e.render("multi-select-dropdown",this.generateRenderContext(),function(h){this.reInitDropdownOptions(h);
this.onLoad()
}.bind(this));
this.updateCounter(this.$select.find(":selected").length)
}.bind(this));
this.$select.on(d.Events.multiSelectBeforeUpdate,function(){var h=$(".multi-select-dropdown");
h.empty();
h.addClass(c.showWaitMessage);
h.html('<span class="">Waiting for results...</span>')
})
};
a.prototype.checkMatchTags=function(){for(var h=0;
h<this.$matchedOptions.length;
h++){this.select(this.$matchedOptions[h])
}};
a.prototype.findMatchOptions=function(m){this.$matchedOptions=[];
var n=this.getSelectedItems();
for(var k=0;
k<n.length;
k++){var l=n[k].value;
for(var h=0;
h<m.length;
h++){if(l===m[h].value){this.$matchedOptions.push(l)
}}}};
a.prototype.reInitDropdownOptions=function(h){this.setDrawElements(h);
this.initReusedEvents();
this.setOverlayScrollbar()
};
a.prototype.setOverlayScrollbar=function(){var h=f.hasClass("dark-mode")||f.hasClass("light-mode");
if(h){setTimeout(function(){OverlayScrollbars(this.$el.find(c.dropdown),{className:"os-theme-dark"})
}.bind(this),100)
}};
a.prototype.toggleDropdown=function(h){this.$checkboxesContainer.toggleClass(d.Classes.hidden,!h);
this.$el.toggleClass(c.open,h);
g.off("click."+this.eventNamespace+" touchstart."+this.eventNamespace);
if(!h){g.off("scroll resize",this.isDropdownAbove);
return
}g.on("scroll resize",this.isDropdownAbove).on("click."+this.eventNamespace+" touchstart."+this.eventNamespace,this.onWindowClick.bind(this));
this.isDropdownAbove();
this.$checkboxes.first().focus().attr("aria-selected",true)
};
a.prototype.removeTag=function(h){var i=$(h.target).parent().data("value");
this.$options.findByValue(i).length&&this.unselect(i);
return false
};
a.prototype.resetAllTags=function(){$(c.selectedItems).empty()
};
a.prototype.onClose=function(){this.$el.focus();
this.$el.attr("aria-expanded",false);
this.currentItemIndex=0;
this.toggleDropdown(false)
};
a.prototype.onOpen=function(){this.$el.attr("aria-expanded",true);
this.toggleDropdown(true)
};
a.prototype.onEscPress=function(){this.isOpened()&&this.$el.trigger(b.close)
};
a.prototype.onTabPress=function(){this.isOpened()&&this.$el.trigger(b.close)
};
a.prototype.onSpaceOrEnterPress=function(h){if(this.isOpened()){return
}h.preventDefault();
this.$el.trigger(b.open)
};
a.prototype.onCheckboxChange=function(i){var h=$(i.target),j=h.data("value");
if(h.prop("checked")){this.select(j)
}else{this.unselect(j)
}};
a.prototype.getSelectedItems=function(){return this.$options.filter(":selected")
};
a.prototype.onLoad=function(){this.getSelectedItems().each(function(h,i){this.addTag(i.value)
}.bind(this))
};
a.prototype.onSync=function(){var h=this.getSelectedItems();
this.$checkboxes.each(function(k,n){var l=$(n),m=l.data("value").toString(),j=l.prop("checked"),i=h.findByValue(m).length;
if(j&&!i){this.unselect(m,true)
}else{if(!j&&i){this.select(m,true)
}}}.bind(this))
};
a.prototype.onWindowClick=function(h){!$(h.target).closest(this.$el).length&&this.$el.trigger(b.close)
};
a.prototype.onArrowDown=function(h){if(!this.isOpened()){return
}h.preventDefault();
this.$el.trigger(b.next)
};
a.prototype.onArrowUp=function(h){if(!this.isOpened()){return
}h.preventDefault();
this.$el.trigger(b.prev)
};
a.prototype.onClick=function(i){var h=$(i.target).closest("li[role=treeitem]").data("index");
if(!h){return
}this.selectItem(h)
};
a.prototype.onKeyDown=function(h){switch(h.key){case d.Keys.arrowUp:this.onArrowUp(h);
break;
case d.Keys.arrowDown:this.onArrowDown(h);
break;
case d.Keys.tab:this.onTabPress();
break;
case d.Keys.esc:this.onEscPress();
break;
case d.Keys.enter:h.preventDefault();
this.onSpaceOrEnterPress(h);
break;
case d.Keys.space:this.onSpaceOrEnterPress(h);
break;
default:break
}};
a.prototype.selectItem=function(i){var h=this.$checkboxes.eq(i);
this.currentItemIndex=i;
this.$checkboxes.filter("[aria-selected=true]").attr("aria-selected",false);
h.focus().attr("aria-selected",true)
};
a.prototype.selectPrev=function(){if(this.currentItemIndex<1){return
}this.selectItem(this.currentItemIndex-1)
};
a.prototype.selectNext=function(){if(this.currentItemIndex>=this.$checkboxes.length-1){return
}this.selectItem(this.currentItemIndex+1)
};
a.prototype.initEvents=function(){this.$el.on(b.close,this.onClose.bind(this)).on(b.open,this.onOpen.bind(this)).on(b.next,this.selectNext.bind(this)).on(b.prev,this.selectPrev.bind(this)).on("click",this.onClick.bind(this)).on("keydown",this.onKeyDown.bind(this));
this.$tagsContainer.on("click."+this.eventNamespace,c.unselectTag,this.removeTag.bind(this));
this.initReusedEvents()
};
a.prototype.initReusedEvents=function(){this.$checkboxesContainer.on("change."+this.eventNamespace,":checkbox",this.onCheckboxChange.bind(this));
this.$selectedParams.on("click."+this.eventNamespace,function(){this.$el.trigger(this.isOpened()?b.close:b.open)
}.bind(this));
this.$select.on("synchronize",this.onSync.bind(this));
this.$select.on("reset",this.resetSkillsCounter.bind(this))
};
a.prototype.unselect=function(i,h){this.config.showTags&&this.$tagsContainer.children(c.filterTag).findByAttr("data-value",i.toString()).remove();
this.$checkboxes.findByAttr("data-value",i).removeAttr("checked");
!h&&this.changeSelection(i,false);
this.decrementCounter()
};
a.prototype.changeSelection=function(i,h){var j=this.$options.findByValue(i);
if(h){j.attr("selected","selected").prop("selected",true)
}else{j.removeAttr("selected").prop("selected",false)
}this.$select.trigger("change");
this.$select.trigger(b.change,i)
};
a.prototype.select=function(i,h){!h&&this.changeSelection(i,true);
this.addTag(i);
this.$checkboxes.findByAttr("data-value",i).prop("checked",true);
this.incrementCounter()
};
a.prototype.addTag=function(h){if(!this.config.showTags){return
}var i=this.$options.findByValue(h).html();
e.append("multi-select-filter-tag",{text:i,value:h},this.$tagsContainer)
};
a.prototype.isDropdownAbove=function(){var h=g.scrollTop()+g.height()<this.$el.offset().top+this.$el.height()+this.$checkboxesContainer.outerHeight();
this.isOpened()&&this.$el.toggleClass("above",h)
};
a.prototype.incrementCounter=function(){this.$selectedParams.addClass("selected");
this.selectedCount++;
this.$counterHolder.html(this.selectedCount)
};
a.prototype.updateCounter=function(h){if(h>0){this.$selectedParams.addClass("selected");
this.selectedCount=h;
this.$counterHolder.html(this.selectedCount)
}};
a.prototype.decrementCounter=function(){this.selectedCount--;
if(this.selectedCount>0){this.$counterHolder.html(this.selectedCount)
}else{this.$counterHolder.html("");
this.$selectedParams.removeClass("selected")
}};
a.prototype.resetSkillsCounter=function(){this.selectedCount=0;
this.$counterHolder.html("");
this.$selectedParams.removeClass("selected")
};
a.prototype.destroy=function(){this.$tagsContainer.off("click."+this.eventNamespace);
this.$checkboxesContainer.off("change."+this.eventNamespace);
this.$selectedParams.off("click."+this.eventNamespace);
g.off("click."+this.eventNamespace+" touchstart."+this.eventNamespace);
this.$select.removeData("multiSelectFilter");
this.$el.remove()
};
$.fn.multiSelectFilter=function(h){return this.each(function(){new a($(this),h||{})
})
};
return a
});
/*!
 * OverlayScrollbars
 * https://github.com/KingSora/OverlayScrollbars
 *
 * Version: 1.13.3
 *
 * Copyright KingSora | Rene Haas.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 * Date: 20.07.2022
 */
(function(b,a){if(typeof define==="function"){define(["jquery"],function(c){return a(b,b.document,undefined,c)
})
}else{if(typeof module==="object"&&typeof module.exports==="object"){module.exports=a(b,b.document,undefined,require("jquery"))
}else{a(b,b.document,undefined,b.jQuery)
}}}(typeof window!=="undefined"?window:this,function(window,document,undefined,framework){var PLUGINNAME="OverlayScrollbars";
var TYPES={o:"object",f:"function",a:"array",s:"string",b:"boolean",n:"number",u:"undefined",z:"null"};
var LEXICON={c:"class",s:"style",i:"id",l:"length",p:"prototype",ti:"tabindex",oH:"offsetHeight",cH:"clientHeight",sH:"scrollHeight",oW:"offsetWidth",cW:"clientWidth",sW:"scrollWidth",hOP:"hasOwnProperty",bCR:"getBoundingClientRect"};
var VENDORS=(function(){var jsCache={};
var cssCache={};
var cssPrefixes=["-webkit-","-moz-","-o-","-ms-"];
var jsPrefixes=["WebKit","Moz","O","MS"];
function firstLetterToUpper(str){return str.charAt(0).toUpperCase()+str.slice(1)
}return{_cssPrefixes:cssPrefixes,_jsPrefixes:jsPrefixes,_cssProperty:function(name){var result=cssCache[name];
if(cssCache[LEXICON.hOP](name)){return result
}var uppercasedName=firstLetterToUpper(name);
var elmStyle=document.createElement("div")[LEXICON.s];
var resultPossibilities;
var i=0;
var v;
var currVendorWithoutDashes;
for(;
i<cssPrefixes.length;
i++){currVendorWithoutDashes=cssPrefixes[i].replace(/-/g,"");
resultPossibilities=[name,cssPrefixes[i]+name,currVendorWithoutDashes+uppercasedName,firstLetterToUpper(currVendorWithoutDashes)+uppercasedName];
for(v=0;
v<resultPossibilities[LEXICON.l];
v++){if(elmStyle[resultPossibilities[v]]!==undefined){result=resultPossibilities[v];
break
}}}cssCache[name]=result;
return result
},_cssPropertyValue:function(property,values,suffix){var name=property+" "+values;
var result=cssCache[name];
if(cssCache[LEXICON.hOP](name)){return result
}var dummyStyle=document.createElement("div")[LEXICON.s];
var possbleValues=values.split(" ");
var preparedSuffix=suffix||"";
var i=0;
var v=-1;
var prop;
for(;
i<possbleValues[LEXICON.l];
i++){for(;
v<VENDORS._cssPrefixes[LEXICON.l];
v++){prop=v<0?possbleValues[i]:VENDORS._cssPrefixes[v]+possbleValues[i];
dummyStyle.cssText=property+":"+prop+preparedSuffix;
if(dummyStyle[LEXICON.l]){result=prop;
break
}}}cssCache[name]=result;
return result
},_jsAPI:function(name,isInterface,fallback){var i=0;
var result=jsCache[name];
if(!jsCache[LEXICON.hOP](name)){result=window[name];
for(;
i<jsPrefixes[LEXICON.l];
i++){result=result||window[(isInterface?jsPrefixes[i]:jsPrefixes[i].toLowerCase())+firstLetterToUpper(name)]
}jsCache[name]=result
}return result||fallback
}}
})();
var COMPATIBILITY=(function(){function windowSize(x){return x?window.innerWidth||document.documentElement[LEXICON.cW]||document.body[LEXICON.cW]:window.innerHeight||document.documentElement[LEXICON.cH]||document.body[LEXICON.cH]
}function bind(func,thisObj){if(typeof func!=TYPES.f){throw"Can't bind function!"
}var proto=LEXICON.p;
var aArgs=Array[proto].slice.call(arguments,2);
var fNOP=function(){};
var fBound=function(){return func.apply(this instanceof fNOP?this:thisObj,aArgs.concat(Array[proto].slice.call(arguments)))
};
if(func[proto]){fNOP[proto]=func[proto]
}fBound[proto]=new fNOP();
return fBound
}return{wW:bind(windowSize,0,true),wH:bind(windowSize,0),mO:bind(VENDORS._jsAPI,0,"MutationObserver",true),rO:bind(VENDORS._jsAPI,0,"ResizeObserver",true),rAF:bind(VENDORS._jsAPI,0,"requestAnimationFrame",false,function(func){return window.setTimeout(func,1000/60)
}),cAF:bind(VENDORS._jsAPI,0,"cancelAnimationFrame",false,function(id){return window.clearTimeout(id)
}),now:function(){return Date.now&&Date.now()||new Date().getTime()
},stpP:function(event){if(event.stopPropagation){event.stopPropagation()
}else{event.cancelBubble=true
}},prvD:function(event){if(event.preventDefault&&event.cancelable){event.preventDefault()
}else{event.returnValue=false
}},page:function(event){event=event.originalEvent||event;
var strPage="page";
var strClient="client";
var strX="X";
var strY="Y";
var target=event.target||event.srcElement||document;
var eventDoc=target.ownerDocument||document;
var doc=eventDoc.documentElement;
var body=eventDoc.body;
if(event.touches!==undefined){var touch=event.touches[0];
return{x:touch[strPage+strX],y:touch[strPage+strY]}
}if(!event[strPage+strX]&&event[strClient+strX]&&event[strClient+strX]!=null){return{x:event[strClient+strX]+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0),y:event[strClient+strY]+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0)}
}return{x:event[strPage+strX],y:event[strPage+strY]}
},mBtn:function(event){var button=event.button;
if(!event.which&&button!==undefined){return(button&1?1:(button&2?3:(button&4?2:0)))
}else{return event.which
}},inA:function(item,arr){for(var i=0;
i<arr[LEXICON.l];
i++){try{if(arr[i]===item){return i
}}catch(e){}}return -1
},isA:function(arr){var def=Array.isArray;
return def?def(arr):this.type(arr)==TYPES.a
},type:function(obj){if(obj===undefined){return obj+""
}if(obj===null){return obj+""
}return Object[LEXICON.p].toString.call(obj).replace(/^\[object (.+)\]$/,"$1").toLowerCase()
},bind:bind}
})();
var MATH=Math;
var JQUERY=framework;
var EASING=framework.easing;
var FRAMEWORK=framework;
var INSTANCES=(function(){var _targets=[];
var _instancePropertyString="__overlayScrollbars__";
return function(target,instance){var argLen=arguments[LEXICON.l];
if(argLen<1){return _targets
}else{if(instance){target[_instancePropertyString]=instance;
_targets.push(target)
}else{var index=COMPATIBILITY.inA(target,_targets);
if(index>-1){if(argLen>1){delete target[_instancePropertyString];
_targets.splice(index,1)
}else{return _targets[index][_instancePropertyString]
}}}}}
})();
var PLUGIN=(function(){var _plugin;
var _pluginsGlobals;
var _pluginsAutoUpdateLoop;
var _pluginsExtensions=[];
var _pluginsOptions=(function(){var type=COMPATIBILITY.type;
var possibleTemplateTypes=[TYPES.b,TYPES.n,TYPES.s,TYPES.a,TYPES.o,TYPES.f,TYPES.z];
var restrictedStringsSplit=" ";
var restrictedStringsPossibilitiesSplit=":";
var classNameAllowedValues=[TYPES.z,TYPES.s];
var numberAllowedValues=TYPES.n;
var booleanNullAllowedValues=[TYPES.z,TYPES.b];
var booleanTrueTemplate=[true,TYPES.b];
var booleanFalseTemplate=[false,TYPES.b];
var callbackTemplate=[null,[TYPES.z,TYPES.f]];
var updateOnLoadTemplate=[["img"],[TYPES.s,TYPES.a,TYPES.z]];
var inheritedAttrsTemplate=[["style","class"],[TYPES.s,TYPES.a,TYPES.z]];
var resizeAllowedValues="n:none b:both h:horizontal v:vertical";
var overflowBehaviorAllowedValues="v-h:visible-hidden v-s:visible-scroll s:scroll h:hidden";
var scrollbarsVisibilityAllowedValues="v:visible h:hidden a:auto";
var scrollbarsAutoHideAllowedValues="n:never s:scroll l:leave m:move";
var optionsDefaultsAndTemplate={className:["os-theme-dark",classNameAllowedValues],resize:["none",resizeAllowedValues],sizeAutoCapable:booleanTrueTemplate,clipAlways:booleanTrueTemplate,normalizeRTL:booleanTrueTemplate,paddingAbsolute:booleanFalseTemplate,autoUpdate:[null,booleanNullAllowedValues],autoUpdateInterval:[33,numberAllowedValues],updateOnLoad:updateOnLoadTemplate,nativeScrollbarsOverlaid:{showNativeScrollbars:booleanFalseTemplate,initialize:booleanTrueTemplate},overflowBehavior:{x:["scroll",overflowBehaviorAllowedValues],y:["scroll",overflowBehaviorAllowedValues]},scrollbars:{visibility:["auto",scrollbarsVisibilityAllowedValues],autoHide:["never",scrollbarsAutoHideAllowedValues],autoHideDelay:[800,numberAllowedValues],dragScrolling:booleanTrueTemplate,clickScrolling:booleanFalseTemplate,touchSupport:booleanTrueTemplate,snapHandle:booleanFalseTemplate},textarea:{dynWidth:booleanFalseTemplate,dynHeight:booleanFalseTemplate,inheritedAttrs:inheritedAttrsTemplate},callbacks:{onInitialized:callbackTemplate,onInitializationWithdrawn:callbackTemplate,onDestroyed:callbackTemplate,onScrollStart:callbackTemplate,onScroll:callbackTemplate,onScrollStop:callbackTemplate,onOverflowChanged:callbackTemplate,onOverflowAmountChanged:callbackTemplate,onDirectionChanged:callbackTemplate,onContentSizeChanged:callbackTemplate,onHostSizeChanged:callbackTemplate,onUpdated:callbackTemplate}};
var convert=function(template){var recursive=function(obj){var key;
var val;
var valType;
for(key in obj){if(!obj[LEXICON.hOP](key)){continue
}val=obj[key];
valType=type(val);
if(valType==TYPES.a){obj[key]=val[template?1:0]
}else{if(valType==TYPES.o){obj[key]=recursive(val)
}}}return obj
};
return recursive(FRAMEWORK.extend(true,{},optionsDefaultsAndTemplate))
};
return{_defaults:convert(),_template:convert(true),_validate:function(obj,template,writeErrors,diffObj){var validatedOptions={};
var validatedOptionsPrepared={};
var objectCopy=FRAMEWORK.extend(true,{},obj);
var inArray=FRAMEWORK.inArray;
var isEmptyObj=FRAMEWORK.isEmptyObject;
var checkObjectProps=function(data,template,diffData,validatedOptions,validatedOptionsPrepared,prevPropName){for(var prop in template){if(template[LEXICON.hOP](prop)&&data[LEXICON.hOP](prop)){var isValid=false;
var isDiff=false;
var templateValue=template[prop];
var templateValueType=type(templateValue);
var templateIsComplex=templateValueType==TYPES.o;
var templateTypes=!COMPATIBILITY.isA(templateValue)?[templateValue]:templateValue;
var dataDiffValue=diffData[prop];
var dataValue=data[prop];
var dataValueType=type(dataValue);
var propPrefix=prevPropName?prevPropName+".":"";
var error='The option "'+propPrefix+prop+"\" wasn't set, because";
var errorPossibleTypes=[];
var errorRestrictedStrings=[];
var restrictedStringValuesSplit;
var restrictedStringValuesPossibilitiesSplit;
var isRestrictedValue;
var mainPossibility;
var currType;
var i;
var v;
var j;
dataDiffValue=dataDiffValue===undefined?{}:dataDiffValue;
if(templateIsComplex&&dataValueType==TYPES.o){validatedOptions[prop]={};
validatedOptionsPrepared[prop]={};
checkObjectProps(dataValue,templateValue,dataDiffValue,validatedOptions[prop],validatedOptionsPrepared[prop],propPrefix+prop);
FRAMEWORK.each([data,validatedOptions,validatedOptionsPrepared],function(index,value){if(isEmptyObj(value[prop])){delete value[prop]
}})
}else{if(!templateIsComplex){for(i=0;
i<templateTypes[LEXICON.l];
i++){currType=templateTypes[i];
templateValueType=type(currType);
isRestrictedValue=templateValueType==TYPES.s&&inArray(currType,possibleTemplateTypes)===-1;
if(isRestrictedValue){errorPossibleTypes.push(TYPES.s);
restrictedStringValuesSplit=currType.split(restrictedStringsSplit);
errorRestrictedStrings=errorRestrictedStrings.concat(restrictedStringValuesSplit);
for(v=0;
v<restrictedStringValuesSplit[LEXICON.l];
v++){restrictedStringValuesPossibilitiesSplit=restrictedStringValuesSplit[v].split(restrictedStringsPossibilitiesSplit);
mainPossibility=restrictedStringValuesPossibilitiesSplit[0];
for(j=0;
j<restrictedStringValuesPossibilitiesSplit[LEXICON.l];
j++){if(dataValue===restrictedStringValuesPossibilitiesSplit[j]){isValid=true;
break
}}if(isValid){break
}}}else{errorPossibleTypes.push(currType);
if(dataValueType===currType){isValid=true;
break
}}}if(isValid){isDiff=dataValue!==dataDiffValue;
if(isDiff){validatedOptions[prop]=dataValue
}if(isRestrictedValue?inArray(dataDiffValue,restrictedStringValuesPossibilitiesSplit)<0:isDiff){validatedOptionsPrepared[prop]=isRestrictedValue?mainPossibility:dataValue
}}else{if(writeErrors){console.warn(error+" it doesn't accept the type [ "+dataValueType.toUpperCase()+' ] with the value of "'+dataValue+'".\r\nAccepted types are: [ '+errorPossibleTypes.join(", ").toUpperCase()+" ]."+(errorRestrictedStrings[length]>0?"\r\nValid strings are: [ "+errorRestrictedStrings.join(", ").split(restrictedStringsPossibilitiesSplit).join(", ")+" ].":""))
}}delete data[prop]
}}}}};
checkObjectProps(objectCopy,template,diffObj||{},validatedOptions,validatedOptionsPrepared);
if(!isEmptyObj(objectCopy)&&writeErrors){console.warn("The following options are discarded due to invalidity:\r\n"+window.JSON.stringify(objectCopy,null,2))
}return{_default:validatedOptions,_prepared:validatedOptionsPrepared}
}}
}());
function initOverlayScrollbarsStatics(){if(!_pluginsGlobals){_pluginsGlobals=new OverlayScrollbarsGlobals(_pluginsOptions._defaults)
}if(!_pluginsAutoUpdateLoop){_pluginsAutoUpdateLoop=new OverlayScrollbarsAutoUpdateLoop(_pluginsGlobals)
}}function OverlayScrollbarsGlobals(defaultOptions){var _base=this;
var strOverflow="overflow";
var strHidden="hidden";
var strScroll="scroll";
var bodyElement=FRAMEWORK("body");
var scrollbarDummyElement=FRAMEWORK('<div id="os-dummy-scrollbar-size"><div></div></div>');
var scrollbarDummyElement0=scrollbarDummyElement[0];
var dummyContainerChild=FRAMEWORK(scrollbarDummyElement.children("div").eq(0));
bodyElement.append(scrollbarDummyElement);
scrollbarDummyElement.hide().show();
var nativeScrollbarSize=calcNativeScrollbarSize(scrollbarDummyElement0);
var nativeScrollbarIsOverlaid={x:nativeScrollbarSize.x===0,y:nativeScrollbarSize.y===0};
var msie=(function(){var ua=window.navigator.userAgent;
var strIndexOf="indexOf";
var strSubString="substring";
var msie=ua[strIndexOf]("MSIE ");
var trident=ua[strIndexOf]("Trident/");
var edge=ua[strIndexOf]("Edge/");
var rv=ua[strIndexOf]("rv:");
var result;
var parseIntFunc=parseInt;
if(msie>0){result=parseIntFunc(ua[strSubString](msie+5,ua[strIndexOf](".",msie)),10)
}else{if(trident>0){result=parseIntFunc(ua[strSubString](rv+3,ua[strIndexOf](".",rv)),10)
}else{if(edge>0){result=parseIntFunc(ua[strSubString](edge+5,ua[strIndexOf](".",edge)),10)
}}}return result
})();
FRAMEWORK.extend(_base,{defaultOptions:defaultOptions,msie:msie,autoUpdateLoop:false,autoUpdateRecommended:!COMPATIBILITY.mO(),nativeScrollbarSize:nativeScrollbarSize,nativeScrollbarIsOverlaid:nativeScrollbarIsOverlaid,nativeScrollbarStyling:(function(){var result=false;
scrollbarDummyElement.addClass("os-viewport-native-scrollbars-invisible");
try{result=(scrollbarDummyElement.css("scrollbar-width")==="none"&&(msie>9||!msie))||window.getComputedStyle(scrollbarDummyElement0,"::-webkit-scrollbar").getPropertyValue("display")==="none"
}catch(ex){}return result
})(),overlayScrollbarDummySize:{x:30,y:30},cssCalc:VENDORS._cssPropertyValue("width","calc","(1px)")||null,restrictedMeasuring:(function(){scrollbarDummyElement.css(strOverflow,strHidden);
var scrollSize={w:scrollbarDummyElement0[LEXICON.sW],h:scrollbarDummyElement0[LEXICON.sH]};
scrollbarDummyElement.css(strOverflow,"visible");
var scrollSize2={w:scrollbarDummyElement0[LEXICON.sW],h:scrollbarDummyElement0[LEXICON.sH]};
return(scrollSize.w-scrollSize2.w)!==0||(scrollSize.h-scrollSize2.h)!==0
})(),rtlScrollBehavior:(function(){scrollbarDummyElement.css({"overflow-y":strHidden,"overflow-x":strScroll,direction:"rtl"}).scrollLeft(0);
var dummyContainerOffset=scrollbarDummyElement.offset();
var dummyContainerChildOffset=dummyContainerChild.offset();
scrollbarDummyElement.scrollLeft(-999);
var dummyContainerChildOffsetAfterScroll=dummyContainerChild.offset();
return{i:dummyContainerOffset.left===dummyContainerChildOffset.left,n:dummyContainerChildOffset.left!==dummyContainerChildOffsetAfterScroll.left}
})(),supportTransform:!!VENDORS._cssProperty("transform"),supportTransition:!!VENDORS._cssProperty("transition"),supportPassiveEvents:(function(){var supportsPassive=false;
try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){supportsPassive=true
}}))
}catch(e){}return supportsPassive
})(),supportResizeObserver:!!COMPATIBILITY.rO(),supportMutationObserver:!!COMPATIBILITY.mO()});
scrollbarDummyElement.removeAttr(LEXICON.s).remove();
(function(){if(nativeScrollbarIsOverlaid.x&&nativeScrollbarIsOverlaid.y){return
}var abs=MATH.abs;
var windowWidth=COMPATIBILITY.wW();
var windowHeight=COMPATIBILITY.wH();
var windowDpr=getWindowDPR();
var onResize=function(){if(INSTANCES().length>0){var newW=COMPATIBILITY.wW();
var newH=COMPATIBILITY.wH();
var deltaW=newW-windowWidth;
var deltaH=newH-windowHeight;
if(deltaW===0&&deltaH===0){return
}var deltaWRatio=MATH.round(newW/(windowWidth/100));
var deltaHRatio=MATH.round(newH/(windowHeight/100));
var absDeltaW=abs(deltaW);
var absDeltaH=abs(deltaH);
var absDeltaWRatio=abs(deltaWRatio);
var absDeltaHRatio=abs(deltaHRatio);
var newDPR=getWindowDPR();
var deltaIsBigger=absDeltaW>2&&absDeltaH>2;
var difference=!differenceIsBiggerThanOne(absDeltaWRatio,absDeltaHRatio);
var dprChanged=newDPR!==windowDpr&&windowDpr>0;
var isZoom=deltaIsBigger&&difference&&dprChanged;
var oldScrollbarSize=_base.nativeScrollbarSize;
var newScrollbarSize;
if(isZoom){bodyElement.append(scrollbarDummyElement);
newScrollbarSize=_base.nativeScrollbarSize=calcNativeScrollbarSize(scrollbarDummyElement[0]);
scrollbarDummyElement.remove();
if(oldScrollbarSize.x!==newScrollbarSize.x||oldScrollbarSize.y!==newScrollbarSize.y){FRAMEWORK.each(INSTANCES(),function(){if(INSTANCES(this)){INSTANCES(this).update("zoom")
}})
}}windowWidth=newW;
windowHeight=newH;
windowDpr=newDPR
}};
function differenceIsBiggerThanOne(valOne,valTwo){var absValOne=abs(valOne);
var absValTwo=abs(valTwo);
return !(absValOne===absValTwo||absValOne+1===absValTwo||absValOne-1===absValTwo)
}function getWindowDPR(){var dDPI=window.screen.deviceXDPI||0;
var sDPI=window.screen.logicalXDPI||1;
return window.devicePixelRatio||(dDPI/sDPI)
}FRAMEWORK(window).on("resize",onResize)
})();
function calcNativeScrollbarSize(measureElement){return{x:measureElement[LEXICON.oH]-measureElement[LEXICON.cH],y:measureElement[LEXICON.oW]-measureElement[LEXICON.cW]}
}}function OverlayScrollbarsAutoUpdateLoop(globals){var _base=this;
var _inArray=FRAMEWORK.inArray;
var _getNow=COMPATIBILITY.now;
var _strAutoUpdate="autoUpdate";
var _strAutoUpdateInterval=_strAutoUpdate+"Interval";
var _strLength=LEXICON.l;
var _loopingInstances=[];
var _loopingInstancesIntervalCache=[];
var _loopIsActive=false;
var _loopIntervalDefault=33;
var _loopInterval=_loopIntervalDefault;
var _loopTimeOld=_getNow();
var _loopID;
var loop=function(){if(_loopingInstances[_strLength]>0&&_loopIsActive){_loopID=COMPATIBILITY.rAF()(function(){loop()
});
var timeNew=_getNow();
var timeDelta=timeNew-_loopTimeOld;
var lowestInterval;
var instance;
var instanceOptions;
var instanceAutoUpdateAllowed;
var instanceAutoUpdateInterval;
var now;
if(timeDelta>_loopInterval){_loopTimeOld=timeNew-(timeDelta%_loopInterval);
lowestInterval=_loopIntervalDefault;
for(var i=0;
i<_loopingInstances[_strLength];
i++){instance=_loopingInstances[i];
if(instance!==undefined){instanceOptions=instance.options();
instanceAutoUpdateAllowed=instanceOptions[_strAutoUpdate];
instanceAutoUpdateInterval=MATH.max(1,instanceOptions[_strAutoUpdateInterval]);
now=_getNow();
if((instanceAutoUpdateAllowed===true||instanceAutoUpdateAllowed===null)&&(now-_loopingInstancesIntervalCache[i])>instanceAutoUpdateInterval){instance.update("auto");
_loopingInstancesIntervalCache[i]=new Date(now+=instanceAutoUpdateInterval)
}lowestInterval=MATH.max(1,MATH.min(lowestInterval,instanceAutoUpdateInterval))
}}_loopInterval=lowestInterval
}}else{_loopInterval=_loopIntervalDefault
}};
_base.add=function(instance){if(_inArray(instance,_loopingInstances)===-1){_loopingInstances.push(instance);
_loopingInstancesIntervalCache.push(_getNow());
if(_loopingInstances[_strLength]>0&&!_loopIsActive){_loopIsActive=true;
globals.autoUpdateLoop=_loopIsActive;
loop()
}}};
_base.remove=function(instance){var index=_inArray(instance,_loopingInstances);
if(index>-1){_loopingInstancesIntervalCache.splice(index,1);
_loopingInstances.splice(index,1);
if(_loopingInstances[_strLength]===0&&_loopIsActive){_loopIsActive=false;
globals.autoUpdateLoop=_loopIsActive;
if(_loopID!==undefined){COMPATIBILITY.cAF()(_loopID);
_loopID=-1
}}}}
}function OverlayScrollbarsInstance(pluginTargetElement,options,extensions,globals,autoUpdateLoop){var type=COMPATIBILITY.type;
var inArray=FRAMEWORK.inArray;
var each=FRAMEWORK.each;
var _base=new _plugin();
var _frameworkProto=FRAMEWORK[LEXICON.p];
if(!isHTMLElement(pluginTargetElement)){return
}if(INSTANCES(pluginTargetElement)){var inst=INSTANCES(pluginTargetElement);
inst.options(options);
return inst
}var _nativeScrollbarIsOverlaid;
var _overlayScrollbarDummySize;
var _rtlScrollBehavior;
var _autoUpdateRecommended;
var _msieVersion;
var _nativeScrollbarStyling;
var _cssCalc;
var _nativeScrollbarSize;
var _supportTransition;
var _supportTransform;
var _supportPassiveEvents;
var _supportResizeObserver;
var _supportMutationObserver;
var _restrictedMeasuring;
var _initialized;
var _destroyed;
var _isTextarea;
var _isBody;
var _documentMixed;
var _domExists;
var _isBorderBox;
var _sizeAutoObserverAdded;
var _paddingX;
var _paddingY;
var _borderX;
var _borderY;
var _marginX;
var _marginY;
var _isRTL;
var _sleeping;
var _contentBorderSize={};
var _scrollHorizontalInfo={};
var _scrollVerticalInfo={};
var _viewportSize={};
var _nativeScrollbarMinSize={};
var _strMinusHidden="-hidden";
var _strMarginMinus="margin-";
var _strPaddingMinus="padding-";
var _strBorderMinus="border-";
var _strTop="top";
var _strRight="right";
var _strBottom="bottom";
var _strLeft="left";
var _strMinMinus="min-";
var _strMaxMinus="max-";
var _strWidth="width";
var _strHeight="height";
var _strFloat="float";
var _strEmpty="";
var _strAuto="auto";
var _strSync="sync";
var _strScroll="scroll";
var _strHundredPercent="100%";
var _strX="x";
var _strY="y";
var _strDot=".";
var _strSpace=" ";
var _strScrollbar="scrollbar";
var _strMinusHorizontal="-horizontal";
var _strMinusVertical="-vertical";
var _strScrollLeft=_strScroll+"Left";
var _strScrollTop=_strScroll+"Top";
var _strMouseTouchDownEvent="mousedown touchstart";
var _strMouseTouchUpEvent="mouseup touchend touchcancel";
var _strMouseTouchMoveEvent="mousemove touchmove";
var _strMouseEnter="mouseenter";
var _strMouseLeave="mouseleave";
var _strKeyDownEvent="keydown";
var _strKeyUpEvent="keyup";
var _strSelectStartEvent="selectstart";
var _strTransitionEndEvent="transitionend webkitTransitionEnd oTransitionEnd";
var _strResizeObserverProperty="__overlayScrollbarsRO__";
var _cassNamesPrefix="os-";
var _classNameHTMLElement=_cassNamesPrefix+"html";
var _classNameHostElement=_cassNamesPrefix+"host";
var _classNameHostElementForeign=_classNameHostElement+"-foreign";
var _classNameHostTextareaElement=_classNameHostElement+"-textarea";
var _classNameHostScrollbarHorizontalHidden=_classNameHostElement+"-"+_strScrollbar+_strMinusHorizontal+_strMinusHidden;
var _classNameHostScrollbarVerticalHidden=_classNameHostElement+"-"+_strScrollbar+_strMinusVertical+_strMinusHidden;
var _classNameHostTransition=_classNameHostElement+"-transition";
var _classNameHostRTL=_classNameHostElement+"-rtl";
var _classNameHostResizeDisabled=_classNameHostElement+"-resize-disabled";
var _classNameHostScrolling=_classNameHostElement+"-scrolling";
var _classNameHostOverflow=_classNameHostElement+"-overflow";
var _classNameHostOverflow=_classNameHostElement+"-overflow";
var _classNameHostOverflowX=_classNameHostOverflow+"-x";
var _classNameHostOverflowY=_classNameHostOverflow+"-y";
var _classNameTextareaElement=_cassNamesPrefix+"textarea";
var _classNameTextareaCoverElement=_classNameTextareaElement+"-cover";
var _classNamePaddingElement=_cassNamesPrefix+"padding";
var _classNameViewportElement=_cassNamesPrefix+"viewport";
var _classNameViewportNativeScrollbarsInvisible=_classNameViewportElement+"-native-scrollbars-invisible";
var _classNameViewportNativeScrollbarsOverlaid=_classNameViewportElement+"-native-scrollbars-overlaid";
var _classNameContentElement=_cassNamesPrefix+"content";
var _classNameContentArrangeElement=_cassNamesPrefix+"content-arrange";
var _classNameContentGlueElement=_cassNamesPrefix+"content-glue";
var _classNameSizeAutoObserverElement=_cassNamesPrefix+"size-auto-observer";
var _classNameResizeObserverElement=_cassNamesPrefix+"resize-observer";
var _classNameResizeObserverItemElement=_cassNamesPrefix+"resize-observer-item";
var _classNameResizeObserverItemFinalElement=_classNameResizeObserverItemElement+"-final";
var _classNameTextInherit=_cassNamesPrefix+"text-inherit";
var _classNameScrollbar=_cassNamesPrefix+_strScrollbar;
var _classNameScrollbarTrack=_classNameScrollbar+"-track";
var _classNameScrollbarTrackOff=_classNameScrollbarTrack+"-off";
var _classNameScrollbarHandle=_classNameScrollbar+"-handle";
var _classNameScrollbarHandleOff=_classNameScrollbarHandle+"-off";
var _classNameScrollbarUnusable=_classNameScrollbar+"-unusable";
var _classNameScrollbarAutoHidden=_classNameScrollbar+"-"+_strAuto+_strMinusHidden;
var _classNameScrollbarCorner=_classNameScrollbar+"-corner";
var _classNameScrollbarCornerResize=_classNameScrollbarCorner+"-resize";
var _classNameScrollbarCornerResizeB=_classNameScrollbarCornerResize+"-both";
var _classNameScrollbarCornerResizeH=_classNameScrollbarCornerResize+_strMinusHorizontal;
var _classNameScrollbarCornerResizeV=_classNameScrollbarCornerResize+_strMinusVertical;
var _classNameScrollbarHorizontal=_classNameScrollbar+_strMinusHorizontal;
var _classNameScrollbarVertical=_classNameScrollbar+_strMinusVertical;
var _classNameDragging=_cassNamesPrefix+"dragging";
var _classNameThemeNone=_cassNamesPrefix+"theme-none";
var _classNamesDynamicDestroy=[_classNameViewportNativeScrollbarsInvisible,_classNameViewportNativeScrollbarsOverlaid,_classNameScrollbarTrackOff,_classNameScrollbarHandleOff,_classNameScrollbarUnusable,_classNameScrollbarAutoHidden,_classNameScrollbarCornerResize,_classNameScrollbarCornerResizeB,_classNameScrollbarCornerResizeH,_classNameScrollbarCornerResizeV,_classNameDragging].join(_strSpace);
var _callbacksInitQeueue=[];
var _viewportAttrsFromTarget=[LEXICON.ti];
var _defaultOptions;
var _currentOptions;
var _currentPreparedOptions;
var _extensions={};
var _extensionsPrivateMethods="added removed on contract";
var _lastUpdateTime;
var _swallowedUpdateHints={};
var _swallowedUpdateTimeout;
var _swallowUpdateLag=42;
var _updateOnLoadEventName="load";
var _updateOnLoadElms=[];
var _windowElement;
var _documentElement;
var _htmlElement;
var _bodyElement;
var _targetElement;
var _hostElement;
var _sizeAutoObserverElement;
var _sizeObserverElement;
var _paddingElement;
var _viewportElement;
var _contentElement;
var _contentArrangeElement;
var _contentGlueElement;
var _textareaCoverElement;
var _scrollbarCornerElement;
var _scrollbarHorizontalElement;
var _scrollbarHorizontalTrackElement;
var _scrollbarHorizontalHandleElement;
var _scrollbarVerticalElement;
var _scrollbarVerticalTrackElement;
var _scrollbarVerticalHandleElement;
var _windowElementNative;
var _documentElementNative;
var _targetElementNative;
var _hostElementNative;
var _sizeAutoObserverElementNative;
var _sizeObserverElementNative;
var _paddingElementNative;
var _viewportElementNative;
var _contentElementNative;
var _hostSizeCache;
var _contentScrollSizeCache;
var _arrangeContentSizeCache;
var _hasOverflowCache;
var _hideOverflowCache;
var _widthAutoCache;
var _heightAutoCache;
var _cssBoxSizingCache;
var _cssPaddingCache;
var _cssBorderCache;
var _cssMarginCache;
var _cssDirectionCache;
var _cssDirectionDetectedCache;
var _paddingAbsoluteCache;
var _clipAlwaysCache;
var _contentGlueSizeCache;
var _overflowBehaviorCache;
var _overflowAmountCache;
var _ignoreOverlayScrollbarHidingCache;
var _autoUpdateCache;
var _sizeAutoCapableCache;
var _contentElementScrollSizeChangeDetectedCache;
var _hostElementSizeChangeDetectedCache;
var _scrollbarsVisibilityCache;
var _scrollbarsAutoHideCache;
var _scrollbarsClickScrollingCache;
var _scrollbarsDragScrollingCache;
var _resizeCache;
var _normalizeRTLCache;
var _classNameCache;
var _oldClassName;
var _textareaAutoWrappingCache;
var _textareaInfoCache;
var _textareaSizeCache;
var _textareaDynHeightCache;
var _textareaDynWidthCache;
var _bodyMinSizeCache;
var _updateAutoCache={};
var _mutationObserverHost;
var _mutationObserverContent;
var _mutationObserverHostCallback;
var _mutationObserverContentCallback;
var _mutationObserversConnected;
var _mutationObserverAttrsTextarea=["wrap","cols","rows"];
var _mutationObserverAttrsHost=[LEXICON.i,LEXICON.c,LEXICON.s,"open"].concat(_viewportAttrsFromTarget);
var _destroyEvents=[];
var _textareaHasFocus;
var _scrollbarsAutoHideTimeoutId;
var _scrollbarsAutoHideMoveTimeoutId;
var _scrollbarsAutoHideDelay;
var _scrollbarsAutoHideNever;
var _scrollbarsAutoHideScroll;
var _scrollbarsAutoHideMove;
var _scrollbarsAutoHideLeave;
var _scrollbarsHandleHovered;
var _scrollbarsHandlesDefineScrollPos;
var _resizeNone;
var _resizeBoth;
var _resizeHorizontal;
var _resizeVertical;
function setupResponsiveEventListener(element,eventNames,listener,remove,passiveOrOptions){var collected=COMPATIBILITY.isA(eventNames)&&COMPATIBILITY.isA(listener);
var method=remove?"removeEventListener":"addEventListener";
var onOff=remove?"off":"on";
var events=collected?false:eventNames.split(_strSpace);
var i=0;
var passiveOrOptionsIsObj=FRAMEWORK.isPlainObject(passiveOrOptions);
var passive=(_supportPassiveEvents&&(passiveOrOptionsIsObj?(passiveOrOptions._passive):passiveOrOptions))||false;
var capture=passiveOrOptionsIsObj&&(passiveOrOptions._capture||false);
var nativeParam=_supportPassiveEvents?{passive:passive,capture:capture}:capture;
if(collected){for(;
i<eventNames[LEXICON.l];
i++){setupResponsiveEventListener(element,eventNames[i],listener[i],remove,passiveOrOptions)
}}else{for(;
i<events[LEXICON.l];
i++){if(_supportPassiveEvents){element[0][method](events[i],listener,nativeParam)
}else{element[onOff](events[i],listener)
}}}}function addDestroyEventListener(element,eventNames,listener,passive){setupResponsiveEventListener(element,eventNames,listener,false,passive);
_destroyEvents.push(COMPATIBILITY.bind(setupResponsiveEventListener,0,element,eventNames,listener,true,passive))
}function setupResizeObserver(targetElement,onElementResizedCallback){if(targetElement){var resizeObserver=COMPATIBILITY.rO();
var strAnimationStartEvent="animationstart mozAnimationStart webkitAnimationStart MSAnimationStart";
var strChildNodes="childNodes";
var constScroll=3333333;
var callback=function(){targetElement[_strScrollTop](constScroll)[_strScrollLeft](_isRTL?_rtlScrollBehavior.n?-constScroll:_rtlScrollBehavior.i?0:constScroll:constScroll);
onElementResizedCallback()
};
if(onElementResizedCallback){if(_supportResizeObserver){var element=targetElement.addClass("observed").append(generateDiv(_classNameResizeObserverElement)).contents()[0];
var observer=element[_strResizeObserverProperty]=new resizeObserver(callback);
observer.observe(element)
}else{if(_msieVersion>9||!_autoUpdateRecommended){targetElement.prepend(generateDiv(_classNameResizeObserverElement,generateDiv({c:_classNameResizeObserverItemElement,dir:"ltr"},generateDiv(_classNameResizeObserverItemElement,generateDiv(_classNameResizeObserverItemFinalElement))+generateDiv(_classNameResizeObserverItemElement,generateDiv({c:_classNameResizeObserverItemFinalElement,style:"width: 200%; height: 200%"})))));
var observerElement=targetElement[0][strChildNodes][0][strChildNodes][0];
var shrinkElement=FRAMEWORK(observerElement[strChildNodes][1]);
var expandElement=FRAMEWORK(observerElement[strChildNodes][0]);
var expandElementChild=FRAMEWORK(expandElement[0][strChildNodes][0]);
var widthCache=observerElement[LEXICON.oW];
var heightCache=observerElement[LEXICON.oH];
var isDirty;
var rAFId;
var currWidth;
var currHeight;
var factor=2;
var nativeScrollbarSize=globals.nativeScrollbarSize;
var reset=function(){expandElement[_strScrollLeft](constScroll)[_strScrollTop](constScroll);
shrinkElement[_strScrollLeft](constScroll)[_strScrollTop](constScroll)
};
var onResized=function(){rAFId=0;
if(!isDirty){return
}widthCache=currWidth;
heightCache=currHeight;
callback()
};
var onScroll=function(event){currWidth=observerElement[LEXICON.oW];
currHeight=observerElement[LEXICON.oH];
isDirty=currWidth!=widthCache||currHeight!=heightCache;
if(event&&isDirty&&!rAFId){COMPATIBILITY.cAF()(rAFId);
rAFId=COMPATIBILITY.rAF()(onResized)
}else{if(!event){onResized()
}}reset();
if(event){COMPATIBILITY.prvD(event);
COMPATIBILITY.stpP(event)
}return false
};
var expandChildCSS={};
var observerElementCSS={};
setTopRightBottomLeft(observerElementCSS,_strEmpty,[-((nativeScrollbarSize.y+1)*factor),nativeScrollbarSize.x*-factor,nativeScrollbarSize.y*-factor,-((nativeScrollbarSize.x+1)*factor)]);
FRAMEWORK(observerElement).css(observerElementCSS);
expandElement.on(_strScroll,onScroll);
shrinkElement.on(_strScroll,onScroll);
targetElement.on(strAnimationStartEvent,function(){onScroll(false)
});
expandChildCSS[_strWidth]=constScroll;
expandChildCSS[_strHeight]=constScroll;
expandElementChild.css(expandChildCSS);
reset()
}else{var attachEvent=_documentElementNative.attachEvent;
var isIE=_msieVersion!==undefined;
if(attachEvent){targetElement.prepend(generateDiv(_classNameResizeObserverElement));
findFirst(targetElement,_strDot+_classNameResizeObserverElement)[0].attachEvent("onresize",callback)
}else{var obj=_documentElementNative.createElement(TYPES.o);
obj.setAttribute(LEXICON.ti,"-1");
obj.setAttribute(LEXICON.c,_classNameResizeObserverElement);
obj.onload=function(){var wnd=this.contentDocument.defaultView;
wnd.addEventListener("resize",callback);
wnd.document.documentElement.style.display="none"
};
obj.type="text/html";
if(isIE){targetElement.prepend(obj)
}obj.data="about:blank";
if(!isIE){targetElement.prepend(obj)
}targetElement.on(strAnimationStartEvent,callback)
}}}if(targetElement[0]===_sizeObserverElementNative){var directionChanged=function(){var dir=_hostElement.css("direction");
var css={};
var scrollLeftValue=0;
var result=false;
if(dir!==_cssDirectionDetectedCache){if(dir==="ltr"){css[_strLeft]=0;
css[_strRight]=_strAuto;
scrollLeftValue=constScroll
}else{css[_strLeft]=_strAuto;
css[_strRight]=0;
scrollLeftValue=_rtlScrollBehavior.n?-constScroll:_rtlScrollBehavior.i?0:constScroll
}_sizeObserverElement.children().eq(0).css(css);
_sizeObserverElement[_strScrollLeft](scrollLeftValue)[_strScrollTop](constScroll);
_cssDirectionDetectedCache=dir;
result=true
}return result
};
directionChanged();
addDestroyEventListener(targetElement,_strScroll,function(event){if(directionChanged()){update()
}COMPATIBILITY.prvD(event);
COMPATIBILITY.stpP(event);
return false
})
}}else{if(_supportResizeObserver){var element=targetElement.contents()[0];
var resizeObserverObj=element[_strResizeObserverProperty];
if(resizeObserverObj){resizeObserverObj.disconnect();
delete element[_strResizeObserverProperty]
}}else{remove(targetElement.children(_strDot+_classNameResizeObserverElement).eq(0))
}}}}function createMutationObservers(){if(_supportMutationObserver){var mutationObserverContentLag=11;
var mutationObserver=COMPATIBILITY.mO();
var contentLastUpdate=COMPATIBILITY.now();
var mutationTarget;
var mutationAttrName;
var mutationIsClass;
var oldMutationVal;
var newClassVal;
var hostClassNameRegex;
var contentTimeout;
var now;
var sizeAuto;
var action;
_mutationObserverHostCallback=function(mutations){var doUpdate=false;
var doUpdateForce=false;
var mutation;
var mutatedAttrs=[];
if(_initialized&&!_sleeping){each(mutations,function(){mutation=this;
mutationTarget=mutation.target;
mutationAttrName=mutation.attributeName;
mutationIsClass=mutationAttrName===LEXICON.c;
oldMutationVal=mutation.oldValue;
newClassVal=mutationTarget.className;
if(_domExists&&mutationIsClass&&!doUpdateForce){if(oldMutationVal.indexOf(_classNameHostElementForeign)>-1&&newClassVal.indexOf(_classNameHostElementForeign)<0){hostClassNameRegex=createHostClassNameRegExp(true);
_hostElementNative.className=newClassVal.split(_strSpace).concat(oldMutationVal.split(_strSpace).filter(function(name){return name.match(hostClassNameRegex)
})).join(_strSpace);
doUpdate=doUpdateForce=true
}}if(!doUpdate){doUpdate=mutationIsClass?hostClassNamesChanged(oldMutationVal,newClassVal):mutationAttrName===LEXICON.s?oldMutationVal!==mutationTarget[LEXICON.s].cssText:true
}mutatedAttrs.push(mutationAttrName)
});
updateViewportAttrsFromTarget(mutatedAttrs);
if(doUpdate){_base.update(doUpdateForce||_strAuto)
}}return doUpdate
};
_mutationObserverContentCallback=function(mutations){var doUpdate=false;
var mutation;
if(_initialized&&!_sleeping){each(mutations,function(){mutation=this;
doUpdate=isUnknownMutation(mutation);
return !doUpdate
});
if(doUpdate){now=COMPATIBILITY.now();
sizeAuto=(_heightAutoCache||_widthAutoCache);
action=function(){if(!_destroyed){contentLastUpdate=now;
if(_isTextarea){textareaUpdate()
}if(sizeAuto){update()
}else{_base.update(_strAuto)
}}};
clearTimeout(contentTimeout);
if(mutationObserverContentLag<=0||now-contentLastUpdate>mutationObserverContentLag||!sizeAuto){action()
}else{contentTimeout=setTimeout(action,mutationObserverContentLag)
}}}return doUpdate
};
_mutationObserverHost=new mutationObserver(_mutationObserverHostCallback);
_mutationObserverContent=new mutationObserver(_mutationObserverContentCallback)
}}function connectMutationObservers(){if(_supportMutationObserver&&!_mutationObserversConnected){_mutationObserverHost.observe(_hostElementNative,{attributes:true,attributeOldValue:true,attributeFilter:_mutationObserverAttrsHost});
_mutationObserverContent.observe(_isTextarea?_targetElementNative:_contentElementNative,{attributes:true,attributeOldValue:true,subtree:!_isTextarea,childList:!_isTextarea,characterData:!_isTextarea,attributeFilter:_isTextarea?_mutationObserverAttrsTextarea:_mutationObserverAttrsHost});
_mutationObserversConnected=true
}}function disconnectMutationObservers(){if(_supportMutationObserver&&_mutationObserversConnected){_mutationObserverHost.disconnect();
_mutationObserverContent.disconnect();
_mutationObserversConnected=false
}}function hostOnResized(){if(!_sleeping){var changed;
var hostSize={w:_sizeObserverElementNative[LEXICON.sW],h:_sizeObserverElementNative[LEXICON.sH]};
changed=checkCache(hostSize,_hostElementSizeChangeDetectedCache);
_hostElementSizeChangeDetectedCache=hostSize;
if(changed){update({_hostSizeChanged:true})
}}}function hostOnMouseEnter(){if(_scrollbarsAutoHideLeave){refreshScrollbarsAutoHide(true)
}}function hostOnMouseLeave(){if(_scrollbarsAutoHideLeave&&!_bodyElement.hasClass(_classNameDragging)){refreshScrollbarsAutoHide(false)
}}function hostOnMouseMove(){if(_scrollbarsAutoHideMove){refreshScrollbarsAutoHide(true);
clearTimeout(_scrollbarsAutoHideMoveTimeoutId);
_scrollbarsAutoHideMoveTimeoutId=setTimeout(function(){if(_scrollbarsAutoHideMove&&!_destroyed){refreshScrollbarsAutoHide(false)
}},100)
}}function documentOnSelectStart(event){COMPATIBILITY.prvD(event);
return false
}function updateOnLoadCallback(event){if(!_destroyed){var target=event.target;
var elm=FRAMEWORK(event.target);
var index=FRAMEWORK.inArray(target,_updateOnLoadElms);
if(index>-1){_updateOnLoadElms.splice(index,1)
}eachUpdateOnLoad(function(i,updateOnLoadSelector){if(elm.is(updateOnLoadSelector)){update({_contentSizeChanged:true})
}})
}}function setupHostMouseTouchEvents(destroy){if(!destroy){setupHostMouseTouchEvents(true)
}setupResponsiveEventListener(_hostElement,_strMouseTouchMoveEvent.split(_strSpace)[0],hostOnMouseMove,(!_scrollbarsAutoHideMove||destroy),true);
setupResponsiveEventListener(_hostElement,[_strMouseEnter,_strMouseLeave],[hostOnMouseEnter,hostOnMouseLeave],(!_scrollbarsAutoHideLeave||destroy),true);
if(!_initialized&&!destroy){_hostElement.one("mouseover",hostOnMouseEnter)
}}function bodyMinSizeChanged(){var bodyMinSize={};
if(_isBody&&_contentArrangeElement){bodyMinSize.w=parseToZeroOrNumber(_contentArrangeElement.css(_strMinMinus+_strWidth));
bodyMinSize.h=parseToZeroOrNumber(_contentArrangeElement.css(_strMinMinus+_strHeight));
bodyMinSize.c=checkCache(bodyMinSize,_bodyMinSizeCache);
bodyMinSize.f=true
}_bodyMinSizeCache=bodyMinSize;
return !!bodyMinSize.c
}function hostClassNamesChanged(oldClassNames,newClassNames){var currClasses=typeof newClassNames==TYPES.s?newClassNames.split(_strSpace):[];
var oldClasses=typeof oldClassNames==TYPES.s?oldClassNames.split(_strSpace):[];
var diff=getArrayDifferences(oldClasses,currClasses);
var idx=inArray(_classNameThemeNone,diff);
var i;
var regex;
if(idx>-1){diff.splice(idx,1)
}if(diff[LEXICON.l]>0){regex=createHostClassNameRegExp(true,true);
for(i=0;
i<diff.length;
i++){if(!diff[i].match(regex)){return true
}}}return false
}function isUnknownMutation(mutation){var attributeName=mutation.attributeName;
var mutationTarget=mutation.target;
var mutationType=mutation.type;
var strClosest="closest";
if(mutationTarget===_contentElementNative){return attributeName===null
}if(mutationType==="attributes"&&(attributeName===LEXICON.c||attributeName===LEXICON.s)&&!_isTextarea){if(attributeName===LEXICON.c&&FRAMEWORK(mutationTarget).hasClass(_classNameHostElement)){return hostClassNamesChanged(mutation.oldValue,mutationTarget.className)
}if(typeof mutationTarget[strClosest]!=TYPES.f){return true
}if(mutationTarget[strClosest](_strDot+_classNameResizeObserverElement)!==null||mutationTarget[strClosest](_strDot+_classNameScrollbar)!==null||mutationTarget[strClosest](_strDot+_classNameScrollbarCorner)!==null){return false
}}return true
}function updateAutoContentSizeChanged(){if(_sleeping){return false
}var contentMeasureElement=getContentMeasureElement();
var textareaValueLength=_isTextarea&&_widthAutoCache&&!_textareaAutoWrappingCache?_targetElement.val().length:0;
var setCSS=!_mutationObserversConnected&&_widthAutoCache&&!_isTextarea;
var css={};
var float;
var bodyMinSizeC;
var changed;
var contentElementScrollSize;
if(setCSS){float=_contentElement.css(_strFloat);
css[_strFloat]=_isRTL?_strRight:_strLeft;
css[_strWidth]=_strAuto;
_contentElement.css(css)
}contentElementScrollSize={w:contentMeasureElement[LEXICON.sW]+textareaValueLength,h:contentMeasureElement[LEXICON.sH]+textareaValueLength};
if(setCSS){css[_strFloat]=float;
css[_strWidth]=_strHundredPercent;
_contentElement.css(css)
}bodyMinSizeC=bodyMinSizeChanged();
changed=checkCache(contentElementScrollSize,_contentElementScrollSizeChangeDetectedCache);
_contentElementScrollSizeChangeDetectedCache=contentElementScrollSize;
return changed||bodyMinSizeC
}function meaningfulAttrsChanged(){if(_sleeping||_mutationObserversConnected){return
}var elem;
var curr;
var cache;
var changedAttrs=[];
var checks=[{_elem:_hostElement,_attrs:_mutationObserverAttrsHost.concat(":visible")},{_elem:_isTextarea?_targetElement:undefined,_attrs:_mutationObserverAttrsTextarea}];
each(checks,function(index,check){elem=check._elem;
if(elem){each(check._attrs,function(index,attr){curr=attr.charAt(0)===":"?elem.is(attr):elem.attr(attr);
cache=_updateAutoCache[attr];
if(checkCache(curr,cache)){changedAttrs.push(attr)
}_updateAutoCache[attr]=curr
})
}});
updateViewportAttrsFromTarget(changedAttrs);
return changedAttrs[LEXICON.l]>0
}function isSizeAffectingCSSProperty(propertyName){if(!_initialized){return true
}var flexGrow="flex-grow";
var flexShrink="flex-shrink";
var flexBasis="flex-basis";
var affectingPropsX=[_strWidth,_strMinMinus+_strWidth,_strMaxMinus+_strWidth,_strMarginMinus+_strLeft,_strMarginMinus+_strRight,_strLeft,_strRight,"font-weight","word-spacing",flexGrow,flexShrink,flexBasis];
var affectingPropsXContentBox=[_strPaddingMinus+_strLeft,_strPaddingMinus+_strRight,_strBorderMinus+_strLeft+_strWidth,_strBorderMinus+_strRight+_strWidth];
var affectingPropsY=[_strHeight,_strMinMinus+_strHeight,_strMaxMinus+_strHeight,_strMarginMinus+_strTop,_strMarginMinus+_strBottom,_strTop,_strBottom,"line-height",flexGrow,flexShrink,flexBasis];
var affectingPropsYContentBox=[_strPaddingMinus+_strTop,_strPaddingMinus+_strBottom,_strBorderMinus+_strTop+_strWidth,_strBorderMinus+_strBottom+_strWidth];
var _strS="s";
var _strVS="v-s";
var checkX=_overflowBehaviorCache.x===_strS||_overflowBehaviorCache.x===_strVS;
var checkY=_overflowBehaviorCache.y===_strS||_overflowBehaviorCache.y===_strVS;
var sizeIsAffected=false;
var checkPropertyName=function(arr,name){for(var i=0;
i<arr[LEXICON.l];
i++){if(arr[i]===name){return true
}}return false
};
if(checkY){sizeIsAffected=checkPropertyName(affectingPropsY,propertyName);
if(!sizeIsAffected&&!_isBorderBox){sizeIsAffected=checkPropertyName(affectingPropsYContentBox,propertyName)
}}if(checkX&&!sizeIsAffected){sizeIsAffected=checkPropertyName(affectingPropsX,propertyName);
if(!sizeIsAffected&&!_isBorderBox){sizeIsAffected=checkPropertyName(affectingPropsXContentBox,propertyName)
}}return sizeIsAffected
}function updateViewportAttrsFromTarget(attrs){attrs=attrs||_viewportAttrsFromTarget;
each(attrs,function(index,attr){if(COMPATIBILITY.inA(attr,_viewportAttrsFromTarget)>-1){var targetAttr=_targetElement.attr(attr);
if(type(targetAttr)==TYPES.s){_viewportElement.attr(attr,targetAttr)
}else{_viewportElement.removeAttr(attr)
}}})
}function textareaUpdate(){if(!_sleeping){var wrapAttrOff=!_textareaAutoWrappingCache;
var minWidth=_viewportSize.w;
var minHeight=_viewportSize.h;
var css={};
var doMeasure=_widthAutoCache||wrapAttrOff;
var origWidth;
var width;
var origHeight;
var height;
css[_strMinMinus+_strWidth]=_strEmpty;
css[_strMinMinus+_strHeight]=_strEmpty;
css[_strWidth]=_strAuto;
_targetElement.css(css);
origWidth=_targetElementNative[LEXICON.oW];
width=doMeasure?MATH.max(origWidth,_targetElementNative[LEXICON.sW]-1):1;
css[_strWidth]=_widthAutoCache?_strAuto:_strHundredPercent;
css[_strMinMinus+_strWidth]=_strHundredPercent;
css[_strHeight]=_strAuto;
_targetElement.css(css);
origHeight=_targetElementNative[LEXICON.oH];
height=MATH.max(origHeight,_targetElementNative[LEXICON.sH]-1);
css[_strWidth]=width;
css[_strHeight]=height;
_textareaCoverElement.css(css);
css[_strMinMinus+_strWidth]=minWidth;
css[_strMinMinus+_strHeight]=minHeight;
_targetElement.css(css);
return{_originalWidth:origWidth,_originalHeight:origHeight,_dynamicWidth:width,_dynamicHeight:height}
}}function update(updateHints){clearTimeout(_swallowedUpdateTimeout);
updateHints=updateHints||{};
_swallowedUpdateHints._hostSizeChanged|=updateHints._hostSizeChanged;
_swallowedUpdateHints._contentSizeChanged|=updateHints._contentSizeChanged;
_swallowedUpdateHints._force|=updateHints._force;
var now=COMPATIBILITY.now();
var hostSizeChanged=!!_swallowedUpdateHints._hostSizeChanged;
var contentSizeChanged=!!_swallowedUpdateHints._contentSizeChanged;
var force=!!_swallowedUpdateHints._force;
var changedOptions=updateHints._changedOptions;
var swallow=_swallowUpdateLag>0&&_initialized&&!_destroyed&&!force&&!changedOptions&&(now-_lastUpdateTime)<_swallowUpdateLag&&(!_heightAutoCache&&!_widthAutoCache);
var displayIsHidden;
if(swallow){_swallowedUpdateTimeout=setTimeout(update,_swallowUpdateLag)
}if(_destroyed||swallow||(_sleeping&&!changedOptions)||(_initialized&&!force&&(displayIsHidden=_hostElement.is(":hidden")))||_hostElement.css("display")==="inline"){return
}_lastUpdateTime=now;
_swallowedUpdateHints={};
if(_nativeScrollbarStyling&&!(_nativeScrollbarIsOverlaid.x&&_nativeScrollbarIsOverlaid.y)){_nativeScrollbarSize.x=0;
_nativeScrollbarSize.y=0
}else{_nativeScrollbarSize=extendDeep({},globals.nativeScrollbarSize)
}_nativeScrollbarMinSize={x:(_nativeScrollbarSize.x+(_nativeScrollbarIsOverlaid.x?0:3))*3,y:(_nativeScrollbarSize.y+(_nativeScrollbarIsOverlaid.y?0:3))*3};
changedOptions=changedOptions||{};
var checkCacheAutoForce=function(){return checkCache.apply(this,[].slice.call(arguments).concat([force]))
};
var currScroll={x:_viewportElement[_strScrollLeft](),y:_viewportElement[_strScrollTop]()};
var currentPreparedOptionsScrollbars=_currentPreparedOptions.scrollbars;
var currentPreparedOptionsTextarea=_currentPreparedOptions.textarea;
var scrollbarsVisibility=currentPreparedOptionsScrollbars.visibility;
var scrollbarsVisibilityChanged=checkCacheAutoForce(scrollbarsVisibility,_scrollbarsVisibilityCache);
var scrollbarsAutoHide=currentPreparedOptionsScrollbars.autoHide;
var scrollbarsAutoHideChanged=checkCacheAutoForce(scrollbarsAutoHide,_scrollbarsAutoHideCache);
var scrollbarsClickScrolling=currentPreparedOptionsScrollbars.clickScrolling;
var scrollbarsClickScrollingChanged=checkCacheAutoForce(scrollbarsClickScrolling,_scrollbarsClickScrollingCache);
var scrollbarsDragScrolling=currentPreparedOptionsScrollbars.dragScrolling;
var scrollbarsDragScrollingChanged=checkCacheAutoForce(scrollbarsDragScrolling,_scrollbarsDragScrollingCache);
var className=_currentPreparedOptions.className;
var classNameChanged=checkCacheAutoForce(className,_classNameCache);
var resize=_currentPreparedOptions.resize;
var resizeChanged=checkCacheAutoForce(resize,_resizeCache)&&!_isBody;
var paddingAbsolute=_currentPreparedOptions.paddingAbsolute;
var paddingAbsoluteChanged=checkCacheAutoForce(paddingAbsolute,_paddingAbsoluteCache);
var clipAlways=_currentPreparedOptions.clipAlways;
var clipAlwaysChanged=checkCacheAutoForce(clipAlways,_clipAlwaysCache);
var sizeAutoCapable=_currentPreparedOptions.sizeAutoCapable&&!_isBody;
var sizeAutoCapableChanged=checkCacheAutoForce(sizeAutoCapable,_sizeAutoCapableCache);
var ignoreOverlayScrollbarHiding=_currentPreparedOptions.nativeScrollbarsOverlaid.showNativeScrollbars;
var ignoreOverlayScrollbarHidingChanged=checkCacheAutoForce(ignoreOverlayScrollbarHiding,_ignoreOverlayScrollbarHidingCache);
var autoUpdate=_currentPreparedOptions.autoUpdate;
var autoUpdateChanged=checkCacheAutoForce(autoUpdate,_autoUpdateCache);
var overflowBehavior=_currentPreparedOptions.overflowBehavior;
var overflowBehaviorChanged=checkCacheAutoForce(overflowBehavior,_overflowBehaviorCache,force);
var textareaDynWidth=currentPreparedOptionsTextarea.dynWidth;
var textareaDynWidthChanged=checkCacheAutoForce(_textareaDynWidthCache,textareaDynWidth);
var textareaDynHeight=currentPreparedOptionsTextarea.dynHeight;
var textareaDynHeightChanged=checkCacheAutoForce(_textareaDynHeightCache,textareaDynHeight);
_scrollbarsAutoHideNever=scrollbarsAutoHide==="n";
_scrollbarsAutoHideScroll=scrollbarsAutoHide==="s";
_scrollbarsAutoHideMove=scrollbarsAutoHide==="m";
_scrollbarsAutoHideLeave=scrollbarsAutoHide==="l";
_scrollbarsAutoHideDelay=currentPreparedOptionsScrollbars.autoHideDelay;
_oldClassName=_classNameCache;
_resizeNone=resize==="n";
_resizeBoth=resize==="b";
_resizeHorizontal=resize==="h";
_resizeVertical=resize==="v";
_normalizeRTLCache=_currentPreparedOptions.normalizeRTL;
ignoreOverlayScrollbarHiding=ignoreOverlayScrollbarHiding&&(_nativeScrollbarIsOverlaid.x&&_nativeScrollbarIsOverlaid.y);
_scrollbarsVisibilityCache=scrollbarsVisibility;
_scrollbarsAutoHideCache=scrollbarsAutoHide;
_scrollbarsClickScrollingCache=scrollbarsClickScrolling;
_scrollbarsDragScrollingCache=scrollbarsDragScrolling;
_classNameCache=className;
_resizeCache=resize;
_paddingAbsoluteCache=paddingAbsolute;
_clipAlwaysCache=clipAlways;
_sizeAutoCapableCache=sizeAutoCapable;
_ignoreOverlayScrollbarHidingCache=ignoreOverlayScrollbarHiding;
_autoUpdateCache=autoUpdate;
_overflowBehaviorCache=extendDeep({},overflowBehavior);
_textareaDynWidthCache=textareaDynWidth;
_textareaDynHeightCache=textareaDynHeight;
_hasOverflowCache=_hasOverflowCache||{x:false,y:false};
if(classNameChanged){removeClass(_hostElement,_oldClassName+_strSpace+_classNameThemeNone);
addClass(_hostElement,className!==undefined&&className!==null&&className.length>0?className:_classNameThemeNone)
}if(autoUpdateChanged){if(autoUpdate===true||(autoUpdate===null&&_autoUpdateRecommended)){disconnectMutationObservers();
autoUpdateLoop.add(_base)
}else{autoUpdateLoop.remove(_base);
connectMutationObservers()
}}if(sizeAutoCapableChanged){if(sizeAutoCapable){if(_contentGlueElement){_contentGlueElement.show()
}else{_contentGlueElement=FRAMEWORK(generateDiv(_classNameContentGlueElement));
_paddingElement.before(_contentGlueElement)
}if(_sizeAutoObserverAdded){_sizeAutoObserverElement.show()
}else{_sizeAutoObserverElement=FRAMEWORK(generateDiv(_classNameSizeAutoObserverElement));
_sizeAutoObserverElementNative=_sizeAutoObserverElement[0];
_contentGlueElement.before(_sizeAutoObserverElement);
var oldSize={w:-1,h:-1};
setupResizeObserver(_sizeAutoObserverElement,function(){var newSize={w:_sizeAutoObserverElementNative[LEXICON.oW],h:_sizeAutoObserverElementNative[LEXICON.oH]};
if(checkCache(newSize,oldSize)){if(_initialized&&(_heightAutoCache&&newSize.h>0)||(_widthAutoCache&&newSize.w>0)){update()
}else{if(_initialized&&(!_heightAutoCache&&newSize.h===0)||(!_widthAutoCache&&newSize.w===0)){update()
}}}oldSize=newSize
});
_sizeAutoObserverAdded=true;
if(_cssCalc!==null){_sizeAutoObserverElement.css(_strHeight,_cssCalc+"(100% + 1px)")
}}}else{if(_sizeAutoObserverAdded){_sizeAutoObserverElement.hide()
}if(_contentGlueElement){_contentGlueElement.hide()
}}}if(force){_sizeObserverElement.find("*").trigger(_strScroll);
if(_sizeAutoObserverAdded){_sizeAutoObserverElement.find("*").trigger(_strScroll)
}}displayIsHidden=displayIsHidden===undefined?_hostElement.is(":hidden"):displayIsHidden;
var textareaAutoWrapping=_isTextarea?_targetElement.attr("wrap")!=="off":false;
var textareaAutoWrappingChanged=checkCacheAutoForce(textareaAutoWrapping,_textareaAutoWrappingCache);
var cssDirection=_hostElement.css("direction");
var cssDirectionChanged=checkCacheAutoForce(cssDirection,_cssDirectionCache);
var boxSizing=_hostElement.css("box-sizing");
var boxSizingChanged=checkCacheAutoForce(boxSizing,_cssBoxSizingCache);
var padding=getTopRightBottomLeftHost(_strPaddingMinus);
var sizeAutoObserverElementBCRect;
try{sizeAutoObserverElementBCRect=_sizeAutoObserverAdded?_sizeAutoObserverElementNative[LEXICON.bCR]():null
}catch(ex){return
}_isRTL=cssDirection==="rtl";
_isBorderBox=(boxSizing==="border-box");
var isRTLLeft=_isRTL?_strLeft:_strRight;
var isRTLRight=_isRTL?_strRight:_strLeft;
var widthAutoResizeDetection=false;
var widthAutoObserverDetection=(_sizeAutoObserverAdded&&(_hostElement.css(_strFloat)!=="none"))?(MATH.round(sizeAutoObserverElementBCRect.right-sizeAutoObserverElementBCRect.left)===0)&&(!paddingAbsolute?(_hostElementNative[LEXICON.cW]-_paddingX)>0:true):false;
if(sizeAutoCapable&&!widthAutoObserverDetection){var tmpCurrHostWidth=_hostElementNative[LEXICON.oW];
var tmpCurrContentGlueWidth=_contentGlueElement.css(_strWidth);
_contentGlueElement.css(_strWidth,_strAuto);
var tmpNewHostWidth=_hostElementNative[LEXICON.oW];
_contentGlueElement.css(_strWidth,tmpCurrContentGlueWidth);
widthAutoResizeDetection=tmpCurrHostWidth!==tmpNewHostWidth;
if(!widthAutoResizeDetection){_contentGlueElement.css(_strWidth,tmpCurrHostWidth+1);
tmpNewHostWidth=_hostElementNative[LEXICON.oW];
_contentGlueElement.css(_strWidth,tmpCurrContentGlueWidth);
widthAutoResizeDetection=tmpCurrHostWidth!==tmpNewHostWidth
}}var widthAuto=(widthAutoObserverDetection||widthAutoResizeDetection)&&sizeAutoCapable&&!displayIsHidden;
var widthAutoChanged=checkCacheAutoForce(widthAuto,_widthAutoCache);
var wasWidthAuto=!widthAuto&&_widthAutoCache;
var heightAuto=_sizeAutoObserverAdded&&sizeAutoCapable&&!displayIsHidden?(MATH.round(sizeAutoObserverElementBCRect.bottom-sizeAutoObserverElementBCRect.top)===0):false;
var heightAutoChanged=checkCacheAutoForce(heightAuto,_heightAutoCache);
var wasHeightAuto=!heightAuto&&_heightAutoCache;
var updateBorderX=(widthAuto&&_isBorderBox)||!_isBorderBox;
var updateBorderY=(heightAuto&&_isBorderBox)||!_isBorderBox;
var border=getTopRightBottomLeftHost(_strBorderMinus,"-"+_strWidth,!updateBorderX,!updateBorderY);
var margin=getTopRightBottomLeftHost(_strMarginMinus);
var contentElementCSS={};
var contentGlueElementCSS={};
var getHostSize=function(){return{w:_hostElementNative[LEXICON.cW],h:_hostElementNative[LEXICON.cH]}
};
var getViewportSize=function(){return{w:_paddingElementNative[LEXICON.oW]+MATH.max(0,_contentElementNative[LEXICON.cW]-_contentElementNative[LEXICON.sW]),h:_paddingElementNative[LEXICON.oH]+MATH.max(0,_contentElementNative[LEXICON.cH]-_contentElementNative[LEXICON.sH])}
};
var paddingAbsoluteX=_paddingX=padding.l+padding.r;
var paddingAbsoluteY=_paddingY=padding.t+padding.b;
paddingAbsoluteX*=paddingAbsolute?1:0;
paddingAbsoluteY*=paddingAbsolute?1:0;
padding.c=checkCacheAutoForce(padding,_cssPaddingCache);
_borderX=border.l+border.r;
_borderY=border.t+border.b;
border.c=checkCacheAutoForce(border,_cssBorderCache);
_marginX=margin.l+margin.r;
_marginY=margin.t+margin.b;
margin.c=checkCacheAutoForce(margin,_cssMarginCache);
_textareaAutoWrappingCache=textareaAutoWrapping;
_cssDirectionCache=cssDirection;
_cssBoxSizingCache=boxSizing;
_widthAutoCache=widthAuto;
_heightAutoCache=heightAuto;
_cssPaddingCache=padding;
_cssBorderCache=border;
_cssMarginCache=margin;
if(cssDirectionChanged&&_sizeAutoObserverAdded){_sizeAutoObserverElement.css(_strFloat,isRTLRight)
}if(padding.c||cssDirectionChanged||paddingAbsoluteChanged||widthAutoChanged||heightAutoChanged||boxSizingChanged||sizeAutoCapableChanged){var paddingElementCSS={};
var textareaCSS={};
var paddingValues=[padding.t,padding.r,padding.b,padding.l];
setTopRightBottomLeft(contentGlueElementCSS,_strMarginMinus,[-padding.t,-padding.r,-padding.b,-padding.l]);
if(paddingAbsolute){setTopRightBottomLeft(paddingElementCSS,_strEmpty,paddingValues);
setTopRightBottomLeft(_isTextarea?textareaCSS:contentElementCSS,_strPaddingMinus)
}else{setTopRightBottomLeft(paddingElementCSS,_strEmpty);
setTopRightBottomLeft(_isTextarea?textareaCSS:contentElementCSS,_strPaddingMinus,paddingValues)
}_paddingElement.css(paddingElementCSS);
_targetElement.css(textareaCSS)
}_viewportSize=getViewportSize();
var textareaSize=_isTextarea?textareaUpdate():false;
var textareaSizeChanged=_isTextarea&&checkCacheAutoForce(textareaSize,_textareaSizeCache);
var textareaDynOrigSize=_isTextarea&&textareaSize?{w:textareaDynWidth?textareaSize._dynamicWidth:textareaSize._originalWidth,h:textareaDynHeight?textareaSize._dynamicHeight:textareaSize._originalHeight}:{};
_textareaSizeCache=textareaSize;
if(heightAuto&&(heightAutoChanged||paddingAbsoluteChanged||boxSizingChanged||padding.c||border.c)){contentElementCSS[_strHeight]=_strAuto
}else{if(heightAutoChanged||paddingAbsoluteChanged){contentElementCSS[_strHeight]=_strHundredPercent
}}if(widthAuto&&(widthAutoChanged||paddingAbsoluteChanged||boxSizingChanged||padding.c||border.c||cssDirectionChanged)){contentElementCSS[_strWidth]=_strAuto;
contentGlueElementCSS[_strMaxMinus+_strWidth]=_strHundredPercent
}else{if(widthAutoChanged||paddingAbsoluteChanged){contentElementCSS[_strWidth]=_strHundredPercent;
contentElementCSS[_strFloat]=_strEmpty;
contentGlueElementCSS[_strMaxMinus+_strWidth]=_strEmpty
}}if(widthAuto){contentGlueElementCSS[_strWidth]=_strAuto;
contentElementCSS[_strWidth]=VENDORS._cssPropertyValue(_strWidth,"max-content intrinsic")||_strAuto;
contentElementCSS[_strFloat]=isRTLRight
}else{contentGlueElementCSS[_strWidth]=_strEmpty
}if(heightAuto){contentGlueElementCSS[_strHeight]=textareaDynOrigSize.h||_contentElementNative[LEXICON.cH]
}else{contentGlueElementCSS[_strHeight]=_strEmpty
}if(sizeAutoCapable){_contentGlueElement.css(contentGlueElementCSS)
}_contentElement.css(contentElementCSS);
contentElementCSS={};
contentGlueElementCSS={};
if(hostSizeChanged||contentSizeChanged||textareaSizeChanged||cssDirectionChanged||boxSizingChanged||paddingAbsoluteChanged||widthAutoChanged||widthAuto||heightAutoChanged||heightAuto||ignoreOverlayScrollbarHidingChanged||overflowBehaviorChanged||clipAlwaysChanged||resizeChanged||scrollbarsVisibilityChanged||scrollbarsAutoHideChanged||scrollbarsDragScrollingChanged||scrollbarsClickScrollingChanged||textareaDynWidthChanged||textareaDynHeightChanged||textareaAutoWrappingChanged){var strOverflow="overflow";
var strOverflowX=strOverflow+"-x";
var strOverflowY=strOverflow+"-y";
var strHidden="hidden";
var strVisible="visible";
if(!_nativeScrollbarStyling){var viewportElementResetCSS={};
var resetXTmp=_hasOverflowCache.y&&_hideOverflowCache.ys&&!ignoreOverlayScrollbarHiding?(_nativeScrollbarIsOverlaid.y?_viewportElement.css(isRTLLeft):-_nativeScrollbarSize.y):0;
var resetBottomTmp=_hasOverflowCache.x&&_hideOverflowCache.xs&&!ignoreOverlayScrollbarHiding?(_nativeScrollbarIsOverlaid.x?_viewportElement.css(_strBottom):-_nativeScrollbarSize.x):0;
setTopRightBottomLeft(viewportElementResetCSS,_strEmpty);
_viewportElement.css(viewportElementResetCSS)
}var contentMeasureElement=getContentMeasureElement();
var contentSize={w:textareaDynOrigSize.w||contentMeasureElement[LEXICON.cW],h:textareaDynOrigSize.h||contentMeasureElement[LEXICON.cH]};
var scrollSize={w:contentMeasureElement[LEXICON.sW],h:contentMeasureElement[LEXICON.sH]};
if(!_nativeScrollbarStyling){viewportElementResetCSS[_strBottom]=wasHeightAuto?_strEmpty:resetBottomTmp;
viewportElementResetCSS[isRTLLeft]=wasWidthAuto?_strEmpty:resetXTmp;
_viewportElement.css(viewportElementResetCSS)
}_viewportSize=getViewportSize();
var hostSize=getHostSize();
var hostAbsoluteRectSize={w:hostSize.w-_marginX-_borderX-(_isBorderBox?0:_paddingX),h:hostSize.h-_marginY-_borderY-(_isBorderBox?0:_paddingY)};
var contentGlueSize={w:MATH.max((widthAuto?contentSize.w:scrollSize.w)+paddingAbsoluteX,hostAbsoluteRectSize.w),h:MATH.max((heightAuto?contentSize.h:scrollSize.h)+paddingAbsoluteY,hostAbsoluteRectSize.h)};
contentGlueSize.c=checkCacheAutoForce(contentGlueSize,_contentGlueSizeCache);
_contentGlueSizeCache=contentGlueSize;
if(sizeAutoCapable){if(contentGlueSize.c||(heightAuto||widthAuto)){contentGlueElementCSS[_strWidth]=contentGlueSize.w;
contentGlueElementCSS[_strHeight]=contentGlueSize.h;
if(!_isTextarea){contentSize={w:contentMeasureElement[LEXICON.cW],h:contentMeasureElement[LEXICON.cH]}
}}var textareaCoverCSS={};
var setContentGlueElementCSSfunction=function(horizontal){var scrollbarVars=getScrollbarVars(horizontal);
var wh=scrollbarVars._w_h;
var strWH=scrollbarVars._width_height;
var autoSize=horizontal?widthAuto:heightAuto;
var borderSize=horizontal?_borderX:_borderY;
var paddingSize=horizontal?_paddingX:_paddingY;
var marginSize=horizontal?_marginX:_marginY;
var viewportSize=_viewportSize[wh]-borderSize-marginSize-(_isBorderBox?0:paddingSize);
if(!autoSize||(!autoSize&&border.c)){contentGlueElementCSS[strWH]=hostAbsoluteRectSize[wh]-1
}if(autoSize&&(contentSize[wh]<viewportSize)&&(horizontal&&_isTextarea?!textareaAutoWrapping:true)){if(_isTextarea){textareaCoverCSS[strWH]=parseToZeroOrNumber(_textareaCoverElement.css(strWH))-1
}contentGlueElementCSS[strWH]-=1
}if(contentSize[wh]>0){contentGlueElementCSS[strWH]=MATH.max(1,contentGlueElementCSS[strWH])
}};
setContentGlueElementCSSfunction(true);
setContentGlueElementCSSfunction(false);
if(_isTextarea){_textareaCoverElement.css(textareaCoverCSS)
}_contentGlueElement.css(contentGlueElementCSS)
}if(widthAuto){contentElementCSS[_strWidth]=_strHundredPercent
}if(widthAuto&&!_isBorderBox&&!_mutationObserversConnected){contentElementCSS[_strFloat]="none"
}_contentElement.css(contentElementCSS);
contentElementCSS={};
var contentScrollSize={w:contentMeasureElement[LEXICON.sW],h:contentMeasureElement[LEXICON.sH]};
contentScrollSize.c=contentSizeChanged=checkCacheAutoForce(contentScrollSize,_contentScrollSizeCache);
_contentScrollSizeCache=contentScrollSize;
_viewportSize=getViewportSize();
hostSize=getHostSize();
hostSizeChanged=checkCacheAutoForce(hostSize,_hostSizeCache);
_hostSizeCache=hostSize;
var hideOverflowForceTextarea=_isTextarea&&(_viewportSize.w===0||_viewportSize.h===0);
var previousOverflowAmount=_overflowAmountCache;
var overflowBehaviorIsVS={};
var overflowBehaviorIsVH={};
var overflowBehaviorIsS={};
var overflowAmount={};
var hasOverflow={};
var hideOverflow={};
var canScroll={};
var viewportRect=_paddingElementNative[LEXICON.bCR]();
var setOverflowVariables=function(horizontal){var scrollbarVars=getScrollbarVars(horizontal);
var scrollbarVarsInverted=getScrollbarVars(!horizontal);
var xyI=scrollbarVarsInverted._x_y;
var xy=scrollbarVars._x_y;
var wh=scrollbarVars._w_h;
var widthHeight=scrollbarVars._width_height;
var scrollMax=_strScroll+scrollbarVars._Left_Top+"Max";
var fractionalOverflowAmount=viewportRect[widthHeight]?MATH.abs(viewportRect[widthHeight]-_viewportSize[wh]):0;
var checkFractionalOverflowAmount=previousOverflowAmount&&previousOverflowAmount[xy]>0&&_viewportElementNative[scrollMax]===0;
overflowBehaviorIsVS[xy]=overflowBehavior[xy]==="v-s";
overflowBehaviorIsVH[xy]=overflowBehavior[xy]==="v-h";
overflowBehaviorIsS[xy]=overflowBehavior[xy]==="s";
overflowAmount[xy]=MATH.max(0,MATH.round((contentScrollSize[wh]-_viewportSize[wh])*100)/100);
overflowAmount[xy]*=(hideOverflowForceTextarea||(checkFractionalOverflowAmount&&fractionalOverflowAmount>0&&fractionalOverflowAmount<1))?0:1;
hasOverflow[xy]=overflowAmount[xy]>0;
hideOverflow[xy]=overflowBehaviorIsVS[xy]||overflowBehaviorIsVH[xy]?(hasOverflow[xyI]&&!overflowBehaviorIsVS[xyI]&&!overflowBehaviorIsVH[xyI]):hasOverflow[xy];
hideOverflow[xy+"s"]=hideOverflow[xy]?(overflowBehaviorIsS[xy]||overflowBehaviorIsVS[xy]):false;
canScroll[xy]=hasOverflow[xy]&&hideOverflow[xy+"s"]
};
setOverflowVariables(true);
setOverflowVariables(false);
overflowAmount.c=checkCacheAutoForce(overflowAmount,_overflowAmountCache);
_overflowAmountCache=overflowAmount;
hasOverflow.c=checkCacheAutoForce(hasOverflow,_hasOverflowCache);
_hasOverflowCache=hasOverflow;
hideOverflow.c=checkCacheAutoForce(hideOverflow,_hideOverflowCache);
_hideOverflowCache=hideOverflow;
if(_nativeScrollbarIsOverlaid.x||_nativeScrollbarIsOverlaid.y){var borderDesign="px solid transparent";
var contentArrangeElementCSS={};
var arrangeContent={};
var arrangeChanged=force;
var setContentElementCSS;
if(hasOverflow.x||hasOverflow.y){arrangeContent.w=_nativeScrollbarIsOverlaid.y&&hasOverflow.y?contentScrollSize.w+_overlayScrollbarDummySize.y:_strEmpty;
arrangeContent.h=_nativeScrollbarIsOverlaid.x&&hasOverflow.x?contentScrollSize.h+_overlayScrollbarDummySize.x:_strEmpty;
arrangeChanged=checkCacheAutoForce(arrangeContent,_arrangeContentSizeCache);
_arrangeContentSizeCache=arrangeContent
}if(hasOverflow.c||hideOverflow.c||contentScrollSize.c||cssDirectionChanged||widthAutoChanged||heightAutoChanged||widthAuto||heightAuto||ignoreOverlayScrollbarHidingChanged){contentElementCSS[_strMarginMinus+isRTLRight]=contentElementCSS[_strBorderMinus+isRTLRight]=_strEmpty;
setContentElementCSS=function(horizontal){var scrollbarVars=getScrollbarVars(horizontal);
var scrollbarVarsInverted=getScrollbarVars(!horizontal);
var xy=scrollbarVars._x_y;
var strDirection=horizontal?_strBottom:isRTLLeft;
var invertedAutoSize=horizontal?heightAuto:widthAuto;
if(_nativeScrollbarIsOverlaid[xy]&&hasOverflow[xy]&&hideOverflow[xy+"s"]){contentElementCSS[_strMarginMinus+strDirection]=invertedAutoSize?(ignoreOverlayScrollbarHiding?_strEmpty:_overlayScrollbarDummySize[xy]):_strEmpty;
contentElementCSS[_strBorderMinus+strDirection]=((horizontal?!invertedAutoSize:true)&&!ignoreOverlayScrollbarHiding)?(_overlayScrollbarDummySize[xy]+borderDesign):_strEmpty
}else{arrangeContent[scrollbarVarsInverted._w_h]=contentElementCSS[_strMarginMinus+strDirection]=contentElementCSS[_strBorderMinus+strDirection]=_strEmpty;
arrangeChanged=true
}};
if(_nativeScrollbarStyling){addRemoveClass(_viewportElement,_classNameViewportNativeScrollbarsInvisible,!ignoreOverlayScrollbarHiding)
}else{setContentElementCSS(true);
setContentElementCSS(false)
}}if(ignoreOverlayScrollbarHiding){arrangeContent.w=arrangeContent.h=_strEmpty;
arrangeChanged=true
}if(arrangeChanged&&!_nativeScrollbarStyling){contentArrangeElementCSS[_strWidth]=hideOverflow.y?arrangeContent.w:_strEmpty;
contentArrangeElementCSS[_strHeight]=hideOverflow.x?arrangeContent.h:_strEmpty;
if(!_contentArrangeElement){_contentArrangeElement=FRAMEWORK(generateDiv(_classNameContentArrangeElement));
_viewportElement.prepend(_contentArrangeElement)
}_contentArrangeElement.css(contentArrangeElementCSS)
}_contentElement.css(contentElementCSS)
}var viewportElementCSS={};
var paddingElementCSS={};
var setViewportCSS;
if(hostSizeChanged||hasOverflow.c||hideOverflow.c||contentScrollSize.c||overflowBehaviorChanged||boxSizingChanged||ignoreOverlayScrollbarHidingChanged||cssDirectionChanged||clipAlwaysChanged||heightAutoChanged){viewportElementCSS[isRTLRight]=_strEmpty;
setViewportCSS=function(horizontal){var scrollbarVars=getScrollbarVars(horizontal);
var scrollbarVarsInverted=getScrollbarVars(!horizontal);
var xy=scrollbarVars._x_y;
var XY=scrollbarVars._X_Y;
var strDirection=horizontal?_strBottom:isRTLLeft;
var reset=function(){viewportElementCSS[strDirection]=_strEmpty;
_contentBorderSize[scrollbarVarsInverted._w_h]=0
};
if(hasOverflow[xy]&&hideOverflow[xy+"s"]){viewportElementCSS[strOverflow+XY]=_strScroll;
if(ignoreOverlayScrollbarHiding||_nativeScrollbarStyling){reset()
}else{viewportElementCSS[strDirection]=-(_nativeScrollbarIsOverlaid[xy]?_overlayScrollbarDummySize[xy]:_nativeScrollbarSize[xy]);
_contentBorderSize[scrollbarVarsInverted._w_h]=_nativeScrollbarIsOverlaid[xy]?_overlayScrollbarDummySize[scrollbarVarsInverted._x_y]:0
}}else{viewportElementCSS[strOverflow+XY]=_strEmpty;
reset()
}};
setViewportCSS(true);
setViewportCSS(false);
if(!_nativeScrollbarStyling&&(_viewportSize.h<_nativeScrollbarMinSize.x||_viewportSize.w<_nativeScrollbarMinSize.y)&&((hasOverflow.x&&hideOverflow.x&&!_nativeScrollbarIsOverlaid.x)||(hasOverflow.y&&hideOverflow.y&&!_nativeScrollbarIsOverlaid.y))){viewportElementCSS[_strPaddingMinus+_strTop]=_nativeScrollbarMinSize.x;
viewportElementCSS[_strMarginMinus+_strTop]=-_nativeScrollbarMinSize.x;
viewportElementCSS[_strPaddingMinus+isRTLRight]=_nativeScrollbarMinSize.y;
viewportElementCSS[_strMarginMinus+isRTLRight]=-_nativeScrollbarMinSize.y
}else{viewportElementCSS[_strPaddingMinus+_strTop]=viewportElementCSS[_strMarginMinus+_strTop]=viewportElementCSS[_strPaddingMinus+isRTLRight]=viewportElementCSS[_strMarginMinus+isRTLRight]=_strEmpty
}viewportElementCSS[_strPaddingMinus+isRTLLeft]=viewportElementCSS[_strMarginMinus+isRTLLeft]=_strEmpty;
if((hasOverflow.x&&hideOverflow.x)||(hasOverflow.y&&hideOverflow.y)||hideOverflowForceTextarea){if(_isTextarea&&hideOverflowForceTextarea){paddingElementCSS[strOverflowX]=paddingElementCSS[strOverflowY]=strHidden
}}else{if(!clipAlways||(overflowBehaviorIsVH.x||overflowBehaviorIsVS.x||overflowBehaviorIsVH.y||overflowBehaviorIsVS.y)){if(_isTextarea){paddingElementCSS[strOverflowX]=paddingElementCSS[strOverflowY]=_strEmpty
}viewportElementCSS[strOverflowX]=viewportElementCSS[strOverflowY]=strVisible
}}_paddingElement.css(paddingElementCSS);
_viewportElement.css(viewportElementCSS);
viewportElementCSS={};
if((hasOverflow.c||boxSizingChanged||widthAutoChanged||heightAutoChanged)&&!(_nativeScrollbarIsOverlaid.x&&_nativeScrollbarIsOverlaid.y)){var elementStyle=_contentElementNative[LEXICON.s];
var dump;
elementStyle.webkitTransform="scale(1)";
elementStyle.display="run-in";
dump=_contentElementNative[LEXICON.oH];
elementStyle.display=_strEmpty;
elementStyle.webkitTransform=_strEmpty
}}contentElementCSS={};
if(cssDirectionChanged||widthAutoChanged||heightAutoChanged){if(_isRTL&&widthAuto){var floatTmp=_contentElement.css(_strFloat);
var posLeftWithoutFloat=MATH.round(_contentElement.css(_strFloat,_strEmpty).css(_strLeft,_strEmpty).position().left);
_contentElement.css(_strFloat,floatTmp);
var posLeftWithFloat=MATH.round(_contentElement.position().left);
if(posLeftWithoutFloat!==posLeftWithFloat){contentElementCSS[_strLeft]=posLeftWithoutFloat
}}else{contentElementCSS[_strLeft]=_strEmpty
}}_contentElement.css(contentElementCSS);
if(_isTextarea&&contentSizeChanged){var textareaInfo=getTextareaInfo();
if(textareaInfo){var textareaRowsChanged=_textareaInfoCache===undefined?true:textareaInfo._rows!==_textareaInfoCache._rows;
var cursorRow=textareaInfo._cursorRow;
var cursorCol=textareaInfo._cursorColumn;
var widestRow=textareaInfo._widestRow;
var lastRow=textareaInfo._rows;
var lastCol=textareaInfo._columns;
var cursorPos=textareaInfo._cursorPosition;
var cursorMax=textareaInfo._cursorMax;
var cursorIsLastPosition=(cursorPos>=cursorMax&&_textareaHasFocus);
var textareaScrollAmount={x:(!textareaAutoWrapping&&(cursorCol===lastCol&&cursorRow===widestRow))?_overflowAmountCache.x:-1,y:(textareaAutoWrapping?cursorIsLastPosition||textareaRowsChanged&&(previousOverflowAmount?(currScroll.y===previousOverflowAmount.y):false):(cursorIsLastPosition||textareaRowsChanged)&&cursorRow===lastRow)?_overflowAmountCache.y:-1};
currScroll.x=textareaScrollAmount.x>-1?(_isRTL&&_normalizeRTLCache&&_rtlScrollBehavior.i?0:textareaScrollAmount.x):currScroll.x;
currScroll.y=textareaScrollAmount.y>-1?textareaScrollAmount.y:currScroll.y
}_textareaInfoCache=textareaInfo
}if(_isRTL&&_rtlScrollBehavior.i&&_nativeScrollbarIsOverlaid.y&&hasOverflow.x&&_normalizeRTLCache){currScroll.x+=_contentBorderSize.w||0
}if(widthAuto){_hostElement[_strScrollLeft](0)
}if(heightAuto){_hostElement[_strScrollTop](0)
}_viewportElement[_strScrollLeft](currScroll.x)[_strScrollTop](currScroll.y);
var scrollbarsVisibilityVisible=scrollbarsVisibility==="v";
var scrollbarsVisibilityHidden=scrollbarsVisibility==="h";
var scrollbarsVisibilityAuto=scrollbarsVisibility==="a";
var refreshScrollbarsVisibility=function(showX,showY){showY=showY===undefined?showX:showY;
refreshScrollbarAppearance(true,showX,canScroll.x);
refreshScrollbarAppearance(false,showY,canScroll.y)
};
addRemoveClass(_hostElement,_classNameHostOverflow,hideOverflow.x||hideOverflow.y);
addRemoveClass(_hostElement,_classNameHostOverflowX,hideOverflow.x);
addRemoveClass(_hostElement,_classNameHostOverflowY,hideOverflow.y);
if(cssDirectionChanged&&!_isBody){addRemoveClass(_hostElement,_classNameHostRTL,_isRTL)
}if(_isBody){addClass(_hostElement,_classNameHostResizeDisabled)
}if(resizeChanged){addRemoveClass(_hostElement,_classNameHostResizeDisabled,_resizeNone);
addRemoveClass(_scrollbarCornerElement,_classNameScrollbarCornerResize,!_resizeNone);
addRemoveClass(_scrollbarCornerElement,_classNameScrollbarCornerResizeB,_resizeBoth);
addRemoveClass(_scrollbarCornerElement,_classNameScrollbarCornerResizeH,_resizeHorizontal);
addRemoveClass(_scrollbarCornerElement,_classNameScrollbarCornerResizeV,_resizeVertical)
}if(scrollbarsVisibilityChanged||overflowBehaviorChanged||hideOverflow.c||hasOverflow.c||ignoreOverlayScrollbarHidingChanged){if(ignoreOverlayScrollbarHiding){if(ignoreOverlayScrollbarHidingChanged){removeClass(_hostElement,_classNameHostScrolling);
if(ignoreOverlayScrollbarHiding){refreshScrollbarsVisibility(false)
}}}else{if(scrollbarsVisibilityAuto){refreshScrollbarsVisibility(canScroll.x,canScroll.y)
}else{if(scrollbarsVisibilityVisible){refreshScrollbarsVisibility(true)
}else{if(scrollbarsVisibilityHidden){refreshScrollbarsVisibility(false)
}}}}}if(scrollbarsAutoHideChanged||ignoreOverlayScrollbarHidingChanged){setupHostMouseTouchEvents(!_scrollbarsAutoHideLeave&&!_scrollbarsAutoHideMove);
refreshScrollbarsAutoHide(_scrollbarsAutoHideNever,!_scrollbarsAutoHideNever)
}if(hostSizeChanged||overflowAmount.c||heightAutoChanged||widthAutoChanged||resizeChanged||boxSizingChanged||paddingAbsoluteChanged||ignoreOverlayScrollbarHidingChanged||cssDirectionChanged){refreshScrollbarHandleLength(true);
refreshScrollbarHandleOffset(true);
refreshScrollbarHandleLength(false);
refreshScrollbarHandleOffset(false)
}if(scrollbarsClickScrollingChanged){refreshScrollbarsInteractive(true,scrollbarsClickScrolling)
}if(scrollbarsDragScrollingChanged){refreshScrollbarsInteractive(false,scrollbarsDragScrolling)
}dispatchCallback("onDirectionChanged",{isRTL:_isRTL,dir:cssDirection},cssDirectionChanged);
dispatchCallback("onHostSizeChanged",{width:_hostSizeCache.w,height:_hostSizeCache.h},hostSizeChanged);
dispatchCallback("onContentSizeChanged",{width:_contentScrollSizeCache.w,height:_contentScrollSizeCache.h},contentSizeChanged);
dispatchCallback("onOverflowChanged",{x:hasOverflow.x,y:hasOverflow.y,xScrollable:hideOverflow.xs,yScrollable:hideOverflow.ys,clipped:hideOverflow.x||hideOverflow.y},hasOverflow.c||hideOverflow.c);
dispatchCallback("onOverflowAmountChanged",{x:overflowAmount.x,y:overflowAmount.y},overflowAmount.c)
}if(_isBody&&_bodyMinSizeCache&&(_hasOverflowCache.c||_bodyMinSizeCache.c)){if(!_bodyMinSizeCache.f){bodyMinSizeChanged()
}if(_nativeScrollbarIsOverlaid.y&&_hasOverflowCache.x){_contentElement.css(_strMinMinus+_strWidth,_bodyMinSizeCache.w+_overlayScrollbarDummySize.y)
}if(_nativeScrollbarIsOverlaid.x&&_hasOverflowCache.y){_contentElement.css(_strMinMinus+_strHeight,_bodyMinSizeCache.h+_overlayScrollbarDummySize.x)
}_bodyMinSizeCache.c=false
}if(_initialized&&changedOptions.updateOnLoad){updateElementsOnLoad()
}dispatchCallback("onUpdated",{forced:force})
}function updateElementsOnLoad(){if(!_isTextarea){eachUpdateOnLoad(function(i,updateOnLoadSelector){_contentElement.find(updateOnLoadSelector).each(function(i,el){if(COMPATIBILITY.inA(el,_updateOnLoadElms)<0){_updateOnLoadElms.push(el);
FRAMEWORK(el).off(_updateOnLoadEventName,updateOnLoadCallback).on(_updateOnLoadEventName,updateOnLoadCallback)
}})
})
}}function setOptions(newOptions){var validatedOpts=_pluginsOptions._validate(newOptions,_pluginsOptions._template,true,_currentOptions);
_currentOptions=extendDeep({},_currentOptions,validatedOpts._default);
_currentPreparedOptions=extendDeep({},_currentPreparedOptions,validatedOpts._prepared);
return validatedOpts._prepared
}function setupStructureDOM(destroy){var strParent="parent";
var classNameResizeObserverHost="os-resize-observer-host";
var classNameTextareaElementFull=_classNameTextareaElement+_strSpace+_classNameTextInherit;
var textareaClass=_isTextarea?_strSpace+_classNameTextInherit:_strEmpty;
var adoptAttrs=_currentPreparedOptions.textarea.inheritedAttrs;
var adoptAttrsMap={};
var applyAdoptedAttrs=function(){var applyAdoptedAttrsElm=destroy?_targetElement:_hostElement;
each(adoptAttrsMap,function(key,value){if(type(value)==TYPES.s){if(key==LEXICON.c){applyAdoptedAttrsElm.addClass(value)
}else{applyAdoptedAttrsElm.attr(key,value)
}}})
};
var hostElementClassNames=[_classNameHostElement,_classNameHostElementForeign,_classNameHostTextareaElement,_classNameHostResizeDisabled,_classNameHostRTL,_classNameHostScrollbarHorizontalHidden,_classNameHostScrollbarVerticalHidden,_classNameHostTransition,_classNameHostScrolling,_classNameHostOverflow,_classNameHostOverflowX,_classNameHostOverflowY,_classNameThemeNone,_classNameTextareaElement,_classNameTextInherit,_classNameCache].join(_strSpace);
var hostElementCSS={};
_hostElement=_hostElement||(_isTextarea?(_domExists?_targetElement[strParent]()[strParent]()[strParent]()[strParent]():FRAMEWORK(generateDiv(_classNameHostTextareaElement))):_targetElement);
_contentElement=_contentElement||selectOrGenerateDivByClass(_classNameContentElement+textareaClass);
_viewportElement=_viewportElement||selectOrGenerateDivByClass(_classNameViewportElement+textareaClass);
_paddingElement=_paddingElement||selectOrGenerateDivByClass(_classNamePaddingElement+textareaClass);
_sizeObserverElement=_sizeObserverElement||selectOrGenerateDivByClass(classNameResizeObserverHost);
_textareaCoverElement=_textareaCoverElement||(_isTextarea?selectOrGenerateDivByClass(_classNameTextareaCoverElement):undefined);
if(_domExists){addClass(_hostElement,_classNameHostElementForeign)
}if(destroy){removeClass(_hostElement,hostElementClassNames)
}adoptAttrs=type(adoptAttrs)==TYPES.s?adoptAttrs.split(_strSpace):adoptAttrs;
if(COMPATIBILITY.isA(adoptAttrs)&&_isTextarea){each(adoptAttrs,function(i,v){if(type(v)==TYPES.s){adoptAttrsMap[v]=destroy?_hostElement.attr(v):_targetElement.attr(v)
}})
}if(!destroy){if(_isTextarea){if(!_currentPreparedOptions.sizeAutoCapable){hostElementCSS[_strWidth]=_targetElement.css(_strWidth);
hostElementCSS[_strHeight]=_targetElement.css(_strHeight)
}if(!_domExists){_targetElement.addClass(_classNameTextInherit).wrap(_hostElement)
}_hostElement=_targetElement[strParent]().css(hostElementCSS)
}if(!_domExists){addClass(_targetElement,_isTextarea?classNameTextareaElementFull:_classNameHostElement);
_hostElement.wrapInner(_contentElement).wrapInner(_viewportElement).wrapInner(_paddingElement).prepend(_sizeObserverElement);
_contentElement=findFirst(_hostElement,_strDot+_classNameContentElement);
_viewportElement=findFirst(_hostElement,_strDot+_classNameViewportElement);
_paddingElement=findFirst(_hostElement,_strDot+_classNamePaddingElement);
if(_isTextarea){_contentElement.prepend(_textareaCoverElement);
applyAdoptedAttrs()
}}if(_nativeScrollbarStyling){addClass(_viewportElement,_classNameViewportNativeScrollbarsInvisible)
}if(_nativeScrollbarIsOverlaid.x&&_nativeScrollbarIsOverlaid.y){addClass(_viewportElement,_classNameViewportNativeScrollbarsOverlaid)
}if(_isBody){addClass(_htmlElement,_classNameHTMLElement)
}_sizeObserverElementNative=_sizeObserverElement[0];
_hostElementNative=_hostElement[0];
_paddingElementNative=_paddingElement[0];
_viewportElementNative=_viewportElement[0];
_contentElementNative=_contentElement[0];
updateViewportAttrsFromTarget()
}else{if(_domExists&&_initialized){_sizeObserverElement.children().remove();
each([_paddingElement,_viewportElement,_contentElement,_textareaCoverElement],function(i,elm){if(elm){removeClass(elm.removeAttr(LEXICON.s),_classNamesDynamicDestroy)
}});
addClass(_hostElement,_isTextarea?_classNameHostTextareaElement:_classNameHostElement)
}else{remove(_sizeObserverElement);
_contentElement.contents().unwrap().unwrap().unwrap();
if(_isTextarea){_targetElement.unwrap();
remove(_hostElement);
remove(_textareaCoverElement);
applyAdoptedAttrs()
}}if(_isTextarea){_targetElement.removeAttr(LEXICON.s)
}if(_isBody){removeClass(_htmlElement,_classNameHTMLElement)
}}}function setupStructureEvents(){var textareaKeyDownRestrictedKeyCodes=[112,113,114,115,116,117,118,119,120,121,123,33,34,37,38,39,40,16,17,18,19,20,144];
var textareaKeyDownKeyCodesList=[];
var textareaUpdateIntervalID;
var scrollStopTimeoutId;
var scrollStopDelay=175;
var strFocus="focus";
function updateTextarea(doClearInterval){textareaUpdate();
_base.update(_strAuto);
if(doClearInterval&&_autoUpdateRecommended){clearInterval(textareaUpdateIntervalID)
}}function textareaOnScroll(event){_targetElement[_strScrollLeft](_rtlScrollBehavior.i&&_normalizeRTLCache?9999999:0);
_targetElement[_strScrollTop](0);
COMPATIBILITY.prvD(event);
COMPATIBILITY.stpP(event);
return false
}function textareaOnDrop(event){setTimeout(function(){if(!_destroyed){updateTextarea()
}},50)
}function textareaOnFocus(){_textareaHasFocus=true;
addClass(_hostElement,strFocus)
}function textareaOnFocusout(){_textareaHasFocus=false;
textareaKeyDownKeyCodesList=[];
removeClass(_hostElement,strFocus);
updateTextarea(true)
}function textareaOnKeyDown(event){var keyCode=event.keyCode;
if(inArray(keyCode,textareaKeyDownRestrictedKeyCodes)<0){if(!textareaKeyDownKeyCodesList[LEXICON.l]){updateTextarea();
textareaUpdateIntervalID=setInterval(updateTextarea,1000/60)
}if(inArray(keyCode,textareaKeyDownKeyCodesList)<0){textareaKeyDownKeyCodesList.push(keyCode)
}}}function textareaOnKeyUp(event){var keyCode=event.keyCode;
var index=inArray(keyCode,textareaKeyDownKeyCodesList);
if(inArray(keyCode,textareaKeyDownRestrictedKeyCodes)<0){if(index>-1){textareaKeyDownKeyCodesList.splice(index,1)
}if(!textareaKeyDownKeyCodesList[LEXICON.l]){updateTextarea(true)
}}}function contentOnTransitionEnd(event){if(_autoUpdateCache===true){return
}event=event.originalEvent||event;
if(isSizeAffectingCSSProperty(event.propertyName)){_base.update(_strAuto)
}}function viewportOnScroll(event){if(!_sleeping){if(scrollStopTimeoutId!==undefined){clearTimeout(scrollStopTimeoutId)
}else{if(_scrollbarsAutoHideScroll||_scrollbarsAutoHideMove){refreshScrollbarsAutoHide(true)
}if(!nativeOverlayScrollbarsAreActive()){addClass(_hostElement,_classNameHostScrolling)
}dispatchCallback("onScrollStart",event)
}if(!_scrollbarsHandlesDefineScrollPos){refreshScrollbarHandleOffset(true);
refreshScrollbarHandleOffset(false)
}dispatchCallback("onScroll",event);
scrollStopTimeoutId=setTimeout(function(){if(!_destroyed){clearTimeout(scrollStopTimeoutId);
scrollStopTimeoutId=undefined;
if(_scrollbarsAutoHideScroll||_scrollbarsAutoHideMove){refreshScrollbarsAutoHide(false)
}if(!nativeOverlayScrollbarsAreActive()){removeClass(_hostElement,_classNameHostScrolling)
}dispatchCallback("onScrollStop",event)
}},scrollStopDelay)
}}if(_isTextarea){if(_msieVersion>9||!_autoUpdateRecommended){addDestroyEventListener(_targetElement,"input",updateTextarea)
}else{addDestroyEventListener(_targetElement,[_strKeyDownEvent,_strKeyUpEvent],[textareaOnKeyDown,textareaOnKeyUp])
}addDestroyEventListener(_targetElement,[_strScroll,"drop",strFocus,strFocus+"out"],[textareaOnScroll,textareaOnDrop,textareaOnFocus,textareaOnFocusout])
}else{addDestroyEventListener(_contentElement,_strTransitionEndEvent,contentOnTransitionEnd)
}addDestroyEventListener(_viewportElement,_strScroll,viewportOnScroll,true)
}function setupScrollbarsDOM(destroy){var selectOrGenerateScrollbarDOM=function(isHorizontal){var scrollbarClassName=isHorizontal?_classNameScrollbarHorizontal:_classNameScrollbarVertical;
var scrollbar=selectOrGenerateDivByClass(_classNameScrollbar+_strSpace+scrollbarClassName,true);
var track=selectOrGenerateDivByClass(_classNameScrollbarTrack,scrollbar);
var handle=selectOrGenerateDivByClass(_classNameScrollbarHandle,scrollbar);
if(!_domExists&&!destroy){scrollbar.append(track);
track.append(handle)
}return{_scrollbar:scrollbar,_track:track,_handle:handle}
};
function resetScrollbarDOM(isHorizontal){var scrollbarVars=getScrollbarVars(isHorizontal);
var scrollbar=scrollbarVars._scrollbar;
var track=scrollbarVars._track;
var handle=scrollbarVars._handle;
if(_domExists&&_initialized){each([scrollbar,track,handle],function(i,elm){removeClass(elm.removeAttr(LEXICON.s),_classNamesDynamicDestroy)
})
}else{remove(scrollbar||selectOrGenerateScrollbarDOM(isHorizontal)._scrollbar)
}}var horizontalElements;
var verticalElements;
if(!destroy){horizontalElements=selectOrGenerateScrollbarDOM(true);
verticalElements=selectOrGenerateScrollbarDOM();
_scrollbarHorizontalElement=horizontalElements._scrollbar;
_scrollbarHorizontalTrackElement=horizontalElements._track;
_scrollbarHorizontalHandleElement=horizontalElements._handle;
_scrollbarVerticalElement=verticalElements._scrollbar;
_scrollbarVerticalTrackElement=verticalElements._track;
_scrollbarVerticalHandleElement=verticalElements._handle;
if(!_domExists){_paddingElement.after(_scrollbarVerticalElement);
_paddingElement.after(_scrollbarHorizontalElement)
}}else{resetScrollbarDOM(true);
resetScrollbarDOM()
}}function setupScrollbarEvents(isHorizontal){var scrollbarVars=getScrollbarVars(isHorizontal);
var scrollbarVarsInfo=scrollbarVars._info;
var insideIFrame=_windowElementNative.top!==_windowElementNative;
var xy=scrollbarVars._x_y;
var XY=scrollbarVars._X_Y;
var scroll=_strScroll+scrollbarVars._Left_Top;
var strActive="active";
var strSnapHandle="snapHandle";
var strClickEvent="click";
var scrollDurationFactor=1;
var increaseDecreaseScrollAmountKeyCodes=[16,17];
var trackTimeout;
var mouseDownScroll;
var mouseDownOffset;
var mouseDownInvertedScale;
function getPointerPosition(event){return _msieVersion&&insideIFrame?event["screen"+XY]:COMPATIBILITY.page(event)[xy]
}function getPreparedScrollbarsOption(name){return _currentPreparedOptions.scrollbars[name]
}function increaseTrackScrollAmount(){scrollDurationFactor=0.5
}function decreaseTrackScrollAmount(){scrollDurationFactor=1
}function stopClickEventPropagation(event){COMPATIBILITY.stpP(event)
}function documentKeyDown(event){if(inArray(event.keyCode,increaseDecreaseScrollAmountKeyCodes)>-1){increaseTrackScrollAmount()
}}function documentKeyUp(event){if(inArray(event.keyCode,increaseDecreaseScrollAmountKeyCodes)>-1){decreaseTrackScrollAmount()
}}function onMouseTouchDownContinue(event){var originalEvent=event.originalEvent||event;
var isTouchEvent=originalEvent.touches!==undefined;
return _sleeping||_destroyed||nativeOverlayScrollbarsAreActive()||!_scrollbarsDragScrollingCache||(isTouchEvent&&!getPreparedScrollbarsOption("touchSupport"))?false:COMPATIBILITY.mBtn(event)===1||isTouchEvent
}function documentDragMove(event){if(onMouseTouchDownContinue(event)){var trackLength=scrollbarVarsInfo._trackLength;
var handleLength=scrollbarVarsInfo._handleLength;
var scrollRange=scrollbarVarsInfo._maxScroll;
var scrollRaw=(getPointerPosition(event)-mouseDownOffset)*mouseDownInvertedScale;
var scrollDeltaPercent=scrollRaw/(trackLength-handleLength);
var scrollDelta=(scrollRange*scrollDeltaPercent);
scrollDelta=isFinite(scrollDelta)?scrollDelta:0;
if(_isRTL&&isHorizontal&&!_rtlScrollBehavior.i){scrollDelta*=-1
}_viewportElement[scroll](MATH.round(mouseDownScroll+scrollDelta));
if(_scrollbarsHandlesDefineScrollPos){refreshScrollbarHandleOffset(isHorizontal,mouseDownScroll+scrollDelta)
}if(!_supportPassiveEvents){COMPATIBILITY.prvD(event)
}}else{documentMouseTouchUp(event)
}}function documentMouseTouchUp(event){event=event||event.originalEvent;
setupResponsiveEventListener(_documentElement,[_strMouseTouchMoveEvent,_strMouseTouchUpEvent,_strKeyDownEvent,_strKeyUpEvent,_strSelectStartEvent],[documentDragMove,documentMouseTouchUp,documentKeyDown,documentKeyUp,documentOnSelectStart],true);
COMPATIBILITY.rAF()(function(){setupResponsiveEventListener(_documentElement,strClickEvent,stopClickEventPropagation,true,{_capture:true})
});
if(_scrollbarsHandlesDefineScrollPos){refreshScrollbarHandleOffset(isHorizontal,true)
}_scrollbarsHandlesDefineScrollPos=false;
removeClass(_bodyElement,_classNameDragging);
removeClass(scrollbarVars._handle,strActive);
removeClass(scrollbarVars._track,strActive);
removeClass(scrollbarVars._scrollbar,strActive);
mouseDownScroll=undefined;
mouseDownOffset=undefined;
mouseDownInvertedScale=1;
decreaseTrackScrollAmount();
if(trackTimeout!==undefined){_base.scrollStop();
clearTimeout(trackTimeout);
trackTimeout=undefined
}if(event){var rect=_hostElementNative[LEXICON.bCR]();
var mouseInsideHost=event.clientX>=rect.left&&event.clientX<=rect.right&&event.clientY>=rect.top&&event.clientY<=rect.bottom;
if(!mouseInsideHost){hostOnMouseLeave()
}if(_scrollbarsAutoHideScroll||_scrollbarsAutoHideMove){refreshScrollbarsAutoHide(false)
}}}function onHandleMouseTouchDown(event){if(onMouseTouchDownContinue(event)){onHandleMouseTouchDownAction(event)
}}function onHandleMouseTouchDownAction(event){mouseDownScroll=_viewportElement[scroll]();
mouseDownScroll=isNaN(mouseDownScroll)?0:mouseDownScroll;
if(_isRTL&&isHorizontal&&!_rtlScrollBehavior.n||!_isRTL){mouseDownScroll=mouseDownScroll<0?0:mouseDownScroll
}mouseDownInvertedScale=getHostElementInvertedScale()[xy];
mouseDownOffset=getPointerPosition(event);
_scrollbarsHandlesDefineScrollPos=!getPreparedScrollbarsOption(strSnapHandle);
addClass(_bodyElement,_classNameDragging);
addClass(scrollbarVars._handle,strActive);
addClass(scrollbarVars._scrollbar,strActive);
setupResponsiveEventListener(_documentElement,[_strMouseTouchMoveEvent,_strMouseTouchUpEvent,_strSelectStartEvent],[documentDragMove,documentMouseTouchUp,documentOnSelectStart]);
COMPATIBILITY.rAF()(function(){setupResponsiveEventListener(_documentElement,strClickEvent,stopClickEventPropagation,false,{_capture:true})
});
if(_msieVersion||!_documentMixed){COMPATIBILITY.prvD(event)
}COMPATIBILITY.stpP(event)
}function onTrackMouseTouchDown(event){if(onMouseTouchDownContinue(event)){var handleToViewportRatio=scrollbarVars._info._handleLength/Math.round(MATH.min(1,_viewportSize[scrollbarVars._w_h]/_contentScrollSizeCache[scrollbarVars._w_h])*scrollbarVars._info._trackLength);
var scrollDistance=MATH.round(_viewportSize[scrollbarVars._w_h]*handleToViewportRatio);
var scrollBaseDuration=270*handleToViewportRatio;
var scrollFirstIterationDelay=400*handleToViewportRatio;
var trackOffset=scrollbarVars._track.offset()[scrollbarVars._left_top];
var ctrlKey=event.ctrlKey;
var instantScroll=event.shiftKey;
var instantScrollTransition=instantScroll&&ctrlKey;
var isFirstIteration=true;
var easing="linear";
var decreaseScroll;
var finishedCondition;
var scrollActionFinsished=function(transition){if(_scrollbarsHandlesDefineScrollPos){refreshScrollbarHandleOffset(isHorizontal,transition)
}};
var scrollActionInstantFinished=function(){scrollActionFinsished();
onHandleMouseTouchDownAction(event)
};
var scrollAction=function(){if(!_destroyed){var mouseOffset=(mouseDownOffset-trackOffset)*mouseDownInvertedScale;
var handleOffset=scrollbarVarsInfo._handleOffset;
var trackLength=scrollbarVarsInfo._trackLength;
var handleLength=scrollbarVarsInfo._handleLength;
var scrollRange=scrollbarVarsInfo._maxScroll;
var currScroll=scrollbarVarsInfo._currentScroll;
var scrollDuration=scrollBaseDuration*scrollDurationFactor;
var timeoutDelay=isFirstIteration?MATH.max(scrollFirstIterationDelay,scrollDuration):scrollDuration;
var instantScrollPosition=scrollRange*((mouseOffset-(handleLength/2))/(trackLength-handleLength));
var rtlIsNormal=_isRTL&&isHorizontal&&((!_rtlScrollBehavior.i&&!_rtlScrollBehavior.n)||_normalizeRTLCache);
var decreaseScrollCondition=rtlIsNormal?handleOffset<mouseOffset:handleOffset>mouseOffset;
var scrollObj={};
var animationObj={easing:easing,step:function(now){if(_scrollbarsHandlesDefineScrollPos){_viewportElement[scroll](now);
refreshScrollbarHandleOffset(isHorizontal,now)
}}};
instantScrollPosition=isFinite(instantScrollPosition)?instantScrollPosition:0;
instantScrollPosition=_isRTL&&isHorizontal&&!_rtlScrollBehavior.i?(scrollRange-instantScrollPosition):instantScrollPosition;
if(instantScroll){_viewportElement[scroll](instantScrollPosition);
if(instantScrollTransition){instantScrollPosition=_viewportElement[scroll]();
_viewportElement[scroll](currScroll);
instantScrollPosition=rtlIsNormal&&_rtlScrollBehavior.i?(scrollRange-instantScrollPosition):instantScrollPosition;
instantScrollPosition=rtlIsNormal&&_rtlScrollBehavior.n?-instantScrollPosition:instantScrollPosition;
scrollObj[xy]=instantScrollPosition;
_base.scroll(scrollObj,extendDeep(animationObj,{duration:130,complete:scrollActionInstantFinished}))
}else{scrollActionInstantFinished()
}}else{decreaseScroll=isFirstIteration?decreaseScrollCondition:decreaseScroll;
finishedCondition=rtlIsNormal?(decreaseScroll?handleOffset+handleLength>=mouseOffset:handleOffset<=mouseOffset):(decreaseScroll?handleOffset<=mouseOffset:handleOffset+handleLength>=mouseOffset);
if(finishedCondition){clearTimeout(trackTimeout);
_base.scrollStop();
trackTimeout=undefined;
scrollActionFinsished(true)
}else{trackTimeout=setTimeout(scrollAction,timeoutDelay);
scrollObj[xy]=(decreaseScroll?"-=":"+=")+scrollDistance;
_base.scroll(scrollObj,extendDeep(animationObj,{duration:scrollDuration}))
}isFirstIteration=false
}}};
if(ctrlKey){increaseTrackScrollAmount()
}mouseDownInvertedScale=getHostElementInvertedScale()[xy];
mouseDownOffset=COMPATIBILITY.page(event)[xy];
_scrollbarsHandlesDefineScrollPos=!getPreparedScrollbarsOption(strSnapHandle);
addClass(_bodyElement,_classNameDragging);
addClass(scrollbarVars._track,strActive);
addClass(scrollbarVars._scrollbar,strActive);
setupResponsiveEventListener(_documentElement,[_strMouseTouchUpEvent,_strKeyDownEvent,_strKeyUpEvent,_strSelectStartEvent],[documentMouseTouchUp,documentKeyDown,documentKeyUp,documentOnSelectStart]);
scrollAction();
COMPATIBILITY.prvD(event);
COMPATIBILITY.stpP(event)
}}function onTrackMouseTouchEnter(event){_scrollbarsHandleHovered=true;
if(_scrollbarsAutoHideScroll||_scrollbarsAutoHideMove){refreshScrollbarsAutoHide(true)
}}function onTrackMouseTouchLeave(event){_scrollbarsHandleHovered=false;
if(_scrollbarsAutoHideScroll||_scrollbarsAutoHideMove){refreshScrollbarsAutoHide(false)
}}function onScrollbarMouseTouchDown(event){COMPATIBILITY.stpP(event)
}addDestroyEventListener(scrollbarVars._handle,_strMouseTouchDownEvent,onHandleMouseTouchDown);
addDestroyEventListener(scrollbarVars._track,[_strMouseTouchDownEvent,_strMouseEnter,_strMouseLeave],[onTrackMouseTouchDown,onTrackMouseTouchEnter,onTrackMouseTouchLeave]);
addDestroyEventListener(scrollbarVars._scrollbar,_strMouseTouchDownEvent,onScrollbarMouseTouchDown);
if(_supportTransition){addDestroyEventListener(scrollbarVars._scrollbar,_strTransitionEndEvent,function(event){if(event.target!==scrollbarVars._scrollbar[0]){return
}refreshScrollbarHandleLength(isHorizontal);
refreshScrollbarHandleOffset(isHorizontal)
})
}}function refreshScrollbarAppearance(isHorizontal,shallBeVisible,canScroll){var scrollbarHiddenClassName=isHorizontal?_classNameHostScrollbarHorizontalHidden:_classNameHostScrollbarVerticalHidden;
var scrollbarElement=isHorizontal?_scrollbarHorizontalElement:_scrollbarVerticalElement;
addRemoveClass(_hostElement,scrollbarHiddenClassName,!shallBeVisible);
addRemoveClass(scrollbarElement,_classNameScrollbarUnusable,!canScroll)
}function refreshScrollbarsAutoHide(shallBeVisible,delayfree){clearTimeout(_scrollbarsAutoHideTimeoutId);
if(shallBeVisible){removeClass(_scrollbarHorizontalElement,_classNameScrollbarAutoHidden);
removeClass(_scrollbarVerticalElement,_classNameScrollbarAutoHidden)
}else{var anyActive;
var strActive="active";
var hide=function(){if(!_scrollbarsHandleHovered&&!_destroyed){anyActive=_scrollbarHorizontalHandleElement.hasClass(strActive)||_scrollbarVerticalHandleElement.hasClass(strActive);
if(!anyActive&&(_scrollbarsAutoHideScroll||_scrollbarsAutoHideMove||_scrollbarsAutoHideLeave)){addClass(_scrollbarHorizontalElement,_classNameScrollbarAutoHidden)
}if(!anyActive&&(_scrollbarsAutoHideScroll||_scrollbarsAutoHideMove||_scrollbarsAutoHideLeave)){addClass(_scrollbarVerticalElement,_classNameScrollbarAutoHidden)
}}};
if(_scrollbarsAutoHideDelay>0&&delayfree!==true){_scrollbarsAutoHideTimeoutId=setTimeout(hide,_scrollbarsAutoHideDelay)
}else{hide()
}}}function refreshScrollbarHandleLength(isHorizontal){var handleCSS={};
var scrollbarVars=getScrollbarVars(isHorizontal);
var scrollbarVarsInfo=scrollbarVars._info;
var digit=1000000;
var handleRatio=MATH.min(1,_viewportSize[scrollbarVars._w_h]/_contentScrollSizeCache[scrollbarVars._w_h]);
handleCSS[scrollbarVars._width_height]=(MATH.floor(handleRatio*100*digit)/digit)+"%";
if(!nativeOverlayScrollbarsAreActive()){scrollbarVars._handle.css(handleCSS)
}scrollbarVarsInfo._handleLength=scrollbarVars._handle[0]["offset"+scrollbarVars._Width_Height];
scrollbarVarsInfo._handleLengthRatio=handleRatio
}function refreshScrollbarHandleOffset(isHorizontal,scrollOrTransition){var transition=type(scrollOrTransition)==TYPES.b;
var transitionDuration=250;
var isRTLisHorizontal=_isRTL&&isHorizontal;
var scrollbarVars=getScrollbarVars(isHorizontal);
var scrollbarVarsInfo=scrollbarVars._info;
var strTranslateBrace="translate(";
var strTransform=VENDORS._cssProperty("transform");
var strTransition=VENDORS._cssProperty("transition");
var nativeScroll=isHorizontal?_viewportElement[_strScrollLeft]():_viewportElement[_strScrollTop]();
var currentScroll=scrollOrTransition===undefined||transition?nativeScroll:scrollOrTransition;
var handleLength=scrollbarVarsInfo._handleLength;
var trackLength=scrollbarVars._track[0]["offset"+scrollbarVars._Width_Height];
var handleTrackDiff=trackLength-handleLength;
var handleCSS={};
var transformOffset;
var translateValue;
var maxScroll=(_viewportElementNative[_strScroll+scrollbarVars._Width_Height]-_viewportElementNative["client"+scrollbarVars._Width_Height])*(_rtlScrollBehavior.n&&isRTLisHorizontal?-1:1);
var getScrollRatio=function(base){return isNaN(base/maxScroll)?0:MATH.max(0,MATH.min(1,base/maxScroll))
};
var getHandleOffset=function(scrollRatio){var offset=handleTrackDiff*scrollRatio;
offset=isNaN(offset)?0:offset;
offset=(isRTLisHorizontal&&!_rtlScrollBehavior.i)?(trackLength-handleLength-offset):offset;
offset=MATH.max(0,offset);
return offset
};
var scrollRatio=getScrollRatio(nativeScroll);
var unsnappedScrollRatio=getScrollRatio(currentScroll);
var handleOffset=getHandleOffset(unsnappedScrollRatio);
var snappedHandleOffset=getHandleOffset(scrollRatio);
scrollbarVarsInfo._maxScroll=maxScroll;
scrollbarVarsInfo._currentScroll=nativeScroll;
scrollbarVarsInfo._currentScrollRatio=scrollRatio;
if(_supportTransform){transformOffset=isRTLisHorizontal?-(trackLength-handleLength-handleOffset):handleOffset;
translateValue=isHorizontal?strTranslateBrace+transformOffset+"px, 0)":strTranslateBrace+"0, "+transformOffset+"px)";
handleCSS[strTransform]=translateValue;
if(_supportTransition){handleCSS[strTransition]=transition&&MATH.abs(handleOffset-scrollbarVarsInfo._handleOffset)>1?getCSSTransitionString(scrollbarVars._handle)+", "+(strTransform+_strSpace+transitionDuration+"ms"):_strEmpty
}}else{handleCSS[scrollbarVars._left_top]=handleOffset
}if(!nativeOverlayScrollbarsAreActive()){scrollbarVars._handle.css(handleCSS);
if(_supportTransform&&_supportTransition&&transition){scrollbarVars._handle.one(_strTransitionEndEvent,function(){if(!_destroyed){scrollbarVars._handle.css(strTransition,_strEmpty)
}})
}}scrollbarVarsInfo._handleOffset=handleOffset;
scrollbarVarsInfo._snappedHandleOffset=snappedHandleOffset;
scrollbarVarsInfo._trackLength=trackLength
}function refreshScrollbarsInteractive(isTrack,value){var action=value?"removeClass":"addClass";
var element1=isTrack?_scrollbarHorizontalTrackElement:_scrollbarHorizontalHandleElement;
var element2=isTrack?_scrollbarVerticalTrackElement:_scrollbarVerticalHandleElement;
var className=isTrack?_classNameScrollbarTrackOff:_classNameScrollbarHandleOff;
element1[action](className);
element2[action](className)
}function getScrollbarVars(isHorizontal){return{_width_height:isHorizontal?_strWidth:_strHeight,_Width_Height:isHorizontal?"Width":"Height",_left_top:isHorizontal?_strLeft:_strTop,_Left_Top:isHorizontal?"Left":"Top",_x_y:isHorizontal?_strX:_strY,_X_Y:isHorizontal?"X":"Y",_w_h:isHorizontal?"w":"h",_l_t:isHorizontal?"l":"t",_track:isHorizontal?_scrollbarHorizontalTrackElement:_scrollbarVerticalTrackElement,_handle:isHorizontal?_scrollbarHorizontalHandleElement:_scrollbarVerticalHandleElement,_scrollbar:isHorizontal?_scrollbarHorizontalElement:_scrollbarVerticalElement,_info:isHorizontal?_scrollHorizontalInfo:_scrollVerticalInfo}
}function setupScrollbarCornerDOM(destroy){_scrollbarCornerElement=_scrollbarCornerElement||selectOrGenerateDivByClass(_classNameScrollbarCorner,true);
if(!destroy){if(!_domExists){_hostElement.append(_scrollbarCornerElement)
}}else{if(_domExists&&_initialized){removeClass(_scrollbarCornerElement.removeAttr(LEXICON.s),_classNamesDynamicDestroy)
}else{remove(_scrollbarCornerElement)
}}}function setupScrollbarCornerEvents(){var insideIFrame=_windowElementNative.top!==_windowElementNative;
var mouseDownPosition={};
var mouseDownSize={};
var mouseDownInvertedScale={};
var reconnectMutationObserver;
function documentDragMove(event){if(onMouseTouchDownContinue(event)){var pageOffset=getCoordinates(event);
var hostElementCSS={};
if(_resizeHorizontal||_resizeBoth){hostElementCSS[_strWidth]=(mouseDownSize.w+(pageOffset.x-mouseDownPosition.x)*mouseDownInvertedScale.x)
}if(_resizeVertical||_resizeBoth){hostElementCSS[_strHeight]=(mouseDownSize.h+(pageOffset.y-mouseDownPosition.y)*mouseDownInvertedScale.y)
}_hostElement.css(hostElementCSS);
COMPATIBILITY.stpP(event)
}else{documentMouseTouchUp(event)
}}function documentMouseTouchUp(event){var eventIsTrusted=event!==undefined;
setupResponsiveEventListener(_documentElement,[_strSelectStartEvent,_strMouseTouchMoveEvent,_strMouseTouchUpEvent],[documentOnSelectStart,documentDragMove,documentMouseTouchUp],true);
removeClass(_bodyElement,_classNameDragging);
if(_scrollbarCornerElement.releaseCapture){_scrollbarCornerElement.releaseCapture()
}if(eventIsTrusted){if(reconnectMutationObserver){connectMutationObservers()
}_base.update(_strAuto)
}reconnectMutationObserver=false
}function onMouseTouchDownContinue(event){var originalEvent=event.originalEvent||event;
var isTouchEvent=originalEvent.touches!==undefined;
return _sleeping||_destroyed?false:COMPATIBILITY.mBtn(event)===1||isTouchEvent
}function getCoordinates(event){return _msieVersion&&insideIFrame?{x:event.screenX,y:event.screenY}:COMPATIBILITY.page(event)
}addDestroyEventListener(_scrollbarCornerElement,_strMouseTouchDownEvent,function(event){if(onMouseTouchDownContinue(event)&&!_resizeNone){if(_mutationObserversConnected){reconnectMutationObserver=true;
disconnectMutationObservers()
}mouseDownPosition=getCoordinates(event);
mouseDownSize.w=_hostElementNative[LEXICON.oW]-(!_isBorderBox?_paddingX:0);
mouseDownSize.h=_hostElementNative[LEXICON.oH]-(!_isBorderBox?_paddingY:0);
mouseDownInvertedScale=getHostElementInvertedScale();
setupResponsiveEventListener(_documentElement,[_strSelectStartEvent,_strMouseTouchMoveEvent,_strMouseTouchUpEvent],[documentOnSelectStart,documentDragMove,documentMouseTouchUp]);
addClass(_bodyElement,_classNameDragging);
if(_scrollbarCornerElement.setCapture){_scrollbarCornerElement.setCapture()
}COMPATIBILITY.prvD(event);
COMPATIBILITY.stpP(event)
}})
}function dispatchCallback(name,args,dependent){if(dependent===false){return
}if(_initialized){var callback=_currentPreparedOptions.callbacks[name];
var extensionOnName=name;
var ext;
if(extensionOnName.substr(0,2)==="on"){extensionOnName=extensionOnName.substr(2,1).toLowerCase()+extensionOnName.substr(3)
}if(type(callback)==TYPES.f){callback.call(_base,args)
}each(_extensions,function(){ext=this;
if(type(ext.on)==TYPES.f){ext.on(extensionOnName,args)
}})
}else{if(!_destroyed){_callbacksInitQeueue.push({n:name,a:args})
}}}function setTopRightBottomLeft(targetCSSObject,prefix,values){prefix=prefix||_strEmpty;
values=values||[_strEmpty,_strEmpty,_strEmpty,_strEmpty];
targetCSSObject[prefix+_strTop]=values[0];
targetCSSObject[prefix+_strRight]=values[1];
targetCSSObject[prefix+_strBottom]=values[2];
targetCSSObject[prefix+_strLeft]=values[3]
}function getTopRightBottomLeftHost(prefix,suffix,zeroX,zeroY){suffix=suffix||_strEmpty;
prefix=prefix||_strEmpty;
return{t:zeroY?0:parseToZeroOrNumber(_hostElement.css(prefix+_strTop+suffix)),r:zeroX?0:parseToZeroOrNumber(_hostElement.css(prefix+_strRight+suffix)),b:zeroY?0:parseToZeroOrNumber(_hostElement.css(prefix+_strBottom+suffix)),l:zeroX?0:parseToZeroOrNumber(_hostElement.css(prefix+_strLeft+suffix))}
}function getCSSTransitionString(element){var transitionStr=VENDORS._cssProperty("transition");
var assembledValue=element.css(transitionStr);
if(assembledValue){return assembledValue
}var regExpString="\\s*(([^,(]+(\\(.+?\\))?)+)[\\s,]*";
var regExpMain=new RegExp(regExpString);
var regExpValidate=new RegExp("^("+regExpString+")+$");
var properties="property duration timing-function delay".split(" ");
var result=[];
var strResult;
var valueArray;
var i=0;
var j;
var splitCssStyleByComma=function(str){strResult=[];
if(!str.match(regExpValidate)){return str
}while(str.match(regExpMain)){strResult.push(RegExp.$1);
str=str.replace(regExpMain,_strEmpty)
}return strResult
};
for(;
i<properties[LEXICON.l];
i++){valueArray=splitCssStyleByComma(element.css(transitionStr+"-"+properties[i]));
for(j=0;
j<valueArray[LEXICON.l];
j++){result[j]=(result[j]?result[j]+_strSpace:_strEmpty)+valueArray[j]
}}return result.join(", ")
}function createHostClassNameRegExp(withCurrClassNameOption,withOldClassNameOption){var i;
var split;
var appendix;
var appendClasses=function(classes,condition){appendix="";
if(condition&&typeof classes==TYPES.s){split=classes.split(_strSpace);
for(i=0;
i<split[LEXICON.l];
i++){appendix+="|"+split[i]+"$"
}}return appendix
};
return new RegExp("(^"+_classNameHostElement+"([-_].+|)$)"+appendClasses(_classNameCache,withCurrClassNameOption)+appendClasses(_oldClassName,withOldClassNameOption),"g")
}function getHostElementInvertedScale(){var rect=_paddingElementNative[LEXICON.bCR]();
return{x:_supportTransform?1/(MATH.round(rect.width)/_paddingElementNative[LEXICON.oW])||1:1,y:_supportTransform?1/(MATH.round(rect.height)/_paddingElementNative[LEXICON.oH])||1:1}
}function isHTMLElement(o){var strOwnerDocument="ownerDocument";
var strHTMLElement="HTMLElement";
var wnd=o&&o[strOwnerDocument]?(o[strOwnerDocument].parentWindow||window):window;
return(typeof wnd[strHTMLElement]==TYPES.o?o instanceof wnd[strHTMLElement]:o&&typeof o==TYPES.o&&o!==null&&o.nodeType===1&&typeof o.nodeName==TYPES.s)
}function getArrayDifferences(a1,a2){var a=[];
var diff=[];
var i;
var k;
for(i=0;
i<a1.length;
i++){a[a1[i]]=true
}for(i=0;
i<a2.length;
i++){if(a[a2[i]]){delete a[a2[i]]
}else{a[a2[i]]=true
}}for(k in a){diff.push(k)
}return diff
}function parseToZeroOrNumber(value,toFloat){var num=toFloat?parseFloat(value):parseInt(value,10);
return isNaN(num)?0:num
}function getTextareaInfo(){var textareaCursorPosition=_targetElementNative.selectionStart;
if(textareaCursorPosition===undefined){return
}var textareaValue=_targetElement.val();
var textareaLength=textareaValue[LEXICON.l];
var textareaRowSplit=textareaValue.split("\n");
var textareaLastRow=textareaRowSplit[LEXICON.l];
var textareaCurrentCursorRowSplit=textareaValue.substr(0,textareaCursorPosition).split("\n");
var widestRow=0;
var textareaLastCol=0;
var cursorRow=textareaCurrentCursorRowSplit[LEXICON.l];
var cursorCol=textareaCurrentCursorRowSplit[textareaCurrentCursorRowSplit[LEXICON.l]-1][LEXICON.l];
var rowCols;
var i;
for(i=0;
i<textareaRowSplit[LEXICON.l];
i++){rowCols=textareaRowSplit[i][LEXICON.l];
if(rowCols>textareaLastCol){widestRow=i+1;
textareaLastCol=rowCols
}}return{_cursorRow:cursorRow,_cursorColumn:cursorCol,_rows:textareaLastRow,_columns:textareaLastCol,_widestRow:widestRow,_cursorPosition:textareaCursorPosition,_cursorMax:textareaLength}
}function nativeOverlayScrollbarsAreActive(){return(_ignoreOverlayScrollbarHidingCache&&(_nativeScrollbarIsOverlaid.x&&_nativeScrollbarIsOverlaid.y))
}function getContentMeasureElement(){return _isTextarea?_textareaCoverElement[0]:_contentElementNative
}function generateDiv(classesOrAttrs,content){return"<div "+(classesOrAttrs?type(classesOrAttrs)==TYPES.s?'class="'+classesOrAttrs+'"':(function(){var key;
var attrs=_strEmpty;
if(FRAMEWORK.isPlainObject(classesOrAttrs)){for(key in classesOrAttrs){attrs+=(key==="c"?"class":key)+'="'+classesOrAttrs[key]+'" '
}}return attrs
})():_strEmpty)+">"+(content||_strEmpty)+"</div>"
}function selectOrGenerateDivByClass(className,selectParentOrOnlyChildren){var onlyChildren=type(selectParentOrOnlyChildren)==TYPES.b;
var selectParent=onlyChildren?_hostElement:(selectParentOrOnlyChildren||_hostElement);
return(_domExists&&!selectParent[LEXICON.l])?null:_domExists?selectParent[onlyChildren?"children":"find"](_strDot+className.replace(/\s/g,_strDot)).eq(0):FRAMEWORK(generateDiv(className))
}function getObjectPropVal(obj,path){var splits=path.split(_strDot);
var i=0;
var val;
for(;
i<splits.length;
i++){if(!obj[LEXICON.hOP](splits[i])){return
}val=obj[splits[i]];
if(i<splits.length&&type(val)==TYPES.o){obj=val
}}return val
}function setObjectPropVal(obj,path,val){var splits=path.split(_strDot);
var splitsLength=splits.length;
var i=0;
var extendObj={};
var extendObjRoot=extendObj;
for(;
i<splitsLength;
i++){extendObj=extendObj[splits[i]]=i+1<splitsLength?{}:val
}FRAMEWORK.extend(obj,extendObjRoot,true)
}function eachUpdateOnLoad(action){var updateOnLoad=_currentPreparedOptions.updateOnLoad;
updateOnLoad=type(updateOnLoad)==TYPES.s?updateOnLoad.split(_strSpace):updateOnLoad;
if(COMPATIBILITY.isA(updateOnLoad)&&!_destroyed){each(updateOnLoad,action)
}}function checkCache(current,cache,force){if(force){return force
}if(type(current)==TYPES.o&&type(cache)==TYPES.o){for(var prop in current){if(prop!=="c"){if(current[LEXICON.hOP](prop)&&cache[LEXICON.hOP](prop)){if(checkCache(current[prop],cache[prop])){return true
}}else{return true
}}}}else{return current!==cache
}return false
}function extendDeep(){return FRAMEWORK.extend.apply(this,[true].concat([].slice.call(arguments)))
}function addClass(el,classes){return _frameworkProto.addClass.call(el,classes)
}function removeClass(el,classes){return _frameworkProto.removeClass.call(el,classes)
}function addRemoveClass(el,classes,doAdd){return doAdd?addClass(el,classes):removeClass(el,classes)
}function remove(el){return _frameworkProto.remove.call(el)
}function findFirst(el,selector){return _frameworkProto.find.call(el,selector).eq(0)
}_base.sleep=function(){_sleeping=true
};
_base.update=function(force){if(_destroyed){return
}var attrsChanged;
var contentSizeC;
var isString=type(force)==TYPES.s;
var doUpdateAuto;
var mutHost;
var mutContent;
if(isString){if(force===_strAuto){attrsChanged=meaningfulAttrsChanged();
contentSizeC=updateAutoContentSizeChanged();
doUpdateAuto=attrsChanged||contentSizeC;
if(doUpdateAuto){update({_contentSizeChanged:contentSizeC,_changedOptions:_initialized?undefined:_currentPreparedOptions})
}}else{if(force===_strSync){if(_mutationObserversConnected){mutHost=_mutationObserverHostCallback(_mutationObserverHost.takeRecords());
mutContent=_mutationObserverContentCallback(_mutationObserverContent.takeRecords())
}else{mutHost=_base.update(_strAuto)
}}else{if(force==="zoom"){update({_hostSizeChanged:true,_contentSizeChanged:true})
}}}}else{force=_sleeping||force;
_sleeping=false;
if(!_base.update(_strSync)||force){update({_force:force})
}}updateElementsOnLoad();
return doUpdateAuto||mutHost||mutContent
};
_base.options=function(newOptions,value){var option={};
var changedOps;
if(FRAMEWORK.isEmptyObject(newOptions)||!FRAMEWORK.isPlainObject(newOptions)){if(type(newOptions)==TYPES.s){if(arguments.length>1){setObjectPropVal(option,newOptions,value);
changedOps=setOptions(option)
}else{return getObjectPropVal(_currentOptions,newOptions)
}}else{return _currentOptions
}}else{changedOps=setOptions(newOptions)
}if(!FRAMEWORK.isEmptyObject(changedOps)){update({_changedOptions:changedOps})
}};
_base.destroy=function(){if(_destroyed){return
}autoUpdateLoop.remove(_base);
disconnectMutationObservers();
setupResizeObserver(_sizeObserverElement);
setupResizeObserver(_sizeAutoObserverElement);
for(var extName in _extensions){_base.removeExt(extName)
}while(_destroyEvents[LEXICON.l]>0){_destroyEvents.pop()()
}setupHostMouseTouchEvents(true);
if(_contentGlueElement){remove(_contentGlueElement)
}if(_contentArrangeElement){remove(_contentArrangeElement)
}if(_sizeAutoObserverAdded){remove(_sizeAutoObserverElement)
}setupScrollbarsDOM(true);
setupScrollbarCornerDOM(true);
setupStructureDOM(true);
for(var i=0;
i<_updateOnLoadElms[LEXICON.l];
i++){FRAMEWORK(_updateOnLoadElms[i]).off(_updateOnLoadEventName,updateOnLoadCallback)
}_updateOnLoadElms=undefined;
_destroyed=true;
_sleeping=true;
INSTANCES(pluginTargetElement,0);
dispatchCallback("onDestroyed")
};
_base.scroll=function(coordinates,duration,easing,complete){if(arguments.length===0||coordinates===undefined){var infoX=_scrollHorizontalInfo;
var infoY=_scrollVerticalInfo;
var normalizeInvert=_normalizeRTLCache&&_isRTL&&_rtlScrollBehavior.i;
var normalizeNegate=_normalizeRTLCache&&_isRTL&&_rtlScrollBehavior.n;
var scrollX=infoX._currentScroll;
var scrollXRatio=infoX._currentScrollRatio;
var maxScrollX=infoX._maxScroll;
scrollXRatio=normalizeInvert?1-scrollXRatio:scrollXRatio;
scrollX=normalizeInvert?maxScrollX-scrollX:scrollX;
scrollX*=normalizeNegate?-1:1;
maxScrollX*=normalizeNegate?-1:1;
return{position:{x:scrollX,y:infoY._currentScroll},ratio:{x:scrollXRatio,y:infoY._currentScrollRatio},max:{x:maxScrollX,y:infoY._maxScroll},handleOffset:{x:infoX._handleOffset,y:infoY._handleOffset},handleLength:{x:infoX._handleLength,y:infoY._handleLength},handleLengthRatio:{x:infoX._handleLengthRatio,y:infoY._handleLengthRatio},trackLength:{x:infoX._trackLength,y:infoY._trackLength},snappedHandleOffset:{x:infoX._snappedHandleOffset,y:infoY._snappedHandleOffset},isRTL:_isRTL,isRTLNormalized:_normalizeRTLCache}
}_base.update(_strSync);
var normalizeRTL=_normalizeRTLCache;
var coordinatesXAxisProps=[_strX,_strLeft,"l"];
var coordinatesYAxisProps=[_strY,_strTop,"t"];
var coordinatesOperators=["+=","-=","*=","/="];
var durationIsObject=type(duration)==TYPES.o;
var completeCallback=durationIsObject?duration.complete:complete;
var i;
var finalScroll={};
var specialEasing={};
var doScrollLeft;
var doScrollTop;
var animationOptions;
var strEnd="end";
var strBegin="begin";
var strCenter="center";
var strNearest="nearest";
var strAlways="always";
var strNever="never";
var strIfNeeded="ifneeded";
var strLength=LEXICON.l;
var settingsAxis;
var settingsScroll;
var settingsBlock;
var settingsMargin;
var finalElement;
var elementObjSettingsAxisValues=[_strX,_strY,"xy","yx"];
var elementObjSettingsBlockValues=[strBegin,strEnd,strCenter,strNearest];
var elementObjSettingsScrollValues=[strAlways,strNever,strIfNeeded];
var coordinatesIsElementObj=coordinates[LEXICON.hOP]("el");
var possibleElement=coordinatesIsElementObj?coordinates.el:coordinates;
var possibleElementIsJQuery=possibleElement instanceof FRAMEWORK||JQUERY?possibleElement instanceof JQUERY:false;
var possibleElementIsHTMLElement=possibleElementIsJQuery?false:isHTMLElement(possibleElement);
var updateScrollbarInfos=function(){if(doScrollLeft){refreshScrollbarHandleOffset(true)
}if(doScrollTop){refreshScrollbarHandleOffset(false)
}};
var proxyCompleteCallback=type(completeCallback)!=TYPES.f?undefined:function(){updateScrollbarInfos();
completeCallback()
};
function checkSettingsStringValue(currValue,allowedValues){for(i=0;
i<allowedValues[strLength];
i++){if(currValue===allowedValues[i]){return true
}}return false
}function getRawScroll(isX,coordinates){var coordinateProps=isX?coordinatesXAxisProps:coordinatesYAxisProps;
coordinates=type(coordinates)==TYPES.s||type(coordinates)==TYPES.n?[coordinates,coordinates]:coordinates;
if(COMPATIBILITY.isA(coordinates)){return isX?coordinates[0]:coordinates[1]
}else{if(type(coordinates)==TYPES.o){for(i=0;
i<coordinateProps[strLength];
i++){if(coordinateProps[i] in coordinates){return coordinates[coordinateProps[i]]
}}}}}function getFinalScroll(isX,rawScroll){var isString=type(rawScroll)==TYPES.s;
var operator;
var amount;
var scrollInfo=isX?_scrollHorizontalInfo:_scrollVerticalInfo;
var currScroll=scrollInfo._currentScroll;
var maxScroll=scrollInfo._maxScroll;
var mult=" * ";
var finalValue;
var isRTLisX=_isRTL&&isX;
var normalizeShortcuts=isRTLisX&&_rtlScrollBehavior.n&&!normalizeRTL;
var strReplace="replace";
var evalFunc=eval;
var possibleOperator;
if(isString){if(rawScroll[strLength]>2){possibleOperator=rawScroll.substr(0,2);
if(inArray(possibleOperator,coordinatesOperators)>-1){operator=possibleOperator
}}rawScroll=operator?rawScroll.substr(2):rawScroll;
rawScroll=rawScroll[strReplace](/min/g,0)[strReplace](/</g,0)[strReplace](/max/g,(normalizeShortcuts?"-":_strEmpty)+_strHundredPercent)[strReplace](/>/g,(normalizeShortcuts?"-":_strEmpty)+_strHundredPercent)[strReplace](/px/g,_strEmpty)[strReplace](/%/g,mult+(maxScroll*(isRTLisX&&_rtlScrollBehavior.n?-1:1)/100))[strReplace](/vw/g,mult+_viewportSize.w)[strReplace](/vh/g,mult+_viewportSize.h);
amount=parseToZeroOrNumber(isNaN(rawScroll)?parseToZeroOrNumber(evalFunc(rawScroll),true).toFixed():rawScroll)
}else{amount=rawScroll
}if(amount!==undefined&&!isNaN(amount)&&type(amount)==TYPES.n){var normalizeIsRTLisX=normalizeRTL&&isRTLisX;
var operatorCurrScroll=currScroll*(normalizeIsRTLisX&&_rtlScrollBehavior.n?-1:1);
var invert=normalizeIsRTLisX&&_rtlScrollBehavior.i;
var negate=normalizeIsRTLisX&&_rtlScrollBehavior.n;
operatorCurrScroll=invert?(maxScroll-operatorCurrScroll):operatorCurrScroll;
switch(operator){case"+=":finalValue=operatorCurrScroll+amount;
break;
case"-=":finalValue=operatorCurrScroll-amount;
break;
case"*=":finalValue=operatorCurrScroll*amount;
break;
case"/=":finalValue=operatorCurrScroll/amount;
break;
default:finalValue=amount;
break
}finalValue=invert?maxScroll-finalValue:finalValue;
finalValue*=negate?-1:1;
finalValue=isRTLisX&&_rtlScrollBehavior.n?MATH.min(0,MATH.max(maxScroll,finalValue)):MATH.max(0,MATH.min(maxScroll,finalValue))
}return finalValue===currScroll?undefined:finalValue
}function getPerAxisValue(value,valueInternalType,defaultValue,allowedValues){var resultDefault=[defaultValue,defaultValue];
var valueType=type(value);
var valueArrLength;
var valueArrItem;
if(valueType==valueInternalType){value=[value,value]
}else{if(valueType==TYPES.a){valueArrLength=value[strLength];
if(valueArrLength>2||valueArrLength<1){value=resultDefault
}else{if(valueArrLength===1){value[1]=defaultValue
}for(i=0;
i<valueArrLength;
i++){valueArrItem=value[i];
if(type(valueArrItem)!=valueInternalType||!checkSettingsStringValue(valueArrItem,allowedValues)){value=resultDefault;
break
}}}}else{if(valueType==TYPES.o){value=[value[_strX]||defaultValue,value[_strY]||defaultValue]
}else{value=resultDefault
}}}return{x:value[0],y:value[1]}
}function generateMargin(marginTopRightBottomLeftArray){var result=[];
var currValue;
var currValueType;
var valueDirections=[_strTop,_strRight,_strBottom,_strLeft];
for(i=0;
i<marginTopRightBottomLeftArray[strLength];
i++){if(i===valueDirections[strLength]){break
}currValue=marginTopRightBottomLeftArray[i];
currValueType=type(currValue);
if(currValueType==TYPES.b){result.push(currValue?parseToZeroOrNumber(finalElement.css(_strMarginMinus+valueDirections[i])):0)
}else{result.push(currValueType==TYPES.n?currValue:0)
}}return result
}if(possibleElementIsJQuery||possibleElementIsHTMLElement){var margin=coordinatesIsElementObj?coordinates.margin:0;
var axis=coordinatesIsElementObj?coordinates.axis:0;
var scroll=coordinatesIsElementObj?coordinates.scroll:0;
var block=coordinatesIsElementObj?coordinates.block:0;
var marginDefault=[0,0,0,0];
var marginType=type(margin);
var marginLength;
finalElement=possibleElementIsJQuery?possibleElement:FRAMEWORK(possibleElement);
if(finalElement[strLength]>0){if(marginType==TYPES.n||marginType==TYPES.b){margin=generateMargin([margin,margin,margin,margin])
}else{if(marginType==TYPES.a){marginLength=margin[strLength];
if(marginLength===2){margin=generateMargin([margin[0],margin[1],margin[0],margin[1]])
}else{if(marginLength>=4){margin=generateMargin(margin)
}else{margin=marginDefault
}}}else{if(marginType==TYPES.o){margin=generateMargin([margin[_strTop],margin[_strRight],margin[_strBottom],margin[_strLeft]])
}else{margin=marginDefault
}}}settingsAxis=checkSettingsStringValue(axis,elementObjSettingsAxisValues)?axis:"xy";
settingsScroll=getPerAxisValue(scroll,TYPES.s,strAlways,elementObjSettingsScrollValues);
settingsBlock=getPerAxisValue(block,TYPES.s,strBegin,elementObjSettingsBlockValues);
settingsMargin=margin;
var viewportScroll={l:_scrollHorizontalInfo._currentScroll,t:_scrollVerticalInfo._currentScroll};
var viewportOffset=_paddingElement.offset();
var elementOffset=finalElement.offset();
var doNotScroll={x:settingsScroll.x==strNever||settingsAxis==_strY,y:settingsScroll.y==strNever||settingsAxis==_strX};
elementOffset[_strTop]-=settingsMargin[0];
elementOffset[_strLeft]-=settingsMargin[3];
var elementScrollCoordinates={x:MATH.round(elementOffset[_strLeft]-viewportOffset[_strLeft]+viewportScroll.l),y:MATH.round(elementOffset[_strTop]-viewportOffset[_strTop]+viewportScroll.t)};
if(_isRTL){if(!_rtlScrollBehavior.n&&!_rtlScrollBehavior.i){elementScrollCoordinates.x=MATH.round(viewportOffset[_strLeft]-elementOffset[_strLeft]+viewportScroll.l)
}if(_rtlScrollBehavior.n&&normalizeRTL){elementScrollCoordinates.x*=-1
}if(_rtlScrollBehavior.i&&normalizeRTL){elementScrollCoordinates.x=MATH.round(viewportOffset[_strLeft]-elementOffset[_strLeft]+(_scrollHorizontalInfo._maxScroll-viewportScroll.l))
}}if(settingsBlock.x!=strBegin||settingsBlock.y!=strBegin||settingsScroll.x==strIfNeeded||settingsScroll.y==strIfNeeded||_isRTL){var measuringElm=finalElement[0];
var rawElementSize=_supportTransform?measuringElm[LEXICON.bCR]():{width:measuringElm[LEXICON.oW],height:measuringElm[LEXICON.oH]};
var elementSize={w:rawElementSize[_strWidth]+settingsMargin[3]+settingsMargin[1],h:rawElementSize[_strHeight]+settingsMargin[0]+settingsMargin[2]};
var finalizeBlock=function(isX){var vars=getScrollbarVars(isX);
var wh=vars._w_h;
var lt=vars._left_top;
var xy=vars._x_y;
var blockIsEnd=settingsBlock[xy]==(isX?_isRTL?strBegin:strEnd:strEnd);
var blockIsCenter=settingsBlock[xy]==strCenter;
var blockIsNearest=settingsBlock[xy]==strNearest;
var scrollNever=settingsScroll[xy]==strNever;
var scrollIfNeeded=settingsScroll[xy]==strIfNeeded;
var vpSize=_viewportSize[wh];
var vpOffset=viewportOffset[lt];
var elSize=elementSize[wh];
var elOffset=elementOffset[lt];
var divide=blockIsCenter?2:1;
var elementCenterOffset=elOffset+(elSize/2);
var viewportCenterOffset=vpOffset+(vpSize/2);
var isInView=elSize<=vpSize&&elOffset>=vpOffset&&elOffset+elSize<=vpOffset+vpSize;
if(scrollNever){doNotScroll[xy]=true
}else{if(!doNotScroll[xy]){if(blockIsNearest||scrollIfNeeded){doNotScroll[xy]=scrollIfNeeded?isInView:false;
blockIsEnd=elSize<vpSize?elementCenterOffset>viewportCenterOffset:elementCenterOffset<viewportCenterOffset
}elementScrollCoordinates[xy]-=blockIsEnd||blockIsCenter?((vpSize/divide)-(elSize/divide))*(isX&&_isRTL&&normalizeRTL?-1:1):0
}}};
finalizeBlock(true);
finalizeBlock(false)
}if(doNotScroll.y){delete elementScrollCoordinates.y
}if(doNotScroll.x){delete elementScrollCoordinates.x
}coordinates=elementScrollCoordinates
}}finalScroll[_strScrollLeft]=getFinalScroll(true,getRawScroll(true,coordinates));
finalScroll[_strScrollTop]=getFinalScroll(false,getRawScroll(false,coordinates));
doScrollLeft=finalScroll[_strScrollLeft]!==undefined;
doScrollTop=finalScroll[_strScrollTop]!==undefined;
if((doScrollLeft||doScrollTop)&&(duration>0||durationIsObject)){if(durationIsObject){duration.complete=proxyCompleteCallback;
_viewportElement.animate(finalScroll,duration)
}else{animationOptions={duration:duration,complete:proxyCompleteCallback};
if(COMPATIBILITY.isA(easing)||FRAMEWORK.isPlainObject(easing)){specialEasing[_strScrollLeft]=easing[0]||easing.x;
specialEasing[_strScrollTop]=easing[1]||easing.y;
animationOptions.specialEasing=specialEasing
}else{animationOptions.easing=easing
}_viewportElement.animate(finalScroll,animationOptions)
}}else{if(doScrollLeft){_viewportElement[_strScrollLeft](finalScroll[_strScrollLeft])
}if(doScrollTop){_viewportElement[_strScrollTop](finalScroll[_strScrollTop])
}updateScrollbarInfos()
}};
_base.scrollStop=function(param1,param2,param3){_viewportElement.stop(param1,param2,param3);
return _base
};
_base.getElements=function(elementName){var obj={target:_targetElementNative,host:_hostElementNative,padding:_paddingElementNative,viewport:_viewportElementNative,content:_contentElementNative,scrollbarHorizontal:{scrollbar:_scrollbarHorizontalElement[0],track:_scrollbarHorizontalTrackElement[0],handle:_scrollbarHorizontalHandleElement[0]},scrollbarVertical:{scrollbar:_scrollbarVerticalElement[0],track:_scrollbarVerticalTrackElement[0],handle:_scrollbarVerticalHandleElement[0]},scrollbarCorner:_scrollbarCornerElement[0]};
return type(elementName)==TYPES.s?getObjectPropVal(obj,elementName):obj
};
_base.getState=function(stateProperty){function prepare(obj){if(!FRAMEWORK.isPlainObject(obj)){return obj
}var extended=extendDeep({},obj);
var changePropertyName=function(from,to){if(extended[LEXICON.hOP](from)){extended[to]=extended[from];
delete extended[from]
}};
changePropertyName("w",_strWidth);
changePropertyName("h",_strHeight);
delete extended.c;
return extended
}var obj={destroyed:!!prepare(_destroyed),sleeping:!!prepare(_sleeping),autoUpdate:prepare(!_mutationObserversConnected),widthAuto:prepare(_widthAutoCache),heightAuto:prepare(_heightAutoCache),padding:prepare(_cssPaddingCache),overflowAmount:prepare(_overflowAmountCache),hideOverflow:prepare(_hideOverflowCache),hasOverflow:prepare(_hasOverflowCache),contentScrollSize:prepare(_contentScrollSizeCache),viewportSize:prepare(_viewportSize),hostSize:prepare(_hostSizeCache),documentMixed:prepare(_documentMixed)};
return type(stateProperty)==TYPES.s?getObjectPropVal(obj,stateProperty):obj
};
_base.ext=function(extName){var result;
var privateMethods=_extensionsPrivateMethods.split(" ");
var i=0;
if(type(extName)==TYPES.s){if(_extensions[LEXICON.hOP](extName)){result=extendDeep({},_extensions[extName]);
for(;
i<privateMethods.length;
i++){delete result[privateMethods[i]]
}}}else{result={};
for(i in _extensions){result[i]=extendDeep({},_base.ext(i))
}}return result
};
_base.addExt=function(extName,extensionOptions){var registeredExtensionObj=_plugin.extension(extName);
var instance;
var instanceAdded;
var instanceContract;
var contractResult;
var contractFulfilled=true;
if(registeredExtensionObj){if(!_extensions[LEXICON.hOP](extName)){instance=registeredExtensionObj.extensionFactory.call(_base,extendDeep({},registeredExtensionObj.defaultOptions),FRAMEWORK,COMPATIBILITY);
if(instance){instanceContract=instance.contract;
if(type(instanceContract)==TYPES.f){contractResult=instanceContract(window);
contractFulfilled=type(contractResult)==TYPES.b?contractResult:contractFulfilled
}if(contractFulfilled){_extensions[extName]=instance;
instanceAdded=instance.added;
if(type(instanceAdded)==TYPES.f){instanceAdded(extensionOptions)
}return _base.ext(extName)
}}}else{return _base.ext(extName)
}}else{console.warn('A extension with the name "'+extName+"\" isn't registered.")
}};
_base.removeExt=function(extName){var instance=_extensions[extName];
var instanceRemoved;
if(instance){delete _extensions[extName];
instanceRemoved=instance.removed;
if(type(instanceRemoved)==TYPES.f){instanceRemoved()
}return true
}return false
};
function construct(targetElement,options,extensions){_defaultOptions=globals.defaultOptions;
_nativeScrollbarStyling=globals.nativeScrollbarStyling;
_nativeScrollbarSize=extendDeep({},globals.nativeScrollbarSize);
_nativeScrollbarIsOverlaid=extendDeep({},globals.nativeScrollbarIsOverlaid);
_overlayScrollbarDummySize=extendDeep({},globals.overlayScrollbarDummySize);
_rtlScrollBehavior=extendDeep({},globals.rtlScrollBehavior);
setOptions(extendDeep({},_defaultOptions,options));
_cssCalc=globals.cssCalc;
_msieVersion=globals.msie;
_autoUpdateRecommended=globals.autoUpdateRecommended;
_supportTransition=globals.supportTransition;
_supportTransform=globals.supportTransform;
_supportPassiveEvents=globals.supportPassiveEvents;
_supportResizeObserver=globals.supportResizeObserver;
_supportMutationObserver=globals.supportMutationObserver;
_restrictedMeasuring=globals.restrictedMeasuring;
_documentElement=FRAMEWORK(targetElement.ownerDocument);
_documentElementNative=_documentElement[0];
_windowElement=FRAMEWORK(_documentElementNative.defaultView||_documentElementNative.parentWindow);
_windowElementNative=_windowElement[0];
_htmlElement=findFirst(_documentElement,"html");
_bodyElement=findFirst(_htmlElement,"body");
_targetElement=FRAMEWORK(targetElement);
_targetElementNative=_targetElement[0];
_isTextarea=_targetElement.is("textarea");
_isBody=_targetElement.is("body");
_documentMixed=_documentElementNative!==document;
_domExists=_isTextarea?_targetElement.hasClass(_classNameTextareaElement)&&_targetElement.parent().hasClass(_classNameContentElement):_targetElement.hasClass(_classNameHostElement)&&_targetElement.children(_strDot+_classNamePaddingElement)[LEXICON.l];
var initBodyScroll;
var bodyMouseTouchDownListener;
if(_nativeScrollbarIsOverlaid.x&&_nativeScrollbarIsOverlaid.y&&!_currentPreparedOptions.nativeScrollbarsOverlaid.initialize){_initialized=true;
dispatchCallback("onInitializationWithdrawn");
if(_domExists){setupStructureDOM(true);
setupScrollbarsDOM(true);
setupScrollbarCornerDOM(true)
}_initialized=false;
_destroyed=true;
_sleeping=true;
return _base
}if(_isBody){initBodyScroll={};
initBodyScroll.l=MATH.max(_targetElement[_strScrollLeft](),_htmlElement[_strScrollLeft](),_windowElement[_strScrollLeft]());
initBodyScroll.t=MATH.max(_targetElement[_strScrollTop](),_htmlElement[_strScrollTop](),_windowElement[_strScrollTop]());
bodyMouseTouchDownListener=function(){_viewportElement.removeAttr(LEXICON.ti);
setupResponsiveEventListener(_viewportElement,_strMouseTouchDownEvent,bodyMouseTouchDownListener,true,true)
}
}setupStructureDOM();
setupScrollbarsDOM();
setupScrollbarCornerDOM();
setupStructureEvents();
setupScrollbarEvents(true);
setupScrollbarEvents(false);
setupScrollbarCornerEvents();
createMutationObservers();
setupResizeObserver(_sizeObserverElement,hostOnResized);
if(_isBody){_viewportElement[_strScrollLeft](initBodyScroll.l)[_strScrollTop](initBodyScroll.t);
if(document.activeElement==targetElement&&_viewportElementNative.focus){_viewportElement.attr(LEXICON.ti,"-1");
_viewportElementNative.focus();
setupResponsiveEventListener(_viewportElement,_strMouseTouchDownEvent,bodyMouseTouchDownListener,false,true)
}}_base.update(_strAuto);
_initialized=true;
dispatchCallback("onInitialized");
each(_callbacksInitQeueue,function(index,value){dispatchCallback(value.n,value.a)
});
_callbacksInitQeueue=[];
if(type(extensions)==TYPES.s){extensions=[extensions]
}if(COMPATIBILITY.isA(extensions)){each(extensions,function(index,value){_base.addExt(value)
})
}else{if(FRAMEWORK.isPlainObject(extensions)){each(extensions,function(key,value){_base.addExt(key,value)
})
}}setTimeout(function(){if(_supportTransition&&!_destroyed){addClass(_hostElement,_classNameHostTransition)
}},333);
return _base
}if(_plugin.valid(construct(pluginTargetElement,options,extensions))){INSTANCES(pluginTargetElement,_base)
}return _base
}_plugin=window[PLUGINNAME]=function(pluginTargetElements,options,extensions){if(arguments[LEXICON.l]===0){return this
}var arr=[];
var optsIsPlainObj=FRAMEWORK.isPlainObject(options);
var inst;
var result;
if(!pluginTargetElements){return optsIsPlainObj||!options?result:arr
}pluginTargetElements=pluginTargetElements[LEXICON.l]!=undefined?pluginTargetElements:[pluginTargetElements[0]||pluginTargetElements];
initOverlayScrollbarsStatics();
if(pluginTargetElements[LEXICON.l]>0){if(optsIsPlainObj){FRAMEWORK.each(pluginTargetElements,function(i,v){inst=v;
if(inst!==undefined){arr.push(OverlayScrollbarsInstance(inst,options,extensions,_pluginsGlobals,_pluginsAutoUpdateLoop))
}})
}else{FRAMEWORK.each(pluginTargetElements,function(i,v){inst=INSTANCES(v);
if((options==="!"&&_plugin.valid(inst))||(COMPATIBILITY.type(options)==TYPES.f&&options(v,inst))){arr.push(inst)
}else{if(options===undefined){arr.push(inst)
}}})
}result=arr[LEXICON.l]===1?arr[0]:arr
}return result
};
_plugin.globals=function(){initOverlayScrollbarsStatics();
var globals=FRAMEWORK.extend(true,{},_pluginsGlobals);
delete globals.msie;
return globals
};
_plugin.defaultOptions=function(newDefaultOptions){initOverlayScrollbarsStatics();
var currDefaultOptions=_pluginsGlobals.defaultOptions;
if(newDefaultOptions===undefined){return FRAMEWORK.extend(true,{},currDefaultOptions)
}_pluginsGlobals.defaultOptions=FRAMEWORK.extend(true,{},currDefaultOptions,_pluginsOptions._validate(newDefaultOptions,_pluginsOptions._template,true,currDefaultOptions)._default)
};
_plugin.valid=function(osInstance){return osInstance instanceof _plugin&&!osInstance.getState().destroyed
};
_plugin.extension=function(extensionName,extension,defaultOptions){var extNameTypeString=COMPATIBILITY.type(extensionName)==TYPES.s;
var argLen=arguments[LEXICON.l];
var i=0;
if(argLen<1||!extNameTypeString){return FRAMEWORK.extend(true,{length:_pluginsExtensions[LEXICON.l]},_pluginsExtensions)
}else{if(extNameTypeString){if(COMPATIBILITY.type(extension)==TYPES.f){_pluginsExtensions.push({name:extensionName,extensionFactory:extension,defaultOptions:defaultOptions})
}else{for(;
i<_pluginsExtensions[LEXICON.l];
i++){if(_pluginsExtensions[i].name===extensionName){if(argLen>1){_pluginsExtensions.splice(i,1)
}else{return FRAMEWORK.extend(true,{},_pluginsExtensions[i])
}}}}}}};
return _plugin
})();
if(JQUERY&&JQUERY.fn){JQUERY.fn.overlayScrollbars=function(options,extensions){var _elements=this;
if(JQUERY.isPlainObject(options)){JQUERY.each(_elements,function(){PLUGIN(this,options,extensions)
});
return _elements
}else{return PLUGIN(_elements,options)
}}
}return PLUGIN
}));
/*!
 * OverlayScrollbars
 * https://github.com/KingSora/OverlayScrollbars
 *
 * Version: 1.13.3
 *
 * Copyright KingSora | Rene Haas.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 * Date: 20.07.2022
 */
(function(b,a){if(typeof define==="function"&&define.amd){define(function(){return a(b,b.document,undefined)
})
}else{if(typeof module==="object"&&typeof module.exports==="object"){module.exports=a(b,b.document,undefined)
}else{a(b,b.document,undefined)
}}}(typeof window!=="undefined"?window:this,function(window,document,undefined){var PLUGINNAME="OverlayScrollbars";
var TYPES={o:"object",f:"function",a:"array",s:"string",b:"boolean",n:"number",u:"undefined",z:"null"};
var LEXICON={c:"class",s:"style",i:"id",l:"length",p:"prototype",ti:"tabindex",oH:"offsetHeight",cH:"clientHeight",sH:"scrollHeight",oW:"offsetWidth",cW:"clientWidth",sW:"scrollWidth",hOP:"hasOwnProperty",bCR:"getBoundingClientRect"};
var VENDORS=(function(){var jsCache={};
var cssCache={};
var cssPrefixes=["-webkit-","-moz-","-o-","-ms-"];
var jsPrefixes=["WebKit","Moz","O","MS"];
function firstLetterToUpper(str){return str.charAt(0).toUpperCase()+str.slice(1)
}return{_cssPrefixes:cssPrefixes,_jsPrefixes:jsPrefixes,_cssProperty:function(name){var result=cssCache[name];
if(cssCache[LEXICON.hOP](name)){return result
}var uppercasedName=firstLetterToUpper(name);
var elmStyle=document.createElement("div")[LEXICON.s];
var resultPossibilities;
var i=0;
var v;
var currVendorWithoutDashes;
for(;
i<cssPrefixes.length;
i++){currVendorWithoutDashes=cssPrefixes[i].replace(/-/g,"");
resultPossibilities=[name,cssPrefixes[i]+name,currVendorWithoutDashes+uppercasedName,firstLetterToUpper(currVendorWithoutDashes)+uppercasedName];
for(v=0;
v<resultPossibilities[LEXICON.l];
v++){if(elmStyle[resultPossibilities[v]]!==undefined){result=resultPossibilities[v];
break
}}}cssCache[name]=result;
return result
},_cssPropertyValue:function(property,values,suffix){var name=property+" "+values;
var result=cssCache[name];
if(cssCache[LEXICON.hOP](name)){return result
}var dummyStyle=document.createElement("div")[LEXICON.s];
var possbleValues=values.split(" ");
var preparedSuffix=suffix||"";
var i=0;
var v=-1;
var prop;
for(;
i<possbleValues[LEXICON.l];
i++){for(;
v<VENDORS._cssPrefixes[LEXICON.l];
v++){prop=v<0?possbleValues[i]:VENDORS._cssPrefixes[v]+possbleValues[i];
dummyStyle.cssText=property+":"+prop+preparedSuffix;
if(dummyStyle[LEXICON.l]){result=prop;
break
}}}cssCache[name]=result;
return result
},_jsAPI:function(name,isInterface,fallback){var i=0;
var result=jsCache[name];
if(!jsCache[LEXICON.hOP](name)){result=window[name];
for(;
i<jsPrefixes[LEXICON.l];
i++){result=result||window[(isInterface?jsPrefixes[i]:jsPrefixes[i].toLowerCase())+firstLetterToUpper(name)]
}jsCache[name]=result
}return result||fallback
}}
})();
var COMPATIBILITY=(function(){function windowSize(x){return x?window.innerWidth||document.documentElement[LEXICON.cW]||document.body[LEXICON.cW]:window.innerHeight||document.documentElement[LEXICON.cH]||document.body[LEXICON.cH]
}function bind(func,thisObj){if(typeof func!=TYPES.f){throw"Can't bind function!"
}var proto=LEXICON.p;
var aArgs=Array[proto].slice.call(arguments,2);
var fNOP=function(){};
var fBound=function(){return func.apply(this instanceof fNOP?this:thisObj,aArgs.concat(Array[proto].slice.call(arguments)))
};
if(func[proto]){fNOP[proto]=func[proto]
}fBound[proto]=new fNOP();
return fBound
}return{wW:bind(windowSize,0,true),wH:bind(windowSize,0),mO:bind(VENDORS._jsAPI,0,"MutationObserver",true),rO:bind(VENDORS._jsAPI,0,"ResizeObserver",true),rAF:bind(VENDORS._jsAPI,0,"requestAnimationFrame",false,function(func){return window.setTimeout(func,1000/60)
}),cAF:bind(VENDORS._jsAPI,0,"cancelAnimationFrame",false,function(id){return window.clearTimeout(id)
}),now:function(){return Date.now&&Date.now()||new Date().getTime()
},stpP:function(event){if(event.stopPropagation){event.stopPropagation()
}else{event.cancelBubble=true
}},prvD:function(event){if(event.preventDefault&&event.cancelable){event.preventDefault()
}else{event.returnValue=false
}},page:function(event){event=event.originalEvent||event;
var strPage="page";
var strClient="client";
var strX="X";
var strY="Y";
var target=event.target||event.srcElement||document;
var eventDoc=target.ownerDocument||document;
var doc=eventDoc.documentElement;
var body=eventDoc.body;
if(event.touches!==undefined){var touch=event.touches[0];
return{x:touch[strPage+strX],y:touch[strPage+strY]}
}if(!event[strPage+strX]&&event[strClient+strX]&&event[strClient+strX]!=null){return{x:event[strClient+strX]+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0),y:event[strClient+strY]+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0)}
}return{x:event[strPage+strX],y:event[strPage+strY]}
},mBtn:function(event){var button=event.button;
if(!event.which&&button!==undefined){return(button&1?1:(button&2?3:(button&4?2:0)))
}else{return event.which
}},inA:function(item,arr){for(var i=0;
i<arr[LEXICON.l];
i++){try{if(arr[i]===item){return i
}}catch(e){}}return -1
},isA:function(arr){var def=Array.isArray;
return def?def(arr):this.type(arr)==TYPES.a
},type:function(obj){if(obj===undefined){return obj+""
}if(obj===null){return obj+""
}return Object[LEXICON.p].toString.call(obj).replace(/^\[object (.+)\]$/,"$1").toLowerCase()
},bind:bind}
})();
var MATH=Math;
var JQUERY=window.jQuery;
var EASING=(function(){var _easingsMath={p:MATH.PI,c:MATH.cos,s:MATH.sin,w:MATH.pow,t:MATH.sqrt,n:MATH.asin,a:MATH.abs,o:1.70158};
return{swing:function(x,t,b,c,d){return 0.5-_easingsMath.c(x*_easingsMath.p)/2
},linear:function(x,t,b,c,d){return x
},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b
},easeOutQuad:function(x,t,b,c,d){return -c*(t/=d)*(t-2)+b
},easeInOutQuad:function(x,t,b,c,d){return((t/=d/2)<1)?c/2*t*t+b:-c/2*((--t)*(t-2)-1)+b
},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b
},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b
},easeInOutCubic:function(x,t,b,c,d){return((t/=d/2)<1)?c/2*t*t*t+b:c/2*((t-=2)*t*t+2)+b
},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b
},easeOutQuart:function(x,t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b
},easeInOutQuart:function(x,t,b,c,d){return((t/=d/2)<1)?c/2*t*t*t*t+b:-c/2*((t-=2)*t*t*t-2)+b
},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b
},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b
},easeInOutQuint:function(x,t,b,c,d){return((t/=d/2)<1)?c/2*t*t*t*t*t+b:c/2*((t-=2)*t*t*t*t+2)+b
},easeInSine:function(x,t,b,c,d){return -c*_easingsMath.c(t/d*(_easingsMath.p/2))+c+b
},easeOutSine:function(x,t,b,c,d){return c*_easingsMath.s(t/d*(_easingsMath.p/2))+b
},easeInOutSine:function(x,t,b,c,d){return -c/2*(_easingsMath.c(_easingsMath.p*t/d)-1)+b
},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*_easingsMath.w(2,10*(t/d-1))+b
},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-_easingsMath.w(2,-10*t/d)+1)+b
},easeInOutExpo:function(x,t,b,c,d){if(t==0){return b
}if(t==d){return b+c
}if((t/=d/2)<1){return c/2*_easingsMath.w(2,10*(t-1))+b
}return c/2*(-_easingsMath.w(2,-10*--t)+2)+b
},easeInCirc:function(x,t,b,c,d){return -c*(_easingsMath.t(1-(t/=d)*t)-1)+b
},easeOutCirc:function(x,t,b,c,d){return c*_easingsMath.t(1-(t=t/d-1)*t)+b
},easeInOutCirc:function(x,t,b,c,d){return((t/=d/2)<1)?-c/2*(_easingsMath.t(1-t*t)-1)+b:c/2*(_easingsMath.t(1-(t-=2)*t)+1)+b
},easeInElastic:function(x,t,b,c,d){var s=_easingsMath.o;
var p=0;
var a=c;
if(t==0){return b
}if((t/=d)==1){return b+c
}if(!p){p=d*0.3
}if(a<_easingsMath.a(c)){a=c;
s=p/4
}else{s=p/(2*_easingsMath.p)*_easingsMath.n(c/a)
}return -(a*_easingsMath.w(2,10*(t-=1))*_easingsMath.s((t*d-s)*(2*_easingsMath.p)/p))+b
},easeOutElastic:function(x,t,b,c,d){var s=_easingsMath.o;
var p=0;
var a=c;
if(t==0){return b
}if((t/=d)==1){return b+c
}if(!p){p=d*0.3
}if(a<_easingsMath.a(c)){a=c;
s=p/4
}else{s=p/(2*_easingsMath.p)*_easingsMath.n(c/a)
}return a*_easingsMath.w(2,-10*t)*_easingsMath.s((t*d-s)*(2*_easingsMath.p)/p)+c+b
},easeInOutElastic:function(x,t,b,c,d){var s=_easingsMath.o;
var p=0;
var a=c;
if(t==0){return b
}if((t/=d/2)==2){return b+c
}if(!p){p=d*(0.3*1.5)
}if(a<_easingsMath.a(c)){a=c;
s=p/4
}else{s=p/(2*_easingsMath.p)*_easingsMath.n(c/a)
}if(t<1){return -0.5*(a*_easingsMath.w(2,10*(t-=1))*_easingsMath.s((t*d-s)*(2*_easingsMath.p)/p))+b
}return a*_easingsMath.w(2,-10*(t-=1))*_easingsMath.s((t*d-s)*(2*_easingsMath.p)/p)*0.5+c+b
},easeInBack:function(x,t,b,c,d,s){s=s||_easingsMath.o;
return c*(t/=d)*t*((s+1)*t-s)+b
},easeOutBack:function(x,t,b,c,d,s){s=s||_easingsMath.o;
return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b
},easeInOutBack:function(x,t,b,c,d,s){s=s||_easingsMath.o;
return((t/=d/2)<1)?c/2*(t*t*(((s*=(1.525))+1)*t-s))+b:c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b
},easeInBounce:function(x,t,b,c,d){return c-this.easeOutBounce(x,d-t,0,c,d)+b
},easeOutBounce:function(x,t,b,c,d){var o=7.5625;
if((t/=d)<(1/2.75)){return c*(o*t*t)+b
}else{if(t<(2/2.75)){return c*(o*(t-=(1.5/2.75))*t+0.75)+b
}else{if(t<(2.5/2.75)){return c*(o*(t-=(2.25/2.75))*t+0.9375)+b
}else{return c*(o*(t-=(2.625/2.75))*t+0.984375)+b
}}}},easeInOutBounce:function(x,t,b,c,d){return(t<d/2)?this.easeInBounce(x,t*2,0,c,d)*0.5+b:this.easeOutBounce(x,t*2-d,0,c,d)*0.5+c*0.5+b
}}
})();
var FRAMEWORK=(function(){var _rnothtmlwhite=(/[^\x20\t\r\n\f]+/g);
var _strSpace=" ";
var _strEmpty="";
var _strScrollLeft="scrollLeft";
var _strScrollTop="scrollTop";
var _animations=[];
var _type=COMPATIBILITY.type;
var _cssNumber={animationIterationCount:true,columnCount:true,fillOpacity:true,flexGrow:true,flexShrink:true,fontWeight:true,lineHeight:true,opacity:true,order:true,orphans:true,widows:true,zIndex:true,zoom:true};
function extend(){var src,copyIsArray,copy,name,options,clone,target=arguments[0]||{},i=1,length=arguments[LEXICON.l],deep=false;
if(_type(target)==TYPES.b){deep=target;
target=arguments[1]||{};
i=2
}if(_type(target)!=TYPES.o&&!_type(target)==TYPES.f){target={}
}if(length===i){target=FakejQuery;
--i
}for(;
i<length;
i++){if((options=arguments[i])!=null){for(name in options){src=target[name];
copy=options[name];
if(target===copy){continue
}if(deep&&copy&&(isPlainObject(copy)||(copyIsArray=COMPATIBILITY.isA(copy)))){if(copyIsArray){copyIsArray=false;
clone=src&&COMPATIBILITY.isA(src)?src:[]
}else{clone=src&&isPlainObject(src)?src:{}
}target[name]=extend(deep,clone,copy)
}else{if(copy!==undefined){target[name]=copy
}}}}}return target
}function inArray(item,arr,fromIndex){for(var i=fromIndex||0;
i<arr[LEXICON.l];
i++){if(arr[i]===item){return i
}}return -1
}function isFunction(obj){return _type(obj)==TYPES.f
}function isEmptyObject(obj){for(var name in obj){return false
}return true
}function isPlainObject(obj){if(!obj||_type(obj)!=TYPES.o){return false
}var key;
var proto=LEXICON.p;
var hasOwnProperty=Object[proto].hasOwnProperty;
var hasOwnConstructor=hasOwnProperty.call(obj,"constructor");
var hasIsPrototypeOf=obj.constructor&&obj.constructor[proto]&&hasOwnProperty.call(obj.constructor[proto],"isPrototypeOf");
if(obj.constructor&&!hasOwnConstructor&&!hasIsPrototypeOf){return false
}for(key in obj){}return _type(key)==TYPES.u||hasOwnProperty.call(obj,key)
}function each(obj,callback){var i=0;
if(isArrayLike(obj)){for(;
i<obj[LEXICON.l];
i++){if(callback.call(obj[i],i,obj[i])===false){break
}}}else{for(i in obj){if(callback.call(obj[i],i,obj[i])===false){break
}}}return obj
}function isArrayLike(obj){var length=!!obj&&[LEXICON.l] in obj&&obj[LEXICON.l];
var t=_type(obj);
return isFunction(t)?false:(t==TYPES.a||length===0||_type(length)==TYPES.n&&length>0&&(length-1) in obj)
}function stripAndCollapse(value){var tokens=value.match(_rnothtmlwhite)||[];
return tokens.join(_strSpace)
}function matches(elem,selector){var nodeList=(elem.parentNode||document).querySelectorAll(selector)||[];
var i=nodeList[LEXICON.l];
while(i--){if(nodeList[i]==elem){return true
}}return false
}function insertAdjacentElement(el,strategy,child){if(COMPATIBILITY.isA(child)){for(var i=0;
i<child[LEXICON.l];
i++){insertAdjacentElement(el,strategy,child[i])
}}else{if(_type(child)==TYPES.s){el.insertAdjacentHTML(strategy,child)
}else{el.insertAdjacentElement(strategy,child.nodeType?child:child[0])
}}}function setCSSVal(el,prop,val){try{if(el[LEXICON.s][prop]!==undefined){el[LEXICON.s][prop]=parseCSSVal(prop,val)
}}catch(e){}}function parseCSSVal(prop,val){if(!_cssNumber[prop.toLowerCase()]&&_type(val)==TYPES.n){val+="px"
}return val
}function startNextAnimationInQ(animObj,removeFromQ){var index;
var nextAnim;
if(removeFromQ!==false){animObj.q.splice(0,1)
}if(animObj.q[LEXICON.l]>0){nextAnim=animObj.q[0];
animate(animObj.el,nextAnim.props,nextAnim.duration,nextAnim.easing,nextAnim.complete,true)
}else{index=inArray(animObj,_animations);
if(index>-1){_animations.splice(index,1)
}}}function setAnimationValue(el,prop,value){if(prop===_strScrollLeft||prop===_strScrollTop){el[prop]=value
}else{setCSSVal(el,prop,value)
}}function animate(el,props,options,easing,complete,guaranteedNext){var hasOptions=isPlainObject(options);
var from={};
var to={};
var i=0;
var key;
var animObj;
var start;
var progress;
var step;
var specialEasing;
var duration;
if(hasOptions){easing=options.easing;
start=options.start;
progress=options.progress;
step=options.step;
specialEasing=options.specialEasing;
complete=options.complete;
duration=options.duration
}else{duration=options
}specialEasing=specialEasing||{};
duration=duration||400;
easing=easing||"swing";
guaranteedNext=guaranteedNext||false;
for(;
i<_animations[LEXICON.l];
i++){if(_animations[i].el===el){animObj=_animations[i];
break
}}if(!animObj){animObj={el:el,q:[]};
_animations.push(animObj)
}for(key in props){if(key===_strScrollLeft||key===_strScrollTop){from[key]=el[key]
}else{from[key]=FakejQuery(el).css(key)
}}for(key in from){if(from[key]!==props[key]&&props[key]!==undefined){to[key]=props[key]
}}if(!isEmptyObject(to)){var timeNow;
var end;
var percent;
var fromVal;
var toVal;
var easedVal;
var timeStart;
var frame;
var elapsed;
var qPos=guaranteedNext?0:inArray(qObj,animObj.q);
var qObj={props:to,duration:hasOptions?options:duration,easing:easing,complete:complete};
if(qPos===-1){qPos=animObj.q[LEXICON.l];
animObj.q.push(qObj)
}if(qPos===0){if(duration>0){timeStart=COMPATIBILITY.now();
frame=function(){timeNow=COMPATIBILITY.now();
elapsed=(timeNow-timeStart);
end=qObj.stop||elapsed>=duration;
percent=1-((MATH.max(0,timeStart+duration-timeNow)/duration)||0);
for(key in to){fromVal=parseFloat(from[key]);
toVal=parseFloat(to[key]);
easedVal=(toVal-fromVal)*EASING[specialEasing[key]||easing](percent,percent*duration,0,1,duration)+fromVal;
setAnimationValue(el,key,easedVal);
if(isFunction(step)){step(easedVal,{elem:el,prop:key,start:fromVal,now:easedVal,end:toVal,pos:percent,options:{easing:easing,speacialEasing:specialEasing,duration:duration,complete:complete,step:step},startTime:timeStart})
}}if(isFunction(progress)){progress({},percent,MATH.max(0,duration-elapsed))
}if(end){startNextAnimationInQ(animObj);
if(isFunction(complete)){complete()
}}else{qObj.frame=COMPATIBILITY.rAF()(frame)
}};
qObj.frame=COMPATIBILITY.rAF()(frame)
}else{for(key in to){setAnimationValue(el,key,to[key])
}startNextAnimationInQ(animObj)
}}}else{if(guaranteedNext){startNextAnimationInQ(animObj)
}}}function stop(el,clearQ,jumpToEnd){var animObj;
var qObj;
var key;
var i=0;
for(;
i<_animations[LEXICON.l];
i++){animObj=_animations[i];
if(animObj.el===el){if(animObj.q[LEXICON.l]>0){qObj=animObj.q[0];
qObj.stop=true;
COMPATIBILITY.cAF()(qObj.frame);
animObj.q.splice(0,1);
if(jumpToEnd){for(key in qObj.props){setAnimationValue(el,key,qObj.props[key])
}}if(clearQ){animObj.q=[]
}else{startNextAnimationInQ(animObj,false)
}}break
}}}function elementIsVisible(el){return !!(el[LEXICON.oW]||el[LEXICON.oH]||el.getClientRects()[LEXICON.l])
}function FakejQuery(selector){if(arguments[LEXICON.l]===0){return this
}var base=new FakejQuery();
var elements=selector;
var i=0;
var elms;
var el;
if(_type(selector)==TYPES.s){elements=[];
if(selector.charAt(0)==="<"){el=document.createElement("div");
el.innerHTML=selector;
elms=el.children
}else{elms=document.querySelectorAll(selector)
}for(;
i<elms[LEXICON.l];
i++){elements.push(elms[i])
}}if(elements){if(_type(elements)!=TYPES.s&&(!isArrayLike(elements)||elements===window||elements===elements.self)){elements=[elements]
}for(i=0;
i<elements[LEXICON.l];
i++){base[i]=elements[i]
}base[LEXICON.l]=elements[LEXICON.l]
}return base
}FakejQuery[LEXICON.p]={on:function(eventName,handler){eventName=(eventName||_strEmpty).match(_rnothtmlwhite)||[_strEmpty];
var eventNameLength=eventName[LEXICON.l];
var i=0;
var el;
return this.each(function(){el=this;
try{if(el.addEventListener){for(;
i<eventNameLength;
i++){el.addEventListener(eventName[i],handler)
}}else{if(el.detachEvent){for(;
i<eventNameLength;
i++){el.attachEvent("on"+eventName[i],handler)
}}}}catch(e){}})
},off:function(eventName,handler){eventName=(eventName||_strEmpty).match(_rnothtmlwhite)||[_strEmpty];
var eventNameLength=eventName[LEXICON.l];
var i=0;
var el;
return this.each(function(){el=this;
try{if(el.removeEventListener){for(;
i<eventNameLength;
i++){el.removeEventListener(eventName[i],handler)
}}else{if(el.detachEvent){for(;
i<eventNameLength;
i++){el.detachEvent("on"+eventName[i],handler)
}}}}catch(e){}})
},one:function(eventName,handler){eventName=(eventName||_strEmpty).match(_rnothtmlwhite)||[_strEmpty];
return this.each(function(){var el=FakejQuery(this);
FakejQuery.each(eventName,function(i,oneEventName){var oneHandler=function(e){handler.call(this,e);
el.off(oneEventName,oneHandler)
};
el.on(oneEventName,oneHandler)
})
})
},trigger:function(eventName){var el;
var event;
return this.each(function(){el=this;
if(document.createEvent){event=document.createEvent("HTMLEvents");
event.initEvent(eventName,true,false);
el.dispatchEvent(event)
}else{el.fireEvent("on"+eventName)
}})
},append:function(child){return this.each(function(){insertAdjacentElement(this,"beforeend",child)
})
},prepend:function(child){return this.each(function(){insertAdjacentElement(this,"afterbegin",child)
})
},before:function(child){return this.each(function(){insertAdjacentElement(this,"beforebegin",child)
})
},after:function(child){return this.each(function(){insertAdjacentElement(this,"afterend",child)
})
},remove:function(){return this.each(function(){var el=this;
var parentNode=el.parentNode;
if(parentNode!=null){parentNode.removeChild(el)
}})
},unwrap:function(){var parents=[];
var i;
var el;
var parent;
this.each(function(){parent=this.parentNode;
if(inArray(parent,parents)===-1){parents.push(parent)
}});
for(i=0;
i<parents[LEXICON.l];
i++){el=parents[i];
parent=el.parentNode;
while(el.firstChild){parent.insertBefore(el.firstChild,el)
}parent.removeChild(el)
}return this
},wrapAll:function(wrapperHTML){var i;
var nodes=this;
var wrapper=FakejQuery(wrapperHTML)[0];
var deepest=wrapper;
var parent=nodes[0].parentNode;
var previousSibling=nodes[0].previousSibling;
while(deepest.childNodes[LEXICON.l]>0){deepest=deepest.childNodes[0]
}for(i=0;
nodes[LEXICON.l]-i;
deepest.firstChild===nodes[0]&&i++){deepest.appendChild(nodes[i])
}var nextSibling=previousSibling?previousSibling.nextSibling:parent.firstChild;
parent.insertBefore(wrapper,nextSibling);
return this
},wrapInner:function(wrapperHTML){return this.each(function(){var el=FakejQuery(this);
var contents=el.contents();
if(contents[LEXICON.l]){contents.wrapAll(wrapperHTML)
}else{el.append(wrapperHTML)
}})
},wrap:function(wrapperHTML){return this.each(function(){FakejQuery(this).wrapAll(wrapperHTML)
})
},css:function(styles,val){var el;
var key;
var cptStyle;
var getCptStyle=window.getComputedStyle;
if(_type(styles)==TYPES.s){if(val===undefined){el=this[0];
cptStyle=getCptStyle?getCptStyle(el,null):el.currentStyle[styles];
return getCptStyle?cptStyle!=null?cptStyle.getPropertyValue(styles):el[LEXICON.s][styles]:cptStyle
}else{return this.each(function(){setCSSVal(this,styles,val)
})
}}else{return this.each(function(){for(key in styles){setCSSVal(this,key,styles[key])
}})
}},hasClass:function(className){var elem,i=0;
var classNamePrepared=_strSpace+className+_strSpace;
var classList;
while((elem=this[i++])){classList=elem.classList;
if(classList&&classList.contains(className)){return true
}else{if(elem.nodeType===1&&(_strSpace+stripAndCollapse(elem.className+_strEmpty)+_strSpace).indexOf(classNamePrepared)>-1){return true
}}}return false
},addClass:function(className){var classes;
var elem;
var cur;
var curValue;
var clazz;
var finalValue;
var supportClassList;
var elmClassList;
var i=0;
var v=0;
if(className){classes=className.match(_rnothtmlwhite)||[];
while((elem=this[i++])){elmClassList=elem.classList;
if(supportClassList===undefined){supportClassList=elmClassList!==undefined
}if(supportClassList){while((clazz=classes[v++])){elmClassList.add(clazz)
}}else{curValue=elem.className+_strEmpty;
cur=elem.nodeType===1&&(_strSpace+stripAndCollapse(curValue)+_strSpace);
if(cur){while((clazz=classes[v++])){if(cur.indexOf(_strSpace+clazz+_strSpace)<0){cur+=clazz+_strSpace
}}finalValue=stripAndCollapse(cur);
if(curValue!==finalValue){elem.className=finalValue
}}}}}return this
},removeClass:function(className){var classes;
var elem;
var cur;
var curValue;
var clazz;
var finalValue;
var supportClassList;
var elmClassList;
var i=0;
var v=0;
if(className){classes=className.match(_rnothtmlwhite)||[];
while((elem=this[i++])){elmClassList=elem.classList;
if(supportClassList===undefined){supportClassList=elmClassList!==undefined
}if(supportClassList){while((clazz=classes[v++])){elmClassList.remove(clazz)
}}else{curValue=elem.className+_strEmpty;
cur=elem.nodeType===1&&(_strSpace+stripAndCollapse(curValue)+_strSpace);
if(cur){while((clazz=classes[v++])){while(cur.indexOf(_strSpace+clazz+_strSpace)>-1){cur=cur.replace(_strSpace+clazz+_strSpace,_strSpace)
}}finalValue=stripAndCollapse(cur);
if(curValue!==finalValue){elem.className=finalValue
}}}}}return this
},hide:function(){return this.each(function(){this[LEXICON.s].display="none"
})
},show:function(){return this.each(function(){this[LEXICON.s].display="block"
})
},attr:function(attrName,value){var i=0;
var el;
while(el=this[i++]){if(value===undefined){return el.getAttribute(attrName)
}el.setAttribute(attrName,value)
}return this
},removeAttr:function(attrName){return this.each(function(){this.removeAttribute(attrName)
})
},offset:function(){var el=this[0];
var rect=el[LEXICON.bCR]();
var scrollLeft=window.pageXOffset||document.documentElement[_strScrollLeft];
var scrollTop=window.pageYOffset||document.documentElement[_strScrollTop];
return{top:rect.top+scrollTop,left:rect.left+scrollLeft}
},position:function(){var el=this[0];
return{top:el.offsetTop,left:el.offsetLeft}
},scrollLeft:function(value){var i=0;
var el;
while(el=this[i++]){if(value===undefined){return el[_strScrollLeft]
}el[_strScrollLeft]=value
}return this
},scrollTop:function(value){var i=0;
var el;
while(el=this[i++]){if(value===undefined){return el[_strScrollTop]
}el[_strScrollTop]=value
}return this
},val:function(value){var el=this[0];
if(!value){return el.value
}el.value=value;
return this
},first:function(){return this.eq(0)
},last:function(){return this.eq(-1)
},eq:function(index){return FakejQuery(this[index>=0?index:this[LEXICON.l]+index])
},find:function(selector){var children=[];
var i;
this.each(function(){var el=this;
var ch=el.querySelectorAll(selector);
for(i=0;
i<ch[LEXICON.l];
i++){children.push(ch[i])
}});
return FakejQuery(children)
},children:function(selector){var children=[];
var el;
var ch;
var i;
this.each(function(){ch=this.children;
for(i=0;
i<ch[LEXICON.l];
i++){el=ch[i];
if(selector){if((el.matches&&el.matches(selector))||matches(el,selector)){children.push(el)
}}else{children.push(el)
}}});
return FakejQuery(children)
},parent:function(selector){var parents=[];
var parent;
this.each(function(){parent=this.parentNode;
if(selector?FakejQuery(parent).is(selector):true){parents.push(parent)
}});
return FakejQuery(parents)
},is:function(selector){var el;
var i;
for(i=0;
i<this[LEXICON.l];
i++){el=this[i];
if(selector===":visible"){return elementIsVisible(el)
}if(selector===":hidden"){return !elementIsVisible(el)
}if((el.matches&&el.matches(selector))||matches(el,selector)){return true
}}return false
},contents:function(){var contents=[];
var childs;
var i;
this.each(function(){childs=this.childNodes;
for(i=0;
i<childs[LEXICON.l];
i++){contents.push(childs[i])
}});
return FakejQuery(contents)
},each:function(callback){return each(this,callback)
},animate:function(props,duration,easing,complete){return this.each(function(){animate(this,props,duration,easing,complete)
})
},stop:function(clearQ,jump){return this.each(function(){stop(this,clearQ,jump)
})
}};
extend(FakejQuery,{extend:extend,inArray:inArray,isEmptyObject:isEmptyObject,isPlainObject:isPlainObject,each:each});
return FakejQuery
})();
var INSTANCES=(function(){var _targets=[];
var _instancePropertyString="__overlayScrollbars__";
return function(target,instance){var argLen=arguments[LEXICON.l];
if(argLen<1){return _targets
}else{if(instance){target[_instancePropertyString]=instance;
_targets.push(target)
}else{var index=COMPATIBILITY.inA(target,_targets);
if(index>-1){if(argLen>1){delete target[_instancePropertyString];
_targets.splice(index,1)
}else{return _targets[index][_instancePropertyString]
}}}}}
})();
var PLUGIN=(function(){var _plugin;
var _pluginsGlobals;
var _pluginsAutoUpdateLoop;
var _pluginsExtensions=[];
var _pluginsOptions=(function(){var type=COMPATIBILITY.type;
var possibleTemplateTypes=[TYPES.b,TYPES.n,TYPES.s,TYPES.a,TYPES.o,TYPES.f,TYPES.z];
var restrictedStringsSplit=" ";
var restrictedStringsPossibilitiesSplit=":";
var classNameAllowedValues=[TYPES.z,TYPES.s];
var numberAllowedValues=TYPES.n;
var booleanNullAllowedValues=[TYPES.z,TYPES.b];
var booleanTrueTemplate=[true,TYPES.b];
var booleanFalseTemplate=[false,TYPES.b];
var callbackTemplate=[null,[TYPES.z,TYPES.f]];
var updateOnLoadTemplate=[["img"],[TYPES.s,TYPES.a,TYPES.z]];
var inheritedAttrsTemplate=[["style","class"],[TYPES.s,TYPES.a,TYPES.z]];
var resizeAllowedValues="n:none b:both h:horizontal v:vertical";
var overflowBehaviorAllowedValues="v-h:visible-hidden v-s:visible-scroll s:scroll h:hidden";
var scrollbarsVisibilityAllowedValues="v:visible h:hidden a:auto";
var scrollbarsAutoHideAllowedValues="n:never s:scroll l:leave m:move";
var optionsDefaultsAndTemplate={className:["os-theme-dark",classNameAllowedValues],resize:["none",resizeAllowedValues],sizeAutoCapable:booleanTrueTemplate,clipAlways:booleanTrueTemplate,normalizeRTL:booleanTrueTemplate,paddingAbsolute:booleanFalseTemplate,autoUpdate:[null,booleanNullAllowedValues],autoUpdateInterval:[33,numberAllowedValues],updateOnLoad:updateOnLoadTemplate,nativeScrollbarsOverlaid:{showNativeScrollbars:booleanFalseTemplate,initialize:booleanTrueTemplate},overflowBehavior:{x:["scroll",overflowBehaviorAllowedValues],y:["scroll",overflowBehaviorAllowedValues]},scrollbars:{visibility:["auto",scrollbarsVisibilityAllowedValues],autoHide:["never",scrollbarsAutoHideAllowedValues],autoHideDelay:[800,numberAllowedValues],dragScrolling:booleanTrueTemplate,clickScrolling:booleanFalseTemplate,touchSupport:booleanTrueTemplate,snapHandle:booleanFalseTemplate},textarea:{dynWidth:booleanFalseTemplate,dynHeight:booleanFalseTemplate,inheritedAttrs:inheritedAttrsTemplate},callbacks:{onInitialized:callbackTemplate,onInitializationWithdrawn:callbackTemplate,onDestroyed:callbackTemplate,onScrollStart:callbackTemplate,onScroll:callbackTemplate,onScrollStop:callbackTemplate,onOverflowChanged:callbackTemplate,onOverflowAmountChanged:callbackTemplate,onDirectionChanged:callbackTemplate,onContentSizeChanged:callbackTemplate,onHostSizeChanged:callbackTemplate,onUpdated:callbackTemplate}};
var convert=function(template){var recursive=function(obj){var key;
var val;
var valType;
for(key in obj){if(!obj[LEXICON.hOP](key)){continue
}val=obj[key];
valType=type(val);
if(valType==TYPES.a){obj[key]=val[template?1:0]
}else{if(valType==TYPES.o){obj[key]=recursive(val)
}}}return obj
};
return recursive(FRAMEWORK.extend(true,{},optionsDefaultsAndTemplate))
};
return{_defaults:convert(),_template:convert(true),_validate:function(obj,template,writeErrors,diffObj){var validatedOptions={};
var validatedOptionsPrepared={};
var objectCopy=FRAMEWORK.extend(true,{},obj);
var inArray=FRAMEWORK.inArray;
var isEmptyObj=FRAMEWORK.isEmptyObject;
var checkObjectProps=function(data,template,diffData,validatedOptions,validatedOptionsPrepared,prevPropName){for(var prop in template){if(template[LEXICON.hOP](prop)&&data[LEXICON.hOP](prop)){var isValid=false;
var isDiff=false;
var templateValue=template[prop];
var templateValueType=type(templateValue);
var templateIsComplex=templateValueType==TYPES.o;
var templateTypes=!COMPATIBILITY.isA(templateValue)?[templateValue]:templateValue;
var dataDiffValue=diffData[prop];
var dataValue=data[prop];
var dataValueType=type(dataValue);
var propPrefix=prevPropName?prevPropName+".":"";
var error='The option "'+propPrefix+prop+"\" wasn't set, because";
var errorPossibleTypes=[];
var errorRestrictedStrings=[];
var restrictedStringValuesSplit;
var restrictedStringValuesPossibilitiesSplit;
var isRestrictedValue;
var mainPossibility;
var currType;
var i;
var v;
var j;
dataDiffValue=dataDiffValue===undefined?{}:dataDiffValue;
if(templateIsComplex&&dataValueType==TYPES.o){validatedOptions[prop]={};
validatedOptionsPrepared[prop]={};
checkObjectProps(dataValue,templateValue,dataDiffValue,validatedOptions[prop],validatedOptionsPrepared[prop],propPrefix+prop);
FRAMEWORK.each([data,validatedOptions,validatedOptionsPrepared],function(index,value){if(isEmptyObj(value[prop])){delete value[prop]
}})
}else{if(!templateIsComplex){for(i=0;
i<templateTypes[LEXICON.l];
i++){currType=templateTypes[i];
templateValueType=type(currType);
isRestrictedValue=templateValueType==TYPES.s&&inArray(currType,possibleTemplateTypes)===-1;
if(isRestrictedValue){errorPossibleTypes.push(TYPES.s);
restrictedStringValuesSplit=currType.split(restrictedStringsSplit);
errorRestrictedStrings=errorRestrictedStrings.concat(restrictedStringValuesSplit);
for(v=0;
v<restrictedStringValuesSplit[LEXICON.l];
v++){restrictedStringValuesPossibilitiesSplit=restrictedStringValuesSplit[v].split(restrictedStringsPossibilitiesSplit);
mainPossibility=restrictedStringValuesPossibilitiesSplit[0];
for(j=0;
j<restrictedStringValuesPossibilitiesSplit[LEXICON.l];
j++){if(dataValue===restrictedStringValuesPossibilitiesSplit[j]){isValid=true;
break
}}if(isValid){break
}}}else{errorPossibleTypes.push(currType);
if(dataValueType===currType){isValid=true;
break
}}}if(isValid){isDiff=dataValue!==dataDiffValue;
if(isDiff){validatedOptions[prop]=dataValue
}if(isRestrictedValue?inArray(dataDiffValue,restrictedStringValuesPossibilitiesSplit)<0:isDiff){validatedOptionsPrepared[prop]=isRestrictedValue?mainPossibility:dataValue
}}else{if(writeErrors){console.warn(error+" it doesn't accept the type [ "+dataValueType.toUpperCase()+' ] with the value of "'+dataValue+'".\r\nAccepted types are: [ '+errorPossibleTypes.join(", ").toUpperCase()+" ]."+(errorRestrictedStrings[length]>0?"\r\nValid strings are: [ "+errorRestrictedStrings.join(", ").split(restrictedStringsPossibilitiesSplit).join(", ")+" ].":""))
}}delete data[prop]
}}}}};
checkObjectProps(objectCopy,template,diffObj||{},validatedOptions,validatedOptionsPrepared);
if(!isEmptyObj(objectCopy)&&writeErrors){console.warn("The following options are discarded due to invalidity:\r\n"+window.JSON.stringify(objectCopy,null,2))
}return{_default:validatedOptions,_prepared:validatedOptionsPrepared}
}}
}());
function initOverlayScrollbarsStatics(){if(!_pluginsGlobals){_pluginsGlobals=new OverlayScrollbarsGlobals(_pluginsOptions._defaults)
}if(!_pluginsAutoUpdateLoop){_pluginsAutoUpdateLoop=new OverlayScrollbarsAutoUpdateLoop(_pluginsGlobals)
}}function OverlayScrollbarsGlobals(defaultOptions){var _base=this;
var strOverflow="overflow";
var strHidden="hidden";
var strScroll="scroll";
var bodyElement=FRAMEWORK("body");
var scrollbarDummyElement=FRAMEWORK('<div id="os-dummy-scrollbar-size"><div></div></div>');
var scrollbarDummyElement0=scrollbarDummyElement[0];
var dummyContainerChild=FRAMEWORK(scrollbarDummyElement.children("div").eq(0));
bodyElement.append(scrollbarDummyElement);
scrollbarDummyElement.hide().show();
var nativeScrollbarSize=calcNativeScrollbarSize(scrollbarDummyElement0);
var nativeScrollbarIsOverlaid={x:nativeScrollbarSize.x===0,y:nativeScrollbarSize.y===0};
var msie=(function(){var ua=window.navigator.userAgent;
var strIndexOf="indexOf";
var strSubString="substring";
var msie=ua[strIndexOf]("MSIE ");
var trident=ua[strIndexOf]("Trident/");
var edge=ua[strIndexOf]("Edge/");
var rv=ua[strIndexOf]("rv:");
var result;
var parseIntFunc=parseInt;
if(msie>0){result=parseIntFunc(ua[strSubString](msie+5,ua[strIndexOf](".",msie)),10)
}else{if(trident>0){result=parseIntFunc(ua[strSubString](rv+3,ua[strIndexOf](".",rv)),10)
}else{if(edge>0){result=parseIntFunc(ua[strSubString](edge+5,ua[strIndexOf](".",edge)),10)
}}}return result
})();
FRAMEWORK.extend(_base,{defaultOptions:defaultOptions,msie:msie,autoUpdateLoop:false,autoUpdateRecommended:!COMPATIBILITY.mO(),nativeScrollbarSize:nativeScrollbarSize,nativeScrollbarIsOverlaid:nativeScrollbarIsOverlaid,nativeScrollbarStyling:(function(){var result=false;
scrollbarDummyElement.addClass("os-viewport-native-scrollbars-invisible");
try{result=(scrollbarDummyElement.css("scrollbar-width")==="none"&&(msie>9||!msie))||window.getComputedStyle(scrollbarDummyElement0,"::-webkit-scrollbar").getPropertyValue("display")==="none"
}catch(ex){}return result
})(),overlayScrollbarDummySize:{x:30,y:30},cssCalc:VENDORS._cssPropertyValue("width","calc","(1px)")||null,restrictedMeasuring:(function(){scrollbarDummyElement.css(strOverflow,strHidden);
var scrollSize={w:scrollbarDummyElement0[LEXICON.sW],h:scrollbarDummyElement0[LEXICON.sH]};
scrollbarDummyElement.css(strOverflow,"visible");
var scrollSize2={w:scrollbarDummyElement0[LEXICON.sW],h:scrollbarDummyElement0[LEXICON.sH]};
return(scrollSize.w-scrollSize2.w)!==0||(scrollSize.h-scrollSize2.h)!==0
})(),rtlScrollBehavior:(function(){scrollbarDummyElement.css({"overflow-y":strHidden,"overflow-x":strScroll,direction:"rtl"}).scrollLeft(0);
var dummyContainerOffset=scrollbarDummyElement.offset();
var dummyContainerChildOffset=dummyContainerChild.offset();
scrollbarDummyElement.scrollLeft(-999);
var dummyContainerChildOffsetAfterScroll=dummyContainerChild.offset();
return{i:dummyContainerOffset.left===dummyContainerChildOffset.left,n:dummyContainerChildOffset.left!==dummyContainerChildOffsetAfterScroll.left}
})(),supportTransform:!!VENDORS._cssProperty("transform"),supportTransition:!!VENDORS._cssProperty("transition"),supportPassiveEvents:(function(){var supportsPassive=false;
try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){supportsPassive=true
}}))
}catch(e){}return supportsPassive
})(),supportResizeObserver:!!COMPATIBILITY.rO(),supportMutationObserver:!!COMPATIBILITY.mO()});
scrollbarDummyElement.removeAttr(LEXICON.s).remove();
(function(){if(nativeScrollbarIsOverlaid.x&&nativeScrollbarIsOverlaid.y){return
}var abs=MATH.abs;
var windowWidth=COMPATIBILITY.wW();
var windowHeight=COMPATIBILITY.wH();
var windowDpr=getWindowDPR();
var onResize=function(){if(INSTANCES().length>0){var newW=COMPATIBILITY.wW();
var newH=COMPATIBILITY.wH();
var deltaW=newW-windowWidth;
var deltaH=newH-windowHeight;
if(deltaW===0&&deltaH===0){return
}var deltaWRatio=MATH.round(newW/(windowWidth/100));
var deltaHRatio=MATH.round(newH/(windowHeight/100));
var absDeltaW=abs(deltaW);
var absDeltaH=abs(deltaH);
var absDeltaWRatio=abs(deltaWRatio);
var absDeltaHRatio=abs(deltaHRatio);
var newDPR=getWindowDPR();
var deltaIsBigger=absDeltaW>2&&absDeltaH>2;
var difference=!differenceIsBiggerThanOne(absDeltaWRatio,absDeltaHRatio);
var dprChanged=newDPR!==windowDpr&&windowDpr>0;
var isZoom=deltaIsBigger&&difference&&dprChanged;
var oldScrollbarSize=_base.nativeScrollbarSize;
var newScrollbarSize;
if(isZoom){bodyElement.append(scrollbarDummyElement);
newScrollbarSize=_base.nativeScrollbarSize=calcNativeScrollbarSize(scrollbarDummyElement[0]);
scrollbarDummyElement.remove();
if(oldScrollbarSize.x!==newScrollbarSize.x||oldScrollbarSize.y!==newScrollbarSize.y){FRAMEWORK.each(INSTANCES(),function(){if(INSTANCES(this)){INSTANCES(this).update("zoom")
}})
}}windowWidth=newW;
windowHeight=newH;
windowDpr=newDPR
}};
function differenceIsBiggerThanOne(valOne,valTwo){var absValOne=abs(valOne);
var absValTwo=abs(valTwo);
return !(absValOne===absValTwo||absValOne+1===absValTwo||absValOne-1===absValTwo)
}function getWindowDPR(){var dDPI=window.screen.deviceXDPI||0;
var sDPI=window.screen.logicalXDPI||1;
return window.devicePixelRatio||(dDPI/sDPI)
}FRAMEWORK(window).on("resize",onResize)
})();
function calcNativeScrollbarSize(measureElement){return{x:measureElement[LEXICON.oH]-measureElement[LEXICON.cH],y:measureElement[LEXICON.oW]-measureElement[LEXICON.cW]}
}}function OverlayScrollbarsAutoUpdateLoop(globals){var _base=this;
var _inArray=FRAMEWORK.inArray;
var _getNow=COMPATIBILITY.now;
var _strAutoUpdate="autoUpdate";
var _strAutoUpdateInterval=_strAutoUpdate+"Interval";
var _strLength=LEXICON.l;
var _loopingInstances=[];
var _loopingInstancesIntervalCache=[];
var _loopIsActive=false;
var _loopIntervalDefault=33;
var _loopInterval=_loopIntervalDefault;
var _loopTimeOld=_getNow();
var _loopID;
var loop=function(){if(_loopingInstances[_strLength]>0&&_loopIsActive){_loopID=COMPATIBILITY.rAF()(function(){loop()
});
var timeNew=_getNow();
var timeDelta=timeNew-_loopTimeOld;
var lowestInterval;
var instance;
var instanceOptions;
var instanceAutoUpdateAllowed;
var instanceAutoUpdateInterval;
var now;
if(timeDelta>_loopInterval){_loopTimeOld=timeNew-(timeDelta%_loopInterval);
lowestInterval=_loopIntervalDefault;
for(var i=0;
i<_loopingInstances[_strLength];
i++){instance=_loopingInstances[i];
if(instance!==undefined){instanceOptions=instance.options();
instanceAutoUpdateAllowed=instanceOptions[_strAutoUpdate];
instanceAutoUpdateInterval=MATH.max(1,instanceOptions[_strAutoUpdateInterval]);
now=_getNow();
if((instanceAutoUpdateAllowed===true||instanceAutoUpdateAllowed===null)&&(now-_loopingInstancesIntervalCache[i])>instanceAutoUpdateInterval){instance.update("auto");
_loopingInstancesIntervalCache[i]=new Date(now+=instanceAutoUpdateInterval)
}lowestInterval=MATH.max(1,MATH.min(lowestInterval,instanceAutoUpdateInterval))
}}_loopInterval=lowestInterval
}}else{_loopInterval=_loopIntervalDefault
}};
_base.add=function(instance){if(_inArray(instance,_loopingInstances)===-1){_loopingInstances.push(instance);
_loopingInstancesIntervalCache.push(_getNow());
if(_loopingInstances[_strLength]>0&&!_loopIsActive){_loopIsActive=true;
globals.autoUpdateLoop=_loopIsActive;
loop()
}}};
_base.remove=function(instance){var index=_inArray(instance,_loopingInstances);
if(index>-1){_loopingInstancesIntervalCache.splice(index,1);
_loopingInstances.splice(index,1);
if(_loopingInstances[_strLength]===0&&_loopIsActive){_loopIsActive=false;
globals.autoUpdateLoop=_loopIsActive;
if(_loopID!==undefined){COMPATIBILITY.cAF()(_loopID);
_loopID=-1
}}}}
}function OverlayScrollbarsInstance(pluginTargetElement,options,extensions,globals,autoUpdateLoop){var type=COMPATIBILITY.type;
var inArray=FRAMEWORK.inArray;
var each=FRAMEWORK.each;
var _base=new _plugin();
var _frameworkProto=FRAMEWORK[LEXICON.p];
if(!isHTMLElement(pluginTargetElement)){return
}if(INSTANCES(pluginTargetElement)){var inst=INSTANCES(pluginTargetElement);
inst.options(options);
return inst
}var _nativeScrollbarIsOverlaid;
var _overlayScrollbarDummySize;
var _rtlScrollBehavior;
var _autoUpdateRecommended;
var _msieVersion;
var _nativeScrollbarStyling;
var _cssCalc;
var _nativeScrollbarSize;
var _supportTransition;
var _supportTransform;
var _supportPassiveEvents;
var _supportResizeObserver;
var _supportMutationObserver;
var _restrictedMeasuring;
var _initialized;
var _destroyed;
var _isTextarea;
var _isBody;
var _documentMixed;
var _domExists;
var _isBorderBox;
var _sizeAutoObserverAdded;
var _paddingX;
var _paddingY;
var _borderX;
var _borderY;
var _marginX;
var _marginY;
var _isRTL;
var _sleeping;
var _contentBorderSize={};
var _scrollHorizontalInfo={};
var _scrollVerticalInfo={};
var _viewportSize={};
var _nativeScrollbarMinSize={};
var _strMinusHidden="-hidden";
var _strMarginMinus="margin-";
var _strPaddingMinus="padding-";
var _strBorderMinus="border-";
var _strTop="top";
var _strRight="right";
var _strBottom="bottom";
var _strLeft="left";
var _strMinMinus="min-";
var _strMaxMinus="max-";
var _strWidth="width";
var _strHeight="height";
var _strFloat="float";
var _strEmpty="";
var _strAuto="auto";
var _strSync="sync";
var _strScroll="scroll";
var _strHundredPercent="100%";
var _strX="x";
var _strY="y";
var _strDot=".";
var _strSpace=" ";
var _strScrollbar="scrollbar";
var _strMinusHorizontal="-horizontal";
var _strMinusVertical="-vertical";
var _strScrollLeft=_strScroll+"Left";
var _strScrollTop=_strScroll+"Top";
var _strMouseTouchDownEvent="mousedown touchstart";
var _strMouseTouchUpEvent="mouseup touchend touchcancel";
var _strMouseTouchMoveEvent="mousemove touchmove";
var _strMouseEnter="mouseenter";
var _strMouseLeave="mouseleave";
var _strKeyDownEvent="keydown";
var _strKeyUpEvent="keyup";
var _strSelectStartEvent="selectstart";
var _strTransitionEndEvent="transitionend webkitTransitionEnd oTransitionEnd";
var _strResizeObserverProperty="__overlayScrollbarsRO__";
var _cassNamesPrefix="os-";
var _classNameHTMLElement=_cassNamesPrefix+"html";
var _classNameHostElement=_cassNamesPrefix+"host";
var _classNameHostElementForeign=_classNameHostElement+"-foreign";
var _classNameHostTextareaElement=_classNameHostElement+"-textarea";
var _classNameHostScrollbarHorizontalHidden=_classNameHostElement+"-"+_strScrollbar+_strMinusHorizontal+_strMinusHidden;
var _classNameHostScrollbarVerticalHidden=_classNameHostElement+"-"+_strScrollbar+_strMinusVertical+_strMinusHidden;
var _classNameHostTransition=_classNameHostElement+"-transition";
var _classNameHostRTL=_classNameHostElement+"-rtl";
var _classNameHostResizeDisabled=_classNameHostElement+"-resize-disabled";
var _classNameHostScrolling=_classNameHostElement+"-scrolling";
var _classNameHostOverflow=_classNameHostElement+"-overflow";
var _classNameHostOverflow=_classNameHostElement+"-overflow";
var _classNameHostOverflowX=_classNameHostOverflow+"-x";
var _classNameHostOverflowY=_classNameHostOverflow+"-y";
var _classNameTextareaElement=_cassNamesPrefix+"textarea";
var _classNameTextareaCoverElement=_classNameTextareaElement+"-cover";
var _classNamePaddingElement=_cassNamesPrefix+"padding";
var _classNameViewportElement=_cassNamesPrefix+"viewport";
var _classNameViewportNativeScrollbarsInvisible=_classNameViewportElement+"-native-scrollbars-invisible";
var _classNameViewportNativeScrollbarsOverlaid=_classNameViewportElement+"-native-scrollbars-overlaid";
var _classNameContentElement=_cassNamesPrefix+"content";
var _classNameContentArrangeElement=_cassNamesPrefix+"content-arrange";
var _classNameContentGlueElement=_cassNamesPrefix+"content-glue";
var _classNameSizeAutoObserverElement=_cassNamesPrefix+"size-auto-observer";
var _classNameResizeObserverElement=_cassNamesPrefix+"resize-observer";
var _classNameResizeObserverItemElement=_cassNamesPrefix+"resize-observer-item";
var _classNameResizeObserverItemFinalElement=_classNameResizeObserverItemElement+"-final";
var _classNameTextInherit=_cassNamesPrefix+"text-inherit";
var _classNameScrollbar=_cassNamesPrefix+_strScrollbar;
var _classNameScrollbarTrack=_classNameScrollbar+"-track";
var _classNameScrollbarTrackOff=_classNameScrollbarTrack+"-off";
var _classNameScrollbarHandle=_classNameScrollbar+"-handle";
var _classNameScrollbarHandleOff=_classNameScrollbarHandle+"-off";
var _classNameScrollbarUnusable=_classNameScrollbar+"-unusable";
var _classNameScrollbarAutoHidden=_classNameScrollbar+"-"+_strAuto+_strMinusHidden;
var _classNameScrollbarCorner=_classNameScrollbar+"-corner";
var _classNameScrollbarCornerResize=_classNameScrollbarCorner+"-resize";
var _classNameScrollbarCornerResizeB=_classNameScrollbarCornerResize+"-both";
var _classNameScrollbarCornerResizeH=_classNameScrollbarCornerResize+_strMinusHorizontal;
var _classNameScrollbarCornerResizeV=_classNameScrollbarCornerResize+_strMinusVertical;
var _classNameScrollbarHorizontal=_classNameScrollbar+_strMinusHorizontal;
var _classNameScrollbarVertical=_classNameScrollbar+_strMinusVertical;
var _classNameDragging=_cassNamesPrefix+"dragging";
var _classNameThemeNone=_cassNamesPrefix+"theme-none";
var _classNamesDynamicDestroy=[_classNameViewportNativeScrollbarsInvisible,_classNameViewportNativeScrollbarsOverlaid,_classNameScrollbarTrackOff,_classNameScrollbarHandleOff,_classNameScrollbarUnusable,_classNameScrollbarAutoHidden,_classNameScrollbarCornerResize,_classNameScrollbarCornerResizeB,_classNameScrollbarCornerResizeH,_classNameScrollbarCornerResizeV,_classNameDragging].join(_strSpace);
var _callbacksInitQeueue=[];
var _viewportAttrsFromTarget=[LEXICON.ti];
var _defaultOptions;
var _currentOptions;
var _currentPreparedOptions;
var _extensions={};
var _extensionsPrivateMethods="added removed on contract";
var _lastUpdateTime;
var _swallowedUpdateHints={};
var _swallowedUpdateTimeout;
var _swallowUpdateLag=42;
var _updateOnLoadEventName="load";
var _updateOnLoadElms=[];
var _windowElement;
var _documentElement;
var _htmlElement;
var _bodyElement;
var _targetElement;
var _hostElement;
var _sizeAutoObserverElement;
var _sizeObserverElement;
var _paddingElement;
var _viewportElement;
var _contentElement;
var _contentArrangeElement;
var _contentGlueElement;
var _textareaCoverElement;
var _scrollbarCornerElement;
var _scrollbarHorizontalElement;
var _scrollbarHorizontalTrackElement;
var _scrollbarHorizontalHandleElement;
var _scrollbarVerticalElement;
var _scrollbarVerticalTrackElement;
var _scrollbarVerticalHandleElement;
var _windowElementNative;
var _documentElementNative;
var _targetElementNative;
var _hostElementNative;
var _sizeAutoObserverElementNative;
var _sizeObserverElementNative;
var _paddingElementNative;
var _viewportElementNative;
var _contentElementNative;
var _hostSizeCache;
var _contentScrollSizeCache;
var _arrangeContentSizeCache;
var _hasOverflowCache;
var _hideOverflowCache;
var _widthAutoCache;
var _heightAutoCache;
var _cssBoxSizingCache;
var _cssPaddingCache;
var _cssBorderCache;
var _cssMarginCache;
var _cssDirectionCache;
var _cssDirectionDetectedCache;
var _paddingAbsoluteCache;
var _clipAlwaysCache;
var _contentGlueSizeCache;
var _overflowBehaviorCache;
var _overflowAmountCache;
var _ignoreOverlayScrollbarHidingCache;
var _autoUpdateCache;
var _sizeAutoCapableCache;
var _contentElementScrollSizeChangeDetectedCache;
var _hostElementSizeChangeDetectedCache;
var _scrollbarsVisibilityCache;
var _scrollbarsAutoHideCache;
var _scrollbarsClickScrollingCache;
var _scrollbarsDragScrollingCache;
var _resizeCache;
var _normalizeRTLCache;
var _classNameCache;
var _oldClassName;
var _textareaAutoWrappingCache;
var _textareaInfoCache;
var _textareaSizeCache;
var _textareaDynHeightCache;
var _textareaDynWidthCache;
var _bodyMinSizeCache;
var _updateAutoCache={};
var _mutationObserverHost;
var _mutationObserverContent;
var _mutationObserverHostCallback;
var _mutationObserverContentCallback;
var _mutationObserversConnected;
var _mutationObserverAttrsTextarea=["wrap","cols","rows"];
var _mutationObserverAttrsHost=[LEXICON.i,LEXICON.c,LEXICON.s,"open"].concat(_viewportAttrsFromTarget);
var _destroyEvents=[];
var _textareaHasFocus;
var _scrollbarsAutoHideTimeoutId;
var _scrollbarsAutoHideMoveTimeoutId;
var _scrollbarsAutoHideDelay;
var _scrollbarsAutoHideNever;
var _scrollbarsAutoHideScroll;
var _scrollbarsAutoHideMove;
var _scrollbarsAutoHideLeave;
var _scrollbarsHandleHovered;
var _scrollbarsHandlesDefineScrollPos;
var _resizeNone;
var _resizeBoth;
var _resizeHorizontal;
var _resizeVertical;
function setupResponsiveEventListener(element,eventNames,listener,remove,passiveOrOptions){var collected=COMPATIBILITY.isA(eventNames)&&COMPATIBILITY.isA(listener);
var method=remove?"removeEventListener":"addEventListener";
var onOff=remove?"off":"on";
var events=collected?false:eventNames.split(_strSpace);
var i=0;
var passiveOrOptionsIsObj=FRAMEWORK.isPlainObject(passiveOrOptions);
var passive=(_supportPassiveEvents&&(passiveOrOptionsIsObj?(passiveOrOptions._passive):passiveOrOptions))||false;
var capture=passiveOrOptionsIsObj&&(passiveOrOptions._capture||false);
var nativeParam=_supportPassiveEvents?{passive:passive,capture:capture}:capture;
if(collected){for(;
i<eventNames[LEXICON.l];
i++){setupResponsiveEventListener(element,eventNames[i],listener[i],remove,passiveOrOptions)
}}else{for(;
i<events[LEXICON.l];
i++){if(_supportPassiveEvents){element[0][method](events[i],listener,nativeParam)
}else{element[onOff](events[i],listener)
}}}}function addDestroyEventListener(element,eventNames,listener,passive){setupResponsiveEventListener(element,eventNames,listener,false,passive);
_destroyEvents.push(COMPATIBILITY.bind(setupResponsiveEventListener,0,element,eventNames,listener,true,passive))
}function setupResizeObserver(targetElement,onElementResizedCallback){if(targetElement){var resizeObserver=COMPATIBILITY.rO();
var strAnimationStartEvent="animationstart mozAnimationStart webkitAnimationStart MSAnimationStart";
var strChildNodes="childNodes";
var constScroll=3333333;
var callback=function(){targetElement[_strScrollTop](constScroll)[_strScrollLeft](_isRTL?_rtlScrollBehavior.n?-constScroll:_rtlScrollBehavior.i?0:constScroll:constScroll);
onElementResizedCallback()
};
if(onElementResizedCallback){if(_supportResizeObserver){var element=targetElement.addClass("observed").append(generateDiv(_classNameResizeObserverElement)).contents()[0];
var observer=element[_strResizeObserverProperty]=new resizeObserver(callback);
observer.observe(element)
}else{if(_msieVersion>9||!_autoUpdateRecommended){targetElement.prepend(generateDiv(_classNameResizeObserverElement,generateDiv({c:_classNameResizeObserverItemElement,dir:"ltr"},generateDiv(_classNameResizeObserverItemElement,generateDiv(_classNameResizeObserverItemFinalElement))+generateDiv(_classNameResizeObserverItemElement,generateDiv({c:_classNameResizeObserverItemFinalElement,style:"width: 200%; height: 200%"})))));
var observerElement=targetElement[0][strChildNodes][0][strChildNodes][0];
var shrinkElement=FRAMEWORK(observerElement[strChildNodes][1]);
var expandElement=FRAMEWORK(observerElement[strChildNodes][0]);
var expandElementChild=FRAMEWORK(expandElement[0][strChildNodes][0]);
var widthCache=observerElement[LEXICON.oW];
var heightCache=observerElement[LEXICON.oH];
var isDirty;
var rAFId;
var currWidth;
var currHeight;
var factor=2;
var nativeScrollbarSize=globals.nativeScrollbarSize;
var reset=function(){expandElement[_strScrollLeft](constScroll)[_strScrollTop](constScroll);
shrinkElement[_strScrollLeft](constScroll)[_strScrollTop](constScroll)
};
var onResized=function(){rAFId=0;
if(!isDirty){return
}widthCache=currWidth;
heightCache=currHeight;
callback()
};
var onScroll=function(event){currWidth=observerElement[LEXICON.oW];
currHeight=observerElement[LEXICON.oH];
isDirty=currWidth!=widthCache||currHeight!=heightCache;
if(event&&isDirty&&!rAFId){COMPATIBILITY.cAF()(rAFId);
rAFId=COMPATIBILITY.rAF()(onResized)
}else{if(!event){onResized()
}}reset();
if(event){COMPATIBILITY.prvD(event);
COMPATIBILITY.stpP(event)
}return false
};
var expandChildCSS={};
var observerElementCSS={};
setTopRightBottomLeft(observerElementCSS,_strEmpty,[-((nativeScrollbarSize.y+1)*factor),nativeScrollbarSize.x*-factor,nativeScrollbarSize.y*-factor,-((nativeScrollbarSize.x+1)*factor)]);
FRAMEWORK(observerElement).css(observerElementCSS);
expandElement.on(_strScroll,onScroll);
shrinkElement.on(_strScroll,onScroll);
targetElement.on(strAnimationStartEvent,function(){onScroll(false)
});
expandChildCSS[_strWidth]=constScroll;
expandChildCSS[_strHeight]=constScroll;
expandElementChild.css(expandChildCSS);
reset()
}else{var attachEvent=_documentElementNative.attachEvent;
var isIE=_msieVersion!==undefined;
if(attachEvent){targetElement.prepend(generateDiv(_classNameResizeObserverElement));
findFirst(targetElement,_strDot+_classNameResizeObserverElement)[0].attachEvent("onresize",callback)
}else{var obj=_documentElementNative.createElement(TYPES.o);
obj.setAttribute(LEXICON.ti,"-1");
obj.setAttribute(LEXICON.c,_classNameResizeObserverElement);
obj.onload=function(){var wnd=this.contentDocument.defaultView;
wnd.addEventListener("resize",callback);
wnd.document.documentElement.style.display="none"
};
obj.type="text/html";
if(isIE){targetElement.prepend(obj)
}obj.data="about:blank";
if(!isIE){targetElement.prepend(obj)
}targetElement.on(strAnimationStartEvent,callback)
}}}if(targetElement[0]===_sizeObserverElementNative){var directionChanged=function(){var dir=_hostElement.css("direction");
var css={};
var scrollLeftValue=0;
var result=false;
if(dir!==_cssDirectionDetectedCache){if(dir==="ltr"){css[_strLeft]=0;
css[_strRight]=_strAuto;
scrollLeftValue=constScroll
}else{css[_strLeft]=_strAuto;
css[_strRight]=0;
scrollLeftValue=_rtlScrollBehavior.n?-constScroll:_rtlScrollBehavior.i?0:constScroll
}_sizeObserverElement.children().eq(0).css(css);
_sizeObserverElement[_strScrollLeft](scrollLeftValue)[_strScrollTop](constScroll);
_cssDirectionDetectedCache=dir;
result=true
}return result
};
directionChanged();
addDestroyEventListener(targetElement,_strScroll,function(event){if(directionChanged()){update()
}COMPATIBILITY.prvD(event);
COMPATIBILITY.stpP(event);
return false
})
}}else{if(_supportResizeObserver){var element=targetElement.contents()[0];
var resizeObserverObj=element[_strResizeObserverProperty];
if(resizeObserverObj){resizeObserverObj.disconnect();
delete element[_strResizeObserverProperty]
}}else{remove(targetElement.children(_strDot+_classNameResizeObserverElement).eq(0))
}}}}function createMutationObservers(){if(_supportMutationObserver){var mutationObserverContentLag=11;
var mutationObserver=COMPATIBILITY.mO();
var contentLastUpdate=COMPATIBILITY.now();
var mutationTarget;
var mutationAttrName;
var mutationIsClass;
var oldMutationVal;
var newClassVal;
var hostClassNameRegex;
var contentTimeout;
var now;
var sizeAuto;
var action;
_mutationObserverHostCallback=function(mutations){var doUpdate=false;
var doUpdateForce=false;
var mutation;
var mutatedAttrs=[];
if(_initialized&&!_sleeping){each(mutations,function(){mutation=this;
mutationTarget=mutation.target;
mutationAttrName=mutation.attributeName;
mutationIsClass=mutationAttrName===LEXICON.c;
oldMutationVal=mutation.oldValue;
newClassVal=mutationTarget.className;
if(_domExists&&mutationIsClass&&!doUpdateForce){if(oldMutationVal.indexOf(_classNameHostElementForeign)>-1&&newClassVal.indexOf(_classNameHostElementForeign)<0){hostClassNameRegex=createHostClassNameRegExp(true);
_hostElementNative.className=newClassVal.split(_strSpace).concat(oldMutationVal.split(_strSpace).filter(function(name){return name.match(hostClassNameRegex)
})).join(_strSpace);
doUpdate=doUpdateForce=true
}}if(!doUpdate){doUpdate=mutationIsClass?hostClassNamesChanged(oldMutationVal,newClassVal):mutationAttrName===LEXICON.s?oldMutationVal!==mutationTarget[LEXICON.s].cssText:true
}mutatedAttrs.push(mutationAttrName)
});
updateViewportAttrsFromTarget(mutatedAttrs);
if(doUpdate){_base.update(doUpdateForce||_strAuto)
}}return doUpdate
};
_mutationObserverContentCallback=function(mutations){var doUpdate=false;
var mutation;
if(_initialized&&!_sleeping){each(mutations,function(){mutation=this;
doUpdate=isUnknownMutation(mutation);
return !doUpdate
});
if(doUpdate){now=COMPATIBILITY.now();
sizeAuto=(_heightAutoCache||_widthAutoCache);
action=function(){if(!_destroyed){contentLastUpdate=now;
if(_isTextarea){textareaUpdate()
}if(sizeAuto){update()
}else{_base.update(_strAuto)
}}};
clearTimeout(contentTimeout);
if(mutationObserverContentLag<=0||now-contentLastUpdate>mutationObserverContentLag||!sizeAuto){action()
}else{contentTimeout=setTimeout(action,mutationObserverContentLag)
}}}return doUpdate
};
_mutationObserverHost=new mutationObserver(_mutationObserverHostCallback);
_mutationObserverContent=new mutationObserver(_mutationObserverContentCallback)
}}function connectMutationObservers(){if(_supportMutationObserver&&!_mutationObserversConnected){_mutationObserverHost.observe(_hostElementNative,{attributes:true,attributeOldValue:true,attributeFilter:_mutationObserverAttrsHost});
_mutationObserverContent.observe(_isTextarea?_targetElementNative:_contentElementNative,{attributes:true,attributeOldValue:true,subtree:!_isTextarea,childList:!_isTextarea,characterData:!_isTextarea,attributeFilter:_isTextarea?_mutationObserverAttrsTextarea:_mutationObserverAttrsHost});
_mutationObserversConnected=true
}}function disconnectMutationObservers(){if(_supportMutationObserver&&_mutationObserversConnected){_mutationObserverHost.disconnect();
_mutationObserverContent.disconnect();
_mutationObserversConnected=false
}}function hostOnResized(){if(!_sleeping){var changed;
var hostSize={w:_sizeObserverElementNative[LEXICON.sW],h:_sizeObserverElementNative[LEXICON.sH]};
changed=checkCache(hostSize,_hostElementSizeChangeDetectedCache);
_hostElementSizeChangeDetectedCache=hostSize;
if(changed){update({_hostSizeChanged:true})
}}}function hostOnMouseEnter(){if(_scrollbarsAutoHideLeave){refreshScrollbarsAutoHide(true)
}}function hostOnMouseLeave(){if(_scrollbarsAutoHideLeave&&!_bodyElement.hasClass(_classNameDragging)){refreshScrollbarsAutoHide(false)
}}function hostOnMouseMove(){if(_scrollbarsAutoHideMove){refreshScrollbarsAutoHide(true);
clearTimeout(_scrollbarsAutoHideMoveTimeoutId);
_scrollbarsAutoHideMoveTimeoutId=setTimeout(function(){if(_scrollbarsAutoHideMove&&!_destroyed){refreshScrollbarsAutoHide(false)
}},100)
}}function documentOnSelectStart(event){COMPATIBILITY.prvD(event);
return false
}function updateOnLoadCallback(event){if(!_destroyed){var target=event.target;
var elm=FRAMEWORK(event.target);
var index=FRAMEWORK.inArray(target,_updateOnLoadElms);
if(index>-1){_updateOnLoadElms.splice(index,1)
}eachUpdateOnLoad(function(i,updateOnLoadSelector){if(elm.is(updateOnLoadSelector)){update({_contentSizeChanged:true})
}})
}}function setupHostMouseTouchEvents(destroy){if(!destroy){setupHostMouseTouchEvents(true)
}setupResponsiveEventListener(_hostElement,_strMouseTouchMoveEvent.split(_strSpace)[0],hostOnMouseMove,(!_scrollbarsAutoHideMove||destroy),true);
setupResponsiveEventListener(_hostElement,[_strMouseEnter,_strMouseLeave],[hostOnMouseEnter,hostOnMouseLeave],(!_scrollbarsAutoHideLeave||destroy),true);
if(!_initialized&&!destroy){_hostElement.one("mouseover",hostOnMouseEnter)
}}function bodyMinSizeChanged(){var bodyMinSize={};
if(_isBody&&_contentArrangeElement){bodyMinSize.w=parseToZeroOrNumber(_contentArrangeElement.css(_strMinMinus+_strWidth));
bodyMinSize.h=parseToZeroOrNumber(_contentArrangeElement.css(_strMinMinus+_strHeight));
bodyMinSize.c=checkCache(bodyMinSize,_bodyMinSizeCache);
bodyMinSize.f=true
}_bodyMinSizeCache=bodyMinSize;
return !!bodyMinSize.c
}function hostClassNamesChanged(oldClassNames,newClassNames){var currClasses=typeof newClassNames==TYPES.s?newClassNames.split(_strSpace):[];
var oldClasses=typeof oldClassNames==TYPES.s?oldClassNames.split(_strSpace):[];
var diff=getArrayDifferences(oldClasses,currClasses);
var idx=inArray(_classNameThemeNone,diff);
var i;
var regex;
if(idx>-1){diff.splice(idx,1)
}if(diff[LEXICON.l]>0){regex=createHostClassNameRegExp(true,true);
for(i=0;
i<diff.length;
i++){if(!diff[i].match(regex)){return true
}}}return false
}function isUnknownMutation(mutation){var attributeName=mutation.attributeName;
var mutationTarget=mutation.target;
var mutationType=mutation.type;
var strClosest="closest";
if(mutationTarget===_contentElementNative){return attributeName===null
}if(mutationType==="attributes"&&(attributeName===LEXICON.c||attributeName===LEXICON.s)&&!_isTextarea){if(attributeName===LEXICON.c&&FRAMEWORK(mutationTarget).hasClass(_classNameHostElement)){return hostClassNamesChanged(mutation.oldValue,mutationTarget.className)
}if(typeof mutationTarget[strClosest]!=TYPES.f){return true
}if(mutationTarget[strClosest](_strDot+_classNameResizeObserverElement)!==null||mutationTarget[strClosest](_strDot+_classNameScrollbar)!==null||mutationTarget[strClosest](_strDot+_classNameScrollbarCorner)!==null){return false
}}return true
}function updateAutoContentSizeChanged(){if(_sleeping){return false
}var contentMeasureElement=getContentMeasureElement();
var textareaValueLength=_isTextarea&&_widthAutoCache&&!_textareaAutoWrappingCache?_targetElement.val().length:0;
var setCSS=!_mutationObserversConnected&&_widthAutoCache&&!_isTextarea;
var css={};
var float;
var bodyMinSizeC;
var changed;
var contentElementScrollSize;
if(setCSS){float=_contentElement.css(_strFloat);
css[_strFloat]=_isRTL?_strRight:_strLeft;
css[_strWidth]=_strAuto;
_contentElement.css(css)
}contentElementScrollSize={w:contentMeasureElement[LEXICON.sW]+textareaValueLength,h:contentMeasureElement[LEXICON.sH]+textareaValueLength};
if(setCSS){css[_strFloat]=float;
css[_strWidth]=_strHundredPercent;
_contentElement.css(css)
}bodyMinSizeC=bodyMinSizeChanged();
changed=checkCache(contentElementScrollSize,_contentElementScrollSizeChangeDetectedCache);
_contentElementScrollSizeChangeDetectedCache=contentElementScrollSize;
return changed||bodyMinSizeC
}function meaningfulAttrsChanged(){if(_sleeping||_mutationObserversConnected){return
}var elem;
var curr;
var cache;
var changedAttrs=[];
var checks=[{_elem:_hostElement,_attrs:_mutationObserverAttrsHost.concat(":visible")},{_elem:_isTextarea?_targetElement:undefined,_attrs:_mutationObserverAttrsTextarea}];
each(checks,function(index,check){elem=check._elem;
if(elem){each(check._attrs,function(index,attr){curr=attr.charAt(0)===":"?elem.is(attr):elem.attr(attr);
cache=_updateAutoCache[attr];
if(checkCache(curr,cache)){changedAttrs.push(attr)
}_updateAutoCache[attr]=curr
})
}});
updateViewportAttrsFromTarget(changedAttrs);
return changedAttrs[LEXICON.l]>0
}function isSizeAffectingCSSProperty(propertyName){if(!_initialized){return true
}var flexGrow="flex-grow";
var flexShrink="flex-shrink";
var flexBasis="flex-basis";
var affectingPropsX=[_strWidth,_strMinMinus+_strWidth,_strMaxMinus+_strWidth,_strMarginMinus+_strLeft,_strMarginMinus+_strRight,_strLeft,_strRight,"font-weight","word-spacing",flexGrow,flexShrink,flexBasis];
var affectingPropsXContentBox=[_strPaddingMinus+_strLeft,_strPaddingMinus+_strRight,_strBorderMinus+_strLeft+_strWidth,_strBorderMinus+_strRight+_strWidth];
var affectingPropsY=[_strHeight,_strMinMinus+_strHeight,_strMaxMinus+_strHeight,_strMarginMinus+_strTop,_strMarginMinus+_strBottom,_strTop,_strBottom,"line-height",flexGrow,flexShrink,flexBasis];
var affectingPropsYContentBox=[_strPaddingMinus+_strTop,_strPaddingMinus+_strBottom,_strBorderMinus+_strTop+_strWidth,_strBorderMinus+_strBottom+_strWidth];
var _strS="s";
var _strVS="v-s";
var checkX=_overflowBehaviorCache.x===_strS||_overflowBehaviorCache.x===_strVS;
var checkY=_overflowBehaviorCache.y===_strS||_overflowBehaviorCache.y===_strVS;
var sizeIsAffected=false;
var checkPropertyName=function(arr,name){for(var i=0;
i<arr[LEXICON.l];
i++){if(arr[i]===name){return true
}}return false
};
if(checkY){sizeIsAffected=checkPropertyName(affectingPropsY,propertyName);
if(!sizeIsAffected&&!_isBorderBox){sizeIsAffected=checkPropertyName(affectingPropsYContentBox,propertyName)
}}if(checkX&&!sizeIsAffected){sizeIsAffected=checkPropertyName(affectingPropsX,propertyName);
if(!sizeIsAffected&&!_isBorderBox){sizeIsAffected=checkPropertyName(affectingPropsXContentBox,propertyName)
}}return sizeIsAffected
}function updateViewportAttrsFromTarget(attrs){attrs=attrs||_viewportAttrsFromTarget;
each(attrs,function(index,attr){if(COMPATIBILITY.inA(attr,_viewportAttrsFromTarget)>-1){var targetAttr=_targetElement.attr(attr);
if(type(targetAttr)==TYPES.s){_viewportElement.attr(attr,targetAttr)
}else{_viewportElement.removeAttr(attr)
}}})
}function textareaUpdate(){if(!_sleeping){var wrapAttrOff=!_textareaAutoWrappingCache;
var minWidth=_viewportSize.w;
var minHeight=_viewportSize.h;
var css={};
var doMeasure=_widthAutoCache||wrapAttrOff;
var origWidth;
var width;
var origHeight;
var height;
css[_strMinMinus+_strWidth]=_strEmpty;
css[_strMinMinus+_strHeight]=_strEmpty;
css[_strWidth]=_strAuto;
_targetElement.css(css);
origWidth=_targetElementNative[LEXICON.oW];
width=doMeasure?MATH.max(origWidth,_targetElementNative[LEXICON.sW]-1):1;
css[_strWidth]=_widthAutoCache?_strAuto:_strHundredPercent;
css[_strMinMinus+_strWidth]=_strHundredPercent;
css[_strHeight]=_strAuto;
_targetElement.css(css);
origHeight=_targetElementNative[LEXICON.oH];
height=MATH.max(origHeight,_targetElementNative[LEXICON.sH]-1);
css[_strWidth]=width;
css[_strHeight]=height;
_textareaCoverElement.css(css);
css[_strMinMinus+_strWidth]=minWidth;
css[_strMinMinus+_strHeight]=minHeight;
_targetElement.css(css);
return{_originalWidth:origWidth,_originalHeight:origHeight,_dynamicWidth:width,_dynamicHeight:height}
}}function update(updateHints){clearTimeout(_swallowedUpdateTimeout);
updateHints=updateHints||{};
_swallowedUpdateHints._hostSizeChanged|=updateHints._hostSizeChanged;
_swallowedUpdateHints._contentSizeChanged|=updateHints._contentSizeChanged;
_swallowedUpdateHints._force|=updateHints._force;
var now=COMPATIBILITY.now();
var hostSizeChanged=!!_swallowedUpdateHints._hostSizeChanged;
var contentSizeChanged=!!_swallowedUpdateHints._contentSizeChanged;
var force=!!_swallowedUpdateHints._force;
var changedOptions=updateHints._changedOptions;
var swallow=_swallowUpdateLag>0&&_initialized&&!_destroyed&&!force&&!changedOptions&&(now-_lastUpdateTime)<_swallowUpdateLag&&(!_heightAutoCache&&!_widthAutoCache);
var displayIsHidden;
if(swallow){_swallowedUpdateTimeout=setTimeout(update,_swallowUpdateLag)
}if(_destroyed||swallow||(_sleeping&&!changedOptions)||(_initialized&&!force&&(displayIsHidden=_hostElement.is(":hidden")))||_hostElement.css("display")==="inline"){return
}_lastUpdateTime=now;
_swallowedUpdateHints={};
if(_nativeScrollbarStyling&&!(_nativeScrollbarIsOverlaid.x&&_nativeScrollbarIsOverlaid.y)){_nativeScrollbarSize.x=0;
_nativeScrollbarSize.y=0
}else{_nativeScrollbarSize=extendDeep({},globals.nativeScrollbarSize)
}_nativeScrollbarMinSize={x:(_nativeScrollbarSize.x+(_nativeScrollbarIsOverlaid.x?0:3))*3,y:(_nativeScrollbarSize.y+(_nativeScrollbarIsOverlaid.y?0:3))*3};
changedOptions=changedOptions||{};
var checkCacheAutoForce=function(){return checkCache.apply(this,[].slice.call(arguments).concat([force]))
};
var currScroll={x:_viewportElement[_strScrollLeft](),y:_viewportElement[_strScrollTop]()};
var currentPreparedOptionsScrollbars=_currentPreparedOptions.scrollbars;
var currentPreparedOptionsTextarea=_currentPreparedOptions.textarea;
var scrollbarsVisibility=currentPreparedOptionsScrollbars.visibility;
var scrollbarsVisibilityChanged=checkCacheAutoForce(scrollbarsVisibility,_scrollbarsVisibilityCache);
var scrollbarsAutoHide=currentPreparedOptionsScrollbars.autoHide;
var scrollbarsAutoHideChanged=checkCacheAutoForce(scrollbarsAutoHide,_scrollbarsAutoHideCache);
var scrollbarsClickScrolling=currentPreparedOptionsScrollbars.clickScrolling;
var scrollbarsClickScrollingChanged=checkCacheAutoForce(scrollbarsClickScrolling,_scrollbarsClickScrollingCache);
var scrollbarsDragScrolling=currentPreparedOptionsScrollbars.dragScrolling;
var scrollbarsDragScrollingChanged=checkCacheAutoForce(scrollbarsDragScrolling,_scrollbarsDragScrollingCache);
var className=_currentPreparedOptions.className;
var classNameChanged=checkCacheAutoForce(className,_classNameCache);
var resize=_currentPreparedOptions.resize;
var resizeChanged=checkCacheAutoForce(resize,_resizeCache)&&!_isBody;
var paddingAbsolute=_currentPreparedOptions.paddingAbsolute;
var paddingAbsoluteChanged=checkCacheAutoForce(paddingAbsolute,_paddingAbsoluteCache);
var clipAlways=_currentPreparedOptions.clipAlways;
var clipAlwaysChanged=checkCacheAutoForce(clipAlways,_clipAlwaysCache);
var sizeAutoCapable=_currentPreparedOptions.sizeAutoCapable&&!_isBody;
var sizeAutoCapableChanged=checkCacheAutoForce(sizeAutoCapable,_sizeAutoCapableCache);
var ignoreOverlayScrollbarHiding=_currentPreparedOptions.nativeScrollbarsOverlaid.showNativeScrollbars;
var ignoreOverlayScrollbarHidingChanged=checkCacheAutoForce(ignoreOverlayScrollbarHiding,_ignoreOverlayScrollbarHidingCache);
var autoUpdate=_currentPreparedOptions.autoUpdate;
var autoUpdateChanged=checkCacheAutoForce(autoUpdate,_autoUpdateCache);
var overflowBehavior=_currentPreparedOptions.overflowBehavior;
var overflowBehaviorChanged=checkCacheAutoForce(overflowBehavior,_overflowBehaviorCache,force);
var textareaDynWidth=currentPreparedOptionsTextarea.dynWidth;
var textareaDynWidthChanged=checkCacheAutoForce(_textareaDynWidthCache,textareaDynWidth);
var textareaDynHeight=currentPreparedOptionsTextarea.dynHeight;
var textareaDynHeightChanged=checkCacheAutoForce(_textareaDynHeightCache,textareaDynHeight);
_scrollbarsAutoHideNever=scrollbarsAutoHide==="n";
_scrollbarsAutoHideScroll=scrollbarsAutoHide==="s";
_scrollbarsAutoHideMove=scrollbarsAutoHide==="m";
_scrollbarsAutoHideLeave=scrollbarsAutoHide==="l";
_scrollbarsAutoHideDelay=currentPreparedOptionsScrollbars.autoHideDelay;
_oldClassName=_classNameCache;
_resizeNone=resize==="n";
_resizeBoth=resize==="b";
_resizeHorizontal=resize==="h";
_resizeVertical=resize==="v";
_normalizeRTLCache=_currentPreparedOptions.normalizeRTL;
ignoreOverlayScrollbarHiding=ignoreOverlayScrollbarHiding&&(_nativeScrollbarIsOverlaid.x&&_nativeScrollbarIsOverlaid.y);
_scrollbarsVisibilityCache=scrollbarsVisibility;
_scrollbarsAutoHideCache=scrollbarsAutoHide;
_scrollbarsClickScrollingCache=scrollbarsClickScrolling;
_scrollbarsDragScrollingCache=scrollbarsDragScrolling;
_classNameCache=className;
_resizeCache=resize;
_paddingAbsoluteCache=paddingAbsolute;
_clipAlwaysCache=clipAlways;
_sizeAutoCapableCache=sizeAutoCapable;
_ignoreOverlayScrollbarHidingCache=ignoreOverlayScrollbarHiding;
_autoUpdateCache=autoUpdate;
_overflowBehaviorCache=extendDeep({},overflowBehavior);
_textareaDynWidthCache=textareaDynWidth;
_textareaDynHeightCache=textareaDynHeight;
_hasOverflowCache=_hasOverflowCache||{x:false,y:false};
if(classNameChanged){removeClass(_hostElement,_oldClassName+_strSpace+_classNameThemeNone);
addClass(_hostElement,className!==undefined&&className!==null&&className.length>0?className:_classNameThemeNone)
}if(autoUpdateChanged){if(autoUpdate===true||(autoUpdate===null&&_autoUpdateRecommended)){disconnectMutationObservers();
autoUpdateLoop.add(_base)
}else{autoUpdateLoop.remove(_base);
connectMutationObservers()
}}if(sizeAutoCapableChanged){if(sizeAutoCapable){if(_contentGlueElement){_contentGlueElement.show()
}else{_contentGlueElement=FRAMEWORK(generateDiv(_classNameContentGlueElement));
_paddingElement.before(_contentGlueElement)
}if(_sizeAutoObserverAdded){_sizeAutoObserverElement.show()
}else{_sizeAutoObserverElement=FRAMEWORK(generateDiv(_classNameSizeAutoObserverElement));
_sizeAutoObserverElementNative=_sizeAutoObserverElement[0];
_contentGlueElement.before(_sizeAutoObserverElement);
var oldSize={w:-1,h:-1};
setupResizeObserver(_sizeAutoObserverElement,function(){var newSize={w:_sizeAutoObserverElementNative[LEXICON.oW],h:_sizeAutoObserverElementNative[LEXICON.oH]};
if(checkCache(newSize,oldSize)){if(_initialized&&(_heightAutoCache&&newSize.h>0)||(_widthAutoCache&&newSize.w>0)){update()
}else{if(_initialized&&(!_heightAutoCache&&newSize.h===0)||(!_widthAutoCache&&newSize.w===0)){update()
}}}oldSize=newSize
});
_sizeAutoObserverAdded=true;
if(_cssCalc!==null){_sizeAutoObserverElement.css(_strHeight,_cssCalc+"(100% + 1px)")
}}}else{if(_sizeAutoObserverAdded){_sizeAutoObserverElement.hide()
}if(_contentGlueElement){_contentGlueElement.hide()
}}}if(force){_sizeObserverElement.find("*").trigger(_strScroll);
if(_sizeAutoObserverAdded){_sizeAutoObserverElement.find("*").trigger(_strScroll)
}}displayIsHidden=displayIsHidden===undefined?_hostElement.is(":hidden"):displayIsHidden;
var textareaAutoWrapping=_isTextarea?_targetElement.attr("wrap")!=="off":false;
var textareaAutoWrappingChanged=checkCacheAutoForce(textareaAutoWrapping,_textareaAutoWrappingCache);
var cssDirection=_hostElement.css("direction");
var cssDirectionChanged=checkCacheAutoForce(cssDirection,_cssDirectionCache);
var boxSizing=_hostElement.css("box-sizing");
var boxSizingChanged=checkCacheAutoForce(boxSizing,_cssBoxSizingCache);
var padding=getTopRightBottomLeftHost(_strPaddingMinus);
var sizeAutoObserverElementBCRect;
try{sizeAutoObserverElementBCRect=_sizeAutoObserverAdded?_sizeAutoObserverElementNative[LEXICON.bCR]():null
}catch(ex){return
}_isRTL=cssDirection==="rtl";
_isBorderBox=(boxSizing==="border-box");
var isRTLLeft=_isRTL?_strLeft:_strRight;
var isRTLRight=_isRTL?_strRight:_strLeft;
var widthAutoResizeDetection=false;
var widthAutoObserverDetection=(_sizeAutoObserverAdded&&(_hostElement.css(_strFloat)!=="none"))?(MATH.round(sizeAutoObserverElementBCRect.right-sizeAutoObserverElementBCRect.left)===0)&&(!paddingAbsolute?(_hostElementNative[LEXICON.cW]-_paddingX)>0:true):false;
if(sizeAutoCapable&&!widthAutoObserverDetection){var tmpCurrHostWidth=_hostElementNative[LEXICON.oW];
var tmpCurrContentGlueWidth=_contentGlueElement.css(_strWidth);
_contentGlueElement.css(_strWidth,_strAuto);
var tmpNewHostWidth=_hostElementNative[LEXICON.oW];
_contentGlueElement.css(_strWidth,tmpCurrContentGlueWidth);
widthAutoResizeDetection=tmpCurrHostWidth!==tmpNewHostWidth;
if(!widthAutoResizeDetection){_contentGlueElement.css(_strWidth,tmpCurrHostWidth+1);
tmpNewHostWidth=_hostElementNative[LEXICON.oW];
_contentGlueElement.css(_strWidth,tmpCurrContentGlueWidth);
widthAutoResizeDetection=tmpCurrHostWidth!==tmpNewHostWidth
}}var widthAuto=(widthAutoObserverDetection||widthAutoResizeDetection)&&sizeAutoCapable&&!displayIsHidden;
var widthAutoChanged=checkCacheAutoForce(widthAuto,_widthAutoCache);
var wasWidthAuto=!widthAuto&&_widthAutoCache;
var heightAuto=_sizeAutoObserverAdded&&sizeAutoCapable&&!displayIsHidden?(MATH.round(sizeAutoObserverElementBCRect.bottom-sizeAutoObserverElementBCRect.top)===0):false;
var heightAutoChanged=checkCacheAutoForce(heightAuto,_heightAutoCache);
var wasHeightAuto=!heightAuto&&_heightAutoCache;
var updateBorderX=(widthAuto&&_isBorderBox)||!_isBorderBox;
var updateBorderY=(heightAuto&&_isBorderBox)||!_isBorderBox;
var border=getTopRightBottomLeftHost(_strBorderMinus,"-"+_strWidth,!updateBorderX,!updateBorderY);
var margin=getTopRightBottomLeftHost(_strMarginMinus);
var contentElementCSS={};
var contentGlueElementCSS={};
var getHostSize=function(){return{w:_hostElementNative[LEXICON.cW],h:_hostElementNative[LEXICON.cH]}
};
var getViewportSize=function(){return{w:_paddingElementNative[LEXICON.oW]+MATH.max(0,_contentElementNative[LEXICON.cW]-_contentElementNative[LEXICON.sW]),h:_paddingElementNative[LEXICON.oH]+MATH.max(0,_contentElementNative[LEXICON.cH]-_contentElementNative[LEXICON.sH])}
};
var paddingAbsoluteX=_paddingX=padding.l+padding.r;
var paddingAbsoluteY=_paddingY=padding.t+padding.b;
paddingAbsoluteX*=paddingAbsolute?1:0;
paddingAbsoluteY*=paddingAbsolute?1:0;
padding.c=checkCacheAutoForce(padding,_cssPaddingCache);
_borderX=border.l+border.r;
_borderY=border.t+border.b;
border.c=checkCacheAutoForce(border,_cssBorderCache);
_marginX=margin.l+margin.r;
_marginY=margin.t+margin.b;
margin.c=checkCacheAutoForce(margin,_cssMarginCache);
_textareaAutoWrappingCache=textareaAutoWrapping;
_cssDirectionCache=cssDirection;
_cssBoxSizingCache=boxSizing;
_widthAutoCache=widthAuto;
_heightAutoCache=heightAuto;
_cssPaddingCache=padding;
_cssBorderCache=border;
_cssMarginCache=margin;
if(cssDirectionChanged&&_sizeAutoObserverAdded){_sizeAutoObserverElement.css(_strFloat,isRTLRight)
}if(padding.c||cssDirectionChanged||paddingAbsoluteChanged||widthAutoChanged||heightAutoChanged||boxSizingChanged||sizeAutoCapableChanged){var paddingElementCSS={};
var textareaCSS={};
var paddingValues=[padding.t,padding.r,padding.b,padding.l];
setTopRightBottomLeft(contentGlueElementCSS,_strMarginMinus,[-padding.t,-padding.r,-padding.b,-padding.l]);
if(paddingAbsolute){setTopRightBottomLeft(paddingElementCSS,_strEmpty,paddingValues);
setTopRightBottomLeft(_isTextarea?textareaCSS:contentElementCSS,_strPaddingMinus)
}else{setTopRightBottomLeft(paddingElementCSS,_strEmpty);
setTopRightBottomLeft(_isTextarea?textareaCSS:contentElementCSS,_strPaddingMinus,paddingValues)
}_paddingElement.css(paddingElementCSS);
_targetElement.css(textareaCSS)
}_viewportSize=getViewportSize();
var textareaSize=_isTextarea?textareaUpdate():false;
var textareaSizeChanged=_isTextarea&&checkCacheAutoForce(textareaSize,_textareaSizeCache);
var textareaDynOrigSize=_isTextarea&&textareaSize?{w:textareaDynWidth?textareaSize._dynamicWidth:textareaSize._originalWidth,h:textareaDynHeight?textareaSize._dynamicHeight:textareaSize._originalHeight}:{};
_textareaSizeCache=textareaSize;
if(heightAuto&&(heightAutoChanged||paddingAbsoluteChanged||boxSizingChanged||padding.c||border.c)){contentElementCSS[_strHeight]=_strAuto
}else{if(heightAutoChanged||paddingAbsoluteChanged){contentElementCSS[_strHeight]=_strHundredPercent
}}if(widthAuto&&(widthAutoChanged||paddingAbsoluteChanged||boxSizingChanged||padding.c||border.c||cssDirectionChanged)){contentElementCSS[_strWidth]=_strAuto;
contentGlueElementCSS[_strMaxMinus+_strWidth]=_strHundredPercent
}else{if(widthAutoChanged||paddingAbsoluteChanged){contentElementCSS[_strWidth]=_strHundredPercent;
contentElementCSS[_strFloat]=_strEmpty;
contentGlueElementCSS[_strMaxMinus+_strWidth]=_strEmpty
}}if(widthAuto){contentGlueElementCSS[_strWidth]=_strAuto;
contentElementCSS[_strWidth]=VENDORS._cssPropertyValue(_strWidth,"max-content intrinsic")||_strAuto;
contentElementCSS[_strFloat]=isRTLRight
}else{contentGlueElementCSS[_strWidth]=_strEmpty
}if(heightAuto){contentGlueElementCSS[_strHeight]=textareaDynOrigSize.h||_contentElementNative[LEXICON.cH]
}else{contentGlueElementCSS[_strHeight]=_strEmpty
}if(sizeAutoCapable){_contentGlueElement.css(contentGlueElementCSS)
}_contentElement.css(contentElementCSS);
contentElementCSS={};
contentGlueElementCSS={};
if(hostSizeChanged||contentSizeChanged||textareaSizeChanged||cssDirectionChanged||boxSizingChanged||paddingAbsoluteChanged||widthAutoChanged||widthAuto||heightAutoChanged||heightAuto||ignoreOverlayScrollbarHidingChanged||overflowBehaviorChanged||clipAlwaysChanged||resizeChanged||scrollbarsVisibilityChanged||scrollbarsAutoHideChanged||scrollbarsDragScrollingChanged||scrollbarsClickScrollingChanged||textareaDynWidthChanged||textareaDynHeightChanged||textareaAutoWrappingChanged){var strOverflow="overflow";
var strOverflowX=strOverflow+"-x";
var strOverflowY=strOverflow+"-y";
var strHidden="hidden";
var strVisible="visible";
if(!_nativeScrollbarStyling){var viewportElementResetCSS={};
var resetXTmp=_hasOverflowCache.y&&_hideOverflowCache.ys&&!ignoreOverlayScrollbarHiding?(_nativeScrollbarIsOverlaid.y?_viewportElement.css(isRTLLeft):-_nativeScrollbarSize.y):0;
var resetBottomTmp=_hasOverflowCache.x&&_hideOverflowCache.xs&&!ignoreOverlayScrollbarHiding?(_nativeScrollbarIsOverlaid.x?_viewportElement.css(_strBottom):-_nativeScrollbarSize.x):0;
setTopRightBottomLeft(viewportElementResetCSS,_strEmpty);
_viewportElement.css(viewportElementResetCSS)
}var contentMeasureElement=getContentMeasureElement();
var contentSize={w:textareaDynOrigSize.w||contentMeasureElement[LEXICON.cW],h:textareaDynOrigSize.h||contentMeasureElement[LEXICON.cH]};
var scrollSize={w:contentMeasureElement[LEXICON.sW],h:contentMeasureElement[LEXICON.sH]};
if(!_nativeScrollbarStyling){viewportElementResetCSS[_strBottom]=wasHeightAuto?_strEmpty:resetBottomTmp;
viewportElementResetCSS[isRTLLeft]=wasWidthAuto?_strEmpty:resetXTmp;
_viewportElement.css(viewportElementResetCSS)
}_viewportSize=getViewportSize();
var hostSize=getHostSize();
var hostAbsoluteRectSize={w:hostSize.w-_marginX-_borderX-(_isBorderBox?0:_paddingX),h:hostSize.h-_marginY-_borderY-(_isBorderBox?0:_paddingY)};
var contentGlueSize={w:MATH.max((widthAuto?contentSize.w:scrollSize.w)+paddingAbsoluteX,hostAbsoluteRectSize.w),h:MATH.max((heightAuto?contentSize.h:scrollSize.h)+paddingAbsoluteY,hostAbsoluteRectSize.h)};
contentGlueSize.c=checkCacheAutoForce(contentGlueSize,_contentGlueSizeCache);
_contentGlueSizeCache=contentGlueSize;
if(sizeAutoCapable){if(contentGlueSize.c||(heightAuto||widthAuto)){contentGlueElementCSS[_strWidth]=contentGlueSize.w;
contentGlueElementCSS[_strHeight]=contentGlueSize.h;
if(!_isTextarea){contentSize={w:contentMeasureElement[LEXICON.cW],h:contentMeasureElement[LEXICON.cH]}
}}var textareaCoverCSS={};
var setContentGlueElementCSSfunction=function(horizontal){var scrollbarVars=getScrollbarVars(horizontal);
var wh=scrollbarVars._w_h;
var strWH=scrollbarVars._width_height;
var autoSize=horizontal?widthAuto:heightAuto;
var borderSize=horizontal?_borderX:_borderY;
var paddingSize=horizontal?_paddingX:_paddingY;
var marginSize=horizontal?_marginX:_marginY;
var viewportSize=_viewportSize[wh]-borderSize-marginSize-(_isBorderBox?0:paddingSize);
if(!autoSize||(!autoSize&&border.c)){contentGlueElementCSS[strWH]=hostAbsoluteRectSize[wh]-1
}if(autoSize&&(contentSize[wh]<viewportSize)&&(horizontal&&_isTextarea?!textareaAutoWrapping:true)){if(_isTextarea){textareaCoverCSS[strWH]=parseToZeroOrNumber(_textareaCoverElement.css(strWH))-1
}contentGlueElementCSS[strWH]-=1
}if(contentSize[wh]>0){contentGlueElementCSS[strWH]=MATH.max(1,contentGlueElementCSS[strWH])
}};
setContentGlueElementCSSfunction(true);
setContentGlueElementCSSfunction(false);
if(_isTextarea){_textareaCoverElement.css(textareaCoverCSS)
}_contentGlueElement.css(contentGlueElementCSS)
}if(widthAuto){contentElementCSS[_strWidth]=_strHundredPercent
}if(widthAuto&&!_isBorderBox&&!_mutationObserversConnected){contentElementCSS[_strFloat]="none"
}_contentElement.css(contentElementCSS);
contentElementCSS={};
var contentScrollSize={w:contentMeasureElement[LEXICON.sW],h:contentMeasureElement[LEXICON.sH]};
contentScrollSize.c=contentSizeChanged=checkCacheAutoForce(contentScrollSize,_contentScrollSizeCache);
_contentScrollSizeCache=contentScrollSize;
_viewportSize=getViewportSize();
hostSize=getHostSize();
hostSizeChanged=checkCacheAutoForce(hostSize,_hostSizeCache);
_hostSizeCache=hostSize;
var hideOverflowForceTextarea=_isTextarea&&(_viewportSize.w===0||_viewportSize.h===0);
var previousOverflowAmount=_overflowAmountCache;
var overflowBehaviorIsVS={};
var overflowBehaviorIsVH={};
var overflowBehaviorIsS={};
var overflowAmount={};
var hasOverflow={};
var hideOverflow={};
var canScroll={};
var viewportRect=_paddingElementNative[LEXICON.bCR]();
var setOverflowVariables=function(horizontal){var scrollbarVars=getScrollbarVars(horizontal);
var scrollbarVarsInverted=getScrollbarVars(!horizontal);
var xyI=scrollbarVarsInverted._x_y;
var xy=scrollbarVars._x_y;
var wh=scrollbarVars._w_h;
var widthHeight=scrollbarVars._width_height;
var scrollMax=_strScroll+scrollbarVars._Left_Top+"Max";
var fractionalOverflowAmount=viewportRect[widthHeight]?MATH.abs(viewportRect[widthHeight]-_viewportSize[wh]):0;
var checkFractionalOverflowAmount=previousOverflowAmount&&previousOverflowAmount[xy]>0&&_viewportElementNative[scrollMax]===0;
overflowBehaviorIsVS[xy]=overflowBehavior[xy]==="v-s";
overflowBehaviorIsVH[xy]=overflowBehavior[xy]==="v-h";
overflowBehaviorIsS[xy]=overflowBehavior[xy]==="s";
overflowAmount[xy]=MATH.max(0,MATH.round((contentScrollSize[wh]-_viewportSize[wh])*100)/100);
overflowAmount[xy]*=(hideOverflowForceTextarea||(checkFractionalOverflowAmount&&fractionalOverflowAmount>0&&fractionalOverflowAmount<1))?0:1;
hasOverflow[xy]=overflowAmount[xy]>0;
hideOverflow[xy]=overflowBehaviorIsVS[xy]||overflowBehaviorIsVH[xy]?(hasOverflow[xyI]&&!overflowBehaviorIsVS[xyI]&&!overflowBehaviorIsVH[xyI]):hasOverflow[xy];
hideOverflow[xy+"s"]=hideOverflow[xy]?(overflowBehaviorIsS[xy]||overflowBehaviorIsVS[xy]):false;
canScroll[xy]=hasOverflow[xy]&&hideOverflow[xy+"s"]
};
setOverflowVariables(true);
setOverflowVariables(false);
overflowAmount.c=checkCacheAutoForce(overflowAmount,_overflowAmountCache);
_overflowAmountCache=overflowAmount;
hasOverflow.c=checkCacheAutoForce(hasOverflow,_hasOverflowCache);
_hasOverflowCache=hasOverflow;
hideOverflow.c=checkCacheAutoForce(hideOverflow,_hideOverflowCache);
_hideOverflowCache=hideOverflow;
if(_nativeScrollbarIsOverlaid.x||_nativeScrollbarIsOverlaid.y){var borderDesign="px solid transparent";
var contentArrangeElementCSS={};
var arrangeContent={};
var arrangeChanged=force;
var setContentElementCSS;
if(hasOverflow.x||hasOverflow.y){arrangeContent.w=_nativeScrollbarIsOverlaid.y&&hasOverflow.y?contentScrollSize.w+_overlayScrollbarDummySize.y:_strEmpty;
arrangeContent.h=_nativeScrollbarIsOverlaid.x&&hasOverflow.x?contentScrollSize.h+_overlayScrollbarDummySize.x:_strEmpty;
arrangeChanged=checkCacheAutoForce(arrangeContent,_arrangeContentSizeCache);
_arrangeContentSizeCache=arrangeContent
}if(hasOverflow.c||hideOverflow.c||contentScrollSize.c||cssDirectionChanged||widthAutoChanged||heightAutoChanged||widthAuto||heightAuto||ignoreOverlayScrollbarHidingChanged){contentElementCSS[_strMarginMinus+isRTLRight]=contentElementCSS[_strBorderMinus+isRTLRight]=_strEmpty;
setContentElementCSS=function(horizontal){var scrollbarVars=getScrollbarVars(horizontal);
var scrollbarVarsInverted=getScrollbarVars(!horizontal);
var xy=scrollbarVars._x_y;
var strDirection=horizontal?_strBottom:isRTLLeft;
var invertedAutoSize=horizontal?heightAuto:widthAuto;
if(_nativeScrollbarIsOverlaid[xy]&&hasOverflow[xy]&&hideOverflow[xy+"s"]){contentElementCSS[_strMarginMinus+strDirection]=invertedAutoSize?(ignoreOverlayScrollbarHiding?_strEmpty:_overlayScrollbarDummySize[xy]):_strEmpty;
contentElementCSS[_strBorderMinus+strDirection]=((horizontal?!invertedAutoSize:true)&&!ignoreOverlayScrollbarHiding)?(_overlayScrollbarDummySize[xy]+borderDesign):_strEmpty
}else{arrangeContent[scrollbarVarsInverted._w_h]=contentElementCSS[_strMarginMinus+strDirection]=contentElementCSS[_strBorderMinus+strDirection]=_strEmpty;
arrangeChanged=true
}};
if(_nativeScrollbarStyling){addRemoveClass(_viewportElement,_classNameViewportNativeScrollbarsInvisible,!ignoreOverlayScrollbarHiding)
}else{setContentElementCSS(true);
setContentElementCSS(false)
}}if(ignoreOverlayScrollbarHiding){arrangeContent.w=arrangeContent.h=_strEmpty;
arrangeChanged=true
}if(arrangeChanged&&!_nativeScrollbarStyling){contentArrangeElementCSS[_strWidth]=hideOverflow.y?arrangeContent.w:_strEmpty;
contentArrangeElementCSS[_strHeight]=hideOverflow.x?arrangeContent.h:_strEmpty;
if(!_contentArrangeElement){_contentArrangeElement=FRAMEWORK(generateDiv(_classNameContentArrangeElement));
_viewportElement.prepend(_contentArrangeElement)
}_contentArrangeElement.css(contentArrangeElementCSS)
}_contentElement.css(contentElementCSS)
}var viewportElementCSS={};
var paddingElementCSS={};
var setViewportCSS;
if(hostSizeChanged||hasOverflow.c||hideOverflow.c||contentScrollSize.c||overflowBehaviorChanged||boxSizingChanged||ignoreOverlayScrollbarHidingChanged||cssDirectionChanged||clipAlwaysChanged||heightAutoChanged){viewportElementCSS[isRTLRight]=_strEmpty;
setViewportCSS=function(horizontal){var scrollbarVars=getScrollbarVars(horizontal);
var scrollbarVarsInverted=getScrollbarVars(!horizontal);
var xy=scrollbarVars._x_y;
var XY=scrollbarVars._X_Y;
var strDirection=horizontal?_strBottom:isRTLLeft;
var reset=function(){viewportElementCSS[strDirection]=_strEmpty;
_contentBorderSize[scrollbarVarsInverted._w_h]=0
};
if(hasOverflow[xy]&&hideOverflow[xy+"s"]){viewportElementCSS[strOverflow+XY]=_strScroll;
if(ignoreOverlayScrollbarHiding||_nativeScrollbarStyling){reset()
}else{viewportElementCSS[strDirection]=-(_nativeScrollbarIsOverlaid[xy]?_overlayScrollbarDummySize[xy]:_nativeScrollbarSize[xy]);
_contentBorderSize[scrollbarVarsInverted._w_h]=_nativeScrollbarIsOverlaid[xy]?_overlayScrollbarDummySize[scrollbarVarsInverted._x_y]:0
}}else{viewportElementCSS[strOverflow+XY]=_strEmpty;
reset()
}};
setViewportCSS(true);
setViewportCSS(false);
if(!_nativeScrollbarStyling&&(_viewportSize.h<_nativeScrollbarMinSize.x||_viewportSize.w<_nativeScrollbarMinSize.y)&&((hasOverflow.x&&hideOverflow.x&&!_nativeScrollbarIsOverlaid.x)||(hasOverflow.y&&hideOverflow.y&&!_nativeScrollbarIsOverlaid.y))){viewportElementCSS[_strPaddingMinus+_strTop]=_nativeScrollbarMinSize.x;
viewportElementCSS[_strMarginMinus+_strTop]=-_nativeScrollbarMinSize.x;
viewportElementCSS[_strPaddingMinus+isRTLRight]=_nativeScrollbarMinSize.y;
viewportElementCSS[_strMarginMinus+isRTLRight]=-_nativeScrollbarMinSize.y
}else{viewportElementCSS[_strPaddingMinus+_strTop]=viewportElementCSS[_strMarginMinus+_strTop]=viewportElementCSS[_strPaddingMinus+isRTLRight]=viewportElementCSS[_strMarginMinus+isRTLRight]=_strEmpty
}viewportElementCSS[_strPaddingMinus+isRTLLeft]=viewportElementCSS[_strMarginMinus+isRTLLeft]=_strEmpty;
if((hasOverflow.x&&hideOverflow.x)||(hasOverflow.y&&hideOverflow.y)||hideOverflowForceTextarea){if(_isTextarea&&hideOverflowForceTextarea){paddingElementCSS[strOverflowX]=paddingElementCSS[strOverflowY]=strHidden
}}else{if(!clipAlways||(overflowBehaviorIsVH.x||overflowBehaviorIsVS.x||overflowBehaviorIsVH.y||overflowBehaviorIsVS.y)){if(_isTextarea){paddingElementCSS[strOverflowX]=paddingElementCSS[strOverflowY]=_strEmpty
}viewportElementCSS[strOverflowX]=viewportElementCSS[strOverflowY]=strVisible
}}_paddingElement.css(paddingElementCSS);
_viewportElement.css(viewportElementCSS);
viewportElementCSS={};
if((hasOverflow.c||boxSizingChanged||widthAutoChanged||heightAutoChanged)&&!(_nativeScrollbarIsOverlaid.x&&_nativeScrollbarIsOverlaid.y)){var elementStyle=_contentElementNative[LEXICON.s];
var dump;
elementStyle.webkitTransform="scale(1)";
elementStyle.display="run-in";
dump=_contentElementNative[LEXICON.oH];
elementStyle.display=_strEmpty;
elementStyle.webkitTransform=_strEmpty
}}contentElementCSS={};
if(cssDirectionChanged||widthAutoChanged||heightAutoChanged){if(_isRTL&&widthAuto){var floatTmp=_contentElement.css(_strFloat);
var posLeftWithoutFloat=MATH.round(_contentElement.css(_strFloat,_strEmpty).css(_strLeft,_strEmpty).position().left);
_contentElement.css(_strFloat,floatTmp);
var posLeftWithFloat=MATH.round(_contentElement.position().left);
if(posLeftWithoutFloat!==posLeftWithFloat){contentElementCSS[_strLeft]=posLeftWithoutFloat
}}else{contentElementCSS[_strLeft]=_strEmpty
}}_contentElement.css(contentElementCSS);
if(_isTextarea&&contentSizeChanged){var textareaInfo=getTextareaInfo();
if(textareaInfo){var textareaRowsChanged=_textareaInfoCache===undefined?true:textareaInfo._rows!==_textareaInfoCache._rows;
var cursorRow=textareaInfo._cursorRow;
var cursorCol=textareaInfo._cursorColumn;
var widestRow=textareaInfo._widestRow;
var lastRow=textareaInfo._rows;
var lastCol=textareaInfo._columns;
var cursorPos=textareaInfo._cursorPosition;
var cursorMax=textareaInfo._cursorMax;
var cursorIsLastPosition=(cursorPos>=cursorMax&&_textareaHasFocus);
var textareaScrollAmount={x:(!textareaAutoWrapping&&(cursorCol===lastCol&&cursorRow===widestRow))?_overflowAmountCache.x:-1,y:(textareaAutoWrapping?cursorIsLastPosition||textareaRowsChanged&&(previousOverflowAmount?(currScroll.y===previousOverflowAmount.y):false):(cursorIsLastPosition||textareaRowsChanged)&&cursorRow===lastRow)?_overflowAmountCache.y:-1};
currScroll.x=textareaScrollAmount.x>-1?(_isRTL&&_normalizeRTLCache&&_rtlScrollBehavior.i?0:textareaScrollAmount.x):currScroll.x;
currScroll.y=textareaScrollAmount.y>-1?textareaScrollAmount.y:currScroll.y
}_textareaInfoCache=textareaInfo
}if(_isRTL&&_rtlScrollBehavior.i&&_nativeScrollbarIsOverlaid.y&&hasOverflow.x&&_normalizeRTLCache){currScroll.x+=_contentBorderSize.w||0
}if(widthAuto){_hostElement[_strScrollLeft](0)
}if(heightAuto){_hostElement[_strScrollTop](0)
}_viewportElement[_strScrollLeft](currScroll.x)[_strScrollTop](currScroll.y);
var scrollbarsVisibilityVisible=scrollbarsVisibility==="v";
var scrollbarsVisibilityHidden=scrollbarsVisibility==="h";
var scrollbarsVisibilityAuto=scrollbarsVisibility==="a";
var refreshScrollbarsVisibility=function(showX,showY){showY=showY===undefined?showX:showY;
refreshScrollbarAppearance(true,showX,canScroll.x);
refreshScrollbarAppearance(false,showY,canScroll.y)
};
addRemoveClass(_hostElement,_classNameHostOverflow,hideOverflow.x||hideOverflow.y);
addRemoveClass(_hostElement,_classNameHostOverflowX,hideOverflow.x);
addRemoveClass(_hostElement,_classNameHostOverflowY,hideOverflow.y);
if(cssDirectionChanged&&!_isBody){addRemoveClass(_hostElement,_classNameHostRTL,_isRTL)
}if(_isBody){addClass(_hostElement,_classNameHostResizeDisabled)
}if(resizeChanged){addRemoveClass(_hostElement,_classNameHostResizeDisabled,_resizeNone);
addRemoveClass(_scrollbarCornerElement,_classNameScrollbarCornerResize,!_resizeNone);
addRemoveClass(_scrollbarCornerElement,_classNameScrollbarCornerResizeB,_resizeBoth);
addRemoveClass(_scrollbarCornerElement,_classNameScrollbarCornerResizeH,_resizeHorizontal);
addRemoveClass(_scrollbarCornerElement,_classNameScrollbarCornerResizeV,_resizeVertical)
}if(scrollbarsVisibilityChanged||overflowBehaviorChanged||hideOverflow.c||hasOverflow.c||ignoreOverlayScrollbarHidingChanged){if(ignoreOverlayScrollbarHiding){if(ignoreOverlayScrollbarHidingChanged){removeClass(_hostElement,_classNameHostScrolling);
if(ignoreOverlayScrollbarHiding){refreshScrollbarsVisibility(false)
}}}else{if(scrollbarsVisibilityAuto){refreshScrollbarsVisibility(canScroll.x,canScroll.y)
}else{if(scrollbarsVisibilityVisible){refreshScrollbarsVisibility(true)
}else{if(scrollbarsVisibilityHidden){refreshScrollbarsVisibility(false)
}}}}}if(scrollbarsAutoHideChanged||ignoreOverlayScrollbarHidingChanged){setupHostMouseTouchEvents(!_scrollbarsAutoHideLeave&&!_scrollbarsAutoHideMove);
refreshScrollbarsAutoHide(_scrollbarsAutoHideNever,!_scrollbarsAutoHideNever)
}if(hostSizeChanged||overflowAmount.c||heightAutoChanged||widthAutoChanged||resizeChanged||boxSizingChanged||paddingAbsoluteChanged||ignoreOverlayScrollbarHidingChanged||cssDirectionChanged){refreshScrollbarHandleLength(true);
refreshScrollbarHandleOffset(true);
refreshScrollbarHandleLength(false);
refreshScrollbarHandleOffset(false)
}if(scrollbarsClickScrollingChanged){refreshScrollbarsInteractive(true,scrollbarsClickScrolling)
}if(scrollbarsDragScrollingChanged){refreshScrollbarsInteractive(false,scrollbarsDragScrolling)
}dispatchCallback("onDirectionChanged",{isRTL:_isRTL,dir:cssDirection},cssDirectionChanged);
dispatchCallback("onHostSizeChanged",{width:_hostSizeCache.w,height:_hostSizeCache.h},hostSizeChanged);
dispatchCallback("onContentSizeChanged",{width:_contentScrollSizeCache.w,height:_contentScrollSizeCache.h},contentSizeChanged);
dispatchCallback("onOverflowChanged",{x:hasOverflow.x,y:hasOverflow.y,xScrollable:hideOverflow.xs,yScrollable:hideOverflow.ys,clipped:hideOverflow.x||hideOverflow.y},hasOverflow.c||hideOverflow.c);
dispatchCallback("onOverflowAmountChanged",{x:overflowAmount.x,y:overflowAmount.y},overflowAmount.c)
}if(_isBody&&_bodyMinSizeCache&&(_hasOverflowCache.c||_bodyMinSizeCache.c)){if(!_bodyMinSizeCache.f){bodyMinSizeChanged()
}if(_nativeScrollbarIsOverlaid.y&&_hasOverflowCache.x){_contentElement.css(_strMinMinus+_strWidth,_bodyMinSizeCache.w+_overlayScrollbarDummySize.y)
}if(_nativeScrollbarIsOverlaid.x&&_hasOverflowCache.y){_contentElement.css(_strMinMinus+_strHeight,_bodyMinSizeCache.h+_overlayScrollbarDummySize.x)
}_bodyMinSizeCache.c=false
}if(_initialized&&changedOptions.updateOnLoad){updateElementsOnLoad()
}dispatchCallback("onUpdated",{forced:force})
}function updateElementsOnLoad(){if(!_isTextarea){eachUpdateOnLoad(function(i,updateOnLoadSelector){_contentElement.find(updateOnLoadSelector).each(function(i,el){if(COMPATIBILITY.inA(el,_updateOnLoadElms)<0){_updateOnLoadElms.push(el);
FRAMEWORK(el).off(_updateOnLoadEventName,updateOnLoadCallback).on(_updateOnLoadEventName,updateOnLoadCallback)
}})
})
}}function setOptions(newOptions){var validatedOpts=_pluginsOptions._validate(newOptions,_pluginsOptions._template,true,_currentOptions);
_currentOptions=extendDeep({},_currentOptions,validatedOpts._default);
_currentPreparedOptions=extendDeep({},_currentPreparedOptions,validatedOpts._prepared);
return validatedOpts._prepared
}function setupStructureDOM(destroy){var strParent="parent";
var classNameResizeObserverHost="os-resize-observer-host";
var classNameTextareaElementFull=_classNameTextareaElement+_strSpace+_classNameTextInherit;
var textareaClass=_isTextarea?_strSpace+_classNameTextInherit:_strEmpty;
var adoptAttrs=_currentPreparedOptions.textarea.inheritedAttrs;
var adoptAttrsMap={};
var applyAdoptedAttrs=function(){var applyAdoptedAttrsElm=destroy?_targetElement:_hostElement;
each(adoptAttrsMap,function(key,value){if(type(value)==TYPES.s){if(key==LEXICON.c){applyAdoptedAttrsElm.addClass(value)
}else{applyAdoptedAttrsElm.attr(key,value)
}}})
};
var hostElementClassNames=[_classNameHostElement,_classNameHostElementForeign,_classNameHostTextareaElement,_classNameHostResizeDisabled,_classNameHostRTL,_classNameHostScrollbarHorizontalHidden,_classNameHostScrollbarVerticalHidden,_classNameHostTransition,_classNameHostScrolling,_classNameHostOverflow,_classNameHostOverflowX,_classNameHostOverflowY,_classNameThemeNone,_classNameTextareaElement,_classNameTextInherit,_classNameCache].join(_strSpace);
var hostElementCSS={};
_hostElement=_hostElement||(_isTextarea?(_domExists?_targetElement[strParent]()[strParent]()[strParent]()[strParent]():FRAMEWORK(generateDiv(_classNameHostTextareaElement))):_targetElement);
_contentElement=_contentElement||selectOrGenerateDivByClass(_classNameContentElement+textareaClass);
_viewportElement=_viewportElement||selectOrGenerateDivByClass(_classNameViewportElement+textareaClass);
_paddingElement=_paddingElement||selectOrGenerateDivByClass(_classNamePaddingElement+textareaClass);
_sizeObserverElement=_sizeObserverElement||selectOrGenerateDivByClass(classNameResizeObserverHost);
_textareaCoverElement=_textareaCoverElement||(_isTextarea?selectOrGenerateDivByClass(_classNameTextareaCoverElement):undefined);
if(_domExists){addClass(_hostElement,_classNameHostElementForeign)
}if(destroy){removeClass(_hostElement,hostElementClassNames)
}adoptAttrs=type(adoptAttrs)==TYPES.s?adoptAttrs.split(_strSpace):adoptAttrs;
if(COMPATIBILITY.isA(adoptAttrs)&&_isTextarea){each(adoptAttrs,function(i,v){if(type(v)==TYPES.s){adoptAttrsMap[v]=destroy?_hostElement.attr(v):_targetElement.attr(v)
}})
}if(!destroy){if(_isTextarea){if(!_currentPreparedOptions.sizeAutoCapable){hostElementCSS[_strWidth]=_targetElement.css(_strWidth);
hostElementCSS[_strHeight]=_targetElement.css(_strHeight)
}if(!_domExists){_targetElement.addClass(_classNameTextInherit).wrap(_hostElement)
}_hostElement=_targetElement[strParent]().css(hostElementCSS)
}if(!_domExists){addClass(_targetElement,_isTextarea?classNameTextareaElementFull:_classNameHostElement);
_hostElement.wrapInner(_contentElement).wrapInner(_viewportElement).wrapInner(_paddingElement).prepend(_sizeObserverElement);
_contentElement=findFirst(_hostElement,_strDot+_classNameContentElement);
_viewportElement=findFirst(_hostElement,_strDot+_classNameViewportElement);
_paddingElement=findFirst(_hostElement,_strDot+_classNamePaddingElement);
if(_isTextarea){_contentElement.prepend(_textareaCoverElement);
applyAdoptedAttrs()
}}if(_nativeScrollbarStyling){addClass(_viewportElement,_classNameViewportNativeScrollbarsInvisible)
}if(_nativeScrollbarIsOverlaid.x&&_nativeScrollbarIsOverlaid.y){addClass(_viewportElement,_classNameViewportNativeScrollbarsOverlaid)
}if(_isBody){addClass(_htmlElement,_classNameHTMLElement)
}_sizeObserverElementNative=_sizeObserverElement[0];
_hostElementNative=_hostElement[0];
_paddingElementNative=_paddingElement[0];
_viewportElementNative=_viewportElement[0];
_contentElementNative=_contentElement[0];
updateViewportAttrsFromTarget()
}else{if(_domExists&&_initialized){_sizeObserverElement.children().remove();
each([_paddingElement,_viewportElement,_contentElement,_textareaCoverElement],function(i,elm){if(elm){removeClass(elm.removeAttr(LEXICON.s),_classNamesDynamicDestroy)
}});
addClass(_hostElement,_isTextarea?_classNameHostTextareaElement:_classNameHostElement)
}else{remove(_sizeObserverElement);
_contentElement.contents().unwrap().unwrap().unwrap();
if(_isTextarea){_targetElement.unwrap();
remove(_hostElement);
remove(_textareaCoverElement);
applyAdoptedAttrs()
}}if(_isTextarea){_targetElement.removeAttr(LEXICON.s)
}if(_isBody){removeClass(_htmlElement,_classNameHTMLElement)
}}}function setupStructureEvents(){var textareaKeyDownRestrictedKeyCodes=[112,113,114,115,116,117,118,119,120,121,123,33,34,37,38,39,40,16,17,18,19,20,144];
var textareaKeyDownKeyCodesList=[];
var textareaUpdateIntervalID;
var scrollStopTimeoutId;
var scrollStopDelay=175;
var strFocus="focus";
function updateTextarea(doClearInterval){textareaUpdate();
_base.update(_strAuto);
if(doClearInterval&&_autoUpdateRecommended){clearInterval(textareaUpdateIntervalID)
}}function textareaOnScroll(event){_targetElement[_strScrollLeft](_rtlScrollBehavior.i&&_normalizeRTLCache?9999999:0);
_targetElement[_strScrollTop](0);
COMPATIBILITY.prvD(event);
COMPATIBILITY.stpP(event);
return false
}function textareaOnDrop(event){setTimeout(function(){if(!_destroyed){updateTextarea()
}},50)
}function textareaOnFocus(){_textareaHasFocus=true;
addClass(_hostElement,strFocus)
}function textareaOnFocusout(){_textareaHasFocus=false;
textareaKeyDownKeyCodesList=[];
removeClass(_hostElement,strFocus);
updateTextarea(true)
}function textareaOnKeyDown(event){var keyCode=event.keyCode;
if(inArray(keyCode,textareaKeyDownRestrictedKeyCodes)<0){if(!textareaKeyDownKeyCodesList[LEXICON.l]){updateTextarea();
textareaUpdateIntervalID=setInterval(updateTextarea,1000/60)
}if(inArray(keyCode,textareaKeyDownKeyCodesList)<0){textareaKeyDownKeyCodesList.push(keyCode)
}}}function textareaOnKeyUp(event){var keyCode=event.keyCode;
var index=inArray(keyCode,textareaKeyDownKeyCodesList);
if(inArray(keyCode,textareaKeyDownRestrictedKeyCodes)<0){if(index>-1){textareaKeyDownKeyCodesList.splice(index,1)
}if(!textareaKeyDownKeyCodesList[LEXICON.l]){updateTextarea(true)
}}}function contentOnTransitionEnd(event){if(_autoUpdateCache===true){return
}event=event.originalEvent||event;
if(isSizeAffectingCSSProperty(event.propertyName)){_base.update(_strAuto)
}}function viewportOnScroll(event){if(!_sleeping){if(scrollStopTimeoutId!==undefined){clearTimeout(scrollStopTimeoutId)
}else{if(_scrollbarsAutoHideScroll||_scrollbarsAutoHideMove){refreshScrollbarsAutoHide(true)
}if(!nativeOverlayScrollbarsAreActive()){addClass(_hostElement,_classNameHostScrolling)
}dispatchCallback("onScrollStart",event)
}if(!_scrollbarsHandlesDefineScrollPos){refreshScrollbarHandleOffset(true);
refreshScrollbarHandleOffset(false)
}dispatchCallback("onScroll",event);
scrollStopTimeoutId=setTimeout(function(){if(!_destroyed){clearTimeout(scrollStopTimeoutId);
scrollStopTimeoutId=undefined;
if(_scrollbarsAutoHideScroll||_scrollbarsAutoHideMove){refreshScrollbarsAutoHide(false)
}if(!nativeOverlayScrollbarsAreActive()){removeClass(_hostElement,_classNameHostScrolling)
}dispatchCallback("onScrollStop",event)
}},scrollStopDelay)
}}if(_isTextarea){if(_msieVersion>9||!_autoUpdateRecommended){addDestroyEventListener(_targetElement,"input",updateTextarea)
}else{addDestroyEventListener(_targetElement,[_strKeyDownEvent,_strKeyUpEvent],[textareaOnKeyDown,textareaOnKeyUp])
}addDestroyEventListener(_targetElement,[_strScroll,"drop",strFocus,strFocus+"out"],[textareaOnScroll,textareaOnDrop,textareaOnFocus,textareaOnFocusout])
}else{addDestroyEventListener(_contentElement,_strTransitionEndEvent,contentOnTransitionEnd)
}addDestroyEventListener(_viewportElement,_strScroll,viewportOnScroll,true)
}function setupScrollbarsDOM(destroy){var selectOrGenerateScrollbarDOM=function(isHorizontal){var scrollbarClassName=isHorizontal?_classNameScrollbarHorizontal:_classNameScrollbarVertical;
var scrollbar=selectOrGenerateDivByClass(_classNameScrollbar+_strSpace+scrollbarClassName,true);
var track=selectOrGenerateDivByClass(_classNameScrollbarTrack,scrollbar);
var handle=selectOrGenerateDivByClass(_classNameScrollbarHandle,scrollbar);
if(!_domExists&&!destroy){scrollbar.append(track);
track.append(handle)
}return{_scrollbar:scrollbar,_track:track,_handle:handle}
};
function resetScrollbarDOM(isHorizontal){var scrollbarVars=getScrollbarVars(isHorizontal);
var scrollbar=scrollbarVars._scrollbar;
var track=scrollbarVars._track;
var handle=scrollbarVars._handle;
if(_domExists&&_initialized){each([scrollbar,track,handle],function(i,elm){removeClass(elm.removeAttr(LEXICON.s),_classNamesDynamicDestroy)
})
}else{remove(scrollbar||selectOrGenerateScrollbarDOM(isHorizontal)._scrollbar)
}}var horizontalElements;
var verticalElements;
if(!destroy){horizontalElements=selectOrGenerateScrollbarDOM(true);
verticalElements=selectOrGenerateScrollbarDOM();
_scrollbarHorizontalElement=horizontalElements._scrollbar;
_scrollbarHorizontalTrackElement=horizontalElements._track;
_scrollbarHorizontalHandleElement=horizontalElements._handle;
_scrollbarVerticalElement=verticalElements._scrollbar;
_scrollbarVerticalTrackElement=verticalElements._track;
_scrollbarVerticalHandleElement=verticalElements._handle;
if(!_domExists){_paddingElement.after(_scrollbarVerticalElement);
_paddingElement.after(_scrollbarHorizontalElement)
}}else{resetScrollbarDOM(true);
resetScrollbarDOM()
}}function setupScrollbarEvents(isHorizontal){var scrollbarVars=getScrollbarVars(isHorizontal);
var scrollbarVarsInfo=scrollbarVars._info;
var insideIFrame=_windowElementNative.top!==_windowElementNative;
var xy=scrollbarVars._x_y;
var XY=scrollbarVars._X_Y;
var scroll=_strScroll+scrollbarVars._Left_Top;
var strActive="active";
var strSnapHandle="snapHandle";
var strClickEvent="click";
var scrollDurationFactor=1;
var increaseDecreaseScrollAmountKeyCodes=[16,17];
var trackTimeout;
var mouseDownScroll;
var mouseDownOffset;
var mouseDownInvertedScale;
function getPointerPosition(event){return _msieVersion&&insideIFrame?event["screen"+XY]:COMPATIBILITY.page(event)[xy]
}function getPreparedScrollbarsOption(name){return _currentPreparedOptions.scrollbars[name]
}function increaseTrackScrollAmount(){scrollDurationFactor=0.5
}function decreaseTrackScrollAmount(){scrollDurationFactor=1
}function stopClickEventPropagation(event){COMPATIBILITY.stpP(event)
}function documentKeyDown(event){if(inArray(event.keyCode,increaseDecreaseScrollAmountKeyCodes)>-1){increaseTrackScrollAmount()
}}function documentKeyUp(event){if(inArray(event.keyCode,increaseDecreaseScrollAmountKeyCodes)>-1){decreaseTrackScrollAmount()
}}function onMouseTouchDownContinue(event){var originalEvent=event.originalEvent||event;
var isTouchEvent=originalEvent.touches!==undefined;
return _sleeping||_destroyed||nativeOverlayScrollbarsAreActive()||!_scrollbarsDragScrollingCache||(isTouchEvent&&!getPreparedScrollbarsOption("touchSupport"))?false:COMPATIBILITY.mBtn(event)===1||isTouchEvent
}function documentDragMove(event){if(onMouseTouchDownContinue(event)){var trackLength=scrollbarVarsInfo._trackLength;
var handleLength=scrollbarVarsInfo._handleLength;
var scrollRange=scrollbarVarsInfo._maxScroll;
var scrollRaw=(getPointerPosition(event)-mouseDownOffset)*mouseDownInvertedScale;
var scrollDeltaPercent=scrollRaw/(trackLength-handleLength);
var scrollDelta=(scrollRange*scrollDeltaPercent);
scrollDelta=isFinite(scrollDelta)?scrollDelta:0;
if(_isRTL&&isHorizontal&&!_rtlScrollBehavior.i){scrollDelta*=-1
}_viewportElement[scroll](MATH.round(mouseDownScroll+scrollDelta));
if(_scrollbarsHandlesDefineScrollPos){refreshScrollbarHandleOffset(isHorizontal,mouseDownScroll+scrollDelta)
}if(!_supportPassiveEvents){COMPATIBILITY.prvD(event)
}}else{documentMouseTouchUp(event)
}}function documentMouseTouchUp(event){event=event||event.originalEvent;
setupResponsiveEventListener(_documentElement,[_strMouseTouchMoveEvent,_strMouseTouchUpEvent,_strKeyDownEvent,_strKeyUpEvent,_strSelectStartEvent],[documentDragMove,documentMouseTouchUp,documentKeyDown,documentKeyUp,documentOnSelectStart],true);
COMPATIBILITY.rAF()(function(){setupResponsiveEventListener(_documentElement,strClickEvent,stopClickEventPropagation,true,{_capture:true})
});
if(_scrollbarsHandlesDefineScrollPos){refreshScrollbarHandleOffset(isHorizontal,true)
}_scrollbarsHandlesDefineScrollPos=false;
removeClass(_bodyElement,_classNameDragging);
removeClass(scrollbarVars._handle,strActive);
removeClass(scrollbarVars._track,strActive);
removeClass(scrollbarVars._scrollbar,strActive);
mouseDownScroll=undefined;
mouseDownOffset=undefined;
mouseDownInvertedScale=1;
decreaseTrackScrollAmount();
if(trackTimeout!==undefined){_base.scrollStop();
clearTimeout(trackTimeout);
trackTimeout=undefined
}if(event){var rect=_hostElementNative[LEXICON.bCR]();
var mouseInsideHost=event.clientX>=rect.left&&event.clientX<=rect.right&&event.clientY>=rect.top&&event.clientY<=rect.bottom;
if(!mouseInsideHost){hostOnMouseLeave()
}if(_scrollbarsAutoHideScroll||_scrollbarsAutoHideMove){refreshScrollbarsAutoHide(false)
}}}function onHandleMouseTouchDown(event){if(onMouseTouchDownContinue(event)){onHandleMouseTouchDownAction(event)
}}function onHandleMouseTouchDownAction(event){mouseDownScroll=_viewportElement[scroll]();
mouseDownScroll=isNaN(mouseDownScroll)?0:mouseDownScroll;
if(_isRTL&&isHorizontal&&!_rtlScrollBehavior.n||!_isRTL){mouseDownScroll=mouseDownScroll<0?0:mouseDownScroll
}mouseDownInvertedScale=getHostElementInvertedScale()[xy];
mouseDownOffset=getPointerPosition(event);
_scrollbarsHandlesDefineScrollPos=!getPreparedScrollbarsOption(strSnapHandle);
addClass(_bodyElement,_classNameDragging);
addClass(scrollbarVars._handle,strActive);
addClass(scrollbarVars._scrollbar,strActive);
setupResponsiveEventListener(_documentElement,[_strMouseTouchMoveEvent,_strMouseTouchUpEvent,_strSelectStartEvent],[documentDragMove,documentMouseTouchUp,documentOnSelectStart]);
COMPATIBILITY.rAF()(function(){setupResponsiveEventListener(_documentElement,strClickEvent,stopClickEventPropagation,false,{_capture:true})
});
if(_msieVersion||!_documentMixed){COMPATIBILITY.prvD(event)
}COMPATIBILITY.stpP(event)
}function onTrackMouseTouchDown(event){if(onMouseTouchDownContinue(event)){var handleToViewportRatio=scrollbarVars._info._handleLength/Math.round(MATH.min(1,_viewportSize[scrollbarVars._w_h]/_contentScrollSizeCache[scrollbarVars._w_h])*scrollbarVars._info._trackLength);
var scrollDistance=MATH.round(_viewportSize[scrollbarVars._w_h]*handleToViewportRatio);
var scrollBaseDuration=270*handleToViewportRatio;
var scrollFirstIterationDelay=400*handleToViewportRatio;
var trackOffset=scrollbarVars._track.offset()[scrollbarVars._left_top];
var ctrlKey=event.ctrlKey;
var instantScroll=event.shiftKey;
var instantScrollTransition=instantScroll&&ctrlKey;
var isFirstIteration=true;
var easing="linear";
var decreaseScroll;
var finishedCondition;
var scrollActionFinsished=function(transition){if(_scrollbarsHandlesDefineScrollPos){refreshScrollbarHandleOffset(isHorizontal,transition)
}};
var scrollActionInstantFinished=function(){scrollActionFinsished();
onHandleMouseTouchDownAction(event)
};
var scrollAction=function(){if(!_destroyed){var mouseOffset=(mouseDownOffset-trackOffset)*mouseDownInvertedScale;
var handleOffset=scrollbarVarsInfo._handleOffset;
var trackLength=scrollbarVarsInfo._trackLength;
var handleLength=scrollbarVarsInfo._handleLength;
var scrollRange=scrollbarVarsInfo._maxScroll;
var currScroll=scrollbarVarsInfo._currentScroll;
var scrollDuration=scrollBaseDuration*scrollDurationFactor;
var timeoutDelay=isFirstIteration?MATH.max(scrollFirstIterationDelay,scrollDuration):scrollDuration;
var instantScrollPosition=scrollRange*((mouseOffset-(handleLength/2))/(trackLength-handleLength));
var rtlIsNormal=_isRTL&&isHorizontal&&((!_rtlScrollBehavior.i&&!_rtlScrollBehavior.n)||_normalizeRTLCache);
var decreaseScrollCondition=rtlIsNormal?handleOffset<mouseOffset:handleOffset>mouseOffset;
var scrollObj={};
var animationObj={easing:easing,step:function(now){if(_scrollbarsHandlesDefineScrollPos){_viewportElement[scroll](now);
refreshScrollbarHandleOffset(isHorizontal,now)
}}};
instantScrollPosition=isFinite(instantScrollPosition)?instantScrollPosition:0;
instantScrollPosition=_isRTL&&isHorizontal&&!_rtlScrollBehavior.i?(scrollRange-instantScrollPosition):instantScrollPosition;
if(instantScroll){_viewportElement[scroll](instantScrollPosition);
if(instantScrollTransition){instantScrollPosition=_viewportElement[scroll]();
_viewportElement[scroll](currScroll);
instantScrollPosition=rtlIsNormal&&_rtlScrollBehavior.i?(scrollRange-instantScrollPosition):instantScrollPosition;
instantScrollPosition=rtlIsNormal&&_rtlScrollBehavior.n?-instantScrollPosition:instantScrollPosition;
scrollObj[xy]=instantScrollPosition;
_base.scroll(scrollObj,extendDeep(animationObj,{duration:130,complete:scrollActionInstantFinished}))
}else{scrollActionInstantFinished()
}}else{decreaseScroll=isFirstIteration?decreaseScrollCondition:decreaseScroll;
finishedCondition=rtlIsNormal?(decreaseScroll?handleOffset+handleLength>=mouseOffset:handleOffset<=mouseOffset):(decreaseScroll?handleOffset<=mouseOffset:handleOffset+handleLength>=mouseOffset);
if(finishedCondition){clearTimeout(trackTimeout);
_base.scrollStop();
trackTimeout=undefined;
scrollActionFinsished(true)
}else{trackTimeout=setTimeout(scrollAction,timeoutDelay);
scrollObj[xy]=(decreaseScroll?"-=":"+=")+scrollDistance;
_base.scroll(scrollObj,extendDeep(animationObj,{duration:scrollDuration}))
}isFirstIteration=false
}}};
if(ctrlKey){increaseTrackScrollAmount()
}mouseDownInvertedScale=getHostElementInvertedScale()[xy];
mouseDownOffset=COMPATIBILITY.page(event)[xy];
_scrollbarsHandlesDefineScrollPos=!getPreparedScrollbarsOption(strSnapHandle);
addClass(_bodyElement,_classNameDragging);
addClass(scrollbarVars._track,strActive);
addClass(scrollbarVars._scrollbar,strActive);
setupResponsiveEventListener(_documentElement,[_strMouseTouchUpEvent,_strKeyDownEvent,_strKeyUpEvent,_strSelectStartEvent],[documentMouseTouchUp,documentKeyDown,documentKeyUp,documentOnSelectStart]);
scrollAction();
COMPATIBILITY.prvD(event);
COMPATIBILITY.stpP(event)
}}function onTrackMouseTouchEnter(event){_scrollbarsHandleHovered=true;
if(_scrollbarsAutoHideScroll||_scrollbarsAutoHideMove){refreshScrollbarsAutoHide(true)
}}function onTrackMouseTouchLeave(event){_scrollbarsHandleHovered=false;
if(_scrollbarsAutoHideScroll||_scrollbarsAutoHideMove){refreshScrollbarsAutoHide(false)
}}function onScrollbarMouseTouchDown(event){COMPATIBILITY.stpP(event)
}addDestroyEventListener(scrollbarVars._handle,_strMouseTouchDownEvent,onHandleMouseTouchDown);
addDestroyEventListener(scrollbarVars._track,[_strMouseTouchDownEvent,_strMouseEnter,_strMouseLeave],[onTrackMouseTouchDown,onTrackMouseTouchEnter,onTrackMouseTouchLeave]);
addDestroyEventListener(scrollbarVars._scrollbar,_strMouseTouchDownEvent,onScrollbarMouseTouchDown);
if(_supportTransition){addDestroyEventListener(scrollbarVars._scrollbar,_strTransitionEndEvent,function(event){if(event.target!==scrollbarVars._scrollbar[0]){return
}refreshScrollbarHandleLength(isHorizontal);
refreshScrollbarHandleOffset(isHorizontal)
})
}}function refreshScrollbarAppearance(isHorizontal,shallBeVisible,canScroll){var scrollbarHiddenClassName=isHorizontal?_classNameHostScrollbarHorizontalHidden:_classNameHostScrollbarVerticalHidden;
var scrollbarElement=isHorizontal?_scrollbarHorizontalElement:_scrollbarVerticalElement;
addRemoveClass(_hostElement,scrollbarHiddenClassName,!shallBeVisible);
addRemoveClass(scrollbarElement,_classNameScrollbarUnusable,!canScroll)
}function refreshScrollbarsAutoHide(shallBeVisible,delayfree){clearTimeout(_scrollbarsAutoHideTimeoutId);
if(shallBeVisible){removeClass(_scrollbarHorizontalElement,_classNameScrollbarAutoHidden);
removeClass(_scrollbarVerticalElement,_classNameScrollbarAutoHidden)
}else{var anyActive;
var strActive="active";
var hide=function(){if(!_scrollbarsHandleHovered&&!_destroyed){anyActive=_scrollbarHorizontalHandleElement.hasClass(strActive)||_scrollbarVerticalHandleElement.hasClass(strActive);
if(!anyActive&&(_scrollbarsAutoHideScroll||_scrollbarsAutoHideMove||_scrollbarsAutoHideLeave)){addClass(_scrollbarHorizontalElement,_classNameScrollbarAutoHidden)
}if(!anyActive&&(_scrollbarsAutoHideScroll||_scrollbarsAutoHideMove||_scrollbarsAutoHideLeave)){addClass(_scrollbarVerticalElement,_classNameScrollbarAutoHidden)
}}};
if(_scrollbarsAutoHideDelay>0&&delayfree!==true){_scrollbarsAutoHideTimeoutId=setTimeout(hide,_scrollbarsAutoHideDelay)
}else{hide()
}}}function refreshScrollbarHandleLength(isHorizontal){var handleCSS={};
var scrollbarVars=getScrollbarVars(isHorizontal);
var scrollbarVarsInfo=scrollbarVars._info;
var digit=1000000;
var handleRatio=MATH.min(1,_viewportSize[scrollbarVars._w_h]/_contentScrollSizeCache[scrollbarVars._w_h]);
handleCSS[scrollbarVars._width_height]=(MATH.floor(handleRatio*100*digit)/digit)+"%";
if(!nativeOverlayScrollbarsAreActive()){scrollbarVars._handle.css(handleCSS)
}scrollbarVarsInfo._handleLength=scrollbarVars._handle[0]["offset"+scrollbarVars._Width_Height];
scrollbarVarsInfo._handleLengthRatio=handleRatio
}function refreshScrollbarHandleOffset(isHorizontal,scrollOrTransition){var transition=type(scrollOrTransition)==TYPES.b;
var transitionDuration=250;
var isRTLisHorizontal=_isRTL&&isHorizontal;
var scrollbarVars=getScrollbarVars(isHorizontal);
var scrollbarVarsInfo=scrollbarVars._info;
var strTranslateBrace="translate(";
var strTransform=VENDORS._cssProperty("transform");
var strTransition=VENDORS._cssProperty("transition");
var nativeScroll=isHorizontal?_viewportElement[_strScrollLeft]():_viewportElement[_strScrollTop]();
var currentScroll=scrollOrTransition===undefined||transition?nativeScroll:scrollOrTransition;
var handleLength=scrollbarVarsInfo._handleLength;
var trackLength=scrollbarVars._track[0]["offset"+scrollbarVars._Width_Height];
var handleTrackDiff=trackLength-handleLength;
var handleCSS={};
var transformOffset;
var translateValue;
var maxScroll=(_viewportElementNative[_strScroll+scrollbarVars._Width_Height]-_viewportElementNative["client"+scrollbarVars._Width_Height])*(_rtlScrollBehavior.n&&isRTLisHorizontal?-1:1);
var getScrollRatio=function(base){return isNaN(base/maxScroll)?0:MATH.max(0,MATH.min(1,base/maxScroll))
};
var getHandleOffset=function(scrollRatio){var offset=handleTrackDiff*scrollRatio;
offset=isNaN(offset)?0:offset;
offset=(isRTLisHorizontal&&!_rtlScrollBehavior.i)?(trackLength-handleLength-offset):offset;
offset=MATH.max(0,offset);
return offset
};
var scrollRatio=getScrollRatio(nativeScroll);
var unsnappedScrollRatio=getScrollRatio(currentScroll);
var handleOffset=getHandleOffset(unsnappedScrollRatio);
var snappedHandleOffset=getHandleOffset(scrollRatio);
scrollbarVarsInfo._maxScroll=maxScroll;
scrollbarVarsInfo._currentScroll=nativeScroll;
scrollbarVarsInfo._currentScrollRatio=scrollRatio;
if(_supportTransform){transformOffset=isRTLisHorizontal?-(trackLength-handleLength-handleOffset):handleOffset;
translateValue=isHorizontal?strTranslateBrace+transformOffset+"px, 0)":strTranslateBrace+"0, "+transformOffset+"px)";
handleCSS[strTransform]=translateValue;
if(_supportTransition){handleCSS[strTransition]=transition&&MATH.abs(handleOffset-scrollbarVarsInfo._handleOffset)>1?getCSSTransitionString(scrollbarVars._handle)+", "+(strTransform+_strSpace+transitionDuration+"ms"):_strEmpty
}}else{handleCSS[scrollbarVars._left_top]=handleOffset
}if(!nativeOverlayScrollbarsAreActive()){scrollbarVars._handle.css(handleCSS);
if(_supportTransform&&_supportTransition&&transition){scrollbarVars._handle.one(_strTransitionEndEvent,function(){if(!_destroyed){scrollbarVars._handle.css(strTransition,_strEmpty)
}})
}}scrollbarVarsInfo._handleOffset=handleOffset;
scrollbarVarsInfo._snappedHandleOffset=snappedHandleOffset;
scrollbarVarsInfo._trackLength=trackLength
}function refreshScrollbarsInteractive(isTrack,value){var action=value?"removeClass":"addClass";
var element1=isTrack?_scrollbarHorizontalTrackElement:_scrollbarHorizontalHandleElement;
var element2=isTrack?_scrollbarVerticalTrackElement:_scrollbarVerticalHandleElement;
var className=isTrack?_classNameScrollbarTrackOff:_classNameScrollbarHandleOff;
element1[action](className);
element2[action](className)
}function getScrollbarVars(isHorizontal){return{_width_height:isHorizontal?_strWidth:_strHeight,_Width_Height:isHorizontal?"Width":"Height",_left_top:isHorizontal?_strLeft:_strTop,_Left_Top:isHorizontal?"Left":"Top",_x_y:isHorizontal?_strX:_strY,_X_Y:isHorizontal?"X":"Y",_w_h:isHorizontal?"w":"h",_l_t:isHorizontal?"l":"t",_track:isHorizontal?_scrollbarHorizontalTrackElement:_scrollbarVerticalTrackElement,_handle:isHorizontal?_scrollbarHorizontalHandleElement:_scrollbarVerticalHandleElement,_scrollbar:isHorizontal?_scrollbarHorizontalElement:_scrollbarVerticalElement,_info:isHorizontal?_scrollHorizontalInfo:_scrollVerticalInfo}
}function setupScrollbarCornerDOM(destroy){_scrollbarCornerElement=_scrollbarCornerElement||selectOrGenerateDivByClass(_classNameScrollbarCorner,true);
if(!destroy){if(!_domExists){_hostElement.append(_scrollbarCornerElement)
}}else{if(_domExists&&_initialized){removeClass(_scrollbarCornerElement.removeAttr(LEXICON.s),_classNamesDynamicDestroy)
}else{remove(_scrollbarCornerElement)
}}}function setupScrollbarCornerEvents(){var insideIFrame=_windowElementNative.top!==_windowElementNative;
var mouseDownPosition={};
var mouseDownSize={};
var mouseDownInvertedScale={};
var reconnectMutationObserver;
function documentDragMove(event){if(onMouseTouchDownContinue(event)){var pageOffset=getCoordinates(event);
var hostElementCSS={};
if(_resizeHorizontal||_resizeBoth){hostElementCSS[_strWidth]=(mouseDownSize.w+(pageOffset.x-mouseDownPosition.x)*mouseDownInvertedScale.x)
}if(_resizeVertical||_resizeBoth){hostElementCSS[_strHeight]=(mouseDownSize.h+(pageOffset.y-mouseDownPosition.y)*mouseDownInvertedScale.y)
}_hostElement.css(hostElementCSS);
COMPATIBILITY.stpP(event)
}else{documentMouseTouchUp(event)
}}function documentMouseTouchUp(event){var eventIsTrusted=event!==undefined;
setupResponsiveEventListener(_documentElement,[_strSelectStartEvent,_strMouseTouchMoveEvent,_strMouseTouchUpEvent],[documentOnSelectStart,documentDragMove,documentMouseTouchUp],true);
removeClass(_bodyElement,_classNameDragging);
if(_scrollbarCornerElement.releaseCapture){_scrollbarCornerElement.releaseCapture()
}if(eventIsTrusted){if(reconnectMutationObserver){connectMutationObservers()
}_base.update(_strAuto)
}reconnectMutationObserver=false
}function onMouseTouchDownContinue(event){var originalEvent=event.originalEvent||event;
var isTouchEvent=originalEvent.touches!==undefined;
return _sleeping||_destroyed?false:COMPATIBILITY.mBtn(event)===1||isTouchEvent
}function getCoordinates(event){return _msieVersion&&insideIFrame?{x:event.screenX,y:event.screenY}:COMPATIBILITY.page(event)
}addDestroyEventListener(_scrollbarCornerElement,_strMouseTouchDownEvent,function(event){if(onMouseTouchDownContinue(event)&&!_resizeNone){if(_mutationObserversConnected){reconnectMutationObserver=true;
disconnectMutationObservers()
}mouseDownPosition=getCoordinates(event);
mouseDownSize.w=_hostElementNative[LEXICON.oW]-(!_isBorderBox?_paddingX:0);
mouseDownSize.h=_hostElementNative[LEXICON.oH]-(!_isBorderBox?_paddingY:0);
mouseDownInvertedScale=getHostElementInvertedScale();
setupResponsiveEventListener(_documentElement,[_strSelectStartEvent,_strMouseTouchMoveEvent,_strMouseTouchUpEvent],[documentOnSelectStart,documentDragMove,documentMouseTouchUp]);
addClass(_bodyElement,_classNameDragging);
if(_scrollbarCornerElement.setCapture){_scrollbarCornerElement.setCapture()
}COMPATIBILITY.prvD(event);
COMPATIBILITY.stpP(event)
}})
}function dispatchCallback(name,args,dependent){if(dependent===false){return
}if(_initialized){var callback=_currentPreparedOptions.callbacks[name];
var extensionOnName=name;
var ext;
if(extensionOnName.substr(0,2)==="on"){extensionOnName=extensionOnName.substr(2,1).toLowerCase()+extensionOnName.substr(3)
}if(type(callback)==TYPES.f){callback.call(_base,args)
}each(_extensions,function(){ext=this;
if(type(ext.on)==TYPES.f){ext.on(extensionOnName,args)
}})
}else{if(!_destroyed){_callbacksInitQeueue.push({n:name,a:args})
}}}function setTopRightBottomLeft(targetCSSObject,prefix,values){prefix=prefix||_strEmpty;
values=values||[_strEmpty,_strEmpty,_strEmpty,_strEmpty];
targetCSSObject[prefix+_strTop]=values[0];
targetCSSObject[prefix+_strRight]=values[1];
targetCSSObject[prefix+_strBottom]=values[2];
targetCSSObject[prefix+_strLeft]=values[3]
}function getTopRightBottomLeftHost(prefix,suffix,zeroX,zeroY){suffix=suffix||_strEmpty;
prefix=prefix||_strEmpty;
return{t:zeroY?0:parseToZeroOrNumber(_hostElement.css(prefix+_strTop+suffix)),r:zeroX?0:parseToZeroOrNumber(_hostElement.css(prefix+_strRight+suffix)),b:zeroY?0:parseToZeroOrNumber(_hostElement.css(prefix+_strBottom+suffix)),l:zeroX?0:parseToZeroOrNumber(_hostElement.css(prefix+_strLeft+suffix))}
}function getCSSTransitionString(element){var transitionStr=VENDORS._cssProperty("transition");
var assembledValue=element.css(transitionStr);
if(assembledValue){return assembledValue
}var regExpString="\\s*(([^,(]+(\\(.+?\\))?)+)[\\s,]*";
var regExpMain=new RegExp(regExpString);
var regExpValidate=new RegExp("^("+regExpString+")+$");
var properties="property duration timing-function delay".split(" ");
var result=[];
var strResult;
var valueArray;
var i=0;
var j;
var splitCssStyleByComma=function(str){strResult=[];
if(!str.match(regExpValidate)){return str
}while(str.match(regExpMain)){strResult.push(RegExp.$1);
str=str.replace(regExpMain,_strEmpty)
}return strResult
};
for(;
i<properties[LEXICON.l];
i++){valueArray=splitCssStyleByComma(element.css(transitionStr+"-"+properties[i]));
for(j=0;
j<valueArray[LEXICON.l];
j++){result[j]=(result[j]?result[j]+_strSpace:_strEmpty)+valueArray[j]
}}return result.join(", ")
}function createHostClassNameRegExp(withCurrClassNameOption,withOldClassNameOption){var i;
var split;
var appendix;
var appendClasses=function(classes,condition){appendix="";
if(condition&&typeof classes==TYPES.s){split=classes.split(_strSpace);
for(i=0;
i<split[LEXICON.l];
i++){appendix+="|"+split[i]+"$"
}}return appendix
};
return new RegExp("(^"+_classNameHostElement+"([-_].+|)$)"+appendClasses(_classNameCache,withCurrClassNameOption)+appendClasses(_oldClassName,withOldClassNameOption),"g")
}function getHostElementInvertedScale(){var rect=_paddingElementNative[LEXICON.bCR]();
return{x:_supportTransform?1/(MATH.round(rect.width)/_paddingElementNative[LEXICON.oW])||1:1,y:_supportTransform?1/(MATH.round(rect.height)/_paddingElementNative[LEXICON.oH])||1:1}
}function isHTMLElement(o){var strOwnerDocument="ownerDocument";
var strHTMLElement="HTMLElement";
var wnd=o&&o[strOwnerDocument]?(o[strOwnerDocument].parentWindow||window):window;
return(typeof wnd[strHTMLElement]==TYPES.o?o instanceof wnd[strHTMLElement]:o&&typeof o==TYPES.o&&o!==null&&o.nodeType===1&&typeof o.nodeName==TYPES.s)
}function getArrayDifferences(a1,a2){var a=[];
var diff=[];
var i;
var k;
for(i=0;
i<a1.length;
i++){a[a1[i]]=true
}for(i=0;
i<a2.length;
i++){if(a[a2[i]]){delete a[a2[i]]
}else{a[a2[i]]=true
}}for(k in a){diff.push(k)
}return diff
}function parseToZeroOrNumber(value,toFloat){var num=toFloat?parseFloat(value):parseInt(value,10);
return isNaN(num)?0:num
}function getTextareaInfo(){var textareaCursorPosition=_targetElementNative.selectionStart;
if(textareaCursorPosition===undefined){return
}var textareaValue=_targetElement.val();
var textareaLength=textareaValue[LEXICON.l];
var textareaRowSplit=textareaValue.split("\n");
var textareaLastRow=textareaRowSplit[LEXICON.l];
var textareaCurrentCursorRowSplit=textareaValue.substr(0,textareaCursorPosition).split("\n");
var widestRow=0;
var textareaLastCol=0;
var cursorRow=textareaCurrentCursorRowSplit[LEXICON.l];
var cursorCol=textareaCurrentCursorRowSplit[textareaCurrentCursorRowSplit[LEXICON.l]-1][LEXICON.l];
var rowCols;
var i;
for(i=0;
i<textareaRowSplit[LEXICON.l];
i++){rowCols=textareaRowSplit[i][LEXICON.l];
if(rowCols>textareaLastCol){widestRow=i+1;
textareaLastCol=rowCols
}}return{_cursorRow:cursorRow,_cursorColumn:cursorCol,_rows:textareaLastRow,_columns:textareaLastCol,_widestRow:widestRow,_cursorPosition:textareaCursorPosition,_cursorMax:textareaLength}
}function nativeOverlayScrollbarsAreActive(){return(_ignoreOverlayScrollbarHidingCache&&(_nativeScrollbarIsOverlaid.x&&_nativeScrollbarIsOverlaid.y))
}function getContentMeasureElement(){return _isTextarea?_textareaCoverElement[0]:_contentElementNative
}function generateDiv(classesOrAttrs,content){return"<div "+(classesOrAttrs?type(classesOrAttrs)==TYPES.s?'class="'+classesOrAttrs+'"':(function(){var key;
var attrs=_strEmpty;
if(FRAMEWORK.isPlainObject(classesOrAttrs)){for(key in classesOrAttrs){attrs+=(key==="c"?"class":key)+'="'+classesOrAttrs[key]+'" '
}}return attrs
})():_strEmpty)+">"+(content||_strEmpty)+"</div>"
}function selectOrGenerateDivByClass(className,selectParentOrOnlyChildren){var onlyChildren=type(selectParentOrOnlyChildren)==TYPES.b;
var selectParent=onlyChildren?_hostElement:(selectParentOrOnlyChildren||_hostElement);
return(_domExists&&!selectParent[LEXICON.l])?null:_domExists?selectParent[onlyChildren?"children":"find"](_strDot+className.replace(/\s/g,_strDot)).eq(0):FRAMEWORK(generateDiv(className))
}function getObjectPropVal(obj,path){var splits=path.split(_strDot);
var i=0;
var val;
for(;
i<splits.length;
i++){if(!obj[LEXICON.hOP](splits[i])){return
}val=obj[splits[i]];
if(i<splits.length&&type(val)==TYPES.o){obj=val
}}return val
}function setObjectPropVal(obj,path,val){var splits=path.split(_strDot);
var splitsLength=splits.length;
var i=0;
var extendObj={};
var extendObjRoot=extendObj;
for(;
i<splitsLength;
i++){extendObj=extendObj[splits[i]]=i+1<splitsLength?{}:val
}FRAMEWORK.extend(obj,extendObjRoot,true)
}function eachUpdateOnLoad(action){var updateOnLoad=_currentPreparedOptions.updateOnLoad;
updateOnLoad=type(updateOnLoad)==TYPES.s?updateOnLoad.split(_strSpace):updateOnLoad;
if(COMPATIBILITY.isA(updateOnLoad)&&!_destroyed){each(updateOnLoad,action)
}}function checkCache(current,cache,force){if(force){return force
}if(type(current)==TYPES.o&&type(cache)==TYPES.o){for(var prop in current){if(prop!=="c"){if(current[LEXICON.hOP](prop)&&cache[LEXICON.hOP](prop)){if(checkCache(current[prop],cache[prop])){return true
}}else{return true
}}}}else{return current!==cache
}return false
}function extendDeep(){return FRAMEWORK.extend.apply(this,[true].concat([].slice.call(arguments)))
}function addClass(el,classes){return _frameworkProto.addClass.call(el,classes)
}function removeClass(el,classes){return _frameworkProto.removeClass.call(el,classes)
}function addRemoveClass(el,classes,doAdd){return doAdd?addClass(el,classes):removeClass(el,classes)
}function remove(el){return _frameworkProto.remove.call(el)
}function findFirst(el,selector){return _frameworkProto.find.call(el,selector).eq(0)
}_base.sleep=function(){_sleeping=true
};
_base.update=function(force){if(_destroyed){return
}var attrsChanged;
var contentSizeC;
var isString=type(force)==TYPES.s;
var doUpdateAuto;
var mutHost;
var mutContent;
if(isString){if(force===_strAuto){attrsChanged=meaningfulAttrsChanged();
contentSizeC=updateAutoContentSizeChanged();
doUpdateAuto=attrsChanged||contentSizeC;
if(doUpdateAuto){update({_contentSizeChanged:contentSizeC,_changedOptions:_initialized?undefined:_currentPreparedOptions})
}}else{if(force===_strSync){if(_mutationObserversConnected){mutHost=_mutationObserverHostCallback(_mutationObserverHost.takeRecords());
mutContent=_mutationObserverContentCallback(_mutationObserverContent.takeRecords())
}else{mutHost=_base.update(_strAuto)
}}else{if(force==="zoom"){update({_hostSizeChanged:true,_contentSizeChanged:true})
}}}}else{force=_sleeping||force;
_sleeping=false;
if(!_base.update(_strSync)||force){update({_force:force})
}}updateElementsOnLoad();
return doUpdateAuto||mutHost||mutContent
};
_base.options=function(newOptions,value){var option={};
var changedOps;
if(FRAMEWORK.isEmptyObject(newOptions)||!FRAMEWORK.isPlainObject(newOptions)){if(type(newOptions)==TYPES.s){if(arguments.length>1){setObjectPropVal(option,newOptions,value);
changedOps=setOptions(option)
}else{return getObjectPropVal(_currentOptions,newOptions)
}}else{return _currentOptions
}}else{changedOps=setOptions(newOptions)
}if(!FRAMEWORK.isEmptyObject(changedOps)){update({_changedOptions:changedOps})
}};
_base.destroy=function(){if(_destroyed){return
}autoUpdateLoop.remove(_base);
disconnectMutationObservers();
setupResizeObserver(_sizeObserverElement);
setupResizeObserver(_sizeAutoObserverElement);
for(var extName in _extensions){_base.removeExt(extName)
}while(_destroyEvents[LEXICON.l]>0){_destroyEvents.pop()()
}setupHostMouseTouchEvents(true);
if(_contentGlueElement){remove(_contentGlueElement)
}if(_contentArrangeElement){remove(_contentArrangeElement)
}if(_sizeAutoObserverAdded){remove(_sizeAutoObserverElement)
}setupScrollbarsDOM(true);
setupScrollbarCornerDOM(true);
setupStructureDOM(true);
for(var i=0;
i<_updateOnLoadElms[LEXICON.l];
i++){FRAMEWORK(_updateOnLoadElms[i]).off(_updateOnLoadEventName,updateOnLoadCallback)
}_updateOnLoadElms=undefined;
_destroyed=true;
_sleeping=true;
INSTANCES(pluginTargetElement,0);
dispatchCallback("onDestroyed")
};
_base.scroll=function(coordinates,duration,easing,complete){if(arguments.length===0||coordinates===undefined){var infoX=_scrollHorizontalInfo;
var infoY=_scrollVerticalInfo;
var normalizeInvert=_normalizeRTLCache&&_isRTL&&_rtlScrollBehavior.i;
var normalizeNegate=_normalizeRTLCache&&_isRTL&&_rtlScrollBehavior.n;
var scrollX=infoX._currentScroll;
var scrollXRatio=infoX._currentScrollRatio;
var maxScrollX=infoX._maxScroll;
scrollXRatio=normalizeInvert?1-scrollXRatio:scrollXRatio;
scrollX=normalizeInvert?maxScrollX-scrollX:scrollX;
scrollX*=normalizeNegate?-1:1;
maxScrollX*=normalizeNegate?-1:1;
return{position:{x:scrollX,y:infoY._currentScroll},ratio:{x:scrollXRatio,y:infoY._currentScrollRatio},max:{x:maxScrollX,y:infoY._maxScroll},handleOffset:{x:infoX._handleOffset,y:infoY._handleOffset},handleLength:{x:infoX._handleLength,y:infoY._handleLength},handleLengthRatio:{x:infoX._handleLengthRatio,y:infoY._handleLengthRatio},trackLength:{x:infoX._trackLength,y:infoY._trackLength},snappedHandleOffset:{x:infoX._snappedHandleOffset,y:infoY._snappedHandleOffset},isRTL:_isRTL,isRTLNormalized:_normalizeRTLCache}
}_base.update(_strSync);
var normalizeRTL=_normalizeRTLCache;
var coordinatesXAxisProps=[_strX,_strLeft,"l"];
var coordinatesYAxisProps=[_strY,_strTop,"t"];
var coordinatesOperators=["+=","-=","*=","/="];
var durationIsObject=type(duration)==TYPES.o;
var completeCallback=durationIsObject?duration.complete:complete;
var i;
var finalScroll={};
var specialEasing={};
var doScrollLeft;
var doScrollTop;
var animationOptions;
var strEnd="end";
var strBegin="begin";
var strCenter="center";
var strNearest="nearest";
var strAlways="always";
var strNever="never";
var strIfNeeded="ifneeded";
var strLength=LEXICON.l;
var settingsAxis;
var settingsScroll;
var settingsBlock;
var settingsMargin;
var finalElement;
var elementObjSettingsAxisValues=[_strX,_strY,"xy","yx"];
var elementObjSettingsBlockValues=[strBegin,strEnd,strCenter,strNearest];
var elementObjSettingsScrollValues=[strAlways,strNever,strIfNeeded];
var coordinatesIsElementObj=coordinates[LEXICON.hOP]("el");
var possibleElement=coordinatesIsElementObj?coordinates.el:coordinates;
var possibleElementIsJQuery=possibleElement instanceof FRAMEWORK||JQUERY?possibleElement instanceof JQUERY:false;
var possibleElementIsHTMLElement=possibleElementIsJQuery?false:isHTMLElement(possibleElement);
var updateScrollbarInfos=function(){if(doScrollLeft){refreshScrollbarHandleOffset(true)
}if(doScrollTop){refreshScrollbarHandleOffset(false)
}};
var proxyCompleteCallback=type(completeCallback)!=TYPES.f?undefined:function(){updateScrollbarInfos();
completeCallback()
};
function checkSettingsStringValue(currValue,allowedValues){for(i=0;
i<allowedValues[strLength];
i++){if(currValue===allowedValues[i]){return true
}}return false
}function getRawScroll(isX,coordinates){var coordinateProps=isX?coordinatesXAxisProps:coordinatesYAxisProps;
coordinates=type(coordinates)==TYPES.s||type(coordinates)==TYPES.n?[coordinates,coordinates]:coordinates;
if(COMPATIBILITY.isA(coordinates)){return isX?coordinates[0]:coordinates[1]
}else{if(type(coordinates)==TYPES.o){for(i=0;
i<coordinateProps[strLength];
i++){if(coordinateProps[i] in coordinates){return coordinates[coordinateProps[i]]
}}}}}function getFinalScroll(isX,rawScroll){var isString=type(rawScroll)==TYPES.s;
var operator;
var amount;
var scrollInfo=isX?_scrollHorizontalInfo:_scrollVerticalInfo;
var currScroll=scrollInfo._currentScroll;
var maxScroll=scrollInfo._maxScroll;
var mult=" * ";
var finalValue;
var isRTLisX=_isRTL&&isX;
var normalizeShortcuts=isRTLisX&&_rtlScrollBehavior.n&&!normalizeRTL;
var strReplace="replace";
var evalFunc=eval;
var possibleOperator;
if(isString){if(rawScroll[strLength]>2){possibleOperator=rawScroll.substr(0,2);
if(inArray(possibleOperator,coordinatesOperators)>-1){operator=possibleOperator
}}rawScroll=operator?rawScroll.substr(2):rawScroll;
rawScroll=rawScroll[strReplace](/min/g,0)[strReplace](/</g,0)[strReplace](/max/g,(normalizeShortcuts?"-":_strEmpty)+_strHundredPercent)[strReplace](/>/g,(normalizeShortcuts?"-":_strEmpty)+_strHundredPercent)[strReplace](/px/g,_strEmpty)[strReplace](/%/g,mult+(maxScroll*(isRTLisX&&_rtlScrollBehavior.n?-1:1)/100))[strReplace](/vw/g,mult+_viewportSize.w)[strReplace](/vh/g,mult+_viewportSize.h);
amount=parseToZeroOrNumber(isNaN(rawScroll)?parseToZeroOrNumber(evalFunc(rawScroll),true).toFixed():rawScroll)
}else{amount=rawScroll
}if(amount!==undefined&&!isNaN(amount)&&type(amount)==TYPES.n){var normalizeIsRTLisX=normalizeRTL&&isRTLisX;
var operatorCurrScroll=currScroll*(normalizeIsRTLisX&&_rtlScrollBehavior.n?-1:1);
var invert=normalizeIsRTLisX&&_rtlScrollBehavior.i;
var negate=normalizeIsRTLisX&&_rtlScrollBehavior.n;
operatorCurrScroll=invert?(maxScroll-operatorCurrScroll):operatorCurrScroll;
switch(operator){case"+=":finalValue=operatorCurrScroll+amount;
break;
case"-=":finalValue=operatorCurrScroll-amount;
break;
case"*=":finalValue=operatorCurrScroll*amount;
break;
case"/=":finalValue=operatorCurrScroll/amount;
break;
default:finalValue=amount;
break
}finalValue=invert?maxScroll-finalValue:finalValue;
finalValue*=negate?-1:1;
finalValue=isRTLisX&&_rtlScrollBehavior.n?MATH.min(0,MATH.max(maxScroll,finalValue)):MATH.max(0,MATH.min(maxScroll,finalValue))
}return finalValue===currScroll?undefined:finalValue
}function getPerAxisValue(value,valueInternalType,defaultValue,allowedValues){var resultDefault=[defaultValue,defaultValue];
var valueType=type(value);
var valueArrLength;
var valueArrItem;
if(valueType==valueInternalType){value=[value,value]
}else{if(valueType==TYPES.a){valueArrLength=value[strLength];
if(valueArrLength>2||valueArrLength<1){value=resultDefault
}else{if(valueArrLength===1){value[1]=defaultValue
}for(i=0;
i<valueArrLength;
i++){valueArrItem=value[i];
if(type(valueArrItem)!=valueInternalType||!checkSettingsStringValue(valueArrItem,allowedValues)){value=resultDefault;
break
}}}}else{if(valueType==TYPES.o){value=[value[_strX]||defaultValue,value[_strY]||defaultValue]
}else{value=resultDefault
}}}return{x:value[0],y:value[1]}
}function generateMargin(marginTopRightBottomLeftArray){var result=[];
var currValue;
var currValueType;
var valueDirections=[_strTop,_strRight,_strBottom,_strLeft];
for(i=0;
i<marginTopRightBottomLeftArray[strLength];
i++){if(i===valueDirections[strLength]){break
}currValue=marginTopRightBottomLeftArray[i];
currValueType=type(currValue);
if(currValueType==TYPES.b){result.push(currValue?parseToZeroOrNumber(finalElement.css(_strMarginMinus+valueDirections[i])):0)
}else{result.push(currValueType==TYPES.n?currValue:0)
}}return result
}if(possibleElementIsJQuery||possibleElementIsHTMLElement){var margin=coordinatesIsElementObj?coordinates.margin:0;
var axis=coordinatesIsElementObj?coordinates.axis:0;
var scroll=coordinatesIsElementObj?coordinates.scroll:0;
var block=coordinatesIsElementObj?coordinates.block:0;
var marginDefault=[0,0,0,0];
var marginType=type(margin);
var marginLength;
finalElement=possibleElementIsJQuery?possibleElement:FRAMEWORK(possibleElement);
if(finalElement[strLength]>0){if(marginType==TYPES.n||marginType==TYPES.b){margin=generateMargin([margin,margin,margin,margin])
}else{if(marginType==TYPES.a){marginLength=margin[strLength];
if(marginLength===2){margin=generateMargin([margin[0],margin[1],margin[0],margin[1]])
}else{if(marginLength>=4){margin=generateMargin(margin)
}else{margin=marginDefault
}}}else{if(marginType==TYPES.o){margin=generateMargin([margin[_strTop],margin[_strRight],margin[_strBottom],margin[_strLeft]])
}else{margin=marginDefault
}}}settingsAxis=checkSettingsStringValue(axis,elementObjSettingsAxisValues)?axis:"xy";
settingsScroll=getPerAxisValue(scroll,TYPES.s,strAlways,elementObjSettingsScrollValues);
settingsBlock=getPerAxisValue(block,TYPES.s,strBegin,elementObjSettingsBlockValues);
settingsMargin=margin;
var viewportScroll={l:_scrollHorizontalInfo._currentScroll,t:_scrollVerticalInfo._currentScroll};
var viewportOffset=_paddingElement.offset();
var elementOffset=finalElement.offset();
var doNotScroll={x:settingsScroll.x==strNever||settingsAxis==_strY,y:settingsScroll.y==strNever||settingsAxis==_strX};
elementOffset[_strTop]-=settingsMargin[0];
elementOffset[_strLeft]-=settingsMargin[3];
var elementScrollCoordinates={x:MATH.round(elementOffset[_strLeft]-viewportOffset[_strLeft]+viewportScroll.l),y:MATH.round(elementOffset[_strTop]-viewportOffset[_strTop]+viewportScroll.t)};
if(_isRTL){if(!_rtlScrollBehavior.n&&!_rtlScrollBehavior.i){elementScrollCoordinates.x=MATH.round(viewportOffset[_strLeft]-elementOffset[_strLeft]+viewportScroll.l)
}if(_rtlScrollBehavior.n&&normalizeRTL){elementScrollCoordinates.x*=-1
}if(_rtlScrollBehavior.i&&normalizeRTL){elementScrollCoordinates.x=MATH.round(viewportOffset[_strLeft]-elementOffset[_strLeft]+(_scrollHorizontalInfo._maxScroll-viewportScroll.l))
}}if(settingsBlock.x!=strBegin||settingsBlock.y!=strBegin||settingsScroll.x==strIfNeeded||settingsScroll.y==strIfNeeded||_isRTL){var measuringElm=finalElement[0];
var rawElementSize=_supportTransform?measuringElm[LEXICON.bCR]():{width:measuringElm[LEXICON.oW],height:measuringElm[LEXICON.oH]};
var elementSize={w:rawElementSize[_strWidth]+settingsMargin[3]+settingsMargin[1],h:rawElementSize[_strHeight]+settingsMargin[0]+settingsMargin[2]};
var finalizeBlock=function(isX){var vars=getScrollbarVars(isX);
var wh=vars._w_h;
var lt=vars._left_top;
var xy=vars._x_y;
var blockIsEnd=settingsBlock[xy]==(isX?_isRTL?strBegin:strEnd:strEnd);
var blockIsCenter=settingsBlock[xy]==strCenter;
var blockIsNearest=settingsBlock[xy]==strNearest;
var scrollNever=settingsScroll[xy]==strNever;
var scrollIfNeeded=settingsScroll[xy]==strIfNeeded;
var vpSize=_viewportSize[wh];
var vpOffset=viewportOffset[lt];
var elSize=elementSize[wh];
var elOffset=elementOffset[lt];
var divide=blockIsCenter?2:1;
var elementCenterOffset=elOffset+(elSize/2);
var viewportCenterOffset=vpOffset+(vpSize/2);
var isInView=elSize<=vpSize&&elOffset>=vpOffset&&elOffset+elSize<=vpOffset+vpSize;
if(scrollNever){doNotScroll[xy]=true
}else{if(!doNotScroll[xy]){if(blockIsNearest||scrollIfNeeded){doNotScroll[xy]=scrollIfNeeded?isInView:false;
blockIsEnd=elSize<vpSize?elementCenterOffset>viewportCenterOffset:elementCenterOffset<viewportCenterOffset
}elementScrollCoordinates[xy]-=blockIsEnd||blockIsCenter?((vpSize/divide)-(elSize/divide))*(isX&&_isRTL&&normalizeRTL?-1:1):0
}}};
finalizeBlock(true);
finalizeBlock(false)
}if(doNotScroll.y){delete elementScrollCoordinates.y
}if(doNotScroll.x){delete elementScrollCoordinates.x
}coordinates=elementScrollCoordinates
}}finalScroll[_strScrollLeft]=getFinalScroll(true,getRawScroll(true,coordinates));
finalScroll[_strScrollTop]=getFinalScroll(false,getRawScroll(false,coordinates));
doScrollLeft=finalScroll[_strScrollLeft]!==undefined;
doScrollTop=finalScroll[_strScrollTop]!==undefined;
if((doScrollLeft||doScrollTop)&&(duration>0||durationIsObject)){if(durationIsObject){duration.complete=proxyCompleteCallback;
_viewportElement.animate(finalScroll,duration)
}else{animationOptions={duration:duration,complete:proxyCompleteCallback};
if(COMPATIBILITY.isA(easing)||FRAMEWORK.isPlainObject(easing)){specialEasing[_strScrollLeft]=easing[0]||easing.x;
specialEasing[_strScrollTop]=easing[1]||easing.y;
animationOptions.specialEasing=specialEasing
}else{animationOptions.easing=easing
}_viewportElement.animate(finalScroll,animationOptions)
}}else{if(doScrollLeft){_viewportElement[_strScrollLeft](finalScroll[_strScrollLeft])
}if(doScrollTop){_viewportElement[_strScrollTop](finalScroll[_strScrollTop])
}updateScrollbarInfos()
}};
_base.scrollStop=function(param1,param2,param3){_viewportElement.stop(param1,param2,param3);
return _base
};
_base.getElements=function(elementName){var obj={target:_targetElementNative,host:_hostElementNative,padding:_paddingElementNative,viewport:_viewportElementNative,content:_contentElementNative,scrollbarHorizontal:{scrollbar:_scrollbarHorizontalElement[0],track:_scrollbarHorizontalTrackElement[0],handle:_scrollbarHorizontalHandleElement[0]},scrollbarVertical:{scrollbar:_scrollbarVerticalElement[0],track:_scrollbarVerticalTrackElement[0],handle:_scrollbarVerticalHandleElement[0]},scrollbarCorner:_scrollbarCornerElement[0]};
return type(elementName)==TYPES.s?getObjectPropVal(obj,elementName):obj
};
_base.getState=function(stateProperty){function prepare(obj){if(!FRAMEWORK.isPlainObject(obj)){return obj
}var extended=extendDeep({},obj);
var changePropertyName=function(from,to){if(extended[LEXICON.hOP](from)){extended[to]=extended[from];
delete extended[from]
}};
changePropertyName("w",_strWidth);
changePropertyName("h",_strHeight);
delete extended.c;
return extended
}var obj={destroyed:!!prepare(_destroyed),sleeping:!!prepare(_sleeping),autoUpdate:prepare(!_mutationObserversConnected),widthAuto:prepare(_widthAutoCache),heightAuto:prepare(_heightAutoCache),padding:prepare(_cssPaddingCache),overflowAmount:prepare(_overflowAmountCache),hideOverflow:prepare(_hideOverflowCache),hasOverflow:prepare(_hasOverflowCache),contentScrollSize:prepare(_contentScrollSizeCache),viewportSize:prepare(_viewportSize),hostSize:prepare(_hostSizeCache),documentMixed:prepare(_documentMixed)};
return type(stateProperty)==TYPES.s?getObjectPropVal(obj,stateProperty):obj
};
_base.ext=function(extName){var result;
var privateMethods=_extensionsPrivateMethods.split(" ");
var i=0;
if(type(extName)==TYPES.s){if(_extensions[LEXICON.hOP](extName)){result=extendDeep({},_extensions[extName]);
for(;
i<privateMethods.length;
i++){delete result[privateMethods[i]]
}}}else{result={};
for(i in _extensions){result[i]=extendDeep({},_base.ext(i))
}}return result
};
_base.addExt=function(extName,extensionOptions){var registeredExtensionObj=_plugin.extension(extName);
var instance;
var instanceAdded;
var instanceContract;
var contractResult;
var contractFulfilled=true;
if(registeredExtensionObj){if(!_extensions[LEXICON.hOP](extName)){instance=registeredExtensionObj.extensionFactory.call(_base,extendDeep({},registeredExtensionObj.defaultOptions),FRAMEWORK,COMPATIBILITY);
if(instance){instanceContract=instance.contract;
if(type(instanceContract)==TYPES.f){contractResult=instanceContract(window);
contractFulfilled=type(contractResult)==TYPES.b?contractResult:contractFulfilled
}if(contractFulfilled){_extensions[extName]=instance;
instanceAdded=instance.added;
if(type(instanceAdded)==TYPES.f){instanceAdded(extensionOptions)
}return _base.ext(extName)
}}}else{return _base.ext(extName)
}}else{console.warn('A extension with the name "'+extName+"\" isn't registered.")
}};
_base.removeExt=function(extName){var instance=_extensions[extName];
var instanceRemoved;
if(instance){delete _extensions[extName];
instanceRemoved=instance.removed;
if(type(instanceRemoved)==TYPES.f){instanceRemoved()
}return true
}return false
};
function construct(targetElement,options,extensions){_defaultOptions=globals.defaultOptions;
_nativeScrollbarStyling=globals.nativeScrollbarStyling;
_nativeScrollbarSize=extendDeep({},globals.nativeScrollbarSize);
_nativeScrollbarIsOverlaid=extendDeep({},globals.nativeScrollbarIsOverlaid);
_overlayScrollbarDummySize=extendDeep({},globals.overlayScrollbarDummySize);
_rtlScrollBehavior=extendDeep({},globals.rtlScrollBehavior);
setOptions(extendDeep({},_defaultOptions,options));
_cssCalc=globals.cssCalc;
_msieVersion=globals.msie;
_autoUpdateRecommended=globals.autoUpdateRecommended;
_supportTransition=globals.supportTransition;
_supportTransform=globals.supportTransform;
_supportPassiveEvents=globals.supportPassiveEvents;
_supportResizeObserver=globals.supportResizeObserver;
_supportMutationObserver=globals.supportMutationObserver;
_restrictedMeasuring=globals.restrictedMeasuring;
_documentElement=FRAMEWORK(targetElement.ownerDocument);
_documentElementNative=_documentElement[0];
_windowElement=FRAMEWORK(_documentElementNative.defaultView||_documentElementNative.parentWindow);
_windowElementNative=_windowElement[0];
_htmlElement=findFirst(_documentElement,"html");
_bodyElement=findFirst(_htmlElement,"body");
_targetElement=FRAMEWORK(targetElement);
_targetElementNative=_targetElement[0];
_isTextarea=_targetElement.is("textarea");
_isBody=_targetElement.is("body");
_documentMixed=_documentElementNative!==document;
_domExists=_isTextarea?_targetElement.hasClass(_classNameTextareaElement)&&_targetElement.parent().hasClass(_classNameContentElement):_targetElement.hasClass(_classNameHostElement)&&_targetElement.children(_strDot+_classNamePaddingElement)[LEXICON.l];
var initBodyScroll;
var bodyMouseTouchDownListener;
if(_nativeScrollbarIsOverlaid.x&&_nativeScrollbarIsOverlaid.y&&!_currentPreparedOptions.nativeScrollbarsOverlaid.initialize){_initialized=true;
dispatchCallback("onInitializationWithdrawn");
if(_domExists){setupStructureDOM(true);
setupScrollbarsDOM(true);
setupScrollbarCornerDOM(true)
}_initialized=false;
_destroyed=true;
_sleeping=true;
return _base
}if(_isBody){initBodyScroll={};
initBodyScroll.l=MATH.max(_targetElement[_strScrollLeft](),_htmlElement[_strScrollLeft](),_windowElement[_strScrollLeft]());
initBodyScroll.t=MATH.max(_targetElement[_strScrollTop](),_htmlElement[_strScrollTop](),_windowElement[_strScrollTop]());
bodyMouseTouchDownListener=function(){_viewportElement.removeAttr(LEXICON.ti);
setupResponsiveEventListener(_viewportElement,_strMouseTouchDownEvent,bodyMouseTouchDownListener,true,true)
}
}setupStructureDOM();
setupScrollbarsDOM();
setupScrollbarCornerDOM();
setupStructureEvents();
setupScrollbarEvents(true);
setupScrollbarEvents(false);
setupScrollbarCornerEvents();
createMutationObservers();
setupResizeObserver(_sizeObserverElement,hostOnResized);
if(_isBody){_viewportElement[_strScrollLeft](initBodyScroll.l)[_strScrollTop](initBodyScroll.t);
if(document.activeElement==targetElement&&_viewportElementNative.focus){_viewportElement.attr(LEXICON.ti,"-1");
_viewportElementNative.focus();
setupResponsiveEventListener(_viewportElement,_strMouseTouchDownEvent,bodyMouseTouchDownListener,false,true)
}}_base.update(_strAuto);
_initialized=true;
dispatchCallback("onInitialized");
each(_callbacksInitQeueue,function(index,value){dispatchCallback(value.n,value.a)
});
_callbacksInitQeueue=[];
if(type(extensions)==TYPES.s){extensions=[extensions]
}if(COMPATIBILITY.isA(extensions)){each(extensions,function(index,value){_base.addExt(value)
})
}else{if(FRAMEWORK.isPlainObject(extensions)){each(extensions,function(key,value){_base.addExt(key,value)
})
}}setTimeout(function(){if(_supportTransition&&!_destroyed){addClass(_hostElement,_classNameHostTransition)
}},333);
return _base
}if(_plugin.valid(construct(pluginTargetElement,options,extensions))){INSTANCES(pluginTargetElement,_base)
}return _base
}_plugin=window[PLUGINNAME]=function(pluginTargetElements,options,extensions){if(arguments[LEXICON.l]===0){return this
}var arr=[];
var optsIsPlainObj=FRAMEWORK.isPlainObject(options);
var inst;
var result;
if(!pluginTargetElements){return optsIsPlainObj||!options?result:arr
}pluginTargetElements=pluginTargetElements[LEXICON.l]!=undefined?pluginTargetElements:[pluginTargetElements[0]||pluginTargetElements];
initOverlayScrollbarsStatics();
if(pluginTargetElements[LEXICON.l]>0){if(optsIsPlainObj){FRAMEWORK.each(pluginTargetElements,function(i,v){inst=v;
if(inst!==undefined){arr.push(OverlayScrollbarsInstance(inst,options,extensions,_pluginsGlobals,_pluginsAutoUpdateLoop))
}})
}else{FRAMEWORK.each(pluginTargetElements,function(i,v){inst=INSTANCES(v);
if((options==="!"&&_plugin.valid(inst))||(COMPATIBILITY.type(options)==TYPES.f&&options(v,inst))){arr.push(inst)
}else{if(options===undefined){arr.push(inst)
}}})
}result=arr[LEXICON.l]===1?arr[0]:arr
}return result
};
_plugin.globals=function(){initOverlayScrollbarsStatics();
var globals=FRAMEWORK.extend(true,{},_pluginsGlobals);
delete globals.msie;
return globals
};
_plugin.defaultOptions=function(newDefaultOptions){initOverlayScrollbarsStatics();
var currDefaultOptions=_pluginsGlobals.defaultOptions;
if(newDefaultOptions===undefined){return FRAMEWORK.extend(true,{},currDefaultOptions)
}_pluginsGlobals.defaultOptions=FRAMEWORK.extend(true,{},currDefaultOptions,_pluginsOptions._validate(newDefaultOptions,_pluginsOptions._template,true,currDefaultOptions)._default)
};
_plugin.valid=function(osInstance){return osInstance instanceof _plugin&&!osInstance.getState().destroyed
};
_plugin.extension=function(extensionName,extension,defaultOptions){var extNameTypeString=COMPATIBILITY.type(extensionName)==TYPES.s;
var argLen=arguments[LEXICON.l];
var i=0;
if(argLen<1||!extNameTypeString){return FRAMEWORK.extend(true,{length:_pluginsExtensions[LEXICON.l]},_pluginsExtensions)
}else{if(extNameTypeString){if(COMPATIBILITY.type(extension)==TYPES.f){_pluginsExtensions.push({name:extensionName,extensionFactory:extension,defaultOptions:defaultOptions})
}else{for(;
i<_pluginsExtensions[LEXICON.l];
i++){if(_pluginsExtensions[i].name===extensionName){if(argLen>1){_pluginsExtensions.splice(i,1)
}else{return FRAMEWORK.extend(true,{},_pluginsExtensions[i])
}}}}}}};
return _plugin
})();
if(JQUERY&&JQUERY.fn){JQUERY.fn.overlayScrollbars=function(options,extensions){var _elements=this;
if(JQUERY.isPlainObject(options)){JQUERY.each(_elements,function(){PLUGIN(this,options,extensions)
});
return _elements
}else{return PLUGIN(_elements,options)
}}
}return PLUGIN
}));