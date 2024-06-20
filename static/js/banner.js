/**
 	*<z:config type="SiteIndexTemplate" />
 	*/

(function () {
		
	var _zcms_ad_d,_zcms_ad_s,_zcms_ad_c,_zcms_ad_l,_zcms_ad_t,_zcms_ad_s,_zcms_ad_i,_zcms_ad_p;
	var _zcms_ad_st=new Date().getTime();
	var _zcms_ad_stat = function(param){
		var p = {};
		if(param){
			var arr = param.split("&");
			for(var i=0;i<arr.length;i++){
				if(arr[i]){
					var arr2 = arr[i].split("=");
					if(arr2[0]){
						p[arr2[0]] = arr2[1];
					}
				}
			}
		}
		_zcms_ad_d = p["Dest"];
		_zcms_ad_s = p["SiteID"];
		_zcms_ad_c = p["CatalogInnerCode"];
		_zcms_ad_l = p["LeafID"];
		_zcms_ad_t = p["Type"];
		_zcms_ad_i = p["ADID"];		
		_zcms_ad_p = p["ADPID"];
		
		p["sr"] = screen.width+"x"+screen.height;
		p["cd"] = screen.colorDepth;
		p["fv"] = _zcms_ad_stat.fv();
		p["ce"] = _zcms_ad_stat.ce();	
		p["je"] = _zcms_ad_stat.je();
		p["la"] = navigator.language?navigator.language:navigator.browserLanguage;
		p["la"] = p["la"]?p["la"]:navigator.systemLanguage;
		p["cs"] = document.charset;
		
		p["vq"] = _zcms_ad_stat.vq();	
		p["Referer"] = _zcms_ad_stat.eu(document.referrer);
		p["URL"] = _zcms_ad_stat.eu(location.href);
		p["Host"] = location.host;
		p["Event"] = "Show";
		var dest = _zcms_ad_d;
		p["Dest"] = false;
		dest = dest+"?"+_zcms_ad_stat.mq(p);
		
		var s = document.createElement("script");
		s.src = dest;
		(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(s);
		
		return dest;
	};

	_zcms_ad_stat.eu =  function(str){
		return encodeURI(str).replace(/=/g,"%3D").replace(/\+/g,"%2B").replace(/\?/g,"%3F").replace(/\&/g,"%26").replace(/\#/g,"%23");
	}

	_zcms_ad_stat.mq = function(map){
		var sb = [];
		for(var prop in map){
			if(map[prop]){
				sb.push(prop+"="+map[prop]);
			}
		}	
		return sb.join("&");
	}

	_zcms_ad_stat.trim = function(str){
		return str.replace(/(^\s*)|(\s*$)/g,"");
	}


	_zcms_ad_stat.je = function(){
		var je="";
		var n=navigator;
		je = n.javaEnabled()?1:0;
		return je;
	} 

	_zcms_ad_stat.fv = function(){
		var f="",n=navigator;	
		if(n.plugins && n.plugins.length){
			for(var ii=0;ii<n.plugins.length;ii++){
				if(n.plugins[ii].name.indexOf('Shockwave Flash')!=-1){
					f=n.plugins[ii].description.split('Shockwave Flash ')[1];
					break;
				}
			}
		}else if(window.ActiveXObject){
			for(var ii=10;ii>=2;ii--){
				try{
					var fl=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+ii+"');");
					if(fl){
						f=ii + '.0'; break;
					}
				}catch(e){} 
			} 
		}
		return f;
	}

	_zcms_ad_stat.ce = function(){
		var c_en = (navigator.cookieEnabled)? 1 : 0;
		return c_en;
	}

	_zcms_ad_stat.vq = function(){
	  var cs = document.cookie.split("; ");
	  var name = _zcms_ad_s+"_vq";
	  var vq = 1;
	  for(i=0; i<cs.length; i++){
		  var arr = cs[i].split("=");
		  var n = _zcms_ad_stat.trim(arr[0]);
		  var v = arr[1]?_zcms_ad_stat.trim(arr[1]):"";
		  if(n==name){
		  	vq = parseInt(v)+1;
		  	break;
		  }
		}
		var expires = new Date(new Date().getTime()+365*10*24*60*60*1000).toGMTString();
		var cv = name+"="+vq+";expires="+expires+";path=/;";
		document.cookie = cv;
		return vq;
	}
		
	function _zcms_ad_bu(param){
		var p = {};
		if(param){
			var arr = param.split("&");
			for(var i=0;i<arr.length;i++){
				if(arr[i]){
					var arr2 = arr[i].split("=");
					if(arr2[0]){
						p[arr2[0]] = arr2[1];
					}
				}
			}
		}
		if(_zcms_ad_d){ 
			p["Event"] = "Click";
			p["LeafID"] = p["ADID"];
			p["SiteID"] = _zcms_ad_s;
			p["Type"] = _zcms_ad_t;
			p["ADPID"] = _zcms_ad_p;
			p["URL"] = _zcms_ad_stat.eu(location.href);
			p["vq"] = _zcms_ad_stat.vq();	
			var dest = _zcms_ad_d+"?"+_zcms_ad_stat.mq(p);
			return dest
		}
	}

	function ZCMSAD(PositionID) {
	  this.ID        = PositionID;
	  this.PosID  = 0; 
	  this.ADID		  = 0;
	  this.ADType	  = "";
	  this.ADName	  = "";
	  this.ADContent = "";
	  this.PaddingLeft = 0;
	  this.PaddingTop  = 0;
	  this.Width = 0;
	  this.Height = 0;
	  this.IsHitCount = "N";
	  this.URL = "";
	  this.SiteID = 0;
	  this.SiteURL = '';
	  this.ShowAD  = showADContent;
	  this.AutoStatFlag = true;
	}

	function loadJs(url, onsuccess,loadDefault,advjson) {
		if(!advjson){
			return;
		}
		var head = document.getElementsByTagName('head')[0] || document.documentElement,
			script = document.createElement('script'),
			done = false;
		script.src = url;

		script.onerror = script.onload = script.onreadystatechange = function() {
			if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
				done = true;
				script.onerror = script.onload = script.onreadystatechange = null;
				head.removeChild(script);
				
				// 处理返回结果（可能的结果：未请求到数据,返回无效数据，返回有效数据）
				// 如果加载失败，在IE中readyState=="loaded",所以只能通过检测所需的数据是否已经存在来判断是否加载成功。
				advjson.contents=getWeightRandom(window['advjson'+advjson.ID]);
				
				if(!advjson.contents){// 未加载成功
 					return;
				}else if(advjson.contents.errormsg){// 返回无效数据
					if(advjson.contents.errormsg.length > 0 && console && console.log)console.log(advjson.contents.errormsg);
					return;
				}else if(advjson.contents.ID && onsuccess){// 返回无效数据
					onsuccess(advjson);				
				}					
			}
		};
		head.appendChild(script);
	}
	function ggClick(SiteID,URL,ADID,PosID,ADURL,isSelf) {
		var dest = _zcms_ad_bu("ADID="+ADID);
		loadJs(dest,function(){
			if(isSelf) location=ADURL;
		}, false, true);
	}
		
	var randomFuncName='ggClick'+(+new Date);
	window[randomFuncName]=ggClick;
	
	function showADContent() {
	  var content = this.ADContent;
	  var str = "<div id='ZCMSAP_"+this.PosID+"' style='width:"+this.Width+"px; height:"+this.Height+"px;'>";
	  var AD = eval('('+content+')');
	  var onclickStr = "";
	  if(this.AutoStatFlag){
		  onclickStr = " onclick='"+randomFuncName+"(\""+this.SiteID+"\",\""+this.URL+"\",\""+this.ADID+"\",\""+this.PosID+"\",\""+AD.images[0].imgADLinkURL+(AD.imgADLinkTarget == "Old" ? "\",true" : "\",false") +"); return "+((AD.imgADLinkTarget == "Old") ? "false" : "true") + ";'";  
	  }	  
	  if (this.ADType == "image") {
		  str += "<a href='"+AD.images[0].imgADLinkURL+"'"+onclickStr+" target='"+((AD.imgADLinkTarget == "Old") ? "_self" : "_blank") + "'>";
		  str += "<img title='"+AD.images[0].imgADAlt+"' src='"+AD.images[0].imgPath+"' width='"+this.Width+"' height='"+this.Height+"' style='border:0px;' onerror=this.src='"+this.SiteURL+"images/picture404.png';this.onerror=null;>";
 		  str += "</a>";
	  }else if(this.ADType == "flash"){
		  str += "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' width='"+this.Width+"' height='"+this.Height+"' id='FlashAP_"+this.ADID+"'>";
		  str += "<param name='movie' value='"+AD.flashes[0].swfFilePath+"' />"; 
	      str += "<param name='quality' value='high' />";
	      str += "<param name='wmode' value='transparent'/>";
	      str += "<param name='swfversion' value='8.0.35.0' />";
	      str += "<embed wmode='transparent' src='"+AD.flashes[0].swfFilePath+"' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='"+this.Width+"' height='"+this.Height+"'></embed>";
		  str += "</object>";	  
	  }
	  str += "</div>";
	  var div=document.createElement('div');
	  div.innerHTML=str;
	  var adNode=document.getElementById("apjs_"+this.PosID);
	  adNode.parentNode.insertBefore(div.firstChild,adNode.nextSibling);
	  div=null;
	}
	var kw = "";
	if("undefined" != typeof zcmsad_params_keywords) {
		kw = encodeURI(encodeURI(zcmsad_params_keywords));
	}
	function getWeightRandom(advs) {
		if(Object.prototype.toString.apply(advs) !== '[object Array]'){
			return advs;
		}
		var seed = 0;
		for (var i=0;i<advs.length;i++) {
			if(typeof advs[i].weight=='number'){
				seed += advs[i].weight;
			}
		}
		var random = Math.round(Math.random() * seed);
		var curWt = 0;
		var result = null;
		for (var i=0;i<advs.length;i++) {
			if(typeof advs[i].weight=='number'){
				curWt += advs[i].weight;
				if (curWt >= random) {
					result = advs[i];
					break;
				}
			}
		}
		return result;
	}
	function onSuccess(advjson){
		if(advjson && advjson.contents) {
			if(advjson.contents.errormsg && advjson.contents.errormsg.length > 0) {
				if(window.console && console.log)console.log(advjson.contents.errormsg);
				return;
			}
			if(advjson.contents.endTime<new Date().getTime()){
				advjson.contents = advjson['default'+advjson.ID];
				if(!advjson.contents){
					return;
				}
			}
			var cmsAD = new ZCMSAD('cmsAD_'+advjson.ID); 
			cmsAD.PosID = advjson.ID; 
			cmsAD.SiteID = advjson.siteID || 0; 
			cmsAD.Width = advjson.positionWidth || 0; 
			cmsAD.Height = advjson.positionHeight || 0; 
			cmsAD.ADID = advjson.contents.ID; 
			cmsAD.ADType = advjson.contents.adType; 
			cmsAD.ADName = advjson.contents.adName; 
			cmsAD.ADContent = advjson.contents.adContent; 
			cmsAD.SiteURL = advjson.siteURL;
			cmsAD.URL = advjson.frontAppContext+"front/atverdises/"+advjson.ID+"/hitcount";
			cmsAD.AutoStatFlag = advjson.autoStatFlag;
			cmsAD.ShowAD();
			if(cmsAD.AutoStatFlag){
				_zcms_ad_stat("SiteID="+cmsAD.SiteID+"&Type=AD&ADPID="+cmsAD.PosID+"&ADID="+cmsAD.ADID+"&Dest="+cmsAD.URL)
			}
		}
	}
	var getDataPath = function(){
		var scripts = document.getElementsByTagName('script'),
			script = document.currentScript || scripts[scripts.length - 1];
		var dataPath = script.getAttribute('data');
		return dataPath;
	}
	var xmlhttp;
	if (window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
	}else{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			if(xmlhttp.response){
				var advjson = JSON.parse(xmlhttp.response).data
				if(kw == ""){
					var contents = getWeightRandom(advjson.contents)
					advjson.contents = contents
					onSuccess(advjson);
				}else{
					var _path=advjson.frontAppContext+"front/atverdises/"+advjson.ID+"/"+advjson.strategyType+"?keywords=" + kw;
					//专题编辑页面要避免使用缓存页面
					if(/specialDesigner\.html/.test(location.href)){
						_path=_path+'&'+(+new Date());
					}
					loadJs(_path, onSuccess, true, advjson);
				}
			}
		}
	}
	xmlhttp.open("GET",getDataPath(),true);
	xmlhttp.send();
})();