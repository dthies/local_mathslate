YUI.add("moodle-local_mathslate-snippeteditor",function(e,t){M.local_mathslate=M.local_mathslate||{},M.local_mathslate.mSlots=function(){function i(){t.splice(n);var e=r.slice(0),i=[];e.forEach(function(e){i.push(e.slice(0))}),t[n]=[e,i]}function s(){r.splice(0),r[0]&&r.pop(),t[n]||alert("error");var e=t[n][0],i=t[n][1];e.forEach(function(e,t){e.splice(0),e[0]&&e.pop(),i[t].forEach(function(t){e.push(t)}),r.push(e)})}var t=[],n=0,r=[];this.slots=r,this.redo=function(){if(!t[n+1])return;n++,s()},this.undo=function(){if(n===0)return;n--;if(n===0){r[0].pop();return}s()},this.createItem=function(t){function n(t){Array.isArray(t[2])&&t[2].forEach(function(i){if(Array.isArray(i))n(i);else if(i==="[]"){var s=e.guid();r.push([["mi",{id:s,"class":"blank",tex:[""]},"[drop]"]]),t[2][t[2].indexOf(i)]=["mrow",{},r[r.length-1]]}})}var i=e.Node.create("<span></span").generateID(),s;return s=e.JSON.parse(t),s[1].id=i,n(s),s},this.getItemByID=function(t){var n;return this.slots.forEach(function(r){r.forEach(function(r){r[1].id===t&&(n=e.JSON.stringify(r))})}),n},this.isItem=function(e){var t=!1;return this.slots.forEach(function(n){if(t)return;n.forEach(function(n){n[1].id===e&&(t=!0)})}),t},this.removeSnippet=function(e){var t=0;return this.slots.forEach(function(n){n.forEach(function(r){r[1].id===e&&(t=r,n.splice(n.indexOf(r),1))})}),t},this.insertSnippet=function(e,t){var r=0;this.slots.forEach(function(n){n.forEach(function(i){if(r!==0)return;i[1].id===e&&(r=i,n.splice(n.indexOf(r),0,t))})}),n++,i();return},this.append=function(e){r[0].push(e),n++,i();return},this.forEach=function(e){this.slots.forEach(function(t){t.forEach(function(n){e(n,t)})})},this.rekey=function(){var t=this;this.slots.forEach(function(n){n.length===0?n.push(["mi",{id:e.guid(),"class":"blank",tex:[""]},"[drop]"]):n.forEach(function(r){if(!r[1])return;r[1]["class"]&&r[1]["class"]==="blank"&&n.length>1&&t.removeSnippet(r[1].id),r[1].id&&(r[1].id=e.guid())})})},this.output=function(e){function t(n){var r="";if(typeof n=="string")return n;if(n[1]&&n[1][e]){var i=0;while(n[1][e][i])r+=n[1][e][i++],n[2]&&typeof n[1][e][i]=="number"&&(r+=t(n[2][n[1][e][i]])),i++}else n[2]&&(typeof n[2]=="string"?r+=n[2]:n[2].forEach(function(e){r+=t(e)}));return r}var n="";return r[0].forEach(function(e){n+=t(e)}),n}}},"@VERSION@",{requires:["json"]});
