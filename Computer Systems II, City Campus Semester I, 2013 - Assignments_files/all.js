cacheD=111111111;
function updateContent(_1,_2){
var _3="#"+"contentDiv";
if(!$(_3)){
_3="#"+"content";
}
if($(_3)&&_1){
var _4=new Date();
_1=_1+"?date="+_4.getTime();
var _5=window.location.href;
var _6=$(_3).load(_1,_2,function(){
if(_5.indexOf("cmd")>-1){
_5=_5.split("?")[0];
}
addressIds=_2.split("&");
var _7="";
var _8="";
var _9="";
for(var i=1;i<addressIds.length-1;i++){
_7+="&"+addressIds[i];
if(addressIds[i].indexOf("subunitidentifier")>-1){
_8=addressIds[i].split("=")[1];
}else{
if(addressIds[i].indexOf("subid")>-1){
_9=addressIds[i].split("=")[1];
}
}
}
if(!jQuery.browser.mozilla){
var _a="?cmd=view_";
if(_7.indexOf("menuidentifier")>-1){
commandOut="menu";
if(_7.indexOf("pageidentifier")>-1){
commandOut="page";
}
_a+=commandOut;
}else{
if(_7.indexOf("&unitidentifier")>-1){
_a+="unit";
}else{
if(_7.indexOf("&sectionidentifier")>-1){
_a+="section";
}else{
_a+="topic";
}
}
}
if(_8.indexOf("_")>-1){
_5=_5+_a+_7+"#__hash__"+_8;
}else{
_5=_5+_a+_7+"#__hash__"+_8+"_"+_9;
}
window.location=_5;
if(window.location.href==_5){
window.location.reload();
}
}else{
startup();
try{
if(_8.indexOf("_")>-1){
glider1.scrollTo(-99,_8);
}else{
glider1.scrollTo(-99,_8+"_"+_9);
}
}
catch(e){
}
}
});
}
};
function highlightTab(_b,_c,_d){
try{
_b="#"+_b;
if(_c!=0){
jQuery(_b).css("borderColor","red");
}else{
jQuery(_b).css("borderColor",_d);
}
}
catch(e){
}
};
function updatePopUp(_e,_f){
var _10="#"+"popupArea";
if(!$(_10)){
_10="#"+"content";
}
$(_10).slideDown("slow");
if($(_10)&&_e){
var _11=$(_10).load(_e,_f,function(){
startup();
});
}
};
function updatePublish(_12,_13,_14,_15){
var _16="Are you sure you want to publish your changes and make them available to students?";
var _17="<p><img src='images/spinner.gif' /> Publishing...please wait</p>";
if(typeof (_14)=="undefined"){
_14=0;
}
var _18=new Date();
var _19=_18.getMinutes();
var _1a=30-_19%30;
if(_14==1){
_16="Are you sure you want to publish your changes and make them available to students?  Note: It may take up to "+_1a+" minutes before students see the latest version.";
_17="<p><img src='images/spinner.gif' /> Publishing...please wait. <br />&nbsp;&nbsp;&nbsp;&nbsp;Note: It may take up to "+_1a+" minutes before students see the latest version.</p> ";
}
if(window.confirm(_16)){
_12="#"+_12;
jQuery(_12).show();
$(_12).html(_17);
var _1b=new Date();
_13=_13+"&date="+_1b.getTime();
if($(_12)&&_13){
var _1c=$(_12).load(_13,_15,function(){
shrinkMessage(_12,"<strong>Done !!</strong>");
});
}
}
};
function showAddPageForm(_1d,_1e,_1f){
_1d="#"+_1d;
if(!$(_1d)){
_1d="publishMessage";
}
$(_1d).show();
$(_1d).css({position:"relative",margin:"0 auto",width:"550px",border:"1px solid #111"});
if($(_1d)&&_1e){
var _20=new Date();
_1e=_1e+"&date="+_20.getTime();
myAjax=$(_1d).load(_1e,_1f,function(){
$("addPageForm").effect("highlight");
$("shortTitle").focus();
});
}
};
function shrinkMessage(_21,msg){
if(_21.substring(0,1)!=="#"){
_21="#"+_21;
}
if(!msg){
var msg="Done!!";
}
$(_21).html(msg);
$(_21).slideUp(7000);
};
function chooseSubtemplates(_22,_23,_24,_25){
commentsUrl=_23;
_22="#"+_22;
if(!$(_22)){
_22="#"+"selectSubtemplates";
}
var _26=new Date();
_23+="&date="+_26.getTime();
if($(_22)&&_23){
$(_22).load(_23,_24,function(){
if(_25!=1){
$.scrollTo(_22,{duration:2500});
}
});
}
};
function updateSubtemplatesList(_27,_28){
if(!$("#"+_27)){
_27="subtemplatesListForm";
}
pars=getRequestBody(_27);
_27="#"+_27;
try{
$(_27).slideUp(1000);
}
catch(e){
}
if($(_27)){
var _29=new Date();
var _2a=$(_27).load("start.pyg"+"?date="+_29.getTime(),pars,function(){
if(_28){
window.location=_28;
}else{
document.location.reload(true);
}
});
}
};
function closeSubtemplatesForm(_2b){
_2b="#"+_2b;
if(!$(_2b)){
_2b="#"+"subtemplatesListForm";
}
try{
$(_2b).slideUp(1000);
$(_2b).text("");
}
catch(e){
}
};
function encodeNameAndValue(_2c,_2d){
var _2e=encodeURIComponent(_2c);
_2e+="=";
_2e+=encodeURIComponent(_2d);
return _2e;
};
function getRequestBody(_2f){
var _30=new Array();
var _31=document.forms[_2f];
for(var i=0;i<_31.elements.length;i++){
var _32=_31.elements[i];
switch(_32.type){
case "button":
case "submit":
case "reset":
break;
case "checkbox":
case "radio":
if(!_32.checked){
break;
}
case "text":
case "hidden":
case "password":
_30.push(encodeNameAndValue(_32.name,_32.value));
break;
default:
switch(_32.tagName.toLowerCase()){
case "select":
_30.push(encodeNameAndValue(_32.name,_32.options[_32.selectedIndex].value));
break;
default:
_30.push(encodeNameAndValue(_32.name,_32.value));
}
}
}
return _30.join("&");
};
function menuFormBeforeSubmit(){
var _33=document.forms["edit"];
var _34="";
if(_33.title.value==""){
alert("title is required");
_33.title.focus();
return false;
}
for(var i=0;i<_33.showIn.length;i++){
if(_33.showIn[i].checked){
_34=_33.showIn[i].value;
break;
}
}
if(_34=="side"){
_33.showInNavi.value="yes";
_33.showInHeaderBar.value="no";
_33.hiddenPage.value="no";
}else{
if(_34=="top"){
_33.showInNavi.value="no";
_33.showInHeaderBar.value="yes";
_33.hiddenPage.value="no";
}else{
if(_34=="both"){
_33.showInNavi.value="yes";
_33.showInHeaderBar.value="yes";
_33.hiddenPage.value="no";
}else{
_33.showInNavi.value="no";
_33.showInHeaderBar.value="no";
_33.hiddenPage.value="yes";
}
}
}
_33.submit();
};
function loadTopics(_35){
var _36="#topicsContainer";
var _37="start.pyg?cmd=copyListFromCourse&courseidentifier="+_35;
if(typeof (_35)==undefined||_35==""){
return;
}
if(!$(_36)){
return;
}
var _38=$(_36).load(_37);
};
function submitCommentAction(_39,_3a){
_39.pageUrl.value=document.URL;
$("#pageComments").load(_39.action,$("#commentsForm").serialize(),function(){
chooseSubtemplates("comments",commentsUrl);
});
document.forms["commentsForm"].q3.value="";
};
function submitCommentElementAction(_3b,id){
_3b.pageUrl.value=document.URL;
var _3c=id;
var _3d="";
if(_3b.id!=""){
_3c=_3b.id.replace("commentsForm","");
}
if(jQuery("#comment"+id).length&&jQuery("#comment"+id).val()==""){
alert("No text provided!!");
return;
}
if(jQuery("#commentElement"+_3c).length){
jQuery("#commentElement"+_3c).load(_3b.action,jQuery(_3b).serialize());
}else{
jQuery("#commentsForm"+_3c).load(_3b.action,jQuery(_3b).serialize());
}
try{
_3d="<a href=\"javascript:void(0)\" onclick=\"jQuery( '#commentsForm"+_3c+"' ).show();jQuery(this).html('')\">Reply</a>";
jQuery("#commentsForm"+_3c).find("textarea").cleditor()[0].clear();
if(jQuery(_3b).find("#questionText"+id).size()==0){
jQuery("#commentsForm"+_3c).hide().after(_3d);
}
}
catch(e){
}
jQuery(".commentThank").fadeOut("slow");
};
function updateCommentsList(_3e,_3f,_40){
if(typeof (_3f)=="undefined"){
_3f="#pageComments";
}else{
_3f="#"+_3f;
}
if(window.confirm("Are you sure you want to delete this post !?")){
if(typeof (_40)!="undefined"){
try{
_3f="#"+jQuery("#"+_40).closest(".commentElements")[0].id;
}
catch(e){
}
}
if($(_3f)){
var _41=$(_3f).load(_3e);
}
}
};
function updateCommentsNum(_42,_43){
_42="#"+_42;
if(typeof (_42)=="undefined"){
_42="#spanComment";
}
if($(_42)){
var _44=new Date();
_43+="&date="+_44.getTime();
$(_42).load(_43);
}
};
function handleLoading(_45,_46,_47){
alert("readyState:"+_47.readyState+"\nresponseText:"+_47.responseText+"\nstatus:"+_47.status+"\nstatusText:"+_47.statusText+"\nSource Object Id: "+_47.instanceId+"\nResponse Body : "+_47.responseBody);
};
function handleError(_48,_49,_4a){
alert("Error: "+_4a.number+"\nType: "+_4a.name+"\nDescription: "+_4a.description+"\nSource Object Id: "+_4a.srcElement.instanceId);
};
function richTextComment(_4b){
_4b="#"+_4b;
var _4c=new punymce.Editor({id:_4b});
};
function likeit(_4d,_4e,_4f){
var _50,_51,_52;
$(_4d.target).removeAttr("onclick");
if(typeof (_4e)=="undefined"||_4e.split("|").length<3||typeof (cb_givenname)=="undefined"){
return;
}
if($("#"+_4f).next().html().indexOf(cb_givenname)>-1){
return;
}
var _53=_4e.split("|");
_50=_53[0];
_51=_53[1];
_52=_53[2];
var _54="https://www.coursebuilder.cad.auckland.ac.nz/showcomments/like.php";
if(document.location.href.indexOf("test")!=-1){
_54="https://test-coursebuilder.cad.auckland.ac.nz/showcomments/like.php";
}
$("#"+_4f).load(_54,{targetDir:_50,likeid:_51,subid:_52,name:cb_givenname});
};
function monitorComment(_55,_56,_57){
var _58=new Date();
_57="#"+_57;
if(_56["q2"].value==""){
alert("Please provide your email address and tick this box again");
if(_56["watch"].checked){
_56["watch"].checked=false;
}else{
_56["watch"].checked=true;
}
return false;
}
if(_56["watch"].checked){
_55+="&watch=1"+"&email="+_56["q2"].value;
}else{
_55+="&watch=0"+"&email="+_56["q2"].value;
}
_55=_55+"&date="+_58.getTime();
jQuery.ajaxSetup({transport:"flXHRproxy"});
$(_57).load(_55);
};
function showLevel(_59,_5a,_5b,_5c){
if(_5c==undefined){
_5c="appear";
}
var _5d=document.getElementById(_59);
var _5e=eval("document.getElementById(\"span"+_59+"\")");
if(_5d.style.display=="none"){
if(_5c=="appear"){
$("#"+_59).fadeIn("slow");
}else{
if(_5c=="slide"){
$("#"+_59).slideToggle("slow");
}else{
$("#"+_59).show("blind",{direction:"horizontal"},"slow");
}
}
$("#span"+_59).html(_5a);
}else{
if(_5c=="appear"){
$("#"+_59).fadeOut("slow");
}else{
if(_5c=="slide"){
$("#"+_59).slideToggle("slow");
}else{
$("#"+_59).hide("blind",{direction:"horizontal"},"slow");
}
}
$("#span"+_59).html(_5b);
}
};
function showHide(_5f,obj,_60,_61,_62,_63){
var url;
var _64;
var _65;
var _66=getObj(_5f);
if(_63==undefined){
_63="appear";
}
if($("#"+_5f).html()=="shown"){
url=_61;
_64="hidden";
_65="none";
if(_63=="appear"){
$("#"+_60).fadeOut("slow");
}else{
if(_63=="slide"){
$("#"+_60).slideToggle("slow");
}else{
$("#"+_60).hide("blind",{direction:"horizontal"},"slow");
}
}
}else{
url=_62;
_64="shown";
_65="block";
if(_63=="appear"){
$("#"+_60).fadeIn("slow");
}else{
if(_63=="slide"){
$("#"+_60).slideToggle("slow");
}else{
$("#"+_60).show("blind",{direction:"horizontal"},"slow");
}
}
}
$("#"+_5f).html(_64);
obj.src=url;
};
function hideShowText(_67,_68){
var _69=$("#"+_67);
var _6a="";
try{
if(getObj("hideShow_"+_67)){
$("#hideShow_"+_67).remove();
}else{
var _6b=document.createElement("div");
_6b.setAttribute("class","hideShowDiv");
_6b.setAttribute("id","hideShow_"+_67);
_6b.innerHTML=_68.hint;
$(_6b).insertAfter(_69);
}
}
catch(e){
}
};
function getObj(_6c){
return document.getElementById(_6c);
};
function showHideTimer(_6d,id){
document.getElementById(id).style.visibility="visible";
setTimeout("document.getElementById(\""+id+"\").style.visibility=\"hidden\";",_6d);
};
function inTab(elm){
if(elm.substring(0,1)!=="#"){
elm="#"+elm;
}
var _6e=false;
var _6f=false;
try{
if($(elm).parents(".section").attr("id")){
return _6e=$(elm).parents(".section");
}else{
if($("#_"+elm.substring(1)).parents(".section").attr("id")){
return _6e=$("#_"+elm.substring(1)).parents(".section");
}else{
if($(elm).is(".section")){
return _6e=$(elm);
}else{
if($("#_"+elm.substring(1)).is(".section")){
return _6e=$(elm);
}
}
}
}
}
catch(e){
}
try{
if($(elm).parents(".accordion").attr("id")){
_6e=$(elm).parents(".accordion_content");
}
}
catch(e){
}
return _6e;
};
function inAccordionHidden(elm){
var _70=false;
var _71=false;
if(!document.getElementById(elm)){
return false;
}
try{
_71=$("#"+elm).parent();
}
catch(e){
}
while(_71){
try{
if(_71.hasClass("caseStudyHidden")){
_70=true;
break;
}
}
catch(e){
}
_71=_71.parent();
}
return _70;
};
function myHighlight(elm){
var _72="";
var _73="";
var _74="";
var _75="";
if(elm.substring(0,1)!=="#"){
elm="#"+elm;
}
elm=elm.replace(/\./g,"").replace(/ /g,"");
_72=inTab(elm);
if(_72){
_73=_72.attr("id");
if(_72.is(".section")){
if(_73!=elm.substring(1)){
if($(elm).attr("id")){
$(elm).effect("highlight",{},4000);
}else{
if($("#_"+elm.substring(1)).attr("id")){
elm="#_"+elm.substring(1);
$(elm).effect("highlight",{},4000);
}
}
}
_75=_73.split("_")[0];
try{
eval("glider"+_75+".click('#"+_73+"')");
}
catch(e){
}
jQuery.scrollTo("#"+_73,{duration:1500});
}else{
if(_72.is(".accordion_content")){
try{
myAccordion=$(elm).parents(".accordion");
myAccordion.accordion("destroy");
myAccordion.accordion({collapsible:true,autoHeight:false,active:false});
myAccordion.accordion("activate","#ac_"+_72.attr("id").substring(4));
jQuery.scrollTo("#ac"+_72.attr("id").substring(4),{duration:1500});
$(elm).effect("highlight",{},4000);
}
catch(e){
jQuery.scrollTo(elm,{duration:1500});
$(elm).effect("highlight",{},4000);
}
}else{
jQuery.scrollTo(elm,{duration:1500});
$(elm).effect("highlight",{},4000);
}
}
}else{
try{
jQuery.scrollTo(elm,{duration:1500});
$(elm).effect("highlight",{},4000);
}
catch(e){
window.location=elm;
}
}
return false;
};
function adjustParentHeight(_76){
var _77;
var _78=0;
var _79="";
var _7a=0;
debug=0;
_77=inTab(_76);
_76="#"+_76;
if(debug){
console.log("parentTabName: %s",$(_77).attr("id"));
}
if(_77){
var _7b=$(_76).css("display");
var _7c=0;
$(_76).css("display","block");
_78=$(_76).height();
$(_76).css("display",_7b);
if(typeof (glider1)!="undefined"){
_79=$(_77).parents(".scrollerContainer");
_7c=_79.height();
if(_7b=="none"){
_7a=_7c+_78;
}else{
_7a=_7c-_78;
}
if(debug){
console.log("parentHeight:%s totalHeight: %s",_7c,_7a);
console.log("parent .scrollerContainer %s",$(_77).parents(".scrollerContainer"));
}
$(_77).css({height:_7a+"px"});
}
}
};
function checkTarget(_7d){
var _7e;
if(_7d.indexOf("#")>-1){
_7e=_7d.replace("__hash__","").split("#")[1];
myHighlight(_7e);
}
};
function moveItem(_7f,_80){
if(typeof (_7f)==typeof ("")){
_7f=$("#"+_7f);
}
if(typeof (_80)==typeof ("")){
_80=$("#"+_80);
}
_7f.parent().remove(_7f);
_80.append(_7f);
};
function hideShowPageSeperator(_81){
if(_81=="show"){
$(".pageSeperator").each(function(elm){
$("#"+elm).show();
});
$(".pageSeperatorDiv").each(function(_82){
$("#"+_82).hide();
});
}else{
$(".pageSeperator").each(function(elm){
$("#"+elm).hide();
});
$(".pageSeperatorDiv").each(function(_83){
$("#"+_83).show();
});
}
};
function backToCurrentGliderTag(){
var _84=window.location.href;
addressIds=_84.split("&");
_84=_84.split("?")[0];
var _85="";
var _86="";
var _87="";
for(var i=1;i<addressIds.length-1;i++){
_85+="&"+addressIds[i];
if(addressIds[i].indexOf("subunitidentifier")>-1){
_86=addressIds[i].split("=")[1];
}else{
if(addressIds[i].indexOf("subid")>-1){
_87=addressIds[i].split("=")[1];
}
}
}
var _88="?cmd=view_";
if(_85.indexOf("menuidentifier")>-1){
commandOut="menu";
if(_85.indexOf("pageidentifier")>-1){
commandOut="page";
}
_88+=commandOut;
}else{
if(_85.indexOf("&unitidentifier")>-1){
_88+="unit";
}else{
if(_85.indexOf("&sectionidentifier")>-1){
_88+="section";
}else{
_88+="topic";
}
}
}
if(_86.indexOf("_")>-1){
_84=_84+_88+_85+"#__hash__"+_86;
}else{
_84=_84+_88+_85+"#__hash__"+_86+"_"+_87;
}
window.location=_84;
};
var arrcloze=new Array();
function getFocus(){
try{
document.getElementById("answer1").focus();
}
catch(e){
}
};
function cloze(_89,_8a){
var _8b="";
var _8c=new Array("");
var _8d=0;
var IE;
if(navigator.appName=="Microsoft Internet Explorer"){
IE=true;
}else{
IE=false;
}
_8e(_8a);
function _8e(_8f){
document.write("<form action=\"javascript:void(0);\" autocomplete=\"off\">");
var i;
for(i=0;i<_8f.length;i++){
var _90=_8f.substr(i,1);
if(_90=="["){
i+=_91(_8f.substring(i+1,_8f.length));
}else{
if(_90=="{"){
i+=_92(_8f.substring(i+1,_8f.length));
}else{
document.write(_90);
}
}
}
if(IE){
document.write("<input type=\"submit\" style=\"width:0px; height:0px;\">");
}
document.write("</form>");
_93();
};
function _91(_94){
_8d++;
var i=0;
var _95=0;
var _96=0;
var _97="";
while(true){
var _98=_94.substr(i++,1);
if(_98=="]"){
_95=Math.max(_95,_96);
_8c.push(_97.split(","));
break;
}else{
if(_98==","){
_95=Math.max(_95,_96);
_96=0;
}
}
_97+=_98;
_96++;
}
document.write("<span class=\"cloze_table\"><img src=\"images/cloze/tick.gif\" width=\"10\" height=\"11\" style=\"position:absolute; left:0; top:-8px !important; top:0px; visibility:hidden\" id=\"image"+_8d+"\" /><span id=\"correction"+_8d+"\" class=\"rubyt\">"+(_8c[_8d])[0]+"</span><input type=\"text\" class=\"input\" size=\""+(_95+1)+"\" id=\"answer"+_8d+"\" onchange=\"arrcloze["+_89+"].checkAnswer(this, false); try { document.getElementById('answer"+(_8d+1)+"').focus(); } catch(e) {}\" maxlength=\""+(_95+3)+"\" value=\"\" /></span> ");
return _97.length+1;
};
function _92(_99){
_8d++;
var i=0;
var j;
var _9a=0;
var _9b=false;
var _9c="";
while(true){
var _9d=_99.substr(i++,1);
if(_9d=="}"){
_8c.push(_9c.split(","));
break;
}else{
if(_9d==","&&!_9b){
_9a++;
}else{
if(_9d=="#"){
_9b=true;
}
}
}
if(_9d!="#"){
_9c+=_9d;
}
}
document.writeln("<select class=\"input\" id=\"answer"+_8d+"\" onchange=\"arrcloze["+_89+"].checkSelect(this,this.options[this.selectedIndex].value,'"+(_8c[_8d])[_9a]+"'); try { document.getElementById('answer"+(_8d+1)+"').focus(); } catch(e) {}\" /> ");
document.writeln("<option value=\"---\">---</option>");
for(j=0;j<_8c[_8d].length;j++){
document.writeln("<option value='"+(_8c[_8d])[j]+"'>"+(_8c[_8d])[j]+"</option>");
}
document.writeln("</select> <img src=\"images/cloze/tick.gif\" width=\"10\" height=\"11\" style=\"display:none\" id=\"imagetick"+_8d+"\" /><img src=\"images/cloze/cross.gif\" width=\"10\" height=\"11\" style=\"display:none\" id=\"imagecross"+_8d+"\" /><img src=\"images/cloze/spacer.gif\" width=\"10\" height=\"11\" style=\"display:inline\" id=\"imagespacer"+_8d+"\" />");
return _9c.length+2;
};
function _9e(_9f){
_8b+=_9f;
};
function _93(){
};
function _a0(_a1){
return document.getElementById(_a1);
};
function _a2(obj,_a3){
var id=obj.id;
id=id.substring(6,id.length);
var _a4=obj.value;
_a4=_a4.replace(/ /g,"");
_a4=_a4.toLowerCase();
var i;
for(i=0;i<_8c[id].length;i++){
if(_a4==(_8c[id])[i]){
var _a5=_a0("image"+id);
_a5.style.visibility="visible";
return true;
}
}
_a0("correction"+id).style.visibility="visible";
obj.style.textDecoration="line-through";
obj.disabled=true;
obj.contentEditable=false;
};
function _a6(obj,_a7,_a8){
var id=obj.id;
id=id.substring(6,id.length);
var i;
var _a9=_a0("imagetick"+id);
var _aa=_a0("imagecross"+id);
var _ab=_a0("imagespacer"+id);
if(_a8==_a7){
_aa.style.display="none";
_ab.style.display="none";
_a9.style.display="inline";
}else{
if(_a7!="---"){
_a9.style.display="none";
_ab.style.display="none";
_aa.style.display="inline";
}else{
_a9.style.display="none";
_aa.style.display="none";
_ab.style.display="inline";
}
}
};
this.checkAnswer=_a2;
this.checkSelect=_a6;
};
function checkClozAnswer(obj,_ac){
var _ad=0;
var ax=obj.getAttribute("ax")?obj.getAttribute("ax"):"";
var _ae=ax.split(",");
var id=obj.id;
id=id.substring(6,id.length);
var _af="tick"+id;
var _b0=obj.value;
var _b1=0;
var _b2="";
try{
if(typeof (clozCaseSensitive)!="undefined"&&clozCaseSensitive==1){
_b1=1;
}
}
catch(e){
}
_b0=trim(_b0);
if(_b1!=1){
_b0=_b0.toLowerCase();
}
var i;
for(i=0;i<_ae.length;i++){
_b2=trim(_ae[i].replace("’","'"));
if(_b1!=1){
_b2=_b2.toLowerCase();
}
if(_b0==_b2){
var _b3=document.getElementById(_af);
_b3.style.display="inline";
obj.disabled=true;
obj.contentEditable=false;
return 1;
}
}
document.getElementById("correct"+id).style.visibility="visible";
document.getElementById("correct"+id).style.display="inline";
obj.style.textDecoration="line-through";
obj.disabled=true;
obj.contentEditable=false;
return 0;
};
function checkSelectAnswer(obj,_b4,_b5){
var id=obj.id;
id=id.substring(6,id.length);
var i;
var _b6=getObj("imagetick"+id);
var _b7=getObj("imagecross"+id);
var _b8=getObj("imagespacer"+id);
var _b9=0;
_b5=trim(_b5);
_b4=trim(_b4);
if(_b5==_b4){
_b7.style.display="none";
_b8.style.display="none";
_b6.style.display="inline";
document.getElementById("correct"+id).style.visibility="hidden";
_b9=1;
}else{
if(_b4!="---"){
_b6.style.display="none";
_b8.style.display="none";
_b7.style.display="inline";
document.getElementById("correct"+id).style.visibility="visible";
document.getElementById("correct"+id).style.display="inline";
}else{
_b6.style.display="none";
_b7.style.display="none";
_b8.style.display="inline";
}
}
return _b9;
};
function trim(str,_ba){
return ltrim(rtrim(str,_ba),_ba);
};
function ltrim(str,_bb){
_bb=_bb||"\\s";
return str.replace(new RegExp("^["+_bb+"]+","g"),"");
};
function rtrim(str,_bc){
_bc=_bc||"\\s";
return str.replace(new RegExp("["+_bc+"]+$","g"),"");
};
function focusNext(obj,_bd){
try{
if(obj.form.getAttribute("id")==$("#"+_bd).parents("form:first").attr("id")){
$("#"+_bd).focus();
}
}
catch(e){
}
};
function handleEnter(_be,_bf,_c0){
var _c1=_bf.keyCode?_bf.keyCode:_bf.which?_bf.which:_bf.charCode;
if(_c1==13){
var i;
for(i=0;i<_be.form.elements.length;i++){
if(_be==_be.form.elements[i]){
break;
}
}
i=(i+1)%_be.form.elements.length;
focusNext(_be,_c0);
return false;
}else{
return true;
}
};
function openCecil(){
if(typeof (myWindow)=="undefined"||myWindow.closed){
var _c2=screen.availWidth*0.9;
var _c3=screen.availHeight*0.7;
myWindow=window.open("http://cecil.auckland.ac.nz/","cecil","scrollbars=yes,toolbar=yes,status=yes,location=yes,menubar=yes,resizable=yes,top=30,left=30,width="+_c2+",height="+_c3+"");
}
myWindow.focus();
};
function goback(){
window.history.go(-1);
};
function showPNG(){
for(var i=0;i<document.images.length;i++){
var img=document.images[i];
var _c4=img.src.toUpperCase();
if(_c4.substring(_c4.length-3,_c4.length)=="PNG"){
img.style.visibility="visible";
}
}
};
var imapAreaOpen=[];
function MM_openBrWindow(_c5,_c6,_c7){
window.open(_c5,_c6,_c7);
};
var theTarget=null;
var objBrowse=navigator.appName;
var bodyScrollTop=0;
function showDiv(_c8,_c9,w,h,_ca){
hideDiv();
if(_ca==undefined){
_ca="";
}
var _cb=document.createElement("div");
var _cc;
_cb.id="popupmessage";
if(_c8!=""){
_cb.className="mediaFile";
}else{
_cb.className="mediaFileWhite";
}
if(_ca!=""){
cacXpos=(xpos-w-50)>10?(xpos-w-50):10;
}else{
cacXpos=(xpos-w/1.7)>10?(xpos-w/1.7):10;
}
if(_ca!=""&&_c8!=""){
cacYpos=(ypos-h/2-90)>10?(ypos-h/2-90):10;
}else{
if(_c8==""){
cacYpos=(ypos-50)>10?(ypos-50):10;
}else{
cacYpos=(ypos-h-90)>10?(ypos-h-90):10;
}
}
if(_c9=="mp3"){
cacYpos=(ypos-90)>10?(ypos-90):10;
}
if(cacYpos<bodyScrollTop){
cacYpos=bodyScrollTop;
}
_cb.style.cssText="left: "+(cacXpos)+"px; top: "+(cacYpos)+"px; width: "+w+"px;";
_cc="<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-top:5px; margin-bottom:5px;style=\"z-index:10001;\"><tr><td width=\"100%\" style=\"background-image:url(player/drag_bar.gif); background-repeat: repeat-x; background-position: 3px; border:1px solid  #757575;\" title=\"click and drag\"><img src=\"images/space.gif\" width=\"1\" height=\"1\" /></td><td style=\"padding-left:2px;\"><img src=\"player/close_small.png\" width=\"14\" height=\"14\" onclick=\"Javascript:hideDiv();\" title=\"close\" style=\"z-index:10001;\"/></td></tr></table>";
if(_c9=="wmv"){
_cc+="<EMBED ID=\"Player\" standby=\"Loading Microsoft Windows Media Player components...\" WIDTH=\""+(w)+"\" HEIGHT=\""+(h+47)+"\" CONTROLLER=\"TRUE\" SRC=\""+_c8+"\"  type=\"application/x-mplayer\" TARGET=\"myself\" BGCOLOR=\"#000000\" AnimationAtStart=\"true\" PLUGINSPAGE=\"https://www.microsoft.com/Windows/MediaPlayer/\" standby=\"Loading Microsoft Windows Media Player components...\" autostart=\"true\"></EMBED>";
}else{
if(_c9=="mp3"){
_cc+="<p id=\"Player\" class=\"mediaplugin\"><embed src=\"images/mediaplayer.swf\" width=\""+(w)+"\" height=\"20\" allowscriptaccess=\"sameDomain\" allowfullscreen=\"true\" flashvars=\"autostart=true&width=320&height=20&file="+_c8+"\"/></p>";
}else{
if(_c9=="mov"||_c9=="qtl"||_c9=="mp4"){
_cc+="<EMBED ID=\"Player\" WIDTH=\""+(w+2)+"\" HEIGHT=\""+(h+18)+"\" CONTROLLER=\"TRUE\" SRC=\""+_c8+"\"  type=\"video/quicktime\" TARGET=\"myself\" BGCOLOR=\"#000000\" PLUGINSPAGE=\"https://www.apple.com/quicktime/download/\" autostart=\"true\"></EMBED>";
}else{
if(_c9=="mpg"||_c9=="mpeg"){
_cc+="<p id=\"Player\" class=\"mediaplugin\"><object width=\""+(w+2)+"\" height=\""+(h+47)+"\"><param name=\"src\" value=\""+_c8+"\"><param name=\"controller\" value=\"true\"> <param name=\"autoplay\" value=\"true\"><embed src=\""+_c8+"\" width=\""+(w)+"\" height=\""+(h+47)+"\"    controller=\"true\" autoplay=\"true\"> </embed> </object></p>";
}else{
if(_c9=="avi"){
_cc+="<p id=\"Player\" class=\"mediaplugin\"><object width=\""+(w+2)+"\" height=\""+(h+2)+"\"> <param name=\"src\" value=\""+_c8+"\"> <param name=\"controller\" value=\"true\"> <param name=\"autoplay\" value=\"true\"> <embed src=\""+_c8+"\" width=\""+(w)+"\" height=\""+(h+2)+"\" controller=\"true\" autoplay=\"true\"> </embed></object></p>";
}else{
if(_c9=="swf_nocontrol"){
_cc+="<p id=\"Player\" class=\"mediaplugin swf\"><object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\"          codebase=\"https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" width=\""+(w+2)+"\" height=\""+(h+2)+"\" id=\"mp3player\"> <param name=\"movie\" value=\""+_c8+"\" /> <param name=\"quality\" value=\"high\" /> <param name=\"AllowScriptAccess\" value=\"never\" /> <embed src=\""+_c8+"\" quality=\"high\" width=\""+(w+2)+"\" height=\""+(h+2)+"\" name=\"flashfilter\" AllowScriptAccess=\"never\" type=\"application/x-shockwave-flash\" pluginspage=\"https://www.macromedia.com/go/getflashplayer\"></embed> </object></p>";
}else{
if(_c9=="swf"){
_cc+="<object id=\"Player\" class=\"mediaplugin flv\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\"\tcodebase=\"https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" \twidth=\""+(w-1)+"\" height=\""+(h+19)+"\" id=\"flvplayer\"> <param name=\"movie\" value=\"images/mediaplayer.swf?file="+_c8+"\" /><param name=\"quality\" value=\"high\" />\t<param name=\"bgcolor\" value=\"#FFFFFF\" /><param name=\"allowfullscreen\" value=\"true\"><param name=\"flashvars\" value=\"waitForPlay=yes&autostart=true\" /><embed  src=\"images/mediaplayer.swf?file="+_c8+"\" quality=\"high\" bgcolor=\"#FFFFFF\" width=\""+(w-1)+"\" height=\""+(h+19)+"\"name=\"flvplayer\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"sameDomain\" allowfullscreen=\"true\" flashvars=\"waitForPlay=yes&autostart=true\"  pluginspage=\"https://www.macromedia.com/go/getflashplayer\"></embed></object>";
}else{
if(_c9=="flv"){
if(_c8.substr(0,4)!="http"){
_c8="../"+_c8;
}
_cc+="<object id=\"Player\" class=\"mediaplugin flv\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\"\tcodebase=\"https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" \twidth=\""+(w)+"\" height=\""+(h+20)+"\" id=\"flvplayer\"> <param name=\"movie\" value=\"images/mediaplayer.swf?file="+_c8+"\" /><param name=\"quality\" value=\"high\" />\t<param name=\"bgcolor\" value=\"#FFFFFF\" /><param name=\"allowfullscreen\" value=\"true\"><param name=\"flashvars\" value=\"waitForPlay=yes&autostart=true\" /><embed  src=\"images/mediaplayer.swf?file="+_c8+"\" quality=\"high\" bgcolor=\"#FFFFFF\" width=\""+(w)+"\" height=\""+(h+20)+"\"name=\"flvplayer\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"sameDomain\" allowfullscreen=\"true\" flashvars=\"waitForPlay=yes&autostart=true\"  pluginspage=\"https://www.macromedia.com/go/getflashplayer\"></embed></object>";
}else{
if(_c9=="m4v"){
if(_c8.substr(0,4)!="http"){
_c8="../"+_c8;
}
_cc+="<object id=\"Player\" class=\"mediaplugin flv\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\"\tcodebase=\"https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" \twidth=\""+(w)+"\" height=\""+(h+20)+"\" id=\"flvplayer\"> <param name=\"movie\" value=\"images/mediaplayer.swf?file="+_c8+"\" /><param name=\"quality\" value=\"high\" />\t<param name=\"bgcolor\" value=\"#FFFFFF\" /><param name=\"allowfullscreen\" value=\"true\"><param name=\"flashvars\" value=\"waitForPlay=yes&autostart=true\" /><embed  src=\"images/mediaplayer.swf?file="+_c8+"\" quality=\"high\" bgcolor=\"#FFFFFF\" width=\""+(w)+"\" height=\""+(h+20)+"\"name=\"flvplayer\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"sameDomain\" allowfullscreen=\"true\" flashvars=\"waitForPlay=yes&autostart=true\"  pluginspage=\"https://www.macromedia.com/go/getflashplayer\"></embed></object>";
}else{
if(_c9=="html"){
_cc+=_c8;
}else{
if(_c9=="youtube"){
if(_c8.indexOf("http://www.youtube.com/watch?v=")>-1){
_c8=_c8.replace("http://www.youtube.com/watch?v=","");
}
if(_c8.indexOf("http://www.youtube.com/v/")<0){
_c8="https://www.youtube.com/v/"+_c8;
}
_cc+="<div id=\"Player\" class=\"mediaplugin\"><object width=\""+(w+2)+"\" height=\""+(h+20)+"\"><param name=\"movie\" value=\""+_c8+"&autoplay=1\" /><param name=\"wmode\" value=\"transparent\" /><embed src=\""+_c8+"&autoplay=1\" type=\"application/x-shockwave-flash\" wmode=\"transparent\" type=\"application/x-shockwave-flash\" width=\""+(w+2)+"\" height=\""+(h+20)+"\"></embed></object></div>";
}else{
if(_c9==""){
_cc+="<p id=\"Player\" class=\"mediaplugin\"></p>";
}else{
alert("media file type not supported");
return 0;
}
}
}
}
}
}
}
}
}
}
}
}
_cb.innerHTML=_cc+_ca;
document.body.appendChild(_cb);
$("#popupmessage").draggable({opacity:0.65});
try{
_gaq.push(["_trackEvent","Video"+document.location.href.toString(),theURL,theURL]);
}
catch(e){
}
};
function hideDiv(){
var _cd=document.getElementById("popupmessage");
if(_cd){
try{
document.getElementById("Player").Stop();
}
catch(e){
}
try{
document.getElementById("Player").style.visibility="hidden";
if(navigator.appVersion.indexOf("MSIE")>0){
document.getElementById("Player").outerHTML="";
_cd.outerHTML="";
}else{
_cd.removeChild(document.getElementById("Player"));
_cd.parentNode.removeChild(_cd);
}
}
catch(e){
}
}
theTarget=null;
};
function updateCoords1(e){
var _ce=mouseCoords(e);
xpos=_ce.x;
ypos=_ce.y;
};
function updateCoords(e){
bodyScrollTop=document.documentElement.scrollTop;
var _cf=mouseCoords(e);
xpos=_cf.x;
ypos=_cf.y;
};
function mouseCoords(e){
if(!e){
var e=window.event;
}
if(e.pageX||e.pageY){
return {x:e.pageX,y:e.pageY};
}else{
if(e.clientX||e.clientY){
return {x:e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,y:e.clientY+document.body.scrollTop+document.documentElement.scrollTop};
}
}
};
function openRollover(id,_d0){
document.getElementById(_d0).innerHTML=document.getElementById(id).innerHTML;
};
function hideRolloverMessage(_d1){
document.getElementById(_d1).innerHTML="";
};
function swapImg(_d2,i){
if(i){
_d2.src="mktg713/icons/close_icon_over.gif";
}else{
_d2.src="mktg713/icons/close_icon.gif";
}
};
function imapShowDiv(e,_d3,_d4,w,h,_d5){
var evt=window.event||e;
if(!evt.target){
evt.target=evt.srcElement;
}
theTarget=evt.target;
if(theTarget&&theTarget.divOpen!=1){
updateCoords1(e);
theTarget.divOpen=1;
}
showDiv(_d3,_d4,w,h,_d5);
};
function showDivById(_d6,_d7,w,h,_d8){
var _d9="";
if(document.getElementById(_d8)){
_d9=document.getElementById(_d8).innerHTML;
}
ypos-=250;
showDiv(_d6,_d7,w,h,_d9);
try{
document.getElementById("popupmessage").ondblclick=function(){
hideDiv();
};
}
catch(e){
}
};
function clearChecks(){
var i=0;
var _da=document.forms[0].elements;
while(true){
try{
_da[i++].checked=false;
}
catch(e){
break;
}
}
};
function checkAnswer(obj){
eval("document.getElementById(\"a"+obj.name+"\")").style.display="block";
eval("document.getElementById(\"a"+obj.name+"\")").innerHTML=eval("document.getElementById(\"s"+obj.id+"\")").innerHTML;
try{
var _db=inTab(obj.id);
if($(_db).up(".scroller")){
parentDiv=$(_db).up(".scroller");
var _dc=parentDiv.getHeight();
var _dd=_dc+$("#a"+obj.name).getHeight();
}
}
catch(e){
}
};
function checkAnswerNew(obj,_de){
if(typeof (_de)=="undefined"){
_de=0;
}
try{
if(_de){
var _df=obj.id.substr(0,(obj.id.length-1));
for(var i=1;i<9;i++){
var _e0="s"+_df+String(i);
$("#"+_e0).hide();
}
}
}
catch(e){
}
$("#s"+obj.id).show();
$("#s"+obj.id).addClass("item");
if(document.getElementById("s"+obj.id).childNodes[0].nodeName.toUpperCase()=="A"){
xpos=$(obj).offset().left;
ypos=$(obj).offset().top;
var _e1=jQuery(document.getElementById("s"+obj.id).childNodes[0]);
if(_e1.attr("onclick")){
var _e2=_e1.attr("onclick");
if(typeof (_e2)=="string"){
var _e3=_e2.split(";");
for(i=0,m=_e3.length;i<m;i++){
if(_e3[i].substr(0,7)=="showDiv"||_e3[i].substr(0,9)=="playSound"){
eval(_e3[i]);
break;
}
}
}else{
if(typeof (_e2)=="function"){
_e2();
}
}
}
}
try{
var _e4=inTab(obj.id);
if(_e4){
var _e5=$(_e4).height();
var _e6=_e5+$("#s"+obj.id).height();
}
}
catch(e){
}
try{
_gaq.push(["_trackEvent","Question",document.location.href.toString()+" #"+jQuery("#"+obj.id).closest(".quizBody").prev().text()+" #"+jQuery("#"+obj.id).next().text(),jQuery("#"+obj.id).next().text()]);
}
catch(e){
}
if($("#s"+obj.id).hasClass("ygt")){
$("#s"+obj.id).addClass("col");
return 1;
}else{
$("#s"+obj.id).addClass("ool");
return 0;
}
};
function srvTime(){
try{
xmlHttp=new XMLHttpRequest();
}
catch(err1){
try{
xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
}
catch(err2){
try{
xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
}
catch(eerr3){
alert("AJAX not supported");
}
}
}
xmlHttp.open("HEAD",window.location.href.toString(),false);
xmlHttp.setRequestHeader("Content-Type","text/html");
xmlHttp.send("");
return xmlHttp.getResponseHeader("Date");
};
function checkAnswerDeadline(_e7){
var _e8="";
var yy,mm,dd,_e9;
var _ea,_eb,_ec,_ed,_ee,_ef;
var _f0=false;
var _f1="",hr="",min="";
if(_e7.indexOf(":")>-1){
_e8=_e7.split(" ")[0];
_f1=_e7.split(" ")[1];
if(_f1!=""){
tmpArTime=_f1.split(":");
hr=tmpArTime[0];
if(tmpArTime.length>1){
min=tmpArTime[1];
}
}
}else{
_e8=_e7;
}
if(_e8==""){
return;
}
_e9=_e8.split("/");
if(_e9.length<3){
return;
}
dd=parseInt(_e9[0],10);
mm=parseInt(_e9[1],10);
yy=parseInt(_e9[2],10);
var st=srvTime();
var _ea=new Date(st);
_ea.setHours(_ea.getHours()+13);
_eb=_ea.getFullYear();
_ec=_ea.getMonth()+1;
_ed=_ea.getUTCDate();
_ee=_ea.getUTCHours();
_ef=_ea.getUTCMinutes();
if(_eb>yy){
_f0=true;
}else{
if(_ec>mm&&_eb==yy){
_f0=true;
}else{
if(_ed>dd&&_ec==mm&&_eb==yy){
_f0=true;
}else{
if(_ed==dd&&_ec==mm&&_eb==yy&&hr!=""&&_ee>hr){
_f0=true;
}else{
if(_ed==dd&&_ec==mm&&_eb==yy&&hr!=""&&_ee==hr&&min!=""&&_ef>min){
_f0=true;
}
}
}
}
}
if(_f0){
return false;
}else{
return true;
}
};
function quizLogServer(_f2,_f3,_f4){
var _f5="https://www.coursebuilder.cad.auckland.ac.nz/showcomments/quizlog.php";
if(document.location.href.indexOf("test")!=-1){
_f5="https://test-coursebuilder.cad.auckland.ac.nz/showcomments/quizlog.php";
}
jQuery.ajax({url:_f5,data:{_targetDir:_f2,quizId:_f3,ansStr:_f4,timestmp:new Date().getTime()}});
};
var elmIframeDiv;
function hidePopUpDiv(){
var _f6=document.getElementById("popupDivMessage");
if(_f6){
_f6.parentNode.removeChild(_f6);
}
if(isMSIE){
try{
elmIframeDiv.style.display="none";
}
catch(e){
}
}
};
function showPopUpDiv(_f7,_f8){
var w=200;
var _f9="";
var _fa=0;
var _fb=0;
var _fc=0;
var _fd=0;
if(_f8.width){
w=_f8.width;
}
if(_f8.hint){
_f9=_f8.hint;
}
if(_f8.lower){
_fa=_f8.lower;
}
if(_f8.left){
_fb=_f8.left;
}
if(_f8.right){
_fc=_f8.right;
}
if(_f8.level){
_fd=_f8.level;
}
updateCoordsPopUpDiv(_f7,w);
hidePopUpDiv();
if(_f9==""){
return;
}
var _fe=document.createElement("div");
_fe.id="popupDivMessage";
_fe.className="popup";
_fe.zIndex=1000;
_fe.innerHTML=_f9;
if(isMSIE){
xpos=xpos-w/2;
}
_fe.style.cssText="left:"+(xpos)+"px; width: "+w+"px;";
document.body.appendChild(_fe);
if(_fa){
_fe.style.top=ypos+yoffset+10+"px";
}else{
_fe.style.top=ypos+yoffset-_fe.offsetHeight-20+"px";
}
if(_fd){
_fe.style.top=ypos+yoffset-_fe.offsetHeight+20+"px";
}
if(ypos<(parseInt(_fe.top)+_fe.offsetHeight)){
}
if(_fb){
_fe.style.left=(_fe.style.left.slice(0,-2))/1-w+"px";
}
if(_fc){
if(isMSIE){
_fe.style.left=(_fe.style.right.slice(0,-2))/1+1.5*w+10+"px";
}else{
_fe.style.left=(_fe.style.right.slice(0,-2))/1+w+10+"px";
}
}
if(isMSIE){
elmIframeDiv=document.createElement("iframe");
elmIframeDiv.style.left=_fe.style.left;
elmIframeDiv.style.top=_fe.style.top;
elmIframeDiv.style.width=_fe.style.width;
}
};
function updateCoordsPopUpDiv1(e,_ff){
isMSIE=0;
var _100=navigator.appName;
if(_100=="Microsoft Internet Explorer"){
isMSIE=1;
}
xpos=e.pageX;
ypos=e.pageY;
};
function updateCoordsPopUpDiv(e,_101){
var st=Math.max(document.body.scrollTop,document.documentElement.scrollTop);
var _102=Math.max(document.body.clientWidth,document.documentElement.clientWidth)-20;
isMSIE=0;
if(objBrowse=="Microsoft Internet Explorer"){
isMSIE=1;
xpos=e.clientX;
ypos=e.clientY+st-10;
targ=e.srcElement.parentElement;
if(e.srcElement.offsetHeight>20){
yoffset=e.srcElement.offsetHeight-20;
}else{
yoffset=e.srcElement.offsetHeight;
}
}else{
eXpos=e.pageX;
var _103=$(e.currentTarget).offset();
xpos=Math.min(_103.left,eXpos);
ypos=_103.top;
if(e.currentTarget.offsetHeight>20){
yoffset=e.currentTarget.offsetHeight-20;
}else{
yoffset=e.currentTarget.offsetHeight;
}
}
};
function getMaxWidth(_104){
var node=_104.firstChild;
var _105=0;
while(node){
var _106=node.nextSibling;
try{
tmpWidth=node.getAttribute("width")?node.getAttribute("width"):parseInt(node.clientWidth);
}
catch(e){
}
if(parseInt(tmpWidth)>_105){
_105=tmpWidth;
}
node=_106;
}
return _105;
};
function showGlossaryDiv(evt,_107){
var w=300;
var html="";
var _108=0;
var left=0;
var _109=0;
var _10a=0;
html=$("#"+_107)?$("#"+_107).html():"";
updateCoordsPopUpDiv(evt);
hidePopUpDiv();
if(html==""){
return;
}
var _10b=document.createElement("div");
_10b.id="popupDivMessage";
_10b.className="popup";
_10b.innerHTML=html;
if(isMSIE){
xpos=xpos-w/2;
}
_10b.style.cssText="left:"+(xpos)+"px; width: "+w+"px;z-index:111111111;";
document.body.appendChild(_10b);
if(_108){
_10b.style.top=ypos+yoffset+10+"px";
}else{
_10b.style.top=ypos+yoffset-_10b.offsetHeight-20+"px";
}
if(_10a){
_10b.style.top=ypos+yoffset-_10b.offsetHeight+20+"px";
}
if(ypos<(parseInt(_10b.top)+_10b.offsetHeight)){
}
if(left){
_10b.style.left=(_10b.style.left.slice(0,-2))/1-w+"px";
}
if(_109){
if(isMSIE){
_10b.style.left=(_10b.style.right.slice(0,-2))/1+1.5*w+10+"px";
}else{
_10b.style.left=(_10b.style.right.slice(0,-2))/1+w+10+"px";
}
}
if(isMSIE){
elmIframeDiv=document.createElement("iframe");
elmIframeDiv.style.left=_10b.style.left;
elmIframeDiv.style.top=_10b.style.top;
elmIframeDiv.style.width=_10b.style.width;
}
};
function showToolTip(e,text){
if(document.all){
e=event;
}
var obj=document.getElementById("bubble_tooltip");
var obj2=document.getElementById("bubble_tooltip_content");
obj2.innerHTML=text;
obj.style.display="block";
var st=Math.max(document.body.scrollTop,document.documentElement.scrollTop);
var _10c=e.clientX-100;
if(_10c<0){
_10c=0;
}
obj.style.left=_10c+"px";
obj.style.top=e.clientY-obj.offsetHeight-1+st+"px";
return false;
};
function hideToolTip(){
document.getElementById("bubble_tooltip").style.display="none";
};
Array.prototype.randomize=function(ru){
var a=[].concat(this);
var l=this.length;
var al=n=0;
for(var i=0;i<l;i++){
al=a.length;
n=Math.floor((Math.random()*al));
this[i]=a[n];
if(n==al-1){
a.pop();
}else{
a[n]=a[al-1];
a.pop();
}
}
};
var shadowTopRight="images/shadowAlpha1.png";
var jsHost="";
if(navigator.userAgent.indexOf("MSIE")!=-1){
var jsHost=(("https:"==document.location.protocol)?"https:/":"");
shadowTopRight=jsHost+shadowTopRight;
}
function imgDecorate(){
var _10d=document.getElementsByTagName("img");
var _10e=false;
if($(".accordion_content")||$(".scrollerContainer")){
_10e=true;
}
for(var i=0;i<_10d.length;i++){
var img=_10d[i];
var _10f=img.src.toUpperCase();
var _110="";
var _111=0;
var _112=0;
var _113=0;
var _114=0;
var _115="",_116="";
var _117="";
var _118=false;
var _119="position:relative;";
var _11a="";
var _11b="";
var _11c="0";
var _11d=0;
var _11e="";
var _11f="6px";
if(img.title.indexOf("shadow")>-1){
var _120=(img.id)?"id='"+img.id+"' ":"";
var _121=(img.title)?"class='"+img.title+" item' ":"";
img.style.width="";
img.style.height="";
var _122=img.style.cssText+"zoom:1;min-height:1px;";
_112=parseInt(img.width);
_113=parseInt(img.height);
if(img.border){
_11c=img.border;
}
if(_112==0||_113==0){
_115=img.title.replace("shadow","");
if(_115.indexOf("x")>-1){
_116=_115.split("x");
_112=_116[0]/1;
_113=parseInt(_116[1]);
}
}
if(img.align=="left"){
_117="left";
_11b="margin: 6px 6px 0 0;";
}else{
if(img.align=="right"){
_117="right";
_11b="margin: 6px 0 0 6px;";
}else{
if(img.align=="middle"){
_117="center";
_11b="margin:6px auto;";
}
}
}
try{
if(img.parentNode.href){
_122="cursor:hand;"+_122;
}
}
catch(e){
}
var _123=img.getAttribute("alt");
if(_123==""){
_11e="overflow:hidden;";
_11f="0";
_11d=_113;
}else{
_11d=_113+6;
}
newDiv=document.createElement("div");
var _124="margin-top:5px;";
var _110="";
if(img.align=="left"){
_124+="";
}else{
if(img.align=="right"){
_124+="margin-left:10px;";
}
}
if(_121.indexOf("captionTop")>-1){
var _125=["<div><p>","<span id=\"captionTop\">",_123,"</span>","<img class=\"noPngFix\" src=\"",img.src,"\" height=\"",_113,"px\" width=\"",_112,"px\">","</p>","</div>"].join("");
}else{
if(_121.indexOf("pinImg")>-1){
_110="<span class=\"pin\"></span>";
}else{
if(_121.indexOf("tapeImg")>-1){
_110="<span class=\"tape\"></span>";
}else{
if(_121.indexOf("paper_clipImg")>-1){
_110="<span class=\"paper_clip\"></span>";
}else{
if(_121.indexOf("ovalFramed")>-1&&_112>0&&_113>0){
if(jQuery.browser.msie){
_110="<img class=\"round_corner noPngFix\" src=\"images/circle.png\" style=\"width:"+(_112+6)+"px;height:"+(_113+6)+"px;\"></img>";
}else{
_110="<img class=\"round_corner noPngFix\" src=\"images/circle.png\" width="+(_112)+" height="+(_113)+"\" style=\"top:4px;left:4px;width:"+(_112+4)+"px;height:"+(_113+4)+"px;\"></img>";
}
}else{
if(_121.indexOf("cutCorner")>-1&&_112>0&&_113>0){
_110="<img class=\"round_corner noPngFix\" src=\"images/cut-corner.png\" style=\"top: 1px;left: 1px;width:"+(_112+8)+"px;height:"+(_113+8)+"px;\" />";
}else{
if(_121.indexOf("stampPattern")>-1&&_112>0&&_113>0){
_110="<img class=\"round_corner noPngFix\" src=\"images/stamp-pattern.png\" width=\""+(_112+4)+"\" height="+(_113+4)+" style=\"top:4px;left:4px;width:"+(_112+4)+"px;height:"+(_113+4)+"px;\" />";
}else{
if(_121.indexOf("roundCorner")>-1&&_112>0&&_113>0){
_110="<img src=\"images/album_mask.png\" style=\"position:absolute;top:2px;left:4px;width:"+(_112+5)+"px;height:"+(_113+5)+"px;\" />";
}
}
}
}
}
}
}
if(_117!="center"){
_11a=["<div align=\"",_117,"\" style=\"",_119,";",_11b,"float:",_117,"\">"].join("");
}else{
_11a=["<div align=\"center\" style=\"",_119,";",_11b,"; clear:both;\">"].join("");
}
if(_118){
}
var _125=[_11a,"<div style=\"position:relative;margin:auto 0;",_124," width:",(_112+19),"px\">","<img src=\"images/white.gif\" width=\"",(_112+11),"\" height=\"6\" style=\"margin-right:6px; border-bottom:none;border-top:1px solid #999; border-left:1px solid #999; border-right:1px solid #999; border-bottom:none\" /><br />\n","<img src=\"images/white.gif\" width=\"6\" height=\"",_11d,"\" align=\"top\" style=\"border-top:none; border-right:none; border-bottom:none;border-left:1px solid #999\" />",_110,"<img class=\"noPngFix\" src=\"",img.src,"\" width=\"",(_112),"\" height=\"",(_113),"\" border=\"0\" style=\"padding:0 12px ",_11f," 0; background:url(",shadowTopRight,") no-repeat top right\" /><br />\n","<div class=\"imgCaption\" style=\"width:",(_112),"px;",_11e,"\"><img src=\"images/white.gif\" height=\"1\" width=\"1\" style=\"display:none\" />",_123,"</div>\n","<div class=\"captionbottom\" style=\"width:",(_112+13),"px\"><img src=\"images/white.gif\" height=\"1\" width=\"1\" style=\"display:none\" /></div>","</div>","</div>"].join("");
}
newDiv.innerHTML=_125;
if(img.parentNode){
img.parentNode.replaceChild(newDiv,img);
}else{
img.outerHTML=_125;
}
}else{
if(img.align=="center"){
var _120=(img.id)?"id='"+img.id+"' ":"";
var _121=(img.title)?"class='"+img.title+" item' ":"";
var _122=img.style.cssText;
var _122="";
try{
if(img.parentNode.href){
_122="cursor:hand;"+_122;
}
}
catch(e){
}
var _123=img.getAttribute("alt");
if(img.getAttribute("width")){
_112=img.getAttribute("width");
}else{
var _126=img.title.split(" ");
for(var i=0,m=_126.length;i<m;i++){
if(_126[i].indexOf("shadow")>-1){
_115=_126[i].replace("shadow","");
if(_115.indexOf("x")>-1){
_116=_115.split("x");
_112=_116[0];
_114=parseInt(_116[1]);
}
}
}
}
if(img.getAttribute("height")){
_113=img.getAttribute("height");
}else{
try{
_113=_114;
}
catch(e){
}
}
newDiv=document.createElement("center");
newDiv.style.cssText=_122+"text-align:center;";
var _125=["<img class=\"shadowImg\" src=\"",img.src,"\" ",_121,_120," height=\"",_113,"px\" width=\"",_112,"px\">"].join("");
newDiv.innerHTML=_125;
img.parentNode.replaceChild(newDiv,img);
}
}
}
};
function noPositionStyle(_127){
var _128=false;
var _129=_127.parentNode;
while(_129){
try{
if(_129.hasClassName("accordion_content")||_129.hasClassName("scrollerContainer")){
_128=true;
break;
}
}
catch(e){
}
_129=_129.parentNode;
}
return _128;
};
function fixTabHeight(){
try{
if($("#gliderNavigation")){
}
}
catch(e){
}
};
function onLoadImgDecoration(img){
var _12a=false;
var _12b=img.src.toUpperCase();
var _12c="";
var _12d=0;
var _12e=0;
var _12f=0;
var _130=0;
var _131="",_132="";
var _133="";
var _134=false;
var _135="position:relative;";
var _136="";
var _137="";
var _138="0";
var _139=0;
var _13a="";
var _13b="6px";
var _13c=0.3,_13d=0.5,_13e;
var re1=/\\'/g;
var re0=/mce_t/g;
if(img.title.indexOf("shadow")>-1){
var _13f=(img.id)?"id='"+img.id+"' ":"";
var _140=(img.title)?"class='"+img.title+" item' ":"";
img.style.width="";
img.style.height="";
var _141=img.style.cssText+"zoom:1;min-height:1px;";
_12e=parseInt(img.width);
_12f=parseInt(img.height);
if(img.border){
_138=img.border;
}
if(_12e==0||_12f==0){
_131=img.title.replace("shadow","");
if(_131.indexOf("x")>-1){
_132=_131.split("x");
_12e=_132[0]/1;
_12f=parseInt(_132[1]);
}
}
if(img.align=="left"){
_133="left";
_137="margin: 6px 6px 0 0;";
}else{
if(img.align=="right"){
_133="right";
_137="margin: 6px 0 0 6px;";
}else{
if(img.align=="middle"){
_133="center";
_137="margin:6px auto;";
}
}
}
try{
if(img.parentNode.href){
_141="cursor:hand;"+_141;
}
}
catch(e){
}
var _142=img.getAttribute("alt").replace(re0,"");
_142=_142.replace(re1,"\"");
if(_142==""){
_13a="overflow:hidden;";
_13b="0";
_139=_12f;
}else{
_139=_12f+6;
}
newDiv=document.createElement("div");
var _143="margin-top:5px;";
var _12c="";
if(img.align=="left"){
_143+="margin-right:5px";
}else{
if(img.align=="right"){
_143+="margin-left:10px";
}
}
if(_140.indexOf("captionTop")>-1){
var _144=["<div><p>","<span id=\"captionTop\">",_142,"</span>","<img class=\"noPngFix\" src=\"",img.src,"\" height=\"",_12f,"px\" width=\"",_12e,"px\">","</p>","</div>"].join("");
}else{
if(_140.indexOf("pinImg")>-1){
_12c="<span class=\"pin\"></span>";
}else{
if(_140.indexOf("tapeImg")>-1){
_12c="<span class=\"tape\"></span>";
}else{
if(_140.indexOf("paper_clipImg")>-1){
_12c="<span class=\"paper_clip\"></span>";
}else{
if(_140.indexOf("ovalFramed")>-1&&_12e>0&&_12f>0){
if(jQuery.browser.msie){
_12c="<img class=\"round_corner noPngFix\" src=\"images/circle.png\" style=\"width:"+(_12e+4)+"px;height:"+(_12f+4)+"px;\"></img>";
}else{
_12c="<img class=\"round_corner noPngFix\" src=\"images/circle.png\" width="+(_12e)+" height="+(_12f)+"\" style=\"top:4px;left:4px;width:"+(_12e+4)+"px;height:"+(_12f+4)+"px;\"></img>";
}
}else{
if(_140.indexOf("cutCorner")>-1&&_12e>0&&_12f>0){
_12c="<img class=\"round_corner noPngFix\" src=\"images/cut-corner.png\" style=\"top: 1px;left: 1px;width:"+(_12e+8)+"px;height:"+(_12f+8)+"px;\" />";
}else{
if(_140.indexOf("stampPattern")>-1&&_12e>0&&_12f>0){
_12c="<img class=\"round_corner noPngFix\" src=\"images/stamp-pattern.png\" width=\""+(_12e+4)+"\" height="+(_12f+4)+" style=\"top:4px;left:4px;width:"+(_12e+4)+"px;height:"+(_12f+4)+"px;\" />";
}else{
if(_140.indexOf("roundCorner")>-1&&_12e>0&&_12f>0){
_12c="<img src=\"images/album_mask.png\" style=\"position:absolute;top:2px;left:4px;width:"+(_12e+5)+"px;height:"+(_12f+5)+"px;\" />";
}
}
}
}
}
}
}
if(_133!="center"){
_136=["<div align=\"",_133,"\" style=\"",_135,";",_137,"float:",_133,"\">"].join("");
}else{
_136=["<div align=\"center\" style=\"",_135,";",_137,"; clear:both;\">"].join("");
}
var _144=[_136,"<div style=\"position:relative;margin:auto 0; width:",(_12e+19),"px\">","<img src=\"images/white.gif\" width=\"",(_12e+11),"\" height=\"6\" style=\"margin-right:6px; border-bottom:none;border-top:1px solid #999; border-left:1px solid #999; border-right:1px solid #999; border-bottom:none\" /><br />\n","<img src=\"images/white.gif\" width=\"6\" height=\"",_139,"\" align=\"top\" style=\"border-top:none; border-right:none; border-bottom:none;border-left:1px solid #999\" />",_12c,"<img class=\"noPngFix\" src=\"",img.src,"\" width=\"",(_12e),"\" height=\"",(_12f),"\" border=\"0\" style=\"padding:0 12px ",_13b," 0; background:url(",shadowTopRight,") no-repeat top right\" /><br />\n","<div class=\"imgCaption\" style=\"width:",(_12e),"px;",_13a,"\"><img src=\"images/white.gif\" height=\"1\" width=\"1\" style=\"display:none\" />",_142,"</div>\n","<div class=\"captionbottom\" style=\"width:",(_12e+13),"px\"><img src=\"images/white.gif\" height=\"1\" width=\"1\" style=\"display:none\" /></div>","</div>","</div>"].join("");
}
newDiv.innerHTML=_144;
if(img.parentNode){
img.parentNode.replaceChild(newDiv,img);
}else{
img.outerHTML=_144;
}
}else{
if(img.align=="center"){
var _13f=(img.id)?"id='"+img.id+"' ":"";
var _140=(img.title)?"class='"+img.title+" item' ":"";
var _141=img.style.cssText;
var _141="";
try{
if(img.parentNode.href){
_141="cursor:hand;"+_141;
}
}
catch(e){
}
var _142=img.getAttribute("alt");
if(img.getAttribute("width")){
_12e=img.getAttribute("width");
}else{
var _145=img.title.split(" ");
for(var i=0,m=_145.length;i<m;i++){
if(_145[i].indexOf("shadow")>-1){
_131=_145[i].replace("shadow","");
if(_131.indexOf("x")>-1){
_132=_131.split("x");
_12e=_132[0];
_130=parseInt(_132[1]);
}
}
}
}
if(img.getAttribute("height")){
_12f=img.getAttribute("height");
}else{
try{
_12f=_130;
}
catch(e){
}
}
newDiv=document.createElement("center");
newDiv.style.cssText=_141+"text-align:center;";
var _144=["<img class=\"shadowImg\" src=\"",img.src,"\" ",_140,_13f," height=\"",_12f,"px\" width=\"",_12e,"px\">"].join("");
newDiv.innerHTML=_144;
img.parentNode.replaceChild(newDiv,img);
}
}
};
function clickOnce(){
if(clicks==1){
return true;
}else{
return false;
}
};
function printWindow(){
bV=parseInt(navigator.appVersion);
if(bV>=4){
window.print();
}
};
function playSound1(_146){
document.getElementById("dummyspan").innerHTML="<embed src='"+_146+"' hidden=true loop=false type='video/quicktime' PLUGINSPAGE='http://www.apple.com/quicktime/download/'>";
};
function playSound(_147){
var ext=getBaseExt(_147);
var _148="<embed src=\"images/mediaplayer.swf\" width=\"1\" height=\"1\" allowscriptaccess=\"sameDomain\" allowfullscreen=\"false\" flashvars=\"autostart=true&width=1&height=1&file="+_147+"\"/>";
if(ext=="wav"){
document.getElementById("dummyspan").innerHTML="<embed src='"+_147+"' hidden=true loop=false type='video/quicktime' PLUGINSPAGE='http://www.apple.com/quicktime/download/'>";
}else{
document.getElementById("dummyspan").innerHTML=_148;
}
};
function confirmDelete(loc,_149,_14a){
if(window.confirm("Are you sure you want to delete this ["+_149+"] page ?")){
if(_14a==undefined||_14a!="1"){
document.getElementById("hiddenFrame").src=loc;
}else{
paras=loc.split("?");
if(paras.length>1){
updateContent(paras[0],paras[1]);
}else{
document.getElementById("hiddenFrame").src=loc;
}
}
}
};
function mySetStyle(_14b,_14c,val){
if(!(_14b.substring(0,1)=="."||_14b.substring(0,1)=="#")){
_14b="."+_14b;
}
jQuery(_14b).css(_14c,val);
};
function setCookie(_14d,_14e){
var _14f=new Date();
_14f.setTime(_14f.getTime()+(1000*3600*24));
document.cookie=_14d+"="+_14e+"; expires="+_14f.toGMTString()+"; path=/";
};
function setCookieE(_150,_151){
document.cookie=_150+"="+_151+"; path=/";
};
function readCookie(_152){
var comp=_152+"=";
var _153=document.cookie.split(";");
for(var i=0;i<_153.length;i++){
var _154=_153[i];
while(_154.charAt(0)==" "){
_154=_154.substring(1,_154.length);
}
if(_154.indexOf(comp)==0){
return _154.substring(comp.length,_154.length);
}
}
return null;
};
function getexpirydate(_155){
var _156;
Today=new Date();
nomilli=Date.parse(Today);
Today.setTime(nomilli+_155*24*60*60*1000);
_156=Today.toUTCString();
return _156;
};
function logout(u_id){
cookiestring="u_id="+escape(u_id)+";EXPIRES="+getexpirydate(-1);
document.cookie=cookiestring;
};
function handleEnter(_157,_158){
var _159=_158.keyCode?_158.keyCode:_158.which?_158.which:_158.charCode;
if(_159==13){
var i;
for(i=0;i<_157.form.elements.length;i++){
if(_157==_157.form.elements[i]){
break;
}
}
i=(i+1)%_157.form.elements.length;
_157.form.elements[i].focus();
return false;
}else{
return true;
}
};
function showImgDiv(bool,txt,_15a){
if(_15a){
}else{
_15a=250;
}
try{
hidePopupMessage();
}
catch(e){
}
if((xpos+_15a)>screen.width){
xpos=xpos-_15a;
}
var _15b=document.createElement("div");
_15b.id="popupmessage";
_15b.style.cssText="position: absolute; left: "+xpos+"px; top: "+(ypos+5)+"px; width:"+_15a+"px;"+"color: black; "+"background-color: #FCFBEA; "+"color:#000000; font-family:verdana,arial,tahoma; font-size:8pt; font-weight:normal; "+"border: solid #000000 1px; text-align:left;"+"padding: 4px;";
var html=txt;
document.body.appendChild(_15b);
_15b.innerHTML=html;
};
function hidePopupMessage(){
var _15c=document.getElementById("popupmessage");
if(_15c){
_15c.parentNode.removeChild(_15c);
}
};
function createTarget(url,_15d,_15e){
if(typeof url=="undefined"){
url="";
}
if(typeof _15d=="undefined"){
_15d="";
}
if(typeof _15e=="undefined"){
_15e="width=800,height=600,scrollbars=yes";
}
window.open(url,_15d,_15e);
return true;
};
function verifyForm(_15f){
for(var i=0,m=20;i<m;i++){
if(typeof (_15f.elelments[i].required)!="undefined"){
}
if(_15f.elelments[i].value==""){
targetElements[i].focus();
return false;
}
}
return true;
};
function displayRemoveFrameLink(){
if(self!=top){
document.getElementById("removeFrameLink").style.display="block";
}
};
function getBaseExt(_160){
var _161="";
var _162=_160.replace(/\\/g,"/").replace("..","").replace(/ /g,"_").split("/");
if(_162.length>0){
_161=_162[_162.length-1];
baseName=_161;
}
retStrA=_161.split(".");
_161=retStrA[retStrA.length-1];
_161=_161.toLowerCase();
return _161;
};
function __flash__removeCallback(_163,name){
if(_163){
_163[name]=null;
}
};
function logoutE(){
var _164=navigator.userAgent;
if(_164.indexOf("MSIE")!=-1){
_164="Internet Explorer";
}else{
if(_164.indexOf("Opera")!=-1){
_164="Opera";
}else{
if(_164.indexOf("Chrome")!=-1){
_164="Chrome";
}else{
if(_164.indexOf("Safari")!=-1){
_164="Safari";
}else{
if(_164.indexOf("Firefox")!=-1){
_164="Firefox";
}else{
_164=navigator.appName;
}
}
}
}
}
alert("This website uses Simplified Sign On. For security reasons, traditional logout methods do not apply. \nYou MUST close your "+_164+" browser to logout completely!");
return false;
};
function pageStartUpCheck(){
var _165=new Array();
try{
var _166;
var _167=unescape(location.search.substring(1,location.search.length));
var _168=_167.split("hidemenu=");
if(_168.length>1){
blind=(parseInt(_168[1].substring(0))+1)%2;
toggleFullScreen();
}else{
if(document.cookie.indexOf("blind=1")>=0){
blind=1;
try{
$("#header").css("display","none");
}
catch(e){
}
try{
$("#navcontainer").css("display","none");
}
catch(e){
}
try{
$("#main").css("marginLeft","0px");
}
catch(e){
}
document.getElementById("toggleMenu").innerHTML="Show Navigation";
}
}
}
catch(e){
}
};
function closeMessage(_169,msg,stay){
if(_169.charAt[0]!="#"){
_169="#"+_169;
}
if(typeof (stay)==undefined){
stay=6;
}
if(!msg){
var msg="Done!!";
}
$(_169).innerHTML=msg;
if(stay!=0){
jQuery(_169).fadeOut("slow");
}
};
function updateDOM(_16a){
if(typeof _16a=="string"){
_16a=document.getElementById(_16a);
}
if(_16a.type=="select-one"){
for(var i=0;i<_16a.options.length;i++){
if(i==_16a.selectedIndex){
_16a.options[_16a.selectedIndex].setAttribute("selected","selected");
}
}
}else{
if(_16a.type=="select-multiple"){
for(var i=0;i<_16a.options.length;i++){
if(_16a.options[i].selected){
_16a.options[i].setAttribute("selected","selected");
}else{
_16a.options[i].removeAttribute("selected");
}
}
}else{
if(_16a.type=="text"){
_16a.setAttribute("value",_16a.value);
}else{
if(_16a.type=="textarea"){
_16a.setAttribute("value",_16a.value);
}else{
if(_16a.type=="checkbox"){
if(_16a.checked){
_16a.setAttribute("checked","checked");
}else{
_16a.removeAttribute("checked");
}
}else{
if(_16a.type=="radio"){
var _16b=document.getElementsByName(_16a.name);
for(var i=0;i<_16b.length;i++){
if(_16b[i].checked){
_16b[i].setAttribute("checked","checked");
}else{
_16b[i].removeAttribute("checked");
}
}
}
}
}
}
}
}
};
function selectText(_16c){
var _16d=document.getElementById(_16c).innerHTML;
if(_16d=="Add your note here.<br>Only visible on this computer."){
document.getElementById(_16c).innerHTML="";
return;
}
if(document.selection){
var div=document.body.createTextRange();
div.moveToElementText(document.getElementById(_16c));
div.select();
}else{
var div=document.createRange();
div.setStartBefore(document.getElementById(_16c));
div.setEndAfter(document.getElementById(_16c));
window.getSelection().addRange(div);
}
};
function mustInCECIL(){
if(self!=top){
setCookieE("inCECIL","y");
}else{
if(readCookie("inCECIL")!="y"){
jQuery("body").html("<div style='margin-top:100px;text-align:center'><strong>This course can be viewed within CECIL only!<p><a href='https://cecil.auckland.ac.nz'>Click here</a> to login to CECIL</strong></p></div>");
}
}
};

