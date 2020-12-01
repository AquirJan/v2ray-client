export default class dialogPop {
    constructor(options) {
        this.opt = Object.assign({
            id: `dialog_${new Date().getTime()}`
        }, options);
        this.pop = null;
        this.popWrap = null;
        this.init()
    }
    init() {
        this.popWrap = document.createElement('div')
        this.pop = document.createElement('dialog')
        this.pop.innerHTML = `abc`
        // this.pop.style.cssText = `
        //     position: fixed;
        //     top: 0;
        //     left: 0;
        // `
        document.body.appendChild(this.pop)
        this.pop.showModal()
        return this;
    }
}