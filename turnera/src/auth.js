class Auth {
    constructor() {
        this.authenticated = false
    }

    isAuthenticated(){
        return this.authenticated
    }

    login(cb){
        this.authenticated = true
        cb()
    }

    logout(cb){
        this.authenticated = false
        cb()
    }
}


export default new Auth()