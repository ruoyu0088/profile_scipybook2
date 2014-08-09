// leave at least 2 line with only a star on it below, or doc generation fails
/**
 *
 *
 * Placeholder for custom user javascript
 * mainly to be overridden in profile/static/custom/custom.js
 * This will always be an empty file in IPython
 *
 * User could add any javascript in the `profile/static/custom/custom.js` file
 * (and should create it if it does not exist).
 * It will be executed by the ipython notebook at load time.
 *
 * Same thing with `profile/static/custom/custom.css` to inject custom css into the notebook.
 *
 * Example :
 *
 * Create a custom button in toolbar that execute `%qtconsole` in kernel
 * and hence open a qtconsole attached to the same kernel as the current notebook
 *
 *    $([IPython.events]).on('app_initialized.NotebookApp', function(){
 *        IPython.toolbar.add_buttons_group([
 *            {
 *                 'label'   : 'run qtconsole',
 *                 'icon'    : 'icon-terminal', // select your icon from http://fortawesome.github.io/Font-Awesome/icons
 *                 'callback': function () {
 *                     IPython.notebook.kernel.execute('%qtconsole')
 *                 }
 *            }
 *            // add more button here if needed.
 *            ]);
 *    });
 *
 * Example :
 *
 *  Use `jQuery.getScript(url [, success(script, textStatus, jqXHR)] );`
 *  to load custom script into the notebook.
 *
 *    // to load the metadata ui extension example.
 *    $.getScript('/static/notebook/js/celltoolbarpresets/example.js');
 *    // or
 *    // to load the metadata ui extension to control slideshow mode / reveal js for nbconvert
 *    $.getScript('/static/notebook/js/celltoolbarpresets/slideshow.js');
 *
 *
 * @module IPython
 * @namespace IPython
 * @class customjs
 * @static
 */
 
var macros = {
    "1":"❶",
    "2":"❷",
    "3":"❸",
    "4":"❹",
    "5":"❺",
    "6":"❻",
    "7":"❼",
    "8":"❽",
    "9":"❾",
    "fig":'![](/files/images/.png "")',
    "next":'`ref:fig-next`',
    "prev":'`ref:fig-prev`'
 }
 
$([IPython.events]).on('app_initialized.NotebookApp', function(){
    var data = {
        help    : 'macro',
        help_index : 'aa',
        handler : function (event) {
            var cm = IPython.notebook.get_selected_cell().code_mirror;
            var cursor = cm.getCursor();
            var line = cm.getLine(cursor.line);
            var index = cursor.ch - 1;
            while(index >= 0)
            {
                if(line[index] == "$" ) break;
                index -= 1;
            }
            if(index >= 0)
            {
                var cmd = line.substring(index+1, cursor.ch);                
                var from = {line:cursor.line, ch:index};
                if (cmd in macros)
                {
                    cm.replaceRange(macros[cmd], from, cursor);
                    return false;
                }
                
                switch(cmd)
                {
                    case "1":
                        cm.replaceRange("one", from, cursor);
                        return false;
                }
                
            }
            return true;
        }    
    };
    IPython.keyboard_manager.edit_shortcuts.add_shortcut("space", data, true);
    
    var pep8_data = {
        handler : function(event){
            var kernel = IPython.notebook.kernel;
            var cell = IPython.notebook.get_selected_cell();
            var code = "%%pep8" + "\n" + cell.get_text();
            function callback(data){
                var result = data.content.data["text/plain"];
                cell.set_text(result);
            }
            kernel.execute(code, {iopub:{output: callback}}, {silent:false});          
        }
    };

    IPython.keyboard_manager.edit_shortcuts.add_shortcut("ctrl-alt-8", pep8_data, true);    
    
     require(["nbextensions/toc"], function (toc) {
        console.log('Table of Contents extension loaded');
        toc.load_extension();
        
        $("#menus").append($("#move_up_b"));
        $("#menus").append($("#move_down_b"));
        $("#menus").append($("#toc_button"));
        $("#menus").append($("#save_widget"));
        $("#checkpoint_status").hide();
        $("#autosave_status").hide();
        $("#notebook_name").text($("body").attr("data-notebook-name").replace(".ipynb", ""));
        $('div#maintoolbar').toggle();
        $('div#header').toggle();
        IPython.layout_manager.do_resize();            
    }); 
    
    require(['nbextensions/livereveal/main'],function(livereveal){
        // livereveal.parameters('theme', 'transition', 'fontsize', static_prefix);
        //   * theme can be: simple, sky, beige, serif, solarized
        //   (you will need aditional css for default, night, moon themes).
        //   * transition can be: linear, zoom, fade, none
        livereveal.parameters('sky', 'zoom');
    });    
    
});
