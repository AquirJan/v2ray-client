export default class samoDialog {
    constructor(options) {
        this.opt = Object.assign({
            id: `dialog_${new Date().getTime()}`,
            content: 'default content',
            duration: 0
        }, options);
        this.dialog = undefined;
        this.dialogWrap = undefined;
        this.init()
    }
    init() {
        this.dialogWrap = document.createElement('div')
        this.dialogWrap.id = this.opt.id
        this.dialog = document.createElement('div')
        this.dialog.innerHTML = this.opt.content
        this.dialog.style.cssText = `
            display: grid;
            font-size: 1rem;
            padding: .5rem;
            border-radius: 4px;
            border: 1px solid #999;
            color: #333;
            background-color: #efefef;
            box-shadow: 0 0 20px -2px #666;
        `
        this.dialogWrap.style.cssText = `
            position: fixed;
            display: grid;
            align-items: center;
            justify-content: center;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transition: all 300ms;
            opacity: 0;
            background-color: rgba(0, 0, 0, .1);
            z-index: 10;
        `
        this.dialogWrap.addEventListener('click', ()=>{
            document.body.removeChild(this.dialogWrap)
        })
        this.dialogWrap.appendChild(this.dialog)
        document.body.appendChild(this.dialogWrap)
        setTimeout(()=>{
            this.dialogWrap.style.opacity = 1;
        }, 100)
        if (this.opt.duration) {
            setTimeout(()=>{
                document.body.removeChild(this.dialogWrap)
            }, this.opt.duration)
        }
        
        return this;
    }
    close() {
        document.body.removeChild(this.dialogWrap)
    }
    setContent(content) {
        this.dialog.innerHTML = content
    }
    setDialogStyle(styles={}) {
        for(let key in styles) {
            this.dialog.style[key] = styles[key]
        }
    }
}