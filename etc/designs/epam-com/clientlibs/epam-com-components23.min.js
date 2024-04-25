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
define("form-control",["form"],function(c){var b={errorTooltip:"validation-tooltip",fieldError:"validation-field",validationText:"validation-text",focusTarget:"validation-focus-target",epamContinuumStyle:"epam-continuum-style",continuumLabel:"form-component__continuum-label-title",label:"form-component__label",fakePlaceholder:"fake-placeholder"};
function a(d){this.$el=d;
this.$form=this.$el.closest("form");
this.$errorTooltip=this.$el.find("."+b.errorTooltip);
this.$errorText=this.$errorTooltip.find("."+b.validationText);
this.defaultValue=this.$el.data("defaultValue")||"";
this.context=c.extractValidationContext(this.$el);
this.isEpamContinuumStyle=this.$el.parents("."+b.epamContinuumStyle).length>0;
this.$label=this.$el.find("."+b.label);
this.initialLabelText=this.$label.text()
}a.prototype.cleanField=function(){this.toggleError();
this.$input.val(this.defaultValue);
this.afterClean&&this.afterClean()
};
a.prototype.displayValue=function(d,e){this.$input.val(e)
};
a.prototype.toggleError=function(e){var d=!!e;
this.$el.toggleClass(b.fieldError,d);
this.$input.attr("aria-invalid",d);
this.$errorTooltip.find(".is-a11y-only").toggleClass("hidden",!d);
if(this.isEpamContinuumStyle){d?this.$label.text(this.initialLabelText+" ("+e+")"):this.$label.text(this.initialLabelText)
}else{this.$errorText.text(e||"")
}if(this.$el.find("."+b.fakePlaceholder).length){this.setFakePlaceholderHeight()
}};
a.classes=b;
return a
});
define("Text",["utils"],function(a){function b(c){this.$el=c;
this.$el.find("table").wrap('<div class="'+this.classes.tableWrapper+'"></div>');
a.insertArrowForLinks(this.$el)
}b.prototype.classes={tableWrapper:"text__table-wrapper"};
b.moduleName="Text";
b.selector=".text-ui";
return b
});
define("TextField",["form","form-control"],function(c,a){function b(d){a.call(this,d);
this.$input=this.$el.find("input");
this.registerField();
this.setUpUrlParams()
}b.prototype=Object.create(a.prototype);
b.prototype.setUpUrlParams=function(){var d=this.$input.attr("data-fill-req-param");
var e=new RegExp("[?&]"+d+"=([^&#]*)").exec(window.location.href);
if(e){this.$input.val(decodeURIComponent(e[1]))
}};
b.prototype.registerField=function(){c.registerField({form:this.$form,field:this.$input.attr("name"),cleanField:this.cleanField.bind(this),displayValue:this.displayValue.bind(this),cleanError:this.toggleError.bind(this),displayError:this.toggleError.bind(this),validator:this.getValidator(),validationEvent:this.validationEvents})
};
b.prototype.getValidator=function(){var d=this.context.constraintRegex?c.constraintValidator:c.requiredValidator;
return d(this.$input,this.context)
};
b.prototype.validationEvents="change blur DOMAutoComplete";
b.moduleName="Text Field";
b.selector=".text-field-ui";
return b
});
define("Phone",["form","form-control","utils"],function(d,a,b){var e=$("body");
function c(f){a.call(this,f);
this.$input=this.$el.find("input");
this.inputPlaceholder=this.$input.attr("placeholder");
this.validations={isRequired:this.$el.data("required")};
this.registerField();
this.$label=this.$el.find(".form-component__label");
this.labelText=this.$el.find(".form-component__label").text().trim();
this.constraintRegex=this.$el.data("required");
e.on("select-location:dropdown-change",this.handlePhoneOnCountryChange.bind(this))
}c.prototype=Object.create(a.prototype);
c.prototype.registerField=function(){d.registerField({form:this.$form,field:this.$input.attr("name"),cleanField:this.cleanField.bind(this),displayValue:this.displayValue.bind(this),cleanError:this.toggleError.bind(this),displayError:this.toggleError.bind(this),validator:this.getValidator(),validationEvent:this.validationEvents})
};
c.prototype.getValidator=function(){var g=this.context.constraintRegex?d.constraintValidator:d.requiredValidator;
var f=g(this.$input,this.context);
return function(){if(this.context.isRequired){return f()
}if(this.context.constraintRegex){return f()
}return[]
}.bind(this)
};
c.prototype.handlePhoneOnCountryChange=function(j,k){var g=this.$el.parents(".form-constructor-ui").find(".form-type").data("form-type");
var f=g==="epam-com/components/form/action/apply-for-job-independent";
var i=g==="epam-com/components/form/action/apply-for-job-specific";
var h=k&&k.countryName==="India";
if((f&&h||i)&&!this.context.isRequired){this.context.isRequired=true;
this.$label.text(this.labelText+"*");
if(!b.isRedesign23()){this.$input.attr("placeholder",this.inputPlaceholder+"*")
}}else{this.context.isRequired=this.validations.isRequired;
this.$label.text(this.labelText);
this.$input.attr("placeholder",this.inputPlaceholder);
this.$form.trigger("FIELD_VALIDATION_RESULT:userPhone",{errors:[],checkFields:true})
}};
c.prototype.validationEvents="change blur DOMAutoComplete";
c.moduleName="Phone";
c.selector=".phone-ui";
return c
});
define("MultiPageForm",["form","form-control","TabsUtil","constants","utils","gradients"],function(a,l,e,k,h,f){var i=100;
var d={page:".multi-page-form__item",formDescription:".multi-page-form__description",controlsDescription:".multi-page-form__controls-description",field:".form-component__field",skipLink:".multi-page-form__skip-link",submit:'.end button[type="submit"]',complete:"complete",visible:"visible",mainForm:"[data-open-form]",currentPage:"html, body",submitAgainButton:".submit-again-arrow-container",multilineGradient:".multiline-gradient"};
var b=":captchaKey";
var g="captcha";
function c(m){return a.requiredValidator(m,{isRequired:true})().length
}function j(m){e.call(this,m,{items:m.find(d.page)});
this.$isNeedToMove=$(m).find(this.classes.mainForm);
this.$nextButton=$(m).find(".multi-page-form__button--23");
this.$skipLink=this.$el.find(d.skipLink);
this.$formDescription=this.$el.find(d.formDescription);
this.$pageCounterHolder=this.$formDescription.find("span");
this.$controlCounterHolder=this.$el.find(d.controlsDescription+" span");
this.$submit=this.$el.find(d.submit).on("click",this.onSubmit.bind(this));
this.itemsLength=this.$items.length;
this.$nav.off("click").on("click","button",this.onNavClick.bind(this));
this.$nextButton.on("click",this.onNavClick.bind(this));
this.initForm();
this.listenChanges();
this.updatePageStatus(this.activeItem);
this.addArrow();
this.isSubmittedOnce=false;
if(this.$isNeedToMove){this.scrollToTheBeginningOfTheForm()
}}j.prototype=Object.create(e.prototype);
j.prototype.addArrow=function(){var n=this.$el.find(this.classes.submitAgainButton);
for(var m=0;
m<n.length;
m++){h.insertArrowPicture($(n[m]))
}};
j.prototype.initForm=function(){this.formComponent=new a.FormComponent(this.$el);
this.formComponent.initialize();
this.requiredFieldsMap=this.mapRequiredFieldsToPages();
this.formComponent.form.on(a.events.CLEAN_UP,this.clearStatus.bind(this));
this.$skipLink.on("click",this.handleSkipLink.bind(this));
this.formComponent.onSuccessfulSubmit=this.onSuccessfulSubmit.bind(this)
};
j.prototype.scrollToTheBeginningOfTheForm=function(){if(history.scrollRestoration){history.scrollRestoration="manual"
}$(this.classes.currentPage).scrollTop(this.$el.offset().top-i)
};
j.prototype.validatePageFields=function(){var m=this.getPageStatus(this.activeItem);
if(!m){$.each(this.requiredFieldsMap[this.activeItem],function(n,p){if(!p[0].value.length){var o=$(p).closest("[data-required]");
o.addClass(l.classes.fieldError);
o.find("."+l.classes.validationText).text(o.data("required-msg"))
}});
this.formComponent.scrollToError()
}return m
};
j.prototype.onSubmit=function(m){if(!this.getPageStatus(this.activeItem)){m.preventDefault();
this.validatePageFields()
}};
j.prototype.onNavClick=function(n){n.preventDefault();
var m=$(n.currentTarget);
m.is(this.classes.prevButton)&&this.$el.trigger(e.events.tabChange,{tab:this.activeItem-1});
if(!this.getPageStatus(this.activeItem)){this.validatePageFields();
return
}m.is(this.classes.nextButton)&&this.$el.trigger(e.events.tabChange,{tab:this.activeItem+1});
this.afterClick()
};
j.prototype.mapRequiredFieldsToPages=function(){var m=this.isRecaptchaEnable();
var n=[];
$.each(this.$items,function(p,q){if(!n[p]){n[p]=[]
}var o=$(q).find("[data-required] [name]:not([data-required=false])");
$.each(o,function(){var r=$(this).attr("name");
if(r===g&&m||r===b&&m){return
}n[p].push($(this))
})
});
return n
};
j.prototype.listenChanges=function(){var m=function(n){n.on("change",function(){this.updatePageStatus()
}.bind(this))
}.bind(this);
this.requiredFieldsMap.forEach(function(n){n.map(m)
})
};
j.prototype.updatePageStatus=function(){var n=this.activeItem+1;
var m=this.itemsLength;
this.$submit.toggleClass(d.visible,n===this.itemsLength);
this.$prevButton.toggleClass(k.Classes.hidden,n<=1);
this.$el.find(this.classes.nextButton).each(function(){$(this).toggleClass(k.Classes.hidden,n>=m)
})
};
j.prototype.getPageStatus=function(m){return !this.requiredFieldsMap[m].map(c).filter(Boolean).length
};
j.prototype.clearStatus=function(){this.$el.trigger(e.events.tabChange,{tab:0});
this.$controlCounterHolder.text("1")
};
j.prototype.afterClick=function(){this.updatePageStatus(this.activeItem);
this.$el.scrollToSelector({reservedSpace:100});
this.$pageCounterHolder.text(this.activeItem+1);
this.$controlCounterHolder.text(this.activeItem+1);
this.$formDescription.focus()
};
j.prototype.handleSkipLink=function(m){m.preventDefault();
var n=this.$prevButton.hasClass("hidden")?this.$nextButton:this.$prevButton;
n.focus().scrollToSelector({reservedSpace:110})
};
j.prototype.beforeScroll=function(m){m.scrollToSelector({reservedSpace:110,duration:500})
};
j.prototype.isRecaptchaEnable=function(){var o=this.$el.find(".recaptcha-ui");
var n=this.$el.find("form");
var m=n.find(".captcha-ui");
return o.length&&!m.length||o.length&&!!m.length&&m.data("recaptcha-enabled")
};
j.prototype.onSuccessfulSubmit=function(){if(this.isSubmittedOnce){return
}this.isSubmittedOnce=true;
var m=this.$el[0].querySelectorAll(d.multilineGradient);
var o=new f.GradientText();
var n=0.5;
var p=1.4;
o.init(m,{rightRatio:n,middleRatio:p})
};
j.prototype.classes=$.extend({},e.prototype.classes,d);
j.moduleName="Multi Page Form";
j.selector=".multi-page-form-ui";
return j
});
define("ZipCode",["AbstractLocationField","form","utils-env","geolocation","constants"],function(b,f,e,a,d){function c(g){b.call(this,g);
this.$location.on(this.events.shouldUpdate,this.onParentChange.bind(this));
this.$location.on(this.events.shouldHide,this.hide.bind(this));
e.isEditMode()&&this.$el.removeClass(d.Classes.hidden);
this.$closestForm.on(f.events.ACTIVATE_FORM,function(){this.geolocationEnabled&&a.onGeolocationUpdate(this.fillWithGeolocation.bind(this))
}.bind(this))
}c.prototype=Object.create(b.prototype);
c.prototype.addOption=function(g){this.$select.append('<option value="'+g+'">'+g+"</option>")
};
c.prototype.hide=function(){this.$el.addClass(d.Classes.hidden);
this.countryName="";
this.cleanField()
};
c.prototype.onParentChange=function(g,h){this.countryName=h.countryName;
this.$select.empty().val(null).trigger("change").append(this.getDefaultOption());
this.registerSelectField({validator:this.optionalValidator});
h.postalCodes.map(this.addOption.bind(this));
this.$el.removeClass(d.Classes.hidden+" "+this.classes.errorField);
Array.prototype.slice.call(document.querySelectorAll(".validation-text")).forEach(function(i){i.innerHTML=""
});
this.geolocationEnabled&&a.onGeolocationUpdate(this.fillWithGeolocation.bind(this));
this.$location.trigger(d.Events.locationSelectZipCodeUpdate)
};
c.prototype.fillWithGeolocation=function(g){var i=g.postalCode;
var h=this.$el.find(".select2-selection__rendered").attr("title");
if(!h){i&&this.$select.val(i).trigger("change")
}};
c.prototype.events={shouldHide:"location.changed.city:withoutPostalCodes location.changed.region location.changed.country:withRegions location.changed.country:withoutRegions",shouldUpdate:"location.changed.city:withPostalCodes"};
c.moduleName="Zip Code Field";
c.selector=".zip-code-field-ui";
return c
});
define("Region",["AbstractLocationField","utils-env","geolocation","constants","form"],function(c,g,b,f,h){var a="/services/location/regions";
var e={source:".region-field__source"};
function d(i){c.call(this,i);
this.$source=this.$el.find(e.source);
this.$select.on("change",this.onSelectChange.bind(this));
this.$closestForm.on(h.events.ACTIVATE_FORM,function(){this.isGeolocation&&b.onGeolocationUpdate(this.fillWithGeolocation.bind(this))
}.bind(this));
this.$location.on("location.changed.country:withRegions",this.onParentChange.bind(this));
this.$location.on("location.changed.country:withoutRegions",this.hide.bind(this));
g.isEditMode()&&this.$el.removeClass(f.Classes.hidden);
this.registerSelectField({validator:this.optionalValidator})
}d.prototype=Object.create(c.prototype);
d.prototype.hide=function(){this.$el.addClass(f.Classes.hidden);
this.countryName="";
this.cleanField()
};
d.prototype.onParentChange=function(i,j){this.$el.removeClass(this.classes.errorField);
this.shouldValidate=false;
this.countryName=j.countryName;
this.isGeolocation=j.isGeolocation;
this.$select.empty().val(null).trigger("change",{withoutValidation:true}).append(this.getDefaultOption()).append(this.$source.find("[data-country="+this.countryName+"]").clone());
this.$el.removeClass(f.Classes.hidden);
this.getRegions()
};
d.prototype.getRegions=function(){var i={country:this.countryName,locale:CQ.I18n.getLocale()};
$.ajax({url:a,data:i,cache:true,success:this.onLoadSuccess.bind(this),error:console.log})
};
d.prototype.onLoadSuccess=function(i){this.regions=i;
this.$select.empty().val(null).trigger("change",{withoutValidation:true});
var j=this.getDefaultOption();
this.shouldValidate=true;
this.$el.removeClass(f.Classes.hidden);
if(i.length){this.regions.forEach(function(l){var k=l.geolocationName||l.internationalName;
j+='<option value="'+l.internationalName+'" data-geolocation-name="'+k+'" data-iso-code-alpha-2="'+l.isoCodeAlpha2+'">'+l.name+"</option>"
});
this.$select.val("").append(j);
this.$location.trigger(f.Events.locationSelectRegionUpdate,{isEmpty:i.length})
}this.isGeolocation&&b.onGeolocationUpdate(this.fillWithGeolocation.bind(this))
};
d.prototype.fillWithGeolocation=function(i){var j=i.region;
j&&this.$select.val(j).trigger("change",{isGeolocation:true})
};
d.prototype.onSelectChange=function(i,k){var j=this.$select.val();
if(!j){return
}this.$location.trigger("location.changed.region",{countryName:this.countryName,regionName:j,isGeolocation:k&&k.isGeolocation})
};
d.prototype.classes=$.extend({},c.prototype.classes,e);
d.moduleName="Region Field";
d.selector=".region-field-ui";
return d
});
define("Country",["AbstractLocationField","constants","geolocation","utils-env","form"],function(b,d,a,e,f){var h={PREFERABLE_COUNTRY:"candidatePreferableCountry"};
var g=$("body");
function c(i){b.call(this,i);
this.configurationWithRegions=this.$location.data("configuration").indexOf("region")>-1;
this.$select.on("change",this.onSelectChange.bind(this));
this.$closestForm.on(f.events.ACTIVATE_FORM,function(){this.geolocationEnabled&&a.onGeolocationUpdate(this.checkAdditionalCondition.bind(this,this.fillWithGeolocation))
}.bind(this));
this.registerSelectField();
this.$selection.addClass(this.classes.validationTarget).attr("aria-required",this.$el.data("required"));
if(!e.isEditMode()&&this.$select.val()!==""){setTimeout(function(){this.onSelectChange()
}.bind(this),0)
}}c.prototype=Object.create(b.prototype);
c.prototype.checkAdditionalCondition=function(l,i){var k=this.$el.attr("name");
var j=this.$el.find(".select2-selection__rendered").attr("title");
if(k===h.PREFERABLE_COUNTRY&&!this.$select.find('[data-geolocation-name="'+i.country+'"]').val()){return
}if(!j){l.call(this,i)
}};
c.prototype.hasRegions=function(i){return !!this.$select.children('[value="'+i+'"]').data("hasRegion")
};
c.prototype.onSelectChange=function(i,o){var k=this.$el.attr("name");
var u=$('.dropdown-list-ui[displayconditions="vacancyCountry"]');
var m=u.attr("showdropdownlist");
var l=k==="applicantPreferredCountry";
var j=k==="applicantCountry";
if(l){var t=this.$el.find(".select2-selection__rendered").attr("title");
var s=$(".dropdown-list-ui[applicantpreferredcountries]");
if(t&&s[0]){var n=t.trim();
var p=s.attr("applicantpreferredcountries").split(",");
if(p.indexOf(n)!==-1){s.removeClass("hidden");
s.trigger("setValidation",{isRequired:true})
}else{s.addClass("hidden");
s.trigger("setValidation",{isRequired:false})
}}else{s.addClass("hidden");
s.trigger("setValidation",{isRequired:false})
}}else{if(u&&m==="false"){u.addClass("hidden");
u.trigger("setValidation",{isRequired:false})
}}var q=this.$select.val(),r=this.configurationWithRegions&&this.hasRegions(q)?"location.changed.country:withRegions":"location.changed.country:withoutRegions";
if(q){this.$el.find(".select2-selection__rendered").addClass("country-filled")
}this.$location.trigger(r,{countryName:q,isGeolocation:o&&o.isGeolocation});
if(j){var v=this.$select.find("option:selected").attr("data-geolocation-name");
g.trigger("select-location:dropdown-change",{countryName:v})
}};
c.prototype.fillWithGeolocation=function(i){var k=i.country;
if(!k){return
}var j=this.$select.find('[data-geolocation-name="'+k+'"]').val();
this.$select.val(j).trigger("change",{isGeolocation:true})
};
c.prototype.wcmModeChange=null;
c.moduleName="Country Field";
c.selector=".country-field-ui";
return c
});
define("AbstractLocationField",["form","form-control"],function(d,a){var e=$("body");
var c={errorField:a.classes.fieldError,errorTooltip:a.classes.errorTooltip,validationText:a.classes.validationText,input:".form-component__input",label:".form-component__label",formComponentField:"form-component__field",field:"location-fields__column",select:".location-fields__select",location:".location-fields-ui",placeholder:"placeholder",selection:".select2-selection",selectBoxContainer:".select2-container",validationTarget:"validation-focus-target",selectedPlaceholder:".dropdown-list__selected-placeholder",epamContinuumStyle:"epam-continuum-style"};
function b(f){this.$el=f;
this.$closestForm=this.$el.closest("form");
this.$select=this.$el.find(c.select);
this.$input=this.$el.find(c.input);
this.$label=this.$el.find(c.label);
this.$errorTooltip=this.$el.find("."+c.errorTooltip);
this.$location=this.$el.closest(c.location);
this.id=this.$select.attr("id");
this.geolocationEnabled=this.$location.data("useGeolocation");
this.initSelect();
this.$selection=this.$el.find(c.selection).attr("aria-describedby",this.id+"-error");
this.$selectedPlaceholder=this.$el.find(this.classes.selectedPlaceholder);
this.isEpamContinuumStyle=this.$el.parents("."+c.epamContinuumStyle).length>0;
this.initialLabelText=this.$label.text();
this.overlayScrollbarInstance=null
}b.prototype.isActive=function(){return !!this.countryName
};
b.prototype.registerSelectField=function(i){var f=i||{},h=f.context||d.extractValidationContext(this.$el),g=f.validator&&f.validator.bind(this)||d.requiredValidator;
return d.registerField({form:this.$closestForm,field:this.fieldName||this.$select.attr("name"),cleanError:this.toggleError.bind(this),displayError:this.toggleError.bind(this),cleanField:this.cleanField.bind(this),validator:g(this.$select,h),validationEvent:this.validationEvent})
};
b.prototype.initSelect=function(){this.$select.selectWoo({dropdownParent:this.$input,width:"off"});
this.$selectBoxContainer=this.$el.find(c.selectBoxContainer);
this.$visibleInput=this.$el.find(c.selection);
this.$selectBoxContainer.addClass(c.formComponentField);
this.$visibleInput.on("blur",function(){this.$select.trigger("select2:blur")
}.bind(this));
this.$select.on("select2:selecting",function(f){this.$selectedPlaceholder.text(f.params.args.data.text)
}.bind(this));
this.setOverlayScrollbar()
};
b.prototype.setOverlayScrollbar=function(){var f=e.hasClass("dark-mode")||e.hasClass("light-mode");
if(f){this.$select.on(" select2:open",this.customizeDropdownScrollbar.bind(this));
this.$select.on("select2:closing",this.destroyDropdownScrollbar.bind(this));
$(document).on("keydown",this.$select.parent().find(".select2-search__field"),this.customizeDropdownScrollbar.bind(this))
}};
b.prototype.customizeDropdownScrollbar=function(){this.destroyDropdownScrollbar();
setTimeout(function(){var f=this.$el.find("ul.select2-results__options");
f.unbind("mousewheel");
this.overlayScrollbarInstance=OverlayScrollbars(f,{className:"os-theme-dark"})
}.bind(this),10)
};
b.prototype.destroyDropdownScrollbar=function(){if(this.overlayScrollbarInstance instanceof OverlayScrollbars){this.overlayScrollbarInstance.destroy()
}};
b.prototype.cleanField=function(){this.$select.val("").trigger("change",{withoutValidation:true})
};
b.prototype.toggleError=function(f){this.$el.toggleClass(c.errorField,!!f);
this.$el.find("."+c.validationText).text(f||"");
this.$errorTooltip.find(".is-a11y-only").toggleClass("hidden",!f);
if(this.isEpamContinuumStyle){this.toggleErrorForNewDesignedForm(f)
}};
b.prototype.toggleErrorForNewDesignedForm=function(f){f?this.$label.text(this.initialLabelText+" ("+f+")"):this.$label.text(this.initialLabelText)
};
b.prototype.optionalValidator=function(f,g){var h=d.requiredValidator(f,g);
return function(){if(this.isActive()){return h()
}return[]
}.bind(this)
};
b.prototype.getDefaultOption=function(){return'<option value="" disabled selected/>'
};
b.prototype.wcmModeChange=function(g){var f=g==="edit";
this.$el.toggleClass("hidden",!f)
};
b.prototype.validationEvent="change blur select2:blur";
b.prototype.classes=c;
return b
});
define("City",["AbstractLocationField","form-control","form","utils-env","geolocation","constants"],function(c,i,a,d,e,h){var f="/services/location/cities";
var b={inputField:".city-field__input",renderedField:".select2-selection__rendered"};
function g(j){c.call(this,j);
this.configuration=this.$location.data("configuration");
this.locationsType=this.$location.data("locationsType");
var k=this.$el.data("disallowOther");
this.countriesWithoutOther=k&&k.split(",");
this.$select.on("change",this.onSelectChange.bind(this));
this.$selectBox=this.$el.find(".select2");
this.$inputField=this.$el.find(b.inputField);
this.fieldName=this.$el.data("fieldName");
this.dontShowCities=this.$el.data("dontShowCities");
this.shouldValidate=false;
this.$location.on("location.changed.country:withoutRegions",this.onParentChange.bind(this)).on("location.changed.region",this.onParentChange.bind(this)).on("location.changed.country:withRegions",this.cleanField.bind(this));
d.isEditMode()&&this.$el.removeClass(h.Classes.hidden);
this.validationCallback=this.registerSelectField({validator:this.validator});
this.$closestForm.on(a.events.ACTIVATE_FORM,function(m,l){this.cancelValidation=null;
if(l==="pageshow"){this.cancelValidation={withoutValidation:true}
}this.geolocationEnabled&&e.onGeolocationUpdate(this.checkAdditionalCondition.bind(this,this.fillWithGeolocation))
}.bind(this));
this.$selection.addClass(this.classes.validationTarget);
this.$inputField.on("keydown",function(){this.isMaxLengthReached()
}.bind(this))
}g.prototype=Object.create(c.prototype);
g.prototype.checkAdditionalCondition=function(l,j){var k=this.$el.find(b.renderedField).attr("title");
if(!k){l.call(this,j)
}};
g.prototype.validator=function(k,l){var m=a.requiredValidator(k,l),j=a.requiredValidator(this.$inputField,l);
return function(){if(!this.isActive()||!this.shouldValidate){return[]
}if(this.$inputField.hasClass(h.Classes.hidden)){return m()
}return j()
}.bind(this)
};
g.prototype.isMaxLengthReached=function(){var k=Number(this.$inputField.attr("maxlength"));
var j=this.$inputField.attr("data-constraint-msg");
if(k===this.$inputField.val().length){this.$el.addClass("validation-field");
$(".validation-text").text(j);
setTimeout(function(){$(".city-field-ui").removeClass("validation-field")
},5000)
}};
g.prototype.isOtherValueDisallowed=function(){return this.countriesWithoutOther&&this.countriesWithoutOther.indexOf(this.countryName)>-1
};
g.prototype.cleanField=function(){this.$el.addClass(h.Classes.hidden);
this.toggleField(this.$inputField);
this.toggleField(this.$select,true);
this.$inputField.removeClass(i.classes.focusTarget);
this.$selection.addClass(i.classes.focusTarget);
this.countryName=""
};
g.prototype.onParentChange=function(j,k){this.$el.removeClass(this.classes.errorField);
this.shouldValidate=false;
this.countryName=k.countryName;
this.regionName=k.regionName;
this.isGeolocation=k.isGeolocation;
this.countryName&&this.getCities()
};
g.prototype.getCities=function(){var j={country:this.countryName,locale:CQ.I18n.getLocale(),configuration:this.configuration,locationsType:this.locationsType};
if(this.regionName){j.region=this.regionName
}$.ajax({url:f,data:j,cache:true,success:function(k){this.clearRenderedTitle();
this.onLoadSuccess(k)
}.bind(this),error:console.log})
};
g.prototype.clearRenderedTitle=function(){this.$el.find(b.renderedField).attr("title","")
};
g.prototype.onLoadSuccess=function(l){this.cities=l;
this.$select.empty().val(null).trigger("change",{withoutValidation:true});
var k=!this.isOtherValueDisallowed(),j=!l.length&&k,m=this.getDefaultOption();
this.shouldValidate=true;
this.$el.removeClass(h.Classes.hidden);
this.$inputField.val(null);
this.toggleField(this.$inputField,j);
this.toggleField(this.$select,!j);
if(this.cities.length===0&&this.dontShowCities){this.$el.addClass("hidden")
}if(l.length){this.cities.forEach(function(o){var n=o.geolocationName||o.internationalName;
m+='<option value="'+o.internationalName+'" data-geolocation-name="'+n+'">'+o.name+"</option>"
});
this.$select.val("")
}if(k){m+='<option value="other" data-geolocation-name="other">'+CQ.I18n.getMessage("component.location-fields.other-city")+"</option>"
}if(l.length||k){this.$select.append(m)
}this.isGeolocation&&e.onGeolocationUpdate(this.fillWithGeolocation.bind(this));
this.$location.trigger(h.Events.locationSelectCityUpdate,{isEmpty:l.length})
};
g.prototype.fillWithGeolocation=function(j){var l=j.city;
if(!l||this.cities===undefined||this.cities.length===0){return
}var k=this.$select.find('[data-geolocation-name="'+l+'"]').val();
if(!k){this.cityIsNotFound=true
}this.$select.val(k?k:"other").trigger("change");
k&&this.$inputField.val(l)
};
g.prototype.onSelectChange=function(){var l=this.$select.val();
if(l===null){return
}this.$el.removeClass(this.classes.errorField);
if(l==="other"){if(!this.dontShowCities){this.toggleField(this.$select);
this.toggleField(this.$inputField,true);
this.$inputField.val(null);
this.$selection.removeClass(i.classes.focusTarget);
this.$inputField.addClass(i.classes.focusTarget);
this.$location.trigger("location.changed.city:withoutPostalCodes")
}if(!this.cityIsNotFound&&!this.cancelValidation){this.$inputField.focus()
}this.cityIsNotFound=false;
return
}var m=this.cities.find(function(n){return n.internationalName===l
}),j=m&&m.postalCodes,k=j.length?"location.changed.city:withPostalCodes":"location.changed.city:withoutPostalCodes";
this.$location.trigger(k,!j?null:{postalCodes:j,countryName:this.countryName,isGeolocation:this.isGeolocation})
};
g.prototype.toggleField=function(j,l){var k=this.$select===j?this.$selectBox:j;
if(l){k.removeClass(h.Classes.hidden);
j.attr("name",this.fieldName).on(this.validationEvent,function(m){this.validationCallback(m,this.cancelValidation)
}.bind(this));
return
}k.addClass(h.Classes.hidden);
j.removeAttr("name").off(this.validationEvent,this.validationCallback)
};
g.prototype.classes=$.extend({},c.prototype.classes,b);
g.moduleName="City Field";
g.selector=".city-field-ui";
return g
});
define("LocationField",["LocationField-City","LocationField-Country"],function(c,d){var b={country:".country-field",city:".city-field"};
function a(e){this.$el=e;
this.$form=this.$el.closest("form");
this.$country=this.$el.find(b.country);
this.$city=this.$el.find(b.city);
this.showCity=this.$el.data("showCity");
this.fieldOptions={$form:this.$form,requiredType:this.$el.data("requiredType"),requiredMsg:this.$el.data("requiredMsg"),geolocationEnabled:this.$el.data("useGeolocation")};
this.showCity&&this.initCityField();
this.initCountryField()
}a.prototype.initCityField=function(){var e=$.extend({$el:this.$city},this.fieldOptions);
this.city=new c(e)
};
a.prototype.initCountryField=function(){var e=$.extend({$el:this.$country,showCity:this.showCity,city:this.city},this.fieldOptions);
this.country=new d(e)
};
a.prototype.classes=b;
a.moduleName="Location Field";
a.selector=".location-field-ui";
return a
});
define("LocationField-City",["form","geolocation","constants","form-control"],function(f,b,e,a){var d={column:".location-field__column",input:".city-field__input",select:".city-field__selection",selectBox:".select2",options:"city-field__options",visibleInput:"select2-selection",selectBoxContainer:".select2-container",formComponentField:"form-component__field",selectedPlaceholder:".dropdown-list__selected-placeholder"};
function c(g){this.$el=g.$el;
this.$form=g.$form;
this.requiredType=g.requiredType;
this.requiredMsg=g.requiredMsg;
this.$column=this.$el.closest(d.column);
this.$input=this.$el.find(d.input).show().detach();
this.$select=this.$el.find(d.select);
this.$options=this.$el.find("."+d.options);
this.$errorTooltip=this.$el.find("."+a.classes.errorTooltip);
this.$errorText=this.$el.find("."+a.classes.validationText);
this.id=this.$input.attr("id");
this.$selectedPlaceholder=this.$column.find(this.classes.selectedPlaceholder);
this.eventListened={select:false,input:false};
this.fieldName=this.$el.data("name");
this.validationCallback=f.validationCallback(this.$form,this.fieldName,this.validator.bind(this));
this.initSelect();
this.registerField()
}c.prototype.initSelect=function(){this.$select.selectWoo({dropdownParent:this.$el,width:"off"}).detach();
this.$selectBox=this.$el.find(d.selectBox).addClass(e.Classes.hidden);
this.$select.on("change",this.onSelectChange.bind(this));
this.$selectBoxContainer=this.$el.find(d.selectBoxContainer);
this.$selectBoxContainer.addClass(d.formComponentField);
this.visibleInput=this.$el.find("."+d.visibleInput);
this.visibleInput.addClass(a.classes.focusTarget).attr("aria-describedby",this.id+"-error");
this.visibleInput.on("blur",function(){this.$select.trigger("select2:blur")
}.bind(this));
this.$select.on("select2:selecting",function(g){this.$selectedPlaceholder.text(g.params.args.data.text)
}.bind(this))
};
c.prototype.fillWithGeolocation=function(g){var i=g.city;
if(!i){return
}var h=this.$select.find('[data-geolocation-name="'+i+'"]').val();
if(h){this.$select.val(h).trigger("change")
}else{this.$select.val("Other").trigger("change");
this.$input.val(i)
}};
c.prototype.onSelectChange=function(){if(this.isCityOther(this.$select.val())){this.setInputVisibility(true);
this.toggleError(false)
}};
c.prototype.changeSelectionSet=function(h){var g=this.$options.children('[data-country="'+h+'"]');
this.$select.children("[data-country]").appendTo(this.$options);
this.$select.children(":first").after(g);
this.setInputVisibility(!this.hasCityOptions());
return this
};
c.prototype.setInputVisibility=function(g){if(g){this.$select=this.turnActiveContainer(this.$input,this.$select,"input","blur change DOMAutoComplete",this.validationCallback.bind(this));
this.visibleInput.removeClass(a.classes.focusTarget)
}else{this.$input=this.turnActiveContainer(this.$select,this.$input,"select","change blur select2:blur",this.selectionValidationCallback.bind(this));
this.visibleInput.addClass(a.classes.focusTarget)
}this.$selectBox.toggleClass(e.Classes.hidden,g)
};
c.prototype.turnActiveContainer=function(l,j,i,k,h){var g=j.detach();
this.$el.prepend(l);
l.addClass(a.classes.focusTarget);
j.removeClass(a.classes.focusTarget);
if(!this.eventListened[i]){l.on(k,h);
this.eventListened[i]=true
}return g
};
c.prototype.selectionValidationCallback=function(g,h){if(!this.isCityOther(this.$select.val())){this.validationCallback(g,h)
}};
c.prototype.isCityOther=function(g){return g&&g.toLowerCase()===this.constants.CITY_OTHER.toLowerCase()
};
c.prototype.registerField=function(){f.registerField({form:this.$form,field:this.fieldName,cleanError:this.toggleError.bind(this),displayError:this.toggleError.bind(this),cleanField:this.cleanField.bind(this),displayValue:this.setValue.bind(this),validator:this.validator.bind(this)})
};
c.prototype.toggleError=function(g){this.$column.toggleClass(a.classes.fieldError,!!g);
this.$errorText.text(g||"");
this.$errorTooltip.find(".is-a11y-only").toggleClass("hidden",!g);
return this
};
c.prototype.cleanField=function(){var g=this.hasCityOptions()?"":this.constants.CITY_OTHER;
this.$select.val(g).trigger("change",{withoutValidation:true});
this.$input.val("");
return this
};
c.prototype.setValue=function(g,h){var i=this.hasCityOptions();
if(i){this.$select.val(h).change()
}else{this.$input.val(h)
}this.setInputVisibility(!i)
};
c.prototype.hasCityOptions=function(){return this.$select.children().length>this.constants.DEFAULT_OPTIONS
};
c.prototype.validator=function(){var h=[];
if(this.requiredType==="countryAndCity"){var i=this.$select.val(),g=this.$input.val();
if(!i||this.isCityOther(i)&&!g){h.push(this.requiredMsg)
}}return h
};
c.prototype.toggle=function(g){this.$column.toggleClass(e.Classes.hidden,!g);
return this
};
c.prototype.constants={CITY_OTHER:"Other",DEFAULT_OPTIONS:2};
c.prototype.classes=d;
return c
});
define("LocationField-Country",["form","form-control","geolocation"],function(e,b,a){var d={column:".location-field__column",select:".country-field__selection",visibleInput:".select2-selection",selectBoxContainer:".select2-container",formComponentField:"form-component__field",selectedPlaceholder:".dropdown-list__selected-placeholder"};
function c(f){b.call(this,f.$el);
this.requiredType=f.requiredType;
this.requiredMsg=f.requiredMsg;
this.showCity=f.showCity;
if(this.showCity){this.city=f.city
}this.$column=this.$el.closest(d.column);
this.$input=this.$el.find(d.select);
this.id=this.$input.attr("id");
this.$selectedPlaceholder=this.$column.find(this.classes.selectedPlaceholder);
this.initSelect();
this.registerField();
if(f.geolocationEnabled){a.onGeolocationUpdate(this.fillWithGeolocation.bind(this));
this.showCity&&a.onGeolocationUpdate(this.city.fillWithGeolocation.bind(this.city))
}if(this.$input.val()!==""&&this.showCity){this.onSelectChange()
}}c.prototype=Object.create(b.prototype);
c.prototype.initSelect=function(){this.$input.selectWoo({dropdownParent:this.$el,width:"off"});
this.$selectBoxContainer=this.$el.find(d.selectBoxContainer);
this.$selectBoxContainer.addClass(d.formComponentField);
this.visibleInput=this.$el.find(d.visibleInput);
this.visibleInput.addClass(b.classes.focusTarget).attr("aria-describedby",this.id+"-error");
if(this.showCity){this.$input.on("change",this.onSelectChange.bind(this))
}this.visibleInput.on("blur",function(){this.$input.trigger("select2:blur")
}.bind(this));
this.$input.on("select2:selecting",function(f){this.$selectedPlaceholder.text(f.params.args.data.text)
}.bind(this))
};
c.prototype.fillWithGeolocation=function(f){var h=f.country;
if(!h){return
}var g=this.$input.find('[data-geolocation-name="'+h+'"]').val();
g&&this.$input.val(g).trigger("change")
};
c.prototype.onSelectChange=function(){this.city.changeSelectionSet(this.$input.val()).toggleError(false).toggle(true).cleanField()
};
c.prototype.registerField=function(){e.registerField({form:this.$form,field:this.$el.data("name"),cleanError:this.toggleError.bind(this),displayError:this.toggleError.bind(this),cleanField:this.cleanField.bind(this),displayValue:this.setValue.bind(this),validator:this.validator.bind(this),validationEvent:this.validationEvent})
};
c.prototype.setValue=function(f,g){this.$input.val(g).change()
};
c.prototype.cleanField=function(){this.$input.val("").trigger("change",{withoutValidation:true});
if(this.showCity){this.city.toggle()
}};
c.prototype.toggleError=function(f){this.$column.toggleClass(b.classes.fieldError,!!f);
this.$errorText.text(f||"");
this.$errorTooltip.find(".is-a11y-only").toggleClass("hidden",!f)
};
c.prototype.validator=function(){var f=[];
if(this.requiredType!=="notRequired"&&!this.$input.val()){f.push(this.requiredMsg)
}return f
};
c.prototype.validationEvent="change blur select2:blur";
c.prototype.classes=$.extend({},b.prototype.classes,d);
return c
});
define("LinkedInSummary",["form","form-control","LinkedInSummaryPopup","linkedInSummaryParser","utils"],function(a,i,b,c,g){var d=$("body");
var f={EPAM_CONTINUUM_STYLE:"epam-continuum-style",LABEL:"form-component__label",FAKE_PLACEHOLDER:"fake-placeholder",HIDDEN:"hidden",STANDALONE:"form-component--standalone",BUTTON_LINK:".linkedin-summary__button-link",EDIT_POPUP:".linkedin-summary-popup-ui",TEXT_AREA_FIELD:".linkedin-summary__input"};
var e={openPopup:"summary.popup.open"};
function h(j){this.$el=j;
i.call(this,j);
this.$input=this.$el.find("textarea:not(.linkedin-summary__input)");
this.registerField();
this.isEpamContinuumStyle=!!this.$el.parents("."+f.EPAM_CONTINUUM_STYLE).length;
this.isStandalone=!!this.$el.parents("."+f.STANDALONE).length;
if(this.isEpamContinuumStyle&&this.$input.attr("placeholder")&&!this.isGoogleChrome()){this.$label=this.$el.find("."+f.LABEL);
this.createFakePlaceholder();
this.removeRealPlaceholder();
this.addEventListener(this.fakePlaceholder);
this.triggerEvent()
}var k=this.$el.closest(".form-constructor-ui");
this.$isStandAloneForm=k.hasClass("form-component--standalone");
this.$buttonLink=this.$el.find(f.BUTTON_LINK);
this.$editPopup=this.$el.find(f.EDIT_POPUP);
this.$textAreaInput=this.$el.find(f.TEXT_AREA_FIELD);
new b(this.$editPopup,this.$textAreaInput);
this.init()
}h.prototype=Object.create(i.prototype);
h.prototype.init=function(){this.initEvents();
if(!this.$isStandAloneForm){this.$textAreaInput.attr("readonly",true)
}this.setOverlayScrollbar()
};
h.prototype.setOverlayScrollbar=function(){var j=d.hasClass("dark-mode")||d.hasClass("light-mode");
if(j){OverlayScrollbars(this.$input,{className:"os-theme-dark"})
}};
h.prototype.initEvents=function(){this.$buttonLink.on("click",this.onButtonLinkHandler.bind(this));
$(window).on("linkedin.data.received",this.linkedinDataReceivedEventHandler.bind(this));
$(window).resize(g.debounce(this.resizeEventHandler.bind(this),250))
};
h.prototype.resizeEventHandler=function(){if(this.isStandalone){if(window.matchMedia("(max-width: 991px)").matches){this.$textAreaInput.attr("readonly",true)
}else{this.$textAreaInput.attr("readonly",false)
}}};
h.prototype.linkedinDataReceivedEventHandler=function(j,l){var k=c.formattingLinkedinSummary(l.linkedinData);
this.$textAreaInput.val(k)
};
h.prototype.onButtonLinkHandler=function(){this.$editPopup.trigger(e.openPopup);
this.$editPopup.removeClass(f.HIDDEN)
};
h.prototype.registerField=function(){a.registerField({form:this.$form,field:this.$input.attr("name"),cleanField:this.cleanField.bind(this),displayValue:this.displayValue.bind(this),cleanError:this.toggleError.bind(this),displayError:this.toggleError.bind(this),validator:a.requiredValidator(this.$input,this.context),validationEvent:this.validationEvents})
};
h.prototype.isGoogleChrome=function(){return window.navigator.userAgent.indexOf("Chrome")!==-1
};
h.prototype.createFakePlaceholder=function(){let placeholderText=this.$input.attr("placeholder");
this.fakePlaceholder=$("<span>"+placeholderText+"</span>");
this.fakePlaceholder.addClass(f.FAKE_PLACEHOLDER);
this.calcPaddingBottom();
this.setFakePlaceholderHeight();
this.fakePlaceholder.appendTo(this.$el)
};
h.prototype.calcPaddingBottom=function(){this.paddingBottom=this.isStandalone?6.7:6.1
};
h.prototype.setFakePlaceholderHeight=function(){this.fakePlaceholder.css("bottom",this.pixelsToRems(this.$label.height())+this.paddingBottom+"rem")
};
h.prototype.pixelsToRems=function(j){return j/10
};
h.prototype.removeRealPlaceholder=function(){this.$input.removeAttr("placeholder")
};
h.prototype.addEventListener=function(j){this.$input.on("input keydown",function(){$(this).val()?j.addClass(f.HIDDEN):j.removeClass(f.HIDDEN)
})
};
h.prototype.triggerEvent=function(){var j=jQuery.Event("keydown");
this.$input.trigger(j)
};
h.prototype.validationEvents="blur";
h.moduleName="LinkedInSummary";
h.selector=".linkedin-summary-ui";
return h
});
define("LinkedInSummaryPopup",[],function(){var b=$("body");
var c={CLOSE_BUTTON:".linkedin-summary-close-button",SAVE_BUTTON:".linkedin-summary__button-save",CANCEL_BUTTON:".linkedin-summary__button-cancel",HIDDEN:"hidden",SUMMARY_INPUT:"linkedin-summary__input",EDIT_TEXTAREA:".linkedin-summary__textarea",WARNING_POPUP:".linkedin-summary-warning-popup",BUTTON_NO:".linkedin-summary__warning-button-no",BUTTON_YES:".linkedin-summary__warning-button-yes"};
function a(e,d){this.$el=e;
this.$textAreaInput=d;
this.$closeButton=e.find(c.CLOSE_BUTTON);
this.$cancelButton=e.find(c.CANCEL_BUTTON);
this.$saveButton=e.find(c.SAVE_BUTTON);
this.$editTextArea=e.find(c.EDIT_TEXTAREA);
this.$warningPopup=e.find(c.WARNING_POPUP);
this.$buttonNo=e.find(c.BUTTON_NO);
this.$buttonYes=e.find(c.BUTTON_YES);
this.hasChanged=false;
this.init()
}a.prototype.init=function(){this.initEvents();
this.setOverlayScrollbar()
};
a.prototype.setOverlayScrollbar=function(){var d=b.hasClass("dark-mode")||b.hasClass("light-mode");
if(d){OverlayScrollbars(this.$textAreaInput,{className:"os-theme-dark"})
}};
a.prototype.initEvents=function(){this.$closeButton.on("click",this.onCloseButtonClick.bind(this));
this.$cancelButton.on("click",this.onCloseButtonClick.bind(this));
this.$el.on("summary.popup.open",this.summaryPopupOpenEventHandler.bind(this));
this.$editTextArea.on("keyup",this.onKeyPress.bind(this));
this.$buttonNo.on("click",this.onButtonNoClick.bind(this));
this.$buttonYes.on("click",this.onButtonYesClick.bind(this));
this.$saveButton.on("click",this.onSaveButtonClick.bind(this))
};
a.prototype.onSaveButtonClick=function(e){e.preventDefault();
var d=this.$editTextArea.val();
this.$textAreaInput.val(d);
this.hasChanged=false;
this.$el.addClass(c.HIDDEN)
};
a.prototype.onButtonNoClick=function(d){d.preventDefault();
this.$warningPopup.addClass(c.HIDDEN)
};
a.prototype.onButtonYesClick=function(d){d.preventDefault();
this.$warningPopup.addClass(c.HIDDEN);
this.$el.addClass(c.HIDDEN);
this.hasChanged=false
};
a.prototype.onKeyPress=function(){this.hasChanged=true
};
a.prototype.onCloseButtonClick=function(d){d.preventDefault();
if(this.hasChanged){this.$warningPopup.removeClass(c.HIDDEN)
}else{this.$el.addClass(c.HIDDEN);
this.hasChanged=false
}};
a.prototype.summaryPopupOpenEventHandler=function(){var d=this.$textAreaInput.val();
this.$editTextArea.val(d)
};
a.moduleName="LinkedInSummaryPopup";
a.selector=".linkedin-summary-popup-ui";
return a
});
define("HiddenField",[],function(){var a={mode:"data-value-mode",cookieName:"data-value-cookie-name",clientIdCookie:"_ga",contextHubPersistence:"ContextHubPersistence",contextHubKey:"data-context-hub-key",contextHubRoot:"store."};
function b(c){this.$el=c;
this.$firstRun=true;
this.$mode=this.$el.attr(a.mode);
this.containingForm=c.closest("form");
this.init()
}b.prototype.init=function(){if(this.$mode==="cookie"){this.setUpCookie()
}else{if(this.$mode==="contextHub"&&this.containingForm.length){this.containingForm.on("AJAX_START",this.updateFieldByContextHub.bind(this))
}}};
b.prototype.setUpCookie=function(){var f=this.$el.attr(a.cookieName);
var e=new RegExp(f+"=(.*)");
var d=document.cookie.split(";");
var c=[];
$.each(d,function(g,h){var i=h.match(e);
if(i){c.push(i[1])
}});
this.$el.val(Array.prototype.join.call(c,","));
if(f===a.clientIdCookie&&!this.$el.val().length&&this.$firstRun){setTimeout(function(){this.$firstRun=false;
this.setUpCookie()
}.bind(this),5000)
}};
b.prototype.updateFieldByContextHub=function(){var c=this.$el.attr(a.contextHubKey);
var g=window.localStorage.getItem(a.contextHubPersistence);
if(!c||!g){return
}c=c.startsWith(a.contextHubRoot)?c:a.contextHubRoot+c;
try{var d=JSON.parse(g);
var f=c.split(".").reduce(function(e,i){return e[i]
},d);
if(f){this.$el.val(f)
}}catch(h){console.error(h)
}};
b.moduleName="Hidden Field";
b.selector=".hidden-field-ui";
return b
});
define("GatedForm",["form","utils","utils-browser","analytics","constants","gradients"],function(a,g,d,f,i,e){var b=d.isInternetExplorer();
var c=$(document.body);
function h(j){this.$el=j;
this.$continuumStyle=this.$el.hasClass("epam-continuum-style");
this.checkPageStyle();
this.$form=this.$el.find("form");
this.$email=this.$form.find('input[name="email"]');
this.$originalEmail=this.$form.find('input[name=":originalEmail"]');
this.$cancelLink=this.$el.find("."+this.classes.cancelLink);
this.$downloadButton=this.$el.find("."+this.classes.downloadButton);
this.$downloadLink=this.$el.find("."+this.classes.downloadLink);
this.$callToActionButton=this.$el.find("."+this.classes.callToAction);
this.validationCode=g.getQueryParameters(window.location.href).validationCode;
this.expanded=this.$el.data("expanded");
this.formPath=this.$el.data("form-path");
this.filePath=this.$downloadButton.attr("href");
this.$cancelLink.on("click",this.collapseForm.bind(this));
this.$callToActionButton.on("click",this.expandForm.bind(this));
this.$downloadLink.on("click",this.sendPath.bind(this));
this.$downloadButton.on("click",function(){this.sendPath();
this.sendDownloadEvent()
}.bind(this));
this.initSubmitAgainLink();
this.initFormComponent();
this.addArrow();
this.isSubmittedOnce=false;
if($.cookie("gated-recognition")||this.validationCode&&$.cookie("gated-validation")){this.loadUserData()
}else{if(this.validationCode){this.displayFailedConfirmation()
}}}h.prototype.checkPageStyle=function(){if(c.hasClass("dark-mode")||c.hasClass("light-mode")||c.hasClass("ec-mode")){this.classes.submitAgain="submit-again-redesign"
}};
h.prototype.collapseForm=function(){if(this.expanded){return false
}this.$el.removeClass(this.classes.expandedForm+" "+this.classes.forceDownload);
this.formComponent.cleanForm();
this.$el.trigger(i.Events.gatedFormCollapse);
this.$el.scrollToSelector({reservedSpace:100});
return false
};
h.prototype.expandForm=function(){this.$el.addClass(this.classes.expandedForm);
this.$el.trigger(i.Events.gatedFormExpanded);
return false
};
h.prototype.initSubmitAgainLink=function(){var k=this.$el.find("."+this.classes.emailUpdate+" ."+this.classes.submitAgain),j=this.$el.find("."+this.classes.infoUpdate+" ."+this.classes.submitAgain),l=this.$el.find("."+this.classes.failedConfirmation+" ."+this.classes.submitAgain);
k.on("click",this.hideMessage.bind(this,this.classes.emailUpdateState));
j.on("click",this.hideMessage.bind(this,this.classes.infoUpdateState));
l.on("click",this.hideMessage.bind(this,this.classes.failedConfirmationState))
};
h.prototype.hideMessage=function(j){this.$el.removeClass(j);
this.formComponent.activateForm();
return false
};
h.prototype.initFormComponent=function(){this.formComponent=new a.FormComponent(this.$el,this.$continuumStyle);
$.extend(this.formComponent,{baseSubmitForm:this.formComponent.submitForm,displaySuccessMessage:this.displaySuccessMessage.bind(this),submitForm:this.submitForm.bind(this),cleanForm:this.cleanForm.bind(this)});
this.formComponent.initialize();
this.formComponent.onSuccessfulSubmit=this.onSuccessfulSubmit.bind(this);
this.downloadGtmEventData=this.collectDownloadGtmEventData()
};
h.prototype.displaySuccessMessage=function(){var j=this.classes.successState;
if(this.userEmail){var k=this.equalsIgnoreCase(this.userEmail,this.$email.val());
j=k?this.classes.infoUpdateState:this.classes.emailUpdateState
}this.$el.addClass(j);
this.$el.trigger("form.showMessage");
this.formComponent.cleanForm();
this.syncUserData()
};
h.prototype.collectDownloadGtmEventData=function(){return this.formComponent.gtmEventData&&$.extend({},this.formComponent.gtmEventData,{eventAction:"download"})
};
h.prototype.sendDownloadEvent=function(){f.push(this.downloadGtmEventData)
};
h.prototype.sendPath=function(){$.ajax({url:"/services/interaction/notification/download/asset",type:"POST",data:{formPath:this.formPath,filePath:this.filePath}})
};
h.prototype.equalsIgnoreCase=function(k,j){return k.toLowerCase()===j.toLowerCase()
};
h.prototype.cleanForm=function(){if(this.userData){this.$form.trigger(a.events.CLEAN_UP,{mandatoryOnly:true})
}else{this.$form.trigger(a.events.CLEAN_UP)
}};
h.prototype.syncUserData=function(){if(!this.userData){return
}$.each(this.$form.find(":not(input[type=hidden])").serializeArray(),this.updateUserProperty.bind(this))
};
h.prototype.updateUserProperty=function(j,k){if(!this.shouldIgnoreField(k.name)){this.userData[k.name]=k.value
}};
h.prototype.submitForm=function(){if(this.isUserDataChanged()){this.formComponent.baseSubmitForm();
this.$el.removeClass(this.classes.forceDownload)
}else{this.sendDownloadEvent();
window.location=this.$downloadButton.attr("href");
this.formComponent.activateForm();
return false
}};
h.prototype.isUserDataChanged=function(){if(!this.userData){return true
}return $.grep(this.$form.find(":not(input[type=hidden])").serializeArray(),this.isUserPropertyChanged.bind(this)).length>0
};
h.prototype.isUserPropertyChanged=function(j){return !this.shouldIgnoreField(j.name)&&this.isFieldChanged(j)
};
h.prototype.shouldIgnoreField=function(j){return j.indexOf(":")===0||this.constants.IGNORED_FIELDS.indexOf(j)>=0
};
h.prototype.isFieldChanged=function(k){var j=typeof this.userData[k.name]==="undefined";
if(j&&k.value.length===0){return false
}return j||!this.equalsIgnoreCase(this.userData[k.name],k.value)
};
h.prototype.loadUserData=function(){$.ajax({url:"/services/interaction/gated-form/user-data",type:"GET",data:{validationCode:this.validationCode},cache:false,success:this.onSuccessfulDataLoaded.bind(this),error:this.onErrorDataLoaded.bind(this)})
};
h.prototype.onSuccessfulDataLoaded=function(j){if(!$.isEmptyObject(j)&&j.formData){this.userData=j.formData;
this.displayUserData(j)
}};
h.prototype.displayUserData=function(j){var k=this.classes.expandedForm+" "+this.classes.validatedForm;
this.userEmail=j.formData.email;
this.$originalEmail.val(j.originalEmail);
$.each(j.formData,this.displayFieldValue.bind(this));
if(j.gatedContentPath){this.sendDownloadEvent();
k+=" "+this.classes.forceDownload;
if(b===11){this.setWindowLocation(j.gatedContentPath)
}this.setWindowLocation(j.gatedContentPath);
this.reCheckLinkedinAutofillForm()
}this.$el.addClass(k)
};
h.prototype.addArrow=function(){var k=this.$el.find(this.classes.submitAgainButton);
for(var j=0;
j<k.length;
j++){g.insertArrowPicture($(k[j]))
}};
h.prototype.reCheckLinkedinAutofillForm=function(){var k=document.querySelector(".IN-widget");
var j=document.querySelector('script[type="IN/Form2"]');
if(!k&&j){dispatchEvent(new Event("load"))
}};
h.prototype.setWindowLocation=function(j){window.location=j
};
h.prototype.displayFieldValue=function(k,j){this.$form.trigger(a.events.DISPLAY_VALUE+":"+k,j)
};
h.prototype.onErrorDataLoaded=function(j){if(j.status===400){this.displayFailedConfirmation()
}};
h.prototype.displayFailedConfirmation=function(){this.$el.addClass(this.classes.expandedForm+" "+this.classes.failedConfirmationState);
this.$el.trigger("form.showMessage")
};
h.prototype.onSuccessfulSubmit=function(){if(this.isSubmittedOnce){return
}this.isSubmittedOnce=true;
var j=this.$el[0].querySelectorAll(this.classes.multilineGradient);
var l=new e.GradientText();
var k=0.5;
var m=1.4;
l.init(j,{rightRatio:k,middleRatio:m})
};
h.prototype.constants={IGNORED_FIELDS:["captcha"]};
h.prototype.classes={callToAction:"gated-form__call-to-action-button",cancelLink:"cancel-link",emailUpdate:"gated-form__email-update",infoUpdate:"gated-form__info-update",failedConfirmation:"gated-form__unsuccessful-confirmation",submitAgain:"submit-again",downloadButton:"gated-form__download-button-link",downloadLink:"gated-form__download-link",expandedForm:"gated-form--expanded",validatedForm:"gated-form--validated",successState:"show-success",emailUpdateState:"show-email-update",infoUpdateState:"show-info-update",failedConfirmationState:"show-unsuccessful-confirmation",forceDownload:"force-download",submitAgainButton:".submit-again-arrow-container",multilineGradient:".multiline-gradient"};
h.moduleName="Gated Form";
h.selector=".gated-form-ui";
return h
});
define("FormConstructor",["form","constants","utils","gradients"],function(a,i,e,d){var b=$("html");
var f=$("."+i.Classes.overlay);
var h="epam-com/components/form/action/apply-for-job-independent";
var c=null;
function g(j){this.$el=j;
this.$selfIdLink=this.$el.find("."+this.classes.selfIdLink);
this.$selfIdPopup=this.$el.find("."+this.classes.selfIdPopup);
this.$popupCloseTargets=this.$el.find("."+this.classes.popupCloseButton).add(this.$overlay);
this.$continuumStyle=this.$el.hasClass("epam-continuum-style");
this.isSubmittedOnce=false;
this.formComponent=new a.FormComponent(this.$el,this.$continuumStyle);
if(this.$selfIdLink.length){this.$selfIdLink.on("click",function(){if(c!==h){this.togglePopup(false)
}}.bind(this));
this.$popupCloseTargets.on("click",this.togglePopup.bind(this,false));
this.selfIdFormPath=this.$selfIdLink.attr("href");
this.formComponent.onSuccessfulSubmit=this.onSuccessfulSubmit.bind(this)
}else{this.formComponent.onSuccessfulSubmit=this.applySuccessMessageGradient.bind(this)
}this.formComponent.initialize();
this.addArrow()
}g.prototype.addArrow=function(){var k=this.$el.find(this.classes.submitAgainButton);
for(var j=0;
j<k.length;
j++){e.insertArrowPicture($(k[j]))
}};
g.prototype.onSuccessfulSubmit=function(j){c=j.formType;
this.updateSelfIdLink(j);
if(c===h){if(j.isTwoStepCountry){this.$el.find(this.classes.twoStepsSuccessMessage).removeClass("hidden");
this.togglePopup(true)
}else{this.$el.find(this.classes.singleStepSuccessMessage).removeClass("hidden")
}}else{this.$el.find(this.classes.twoStepsSuccessMessage).removeClass("hidden");
this.togglePopup(true)
}this.applySuccessMessageGradient()
};
g.prototype.updateSelfIdLink=function(j){if(j.vacancyId!==undefined){this.$selfIdLink.attr("href",this.selfIdFormPath+"?submitId="+j.submitId+"&vacancyId="+j.vacancyId)
}else{this.$selfIdLink.attr("href",this.selfIdFormPath+"?submitId="+j.submitId)
}};
g.prototype.togglePopup=function(j){b.toggleClass(i.Classes.noscroll,j);
this.$selfIdPopup.toggleClass(i.Classes.hidden,!j);
f.toggleClass(i.Classes.hidden,!j).toggleClass(i.Classes.overlayCoverHeader,j)
};
g.prototype.applySuccessMessageGradient=function(){if(this.isSubmittedOnce){return
}this.isSubmittedOnce=true;
var j=this.$el[0].querySelectorAll(this.classes.multilineGradient);
var l=new d.GradientText();
var k=0.5;
var m=1.4;
l.init(j,{rightRatio:k,middleRatio:m})
};
g.prototype.classes={selfIdLink:"form-component__self-id-link",selfIdPopup:"popup--self-id",popupCloseButton:"form-component__popup-close",twoStepsSuccessMessage:".form-component__two-steps-success-message",singleStepSuccessMessage:".form-component__single-steps-success-message",submitAgainButton:".submit-again-arrow-container",multilineGradient:".multiline-gradient"};
g.moduleName="Form Constructor";
g.selector=".form-constructor-ui";
return g
});
define("FileUpload",["form","form-control","utils-browser","utils"],function(f,a,e,c){var b=10*1024*1024,g=["doc","docx","txt","rtf","pdf","xls","xlsx"];
function d(h){a.call(this,h);
this.$input=this.$el.find("."+this.classes.input);
this.field=this.$input.attr("name");
this.$hasRedesign23Style=$(document.body).hasClass("dark-mode")||$(document.body).hasClass("light-mode");
if(this.isStandard()){this.$path=this.$el.find("."+this.classes.path);
this.defaultPathValue=this.$path.val()
}else{this.$filename=this.$el.find("."+this.classes.filename);
this.$remove=this.$el.find("."+this.classes.removeFile);
this.$remove.on("click",this.cleanField.bind(this,false))
}this.context=this.initValidationContext();
this.registerField();
this.$input.on("change",this.uploadDone.bind(this));
this.$el.toggleClass(this.classes.standardField,this.isStandard())
}d.prototype=Object.create(a.prototype);
d.prototype.uploadDone=function(){var h=this.$input.get(0).files[0].name;
this.toggleUploadState(true);
if(this.isStandard()){this.$path.val(h)
}else{this.$filename.text(h)
}};
d.prototype.toggleUploadState=function(h){this.$el.toggleClass(this.classes.uploadDone,h)
};
d.prototype.registerField=function(){f.registerField({form:this.$form,field:this.field,cleanError:this.toggleError.bind(this),cleanField:this.extendedCleanField.bind(this),displayError:this.toggleError.bind(this),validator:this.fileValidator.bind(this),validationEvent:this.validationEvents})
};
d.prototype.extendedCleanField=function(){this.cleanField();
if(this.isStandard()){this.$path.val(this.defaultPathValue)
}};
d.prototype.afterClean=function(){this.toggleUploadState(false)
};
d.prototype.fileValidator=function(){var h=[];
var i=this.$input.val();
if(i&&!h.length){var j=i.match(/\.(\w+$)/)[1];
if(!this.isAllowedExtension(j)||!this.isAllowedSize()){h.push(this.context.constraintMsg)
}}if(c.hasTouchEvents()){return h
}if(this.context.isRequired&&!i){h.push(this.context.requiredMsg)
}return h
};
d.prototype.initValidationContext=function(){var i=f.extractValidationContext(this.$el),j=this.$el.data("maxSize"),h=this.$el.data("allowedExtensions");
i.maxSize=isNaN(j)?b:j*1024*1024;
if(!h){i.allowedExtensions=g
}else{i.allowedExtensions=h.toLowerCase().split(",")
}return i
};
d.prototype.isAllowedExtension=function(h){if(!h){return false
}return this.context.allowedExtensions.indexOf(h.toLowerCase())!==-1
};
d.prototype.isAllowedSize=function(){var h=this.$input[0].files;
return !h||h[0].size<=this.context.maxSize
};
d.prototype.isStandard=function(){return e.isInternetExplorer()||c.hasTouchEvents()&&!this.$hasRedesign23Style
};
d.prototype.validationEvents="change";
d.prototype.classes=$.extend({},a.prototype.classes,{removeFile:"file-upload__remove",standardField:"file-upload--standard",uploadDone:"file-upload--done",path:"file-upload__path",filename:"file-upload__filename",input:"file-upload__input",field:"file-upload__field",redesign23Style:".epam-redesign-23-style"});
d.moduleName="File Upload";
d.selector=".file-upload-ui";
return d
});
define("DropdownList",["form","form-control","AdditionalField","constants","multi-select"],function(d,a,f,c){var e=$("body");
function b(h){a.call(this,h);
this.$select=this.$el.find("."+this.classes.select);
this.multiple=this.$select.prop("multiple");
this.defaultValues=(this.$select.data("defaultValues")||"").toString();
this.defaultValues=this.multiple?this.defaultValues.split(","):this.defaultValues;
this.id=this.$select.attr("id");
this.errorId=this.id+"-error";
this.$selectedPlaceholder=this.$el.find(this.classes.selectedPlaceholder);
this.$additionalFieldHolder=this.$el.parent().find(this.classes.additionalFieldHolder);
var g=new f(this.$additionalFieldHolder);
this.validations={isRequired:this.$el.data("required")};
this.$el.on("setValidation",function(j,k){this.validations.isRequired=k.isRequired
}.bind(this));
this.isEpamContinuumStyle=this.$el.parents(".epam-continuum-style").length>0;
this.initSelect();
this.checkNewStyle();
this.registerField();
g.initAdditionalField();
var i=this.getCurrentOptionTriggerEvent();
if(i){this.updateLabelsByEvent(i)
}this.overlayScrollbarInstance=null;
this.name=this.$select.attr("name");
e.on("select-location:dropdown-change",this.handleExperienceNoticeDropdown.bind(this))
}b.prototype=Object.create(a.prototype);
b.prototype.checkNewStyle=function(){if(this.isEpamContinuumStyle){this.$errorText=this.$el.find(".form-component__label")
}};
b.prototype.toggleErrorContinuumStyle=function(h){var g=!!h;
this.$el.toggleClass(a.classes.fieldError,g);
this.$input.attr("aria-invalid",g);
this.$errorTooltip.find(".is-a11y-only").toggleClass("hidden",!g);
this.$errorText.text(h||"");
if(!h){this.$errorText.text(this.$errorText.attr("data-title"))
}};
b.prototype.escapeRegExp=function(g){var h=typeof g==="string"||g instanceof String?g:"";
return h.replace(/[-[/\]{}()*+?.,\\^$|#\s]/g,"\\$&")
};
b.prototype.customSearchMatcher=function(n,k){if($.trim(n.term)===""){return k
}var j=this.escapeRegExp(n.term);
if(j.match(/[/#+-.&\\]/)){var m=new RegExp(j,"i");
if(k.text.match(m)){return k
}}var l=new RegExp("^"+j,"i");
var g=k.text.split(/[\s.&\(/]+/);
for(var h=0;
h<g.length;
h++){if(g[h].match(l)!==null){return k
}}return null
};
b.prototype.optionalValidator=function(g,h){var i=d.requiredValidator(g,h);
return function(){if(this.validations.isRequired){return i()
}return[]
}.bind(this)
};
b.prototype.registerField=function(){d.registerField({form:this.$form,field:this.$select.attr("name"),displayValue:this.setValue.bind(this),cleanField:this.setValue.bind(this),cleanError:this.toggleError.bind(this),displayError:this.toggleError.bind(this),validator:this.optionalValidator(this.$select,this.context),validationEvent:this.validationEvents})
};
b.prototype.setValue=function(g,h){this.$select.val(h||this.defaultValues);
this.hideAdditionalField();
this.multiple?this.$select.trigger("synchronize"):this.$select.trigger("change",{withoutValidation:true});
this.toggleError()
};
b.prototype.hideAdditionalField=function(){this.$additionalFieldHolder.addClass(c.Classes.hidden)
};
b.prototype.getCurrentOptionTriggerEvent=function(){return this.$select.find("option:selected").attr("data-trigger-event")
};
b.prototype.updateLabelsByEvent=function(g){$("[data-show-for-event]").addClass("hidden");
$("input").toArray().forEach(function(i){var h=$(i).attr("id");
var j=$('[data-show-for-event~="'+g+'"][for='+h+"]");
if(j.length){j.removeClass("hidden")
}else{$("label[for="+h+'][data-show-for-event="default"]').removeClass("hidden")
}});
$("input").prop("checked",false)
};
b.prototype.initSelect=function(){var h=this.$el.data("required");
var g=this;
this.$select.change(function(){var i=g.getCurrentOptionTriggerEvent();
if(i){g.updateLabelsByEvent(i)
}});
if(this.multiple){this.$select.multiSelectFilter({required:h,labelId:this.id+"-label",errorId:this.errorId});
this.$input=this.$el.find(".multi-select-filter");
this.setOverlayScrollbar();
return
}this.$select.selectWoo({dropdownParent:this.$el.find("."+this.classes.parent),width:"off",placeholderOption:"first",matcher:this.customSearchMatcher.bind(this)});
this.$selectBoxContainer=this.$el.find(this.classes.selectBoxContainer);
this.$selectBoxContainer.addClass(this.classes.formComponentField);
this.$input=this.$el.find("."+this.classes.visibleInput);
this.$input.addClass(a.classes.focusTarget).attr("aria-describedby",this.errorId).attr("aria-labelledby",this.id+"-label select2-"+this.id+"-container");
this.$input.on("blur",function(){this.$select.trigger("select2:blur")
}.bind(this));
this.$select.on("select2:selecting",function(i){this.$selectedPlaceholder.text(i.params.args.data.text)
}.bind(this));
this.setOverlayScrollbar()
};
b.prototype.setOverlayScrollbar=function(){var g=e.hasClass("dark-mode")||e.hasClass("light-mode");
if(g){this.$select.on("select2:open",this.customizeDropdownScrollbar.bind(this));
this.$select.on("select2:closing",this.destroyDropdownScrollbar.bind(this));
$(document).on("keydown",this.$select.parent().find(".select2-search__field"),this.customizeDropdownScrollbar.bind(this))
}};
b.prototype.customizeDropdownScrollbar=function(){this.destroyDropdownScrollbar();
if(this.multiple){setTimeout(function(){OverlayScrollbars(this.$el.find(".multi-select-dropdown"),{className:"os-theme-dark"})
}.bind(this),100);
return
}setTimeout(function(){var g=this.$el.find("ul.select2-results__options");
g.unbind("mousewheel");
this.overlayScrollbarInstance=OverlayScrollbars(g,{className:"os-theme-dark"})
}.bind(this),10)
};
b.prototype.destroyDropdownScrollbar=function(){if(this.overlayScrollbarInstance instanceof OverlayScrollbars){this.overlayScrollbarInstance.destroy()
}};
b.prototype.handleExperienceNoticeDropdown=function(k,l){var i=this.$el.parents(".form-constructor-ui").find(".form-type").data("form-type");
var h=i==="epam-com/components/form/action/apply-for-job-independent";
var g=this.name==="applicantYearsOfExperience"||this.name==="applicantNoticePeriod";
if(g&&h){var j=l&&l.countryName==="India";
this.$el.toggleClass(c.Classes.hidden,!j);
this.toggleExperienceNoticeDropdown(j,j?this.name:"")
}};
b.prototype.toggleExperienceNoticeDropdown=function(h,g){this.validations.isRequired=h;
this.$select.attr("name",g)
};
b.prototype.validationEvents="change blur select2:blur";
b.prototype.classes=$.extend({},a.prototype.classes,{select:"dropdown-list__selection",visibleInput:"select2-selection",parent:"form-component__input",selectBoxContainer:".select2-container",formComponentField:"form-component__field",label:"form-component__label",selectedPlaceholder:".dropdown-list__selected-placeholder",additionalFieldHolder:".dropdown-list__additional-field-holder"});
b.moduleName="Dropdown List";
b.selector=".dropdown-list-ui";
return b
});
define("AdditionalField",["form","form-control","constants"],function(d,a,c){function b(e){a.call(this,e);
this.$el=e;
this.$select=this.$el.parent().find("."+this.classes.select);
this.$input=this.$el.find(this.classes.additionalField);
this.$additionalFieldLabel=this.$el.find(this.classes.additionalFieldLabel)
}b.prototype=Object.create(a.prototype);
b.prototype.initAdditionalField=function(){this.$select.on("select2:select",function(e){this.toggleAdditionalField(e)
}.bind(this));
this.$input.on("blur",function(){this.$input.trigger("change")
}.bind(this));
this.registerField()
};
b.prototype.toggleAdditionalField=function(i){var g=i.params.data.element.dataset.additionalValue,j=i.params.data.element.hasAttribute("data-required-field"),f=i.params.data.element.dataset.requiredMessage,e=j&&g,h=e?g+"*":g;
this.$input.val("").attr("placeholder",h);
this.$el.attr({"data-required":e?j:"false","data-required-msg":e?f:null});
this.$additionalFieldLabel.text(h);
this.$el.toggleClass(c.Classes.hidden,!g);
!j&&this.$input.trigger("change")
};
b.prototype.registerField=function(){d.registerField({form:this.$form,field:this.$input.attr("name"),cleanField:this.cleanField.bind(this),displayValue:this.displayValue.bind(this),cleanError:this.toggleError.bind(this),displayError:this.toggleError.bind(this),validator:this.getValidator.bind(this),validationEvent:this.validationEvents})
};
b.prototype.getValidator=function(){var e=[],g=this.$el.attr("data-required-msg"),f=this.$input[0];
if(f&&!f.value){g&&e.push(g)
}return e
};
b.prototype.validationEvents="focusout change DOMAutoComplete";
b.prototype.classes=$.extend({},a.prototype.classes,{select:"dropdown-list__selection",additionalField:".dropdown-list__additional-field",additionalFieldLabel:".dropdown-list__additional-field-label"});
b.moduleName="Additional Field";
b.selector=".dropdown-list__additional-field-holder";
return b
});
define("Comment",["form","form-control"],function(c,a){var d=$("body");
var e={EPAM_CONTINUUM_STYLE:"epam-continuum-style",LABEL:"form-component__label",FAKE_PLACEHOLDER:"fake-placeholder",HIDDEN:"hidden",STANDALONE:"form-component--standalone"};
function b(f){this.$el=f;
a.call(this,f);
this.$input=this.$el.find("textarea");
this.isRedesign23=d.hasClass("dark-mode")||d.hasClass("light-mode");
this.registerField();
this.setOverlayScrollbar();
this.onFocus();
this.isEpamContinuumStyle=this.$el.parents("."+e.EPAM_CONTINUUM_STYLE).length>0;
this.isStandalone=!!this.$el.parents("."+e.STANDALONE).length;
if(this.isEpamContinuumStyle&&this.$input.attr("placeholder")&&!this.isGoogleChrome()){this.$label=this.$el.find("."+e.LABEL);
this.createFakePlaceholder();
this.removeRealPlaceholder();
this.addEventListener(this.fakePlaceholder);
this.triggerEvent()
}}b.prototype=Object.create(a.prototype);
b.prototype.setOverlayScrollbar=function(){if(this.isRedesign23){setTimeout(function(){this.scrollbarInstance=OverlayScrollbars(this.$input,{className:"os-theme-dark",textarea:{dynHeight:true}})
}.bind(this),100)
}};
b.prototype.onFocus=function(){if(this.isRedesign23){this.$input.on("focus",function(){this.$el.addClass("focused")
}.bind(this));
this.$input.on("focusout",function(){this.$el.removeClass("focused")
}.bind(this))
}};
b.prototype.registerField=function(){c.registerField({form:this.$form,field:this.$input.attr("name"),cleanField:this.cleanField.bind(this),displayValue:function(f,g){this.displayValue(f,g);
this.scrollbarInstance.update()
}.bind(this),cleanError:this.toggleError.bind(this),displayError:this.toggleError.bind(this),validator:c.requiredValidator(this.$input,this.context),validationEvent:this.validationEvents})
};
b.prototype.isGoogleChrome=function(){return window.navigator.userAgent.indexOf("Chrome")!==-1
};
b.prototype.createFakePlaceholder=function(){let placeholderText=this.$input.attr("placeholder");
this.fakePlaceholder=$("<span>"+placeholderText+"</span>");
this.fakePlaceholder.addClass(e.FAKE_PLACEHOLDER);
this.calcPaddingBottom();
this.setFakePlaceholderHeight();
this.fakePlaceholder.appendTo(this.$el)
};
b.prototype.calcPaddingBottom=function(){this.paddingBottom=this.isStandalone?6.7:6.1
};
b.prototype.setFakePlaceholderHeight=function(){this.fakePlaceholder.css("bottom",this.pixelsToRems(this.$label.height())+this.paddingBottom+"rem")
};
b.prototype.pixelsToRems=function(f){return f/10
};
b.prototype.removeRealPlaceholder=function(){this.$input.removeAttr("placeholder")
};
b.prototype.addEventListener=function(f){this.$input.on("input keydown",function(){$(this).val()?f.addClass(e.HIDDEN):f.removeClass(e.HIDDEN)
})
};
b.prototype.triggerEvent=function(){var f=jQuery.Event("keydown");
this.$input.trigger(f)
};
b.prototype.validationEvents="blur";
b.moduleName="Comment";
b.selector=".comment-ui";
return b
});
define("Checkbox",["form","form-control"],function(c,a){function b(d){a.call(this,d);
this.$checkboxHolder=this.$el.find("."+this.classes.checkboxHolder);
this.$input=this.$el.find("input");
this.$errorTooltip=this.$el.find("."+a.classes.errorTooltip);
this.validator=c.requiredValidator(this.$input,this.context);
this.registerField()
}b.prototype=Object.create(a.prototype);
b.prototype.registerField=function(){c.registerField({form:this.$form,field:this.$input.attr("name"),cleanField:this.cleanField.bind(this),cleanError:this.toggleError.bind(this),displayError:this.toggleError.bind(this),validator:this.validator,validationEvent:this.validationEvents})
};
b.prototype.cleanField=function(){this.toggleError();
this.$input.prop("checked",false)
};
b.prototype.toggleError=function(e){var d=!!e;
this.$checkboxHolder.toggleClass(a.classes.fieldError,d);
this.$input.attr("aria-invalid",d);
this.$errorTooltip.text(e||"")
};
b.prototype.validationEvents="change DOMAutoComplete";
b.prototype.classes=$.extend({},a.prototype.classes,{checkboxHolder:"checkbox__holder"});
b.moduleName="Checkbox";
b.selector=".checkbox-ui";
return b
});
define("Captcha",["form","form-control","utils-env","constants"],function(b,j,d,i){var h=60*1000,e="jcr_content_",f={};
var a={oldView:"/services/interaction/captcha.png?:captchaKey=",redesignView:"/services/interaction/captcha23.png?:captchaKey="};
var c=$(document.body);
function g(k){this.$el=k;
this.updateThemeMode();
this.isEditMode=d.isEditMode();
this.reCaptchaEnabled=this.$el.data("recaptcha-enabled");
if(this.reCaptchaEnabled&&!this.isEditMode){return
}this.$window=$(window);
this.$form=this.$el.closest("form");
this.$input=this.$el.find("."+this.classes.input);
this.$captchaImage=this.$el.find("."+this.classes.captchaImage);
this.$captchaKey=this.$el.find('input[name=":captchaKey"]');
this.$errorTooltip=this.$el.find("."+j.classes.errorTooltip);
this.context=b.extractValidationContext(this.$el);
this.interval=setInterval(this.refreshCaptcha.bind(this),h);
this.isTabActive=!document.hidden;
this.captchaId=this.$captchaKey.attr("id");
this.captchaId=this.captchaId.substring(this.captchaId.indexOf(e)+e.length);
this.registerField();
this.$window.blur(this.windowBlur.bind(this));
this.$window.focus(this.windowFocus.bind(this));
$.when(f.loadPromise).then(f.loadPromise?this.refreshCaptcha.bind(this):this.initLoadPromise.bind(this));
c.on(i.Events.themeSwitch,this.refreshCaptcha.bind(this))
}g.prototype.registerField=function(){b.registerField({form:this.$form,field:this.$input.attr("name"),mandatoryCleanUp:true,cleanField:this.cleanField.bind(this),cleanError:this.cleanError.bind(this),displayError:this.displayError.bind(this),validator:b.requiredValidator(this.$input,this.context)})
};
g.prototype.windowBlur=function(){this.isTabActive=false;
clearInterval(this.interval)
};
g.prototype.windowFocus=function(){this.isTabActive=true;
this.updateCaptcha()
};
g.prototype.cleanField=function(){this.$input.val("");
this.updateCaptcha()
};
g.prototype.cleanError=function(){this.$el.removeClass(j.classes.fieldError);
this.$errorTooltip.text("")
};
g.prototype.displayError=function(k){this.$el.toggleClass(j.classes.fieldError,!!k);
this.$errorTooltip.text(k||"");
this.updateCaptcha()
};
g.prototype.refreshCaptcha=function(){if(this.isTabActive){var k=this.captchaId+"_"+new Date().getTime();
this.modifyCaptchaSrcAttribute(k);
this.$captchaKey.val(k)
}};
g.prototype.updateThemeMode=function(){this._lightMode=c.hasClass(this.classes.lightMode);
this._darkMode=c.hasClass(this.classes.darkMode)
};
g.prototype.modifyCaptchaSrcAttribute=function(k){this.updateThemeMode();
if(this._lightMode){this.$captchaImage.attr("src",a.redesignView+k+"&mode=light");
return
}if(this._darkMode){this.$captchaImage.attr("src",a.redesignView+k+"&mode=dark");
return
}this.$captchaImage.attr("src",a.oldView+k)
};
g.prototype.initLoadPromise=function(){var k=$.Deferred();
this.$captchaImage.one("load",function(){k.resolve()
});
this.refreshCaptcha();
f.loadPromise=k.promise()
};
g.prototype.updateCaptcha=function(){clearInterval(this.interval);
this.refreshCaptcha();
this.interval=setInterval(this.refreshCaptcha.bind(this),h)
};
g.prototype.classes={input:"captcha__input",captchaImage:"captcha__image",parentForm:".form-component",darkMode:"dark-mode",lightMode:"light-mode"};
g.moduleName="Captcha";
g.selector=".captcha-ui";
return g
});
define("autofill-with-linkedin",["linkedInUtils"],function(b){function a(c){return{locationFieldsContainer:$(".location-fields-ui"),getCountryFieldValue:function(){return $(".country-field-ui .select2-selection__rendered").text()
},linkedinData:{country:c.country.toUpperCase(),region:c.state,city:c.city,zipCode:c.zip},isAlphaCodeUse:true}
}window.addEventListener("message",function(g){try{var f=JSON.parse(g.data);
if(f.type==="formData"){var i=f.data;
var c=a(i);
var d=$(".geolocation-country").length>0;
if(d){return
}b.fillLocationFormFields(c)
}}catch(h){return
}})
});
define("linkedinModule",["analytics"],function(e){var g=document.querySelector("script[data-mode='BUTTON_DATA']");
var f=null;
var d=null;
if(g){localStorage.setItem("isAppliedWithLinkedin","false");
EPAM.pushLinkedinApplyGtmEvent=function(){f();
var s=e.getEvent(d);
s=s&&$.extend({},s,{eventAction:"Clicks on AWL"});
if(s){e.push(s)
}}
}function q(s){d=s
}function o(s,t){if(h()){if(!c()){p(s,t);
k()
}}}function h(){return JSON.parse(localStorage.getItem("isAppliedWithLinkedin"))
}function l(s){return document.querySelector("script[data-mode='"+s+"']")
}function p(t,u){var s=l(t);
s.setAttribute("data-mode",u)
}function k(){var t=document.querySelector("[name='widget-holder']");
var s=document.createElement("script");
s.src="https://www.linkedin.com/mjobs/awli/awliWidget";
t.appendChild(s);
b()
}function j(){var s=window.location.href;
return s.indexOf("vacancyId")!==-1
}function c(){return !!document.querySelector(".form-component__self-id-link")
}function n(){localStorage.setItem("isAppliedWithLinkedin","false")
}function m(){$(".IN-Awli-widget").addClass("hidden")
}function r(){$(".IN-widget").addClass("hidden")
}function a(){$(".IN-Awli-widget").removeClass("hidden")
}function b(){$(".IN-widget").removeClass("hidden")
}function i(s){f=s
}return{initLinkedin:o,resetApplyWithLinkedin:n,isTwoStepsForm:c,isSecondStep:j,changeLinkedinMode:p,triggerLinkedInScript:k,isAppliedWithLinkedin:h,getLinkedInConfigByType:l,hideLinkedinWidget:m,hideLinkedinWidgetV3:r,showLinkedinWidgetV3:b,showLinkedinWidget:a,addCallbackForStartForm:i,addForm:q}
});
define("linkedInUtils",["constants"],function(j){function e(m,o,n){var l=null;
if(n){l=m.find('option[data-iso-code-alpha-2="'+o+'"]').val()
}else{l=m.find('option[data-geolocation-name="'+o+'"]').val()
}return l
}function b(n,m){if(n&&m){n.value=m;
var l=new Event("change");
n.dispatchEvent(l)
}}function f(l){var o=[{formFieldName:"applicantFirstName",linkedInResponsePropName:"firstName"},{formFieldName:"applicantLastName",linkedInResponsePropName:"lastName"},{formFieldName:"applicantEmail",linkedInResponsePropName:"emailAddress"},{formFieldName:"applicantMessage",linkedInResponsePropName:"publicProfileUrl"},{formFieldName:"applicantPhone",linkedInResponsePropName:"phoneNumber"}];
for(var m=0;
m<o.length;
m++){var n=document.querySelector("[name='"+o[m].formFieldName+"']");
if(n){b(n,l.linkedinData[o[m].linkedInResponsePropName])
}}}function h(l){l.locationFieldsContainer.one(j.Events.locationSelectZipCodeUpdate,function(){var m=i("zip-code");
m.val(l.linkedinData.zipCode).trigger("change")
})
}function g(l){l.locationFieldsContainer.one(j.Events.locationSelectCityUpdate,function(n,m){if(m.isEmpty===0){var p=i("city",true);
p.val(l.linkedinData.city)
}else{var o=i("city");
o.val(e(o,l.linkedinData.city)).trigger("change")
}})
}function a(l){l.locationFieldsContainer.one(j.Events.locationSelectRegionUpdate,function(){var m=i("region");
m.val(e(m,l.linkedinData.region,l.isAlphaCodeUse)).trigger("change")
})
}function d(m){var n=i("country");
var l=e(n,m.linkedinData.country,m.isAlphaCodeUse);
n.val(l).trigger("change")
}function c(m){var n=$(".country-filled").length>0;
if(!n){d(m);
var o=k(m.linkedinData.dataArray,"region",m.linkedinData.country,m);
if(o){m.linkedinData.region=o;
a(m)
}var p=k(m.linkedinData.dataArray,"city",m.linkedinData.country,m);
if(p){m.linkedinData.city=p;
g(m)
}var l=m.linkedinData.zipCode;
if(l){h(m)
}}}function k(o,m,n,l){if(l.isAlphaCodeUse){return l.linkedinData[m]
}if(n==="United States"||n==="Canada"||n==="US"){if(m==="region"){return o[o.length-2]
}if(m==="city"){return o[o.length-3]
}}if(m==="city"){if(o.length===3){return o[o.length-3]
}else{return o[o.length-2]
}}}function i(m,l){if(l){return $(".location-fields-ui ."+m+"-field-ui input")
}return $(".location-fields-ui ."+m+"-field-ui select")
}return{fillLocationFormFields:c,fillLocationCountryField:d,fillLocationRegionField:a,fillLocationCityFiled:g,fillCasualFormFields:f,fillLocationZipCodeField:h}
});
function onProfileData(b){if(!JSON.parse(localStorage.getItem("isAppliedWithLinkedin"))){EPAM.pushLinkedinApplyGtmEvent()
}localStorage.setItem("isAppliedWithLinkedin","true");
var a=$(".linkedin-summary-ui");
if(a.length){a.removeClass("hidden")
}require(["linkedInUtils"],function(d){$(window).trigger("linkedin.data.received",[{linkedinData:b}]);
var e=(function(){var g=b.location.locationName.split(", ");
var f={region:null,city:null,isAlphaCodeUse:false,firstName:b.firstName,lastName:b.lastName,emailAddress:b.emailAddress,publicProfileUrl:b.publicProfileUrl,country:g[g.length-1],dataArray:g,phoneNumber:b.phoneNumber};
return f
})();
var c={locationFieldsContainer:$(".location-fields-ui"),getCountryFieldValue:function(){return $(".country-field-ui .select2-selection__rendered").text()
},linkedinData:e};
d.fillCasualFormFields(c);
d.fillLocationFormFields(c)
})
}define("linkedInSummaryParser",[],function(){var d=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(m){return typeof m
}:function(m){return m&&typeof Symbol==="function"&&m.constructor===Symbol?"symbol":typeof m
};
var f={headLine:"headline",firstName:"firstName",lastName:"lastName",emailAddress:"emailAddress",phoneNumber:"phoneNumber",summary:"summary",positions:"positions",title:"title",startDate:"startDate",month:"month",year:"year",endDate:"endDate",companyName:"companyName",educations:"educations",schoolName:"schoolName",degree:"degree",fieldOfStudy:"fieldOfStudy",headline:"headline",skills:"skills",isCurrent:"isCurrent"};
var j=function j(n,m){if(m){return"\n  "+n+": "+m
}return""
};
function h(m){if(m){return m[f.month]+" "+m[f.year]
}return""
}function k(m){var n="\n  "+j("Position",m[f.title])+"  "+j("Company",m[f.companyName])+"  "+j("Dates",h(m[f.startDate])+" - "+h(m[f.endDate]))+"  "+j("Description",m[f.summary])+"  ";
return n
}function e(n){var m="\n  "+j("University",n[f.schoolName])+"  "+j("Degree",n[f.degree])+"  "+j("Faculty",n[f.fieldOfStudy])+"  "+j("Dates",h(n[f.startDate])+" - "+h(n[f.endDate]))+"  ";
return m
}function b(m){return m.name
}function l(p,t,n,o){var m=p[t];
if(Array.isArray(m)){var s=[];
for(var q=0;
q<m.length;
q++){var v=m[q];
var u=n(v);
s.push(u)
}return s.join(o)
}else{var r=null;
if(n){r=n(p[t])
}else{r=p[t]
}return r
}}function g(q){var o=q[f.positions];
var n=[];
for(var p=0;
p<o.length;
p++){var m=o[p];
if(m[f.isCurrent]){n.push(m[f.title]+" at "+m[f.companyName])
}}return n.join(", ")
}var a={get:function c(n,o){if(n[o]===undefined||n[o]===null){return""
}if(d(n[o])==="object"&&n[o]!==null&&o===f.startDate||o===f.endDate){return new Proxy(n[o],a)
}if(Array.isArray(n[o])&&n[o]!==null){for(var m=0;
m<n[o].length;
m++){n[o][m]=new Proxy(n[o][m],a)
}}if(o in n){return n[o]
}return""
}};
function i(n){var o=new Proxy(n,a);
var m="\n  "+o[f.firstName]+" "+o[f.lastName]+"\n  "+g(n)+"\n  -------------------------------------\n  Summary: "+l(o,f.summary)+"\n  --------------------------------------\n  Work history:  "+l(o,f.positions,k,"")+"\n  --------------------------------------\n  Education:  "+l(o,f.educations,e,"")+"\n  --------------------------------------\n  Skills:\n  "+l(o,f.skills,b,", ")+"\n  ";
return m
}return{formattingLinkedinSummary:i}
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
$(function(){var a=document.querySelector(".display-section-block");
function b(c){return c.textContent.trim()===""
}if(a&&b(a)){a.classList.add("hidden")
}});
define(["media"],function(d){var e=document.body.classList.contains("ec-mode");
var b=document.querySelector(".page-template__animation-renderer");
var a=d.currentMode().greaterThan(d.modes.Tablet);
var c=a?"Main_Blur_Style3_Desktop":"Main_Blur_Style3_Mobile";
if(b&&!e){bodymovin.loadAnimation({container:b,renderer:"canvas",loop:true,path:"/etc/designs/epam-com/json-animations/metamorphosis/"+c+".json",rendererSettings:{className:"animation__object",viewBoxOnly:true}})
}});
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
define("Video23",[],function(){var a='<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" frameborder="0" border="0" scroll="no" allowfullscreen scrolling="no"></iframe></div>',c=$(window);
function b(d){this.$el=d;
var e=this.$el.data("isPopup");
if(e){this.$playButton=this.$el.find("."+this.classes.button);
this.initPopup()
}else{this.$player=this.$el.find("."+this.classes.player);
this.$parent=this.$el.parent().parent();
this.$wrap=this.$el.find(".video__wrap");
this.width=parseInt(this.$wrap.data("width"));
this.height=parseInt(this.$wrap.data("height"));
this.aspectRatio=this.height/this.width;
c.on("resize",this.resizeVideo.bind(this));
this.resizeVideo();
if(this.$el.parents(".tabs-ui").length){c.on("tab.changed",this.resizeVideo.bind(this))
}}}b.prototype.initPopup=function(){var d={type:"iframe",disableOn:240,preloader:true,fixedContentPos:true,iframe:{patterns:{youtube:{index:"youtube.com/",id:"v=",src:this.$playButton.data("mfp-src")}},markup:a}};
this.$playButton.magnificPopup(d)
};
b.prototype.resizeVideo=function(){this.$wrap.css("padding-bottom",this.aspectRatio*100+"%")
};
b.prototype.classes={player:"video__player",button:"video__button"};
b.moduleName="Video 23";
b.selector=".video-ui-23";
return b
});
define("TwoLevelTabs23",["jquery-plugins"],function(){var c={firstLevelTabsWrapper:"two-level-tabs__first-level-tabs-wrapper",firstLevelTabLink:"two-level-tabs__first-level-tabs-link",secondLevelTabLink:"two-level-tabs__second-level-tabs-link",firstLevelTabsList:"two-level-tabs__first-level-tabs-list",secondLevelTabs:"two-level-tabs__second-level-tabs",firstLevelTab:"two-level-tabs__first-level-tabs-item",secondLevelTab:"two-level-tabs__second-level-tabs-item",content:"two-level-tabs__content-container",jstabs:"js-second-tabs",active:"active",open:"open"};
var b={tabChange:"tab.change"};
var d=[];
function a(e){this.$el=e;
this.$firstLevelTab=this.$el.find("."+c.firstLevelTab);
this.$secondLevelTab=this.$el.find("."+c.secondLevelTab);
this.$firstLevelTabsList=this.$el.find("."+c.firstLevelTabsList);
this.$firstLevelTabsWrapper=this.$el.find("."+c.firstLevelTabsWrapper);
this.$items=this.$el.find("."+c.jstabs);
this.init();
this.setEventListeners();
d.push(this)
}a.prototype.init=function(){var g=window.location.hash;
if(window.location.hash){if(g.indexOf("-")>-1){var e=g.split("-").shift().substring(1);
var h=g.substring(1);
this.selectFirstLevelInitialTab(e);
this.selectSecondLevelInitialTab(h)
}else{var f=g.substring(1);
this.selectFirstLevelInitialTab(f)
}}};
a.prototype.setEventListeners=function(){var e=this;
this.$el.find("[data-target-id]").on("click",function(){var f=$(this).data("target-id");
if($(this).hasClass(c.firstLevelTabLink)){e.selectActiveTab(c.firstLevelTabLink,f);
e.showSecondLevelTabs(f);
if(e.getDeviceType()!=="desktop"){if(e.$firstLevelTabsWrapper.hasClass(c.open)){e.scrollToElement(e.$el)
}e.$firstLevelTabsWrapper.toggleClass(c.open)
}}else{if($(this).hasClass(c.secondLevelTabLink)){e.selectActiveTab(c.secondLevelTabLink,f);
e.showContent(f)
}}});
this.$el.on(b.tabChange,this.onTabChange.bind(this))
};
a.prototype.selectActiveTab=function(e,f){this.$el.find("."+e+"[data-target-id="+f+"]").parent().addClass(c.active).siblings("li").removeClass(this.classes.active)
};
a.prototype.selectFirstLevelInitialTab=function(e){this.selectInitialTabByAnchor(this.$firstLevelTab,e,this.showSecondLevelTabs)
};
a.prototype.selectSecondLevelInitialTab=function(e){this.selectInitialTabByAnchor(this.$secondLevelTab,e,this.showContent)
};
a.prototype.selectInitialTabByAnchor=function(f,e,i){var g=f.find('a[href="#'+e+'"]');
var h=g.data("target-id");
g.parent().addClass(c.active).siblings().removeClass(c.active);
i.call(this,h)
};
a.prototype.showSecondLevelTabs=function(e){this.$el.find("."+c.secondLevelTabs).removeClass(c.active);
this.$el.find("."+c.secondLevelTabs+"[data-content-id="+e+"]").addClass(c.active)
};
a.prototype.showContent=function(e){this.$el.find("."+c.content+"[data-content-id="+e+"]").addClass(c.active).siblings(":not(ul)").removeClass(c.active)
};
a.prototype.scrollToElement=function(f){const e=70;
$("html, body").animate({scrollTop:f.offset().top-e},500)
};
a.prototype.getDeviceType=function(){const e=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);
if(e<768){return"mobile"
}return"desktop"
};
a.prototype.onTabChange=function(g,h){var e=h.tab;
var i=this.$items.eq(e);
var f=i.data("content-id");
this.$firstLevelTab.removeClass(c.active).eq(e).addClass(c.active);
this.$firstLevelTab.find("."+c.secondLevelTabs).removeClass(c.active);
this.$firstLevelTab.find("."+c.secondLevelTabs+"[data-content-id="+f+"]").addClass(c.active);
this.$items.removeClass(c.active);
i.addClass(c.active);
return false
};
a.prototype.classes=c;
a.moduleName="TwoLevelTabs23";
a.activatedComponents=d;
a.events=b;
a.selector=".two-level-tabs-ui-23";
return a
});
define("TimelineSlider23",["TabsUtil","utils-a11y","constants","utils-env","gradients"],function(g,b,k,i,h){var d=$(document),e=$("html"),a=$(window),f=$("body");
var c={item:".timeline-slider-ui-23__slide",historyImage:".timeline-slider-ui-23__view-more",historyImageContainer:".timeline-slider-ui-23__image-container",historyGallery:".timeline-slider-ui-23__popup",active:"timeline-slider-ui-23--active",close:"timeline-slider-ui-23--close",popup:".timeline-slider-ui-23__popup",closePopupButton:".timeline-slider-ui-23__popup-close",carouselItem:".timeline-slider-ui-23__carousel-item",switcherCarousel:".timeline-slider-ui-23__switcher-carousel",switcherButton:".timeline-slider-ui-23__switcher-button",preloader:".timeline-slider-ui-23__preloader",allyActive:"ally-active",popupPrint:"popup-print",printImage:"print-image",tabPrev:".timeline-slider-ui-23__button-prev.js-tabs-prev",tabNext:".timeline-slider-ui-23__button-next.js-tabs-next",title:".timeline-slider-ui-23__slide-title",slideDate:".timeline-slider-ui-23__slide-date",transparent:"transparent",breadcrumbs:".breadcrumbs-ui",rteTextGradient:".rte-text-gradient"};
function j(l){this.$el=l;
this.$historyImage=this.$el.find(c.historyImage);
this.$imageContainer=this.$el.find(c.historyImageContainer);
this.$historyGallery=this.$el.find(c.historyGallery);
this.$closePopupButton=this.$el.find(c.closePopupButton);
this.$switcherCarousel=this.$el.find(c.switcherCarousel);
this.$switcherButtons=this.$el.find(c.switcherButton);
this.$preloader=this.$el.find(c.preloader);
this.$tabNext=this.$el.find(c.tabNext);
this.$tabPrev=this.$el.find(c.tabPrev);
this.$switcherNav=this.$el.find(".owl-nav");
this.$historyImage.on("click",this.onButtonClick.bind(this));
this.$closePopupButton.on("click",this.closePopup.bind(this));
a.on("tab.changed",this.onTabChanged.bind(this));
a.on("beforeprint",this.beforeprintHandler.bind(this));
d.on("keyup",this.keyupHandler.bind(this));
this.$switcherCarousel.on("changed.owl.carousel",function(m){this.onSwitcherItemChanged(m)
}.bind(this));
this.$historyGallery.on("load.owl.lazy",this.showPreloader.bind(this));
this.$historyGallery.on("loaded.owl.lazy",this.hidePreloader.bind(this));
this.$switcherCarousel.owlCarousel(this.switcherDefaultConfig);
this.$switcherCarousel.trigger("refresh.owl.carousel");
this.isLoaded=false;
window.addEventListener("load",this.onLoad.bind(this));
g.call(this,l,{items:l.find(c.item),verticalNavigation:true,scrollToTopOnTabChange:true,scrollToReservedSpace:function(){var m=document.querySelector(c.breadcrumbs),o=m&&!!m.clientHeight,n=!!document.querySelector(c.breadcrumbs+".hidden");
return o||n?150:100
}});
this.$el.on("tab.loaded tab.change",function(){this.$items.eq(this.activeItem).addClass(c.allyActive)
}.bind(this));
this.$items.on(k.Events.transitionEnd,function(){this.$items.not("."+this.classes.active).removeClass(c.allyActive)
}.bind(this))
}j.prototype=Object.create(g.prototype);
j.prototype.onLoad=function(){if(this.isLoaded){return
}this.prepareTitles.bind(this)();
var n=0.5;
var o=1.4;
var l=this.$el[0].querySelectorAll(c.slideDate+", "+c.rteTextGradient);
var m=new h.GradientText();
m.init(l,{rightRatio:n,middleRatio:o});
this.isLoaded=true
};
j.prototype.wcmModeChange=function(l){l==="preview"&&this.setColorClass()
};
j.prototype.onButtonClick=function(p){p.preventDefault();
var n=this.$imageContainer;
var m=n.get(0).getBoundingClientRect();
var o=n.height();
var q=m.top+window.scrollY;
var l=q-window.innerHeight/2+o/2;
if(!this.$el.hasClass(c.active)){$("html, body").animate({scrollTop:l},1000)
}this.openPopup(p)
};
j.prototype.keyupHandler=function(l){if(l.key===k.Keys.esc){this.closePopup()
}};
j.prototype.openPopup=function(l){var n=$(l.currentTarget).parent().next(c.popup),m=n.find(c.closePopupButton);
this.$currentHistoryImage=n.find(c.historyImage);
this.$currentGallery=n.find(c.historyGallery);
this.$el.addClass(c.active);
f.addClass(c.popupPrint);
f.addClass(k.Classes.pinnedFilter);
e.addClass(k.Classes.noscroll);
this.$historyImage.attr("tabindex",-1);
this.carouselItemLength=n.find(c.carouselItem).length;
m.focus();
this.initGallery();
b.handlePopupFocus(n)
};
j.prototype.closePopup=function(){if(!this.$el.hasClass(c.active)){return
}this.$el.removeClass(c.active).addClass(c.close);
this.$historyImage.removeAttr("tabindex");
setTimeout(function(){f.removeClass(c.popupPrint);
f.removeClass(k.Classes.pinnedFilter);
e.removeClass(k.Classes.noscroll);
!this.$el.hasClass(c.active)&&this.$el.scrollToSelector({duration:300,reservedSpace:156});
this.refreshGallery();
this.$el.removeClass(c.close);
this.$currentHistoryImage.focus()
}.bind(this),100)
};
j.prototype.initGallery=function(){var l=this.carouselItemLength>1?this.mainDefaultConfig:$.extend({},this.mainDefaultConfig,{mouseDrag:false,touchDrag:false,nav:false,dots:false});
if(this.$currentGallery.hasClass("owl-loaded")){this.$currentGallery.trigger("refresh.owl.carousel")
}else{this.$currentGallery.owlCarousel(l);
this.enableTopSwitcher()
}};
j.prototype.refreshGallery=function(){this.$currentGallery.trigger("to.owl.carousel",[0,20])
};
j.prototype.onTabChanged=function(){if(i.isEditMode()){return
}var l=this.$switcherButtons.filter("."+this.classes.active).data("item");
this.$switcherCarousel.trigger("to.owl.carousel",[l,20]);
this.activeBgColor=this.getBgColorClass(this.$items.eq(this.activeItem));
this.setColorClass();
this.enableTopSwitcher()
};
j.prototype.onSwitcherItemChanged=function(l){var m=l.item.index;
this.$el.trigger("tab.change",{tab:m,skipFocus:true});
this.$tabPrev.removeAttr("disabled");
this.$tabNext.removeAttr("disabled");
if(m+1>=l.item.count){this.$tabNext.attr("disabled","disabled")
}else{this.$tabNext.removeAttr("disabled")
}if(m===0){this.$tabPrev.attr("disabled","disabled")
}else{this.$tabPrev.removeAttr("disabled")
}this.enableTopSwitcher()
};
j.prototype.setColorClass=function(){var l=this.getBgColorClass(this.$el);
this.$el.removeClass(l).addClass(this.activeBgColor)
};
j.prototype.getBgColorClass=function(m){if(!m){return
}var l=m.attr("class").match(/bg-color[\w-]*\b/);
return l&&l.join(" ")
};
j.prototype.showPreloader=function(){this.$preloader.removeClass(k.Classes.hidden)
};
j.prototype.hidePreloader=function(){this.$preloader.addClass(k.Classes.hidden)
};
j.prototype.beforeprintHandler=function(){if(!this.$el.hasClass(c.active)){this.$currentGallery.owlCarousel("destroy")
}if(this.$el.hasClass(c.active)){this.addPrintImage()
}};
j.prototype.addPrintImage=function(){var l=$("."+c.printImage),m=this.$items.eq(this.activeItem).find(".owl-item.active .timeline-slider__carousel-image--desktop").attr("src");
if(!l.length){l=$('<img class="'+c.printImage+'" />').attr("src",m);
f.append(l);
return
}l.attr("src",m)
};
j.prototype.enableTopSwitcher=function(){var o='<svg>\n        <use xlink:href="/etc/designs/epam-core/images/sprites/sprite-redesign_21.svg#link-arrow-in-circle"></use>\n    </svg>';
var n=this.$el[0].querySelector(".owl-item.active .timeline-slider-ui-23__switcher-carousel-item p");
this.$switcherNav=this.$el.find(".owl-nav");
if(n&&this.$switcherNav){$(this.$switcherNav).css("width",n.clientWidth);
var m=$(this.$switcherNav).find(".owl-prev");
var l=$(this.$switcherNav).find(".owl-next");
m[0].innerHTML=l[0].innerHTML=o
}};
j.prototype.prepareTitles=function(){var l=this.$el.find(c.title);
l.each(function(m,n){$(n).css("max-width",$(n).prev().width())
})
};
j.prototype.mainDefaultConfig={nav:true,center:true,items:1,lazyLoad:true,lazyLoadEager:0,rewind:false};
j.prototype.switcherDefaultConfig={nav:true,center:true,items:1,dots:false,rewind:false,touchDrag:false,mouseDrag:false};
j.moduleName="Timeline Slider 23";
j.selector=".timeline-slider-ui-23";
return j
});
define("Timeline23",["gradients"],function(a){var c={year:".timeline-ui-23__year"};
function b(e){this.$el=e;
var g=0.5;
var h=1.4;
var d=this.$el[0].querySelectorAll(c.year);
var f=new a.GradientText();
f.init(d,{rightRatio:g,middleRatio:h})
}b.moduleName="Timeline23";
b.selector=".timeline-ui-23";
return b
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
define("ShareToSocialConstants",function(){var c={common:{print:".js-print",email:".js-email-share",copy:".js-copy-link"},menu:{link:".share-menu__link",notice:".share-menu__notice"},popup:{container:".share-popup__container",button:".share-popup__share-button",link:".share-popup__link",title:".share-popup__item-title",notice:".share-popup__notice"}};
var g={copyText:"copy link",copiedText:"link copied"};
var f=991;
var e=72;
var b=location.href.match(/[^http(s)?://www.].+[\.$]/gi)[0];
var a=2000;
var d={fb:"facebook",tw:"twitter",li:"linkedin"};
return{classes:c,text:g,mobileDevice:f,headerPlaceholder:e,shortUrl:b,noticeVisibilityDelay:a,SOCIAL_ICONS:d}
});
define("ShareToSocialUtils",["utils-share"],function(c){var b=function(e){e.preventDefault();
c.go($(this).data())
};
var d=function(g){var f=encodeURIComponent(g.data("subject")),e=encodeURIComponent(location.href);
return"mailto:?subject="+f+"&body="+e
};
var a=function(e){navigator.clipboard.writeText(e)
};
return{shareToSocial:b,emailSharingLink:d,copyToClipboard:a}
});
define("SharePopup23",["ShareToSocialConstants","ShareToSocialUtils","utils-share"],function(b,d,c){function a(e){this.$el=e;
this.$container=this.$el.find(b.classes.popup.container);
this.$links=this.$el.find(b.classes.popup.link);
this.$button=this.$el.find(b.classes.popup.button);
this.$menu=this.$el.find(b.classes.popup.container);
this.toggleMenu();
this.setSocialLinks();
this.setPrintButton();
this.setEmailButton();
this.setCopyLinkButton()
}a.prototype.toggleMenu=function(){var e=this;
var f=false;
this.$button.off().on("click",function(){var h=e.$el.offset().top-b.headerPlaceholder;
var g=window.innerWidth<=b.mobileDevice;
if(g){f=!f;
e.$menu.stop().slideToggle();
$(this).attr("aria-expanded",f);
if(f){$("html, body").animate({scrollTop:h},300)
}}})
};
a.prototype.setSocialLinks=function(){var e=this.$links.not(b.classes.common.print).not(b.classes.common.email).not(b.classes.common.copy);
e.on("click",d.shareToSocial);
e.each(function(){var f=$(this).attr("data-type");
var h=b.SOCIAL_ICONS[f];
h&&$(this).attr("aria-label",h);
$(this).find(b.classes.popup.title).text(h);
var g=c.getLink($(this).data());
g&&$(this).attr("href",g)
})
};
a.prototype.setPrintButton=function(){var e=this.$links.filter(b.classes.common.print);
e.on("click",function(){window.print()
})
};
a.prototype.setEmailButton=function(){var e=this.$links.filter(b.classes.common.email);
e.click(function(){$("<a />").attr("href",d.emailSharingLink(e)).get(0).click()
})
};
a.prototype.setCopyLinkButton=function(){var e=this.$links.filter(b.classes.common.copy);
var f=this.$el.find(b.classes.popup.notice);
e.on("click",function(){d.copyToClipboard(location.href);
var g=window.innerWidth<=b.mobileDevice;
var h=$(this).find(b.classes.popup.title);
if(g){h.text(b.text.copiedText);
setTimeout(function(){h.text(b.text.copyText)
},b.noticeVisibilityDelay)
}else{f.fadeIn();
setTimeout(function(){f.fadeOut()
},b.noticeVisibilityDelay)
}})
};
a.moduleName="Share To Social 23";
a.selector=".share-popup-ui-23";
return a
});
define("ShareMenu23",["ShareToSocialConstants","ShareToSocialUtils","utils-share"],function(c,a,d){function b(e){this.$el=e;
this.$links=this.$el.find(c.classes.menu.link);
this.setSocialLinks(this);
this.setPrintButton(this);
this.setEmailButton(this);
this.setCopyLinkButton(this)
}b.prototype.setSocialLinks=function(){var e=this.$links.not(c.classes.common.print).not(c.classes.common.email).not(c.classes.common.copy);
e.on("click",a.shareToSocial);
e.each(function(){var f=$(this).attr("data-type");
var h=c.SOCIAL_ICONS[f];
h&&$(this).attr("aria-label",h);
var g=d.getLink($(this).data());
g&&$(this).attr("href",g)
})
};
b.prototype.setPrintButton=function(){var e=this.$links.filter(c.classes.common.print);
e.on("click",function(){window.print()
})
};
b.prototype.setEmailButton=function(){var e=this.$links.filter(c.classes.common.email);
e.click(function(){$("<a />").attr("href",a.emailSharingLink(e)).get(0).click()
})
};
b.prototype.setCopyLinkButton=function(){var e=this.$links.filter(c.classes.common.copy);
var f=this.$el.find(c.classes.menu.notice);
e.off().on("click",function(){a.copyToClipboard(location.href);
f.fadeIn();
setTimeout(function(){f.fadeOut()
},c.noticeVisibilityDelay)
})
};
b.moduleName="Share To Social 23";
b.selector=".share-menu-ui-23";
return b
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
define("RelatedVacancies23",["animations"],function(b){function a(){var c=document.querySelectorAll("."+this.classes.vacanciesItem);
window.addEventListener("pageshow",function(){if(c.length){b.addAppearanceAnimation(c,this.classes.animated);
b.disableAnimationInEditMode(c,this.classes.animated)
}}.bind(this))
}a.prototype.classes={vacanciesItem:"related-vacancies__item",animated:"animated"};
a.moduleName="Related Vacancies 2023";
a.selector=".related-vacancies-ui-23";
return a
});
define("RecruitingSearch23",["constants","geolocation","utils-env","utils"],function(m,g,f,h){var a=$(window),d=$("body"),k={formOnly:"searchForm",formWithResults:"searchFormAndResults"};
var j="";
var e=new Intl.Collator();
var b={form:".recruiting-search__form",autocomplete:".js-autocomplete",fakeAutoComplete:".recruiting-search__fake-input",select:".recruiting-search__select",selectOption:"select2-results__option",selectOptions:"select2-results__options",selectOptionGroup:'select2-results__option[role="list"]',selectGroup:"select2-results__group",selectRendered:"select2-selection__rendered",selectBoxContainer:".select2-container",formComponentField:"form-component__field",location:".recruiting-search__location",searchFilter:".recruiting-search__filter",checkbox:".recruiting-search__checkbox",resultList:".search-result__list",resultContainer:".search-result",resultHeader:".search-result__heading-23",sortingMenu:".search-result__sorting-menu",sortingItem:".search-result__sorting-item-23",sortingRadio:".search-result__sorting-radio-23",hiddenDividerItem:"search-result__sorting-item--no-divider",itemName:".search-result__item-name-23",itemApply:".search-result__item-apply-23",viewMore:".search-result__view-more-23",errorMessage:".search-result__error-message-23",searchInput:".select2-search__field"};
function c(s,q){if($.trim(s.term)===""){return q
}if(typeof q.children==="undefined"){return null
}var n=j=s.term.toUpperCase();
var r="(^|.*\\s)("+n+")";
if(q.text.trim().toUpperCase().match(r)!==null){return q
}var o=[];
$.each(q.children,function(t,u){if(t>0){if(u.text.trim().toUpperCase().match(r)!==null){o.push(u)
}}});
if(o.length){var p=$.extend({},q,{text:"",hasChild:true},true);
p.children=o;
return p
}return null
}function l(o){function s(u,t){return e.compare(u.text,t.text)
}function q(u,t){$.each(u.children,function(v,w){t.push(w)
})
}function p(u,t){if(u.children.length!==0){$.each(u.children,function(v,w){if(v>0&&w.text.trim().toUpperCase().indexOf(j)===0&&w.text.trim().toUpperCase().indexOf(u.text.trim().toUpperCase())!==0){t.push(w)
}})
}}function n(){var t=this.$el.find(".dropdown-cities");
var u=t.find(".select2-results__options--nested");
if(t.length!==0&&u.length!==0){t.removeClass("dropdown-cities");
u.removeClass("open")
}}if(this.$el.find(".select2-search__field").val().trim().length!==0){var r=[];
$.each(o,function(t,u){if(u.hasChild){q(u,r)
}else{p(u,r);
r.push(u)
}});
if(r.length>1){setTimeout(n.bind(this),0)
}return r.sort(s)
}return o
}function i(n){this.$el=n;
this.$form=n.find(b.form);
this.$autocomplete=this.$form.find(b.autocomplete);
this.$fakeAutoComplete=$(".job-search-ui-23").find(b.fakeAutoComplete);
this.$select=this.$form.find(b.select);
this.$location=this.$form.find(b.location);
this.$results=this.$el.find(b.resultList);
this.isAuthor=f.isAuthor();
this.viewType=this.$el.data("view");
this.resultsUrl=this.$el.data("resultsUrl");
this.recruitingUrl=this.$el.data("recruitingUrl");
this.updateUrlAndLoadResultsDebounced=h.debounceExtend(this.updateUrlAndLoadResults.bind(this),300);
this.defaultSearchParameters={locale:CQ.I18n.getLocale(),limit:20,recruitingUrl:this.recruitingUrl};
this.overlayScrollbarInstance=null;
this.init&&this.init();
this.initAutocomplete();
this.initSelect();
this.$el.data("useGeolocation")&&g.onGeolocationUpdate(this.fillWithGeolocation.bind(this));
this.$form.on("submit",this.submit.bind(this));
if(!this.isFormOnly()){this.initSearchResult()
}}i.prototype.init=null;
i.prototype.initAutocomplete=function(){this.$fakeAutoComplete.autocomplete($.extend({},this.getAutocompleteConfig(),{appendTo:this.$fakeAutoComplete.parent(),onSelect:function(n){this.submit(n,"fake")
}.bind(this)})).on("keyup",this.onEnter.bind(this));
this.$autocomplete.autocomplete($.extend({},this.getAutocompleteConfig(),{onSelect:function(n){this.submit(n,"real")
}.bind(this)})).on("keyup",this.onEnter.bind(this))
};
i.prototype.onEnter=function(n){n.key===m.Keys.enter&&this.submit()
};
i.prototype.getAutocompleteConfig=function(){return{serviceUrl:this.config.autocompletePath,triggerSelectOnValidInput:false,deferRequestBy:500,appendTo:this.$autocomplete.parent(),params:{locale:this.defaultSearchParameters.locale},transformResult:function(n){return{suggestions:JSON.parse(n)}
},onSelect:this.submit.bind(this),width:"343%",zIndex:10}
};
i.prototype.submit=function(o,n){o&&o.preventDefault&&o.preventDefault();
this.$form.trigger(m.Events.autocompleteSelected,[{initialInput:n}]);
if(!this.isFormOnly()){this.updateUrlAndLoadResults();
return
}window.location=this.toUrl(this.resultsUrl,this.getSubmitContext(),this.isAuthor)
};
i.prototype.getSubmitContext=null;
i.prototype.isNewPage=function(){return d.hasClass("dark-mode")||d.hasClass("light-mode")
};
i.prototype.initSelect=function(){this.$select.selectWoo(this.getSelectConfig());
this.$selectBoxContainer=this.$el.find(b.selectBoxContainer);
this.$selectBoxContainer.addClass(b.formComponentField);
this.$location.on("click",this.openSelection.bind(this)).on("click","."+b.selectOption,this.toggleSelectItem.bind(this)).on("click","."+b.selectOptionGroup,this.toggleCities.bind(this));
if(this.isNewPage()){this.$location.on("mouseleave",'.select2-results__option[role="list"]',this.locationMouseleaveHandler.bind(this))
}this.setOverlayScrollbar()
};
i.prototype.setOverlayScrollbar=function(){this.$select.on("select2:open",this.customizeDropdownScrollbar.bind(this));
this.$select.on("select2:closing",this.destroyDropdownScrollbar.bind(this));
$(document).on("keydown",this.$select.parent().find(".select2-search__field"),this.customizeDropdownScrollbar.bind(this))
};
i.prototype.customizeDropdownScrollbar=function(){var n=this;
if(n.overlayScrollbarInstance instanceof OverlayScrollbars){n.overlayScrollbarInstance.destroy()
}setTimeout(function(){var p=n.$el.find(".select2-results > ul");
p.unbind("mousewheel");
var o=d.hasClass("dark-mode");
var q=o||d.hasClass("light-mode");
if(q){n.overlayScrollbarInstance=OverlayScrollbars(p,{className:"os-theme-dark"})
}},10)
};
i.prototype.destroyDropdownScrollbar=function(){if(this.overlayScrollbarInstance instanceof OverlayScrollbars){this.overlayScrollbarInstance.destroy()
}};
i.prototype.locationMouseleaveHandler=function(o){var n=$(o.currentTarget).find(".select2-results__option--highlighted");
if(n.length>0){n.attr("aria-selected","false")
}};
i.prototype.openSelection=function(r,o){this.$form.find(b.searchInput).focus();
var q,n;
if(o){q=o.parents("."+b.selectOptionGroup)
}else{n=this.$location.find('[aria-selected="true"]')
}if(n&&n.length){q=n.parents("."+b.selectOptionGroup);
n.parents("."+b.selectOptions).addClass("open")
}if(q&&q.hasClass("dropdown-cities")){var p=this;
setTimeout(function(){p.overlayScrollbarInstance.scroll({el:q,block:"begin"},100)
},10)
}};
i.prototype.toggleSelectItem=function(q){var n=$(q.target),o=n.hasClass(b.selectGroup),p=o?n.siblings("."+b.selectOptions):n.children("."+b.selectOptions);
if(!p.length){return
}p.toggleClass("open")
};
i.prototype.toggleCities=function(o){var n=$(o.target);
if(n.hasClass(b.selectRendered)){return
}if(n.hasClass(b.selectGroup)){n.parent().toggleClass("dropdown-cities")
}else{n.toggleClass("dropdown-cities")
}this.openSelection(null,n);
return false
};
i.prototype.getSelectConfig=function(){return{dropdownParent:this.$location,placeholderOption:"first",matcher:c,width:"off",sorter:l.bind(this)}
};
i.prototype.fillWithGeolocation=function(n){var p={name:n.country},o={name:n.city};
if(!p.name){return
}p.$item=this.$select.find('[data-geolocation-name="'+p.name+'"]');
p.value=p.$item.length&&"all_"+p.$item.data("name");
if(o.name){o.$item=p.$item.find('[data-geolocation-name="'+o.name+'"]');
o.value=o.$item.val()
}if(p.value||o.value){this.$select.val(o.value||p.value).trigger("change")
}};
i.prototype.isFormOnly=function(){return this.viewType===k.formOnly
};
i.prototype.initSearchResult=function(){this.$resultContainer=this.$el.find(b.resultContainer);
this.$resultHeader=this.$resultContainer.find(b.resultHeader);
this.$sortingMenu=this.$resultContainer.find(b.sortingMenu);
this.$sortingItem=this.$resultContainer.find(b.sortingItem);
this.$sortingRadio=this.$resultContainer.find(b.sortingRadio);
this.$preloader=this.$resultContainer.find("."+m.Classes.preloader).toggle(false);
this.$viewMore=this.$resultContainer.find(b.viewMore).toggle(false);
this.$errorMessage=this.$resultContainer.find(b.errorMessage).toggle(false);
this.$sortingRadio.on("change",this.updateUrlAndLoadResultsDebounced);
this.$select.on("change",this.updateUrlAndLoadResultsDebounced);
this.$viewMore.on("click",this.loadMoreResults.bind(this));
a.on("scroll",this.loadResultsOnScroll.bind(this));
this.beforeLoadResults&&this.beforeLoadResults();
this.loadResults(this.collectSearchParameters(0,true))
};
i.prototype.beforeLoadResults=null;
i.prototype.loadMoreResults=function(n){var p=this.$results.children().length,o=this.collectSearchParameters(p);
this.loadResults(o);
n&&n.preventDefault()
};
i.prototype.loadResultsOnScroll=function(){if(this.loading||!this.loadOnScroll||this.$viewMore.is(":visible")){return
}var p=a.height(),o=a.scrollTop(),n=this.$results.children().last().offset().top;
if(p+o>n){this.loadMoreResults()
}};
i.prototype.collectSearchParameters=function(o,p){var n={query:this.$autocomplete.val(),country:this.getCountry(),city:this.getCity(),sort:this.getSorting(),offset:o||0,buildSchemaOrgMarkup:p};
return $.extend({},this.defaultSearchParameters,n)
};
i.prototype.getCountry=function(){return this.$select.find(":selected").parent().data("name")
};
i.prototype.getCity=function(){if(!this.$select.find(":selected").is(":first-child")){return this.$select.val()
}};
i.prototype.getSorting=function(){return this.$sortingMenu?this.$sortingMenu.find(":checked").val():null
};
i.prototype.updateUrlAndLoadResults=function(n){n&&n.stopPropagation();
var p=this.collectSearchParameters(),o=this.updateUrl(p);
this.loadResults(p,o)
};
i.prototype.updateUrl=function(p){var s=$.extend({},p,{locale:null,limit:null,offset:null}),o=window.location.href,r=this.toUrl(window.location.pathname,s),n=o.length-r.length;
if(n<0||o.indexOf(r,n)!==n){window.history.pushState({},"",r);
if(window.initWechat){var q=window.location.href.split("#")[0];
initWechat(q)
}return true
}return false
};
i.prototype.toUrl=function(p,o,r){var n=p+(r?".html":""),q={};
Object.keys(o).forEach(function(t){var u=o[t],s=u&&(!$.isArray(u)||u.length);
if(s){q[t]=u
}});
return Object.keys(q).length?n+"?"+$.param(q):n
};
i.prototype.loadResults=function(n,o){if(n.locale==="en"&&n.country==="Ukraine"){this.showRedirectMessage();
return
}$.ajax({url:this.config.searchUrl,data:n,cache:false,beforeSend:this.toggleLoadingState.bind(this,true),complete:this.toggleLoadingState.bind(this,false),success:this.updateSearchResults.bind(this,n),error:this.showErrorMessage.bind(this,o)})
};
i.prototype.showRedirectMessage=function(){this.$results.empty();
this.$resultHeader.toggle(false);
this.$sortingMenu.toggleClass(m.Classes.hidden,true);
var n=this.getResultsContext();
require("utils-dust").append("recruiting-search-no-result",n,this.$results)
};
i.prototype.updateSearchResults=function(x,p){var y=p.result,w=p.schemaOrgMarkup,u=p.total,n=this.getResultsContext(y),q=x.limit,r=x.offset,v=!y.length,t=r===0,o=u>r+q,s=!!x.buildSchemaOrgMarkup;
this.loadOnScroll=t&&o;
if(v||t){this.$results.empty()
}require("utils-dust").append("recruiting-search-23-result",n,this.$results);
this.showResultMessage(x.query,u);
this.showApplyButtonText();
this.$sortingMenu.toggleClass(m.Classes.hidden,v);
this.$resultHeader.toggle(!v);
this.$errorMessage.toggle(v);
this.$viewMore.toggle(!t&&o);
!t&&this.$results.find(b.itemName).eq(r).focus();
h.checkDividers(this.$sortingItem,b.hiddenDividerItem);
s&&!!w&&this.addSchemaOrgMarkup(w)
};
i.prototype.addSchemaOrgMarkup=function(n){this.$el.prepend('<script type="application/ld+json">'+JSON.stringify(n)+"<\/script>")
};
i.prototype.getResultsContext=null;
i.prototype.showErrorMessage=function(o){var n=CQ.I18n.getMessage("component.general.ajax-error-message")+" "+CQ.I18n.getMessage("component.general.ajax-error-try-again");
this.$errorMessage.text(n).show();
this.$sortingMenu.addClass(m.Classes.hidden);
if(o){this.$results.empty();
this.$resultHeader.hide();
this.$viewMore.hide()
}else{if(this.$results.children().length>=this.defaultSearchParameters.limit){this.$viewMore.show()
}}};
i.prototype.toggleLoadingState=function(n){this.$preloader.toggle(n);
this.loading=n
};
i.prototype.showResultMessage=function(q,p){if(!p){this.$errorMessage.text(CQ.I18n.getMessage("component.general.search-empty-result-for-combination"));
return
}var o=q?this.getResultMessageWithQuery(q,p):this.getResultMessage(p);
var n=o.replace(p,'<span class="heading-1-color">'+p+"</span>");
this.$resultHeader[0].innerHTML=n
};
i.prototype.showApplyButtonText=function(){var p=this.getApplyButtonText();
var n=this.$el.find(b.itemApply);
for(var o=0;
o<n.length;
o++){n[o].innerHTML=p
}};
i.prototype.getResultMessageWithQuery=null;
i.prototype.getResultMessage=null;
i.prototype.classes=b;
return i
});
define("PersonInfo23",["utils","media","imager","gradients"],function(c,e,b,a){var f=$(window);
function d(h){this.desktopImageLoaded=false;
this.mobileImageLoaded=false;
this.$el=h;
this.$mobilePlaceholder=this.$el.find("."+this.classes.mobilePlaceholder);
this.$desktopPlaceholder=this.$el.find("."+this.classes.desktopPlaceholder);
var j=0.58;
var k=1.95;
var g=document.querySelectorAll("."+this.classes.personName);
var i=new a.GradientText();
i.init(g,{rightRatio:j,middleRatio:k});
this.render();
f.on("resize",c.debounce(this.render.bind(this),100))
}d.prototype.isDesktop=function(){return e.currentMode().greaterThan(e.modes.Tablet)
};
d.prototype.render=function(){if(this.isDesktop()){if(!this.desktopImageLoaded){b.create(this.$desktopPlaceholder);
this.desktopImageLoaded=true
}}else{if(!this.mobileImageLoaded){b.create(this.$mobilePlaceholder);
this.mobileImageLoaded=true
}}};
d.prototype.classes={desktopPlaceholder:"person-info-23__desktop-placeholder",mobilePlaceholder:"person-info-23__mobile-placeholder",personName:"person-info-23__person-name"};
d.moduleName="Person Info 23";
d.selector=".person-info-ui-23";
return d
});
define("NewsReleases23",["utils-share","animations"],function(b,c){function a(e){this.$el=e;
this.$newsList=this.$el.find("."+this.classes.newsList);
this.$socialLinks=this.$el.find("."+this.classes.socialLink);
this.setSocialLinks();
this.$newsList.on("click","."+this.classes.socialLink,this.openPopup.bind(this));
var d=document.querySelectorAll("."+this.classes.newsItem+":not(."+this.classes.animated+")");
var f=document.querySelectorAll("."+this.classes.seeAllBtn);
window.addEventListener("pageshow",function(){if(d.length){c.addAppearanceAnimation(d,this.classes.animated);
c.addAppearanceAnimation(f,this.classes.animated);
c.disableAnimationInEditMode(d,this.classes.animated);
c.disableAnimationInEditMode(f,this.classes.animated)
}}.bind(this))
}a.prototype.setSocialLinks=function(){this.$socialLinks.each(function(){var d=window.location.origin+$(this).data("path");
$(this).removeAttr("data-path").attr("data-url",d).attr("data-count_url",d)
})
};
a.prototype.openPopup=function(e){var d=this.getLinkData(e.currentTarget);
b.openPopup(d);
return false
};
a.prototype.getLinkData=function(d){return b.getLink($(d).data())
};
a.prototype.classes={socialLink:"news-releases-23__social-link",newsList:"news-releases-23__list",newsItem:"news-releases-23__item",seeAllBtn:"news-releases-23__see-all",animated:"animated"};
a.moduleName="News Releases 2023";
a.selector=".news-releases-ui-23";
return a
});
define("NewsFilter23",["require","media","constants","NewsFilterA11YLayer","animations","utils"],function(c,b,j,e,i,f){var a=$(window),d=$("body");
var h=c("utils-share");
function g(k){this.$el=k;
this.$newsList=this.$el.find("."+this.classes.newsList);
this.$preloader=this.$el.find("."+j.Classes.preloader);
this.$viewMore=this.$el.find("."+this.classes.viewMore);
this.$errorMessage=this.$el.find("."+this.classes.errorMessage);
this.$badRequestMessage=this.$el.find("."+this.classes.badRequestMessage);
this.$emptyResultMessage=this.$el.find("."+this.classes.emptyResultMessage);
this.$filter=this.$el.find("."+this.classes.filter);
this.defaultParameters={paths:this.$el.data("paths"),dateFormat:this.$el.data("dateFormat"),limit:this.constants.LIMIT,offset:0,locale:CQ.I18n.getLocale()};
this.defaulContext=this.createDefaultContext();
this.isTouch=f.hasTouchEvents();
this.initFilters();
this.$newsFilterA11YLayer=new e(k,this,h);
this.$newsList.on(this.isTouch?"click":"mouseover","."+this.classes.share,this.toggleShare.bind(this));
this.$newsList.on("click","."+this.classes.socialLink,this.openPopup.bind(this));
this.$viewMore.on("click",this.loadMoreNewsPages.bind(this));
this.collectParametersAndLoad(true);
this.stickyFilter()
}g.prototype.stickyFilter=function(){var k=this;
this.$el.pinFilterTop(true,{value:52,getSpacerHeight:function(){return k.$filter.height()
}})
};
g.prototype.createDefaultContext=function(){var k=this.$el.data("socialIcons")||"";
return{socialIcons:k.split(","),spritePath:EPAM.spritePath,origin:window.location.origin,isAuthor:c("utils-env").isAuthor()}
};
g.prototype.initFilters=function(){var l=this.$el.find("."+this.classes.newsFilter),k=this.$el.data("hasNewsFilter");
this.$year=l.filter("."+this.classes.year);
this.initSelect(this.$year);
this.collectParameters=this.collectYearParameters;
if(k){this.$newsType=l.filter("."+this.classes.newsType);
this.initSelect(this.$newsType);
this.collectParameters=this.collectNewsTypeParameters
}l.on("change",function(){this.collectParametersAndLoad();
this.scrollResultsToTop()
}.bind(this));
var m=null;
l.on("select2:open",function(o){var n=$(o.target).parent().find("ul.select2-results__options");
n.unbind("mousewheel");
var p=d.hasClass("dark-mode")||d.hasClass("light-mode");
if(p){setTimeout(function(){m=OverlayScrollbars(n,{className:"os-theme-dark"})
},10)
}});
l.on("select2:closing",function(){m.destroy()
})
};
g.prototype.initSelect=function(k){k.selectWoo({width:"off",dropdownParent:k.parent("."+this.classes.input)});
this.$selectBoxContainer=this.$el.find(this.classes.selectBoxContainer);
this.$selectBoxContainer.addClass(this.classes.formComponentField)
};
g.prototype.collectNewsTypeParameters=function(){return $.extend(this.collectYearParameters(),{newsType:this.getFilterValue(this.$newsType)})
};
g.prototype.collectYearParameters=function(){return $.extend({},this.defaultParameters,{year:this.getFilterValue(this.$year)})
};
g.prototype.getFilterValue=function(k){var l=k.val();
if(l){return l
}};
g.prototype.toggleShare=function(o){var n=$(o.currentTarget),l=b.currentMode().greaterThan(b.modes.WideMobile),k=$(o.target),m=this.classes.shareOpened;
function p(){n.removeClass(m)
}if(!l&&!k.parents().hasClass(this.classes.shareMobile)){return
}else{n.addClass(m);
if(this.isTouch){o.stopPropagation();
a.one("click",p)
}else{n.one("mouseout",p)
}}};
g.prototype.openPopup=function(l){var k=this.getLinkData(l.currentTarget);
h.openPopup(k);
return false
};
g.prototype.getLinkData=function(k){return h.getLink($(k).data())
};
g.prototype.loadMoreNewsPages=function(){var l=this.$newsList.children().length,k=$.extend(this.collectParameters(),{offset:l});
this.loadNewsPages(k)
};
g.prototype.collectParametersAndLoad=function(k){this.loadNewsPages($.extend(this.collectParameters(),{buildSchemaOrgMarkup:k}))
};
g.prototype.loadNewsPages=function(k){$.ajax({url:this.constants.URL,data:k,beforeSend:this.toggleLoadingState.bind(this,true),success:this.updateNewsPages.bind(this,k),error:this.showErrorMessage.bind(this),complete:this.toggleLoadingState.bind(this,false),cache:false})
};
g.prototype.toggleLoadingState=function(l){this.$preloader.toggleClass(j.Classes.hidden,!l);
l&&this.$errorMessage.addClass(j.Classes.hidden);
if(!l){var k=document.querySelectorAll("."+this.classes.share+":not(."+this.classes.animated+")");
var m=document.querySelectorAll("."+this.classes.viewMore);
i.addAppearanceAnimation(k,this.classes.animated);
i.addAppearanceAnimation(m,this.classes.animated)
}};
g.prototype.updateNewsPages=function(r,n){var s=n.result,q=n.schemaOrgMarkup,m=r.offset,p=!s.length,l=n.total>m+r.limit,o=!!r.buildSchemaOrgMarkup;
var k=this.$newsList.find(this.classes.lastNews);
(p||!m)&&this.$newsList.empty();
this.$emptyResultMessage.toggleClass(j.Classes.hidden,!p);
this.$viewMore.toggleClass(j.Classes.hidden,!l);
this.renderNewsPages(s);
this.$newsFilterA11YLayer.focusFirstItemAfterLoadNewItems(k);
o&&!!q&&this.addSchemaOrgMarkup(q)
};
g.prototype.renderNewsPages=function(k){var l=$.extend({pages:k},this.defaulContext);
c("utils-dust").append(this.constants.TEMPLATE,l,this.$newsList)
};
g.prototype.addSchemaOrgMarkup=function(k){this.$el.prepend('<script type="application/ld+json">'+JSON.stringify(k)+"<\/script>")
};
g.prototype.showErrorMessage=function(){this.$badRequestMessage.removeClass(j.Classes.hidden)
};
g.prototype.scrollResultsToTop=function(){if(d.hasClass(j.Classes.pinnedFilter)){this.$el.scrollToSelector({duration:500})
}};
g.prototype.constants={URL:"/services/search/news-pages",TEMPLATE:"news-list-23",LIMIT:12};
g.prototype.classes={selectBoxContainer:".select2-container",formComponentField:"form-component__field",input:"news-filter-23__input",newsFilter:"news-filter-23__select",newsType:"news-filter-23__select--newstype",year:"news-filter-23__select--year",share:"news-filter-23__item",shareMobile:"news-filter-23__share",shareOpened:"news-filter-23__share--opened",shareButton:"news-filter-23__share-button",socialLink:"news-filter-23__social-link",newsList:"news-filter-23__results",viewMore:"news-filter-23__view-more",errorMessage:"news-filter-23__error-message",badRequestMessage:"news-filter-23--bad-request",emptyResultMessage:"news-filter-23--empty-result",lastNews:">li:last-child",newsItemIcon:"news-filter-23__icon-item",filter:"news-filter-23__filter",animated:"animated"};
g.moduleName="News Filter 2023";
g.selector=".news-filter-ui-23";
return g
});
define("NewsFilterA11YLayer",[],function(){var a=$("html");
var c={shareButton:".news-filter-23__share-button",newsFilterItem:".news-filter-23__item",newsFilterShareOpened:"news-filter-23__share--opened",newsFilterIconsListFirstChild:".news-filter-23__icons-list > li:first-child",newFilterTitle:".news-filter-23__title",newsFilterTitleLink:".news-filter-23__title a"};
function b(f,e,d){this._el=f;
this._self=e;
this._shareLib=d;
this.init()
}b.prototype.init=function(){this.initEvents()
};
b.prototype.onShareButtonClickHandler=function(e){var d=$(e.target).parents(c.newsFilterItem);
if(d.length){d.addClass(c.newsFilterShareOpened);
d.find(c.newsFilterIconsListFirstChild).focus()
}};
b.prototype.onFocusinHandler=function(){if(a.hasClass("key-used")){var d=this._el.find("."+c.newsFilterShareOpened);
if(d.length){d.removeClass(c.newsFilterShareOpened)
}}};
b.prototype.focusFirstItemAfterLoadNewItems=function(d){if(d.length){d.next().find(c.newsFilterTitleLink).focus()
}};
b.prototype.onKeydownHandler=function(e){if(e.key==="Enter"){var d=this._shareLib.getLink($(e.currentTarget).children("a").data());
this._shareLib.openPopup(d);
return false
}};
b.prototype.onClickHandler=function(e){var f=e.target.firstChild;
var d=this._self.getLinkData(f);
this._shareLib.openPopup(d);
return false
};
b.prototype.initEvents=function(){this._el.on("click",c.shareButton,this.onShareButtonClickHandler.bind(this));
this._el.on("focusin",c.newFilterTitle,this.onFocusinHandler.bind(this));
this._self.$newsList.on("keydown","."+this._self.classes.newsItemIcon,this.onKeydownHandler.bind(this));
this._self.$newsList.on("click","."+this._self.classes.newsItemIcon,this.onClickHandler.bind(this))
};
return b
});
define("MixedVacancyBlock23",["constants","utm-utils"],function(d,f){var a=$("html");
var c={placeOfWork:".mixed-vacancy-block__place-of-work",buttonWrapper:".mixed-vacancy-block__button-wrapper",buttonDisabled:"mixed-vacancy-block__button-wrapper--disabled",checkbox:".checkbox"};
const e={office:"office",home:"home"};
function b(g){this.$el=g;
this.$placeOfWork=this.$el.find(c.placeOfWork);
this.$buttonWrapper=this.$el.find(c.buttonWrapper);
this.$checkbox=this.$el.find(c.checkbox);
this.$vacancyButton=this.$buttonWrapper.find("button");
this.$vacancyLink=this.$buttonWrapper.find("a");
this.$inputOffice=this.$el.find("#place-of-work_office");
this.$inputHome=this.$el.find("#place-of-work_home");
this.$vacancyButton.on("click",this.handleButtonClick.bind(this));
this.$placeOfWork.on("change","input",this.handleRadioButtonChange.bind(this));
this.$vacancyButton.attr("disabled",true)
}b.prototype.handleRadioButtonChange=function(h){const g=$(h.target).val();
this.$buttonWrapper.removeClass(c.buttonDisabled);
this.$vacancyButton.attr("disabled",false);
if(this.$inputOffice.prop("checked")===false&&this.$inputHome.prop("checked")===false){this.$buttonWrapper.addClass(c.buttonDisabled);
this.$vacancyButton.attr("disabled",true)
}if(g===e.office){this.$vacancyLink.addClass(d.Classes.hidden);
this.$vacancyButton.removeClass(d.Classes.hidden);
this.$vacancyButton.removeAttr("aria-labelledby")
}else{if(g===e.home){this.handleLinkClick();
this.$vacancyLink.removeClass(d.Classes.hidden);
this.$vacancyButton.addClass(d.Classes.hidden)
}}this.$checkbox.change(function(){const i=$(this).prop("checked");
$(".checkbox").prop("checked",false);
$(this).prop("checked",true);
if(i===false){$(this).prop("checked",false)
}})
};
b.prototype.handleButtonClick=function(){a.trigger(d.Events.showVacancyForm);
this.$el.addClass(d.Classes.hidden)
};
b.prototype.handleLinkClick=function(){var g=f.buildAnywhereUrl(this.$vacancyLink.data("href"));
this.$vacancyLink.attr("href",g)
};
b.moduleName="Mixed Vacancy Block 23";
b.selector=".mixed-vacancy-block-ui-23";
return b
});
define("LcaListing23",["utils-dust"],function(a){function b(p){var f="/services/search/lca-listing",n="lca-listing-table-items-23",g=0,j=5;
var m=p,i=m.find(".ajax-error-message"),l=m.data("lca-path"),c=m.find(".gray-table"),e=m.find(".lca-listing-table"),o=m.find(".lca-listing-empty-message"),d=m.find(".lca-listing-disclaimer"),h=m.find(".preloader");
if(!l){return
}$.ajax({url:f,data:{lcaPath:l},cache:false,beforeSend:function(){i.hide();
o.hide();
h.addClass("preloader-blue")
},success:k,error:function(){console.error("During the search, a server error occurred.");
i.show()
},complete:function(){h.remove()
}});
function k(q){if(q.length===0){o.show();
c.hide();
d.hide();
return
}a.append(n,{items:q},e);
e.tablesorter({sortRestart:true,sortList:[[j,g]],headers:{7:{sorter:false}}})
}}b.moduleName="LCA Listing 2023";
b.selector=".lca-listing-ui-23";
return b
});
define("JobSearch23",["RecruitingSearch23","analytics","utils-share","constants","media","jquery-plugins"],function(l,g,j,k,b){var a=$(window);
var d=$("body");
var c=$.extend({},l.prototype.classes,{multiselect:".js-multi-select",searchSelect:".recruiting-search__select",searchCheckbox:".recruiting-search__checkbox",initializedMultiSelect:".multi-select-filter",departments:"job-search__departments",resultItem:".search-result__item",shareButton:"button.search-result__share-button-23",referLink:'[data-gtm-category="referral-link"]',shareOpened:"search-result__share--opened",socialLink:".search-result__social-link",submitButton:".recruiting-search__submit",header:".header-ui",preserveHeader:"job-search-preserve-header",keywordLabel:".recruiting-search__keyword-label",wrapperMobile:".recruiting-search__wrapper-mobile",filterButton:".recruiting-search__filter-button",filterButtonClose:"recruiting-search__filter-button-close",fakePinnedInput:"recruiting-search__fake-input",searchInput:"recruiting-search__input-23:not(.recruiting-search__fake-input)",jobSearchOpenButton:".recruiting-search__job-search",pinnedPanelCloseButton:".recruiting-search__close-button",tabsComponent:".tabs-ui-23"});
var f={experience:'[name="experience"]',relocation:'[name="relocation"]',remote:'[name="remote"]',office:'[name="office"]'};
function h(m){return function(n){return m[n]
}
}function e(n,m){n[m]={type:m,title:CQ.I18n.getMessage("component.general.social-icon.icon-"+m)};
return n
}function i(m){l.call(this,m);
this.$departmentsSelect=$('select[name="department"]');
this.$jobSearchDepartments=m.find(".job-search__departments");
this.$isShouldUpdate=true;
var n=this.$el.data("socialIcons");
if(!n){return
}this.titles=["fb","tw","li","vk"].reduce(e,{});
this.socialIcons=this.getSocialIconsFromData(this.$el.data("socialIcons")).map(h(this.titles));
this.$fetchOptions={beforeSend:function(){this.$departmentsSelect.trigger(k.Events.multiSelectBeforeUpdate)
}.bind(this),successCallback:function(p){try{var o=JSON.parse(p);
this.handleSuccessSkillsFetch(o)
}catch(q){console.warn(q)
}}.bind(this)};
this.$jobSearchDepartments.on("dropdown:open",function(){if(this.$isShouldUpdate){this.$fetchOptions.url=this.createSkillsFetchRequest();
this.fetch(this.$fetchOptions)
}}.bind(this));
this.firstDepartmentUpdate()
}i.prototype=Object.create(l.prototype);
i.prototype.init=function(){var o=this.$el.hasClass("dark-style");
this.$isApplyOverlay=this.$el.hasClass("apply-overlay");
this.$mobileWrapper=this.$el.find(c.wrapperMobile);
this.$pinnedPanelCloseButton=this.$el.find(c.pinnedPanelCloseButton);
if(o){var m=this.$el.find(c.jobSearchOpenButton);
m.on("click",this.toggleShowForm.bind(this))
}this.$filterButton=this.$el.find(c.filterButton);
this.$fakeSearchInput=this.$el.find("."+c.fakePinnedInput);
this.$realSearchInput=this.$el.find("."+c.searchInput);
this.$filterButton.removeClass(c.filterButtonClose);
this.$filterButton.on("click",this.toggleShowForm.bind(this));
this.$pinnedPanelCloseButton.on("click",this.toggleShowForm.bind(this));
this.$form.on("submit",function(){if(this.$form.hasClass("show")){this.$form.toggleClass("show");
this.$filterButton.toggleClass(c.filterButtonClose)
}}.bind(this));
this.$el.attr("data-location",this.getCountry());
this.$isPinned=this.$el.data("is-pinned");
this.$multiSelect=this.$el.find(c.multiselect);
this.$searchFilters=this.$form.find(c.searchFilter);
this.$checkbox=this.$searchFilters.find(c.checkbox);
this.$header=d.find(c.header);
this.$searchCheckbox=this.$el.find(c.searchCheckbox);
if(this.$multiSelect.length){this.$multiSelect.multiSelectFilter({showTags:true,className:c.departments});
this.$multiSelectEl=this.$el.find(c.initializedMultiSelect)
}this.$location.on("select2:open",function(){this.$multiSelectEl.trigger("dropdown:close")
}.bind(this));
this.$location.on("select2:select",function(){this.setDataLocation();
this.$isShouldUpdate=true
}.bind(this));
this.$results.on("click",c.shareButton,this.toggleShare.bind(this));
this.$results.on("click",c.referLink,this.pushGtmEvent);
var n=this.$realSearchInput.val()||this.$fakeSearchInput.val();
this.$realSearchInput.val(n);
this.$fakeSearchInput.val(n);
this.$fakeSearchInput.on("input keydown",this.fakeSearchInputChangeHandler.bind(this));
this.$realSearchInput.on("input keydown",this.searchInputChangeHandler.bind(this));
this.$fakeSearchInput.keypress(this.fakeSearchInputKeypressHandler.bind(this));
this.$searchCheckbox.on("change",this.handlerCheckBoxSelect.bind(this));
this.getPanelTopOffset=this.getTopOffset.bind(this);
this.trackTabsActivity();
if(this.$isPinned){this.$searchSelect=this.$el.find(c.searchSelect);
this.$submitButton=this.$el.find(c.submitButton);
this.$el.pinFilterTop(true,{value:65,getSpacerHeight:function(){if(b.currentMode().lessThan(b.modes.Desktop)){return 480
}return 250
},getPanelTopOffset:this.getPanelTopOffset});
this.$multiSelect.on("change",this.scrollToTop.bind(this));
this.$searchSelect.on("change",this.scrollToTop.bind(this));
this.$searchCheckbox.on("change",this.scrollToTop.bind(this));
this.$submitButton.on("click",this.scrollToTop.bind(this));
this.$header.addClass(c.preserveHeader);
$(window).trigger("scroll");
this.$form.on(k.Events.autocompleteSelected,this.autoCompleteSelectWasSelected.bind(this))
}};
i.prototype.trackTabsActivity=function(){var m=this.$el.parents(c.tabsComponent);
if(m.length>0){this.isVisible();
this.getPanelTopOffset=this.getTopOffsetTabs.bind(this);
m.on(k.Events.tabChange,function(){this.isVisible()
}.bind(this))
}};
i.prototype.isVisible=function(){this._isActiveTab=this.$el.parents(".active").length>0
};
i.prototype.getTopOffset=function(){return this.$isApplyOverlay?this.$el.offset().top-200:this.$el.offset().top
};
i.prototype.getTopOffsetTabs=function(){return this._isActiveTab?this.getTopOffset():-1
};
i.prototype.toggleShowForm=function(){this.$form.toggleClass("show");
this.$mobileWrapper.toggleClass("expanded");
this.$filterButton.toggleClass(c.filterButtonClose)
};
i.prototype.firstDepartmentUpdate=function(){this.$departments=null;
var o=window.location.search;
var m=new URLSearchParams(o);
this.$departments=m.getAll("department");
if(this.$departments.length>0){var n={url:this.createSkillsFetchRequest(),successCallback:function(p){try{this.handleFirstSuccessSkillsFetch(JSON.parse(p))
}catch(q){console.warn(q)
}}.bind(this)};
this.fetch(n)
}};
i.prototype.handlerCheckBoxSelect=function(){this.$isShouldUpdate=true
};
i.prototype.autoCompleteSelectWasSelected=function(m,n){if(n.initialInput==="fake"){this.fakeSearchInputChangeHandler()
}else{this.searchInputChangeHandler()
}};
i.prototype.fakeSearchInputChangeHandler=function(){this.$realSearchInput.val(this.$fakeSearchInput.val());
this.$isShouldUpdate=true
};
i.prototype.searchInputChangeHandler=function(){this.$fakeSearchInput.val(this.$realSearchInput.val());
this.$isShouldUpdate=true
};
i.prototype.fakeSearchInputKeypressHandler=function(m){if(m.keyCode===13){this.$submitButton.trigger("click")
}};
i.prototype.scrollToTop=function(){if(b.currentMode().greaterThan(b.modes.Tablet)){this.scrollResultsToTop()
}};
i.prototype.getSocialIconsFromData=function(m){return m&&m.split(",")
};
i.prototype.beforeLoadResults=function(){this.$multiSelect.on("change",this.updateUrlAndLoadResultsDebounced);
this.$checkbox.on("change",this.updateUrlAndLoadResultsDebounced);
this.$results.on("click",c.socialLink,this.openPopup.bind(this))
};
i.prototype.collectSearchParameters=function(n){var m={query:this.$autocomplete.val(),country:this.getCountry(),city:this.getCity(),sort:this.getSorting(),department:this.$multiSelect.val()||[],experience:this.getExperience(),relocation:this.isRelocation(),remote:this.isRemote(),office:this.isOffice(),offset:n||0,searchType:this.$el.data("searchtype")||""};
return $.extend({},this.defaultSearchParameters,m)
};
i.prototype.getExperience=function(){return this.$checkbox.filter(f.experience+":checked").map(function(){return $(this).val()
}).get()
};
i.prototype.isRelocation=function(){return this.$checkbox.filter(f.relocation+":checked").val()
};
i.prototype.isRemote=function(){return this.$checkbox.filter(f.remote+":checked").val()
};
i.prototype.isOffice=function(){return this.$checkbox.filter(f.office+":checked").val()
};
i.prototype.getSubmitContext=function(){return{query:this.$autocomplete.val(),country:this.getCountry(),city:this.getCity(),department:this.$multiSelect.val(),relocation:this.isRelocation(),office:this.isOffice(),remote:this.isRemote()}
};
i.prototype.getResultsContext=function(m){return{list:m,spritePath:EPAM.spritePath,socialIcons:this.socialIcons,gtmLabel:this.$el.data("referGtmLabel"),showFooter:true}
};
i.prototype.getResultMessageWithQuery=function(o,n){var m='"'+o+'"';
return n===1?CQ.I18n.getMessage("component.job-search.result_header.one_result",[m]):CQ.I18n.getMessage("component.job-search.result_header",[m,n])
};
i.prototype.getResultMessage=function(m){const n="<span>for</span>";
return m===1?CQ.I18n.getMessage("component.redesign23.job-search.result_header.no_query.one_result",[n]):CQ.I18n.getMessage("component.redesign23.job-search.result_header.no_query",[n,m])
};
i.prototype.getApplyButtonText=function(){const m=window.matchMedia("(max-width: 991px)").matches;
return m?CQ.I18n.getMessage("component.job-search-23.apply"):CQ.I18n.getMessage("component.job-search.apply")
};
i.prototype.toggleShare=function(n){var o=$(n.currentTarget),m=o.closest(c.resultItem);
function p(q){return function(){q.removeClass(c.shareOpened)
}
}m.addClass(c.shareOpened);
setTimeout(function(){m.find(c.socialLink).first().focus()
});
a.one("click",function(){a.one("click",p(m))
})
};
i.prototype.pushGtmEvent=function(m){var n=$(m.currentTarget);
var o=g.getEvent(n);
g.push(o)
};
i.prototype.openPopup=function(n){var m=j.getLink($(n.currentTarget).data());
j.openPopup(m);
return false
};
i.prototype.setDataLocation=function(){var m=this.getCountry();
this.$el.attr("data-location",m?m:"")
};
i.prototype.scrollResultsToTop=function(){if(d.hasClass(k.Classes.pinnedFilter)){this.$el.scrollToSelector({duration:500,reservedSpace:400})
}};
i.prototype.fetch=function(m){$.ajax(m.url,{beforeSend:m.beforeSend,success:m.successCallback,error:function(o,p,n){this.$departmentsSelect.trigger(k.Events.multiSelectErrorUpdate);
console.warn(n)
}})
};
i.prototype.handleSuccessSkillsFetch=function(m){this.$isShouldUpdate=false;
var n=[];
for(var o=0;
o<m.length;
o++){n.push(new Option(m[o],m[o],false,false))
}this.$departmentsSelect.empty();
this.$departmentsSelect.append(n);
this.$departmentsSelect.trigger(k.Events.multiSelectUpdate)
};
i.prototype.handleFirstSuccessSkillsFetch=function(m){this.$isShouldUpdate=false;
var o=[];
for(var p=0;
p<m.length;
p++){var n=this.$departments.includes(m[p]);
o.push(new Option(m[p],m[p],n,n))
}this.$departmentsSelect.empty();
this.$departmentsSelect.append(o);
this.$departmentsSelect.trigger(k.Events.multiSelectFirstUpdate);
this.$form.trigger("submit")
};
i.prototype.createSkillsFetchRequest=function(){var m=this.collectSearchParameters();
delete m.department;
return this.toUrl("/services/department/search",m)
};
i.prototype.config={autocompletePath:"/services/search/smart-search.vacancy.json",searchUrl:"/services/vacancy/search"};
i.moduleName="Job Search 23";
i.selector=".job-search-ui-23";
return i
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
define("GeneralVacancyBlock23",["constants"],function(d){var a=$("html");
var c={vacancyForm:".general-vacancy-form-holder"};
function b(e){this.$vacancyForm=e.find(c.vacancyForm);
a.on(d.Events.showVacancyForm,this.showVacancyForm.bind(this));
$(document).ready(this.resizeVideos)
}b.prototype.showVacancyForm=function(){this.$vacancyForm.removeClass(d.Classes.hidden)
};
b.prototype.resizeVideos=function(){var e=$(document).find(".vacancy_content iframe");
e.each(function(){var i=$(this).attr("width");
var f=$(this).width();
if(f<i){var h=$(this).attr("height");
var g=i/h;
$(this).height(f/g)
}})
};
b.moduleName="General Vacancy Block 23";
b.selector=".general-vacancy-block-ui-23";
return b
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
define("EventsViewer23",["utils-dust","utils-env","animations"],function(e,d,f){function c(g){this.$el=g;
this.$eventsViewer=this.$el.parent("."+this.classes.eventsViewer);
this.$tabsContainer=this.$eventsViewer.parent("."+this.classes.tabsItem).parent("."+this.classes.tabsComp);
this.$list=this.$el.find("."+this.classes.list);
this.$viewMore=this.$el.find("."+this.classes.viewMore);
this.$errorMessage=this.$el.find("."+this.classes.ajaxError);
this.path=this.$el.data("path");
this.isAuthor=d.isAuthor();
this.category=this.$el.data("category");
this.language=CQ.I18n.getLocale();
this.dateFormat=this.$el.data("dateFormat");
$(window).on("load",function(){this.getEvents();
this.init()
}.bind(this))
}c.prototype.init=function(){this.$el.on("mouseover",".link-with-bottom-arrow",this.hoverIn.bind(this));
this.$el.on("mouseout",".link-with-bottom-arrow",this.hoverOut.bind(this));
this.$viewMore.on("click",this.getEvents.bind(this));
if(this.$tabsContainer.length){this.$tabsContainer.find("."+this.classes.tabsLink).each(function(g,h){if(!$(h).hasClass(this.classes.active)){$(h).on("click focus",this.animateActiveElements.bind(this))
}}.bind(this))
}this.putCorrectAriaLabelForEventList.bind(this)()
};
c.prototype.animateActiveElements=function(){if(d.isEditMode()){var g=this.$list.find("."+this.classes.item+":not(."+this.classes.animated+")");
f.disableAnimationInEditMode(g.get(),this.classes.animated);
f.disableAnimationInEditMode(this.$viewMore.get(),this.classes.animated);
return
}setTimeout(function(){var j=this.$tabsContainer.find("."+this.classes.tabsItem+"."+this.classes.active);
var i=j.find("."+this.classes.item+":not(."+this.classes.animated+")");
var h=j.find("."+this.classes.viewMore+":not(."+this.classes.animated+")");
if(h.length){f.addAppearanceAnimation(h.get(),this.classes.animated)
}if(i.length){f.addAppearanceAnimation(i.get(),this.classes.animated)
}else{if(!j.length){var k=this.$list.find("."+this.classes.item+":not(."+this.classes.animated+")");
if(k.length){f.addAppearanceAnimation(k.get(),this.classes.animated);
f.addAppearanceAnimation(this.$viewMore.get(),this.classes.animated)
}}}}.bind(this))
};
c.prototype.hoverIn=function(g){var h=$(g.target).parents(".events-viewer23__item");
h.length>0&&h.addClass("hover")
};
c.prototype.hoverOut=function(){var g=$(event.target).parents(".events-viewer23__item");
g.length>0&&g.removeClass("hover")
};
c.prototype.getEvents=function(){var h=this.$list.children().length,g={method:"GET",url:this.config.eventUrl,data:{path:this.path,category:this.category,language:this.language,limit:this.constants.LIMIT,offset:h,dateFormat:this.dateFormat,buildSchemaOrgMarkup:h===0},success:this.renderEvents.bind(this),error:this.showErrorMessage.bind(this)};
$.ajax(g)
};
var a,b=false;
c.prototype.fillEventsListMarkup=function(h){if(a!==null&&a!==undefined){for(var g=0;
g<h.itemListElement.length;
g++){h.itemListElement[g].position=a.itemListElement.length+g+1
}a.itemListElement=Object.values(a.itemListElement).concat(Object.values(h.itemListElement))
}else{a=h
}};
c.prototype.renderEvents=function(h){var g=h.schemaOrgMarkup;
if(b){if(g){this.fillEventsListMarkup(g)
}if(a!==null&&a!==undefined){this.addSchemaOrgMarkup(a)
}}else{a=g
}b=true;
var i=this.$list.children().length;
e.append("events-viewer23-items",{content:h.result,isAuthor:this.isAuthor,category:this.category},this.$list);
this.animateActiveElements.bind(this)();
var j=this.$el.find("."+this.classes.item);
if(!(j.length<=this.constants.LIMIT)){this.focusOnFirstNewItem.bind(this)(i)
}if(i+h.result.length>=h.total){return this.$viewMore.addClass(this.classes.buttonDisabled)
}};
c.prototype.addSchemaOrgMarkup=function(g){this.$el.prepend('<script type="application/ld+json">'+JSON.stringify(g)+"<\/script>")
};
c.prototype.showErrorMessage=function(){var g=this.classes.active;
this.$errorMessage.addClass(g)
};
c.prototype.putCorrectAriaLabelForEventList=function(){var j=this.$tabsContainer.find("."+this.classes.tabsLink);
var h=2;
if(j.length!==h){return
}var m=j.first().text();
var l=j.eq(1).text();
var k=this.$tabsContainer.find("."+this.classes.list);
if(k.length===h){var g=k.first();
var i=k.eq(1);
g.attr("aria-label",m);
i.attr("aria-label",l)
}};
c.prototype.centerElementInView=function(h){var k=$(window).height();
var g=$(h).offset().top;
var i=$(h).outerHeight();
var j=g-k/2+i/2;
$(window).scrollTop(j)
};
c.prototype.focusOnFirstNewItem=function(g){var h=this.$list.children().eq(g).find("."+this.classes.itemLink);
h.focus();
this.centerElementInView(h)
};
c.prototype.classes={eventsViewer:"events-viewer",list:"events-viewer23__list",ajaxError:"events-viewer23__ajax-error-message",buttonDisabled:"hidden",viewMore:"events-viewer23__view-more",active:"active",item:"events-viewer23__item",itemLink:"events-viewer23__title-link",animated:"animated",tabsComp:"tabs-ui-23",tabsItem:"tabs-23__item",tabsLink:"tabs-23__link"};
c.prototype.config={eventUrl:"/services/search/events/viewer"};
c.prototype.constants={LIMIT:12};
c.moduleName="Events Viewer 2023";
c.selector=".events-viewer-ui-23";
return c
});
define("ContactDetailsReference23",["utils","gradients"],function(b,a){function c(e){b.addExtensionToPhoneNumber(e);
var g=0.5;
var h=1.4;
var d=document.querySelectorAll(".contact-details-reference__name");
var f=new a.GradientText();
f.init(d,{rightRatio:g,middleRatio:h})
}c.moduleName="Contact Details Reference 2023";
c.selector=".contact-details-reference-ui-23";
return c
});
define("BackgroundVideo23",["utils","media"],function(a,d){var f=$(window),e=52;
var c={container:".background-video__container",showMobileImage:"background-video--show-mobile-image",fullSizeVideo:"background-video--match-size-of-video",contentPointer:"background-video__content-pointer",soundIcon:"background-video__sound-icon",enableSound:"background-video__hasSound",showArrow:"background-video__show-arrow"};
function b(g){this.$el=g;
this.$parent=this.$el.parent(".background-video");
this.$parent.addClass("background-video--relative");
this.$player=this.$el.find(c.container)[0];
this.$contentPointer=this.$parent.find("."+c.contentPointer);
this.$soundIcon=this.$parent.find("."+c.soundIcon);
this.$isShowArrow=this.$el.hasClass(c.showArrow);
this.$playSound=this.$el.hasClass(c.enableSound);
$(document).ready(this.documentReadyCallback.bind(this));
f.on("scroll",a.debounce(this.scrollCallback.bind(this),3));
f.on("resize",a.debounce(this.resizeCallback.bind(this),100));
this.$contentPointer.on("click",this.scrollToContent.bind(this));
this.$soundIcon.on("click",this.toggleMute.bind(this))
}b.prototype.getVideoRect=function(){return{bottomY:this.$el[0].getBoundingClientRect().bottom+window.pageYOffset}
};
b.prototype.scrollToContent=function(){$("html, body").animate({scrollTop:this.getVideoRect().bottomY-e},800)
};
b.prototype.callbackFunctions=function(){this.playPauseVideo();
if(this.$isShowArrow){this.isShowAdditionalIcons()
}};
b.prototype.documentReadyCallback=function(){this.callbackFunctions();
if(!this.$isShowArrow){this.$contentPointer.addClass("hidden")
}};
b.prototype.scrollCallback=function(){this.callbackFunctions()
};
b.prototype.resizeCallback=function(){this.callbackFunctions()
};
b.prototype.isShowAdditionalIcons=function(){if(!this.$el.hasClass(c.fullSizeVideo)){return
}var g=window.innerHeight+window.pageYOffset;
if(this.getVideoRect().bottomY>g&&this.$el.hasClass(c.fullSizeVideo)&&d.currentMode().greaterThan(d.modes.Tablet)){this.$contentPointer.removeClass("hidden");
this.$soundIcon.addClass("background-video--icon-fixed");
return
}this.$contentPointer.addClass("hidden");
this.$soundIcon.removeClass("background-video--icon-fixed")
};
b.prototype.toggleMute=function(){if(this.$player.muted){this.$soundIcon.addClass("background-video--sound-enabled");
this.$player.muted=false
}else{this.$player.muted=true;
this.$soundIcon.removeClass("background-video--sound-enabled")
}};
b.prototype.isOnScreen=function(){var j=f.scrollTop(),h=j+f.height(),g=this.$el.offset().top,i=g+this.$el.outerHeight()/2;
return !(j+e>i||i>h)
};
b.prototype.playPauseVideo=function(){var g=this.$el.hasClass(c.showMobileImage)&&d.currentMode().lessThan(d.modes.Tablet);
if(!g&&this.isOnScreen()){this.$player.play();
return
}this.$player.pause()
};
b.selector=".background-video-ui-23";
b.moduleName="Background Video 23";
return b
});
define("AnywhereVacancyBlock23",["utils","utm-utils"],function(a,d){var c={button:".anywhere-vacancy-block__button",link:".anywhere-vacancy-block__link"};
function b(e){this.el=e;
this.$button=e.find(c.button);
this.$link=e.find(c.link);
this.initRTEGradients=function(){a.initRTEGradients(this.el)
}.bind(this);
window.addEventListener("load",this.initRTEGradients);
window.addEventListener("resize",a.debounceExtend(this.initRTEGradients,300));
this.handleButtonClick();
this.handleLinkClick()
}b.prototype.handleButtonClick=function(){var e=d.buildAnywhereUrl(this.$button.data("href"));
this.$button.attr("href",e)
};
b.prototype.handleLinkClick=function(){var f=this.$link.data("href");
if(f!==undefined&&f.indexOf("anywhere")>=0){var e=d.buildAnywhereUrl(f);
this.$link.attr("href",e)
}};
b.moduleName="Anywhere Vacancy Block 23";
b.selector=".anywhere-vacancy-block-ui-23";
return b
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
define("Accordion23",["utils","utils-env"],function(a,e){function b(f){this.$el=f;
this.$accordionButton=f.find(c.accordionButton);
this.$accordionTitle=f.find(c.accordionTitle);
this.$accordionButtonRead=f.find(c.accordionButtonRead);
this.$accordionBackgroundPanel=f.find(c.accordionBackgroundPanel);
this.$accordionPasys=f.find(c.accordionPasys);
this.$responsiveImages=this.$el.find(c.responsiveImage);
this.$accordionReadLess=f.find(c.accordionReadLess);
this.$accordionArrow=f.find(c.accordionArrow);
this.$accordionPreview=f.find(c.accordionPreview);
this.initRTEGradients=function(){a.initRTEGradients(this.$el)
}.bind(this);
window.addEventListener("load",this.initRTEGradients);
window.addEventListener("resize",a.debounceExtend(this.initRTEGradients,300));
this.init();
var g=function(h){return function(i){if(i.children[0]){if(i.children[0].children[0]){return i.children[0].children[0]===h.context
}}return null
}
};
this.$sections=Array.prototype.slice.call(document.querySelectorAll(".section__wrapper",0));
this.$accordeonWrapper=this.$sections.filter(g(this.$el));
this.$accordeonWrapper.forEach(function(h){h.classList.add("accordion-margin")
});
if(e.isEditMode()){this.$accordionPasys.removeClass(c.hidden)
}}b.prototype.init=function(){this.$accordionReadLess.text(d.readLess);
this.$accordionBackgroundPanel.click(this.toggleContent.bind(this,false));
this.$accordionButtonRead.click(this.toggleContent.bind(this,true));
var f=this.$accordionButton.attr(d.showInExpandedView);
if(this.$accordionPreview.text()){this.$accordionPreview.removeClass(c.hidden)
}if(f==="true"){this.$accordionPasys.removeClass(c.hidden);
this.$accordionReadLess.removeClass(c.hidden);
this.$accordionArrow.removeClass(c.hidden);
this.$accordionButton.removeClass(c.accordionButtonOpen);
this.$accordionTitle.removeClass(c.accordionTitleOpen);
this.$responsiveImages.trigger(d.renderImage);
this.$accordionBackgroundPanel.attr("aria-label",d.expanded)
}};
b.prototype.toggleContent=function(f){this.$responsiveImages=this.$el.find(c.responsiveImage);
var g=this.$el.offset().top;
if(this.$accordionPasys.hasClass(c.hidden)){this.$accordionPasys.removeClass(c.hidden);
this.$accordionButton.removeClass(c.accordionButtonOpen);
this.$accordionTitle.removeClass(c.accordionTitleOpen);
this.$accordionReadLess.removeClass(c.hidden);
this.$accordionArrow.removeClass(c.hidden);
this.$responsiveImages.trigger(d.renderImage);
this.$accordionBackgroundPanel.attr("aria-expanded",true);
this.$accordionBackgroundPanel.attr("aria-label",d.expanded)
}else{this.$accordionPasys.addClass(c.hidden);
this.$accordionButton.addClass(c.accordionButtonOpen);
this.$accordionTitle.addClass(c.accordionTitleOpen);
this.$accordionReadLess.addClass(c.hidden);
this.$accordionArrow.addClass(c.hidden);
this.$accordionBackgroundPanel.attr("aria-expanded",false);
this.$accordionBackgroundPanel.attr("aria-label",d.collapsed);
if(f&&$(window).width()<=d.mobileDevice){$(window).scrollTop(g-83)
}else{if(f){$(window).scrollTop(g-95)
}}}};
var d={readLess:Granite.I18n.get("component.accordion.read_less"),showInExpandedView:"showInExpandedView",renderImage:"renderImage",collapsed:"collapsed",expanded:"expanded",mobileDevice:991};
var c={accordionBackgroundPanel:".accordion-23__background-panel",accordionButton:".accordion-23__button",accordionTitle:".accordion-23__title",accordionButtonRead:".accordion-23__button-read",accordionPasys:".accordion-23__parsys",responsiveImage:".responsive-image-ui",accordionButtonOpen:"accordion-23__button-open",accordionTitleOpen:"accordion-23__title-open",accordionReadLess:".accordion-23__read-less",accordionArrow:".accordion-23__arrow",accordionPreview:".accordion-23__preview-description",hidden:"hidden"};
b.moduleName="Accordion-23";
b.selector=".accordion-ui-23";
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
function _defineProperty(c,a,b){if(a in c){Object.defineProperty(c,a,{value:b,enumerable:true,configurable:true,writable:true})
}else{c[a]=b
}return c
}function _toConsumableArray(a){if(Array.isArray(a)){for(var c=0,b=Array(a.length);
c<a.length;
c++){b[c]=a[c]
}return b
}else{return Array.from(a)
}}function _classCallCheck(a,b){if(!(a instanceof b)){throw new TypeError("Cannot call a class as a function")
}}define("Animation23",["utils"],function(a){var d={ANIMATION_IMAGE_CONTAINER:"animation__image-container"};
var c=100;
var b=function(){function h(l){_classCallCheck(this,h);
this.$el=l[0];
this.$imageContainer=this.$el.querySelector("."+d.ANIMATION_IMAGE_CONTAINER);
this.imageName=l.attr("data-image-name");
this.isActive=true;
this.isEditMode=l.is("[is-edit-mode]");
this.delayAnimation=this.loadAnimationPicture();
this.init();
this.initEvents()
}_createClass(h,[{key:"init",value:function j(){this.onScrollChange()
}},{key:"initEvents",value:function g(){window.addEventListener("scroll",a.debounce(this.onScrollChange.bind(this),300));
this.delayAnimation.addEventListener("data_ready",this.onAnimationLoaded.bind(this))
}},{key:"onScrollChange",value:function k(){if(this.isActive&&this.isOnScreen(c)){this.delayAnimation.play();
this.isActive=false
}}},{key:"isOnScreen",value:function f(n){var m=window.innerHeight*(n/100)+window.scrollY;
var o=window.scrollY+this.$imageContainer.getBoundingClientRect().top;
var l=o+this.$imageContainer.offsetHeight/2;
return l<=m
}},{key:"loadAnimationPicture",value:function e(){return bodymovin.loadAnimation({container:this.$imageContainer,renderer:"svg",loop:false,autoplay:false,path:"/etc/designs/epam-com/json-animations/"+this.imageName+".json",rendererSettings:{className:"animation__svg",viewBoxOnly:true}})
}},{key:"onAnimationLoaded",value:function i(){if(this.isEditMode){this.delayAnimation.goToAndPlay(this.delayAnimation.totalFrames,true);
this.isActive=false
}}}]);
return h
}();
b.moduleName="Animation23";
b.selector=".animation-ui-23";
return b
});
define("CategoriesSwitcher23",["require","utils","utils-env"],function(d,b,e){var h={TILE:"categories-switcher__tile-title",LEFT_SECTION:"categories-switcher-left-part",RIGHT_SECTION:"categories-switcher-right-part",ACTIVE:"active",ACTIVE_TILE:".categories-switcher__tile-title.active",ACTIVE_CONTENT:".categories-switcher__content-item.active",ACTIVE_CONTENT_MOB:".categories-switcher__content-item-mob.active",CONTENT_ITEM:"categories-switcher__content-item",CONTENT_ITEM_MOBILE:"categories-switcher__content-item-mob",HIDE:"hidden",RESPONSIVE_IMAGE:"responsive-image-ui",TITLES_SECTION:"categories-switcher-tiles-section",WITH_IMAGE:"withImage",IMAGE_PLACEHOLDER:"imager-placeholder"};
var g={RESPONSIVE_HEADER_HEIGHT:52,RESPONSIVE_TOP_INDENT:20};
var a={nextSlide:"cat.switcher.next",prevSlide:"cat.switcher.prev"};
var f=[];
var c=function(){function s(E){_classCallCheck(this,s);
this.$el=E;
this.$modernEl=E[0];
this.$tiles=$("."+h.TILE,this.$modernEl);
this.$items=$("."+h.CONTENT_ITEM,this.$modernEl);
this.$itemsMobile=$("."+h.CONTENT_ITEM_MOBILE,this.$modernEl);
this.$tilesSection=this.$modernEl.querySelector("."+h.TITLES_SECTION);
this.itemsLength=this.$items.length;
this.withImage=E.hasClass(h.WITH_IMAGE);
this.init();
f.push(this)
}_createClass(s,[{key:"init",value:function B(){var E=this;
if(e.isEditMode()){this.editModeEvents();
return
}this.resizeEventHandler(this);
this.initDefaultSwitcherView();
this.addEventHandler();
this.setTitleIndex();
this.initEvents();
if(this.withImage){document.onreadystatechange=function(){if(document.readyState==="complete"){E.preLoadImages()
}}
}}},{key:"setTitleIndex",value:function z(){$.each(this.$tiles,function(E,F){F.setAttribute("item-index",E)
})
}},{key:"nextSlide",value:function m(){var F=this.$items.index(this.getActiveSlide());
var E=F<this.itemsLength-1?F+1:0;
this.switchSlide(this.$items[E])
}},{key:"prevSlide",value:function j(){var F=this.$items.index(this.getActiveSlide());
var E=F>0?F-1:this.itemsLength-1;
this.switchSlide(this.$items[E])
}},{key:"switchSlide",value:function p(E){this.reset();
E.classList.remove(h.HIDE);
E.classList.add(h.ACTIVE);
this.renderResponsiveImg(E)
}},{key:"getActiveSlide",value:function v(){return this.$modernEl.querySelector(h.ACTIVE_CONTENT)
}},{key:"getActiveTitle",value:function u(){return this.$modernEl.querySelector(h.ACTIVE_TILE)
}},{key:"reset",value:function C(){for(var E=0;
E<this.$tiles.length;
E++){this.$tiles[E].classList.remove(h.ACTIVE)
}for(var F=0;
F<this.itemsLength;
F++){this.$items[F].classList.remove(h.ACTIVE);
this.$items[F].classList.add(h.HIDE)
}if(this.$itemsMobile.length>0){for(var G=0;
G<this.itemsLength;
G++){this.$itemsMobile[G].classList.remove(h.ACTIVE);
this.$itemsMobile[G].style.maxHeight=null
}}}},{key:"initDefaultSwitcherView",value:function o(){this.reset();
if(this.device==="desktop"){this.$tiles[0].classList.add(h.ACTIVE);
this.$tiles[0].setAttribute("tabindex",0);
this.$items[0].classList.add(h.ACTIVE);
this.$items[0].classList.remove(h.HIDE)
}}},{key:"addEventHandler",value:function i(){var F=this;
var E=Array.prototype.slice.call(this.$tiles);
E.forEach(function(G){G.addEventListener("click",function(H){F.tileClickHandler(H.currentTarget,F)
})
})
}},{key:"mobileClickHandler",value:function y(F,E){var H=this.$modernEl.querySelector(h.ACTIVE_TILE);
if(!!H&&!H.isEqualNode(F)){this.reset()
}var G=F.nextElementSibling;
F.classList.toggle(h.ACTIVE);
G.classList.toggle("active");
E.activeTile=F;
E.activeContent=G;
if(G.style.maxHeight){G.style.maxHeight=null
}else{G.style.maxHeight=G.scrollHeight+"px"
}this.moveContentToTop(this)
}},{key:"moveContentToTop",value:function w(E){if(E.activeTile!==undefined&&E.activeTile.classList.contains(h.ACTIVE)){var F=document.body.getBoundingClientRect();
var G=E.activeContent.getBoundingClientRect();
$("html, body").animate({scrollTop:G.top-F.top-g.RESPONSIVE_HEADER_HEIGHT-g.RESPONSIVE_TOP_INDENT},500)
}}},{key:"desktopClickHandler",value:function n(F){this.reset();
var G=F.getAttribute("tile-id");
var E=this.$modernEl.querySelector('[content-id="'+G+'"]');
F.classList.add(h.ACTIVE);
E.classList.add(h.ACTIVE);
E.classList.remove(h.HIDE);
this.renderResponsiveImg(E)
}},{key:"renderResponsiveImg",value:function t(E){var F=E.querySelectorAll("."+h.RESPONSIVE_IMAGE);
if(F.length>0){$(window).trigger("resize")
}}},{key:"tileClickHandler",value:function r(F,E){if(this.device==="desktop"){this.desktopClickHandler(F,E)
}else{this.mobileClickHandler(F,E)
}}},{key:"resizeEventHandler",value:function l(){if(window.matchMedia("(min-width: 992px)").matches){this.device="desktop"
}else{this.device="mobile"
}}},{key:"getTitleItem",value:function k(E){if(E<0){return this.$tiles[this.itemsLength-1]
}if(E>this.itemsLength-1){return this.$tiles[0]
}return this.$tiles[E]
}},{key:"arrowClickHandler",value:function x(I){var G=this;
var E=function E(J,L){L.preventDefault();
G.$modernEl.querySelector('[tabindex="0"]').removeAttribute("tabindex");
var K=G.getTitleItem(J);
K.setAttribute("tabindex",0);
K.focus();
G.desktopClickHandler(K)
};
if(I.keyCode===36){E(0,I)
}if(I.keyCode===35){E(this.itemsLength-1,I)
}if(I.keyCode===38||I.keyCode===37){var F=this.getActiveTitle().getAttribute("item-index");
E(Number(F)-1,I)
}if(I.keyCode===40||I.keyCode===39){var H=this.getActiveTitle().getAttribute("item-index");
E(Number(H)+1,I)
}}},{key:"initEvents",value:function q(){var E=this;
window.addEventListener("resize",b.debounceExtend(function(){E.resizeEventHandler(E);
if(!E.currentDevice){E.currentDevice=E.device;
return
}if(E.currentDevice!==E.device){E.initDefaultSwitcherView();
E.currentDevice=E.device
}},300));
this.$tilesSection.addEventListener("keydown",this.arrowClickHandler.bind(this))
}},{key:"editModeEvents",value:function D(){var E=this;
this.switchSlide(this.$items[0]);
this.$el.on(a.prevSlide,function(){E.prevSlide()
});
this.$el.on(a.nextSlide,function(){E.nextSlide()
})
}},{key:"preLoadImages",value:function A(){var F=this.$el.find("."+h.RIGHT_SECTION);
var G=F.find("."+h.IMAGE_PLACEHOLDER).toArray();
if(!G.length){return
}var E=d("imager");
G.forEach(function(H){E.create($(H))
})
}}]);
return s
}();
c.moduleName="CategoriesSwitcher23";
c.activatedComponents=f;
c.events=a;
c.selector=".categories-switcher-ui-23";
return c
});
define("ClientLogicPopUp23",["utils","utils-env","ClientLogicPopUpService23"],function(b,e,a){var f={POP_UP_CONTENT:".pop-up__content",POP_UP_SUCCESS_REQUEST_MESSAGE:".pop-up__request-message-success",POP_UP_ERROR_REQUEST_MESSAGE:".pop-up__request-message-error",POP_UP_CLOSE_BUTTON:".pop-up__button-close",POP_UP_BACKDROP:".pop-up__backdrop",POP_UP_WRAPPER:".pop-up__wrapper",POP_UP_FORM:".pop-up__form",POP_UP_TRY_AGAIN_LINK:".pop-up__request-message-error__link",POP_UP_EMAIL_INPUT:".pop-up__email-input",POP_UP_HELP_SECTION:".pop-up__help",TEXT_FIELD_UI:".text-field-ui",VALIDATION_TOOLTIP:".validation-tooltip",VALIDATION_TEXT:".validation-text",SUBMIT_BUTTON:".custom-button",BUTTON_SUBMIT_LOADING_GIF:".spinner-button.custom-button",REMEMBER_ME:".remember-me .custom-checkbox-input",POP_UP_HELP_LINK:".pop-up__help-link",HAMBURGER_MENU_BUTTON:".hamburger-menu__button",POP_UP_HELP_LOADING_GIF:".pop-up__help-loading"};
var d="(max-width: 1129px)";
var c=function(){function s(A){_classCallCheck(this,s);
this._el=A[0];
this.$rememberMe=this._el.querySelector(f.REMEMBER_ME);
this.$popUpHelpLink=this._el.querySelector(f.POP_UP_HELP_LINK);
this.$popUpContent=this._el.querySelector(f.POP_UP_CONTENT);
this.$successMessage=this._el.querySelector(f.POP_UP_SUCCESS_REQUEST_MESSAGE);
this.$errorMessage=this._el.querySelector(f.POP_UP_ERROR_REQUEST_MESSAGE);
this.$popUpCloseButton=this._el.querySelector(f.POP_UP_CLOSE_BUTTON);
this.$popUpBackDrop=this._el.querySelector(f.POP_UP_BACKDROP);
this.$popUpWrapper=this._el.querySelector(f.POP_UP_WRAPPER);
this.$popUpForm=this._el.querySelector(f.POP_UP_FORM);
this.$popUpTryAgainLink=this._el.querySelector(f.POP_UP_TRY_AGAIN_LINK);
this.$popUpEmailInput=this._el.querySelector(f.POP_UP_EMAIL_INPUT);
this.$textFieldUI=this._el.querySelector(f.TEXT_FIELD_UI);
this.$popUpValidationTooltip=this._el.querySelector(f.VALIDATION_TOOLTIP);
this.$popUpValidationText=this._el.querySelector(f.VALIDATION_TEXT);
this.$popUpHelpSection=this._el.querySelector(f.POP_UP_HELP_SECTION);
this.$submitButton=this._el.querySelector(f.SUBMIT_BUTTON);
this.$buttonSubmitLoadingGifs=this._el.querySelectorAll(f.BUTTON_SUBMIT_LOADING_GIF);
this.$popUpHelpLoadingGif=this._el.querySelector(f.POP_UP_HELP_LOADING_GIF);
this.$hamburgerMenuButton=document.body.querySelector(f.HAMBURGER_MENU_BUTTON);
this.isAuthor=e.isAuthor();
this.setCurrentClientLoginButtonAndEvent();
this.initEvents();
new a(this)
}_createClass(s,[{key:"validateEmail",value:function u(A){var B=/^(?=.{1,65}$)[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+(\.[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
return B.test(A)
}},{key:"setCurrentClientLoginButtonAndEvent",value:function k(){var A=window.matchMedia(d).matches;
if(A){this.isAuthor?this.$clientLoginButtons=document.body.querySelectorAll('a[href="/content/infongen/en/client-login.html"]'):this.$clientLoginButtons=document.body.querySelectorAll('a[href="/client-login"]')
}else{this.isAuthor?this.$clientLoginButtons=document.body.querySelectorAll('a[href="/content/infongen/en/client-login.html"]'):this.$clientLoginButtons=document.body.querySelectorAll('a[href="/client-login"]')
}}},{key:"initEvents",value:function m(){var A=this;
this.$clientLoginButtons.forEach(function(B){B.addEventListener("click",A.openPopUp.bind(A))
});
window.addEventListener("resize",b.debounce(this.setCurrentClientLoginButtonAndEvent.bind(this),300));
this.$popUpCloseButton&&this.$popUpCloseButton.addEventListener("click",this.closePopUp.bind(this));
this.$popUpTryAgainLink&&this.$popUpTryAgainLink.addEventListener("click",this.resetPopUpWithNeedHelpSection.bind(this));
this.$popUpBackDrop&&this.$popUpBackDrop.addEventListener("mousedown",this.closePopUp.bind(this));
this.$popUpWrapper&&this.$popUpWrapper.addEventListener("mousedown",function(B){return B.stopPropagation()
});
this.$popUpEmailInput&&this.$popUpEmailInput.addEventListener("change",this.isEmailValid.bind(this))
}},{key:"isEmailValid",value:function r(){var B=this.$popUpEmailInput.value;
var A=this.validateEmail(B);
if(A){this.$textFieldUI.classList.remove("validation-field")
}else{this.$textFieldUI.classList.add("validation-field");
!B.length?this.$popUpValidationText.textContent="This is required field":this.$popUpValidationText.textContent="Incorrect email format";
this.$popUpEmailInput.focus()
}return A
}},{key:"resetPopUpWithNeedHelpSection",value:function t(A){var B=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;
if(A){A.preventDefault()
}this.$errorMessage.classList.remove("active");
this.$errorMessage.classList.add("hidden");
this.$successMessage.classList.remove("active");
this.$successMessage.classList.add("hidden");
this.$popUpContent.classList.remove("hidden");
this.$popUpContent.classList.add("active");
this._el.classList.remove("show-unknown-email-error");
if(B){this.showHelpSection()
}else{this.hideHelpSection()
}}},{key:"showHelpSection",value:function x(){this.$popUpHelpSection.classList.remove("hidden");
this.$popUpHelpSection.classList.add("active")
}},{key:"hideHelpSection",value:function g(){this.$popUpHelpSection.classList.add("hidden");
this.$popUpHelpSection.classList.remove("active")
}},{key:"closePopUp",value:function v(){this.$clientLoginButtons.forEach(function(A){A.classList.remove("active")
});
this._el.classList.add("hidden");
this._el.classList.remove("active");
this.resetPopUpWithNeedHelpSection(null,false);
this.hideSpinner()
}},{key:"closeHamburgerMenu",value:function o(){var A=document.querySelector("html").classList.contains("hamburger-menu--expanded");
A&&this.$hamburgerMenuButton.click()
}},{key:"remembermeProxy",value:function p(B,A){var C=this.getCookieByName("rememberme");
if(C==="true"){B&&B()
}else{A&&A()
}}},{key:"openPopUp",value:function w(B){var A=this;
B.preventDefault();
this.remembermeProxy(function(){A.$submitButton.click()
},function(){A.showPopupWindow()
})
}},{key:"showPopupWindow",value:function z(){this.closeHamburgerMenu();
this.$clientLoginButtons.forEach(function(A){A.classList.add("active")
});
this._el.classList.remove("hidden");
this._el.classList.add("active")
}},{key:"getCookieByName",value:function n(B){var A=document.cookie.match(new RegExp("(?:^|; )"+B.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)"));
return A?decodeURIComponent(A[1]):undefined
}},{key:"showSpinner",value:function j(){this.$submitButton.setAttribute("disabled",true);
this.$buttonSubmitLoadingGifs.forEach(function(A){A.classList.add("active")
})
}},{key:"hideSpinner",value:function l(){this.$submitButton.removeAttribute("disabled");
this.$buttonSubmitLoadingGifs.forEach(function(A){A.classList.remove("active")
})
}},{key:"showHelpSectionSpinner",value:function h(){this.$popUpHelpLoadingGif.classList.remove("hidden");
this.$popUpHelpLoadingGif.classList.add("active");
this.$popUpHelpLink.classList.remove("active");
this.$popUpHelpLink.classList.add("hidden")
}},{key:"hideHelpSectionSpinner",value:function i(){this.$popUpHelpLoadingGif.classList.add("hidden");
this.$popUpHelpLoadingGif.classList.remove("active");
this.$popUpHelpLink.classList.add("active");
this.$popUpHelpLink.classList.remove("hidden")
}},{key:"showMessage",value:function q(A){this.$popUpContent.classList.remove("active");
this.$popUpContent.classList.add("hidden");
this._el.classList.remove("show-unknown-email-error");
if(A==="error"){this.$errorMessage.classList.remove("hidden");
this.$errorMessage.classList.add("active")
}else{this.$successMessage.classList.remove("hidden");
this.$successMessage.classList.add("active")
}}},{key:"showUnknownEmailError",value:function y(){this._el.classList.add("show-unknown-email-error")
}}]);
return s
}();
c.moduleName="Client Login pop-up 2023";
c.selector=".client-logic-pop-up-ui-23";
return c
});
define("ClientLogicFetchService23",[],function(){var b=function b(d,c){if(!d.ok){c&&c();
throw Error(d.statusText)
}return d
};
var a=function a(f){var e=f.url,g=f.data,c=f.successCallback,d=f.errorCallback;
fetch(e,g).then(function(h){return b(h,d)
}).then(function(h){c(h)
})
};
return{sendRequest:a}
});
define("ClientLogicPopUpService23",["ClientLogicFetchService23"],function(d){var f={popup:".client-logic-pop-up-ui-23 script",recaptcha:".recaptcha-ui.g-recaptcha"};
var a={popupLoaded:"recaptcha.event.loaded",fetchSend:"fetched.send"};
var b={captchaValidation:"/services/recaptcha/validation",infongenContentPath:"/content/infongen/en",supportEmailUrl:"/services/notify/infongen-support-team?userEmail="};
var e={method:"GET",headers:{Referer:"https://www.infongen.com/"}};
var c=function(){function q(E){_classCallCheck(this,q);
this._popupComponent=E;
this.$recaptchaOnloadScript=document.querySelector(f.popup);
this.$isRecaptchaLaoded=false;
this.init()
}_createClass(q,[{key:"init",value:function y(){this.initEvents()
}},{key:"initEvents",value:function i(){var E=this;
this._popupComponent.$popUpForm.addEventListener("submit",function(F){return E.handlePopupFormSubmit(F)
});
this._popupComponent._el.addEventListener(a.popupLoaded,function(F){return E.handleRecaptchaScriptLoaded(F)
});
this._popupComponent.$popUpHelpLink.addEventListener("click",function(){return E.sendEmailToSupport()
})
}},{key:"handleRecaptchaScriptLoaded",value:function D(){this.renderRecaptchaForm();
grecaptcha.execute(this.$recaptchaId)
}},{key:"sendRecaptcha",value:function g(){this._popupComponent.showSpinner();
this.loadRecaptcha()
}},{key:"loadRecaptcha",value:function t(){if(!this.$isRecaptchaLaoded){this.createAndAddReCaptchaScript()
}else{grecaptcha.execute(this.$recaptchaId)
}}},{key:"handlePopupFormSubmit",value:function k(E){var F=this;
E.preventDefault();
this._popupComponent.remembermeProxy(function(){F.sendRecaptcha()
},function(){if(!F._popupComponent.isEmailValid()){return
}F.sendRecaptcha()
})
}},{key:"createAndAddReCaptchaScript",value:function w(){var E=document.createElement("script");
E.setAttribute("src","https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit");
E.defer=true;
E.async=true;
this._popupComponent._el.insertBefore(E,this.$recaptchaOnloadScript);
this.$isRecaptchaLaoded=true
}},{key:"renderRecaptchaForm",value:function m(){var E=document.querySelector("#popup-recaptcha-container").dataset.sitekey;
this.$recaptchaId=grecaptcha.render("popup-recaptcha-container",{sitekey:E,callback:this.recaptchaOnExecuteHandler.bind(this),size:"invisible"})
}},{key:"getPagePath",value:function B(){var E=/\.[^.]*$/;
var F=window.location.pathname.replace(E,"");
return F.includes(b.infongenContentPath)?F:b.infongenContentPath+F
}},{key:"recaptchaErrorCallback",value:function s(){grecaptcha.reset(this.$recaptchaId);
this.showErrorMessage();
this._popupComponent.hideSpinner();
this.saveToCookie("rememberme","false")
}},{key:"recaptchaOnExecuteHandler",value:function j(H){var G=this;
d.sendRequest({url:b.captchaValidation+"?currentPage="+this.getPagePath()+"&g-recaptcha-response="+H,body:{headers:{Accept:"application/json","Content-Type":"application/json"}},successCallback:function E(I){return G.handleRecaptchaSuccessfulResponse(I)
},errorCallback:function F(){return G.recaptchaErrorCallback()
}})
}},{key:"handleRecaptchaSuccessfulResponse",value:function h(E){var F=this;
E.json().then(function(G){if(G){F.sendEmailToInfongen()
}else{F.recaptchaErrorCallback()
}})
}},{key:"getUserEmail",value:function z(){var F=this;
var E=null;
this._popupComponent.remembermeProxy(function(){E=F._popupComponent.getCookieByName("client-login-user-email")
},function(){E=F._popupComponent.$popUpEmailInput.value
});
return this.escapeUserLogin(E)
}},{key:"sendEmailToInfongen",value:function u(){var H=this;
var F=document.querySelector(".client-logic-pop-up-ui-23").dataset.endPoint;
d.sendRequest({url:""+F+this.getUserEmail(),data:e,successCallback:function E(I){H.infongenFinalActions();
H.handleInfongenSuccessResponse(I)
},errorCallback:function G(){H.infongenFinalActions();
H.showErrorMessage();
H.saveToCookie("rememberme","false")
}})
}},{key:"handleInfongenSuccessResponse",value:function l(E){var F=this;
E.text().then(function(G){var H=G.length===0;
if(H){F._popupComponent.showPopupWindow();
F._popupComponent.resetPopUpWithNeedHelpSection();
F._popupComponent.showUnknownEmailError();
F.setPreviousEmail()
}else{if(F._popupComponent.$rememberMe.checked){F.saveToCookie("rememberme","true");
F.saveToCookie("client-login-user-email",F._popupComponent.$popUpEmailInput.value)
}window.location.href=G
}})
}},{key:"infongenFinalActions",value:function r(){this._popupComponent.hideSpinner();
grecaptcha.reset(this.$recaptchaId)
}},{key:"setPreviousEmail",value:function v(){var E=this;
this._popupComponent.remembermeProxy(function(){var F=E._popupComponent.getCookieByName("client-login-user-email");
E._popupComponent.$popUpEmailInput.value=F
})
}},{key:"saveToCookie",value:function C(E,F){if(F.trim().length!==0){document.cookie=E+"="+F
}}},{key:"escapeUserLogin",value:function x(E){return encodeURI(E)
}},{key:"showErrorMessage",value:function n(){this._popupComponent.showPopupWindow();
this._popupComponent.showMessage("error");
this.saveToCookie("rememberme","false")
}},{key:"showSuccessMessage",value:function p(){this._popupComponent.showPopupWindow();
this._popupComponent.showMessage();
this.saveToCookie("rememberme","false")
}},{key:"hidePopUpHelpAndSpinner",value:function A(){this._popupComponent.hideHelpSectionSpinner();
this._popupComponent.hideHelpSection()
}},{key:"sendEmailToSupport",value:function o(){var G=this;
if(!this._popupComponent.isEmailValid()){return
}this._popupComponent.showHelpSectionSpinner();
d.sendRequest({url:""+b.supportEmailUrl+this.getUserEmail(),data:e,successCallback:function E(){G.hidePopUpHelpAndSpinner();
G.showSuccessMessage()
},errorCallback:function F(){G.hidePopUpHelpAndSpinner();
G.showErrorMessage()
}})
}}]);
return q
}();
c.moduleName="Client Login pop-up 2023";
return c
});
define("ColumnControl23",["media","utils"],function(e,b){var f={COLUMN_CONTROL_COLUMN:"colctrl__col",TEXT_UI:"text-ui-23",COLUMN_CONTROL_HOLDER:"colctrl__holder",TWO_COLUMNS_FOR_RESPONSIVE:"colctrl--two-columns-for-responsive",HIDE_COLUMN_ON_RESPONSIVE:" colctrl__col--hide-on-responsive",RESPONSIVE_COLUMN:["colctrl__col","colctrl__col--width-50","colctrl__col--hide-on-desktop"],RESPONSIVE_COLUMN_PADDINGS:["colctrl__col--top-0","colctrl__col--right-0","colctrl__col--bottom-0","colctrl__col--left-0"]};
var c={LOGICAL_BLOCK_ELEMENTS_NUMBER:2,RESPONSIVE_COLUMNS_NUMBER:2};
var a=["input","textarea"];
var d=function(){function p(v){var u=this;
_classCallCheck(this,p);
this.el=v[0];
this.twoColumnsForResponsive=this.el.classList.contains(f.TWO_COLUMNS_FOR_RESPONSIVE);
if(this.twoColumnsForResponsive){this.initResponsiveColumns();
if(this.originalColumnsHolders.length!==c.RESPONSIVE_COLUMNS_NUMBER){this.setColumns();
window.addEventListener("resize",b.debounceExtend(this.setColumns.bind(this),500))
}}var w=this.el.getAttribute("data-is-list");
w&&window.addEventListener("DOMContentLoaded",function(){u.items=u.getInteractiveItems();
u.items.length&&u.init()
})
}_createClass(p,[{key:"initResponsiveColumns",value:function t(){var u=this;
this.originalColumnsHolders=[].concat(_toConsumableArray(this.el.getElementsByClassName(f.COLUMN_CONTROL_HOLDER)));
if(this.originalColumnsHolders.length===c.RESPONSIVE_COLUMNS_NUMBER){return
}var x=this.originalColumnsHolders[0].parentElement?this.originalColumnsHolders[0].parentElement.tagName:"div";
var v=this.originalColumnsHolders[0].tagName;
this.originalColumnsElements=this.originalColumnsHolders.map(function(A){return[].concat(_toConsumableArray(A.children))
});
this.isResponsiveView=false;
[].concat(_toConsumableArray(this.el.children)).forEach(function(A){return A.classList+=f.HIDE_COLUMN_ON_RESPONSIVE
});
var w=[].concat(_toConsumableArray(this.el.querySelectorAll("."+f.COLUMN_CONTROL_HOLDER+" > *")));
var z=w.length/c.LOGICAL_BLOCK_ELEMENTS_NUMBER;
var y=Math.ceil(z/c.RESPONSIVE_COLUMNS_NUMBER)*c.LOGICAL_BLOCK_ELEMENTS_NUMBER;
this.responsiveColumnsElements=[w.slice(0,y),w.slice(y)];
this.responsiveColumnsHolders=this.responsiveColumnsElements.map(function(){var B;
var C=document.createElement(x);
var A=document.createElement(v);
(B=C.classList).add.apply(B,_toConsumableArray(f.RESPONSIVE_COLUMN).concat(_toConsumableArray(f.RESPONSIVE_COLUMN_PADDINGS)));
A.classList.add(f.COLUMN_CONTROL_HOLDER);
C.appendChild(A);
u.el.appendChild(C);
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
define("DetailPagesFilter23",["utils-dust","utils-env","constants","jquery-plugins"],function(b,g,k){var d={industries:".detail-pages-filter-23__select--industries",contentTypes:".detail-pages-filter-23__select--content-types",topics:".detail-pages-filter-23__select--topics",detailPagesMainList:".detail-pages-list--main",detailPagesSecondaryList:".detail-pages-list--secondary",detailPagesList:" .detail-pages-list-ui__holder",detailPagesListNotEmpty:"detail-pages-list__holder--not-empty",viewMore:".detail-pages-filter-23__view-more",viewMoreLink:".detail-pages-filter-23__view-more-button",lastRowItem:"detail-pages-list-23__item-last-row",message:".detail-pages-filter-23__error-message",topPanel:".detail-pages-filter-23",detailPagesLink:".detail-pages-list-23__link",filterComponent:".detail-pages-filter-23-ui",filterContainer:".detail-pages-filter-23__filter-wrap",filterDropdownContainer:".detail-pages-filter-23__filter-list-wrap",filterSelected:"detail-pages-filter-23__filter_selected",filterPanel:".detail-pages-filter-23__filter-top",filterPanelStickyTop:"detail-pages-filter-23-ui_sticky-fixed",filterPanelStickyBottom:"detail-pages-filter-23-ui_sticky-absolute",filterPanelSpacer:".detail-pages-filter-23__filter-panel-spacer",filterPanelBtn:".detail-pages-filter-23__filter-panel-btn",filterExpanded:"detail-pages-filter-23__filter_expanded",filterListItem:".detail-pages-filter-23__filter-list-item",filterListItemActive:"detail-pages-filter-23__filter-list-item_active",filterListItemIcon:".detail-pages-filter-23__link-icon",filterSelectedCount:".detail-pages-filter-23__filter-list-selected-count",filterClearParametersBtn:".detail-pages-filter-23__filter-list-btn-clear",filterApplyBtn:".gradient-border-button",filterApplyBtnDisabled:"custom-button-disabled",filterTags:".detail-pages-filter-23__filter-tags",filterTagsNotEmpty:"detail-pages-filter-23__filter-tags-not-empty",filterTagItem:".detail-pages-filter-23__filter-tag-item",filterTagItemClear:".detail-pages-filter-23__filter-tag-item_clear",filterClearTagsBtn:".detail-pages-filter-23__filter-tags-btn-clear",filterRemoveTagBtn:".detail-pages-filter-23__filter-tag-btn-remove",filterPanelHasPinned:"detail-pages-filter-23_has-pinned",filterDataIdAttr:"data-filter-id",filterTagDataIdAttr:"data-filter-tag-id",infoMessage:".detail-pages-list-ui__info-block",filterTitle:".detail-pages-filter-23__title",breadcrumbs:".breadcrumbs-ui-23",pageHeader:".header-ui-23",headerState:"releasing-header"};
var e=$(document.body);
var a={URL:"/services/search/detail-pages.json",DEFAULT_URL:"/services/search/detail-pages.default.json",TEMPLATE:"detail-pages-list-23",DEFAULT_IMAGE:"/etc/designs/epam-com/images/detail-page/default-filter-image.jpg",ROW_LENGTH:3,LIMIT:9,TOPICS_COUNT:"component.detail-pages-filter.topics-count",FILTER_STORE_NAME:"filtersStore"};
var i={ajaxErrorMessage:"component.general.ajax-error-message",ajaxErrorTryAgain:"component.general.ajax-error-try-again",searchNoResults:"component.detail-pages-filter.search-no-results",searchEmptyResult:"component.general.search-empty-result-for-"};
var c=62;
var l=0;
var f=25;
var h=992;
function j(m){this.$el=m;
this.$detailPagesMainList=this.$el.find(d.detailPagesMainList+d.detailPagesList);
this.$detailPagesSecondaryList=this.$el.find(d.detailPagesSecondaryList+d.detailPagesList);
this.$viewMore=this.$el.find(d.viewMore);
this.$viewMoreLink=this.$viewMore.find(d.viewMoreLink);
this.$preloader=this.$el.find("."+k.Classes.preloader);
this.$message=this.$el.find(d.message);
this.$messageText=this.$message.find("p");
this.$topPanel=this.$el.find(d.topPanel);
this.contentReferenceLabelsView=this.$el.data("content-reference-labels-view");
this.viewType=this.$el.data("viewType");
this.$filterWrapper=this.$el.find(d.filterDropdownContainer);
this.$filterTitle=this.$el.find(d.filterTitle);
this.$filterContainer=this.$el.find(d.filterContainer);
this.$filterPanel=this.$el.find(d.filterPanel);
this.$filterPanelBtn=this.$el.find(d.filterPanelBtn);
this.$filterSelectedCount=this.$el.find(d.filterSelectedCount);
this.$filterClearParametersBtn=this.$el.find(d.filterClearParametersBtn);
this.$filterListItem=this.$el.find(d.filterListItem);
this.$filterListItemIcon=this.$el.find(d.filterListItemIcon);
this.$filterApplyBtn=this.$el.find(d.filterApplyBtn);
this.$filterTags=this.$el.find(d.filterTags);
this.$filterTagItemClear=this.$el.find(d.filterTagItemClear);
this.$filterClearTagsBtn=this.$el.find(d.filterClearTagsBtn);
this.isAuthor=g.isAuthor();
this.paths=this.$el.data("paths")||"";
this.$infoMessage=this.$el.find(d.infoMessage);
this.$pageHeader=$(d.pageHeader);
this.defaultParameters={paths:this.paths.split(","),limit:a.LIMIT,offset:0,viewType:this.viewType,hideTags:true};
this.filtersStore={filters:[],filtersChecked:[]};
this.initViewType();
this.$viewMoreLink.on("click",this.loadMoreDetailPages.bind(this));
this.focusOnFirstLoadedItem.bind(this)
}j.prototype.initViewType=function(){var n=this;
this.$filterPanelBtn.on("click",this.toggleFilterList.bind(this));
this.$filterContainer.on("click",d.filterListItem,this.toggleFilterListItem.bind(this));
this.$filterContainer.on("click",d.filterRemoveTagBtn,this.removeFilterTag.bind(this));
this.$filterClearParametersBtn.on("click",this.clearAllFilterParameters.bind(this));
this.$filterClearTagsBtn.on("click",this.clearAllFilterTags.bind(this));
this.$filterApplyBtn.on("click",function(o){var p=o.target;
if(!p.classList.contains("custom-button-disabled")){n.applyFilters()
}});
this.stickHeader();
this.closeOnClickOutside();
this.filtersStore.filters=$("["+d.filterDataIdAttr+"]").map(function(o,p){return{value:$(p).attr(""+d.filterDataIdAttr),label:$(p).text().trim()}
}).get();
var m=this;
window.addEventListener("load",function(){if(window.performance&&window.performance.getEntriesByType("navigation").length&&performance.getEntriesByType("navigation")[0].type==="back_forward"||performance.navigation.type===performance.navigation.TYPE_BACK_FORWARD){m.filtersStore.filtersChecked=m.getFilterLocalStorage()
}m.collectParametersAndLoad(true).done(function(){m.updateFilterView();
m.updateFilterTagsView()
})
})
};
j.prototype.stickHeader=function(){var q=this.$el;
var p=q.find(d.filterPanel);
var n=q.find(d.filterPanelSpacer);
var o=true;
function m(){if(o){o=false;
return
}var u=this.$pageHeader.height();
var t=n[0].getBoundingClientRect().top-q[0].getBoundingClientRect().top;
var s=q[0].getBoundingClientRect().top+t-u||0;
var r=0;
if(p.height()>q[0].getBoundingClientRect().bottom){r=q[0].getBoundingClientRect().bottom-p.height()
}if(parseInt(r)<0){q.removeClass(d.filterPanelStickyTop);
q.addClass(d.filterPanelStickyBottom);
e.removeClass(d.filterPanelHasPinned)
}else{q.removeClass(d.filterPanelStickyBottom);
if(s<=r){q.addClass(d.filterPanelStickyTop);
e.addClass(d.filterPanelHasPinned);
this.releaseHeader()
}else{q.removeClass(d.filterPanelStickyTop);
e.removeClass(d.filterPanelHasPinned)
}}}document.addEventListener("scroll",m.bind(this))
};
j.prototype.releaseHeader=function(){this.$pageHeader[0].removeEventListener("transitionend",this.headerAnimationEventHandler);
this.$pageHeader[0].addEventListener("transitionend",this.headerAnimationEventHandler,{once:true});
e.addClass(d.headerState)
};
j.prototype.headerAnimationEventHandler=function(){if(!e.hasClass(d.filterPanelHasPinned)){e.removeClass(d.headerState)
}};
j.prototype.closeOnClickOutside=function(){var m=this;
document.addEventListener("click",function n(p){var o=$(p.target);
if(!o.closest(d.filterDropdownContainer).length&&$(d.filterContainer).hasClass(d.filterExpanded)&&!o.closest(d.filterPanelBtn).length){m.toggleFilterList()
}})
};
j.prototype.toggleFilterList=function(){this.$filterWrapper.animate({scrollTop:"0px"},0);
this.$filterContainer.toggleClass(d.filterExpanded)
};
j.prototype.toggleFilterListItem=function(q){var m=$(q.target);
if(!m.attr(d.filterDataIdAttr)){m=$(q.target.parentElement.parentElement)
}var p=m.attr(d.filterDataIdAttr);
var n=this.filtersStore.filtersChecked.find(function(r){return r.value===p
});
if(n){if(n.applied){n.selected=!n.selected
}else{this.filtersStore.filtersChecked=this.filtersStore.filtersChecked.filter(function(r){return r.value!==p
})
}}else{var o=this.filtersStore.filters.find(function(r){return r.value===p
});
o=Object.assign({},o,{selected:true,applied:false});
this.filtersStore.filtersChecked.push(o)
}this.updateFilterView()
};
j.prototype.clearAllFilterParameters=function(){this.filtersStore.filtersChecked.forEach(function(m){m.selected=false
});
this.updateFilterView()
};
j.prototype.clearAllFilterTags=function(){this.removeFilterTags();
this.filtersStore.filtersChecked=[];
this.updateFilterView();
this.collectParametersAndLoad()
};
j.prototype.removeFilterTag=function(o){var m=$(o.target);
var n=$(o.target).closest("li");
var p=m.attr(d.filterTagDataIdAttr);
this.filtersStore.filtersChecked=this.filtersStore.filtersChecked.filter(function(q){return q.value!==p
});
n.remove();
this.updateFilterView();
this.collectParametersAndLoad()
};
j.prototype.removeFilterTags=function(){this.$filterTagItemClear.nextAll().remove()
};
j.prototype.applyFilters=function(){var n=this.$filterPanel.attr("class").split(/\s+/).some(function(p){return p==="sticky"
});
var o=window.innerWidth<h?f:l;
var m=this.$filterTitle.length?o:c;
if(n){$("html, body").animate({scrollTop:this.$topPanel.offset().top-m},0)
}this.filtersStore.filtersChecked=this.filtersStore.filtersChecked.filter(function(p){return p.selected
});
this.filtersStore.filtersChecked.forEach(function(p){p.applied=true
});
this.updateFilterTagsView();
this.updateFilterView();
this.toggleFilterList();
this.collectParametersAndLoad();
setTimeout(function(){document.querySelectorAll(d.breadcrumbs).forEach(function(p){$(p).addClass(k.Classes.hidden)
})
},10)
};
j.prototype.updateFilterView=function(){var n=this;
var m=this.filtersStore.filtersChecked.reduce(function(r,q){return q.selected?r+1:r
},0);
var o=this.filtersStore.filtersChecked.some(function(q){return q.applied
});
var p=this.filtersStore.filtersChecked.some(function(q){return q.selected!==q.applied
});
if(m){this.$filterContainer.addClass(d.filterSelected)
}else{this.$filterContainer.removeClass(d.filterSelected)
}if(o){this.$filterTags.addClass(d.filterTagsNotEmpty)
}else{this.$filterTags.removeClass(d.filterTagsNotEmpty)
}if(p){this.$filterApplyBtn.removeClass(d.filterApplyBtnDisabled);
this.$filterApplyBtn.removeAttr("disabled")
}else{this.$filterApplyBtn.addClass(d.filterApplyBtnDisabled);
this.$filterApplyBtn.attr("disabled","disabled")
}$(d.filterListItem).removeClass(d.filterListItemActive);
this.filtersStore.filtersChecked.forEach(function(q){var r=n.$el.find("["+d.filterDataIdAttr+"='"+q.value+"']");
if(q.selected){r.addClass(d.filterListItemActive)
}});
this.$filterSelectedCount.text(m);
this.setFilterLocalStorage()
};
j.prototype.updateFilterTagsView=function(){var m=function m(p){var n=p.label,o=p.value;
return'\n        <li class="detail-pages-filter-23__filter-tag-item">\n            <div class="detail-pages-filter-23__filter-tag">\n                <span class="detail-pages-filter-23__filter-tag-label">'+n+'</span>\n                <button type="button" class="detail-pages-filter-23__filter-tag-btn-remove" data-filter-tag-id="'+o+'"></button>\n            </div>\n        </li>\n        '
};
this.removeFilterTags();
this.$filterTagItemClear.after(this.getAppliedFilters(this.filtersStore.filtersChecked).map(m).join(""))
};
j.prototype.setFilterLocalStorage=function(){window.localStorage.setItem(a.FILTER_STORE_NAME,JSON.stringify(this.filtersStore.filtersChecked))
};
j.prototype.getFilterLocalStorage=function(){return JSON.parse(window.localStorage.getItem(a.FILTER_STORE_NAME))||[]
};
j.prototype.getAppliedFilters=function(m){return m.filter(function(n){return n.applied
})
};
j.prototype.collectFilterParameters=function(){var m=this.viewType==="filter"?"industries":"topics";
return $.extend({},this.defaultParameters,_defineProperty({},m,this.getAppliedFilters(this.filtersStore.filtersChecked).map(function(n){return n.value
})))
};
j.prototype.loadMoreDetailPages=function(n){this.$viewMore.addClass(k.Classes.hidden);
var o=this.$detailPagesMainList.children().length,m=$.extend(this.collectFilterParameters(),{offset:o});
this.loadDetailPages(m);
n.preventDefault()
};
j.prototype.collectParametersAndLoad=function(n){var m=this.collectFilterParameters();
if(n){m.buildSchemaOrgMarkup=n
}return this.loadDetailPages(m)
};
j.prototype.loadDetailPages=function(m){return $.ajax({url:this.defaultLoad?a.DEFAULT_URL:a.URL,data:m,cache:false,beforeSend:this.toggleLoadingState.bind(this,true),success:this.loadDetailPagesAdapter.bind(this,m),complete:this.toggleLoadingState.bind(this,false),error:this.showErrorMessage.bind(this)})
};
j.prototype.loadDetailPagesAdapter=function(n,o){if(this.viewType!=="filter"){this.updateDetailPages(n,o);
return
}var m=o;
this.defaultLoad=!o.result.length;
if(this.secondLoad){m.defaultResult=o.result;
o.result=[];
this.secondLoad=false;
this.defaultLoad=false;
this.updateDetailPages(n,m);
return
}if(this.defaultLoad){this.collectParametersAndLoad();
this.secondLoad=true;
this.defaultLoad=false;
return
}this.updateDetailPages(n,m)
};
j.prototype.toggleLoadingState=function(m){this.$preloader.toggleClass(k.Classes.hidden,!m);
this.$infoMessage.toggleClass(k.Classes.hidden,m);
m&&this.$message.addClass(k.Classes.hidden)
};
j.prototype.updateDetailPages=function(y,s){var z=s.result,x=s.schemaOrgMarkup,o=s.defaultResult||[],v=s.total,q=y.limit,r=y.offset,n=!z.length,m=!o.length,w=n&&m,p=v>r+q,u=y.buildSchemaOrgMarkup,t=this.$el.data("viewType")==="careers-blog"?"query":"combination";
if(n||!r){this.$detailPagesMainList.empty();
this.$detailPagesSecondaryList.empty()
}!m&&this.updateErrorMessage([i.searchNoResults]);
w&&this.updateErrorMessage([i.searchEmptyResult+t]);
this.$message.toggleClass(k.Classes.hidden,m&&!w);
this.$viewMore.toggleClass(k.Classes.hidden,!p);
if(this.$topPanel.length){this.$detailPagesMainList.toggleClass(d.detailPagesListNotEmpty,!n)
}this.renderDetailPages(o,r,this.$detailPagesSecondaryList);
this.renderDetailPages(z,r,this.$detailPagesMainList);
u&&!!x&&this.addSchemaOrgMarkup(x)
};
j.prototype.renderDetailPages=function(m,p,o){var n={pages:m,lastRowIdx:this.calculateLastRowIndex(m.length),defaultImage:a.DEFAULT_IMAGE,isAuthor:this.isAuthor,contentReferenceLabelsView:this.contentReferenceLabelsView,viewType:this.viewType};
p&&o.children().removeClass(d.lastRowItem);
b.append(a.TEMPLATE,n,o);
this.toggleLoadingState(false);
this.focusOnFirstLoadedItem(p)
};
j.prototype.focusOnFirstLoadedItem=function(n){var m=this.$detailPagesMainList.children();
if(m.length>a.LIMIT){m.eq(n).find(d.detailPagesLink).focus()
}};
j.prototype.calculateLastRowIndex=function(m){var n=Math.ceil(m/a.ROW_LENGTH);
return(n-1)*a.ROW_LENGTH
};
j.prototype.addSchemaOrgMarkup=function(m){this.$el.prepend('<script type="application/ld+json">'+JSON.stringify(m)+"<\/script>")
};
j.prototype.showErrorMessage=function(){this.updateErrorMessage([i.ajaxErrorMessage,i.ajaxErrorTryAgain]);
this.$message.removeClass(k.Classes.hidden)
};
j.prototype.updateErrorMessage=function(m){var n=m.length>1?m.map(function(o){return CQ.I18n.getMessage(o)
}).join(" "):CQ.I18n.getMessage(m[0]);
this.$messageText.html(n)
};
j.moduleName="Detail Pages Filter 23";
j.selector=".detail-pages-filter-23-ui";
return j
});
define("InstagramFeed23",["SwipeCarousel"],function(c){var b={blocksContainer:".instagram-feed__container",scrollContainer:".instagram-feed__scroll-container",progressBar:".instagram-feed__progress-bar",slider:".slider"};
function a(d){this.element=d[0];
this.scrollContainer=this.element.querySelector(b.scrollContainer);
this.owl=this.element.querySelector(b.blocksContainer);
this.slider=this.element.querySelector(b.slider);
this.progressBar=this.element.querySelector(b.progressBar);
this.initCarousel()
}a.prototype=new c();
a.moduleName="Instagram Feed 23";
a.selector=".instagram-feed-ui-23";
return a
});
define("LeadershipViewer23",["SwipeCarousel","gradients","utils","constants"],function(h,a,b,e){var d={TEXT_GRADIENT:".text-gradient",SLIDER_ITEMS:".leadership-viewer-ui-23-scroll__info-wrapper",ITEMS:".leadership-viewer-ui-23__info-wrapper",NON_SLIDER_ITEM:".leadership-viewer-ui-23__info",ITEM_NAME_WRAPPER:".name-wrapper",ITEM_NAME:".name",ITEM_NAME_UNDERLINE:".name-underline",TRANSFERRED:"transferred",TRANSPARENT:"transparent",SCROLL:".leadership-viewer-ui-23-scroll",BLOCKS_CONTAINER:".leadership-viewer-ui-23-scroll__container",PROGRESS_BAR:".leadership-viewer-ui-23-scroll__progress-bar",SLIDER:".slider",TABS:".tabs-ui-23"};
var f=0.1;
var g=1.2;
function c(k){this.element=k[0];
var j=this.element.querySelectorAll(d.SLIDER_ITEMS);
var i=this.element.querySelectorAll(d.ITEMS);
this.scrollContainer=this.element.querySelector(d.SCROLL);
this.owl=this.element.querySelector(d.BLOCKS_CONTAINER);
this.slider=this.element.querySelector(d.SLIDER);
this.progressBar=this.element.querySelector(d.PROGRESS_BAR);
this.onLoad=this.onLoad.bind(this);
this.onResize=this.onResize.bind(this);
this.detectOutOfBoundsText=this.detectOutOfBoundsText.bind(this);
this.isSlider=!!j.length;
this.itemsToProcess=this.isSlider?j:i;
this.gradientText=new a.GradientText();
this.gradientTextUnderline=new a.GradientText();
this.initEvents();
if(j.length){this.initCarousel({0:{margin:24},991:{margin:49}})
}}c.prototype=new h();
c.prototype.initEvents=function(){window.addEventListener("load",this.onLoad)
};
c.prototype.onLoad=function(){this.detectOutOfBoundsText();
var j=[];
this.itemsToProcess.forEach(function(k){return j.push(k.querySelector(d.ITEM_NAME_WRAPPER))
});
var i=j.map(function(k){return k.querySelector(d.ITEM_NAME)
});
this.gradientText.init(i,{rightRatio:f,middleRatio:g});
this.handleUnderlines();
window.addEventListener("resize",b.debounce(this.onResize,500));
if(this.element.closest(d.TABS)){$(window).on(e.Events.tabChanged,this.onResize)
}};
c.prototype.onResize=function(){this.detectOutOfBoundsText();
this.handleUnderlines()
};
c.prototype.handleUnderlines=function(){var j=[];
this.itemsToProcess.forEach(function(k){return j.push(k.querySelector(d.ITEM_NAME_WRAPPER))
});
var i=[];
j.forEach(function(m){if(m.classList.contains(d.TRANSFERRED)){var l;
var k=m.querySelector(d.ITEM_NAME_UNDERLINE).children;
(l=i).push.apply(l,_toConsumableArray(k))
}else{i.push(m.querySelector(d.ITEM_NAME_UNDERLINE))
}});
i=i.filter(function(k){return k.nodeName!=="BR"
});
this.gradientTextUnderline.stop();
this.gradientTextUnderline.init(i,{rightRatio:f,middleRatio:g})
};
c.prototype.detectOutOfBoundsText=function(){for(var j=0;
j<this.itemsToProcess.length;
j++){var k=this.itemsToProcess[j].querySelector(d.ITEM_NAME);
k.style.display="inline";
if(k.getClientRects().length>1){this.itemsToProcess[j].querySelector(d.ITEM_NAME_WRAPPER).classList.add(d.TRANSFERRED)
}else{this.itemsToProcess[j].querySelector(d.ITEM_NAME_WRAPPER).classList.remove(d.TRANSFERRED)
}}};
c.selector=".leadership-viewer-ui-23";
c.moduleName="LeadershipViewer23";
return c
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
define("NestedTextBlock23",["utils-env","utils-browser"],function(b){var c={animated:"animated",item:".nested-text-block__item"};
var a=function(){function e(h){_classCallCheck(this,e);
this.$el=h[0];
this.$items=this.$el.querySelectorAll(c.item);
this.tabletMediaQuery="(min-width: 768px)";
this.init()
}_createClass(e,[{key:"init",value:function g(){var j=this;
var h=window.matchMedia(this.tabletMediaQuery).matches;
var l=1;
var k=0.5;
var m=0.25;
var i=l;
if(j.$items.length>3){i=h?k:m
}window.addEventListener("load",function(){var n=new IntersectionObserver(function(o,p){o.forEach(function(q){if(q.isIntersecting){j.animateBlocksInSeries();
p.unobserve(j.$el)
}})
},{threshold:i});
n.observe(j.$el)
});
j.disableAnimationInEditMode()
}},{key:"disableAnimationInEditMode",value:function d(){if(b.isEditMode()){var j=[];
for(var h=0;
h<this.$items.length;
h++){j.push(this.$items[h])
}j.forEach(function(i){i.classList.add(c.animated)
})
}}},{key:"animateBlocksInSeries",value:function f(){var j=[];
for(var h=0;
h<this.$items.length;
h++){j.push(this.$items[h])
}j.forEach(function(k,i){setTimeout(function(){k.classList.add(c.animated)
},150*i)
})
}}]);
return e
}();
a.moduleName="NestedTextBlock23";
a.selector=".nested-text-block-23";
return a
});
define("RolloverBlocks23",["media"],function(b){var c={BLOCK:"rollover-blocks__block",FOCUSED_BLOCK:"rollover-blocks__block--focused",BLOCK_CONTENT:"rollover-blocks__content",ROLLOVER_BLOCK:"rollover-blocks__description-rollover",LINK_A11Y:"rollover-blocks__link-holder--a11y",LINK_LEARN_MORE:"rollover-blocks__link",LINK_LEARN_MORE_ICON:"link-arrow",RTE_LINKS:"rollover-blocks__text a"};
var a=function(){function e(i){_classCallCheck(this,e);
this.el=i[0];
this.isResponsive=b.currentMode().lessThan(b.modes.Desktop);
this.blocks=this.el.querySelectorAll("."+c.BLOCK);
this.activeBlock=localStorage.getItem("activeBlock");
var j=+localStorage.getItem("left");
this.addEventListenersToBlocks();
if(this.activeBlock!==null&&this.isResponsive){this.blocks[this.activeBlock].classList.add("flipped");
this.blocks[this.activeBlock].classList.add("active");
i.scrollLeft($(this.blocks[this.activeBlock]).position().left-j)
}}_createClass(e,[{key:"addEventListenersToBlocks",value:function h(){var i=this;
this.blocks.forEach(function(p,n){var m=p.querySelector("."+c.BLOCK_CONTENT);
var l=p.querySelector("."+c.ROLLOVER_BLOCK);
var j=p.querySelector("."+c.LINK_LEARN_MORE);
var o=p.querySelectorAll("."+c.RTE_LINKS);
var k=[j].concat(_toConsumableArray(o));
if(n===0){i.showForAccessibility(m)
}i.hideForAccessibility.apply(i,_toConsumableArray(o));
i.addEventListenerToRolloverBlock(p,l,k);
if(i.isResponsive){p.addEventListener("click",function(r){if(!r.target.className.includes(c.LINK_LEARN_MORE)&&r.target.className!==c.LINK_LEARN_MORE_ICON){if(p.classList.contains("active")){p.classList.remove("active");
localStorage.removeItem("activeBlock")
}else{p.classList.add("active")
}i.blocks.forEach(function(s){if(s!==p&&s.classList.contains("active")){s.classList.remove("active");
localStorage.removeItem("activeBlock")
}})
}else{localStorage.setItem("activeBlock",n);
var q=p.getBoundingClientRect();
localStorage.setItem("left",q.left)
}})
}else{p.addEventListener("mouseover",function(){p.classList.add("active")
});
p.addEventListener("mouseout",function(){p.classList.remove("active")
})
}})
}},{key:"addEventListenerToRolloverBlock",value:function d(l,j,i){var k=this;
j.addEventListener("focus",function(){setTimeout(function(){l.classList.add(c.FOCUSED_BLOCK);
k.showForAccessibility.apply(k,[j].concat(_toConsumableArray(i)))
},5)
});
j.addEventListener("blur",function(){l.classList.remove(c.FOCUSED_BLOCK);
k.hideForAccessibility.apply(k,[j].concat(_toConsumableArray(i)))
});
i.forEach(function(m){if(m){m.addEventListener("focus",function(){l.classList.add(c.FOCUSED_BLOCK);
k.showForAccessibility.apply(k,[j].concat(_toConsumableArray(i)))
});
m.addEventListener("blur",function(){l.classList.remove(c.FOCUSED_BLOCK);
k.hideForAccessibility.apply(k,[j].concat(_toConsumableArray(i)))
})
}})
}},{key:"showForAccessibility",value:function f(){for(var j=arguments.length,i=Array(j),k=0;
k<j;
k++){i[k]=arguments[k]
}i.forEach(function(l){if(l){l.setAttribute("tabindex",0);
l.removeAttribute("aria-hidden")
}})
}},{key:"hideForAccessibility",value:function g(){for(var j=arguments.length,i=Array(j),k=0;
k<j;
k++){i[k]=arguments[k]
}i.forEach(function(l){if(l){l.setAttribute("tabindex",-1);
l.setAttribute("aria-hidden",true)
}})
}}]);
return e
}();
a.selector=".rollover-blocks-ui-23";
a.moduleName="Rollover Blocks 23";
return a
});
define("ScrollingBlocks23",["SwipeCarousel"],function(c){var b={blocksContainer:".scrolling-blocks__container",scrollContainer:".scrolling-blocks__scroll-container",progressBar:".scrolling-blocks__progress-bar",tabs:"tabs-23__item",active:"active",slider:".slider"};
function a(d){this.element=d[0];
this.scrollContainer=this.element.querySelector(b.scrollContainer);
this.owl=this.element.querySelector(b.blocksContainer);
this.slider=this.element.querySelector(b.slider);
this.progressBar=this.element.querySelector(b.progressBar);
this.inited=false;
this.handleTabs()
}a.prototype=new c();
a.prototype.handleTabs=function(){var e=this;
var g=this.element.parentElement;
var f=g.parentElement;
if(!f.classList.contains(b.tabs)){this.initCarousel();
this.inited=true;
return
}if(f.classList.contains(b.active)){this.initCarousel();
this.inited=true
}var d=new MutationObserver(function(h){h.forEach(function(i){if(i.type==="attributes"&&i.attributeName==="class"&&i.target.classList.contains(b.active)){if(!e.inited){e.initCarousel();
e.inited=true
}else{e.updateCarousel()
}}})
});
d.observe(f,{attributes:true})
};
a.selector=".scrolling-blocks-ui-23";
a.moduleName="Scrolling Blocks 23";
return a
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
define("UpcomingEvent23",["utils-env","utils-browser"],function(b){var d=768;
var c={wrapper:".upcoming-event-ui-23",image:".upcoming-event-ui-23__image img",title:".upcoming-event-ui-23__link",arrow:".upcoming-event-ui-23__arrow-button",hovered:"hovered",animated:"animated"};
var a=function(){function g(l){_classCallCheck(this,g);
this.$wrapper=l[0];
this.$image=l.find(c.image)[0];
this.$title=l.find(c.title)[0];
this.$arrow=l.find(c.arrow)[0];
this.bindedAnimateIfInViewPort=this.animateIfInViewPort.bind(this);
this.init();
if(b.isEditMode()){this.$wrapper.classList.add(c.animated)
}}_createClass(g,[{key:"init",value:function k(){window.addEventListener("scroll",this.bindedAnimateIfInViewPort);
var l=this;
window.addEventListener("load",function(){l.animateIfInViewPort()
});
if(window.innerWidth>=d){this.handleImageHover();
this.handleTitleHover();
this.handleArrowHover()
}}},{key:"handleImageHover",value:function j(){var l=this;
this.$image.addEventListener("mouseover",function(){l.$title.classList.add(c.hovered);
l.$arrow.classList.add(c.hovered)
});
this.$image.addEventListener("mouseout",function(){l.$title.classList.remove(c.hovered);
l.$arrow.classList.remove(c.hovered)
})
}},{key:"handleTitleHover",value:function f(){var l=this;
this.$title.addEventListener("mouseover",function(){l.$image.classList.add(c.animated);
l.$arrow.classList.add(c.hovered)
});
this.$title.addEventListener("mouseout",function(){l.$image.classList.remove(c.animated);
l.$arrow.classList.remove(c.hovered)
})
}},{key:"handleArrowHover",value:function i(){var l=this;
this.$arrow.addEventListener("mouseover",function(){l.$image.classList.add(c.animated);
l.$title.classList.add(c.hovered)
});
this.$arrow.addEventListener("mouseout",function(){l.$image.classList.remove(c.animated);
l.$title.classList.remove(c.hovered)
})
}},{key:"animateIfInViewPort",value:function e(){if(!this.$wrapper){return
}var t=this.$wrapper.getBoundingClientRect().top;
var m=window.scrollY||document.documentElement.scrollTop;
var q=m+t;
var r=q+this.$wrapper.offsetHeight;
var o=m+window.innerHeight;
var s=m;
var n=this.$wrapper.offsetHeight;
var p=o-q;
var l=r-s;
if(p>=n/2||l<=n/2){this.animateBlock();
window.removeEventListener("scroll",this.bindedAnimateIfInViewPort)
}}},{key:"animateBlock",value:function h(){var l=this;
setTimeout(function(){l.$wrapper.classList.add(c.animated)
},150)
}}]);
return g
}();
a.moduleName="Upcoming-Event-23";
a.selector=".upcoming-event-ui-23";
return a
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
}},{key:"sliderClickHandler",value:function z(O){var N=O.target;
var L=768;
if(this.isIE||N.tagName==="svg"||N.tagName==="use"||$(N).hasClass("video-showcase__img-wrapper-overlay")||$(N).hasClass("video-showcase__tray-text")||$(window).width()<L){var M=$(N).closest("."+e.SLIDER_IMG_WRAPPER);
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
}},{key:"changeActiveVideo",value:function G(M){var P=this;
var L=M.sources,O=M.poster,N=M.title;
this.$video.innerHTML="";
if(this.isFirstPlay){this.$video.poster=O
}JSON.parse(L).forEach(function(S){var Q=S.type,T=S.src;
var R=document.createElement("source");
R.setAttribute("type",Q);
R.setAttribute("src",T);
P.$video.appendChild(R)
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
}function j(){var n=this;
var m=this.$el.querySelector(".video-showcase__video-progress");
m.addEventListener("keydown",function(o){var p=o.keyCode;
if(p===32){c.togglePlay.call(n)
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
}}}function n(Q,R){var P=this;
this.overlayTimerId&&clearTimeout(this.overlayTimerId);
this.$overlayIcons.classList.remove("hidden");
this.$player.classList.remove(Q);
this.$player.classList.add(R);
this.overlayTimerId=setTimeout(function(){P.$overlayIcons.classList.add("hidden")
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
define("ExperienceFragmentGDPRConsent",["constants"],function(m){var h="/conf/epam/settings/wcm/segments/",d=".content.html",k="first",f="gdprSegment";
var l=function l(o){_classCallCheck(this,l);
this.$el=o;
this.$form=o.closest("form");
if(window.ContextHub&&ContextHub.SegmentEngine){this.id=o.attr("id");
var p=o.data("mappings");
var n=o.data("defaultVariation");
if(p&&n){this.variants=j(p,n);
ContextHubJQ(b.bind(this));
return
}}c.apply(this)
};
function j(r,o){var n=[];
for(var p in r){if(Object.prototype.hasOwnProperty.call(r,p)){var q=Object.create(null);
q.title=p;
q.url=r[p]+d;
q.segments=[h+p.toLowerCase()];
q.segmentPath=h+p;
n.push(q)
}}n.push({title:"Default",url:o+d});
return n
}function b(){ContextHub.eventing.on(ContextHub.Constants.EVENT_TEASER_LOADED,i.bind(this));
ContextHub.SegmentEngine.PageInteraction.Teaser({locationId:this.id,variants:this.variants,strategy:k,trackingURL:null});
setTimeout(function(){c.apply(this)
}.bind(this),5000)
}function i(o,p){var n=this;
var q=this.id;
p.data.forEach(function(r){if(r.key===q){c.apply(n)
}});
a.call(this,f,e(o,p));
g.call(this)
}function g(){var n=this.$el.closest("form");
n.trigger(m.Events.initConsent)
}function c(){this.$el.removeClass("hidden")
}function e(p,q){try{var o=q.data[0].teaser;
var t=o.currentlyLoaded.url;
var n=o.details.variants;
var s=n.find(function(u){return t.startsWith(u.url)
});
return s.segmentPath
}catch(r){return""
}}function a(n,p){var o=this.$form.find("input[name="+n+"]");
if(o.length){o.first().val(p)
}}l.moduleName="Experience Fragment Give GDPR Consent";
l.selector=".epam-experience-fragment-ui";
return l
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