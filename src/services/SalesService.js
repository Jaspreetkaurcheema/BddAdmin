import ApiService from './ApiService'

export async function apiGetSalesDashboardData(data) {
    return ApiService.fetchData({
        url: '/sales/dashboard',
        method: 'post',
        data,
    })
}

export async function apiGetSalesProducts(data) {
    return ApiService.fetchData({
        url: '/sales/products',
        method: 'post',
        data,
    })
}

export async function apiDeleteSalesProducts(data) {
    return ApiService.fetchData({
        url: '/sales/products/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesProduct(params) {
    return ApiService.fetchData({
        url: '/sales/product',
        method: 'get',
        params,
    })
}

export async function apiPutSalesProduct(data) {
    return ApiService.fetchData({
        url: '/sales/products/update',
        method: 'put',
        data,
    })
}

export async function apiCreateSalesProduct(data) {
    return ApiService.fetchData({
        url: '/promo-code',
        method: 'post',
        data,
    })
}
export async function apiCreateFaq(data) {
    return ApiService.fetchData({
        url: '/Admin/add/faq',
        method: 'post',
        data,
    })
}
export async function apiCreateSportEvent(data) {
    return ApiService.fetchData({
        url: '/Admin/add/poolEvent',
        method: 'post',
        data,
    })
}

export async function apiGetPool() {
   
    return ApiService.fetchData({
        url: `/pools`,
        method: 'get',
    
    })
}
export async function apiGetProgramed() {
   
    return ApiService.fetchData({
        url: `/Admin/sports`,
        method: 'get',
    
    })
}
export async function apiGetSport() {
   
    return ApiService.fetchData({
        url: `/Admin/sports`,
        method: 'get',
    
    })
}
export async function apiGetSeason() {
   
    return ApiService.fetchData({
        url: `/Admin/season/year`,
        method: 'get',
    
    })
}
export async function apiGetRound(params) {
   console.log(params,'params123444')
    return ApiService.fetchData({
        url: `/Admin/rounds/${params}`,
        method: 'get'
    
    })
}
export async function apiGetRegion() {
     return ApiService.fetchData({
         url: `/Admin/regions`,
         method: 'get'
     
     })
 }
export async function apiGetPoolType() {
   
    return ApiService.fetchData({
        url: `/Admin/poolType`,
        method: 'get',
    
    })
}
export async function apiGetSalesOrders(params) {
    return ApiService.fetchData({
        url: '/sales/orders',
        method: 'get',
        params,
    })
}

export async function apiDeleteSalesOrders(data) {
    return ApiService.fetchData({
        url: '/sales/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesOrderDetails(params) {
    return ApiService.fetchData({
        url: '/sales/orders-details',
        method: 'get',
        params,
    })
}
