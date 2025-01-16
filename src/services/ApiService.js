import BaseService from './BaseService'

const ApiService = {
    fetchData(param) {
        console.log(param,"params")
        return new Promise((resolve, reject) => {        
             BaseService(param)
                .then((response) => {
                    // console.log(response,"responce")subMenu
                    resolve(response)
                })
                .catch((errors) => {
                    console.log(errors,"errr")
                    reject(errors)
                })
        })
    },
}

export default ApiService
