class ZeusEditor {
    constructor(element, toolbar = true) {
        this.editorElement = document.querySelector(element);
        this.toolbarEnabled = toolbar;
        this.blocks = [];
        this.contentElement = null;
    }   

    addBlock(name, content) {
        const block = { name, content };
        this.blocks.push(block);
        console.log(this.blocks);
    }

    run() {
        if (this.toolbarEnabled) {
            const toolbar = document.createElement('div');
            toolbar.style.border = "1px solid #ccc";
            toolbar.style.padding = "5px";
            toolbar.style.marginBottom = "10px";
            
            this.blocks.forEach(block => {
                const blockElement = document.createElement('div');
                blockElement.innerText = block.name;
                blockElement.draggable = true;

                blockElement.addEventListener('dragstart', (event) => {
                    event.dataTransfer.setData('text/plain', block.content);
                });

                toolbar.appendChild(blockElement);
            });

            this.editorElement.appendChild(toolbar);
        }

        this.contentElement = document.createElement('div');
        this.contentElement.contentEditable = true;
        this.contentElement.style.border = "1px solid #ccc";
        this.contentElement.style.minHeight = "200px";
        this.contentElement.style.padding = "5px";

        this.contentElement.addEventListener('dragover', (event) => {
            event.preventDefault();
        });
        
        this.contentElement.addEventListener('drop', (event) => {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/plain');
            const newElement = document.createElement('div');
            newElement.innerHTML = data;
            this.contentElement.appendChild(newElement);
        });        
        
        this.editorElement.appendChild(this.contentElement);
        this.contentElement.focus();
    }
}