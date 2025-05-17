class customisedPromise{

    constructor(executor){
        this._resolve = this.#_resolve.bind(this);
        this._reject= this.#_reject.bind(this);
        executor(this._resolve,this._reject);
    }

    #_resolve(){
        console.log("this",this);
    }

    #_reject(){

    }
}


function init(){
    const p = new customisedPromise(r=>r(10));
}

init();