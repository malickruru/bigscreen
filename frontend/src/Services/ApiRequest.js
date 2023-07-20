// cette classe permet d'isoler le code permettant d'effectuer une requête afin de le rappeler plus aisement dans les composants

class ApiRequest {

    constructor(isPublic, url, method, HasBody,header = []) {
        this.isPublic = isPublic; // la requête necessite t'elle une authentification ?
        this.method = method; // méthode de la requête 
        this.url =  url; // url de la requête
        this.HasBody = HasBody; // les paramètres requête necessitent t'ils une une propriété body  ?
        this.bodyContent = {} // corps de la requête (vide par défaut)
        this.header = header
    }


    // cette méthode retourne le corps
    getBody() {
        return null
    }


    requestOptions() {
        let option = {}
        //header
        option.headers = new Headers()
        if (!this.isPublic) {
            option.headers.append("Authorization", "Bearer " + localStorage.getItem("BigScreenToken"));
        }
        if(this.header.includes('JSON')){
            option.headers.append("Content-Type", "application/json");
        }
        // methode
        option.method = this.method;
        //body
        if (this.HasBody) {
            option.body = this.getBody()
        }
        // redirect
        option.redirect = 'follow'
        
        return option
    }

    finalUrl(param){
        let urlArray = this.url.split('/');
        let mappedArray = urlArray.map((item) => {
            if(item[0] == ':'){
                return param[item.slice(1)]
            }
            return item
        })
        return "http://127.0.0.1:8000/api"+mappedArray.join('/')
    }

    async getResponse(UrlParams = {}, bodyContent = {}) {
        //retourne une réponse au format json
        // si url UrlParams et/ou bodyContent ne sont pas vide , modifier les informations
        // de la requête 
        this.bodyContent = bodyContent
        let response = await fetch(this.finalUrl(UrlParams), this.requestOptions());
        return response.json();
    }
}

// méthode de type GET 
class Get extends ApiRequest {
    constructor(isPublic, url) {
        super(isPublic, url, 'GET', false)
    }
}

// méthode de type POST 
class Post extends ApiRequest {
    constructor(isPublic, url) {
        super(isPublic, url, 'POST', true , ['JSON'])
    }

    // le corp de la requête est de type JSON
    getBody() {
        return JSON.stringify(this.bodyContent);;
    }
}



export {
    Get,
    Post,
}