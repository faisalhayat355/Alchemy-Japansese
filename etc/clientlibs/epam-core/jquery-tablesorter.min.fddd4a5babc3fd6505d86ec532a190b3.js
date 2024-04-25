/*! TableSorter (FORK) v2.27.6 */
;
(function(b){var a=b.tablesorter={version:"2.27.6",parsers:[],widgets:[],defaults:{theme:"default",widthFixed:false,showProcessing:false,headerTemplate:"{content}",onRenderTemplate:null,onRenderHeader:null,cancelSelection:true,tabIndex:true,dateFormat:"mmddyyyy",sortMultiSortKey:"shiftKey",sortResetKey:"ctrlKey",usNumberFormat:true,delayInit:false,serverSideSorting:false,resort:true,headers:{},ignoreCase:true,sortForce:null,sortList:[],sortAppend:null,sortStable:false,sortInitialOrder:"asc",sortLocaleCompare:false,sortReset:false,sortRestart:false,emptyTo:"bottom",stringTo:"max",duplicateSpan:true,textExtraction:"basic",textAttribute:"data-text",textSorter:null,numberSorter:null,initWidgets:true,widgetClass:"widget-{name}",widgets:[],widgetOptions:{zebra:["even","odd"]},initialized:null,tableClass:"",cssAsc:"",cssDesc:"",cssNone:"",cssHeader:"",cssHeaderRow:"",cssProcessing:"",cssChildRow:"tablesorter-childRow",cssInfoBlock:"tablesorter-infoOnly",cssNoSort:"tablesorter-noSort",cssIgnoreRow:"tablesorter-ignoreRow",cssIcon:"tablesorter-icon",cssIconNone:"",cssIconAsc:"",cssIconDesc:"",pointerClick:"click",pointerDown:"mousedown",pointerUp:"mouseup",selectorHeaders:"> thead th, > thead td",selectorSort:"th, td",selectorRemove:".remove-me",debug:false,headerList:[],empties:{},strings:{},parsers:[]},css:{table:"tablesorter",cssHasChild:"tablesorter-hasChildRow",childRow:"tablesorter-childRow",colgroup:"tablesorter-colgroup",header:"tablesorter-header",headerRow:"tablesorter-headerRow",headerIn:"tablesorter-header-inner",icon:"tablesorter-icon",processing:"tablesorter-processing",sortAsc:"tablesorter-headerAsc",sortDesc:"tablesorter-headerDesc",sortNone:"tablesorter-headerUnSorted"},language:{sortAsc:"Ascending sort applied, ",sortDesc:"Descending sort applied, ",sortNone:"No sort applied, ",sortDisabled:"sorting is disabled",nextAsc:"activate to apply an ascending sort",nextDesc:"activate to apply a descending sort",nextNone:"activate to remove the sort"},regex:{templateContent:/\{content\}/g,templateIcon:/\{icon\}/g,templateName:/\{name\}/i,spaces:/\s+/g,nonWord:/\W/g,formElements:/(input|select|button|textarea)/i,chunk:/(^([+\-]?(?:\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,chunks:/(^\\0|\\0$)/,hex:/^0x[0-9a-f]+$/i,comma:/,/g,digitNonUS:/[\s|\.]/g,digitNegativeTest:/^\s*\([.\d]+\)/,digitNegativeReplace:/^\s*\(([.\d]+)\)/,digitTest:/^[\-+(]?\d+[)]?$/,digitReplace:/[,.'"\s]/g},string:{max:1,min:-1,emptymin:1,emptymax:-1,zero:0,none:0,"null":0,top:true,bottom:false},keyCodes:{enter:13},dates:{},instanceMethods:{},setup:function(f,h){if(!f||!f.tHead||f.tBodies.length===0||f.hasInitialized===true){if(h.debug){if(f.hasInitialized){console.warn("Stopping initialization. Tablesorter has already been initialized")
}else{console.error("Stopping initialization! No table, thead or tbody",f)
}}return
}var e="",d=b(f),g=b.metadata;
f.hasInitialized=false;
f.isProcessing=true;
f.config=h;
b.data(f,"tablesorter",h);
if(h.debug){console[console.group?"group":"log"]("Initializing tablesorter");
b.data(f,"startoveralltimer",new Date())
}h.supportsDataObject=(function(c){c[0]=parseInt(c[0],10);
return(c[0]>1)||(c[0]===1&&parseInt(c[1],10)>=4)
})(b.fn.jquery.split("."));
h.emptyTo=h.emptyTo.toLowerCase();
h.stringTo=h.stringTo.toLowerCase();
h.last={sortList:[],clickedIndex:-1};
if(!/tablesorter\-/.test(d.attr("class"))){e=(h.theme!==""?" tablesorter-"+h.theme:"")
}h.table=f;
h.$table=d.addClass(a.css.table+" "+h.tableClass+e).attr("role","grid");
h.$headers=d.find(h.selectorHeaders);
if(!h.namespace){h.namespace=".tablesorter"+Math.random().toString(16).slice(2)
}else{h.namespace="."+h.namespace.replace(a.regex.nonWord,"")
}h.$table.children().children("tr").attr("role","row");
h.$tbodies=d.children("tbody:not(."+h.cssInfoBlock+")").attr({"aria-live":"polite","aria-relevant":"all"});
if(h.$table.children("caption").length){e=h.$table.children("caption")[0];
if(!e.id){e.id=h.namespace.slice(1)+"caption"
}h.$table.attr("aria-labelledby",e.id)
}h.widgetInit={};
h.textExtraction=h.$table.attr("data-text-extraction")||h.textExtraction||"basic";
a.buildHeaders(h);
a.fixColumnWidth(f);
a.addWidgetFromClass(f);
a.applyWidgetOptions(f);
a.setupParsers(h);
h.totalRows=0;
if(!h.delayInit){a.buildCache(h)
}a.bindEvents(f,h.$headers,true);
a.bindMethods(h);
if(h.supportsDataObject&&typeof d.data().sortlist!=="undefined"){h.sortList=d.data().sortlist
}else{if(g&&(d.metadata()&&d.metadata().sortlist)){h.sortList=d.metadata().sortlist
}}a.applyWidget(f,true);
if(h.sortList.length>0){a.sortOn(h,h.sortList,{},!h.initWidgets)
}else{a.setHeadersCss(h);
if(h.initWidgets){a.applyWidget(f,false)
}}if(h.showProcessing){d.unbind("sortBegin"+h.namespace+" sortEnd"+h.namespace).bind("sortBegin"+h.namespace+" sortEnd"+h.namespace,function(c){clearTimeout(h.timerProcessing);
a.isProcessing(f);
if(c.type==="sortBegin"){h.timerProcessing=setTimeout(function(){a.isProcessing(f,true)
},500)
}})
}f.hasInitialized=true;
f.isProcessing=false;
if(h.debug){console.log("Overall initialization time: "+a.benchmark(b.data(f,"startoveralltimer")));
if(h.debug&&console.groupEnd){console.groupEnd()
}}d.triggerHandler("tablesorter-initialized",f);
if(typeof h.initialized==="function"){h.initialized(f)
}},bindMethods:function(g){var d=g.$table,f=g.namespace,e=("sortReset update updateRows updateAll updateHeaders addRows updateCell updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave ").split(" ").join(f+" ");
d.unbind(e.replace(a.regex.spaces," ")).bind("sortReset"+f,function(c,h){c.stopPropagation();
a.sortReset(this.config,h)
}).bind("updateAll"+f,function(h,c,i){h.stopPropagation();
a.updateAll(this.config,c,i)
}).bind("update"+f+" updateRows"+f,function(h,c,i){h.stopPropagation();
a.update(this.config,c,i)
}).bind("updateHeaders"+f,function(c,h){c.stopPropagation();
a.updateHeaders(this.config,h)
}).bind("updateCell"+f,function(i,c,h,j){i.stopPropagation();
a.updateCell(this.config,c,h,j)
}).bind("addRows"+f,function(i,c,h,j){i.stopPropagation();
a.addRows(this.config,c,h,j)
}).bind("updateComplete"+f,function(){this.isUpdating=false
}).bind("sorton"+f,function(h,c,j,i){h.stopPropagation();
a.sortOn(this.config,c,j,i)
}).bind("appendCache"+f,function(c,i,h){c.stopPropagation();
a.appendCache(this.config,h);
if(b.isFunction(i)){i(this)
}}).bind("updateCache"+f,function(h,i,c){h.stopPropagation();
a.updateCache(this.config,i,c)
}).bind("applyWidgetId"+f,function(c,h){c.stopPropagation();
a.applyWidgetId(this,h)
}).bind("applyWidgets"+f,function(c,h){c.stopPropagation();
a.applyWidget(this,h)
}).bind("refreshWidgets"+f,function(i,h,c){i.stopPropagation();
a.refreshWidgets(this,h,c)
}).bind("removeWidget"+f,function(i,c,h){i.stopPropagation();
a.removeWidget(this,c,h)
}).bind("destroy"+f,function(h,c,i){h.stopPropagation();
a.destroy(this,c,i)
}).bind("resetToLoadState"+f,function(c){c.stopPropagation();
a.removeWidget(this,true,false);
g=b.extend(true,a.defaults,g.originalSettings);
this.hasInitialized=false;
a.setup(this,g)
})
},bindEvents:function(i,h,d){i=b(i)[0];
var f,j=i.config,g=j.namespace,e=null;
if(d!==true){h.addClass(g.slice(1)+"_extra_headers");
f=b.fn.closest?h.closest("table")[0]:h.parents("table")[0];
if(f&&f.nodeName==="TABLE"&&f!==i){b(f).addClass(g.slice(1)+"_extra_table")
}}f=(j.pointerDown+" "+j.pointerUp+" "+j.pointerClick+" sort keyup ").replace(a.regex.spaces," ").split(" ").join(g+" ");
h.find(j.selectorSort).add(h.filter(j.selectorSort)).unbind(f).bind(f,function(o,p){var n,k,l,c=b(o.target),m=" "+o.type+" ";
if(((o.which||o.button)!==1&&!m.match(" "+j.pointerClick+" | sort | keyup "))||(m===" keyup "&&o.which!==a.keyCodes.enter)||(m.match(" "+j.pointerClick+" ")&&typeof o.which!=="undefined")){return
}if(m.match(" "+j.pointerUp+" ")&&e!==o.target&&p!==true){return
}if(m.match(" "+j.pointerDown+" ")){e=o.target;
l=c.jquery.split(".");
if(l[0]==="1"&&l[1]<4){o.preventDefault()
}return
}e=null;
if(a.regex.formElements.test(o.target.nodeName)||c.hasClass(j.cssNoSort)||c.parents("."+j.cssNoSort).length>0||c.parents("button").length>0){return !j.cancelSelection
}if(j.delayInit&&a.isEmptyObject(j.cache)){a.buildCache(j)
}n=b.fn.closest?b(this).closest("th, td"):/TH|TD/.test(this.nodeName)?b(this):b(this).parents("th, td");
l=h.index(n);
j.last.clickedIndex=(l<0)?n.attr("data-column"):l;
k=j.$headers[j.last.clickedIndex];
if(k&&!k.sortDisabled){a.initSort(j,k,o)
}});
if(j.cancelSelection){h.attr("unselectable","on").bind("selectstart",false).css({"user-select":"none",MozUserSelect:"none"})
}},buildHeaders:function(h){var f,d,g,e;
h.headerList=[];
h.headerContent=[];
h.sortVars=[];
if(h.debug){g=new Date()
}h.columns=a.computeColumnIndex(h.$table.children("thead, tfoot").children("tr"));
d=h.cssIcon?'<i class="'+(h.cssIcon===a.css.icon?a.css.icon:h.cssIcon+" "+a.css.icon)+'"></i>':"";
h.$headers=b(b.map(h.$table.find(h.selectorHeaders),function(n,i){var m,o,l,k,j,c=b(n);
if(c.parent().hasClass(h.cssIgnoreRow)){return
}m=a.getColumnData(h.table,h.headers,i,true);
h.headerContent[i]=c.html();
if(h.headerTemplate!==""&&!c.find("."+a.css.headerIn).length){k=h.headerTemplate.replace(a.regex.templateContent,c.html()).replace(a.regex.templateIcon,c.find("."+a.css.icon).length?"":d);
if(h.onRenderTemplate){o=h.onRenderTemplate.apply(c,[i,k]);
if(o&&typeof o==="string"){k=o
}}c.html('<div class="'+a.css.headerIn+'">'+k+"</div>")
}if(h.onRenderHeader){h.onRenderHeader.apply(c,[i,h,h.$table])
}l=parseInt(c.attr("data-column"),10);
n.column=l;
j=a.getOrder(a.getData(c,m,"sortInitialOrder")||h.sortInitialOrder);
h.sortVars[l]={count:-1,order:j?(h.sortReset?[1,0,2]:[1,0]):(h.sortReset?[0,1,2]:[0,1]),lockedOrder:false};
j=a.getData(c,m,"lockedOrder")||false;
if(typeof j!=="undefined"&&j!==false){h.sortVars[l].lockedOrder=true;
h.sortVars[l].order=a.getOrder(j)?[1,1]:[0,0]
}h.headerList[i]=n;
c.addClass(a.css.header+" "+h.cssHeader).parent().addClass(a.css.headerRow+" "+h.cssHeaderRow).attr("role","row");
if(h.tabIndex){c.attr("tabindex",0)
}return n
}));
h.$headerIndexed=[];
for(e=0;
e<h.columns;
e++){if(a.isEmptyObject(h.sortVars[e])){h.sortVars[e]={}
}f=h.$headers.filter('[data-column="'+e+'"]');
h.$headerIndexed[e]=f.length?f.not(".sorter-false").length?f.not(".sorter-false").filter(":last"):f.filter(":last"):b()
}h.$table.find(h.selectorHeaders).attr({scope:"col",role:"columnheader"});
a.updateHeader(h);
if(h.debug){console.log("Built headers:"+a.benchmark(g));
console.log(h.$headers)
}},addInstanceMethods:function(c){b.extend(a.instanceMethods,c)
},setupParsers:function(u,i){var j,t,o,p,m,v,q,e,h,f,n,g,d,r,s=u.table,k=0,l={};
u.$tbodies=u.$table.children("tbody:not(."+u.cssInfoBlock+")");
d=typeof i==="undefined"?u.$tbodies:i;
r=d.length;
if(r===0){return u.debug?console.warn("Warning: *Empty table!* Not building a parser cache"):""
}else{if(u.debug){g=new Date();
console[console.group?"group":"log"]("Detecting parsers for each column")
}}t={extractors:[],parsers:[]};
while(k<r){j=d[k].rows;
if(j.length){m=0;
p=u.columns;
for(v=0;
v<p;
v++){q=u.$headerIndexed[m];
if(q&&q.length){e=a.getColumnData(s,u.headers,m);
n=a.getParserById(a.getData(q,e,"extractor"));
f=a.getParserById(a.getData(q,e,"sorter"));
h=a.getData(q,e,"parser")==="false";
u.empties[m]=(a.getData(q,e,"empty")||u.emptyTo||(u.emptyToBottom?"bottom":"top")).toLowerCase();
u.strings[m]=(a.getData(q,e,"string")||u.stringTo||"max").toLowerCase();
if(h){f=a.getParserById("no-parser")
}if(!n){n=false
}if(!f){f=a.detectParserForColumn(u,j,-1,m)
}if(u.debug){l["("+m+") "+q.text()]={parser:f.id,extractor:n?n.id:"none",string:u.strings[m],empty:u.empties[m]}
}t.parsers[m]=f;
t.extractors[m]=n;
o=q[0].colSpan-1;
if(o>0){m+=o;
p+=o;
while(o+1>0){t.parsers[m-o]=f;
t.extractors[m-o]=n;
o--
}}}m++
}}k+=(t.parsers.length)?r:1
}if(u.debug){if(!a.isEmptyObject(l)){console[console.table?"table":"log"](l)
}else{console.warn("  No parsers detected!")
}console.log("Completed detecting parsers"+a.benchmark(g));
if(console.groupEnd){console.groupEnd()
}}u.parsers=t.parsers;
u.extractors=t.extractors
},addParser:function(f){var d,c=a.parsers.length,e=true;
for(d=0;
d<c;
d++){if(a.parsers[d].id.toLowerCase()===f.id.toLowerCase()){e=false
}}if(e){a.parsers[a.parsers.length]=f
}},getParserById:function(d){if(d=="false"){return false
}var e,c=a.parsers.length;
for(e=0;
e<c;
e++){if(a.parsers[e].id.toLowerCase()===(d.toString()).toLowerCase()){return a.parsers[e]
}}return false
},detectParserForColumn:function(h,n,j,i){var k,d,m,f=a.parsers.length,e=false,g="",l=true;
while(g===""&&l){j++;
m=n[j];
if(m&&j<50){if(m.className.indexOf(a.cssIgnoreRow)<0){e=n[j].cells[i];
g=a.getElementText(h,e,i);
d=b(e);
if(h.debug){console.log("Checking if value was empty on row "+j+", column: "+i+': "'+g+'"')
}}}else{l=false
}}while(--f>=0){k=a.parsers[f];
if(k&&k.id!=="text"&&k.is&&k.is(g,h.table,e,d)){return k
}}return a.getParserById("text")
},getElementText:function(i,h,e){if(!h){return""
}var f,g=i.textExtraction||"",d=h.jquery?h:b(h);
if(typeof g==="string"){if(g==="basic"&&typeof(f=d.attr(i.textAttribute))!=="undefined"){return b.trim(f)
}return b.trim(h.textContent||d.text())
}else{if(typeof g==="function"){return b.trim(g(d[0],i.table,e))
}else{if(typeof(f=a.getColumnData(i.table,g,e))==="function"){return b.trim(f(d[0],i.table,e))
}}}return b.trim(d[0].textContent||d.text())
},getParsedText:function(j,e,f,d){if(typeof d==="undefined"){d=a.getElementText(j,e,f)
}var h=""+d,i=j.parsers[f],g=j.extractors[f];
if(i){if(g&&typeof g.format==="function"){d=g.format(d,j.table,e,f)
}h=i.id==="no-parser"?"":i.format(""+d,j.table,e,f);
if(j.ignoreCase&&typeof h==="string"){h=h.toLowerCase()
}}return h
},buildCache:function(C,e,j){var r,D,q,m,s,p,u,v,n,A,d,g,k,l,o,w,y,f,t,x,z,i,B=C.table,h=C.parsers;
C.$tbodies=C.$table.children("tbody:not(."+C.cssInfoBlock+")");
u=typeof j==="undefined"?C.$tbodies:j,C.cache={};
C.totalRows=0;
if(!h){return C.debug?console.warn("Warning: *Empty table!* Not building a cache"):""
}if(C.debug){g=new Date()
}if(C.showProcessing){a.isProcessing(B,true)
}for(p=0;
p<u.length;
p++){w=[];
r=C.cache[p]={normalized:[]};
k=(u[p]&&u[p].rows.length)||0;
for(m=0;
m<k;
++m){l={child:[],raw:[]};
v=b(u[p].rows[m]);
n=[];
if(v.hasClass(C.selectorRemove.slice(1))){continue
}if(v.hasClass(C.cssChildRow)&&m!==0){z=r.normalized.length-1;
o=r.normalized[z][C.columns];
o.$row=o.$row.add(v);
if(!v.prev().hasClass(C.cssChildRow)){v.prev().addClass(a.css.cssHasChild)
}A=v.children("th, td");
z=o.child.length;
o.child[z]=[];
f=0;
x=C.columns;
for(s=0;
s<x;
s++){d=A[s];
if(d){o.child[z][s]=a.getParsedText(C,d,s);
y=A[s].colSpan-1;
if(y>0){f+=y;
x+=y
}}f++
}continue
}l.$row=v;
l.order=m;
f=0;
x=C.columns;
for(s=0;
s<x;
++s){d=v[0].cells[s];
if(d&&f<C.columns){t=typeof h[f]!=="undefined";
if(!t&&C.debug){console.warn("No parser found for row: "+m+", column: "+s+'; cell containing: "'+b(d).text()+'"; does it have a header?')
}D=a.getElementText(C,d,f);
l.raw[f]=D;
q=a.getParsedText(C,d,f,D);
n[f]=q;
if(t&&(h[f].type||"").toLowerCase()==="numeric"){w[f]=Math.max(Math.abs(q)||0,w[f]||0)
}y=d.colSpan-1;
if(y>0){i=0;
while(i<=y){q=C.duplicateSpan||i===0?D:typeof C.textExtraction!=="string"?a.getElementText(C,d,f+i)||"":"";
l.raw[f+i]=q;
n[f+i]=q;
i++
}f+=y;
x+=y
}}f++
}n[C.columns]=l;
r.normalized[r.normalized.length]=n
}r.colMax=w;
C.totalRows+=r.normalized.length
}if(C.showProcessing){a.isProcessing(B)
}if(C.debug){z=Math.min(5,C.cache[0].normalized.length);
console[console.group?"group":"log"]("Building cache for "+C.totalRows+" rows (showing "+z+" rows in log) and "+C.columns+" columns"+a.benchmark(g));
D={};
for(s=0;
s<C.columns;
s++){for(f=0;
f<z;
f++){if(!D["row: "+f]){D["row: "+f]={}
}D["row: "+f][C.$headerIndexed[s].text()]=C.cache[0].normalized[f][s]
}}console[console.table?"table":"log"](D);
if(console.groupEnd){console.groupEnd()
}}if(b.isFunction(e)){e(B)
}},getColumnText:function(r,d,f,u){r=b(r)[0];
var o,j,p,i,m,g,n,k,h,l,q=typeof f==="function",e=d==="all",t={raw:[],parsed:[],$cell:[]},s=r.config;
if(a.isEmptyObject(s)){if(s.debug){console.warn("No cache found - aborting getColumnText function!")
}}else{m=s.$tbodies.length;
for(o=0;
o<m;
o++){p=s.cache[o].normalized;
g=p.length;
for(j=0;
j<g;
j++){i=p[j];
if(u&&!i[s.columns].$row.is(u)){continue
}l=true;
k=(e)?i.slice(0,s.columns):i[d];
i=i[s.columns];
n=(e)?i.raw:i.raw[d];
h=(e)?i.$row.children():i.$row.children().eq(d);
if(q){l=f({tbodyIndex:o,rowIndex:j,parsed:k,raw:n,$row:i.$row,$cell:h})
}if(l!==false){t.parsed[t.parsed.length]=k;
t.raw[t.raw.length]=n;
t.$cell[t.$cell.length]=h
}}}return t
}},setHeadersCss:function(l){var e,g,f,j=l.sortList,i=j.length,n=a.css.sortNone+" "+l.cssNone,h=[a.css.sortAsc+" "+l.cssAsc,a.css.sortDesc+" "+l.cssDesc],d=[l.cssIconAsc,l.cssIconDesc,l.cssIconNone],m=["ascending","descending"],k=l.$table.find("tfoot tr").children("td, th").add(b(l.namespace+"_extra_headers")).removeClass(h.join(" "));
l.$headers.removeClass(h.join(" ")).addClass(n).attr("aria-sort","none").find("."+a.css.icon).removeClass(d.join(" ")).addClass(d[2]);
for(g=0;
g<i;
g++){if(j[g][1]!==2){e=l.$headers.filter(function(r){var c=true,q=l.$headers.eq(r),p=parseInt(q.attr("data-column"),10),o=p+l.$headers[r].colSpan;
for(;
p<o;
p++){c=c?c||a.isValueInArray(p,l.sortList)>-1:false
}return c
});
e=e.not(".sorter-false").filter('[data-column="'+j[g][0]+'"]'+(i===1?":last":""));
if(e.length){for(f=0;
f<e.length;
f++){if(!e[f].sortDisabled){e.eq(f).removeClass(n).addClass(h[j[g][1]]).attr("aria-sort",m[j[g][1]]).find("."+a.css.icon).removeClass(d[2]).addClass(d[j[g][1]])
}}if(k.length){k.filter('[data-column="'+j[g][0]+'"]').removeClass(n).addClass(h[j[g][1]])
}}}}i=l.$headers.length;
for(g=0;
g<i;
g++){a.setColumnAriaLabel(l,l.$headers.eq(g))
}},setColumnAriaLabel:function(j,e,i){if(e.length){var g=parseInt(e.attr("data-column"),10),h=j.sortVars[g],f=e.hasClass(a.css.sortAsc)?"sortAsc":e.hasClass(a.css.sortDesc)?"sortDesc":"sortNone",d=b.trim(e.text())+": "+a.language[f];
if(e.hasClass("sorter-false")||i===false){d+=a.language.sortDisabled
}else{f=(h.count+1)%h.order.length;
i=h.order[f];
d+=a.language[i===0?"nextAsc":i===1?"nextDesc":"nextNone"]
}e.attr("aria-label",d)
}},updateHeader:function(j){var h,e,f,g,i=j.table,d=j.$headers.length;
for(h=0;
h<d;
h++){f=j.$headers.eq(h);
g=a.getColumnData(i,j.headers,h,true);
e=a.getData(f,g,"sorter")==="false"||a.getData(f,g,"parser")==="false";
a.setColumnSort(j,f,e)
}},setColumnSort:function(g,e,d){var f=g.table.id;
e[0].sortDisabled=d;
e[d?"addClass":"removeClass"]("sorter-false").attr("aria-disabled",""+d);
if(g.tabIndex){if(d){e.removeAttr("tabindex")
}else{e.attr("tabindex","0")
}}if(f){if(d){e.removeAttr("aria-controls")
}else{e.attr("aria-controls",f)
}}},updateHeaderSortCount:function(m,l){var e,h,n,j,g,o,d,f,i=l||m.sortList,k=i.length;
m.sortList=[];
for(j=0;
j<k;
j++){d=i[j];
e=parseInt(d[0],10);
if(e<m.columns){if(!m.sortVars[e].order){if(a.getOrder(m.sortInitialOrder)){f=m.sortReset?[1,0,2]:[1,0]
}else{f=m.sortReset?[0,1,2]:[0,1]
}m.sortVars[e].order=f;
m.sortVars[e].count=0
}f=m.sortVars[e].order;
h=(""+d[1]).match(/^(1|d|s|o|n)/);
h=h?h[0]:"";
switch(h){case"1":case"d":h=1;
break;
case"s":h=g||0;
break;
case"o":o=f[(g||0)%f.length];
h=o===0?1:o===1?0:2;
break;
case"n":h=f[(++m.sortVars[e].count)%f.length];
break;
default:h=0;
break
}g=j===0?h:g;
n=[e,parseInt(h,10)||0];
m.sortList[m.sortList.length]=n;
h=b.inArray(n[1],f);
m.sortVars[e].count=h>=0?h:n[1]%f.length
}}},updateAll:function(g,d,f){var e=g.table;
e.isUpdating=true;
a.refreshWidgets(e,true,true);
a.buildHeaders(g);
a.bindEvents(e,g.$headers,true);
a.bindMethods(g);
a.commonUpdate(g,d,f)
},update:function(g,d,f){var e=g.table;
e.isUpdating=true;
a.updateHeader(g);
a.commonUpdate(g,d,f)
},updateHeaders:function(e,d){e.table.isUpdating=true;
a.buildHeaders(e);
a.bindEvents(e.table,e.$headers,true);
a.resortComplete(e,d)
},updateCell:function(l,p,k,q){if(a.isEmptyObject(l.cache)){a.updateHeader(l);
a.commonUpdate(l,k,q);
return
}l.table.isUpdating=true;
l.$table.find(l.selectorRemove).remove();
var f,h,r,o,d,i,g=l.$tbodies,n=b(p),m=g.index(b.fn.closest?n.closest("tbody"):n.parents("tbody").filter(":first")),e=l.cache[m],j=b.fn.closest?n.closest("tr"):n.parents("tr").filter(":first");
p=n[0];
if(g.length&&m>=0){r=g.eq(m).find("tr").index(j);
d=e.normalized[r];
i=j[0].cells.length;
if(i!==l.columns){o=0;
f=false;
for(h=0;
h<i;
h++){if(!f&&j[0].cells[h]!==p){o+=j[0].cells[h].colSpan
}else{f=true
}}}else{o=n.index()
}f=a.getElementText(l,p,o);
d[l.columns].raw[o]=f;
f=a.getParsedText(l,p,o,f);
d[o]=f;
d[l.columns].$row=j;
if((l.parsers[o].type||"").toLowerCase()==="numeric"){e.colMax[o]=Math.max(Math.abs(f)||0,e.colMax[o]||0)
}f=k!=="undefined"?k:l.resort;
if(f!==false){a.checkResort(l,f,q)
}else{a.resortComplete(l,q)
}}else{if(l.debug){console.error("updateCell aborted, tbody missing or not within the indicated table")
}l.table.isUpdating=false
}},addRows:function(u,p,f,g){var n,v,m,l,k,i,s,q,h,j,e,d,r,o=typeof p==="string"&&u.$tbodies.length===1&&/<tr/.test(p||""),t=u.table;
if(o){p=b(p);
u.$tbodies.append(p)
}else{if(!p||!(p instanceof jQuery)||(b.fn.closest?p.closest("table")[0]:p.parents("table")[0])!==u.table){if(u.debug){console.error("addRows method requires (1) a jQuery selector reference to rows that have already been added to the table, or (2) row HTML string to be added to a table with only one tbody")
}return false
}}t.isUpdating=true;
if(a.isEmptyObject(u.cache)){a.updateHeader(u);
a.commonUpdate(u,f,g)
}else{k=p.filter("tr").attr("role","row").length;
m=u.$tbodies.index(p.parents("tbody").filter(":first"));
if(!(u.parsers&&u.parsers.length)){a.setupParsers(u)
}for(l=0;
l<k;
l++){h=0;
s=p[l].cells.length;
q=u.cache[m].normalized.length;
e=[];
j={child:[],raw:[],$row:p.eq(l),order:q};
for(i=0;
i<s;
i++){d=p[l].cells[i];
n=a.getElementText(u,d,h);
j.raw[h]=n;
v=a.getParsedText(u,d,h,n);
e[h]=v;
if((u.parsers[h].type||"").toLowerCase()==="numeric"){u.cache[m].colMax[h]=Math.max(Math.abs(v)||0,u.cache[m].colMax[h]||0)
}r=d.colSpan-1;
if(r>0){h+=r
}h++
}e[u.columns]=j;
u.cache[m].normalized[q]=e
}a.checkResort(u,f,g)
}},updateCache:function(f,e,d){if(!(f.parsers&&f.parsers.length)){a.setupParsers(f,d)
}a.buildCache(f,e,d)
},appendCache:function(h,p){var i,n,f,e,j,k,m,o=h.table,l=h.widgetOptions,g=h.$tbodies,q=[],d=h.cache;
if(a.isEmptyObject(d)){return h.appender?h.appender(o,q):o.isUpdating?h.$table.triggerHandler("updateComplete",o):""
}if(h.debug){m=new Date()
}for(k=0;
k<g.length;
k++){f=g.eq(k);
if(f.length){e=a.processTbody(o,f,true);
i=d[k].normalized;
n=i.length;
for(j=0;
j<n;
j++){q[q.length]=i[j][h.columns].$row;
if(!h.appender||(h.pager&&(!h.pager.removeRows||!l.pager_removeRows)&&!h.pager.ajax)){e.append(i[j][h.columns].$row)
}}a.processTbody(o,e,false)
}}if(h.appender){h.appender(o,q)
}if(h.debug){console.log("Rebuilt table"+a.benchmark(m))
}if(!p&&!h.appender){a.applyWidget(o)
}if(o.isUpdating){h.$table.triggerHandler("updateComplete",o)
}},commonUpdate:function(f,d,e){f.$table.find(f.selectorRemove).remove();
a.setupParsers(f);
a.buildCache(f);
a.checkResort(f,d,e)
},initSort:function(o,p,e){if(o.table.isUpdating){return setTimeout(function(){a.initSort(o,p,e)
},50)
}var n,l,f,j,q,k,d,g=!e[o.sortMultiSortKey],r=o.table,m=o.$headers.length,h=parseInt(b(p).attr("data-column"),10),i=o.sortVars[h].order;
o.$table.triggerHandler("sortStart",r);
k=(o.sortVars[h].count+1)%i.length;
o.sortVars[h].count=e[o.sortResetKey]?2:k;
if(o.sortRestart){for(f=0;
f<m;
f++){d=o.$headers.eq(f);
k=parseInt(d.attr("data-column"),10);
if(h!==k&&(g||d.hasClass(a.css.sortNone))){o.sortVars[k].count=-1
}}}if(g){o.sortList=[];
o.last.sortList=[];
if(o.sortForce!==null){n=o.sortForce;
for(l=0;
l<n.length;
l++){if(n[l][0]!==h){o.sortList[o.sortList.length]=n[l]
}}}j=i[o.sortVars[h].count];
if(j<2){o.sortList[o.sortList.length]=[h,j];
if(p.colSpan>1){for(l=1;
l<p.colSpan;
l++){o.sortList[o.sortList.length]=[h+l,j];
o.sortVars[h+l].count=b.inArray(j,i)
}}}}else{o.sortList=b.extend([],o.last.sortList);
if(a.isValueInArray(h,o.sortList)>=0){for(l=0;
l<o.sortList.length;
l++){k=o.sortList[l];
if(k[0]===h){k[1]=i[o.sortVars[h].count];
if(k[1]===2){o.sortList.splice(l,1);
o.sortVars[h].count=-1
}}}}else{j=i[o.sortVars[h].count];
if(j<2){o.sortList[o.sortList.length]=[h,j];
if(p.colSpan>1){for(l=1;
l<p.colSpan;
l++){o.sortList[o.sortList.length]=[h+l,j];
o.sortVars[h+l].count=b.inArray(j,i)
}}}}}o.last.sortList=b.extend([],o.sortList);
if(o.sortList.length&&o.sortAppend){n=b.isArray(o.sortAppend)?o.sortAppend:o.sortAppend[o.sortList[0][0]];
if(!a.isEmptyObject(n)){for(l=0;
l<n.length;
l++){if(n[l][0]!==h&&a.isValueInArray(n[l][0],o.sortList)<0){j=n[l][1];
q=(""+j).match(/^(a|d|s|o|n)/);
if(q){k=o.sortList[0][1];
switch(q[0]){case"d":j=1;
break;
case"s":j=k;
break;
case"o":j=k===0?1:0;
break;
case"n":j=(k+1)%i.length;
break;
default:j=0;
break
}}o.sortList[o.sortList.length]=[n[l][0],j]
}}}}o.$table.triggerHandler("sortBegin",r);
setTimeout(function(){a.setHeadersCss(o);
a.multisort(o);
a.appendCache(o);
o.$table.triggerHandler("sortBeforeEnd",r);
o.$table.triggerHandler("sortEnd",r)
},1)
},multisort:function(i){var j,p,f,o,g,l=i.table,n=[],d=0,k=i.textSorter||"",e=i.sortList,m=e.length,h=i.$tbodies.length;
if(i.serverSideSorting||a.isEmptyObject(i.cache)){return
}if(i.debug){p=new Date()
}if(typeof k==="object"){f=i.columns;
while(f--){g=a.getColumnData(l,k,f);
if(typeof g==="function"){n[f]=g
}}}for(j=0;
j<h;
j++){f=i.cache[j].colMax;
o=i.cache[j].normalized;
o.sort(function(w,v){var s,t,c,q,r,z,u;
for(s=0;
s<m;
s++){c=e[s][0];
q=e[s][1];
d=q===0;
if(i.sortStable&&w[c]===v[c]&&m===1){return w[i.columns].order-v[i.columns].order
}t=/n/i.test(a.getSortType(i.parsers,c));
if(t&&i.strings[c]){if(typeof(a.string[i.strings[c]])==="boolean"){t=(d?1:-1)*(a.string[i.strings[c]]?-1:1)
}else{t=(i.strings[c])?a.string[i.strings[c]]||0:0
}r=i.numberSorter?i.numberSorter(w[c],v[c],d,f[c],l):a["sortNumeric"+(d?"Asc":"Desc")](w[c],v[c],t,f[c],c,i)
}else{z=d?w:v;
u=d?v:w;
if(typeof k==="function"){r=k(z[c],u[c],d,c,l)
}else{if(typeof n[c]==="function"){r=n[c](z[c],u[c],d,c,l)
}else{r=a["sortNatural"+(d?"Asc":"Desc")](w[c],v[c],c,i)
}}}if(r){return r
}}return w[i.columns].order-v[i.columns].order
})
}if(i.debug){console.log("Applying sort "+e.toString()+a.benchmark(p))
}},resortComplete:function(e,d){if(e.table.isUpdating){e.$table.triggerHandler("updateComplete",e.table)
}if(b.isFunction(d)){d(e.table)
}},checkResort:function(h,e,g){var d=b.isArray(e)?e:h.sortList,f=typeof e==="undefined"?h.resort:e;
if(f!==false&&!h.serverSideSorting&&!h.table.isProcessing){if(d.length){a.sortOn(h,d,function(){a.resortComplete(h,g)
},true)
}else{a.sortReset(h,function(){a.resortComplete(h,g);
a.applyWidget(h.table,false)
})
}}else{a.resortComplete(h,g);
a.applyWidget(h.table,false)
}},sortOn:function(h,e,g,f){var d=h.table;
h.$table.triggerHandler("sortStart",d);
a.updateHeaderSortCount(h,e);
a.setHeadersCss(h);
if(h.delayInit&&a.isEmptyObject(h.cache)){a.buildCache(h)
}h.$table.triggerHandler("sortBegin",d);
a.multisort(h);
a.appendCache(h,f);
h.$table.triggerHandler("sortBeforeEnd",d);
h.$table.triggerHandler("sortEnd",d);
a.applyWidget(d);
if(b.isFunction(g)){g(d)
}},sortReset:function(e,d){e.sortList=[];
a.setHeadersCss(e);
a.multisort(e);
a.appendCache(e);
if(b.isFunction(d)){d(e.table)
}},getSortType:function(c,d){return(c&&c[d])?c[d].type||"":""
},getOrder:function(c){return(/^d/i.test(c)||c===1)
},sortNatural:function(i,f){if(i===f){return 0
}var d,k,j,c,e,g,h=a.regex;
if(h.hex.test(f)){d=parseInt((i||"").match(h.hex),16);
k=parseInt((f||"").match(h.hex),16);
if(d<k){return -1
}if(d>k){return 1
}}d=(i||"").replace(h.chunk,"\\0$1\\0").replace(h.chunks,"").split("\\0");
k=(f||"").replace(h.chunk,"\\0$1\\0").replace(h.chunks,"").split("\\0");
g=Math.max(d.length,k.length);
for(e=0;
e<g;
e++){j=isNaN(d[e])?d[e]||0:parseFloat(d[e])||0;
c=isNaN(k[e])?k[e]||0:parseFloat(k[e])||0;
if(isNaN(j)!==isNaN(c)){return isNaN(j)?1:-1
}if(typeof j!==typeof c){j+="";
c+=""
}if(j<c){return -1
}if(j>c){return 1
}}return 0
},sortNaturalAsc:function(e,d,f,h){if(e===d){return 0
}var g=a.string[(h.empties[f]||h.emptyTo)];
if(e===""&&g!==0){return typeof g==="boolean"?(g?-1:1):-g||-1
}if(d===""&&g!==0){return typeof g==="boolean"?(g?1:-1):g||1
}return a.sortNatural(e,d)
},sortNaturalDesc:function(e,d,f,h){if(e===d){return 0
}var g=a.string[(h.empties[f]||h.emptyTo)];
if(e===""&&g!==0){return typeof g==="boolean"?(g?-1:1):g||1
}if(d===""&&g!==0){return typeof g==="boolean"?(g?1:-1):-g||-1
}return a.sortNatural(d,e)
},sortText:function(d,c){return d>c?1:(d<c?-1:0)
},getTextValue:function(g,e,d){if(d){var f,c=g?g.length:0,h=d+e;
for(f=0;
f<c;
f++){h+=g.charCodeAt(f)
}return e*h
}return 0
},sortNumericAsc:function(f,e,h,d,g,j){if(f===e){return 0
}var i=a.string[(j.empties[g]||j.emptyTo)];
if(f===""&&i!==0){return typeof i==="boolean"?(i?-1:1):-i||-1
}if(e===""&&i!==0){return typeof i==="boolean"?(i?1:-1):i||1
}if(isNaN(f)){f=a.getTextValue(f,h,d)
}if(isNaN(e)){e=a.getTextValue(e,h,d)
}return f-e
},sortNumericDesc:function(f,e,h,d,g,j){if(f===e){return 0
}var i=a.string[(j.empties[g]||j.emptyTo)];
if(f===""&&i!==0){return typeof i==="boolean"?(i?-1:1):i||1
}if(e===""&&i!==0){return typeof i==="boolean"?(i?1:-1):-i||-1
}if(isNaN(f)){f=a.getTextValue(f,h,d)
}if(isNaN(e)){e=a.getTextValue(e,h,d)
}return e-f
},sortNumeric:function(d,c){return d-c
},addWidget:function(c){if(c.id&&!a.isEmptyObject(a.getWidgetById(c.id))){console.warn('"'+c.id+'" widget was loaded more than once!')
}a.widgets[a.widgets.length]=c
},hasWidget:function(d,c){d=b(d);
return d.length&&d[0].config&&d[0].config.widgetInit[c]||false
},getWidgetById:function(d){var e,f,c=a.widgets.length;
for(e=0;
e<c;
e++){f=a.widgets[e];
if(f&&f.id&&f.id.toLowerCase()===d.toLowerCase()){return f
}}},applyWidgetOptions:function(f){var e,g,h=f.config,d=h.widgets.length;
if(d){for(e=0;
e<d;
e++){g=a.getWidgetById(h.widgets[e]);
if(g&&g.options){h.widgetOptions=b.extend(true,{},g.options,h.widgetOptions)
}}}},addWidgetFromClass:function(h){var d,g,j=h.config,f="^"+j.widgetClass.replace(a.regex.templateName,"(\\S+)+")+"$",i=new RegExp(f,"g"),e=(h.className||"").split(a.regex.spaces);
if(e.length){d=e.length;
for(g=0;
g<d;
g++){if(e[g].match(i)){j.widgets[j.widgets.length]=e[g].replace(i,"$1")
}}}},applyWidgetId:function(l,e,k){l=b(l)[0];
var g,f,d,i=l.config,j=i.widgetOptions,h=a.getWidgetById(e);
if(h){d=h.id;
g=false;
if(b.inArray(d,i.widgets)<0){i.widgets[i.widgets.length]=d
}if(i.debug){f=new Date()
}if(k||!(i.widgetInit[d])){i.widgetInit[d]=true;
if(l.hasInitialized){a.applyWidgetOptions(l)
}if(typeof h.init==="function"){g=true;
if(i.debug){console[console.group?"group":"log"]("Initializing "+d+" widget")
}h.init(l,h,i,j)
}}if(!k&&typeof h.format==="function"){g=true;
if(i.debug){console[console.group?"group":"log"]("Updating "+d+" widget")
}h.format(l,i,j,false)
}if(i.debug){if(g){console.log("Completed "+(k?"initializing ":"applying ")+d+" widget"+a.benchmark(f));
if(console.groupEnd){console.groupEnd()
}}}}},applyWidget:function(m,l,k){m=b(m)[0];
var f,g,i,e,d,h=m.config,j=[];
if(l!==false&&m.hasInitialized&&(m.isApplyingWidgets||m.isUpdating)){return
}if(h.debug){d=new Date()
}a.addWidgetFromClass(m);
clearTimeout(h.timerReady);
if(h.widgets.length){m.isApplyingWidgets=true;
h.widgets=b.grep(h.widgets,function(n,c){return b.inArray(n,h.widgets)===c
});
i=h.widgets||[];
g=i.length;
for(f=0;
f<g;
f++){e=a.getWidgetById(i[f]);
if(e&&e.id){if(!e.priority){e.priority=10
}j[f]=e
}else{if(h.debug){console.warn('"'+i[f]+'" widget code does not exist!')
}}}j.sort(function(n,c){return n.priority<c.priority?-1:n.priority===c.priority?0:1
});
g=j.length;
if(h.debug){console[console.group?"group":"log"]("Start "+(l?"initializing":"applying")+" widgets")
}for(f=0;
f<g;
f++){e=j[f];
if(e&&e.id){a.applyWidgetId(m,e.id,l)
}}if(h.debug&&console.groupEnd){console.groupEnd()
}if(!l&&typeof k==="function"){k(m)
}}h.timerReady=setTimeout(function(){m.isApplyingWidgets=false;
b.data(m,"lastWidgetApplication",new Date());
h.$table.triggerHandler("tablesorter-ready")
},10);
if(h.debug){e=h.widgets.length;
console.log("Completed "+(l===true?"initializing ":"applying ")+e+" widget"+(e!==1?"s":"")+a.benchmark(d))
}},removeWidget:function(h,f,j){h=b(h)[0];
var e,i,g,d,k=h.config;
if(f===true){f=[];
d=a.widgets.length;
for(g=0;
g<d;
g++){i=a.widgets[g];
if(i&&i.id){f[f.length]=i.id
}}}else{f=(b.isArray(f)?f.join(","):f||"").toLowerCase().split(/[\s,]+/)
}d=f.length;
for(e=0;
e<d;
e++){i=a.getWidgetById(f[e]);
g=b.inArray(f[e],k.widgets);
if(g>=0&&j!==true){k.widgets.splice(g,1)
}if(i&&i.remove){if(k.debug){console.log((j?"Refreshing":"Removing")+' "'+f[e]+'" widget')
}i.remove(h,k,k.widgetOptions,j);
k.widgetInit[f[e]]=false
}}},refreshWidgets:function(n,d,f){n=b(n)[0];
var h,g,k=n.config,e=k.widgets,l=a.widgets,i=l.length,j=[],m=function(c){b(c).triggerHandler("refreshComplete")
};
for(h=0;
h<i;
h++){g=l[h];
if(g&&g.id&&(d||b.inArray(g.id,e)<0)){j[j.length]=g.id
}}a.removeWidget(n,j.join(","),true);
if(f!==true){a.applyWidget(n,d||false,m);
if(d){a.applyWidget(n,false,m)
}}else{m(n)
}},benchmark:function(c){return(" ("+(new Date().getTime()-c.getTime())+" ms)")
},log:function(){console.log(arguments)
},isEmptyObject:function(d){for(var c in d){return false
}return true
},isValueInArray:function(d,f){var e,c=f&&f.length||0;
for(e=0;
e<c;
e++){if(f[e][0]===d){return e
}}return -1
},formatFloat:function(f,e){if(typeof f!=="string"||f===""){return f
}var d,c=e&&e.config?e.config.usNumberFormat!==false:typeof e!=="undefined"?e:true;
if(c){f=f.replace(a.regex.comma,"")
}else{f=f.replace(a.regex.digitNonUS,"").replace(a.regex.comma,".")
}if(a.regex.digitNegativeTest.test(f)){f=f.replace(a.regex.digitNegativeReplace,"-$1")
}d=parseFloat(f);
return isNaN(d)?b.trim(f):d
},isDigit:function(c){return isNaN(c)?a.regex.digitTest.test(c.toString().replace(a.regex.digitReplace,"")):c!==""
},computeColumnIndex:function(t,q){var m,h,g,f,u,v,r,p,n,o,e=q&&q.columns||0,s=[],d=new Array(e);
for(m=0;
m<t.length;
m++){v=t[m].cells;
for(h=0;
h<v.length;
h++){u=v[h];
r=u.parentNode.rowIndex;
p=u.rowSpan||1;
n=u.colSpan||1;
if(typeof s[r]==="undefined"){s[r]=[]
}for(g=0;
g<s[r].length+1;
g++){if(typeof s[r][g]==="undefined"){o=g;
break
}}if(e&&u.cellIndex===o){}else{if(u.setAttribute){u.setAttribute("data-column",o)
}else{b(u).attr("data-column",o)
}}for(g=r;
g<r+p;
g++){if(typeof s[g]==="undefined"){s[g]=[]
}d=s[g];
for(f=o;
f<o+n;
f++){d[f]="x"
}}}}return d.length
},fixColumnWidth:function(i){i=b(i)[0];
var g,h,j,e,f,k=i.config,d=k.$table.children("colgroup");
if(d.length&&d.hasClass(a.css.colgroup)){d.remove()
}if(k.widthFixed&&k.$table.children("colgroup").length===0){d=b('<colgroup class="'+a.css.colgroup+'">');
g=k.$table.width();
j=k.$tbodies.find("tr:first").children(":visible");
e=j.length;
for(f=0;
f<e;
f++){h=parseInt((j.eq(f).width()/g)*1000,10)/10+"%";
d.append(b("<col>").css("width",h))
}k.$table.prepend(d)
}},getData:function(i,d,f){var g,c,h="",e=b(i);
if(!e.length){return""
}g=b.metadata?e.metadata():false;
c=" "+(e.attr("class")||"");
if(typeof e.data(f)!=="undefined"||typeof e.data(f.toLowerCase())!=="undefined"){h+=e.data(f)||e.data(f.toLowerCase())
}else{if(g&&typeof g[f]!=="undefined"){h+=g[f]
}else{if(d&&typeof d[f]!=="undefined"){h+=d[f]
}else{if(c!==" "&&c.match(" "+f+"-")){h=c.match(new RegExp("\\s"+f+"-([\\w-]+)"))[1]||""
}}}}return b.trim(h)
},getColumnData:function(m,e,f,j,h){if(typeof e==="undefined"||e===null){return
}m=b(m)[0];
var d,k,g=m.config,l=(h||g.$headers),i=g.$headerIndexed&&g.$headerIndexed[f]||l.filter('[data-column="'+f+'"]:last');
if(typeof e[f]!=="undefined"){return j?e[f]:e[l.index(i)]
}for(k in e){if(typeof k==="string"){d=i.filter(k).add(i.find(k));
if(d.length){return e[k]
}}}return
},isProcessing:function(f,d,g){f=b(f);
var h=f[0].config,e=g||f.find("."+a.css.header);
if(d){if(typeof g!=="undefined"&&h.sortList.length>0){e=e.filter(function(){return this.sortDisabled?false:a.isValueInArray(parseFloat(b(this).attr("data-column")),h.sortList)>=0
})
}f.add(e).addClass(a.css.processing+" "+h.cssProcessing)
}else{f.add(e).removeClass(a.css.processing+" "+h.cssProcessing)
}},processTbody:function(e,c,d){e=b(e)[0];
if(d){e.isProcessing=true;
c.before('<colgroup class="tablesorter-savemyplace"/>');
return b.fn.detach?c.detach():c.remove()
}var f=b(e).find("colgroup.tablesorter-savemyplace");
c.insertAfter(f);
f.remove();
e.isProcessing=false
},clearTableBody:function(c){b(c)[0].config.$tbodies.children().detach()
},characterEquivalents:{a:"\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5",A:"\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5",c:"\u00e7\u0107\u010d",C:"\u00c7\u0106\u010c",e:"\u00e9\u00e8\u00ea\u00eb\u011b\u0119",E:"\u00c9\u00c8\u00ca\u00cb\u011a\u0118",i:"\u00ed\u00ec\u0130\u00ee\u00ef\u0131",I:"\u00cd\u00cc\u0130\u00ce\u00cf",o:"\u00f3\u00f2\u00f4\u00f5\u00f6\u014d",O:"\u00d3\u00d2\u00d4\u00d5\u00d6\u014c",ss:"\u00df",SS:"\u1e9e",u:"\u00fa\u00f9\u00fb\u00fc\u016f",U:"\u00da\u00d9\u00db\u00dc\u016e"},replaceAccents:function(f){var d,e="[",c=a.characterEquivalents;
if(!a.characterRegex){a.characterRegexArray={};
for(d in c){if(typeof d==="string"){e+=c[d];
a.characterRegexArray[d]=new RegExp("["+c[d]+"]","g")
}}a.characterRegex=new RegExp(e+"]")
}if(a.characterRegex.test(f)){for(d in c){if(typeof d==="string"){f=f.replace(a.characterRegexArray[d],d)
}}}return f
},restoreHeaders:function(g){var e,h,i=b(g)[0].config,f=i.$table.find(i.selectorHeaders),d=f.length;
for(e=0;
e<d;
e++){h=f.eq(e);
if(h.find("."+a.css.headerIn).length){h.html(i.headerContent[e])
}}},destroy:function(k,h,j){k=b(k)[0];
if(!k.hasInitialized){return
}a.removeWidget(k,true,false);
var l,f=b(k),i=k.config,e=i.debug,m=f.find("thead:first"),g=m.find("tr."+a.css.headerRow).removeClass(a.css.headerRow+" "+i.cssHeaderRow),d=f.find("tfoot:first > tr").children("th, td");
if(h===false&&b.inArray("uitheme",i.widgets)>=0){f.triggerHandler("applyWidgetId",["uitheme"]);
f.triggerHandler("applyWidgetId",["zebra"])
}m.find("tr").not(g).remove();
l="sortReset update updateRows updateAll updateHeaders updateCell addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets removeWidget destroy mouseup mouseleave "+"keypress sortBegin sortEnd resetToLoadState ".split(" ").join(i.namespace+" ");
f.removeData("tablesorter").unbind(l.replace(a.regex.spaces," "));
i.$headers.add(d).removeClass([a.css.header,i.cssHeader,i.cssAsc,i.cssDesc,a.css.sortAsc,a.css.sortDesc,a.css.sortNone].join(" ")).removeAttr("data-column").removeAttr("aria-label").attr("aria-disabled","true");
g.find(i.selectorSort).unbind(("mousedown mouseup keypress ".split(" ").join(i.namespace+" ")).replace(a.regex.spaces," "));
a.restoreHeaders(k);
f.toggleClass(a.css.table+" "+i.tableClass+" tablesorter-"+i.theme,h===false);
k.hasInitialized=false;
delete k.config.cache;
if(typeof j==="function"){j(k)
}if(e){console.log("tablesorter has been removed")
}}};
b.fn.tablesorter=function(c){return this.each(function(){var d=this,e=b.extend(true,{},a.defaults,c,a.instanceMethods);
e.originalSettings=c;
if(!d.hasInitialized&&a.buildTable&&this.nodeName!=="TABLE"){a.buildTable(d,e)
}else{a.setup(d,e)
}})
};
if(!(window.console&&window.console.log)){a.logs=[];
console={};
console.log=console.warn=console.error=console.table=function(){var c=arguments.length>1?arguments:arguments[0];
a.logs[a.logs.length]={date:Date.now(),log:c}
}
}a.addParser({id:"no-parser",is:function(){return false
},format:function(){return""
},type:"text"});
a.addParser({id:"text",is:function(){return true
},format:function(e,d){var f=d.config;
if(e){e=b.trim(f.ignoreCase?e.toLocaleLowerCase():e);
e=f.sortLocaleCompare?a.replaceAccents(e):e
}return e
},type:"text"});
a.regex.nondigit=/[^\w,. \-()]/g;
a.addParser({id:"digit",is:function(c){return a.isDigit(c)
},format:function(e,d){var c=a.formatFloat((e||"").replace(a.regex.nondigit,""),d);
return e&&typeof c==="number"?c:e?b.trim(e&&d.config.ignoreCase?e.toLocaleLowerCase():e):e
},type:"numeric"});
a.regex.currencyReplace=/[+\-,. ]/g;
a.regex.currencyTest=/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/;
a.addParser({id:"currency",is:function(c){c=(c||"").replace(a.regex.currencyReplace,"");
return a.regex.currencyTest.test(c)
},format:function(e,d){var c=a.formatFloat((e||"").replace(a.regex.nondigit,""),d);
return e&&typeof c==="number"?c:e?b.trim(e&&d.config.ignoreCase?e.toLocaleLowerCase():e):e
},type:"numeric"});
a.regex.urlProtocolTest=/^(https?|ftp|file):\/\//;
a.regex.urlProtocolReplace=/(https?|ftp|file):\/\/(www\.)?/;
a.addParser({id:"url",is:function(c){return a.regex.urlProtocolTest.test(c)
},format:function(c){return c?b.trim(c.replace(a.regex.urlProtocolReplace,"")):c
},type:"text"});
a.regex.dash=/-/g;
a.regex.isoDate=/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/;
a.addParser({id:"isoDate",is:function(c){return a.regex.isoDate.test(c)
},format:function(e,d){var c=e?new Date(e.replace(a.regex.dash,"/")):e;
return c instanceof Date&&isFinite(c)?c.getTime():e
},type:"numeric"});
a.regex.percent=/%/g;
a.regex.percentTest=/(\d\s*?%|%\s*?\d)/;
a.addParser({id:"percent",is:function(c){return a.regex.percentTest.test(c)&&c.length<15
},format:function(d,c){return d?a.formatFloat(d.replace(a.regex.percent,""),c):d
},type:"numeric"});
a.addParser({id:"image",is:function(f,e,d,c){return c.find("img").length>0
},format:function(e,d,c){return b(c).find("img").attr(d.config.imgAttr||"alt")||e
},parsed:true,type:"text"});
a.regex.dateReplace=/(\S)([AP]M)$/i;
a.regex.usLongDateTest1=/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i;
a.regex.usLongDateTest2=/^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i;
a.addParser({id:"usLongDate",is:function(c){return a.regex.usLongDateTest1.test(c)||a.regex.usLongDateTest2.test(c)
},format:function(e,d){var c=e?new Date(e.replace(a.regex.dateReplace,"$1 $2")):e;
return c instanceof Date&&isFinite(c)?c.getTime():e
},type:"numeric"});
a.regex.shortDateTest=/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/;
a.regex.shortDateReplace=/[\-.,]/g;
a.regex.shortDateXXY=/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/;
a.regex.shortDateYMD=/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/;
a.convertFormat=function(d,e){d=(d||"").replace(a.regex.spaces," ").replace(a.regex.shortDateReplace,"/");
if(e==="mmddyyyy"){d=d.replace(a.regex.shortDateXXY,"$3/$1/$2")
}else{if(e==="ddmmyyyy"){d=d.replace(a.regex.shortDateXXY,"$3/$2/$1")
}else{if(e==="yyyymmdd"){d=d.replace(a.regex.shortDateYMD,"$1/$2/$3")
}}}var c=new Date(d);
return c instanceof Date&&isFinite(c)?c.getTime():""
};
a.addParser({id:"shortDate",is:function(c){c=(c||"").replace(a.regex.spaces," ").replace(a.regex.shortDateReplace,"/");
return a.regex.shortDateTest.test(c)
},format:function(i,g,d,f){if(i){var j=g.config,e=j.$headerIndexed[f],h=e.length&&e.data("dateFormat")||a.getData(e,a.getColumnData(g,j.headers,f),"dateFormat")||j.dateFormat;
if(e.length){e.data("dateFormat",h)
}return a.convertFormat(i,h)||i
}return i
},type:"numeric"});
a.regex.timeTest=/^(0?[1-9]|1[0-2]):([0-5]\d)(\s[AP]M)$|^((?:[01]\d|[2][0-4]):[0-5]\d)$/i;
a.regex.timeMatch=/(0?[1-9]|1[0-2]):([0-5]\d)(\s[AP]M)|((?:[01]\d|[2][0-4]):[0-5]\d)/i;
a.addParser({id:"time",is:function(c){return a.regex.timeTest.test(c)
},format:function(h,f){var c,e=(h||"").match(a.regex.timeMatch),i=new Date(h),g=h&&(e!==null?e[0]:"00:00 AM"),d=g?new Date("2000/01/01 "+g.replace(a.regex.dateReplace,"$1 $2")):g;
if(d instanceof Date&&isFinite(d)){c=i instanceof Date&&isFinite(i)?i.getTime():0;
return c?parseFloat(d.getTime()+"."+i.getTime()):d.getTime()
}return h
},type:"numeric"});
a.addParser({id:"metadata",is:function(){return false
},format:function(g,e,d){var h=e.config,f=(!h.parserMetadataName)?"sortValue":h.parserMetadataName;
return b(d).metadata()[f]
},type:"numeric"});
a.addWidget({id:"zebra",priority:90,format:function(n,i,l){var o,h,g,m,k,j,f,d=new RegExp(i.cssChildRow,"i"),e=i.$tbodies.add(b(i.namespace+"_extra_table").children("tbody:not(."+i.cssInfoBlock+")"));
for(k=0;
k<e.length;
k++){g=0;
o=e.eq(k).children("tr:visible").not(i.selectorRemove);
f=o.length;
for(j=0;
j<f;
j++){h=o.eq(j);
if(!d.test(h[0].className)){g++
}m=(g%2===0);
h.removeClass(l.zebra[m?1:0]).addClass(l.zebra[m?0:1])
}}},remove:function(h,k,g,i){if(i){return
}var e,d,j=k.$tbodies,f=(g.zebra||["even","odd"]).join(" ");
for(e=0;
e<j.length;
e++){d=a.processTbody(h,j.eq(e),true);
d.children().removeClass(f);
a.processTbody(h,d,false)
}}})
})(jQuery);
/*! tablesorter (FORK) - updated 09-01-2016 (v2.27.6)*/
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a)
}else{if(typeof module==="object"&&typeof module.exports==="object"){module.exports=a(require("jquery"))
}else{a(jQuery)
}}}(function(a){
/*! Widget: storage - updated 3/1/2016 (v2.25.5) */
;
(function(e,d,b){var c=e.tablesorter||{};
c.storage=function(t,q,n,u){t=e(t)[0];
var p,s,i,h=false,o={},l=t.config,m=l&&l.widgetOptions,j=(u&&u.useSessionStorage)||(m&&m.storage_useSessionStorage)?"sessionStorage":"localStorage",r=e(t),g=u&&u.id||r.attr(u&&u.group||m&&m.storage_group||"data-table-group")||m&&m.storage_tableId||t.id||e(".tablesorter").index(r),f=u&&u.url||r.attr(u&&u.page||m&&m.storage_page||"data-table-page")||m&&m.storage_fixedUrl||l&&l.fixedUrl||d.location.pathname;
if(j in d){try{d[j].setItem("_tmptest","temp");
h=true;
d[j].removeItem("_tmptest")
}catch(k){if(l&&l.debug){console.warn(j+" is not supported in this browser")
}}}if(e.parseJSON){if(h){o=e.parseJSON(d[j][q]||"null")||{}
}else{s=b.cookie.split(/[;\s|=]/);
p=e.inArray(q,s)+1;
o=(p!==0)?e.parseJSON(s[p]||"null")||{}:{}
}}if(typeof n!=="undefined"&&d.JSON&&JSON.hasOwnProperty("stringify")){if(!o[f]){o[f]={}
}o[f][g]=n;
if(h){d[j][q]=JSON.stringify(o)
}else{i=new Date();
i.setTime(i.getTime()+(31536000000));
b.cookie=q+"="+(JSON.stringify(o)).replace(/\"/g,'"')+"; expires="+i.toGMTString()+"; path=/"
}}else{return o&&o[f]?o[f][g]:""
}}
})(a,window,document);
/*! Widget: uitheme - updated 7/31/2016 (v2.27.0) */
;
(function(c){var b=c.tablesorter||{};
b.themes={bootstrap:{table:"table table-bordered table-striped",caption:"caption",header:"bootstrap-header",sortNone:"",sortAsc:"",sortDesc:"",active:"",hover:"",icons:"",iconSortNone:"bootstrap-icon-unsorted",iconSortAsc:"icon-chevron-up glyphicon glyphicon-chevron-up",iconSortDesc:"icon-chevron-down glyphicon glyphicon-chevron-down",filterRow:"",footerRow:"",footerCells:"",even:"",odd:""},jui:{table:"ui-widget ui-widget-content ui-corner-all",caption:"ui-widget-content",header:"ui-widget-header ui-corner-all ui-state-default",sortNone:"",sortAsc:"",sortDesc:"",active:"ui-state-active",hover:"ui-state-hover",icons:"ui-icon",iconSortNone:"ui-icon-carat-2-n-s ui-icon-caret-2-n-s",iconSortAsc:"ui-icon-carat-1-n ui-icon-caret-1-n",iconSortDesc:"ui-icon-carat-1-s ui-icon-caret-1-s",filterRow:"",footerRow:"",footerCells:"",even:"ui-widget-content",odd:"ui-state-default"}};
c.extend(b.css,{wrapper:"tablesorter-wrapper"});
b.addWidget({id:"uitheme",priority:10,format:function(s,w,h){var r,x,g,t,k,z,e,f,d,n,j,m,u,y=b.themes,l=w.$table.add(c(w.namespace+"_extra_table")),o=w.$headers.add(c(w.namespace+"_extra_headers")),v=w.theme||"jui",q=y[v]||{},A=c.trim([q.sortNone,q.sortDesc,q.sortAsc,q.active].join(" ")),p=c.trim([q.iconSortNone,q.iconSortDesc,q.iconSortAsc].join(" "));
if(w.debug){k=new Date()
}if(!l.hasClass("tablesorter-"+v)||w.theme!==w.appliedTheme||!h.uitheme_applied){h.uitheme_applied=true;
n=y[w.appliedTheme]||{};
u=!c.isEmptyObject(n);
j=u?[n.sortNone,n.sortDesc,n.sortAsc,n.active].join(" "):"";
m=u?[n.iconSortNone,n.iconSortDesc,n.iconSortAsc].join(" "):"";
if(u){h.zebra[0]=c.trim(" "+h.zebra[0].replace(" "+n.even,""));
h.zebra[1]=c.trim(" "+h.zebra[1].replace(" "+n.odd,""));
w.$tbodies.children().removeClass([n.even,n.odd].join(" "))
}if(q.even){h.zebra[0]+=" "+q.even
}if(q.odd){h.zebra[1]+=" "+q.odd
}l.children("caption").removeClass(n.caption||"").addClass(q.caption);
f=l.removeClass((w.appliedTheme?"tablesorter-"+(w.appliedTheme||""):"")+" "+(n.table||"")).addClass("tablesorter-"+v+" "+(q.table||"")).children("tfoot");
w.appliedTheme=w.theme;
if(f.length){f.children("tr").removeClass(n.footerRow||"").addClass(q.footerRow).children("th, td").removeClass(n.footerCells||"").addClass(q.footerCells)
}o.removeClass((u?[n.header,n.hover,j].join(" "):"")||"").addClass(q.header).not(".sorter-false").unbind("mouseenter.tsuitheme mouseleave.tsuitheme").bind("mouseenter.tsuitheme mouseleave.tsuitheme",function(i){c(this)[i.type==="mouseenter"?"addClass":"removeClass"](q.hover||"")
});
o.each(function(){var i=c(this);
if(!i.find("."+b.css.wrapper).length){i.wrapInner('<div class="'+b.css.wrapper+'" style="position:relative;height:100%;width:100%"></div>')
}});
if(w.cssIcon){o.find("."+b.css.icon).removeClass(u?[n.icons,m].join(" "):"").addClass(q.icons||"")
}if(w.widgets.indexOf("filter")>-1){x=function(){l.children("thead").children("."+b.css.filterRow).removeClass(u?n.filterRow||"":"").addClass(q.filterRow||"")
};
if(h.filter_initialized){x()
}else{l.one("filterInit",function(){x()
})
}}}for(r=0;
r<w.columns;
r++){z=w.$headers.add(c(w.namespace+"_extra_headers")).not(".sorter-false").filter('[data-column="'+r+'"]');
e=(b.css.icon)?z.find("."+b.css.icon):c();
d=o.not(".sorter-false").filter('[data-column="'+r+'"]:last');
if(d.length){z.removeClass(A);
e.removeClass(p);
if(d[0].sortDisabled){e.removeClass(q.icons||"")
}else{g=q.sortNone;
t=q.iconSortNone;
if(d.hasClass(b.css.sortAsc)){g=[q.sortAsc,q.active].join(" ");
t=q.iconSortAsc
}else{if(d.hasClass(b.css.sortDesc)){g=[q.sortDesc,q.active].join(" ");
t=q.iconSortDesc
}}z.addClass(g);
e.addClass(t||"")
}}}if(w.debug){console.log("Applying "+v+" theme"+b.benchmark(k))
}},remove:function(m,g,j,k){if(!j.uitheme_applied){return
}var l=g.$table,e=g.appliedTheme||"jui",i=b.themes[e]||b.themes.jui,h=l.children("thead").children(),d=i.sortNone+" "+i.sortDesc+" "+i.sortAsc,f=i.iconSortNone+" "+i.iconSortDesc+" "+i.iconSortAsc;
l.removeClass("tablesorter-"+e+" "+i.table);
j.uitheme_applied=false;
if(k){return
}l.find(b.css.header).removeClass(i.header);
h.unbind("mouseenter.tsuitheme mouseleave.tsuitheme").removeClass(i.hover+" "+d+" "+i.active).filter("."+b.css.filterRow).removeClass(i.filterRow);
h.find("."+b.css.icon).removeClass(i.icons+" "+f)
}})
})(a);
/*! Widget: columns */
;
(function(c){var b=c.tablesorter||{};
b.addWidget({id:"columns",priority:30,options:{columns:["primary","secondary","tertiary"]},format:function(s,l,n){var e,m,p,t,k,r,f,i,q=l.$table,g=l.$tbodies,d=l.sortList,j=d.length,h=n&&n.columns||["primary","secondary","tertiary"],o=h.length-1;
f=h.join(" ");
for(m=0;
m<g.length;
m++){e=b.processTbody(s,g.eq(m),true);
p=e.children("tr");
p.each(function(){k=c(this);
if(this.style.display!=="none"){r=k.children().removeClass(f);
if(d&&d[0]){r.eq(d[0][0]).addClass(h[0]);
if(j>1){for(i=1;
i<j;
i++){r.eq(d[i][0]).addClass(h[i]||h[o])
}}}}});
b.processTbody(s,e,false)
}t=n.columns_thead!==false?["thead tr"]:[];
if(n.columns_tfoot!==false){t.push("tfoot tr")
}if(t.length){p=q.find(t.join(",")).children().removeClass(f);
if(j){for(i=0;
i<j;
i++){p.filter('[data-column="'+d[i][0]+'"]').addClass(h[i]||h[o])
}}}},remove:function(h,j,g){var f,e,i=j.$tbodies,d=(g.columns||["primary","secondary","tertiary"]).join(" ");
j.$headers.removeClass(d);
j.$table.children("tfoot").children("tr").children("th, td").removeClass(d);
for(f=0;
f<i.length;
f++){e=b.processTbody(h,i.eq(f),true);
e.children("tr").each(function(){c(this).children().removeClass(d)
});
b.processTbody(h,e,false)
}}})
})(a);
/*! Widget: filter - updated 8/22/2016 (v2.27.5) */
;
(function(g){var c,f,d=g.tablesorter||{},b=d.css,e=d.keyCodes;
g.extend(b,{filterRow:"tablesorter-filter-row",filter:"tablesorter-filter",filterDisabled:"disabled",filterRowHide:"hideme"});
g.extend(e,{backSpace:8,escape:27,space:32,left:37,down:40});
d.addWidget({id:"filter",priority:50,options:{filter_cellFilter:"",filter_childRows:false,filter_childByColumn:false,filter_childWithSibs:true,filter_columnAnyMatch:true,filter_columnFilters:true,filter_cssFilter:"",filter_defaultAttrib:"data-value",filter_defaultFilter:{},filter_excludeFilter:{},filter_external:"",filter_filteredRow:"filtered",filter_formatter:null,filter_functions:null,filter_hideEmpty:true,filter_hideFilters:false,filter_ignoreCase:true,filter_liveSearch:true,filter_matchType:{input:"exact",select:"exact"},filter_onlyAvail:"filter-onlyAvail",filter_placeholder:{search:"",select:""},filter_reset:null,filter_resetOnEsc:true,filter_saveFilters:false,filter_searchDelay:300,filter_searchFiltered:true,filter_selectSource:null,filter_selectSourceSeparator:"|",filter_serversideFiltering:false,filter_startsWith:false,filter_useParsedData:false},format:function(i,j,h){if(!j.$table.hasClass("hasFilters")){c.init(i,j,h)
}},remove:function(p,j,l,m){var k,h,n=j.$table,i=j.$tbodies,o="addRows updateCell update updateRows updateComplete appendCache filterReset filterEnd search ".split(" ").join(j.namespace+"filter ");
n.removeClass("hasFilters").unbind(o.replace(d.regex.spaces," ")).find("."+b.filterRow).remove();
l.filter_initialized=false;
if(m){return
}for(k=0;
k<i.length;
k++){h=d.processTbody(p,i.eq(k),true);
h.children().removeClass(l.filter_filteredRow).show();
d.processTbody(p,h,false)
}if(l.filter_reset){g(document).undelegate(l.filter_reset,"click"+j.namespace+"filter")
}}});
c=d.filter={regex:{regex:/^\/((?:\\\/|[^\/])+)\/([migyu]{0,5})?$/,child:/tablesorter-childRow/,filtered:/filtered/,type:/undefined|number/,exact:/(^[\"\'=]+)|([\"\'=]+$)/g,operators:/[<>=]/g,query:"(q|query)",wild01:/\?/g,wild0More:/\*/g,quote:/\"/g,isNeg1:/(>=?\s*-\d)/,isNeg2:/(<=?\s*\d)/},types:{or:function(q,k,o){if((f.orTest.test(k.iFilter)||f.orSplit.test(k.filter))&&!f.regex.test(k.filter)){var l,n,r,s,j=g.extend({},k),h=k.filter.split(f.orSplit),i=k.iFilter.split(f.orSplit),m=h.length;
for(l=0;
l<m;
l++){j.nestedFilters=true;
j.filter=""+(c.parseFilter(q,h[l],k)||"");
j.iFilter=""+(c.parseFilter(q,i[l],k)||"");
r="("+(c.parseFilter(q,j.filter,k)||"")+")";
try{s=new RegExp(k.isMatch?r:"^"+r+"$",q.widgetOptions.filter_ignoreCase?"i":"");
n=s.test(j.exact)||c.processTypes(q,j,o);
if(n){return n
}}catch(p){return null
}}return n||false
}return null
},and:function(q,k,o){if(f.andTest.test(k.filter)){var l,n,t,r,s,j=g.extend({},k),h=k.filter.split(f.andSplit),i=k.iFilter.split(f.andSplit),m=h.length;
for(l=0;
l<m;
l++){j.nestedFilters=true;
j.filter=""+(c.parseFilter(q,h[l],k)||"");
j.iFilter=""+(c.parseFilter(q,i[l],k)||"");
r=("("+(c.parseFilter(q,j.filter,k)||"")+")").replace(f.wild01,"\\S{1}").replace(f.wild0More,"\\S*");
try{s=new RegExp(k.isMatch?r:"^"+r+"$",q.widgetOptions.filter_ignoreCase?"i":"");
t=(s.test(j.exact)||c.processTypes(q,j,o));
if(l===0){n=t
}else{n=n&&t
}}catch(p){return null
}}return n||false
}return null
},regex:function(m,k){if(f.regex.test(k.filter)){var j,i=k.filter_regexCache[k.index]||f.regex.exec(k.filter),l=i instanceof RegExp;
try{if(!l){k.filter_regexCache[k.index]=i=new RegExp(i[1],i[2])
}j=i.test(k.exact)
}catch(h){j=false
}return j
}return null
},operators:function(m,k){if(f.operTest.test(k.iFilter)&&k.iExact!==""){var i,q,l,p=m.table,o=k.parsed[k.index],n=d.formatFloat(k.iFilter.replace(f.operators,""),p),h=m.parsers[k.index]||{},j=n;
if(o||h.type==="numeric"){l=g.trim(""+k.iFilter.replace(f.operators,""));
q=c.parseFilter(m,l,k,true);
n=(typeof q==="number"&&q!==""&&!isNaN(q))?q:n
}if((o||h.type==="numeric")&&!isNaN(n)&&typeof k.cache!=="undefined"){i=k.cache
}else{l=isNaN(k.iExact)?k.iExact.replace(d.regex.nondigit,""):k.iExact;
i=d.formatFloat(l,p)
}if(f.gtTest.test(k.iFilter)){q=f.gteTest.test(k.iFilter)?i>=n:i>n
}else{if(f.ltTest.test(k.iFilter)){q=f.lteTest.test(k.iFilter)?i<=n:i<n
}}if(!q&&j===""){q=true
}return q
}return null
},notMatch:function(l,k){if(f.notTest.test(k.iFilter)){var j,h=k.iFilter.replace("!",""),i=c.parseFilter(l,h,k)||"";
if(f.exact.test(i)){i=i.replace(f.exact,"");
return i===""?true:g.trim(i)!==k.iExact
}else{j=k.iExact.search(g.trim(i));
return i===""?true:k.anyMatch?j<0:!(l.widgetOptions.filter_startsWith?j===0:j>=0)
}}return null
},exact:function(k,j){if(f.exact.test(j.iFilter)){var h=j.iFilter.replace(f.exact,""),i=c.parseFilter(k,h,j)||"";
return j.anyMatch?g.inArray(i,j.rowArray)>=0:i==j.iExact
}return null
},range:function(m,h){if(f.toTest.test(h.iFilter)){var q,i,p,n,o=m.table,j=h.index,l=h.parsed[j],k=h.iFilter.split(f.toSplit);
i=k[0].replace(d.regex.nondigit,"")||"";
p=d.formatFloat(c.parseFilter(m,i,h),o);
i=k[1].replace(d.regex.nondigit,"")||"";
n=d.formatFloat(c.parseFilter(m,i,h),o);
if(l||m.parsers[j].type==="numeric"){q=m.parsers[j].format(""+k[0],o,m.$headers.eq(j),j);
p=(q!==""&&!isNaN(q))?q:p;
q=m.parsers[j].format(""+k[1],o,m.$headers.eq(j),j);
n=(q!==""&&!isNaN(q))?q:n
}if((l||m.parsers[j].type==="numeric")&&!isNaN(p)&&!isNaN(n)){q=h.cache
}else{i=isNaN(h.iExact)?h.iExact.replace(d.regex.nondigit,""):h.iExact;
q=d.formatFloat(i,o)
}if(p>n){i=p;
p=n;
n=i
}return(q>=p&&q<=n)||(p===""||n==="")
}return null
},wild:function(k,j){if(f.wildOrTest.test(j.iFilter)){var i=""+(c.parseFilter(k,j.iFilter,j)||"");
if(!f.wildTest.test(i)&&j.nestedFilters){i=j.isMatch?i:"^("+i+")$"
}try{return new RegExp(i.replace(f.wild01,"\\S{1}").replace(f.wild0More,"\\S*"),k.widgetOptions.filter_ignoreCase?"i":"").test(j.exact)
}catch(h){return null
}}return null
},fuzzy:function(n,m){if(f.fuzzyTest.test(m.iFilter)){var k,j=0,i=m.iExact.length,h=m.iFilter.slice(1),l=c.parseFilter(n,h,m)||"";
for(k=0;
k<i;
k++){if(m.iExact[k]===l[j]){j+=1
}}return j===l.length
}return null
}},init:function(q){d.language=g.extend(true,{},{to:"to",or:"or",and:"and"},d.language);
var r,m,k,h,j,i,n,l,o=q.config,p=o.widgetOptions;
o.$table.addClass("hasFilters");
o.lastSearch=[];
p.filter_searchTimer=null;
p.filter_initTimer=null;
p.filter_formatterCount=0;
p.filter_formatterInit=[];
p.filter_anyColumnSelector='[data-column="all"],[data-column="any"]';
p.filter_multipleColumnSelector='[data-column*="-"],[data-column*=","]';
i="\\{"+f.query+"\\}";
g.extend(f,{child:new RegExp(o.cssChildRow),filtered:new RegExp(p.filter_filteredRow),alreadyFiltered:new RegExp("(\\s+("+d.language.or+"|-|"+d.language.to+")\\s+)","i"),toTest:new RegExp("\\s+(-|"+d.language.to+")\\s+","i"),toSplit:new RegExp("(?:\\s+(?:-|"+d.language.to+")\\s+)","gi"),andTest:new RegExp("\\s+("+d.language.and+"|&&)\\s+","i"),andSplit:new RegExp("(?:\\s+(?:"+d.language.and+"|&&)\\s+)","gi"),orTest:new RegExp("(\\||\\s+"+d.language.or+"\\s+)","i"),orSplit:new RegExp("(?:\\s+(?:"+d.language.or+")\\s+|\\|)","gi"),iQuery:new RegExp(i,"i"),igQuery:new RegExp(i,"ig"),operTest:/^[<>]=?/,gtTest:/>/,gteTest:/>=/,ltTest:/</,lteTest:/<=/,notTest:/^\!/,wildOrTest:/[\?\*\|]/,wildTest:/\?\*/,fuzzyTest:/^~/,exactTest:/[=\"\|!]/});
i=o.$headers.filter(".filter-false, .parser-false").length;
if(p.filter_columnFilters!==false&&i!==o.$headers.length){c.buildRow(q,o,p)
}k="addRows updateCell update updateRows updateComplete appendCache filterReset "+"filterResetSaved filterEnd search ".split(" ").join(o.namespace+"filter ");
o.$table.bind(k,function(t,s){i=p.filter_hideEmpty&&g.isEmptyObject(o.cache)&&!(o.delayInit&&t.type==="appendCache");
o.$table.find("."+b.filterRow).toggleClass(p.filter_filteredRow,i);
if(!/(search|filter)/.test(t.type)){t.stopPropagation();
c.buildDefault(q,true)
}if(t.type==="filterReset"){o.$table.find("."+b.filter).add(p.filter_$externalFilters).val("");
c.searching(q,[])
}else{if(t.type==="filterResetSaved"){d.storage(q,"tablesorter-filters","")
}else{if(t.type==="filterEnd"){c.buildDefault(q,true)
}else{s=t.type==="search"?s:t.type==="updateComplete"?o.$table.data("lastSearch"):"";
if(/(update|add)/.test(t.type)&&t.type!=="updateComplete"){o.lastCombinedFilter=null;
o.lastSearch=[];
setTimeout(function(){o.$table.triggerHandler("filterFomatterUpdate")
},100)
}c.searching(q,s,true)
}}}return false
});
if(p.filter_reset){if(p.filter_reset instanceof g){p.filter_reset.click(function(){o.$table.triggerHandler("filterReset")
})
}else{if(g(p.filter_reset).length){g(document).undelegate(p.filter_reset,"click"+o.namespace+"filter").delegate(p.filter_reset,"click"+o.namespace+"filter",function(){o.$table.triggerHandler("filterReset")
})
}}}if(p.filter_functions){for(j=0;
j<o.columns;
j++){n=d.getColumnData(q,p.filter_functions,j);
if(n){h=o.$headerIndexed[j].removeClass("filter-select");
l=!(h.hasClass("filter-false")||h.hasClass("parser-false"));
r="";
if(n===true&&l){c.buildSelect(q,j)
}else{if(typeof n==="object"&&l){for(m in n){if(typeof m==="string"){r+=r===""?'<option value="">'+(h.data("placeholder")||h.attr("data-placeholder")||p.filter_placeholder.select||"")+"</option>":"";
i=m;
k=m;
if(m.indexOf(p.filter_selectSourceSeparator)>=0){i=m.split(p.filter_selectSourceSeparator);
k=i[1];
i=i[0]
}r+="<option "+(k===i?"":'data-function-name="'+m+'" ')+'value="'+i+'">'+k+"</option>"
}}o.$table.find("thead").find("select."+b.filter+'[data-column="'+j+'"]').append(r);
k=p.filter_selectSource;
n=typeof k==="function"?true:d.getColumnData(q,k,j);
if(n){c.buildSelect(o.table,j,"",true,h.hasClass(p.filter_onlyAvail))
}}}}}}c.buildDefault(q,true);
c.bindSearch(q,o.$table.find("."+b.filter),true);
if(p.filter_external){c.bindSearch(q,p.filter_external)
}if(p.filter_hideFilters){c.hideFilters(o)
}if(o.showProcessing){k="filterStart filterEnd ".split(" ").join(o.namespace+"filter ");
o.$table.unbind(k.replace(d.regex.spaces," ")).bind(k,function(t,s){h=(s)?o.$table.find("."+b.header).filter("[data-column]").filter(function(){return s[g(this).data("column")]!==""
}):"";
d.isProcessing(q,t.type==="filterStart",s?h:"")
})
}o.filteredRows=o.totalRows;
k="tablesorter-initialized pagerBeforeInitialized ".split(" ").join(o.namespace+"filter ");
o.$table.unbind(k.replace(d.regex.spaces," ")).bind(k,function(){c.completeInit(this)
});
if(o.pager&&o.pager.initialized&&!p.filter_initialized){o.$table.triggerHandler("filterFomatterUpdate");
setTimeout(function(){c.filterInitComplete(o)
},100)
}else{if(!p.filter_initialized){c.completeInit(q)
}}},completeInit:function(j){var k=j.config,h=k.widgetOptions,i=c.setDefaults(j,k,h)||[];
if(i.length){if(!(k.delayInit&&i.join("")==="")){d.setFilters(j,i,true)
}}k.$table.triggerHandler("filterFomatterUpdate");
setTimeout(function(){if(!h.filter_initialized){c.filterInitComplete(k)
}},100)
},formatterUpdated:function(j,i){var h=j&&j.closest("table")[0].config.widgetOptions;
if(h&&!h.filter_initialized){h.filter_formatterInit[i]=1
}},filterInitComplete:function(m){var l,h,j=m.widgetOptions,k=0,i=function(){j.filter_initialized=true;
m.lastSearch=m.$table.data("lastSearch");
m.$table.triggerHandler("filterInit",m);
c.findRows(m.table,m.lastSearch||[])
};
if(g.isEmptyObject(j.filter_formatter)){i()
}else{h=j.filter_formatterInit.length;
for(l=0;
l<h;
l++){if(j.filter_formatterInit[l]===1){k++
}}clearTimeout(j.filter_initTimer);
if(!j.filter_initialized&&k===j.filter_formatterCount){i()
}else{if(!j.filter_initialized){j.filter_initTimer=setTimeout(function(){i()
},500)
}}}},processFilters:function(l,k){var j,i=[],m=k?encodeURIComponent:decodeURIComponent,h=l.length;
for(j=0;
j<h;
j++){if(l[j]){i[j]=m(l[j])
}}return i
},setDefaults:function(p,m,n){var k,o,j,i,l,h=d.getFilters(p)||[];
if(n.filter_saveFilters&&d.storage){o=d.storage(p,"tablesorter-filters")||[];
k=g.isArray(o);
if(!(k&&o.join("")===""||!k)){h=c.processFilters(o)
}}if(h.join("")===""){l=m.$headers.add(n.filter_$externalFilters).filter("["+n.filter_defaultAttrib+"]");
for(j=0;
j<=m.columns;
j++){i=j===m.columns?"all":j;
h[j]=l.filter('[data-column="'+i+'"]').attr(n.filter_defaultAttrib)||h[j]||""
}}m.$table.data("lastSearch",h);
return h
},parseFilter:function(k,i,j,h){return h||j.parsed[j.index]?k.parsers[j.index].format(i,k.table,[],j.index):i
},buildRow:function(w,r,t){var s,k,m,i,o,n,j,h,p,v=t.filter_cellFilter,l=r.columns,q=g.isArray(v),u='<tr role="row" class="'+b.filterRow+" "+r.cssIgnoreRow+'">';
for(m=0;
m<l;
m++){if(r.$headerIndexed[m].length){p=r.$headerIndexed[m]&&r.$headerIndexed[m][0].colSpan||0;
if(p>1){u+='<td data-column="'+m+"-"+(m+p-1)+'" colspan="'+p+'"'
}else{u+='<td data-column="'+m+'"'
}if(q){u+=(v[m]?' class="'+v[m]+'"':"")
}else{u+=(v!==""?' class="'+v+'"':"")
}u+="></td>"
}}r.$filters=g(u+="</tr>").appendTo(r.$table.children("thead").eq(0)).children("td");
for(m=0;
m<l;
m++){n=false;
i=r.$headerIndexed[m];
if(i&&i.length){s=c.getColumnElm(r,r.$filters,m);
h=d.getColumnData(w,t.filter_functions,m);
o=(t.filter_functions&&h&&typeof h!=="function")||i.hasClass("filter-select");
k=d.getColumnData(w,r.headers,m);
n=d.getData(i[0],k,"filter")==="false"||d.getData(i[0],k,"parser")==="false";
if(o){u=g("<select>").appendTo(s)
}else{h=d.getColumnData(w,t.filter_formatter,m);
if(h){t.filter_formatterCount++;
u=h(s,m);
if(u&&u.length===0){u=s.children("input")
}if(u&&(u.parent().length===0||(u.parent().length&&u.parent()[0]!==s[0]))){s.append(u)
}}else{u=g('<input type="search">').appendTo(s)
}if(u){p=i.data("placeholder")||i.attr("data-placeholder")||t.filter_placeholder.search||"";
u.attr("placeholder",p)
}}if(u){j=(g.isArray(t.filter_cssFilter)?(typeof t.filter_cssFilter[m]!=="undefined"?t.filter_cssFilter[m]||"":""):t.filter_cssFilter)||"";
u.addClass(b.filter+" "+j).attr("data-column",s.attr("data-column"));
if(n){u.attr("placeholder","").addClass(b.filterDisabled)[0].disabled=true
}}}}},bindSearch:function(m,j,h){m=g(m)[0];
j=g(j);
if(!j.length){return
}var i,o=m.config,l=o.widgetOptions,k=o.namespace+"filter",n=l.filter_$externalFilters;
if(h!==true){i=l.filter_anyColumnSelector+","+l.filter_multipleColumnSelector;
l.filter_$anyMatch=j.filter(i);
if(n&&n.length){l.filter_$externalFilters=l.filter_$externalFilters.add(j)
}else{l.filter_$externalFilters=j
}d.setFilters(m,o.$table.data("lastSearch")||[],h===false)
}i=("keypress keyup keydown search change input ".split(" ").join(k+" "));
j.attr("data-lastSearchTime",new Date().getTime()).unbind(i.replace(d.regex.spaces," ")).bind("keydown"+k,function(p){if(p.which===e.escape&&!m.config.widgetOptions.filter_resetOnEsc){return false
}}).bind("keyup"+k,function(q){l=m.config.widgetOptions;
var p=parseInt(g(this).attr("data-column"),10),r=typeof l.filter_liveSearch==="boolean"?l.filter_liveSearch:d.getColumnData(m,l.filter_liveSearch,p);
if(typeof r==="undefined"){r=l.filter_liveSearch.fallback||false
}g(this).attr("data-lastSearchTime",new Date().getTime());
if(q.which===e.escape){this.value=l.filter_resetOnEsc?"":o.lastSearch[p]
}else{if(r===false){return
}else{if(this.value!==""&&((typeof r==="number"&&this.value.length<r)||(q.which!==e.enter&&q.which!==e.backSpace&&(q.which<e.space||(q.which>=e.left&&q.which<=e.down))))){return
}}}c.searching(m,true,true)
}).bind("search change keypress input ".split(" ").join(k+" "),function(q){var p=parseInt(g(this).attr("data-column"),10);
if(m.config.widgetOptions.filter_initialized&&(q.which===e.enter||q.type==="search"||(q.type==="change")&&this.value!==o.lastSearch[p])||(q.type==="input"&&this.value==="")){q.preventDefault();
g(this).attr("data-lastSearchTime",new Date().getTime());
c.searching(m,q.type!=="keypress",true,p)
}})
},searching:function(l,k,j,i){var m,h=l.config.widgetOptions;
if(typeof i==="undefined"){m=false
}else{m=typeof h.filter_liveSearch==="boolean"?h.filter_liveSearch:d.getColumnData(l,h.filter_liveSearch,i);
if(typeof m!=="undefined"){m=h.filter_liveSearch.fallback||false
}}clearTimeout(h.filter_searchTimer);
if(typeof k==="undefined"||k===true){h.filter_searchTimer=setTimeout(function(){c.checkFilters(l,k,j)
},m?h.filter_searchDelay:10)
}else{c.checkFilters(l,k,j)
}},checkFilters:function(m,k,j){var o=m.config,i=o.widgetOptions,h=g.isArray(k),l=(h)?k:d.getFilters(m,true),n=(l||[]).join("");
if(g.isEmptyObject(o.cache)){if(o.delayInit&&(!o.pager||o.pager&&o.pager.initialized)){d.updateCache(o,function(){c.checkFilters(m,false,j)
})
}return
}if(h){d.setFilters(m,l,false,j!==true);
if(!i.filter_initialized){o.lastCombinedFilter=""
}}if(i.filter_hideFilters){o.$table.find("."+b.filterRow).triggerHandler(c.hideFiltersCheck(o)?"mouseleave":"mouseenter")
}if(o.lastCombinedFilter===n&&k!==false){return
}else{if(k===false){o.lastCombinedFilter=null;
o.lastSearch=[]
}}l=l||[];
l=Array.prototype.map?l.map(String):l.join("\ufffd").split("\ufffd");
if(i.filter_initialized){o.$table.triggerHandler("filterStart",[l])
}if(o.showProcessing){setTimeout(function(){c.findRows(m,l,n);
return false
},30)
}else{c.findRows(m,l,n);
return false
}},hideFiltersCheck:function(i){if(typeof i.widgetOptions.filter_hideFilters==="function"){var h=i.widgetOptions.filter_hideFilters(i);
if(typeof h==="boolean"){return h
}}return d.getFilters(i.$table).join("")===""
},hideFilters:function(j,h){var i;
(h||j.$table).find("."+b.filterRow).addClass(b.filterRowHide).bind("mouseenter mouseleave",function(m){var l=m,k=g(this);
clearTimeout(i);
i=setTimeout(function(){if(/enter|over/.test(l.type)){k.removeClass(b.filterRowHide)
}else{if(g(document.activeElement).closest("tr")[0]!==k[0]){k.toggleClass(b.filterRowHide,c.hideFiltersCheck(j))
}}},200)
}).find("input, select").bind("focus blur",function(m){var l=m,k=g(this).closest("tr");
clearTimeout(i);
i=setTimeout(function(){clearTimeout(i);
k.toggleClass(b.filterRowHide,c.hideFiltersCheck(j)&&l.type!=="focus")
},200)
})
},defaultFilter:function(j,i){if(j===""){return j
}var m=f.iQuery,l=i.match(f.igQuery).length,n=l>1?g.trim(j).split(/\s/):[g.trim(j)],h=n.length-1,k=0,o=i;
if(h<1&&l>1){n[1]=n[0]
}while(m.test(o)){o=o.replace(m,n[k++]||"");
if(m.test(o)&&k<h&&(n[k]||"")!==""){o=i.replace(m,o)
}}return o
},getLatestSearch:function(h){if(h){return h.sort(function(j,i){return g(i).attr("data-lastSearchTime")-g(j).attr("data-lastSearchTime")
})
}return h||g()
},findRange:function(s,k,t){var u,h,p,j,m,n,o,q,r,l=[];
if(/^[0-9]+$/.test(k)){return[parseInt(k,10)]
}if(!t&&/-/.test(k)){h=k.match(/(\d+)\s*-\s*(\d+)/g);
r=h?h.length:0;
for(q=0;
q<r;
q++){p=h[q].split(/\s*-\s*/);
j=parseInt(p[0],10)||0;
m=parseInt(p[1],10)||(s.columns-1);
if(j>m){u=j;
j=m;
m=u
}if(m>=s.columns){m=s.columns-1
}for(;
j<=m;
j++){l[l.length]=j
}k=k.replace(h[q],"")
}}if(!t&&/,/.test(k)){n=k.split(/\s*,\s*/);
r=n.length;
for(o=0;
o<r;
o++){if(n[o]!==""){q=parseInt(n[o],10);
if(q<s.columns){l[l.length]=q
}}}}if(!l.length){for(q=0;
q<s.columns;
q++){l[l.length]=q
}}return l
},getColumnElm:function(j,i,h){return i.filter(function(){var k=c.findRange(j,g(this).attr("data-column"));
return g.inArray(h,k)>-1
})
},multipleColumns:function(l,k){var i=l.widgetOptions,h=i.filter_initialized||!k.filter(i.filter_anyColumnSelector).length,j=g.trim(c.getLatestSearch(k).attr("data-column")||"");
return c.findRange(l,j,!h)
},processTypes:function(m,j,k){var l,i=null,h=null;
for(l in c.types){if(g.inArray(l,k.excludeMatch)<0&&h===null){h=c.types[l](m,j,k);
if(h!==null){i=h
}}}return i
},matchType:function(l,k){var j,i=l.widgetOptions,h=l.$headerIndexed[k];
if(h.hasClass("filter-exact")){j=false
}else{if(h.hasClass("filter-match")){j=true
}else{if(i.filter_columnFilters){h=l.$filters.find("."+b.filter).add(i.filter_$externalFilters).filter('[data-column="'+k+'"]')
}else{if(i.filter_$externalFilters){h=i.filter_$externalFilters.filter('[data-column="'+k+'"]')
}}j=h.length?l.widgetOptions.filter_matchType[(h[0].nodeName||"").toLowerCase()]==="match":false
}}return j
},processRow:function(q,j,o){var s,m,p,h,k,r=q.widgetOptions,l=true,i=r.filter_$anyMatch&&r.filter_$anyMatch.length,n=r.filter_$anyMatch&&r.filter_$anyMatch.length?c.multipleColumns(q,r.filter_$anyMatch):[];
j.$cells=j.$row.children();
if(j.anyMatchFlag&&n.length>1||(j.anyMatchFilter&&!i)){j.anyMatch=true;
j.isMatch=true;
j.rowArray=j.$cells.map(function(t){if(g.inArray(t,n)>-1||(j.anyMatchFilter&&!i)){if(j.parsed[t]){k=j.cacheArray[t]
}else{k=j.rawArray[t];
k=g.trim(r.filter_ignoreCase?k.toLowerCase():k);
if(q.sortLocaleCompare){k=d.replaceAccents(k)
}}return k
}}).get();
j.filter=j.anyMatchFilter;
j.iFilter=j.iAnyMatchFilter;
j.exact=j.rowArray.join(" ");
j.iExact=r.filter_ignoreCase?j.exact.toLowerCase():j.exact;
j.cache=j.cacheArray.slice(0,-1).join(" ");
o.excludeMatch=o.noAnyMatch;
m=c.processTypes(q,j,o);
if(m!==null){l=m
}else{if(r.filter_startsWith){l=false;
n=Math.min(q.columns,j.rowArray.length);
while(!l&&n>0){n--;
l=l||j.rowArray[n].indexOf(j.iFilter)===0
}}else{l=(j.iExact+j.childRowText).indexOf(j.iFilter)>=0
}}j.anyMatch=false;
if(j.filters.join("")===j.filter){return l
}}for(n=0;
n<q.columns;
n++){j.filter=j.filters[n];
j.index=n;
o.excludeMatch=o.excludeFilter[n];
if(j.filter){j.cache=j.cacheArray[n];
s=j.parsed[n]?j.cache:j.rawArray[n]||"";
j.exact=q.sortLocaleCompare?d.replaceAccents(s):s;
j.iExact=!f.type.test(typeof j.exact)&&r.filter_ignoreCase?j.exact.toLowerCase():j.exact;
j.isMatch=c.matchType(q,n);
s=l;
h=r.filter_columnFilters?q.$filters.add(r.filter_$externalFilters).filter('[data-column="'+n+'"]').find("select option:selected").attr("data-function-name")||"":"";
if(q.sortLocaleCompare){j.filter=d.replaceAccents(j.filter)
}if(r.filter_defaultFilter&&f.iQuery.test(o.defaultColFilter[n])){j.filter=c.defaultFilter(j.filter,o.defaultColFilter[n])
}j.iFilter=r.filter_ignoreCase?(j.filter||"").toLowerCase():j.filter;
p=o.functions[n];
m=null;
if(p){if(p===true){m=j.isMatch?(""+j.iExact).search(j.iFilter)>=0:j.filter===j.exact
}else{if(typeof p==="function"){m=p(j.exact,j.cache,j.filter,n,j.$row,q,j)
}else{if(typeof p[h||j.filter]==="function"){k=h||j.filter;
m=p[k](j.exact,j.cache,j.filter,n,j.$row,q,j)
}}}}if(m===null){m=c.processTypes(q,j,o);
if(m!==null){s=m
}else{k=(j.iExact+j.childRowText).indexOf(c.parseFilter(q,j.iFilter,j));
s=((!r.filter_startsWith&&k>=0)||(r.filter_startsWith&&k===0))
}}else{s=m
}l=(s)?l:false
}}return l
},findRows:function(G,q,p){if(G.config.lastCombinedFilter===p||!G.config.widgetOptions.filter_initialized){return
}var F,n,o,y,C,s,u,x,I,r,D,B,z,j,m,M,K,A,h,l,E,L,w,t,k=g.extend([],q),H=G.config,i=H.widgetOptions,J={anyMatch:false,filters:q,filter_regexCache:[]},v={noAnyMatch:["range","operators"],functions:[],excludeFilter:[],defaultColFilter:[],defaultAnyFilter:d.getColumnData(G,i.filter_defaultFilter,H.columns,true)||""};
J.parsed=[];
for(I=0;
I<H.columns;
I++){J.parsed[I]=i.filter_useParsedData||(H.parsers&&H.parsers[I]&&H.parsers[I].parsed||d.getData&&d.getData(H.$headerIndexed[I],d.getColumnData(G,H.headers,I),"filter")==="parsed"||H.$headerIndexed[I].hasClass("filter-parsed"));
v.functions[I]=d.getColumnData(G,i.filter_functions,I)||H.$headerIndexed[I].hasClass("filter-select");
v.defaultColFilter[I]=d.getColumnData(G,i.filter_defaultFilter,I)||"";
v.excludeFilter[I]=(d.getColumnData(G,i.filter_excludeFilter,I,true)||"").split(/\s+/)
}if(H.debug){console.log("Filter: Starting filter widget search",q);
m=new Date()
}H.filteredRows=0;
H.totalRows=0;
p=(k||[]).join("");
for(u=0;
u<H.$tbodies.length;
u++){x=d.processTbody(G,H.$tbodies.eq(u),true);
I=H.columns;
n=H.cache[u].normalized;
y=g(g.map(n,function(N){return N[I].$row.get()
}));
if(p===""||i.filter_serversideFiltering){y.removeClass(i.filter_filteredRow).not("."+H.cssChildRow).css("display","")
}else{y=y.not("."+H.cssChildRow);
F=y.length;
if((i.filter_$anyMatch&&i.filter_$anyMatch.length)||typeof q[H.columns]!=="undefined"){J.anyMatchFlag=true;
J.anyMatchFilter=""+(q[H.columns]||i.filter_$anyMatch&&c.getLatestSearch(i.filter_$anyMatch).val()||"");
if(i.filter_columnAnyMatch){l=J.anyMatchFilter.split(f.andSplit);
E=false;
for(K=0;
K<l.length;
K++){L=l[K].split(":");
if(L.length>1){if(isNaN(L[0])){g.each(H.headerContent,function(O,N){if(N.toLowerCase().indexOf(L[0])>-1){w=O;
q[w]=L[1]
}})
}else{w=parseInt(L[0],10)-1
}if(w>=0&&w<H.columns){q[w]=L[1];
l.splice(K,1);
K--;
E=true
}}}if(E){J.anyMatchFilter=l.join(" && ")
}}}h=i.filter_searchFiltered;
B=H.lastSearch||H.$table.data("lastSearch")||[];
if(h){for(K=0;
K<I+1;
K++){M=q[K]||"";
if(!h){K=I
}h=h&&B.length&&M.indexOf(B[K]||"")===0&&!f.alreadyFiltered.test(M)&&!f.exactTest.test(M)&&!(f.isNeg1.test(M)||f.isNeg2.test(M))&&!(M!==""&&H.$filters&&H.$filters.filter('[data-column="'+K+'"]').find("select").length&&!c.matchType(H,K))
}}A=y.not("."+i.filter_filteredRow).length;
if(h&&A===0){h=false
}if(H.debug){console.log("Filter: Searching through "+(h&&A<F?A:"all")+" rows")
}if(J.anyMatchFlag){if(H.sortLocaleCompare){J.anyMatchFilter=d.replaceAccents(J.anyMatchFilter)
}if(i.filter_defaultFilter&&f.iQuery.test(v.defaultAnyFilter)){J.anyMatchFilter=c.defaultFilter(J.anyMatchFilter,v.defaultAnyFilter);
h=false
}J.iAnyMatchFilter=!(i.filter_ignoreCase&&H.ignoreCase)?J.anyMatchFilter:J.anyMatchFilter.toLowerCase()
}for(s=0;
s<F;
s++){t=y[s].className;
r=s&&f.child.test(t);
if(r||(h&&f.filtered.test(t))){continue
}J.$row=y.eq(s);
J.rowIndex=s;
J.cacheArray=n[s];
o=J.cacheArray[H.columns];
J.rawArray=o.raw;
J.childRowText="";
if(!i.filter_childByColumn){t="";
D=o.child;
for(K=0;
K<D.length;
K++){t+=" "+D[K].join(" ")||""
}J.childRowText=i.filter_childRows?(i.filter_ignoreCase?t.toLowerCase():t):""
}z=false;
j=c.processRow(H,J,v);
C=o.$row;
M=j?true:false;
D=o.$row.filter(":gt(0)");
if(i.filter_childRows&&D.length){if(i.filter_childByColumn){if(!i.filter_childWithSibs){D.addClass(i.filter_filteredRow);
C=C.eq(0)
}for(K=0;
K<D.length;
K++){J.$row=D.eq(K);
J.cacheArray=o.child[K];
J.rawArray=J.cacheArray;
M=c.processRow(H,J,v);
z=z||M;
if(!i.filter_childWithSibs&&M){D.eq(K).removeClass(i.filter_filteredRow)
}}}z=z||j
}else{z=M
}C.toggleClass(i.filter_filteredRow,!z)[0].display=z?"":"none"
}}H.filteredRows+=y.not("."+i.filter_filteredRow).length;
H.totalRows+=y.length;
d.processTbody(G,x,false)
}H.lastCombinedFilter=p;
H.lastSearch=k;
H.$table.data("lastSearch",k);
if(i.filter_saveFilters&&d.storage){d.storage(G,"tablesorter-filters",c.processFilters(k,true))
}if(H.debug){console.log("Completed filter widget search"+d.benchmark(m))
}if(i.filter_initialized){H.$table.triggerHandler("filterBeforeEnd",H);
H.$table.triggerHandler("filterEnd",H)
}setTimeout(function(){d.applyWidget(H.table)
},0)
},getOptionSource:function(p,i,j){p=g(p)[0];
var m=p.config,n=m.widgetOptions,k=false,h=n.filter_selectSource,o=m.$table.data("lastSearch")||[],l=typeof h==="function"?true:d.getColumnData(p,h,i);
if(j&&o[i]!==""){j=false
}if(l===true){k=h(p,i,j)
}else{if(l instanceof g||(g.type(l)==="string"&&l.indexOf("</option>")>=0)){return l
}else{if(g.isArray(l)){k=l
}else{if(g.type(h)==="object"&&l){k=l(p,i,j)
}}}}if(k===false){k=c.getOptions(p,i,j)
}return c.processOptions(p,i,k)
},processOptions:function(s,i,m){if(!g.isArray(m)){return false
}s=g(s)[0];
var h,k,l,n,r,q,p=s.config,j=typeof i!=="undefined"&&i!==null&&i>=0&&i<p.columns,o=[];
m=g.grep(m,function(u,t){if(u.text){return true
}return g.inArray(u,m)===t
});
if(j&&p.$headerIndexed[i].hasClass("filter-select-nosort")){return m
}else{n=m.length;
for(l=0;
l<n;
l++){k=m[l];
q=k.text?k.text:k;
r=(j&&p.parsers&&p.parsers.length&&p.parsers[i].format(q,s,[],i)||q).toString();
r=p.widgetOptions.filter_ignoreCase?r.toLowerCase():r;
if(k.text){k.parsed=r;
o[o.length]=k
}else{o[o.length]={text:k,parsed:r}
}}h=p.textSorter||"";
o.sort(function(v,u){var t=v.parsed,w=u.parsed;
if(j&&typeof h==="function"){return h(t,w,true,i,s)
}else{if(j&&typeof h==="object"&&h.hasOwnProperty(i)){return h[i](t,w,true,i,s)
}else{if(d.sortNatural){return d.sortNatural(t,w)
}}}return true
});
m=[];
n=o.length;
for(l=0;
l<n;
l++){m[m.length]=o[l]
}return m
}},getOptions:function(t,j,l){t=g(t)[0];
var p,q,n,u,h,k,i,s,o=t.config,r=o.widgetOptions,m=[];
for(q=0;
q<o.$tbodies.length;
q++){h=o.cache[q];
n=o.cache[q].normalized.length;
for(p=0;
p<n;
p++){u=h.row?h.row[p]:h.normalized[p][o.columns].$row[0];
if(l&&u.className.match(r.filter_filteredRow)){continue
}if(r.filter_useParsedData||o.parsers[j].parsed||o.$headerIndexed[j].hasClass("filter-parsed")){m[m.length]=""+h.normalized[p][j];
if(r.filter_childRows&&r.filter_childByColumn){s=h.normalized[p][o.columns].$row.length-1;
for(k=0;
k<s;
k++){m[m.length]=""+h.normalized[p][o.columns].child[k][j]
}}}else{m[m.length]=h.normalized[p][o.columns].raw[j];
if(r.filter_childRows&&r.filter_childByColumn){s=h.normalized[p][o.columns].$row.length;
for(k=1;
k<s;
k++){i=h.normalized[p][o.columns].$row.eq(k).children().eq(j);
m[m.length]=""+d.getElementText(o,i,j)
}}}}}return m
},buildSelect:function(x,j,o,u,m){x=g(x)[0];
j=parseInt(j,10);
if(!x.config.cache||g.isEmptyObject(x.config.cache)){return
}var n,h,k,w,p,r,l,q=x.config,s=q.widgetOptions,i=q.$headerIndexed[j],y='<option value="">'+(i.data("placeholder")||i.attr("data-placeholder")||s.filter_placeholder.select||"")+"</option>",v=q.$table.find("thead").find("select."+b.filter+'[data-column="'+j+'"]').val();
if(typeof o==="undefined"||o===""){o=c.getOptionSource(x,j,m)
}if(g.isArray(o)){for(n=0;
n<o.length;
n++){l=o[n];
if(l.text){l["data-function-name"]=typeof l.value==="undefined"?l.text:l.value;
y+="<option";
for(h in l){if(l.hasOwnProperty(h)&&h!=="text"){y+=" "+h+'="'+l[h]+'"'
}}if(!l.value){y+=' value="'+l.text+'"'
}y+=">"+l.text+"</option>"
}else{if(""+l!=="[object Object]"){k=l=(""+l).replace(f.quote,"&quot;");
h=k;
if(k.indexOf(s.filter_selectSourceSeparator)>=0){w=k.split(s.filter_selectSourceSeparator);
h=w[0];
k=w[1]
}y+=l!==""?"<option "+(h===k?"":'data-function-name="'+l+'" ')+'value="'+h+'">'+k+"</option>":""
}}}o=[]
}p=(q.$filters?q.$filters:q.$table.children("thead")).find("."+b.filter);
if(s.filter_$externalFilters){p=p&&p.length?p.add(s.filter_$externalFilters):s.filter_$externalFilters
}r=p.filter('select[data-column="'+j+'"]');
if(r.length){r[u?"html":"append"](y);
if(!g.isArray(o)){r.append(o).val(v)
}r.val(v)
}},buildDefault:function(m,l){var k,h,n,o=m.config,j=o.widgetOptions,i=o.columns;
for(k=0;
k<i;
k++){h=o.$headerIndexed[k];
n=!(h.hasClass("filter-false")||h.hasClass("parser-false"));
if((h.hasClass("filter-select")||d.getColumnData(m,j.filter_functions,k)===true)&&n){c.buildSelect(m,k,"",l,h.hasClass(j.filter_onlyAvail))
}}}};
f=c.regex;
d.getFilters=function(r,k,p,s){var j,l,q,n,h=[],m=r?g(r)[0].config:"",o=m?m.widgetOptions:"";
if((k!==true&&o&&!o.filter_columnFilters)||(g.isArray(p)&&p.join("")===m.lastCombinedFilter)){return g(r).data("lastSearch")
}if(m){if(m.$filters){l=m.$filters.find("."+b.filter)
}if(o.filter_$externalFilters){l=l&&l.length?l.add(o.filter_$externalFilters):o.filter_$externalFilters
}if(l&&l.length){h=p||[];
for(j=0;
j<m.columns+1;
j++){n=(j===m.columns?o.filter_anyColumnSelector+","+o.filter_multipleColumnSelector:'[data-column="'+j+'"]');
q=l.filter(n);
if(q.length){q=c.getLatestSearch(q);
if(g.isArray(p)){if(s&&q.length>1){q=q.slice(1)
}if(j===m.columns){n=q.filter(o.filter_anyColumnSelector);
q=n.length?n:q
}q.val(p[j]).trigger("change"+m.namespace)
}else{h[j]=q.val()||"";
if(j===m.columns){q.slice(1).filter('[data-column*="'+q.attr("data-column")+'"]').val(h[j])
}else{q.slice(1).val(h[j])
}}if(j===m.columns&&q.length){o.filter_$anyMatch=q
}}}}}return h
};
d.setFilters=function(l,j,h,i){var m=l?g(l)[0].config:"",k=d.getFilters(l,true,j,i);
if(typeof h==="undefined"){h=true
}if(m&&h){m.lastCombinedFilter=null;
m.lastSearch=[];
c.searching(m.table,j,i);
m.$table.triggerHandler("filterFomatterUpdate")
}return k.length!==0
}
})(a);
/*! Widget: stickyHeaders - updated 7/31/2016 (v2.27.0) */
;
(function(d,c){var b=d.tablesorter||{};
d.extend(b.css,{sticky:"tablesorter-stickyHeader",stickyVis:"tablesorter-sticky-visible",stickyHide:"tablesorter-sticky-hidden",stickyWrap:"tablesorter-sticky-wrapper"});
b.addHeaderResizeEvent=function(j,f,i){j=d(j)[0];
if(!j.config){return
}var k={timer:250},e=d.extend({},k,i),l=j.config,h=l.widgetOptions,g=function(s){var p,t,o,r,q,n,m=l.$headers.length;
h.resize_flag=true;
t=[];
for(p=0;
p<m;
p++){o=l.$headers.eq(p);
r=o.data("savedSizes")||[0,0];
q=o[0].offsetWidth;
n=o[0].offsetHeight;
if(q!==r[0]||n!==r[1]){o.data("savedSizes",[q,n]);
t.push(o[0])
}}if(t.length&&s!==false){l.$table.triggerHandler("resize",[t])
}h.resize_flag=false
};
clearInterval(h.resize_timer);
if(f){h.resize_flag=false;
return false
}g(false);
h.resize_timer=setInterval(function(){if(h.resize_flag){return
}g()
},e.timer)
};
b.addWidget({id:"stickyHeaders",priority:55,options:{stickyHeaders:"",stickyHeaders_appendTo:null,stickyHeaders_attachTo:null,stickyHeaders_xScroll:null,stickyHeaders_yScroll:null,stickyHeaders_offset:0,stickyHeaders_filteredToTop:true,stickyHeaders_cloneId:"-sticky",stickyHeaders_addResizeEvent:true,stickyHeaders_includeCaption:true,stickyHeaders_zIndex:2},format:function(y,z,h){if(z.$table.hasClass("hasStickyHeaders")||(d.inArray("filter",z.widgets)>=0&&!z.$table.hasClass("hasFilters"))){return
}var m,v,w,r=z.$table,E=d(h.stickyHeaders_attachTo),t=z.namespace+"stickyheaders ",u=d(h.stickyHeaders_yScroll||h.stickyHeaders_attachTo||c),l=d(h.stickyHeaders_xScroll||h.stickyHeaders_attachTo||c),q=r.children("thead:first"),B=q.children("tr").not(".sticky-false").children(),f=r.children("tfoot"),k=isNaN(h.stickyHeaders_offset)?d(h.stickyHeaders_offset):"",o=k.length?k.height()||0:parseInt(h.stickyHeaders_offset,10)||0,A=r.parent().closest("."+b.css.table).hasClass("hasStickyHeaders")?r.parent().closest("table.tablesorter")[0].config.widgetOptions.$sticky.parent():[],x=A.length?A.height():0,D=h.$sticky=r.clone().addClass("containsStickyHeaders "+b.css.sticky+" "+h.stickyHeaders+" "+z.namespace.slice(1)+"_extra_table").wrap('<div class="'+b.css.stickyWrap+'">'),p=D.parent().addClass(b.css.stickyHide).css({position:E.length?"absolute":"fixed",padding:parseInt(D.parent().parent().css("padding-left"),10),top:o+x,left:0,visibility:"hidden",zIndex:h.stickyHeaders_zIndex||2}),C=D.children("thead:first"),n,s="",j=0,e=function(L,J){var I,F,G,M,K,N=L.filter(":visible"),H=N.length;
for(I=0;
I<H;
I++){M=J.filter(":visible").eq(I);
K=N.eq(I);
if(K.css("box-sizing")==="border-box"){F=K.outerWidth()
}else{if(M.css("border-collapse")==="collapse"){if(c.getComputedStyle){F=parseFloat(c.getComputedStyle(K[0],null).width)
}else{G=parseFloat(K.css("border-width"));
F=K.outerWidth()-parseFloat(K.css("padding-left"))-parseFloat(K.css("padding-right"))-G
}}else{F=K.width()
}}M.css({width:F,"min-width":F,"max-width":F})
}},g=function(){o=k.length?k.height()||0:parseInt(h.stickyHeaders_offset,10)||0;
j=0;
p.css({left:E.length?parseInt(E.css("padding-left"),10)||0:r.offset().left-parseInt(r.css("margin-left"),10)-l.scrollLeft()-j,width:r.outerWidth()});
e(r,D);
e(B,n)
},i=function(M){if(!r.is(":visible")){return
}x=A.length?A.offset().top-u.scrollTop()+A.height():0;
var J=r.offset(),L=d.isWindow(u[0]),O=d.isWindow(l[0]),N=E.length?(L?u.scrollTop():u.offset().top):u.scrollTop(),I=h.stickyHeaders_includeCaption?0:r.children("caption").height()||0,G=N+o+x-I,H=r.height()-(p.height()+(f.height()||0))-I,K=(G>J.top)&&(G<J.top+H)?"visible":"hidden",F={visibility:K};
if(E.length){F.top=L?G-E.offset().top:E.scrollTop()
}if(O){F.left=r.offset().left-parseInt(r.css("margin-left"),10)-l.scrollLeft()-j
}if(A.length){F.top=(F.top||0)+o+x
}p.removeClass(b.css.stickyVis+" "+b.css.stickyHide).addClass(K==="visible"?b.css.stickyVis:b.css.stickyHide).css(F);
if(K!==s||M){g();
s=K
}};
if(E.length&&!E.css("position")){E.css("position","relative")
}if(D.attr("id")){D[0].id+=h.stickyHeaders_cloneId
}D.find("thead:gt(0), tr.sticky-false").hide();
D.find("tbody, tfoot").remove();
D.find("caption").toggle(h.stickyHeaders_includeCaption);
n=C.children().children();
D.css({height:0,width:0,margin:0});
n.find("."+b.css.resizer).remove();
r.addClass("hasStickyHeaders").bind("pagerComplete"+t,function(){g()
});
b.bindEvents(y,C.children().children("."+b.css.header));
if(h.stickyHeaders_appendTo){d(h.stickyHeaders_appendTo).append(p)
}else{r.after(p)
}if(z.onRenderHeader){w=C.children("tr").children();
v=w.length;
for(m=0;
m<v;
m++){z.onRenderHeader.apply(w.eq(m),[m,z,D])
}}l.add(u).unbind(("scroll resize ".split(" ").join(t)).replace(/\s+/g," ")).bind("scroll resize ".split(" ").join(t),function(F){i(F.type==="resize")
});
z.$table.unbind("stickyHeadersUpdate"+t).bind("stickyHeadersUpdate"+t,function(){i(true)
});
if(h.stickyHeaders_addResizeEvent){b.addHeaderResizeEvent(y)
}if(r.hasClass("hasFilters")&&h.filter_columnFilters){r.bind("filterEnd"+t,function(){var G=d(document.activeElement).closest("td"),F=G.parent().children().index(G);
if(p.hasClass(b.css.stickyVis)&&h.stickyHeaders_filteredToTop){c.scrollTo(0,r.position().top);
if(F>=0&&z.$filters){z.$filters.eq(F).find("a, select, input").filter(":visible").focus()
}}});
b.filter.bindSearch(r,n.find("."+b.css.filter));
if(h.filter_hideFilters){b.filter.hideFilters(z,D)
}}if(h.stickyHeaders_addResizeEvent){r.bind("resize"+z.namespace+"stickyheaders",function(){g()
})
}r.triggerHandler("stickyHeadersInit")
},remove:function(g,h,f){var e=h.namespace+"stickyheaders ";
h.$table.removeClass("hasStickyHeaders").unbind(("pagerComplete resize filterEnd stickyHeadersUpdate ".split(" ").join(e)).replace(/\s+/g," ")).next("."+b.css.stickyWrap).remove();
if(f.$sticky&&f.$sticky.length){f.$sticky.remove()
}d(c).add(f.stickyHeaders_xScroll).add(f.stickyHeaders_yScroll).add(f.stickyHeaders_attachTo).unbind(("scroll resize ".split(" ").join(e)).replace(/\s+/g," "));
b.addHeaderResizeEvent(g,true)
}})
})(a,window);
/*! Widget: resizable - updated 6/28/2016 (v2.26.5) */
;
(function(d,c){var b=d.tablesorter||{};
d.extend(b.css,{resizableContainer:"tablesorter-resizable-container",resizableHandle:"tablesorter-resizable-handle",resizableNoSelect:"tablesorter-disableSelection",resizableStorage:"tablesorter-resizable"});
d(function(){var e="<style>body."+b.css.resizableNoSelect+" { -ms-user-select: none; -moz-user-select: -moz-none;-khtml-user-select: none; -webkit-user-select: none; user-select: none; }."+b.css.resizableContainer+" { position: relative; height: 1px; }."+b.css.resizableHandle+" { position: absolute; display: inline-block; width: 8px;top: 1px; cursor: ew-resize; z-index: 3; user-select: none; -moz-user-select: none; }</style>";
d(e).appendTo("body")
});
b.resizable={init:function(l,m){if(l.$table.hasClass("hasResizable")){return
}l.$table.addClass("hasResizable");
var n,e,g,i,j,o=l.$table,h=o.parent(),f=parseInt(o.css("margin-top"),10),k=m.resizable_vars={useStorage:b.storage&&m.resizable!==false,$wrap:h,mouseXPosition:0,$target:null,$next:null,overflow:h.css("overflow")==="auto"||h.css("overflow")==="scroll"||h.css("overflow-x")==="auto"||h.css("overflow-x")==="scroll",storedSizes:[]};
b.resizableReset(l.table,true);
k.tableWidth=o.width();
k.fullWidth=Math.abs(h.width()-k.tableWidth)<20;
if(k.useStorage&&k.overflow){b.storage(l.table,"tablesorter-table-original-css-width",k.tableWidth);
j=b.storage(l.table,"tablesorter-table-resized-width")||"auto";
b.resizable.setWidth(o,j,true)
}m.resizable_vars.storedSizes=i=(k.useStorage?b.storage(l.table,b.css.resizableStorage):[])||[];
b.resizable.setWidths(l,m,i);
b.resizable.updateStoredSizes(l,m);
m.$resizable_container=d('<div class="'+b.css.resizableContainer+'">').css({top:f}).insertBefore(o);
for(g=0;
g<l.columns;
g++){e=l.$headerIndexed[g];
j=b.getColumnData(l.table,l.headers,g);
n=b.getData(e,j,"resizable")==="false";
if(!n){d('<div class="'+b.css.resizableHandle+'">').appendTo(m.$resizable_container).attr({"data-column":g,unselectable:"on"}).data("header",e).bind("selectstart",false)
}}b.resizable.bindings(l,m)
},updateStoredSizes:function(j,h){var g,f,e=j.columns,i=h.resizable_vars;
i.storedSizes=[];
for(g=0;
g<e;
g++){f=j.$headerIndexed[g];
i.storedSizes[g]=f.is(":visible")?f.width():0
}},setWidth:function(e,f,g){e.css({width:f,"min-width":g?f:"","max-width":g?f:""})
},setWidths:function(l,g,j){var f,k,i=g.resizable_vars,h=d(l.namespace+"_extra_headers"),e=l.$table.children("colgroup").children("col");
j=j||i.storedSizes||[];
if(j.length){for(f=0;
f<l.columns;
f++){b.resizable.setWidth(l.$headerIndexed[f],j[f],i.overflow);
if(h.length){k=h.eq(f).add(e.eq(f));
b.resizable.setWidth(k,j[f],i.overflow)
}}k=d(l.namespace+"_extra_table");
if(k.length&&!b.hasWidget(l.table,"scroller")){b.resizable.setWidth(k,l.$table.outerWidth(),i.overflow)
}}},setHandlePosition:function(j,i){var h,f=j.$table.height(),e=i.$resizable_container.children(),g=Math.floor(e.width()/2);
if(b.hasWidget(j.table,"scroller")){f=0;
j.$table.closest("."+b.css.scrollerWrap).children().each(function(){var k=d(this);
f+=k.filter('[style*="height"]').length?k.height():k.children("table").height()
})
}h=j.$table.position().left;
e.each(function(){var n=d(this),m=parseInt(n.attr("data-column"),10),l=j.columns-1,k=n.data("header");
if(!k){return
}if(!k.is(":visible")){n.hide()
}else{if(m<l||m===l&&i.resizable_addLastColumn){n.css({display:"inline-block",height:f,left:k.position().left-h+k.outerWidth()-g})
}}})
},toggleTextSelection:function(h,g,e){var f=h.namespace+"tsresize";
g.resizable_vars.disabled=e;
d("body").toggleClass(b.css.resizableNoSelect,e);
if(e){d("body").attr("unselectable","on").bind("selectstart"+f,false)
}else{d("body").removeAttr("unselectable").unbind("selectstart"+f)
}},bindings:function(g,f){var e=g.namespace+"tsresize";
f.$resizable_container.children().bind("mousedown",function(j){var i,l=f.resizable_vars,k=d(g.namespace+"_extra_headers"),h=d(j.target).data("header");
i=parseInt(h.attr("data-column"),10);
l.$target=h=h.add(k.filter('[data-column="'+i+'"]'));
l.target=i;
l.$next=j.shiftKey||f.resizable_targetLast?h.parent().children().not(".resizable-false").filter(":last"):h.nextAll(":not(.resizable-false)").eq(0);
i=parseInt(l.$next.attr("data-column"),10);
l.$next=l.$next.add(k.filter('[data-column="'+i+'"]'));
l.next=i;
l.mouseXPosition=j.pageX;
b.resizable.updateStoredSizes(g,f);
b.resizable.toggleTextSelection(g,f,true)
});
d(document).bind("mousemove"+e,function(h){var i=f.resizable_vars;
if(!i.disabled||i.mouseXPosition===0||!i.$target){return
}if(f.resizable_throttle){clearTimeout(i.timer);
i.timer=setTimeout(function(){b.resizable.mouseMove(g,f,h)
},isNaN(f.resizable_throttle)?5:f.resizable_throttle)
}else{b.resizable.mouseMove(g,f,h)
}}).bind("mouseup"+e,function(){if(!f.resizable_vars.disabled){return
}b.resizable.toggleTextSelection(g,f,false);
b.resizable.stopResize(g,f);
b.resizable.setHandlePosition(g,f)
});
d(c).bind("resize"+e+" resizeEnd"+e,function(){b.resizable.setHandlePosition(g,f)
});
g.$table.bind("columnUpdate"+e+" pagerComplete"+e,function(){b.resizable.setHandlePosition(g,f)
}).find("thead:first").add(d(g.namespace+"_extra_table").find("thead:first")).bind("contextmenu"+e,function(){var h=f.resizable_vars.storedSizes.length===0;
b.resizableReset(g.table);
b.resizable.setHandlePosition(g,f);
f.resizable_vars.storedSizes=[];
return h
})
},mouseMove:function(k,m,f){if(m.resizable_vars.mouseXPosition===0||!m.resizable_vars.$target){return
}var g,l=0,j=m.resizable_vars,h=j.$next,i=j.storedSizes[j.target],e=f.pageX-j.mouseXPosition;
if(j.overflow){if(i+e>0){j.storedSizes[j.target]+=e;
b.resizable.setWidth(j.$target,j.storedSizes[j.target],true);
for(g=0;
g<k.columns;
g++){l+=j.storedSizes[g]
}b.resizable.setWidth(k.$table.add(d(k.namespace+"_extra_table")),l)
}if(!h.length){j.$wrap[0].scrollLeft=k.$table.width()
}}else{if(j.fullWidth){j.storedSizes[j.target]+=e;
j.storedSizes[j.next]-=e;
b.resizable.setWidths(k,m)
}else{j.storedSizes[j.target]+=e;
b.resizable.setWidths(k,m)
}}j.mouseXPosition=f.pageX;
k.$table.triggerHandler("stickyHeadersUpdate")
},stopResize:function(g,e){var f=e.resizable_vars;
b.resizable.updateStoredSizes(g,e);
if(f.useStorage){b.storage(g.table,b.css.resizableStorage,f.storedSizes);
b.storage(g.table,"tablesorter-table-resized-width",g.$table.width())
}f.mouseXPosition=0;
f.$target=f.$next=null;
g.$table.triggerHandler("stickyHeadersUpdate")
}};
b.addWidget({id:"resizable",priority:40,options:{resizable:true,resizable_addLastColumn:false,resizable_widths:[],resizable_throttle:false,resizable_targetLast:false,resizable_fullWidth:null},init:function(g,f,h,e){b.resizable.init(h,e)
},format:function(f,g,e){b.resizable.setHandlePosition(g,e)
},remove:function(g,i,f,h){if(f.$resizable_container){var e=i.namespace+"tsresize";
i.$table.add(d(i.namespace+"_extra_table")).removeClass("hasResizable").children("thead").unbind("contextmenu"+e);
f.$resizable_container.remove();
b.resizable.toggleTextSelection(i,f,false);
b.resizableReset(g,h);
d(document).unbind("mousemove"+e+" mouseup"+e)
}}});
b.resizableReset=function(e,f){d(e).each(function(){var g,k,j=this.config,h=j&&j.widgetOptions,i=h.resizable_vars;
if(e&&j&&j.$headerIndexed.length){if(i.overflow&&i.tableWidth){b.resizable.setWidth(j.$table,i.tableWidth,true);
if(i.useStorage){b.storage(e,"tablesorter-table-resized-width","auto")
}}for(g=0;
g<j.columns;
g++){k=j.$headerIndexed[g];
if(h.resizable_widths&&h.resizable_widths[g]){b.resizable.setWidth(k,h.resizable_widths[g],i.overflow)
}else{if(!k.hasClass("resizable-false")){b.resizable.setWidth(k,"",i.overflow)
}}}j.$table.triggerHandler("stickyHeadersUpdate");
if(b.storage&&!f){b.storage(this,b.css.resizableStorage,{})
}}})
}
})(a,window);
/*! Widget: saveSort - updated 10/31/2015 (v2.24.0) */
;
(function(c){var b=c.tablesorter||{};
b.addWidget({id:"saveSort",priority:20,options:{saveSort:true},init:function(f,e,g,d){e.format(f,g,d,true)
},format:function(l,h,i,k){var g,d,j=h.$table,e=i.saveSort!==false,f={sortList:h.sortList};
if(h.debug){d=new Date()
}if(j.hasClass("hasSaveSort")){if(e&&l.hasInitialized&&b.storage){b.storage(l,"tablesorter-savesort",f);
if(h.debug){console.log("saveSort widget: Saving last sort: "+h.sortList+b.benchmark(d))
}}}else{j.addClass("hasSaveSort");
f="";
if(b.storage){g=b.storage(l,"tablesorter-savesort");
f=(g&&g.hasOwnProperty("sortList")&&c.isArray(g.sortList))?g.sortList:"";
if(h.debug){console.log('saveSort: Last sort loaded: "'+f+'"'+b.benchmark(d))
}j.bind("saveSortReset",function(m){m.stopPropagation();
b.storage(l,"tablesorter-savesort","")
})
}if(k&&f&&f.length>0){h.sortList=f
}else{if(l.hasInitialized&&f&&f.length>0){b.sortOn(h,f)
}}}},remove:function(d,e){e.$table.removeClass("hasSaveSort");
if(b.storage){b.storage(d,"tablesorter-savesort","")
}}})
})(a);
return a.tablesorter
}));