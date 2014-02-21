YUI.add('moodle-local_mathslate-mathjaxeditor', function (Y, NAME) {

//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Text editor mathslate plugin.
 *
 * @package    local_mathslate
 * @copyright  2013-2014 Daniel Thies  <dthies@ccal.edu>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
M.local_mathslate = M.local_mathslate|| {};
var CSS = {
    SELECTED: 'mathslate-selected',
    WORKSPACE: 'mathslate-workspace',
    PREVIEW: 'mathslate-preview',
    HIGHLIGHT: 'mathslate-highlight',
    DRAGNODE: 'mathslate-workspace-drag',
    DRAGGEDNODE: 'mathslate-workspace-dragged'
};
var SELECTORS = {
    SELECTED: '.' + CSS.SELECTED,
    HIGHLIGHT: '.' + CSS.HIGHLIGHT
};
       
//Constructor for equation workspace
M.local_mathslate.MathJaxEditor=function(id){
        var math=[];
        var se=new M.local_mathslate.mSlots();
        se.slots.push(math);
        this.workspace=Y.one(id).append('<div id="canvas" class="'+CSS.WORKSPACE+'"/>');
        var preview = Y.one(id).appendChild(Y.Node.create('<div class="'+CSS.PREVIEW+'">'));
        preview.delegate('click',function(e){
            e.stopPropagation();
            canvas.get('node').one('#'+this.getAttribute('id')).handleClick();
        },'div');
        var canvas=new Y.DD.Drop({
            node: this.workspace.one('#canvas')});
        this.canvas=canvas;
        this.canvas.get('node').on('click',function(){
            se.select();
            render();
        });
/* Add drag and drop functionality
 * @function makeDraggable
 */
        function makeDraggable () {
            preview.setHTML(se.preview('tex'));
            se.forEach(function(m){
                var node=canvas.get('node').one('#'+m[1].id);
                if(!node){return;}
                node.handleClick = function() {
                    var selectedNode = canvas.get('node').one(SELECTORS.SELECTED);
                    if(!selectedNode){
                        node.addClass(CSS.SELECTED);
                        se.select(node.getAttribute('id'));
                        preview.one('#'+node.getAttribute('id')).addClass(CSS.SELECTED);
                        preview.one('#'+node.getAttribute('id')).focus();
                        return;
                    }
                    if(selectedNode===node){
                        node.removeClass(CSS.SELECTED);
                        preview.one('#'+node.getAttribute('id')).removeClass(CSS.SELECTED);
                        se.select();
                        return;
                    }
                    if(node.one('#'+selectedNode.getAttribute('id'))){return;}
                    se.insertSnippet(selectedNode.getAttribute('id'), se.removeSnippet(node.getAttribute('id')));
                    render();
                };
                node.on('click',function(e) {
                    e.stopPropagation();
                    this.handleClick();
                });
                node.on('dblclick',function(e){
                    e.stopPropagation();
                    se.removeSnippet(node.getAttribute('id'));
                    render();
                });
                if(!m[1]||!m[1]['class']||m[1]['class']!=='blank'){
                    var drag = new Y.DD.Drag({node: node}).plug(Y.Plugin.DDProxy, {
                        resizeFrame: false,
                        moveOnEnd: false
                    });
                    drag.on('drag:start', function(){
                        if(canvas.get('node').one(SELECTORS.SELECTED)){
                            se.select();
                            canvas.get('node').one(SELECTORS.SELECTED).removeClass(CSS.SELECTED);
                        }
                        this.get('node').addClass(CSS.DRAGGEDNODE);
                        var id = Y.guid();
                        this.get('dragNode').set('innerHTML','' );
                        this.get('dragNode').addClass(CSS.DRAGNODE);
                        MathJax.Hub.Queue(['addElement',MathJax.HTML,
                            this.get('dragNode').getDOMNode(),'span',{id: id},
                            [['math',{display: "block"},[Y.JSON.parse(se.getItemByID(m[1].id))]]]]);
                        MathJax.Hub.Queue(['Typeset',MathJax.Hub,id]);
                    });
                    drag.on('drag:end', function(){
                        this.get('node').removeClass(CSS.DRAGGEDNODE);
                    });
                }


                var drop = new Y.DD.Drop({node: node});
                drop.on('drop:hit',function(e){
                    var dragTarget=e.drag.get('node').get('id');
                    if(e.drag.get('data')) {
                        se.insertSnippet(m[1].id,se.createItem(e.drag.get('data')));
                    }
                    else if(dragTarget!==m[1].id&&se.isItem(dragTarget)&&!canvas.get('node').one('#'+dragTarget).one('#'+m[1].id)) {
                        se.insertSnippet(e.drop.get('node').get('id'), se.removeSnippet(dragTarget));
                    }
                    render();
                });
                drop.on('drop:enter',function(e){
                    e.stopPropagation();
                    canvas.get('node').all(SELECTORS.HIGHLIGHT).each(function(n){
                         n.removeClass(CSS.HIGHLIGHT);
                    });
                    this.get('node').addClass(CSS.HIGHLIGHT);
                });
                drop.on('drop:exit',function(e){
                    e.stopPropagation();
                    this.get('node').removeClass(CSS.HIGHLIGHT);
                });
                
            });
            if(se.getSelected()&&canvas.get('node').one('#'+se.getSelected())) {
                canvas.get('node').one('#'+se.getSelected()).addClass(CSS.SELECTED);
                preview.one('#'+se.getSelected()).addClass(CSS.SELECTED);
            }
        }
        function render() {
            se.rekey();
            canvas.get('node').setHTML('');
            MathJax.Hub.Queue(['addElement',MathJax.HTML,canvas.get('node').getDOMNode(),'math',{display: "block"},math]);
            MathJax.Hub.Queue(["Typeset",MathJax.Hub, 'canvas']);
            MathJax.Hub.Queue(makeDraggable);
        }
        this.render = render;
/* Method for add adding an object to the workspace
 * @method addMath
 * @param string json
 */
        this.addMath=function(json){
            if(!json){
                return;
            }
            if(Y.one(SELECTORS.SELECTED)){
                se.insertSnippet(Y.one(SELECTORS.SELECTED).getAttribute('id'),se.createItem(json));
            } else {
                se.append(se.createItem(json));
            }
            render();
        };
/* Unselected the selected node if any
 * @method clear
 */
        this.clear = function(){
            if(Y.one(SELECTORS.SELECTED)){
                se.removeSnippet(Y.one(SELECTORS.SELECTED).getAttribute('id'));
            } else {
                math=[];
                se.next=new M.local_mathslate.mSlots();
                se.next.previous=se;
                se=se.next;
                se.slots.push(math);
            }
            render();
        };
/* Return output in various formats
 * @method output
 * @param string format
 */
        this.output = function(format){
            if(format==='MathML') {
                return canvas.get('node').one('script').getHTML();
            }
            if(format==='HTML') {
                return canvas.get('node').one('span').getHTML();
            }
            return se.output(format);
        };
        this.preview = function(format){
            return se.output(format);
        };
        this.getHTML = function(){
            return canvas.get('node').one('span').getHTML();
        };
        this.redo = function(){
            se = se.redo();
            math = se.slots[0];
            render();
        };
        this.undo = function(){
            se = se.undo();
            math = se.slots[0];
            render();
        };
        render();
};


}, '@VERSION@', {"requires": ["moodle-local_mathslate-snippeteditor", "dd-proxy", "dd-drop"]});
