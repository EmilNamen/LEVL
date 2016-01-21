/**
 * Created by emilnamen on 1/15/16.
 */

/* underscore.string 3.2.2 | MIT licensed | http://epeli.github.com/underscore.string/ */

!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var r;"undefined"!=typeof window?r=window:"undefined"!=typeof global?r=global:"undefined"!=typeof self&&(r=self),r.s=e()}}(function(){return function e(r,t,n){function i(o,p){if(!t[o]){if(!r[o]){var u="function"==typeof require&&require;if(!p&&u)return u(o,!0);if(a)return a(o,!0);throw new Error("Cannot find module '"+o+"'")}var c=t[o]={exports:{}};r[o][0].call(c.exports,function(e){var t=r[o][1][e];return i(t?t:e)},c,c.exports,e,r,t,n)}return t[o].exports}for(var a="function"==typeof require&&require,o=0;o<n.length;o++)i(n[o]);return i}({1:[function(e,r){var t=e("./trim"),n=e("./decapitalize");r.exports=function(e,r){return e=t(e).replace(/[-_\s]+(.)?/g,function(e,r){return r?r.toUpperCase():""}),r===!0?n(e):e}},{"./decapitalize":10,"./trim":63}],2:[function(e,r){var t=e("./helper/makeString");r.exports=function(e,r){e=t(e);var n=r?e.slice(1).toLowerCase():e.slice(1);return e.charAt(0).toUpperCase()+n}},{"./helper/makeString":21}],3:[function(e,r){var t=e("./helper/makeString");r.exports=function(e){return t(e).split("")}},{"./helper/makeString":21}],4:[function(e,r){r.exports=function(e,r){return null==e?[]:(e=String(e),r=~~r,r>0?e.match(new RegExp(".{1,"+r+"}","g")):[e])}},{}],5:[function(e,r){var t=e("./capitalize"),n=e("./camelize"),i=e("./helper/makeString");r.exports=function(e){return e=i(e),t(n(e.replace(/[\W_]/g," ")).replace(/\s/g,""))}},{"./camelize":1,"./capitalize":2,"./helper/makeString":21}],6:[function(e,r){var t=e("./trim");r.exports=function(e){return t(e).replace(/\s\s+/g," ")}},{"./trim":63}],7:[function(e,r){var t=e("./helper/makeString"),n="ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșşšŝťțţŭùúüűûñÿýçżźž",i="aaaaaaaaaccceeeeeghiiiijllnnoooooooossssstttuuuuuunyyczzz";n+=n.toUpperCase(),i+=i.toUpperCase(),i=i.split(""),n+="ß",i.push("ss"),r.exports=function(e){return t(e).replace(/.{1}/g,function(e){var r=n.indexOf(e);return-1===r?e:i[r]})}},{"./helper/makeString":21}],8:[function(e,r){var t=e("./helper/makeString");r.exports=function(e,r){return e=t(e),r=t(r),0===e.length||0===r.length?0:e.split(r).length-1}},{"./helper/makeString":21}],9:[function(e,r){var t=e("./trim");r.exports=function(e){return t(e).replace(/([A-Z])/g,"-$1").replace(/[-_\s]+/g,"-").toLowerCase()}},{"./trim":63}],10:[function(e,r){var t=e("./helper/makeString");r.exports=function(e){return e=t(e),e.charAt(0).toLowerCase()+e.slice(1)}},{"./helper/makeString":21}],11:[function(e,r){function t(e){for(var r=e.match(/^[\s\\t]*/gm),t=r[0].length,n=1;n<r.length;n++)t=Math.min(r[n].length,t);return t}var n=e("./helper/makeString");r.exports=function(e,r){e=n(e);var i,a=t(e);return 0===a?e:(i="string"==typeof r?new RegExp("^"+r,"gm"):new RegExp("^[ \\t]{"+a+"}","gm"),e.replace(i,""))}},{"./helper/makeString":21}],12:[function(e,r){var t=e("./helper/makeString"),n=e("./helper/toPositive");r.exports=function(e,r,i){return e=t(e),r=""+r,i="undefined"==typeof i?e.length-r.length:Math.min(n(i),e.length)-r.length,i>=0&&e.indexOf(r,i)===i}},{"./helper/makeString":21,"./helper/toPositive":23}],13:[function(e,r){var t=e("./helper/makeString"),n=e("./helper/escapeChars"),i="[";for(var a in n)i+=a;i+="]";var o=new RegExp(i,"g");r.exports=function(e){return t(e).replace(o,function(e){return"&"+n[e]+";"})}},{"./helper/escapeChars":18,"./helper/makeString":21}],14:[function(e,r){r.exports=function(){var e={};for(var r in this)this.hasOwnProperty(r)&&!r.match(/^(?:include|contains|reverse|join|map)$/)&&(e[r]=this[r]);return e}},{}],15:[function(e,r){"use strict";function t(e){return this instanceof t?void(this._wrapped=e):new t(e)}function n(e,r){"function"==typeof r&&(t.prototype[e]=function(){var e=[this._wrapped].concat(Array.prototype.slice.call(arguments)),n=r.apply(null,e);return"string"==typeof n?new t(n):n})}function i(e){n(e,function(r){var t=Array.prototype.slice.call(arguments,1);return String.prototype[e].apply(r,t)})}t.VERSION="3.2.2",t.isBlank=e("./isBlank"),t.stripTags=e("./stripTags"),t.capitalize=e("./capitalize"),t.decapitalize=e("./decapitalize"),t.chop=e("./chop"),t.trim=e("./trim"),t.clean=e("./clean"),t.cleanDiacritics=e("./cleanDiacritics"),t.count=e("./count"),t.chars=e("./chars"),t.swapCase=e("./swapCase"),t.escapeHTML=e("./escapeHTML"),t.unescapeHTML=e("./unescapeHTML"),t.splice=e("./splice"),t.insert=e("./insert"),t.replaceAll=e("./replaceAll"),t.include=e("./include"),t.join=e("./join"),t.lines=e("./lines"),t.dedent=e("./dedent"),t.reverse=e("./reverse"),t.startsWith=e("./startsWith"),t.endsWith=e("./endsWith"),t.pred=e("./pred"),t.succ=e("./succ"),t.titleize=e("./titleize"),t.camelize=e("./camelize"),t.underscored=e("./underscored"),t.dasherize=e("./dasherize"),t.classify=e("./classify"),t.humanize=e("./humanize"),t.ltrim=e("./ltrim"),t.rtrim=e("./rtrim"),t.truncate=e("./truncate"),t.prune=e("./prune"),t.words=e("./words"),t.pad=e("./pad"),t.lpad=e("./lpad"),t.rpad=e("./rpad"),t.lrpad=e("./lrpad"),t.sprintf=e("./sprintf"),t.vsprintf=e("./vsprintf"),t.toNumber=e("./toNumber"),t.numberFormat=e("./numberFormat"),t.strRight=e("./strRight"),t.strRightBack=e("./strRightBack"),t.strLeft=e("./strLeft"),t.strLeftBack=e("./strLeftBack"),t.toSentence=e("./toSentence"),t.toSentenceSerial=e("./toSentenceSerial"),t.slugify=e("./slugify"),t.surround=e("./surround"),t.quote=e("./quote"),t.unquote=e("./unquote"),t.repeat=e("./repeat"),t.naturalCmp=e("./naturalCmp"),t.levenshtein=e("./levenshtein"),t.toBoolean=e("./toBoolean"),t.exports=e("./exports"),t.escapeRegExp=e("./helper/escapeRegExp"),t.wrap=e("./wrap"),t.map=e("./map"),t.strip=t.trim,t.lstrip=t.ltrim,t.rstrip=t.rtrim,t.center=t.lrpad,t.rjust=t.lpad,t.ljust=t.rpad,t.contains=t.include,t.q=t.quote,t.toBool=t.toBoolean,t.camelcase=t.camelize,t.mapChars=t.map,t.prototype={value:function(){return this._wrapped}};for(var a in t)n(a,t[a]);n("tap",function(e,r){return r(e)});var o=["toUpperCase","toLowerCase","split","replace","slice","substring","substr","concat"];for(var p in o)i(o[p]);r.exports=t},{"./camelize":1,"./capitalize":2,"./chars":3,"./chop":4,"./classify":5,"./clean":6,"./cleanDiacritics":7,"./count":8,"./dasherize":9,"./decapitalize":10,"./dedent":11,"./endsWith":12,"./escapeHTML":13,"./exports":14,"./helper/escapeRegExp":19,"./humanize":24,"./include":25,"./insert":26,"./isBlank":27,"./join":28,"./levenshtein":29,"./lines":30,"./lpad":31,"./lrpad":32,"./ltrim":33,"./map":34,"./naturalCmp":35,"./numberFormat":36,"./pad":37,"./pred":38,"./prune":39,"./quote":40,"./repeat":41,"./replaceAll":42,"./reverse":43,"./rpad":44,"./rtrim":45,"./slugify":46,"./splice":47,"./sprintf":48,"./startsWith":49,"./strLeft":50,"./strLeftBack":51,"./strRight":52,"./strRightBack":53,"./stripTags":54,"./succ":55,"./surround":56,"./swapCase":57,"./titleize":58,"./toBoolean":59,"./toNumber":60,"./toSentence":61,"./toSentenceSerial":62,"./trim":63,"./truncate":64,"./underscored":65,"./unescapeHTML":66,"./unquote":67,"./vsprintf":68,"./words":69,"./wrap":70}],16:[function(e,r){var t=e("./makeString");r.exports=function(e,r){return e=t(e),0===e.length?"":e.slice(0,-1)+String.fromCharCode(e.charCodeAt(e.length-1)+r)}},{"./makeString":21}],17:[function(e,r){var t=e("./escapeRegExp");r.exports=function(e){return null==e?"\\s":e.source?e.source:"["+t(e)+"]"}},{"./escapeRegExp":19}],18:[function(e,r){var t={"¢":"cent","£":"pound","¥":"yen","€":"euro","©":"copy","®":"reg","<":"lt",">":"gt",'"':"quot","&":"amp","'":"#39"};r.exports=t},{}],19:[function(e,r){var t=e("./makeString");r.exports=function(e){return t(e).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")}},{"./makeString":21}],20:[function(e,r){var t={nbsp:" ",cent:"¢",pound:"£",yen:"¥",euro:"€",copy:"©",reg:"®",lt:"<",gt:">",quot:'"',amp:"&",apos:"'"};r.exports=t},{}],21:[function(e,r){r.exports=function(e){return null==e?"":""+e}},{}],22:[function(e,r){r.exports=function(e,r){if(1>r)return"";for(var t="";r>0;)1&r&&(t+=e),r>>=1,e+=e;return t}},{}],23:[function(e,r){r.exports=function(e){return 0>e?0:+e||0}},{}],24:[function(e,r){var t=e("./capitalize"),n=e("./underscored"),i=e("./trim");r.exports=function(e){return t(i(n(e).replace(/_id$/,"").replace(/_/g," ")))}},{"./capitalize":2,"./trim":63,"./underscored":65}],25:[function(e,r){var t=e("./helper/makeString");r.exports=function(e,r){return""===r?!0:-1!==t(e).indexOf(r)}},{"./helper/makeString":21}],26:[function(e,r){var t=e("./splice");r.exports=function(e,r,n){return t(e,r,0,n)}},{"./splice":47}],27:[function(e,r){var t=e("./helper/makeString");r.exports=function(e){return/^\s*$/.test(t(e))}},{"./helper/makeString":21}],28:[function(e,r){var t=e("./helper/makeString"),n=[].slice;r.exports=function(){var e=n.call(arguments),r=e.shift();return e.join(t(r))}},{"./helper/makeString":21}],29:[function(e,r){var t=e("./helper/makeString");r.exports=function(e,r){"use strict";if(e=t(e),r=t(r),e===r)return 0;if(!e||!r)return Math.max(e.length,r.length);for(var n=new Array(r.length+1),i=0;i<n.length;++i)n[i]=i;for(i=0;i<e.length;++i){for(var a=i+1,o=0;o<r.length;++o){var p=a;a=n[o]+(e.charAt(i)===r.charAt(o)?0:1);var u=p+1;a>u&&(a=u),u=n[o+1]+1,a>u&&(a=u),n[o]=p}n[o]=a}return a}},{"./helper/makeString":21}],30:[function(e,r){r.exports=function(e){return null==e?[]:String(e).split(/\r\n?|\n/)}},{}],31:[function(e,r){var t=e("./pad");r.exports=function(e,r,n){return t(e,r,n)}},{"./pad":37}],32:[function(e,r){var t=e("./pad");r.exports=function(e,r,n){return t(e,r,n,"both")}},{"./pad":37}],33:[function(e,r){var t=e("./helper/makeString"),n=e("./helper/defaultToWhiteSpace"),i=String.prototype.trimLeft;r.exports=function(e,r){return e=t(e),!r&&i?i.call(e):(r=n(r),e.replace(new RegExp("^"+r+"+"),""))}},{"./helper/defaultToWhiteSpace":17,"./helper/makeString":21}],34:[function(e,r){var t=e("./helper/makeString");r.exports=function(e,r){return e=t(e),0===e.length||"function"!=typeof r?e:e.replace(/./g,r)}},{"./helper/makeString":21}],35:[function(e,r){r.exports=function(e,r){if(e==r)return 0;if(!e)return-1;if(!r)return 1;for(var t=/(\.\d+|\d+|\D+)/g,n=String(e).match(t),i=String(r).match(t),a=Math.min(n.length,i.length),o=0;a>o;o++){var p=n[o],u=i[o];if(p!==u){var c=+p,s=+u;return c===c&&s===s?c>s?1:-1:u>p?-1:1}}return n.length!=i.length?n.length-i.length:r>e?-1:1}},{}],36:[function(e,r){r.exports=function(e,r,t,n){if(isNaN(e)||null==e)return"";e=e.toFixed(~~r),n="string"==typeof n?n:",";var i=e.split("."),a=i[0],o=i[1]?(t||".")+i[1]:"";return a.replace(/(\d)(?=(?:\d{3})+$)/g,"$1"+n)+o}},{}],37:[function(e,r){var t=e("./helper/makeString"),n=e("./helper/strRepeat");r.exports=function(e,r,i,a){e=t(e),r=~~r;var o=0;switch(i?i.length>1&&(i=i.charAt(0)):i=" ",a){case"right":return o=r-e.length,e+n(i,o);case"both":return o=r-e.length,n(i,Math.ceil(o/2))+e+n(i,Math.floor(o/2));default:return o=r-e.length,n(i,o)+e}}},{"./helper/makeString":21,"./helper/strRepeat":22}],38:[function(e,r){var t=e("./helper/adjacent");r.exports=function(e){return t(e,-1)}},{"./helper/adjacent":16}],39:[function(e,r){var t=e("./helper/makeString"),n=e("./rtrim");r.exports=function(e,r,i){if(e=t(e),r=~~r,i=null!=i?String(i):"...",e.length<=r)return e;var a=function(e){return e.toUpperCase()!==e.toLowerCase()?"A":" "},o=e.slice(0,r+1).replace(/.(?=\W*\w*$)/g,a);return o=o.slice(o.length-2).match(/\w\w/)?o.replace(/\s*\S+$/,""):n(o.slice(0,o.length-1)),(o+i).length>e.length?e:e.slice(0,o.length)+i}},{"./helper/makeString":21,"./rtrim":45}],40:[function(e,r){var t=e("./surround");r.exports=function(e,r){return t(e,r||'"')}},{"./surround":56}],41:[function(e,r){var t=e("./helper/makeString"),n=e("./helper/strRepeat");r.exports=function i(e,r,a){if(e=t(e),r=~~r,null==a)return n(e,r);for(var i=[];r>0;i[--r]=e);return i.join(a)}},{"./helper/makeString":21,"./helper/strRepeat":22}],42:[function(e,r){var t=e("./helper/makeString");r.exports=function(e,r,n,i){var a=i===!0?"gi":"g",o=new RegExp(r,a);return t(e).replace(o,n)}},{"./helper/makeString":21}],43:[function(e,r){var t=e("./chars");r.exports=function(e){return t(e).reverse().join("")}},{"./chars":3}],44:[function(e,r){var t=e("./pad");r.exports=function(e,r,n){return t(e,r,n,"right")}},{"./pad":37}],45:[function(e,r){var t=e("./helper/makeString"),n=e("./helper/defaultToWhiteSpace"),i=String.prototype.trimRight;r.exports=function(e,r){return e=t(e),!r&&i?i.call(e):(r=n(r),e.replace(new RegExp(r+"+$"),""))}},{"./helper/defaultToWhiteSpace":17,"./helper/makeString":21}],46:[function(e,r){var t=e("./trim"),n=e("./dasherize"),i=e("./cleanDiacritics");r.exports=function(e){return t(n(i(e).replace(/[^\w\s-]/g,"-").toLowerCase()),"-")}},{"./cleanDiacritics":7,"./dasherize":9,"./trim":63}],47:[function(e,r){var t=e("./chars");r.exports=function(e,r,n,i){var a=t(e);return a.splice(~~r,~~n,i),a.join("")}},{"./chars":3}],48:[function(e,r){var t=e("./helper/strRepeat"),n=Object.prototype.toString,i=function(){function e(e){return n.call(e).slice(8,-1).toLowerCase()}var r=t,a=function(){return a.cache.hasOwnProperty(arguments[0])||(a.cache[arguments[0]]=a.parse(arguments[0])),a.format.call(null,a.cache[arguments[0]],arguments)};return a.format=function(t,n){var a,o,p,u,c,s,l,f=1,h=t.length,g="",m=[];for(o=0;h>o;o++)if(g=e(t[o]),"string"===g)m.push(t[o]);else if("array"===g){if(u=t[o],u[2])for(a=n[f],p=0;p<u[2].length;p++){if(!a.hasOwnProperty(u[2][p]))throw new Error(i('[_.sprintf] property "%s" does not exist',u[2][p]));a=a[u[2][p]]}else a=u[1]?n[u[1]]:n[f++];if(/[^s]/.test(u[8])&&"number"!=e(a))throw new Error(i("[_.sprintf] expecting number but found %s",e(a)));switch(u[8]){case"b":a=a.toString(2);break;case"c":a=String.fromCharCode(a);break;case"d":a=parseInt(a,10);break;case"e":a=u[7]?a.toExponential(u[7]):a.toExponential();break;case"f":a=u[7]?parseFloat(a).toFixed(u[7]):parseFloat(a);break;case"o":a=a.toString(8);break;case"s":a=(a=String(a))&&u[7]?a.substring(0,u[7]):a;break;case"u":a=Math.abs(a);break;case"x":a=a.toString(16);break;case"X":a=a.toString(16).toUpperCase()}a=/[def]/.test(u[8])&&u[3]&&a>=0?"+"+a:a,s=u[4]?"0"==u[4]?"0":u[4].charAt(1):" ",l=u[6]-String(a).length,c=u[6]?r(s,l):"",m.push(u[5]?a+c:c+a)}return m.join("")},a.cache={},a.parse=function(e){for(var r=e,t=[],n=[],i=0;r;){if(null!==(t=/^[^\x25]+/.exec(r)))n.push(t[0]);else if(null!==(t=/^\x25{2}/.exec(r)))n.push("%");else{if(null===(t=/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(r)))throw new Error("[_.sprintf] huh?");if(t[2]){i|=1;var a=[],o=t[2],p=[];if(null===(p=/^([a-z_][a-z_\d]*)/i.exec(o)))throw new Error("[_.sprintf] huh?");for(a.push(p[1]);""!==(o=o.substring(p[0].length));)if(null!==(p=/^\.([a-z_][a-z_\d]*)/i.exec(o)))a.push(p[1]);else{if(null===(p=/^\[(\d+)\]/.exec(o)))throw new Error("[_.sprintf] huh?");a.push(p[1])}t[2]=a}else i|=2;if(3===i)throw new Error("[_.sprintf] mixing positional and named placeholders is not (yet) supported");n.push(t)}r=r.substring(t[0].length)}return n},a}();r.exports=i},{"./helper/strRepeat":22}],49:[function(e,r){var t=e("./helper/makeString"),n=e("./helper/toPositive");r.exports=function(e,r,i){return e=t(e),r=""+r,i=null==i?0:Math.min(n(i),e.length),e.lastIndexOf(r,i)===i}},{"./helper/makeString":21,"./helper/toPositive":23}],50:[function(e,r){var t=e("./helper/makeString");r.exports=function(e,r){e=t(e),r=t(r);var n=r?e.indexOf(r):-1;return~n?e.slice(0,n):e}},{"./helper/makeString":21}],51:[function(e,r){var t=e("./helper/makeString");r.exports=function(e,r){e=t(e),r=t(r);var n=e.lastIndexOf(r);return~n?e.slice(0,n):e}},{"./helper/makeString":21}],52:[function(e,r){var t=e("./helper/makeString");r.exports=function(e,r){e=t(e),r=t(r);var n=r?e.indexOf(r):-1;return~n?e.slice(n+r.length,e.length):e}},{"./helper/makeString":21}],53:[function(e,r){var t=e("./helper/makeString");r.exports=function(e,r){e=t(e),r=t(r);var n=r?e.lastIndexOf(r):-1;return~n?e.slice(n+r.length,e.length):e}},{"./helper/makeString":21}],54:[function(e,r){var t=e("./helper/makeString");r.exports=function(e){return t(e).replace(/<\/?[^>]+>/g,"")}},{"./helper/makeString":21}],55:[function(e,r){var t=e("./helper/adjacent");r.exports=function(e){return t(e,1)}},{"./helper/adjacent":16}],56:[function(e,r){r.exports=function(e,r){return[r,e,r].join("")}},{}],57:[function(e,r){var t=e("./helper/makeString");r.exports=function(e){return t(e).replace(/\S/g,function(e){return e===e.toUpperCase()?e.toLowerCase():e.toUpperCase()})}},{"./helper/makeString":21}],58:[function(e,r){var t=e("./helper/makeString");r.exports=function(e){return t(e).toLowerCase().replace(/(?:^|\s|-)\S/g,function(e){return e.toUpperCase()})}},{"./helper/makeString":21}],59:[function(e,r){function t(e,r){var t,n,i=e.toLowerCase();for(r=[].concat(r),t=0;t<r.length;t+=1)if(n=r[t]){if(n.test&&n.test(e))return!0;if(n.toLowerCase()===i)return!0}}var n=e("./trim");r.exports=function(e,r,i){return"number"==typeof e&&(e=""+e),"string"!=typeof e?!!e:(e=n(e),t(e,r||["true","1"])?!0:t(e,i||["false","0"])?!1:void 0)}},{"./trim":63}],60:[function(e,r){r.exports=function(e,r){if(null==e)return 0;var t=Math.pow(10,isFinite(r)?r:0);return Math.round(e*t)/t}},{}],61:[function(e,r){var t=e("./rtrim");r.exports=function(e,r,n,i){r=r||", ",n=n||" and ";var a=e.slice(),o=a.pop();return e.length>2&&i&&(n=t(r)+n),a.length?a.join(r)+n+o:o}},{"./rtrim":45}],62:[function(e,r){var t=e("./toSentence");r.exports=function(e,r,n){return t(e,r,n,!0)}},{"./toSentence":61}],63:[function(e,r){var t=e("./helper/makeString"),n=e("./helper/defaultToWhiteSpace"),i=String.prototype.trim;r.exports=function(e,r){return e=t(e),!r&&i?i.call(e):(r=n(r),e.replace(new RegExp("^"+r+"+|"+r+"+$","g"),""))}},{"./helper/defaultToWhiteSpace":17,"./helper/makeString":21}],64:[function(e,r){var t=e("./helper/makeString");r.exports=function(e,r,n){return e=t(e),n=n||"...",r=~~r,e.length>r?e.slice(0,r)+n:e}},{"./helper/makeString":21}],65:[function(e,r){var t=e("./trim");r.exports=function(e){return t(e).replace(/([a-z\d])([A-Z]+)/g,"$1_$2").replace(/[-\s]+/g,"_").toLowerCase()}},{"./trim":63}],66:[function(e,r){var t=e("./helper/makeString"),n=e("./helper/htmlEntities");r.exports=function(e){return t(e).replace(/\&([^;]+);/g,function(e,r){var t;return r in n?n[r]:(t=r.match(/^#x([\da-fA-F]+)$/))?String.fromCharCode(parseInt(t[1],16)):(t=r.match(/^#(\d+)$/))?String.fromCharCode(~~t[1]):e})}},{"./helper/htmlEntities":20,"./helper/makeString":21}],67:[function(e,r){r.exports=function(e,r){return r=r||'"',e[0]===r&&e[e.length-1]===r?e.slice(1,e.length-1):e}},{}],68:[function(e,r){var t=e("./sprintf");r.exports=function(e,r){return r.unshift(e),t.apply(null,r)}},{"./sprintf":48}],69:[function(e,r){var t=e("./isBlank"),n=e("./trim");r.exports=function(e,r){return t(e)?[]:n(e,r).split(r||/\s+/)}},{"./isBlank":27,"./trim":63}],70:[function(e,r){var t=e("./helper/makeString");r.exports=function(e,r){e=t(e),r=r||{};var n,i=r.width||75,a=r.seperator||"\n",o=r.cut||!1,p=r.preserveSpaces||!1,u=r.trailingSpaces||!1;if(0>=i)return e;if(o){var c=0;for(n="";c<e.length;)c%i==0&&c>0&&(n+=a),n+=e.charAt(c),c++;if(u)for(;c%i>0;)n+=" ",c++;return n}var s=e.split(" "),l=0;for(n="";s.length>0;){if(1+s[0].length+l>i&&l>0){if(p)n+=" ",l++;else if(u)for(;i>l;)n+=" ",l++;n+=a,l=0}l>0&&(n+=" ",l++),n+=s[0],l+=s[0].length,s.shift()}if(u)for(;i>l;)n+=" ",l++;return n}},{"./helper/makeString":21}]},{},[15])(15)});
