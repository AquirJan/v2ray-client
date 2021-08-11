export default class ajDialog {
    constructor(options) {
        this.opt = Object.assign({
            id: `dialog_${new Date().getTime()}`
        }, options);
        this.pop = undefined;
        this.popWrap = undefined;
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
        return this.pop;
    }
}