!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()
}):"object"==typeof module&&module.exports?module.exports=b():a.svg4everybody=b()
}(this,function(){
/*! svg4everybody v2.1.8 | github.com/jonathantneal/svg4everybody */
;
function d(g,e,h){if(h){var f=document.createDocumentFragment(),i=h.getAttribute("viewBox");
i&&e.setAttribute("viewBox",i);
for(var j=h.cloneNode(!0);
j.childNodes.length;
){f.appendChild(j.firstChild)
}g.appendChild(f)
}}function b(e){e.onreadystatechange=function(){if(4===e.readyState){var f=e._cachedDocument;
f||(f=e._cachedDocument=document.implementation.createHTMLDocument(""),f.body.innerHTML=e.responseText,e._cachedTarget={}),e._embeds.splice(0).map(function(g){var h=e._cachedTarget[g.id];
h||(h=e._cachedTarget[g.id]=f.getElementById(g.id)),d(g.parent,g.svg,h)
})
}},e.onreadystatechange()
}function a(i){function h(){for(var w=0;
w<j.length;
){var s=j[w],x=s.parentNode,v=c(x);
if(v){var r=s.getAttribute("xlink:href")||s.getAttribute("href");
!r&&f.attributeName&&(r=s.getAttribute(f.attributeName));
if(p){if(!f.validate||f.validate(r,v,s)){x.removeChild(s);
var z=r.split("#"),t=z.shift(),u=z.join("#");
if(t.length){var y=e[t];
y||(y=e[t]=new XMLHttpRequest(),y.open("GET",t),y.send(),y._embeds=[]),y._embeds.push({parent:x,svg:v,id:u}),b(y)
}else{d(x,v,document.getElementById(u))
}}else{++w,++k
}}}else{++w
}}(!j.length||j.length-k>0)&&o(h,67)
}var p,f=Object(i),l=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,n=/\bAppleWebKit\/(\d+)\b/,m=/\bEdge\/12\.(\d+)\b/,q=/\bEdge\/.(\d+)\b/,g=window.top!==window.self;
p="polyfill" in f?f.polyfill:l.test(navigator.userAgent)||(navigator.userAgent.match(m)||[])[1]<10547||(navigator.userAgent.match(n)||[])[1]<537||q.test(navigator.userAgent)&&g;
var e={},o=window.requestAnimationFrame||setTimeout,j=document.getElementsByTagName("use"),k=0;
p&&h()
}function c(f){for(var e=f;
"svg"!==e.nodeName.toLowerCase()&&(e=e.parentNode);
){}return e
}return a
});
(function(d,c,b,e){function a(g,f){this.settings=null;
this.options=d.extend({},a.Defaults,f);
this.$element=d(g);
this._handlers={};
this._plugins={};
this._supress={};
this._current=null;
this._speed=null;
this._coordinates=[];
this._breakpoint=null;
this._width=null;
this._items=[];
this._clones=[];
this._mergers=[];
this._widths=[];
this._invalidated={};
this._pipe=[];
this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null};
this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}};
d.each(["onResize","onThrottledResize"],d.proxy(function(h,j){this._handlers[j]=d.proxy(this[j],this)
},this));
d.each(a.Plugins,d.proxy(function(h,i){this._plugins[h.charAt(0).toLowerCase()+h.slice(1)]=new i(this)
},this));
d.each(a.Workers,d.proxy(function(h,i){this._pipe.push({filter:i.filter,run:d.proxy(i.run,this)})
},this));
this.setup();
this.initialize()
}a.Defaults={items:3,loop:false,center:false,rewind:false,checkVisibility:true,mouseDrag:true,touchDrag:true,pullDrag:true,freeDrag:false,margin:0,stagePadding:0,merge:false,mergeFit:true,autoWidth:false,startPosition:0,rtl:false,smartSpeed:1500,fluidSpeed:false,dragEndSpeed:false,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:c,fallbackEasing:"swing",slideTransition:"",info:false,nestedItemSelector:false,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"};
a.Width={Default:"default",Inner:"inner",Outer:"outer"};
a.Type={Event:"event",State:"state"};
a.Plugins={};
a.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()
}},{filter:["width","items","settings"],run:function(f){f.current=this._items&&this._items[this.relative(this._current)]
}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()
}},{filter:["width","items","settings"],run:function(f){var i=this.settings.margin||"",h=!this.settings.autoWidth,j=this.settings.rtl,g={width:"auto","margin-left":j?i:"","margin-right":j?"":i};
!h&&this.$stage.children().css(g);
f.css=g
}},{filter:["width","items","settings"],run:function(f){var i=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,k=null,h=this._items.length,g=!this.settings.autoWidth,j=[];
f.items={merge:false,width:i};
while(h--){k=this._mergers[h];
k=this.settings.mergeFit&&Math.min(k,this.settings.items)||k;
f.items.merge=k>1||f.items.merge;
j[h]=!g?this._items[h].width():i*k
}this._widths=j
}},{filter:["items","settings"],run:function(){var m=[],i=this._items,k=this.settings,g=Math.max(k.items*2,4),j=Math.ceil(i.length/2)*2,l=k.loop&&i.length?k.rewind?g:Math.max(g,j):0,f="",h="";
l/=2;
while(l>0){m.push(this.normalize(m.length/2,true));
f=f+i[m[m.length-1]][0].outerHTML;
m.push(this.normalize(i.length-1-(m.length-1)/2,true));
h=i[m[m.length-1]][0].outerHTML+h;
l-=1
}this._clones=m;
d(f).addClass("cloned").appendTo(this.$stage);
d(h).addClass("cloned").prependTo(this.$stage)
}},{filter:["width","items","settings"],run:function(){var j=this.settings.rtl?1:-1,f=this._clones.length+this._items.length,g=-1,h=0,i=0,k=[];
while(++g<f){h=k[g-1]||0;
i=this._widths[this.relative(g)]+this.settings.margin;
k.push(h+i*j)
}this._coordinates=k
}},{filter:["width","items","settings"],run:function(){var g=this.settings.stagePadding,h=this._coordinates,f={width:Math.ceil(Math.abs(h[h.length-1]))+g*2,"padding-left":g||"","padding-right":g||""};
this.$stage.css(f)
}},{filter:["width","items","settings"],run:function(g){var i=this._coordinates.length,h=!this.settings.autoWidth,f=this.$stage.children();
if(h&&g.items.merge){while(i--){g.css.width=this._widths[this.relative(i)];
f.eq(i).css(g.css)
}}else{if(h){g.css.width=g.items.width;
f.css(g.css)
}}}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")
}},{filter:["width","items","settings"],run:function(f){f.current=f.current?this.$stage.children().index(f.current):0;
f.current=Math.max(this.minimum(),Math.min(this.maximum(),f.current));
this.reset(f.current)
}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))
}},{filter:["width","position","items","settings"],run:function(){var l=this.settings.rtl?1:-1,m=this.settings.stagePadding*2,g=this.coordinates(this.current())+m,h=g+this.width()*l,p,o,k=[],j,f;
for(j=0,f=this._coordinates.length;
j<f;
j++){p=this._coordinates[j-1]||0;
o=Math.abs(this._coordinates[j])+m*l;
if((this.op(p,"<=",g)&&(this.op(p,">",h)))||(this.op(o,"<",g)&&this.op(o,">",h))){k.push(j)
}}this.$stage.children(".active").removeClass("active");
this.$stage.children(":eq("+k.join("), :eq(")+")").addClass("active");
this.$stage.children(".center").removeClass("center");
if(this.settings.center){this.$stage.children().eq(this.current()).addClass("center")
}}}];
a.prototype.initializeStage=function(){this.$stage=this.$element.find("."+this.settings.stageClass);
if(this.$stage.length){return
}this.$element.addClass(this.options.loadingClass);
this.$stage=d("<"+this.settings.stageElement+">",{"class":this.settings.stageClass}).wrap(d("<div/>",{"class":this.settings.stageOuterClass}));
this.$element.append(this.$stage.parent())
};
a.prototype.initializeItems=function(){var f=this.$element.find(".owl-item");
if(f.length){this._items=f.get().map(function(g){return d(g)
});
this._mergers=this._items.map(function(){return 1
});
this.refresh();
return
}this.replace(this.$element.children().not(this.$stage.parent()));
if(this.isVisible()){this.refresh()
}else{this.invalidate("width")
}this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)
};
a.prototype.initialize=function(){this.enter("initializing");
this.trigger("initialize");
this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl);
if(this.settings.autoWidth&&!this.is("pre-loading")){var h,g,f;
h=this.$element.find("img");
g=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:e;
f=this.$element.children(g).width();
if(h.length&&f<=0){this.preloadAutoWidthImages(h)
}}this.initializeStage();
this.initializeItems();
this.registerEventHandlers();
this.leave("initializing");
this.trigger("initialized")
};
a.prototype.isVisible=function(){return this.settings.checkVisibility?this.$element.is(":visible"):true
};
a.prototype.setup=function(){var f=this.viewport(),h=this.options.responsive,g=-1,i=null;
if(!h){i=d.extend({},this.options)
}else{d.each(h,function(j){if(j<=f&&j>g){g=Number(j)
}});
i=d.extend({},this.options,h[g]);
if(typeof i.stagePadding==="function"){i.stagePadding=i.stagePadding()
}delete i.responsive;
if(i.responsiveClass){this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+g))
}}this.trigger("change",{property:{name:"settings",value:i}});
this._breakpoint=g;
this.settings=i;
this.invalidate("settings");
this.trigger("changed",{property:{name:"settings",value:this.settings}})
};
a.prototype.optionsLogic=function(){if(this.settings.autoWidth){this.settings.stagePadding=false;
this.settings.merge=false
}};
a.prototype.prepare=function(g){var f=this.trigger("prepare",{content:g});
if(!f.data){f.data=d("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(g)
}this.trigger("prepared",{content:f.data});
return f.data
};
a.prototype.update=function(){var g=0,j=this._pipe.length,h=d.proxy(function(i){return this[i]
},this._invalidated),f={};
while(g<j){if(this._invalidated.all||d.grep(this._pipe[g].filter,h).length>0){this._pipe[g].run(f)
}g++
}this._invalidated={};
!this.is("valid")&&this.enter("valid")
};
a.prototype.width=function(f){f=f||a.Width.Default;
switch(f){case a.Width.Inner:case a.Width.Outer:return this._width;
default:return this._width-this.settings.stagePadding*2+this.settings.margin
}};
a.prototype.refresh=function(){this.enter("refreshing");
this.trigger("refresh");
this.setup();
this.optionsLogic();
this.$element.addClass(this.options.refreshClass);
this.update();
this.$element.removeClass(this.options.refreshClass);
this.leave("refreshing");
this.trigger("refreshed")
};
a.prototype.onThrottledResize=function(){c.clearTimeout(this.resizeTimer);
this.resizeTimer=c.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)
};
a.prototype.onResize=function(){if(!this._items.length){return false
}if(this._width===this.$element.width()){return false
}if(!this.isVisible()){return false
}this.enter("resizing");
if(this.trigger("resize").isDefaultPrevented()){this.leave("resizing");
return false
}this.invalidate("width");
this.refresh();
this.leave("resizing");
this.trigger("resized")
};
a.prototype.registerEventHandlers=function(){if(d.support.transition){this.$stage.on(d.support.transition.end+".owl.core",d.proxy(this.onTransitionEnd,this))
}if(this.settings.responsive!==false){this.on(c,"resize",this._handlers.onThrottledResize)
}if(this.settings.mouseDrag){this.$element.addClass(this.options.dragClass);
this.$stage.on("mousedown.owl.core",d.proxy(this.onDragStart,this));
this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return false
})
}if(this.settings.touchDrag){this.$stage.on("touchstart.owl.core",d.proxy(this.onDragStart,this));
this.$stage.on("touchcancel.owl.core",d.proxy(this.onDragEnd,this))
}};
a.prototype.onDragStart=function(g){var f=null;
if(g.which===3){return
}if(d.support.transform){f=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(",");
f={x:f[f.length===16?12:4],y:f[f.length===16?13:5]}
}else{f=this.$stage.position();
f={x:this.settings.rtl?f.left+this.$stage.width()-this.width()+this.settings.margin:f.left,y:f.top}
}if(this.is("animating")){d.support.transform?this.animate(f.x):this.$stage.stop();
this.invalidate("position")
}this.$element.toggleClass(this.options.grabClass,g.type==="mousedown");
this.speed(0);
this._drag.time=new Date().getTime();
this._drag.target=d(g.target);
this._drag.stage.start=f;
this._drag.stage.current=f;
this._drag.pointer=this.pointer(g);
d(b).on("mouseup.owl.core touchend.owl.core",d.proxy(this.onDragEnd,this));
d(b).one("mousemove.owl.core touchmove.owl.core",d.proxy(function(h){var i=this.difference(this._drag.pointer,this.pointer(h));
d(b).on("mousemove.owl.core touchmove.owl.core",d.proxy(this.onDragMove,this));
if(Math.abs(i.x)<Math.abs(i.y)&&this.is("valid")){return
}h.preventDefault();
this.enter("dragging");
this.trigger("drag")
},this))
};
a.prototype.onDragMove=function(g){var i=null,j=null,h=null,k=this.difference(this._drag.pointer,this.pointer(g)),f=this.difference(this._drag.stage.start,k);
if(!this.is("dragging")){return
}g.preventDefault();
if(this.settings.loop){i=this.coordinates(this.minimum());
j=this.coordinates(this.maximum()+1)-i;
f.x=(((f.x-i)%j+j)%j)+i
}else{i=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum());
j=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum());
h=this.settings.pullDrag?-1*k.x/5:0;
f.x=Math.max(Math.min(f.x,i+h),j+h)
}this._drag.stage.current=f;
this.animate(f.x)
};
a.prototype.onDragEnd=function(g){var i=this.difference(this._drag.pointer,this.pointer(g)),f=this._drag.stage.current,h=i.x>0^this.settings.rtl?"left":"right";
d(b).off(".owl.core");
this.$element.removeClass(this.options.grabClass);
if(i.x!==0&&this.is("dragging")||!this.is("valid")){this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed);
this.current(this.closest(f.x,i.x!==0?h:this._drag.direction));
this.invalidate("position");
this.update();
this._drag.direction=h;
if(Math.abs(i.x)>3||new Date().getTime()-this._drag.time>300){this._drag.target.one("click.owl.core",function(){return false
})
}}if(!this.is("dragging")){return
}this.leave("dragging");
this.trigger("dragged")
};
a.prototype.closest=function(k,i){var f=-1,h=30,g=this.width(),j=this.coordinates();
if(!this.settings.freeDrag){d.each(j,d.proxy(function(l,m){if(i==="left"&&k>m-h&&k<m+h){f=l
}else{if(i==="right"&&k>m-g-h&&k<m-g+h){f=l+1
}else{if(this.op(k,"<",m)&&this.op(k,">",j[l+1]!==e?j[l+1]:m-g)){f=i==="left"?l+1:l
}}}return f===-1
},this))
}if(!this.settings.loop){if(this.op(k,">",j[this.minimum()])){f=k=this.minimum()
}else{if(this.op(k,"<",j[this.maximum()])){f=k=this.maximum()
}}}return f
};
a.prototype.animate=function(g){var f=this.speed()>0;
this.is("animating")&&this.onTransitionEnd();
if(f){this.enter("animating");
this.trigger("translate")
}if(d.support.transform3d&&d.support.transition){this.$stage.css({transform:"translate3d("+g+"px,0px,0px)",transition:(this.speed()/1000)+"s"+(this.settings.slideTransition?" "+this.settings.slideTransition:"")})
}else{if(f){this.$stage.animate({left:g+"px"},this.speed(),this.settings.fallbackEasing,d.proxy(this.onTransitionEnd,this))
}else{this.$stage.css({left:g+"px"})
}}};
a.prototype.is=function(f){return this._states.current[f]&&this._states.current[f]>0
};
a.prototype.current=function(f){if(f===e){return this._current
}if(this._items.length===0){return e
}f=this.normalize(f);
if(this._current!==f){var g=this.trigger("change",{property:{name:"position",value:f}});
if(g.data!==e){f=this.normalize(g.data)
}this._current=f;
this.invalidate("position");
this.trigger("changed",{property:{name:"position",value:this._current}})
}return this._current
};
a.prototype.invalidate=function(f){if(d.type(f)==="string"){this._invalidated[f]=true;
this.is("valid")&&this.leave("valid")
}return d.map(this._invalidated,function(g,h){return h
})
};
a.prototype.reset=function(f){f=this.normalize(f);
if(f===e){return
}this._speed=0;
this._current=f;
this.suppress(["translate","translated"]);
this.animate(this.coordinates(f));
this.release(["translate","translated"])
};
a.prototype.normalize=function(g,h){var i=this._items.length,f=h?0:this._clones.length;
if(!this.isNumeric(g)||i<1){g=e
}else{if(g<0||g>=i+f){g=((g-f/2)%i+i)%i+f/2
}}return g
};
a.prototype.relative=function(f){f-=this._clones.length/2;
return this.normalize(f,true)
};
a.prototype.maximum=function(j){var g=this.settings,k=this._coordinates.length,f,i,h;
if(g.loop){k=this._clones.length/2+this._items.length-1
}else{if(g.autoWidth||g.merge){f=this._items.length;
if(f){i=this._items[--f].width();
h=this.$element.width();
while(f--){i+=this._items[f].width()+this.settings.margin;
if(i>h){break
}}}k=f+1
}else{if(g.center){k=this._items.length-1
}else{k=this._items.length-g.items
}}}if(j){k-=this._clones.length/2
}return Math.max(k,0)
};
a.prototype.minimum=function(f){return f?0:this._clones.length/2
};
a.prototype.items=function(f){if(f===e){return this._items.slice()
}f=this.normalize(f,true);
return this._items[f]
};
a.prototype.mergers=function(f){if(f===e){return this._mergers.slice()
}f=this.normalize(f,true);
return this._mergers[f]
};
a.prototype.clones=function(f){var g=this._clones.length/2,i=g+this._items.length,h=function(j){return j%2===0?i+j/2:g-(j+1)/2
};
if(f===e){return d.map(this._clones,function(j,k){return h(k)
})
}return d.map(this._clones,function(j,k){return j===f?h(k):null
})
};
a.prototype.speed=function(f){if(f!==e){this._speed=f
}return this._speed
};
a.prototype.coordinates=function(f){var i=1,g=f-1,h;
if(f===e){return d.map(this._coordinates,d.proxy(function(k,j){return this.coordinates(j)
},this))
}if(this.settings.center){if(this.settings.rtl){i=-1;
g=f+1
}h=this._coordinates[f];
h+=(this.width()-h+(this._coordinates[g]||0))/2*i
}else{h=this._coordinates[g]||0
}h=Math.ceil(h);
return h
};
a.prototype.duration=function(h,g,f){if(f===0){return 0
}return Math.min(Math.max(Math.abs(g-h),1),6)*Math.abs((f||this.settings.smartSpeed))
};
a.prototype.to=function(i,g){var j=this.current(),m=null,f=i-this.relative(j),n=(f>0)-(f<0),l=this._items.length,k=this.minimum(),h=this.maximum();
if(this.settings.loop){if(!this.settings.rewind&&Math.abs(f)>l/2){f+=n*-1*l
}i=j+f;
m=((i-k)%l+l)%l+k;
if(m!==i&&m-f<=h&&m-f>0){j=m-f;
i=m;
this.reset(j)
}}else{if(this.settings.rewind){h+=1;
i=(i%h+h)%h
}else{i=Math.max(k,Math.min(h,i))
}}this.speed(this.duration(j,i,g));
this.current(i);
if(this.isVisible()){this.update()
}};
a.prototype.next=function(f){f=f||false;
this.to(this.relative(this.current())+1,f)
};
a.prototype.prev=function(f){f=f||false;
this.to(this.relative(this.current())-1,f)
};
a.prototype.onTransitionEnd=function(f){if(f!==e){f.stopPropagation();
if((f.target||f.srcElement||f.originalTarget)!==this.$stage.get(0)){return false
}}this.leave("animating");
this.trigger("translated")
};
a.prototype.viewport=function(){var f;
if(this.options.responsiveBaseElement!==c){f=d(this.options.responsiveBaseElement).width()
}else{if(c.innerWidth){f=c.innerWidth
}else{if(b.documentElement&&b.documentElement.clientWidth){f=b.documentElement.clientWidth
}else{console.warn("Can not detect viewport width.")
}}}return f
};
a.prototype.replace=function(f){this.$stage.empty();
this._items=[];
if(f){f=(f instanceof jQuery)?f:d(f)
}if(this.settings.nestedItemSelector){f=f.find("."+this.settings.nestedItemSelector)
}f.filter(function(){return this.nodeType===1
}).each(d.proxy(function(g,h){h=this.prepare(h);
this.$stage.append(h);
this._items.push(h);
this._mergers.push(h.find("[data-merge]").addBack("[data-merge]").attr("data-merge")*1||1)
},this));
this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0);
this.invalidate("items")
};
a.prototype.add=function(g,f){var h=this.relative(this._current);
f=f===e?this._items.length:this.normalize(f,true);
g=g instanceof jQuery?g:d(g);
this.trigger("add",{content:g,position:f});
g=this.prepare(g);
if(this._items.length===0||f===this._items.length){this._items.length===0&&this.$stage.append(g);
this._items.length!==0&&this._items[f-1].after(g);
this._items.push(g);
this._mergers.push(g.find("[data-merge]").addBack("[data-merge]").attr("data-merge")*1||1)
}else{this._items[f].before(g);
this._items.splice(f,0,g);
this._mergers.splice(f,0,g.find("[data-merge]").addBack("[data-merge]").attr("data-merge")*1||1)
}this._items[h]&&this.reset(this._items[h].index());
this.invalidate("items");
this.trigger("added",{content:g,position:f})
};
a.prototype.remove=function(f){f=this.normalize(f,true);
if(f===e){return
}this.trigger("remove",{content:this._items[f],position:f});
this._items[f].remove();
this._items.splice(f,1);
this._mergers.splice(f,1);
this.invalidate("items");
this.trigger("removed",{content:null,position:f})
};
a.prototype.preloadAutoWidthImages=function(f){f.each(d.proxy(function(h,g){this.enter("pre-loading");
g=d(g);
d(new Image()).one("load",d.proxy(function(i){g.attr("src",i.target.src);
g.css("opacity",1);
this.leave("pre-loading");
!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()
},this)).attr("src",g.attr("src")||g.attr("data-src")||g.attr("data-src-retina"))
},this))
};
a.prototype.destroy=function(){this.$element.off(".owl.core");
this.$stage.off(".owl.core");
d(b).off(".owl.core");
if(this.settings.responsive!==false){c.clearTimeout(this.resizeTimer);
this.off(c,"resize",this._handlers.onThrottledResize)
}for(var f in this._plugins){this._plugins[f].destroy()
}this.$stage.children(".cloned").remove();
this.$stage.unwrap();
this.$stage.children().contents().unwrap();
this.$stage.children().unwrap();
this.$stage.remove();
this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")
};
a.prototype.op=function(g,i,f){var h=this.settings.rtl;
switch(i){case"<":return h?g>f:g<f;
case">":return h?g<f:g>f;
case">=":return h?g<=f:g>=f;
case"<=":return h?g>=f:g<=f;
default:break
}};
a.prototype.on=function(g,h,i,f){if(g.addEventListener){g.addEventListener(h,i,f)
}else{if(g.attachEvent){g.attachEvent("on"+h,i)
}}};
a.prototype.off=function(g,h,i,f){if(g.removeEventListener){g.removeEventListener(h,i,f)
}else{if(g.detachEvent){g.detachEvent("on"+h,i)
}}};
a.prototype.trigger=function(g,l,i,k,m){var f={item:{count:this._items.length,index:this.current()}},h=d.camelCase(d.grep(["on",g,i],function(n){return n
}).join("-").toLowerCase()),j=d.Event([g,"owl",i||"carousel"].join(".").toLowerCase(),d.extend({relatedTarget:this},f,l));
if(!this._supress[g]){d.each(this._plugins,function(n,o){if(o.onTrigger){o.onTrigger(j)
}});
this.register({type:a.Type.Event,name:g});
this.$element.trigger(j);
if(this.settings&&typeof this.settings[h]==="function"){this.settings[h].call(this,j)
}}return j
};
a.prototype.enter=function(f){d.each([f].concat(this._states.tags[f]||[]),d.proxy(function(h,g){if(this._states.current[g]===e){this._states.current[g]=0
}this._states.current[g]++
},this))
};
a.prototype.leave=function(f){d.each([f].concat(this._states.tags[f]||[]),d.proxy(function(h,g){this._states.current[g]--
},this))
};
a.prototype.register=function(g){if(g.type===a.Type.Event){if(!d.event.special[g.name]){d.event.special[g.name]={}
}if(!d.event.special[g.name].owl){var f=d.event.special[g.name]._default;
d.event.special[g.name]._default=function(h){if(f&&f.apply&&(!h.namespace||h.namespace.indexOf("owl")===-1)){return f.apply(this,arguments)
}return h.namespace&&h.namespace.indexOf("owl")>-1
};
d.event.special[g.name].owl=true
}}else{if(g.type===a.Type.State){if(!this._states.tags[g.name]){this._states.tags[g.name]=g.tags
}else{this._states.tags[g.name]=this._states.tags[g.name].concat(g.tags)
}this._states.tags[g.name]=d.grep(this._states.tags[g.name],d.proxy(function(h,j){return d.inArray(h,this._states.tags[g.name])===j
},this))
}}};
a.prototype.suppress=function(f){d.each(f,d.proxy(function(g,h){this._supress[h]=true
},this))
};
a.prototype.release=function(f){d.each(f,d.proxy(function(g,h){delete this._supress[h]
},this))
};
a.prototype.pointer=function(g){var f={x:null,y:null};
g=g.originalEvent||g||c.event;
g=g.touches&&g.touches.length?g.touches[0]:g.changedTouches&&g.changedTouches.length?g.changedTouches[0]:g;
if(g.pageX){f.x=g.pageX;
f.y=g.pageY
}else{f.x=g.clientX;
f.y=g.clientY
}return f
};
a.prototype.isNumeric=function(f){return !isNaN(parseFloat(f))
};
a.prototype.difference=function(g,f){return{x:g.x-f.x,y:g.y-f.y}
};
d.fn.owlCarousel=function(g){var f=Array.prototype.slice.call(arguments,1);
return this.each(function(){var i=d(this),h=i.data("owl.carousel");
if(!h){h=new a(this,typeof g=="object"&&g);
i.data("owl.carousel",h);
d.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(j,k){h.register({type:a.Type.Event,name:k});
h.$element.on(k+".owl.carousel.core",d.proxy(function(l){if(l.namespace&&l.relatedTarget!==this){this.suppress([k]);
h[k].apply(this,[].slice.call(arguments,1));
this.release([k])
}},h))
})
}if(typeof g=="string"&&g.charAt(0)!=="_"){h[g].apply(h,f)
}})
};
d.fn.owlCarousel.Constructor=a
})(window.Zepto||window.jQuery,window,document);
(function(d,c,a,e){var b=function(f){this._core=f;
this._interval=null;
this._visible=null;
this._handlers={"initialized.owl.carousel":d.proxy(function(g){if(g.namespace&&this._core.settings.autoRefresh){this.watch()
}},this)};
this._core.options=d.extend({},b.Defaults,this._core.options);
this._core.$element.on(this._handlers)
};
b.Defaults={autoRefresh:true,autoRefreshInterval:500};
b.prototype.watch=function(){if(this._interval){return
}this._visible=this._core.isVisible();
this._interval=c.setInterval(d.proxy(this.refresh,this),this._core.settings.autoRefreshInterval)
};
b.prototype.refresh=function(){if(this._core.isVisible()===this._visible){return
}this._visible=!this._visible;
this._core.$element.toggleClass("owl-hidden",!this._visible);
this._visible&&(this._core.invalidate("width")&&this._core.refresh())
};
b.prototype.destroy=function(){var f,g;
c.clearInterval(this._interval);
for(f in this._handlers){this._core.$element.off(f,this._handlers[f])
}for(g in Object.getOwnPropertyNames(this)){typeof this[g]!="function"&&(this[g]=null)
}};
d.fn.owlCarousel.Constructor.Plugins.AutoRefresh=b
})(window.Zepto||window.jQuery,window,document);
(function(d,c,a,e){var b=function(f){this._core=f;
this._loaded=[];
this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":d.proxy(function(m){if(!m.namespace){return
}if(!this._core.settings||!this._core.settings.lazyLoad){return
}if((m.property&&m.property.name=="position")||m.type=="initialized"){var j=this._core.settings,o=(j.center&&Math.ceil(j.items/2)||j.items),h=((j.center&&o*-1)||0),g=(m.property&&m.property.value!==e?m.property.value:this._core.current())+h,l=this._core.clones().length,k=d.proxy(function(p,n){this.load(n)
},this);
if(j.lazyLoadEager>0){o+=j.lazyLoadEager;
if(j.loop){g-=j.lazyLoadEager;
o++
}}while(h++<o){this.load(l/2+this._core.relative(g));
l&&d.each(this._core.clones(this._core.relative(g)),k);
g++
}}},this)};
this._core.options=d.extend({},b.Defaults,this._core.options);
this._core.$element.on(this._handlers)
};
b.Defaults={lazyLoad:false,lazyLoadEager:0};
b.prototype.load=function(f){var g=this._core.$stage.children().eq(f),h=g&&g.find(".owl-lazy");
if(!h||d.inArray(g.get(0),this._loaded)>-1){return
}h.each(d.proxy(function(k,l){var i=d(l),m,j=(c.devicePixelRatio>1&&i.attr("data-src-retina"))||i.attr("data-src")||i.attr("data-srcset");
this._core.trigger("load",{element:i,url:j},"lazy");
if(i.is("img")){i.one("load.owl.lazy",d.proxy(function(){i.css("opacity",1);
this._core.trigger("loaded",{element:i,url:j},"lazy")
},this)).attr("src",j)
}else{if(i.is("source")){i.one("load.owl.lazy",d.proxy(function(){this._core.trigger("loaded",{element:i,url:j},"lazy")
},this)).attr("srcset",j)
}else{m=new Image();
m.onload=d.proxy(function(){i.css({"background-image":'url("'+j+'")',opacity:"1"});
this._core.trigger("loaded",{element:i,url:j},"lazy")
},this);
m.src=j
}}},this));
this._loaded.push(g.get(0))
};
b.prototype.destroy=function(){var f,g;
for(f in this.handlers){this._core.$element.off(f,this.handlers[f])
}for(g in Object.getOwnPropertyNames(this)){typeof this[g]!="function"&&(this[g]=null)
}};
d.fn.owlCarousel.Constructor.Plugins.Lazy=b
})(window.Zepto||window.jQuery,window,document);
(function(c,b,a,d){var e=function(g){this._core=g;
this._previousHeight=null;
this._handlers={"initialized.owl.carousel refreshed.owl.carousel":c.proxy(function(h){if(h.namespace&&this._core.settings.autoHeight){this.update()
}},this),"changed.owl.carousel":c.proxy(function(h){if(h.namespace&&this._core.settings.autoHeight&&h.property.name==="position"){this.update()
}},this),"loaded.owl.lazy":c.proxy(function(h){if(h.namespace&&this._core.settings.autoHeight&&h.element.closest("."+this._core.settings.itemClass).index()===this._core.current()){this.update()
}},this)};
this._core.options=c.extend({},e.Defaults,this._core.options);
this._core.$element.on(this._handlers);
this._intervalId=null;
var f=this;
c(b).on("load",function(){if(f._core.settings.autoHeight){f.update()
}});
c(b).resize(function(){if(f._core.settings.autoHeight){if(f._intervalId!=null){clearTimeout(f._intervalId)
}f._intervalId=setTimeout(function(){f.update()
},250)
}})
};
e.Defaults={autoHeight:false,autoHeightClass:"owl-height"};
e.prototype.update=function(){var k=this._core._current,f=k+this._core.settings.items,g=this._core.settings.lazyLoad,j=this._core.$stage.children().toArray().slice(k,f),h=[],i=0;
c.each(j,function(l,m){h.push(c(m).height())
});
i=Math.max.apply(null,h);
if(i<=1&&g&&this._previousHeight){i=this._previousHeight
}this._previousHeight=i;
this._core.$stage.parent().height(i).addClass(this._core.settings.autoHeightClass)
};
e.prototype.destroy=function(){var f,g;
for(f in this._handlers){this._core.$element.off(f,this._handlers[f])
}for(g in Object.getOwnPropertyNames(this)){typeof this[g]!=="function"&&(this[g]=null)
}};
c.fn.owlCarousel.Constructor.Plugins.AutoHeight=e
})(window.Zepto||window.jQuery,window,document);
(function(d,c,a,e){var b=function(f){this._core=f;
this._videos={};
this._playing=null;
this._handlers={"initialized.owl.carousel":d.proxy(function(g){if(g.namespace){this._core.register({type:"state",name:"playing",tags:["interacting"]})
}},this),"resize.owl.carousel":d.proxy(function(g){if(g.namespace&&this._core.settings.video&&this.isInFullScreen()){g.preventDefault()
}},this),"refreshed.owl.carousel":d.proxy(function(g){if(g.namespace&&this._core.is("resizing")){this._core.$stage.find(".cloned .owl-video-frame").remove()
}},this),"changed.owl.carousel":d.proxy(function(g){if(g.namespace&&g.property.name==="position"&&this._playing){this.stop()
}},this),"prepared.owl.carousel":d.proxy(function(h){if(!h.namespace){return
}var g=d(h.content).find(".owl-video");
if(g.length){g.css("display","none");
this.fetch(g,d(h.content))
}},this)};
this._core.options=d.extend({},b.Defaults,this._core.options);
this._core.$element.on(this._handlers);
this._core.$element.on("click.owl.video",".owl-video-play-icon",d.proxy(function(g){this.play(g)
},this))
};
b.Defaults={video:false,videoHeight:false,videoWidth:false};
b.prototype.fetch=function(k,j){var i=(function(){if(k.attr("data-vimeo-id")){return"vimeo"
}else{if(k.attr("data-vzaar-id")){return"vzaar"
}else{return"youtube"
}}})(),l=k.attr("data-vimeo-id")||k.attr("data-youtube-id")||k.attr("data-vzaar-id"),h=k.attr("data-width")||this._core.settings.videoWidth,f=k.attr("data-height")||this._core.settings.videoHeight,g=k.attr("href");
if(g){l=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
if(l[3].indexOf("youtu")>-1){i="youtube"
}else{if(l[3].indexOf("vimeo")>-1){i="vimeo"
}else{if(l[3].indexOf("vzaar")>-1){i="vzaar"
}else{throw new Error("Video URL not supported.")
}}}l=l[6]
}else{throw new Error("Missing video URL.")
}this._videos[g]={type:i,id:l,width:h,height:f};
j.attr("data-video",g);
this.thumbnail(k,this._videos[g])
};
b.prototype.thumbnail=function(l,h){var g,n,p,f=h.width&&h.height?"width:"+h.width+"px;height:"+h.height+"px;":"",m=l.find("img"),o="src",k="",i=this._core.settings,j=function(q){n='<div class="owl-video-play-icon"></div>';
if(i.lazyLoad){g=d("<div/>",{"class":"owl-video-tn "+k,srcType:q})
}else{g=d("<div/>",{"class":"owl-video-tn",style:"opacity:1;background-image:url("+q+")"})
}l.after(g);
l.after(n)
};
l.wrap(d("<div/>",{"class":"owl-video-wrapper",style:f}));
if(this._core.settings.lazyLoad){o="data-src";
k="owl-lazy"
}if(m.length){j(m.attr(o));
m.remove();
return false
}if(h.type==="youtube"){p="//img.youtube.com/vi/"+h.id+"/hqdefault.jpg";
j(p)
}else{if(h.type==="vimeo"){d.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+h.id+".json",jsonp:"callback",dataType:"jsonp",success:function(q){p=q[0].thumbnail_large;
j(p)
}})
}else{if(h.type==="vzaar"){d.ajax({type:"GET",url:"//vzaar.com/api/videos/"+h.id+".json",jsonp:"callback",dataType:"jsonp",success:function(q){p=q.framegrab_url;
j(p)
}})
}}}};
b.prototype.stop=function(){this._core.trigger("stop",null,"video");
this._playing.find(".owl-video-frame").remove();
this._playing.removeClass("owl-video-playing");
this._playing=null;
this._core.leave("playing");
this._core.trigger("stopped",null,"video")
};
b.prototype.play=function(l){var m=d(l.target),k=m.closest("."+this._core.settings.itemClass),j=this._videos[k.attr("data-video")],i=j.width||"100%",f=j.height||this._core.$stage.height(),g,h;
if(this._playing){return
}this._core.enter("playing");
this._core.trigger("play",null,"video");
k=this._core.items(this._core.relative(k.index()));
this._core.reset(k.index());
g=d('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>');
g.attr("height",f);
g.attr("width",i);
if(j.type==="youtube"){g.attr("src","//www.youtube.com/embed/"+j.id+"?autoplay=1&rel=0&v="+j.id)
}else{if(j.type==="vimeo"){g.attr("src","//player.vimeo.com/video/"+j.id+"?autoplay=1")
}else{if(j.type==="vzaar"){g.attr("src","//view.vzaar.com/"+j.id+"/player?autoplay=true")
}}}h=d(g).wrap('<div class="owl-video-frame" />').insertAfter(k.find(".owl-video"));
this._playing=k.addClass("owl-video-playing")
};
b.prototype.isInFullScreen=function(){var f=a.fullscreenElement||a.mozFullScreenElement||a.webkitFullscreenElement;
return f&&d(f).parent().hasClass("owl-video-frame")
};
b.prototype.destroy=function(){var f,g;
this._core.$element.off("click.owl.video");
for(f in this._handlers){this._core.$element.off(f,this._handlers[f])
}for(g in Object.getOwnPropertyNames(this)){typeof this[g]!="function"&&(this[g]=null)
}};
d.fn.owlCarousel.Constructor.Plugins.Video=b
})(window.Zepto||window.jQuery,window,document);
(function(d,c,b,e){var a=function(f){this.core=f;
this.core.options=d.extend({},a.Defaults,this.core.options);
this.swapping=true;
this.previous=e;
this.next=e;
this.handlers={"change.owl.carousel":d.proxy(function(g){if(g.namespace&&g.property.name=="position"){this.previous=this.core.current();
this.next=g.property.value
}},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":d.proxy(function(g){if(g.namespace){this.swapping=g.type=="translated"
}},this),"translate.owl.carousel":d.proxy(function(g){if(g.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)){this.swap()
}},this)};
this.core.$element.on(this.handlers)
};
a.Defaults={animateOut:false,animateIn:false};
a.prototype.swap=function(){if(this.core.settings.items!==1){return
}if(!d.support.animation||!d.support.transition){return
}this.core.speed(0);
var k,f=d.proxy(this.clear,this),j=this.core.$stage.children().eq(this.previous),i=this.core.$stage.children().eq(this.next),g=this.core.settings.animateIn,h=this.core.settings.animateOut;
if(this.core.current()===this.previous){return
}if(h){k=this.core.coordinates(this.previous)-this.core.coordinates(this.next);
j.one(d.support.animation.end,f).css({left:k+"px"}).addClass("animated owl-animated-out").addClass(h)
}if(g){i.one(d.support.animation.end,f).addClass("animated owl-animated-in").addClass(g)
}};
a.prototype.clear=function(f){d(f.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut);
this.core.onTransitionEnd()
};
a.prototype.destroy=function(){var f,g;
for(f in this.handlers){this.core.$element.off(f,this.handlers[f])
}for(g in Object.getOwnPropertyNames(this)){typeof this[g]!="function"&&(this[g]=null)
}};
d.fn.owlCarousel.Constructor.Plugins.Animate=a
})(window.Zepto||window.jQuery,window,document);
(function(c,b,a,e){var d=function(f){this._core=f;
this._call=null;
this._time=0;
this._timeout=0;
this._paused=true;
this._handlers={"changed.owl.carousel":c.proxy(function(g){if(g.namespace&&g.property.name==="settings"){if(this._core.settings.autoplay){this.play()
}else{this.stop()
}}else{if(g.namespace&&g.property.name==="position"&&this._paused){this._time=0
}}},this),"initialized.owl.carousel":c.proxy(function(g){if(g.namespace&&this._core.settings.autoplay){this.play()
}},this),"play.owl.autoplay":c.proxy(function(i,g,h){if(i.namespace){this.play(g,h)
}},this),"stop.owl.autoplay":c.proxy(function(g){if(g.namespace){this.stop()
}},this),"mouseover.owl.autoplay":c.proxy(function(){if(this._core.settings.autoplayHoverPause&&this._core.is("rotating")){this.pause()
}},this),"mouseleave.owl.autoplay":c.proxy(function(){if(this._core.settings.autoplayHoverPause&&this._core.is("rotating")){this.play()
}},this),"touchstart.owl.core":c.proxy(function(){if(this._core.settings.autoplayHoverPause&&this._core.is("rotating")){this.pause()
}},this),"touchend.owl.core":c.proxy(function(){if(this._core.settings.autoplayHoverPause){this.play()
}},this)};
this._core.$element.on(this._handlers);
this._core.options=c.extend({},d.Defaults,this._core.options)
};
d.Defaults={autoplay:false,autoplayTimeout:5000,autoplayHoverPause:false,autoplaySpeed:false};
d.prototype._next=function(f){this._call=b.setTimeout(c.proxy(this._next,this,f),this._timeout*(Math.round(this.read()/this._timeout)+1)-this.read());
if(this._core.is("interacting")||a.hidden){return
}this._core.next(f||this._core.settings.autoplaySpeed)
};
d.prototype.read=function(){return new Date().getTime()-this._time
};
d.prototype.play=function(h,g){var f;
if(!this._core.is("rotating")){this._core.enter("rotating")
}h=h||this._core.settings.autoplayTimeout;
f=Math.min(this._time%(this._timeout||h),h);
if(this._paused){this._time=this.read();
this._paused=false
}else{b.clearTimeout(this._call)
}this._time+=this.read()%h-f;
this._timeout=h;
this._call=b.setTimeout(c.proxy(this._next,this,g),h-f)
};
d.prototype.stop=function(){if(this._core.is("rotating")){this._time=0;
this._paused=true;
b.clearTimeout(this._call);
this._core.leave("rotating")
}};
d.prototype.pause=function(){if(this._core.is("rotating")&&!this._paused){this._time=this.read();
this._paused=true;
b.clearTimeout(this._call)
}};
d.prototype.destroy=function(){var f,g;
this.stop();
for(f in this._handlers){this._core.$element.off(f,this._handlers[f])
}for(g in Object.getOwnPropertyNames(this)){typeof this[g]!="function"&&(this[g]=null)
}};
c.fn.owlCarousel.Constructor.Plugins.autoplay=d
})(window.Zepto||window.jQuery,window,document);
(function(d,b,a,e){var c=function(f){this._core=f;
this._initialized=false;
this._pages=[];
this._controls={};
this._templates=[];
this.$element=this._core.$element;
this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to};
this._handlers={"prepared.owl.carousel":d.proxy(function(g){if(g.namespace&&this._core.settings.dotsData){this._templates.push('<div class="'+this._core.settings.dotClass+'">'+d(g.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")
}},this),"added.owl.carousel":d.proxy(function(g){if(g.namespace&&this._core.settings.dotsData){this._templates.splice(g.position,0,this._templates.pop())
}},this),"remove.owl.carousel":d.proxy(function(g){if(g.namespace&&this._core.settings.dotsData){this._templates.splice(g.position,1)
}},this),"changed.owl.carousel":d.proxy(function(g){if(g.namespace&&g.property.name=="position"){this.draw()
}},this),"initialized.owl.carousel":d.proxy(function(g){if(g.namespace&&!this._initialized){this._core.trigger("initialize",null,"navigation");
this.initialize();
this.update();
this.draw();
this._initialized=true;
this._core.trigger("initialized",null,"navigation")
}},this),"refreshed.owl.carousel":d.proxy(function(g){if(g.namespace&&this._initialized){this._core.trigger("refresh",null,"navigation");
this.update();
this.draw();
this._core.trigger("refreshed",null,"navigation")
}},this)};
this._core.options=d.extend({},c.Defaults,this._core.options);
this.$element.on(this._handlers)
};
c.Defaults={nav:false,navText:[CQ.I18n.getMessage("component.general.carousel.previous"),CQ.I18n.getMessage("component.general.carousel.next")],navSpeed:false,navElement:'button type="button" role="presentation"',navContainer:false,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:true,dotsEach:false,dotsData:false,dotsSpeed:false,dotsContainer:false};
c.prototype.initialize=function(){var f,g=this._core.settings;
this._controls.$relative=(g.navContainer?d(g.navContainer):d("<div>").addClass(g.navContainerClass).appendTo(this.$element)).addClass("disabled");
this._controls.$previous=d("<"+g.navElement+">").addClass(g.navClass[0]).html(g.navText[0]).prependTo(this._controls.$relative).on("click",d.proxy(function(h){this.prev(g.navSpeed)
},this));
this._controls.$next=d("<"+g.navElement+">").addClass(g.navClass[1]).html(g.navText[1]).appendTo(this._controls.$relative).on("click",d.proxy(function(h){this.next(g.navSpeed)
},this));
if(!g.dotsData){this._templates=[d('<button role="button">').addClass(g.dotClass).append(d("<span>")).prop("outerHTML")]
}this._controls.$absolute=(g.dotsContainer?d(g.dotsContainer):d("<div>").addClass(g.dotsClass).appendTo(this.$element)).addClass("disabled");
this._controls.$absolute.on("click","button, div",d.proxy(function(i){var h=d(i.target).parent().is(this._controls.$absolute)?d(i.target).index():d(i.target).parent().index();
i.preventDefault();
this.to(h,g.dotsSpeed)
},this));
for(f in this._overrides){this._core[f]=d.proxy(this[f],this)
}};
c.prototype.destroy=function(){var h,j,i,f,g;
g=this._core.settings;
for(h in this._handlers){this.$element.off(h,this._handlers[h])
}for(j in this._controls){if(j==="$relative"&&g.navContainer){this._controls[j].html("")
}else{this._controls[j].remove()
}}for(f in this.overides){this._core[f]=this._overrides[f]
}for(i in Object.getOwnPropertyNames(this)){typeof this[i]!="function"&&(this[i]=null)
}};
c.prototype.update=function(){var m,h,f,g=this._core.clones().length/2,o=g+this._core.items().length,p=this._core.maximum(true),n=this._core.settings,l=n.center||n.autoWidth||n.dotsData?1:n.dotsEach||n.items;
if(n.slideBy!=="page"){n.slideBy=Math.min(n.slideBy,n.items)
}if(n.dots||n.slideBy=="page"){this._pages=[];
for(m=g,h=0,f=0;
m<o;
m++){if(h>=l||h===0){this._pages.push({start:Math.min(p,m-g),end:m-g+l-1});
if(Math.min(p,m-g)===p){break
}h=0,++f
}h+=this._core.mergers(this._core.relative(m))
}}};
c.prototype.draw=function(){var l,i=this._core.settings,h=this._core.items().length<=i.items,g=this._core.relative(this._core.current()),f=i.loop||i.rewind;
this._controls.$relative.toggleClass("disabled",!i.nav||h);
if(i.nav){var k=!f&&g<=this._core.minimum(true),j=!f&&g>=this._core.maximum(true);
this._controls.$previous.toggleClass("disabled",k);
this._controls.$next.toggleClass("disabled",j);
k?this._controls.$previous.attr({"aria-disabled":"true",tabindex:"-1"}):this._controls.$previous.removeAttr("aria-disabled tabindex");
j?this._controls.$next.attr({"aria-disabled":"true",tabindex:"-1"}):this._controls.$next.removeAttr("aria-disabled tabindex")
}this._controls.$absolute.toggleClass("disabled",!i.dots||h);
if(i.dots){l=this._pages.length-this._controls.$absolute.children().length;
if(i.dotsData&&l!==0){this._controls.$absolute.html(this._templates.join(""))
}else{if(l>0){this._controls.$absolute.append(new Array(l+1).join(this._templates[0]))
}else{if(l<0){this._controls.$absolute.children().slice(l).remove()
}}}this._controls.$absolute.find(".active").removeClass("active");
this._controls.$absolute.children().eq(d.inArray(this.current(),this._pages)).addClass("active")
}};
c.prototype.onTrigger=function(g){var f=this._core.settings;
g.page={index:d.inArray(this.current(),this._pages),count:this._pages.length,size:f&&(f.center||f.autoWidth||f.dotsData?1:f.dotsEach||f.items)}
};
c.prototype.current=function(){var f=this._core.relative(this._core.current());
return d.grep(this._pages,d.proxy(function(h,g){return h.start<=f&&h.end>=f
},this)).pop()
};
c.prototype.getPosition=function(g){var f,i,h=this._core.settings;
if(h.slideBy=="page"){f=d.inArray(this.current(),this._pages);
i=this._pages.length;
g?++f:--f;
f=this._pages[((f%i)+i)%i].start
}else{f=this._core.relative(this._core.current());
i=this._core.items().length;
g?f+=h.slideBy:f-=h.slideBy
}return f
};
c.prototype.next=function(f){d.proxy(this._overrides.to,this._core)(this.getPosition(true),f)
};
c.prototype.prev=function(f){d.proxy(this._overrides.to,this._core)(this.getPosition(false),f)
};
c.prototype.to=function(f,i,g){var h;
if(!g&&this._pages.length){h=this._pages.length;
d.proxy(this._overrides.to,this._core)(this._pages[((f%h)+h)%h].start,i)
}else{d.proxy(this._overrides.to,this._core)(f,i)
}};
d.fn.owlCarousel.Constructor.Plugins.Navigation=c
})(window.Zepto||window.jQuery,window,document);
(function(d,c,a,e){var b=function(f){this._core=f;
this._hashes={};
this.$element=this._core.$element;
this._handlers={"initialized.owl.carousel":d.proxy(function(g){if(g.namespace&&this._core.settings.startPosition==="URLHash"){d(c).trigger("hashchange.owl.navigation")
}},this),"prepared.owl.carousel":d.proxy(function(h){if(h.namespace){var g=d(h.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
if(!g){return
}this._hashes[g]=h.content
}},this),"changed.owl.carousel":d.proxy(function(i){if(i.namespace&&i.property.name==="position"){var h=this._core.items(this._core.relative(this._core.current())),g=d.map(this._hashes,function(j,k){return j===h?k:null
}).join();
if(!g||c.location.hash.slice(1)===g){return
}c.location.hash=g
}},this)};
this._core.options=d.extend({},b.Defaults,this._core.options);
this.$element.on(this._handlers);
d(c).on("hashchange.owl.navigation",d.proxy(function(j){var i=c.location.hash.substring(1),h=this._core.$stage.children(),g=this._hashes[i]&&h.index(this._hashes[i]);
if(g===e||g===this._core.current()){return
}this._core.to(this._core.relative(g),false,true)
},this))
};
b.Defaults={URLhashListener:false};
b.prototype.destroy=function(){var f,g;
d(c).off("hashchange.owl.navigation");
for(f in this._handlers){this._core.$element.off(f,this._handlers[f])
}for(g in Object.getOwnPropertyNames(this)){typeof this[g]!="function"&&(this[g]=null)
}};
d.fn.owlCarousel.Constructor.Plugins.Hash=b
})(window.Zepto||window.jQuery,window,document);
(function(e,g,i,d){var b=e("<support>").get(0).style,f="Webkit Moz O ms".split(" "),j={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},c={csstransforms:function(){return !!h("transform")
},csstransforms3d:function(){return !!h("perspective")
},csstransitions:function(){return !!h("transition")
},cssanimations:function(){return !!h("animation")
}};
function h(n,l){var k=false,m=n.charAt(0).toUpperCase()+n.slice(1);
e.each((n+" "+f.join(m+" ")+m).split(" "),function(o,p){if(b[p]!==d){k=l?p:true;
return false
}});
return k
}function a(k){return h(k,true)
}if(c.csstransitions()){e.support.transition=new String(a("transition"));
e.support.transition.end=j.transition.end[e.support.transition]
}if(c.cssanimations()){e.support.animation=new String(a("animation"));
e.support.animation.end=j.animation.end[e.support.animation]
}if(c.csstransforms()){e.support.transform=new String(a("transform"));
e.support.transform3d=c.csstransforms3d()
}})(window.Zepto||window.jQuery,window,document);
(function(c,b,a){var d=function(f){this._core=f;
this._initialized=false;
this._core._options=c.extend(d.defaults,this._core.options);
this.$element=this._core.$element;
var e=c.proxy(function(g){this.setCurrent(g)
},this);
this._handlers={"initialized.owl.carousel":c.proxy(function(g){if(g.namespace&&!this._initialized){this.setupFocus();
this.setupKeyboard()
}this.setCurrent(g)
},this),"changed.owl.carousel":e,"translated.owl.carousel":e,"refreshed.owl.carousel":e,"resized.owl.carousel":e};
this.$element.on(this._handlers)
};
d.defaults={};
d.eventHandlers={};
d.prototype.getDocumentKeyUp=function(){var e=this;
return function(i){var f=c(i.target),g=e.focused(f),h=null;
if(!!g){if(i.keyCode==13){if(f.hasClass("owl-prev")){h="prev.owl.carousel"
}else{if(f.hasClass("owl-next")){h="next.owl.carousel"
}else{if(f.hasClass("owl-dot")){h="click"
}}}}if(!!h){g.trigger(h)
}}}
};
d.prototype.setupKeyboard=function(){if(!this.$element.attr("data-owl-access-keyup")){this.$element.bind("keyup.owl",this.getDocumentKeyUp()).attr("data-owl-access-keyup","1")
}this.$element.attr("data-owl-carousel-focusable","1")
};
d.prototype.setupFocus=function(){this.$element.bind("focusin",function(){c(this).attr({"data-owl-carousel-focused":"1"})
}).bind("focusout",function(){c(this).attr({"data-owl-carousel-focused":"0"})
});
if(!!this._core._plugins.navigation){var f=this._core._plugins.navigation,e=[];
if(!!f._controls.$previous){e.push(f._controls.$previous)
}if(!!f._controls.$next){e.push(f._controls.$next)
}if(!!f._controls.$indicators){e.push(f._controls.$indicators.children())
}c.each(e,function(){this.attr("tabindex","0")
})
}};
d.prototype.destroy=function(){this.$element.unbind("keyup.owl").removeAttr("data-owl-access-keyup data-owl-carousel-focusable").unbind("focusin focusout")
};
d.prototype.focusableElems=function(e){return c(e).find("a, input, select, button, *[tabindex]")
};
d.prototype.adjustFocus=function(e,f){e.each(function(){var h=c(this);
var g="0",i="0";
currentTabIndex=h.attr("tabindex"),storedTabIndex=h.attr("data-owl-temp-tabindex");
if(f){g=(typeof(storedTabIndex)!="undefined"&&(storedTabIndex!="-1")?h.attr("data-owl-temp-tabindex"):"0");
storedTabIndex=g
}else{g="-1";
storedTabIndex=((typeof(currentTabIndex)!="undefined")||(currentTabIndex!="-1")?currentTabIndex:"0")
}h.attr({tabindex:g,"data-owl-temp-tabindex":i})
})
};
d.prototype.focused=function(e){var e=c(e);
if(e.attr("data-owl-carousel-focused")==1){return e
}var f=e.closest('[data-owl-carousel-focused="1"]');
if(f.length>0){return f
}return null
};
d.prototype.setCurrent=function(f){stage=this._core.$stage,focusableElems=this.focusableElems,adjustFocus=this.adjustFocus;
if(!!stage){this._core.$stage.children().each(function(e){var g=c(this);
var h=focusableElems(this);
if(g.hasClass("active")){g.attr("aria-hidden","false");
adjustFocus(h,true)
}else{g.attr("aria-hidden","true");
adjustFocus(h,false)
}})
}};
c.fn.owlCarousel.Constructor.Plugins.Owl2A11y=d
})(window.jQuery,window,document);
(function(d,c,a){var b=function(f){this._core=f;
this._initialized=false;
this._core._options=d.extend(b.defaults,this._core.options);
this.$element=this._core.$element;
var e=d.proxy(function(g){this.adjustCarousel(g)
},this);
this._handlers={"initialized.owl.carousel":e,"resized.owl.carousel":e,"refreshed.owl.carousel":e};
this.$element.on(this._handlers)
};
b.prototype.removeLastItemMargin=function(){this._core.$stage.children().last().css("margin",0);
var e=0;
this._core.$stage.children().each(function(){e+=d(this).outerWidth(true)
});
this._core.$stage.css("width",e+"px")
};
b.prototype.watchBoundaries=function(){var g=this._core.$element.width();
var e=this._core.$stage.width();
var f=g-e;
if(e<g){return
}var h=this._core._pipe.find(function(i){return i.filter[0]==="position"&&i.filter.length===1
});
if(!h){return
}this._core.maximalTransformValue=f;
h.run=d.proxy(function(){if(this.coordinates(this._current)<this.maximalTransformValue){this.animate(this.maximalTransformValue)
}else{this.animate(this.coordinates(this._current))
}},this._core)
};
b.prototype.adjustAnimation=function(){if(this._core.options.animation.watchBoundaries){this.watchBoundaries()
}this._core.animate=function(g){var e=this.options.animation.watchBoundaries,f=this.options.animation.onAnimationCallback;
if(e&&this.$element.width()>=this.$stage.width()){return
}if(f){f(g)
}this.animateCopy(g)
}
};
b.prototype.addProgressEventListener=function(){var e=d.proxy(function(f){if(!f.detail||typeof f.detail.transform!=="number"){return
}this._speed=f.detail.speed||0;
this.animate(parseInt(f.detail.transform))
},this._core);
this._core.$element[0].addEventListener("progress.owl.carousel",e)
};
b.prototype.adjustCarousel=function(){if(!this._core){return
}var e=this._core.options.removeLastItemMargin,f=this._core.options.animation,g=this._core.options.trackProgressEvent;
if(!this._core.animateCopy){this._core.animateCopy=this._core.animate
}if(e){this.removeLastItemMargin()
}if(f&&Object.keys(f).length){this.adjustAnimation()
}if(g){this.addProgressEventListener()
}};
d.fn.owlCarousel.Constructor.Plugins.Owl2Extended=b
})(window.jQuery,window,document);
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)
}else{if(typeof exports==="object"){a(require("jquery"))
}else{a(jQuery)
}}}(function(f){var a=/\+/g;
function d(i){return b.raw?i:encodeURIComponent(i)
}function g(i){return b.raw?i:decodeURIComponent(i)
}function h(i){return d(b.json?JSON.stringify(i):String(i))
}function c(i){if(i.indexOf('"')===0){i=i.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")
}try{i=decodeURIComponent(i.replace(a," "));
return b.json?JSON.parse(i):i
}catch(j){}}function e(j,i){var k=b.raw?j:c(j);
return f.isFunction(i)?i(k):k
}var b=f.cookie=function(q,p,v){if(p!==undefined&&!f.isFunction(p)){v=f.extend({},b.defaults,v);
if(typeof v.expires==="number"){var r=v.expires,u=v.expires=new Date();
u.setTime(+u+r*86400000)
}return(document.cookie=[d(q),"=",h(p),v.expires?"; expires="+v.expires.toUTCString():"",v.path?"; path="+v.path:"",v.domain?"; domain="+v.domain:"",v.secure?"; secure":""].join(""))
}var w=q?undefined:{};
var s=document.cookie?document.cookie.split("; "):[];
for(var o=0,m=s.length;
o<m;
o++){var n=s[o].split("=");
var j=g(n.shift());
var k=n.join("=");
if(q&&q===j){w=e(k,p);
break
}if(!q&&(k=e(k))!==undefined){w[j]=k
}}return w
};
b.defaults={};
f.removeCookie=function(j,i){if(f.cookie(j)===undefined){return false
}f.cookie(j,"",f.extend({},i,{expires:-1}));
return !f.cookie(j)
}
}));
/*!
 * jQuery Form Plugin
 * version: 4.2.1
 * Requires jQuery v1.7 or later
 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup
 * Project repository: https://github.com/jquery-form/form
 * Dual licensed under the MIT and LGPLv3 licenses.
 * https://github.com/jquery-form/form#license
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)
}else{if(typeof module==="object"&&module.exports){module.exports=function(b,c){if(typeof c==="undefined"){if(typeof window!=="undefined"){c=require("jquery")
}else{c=require("jquery")(b)
}}a(c);
return c
}
}else{a(jQuery)
}}}(function(g){var f=/\r?\n/g;
var c={};
c.fileapi=g('<input type="file">').get(0).files!==undefined;
c.formdata=(typeof window.FormData!=="undefined");
var e=!!g.fn.prop;
g.fn.attr2=function(){if(!e){return this.attr.apply(this,arguments)
}var h=this.prop.apply(this,arguments);
if((h&&h.jquery)||typeof h==="string"){return h
}return this.attr.apply(this,arguments)
};
g.fn.ajaxSubmit=function(l,M,E,o){if(!this.length){d("ajaxSubmit: skipping submit process - no element selected");
return this
}var j,F,n,r=this;
if(typeof l==="function"){l={success:l}
}else{if(typeof l==="string"||(l===false&&arguments.length>0)){l={url:l,data:M,dataType:E};
if(typeof o==="function"){l.success=o
}}else{if(typeof l==="undefined"){l={}
}}}j=l.method||l.type||this.attr2("method");
F=l.url||this.attr2("action");
n=(typeof F==="string")?g.trim(F):"";
n=n||window.location.href||"";
if(n){n=(n.match(/^([^#]+)/)||[])[1]
}l=g.extend(true,{url:n,success:g.ajaxSettings.success,type:j||g.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},l);
var w={};
this.trigger("form-pre-serialize",[this,l,w]);
if(w.veto){d("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
return this
}if(l.beforeSerialize&&l.beforeSerialize(this,l)===false){d("ajaxSubmit: submit aborted via beforeSerialize callback");
return this
}var p=l.traditional;
if(typeof p==="undefined"){p=g.ajaxSettings.traditional
}var u=[];
var I,J=this.formToArray(l.semantic,u,l.filtering);
if(l.data){var H=g.isFunction(l.data)?l.data(J):l.data;
l.extraData=H;
I=g.param(H,p)
}if(l.beforeSubmit&&l.beforeSubmit(J,this,l)===false){d("ajaxSubmit: submit aborted via beforeSubmit callback");
return this
}this.trigger("form-submit-validate",[J,this,l,w]);
if(w.veto){d("ajaxSubmit: submit vetoed via form-submit-validate trigger");
return this
}var A=g.param(J,p);
if(I){A=(A?(A+"&"+I):I)
}if(l.type.toUpperCase()==="GET"){l.url+=(l.url.indexOf("?")>=0?"&":"?")+A;
l.data=null
}else{l.data=A
}var L=[];
if(l.resetForm){L.push(function(){r.resetForm()
})
}if(l.clearForm){L.push(function(){r.clearForm(l.includeHidden)
})
}if(!l.dataType&&l.target){var m=l.success||function(){};
L.push(function(O,P,N){var k=arguments,q=l.replaceTarget?"replaceWith":"html";
g(l.target)[q](O).each(function(){m.apply(this,k)
})
})
}else{if(l.success){if(g.isArray(l.success)){g.merge(L,l.success)
}else{L.push(l.success)
}}}l.success=function(P,q,Q){var O=l.context||this;
for(var N=0,k=L.length;
N<k;
N++){L[N].apply(O,[P,q,Q||r,r])
}};
if(l.error){var B=l.error;
l.error=function(O,k,q){var N=l.context||this;
B.apply(N,[O,k,q,r])
}
}if(l.complete){var i=l.complete;
l.complete=function(N,k){var q=l.context||this;
i.apply(q,[N,k,r])
}
}var G=g("input[type=file]:enabled",this).filter(function(){return g(this).val()!==""
});
var s=G.length>0;
var D="multipart/form-data";
var z=(r.attr("enctype")===D||r.attr("encoding")===D);
var y=c.fileapi&&c.formdata;
d("fileAPI :"+y);
var t=(s||z)&&!y;
var x;
if(l.iframe!==false&&(l.iframe||t)){if(l.closeKeepAlive){g.get(l.closeKeepAlive,function(){x=K(J)
})
}else{x=K(J)
}}else{if((s||z)&&y){x=v(J)
}else{x=g.ajax(l)
}}r.removeData("jqxhr").data("jqxhr",x);
for(var C=0;
C<u.length;
C++){u[C]=null
}this.trigger("form-submit-notify",[this,l]);
return this;
function h(P){var Q=g.param(P,l.traditional).split("&");
var q=Q.length;
var k=[];
var O,N;
for(O=0;
O<q;
O++){Q[O]=Q[O].replace(/\+/g," ");
N=Q[O].split("=");
k.push([decodeURIComponent(N[0]),decodeURIComponent(N[1])])
}return k
}function v(q){var k=new FormData();
for(var N=0;
N<q.length;
N++){k.append(q[N].name,q[N].value)
}if(l.extraData){var Q=h(l.extraData);
for(N=0;
N<Q.length;
N++){if(Q[N]){k.append(Q[N][0],Q[N][1])
}}}l.data=null;
var P=g.extend(true,{},g.ajaxSettings,l,{contentType:false,processData:false,cache:false,type:j||"POST"});
if(l.uploadProgress){P.xhr=function(){var R=g.ajaxSettings.xhr();
if(R.upload){R.upload.addEventListener("progress",function(V){var U=0;
var S=V.loaded||V.position;
var T=V.total;
if(V.lengthComputable){U=Math.ceil(S/T*100)
}l.uploadProgress(V,S,T,U)
},false)
}return R
}
}P.data=null;
var O=P.beforeSend;
P.beforeSend=function(S,R){if(l.formData){R.data=l.formData
}else{R.data=k
}if(O){O.call(this,S,R)
}};
return g.ajax(P)
}function K(al){var Q=r[0],P,ah,aa,aj,ad,S,V,T,U,ae,ai,Z;
var ap=g.Deferred();
ap.abort=function(aq){T.abort(aq)
};
if(al){for(ah=0;
ah<u.length;
ah++){P=g(u[ah]);
if(e){P.prop("disabled",false)
}else{P.removeAttr("disabled")
}}}aa=g.extend(true,{},g.ajaxSettings,l);
aa.context=aa.context||aa;
ad="jqFormIO"+new Date().getTime();
var an=Q.ownerDocument;
var ag=r.closest("body");
if(aa.iframeTarget){S=g(aa.iframeTarget,an);
ae=S.attr2("name");
if(!ae){S.attr2("name",ad)
}else{ad=ae
}}else{S=g('<iframe name="'+ad+'" src="'+aa.iframeSrc+'" />',an);
S.css({position:"absolute",top:"-1000px",left:"-1000px"})
}V=S[0];
T={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(aq){var ar=(aq==="timeout"?"timeout":"aborted");
d("aborting upload... "+ar);
this.aborted=1;
try{if(V.contentWindow.document.execCommand){V.contentWindow.document.execCommand("Stop")
}}catch(at){}S.attr("src",aa.iframeSrc);
T.error=ar;
if(aa.error){aa.error.call(aa.context,T,ar,aq)
}if(aj){g.event.trigger("ajaxError",[T,aa,ar])
}if(aa.complete){aa.complete.call(aa.context,T,ar)
}}};
aj=aa.global;
if(aj&&g.active++===0){g.event.trigger("ajaxStart")
}if(aj){g.event.trigger("ajaxSend",[T,aa])
}if(aa.beforeSend&&aa.beforeSend.call(aa.context,T,aa)===false){if(aa.global){g.active--
}ap.reject();
return ap
}if(T.aborted){ap.reject();
return ap
}U=Q.clk;
if(U){ae=U.name;
if(ae&&!U.disabled){aa.extraData=aa.extraData||{};
aa.extraData[ae]=U.value;
if(U.type==="image"){aa.extraData[ae+".x"]=Q.clk_x;
aa.extraData[ae+".y"]=Q.clk_y
}}}var Y=1;
var W=2;
function X(at){var ar=null;
try{if(at.contentWindow){ar=at.contentWindow.document
}}catch(aq){d("cannot get iframe.contentWindow document: "+aq)
}if(ar){return ar
}try{ar=at.contentDocument?at.contentDocument:at.document
}catch(aq){d("cannot get iframe.contentDocument: "+aq);
ar=at.document
}return ar
}var O=g("meta[name=csrf-token]").attr("content");
var N=g("meta[name=csrf-param]").attr("content");
if(N&&O){aa.extraData=aa.extraData||{};
aa.extraData[N]=O
}function af(){var az=r.attr2("target"),av=r.attr2("action"),at="multipart/form-data",aw=r.attr("enctype")||r.attr("encoding")||at;
Q.setAttribute("target",ad);
if(!j||/post/i.test(j)){Q.setAttribute("method","POST")
}if(av!==aa.url){Q.setAttribute("action",aa.url)
}if(!aa.skipEncodingOverride&&(!j||/post/i.test(j))){r.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"})
}if(aa.timeout){Z=setTimeout(function(){ai=true;
ac(Y)
},aa.timeout)
}function ax(){try{var aA=X(V).readyState;
d("state = "+aA);
if(aA&&aA.toLowerCase()==="uninitialized"){setTimeout(ax,50)
}}catch(aB){d("Server abort: ",aB," (",aB.name,")");
ac(W);
if(Z){clearTimeout(Z)
}Z=undefined
}}var ay=[];
try{if(aa.extraData){for(var ar in aa.extraData){if(aa.extraData.hasOwnProperty(ar)){if(g.isPlainObject(aa.extraData[ar])&&aa.extraData[ar].hasOwnProperty("name")&&aa.extraData[ar].hasOwnProperty("value")){ay.push(g('<input type="hidden" name="'+aa.extraData[ar].name+'">',an).val(aa.extraData[ar].value).appendTo(Q)[0])
}else{ay.push(g('<input type="hidden" name="'+ar+'">',an).val(aa.extraData[ar]).appendTo(Q)[0])
}}}}if(!aa.iframeTarget){S.appendTo(ag)
}if(V.attachEvent){V.attachEvent("onload",ac)
}else{V.addEventListener("load",ac,false)
}setTimeout(ax,15);
try{Q.submit()
}catch(au){var aq=document.createElement("form").submit;
aq.apply(Q)
}}finally{Q.setAttribute("action",av);
Q.setAttribute("enctype",aw);
if(az){Q.setAttribute("target",az)
}else{r.removeAttr("target")
}g(ay).remove()
}}if(aa.forceSync){af()
}else{setTimeout(af,10)
}var am,ao,ak=50,R;
function ac(ax){if(T.aborted||R){return
}ao=X(V);
if(!ao){d("cannot access response document");
ax=W
}if(ax===Y&&T){T.abort("timeout");
ap.reject(T,"timeout");
return
}else{if(ax===W&&T){T.abort("server abort");
ap.reject(T,"error","server abort");
return
}}if(!ao||ao.location.href===aa.iframeSrc){if(!ai){return
}}if(V.detachEvent){V.detachEvent("onload",ac)
}else{V.removeEventListener("load",ac,false)
}var av="success",az;
try{if(ai){throw"timeout"
}var au=aa.dataType==="xml"||ao.XMLDocument||g.isXMLDoc(ao);
d("isXml="+au);
if(!au&&window.opera&&(ao.body===null||!ao.body.innerHTML)){if(--ak){d("requeing onLoad callback, DOM not available");
setTimeout(ac,250);
return
}}var aA=ao.body?ao.body:ao.documentElement;
T.responseText=aA?aA.innerHTML:null;
T.responseXML=ao.XMLDocument?ao.XMLDocument:ao;
if(au){aa.dataType="xml"
}T.getResponseHeader=function(aD){var aC={"content-type":aa.dataType};
return aC[aD.toLowerCase()]
};
if(aA){T.status=Number(aA.getAttribute("status"))||T.status;
T.statusText=aA.getAttribute("statusText")||T.statusText
}var aq=(aa.dataType||"").toLowerCase();
var ay=/(json|script|text)/.test(aq);
if(ay||aa.textarea){var aw=ao.getElementsByTagName("textarea")[0];
if(aw){T.responseText=aw.value;
T.status=Number(aw.getAttribute("status"))||T.status;
T.statusText=aw.getAttribute("statusText")||T.statusText
}else{if(ay){var ar=ao.getElementsByTagName("pre")[0];
var aB=ao.getElementsByTagName("body")[0];
if(ar){T.responseText=ar.textContent?ar.textContent:ar.innerText
}else{if(aB){T.responseText=aB.textContent?aB.textContent:aB.innerText
}}}}}else{if(aq==="xml"&&!T.responseXML&&T.responseText){T.responseXML=ab(T.responseText)
}}try{am=k(T,aq,aa)
}catch(at){av="parsererror";
T.error=az=(at||av)
}}catch(at){d("error caught: ",at);
av="error";
T.error=az=(at||av)
}if(T.aborted){d("upload aborted");
av=null
}if(T.status){av=((T.status>=200&&T.status<300)||T.status===304)?"success":"error"
}if(av==="success"){if(aa.success){aa.success.call(aa.context,am,"success",T)
}ap.resolve(T.responseText,"success",T);
if(aj){g.event.trigger("ajaxSuccess",[T,aa])
}}else{if(av){if(typeof az==="undefined"){az=T.statusText
}if(aa.error){aa.error.call(aa.context,T,av,az)
}ap.reject(T,"error",az);
if(aj){g.event.trigger("ajaxError",[T,aa,az])
}}}if(aj){g.event.trigger("ajaxComplete",[T,aa])
}if(aj&&!--g.active){g.event.trigger("ajaxStop")
}if(aa.complete){aa.complete.call(aa.context,T,av)
}R=true;
if(aa.timeout){clearTimeout(Z)
}setTimeout(function(){if(!aa.iframeTarget){S.remove()
}else{S.attr("src",aa.iframeSrc)
}T.responseXML=null
},100)
}var ab=g.parseXML||function(aq,ar){if(window.ActiveXObject){ar=new ActiveXObject("Microsoft.XMLDOM");
ar.async="false";
ar.loadXML(aq)
}else{ar=(new DOMParser()).parseFromString(aq,"text/xml")
}return(ar&&ar.documentElement&&ar.documentElement.nodeName!=="parsererror")?ar:null
};
var q=g.parseJSON||function(aq){return window["eval"]("("+aq+")")
};
var k=function(aw,au,at){var ar=aw.getResponseHeader("content-type")||"",aq=((au==="xml"||!au)&&ar.indexOf("xml")>=0),av=aq?aw.responseXML:aw.responseText;
if(aq&&av.documentElement.nodeName==="parsererror"){if(g.error){g.error("parsererror")
}}if(at&&at.dataFilter){av=at.dataFilter(av,au)
}if(typeof av==="string"){if((au==="json"||!au)&&ar.indexOf("json")>=0){av=q(av)
}else{if((au==="script"||!au)&&ar.indexOf("javascript")>=0){g.globalEval(av)
}}}return av
};
return ap
}};
g.fn.ajaxForm=function(i,j,h,l){if(typeof i==="string"||(i===false&&arguments.length>0)){i={url:i,data:j,dataType:h};
if(typeof l==="function"){i.success=l
}}i=i||{};
i.delegation=i.delegation&&g.isFunction(g.fn.on);
if(!i.delegation&&this.length===0){var k={s:this.selector,c:this.context};
if(!g.isReady&&k.s){d("DOM not ready, queuing ajaxForm");
g(function(){g(k.s,k.c).ajaxForm(i)
});
return this
}d("terminating; zero elements found by selector"+(g.isReady?"":" (DOM not ready)"));
return this
}if(i.delegation){g(document).off("submit.form-plugin",this.selector,b).off("click.form-plugin",this.selector,a).on("submit.form-plugin",this.selector,i,b).on("click.form-plugin",this.selector,i,a);
return this
}return this.ajaxFormUnbind().on("submit.form-plugin",i,b).on("click.form-plugin",i,a)
};
function b(i){var h=i.data;
if(!i.isDefaultPrevented()){i.preventDefault();
g(i.target).closest("form").ajaxSubmit(h)
}}function a(l){var k=l.target;
var i=g(k);
if(!i.is("[type=submit],[type=image]")){var h=i.closest("[type=submit]");
if(h.length===0){return
}k=h[0]
}var j=k.form;
j.clk=k;
if(k.type==="image"){if(typeof l.offsetX!=="undefined"){j.clk_x=l.offsetX;
j.clk_y=l.offsetY
}else{if(typeof g.fn.offset==="function"){var m=i.offset();
j.clk_x=l.pageX-m.left;
j.clk_y=l.pageY-m.top
}else{j.clk_x=l.pageX-k.offsetLeft;
j.clk_y=l.pageY-k.offsetTop
}}}setTimeout(function(){j.clk=j.clk_x=j.clk_y=null
},100)
}g.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")
};
g.fn.formToArray=function(p,s,A){var B=[];
if(this.length===0){return B
}var l=this[0];
var C=this.attr("id");
var m=(p||typeof l.elements==="undefined")?l.getElementsByTagName("*"):l.elements;
var z;
if(m){m=g.makeArray(m)
}if(C&&(p||/(Edge|Trident)\//.test(navigator.userAgent))){z=g(':input[form="'+C+'"]').get();
if(z.length){m=(m||[]).concat(z)
}}if(!m||!m.length){return B
}if(g.isFunction(A)){m=g.map(m,A)
}var y,w,u,r,k,x,t;
for(y=0,x=m.length;
y<x;
y++){k=m[y];
u=k.name;
if(!u||k.disabled){continue
}if(p&&l.clk&&k.type==="image"){if(l.clk===k){B.push({name:u,value:g(k).val(),type:k.type});
B.push({name:u+".x",value:l.clk_x},{name:u+".y",value:l.clk_y})
}continue
}r=g.fieldValue(k,true);
if(r&&r.constructor===Array){if(s){s.push(k)
}for(w=0,t=r.length;
w<t;
w++){B.push({name:u,value:r[w]})
}}else{if(c.fileapi&&k.type==="file"){if(s){s.push(k)
}var o=k.files;
if(o.length){for(w=0;
w<o.length;
w++){B.push({name:u,value:o[w],type:k.type})
}}else{B.push({name:u,value:"",type:k.type})
}}else{if(r!==null&&typeof r!=="undefined"){if(s){s.push(k)
}B.push({name:u,value:r,type:k.type,required:k.required})
}}}}if(!p&&l.clk){var h=g(l.clk),q=h[0];
u=q.name;
if(u&&!q.disabled&&q.type==="image"){B.push({name:u,value:h.val()});
B.push({name:u+".x",value:l.clk_x},{name:u+".y",value:l.clk_y})
}}return B
};
g.fn.formSerialize=function(h){return g.param(this.formToArray(h))
};
g.fn.fieldSerialize=function(i){var h=[];
this.each(function(){var m=this.name;
if(!m){return
}var k=g.fieldValue(this,i);
if(k&&k.constructor===Array){for(var l=0,j=k.length;
l<j;
l++){h.push({name:m,value:k[l]})
}}else{if(k!==null&&typeof k!=="undefined"){h.push({name:this.name,value:k})
}}});
return g.param(h)
};
g.fn.fieldValue=function(n){for(var m=[],k=0,h=this.length;
k<h;
k++){var l=this[k];
var j=g.fieldValue(l,n);
if(j===null||typeof j==="undefined"||(j.constructor===Array&&!j.length)){continue
}if(j.constructor===Array){g.merge(m,j)
}else{m.push(j)
}}return m
};
g.fieldValue=function(h,p){var k=h.name,w=h.type,x=h.tagName.toLowerCase();
if(typeof p==="undefined"){p=true
}if(p&&(!k||h.disabled||w==="reset"||w==="button"||(w==="checkbox"||w==="radio")&&!h.checked||(w==="submit"||w==="image")&&h.form&&h.form.clk!==h||x==="select"&&h.selectedIndex===-1)){return null
}if(x==="select"){var q=h.selectedIndex;
if(q<0){return null
}var s=[],j=h.options;
var m=(w==="select-one");
var r=(m?q+1:j.length);
for(var l=(m?q:0);
l<r;
l++){var o=j[l];
if(o.selected&&!o.disabled){var u=o.value;
if(!u){u=(o.attributes&&o.attributes.value&&!(o.attributes.value.specified))?o.text:o.value
}if(m){return u
}s.push(u)
}}return s
}return g(h).val().replace(f,"\r\n")
};
g.fn.clearForm=function(h){return this.each(function(){g("input,select,textarea",this).clearFields(h)
})
};
g.fn.clearFields=g.fn.clearInputs=function(h){var i=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
return this.each(function(){var k=this.type,j=this.tagName.toLowerCase();
if(i.test(k)||j==="textarea"){this.value=""
}else{if(k==="checkbox"||k==="radio"){this.checked=false
}else{if(j==="select"){this.selectedIndex=-1
}else{if(k==="file"){if(/MSIE/.test(navigator.userAgent)){g(this).replaceWith(g(this).clone(true))
}else{g(this).val("")
}}else{if(h){if((h===true&&/hidden/.test(k))||(typeof h==="string"&&g(this).is(h))){this.value=""
}}}}}}})
};
g.fn.resetForm=function(){return this.each(function(){var j=g(this);
var i=this.tagName.toLowerCase();
switch(i){case"input":this.checked=this.defaultChecked;
case"textarea":this.value=this.defaultValue;
return true;
case"option":case"optgroup":var h=j.parents("select");
if(h.length&&h[0].multiple){if(i==="option"){this.selected=this.defaultSelected
}else{j.find("option").resetForm()
}}else{h.resetForm()
}return true;
case"select":j.find("option").each(function(m){this.selected=this.defaultSelected;
if(this.defaultSelected&&!j[0].multiple){j[0].selectedIndex=m;
return false
}});
return true;
case"label":var k=g(j.attr("for"));
var l=j.find("input,select,textarea");
if(k[0]){l.unshift(k[0])
}l.resetForm();
return true;
case"form":if(typeof this.reset==="function"||(typeof this.reset==="object"&&!this.reset.nodeType)){this.reset()
}return true;
default:j.find("form,input,label,select,textarea").resetForm();
return true
}})
};
g.fn.enable=function(h){if(typeof h==="undefined"){h=true
}return this.each(function(){this.disabled=!h
})
};
g.fn.selected=function(h){if(typeof h==="undefined"){h=true
}return this.each(function(){var i=this.type;
if(i==="checkbox"||i==="radio"){this.checked=h
}else{if(this.tagName.toLowerCase()==="option"){var j=g(this).parent("select");
if(h&&j[0]&&j[0].type==="select-one"){j.find("option").selected(false)
}this.selected=h
}}})
};
g.fn.ajaxSubmit.debug=false;
function d(){if(!g.fn.ajaxSubmit.debug){return
}var h="[jquery.form] "+Array.prototype.join.call(arguments,"");
if(window.console&&window.console.log){window.console.log(h)
}else{if(window.opera&&window.opera.postError){window.opera.postError(h)
}}}}));
(function(){var j,i=[];
function h(f){i.push(f);
1==i.length&&j()
}function e(){for(;
i.length;
){i[0](),i.shift()
}}j=function(){setTimeout(e)
};
function d(g){this.a=c;
this.b=void 0;
this.f=[];
var f=this;
try{g(function(m){b(f,m)
},function(m){a(f,m)
})
}catch(l){a(f,l)
}}var c=2;
function z(f){return new d(function(g,l){l(f)
})
}function y(f){return new d(function(g){g(f)
})
}function b(g,f){if(g.a==c){if(f==g){throw new TypeError
}var n=!1;
try{var m=f&&f.then;
if(null!=f&&"object"==typeof f&&"function"==typeof m){m.call(f,function(p){n||b(g,p);
n=!0
},function(p){n||a(g,p);
n=!0
});
return
}}catch(l){n||a(g,l);
return
}g.a=0;
g.b=f;
s(g)
}}function a(g,f){if(g.a==c){if(f==g){throw new TypeError
}g.a=1;
g.b=f;
s(g)
}}function s(f){h(function(){if(f.a!=c){for(;
f.f.length;
){var g=f.f.shift(),p=g[0],n=g[1],m=g[2],g=g[3];
try{0==f.a?"function"==typeof p?m(p.call(void 0,f.b)):m(f.b):1==f.a&&("function"==typeof n?m(n.call(void 0,f.b)):g(f.b))
}catch(l){g(l)
}}}})
}d.prototype.g=function(f){return this.c(void 0,f)
};
d.prototype.c=function(g,f){var l=this;
return new d(function(n,m){l.f.push([g,f,n,m]);
s(l)
})
};
function o(f){return new d(function(g,q){function p(r){return function(t){m[r]=t;
n+=1;
n==f.length&&g(m)
}
}var n=0,m=[];
0==f.length&&g(m);
for(var l=0;
l<f.length;
l+=1){y(f[l]).c(p(l),q)
}})
}function k(f){return new d(function(g,m){for(var l=0;
l<f.length;
l+=1){y(f[l]).c(g,m)
}})
}window.Promise||(window.Promise=d,window.Promise.resolve=y,window.Promise.reject=z,window.Promise.race=k,window.Promise.all=o,window.Promise.prototype.then=d.prototype.c,window.Promise.prototype["catch"]=d.prototype.g)
}());
(function(){function f(m,l){document.addEventListener?m.addEventListener("scroll",l,!1):m.attachEvent("scroll",l)
}function e(l){document.body?l():document.addEventListener?document.addEventListener("DOMContentLoaded",function r(){document.removeEventListener("DOMContentLoaded",r);
l()
}):document.attachEvent("onreadystatechange",function m(){if("interactive"==document.readyState||"complete"==document.readyState){document.detachEvent("onreadystatechange",m),l()
}})
}function a(l){this.a=document.createElement("div");
this.a.setAttribute("aria-hidden","true");
this.a.appendChild(document.createTextNode(l));
this.b=document.createElement("span");
this.c=document.createElement("span");
this.h=document.createElement("span");
this.f=document.createElement("span");
this.g=-1;
this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";
this.b.appendChild(this.h);
this.c.appendChild(this.f);
this.a.appendChild(this.b);
this.a.appendChild(this.c)
}function p(m,l){m.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+l+";"
}function j(m){var l=m.a.offsetWidth,r=l+100;
m.f.style.width=r+"px";
m.c.scrollLeft=r;
m.b.scrollLeft=m.b.scrollWidth+100;
return m.g!==l?(m.g=l,!0):!1
}function h(m,l){function s(){var t=r;
j(t)&&t.a.parentNode&&l(t.g)
}var r=m;
f(m.b,s);
f(m.c,s);
j(m)
}function d(m,l){var r=l||{};
this.family=m;
this.style=r.style||"normal";
this.weight=r.weight||"normal";
this.stretch=r.stretch||"normal"
}var c=null,b=null,q=null,o=null;
function n(){if(null===b){if(k()&&/Apple/.test(window.navigator.vendor)){var l=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);
b=!!l&&603>parseInt(l[1],10)
}else{b=!1
}}return b
}function k(){null===o&&(o=!!document.fonts);
return o
}function i(){if(null===q){var m=document.createElement("div");
try{m.style.font="condensed 100px sans-serif"
}catch(l){}q=""!==m.style.font
}return q
}function g(m,l){return[m.style,m.weight,i()?m.stretch:"","100px",l].join(" ")
}d.prototype.load=function(m,l){var v=this,r=m||"BESbswy",t=0,u=l||3000,s=(new Date).getTime();
return new Promise(function(x,w){if(k()&&!n()){var z=new Promise(function(B,A){function C(){(new Date).getTime()-s>=u?A():document.fonts.load(g(v,'"'+v.family+'"'),r).then(function(D){1<=D.length?B():setTimeout(C,25)
},function(){A()
})
}C()
}),y=new Promise(function(A,B){t=setTimeout(B,u)
});
Promise.race([y,z]).then(function(){clearTimeout(t);
x(v)
},function(){w(v)
})
}else{e(function(){function M(){var I;
if(I=-1!=E&&-1!=D||-1!=E&&-1!=C||-1!=D&&-1!=C){(I=E!=D&&E!=C&&D!=C)||(null===c&&(I=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),c=!!I&&(536>parseInt(I[1],10)||536===parseInt(I[1],10)&&11>=parseInt(I[2],10))),I=c&&(E==L&&D==L&&C==L||E==J&&D==J&&C==J||E==H&&D==H&&C==H)),I=!I
}I&&(G.parentNode&&G.parentNode.removeChild(G),clearTimeout(t),x(v))
}function K(){if((new Date).getTime()-s>=u){G.parentNode&&G.parentNode.removeChild(G),w(v)
}else{var I=document.hidden;
if(!0===I||void 0===I){E=F.a.offsetWidth,D=B.a.offsetWidth,C=A.a.offsetWidth,M()
}t=setTimeout(K,50)
}}var F=new a(r),B=new a(r),A=new a(r),E=-1,D=-1,C=-1,L=-1,J=-1,H=-1,G=document.createElement("div");
G.dir="ltr";
p(F,g(v,"sans-serif"));
p(B,g(v,"serif"));
p(A,g(v,"monospace"));
G.appendChild(F.a);
G.appendChild(B.a);
G.appendChild(A.a);
document.body.appendChild(G);
L=F.a.offsetWidth;
J=B.a.offsetWidth;
H=A.a.offsetWidth;
K();
h(F,function(I){E=I;
M()
});
p(F,g(v,'"'+v.family+'",sans-serif'));
h(B,function(I){D=I;
M()
});
p(B,g(v,'"'+v.family+'",serif'));
h(A,function(I){C=I;
M()
});
p(A,g(v,'"'+v.family+'",monospace'))
})
}})
};
"object"===typeof module?module.exports=d:(window.FontFaceObserver=d,window.FontFaceObserver.prototype.load=d.prototype.load)
}());
/*!
 * SelectWoo 1.0.1
 * https://github.com/woocommerce/selectWoo
 *
 * Released under the MIT license
 * https://github.com/woocommerce/selectWoo/blob/master/LICENSE.md
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)
}else{if(typeof module==="object"&&module.exports){module.exports=function(b,c){if(c===undefined){if(typeof window!=="undefined"){c=require("jquery")
}else{c=require("jquery")(b)
}}a(c);
return c
}
}else{a(jQuery)
}}}(function(c){var b=(function(){if(c&&c.fn&&c.fn.select2&&c.fn.select2.amd){var d=c.fn.select2.amd
}var d;
(function(){if(!d||!d.requirejs){if(!d){d={}
}else{e=d
}var f,e,g;
(function(l){var o,h,t,u,k={},j={},A={},x={},s=Object.prototype.hasOwnProperty,p=[].slice,r=/\.js$/;
function B(C,D){return s.call(C,D)
}function v(F,D){var N,J,H,K,O,G,Q,S,M,L,I,R,P=D&&D.split("/"),E=A.map,C=(E&&E["*"])||{};
if(F){F=F.split("/");
O=F.length-1;
if(A.nodeIdCompat&&r.test(F[O])){F[O]=F[O].replace(r,"")
}if(F[0].charAt(0)==="."&&P){R=P.slice(0,P.length-1);
F=R.concat(F)
}for(M=0;
M<F.length;
M++){I=F[M];
if(I==="."){F.splice(M,1);
M-=1
}else{if(I===".."){if(M===0||(M===1&&F[2]==="..")||F[M-1]===".."){continue
}else{if(M>0){F.splice(M-1,2);
M-=2
}}}}}F=F.join("/")
}if((P||C)&&E){N=F.split("/");
for(M=N.length;
M>0;
M-=1){J=N.slice(0,M).join("/");
if(P){for(L=P.length;
L>0;
L-=1){H=E[P.slice(0,L).join("/")];
if(H){H=H[J];
if(H){K=H;
G=M;
break
}}}}if(K){break
}if(!Q&&C&&C[J]){Q=C[J];
S=M
}}if(!K&&Q){K=Q;
G=S
}if(K){N.splice(0,G,K);
F=N.join("/")
}}return F
}function z(C,D){return function(){var E=p.call(arguments,0);
if(typeof E[0]!=="string"&&E.length===1){E.push(null)
}return h.apply(l,E.concat([C,D]))
}
}function w(C){return function(D){return v(D,C)
}
}function m(C){return function(D){k[C]=D
}
}function n(D){if(B(j,D)){var C=j[D];
delete j[D];
x[D]=true;
o.apply(l,C)
}if(!B(k,D)&&!B(x,D)){throw new Error("No "+D)
}return k[D]
}function y(D){var E,C=D?D.indexOf("!"):-1;
if(C>-1){E=D.substring(0,C);
D=D.substring(C+1,D.length)
}return[E,D]
}function q(C){return C?y(C):[]
}t=function(C,F){var D,G=y(C),E=G[0],H=F[1];
C=G[1];
if(E){E=v(E,H);
D=n(E)
}if(E){if(D&&D.normalize){C=D.normalize(C,w(H))
}else{C=v(C,H)
}}else{C=v(C,H);
G=y(C);
E=G[0];
C=G[1];
if(E){D=n(E)
}}return{f:E?E+"!"+C:C,n:C,pr:E,p:D}
};
function i(C){return function(){return(A&&A.config&&A.config[C])||{}
}
}u={require:function(C){return z(C)
},exports:function(C){var D=k[C];
if(typeof D!=="undefined"){return D
}else{return(k[C]={})
}},module:function(C){return{id:C,uri:"",exports:k[C],config:i(C)}
}};
o=function(D,O,N,M){var H,L,I,C,F,G,J=[],E=typeof N,K;
M=M||D;
G=q(M);
if(E==="undefined"||E==="function"){O=!O.length&&N.length?["require","exports","module"]:O;
for(F=0;
F<O.length;
F+=1){C=t(O[F],G);
L=C.f;
if(L==="require"){J[F]=u.require(D)
}else{if(L==="exports"){J[F]=u.exports(D);
K=true
}else{if(L==="module"){H=J[F]=u.module(D)
}else{if(B(k,L)||B(j,L)||B(x,L)){J[F]=n(L)
}else{if(C.p){C.p.load(C.n,z(M,true),m(L),{});
J[F]=k[L]
}else{throw new Error(D+" missing "+L)
}}}}}}I=N?N.apply(k[D],J):undefined;
if(D){if(H&&H.exports!==l&&H.exports!==k[D]){k[D]=H.exports
}else{if(I!==l||!K){k[D]=I
}}}}else{if(D){k[D]=N
}}};
f=e=h=function(F,G,C,D,E){if(typeof F==="string"){if(u[F]){return u[F](G)
}return n(t(F,q(G)).f)
}else{if(!F.splice){A=F;
if(A.deps){h(A.deps,A.callback)
}if(!G){return
}if(G.splice){F=G;
G=C;
C=null
}else{F=l
}}}G=G||function(){};
if(typeof C==="function"){C=D;
D=E
}if(D){o(l,F,G,C)
}else{setTimeout(function(){o(l,F,G,C)
},4)
}return h
};
h.config=function(C){return h(C)
};
f._defined=k;
g=function(C,D,E){if(typeof C!=="string"){throw new Error("See almond README: incorrect module build, no module name")
}if(!D.splice){E=D;
D=[]
}if(!B(k,C)&&!B(j,C)){j[C]=[C,D,E]
}};
g.amd={jQuery:true}
}());
d.requirejs=f;
d.require=e;
d.define=g
}}());
d.define("almond",function(){});
d.define("jquery",[],function(){var e=c||$;
if(e==null&&console&&console.error){console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page.")
}return e
});
d.define("select2/utils",["jquery"],function(h){var g={};
g.Extend=function(m,j){var k={}.hasOwnProperty;
function i(){this.constructor=m
}for(var l in j){if(k.call(j,l)){m[l]=j[l]
}}i.prototype=j.prototype;
m.prototype=new i();
m.__super__=j.prototype;
return m
};
function f(n){var l=n.prototype;
var k=[];
for(var j in l){var i=l[j];
if(typeof i!=="function"){continue
}if(j==="constructor"){continue
}k.push(j)
}return k
}g.Decorate=function(q,p){var o=f(p);
var n=f(q);
function t(){var u=Array.prototype.unshift;
var v=p.prototype.constructor.length;
var m=q.prototype.constructor;
if(v>0){u.call(arguments,q.prototype.constructor);
m=p.prototype.constructor
}m.apply(this,arguments)
}p.displayName=q.displayName;
function i(){this.constructor=t
}t.prototype=new i();
for(var l=0;
l<n.length;
l++){var j=n[l];
t.prototype[j]=q.prototype[j]
}var s=function(m){var u=function(){};
if(m in t.prototype){u=t.prototype[m]
}var v=p.prototype[m];
return function(){var w=Array.prototype.unshift;
w.call(arguments,u);
return v.apply(this,arguments)
}
};
for(var r=0;
r<o.length;
r++){var k=o[r];
t.prototype[k]=s(k)
}return t
};
var e=function(){this.listeners={}
};
e.prototype.on=function(i,j){this.listeners=this.listeners||{};
if(i in this.listeners){this.listeners[i].push(j)
}else{this.listeners[i]=[j]
}};
e.prototype.trigger=function(i){var k=Array.prototype.slice;
var j=k.call(arguments,1);
this.listeners=this.listeners||{};
if(j==null){j=[]
}if(j.length===0){j.push({})
}j[0]._type=i;
if(i in this.listeners){this.invoke(this.listeners[i],k.call(arguments,1))
}if("*" in this.listeners){this.invoke(this.listeners["*"],arguments)
}};
e.prototype.invoke=function(l,m){for(var k=0,j=l.length;
k<j;
k++){l[k].apply(this,m)
}};
g.Observable=e;
g.generateChars=function(m){var l="";
for(var k=0;
k<m;
k++){var j=Math.floor(Math.random()*36);
l+=j.toString(36)
}return l
};
g.bind=function(j,i){return function(){j.apply(i,arguments)
}
};
g._convertData=function(o){for(var n in o){var m=n.split("-");
var i=o;
if(m.length===1){continue
}for(var j=0;
j<m.length;
j++){var l=m[j];
l=l.substring(0,1).toLowerCase()+l.substring(1);
if(!(l in i)){i[l]={}
}if(j==m.length-1){i[l]=o[n]
}i=i[l]
}delete o[n]
}return o
};
g.hasScroll=function(k,m){var l=h(m);
var j=m.style.overflowX;
var i=m.style.overflowY;
if(j===i&&(i==="hidden"||i==="visible")){return false
}if(j==="scroll"||i==="scroll"){return true
}return(l.innerHeight()<m.scrollHeight||l.innerWidth()<m.scrollWidth)
};
g.escapeMarkup=function(i){var j={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};
if(typeof i!=="string"){return i
}return String(i).replace(/[&<>"'\/\\]/g,function(k){return j[k]
})
};
g.appendMany=function(i,k){if(h.fn.jquery.substr(0,3)==="1.7"){var j=h();
h.map(k,function(l){j=j.add(l)
});
k=j
}i.append(k)
};
g.isTouchscreen=function(){if("undefined"===typeof g._isTouchscreenCache){g._isTouchscreenCache="ontouchstart" in document.documentElement
}return g._isTouchscreenCache
};
return g
});
d.define("select2/results",["jquery","./utils"],function(g,f){function e(h,i,j){this.$element=h;
this.data=j;
this.options=i;
e.__super__.constructor.call(this)
}f.Extend(e,f.Observable);
e.prototype.render=function(){var h=g('<ul class="select2-results__options" role="listbox" tabindex="-1"></ul>');
if(this.options.get("multiple")){h.attr("aria-multiselectable","true")
}this.$results=h;
return h
};
e.prototype.clear=function(){this.$results.empty()
};
e.prototype.displayMessage=function(k){var h=this.options.get("escapeMarkup");
this.clear();
this.hideLoading();
var i=g('<li role="alert" aria-live="assertive" class="select2-results__option"></li>');
var j=this.options.get("translations").get(k.message);
i.append(h(j(k.args)));
i[0].className+=" select2-results__message";
this.$results.append(i)
};
e.prototype.hideMessages=function(){this.$results.find(".select2-results__message").remove()
};
e.prototype.append=function(j){this.hideLoading();
var h=[];
if(j.results==null||j.results.length===0){if(this.$results.children().length===0){this.trigger("results:message",{message:"noResults"})
}return
}j.results=this.sort(j.results);
for(var l=0;
l<j.results.length;
l++){var i=j.results[l];
var k=this.option(i);
h.push(k)
}this.$results.append(h)
};
e.prototype.position=function(h,i){var j=i.find(".select2-results");
j.append(h)
};
e.prototype.sort=function(h){var i=this.options.get("sorter");
return i(h)
};
e.prototype.highlightFirstItem=function(){var h=this.$results.find(".select2-results__option[data-selected]");
var i=h.filter("[data-selected=true]");
if(i.length>0){i.first().trigger("mouseenter")
}else{h.first().trigger("mouseenter")
}this.ensureHighlightVisible()
};
e.prototype.setClasses=function(){var h=this;
this.data.current(function(k){var j=g.map(k,function(l){return l.id.toString()
});
var i=h.$results.find(".select2-results__option[data-selected]");
i.each(function(){var m=g(this);
var l=g.data(this,"data");
var n=""+l.id;
if((l.element!=null&&l.element.selected)||(l.element==null&&g.inArray(n,j)>-1)){m.attr("data-selected","true")
}else{m.attr("data-selected","false")
}})
})
};
e.prototype.showLoading=function(j){this.hideLoading();
var i=this.options.get("translations").get("searching");
var k={disabled:true,loading:true,text:i(j)};
var h=this.option(k);
h.className+=" loading-results";
this.$results.prepend(h)
};
e.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()
};
e.prototype.option=function(l){var m=document.createElement("li");
m.className="select2-results__option";
var t={role:"option","data-selected":"false",tabindex:-1};
if(l.disabled){delete t["data-selected"];
t["aria-disabled"]="true"
}if(l.id==null){delete t["data-selected"]
}if(l._resultId!=null){m.id=l._resultId
}if(l.title){m.title=l.title
}if(l.children){t["aria-label"]=l.text;
delete t["data-selected"]
}for(var n in t){var k=t[n];
m.setAttribute(n,k)
}if(l.children){var h=g(m);
var r=document.createElement("strong");
r.className="select2-results__group";
var q=g(r);
this.template(l,r);
q.attr("role","presentation");
var s=[];
for(var p=0;
p<l.children.length;
p++){var j=l.children[p];
var i=this.option(j);
s.push(i)
}var o=g("<ul></ul>",{"class":"select2-results__options select2-results__options--nested",role:"listbox"});
o.append(s);
h.attr("role","list");
h.append(r);
h.append(o)
}else{this.template(l,m)
}g.data(m,"data",l);
return m
};
e.prototype.bind=function(h,j){var i=this;
var k=h.id+"-results";
this.$results.attr("id",k);
h.on("results:all",function(l){i.clear();
i.append(l.data);
if(h.isOpen()){i.setClasses();
i.highlightFirstItem();
i.getHighlightedResults().parent(".select2-results__options--nested").addClass("open");
i.getHighlightedResults().parents(".select2-results__option").addClass("dropdown-cities")
}});
h.on("results:append",function(l){i.append(l.data);
if(h.isOpen()){i.setClasses()
}});
h.on("query",function(l){i.hideMessages();
i.showLoading(l)
});
h.on("select",function(){if(!h.isOpen()){return
}i.setClasses();
i.highlightFirstItem()
});
h.on("unselect",function(){if(!h.isOpen()){return
}i.setClasses();
i.highlightFirstItem()
});
h.on("open",function(){i.$results.attr("aria-expanded","true");
i.$results.attr("aria-hidden","false");
i.setClasses();
i.ensureHighlightVisible()
});
h.on("close",function(){i.$results.attr("aria-expanded","false");
i.$results.attr("aria-hidden","true");
i.$results.removeAttr("aria-activedescendant")
});
h.on("results:toggle",function(){var l=i.getHighlightedResults();
if(l.length===0){return
}l.trigger("mouseup")
});
h.on("results:select",function(){var l=i.getHighlightedResults();
if(l.length===0){return
}var m=l.data("data");
if(l.attr("data-selected")=="true"){i.trigger("close",{})
}else{i.trigger("select",{data:m})
}});
h.on("results:previous",function(){var n=i.getHighlightedResults();
var m=i.$results.find("[data-selected]");
var p=m.index(n);
if(p===0){return
}var l=p-1;
if(n.length===0){l=0
}var o=m.eq(l);
o.parent(".select2-results__options--nested").addClass("open");
o.parents(".select2-results__option").addClass("dropdown-cities");
o.trigger("mouseenter").focus();
var s=i.$results.offset().top;
var r=o.offset().top;
var q=i.$results.scrollTop()+(r-s);
if(l===0){i.$results.scrollTop(0)
}else{if(r-s<0){i.$results.scrollTop(q)
}}});
h.on("results:next",function(){var n=i.getHighlightedResults();
var m=i.$results.find("[data-selected]");
var p=m.index(n);
var l=p+1;
if(l>=m.length){return
}var o=m.eq(l);
o.parent(".select2-results__options--nested").addClass("open");
o.parents(".select2-results__option").addClass("dropdown-cities");
o.trigger("mouseenter").focus();
var s=i.$results.offset().top+i.$results.outerHeight(false);
var r=o.offset().top+o.outerHeight(false);
var q=i.$results.scrollTop()+r-s;
if(l===0){i.$results.scrollTop(0)
}else{if(r>s){i.$results.scrollTop(q)
}}});
h.on("results:focus",function(l){l.element.addClass("select2-results__option--highlighted").attr("aria-selected","true");
i.$results.attr("aria-activedescendant",l.element.attr("id"))
});
h.on("results:message",function(l){i.displayMessage(l)
});
if(g.fn.mousewheel){this.$results.on("mousewheel",function(o){var n=i.$results.scrollTop();
var l=i.$results.get(0).scrollHeight-n+o.deltaY;
var p=o.deltaY>0&&n-o.deltaY<=0;
var m=o.deltaY<0&&l<=i.$results.height();
if(p){i.$results.scrollTop(0);
o.preventDefault();
o.stopPropagation()
}else{if(m){i.$results.scrollTop(i.$results.get(0).scrollHeight-i.$results.height());
o.preventDefault();
o.stopPropagation()
}}})
}this.$results.on("mouseup",".select2-results__option[data-selected]",function(l){var n=g(this);
var m=n.data("data");
if(n.attr("data-selected")==="true"){if(i.options.get("multiple")){i.trigger("unselect",{originalEvent:l,data:m})
}else{i.trigger("close",{})
}return
}i.trigger("select",{originalEvent:l,data:m})
});
this.$results.on("mouseenter",".select2-results__option[data-selected]",function(l){var m=g(this).data("data");
i.getHighlightedResults().removeClass("select2-results__option--highlighted").attr("aria-selected","false");
i.trigger("results:focus",{data:m,element:g(this)})
})
};
e.prototype.getHighlightedResults=function(){var h=this.$results.find(".select2-results__option--highlighted");
return h
};
e.prototype.destroy=function(){this.$results.remove()
};
e.prototype.ensureHighlightVisible=function(){var i=this.getHighlightedResults();
if(i.length===0){return
}var h=this.$results.find("[data-selected]");
var j=h.index(i);
var m=this.$results.offset().top;
var l=i.offset().top;
var k=this.$results.scrollTop()+(l-m);
var n=l-m;
k-=i.outerHeight(false)*2;
if(j<=2){this.$results.scrollTop(0)
}else{if(n>this.$results.outerHeight()||n<0){this.$results.scrollTop(k)
}}};
e.prototype.template=function(i,j){var k=this.options.get("templateResult");
var h=this.options.get("escapeMarkup");
var l=k(i,j);
if(l==null){j.style.display="none"
}else{if(typeof l==="string"){j.innerHTML=h(l)
}else{g(j).append(l)
}}};
return e
});
d.define("select2/keys",[],function(){var e={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46};
return e
});
d.define("select2/selection/base",["jquery","../utils","../keys"],function(h,g,e){function f(i,j){this.$element=i;
this.options=j;
f.__super__.constructor.call(this)
}g.Extend(f,g.Observable);
f.prototype.render=function(){var i=h('<span class="select2-selection"  aria-haspopup="true" aria-expanded="false"></span>');
this._tabindex=0;
if(this.$element.data("old-tabindex")!=null){this._tabindex=this.$element.data("old-tabindex")
}else{if(this.$element.attr("tabindex")!=null){this._tabindex=this.$element.attr("tabindex")
}}i.attr("title",this.$element.attr("title"));
i.attr("tabindex",this._tabindex);
this.$selection=i;
return i
};
f.prototype.bind=function(i,m){var k=this;
var n=i.id+"-container";
var j=i.id+"-results";
var l=this.options.get("minimumResultsForSearch")===Infinity;
this.container=i;
this.$selection.on("focus",function(o){k.trigger("focus",o)
});
this.$selection.on("blur",function(o){k._handleBlur(o)
});
this.$selection.on("keydown",function(o){k.trigger("keypress",o);
if(o.which===e.SPACE){o.preventDefault()
}});
i.on("results:focus",function(o){k.$selection.attr("aria-activedescendant",o.data._resultId)
});
i.on("selection:update",function(o){k.update(o.data)
});
i.on("open",function(){k.$selection.attr("aria-expanded","true");
k.$selection.attr("aria-owns",j);
k._attachCloseHandler(i)
});
i.on("close",function(){k.$selection.attr("aria-expanded","false");
k.$selection.removeAttr("aria-activedescendant");
k.$selection.removeAttr("aria-owns");
k.$selection.focus();
k._detachCloseHandler(i)
});
i.on("enable",function(){k.$selection.attr("tabindex",k._tabindex)
});
i.on("disable",function(){k.$selection.attr("tabindex","-1")
})
};
f.prototype._handleBlur=function(i){var j=this;
window.setTimeout(function(){if((document.activeElement==j.$selection[0])||(h.contains(j.$selection[0],document.activeElement))){return
}j.trigger("blur",i)
},1)
};
f.prototype._attachCloseHandler=function(i){var j=this;
h(document.body).on("mousedown.select2."+i.id,function(n){var k=h(n.target);
var l=k.closest(".select2");
var m=h(".select2.select2-container--open");
m.each(function(){var p=h(this);
if(this==l[0]){return
}var o=p.data("element");
o.select2("close");
setTimeout(function(){p.find("*:focus").blur();
k.focus()
},1)
})
})
};
f.prototype._detachCloseHandler=function(i){h(document.body).off("mousedown.select2."+i.id)
};
f.prototype.position=function(i,k){var j=k.find(".selection");
j.append(i)
};
f.prototype.destroy=function(){this._detachCloseHandler(this.container)
};
f.prototype.update=function(i){throw new Error("The `update` method must be defined in child classes.")
};
return f
});
d.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(h,f,g,e){function i(){i.__super__.constructor.apply(this,arguments)
}g.Extend(i,f);
i.prototype.render=function(){var j=i.__super__.render.call(this);
j.addClass("select2-selection--single");
j.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>');
return j
};
i.prototype.bind=function(j,l){var k=this;
i.__super__.bind.apply(this,arguments);
var m=j.id+"-container";
this.$selection.find(".select2-selection__rendered").attr("role","textbox").attr("aria-readonly","true");
this.$selection.attr("aria-labelledby",m);
this.$selection.attr("role","combobox");
this.$selection.on("mousedown",function(n){if(n.which!==1){return
}k.trigger("toggle",{originalEvent:n})
});
this.$selection.on("focus",function(n){});
this.$selection.on("keydown",function(n){if(!j.isOpen()&&n.which>=48&&n.which<=90){j.open()
}});
this.$selection.on("blur",function(n){});
j.on("focus",function(n){if(!j.isOpen()){k.$selection.focus()
}});
j.on("selection:update",function(n){k.update(n.data)
})
};
i.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()
};
i.prototype.display=function(m,k){var l=this.options.get("templateSelection");
var j=this.options.get("escapeMarkup");
return j(l(m,k))
};
i.prototype.selectionContainer=function(){return h("<span></span>")
};
i.prototype.update=function(l){if(l.length===0){this.clear();
return
}var j=l[0];
var m=this.$selection.find(".select2-selection__rendered");
var k=this.display(j,m);
m.empty().append(k);
m.prop("title",j.title||j.text)
};
return i
});
d.define("select2/selection/multiple",["jquery","./base","../utils"],function(h,e,g){function f(i,j){f.__super__.constructor.apply(this,arguments)
}g.Extend(f,e);
f.prototype.render=function(){var i=f.__super__.render.call(this);
i.addClass("select2-selection--multiple");
i.html('<ul class="select2-selection__rendered" aria-live="polite" aria-relevant="additions removals" aria-atomic="true"></ul>');
return i
};
f.prototype.bind=function(i,k){var j=this;
f.__super__.bind.apply(this,arguments);
this.$selection.on("click",function(l){j.trigger("toggle",{originalEvent:l})
});
this.$selection.on("click",".select2-selection__choice__remove",function(m){if(j.options.get("disabled")){return
}var n=h(this);
var l=n.parent();
var o=l.data("data");
j.trigger("unselect",{originalEvent:m,data:o})
});
this.$selection.on("keydown",function(l){if(!i.isOpen()&&l.which>=48&&l.which<=90){i.open()
}});
i.on("focus",function(){j.focusOnSearch()
})
};
f.prototype.clear=function(){this.$selection.find(".select2-selection__rendered").empty()
};
f.prototype.display=function(l,j){var k=this.options.get("templateSelection");
var i=this.options.get("escapeMarkup");
return i(k(l,j))
};
f.prototype.selectionContainer=function(){var i=h('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation" aria-hidden="true">&times;</span></li>');
return i
};
f.prototype.focusOnSearch=function(){var i=this;
if("undefined"!==typeof i.$search){setTimeout(function(){i._keyUpPrevented=true;
i.$search.focus()
},1)
}};
f.prototype.update=function(m){this.clear();
if(m.length===0){return
}var j=[];
for(var o=0;
o<m.length;
o++){var k=m[o];
var i=this.selectionContainer();
var l=this.display(k,i);
if("string"===typeof l){l=l.trim()
}i.append(l);
i.prop("title",k.title||k.text);
i.data("data",k);
j.push(i)
}var n=this.$selection.find(".select2-selection__rendered");
g.appendMany(n,j)
};
return f
});
d.define("select2/selection/placeholder",["../utils"],function(f){function e(i,g,h){this.placeholder=this.normalizePlaceholder(h.get("placeholder"));
i.call(this,g,h)
}e.prototype.normalizePlaceholder=function(g,h){if(typeof h==="string"){h={id:"",text:h}
}return h
};
e.prototype.createPlaceholder=function(h,i){var g=this.selectionContainer();
g.html(this.display(i));
g.addClass("select2-selection__placeholder").removeClass("select2-selection__choice");
return g
};
e.prototype.update=function(k,j){var h=(j.length==1&&j[0].id!=this.placeholder.id);
var i=j.length>1;
if(i||h){return k.call(this,j)
}this.clear();
var g=this.createPlaceholder(this.placeholder);
this.$selection.find(".select2-selection__rendered").append(g)
};
return e
});
d.define("select2/selection/allowClear",["jquery","../keys"],function(f,e){function g(){}g.prototype.bind=function(j,h,k){var i=this;
j.call(this,h,k);
if(this.placeholder==null){if(this.options.get("debug")&&window.console&&console.error){console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option.")
}}this.$selection.on("mousedown",".select2-selection__clear",function(l){i._handleClear(l)
});
h.on("keypress",function(l){i._handleKeyboardClear(l,h)
})
};
g.prototype._handleClear=function(i,h){if(this.options.get("disabled")){return
}var l=this.$selection.find(".select2-selection__clear");
if(l.length===0){return
}h.stopPropagation();
var k=l.data("data");
for(var m=0;
m<k.length;
m++){var j={data:k[m]};
this.trigger("unselect",j);
if(j.prevented){return
}}this.$element.val(this.placeholder.id).trigger("change");
this.trigger("toggle",{})
};
g.prototype._handleKeyboardClear=function(j,i,h){if(h.isOpen()){return
}if(i.which==e.DELETE||i.which==e.BACKSPACE){this._handleClear(i)
}};
g.prototype.update=function(j,i){j.call(this,i);
if(this.$selection.find(".select2-selection__placeholder").length>0||i.length===0){return
}var h=f('<span class="select2-selection__clear">&times;</span>');
h.data("data",i);
this.$selection.find(".select2-selection__rendered").prepend(h)
};
return g
});
d.define("select2/selection/search",["jquery","../utils","../keys"],function(h,g,e){function f(k,i,j){k.call(this,i,j)
}f.prototype.render=function(j){var i=h('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="text" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');
this.$searchContainer=i;
this.$search=i.find("input");
var k=j.call(this);
this._transferTabIndex();
return k
};
f.prototype.bind=function(n,j,o){var l=this;
var k=j.id+"-results";
n.call(this,j,o);
j.on("open",function(){l.$search.attr("aria-owns",k);
l.$search.trigger("focus")
});
j.on("close",function(){l.$search.val("");
l.$search.removeAttr("aria-activedescendant");
l.$search.removeAttr("aria-owns");
l.$search.trigger("focus")
});
j.on("enable",function(){l.$search.prop("disabled",false);
l._transferTabIndex()
});
j.on("disable",function(){l.$search.prop("disabled",true)
});
j.on("focus",function(p){l.$search.trigger("focus")
});
j.on("results:focus",function(p){l.$search.attr("aria-activedescendant",p.data._resultId)
});
this.$selection.on("focusin",".select2-search--inline",function(p){l.trigger("focus",p)
});
this.$selection.on("focusout",".select2-search--inline",function(p){l._handleBlur(p)
});
this.$selection.on("keydown",".select2-search--inline",function(p){p.stopPropagation();
l.trigger("keypress",p);
l._keyUpPrevented=p.isDefaultPrevented();
var r=p.which;
if(r===e.BACKSPACE&&l.$search.val()===""){var q=l.$searchContainer.prev(".select2-selection__choice");
if(q.length>0){var s=q.data("data");
l.searchRemoveChoice(s);
p.preventDefault()
}}else{if(p.which===e.ENTER){j.open();
p.preventDefault()
}}});
var m=document.documentMode;
var i=m&&m<=11;
this.$selection.on("input.searchcheck",".select2-search--inline",function(p){if(i){l.$selection.off("input.search input.searchcheck");
return
}l.$selection.off("keyup.search")
});
this.$selection.on("keyup.search input.search",".select2-search--inline",function(p){if(i&&p.type==="input"){l.$selection.off("input.search input.searchcheck");
return
}var q=p.which;
if(q==e.SHIFT||q==e.CTRL||q==e.ALT){return
}if(q==e.TAB){return
}l.handleSearch(p)
})
};
f.prototype._transferTabIndex=function(i){this.$search.attr("tabindex",this.$selection.attr("tabindex"));
this.$selection.attr("tabindex","-1")
};
f.prototype.createPlaceholder=function(i,j){this.$search.attr("placeholder",j.text)
};
f.prototype.update=function(k,j){var i=this.$search[0]==document.activeElement;
this.$search.attr("placeholder","");
k.call(this,j);
this.$selection.find(".select2-selection__rendered").append(this.$searchContainer);
this.resizeSearch();
if(i){this.$search.focus()
}};
f.prototype.handleSearch=function(){this.resizeSearch();
if(!this._keyUpPrevented){var i=this.$search.val();
this.trigger("query",{term:i})
}this._keyUpPrevented=false
};
f.prototype.searchRemoveChoice=function(j,i){this.trigger("unselect",{data:i});
this.$search.val(i.text);
this.handleSearch()
};
f.prototype.resizeSearch=function(){this.$search.css("width","25px");
var i="";
if(this.$search.attr("placeholder")!==""){i=this.$selection.find(".select2-selection__rendered").innerWidth()
}else{var j=this.$search.val().length+1;
i=(j*0.75)+"em"
}this.$search.css("width",i)
};
return f
});
d.define("select2/selection/eventRelay",["jquery"],function(e){function f(){}f.prototype.bind=function(k,g,l){var h=this;
var i=["open","opening","close","closing","select","selecting","unselect","unselecting","blur"];
var j=["opening","closing","selecting","unselecting"];
k.call(this,g,l);
g.on("*",function(n,o){if(e.inArray(n,i)===-1){return
}o=o||{};
var m=e.Event("select2:"+n,{params:o});
h.$element.trigger(m);
if(e.inArray(n,j)===-1){return
}o.prevented=m.isDefaultPrevented()
})
};
return f
});
d.define("select2/translation",["jquery","require"],function(g,f){function e(h){this.dict=h||{}
}e.prototype.all=function(){return this.dict
};
e.prototype.get=function(h){return this.dict[h]
};
e.prototype.extend=function(h){this.dict=g.extend({},h.all(),this.dict)
};
e._cache={};
e.loadPath=function(i){if(!(i in e._cache)){var h=f(i);
e._cache[i]=h
}return new e(e._cache[i])
};
return e
});
d.define("select2/diacritics",[],function(){var e={"\u24B6":"A","\uFF21":"A","\u00C0":"A","\u00C1":"A","\u00C2":"A","\u1EA6":"A","\u1EA4":"A","\u1EAA":"A","\u1EA8":"A","\u00C3":"A","\u0100":"A","\u0102":"A","\u1EB0":"A","\u1EAE":"A","\u1EB4":"A","\u1EB2":"A","\u0226":"A","\u01E0":"A","\u00C4":"A","\u01DE":"A","\u1EA2":"A","\u00C5":"A","\u01FA":"A","\u01CD":"A","\u0200":"A","\u0202":"A","\u1EA0":"A","\u1EAC":"A","\u1EB6":"A","\u1E00":"A","\u0104":"A","\u023A":"A","\u2C6F":"A","\uA732":"AA","\u00C6":"AE","\u01FC":"AE","\u01E2":"AE","\uA734":"AO","\uA736":"AU","\uA738":"AV","\uA73A":"AV","\uA73C":"AY","\u24B7":"B","\uFF22":"B","\u1E02":"B","\u1E04":"B","\u1E06":"B","\u0243":"B","\u0182":"B","\u0181":"B","\u24B8":"C","\uFF23":"C","\u0106":"C","\u0108":"C","\u010A":"C","\u010C":"C","\u00C7":"C","\u1E08":"C","\u0187":"C","\u023B":"C","\uA73E":"C","\u24B9":"D","\uFF24":"D","\u1E0A":"D","\u010E":"D","\u1E0C":"D","\u1E10":"D","\u1E12":"D","\u1E0E":"D","\u0110":"D","\u018B":"D","\u018A":"D","\u0189":"D","\uA779":"D","\u01F1":"DZ","\u01C4":"DZ","\u01F2":"Dz","\u01C5":"Dz","\u24BA":"E","\uFF25":"E","\u00C8":"E","\u00C9":"E","\u00CA":"E","\u1EC0":"E","\u1EBE":"E","\u1EC4":"E","\u1EC2":"E","\u1EBC":"E","\u0112":"E","\u1E14":"E","\u1E16":"E","\u0114":"E","\u0116":"E","\u00CB":"E","\u1EBA":"E","\u011A":"E","\u0204":"E","\u0206":"E","\u1EB8":"E","\u1EC6":"E","\u0228":"E","\u1E1C":"E","\u0118":"E","\u1E18":"E","\u1E1A":"E","\u0190":"E","\u018E":"E","\u24BB":"F","\uFF26":"F","\u1E1E":"F","\u0191":"F","\uA77B":"F","\u24BC":"G","\uFF27":"G","\u01F4":"G","\u011C":"G","\u1E20":"G","\u011E":"G","\u0120":"G","\u01E6":"G","\u0122":"G","\u01E4":"G","\u0193":"G","\uA7A0":"G","\uA77D":"G","\uA77E":"G","\u24BD":"H","\uFF28":"H","\u0124":"H","\u1E22":"H","\u1E26":"H","\u021E":"H","\u1E24":"H","\u1E28":"H","\u1E2A":"H","\u0126":"H","\u2C67":"H","\u2C75":"H","\uA78D":"H","\u24BE":"I","\uFF29":"I","\u00CC":"I","\u00CD":"I","\u00CE":"I","\u0128":"I","\u012A":"I","\u012C":"I","\u0130":"I","\u00CF":"I","\u1E2E":"I","\u1EC8":"I","\u01CF":"I","\u0208":"I","\u020A":"I","\u1ECA":"I","\u012E":"I","\u1E2C":"I","\u0197":"I","\u24BF":"J","\uFF2A":"J","\u0134":"J","\u0248":"J","\u24C0":"K","\uFF2B":"K","\u1E30":"K","\u01E8":"K","\u1E32":"K","\u0136":"K","\u1E34":"K","\u0198":"K","\u2C69":"K","\uA740":"K","\uA742":"K","\uA744":"K","\uA7A2":"K","\u24C1":"L","\uFF2C":"L","\u013F":"L","\u0139":"L","\u013D":"L","\u1E36":"L","\u1E38":"L","\u013B":"L","\u1E3C":"L","\u1E3A":"L","\u0141":"L","\u023D":"L","\u2C62":"L","\u2C60":"L","\uA748":"L","\uA746":"L","\uA780":"L","\u01C7":"LJ","\u01C8":"Lj","\u24C2":"M","\uFF2D":"M","\u1E3E":"M","\u1E40":"M","\u1E42":"M","\u2C6E":"M","\u019C":"M","\u24C3":"N","\uFF2E":"N","\u01F8":"N","\u0143":"N","\u00D1":"N","\u1E44":"N","\u0147":"N","\u1E46":"N","\u0145":"N","\u1E4A":"N","\u1E48":"N","\u0220":"N","\u019D":"N","\uA790":"N","\uA7A4":"N","\u01CA":"NJ","\u01CB":"Nj","\u24C4":"O","\uFF2F":"O","\u00D2":"O","\u00D3":"O","\u00D4":"O","\u1ED2":"O","\u1ED0":"O","\u1ED6":"O","\u1ED4":"O","\u00D5":"O","\u1E4C":"O","\u022C":"O","\u1E4E":"O","\u014C":"O","\u1E50":"O","\u1E52":"O","\u014E":"O","\u022E":"O","\u0230":"O","\u00D6":"O","\u022A":"O","\u1ECE":"O","\u0150":"O","\u01D1":"O","\u020C":"O","\u020E":"O","\u01A0":"O","\u1EDC":"O","\u1EDA":"O","\u1EE0":"O","\u1EDE":"O","\u1EE2":"O","\u1ECC":"O","\u1ED8":"O","\u01EA":"O","\u01EC":"O","\u00D8":"O","\u01FE":"O","\u0186":"O","\u019F":"O","\uA74A":"O","\uA74C":"O","\u01A2":"OI","\uA74E":"OO","\u0222":"OU","\u24C5":"P","\uFF30":"P","\u1E54":"P","\u1E56":"P","\u01A4":"P","\u2C63":"P","\uA750":"P","\uA752":"P","\uA754":"P","\u24C6":"Q","\uFF31":"Q","\uA756":"Q","\uA758":"Q","\u024A":"Q","\u24C7":"R","\uFF32":"R","\u0154":"R","\u1E58":"R","\u0158":"R","\u0210":"R","\u0212":"R","\u1E5A":"R","\u1E5C":"R","\u0156":"R","\u1E5E":"R","\u024C":"R","\u2C64":"R","\uA75A":"R","\uA7A6":"R","\uA782":"R","\u24C8":"S","\uFF33":"S","\u1E9E":"S","\u015A":"S","\u1E64":"S","\u015C":"S","\u1E60":"S","\u0160":"S","\u1E66":"S","\u1E62":"S","\u1E68":"S","\u0218":"S","\u015E":"S","\u2C7E":"S","\uA7A8":"S","\uA784":"S","\u24C9":"T","\uFF34":"T","\u1E6A":"T","\u0164":"T","\u1E6C":"T","\u021A":"T","\u0162":"T","\u1E70":"T","\u1E6E":"T","\u0166":"T","\u01AC":"T","\u01AE":"T","\u023E":"T","\uA786":"T","\uA728":"TZ","\u24CA":"U","\uFF35":"U","\u00D9":"U","\u00DA":"U","\u00DB":"U","\u0168":"U","\u1E78":"U","\u016A":"U","\u1E7A":"U","\u016C":"U","\u00DC":"U","\u01DB":"U","\u01D7":"U","\u01D5":"U","\u01D9":"U","\u1EE6":"U","\u016E":"U","\u0170":"U","\u01D3":"U","\u0214":"U","\u0216":"U","\u01AF":"U","\u1EEA":"U","\u1EE8":"U","\u1EEE":"U","\u1EEC":"U","\u1EF0":"U","\u1EE4":"U","\u1E72":"U","\u0172":"U","\u1E76":"U","\u1E74":"U","\u0244":"U","\u24CB":"V","\uFF36":"V","\u1E7C":"V","\u1E7E":"V","\u01B2":"V","\uA75E":"V","\u0245":"V","\uA760":"VY","\u24CC":"W","\uFF37":"W","\u1E80":"W","\u1E82":"W","\u0174":"W","\u1E86":"W","\u1E84":"W","\u1E88":"W","\u2C72":"W","\u24CD":"X","\uFF38":"X","\u1E8A":"X","\u1E8C":"X","\u24CE":"Y","\uFF39":"Y","\u1EF2":"Y","\u00DD":"Y","\u0176":"Y","\u1EF8":"Y","\u0232":"Y","\u1E8E":"Y","\u0178":"Y","\u1EF6":"Y","\u1EF4":"Y","\u01B3":"Y","\u024E":"Y","\u1EFE":"Y","\u24CF":"Z","\uFF3A":"Z","\u0179":"Z","\u1E90":"Z","\u017B":"Z","\u017D":"Z","\u1E92":"Z","\u1E94":"Z","\u01B5":"Z","\u0224":"Z","\u2C7F":"Z","\u2C6B":"Z","\uA762":"Z","\u24D0":"a","\uFF41":"a","\u1E9A":"a","\u00E0":"a","\u00E1":"a","\u00E2":"a","\u1EA7":"a","\u1EA5":"a","\u1EAB":"a","\u1EA9":"a","\u00E3":"a","\u0101":"a","\u0103":"a","\u1EB1":"a","\u1EAF":"a","\u1EB5":"a","\u1EB3":"a","\u0227":"a","\u01E1":"a","\u00E4":"a","\u01DF":"a","\u1EA3":"a","\u00E5":"a","\u01FB":"a","\u01CE":"a","\u0201":"a","\u0203":"a","\u1EA1":"a","\u1EAD":"a","\u1EB7":"a","\u1E01":"a","\u0105":"a","\u2C65":"a","\u0250":"a","\uA733":"aa","\u00E6":"ae","\u01FD":"ae","\u01E3":"ae","\uA735":"ao","\uA737":"au","\uA739":"av","\uA73B":"av","\uA73D":"ay","\u24D1":"b","\uFF42":"b","\u1E03":"b","\u1E05":"b","\u1E07":"b","\u0180":"b","\u0183":"b","\u0253":"b","\u24D2":"c","\uFF43":"c","\u0107":"c","\u0109":"c","\u010B":"c","\u010D":"c","\u00E7":"c","\u1E09":"c","\u0188":"c","\u023C":"c","\uA73F":"c","\u2184":"c","\u24D3":"d","\uFF44":"d","\u1E0B":"d","\u010F":"d","\u1E0D":"d","\u1E11":"d","\u1E13":"d","\u1E0F":"d","\u0111":"d","\u018C":"d","\u0256":"d","\u0257":"d","\uA77A":"d","\u01F3":"dz","\u01C6":"dz","\u24D4":"e","\uFF45":"e","\u00E8":"e","\u00E9":"e","\u00EA":"e","\u1EC1":"e","\u1EBF":"e","\u1EC5":"e","\u1EC3":"e","\u1EBD":"e","\u0113":"e","\u1E15":"e","\u1E17":"e","\u0115":"e","\u0117":"e","\u00EB":"e","\u1EBB":"e","\u011B":"e","\u0205":"e","\u0207":"e","\u1EB9":"e","\u1EC7":"e","\u0229":"e","\u1E1D":"e","\u0119":"e","\u1E19":"e","\u1E1B":"e","\u0247":"e","\u025B":"e","\u01DD":"e","\u24D5":"f","\uFF46":"f","\u1E1F":"f","\u0192":"f","\uA77C":"f","\u24D6":"g","\uFF47":"g","\u01F5":"g","\u011D":"g","\u1E21":"g","\u011F":"g","\u0121":"g","\u01E7":"g","\u0123":"g","\u01E5":"g","\u0260":"g","\uA7A1":"g","\u1D79":"g","\uA77F":"g","\u24D7":"h","\uFF48":"h","\u0125":"h","\u1E23":"h","\u1E27":"h","\u021F":"h","\u1E25":"h","\u1E29":"h","\u1E2B":"h","\u1E96":"h","\u0127":"h","\u2C68":"h","\u2C76":"h","\u0265":"h","\u0195":"hv","\u24D8":"i","\uFF49":"i","\u00EC":"i","\u00ED":"i","\u00EE":"i","\u0129":"i","\u012B":"i","\u012D":"i","\u00EF":"i","\u1E2F":"i","\u1EC9":"i","\u01D0":"i","\u0209":"i","\u020B":"i","\u1ECB":"i","\u012F":"i","\u1E2D":"i","\u0268":"i","\u0131":"i","\u24D9":"j","\uFF4A":"j","\u0135":"j","\u01F0":"j","\u0249":"j","\u24DA":"k","\uFF4B":"k","\u1E31":"k","\u01E9":"k","\u1E33":"k","\u0137":"k","\u1E35":"k","\u0199":"k","\u2C6A":"k","\uA741":"k","\uA743":"k","\uA745":"k","\uA7A3":"k","\u24DB":"l","\uFF4C":"l","\u0140":"l","\u013A":"l","\u013E":"l","\u1E37":"l","\u1E39":"l","\u013C":"l","\u1E3D":"l","\u1E3B":"l","\u017F":"l","\u0142":"l","\u019A":"l","\u026B":"l","\u2C61":"l","\uA749":"l","\uA781":"l","\uA747":"l","\u01C9":"lj","\u24DC":"m","\uFF4D":"m","\u1E3F":"m","\u1E41":"m","\u1E43":"m","\u0271":"m","\u026F":"m","\u24DD":"n","\uFF4E":"n","\u01F9":"n","\u0144":"n","\u00F1":"n","\u1E45":"n","\u0148":"n","\u1E47":"n","\u0146":"n","\u1E4B":"n","\u1E49":"n","\u019E":"n","\u0272":"n","\u0149":"n","\uA791":"n","\uA7A5":"n","\u01CC":"nj","\u24DE":"o","\uFF4F":"o","\u00F2":"o","\u00F3":"o","\u00F4":"o","\u1ED3":"o","\u1ED1":"o","\u1ED7":"o","\u1ED5":"o","\u00F5":"o","\u1E4D":"o","\u022D":"o","\u1E4F":"o","\u014D":"o","\u1E51":"o","\u1E53":"o","\u014F":"o","\u022F":"o","\u0231":"o","\u00F6":"o","\u022B":"o","\u1ECF":"o","\u0151":"o","\u01D2":"o","\u020D":"o","\u020F":"o","\u01A1":"o","\u1EDD":"o","\u1EDB":"o","\u1EE1":"o","\u1EDF":"o","\u1EE3":"o","\u1ECD":"o","\u1ED9":"o","\u01EB":"o","\u01ED":"o","\u00F8":"o","\u01FF":"o","\u0254":"o","\uA74B":"o","\uA74D":"o","\u0275":"o","\u01A3":"oi","\u0223":"ou","\uA74F":"oo","\u24DF":"p","\uFF50":"p","\u1E55":"p","\u1E57":"p","\u01A5":"p","\u1D7D":"p","\uA751":"p","\uA753":"p","\uA755":"p","\u24E0":"q","\uFF51":"q","\u024B":"q","\uA757":"q","\uA759":"q","\u24E1":"r","\uFF52":"r","\u0155":"r","\u1E59":"r","\u0159":"r","\u0211":"r","\u0213":"r","\u1E5B":"r","\u1E5D":"r","\u0157":"r","\u1E5F":"r","\u024D":"r","\u027D":"r","\uA75B":"r","\uA7A7":"r","\uA783":"r","\u24E2":"s","\uFF53":"s","\u00DF":"s","\u015B":"s","\u1E65":"s","\u015D":"s","\u1E61":"s","\u0161":"s","\u1E67":"s","\u1E63":"s","\u1E69":"s","\u0219":"s","\u015F":"s","\u023F":"s","\uA7A9":"s","\uA785":"s","\u1E9B":"s","\u24E3":"t","\uFF54":"t","\u1E6B":"t","\u1E97":"t","\u0165":"t","\u1E6D":"t","\u021B":"t","\u0163":"t","\u1E71":"t","\u1E6F":"t","\u0167":"t","\u01AD":"t","\u0288":"t","\u2C66":"t","\uA787":"t","\uA729":"tz","\u24E4":"u","\uFF55":"u","\u00F9":"u","\u00FA":"u","\u00FB":"u","\u0169":"u","\u1E79":"u","\u016B":"u","\u1E7B":"u","\u016D":"u","\u00FC":"u","\u01DC":"u","\u01D8":"u","\u01D6":"u","\u01DA":"u","\u1EE7":"u","\u016F":"u","\u0171":"u","\u01D4":"u","\u0215":"u","\u0217":"u","\u01B0":"u","\u1EEB":"u","\u1EE9":"u","\u1EEF":"u","\u1EED":"u","\u1EF1":"u","\u1EE5":"u","\u1E73":"u","\u0173":"u","\u1E77":"u","\u1E75":"u","\u0289":"u","\u24E5":"v","\uFF56":"v","\u1E7D":"v","\u1E7F":"v","\u028B":"v","\uA75F":"v","\u028C":"v","\uA761":"vy","\u24E6":"w","\uFF57":"w","\u1E81":"w","\u1E83":"w","\u0175":"w","\u1E87":"w","\u1E85":"w","\u1E98":"w","\u1E89":"w","\u2C73":"w","\u24E7":"x","\uFF58":"x","\u1E8B":"x","\u1E8D":"x","\u24E8":"y","\uFF59":"y","\u1EF3":"y","\u00FD":"y","\u0177":"y","\u1EF9":"y","\u0233":"y","\u1E8F":"y","\u00FF":"y","\u1EF7":"y","\u1E99":"y","\u1EF5":"y","\u01B4":"y","\u024F":"y","\u1EFF":"y","\u24E9":"z","\uFF5A":"z","\u017A":"z","\u1E91":"z","\u017C":"z","\u017E":"z","\u1E93":"z","\u1E95":"z","\u01B6":"z","\u0225":"z","\u0240":"z","\u2C6C":"z","\uA763":"z","\u0386":"\u0391","\u0388":"\u0395","\u0389":"\u0397","\u038A":"\u0399","\u03AA":"\u0399","\u038C":"\u039F","\u038E":"\u03A5","\u03AB":"\u03A5","\u038F":"\u03A9","\u03AC":"\u03B1","\u03AD":"\u03B5","\u03AE":"\u03B7","\u03AF":"\u03B9","\u03CA":"\u03B9","\u0390":"\u03B9","\u03CC":"\u03BF","\u03CD":"\u03C5","\u03CB":"\u03C5","\u03B0":"\u03C5","\u03C9":"\u03C9","\u03C2":"\u03C3"};
return e
});
d.define("select2/data/base",["../utils"],function(f){function e(g,h){e.__super__.constructor.call(this)
}f.Extend(e,f.Observable);
e.prototype.current=function(g){throw new Error("The `current` method must be defined in child classes.")
};
e.prototype.query=function(g,h){throw new Error("The `query` method must be defined in child classes.")
};
e.prototype.bind=function(g,h){};
e.prototype.destroy=function(){};
e.prototype.generateResultId=function(g,h){var i="";
if(g!=null){i+=g.id
}else{i+=f.generateChars(4)
}i+="-result-";
i+=f.generateChars(4);
if(h.id!=null){i+="-"+h.id.toString()
}else{i+="-"+f.generateChars(4)
}return i
};
return e
});
d.define("select2/data/select",["./base","../utils","jquery"],function(e,h,g){function f(i,j){this.$element=i;
this.options=j;
f.__super__.constructor.call(this)
}h.Extend(f,e);
f.prototype.current=function(k){var j=[];
var i=this;
this.$element.find(":selected").each(function(){var m=g(this);
var l=i.item(m);
j.push(l)
});
k(j)
};
f.prototype.select=function(j){var i=this;
j.selected=true;
if(g(j.element).is("option")){j.element.selected=true;
this.$element.trigger("change");
return
}if(this.$element.prop("multiple")){this.current(function(l){var n=[];
j=[j];
j.push.apply(j,l);
for(var m=0;
m<j.length;
m++){var o=j[m].id;
if(g.inArray(o,n)===-1){n.push(o)
}}i.$element.val(n);
i.$element.trigger("change")
})
}else{var k=j.id;
this.$element.val(k);
this.$element.trigger("change")
}};
f.prototype.unselect=function(j){var i=this;
if(!this.$element.prop("multiple")){return
}j.selected=false;
if(g(j.element).is("option")){j.element.selected=false;
this.$element.trigger("change");
return
}this.current(function(k){var m=[];
for(var l=0;
l<k.length;
l++){var n=k[l].id;
if(n!==j.id&&g.inArray(n,m)===-1){m.push(n)
}}i.$element.val(m);
i.$element.trigger("change")
})
};
f.prototype.bind=function(i,k){var j=this;
this.container=i;
i.on("select",function(l){j.select(l.data)
});
i.on("unselect",function(l){j.unselect(l.data)
})
};
f.prototype.destroy=function(){this.$element.find("*").each(function(){g.removeData(this,"data")
})
};
f.prototype.query=function(l,m){var k=[];
var j=this;
var i=this.$element.children();
i.each(function(){var p=g(this);
if(!p.is("option")&&!p.is("optgroup")){return
}var n=j.item(p);
var o=j.matches(l,n);
if(o!==null){k.push(o)
}});
m({results:k})
};
f.prototype.addOptions=function(i){h.appendMany(this.$element,i)
};
f.prototype.option=function(j){var i;
if(j.children){i=document.createElement("optgroup");
i.label=j.text
}else{i=document.createElement("option");
if(i.textContent!==undefined){i.textContent=j.text
}else{i.innerText=j.text
}}if(j.id!==undefined){i.value=j.id
}if(j.disabled){i.disabled=true
}if(j.selected){i.selected=true
}if(j.title){i.title=j.title
}var k=g(i);
var l=this._normalizeItem(j);
l.element=i;
g.data(i,"data",l);
return k
};
f.prototype.item=function(m){var l={};
l=g.data(m[0],"data");
if(l!=null){return l
}if(m.is("option")){l={id:m.val(),text:m.text(),disabled:m.prop("disabled"),selected:m.prop("selected"),title:m.prop("title")}
}else{if(m.is("optgroup")){l={text:m.prop("label"),children:[],title:m.prop("title")};
var i=m.children("option");
var j=[];
for(var o=0;
o<i.length;
o++){var k=g(i[o]);
var n=this.item(k);
j.push(n)
}l.children=j
}}l=this._normalizeItem(l);
l.element=m[0];
g.data(m[0],"data",l);
return l
};
f.prototype._normalizeItem=function(i){if(!g.isPlainObject(i)){i={id:i,text:i}
}i=g.extend({},{text:""},i);
var j={selected:false,disabled:false};
if(i.id!=null){i.id=i.id.toString()
}if(i.text!=null){i.text=i.text.toString()
}if(i._resultId==null&&i.id){i._resultId=this.generateResultId(this.container,i)
}return g.extend({},j,i)
};
f.prototype.matches=function(k,i){var j=this.options.get("matcher");
return j(k,i)
};
return f
});
d.define("select2/data/array",["./select","../utils","jquery"],function(e,g,f){function h(i,j){var k=j.get("data")||[];
h.__super__.constructor.call(this,i,j);
this.addOptions(this.convertToOptions(k))
}g.Extend(h,e);
h.prototype.select=function(i){var j=this.$element.find("option").filter(function(k,l){return l.value==i.id.toString()
});
if(j.length===0){j=this.option(i);
this.addOptions(j)
}h.__super__.select.call(this,i)
};
h.prototype.convertToOptions=function(k){var u=this;
var n=this.$element.find("option");
var j=n.map(function(){return u.item(f(this)).id
}).get();
var m=[];
function r(w){return function(){return f(this).val()==w.id
}
}for(var q=0;
q<k.length;
q++){var t=this._normalizeItem(k[q]);
if(f.inArray(t.id,j)>=0){var o=n.filter(r(t));
var p=this.item(o);
var v=f.extend(true,{},t,p);
var l=this.option(v);
o.replaceWith(l);
continue
}var i=this.option(t);
if(t.children){var s=this.convertToOptions(t.children);
g.appendMany(i,s)
}m.push(i)
}return m
};
return h
});
d.define("select2/data/ajax",["./array","../utils","jquery"],function(h,g,f){function e(i,j){this.ajaxOptions=this._applyDefaults(j.get("ajax"));
if(this.ajaxOptions.processResults!=null){this.processResults=this.ajaxOptions.processResults
}e.__super__.constructor.call(this,i,j)
}g.Extend(e,h);
e.prototype._applyDefaults=function(i){var j={data:function(k){return f.extend({},k,{q:k.term})
},transport:function(n,m,l){var k=f.ajax(n);
k.then(m);
k.fail(l);
return k
}};
return f.extend({},j,i,true)
};
e.prototype.processResults=function(i){return i
};
e.prototype.query=function(m,n){var l=[];
var i=this;
if(this._request!=null){if(f.isFunction(this._request.abort)){this._request.abort()
}this._request=null
}var j=f.extend({type:"GET"},this.ajaxOptions);
if(typeof j.url==="function"){j.url=j.url.call(this.$element,m)
}if(typeof j.data==="function"){j.data=j.data.call(this.$element,m)
}function k(){var o=j.transport(j,function(q){var p=i.processResults(q,m);
if(i.options.get("debug")&&window.console&&console.error){if(!p||!p.results||!f.isArray(p.results)){console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")
}}n(p);
i.container.focusOnActiveElement()
},function(){if(o.status&&o.status==="0"){return
}i.trigger("results:message",{message:"errorLoading"})
});
i._request=o
}if(this.ajaxOptions.delay&&m.term!=null){if(this._queryTimeout){window.clearTimeout(this._queryTimeout)
}this._queryTimeout=window.setTimeout(k,this.ajaxOptions.delay)
}else{k()
}};
return e
});
d.define("select2/data/tags",["jquery"],function(f){function e(h,k,n){var o=n.get("tags");
var i=n.get("createTag");
if(i!==undefined){this.createTag=i
}var j=n.get("insertTag");
if(j!==undefined){this.insertTag=j
}h.call(this,k,n);
if(f.isArray(o)){for(var m=0;
m<o.length;
m++){var p=o[m];
var l=this._normalizeItem(p);
var g=this.option(l);
this.$element.append(g)
}}}e.prototype.query=function(h,i,k){var g=this;
this._removeOldTags();
if(i.term==null||i.page!=null){h.call(this,i,k);
return
}function j(q,m){var r=q.results;
for(var s=0;
s<r.length;
s++){var t=r[s];
var o=(t.children!=null&&!j({results:t.children},true));
var u=(t.text||"").toUpperCase();
var n=(i.term||"").toUpperCase();
var p=u===n;
if(p||o){if(m){return false
}q.data=r;
k(q);
return
}}if(m){return true
}var v=g.createTag(i);
if(v!=null){var l=g.option(v);
l.attr("data-select2-tag",true);
g.addOptions([l]);
g.insertTag(r,v)
}q.results=r;
k(q)
}h.call(this,i,j)
};
e.prototype.createTag=function(h,i){var g=f.trim(i.term);
if(g===""){return null
}return{id:g,text:g}
};
e.prototype.insertTag=function(h,i,g){i.unshift(g)
};
e.prototype._removeOldTags=function(i){var h=this._lastTag;
var g=this.$element.find("option[data-select2-tag]");
g.each(function(){if(this.selected){return
}f(this).remove()
})
};
return e
});
d.define("select2/data/tokenizer",["jquery"],function(f){function e(j,g,h){var i=h.get("tokenizer");
if(i!==undefined){this.tokenizer=i
}j.call(this,g,h)
}e.prototype.bind=function(h,g,i){h.call(this,g,i);
this.$search=g.dropdown.$search||g.selection.$search||i.find(".select2-search__field")
};
e.prototype.query=function(j,k,m){var i=this;
function h(o){var n=i._normalizeItem(o);
var q=i.$element.find("option").filter(function(){return f(this).val()===n.id
});
if(!q.length){var p=i.option(n);
p.attr("data-select2-tag",true);
i._removeOldTags();
i.addOptions([p])
}g(n)
}function g(n){i.trigger("select",{data:n})
}k.term=k.term||"";
var l=this.tokenizer(k,this.options,h);
if(l.term!==k.term){if(this.$search.length){this.$search.val(l.term);
this.$search.focus()
}k.term=l.term
}j.call(this,k,m)
};
e.prototype.tokenizer=function(o,j,s,r){var k=s.get("tokenSeparators")||[];
var h=j.term;
var m=0;
var n=this.createTag||function(i){return{id:i.term,text:i.term}
};
while(m<h.length){var q=h[m];
if(f.inArray(q,k)===-1){m++;
continue
}var g=h.substr(0,m);
var p=f.extend({},j,{term:g});
var l=n(p);
if(l==null){m++;
continue
}r(l);
h=h.substr(m+1)||"";
m=0
}return{term:h}
};
return e
});
d.define("select2/data/minimumInputLength",[],function(){function e(h,g,f){this.minimumInputLength=f.get("minimumInputLength");
h.call(this,g,f)
}e.prototype.query=function(f,g,h){g.term=g.term||"";
if(g.term.length<this.minimumInputLength){this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:g.term,params:g}});
return
}f.call(this,g,h)
};
return e
});
d.define("select2/data/maximumInputLength",[],function(){function e(h,g,f){this.maximumInputLength=f.get("maximumInputLength");
h.call(this,g,f)
}e.prototype.query=function(f,g,h){g.term=g.term||"";
if(this.maximumInputLength>0&&g.term.length>this.maximumInputLength){this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:g.term,params:g}});
return
}f.call(this,g,h)
};
return e
});
d.define("select2/data/maximumSelectionLength",[],function(){function e(h,g,f){this.maximumSelectionLength=f.get("maximumSelectionLength");
h.call(this,g,f)
}e.prototype.query=function(g,h,i){var f=this;
this.current(function(j){var k=j!=null?j.length:0;
if(f.maximumSelectionLength>0&&k>=f.maximumSelectionLength){f.trigger("results:message",{message:"maximumSelected",args:{maximum:f.maximumSelectionLength}});
return
}g.call(f,h,i)
})
};
return e
});
d.define("select2/dropdown",["jquery","./utils"],function(g,f){function e(h,i){this.$element=h;
this.options=i;
e.__super__.constructor.call(this)
}f.Extend(e,f.Observable);
e.prototype.render=function(){var h=g('<span class="select2-dropdown"><span class="select2-results"></span></span>');
h.attr("dir",this.options.get("dir"));
this.$dropdown=h;
return h
};
e.prototype.bind=function(){};
e.prototype.position=function(h,i){};
e.prototype.destroy=function(){this.$dropdown.remove()
};
return e
});
d.define("select2/dropdown/search",["jquery","../utils"],function(g,f){function e(){}e.prototype.render=function(i){var j=i.call(this);
var h=g('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="text" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="true" /></span>');
this.$searchContainer=h;
this.$search=h.find("input");
j.prepend(h);
return j
};
e.prototype.bind=function(k,h,l){var j=this;
var i=h.id+"-results";
k.call(this,h,l);
this.$search.on("keydown",function(m){j.trigger("keypress",m);
j._keyUpPrevented=m.isDefaultPrevented()
});
this.$search.on("input",function(m){g(this).off("keyup")
});
this.$search.on("keyup input",function(m){j.handleSearch(m)
});
h.on("open",function(){j.$search.attr("tabindex",0);
j.$search.attr("aria-owns",i);
j.$search.focus();
window.setTimeout(function(){j.$search.focus()
},0)
});
h.on("close",function(){j.$search.attr("tabindex",-1);
j.$search.removeAttr("aria-activedescendant");
j.$search.removeAttr("aria-owns");
j.$search.val("")
});
h.on("focus",function(){if(!h.isOpen()){j.$search.focus()
}});
h.on("results:all",function(n){if(n.query.term==null||n.query.term===""){var m=j.showSearch(n);
if(m){j.$searchContainer.removeClass("select2-search--hide")
}else{j.$searchContainer.addClass("select2-search--hide")
}}});
h.on("results:focus",function(m){j.$search.attr("aria-activedescendant",m.data._resultId)
})
};
e.prototype.handleSearch=function(h){if(!this._keyUpPrevented){var i=this.$search.val();
this.trigger("query",{term:i})
}this._keyUpPrevented=false
};
e.prototype.showSearch=function(h,i){return true
};
return e
});
d.define("select2/dropdown/hidePlaceholder",[],function(){function e(h,f,g,i){this.placeholder=this.normalizePlaceholder(g.get("placeholder"));
h.call(this,f,g,i)
}e.prototype.append=function(g,f){f.results=this.removePlaceholder(f.results);
g.call(this,f)
};
e.prototype.normalizePlaceholder=function(f,g){if(typeof g==="string"){g={id:"",text:g}
}return g
};
e.prototype.removePlaceholder=function(f,i){var h=i.slice(0);
for(var j=i.length-1;
j>=0;
j--){var g=i[j];
if(this.placeholder.id===g.id){h.splice(j,1)
}}return h
};
return e
});
d.define("select2/dropdown/infiniteScroll",["jquery"],function(f){function e(i,g,h,j){this.lastParams={};
i.call(this,g,h,j);
this.$loadingMore=this.createLoadingMore();
this.loading=false
}e.prototype.append=function(h,g){this.$loadingMore.remove();
this.loading=false;
h.call(this,g);
if(this.showLoadingMore(g)){this.$results.append(this.$loadingMore)
}};
e.prototype.bind=function(i,g,j){var h=this;
i.call(this,g,j);
g.on("query",function(k){h.lastParams=k;
h.loading=true
});
g.on("query:append",function(k){h.lastParams=k;
h.loading=true
});
this.$results.on("scroll",function(){var m=f.contains(document.documentElement,h.$loadingMore[0]);
if(h.loading||!m){return
}var l=h.$results.offset().top+h.$results.outerHeight(false);
var k=h.$loadingMore.offset().top+h.$loadingMore.outerHeight(false);
if(l+50>=k){h.loadMore()
}})
};
e.prototype.loadMore=function(){this.loading=true;
var g=f.extend({},{page:1},this.lastParams);
g.page++;
this.trigger("query:append",g)
};
e.prototype.showLoadingMore=function(g,h){return h.pagination&&h.pagination.more
};
e.prototype.createLoadingMore=function(){var h=f('<li class="select2-results__option select2-results__option--load-more"role="option" aria-disabled="true"></li>');
var g=this.options.get("translations").get("loadingMore");
h.html(g(this.lastParams));
return h
};
return e
});
d.define("select2/dropdown/attachBody",["jquery","../utils"],function(g,f){function e(j,h,i){this.$dropdownParent=i.get("dropdownParent")||g(document.body);
j.call(this,h,i)
}e.prototype.bind=function(k,h,l){var j=this;
var i=false;
k.call(this,h,l);
h.on("open",function(){j._showDropdown();
j._attachPositioningHandler(h);
if(!i){i=true;
h.on("results:all",function(){j._positionDropdown();
j._resizeDropdown()
});
h.on("results:append",function(){j._positionDropdown();
j._resizeDropdown()
})
}});
h.on("close",function(){j._hideDropdown();
j._detachPositioningHandler(h)
});
this.$dropdownContainer.on("mousedown",function(m){m.stopPropagation()
})
};
e.prototype.destroy=function(h){h.call(this);
this.$dropdownContainer.remove()
};
e.prototype.position=function(h,i,j){i.attr("class",j.attr("class"));
i.removeClass("select2");
i.addClass("select2-container--open");
i.css({position:"absolute",top:-999999});
this.$container=j
};
e.prototype.render=function(h){var j=g("<span></span>");
var i=h.call(this);
j.append(i);
this.$dropdownContainer=j;
return j
};
e.prototype._hideDropdown=function(h){this.$dropdownContainer.detach()
};
e.prototype._attachPositioningHandler=function(n,h){var i=this;
var k="scroll.select2."+h.id;
var m="resize.select2."+h.id;
var l="orientationchange.select2."+h.id;
var j=this.$container.parents().filter(f.hasScroll);
j.each(function(){g(this).data("select2-scroll-position",{x:g(this).scrollLeft(),y:g(this).scrollTop()})
});
j.on(k,function(p){var o=g(this).data("select2-scroll-position");
g(this).scrollTop(o.y)
});
g(window).on(k+" "+m+" "+l,function(o){i._positionDropdown();
i._resizeDropdown()
})
};
e.prototype._detachPositioningHandler=function(m,h){var j="scroll.select2."+h.id;
var l="resize.select2."+h.id;
var k="orientationchange.select2."+h.id;
var i=this.$container.parents().filter(f.hasScroll);
i.off(j);
g(window).off(j+" "+l+" "+k)
};
e.prototype._positionDropdown=function(){var k=g(window);
var t=this.$dropdown.hasClass("select2-dropdown--above");
var j=this.$dropdown.hasClass("select2-dropdown--below");
var q=null;
var l=this.$container.offset();
l.bottom=l.top+this.$container.outerHeight(false);
var i={height:this.$container.outerHeight(false)};
i.top=l.top;
i.bottom=l.top+i.height;
var s={height:this.$dropdown.outerHeight(false)};
var o={top:k.scrollTop(),bottom:k.scrollTop()+k.height()};
var n=o.top<(l.top-s.height);
var p=o.bottom>(l.bottom+s.height);
var m={left:l.left,top:i.bottom};
var r=this.$dropdownParent;
if(r.css("position")==="static"){r=r.offsetParent()
}var h=r.offset();
m.top-=h.top;
m.left-=h.left;
if(!t&&!j){q="below"
}if(!p&&n&&!t){q="above"
}else{if(!n&&p&&t){q="below"
}}if(q=="above"||(t&&q!=="below")){m.top=i.top-h.top-s.height
}if(q!=null){this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--"+q);
this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--"+q)
}this.$dropdownContainer.css(m)
};
e.prototype._resizeDropdown=function(){var h={width:this.$container.outerWidth(false)+"px"};
if(this.options.get("dropdownAutoWidth")){h.minWidth=h.width;
h.position="relative";
h.width="auto"
}this.$dropdown.css(h)
};
e.prototype._showDropdown=function(h){this.$dropdownContainer.appendTo(this.$dropdownParent);
this._positionDropdown();
this._resizeDropdown()
};
return e
});
d.define("select2/dropdown/minimumResultsForSearch",[],function(){function f(i){var h=0;
for(var j=0;
j<i.length;
j++){var g=i[j];
if(g.children){h+=f(g.children)
}else{h++
}}return h
}function e(i,g,h,j){this.minimumResultsForSearch=h.get("minimumResultsForSearch");
if(this.minimumResultsForSearch<0){this.minimumResultsForSearch=Infinity
}i.call(this,g,h,j)
}e.prototype.showSearch=function(g,h){if(f(h.data.results)<this.minimumResultsForSearch){return false
}return g.call(this,h)
};
return e
});
d.define("select2/dropdown/selectOnClose",[],function(){function e(){}e.prototype.bind=function(h,f,i){var g=this;
h.call(this,f,i);
f.on("close",function(j){g._handleSelectOnClose(j)
})
};
e.prototype._handleSelectOnClose=function(g,j){if(j&&j.originalSelect2Event!=null){var h=j.originalSelect2Event;
if(h._type==="select"||h._type==="unselect"){return
}}var f=this.getHighlightedResults();
if(f.length<1){return
}var i=f.data("data");
if((i.element!=null&&i.element.selected)||(i.element==null&&i.selected)){return
}this.trigger("select",{data:i})
};
return e
});
d.define("select2/dropdown/closeOnSelect",[],function(){function e(){}e.prototype.bind=function(h,f,i){var g=this;
h.call(this,f,i);
f.on("select",function(j){g._selectTriggered(j)
});
f.on("unselect",function(j){g._selectTriggered(j)
})
};
e.prototype._selectTriggered=function(h,g){var f=g.originalEvent;
if(f&&f.ctrlKey){return
}this.trigger("close",{originalEvent:f,originalSelect2Event:g})
};
return e
});
d.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."
},inputTooLong:function(e){var g=e.input.length-e.maximum;
var f="Please delete "+g+" character";
if(g!=1){f+="s"
}return f
},inputTooShort:function(e){var g=e.minimum-e.input.length;
var f="Please enter "+g+" or more characters";
return f
},loadingMore:function(){return"Loading more results…"
},maximumSelected:function(e){var f="You can only select "+e.maximum+" item";
if(e.maximum!=1){f+="s"
}return f
},noResults:function(){return"No results found"
},searching:function(){return"Searching…"
}}
});
d.define("select2/defaults",["jquery","require","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./i18n/en"],function(g,k,E,o,t,G,j,C,F,e,u,I,B,s,f,x,h,D,H,w,A,m,q,z,r,v,l,i,y){function p(){this.reset()
}p.prototype.apply=function(Z){Z=g.extend(true,{},this.defaults,Z);
if(Z.dataAdapter==null){if(Z.ajax!=null){Z.dataAdapter=f
}else{if(Z.data!=null){Z.dataAdapter=s
}else{Z.dataAdapter=B
}}if(Z.minimumInputLength>0){Z.dataAdapter=e.Decorate(Z.dataAdapter,D)
}if(Z.maximumInputLength>0){Z.dataAdapter=e.Decorate(Z.dataAdapter,H)
}if(Z.maximumSelectionLength>0){Z.dataAdapter=e.Decorate(Z.dataAdapter,w)
}if(Z.tags){Z.dataAdapter=e.Decorate(Z.dataAdapter,x)
}if(Z.tokenSeparators!=null||Z.tokenizer!=null){Z.dataAdapter=e.Decorate(Z.dataAdapter,h)
}if(Z.query!=null){var R=k(Z.amdBase+"compat/query");
Z.dataAdapter=e.Decorate(Z.dataAdapter,R)
}if(Z.initSelection!=null){var Y=k(Z.amdBase+"compat/initSelection");
Z.dataAdapter=e.Decorate(Z.dataAdapter,Y)
}}if(Z.resultsAdapter==null){Z.resultsAdapter=E;
if(Z.ajax!=null){Z.resultsAdapter=e.Decorate(Z.resultsAdapter,z)
}if(Z.placeholder!=null){Z.resultsAdapter=e.Decorate(Z.resultsAdapter,q)
}if(Z.selectOnClose){Z.resultsAdapter=e.Decorate(Z.resultsAdapter,l)
}}if(Z.dropdownAdapter==null){if(Z.multiple){Z.dropdownAdapter=A
}else{var L=e.Decorate(A,m);
Z.dropdownAdapter=L
}if(Z.minimumResultsForSearch!==0){Z.dropdownAdapter=e.Decorate(Z.dropdownAdapter,v)
}if(Z.closeOnSelect){Z.dropdownAdapter=e.Decorate(Z.dropdownAdapter,i)
}if(Z.dropdownCssClass!=null||Z.dropdownCss!=null||Z.adaptDropdownCssClass!=null){var K=k(Z.amdBase+"compat/dropdownCss");
Z.dropdownAdapter=e.Decorate(Z.dropdownAdapter,K)
}Z.dropdownAdapter=e.Decorate(Z.dropdownAdapter,r)
}if(Z.selectionAdapter==null){if(Z.multiple){Z.selectionAdapter=t
}else{Z.selectionAdapter=o
}if(Z.placeholder!=null){Z.selectionAdapter=e.Decorate(Z.selectionAdapter,G)
}if(Z.allowClear){Z.selectionAdapter=e.Decorate(Z.selectionAdapter,j)
}if(Z.multiple){Z.selectionAdapter=e.Decorate(Z.selectionAdapter,C)
}if(Z.containerCssClass!=null||Z.containerCss!=null||Z.adaptContainerCssClass!=null){var T=k(Z.amdBase+"compat/containerCss");
Z.selectionAdapter=e.Decorate(Z.selectionAdapter,T)
}Z.selectionAdapter=e.Decorate(Z.selectionAdapter,F)
}if(typeof Z.language==="string"){if(Z.language.indexOf("-")>0){var O=Z.language.split("-");
var Q=O[0];
Z.language=[Z.language,Q]
}else{Z.language=[Z.language]
}}if(g.isArray(Z.language)){var N=new u();
Z.language.push("en");
var W=Z.language;
for(var M=0;
M<W.length;
M++){var J=W[M];
var P={};
try{P=u.loadPath(J)
}catch(S){try{J=this.defaults.amdLanguageBase+J;
P=u.loadPath(J)
}catch(V){if(Z.debug&&window.console&&console.warn){console.warn('Select2: The language file for "'+J+'" could not be automatically loaded. A fallback will be used instead.')
}continue
}}N.extend(P)
}Z.translations=N
}else{var U=u.loadPath(this.defaults.amdLanguageBase+"en");
var X=new u(Z.language);
X.extend(U);
Z.translations=X
}return Z
};
p.prototype.reset=function(){function K(M){function L(N){return I[N]||N
}return M.replace(/[^\u0000-\u007E]/g,L)
}function J(Q,P){if(g.trim(Q.term)===""){return P
}if(P.children&&P.children.length>0){var L=g.extend(true,{},P);
for(var S=P.children.length-1;
S>=0;
S--){var R=P.children[S];
var O=J(Q,R);
if(O==null){L.children.splice(S,1)
}}if(L.children.length>0){return L
}return J(Q,L)
}var N=K(P.text).toUpperCase();
var M=K(Q.term).toUpperCase();
if(N.indexOf(M)>-1){return P
}return null
}this.defaults={amdBase:"./",amdLanguageBase:"./i18n/",closeOnSelect:true,debug:false,dropdownAutoWidth:false,escapeMarkup:e.escapeMarkup,language:y,matcher:J,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:false,sorter:function(L){return L
},templateResult:function(L){return L.text
},templateSelection:function(L){return L.text
},theme:"default",width:"resolve"}
};
p.prototype.set=function(K,M){var J=g.camelCase(K);
var L={};
L[J]=M;
var N=e._convertData(L);
g.extend(this.defaults,N)
};
var n=new p();
return n
});
d.define("select2/options",["require","jquery","./defaults","./utils"],function(f,h,i,g){function e(l,j){this.options=l;
if(j!=null){this.fromElement(j)
}this.options=i.apply(this.options);
if(j&&j.is("input")){var k=f(this.get("amdBase")+"compat/inputData");
this.options.dataAdapter=g.Decorate(this.options.dataAdapter,k)
}}e.prototype.fromElement=function(j){var l=["select2"];
if(this.options.multiple==null){this.options.multiple=j.prop("multiple")
}if(this.options.disabled==null){this.options.disabled=j.prop("disabled")
}if(this.options.language==null){if(j.prop("lang")){this.options.language=j.prop("lang").toLowerCase()
}else{if(j.closest("[lang]").prop("lang")){this.options.language=j.closest("[lang]").prop("lang")
}}}if(this.options.dir==null){if(j.prop("dir")){this.options.dir=j.prop("dir")
}else{if(j.closest("[dir]").prop("dir")){this.options.dir=j.closest("[dir]").prop("dir")
}else{this.options.dir="ltr"
}}}j.prop("disabled",this.options.disabled);
j.prop("multiple",this.options.multiple);
if(j.data("select2Tags")){if(this.options.debug&&window.console&&console.warn){console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.')
}j.data("data",j.data("select2Tags"));
j.data("tags",true)
}if(j.data("ajaxUrl")){if(this.options.debug&&window.console&&console.warn){console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2.")
}j.attr("ajax--url",j.data("ajaxUrl"));
j.data("ajax--url",j.data("ajaxUrl"))
}var n={};
if(h.fn.jquery&&h.fn.jquery.substr(0,2)=="1."&&j[0].dataset){n=h.extend(true,{},j[0].dataset,j.data())
}else{n=j.data()
}var m=h.extend(true,{},n);
m=g._convertData(m);
for(var k in m){if(h.inArray(k,l)>-1){continue
}if(h.isPlainObject(this.options[k])){h.extend(this.options[k],m[k])
}else{this.options[k]=m[k]
}}return this
};
e.prototype.get=function(j){return this.options[j]
};
e.prototype.set=function(j,k){this.options[j]=k
};
return e
});
d.define("select2/core",["jquery","./options","./utils","./keys"],function(i,g,h,e){var f=function(o,r){if(o.data("select2")!=null){o.data("select2").destroy()
}this.$element=o;
this.id=this._generateId(o);
r=r||{};
this.options=new g(r,o);
f.__super__.constructor.call(this);
var m=o.attr("tabindex")||0;
o.data("old-tabindex",m);
o.attr("tabindex","-1");
var l=this.options.get("dataAdapter");
this.dataAdapter=new l(o,this.options);
var q=this.render();
this._placeContainer(q);
var n=this.options.get("selectionAdapter");
this.selection=new n(o,this.options);
this.$selection=this.selection.render();
this.selection.position(this.$selection,q);
var j=this.options.get("dropdownAdapter");
this.dropdown=new j(o,this.options);
this.$dropdown=this.dropdown.render();
this.dropdown.position(this.$dropdown,q);
var k=this.options.get("resultsAdapter");
this.results=new k(o,this.options,this.dataAdapter);
this.$results=this.results.render();
this.results.position(this.$results,this.$dropdown);
var p=this;
this._bindAdapters();
this._registerDomEvents();
this._registerDataEvents();
this._registerSelectionEvents();
this._registerDropdownEvents();
this._registerResultsEvents();
this._registerEvents();
this.dataAdapter.current(function(s){p.trigger("selection:update",{data:s})
});
o.addClass("select2-hidden-accessible");
o.attr("aria-hidden","true");
this._syncAttributes();
o.data("select2",this)
};
h.Extend(f,h.Observable);
f.prototype._generateId=function(j){var k="";
if(j.attr("id")!=null){k=j.attr("id")
}else{if(j.attr("name")!=null){k=j.attr("name")+"-"+h.generateChars(2)
}else{k=h.generateChars(4)
}}k=k.replace(/(:|\.|\[|\]|,)/g,"");
k="select2-"+k;
return k
};
f.prototype._placeContainer=function(k){k.insertAfter(this.$element);
var j=this._resolveWidth(this.$element,this.options.get("width"));
if(j!=null){k.css("width",j)
}};
f.prototype._resolveWidth=function(u,j){var s=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
if(j=="resolve"){var n=this._resolveWidth(u,"style");
if(n!=null){return n
}return this._resolveWidth(u,"element")
}if(j=="element"){var r=u.outerWidth(false);
if(r<=0){return"auto"
}return r+"px"
}if(j=="style"){var k=u.attr("style");
if(typeof(k)!=="string"){return null
}var t=k.split(";");
for(var o=0,m=t.length;
o<m;
o=o+1){var q=t[o].replace(/\s/g,"");
var p=q.match(s);
if(p!==null&&p.length>=1){return p[1]
}}return null
}return j
};
f.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container);
this.selection.bind(this,this.$container);
this.dropdown.bind(this,this.$container);
this.results.bind(this,this.$container)
};
f.prototype._registerDomEvents=function(){var k=this;
this.$element.on("change.select2",function(){k.dataAdapter.current(function(l){k.trigger("selection:update",{data:l})
})
});
this.$element.on("focus.select2",function(l){k.trigger("focus",l)
});
this._syncA=h.bind(this._syncAttributes,this);
this._syncS=h.bind(this._syncSubtree,this);
if(this.$element[0].attachEvent){this.$element[0].attachEvent("onpropertychange",this._syncA)
}var j=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;
if(j!=null){this._observer=new j(function(l){i.each(l,k._syncA);
i.each(l,k._syncS)
});
this._observer.observe(this.$element[0],{attributes:true,childList:true,subtree:false})
}else{if(this.$element[0].addEventListener){this.$element[0].addEventListener("DOMAttrModified",k._syncA,false);
this.$element[0].addEventListener("DOMNodeInserted",k._syncS,false);
this.$element[0].addEventListener("DOMNodeRemoved",k._syncS,false)
}}};
f.prototype._registerDataEvents=function(){var j=this;
this.dataAdapter.on("*",function(k,l){j.trigger(k,l)
})
};
f.prototype._registerSelectionEvents=function(){var j=this;
var k=["toggle","focus"];
this.selection.on("toggle",function(){j.toggleDropdown()
});
this.selection.on("focus",function(l){j.focus(l)
});
this.selection.on("*",function(l,m){if(i.inArray(l,k)!==-1){return
}j.trigger(l,m)
})
};
f.prototype._registerDropdownEvents=function(){var j=this;
this.dropdown.on("*",function(k,l){j.trigger(k,l)
})
};
f.prototype._registerResultsEvents=function(){var j=this;
this.results.on("*",function(k,l){j.trigger(k,l)
})
};
f.prototype._registerEvents=function(){var j=this;
this.on("open",function(){j.$container.addClass("select2-container--open")
});
this.on("close",function(){j.$container.removeClass("select2-container--open")
});
this.on("enable",function(){j.$container.removeClass("select2-container--disabled")
});
this.on("disable",function(){j.$container.addClass("select2-container--disabled")
});
this.on("blur",function(){j.$container.removeClass("select2-container--focus")
});
this.on("query",function(k){if(!j.isOpen()){j.trigger("open",{})
}this.dataAdapter.query(k,function(l){j.trigger("results:all",{data:l,query:k})
})
});
this.on("query:append",function(k){this.dataAdapter.query(k,function(l){j.trigger("results:append",{data:l,query:k})
})
});
this.on("open",function(){setTimeout(function(){j.focusOnActiveElement()
},1)
});
i(document).on("keydown",function(k){var m=k.which;
if(j.isOpen()){if(m===e.ESC||m===e.TAB||(m===e.UP&&k.altKey)){j.close();
k.preventDefault()
}else{if(m===e.ENTER){j.trigger("results:select",{});
k.preventDefault()
}else{if((m===e.SPACE&&k.ctrlKey)){j.trigger("results:toggle",{});
k.preventDefault()
}else{if(m===e.UP){j.trigger("results:previous",{});
k.preventDefault()
}else{if(m===e.DOWN){j.trigger("results:next",{});
k.preventDefault()
}}}}}var l=j.$dropdown.find(".select2-search__field");
if(!l.length){l=j.$container.find(".select2-search__field")
}if(m===e.DOWN||m===e.UP){j.focusOnActiveElement()
}else{l.focus();
setTimeout(function(){j.focusOnActiveElement()
},1000)
}}else{if(j.hasFocus()){if(m===e.ENTER||m===e.SPACE){j.open();
k.preventDefault()
}}}})
};
f.prototype.focusOnActiveElement=function(){if(this.isOpen()&&!h.isTouchscreen()){this.$results.find("li.select2-results__option--highlighted").focus()
}};
f.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled"));
if(this.options.get("disabled")){if(this.isOpen()){this.close()
}this.trigger("disable",{})
}else{this.trigger("enable",{})
}};
f.prototype._syncSubtree=function(k,j){var o=false;
var l=this;
if(k&&k.target&&(k.target.nodeName!=="OPTION"&&k.target.nodeName!=="OPTGROUP")){return
}if(!j){o=true
}else{if(j.addedNodes&&j.addedNodes.length>0){for(var p=0;
p<j.addedNodes.length;
p++){var m=j.addedNodes[p];
if(m.selected){o=true
}}}else{if(j.removedNodes&&j.removedNodes.length>0){o=true
}}}if(o){this.dataAdapter.current(function(n){l.trigger("selection:update",{data:n})
})
}};
f.prototype.trigger=function(m,l){var n=f.__super__.trigger;
var o={open:"opening",close:"closing",select:"selecting",unselect:"unselecting"};
if(l===undefined){l={}
}if(m in o){var k=o[m];
var j={prevented:false,name:m,args:l};
n.call(this,k,j);
if(j.prevented){l.prevented=true;
return
}}n.call(this,m,l)
};
f.prototype.toggleDropdown=function(){if(this.options.get("disabled")){return
}if(this.isOpen()){this.close()
}else{this.open()
}};
f.prototype.open=function(){if(this.isOpen()){return
}this.trigger("query",{})
};
f.prototype.close=function(){if(!this.isOpen()){return
}this.trigger("close",{})
};
f.prototype.isOpen=function(){return this.$container.hasClass("select2-container--open")
};
f.prototype.hasFocus=function(){return this.$container.hasClass("select2-container--focus")
};
f.prototype.focus=function(j){if(this.hasFocus()){return
}this.$container.addClass("select2-container--focus");
this.trigger("focus",{})
};
f.prototype.enable=function(j){if(this.options.get("debug")&&window.console&&console.warn){console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.')
}if(j==null||j.length===0){j=[true]
}var k=!j[0];
this.$element.prop("disabled",k)
};
f.prototype.data=function(){if(this.options.get("debug")&&arguments.length>0&&window.console&&console.warn){console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.')
}var j=[];
this.dataAdapter.current(function(k){j=k
});
return j
};
f.prototype.val=function(k){if(this.options.get("debug")&&window.console&&console.warn){console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.')
}if(k==null||k.length===0){return this.$element.val()
}var j=k[0];
if(i.isArray(j)){j=i.map(j,function(l){return l.toString()
})
}this.$element.val(j).trigger("change")
};
f.prototype.destroy=function(){this.$container.remove();
if(this.$element[0].detachEvent){this.$element[0].detachEvent("onpropertychange",this._syncA)
}if(this._observer!=null){this._observer.disconnect();
this._observer=null
}else{if(this.$element[0].removeEventListener){this.$element[0].removeEventListener("DOMAttrModified",this._syncA,false);
this.$element[0].removeEventListener("DOMNodeInserted",this._syncS,false);
this.$element[0].removeEventListener("DOMNodeRemoved",this._syncS,false)
}}this._syncA=null;
this._syncS=null;
this.$element.off(".select2");
this.$element.attr("tabindex",this.$element.data("old-tabindex"));
this.$element.removeClass("select2-hidden-accessible");
this.$element.attr("aria-hidden","false");
this.$element.removeData("select2");
this.dataAdapter.destroy();
this.selection.destroy();
this.dropdown.destroy();
this.results.destroy();
this.dataAdapter=null;
this.selection=null;
this.dropdown=null;
this.results=null
};
f.prototype.render=function(){var j=i('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
j.attr("dir",this.options.get("dir"));
this.$container=j;
this.$container.addClass("select2-container--"+this.options.get("theme"));
j.data("element",this.$element);
return j
};
return f
});
d.define("select2/compat/utils",["jquery"],function(f){function e(l,g,h){var j,k=[],i;
j=f.trim(l.attr("class"));
if(j){j=""+j;
f(j.split(/\s+/)).each(function(){if(this.indexOf("select2-")===0){k.push(this)
}})
}j=f.trim(g.attr("class"));
if(j){j=""+j;
f(j.split(/\s+/)).each(function(){if(this.indexOf("select2-")!==0){i=h(this);
if(i!=null){k.push(i)
}}})
}l.attr("class",k.join(" "))
}return{syncCssClasses:e}
});
d.define("select2/compat/containerCss",["jquery","./utils"],function(h,e){function g(i){return null
}function f(){}f.prototype.render=function(k){var m=k.call(this);
var i=this.options.get("containerCssClass")||"";
if(h.isFunction(i)){i=i(this.$element)
}var l=this.options.get("adaptContainerCssClass");
l=l||g;
if(i.indexOf(":all:")!==-1){i=i.replace(":all:","");
var n=l;
l=function(o){var p=n(o);
if(p!=null){return p+" "+o
}return o
}
}var j=this.options.get("containerCss")||{};
if(h.isFunction(j)){j=j(this.$element)
}e.syncCssClasses(m,this.$element,l);
m.css(j);
m.addClass(i);
return m
};
return f
});
d.define("select2/compat/dropdownCss",["jquery","./utils"],function(h,f){function g(i){return null
}function e(){}e.prototype.render=function(k){var m=k.call(this);
var i=this.options.get("dropdownCssClass")||"";
if(h.isFunction(i)){i=i(this.$element)
}var j=this.options.get("adaptDropdownCssClass");
j=j||g;
if(i.indexOf(":all:")!==-1){i=i.replace(":all:","");
var n=j;
j=function(o){var p=n(o);
if(p!=null){return p+" "+o
}return o
}
}var l=this.options.get("dropdownCss")||{};
if(h.isFunction(l)){l=l(this.$element)
}f.syncCssClasses(m,this.$element,j);
m.css(l);
m.addClass(i);
return m
};
return e
});
d.define("select2/compat/initSelection",["jquery"],function(f){function e(i,g,h){if(h.get("debug")&&window.console&&console.warn){console.warn("Select2: The `initSelection` option has been deprecated in favor of a custom data adapter that overrides the `current` method. This method is now called multiple times instead of a single time when the instance is initialized. Support will be removed for the `initSelection` option in future versions of Select2")
}this.initSelection=h.get("initSelection");
this._isInitialized=false;
i.call(this,g,h)
}e.prototype.current=function(h,i){var g=this;
if(this._isInitialized){h.call(this,i);
return
}this.initSelection.call(null,this.$element,function(j){g._isInitialized=true;
if(!f.isArray(j)){j=[j]
}i(j)
})
};
return e
});
d.define("select2/compat/inputData",["jquery"],function(f){function e(i,g,h){this._currentData=[];
this._valueSeparator=h.get("valueSeparator")||",";
if(g.prop("type")==="hidden"){if(h.get("debug")&&console&&console.warn){console.warn("Select2: Using a hidden input with Select2 is no longer supported and may stop working in the future. It is recommended to use a `<select>` element instead.")
}}i.call(this,g,h)
}e.prototype.current=function(h,l){function g(o,m){var n=[];
if(o.selected||f.inArray(o.id,m)!==-1){o.selected=true;
n.push(o)
}else{o.selected=false
}if(o.children){n.push.apply(n,g(o.children,m))
}return n
}var i=[];
for(var k=0;
k<this._currentData.length;
k++){var j=this._currentData[k];
i.push.apply(i,g(j,this.$element.val().split(this._valueSeparator)))
}l(i)
};
e.prototype.select=function(g,i){if(!this.options.get("multiple")){this.current(function(j){f.map(j,function(k){k.selected=false
})
});
this.$element.val(i.id);
this.$element.trigger("change")
}else{var h=this.$element.val();
h+=this._valueSeparator+i.id;
this.$element.val(h);
this.$element.trigger("change")
}};
e.prototype.unselect=function(h,i){var g=this;
i.selected=false;
this.current(function(l){var j=[];
for(var m=0;
m<l.length;
m++){var k=l[m];
if(i.id==k.id){continue
}j.push(k.id)
}g.$element.val(j.join(g._valueSeparator));
g.$element.trigger("change")
})
};
e.prototype.query=function(g,l,m){var h=[];
for(var k=0;
k<this._currentData.length;
k++){var j=this._currentData[k];
var i=this.matches(l,j);
if(i!==null){h.push(i)
}}m({results:h})
};
e.prototype.addOptions=function(i,g){var h=f.map(g,function(j){return f.data(j[0],"data")
});
this._currentData.push.apply(this._currentData,h)
};
return e
});
d.define("select2/compat/matcher",["jquery"],function(f){function e(g){function h(l,k){var i=f.extend(true,{},k);
if(l.term==null||f.trim(l.term)===""){return i
}if(k.children){for(var n=k.children.length-1;
n>=0;
n--){var m=k.children[n];
var j=g(l.term,m.text,m);
if(!j){i.children.splice(n,1)
}}if(i.children.length>0){return i
}}if(g(l.term,k.text,k)){return i
}return null
}return h
}return e
});
d.define("select2/compat/query",[],function(){function e(h,f,g){if(g.get("debug")&&window.console&&console.warn){console.warn("Select2: The `query` option has been deprecated in favor of a custom data adapter that overrides the `query` method. Support will be removed for the `query` option in future versions of Select2.")
}h.call(this,f,g)
}e.prototype.query=function(f,h,i){h.callback=i;
var g=this.options.get("query");
g.call(null,h)
};
return e
});
d.define("select2/dropdown/attachContainer",[],function(){function e(h,f,g){h.call(this,f,g)
}e.prototype.position=function(g,h,i){var f=i.find(".dropdown-wrapper");
f.append(h);
h.addClass("select2-dropdown--below");
i.addClass("select2-container--below")
};
return e
});
d.define("select2/dropdown/stopPropagation",[],function(){function e(){}e.prototype.bind=function(h,f,i){h.call(this,f,i);
var g=["blur","change","click","dblclick","focus","focusin","focusout","input","keydown","keyup","keypress","mousedown","mouseenter","mouseleave","mousemove","mouseover","mouseup","search","touchend","touchstart"];
this.$dropdown.on(g.join(" "),function(j){j.stopPropagation()
})
};
return e
});
d.define("select2/selection/stopPropagation",[],function(){function e(){}e.prototype.bind=function(h,f,i){h.call(this,f,i);
var g=["blur","change","click","dblclick","focus","focusin","focusout","input","keydown","keyup","keypress","mousedown","mouseenter","mouseleave","mousemove","mouseover","mouseup","search","touchend","touchstart"];
this.$selection.on(g.join(" "),function(j){j.stopPropagation()
})
};
return e
});
/*!
         * jQuery Mousewheel 3.1.13
         *
         * Copyright jQuery Foundation and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         */
(function(e){if(typeof d.define==="function"&&d.define.amd){d.define("jquery-mousewheel",["jquery"],e)
}else{if(typeof exports==="object"){module.exports=e
}else{e(c)
}}}(function(g){var h=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],o=("onwheel" in document||document.documentMode>=9)?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],m=Array.prototype.slice,n,f;
if(g.event.fixHooks){for(var j=h.length;
j;
){g.event.fixHooks[h[--j]]=g.event.mouseHooks
}}var k=g.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener){for(var q=o.length;
q;
){this.addEventListener(o[--q],p,false)
}}else{this.onmousewheel=p
}g.data(this,"mousewheel-line-height",k.getLineHeight(this));
g.data(this,"mousewheel-page-height",k.getPageHeight(this))
},teardown:function(){if(this.removeEventListener){for(var q=o.length;
q;
){this.removeEventListener(o[--q],p,false)
}}else{this.onmousewheel=null
}g.removeData(this,"mousewheel-line-height");
g.removeData(this,"mousewheel-page-height")
},getLineHeight:function(q){var i=g(q),r=i["offsetParent" in g.fn?"offsetParent":"parent"]();
if(!r.length){r=g("body")
}return parseInt(r.css("fontSize"),10)||parseInt(i.css("fontSize"),10)||16
},getPageHeight:function(i){return g(i).height()
},settings:{adjustOldDeltas:true,normalizeOffset:true}};
g.fn.extend({mousewheel:function(i){return i?this.bind("mousewheel",i):this.trigger("mousewheel")
},unmousewheel:function(i){return this.unbind("mousewheel",i)
}});
function p(i){var s=i||window.event,y=m.call(arguments,1),A=0,u=0,t=0,x=0,w=0,v=0;
i=g.event.fix(s);
i.type="mousewheel";
if("detail" in s){t=s.detail*-1
}if("wheelDelta" in s){t=s.wheelDelta
}if("wheelDeltaY" in s){t=s.wheelDeltaY
}if("wheelDeltaX" in s){u=s.wheelDeltaX*-1
}if("axis" in s&&s.axis===s.HORIZONTAL_AXIS){u=t*-1;
t=0
}A=t===0?u:t;
if("deltaY" in s){t=s.deltaY*-1;
A=t
}if("deltaX" in s){u=s.deltaX;
if(t===0){A=u*-1
}}if(t===0&&u===0){return
}if(s.deltaMode===1){var z=g.data(this,"mousewheel-line-height");
A*=z;
t*=z;
u*=z
}else{if(s.deltaMode===2){var r=g.data(this,"mousewheel-page-height");
A*=r;
t*=r;
u*=r
}}x=Math.max(Math.abs(t),Math.abs(u));
if(!f||x<f){f=x;
if(e(s,x)){f/=40
}}if(e(s,x)){A/=40;
u/=40;
t/=40
}A=Math[A>=1?"floor":"ceil"](A/f);
u=Math[u>=1?"floor":"ceil"](u/f);
t=Math[t>=1?"floor":"ceil"](t/f);
if(k.settings.normalizeOffset&&this.getBoundingClientRect){var q=this.getBoundingClientRect();
w=i.clientX-q.left;
v=i.clientY-q.top
}i.deltaX=u;
i.deltaY=t;
i.deltaFactor=f;
i.offsetX=w;
i.offsetY=v;
i.deltaMode=0;
y.unshift(i,A,u,t);
if(n){clearTimeout(n)
}n=setTimeout(l,200);
return(g.event.dispatch||g.event.handle).apply(this,y)
}function l(){f=null
}function e(q,i){return k.settings.adjustOldDeltas&&q.type==="mousewheel"&&i%120===0
}}));
d.define("jquery.select2",["jquery","jquery-mousewheel","./select2/core","./select2/defaults"],function(h,g,e,i){if(h.fn.selectWoo==null){var f=["open","close","destroy"];
h.fn.selectWoo=function(l){l=l||{};
if(typeof l==="object"){this.each(function(){var n=h.extend(true,{},l);
var m=new e(h(this),n)
});
return this
}else{if(typeof l==="string"){var k;
var j=Array.prototype.slice.call(arguments,1);
this.each(function(){var m=h(this).data("select2");
if(m==null&&window.console&&console.error){console.error("The select2('"+l+"') method was called on an element that is not using Select2.")
}k=m[l].apply(m,j)
});
if(h.inArray(l,f)>-1){return this
}return k
}else{throw new Error("Invalid arguments for Select2: "+l)
}}}
}if(h.fn.select2!=null&&h.fn.select2.defaults!=null){h.fn.selectWoo.defaults=h.fn.select2.defaults
}if(h.fn.selectWoo.defaults==null){h.fn.selectWoo.defaults=i
}h.fn.select2=h.fn.select2||h.fn.selectWoo;
return e
});
return{define:d.define,require:d.require}
}());
var a=b.require("jquery.select2");
c.fn.select2.amd=b;
c.fn.selectWoo.amd=b;
return a
}));
/*! dustjs-linkedin - v2.7.5
* http://dustjs.com/
* Copyright (c) 2016 Aleksander Williams; Released under the MIT License */
(function(a,b){if(typeof define==="function"&&define.amd&&define.amd.dust===true){define("dust.core",[],b)
}else{if(typeof exports==="object"){module.exports=b()
}else{a.dust=b()
}}}(this,function(){var dust={version:"2.7.5"},NONE="NONE",ERROR="ERROR",WARN="WARN",INFO="INFO",DEBUG="DEBUG",EMPTY_FUNC=function(){};
dust.config={whitespace:false,amd:false,cjs:false,cache:true};
dust._aliases={write:"w",end:"e",map:"m",render:"r",reference:"f",section:"s",exists:"x",notexists:"nx",block:"b",partial:"p",helper:"h"};
(function initLogging(){var loggingLevels={DEBUG:0,INFO:1,WARN:2,ERROR:3,NONE:4},consoleLog,log;
if(typeof console!=="undefined"&&console.log){consoleLog=console.log;
if(typeof consoleLog==="function"){log=function(){consoleLog.apply(console,arguments)
}
}else{log=function(){consoleLog(Array.prototype.slice.apply(arguments).join(" "))
}
}}else{log=EMPTY_FUNC
}dust.log=function(message,type){type=type||INFO;
if(loggingLevels[type]>=loggingLevels[dust.debugLevel]){log("[DUST:"+type+"]",message)
}};
dust.debugLevel=NONE;
if(typeof process!=="undefined"&&process.env&&/\bdust\b/.test(process.env.DEBUG)){dust.debugLevel=DEBUG
}}());
dust.helpers={};
dust.cache={};
dust.register=function(name,tmpl){if(!name){return
}tmpl.templateName=name;
if(dust.config.cache!==false){dust.cache[name]=tmpl
}};
dust.render=function(nameOrTemplate,context,callback){var chunk=new Stub(callback).head;
try{load(nameOrTemplate,chunk,context).end()
}catch(err){chunk.setError(err)
}};
dust.stream=function(nameOrTemplate,context){var stream=new Stream(),chunk=stream.head;
dust.nextTick(function(){try{load(nameOrTemplate,chunk,context).end()
}catch(err){chunk.setError(err)
}});
return stream
};
function getTemplate(nameOrTemplate,loadFromCache){if(!nameOrTemplate){return
}if(typeof nameOrTemplate==="function"&&nameOrTemplate.template){return nameOrTemplate.template
}if(dust.isTemplateFn(nameOrTemplate)){return nameOrTemplate
}if(loadFromCache!==false){return dust.cache[nameOrTemplate]
}}function load(nameOrTemplate,chunk,context){if(!nameOrTemplate){return chunk.setError(new Error("No template or template name provided to render"))
}var template=getTemplate(nameOrTemplate,dust.config.cache);
if(template){return template(chunk,Context.wrap(context,template.templateName))
}else{if(dust.onLoad){return chunk.map(function(chunk){var name=nameOrTemplate;
function done(err,srcOrTemplate){var template;
if(err){return chunk.setError(err)
}template=getTemplate(srcOrTemplate,false)||getTemplate(name,dust.config.cache);
if(!template){if(dust.compile){template=dust.loadSource(dust.compile(srcOrTemplate,name))
}else{return chunk.setError(new Error("Dust compiler not available"))
}}template(chunk,Context.wrap(context,template.templateName)).end()
}if(dust.onLoad.length===3){dust.onLoad(name,context.options,done)
}else{dust.onLoad(name,done)
}})
}return chunk.setError(new Error("Template Not Found: "+nameOrTemplate))
}}dust.loadSource=function(source){return eval(source)
};
if(Array.isArray){dust.isArray=Array.isArray
}else{dust.isArray=function(arr){return Object.prototype.toString.call(arr)==="[object Array]"
}
}dust.nextTick=(function(){return function(callback){setTimeout(callback,0)
}
})();
dust.isEmpty=function(value){if(value===0){return false
}if(dust.isArray(value)&&!value.length){return true
}return !value
};
dust.isEmptyObject=function(obj){var key;
if(obj===null){return false
}if(obj===undefined){return false
}if(obj.length>0){return false
}for(key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){return false
}}return true
};
dust.isTemplateFn=function(elem){return typeof elem==="function"&&elem.__dustBody
};
dust.isThenable=function(elem){return elem&&typeof elem==="object"&&typeof elem.then==="function"
};
dust.isStreamable=function(elem){return elem&&typeof elem.on==="function"&&typeof elem.pipe==="function"
};
dust.filter=function(string,auto,filters,context){var i,len,name,filter;
if(filters){for(i=0,len=filters.length;
i<len;
i++){name=filters[i];
if(!name.length){continue
}filter=dust.filters[name];
if(name==="s"){auto=null
}else{if(typeof filter==="function"){string=filter(string,context)
}else{dust.log("Invalid filter `"+name+"`",WARN)
}}}}if(auto){string=dust.filters[auto](string,context)
}return string
};
dust.filters={h:function(value){return dust.escapeHtml(value)
},j:function(value){return dust.escapeJs(value)
},u:encodeURI,uc:encodeURIComponent,js:function(value){return dust.escapeJSON(value)
},jp:function(value){if(!JSON){dust.log("JSON is undefined; could not parse `"+value+"`",WARN);
return value
}else{return JSON.parse(value)
}}};
function Context(stack,global,options,blocks,templateName){if(stack!==undefined&&!(stack instanceof Stack)){stack=new Stack(stack)
}this.stack=stack;
this.global=global;
this.options=options;
this.blocks=blocks;
this.templateName=templateName;
this._isContext=true
}dust.makeBase=dust.context=function(global,options){return new Context(undefined,global,options)
};
dust.isContext=function(obj){return typeof obj==="object"&&obj._isContext===true
};
function getWithResolvedData(ctx,cur,down){return function(data){return ctx.push(data)._get(cur,down)
}
}Context.wrap=function(context,name){if(dust.isContext(context)){return context
}return new Context(context,{},{},null,name)
};
Context.prototype.get=function(path,cur){if(typeof path==="string"){if(path[0]==="."){cur=true;
path=path.substr(1)
}path=path.split(".")
}return this._get(cur,path)
};
Context.prototype._get=function(cur,down){var ctx=this.stack||{},i=1,value,first,len,ctxThis,fn;
first=down[0];
len=down.length;
if(cur&&len===0){ctxThis=ctx;
ctx=ctx.head
}else{if(!cur){while(ctx){if(ctx.isObject){ctxThis=ctx.head;
value=ctx.head[first];
if(value!==undefined){break
}}ctx=ctx.tail
}if(value!==undefined){ctx=value
}else{ctx=this.global&&this.global[first]
}}else{if(ctx){if(ctx.head){ctx=ctx.head[first]
}else{ctx=undefined
}}}while(ctx&&i<len){if(dust.isThenable(ctx)){return ctx.then(getWithResolvedData(this,cur,down.slice(i)))
}ctxThis=ctx;
ctx=ctx[down[i]];
i++
}}if(typeof ctx==="function"){fn=function(){try{return ctx.apply(ctxThis,arguments)
}catch(err){dust.log(err,ERROR);
throw err
}};
fn.__dustBody=!!ctx.__dustBody;
return fn
}else{if(ctx===undefined){dust.log("Cannot find reference `{"+down.join(".")+"}` in template `"+this.getTemplateName()+"`",INFO)
}return ctx
}};
Context.prototype.getPath=function(cur,down){return this._get(cur,down)
};
Context.prototype.push=function(head,idx,len){if(head===undefined){dust.log("Not pushing an undefined variable onto the context",INFO);
return this
}return this.rebase(new Stack(head,this.stack,idx,len))
};
Context.prototype.pop=function(){var head=this.current();
this.stack=this.stack&&this.stack.tail;
return head
};
Context.prototype.rebase=function(head){return new Context(head,this.global,this.options,this.blocks,this.getTemplateName())
};
Context.prototype.clone=function(){var context=this.rebase();
context.stack=this.stack;
return context
};
Context.prototype.current=function(){return this.stack&&this.stack.head
};
Context.prototype.getBlock=function(key){var blocks,len,fn;
if(typeof key==="function"){key=key(new Chunk(),this).data.join("")
}blocks=this.blocks;
if(!blocks){dust.log("No blocks for context `"+key+"` in template `"+this.getTemplateName()+"`",DEBUG);
return false
}len=blocks.length;
while(len--){fn=blocks[len][key];
if(fn){return fn
}}dust.log("Malformed template `"+this.getTemplateName()+"` was missing one or more blocks.");
return false
};
Context.prototype.shiftBlocks=function(locals){var blocks=this.blocks,newBlocks;
if(locals){if(!blocks){newBlocks=[locals]
}else{newBlocks=blocks.concat([locals])
}return new Context(this.stack,this.global,this.options,newBlocks,this.getTemplateName())
}return this
};
Context.prototype.resolve=function(body){var chunk;
if(typeof body!=="function"){return body
}chunk=new Chunk().render(body,this);
if(chunk instanceof Chunk){return chunk.data.join("")
}return chunk
};
Context.prototype.getTemplateName=function(){return this.templateName
};
function Stack(head,tail,idx,len){this.tail=tail;
this.isObject=head&&typeof head==="object";
this.head=head;
this.index=idx;
this.of=len
}function Stub(callback){this.head=new Chunk(this);
this.callback=callback;
this.out=""
}Stub.prototype.flush=function(){var chunk=this.head;
while(chunk){if(chunk.flushable){this.out+=chunk.data.join("")
}else{if(chunk.error){this.callback(chunk.error);
dust.log("Rendering failed with error `"+chunk.error+"`",ERROR);
this.flush=EMPTY_FUNC;
return
}else{return
}}chunk=chunk.next;
this.head=chunk
}this.callback(null,this.out)
};
function Stream(){this.head=new Chunk(this)
}Stream.prototype.flush=function(){var chunk=this.head;
while(chunk){if(chunk.flushable){this.emit("data",chunk.data.join(""))
}else{if(chunk.error){this.emit("error",chunk.error);
this.emit("end");
dust.log("Streaming failed with error `"+chunk.error+"`",ERROR);
this.flush=EMPTY_FUNC;
return
}else{return
}}chunk=chunk.next;
this.head=chunk
}this.emit("end")
};
Stream.prototype.emit=function(type,data){var events=this.events||{},handlers=events[type]||[],i,l;
if(!handlers.length){dust.log("Stream broadcasting, but no listeners for `"+type+"`",DEBUG);
return false
}handlers=handlers.slice(0);
for(i=0,l=handlers.length;
i<l;
i++){handlers[i](data)
}return true
};
Stream.prototype.on=function(type,callback){var events=this.events=this.events||{},handlers=events[type]=events[type]||[];
if(typeof callback!=="function"){dust.log("No callback function provided for `"+type+"` event listener",WARN)
}else{handlers.push(callback)
}return this
};
Stream.prototype.pipe=function(stream){if(typeof stream.write!=="function"||typeof stream.end!=="function"){dust.log("Incompatible stream passed to `pipe`",WARN);
return this
}var destEnded=false;
if(typeof stream.emit==="function"){stream.emit("pipe",this)
}if(typeof stream.on==="function"){stream.on("error",function(){destEnded=true
})
}return this.on("data",function(data){if(destEnded){return
}try{stream.write(data,"utf8")
}catch(err){dust.log(err,ERROR)
}}).on("end",function(){if(destEnded){return
}try{stream.end();
destEnded=true
}catch(err){dust.log(err,ERROR)
}})
};
function Chunk(root,next,taps){this.root=root;
this.next=next;
this.data=[];
this.flushable=false;
this.taps=taps
}Chunk.prototype.write=function(data){var taps=this.taps;
if(taps){data=taps.go(data)
}this.data.push(data);
return this
};
Chunk.prototype.end=function(data){if(data){this.write(data)
}this.flushable=true;
this.root.flush();
return this
};
Chunk.prototype.map=function(callback){var cursor=new Chunk(this.root,this.next,this.taps),branch=new Chunk(this.root,cursor,this.taps);
this.next=branch;
this.flushable=true;
try{callback(branch)
}catch(err){dust.log(err,ERROR);
branch.setError(err)
}return cursor
};
Chunk.prototype.tap=function(tap){var taps=this.taps;
if(taps){this.taps=taps.push(tap)
}else{this.taps=new Tap(tap)
}return this
};
Chunk.prototype.untap=function(){this.taps=this.taps.tail;
return this
};
Chunk.prototype.render=function(body,context){return body(this,context)
};
Chunk.prototype.reference=function(elem,context,auto,filters){if(typeof elem==="function"){elem=elem.apply(context.current(),[this,context,null,{auto:auto,filters:filters}]);
if(elem instanceof Chunk){return elem
}else{return this.reference(elem,context,auto,filters)
}}if(dust.isThenable(elem)){return this.await(elem,context,null,auto,filters)
}else{if(dust.isStreamable(elem)){return this.stream(elem,context,null,auto,filters)
}else{if(!dust.isEmpty(elem)){return this.write(dust.filter(elem,auto,filters,context))
}else{return this
}}}};
Chunk.prototype.section=function(elem,context,bodies,params){var body=bodies.block,skip=bodies["else"],chunk=this,i,len,head;
if(typeof elem==="function"&&!dust.isTemplateFn(elem)){try{elem=elem.apply(context.current(),[this,context,bodies,params])
}catch(err){dust.log(err,ERROR);
return this.setError(err)
}if(elem instanceof Chunk){return elem
}}if(dust.isEmptyObject(bodies)){return chunk
}if(!dust.isEmptyObject(params)){context=context.push(params)
}if(dust.isArray(elem)){if(body){len=elem.length;
if(len>0){head=context.stack&&context.stack.head||{};
head.$len=len;
for(i=0;
i<len;
i++){head.$idx=i;
chunk=body(chunk,context.push(elem[i],i,len))
}head.$idx=undefined;
head.$len=undefined;
return chunk
}else{if(skip){return skip(this,context)
}}}}else{if(dust.isThenable(elem)){return this.await(elem,context,bodies)
}else{if(dust.isStreamable(elem)){return this.stream(elem,context,bodies)
}else{if(elem===true){if(body){return body(this,context)
}}else{if(elem||elem===0){if(body){return body(this,context.push(elem))
}}else{if(skip){return skip(this,context)
}}}}}}dust.log("Section without corresponding key in template `"+context.getTemplateName()+"`",DEBUG);
return this
};
Chunk.prototype.exists=function(elem,context,bodies){var body=bodies.block,skip=bodies["else"];
if(!dust.isEmpty(elem)){if(body){return body(this,context)
}dust.log("No block for exists check in template `"+context.getTemplateName()+"`",DEBUG)
}else{if(skip){return skip(this,context)
}}return this
};
Chunk.prototype.notexists=function(elem,context,bodies){var body=bodies.block,skip=bodies["else"];
if(dust.isEmpty(elem)){if(body){return body(this,context)
}dust.log("No block for not-exists check in template `"+context.getTemplateName()+"`",DEBUG)
}else{if(skip){return skip(this,context)
}}return this
};
Chunk.prototype.block=function(elem,context,bodies){var body=elem||bodies.block;
if(body){return body(this,context)
}return this
};
Chunk.prototype.partial=function(elem,context,partialContext,params){var head;
if(params===undefined){params=partialContext;
partialContext=context
}if(!dust.isEmptyObject(params)){partialContext=partialContext.clone();
head=partialContext.pop();
partialContext=partialContext.push(params).push(head)
}if(dust.isTemplateFn(elem)){return this.capture(elem,context,function(name,chunk){partialContext.templateName=name;
load(name,chunk,partialContext).end()
})
}else{partialContext.templateName=elem;
return load(elem,this,partialContext)
}};
Chunk.prototype.helper=function(name,context,bodies,params,auto){var chunk=this,filters=params.filters,ret;
if(auto===undefined){auto="h"
}if(dust.helpers[name]){try{ret=dust.helpers[name](chunk,context,bodies,params);
if(ret instanceof Chunk){return ret
}if(typeof filters==="string"){filters=filters.split("|")
}if(!dust.isEmptyObject(bodies)){return chunk.section(ret,context,bodies,params)
}return chunk.reference(ret,context,auto,filters)
}catch(err){dust.log("Error in helper `"+name+"`: "+err.message,ERROR);
return chunk.setError(err)
}}else{dust.log("Helper `"+name+"` does not exist",WARN);
return chunk
}};
Chunk.prototype.await=function(thenable,context,bodies,auto,filters){return this.map(function(chunk){thenable.then(function(data){if(bodies){chunk=chunk.section(data,context,bodies)
}else{chunk=chunk.reference(data,context,auto,filters)
}chunk.end()
},function(err){var errorBody=bodies&&bodies.error;
if(errorBody){chunk.render(errorBody,context.push(err)).end()
}else{dust.log("Unhandled promise rejection in `"+context.getTemplateName()+"`",INFO);
chunk.end()
}})
})
};
Chunk.prototype.stream=function(stream,context,bodies,auto,filters){var body=bodies&&bodies.block,errorBody=bodies&&bodies.error;
return this.map(function(chunk){var ended=false;
stream.on("data",function data(thunk){if(ended){return
}if(body){chunk=chunk.map(function(chunk){chunk.render(body,context.push(thunk)).end()
})
}else{if(!bodies){chunk=chunk.reference(thunk,context,auto,filters)
}}}).on("error",function error(err){if(ended){return
}if(errorBody){chunk.render(errorBody,context.push(err))
}else{dust.log("Unhandled stream error in `"+context.getTemplateName()+"`",INFO)
}if(!ended){ended=true;
chunk.end()
}}).on("end",function end(){if(!ended){ended=true;
chunk.end()
}})
})
};
Chunk.prototype.capture=function(body,context,callback){return this.map(function(chunk){var stub=new Stub(function(err,out){if(err){chunk.setError(err)
}else{callback(out,chunk)
}});
body(stub.head,context).end()
})
};
Chunk.prototype.setError=function(err){this.error=err;
this.root.flush();
return this
};
for(var f in Chunk.prototype){if(dust._aliases[f]){Chunk.prototype[dust._aliases[f]]=Chunk.prototype[f]
}}function Tap(head,tail){this.head=head;
this.tail=tail
}Tap.prototype.push=function(tap){return new Tap(tap,this)
};
Tap.prototype.go=function(value){var tap=this;
while(tap){value=tap.head(value);
tap=tap.tail
}return value
};
var HCHARS=/[&<>"']/,AMP=/&/g,LT=/</g,GT=/>/g,QUOT=/\"/g,SQUOT=/\'/g;
dust.escapeHtml=function(s){if(typeof s==="string"||(s&&typeof s.toString==="function")){if(typeof s!=="string"){s=s.toString()
}if(!HCHARS.test(s)){return s
}return s.replace(AMP,"&amp;").replace(LT,"&lt;").replace(GT,"&gt;").replace(QUOT,"&quot;").replace(SQUOT,"&#39;")
}return s
};
var BS=/\\/g,FS=/\//g,CR=/\r/g,LS=/\u2028/g,PS=/\u2029/g,NL=/\n/g,LF=/\f/g,SQ=/'/g,DQ=/"/g,TB=/\t/g;
dust.escapeJs=function(s){if(typeof s==="string"){return s.replace(BS,"\\\\").replace(FS,"\\/").replace(DQ,'\\"').replace(SQ,"\\'").replace(CR,"\\r").replace(LS,"\\u2028").replace(PS,"\\u2029").replace(NL,"\\n").replace(LF,"\\f").replace(TB,"\\t")
}return s
};
dust.escapeJSON=function(o){if(!JSON){dust.log("JSON is undefined; could not escape `"+o+"`",WARN);
return o
}else{return JSON.stringify(o).replace(LS,"\\u2028").replace(PS,"\\u2029").replace(LT,"\\u003c")
}};
return dust
}));
if(typeof define==="function"&&define.amd&&define.amd.dust===true){define(["require","dust.core"],function(a,b){b.onLoad=function(d,c){a([d],function(){c()
})
};
return b
})
}
/*! dustjs-helpers - v1.6.3
 * https://github.com/linkedin/dustjs-helpers
 * Copyright (c) 2015 Aleksander Williams; Released under the MIT License */
(function(a,b){if(typeof define==="function"&&define.amd&&define.amd.dust===true){define(["dust.core"],b)
}else{if(typeof exports==="object"){module.exports=b(require("dustjs-linkedin"))
}else{b(a.dust)
}}}(this,function(e){var k=e.log?function(m,n,o){o=o||"INFO";
m=m?"{@"+m+"}: ":"";
e.log(m+n,o)
}:function(){};
var d={};
function h(m){if(d[m]){return
}k(m,"Deprecation warning: "+m+" is deprecated and will be removed in a future version of dustjs-helpers","WARN");
k(null,"For help and a deprecation timeline, see https://github.com/linkedin/dustjs-helpers/wiki/Deprecated-Features#"+m.replace(/\W+/g,""),"WARN");
d[m]=true
}function i(m){return m.stack.tail&&m.stack.tail.head&&typeof m.stack.tail.head.__select__!=="undefined"
}function c(m){return i(m)&&m.get("__select__")
}function f(o,n){var m=o.stack.head,p=o.rebase();
if(o.stack&&o.stack.tail){p.stack=o.stack.tail
}return p.push({__select__:{isResolved:false,isDefaulted:false,isDeferredComplete:false,deferreds:[],key:n}}).push(m,o.stack.index,o.stack.of)
}function j(m,n){if(typeof n==="function"){return n.toString().replace(/(^\s+|\s+$)/mg,"").replace(/\n/mg,"").replace(/,\s*/mg,", ").replace(/\)\{/mg,") {")
}return n
}function b(v,n,m,q,u){q=q||{};
var t=m.block,r,o,p=c(n),s=q.filterOpType||"";
if(q.hasOwnProperty("key")){r=e.helpers.tap(q.key,v,n)
}else{if(p){r=p.key;
if(p.isResolved){u=function(){return false
}
}}else{k(s,"No key specified","WARN");
return v
}}o=e.helpers.tap(q.value,v,n);
if(u(g(o,q.type,n),g(r,q.type,n))){if(p){if(s==="default"){p.isDefaulted=true
}p.isResolved=true
}if(t){return v.render(t,n)
}else{return v
}}else{if(m["else"]){return v.render(m["else"],n)
}}return v
}function g(o,n,m){if(typeof o!=="undefined"){switch(n||typeof o){case"number":return +o;
case"string":return String(o);
case"boolean":o=(o==="false"?false:o);
return Boolean(o);
case"date":return new Date(o);
case"context":return m.get(o)
}}return o
}var a={tap:function(n,o,p){h("tap");
if(typeof n!=="function"){return n
}var m="",q;
q=o.tap(function(r){m+=r;
return""
}).render(n,p);
o.untap();
if(q.constructor!==o.constructor){return q
}else{if(m===""){return false
}else{return m
}}},sep:function(o,p,n){var m=n.block;
if(p.stack.index===p.stack.of-1){return o
}if(m){return m(o,p)
}else{return o
}},first:function(n,o,m){if(o.stack.index===0){return m.block(n,o)
}return n
},last:function(n,o,m){if(o.stack.index===o.stack.of-1){return m.block(n,o)
}return n
},contextDump:function(n,q,m,t){var s=t||{},u=s.to||"output",o=s.key||"current",r;
u=e.helpers.tap(u,n,q);
o=e.helpers.tap(o,n,q);
if(o==="full"){r=JSON.stringify(q.stack,j,2)
}else{r=JSON.stringify(q.stack.head,j,2)
}if(u==="console"){k("contextDump",r);
return n
}else{r=r.replace(/</g,"\\u003c");
return n.write(r)
}},math:function(s,p,n,q){if(q&&typeof q.key!=="undefined"&&q.method){var t=q.key,m=q.method,r=q.operand,u=q.round,o=null;
t=parseFloat(e.helpers.tap(t,s,p));
r=parseFloat(e.helpers.tap(r,s,p));
switch(m){case"mod":if(r===0||r===-0){k("math","Division by 0","ERROR")
}o=t%r;
break;
case"add":o=t+r;
break;
case"subtract":o=t-r;
break;
case"multiply":o=t*r;
break;
case"divide":if(r===0||r===-0){k("math","Division by 0","ERROR")
}o=t/r;
break;
case"ceil":o=Math.ceil(t);
break;
case"floor":o=Math.floor(t);
break;
case"round":o=Math.round(t);
break;
case"abs":o=Math.abs(t);
break;
case"toint":o=parseInt(t,10);
break;
default:k("math","Method `"+m+"` is not supported","ERROR")
}if(o!==null){if(u){o=Math.round(o)
}if(n&&n.block){p=f(p,o);
return s.render(n.block,p)
}else{return s.write(o)
}}else{return s
}}else{k("math","`key` or `method` was not provided","ERROR")
}return s
},select:function(t,o,m,p){var q=m.block,n,u,r,s;
if(p.hasOwnProperty("key")){u=e.helpers.tap(p.key,t,o);
if(q){o=f(o,u);
n=c(o);
t=t.render(q,o);
if(n.deferreds.length){n.isDeferredComplete=true;
for(s=0,r=n.deferreds.length;
s<r;
s++){n.deferreds[s]()
}}}else{k("select","Missing body block","WARN")
}}else{k("select","`key` is required","ERROR")
}return t
},eq:function(n,o,m,p){p.filterOpType="eq";
return b(n,o,m,p,function(q,r){return r===q
})
},ne:function(n,o,m,p){p.filterOpType="ne";
return b(n,o,m,p,function(q,r){return r!==q
})
},lt:function(n,o,m,p){p.filterOpType="lt";
return b(n,o,m,p,function(q,r){return r<q
})
},lte:function(n,o,m,p){p.filterOpType="lte";
return b(n,o,m,p,function(q,r){return r<=q
})
},gt:function(n,o,m,p){p.filterOpType="gt";
return b(n,o,m,p,function(q,r){return r>q
})
},gte:function(n,o,m,p){p.filterOpType="gte";
return b(n,o,m,p,function(q,r){return r>=q
})
},any:function(n,o,m,q){var p=c(o);
if(!p){k("any","Must be used inside a {@select} block","ERROR")
}else{if(p.isDeferredComplete){k("any","Must not be nested inside {@any} or {@none} block","ERROR")
}else{n=n.map(function(r){p.deferreds.push(function(){if(p.isResolved&&!p.isDefaulted){r=r.render(m.block,o)
}r.end()
})
})
}}return n
},none:function(n,o,m,q){var p=c(o);
if(!p){k("none","Must be used inside a {@select} block","ERROR")
}else{if(p.isDeferredComplete){k("none","Must not be nested inside {@any} or {@none} block","ERROR")
}else{n=n.map(function(r){p.deferreds.push(function(){if(!p.isResolved){r=r.render(m.block,o)
}r.end()
})
})
}}return n
},"default":function(n,o,m,p){p.filterOpType="default";
h("default");
if(!i(o)){k("default","Must be used inside a {@select} block","ERROR");
return n
}return b(n,o,m,p,function(){return true
})
},size:function(o,q,n,t){var p,s=0,r,m;
t=t||{};
p=t.key;
if(!p||p===true){s=0
}else{if(e.isArray(p)){s=p.length
}else{if(!isNaN(parseFloat(p))&&isFinite(p)){s=p
}else{if(typeof p==="object"){r=0;
for(m in p){if(Object.hasOwnProperty.call(p,m)){r++
}}s=r
}else{s=(p+"").length
}}}}return o.write(s)
}};
for(var l in a){e.helpers[l]=a[l]
}return e
}));
var root=document.getElementsByTagName("html")[0];
function isTouchSupported(){return"ontouchstart" in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0
}if(isTouchSupported()){root.classList.remove("no-touchevents");
root.classList.add("touchevents")
}else{root.classList.remove("touchevents");
root.classList.add("no-touchevents")
}
/*!
 Copyright 2015 British Broadcasting Corporation
 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing
 permissions and limitations under the License.
 */
;
(function(m,o){var c=[96,130,165,200,235,270,304,340,375,410,445,485,520,555,590,625,660,695,736];
var j=m.requestAnimationFrame||m.mozRequestAnimationFrame||m.webkitRequestAnimationFrame||function(s){m.setTimeout(s,1000/60)
};
var p=(function(){if(o.addEventListener){return function t(w,u,v){return w.addEventListener(u,v,false)
}
}else{return function s(w,u,v){return w.attachEvent("on"+u,v)
}
}})();
var d=typeof Object.keys==="function"?Object.keys:function(s){var u=[],t;
for(t in s){u.push(t)
}return u
};
function f(w,s){var u=0,v=w.length,t=[];
for(;
u<v;
u++){t[u]=s(w[u],u)
}return t
}function h(s){return s
}function g(){}function l(){return true
}function n(u,t){var s=this,v=o;
t=t||{};
if(u!==undefined){if(typeof u==="string"){t.selector=u;
u=undefined
}else{if(typeof u.length==="undefined"){t=u;
u=undefined
}}}this.selector=t.selector||".delayed-image-load";
this.className=t.className||"image-replace";
this.strategy=(t.cssBackground||false)?b():r();
this.gif=v.createElement("img");
this.gif.src="data:image/gif;base64,R0lGODlhEAAJAIAAAP///wAAACH5BAEAAAAALAAAAAAQAAkAAAIKhI+py+0Po5yUFQA7";
this.gif.className=this.className;
this.gif.alt="";
this.widthsMap={};
this.availableWidths=t.availableWidths||c;
this.availablePixelRatios=t.availablePixelRatios||[1,2];
this.widthInterpolator=t.widthInterpolator||h;
this.lazyload=t.hasOwnProperty("lazyload")?t.lazyload:false;
this.scrollDelay=t.scrollDelay||250;
this.onResize=t.hasOwnProperty("onResize")?t.onResize:true;
this.onImagesReplaced=t.onImagesReplaced||g;
this.beforeImagesReplaced=t.beforeImagesReplaced||g;
this.refreshPixelRatio();
this.viewportHeight=v.documentElement.clientHeight;
this.scrolled=false;
this.gif.removeAttribute("height");
this.gif.removeAttribute("width");
this.buildWidthMap();
if(u){this.divs=f(u,h);
this.selector=null
}else{this.divs=f(v.querySelectorAll(this.selector),h)
}this.ready(t.onReady);
this.strategy.prepareElements(this,this.divs);
j(function(){s.init()
})
}n.prototype.buildWidthMap=function(){if(typeof this.availableWidths==="function"){return
}var s=this.availableWidths;
if(typeof this.availableWidths.length==="number"){this.widthsMap=n.createWidthsMap(s,this.widthInterpolator,this.devicePixelRatio)
}else{this.widthsMap=this.availableWidths;
s=d(this.availableWidths)
}s=s.sort(function(u,t){return u-t
});
this.availableWidths=function(t){return n.getClosestValue(this.strategy.getDimension(t),s)
}
};
n.prototype.scrollCheck=function(){var t=this;
var s=0;
var u=[];
if(this.scrolled){f(this.divs,function(v){if(t.isPlaceholder(v)){++s;
if(t.isThisElementOnScreen(v)){u.push(v)
}}});
if(s===0){m.clearInterval(t.interval)
}this.changeDivsToEmptyImages(u);
this.scrolled=false
}};
n.prototype.init=function(){var s=this;
this.initialized=true;
var t=l;
if(this.lazyload){this.registerScrollEvent();
t=function(u){return s.isPlaceholder(u)===false
}
}else{this.checkImagesNeedReplacing(this.divs)
}if(this.onResize){this.registerResizeEvent(t)
}this.onReady()
};
n.prototype.ready=function(s){this.onReady=s||g
};
n.prototype.isPlaceholder=function(s){return s.src===this.gif.src
};
n.prototype.isThisElementOnScreen=function(s){var u=n.getPageOffset();
var t=0;
if(s.offsetParent){do{t+=s.offsetTop
}while(s=s.offsetParent)
}return t<(this.viewportHeight+u)
};
n.prototype.checkImagesNeedReplacing=function(s,u){var t=this;
u=u||l;
if(!this.isResizing){this.beforeImagesReplaced(s);
this.isResizing=true;
this.refreshPixelRatio();
f(s,function(v){if(u(v)){t.updateElement(v)
}});
this.isResizing=false;
this.onImagesReplaced(s)
}};
n.prototype.updateElement=function(u){var t=n.getNaturalWidth(u);
var s=this.availableWidths(u);
u.width=s;
if(!this.isPlaceholder(u)&&s<=t){return
}this.strategy.updateElementUrl(u,this.filterUrl(u.getAttribute("data-src"),s))
};
n.prototype.refreshPixelRatio=function a(){this.devicePixelRatio=n.getClosestValue(n.getPixelRatio(),this.availablePixelRatios)
};
n.prototype.filterUrl=function(t,s){return t.replace(/{width}/g,n.transforms.width(s,this.widthsMap)).replace(/{pixel_ratio}/g,n.transforms.pixelRatio(this.devicePixelRatio))
};
n.getPixelRatio=function k(s){return(s||m)["devicePixelRatio"]||1
};
n.createWidthsMap=function q(t,v,w){var u={},s=t.length;
while(s--){u[t[s]]=v(t[s],w)
}return u
};
n.transforms={pixelRatio:function(s){return s===1?"":"-"+s+"x"
},width:function(s,t){return t[s]||s
}};
n.getClosestValue=function e(u,v){var t=v.length,s=v[t-1];
u=parseFloat(u);
while(t--){if(u<=v[t]){s=v[t]
}}return s
};
n.prototype.registerResizeEvent=function(t){var s=this;
p(m,"resize",function(){s.checkImagesNeedReplacing(s.divs,t)
})
};
n.prototype.registerScrollEvent=function(){var s=this;
this.scrolled=false;
this.interval=m.setInterval(function(){s.scrollCheck()
},s.scrollDelay);
p(m,"scroll",function(){s.scrolled=true
});
p(m,"resize",function(){s.viewportHeight=o.documentElement.clientHeight;
s.scrolled=true
})
};
n.getPageOffsetGenerator=function i(s){if(s){return function(){return m.pageYOffset
}
}else{return function(){return o.documentElement.scrollTop
}
}};
n.getNaturalWidth=(function(){if("naturalWidth" in (new Image())){return function(s){return s.naturalWidth
}
}return function(t){var s=o.createElement("img");
s.src=t.src;
return s.width
}
})();
n.getPageOffset=n.getPageOffsetGenerator(Object.prototype.hasOwnProperty.call(m,"pageYOffset"));
n.applyEach=f;
function r(){var s=function(t,v){if(v.className.match(new RegExp("(^| )"+t.className+"( |$)"))){return v
}var x=v.getAttribute("data-class");
var w=v.getAttribute("data-width");
var u=t.gif.cloneNode(false);
if(w){u.width=w;
u.setAttribute("data-width",w)
}u.className=(x?x+" ":"")+t.className;
u.setAttribute("data-src",v.getAttribute("data-src"));
u.setAttribute("alt",v.getAttribute("data-alt")||t.gif.alt);
v.parentNode.replaceChild(u,v);
return u
};
return{prepareElements:function(t,u){f(u,function(w,v){u[v]=s(t,w)
});
if(t.initialized){t.checkImagesNeedReplacing(u)
}},updateElementUrl:function(u,t){u.src=t;
u.removeAttribute("width");
u.removeAttribute("height")
},getDimension:function(t){return t.getAttribute("data-width")||t.parentNode.clientWidth
}}
}function b(){return{prepareElements:function(t,s){f(s,function(u){var v=u.getAttribute("data-class");
u.className=(v?v+" ":"")+t.className
})
},updateElementUrl:function(t,s){t.style.backgroundImage="url("+encodeURI(s)+")"
},getDimension:function(s){return s.clientWidth
}}
}if(typeof module==="object"&&typeof module.exports==="object"){module.exports=exports=n
}else{if(typeof define==="function"&&define.amd){define(function(){return n
})
}else{if(typeof m==="object"){m.Imager=n
}}}}(window,document));
/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
;
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)
}else{if(typeof exports==="object"){a(require("jquery"))
}else{a(window.jQuery||window.Zepto)
}}}(function(B){var x="Close",G="BeforeClose",v="AfterClose",M="BeforeAppend",f="MarkupParse",k="Open",h="Change",C="mfp",d="."+C,H="mfp-ready",J="mfp-removing",e="mfp-prevent-close";
var R,y=function(){},I=!!(window.jQuery),A,a=B(window),z,E,b,K;
var i=function(V,W){R.ev.on(C+V+d,W)
},n=function(Z,W,X,V){var Y=document.createElement("div");
Y.className="mfp-"+Z;
if(X){Y.innerHTML=X
}if(!V){Y=B(Y);
if(W){Y.appendTo(W)
}}else{if(W){W.appendChild(Y)
}}return Y
},O=function(W,V){R.ev.triggerHandler(C+W,V);
if(R.st.callbacks){W=W.charAt(0).toLowerCase()+W.slice(1);
if(R.st.callbacks[W]){R.st.callbacks[W].apply(R,B.isArray(V)?V:[V])
}}},D=function(V){if(V!==K||!R.currTemplate.closeBtn){R.currTemplate.closeBtn=B(R.st.closeMarkup.replace("%title%",R.st.tClose));
K=V
}return R.currTemplate.closeBtn
},s=function(){if(!B.magnificPopup.instance){R=new y();
R.init();
B.magnificPopup.instance=R
}},U=function(){var W=document.createElement("p").style,V=["ms","O","Moz","Webkit"];
if(W.transition!==undefined){return true
}while(V.length){if(V.pop()+"Transition" in W){return true
}}return false
};
y.prototype={constructor:y,init:function(){var V=navigator.appVersion;
R.isLowIE=R.isIE8=document.all&&!document.addEventListener;
R.isAndroid=(/android/gi).test(V);
R.isIOS=(/iphone|ipad|ipod/gi).test(V);
R.supportsTransition=U();
R.probablyMobile=(R.isAndroid||R.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent));
z=B(document);
R.popupsCache={}
},open:function(aa){var ab;
if(aa.isObj===false){R.items=aa.items.toArray();
R.index=0;
var ac=aa.items,ad;
for(ab=0;
ab<ac.length;
ab++){ad=ac[ab];
if(ad.parsed){ad=ad.el[0]
}if(ad===aa.el[0]){R.index=ab;
break
}}}else{R.items=B.isArray(aa.items)?aa.items:[aa.items];
R.index=aa.index||0
}if(R.isOpen){R.updateItemHTML();
return
}R.types=[];
b="";
if(aa.mainEl&&aa.mainEl.length){R.ev=aa.mainEl.eq(0)
}else{R.ev=z
}if(aa.key){if(!R.popupsCache[aa.key]){R.popupsCache[aa.key]={}
}R.currTemplate=R.popupsCache[aa.key]
}else{R.currTemplate={}
}R.st=B.extend(true,{},B.magnificPopup.defaults,aa);
R.fixedContentPos=R.st.fixedContentPos==="auto"?!R.probablyMobile:R.st.fixedContentPos;
if(R.st.modal){R.st.closeOnContentClick=false;
R.st.closeOnBgClick=false;
R.st.showCloseBtn=false;
R.st.enableEscapeKey=false
}if(!R.bgOverlay){R.bgOverlay=n("bg").on("click"+d,function(){R.close()
});
R.wrap=n("wrap").attr("tabindex",-1).on("click"+d,function(af){if(R._checkIfClose(af.target)){R.close()
}});
R.container=n("container",R.wrap)
}R.contentContainer=n("content");
if(R.st.preloader){R.preloader=n("preloader",R.container,R.st.tLoading)
}var Z=B.magnificPopup.modules;
for(ab=0;
ab<Z.length;
ab++){var Y=Z[ab];
Y=Y.charAt(0).toUpperCase()+Y.slice(1);
R["init"+Y].call(R)
}O("BeforeOpen");
if(R.st.showCloseBtn){if(!R.st.closeBtnInside){R.wrap.append(D())
}else{i(f,function(ai,ag,af,ah){af.close_replaceWith=D(ah.type)
});
b+=" mfp-close-btn-in"
}}if(R.st.alignTop){b+=" mfp-align-top"
}if(R.fixedContentPos){R.wrap.css({overflow:R.st.overflowY,overflowX:"hidden",overflowY:R.st.overflowY})
}else{R.wrap.css({top:a.scrollTop(),position:"absolute"})
}if(R.st.fixedBgPos===false||(R.st.fixedBgPos==="auto"&&!R.fixedContentPos)){R.bgOverlay.css({height:z.height(),position:"absolute"})
}if(R.st.enableEscapeKey){z.on("keyup"+d,function(af){if(af.keyCode===27){R.close()
}})
}a.on("resize"+d,function(){R.updateSize()
});
if(!R.st.closeOnContentClick){b+=" mfp-auto-cursor"
}if(b){R.wrap.addClass(b)
}var V=R.wH=a.height();
var X={};
if(R.fixedContentPos){if(R._hasScrollBar(V)){var ae=R._getScrollbarSize();
if(ae){X.marginRight=ae
}}}if(R.fixedContentPos){if(!R.isIE7){X.overflow="hidden"
}else{B("body, html").css("overflow","hidden")
}}var W=R.st.mainClass;
if(R.isIE7){W+=" mfp-ie7"
}if(W){R._addClassToMFP(W)
}R.updateItemHTML();
O("BuildControls");
B("html").css(X);
R.bgOverlay.add(R.wrap).prependTo(R.st.prependTo||B(document.body));
R._lastFocusedEl=document.activeElement;
setTimeout(function(){if(R.content){R._addClassToMFP(H);
R._setFocus()
}else{R.bgOverlay.addClass(H)
}z.on("focusin"+d,R._onFocusIn)
},16);
R.isOpen=true;
R.updateSize(V);
O(k);
return aa
},close:function(){if(!R.isOpen){return
}O(G);
R.isOpen=false;
if(R.st.removalDelay&&!R.isLowIE&&R.supportsTransition){R._addClassToMFP(J);
setTimeout(function(){R._close()
},R.st.removalDelay)
}else{R._close()
}},_close:function(){O(x);
var V=J+" "+H+" ";
R.bgOverlay.detach();
R.wrap.detach();
R.container.empty();
if(R.st.mainClass){V+=R.st.mainClass+" "
}R._removeClassFromMFP(V);
if(R.fixedContentPos){var W={marginRight:""};
if(R.isIE7){B("body, html").css("overflow","")
}else{W.overflow=""
}B("html").css(W)
}z.off("keyup"+d+" focusin"+d);
R.ev.off(d);
R.wrap.attr("class","mfp-wrap").removeAttr("style");
R.bgOverlay.attr("class","mfp-bg");
R.container.attr("class","mfp-container");
if(R.st.showCloseBtn&&(!R.st.closeBtnInside||R.currTemplate[R.currItem.type]===true)){if(R.currTemplate.closeBtn){R.currTemplate.closeBtn.detach()
}}if(R.st.autoFocusLast&&R._lastFocusedEl){B(R._lastFocusedEl).focus()
}R.currItem=null;
R.content=null;
R.currTemplate=null;
R.prevHeight=0;
O(v)
},updateSize:function(W){if(R.isIOS){var X=document.documentElement.clientWidth/window.innerWidth;
var V=window.innerHeight*X;
R.wrap.css("height",V);
R.wH=V
}else{R.wH=W||a.height()
}if(!R.fixedContentPos){R.wrap.css("height",R.wH)
}O("Resize")
},updateItemHTML:function(){var Y=R.items[R.index];
R.contentContainer.detach();
if(R.content){R.content.detach()
}if(!Y.parsed){Y=R.parseEl(R.index)
}var X=Y.type;
O("BeforeChange",[R.currItem?R.currItem.type:"",X]);
R.currItem=Y;
if(!R.currTemplate[X]){var W=R.st[X]?R.st[X].markup:false;
O("FirstMarkupParse",W);
if(W){R.currTemplate[X]=B(W)
}else{R.currTemplate[X]=true
}}if(E&&E!==Y.type){R.container.removeClass("mfp-"+E+"-holder")
}var V=R["get"+X.charAt(0).toUpperCase()+X.slice(1)](Y,R.currTemplate[X]);
R.appendContent(V,X);
Y.preloaded=true;
O(h,Y);
E=Y.type;
R.container.prepend(R.contentContainer);
O("AfterChange")
},appendContent:function(V,W){R.content=V;
if(V){if(R.st.showCloseBtn&&R.st.closeBtnInside&&R.currTemplate[W]===true){if(!R.content.find(".mfp-close").length){R.content.append(D())
}}else{R.content=V
}}else{R.content=""
}O(M);
R.container.addClass("mfp-"+W+"-holder");
R.contentContainer.append(R.content)
},parseEl:function(V){var Z=R.items[V],Y;
if(Z.tagName){Z={el:B(Z)}
}else{Y=Z.type;
Z={data:Z,src:Z.src}
}if(Z.el){var X=R.types;
for(var W=0;
W<X.length;
W++){if(Z.el.hasClass("mfp-"+X[W])){Y=X[W];
break
}}Z.src=Z.el.attr("data-mfp-src");
if(!Z.src){Z.src=Z.el.attr("href")
}}Z.type=Y||R.st.type||"inline";
Z.index=V;
Z.parsed=true;
R.items[V]=Z;
O("ElementParse",Z);
return R.items[V]
},addGroup:function(X,W){var Y=function(Z){Z.mfpEl=this;
R._openClick(Z,X,W)
};
if(!W){W={}
}var V="click.magnificPopup";
W.mainEl=X;
if(W.items){W.isObj=true;
X.off(V).on(V,Y)
}else{W.isObj=false;
if(W.delegate){X.off(V).on(V,W.delegate,Y)
}else{W.items=X;
X.off(V).on(V,Y)
}}},_openClick:function(Z,X,V){var W=V.midClick!==undefined?V.midClick:B.magnificPopup.defaults.midClick;
if(!W&&(Z.which===2||Z.ctrlKey||Z.metaKey||Z.altKey||Z.shiftKey)){return
}var Y=V.disableOn!==undefined?V.disableOn:B.magnificPopup.defaults.disableOn;
if(Y){if(B.isFunction(Y)){if(!Y.call(R)){return true
}}else{if(a.width()<Y){return true
}}}if(Z.type){Z.preventDefault();
if(R.isOpen){Z.stopPropagation()
}}V.el=B(Z.mfpEl);
if(V.delegate){V.items=X.find(V.delegate)
}R.open(V)
},updateStatus:function(V,X){if(R.preloader){if(A!==V){R.container.removeClass("mfp-s-"+A)
}if(!X&&V==="loading"){X=R.st.tLoading
}var W={status:V,text:X};
O("UpdateStatus",W);
V=W.status;
X=W.text;
R.preloader.html(X);
R.preloader.find("a").on("click",function(Y){Y.stopImmediatePropagation()
});
R.container.addClass("mfp-s-"+V);
A=V
}},_checkIfClose:function(X){if(B(X).hasClass(e)){return
}var V=R.st.closeOnContentClick;
var W=R.st.closeOnBgClick;
if(V&&W){return true
}else{if(!R.content||B(X).hasClass("mfp-close")||(R.preloader&&X===R.preloader[0])){return true
}if((X!==R.content[0]&&!B.contains(R.content[0],X))){if(W){if(B.contains(document,X)){return true
}}}else{if(V){return true
}}}return false
},_addClassToMFP:function(V){R.bgOverlay.addClass(V);
R.wrap.addClass(V)
},_removeClassFromMFP:function(V){this.bgOverlay.removeClass(V);
R.wrap.removeClass(V)
},_hasScrollBar:function(V){return((R.isIE7?z.height():document.body.scrollHeight)>(V||a.height()))
},_setFocus:function(){(R.st.focus?R.content.find(R.st.focus).eq(0):R.wrap).focus()
},_onFocusIn:function(V){if(V.target!==R.wrap[0]&&!B.contains(R.wrap[0],V.target)){R._setFocus();
return false
}},_parseMarkup:function(X,W,Y){var V;
if(Y.data){W=B.extend(Y.data,W)
}O(f,[X,W,Y]);
B.each(W,function(aa,ac){if(ac===undefined||ac===false){return true
}V=aa.split("_");
if(V.length>1){var ab=X.find(d+"-"+V[0]);
if(ab.length>0){var Z=V[1];
if(Z==="replaceWith"){if(ab[0]!==ac[0]){ab.replaceWith(ac)
}}else{if(Z==="img"){if(ab.is("img")){ab.attr("src",ac)
}else{ab.replaceWith(B("<img>").attr("src",ac).attr("class",ab.attr("class")))
}}else{ab.attr(V[1],ac)
}}}}else{X.find(d+"-"+aa).html(ac)
}})
},_getScrollbarSize:function(){if(R.scrollbarSize===undefined){var V=document.createElement("div");
V.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;";
document.body.appendChild(V);
R.scrollbarSize=V.offsetWidth-V.clientWidth;
document.body.removeChild(V)
}return R.scrollbarSize
}};
B.magnificPopup={instance:null,proto:y.prototype,modules:[],open:function(W,V){s();
if(!W){W={}
}else{W=B.extend(true,{},W)
}W.isObj=true;
W.index=V||0;
return this.instance.open(W)
},close:function(){return B.magnificPopup.instance&&B.magnificPopup.instance.close()
},registerModule:function(V,W){if(W.options){B.magnificPopup.defaults[V]=W.options
}B.extend(this.proto,W.proto);
this.modules.push(V)
},defaults:{disableOn:0,key:null,midClick:false,mainClass:"",preloader:true,focus:"",closeOnContentClick:false,closeOnBgClick:true,closeBtnInside:true,showCloseBtn:true,enableEscapeKey:true,modal:false,alignTop:false,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:true}};
B.fn.magnificPopup=function(X){s();
var Y=B(this);
if(typeof X==="string"){if(X==="open"){var V,Z=I?Y.data("magnificPopup"):Y[0].magnificPopup,W=parseInt(arguments[1],10)||0;
if(Z.items){V=Z.items[W]
}else{V=Y;
if(Z.delegate){V=V.find(Z.delegate)
}V=V.eq(W)
}R._openClick({mfpEl:V},Y,Z)
}else{if(R.isOpen){R[X].apply(R,Array.prototype.slice.call(arguments,1))
}}}else{X=B.extend(true,{},X);
if(I){Y.data("magnificPopup",X)
}else{Y[0].magnificPopup=X
}R.addGroup(Y,X)
}return Y
};
var F="inline",Q,N,r,l=function(){if(r){N.after(r.addClass(Q)).detach();
r=null
}};
B.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){R.types.push(F);
i(x+"."+F,function(){l()
})
},getInline:function(Z,Y){l();
if(Z.src){var V=R.st.inline,X=B(Z.src);
if(X.length){var W=X[0].parentNode;
if(W&&W.tagName){if(!N){Q=V.hiddenClass;
N=n(Q);
Q="mfp-"+Q
}r=X.after(N).detach().removeClass(Q)
}R.updateStatus("ready")
}else{R.updateStatus("error",V.tNotFound);
X=B("<div>")
}Z.inlineElement=X;
return X
}R.updateStatus("ready");
R._parseMarkup(Y,{},Z);
return Y
}}});
var t="ajax",T,u=function(){if(T){B(document.body).removeClass(T)
}},S=function(){u();
if(R.req){R.req.abort()
}};
B.magnificPopup.registerModule(t,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){R.types.push(t);
T=R.st.ajax.cursor;
i(x+"."+t,S);
i("BeforeChange."+t,S)
},getAjax:function(W){if(T){B(document.body).addClass(T)
}R.updateStatus("loading");
var V=B.extend({url:W.src,success:function(Z,aa,Y){var X={data:Z,xhr:Y};
O("ParseAjax",X);
R.appendContent(B(X.data),t);
W.finished=true;
u();
R._setFocus();
setTimeout(function(){R.wrap.addClass(H)
},16);
R.updateStatus("ready");
O("AjaxContentAdded")
},error:function(){u();
W.finished=W.loadError=true;
R.updateStatus("error",R.st.ajax.tError.replace("%url%",W.src))
}},R.st.ajax.settings);
R.req=B.ajax(V);
return""
}}});
var g,c=function(V){if(V.data&&V.data.title!==undefined){return V.data.title
}var W=R.st.image.titleSrc;
if(W){if(B.isFunction(W)){return W.call(R,V)
}else{if(V.el){return V.el.attr(W)||""
}}}return""
};
B.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:true,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var W=R.st.image,V=".image";
R.types.push("image");
i(k+V,function(){if(R.currItem.type==="image"&&W.cursor){B(document.body).addClass(W.cursor)
}});
i(x+V,function(){if(W.cursor){B(document.body).removeClass(W.cursor)
}a.off("resize"+d)
});
i("Resize"+V,R.resizeImage);
if(R.isLowIE){i("AfterChange",R.resizeImage)
}},resizeImage:function(){var W=R.currItem;
if(!W||!W.img){return
}if(R.st.image.verticalFit){var V=0;
if(R.isLowIE){V=parseInt(W.img.css("padding-top"),10)+parseInt(W.img.css("padding-bottom"),10)
}W.img.css("max-height",R.wH-V)
}},_onImageHasSize:function(V){if(V.img){V.hasSize=true;
if(g){clearInterval(g)
}V.isCheckingImgSize=false;
O("ImageHasSize",V);
if(V.imgHidden){if(R.content){R.content.removeClass("mfp-loading")
}V.imgHidden=false
}}},findImageSize:function(Y){var V=0,W=Y.img[0],X=function(Z){if(g){clearInterval(g)
}g=setInterval(function(){if(W.naturalWidth>0){R._onImageHasSize(Y);
return
}if(V>200){clearInterval(g)
}V++;
if(V===3){X(10)
}else{if(V===40){X(50)
}else{if(V===100){X(500)
}}}},Z)
};
X(1)
},getImage:function(ab,Y){var aa=0,ac=function(){if(ab){if(ab.img[0].complete){ab.img.off(".mfploader");
if(ab===R.currItem){R._onImageHasSize(ab);
R.updateStatus("ready")
}ab.hasSize=true;
ab.loaded=true;
O("ImageLoadComplete")
}else{aa++;
if(aa<200){setTimeout(ac,100)
}else{V()
}}}},V=function(){if(ab){ab.img.off(".mfploader");
if(ab===R.currItem){R._onImageHasSize(ab);
R.updateStatus("error",Z.tError.replace("%url%",ab.src))
}ab.hasSize=true;
ab.loaded=true;
ab.loadError=true
}},Z=R.st.image;
var X=Y.find(".mfp-img");
if(X.length){var W=document.createElement("img");
W.className="mfp-img";
if(ab.el&&ab.el.find("img").length){W.alt=ab.el.find("img").attr("alt")
}ab.img=B(W).on("load.mfploader",ac).on("error.mfploader",V);
W.src=ab.src;
if(X.is("img")){ab.img=ab.img.clone()
}W=ab.img[0];
if(W.naturalWidth>0){ab.hasSize=true
}else{if(!W.width){ab.hasSize=false
}}}R._parseMarkup(Y,{title:c(ab),img_replaceWith:ab.img},ab);
R.resizeImage();
if(ab.hasSize){if(g){clearInterval(g)
}if(ab.loadError){Y.addClass("mfp-loading");
R.updateStatus("error",Z.tError.replace("%url%",ab.src))
}else{Y.removeClass("mfp-loading");
R.updateStatus("ready")
}return Y
}R.updateStatus("loading");
ab.loading=true;
if(!ab.hasSize){ab.imgHidden=true;
Y.addClass("mfp-loading");
R.findImageSize(ab)
}return Y
}}});
var j,L=function(){if(j===undefined){j=document.createElement("p").style.MozTransform!==undefined
}return j
};
B.magnificPopup.registerModule("zoom",{options:{enabled:false,easing:"ease-in-out",duration:300,opener:function(V){return V.is("img")?V:V.find("img")
}},proto:{initZoom:function(){var W=R.st.zoom,Z=".zoom",ac;
if(!W.enabled||!R.supportsTransition){return
}var ab=W.duration,aa=function(af){var ae=af.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),ag="all "+(W.duration/1000)+"s "+W.easing,ah={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},ad="transition";
ah["-webkit-"+ad]=ah["-moz-"+ad]=ah["-o-"+ad]=ah[ad]=ag;
ae.css(ah);
return ae
},V=function(){R.content.css("visibility","visible")
},X,Y;
i("BuildControls"+Z,function(){if(R._allowZoom()){clearTimeout(X);
R.content.css("visibility","hidden");
ac=R._getItemToZoom();
if(!ac){V();
return
}Y=aa(ac);
Y.css(R._getOffset());
R.wrap.append(Y);
X=setTimeout(function(){Y.css(R._getOffset(true));
X=setTimeout(function(){V();
setTimeout(function(){Y.remove();
ac=Y=null;
O("ZoomAnimationEnded")
},16)
},ab)
},16)
}});
i(G+Z,function(){if(R._allowZoom()){clearTimeout(X);
R.st.removalDelay=ab;
if(!ac){ac=R._getItemToZoom();
if(!ac){return
}Y=aa(ac)
}Y.css(R._getOffset(true));
R.wrap.append(Y);
R.content.css("visibility","hidden");
setTimeout(function(){Y.css(R._getOffset())
},16)
}});
i(x+Z,function(){if(R._allowZoom()){V();
if(Y){Y.remove()
}ac=null
}})
},_allowZoom:function(){return R.currItem.type==="image"
},_getItemToZoom:function(){if(R.currItem.hasSize){return R.currItem.img
}else{return false
}},_getOffset:function(X){var V;
if(X){V=R.currItem.img
}else{V=R.st.zoom.opener(R.currItem.el||R.currItem)
}var aa=V.offset();
var W=parseInt(V.css("padding-top"),10);
var Z=parseInt(V.css("padding-bottom"),10);
aa.top-=(B(window).scrollTop()-W);
var Y={width:V.width(),height:(I?V.innerHeight():V[0].offsetHeight)-Z-W};
if(L()){Y["-moz-transform"]=Y.transform="translate("+aa.left+"px,"+aa.top+"px)"
}else{Y.left=aa.left;
Y.top=aa.top
}return Y
}}});
var q="iframe",p="//about:blank",P=function(V){if(R.currTemplate[q]){var W=R.currTemplate[q].find("iframe");
if(W.length){if(!V){W[0].src=p
}if(R.isIE8){W.css("display",V?"block":"none")
}}}};
B.magnificPopup.registerModule(q,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){R.types.push(q);
i("BeforeChange",function(X,V,W){if(V!==W){if(V===q){P()
}else{if(W===q){P(true)
}}}});
i(x+"."+q,function(){P()
})
},getIframe:function(Z,Y){var V=Z.src;
var X=R.st.iframe;
B.each(X.patterns,function(){if(V.indexOf(this.index)>-1){if(this.id){if(typeof this.id==="string"){V=V.substr(V.lastIndexOf(this.id)+this.id.length,V.length)
}else{V=this.id.call(this,V)
}}V=this.src.replace("%id%",V);
return false
}});
var W={};
if(X.srcAction){W[X.srcAction]=V
}R._parseMarkup(Y,W,Z);
R.updateStatus("ready");
return Y
}}});
var w=function(V){var W=R.items.length;
if(V>W-1){return V-W
}else{if(V<0){return W+V
}}return V
},o=function(X,W,V){return X.replace(/%curr%/gi,W+1).replace(/%total%/gi,V)
};
B.magnificPopup.registerModule("gallery",{options:{enabled:false,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:true,arrows:true,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var V=R.st.gallery,W=".mfp-gallery";
R.direction=true;
if(!V||!V.enabled){return false
}b+=" mfp-gallery";
i(k+W,function(){if(V.navigateByImgClick){R.wrap.on("click"+W,".mfp-img",function(){if(R.items.length>1){R.next();
return false
}})
}z.on("keydown"+W,function(X){if(X.keyCode===37){R.prev()
}else{if(X.keyCode===39){R.next()
}}})
});
i("UpdateStatus"+W,function(Y,X){if(X.text){X.text=o(X.text,R.currItem.index,R.items.length)
}});
i(f+W,function(ab,Z,Y,aa){var X=R.items.length;
Y.counter=X>1?o(V.tCounter,aa.index,X):""
});
i("BuildControls"+W,function(){if(R.items.length>1&&V.arrows&&!R.arrowLeft){var Y=V.arrowMarkup,Z=R.arrowLeft=B(Y.replace(/%title%/gi,V.tPrev).replace(/%dir%/gi,"left")).addClass(e),X=R.arrowRight=B(Y.replace(/%title%/gi,V.tNext).replace(/%dir%/gi,"right")).addClass(e);
Z.click(function(){R.prev()
});
X.click(function(){R.next()
});
R.container.append(Z.add(X))
}});
i(h+W,function(){if(R._preloadTimeout){clearTimeout(R._preloadTimeout)
}R._preloadTimeout=setTimeout(function(){R.preloadNearbyImages();
R._preloadTimeout=null
},16)
});
i(x+W,function(){z.off(W);
R.wrap.off("click"+W);
R.arrowRight=R.arrowLeft=null
})
},next:function(){R.direction=true;
R.index=w(R.index+1);
R.updateItemHTML()
},prev:function(){R.direction=false;
R.index=w(R.index-1);
R.updateItemHTML()
},goTo:function(V){R.direction=(V>=R.index);
R.index=V;
R.updateItemHTML()
},preloadNearbyImages:function(){var Y=R.st.gallery.preload,W=Math.min(Y[0],R.items.length),X=Math.min(Y[1],R.items.length),V;
for(V=1;
V<=(R.direction?X:W);
V++){R._preloadItem(R.index+V)
}for(V=1;
V<=(R.direction?W:X);
V++){R._preloadItem(R.index-V)
}},_preloadItem:function(V){V=w(V);
if(R.items[V].preloaded){return
}var W=R.items[V];
if(!W.parsed){W=R.parseEl(V)
}O("LazyLoad",W);
if(W.type==="image"){W.img=B('<img class="mfp-img" />').on("load.mfploader",function(){W.hasSize=true
}).on("error.mfploader",function(){W.hasSize=true;
W.loadError=true;
O("LazyLoadError",W)
}).attr("src",W.src)
}W.preloaded=true
}}});
var m="retina";
B.magnificPopup.registerModule(m,{options:{replaceSrc:function(V){return V.src.replace(/\.\w+$/,function(W){return"@2x"+W
})
},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var V=R.st.retina,W=V.ratio;
W=!isNaN(W)?W:W();
if(W>1){i("ImageHasSize."+m,function(Y,X){X.img.css({"max-width":X.img[0].naturalWidth/W,width:"100%"})
});
i("ElementParse."+m,function(Y,X){X.src=V.replaceSrc(X,W)
})
}}}}});
s()
}));
(function(a,b){if(typeof define==="function"&&define.amd){define([],b)
}else{if(typeof module==="object"&&module.exports){module.exports=b()
}else{a.PDFObject=b()
}}}(this,function(){if(typeof window==="undefined"||window.navigator===undefined||window.navigator.userAgent===undefined||window.navigator.mimeTypes===undefined){return false
}var d="2.2.3";
var a=window.navigator;
var b=window.navigator.userAgent;
var e=("ActiveXObject" in window);
var k=(window.Promise!==undefined);
var m=(a.mimeTypes["application/pdf"]!==undefined);
var g=(a.platform!==undefined&&a.platform==="MacIntel"&&a.maxTouchPoints!==undefined&&a.maxTouchPoints>1);
var c=(g||/Mobi|Tablet|Android|iPad|iPhone/.test(b));
var f=(!c&&a.vendor!==undefined&&/Apple/.test(a.vendor)&&/Safari/.test(b));
var l=(!c&&/irefox/.test(b)&&b.split("rv:").length>1)?(parseInt(b.split("rv:")[1].split(".")[0],10)>18):false;
var i=function(n){var o;
try{o=new ActiveXObject(n)
}catch(p){o=null
}return o
};
var h=function(){return !!(i("AcroPDF.PDF")||i("PDF.PdfCtrl"))
};
var j=(!c&&(k||l||m||(e&&h())));
return{supportsPDFs:(function(){return j
})()}
}));
/*!
 * Masonry PACKAGED v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
(function(b,a){if(typeof define=="function"&&define.amd){define("jquery-bridget/jquery-bridget",["jquery"],function(c){return a(b,c)
})
}else{if(typeof module=="object"&&module.exports){module.exports=a(b,require("jquery"))
}else{b.jQueryBridget=a(b,b.jQuery)
}}}(window,function factory(c,f){var e=Array.prototype.slice;
var a=c.console;
var b=typeof a=="undefined"?function(){}:function(h){a.error(h)
};
function g(j,l,k){k=k||f||c.jQuery;
if(!k){return
}if(!l.prototype.option){l.prototype.option=function(m){if(!k.isPlainObject(m)){return
}this.options=k.extend(true,this.options,m)
}
}k.fn[j]=function(n){if(typeof n=="string"){var m=e.call(arguments,1);
return i(this,n,m)
}h(this,n);
return this
};
function i(q,m,n){var o;
var p="$()."+j+'("'+m+'")';
q.each(function(s,t){var r=k.data(t,j);
if(!r){b(j+" not initialized. Cannot call methods, i.e. "+p);
return
}var v=r[m];
if(!v||m.charAt(0)=="_"){b(p+" is not a valid method");
return
}var u=v.apply(r,n);
o=o===undefined?u:o
});
return o!==undefined?o:q
}function h(n,m){n.each(function(p,q){var o=k.data(q,j);
if(o){o.option(m);
o._init()
}else{o=new l(q,m);
k.data(q,j,o)
}})
}d(k)
}function d(h){if(!h||(h&&h.bridget)){return
}h.bridget=g
}d(f||c.jQuery);
return g
}));
(function(b,a){if(typeof define=="function"&&define.amd){define("ev-emitter/ev-emitter",a)
}else{if(typeof module=="object"&&module.exports){module.exports=a()
}else{b.EvEmitter=a()
}}}(typeof window!="undefined"?window:this,function(){function a(){}var b=a.prototype;
b.on=function(c,f){if(!c||!f){return
}var d=this._events=this._events||{};
var e=d[c]=d[c]||[];
if(e.indexOf(f)==-1){e.push(f)
}return this
};
b.once=function(d,e){if(!d||!e){return
}this.on(d,e);
var c=this._onceEvents=this._onceEvents||{};
var f=c[d]=c[d]||{};
f[e]=true;
return this
};
b.off=function(c,f){var e=this._events&&this._events[c];
if(!e||!e.length){return
}var d=e.indexOf(f);
if(d!=-1){e.splice(d,1)
}return this
};
b.emitEvent=function(c,d){var f=this._events&&this._events[c];
if(!f||!f.length){return
}f=f.slice(0);
d=d||[];
var j=this._onceEvents&&this._onceEvents[c];
for(var e=0;
e<f.length;
e++){var h=f[e];
var g=j&&j[h];
if(g){this.off(c,h);
delete j[h]
}h.apply(this,d)
}return this
};
b.allOff=function(){delete this._events;
delete this._onceEvents
};
return a
}));
/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */
(function(b,a){if(typeof define=="function"&&define.amd){define("get-size/get-size",a)
}else{if(typeof module=="object"&&module.exports){module.exports=a()
}else{b.getSize=a()
}}})(window,function factory(){function h(m){var l=parseFloat(m);
var n=m.indexOf("%")==-1&&!isNaN(l);
return n&&l
}function j(){}var i=typeof console=="undefined"?j:function(l){console.error(l)
};
var b=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];
var d=b.length;
function a(){var m={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0};
for(var l=0;
l<d;
l++){var n=b[l];
m[n]=0
}return m
}function g(m){var l=getComputedStyle(m);
if(!l){i("Style returned "+l+". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1")
}return l
}var e=false;
var c;
function f(){if(e){return
}e=true;
var n=document.createElement("div");
n.style.width="200px";
n.style.padding="1px 2px 3px 4px";
n.style.borderStyle="solid";
n.style.borderWidth="1px 2px 3px 4px";
n.style.boxSizing="border-box";
var l=document.body||document.documentElement;
l.appendChild(n);
var m=g(n);
c=Math.round(h(m.width))==200;
k.isBoxSizeOuter=c;
l.removeChild(n)
}function k(p){f();
if(typeof p=="string"){p=document.querySelector(p)
}if(!p||typeof p!="object"||!p.nodeType){return
}var n=g(p);
if(n.display=="none"){return a()
}var B={};
B.width=p.offsetWidth;
B.height=p.offsetHeight;
var A=B.isBorderBox=n.boxSizing=="border-box";
for(var u=0;
u<d;
u++){var q=b[u];
var z=n[q];
var w=parseFloat(z);
B[q]=!isNaN(w)?w:0
}var v=B.paddingLeft+B.paddingRight;
var m=B.paddingTop+B.paddingBottom;
var y=B.marginLeft+B.marginRight;
var o=B.marginTop+B.marginBottom;
var l=B.borderLeftWidth+B.borderRightWidth;
var x=B.borderTopWidth+B.borderBottomWidth;
var t=A&&c;
var s=h(n.width);
if(s!==false){B.width=s+(t?0:v+l)
}var r=h(n.height);
if(r!==false){B.height=r+(t?0:m+x)
}B.innerWidth=B.width-(v+l);
B.innerHeight=B.height-(m+x);
B.outerWidth=B.width+y;
B.outerHeight=B.height+o;
return B
}return k
});
(function(b,a){if(typeof define=="function"&&define.amd){define("desandro-matches-selector/matches-selector",a)
}else{if(typeof module=="object"&&module.exports){module.exports=a()
}else{b.matchesSelector=a()
}}}(window,function factory(){var b=(function(){var c=window.Element.prototype;
if(c.matches){return"matches"
}if(c.matchesSelector){return"matchesSelector"
}var f=["webkit","moz","ms","o"];
for(var d=0;
d<f.length;
d++){var e=f[d];
var g=e+"MatchesSelector";
if(c[g]){return g
}}})();
return function a(d,c){return d[b](c)
}
}));
(function(b,a){if(typeof define=="function"&&define.amd){define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(c){return a(b,c)
})
}else{if(typeof module=="object"&&module.exports){module.exports=a(b,require("desandro-matches-selector"))
}else{b.fizzyUIUtils=a(b,b.matchesSelector)
}}}(window,function factory(d,c){var a={};
a.extend=function(g,f){for(var h in f){g[h]=f[h]
}return g
};
a.modulo=function(f,g){return((f%g)+g)%g
};
var e=Array.prototype.slice;
a.makeArray=function(g){if(Array.isArray(g)){return g
}if(g===null||g===undefined){return[]
}var f=typeof g=="object"&&typeof g.length=="number";
if(f){return e.call(g)
}return[g]
};
a.removeFrom=function(g,h){var f=g.indexOf(h);
if(f!=-1){g.splice(f,1)
}};
a.getParent=function(g,f){while(g.parentNode&&g!=document.body){g=g.parentNode;
if(c(g,f)){return g
}}};
a.getQueryElement=function(f){if(typeof f=="string"){return document.querySelector(f)
}return f
};
a.handleEvent=function(f){var g="on"+f.type;
if(this[g]){this[g](f)
}};
a.filterFindElements=function(g,f){g=a.makeArray(g);
var h=[];
g.forEach(function(k){if(!(k instanceof HTMLElement)){return
}if(!f){h.push(k);
return
}if(c(k,f)){h.push(k)
}var l=k.querySelectorAll(f);
for(var j=0;
j<l.length;
j++){h.push(l[j])
}});
return h
};
a.debounceMethod=function(i,h,f){f=f||100;
var j=i.prototype[h];
var g=h+"Timeout";
i.prototype[h]=function(){var l=this[g];
clearTimeout(l);
var k=arguments;
var m=this;
this[g]=setTimeout(function(){j.apply(m,k);
delete m[g]
},f)
}
};
a.docReady=function(g){var f=document.readyState;
if(f=="complete"||f=="interactive"){setTimeout(g)
}else{document.addEventListener("DOMContentLoaded",g)
}};
a.toDashed=function(f){return f.replace(/(.)([A-Z])/g,function(h,g,i){return g+"-"+i
}).toLowerCase()
};
var b=d.console;
a.htmlInit=function(f,g){a.docReady(function(){var m=a.toDashed(g);
var l="data-"+m;
var j=document.querySelectorAll("["+l+"]");
var h=document.querySelectorAll(".js-"+m);
var i=a.makeArray(j).concat(a.makeArray(h));
var n=l+"-options";
var k=d.jQuery;
i.forEach(function(s){var p=s.getAttribute(l)||s.getAttribute(n);
var r;
try{r=p&&JSON.parse(p)
}catch(q){if(b){b.error("Error parsing "+l+" on "+s.className+": "+q)
}return
}var o=new f(s,r);
if(k){k.data(s,g,o)
}})
})
};
return a
}));
(function(b,a){if(typeof define=="function"&&define.amd){define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],a)
}else{if(typeof module=="object"&&module.exports){module.exports=a(require("ev-emitter"),require("get-size"))
}else{b.Outlayer={};
b.Outlayer.Item=a(b.EvEmitter,b.getSize)
}}}(window,function factory(b,n){function m(o){for(var p in o){return false
}p=null;
return true
}var h=document.documentElement.style;
var l=typeof h.transition=="string"?"transition":"WebkitTransition";
var i=typeof h.transform=="string"?"transform":"WebkitTransform";
var a={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[l];
var j={transform:i,transition:l,transitionDuration:l+"Duration",transitionProperty:l+"Property",transitionDelay:l+"Delay"};
function c(o,p){if(!o){return
}this.element=o;
this.layout=p;
this.position={x:0,y:0};
this._create()
}var e=c.prototype=Object.create(b.prototype);
e.constructor=c;
e._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}};
this.css({position:"absolute"})
};
e.handleEvent=function(o){var p="on"+o.type;
if(this[p]){this[p](o)
}};
e.getSize=function(){this.size=n(this.element)
};
e.css=function(q){var o=this.element.style;
for(var r in q){var p=j[r]||r;
o[p]=q[r]
}};
e.getPosition=function(){var s=getComputedStyle(this.element);
var v=this.layout._getOption("originLeft");
var u=this.layout._getOption("originTop");
var r=s[v?"left":"right"];
var q=s[u?"top":"bottom"];
var o=parseFloat(r);
var t=parseFloat(q);
var p=this.layout.size;
if(r.indexOf("%")!=-1){o=(o/100)*p.width
}if(q.indexOf("%")!=-1){t=(t/100)*p.height
}o=isNaN(o)?0:o;
t=isNaN(t)?0:t;
o-=v?p.paddingLeft:p.paddingRight;
t-=u?p.paddingTop:p.paddingBottom;
this.position.x=o;
this.position.y=t
};
e.layoutPosition=function(){var q=this.layout.size;
var p={};
var A=this.layout._getOption("originLeft");
var B=this.layout._getOption("originTop");
var w=A?"paddingLeft":"paddingRight";
var r=A?"left":"right";
var s=A?"right":"left";
var v=this.position.x+q[w];
p[r]=this.getXValue(v);
p[s]="";
var t=B?"paddingTop":"paddingBottom";
var z=B?"top":"bottom";
var o=B?"bottom":"top";
var u=this.position.y+q[t];
p[z]=this.getYValue(u);
p[o]="";
this.css(p);
this.emitEvent("layout",[this])
};
e.getXValue=function(o){var p=this.layout._getOption("horizontal");
return this.layout.options.percentPosition&&!p?((o/this.layout.size.width)*100)+"%":o+"px"
};
e.getYValue=function(p){var o=this.layout._getOption("horizontal");
return this.layout.options.percentPosition&&o?((p/this.layout.size.height)*100)+"%":p+"px"
};
e._transitionTo=function(p,v){this.getPosition();
var r=this.position.x;
var o=this.position.y;
var u=p==this.position.x&&v==this.position.y;
this.setPosition(p,v);
if(u&&!this.isTransitioning){this.layoutPosition();
return
}var s=p-r;
var q=v-o;
var t={};
t.transform=this.getTranslate(s,q);
this.transition({to:t,onTransitionEnd:{transform:this.layoutPosition},isCleaning:true})
};
e.getTranslate=function(o,r){var q=this.layout._getOption("originLeft");
var p=this.layout._getOption("originTop");
o=q?o:-o;
r=p?r:-r;
return"translate3d("+o+"px, "+r+"px, 0)"
};
e.goTo=function(o,p){this.setPosition(o,p);
this.layoutPosition()
};
e.moveTo=e._transitionTo;
e.setPosition=function(o,p){this.position.x=parseFloat(o);
this.position.y=parseFloat(p)
};
e._nonTransition=function(o){this.css(o.to);
if(o.isCleaning){this._removeStyles(o.to)
}for(var p in o.onTransitionEnd){o.onTransitionEnd[p].call(this)
}};
e.transition=function(o){if(!parseFloat(this.layout.options.transitionDuration)){this._nonTransition(o);
return
}var q=this._transn;
for(var r in o.onTransitionEnd){q.onEnd[r]=o.onTransitionEnd[r]
}for(r in o.to){q.ingProperties[r]=true;
if(o.isCleaning){q.clean[r]=true
}}if(o.from){this.css(o.from);
var p=this.element.offsetHeight;
p=null
}this.enableTransition(o.to);
this.css(o.to);
this.isTransitioning=true
};
function g(o){return o.replace(/([A-Z])/g,function(p){return"-"+p.toLowerCase()
})
}var k="opacity,"+g(i);
e.enableTransition=function(){if(this.isTransitioning){return
}var o=this.layout.options.transitionDuration;
o=typeof o=="number"?o+"ms":o;
this.css({transitionProperty:k,transitionDuration:o,transitionDelay:this.staggerDelay||0});
this.element.addEventListener(a,this,false)
};
e.onwebkitTransitionEnd=function(o){this.ontransitionend(o)
};
e.onotransitionend=function(o){this.ontransitionend(o)
};
var d={"-webkit-transform":"transform"};
e.ontransitionend=function(r){if(r.target!==this.element){return
}var q=this._transn;
var o=d[r.propertyName]||r.propertyName;
delete q.ingProperties[o];
if(m(q.ingProperties)){this.disableTransition()
}if(o in q.clean){this.element.style[r.propertyName]="";
delete q.clean[o]
}if(o in q.onEnd){var p=q.onEnd[o];
p.call(this);
delete q.onEnd[o]
}this.emitEvent("transitionEnd",[this])
};
e.disableTransition=function(){this.removeTransitionStyles();
this.element.removeEventListener(a,this,false);
this.isTransitioning=false
};
e._removeStyles=function(p){var o={};
for(var q in p){o[q]=""
}this.css(o)
};
var f={transitionProperty:"",transitionDuration:"",transitionDelay:""};
e.removeTransitionStyles=function(){this.css(f)
};
e.stagger=function(o){o=isNaN(o)?0:o;
this.staggerDelay=o+"ms"
};
e.removeElem=function(){this.element.parentNode.removeChild(this.element);
this.css({display:""});
this.emitEvent("remove",[this])
};
e.remove=function(){if(!l||!parseFloat(this.layout.options.transitionDuration)){this.removeElem();
return
}this.once("transitionEnd",function(){this.removeElem()
});
this.hide()
};
e.reveal=function(){delete this.isHidden;
this.css({display:""});
var p=this.layout.options;
var q={};
var o=this.getHideRevealTransitionEndProperty("visibleStyle");
q[o]=this.onRevealTransitionEnd;
this.transition({from:p.hiddenStyle,to:p.visibleStyle,isCleaning:true,onTransitionEnd:q})
};
e.onRevealTransitionEnd=function(){if(!this.isHidden){this.emitEvent("reveal")
}};
e.getHideRevealTransitionEndProperty=function(p){var o=this.layout.options[p];
if(o.opacity){return"opacity"
}for(var q in o){return q
}};
e.hide=function(){this.isHidden=true;
this.css({display:""});
var p=this.layout.options;
var q={};
var o=this.getHideRevealTransitionEndProperty("hiddenStyle");
q[o]=this.onHideTransitionEnd;
this.transition({from:p.visibleStyle,to:p.hiddenStyle,isCleaning:true,onTransitionEnd:q})
};
e.onHideTransitionEnd=function(){if(this.isHidden){this.css({display:"none"});
this.emitEvent("hide")
}};
e.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})
};
return c
}));
/*!
 * Outlayer v2.1.1
 * the brains and guts of a layout library
 * MIT license
 */
(function(b,a){if(typeof define=="function"&&define.amd){define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(c,f,d,e){return a(b,c,f,d,e)
})
}else{if(typeof module=="object"&&module.exports){module.exports=a(b,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item"))
}else{b.Outlayer=a(b,b.EvEmitter,b.getSize,b.fizzyUIUtils,b.Outlayer.Item)
}}}(window,function factory(i,b,n,l,d){var e=i.console;
var o=i.jQuery;
var m=function(){};
var h=0;
var a={};
function g(s,q){var p=l.getQueryElement(s);
if(!p){if(e){e.error("Bad element for "+this.constructor.namespace+": "+(p||s))
}return
}this.element=p;
if(o){this.$element=o(this.element)
}this.options=l.extend({},this.constructor.defaults);
this.option(q);
var t=++h;
this.element.outlayerGUID=t;
a[t]=this;
this._create();
var r=this._getOption("initLayout");
if(r){this.layout()
}}g.namespace="outlayer";
g.Item=d;
g.defaults={containerStyle:{position:"relative"},initLayout:true,originLeft:true,originTop:true,resize:true,resizeContainer:true,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};
var f=g.prototype;
l.extend(f,b.prototype);
f.option=function(p){l.extend(this.options,p)
};
f._getOption=function(q){var p=this.constructor.compatOptions[q];
return p&&this.options[p]!==undefined?this.options[p]:this.options[q]
};
g.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"};
f._create=function(){this.reloadItems();
this.stamps=[];
this.stamp(this.options.stamp);
l.extend(this.element.style,this.options.containerStyle);
var p=this._getOption("resize");
if(p){this.bindResize()
}};
f.reloadItems=function(){this.items=this._itemize(this.element.children)
};
f._itemize=function(q){var t=this._filterFindItemElements(q);
var r=this.constructor.Item;
var p=[];
for(var s=0;
s<t.length;
s++){var v=t[s];
var u=new r(v,this);
p.push(u)
}return p
};
f._filterFindItemElements=function(p){return l.filterFindElements(p,this.options.itemSelector)
};
f.getItemElements=function(){return this.items.map(function(p){return p.element
})
};
f.layout=function(){this._resetLayout();
this._manageStamps();
var p=this._getOption("layoutInstant");
var q=p!==undefined?p:!this._isLayoutInited;
this.layoutItems(this.items,q);
this._isLayoutInited=true
};
f._init=f.layout;
f._resetLayout=function(){this.getSize()
};
f.getSize=function(){this.size=n(this.element)
};
f._getMeasurement=function(r,p){var q=this.options[r];
var s;
if(!q){this[r]=0
}else{if(typeof q=="string"){s=this.element.querySelector(q)
}else{if(q instanceof HTMLElement){s=q
}}this[r]=s?n(s)[p]:q
}};
f.layoutItems=function(p,q){p=this._getItemsForLayout(p);
this._layoutItems(p,q);
this._postLayout()
};
f._getItemsForLayout=function(p){return p.filter(function(q){return !q.isIgnored
})
};
f._layoutItems=function(q,r){this._emitCompleteOnItems("layout",q);
if(!q||!q.length){return
}var p=[];
q.forEach(function(t){var s=this._getItemLayoutPosition(t);
s.item=t;
s.isInstant=r||t.isLayoutInstant;
p.push(s)
},this);
this._processLayoutQueue(p)
};
f._getItemLayoutPosition=function(){return{x:0,y:0}
};
f._processLayoutQueue=function(p){this.updateStagger();
p.forEach(function(r,q){this._positionItem(r.item,r.x,r.y,r.isInstant,q)
},this)
};
f.updateStagger=function(){var p=this.options.stagger;
if(p===null||p===undefined){this.stagger=0;
return
}this.stagger=j(p);
return this.stagger
};
f._positionItem=function(r,p,t,s,q){if(s){r.goTo(p,t)
}else{r.stagger(q*this.stagger);
r.moveTo(p,t)
}};
f._postLayout=function(){this.resizeContainer()
};
f.resizeContainer=function(){var q=this._getOption("resizeContainer");
if(!q){return
}var p=this._getContainerSize();
if(p){this._setContainerMeasure(p.width,true);
this._setContainerMeasure(p.height,false)
}};
f._getContainerSize=m;
f._setContainerMeasure=function(p,q){if(p===undefined){return
}var r=this.size;
if(r.isBorderBox){p+=q?r.paddingLeft+r.paddingRight+r.borderLeftWidth+r.borderRightWidth:r.paddingBottom+r.paddingTop+r.borderTopWidth+r.borderBottomWidth
}p=Math.max(p,0);
this.element.style[q?"width":"height"]=p+"px"
};
f._emitCompleteOnItems=function(q,p){var v=this;
function u(){v.dispatchEvent(q+"Complete",null,[p])
}var t=p.length;
if(!p||!t){u();
return
}var r=0;
function s(){r++;
if(r==t){u()
}}p.forEach(function(w){w.once(q,s)
})
};
f.dispatchEvent=function(s,t,q){var r=t?[t].concat(q):q;
this.emitEvent(s,r);
if(o){this.$element=this.$element||o(this.element);
if(t){var p=o.Event(t);
p.type=s;
this.$element.trigger(p,q)
}else{this.$element.trigger(s,q)
}}};
f.ignore=function(q){var p=this.getItem(q);
if(p){p.isIgnored=true
}};
f.unignore=function(q){var p=this.getItem(q);
if(p){delete p.isIgnored
}};
f.stamp=function(p){p=this._find(p);
if(!p){return
}this.stamps=this.stamps.concat(p);
p.forEach(this.ignore,this)
};
f.unstamp=function(p){p=this._find(p);
if(!p){return
}p.forEach(function(q){l.removeFrom(this.stamps,q);
this.unignore(q)
},this)
};
f._find=function(p){if(!p){return
}if(typeof p=="string"){p=this.element.querySelectorAll(p)
}p=l.makeArray(p);
return p
};
f._manageStamps=function(){if(!this.stamps||!this.stamps.length){return
}this._getBoundingRect();
this.stamps.forEach(this._manageStamp,this)
};
f._getBoundingRect=function(){var p=this.element.getBoundingClientRect();
var q=this.size;
this._boundingRect={left:p.left+q.paddingLeft+q.borderLeftWidth,top:p.top+q.paddingTop+q.borderTopWidth,right:p.right-(q.paddingRight+q.borderRightWidth),bottom:p.bottom-(q.paddingBottom+q.borderBottomWidth)}
};
f._manageStamp=m;
f._getElementOffset=function(s){var p=s.getBoundingClientRect();
var r=this._boundingRect;
var q=n(s);
var t={left:p.left-r.left-q.marginLeft,top:p.top-r.top-q.marginTop,right:r.right-p.right-q.marginRight,bottom:r.bottom-p.bottom-q.marginBottom};
return t
};
f.handleEvent=l.handleEvent;
f.bindResize=function(){i.addEventListener("resize",this);
this.isResizeBound=true
};
f.unbindResize=function(){i.removeEventListener("resize",this);
this.isResizeBound=false
};
f.onresize=function(){this.resize()
};
l.debounceMethod(g,"onresize",100);
f.resize=function(){if(!this.isResizeBound||!this.needsResizeLayout()){return
}this.layout()
};
f.needsResizeLayout=function(){var q=n(this.element);
var p=this.size&&q;
return p&&q.innerWidth!==this.size.innerWidth
};
f.addItems=function(q){var p=this._itemize(q);
if(p.length){this.items=this.items.concat(p)
}return p
};
f.appended=function(q){var p=this.addItems(q);
if(!p.length){return
}this.layoutItems(p,true);
this.reveal(p)
};
f.prepended=function(q){var p=this._itemize(q);
if(!p.length){return
}var r=this.items.slice(0);
this.items=p.concat(r);
this._resetLayout();
this._manageStamps();
this.layoutItems(p,true);
this.reveal(p);
this.layoutItems(r)
};
f.reveal=function(p){this._emitCompleteOnItems("reveal",p);
if(!p||!p.length){return
}var q=this.updateStagger();
p.forEach(function(s,r){s.stagger(r*q);
s.reveal()
})
};
f.hide=function(p){this._emitCompleteOnItems("hide",p);
if(!p||!p.length){return
}var q=this.updateStagger();
p.forEach(function(s,r){s.stagger(r*q);
s.hide()
})
};
f.revealItemElements=function(q){var p=this.getItems(q);
this.reveal(p)
};
f.hideItemElements=function(q){var p=this.getItems(q);
this.hide(p)
};
f.getItem=function(r){for(var p=0;
p<this.items.length;
p++){var q=this.items[p];
if(q.element==r){return q
}}};
f.getItems=function(q){q=l.makeArray(q);
var p=[];
q.forEach(function(s){var r=this.getItem(s);
if(r){p.push(r)
}},this);
return p
};
f.remove=function(p){var q=this.getItems(p);
this._emitCompleteOnItems("remove",q);
if(!q||!q.length){return
}q.forEach(function(r){r.remove();
l.removeFrom(this.items,r)
},this)
};
f.destroy=function(){var p=this.element.style;
p.height="";
p.position="";
p.width="";
this.items.forEach(function(r){r.destroy()
});
this.unbindResize();
var q=this.element.outlayerGUID;
delete a[q];
delete this.element.outlayerGUID;
if(o){o.removeData(this.element,this.constructor.namespace)
}};
g.data=function(p){p=l.getQueryElement(p);
var q=p&&p.outlayerGUID;
return q&&a[q]
};
g.create=function(r,p){var q=c(g);
q.defaults=l.extend({},g.defaults);
l.extend(q.defaults,p);
q.compatOptions=l.extend({},g.compatOptions);
q.namespace=r;
q.data=g.data;
q.Item=c(d);
l.htmlInit(q,r);
if(o&&o.bridget){o.bridget(r,q)
}return q
};
function c(p){function q(){p.apply(this,arguments)
}q.prototype=Object.create(p.prototype);
q.prototype.constructor=q;
return q
}var k={ms:1,s:1000};
function j(t){if(typeof t=="number"){return t
}var r=t.match(/(^\d*\.?\d*)(\w*)/);
var p=r&&r[1];
var q=r&&r[2];
if(!p.length){return 0
}p=parseFloat(p);
var s=k[q]||1;
return p*s
}g.Item=d;
return g
}));
/*!
 * Masonry v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
(function(b,a){if(typeof define=="function"&&define.amd){define(["outlayer/outlayer","get-size/get-size"],a)
}else{if(typeof module=="object"&&module.exports){module.exports=a(require("outlayer"),require("get-size"))
}else{b.Masonry=a(b.Outlayer,b.getSize)
}}}(window,function factory(b,d){var a=b.create("masonry");
a.compatOptions.fitWidth="isFitWidth";
var c=a.prototype;
c._resetLayout=function(){this.getSize();
this._getMeasurement("columnWidth","outerWidth");
this._getMeasurement("gutter","outerWidth");
this.measureColumns();
this.colYs=[];
for(var e=0;
e<this.cols;
e++){this.colYs.push(0)
}this.maxY=0;
this.horizontalColIndex=0
};
c.measureColumns=function(){this.getContainerWidth();
if(!this.columnWidth){var k=this.items[0];
var g=k&&k.element;
this.columnWidth=g&&d(g).outerWidth||this.containerWidth
}var i=this.columnWidth+=this.gutter;
var h=this.containerWidth+this.gutter;
var j=h/i;
var e=i-h%i;
var f=e&&e<1?"round":"floor";
j=Math[f](j);
this.cols=Math.max(j,1)
};
c.getContainerWidth=function(){var g=this._getOption("fitWidth");
var e=g?this.element.parentNode:this.element;
var f=d(e);
this.containerWidth=f&&f.innerWidth
};
c._getItemLayoutPosition=function(n){n.getSize();
var m=n.size.outerWidth%this.columnWidth;
var h=m&&m<1?"round":"ceil";
var j=Math[h](n.size.outerWidth/this.columnWidth);
j=Math.min(j,this.cols);
var e=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition";
var k=this[e](j,n);
var g={x:this.columnWidth*k.col,y:k.y};
var l=k.y+n.size.outerHeight;
var o=j+k.col;
for(var f=k.col;
f<o;
f++){this.colYs[f]=l
}return g
};
c._getTopColPosition=function(f){var g=this._getTopColGroup(f);
var e=Math.min.apply(Math,g);
return{col:g.indexOf(e),y:e}
};
c._getTopColGroup=function(f){if(f<2){return this.colYs
}var g=[];
var h=this.cols+1-f;
for(var e=0;
e<h;
e++){g[e]=this._getColGroupY(e,f)
}return g
};
c._getColGroupY=function(e,g){if(g<2){return this.colYs[e]
}var f=this.colYs.slice(e,e+g);
return Math.max.apply(Math,f)
};
c._getHorizontalColPosition=function(g,f){var e=this.horizontalColIndex%this.cols;
var h=g>1&&e+g>this.cols;
e=h?0:e;
var i=f.size.outerWidth&&f.size.outerHeight;
this.horizontalColIndex=i?e+g:this.horizontalColIndex;
return{col:e,y:this._getColGroupY(e,g)}
};
c._manageStamp=function(e){var l=d(e);
var j=this._getElementOffset(e);
var p=this._getOption("originLeft");
var h=p?j.left:j.right;
var f=h+l.outerWidth;
var n=Math.floor(h/this.columnWidth);
n=Math.max(0,n);
var g=Math.floor(f/this.columnWidth);
g-=f%this.columnWidth?0:1;
g=Math.min(this.cols-1,g);
var o=this._getOption("originTop");
var m=(o?j.top:j.bottom)+l.outerHeight;
for(var k=n;
k<=g;
k++){this.colYs[k]=Math.max(m,this.colYs[k])
}};
c._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);
var e={height:this.maxY};
if(this._getOption("fitWidth")){e.width=this._getContainerFitWidth()
}return e
};
c._getContainerFitWidth=function(){var f=0;
var e=this.cols;
while(--e){if(this.colYs[e]!==0){break
}f++
}return(this.cols-f)*this.columnWidth-this.gutter
};
c.needsResizeLayout=function(){var e=this.containerWidth;
this.getContainerWidth();
return e!=this.containerWidth
};
return a
}));
(typeof navigator!=="undefined")&&(function(b,a){typeof exports==="object"&&typeof module!=="undefined"?module.exports=a():typeof define==="function"&&define.amd?define(a):(b=typeof globalThis!=="undefined"?globalThis:b||self,b.lottie=a())
})(this,(function(){var svgNS="http://www.w3.org/2000/svg";
var locationHref="";
var _useWebWorker=false;
var initialDefaultFrame=-999999;
var setWebWorker=function setWebWorker(flag){_useWebWorker=!!flag
};
var getWebWorker=function getWebWorker(){return _useWebWorker
};
var setLocationHref=function setLocationHref(value){locationHref=value
};
var getLocationHref=function getLocationHref(){return locationHref
};
function createTag(type){return document.createElement(type)
}function extendPrototype(sources,destination){var i;
var len=sources.length;
var sourcePrototype;
for(i=0;
i<len;
i+=1){sourcePrototype=sources[i].prototype;
for(var attr in sourcePrototype){if(Object.prototype.hasOwnProperty.call(sourcePrototype,attr)){destination.prototype[attr]=sourcePrototype[attr]
}}}}function getDescriptor(object,prop){return Object.getOwnPropertyDescriptor(object,prop)
}function createProxyFunction(prototype){function ProxyFunction(){}ProxyFunction.prototype=prototype;
return ProxyFunction
}var audioControllerFactory=function(){function AudioController(audioFactory){this.audios=[];
this.audioFactory=audioFactory;
this._volume=1;
this._isMuted=false
}AudioController.prototype={addAudio:function addAudio(audio){this.audios.push(audio)
},pause:function pause(){var i;
var len=this.audios.length;
for(i=0;
i<len;
i+=1){this.audios[i].pause()
}},resume:function resume(){var i;
var len=this.audios.length;
for(i=0;
i<len;
i+=1){this.audios[i].resume()
}},setRate:function setRate(rateValue){var i;
var len=this.audios.length;
for(i=0;
i<len;
i+=1){this.audios[i].setRate(rateValue)
}},createAudio:function createAudio(assetPath){if(this.audioFactory){return this.audioFactory(assetPath)
}if(window.Howl){return new window.Howl({src:[assetPath]})
}return{isPlaying:false,play:function play(){this.isPlaying=true
},seek:function seek(){this.isPlaying=false
},playing:function playing(){},rate:function rate(){},setVolume:function setVolume(){}}
},setAudioFactory:function setAudioFactory(audioFactory){this.audioFactory=audioFactory
},setVolume:function setVolume(value){this._volume=value;
this._updateVolume()
},mute:function mute(){this._isMuted=true;
this._updateVolume()
},unmute:function unmute(){this._isMuted=false;
this._updateVolume()
},getVolume:function getVolume(){return this._volume
},_updateVolume:function _updateVolume(){var i;
var len=this.audios.length;
for(i=0;
i<len;
i+=1){this.audios[i].volume(this._volume*(this._isMuted?0:1))
}}};
return function(){return new AudioController()
}
}();
var createTypedArray=function(){function createRegularArray(type,len){var i=0;
var arr=[];
var value;
switch(type){case"int16":case"uint8c":value=1;
break;
default:value=1.1;
break
}for(i=0;
i<len;
i+=1){arr.push(value)
}return arr
}function createTypedArrayFactory(type,len){if(type==="float32"){return new Float32Array(len)
}if(type==="int16"){return new Int16Array(len)
}if(type==="uint8c"){return new Uint8ClampedArray(len)
}return createRegularArray(type,len)
}if(typeof Uint8ClampedArray==="function"&&typeof Float32Array==="function"){return createTypedArrayFactory
}return createRegularArray
}();
function createSizedArray(len){return Array.apply(null,{length:len})
}function _typeof$6(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof$6=function _typeof(obj){return typeof obj
}
}else{_typeof$6=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj
}
}return _typeof$6(obj)
}var subframeEnabled=true;
var expressionsPlugin=null;
var expressionsInterfaces=null;
var idPrefix$1="";
var isSafari=/^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var _shouldRoundValues=false;
var bmPow=Math.pow;
var bmSqrt=Math.sqrt;
var bmFloor=Math.floor;
var bmMax=Math.max;
var bmMin=Math.min;
var BMMath={};
(function(){var propertyNames=["abs","acos","acosh","asin","asinh","atan","atanh","atan2","ceil","cbrt","expm1","clz32","cos","cosh","exp","floor","fround","hypot","imul","log","log1p","log2","log10","max","min","pow","random","round","sign","sin","sinh","sqrt","tan","tanh","trunc","E","LN10","LN2","LOG10E","LOG2E","PI","SQRT1_2","SQRT2"];
var i;
var len=propertyNames.length;
for(i=0;
i<len;
i+=1){BMMath[propertyNames[i]]=Math[propertyNames[i]]
}})();
function ProjectInterface$1(){return{}
}BMMath.random=Math.random;
BMMath.abs=function(val){var tOfVal=_typeof$6(val);
if(tOfVal==="object"&&val.length){var absArr=createSizedArray(val.length);
var i;
var len=val.length;
for(i=0;
i<len;
i+=1){absArr[i]=Math.abs(val[i])
}return absArr
}return Math.abs(val)
};
var defaultCurveSegments=150;
var degToRads=Math.PI/180;
var roundCorner=0.5519;
function roundValues(flag){_shouldRoundValues=!!flag
}function bmRnd(value){if(_shouldRoundValues){return Math.round(value)
}return value
}function styleDiv(element){element.style.position="absolute";
element.style.top=0;
element.style.left=0;
element.style.display="block";
element.style.transformOrigin="0 0";
element.style.webkitTransformOrigin="0 0";
element.style.backfaceVisibility="visible";
element.style.webkitBackfaceVisibility="visible";
element.style.transformStyle="preserve-3d";
element.style.webkitTransformStyle="preserve-3d";
element.style.mozTransformStyle="preserve-3d"
}function BMEnterFrameEvent(type,currentTime,totalTime,frameMultiplier){this.type=type;
this.currentTime=currentTime;
this.totalTime=totalTime;
this.direction=frameMultiplier<0?-1:1
}function BMCompleteEvent(type,frameMultiplier){this.type=type;
this.direction=frameMultiplier<0?-1:1
}function BMCompleteLoopEvent(type,totalLoops,currentLoop,frameMultiplier){this.type=type;
this.currentLoop=currentLoop;
this.totalLoops=totalLoops;
this.direction=frameMultiplier<0?-1:1
}function BMSegmentStartEvent(type,firstFrame,totalFrames){this.type=type;
this.firstFrame=firstFrame;
this.totalFrames=totalFrames
}function BMDestroyEvent(type,target){this.type=type;
this.target=target
}function BMRenderFrameErrorEvent(nativeError,currentTime){this.type="renderFrameError";
this.nativeError=nativeError;
this.currentTime=currentTime
}function BMConfigErrorEvent(nativeError){this.type="configError";
this.nativeError=nativeError
}function BMAnimationConfigErrorEvent(type,nativeError){this.type=type;
this.nativeError=nativeError
}var createElementID=function(){var _count=0;
return function createID(){_count+=1;
return idPrefix$1+"__lottie_element_"+_count
}
}();
function HSVtoRGB(h,s,v){var r;
var g;
var b;
var i;
var f;
var p;
var q;
var t;
i=Math.floor(h*6);
f=h*6-i;
p=v*(1-s);
q=v*(1-f*s);
t=v*(1-(1-f)*s);
switch(i%6){case 0:r=v;
g=t;
b=p;
break;
case 1:r=q;
g=v;
b=p;
break;
case 2:r=p;
g=v;
b=t;
break;
case 3:r=p;
g=q;
b=v;
break;
case 4:r=t;
g=p;
b=v;
break;
case 5:r=v;
g=p;
b=q;
break;
default:break
}return[r,g,b]
}function RGBtoHSV(r,g,b){var max=Math.max(r,g,b);
var min=Math.min(r,g,b);
var d=max-min;
var h;
var s=max===0?0:d/max;
var v=max/255;
switch(max){case min:h=0;
break;
case r:h=g-b+d*(g<b?6:0);
h/=6*d;
break;
case g:h=b-r+d*2;
h/=6*d;
break;
case b:h=r-g+d*4;
h/=6*d;
break;
default:break
}return[h,s,v]
}function addSaturationToRGB(color,offset){var hsv=RGBtoHSV(color[0]*255,color[1]*255,color[2]*255);
hsv[1]+=offset;
if(hsv[1]>1){hsv[1]=1
}else{if(hsv[1]<=0){hsv[1]=0
}}return HSVtoRGB(hsv[0],hsv[1],hsv[2])
}function addBrightnessToRGB(color,offset){var hsv=RGBtoHSV(color[0]*255,color[1]*255,color[2]*255);
hsv[2]+=offset;
if(hsv[2]>1){hsv[2]=1
}else{if(hsv[2]<0){hsv[2]=0
}}return HSVtoRGB(hsv[0],hsv[1],hsv[2])
}function addHueToRGB(color,offset){var hsv=RGBtoHSV(color[0]*255,color[1]*255,color[2]*255);
hsv[0]+=offset/360;
if(hsv[0]>1){hsv[0]-=1
}else{if(hsv[0]<0){hsv[0]+=1
}}return HSVtoRGB(hsv[0],hsv[1],hsv[2])
}var rgbToHex=function(){var colorMap=[];
var i;
var hex;
for(i=0;
i<256;
i+=1){hex=i.toString(16);
colorMap[i]=hex.length===1?"0"+hex:hex
}return function(r,g,b){if(r<0){r=0
}if(g<0){g=0
}if(b<0){b=0
}return"#"+colorMap[r]+colorMap[g]+colorMap[b]
}
}();
var setSubframeEnabled=function setSubframeEnabled(flag){subframeEnabled=!!flag
};
var getSubframeEnabled=function getSubframeEnabled(){return subframeEnabled
};
var setExpressionsPlugin=function setExpressionsPlugin(value){expressionsPlugin=value
};
var getExpressionsPlugin=function getExpressionsPlugin(){return expressionsPlugin
};
var setExpressionInterfaces=function setExpressionInterfaces(value){expressionsInterfaces=value
};
var getExpressionInterfaces=function getExpressionInterfaces(){return expressionsInterfaces
};
var setDefaultCurveSegments=function setDefaultCurveSegments(value){defaultCurveSegments=value
};
var getDefaultCurveSegments=function getDefaultCurveSegments(){return defaultCurveSegments
};
var setIdPrefix=function setIdPrefix(value){idPrefix$1=value
};
var getIdPrefix=function getIdPrefix(){return idPrefix$1
};
function createNS(type){return document.createElementNS(svgNS,type)
}function _typeof$5(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof$5=function _typeof(obj){return typeof obj
}
}else{_typeof$5=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj
}
}return _typeof$5(obj)
}var dataManager=function(){var _counterId=1;
var processes=[];
var workerFn;
var workerInstance;
var workerProxy={onmessage:function onmessage(){},postMessage:function postMessage(path){workerFn({data:path})
}};
var _workerSelf={postMessage:function postMessage(data){workerProxy.onmessage({data:data})
}};
function createWorker(fn){if(window.Worker&&window.Blob&&getWebWorker()){var blob=new Blob(["var _workerSelf = self; self.onmessage = ",fn.toString()],{type:"text/javascript"});
var url=URL.createObjectURL(blob);
return new Worker(url)
}workerFn=fn;
return workerProxy
}function setupWorker(){if(!workerInstance){workerInstance=createWorker(function workerStart(e){function dataFunctionManager(){function completeLayers(layers,comps){var layerData;
var i;
var len=layers.length;
var j;
var jLen;
var k;
var kLen;
for(i=0;
i<len;
i+=1){layerData=layers[i];
if("ks" in layerData&&!layerData.completed){layerData.completed=true;
if(layerData.hasMask){var maskProps=layerData.masksProperties;
jLen=maskProps.length;
for(j=0;
j<jLen;
j+=1){if(maskProps[j].pt.k.i){convertPathsToAbsoluteValues(maskProps[j].pt.k)
}else{kLen=maskProps[j].pt.k.length;
for(k=0;
k<kLen;
k+=1){if(maskProps[j].pt.k[k].s){convertPathsToAbsoluteValues(maskProps[j].pt.k[k].s[0])
}if(maskProps[j].pt.k[k].e){convertPathsToAbsoluteValues(maskProps[j].pt.k[k].e[0])
}}}}}if(layerData.ty===0){layerData.layers=findCompLayers(layerData.refId,comps);
completeLayers(layerData.layers,comps)
}else{if(layerData.ty===4){completeShapes(layerData.shapes)
}else{if(layerData.ty===5){completeText(layerData)
}}}}}}function completeChars(chars,assets){if(chars){var i=0;
var len=chars.length;
for(i=0;
i<len;
i+=1){if(chars[i].t===1){chars[i].data.layers=findCompLayers(chars[i].data.refId,assets);
completeLayers(chars[i].data.layers,assets)
}}}}function findComp(id,comps){var i=0;
var len=comps.length;
while(i<len){if(comps[i].id===id){return comps[i]
}i+=1
}return null
}function findCompLayers(id,comps){var comp=findComp(id,comps);
if(comp){if(!comp.layers.__used){comp.layers.__used=true;
return comp.layers
}return JSON.parse(JSON.stringify(comp.layers))
}return null
}function completeShapes(arr){var i;
var len=arr.length;
var j;
var jLen;
for(i=len-1;
i>=0;
i-=1){if(arr[i].ty==="sh"){if(arr[i].ks.k.i){convertPathsToAbsoluteValues(arr[i].ks.k)
}else{jLen=arr[i].ks.k.length;
for(j=0;
j<jLen;
j+=1){if(arr[i].ks.k[j].s){convertPathsToAbsoluteValues(arr[i].ks.k[j].s[0])
}if(arr[i].ks.k[j].e){convertPathsToAbsoluteValues(arr[i].ks.k[j].e[0])
}}}}else{if(arr[i].ty==="gr"){completeShapes(arr[i].it)
}}}}function convertPathsToAbsoluteValues(path){var i;
var len=path.i.length;
for(i=0;
i<len;
i+=1){path.i[i][0]+=path.v[i][0];
path.i[i][1]+=path.v[i][1];
path.o[i][0]+=path.v[i][0];
path.o[i][1]+=path.v[i][1]
}}function checkVersion(minimum,animVersionString){var animVersion=animVersionString?animVersionString.split("."):[100,100,100];
if(minimum[0]>animVersion[0]){return true
}if(animVersion[0]>minimum[0]){return false
}if(minimum[1]>animVersion[1]){return true
}if(animVersion[1]>minimum[1]){return false
}if(minimum[2]>animVersion[2]){return true
}if(animVersion[2]>minimum[2]){return false
}return null
}var checkText=function(){var minimumVersion=[4,4,14];
function updateTextLayer(textLayer){var documentData=textLayer.t.d;
textLayer.t.d={k:[{s:documentData,t:0}]}
}function iterateLayers(layers){var i;
var len=layers.length;
for(i=0;
i<len;
i+=1){if(layers[i].ty===5){updateTextLayer(layers[i])
}}}return function(animationData){if(checkVersion(minimumVersion,animationData.v)){iterateLayers(animationData.layers);
if(animationData.assets){var i;
var len=animationData.assets.length;
for(i=0;
i<len;
i+=1){if(animationData.assets[i].layers){iterateLayers(animationData.assets[i].layers)
}}}}}
}();
var checkChars=function(){var minimumVersion=[4,7,99];
return function(animationData){if(animationData.chars&&!checkVersion(minimumVersion,animationData.v)){var i;
var len=animationData.chars.length;
for(i=0;
i<len;
i+=1){var charData=animationData.chars[i];
if(charData.data&&charData.data.shapes){completeShapes(charData.data.shapes);
charData.data.ip=0;
charData.data.op=99999;
charData.data.st=0;
charData.data.sr=1;
charData.data.ks={p:{k:[0,0],a:0},s:{k:[100,100],a:0},a:{k:[0,0],a:0},r:{k:0,a:0},o:{k:100,a:0}};
if(!animationData.chars[i].t){charData.data.shapes.push({ty:"no"});
charData.data.shapes[0].it.push({p:{k:[0,0],a:0},s:{k:[100,100],a:0},a:{k:[0,0],a:0},r:{k:0,a:0},o:{k:100,a:0},sk:{k:0,a:0},sa:{k:0,a:0},ty:"tr"})
}}}}}
}();
var checkPathProperties=function(){var minimumVersion=[5,7,15];
function updateTextLayer(textLayer){var pathData=textLayer.t.p;
if(typeof pathData.a==="number"){pathData.a={a:0,k:pathData.a}
}if(typeof pathData.p==="number"){pathData.p={a:0,k:pathData.p}
}if(typeof pathData.r==="number"){pathData.r={a:0,k:pathData.r}
}}function iterateLayers(layers){var i;
var len=layers.length;
for(i=0;
i<len;
i+=1){if(layers[i].ty===5){updateTextLayer(layers[i])
}}}return function(animationData){if(checkVersion(minimumVersion,animationData.v)){iterateLayers(animationData.layers);
if(animationData.assets){var i;
var len=animationData.assets.length;
for(i=0;
i<len;
i+=1){if(animationData.assets[i].layers){iterateLayers(animationData.assets[i].layers)
}}}}}
}();
var checkColors=function(){var minimumVersion=[4,1,9];
function iterateShapes(shapes){var i;
var len=shapes.length;
var j;
var jLen;
for(i=0;
i<len;
i+=1){if(shapes[i].ty==="gr"){iterateShapes(shapes[i].it)
}else{if(shapes[i].ty==="fl"||shapes[i].ty==="st"){if(shapes[i].c.k&&shapes[i].c.k[0].i){jLen=shapes[i].c.k.length;
for(j=0;
j<jLen;
j+=1){if(shapes[i].c.k[j].s){shapes[i].c.k[j].s[0]/=255;
shapes[i].c.k[j].s[1]/=255;
shapes[i].c.k[j].s[2]/=255;
shapes[i].c.k[j].s[3]/=255
}if(shapes[i].c.k[j].e){shapes[i].c.k[j].e[0]/=255;
shapes[i].c.k[j].e[1]/=255;
shapes[i].c.k[j].e[2]/=255;
shapes[i].c.k[j].e[3]/=255
}}}else{shapes[i].c.k[0]/=255;
shapes[i].c.k[1]/=255;
shapes[i].c.k[2]/=255;
shapes[i].c.k[3]/=255
}}}}}function iterateLayers(layers){var i;
var len=layers.length;
for(i=0;
i<len;
i+=1){if(layers[i].ty===4){iterateShapes(layers[i].shapes)
}}}return function(animationData){if(checkVersion(minimumVersion,animationData.v)){iterateLayers(animationData.layers);
if(animationData.assets){var i;
var len=animationData.assets.length;
for(i=0;
i<len;
i+=1){if(animationData.assets[i].layers){iterateLayers(animationData.assets[i].layers)
}}}}}
}();
var checkShapes=function(){var minimumVersion=[4,4,18];
function completeClosingShapes(arr){var i;
var len=arr.length;
var j;
var jLen;
for(i=len-1;
i>=0;
i-=1){if(arr[i].ty==="sh"){if(arr[i].ks.k.i){arr[i].ks.k.c=arr[i].closed
}else{jLen=arr[i].ks.k.length;
for(j=0;
j<jLen;
j+=1){if(arr[i].ks.k[j].s){arr[i].ks.k[j].s[0].c=arr[i].closed
}if(arr[i].ks.k[j].e){arr[i].ks.k[j].e[0].c=arr[i].closed
}}}}else{if(arr[i].ty==="gr"){completeClosingShapes(arr[i].it)
}}}}function iterateLayers(layers){var layerData;
var i;
var len=layers.length;
var j;
var jLen;
var k;
var kLen;
for(i=0;
i<len;
i+=1){layerData=layers[i];
if(layerData.hasMask){var maskProps=layerData.masksProperties;
jLen=maskProps.length;
for(j=0;
j<jLen;
j+=1){if(maskProps[j].pt.k.i){maskProps[j].pt.k.c=maskProps[j].cl
}else{kLen=maskProps[j].pt.k.length;
for(k=0;
k<kLen;
k+=1){if(maskProps[j].pt.k[k].s){maskProps[j].pt.k[k].s[0].c=maskProps[j].cl
}if(maskProps[j].pt.k[k].e){maskProps[j].pt.k[k].e[0].c=maskProps[j].cl
}}}}}if(layerData.ty===4){completeClosingShapes(layerData.shapes)
}}}return function(animationData){if(checkVersion(minimumVersion,animationData.v)){iterateLayers(animationData.layers);
if(animationData.assets){var i;
var len=animationData.assets.length;
for(i=0;
i<len;
i+=1){if(animationData.assets[i].layers){iterateLayers(animationData.assets[i].layers)
}}}}}
}();
function completeData(animationData){if(animationData.__complete){return
}checkColors(animationData);
checkText(animationData);
checkChars(animationData);
checkPathProperties(animationData);
checkShapes(animationData);
completeLayers(animationData.layers,animationData.assets);
completeChars(animationData.chars,animationData.assets);
animationData.__complete=true
}function completeText(data){if(data.t.a.length===0&&!("m" in data.t.p)){}}var moduleOb={};
moduleOb.completeData=completeData;
moduleOb.checkColors=checkColors;
moduleOb.checkChars=checkChars;
moduleOb.checkPathProperties=checkPathProperties;
moduleOb.checkShapes=checkShapes;
moduleOb.completeLayers=completeLayers;
return moduleOb
}if(!_workerSelf.dataManager){_workerSelf.dataManager=dataFunctionManager()
}if(!_workerSelf.assetLoader){_workerSelf.assetLoader=function(){function formatResponse(xhr){var contentTypeHeader=xhr.getResponseHeader("content-type");
if(contentTypeHeader&&xhr.responseType==="json"&&contentTypeHeader.indexOf("json")!==-1){return xhr.response
}if(xhr.response&&_typeof$5(xhr.response)==="object"){return xhr.response
}if(xhr.response&&typeof xhr.response==="string"){return JSON.parse(xhr.response)
}if(xhr.responseText){return JSON.parse(xhr.responseText)
}return null
}function loadAsset(path,fullPath,callback,errorCallback){var response;
var xhr=new XMLHttpRequest();
try{xhr.responseType="json"
}catch(err){}xhr.onreadystatechange=function(){if(xhr.readyState===4){if(xhr.status===200){response=formatResponse(xhr);
callback(response)
}else{try{response=formatResponse(xhr);
callback(response)
}catch(err){if(errorCallback){errorCallback(err)
}}}}};
try{xhr.open(["G","E","T"].join(""),path,true)
}catch(error){xhr.open(["G","E","T"].join(""),fullPath+"/"+path,true)
}xhr.send()
}return{load:loadAsset}
}()
}if(e.data.type==="loadAnimation"){_workerSelf.assetLoader.load(e.data.path,e.data.fullPath,function(data){_workerSelf.dataManager.completeData(data);
_workerSelf.postMessage({id:e.data.id,payload:data,status:"success"})
},function(){_workerSelf.postMessage({id:e.data.id,status:"error"})
})
}else{if(e.data.type==="complete"){var animation=e.data.animation;
_workerSelf.dataManager.completeData(animation);
_workerSelf.postMessage({id:e.data.id,payload:animation,status:"success"})
}else{if(e.data.type==="loadData"){_workerSelf.assetLoader.load(e.data.path,e.data.fullPath,function(data){_workerSelf.postMessage({id:e.data.id,payload:data,status:"success"})
},function(){_workerSelf.postMessage({id:e.data.id,status:"error"})
})
}}}});
workerInstance.onmessage=function(event){var data=event.data;
var id=data.id;
var process=processes[id];
processes[id]=null;
if(data.status==="success"){process.onComplete(data.payload)
}else{if(process.onError){process.onError()
}}}
}}function createProcess(onComplete,onError){_counterId+=1;
var id="processId_"+_counterId;
processes[id]={onComplete:onComplete,onError:onError};
return id
}function loadAnimation(path,onComplete,onError){setupWorker();
var processId=createProcess(onComplete,onError);
workerInstance.postMessage({type:"loadAnimation",path:path,fullPath:window.location.origin+window.location.pathname,id:processId})
}function loadData(path,onComplete,onError){setupWorker();
var processId=createProcess(onComplete,onError);
workerInstance.postMessage({type:"loadData",path:path,fullPath:window.location.origin+window.location.pathname,id:processId})
}function completeAnimation(anim,onComplete,onError){setupWorker();
var processId=createProcess(onComplete,onError);
workerInstance.postMessage({type:"complete",animation:anim,id:processId})
}return{loadAnimation:loadAnimation,loadData:loadData,completeAnimation:completeAnimation}
}();
var ImagePreloader=function(){var proxyImage=function(){var canvas=createTag("canvas");
canvas.width=1;
canvas.height=1;
var ctx=canvas.getContext("2d");
ctx.fillStyle="rgba(0,0,0,0)";
ctx.fillRect(0,0,1,1);
return canvas
}();
function imageLoaded(){this.loadedAssets+=1;
if(this.loadedAssets===this.totalImages&&this.loadedFootagesCount===this.totalFootages){if(this.imagesLoadedCb){this.imagesLoadedCb(null)
}}}function footageLoaded(){this.loadedFootagesCount+=1;
if(this.loadedAssets===this.totalImages&&this.loadedFootagesCount===this.totalFootages){if(this.imagesLoadedCb){this.imagesLoadedCb(null)
}}}function getAssetsPath(assetData,assetsPath,originalPath){var path="";
if(assetData.e){path=assetData.p
}else{if(assetsPath){var imagePath=assetData.p;
if(imagePath.indexOf("images/")!==-1){imagePath=imagePath.split("/")[1]
}path=assetsPath+imagePath
}else{path=originalPath;
path+=assetData.u?assetData.u:"";
path+=assetData.p
}}return path
}function testImageLoaded(img){var _count=0;
var intervalId=setInterval(function(){var box=img.getBBox();
if(box.width||_count>500){this._imageLoaded();
clearInterval(intervalId)
}_count+=1
}.bind(this),50)
}function createImageData(assetData){var path=getAssetsPath(assetData,this.assetsPath,this.path);
var img=createNS("image");
if(isSafari){this.testImageLoaded(img)
}else{img.addEventListener("load",this._imageLoaded,false)
}img.addEventListener("error",function(){ob.img=proxyImage;
this._imageLoaded()
}.bind(this),false);
img.setAttributeNS("http://www.w3.org/1999/xlink","href",path);
if(this._elementHelper.append){this._elementHelper.append(img)
}else{this._elementHelper.appendChild(img)
}var ob={img:img,assetData:assetData};
return ob
}function createImgData(assetData){var path=getAssetsPath(assetData,this.assetsPath,this.path);
var img=createTag("img");
img.crossOrigin="anonymous";
img.addEventListener("load",this._imageLoaded,false);
img.addEventListener("error",function(){ob.img=proxyImage;
this._imageLoaded()
}.bind(this),false);
img.src=path;
var ob={img:img,assetData:assetData};
return ob
}function createFootageData(data){var ob={assetData:data};
var path=getAssetsPath(data,this.assetsPath,this.path);
dataManager.loadData(path,function(footageData){ob.img=footageData;
this._footageLoaded()
}.bind(this),function(){ob.img={};
this._footageLoaded()
}.bind(this));
return ob
}function loadAssets(assets,cb){this.imagesLoadedCb=cb;
var i;
var len=assets.length;
for(i=0;
i<len;
i+=1){if(!assets[i].layers){if(!assets[i].t||assets[i].t==="seq"){this.totalImages+=1;
this.images.push(this._createImageData(assets[i]))
}else{if(assets[i].t===3){this.totalFootages+=1;
this.images.push(this.createFootageData(assets[i]))
}}}}}function setPath(path){this.path=path||""
}function setAssetsPath(path){this.assetsPath=path||""
}function getAsset(assetData){var i=0;
var len=this.images.length;
while(i<len){if(this.images[i].assetData===assetData){return this.images[i].img
}i+=1
}return null
}function destroy(){this.imagesLoadedCb=null;
this.images.length=0
}function loadedImages(){return this.totalImages===this.loadedAssets
}function loadedFootages(){return this.totalFootages===this.loadedFootagesCount
}function setCacheType(type,elementHelper){if(type==="svg"){this._elementHelper=elementHelper;
this._createImageData=this.createImageData.bind(this)
}else{this._createImageData=this.createImgData.bind(this)
}}function ImagePreloaderFactory(){this._imageLoaded=imageLoaded.bind(this);
this._footageLoaded=footageLoaded.bind(this);
this.testImageLoaded=testImageLoaded.bind(this);
this.createFootageData=createFootageData.bind(this);
this.assetsPath="";
this.path="";
this.totalImages=0;
this.totalFootages=0;
this.loadedAssets=0;
this.loadedFootagesCount=0;
this.imagesLoadedCb=null;
this.images=[]
}ImagePreloaderFactory.prototype={loadAssets:loadAssets,setAssetsPath:setAssetsPath,setPath:setPath,loadedImages:loadedImages,loadedFootages:loadedFootages,destroy:destroy,getAsset:getAsset,createImgData:createImgData,createImageData:createImageData,imageLoaded:imageLoaded,footageLoaded:footageLoaded,setCacheType:setCacheType};
return ImagePreloaderFactory
}();
function BaseEvent(){}BaseEvent.prototype={triggerEvent:function triggerEvent(eventName,args){if(this._cbs[eventName]){var callbacks=this._cbs[eventName];
for(var i=0;
i<callbacks.length;
i+=1){callbacks[i](args)
}}},addEventListener:function addEventListener(eventName,callback){if(!this._cbs[eventName]){this._cbs[eventName]=[]
}this._cbs[eventName].push(callback);
return function(){this.removeEventListener(eventName,callback)
}.bind(this)
},removeEventListener:function removeEventListener(eventName,callback){if(!callback){this._cbs[eventName]=null
}else{if(this._cbs[eventName]){var i=0;
var len=this._cbs[eventName].length;
while(i<len){if(this._cbs[eventName][i]===callback){this._cbs[eventName].splice(i,1);
i-=1;
len-=1
}i+=1
}if(!this._cbs[eventName].length){this._cbs[eventName]=null
}}}}};
var markerParser=function(){function parsePayloadLines(payload){var lines=payload.split("\r\n");
var keys={};
var line;
var keysCount=0;
for(var i=0;
i<lines.length;
i+=1){line=lines[i].split(":");
if(line.length===2){keys[line[0]]=line[1].trim();
keysCount+=1
}}if(keysCount===0){throw new Error()
}return keys
}return function(_markers){var markers=[];
for(var i=0;
i<_markers.length;
i+=1){var _marker=_markers[i];
var markerData={time:_marker.tm,duration:_marker.dr};
try{markerData.payload=JSON.parse(_markers[i].cm)
}catch(_){try{markerData.payload=parsePayloadLines(_markers[i].cm)
}catch(__){markerData.payload={name:_markers[i].cm}
}}markers.push(markerData)
}return markers
}
}();
var ProjectInterface=function(){function registerComposition(comp){this.compositions.push(comp)
}return function(){function _thisProjectFunction(name){var i=0;
var len=this.compositions.length;
while(i<len){if(this.compositions[i].data&&this.compositions[i].data.nm===name){if(this.compositions[i].prepareFrame&&this.compositions[i].data.xt){this.compositions[i].prepareFrame(this.currentFrame)
}return this.compositions[i].compInterface
}i+=1
}return null
}_thisProjectFunction.compositions=[];
_thisProjectFunction.currentFrame=0;
_thisProjectFunction.registerComposition=registerComposition;
return _thisProjectFunction
}
}();
var renderers={};
var registerRenderer=function registerRenderer(key,value){renderers[key]=value
};
function getRenderer(key){return renderers[key]
}function getRegisteredRenderer(){if(renderers.canvas){return"canvas"
}for(var key in renderers){if(renderers[key]){return key
}}return""
}function _typeof$4(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof$4=function _typeof(obj){return typeof obj
}
}else{_typeof$4=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj
}
}return _typeof$4(obj)
}var AnimationItem=function AnimationItem(){this._cbs=[];
this.name="";
this.path="";
this.isLoaded=false;
this.currentFrame=0;
this.currentRawFrame=0;
this.firstFrame=0;
this.totalFrames=0;
this.frameRate=0;
this.frameMult=0;
this.playSpeed=1;
this.playDirection=1;
this.playCount=0;
this.animationData={};
this.assets=[];
this.isPaused=true;
this.autoplay=false;
this.loop=true;
this.renderer=null;
this.animationID=createElementID();
this.assetsPath="";
this.timeCompleted=0;
this.segmentPos=0;
this.isSubframeEnabled=getSubframeEnabled();
this.segments=[];
this._idle=true;
this._completedLoop=false;
this.projectInterface=ProjectInterface();
this.imagePreloader=new ImagePreloader();
this.audioController=audioControllerFactory();
this.markers=[];
this.configAnimation=this.configAnimation.bind(this);
this.onSetupError=this.onSetupError.bind(this);
this.onSegmentComplete=this.onSegmentComplete.bind(this);
this.drawnFrameEvent=new BMEnterFrameEvent("drawnFrame",0,0,0)
};
extendPrototype([BaseEvent],AnimationItem);
AnimationItem.prototype.setParams=function(params){if(params.wrapper||params.container){this.wrapper=params.wrapper||params.container
}var animType="svg";
if(params.animType){animType=params.animType
}else{if(params.renderer){animType=params.renderer
}}var RendererClass=getRenderer(animType);
this.renderer=new RendererClass(this,params.rendererSettings);
this.imagePreloader.setCacheType(animType,this.renderer.globalData.defs);
this.renderer.setProjectInterface(this.projectInterface);
this.animType=animType;
if(params.loop===""||params.loop===null||params.loop===undefined||params.loop===true){this.loop=true
}else{if(params.loop===false){this.loop=false
}else{this.loop=parseInt(params.loop,10)
}}this.autoplay="autoplay" in params?params.autoplay:true;
this.name=params.name?params.name:"";
this.autoloadSegments=Object.prototype.hasOwnProperty.call(params,"autoloadSegments")?params.autoloadSegments:true;
this.assetsPath=params.assetsPath;
this.initialSegment=params.initialSegment;
if(params.audioFactory){this.audioController.setAudioFactory(params.audioFactory)
}if(params.animationData){this.setupAnimation(params.animationData)
}else{if(params.path){if(params.path.lastIndexOf("\\")!==-1){this.path=params.path.substr(0,params.path.lastIndexOf("\\")+1)
}else{this.path=params.path.substr(0,params.path.lastIndexOf("/")+1)
}this.fileName=params.path.substr(params.path.lastIndexOf("/")+1);
this.fileName=this.fileName.substr(0,this.fileName.lastIndexOf(".json"));
dataManager.loadAnimation(params.path,this.configAnimation,this.onSetupError)
}}};
AnimationItem.prototype.onSetupError=function(){this.trigger("data_failed")
};
AnimationItem.prototype.setupAnimation=function(data){dataManager.completeAnimation(data,this.configAnimation)
};
AnimationItem.prototype.setData=function(wrapper,animationData){if(animationData){if(_typeof$4(animationData)!=="object"){animationData=JSON.parse(animationData)
}}var params={wrapper:wrapper,animationData:animationData};
var wrapperAttributes=wrapper.attributes;
params.path=wrapperAttributes.getNamedItem("data-animation-path")?wrapperAttributes.getNamedItem("data-animation-path").value:wrapperAttributes.getNamedItem("data-bm-path")?wrapperAttributes.getNamedItem("data-bm-path").value:wrapperAttributes.getNamedItem("bm-path")?wrapperAttributes.getNamedItem("bm-path").value:"";
params.animType=wrapperAttributes.getNamedItem("data-anim-type")?wrapperAttributes.getNamedItem("data-anim-type").value:wrapperAttributes.getNamedItem("data-bm-type")?wrapperAttributes.getNamedItem("data-bm-type").value:wrapperAttributes.getNamedItem("bm-type")?wrapperAttributes.getNamedItem("bm-type").value:wrapperAttributes.getNamedItem("data-bm-renderer")?wrapperAttributes.getNamedItem("data-bm-renderer").value:wrapperAttributes.getNamedItem("bm-renderer")?wrapperAttributes.getNamedItem("bm-renderer").value:getRegisteredRenderer()||"canvas";
var loop=wrapperAttributes.getNamedItem("data-anim-loop")?wrapperAttributes.getNamedItem("data-anim-loop").value:wrapperAttributes.getNamedItem("data-bm-loop")?wrapperAttributes.getNamedItem("data-bm-loop").value:wrapperAttributes.getNamedItem("bm-loop")?wrapperAttributes.getNamedItem("bm-loop").value:"";
if(loop==="false"){params.loop=false
}else{if(loop==="true"){params.loop=true
}else{if(loop!==""){params.loop=parseInt(loop,10)
}}}var autoplay=wrapperAttributes.getNamedItem("data-anim-autoplay")?wrapperAttributes.getNamedItem("data-anim-autoplay").value:wrapperAttributes.getNamedItem("data-bm-autoplay")?wrapperAttributes.getNamedItem("data-bm-autoplay").value:wrapperAttributes.getNamedItem("bm-autoplay")?wrapperAttributes.getNamedItem("bm-autoplay").value:true;
params.autoplay=autoplay!=="false";
params.name=wrapperAttributes.getNamedItem("data-name")?wrapperAttributes.getNamedItem("data-name").value:wrapperAttributes.getNamedItem("data-bm-name")?wrapperAttributes.getNamedItem("data-bm-name").value:wrapperAttributes.getNamedItem("bm-name")?wrapperAttributes.getNamedItem("bm-name").value:"";
var prerender=wrapperAttributes.getNamedItem("data-anim-prerender")?wrapperAttributes.getNamedItem("data-anim-prerender").value:wrapperAttributes.getNamedItem("data-bm-prerender")?wrapperAttributes.getNamedItem("data-bm-prerender").value:wrapperAttributes.getNamedItem("bm-prerender")?wrapperAttributes.getNamedItem("bm-prerender").value:"";
if(prerender==="false"){params.prerender=false
}if(!params.path){this.trigger("destroy")
}else{this.setParams(params)
}};
AnimationItem.prototype.includeLayers=function(data){if(data.op>this.animationData.op){this.animationData.op=data.op;
this.totalFrames=Math.floor(data.op-this.animationData.ip)
}var layers=this.animationData.layers;
var i;
var len=layers.length;
var newLayers=data.layers;
var j;
var jLen=newLayers.length;
for(j=0;
j<jLen;
j+=1){i=0;
while(i<len){if(layers[i].id===newLayers[j].id){layers[i]=newLayers[j];
break
}i+=1
}}if(data.chars||data.fonts){this.renderer.globalData.fontManager.addChars(data.chars);
this.renderer.globalData.fontManager.addFonts(data.fonts,this.renderer.globalData.defs)
}if(data.assets){len=data.assets.length;
for(i=0;
i<len;
i+=1){this.animationData.assets.push(data.assets[i])
}}this.animationData.__complete=false;
dataManager.completeAnimation(this.animationData,this.onSegmentComplete)
};
AnimationItem.prototype.onSegmentComplete=function(data){this.animationData=data;
var expressionsPlugin=getExpressionsPlugin();
if(expressionsPlugin){expressionsPlugin.initExpressions(this)
}this.loadNextSegment()
};
AnimationItem.prototype.loadNextSegment=function(){var segments=this.animationData.segments;
if(!segments||segments.length===0||!this.autoloadSegments){this.trigger("data_ready");
this.timeCompleted=this.totalFrames;
return
}var segment=segments.shift();
this.timeCompleted=segment.time*this.frameRate;
var segmentPath=this.path+this.fileName+"_"+this.segmentPos+".json";
this.segmentPos+=1;
dataManager.loadData(segmentPath,this.includeLayers.bind(this),function(){this.trigger("data_failed")
}.bind(this))
};
AnimationItem.prototype.loadSegments=function(){var segments=this.animationData.segments;
if(!segments){this.timeCompleted=this.totalFrames
}this.loadNextSegment()
};
AnimationItem.prototype.imagesLoaded=function(){this.trigger("loaded_images");
this.checkLoaded()
};
AnimationItem.prototype.preloadImages=function(){this.imagePreloader.setAssetsPath(this.assetsPath);
this.imagePreloader.setPath(this.path);
this.imagePreloader.loadAssets(this.animationData.assets,this.imagesLoaded.bind(this))
};
AnimationItem.prototype.configAnimation=function(animData){if(!this.renderer){return
}try{this.animationData=animData;
if(this.initialSegment){this.totalFrames=Math.floor(this.initialSegment[1]-this.initialSegment[0]);
this.firstFrame=Math.round(this.initialSegment[0])
}else{this.totalFrames=Math.floor(this.animationData.op-this.animationData.ip);
this.firstFrame=Math.round(this.animationData.ip)
}this.renderer.configAnimation(animData);
if(!animData.assets){animData.assets=[]
}this.assets=this.animationData.assets;
this.frameRate=this.animationData.fr;
this.frameMult=this.animationData.fr/1000;
this.renderer.searchExtraCompositions(animData.assets);
this.markers=markerParser(animData.markers||[]);
this.trigger("config_ready");
this.preloadImages();
this.loadSegments();
this.updaFrameModifier();
this.waitForFontsLoaded();
if(this.isPaused){this.audioController.pause()
}}catch(error){this.triggerConfigError(error)
}};
AnimationItem.prototype.waitForFontsLoaded=function(){if(!this.renderer){return
}if(this.renderer.globalData.fontManager.isLoaded){this.checkLoaded()
}else{setTimeout(this.waitForFontsLoaded.bind(this),20)
}};
AnimationItem.prototype.checkLoaded=function(){if(!this.isLoaded&&this.renderer.globalData.fontManager.isLoaded&&(this.imagePreloader.loadedImages()||this.renderer.rendererType!=="canvas")&&this.imagePreloader.loadedFootages()){this.isLoaded=true;
var expressionsPlugin=getExpressionsPlugin();
if(expressionsPlugin){expressionsPlugin.initExpressions(this)
}this.renderer.initItems();
setTimeout(function(){this.trigger("DOMLoaded")
}.bind(this),0);
this.gotoFrame();
if(this.autoplay){this.play()
}}};
AnimationItem.prototype.resize=function(width,height){var _width=typeof width==="number"?width:undefined;
var _height=typeof height==="number"?height:undefined;
this.renderer.updateContainerSize(_width,_height)
};
AnimationItem.prototype.setSubframe=function(flag){this.isSubframeEnabled=!!flag
};
AnimationItem.prototype.gotoFrame=function(){this.currentFrame=this.isSubframeEnabled?this.currentRawFrame:~~this.currentRawFrame;
if(this.timeCompleted!==this.totalFrames&&this.currentFrame>this.timeCompleted){this.currentFrame=this.timeCompleted
}this.trigger("enterFrame");
this.renderFrame();
this.trigger("drawnFrame")
};
AnimationItem.prototype.renderFrame=function(){if(this.isLoaded===false||!this.renderer){return
}try{this.renderer.renderFrame(this.currentFrame+this.firstFrame)
}catch(error){this.triggerRenderFrameError(error)
}};
AnimationItem.prototype.play=function(name){if(name&&this.name!==name){return
}if(this.isPaused===true){this.isPaused=false;
this.trigger("_pause");
this.audioController.resume();
if(this._idle){this._idle=false;
this.trigger("_active")
}}};
AnimationItem.prototype.pause=function(name){if(name&&this.name!==name){return
}if(this.isPaused===false){this.isPaused=true;
this.trigger("_play");
this._idle=true;
this.trigger("_idle");
this.audioController.pause()
}};
AnimationItem.prototype.togglePause=function(name){if(name&&this.name!==name){return
}if(this.isPaused===true){this.play()
}else{this.pause()
}};
AnimationItem.prototype.stop=function(name){if(name&&this.name!==name){return
}this.pause();
this.playCount=0;
this._completedLoop=false;
this.setCurrentRawFrameValue(0)
};
AnimationItem.prototype.getMarkerData=function(markerName){var marker;
for(var i=0;
i<this.markers.length;
i+=1){marker=this.markers[i];
if(marker.payload&&marker.payload.name===markerName){return marker
}}return null
};
AnimationItem.prototype.goToAndStop=function(value,isFrame,name){if(name&&this.name!==name){return
}var numValue=Number(value);
if(isNaN(numValue)){var marker=this.getMarkerData(value);
if(marker){this.goToAndStop(marker.time,true)
}}else{if(isFrame){this.setCurrentRawFrameValue(value)
}else{this.setCurrentRawFrameValue(value*this.frameModifier)
}}this.pause()
};
AnimationItem.prototype.goToAndPlay=function(value,isFrame,name){if(name&&this.name!==name){return
}var numValue=Number(value);
if(isNaN(numValue)){var marker=this.getMarkerData(value);
if(marker){if(!marker.duration){this.goToAndStop(marker.time,true)
}else{this.playSegments([marker.time,marker.time+marker.duration],true)
}}}else{this.goToAndStop(numValue,isFrame,name)
}this.play()
};
AnimationItem.prototype.advanceTime=function(value){if(this.isPaused===true||this.isLoaded===false){return
}var nextValue=this.currentRawFrame+value*this.frameModifier;
var _isComplete=false;
if(nextValue>=this.totalFrames-1&&this.frameModifier>0){if(!this.loop||this.playCount===this.loop){if(!this.checkSegments(nextValue>this.totalFrames?nextValue%this.totalFrames:0)){_isComplete=true;
nextValue=this.totalFrames-1
}}else{if(nextValue>=this.totalFrames){this.playCount+=1;
if(!this.checkSegments(nextValue%this.totalFrames)){this.setCurrentRawFrameValue(nextValue%this.totalFrames);
this._completedLoop=true;
this.trigger("loopComplete")
}}else{this.setCurrentRawFrameValue(nextValue)
}}}else{if(nextValue<0){if(!this.checkSegments(nextValue%this.totalFrames)){if(this.loop&&!(this.playCount--<=0&&this.loop!==true)){this.setCurrentRawFrameValue(this.totalFrames+nextValue%this.totalFrames);
if(!this._completedLoop){this._completedLoop=true
}else{this.trigger("loopComplete")
}}else{_isComplete=true;
nextValue=0
}}}else{this.setCurrentRawFrameValue(nextValue)
}}if(_isComplete){this.setCurrentRawFrameValue(nextValue);
this.pause();
this.trigger("complete")
}};
AnimationItem.prototype.adjustSegment=function(arr,offset){this.playCount=0;
if(arr[1]<arr[0]){if(this.frameModifier>0){if(this.playSpeed<0){this.setSpeed(-this.playSpeed)
}else{this.setDirection(-1)
}}this.totalFrames=arr[0]-arr[1];
this.timeCompleted=this.totalFrames;
this.firstFrame=arr[1];
this.setCurrentRawFrameValue(this.totalFrames-0.001-offset)
}else{if(arr[1]>arr[0]){if(this.frameModifier<0){if(this.playSpeed<0){this.setSpeed(-this.playSpeed)
}else{this.setDirection(1)
}}this.totalFrames=arr[1]-arr[0];
this.timeCompleted=this.totalFrames;
this.firstFrame=arr[0];
this.setCurrentRawFrameValue(0.001+offset)
}}this.trigger("segmentStart")
};
AnimationItem.prototype.setSegment=function(init,end){var pendingFrame=-1;
if(this.isPaused){if(this.currentRawFrame+this.firstFrame<init){pendingFrame=init
}else{if(this.currentRawFrame+this.firstFrame>end){pendingFrame=end-init
}}}this.firstFrame=init;
this.totalFrames=end-init;
this.timeCompleted=this.totalFrames;
if(pendingFrame!==-1){this.goToAndStop(pendingFrame,true)
}};
AnimationItem.prototype.playSegments=function(arr,forceFlag){if(forceFlag){this.segments.length=0
}if(_typeof$4(arr[0])==="object"){var i;
var len=arr.length;
for(i=0;
i<len;
i+=1){this.segments.push(arr[i])
}}else{this.segments.push(arr)
}if(this.segments.length&&forceFlag){this.adjustSegment(this.segments.shift(),0)
}if(this.isPaused){this.play()
}};
AnimationItem.prototype.resetSegments=function(forceFlag){this.segments.length=0;
this.segments.push([this.animationData.ip,this.animationData.op]);
if(forceFlag){this.checkSegments(0)
}};
AnimationItem.prototype.checkSegments=function(offset){if(this.segments.length){this.adjustSegment(this.segments.shift(),offset);
return true
}return false
};
AnimationItem.prototype.destroy=function(name){if(name&&this.name!==name||!this.renderer){return
}this.renderer.destroy();
this.imagePreloader.destroy();
this.trigger("destroy");
this._cbs=null;
this.onEnterFrame=null;
this.onLoopComplete=null;
this.onComplete=null;
this.onSegmentStart=null;
this.onDestroy=null;
this.renderer=null;
this.renderer=null;
this.imagePreloader=null;
this.projectInterface=null
};
AnimationItem.prototype.setCurrentRawFrameValue=function(value){this.currentRawFrame=value;
this.gotoFrame()
};
AnimationItem.prototype.setSpeed=function(val){this.playSpeed=val;
this.updaFrameModifier()
};
AnimationItem.prototype.setDirection=function(val){this.playDirection=val<0?-1:1;
this.updaFrameModifier()
};
AnimationItem.prototype.setLoop=function(isLooping){this.loop=isLooping
};
AnimationItem.prototype.setVolume=function(val,name){if(name&&this.name!==name){return
}this.audioController.setVolume(val)
};
AnimationItem.prototype.getVolume=function(){return this.audioController.getVolume()
};
AnimationItem.prototype.mute=function(name){if(name&&this.name!==name){return
}this.audioController.mute()
};
AnimationItem.prototype.unmute=function(name){if(name&&this.name!==name){return
}this.audioController.unmute()
};
AnimationItem.prototype.updaFrameModifier=function(){this.frameModifier=this.frameMult*this.playSpeed*this.playDirection;
this.audioController.setRate(this.playSpeed*this.playDirection)
};
AnimationItem.prototype.getPath=function(){return this.path
};
AnimationItem.prototype.getAssetsPath=function(assetData){var path="";
if(assetData.e){path=assetData.p
}else{if(this.assetsPath){var imagePath=assetData.p;
if(imagePath.indexOf("images/")!==-1){imagePath=imagePath.split("/")[1]
}path=this.assetsPath+imagePath
}else{path=this.path;
path+=assetData.u?assetData.u:"";
path+=assetData.p
}}return path
};
AnimationItem.prototype.getAssetData=function(id){var i=0;
var len=this.assets.length;
while(i<len){if(id===this.assets[i].id){return this.assets[i]
}i+=1
}return null
};
AnimationItem.prototype.hide=function(){this.renderer.hide()
};
AnimationItem.prototype.show=function(){this.renderer.show()
};
AnimationItem.prototype.getDuration=function(isFrame){return isFrame?this.totalFrames:this.totalFrames/this.frameRate
};
AnimationItem.prototype.updateDocumentData=function(path,documentData,index){try{var element=this.renderer.getElementByPath(path);
element.updateDocumentData(documentData,index)
}catch(error){}};
AnimationItem.prototype.trigger=function(name){if(this._cbs&&this._cbs[name]){switch(name){case"enterFrame":this.triggerEvent(name,new BMEnterFrameEvent(name,this.currentFrame,this.totalFrames,this.frameModifier));
break;
case"drawnFrame":this.drawnFrameEvent.currentTime=this.currentFrame;
this.drawnFrameEvent.totalTime=this.totalFrames;
this.drawnFrameEvent.direction=this.frameModifier;
this.triggerEvent(name,this.drawnFrameEvent);
break;
case"loopComplete":this.triggerEvent(name,new BMCompleteLoopEvent(name,this.loop,this.playCount,this.frameMult));
break;
case"complete":this.triggerEvent(name,new BMCompleteEvent(name,this.frameMult));
break;
case"segmentStart":this.triggerEvent(name,new BMSegmentStartEvent(name,this.firstFrame,this.totalFrames));
break;
case"destroy":this.triggerEvent(name,new BMDestroyEvent(name,this));
break;
default:this.triggerEvent(name)
}}if(name==="enterFrame"&&this.onEnterFrame){this.onEnterFrame.call(this,new BMEnterFrameEvent(name,this.currentFrame,this.totalFrames,this.frameMult))
}if(name==="loopComplete"&&this.onLoopComplete){this.onLoopComplete.call(this,new BMCompleteLoopEvent(name,this.loop,this.playCount,this.frameMult))
}if(name==="complete"&&this.onComplete){this.onComplete.call(this,new BMCompleteEvent(name,this.frameMult))
}if(name==="segmentStart"&&this.onSegmentStart){this.onSegmentStart.call(this,new BMSegmentStartEvent(name,this.firstFrame,this.totalFrames))
}if(name==="destroy"&&this.onDestroy){this.onDestroy.call(this,new BMDestroyEvent(name,this))
}};
AnimationItem.prototype.triggerRenderFrameError=function(nativeError){var error=new BMRenderFrameErrorEvent(nativeError,this.currentFrame);
this.triggerEvent("error",error);
if(this.onError){this.onError.call(this,error)
}};
AnimationItem.prototype.triggerConfigError=function(nativeError){var error=new BMConfigErrorEvent(nativeError,this.currentFrame);
this.triggerEvent("error",error);
if(this.onError){this.onError.call(this,error)
}};
var animationManager=function(){var moduleOb={};
var registeredAnimations=[];
var initTime=0;
var len=0;
var playingAnimationsNum=0;
var _stopped=true;
var _isFrozen=false;
function removeElement(ev){var i=0;
var animItem=ev.target;
while(i<len){if(registeredAnimations[i].animation===animItem){registeredAnimations.splice(i,1);
i-=1;
len-=1;
if(!animItem.isPaused){subtractPlayingCount()
}}i+=1
}}function registerAnimation(element,animationData){if(!element){return null
}var i=0;
while(i<len){if(registeredAnimations[i].elem===element&&registeredAnimations[i].elem!==null){return registeredAnimations[i].animation
}i+=1
}var animItem=new AnimationItem();
setupAnimation(animItem,element);
animItem.setData(element,animationData);
return animItem
}function getRegisteredAnimations(){var i;
var lenAnims=registeredAnimations.length;
var animations=[];
for(i=0;
i<lenAnims;
i+=1){animations.push(registeredAnimations[i].animation)
}return animations
}function addPlayingCount(){playingAnimationsNum+=1;
activate()
}function subtractPlayingCount(){playingAnimationsNum-=1
}function setupAnimation(animItem,element){animItem.addEventListener("destroy",removeElement);
animItem.addEventListener("_active",addPlayingCount);
animItem.addEventListener("_idle",subtractPlayingCount);
registeredAnimations.push({elem:element,animation:animItem});
len+=1
}function loadAnimation(params){var animItem=new AnimationItem();
setupAnimation(animItem,null);
animItem.setParams(params);
return animItem
}function setSpeed(val,animation){var i;
for(i=0;
i<len;
i+=1){registeredAnimations[i].animation.setSpeed(val,animation)
}}function setDirection(val,animation){var i;
for(i=0;
i<len;
i+=1){registeredAnimations[i].animation.setDirection(val,animation)
}}function play(animation){var i;
for(i=0;
i<len;
i+=1){registeredAnimations[i].animation.play(animation)
}}function resume(nowTime){var elapsedTime=nowTime-initTime;
var i;
for(i=0;
i<len;
i+=1){registeredAnimations[i].animation.advanceTime(elapsedTime)
}initTime=nowTime;
if(playingAnimationsNum&&!_isFrozen){window.requestAnimationFrame(resume)
}else{_stopped=true
}}function first(nowTime){initTime=nowTime;
window.requestAnimationFrame(resume)
}function pause(animation){var i;
for(i=0;
i<len;
i+=1){registeredAnimations[i].animation.pause(animation)
}}function goToAndStop(value,isFrame,animation){var i;
for(i=0;
i<len;
i+=1){registeredAnimations[i].animation.goToAndStop(value,isFrame,animation)
}}function stop(animation){var i;
for(i=0;
i<len;
i+=1){registeredAnimations[i].animation.stop(animation)
}}function togglePause(animation){var i;
for(i=0;
i<len;
i+=1){registeredAnimations[i].animation.togglePause(animation)
}}function destroy(animation){var i;
for(i=len-1;
i>=0;
i-=1){registeredAnimations[i].animation.destroy(animation)
}}function searchAnimations(animationData,standalone,renderer){var animElements=[].concat([].slice.call(document.getElementsByClassName("lottie")),[].slice.call(document.getElementsByClassName("bodymovin")));
var i;
var lenAnims=animElements.length;
for(i=0;
i<lenAnims;
i+=1){if(renderer){animElements[i].setAttribute("data-bm-type",renderer)
}registerAnimation(animElements[i],animationData)
}if(standalone&&lenAnims===0){if(!renderer){renderer="svg"
}var body=document.getElementsByTagName("body")[0];
body.innerText="";
var div=createTag("div");
div.style.width="100%";
div.style.height="100%";
div.setAttribute("data-bm-type",renderer);
body.appendChild(div);
registerAnimation(div,animationData)
}}function resize(){var i;
for(i=0;
i<len;
i+=1){registeredAnimations[i].animation.resize()
}}function activate(){if(!_isFrozen&&playingAnimationsNum){if(_stopped){window.requestAnimationFrame(first);
_stopped=false
}}}function freeze(){_isFrozen=true
}function unfreeze(){_isFrozen=false;
activate()
}function setVolume(val,animation){var i;
for(i=0;
i<len;
i+=1){registeredAnimations[i].animation.setVolume(val,animation)
}}function mute(animation){var i;
for(i=0;
i<len;
i+=1){registeredAnimations[i].animation.mute(animation)
}}function unmute(animation){var i;
for(i=0;
i<len;
i+=1){registeredAnimations[i].animation.unmute(animation)
}}moduleOb.registerAnimation=registerAnimation;
moduleOb.loadAnimation=loadAnimation;
moduleOb.setSpeed=setSpeed;
moduleOb.setDirection=setDirection;
moduleOb.play=play;
moduleOb.pause=pause;
moduleOb.stop=stop;
moduleOb.togglePause=togglePause;
moduleOb.searchAnimations=searchAnimations;
moduleOb.resize=resize;
moduleOb.goToAndStop=goToAndStop;
moduleOb.destroy=destroy;
moduleOb.freeze=freeze;
moduleOb.unfreeze=unfreeze;
moduleOb.setVolume=setVolume;
moduleOb.mute=mute;
moduleOb.unmute=unmute;
moduleOb.getRegisteredAnimations=getRegisteredAnimations;
return moduleOb
}();
var BezierFactory=function(){var ob={};
ob.getBezierEasing=getBezierEasing;
var beziers={};
function getBezierEasing(a,b,c,d,nm){var str=nm||("bez_"+a+"_"+b+"_"+c+"_"+d).replace(/\./g,"p");
if(beziers[str]){return beziers[str]
}var bezEasing=new BezierEasing([a,b,c,d]);
beziers[str]=bezEasing;
return bezEasing
}var NEWTON_ITERATIONS=4;
var NEWTON_MIN_SLOPE=0.001;
var SUBDIVISION_PRECISION=1e-7;
var SUBDIVISION_MAX_ITERATIONS=10;
var kSplineTableSize=11;
var kSampleStepSize=1/(kSplineTableSize-1);
var float32ArraySupported=typeof Float32Array==="function";
function A(aA1,aA2){return 1-3*aA2+3*aA1
}function B(aA1,aA2){return 3*aA2-6*aA1
}function C(aA1){return 3*aA1
}function calcBezier(aT,aA1,aA2){return((A(aA1,aA2)*aT+B(aA1,aA2))*aT+C(aA1))*aT
}function getSlope(aT,aA1,aA2){return 3*A(aA1,aA2)*aT*aT+2*B(aA1,aA2)*aT+C(aA1)
}function binarySubdivide(aX,aA,aB,mX1,mX2){var currentX,currentT,i=0;
do{currentT=aA+(aB-aA)/2;
currentX=calcBezier(currentT,mX1,mX2)-aX;
if(currentX>0){aB=currentT
}else{aA=currentT
}}while(Math.abs(currentX)>SUBDIVISION_PRECISION&&++i<SUBDIVISION_MAX_ITERATIONS);
return currentT
}function newtonRaphsonIterate(aX,aGuessT,mX1,mX2){for(var i=0;
i<NEWTON_ITERATIONS;
++i){var currentSlope=getSlope(aGuessT,mX1,mX2);
if(currentSlope===0){return aGuessT
}var currentX=calcBezier(aGuessT,mX1,mX2)-aX;
aGuessT-=currentX/currentSlope
}return aGuessT
}function BezierEasing(points){this._p=points;
this._mSampleValues=float32ArraySupported?new Float32Array(kSplineTableSize):new Array(kSplineTableSize);
this._precomputed=false;
this.get=this.get.bind(this)
}BezierEasing.prototype={get:function get(x){var mX1=this._p[0],mY1=this._p[1],mX2=this._p[2],mY2=this._p[3];
if(!this._precomputed){this._precompute()
}if(mX1===mY1&&mX2===mY2){return x
}if(x===0){return 0
}if(x===1){return 1
}return calcBezier(this._getTForX(x),mY1,mY2)
},_precompute:function _precompute(){var mX1=this._p[0],mY1=this._p[1],mX2=this._p[2],mY2=this._p[3];
this._precomputed=true;
if(mX1!==mY1||mX2!==mY2){this._calcSampleValues()
}},_calcSampleValues:function _calcSampleValues(){var mX1=this._p[0],mX2=this._p[2];
for(var i=0;
i<kSplineTableSize;
++i){this._mSampleValues[i]=calcBezier(i*kSampleStepSize,mX1,mX2)
}},_getTForX:function _getTForX(aX){var mX1=this._p[0],mX2=this._p[2],mSampleValues=this._mSampleValues;
var intervalStart=0;
var currentSample=1;
var lastSample=kSplineTableSize-1;
for(;
currentSample!==lastSample&&mSampleValues[currentSample]<=aX;
++currentSample){intervalStart+=kSampleStepSize
}--currentSample;
var dist=(aX-mSampleValues[currentSample])/(mSampleValues[currentSample+1]-mSampleValues[currentSample]);
var guessForT=intervalStart+dist*kSampleStepSize;
var initialSlope=getSlope(guessForT,mX1,mX2);
if(initialSlope>=NEWTON_MIN_SLOPE){return newtonRaphsonIterate(aX,guessForT,mX1,mX2)
}if(initialSlope===0){return guessForT
}return binarySubdivide(aX,intervalStart,intervalStart+kSampleStepSize,mX1,mX2)
}};
return ob
}();
var pooling=function(){function _double(arr){return arr.concat(createSizedArray(arr.length))
}return{"double":_double}
}();
var poolFactory=function(){return function(initialLength,_create,_release){var _length=0;
var _maxLength=initialLength;
var pool=createSizedArray(_maxLength);
var ob={newElement:newElement,release:release};
function newElement(){var element;
if(_length){_length-=1;
element=pool[_length]
}else{element=_create()
}return element
}function release(element){if(_length===_maxLength){pool=pooling["double"](pool);
_maxLength*=2
}if(_release){_release(element)
}pool[_length]=element;
_length+=1
}return ob
}
}();
var bezierLengthPool=function(){function create(){return{addedLength:0,percents:createTypedArray("float32",getDefaultCurveSegments()),lengths:createTypedArray("float32",getDefaultCurveSegments())}
}return poolFactory(8,create)
}();
var segmentsLengthPool=function(){function create(){return{lengths:[],totalLength:0}
}function release(element){var i;
var len=element.lengths.length;
for(i=0;
i<len;
i+=1){bezierLengthPool.release(element.lengths[i])
}element.lengths.length=0
}return poolFactory(8,create,release)
}();
function bezFunction(){var math=Math;
function pointOnLine2D(x1,y1,x2,y2,x3,y3){var det1=x1*y2+y1*x3+x2*y3-x3*y2-y3*x1-x2*y1;
return det1>-0.001&&det1<0.001
}function pointOnLine3D(x1,y1,z1,x2,y2,z2,x3,y3,z3){if(z1===0&&z2===0&&z3===0){return pointOnLine2D(x1,y1,x2,y2,x3,y3)
}var dist1=math.sqrt(math.pow(x2-x1,2)+math.pow(y2-y1,2)+math.pow(z2-z1,2));
var dist2=math.sqrt(math.pow(x3-x1,2)+math.pow(y3-y1,2)+math.pow(z3-z1,2));
var dist3=math.sqrt(math.pow(x3-x2,2)+math.pow(y3-y2,2)+math.pow(z3-z2,2));
var diffDist;
if(dist1>dist2){if(dist1>dist3){diffDist=dist1-dist2-dist3
}else{diffDist=dist3-dist2-dist1
}}else{if(dist3>dist2){diffDist=dist3-dist2-dist1
}else{diffDist=dist2-dist1-dist3
}}return diffDist>-0.0001&&diffDist<0.0001
}var getBezierLength=function(){return function(pt1,pt2,pt3,pt4){var curveSegments=getDefaultCurveSegments();
var k;
var i;
var len;
var ptCoord;
var perc;
var addedLength=0;
var ptDistance;
var point=[];
var lastPoint=[];
var lengthData=bezierLengthPool.newElement();
len=pt3.length;
for(k=0;
k<curveSegments;
k+=1){perc=k/(curveSegments-1);
ptDistance=0;
for(i=0;
i<len;
i+=1){ptCoord=bmPow(1-perc,3)*pt1[i]+3*bmPow(1-perc,2)*perc*pt3[i]+3*(1-perc)*bmPow(perc,2)*pt4[i]+bmPow(perc,3)*pt2[i];
point[i]=ptCoord;
if(lastPoint[i]!==null){ptDistance+=bmPow(point[i]-lastPoint[i],2)
}lastPoint[i]=point[i]
}if(ptDistance){ptDistance=bmSqrt(ptDistance);
addedLength+=ptDistance
}lengthData.percents[k]=perc;
lengthData.lengths[k]=addedLength
}lengthData.addedLength=addedLength;
return lengthData
}
}();
function getSegmentsLength(shapeData){var segmentsLength=segmentsLengthPool.newElement();
var closed=shapeData.c;
var pathV=shapeData.v;
var pathO=shapeData.o;
var pathI=shapeData.i;
var i;
var len=shapeData._length;
var lengths=segmentsLength.lengths;
var totalLength=0;
for(i=0;
i<len-1;
i+=1){lengths[i]=getBezierLength(pathV[i],pathV[i+1],pathO[i],pathI[i+1]);
totalLength+=lengths[i].addedLength
}if(closed&&len){lengths[i]=getBezierLength(pathV[i],pathV[0],pathO[i],pathI[0]);
totalLength+=lengths[i].addedLength
}segmentsLength.totalLength=totalLength;
return segmentsLength
}function BezierData(length){this.segmentLength=0;
this.points=new Array(length)
}function PointData(partial,point){this.partialLength=partial;
this.point=point
}var buildBezierData=function(){var storedData={};
return function(pt1,pt2,pt3,pt4){var bezierName=(pt1[0]+"_"+pt1[1]+"_"+pt2[0]+"_"+pt2[1]+"_"+pt3[0]+"_"+pt3[1]+"_"+pt4[0]+"_"+pt4[1]).replace(/\./g,"p");
if(!storedData[bezierName]){var curveSegments=getDefaultCurveSegments();
var k;
var i;
var len;
var ptCoord;
var perc;
var addedLength=0;
var ptDistance;
var point;
var lastPoint=null;
if(pt1.length===2&&(pt1[0]!==pt2[0]||pt1[1]!==pt2[1])&&pointOnLine2D(pt1[0],pt1[1],pt2[0],pt2[1],pt1[0]+pt3[0],pt1[1]+pt3[1])&&pointOnLine2D(pt1[0],pt1[1],pt2[0],pt2[1],pt2[0]+pt4[0],pt2[1]+pt4[1])){curveSegments=2
}var bezierData=new BezierData(curveSegments);
len=pt3.length;
for(k=0;
k<curveSegments;
k+=1){point=createSizedArray(len);
perc=k/(curveSegments-1);
ptDistance=0;
for(i=0;
i<len;
i+=1){ptCoord=bmPow(1-perc,3)*pt1[i]+3*bmPow(1-perc,2)*perc*(pt1[i]+pt3[i])+3*(1-perc)*bmPow(perc,2)*(pt2[i]+pt4[i])+bmPow(perc,3)*pt2[i];
point[i]=ptCoord;
if(lastPoint!==null){ptDistance+=bmPow(point[i]-lastPoint[i],2)
}}ptDistance=bmSqrt(ptDistance);
addedLength+=ptDistance;
bezierData.points[k]=new PointData(ptDistance,point);
lastPoint=point
}bezierData.segmentLength=addedLength;
storedData[bezierName]=bezierData
}return storedData[bezierName]
}
}();
function getDistancePerc(perc,bezierData){var percents=bezierData.percents;
var lengths=bezierData.lengths;
var len=percents.length;
var initPos=bmFloor((len-1)*perc);
var lengthPos=perc*bezierData.addedLength;
var lPerc=0;
if(initPos===len-1||initPos===0||lengthPos===lengths[initPos]){return percents[initPos]
}var dir=lengths[initPos]>lengthPos?-1:1;
var flag=true;
while(flag){if(lengths[initPos]<=lengthPos&&lengths[initPos+1]>lengthPos){lPerc=(lengthPos-lengths[initPos])/(lengths[initPos+1]-lengths[initPos]);
flag=false
}else{initPos+=dir
}if(initPos<0||initPos>=len-1){if(initPos===len-1){return percents[initPos]
}flag=false
}}return percents[initPos]+(percents[initPos+1]-percents[initPos])*lPerc
}function getPointInSegment(pt1,pt2,pt3,pt4,percent,bezierData){var t1=getDistancePerc(percent,bezierData);
var u1=1-t1;
var ptX=math.round((u1*u1*u1*pt1[0]+(t1*u1*u1+u1*t1*u1+u1*u1*t1)*pt3[0]+(t1*t1*u1+u1*t1*t1+t1*u1*t1)*pt4[0]+t1*t1*t1*pt2[0])*1000)/1000;
var ptY=math.round((u1*u1*u1*pt1[1]+(t1*u1*u1+u1*t1*u1+u1*u1*t1)*pt3[1]+(t1*t1*u1+u1*t1*t1+t1*u1*t1)*pt4[1]+t1*t1*t1*pt2[1])*1000)/1000;
return[ptX,ptY]
}var bezierSegmentPoints=createTypedArray("float32",8);
function getNewSegment(pt1,pt2,pt3,pt4,startPerc,endPerc,bezierData){if(startPerc<0){startPerc=0
}else{if(startPerc>1){startPerc=1
}}var t0=getDistancePerc(startPerc,bezierData);
endPerc=endPerc>1?1:endPerc;
var t1=getDistancePerc(endPerc,bezierData);
var i;
var len=pt1.length;
var u0=1-t0;
var u1=1-t1;
var u0u0u0=u0*u0*u0;
var t0u0u0_3=t0*u0*u0*3;
var t0t0u0_3=t0*t0*u0*3;
var t0t0t0=t0*t0*t0;
var u0u0u1=u0*u0*u1;
var t0u0u1_3=t0*u0*u1+u0*t0*u1+u0*u0*t1;
var t0t0u1_3=t0*t0*u1+u0*t0*t1+t0*u0*t1;
var t0t0t1=t0*t0*t1;
var u0u1u1=u0*u1*u1;
var t0u1u1_3=t0*u1*u1+u0*t1*u1+u0*u1*t1;
var t0t1u1_3=t0*t1*u1+u0*t1*t1+t0*u1*t1;
var t0t1t1=t0*t1*t1;
var u1u1u1=u1*u1*u1;
var t1u1u1_3=t1*u1*u1+u1*t1*u1+u1*u1*t1;
var t1t1u1_3=t1*t1*u1+u1*t1*t1+t1*u1*t1;
var t1t1t1=t1*t1*t1;
for(i=0;
i<len;
i+=1){bezierSegmentPoints[i*4]=math.round((u0u0u0*pt1[i]+t0u0u0_3*pt3[i]+t0t0u0_3*pt4[i]+t0t0t0*pt2[i])*1000)/1000;
bezierSegmentPoints[i*4+1]=math.round((u0u0u1*pt1[i]+t0u0u1_3*pt3[i]+t0t0u1_3*pt4[i]+t0t0t1*pt2[i])*1000)/1000;
bezierSegmentPoints[i*4+2]=math.round((u0u1u1*pt1[i]+t0u1u1_3*pt3[i]+t0t1u1_3*pt4[i]+t0t1t1*pt2[i])*1000)/1000;
bezierSegmentPoints[i*4+3]=math.round((u1u1u1*pt1[i]+t1u1u1_3*pt3[i]+t1t1u1_3*pt4[i]+t1t1t1*pt2[i])*1000)/1000
}return bezierSegmentPoints
}return{getSegmentsLength:getSegmentsLength,getNewSegment:getNewSegment,getPointInSegment:getPointInSegment,buildBezierData:buildBezierData,pointOnLine2D:pointOnLine2D,pointOnLine3D:pointOnLine3D}
}var bez=bezFunction();
var initFrame=initialDefaultFrame;
var mathAbs=Math.abs;
function interpolateValue(frameNum,caching){var offsetTime=this.offsetTime;
var newValue;
if(this.propType==="multidimensional"){newValue=createTypedArray("float32",this.pv.length)
}var iterationIndex=caching.lastIndex;
var i=iterationIndex;
var len=this.keyframes.length-1;
var flag=true;
var keyData;
var nextKeyData;
var keyframeMetadata;
while(flag){keyData=this.keyframes[i];
nextKeyData=this.keyframes[i+1];
if(i===len-1&&frameNum>=nextKeyData.t-offsetTime){if(keyData.h){keyData=nextKeyData
}iterationIndex=0;
break
}if(nextKeyData.t-offsetTime>frameNum){iterationIndex=i;
break
}if(i<len-1){i+=1
}else{iterationIndex=0;
flag=false
}}keyframeMetadata=this.keyframesMetadata[i]||{};
var k;
var kLen;
var perc;
var jLen;
var j;
var fnc;
var nextKeyTime=nextKeyData.t-offsetTime;
var keyTime=keyData.t-offsetTime;
var endValue;
if(keyData.to){if(!keyframeMetadata.bezierData){keyframeMetadata.bezierData=bez.buildBezierData(keyData.s,nextKeyData.s||keyData.e,keyData.to,keyData.ti)
}var bezierData=keyframeMetadata.bezierData;
if(frameNum>=nextKeyTime||frameNum<keyTime){var ind=frameNum>=nextKeyTime?bezierData.points.length-1:0;
kLen=bezierData.points[ind].point.length;
for(k=0;
k<kLen;
k+=1){newValue[k]=bezierData.points[ind].point[k]
}}else{if(keyframeMetadata.__fnct){fnc=keyframeMetadata.__fnct
}else{fnc=BezierFactory.getBezierEasing(keyData.o.x,keyData.o.y,keyData.i.x,keyData.i.y,keyData.n).get;
keyframeMetadata.__fnct=fnc
}perc=fnc((frameNum-keyTime)/(nextKeyTime-keyTime));
var distanceInLine=bezierData.segmentLength*perc;
var segmentPerc;
var addedLength=caching.lastFrame<frameNum&&caching._lastKeyframeIndex===i?caching._lastAddedLength:0;
j=caching.lastFrame<frameNum&&caching._lastKeyframeIndex===i?caching._lastPoint:0;
flag=true;
jLen=bezierData.points.length;
while(flag){addedLength+=bezierData.points[j].partialLength;
if(distanceInLine===0||perc===0||j===bezierData.points.length-1){kLen=bezierData.points[j].point.length;
for(k=0;
k<kLen;
k+=1){newValue[k]=bezierData.points[j].point[k]
}break
}else{if(distanceInLine>=addedLength&&distanceInLine<addedLength+bezierData.points[j+1].partialLength){segmentPerc=(distanceInLine-addedLength)/bezierData.points[j+1].partialLength;
kLen=bezierData.points[j].point.length;
for(k=0;
k<kLen;
k+=1){newValue[k]=bezierData.points[j].point[k]+(bezierData.points[j+1].point[k]-bezierData.points[j].point[k])*segmentPerc
}break
}}if(j<jLen-1){j+=1
}else{flag=false
}}caching._lastPoint=j;
caching._lastAddedLength=addedLength-bezierData.points[j].partialLength;
caching._lastKeyframeIndex=i
}}else{var outX;
var outY;
var inX;
var inY;
var keyValue;
len=keyData.s.length;
endValue=nextKeyData.s||keyData.e;
if(this.sh&&keyData.h!==1){if(frameNum>=nextKeyTime){newValue[0]=endValue[0];
newValue[1]=endValue[1];
newValue[2]=endValue[2]
}else{if(frameNum<=keyTime){newValue[0]=keyData.s[0];
newValue[1]=keyData.s[1];
newValue[2]=keyData.s[2]
}else{var quatStart=createQuaternion(keyData.s);
var quatEnd=createQuaternion(endValue);
var time=(frameNum-keyTime)/(nextKeyTime-keyTime);
quaternionToEuler(newValue,slerp(quatStart,quatEnd,time))
}}}else{for(i=0;
i<len;
i+=1){if(keyData.h!==1){if(frameNum>=nextKeyTime){perc=1
}else{if(frameNum<keyTime){perc=0
}else{if(keyData.o.x.constructor===Array){if(!keyframeMetadata.__fnct){keyframeMetadata.__fnct=[]
}if(!keyframeMetadata.__fnct[i]){outX=keyData.o.x[i]===undefined?keyData.o.x[0]:keyData.o.x[i];
outY=keyData.o.y[i]===undefined?keyData.o.y[0]:keyData.o.y[i];
inX=keyData.i.x[i]===undefined?keyData.i.x[0]:keyData.i.x[i];
inY=keyData.i.y[i]===undefined?keyData.i.y[0]:keyData.i.y[i];
fnc=BezierFactory.getBezierEasing(outX,outY,inX,inY).get;
keyframeMetadata.__fnct[i]=fnc
}else{fnc=keyframeMetadata.__fnct[i]
}}else{if(!keyframeMetadata.__fnct){outX=keyData.o.x;
outY=keyData.o.y;
inX=keyData.i.x;
inY=keyData.i.y;
fnc=BezierFactory.getBezierEasing(outX,outY,inX,inY).get;
keyData.keyframeMetadata=fnc
}else{fnc=keyframeMetadata.__fnct
}}perc=fnc((frameNum-keyTime)/(nextKeyTime-keyTime))
}}}endValue=nextKeyData.s||keyData.e;
keyValue=keyData.h===1?keyData.s[i]:keyData.s[i]+(endValue[i]-keyData.s[i])*perc;
if(this.propType==="multidimensional"){newValue[i]=keyValue
}else{newValue=keyValue
}}}}caching.lastIndex=iterationIndex;
return newValue
}function slerp(a,b,t){var out=[];
var ax=a[0];
var ay=a[1];
var az=a[2];
var aw=a[3];
var bx=b[0];
var by=b[1];
var bz=b[2];
var bw=b[3];
var omega;
var cosom;
var sinom;
var scale0;
var scale1;
cosom=ax*bx+ay*by+az*bz+aw*bw;
if(cosom<0){cosom=-cosom;
bx=-bx;
by=-by;
bz=-bz;
bw=-bw
}if(1-cosom>0.000001){omega=Math.acos(cosom);
sinom=Math.sin(omega);
scale0=Math.sin((1-t)*omega)/sinom;
scale1=Math.sin(t*omega)/sinom
}else{scale0=1-t;
scale1=t
}out[0]=scale0*ax+scale1*bx;
out[1]=scale0*ay+scale1*by;
out[2]=scale0*az+scale1*bz;
out[3]=scale0*aw+scale1*bw;
return out
}function quaternionToEuler(out,quat){var qx=quat[0];
var qy=quat[1];
var qz=quat[2];
var qw=quat[3];
var heading=Math.atan2(2*qy*qw-2*qx*qz,1-2*qy*qy-2*qz*qz);
var attitude=Math.asin(2*qx*qy+2*qz*qw);
var bank=Math.atan2(2*qx*qw-2*qy*qz,1-2*qx*qx-2*qz*qz);
out[0]=heading/degToRads;
out[1]=attitude/degToRads;
out[2]=bank/degToRads
}function createQuaternion(values){var heading=values[0]*degToRads;
var attitude=values[1]*degToRads;
var bank=values[2]*degToRads;
var c1=Math.cos(heading/2);
var c2=Math.cos(attitude/2);
var c3=Math.cos(bank/2);
var s1=Math.sin(heading/2);
var s2=Math.sin(attitude/2);
var s3=Math.sin(bank/2);
var w=c1*c2*c3-s1*s2*s3;
var x=s1*s2*c3+c1*c2*s3;
var y=s1*c2*c3+c1*s2*s3;
var z=c1*s2*c3-s1*c2*s3;
return[x,y,z,w]
}function getValueAtCurrentTime(){var frameNum=this.comp.renderedFrame-this.offsetTime;
var initTime=this.keyframes[0].t-this.offsetTime;
var endTime=this.keyframes[this.keyframes.length-1].t-this.offsetTime;
if(!(frameNum===this._caching.lastFrame||this._caching.lastFrame!==initFrame&&(this._caching.lastFrame>=endTime&&frameNum>=endTime||this._caching.lastFrame<initTime&&frameNum<initTime))){if(this._caching.lastFrame>=frameNum){this._caching._lastKeyframeIndex=-1;
this._caching.lastIndex=0
}var renderResult=this.interpolateValue(frameNum,this._caching);
this.pv=renderResult
}this._caching.lastFrame=frameNum;
return this.pv
}function setVValue(val){var multipliedValue;
if(this.propType==="unidimensional"){multipliedValue=val*this.mult;
if(mathAbs(this.v-multipliedValue)>0.00001){this.v=multipliedValue;
this._mdf=true
}}else{var i=0;
var len=this.v.length;
while(i<len){multipliedValue=val[i]*this.mult;
if(mathAbs(this.v[i]-multipliedValue)>0.00001){this.v[i]=multipliedValue;
this._mdf=true
}i+=1
}}}function processEffectsSequence(){if(this.elem.globalData.frameId===this.frameId||!this.effectsSequence.length){return
}if(this.lock){this.setVValue(this.pv);
return
}this.lock=true;
this._mdf=this._isFirstFrame;
var i;
var len=this.effectsSequence.length;
var finalValue=this.kf?this.pv:this.data.k;
for(i=0;
i<len;
i+=1){finalValue=this.effectsSequence[i](finalValue)
}this.setVValue(finalValue);
this._isFirstFrame=false;
this.lock=false;
this.frameId=this.elem.globalData.frameId
}function addEffect(effectFunction){this.effectsSequence.push(effectFunction);
this.container.addDynamicProperty(this)
}function ValueProperty(elem,data,mult,container){this.propType="unidimensional";
this.mult=mult||1;
this.data=data;
this.v=mult?data.k*mult:data.k;
this.pv=data.k;
this._mdf=false;
this.elem=elem;
this.container=container;
this.comp=elem.comp;
this.k=false;
this.kf=false;
this.vel=0;
this.effectsSequence=[];
this._isFirstFrame=true;
this.getValue=processEffectsSequence;
this.setVValue=setVValue;
this.addEffect=addEffect
}function MultiDimensionalProperty(elem,data,mult,container){this.propType="multidimensional";
this.mult=mult||1;
this.data=data;
this._mdf=false;
this.elem=elem;
this.container=container;
this.comp=elem.comp;
this.k=false;
this.kf=false;
this.frameId=-1;
var i;
var len=data.k.length;
this.v=createTypedArray("float32",len);
this.pv=createTypedArray("float32",len);
this.vel=createTypedArray("float32",len);
for(i=0;
i<len;
i+=1){this.v[i]=data.k[i]*this.mult;
this.pv[i]=data.k[i]
}this._isFirstFrame=true;
this.effectsSequence=[];
this.getValue=processEffectsSequence;
this.setVValue=setVValue;
this.addEffect=addEffect
}function KeyframedValueProperty(elem,data,mult,container){this.propType="unidimensional";
this.keyframes=data.k;
this.keyframesMetadata=[];
this.offsetTime=elem.data.st;
this.frameId=-1;
this._caching={lastFrame:initFrame,lastIndex:0,value:0,_lastKeyframeIndex:-1};
this.k=true;
this.kf=true;
this.data=data;
this.mult=mult||1;
this.elem=elem;
this.container=container;
this.comp=elem.comp;
this.v=initFrame;
this.pv=initFrame;
this._isFirstFrame=true;
this.getValue=processEffectsSequence;
this.setVValue=setVValue;
this.interpolateValue=interpolateValue;
this.effectsSequence=[getValueAtCurrentTime.bind(this)];
this.addEffect=addEffect
}function KeyframedMultidimensionalProperty(elem,data,mult,container){this.propType="multidimensional";
var i;
var len=data.k.length;
var s;
var e;
var to;
var ti;
for(i=0;
i<len-1;
i+=1){if(data.k[i].to&&data.k[i].s&&data.k[i+1]&&data.k[i+1].s){s=data.k[i].s;
e=data.k[i+1].s;
to=data.k[i].to;
ti=data.k[i].ti;
if(s.length===2&&!(s[0]===e[0]&&s[1]===e[1])&&bez.pointOnLine2D(s[0],s[1],e[0],e[1],s[0]+to[0],s[1]+to[1])&&bez.pointOnLine2D(s[0],s[1],e[0],e[1],e[0]+ti[0],e[1]+ti[1])||s.length===3&&!(s[0]===e[0]&&s[1]===e[1]&&s[2]===e[2])&&bez.pointOnLine3D(s[0],s[1],s[2],e[0],e[1],e[2],s[0]+to[0],s[1]+to[1],s[2]+to[2])&&bez.pointOnLine3D(s[0],s[1],s[2],e[0],e[1],e[2],e[0]+ti[0],e[1]+ti[1],e[2]+ti[2])){data.k[i].to=null;
data.k[i].ti=null
}if(s[0]===e[0]&&s[1]===e[1]&&to[0]===0&&to[1]===0&&ti[0]===0&&ti[1]===0){if(s.length===2||s[2]===e[2]&&to[2]===0&&ti[2]===0){data.k[i].to=null;
data.k[i].ti=null
}}}}this.effectsSequence=[getValueAtCurrentTime.bind(this)];
this.data=data;
this.keyframes=data.k;
this.keyframesMetadata=[];
this.offsetTime=elem.data.st;
this.k=true;
this.kf=true;
this._isFirstFrame=true;
this.mult=mult||1;
this.elem=elem;
this.container=container;
this.comp=elem.comp;
this.getValue=processEffectsSequence;
this.setVValue=setVValue;
this.interpolateValue=interpolateValue;
this.frameId=-1;
var arrLen=data.k[0].s.length;
this.v=createTypedArray("float32",arrLen);
this.pv=createTypedArray("float32",arrLen);
for(i=0;
i<arrLen;
i+=1){this.v[i]=initFrame;
this.pv[i]=initFrame
}this._caching={lastFrame:initFrame,lastIndex:0,value:createTypedArray("float32",arrLen)};
this.addEffect=addEffect
}var PropertyFactory=function(){function getProp(elem,data,type,mult,container){if(data.sid){data=elem.globalData.slotManager.getProp(data)
}var p;
if(!data.k.length){p=new ValueProperty(elem,data,mult,container)
}else{if(typeof data.k[0]==="number"){p=new MultiDimensionalProperty(elem,data,mult,container)
}else{switch(type){case 0:p=new KeyframedValueProperty(elem,data,mult,container);
break;
case 1:p=new KeyframedMultidimensionalProperty(elem,data,mult,container);
break;
default:break
}}}if(p.effectsSequence.length){container.addDynamicProperty(p)
}return p
}var ob={getProp:getProp};
return ob
}();
function DynamicPropertyContainer(){}DynamicPropertyContainer.prototype={addDynamicProperty:function addDynamicProperty(prop){if(this.dynamicProperties.indexOf(prop)===-1){this.dynamicProperties.push(prop);
this.container.addDynamicProperty(this);
this._isAnimated=true
}},iterateDynamicProperties:function iterateDynamicProperties(){this._mdf=false;
var i;
var len=this.dynamicProperties.length;
for(i=0;
i<len;
i+=1){this.dynamicProperties[i].getValue();
if(this.dynamicProperties[i]._mdf){this._mdf=true
}}},initDynamicPropertyContainer:function initDynamicPropertyContainer(container){this.container=container;
this.dynamicProperties=[];
this._mdf=false;
this._isAnimated=false
}};
var pointPool=function(){function create(){return createTypedArray("float32",2)
}return poolFactory(8,create)
}();
function ShapePath(){this.c=false;
this._length=0;
this._maxLength=8;
this.v=createSizedArray(this._maxLength);
this.o=createSizedArray(this._maxLength);
this.i=createSizedArray(this._maxLength)
}ShapePath.prototype.setPathData=function(closed,len){this.c=closed;
this.setLength(len);
var i=0;
while(i<len){this.v[i]=pointPool.newElement();
this.o[i]=pointPool.newElement();
this.i[i]=pointPool.newElement();
i+=1
}};
ShapePath.prototype.setLength=function(len){while(this._maxLength<len){this.doubleArrayLength()
}this._length=len
};
ShapePath.prototype.doubleArrayLength=function(){this.v=this.v.concat(createSizedArray(this._maxLength));
this.i=this.i.concat(createSizedArray(this._maxLength));
this.o=this.o.concat(createSizedArray(this._maxLength));
this._maxLength*=2
};
ShapePath.prototype.setXYAt=function(x,y,type,pos,replace){var arr;
this._length=Math.max(this._length,pos+1);
if(this._length>=this._maxLength){this.doubleArrayLength()
}switch(type){case"v":arr=this.v;
break;
case"i":arr=this.i;
break;
case"o":arr=this.o;
break;
default:arr=[];
break
}if(!arr[pos]||arr[pos]&&!replace){arr[pos]=pointPool.newElement()
}arr[pos][0]=x;
arr[pos][1]=y
};
ShapePath.prototype.setTripleAt=function(vX,vY,oX,oY,iX,iY,pos,replace){this.setXYAt(vX,vY,"v",pos,replace);
this.setXYAt(oX,oY,"o",pos,replace);
this.setXYAt(iX,iY,"i",pos,replace)
};
ShapePath.prototype.reverse=function(){var newPath=new ShapePath();
newPath.setPathData(this.c,this._length);
var vertices=this.v;
var outPoints=this.o;
var inPoints=this.i;
var init=0;
if(this.c){newPath.setTripleAt(vertices[0][0],vertices[0][1],inPoints[0][0],inPoints[0][1],outPoints[0][0],outPoints[0][1],0,false);
init=1
}var cnt=this._length-1;
var len=this._length;
var i;
for(i=init;
i<len;
i+=1){newPath.setTripleAt(vertices[cnt][0],vertices[cnt][1],inPoints[cnt][0],inPoints[cnt][1],outPoints[cnt][0],outPoints[cnt][1],i,false);
cnt-=1
}return newPath
};
ShapePath.prototype.length=function(){return this._length
};
var shapePool=function(){function create(){return new ShapePath()
}function release(shapePath){var len=shapePath._length;
var i;
for(i=0;
i<len;
i+=1){pointPool.release(shapePath.v[i]);
pointPool.release(shapePath.i[i]);
pointPool.release(shapePath.o[i]);
shapePath.v[i]=null;
shapePath.i[i]=null;
shapePath.o[i]=null
}shapePath._length=0;
shapePath.c=false
}function clone(shape){var cloned=factory.newElement();
var i;
var len=shape._length===undefined?shape.v.length:shape._length;
cloned.setLength(len);
cloned.c=shape.c;
for(i=0;
i<len;
i+=1){cloned.setTripleAt(shape.v[i][0],shape.v[i][1],shape.o[i][0],shape.o[i][1],shape.i[i][0],shape.i[i][1],i)
}return cloned
}var factory=poolFactory(4,create,release);
factory.clone=clone;
return factory
}();
function ShapeCollection(){this._length=0;
this._maxLength=4;
this.shapes=createSizedArray(this._maxLength)
}ShapeCollection.prototype.addShape=function(shapeData){if(this._length===this._maxLength){this.shapes=this.shapes.concat(createSizedArray(this._maxLength));
this._maxLength*=2
}this.shapes[this._length]=shapeData;
this._length+=1
};
ShapeCollection.prototype.releaseShapes=function(){var i;
for(i=0;
i<this._length;
i+=1){shapePool.release(this.shapes[i])
}this._length=0
};
var shapeCollectionPool=function(){var ob={newShapeCollection:newShapeCollection,release:release};
var _length=0;
var _maxLength=4;
var pool=createSizedArray(_maxLength);
function newShapeCollection(){var shapeCollection;
if(_length){_length-=1;
shapeCollection=pool[_length]
}else{shapeCollection=new ShapeCollection()
}return shapeCollection
}function release(shapeCollection){var i;
var len=shapeCollection._length;
for(i=0;
i<len;
i+=1){shapePool.release(shapeCollection.shapes[i])
}shapeCollection._length=0;
if(_length===_maxLength){pool=pooling["double"](pool);
_maxLength*=2
}pool[_length]=shapeCollection;
_length+=1
}return ob
}();
var ShapePropertyFactory=function(){var initFrame=-999999;
function interpolateShape(frameNum,previousValue,caching){var iterationIndex=caching.lastIndex;
var keyPropS;
var keyPropE;
var isHold;
var j;
var k;
var jLen;
var kLen;
var perc;
var vertexValue;
var kf=this.keyframes;
if(frameNum<kf[0].t-this.offsetTime){keyPropS=kf[0].s[0];
isHold=true;
iterationIndex=0
}else{if(frameNum>=kf[kf.length-1].t-this.offsetTime){keyPropS=kf[kf.length-1].s?kf[kf.length-1].s[0]:kf[kf.length-2].e[0];
isHold=true
}else{var i=iterationIndex;
var len=kf.length-1;
var flag=true;
var keyData;
var nextKeyData;
var keyframeMetadata;
while(flag){keyData=kf[i];
nextKeyData=kf[i+1];
if(nextKeyData.t-this.offsetTime>frameNum){break
}if(i<len-1){i+=1
}else{flag=false
}}keyframeMetadata=this.keyframesMetadata[i]||{};
isHold=keyData.h===1;
iterationIndex=i;
if(!isHold){if(frameNum>=nextKeyData.t-this.offsetTime){perc=1
}else{if(frameNum<keyData.t-this.offsetTime){perc=0
}else{var fnc;
if(keyframeMetadata.__fnct){fnc=keyframeMetadata.__fnct
}else{fnc=BezierFactory.getBezierEasing(keyData.o.x,keyData.o.y,keyData.i.x,keyData.i.y).get;
keyframeMetadata.__fnct=fnc
}perc=fnc((frameNum-(keyData.t-this.offsetTime))/(nextKeyData.t-this.offsetTime-(keyData.t-this.offsetTime)))
}}keyPropE=nextKeyData.s?nextKeyData.s[0]:keyData.e[0]
}keyPropS=keyData.s[0]
}}jLen=previousValue._length;
kLen=keyPropS.i[0].length;
caching.lastIndex=iterationIndex;
for(j=0;
j<jLen;
j+=1){for(k=0;
k<kLen;
k+=1){vertexValue=isHold?keyPropS.i[j][k]:keyPropS.i[j][k]+(keyPropE.i[j][k]-keyPropS.i[j][k])*perc;
previousValue.i[j][k]=vertexValue;
vertexValue=isHold?keyPropS.o[j][k]:keyPropS.o[j][k]+(keyPropE.o[j][k]-keyPropS.o[j][k])*perc;
previousValue.o[j][k]=vertexValue;
vertexValue=isHold?keyPropS.v[j][k]:keyPropS.v[j][k]+(keyPropE.v[j][k]-keyPropS.v[j][k])*perc;
previousValue.v[j][k]=vertexValue
}}}function interpolateShapeCurrentTime(){var frameNum=this.comp.renderedFrame-this.offsetTime;
var initTime=this.keyframes[0].t-this.offsetTime;
var endTime=this.keyframes[this.keyframes.length-1].t-this.offsetTime;
var lastFrame=this._caching.lastFrame;
if(!(lastFrame!==initFrame&&(lastFrame<initTime&&frameNum<initTime||lastFrame>endTime&&frameNum>endTime))){this._caching.lastIndex=lastFrame<frameNum?this._caching.lastIndex:0;
this.interpolateShape(frameNum,this.pv,this._caching)
}this._caching.lastFrame=frameNum;
return this.pv
}function resetShape(){this.paths=this.localShapeCollection
}function shapesEqual(shape1,shape2){if(shape1._length!==shape2._length||shape1.c!==shape2.c){return false
}var i;
var len=shape1._length;
for(i=0;
i<len;
i+=1){if(shape1.v[i][0]!==shape2.v[i][0]||shape1.v[i][1]!==shape2.v[i][1]||shape1.o[i][0]!==shape2.o[i][0]||shape1.o[i][1]!==shape2.o[i][1]||shape1.i[i][0]!==shape2.i[i][0]||shape1.i[i][1]!==shape2.i[i][1]){return false
}}return true
}function setVValue(newPath){if(!shapesEqual(this.v,newPath)){this.v=shapePool.clone(newPath);
this.localShapeCollection.releaseShapes();
this.localShapeCollection.addShape(this.v);
this._mdf=true;
this.paths=this.localShapeCollection
}}function processEffectsSequence(){if(this.elem.globalData.frameId===this.frameId){return
}if(!this.effectsSequence.length){this._mdf=false;
return
}if(this.lock){this.setVValue(this.pv);
return
}this.lock=true;
this._mdf=false;
var finalValue;
if(this.kf){finalValue=this.pv
}else{if(this.data.ks){finalValue=this.data.ks.k
}else{finalValue=this.data.pt.k
}}var i;
var len=this.effectsSequence.length;
for(i=0;
i<len;
i+=1){finalValue=this.effectsSequence[i](finalValue)
}this.setVValue(finalValue);
this.lock=false;
this.frameId=this.elem.globalData.frameId
}function ShapeProperty(elem,data,type){this.propType="shape";
this.comp=elem.comp;
this.container=elem;
this.elem=elem;
this.data=data;
this.k=false;
this.kf=false;
this._mdf=false;
var pathData=type===3?data.pt.k:data.ks.k;
this.v=shapePool.clone(pathData);
this.pv=shapePool.clone(this.v);
this.localShapeCollection=shapeCollectionPool.newShapeCollection();
this.paths=this.localShapeCollection;
this.paths.addShape(this.v);
this.reset=resetShape;
this.effectsSequence=[]
}function addEffect(effectFunction){this.effectsSequence.push(effectFunction);
this.container.addDynamicProperty(this)
}ShapeProperty.prototype.interpolateShape=interpolateShape;
ShapeProperty.prototype.getValue=processEffectsSequence;
ShapeProperty.prototype.setVValue=setVValue;
ShapeProperty.prototype.addEffect=addEffect;
function KeyframedShapeProperty(elem,data,type){this.propType="shape";
this.comp=elem.comp;
this.elem=elem;
this.container=elem;
this.offsetTime=elem.data.st;
this.keyframes=type===3?data.pt.k:data.ks.k;
this.keyframesMetadata=[];
this.k=true;
this.kf=true;
var len=this.keyframes[0].s[0].i.length;
this.v=shapePool.newElement();
this.v.setPathData(this.keyframes[0].s[0].c,len);
this.pv=shapePool.clone(this.v);
this.localShapeCollection=shapeCollectionPool.newShapeCollection();
this.paths=this.localShapeCollection;
this.paths.addShape(this.v);
this.lastFrame=initFrame;
this.reset=resetShape;
this._caching={lastFrame:initFrame,lastIndex:0};
this.effectsSequence=[interpolateShapeCurrentTime.bind(this)]
}KeyframedShapeProperty.prototype.getValue=processEffectsSequence;
KeyframedShapeProperty.prototype.interpolateShape=interpolateShape;
KeyframedShapeProperty.prototype.setVValue=setVValue;
KeyframedShapeProperty.prototype.addEffect=addEffect;
var EllShapeProperty=function(){var cPoint=roundCorner;
function EllShapePropertyFactory(elem,data){this.v=shapePool.newElement();
this.v.setPathData(true,4);
this.localShapeCollection=shapeCollectionPool.newShapeCollection();
this.paths=this.localShapeCollection;
this.localShapeCollection.addShape(this.v);
this.d=data.d;
this.elem=elem;
this.comp=elem.comp;
this.frameId=-1;
this.initDynamicPropertyContainer(elem);
this.p=PropertyFactory.getProp(elem,data.p,1,0,this);
this.s=PropertyFactory.getProp(elem,data.s,1,0,this);
if(this.dynamicProperties.length){this.k=true
}else{this.k=false;
this.convertEllToPath()
}}EllShapePropertyFactory.prototype={reset:resetShape,getValue:function getValue(){if(this.elem.globalData.frameId===this.frameId){return
}this.frameId=this.elem.globalData.frameId;
this.iterateDynamicProperties();
if(this._mdf){this.convertEllToPath()
}},convertEllToPath:function convertEllToPath(){var p0=this.p.v[0];
var p1=this.p.v[1];
var s0=this.s.v[0]/2;
var s1=this.s.v[1]/2;
var _cw=this.d!==3;
var _v=this.v;
_v.v[0][0]=p0;
_v.v[0][1]=p1-s1;
_v.v[1][0]=_cw?p0+s0:p0-s0;
_v.v[1][1]=p1;
_v.v[2][0]=p0;
_v.v[2][1]=p1+s1;
_v.v[3][0]=_cw?p0-s0:p0+s0;
_v.v[3][1]=p1;
_v.i[0][0]=_cw?p0-s0*cPoint:p0+s0*cPoint;
_v.i[0][1]=p1-s1;
_v.i[1][0]=_cw?p0+s0:p0-s0;
_v.i[1][1]=p1-s1*cPoint;
_v.i[2][0]=_cw?p0+s0*cPoint:p0-s0*cPoint;
_v.i[2][1]=p1+s1;
_v.i[3][0]=_cw?p0-s0:p0+s0;
_v.i[3][1]=p1+s1*cPoint;
_v.o[0][0]=_cw?p0+s0*cPoint:p0-s0*cPoint;
_v.o[0][1]=p1-s1;
_v.o[1][0]=_cw?p0+s0:p0-s0;
_v.o[1][1]=p1+s1*cPoint;
_v.o[2][0]=_cw?p0-s0*cPoint:p0+s0*cPoint;
_v.o[2][1]=p1+s1;
_v.o[3][0]=_cw?p0-s0:p0+s0;
_v.o[3][1]=p1-s1*cPoint
}};
extendPrototype([DynamicPropertyContainer],EllShapePropertyFactory);
return EllShapePropertyFactory
}();
var StarShapeProperty=function(){function StarShapePropertyFactory(elem,data){this.v=shapePool.newElement();
this.v.setPathData(true,0);
this.elem=elem;
this.comp=elem.comp;
this.data=data;
this.frameId=-1;
this.d=data.d;
this.initDynamicPropertyContainer(elem);
if(data.sy===1){this.ir=PropertyFactory.getProp(elem,data.ir,0,0,this);
this.is=PropertyFactory.getProp(elem,data.is,0,0.01,this);
this.convertToPath=this.convertStarToPath
}else{this.convertToPath=this.convertPolygonToPath
}this.pt=PropertyFactory.getProp(elem,data.pt,0,0,this);
this.p=PropertyFactory.getProp(elem,data.p,1,0,this);
this.r=PropertyFactory.getProp(elem,data.r,0,degToRads,this);
this.or=PropertyFactory.getProp(elem,data.or,0,0,this);
this.os=PropertyFactory.getProp(elem,data.os,0,0.01,this);
this.localShapeCollection=shapeCollectionPool.newShapeCollection();
this.localShapeCollection.addShape(this.v);
this.paths=this.localShapeCollection;
if(this.dynamicProperties.length){this.k=true
}else{this.k=false;
this.convertToPath()
}}StarShapePropertyFactory.prototype={reset:resetShape,getValue:function getValue(){if(this.elem.globalData.frameId===this.frameId){return
}this.frameId=this.elem.globalData.frameId;
this.iterateDynamicProperties();
if(this._mdf){this.convertToPath()
}},convertStarToPath:function convertStarToPath(){var numPts=Math.floor(this.pt.v)*2;
var angle=Math.PI*2/numPts;
var longFlag=true;
var longRad=this.or.v;
var shortRad=this.ir.v;
var longRound=this.os.v;
var shortRound=this.is.v;
var longPerimSegment=2*Math.PI*longRad/(numPts*2);
var shortPerimSegment=2*Math.PI*shortRad/(numPts*2);
var i;
var rad;
var roundness;
var perimSegment;
var currentAng=-Math.PI/2;
currentAng+=this.r.v;
var dir=this.data.d===3?-1:1;
this.v._length=0;
for(i=0;
i<numPts;
i+=1){rad=longFlag?longRad:shortRad;
roundness=longFlag?longRound:shortRound;
perimSegment=longFlag?longPerimSegment:shortPerimSegment;
var x=rad*Math.cos(currentAng);
var y=rad*Math.sin(currentAng);
var ox=x===0&&y===0?0:y/Math.sqrt(x*x+y*y);
var oy=x===0&&y===0?0:-x/Math.sqrt(x*x+y*y);
x+=+this.p.v[0];
y+=+this.p.v[1];
this.v.setTripleAt(x,y,x-ox*perimSegment*roundness*dir,y-oy*perimSegment*roundness*dir,x+ox*perimSegment*roundness*dir,y+oy*perimSegment*roundness*dir,i,true);
longFlag=!longFlag;
currentAng+=angle*dir
}},convertPolygonToPath:function convertPolygonToPath(){var numPts=Math.floor(this.pt.v);
var angle=Math.PI*2/numPts;
var rad=this.or.v;
var roundness=this.os.v;
var perimSegment=2*Math.PI*rad/(numPts*4);
var i;
var currentAng=-Math.PI*0.5;
var dir=this.data.d===3?-1:1;
currentAng+=this.r.v;
this.v._length=0;
for(i=0;
i<numPts;
i+=1){var x=rad*Math.cos(currentAng);
var y=rad*Math.sin(currentAng);
var ox=x===0&&y===0?0:y/Math.sqrt(x*x+y*y);
var oy=x===0&&y===0?0:-x/Math.sqrt(x*x+y*y);
x+=+this.p.v[0];
y+=+this.p.v[1];
this.v.setTripleAt(x,y,x-ox*perimSegment*roundness*dir,y-oy*perimSegment*roundness*dir,x+ox*perimSegment*roundness*dir,y+oy*perimSegment*roundness*dir,i,true);
currentAng+=angle*dir
}this.paths.length=0;
this.paths[0]=this.v
}};
extendPrototype([DynamicPropertyContainer],StarShapePropertyFactory);
return StarShapePropertyFactory
}();
var RectShapeProperty=function(){function RectShapePropertyFactory(elem,data){this.v=shapePool.newElement();
this.v.c=true;
this.localShapeCollection=shapeCollectionPool.newShapeCollection();
this.localShapeCollection.addShape(this.v);
this.paths=this.localShapeCollection;
this.elem=elem;
this.comp=elem.comp;
this.frameId=-1;
this.d=data.d;
this.initDynamicPropertyContainer(elem);
this.p=PropertyFactory.getProp(elem,data.p,1,0,this);
this.s=PropertyFactory.getProp(elem,data.s,1,0,this);
this.r=PropertyFactory.getProp(elem,data.r,0,0,this);
if(this.dynamicProperties.length){this.k=true
}else{this.k=false;
this.convertRectToPath()
}}RectShapePropertyFactory.prototype={convertRectToPath:function convertRectToPath(){var p0=this.p.v[0];
var p1=this.p.v[1];
var v0=this.s.v[0]/2;
var v1=this.s.v[1]/2;
var round=bmMin(v0,v1,this.r.v);
var cPoint=round*(1-roundCorner);
this.v._length=0;
if(this.d===2||this.d===1){this.v.setTripleAt(p0+v0,p1-v1+round,p0+v0,p1-v1+round,p0+v0,p1-v1+cPoint,0,true);
this.v.setTripleAt(p0+v0,p1+v1-round,p0+v0,p1+v1-cPoint,p0+v0,p1+v1-round,1,true);
if(round!==0){this.v.setTripleAt(p0+v0-round,p1+v1,p0+v0-round,p1+v1,p0+v0-cPoint,p1+v1,2,true);
this.v.setTripleAt(p0-v0+round,p1+v1,p0-v0+cPoint,p1+v1,p0-v0+round,p1+v1,3,true);
this.v.setTripleAt(p0-v0,p1+v1-round,p0-v0,p1+v1-round,p0-v0,p1+v1-cPoint,4,true);
this.v.setTripleAt(p0-v0,p1-v1+round,p0-v0,p1-v1+cPoint,p0-v0,p1-v1+round,5,true);
this.v.setTripleAt(p0-v0+round,p1-v1,p0-v0+round,p1-v1,p0-v0+cPoint,p1-v1,6,true);
this.v.setTripleAt(p0+v0-round,p1-v1,p0+v0-cPoint,p1-v1,p0+v0-round,p1-v1,7,true)
}else{this.v.setTripleAt(p0-v0,p1+v1,p0-v0+cPoint,p1+v1,p0-v0,p1+v1,2);
this.v.setTripleAt(p0-v0,p1-v1,p0-v0,p1-v1+cPoint,p0-v0,p1-v1,3)
}}else{this.v.setTripleAt(p0+v0,p1-v1+round,p0+v0,p1-v1+cPoint,p0+v0,p1-v1+round,0,true);
if(round!==0){this.v.setTripleAt(p0+v0-round,p1-v1,p0+v0-round,p1-v1,p0+v0-cPoint,p1-v1,1,true);
this.v.setTripleAt(p0-v0+round,p1-v1,p0-v0+cPoint,p1-v1,p0-v0+round,p1-v1,2,true);
this.v.setTripleAt(p0-v0,p1-v1+round,p0-v0,p1-v1+round,p0-v0,p1-v1+cPoint,3,true);
this.v.setTripleAt(p0-v0,p1+v1-round,p0-v0,p1+v1-cPoint,p0-v0,p1+v1-round,4,true);
this.v.setTripleAt(p0-v0+round,p1+v1,p0-v0+round,p1+v1,p0-v0+cPoint,p1+v1,5,true);
this.v.setTripleAt(p0+v0-round,p1+v1,p0+v0-cPoint,p1+v1,p0+v0-round,p1+v1,6,true);
this.v.setTripleAt(p0+v0,p1+v1-round,p0+v0,p1+v1-round,p0+v0,p1+v1-cPoint,7,true)
}else{this.v.setTripleAt(p0-v0,p1-v1,p0-v0+cPoint,p1-v1,p0-v0,p1-v1,1,true);
this.v.setTripleAt(p0-v0,p1+v1,p0-v0,p1+v1-cPoint,p0-v0,p1+v1,2,true);
this.v.setTripleAt(p0+v0,p1+v1,p0+v0-cPoint,p1+v1,p0+v0,p1+v1,3,true)
}}},getValue:function getValue(){if(this.elem.globalData.frameId===this.frameId){return
}this.frameId=this.elem.globalData.frameId;
this.iterateDynamicProperties();
if(this._mdf){this.convertRectToPath()
}},reset:resetShape};
extendPrototype([DynamicPropertyContainer],RectShapePropertyFactory);
return RectShapePropertyFactory
}();
function getShapeProp(elem,data,type){var prop;
if(type===3||type===4){var dataProp=type===3?data.pt:data.ks;
var keys=dataProp.k;
if(keys.length){prop=new KeyframedShapeProperty(elem,data,type)
}else{prop=new ShapeProperty(elem,data,type)
}}else{if(type===5){prop=new RectShapeProperty(elem,data)
}else{if(type===6){prop=new EllShapeProperty(elem,data)
}else{if(type===7){prop=new StarShapeProperty(elem,data)
}}}}if(prop.k){elem.addDynamicProperty(prop)
}return prop
}function getConstructorFunction(){return ShapeProperty
}function getKeyframedConstructorFunction(){return KeyframedShapeProperty
}var ob={};
ob.getShapeProp=getShapeProp;
ob.getConstructorFunction=getConstructorFunction;
ob.getKeyframedConstructorFunction=getKeyframedConstructorFunction;
return ob
}();
/*!
   Transformation Matrix v2.0
   (c) Epistemex 2014-2015
   www.epistemex.com
   By Ken Fyrstenberg
   Contributions by leeoniya.
   License: MIT, header required.
   */
;
var Matrix=function(){var _cos=Math.cos;
var _sin=Math.sin;
var _tan=Math.tan;
var _rnd=Math.round;
function reset(){this.props[0]=1;
this.props[1]=0;
this.props[2]=0;
this.props[3]=0;
this.props[4]=0;
this.props[5]=1;
this.props[6]=0;
this.props[7]=0;
this.props[8]=0;
this.props[9]=0;
this.props[10]=1;
this.props[11]=0;
this.props[12]=0;
this.props[13]=0;
this.props[14]=0;
this.props[15]=1;
return this
}function rotate(angle){if(angle===0){return this
}var mCos=_cos(angle);
var mSin=_sin(angle);
return this._t(mCos,-mSin,0,0,mSin,mCos,0,0,0,0,1,0,0,0,0,1)
}function rotateX(angle){if(angle===0){return this
}var mCos=_cos(angle);
var mSin=_sin(angle);
return this._t(1,0,0,0,0,mCos,-mSin,0,0,mSin,mCos,0,0,0,0,1)
}function rotateY(angle){if(angle===0){return this
}var mCos=_cos(angle);
var mSin=_sin(angle);
return this._t(mCos,0,mSin,0,0,1,0,0,-mSin,0,mCos,0,0,0,0,1)
}function rotateZ(angle){if(angle===0){return this
}var mCos=_cos(angle);
var mSin=_sin(angle);
return this._t(mCos,-mSin,0,0,mSin,mCos,0,0,0,0,1,0,0,0,0,1)
}function shear(sx,sy){return this._t(1,sy,sx,1,0,0)
}function skew(ax,ay){return this.shear(_tan(ax),_tan(ay))
}function skewFromAxis(ax,angle){var mCos=_cos(angle);
var mSin=_sin(angle);
return this._t(mCos,mSin,0,0,-mSin,mCos,0,0,0,0,1,0,0,0,0,1)._t(1,0,0,0,_tan(ax),1,0,0,0,0,1,0,0,0,0,1)._t(mCos,-mSin,0,0,mSin,mCos,0,0,0,0,1,0,0,0,0,1)
}function scale(sx,sy,sz){if(!sz&&sz!==0){sz=1
}if(sx===1&&sy===1&&sz===1){return this
}return this._t(sx,0,0,0,0,sy,0,0,0,0,sz,0,0,0,0,1)
}function setTransform(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){this.props[0]=a;
this.props[1]=b;
this.props[2]=c;
this.props[3]=d;
this.props[4]=e;
this.props[5]=f;
this.props[6]=g;
this.props[7]=h;
this.props[8]=i;
this.props[9]=j;
this.props[10]=k;
this.props[11]=l;
this.props[12]=m;
this.props[13]=n;
this.props[14]=o;
this.props[15]=p;
return this
}function translate(tx,ty,tz){tz=tz||0;
if(tx!==0||ty!==0||tz!==0){return this._t(1,0,0,0,0,1,0,0,0,0,1,0,tx,ty,tz,1)
}return this
}function transform(a2,b2,c2,d2,e2,f2,g2,h2,i2,j2,k2,l2,m2,n2,o2,p2){var _p=this.props;
if(a2===1&&b2===0&&c2===0&&d2===0&&e2===0&&f2===1&&g2===0&&h2===0&&i2===0&&j2===0&&k2===1&&l2===0){_p[12]=_p[12]*a2+_p[15]*m2;
_p[13]=_p[13]*f2+_p[15]*n2;
_p[14]=_p[14]*k2+_p[15]*o2;
_p[15]*=p2;
this._identityCalculated=false;
return this
}var a1=_p[0];
var b1=_p[1];
var c1=_p[2];
var d1=_p[3];
var e1=_p[4];
var f1=_p[5];
var g1=_p[6];
var h1=_p[7];
var i1=_p[8];
var j1=_p[9];
var k1=_p[10];
var l1=_p[11];
var m1=_p[12];
var n1=_p[13];
var o1=_p[14];
var p1=_p[15];
_p[0]=a1*a2+b1*e2+c1*i2+d1*m2;
_p[1]=a1*b2+b1*f2+c1*j2+d1*n2;
_p[2]=a1*c2+b1*g2+c1*k2+d1*o2;
_p[3]=a1*d2+b1*h2+c1*l2+d1*p2;
_p[4]=e1*a2+f1*e2+g1*i2+h1*m2;
_p[5]=e1*b2+f1*f2+g1*j2+h1*n2;
_p[6]=e1*c2+f1*g2+g1*k2+h1*o2;
_p[7]=e1*d2+f1*h2+g1*l2+h1*p2;
_p[8]=i1*a2+j1*e2+k1*i2+l1*m2;
_p[9]=i1*b2+j1*f2+k1*j2+l1*n2;
_p[10]=i1*c2+j1*g2+k1*k2+l1*o2;
_p[11]=i1*d2+j1*h2+k1*l2+l1*p2;
_p[12]=m1*a2+n1*e2+o1*i2+p1*m2;
_p[13]=m1*b2+n1*f2+o1*j2+p1*n2;
_p[14]=m1*c2+n1*g2+o1*k2+p1*o2;
_p[15]=m1*d2+n1*h2+o1*l2+p1*p2;
this._identityCalculated=false;
return this
}function isIdentity(){if(!this._identityCalculated){this._identity=!(this.props[0]!==1||this.props[1]!==0||this.props[2]!==0||this.props[3]!==0||this.props[4]!==0||this.props[5]!==1||this.props[6]!==0||this.props[7]!==0||this.props[8]!==0||this.props[9]!==0||this.props[10]!==1||this.props[11]!==0||this.props[12]!==0||this.props[13]!==0||this.props[14]!==0||this.props[15]!==1);
this._identityCalculated=true
}return this._identity
}function equals(matr){var i=0;
while(i<16){if(matr.props[i]!==this.props[i]){return false
}i+=1
}return true
}function clone(matr){var i;
for(i=0;
i<16;
i+=1){matr.props[i]=this.props[i]
}return matr
}function cloneFromProps(props){var i;
for(i=0;
i<16;
i+=1){this.props[i]=props[i]
}}function applyToPoint(x,y,z){return{x:x*this.props[0]+y*this.props[4]+z*this.props[8]+this.props[12],y:x*this.props[1]+y*this.props[5]+z*this.props[9]+this.props[13],z:x*this.props[2]+y*this.props[6]+z*this.props[10]+this.props[14]}
}function applyToX(x,y,z){return x*this.props[0]+y*this.props[4]+z*this.props[8]+this.props[12]
}function applyToY(x,y,z){return x*this.props[1]+y*this.props[5]+z*this.props[9]+this.props[13]
}function applyToZ(x,y,z){return x*this.props[2]+y*this.props[6]+z*this.props[10]+this.props[14]
}function getInverseMatrix(){var determinant=this.props[0]*this.props[5]-this.props[1]*this.props[4];
var a=this.props[5]/determinant;
var b=-this.props[1]/determinant;
var c=-this.props[4]/determinant;
var d=this.props[0]/determinant;
var e=(this.props[4]*this.props[13]-this.props[5]*this.props[12])/determinant;
var f=-(this.props[0]*this.props[13]-this.props[1]*this.props[12])/determinant;
var inverseMatrix=new Matrix();
inverseMatrix.props[0]=a;
inverseMatrix.props[1]=b;
inverseMatrix.props[4]=c;
inverseMatrix.props[5]=d;
inverseMatrix.props[12]=e;
inverseMatrix.props[13]=f;
return inverseMatrix
}function inversePoint(pt){var inverseMatrix=this.getInverseMatrix();
return inverseMatrix.applyToPointArray(pt[0],pt[1],pt[2]||0)
}function inversePoints(pts){var i;
var len=pts.length;
var retPts=[];
for(i=0;
i<len;
i+=1){retPts[i]=inversePoint(pts[i])
}return retPts
}function applyToTriplePoints(pt1,pt2,pt3){var arr=createTypedArray("float32",6);
if(this.isIdentity()){arr[0]=pt1[0];
arr[1]=pt1[1];
arr[2]=pt2[0];
arr[3]=pt2[1];
arr[4]=pt3[0];
arr[5]=pt3[1]
}else{var p0=this.props[0];
var p1=this.props[1];
var p4=this.props[4];
var p5=this.props[5];
var p12=this.props[12];
var p13=this.props[13];
arr[0]=pt1[0]*p0+pt1[1]*p4+p12;
arr[1]=pt1[0]*p1+pt1[1]*p5+p13;
arr[2]=pt2[0]*p0+pt2[1]*p4+p12;
arr[3]=pt2[0]*p1+pt2[1]*p5+p13;
arr[4]=pt3[0]*p0+pt3[1]*p4+p12;
arr[5]=pt3[0]*p1+pt3[1]*p5+p13
}return arr
}function applyToPointArray(x,y,z){var arr;
if(this.isIdentity()){arr=[x,y,z]
}else{arr=[x*this.props[0]+y*this.props[4]+z*this.props[8]+this.props[12],x*this.props[1]+y*this.props[5]+z*this.props[9]+this.props[13],x*this.props[2]+y*this.props[6]+z*this.props[10]+this.props[14]]
}return arr
}function applyToPointStringified(x,y){if(this.isIdentity()){return x+","+y
}var _p=this.props;
return Math.round((x*_p[0]+y*_p[4]+_p[12])*100)/100+","+Math.round((x*_p[1]+y*_p[5]+_p[13])*100)/100
}function toCSS(){var i=0;
var props=this.props;
var cssValue="matrix3d(";
var v=10000;
while(i<16){cssValue+=_rnd(props[i]*v)/v;
cssValue+=i===15?")":",";
i+=1
}return cssValue
}function roundMatrixProperty(val){var v=10000;
if(val<0.000001&&val>0||val>-0.000001&&val<0){return _rnd(val*v)/v
}return val
}function to2dCSS(){var props=this.props;
var _a=roundMatrixProperty(props[0]);
var _b=roundMatrixProperty(props[1]);
var _c=roundMatrixProperty(props[4]);
var _d=roundMatrixProperty(props[5]);
var _e=roundMatrixProperty(props[12]);
var _f=roundMatrixProperty(props[13]);
return"matrix("+_a+","+_b+","+_c+","+_d+","+_e+","+_f+")"
}return function(){this.reset=reset;
this.rotate=rotate;
this.rotateX=rotateX;
this.rotateY=rotateY;
this.rotateZ=rotateZ;
this.skew=skew;
this.skewFromAxis=skewFromAxis;
this.shear=shear;
this.scale=scale;
this.setTransform=setTransform;
this.translate=translate;
this.transform=transform;
this.applyToPoint=applyToPoint;
this.applyToX=applyToX;
this.applyToY=applyToY;
this.applyToZ=applyToZ;
this.applyToPointArray=applyToPointArray;
this.applyToTriplePoints=applyToTriplePoints;
this.applyToPointStringified=applyToPointStringified;
this.toCSS=toCSS;
this.to2dCSS=to2dCSS;
this.clone=clone;
this.cloneFromProps=cloneFromProps;
this.equals=equals;
this.inversePoints=inversePoints;
this.inversePoint=inversePoint;
this.getInverseMatrix=getInverseMatrix;
this._t=this.transform;
this.isIdentity=isIdentity;
this._identity=true;
this._identityCalculated=false;
this.props=createTypedArray("float32",16);
this.reset()
}
}();
function _typeof$3(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof$3=function _typeof(obj){return typeof obj
}
}else{_typeof$3=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj
}
}return _typeof$3(obj)
}var lottie={};
var standalone="__[STANDALONE]__";
var animationData="__[ANIMATIONDATA]__";
var renderer="";
function setLocation(href){setLocationHref(href)
}function searchAnimations(){if(standalone===true){animationManager.searchAnimations(animationData,standalone,renderer)
}else{animationManager.searchAnimations()
}}function setSubframeRendering(flag){setSubframeEnabled(flag)
}function setPrefix(prefix){setIdPrefix(prefix)
}function loadAnimation(params){if(standalone===true){params.animationData=JSON.parse(animationData)
}return animationManager.loadAnimation(params)
}function setQuality(value){if(typeof value==="string"){switch(value){case"high":setDefaultCurveSegments(200);
break;
default:case"medium":setDefaultCurveSegments(50);
break;
case"low":setDefaultCurveSegments(10);
break
}}else{if(!isNaN(value)&&value>1){setDefaultCurveSegments(value)
}}if(getDefaultCurveSegments()>=50){roundValues(false)
}else{roundValues(true)
}}function inBrowser(){return typeof navigator!=="undefined"
}function installPlugin(type,plugin){if(type==="expressions"){setExpressionsPlugin(plugin)
}}function getFactory(name){switch(name){case"propertyFactory":return PropertyFactory;
case"shapePropertyFactory":return ShapePropertyFactory;
case"matrix":return Matrix;
default:return null
}}lottie.play=animationManager.play;
lottie.pause=animationManager.pause;
lottie.setLocationHref=setLocation;
lottie.togglePause=animationManager.togglePause;
lottie.setSpeed=animationManager.setSpeed;
lottie.setDirection=animationManager.setDirection;
lottie.stop=animationManager.stop;
lottie.searchAnimations=searchAnimations;
lottie.registerAnimation=animationManager.registerAnimation;
lottie.loadAnimation=loadAnimation;
lottie.setSubframeRendering=setSubframeRendering;
lottie.resize=animationManager.resize;
lottie.goToAndStop=animationManager.goToAndStop;
lottie.destroy=animationManager.destroy;
lottie.setQuality=setQuality;
lottie.inBrowser=inBrowser;
lottie.installPlugin=installPlugin;
lottie.freeze=animationManager.freeze;
lottie.unfreeze=animationManager.unfreeze;
lottie.setVolume=animationManager.setVolume;
lottie.mute=animationManager.mute;
lottie.unmute=animationManager.unmute;
lottie.getRegisteredAnimations=animationManager.getRegisteredAnimations;
lottie.useWebWorker=setWebWorker;
lottie.setIDPrefix=setPrefix;
lottie.__getFactory=getFactory;
lottie.version="5.11.0";
function checkReady(){if(document.readyState==="complete"){clearInterval(readyStateCheckInterval);
searchAnimations()
}}function getQueryVariable(variable){var vars=queryString.split("&");
for(var i=0;
i<vars.length;
i+=1){var pair=vars[i].split("=");
if(decodeURIComponent(pair[0])==variable){return decodeURIComponent(pair[1])
}}return null
}var queryString="";
if(standalone){var scripts=document.getElementsByTagName("script");
var index=scripts.length-1;
var myScript=scripts[index]||{src:""};
queryString=myScript.src?myScript.src.replace(/^[^\?]+\??/,""):"";
renderer=getQueryVariable("renderer")
}var readyStateCheckInterval=setInterval(checkReady,100);
try{if(!((typeof exports==="undefined"?"undefined":_typeof$3(exports))==="object"&&typeof module!=="undefined")&&!(typeof define==="function"&&define.amd)){window.bodymovin=lottie
}}catch(err){}var ShapeModifiers=function(){var ob={};
var modifiers={};
ob.registerModifier=registerModifier;
ob.getModifier=getModifier;
function registerModifier(nm,factory){if(!modifiers[nm]){modifiers[nm]=factory
}}function getModifier(nm,elem,data){return new modifiers[nm](elem,data)
}return ob
}();
function ShapeModifier(){}ShapeModifier.prototype.initModifierProperties=function(){};
ShapeModifier.prototype.addShapeToModifier=function(){};
ShapeModifier.prototype.addShape=function(data){if(!this.closed){data.sh.container.addDynamicProperty(data.sh);
var shapeData={shape:data.sh,data:data,localShapeCollection:shapeCollectionPool.newShapeCollection()};
this.shapes.push(shapeData);
this.addShapeToModifier(shapeData);
if(this._isAnimated){data.setAsAnimated()
}}};
ShapeModifier.prototype.init=function(elem,data){this.shapes=[];
this.elem=elem;
this.initDynamicPropertyContainer(elem);
this.initModifierProperties(elem,data);
this.frameId=initialDefaultFrame;
this.closed=false;
this.k=false;
if(this.dynamicProperties.length){this.k=true
}else{this.getValue(true)
}};
ShapeModifier.prototype.processKeys=function(){if(this.elem.globalData.frameId===this.frameId){return
}this.frameId=this.elem.globalData.frameId;
this.iterateDynamicProperties()
};
extendPrototype([DynamicPropertyContainer],ShapeModifier);
function TrimModifier(){}extendPrototype([ShapeModifier],TrimModifier);
TrimModifier.prototype.initModifierProperties=function(elem,data){this.s=PropertyFactory.getProp(elem,data.s,0,0.01,this);
this.e=PropertyFactory.getProp(elem,data.e,0,0.01,this);
this.o=PropertyFactory.getProp(elem,data.o,0,0,this);
this.sValue=0;
this.eValue=0;
this.getValue=this.processKeys;
this.m=data.m;
this._isAnimated=!!this.s.effectsSequence.length||!!this.e.effectsSequence.length||!!this.o.effectsSequence.length
};
TrimModifier.prototype.addShapeToModifier=function(shapeData){shapeData.pathsData=[]
};
TrimModifier.prototype.calculateShapeEdges=function(s,e,shapeLength,addedLength,totalModifierLength){var segments=[];
if(e<=1){segments.push({s:s,e:e})
}else{if(s>=1){segments.push({s:s-1,e:e-1})
}else{segments.push({s:s,e:1});
segments.push({s:0,e:e-1})
}}var shapeSegments=[];
var i;
var len=segments.length;
var segmentOb;
for(i=0;
i<len;
i+=1){segmentOb=segments[i];
if(!(segmentOb.e*totalModifierLength<addedLength||segmentOb.s*totalModifierLength>addedLength+shapeLength)){var shapeS;
var shapeE;
if(segmentOb.s*totalModifierLength<=addedLength){shapeS=0
}else{shapeS=(segmentOb.s*totalModifierLength-addedLength)/shapeLength
}if(segmentOb.e*totalModifierLength>=addedLength+shapeLength){shapeE=1
}else{shapeE=(segmentOb.e*totalModifierLength-addedLength)/shapeLength
}shapeSegments.push([shapeS,shapeE])
}}if(!shapeSegments.length){shapeSegments.push([0,0])
}return shapeSegments
};
TrimModifier.prototype.releasePathsData=function(pathsData){var i;
var len=pathsData.length;
for(i=0;
i<len;
i+=1){segmentsLengthPool.release(pathsData[i])
}pathsData.length=0;
return pathsData
};
TrimModifier.prototype.processShapes=function(_isFirstFrame){var s;
var e;
if(this._mdf||_isFirstFrame){var o=this.o.v%360/360;
if(o<0){o+=1
}if(this.s.v>1){s=1+o
}else{if(this.s.v<0){s=0+o
}else{s=this.s.v+o
}}if(this.e.v>1){e=1+o
}else{if(this.e.v<0){e=0+o
}else{e=this.e.v+o
}}if(s>e){var _s=s;
s=e;
e=_s
}s=Math.round(s*10000)*0.0001;
e=Math.round(e*10000)*0.0001;
this.sValue=s;
this.eValue=e
}else{s=this.sValue;
e=this.eValue
}var shapePaths;
var i;
var len=this.shapes.length;
var j;
var jLen;
var pathsData;
var pathData;
var totalShapeLength;
var totalModifierLength=0;
if(e===s){for(i=0;
i<len;
i+=1){this.shapes[i].localShapeCollection.releaseShapes();
this.shapes[i].shape._mdf=true;
this.shapes[i].shape.paths=this.shapes[i].localShapeCollection;
if(this._mdf){this.shapes[i].pathsData.length=0
}}}else{if(!(e===1&&s===0||e===0&&s===1)){var segments=[];
var shapeData;
var localShapeCollection;
for(i=0;
i<len;
i+=1){shapeData=this.shapes[i];
if(!shapeData.shape._mdf&&!this._mdf&&!_isFirstFrame&&this.m!==2){shapeData.shape.paths=shapeData.localShapeCollection
}else{shapePaths=shapeData.shape.paths;
jLen=shapePaths._length;
totalShapeLength=0;
if(!shapeData.shape._mdf&&shapeData.pathsData.length){totalShapeLength=shapeData.totalShapeLength
}else{pathsData=this.releasePathsData(shapeData.pathsData);
for(j=0;
j<jLen;
j+=1){pathData=bez.getSegmentsLength(shapePaths.shapes[j]);
pathsData.push(pathData);
totalShapeLength+=pathData.totalLength
}shapeData.totalShapeLength=totalShapeLength;
shapeData.pathsData=pathsData
}totalModifierLength+=totalShapeLength;
shapeData.shape._mdf=true
}}var shapeS=s;
var shapeE=e;
var addedLength=0;
var edges;
for(i=len-1;
i>=0;
i-=1){shapeData=this.shapes[i];
if(shapeData.shape._mdf){localShapeCollection=shapeData.localShapeCollection;
localShapeCollection.releaseShapes();
if(this.m===2&&len>1){edges=this.calculateShapeEdges(s,e,shapeData.totalShapeLength,addedLength,totalModifierLength);
addedLength+=shapeData.totalShapeLength
}else{edges=[[shapeS,shapeE]]
}jLen=edges.length;
for(j=0;
j<jLen;
j+=1){shapeS=edges[j][0];
shapeE=edges[j][1];
segments.length=0;
if(shapeE<=1){segments.push({s:shapeData.totalShapeLength*shapeS,e:shapeData.totalShapeLength*shapeE})
}else{if(shapeS>=1){segments.push({s:shapeData.totalShapeLength*(shapeS-1),e:shapeData.totalShapeLength*(shapeE-1)})
}else{segments.push({s:shapeData.totalShapeLength*shapeS,e:shapeData.totalShapeLength});
segments.push({s:0,e:shapeData.totalShapeLength*(shapeE-1)})
}}var newShapesData=this.addShapes(shapeData,segments[0]);
if(segments[0].s!==segments[0].e){if(segments.length>1){var lastShapeInCollection=shapeData.shape.paths.shapes[shapeData.shape.paths._length-1];
if(lastShapeInCollection.c){var lastShape=newShapesData.pop();
this.addPaths(newShapesData,localShapeCollection);
newShapesData=this.addShapes(shapeData,segments[1],lastShape)
}else{this.addPaths(newShapesData,localShapeCollection);
newShapesData=this.addShapes(shapeData,segments[1])
}}this.addPaths(newShapesData,localShapeCollection)
}}shapeData.shape.paths=localShapeCollection
}}}else{if(this._mdf){for(i=0;
i<len;
i+=1){this.shapes[i].pathsData.length=0;
this.shapes[i].shape._mdf=true
}}}}};
TrimModifier.prototype.addPaths=function(newPaths,localShapeCollection){var i;
var len=newPaths.length;
for(i=0;
i<len;
i+=1){localShapeCollection.addShape(newPaths[i])
}};
TrimModifier.prototype.addSegment=function(pt1,pt2,pt3,pt4,shapePath,pos,newShape){shapePath.setXYAt(pt2[0],pt2[1],"o",pos);
shapePath.setXYAt(pt3[0],pt3[1],"i",pos+1);
if(newShape){shapePath.setXYAt(pt1[0],pt1[1],"v",pos)
}shapePath.setXYAt(pt4[0],pt4[1],"v",pos+1)
};
TrimModifier.prototype.addSegmentFromArray=function(points,shapePath,pos,newShape){shapePath.setXYAt(points[1],points[5],"o",pos);
shapePath.setXYAt(points[2],points[6],"i",pos+1);
if(newShape){shapePath.setXYAt(points[0],points[4],"v",pos)
}shapePath.setXYAt(points[3],points[7],"v",pos+1)
};
TrimModifier.prototype.addShapes=function(shapeData,shapeSegment,shapePath){var pathsData=shapeData.pathsData;
var shapePaths=shapeData.shape.paths.shapes;
var i;
var len=shapeData.shape.paths._length;
var j;
var jLen;
var addedLength=0;
var currentLengthData;
var segmentCount;
var lengths;
var segment;
var shapes=[];
var initPos;
var newShape=true;
if(!shapePath){shapePath=shapePool.newElement();
segmentCount=0;
initPos=0
}else{segmentCount=shapePath._length;
initPos=shapePath._length
}shapes.push(shapePath);
for(i=0;
i<len;
i+=1){lengths=pathsData[i].lengths;
shapePath.c=shapePaths[i].c;
jLen=shapePaths[i].c?lengths.length:lengths.length+1;
for(j=1;
j<jLen;
j+=1){currentLengthData=lengths[j-1];
if(addedLength+currentLengthData.addedLength<shapeSegment.s){addedLength+=currentLengthData.addedLength;
shapePath.c=false
}else{if(addedLength>shapeSegment.e){shapePath.c=false;
break
}else{if(shapeSegment.s<=addedLength&&shapeSegment.e>=addedLength+currentLengthData.addedLength){this.addSegment(shapePaths[i].v[j-1],shapePaths[i].o[j-1],shapePaths[i].i[j],shapePaths[i].v[j],shapePath,segmentCount,newShape);
newShape=false
}else{segment=bez.getNewSegment(shapePaths[i].v[j-1],shapePaths[i].v[j],shapePaths[i].o[j-1],shapePaths[i].i[j],(shapeSegment.s-addedLength)/currentLengthData.addedLength,(shapeSegment.e-addedLength)/currentLengthData.addedLength,lengths[j-1]);
this.addSegmentFromArray(segment,shapePath,segmentCount,newShape);
newShape=false;
shapePath.c=false
}addedLength+=currentLengthData.addedLength;
segmentCount+=1
}}}if(shapePaths[i].c&&lengths.length){currentLengthData=lengths[j-1];
if(addedLength<=shapeSegment.e){var segmentLength=lengths[j-1].addedLength;
if(shapeSegment.s<=addedLength&&shapeSegment.e>=addedLength+segmentLength){this.addSegment(shapePaths[i].v[j-1],shapePaths[i].o[j-1],shapePaths[i].i[0],shapePaths[i].v[0],shapePath,segmentCount,newShape);
newShape=false
}else{segment=bez.getNewSegment(shapePaths[i].v[j-1],shapePaths[i].v[0],shapePaths[i].o[j-1],shapePaths[i].i[0],(shapeSegment.s-addedLength)/segmentLength,(shapeSegment.e-addedLength)/segmentLength,lengths[j-1]);
this.addSegmentFromArray(segment,shapePath,segmentCount,newShape);
newShape=false;
shapePath.c=false
}}else{shapePath.c=false
}addedLength+=currentLengthData.addedLength;
segmentCount+=1
}if(shapePath._length){shapePath.setXYAt(shapePath.v[initPos][0],shapePath.v[initPos][1],"i",initPos);
shapePath.setXYAt(shapePath.v[shapePath._length-1][0],shapePath.v[shapePath._length-1][1],"o",shapePath._length-1)
}if(addedLength>shapeSegment.e){break
}if(i<len-1){shapePath=shapePool.newElement();
newShape=true;
shapes.push(shapePath);
segmentCount=0
}}return shapes
};
function PuckerAndBloatModifier(){}extendPrototype([ShapeModifier],PuckerAndBloatModifier);
PuckerAndBloatModifier.prototype.initModifierProperties=function(elem,data){this.getValue=this.processKeys;
this.amount=PropertyFactory.getProp(elem,data.a,0,null,this);
this._isAnimated=!!this.amount.effectsSequence.length
};
PuckerAndBloatModifier.prototype.processPath=function(path,amount){var percent=amount/100;
var centerPoint=[0,0];
var pathLength=path._length;
var i=0;
for(i=0;
i<pathLength;
i+=1){centerPoint[0]+=path.v[i][0];
centerPoint[1]+=path.v[i][1]
}centerPoint[0]/=pathLength;
centerPoint[1]/=pathLength;
var clonedPath=shapePool.newElement();
clonedPath.c=path.c;
var vX;
var vY;
var oX;
var oY;
var iX;
var iY;
for(i=0;
i<pathLength;
i+=1){vX=path.v[i][0]+(centerPoint[0]-path.v[i][0])*percent;
vY=path.v[i][1]+(centerPoint[1]-path.v[i][1])*percent;
oX=path.o[i][0]+(centerPoint[0]-path.o[i][0])*-percent;
oY=path.o[i][1]+(centerPoint[1]-path.o[i][1])*-percent;
iX=path.i[i][0]+(centerPoint[0]-path.i[i][0])*-percent;
iY=path.i[i][1]+(centerPoint[1]-path.i[i][1])*-percent;
clonedPath.setTripleAt(vX,vY,oX,oY,iX,iY,i)
}return clonedPath
};
PuckerAndBloatModifier.prototype.processShapes=function(_isFirstFrame){var shapePaths;
var i;
var len=this.shapes.length;
var j;
var jLen;
var amount=this.amount.v;
if(amount!==0){var shapeData;
var localShapeCollection;
for(i=0;
i<len;
i+=1){shapeData=this.shapes[i];
localShapeCollection=shapeData.localShapeCollection;
if(!(!shapeData.shape._mdf&&!this._mdf&&!_isFirstFrame)){localShapeCollection.releaseShapes();
shapeData.shape._mdf=true;
shapePaths=shapeData.shape.paths.shapes;
jLen=shapeData.shape.paths._length;
for(j=0;
j<jLen;
j+=1){localShapeCollection.addShape(this.processPath(shapePaths[j],amount))
}}shapeData.shape.paths=shapeData.localShapeCollection
}}if(!this.dynamicProperties.length){this._mdf=false
}};
var TransformPropertyFactory=function(){var defaultVector=[0,0];
function applyToMatrix(mat){var _mdf=this._mdf;
this.iterateDynamicProperties();
this._mdf=this._mdf||_mdf;
if(this.a){mat.translate(-this.a.v[0],-this.a.v[1],this.a.v[2])
}if(this.s){mat.scale(this.s.v[0],this.s.v[1],this.s.v[2])
}if(this.sk){mat.skewFromAxis(-this.sk.v,this.sa.v)
}if(this.r){mat.rotate(-this.r.v)
}else{mat.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0])
}if(this.data.p.s){if(this.data.p.z){mat.translate(this.px.v,this.py.v,-this.pz.v)
}else{mat.translate(this.px.v,this.py.v,0)
}}else{mat.translate(this.p.v[0],this.p.v[1],-this.p.v[2])
}}function processKeys(forceRender){if(this.elem.globalData.frameId===this.frameId){return
}if(this._isDirty){this.precalculateMatrix();
this._isDirty=false
}this.iterateDynamicProperties();
if(this._mdf||forceRender){var frameRate;
this.v.cloneFromProps(this.pre.props);
if(this.appliedTransformations<1){this.v.translate(-this.a.v[0],-this.a.v[1],this.a.v[2])
}if(this.appliedTransformations<2){this.v.scale(this.s.v[0],this.s.v[1],this.s.v[2])
}if(this.sk&&this.appliedTransformations<3){this.v.skewFromAxis(-this.sk.v,this.sa.v)
}if(this.r&&this.appliedTransformations<4){this.v.rotate(-this.r.v)
}else{if(!this.r&&this.appliedTransformations<4){this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0])
}}if(this.autoOriented){var v1;
var v2;
frameRate=this.elem.globalData.frameRate;
if(this.p&&this.p.keyframes&&this.p.getValueAtTime){if(this.p._caching.lastFrame+this.p.offsetTime<=this.p.keyframes[0].t){v1=this.p.getValueAtTime((this.p.keyframes[0].t+0.01)/frameRate,0);
v2=this.p.getValueAtTime(this.p.keyframes[0].t/frameRate,0)
}else{if(this.p._caching.lastFrame+this.p.offsetTime>=this.p.keyframes[this.p.keyframes.length-1].t){v1=this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length-1].t/frameRate,0);
v2=this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length-1].t-0.05)/frameRate,0)
}else{v1=this.p.pv;
v2=this.p.getValueAtTime((this.p._caching.lastFrame+this.p.offsetTime-0.01)/frameRate,this.p.offsetTime)
}}}else{if(this.px&&this.px.keyframes&&this.py.keyframes&&this.px.getValueAtTime&&this.py.getValueAtTime){v1=[];
v2=[];
var px=this.px;
var py=this.py;
if(px._caching.lastFrame+px.offsetTime<=px.keyframes[0].t){v1[0]=px.getValueAtTime((px.keyframes[0].t+0.01)/frameRate,0);
v1[1]=py.getValueAtTime((py.keyframes[0].t+0.01)/frameRate,0);
v2[0]=px.getValueAtTime(px.keyframes[0].t/frameRate,0);
v2[1]=py.getValueAtTime(py.keyframes[0].t/frameRate,0)
}else{if(px._caching.lastFrame+px.offsetTime>=px.keyframes[px.keyframes.length-1].t){v1[0]=px.getValueAtTime(px.keyframes[px.keyframes.length-1].t/frameRate,0);
v1[1]=py.getValueAtTime(py.keyframes[py.keyframes.length-1].t/frameRate,0);
v2[0]=px.getValueAtTime((px.keyframes[px.keyframes.length-1].t-0.01)/frameRate,0);
v2[1]=py.getValueAtTime((py.keyframes[py.keyframes.length-1].t-0.01)/frameRate,0)
}else{v1=[px.pv,py.pv];
v2[0]=px.getValueAtTime((px._caching.lastFrame+px.offsetTime-0.01)/frameRate,px.offsetTime);
v2[1]=py.getValueAtTime((py._caching.lastFrame+py.offsetTime-0.01)/frameRate,py.offsetTime)
}}}else{v2=defaultVector;
v1=v2
}}this.v.rotate(-Math.atan2(v1[1]-v2[1],v1[0]-v2[0]))
}if(this.data.p&&this.data.p.s){if(this.data.p.z){this.v.translate(this.px.v,this.py.v,-this.pz.v)
}else{this.v.translate(this.px.v,this.py.v,0)
}}else{this.v.translate(this.p.v[0],this.p.v[1],-this.p.v[2])
}}this.frameId=this.elem.globalData.frameId
}function precalculateMatrix(){if(!this.a.k){this.pre.translate(-this.a.v[0],-this.a.v[1],this.a.v[2]);
this.appliedTransformations=1
}else{return
}if(!this.s.effectsSequence.length){this.pre.scale(this.s.v[0],this.s.v[1],this.s.v[2]);
this.appliedTransformations=2
}else{return
}if(this.sk){if(!this.sk.effectsSequence.length&&!this.sa.effectsSequence.length){this.pre.skewFromAxis(-this.sk.v,this.sa.v);
this.appliedTransformations=3
}else{return
}}if(this.r){if(!this.r.effectsSequence.length){this.pre.rotate(-this.r.v);
this.appliedTransformations=4
}}else{if(!this.rz.effectsSequence.length&&!this.ry.effectsSequence.length&&!this.rx.effectsSequence.length&&!this.or.effectsSequence.length){this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]);
this.appliedTransformations=4
}}}function autoOrient(){}function addDynamicProperty(prop){this._addDynamicProperty(prop);
this.elem.addDynamicProperty(prop);
this._isDirty=true
}function TransformProperty(elem,data,container){this.elem=elem;
this.frameId=-1;
this.propType="transform";
this.data=data;
this.v=new Matrix();
this.pre=new Matrix();
this.appliedTransformations=0;
this.initDynamicPropertyContainer(container||elem);
if(data.p&&data.p.s){this.px=PropertyFactory.getProp(elem,data.p.x,0,0,this);
this.py=PropertyFactory.getProp(elem,data.p.y,0,0,this);
if(data.p.z){this.pz=PropertyFactory.getProp(elem,data.p.z,0,0,this)
}}else{this.p=PropertyFactory.getProp(elem,data.p||{k:[0,0,0]},1,0,this)
}if(data.rx){this.rx=PropertyFactory.getProp(elem,data.rx,0,degToRads,this);
this.ry=PropertyFactory.getProp(elem,data.ry,0,degToRads,this);
this.rz=PropertyFactory.getProp(elem,data.rz,0,degToRads,this);
if(data.or.k[0].ti){var i;
var len=data.or.k.length;
for(i=0;
i<len;
i+=1){data.or.k[i].to=null;
data.or.k[i].ti=null
}}this.or=PropertyFactory.getProp(elem,data.or,1,degToRads,this);
this.or.sh=true
}else{this.r=PropertyFactory.getProp(elem,data.r||{k:0},0,degToRads,this)
}if(data.sk){this.sk=PropertyFactory.getProp(elem,data.sk,0,degToRads,this);
this.sa=PropertyFactory.getProp(elem,data.sa,0,degToRads,this)
}this.a=PropertyFactory.getProp(elem,data.a||{k:[0,0,0]},1,0,this);
this.s=PropertyFactory.getProp(elem,data.s||{k:[100,100,100]},1,0.01,this);
if(data.o){this.o=PropertyFactory.getProp(elem,data.o,0,0.01,elem)
}else{this.o={_mdf:false,v:1}
}this._isDirty=true;
if(!this.dynamicProperties.length){this.getValue(true)
}}TransformProperty.prototype={applyToMatrix:applyToMatrix,getValue:processKeys,precalculateMatrix:precalculateMatrix,autoOrient:autoOrient};
extendPrototype([DynamicPropertyContainer],TransformProperty);
TransformProperty.prototype.addDynamicProperty=addDynamicProperty;
TransformProperty.prototype._addDynamicProperty=DynamicPropertyContainer.prototype.addDynamicProperty;
function getTransformProperty(elem,data,container){return new TransformProperty(elem,data,container)
}return{getTransformProperty:getTransformProperty}
}();
function RepeaterModifier(){}extendPrototype([ShapeModifier],RepeaterModifier);
RepeaterModifier.prototype.initModifierProperties=function(elem,data){this.getValue=this.processKeys;
this.c=PropertyFactory.getProp(elem,data.c,0,null,this);
this.o=PropertyFactory.getProp(elem,data.o,0,null,this);
this.tr=TransformPropertyFactory.getTransformProperty(elem,data.tr,this);
this.so=PropertyFactory.getProp(elem,data.tr.so,0,0.01,this);
this.eo=PropertyFactory.getProp(elem,data.tr.eo,0,0.01,this);
this.data=data;
if(!this.dynamicProperties.length){this.getValue(true)
}this._isAnimated=!!this.dynamicProperties.length;
this.pMatrix=new Matrix();
this.rMatrix=new Matrix();
this.sMatrix=new Matrix();
this.tMatrix=new Matrix();
this.matrix=new Matrix()
};
RepeaterModifier.prototype.applyTransforms=function(pMatrix,rMatrix,sMatrix,transform,perc,inv){var dir=inv?-1:1;
var scaleX=transform.s.v[0]+(1-transform.s.v[0])*(1-perc);
var scaleY=transform.s.v[1]+(1-transform.s.v[1])*(1-perc);
pMatrix.translate(transform.p.v[0]*dir*perc,transform.p.v[1]*dir*perc,transform.p.v[2]);
rMatrix.translate(-transform.a.v[0],-transform.a.v[1],transform.a.v[2]);
rMatrix.rotate(-transform.r.v*dir*perc);
rMatrix.translate(transform.a.v[0],transform.a.v[1],transform.a.v[2]);
sMatrix.translate(-transform.a.v[0],-transform.a.v[1],transform.a.v[2]);
sMatrix.scale(inv?1/scaleX:scaleX,inv?1/scaleY:scaleY);
sMatrix.translate(transform.a.v[0],transform.a.v[1],transform.a.v[2])
};
RepeaterModifier.prototype.init=function(elem,arr,pos,elemsData){this.elem=elem;
this.arr=arr;
this.pos=pos;
this.elemsData=elemsData;
this._currentCopies=0;
this._elements=[];
this._groups=[];
this.frameId=-1;
this.initDynamicPropertyContainer(elem);
this.initModifierProperties(elem,arr[pos]);
while(pos>0){pos-=1;
this._elements.unshift(arr[pos])
}if(this.dynamicProperties.length){this.k=true
}else{this.getValue(true)
}};
RepeaterModifier.prototype.resetElements=function(elements){var i;
var len=elements.length;
for(i=0;
i<len;
i+=1){elements[i]._processed=false;
if(elements[i].ty==="gr"){this.resetElements(elements[i].it)
}}};
RepeaterModifier.prototype.cloneElements=function(elements){var newElements=JSON.parse(JSON.stringify(elements));
this.resetElements(newElements);
return newElements
};
RepeaterModifier.prototype.changeGroupRender=function(elements,renderFlag){var i;
var len=elements.length;
for(i=0;
i<len;
i+=1){elements[i]._render=renderFlag;
if(elements[i].ty==="gr"){this.changeGroupRender(elements[i].it,renderFlag)
}}};
RepeaterModifier.prototype.processShapes=function(_isFirstFrame){var items;
var itemsTransform;
var i;
var dir;
var cont;
var hasReloaded=false;
if(this._mdf||_isFirstFrame){var copies=Math.ceil(this.c.v);
if(this._groups.length<copies){while(this._groups.length<copies){var group={it:this.cloneElements(this._elements),ty:"gr"};
group.it.push({a:{a:0,ix:1,k:[0,0]},nm:"Transform",o:{a:0,ix:7,k:100},p:{a:0,ix:2,k:[0,0]},r:{a:1,ix:6,k:[{s:0,e:0,t:0},{s:0,e:0,t:1}]},s:{a:0,ix:3,k:[100,100]},sa:{a:0,ix:5,k:0},sk:{a:0,ix:4,k:0},ty:"tr"});
this.arr.splice(0,0,group);
this._groups.splice(0,0,group);
this._currentCopies+=1
}this.elem.reloadShapes();
hasReloaded=true
}cont=0;
var renderFlag;
for(i=0;
i<=this._groups.length-1;
i+=1){renderFlag=cont<copies;
this._groups[i]._render=renderFlag;
this.changeGroupRender(this._groups[i].it,renderFlag);
if(!renderFlag){var elems=this.elemsData[i].it;
var transformData=elems[elems.length-1];
if(transformData.transform.op.v!==0){transformData.transform.op._mdf=true;
transformData.transform.op.v=0
}else{transformData.transform.op._mdf=false
}}cont+=1
}this._currentCopies=copies;
var offset=this.o.v;
var offsetModulo=offset%1;
var roundOffset=offset>0?Math.floor(offset):Math.ceil(offset);
var pProps=this.pMatrix.props;
var rProps=this.rMatrix.props;
var sProps=this.sMatrix.props;
this.pMatrix.reset();
this.rMatrix.reset();
this.sMatrix.reset();
this.tMatrix.reset();
this.matrix.reset();
var iteration=0;
if(offset>0){while(iteration<roundOffset){this.applyTransforms(this.pMatrix,this.rMatrix,this.sMatrix,this.tr,1,false);
iteration+=1
}if(offsetModulo){this.applyTransforms(this.pMatrix,this.rMatrix,this.sMatrix,this.tr,offsetModulo,false);
iteration+=offsetModulo
}}else{if(offset<0){while(iteration>roundOffset){this.applyTransforms(this.pMatrix,this.rMatrix,this.sMatrix,this.tr,1,true);
iteration-=1
}if(offsetModulo){this.applyTransforms(this.pMatrix,this.rMatrix,this.sMatrix,this.tr,-offsetModulo,true);
iteration-=offsetModulo
}}}i=this.data.m===1?0:this._currentCopies-1;
dir=this.data.m===1?1:-1;
cont=this._currentCopies;
var j;
var jLen;
while(cont){items=this.elemsData[i].it;
itemsTransform=items[items.length-1].transform.mProps.v.props;
jLen=itemsTransform.length;
items[items.length-1].transform.mProps._mdf=true;
items[items.length-1].transform.op._mdf=true;
items[items.length-1].transform.op.v=this._currentCopies===1?this.so.v:this.so.v+(this.eo.v-this.so.v)*(i/(this._currentCopies-1));
if(iteration!==0){if(i!==0&&dir===1||i!==this._currentCopies-1&&dir===-1){this.applyTransforms(this.pMatrix,this.rMatrix,this.sMatrix,this.tr,1,false)
}this.matrix.transform(rProps[0],rProps[1],rProps[2],rProps[3],rProps[4],rProps[5],rProps[6],rProps[7],rProps[8],rProps[9],rProps[10],rProps[11],rProps[12],rProps[13],rProps[14],rProps[15]);
this.matrix.transform(sProps[0],sProps[1],sProps[2],sProps[3],sProps[4],sProps[5],sProps[6],sProps[7],sProps[8],sProps[9],sProps[10],sProps[11],sProps[12],sProps[13],sProps[14],sProps[15]);
this.matrix.transform(pProps[0],pProps[1],pProps[2],pProps[3],pProps[4],pProps[5],pProps[6],pProps[7],pProps[8],pProps[9],pProps[10],pProps[11],pProps[12],pProps[13],pProps[14],pProps[15]);
for(j=0;
j<jLen;
j+=1){itemsTransform[j]=this.matrix.props[j]
}this.matrix.reset()
}else{this.matrix.reset();
for(j=0;
j<jLen;
j+=1){itemsTransform[j]=this.matrix.props[j]
}}iteration+=1;
cont-=1;
i+=dir
}}else{cont=this._currentCopies;
i=0;
dir=1;
while(cont){items=this.elemsData[i].it;
itemsTransform=items[items.length-1].transform.mProps.v.props;
items[items.length-1].transform.mProps._mdf=false;
items[items.length-1].transform.op._mdf=false;
cont-=1;
i+=dir
}}return hasReloaded
};
RepeaterModifier.prototype.addShape=function(){};
function RoundCornersModifier(){}extendPrototype([ShapeModifier],RoundCornersModifier);
RoundCornersModifier.prototype.initModifierProperties=function(elem,data){this.getValue=this.processKeys;
this.rd=PropertyFactory.getProp(elem,data.r,0,null,this);
this._isAnimated=!!this.rd.effectsSequence.length
};
RoundCornersModifier.prototype.processPath=function(path,round){var clonedPath=shapePool.newElement();
clonedPath.c=path.c;
var i;
var len=path._length;
var currentV;
var currentI;
var currentO;
var closerV;
var distance;
var newPosPerc;
var index=0;
var vX;
var vY;
var oX;
var oY;
var iX;
var iY;
for(i=0;
i<len;
i+=1){currentV=path.v[i];
currentO=path.o[i];
currentI=path.i[i];
if(currentV[0]===currentO[0]&&currentV[1]===currentO[1]&&currentV[0]===currentI[0]&&currentV[1]===currentI[1]){if((i===0||i===len-1)&&!path.c){clonedPath.setTripleAt(currentV[0],currentV[1],currentO[0],currentO[1],currentI[0],currentI[1],index);
index+=1
}else{if(i===0){closerV=path.v[len-1]
}else{closerV=path.v[i-1]
}distance=Math.sqrt(Math.pow(currentV[0]-closerV[0],2)+Math.pow(currentV[1]-closerV[1],2));
newPosPerc=distance?Math.min(distance/2,round)/distance:0;
iX=currentV[0]+(closerV[0]-currentV[0])*newPosPerc;
vX=iX;
iY=currentV[1]-(currentV[1]-closerV[1])*newPosPerc;
vY=iY;
oX=vX-(vX-currentV[0])*roundCorner;
oY=vY-(vY-currentV[1])*roundCorner;
clonedPath.setTripleAt(vX,vY,oX,oY,iX,iY,index);
index+=1;
if(i===len-1){closerV=path.v[0]
}else{closerV=path.v[i+1]
}distance=Math.sqrt(Math.pow(currentV[0]-closerV[0],2)+Math.pow(currentV[1]-closerV[1],2));
newPosPerc=distance?Math.min(distance/2,round)/distance:0;
oX=currentV[0]+(closerV[0]-currentV[0])*newPosPerc;
vX=oX;
oY=currentV[1]+(closerV[1]-currentV[1])*newPosPerc;
vY=oY;
iX=vX-(vX-currentV[0])*roundCorner;
iY=vY-(vY-currentV[1])*roundCorner;
clonedPath.setTripleAt(vX,vY,oX,oY,iX,iY,index);
index+=1
}}else{clonedPath.setTripleAt(path.v[i][0],path.v[i][1],path.o[i][0],path.o[i][1],path.i[i][0],path.i[i][1],index);
index+=1
}}return clonedPath
};
RoundCornersModifier.prototype.processShapes=function(_isFirstFrame){var shapePaths;
var i;
var len=this.shapes.length;
var j;
var jLen;
var rd=this.rd.v;
if(rd!==0){var shapeData;
var localShapeCollection;
for(i=0;
i<len;
i+=1){shapeData=this.shapes[i];
localShapeCollection=shapeData.localShapeCollection;
if(!(!shapeData.shape._mdf&&!this._mdf&&!_isFirstFrame)){localShapeCollection.releaseShapes();
shapeData.shape._mdf=true;
shapePaths=shapeData.shape.paths.shapes;
jLen=shapeData.shape.paths._length;
for(j=0;
j<jLen;
j+=1){localShapeCollection.addShape(this.processPath(shapePaths[j],rd))
}}shapeData.shape.paths=shapeData.localShapeCollection
}}if(!this.dynamicProperties.length){this._mdf=false
}};
function floatEqual(a,b){return Math.abs(a-b)*100000<=Math.min(Math.abs(a),Math.abs(b))
}function floatZero(f){return Math.abs(f)<=0.00001
}function lerp(p0,p1,amount){return p0*(1-amount)+p1*amount
}function lerpPoint(p0,p1,amount){return[lerp(p0[0],p1[0],amount),lerp(p0[1],p1[1],amount)]
}function quadRoots(a,b,c){if(a===0){return[]
}var s=b*b-4*a*c;
if(s<0){return[]
}var singleRoot=-b/(2*a);
if(s===0){return[singleRoot]
}var delta=Math.sqrt(s)/(2*a);
return[singleRoot-delta,singleRoot+delta]
}function polynomialCoefficients(p0,p1,p2,p3){return[-p0+3*p1-3*p2+p3,3*p0-6*p1+3*p2,-3*p0+3*p1,p0]
}function singlePoint(p){return new PolynomialBezier(p,p,p,p,false)
}function PolynomialBezier(p0,p1,p2,p3,linearize){if(linearize&&pointEqual(p0,p1)){p1=lerpPoint(p0,p3,1/3)
}if(linearize&&pointEqual(p2,p3)){p2=lerpPoint(p0,p3,2/3)
}var coeffx=polynomialCoefficients(p0[0],p1[0],p2[0],p3[0]);
var coeffy=polynomialCoefficients(p0[1],p1[1],p2[1],p3[1]);
this.a=[coeffx[0],coeffy[0]];
this.b=[coeffx[1],coeffy[1]];
this.c=[coeffx[2],coeffy[2]];
this.d=[coeffx[3],coeffy[3]];
this.points=[p0,p1,p2,p3]
}PolynomialBezier.prototype.point=function(t){return[((this.a[0]*t+this.b[0])*t+this.c[0])*t+this.d[0],((this.a[1]*t+this.b[1])*t+this.c[1])*t+this.d[1]]
};
PolynomialBezier.prototype.derivative=function(t){return[(3*t*this.a[0]+2*this.b[0])*t+this.c[0],(3*t*this.a[1]+2*this.b[1])*t+this.c[1]]
};
PolynomialBezier.prototype.tangentAngle=function(t){var p=this.derivative(t);
return Math.atan2(p[1],p[0])
};
PolynomialBezier.prototype.normalAngle=function(t){var p=this.derivative(t);
return Math.atan2(p[0],p[1])
};
PolynomialBezier.prototype.inflectionPoints=function(){var denom=this.a[1]*this.b[0]-this.a[0]*this.b[1];
if(floatZero(denom)){return[]
}var tcusp=-0.5*(this.a[1]*this.c[0]-this.a[0]*this.c[1])/denom;
var square=tcusp*tcusp-1/3*(this.b[1]*this.c[0]-this.b[0]*this.c[1])/denom;
if(square<0){return[]
}var root=Math.sqrt(square);
if(floatZero(root)){if(root>0&&root<1){return[tcusp]
}return[]
}return[tcusp-root,tcusp+root].filter(function(r){return r>0&&r<1
})
};
PolynomialBezier.prototype.split=function(t){if(t<=0){return[singlePoint(this.points[0]),this]
}if(t>=1){return[this,singlePoint(this.points[this.points.length-1])]
}var p10=lerpPoint(this.points[0],this.points[1],t);
var p11=lerpPoint(this.points[1],this.points[2],t);
var p12=lerpPoint(this.points[2],this.points[3],t);
var p20=lerpPoint(p10,p11,t);
var p21=lerpPoint(p11,p12,t);
var p3=lerpPoint(p20,p21,t);
return[new PolynomialBezier(this.points[0],p10,p20,p3,true),new PolynomialBezier(p3,p21,p12,this.points[3],true)]
};
function extrema(bez,comp){var min=bez.points[0][comp];
var max=bez.points[bez.points.length-1][comp];
if(min>max){var e=max;
max=min;
min=e
}var f=quadRoots(3*bez.a[comp],2*bez.b[comp],bez.c[comp]);
for(var i=0;
i<f.length;
i+=1){if(f[i]>0&&f[i]<1){var val=bez.point(f[i])[comp];
if(val<min){min=val
}else{if(val>max){max=val
}}}}return{min:min,max:max}
}PolynomialBezier.prototype.bounds=function(){return{x:extrema(this,0),y:extrema(this,1)}
};
PolynomialBezier.prototype.boundingBox=function(){var bounds=this.bounds();
return{left:bounds.x.min,right:bounds.x.max,top:bounds.y.min,bottom:bounds.y.max,width:bounds.x.max-bounds.x.min,height:bounds.y.max-bounds.y.min,cx:(bounds.x.max+bounds.x.min)/2,cy:(bounds.y.max+bounds.y.min)/2}
};
function intersectData(bez,t1,t2){var box=bez.boundingBox();
return{cx:box.cx,cy:box.cy,width:box.width,height:box.height,bez:bez,t:(t1+t2)/2,t1:t1,t2:t2}
}function splitData(data){var split=data.bez.split(0.5);
return[intersectData(split[0],data.t1,data.t),intersectData(split[1],data.t,data.t2)]
}function boxIntersect(b1,b2){return Math.abs(b1.cx-b2.cx)*2<b1.width+b2.width&&Math.abs(b1.cy-b2.cy)*2<b1.height+b2.height
}function intersectsImpl(d1,d2,depth,tolerance,intersections,maxRecursion){if(!boxIntersect(d1,d2)){return
}if(depth>=maxRecursion||d1.width<=tolerance&&d1.height<=tolerance&&d2.width<=tolerance&&d2.height<=tolerance){intersections.push([d1.t,d2.t]);
return
}var d1s=splitData(d1);
var d2s=splitData(d2);
intersectsImpl(d1s[0],d2s[0],depth+1,tolerance,intersections,maxRecursion);
intersectsImpl(d1s[0],d2s[1],depth+1,tolerance,intersections,maxRecursion);
intersectsImpl(d1s[1],d2s[0],depth+1,tolerance,intersections,maxRecursion);
intersectsImpl(d1s[1],d2s[1],depth+1,tolerance,intersections,maxRecursion)
}PolynomialBezier.prototype.intersections=function(other,tolerance,maxRecursion){if(tolerance===undefined){tolerance=2
}if(maxRecursion===undefined){maxRecursion=7
}var intersections=[];
intersectsImpl(intersectData(this,0,1),intersectData(other,0,1),0,tolerance,intersections,maxRecursion);
return intersections
};
PolynomialBezier.shapeSegment=function(shapePath,index){var nextIndex=(index+1)%shapePath.length();
return new PolynomialBezier(shapePath.v[index],shapePath.o[index],shapePath.i[nextIndex],shapePath.v[nextIndex],true)
};
PolynomialBezier.shapeSegmentInverted=function(shapePath,index){var nextIndex=(index+1)%shapePath.length();
return new PolynomialBezier(shapePath.v[nextIndex],shapePath.i[nextIndex],shapePath.o[index],shapePath.v[index],true)
};
function crossProduct(a,b){return[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]
}function lineIntersection(start1,end1,start2,end2){var v1=[start1[0],start1[1],1];
var v2=[end1[0],end1[1],1];
var v3=[start2[0],start2[1],1];
var v4=[end2[0],end2[1],1];
var r=crossProduct(crossProduct(v1,v2),crossProduct(v3,v4));
if(floatZero(r[2])){return null
}return[r[0]/r[2],r[1]/r[2]]
}function polarOffset(p,angle,length){return[p[0]+Math.cos(angle)*length,p[1]-Math.sin(angle)*length]
}function pointDistance(p1,p2){return Math.hypot(p1[0]-p2[0],p1[1]-p2[1])
}function pointEqual(p1,p2){return floatEqual(p1[0],p2[0])&&floatEqual(p1[1],p2[1])
}function ZigZagModifier(){}extendPrototype([ShapeModifier],ZigZagModifier);
ZigZagModifier.prototype.initModifierProperties=function(elem,data){this.getValue=this.processKeys;
this.amplitude=PropertyFactory.getProp(elem,data.s,0,null,this);
this.frequency=PropertyFactory.getProp(elem,data.r,0,null,this);
this.pointsType=PropertyFactory.getProp(elem,data.pt,0,null,this);
this._isAnimated=this.amplitude.effectsSequence.length!==0||this.frequency.effectsSequence.length!==0||this.pointsType.effectsSequence.length!==0
};
function setPoint(outputBezier,point,angle,direction,amplitude,outAmplitude,inAmplitude){var angO=angle-Math.PI/2;
var angI=angle+Math.PI/2;
var px=point[0]+Math.cos(angle)*direction*amplitude;
var py=point[1]-Math.sin(angle)*direction*amplitude;
outputBezier.setTripleAt(px,py,px+Math.cos(angO)*outAmplitude,py-Math.sin(angO)*outAmplitude,px+Math.cos(angI)*inAmplitude,py-Math.sin(angI)*inAmplitude,outputBezier.length())
}function getPerpendicularVector(pt1,pt2){var vector=[pt2[0]-pt1[0],pt2[1]-pt1[1]];
var rot=-Math.PI*0.5;
var rotatedVector=[Math.cos(rot)*vector[0]-Math.sin(rot)*vector[1],Math.sin(rot)*vector[0]+Math.cos(rot)*vector[1]];
return rotatedVector
}function getProjectingAngle(path,cur){var prevIndex=cur===0?path.length()-1:cur-1;
var nextIndex=(cur+1)%path.length();
var prevPoint=path.v[prevIndex];
var nextPoint=path.v[nextIndex];
var pVector=getPerpendicularVector(prevPoint,nextPoint);
return Math.atan2(0,1)-Math.atan2(pVector[1],pVector[0])
}function zigZagCorner(outputBezier,path,cur,amplitude,frequency,pointType,direction){var angle=getProjectingAngle(path,cur);
var point=path.v[cur%path._length];
var prevPoint=path.v[cur===0?path._length-1:cur-1];
var nextPoint=path.v[(cur+1)%path._length];
var prevDist=pointType===2?Math.sqrt(Math.pow(point[0]-prevPoint[0],2)+Math.pow(point[1]-prevPoint[1],2)):0;
var nextDist=pointType===2?Math.sqrt(Math.pow(point[0]-nextPoint[0],2)+Math.pow(point[1]-nextPoint[1],2)):0;
setPoint(outputBezier,path.v[cur%path._length],angle,direction,amplitude,nextDist/((frequency+1)*2),prevDist/((frequency+1)*2),pointType)
}function zigZagSegment(outputBezier,segment,amplitude,frequency,pointType,direction){for(var i=0;
i<frequency;
i+=1){var t=(i+1)/(frequency+1);
var dist=pointType===2?Math.sqrt(Math.pow(segment.points[3][0]-segment.points[0][0],2)+Math.pow(segment.points[3][1]-segment.points[0][1],2)):0;
var angle=segment.normalAngle(t);
var point=segment.point(t);
setPoint(outputBezier,point,angle,direction,amplitude,dist/((frequency+1)*2),dist/((frequency+1)*2),pointType);
direction=-direction
}return direction
}ZigZagModifier.prototype.processPath=function(path,amplitude,frequency,pointType){var count=path._length;
var clonedPath=shapePool.newElement();
clonedPath.c=path.c;
if(!path.c){count-=1
}if(count===0){return clonedPath
}var direction=-1;
var segment=PolynomialBezier.shapeSegment(path,0);
zigZagCorner(clonedPath,path,0,amplitude,frequency,pointType,direction);
for(var i=0;
i<count;
i+=1){direction=zigZagSegment(clonedPath,segment,amplitude,frequency,pointType,-direction);
if(i===count-1&&!path.c){segment=null
}else{segment=PolynomialBezier.shapeSegment(path,(i+1)%count)
}zigZagCorner(clonedPath,path,i+1,amplitude,frequency,pointType,direction)
}return clonedPath
};
ZigZagModifier.prototype.processShapes=function(_isFirstFrame){var shapePaths;
var i;
var len=this.shapes.length;
var j;
var jLen;
var amplitude=this.amplitude.v;
var frequency=Math.max(0,Math.round(this.frequency.v));
var pointType=this.pointsType.v;
if(amplitude!==0){var shapeData;
var localShapeCollection;
for(i=0;
i<len;
i+=1){shapeData=this.shapes[i];
localShapeCollection=shapeData.localShapeCollection;
if(!(!shapeData.shape._mdf&&!this._mdf&&!_isFirstFrame)){localShapeCollection.releaseShapes();
shapeData.shape._mdf=true;
shapePaths=shapeData.shape.paths.shapes;
jLen=shapeData.shape.paths._length;
for(j=0;
j<jLen;
j+=1){localShapeCollection.addShape(this.processPath(shapePaths[j],amplitude,frequency,pointType))
}}shapeData.shape.paths=shapeData.localShapeCollection
}}if(!this.dynamicProperties.length){this._mdf=false
}};
function linearOffset(p1,p2,amount){var angle=Math.atan2(p2[0]-p1[0],p2[1]-p1[1]);
return[polarOffset(p1,angle,amount),polarOffset(p2,angle,amount)]
}function offsetSegment(segment,amount){var p0;
var p1a;
var p1b;
var p2b;
var p2a;
var p3;
var e;
e=linearOffset(segment.points[0],segment.points[1],amount);
p0=e[0];
p1a=e[1];
e=linearOffset(segment.points[1],segment.points[2],amount);
p1b=e[0];
p2b=e[1];
e=linearOffset(segment.points[2],segment.points[3],amount);
p2a=e[0];
p3=e[1];
var p1=lineIntersection(p0,p1a,p1b,p2b);
if(p1===null){p1=p1a
}var p2=lineIntersection(p2a,p3,p1b,p2b);
if(p2===null){p2=p2a
}return new PolynomialBezier(p0,p1,p2,p3)
}function joinLines(outputBezier,seg1,seg2,lineJoin,miterLimit){var p0=seg1.points[3];
var p1=seg2.points[0];
if(lineJoin===3){return p0
}if(pointEqual(p0,p1)){return p0
}if(lineJoin===2){var angleOut=-seg1.tangentAngle(1);
var angleIn=-seg2.tangentAngle(0)+Math.PI;
var center=lineIntersection(p0,polarOffset(p0,angleOut+Math.PI/2,100),p1,polarOffset(p1,angleOut+Math.PI/2,100));
var radius=center?pointDistance(center,p0):pointDistance(p0,p1)/2;
var tan=polarOffset(p0,angleOut,2*radius*roundCorner);
outputBezier.setXYAt(tan[0],tan[1],"o",outputBezier.length()-1);
tan=polarOffset(p1,angleIn,2*radius*roundCorner);
outputBezier.setTripleAt(p1[0],p1[1],p1[0],p1[1],tan[0],tan[1],outputBezier.length());
return p1
}var t0=pointEqual(p0,seg1.points[2])?seg1.points[0]:seg1.points[2];
var t1=pointEqual(p1,seg2.points[1])?seg2.points[3]:seg2.points[1];
var intersection=lineIntersection(t0,p0,p1,t1);
if(intersection&&pointDistance(intersection,p0)<miterLimit){outputBezier.setTripleAt(intersection[0],intersection[1],intersection[0],intersection[1],intersection[0],intersection[1],outputBezier.length());
return intersection
}return p0
}function getIntersection(a,b){var intersect=a.intersections(b);
if(intersect.length&&floatEqual(intersect[0][0],1)){intersect.shift()
}if(intersect.length){return intersect[0]
}return null
}function pruneSegmentIntersection(a,b){var outa=a.slice();
var outb=b.slice();
var intersect=getIntersection(a[a.length-1],b[0]);
if(intersect){outa[a.length-1]=a[a.length-1].split(intersect[0])[0];
outb[0]=b[0].split(intersect[1])[1]
}if(a.length>1&&b.length>1){intersect=getIntersection(a[0],b[b.length-1]);
if(intersect){return[[a[0].split(intersect[0])[0]],[b[b.length-1].split(intersect[1])[1]]]
}}return[outa,outb]
}function pruneIntersections(segments){var e;
for(var i=1;
i<segments.length;
i+=1){e=pruneSegmentIntersection(segments[i-1],segments[i]);
segments[i-1]=e[0];
segments[i]=e[1]
}if(segments.length>1){e=pruneSegmentIntersection(segments[segments.length-1],segments[0]);
segments[segments.length-1]=e[0];
segments[0]=e[1]
}return segments
}function offsetSegmentSplit(segment,amount){var flex=segment.inflectionPoints();
var left;
var right;
var split;
var mid;
if(flex.length===0){return[offsetSegment(segment,amount)]
}if(flex.length===1||floatEqual(flex[1],1)){split=segment.split(flex[0]);
left=split[0];
right=split[1];
return[offsetSegment(left,amount),offsetSegment(right,amount)]
}split=segment.split(flex[0]);
left=split[0];
var t=(flex[1]-flex[0])/(1-flex[0]);
split=split[1].split(t);
mid=split[0];
right=split[1];
return[offsetSegment(left,amount),offsetSegment(mid,amount),offsetSegment(right,amount)]
}function OffsetPathModifier(){}extendPrototype([ShapeModifier],OffsetPathModifier);
OffsetPathModifier.prototype.initModifierProperties=function(elem,data){this.getValue=this.processKeys;
this.amount=PropertyFactory.getProp(elem,data.a,0,null,this);
this.miterLimit=PropertyFactory.getProp(elem,data.ml,0,null,this);
this.lineJoin=data.lj;
this._isAnimated=this.amount.effectsSequence.length!==0
};
OffsetPathModifier.prototype.processPath=function(inputBezier,amount,lineJoin,miterLimit){var outputBezier=shapePool.newElement();
outputBezier.c=inputBezier.c;
var count=inputBezier.length();
if(!inputBezier.c){count-=1
}var i;
var j;
var segment;
var multiSegments=[];
for(i=0;
i<count;
i+=1){segment=PolynomialBezier.shapeSegment(inputBezier,i);
multiSegments.push(offsetSegmentSplit(segment,amount))
}if(!inputBezier.c){for(i=count-1;
i>=0;
i-=1){segment=PolynomialBezier.shapeSegmentInverted(inputBezier,i);
multiSegments.push(offsetSegmentSplit(segment,amount))
}}multiSegments=pruneIntersections(multiSegments);
var lastPoint=null;
var lastSeg=null;
for(i=0;
i<multiSegments.length;
i+=1){var multiSegment=multiSegments[i];
if(lastSeg){lastPoint=joinLines(outputBezier,lastSeg,multiSegment[0],lineJoin,miterLimit)
}lastSeg=multiSegment[multiSegment.length-1];
for(j=0;
j<multiSegment.length;
j+=1){segment=multiSegment[j];
if(lastPoint&&pointEqual(segment.points[0],lastPoint)){outputBezier.setXYAt(segment.points[1][0],segment.points[1][1],"o",outputBezier.length()-1)
}else{outputBezier.setTripleAt(segment.points[0][0],segment.points[0][1],segment.points[1][0],segment.points[1][1],segment.points[0][0],segment.points[0][1],outputBezier.length())
}outputBezier.setTripleAt(segment.points[3][0],segment.points[3][1],segment.points[3][0],segment.points[3][1],segment.points[2][0],segment.points[2][1],outputBezier.length());
lastPoint=segment.points[3]
}}if(multiSegments.length){joinLines(outputBezier,lastSeg,multiSegments[0][0],lineJoin,miterLimit)
}return outputBezier
};
OffsetPathModifier.prototype.processShapes=function(_isFirstFrame){var shapePaths;
var i;
var len=this.shapes.length;
var j;
var jLen;
var amount=this.amount.v;
var miterLimit=this.miterLimit.v;
var lineJoin=this.lineJoin;
if(amount!==0){var shapeData;
var localShapeCollection;
for(i=0;
i<len;
i+=1){shapeData=this.shapes[i];
localShapeCollection=shapeData.localShapeCollection;
if(!(!shapeData.shape._mdf&&!this._mdf&&!_isFirstFrame)){localShapeCollection.releaseShapes();
shapeData.shape._mdf=true;
shapePaths=shapeData.shape.paths.shapes;
jLen=shapeData.shape.paths._length;
for(j=0;
j<jLen;
j+=1){localShapeCollection.addShape(this.processPath(shapePaths[j],amount,lineJoin,miterLimit))
}}shapeData.shape.paths=shapeData.localShapeCollection
}}if(!this.dynamicProperties.length){this._mdf=false
}};
function getFontProperties(fontData){var styles=fontData.fStyle?fontData.fStyle.split(" "):[];
var fWeight="normal";
var fStyle="normal";
var len=styles.length;
var styleName;
for(var i=0;
i<len;
i+=1){styleName=styles[i].toLowerCase();
switch(styleName){case"italic":fStyle="italic";
break;
case"bold":fWeight="700";
break;
case"black":fWeight="900";
break;
case"medium":fWeight="500";
break;
case"regular":case"normal":fWeight="400";
break;
case"light":case"thin":fWeight="200";
break;
default:break
}}return{style:fStyle,weight:fontData.fWeight||fWeight}
}var FontManager=function(){var maxWaitingTime=5000;
var emptyChar={w:0,size:0,shapes:[],data:{shapes:[]}};
var combinedCharacters=[];
combinedCharacters=combinedCharacters.concat([2304,2305,2306,2307,2362,2363,2364,2364,2366,2367,2368,2369,2370,2371,2372,2373,2374,2375,2376,2377,2378,2379,2380,2381,2382,2383,2387,2388,2389,2390,2391,2402,2403]);
var surrogateModifiers=["d83cdffb","d83cdffc","d83cdffd","d83cdffe","d83cdfff"];
var zeroWidthJoiner=[65039,8205];
function trimFontOptions(font){var familyArray=font.split(",");
var i;
var len=familyArray.length;
var enabledFamilies=[];
for(i=0;
i<len;
i+=1){if(familyArray[i]!=="sans-serif"&&familyArray[i]!=="monospace"){enabledFamilies.push(familyArray[i])
}}return enabledFamilies.join(",")
}function setUpNode(font,family){var parentNode=createTag("span");
parentNode.setAttribute("aria-hidden",true);
parentNode.style.fontFamily=family;
var node=createTag("span");
node.innerText="giItT1WQy@!-/#";
parentNode.style.position="absolute";
parentNode.style.left="-10000px";
parentNode.style.top="-10000px";
parentNode.style.fontSize="300px";
parentNode.style.fontVariant="normal";
parentNode.style.fontStyle="normal";
parentNode.style.fontWeight="normal";
parentNode.style.letterSpacing="0";
parentNode.appendChild(node);
document.body.appendChild(parentNode);
var width=node.offsetWidth;
node.style.fontFamily=trimFontOptions(font)+", "+family;
return{node:node,w:width,parent:parentNode}
}function checkLoadedFonts(){var i;
var len=this.fonts.length;
var node;
var w;
var loadedCount=len;
for(i=0;
i<len;
i+=1){if(this.fonts[i].loaded){loadedCount-=1
}else{if(this.fonts[i].fOrigin==="n"||this.fonts[i].origin===0){this.fonts[i].loaded=true
}else{node=this.fonts[i].monoCase.node;
w=this.fonts[i].monoCase.w;
if(node.offsetWidth!==w){loadedCount-=1;
this.fonts[i].loaded=true
}else{node=this.fonts[i].sansCase.node;
w=this.fonts[i].sansCase.w;
if(node.offsetWidth!==w){loadedCount-=1;
this.fonts[i].loaded=true
}}if(this.fonts[i].loaded){this.fonts[i].sansCase.parent.parentNode.removeChild(this.fonts[i].sansCase.parent);
this.fonts[i].monoCase.parent.parentNode.removeChild(this.fonts[i].monoCase.parent)
}}}}if(loadedCount!==0&&Date.now()-this.initTime<maxWaitingTime){setTimeout(this.checkLoadedFontsBinded,20)
}else{setTimeout(this.setIsLoadedBinded,10)
}}function createHelper(fontData,def){var engine=document.body&&def?"svg":"canvas";
var helper;
var fontProps=getFontProperties(fontData);
if(engine==="svg"){var tHelper=createNS("text");
tHelper.style.fontSize="100px";
tHelper.setAttribute("font-family",fontData.fFamily);
tHelper.setAttribute("font-style",fontProps.style);
tHelper.setAttribute("font-weight",fontProps.weight);
tHelper.textContent="1";
if(fontData.fClass){tHelper.style.fontFamily="inherit";
tHelper.setAttribute("class",fontData.fClass)
}else{tHelper.style.fontFamily=fontData.fFamily
}def.appendChild(tHelper);
helper=tHelper
}else{var tCanvasHelper=new OffscreenCanvas(500,500).getContext("2d");
tCanvasHelper.font=fontProps.style+" "+fontProps.weight+" 100px "+fontData.fFamily;
helper=tCanvasHelper
}function measure(text){if(engine==="svg"){helper.textContent=text;
return helper.getComputedTextLength()
}return helper.measureText(text).width
}return{measureText:measure}
}function addFonts(fontData,defs){if(!fontData){this.isLoaded=true;
return
}if(this.chars){this.isLoaded=true;
this.fonts=fontData.list;
return
}if(!document.body){this.isLoaded=true;
fontData.list.forEach(function(data){data.helper=createHelper(data);
data.cache={}
});
this.fonts=fontData.list;
return
}var fontArr=fontData.list;
var i;
var len=fontArr.length;
var _pendingFonts=len;
for(i=0;
i<len;
i+=1){var shouldLoadFont=true;
var loadedSelector;
var j;
fontArr[i].loaded=false;
fontArr[i].monoCase=setUpNode(fontArr[i].fFamily,"monospace");
fontArr[i].sansCase=setUpNode(fontArr[i].fFamily,"sans-serif");
if(!fontArr[i].fPath){fontArr[i].loaded=true;
_pendingFonts-=1
}else{if(fontArr[i].fOrigin==="p"||fontArr[i].origin===3){loadedSelector=document.querySelectorAll('style[f-forigin="p"][f-family="'+fontArr[i].fFamily+'"], style[f-origin="3"][f-family="'+fontArr[i].fFamily+'"]');
if(loadedSelector.length>0){shouldLoadFont=false
}if(shouldLoadFont){var s=createTag("style");
s.setAttribute("f-forigin",fontArr[i].fOrigin);
s.setAttribute("f-origin",fontArr[i].origin);
s.setAttribute("f-family",fontArr[i].fFamily);
s.type="text/css";
s.innerText="@font-face {font-family: "+fontArr[i].fFamily+"; font-style: normal; src: url('"+fontArr[i].fPath+"');}";
defs.appendChild(s)
}}else{if(fontArr[i].fOrigin==="g"||fontArr[i].origin===1){loadedSelector=document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]');
for(j=0;
j<loadedSelector.length;
j+=1){if(loadedSelector[j].href.indexOf(fontArr[i].fPath)!==-1){shouldLoadFont=false
}}if(shouldLoadFont){var l=createTag("link");
l.setAttribute("f-forigin",fontArr[i].fOrigin);
l.setAttribute("f-origin",fontArr[i].origin);
l.type="text/css";
l.rel="stylesheet";
l.href=fontArr[i].fPath;
document.body.appendChild(l)
}}else{if(fontArr[i].fOrigin==="t"||fontArr[i].origin===2){loadedSelector=document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]');
for(j=0;
j<loadedSelector.length;
j+=1){if(fontArr[i].fPath===loadedSelector[j].src){shouldLoadFont=false
}}if(shouldLoadFont){var sc=createTag("link");
sc.setAttribute("f-forigin",fontArr[i].fOrigin);
sc.setAttribute("f-origin",fontArr[i].origin);
sc.setAttribute("rel","stylesheet");
sc.setAttribute("href",fontArr[i].fPath);
defs.appendChild(sc)
}}}}}fontArr[i].helper=createHelper(fontArr[i],defs);
fontArr[i].cache={};
this.fonts.push(fontArr[i])
}if(_pendingFonts===0){this.isLoaded=true
}else{setTimeout(this.checkLoadedFonts.bind(this),100)
}}function addChars(chars){if(!chars){return
}if(!this.chars){this.chars=[]
}var i;
var len=chars.length;
var j;
var jLen=this.chars.length;
var found;
for(i=0;
i<len;
i+=1){j=0;
found=false;
while(j<jLen){if(this.chars[j].style===chars[i].style&&this.chars[j].fFamily===chars[i].fFamily&&this.chars[j].ch===chars[i].ch){found=true
}j+=1
}if(!found){this.chars.push(chars[i]);
jLen+=1
}}}function getCharData(_char,style,font){var i=0;
var len=this.chars.length;
while(i<len){if(this.chars[i].ch===_char&&this.chars[i].style===style&&this.chars[i].fFamily===font){return this.chars[i]
}i+=1
}if((typeof _char==="string"&&_char.charCodeAt(0)!==13||!_char)&&console&&console.warn&&!this._warned){this._warned=true;
console.warn("Missing character from exported characters list: ",_char,style,font)
}return emptyChar
}function measureText(_char2,fontName,size){var fontData=this.getFontByName(fontName);
var index=_char2.charCodeAt(0);
if(!fontData.cache[index+1]){var tHelper=fontData.helper;
if(_char2===" "){var doubleSize=tHelper.measureText("|"+_char2+"|");
var singleSize=tHelper.measureText("||");
fontData.cache[index+1]=(doubleSize-singleSize)/100
}else{fontData.cache[index+1]=tHelper.measureText(_char2)/100
}}return fontData.cache[index+1]*size
}function getFontByName(name){var i=0;
var len=this.fonts.length;
while(i<len){if(this.fonts[i].fName===name){return this.fonts[i]
}i+=1
}return this.fonts[0]
}function isModifier(firstCharCode,secondCharCode){var sum=firstCharCode.toString(16)+secondCharCode.toString(16);
return surrogateModifiers.indexOf(sum)!==-1
}function isZeroWidthJoiner(firstCharCode,secondCharCode){if(!secondCharCode){return firstCharCode===zeroWidthJoiner[1]
}return firstCharCode===zeroWidthJoiner[0]&&secondCharCode===zeroWidthJoiner[1]
}function isCombinedCharacter(_char3){return combinedCharacters.indexOf(_char3)!==-1
}function setIsLoaded(){this.isLoaded=true
}var Font=function Font(){this.fonts=[];
this.chars=null;
this.typekitLoaded=0;
this.isLoaded=false;
this._warned=false;
this.initTime=Date.now();
this.setIsLoadedBinded=this.setIsLoaded.bind(this);
this.checkLoadedFontsBinded=this.checkLoadedFonts.bind(this)
};
Font.isModifier=isModifier;
Font.isZeroWidthJoiner=isZeroWidthJoiner;
Font.isCombinedCharacter=isCombinedCharacter;
var fontPrototype={addChars:addChars,addFonts:addFonts,getCharData:getCharData,getFontByName:getFontByName,measureText:measureText,checkLoadedFonts:checkLoadedFonts,setIsLoaded:setIsLoaded};
Font.prototype=fontPrototype;
return Font
}();
function SlotManager(animationData){this.animationData=animationData
}SlotManager.prototype.getProp=function(data){if(this.animationData.slots&&this.animationData.slots[data.sid]){return Object.assign(data,this.animationData.slots[data.sid].p)
}return data
};
function slotFactory(animationData){return new SlotManager(animationData)
}function RenderableElement(){}RenderableElement.prototype={initRenderable:function initRenderable(){this.isInRange=false;
this.hidden=false;
this.isTransparent=false;
this.renderableComponents=[]
},addRenderableComponent:function addRenderableComponent(component){if(this.renderableComponents.indexOf(component)===-1){this.renderableComponents.push(component)
}},removeRenderableComponent:function removeRenderableComponent(component){if(this.renderableComponents.indexOf(component)!==-1){this.renderableComponents.splice(this.renderableComponents.indexOf(component),1)
}},prepareRenderableFrame:function prepareRenderableFrame(num){this.checkLayerLimits(num)
},checkTransparency:function checkTransparency(){if(this.finalTransform.mProp.o.v<=0){if(!this.isTransparent&&this.globalData.renderConfig.hideOnTransparent){this.isTransparent=true;
this.hide()
}}else{if(this.isTransparent){this.isTransparent=false;
this.show()
}}},checkLayerLimits:function checkLayerLimits(num){if(this.data.ip-this.data.st<=num&&this.data.op-this.data.st>num){if(this.isInRange!==true){this.globalData._mdf=true;
this._mdf=true;
this.isInRange=true;
this.show()
}}else{if(this.isInRange!==false){this.globalData._mdf=true;
this.isInRange=false;
this.hide()
}}},renderRenderable:function renderRenderable(){var i;
var len=this.renderableComponents.length;
for(i=0;
i<len;
i+=1){this.renderableComponents[i].renderFrame(this._isFirstFrame)
}},sourceRectAtTime:function sourceRectAtTime(){return{top:0,left:0,width:100,height:100}
},getLayerSize:function getLayerSize(){if(this.data.ty===5){return{w:this.data.textData.width,h:this.data.textData.height}
}return{w:this.data.width,h:this.data.height}
}};
var getBlendMode=function(){var blendModeEnums={0:"source-over",1:"multiply",2:"screen",3:"overlay",4:"darken",5:"lighten",6:"color-dodge",7:"color-burn",8:"hard-light",9:"soft-light",10:"difference",11:"exclusion",12:"hue",13:"saturation",14:"color",15:"luminosity"};
return function(mode){return blendModeEnums[mode]||""
}
}();
function SliderEffect(data,elem,container){this.p=PropertyFactory.getProp(elem,data.v,0,0,container)
}function AngleEffect(data,elem,container){this.p=PropertyFactory.getProp(elem,data.v,0,0,container)
}function ColorEffect(data,elem,container){this.p=PropertyFactory.getProp(elem,data.v,1,0,container)
}function PointEffect(data,elem,container){this.p=PropertyFactory.getProp(elem,data.v,1,0,container)
}function LayerIndexEffect(data,elem,container){this.p=PropertyFactory.getProp(elem,data.v,0,0,container)
}function MaskIndexEffect(data,elem,container){this.p=PropertyFactory.getProp(elem,data.v,0,0,container)
}function CheckboxEffect(data,elem,container){this.p=PropertyFactory.getProp(elem,data.v,0,0,container)
}function NoValueEffect(){this.p={}
}function EffectsManager(data,element){var effects=data.ef||[];
this.effectElements=[];
var i;
var len=effects.length;
var effectItem;
for(i=0;
i<len;
i+=1){effectItem=new GroupEffect(effects[i],element);
this.effectElements.push(effectItem)
}}function GroupEffect(data,element){this.init(data,element)
}extendPrototype([DynamicPropertyContainer],GroupEffect);
GroupEffect.prototype.getValue=GroupEffect.prototype.iterateDynamicProperties;
GroupEffect.prototype.init=function(data,element){this.data=data;
this.effectElements=[];
this.initDynamicPropertyContainer(element);
var i;
var len=this.data.ef.length;
var eff;
var effects=this.data.ef;
for(i=0;
i<len;
i+=1){eff=null;
switch(effects[i].ty){case 0:eff=new SliderEffect(effects[i],element,this);
break;
case 1:eff=new AngleEffect(effects[i],element,this);
break;
case 2:eff=new ColorEffect(effects[i],element,this);
break;
case 3:eff=new PointEffect(effects[i],element,this);
break;
case 4:case 7:eff=new CheckboxEffect(effects[i],element,this);
break;
case 10:eff=new LayerIndexEffect(effects[i],element,this);
break;
case 11:eff=new MaskIndexEffect(effects[i],element,this);
break;
case 5:eff=new EffectsManager(effects[i],element,this);
break;
default:eff=new NoValueEffect(effects[i],element,this);
break
}if(eff){this.effectElements.push(eff)
}}};
function BaseElement(){}BaseElement.prototype={checkMasks:function checkMasks(){if(!this.data.hasMask){return false
}var i=0;
var len=this.data.masksProperties.length;
while(i<len){if(this.data.masksProperties[i].mode!=="n"&&this.data.masksProperties[i].cl!==false){return true
}i+=1
}return false
},initExpressions:function initExpressions(){var expressionsInterfaces=getExpressionInterfaces();
if(!expressionsInterfaces){return
}var LayerExpressionInterface=expressionsInterfaces("layer");
var EffectsExpressionInterface=expressionsInterfaces("effects");
var ShapeExpressionInterface=expressionsInterfaces("shape");
var TextExpressionInterface=expressionsInterfaces("text");
var CompExpressionInterface=expressionsInterfaces("comp");
this.layerInterface=LayerExpressionInterface(this);
if(this.data.hasMask&&this.maskManager){this.layerInterface.registerMaskInterface(this.maskManager)
}var effectsInterface=EffectsExpressionInterface.createEffectsInterface(this,this.layerInterface);
this.layerInterface.registerEffectsInterface(effectsInterface);
if(this.data.ty===0||this.data.xt){this.compInterface=CompExpressionInterface(this)
}else{if(this.data.ty===4){this.layerInterface.shapeInterface=ShapeExpressionInterface(this.shapesData,this.itemsData,this.layerInterface);
this.layerInterface.content=this.layerInterface.shapeInterface
}else{if(this.data.ty===5){this.layerInterface.textInterface=TextExpressionInterface(this);
this.layerInterface.text=this.layerInterface.textInterface
}}}},setBlendMode:function setBlendMode(){var blendModeValue=getBlendMode(this.data.bm);
var elem=this.baseElement||this.layerElement;
elem.style["mix-blend-mode"]=blendModeValue
},initBaseData:function initBaseData(data,globalData,comp){this.globalData=globalData;
this.comp=comp;
this.data=data;
this.layerId=createElementID();
if(!this.data.sr){this.data.sr=1
}this.effectsManager=new EffectsManager(this.data,this,this.dynamicProperties)
},getType:function getType(){return this.type
},sourceRectAtTime:function sourceRectAtTime(){}};
function FrameElement(){}FrameElement.prototype={initFrame:function initFrame(){this._isFirstFrame=false;
this.dynamicProperties=[];
this._mdf=false
},prepareProperties:function prepareProperties(num,isVisible){var i;
var len=this.dynamicProperties.length;
for(i=0;
i<len;
i+=1){if(isVisible||this._isParent&&this.dynamicProperties[i].propType==="transform"){this.dynamicProperties[i].getValue();
if(this.dynamicProperties[i]._mdf){this.globalData._mdf=true;
this._mdf=true
}}}},addDynamicProperty:function addDynamicProperty(prop){if(this.dynamicProperties.indexOf(prop)===-1){this.dynamicProperties.push(prop)
}}};
function FootageElement(data,globalData,comp){this.initFrame();
this.initRenderable();
this.assetData=globalData.getAssetData(data.refId);
this.footageData=globalData.imageLoader.getAsset(this.assetData);
this.initBaseData(data,globalData,comp)
}FootageElement.prototype.prepareFrame=function(){};
extendPrototype([RenderableElement,BaseElement,FrameElement],FootageElement);
FootageElement.prototype.getBaseElement=function(){return null
};
FootageElement.prototype.renderFrame=function(){};
FootageElement.prototype.destroy=function(){};
FootageElement.prototype.initExpressions=function(){var expressionsInterfaces=getExpressionInterfaces();
if(!expressionsInterfaces){return
}var FootageInterface=expressionsInterfaces("footage");
this.layerInterface=FootageInterface(this)
};
FootageElement.prototype.getFootageData=function(){return this.footageData
};
function AudioElement(data,globalData,comp){this.initFrame();
this.initRenderable();
this.assetData=globalData.getAssetData(data.refId);
this.initBaseData(data,globalData,comp);
this._isPlaying=false;
this._canPlay=false;
var assetPath=this.globalData.getAssetsPath(this.assetData);
this.audio=this.globalData.audioController.createAudio(assetPath);
this._currentTime=0;
this.globalData.audioController.addAudio(this);
this._volumeMultiplier=1;
this._volume=1;
this._previousVolume=null;
this.tm=data.tm?PropertyFactory.getProp(this,data.tm,0,globalData.frameRate,this):{_placeholder:true};
this.lv=PropertyFactory.getProp(this,data.au&&data.au.lv?data.au.lv:{k:[100]},1,0.01,this)
}AudioElement.prototype.prepareFrame=function(num){this.prepareRenderableFrame(num,true);
this.prepareProperties(num,true);
if(!this.tm._placeholder){var timeRemapped=this.tm.v;
this._currentTime=timeRemapped
}else{this._currentTime=num/this.data.sr
}this._volume=this.lv.v[0];
var totalVolume=this._volume*this._volumeMultiplier;
if(this._previousVolume!==totalVolume){this._previousVolume=totalVolume;
this.audio.volume(totalVolume)
}};
extendPrototype([RenderableElement,BaseElement,FrameElement],AudioElement);
AudioElement.prototype.renderFrame=function(){if(this.isInRange&&this._canPlay){if(!this._isPlaying){this.audio.play();
this.audio.seek(this._currentTime/this.globalData.frameRate);
this._isPlaying=true
}else{if(!this.audio.playing()||Math.abs(this._currentTime/this.globalData.frameRate-this.audio.seek())>0.1){this.audio.seek(this._currentTime/this.globalData.frameRate)
}}}};
AudioElement.prototype.show=function(){};
AudioElement.prototype.hide=function(){this.audio.pause();
this._isPlaying=false
};
AudioElement.prototype.pause=function(){this.audio.pause();
this._isPlaying=false;
this._canPlay=false
};
AudioElement.prototype.resume=function(){this._canPlay=true
};
AudioElement.prototype.setRate=function(rateValue){this.audio.rate(rateValue)
};
AudioElement.prototype.volume=function(volumeValue){this._volumeMultiplier=volumeValue;
this._previousVolume=volumeValue*this._volume;
this.audio.volume(this._previousVolume)
};
AudioElement.prototype.getBaseElement=function(){return null
};
AudioElement.prototype.destroy=function(){};
AudioElement.prototype.sourceRectAtTime=function(){};
AudioElement.prototype.initExpressions=function(){};
function BaseRenderer(){}BaseRenderer.prototype.checkLayers=function(num){var i;
var len=this.layers.length;
var data;
this.completeLayers=true;
for(i=len-1;
i>=0;
i-=1){if(!this.elements[i]){data=this.layers[i];
if(data.ip-data.st<=num-this.layers[i].st&&data.op-data.st>num-this.layers[i].st){this.buildItem(i)
}}this.completeLayers=this.elements[i]?this.completeLayers:false
}this.checkPendingElements()
};
BaseRenderer.prototype.createItem=function(layer){switch(layer.ty){case 2:return this.createImage(layer);
case 0:return this.createComp(layer);
case 1:return this.createSolid(layer);
case 3:return this.createNull(layer);
case 4:return this.createShape(layer);
case 5:return this.createText(layer);
case 6:return this.createAudio(layer);
case 13:return this.createCamera(layer);
case 15:return this.createFootage(layer);
default:return this.createNull(layer)
}};
BaseRenderer.prototype.createCamera=function(){throw new Error("You're using a 3d camera. Try the html renderer.")
};
BaseRenderer.prototype.createAudio=function(data){return new AudioElement(data,this.globalData,this)
};
BaseRenderer.prototype.createFootage=function(data){return new FootageElement(data,this.globalData,this)
};
BaseRenderer.prototype.buildAllItems=function(){var i;
var len=this.layers.length;
for(i=0;
i<len;
i+=1){this.buildItem(i)
}this.checkPendingElements()
};
BaseRenderer.prototype.includeLayers=function(newLayers){this.completeLayers=false;
var i;
var len=newLayers.length;
var j;
var jLen=this.layers.length;
for(i=0;
i<len;
i+=1){j=0;
while(j<jLen){if(this.layers[j].id===newLayers[i].id){this.layers[j]=newLayers[i];
break
}j+=1
}}};
BaseRenderer.prototype.setProjectInterface=function(pInterface){this.globalData.projectInterface=pInterface
};
BaseRenderer.prototype.initItems=function(){if(!this.globalData.progressiveLoad){this.buildAllItems()
}};
BaseRenderer.prototype.buildElementParenting=function(element,parentName,hierarchy){var elements=this.elements;
var layers=this.layers;
var i=0;
var len=layers.length;
while(i<len){if(layers[i].ind==parentName){if(!elements[i]||elements[i]===true){this.buildItem(i);
this.addPendingElement(element)
}else{hierarchy.push(elements[i]);
elements[i].setAsParent();
if(layers[i].parent!==undefined){this.buildElementParenting(element,layers[i].parent,hierarchy)
}else{element.setHierarchy(hierarchy)
}}}i+=1
}};
BaseRenderer.prototype.addPendingElement=function(element){this.pendingElements.push(element)
};
BaseRenderer.prototype.searchExtraCompositions=function(assets){var i;
var len=assets.length;
for(i=0;
i<len;
i+=1){if(assets[i].xt){var comp=this.createComp(assets[i]);
comp.initExpressions();
this.globalData.projectInterface.registerComposition(comp)
}}};
BaseRenderer.prototype.getElementById=function(ind){var i;
var len=this.elements.length;
for(i=0;
i<len;
i+=1){if(this.elements[i].data.ind===ind){return this.elements[i]
}}return null
};
BaseRenderer.prototype.getElementByPath=function(path){var pathValue=path.shift();
var element;
if(typeof pathValue==="number"){element=this.elements[pathValue]
}else{var i;
var len=this.elements.length;
for(i=0;
i<len;
i+=1){if(this.elements[i].data.nm===pathValue){element=this.elements[i];
break
}}}if(path.length===0){return element
}return element.getElementByPath(path)
};
BaseRenderer.prototype.setupGlobalData=function(animData,fontsContainer){this.globalData.fontManager=new FontManager();
this.globalData.slotManager=slotFactory(animData);
this.globalData.fontManager.addChars(animData.chars);
this.globalData.fontManager.addFonts(animData.fonts,fontsContainer);
this.globalData.getAssetData=this.animationItem.getAssetData.bind(this.animationItem);
this.globalData.getAssetsPath=this.animationItem.getAssetsPath.bind(this.animationItem);
this.globalData.imageLoader=this.animationItem.imagePreloader;
this.globalData.audioController=this.animationItem.audioController;
this.globalData.frameId=0;
this.globalData.frameRate=animData.fr;
this.globalData.nm=animData.nm;
this.globalData.compSize={w:animData.w,h:animData.h}
};
function TransformElement(){}TransformElement.prototype={initTransform:function initTransform(){this.finalTransform={mProp:this.data.ks?TransformPropertyFactory.getTransformProperty(this,this.data.ks,this):{o:0},_matMdf:false,_opMdf:false,mat:new Matrix()};
if(this.data.ao){this.finalTransform.mProp.autoOriented=true
}if(this.data.ty!==11){}},renderTransform:function renderTransform(){this.finalTransform._opMdf=this.finalTransform.mProp.o._mdf||this._isFirstFrame;
this.finalTransform._matMdf=this.finalTransform.mProp._mdf||this._isFirstFrame;
if(this.hierarchy){var mat;
var finalMat=this.finalTransform.mat;
var i=0;
var len=this.hierarchy.length;
if(!this.finalTransform._matMdf){while(i<len){if(this.hierarchy[i].finalTransform.mProp._mdf){this.finalTransform._matMdf=true;
break
}i+=1
}}if(this.finalTransform._matMdf){mat=this.finalTransform.mProp.v.props;
finalMat.cloneFromProps(mat);
for(i=0;
i<len;
i+=1){mat=this.hierarchy[i].finalTransform.mProp.v.props;
finalMat.transform(mat[0],mat[1],mat[2],mat[3],mat[4],mat[5],mat[6],mat[7],mat[8],mat[9],mat[10],mat[11],mat[12],mat[13],mat[14],mat[15])
}}}},globalToLocal:function globalToLocal(pt){var transforms=[];
transforms.push(this.finalTransform);
var flag=true;
var comp=this.comp;
while(flag){if(comp.finalTransform){if(comp.data.hasMask){transforms.splice(0,0,comp.finalTransform)
}comp=comp.comp
}else{flag=false
}}var i;
var len=transforms.length;
var ptNew;
for(i=0;
i<len;
i+=1){ptNew=transforms[i].mat.applyToPointArray(0,0,0);
pt=[pt[0]-ptNew[0],pt[1]-ptNew[1],0]
}return pt
},mHelper:new Matrix()};
function MaskElement(data,element,globalData){this.data=data;
this.element=element;
this.globalData=globalData;
this.storedData=[];
this.masksProperties=this.data.masksProperties||[];
this.maskElement=null;
var defs=this.globalData.defs;
var i;
var len=this.masksProperties?this.masksProperties.length:0;
this.viewData=createSizedArray(len);
this.solidPath="";
var path;
var properties=this.masksProperties;
var count=0;
var currentMasks=[];
var j;
var jLen;
var layerId=createElementID();
var rect;
var expansor;
var feMorph;
var x;
var maskType="clipPath";
var maskRef="clip-path";
for(i=0;
i<len;
i+=1){if(properties[i].mode!=="a"&&properties[i].mode!=="n"||properties[i].inv||properties[i].o.k!==100||properties[i].o.x){maskType="mask";
maskRef="mask"
}if((properties[i].mode==="s"||properties[i].mode==="i")&&count===0){rect=createNS("rect");
rect.setAttribute("fill","#ffffff");
rect.setAttribute("width",this.element.comp.data.w||0);
rect.setAttribute("height",this.element.comp.data.h||0);
currentMasks.push(rect)
}else{rect=null
}path=createNS("path");
if(properties[i].mode==="n"){this.viewData[i]={op:PropertyFactory.getProp(this.element,properties[i].o,0,0.01,this.element),prop:ShapePropertyFactory.getShapeProp(this.element,properties[i],3),elem:path,lastPath:""};
defs.appendChild(path)
}else{count+=1;
path.setAttribute("fill",properties[i].mode==="s"?"#000000":"#ffffff");
path.setAttribute("clip-rule","nonzero");
var filterID;
if(properties[i].x.k!==0){maskType="mask";
maskRef="mask";
x=PropertyFactory.getProp(this.element,properties[i].x,0,null,this.element);
filterID=createElementID();
expansor=createNS("filter");
expansor.setAttribute("id",filterID);
feMorph=createNS("feMorphology");
feMorph.setAttribute("operator","erode");
feMorph.setAttribute("in","SourceGraphic");
feMorph.setAttribute("radius","0");
expansor.appendChild(feMorph);
defs.appendChild(expansor);
path.setAttribute("stroke",properties[i].mode==="s"?"#000000":"#ffffff")
}else{feMorph=null;
x=null
}this.storedData[i]={elem:path,x:x,expan:feMorph,lastPath:"",lastOperator:"",filterId:filterID,lastRadius:0};
if(properties[i].mode==="i"){jLen=currentMasks.length;
var g=createNS("g");
for(j=0;
j<jLen;
j+=1){g.appendChild(currentMasks[j])
}var mask=createNS("mask");
mask.setAttribute("mask-type","alpha");
mask.setAttribute("id",layerId+"_"+count);
mask.appendChild(path);
defs.appendChild(mask);
g.setAttribute("mask","url("+getLocationHref()+"#"+layerId+"_"+count+")");
currentMasks.length=0;
currentMasks.push(g)
}else{currentMasks.push(path)
}if(properties[i].inv&&!this.solidPath){this.solidPath=this.createLayerSolidPath()
}this.viewData[i]={elem:path,lastPath:"",op:PropertyFactory.getProp(this.element,properties[i].o,0,0.01,this.element),prop:ShapePropertyFactory.getShapeProp(this.element,properties[i],3),invRect:rect};
if(!this.viewData[i].prop.k){this.drawPath(properties[i],this.viewData[i].prop.v,this.viewData[i])
}}}this.maskElement=createNS(maskType);
len=currentMasks.length;
for(i=0;
i<len;
i+=1){this.maskElement.appendChild(currentMasks[i])
}if(count>0){this.maskElement.setAttribute("id",layerId);
this.element.maskedElement.setAttribute(maskRef,"url("+getLocationHref()+"#"+layerId+")");
defs.appendChild(this.maskElement)
}if(this.viewData.length){this.element.addRenderableComponent(this)
}}MaskElement.prototype.getMaskProperty=function(pos){return this.viewData[pos].prop
};
MaskElement.prototype.renderFrame=function(isFirstFrame){var finalMat=this.element.finalTransform.mat;
var i;
var len=this.masksProperties.length;
for(i=0;
i<len;
i+=1){if(this.viewData[i].prop._mdf||isFirstFrame){this.drawPath(this.masksProperties[i],this.viewData[i].prop.v,this.viewData[i])
}if(this.viewData[i].op._mdf||isFirstFrame){this.viewData[i].elem.setAttribute("fill-opacity",this.viewData[i].op.v)
}if(this.masksProperties[i].mode!=="n"){if(this.viewData[i].invRect&&(this.element.finalTransform.mProp._mdf||isFirstFrame)){this.viewData[i].invRect.setAttribute("transform",finalMat.getInverseMatrix().to2dCSS())
}if(this.storedData[i].x&&(this.storedData[i].x._mdf||isFirstFrame)){var feMorph=this.storedData[i].expan;
if(this.storedData[i].x.v<0){if(this.storedData[i].lastOperator!=="erode"){this.storedData[i].lastOperator="erode";
this.storedData[i].elem.setAttribute("filter","url("+getLocationHref()+"#"+this.storedData[i].filterId+")")
}feMorph.setAttribute("radius",-this.storedData[i].x.v)
}else{if(this.storedData[i].lastOperator!=="dilate"){this.storedData[i].lastOperator="dilate";
this.storedData[i].elem.setAttribute("filter",null)
}this.storedData[i].elem.setAttribute("stroke-width",this.storedData[i].x.v*2)
}}}}};
MaskElement.prototype.getMaskelement=function(){return this.maskElement
};
MaskElement.prototype.createLayerSolidPath=function(){var path="M0,0 ";
path+=" h"+this.globalData.compSize.w;
path+=" v"+this.globalData.compSize.h;
path+=" h-"+this.globalData.compSize.w;
path+=" v-"+this.globalData.compSize.h+" ";
return path
};
MaskElement.prototype.drawPath=function(pathData,pathNodes,viewData){var pathString=" M"+pathNodes.v[0][0]+","+pathNodes.v[0][1];
var i;
var len;
len=pathNodes._length;
for(i=1;
i<len;
i+=1){pathString+=" C"+pathNodes.o[i-1][0]+","+pathNodes.o[i-1][1]+" "+pathNodes.i[i][0]+","+pathNodes.i[i][1]+" "+pathNodes.v[i][0]+","+pathNodes.v[i][1]
}if(pathNodes.c&&len>1){pathString+=" C"+pathNodes.o[i-1][0]+","+pathNodes.o[i-1][1]+" "+pathNodes.i[0][0]+","+pathNodes.i[0][1]+" "+pathNodes.v[0][0]+","+pathNodes.v[0][1]
}if(viewData.lastPath!==pathString){var pathShapeValue="";
if(viewData.elem){if(pathNodes.c){pathShapeValue=pathData.inv?this.solidPath+pathString:pathString
}viewData.elem.setAttribute("d",pathShapeValue)
}viewData.lastPath=pathString
}};
MaskElement.prototype.destroy=function(){this.element=null;
this.globalData=null;
this.maskElement=null;
this.data=null;
this.masksProperties=null
};
var filtersFactory=function(){var ob={};
ob.createFilter=createFilter;
ob.createAlphaToLuminanceFilter=createAlphaToLuminanceFilter;
function createFilter(filId,skipCoordinates){var fil=createNS("filter");
fil.setAttribute("id",filId);
if(skipCoordinates!==true){fil.setAttribute("filterUnits","objectBoundingBox");
fil.setAttribute("x","0%");
fil.setAttribute("y","0%");
fil.setAttribute("width","100%");
fil.setAttribute("height","100%")
}return fil
}function createAlphaToLuminanceFilter(){var feColorMatrix=createNS("feColorMatrix");
feColorMatrix.setAttribute("type","matrix");
feColorMatrix.setAttribute("color-interpolation-filters","sRGB");
feColorMatrix.setAttribute("values","0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1");
return feColorMatrix
}return ob
}();
var featureSupport=function(){var ob={maskType:true,svgLumaHidden:true,offscreenCanvas:typeof OffscreenCanvas!=="undefined"};
if(/MSIE 10/i.test(navigator.userAgent)||/MSIE 9/i.test(navigator.userAgent)||/rv:11.0/i.test(navigator.userAgent)||/Edge\/\d./i.test(navigator.userAgent)){ob.maskType=false
}if(/firefox/i.test(navigator.userAgent)){ob.svgLumaHidden=false
}return ob
}();
var registeredEffects={};
var idPrefix="filter_result_";
function SVGEffects(elem){var i;
var source="SourceGraphic";
var len=elem.data.ef?elem.data.ef.length:0;
var filId=createElementID();
var fil=filtersFactory.createFilter(filId,true);
var count=0;
this.filters=[];
var filterManager;
for(i=0;
i<len;
i+=1){filterManager=null;
var type=elem.data.ef[i].ty;
if(registeredEffects[type]){var Effect=registeredEffects[type].effect;
filterManager=new Effect(fil,elem.effectsManager.effectElements[i],elem,idPrefix+count,source);
source=idPrefix+count;
if(registeredEffects[type].countsAsEffect){count+=1
}}if(filterManager){this.filters.push(filterManager)
}}if(count){elem.globalData.defs.appendChild(fil);
elem.layerElement.setAttribute("filter","url("+getLocationHref()+"#"+filId+")")
}if(this.filters.length){elem.addRenderableComponent(this)
}}SVGEffects.prototype.renderFrame=function(_isFirstFrame){var i;
var len=this.filters.length;
for(i=0;
i<len;
i+=1){this.filters[i].renderFrame(_isFirstFrame)
}};
function registerEffect(id,effect,countsAsEffect){registeredEffects[id]={effect:effect,countsAsEffect:countsAsEffect}
}function SVGBaseElement(){}SVGBaseElement.prototype={initRendererElement:function initRendererElement(){this.layerElement=createNS("g")
},createContainerElements:function createContainerElements(){this.matteElement=createNS("g");
this.transformedElement=this.layerElement;
this.maskedElement=this.layerElement;
this._sizeChanged=false;
var layerElementParent=null;
if(this.data.td){this.matteMasks={};
var gg=createNS("g");
gg.setAttribute("id",this.layerId);
gg.appendChild(this.layerElement);
layerElementParent=gg;
this.globalData.defs.appendChild(gg)
}else{if(this.data.tt){this.matteElement.appendChild(this.layerElement);
layerElementParent=this.matteElement;
this.baseElement=this.matteElement
}else{this.baseElement=this.layerElement
}}if(this.data.ln){this.layerElement.setAttribute("id",this.data.ln)
}if(this.data.cl){this.layerElement.setAttribute("class",this.data.cl)
}if(this.data.ty===0&&!this.data.hd){var cp=createNS("clipPath");
var pt=createNS("path");
pt.setAttribute("d","M0,0 L"+this.data.w+",0 L"+this.data.w+","+this.data.h+" L0,"+this.data.h+"z");
var clipId=createElementID();
cp.setAttribute("id",clipId);
cp.appendChild(pt);
this.globalData.defs.appendChild(cp);
if(this.checkMasks()){var cpGroup=createNS("g");
cpGroup.setAttribute("clip-path","url("+getLocationHref()+"#"+clipId+")");
cpGroup.appendChild(this.layerElement);
this.transformedElement=cpGroup;
if(layerElementParent){layerElementParent.appendChild(this.transformedElement)
}else{this.baseElement=this.transformedElement
}}else{this.layerElement.setAttribute("clip-path","url("+getLocationHref()+"#"+clipId+")")
}}if(this.data.bm!==0){this.setBlendMode()
}},renderElement:function renderElement(){if(this.finalTransform._matMdf){this.transformedElement.setAttribute("transform",this.finalTransform.mat.to2dCSS())
}if(this.finalTransform._opMdf){this.transformedElement.setAttribute("opacity",this.finalTransform.mProp.o.v)
}},destroyBaseElement:function destroyBaseElement(){this.layerElement=null;
this.matteElement=null;
this.maskManager.destroy()
},getBaseElement:function getBaseElement(){if(this.data.hd){return null
}return this.baseElement
},createRenderableComponents:function createRenderableComponents(){this.maskManager=new MaskElement(this.data,this,this.globalData);
this.renderableEffectsManager=new SVGEffects(this)
},getMatte:function getMatte(matteType){if(!this.matteMasks){this.matteMasks={}
}if(!this.matteMasks[matteType]){var id=this.layerId+"_"+matteType;
var filId;
var fil;
var useElement;
var gg;
if(matteType===1||matteType===3){var masker=createNS("mask");
masker.setAttribute("id",id);
masker.setAttribute("mask-type",matteType===3?"luminance":"alpha");
useElement=createNS("use");
useElement.setAttributeNS("http://www.w3.org/1999/xlink","href","#"+this.layerId);
masker.appendChild(useElement);
this.globalData.defs.appendChild(masker);
if(!featureSupport.maskType&&matteType===1){masker.setAttribute("mask-type","luminance");
filId=createElementID();
fil=filtersFactory.createFilter(filId);
this.globalData.defs.appendChild(fil);
fil.appendChild(filtersFactory.createAlphaToLuminanceFilter());
gg=createNS("g");
gg.appendChild(useElement);
masker.appendChild(gg);
gg.setAttribute("filter","url("+getLocationHref()+"#"+filId+")")
}}else{if(matteType===2){var maskGroup=createNS("mask");
maskGroup.setAttribute("id",id);
maskGroup.setAttribute("mask-type","alpha");
var maskGrouper=createNS("g");
maskGroup.appendChild(maskGrouper);
filId=createElementID();
fil=filtersFactory.createFilter(filId);
var feCTr=createNS("feComponentTransfer");
feCTr.setAttribute("in","SourceGraphic");
fil.appendChild(feCTr);
var feFunc=createNS("feFuncA");
feFunc.setAttribute("type","table");
feFunc.setAttribute("tableValues","1.0 0.0");
feCTr.appendChild(feFunc);
this.globalData.defs.appendChild(fil);
var alphaRect=createNS("rect");
alphaRect.setAttribute("width",this.comp.data.w);
alphaRect.setAttribute("height",this.comp.data.h);
alphaRect.setAttribute("x","0");
alphaRect.setAttribute("y","0");
alphaRect.setAttribute("fill","#ffffff");
alphaRect.setAttribute("opacity","0");
maskGrouper.setAttribute("filter","url("+getLocationHref()+"#"+filId+")");
maskGrouper.appendChild(alphaRect);
useElement=createNS("use");
useElement.setAttributeNS("http://www.w3.org/1999/xlink","href","#"+this.layerId);
maskGrouper.appendChild(useElement);
if(!featureSupport.maskType){maskGroup.setAttribute("mask-type","luminance");
fil.appendChild(filtersFactory.createAlphaToLuminanceFilter());
gg=createNS("g");
maskGrouper.appendChild(alphaRect);
gg.appendChild(this.layerElement);
maskGrouper.appendChild(gg)
}this.globalData.defs.appendChild(maskGroup)
}}this.matteMasks[matteType]=id
}return this.matteMasks[matteType]
},setMatte:function setMatte(id){if(!this.matteElement){return
}this.matteElement.setAttribute("mask","url("+getLocationHref()+"#"+id+")")
}};
function HierarchyElement(){}HierarchyElement.prototype={initHierarchy:function initHierarchy(){this.hierarchy=[];
this._isParent=false;
this.checkParenting()
},setHierarchy:function setHierarchy(hierarchy){this.hierarchy=hierarchy
},setAsParent:function setAsParent(){this._isParent=true
},checkParenting:function checkParenting(){if(this.data.parent!==undefined){this.comp.buildElementParenting(this,this.data.parent,[])
}}};
function RenderableDOMElement(){}(function(){var _prototype={initElement:function initElement(data,globalData,comp){this.initFrame();
this.initBaseData(data,globalData,comp);
this.initTransform(data,globalData,comp);
this.initHierarchy();
this.initRenderable();
this.initRendererElement();
this.createContainerElements();
this.createRenderableComponents();
this.createContent();
this.hide()
},hide:function hide(){if(!this.hidden&&(!this.isInRange||this.isTransparent)){var elem=this.baseElement||this.layerElement;
elem.style.display="none";
this.hidden=true
}},show:function show(){if(this.isInRange&&!this.isTransparent){if(!this.data.hd){var elem=this.baseElement||this.layerElement;
elem.style.display="block"
}this.hidden=false;
this._isFirstFrame=true
}},renderFrame:function renderFrame(){if(this.data.hd||this.hidden){return
}this.renderTransform();
this.renderRenderable();
this.renderElement();
this.renderInnerContent();
if(this._isFirstFrame){this._isFirstFrame=false
}},renderInnerContent:function renderInnerContent(){},prepareFrame:function prepareFrame(num){this._mdf=false;
this.prepareRenderableFrame(num);
this.prepareProperties(num,this.isInRange);
this.checkTransparency()
},destroy:function destroy(){this.innerElem=null;
this.destroyBaseElement()
}};
extendPrototype([RenderableElement,createProxyFunction(_prototype)],RenderableDOMElement)
})();
function IImageElement(data,globalData,comp){this.assetData=globalData.getAssetData(data.refId);
if(this.assetData&&this.assetData.sid){this.assetData=globalData.slotManager.getProp(this.assetData)
}this.initElement(data,globalData,comp);
this.sourceRect={top:0,left:0,width:this.assetData.w,height:this.assetData.h}
}extendPrototype([BaseElement,TransformElement,SVGBaseElement,HierarchyElement,FrameElement,RenderableDOMElement],IImageElement);
IImageElement.prototype.createContent=function(){var assetPath=this.globalData.getAssetsPath(this.assetData);
this.innerElem=createNS("image");
this.innerElem.setAttribute("width",this.assetData.w+"px");
this.innerElem.setAttribute("height",this.assetData.h+"px");
this.innerElem.setAttribute("preserveAspectRatio",this.assetData.pr||this.globalData.renderConfig.imagePreserveAspectRatio);
this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink","href",assetPath);
this.layerElement.appendChild(this.innerElem)
};
IImageElement.prototype.sourceRectAtTime=function(){return this.sourceRect
};
function ProcessedElement(element,position){this.elem=element;
this.pos=position
}function IShapeElement(){}IShapeElement.prototype={addShapeToModifiers:function addShapeToModifiers(data){var i;
var len=this.shapeModifiers.length;
for(i=0;
i<len;
i+=1){this.shapeModifiers[i].addShape(data)
}},isShapeInAnimatedModifiers:function isShapeInAnimatedModifiers(data){var i=0;
var len=this.shapeModifiers.length;
while(i<len){if(this.shapeModifiers[i].isAnimatedWithShape(data)){return true
}}return false
},renderModifiers:function renderModifiers(){if(!this.shapeModifiers.length){return
}var i;
var len=this.shapes.length;
for(i=0;
i<len;
i+=1){this.shapes[i].sh.reset()
}len=this.shapeModifiers.length;
var shouldBreakProcess;
for(i=len-1;
i>=0;
i-=1){shouldBreakProcess=this.shapeModifiers[i].processShapes(this._isFirstFrame);
if(shouldBreakProcess){break
}}},searchProcessedElement:function searchProcessedElement(elem){var elements=this.processedElements;
var i=0;
var len=elements.length;
while(i<len){if(elements[i].elem===elem){return elements[i].pos
}i+=1
}return 0
},addProcessedElement:function addProcessedElement(elem,pos){var elements=this.processedElements;
var i=elements.length;
while(i){i-=1;
if(elements[i].elem===elem){elements[i].pos=pos;
return
}}elements.push(new ProcessedElement(elem,pos))
},prepareFrame:function prepareFrame(num){this.prepareRenderableFrame(num);
this.prepareProperties(num,this.isInRange)
}};
var lineCapEnum={1:"butt",2:"round",3:"square"};
var lineJoinEnum={1:"miter",2:"round",3:"bevel"};
function SVGShapeData(transformers,level,shape){this.caches=[];
this.styles=[];
this.transformers=transformers;
this.lStr="";
this.sh=shape;
this.lvl=level;
this._isAnimated=!!shape.k;
var i=0;
var len=transformers.length;
while(i<len){if(transformers[i].mProps.dynamicProperties.length){this._isAnimated=true;
break
}i+=1
}}SVGShapeData.prototype.setAsAnimated=function(){this._isAnimated=true
};
function SVGStyleData(data,level){this.data=data;
this.type=data.ty;
this.d="";
this.lvl=level;
this._mdf=false;
this.closed=data.hd===true;
this.pElem=createNS("path");
this.msElem=null
}SVGStyleData.prototype.reset=function(){this.d="";
this._mdf=false
};
function DashProperty(elem,data,renderer,container){this.elem=elem;
this.frameId=-1;
this.dataProps=createSizedArray(data.length);
this.renderer=renderer;
this.k=false;
this.dashStr="";
this.dashArray=createTypedArray("float32",data.length?data.length-1:0);
this.dashoffset=createTypedArray("float32",1);
this.initDynamicPropertyContainer(container);
var i;
var len=data.length||0;
var prop;
for(i=0;
i<len;
i+=1){prop=PropertyFactory.getProp(elem,data[i].v,0,0,this);
this.k=prop.k||this.k;
this.dataProps[i]={n:data[i].n,p:prop}
}if(!this.k){this.getValue(true)
}this._isAnimated=this.k
}DashProperty.prototype.getValue=function(forceRender){if(this.elem.globalData.frameId===this.frameId&&!forceRender){return
}this.frameId=this.elem.globalData.frameId;
this.iterateDynamicProperties();
this._mdf=this._mdf||forceRender;
if(this._mdf){var i=0;
var len=this.dataProps.length;
if(this.renderer==="svg"){this.dashStr=""
}for(i=0;
i<len;
i+=1){if(this.dataProps[i].n!=="o"){if(this.renderer==="svg"){this.dashStr+=" "+this.dataProps[i].p.v
}else{this.dashArray[i]=this.dataProps[i].p.v
}}else{this.dashoffset[0]=this.dataProps[i].p.v
}}}};
extendPrototype([DynamicPropertyContainer],DashProperty);
function SVGStrokeStyleData(elem,data,styleOb){this.initDynamicPropertyContainer(elem);
this.getValue=this.iterateDynamicProperties;
this.o=PropertyFactory.getProp(elem,data.o,0,0.01,this);
this.w=PropertyFactory.getProp(elem,data.w,0,null,this);
this.d=new DashProperty(elem,data.d||{},"svg",this);
this.c=PropertyFactory.getProp(elem,data.c,1,255,this);
this.style=styleOb;
this._isAnimated=!!this._isAnimated
}extendPrototype([DynamicPropertyContainer],SVGStrokeStyleData);
function SVGFillStyleData(elem,data,styleOb){this.initDynamicPropertyContainer(elem);
this.getValue=this.iterateDynamicProperties;
this.o=PropertyFactory.getProp(elem,data.o,0,0.01,this);
this.c=PropertyFactory.getProp(elem,data.c,1,255,this);
this.style=styleOb
}extendPrototype([DynamicPropertyContainer],SVGFillStyleData);
function SVGNoStyleData(elem,data,styleOb){this.initDynamicPropertyContainer(elem);
this.getValue=this.iterateDynamicProperties;
this.style=styleOb
}extendPrototype([DynamicPropertyContainer],SVGNoStyleData);
function GradientProperty(elem,data,container){this.data=data;
this.c=createTypedArray("uint8c",data.p*4);
var cLength=data.k.k[0].s?data.k.k[0].s.length-data.p*4:data.k.k.length-data.p*4;
this.o=createTypedArray("float32",cLength);
this._cmdf=false;
this._omdf=false;
this._collapsable=this.checkCollapsable();
this._hasOpacity=cLength;
this.initDynamicPropertyContainer(container);
this.prop=PropertyFactory.getProp(elem,data.k,1,null,this);
this.k=this.prop.k;
this.getValue(true)
}GradientProperty.prototype.comparePoints=function(values,points){var i=0;
var len=this.o.length/2;
var diff;
while(i<len){diff=Math.abs(values[i*4]-values[points*4+i*2]);
if(diff>0.01){return false
}i+=1
}return true
};
GradientProperty.prototype.checkCollapsable=function(){if(this.o.length/2!==this.c.length/4){return false
}if(this.data.k.k[0].s){var i=0;
var len=this.data.k.k.length;
while(i<len){if(!this.comparePoints(this.data.k.k[i].s,this.data.p)){return false
}i+=1
}}else{if(!this.comparePoints(this.data.k.k,this.data.p)){return false
}}return true
};
GradientProperty.prototype.getValue=function(forceRender){this.prop.getValue();
this._mdf=false;
this._cmdf=false;
this._omdf=false;
if(this.prop._mdf||forceRender){var i;
var len=this.data.p*4;
var mult;
var val;
for(i=0;
i<len;
i+=1){mult=i%4===0?100:255;
val=Math.round(this.prop.v[i]*mult);
if(this.c[i]!==val){this.c[i]=val;
this._cmdf=!forceRender
}}if(this.o.length){len=this.prop.v.length;
for(i=this.data.p*4;
i<len;
i+=1){mult=i%2===0?100:1;
val=i%2===0?Math.round(this.prop.v[i]*100):this.prop.v[i];
if(this.o[i-this.data.p*4]!==val){this.o[i-this.data.p*4]=val;
this._omdf=!forceRender
}}}this._mdf=!forceRender
}};
extendPrototype([DynamicPropertyContainer],GradientProperty);
function SVGGradientFillStyleData(elem,data,styleOb){this.initDynamicPropertyContainer(elem);
this.getValue=this.iterateDynamicProperties;
this.initGradientData(elem,data,styleOb)
}SVGGradientFillStyleData.prototype.initGradientData=function(elem,data,styleOb){this.o=PropertyFactory.getProp(elem,data.o,0,0.01,this);
this.s=PropertyFactory.getProp(elem,data.s,1,null,this);
this.e=PropertyFactory.getProp(elem,data.e,1,null,this);
this.h=PropertyFactory.getProp(elem,data.h||{k:0},0,0.01,this);
this.a=PropertyFactory.getProp(elem,data.a||{k:0},0,degToRads,this);
this.g=new GradientProperty(elem,data.g,this);
this.style=styleOb;
this.stops=[];
this.setGradientData(styleOb.pElem,data);
this.setGradientOpacity(data,styleOb);
this._isAnimated=!!this._isAnimated
};
SVGGradientFillStyleData.prototype.setGradientData=function(pathElement,data){var gradientId=createElementID();
var gfill=createNS(data.t===1?"linearGradient":"radialGradient");
gfill.setAttribute("id",gradientId);
gfill.setAttribute("spreadMethod","pad");
gfill.setAttribute("gradientUnits","userSpaceOnUse");
var stops=[];
var stop;
var j;
var jLen;
jLen=data.g.p*4;
for(j=0;
j<jLen;
j+=4){stop=createNS("stop");
gfill.appendChild(stop);
stops.push(stop)
}pathElement.setAttribute(data.ty==="gf"?"fill":"stroke","url("+getLocationHref()+"#"+gradientId+")");
this.gf=gfill;
this.cst=stops
};
SVGGradientFillStyleData.prototype.setGradientOpacity=function(data,styleOb){if(this.g._hasOpacity&&!this.g._collapsable){var stop;
var j;
var jLen;
var mask=createNS("mask");
var maskElement=createNS("path");
mask.appendChild(maskElement);
var opacityId=createElementID();
var maskId=createElementID();
mask.setAttribute("id",maskId);
var opFill=createNS(data.t===1?"linearGradient":"radialGradient");
opFill.setAttribute("id",opacityId);
opFill.setAttribute("spreadMethod","pad");
opFill.setAttribute("gradientUnits","userSpaceOnUse");
jLen=data.g.k.k[0].s?data.g.k.k[0].s.length:data.g.k.k.length;
var stops=this.stops;
for(j=data.g.p*4;
j<jLen;
j+=2){stop=createNS("stop");
stop.setAttribute("stop-color","rgb(255,255,255)");
opFill.appendChild(stop);
stops.push(stop)
}maskElement.setAttribute(data.ty==="gf"?"fill":"stroke","url("+getLocationHref()+"#"+opacityId+")");
if(data.ty==="gs"){maskElement.setAttribute("stroke-linecap",lineCapEnum[data.lc||2]);
maskElement.setAttribute("stroke-linejoin",lineJoinEnum[data.lj||2]);
if(data.lj===1){maskElement.setAttribute("stroke-miterlimit",data.ml)
}}this.of=opFill;
this.ms=mask;
this.ost=stops;
this.maskId=maskId;
styleOb.msElem=maskElement
}};
extendPrototype([DynamicPropertyContainer],SVGGradientFillStyleData);
function SVGGradientStrokeStyleData(elem,data,styleOb){this.initDynamicPropertyContainer(elem);
this.getValue=this.iterateDynamicProperties;
this.w=PropertyFactory.getProp(elem,data.w,0,null,this);
this.d=new DashProperty(elem,data.d||{},"svg",this);
this.initGradientData(elem,data,styleOb);
this._isAnimated=!!this._isAnimated
}extendPrototype([SVGGradientFillStyleData,DynamicPropertyContainer],SVGGradientStrokeStyleData);
function ShapeGroupData(){this.it=[];
this.prevViewData=[];
this.gr=createNS("g")
}function SVGTransformData(mProps,op,container){this.transform={mProps:mProps,op:op,container:container};
this.elements=[];
this._isAnimated=this.transform.mProps.dynamicProperties.length||this.transform.op.effectsSequence.length
}var buildShapeString=function buildShapeString(pathNodes,length,closed,mat){if(length===0){return""
}var _o=pathNodes.o;
var _i=pathNodes.i;
var _v=pathNodes.v;
var i;
var shapeString=" M"+mat.applyToPointStringified(_v[0][0],_v[0][1]);
for(i=1;
i<length;
i+=1){shapeString+=" C"+mat.applyToPointStringified(_o[i-1][0],_o[i-1][1])+" "+mat.applyToPointStringified(_i[i][0],_i[i][1])+" "+mat.applyToPointStringified(_v[i][0],_v[i][1])
}if(closed&&length){shapeString+=" C"+mat.applyToPointStringified(_o[i-1][0],_o[i-1][1])+" "+mat.applyToPointStringified(_i[0][0],_i[0][1])+" "+mat.applyToPointStringified(_v[0][0],_v[0][1]);
shapeString+="z"
}return shapeString
};
var SVGElementsRenderer=function(){var _identityMatrix=new Matrix();
var _matrixHelper=new Matrix();
var ob={createRenderFunction:createRenderFunction};
function createRenderFunction(data){switch(data.ty){case"fl":return renderFill;
case"gf":return renderGradient;
case"gs":return renderGradientStroke;
case"st":return renderStroke;
case"sh":case"el":case"rc":case"sr":return renderPath;
case"tr":return renderContentTransform;
case"no":return renderNoop;
default:return null
}}function renderContentTransform(styleData,itemData,isFirstFrame){if(isFirstFrame||itemData.transform.op._mdf){itemData.transform.container.setAttribute("opacity",itemData.transform.op.v)
}if(isFirstFrame||itemData.transform.mProps._mdf){itemData.transform.container.setAttribute("transform",itemData.transform.mProps.v.to2dCSS())
}}function renderNoop(){}function renderPath(styleData,itemData,isFirstFrame){var j;
var jLen;
var pathStringTransformed;
var redraw;
var pathNodes;
var l;
var lLen=itemData.styles.length;
var lvl=itemData.lvl;
var paths;
var mat;
var props;
var iterations;
var k;
for(l=0;
l<lLen;
l+=1){redraw=itemData.sh._mdf||isFirstFrame;
if(itemData.styles[l].lvl<lvl){mat=_matrixHelper.reset();
iterations=lvl-itemData.styles[l].lvl;
k=itemData.transformers.length-1;
while(!redraw&&iterations>0){redraw=itemData.transformers[k].mProps._mdf||redraw;
iterations-=1;
k-=1
}if(redraw){iterations=lvl-itemData.styles[l].lvl;
k=itemData.transformers.length-1;
while(iterations>0){props=itemData.transformers[k].mProps.v.props;
mat.transform(props[0],props[1],props[2],props[3],props[4],props[5],props[6],props[7],props[8],props[9],props[10],props[11],props[12],props[13],props[14],props[15]);
iterations-=1;
k-=1
}}}else{mat=_identityMatrix
}paths=itemData.sh.paths;
jLen=paths._length;
if(redraw){pathStringTransformed="";
for(j=0;
j<jLen;
j+=1){pathNodes=paths.shapes[j];
if(pathNodes&&pathNodes._length){pathStringTransformed+=buildShapeString(pathNodes,pathNodes._length,pathNodes.c,mat)
}}itemData.caches[l]=pathStringTransformed
}else{pathStringTransformed=itemData.caches[l]
}itemData.styles[l].d+=styleData.hd===true?"":pathStringTransformed;
itemData.styles[l]._mdf=redraw||itemData.styles[l]._mdf
}}function renderFill(styleData,itemData,isFirstFrame){var styleElem=itemData.style;
if(itemData.c._mdf||isFirstFrame){styleElem.pElem.setAttribute("fill","rgb("+bmFloor(itemData.c.v[0])+","+bmFloor(itemData.c.v[1])+","+bmFloor(itemData.c.v[2])+")")
}if(itemData.o._mdf||isFirstFrame){styleElem.pElem.setAttribute("fill-opacity",itemData.o.v)
}}function renderGradientStroke(styleData,itemData,isFirstFrame){renderGradient(styleData,itemData,isFirstFrame);
renderStroke(styleData,itemData,isFirstFrame)
}function renderGradient(styleData,itemData,isFirstFrame){var gfill=itemData.gf;
var hasOpacity=itemData.g._hasOpacity;
var pt1=itemData.s.v;
var pt2=itemData.e.v;
if(itemData.o._mdf||isFirstFrame){var attr=styleData.ty==="gf"?"fill-opacity":"stroke-opacity";
itemData.style.pElem.setAttribute(attr,itemData.o.v)
}if(itemData.s._mdf||isFirstFrame){var attr1=styleData.t===1?"x1":"cx";
var attr2=attr1==="x1"?"y1":"cy";
gfill.setAttribute(attr1,pt1[0]);
gfill.setAttribute(attr2,pt1[1]);
if(hasOpacity&&!itemData.g._collapsable){itemData.of.setAttribute(attr1,pt1[0]);
itemData.of.setAttribute(attr2,pt1[1])
}}var stops;
var i;
var len;
var stop;
if(itemData.g._cmdf||isFirstFrame){stops=itemData.cst;
var cValues=itemData.g.c;
len=stops.length;
for(i=0;
i<len;
i+=1){stop=stops[i];
stop.setAttribute("offset",cValues[i*4]+"%");
stop.setAttribute("stop-color","rgb("+cValues[i*4+1]+","+cValues[i*4+2]+","+cValues[i*4+3]+")")
}}if(hasOpacity&&(itemData.g._omdf||isFirstFrame)){var oValues=itemData.g.o;
if(itemData.g._collapsable){stops=itemData.cst
}else{stops=itemData.ost
}len=stops.length;
for(i=0;
i<len;
i+=1){stop=stops[i];
if(!itemData.g._collapsable){stop.setAttribute("offset",oValues[i*2]+"%")
}stop.setAttribute("stop-opacity",oValues[i*2+1])
}}if(styleData.t===1){if(itemData.e._mdf||isFirstFrame){gfill.setAttribute("x2",pt2[0]);
gfill.setAttribute("y2",pt2[1]);
if(hasOpacity&&!itemData.g._collapsable){itemData.of.setAttribute("x2",pt2[0]);
itemData.of.setAttribute("y2",pt2[1])
}}}else{var rad;
if(itemData.s._mdf||itemData.e._mdf||isFirstFrame){rad=Math.sqrt(Math.pow(pt1[0]-pt2[0],2)+Math.pow(pt1[1]-pt2[1],2));
gfill.setAttribute("r",rad);
if(hasOpacity&&!itemData.g._collapsable){itemData.of.setAttribute("r",rad)
}}if(itemData.e._mdf||itemData.h._mdf||itemData.a._mdf||isFirstFrame){if(!rad){rad=Math.sqrt(Math.pow(pt1[0]-pt2[0],2)+Math.pow(pt1[1]-pt2[1],2))
}var ang=Math.atan2(pt2[1]-pt1[1],pt2[0]-pt1[0]);
var percent=itemData.h.v;
if(percent>=1){percent=0.99
}else{if(percent<=-1){percent=-0.99
}}var dist=rad*percent;
var x=Math.cos(ang+itemData.a.v)*dist+pt1[0];
var y=Math.sin(ang+itemData.a.v)*dist+pt1[1];
gfill.setAttribute("fx",x);
gfill.setAttribute("fy",y);
if(hasOpacity&&!itemData.g._collapsable){itemData.of.setAttribute("fx",x);
itemData.of.setAttribute("fy",y)
}}}}function renderStroke(styleData,itemData,isFirstFrame){var styleElem=itemData.style;
var d=itemData.d;
if(d&&(d._mdf||isFirstFrame)&&d.dashStr){styleElem.pElem.setAttribute("stroke-dasharray",d.dashStr);
styleElem.pElem.setAttribute("stroke-dashoffset",d.dashoffset[0])
}if(itemData.c&&(itemData.c._mdf||isFirstFrame)){styleElem.pElem.setAttribute("stroke","rgb("+bmFloor(itemData.c.v[0])+","+bmFloor(itemData.c.v[1])+","+bmFloor(itemData.c.v[2])+")")
}if(itemData.o._mdf||isFirstFrame){styleElem.pElem.setAttribute("stroke-opacity",itemData.o.v)
}if(itemData.w._mdf||isFirstFrame){styleElem.pElem.setAttribute("stroke-width",itemData.w.v);
if(styleElem.msElem){styleElem.msElem.setAttribute("stroke-width",itemData.w.v)
}}}return ob
}();
function SVGShapeElement(data,globalData,comp){this.shapes=[];
this.shapesData=data.shapes;
this.stylesList=[];
this.shapeModifiers=[];
this.itemsData=[];
this.processedElements=[];
this.animatedContents=[];
this.initElement(data,globalData,comp);
this.prevViewData=[]
}extendPrototype([BaseElement,TransformElement,SVGBaseElement,IShapeElement,HierarchyElement,FrameElement,RenderableDOMElement],SVGShapeElement);
SVGShapeElement.prototype.initSecondaryElement=function(){};
SVGShapeElement.prototype.identityMatrix=new Matrix();
SVGShapeElement.prototype.buildExpressionInterface=function(){};
SVGShapeElement.prototype.createContent=function(){this.searchShapes(this.shapesData,this.itemsData,this.prevViewData,this.layerElement,0,[],true);
this.filterUniqueShapes()
};
SVGShapeElement.prototype.filterUniqueShapes=function(){var i;
var len=this.shapes.length;
var shape;
var j;
var jLen=this.stylesList.length;
var style;
var tempShapes=[];
var areAnimated=false;
for(j=0;
j<jLen;
j+=1){style=this.stylesList[j];
areAnimated=false;
tempShapes.length=0;
for(i=0;
i<len;
i+=1){shape=this.shapes[i];
if(shape.styles.indexOf(style)!==-1){tempShapes.push(shape);
areAnimated=shape._isAnimated||areAnimated
}}if(tempShapes.length>1&&areAnimated){this.setShapesAsAnimated(tempShapes)
}}};
SVGShapeElement.prototype.setShapesAsAnimated=function(shapes){var i;
var len=shapes.length;
for(i=0;
i<len;
i+=1){shapes[i].setAsAnimated()
}};
SVGShapeElement.prototype.createStyleElement=function(data,level){var elementData;
var styleOb=new SVGStyleData(data,level);
var pathElement=styleOb.pElem;
if(data.ty==="st"){elementData=new SVGStrokeStyleData(this,data,styleOb)
}else{if(data.ty==="fl"){elementData=new SVGFillStyleData(this,data,styleOb)
}else{if(data.ty==="gf"||data.ty==="gs"){var GradientConstructor=data.ty==="gf"?SVGGradientFillStyleData:SVGGradientStrokeStyleData;
elementData=new GradientConstructor(this,data,styleOb);
this.globalData.defs.appendChild(elementData.gf);
if(elementData.maskId){this.globalData.defs.appendChild(elementData.ms);
this.globalData.defs.appendChild(elementData.of);
pathElement.setAttribute("mask","url("+getLocationHref()+"#"+elementData.maskId+")")
}}else{if(data.ty==="no"){elementData=new SVGNoStyleData(this,data,styleOb)
}}}}if(data.ty==="st"||data.ty==="gs"){pathElement.setAttribute("stroke-linecap",lineCapEnum[data.lc||2]);
pathElement.setAttribute("stroke-linejoin",lineJoinEnum[data.lj||2]);
pathElement.setAttribute("fill-opacity","0");
if(data.lj===1){pathElement.setAttribute("stroke-miterlimit",data.ml)
}}if(data.r===2){pathElement.setAttribute("fill-rule","evenodd")
}if(data.ln){pathElement.setAttribute("id",data.ln)
}if(data.cl){pathElement.setAttribute("class",data.cl)
}if(data.bm){pathElement.style["mix-blend-mode"]=getBlendMode(data.bm)
}this.stylesList.push(styleOb);
this.addToAnimatedContents(data,elementData);
return elementData
};
SVGShapeElement.prototype.createGroupElement=function(data){var elementData=new ShapeGroupData();
if(data.ln){elementData.gr.setAttribute("id",data.ln)
}if(data.cl){elementData.gr.setAttribute("class",data.cl)
}if(data.bm){elementData.gr.style["mix-blend-mode"]=getBlendMode(data.bm)
}return elementData
};
SVGShapeElement.prototype.createTransformElement=function(data,container){var transformProperty=TransformPropertyFactory.getTransformProperty(this,data,this);
var elementData=new SVGTransformData(transformProperty,transformProperty.o,container);
this.addToAnimatedContents(data,elementData);
return elementData
};
SVGShapeElement.prototype.createShapeElement=function(data,ownTransformers,level){var ty=4;
if(data.ty==="rc"){ty=5
}else{if(data.ty==="el"){ty=6
}else{if(data.ty==="sr"){ty=7
}}}var shapeProperty=ShapePropertyFactory.getShapeProp(this,data,ty,this);
var elementData=new SVGShapeData(ownTransformers,level,shapeProperty);
this.shapes.push(elementData);
this.addShapeToModifiers(elementData);
this.addToAnimatedContents(data,elementData);
return elementData
};
SVGShapeElement.prototype.addToAnimatedContents=function(data,element){var i=0;
var len=this.animatedContents.length;
while(i<len){if(this.animatedContents[i].element===element){return
}i+=1
}this.animatedContents.push({fn:SVGElementsRenderer.createRenderFunction(data),element:element,data:data})
};
SVGShapeElement.prototype.setElementStyles=function(elementData){var arr=elementData.styles;
var j;
var jLen=this.stylesList.length;
for(j=0;
j<jLen;
j+=1){if(!this.stylesList[j].closed){arr.push(this.stylesList[j])
}}};
SVGShapeElement.prototype.reloadShapes=function(){this._isFirstFrame=true;
var i;
var len=this.itemsData.length;
for(i=0;
i<len;
i+=1){this.prevViewData[i]=this.itemsData[i]
}this.searchShapes(this.shapesData,this.itemsData,this.prevViewData,this.layerElement,0,[],true);
this.filterUniqueShapes();
len=this.dynamicProperties.length;
for(i=0;
i<len;
i+=1){this.dynamicProperties[i].getValue()
}this.renderModifiers()
};
SVGShapeElement.prototype.searchShapes=function(arr,itemsData,prevViewData,container,level,transformers,render){var ownTransformers=[].concat(transformers);
var i;
var len=arr.length-1;
var j;
var jLen;
var ownStyles=[];
var ownModifiers=[];
var currentTransform;
var modifier;
var processedPos;
for(i=len;
i>=0;
i-=1){processedPos=this.searchProcessedElement(arr[i]);
if(!processedPos){arr[i]._render=render
}else{itemsData[i]=prevViewData[processedPos-1]
}if(arr[i].ty==="fl"||arr[i].ty==="st"||arr[i].ty==="gf"||arr[i].ty==="gs"||arr[i].ty==="no"){if(!processedPos){itemsData[i]=this.createStyleElement(arr[i],level)
}else{itemsData[i].style.closed=false
}if(arr[i]._render){if(itemsData[i].style.pElem.parentNode!==container){container.appendChild(itemsData[i].style.pElem)
}}ownStyles.push(itemsData[i].style)
}else{if(arr[i].ty==="gr"){if(!processedPos){itemsData[i]=this.createGroupElement(arr[i])
}else{jLen=itemsData[i].it.length;
for(j=0;
j<jLen;
j+=1){itemsData[i].prevViewData[j]=itemsData[i].it[j]
}}this.searchShapes(arr[i].it,itemsData[i].it,itemsData[i].prevViewData,itemsData[i].gr,level+1,ownTransformers,render);
if(arr[i]._render){if(itemsData[i].gr.parentNode!==container){container.appendChild(itemsData[i].gr)
}}}else{if(arr[i].ty==="tr"){if(!processedPos){itemsData[i]=this.createTransformElement(arr[i],container)
}currentTransform=itemsData[i].transform;
ownTransformers.push(currentTransform)
}else{if(arr[i].ty==="sh"||arr[i].ty==="rc"||arr[i].ty==="el"||arr[i].ty==="sr"){if(!processedPos){itemsData[i]=this.createShapeElement(arr[i],ownTransformers,level)
}this.setElementStyles(itemsData[i])
}else{if(arr[i].ty==="tm"||arr[i].ty==="rd"||arr[i].ty==="ms"||arr[i].ty==="pb"||arr[i].ty==="zz"||arr[i].ty==="op"){if(!processedPos){modifier=ShapeModifiers.getModifier(arr[i].ty);
modifier.init(this,arr[i]);
itemsData[i]=modifier;
this.shapeModifiers.push(modifier)
}else{modifier=itemsData[i];
modifier.closed=false
}ownModifiers.push(modifier)
}else{if(arr[i].ty==="rp"){if(!processedPos){modifier=ShapeModifiers.getModifier(arr[i].ty);
itemsData[i]=modifier;
modifier.init(this,arr,i,itemsData);
this.shapeModifiers.push(modifier);
render=false
}else{modifier=itemsData[i];
modifier.closed=true
}ownModifiers.push(modifier)
}}}}}}this.addProcessedElement(arr[i],i+1)
}len=ownStyles.length;
for(i=0;
i<len;
i+=1){ownStyles[i].closed=true
}len=ownModifiers.length;
for(i=0;
i<len;
i+=1){ownModifiers[i].closed=true
}};
SVGShapeElement.prototype.renderInnerContent=function(){this.renderModifiers();
var i;
var len=this.stylesList.length;
for(i=0;
i<len;
i+=1){this.stylesList[i].reset()
}this.renderShape();
for(i=0;
i<len;
i+=1){if(this.stylesList[i]._mdf||this._isFirstFrame){if(this.stylesList[i].msElem){this.stylesList[i].msElem.setAttribute("d",this.stylesList[i].d);
this.stylesList[i].d="M0 0"+this.stylesList[i].d
}this.stylesList[i].pElem.setAttribute("d",this.stylesList[i].d||"M0 0")
}}};
SVGShapeElement.prototype.renderShape=function(){var i;
var len=this.animatedContents.length;
var animatedContent;
for(i=0;
i<len;
i+=1){animatedContent=this.animatedContents[i];
if((this._isFirstFrame||animatedContent.element._isAnimated)&&animatedContent.data!==true){animatedContent.fn(animatedContent.data,animatedContent.element,this._isFirstFrame)
}}};
SVGShapeElement.prototype.destroy=function(){this.destroyBaseElement();
this.shapesData=null;
this.itemsData=null
};
function LetterProps(o,sw,sc,fc,m,p){this.o=o;
this.sw=sw;
this.sc=sc;
this.fc=fc;
this.m=m;
this.p=p;
this._mdf={o:true,sw:!!sw,sc:!!sc,fc:!!fc,m:true,p:true}
}LetterProps.prototype.update=function(o,sw,sc,fc,m,p){this._mdf.o=false;
this._mdf.sw=false;
this._mdf.sc=false;
this._mdf.fc=false;
this._mdf.m=false;
this._mdf.p=false;
var updated=false;
if(this.o!==o){this.o=o;
this._mdf.o=true;
updated=true
}if(this.sw!==sw){this.sw=sw;
this._mdf.sw=true;
updated=true
}if(this.sc!==sc){this.sc=sc;
this._mdf.sc=true;
updated=true
}if(this.fc!==fc){this.fc=fc;
this._mdf.fc=true;
updated=true
}if(this.m!==m){this.m=m;
this._mdf.m=true;
updated=true
}if(p.length&&(this.p[0]!==p[0]||this.p[1]!==p[1]||this.p[4]!==p[4]||this.p[5]!==p[5]||this.p[12]!==p[12]||this.p[13]!==p[13])){this.p=p;
this._mdf.p=true;
updated=true
}return updated
};
function TextProperty(elem,data){this._frameId=initialDefaultFrame;
this.pv="";
this.v="";
this.kf=false;
this._isFirstFrame=true;
this._mdf=false;
if(data.d&&data.d.sid){data.d=elem.globalData.slotManager.getProp(data.d)
}this.data=data;
this.elem=elem;
this.comp=this.elem.comp;
this.keysIndex=0;
this.canResize=false;
this.minimumFontSize=1;
this.effectsSequence=[];
this.currentData={ascent:0,boxWidth:this.defaultBoxWidth,f:"",fStyle:"",fWeight:"",fc:"",j:"",justifyOffset:"",l:[],lh:0,lineWidths:[],ls:"",of:"",s:"",sc:"",sw:0,t:0,tr:0,sz:0,ps:null,fillColorAnim:false,strokeColorAnim:false,strokeWidthAnim:false,yOffset:0,finalSize:0,finalText:[],finalLineHeight:0,__complete:false};
this.copyData(this.currentData,this.data.d.k[0].s);
if(!this.searchProperty()){this.completeTextData(this.currentData)
}}TextProperty.prototype.defaultBoxWidth=[0,0];
TextProperty.prototype.copyData=function(obj,data){for(var s in data){if(Object.prototype.hasOwnProperty.call(data,s)){obj[s]=data[s]
}}return obj
};
TextProperty.prototype.setCurrentData=function(data){if(!data.__complete){this.completeTextData(data)
}this.currentData=data;
this.currentData.boxWidth=this.currentData.boxWidth||this.defaultBoxWidth;
this._mdf=true
};
TextProperty.prototype.searchProperty=function(){return this.searchKeyframes()
};
TextProperty.prototype.searchKeyframes=function(){this.kf=this.data.d.k.length>1;
if(this.kf){this.addEffect(this.getKeyframeValue.bind(this))
}return this.kf
};
TextProperty.prototype.addEffect=function(effectFunction){this.effectsSequence.push(effectFunction);
this.elem.addDynamicProperty(this)
};
TextProperty.prototype.getValue=function(_finalValue){if((this.elem.globalData.frameId===this.frameId||!this.effectsSequence.length)&&!_finalValue){return
}this.currentData.t=this.data.d.k[this.keysIndex].s.t;
var currentValue=this.currentData;
var currentIndex=this.keysIndex;
if(this.lock){this.setCurrentData(this.currentData);
return
}this.lock=true;
this._mdf=false;
var i;
var len=this.effectsSequence.length;
var finalValue=_finalValue||this.data.d.k[this.keysIndex].s;
for(i=0;
i<len;
i+=1){if(currentIndex!==this.keysIndex){finalValue=this.effectsSequence[i](finalValue,finalValue.t)
}else{finalValue=this.effectsSequence[i](this.currentData,finalValue.t)
}}if(currentValue!==finalValue){this.setCurrentData(finalValue)
}this.v=this.currentData;
this.pv=this.v;
this.lock=false;
this.frameId=this.elem.globalData.frameId
};
TextProperty.prototype.getKeyframeValue=function(){var textKeys=this.data.d.k;
var frameNum=this.elem.comp.renderedFrame;
var i=0;
var len=textKeys.length;
while(i<=len-1){if(i===len-1||textKeys[i+1].t>frameNum){break
}i+=1
}if(this.keysIndex!==i){this.keysIndex=i
}return this.data.d.k[this.keysIndex].s
};
TextProperty.prototype.buildFinalText=function(text){var charactersArray=[];
var i=0;
var len=text.length;
var charCode;
var secondCharCode;
var shouldCombine=false;
while(i<len){charCode=text.charCodeAt(i);
if(FontManager.isCombinedCharacter(charCode)){charactersArray[charactersArray.length-1]+=text.charAt(i)
}else{if(charCode>=55296&&charCode<=56319){secondCharCode=text.charCodeAt(i+1);
if(secondCharCode>=56320&&secondCharCode<=57343){if(shouldCombine||FontManager.isModifier(charCode,secondCharCode)){charactersArray[charactersArray.length-1]+=text.substr(i,2);
shouldCombine=false
}else{charactersArray.push(text.substr(i,2))
}i+=1
}else{charactersArray.push(text.charAt(i))
}}else{if(charCode>56319){secondCharCode=text.charCodeAt(i+1);
if(FontManager.isZeroWidthJoiner(charCode,secondCharCode)){shouldCombine=true;
charactersArray[charactersArray.length-1]+=text.substr(i,2);
i+=1
}else{charactersArray.push(text.charAt(i))
}}else{if(FontManager.isZeroWidthJoiner(charCode)){charactersArray[charactersArray.length-1]+=text.charAt(i);
shouldCombine=true
}else{charactersArray.push(text.charAt(i))
}}}}i+=1
}return charactersArray
};
TextProperty.prototype.completeTextData=function(documentData){documentData.__complete=true;
var fontManager=this.elem.globalData.fontManager;
var data=this.data;
var letters=[];
var i;
var len;
var newLineFlag;
var index=0;
var val;
var anchorGrouping=data.m.g;
var currentSize=0;
var currentPos=0;
var currentLine=0;
var lineWidths=[];
var lineWidth=0;
var maxLineWidth=0;
var j;
var jLen;
var fontData=fontManager.getFontByName(documentData.f);
var charData;
var cLength=0;
var fontProps=getFontProperties(fontData);
documentData.fWeight=fontProps.weight;
documentData.fStyle=fontProps.style;
documentData.finalSize=documentData.s;
documentData.finalText=this.buildFinalText(documentData.t);
len=documentData.finalText.length;
documentData.finalLineHeight=documentData.lh;
var trackingOffset=documentData.tr/1000*documentData.finalSize;
var charCode;
if(documentData.sz){var flag=true;
var boxWidth=documentData.sz[0];
var boxHeight=documentData.sz[1];
var currentHeight;
var finalText;
while(flag){finalText=this.buildFinalText(documentData.t);
currentHeight=0;
lineWidth=0;
len=finalText.length;
trackingOffset=documentData.tr/1000*documentData.finalSize;
var lastSpaceIndex=-1;
for(i=0;
i<len;
i+=1){charCode=finalText[i].charCodeAt(0);
newLineFlag=false;
if(finalText[i]===" "){lastSpaceIndex=i
}else{if(charCode===13||charCode===3){lineWidth=0;
newLineFlag=true;
currentHeight+=documentData.finalLineHeight||documentData.finalSize*1.2
}}if(fontManager.chars){charData=fontManager.getCharData(finalText[i],fontData.fStyle,fontData.fFamily);
cLength=newLineFlag?0:charData.w*documentData.finalSize/100
}else{cLength=fontManager.measureText(finalText[i],documentData.f,documentData.finalSize)
}if(lineWidth+cLength>boxWidth&&finalText[i]!==" "){if(lastSpaceIndex===-1){len+=1
}else{i=lastSpaceIndex
}currentHeight+=documentData.finalLineHeight||documentData.finalSize*1.2;
finalText.splice(i,lastSpaceIndex===i?1:0,"\r");
lastSpaceIndex=-1;
lineWidth=0
}else{lineWidth+=cLength;
lineWidth+=trackingOffset
}}currentHeight+=fontData.ascent*documentData.finalSize/100;
if(this.canResize&&documentData.finalSize>this.minimumFontSize&&boxHeight<currentHeight){documentData.finalSize-=1;
documentData.finalLineHeight=documentData.finalSize*documentData.lh/documentData.s
}else{documentData.finalText=finalText;
len=documentData.finalText.length;
flag=false
}}}lineWidth=-trackingOffset;
cLength=0;
var uncollapsedSpaces=0;
var currentChar;
for(i=0;
i<len;
i+=1){newLineFlag=false;
currentChar=documentData.finalText[i];
charCode=currentChar.charCodeAt(0);
if(charCode===13||charCode===3){uncollapsedSpaces=0;
lineWidths.push(lineWidth);
maxLineWidth=lineWidth>maxLineWidth?lineWidth:maxLineWidth;
lineWidth=-2*trackingOffset;
val="";
newLineFlag=true;
currentLine+=1
}else{val=currentChar
}if(fontManager.chars){charData=fontManager.getCharData(currentChar,fontData.fStyle,fontManager.getFontByName(documentData.f).fFamily);
cLength=newLineFlag?0:charData.w*documentData.finalSize/100
}else{cLength=fontManager.measureText(val,documentData.f,documentData.finalSize)
}if(currentChar===" "){uncollapsedSpaces+=cLength+trackingOffset
}else{lineWidth+=cLength+trackingOffset+uncollapsedSpaces;
uncollapsedSpaces=0
}letters.push({l:cLength,an:cLength,add:currentSize,n:newLineFlag,anIndexes:[],val:val,line:currentLine,animatorJustifyOffset:0});
if(anchorGrouping==2){currentSize+=cLength;
if(val===""||val===" "||i===len-1){if(val===""||val===" "){currentSize-=cLength
}while(currentPos<=i){letters[currentPos].an=currentSize;
letters[currentPos].ind=index;
letters[currentPos].extra=cLength;
currentPos+=1
}index+=1;
currentSize=0
}}else{if(anchorGrouping==3){currentSize+=cLength;
if(val===""||i===len-1){if(val===""){currentSize-=cLength
}while(currentPos<=i){letters[currentPos].an=currentSize;
letters[currentPos].ind=index;
letters[currentPos].extra=cLength;
currentPos+=1
}currentSize=0;
index+=1
}}else{letters[index].ind=index;
letters[index].extra=0;
index+=1
}}}documentData.l=letters;
maxLineWidth=lineWidth>maxLineWidth?lineWidth:maxLineWidth;
lineWidths.push(lineWidth);
if(documentData.sz){documentData.boxWidth=documentData.sz[0];
documentData.justifyOffset=0
}else{documentData.boxWidth=maxLineWidth;
switch(documentData.j){case 1:documentData.justifyOffset=-documentData.boxWidth;
break;
case 2:documentData.justifyOffset=-documentData.boxWidth/2;
break;
default:documentData.justifyOffset=0
}}documentData.lineWidths=lineWidths;
var animators=data.a;
var animatorData;
var letterData;
jLen=animators.length;
var based;
var ind;
var indexes=[];
for(j=0;
j<jLen;
j+=1){animatorData=animators[j];
if(animatorData.a.sc){documentData.strokeColorAnim=true
}if(animatorData.a.sw){documentData.strokeWidthAnim=true
}if(animatorData.a.fc||animatorData.a.fh||animatorData.a.fs||animatorData.a.fb){documentData.fillColorAnim=true
}ind=0;
based=animatorData.s.b;
for(i=0;
i<len;
i+=1){letterData=letters[i];
letterData.anIndexes[j]=ind;
if(based==1&&letterData.val!==""||based==2&&letterData.val!==""&&letterData.val!==" "||based==3&&(letterData.n||letterData.val==" "||i==len-1)||based==4&&(letterData.n||i==len-1)){if(animatorData.s.rn===1){indexes.push(ind)
}ind+=1
}}data.a[j].s.totalChars=ind;
var currentInd=-1;
var newInd;
if(animatorData.s.rn===1){for(i=0;
i<len;
i+=1){letterData=letters[i];
if(currentInd!=letterData.anIndexes[j]){currentInd=letterData.anIndexes[j];
newInd=indexes.splice(Math.floor(Math.random()*indexes.length),1)[0]
}letterData.anIndexes[j]=newInd
}}}documentData.yOffset=documentData.finalLineHeight||documentData.finalSize*1.2;
documentData.ls=documentData.ls||0;
documentData.ascent=fontData.ascent*documentData.finalSize/100
};
TextProperty.prototype.updateDocumentData=function(newData,index){index=index===undefined?this.keysIndex:index;
var dData=this.copyData({},this.data.d.k[index].s);
dData=this.copyData(dData,newData);
this.data.d.k[index].s=dData;
this.recalculate(index);
this.setCurrentData(dData);
this.elem.addDynamicProperty(this)
};
TextProperty.prototype.recalculate=function(index){var dData=this.data.d.k[index].s;
dData.__complete=false;
this.keysIndex=0;
this._isFirstFrame=true;
this.getValue(dData)
};
TextProperty.prototype.canResizeFont=function(_canResize){this.canResize=_canResize;
this.recalculate(this.keysIndex);
this.elem.addDynamicProperty(this)
};
TextProperty.prototype.setMinimumFontSize=function(_fontValue){this.minimumFontSize=Math.floor(_fontValue)||1;
this.recalculate(this.keysIndex);
this.elem.addDynamicProperty(this)
};
var TextSelectorProp=function(){var max=Math.max;
var min=Math.min;
var floor=Math.floor;
function TextSelectorPropFactory(elem,data){this._currentTextLength=-1;
this.k=false;
this.data=data;
this.elem=elem;
this.comp=elem.comp;
this.finalS=0;
this.finalE=0;
this.initDynamicPropertyContainer(elem);
this.s=PropertyFactory.getProp(elem,data.s||{k:0},0,0,this);
if("e" in data){this.e=PropertyFactory.getProp(elem,data.e,0,0,this)
}else{this.e={v:100}
}this.o=PropertyFactory.getProp(elem,data.o||{k:0},0,0,this);
this.xe=PropertyFactory.getProp(elem,data.xe||{k:0},0,0,this);
this.ne=PropertyFactory.getProp(elem,data.ne||{k:0},0,0,this);
this.sm=PropertyFactory.getProp(elem,data.sm||{k:100},0,0,this);
this.a=PropertyFactory.getProp(elem,data.a,0,0.01,this);
if(!this.dynamicProperties.length){this.getValue()
}}TextSelectorPropFactory.prototype={getMult:function getMult(ind){if(this._currentTextLength!==this.elem.textProperty.currentData.l.length){this.getValue()
}var x1=0;
var y1=0;
var x2=1;
var y2=1;
if(this.ne.v>0){x1=this.ne.v/100
}else{y1=-this.ne.v/100
}if(this.xe.v>0){x2=1-this.xe.v/100
}else{y2=1+this.xe.v/100
}var easer=BezierFactory.getBezierEasing(x1,y1,x2,y2).get;
var mult=0;
var s=this.finalS;
var e=this.finalE;
var type=this.data.sh;
if(type===2){if(e===s){mult=ind>=e?1:0
}else{mult=max(0,min(0.5/(e-s)+(ind-s)/(e-s),1))
}mult=easer(mult)
}else{if(type===3){if(e===s){mult=ind>=e?0:1
}else{mult=1-max(0,min(0.5/(e-s)+(ind-s)/(e-s),1))
}mult=easer(mult)
}else{if(type===4){if(e===s){mult=0
}else{mult=max(0,min(0.5/(e-s)+(ind-s)/(e-s),1));
if(mult<0.5){mult*=2
}else{mult=1-2*(mult-0.5)
}}mult=easer(mult)
}else{if(type===5){if(e===s){mult=0
}else{var tot=e-s;
ind=min(max(0,ind+0.5-s),e-s);
var x=-tot/2+ind;
var a=tot/2;
mult=Math.sqrt(1-x*x/(a*a))
}mult=easer(mult)
}else{if(type===6){if(e===s){mult=0
}else{ind=min(max(0,ind+0.5-s),e-s);
mult=(1+Math.cos(Math.PI+Math.PI*2*ind/(e-s)))/2
}mult=easer(mult)
}else{if(ind>=floor(s)){if(ind-s<0){mult=max(0,min(min(e,1)-(s-ind),1))
}else{mult=max(0,min(e-ind,1))
}}mult=easer(mult)
}}}}}if(this.sm.v!==100){var smoothness=this.sm.v*0.01;
if(smoothness===0){smoothness=1e-8
}var threshold=0.5-smoothness*0.5;
if(mult<threshold){mult=0
}else{mult=(mult-threshold)/smoothness;
if(mult>1){mult=1
}}}return mult*this.a.v
},getValue:function getValue(newCharsFlag){this.iterateDynamicProperties();
this._mdf=newCharsFlag||this._mdf;
this._currentTextLength=this.elem.textProperty.currentData.l.length||0;
if(newCharsFlag&&this.data.r===2){this.e.v=this._currentTextLength
}var divisor=this.data.r===2?1:100/this.data.totalChars;
var o=this.o.v/divisor;
var s=this.s.v/divisor+o;
var e=this.e.v/divisor+o;
if(s>e){var _s=s;
s=e;
e=_s
}this.finalS=s;
this.finalE=e
}};
extendPrototype([DynamicPropertyContainer],TextSelectorPropFactory);
function getTextSelectorProp(elem,data,arr){return new TextSelectorPropFactory(elem,data,arr)
}return{getTextSelectorProp:getTextSelectorProp}
}();
function TextAnimatorDataProperty(elem,animatorProps,container){var defaultData={propType:false};
var getProp=PropertyFactory.getProp;
var textAnimatorAnimatables=animatorProps.a;
this.a={r:textAnimatorAnimatables.r?getProp(elem,textAnimatorAnimatables.r,0,degToRads,container):defaultData,rx:textAnimatorAnimatables.rx?getProp(elem,textAnimatorAnimatables.rx,0,degToRads,container):defaultData,ry:textAnimatorAnimatables.ry?getProp(elem,textAnimatorAnimatables.ry,0,degToRads,container):defaultData,sk:textAnimatorAnimatables.sk?getProp(elem,textAnimatorAnimatables.sk,0,degToRads,container):defaultData,sa:textAnimatorAnimatables.sa?getProp(elem,textAnimatorAnimatables.sa,0,degToRads,container):defaultData,s:textAnimatorAnimatables.s?getProp(elem,textAnimatorAnimatables.s,1,0.01,container):defaultData,a:textAnimatorAnimatables.a?getProp(elem,textAnimatorAnimatables.a,1,0,container):defaultData,o:textAnimatorAnimatables.o?getProp(elem,textAnimatorAnimatables.o,0,0.01,container):defaultData,p:textAnimatorAnimatables.p?getProp(elem,textAnimatorAnimatables.p,1,0,container):defaultData,sw:textAnimatorAnimatables.sw?getProp(elem,textAnimatorAnimatables.sw,0,0,container):defaultData,sc:textAnimatorAnimatables.sc?getProp(elem,textAnimatorAnimatables.sc,1,0,container):defaultData,fc:textAnimatorAnimatables.fc?getProp(elem,textAnimatorAnimatables.fc,1,0,container):defaultData,fh:textAnimatorAnimatables.fh?getProp(elem,textAnimatorAnimatables.fh,0,0,container):defaultData,fs:textAnimatorAnimatables.fs?getProp(elem,textAnimatorAnimatables.fs,0,0.01,container):defaultData,fb:textAnimatorAnimatables.fb?getProp(elem,textAnimatorAnimatables.fb,0,0.01,container):defaultData,t:textAnimatorAnimatables.t?getProp(elem,textAnimatorAnimatables.t,0,0,container):defaultData};
this.s=TextSelectorProp.getTextSelectorProp(elem,animatorProps.s,container);
this.s.t=animatorProps.s.t
}function TextAnimatorProperty(textData,renderType,elem){this._isFirstFrame=true;
this._hasMaskedPath=false;
this._frameId=-1;
this._textData=textData;
this._renderType=renderType;
this._elem=elem;
this._animatorsData=createSizedArray(this._textData.a.length);
this._pathData={};
this._moreOptions={alignment:{}};
this.renderedLetters=[];
this.lettersChangedFlag=false;
this.initDynamicPropertyContainer(elem)
}TextAnimatorProperty.prototype.searchProperties=function(){var i;
var len=this._textData.a.length;
var animatorProps;
var getProp=PropertyFactory.getProp;
for(i=0;
i<len;
i+=1){animatorProps=this._textData.a[i];
this._animatorsData[i]=new TextAnimatorDataProperty(this._elem,animatorProps,this)
}if(this._textData.p&&"m" in this._textData.p){this._pathData={a:getProp(this._elem,this._textData.p.a,0,0,this),f:getProp(this._elem,this._textData.p.f,0,0,this),l:getProp(this._elem,this._textData.p.l,0,0,this),r:getProp(this._elem,this._textData.p.r,0,0,this),p:getProp(this._elem,this._textData.p.p,0,0,this),m:this._elem.maskManager.getMaskProperty(this._textData.p.m)};
this._hasMaskedPath=true
}else{this._hasMaskedPath=false
}this._moreOptions.alignment=getProp(this._elem,this._textData.m.a,1,0,this)
};
TextAnimatorProperty.prototype.getMeasures=function(documentData,lettersChangedFlag){this.lettersChangedFlag=lettersChangedFlag;
if(!this._mdf&&!this._isFirstFrame&&!lettersChangedFlag&&(!this._hasMaskedPath||!this._pathData.m._mdf)){return
}this._isFirstFrame=false;
var alignment=this._moreOptions.alignment.v;
var animators=this._animatorsData;
var textData=this._textData;
var matrixHelper=this.mHelper;
var renderType=this._renderType;
var renderedLettersCount=this.renderedLetters.length;
var xPos;
var yPos;
var i;
var len;
var letters=documentData.l;
var pathInfo;
var currentLength;
var currentPoint;
var segmentLength;
var flag;
var pointInd;
var segmentInd;
var prevPoint;
var points;
var segments;
var partialLength;
var totalLength;
var perc;
var tanAngle;
var mask;
if(this._hasMaskedPath){mask=this._pathData.m;
if(!this._pathData.n||this._pathData._mdf){var paths=mask.v;
if(this._pathData.r.v){paths=paths.reverse()
}pathInfo={tLength:0,segments:[]};
len=paths._length-1;
var bezierData;
totalLength=0;
for(i=0;
i<len;
i+=1){bezierData=bez.buildBezierData(paths.v[i],paths.v[i+1],[paths.o[i][0]-paths.v[i][0],paths.o[i][1]-paths.v[i][1]],[paths.i[i+1][0]-paths.v[i+1][0],paths.i[i+1][1]-paths.v[i+1][1]]);
pathInfo.tLength+=bezierData.segmentLength;
pathInfo.segments.push(bezierData);
totalLength+=bezierData.segmentLength
}i=len;
if(mask.v.c){bezierData=bez.buildBezierData(paths.v[i],paths.v[0],[paths.o[i][0]-paths.v[i][0],paths.o[i][1]-paths.v[i][1]],[paths.i[0][0]-paths.v[0][0],paths.i[0][1]-paths.v[0][1]]);
pathInfo.tLength+=bezierData.segmentLength;
pathInfo.segments.push(bezierData);
totalLength+=bezierData.segmentLength
}this._pathData.pi=pathInfo
}pathInfo=this._pathData.pi;
currentLength=this._pathData.f.v;
segmentInd=0;
pointInd=1;
segmentLength=0;
flag=true;
segments=pathInfo.segments;
if(currentLength<0&&mask.v.c){if(pathInfo.tLength<Math.abs(currentLength)){currentLength=-Math.abs(currentLength)%pathInfo.tLength
}segmentInd=segments.length-1;
points=segments[segmentInd].points;
pointInd=points.length-1;
while(currentLength<0){currentLength+=points[pointInd].partialLength;
pointInd-=1;
if(pointInd<0){segmentInd-=1;
points=segments[segmentInd].points;
pointInd=points.length-1
}}}points=segments[segmentInd].points;
prevPoint=points[pointInd-1];
currentPoint=points[pointInd];
partialLength=currentPoint.partialLength
}len=letters.length;
xPos=0;
yPos=0;
var yOff=documentData.finalSize*1.2*0.714;
var firstLine=true;
var animatorProps;
var animatorSelector;
var j;
var jLen;
var letterValue;
jLen=animators.length;
var mult;
var ind=-1;
var offf;
var xPathPos;
var yPathPos;
var initPathPos=currentLength;
var initSegmentInd=segmentInd;
var initPointInd=pointInd;
var currentLine=-1;
var elemOpacity;
var sc;
var sw;
var fc;
var k;
var letterSw;
var letterSc;
var letterFc;
var letterM="";
var letterP=this.defaultPropsArray;
var letterO;
if(documentData.j===2||documentData.j===1){var animatorJustifyOffset=0;
var animatorFirstCharOffset=0;
var justifyOffsetMult=documentData.j===2?-0.5:-1;
var lastIndex=0;
var isNewLine=true;
for(i=0;
i<len;
i+=1){if(letters[i].n){if(animatorJustifyOffset){animatorJustifyOffset+=animatorFirstCharOffset
}while(lastIndex<i){letters[lastIndex].animatorJustifyOffset=animatorJustifyOffset;
lastIndex+=1
}animatorJustifyOffset=0;
isNewLine=true
}else{for(j=0;
j<jLen;
j+=1){animatorProps=animators[j].a;
if(animatorProps.t.propType){if(isNewLine&&documentData.j===2){animatorFirstCharOffset+=animatorProps.t.v*justifyOffsetMult
}animatorSelector=animators[j].s;
mult=animatorSelector.getMult(letters[i].anIndexes[j],textData.a[j].s.totalChars);
if(mult.length){animatorJustifyOffset+=animatorProps.t.v*mult[0]*justifyOffsetMult
}else{animatorJustifyOffset+=animatorProps.t.v*mult*justifyOffsetMult
}}}isNewLine=false
}}if(animatorJustifyOffset){animatorJustifyOffset+=animatorFirstCharOffset
}while(lastIndex<i){letters[lastIndex].animatorJustifyOffset=animatorJustifyOffset;
lastIndex+=1
}}for(i=0;
i<len;
i+=1){matrixHelper.reset();
elemOpacity=1;
if(letters[i].n){xPos=0;
yPos+=documentData.yOffset;
yPos+=firstLine?1:0;
currentLength=initPathPos;
firstLine=false;
if(this._hasMaskedPath){segmentInd=initSegmentInd;
pointInd=initPointInd;
points=segments[segmentInd].points;
prevPoint=points[pointInd-1];
currentPoint=points[pointInd];
partialLength=currentPoint.partialLength;
segmentLength=0
}letterM="";
letterFc="";
letterSw="";
letterO="";
letterP=this.defaultPropsArray
}else{if(this._hasMaskedPath){if(currentLine!==letters[i].line){switch(documentData.j){case 1:currentLength+=totalLength-documentData.lineWidths[letters[i].line];
break;
case 2:currentLength+=(totalLength-documentData.lineWidths[letters[i].line])/2;
break;
default:break
}currentLine=letters[i].line
}if(ind!==letters[i].ind){if(letters[ind]){currentLength+=letters[ind].extra
}currentLength+=letters[i].an/2;
ind=letters[i].ind
}currentLength+=alignment[0]*letters[i].an*0.005;
var animatorOffset=0;
for(j=0;
j<jLen;
j+=1){animatorProps=animators[j].a;
if(animatorProps.p.propType){animatorSelector=animators[j].s;
mult=animatorSelector.getMult(letters[i].anIndexes[j],textData.a[j].s.totalChars);
if(mult.length){animatorOffset+=animatorProps.p.v[0]*mult[0]
}else{animatorOffset+=animatorProps.p.v[0]*mult
}}if(animatorProps.a.propType){animatorSelector=animators[j].s;
mult=animatorSelector.getMult(letters[i].anIndexes[j],textData.a[j].s.totalChars);
if(mult.length){animatorOffset+=animatorProps.a.v[0]*mult[0]
}else{animatorOffset+=animatorProps.a.v[0]*mult
}}}flag=true;
if(this._pathData.a.v){currentLength=letters[0].an*0.5+(totalLength-this._pathData.f.v-letters[0].an*0.5-letters[letters.length-1].an*0.5)*ind/(len-1);
currentLength+=this._pathData.f.v
}while(flag){if(segmentLength+partialLength>=currentLength+animatorOffset||!points){perc=(currentLength+animatorOffset-segmentLength)/currentPoint.partialLength;
xPathPos=prevPoint.point[0]+(currentPoint.point[0]-prevPoint.point[0])*perc;
yPathPos=prevPoint.point[1]+(currentPoint.point[1]-prevPoint.point[1])*perc;
matrixHelper.translate(-alignment[0]*letters[i].an*0.005,-(alignment[1]*yOff)*0.01);
flag=false
}else{if(points){segmentLength+=currentPoint.partialLength;
pointInd+=1;
if(pointInd>=points.length){pointInd=0;
segmentInd+=1;
if(!segments[segmentInd]){if(mask.v.c){pointInd=0;
segmentInd=0;
points=segments[segmentInd].points
}else{segmentLength-=currentPoint.partialLength;
points=null
}}else{points=segments[segmentInd].points
}}if(points){prevPoint=currentPoint;
currentPoint=points[pointInd];
partialLength=currentPoint.partialLength
}}}}offf=letters[i].an/2-letters[i].add;
matrixHelper.translate(-offf,0,0)
}else{offf=letters[i].an/2-letters[i].add;
matrixHelper.translate(-offf,0,0);
matrixHelper.translate(-alignment[0]*letters[i].an*0.005,-alignment[1]*yOff*0.01,0)
}for(j=0;
j<jLen;
j+=1){animatorProps=animators[j].a;
if(animatorProps.t.propType){animatorSelector=animators[j].s;
mult=animatorSelector.getMult(letters[i].anIndexes[j],textData.a[j].s.totalChars);
if(xPos!==0||documentData.j!==0){if(this._hasMaskedPath){if(mult.length){currentLength+=animatorProps.t.v*mult[0]
}else{currentLength+=animatorProps.t.v*mult
}}else{if(mult.length){xPos+=animatorProps.t.v*mult[0]
}else{xPos+=animatorProps.t.v*mult
}}}}}if(documentData.strokeWidthAnim){sw=documentData.sw||0
}if(documentData.strokeColorAnim){if(documentData.sc){sc=[documentData.sc[0],documentData.sc[1],documentData.sc[2]]
}else{sc=[0,0,0]
}}if(documentData.fillColorAnim&&documentData.fc){fc=[documentData.fc[0],documentData.fc[1],documentData.fc[2]]
}for(j=0;
j<jLen;
j+=1){animatorProps=animators[j].a;
if(animatorProps.a.propType){animatorSelector=animators[j].s;
mult=animatorSelector.getMult(letters[i].anIndexes[j],textData.a[j].s.totalChars);
if(mult.length){matrixHelper.translate(-animatorProps.a.v[0]*mult[0],-animatorProps.a.v[1]*mult[1],animatorProps.a.v[2]*mult[2])
}else{matrixHelper.translate(-animatorProps.a.v[0]*mult,-animatorProps.a.v[1]*mult,animatorProps.a.v[2]*mult)
}}}for(j=0;
j<jLen;
j+=1){animatorProps=animators[j].a;
if(animatorProps.s.propType){animatorSelector=animators[j].s;
mult=animatorSelector.getMult(letters[i].anIndexes[j],textData.a[j].s.totalChars);
if(mult.length){matrixHelper.scale(1+(animatorProps.s.v[0]-1)*mult[0],1+(animatorProps.s.v[1]-1)*mult[1],1)
}else{matrixHelper.scale(1+(animatorProps.s.v[0]-1)*mult,1+(animatorProps.s.v[1]-1)*mult,1)
}}}for(j=0;
j<jLen;
j+=1){animatorProps=animators[j].a;
animatorSelector=animators[j].s;
mult=animatorSelector.getMult(letters[i].anIndexes[j],textData.a[j].s.totalChars);
if(animatorProps.sk.propType){if(mult.length){matrixHelper.skewFromAxis(-animatorProps.sk.v*mult[0],animatorProps.sa.v*mult[1])
}else{matrixHelper.skewFromAxis(-animatorProps.sk.v*mult,animatorProps.sa.v*mult)
}}if(animatorProps.r.propType){if(mult.length){matrixHelper.rotateZ(-animatorProps.r.v*mult[2])
}else{matrixHelper.rotateZ(-animatorProps.r.v*mult)
}}if(animatorProps.ry.propType){if(mult.length){matrixHelper.rotateY(animatorProps.ry.v*mult[1])
}else{matrixHelper.rotateY(animatorProps.ry.v*mult)
}}if(animatorProps.rx.propType){if(mult.length){matrixHelper.rotateX(animatorProps.rx.v*mult[0])
}else{matrixHelper.rotateX(animatorProps.rx.v*mult)
}}if(animatorProps.o.propType){if(mult.length){elemOpacity+=(animatorProps.o.v*mult[0]-elemOpacity)*mult[0]
}else{elemOpacity+=(animatorProps.o.v*mult-elemOpacity)*mult
}}if(documentData.strokeWidthAnim&&animatorProps.sw.propType){if(mult.length){sw+=animatorProps.sw.v*mult[0]
}else{sw+=animatorProps.sw.v*mult
}}if(documentData.strokeColorAnim&&animatorProps.sc.propType){for(k=0;
k<3;
k+=1){if(mult.length){sc[k]+=(animatorProps.sc.v[k]-sc[k])*mult[0]
}else{sc[k]+=(animatorProps.sc.v[k]-sc[k])*mult
}}}if(documentData.fillColorAnim&&documentData.fc){if(animatorProps.fc.propType){for(k=0;
k<3;
k+=1){if(mult.length){fc[k]+=(animatorProps.fc.v[k]-fc[k])*mult[0]
}else{fc[k]+=(animatorProps.fc.v[k]-fc[k])*mult
}}}if(animatorProps.fh.propType){if(mult.length){fc=addHueToRGB(fc,animatorProps.fh.v*mult[0])
}else{fc=addHueToRGB(fc,animatorProps.fh.v*mult)
}}if(animatorProps.fs.propType){if(mult.length){fc=addSaturationToRGB(fc,animatorProps.fs.v*mult[0])
}else{fc=addSaturationToRGB(fc,animatorProps.fs.v*mult)
}}if(animatorProps.fb.propType){if(mult.length){fc=addBrightnessToRGB(fc,animatorProps.fb.v*mult[0])
}else{fc=addBrightnessToRGB(fc,animatorProps.fb.v*mult)
}}}}for(j=0;
j<jLen;
j+=1){animatorProps=animators[j].a;
if(animatorProps.p.propType){animatorSelector=animators[j].s;
mult=animatorSelector.getMult(letters[i].anIndexes[j],textData.a[j].s.totalChars);
if(this._hasMaskedPath){if(mult.length){matrixHelper.translate(0,animatorProps.p.v[1]*mult[0],-animatorProps.p.v[2]*mult[1])
}else{matrixHelper.translate(0,animatorProps.p.v[1]*mult,-animatorProps.p.v[2]*mult)
}}else{if(mult.length){matrixHelper.translate(animatorProps.p.v[0]*mult[0],animatorProps.p.v[1]*mult[1],-animatorProps.p.v[2]*mult[2])
}else{matrixHelper.translate(animatorProps.p.v[0]*mult,animatorProps.p.v[1]*mult,-animatorProps.p.v[2]*mult)
}}}}if(documentData.strokeWidthAnim){letterSw=sw<0?0:sw
}if(documentData.strokeColorAnim){letterSc="rgb("+Math.round(sc[0]*255)+","+Math.round(sc[1]*255)+","+Math.round(sc[2]*255)+")"
}if(documentData.fillColorAnim&&documentData.fc){letterFc="rgb("+Math.round(fc[0]*255)+","+Math.round(fc[1]*255)+","+Math.round(fc[2]*255)+")"
}if(this._hasMaskedPath){matrixHelper.translate(0,-documentData.ls);
matrixHelper.translate(0,alignment[1]*yOff*0.01+yPos,0);
if(this._pathData.p.v){tanAngle=(currentPoint.point[1]-prevPoint.point[1])/(currentPoint.point[0]-prevPoint.point[0]);
var rot=Math.atan(tanAngle)*180/Math.PI;
if(currentPoint.point[0]<prevPoint.point[0]){rot+=180
}matrixHelper.rotate(-rot*Math.PI/180)
}matrixHelper.translate(xPathPos,yPathPos,0);
currentLength-=alignment[0]*letters[i].an*0.005;
if(letters[i+1]&&ind!==letters[i+1].ind){currentLength+=letters[i].an/2;
currentLength+=documentData.tr*0.001*documentData.finalSize
}}else{matrixHelper.translate(xPos,yPos,0);
if(documentData.ps){matrixHelper.translate(documentData.ps[0],documentData.ps[1]+documentData.ascent,0)
}switch(documentData.j){case 1:matrixHelper.translate(letters[i].animatorJustifyOffset+documentData.justifyOffset+(documentData.boxWidth-documentData.lineWidths[letters[i].line]),0,0);
break;
case 2:matrixHelper.translate(letters[i].animatorJustifyOffset+documentData.justifyOffset+(documentData.boxWidth-documentData.lineWidths[letters[i].line])/2,0,0);
break;
default:break
}matrixHelper.translate(0,-documentData.ls);
matrixHelper.translate(offf,0,0);
matrixHelper.translate(alignment[0]*letters[i].an*0.005,alignment[1]*yOff*0.01,0);
xPos+=letters[i].l+documentData.tr*0.001*documentData.finalSize
}if(renderType==="html"){letterM=matrixHelper.toCSS()
}else{if(renderType==="svg"){letterM=matrixHelper.to2dCSS()
}else{letterP=[matrixHelper.props[0],matrixHelper.props[1],matrixHelper.props[2],matrixHelper.props[3],matrixHelper.props[4],matrixHelper.props[5],matrixHelper.props[6],matrixHelper.props[7],matrixHelper.props[8],matrixHelper.props[9],matrixHelper.props[10],matrixHelper.props[11],matrixHelper.props[12],matrixHelper.props[13],matrixHelper.props[14],matrixHelper.props[15]]
}}letterO=elemOpacity
}if(renderedLettersCount<=i){letterValue=new LetterProps(letterO,letterSw,letterSc,letterFc,letterM,letterP);
this.renderedLetters.push(letterValue);
renderedLettersCount+=1;
this.lettersChangedFlag=true
}else{letterValue=this.renderedLetters[i];
this.lettersChangedFlag=letterValue.update(letterO,letterSw,letterSc,letterFc,letterM,letterP)||this.lettersChangedFlag
}}};
TextAnimatorProperty.prototype.getValue=function(){if(this._elem.globalData.frameId===this._frameId){return
}this._frameId=this._elem.globalData.frameId;
this.iterateDynamicProperties()
};
TextAnimatorProperty.prototype.mHelper=new Matrix();
TextAnimatorProperty.prototype.defaultPropsArray=[];
extendPrototype([DynamicPropertyContainer],TextAnimatorProperty);
function ITextElement(){}ITextElement.prototype.initElement=function(data,globalData,comp){this.lettersChangedFlag=true;
this.initFrame();
this.initBaseData(data,globalData,comp);
this.textProperty=new TextProperty(this,data.t,this.dynamicProperties);
this.textAnimator=new TextAnimatorProperty(data.t,this.renderType,this);
this.initTransform(data,globalData,comp);
this.initHierarchy();
this.initRenderable();
this.initRendererElement();
this.createContainerElements();
this.createRenderableComponents();
this.createContent();
this.hide();
this.textAnimator.searchProperties(this.dynamicProperties)
};
ITextElement.prototype.prepareFrame=function(num){this._mdf=false;
this.prepareRenderableFrame(num);
this.prepareProperties(num,this.isInRange);
if(this.textProperty._mdf||this.textProperty._isFirstFrame){this.buildNewText();
this.textProperty._isFirstFrame=false;
this.textProperty._mdf=false
}};
ITextElement.prototype.createPathShape=function(matrixHelper,shapes){var j;
var jLen=shapes.length;
var pathNodes;
var shapeStr="";
for(j=0;
j<jLen;
j+=1){if(shapes[j].ty==="sh"){pathNodes=shapes[j].ks.k;
shapeStr+=buildShapeString(pathNodes,pathNodes.i.length,true,matrixHelper)
}}return shapeStr
};
ITextElement.prototype.updateDocumentData=function(newData,index){this.textProperty.updateDocumentData(newData,index)
};
ITextElement.prototype.canResizeFont=function(_canResize){this.textProperty.canResizeFont(_canResize)
};
ITextElement.prototype.setMinimumFontSize=function(_fontSize){this.textProperty.setMinimumFontSize(_fontSize)
};
ITextElement.prototype.applyTextPropertiesToMatrix=function(documentData,matrixHelper,lineNumber,xPos,yPos){if(documentData.ps){matrixHelper.translate(documentData.ps[0],documentData.ps[1]+documentData.ascent,0)
}matrixHelper.translate(0,-documentData.ls,0);
switch(documentData.j){case 1:matrixHelper.translate(documentData.justifyOffset+(documentData.boxWidth-documentData.lineWidths[lineNumber]),0,0);
break;
case 2:matrixHelper.translate(documentData.justifyOffset+(documentData.boxWidth-documentData.lineWidths[lineNumber])/2,0,0);
break;
default:break
}matrixHelper.translate(xPos,yPos,0)
};
ITextElement.prototype.buildColor=function(colorData){return"rgb("+Math.round(colorData[0]*255)+","+Math.round(colorData[1]*255)+","+Math.round(colorData[2]*255)+")"
};
ITextElement.prototype.emptyProp=new LetterProps();
ITextElement.prototype.destroy=function(){};
var emptyShapeData={shapes:[]};
function SVGTextLottieElement(data,globalData,comp){this.textSpans=[];
this.renderType="svg";
this.initElement(data,globalData,comp)
}extendPrototype([BaseElement,TransformElement,SVGBaseElement,HierarchyElement,FrameElement,RenderableDOMElement,ITextElement],SVGTextLottieElement);
SVGTextLottieElement.prototype.createContent=function(){if(this.data.singleShape&&!this.globalData.fontManager.chars){this.textContainer=createNS("text")
}};
SVGTextLottieElement.prototype.buildTextContents=function(textArray){var i=0;
var len=textArray.length;
var textContents=[];
var currentTextContent="";
while(i<len){if(textArray[i]===String.fromCharCode(13)||textArray[i]===String.fromCharCode(3)){textContents.push(currentTextContent);
currentTextContent=""
}else{currentTextContent+=textArray[i]
}i+=1
}textContents.push(currentTextContent);
return textContents
};
SVGTextLottieElement.prototype.buildShapeData=function(data,scale){if(data.shapes&&data.shapes.length){var shape=data.shapes[0];
if(shape.it){var shapeItem=shape.it[shape.it.length-1];
if(shapeItem.s){shapeItem.s.k[0]=scale;
shapeItem.s.k[1]=scale
}}}return data
};
SVGTextLottieElement.prototype.buildNewText=function(){this.addDynamicProperty(this);
var i;
var len;
var documentData=this.textProperty.currentData;
this.renderedLetters=createSizedArray(documentData?documentData.l.length:0);
if(documentData.fc){this.layerElement.setAttribute("fill",this.buildColor(documentData.fc))
}else{this.layerElement.setAttribute("fill","rgba(0,0,0,0)")
}if(documentData.sc){this.layerElement.setAttribute("stroke",this.buildColor(documentData.sc));
this.layerElement.setAttribute("stroke-width",documentData.sw)
}this.layerElement.setAttribute("font-size",documentData.finalSize);
var fontData=this.globalData.fontManager.getFontByName(documentData.f);
if(fontData.fClass){this.layerElement.setAttribute("class",fontData.fClass)
}else{this.layerElement.setAttribute("font-family",fontData.fFamily);
var fWeight=documentData.fWeight;
var fStyle=documentData.fStyle;
this.layerElement.setAttribute("font-style",fStyle);
this.layerElement.setAttribute("font-weight",fWeight)
}this.layerElement.setAttribute("aria-label",documentData.t);
var letters=documentData.l||[];
var usesGlyphs=!!this.globalData.fontManager.chars;
len=letters.length;
var tSpan;
var matrixHelper=this.mHelper;
var shapeStr="";
var singleShape=this.data.singleShape;
var xPos=0;
var yPos=0;
var firstLine=true;
var trackingOffset=documentData.tr*0.001*documentData.finalSize;
if(singleShape&&!usesGlyphs&&!documentData.sz){var tElement=this.textContainer;
var justify="start";
switch(documentData.j){case 1:justify="end";
break;
case 2:justify="middle";
break;
default:justify="start";
break
}tElement.setAttribute("text-anchor",justify);
tElement.setAttribute("letter-spacing",trackingOffset);
var textContent=this.buildTextContents(documentData.finalText);
len=textContent.length;
yPos=documentData.ps?documentData.ps[1]+documentData.ascent:0;
for(i=0;
i<len;
i+=1){tSpan=this.textSpans[i].span||createNS("tspan");
tSpan.textContent=textContent[i];
tSpan.setAttribute("x",0);
tSpan.setAttribute("y",yPos);
tSpan.style.display="inherit";
tElement.appendChild(tSpan);
if(!this.textSpans[i]){this.textSpans[i]={span:null,glyph:null}
}this.textSpans[i].span=tSpan;
yPos+=documentData.finalLineHeight
}this.layerElement.appendChild(tElement)
}else{var cachedSpansLength=this.textSpans.length;
var charData;
for(i=0;
i<len;
i+=1){if(!this.textSpans[i]){this.textSpans[i]={span:null,childSpan:null,glyph:null}
}if(!usesGlyphs||!singleShape||i===0){tSpan=cachedSpansLength>i?this.textSpans[i].span:createNS(usesGlyphs?"g":"text");
if(cachedSpansLength<=i){tSpan.setAttribute("stroke-linecap","butt");
tSpan.setAttribute("stroke-linejoin","round");
tSpan.setAttribute("stroke-miterlimit","4");
this.textSpans[i].span=tSpan;
if(usesGlyphs){var childSpan=createNS("g");
tSpan.appendChild(childSpan);
this.textSpans[i].childSpan=childSpan
}this.textSpans[i].span=tSpan;
this.layerElement.appendChild(tSpan)
}tSpan.style.display="inherit"
}matrixHelper.reset();
if(singleShape){if(letters[i].n){xPos=-trackingOffset;
yPos+=documentData.yOffset;
yPos+=firstLine?1:0;
firstLine=false
}this.applyTextPropertiesToMatrix(documentData,matrixHelper,letters[i].line,xPos,yPos);
xPos+=letters[i].l||0;
xPos+=trackingOffset
}if(usesGlyphs){charData=this.globalData.fontManager.getCharData(documentData.finalText[i],fontData.fStyle,this.globalData.fontManager.getFontByName(documentData.f).fFamily);
var glyphElement;
if(charData.t===1){glyphElement=new SVGCompElement(charData.data,this.globalData,this)
}else{var data=emptyShapeData;
if(charData.data&&charData.data.shapes){data=this.buildShapeData(charData.data,documentData.finalSize)
}glyphElement=new SVGShapeElement(data,this.globalData,this)
}if(this.textSpans[i].glyph){var glyph=this.textSpans[i].glyph;
this.textSpans[i].childSpan.removeChild(glyph.layerElement);
glyph.destroy()
}this.textSpans[i].glyph=glyphElement;
glyphElement._debug=true;
glyphElement.prepareFrame(0);
glyphElement.renderFrame();
this.textSpans[i].childSpan.appendChild(glyphElement.layerElement);
if(charData.t===1){this.textSpans[i].childSpan.setAttribute("transform","scale("+documentData.finalSize/100+","+documentData.finalSize/100+")")
}}else{if(singleShape){tSpan.setAttribute("transform","translate("+matrixHelper.props[12]+","+matrixHelper.props[13]+")")
}tSpan.textContent=letters[i].val;
tSpan.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve")
}}if(singleShape&&tSpan){tSpan.setAttribute("d",shapeStr)
}}while(i<this.textSpans.length){this.textSpans[i].span.style.display="none";
i+=1
}this._sizeChanged=true
};
SVGTextLottieElement.prototype.sourceRectAtTime=function(){this.prepareFrame(this.comp.renderedFrame-this.data.st);
this.renderInnerContent();
if(this._sizeChanged){this._sizeChanged=false;
var textBox=this.layerElement.getBBox();
this.bbox={top:textBox.y,left:textBox.x,width:textBox.width,height:textBox.height}
}return this.bbox
};
SVGTextLottieElement.prototype.getValue=function(){var i;
var len=this.textSpans.length;
var glyphElement;
this.renderedFrame=this.comp.renderedFrame;
for(i=0;
i<len;
i+=1){glyphElement=this.textSpans[i].glyph;
if(glyphElement){glyphElement.prepareFrame(this.comp.renderedFrame-this.data.st);
if(glyphElement._mdf){this._mdf=true
}}}};
SVGTextLottieElement.prototype.renderInnerContent=function(){if(!this.data.singleShape||this._mdf){this.textAnimator.getMeasures(this.textProperty.currentData,this.lettersChangedFlag);
if(this.lettersChangedFlag||this.textAnimator.lettersChangedFlag){this._sizeChanged=true;
var i;
var len;
var renderedLetters=this.textAnimator.renderedLetters;
var letters=this.textProperty.currentData.l;
len=letters.length;
var renderedLetter;
var textSpan;
var glyphElement;
for(i=0;
i<len;
i+=1){if(!letters[i].n){renderedLetter=renderedLetters[i];
textSpan=this.textSpans[i].span;
glyphElement=this.textSpans[i].glyph;
if(glyphElement){glyphElement.renderFrame()
}if(renderedLetter._mdf.m){textSpan.setAttribute("transform",renderedLetter.m)
}if(renderedLetter._mdf.o){textSpan.setAttribute("opacity",renderedLetter.o)
}if(renderedLetter._mdf.sw){textSpan.setAttribute("stroke-width",renderedLetter.sw)
}if(renderedLetter._mdf.sc){textSpan.setAttribute("stroke",renderedLetter.sc)
}if(renderedLetter._mdf.fc){textSpan.setAttribute("fill",renderedLetter.fc)
}}}}}};
function ISolidElement(data,globalData,comp){this.initElement(data,globalData,comp)
}extendPrototype([IImageElement],ISolidElement);
ISolidElement.prototype.createContent=function(){var rect=createNS("rect");
rect.setAttribute("width",this.data.sw);
rect.setAttribute("height",this.data.sh);
rect.setAttribute("fill",this.data.sc);
this.layerElement.appendChild(rect)
};
function NullElement(data,globalData,comp){this.initFrame();
this.initBaseData(data,globalData,comp);
this.initFrame();
this.initTransform(data,globalData,comp);
this.initHierarchy()
}NullElement.prototype.prepareFrame=function(num){this.prepareProperties(num,true)
};
NullElement.prototype.renderFrame=function(){};
NullElement.prototype.getBaseElement=function(){return null
};
NullElement.prototype.destroy=function(){};
NullElement.prototype.sourceRectAtTime=function(){};
NullElement.prototype.hide=function(){};
extendPrototype([BaseElement,TransformElement,HierarchyElement,FrameElement],NullElement);
function SVGRendererBase(){}extendPrototype([BaseRenderer],SVGRendererBase);
SVGRendererBase.prototype.createNull=function(data){return new NullElement(data,this.globalData,this)
};
SVGRendererBase.prototype.createShape=function(data){return new SVGShapeElement(data,this.globalData,this)
};
SVGRendererBase.prototype.createText=function(data){return new SVGTextLottieElement(data,this.globalData,this)
};
SVGRendererBase.prototype.createImage=function(data){return new IImageElement(data,this.globalData,this)
};
SVGRendererBase.prototype.createSolid=function(data){return new ISolidElement(data,this.globalData,this)
};
SVGRendererBase.prototype.configAnimation=function(animData){this.svgElement.setAttribute("xmlns","http://www.w3.org/2000/svg");
this.svgElement.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");
if(this.renderConfig.viewBoxSize){this.svgElement.setAttribute("viewBox",this.renderConfig.viewBoxSize)
}else{this.svgElement.setAttribute("viewBox","0 0 "+animData.w+" "+animData.h)
}if(!this.renderConfig.viewBoxOnly){this.svgElement.setAttribute("width",animData.w);
this.svgElement.setAttribute("height",animData.h);
this.svgElement.style.width="100%";
this.svgElement.style.height="100%";
this.svgElement.style.transform="translate3d(0,0,0)";
this.svgElement.style.contentVisibility=this.renderConfig.contentVisibility
}if(this.renderConfig.width){this.svgElement.setAttribute("width",this.renderConfig.width)
}if(this.renderConfig.height){this.svgElement.setAttribute("height",this.renderConfig.height)
}if(this.renderConfig.className){this.svgElement.setAttribute("class",this.renderConfig.className)
}if(this.renderConfig.id){this.svgElement.setAttribute("id",this.renderConfig.id)
}if(this.renderConfig.focusable!==undefined){this.svgElement.setAttribute("focusable",this.renderConfig.focusable)
}this.svgElement.setAttribute("preserveAspectRatio",this.renderConfig.preserveAspectRatio);
this.animationItem.wrapper.appendChild(this.svgElement);
var defs=this.globalData.defs;
this.setupGlobalData(animData,defs);
this.globalData.progressiveLoad=this.renderConfig.progressiveLoad;
this.data=animData;
var maskElement=createNS("clipPath");
var rect=createNS("rect");
rect.setAttribute("width",animData.w);
rect.setAttribute("height",animData.h);
rect.setAttribute("x",0);
rect.setAttribute("y",0);
var maskId=createElementID();
maskElement.setAttribute("id",maskId);
maskElement.appendChild(rect);
this.layerElement.setAttribute("clip-path","url("+getLocationHref()+"#"+maskId+")");
defs.appendChild(maskElement);
this.layers=animData.layers;
this.elements=createSizedArray(animData.layers.length)
};
SVGRendererBase.prototype.destroy=function(){if(this.animationItem.wrapper){this.animationItem.wrapper.innerText=""
}this.layerElement=null;
this.globalData.defs=null;
var i;
var len=this.layers?this.layers.length:0;
for(i=0;
i<len;
i+=1){if(this.elements[i]&&this.elements[i].destroy){this.elements[i].destroy()
}}this.elements.length=0;
this.destroyed=true;
this.animationItem=null
};
SVGRendererBase.prototype.updateContainerSize=function(){};
SVGRendererBase.prototype.findIndexByInd=function(ind){var i=0;
var len=this.layers.length;
for(i=0;
i<len;
i+=1){if(this.layers[i].ind===ind){return i
}}return -1
};
SVGRendererBase.prototype.buildItem=function(pos){var elements=this.elements;
if(elements[pos]||this.layers[pos].ty===99){return
}elements[pos]=true;
var element=this.createItem(this.layers[pos]);
elements[pos]=element;
if(getExpressionsPlugin()){if(this.layers[pos].ty===0){this.globalData.projectInterface.registerComposition(element)
}element.initExpressions()
}this.appendElementInPos(element,pos);
if(this.layers[pos].tt){var elementIndex="tp" in this.layers[pos]?this.findIndexByInd(this.layers[pos].tp):pos-1;
if(elementIndex===-1){return
}if(!this.elements[elementIndex]||this.elements[elementIndex]===true){this.buildItem(elementIndex);
this.addPendingElement(element)
}else{var matteElement=elements[elementIndex];
var matteMask=matteElement.getMatte(this.layers[pos].tt);
element.setMatte(matteMask)
}}};
SVGRendererBase.prototype.checkPendingElements=function(){while(this.pendingElements.length){var element=this.pendingElements.pop();
element.checkParenting();
if(element.data.tt){var i=0;
var len=this.elements.length;
while(i<len){if(this.elements[i]===element){var elementIndex="tp" in element.data?this.findIndexByInd(element.data.tp):i-1;
var matteElement=this.elements[elementIndex];
var matteMask=matteElement.getMatte(this.layers[i].tt);
element.setMatte(matteMask);
break
}i+=1
}}}};
SVGRendererBase.prototype.renderFrame=function(num){if(this.renderedFrame===num||this.destroyed){return
}if(num===null){num=this.renderedFrame
}else{this.renderedFrame=num
}this.globalData.frameNum=num;
this.globalData.frameId+=1;
this.globalData.projectInterface.currentFrame=num;
this.globalData._mdf=false;
var i;
var len=this.layers.length;
if(!this.completeLayers){this.checkLayers(num)
}for(i=len-1;
i>=0;
i-=1){if(this.completeLayers||this.elements[i]){this.elements[i].prepareFrame(num-this.layers[i].st)
}}if(this.globalData._mdf){for(i=0;
i<len;
i+=1){if(this.completeLayers||this.elements[i]){this.elements[i].renderFrame()
}}}};
SVGRendererBase.prototype.appendElementInPos=function(element,pos){var newElement=element.getBaseElement();
if(!newElement){return
}var i=0;
var nextElement;
while(i<pos){if(this.elements[i]&&this.elements[i]!==true&&this.elements[i].getBaseElement()){nextElement=this.elements[i].getBaseElement()
}i+=1
}if(nextElement){this.layerElement.insertBefore(newElement,nextElement)
}else{this.layerElement.appendChild(newElement)
}};
SVGRendererBase.prototype.hide=function(){this.layerElement.style.display="none"
};
SVGRendererBase.prototype.show=function(){this.layerElement.style.display="block"
};
function ICompElement(){}extendPrototype([BaseElement,TransformElement,HierarchyElement,FrameElement,RenderableDOMElement],ICompElement);
ICompElement.prototype.initElement=function(data,globalData,comp){this.initFrame();
this.initBaseData(data,globalData,comp);
this.initTransform(data,globalData,comp);
this.initRenderable();
this.initHierarchy();
this.initRendererElement();
this.createContainerElements();
this.createRenderableComponents();
if(this.data.xt||!globalData.progressiveLoad){this.buildAllItems()
}this.hide()
};
ICompElement.prototype.prepareFrame=function(num){this._mdf=false;
this.prepareRenderableFrame(num);
this.prepareProperties(num,this.isInRange);
if(!this.isInRange&&!this.data.xt){return
}if(!this.tm._placeholder){var timeRemapped=this.tm.v;
if(timeRemapped===this.data.op){timeRemapped=this.data.op-1
}this.renderedFrame=timeRemapped
}else{this.renderedFrame=num/this.data.sr
}var i;
var len=this.elements.length;
if(!this.completeLayers){this.checkLayers(this.renderedFrame)
}for(i=len-1;
i>=0;
i-=1){if(this.completeLayers||this.elements[i]){this.elements[i].prepareFrame(this.renderedFrame-this.layers[i].st);
if(this.elements[i]._mdf){this._mdf=true
}}}};
ICompElement.prototype.renderInnerContent=function(){var i;
var len=this.layers.length;
for(i=0;
i<len;
i+=1){if(this.completeLayers||this.elements[i]){this.elements[i].renderFrame()
}}};
ICompElement.prototype.setElements=function(elems){this.elements=elems
};
ICompElement.prototype.getElements=function(){return this.elements
};
ICompElement.prototype.destroyElements=function(){var i;
var len=this.layers.length;
for(i=0;
i<len;
i+=1){if(this.elements[i]){this.elements[i].destroy()
}}};
ICompElement.prototype.destroy=function(){this.destroyElements();
this.destroyBaseElement()
};
function SVGCompElement(data,globalData,comp){this.layers=data.layers;
this.supports3d=true;
this.completeLayers=false;
this.pendingElements=[];
this.elements=this.layers?createSizedArray(this.layers.length):[];
this.initElement(data,globalData,comp);
this.tm=data.tm?PropertyFactory.getProp(this,data.tm,0,globalData.frameRate,this):{_placeholder:true}
}extendPrototype([SVGRendererBase,ICompElement,SVGBaseElement],SVGCompElement);
SVGCompElement.prototype.createComp=function(data){return new SVGCompElement(data,this.globalData,this)
};
function SVGRenderer(animationItem,config){this.animationItem=animationItem;
this.layers=null;
this.renderedFrame=-1;
this.svgElement=createNS("svg");
var ariaLabel="";
if(config&&config.title){var titleElement=createNS("title");
var titleId=createElementID();
titleElement.setAttribute("id",titleId);
titleElement.textContent=config.title;
this.svgElement.appendChild(titleElement);
ariaLabel+=titleId
}if(config&&config.description){var descElement=createNS("desc");
var descId=createElementID();
descElement.setAttribute("id",descId);
descElement.textContent=config.description;
this.svgElement.appendChild(descElement);
ariaLabel+=" "+descId
}if(ariaLabel){this.svgElement.setAttribute("aria-labelledby",ariaLabel)
}var defs=createNS("defs");
this.svgElement.appendChild(defs);
var maskElement=createNS("g");
this.svgElement.appendChild(maskElement);
this.layerElement=maskElement;
this.renderConfig={preserveAspectRatio:config&&config.preserveAspectRatio||"xMidYMid meet",imagePreserveAspectRatio:config&&config.imagePreserveAspectRatio||"xMidYMid slice",contentVisibility:config&&config.contentVisibility||"visible",progressiveLoad:config&&config.progressiveLoad||false,hideOnTransparent:!(config&&config.hideOnTransparent===false),viewBoxOnly:config&&config.viewBoxOnly||false,viewBoxSize:config&&config.viewBoxSize||false,className:config&&config.className||"",id:config&&config.id||"",focusable:config&&config.focusable,filterSize:{width:config&&config.filterSize&&config.filterSize.width||"100%",height:config&&config.filterSize&&config.filterSize.height||"100%",x:config&&config.filterSize&&config.filterSize.x||"0%",y:config&&config.filterSize&&config.filterSize.y||"0%"},width:config&&config.width,height:config&&config.height,runExpressions:!config||config.runExpressions===undefined||config.runExpressions};
this.globalData={_mdf:false,frameNum:-1,defs:defs,renderConfig:this.renderConfig};
this.elements=[];
this.pendingElements=[];
this.destroyed=false;
this.rendererType="svg"
}extendPrototype([SVGRendererBase],SVGRenderer);
SVGRenderer.prototype.createComp=function(data){return new SVGCompElement(data,this.globalData,this)
};
function CVContextData(){this.saved=[];
this.cArrPos=0;
this.cTr=new Matrix();
this.cO=1;
var i;
var len=15;
this.savedOp=createTypedArray("float32",len);
for(i=0;
i<len;
i+=1){this.saved[i]=createTypedArray("float32",16)
}this._length=len
}CVContextData.prototype.duplicate=function(){var newLength=this._length*2;
var currentSavedOp=this.savedOp;
this.savedOp=createTypedArray("float32",newLength);
this.savedOp.set(currentSavedOp);
var i=0;
for(i=this._length;
i<newLength;
i+=1){this.saved[i]=createTypedArray("float32",16)
}this._length=newLength
};
CVContextData.prototype.reset=function(){this.cArrPos=0;
this.cTr.reset();
this.cO=1
};
CVContextData.prototype.popTransform=function(){var popped=this.saved[this.cArrPos];
var i;
var arr=this.cTr.props;
for(i=0;
i<16;
i+=1){arr[i]=popped[i]
}return popped
};
CVContextData.prototype.popOpacity=function(){var popped=this.savedOp[this.cArrPos];
this.cO=popped;
return popped
};
CVContextData.prototype.pop=function(){this.cArrPos-=1;
var transform=this.popTransform();
var opacity=this.popOpacity();
return{transform:transform,opacity:opacity}
};
CVContextData.prototype.push=function(){var props=this.cTr.props;
if(this._length<=this.cArrPos){this.duplicate()
}var i;
var arr=this.saved[this.cArrPos];
for(i=0;
i<16;
i+=1){arr[i]=props[i]
}this.savedOp[this.cArrPos]=this.cO;
this.cArrPos+=1
};
CVContextData.prototype.getTransform=function(){return this.cTr
};
CVContextData.prototype.getOpacity=function(){return this.cO
};
CVContextData.prototype.setOpacity=function(value){this.cO=value
};
function ShapeTransformManager(){this.sequences={};
this.sequenceList=[];
this.transform_key_count=0
}ShapeTransformManager.prototype={addTransformSequence:function addTransformSequence(transforms){var i;
var len=transforms.length;
var key="_";
for(i=0;
i<len;
i+=1){key+=transforms[i].transform.key+"_"
}var sequence=this.sequences[key];
if(!sequence){sequence={transforms:[].concat(transforms),finalTransform:new Matrix(),_mdf:false};
this.sequences[key]=sequence;
this.sequenceList.push(sequence)
}return sequence
},processSequence:function processSequence(sequence,isFirstFrame){var i=0;
var len=sequence.transforms.length;
var _mdf=isFirstFrame;
while(i<len&&!isFirstFrame){if(sequence.transforms[i].transform.mProps._mdf){_mdf=true;
break
}i+=1
}if(_mdf){var props;
sequence.finalTransform.reset();
for(i=len-1;
i>=0;
i-=1){props=sequence.transforms[i].transform.mProps.v.props;
sequence.finalTransform.transform(props[0],props[1],props[2],props[3],props[4],props[5],props[6],props[7],props[8],props[9],props[10],props[11],props[12],props[13],props[14],props[15])
}}sequence._mdf=_mdf
},processSequences:function processSequences(isFirstFrame){var i;
var len=this.sequenceList.length;
for(i=0;
i<len;
i+=1){this.processSequence(this.sequenceList[i],isFirstFrame)
}},getNewKey:function getNewKey(){this.transform_key_count+=1;
return"_"+this.transform_key_count
}};
var lumaLoader=function lumaLoader(){var id="__lottie_element_luma_buffer";
var lumaBuffer=null;
var lumaBufferCtx=null;
var svg=null;
function createLumaSvgFilter(){var _svg=createNS("svg");
var fil=createNS("filter");
var matrix=createNS("feColorMatrix");
fil.setAttribute("id",id);
matrix.setAttribute("type","matrix");
matrix.setAttribute("color-interpolation-filters","sRGB");
matrix.setAttribute("values","0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0");
fil.appendChild(matrix);
_svg.appendChild(fil);
_svg.setAttribute("id",id+"_svg");
if(featureSupport.svgLumaHidden){_svg.style.display="none"
}return _svg
}function loadLuma(){if(!lumaBuffer){svg=createLumaSvgFilter();
document.body.appendChild(svg);
lumaBuffer=createTag("canvas");
lumaBufferCtx=lumaBuffer.getContext("2d");
lumaBufferCtx.filter="url(#"+id+")";
lumaBufferCtx.fillStyle="rgba(0,0,0,0)";
lumaBufferCtx.fillRect(0,0,1,1)
}}function getLuma(canvas){if(!lumaBuffer){loadLuma()
}lumaBuffer.width=canvas.width;
lumaBuffer.height=canvas.height;
lumaBufferCtx.filter="url(#"+id+")";
return lumaBuffer
}return{load:loadLuma,get:getLuma}
};
function createCanvas(width,height){if(featureSupport.offscreenCanvas){return new OffscreenCanvas(width,height)
}var canvas=createTag("canvas");
canvas.width=width;
canvas.height=height;
return canvas
}var assetLoader=function(){return{loadLumaCanvas:lumaLoader.load,getLumaCanvas:lumaLoader.get,createCanvas:createCanvas}
}();
function CVEffects(){}CVEffects.prototype.renderFrame=function(){};
function CVMaskElement(data,element){this.data=data;
this.element=element;
this.masksProperties=this.data.masksProperties||[];
this.viewData=createSizedArray(this.masksProperties.length);
var i;
var len=this.masksProperties.length;
var hasMasks=false;
for(i=0;
i<len;
i+=1){if(this.masksProperties[i].mode!=="n"){hasMasks=true
}this.viewData[i]=ShapePropertyFactory.getShapeProp(this.element,this.masksProperties[i],3)
}this.hasMasks=hasMasks;
if(hasMasks){this.element.addRenderableComponent(this)
}}CVMaskElement.prototype.renderFrame=function(){if(!this.hasMasks){return
}var transform=this.element.finalTransform.mat;
var ctx=this.element.canvasContext;
var i;
var len=this.masksProperties.length;
var pt;
var pts;
var data;
ctx.beginPath();
for(i=0;
i<len;
i+=1){if(this.masksProperties[i].mode!=="n"){if(this.masksProperties[i].inv){ctx.moveTo(0,0);
ctx.lineTo(this.element.globalData.compSize.w,0);
ctx.lineTo(this.element.globalData.compSize.w,this.element.globalData.compSize.h);
ctx.lineTo(0,this.element.globalData.compSize.h);
ctx.lineTo(0,0)
}data=this.viewData[i].v;
pt=transform.applyToPointArray(data.v[0][0],data.v[0][1],0);
ctx.moveTo(pt[0],pt[1]);
var j;
var jLen=data._length;
for(j=1;
j<jLen;
j+=1){pts=transform.applyToTriplePoints(data.o[j-1],data.i[j],data.v[j]);
ctx.bezierCurveTo(pts[0],pts[1],pts[2],pts[3],pts[4],pts[5])
}pts=transform.applyToTriplePoints(data.o[j-1],data.i[0],data.v[0]);
ctx.bezierCurveTo(pts[0],pts[1],pts[2],pts[3],pts[4],pts[5])
}}this.element.globalData.renderer.save(true);
ctx.clip()
};
CVMaskElement.prototype.getMaskProperty=MaskElement.prototype.getMaskProperty;
CVMaskElement.prototype.destroy=function(){this.element=null
};
function CVBaseElement(){}var operationsMap={1:"source-in",2:"source-out",3:"source-in",4:"source-out"};
CVBaseElement.prototype={createElements:function createElements(){},initRendererElement:function initRendererElement(){},createContainerElements:function createContainerElements(){if(this.data.tt>=1){this.buffers=[];
var canvasContext=this.globalData.canvasContext;
var bufferCanvas=assetLoader.createCanvas(canvasContext.canvas.width,canvasContext.canvas.height);
this.buffers.push(bufferCanvas);
var bufferCanvas2=assetLoader.createCanvas(canvasContext.canvas.width,canvasContext.canvas.height);
this.buffers.push(bufferCanvas2);
if(this.data.tt>=3&&!document._isProxy){assetLoader.loadLumaCanvas()
}}this.canvasContext=this.globalData.canvasContext;
this.transformCanvas=this.globalData.transformCanvas;
this.renderableEffectsManager=new CVEffects(this)
},createContent:function createContent(){},setBlendMode:function setBlendMode(){var globalData=this.globalData;
if(globalData.blendMode!==this.data.bm){globalData.blendMode=this.data.bm;
var blendModeValue=getBlendMode(this.data.bm);
globalData.canvasContext.globalCompositeOperation=blendModeValue
}},createRenderableComponents:function createRenderableComponents(){this.maskManager=new CVMaskElement(this.data,this)
},hideElement:function hideElement(){if(!this.hidden&&(!this.isInRange||this.isTransparent)){this.hidden=true
}},showElement:function showElement(){if(this.isInRange&&!this.isTransparent){this.hidden=false;
this._isFirstFrame=true;
this.maskManager._isFirstFrame=true
}},clearCanvas:function clearCanvas(canvasContext){canvasContext.clearRect(this.transformCanvas.tx,this.transformCanvas.ty,this.transformCanvas.w*this.transformCanvas.sx,this.transformCanvas.h*this.transformCanvas.sy)
},prepareLayer:function prepareLayer(){if(this.data.tt>=1){var buffer=this.buffers[0];
var bufferCtx=buffer.getContext("2d");
this.clearCanvas(bufferCtx);
bufferCtx.drawImage(this.canvasContext.canvas,0,0);
this.currentTransform=this.canvasContext.getTransform();
this.canvasContext.setTransform(1,0,0,1,0,0);
this.clearCanvas(this.canvasContext);
this.canvasContext.setTransform(this.currentTransform)
}},exitLayer:function exitLayer(){if(this.data.tt>=1){var buffer=this.buffers[1];
var bufferCtx=buffer.getContext("2d");
this.clearCanvas(bufferCtx);
bufferCtx.drawImage(this.canvasContext.canvas,0,0);
this.canvasContext.setTransform(1,0,0,1,0,0);
this.clearCanvas(this.canvasContext);
this.canvasContext.setTransform(this.currentTransform);
var mask=this.comp.getElementById("tp" in this.data?this.data.tp:this.data.ind-1);
mask.renderFrame(true);
this.canvasContext.setTransform(1,0,0,1,0,0);
if(this.data.tt>=3&&!document._isProxy){var lumaBuffer=assetLoader.getLumaCanvas(this.canvasContext.canvas);
var lumaBufferCtx=lumaBuffer.getContext("2d");
lumaBufferCtx.drawImage(this.canvasContext.canvas,0,0);
this.clearCanvas(this.canvasContext);
this.canvasContext.drawImage(lumaBuffer,0,0)
}this.canvasContext.globalCompositeOperation=operationsMap[this.data.tt];
this.canvasContext.drawImage(buffer,0,0);
this.canvasContext.globalCompositeOperation="destination-over";
this.canvasContext.drawImage(this.buffers[0],0,0);
this.canvasContext.setTransform(this.currentTransform);
this.canvasContext.globalCompositeOperation="source-over"
}},renderFrame:function renderFrame(forceRender){if(this.hidden||this.data.hd){return
}if(this.data.td===1&&!forceRender){return
}this.renderTransform();
this.renderRenderable();
this.setBlendMode();
var forceRealStack=this.data.ty===0;
this.prepareLayer();
this.globalData.renderer.save(forceRealStack);
this.globalData.renderer.ctxTransform(this.finalTransform.mat.props);
this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v);
this.renderInnerContent();
this.globalData.renderer.restore(forceRealStack);
this.exitLayer();
if(this.maskManager.hasMasks){this.globalData.renderer.restore(true)
}if(this._isFirstFrame){this._isFirstFrame=false
}},destroy:function destroy(){this.canvasContext=null;
this.data=null;
this.globalData=null;
this.maskManager.destroy()
},mHelper:new Matrix()};
CVBaseElement.prototype.hide=CVBaseElement.prototype.hideElement;
CVBaseElement.prototype.show=CVBaseElement.prototype.showElement;
function CVShapeData(element,data,styles,transformsManager){this.styledShapes=[];
this.tr=[0,0,0,0,0,0];
var ty=4;
if(data.ty==="rc"){ty=5
}else{if(data.ty==="el"){ty=6
}else{if(data.ty==="sr"){ty=7
}}}this.sh=ShapePropertyFactory.getShapeProp(element,data,ty,element);
var i;
var len=styles.length;
var styledShape;
for(i=0;
i<len;
i+=1){if(!styles[i].closed){styledShape={transforms:transformsManager.addTransformSequence(styles[i].transforms),trNodes:[]};
this.styledShapes.push(styledShape);
styles[i].elements.push(styledShape)
}}}CVShapeData.prototype.setAsAnimated=SVGShapeData.prototype.setAsAnimated;
function CVShapeElement(data,globalData,comp){this.shapes=[];
this.shapesData=data.shapes;
this.stylesList=[];
this.itemsData=[];
this.prevViewData=[];
this.shapeModifiers=[];
this.processedElements=[];
this.transformsManager=new ShapeTransformManager();
this.initElement(data,globalData,comp)
}extendPrototype([BaseElement,TransformElement,CVBaseElement,IShapeElement,HierarchyElement,FrameElement,RenderableElement],CVShapeElement);
CVShapeElement.prototype.initElement=RenderableDOMElement.prototype.initElement;
CVShapeElement.prototype.transformHelper={opacity:1,_opMdf:false};
CVShapeElement.prototype.dashResetter=[];
CVShapeElement.prototype.createContent=function(){this.searchShapes(this.shapesData,this.itemsData,this.prevViewData,true,[])
};
CVShapeElement.prototype.createStyleElement=function(data,transforms){var styleElem={data:data,type:data.ty,preTransforms:this.transformsManager.addTransformSequence(transforms),transforms:[],elements:[],closed:data.hd===true};
var elementData={};
if(data.ty==="fl"||data.ty==="st"){elementData.c=PropertyFactory.getProp(this,data.c,1,255,this);
if(!elementData.c.k){styleElem.co="rgb("+bmFloor(elementData.c.v[0])+","+bmFloor(elementData.c.v[1])+","+bmFloor(elementData.c.v[2])+")"
}}else{if(data.ty==="gf"||data.ty==="gs"){elementData.s=PropertyFactory.getProp(this,data.s,1,null,this);
elementData.e=PropertyFactory.getProp(this,data.e,1,null,this);
elementData.h=PropertyFactory.getProp(this,data.h||{k:0},0,0.01,this);
elementData.a=PropertyFactory.getProp(this,data.a||{k:0},0,degToRads,this);
elementData.g=new GradientProperty(this,data.g,this)
}}elementData.o=PropertyFactory.getProp(this,data.o,0,0.01,this);
if(data.ty==="st"||data.ty==="gs"){styleElem.lc=lineCapEnum[data.lc||2];
styleElem.lj=lineJoinEnum[data.lj||2];
if(data.lj==1){styleElem.ml=data.ml
}elementData.w=PropertyFactory.getProp(this,data.w,0,null,this);
if(!elementData.w.k){styleElem.wi=elementData.w.v
}if(data.d){var d=new DashProperty(this,data.d,"canvas",this);
elementData.d=d;
if(!elementData.d.k){styleElem.da=elementData.d.dashArray;
styleElem["do"]=elementData.d.dashoffset[0]
}}}else{styleElem.r=data.r===2?"evenodd":"nonzero"
}this.stylesList.push(styleElem);
elementData.style=styleElem;
return elementData
};
CVShapeElement.prototype.createGroupElement=function(){var elementData={it:[],prevViewData:[]};
return elementData
};
CVShapeElement.prototype.createTransformElement=function(data){var elementData={transform:{opacity:1,_opMdf:false,key:this.transformsManager.getNewKey(),op:PropertyFactory.getProp(this,data.o,0,0.01,this),mProps:TransformPropertyFactory.getTransformProperty(this,data,this)}};
return elementData
};
CVShapeElement.prototype.createShapeElement=function(data){var elementData=new CVShapeData(this,data,this.stylesList,this.transformsManager);
this.shapes.push(elementData);
this.addShapeToModifiers(elementData);
return elementData
};
CVShapeElement.prototype.reloadShapes=function(){this._isFirstFrame=true;
var i;
var len=this.itemsData.length;
for(i=0;
i<len;
i+=1){this.prevViewData[i]=this.itemsData[i]
}this.searchShapes(this.shapesData,this.itemsData,this.prevViewData,true,[]);
len=this.dynamicProperties.length;
for(i=0;
i<len;
i+=1){this.dynamicProperties[i].getValue()
}this.renderModifiers();
this.transformsManager.processSequences(this._isFirstFrame)
};
CVShapeElement.prototype.addTransformToStyleList=function(transform){var i;
var len=this.stylesList.length;
for(i=0;
i<len;
i+=1){if(!this.stylesList[i].closed){this.stylesList[i].transforms.push(transform)
}}};
CVShapeElement.prototype.removeTransformFromStyleList=function(){var i;
var len=this.stylesList.length;
for(i=0;
i<len;
i+=1){if(!this.stylesList[i].closed){this.stylesList[i].transforms.pop()
}}};
CVShapeElement.prototype.closeStyles=function(styles){var i;
var len=styles.length;
for(i=0;
i<len;
i+=1){styles[i].closed=true
}};
CVShapeElement.prototype.searchShapes=function(arr,itemsData,prevViewData,shouldRender,transforms){var i;
var len=arr.length-1;
var j;
var jLen;
var ownStyles=[];
var ownModifiers=[];
var processedPos;
var modifier;
var currentTransform;
var ownTransforms=[].concat(transforms);
for(i=len;
i>=0;
i-=1){processedPos=this.searchProcessedElement(arr[i]);
if(!processedPos){arr[i]._shouldRender=shouldRender
}else{itemsData[i]=prevViewData[processedPos-1]
}if(arr[i].ty==="fl"||arr[i].ty==="st"||arr[i].ty==="gf"||arr[i].ty==="gs"){if(!processedPos){itemsData[i]=this.createStyleElement(arr[i],ownTransforms)
}else{itemsData[i].style.closed=false
}ownStyles.push(itemsData[i].style)
}else{if(arr[i].ty==="gr"){if(!processedPos){itemsData[i]=this.createGroupElement(arr[i])
}else{jLen=itemsData[i].it.length;
for(j=0;
j<jLen;
j+=1){itemsData[i].prevViewData[j]=itemsData[i].it[j]
}}this.searchShapes(arr[i].it,itemsData[i].it,itemsData[i].prevViewData,shouldRender,ownTransforms)
}else{if(arr[i].ty==="tr"){if(!processedPos){currentTransform=this.createTransformElement(arr[i]);
itemsData[i]=currentTransform
}ownTransforms.push(itemsData[i]);
this.addTransformToStyleList(itemsData[i])
}else{if(arr[i].ty==="sh"||arr[i].ty==="rc"||arr[i].ty==="el"||arr[i].ty==="sr"){if(!processedPos){itemsData[i]=this.createShapeElement(arr[i])
}}else{if(arr[i].ty==="tm"||arr[i].ty==="rd"||arr[i].ty==="pb"||arr[i].ty==="zz"||arr[i].ty==="op"){if(!processedPos){modifier=ShapeModifiers.getModifier(arr[i].ty);
modifier.init(this,arr[i]);
itemsData[i]=modifier;
this.shapeModifiers.push(modifier)
}else{modifier=itemsData[i];
modifier.closed=false
}ownModifiers.push(modifier)
}else{if(arr[i].ty==="rp"){if(!processedPos){modifier=ShapeModifiers.getModifier(arr[i].ty);
itemsData[i]=modifier;
modifier.init(this,arr,i,itemsData);
this.shapeModifiers.push(modifier);
shouldRender=false
}else{modifier=itemsData[i];
modifier.closed=true
}ownModifiers.push(modifier)
}}}}}}this.addProcessedElement(arr[i],i+1)
}this.removeTransformFromStyleList();
this.closeStyles(ownStyles);
len=ownModifiers.length;
for(i=0;
i<len;
i+=1){ownModifiers[i].closed=true
}};
CVShapeElement.prototype.renderInnerContent=function(){this.transformHelper.opacity=1;
this.transformHelper._opMdf=false;
this.renderModifiers();
this.transformsManager.processSequences(this._isFirstFrame);
this.renderShape(this.transformHelper,this.shapesData,this.itemsData,true)
};
CVShapeElement.prototype.renderShapeTransform=function(parentTransform,groupTransform){if(parentTransform._opMdf||groupTransform.op._mdf||this._isFirstFrame){groupTransform.opacity=parentTransform.opacity;
groupTransform.opacity*=groupTransform.op.v;
groupTransform._opMdf=true
}};
CVShapeElement.prototype.drawLayer=function(){var i;
var len=this.stylesList.length;
var j;
var jLen;
var k;
var kLen;
var elems;
var nodes;
var renderer=this.globalData.renderer;
var ctx=this.globalData.canvasContext;
var type;
var currentStyle;
for(i=0;
i<len;
i+=1){currentStyle=this.stylesList[i];
type=currentStyle.type;
if(!((type==="st"||type==="gs")&&currentStyle.wi===0||!currentStyle.data._shouldRender||currentStyle.coOp===0||this.globalData.currentGlobalAlpha===0)){renderer.save();
elems=currentStyle.elements;
if(type==="st"||type==="gs"){ctx.strokeStyle=type==="st"?currentStyle.co:currentStyle.grd;
ctx.lineWidth=currentStyle.wi;
ctx.lineCap=currentStyle.lc;
ctx.lineJoin=currentStyle.lj;
ctx.miterLimit=currentStyle.ml||0
}else{ctx.fillStyle=type==="fl"?currentStyle.co:currentStyle.grd
}renderer.ctxOpacity(currentStyle.coOp);
if(type!=="st"&&type!=="gs"){ctx.beginPath()
}renderer.ctxTransform(currentStyle.preTransforms.finalTransform.props);
jLen=elems.length;
for(j=0;
j<jLen;
j+=1){if(type==="st"||type==="gs"){ctx.beginPath();
if(currentStyle.da){ctx.setLineDash(currentStyle.da);
ctx.lineDashOffset=currentStyle["do"]
}}nodes=elems[j].trNodes;
kLen=nodes.length;
for(k=0;
k<kLen;
k+=1){if(nodes[k].t==="m"){ctx.moveTo(nodes[k].p[0],nodes[k].p[1])
}else{if(nodes[k].t==="c"){ctx.bezierCurveTo(nodes[k].pts[0],nodes[k].pts[1],nodes[k].pts[2],nodes[k].pts[3],nodes[k].pts[4],nodes[k].pts[5])
}else{ctx.closePath()
}}}if(type==="st"||type==="gs"){ctx.stroke();
if(currentStyle.da){ctx.setLineDash(this.dashResetter)
}}}if(type!=="st"&&type!=="gs"){ctx.fill(currentStyle.r)
}renderer.restore()
}}};
CVShapeElement.prototype.renderShape=function(parentTransform,items,data,isMain){var i;
var len=items.length-1;
var groupTransform;
groupTransform=parentTransform;
for(i=len;
i>=0;
i-=1){if(items[i].ty==="tr"){groupTransform=data[i].transform;
this.renderShapeTransform(parentTransform,groupTransform)
}else{if(items[i].ty==="sh"||items[i].ty==="el"||items[i].ty==="rc"||items[i].ty==="sr"){this.renderPath(items[i],data[i])
}else{if(items[i].ty==="fl"){this.renderFill(items[i],data[i],groupTransform)
}else{if(items[i].ty==="st"){this.renderStroke(items[i],data[i],groupTransform)
}else{if(items[i].ty==="gf"||items[i].ty==="gs"){this.renderGradientFill(items[i],data[i],groupTransform)
}else{if(items[i].ty==="gr"){this.renderShape(groupTransform,items[i].it,data[i].it)
}else{if(items[i].ty==="tm"){}}}}}}}}if(isMain){this.drawLayer()
}};
CVShapeElement.prototype.renderStyledShape=function(styledShape,shape){if(this._isFirstFrame||shape._mdf||styledShape.transforms._mdf){var shapeNodes=styledShape.trNodes;
var paths=shape.paths;
var i;
var len;
var j;
var jLen=paths._length;
shapeNodes.length=0;
var groupTransformMat=styledShape.transforms.finalTransform;
for(j=0;
j<jLen;
j+=1){var pathNodes=paths.shapes[j];
if(pathNodes&&pathNodes.v){len=pathNodes._length;
for(i=1;
i<len;
i+=1){if(i===1){shapeNodes.push({t:"m",p:groupTransformMat.applyToPointArray(pathNodes.v[0][0],pathNodes.v[0][1],0)})
}shapeNodes.push({t:"c",pts:groupTransformMat.applyToTriplePoints(pathNodes.o[i-1],pathNodes.i[i],pathNodes.v[i])})
}if(len===1){shapeNodes.push({t:"m",p:groupTransformMat.applyToPointArray(pathNodes.v[0][0],pathNodes.v[0][1],0)})
}if(pathNodes.c&&len){shapeNodes.push({t:"c",pts:groupTransformMat.applyToTriplePoints(pathNodes.o[i-1],pathNodes.i[0],pathNodes.v[0])});
shapeNodes.push({t:"z"})
}}}styledShape.trNodes=shapeNodes
}};
CVShapeElement.prototype.renderPath=function(pathData,itemData){if(pathData.hd!==true&&pathData._shouldRender){var i;
var len=itemData.styledShapes.length;
for(i=0;
i<len;
i+=1){this.renderStyledShape(itemData.styledShapes[i],itemData.sh)
}}};
CVShapeElement.prototype.renderFill=function(styleData,itemData,groupTransform){var styleElem=itemData.style;
if(itemData.c._mdf||this._isFirstFrame){styleElem.co="rgb("+bmFloor(itemData.c.v[0])+","+bmFloor(itemData.c.v[1])+","+bmFloor(itemData.c.v[2])+")"
}if(itemData.o._mdf||groupTransform._opMdf||this._isFirstFrame){styleElem.coOp=itemData.o.v*groupTransform.opacity
}};
CVShapeElement.prototype.renderGradientFill=function(styleData,itemData,groupTransform){var styleElem=itemData.style;
var grd;
if(!styleElem.grd||itemData.g._mdf||itemData.s._mdf||itemData.e._mdf||styleData.t!==1&&(itemData.h._mdf||itemData.a._mdf)){var ctx=this.globalData.canvasContext;
var pt1=itemData.s.v;
var pt2=itemData.e.v;
if(styleData.t===1){grd=ctx.createLinearGradient(pt1[0],pt1[1],pt2[0],pt2[1])
}else{var rad=Math.sqrt(Math.pow(pt1[0]-pt2[0],2)+Math.pow(pt1[1]-pt2[1],2));
var ang=Math.atan2(pt2[1]-pt1[1],pt2[0]-pt1[0]);
var percent=itemData.h.v;
if(percent>=1){percent=0.99
}else{if(percent<=-1){percent=-0.99
}}var dist=rad*percent;
var x=Math.cos(ang+itemData.a.v)*dist+pt1[0];
var y=Math.sin(ang+itemData.a.v)*dist+pt1[1];
grd=ctx.createRadialGradient(x,y,0,pt1[0],pt1[1],rad)
}var i;
var len=styleData.g.p;
var cValues=itemData.g.c;
var opacity=1;
for(i=0;
i<len;
i+=1){if(itemData.g._hasOpacity&&itemData.g._collapsable){opacity=itemData.g.o[i*2+1]
}grd.addColorStop(cValues[i*4]/100,"rgba("+cValues[i*4+1]+","+cValues[i*4+2]+","+cValues[i*4+3]+","+opacity+")")
}styleElem.grd=grd
}styleElem.coOp=itemData.o.v*groupTransform.opacity
};
CVShapeElement.prototype.renderStroke=function(styleData,itemData,groupTransform){var styleElem=itemData.style;
var d=itemData.d;
if(d&&(d._mdf||this._isFirstFrame)){styleElem.da=d.dashArray;
styleElem["do"]=d.dashoffset[0]
}if(itemData.c._mdf||this._isFirstFrame){styleElem.co="rgb("+bmFloor(itemData.c.v[0])+","+bmFloor(itemData.c.v[1])+","+bmFloor(itemData.c.v[2])+")"
}if(itemData.o._mdf||groupTransform._opMdf||this._isFirstFrame){styleElem.coOp=itemData.o.v*groupTransform.opacity
}if(itemData.w._mdf||this._isFirstFrame){styleElem.wi=itemData.w.v
}};
CVShapeElement.prototype.destroy=function(){this.shapesData=null;
this.globalData=null;
this.canvasContext=null;
this.stylesList.length=0;
this.itemsData.length=0
};
function CVTextElement(data,globalData,comp){this.textSpans=[];
this.yOffset=0;
this.fillColorAnim=false;
this.strokeColorAnim=false;
this.strokeWidthAnim=false;
this.stroke=false;
this.fill=false;
this.justifyOffset=0;
this.currentRender=null;
this.renderType="canvas";
this.values={fill:"rgba(0,0,0,0)",stroke:"rgba(0,0,0,0)",sWidth:0,fValue:""};
this.initElement(data,globalData,comp)
}extendPrototype([BaseElement,TransformElement,CVBaseElement,HierarchyElement,FrameElement,RenderableElement,ITextElement],CVTextElement);
CVTextElement.prototype.tHelper=createTag("canvas").getContext("2d");
CVTextElement.prototype.buildNewText=function(){var documentData=this.textProperty.currentData;
this.renderedLetters=createSizedArray(documentData.l?documentData.l.length:0);
var hasFill=false;
if(documentData.fc){hasFill=true;
this.values.fill=this.buildColor(documentData.fc)
}else{this.values.fill="rgba(0,0,0,0)"
}this.fill=hasFill;
var hasStroke=false;
if(documentData.sc){hasStroke=true;
this.values.stroke=this.buildColor(documentData.sc);
this.values.sWidth=documentData.sw
}var fontData=this.globalData.fontManager.getFontByName(documentData.f);
var i;
var len;
var letters=documentData.l;
var matrixHelper=this.mHelper;
this.stroke=hasStroke;
this.values.fValue=documentData.finalSize+"px "+this.globalData.fontManager.getFontByName(documentData.f).fFamily;
len=documentData.finalText.length;
var charData;
var shapeData;
var k;
var kLen;
var shapes;
var j;
var jLen;
var pathNodes;
var commands;
var pathArr;
var singleShape=this.data.singleShape;
var trackingOffset=documentData.tr*0.001*documentData.finalSize;
var xPos=0;
var yPos=0;
var firstLine=true;
var cnt=0;
for(i=0;
i<len;
i+=1){charData=this.globalData.fontManager.getCharData(documentData.finalText[i],fontData.fStyle,this.globalData.fontManager.getFontByName(documentData.f).fFamily);
shapeData=charData&&charData.data||{};
matrixHelper.reset();
if(singleShape&&letters[i].n){xPos=-trackingOffset;
yPos+=documentData.yOffset;
yPos+=firstLine?1:0;
firstLine=false
}shapes=shapeData.shapes?shapeData.shapes[0].it:[];
jLen=shapes.length;
matrixHelper.scale(documentData.finalSize/100,documentData.finalSize/100);
if(singleShape){this.applyTextPropertiesToMatrix(documentData,matrixHelper,letters[i].line,xPos,yPos)
}commands=createSizedArray(jLen-1);
var commandsCounter=0;
for(j=0;
j<jLen;
j+=1){if(shapes[j].ty==="sh"){kLen=shapes[j].ks.k.i.length;
pathNodes=shapes[j].ks.k;
pathArr=[];
for(k=1;
k<kLen;
k+=1){if(k===1){pathArr.push(matrixHelper.applyToX(pathNodes.v[0][0],pathNodes.v[0][1],0),matrixHelper.applyToY(pathNodes.v[0][0],pathNodes.v[0][1],0))
}pathArr.push(matrixHelper.applyToX(pathNodes.o[k-1][0],pathNodes.o[k-1][1],0),matrixHelper.applyToY(pathNodes.o[k-1][0],pathNodes.o[k-1][1],0),matrixHelper.applyToX(pathNodes.i[k][0],pathNodes.i[k][1],0),matrixHelper.applyToY(pathNodes.i[k][0],pathNodes.i[k][1],0),matrixHelper.applyToX(pathNodes.v[k][0],pathNodes.v[k][1],0),matrixHelper.applyToY(pathNodes.v[k][0],pathNodes.v[k][1],0))
}pathArr.push(matrixHelper.applyToX(pathNodes.o[k-1][0],pathNodes.o[k-1][1],0),matrixHelper.applyToY(pathNodes.o[k-1][0],pathNodes.o[k-1][1],0),matrixHelper.applyToX(pathNodes.i[0][0],pathNodes.i[0][1],0),matrixHelper.applyToY(pathNodes.i[0][0],pathNodes.i[0][1],0),matrixHelper.applyToX(pathNodes.v[0][0],pathNodes.v[0][1],0),matrixHelper.applyToY(pathNodes.v[0][0],pathNodes.v[0][1],0));
commands[commandsCounter]=pathArr;
commandsCounter+=1
}}if(singleShape){xPos+=letters[i].l;
xPos+=trackingOffset
}if(this.textSpans[cnt]){this.textSpans[cnt].elem=commands
}else{this.textSpans[cnt]={elem:commands}
}cnt+=1
}};
CVTextElement.prototype.renderInnerContent=function(){var ctx=this.canvasContext;
ctx.font=this.values.fValue;
ctx.lineCap="butt";
ctx.lineJoin="miter";
ctx.miterLimit=4;
if(!this.data.singleShape){this.textAnimator.getMeasures(this.textProperty.currentData,this.lettersChangedFlag)
}var i;
var len;
var j;
var jLen;
var k;
var kLen;
var renderedLetters=this.textAnimator.renderedLetters;
var letters=this.textProperty.currentData.l;
len=letters.length;
var renderedLetter;
var lastFill=null;
var lastStroke=null;
var lastStrokeW=null;
var commands;
var pathArr;
for(i=0;
i<len;
i+=1){if(!letters[i].n){renderedLetter=renderedLetters[i];
if(renderedLetter){this.globalData.renderer.save();
this.globalData.renderer.ctxTransform(renderedLetter.p);
this.globalData.renderer.ctxOpacity(renderedLetter.o)
}if(this.fill){if(renderedLetter&&renderedLetter.fc){if(lastFill!==renderedLetter.fc){lastFill=renderedLetter.fc;
ctx.fillStyle=renderedLetter.fc
}}else{if(lastFill!==this.values.fill){lastFill=this.values.fill;
ctx.fillStyle=this.values.fill
}}commands=this.textSpans[i].elem;
jLen=commands.length;
this.globalData.canvasContext.beginPath();
for(j=0;
j<jLen;
j+=1){pathArr=commands[j];
kLen=pathArr.length;
this.globalData.canvasContext.moveTo(pathArr[0],pathArr[1]);
for(k=2;
k<kLen;
k+=6){this.globalData.canvasContext.bezierCurveTo(pathArr[k],pathArr[k+1],pathArr[k+2],pathArr[k+3],pathArr[k+4],pathArr[k+5])
}}this.globalData.canvasContext.closePath();
this.globalData.canvasContext.fill()
}if(this.stroke){if(renderedLetter&&renderedLetter.sw){if(lastStrokeW!==renderedLetter.sw){lastStrokeW=renderedLetter.sw;
ctx.lineWidth=renderedLetter.sw
}}else{if(lastStrokeW!==this.values.sWidth){lastStrokeW=this.values.sWidth;
ctx.lineWidth=this.values.sWidth
}}if(renderedLetter&&renderedLetter.sc){if(lastStroke!==renderedLetter.sc){lastStroke=renderedLetter.sc;
ctx.strokeStyle=renderedLetter.sc
}}else{if(lastStroke!==this.values.stroke){lastStroke=this.values.stroke;
ctx.strokeStyle=this.values.stroke
}}commands=this.textSpans[i].elem;
jLen=commands.length;
this.globalData.canvasContext.beginPath();
for(j=0;
j<jLen;
j+=1){pathArr=commands[j];
kLen=pathArr.length;
this.globalData.canvasContext.moveTo(pathArr[0],pathArr[1]);
for(k=2;
k<kLen;
k+=6){this.globalData.canvasContext.bezierCurveTo(pathArr[k],pathArr[k+1],pathArr[k+2],pathArr[k+3],pathArr[k+4],pathArr[k+5])
}}this.globalData.canvasContext.closePath();
this.globalData.canvasContext.stroke()
}if(renderedLetter){this.globalData.renderer.restore()
}}}};
function CVImageElement(data,globalData,comp){this.assetData=globalData.getAssetData(data.refId);
this.img=globalData.imageLoader.getAsset(this.assetData);
this.initElement(data,globalData,comp)
}extendPrototype([BaseElement,TransformElement,CVBaseElement,HierarchyElement,FrameElement,RenderableElement],CVImageElement);
CVImageElement.prototype.initElement=SVGShapeElement.prototype.initElement;
CVImageElement.prototype.prepareFrame=IImageElement.prototype.prepareFrame;
CVImageElement.prototype.createContent=function(){if(this.img.width&&(this.assetData.w!==this.img.width||this.assetData.h!==this.img.height)){var canvas=createTag("canvas");
canvas.width=this.assetData.w;
canvas.height=this.assetData.h;
var ctx=canvas.getContext("2d");
var imgW=this.img.width;
var imgH=this.img.height;
var imgRel=imgW/imgH;
var canvasRel=this.assetData.w/this.assetData.h;
var widthCrop;
var heightCrop;
var par=this.assetData.pr||this.globalData.renderConfig.imagePreserveAspectRatio;
if(imgRel>canvasRel&&par==="xMidYMid slice"||imgRel<canvasRel&&par!=="xMidYMid slice"){heightCrop=imgH;
widthCrop=heightCrop*canvasRel
}else{widthCrop=imgW;
heightCrop=widthCrop/canvasRel
}ctx.drawImage(this.img,(imgW-widthCrop)/2,(imgH-heightCrop)/2,widthCrop,heightCrop,0,0,this.assetData.w,this.assetData.h);
this.img=canvas
}};
CVImageElement.prototype.renderInnerContent=function(){this.canvasContext.drawImage(this.img,0,0)
};
CVImageElement.prototype.destroy=function(){this.img=null
};
function CVSolidElement(data,globalData,comp){this.initElement(data,globalData,comp)
}extendPrototype([BaseElement,TransformElement,CVBaseElement,HierarchyElement,FrameElement,RenderableElement],CVSolidElement);
CVSolidElement.prototype.initElement=SVGShapeElement.prototype.initElement;
CVSolidElement.prototype.prepareFrame=IImageElement.prototype.prepareFrame;
CVSolidElement.prototype.renderInnerContent=function(){var ctx=this.canvasContext;
ctx.fillStyle=this.data.sc;
ctx.fillRect(0,0,this.data.sw,this.data.sh)
};
function CanvasRendererBase(animationItem,config){this.animationItem=animationItem;
this.renderConfig={clearCanvas:config&&config.clearCanvas!==undefined?config.clearCanvas:true,context:config&&config.context||null,progressiveLoad:config&&config.progressiveLoad||false,preserveAspectRatio:config&&config.preserveAspectRatio||"xMidYMid meet",imagePreserveAspectRatio:config&&config.imagePreserveAspectRatio||"xMidYMid slice",contentVisibility:config&&config.contentVisibility||"visible",className:config&&config.className||"",id:config&&config.id||""};
this.renderConfig.dpr=config&&config.dpr||1;
if(this.animationItem.wrapper){this.renderConfig.dpr=config&&config.dpr||window.devicePixelRatio||1
}this.renderedFrame=-1;
this.globalData={frameNum:-1,_mdf:false,renderConfig:this.renderConfig,currentGlobalAlpha:-1};
this.contextData=new CVContextData();
this.elements=[];
this.pendingElements=[];
this.transformMat=new Matrix();
this.completeLayers=false;
this.rendererType="canvas"
}extendPrototype([BaseRenderer],CanvasRendererBase);
CanvasRendererBase.prototype.createShape=function(data){return new CVShapeElement(data,this.globalData,this)
};
CanvasRendererBase.prototype.createText=function(data){return new CVTextElement(data,this.globalData,this)
};
CanvasRendererBase.prototype.createImage=function(data){return new CVImageElement(data,this.globalData,this)
};
CanvasRendererBase.prototype.createSolid=function(data){return new CVSolidElement(data,this.globalData,this)
};
CanvasRendererBase.prototype.createNull=SVGRenderer.prototype.createNull;
CanvasRendererBase.prototype.ctxTransform=function(props){if(props[0]===1&&props[1]===0&&props[4]===0&&props[5]===1&&props[12]===0&&props[13]===0){return
}if(!this.renderConfig.clearCanvas){this.canvasContext.transform(props[0],props[1],props[4],props[5],props[12],props[13]);
return
}this.transformMat.cloneFromProps(props);
var currentTransform=this.contextData.getTransform();
var cProps=currentTransform.props;
this.transformMat.transform(cProps[0],cProps[1],cProps[2],cProps[3],cProps[4],cProps[5],cProps[6],cProps[7],cProps[8],cProps[9],cProps[10],cProps[11],cProps[12],cProps[13],cProps[14],cProps[15]);
currentTransform.cloneFromProps(this.transformMat.props);
var trProps=currentTransform.props;
this.canvasContext.setTransform(trProps[0],trProps[1],trProps[4],trProps[5],trProps[12],trProps[13])
};
CanvasRendererBase.prototype.ctxOpacity=function(op){var currentOpacity=this.contextData.getOpacity();
if(!this.renderConfig.clearCanvas){this.canvasContext.globalAlpha*=op<0?0:op;
this.globalData.currentGlobalAlpha=currentOpacity;
return
}currentOpacity*=op<0?0:op;
this.contextData.setOpacity(currentOpacity);
if(this.globalData.currentGlobalAlpha!==currentOpacity){this.canvasContext.globalAlpha=currentOpacity;
this.globalData.currentGlobalAlpha=currentOpacity
}};
CanvasRendererBase.prototype.reset=function(){if(!this.renderConfig.clearCanvas){this.canvasContext.restore();
return
}this.contextData.reset()
};
CanvasRendererBase.prototype.save=function(actionFlag){if(!this.renderConfig.clearCanvas){this.canvasContext.save();
return
}if(actionFlag){this.canvasContext.save()
}this.contextData.push()
};
CanvasRendererBase.prototype.restore=function(actionFlag){if(!this.renderConfig.clearCanvas){this.canvasContext.restore();
return
}if(actionFlag){this.canvasContext.restore();
this.globalData.blendMode="source-over"
}var popped=this.contextData.pop();
var transform=popped.transform;
var opacity=popped.opacity;
this.canvasContext.setTransform(transform[0],transform[1],transform[4],transform[5],transform[12],transform[13]);
if(this.globalData.currentGlobalAlpha!==opacity){this.canvasContext.globalAlpha=opacity;
this.globalData.currentGlobalAlpha=opacity
}};
CanvasRendererBase.prototype.configAnimation=function(animData){if(this.animationItem.wrapper){this.animationItem.container=createTag("canvas");
var containerStyle=this.animationItem.container.style;
containerStyle.width="100%";
containerStyle.height="100%";
var origin="0px 0px 0px";
containerStyle.transformOrigin=origin;
containerStyle.mozTransformOrigin=origin;
containerStyle.webkitTransformOrigin=origin;
containerStyle["-webkit-transform"]=origin;
containerStyle.contentVisibility=this.renderConfig.contentVisibility;
this.animationItem.wrapper.appendChild(this.animationItem.container);
this.canvasContext=this.animationItem.container.getContext("2d");
if(this.renderConfig.className){this.animationItem.container.setAttribute("class",this.renderConfig.className)
}if(this.renderConfig.id){this.animationItem.container.setAttribute("id",this.renderConfig.id)
}}else{this.canvasContext=this.renderConfig.context
}this.data=animData;
this.layers=animData.layers;
this.transformCanvas={w:animData.w,h:animData.h,sx:0,sy:0,tx:0,ty:0};
this.setupGlobalData(animData,document.body);
this.globalData.canvasContext=this.canvasContext;
this.globalData.renderer=this;
this.globalData.isDashed=false;
this.globalData.progressiveLoad=this.renderConfig.progressiveLoad;
this.globalData.transformCanvas=this.transformCanvas;
this.elements=createSizedArray(animData.layers.length);
this.updateContainerSize()
};
CanvasRendererBase.prototype.updateContainerSize=function(width,height){this.reset();
var elementWidth;
var elementHeight;
if(width){elementWidth=width;
elementHeight=height;
this.canvasContext.canvas.width=elementWidth;
this.canvasContext.canvas.height=elementHeight
}else{if(this.animationItem.wrapper&&this.animationItem.container){elementWidth=this.animationItem.wrapper.offsetWidth;
elementHeight=this.animationItem.wrapper.offsetHeight
}else{elementWidth=this.canvasContext.canvas.width;
elementHeight=this.canvasContext.canvas.height
}this.canvasContext.canvas.width=elementWidth*this.renderConfig.dpr;
this.canvasContext.canvas.height=elementHeight*this.renderConfig.dpr
}var elementRel;
var animationRel;
if(this.renderConfig.preserveAspectRatio.indexOf("meet")!==-1||this.renderConfig.preserveAspectRatio.indexOf("slice")!==-1){var par=this.renderConfig.preserveAspectRatio.split(" ");
var fillType=par[1]||"meet";
var pos=par[0]||"xMidYMid";
var xPos=pos.substr(0,4);
var yPos=pos.substr(4);
elementRel=elementWidth/elementHeight;
animationRel=this.transformCanvas.w/this.transformCanvas.h;
if(animationRel>elementRel&&fillType==="meet"||animationRel<elementRel&&fillType==="slice"){this.transformCanvas.sx=elementWidth/(this.transformCanvas.w/this.renderConfig.dpr);
this.transformCanvas.sy=elementWidth/(this.transformCanvas.w/this.renderConfig.dpr)
}else{this.transformCanvas.sx=elementHeight/(this.transformCanvas.h/this.renderConfig.dpr);
this.transformCanvas.sy=elementHeight/(this.transformCanvas.h/this.renderConfig.dpr)
}if(xPos==="xMid"&&(animationRel<elementRel&&fillType==="meet"||animationRel>elementRel&&fillType==="slice")){this.transformCanvas.tx=(elementWidth-this.transformCanvas.w*(elementHeight/this.transformCanvas.h))/2*this.renderConfig.dpr
}else{if(xPos==="xMax"&&(animationRel<elementRel&&fillType==="meet"||animationRel>elementRel&&fillType==="slice")){this.transformCanvas.tx=(elementWidth-this.transformCanvas.w*(elementHeight/this.transformCanvas.h))*this.renderConfig.dpr
}else{this.transformCanvas.tx=0
}}if(yPos==="YMid"&&(animationRel>elementRel&&fillType==="meet"||animationRel<elementRel&&fillType==="slice")){this.transformCanvas.ty=(elementHeight-this.transformCanvas.h*(elementWidth/this.transformCanvas.w))/2*this.renderConfig.dpr
}else{if(yPos==="YMax"&&(animationRel>elementRel&&fillType==="meet"||animationRel<elementRel&&fillType==="slice")){this.transformCanvas.ty=(elementHeight-this.transformCanvas.h*(elementWidth/this.transformCanvas.w))*this.renderConfig.dpr
}else{this.transformCanvas.ty=0
}}}else{if(this.renderConfig.preserveAspectRatio==="none"){this.transformCanvas.sx=elementWidth/(this.transformCanvas.w/this.renderConfig.dpr);
this.transformCanvas.sy=elementHeight/(this.transformCanvas.h/this.renderConfig.dpr);
this.transformCanvas.tx=0;
this.transformCanvas.ty=0
}else{this.transformCanvas.sx=this.renderConfig.dpr;
this.transformCanvas.sy=this.renderConfig.dpr;
this.transformCanvas.tx=0;
this.transformCanvas.ty=0
}}this.transformCanvas.props=[this.transformCanvas.sx,0,0,0,0,this.transformCanvas.sy,0,0,0,0,1,0,this.transformCanvas.tx,this.transformCanvas.ty,0,1];
this.ctxTransform(this.transformCanvas.props);
this.canvasContext.beginPath();
this.canvasContext.rect(0,0,this.transformCanvas.w,this.transformCanvas.h);
this.canvasContext.closePath();
this.canvasContext.clip();
this.renderFrame(this.renderedFrame,true)
};
CanvasRendererBase.prototype.destroy=function(){if(this.renderConfig.clearCanvas&&this.animationItem.wrapper){this.animationItem.wrapper.innerText=""
}var i;
var len=this.layers?this.layers.length:0;
for(i=len-1;
i>=0;
i-=1){if(this.elements[i]&&this.elements[i].destroy){this.elements[i].destroy()
}}this.elements.length=0;
this.globalData.canvasContext=null;
this.animationItem.container=null;
this.destroyed=true
};
CanvasRendererBase.prototype.renderFrame=function(num,forceRender){if(this.renderedFrame===num&&this.renderConfig.clearCanvas===true&&!forceRender||this.destroyed||num===-1){return
}this.renderedFrame=num;
this.globalData.frameNum=num-this.animationItem._isFirstFrame;
this.globalData.frameId+=1;
this.globalData._mdf=!this.renderConfig.clearCanvas||forceRender;
this.globalData.projectInterface.currentFrame=num;
var i;
var len=this.layers.length;
if(!this.completeLayers){this.checkLayers(num)
}for(i=0;
i<len;
i+=1){if(this.completeLayers||this.elements[i]){this.elements[i].prepareFrame(num-this.layers[i].st)
}}if(this.globalData._mdf){if(this.renderConfig.clearCanvas===true){this.canvasContext.clearRect(0,0,this.transformCanvas.w,this.transformCanvas.h)
}else{this.save()
}for(i=len-1;
i>=0;
i-=1){if(this.completeLayers||this.elements[i]){this.elements[i].renderFrame()
}}if(this.renderConfig.clearCanvas!==true){this.restore()
}}};
CanvasRendererBase.prototype.buildItem=function(pos){var elements=this.elements;
if(elements[pos]||this.layers[pos].ty===99){return
}var element=this.createItem(this.layers[pos],this,this.globalData);
elements[pos]=element;
element.initExpressions()
};
CanvasRendererBase.prototype.checkPendingElements=function(){while(this.pendingElements.length){var element=this.pendingElements.pop();
element.checkParenting()
}};
CanvasRendererBase.prototype.hide=function(){this.animationItem.container.style.display="none"
};
CanvasRendererBase.prototype.show=function(){this.animationItem.container.style.display="block"
};
function CVCompElement(data,globalData,comp){this.completeLayers=false;
this.layers=data.layers;
this.pendingElements=[];
this.elements=createSizedArray(this.layers.length);
this.initElement(data,globalData,comp);
this.tm=data.tm?PropertyFactory.getProp(this,data.tm,0,globalData.frameRate,this):{_placeholder:true}
}extendPrototype([CanvasRendererBase,ICompElement,CVBaseElement],CVCompElement);
CVCompElement.prototype.renderInnerContent=function(){var ctx=this.canvasContext;
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(this.data.w,0);
ctx.lineTo(this.data.w,this.data.h);
ctx.lineTo(0,this.data.h);
ctx.lineTo(0,0);
ctx.clip();
var i;
var len=this.layers.length;
for(i=len-1;
i>=0;
i-=1){if(this.completeLayers||this.elements[i]){this.elements[i].renderFrame()
}}};
CVCompElement.prototype.destroy=function(){var i;
var len=this.layers.length;
for(i=len-1;
i>=0;
i-=1){if(this.elements[i]){this.elements[i].destroy()
}}this.layers=null;
this.elements=null
};
CVCompElement.prototype.createComp=function(data){return new CVCompElement(data,this.globalData,this)
};
function CanvasRenderer(animationItem,config){this.animationItem=animationItem;
this.renderConfig={clearCanvas:config&&config.clearCanvas!==undefined?config.clearCanvas:true,context:config&&config.context||null,progressiveLoad:config&&config.progressiveLoad||false,preserveAspectRatio:config&&config.preserveAspectRatio||"xMidYMid meet",imagePreserveAspectRatio:config&&config.imagePreserveAspectRatio||"xMidYMid slice",contentVisibility:config&&config.contentVisibility||"visible",className:config&&config.className||"",id:config&&config.id||"",runExpressions:!config||config.runExpressions===undefined||config.runExpressions};
this.renderConfig.dpr=config&&config.dpr||1;
if(this.animationItem.wrapper){this.renderConfig.dpr=config&&config.dpr||window.devicePixelRatio||1
}this.renderedFrame=-1;
this.globalData={frameNum:-1,_mdf:false,renderConfig:this.renderConfig,currentGlobalAlpha:-1};
this.contextData=new CVContextData();
this.elements=[];
this.pendingElements=[];
this.transformMat=new Matrix();
this.completeLayers=false;
this.rendererType="canvas"
}extendPrototype([CanvasRendererBase],CanvasRenderer);
CanvasRenderer.prototype.createComp=function(data){return new CVCompElement(data,this.globalData,this)
};
function HBaseElement(){}HBaseElement.prototype={checkBlendMode:function checkBlendMode(){},initRendererElement:function initRendererElement(){this.baseElement=createTag(this.data.tg||"div");
if(this.data.hasMask){this.svgElement=createNS("svg");
this.layerElement=createNS("g");
this.maskedElement=this.layerElement;
this.svgElement.appendChild(this.layerElement);
this.baseElement.appendChild(this.svgElement)
}else{this.layerElement=this.baseElement
}styleDiv(this.baseElement)
},createContainerElements:function createContainerElements(){this.renderableEffectsManager=new CVEffects(this);
this.transformedElement=this.baseElement;
this.maskedElement=this.layerElement;
if(this.data.ln){this.layerElement.setAttribute("id",this.data.ln)
}if(this.data.cl){this.layerElement.setAttribute("class",this.data.cl)
}if(this.data.bm!==0){this.setBlendMode()
}},renderElement:function renderElement(){var transformedElementStyle=this.transformedElement?this.transformedElement.style:{};
if(this.finalTransform._matMdf){var matrixValue=this.finalTransform.mat.toCSS();
transformedElementStyle.transform=matrixValue;
transformedElementStyle.webkitTransform=matrixValue
}if(this.finalTransform._opMdf){transformedElementStyle.opacity=this.finalTransform.mProp.o.v
}},renderFrame:function renderFrame(){if(this.data.hd||this.hidden){return
}this.renderTransform();
this.renderRenderable();
this.renderElement();
this.renderInnerContent();
if(this._isFirstFrame){this._isFirstFrame=false
}},destroy:function destroy(){this.layerElement=null;
this.transformedElement=null;
if(this.matteElement){this.matteElement=null
}if(this.maskManager){this.maskManager.destroy();
this.maskManager=null
}},createRenderableComponents:function createRenderableComponents(){this.maskManager=new MaskElement(this.data,this,this.globalData)
},addEffects:function addEffects(){},setMatte:function setMatte(){}};
HBaseElement.prototype.getBaseElement=SVGBaseElement.prototype.getBaseElement;
HBaseElement.prototype.destroyBaseElement=HBaseElement.prototype.destroy;
HBaseElement.prototype.buildElementParenting=BaseRenderer.prototype.buildElementParenting;
function HSolidElement(data,globalData,comp){this.initElement(data,globalData,comp)
}extendPrototype([BaseElement,TransformElement,HBaseElement,HierarchyElement,FrameElement,RenderableDOMElement],HSolidElement);
HSolidElement.prototype.createContent=function(){var rect;
if(this.data.hasMask){rect=createNS("rect");
rect.setAttribute("width",this.data.sw);
rect.setAttribute("height",this.data.sh);
rect.setAttribute("fill",this.data.sc);
this.svgElement.setAttribute("width",this.data.sw);
this.svgElement.setAttribute("height",this.data.sh)
}else{rect=createTag("div");
rect.style.width=this.data.sw+"px";
rect.style.height=this.data.sh+"px";
rect.style.backgroundColor=this.data.sc
}this.layerElement.appendChild(rect)
};
function HShapeElement(data,globalData,comp){this.shapes=[];
this.shapesData=data.shapes;
this.stylesList=[];
this.shapeModifiers=[];
this.itemsData=[];
this.processedElements=[];
this.animatedContents=[];
this.shapesContainer=createNS("g");
this.initElement(data,globalData,comp);
this.prevViewData=[];
this.currentBBox={x:999999,y:-999999,h:0,w:0}
}extendPrototype([BaseElement,TransformElement,HSolidElement,SVGShapeElement,HBaseElement,HierarchyElement,FrameElement,RenderableElement],HShapeElement);
HShapeElement.prototype._renderShapeFrame=HShapeElement.prototype.renderInnerContent;
HShapeElement.prototype.createContent=function(){var cont;
this.baseElement.style.fontSize=0;
if(this.data.hasMask){this.layerElement.appendChild(this.shapesContainer);
cont=this.svgElement
}else{cont=createNS("svg");
var size=this.comp.data?this.comp.data:this.globalData.compSize;
cont.setAttribute("width",size.w);
cont.setAttribute("height",size.h);
cont.appendChild(this.shapesContainer);
this.layerElement.appendChild(cont)
}this.searchShapes(this.shapesData,this.itemsData,this.prevViewData,this.shapesContainer,0,[],true);
this.filterUniqueShapes();
this.shapeCont=cont
};
HShapeElement.prototype.getTransformedPoint=function(transformers,point){var i;
var len=transformers.length;
for(i=0;
i<len;
i+=1){point=transformers[i].mProps.v.applyToPointArray(point[0],point[1],0)
}return point
};
HShapeElement.prototype.calculateShapeBoundingBox=function(item,boundingBox){var shape=item.sh.v;
var transformers=item.transformers;
var i;
var len=shape._length;
var vPoint;
var oPoint;
var nextIPoint;
var nextVPoint;
if(len<=1){return
}for(i=0;
i<len-1;
i+=1){vPoint=this.getTransformedPoint(transformers,shape.v[i]);
oPoint=this.getTransformedPoint(transformers,shape.o[i]);
nextIPoint=this.getTransformedPoint(transformers,shape.i[i+1]);
nextVPoint=this.getTransformedPoint(transformers,shape.v[i+1]);
this.checkBounds(vPoint,oPoint,nextIPoint,nextVPoint,boundingBox)
}if(shape.c){vPoint=this.getTransformedPoint(transformers,shape.v[i]);
oPoint=this.getTransformedPoint(transformers,shape.o[i]);
nextIPoint=this.getTransformedPoint(transformers,shape.i[0]);
nextVPoint=this.getTransformedPoint(transformers,shape.v[0]);
this.checkBounds(vPoint,oPoint,nextIPoint,nextVPoint,boundingBox)
}};
HShapeElement.prototype.checkBounds=function(vPoint,oPoint,nextIPoint,nextVPoint,boundingBox){this.getBoundsOfCurve(vPoint,oPoint,nextIPoint,nextVPoint);
var bounds=this.shapeBoundingBox;
boundingBox.x=bmMin(bounds.left,boundingBox.x);
boundingBox.xMax=bmMax(bounds.right,boundingBox.xMax);
boundingBox.y=bmMin(bounds.top,boundingBox.y);
boundingBox.yMax=bmMax(bounds.bottom,boundingBox.yMax)
};
HShapeElement.prototype.shapeBoundingBox={left:0,right:0,top:0,bottom:0};
HShapeElement.prototype.tempBoundingBox={x:0,xMax:0,y:0,yMax:0,width:0,height:0};
HShapeElement.prototype.getBoundsOfCurve=function(p0,p1,p2,p3){var bounds=[[p0[0],p3[0]],[p0[1],p3[1]]];
for(var a,b,c,t,b2ac,t1,t2,i=0;
i<2;
++i){b=6*p0[i]-12*p1[i]+6*p2[i];
a=-3*p0[i]+9*p1[i]-9*p2[i]+3*p3[i];
c=3*p1[i]-3*p0[i];
b|=0;
a|=0;
c|=0;
if(a===0&&b===0){}else{if(a===0){t=-c/b;
if(t>0&&t<1){bounds[i].push(this.calculateF(t,p0,p1,p2,p3,i))
}}else{b2ac=b*b-4*c*a;
if(b2ac>=0){t1=(-b+bmSqrt(b2ac))/(2*a);
if(t1>0&&t1<1){bounds[i].push(this.calculateF(t1,p0,p1,p2,p3,i))
}t2=(-b-bmSqrt(b2ac))/(2*a);
if(t2>0&&t2<1){bounds[i].push(this.calculateF(t2,p0,p1,p2,p3,i))
}}}}}this.shapeBoundingBox.left=bmMin.apply(null,bounds[0]);
this.shapeBoundingBox.top=bmMin.apply(null,bounds[1]);
this.shapeBoundingBox.right=bmMax.apply(null,bounds[0]);
this.shapeBoundingBox.bottom=bmMax.apply(null,bounds[1])
};
HShapeElement.prototype.calculateF=function(t,p0,p1,p2,p3,i){return bmPow(1-t,3)*p0[i]+3*bmPow(1-t,2)*t*p1[i]+3*(1-t)*bmPow(t,2)*p2[i]+bmPow(t,3)*p3[i]
};
HShapeElement.prototype.calculateBoundingBox=function(itemsData,boundingBox){var i;
var len=itemsData.length;
for(i=0;
i<len;
i+=1){if(itemsData[i]&&itemsData[i].sh){this.calculateShapeBoundingBox(itemsData[i],boundingBox)
}else{if(itemsData[i]&&itemsData[i].it){this.calculateBoundingBox(itemsData[i].it,boundingBox)
}else{if(itemsData[i]&&itemsData[i].style&&itemsData[i].w){this.expandStrokeBoundingBox(itemsData[i].w,boundingBox)
}}}}};
HShapeElement.prototype.expandStrokeBoundingBox=function(widthProperty,boundingBox){var width=0;
if(widthProperty.keyframes){for(var i=0;
i<widthProperty.keyframes.length;
i+=1){var kfw=widthProperty.keyframes[i].s;
if(kfw>width){width=kfw
}}width*=widthProperty.mult
}else{width=widthProperty.v*widthProperty.mult
}boundingBox.x-=width;
boundingBox.xMax+=width;
boundingBox.y-=width;
boundingBox.yMax+=width
};
HShapeElement.prototype.currentBoxContains=function(box){return this.currentBBox.x<=box.x&&this.currentBBox.y<=box.y&&this.currentBBox.width+this.currentBBox.x>=box.x+box.width&&this.currentBBox.height+this.currentBBox.y>=box.y+box.height
};
HShapeElement.prototype.renderInnerContent=function(){this._renderShapeFrame();
if(!this.hidden&&(this._isFirstFrame||this._mdf)){var tempBoundingBox=this.tempBoundingBox;
var max=999999;
tempBoundingBox.x=max;
tempBoundingBox.xMax=-max;
tempBoundingBox.y=max;
tempBoundingBox.yMax=-max;
this.calculateBoundingBox(this.itemsData,tempBoundingBox);
tempBoundingBox.width=tempBoundingBox.xMax<tempBoundingBox.x?0:tempBoundingBox.xMax-tempBoundingBox.x;
tempBoundingBox.height=tempBoundingBox.yMax<tempBoundingBox.y?0:tempBoundingBox.yMax-tempBoundingBox.y;
if(this.currentBoxContains(tempBoundingBox)){return
}var changed=false;
if(this.currentBBox.w!==tempBoundingBox.width){this.currentBBox.w=tempBoundingBox.width;
this.shapeCont.setAttribute("width",tempBoundingBox.width);
changed=true
}if(this.currentBBox.h!==tempBoundingBox.height){this.currentBBox.h=tempBoundingBox.height;
this.shapeCont.setAttribute("height",tempBoundingBox.height);
changed=true
}if(changed||this.currentBBox.x!==tempBoundingBox.x||this.currentBBox.y!==tempBoundingBox.y){this.currentBBox.w=tempBoundingBox.width;
this.currentBBox.h=tempBoundingBox.height;
this.currentBBox.x=tempBoundingBox.x;
this.currentBBox.y=tempBoundingBox.y;
this.shapeCont.setAttribute("viewBox",this.currentBBox.x+" "+this.currentBBox.y+" "+this.currentBBox.w+" "+this.currentBBox.h);
var shapeStyle=this.shapeCont.style;
var shapeTransform="translate("+this.currentBBox.x+"px,"+this.currentBBox.y+"px)";
shapeStyle.transform=shapeTransform;
shapeStyle.webkitTransform=shapeTransform
}}};
function HTextElement(data,globalData,comp){this.textSpans=[];
this.textPaths=[];
this.currentBBox={x:999999,y:-999999,h:0,w:0};
this.renderType="svg";
this.isMasked=false;
this.initElement(data,globalData,comp)
}extendPrototype([BaseElement,TransformElement,HBaseElement,HierarchyElement,FrameElement,RenderableDOMElement,ITextElement],HTextElement);
HTextElement.prototype.createContent=function(){this.isMasked=this.checkMasks();
if(this.isMasked){this.renderType="svg";
this.compW=this.comp.data.w;
this.compH=this.comp.data.h;
this.svgElement.setAttribute("width",this.compW);
this.svgElement.setAttribute("height",this.compH);
var g=createNS("g");
this.maskedElement.appendChild(g);
this.innerElem=g
}else{this.renderType="html";
this.innerElem=this.layerElement
}this.checkParenting()
};
HTextElement.prototype.buildNewText=function(){var documentData=this.textProperty.currentData;
this.renderedLetters=createSizedArray(documentData.l?documentData.l.length:0);
var innerElemStyle=this.innerElem.style;
var textColor=documentData.fc?this.buildColor(documentData.fc):"rgba(0,0,0,0)";
innerElemStyle.fill=textColor;
innerElemStyle.color=textColor;
if(documentData.sc){innerElemStyle.stroke=this.buildColor(documentData.sc);
innerElemStyle.strokeWidth=documentData.sw+"px"
}var fontData=this.globalData.fontManager.getFontByName(documentData.f);
if(!this.globalData.fontManager.chars){innerElemStyle.fontSize=documentData.finalSize+"px";
innerElemStyle.lineHeight=documentData.finalSize+"px";
if(fontData.fClass){this.innerElem.className=fontData.fClass
}else{innerElemStyle.fontFamily=fontData.fFamily;
var fWeight=documentData.fWeight;
var fStyle=documentData.fStyle;
innerElemStyle.fontStyle=fStyle;
innerElemStyle.fontWeight=fWeight
}}var i;
var len;
var letters=documentData.l;
len=letters.length;
var tSpan;
var tParent;
var tCont;
var matrixHelper=this.mHelper;
var shapes;
var shapeStr="";
var cnt=0;
for(i=0;
i<len;
i+=1){if(this.globalData.fontManager.chars){if(!this.textPaths[cnt]){tSpan=createNS("path");
tSpan.setAttribute("stroke-linecap",lineCapEnum[1]);
tSpan.setAttribute("stroke-linejoin",lineJoinEnum[2]);
tSpan.setAttribute("stroke-miterlimit","4")
}else{tSpan=this.textPaths[cnt]
}if(!this.isMasked){if(this.textSpans[cnt]){tParent=this.textSpans[cnt];
tCont=tParent.children[0]
}else{tParent=createTag("div");
tParent.style.lineHeight=0;
tCont=createNS("svg");
tCont.appendChild(tSpan);
styleDiv(tParent)
}}}else{if(!this.isMasked){if(this.textSpans[cnt]){tParent=this.textSpans[cnt];
tSpan=this.textPaths[cnt]
}else{tParent=createTag("span");
styleDiv(tParent);
tSpan=createTag("span");
styleDiv(tSpan);
tParent.appendChild(tSpan)
}}else{tSpan=this.textPaths[cnt]?this.textPaths[cnt]:createNS("text")
}}if(this.globalData.fontManager.chars){var charData=this.globalData.fontManager.getCharData(documentData.finalText[i],fontData.fStyle,this.globalData.fontManager.getFontByName(documentData.f).fFamily);
var shapeData;
if(charData){shapeData=charData.data
}else{shapeData=null
}matrixHelper.reset();
if(shapeData&&shapeData.shapes&&shapeData.shapes.length){shapes=shapeData.shapes[0].it;
matrixHelper.scale(documentData.finalSize/100,documentData.finalSize/100);
shapeStr=this.createPathShape(matrixHelper,shapes);
tSpan.setAttribute("d",shapeStr)
}if(!this.isMasked){this.innerElem.appendChild(tParent);
if(shapeData&&shapeData.shapes){document.body.appendChild(tCont);
var boundingBox=tCont.getBBox();
tCont.setAttribute("width",boundingBox.width+2);
tCont.setAttribute("height",boundingBox.height+2);
tCont.setAttribute("viewBox",boundingBox.x-1+" "+(boundingBox.y-1)+" "+(boundingBox.width+2)+" "+(boundingBox.height+2));
var tContStyle=tCont.style;
var tContTranslation="translate("+(boundingBox.x-1)+"px,"+(boundingBox.y-1)+"px)";
tContStyle.transform=tContTranslation;
tContStyle.webkitTransform=tContTranslation;
letters[i].yOffset=boundingBox.y-1
}else{tCont.setAttribute("width",1);
tCont.setAttribute("height",1)
}tParent.appendChild(tCont)
}else{this.innerElem.appendChild(tSpan)
}}else{tSpan.textContent=letters[i].val;
tSpan.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve");
if(!this.isMasked){this.innerElem.appendChild(tParent);
var tStyle=tSpan.style;
var tSpanTranslation="translate3d(0,"+-documentData.finalSize/1.2+"px,0)";
tStyle.transform=tSpanTranslation;
tStyle.webkitTransform=tSpanTranslation
}else{this.innerElem.appendChild(tSpan)
}}if(!this.isMasked){this.textSpans[cnt]=tParent
}else{this.textSpans[cnt]=tSpan
}this.textSpans[cnt].style.display="block";
this.textPaths[cnt]=tSpan;
cnt+=1
}while(cnt<this.textSpans.length){this.textSpans[cnt].style.display="none";
cnt+=1
}};
HTextElement.prototype.renderInnerContent=function(){var svgStyle;
if(this.data.singleShape){if(!this._isFirstFrame&&!this.lettersChangedFlag){return
}if(this.isMasked&&this.finalTransform._matMdf){this.svgElement.setAttribute("viewBox",-this.finalTransform.mProp.p.v[0]+" "+-this.finalTransform.mProp.p.v[1]+" "+this.compW+" "+this.compH);
svgStyle=this.svgElement.style;
var translation="translate("+-this.finalTransform.mProp.p.v[0]+"px,"+-this.finalTransform.mProp.p.v[1]+"px)";
svgStyle.transform=translation;
svgStyle.webkitTransform=translation
}}this.textAnimator.getMeasures(this.textProperty.currentData,this.lettersChangedFlag);
if(!this.lettersChangedFlag&&!this.textAnimator.lettersChangedFlag){return
}var i;
var len;
var count=0;
var renderedLetters=this.textAnimator.renderedLetters;
var letters=this.textProperty.currentData.l;
len=letters.length;
var renderedLetter;
var textSpan;
var textPath;
for(i=0;
i<len;
i+=1){if(letters[i].n){count+=1
}else{textSpan=this.textSpans[i];
textPath=this.textPaths[i];
renderedLetter=renderedLetters[count];
count+=1;
if(renderedLetter._mdf.m){if(!this.isMasked){textSpan.style.webkitTransform=renderedLetter.m;
textSpan.style.transform=renderedLetter.m
}else{textSpan.setAttribute("transform",renderedLetter.m)
}}textSpan.style.opacity=renderedLetter.o;
if(renderedLetter.sw&&renderedLetter._mdf.sw){textPath.setAttribute("stroke-width",renderedLetter.sw)
}if(renderedLetter.sc&&renderedLetter._mdf.sc){textPath.setAttribute("stroke",renderedLetter.sc)
}if(renderedLetter.fc&&renderedLetter._mdf.fc){textPath.setAttribute("fill",renderedLetter.fc);
textPath.style.color=renderedLetter.fc
}}}if(this.innerElem.getBBox&&!this.hidden&&(this._isFirstFrame||this._mdf)){var boundingBox=this.innerElem.getBBox();
if(this.currentBBox.w!==boundingBox.width){this.currentBBox.w=boundingBox.width;
this.svgElement.setAttribute("width",boundingBox.width)
}if(this.currentBBox.h!==boundingBox.height){this.currentBBox.h=boundingBox.height;
this.svgElement.setAttribute("height",boundingBox.height)
}var margin=1;
if(this.currentBBox.w!==boundingBox.width+margin*2||this.currentBBox.h!==boundingBox.height+margin*2||this.currentBBox.x!==boundingBox.x-margin||this.currentBBox.y!==boundingBox.y-margin){this.currentBBox.w=boundingBox.width+margin*2;
this.currentBBox.h=boundingBox.height+margin*2;
this.currentBBox.x=boundingBox.x-margin;
this.currentBBox.y=boundingBox.y-margin;
this.svgElement.setAttribute("viewBox",this.currentBBox.x+" "+this.currentBBox.y+" "+this.currentBBox.w+" "+this.currentBBox.h);
svgStyle=this.svgElement.style;
var svgTransform="translate("+this.currentBBox.x+"px,"+this.currentBBox.y+"px)";
svgStyle.transform=svgTransform;
svgStyle.webkitTransform=svgTransform
}}};
function HCameraElement(data,globalData,comp){this.initFrame();
this.initBaseData(data,globalData,comp);
this.initHierarchy();
var getProp=PropertyFactory.getProp;
this.pe=getProp(this,data.pe,0,0,this);
if(data.ks.p.s){this.px=getProp(this,data.ks.p.x,1,0,this);
this.py=getProp(this,data.ks.p.y,1,0,this);
this.pz=getProp(this,data.ks.p.z,1,0,this)
}else{this.p=getProp(this,data.ks.p,1,0,this)
}if(data.ks.a){this.a=getProp(this,data.ks.a,1,0,this)
}if(data.ks.or.k.length&&data.ks.or.k[0].to){var i;
var len=data.ks.or.k.length;
for(i=0;
i<len;
i+=1){data.ks.or.k[i].to=null;
data.ks.or.k[i].ti=null
}}this.or=getProp(this,data.ks.or,1,degToRads,this);
this.or.sh=true;
this.rx=getProp(this,data.ks.rx,0,degToRads,this);
this.ry=getProp(this,data.ks.ry,0,degToRads,this);
this.rz=getProp(this,data.ks.rz,0,degToRads,this);
this.mat=new Matrix();
this._prevMat=new Matrix();
this._isFirstFrame=true;
this.finalTransform={mProp:this}
}extendPrototype([BaseElement,FrameElement,HierarchyElement],HCameraElement);
HCameraElement.prototype.setup=function(){var i;
var len=this.comp.threeDElements.length;
var comp;
var perspectiveStyle;
var containerStyle;
for(i=0;
i<len;
i+=1){comp=this.comp.threeDElements[i];
if(comp.type==="3d"){perspectiveStyle=comp.perspectiveElem.style;
containerStyle=comp.container.style;
var perspective=this.pe.v+"px";
var origin="0px 0px 0px";
var matrix="matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
perspectiveStyle.perspective=perspective;
perspectiveStyle.webkitPerspective=perspective;
containerStyle.transformOrigin=origin;
containerStyle.mozTransformOrigin=origin;
containerStyle.webkitTransformOrigin=origin;
perspectiveStyle.transform=matrix;
perspectiveStyle.webkitTransform=matrix
}}};
HCameraElement.prototype.createElements=function(){};
HCameraElement.prototype.hide=function(){};
HCameraElement.prototype.renderFrame=function(){var _mdf=this._isFirstFrame;
var i;
var len;
if(this.hierarchy){len=this.hierarchy.length;
for(i=0;
i<len;
i+=1){_mdf=this.hierarchy[i].finalTransform.mProp._mdf||_mdf
}}if(_mdf||this.pe._mdf||this.p&&this.p._mdf||this.px&&(this.px._mdf||this.py._mdf||this.pz._mdf)||this.rx._mdf||this.ry._mdf||this.rz._mdf||this.or._mdf||this.a&&this.a._mdf){this.mat.reset();
if(this.hierarchy){len=this.hierarchy.length-1;
for(i=len;
i>=0;
i-=1){var mTransf=this.hierarchy[i].finalTransform.mProp;
this.mat.translate(-mTransf.p.v[0],-mTransf.p.v[1],mTransf.p.v[2]);
this.mat.rotateX(-mTransf.or.v[0]).rotateY(-mTransf.or.v[1]).rotateZ(mTransf.or.v[2]);
this.mat.rotateX(-mTransf.rx.v).rotateY(-mTransf.ry.v).rotateZ(mTransf.rz.v);
this.mat.scale(1/mTransf.s.v[0],1/mTransf.s.v[1],1/mTransf.s.v[2]);
this.mat.translate(mTransf.a.v[0],mTransf.a.v[1],mTransf.a.v[2])
}}if(this.p){this.mat.translate(-this.p.v[0],-this.p.v[1],this.p.v[2])
}else{this.mat.translate(-this.px.v,-this.py.v,this.pz.v)
}if(this.a){var diffVector;
if(this.p){diffVector=[this.p.v[0]-this.a.v[0],this.p.v[1]-this.a.v[1],this.p.v[2]-this.a.v[2]]
}else{diffVector=[this.px.v-this.a.v[0],this.py.v-this.a.v[1],this.pz.v-this.a.v[2]]
}var mag=Math.sqrt(Math.pow(diffVector[0],2)+Math.pow(diffVector[1],2)+Math.pow(diffVector[2],2));
var lookDir=[diffVector[0]/mag,diffVector[1]/mag,diffVector[2]/mag];
var lookLengthOnXZ=Math.sqrt(lookDir[2]*lookDir[2]+lookDir[0]*lookDir[0]);
var mRotationX=Math.atan2(lookDir[1],lookLengthOnXZ);
var mRotationY=Math.atan2(lookDir[0],-lookDir[2]);
this.mat.rotateY(mRotationY).rotateX(-mRotationX)
}this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v);
this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]);
this.mat.translate(this.globalData.compSize.w/2,this.globalData.compSize.h/2,0);
this.mat.translate(0,0,this.pe.v);
var hasMatrixChanged=!this._prevMat.equals(this.mat);
if((hasMatrixChanged||this.pe._mdf)&&this.comp.threeDElements){len=this.comp.threeDElements.length;
var comp;
var perspectiveStyle;
var containerStyle;
for(i=0;
i<len;
i+=1){comp=this.comp.threeDElements[i];
if(comp.type==="3d"){if(hasMatrixChanged){var matValue=this.mat.toCSS();
containerStyle=comp.container.style;
containerStyle.transform=matValue;
containerStyle.webkitTransform=matValue
}if(this.pe._mdf){perspectiveStyle=comp.perspectiveElem.style;
perspectiveStyle.perspective=this.pe.v+"px";
perspectiveStyle.webkitPerspective=this.pe.v+"px"
}}}this.mat.clone(this._prevMat)
}}this._isFirstFrame=false
};
HCameraElement.prototype.prepareFrame=function(num){this.prepareProperties(num,true)
};
HCameraElement.prototype.destroy=function(){};
HCameraElement.prototype.getBaseElement=function(){return null
};
function HImageElement(data,globalData,comp){this.assetData=globalData.getAssetData(data.refId);
this.initElement(data,globalData,comp)
}extendPrototype([BaseElement,TransformElement,HBaseElement,HSolidElement,HierarchyElement,FrameElement,RenderableElement],HImageElement);
HImageElement.prototype.createContent=function(){var assetPath=this.globalData.getAssetsPath(this.assetData);
var img=new Image();
if(this.data.hasMask){this.imageElem=createNS("image");
this.imageElem.setAttribute("width",this.assetData.w+"px");
this.imageElem.setAttribute("height",this.assetData.h+"px");
this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink","href",assetPath);
this.layerElement.appendChild(this.imageElem);
this.baseElement.setAttribute("width",this.assetData.w);
this.baseElement.setAttribute("height",this.assetData.h)
}else{this.layerElement.appendChild(img)
}img.crossOrigin="anonymous";
img.src=assetPath;
if(this.data.ln){this.baseElement.setAttribute("id",this.data.ln)
}};
function HybridRendererBase(animationItem,config){this.animationItem=animationItem;
this.layers=null;
this.renderedFrame=-1;
this.renderConfig={className:config&&config.className||"",imagePreserveAspectRatio:config&&config.imagePreserveAspectRatio||"xMidYMid slice",hideOnTransparent:!(config&&config.hideOnTransparent===false),filterSize:{width:config&&config.filterSize&&config.filterSize.width||"400%",height:config&&config.filterSize&&config.filterSize.height||"400%",x:config&&config.filterSize&&config.filterSize.x||"-100%",y:config&&config.filterSize&&config.filterSize.y||"-100%"}};
this.globalData={_mdf:false,frameNum:-1,renderConfig:this.renderConfig};
this.pendingElements=[];
this.elements=[];
this.threeDElements=[];
this.destroyed=false;
this.camera=null;
this.supports3d=true;
this.rendererType="html"
}extendPrototype([BaseRenderer],HybridRendererBase);
HybridRendererBase.prototype.buildItem=SVGRenderer.prototype.buildItem;
HybridRendererBase.prototype.checkPendingElements=function(){while(this.pendingElements.length){var element=this.pendingElements.pop();
element.checkParenting()
}};
HybridRendererBase.prototype.appendElementInPos=function(element,pos){var newDOMElement=element.getBaseElement();
if(!newDOMElement){return
}var layer=this.layers[pos];
if(!layer.ddd||!this.supports3d){if(this.threeDElements){this.addTo3dContainer(newDOMElement,pos)
}else{var i=0;
var nextDOMElement;
var nextLayer;
var tmpDOMElement;
while(i<pos){if(this.elements[i]&&this.elements[i]!==true&&this.elements[i].getBaseElement){nextLayer=this.elements[i];
tmpDOMElement=this.layers[i].ddd?this.getThreeDContainerByPos(i):nextLayer.getBaseElement();
nextDOMElement=tmpDOMElement||nextDOMElement
}i+=1
}if(nextDOMElement){if(!layer.ddd||!this.supports3d){this.layerElement.insertBefore(newDOMElement,nextDOMElement)
}}else{if(!layer.ddd||!this.supports3d){this.layerElement.appendChild(newDOMElement)
}}}}else{this.addTo3dContainer(newDOMElement,pos)
}};
HybridRendererBase.prototype.createShape=function(data){if(!this.supports3d){return new SVGShapeElement(data,this.globalData,this)
}return new HShapeElement(data,this.globalData,this)
};
HybridRendererBase.prototype.createText=function(data){if(!this.supports3d){return new SVGTextLottieElement(data,this.globalData,this)
}return new HTextElement(data,this.globalData,this)
};
HybridRendererBase.prototype.createCamera=function(data){this.camera=new HCameraElement(data,this.globalData,this);
return this.camera
};
HybridRendererBase.prototype.createImage=function(data){if(!this.supports3d){return new IImageElement(data,this.globalData,this)
}return new HImageElement(data,this.globalData,this)
};
HybridRendererBase.prototype.createSolid=function(data){if(!this.supports3d){return new ISolidElement(data,this.globalData,this)
}return new HSolidElement(data,this.globalData,this)
};
HybridRendererBase.prototype.createNull=SVGRenderer.prototype.createNull;
HybridRendererBase.prototype.getThreeDContainerByPos=function(pos){var i=0;
var len=this.threeDElements.length;
while(i<len){if(this.threeDElements[i].startPos<=pos&&this.threeDElements[i].endPos>=pos){return this.threeDElements[i].perspectiveElem
}i+=1
}return null
};
HybridRendererBase.prototype.createThreeDContainer=function(pos,type){var perspectiveElem=createTag("div");
var style;
var containerStyle;
styleDiv(perspectiveElem);
var container=createTag("div");
styleDiv(container);
if(type==="3d"){style=perspectiveElem.style;
style.width=this.globalData.compSize.w+"px";
style.height=this.globalData.compSize.h+"px";
var center="50% 50%";
style.webkitTransformOrigin=center;
style.mozTransformOrigin=center;
style.transformOrigin=center;
containerStyle=container.style;
var matrix="matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
containerStyle.transform=matrix;
containerStyle.webkitTransform=matrix
}perspectiveElem.appendChild(container);
var threeDContainerData={container:container,perspectiveElem:perspectiveElem,startPos:pos,endPos:pos,type:type};
this.threeDElements.push(threeDContainerData);
return threeDContainerData
};
HybridRendererBase.prototype.build3dContainers=function(){var i;
var len=this.layers.length;
var lastThreeDContainerData;
var currentContainer="";
for(i=0;
i<len;
i+=1){if(this.layers[i].ddd&&this.layers[i].ty!==3){if(currentContainer!=="3d"){currentContainer="3d";
lastThreeDContainerData=this.createThreeDContainer(i,"3d")
}lastThreeDContainerData.endPos=Math.max(lastThreeDContainerData.endPos,i)
}else{if(currentContainer!=="2d"){currentContainer="2d";
lastThreeDContainerData=this.createThreeDContainer(i,"2d")
}lastThreeDContainerData.endPos=Math.max(lastThreeDContainerData.endPos,i)
}}len=this.threeDElements.length;
for(i=len-1;
i>=0;
i-=1){this.resizerElem.appendChild(this.threeDElements[i].perspectiveElem)
}};
HybridRendererBase.prototype.addTo3dContainer=function(elem,pos){var i=0;
var len=this.threeDElements.length;
while(i<len){if(pos<=this.threeDElements[i].endPos){var j=this.threeDElements[i].startPos;
var nextElement;
while(j<pos){if(this.elements[j]&&this.elements[j].getBaseElement){nextElement=this.elements[j].getBaseElement()
}j+=1
}if(nextElement){this.threeDElements[i].container.insertBefore(elem,nextElement)
}else{this.threeDElements[i].container.appendChild(elem)
}break
}i+=1
}};
HybridRendererBase.prototype.configAnimation=function(animData){var resizerElem=createTag("div");
var wrapper=this.animationItem.wrapper;
var style=resizerElem.style;
style.width=animData.w+"px";
style.height=animData.h+"px";
this.resizerElem=resizerElem;
styleDiv(resizerElem);
style.transformStyle="flat";
style.mozTransformStyle="flat";
style.webkitTransformStyle="flat";
if(this.renderConfig.className){resizerElem.setAttribute("class",this.renderConfig.className)
}wrapper.appendChild(resizerElem);
style.overflow="hidden";
var svg=createNS("svg");
svg.setAttribute("width","1");
svg.setAttribute("height","1");
styleDiv(svg);
this.resizerElem.appendChild(svg);
var defs=createNS("defs");
svg.appendChild(defs);
this.data=animData;
this.setupGlobalData(animData,svg);
this.globalData.defs=defs;
this.layers=animData.layers;
this.layerElement=this.resizerElem;
this.build3dContainers();
this.updateContainerSize()
};
HybridRendererBase.prototype.destroy=function(){if(this.animationItem.wrapper){this.animationItem.wrapper.innerText=""
}this.animationItem.container=null;
this.globalData.defs=null;
var i;
var len=this.layers?this.layers.length:0;
for(i=0;
i<len;
i+=1){if(this.elements[i]&&this.elements[i].destroy){this.elements[i].destroy()
}}this.elements.length=0;
this.destroyed=true;
this.animationItem=null
};
HybridRendererBase.prototype.updateContainerSize=function(){var elementWidth=this.animationItem.wrapper.offsetWidth;
var elementHeight=this.animationItem.wrapper.offsetHeight;
var elementRel=elementWidth/elementHeight;
var animationRel=this.globalData.compSize.w/this.globalData.compSize.h;
var sx;
var sy;
var tx;
var ty;
if(animationRel>elementRel){sx=elementWidth/this.globalData.compSize.w;
sy=elementWidth/this.globalData.compSize.w;
tx=0;
ty=(elementHeight-this.globalData.compSize.h*(elementWidth/this.globalData.compSize.w))/2
}else{sx=elementHeight/this.globalData.compSize.h;
sy=elementHeight/this.globalData.compSize.h;
tx=(elementWidth-this.globalData.compSize.w*(elementHeight/this.globalData.compSize.h))/2;
ty=0
}var style=this.resizerElem.style;
style.webkitTransform="matrix3d("+sx+",0,0,0,0,"+sy+",0,0,0,0,1,0,"+tx+","+ty+",0,1)";
style.transform=style.webkitTransform
};
HybridRendererBase.prototype.renderFrame=SVGRenderer.prototype.renderFrame;
HybridRendererBase.prototype.hide=function(){this.resizerElem.style.display="none"
};
HybridRendererBase.prototype.show=function(){this.resizerElem.style.display="block"
};
HybridRendererBase.prototype.initItems=function(){this.buildAllItems();
if(this.camera){this.camera.setup()
}else{var cWidth=this.globalData.compSize.w;
var cHeight=this.globalData.compSize.h;
var i;
var len=this.threeDElements.length;
for(i=0;
i<len;
i+=1){var style=this.threeDElements[i].perspectiveElem.style;
style.webkitPerspective=Math.sqrt(Math.pow(cWidth,2)+Math.pow(cHeight,2))+"px";
style.perspective=style.webkitPerspective
}}};
HybridRendererBase.prototype.searchExtraCompositions=function(assets){var i;
var len=assets.length;
var floatingContainer=createTag("div");
for(i=0;
i<len;
i+=1){if(assets[i].xt){var comp=this.createComp(assets[i],floatingContainer,this.globalData.comp,null);
comp.initExpressions();
this.globalData.projectInterface.registerComposition(comp)
}}};
function HCompElement(data,globalData,comp){this.layers=data.layers;
this.supports3d=!data.hasMask;
this.completeLayers=false;
this.pendingElements=[];
this.elements=this.layers?createSizedArray(this.layers.length):[];
this.initElement(data,globalData,comp);
this.tm=data.tm?PropertyFactory.getProp(this,data.tm,0,globalData.frameRate,this):{_placeholder:true}
}extendPrototype([HybridRendererBase,ICompElement,HBaseElement],HCompElement);
HCompElement.prototype._createBaseContainerElements=HCompElement.prototype.createContainerElements;
HCompElement.prototype.createContainerElements=function(){this._createBaseContainerElements();
if(this.data.hasMask){this.svgElement.setAttribute("width",this.data.w);
this.svgElement.setAttribute("height",this.data.h);
this.transformedElement=this.baseElement
}else{this.transformedElement=this.layerElement
}};
HCompElement.prototype.addTo3dContainer=function(elem,pos){var j=0;
var nextElement;
while(j<pos){if(this.elements[j]&&this.elements[j].getBaseElement){nextElement=this.elements[j].getBaseElement()
}j+=1
}if(nextElement){this.layerElement.insertBefore(elem,nextElement)
}else{this.layerElement.appendChild(elem)
}};
HCompElement.prototype.createComp=function(data){if(!this.supports3d){return new SVGCompElement(data,this.globalData,this)
}return new HCompElement(data,this.globalData,this)
};
function HybridRenderer(animationItem,config){this.animationItem=animationItem;
this.layers=null;
this.renderedFrame=-1;
this.renderConfig={className:config&&config.className||"",imagePreserveAspectRatio:config&&config.imagePreserveAspectRatio||"xMidYMid slice",hideOnTransparent:!(config&&config.hideOnTransparent===false),filterSize:{width:config&&config.filterSize&&config.filterSize.width||"400%",height:config&&config.filterSize&&config.filterSize.height||"400%",x:config&&config.filterSize&&config.filterSize.x||"-100%",y:config&&config.filterSize&&config.filterSize.y||"-100%"},runExpressions:!config||config.runExpressions===undefined||config.runExpressions};
this.globalData={_mdf:false,frameNum:-1,renderConfig:this.renderConfig};
this.pendingElements=[];
this.elements=[];
this.threeDElements=[];
this.destroyed=false;
this.camera=null;
this.supports3d=true;
this.rendererType="html"
}extendPrototype([HybridRendererBase],HybridRenderer);
HybridRenderer.prototype.createComp=function(data){if(!this.supports3d){return new SVGCompElement(data,this.globalData,this)
}return new HCompElement(data,this.globalData,this)
};
var CompExpressionInterface=function(){return function(comp){function _thisLayerFunction(name){var i=0;
var len=comp.layers.length;
while(i<len){if(comp.layers[i].nm===name||comp.layers[i].ind===name){return comp.elements[i].layerInterface
}i+=1
}return null
}Object.defineProperty(_thisLayerFunction,"_name",{value:comp.data.nm});
_thisLayerFunction.layer=_thisLayerFunction;
_thisLayerFunction.pixelAspect=1;
_thisLayerFunction.height=comp.data.h||comp.globalData.compSize.h;
_thisLayerFunction.width=comp.data.w||comp.globalData.compSize.w;
_thisLayerFunction.pixelAspect=1;
_thisLayerFunction.frameDuration=1/comp.globalData.frameRate;
_thisLayerFunction.displayStartTime=0;
_thisLayerFunction.numLayers=comp.layers.length;
return _thisLayerFunction
}
}();
var Expressions=function(){var ob={};
ob.initExpressions=initExpressions;
function initExpressions(animation){var stackCount=0;
var registers=[];
function pushExpression(){stackCount+=1
}function popExpression(){stackCount-=1;
if(stackCount===0){releaseInstances()
}}function registerExpressionProperty(expression){if(registers.indexOf(expression)===-1){registers.push(expression)
}}function releaseInstances(){var i;
var len=registers.length;
for(i=0;
i<len;
i+=1){registers[i].release()
}registers.length=0
}animation.renderer.compInterface=CompExpressionInterface(animation.renderer);
animation.renderer.globalData.projectInterface.registerComposition(animation.renderer);
animation.renderer.globalData.pushExpression=pushExpression;
animation.renderer.globalData.popExpression=popExpression;
animation.renderer.globalData.registerExpressionProperty=registerExpressionProperty
}return ob
}();
var MaskManagerInterface=function(){function MaskInterface(mask,data){this._mask=mask;
this._data=data
}Object.defineProperty(MaskInterface.prototype,"maskPath",{get:function get(){if(this._mask.prop.k){this._mask.prop.getValue()
}return this._mask.prop
}});
Object.defineProperty(MaskInterface.prototype,"maskOpacity",{get:function get(){if(this._mask.op.k){this._mask.op.getValue()
}return this._mask.op.v*100
}});
var MaskManager=function MaskManager(maskManager){var _masksInterfaces=createSizedArray(maskManager.viewData.length);
var i;
var len=maskManager.viewData.length;
for(i=0;
i<len;
i+=1){_masksInterfaces[i]=new MaskInterface(maskManager.viewData[i],maskManager.masksProperties[i])
}var maskFunction=function maskFunction(name){i=0;
while(i<len){if(maskManager.masksProperties[i].nm===name){return _masksInterfaces[i]
}i+=1
}return null
};
return maskFunction
};
return MaskManager
}();
var ExpressionPropertyInterface=function(){var defaultUnidimensionalValue={pv:0,v:0,mult:1};
var defaultMultidimensionalValue={pv:[0,0,0],v:[0,0,0],mult:1};
function completeProperty(expressionValue,property,type){Object.defineProperty(expressionValue,"velocity",{get:function get(){return property.getVelocityAtTime(property.comp.currentFrame)
}});
expressionValue.numKeys=property.keyframes?property.keyframes.length:0;
expressionValue.key=function(pos){if(!expressionValue.numKeys){return 0
}var value="";
if("s" in property.keyframes[pos-1]){value=property.keyframes[pos-1].s
}else{if("e" in property.keyframes[pos-2]){value=property.keyframes[pos-2].e
}else{value=property.keyframes[pos-2].s
}}var valueProp=type==="unidimensional"?new Number(value):Object.assign({},value);
valueProp.time=property.keyframes[pos-1].t/property.elem.comp.globalData.frameRate;
valueProp.value=type==="unidimensional"?value[0]:value;
return valueProp
};
expressionValue.valueAtTime=property.getValueAtTime;
expressionValue.speedAtTime=property.getSpeedAtTime;
expressionValue.velocityAtTime=property.getVelocityAtTime;
expressionValue.propertyGroup=property.propertyGroup
}function UnidimensionalPropertyInterface(property){if(!property||!("pv" in property)){property=defaultUnidimensionalValue
}var mult=1/property.mult;
var val=property.pv*mult;
var expressionValue=new Number(val);
expressionValue.value=val;
completeProperty(expressionValue,property,"unidimensional");
return function(){if(property.k){property.getValue()
}val=property.v*mult;
if(expressionValue.value!==val){expressionValue=new Number(val);
expressionValue.value=val;
completeProperty(expressionValue,property,"unidimensional")
}return expressionValue
}
}function MultidimensionalPropertyInterface(property){if(!property||!("pv" in property)){property=defaultMultidimensionalValue
}var mult=1/property.mult;
var len=property.data&&property.data.l||property.pv.length;
var expressionValue=createTypedArray("float32",len);
var arrValue=createTypedArray("float32",len);
expressionValue.value=arrValue;
completeProperty(expressionValue,property,"multidimensional");
return function(){if(property.k){property.getValue()
}for(var i=0;
i<len;
i+=1){arrValue[i]=property.v[i]*mult;
expressionValue[i]=arrValue[i]
}return expressionValue
}
}function defaultGetter(){return defaultUnidimensionalValue
}return function(property){if(!property){return defaultGetter
}if(property.propType==="unidimensional"){return UnidimensionalPropertyInterface(property)
}return MultidimensionalPropertyInterface(property)
}
}();
var TransformExpressionInterface=function(){return function(transform){function _thisFunction(name){switch(name){case"scale":case"Scale":case"ADBE Scale":case 6:return _thisFunction.scale;
case"rotation":case"Rotation":case"ADBE Rotation":case"ADBE Rotate Z":case 10:return _thisFunction.rotation;
case"ADBE Rotate X":return _thisFunction.xRotation;
case"ADBE Rotate Y":return _thisFunction.yRotation;
case"position":case"Position":case"ADBE Position":case 2:return _thisFunction.position;
case"ADBE Position_0":return _thisFunction.xPosition;
case"ADBE Position_1":return _thisFunction.yPosition;
case"ADBE Position_2":return _thisFunction.zPosition;
case"anchorPoint":case"AnchorPoint":case"Anchor Point":case"ADBE AnchorPoint":case 1:return _thisFunction.anchorPoint;
case"opacity":case"Opacity":case 11:return _thisFunction.opacity;
default:return null
}}Object.defineProperty(_thisFunction,"rotation",{get:ExpressionPropertyInterface(transform.r||transform.rz)});
Object.defineProperty(_thisFunction,"zRotation",{get:ExpressionPropertyInterface(transform.rz||transform.r)});
Object.defineProperty(_thisFunction,"xRotation",{get:ExpressionPropertyInterface(transform.rx)});
Object.defineProperty(_thisFunction,"yRotation",{get:ExpressionPropertyInterface(transform.ry)});
Object.defineProperty(_thisFunction,"scale",{get:ExpressionPropertyInterface(transform.s)});
var _px;
var _py;
var _pz;
var _transformFactory;
if(transform.p){_transformFactory=ExpressionPropertyInterface(transform.p)
}else{_px=ExpressionPropertyInterface(transform.px);
_py=ExpressionPropertyInterface(transform.py);
if(transform.pz){_pz=ExpressionPropertyInterface(transform.pz)
}}Object.defineProperty(_thisFunction,"position",{get:function get(){if(transform.p){return _transformFactory()
}return[_px(),_py(),_pz?_pz():0]
}});
Object.defineProperty(_thisFunction,"xPosition",{get:ExpressionPropertyInterface(transform.px)});
Object.defineProperty(_thisFunction,"yPosition",{get:ExpressionPropertyInterface(transform.py)});
Object.defineProperty(_thisFunction,"zPosition",{get:ExpressionPropertyInterface(transform.pz)});
Object.defineProperty(_thisFunction,"anchorPoint",{get:ExpressionPropertyInterface(transform.a)});
Object.defineProperty(_thisFunction,"opacity",{get:ExpressionPropertyInterface(transform.o)});
Object.defineProperty(_thisFunction,"skew",{get:ExpressionPropertyInterface(transform.sk)});
Object.defineProperty(_thisFunction,"skewAxis",{get:ExpressionPropertyInterface(transform.sa)});
Object.defineProperty(_thisFunction,"orientation",{get:ExpressionPropertyInterface(transform.or)});
return _thisFunction
}
}();
var LayerExpressionInterface=function(){function getMatrix(time){var toWorldMat=new Matrix();
if(time!==undefined){var propMatrix=this._elem.finalTransform.mProp.getValueAtTime(time);
propMatrix.clone(toWorldMat)
}else{var transformMat=this._elem.finalTransform.mProp;
transformMat.applyToMatrix(toWorldMat)
}return toWorldMat
}function toWorldVec(arr,time){var toWorldMat=this.getMatrix(time);
toWorldMat.props[12]=0;
toWorldMat.props[13]=0;
toWorldMat.props[14]=0;
return this.applyPoint(toWorldMat,arr)
}function toWorld(arr,time){var toWorldMat=this.getMatrix(time);
return this.applyPoint(toWorldMat,arr)
}function fromWorldVec(arr,time){var toWorldMat=this.getMatrix(time);
toWorldMat.props[12]=0;
toWorldMat.props[13]=0;
toWorldMat.props[14]=0;
return this.invertPoint(toWorldMat,arr)
}function fromWorld(arr,time){var toWorldMat=this.getMatrix(time);
return this.invertPoint(toWorldMat,arr)
}function applyPoint(matrix,arr){if(this._elem.hierarchy&&this._elem.hierarchy.length){var i;
var len=this._elem.hierarchy.length;
for(i=0;
i<len;
i+=1){this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(matrix)
}}return matrix.applyToPointArray(arr[0],arr[1],arr[2]||0)
}function invertPoint(matrix,arr){if(this._elem.hierarchy&&this._elem.hierarchy.length){var i;
var len=this._elem.hierarchy.length;
for(i=0;
i<len;
i+=1){this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(matrix)
}}return matrix.inversePoint(arr)
}function fromComp(arr){var toWorldMat=new Matrix();
toWorldMat.reset();
this._elem.finalTransform.mProp.applyToMatrix(toWorldMat);
if(this._elem.hierarchy&&this._elem.hierarchy.length){var i;
var len=this._elem.hierarchy.length;
for(i=0;
i<len;
i+=1){this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(toWorldMat)
}return toWorldMat.inversePoint(arr)
}return toWorldMat.inversePoint(arr)
}function sampleImage(){return[1,1,1,1]
}return function(elem){var transformInterface;
function _registerMaskInterface(maskManager){_thisLayerFunction.mask=new MaskManagerInterface(maskManager,elem)
}function _registerEffectsInterface(effects){_thisLayerFunction.effect=effects
}function _thisLayerFunction(name){switch(name){case"ADBE Root Vectors Group":case"Contents":case 2:return _thisLayerFunction.shapeInterface;
case 1:case 6:case"Transform":case"transform":case"ADBE Transform Group":return transformInterface;
case 4:case"ADBE Effect Parade":case"effects":case"Effects":return _thisLayerFunction.effect;
case"ADBE Text Properties":return _thisLayerFunction.textInterface;
default:return null
}}_thisLayerFunction.getMatrix=getMatrix;
_thisLayerFunction.invertPoint=invertPoint;
_thisLayerFunction.applyPoint=applyPoint;
_thisLayerFunction.toWorld=toWorld;
_thisLayerFunction.toWorldVec=toWorldVec;
_thisLayerFunction.fromWorld=fromWorld;
_thisLayerFunction.fromWorldVec=fromWorldVec;
_thisLayerFunction.toComp=toWorld;
_thisLayerFunction.fromComp=fromComp;
_thisLayerFunction.sampleImage=sampleImage;
_thisLayerFunction.sourceRectAtTime=elem.sourceRectAtTime.bind(elem);
_thisLayerFunction._elem=elem;
transformInterface=TransformExpressionInterface(elem.finalTransform.mProp);
var anchorPointDescriptor=getDescriptor(transformInterface,"anchorPoint");
Object.defineProperties(_thisLayerFunction,{hasParent:{get:function get(){return elem.hierarchy.length
}},parent:{get:function get(){return elem.hierarchy[0].layerInterface
}},rotation:getDescriptor(transformInterface,"rotation"),scale:getDescriptor(transformInterface,"scale"),position:getDescriptor(transformInterface,"position"),opacity:getDescriptor(transformInterface,"opacity"),anchorPoint:anchorPointDescriptor,anchor_point:anchorPointDescriptor,transform:{get:function get(){return transformInterface
}},active:{get:function get(){return elem.isInRange
}}});
_thisLayerFunction.startTime=elem.data.st;
_thisLayerFunction.index=elem.data.ind;
_thisLayerFunction.source=elem.data.refId;
_thisLayerFunction.height=elem.data.ty===0?elem.data.h:100;
_thisLayerFunction.width=elem.data.ty===0?elem.data.w:100;
_thisLayerFunction.inPoint=elem.data.ip/elem.comp.globalData.frameRate;
_thisLayerFunction.outPoint=elem.data.op/elem.comp.globalData.frameRate;
_thisLayerFunction._name=elem.data.nm;
_thisLayerFunction.registerMaskInterface=_registerMaskInterface;
_thisLayerFunction.registerEffectsInterface=_registerEffectsInterface;
return _thisLayerFunction
}
}();
var propertyGroupFactory=function(){return function(interfaceFunction,parentPropertyGroup){return function(val){val=val===undefined?1:val;
if(val<=0){return interfaceFunction
}return parentPropertyGroup(val-1)
}
}
}();
var PropertyInterface=function(){return function(propertyName,propertyGroup){var interfaceFunction={_name:propertyName};
function _propertyGroup(val){val=val===undefined?1:val;
if(val<=0){return interfaceFunction
}return propertyGroup(val-1)
}return _propertyGroup
}
}();
var EffectsExpressionInterface=function(){var ob={createEffectsInterface:createEffectsInterface};
function createEffectsInterface(elem,propertyGroup){if(elem.effectsManager){var effectElements=[];
var effectsData=elem.data.ef;
var i;
var len=elem.effectsManager.effectElements.length;
for(i=0;
i<len;
i+=1){effectElements.push(createGroupInterface(effectsData[i],elem.effectsManager.effectElements[i],propertyGroup,elem))
}var effects=elem.data.ef||[];
var groupInterface=function groupInterface(name){i=0;
len=effects.length;
while(i<len){if(name===effects[i].nm||name===effects[i].mn||name===effects[i].ix){return effectElements[i]
}i+=1
}return null
};
Object.defineProperty(groupInterface,"numProperties",{get:function get(){return effects.length
}});
return groupInterface
}return null
}function createGroupInterface(data,elements,propertyGroup,elem){function groupInterface(name){var effects=data.ef;
var i=0;
var len=effects.length;
while(i<len){if(name===effects[i].nm||name===effects[i].mn||name===effects[i].ix){if(effects[i].ty===5){return effectElements[i]
}return effectElements[i]()
}i+=1
}throw new Error()
}var _propertyGroup=propertyGroupFactory(groupInterface,propertyGroup);
var effectElements=[];
var i;
var len=data.ef.length;
for(i=0;
i<len;
i+=1){if(data.ef[i].ty===5){effectElements.push(createGroupInterface(data.ef[i],elements.effectElements[i],elements.effectElements[i].propertyGroup,elem))
}else{effectElements.push(createValueInterface(elements.effectElements[i],data.ef[i].ty,elem,_propertyGroup))
}}if(data.mn==="ADBE Color Control"){Object.defineProperty(groupInterface,"color",{get:function get(){return effectElements[0]()
}})
}Object.defineProperties(groupInterface,{numProperties:{get:function get(){return data.np
}},_name:{value:data.nm},propertyGroup:{value:_propertyGroup}});
groupInterface.enabled=data.en!==0;
groupInterface.active=groupInterface.enabled;
return groupInterface
}function createValueInterface(element,type,elem,propertyGroup){var expressionProperty=ExpressionPropertyInterface(element.p);
function interfaceFunction(){if(type===10){return elem.comp.compInterface(element.p.v)
}return expressionProperty()
}if(element.p.setGroupProperty){element.p.setGroupProperty(PropertyInterface("",propertyGroup))
}return interfaceFunction
}return ob
}();
var ShapePathInterface=function(){return function pathInterfaceFactory(shape,view,propertyGroup){var prop=view.sh;
function interfaceFunction(val){if(val==="Shape"||val==="shape"||val==="Path"||val==="path"||val==="ADBE Vector Shape"||val===2){return interfaceFunction.path
}return null
}var _propertyGroup=propertyGroupFactory(interfaceFunction,propertyGroup);
prop.setGroupProperty(PropertyInterface("Path",_propertyGroup));
Object.defineProperties(interfaceFunction,{path:{get:function get(){if(prop.k){prop.getValue()
}return prop
}},shape:{get:function get(){if(prop.k){prop.getValue()
}return prop
}},_name:{value:shape.nm},ix:{value:shape.ix},propertyIndex:{value:shape.ix},mn:{value:shape.mn},propertyGroup:{value:propertyGroup}});
return interfaceFunction
}
}();
var ShapeExpressionInterface=function(){function iterateElements(shapes,view,propertyGroup){var arr=[];
var i;
var len=shapes?shapes.length:0;
for(i=0;
i<len;
i+=1){if(shapes[i].ty==="gr"){arr.push(groupInterfaceFactory(shapes[i],view[i],propertyGroup))
}else{if(shapes[i].ty==="fl"){arr.push(fillInterfaceFactory(shapes[i],view[i],propertyGroup))
}else{if(shapes[i].ty==="st"){arr.push(strokeInterfaceFactory(shapes[i],view[i],propertyGroup))
}else{if(shapes[i].ty==="tm"){arr.push(trimInterfaceFactory(shapes[i],view[i],propertyGroup))
}else{if(shapes[i].ty==="tr"){}else{if(shapes[i].ty==="el"){arr.push(ellipseInterfaceFactory(shapes[i],view[i],propertyGroup))
}else{if(shapes[i].ty==="sr"){arr.push(starInterfaceFactory(shapes[i],view[i],propertyGroup))
}else{if(shapes[i].ty==="sh"){arr.push(ShapePathInterface(shapes[i],view[i],propertyGroup))
}else{if(shapes[i].ty==="rc"){arr.push(rectInterfaceFactory(shapes[i],view[i],propertyGroup))
}else{if(shapes[i].ty==="rd"){arr.push(roundedInterfaceFactory(shapes[i],view[i],propertyGroup))
}else{if(shapes[i].ty==="rp"){arr.push(repeaterInterfaceFactory(shapes[i],view[i],propertyGroup))
}else{if(shapes[i].ty==="gf"){arr.push(gradientFillInterfaceFactory(shapes[i],view[i],propertyGroup))
}else{arr.push(defaultInterfaceFactory(shapes[i],view[i],propertyGroup))
}}}}}}}}}}}}}return arr
}function contentsInterfaceFactory(shape,view,propertyGroup){var interfaces;
var interfaceFunction=function _interfaceFunction(value){var i=0;
var len=interfaces.length;
while(i<len){if(interfaces[i]._name===value||interfaces[i].mn===value||interfaces[i].propertyIndex===value||interfaces[i].ix===value||interfaces[i].ind===value){return interfaces[i]
}i+=1
}if(typeof value==="number"){return interfaces[value-1]
}return null
};
interfaceFunction.propertyGroup=propertyGroupFactory(interfaceFunction,propertyGroup);
interfaces=iterateElements(shape.it,view.it,interfaceFunction.propertyGroup);
interfaceFunction.numProperties=interfaces.length;
var transformInterface=transformInterfaceFactory(shape.it[shape.it.length-1],view.it[view.it.length-1],interfaceFunction.propertyGroup);
interfaceFunction.transform=transformInterface;
interfaceFunction.propertyIndex=shape.cix;
interfaceFunction._name=shape.nm;
return interfaceFunction
}function groupInterfaceFactory(shape,view,propertyGroup){var interfaceFunction=function _interfaceFunction(value){switch(value){case"ADBE Vectors Group":case"Contents":case 2:return interfaceFunction.content;
default:return interfaceFunction.transform
}};
interfaceFunction.propertyGroup=propertyGroupFactory(interfaceFunction,propertyGroup);
var content=contentsInterfaceFactory(shape,view,interfaceFunction.propertyGroup);
var transformInterface=transformInterfaceFactory(shape.it[shape.it.length-1],view.it[view.it.length-1],interfaceFunction.propertyGroup);
interfaceFunction.content=content;
interfaceFunction.transform=transformInterface;
Object.defineProperty(interfaceFunction,"_name",{get:function get(){return shape.nm
}});
interfaceFunction.numProperties=shape.np;
interfaceFunction.propertyIndex=shape.ix;
interfaceFunction.nm=shape.nm;
interfaceFunction.mn=shape.mn;
return interfaceFunction
}function fillInterfaceFactory(shape,view,propertyGroup){function interfaceFunction(val){if(val==="Color"||val==="color"){return interfaceFunction.color
}if(val==="Opacity"||val==="opacity"){return interfaceFunction.opacity
}return null
}Object.defineProperties(interfaceFunction,{color:{get:ExpressionPropertyInterface(view.c)},opacity:{get:ExpressionPropertyInterface(view.o)},_name:{value:shape.nm},mn:{value:shape.mn}});
view.c.setGroupProperty(PropertyInterface("Color",propertyGroup));
view.o.setGroupProperty(PropertyInterface("Opacity",propertyGroup));
return interfaceFunction
}function gradientFillInterfaceFactory(shape,view,propertyGroup){function interfaceFunction(val){if(val==="Start Point"||val==="start point"){return interfaceFunction.startPoint
}if(val==="End Point"||val==="end point"){return interfaceFunction.endPoint
}if(val==="Opacity"||val==="opacity"){return interfaceFunction.opacity
}return null
}Object.defineProperties(interfaceFunction,{startPoint:{get:ExpressionPropertyInterface(view.s)},endPoint:{get:ExpressionPropertyInterface(view.e)},opacity:{get:ExpressionPropertyInterface(view.o)},type:{get:function get(){return"a"
}},_name:{value:shape.nm},mn:{value:shape.mn}});
view.s.setGroupProperty(PropertyInterface("Start Point",propertyGroup));
view.e.setGroupProperty(PropertyInterface("End Point",propertyGroup));
view.o.setGroupProperty(PropertyInterface("Opacity",propertyGroup));
return interfaceFunction
}function defaultInterfaceFactory(){function interfaceFunction(){return null
}return interfaceFunction
}function strokeInterfaceFactory(shape,view,propertyGroup){var _propertyGroup=propertyGroupFactory(interfaceFunction,propertyGroup);
var _dashPropertyGroup=propertyGroupFactory(dashOb,_propertyGroup);
function addPropertyToDashOb(i){Object.defineProperty(dashOb,shape.d[i].nm,{get:ExpressionPropertyInterface(view.d.dataProps[i].p)})
}var i;
var len=shape.d?shape.d.length:0;
var dashOb={};
for(i=0;
i<len;
i+=1){addPropertyToDashOb(i);
view.d.dataProps[i].p.setGroupProperty(_dashPropertyGroup)
}function interfaceFunction(val){if(val==="Color"||val==="color"){return interfaceFunction.color
}if(val==="Opacity"||val==="opacity"){return interfaceFunction.opacity
}if(val==="Stroke Width"||val==="stroke width"){return interfaceFunction.strokeWidth
}return null
}Object.defineProperties(interfaceFunction,{color:{get:ExpressionPropertyInterface(view.c)},opacity:{get:ExpressionPropertyInterface(view.o)},strokeWidth:{get:ExpressionPropertyInterface(view.w)},dash:{get:function get(){return dashOb
}},_name:{value:shape.nm},mn:{value:shape.mn}});
view.c.setGroupProperty(PropertyInterface("Color",_propertyGroup));
view.o.setGroupProperty(PropertyInterface("Opacity",_propertyGroup));
view.w.setGroupProperty(PropertyInterface("Stroke Width",_propertyGroup));
return interfaceFunction
}function trimInterfaceFactory(shape,view,propertyGroup){function interfaceFunction(val){if(val===shape.e.ix||val==="End"||val==="end"){return interfaceFunction.end
}if(val===shape.s.ix){return interfaceFunction.start
}if(val===shape.o.ix){return interfaceFunction.offset
}return null
}var _propertyGroup=propertyGroupFactory(interfaceFunction,propertyGroup);
interfaceFunction.propertyIndex=shape.ix;
view.s.setGroupProperty(PropertyInterface("Start",_propertyGroup));
view.e.setGroupProperty(PropertyInterface("End",_propertyGroup));
view.o.setGroupProperty(PropertyInterface("Offset",_propertyGroup));
interfaceFunction.propertyIndex=shape.ix;
interfaceFunction.propertyGroup=propertyGroup;
Object.defineProperties(interfaceFunction,{start:{get:ExpressionPropertyInterface(view.s)},end:{get:ExpressionPropertyInterface(view.e)},offset:{get:ExpressionPropertyInterface(view.o)},_name:{value:shape.nm}});
interfaceFunction.mn=shape.mn;
return interfaceFunction
}function transformInterfaceFactory(shape,view,propertyGroup){function interfaceFunction(value){if(shape.a.ix===value||value==="Anchor Point"){return interfaceFunction.anchorPoint
}if(shape.o.ix===value||value==="Opacity"){return interfaceFunction.opacity
}if(shape.p.ix===value||value==="Position"){return interfaceFunction.position
}if(shape.r.ix===value||value==="Rotation"||value==="ADBE Vector Rotation"){return interfaceFunction.rotation
}if(shape.s.ix===value||value==="Scale"){return interfaceFunction.scale
}if(shape.sk&&shape.sk.ix===value||value==="Skew"){return interfaceFunction.skew
}if(shape.sa&&shape.sa.ix===value||value==="Skew Axis"){return interfaceFunction.skewAxis
}return null
}var _propertyGroup=propertyGroupFactory(interfaceFunction,propertyGroup);
view.transform.mProps.o.setGroupProperty(PropertyInterface("Opacity",_propertyGroup));
view.transform.mProps.p.setGroupProperty(PropertyInterface("Position",_propertyGroup));
view.transform.mProps.a.setGroupProperty(PropertyInterface("Anchor Point",_propertyGroup));
view.transform.mProps.s.setGroupProperty(PropertyInterface("Scale",_propertyGroup));
view.transform.mProps.r.setGroupProperty(PropertyInterface("Rotation",_propertyGroup));
if(view.transform.mProps.sk){view.transform.mProps.sk.setGroupProperty(PropertyInterface("Skew",_propertyGroup));
view.transform.mProps.sa.setGroupProperty(PropertyInterface("Skew Angle",_propertyGroup))
}view.transform.op.setGroupProperty(PropertyInterface("Opacity",_propertyGroup));
Object.defineProperties(interfaceFunction,{opacity:{get:ExpressionPropertyInterface(view.transform.mProps.o)},position:{get:ExpressionPropertyInterface(view.transform.mProps.p)},anchorPoint:{get:ExpressionPropertyInterface(view.transform.mProps.a)},scale:{get:ExpressionPropertyInterface(view.transform.mProps.s)},rotation:{get:ExpressionPropertyInterface(view.transform.mProps.r)},skew:{get:ExpressionPropertyInterface(view.transform.mProps.sk)},skewAxis:{get:ExpressionPropertyInterface(view.transform.mProps.sa)},_name:{value:shape.nm}});
interfaceFunction.ty="tr";
interfaceFunction.mn=shape.mn;
interfaceFunction.propertyGroup=propertyGroup;
return interfaceFunction
}function ellipseInterfaceFactory(shape,view,propertyGroup){function interfaceFunction(value){if(shape.p.ix===value){return interfaceFunction.position
}if(shape.s.ix===value){return interfaceFunction.size
}return null
}var _propertyGroup=propertyGroupFactory(interfaceFunction,propertyGroup);
interfaceFunction.propertyIndex=shape.ix;
var prop=view.sh.ty==="tm"?view.sh.prop:view.sh;
prop.s.setGroupProperty(PropertyInterface("Size",_propertyGroup));
prop.p.setGroupProperty(PropertyInterface("Position",_propertyGroup));
Object.defineProperties(interfaceFunction,{size:{get:ExpressionPropertyInterface(prop.s)},position:{get:ExpressionPropertyInterface(prop.p)},_name:{value:shape.nm}});
interfaceFunction.mn=shape.mn;
return interfaceFunction
}function starInterfaceFactory(shape,view,propertyGroup){function interfaceFunction(value){if(shape.p.ix===value){return interfaceFunction.position
}if(shape.r.ix===value){return interfaceFunction.rotation
}if(shape.pt.ix===value){return interfaceFunction.points
}if(shape.or.ix===value||value==="ADBE Vector Star Outer Radius"){return interfaceFunction.outerRadius
}if(shape.os.ix===value){return interfaceFunction.outerRoundness
}if(shape.ir&&(shape.ir.ix===value||value==="ADBE Vector Star Inner Radius")){return interfaceFunction.innerRadius
}if(shape.is&&shape.is.ix===value){return interfaceFunction.innerRoundness
}return null
}var _propertyGroup=propertyGroupFactory(interfaceFunction,propertyGroup);
var prop=view.sh.ty==="tm"?view.sh.prop:view.sh;
interfaceFunction.propertyIndex=shape.ix;
prop.or.setGroupProperty(PropertyInterface("Outer Radius",_propertyGroup));
prop.os.setGroupProperty(PropertyInterface("Outer Roundness",_propertyGroup));
prop.pt.setGroupProperty(PropertyInterface("Points",_propertyGroup));
prop.p.setGroupProperty(PropertyInterface("Position",_propertyGroup));
prop.r.setGroupProperty(PropertyInterface("Rotation",_propertyGroup));
if(shape.ir){prop.ir.setGroupProperty(PropertyInterface("Inner Radius",_propertyGroup));
prop.is.setGroupProperty(PropertyInterface("Inner Roundness",_propertyGroup))
}Object.defineProperties(interfaceFunction,{position:{get:ExpressionPropertyInterface(prop.p)},rotation:{get:ExpressionPropertyInterface(prop.r)},points:{get:ExpressionPropertyInterface(prop.pt)},outerRadius:{get:ExpressionPropertyInterface(prop.or)},outerRoundness:{get:ExpressionPropertyInterface(prop.os)},innerRadius:{get:ExpressionPropertyInterface(prop.ir)},innerRoundness:{get:ExpressionPropertyInterface(prop.is)},_name:{value:shape.nm}});
interfaceFunction.mn=shape.mn;
return interfaceFunction
}function rectInterfaceFactory(shape,view,propertyGroup){function interfaceFunction(value){if(shape.p.ix===value){return interfaceFunction.position
}if(shape.r.ix===value){return interfaceFunction.roundness
}if(shape.s.ix===value||value==="Size"||value==="ADBE Vector Rect Size"){return interfaceFunction.size
}return null
}var _propertyGroup=propertyGroupFactory(interfaceFunction,propertyGroup);
var prop=view.sh.ty==="tm"?view.sh.prop:view.sh;
interfaceFunction.propertyIndex=shape.ix;
prop.p.setGroupProperty(PropertyInterface("Position",_propertyGroup));
prop.s.setGroupProperty(PropertyInterface("Size",_propertyGroup));
prop.r.setGroupProperty(PropertyInterface("Rotation",_propertyGroup));
Object.defineProperties(interfaceFunction,{position:{get:ExpressionPropertyInterface(prop.p)},roundness:{get:ExpressionPropertyInterface(prop.r)},size:{get:ExpressionPropertyInterface(prop.s)},_name:{value:shape.nm}});
interfaceFunction.mn=shape.mn;
return interfaceFunction
}function roundedInterfaceFactory(shape,view,propertyGroup){function interfaceFunction(value){if(shape.r.ix===value||value==="Round Corners 1"){return interfaceFunction.radius
}return null
}var _propertyGroup=propertyGroupFactory(interfaceFunction,propertyGroup);
var prop=view;
interfaceFunction.propertyIndex=shape.ix;
prop.rd.setGroupProperty(PropertyInterface("Radius",_propertyGroup));
Object.defineProperties(interfaceFunction,{radius:{get:ExpressionPropertyInterface(prop.rd)},_name:{value:shape.nm}});
interfaceFunction.mn=shape.mn;
return interfaceFunction
}function repeaterInterfaceFactory(shape,view,propertyGroup){function interfaceFunction(value){if(shape.c.ix===value||value==="Copies"){return interfaceFunction.copies
}if(shape.o.ix===value||value==="Offset"){return interfaceFunction.offset
}return null
}var _propertyGroup=propertyGroupFactory(interfaceFunction,propertyGroup);
var prop=view;
interfaceFunction.propertyIndex=shape.ix;
prop.c.setGroupProperty(PropertyInterface("Copies",_propertyGroup));
prop.o.setGroupProperty(PropertyInterface("Offset",_propertyGroup));
Object.defineProperties(interfaceFunction,{copies:{get:ExpressionPropertyInterface(prop.c)},offset:{get:ExpressionPropertyInterface(prop.o)},_name:{value:shape.nm}});
interfaceFunction.mn=shape.mn;
return interfaceFunction
}return function(shapes,view,propertyGroup){var interfaces;
function _interfaceFunction(value){if(typeof value==="number"){value=value===undefined?1:value;
if(value===0){return propertyGroup
}return interfaces[value-1]
}var i=0;
var len=interfaces.length;
while(i<len){if(interfaces[i]._name===value){return interfaces[i]
}i+=1
}return null
}function parentGroupWrapper(){return propertyGroup
}_interfaceFunction.propertyGroup=propertyGroupFactory(_interfaceFunction,parentGroupWrapper);
interfaces=iterateElements(shapes,view,_interfaceFunction.propertyGroup);
_interfaceFunction.numProperties=interfaces.length;
_interfaceFunction._name="Contents";
return _interfaceFunction
}
}();
var TextExpressionInterface=function(){return function(elem){var _sourceText;
function _thisLayerFunction(name){switch(name){case"ADBE Text Document":return _thisLayerFunction.sourceText;
default:return null
}}Object.defineProperty(_thisLayerFunction,"sourceText",{get:function get(){elem.textProperty.getValue();
var stringValue=elem.textProperty.currentData.t;
if(!_sourceText||stringValue!==_sourceText.value){_sourceText=new String(stringValue);
_sourceText.value=stringValue||new String(stringValue);
Object.defineProperty(_sourceText,"style",{get:function get(){return{fillColor:elem.textProperty.currentData.fc}
}})
}return _sourceText
}});
return _thisLayerFunction
}
}();
function _typeof$2(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof$2=function _typeof(obj){return typeof obj
}
}else{_typeof$2=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj
}
}return _typeof$2(obj)
}var FootageInterface=function(){var outlineInterfaceFactory=function outlineInterfaceFactory(elem){var currentPropertyName="";
var currentProperty=elem.getFootageData();
function init(){currentPropertyName="";
currentProperty=elem.getFootageData();
return searchProperty
}function searchProperty(value){if(currentProperty[value]){currentPropertyName=value;
currentProperty=currentProperty[value];
if(_typeof$2(currentProperty)==="object"){return searchProperty
}return currentProperty
}var propertyNameIndex=value.indexOf(currentPropertyName);
if(propertyNameIndex!==-1){var index=parseInt(value.substr(propertyNameIndex+currentPropertyName.length),10);
currentProperty=currentProperty[index];
if(_typeof$2(currentProperty)==="object"){return searchProperty
}return currentProperty
}return""
}return init
};
var dataInterfaceFactory=function dataInterfaceFactory(elem){function interfaceFunction(value){if(value==="Outline"){return interfaceFunction.outlineInterface()
}return null
}interfaceFunction._name="Outline";
interfaceFunction.outlineInterface=outlineInterfaceFactory(elem);
return interfaceFunction
};
return function(elem){function _interfaceFunction(value){if(value==="Data"){return _interfaceFunction.dataInterface
}return null
}_interfaceFunction._name="Data";
_interfaceFunction.dataInterface=dataInterfaceFactory(elem);
return _interfaceFunction
}
}();
var interfaces={layer:LayerExpressionInterface,effects:EffectsExpressionInterface,comp:CompExpressionInterface,shape:ShapeExpressionInterface,text:TextExpressionInterface,footage:FootageInterface};
function getInterface(type){return interfaces[type]||null
}function _typeof$1(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof$1=function _typeof(obj){return typeof obj
}
}else{_typeof$1=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj
}
}return _typeof$1(obj)
}function seedRandom(pool,math){var global=this,width=256,chunks=6,digits=52,rngname="random",startdenom=math.pow(width,chunks),significance=math.pow(2,digits),overflow=significance*2,mask=width-1,nodecrypto;
function seedrandom(seed,options,callback){var key=[];
options=options===true?{entropy:true}:options||{};
var shortseed=mixkey(flatten(options.entropy?[seed,tostring(pool)]:seed===null?autoseed():seed,3),key);
var arc4=new ARC4(key);
var prng=function prng(){var n=arc4.g(chunks),d=startdenom,x=0;
while(n<significance){n=(n+x)*width;
d*=width;
x=arc4.g(1)
}while(n>=overflow){n/=2;
d/=2;
x>>>=1
}return(n+x)/d
};
prng.int32=function(){return arc4.g(4)|0
};
prng.quick=function(){return arc4.g(4)/4294967296
};
prng["double"]=prng;
mixkey(tostring(arc4.S),pool);
return(options.pass||callback||function(prng,seed,is_math_call,state){if(state){if(state.S){copy(state,arc4)
}prng.state=function(){return copy(arc4,{})
}
}if(is_math_call){math[rngname]=prng;
return seed
}else{return prng
}})(prng,shortseed,"global" in options?options.global:this==math,options.state)
}math["seed"+rngname]=seedrandom;
function ARC4(key){var t,keylen=key.length,me=this,i=0,j=me.i=me.j=0,s=me.S=[];
if(!keylen){key=[keylen++]
}while(i<width){s[i]=i++
}for(i=0;
i<width;
i++){s[i]=s[j=mask&j+key[i%keylen]+(t=s[i])];
s[j]=t
}me.g=function(count){var t,r=0,i=me.i,j=me.j,s=me.S;
while(count--){t=s[i=mask&i+1];
r=r*width+s[mask&(s[i]=s[j=mask&j+t])+(s[j]=t)]
}me.i=i;
me.j=j;
return r
}
}function copy(f,t){t.i=f.i;
t.j=f.j;
t.S=f.S.slice();
return t
}function flatten(obj,depth){var result=[],typ=_typeof$1(obj),prop;
if(depth&&typ=="object"){for(prop in obj){try{result.push(flatten(obj[prop],depth-1))
}catch(e){}}}return result.length?result:typ=="string"?obj:obj+"\0"
}function mixkey(seed,key){var stringseed=seed+"",smear,j=0;
while(j<stringseed.length){key[mask&j]=mask&(smear^=key[mask&j]*19)+stringseed.charCodeAt(j++)
}return tostring(key)
}function autoseed(){try{if(nodecrypto){return tostring(nodecrypto.randomBytes(width))
}var out=new Uint8Array(width);
(global.crypto||global.msCrypto).getRandomValues(out);
return tostring(out)
}catch(e){var browser=global.navigator,plugins=browser&&browser.plugins;
return[+new Date(),global,plugins,global.screen,tostring(pool)]
}}function tostring(a){return String.fromCharCode.apply(0,a)
}mixkey(math.random(),pool)
}function initialize$2(BMMath){seedRandom([],BMMath)
}var propTypes={SHAPE:"shape"};
function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj
}
}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj
}
}return _typeof(obj)
}var ExpressionManager=function(){var ob={};
var Math=BMMath;
var window=null;
var document=null;
var XMLHttpRequest=null;
var fetch=null;
var frames=null;
initialize$2(BMMath);
function $bm_isInstanceOfArray(arr){return arr.constructor===Array||arr.constructor===Float32Array
}function isNumerable(tOfV,v){return tOfV==="number"||tOfV==="boolean"||tOfV==="string"||v instanceof Number
}function $bm_neg(a){var tOfA=_typeof(a);
if(tOfA==="number"||tOfA==="boolean"||a instanceof Number){return -a
}if($bm_isInstanceOfArray(a)){var i;
var lenA=a.length;
var retArr=[];
for(i=0;
i<lenA;
i+=1){retArr[i]=-a[i]
}return retArr
}if(a.propType){return a.v
}return -a
}var easeInBez=BezierFactory.getBezierEasing(0.333,0,0.833,0.833,"easeIn").get;
var easeOutBez=BezierFactory.getBezierEasing(0.167,0.167,0.667,1,"easeOut").get;
var easeInOutBez=BezierFactory.getBezierEasing(0.33,0,0.667,1,"easeInOut").get;
function sum(a,b){var tOfA=_typeof(a);
var tOfB=_typeof(b);
if(tOfA==="string"||tOfB==="string"){return a+b
}if(isNumerable(tOfA,a)&&isNumerable(tOfB,b)){return a+b
}if($bm_isInstanceOfArray(a)&&isNumerable(tOfB,b)){a=a.slice(0);
a[0]+=b;
return a
}if(isNumerable(tOfA,a)&&$bm_isInstanceOfArray(b)){b=b.slice(0);
b[0]=a+b[0];
return b
}if($bm_isInstanceOfArray(a)&&$bm_isInstanceOfArray(b)){var i=0;
var lenA=a.length;
var lenB=b.length;
var retArr=[];
while(i<lenA||i<lenB){if((typeof a[i]==="number"||a[i] instanceof Number)&&(typeof b[i]==="number"||b[i] instanceof Number)){retArr[i]=a[i]+b[i]
}else{retArr[i]=b[i]===undefined?a[i]:a[i]||b[i]
}i+=1
}return retArr
}return 0
}var add=sum;
function sub(a,b){var tOfA=_typeof(a);
var tOfB=_typeof(b);
if(isNumerable(tOfA,a)&&isNumerable(tOfB,b)){if(tOfA==="string"){a=parseInt(a,10)
}if(tOfB==="string"){b=parseInt(b,10)
}return a-b
}if($bm_isInstanceOfArray(a)&&isNumerable(tOfB,b)){a=a.slice(0);
a[0]-=b;
return a
}if(isNumerable(tOfA,a)&&$bm_isInstanceOfArray(b)){b=b.slice(0);
b[0]=a-b[0];
return b
}if($bm_isInstanceOfArray(a)&&$bm_isInstanceOfArray(b)){var i=0;
var lenA=a.length;
var lenB=b.length;
var retArr=[];
while(i<lenA||i<lenB){if((typeof a[i]==="number"||a[i] instanceof Number)&&(typeof b[i]==="number"||b[i] instanceof Number)){retArr[i]=a[i]-b[i]
}else{retArr[i]=b[i]===undefined?a[i]:a[i]||b[i]
}i+=1
}return retArr
}return 0
}function mul(a,b){var tOfA=_typeof(a);
var tOfB=_typeof(b);
var arr;
if(isNumerable(tOfA,a)&&isNumerable(tOfB,b)){return a*b
}var i;
var len;
if($bm_isInstanceOfArray(a)&&isNumerable(tOfB,b)){len=a.length;
arr=createTypedArray("float32",len);
for(i=0;
i<len;
i+=1){arr[i]=a[i]*b
}return arr
}if(isNumerable(tOfA,a)&&$bm_isInstanceOfArray(b)){len=b.length;
arr=createTypedArray("float32",len);
for(i=0;
i<len;
i+=1){arr[i]=a*b[i]
}return arr
}return 0
}function div(a,b){var tOfA=_typeof(a);
var tOfB=_typeof(b);
var arr;
if(isNumerable(tOfA,a)&&isNumerable(tOfB,b)){return a/b
}var i;
var len;
if($bm_isInstanceOfArray(a)&&isNumerable(tOfB,b)){len=a.length;
arr=createTypedArray("float32",len);
for(i=0;
i<len;
i+=1){arr[i]=a[i]/b
}return arr
}if(isNumerable(tOfA,a)&&$bm_isInstanceOfArray(b)){len=b.length;
arr=createTypedArray("float32",len);
for(i=0;
i<len;
i+=1){arr[i]=a/b[i]
}return arr
}return 0
}function mod(a,b){if(typeof a==="string"){a=parseInt(a,10)
}if(typeof b==="string"){b=parseInt(b,10)
}return a%b
}var $bm_sum=sum;
var $bm_sub=sub;
var $bm_mul=mul;
var $bm_div=div;
var $bm_mod=mod;
function clamp(num,min,max){if(min>max){var mm=max;
max=min;
min=mm
}return Math.min(Math.max(num,min),max)
}function radiansToDegrees(val){return val/degToRads
}var radians_to_degrees=radiansToDegrees;
function degreesToRadians(val){return val*degToRads
}var degrees_to_radians=radiansToDegrees;
var helperLengthArray=[0,0,0,0,0,0];
function length(arr1,arr2){if(typeof arr1==="number"||arr1 instanceof Number){arr2=arr2||0;
return Math.abs(arr1-arr2)
}if(!arr2){arr2=helperLengthArray
}var i;
var len=Math.min(arr1.length,arr2.length);
var addedLength=0;
for(i=0;
i<len;
i+=1){addedLength+=Math.pow(arr2[i]-arr1[i],2)
}return Math.sqrt(addedLength)
}function normalize(vec){return div(vec,length(vec))
}function rgbToHsl(val){var r=val[0];
var g=val[1];
var b=val[2];
var max=Math.max(r,g,b);
var min=Math.min(r,g,b);
var h;
var s;
var l=(max+min)/2;
if(max===min){h=0;
s=0
}else{var d=max-min;
s=l>0.5?d/(2-max-min):d/(max+min);
switch(max){case r:h=(g-b)/d+(g<b?6:0);
break;
case g:h=(b-r)/d+2;
break;
case b:h=(r-g)/d+4;
break;
default:break
}h/=6
}return[h,s,l,val[3]]
}function hue2rgb(p,q,t){if(t<0){t+=1
}if(t>1){t-=1
}if(t<1/6){return p+(q-p)*6*t
}if(t<1/2){return q
}if(t<2/3){return p+(q-p)*(2/3-t)*6
}return p
}function hslToRgb(val){var h=val[0];
var s=val[1];
var l=val[2];
var r;
var g;
var b;
if(s===0){r=l;
b=l;
g=l
}else{var q=l<0.5?l*(1+s):l+s-l*s;
var p=2*l-q;
r=hue2rgb(p,q,h+1/3);
g=hue2rgb(p,q,h);
b=hue2rgb(p,q,h-1/3)
}return[r,g,b,val[3]]
}function linear(t,tMin,tMax,value1,value2){if(value1===undefined||value2===undefined){value1=tMin;
value2=tMax;
tMin=0;
tMax=1
}if(tMax<tMin){var _tMin=tMax;
tMax=tMin;
tMin=_tMin
}if(t<=tMin){return value1
}if(t>=tMax){return value2
}var perc=tMax===tMin?0:(t-tMin)/(tMax-tMin);
if(!value1.length){return value1+(value2-value1)*perc
}var i;
var len=value1.length;
var arr=createTypedArray("float32",len);
for(i=0;
i<len;
i+=1){arr[i]=value1[i]+(value2[i]-value1[i])*perc
}return arr
}function random(min,max){if(max===undefined){if(min===undefined){min=0;
max=1
}else{max=min;
min=undefined
}}if(max.length){var i;
var len=max.length;
if(!min){min=createTypedArray("float32",len)
}var arr=createTypedArray("float32",len);
var rnd=BMMath.random();
for(i=0;
i<len;
i+=1){arr[i]=min[i]+rnd*(max[i]-min[i])
}return arr
}if(min===undefined){min=0
}var rndm=BMMath.random();
return min+rndm*(max-min)
}function createPath(points,inTangents,outTangents,closed){var i;
var len=points.length;
var path=shapePool.newElement();
path.setPathData(!!closed,len);
var arrPlaceholder=[0,0];
var inVertexPoint;
var outVertexPoint;
for(i=0;
i<len;
i+=1){inVertexPoint=inTangents&&inTangents[i]?inTangents[i]:arrPlaceholder;
outVertexPoint=outTangents&&outTangents[i]?outTangents[i]:arrPlaceholder;
path.setTripleAt(points[i][0],points[i][1],outVertexPoint[0]+points[i][0],outVertexPoint[1]+points[i][1],inVertexPoint[0]+points[i][0],inVertexPoint[1]+points[i][1],i,true)
}return path
}function initiateExpression(elem,data,property){function noOp(_value){return _value
}if(!elem.globalData.renderConfig.runExpressions){return noOp
}var val=data.x;
var needsVelocity=/velocity(?![\w\d])/.test(val);
var _needsRandom=val.indexOf("random")!==-1;
var elemType=elem.data.ty;
var transform;
var $bm_transform;
var content;
var effect;
var thisProperty=property;
thisProperty.valueAtTime=thisProperty.getValueAtTime;
Object.defineProperty(thisProperty,"value",{get:function get(){return thisProperty.v
}});
elem.comp.frameDuration=1/elem.comp.globalData.frameRate;
elem.comp.displayStartTime=0;
var inPoint=elem.data.ip/elem.comp.globalData.frameRate;
var outPoint=elem.data.op/elem.comp.globalData.frameRate;
var width=elem.data.sw?elem.data.sw:0;
var height=elem.data.sh?elem.data.sh:0;
var name=elem.data.nm;
var loopIn;
var loop_in;
var loopOut;
var loop_out;
var smooth;
var toWorld;
var fromWorld;
var fromComp;
var toComp;
var fromCompToSurface;
var position;
var rotation;
var anchorPoint;
var scale;
var thisLayer;
var thisComp;
var mask;
var valueAtTime;
var velocityAtTime;
var scoped_bm_rt;
var expression_function=eval("[function _expression_function(){"+val+";scoped_bm_rt=$bm_rt}]")[0];
var numKeys=property.kf?data.k.length:0;
var active=!this.data||this.data.hd!==true;
var wiggle=function wiggle(freq,amp){var iWiggle;
var j;
var lenWiggle=this.pv.length?this.pv.length:1;
var addedAmps=createTypedArray("float32",lenWiggle);
freq=5;
var iterations=Math.floor(time*freq);
iWiggle=0;
j=0;
while(iWiggle<iterations){for(j=0;
j<lenWiggle;
j+=1){addedAmps[j]+=-amp+amp*2*BMMath.random()
}iWiggle+=1
}var periods=time*freq;
var perc=periods-Math.floor(periods);
var arr=createTypedArray("float32",lenWiggle);
if(lenWiggle>1){for(j=0;
j<lenWiggle;
j+=1){arr[j]=this.pv[j]+addedAmps[j]+(-amp+amp*2*BMMath.random())*perc
}return arr
}return this.pv+addedAmps[0]+(-amp+amp*2*BMMath.random())*perc
}.bind(this);
if(thisProperty.loopIn){loopIn=thisProperty.loopIn.bind(thisProperty);
loop_in=loopIn
}if(thisProperty.loopOut){loopOut=thisProperty.loopOut.bind(thisProperty);
loop_out=loopOut
}if(thisProperty.smooth){smooth=thisProperty.smooth.bind(thisProperty)
}function loopInDuration(type,duration){return loopIn(type,duration,true)
}function loopOutDuration(type,duration){return loopOut(type,duration,true)
}if(this.getValueAtTime){valueAtTime=this.getValueAtTime.bind(this)
}if(this.getVelocityAtTime){velocityAtTime=this.getVelocityAtTime.bind(this)
}var comp=elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface);
function lookAt(elem1,elem2){var fVec=[elem2[0]-elem1[0],elem2[1]-elem1[1],elem2[2]-elem1[2]];
var pitch=Math.atan2(fVec[0],Math.sqrt(fVec[1]*fVec[1]+fVec[2]*fVec[2]))/degToRads;
var yaw=-Math.atan2(fVec[1],fVec[2])/degToRads;
return[yaw,pitch,0]
}function easeOut(t,tMin,tMax,val1,val2){return applyEase(easeOutBez,t,tMin,tMax,val1,val2)
}function easeIn(t,tMin,tMax,val1,val2){return applyEase(easeInBez,t,tMin,tMax,val1,val2)
}function ease(t,tMin,tMax,val1,val2){return applyEase(easeInOutBez,t,tMin,tMax,val1,val2)
}function applyEase(fn,t,tMin,tMax,val1,val2){if(val1===undefined){val1=tMin;
val2=tMax
}else{t=(t-tMin)/(tMax-tMin)
}if(t>1){t=1
}else{if(t<0){t=0
}}var mult=fn(t);
if($bm_isInstanceOfArray(val1)){var iKey;
var lenKey=val1.length;
var arr=createTypedArray("float32",lenKey);
for(iKey=0;
iKey<lenKey;
iKey+=1){arr[iKey]=(val2[iKey]-val1[iKey])*mult+val1[iKey]
}return arr
}return(val2-val1)*mult+val1
}function nearestKey(time){var iKey;
var lenKey=data.k.length;
var index;
var keyTime;
if(!data.k.length||typeof data.k[0]==="number"){index=0;
keyTime=0
}else{index=-1;
time*=elem.comp.globalData.frameRate;
if(time<data.k[0].t){index=1;
keyTime=data.k[0].t
}else{for(iKey=0;
iKey<lenKey-1;
iKey+=1){if(time===data.k[iKey].t){index=iKey+1;
keyTime=data.k[iKey].t;
break
}else{if(time>data.k[iKey].t&&time<data.k[iKey+1].t){if(time-data.k[iKey].t>data.k[iKey+1].t-time){index=iKey+2;
keyTime=data.k[iKey+1].t
}else{index=iKey+1;
keyTime=data.k[iKey].t
}break
}}}if(index===-1){index=iKey+1;
keyTime=data.k[iKey].t
}}}var obKey={};
obKey.index=index;
obKey.time=keyTime/elem.comp.globalData.frameRate;
return obKey
}function key(ind){var obKey;
var iKey;
var lenKey;
if(!data.k.length||typeof data.k[0]==="number"){throw new Error("The property has no keyframe at index "+ind)
}ind-=1;
obKey={time:data.k[ind].t/elem.comp.globalData.frameRate,value:[]};
var arr=Object.prototype.hasOwnProperty.call(data.k[ind],"s")?data.k[ind].s:data.k[ind-1].e;
lenKey=arr.length;
for(iKey=0;
iKey<lenKey;
iKey+=1){obKey[iKey]=arr[iKey];
obKey.value[iKey]=arr[iKey]
}return obKey
}function framesToTime(fr,fps){if(!fps){fps=elem.comp.globalData.frameRate
}return fr/fps
}function timeToFrames(t,fps){if(!t&&t!==0){t=time
}if(!fps){fps=elem.comp.globalData.frameRate
}return t*fps
}function seedRandom(seed){BMMath.seedrandom(randSeed+seed)
}function sourceRectAtTime(){return elem.sourceRectAtTime()
}function substring(init,end){if(typeof value==="string"){if(end===undefined){return value.substring(init)
}return value.substring(init,end)
}return""
}function substr(init,end){if(typeof value==="string"){if(end===undefined){return value.substr(init)
}return value.substr(init,end)
}return""
}function posterizeTime(framesPerSecond){time=framesPerSecond===0?0:Math.floor(time*framesPerSecond)/framesPerSecond;
value=valueAtTime(time)
}var time;
var velocity;
var value;
var text;
var textIndex;
var textTotal;
var selectorValue;
var index=elem.data.ind;
var hasParent=!!(elem.hierarchy&&elem.hierarchy.length);
var parent;
var randSeed=Math.floor(Math.random()*1000000);
var globalData=elem.globalData;
function executeExpression(_value){value=_value;
if(this.frameExpressionId===elem.globalData.frameId&&this.propType!=="textSelector"){return value
}if(this.propType==="textSelector"){textIndex=this.textIndex;
textTotal=this.textTotal;
selectorValue=this.selectorValue
}if(!thisLayer){text=elem.layerInterface.text;
thisLayer=elem.layerInterface;
thisComp=elem.comp.compInterface;
toWorld=thisLayer.toWorld.bind(thisLayer);
fromWorld=thisLayer.fromWorld.bind(thisLayer);
fromComp=thisLayer.fromComp.bind(thisLayer);
toComp=thisLayer.toComp.bind(thisLayer);
mask=thisLayer.mask?thisLayer.mask.bind(thisLayer):null;
fromCompToSurface=fromComp
}if(!transform){transform=elem.layerInterface("ADBE Transform Group");
$bm_transform=transform;
if(transform){anchorPoint=transform.anchorPoint
}}if(elemType===4&&!content){content=thisLayer("ADBE Root Vectors Group")
}if(!effect){effect=thisLayer(4)
}hasParent=!!(elem.hierarchy&&elem.hierarchy.length);
if(hasParent&&!parent){parent=elem.hierarchy[0].layerInterface
}time=this.comp.renderedFrame/this.comp.globalData.frameRate;
if(_needsRandom){seedRandom(randSeed+time)
}if(needsVelocity){velocity=velocityAtTime(time)
}expression_function();
this.frameExpressionId=elem.globalData.frameId;
scoped_bm_rt=scoped_bm_rt.propType===propTypes.SHAPE?scoped_bm_rt.v:scoped_bm_rt;
return scoped_bm_rt
}executeExpression.__preventDeadCodeRemoval=[$bm_transform,anchorPoint,time,velocity,inPoint,outPoint,width,height,name,loop_in,loop_out,smooth,toComp,fromCompToSurface,toWorld,fromWorld,mask,position,rotation,scale,thisComp,numKeys,active,wiggle,loopInDuration,loopOutDuration,comp,lookAt,easeOut,easeIn,ease,nearestKey,key,text,textIndex,textTotal,selectorValue,framesToTime,timeToFrames,sourceRectAtTime,substring,substr,posterizeTime,index,globalData];
return executeExpression
}ob.initiateExpression=initiateExpression;
ob.__preventDeadCodeRemoval=[window,document,XMLHttpRequest,fetch,frames,$bm_neg,add,$bm_sum,$bm_sub,$bm_mul,$bm_div,$bm_mod,clamp,radians_to_degrees,degreesToRadians,degrees_to_radians,normalize,rgbToHsl,hslToRgb,linear,random,createPath];
return ob
}();
var expressionHelpers=function(){function searchExpressions(elem,data,prop){if(data.x){prop.k=true;
prop.x=true;
prop.initiateExpression=ExpressionManager.initiateExpression;
prop.effectsSequence.push(prop.initiateExpression(elem,data,prop).bind(prop))
}}function getValueAtTime(frameNum){frameNum*=this.elem.globalData.frameRate;
frameNum-=this.offsetTime;
if(frameNum!==this._cachingAtTime.lastFrame){this._cachingAtTime.lastIndex=this._cachingAtTime.lastFrame<frameNum?this._cachingAtTime.lastIndex:0;
this._cachingAtTime.value=this.interpolateValue(frameNum,this._cachingAtTime);
this._cachingAtTime.lastFrame=frameNum
}return this._cachingAtTime.value
}function getSpeedAtTime(frameNum){var delta=-0.01;
var v1=this.getValueAtTime(frameNum);
var v2=this.getValueAtTime(frameNum+delta);
var speed=0;
if(v1.length){var i;
for(i=0;
i<v1.length;
i+=1){speed+=Math.pow(v2[i]-v1[i],2)
}speed=Math.sqrt(speed)*100
}else{speed=0
}return speed
}function getVelocityAtTime(frameNum){if(this.vel!==undefined){return this.vel
}var delta=-0.001;
var v1=this.getValueAtTime(frameNum);
var v2=this.getValueAtTime(frameNum+delta);
var velocity;
if(v1.length){velocity=createTypedArray("float32",v1.length);
var i;
for(i=0;
i<v1.length;
i+=1){velocity[i]=(v2[i]-v1[i])/delta
}}else{velocity=(v2-v1)/delta
}return velocity
}function getStaticValueAtTime(){return this.pv
}function setGroupProperty(propertyGroup){this.propertyGroup=propertyGroup
}return{searchExpressions:searchExpressions,getSpeedAtTime:getSpeedAtTime,getVelocityAtTime:getVelocityAtTime,getValueAtTime:getValueAtTime,getStaticValueAtTime:getStaticValueAtTime,setGroupProperty:setGroupProperty}
}();
function addPropertyDecorator(){function loopOut(type,duration,durationFlag){if(!this.k||!this.keyframes){return this.pv
}type=type?type.toLowerCase():"";
var currentFrame=this.comp.renderedFrame;
var keyframes=this.keyframes;
var lastKeyFrame=keyframes[keyframes.length-1].t;
if(currentFrame<=lastKeyFrame){return this.pv
}var cycleDuration;
var firstKeyFrame;
if(!durationFlag){if(!duration||duration>keyframes.length-1){duration=keyframes.length-1
}firstKeyFrame=keyframes[keyframes.length-1-duration].t;
cycleDuration=lastKeyFrame-firstKeyFrame
}else{if(!duration){cycleDuration=Math.max(0,lastKeyFrame-this.elem.data.ip)
}else{cycleDuration=Math.abs(lastKeyFrame-this.elem.comp.globalData.frameRate*duration)
}firstKeyFrame=lastKeyFrame-cycleDuration
}var i;
var len;
var ret;
if(type==="pingpong"){var iterations=Math.floor((currentFrame-firstKeyFrame)/cycleDuration);
if(iterations%2!==0){return this.getValueAtTime((cycleDuration-(currentFrame-firstKeyFrame)%cycleDuration+firstKeyFrame)/this.comp.globalData.frameRate,0)
}}else{if(type==="offset"){var initV=this.getValueAtTime(firstKeyFrame/this.comp.globalData.frameRate,0);
var endV=this.getValueAtTime(lastKeyFrame/this.comp.globalData.frameRate,0);
var current=this.getValueAtTime(((currentFrame-firstKeyFrame)%cycleDuration+firstKeyFrame)/this.comp.globalData.frameRate,0);
var repeats=Math.floor((currentFrame-firstKeyFrame)/cycleDuration);
if(this.pv.length){ret=new Array(initV.length);
len=ret.length;
for(i=0;
i<len;
i+=1){ret[i]=(endV[i]-initV[i])*repeats+current[i]
}return ret
}return(endV-initV)*repeats+current
}else{if(type==="continue"){var lastValue=this.getValueAtTime(lastKeyFrame/this.comp.globalData.frameRate,0);
var nextLastValue=this.getValueAtTime((lastKeyFrame-0.001)/this.comp.globalData.frameRate,0);
if(this.pv.length){ret=new Array(lastValue.length);
len=ret.length;
for(i=0;
i<len;
i+=1){ret[i]=lastValue[i]+(lastValue[i]-nextLastValue[i])*((currentFrame-lastKeyFrame)/this.comp.globalData.frameRate)/0.0005
}return ret
}return lastValue+(lastValue-nextLastValue)*((currentFrame-lastKeyFrame)/0.001)
}}}return this.getValueAtTime(((currentFrame-firstKeyFrame)%cycleDuration+firstKeyFrame)/this.comp.globalData.frameRate,0)
}function loopIn(type,duration,durationFlag){if(!this.k){return this.pv
}type=type?type.toLowerCase():"";
var currentFrame=this.comp.renderedFrame;
var keyframes=this.keyframes;
var firstKeyFrame=keyframes[0].t;
if(currentFrame>=firstKeyFrame){return this.pv
}var cycleDuration;
var lastKeyFrame;
if(!durationFlag){if(!duration||duration>keyframes.length-1){duration=keyframes.length-1
}lastKeyFrame=keyframes[duration].t;
cycleDuration=lastKeyFrame-firstKeyFrame
}else{if(!duration){cycleDuration=Math.max(0,this.elem.data.op-firstKeyFrame)
}else{cycleDuration=Math.abs(this.elem.comp.globalData.frameRate*duration)
}lastKeyFrame=firstKeyFrame+cycleDuration
}var i;
var len;
var ret;
if(type==="pingpong"){var iterations=Math.floor((firstKeyFrame-currentFrame)/cycleDuration);
if(iterations%2===0){return this.getValueAtTime(((firstKeyFrame-currentFrame)%cycleDuration+firstKeyFrame)/this.comp.globalData.frameRate,0)
}}else{if(type==="offset"){var initV=this.getValueAtTime(firstKeyFrame/this.comp.globalData.frameRate,0);
var endV=this.getValueAtTime(lastKeyFrame/this.comp.globalData.frameRate,0);
var current=this.getValueAtTime((cycleDuration-(firstKeyFrame-currentFrame)%cycleDuration+firstKeyFrame)/this.comp.globalData.frameRate,0);
var repeats=Math.floor((firstKeyFrame-currentFrame)/cycleDuration)+1;
if(this.pv.length){ret=new Array(initV.length);
len=ret.length;
for(i=0;
i<len;
i+=1){ret[i]=current[i]-(endV[i]-initV[i])*repeats
}return ret
}return current-(endV-initV)*repeats
}else{if(type==="continue"){var firstValue=this.getValueAtTime(firstKeyFrame/this.comp.globalData.frameRate,0);
var nextFirstValue=this.getValueAtTime((firstKeyFrame+0.001)/this.comp.globalData.frameRate,0);
if(this.pv.length){ret=new Array(firstValue.length);
len=ret.length;
for(i=0;
i<len;
i+=1){ret[i]=firstValue[i]+(firstValue[i]-nextFirstValue[i])*(firstKeyFrame-currentFrame)/0.001
}return ret
}return firstValue+(firstValue-nextFirstValue)*(firstKeyFrame-currentFrame)/0.001
}}}return this.getValueAtTime((cycleDuration-((firstKeyFrame-currentFrame)%cycleDuration+firstKeyFrame))/this.comp.globalData.frameRate,0)
}function smooth(width,samples){if(!this.k){return this.pv
}width=(width||0.4)*0.5;
samples=Math.floor(samples||5);
if(samples<=1){return this.pv
}var currentTime=this.comp.renderedFrame/this.comp.globalData.frameRate;
var initFrame=currentTime-width;
var endFrame=currentTime+width;
var sampleFrequency=samples>1?(endFrame-initFrame)/(samples-1):1;
var i=0;
var j=0;
var value;
if(this.pv.length){value=createTypedArray("float32",this.pv.length)
}else{value=0
}var sampleValue;
while(i<samples){sampleValue=this.getValueAtTime(initFrame+i*sampleFrequency);
if(this.pv.length){for(j=0;
j<this.pv.length;
j+=1){value[j]+=sampleValue[j]
}}else{value+=sampleValue
}i+=1
}if(this.pv.length){for(j=0;
j<this.pv.length;
j+=1){value[j]/=samples
}}else{value/=samples
}return value
}function getTransformValueAtTime(time){if(!this._transformCachingAtTime){this._transformCachingAtTime={v:new Matrix()}
}var matrix=this._transformCachingAtTime.v;
matrix.cloneFromProps(this.pre.props);
if(this.appliedTransformations<1){var anchor=this.a.getValueAtTime(time);
matrix.translate(-anchor[0]*this.a.mult,-anchor[1]*this.a.mult,anchor[2]*this.a.mult)
}if(this.appliedTransformations<2){var scale=this.s.getValueAtTime(time);
matrix.scale(scale[0]*this.s.mult,scale[1]*this.s.mult,scale[2]*this.s.mult)
}if(this.sk&&this.appliedTransformations<3){var skew=this.sk.getValueAtTime(time);
var skewAxis=this.sa.getValueAtTime(time);
matrix.skewFromAxis(-skew*this.sk.mult,skewAxis*this.sa.mult)
}if(this.r&&this.appliedTransformations<4){var rotation=this.r.getValueAtTime(time);
matrix.rotate(-rotation*this.r.mult)
}else{if(!this.r&&this.appliedTransformations<4){var rotationZ=this.rz.getValueAtTime(time);
var rotationY=this.ry.getValueAtTime(time);
var rotationX=this.rx.getValueAtTime(time);
var orientation=this.or.getValueAtTime(time);
matrix.rotateZ(-rotationZ*this.rz.mult).rotateY(rotationY*this.ry.mult).rotateX(rotationX*this.rx.mult).rotateZ(-orientation[2]*this.or.mult).rotateY(orientation[1]*this.or.mult).rotateX(orientation[0]*this.or.mult)
}}if(this.data.p&&this.data.p.s){var positionX=this.px.getValueAtTime(time);
var positionY=this.py.getValueAtTime(time);
if(this.data.p.z){var positionZ=this.pz.getValueAtTime(time);
matrix.translate(positionX*this.px.mult,positionY*this.py.mult,-positionZ*this.pz.mult)
}else{matrix.translate(positionX*this.px.mult,positionY*this.py.mult,0)
}}else{var position=this.p.getValueAtTime(time);
matrix.translate(position[0]*this.p.mult,position[1]*this.p.mult,-position[2]*this.p.mult)
}return matrix
}function getTransformStaticValueAtTime(){return this.v.clone(new Matrix())
}var getTransformProperty=TransformPropertyFactory.getTransformProperty;
TransformPropertyFactory.getTransformProperty=function(elem,data,container){var prop=getTransformProperty(elem,data,container);
if(prop.dynamicProperties.length){prop.getValueAtTime=getTransformValueAtTime.bind(prop)
}else{prop.getValueAtTime=getTransformStaticValueAtTime.bind(prop)
}prop.setGroupProperty=expressionHelpers.setGroupProperty;
return prop
};
var propertyGetProp=PropertyFactory.getProp;
PropertyFactory.getProp=function(elem,data,type,mult,container){var prop=propertyGetProp(elem,data,type,mult,container);
if(prop.kf){prop.getValueAtTime=expressionHelpers.getValueAtTime.bind(prop)
}else{prop.getValueAtTime=expressionHelpers.getStaticValueAtTime.bind(prop)
}prop.setGroupProperty=expressionHelpers.setGroupProperty;
prop.loopOut=loopOut;
prop.loopIn=loopIn;
prop.smooth=smooth;
prop.getVelocityAtTime=expressionHelpers.getVelocityAtTime.bind(prop);
prop.getSpeedAtTime=expressionHelpers.getSpeedAtTime.bind(prop);
prop.numKeys=data.a===1?data.k.length:0;
prop.propertyIndex=data.ix;
var value=0;
if(type!==0){value=createTypedArray("float32",data.a===1?data.k[0].s.length:data.k.length)
}prop._cachingAtTime={lastFrame:initialDefaultFrame,lastIndex:0,value:value};
expressionHelpers.searchExpressions(elem,data,prop);
if(prop.k){container.addDynamicProperty(prop)
}return prop
};
function getShapeValueAtTime(frameNum){if(!this._cachingAtTime){this._cachingAtTime={shapeValue:shapePool.clone(this.pv),lastIndex:0,lastTime:initialDefaultFrame}
}frameNum*=this.elem.globalData.frameRate;
frameNum-=this.offsetTime;
if(frameNum!==this._cachingAtTime.lastTime){this._cachingAtTime.lastIndex=this._cachingAtTime.lastTime<frameNum?this._caching.lastIndex:0;
this._cachingAtTime.lastTime=frameNum;
this.interpolateShape(frameNum,this._cachingAtTime.shapeValue,this._cachingAtTime)
}return this._cachingAtTime.shapeValue
}var ShapePropertyConstructorFunction=ShapePropertyFactory.getConstructorFunction();
var KeyframedShapePropertyConstructorFunction=ShapePropertyFactory.getKeyframedConstructorFunction();
function ShapeExpressions(){}ShapeExpressions.prototype={vertices:function vertices(prop,time){if(this.k){this.getValue()
}var shapePath=this.v;
if(time!==undefined){shapePath=this.getValueAtTime(time,0)
}var i;
var len=shapePath._length;
var vertices=shapePath[prop];
var points=shapePath.v;
var arr=createSizedArray(len);
for(i=0;
i<len;
i+=1){if(prop==="i"||prop==="o"){arr[i]=[vertices[i][0]-points[i][0],vertices[i][1]-points[i][1]]
}else{arr[i]=[vertices[i][0],vertices[i][1]]
}}return arr
},points:function points(time){return this.vertices("v",time)
},inTangents:function inTangents(time){return this.vertices("i",time)
},outTangents:function outTangents(time){return this.vertices("o",time)
},isClosed:function isClosed(){return this.v.c
},pointOnPath:function pointOnPath(perc,time){var shapePath=this.v;
if(time!==undefined){shapePath=this.getValueAtTime(time,0)
}if(!this._segmentsLength){this._segmentsLength=bez.getSegmentsLength(shapePath)
}var segmentsLength=this._segmentsLength;
var lengths=segmentsLength.lengths;
var lengthPos=segmentsLength.totalLength*perc;
var i=0;
var len=lengths.length;
var accumulatedLength=0;
var pt;
while(i<len){if(accumulatedLength+lengths[i].addedLength>lengthPos){var initIndex=i;
var endIndex=shapePath.c&&i===len-1?0:i+1;
var segmentPerc=(lengthPos-accumulatedLength)/lengths[i].addedLength;
pt=bez.getPointInSegment(shapePath.v[initIndex],shapePath.v[endIndex],shapePath.o[initIndex],shapePath.i[endIndex],segmentPerc,lengths[i]);
break
}else{accumulatedLength+=lengths[i].addedLength
}i+=1
}if(!pt){pt=shapePath.c?[shapePath.v[0][0],shapePath.v[0][1]]:[shapePath.v[shapePath._length-1][0],shapePath.v[shapePath._length-1][1]]
}return pt
},vectorOnPath:function vectorOnPath(perc,time,vectorType){if(perc==1){perc=this.v.c
}else{if(perc==0){perc=0.999
}}var pt1=this.pointOnPath(perc,time);
var pt2=this.pointOnPath(perc+0.001,time);
var xLength=pt2[0]-pt1[0];
var yLength=pt2[1]-pt1[1];
var magnitude=Math.sqrt(Math.pow(xLength,2)+Math.pow(yLength,2));
if(magnitude===0){return[0,0]
}var unitVector=vectorType==="tangent"?[xLength/magnitude,yLength/magnitude]:[-yLength/magnitude,xLength/magnitude];
return unitVector
},tangentOnPath:function tangentOnPath(perc,time){return this.vectorOnPath(perc,time,"tangent")
},normalOnPath:function normalOnPath(perc,time){return this.vectorOnPath(perc,time,"normal")
},setGroupProperty:expressionHelpers.setGroupProperty,getValueAtTime:expressionHelpers.getStaticValueAtTime};
extendPrototype([ShapeExpressions],ShapePropertyConstructorFunction);
extendPrototype([ShapeExpressions],KeyframedShapePropertyConstructorFunction);
KeyframedShapePropertyConstructorFunction.prototype.getValueAtTime=getShapeValueAtTime;
KeyframedShapePropertyConstructorFunction.prototype.initiateExpression=ExpressionManager.initiateExpression;
var propertyGetShapeProp=ShapePropertyFactory.getShapeProp;
ShapePropertyFactory.getShapeProp=function(elem,data,type,arr,trims){var prop=propertyGetShapeProp(elem,data,type,arr,trims);
prop.propertyIndex=data.ix;
prop.lock=false;
if(type===3){expressionHelpers.searchExpressions(elem,data.pt,prop)
}else{if(type===4){expressionHelpers.searchExpressions(elem,data.ks,prop)
}}if(prop.k){elem.addDynamicProperty(prop)
}return prop
}
}function initialize$1(){addPropertyDecorator()
}function addDecorator(){function searchExpressions(){if(this.data.d.x){this.calculateExpression=ExpressionManager.initiateExpression.bind(this)(this.elem,this.data.d,this);
this.addEffect(this.getExpressionValue.bind(this));
return true
}return null
}TextProperty.prototype.getExpressionValue=function(currentValue,text){var newValue=this.calculateExpression(text);
if(currentValue.t!==newValue){var newData={};
this.copyData(newData,currentValue);
newData.t=newValue.toString();
newData.__complete=false;
return newData
}return currentValue
};
TextProperty.prototype.searchProperty=function(){var isKeyframed=this.searchKeyframes();
var hasExpressions=this.searchExpressions();
this.kf=isKeyframed||hasExpressions;
return this.kf
};
TextProperty.prototype.searchExpressions=searchExpressions
}function initialize(){addDecorator()
}function SVGComposableEffect(){}SVGComposableEffect.prototype={createMergeNode:function createMergeNode(resultId,ins){var feMerge=createNS("feMerge");
feMerge.setAttribute("result",resultId);
var feMergeNode;
var i;
for(i=0;
i<ins.length;
i+=1){feMergeNode=createNS("feMergeNode");
feMergeNode.setAttribute("in",ins[i]);
feMerge.appendChild(feMergeNode);
feMerge.appendChild(feMergeNode)
}return feMerge
}};
var linearFilterValue="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0";
function SVGTintFilter(filter,filterManager,elem,id,source){this.filterManager=filterManager;
var feColorMatrix=createNS("feColorMatrix");
feColorMatrix.setAttribute("type","matrix");
feColorMatrix.setAttribute("color-interpolation-filters","linearRGB");
feColorMatrix.setAttribute("values",linearFilterValue+" 1 0");
this.linearFilter=feColorMatrix;
feColorMatrix.setAttribute("result",id+"_tint_1");
filter.appendChild(feColorMatrix);
feColorMatrix=createNS("feColorMatrix");
feColorMatrix.setAttribute("type","matrix");
feColorMatrix.setAttribute("color-interpolation-filters","sRGB");
feColorMatrix.setAttribute("values","1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0");
feColorMatrix.setAttribute("result",id+"_tint_2");
filter.appendChild(feColorMatrix);
this.matrixFilter=feColorMatrix;
var feMerge=this.createMergeNode(id,[source,id+"_tint_1",id+"_tint_2"]);
filter.appendChild(feMerge)
}extendPrototype([SVGComposableEffect],SVGTintFilter);
SVGTintFilter.prototype.renderFrame=function(forceRender){if(forceRender||this.filterManager._mdf){var colorBlack=this.filterManager.effectElements[0].p.v;
var colorWhite=this.filterManager.effectElements[1].p.v;
var opacity=this.filterManager.effectElements[2].p.v/100;
this.linearFilter.setAttribute("values",linearFilterValue+" "+opacity+" 0");
this.matrixFilter.setAttribute("values",colorWhite[0]-colorBlack[0]+" 0 0 0 "+colorBlack[0]+" "+(colorWhite[1]-colorBlack[1])+" 0 0 0 "+colorBlack[1]+" "+(colorWhite[2]-colorBlack[2])+" 0 0 0 "+colorBlack[2]+" 0 0 0 1 0")
}};
function SVGFillFilter(filter,filterManager,elem,id){this.filterManager=filterManager;
var feColorMatrix=createNS("feColorMatrix");
feColorMatrix.setAttribute("type","matrix");
feColorMatrix.setAttribute("color-interpolation-filters","sRGB");
feColorMatrix.setAttribute("values","1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0");
feColorMatrix.setAttribute("result",id);
filter.appendChild(feColorMatrix);
this.matrixFilter=feColorMatrix
}SVGFillFilter.prototype.renderFrame=function(forceRender){if(forceRender||this.filterManager._mdf){var color=this.filterManager.effectElements[2].p.v;
var opacity=this.filterManager.effectElements[6].p.v;
this.matrixFilter.setAttribute("values","0 0 0 0 "+color[0]+" 0 0 0 0 "+color[1]+" 0 0 0 0 "+color[2]+" 0 0 0 "+opacity+" 0")
}};
function SVGStrokeEffect(fil,filterManager,elem){this.initialized=false;
this.filterManager=filterManager;
this.elem=elem;
this.paths=[]
}SVGStrokeEffect.prototype.initialize=function(){var elemChildren=this.elem.layerElement.children||this.elem.layerElement.childNodes;
var path;
var groupPath;
var i;
var len;
if(this.filterManager.effectElements[1].p.v===1){len=this.elem.maskManager.masksProperties.length;
i=0
}else{i=this.filterManager.effectElements[0].p.v-1;
len=i+1
}groupPath=createNS("g");
groupPath.setAttribute("fill","none");
groupPath.setAttribute("stroke-linecap","round");
groupPath.setAttribute("stroke-dashoffset",1);
for(i;
i<len;
i+=1){path=createNS("path");
groupPath.appendChild(path);
this.paths.push({p:path,m:i})
}if(this.filterManager.effectElements[10].p.v===3){var mask=createNS("mask");
var id=createElementID();
mask.setAttribute("id",id);
mask.setAttribute("mask-type","alpha");
mask.appendChild(groupPath);
this.elem.globalData.defs.appendChild(mask);
var g=createNS("g");
g.setAttribute("mask","url("+getLocationHref()+"#"+id+")");
while(elemChildren[0]){g.appendChild(elemChildren[0])
}this.elem.layerElement.appendChild(g);
this.masker=mask;
groupPath.setAttribute("stroke","#fff")
}else{if(this.filterManager.effectElements[10].p.v===1||this.filterManager.effectElements[10].p.v===2){if(this.filterManager.effectElements[10].p.v===2){elemChildren=this.elem.layerElement.children||this.elem.layerElement.childNodes;
while(elemChildren.length){this.elem.layerElement.removeChild(elemChildren[0])
}}this.elem.layerElement.appendChild(groupPath);
this.elem.layerElement.removeAttribute("mask");
groupPath.setAttribute("stroke","#fff")
}}this.initialized=true;
this.pathMasker=groupPath
};
SVGStrokeEffect.prototype.renderFrame=function(forceRender){if(!this.initialized){this.initialize()
}var i;
var len=this.paths.length;
var mask;
var path;
for(i=0;
i<len;
i+=1){if(this.paths[i].m!==-1){mask=this.elem.maskManager.viewData[this.paths[i].m];
path=this.paths[i].p;
if(forceRender||this.filterManager._mdf||mask.prop._mdf){path.setAttribute("d",mask.lastPath)
}if(forceRender||this.filterManager.effectElements[9].p._mdf||this.filterManager.effectElements[4].p._mdf||this.filterManager.effectElements[7].p._mdf||this.filterManager.effectElements[8].p._mdf||mask.prop._mdf){var dasharrayValue;
if(this.filterManager.effectElements[7].p.v!==0||this.filterManager.effectElements[8].p.v!==100){var s=Math.min(this.filterManager.effectElements[7].p.v,this.filterManager.effectElements[8].p.v)*0.01;
var e=Math.max(this.filterManager.effectElements[7].p.v,this.filterManager.effectElements[8].p.v)*0.01;
var l=path.getTotalLength();
dasharrayValue="0 0 0 "+l*s+" ";
var lineLength=l*(e-s);
var segment=1+this.filterManager.effectElements[4].p.v*2*this.filterManager.effectElements[9].p.v*0.01;
var units=Math.floor(lineLength/segment);
var j;
for(j=0;
j<units;
j+=1){dasharrayValue+="1 "+this.filterManager.effectElements[4].p.v*2*this.filterManager.effectElements[9].p.v*0.01+" "
}dasharrayValue+="0 "+l*10+" 0 0"
}else{dasharrayValue="1 "+this.filterManager.effectElements[4].p.v*2*this.filterManager.effectElements[9].p.v*0.01
}path.setAttribute("stroke-dasharray",dasharrayValue)
}}}if(forceRender||this.filterManager.effectElements[4].p._mdf){this.pathMasker.setAttribute("stroke-width",this.filterManager.effectElements[4].p.v*2)
}if(forceRender||this.filterManager.effectElements[6].p._mdf){this.pathMasker.setAttribute("opacity",this.filterManager.effectElements[6].p.v)
}if(this.filterManager.effectElements[10].p.v===1||this.filterManager.effectElements[10].p.v===2){if(forceRender||this.filterManager.effectElements[3].p._mdf){var color=this.filterManager.effectElements[3].p.v;
this.pathMasker.setAttribute("stroke","rgb("+bmFloor(color[0]*255)+","+bmFloor(color[1]*255)+","+bmFloor(color[2]*255)+")")
}}};
function SVGTritoneFilter(filter,filterManager,elem,id){this.filterManager=filterManager;
var feColorMatrix=createNS("feColorMatrix");
feColorMatrix.setAttribute("type","matrix");
feColorMatrix.setAttribute("color-interpolation-filters","linearRGB");
feColorMatrix.setAttribute("values","0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0");
filter.appendChild(feColorMatrix);
var feComponentTransfer=createNS("feComponentTransfer");
feComponentTransfer.setAttribute("color-interpolation-filters","sRGB");
feComponentTransfer.setAttribute("result",id);
this.matrixFilter=feComponentTransfer;
var feFuncR=createNS("feFuncR");
feFuncR.setAttribute("type","table");
feComponentTransfer.appendChild(feFuncR);
this.feFuncR=feFuncR;
var feFuncG=createNS("feFuncG");
feFuncG.setAttribute("type","table");
feComponentTransfer.appendChild(feFuncG);
this.feFuncG=feFuncG;
var feFuncB=createNS("feFuncB");
feFuncB.setAttribute("type","table");
feComponentTransfer.appendChild(feFuncB);
this.feFuncB=feFuncB;
filter.appendChild(feComponentTransfer)
}SVGTritoneFilter.prototype.renderFrame=function(forceRender){if(forceRender||this.filterManager._mdf){var color1=this.filterManager.effectElements[0].p.v;
var color2=this.filterManager.effectElements[1].p.v;
var color3=this.filterManager.effectElements[2].p.v;
var tableR=color3[0]+" "+color2[0]+" "+color1[0];
var tableG=color3[1]+" "+color2[1]+" "+color1[1];
var tableB=color3[2]+" "+color2[2]+" "+color1[2];
this.feFuncR.setAttribute("tableValues",tableR);
this.feFuncG.setAttribute("tableValues",tableG);
this.feFuncB.setAttribute("tableValues",tableB)
}};
function SVGProLevelsFilter(filter,filterManager,elem,id){this.filterManager=filterManager;
var effectElements=this.filterManager.effectElements;
var feComponentTransfer=createNS("feComponentTransfer");
if(effectElements[10].p.k||effectElements[10].p.v!==0||effectElements[11].p.k||effectElements[11].p.v!==1||effectElements[12].p.k||effectElements[12].p.v!==1||effectElements[13].p.k||effectElements[13].p.v!==0||effectElements[14].p.k||effectElements[14].p.v!==1){this.feFuncR=this.createFeFunc("feFuncR",feComponentTransfer)
}if(effectElements[17].p.k||effectElements[17].p.v!==0||effectElements[18].p.k||effectElements[18].p.v!==1||effectElements[19].p.k||effectElements[19].p.v!==1||effectElements[20].p.k||effectElements[20].p.v!==0||effectElements[21].p.k||effectElements[21].p.v!==1){this.feFuncG=this.createFeFunc("feFuncG",feComponentTransfer)
}if(effectElements[24].p.k||effectElements[24].p.v!==0||effectElements[25].p.k||effectElements[25].p.v!==1||effectElements[26].p.k||effectElements[26].p.v!==1||effectElements[27].p.k||effectElements[27].p.v!==0||effectElements[28].p.k||effectElements[28].p.v!==1){this.feFuncB=this.createFeFunc("feFuncB",feComponentTransfer)
}if(effectElements[31].p.k||effectElements[31].p.v!==0||effectElements[32].p.k||effectElements[32].p.v!==1||effectElements[33].p.k||effectElements[33].p.v!==1||effectElements[34].p.k||effectElements[34].p.v!==0||effectElements[35].p.k||effectElements[35].p.v!==1){this.feFuncA=this.createFeFunc("feFuncA",feComponentTransfer)
}if(this.feFuncR||this.feFuncG||this.feFuncB||this.feFuncA){feComponentTransfer.setAttribute("color-interpolation-filters","sRGB");
filter.appendChild(feComponentTransfer)
}if(effectElements[3].p.k||effectElements[3].p.v!==0||effectElements[4].p.k||effectElements[4].p.v!==1||effectElements[5].p.k||effectElements[5].p.v!==1||effectElements[6].p.k||effectElements[6].p.v!==0||effectElements[7].p.k||effectElements[7].p.v!==1){feComponentTransfer=createNS("feComponentTransfer");
feComponentTransfer.setAttribute("color-interpolation-filters","sRGB");
feComponentTransfer.setAttribute("result",id);
filter.appendChild(feComponentTransfer);
this.feFuncRComposed=this.createFeFunc("feFuncR",feComponentTransfer);
this.feFuncGComposed=this.createFeFunc("feFuncG",feComponentTransfer);
this.feFuncBComposed=this.createFeFunc("feFuncB",feComponentTransfer)
}}SVGProLevelsFilter.prototype.createFeFunc=function(type,feComponentTransfer){var feFunc=createNS(type);
feFunc.setAttribute("type","table");
feComponentTransfer.appendChild(feFunc);
return feFunc
};
SVGProLevelsFilter.prototype.getTableValue=function(inputBlack,inputWhite,gamma,outputBlack,outputWhite){var cnt=0;
var segments=256;
var perc;
var min=Math.min(inputBlack,inputWhite);
var max=Math.max(inputBlack,inputWhite);
var table=Array.call(null,{length:segments});
var colorValue;
var pos=0;
var outputDelta=outputWhite-outputBlack;
var inputDelta=inputWhite-inputBlack;
while(cnt<=256){perc=cnt/256;
if(perc<=min){colorValue=inputDelta<0?outputWhite:outputBlack
}else{if(perc>=max){colorValue=inputDelta<0?outputBlack:outputWhite
}else{colorValue=outputBlack+outputDelta*Math.pow((perc-inputBlack)/inputDelta,1/gamma)
}}table[pos]=colorValue;
pos+=1;
cnt+=256/(segments-1)
}return table.join(" ")
};
SVGProLevelsFilter.prototype.renderFrame=function(forceRender){if(forceRender||this.filterManager._mdf){var val;
var effectElements=this.filterManager.effectElements;
if(this.feFuncRComposed&&(forceRender||effectElements[3].p._mdf||effectElements[4].p._mdf||effectElements[5].p._mdf||effectElements[6].p._mdf||effectElements[7].p._mdf)){val=this.getTableValue(effectElements[3].p.v,effectElements[4].p.v,effectElements[5].p.v,effectElements[6].p.v,effectElements[7].p.v);
this.feFuncRComposed.setAttribute("tableValues",val);
this.feFuncGComposed.setAttribute("tableValues",val);
this.feFuncBComposed.setAttribute("tableValues",val)
}if(this.feFuncR&&(forceRender||effectElements[10].p._mdf||effectElements[11].p._mdf||effectElements[12].p._mdf||effectElements[13].p._mdf||effectElements[14].p._mdf)){val=this.getTableValue(effectElements[10].p.v,effectElements[11].p.v,effectElements[12].p.v,effectElements[13].p.v,effectElements[14].p.v);
this.feFuncR.setAttribute("tableValues",val)
}if(this.feFuncG&&(forceRender||effectElements[17].p._mdf||effectElements[18].p._mdf||effectElements[19].p._mdf||effectElements[20].p._mdf||effectElements[21].p._mdf)){val=this.getTableValue(effectElements[17].p.v,effectElements[18].p.v,effectElements[19].p.v,effectElements[20].p.v,effectElements[21].p.v);
this.feFuncG.setAttribute("tableValues",val)
}if(this.feFuncB&&(forceRender||effectElements[24].p._mdf||effectElements[25].p._mdf||effectElements[26].p._mdf||effectElements[27].p._mdf||effectElements[28].p._mdf)){val=this.getTableValue(effectElements[24].p.v,effectElements[25].p.v,effectElements[26].p.v,effectElements[27].p.v,effectElements[28].p.v);
this.feFuncB.setAttribute("tableValues",val)
}if(this.feFuncA&&(forceRender||effectElements[31].p._mdf||effectElements[32].p._mdf||effectElements[33].p._mdf||effectElements[34].p._mdf||effectElements[35].p._mdf)){val=this.getTableValue(effectElements[31].p.v,effectElements[32].p.v,effectElements[33].p.v,effectElements[34].p.v,effectElements[35].p.v);
this.feFuncA.setAttribute("tableValues",val)
}}};
function SVGDropShadowEffect(filter,filterManager,elem,id,source){var globalFilterSize=filterManager.container.globalData.renderConfig.filterSize;
var filterSize=filterManager.data.fs||globalFilterSize;
filter.setAttribute("x",filterSize.x||globalFilterSize.x);
filter.setAttribute("y",filterSize.y||globalFilterSize.y);
filter.setAttribute("width",filterSize.width||globalFilterSize.width);
filter.setAttribute("height",filterSize.height||globalFilterSize.height);
this.filterManager=filterManager;
var feGaussianBlur=createNS("feGaussianBlur");
feGaussianBlur.setAttribute("in","SourceAlpha");
feGaussianBlur.setAttribute("result",id+"_drop_shadow_1");
feGaussianBlur.setAttribute("stdDeviation","0");
this.feGaussianBlur=feGaussianBlur;
filter.appendChild(feGaussianBlur);
var feOffset=createNS("feOffset");
feOffset.setAttribute("dx","25");
feOffset.setAttribute("dy","0");
feOffset.setAttribute("in",id+"_drop_shadow_1");
feOffset.setAttribute("result",id+"_drop_shadow_2");
this.feOffset=feOffset;
filter.appendChild(feOffset);
var feFlood=createNS("feFlood");
feFlood.setAttribute("flood-color","#00ff00");
feFlood.setAttribute("flood-opacity","1");
feFlood.setAttribute("result",id+"_drop_shadow_3");
this.feFlood=feFlood;
filter.appendChild(feFlood);
var feComposite=createNS("feComposite");
feComposite.setAttribute("in",id+"_drop_shadow_3");
feComposite.setAttribute("in2",id+"_drop_shadow_2");
feComposite.setAttribute("operator","in");
feComposite.setAttribute("result",id+"_drop_shadow_4");
filter.appendChild(feComposite);
var feMerge=this.createMergeNode(id,[id+"_drop_shadow_4",source]);
filter.appendChild(feMerge)
}extendPrototype([SVGComposableEffect],SVGDropShadowEffect);
SVGDropShadowEffect.prototype.renderFrame=function(forceRender){if(forceRender||this.filterManager._mdf){if(forceRender||this.filterManager.effectElements[4].p._mdf){this.feGaussianBlur.setAttribute("stdDeviation",this.filterManager.effectElements[4].p.v/4)
}if(forceRender||this.filterManager.effectElements[0].p._mdf){var col=this.filterManager.effectElements[0].p.v;
this.feFlood.setAttribute("flood-color",rgbToHex(Math.round(col[0]*255),Math.round(col[1]*255),Math.round(col[2]*255)))
}if(forceRender||this.filterManager.effectElements[1].p._mdf){this.feFlood.setAttribute("flood-opacity",this.filterManager.effectElements[1].p.v/255)
}if(forceRender||this.filterManager.effectElements[2].p._mdf||this.filterManager.effectElements[3].p._mdf){var distance=this.filterManager.effectElements[3].p.v;
var angle=(this.filterManager.effectElements[2].p.v-90)*degToRads;
var x=distance*Math.cos(angle);
var y=distance*Math.sin(angle);
this.feOffset.setAttribute("dx",x);
this.feOffset.setAttribute("dy",y)
}}};
var _svgMatteSymbols=[];
function SVGMatte3Effect(filterElem,filterManager,elem){this.initialized=false;
this.filterManager=filterManager;
this.filterElem=filterElem;
this.elem=elem;
elem.matteElement=createNS("g");
elem.matteElement.appendChild(elem.layerElement);
elem.matteElement.appendChild(elem.transformedElement);
elem.baseElement=elem.matteElement
}SVGMatte3Effect.prototype.findSymbol=function(mask){var i=0;
var len=_svgMatteSymbols.length;
while(i<len){if(_svgMatteSymbols[i]===mask){return _svgMatteSymbols[i]
}i+=1
}return null
};
SVGMatte3Effect.prototype.replaceInParent=function(mask,symbolId){var parentNode=mask.layerElement.parentNode;
if(!parentNode){return
}var children=parentNode.children;
var i=0;
var len=children.length;
while(i<len){if(children[i]===mask.layerElement){break
}i+=1
}var nextChild;
if(i<=len-2){nextChild=children[i+1]
}var useElem=createNS("use");
useElem.setAttribute("href","#"+symbolId);
if(nextChild){parentNode.insertBefore(useElem,nextChild)
}else{parentNode.appendChild(useElem)
}};
SVGMatte3Effect.prototype.setElementAsMask=function(elem,mask){if(!this.findSymbol(mask)){var symbolId=createElementID();
var masker=createNS("mask");
masker.setAttribute("id",mask.layerId);
masker.setAttribute("mask-type","alpha");
_svgMatteSymbols.push(mask);
var defs=elem.globalData.defs;
defs.appendChild(masker);
var symbol=createNS("symbol");
symbol.setAttribute("id",symbolId);
this.replaceInParent(mask,symbolId);
symbol.appendChild(mask.layerElement);
defs.appendChild(symbol);
var useElem=createNS("use");
useElem.setAttribute("href","#"+symbolId);
masker.appendChild(useElem);
mask.data.hd=false;
mask.show()
}elem.setMatte(mask.layerId)
};
SVGMatte3Effect.prototype.initialize=function(){var ind=this.filterManager.effectElements[0].p.v;
var elements=this.elem.comp.elements;
var i=0;
var len=elements.length;
while(i<len){if(elements[i]&&elements[i].data.ind===ind){this.setElementAsMask(this.elem,elements[i])
}i+=1
}this.initialized=true
};
SVGMatte3Effect.prototype.renderFrame=function(){if(!this.initialized){this.initialize()
}};
function SVGGaussianBlurEffect(filter,filterManager,elem,id){filter.setAttribute("x","-100%");
filter.setAttribute("y","-100%");
filter.setAttribute("width","300%");
filter.setAttribute("height","300%");
this.filterManager=filterManager;
var feGaussianBlur=createNS("feGaussianBlur");
feGaussianBlur.setAttribute("result",id);
filter.appendChild(feGaussianBlur);
this.feGaussianBlur=feGaussianBlur
}SVGGaussianBlurEffect.prototype.renderFrame=function(forceRender){if(forceRender||this.filterManager._mdf){var kBlurrinessToSigma=0.3;
var sigma=this.filterManager.effectElements[0].p.v*kBlurrinessToSigma;
var dimensions=this.filterManager.effectElements[1].p.v;
var sigmaX=dimensions==3?0:sigma;
var sigmaY=dimensions==2?0:sigma;
this.feGaussianBlur.setAttribute("stdDeviation",sigmaX+" "+sigmaY);
var edgeMode=this.filterManager.effectElements[2].p.v==1?"wrap":"duplicate";
this.feGaussianBlur.setAttribute("edgeMode",edgeMode)
}};
registerRenderer("canvas",CanvasRenderer);
registerRenderer("html",HybridRenderer);
registerRenderer("svg",SVGRenderer);
ShapeModifiers.registerModifier("tm",TrimModifier);
ShapeModifiers.registerModifier("pb",PuckerAndBloatModifier);
ShapeModifiers.registerModifier("rp",RepeaterModifier);
ShapeModifiers.registerModifier("rd",RoundCornersModifier);
ShapeModifiers.registerModifier("zz",ZigZagModifier);
ShapeModifiers.registerModifier("op",OffsetPathModifier);
setExpressionsPlugin(Expressions);
setExpressionInterfaces(getInterface);
initialize$1();
initialize();
registerEffect(20,SVGTintFilter,true);
registerEffect(21,SVGFillFilter,true);
registerEffect(22,SVGStrokeEffect,false);
registerEffect(23,SVGTritoneFilter,true);
registerEffect(24,SVGProLevelsFilter,true);
registerEffect(25,SVGDropShadowEffect,true);
registerEffect(28,SVGMatte3Effect,false);
registerEffect(29,SVGGaussianBlurEffect,true);
return lottie
}));
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)
}else{if(typeof exports==="object"&&typeof require==="function"){a(require("jquery"))
}else{a(jQuery)
}}}(function(e){var a=(function(){return{escapeRegExChars:function(f){return f.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&")
},createNode:function(f){var g=document.createElement("div");
g.className=f;
g.style.position="absolute";
g.style.display="none";
return g
}}
}()),c={ESC:27,TAB:9,RETURN:13,LEFT:37,UP:38,RIGHT:39,DOWN:40};
var d={relocation:'[name="relocation"]',remote:'[name="remote"]',office:'[name="office"]'};
function b(g,f){var i=e.noop,h=this,j={ajaxSettings:{},autoSelectFirst:false,appendTo:document.body,serviceUrl:null,lookup:null,onSelect:null,width:"auto",minChars:1,maxHeight:300,deferRequestBy:0,params:{},formatResult:b.formatResult,formatGroup:b.formatGroup,delimiter:null,zIndex:9999,type:"GET",noCache:false,onSearchStart:i,onSearchComplete:i,onSearchError:i,preserveInput:false,containerClass:"autocomplete-suggestions",tabDisabled:false,dataType:"text",currentRequest:null,triggerSelectOnValidInput:true,lookupFilter:function(l,k,m){return l.value.toLowerCase().indexOf(m)!==-1
},paramName:"query",transformResult:function(k){return typeof k==="string"?e.parseJSON(k):k
},showNoSuggestionNotice:false,noSuggestionNotice:"No results",orientation:"bottom",forceFixPosition:false};
h.element=g;
h.el=e(g);
h.suggestions=[];
h.selectedIndex=-1;
h.currentValue=h.element.value;
h.intervalId=0;
h.cachedResponse={};
h.onChangeInterval=null;
h.onChange=null;
h.isLocal=false;
h.suggestionsContainer=null;
h.noSuggestionsContainer=null;
h.options=e.extend({},j,f);
h.classes={selected:"autocomplete-selected",suggestion:"autocomplete-suggestion"};
h.hint=null;
h.hintValue="";
h.selection=null;
h.initialize();
h.setOptions(f)
}b.utils=a;
e.Autocomplete=b;
b.formatResult=function(f,g){if(!g){return f.value
}var h="("+a.escapeRegExChars(g)+")";
return f.value.replace(new RegExp(h,"gi"),"<strong>$1</strong>").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/&lt;(\/?strong)&gt;/g,"<$1>")
};
b.formatGroup=function(f,g){return'<div class="autocomplete-group"><strong>'+g+"</strong></div>"
};
b.prototype={killerFn:null,initialize:function(){var i=this,j="."+i.classes.suggestion,h=i.classes.selected,g=i.options,f;
i.element.setAttribute("autocomplete","off");
i.killerFn=function(k){if(!e(k.target).closest("."+i.options.containerClass).length){i.killSuggestions();
i.disableKillerFn()
}};
i.noSuggestionsContainer=e('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0);
i.suggestionsContainer=b.utils.createNode(g.containerClass);
f=e(i.suggestionsContainer);
f.appendTo(g.appendTo);
if(g.width!=="auto"){f.css("width",g.width)
}f.on("mouseover.autocomplete",j,function(){i.activate(e(this).data("index"))
});
f.on("mouseout.autocomplete",function(){i.selectedIndex=-1;
f.children("."+h).removeClass(h)
});
f.on("click.autocomplete",j,function(){i.select(e(this).data("index"));
return false
});
i.fixPositionCapture=function(){if(i.visible){i.fixPosition()
}};
e(window).on("resize.autocomplete",i.fixPositionCapture);
i.el.on("keydown.autocomplete",function(k){i.onKeyPress(k)
});
i.el.on("keyup.autocomplete",function(k){i.onKeyUp(k)
});
i.el.on("blur.autocomplete",function(){i.onBlur()
});
i.el.on("focus.autocomplete",function(){i.onFocus()
});
i.el.on("change.autocomplete",function(k){i.onKeyUp(k)
});
i.el.on("input.autocomplete",function(k){i.onKeyUp(k)
});
this.$locationDropdown=e("body").find(".recruiting-search__form .recruiting-search__select");
this.$departmentsDropdown=e("body").find(".js-multi-select");
this.$checkboxes=e("body").find(".recruiting-search__checkbox")
},onFocus:function(){var f=this;
f.fixPosition();
if(f.el.val().length>=f.options.minChars){f.onValueChange()
}},onBlur:function(){this.enableKillerFn()
},abortAjax:function(){var f=this;
if(f.currentRequest){f.currentRequest.abort();
f.currentRequest=null
}},setOptions:function(h){var g=this,f=g.options;
e.extend(f,h);
g.isLocal=e.isArray(f.lookup);
if(g.isLocal){f.lookup=g.verifySuggestionsFormat(f.lookup)
}f.orientation=g.validateOrientation(f.orientation,"bottom");
e(g.suggestionsContainer).css({"max-height":f.maxHeight+"px",width:f.width+"px","z-index":f.zIndex})
},clearCache:function(){this.cachedResponse={}
},clear:function(){this.clearCache();
this.currentValue="";
this.suggestions=[]
},disable:function(){var f=this;
f.disabled=true;
clearInterval(f.onChangeInterval);
f.abortAjax()
},enable:function(){this.disabled=false
},fixPosition:function(){var l=this,p=e(l.suggestionsContainer),n=p.parent().get(0);
if(n!==document.body&&!l.options.forceFixPosition){return
}var g=l.options.orientation,s=p.outerHeight(),o=l.el.outerHeight(),j=l.el.offset(),q={top:j.top,left:j.left};
if(g==="auto"){var i=e(window).height(),h=e(window).scrollTop(),m=-h+j.top-s,r=h+i-(j.top+o+s);
g=(Math.max(m,r)===m)?"top":"bottom"
}if(g==="top"){q.top+=-s
}else{q.top+=o
}if(n!==document.body){var k=p.css("opacity"),f;
if(!l.visible){p.css("opacity",0).show()
}f=p.offsetParent().offset();
q.top-=f.top;
q.left-=f.left;
if(!l.visible){p.css("opacity",k).hide()
}}if(l.options.width==="auto"){q.width=l.el.outerWidth()+"px"
}p.css(q)
},enableKillerFn:function(){var f=this;
e(document).on("click.autocomplete",f.killerFn)
},disableKillerFn:function(){var f=this;
e(document).off("click.autocomplete",f.killerFn)
},killSuggestions:function(){var f=this;
f.stopKillSuggestions();
f.intervalId=window.setInterval(function(){if(f.visible){if(!f.options.preserveInput){f.el.val(f.currentValue)
}f.hide()
}f.stopKillSuggestions()
},50)
},stopKillSuggestions:function(){window.clearInterval(this.intervalId)
},isCursorAtEnd:function(){var h=this,g=h.el.val().length,i=h.element.selectionStart,f;
if(typeof i==="number"){return i===g
}if(document.selection){f=document.selection.createRange();
f.moveStart("character",-g);
return g===f.text.length
}return true
},onKeyPress:function(g){var f=this;
if(!f.disabled&&!f.visible&&g.which===c.DOWN&&f.currentValue){f.suggest();
return
}if(f.disabled||!f.visible){return
}switch(g.which){case c.ESC:f.el.val(f.currentValue);
f.hide();
break;
case c.RIGHT:if(f.hint&&f.options.onHint&&f.isCursorAtEnd()){f.selectHint();
break
}return;
case c.TAB:if(f.hint&&f.options.onHint){f.selectHint();
return
}if(f.selectedIndex===-1){f.hide();
return
}f.select(f.selectedIndex);
if(f.options.tabDisabled===false){return
}break;
case c.RETURN:if(f.selectedIndex===-1){f.hide();
return
}f.select(f.selectedIndex);
break;
case c.UP:f.moveUp();
break;
case c.DOWN:f.moveDown();
break;
default:return
}g.stopImmediatePropagation();
g.preventDefault()
},onKeyUp:function(g){var f=this;
if(f.disabled){return
}switch(g.which){case c.UP:case c.DOWN:return
}clearInterval(f.onChangeInterval);
if(f.currentValue!==f.el.val()){f.findBestHint();
if(f.options.deferRequestBy>0){f.onChangeInterval=setInterval(function(){f.onValueChange()
},f.options.deferRequestBy)
}else{f.onValueChange()
}}},onValueChange:function(){var h=this,f=h.options,j=h.el.val(),i=h.getQuery(j),g=this.getSelectedParameters();
if(h.selection&&h.currentValue!==i){h.selection=null;
(f.onInvalidateSelection||e.noop).call(h.element)
}clearInterval(h.onChangeInterval);
h.currentValue=j;
h.selectedIndex=-1;
if(f.triggerSelectOnValidInput&&h.isExactMatch(i)){h.select(0);
return
}if(i.length<f.minChars){h.hide()
}else{h.getSuggestions(i,g)
}},isExactMatch:function(g){var f=this.suggestions;
return(f.length===1&&f[0].value.toLowerCase()===g.toLowerCase())
},getQuery:function(g){var f=this.options.delimiter,h;
if(!f){return g
}h=g.split(f);
return e.trim(h[h.length-1])
},getLocation:function(){var g=this.$locationDropdown.find(":selected").parent().data("name");
var f="all";
if(g!=="all"&&!this.$locationDropdown.find(":selected").is(":first-child")){f=this.$locationDropdown.val()
}return{country:g,city:f}
},getDepartments:function(){var h=[];
var f=this.$departmentsDropdown.find("option").toArray();
for(var g=0;
g<f.length;
g++){if(f[g].selected){h.push(f[g].value)
}}return h
},isRelocation:function(){return this.$checkboxes.filter(d.relocation+":checked").val()
},isOffice:function(){return this.$checkboxes.filter(d.office+":checked").val()
},isRemote:function(){return this.$checkboxes.filter(d.remote+":checked").val()
},getSelectedParameters:function(){var f=this.getLocation();
return{country:f.country,city:f.city,department:this.getDepartments(),relocation:!!this.isRelocation(),office:!!this.isOffice(),remote:!!this.isRemote()}
},getSuggestionsLocal:function(l){var j=this,h=j.options,g=l.toLowerCase(),i=h.lookupFilter,f=parseInt(h.lookupLimit,10),k;
k={suggestions:e.grep(h.lookup,function(m){return i(m,l,g)
})};
if(f&&k.suggestions.length>f){k.suggestions=k.suggestions.slice(0,f)
}return k
},getSuggestions:function(f,g){var i,j=this,o=j.options,n=o.serviceUrl,h,k,m;
o.params[o.paramName]=f;
if(o.ignoreParams){h=null
}else{h={};
for(var l in o.params){h[l]=o.params[l]
}for(var l in g){h[l]=g[l]
}}if(o.onSearchStart.call(j.element,o.params)===false){return
}if(e.isFunction(o.lookup)){o.lookup(f,function(p){j.suggestions=p.suggestions;
j.suggest();
o.onSearchComplete.call(j.element,f,p.suggestions)
});
return
}if(j.isLocal){i=j.getSuggestionsLocal(f)
}else{if(e.isFunction(n)){n=n.call(j.element,f)
}k=n+"?"+e.param(h||{});
i=j.cachedResponse[k]
}if(i&&e.isArray(i.suggestions)){j.suggestions=i.suggestions;
j.suggest();
o.onSearchComplete.call(j.element,f,i.suggestions)
}else{j.abortAjax();
m={url:n,data:h,type:o.type,dataType:o.dataType};
e.extend(m,o.ajaxSettings);
j.currentRequest=e.ajax(m).done(function(q){var p;
j.currentRequest=null;
p=o.transformResult(q,f);
j.processResponse(p,f,k);
o.onSearchComplete.call(j.element,f,p.suggestions)
}).fail(function(p,r,q){o.onSearchError.call(j.element,f,p,r,q)
})
}},hide:function(){var g=this,f=e(g.suggestionsContainer);
if(e.isFunction(g.options.onHide)&&g.visible){g.options.onHide.call(g.element,f)
}g.visible=false;
g.selectedIndex=-1;
clearInterval(g.onChangeInterval);
e(g.suggestionsContainer).hide();
g.signalHint(null)
},suggest:function(){if(!this.suggestions.length){if(this.options.showNoSuggestionNotice){this.noSuggestions()
}else{this.hide()
}return
}var l=this,r=l.options,p=r.groupBy,n=r.formatResult,o=l.getQuery(l.currentValue),m=l.classes.suggestion,h=l.classes.selected,f=e(l.suggestionsContainer),k=e(l.noSuggestionsContainer),q=r.beforeRender,j="",g,i=function(t,u){var s=t.data[p];
if(g===s){return""
}g=s;
return r.formatGroup(t,g)
};
if(r.triggerSelectOnValidInput&&l.isExactMatch(o)){l.select(0);
return
}e.each(l.suggestions,function(t,s){if(p){j+=i(s,o,t)
}j+='<div class="'+m+'" data-index="'+t+'">'+n(s,o,t)+"</div>"
});
this.adjustContainerWidth();
k.detach();
f.html(j);
if(e.isFunction(q)){q.call(l.element,f,l.suggestions)
}l.fixPosition();
f.show();
if(r.autoSelectFirst){l.selectedIndex=0;
f.scrollTop(0);
f.children("."+m).first().addClass(h)
}l.visible=true;
l.findBestHint()
},noSuggestions:function(){var h=this,f=e(h.suggestionsContainer),g=e(h.noSuggestionsContainer);
this.adjustContainerWidth();
g.detach();
f.empty();
f.append(g);
h.fixPosition();
f.show();
h.visible=true
},adjustContainerWidth:function(){var i=this,g=i.options,h,f=e(i.suggestionsContainer);
if(g.width==="auto"){h=i.el.outerWidth();
f.css("width",h>0?h:300)
}else{if(g.width==="flex"){f.css("width","")
}}},findBestHint:function(){var g=this,h=g.el.val().toLowerCase(),f=null;
if(!h){return
}e.each(g.suggestions,function(k,j){var l=j.value.toLowerCase().indexOf(h)===0;
if(l){f=j
}return !l
});
g.signalHint(f)
},signalHint:function(g){var f="",h=this;
if(g){f=h.currentValue+g.value.substr(h.currentValue.length)
}if(h.hintValue!==f){h.hintValue=f;
h.hint=g;
(this.options.onHint||e.noop)(f)
}},verifySuggestionsFormat:function(f){if(f.length&&typeof f[0]==="string"){return e.map(f,function(g){return{value:g,data:null}
})
}return f
},validateOrientation:function(f,g){f=e.trim(f||"").toLowerCase();
if(e.inArray(f,["auto","bottom","top"])===-1){f=g
}return f
},processResponse:function(f,g,j){var i=this,h=i.options;
f.suggestions=i.verifySuggestionsFormat(f.suggestions);
if(!h.noCache){i.cachedResponse[j]=f
}if(g!==i.getQuery(i.currentValue)){return
}i.suggestions=f.suggestions;
i.suggest()
},activate:function(g){var j=this,k,i=j.classes.selected,f=e(j.suggestionsContainer),h=f.find("."+j.classes.suggestion);
f.find("."+i).removeClass(i);
j.selectedIndex=g;
if(j.selectedIndex!==-1&&h.length>j.selectedIndex){k=h.get(j.selectedIndex);
e(k).addClass(i);
return k
}return null
},selectHint:function(){var g=this,f=e.inArray(g.hint,g.suggestions);
g.select(f)
},select:function(f){var g=this;
g.hide();
g.onSelect(f);
g.disableKillerFn()
},moveUp:function(){var f=this;
if(f.selectedIndex===-1){return
}if(f.selectedIndex===0){e(f.suggestionsContainer).children().first().removeClass(f.classes.selected);
f.selectedIndex=-1;
f.el.val(f.currentValue);
f.findBestHint();
return
}f.adjustScroll(f.selectedIndex-1)
},moveDown:function(){var f=this;
if(f.selectedIndex===(f.suggestions.length-1)){return
}f.adjustScroll(f.selectedIndex+1)
},adjustScroll:function(f){var h=this,l=h.activate(f);
if(!l){return
}var g,j,k,i=e(l).outerHeight();
g=l.offsetTop;
j=e(h.suggestionsContainer).scrollTop();
k=j+h.options.maxHeight-i;
if(g<j){e(h.suggestionsContainer).scrollTop(g)
}else{if(g>k){e(h.suggestionsContainer).scrollTop(g-h.options.maxHeight+i)
}}if(!h.options.preserveInput){h.el.val(h.getValue(h.suggestions[f].value))
}h.signalHint(null)
},onSelect:function(g){var i=this,h=i.options.onSelect,f=i.suggestions[g];
i.currentValue=i.getValue(f.value);
if(i.currentValue!==i.el.val()&&!i.options.preserveInput){i.el.val(i.currentValue)
}i.signalHint(null);
i.suggestions=[];
i.selection=f;
if(e.isFunction(h)){h.call(i.element,f)
}},getValue:function(i){var h=this,f=h.options.delimiter,g,j;
if(!f){return i
}g=h.currentValue;
j=g.split(f);
if(j.length===1){return i
}return g.substr(0,g.length-j[j.length-1].length)+i
},dispose:function(){var f=this;
f.el.off(".autocomplete").removeData("autocomplete");
f.disableKillerFn();
e(window).off("resize.autocomplete",f.fixPositionCapture);
e(f.suggestionsContainer).remove()
}};
e.fn.autocomplete=e.fn.devbridgeAutocomplete=function(g,f){var h="autocomplete";
if(!arguments.length){return this.first().data(h)
}return this.each(function(){var j=e(this),i=j.data(h);
if(typeof g==="string"){if(i&&typeof i[g]==="function"){i[g](f)
}}else{if(i&&i.dispose){i.dispose()
}i=new b(this,g);
j.data(h,i)
}})
}
}));
(function(a,c,b){if(typeof define==="function"&&define.amd){define(["jquery"],function(d){b(d,a,c);
return d.mobile
})
}else{b(a.jQuery,a,c)
}}(this,document,function(c,b,a,d){(function(B,K,j,q){var J="virtualMouseBindings",f="virtualTouchID",e="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),A="clientX clientY pageX pageY screenX screenY".split(" "),G=B.event.mouseHooks?B.event.mouseHooks.props:[],C=B.event.props.concat(G),E={},L=0,w=0,v=0,t=false,O=[],l=false,V=false,y="addEventListener" in j,x=B(j),I=1,R=0,g,P;
B.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};
function u(i){while(i&&typeof i.originalEvent!=="undefined"){i=i.originalEvent
}return i
}function m(X,Y){var ag=X.type,ah,af,Z,W,ad,ac,ab,aa,ae;
X=B.Event(X);
X.type=Y;
ah=X.originalEvent;
af=B.event.props;
if(ag.search(/^(mouse|click)/)>-1){af=C
}if(ah){for(ab=af.length,W;
ab;
){W=af[--ab];
X[W]=ah[W]
}}if(ag.search(/mouse(down|up)|click/)>-1&&!X.which){X.which=1
}if(ag.search(/^touch/)!==-1){Z=u(ah);
ag=Z.touches;
ad=Z.changedTouches;
ac=(ag&&ag.length)?ag[0]:((ad&&ad.length)?ad[0]:q);
if(ac){for(aa=0,ae=A.length;
aa<ae;
aa++){W=A[aa];
X[W]=ac[W]
}}}return X
}function T(Y){var W={},i,X;
while(Y){i=B.data(Y,J);
for(X in i){if(i[X]){W[X]=W.hasVirtualBinding=true
}}Y=Y.parentNode
}return W
}function F(X,W){var i;
while(X){i=B.data(X,J);
if(i&&(!W||i[W])){return X
}X=X.parentNode
}return null
}function N(){V=false
}function o(){V=true
}function U(){R=0;
O.length=0;
l=false;
o()
}function s(){N()
}function z(){D();
L=setTimeout(function(){L=0;
U()
},B.vmouse.resetTimerDuration)
}function D(){if(L){clearTimeout(L);
L=0
}}function r(X,Y,i){var W;
if((i&&i[X])||(!i&&F(Y.target,X))){W=m(Y,X);
B(Y.target).trigger(W)
}return W
}function n(W){var X=B.data(W.target,f),i;
if(!l&&(!R||R!==X)){i=r("v"+W.type,W);
if(i){if(i.isDefaultPrevented()){W.preventDefault()
}if(i.isPropagationStopped()){W.stopPropagation()
}if(i.isImmediatePropagationStopped()){W.stopImmediatePropagation()
}}}}function S(X){var Z=u(X).touches,Y,i,W;
if(Z&&Z.length===1){Y=X.target;
i=T(Y);
if(i.hasVirtualBinding){R=I++;
B.data(Y,f,R);
D();
s();
t=false;
W=u(X).touches[0];
w=W.pageX;
v=W.pageY;
r("vmouseover",X,i);
r("vmousedown",X,i)
}}}function M(i){if(V){return
}if(!t){r("vmousecancel",i,T(i.target))
}t=true;
z()
}function h(Z){if(V){return
}var X=u(Z).touches[0],W=t,Y=B.vmouse.moveDistanceThreshold,i=T(Z.target);
t=t||(Math.abs(X.pageX-w)>Y||Math.abs(X.pageY-v)>Y);
if(t&&!W){r("vmousecancel",Z,i)
}r("vmousemove",Z,i);
z()
}function k(Y){if(V){return
}o();
var i=T(Y.target),W,X;
r("vmouseup",Y,i);
if(!t){W=r("vclick",Y,i);
if(W&&W.isDefaultPrevented()){X=u(Y).changedTouches[0];
O.push({touchID:R,x:X.clientX,y:X.clientY});
l=true
}}r("vmouseout",Y,i);
t=false;
z()
}function H(W){var X=B.data(W,J),i;
if(X){for(i in X){if(X[i]){return true
}}}return false
}function Q(){}function p(i){var W=i.substr(1);
return{setup:function(){if(!H(this)){B.data(this,J,{})
}var X=B.data(this,J);
X[i]=true;
E[i]=(E[i]||0)+1;
if(E[i]===1){x.bind(W,n)
}B(this).bind(W,Q);
if(y){E.touchstart=(E.touchstart||0)+1;
if(E.touchstart===1){x.bind("touchstart",S).bind("touchend",k).bind("touchmove",h).bind("scroll",M)
}}},teardown:function(){--E[i];
if(!E[i]){x.unbind(W,n)
}if(y){--E.touchstart;
if(!E.touchstart){x.unbind("touchstart",S).unbind("touchmove",h).unbind("touchend",k).unbind("scroll",M)
}}var X=B(this),Y=B.data(this,J);
if(Y){Y[i]=false
}X.unbind(W,Q);
if(!H(this)){X.removeData(J)
}}}
}for(P=0;
P<e.length;
P++){B.event.special[e[P]]=p(e[P])
}if(y){j.addEventListener("click",function(aa){var X=O.length,ab=aa.target,ad,ac,ae,Z,W,Y;
if(X){ad=aa.clientX;
ac=aa.clientY;
g=B.vmouse.clickDistanceThreshold;
ae=ab;
while(ae){for(Z=0;
Z<X;
Z++){W=O[Z];
Y=0;
if((ae===ab&&Math.abs(W.x-ad)<g&&Math.abs(W.y-ac)<g)||B.data(ae,f)===W.touchID){aa.preventDefault();
aa.stopPropagation();
return
}}ae=ae.parentNode
}}},true)
}})(c,b,a);
(function(e){e.mobile={}
}(c));
(function(f,g){var e={touch:"ontouchend" in a};
f.mobile.support=f.mobile.support||{};
f.extend(f.support,e);
f.extend(f.mobile.support,e)
}(c));
(function(h,m,e){var f=h(a),i=h.mobile.support.touch,j="touchmove scroll",n=i?"touchstart":"mousedown",l=i?"touchend":"mouseup",g=i?"touchmove":"mousemove";
h.each(("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop").split(" "),function(p,o){h.fn[o]=function(q){return q?this.bind(o,q):this.trigger(o)
};
if(h.attrFn){h.attrFn[o]=true
}});
function k(s,p,r,o){var q=r.type;
r.type=p;
if(o){h.event.trigger(r,e,s)
}else{h.event.dispatch.call(s,r)
}r.type=q
}h.event.special.scrollstart={enabled:true,setup:function(){var o=this,r=h(o),q,s;
function p(t,u){q=u;
k(o,q?"scrollstart":"scrollstop",t)
}r.bind(j,function(t){if(!h.event.special.scrollstart.enabled){return
}if(!q){p(t,true)
}clearTimeout(s);
s=setTimeout(function(){p(t,false)
},50)
})
},teardown:function(){h(this).unbind(j)
}};
h.event.special.tap={tapholdThreshold:750,emitTapOnTaphold:true,setup:function(){var o=this,q=h(o),p=false;
q.bind("vmousedown",function(t){p=false;
if(t.which&&t.which!==1){return false
}var s=t.target,w;
function r(){clearTimeout(w)
}function v(){r();
q.unbind("vclick",u).unbind("vmouseup",r);
f.unbind("vmousecancel",v)
}function u(x){v();
if(!p&&s===x.target){k(o,"tap",x)
}else{if(p){x.preventDefault()
}}}q.bind("vmouseup",r).bind("vclick",u);
f.bind("vmousecancel",v);
w=setTimeout(function(){if(!h.event.special.tap.emitTapOnTaphold){p=true
}k(o,"taphold",h.Event("taphold",{target:s}))
},h.event.special.tap.tapholdThreshold)
})
},teardown:function(){h(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup");
f.unbind("vmousecancel")
}};
h.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1000,horizontalDistanceThreshold:30,verticalDistanceThreshold:30,getLocation:function(r){var q=m.pageXOffset,p=m.pageYOffset,o=r.clientX,s=r.clientY;
if(r.pageY===0&&Math.floor(s)>Math.floor(r.pageY)||r.pageX===0&&Math.floor(o)>Math.floor(r.pageX)){o=o-q;
s=s-p
}else{if(s<(r.pageY-p)||o<(r.pageX-q)){o=r.pageX-q;
s=r.pageY-p
}}return{x:o,y:s}
},start:function(p){var q=p.originalEvent.touches?p.originalEvent.touches[0]:p,o=h.event.special.swipe.getLocation(q);
return{time:(new Date()).getTime(),coords:[o.x,o.y],origin:h(p.target)}
},stop:function(p){var q=p.originalEvent.touches?p.originalEvent.touches[0]:p,o=h.event.special.swipe.getLocation(q);
return{time:(new Date()).getTime(),coords:[o.x,o.y]}
},handleSwipe:function(s,p,o,q){if(p.time-s.time<h.event.special.swipe.durationThreshold&&Math.abs(s.coords[0]-p.coords[0])>h.event.special.swipe.horizontalDistanceThreshold&&Math.abs(s.coords[1]-p.coords[1])<h.event.special.swipe.verticalDistanceThreshold){var r=s.coords[0]>p.coords[0]?"swipeleft":"swiperight";
k(o,"swipe",h.Event("swipe",{target:q,swipestart:s,swipestop:p}),true);
k(o,r,h.Event(r,{target:q,swipestart:s,swipestop:p}),true);
return true
}return false
},eventInProgress:false,setup:function(){var q,o=this,r=h(o),p={};
q=h.data(this,"mobile-events");
if(!q){q={length:0};
h.data(this,"mobile-events",q)
}q.length++;
q.swipe=p;
p.start=function(u){if(h.event.special.swipe.eventInProgress){return
}h.event.special.swipe.eventInProgress=true;
var s,w=h.event.special.swipe.start(u),t=u.target,v=false;
p.move=function(x){if(!w||x.isDefaultPrevented()){return
}s=h.event.special.swipe.stop(x);
if(!v){v=h.event.special.swipe.handleSwipe(w,s,o,t);
if(v){h.event.special.swipe.eventInProgress=false
}}if(Math.abs(w.coords[0]-s.coords[0])>h.event.special.swipe.scrollSupressionThreshold){x.preventDefault()
}};
p.stop=function(){v=true;
h.event.special.swipe.eventInProgress=false;
f.off(g,p.move);
p.move=null
};
f.on(g,p.move).one(l,p.stop)
};
r.on(n,p.start)
},teardown:function(){var p,o;
p=h.data(this,"mobile-events");
if(p){o=p.swipe;
delete p.swipe;
p.length--;
if(p.length===0){h.removeData(this,"mobile-events")
}}if(o){if(o.start){h(this).off(n,o.start)
}if(o.move){f.off(g,o.move)
}if(o.stop){f.off(l,o.stop)
}}}};
h.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe.left",swiperight:"swipe.right"},function(p,o){h.event.special[p]={setup:function(){h(this).bind(o,h.noop)
},teardown:function(){h(this).unbind(o)
}}
})
})(c,this)
}));