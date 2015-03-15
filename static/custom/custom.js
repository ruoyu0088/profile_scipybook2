// activate extensions only after Notebook is initialized


require(["nbextensions/toc"], function (toc) {
    console.log('Table of Contents extension loaded');
    toc.load_ipython_extension();
});

require(["base/js/events"], function (events) {
    events.on("app_initialized.NotebookApp", function () {
        IPython.load_extensions("raphael-min");
        IPython.load_extensions("flowchart-latest");        
        IPython.load_extensions('scpy2/info_blocks');
        IPython.load_extensions('scpy2/key_macros');
        IPython.load_extensions('scpy2/section_copy');
        IPython.load_extensions('scpy2/simple_ui');
        IPython.load_extensions('scpy2/group');
        IPython.load_extensions('scpy2/flowchart');
    });  
});
