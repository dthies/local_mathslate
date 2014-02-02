YUI.add("moodle-local_mathslate-mathjaxeditor",function(e,t){M.local_mathslate=M.local_mathslate||{};var n={SELECTED:"mathslate-selected",WORKSPACE:"mathslate-workspace",PREVIEW:"mathslate-preview",HIGHLIGHT:"highlight"},r={SELECTED:"."+n.SELECTED};M.local_mathslate.MathJaxEditor=function(t){function a(){o.setHTML(s.preview("tex")),s.forEach(function(t){var i=u.get("node").one("#"+t[1].id);if(!i)return;i.on("click",function(e){e.stopPropagation();var t=u.get("node").one(r.SELECTED);if(!t){i.addClass(n.SELECTED),s.select(i.getAttribute("id")),o.one("#"+i.getAttribute("id")).addClass(n.SELECTED),o.one("#"+i.getAttribute("id")).focus();return}if(t===i){i.removeClass(n.SELECTED),o.one("#"+i.getAttribute("id")).removeClass(n.SELECTED),s.select();return}if(i.one("#"+t.getAttribute("id")))return;s.insertSnippet(t.getAttribute("id"),s.removeSnippet(i.getAttribute("id"))),f()}),i.on("dblclick",function(e){e.stopPropagation(),s.removeSnippet(i.getAttribute("id")),f()});if(!t[1]||!t[1]["class"]||t[1]["class"]!=="blank"){var a=(new e.DD.Drag({node:i})).plug(e.Plugin.DDProxy,{resizeFrame:!1,moveOnEnd:!1});a.on("drag:start",function(){u.get("node").one(r.SELECTED)&&(s.select(),u.get("node").one(r.SELECTED).removeClass(n.SELECTED));var i=e.guid();this.get("dragNode").set("innerHTML",""),MathJax.Hub.Queue(["addElement",MathJax.HTML,this.get("dragNode").getDOMNode(),"span",{id:i},[["math",{display:"block"},[e.JSON.parse(s.getItemByID(t[1].id))]]]]),MathJax.Hub.Queue(["Typeset",MathJax.Hub,i])})}var l=new e.DD.Drop({node:i});l.on("drop:hit",function(e){var n=e.drag.get("node").get("id");e.drag.get("data")?s.insertSnippet(t[1].id,s.createItem(e.drag.get("data"))):n!==t[1].id&&s.isItem(n)&&!u.get("node").one("#"+n).one("#"+t[1].id)&&s.insertSnippet(e.drop.get("node").get("id"),s.removeSnippet(n)),f()}),l.on("drop:enter",function(e){e.stopPropagation(),u.get("node").all(".highlight").each(function(e){e.removeClass("highlight")}),this.get("node").addClass("highlight")}),l.on("drop:exit",function(){this.get("node").removeClass("highlight")})}),s.getSelected()&&u.get("node").one("#"+s.getSelected())&&(u.get("node").one("#"+s.getSelected()).addClass(n.SELECTED),o.one("#"+s.getSelected()).addClass(n.SELECTED))}function f(){s.rekey(),u.get("node").setHTML(""),MathJax.Hub.Queue(["addElement",MathJax.HTML,u.get("node").getDOMNode(),"math",{display:"block"},i]),MathJax.Hub.Queue(["Typeset",MathJax.Hub,"canvas"]),MathJax.Hub.Queue(a)}var i=[],s=new M.local_mathslate.mSlots;s.slots.push(i),this.workspace=e.one(t).append('<div id="canvas" class="'+n.WORKSPACE+'"/>');var o=e.one(t).appendChild(e.Node.create('<div class="'+n.PREVIEW+'">')),u=new e.DD.Drop({node:this.workspace.one("#canvas")});this.canvas=u,this.workspace.on("click",function(){s.select(),f()}),this.render=f,this.addMath=function(t){if(!t)return;e.one(r.SELECTED)?s.insertSnippet(e.one(r.SELECTED).getAttribute("id"),s.createItem(t)):s.append(s.createItem(t)),f()},this.clear=function(){e.one(r.SELECTED)?s.removeSnippet(e.one(r.SELECTED).getAttribute("id")):(i=[],s.next=new M.local_mathslate.mSlots,s.next.previous=s,s=s.next,s.slots.push(i)),f()},this.output=function(e){return e==="MathML"?u.get("node").one("script").getHTML():e==="HTML"?u.get("node").one("span").getHTML():s.output(e)},this.preview=function(e){return s.output(e)},this.getHTML=function(){return u.get("node").one("span").getHTML()},this.redo=function(){s=s.redo(),i=s.slots[0],f()},this.undo=function(){s=s.undo(),i=s.slots[0],f()},f()}},"@VERSION@",{requires:["moodle-local_mathslate-snippeteditor","dd-proxy","dd-drop"]});
