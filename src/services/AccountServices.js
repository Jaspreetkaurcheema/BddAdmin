import ApiService from './ApiService'

export async function apiGetAccountSettingData() {
    return ApiService.fetchData({
        url: '/account/setting',
        method: 'get',
    })
}

export async function apiGetAccountSettingIntegrationData() {
    return ApiService.fetchData({
        url: '/account/setting/integration',
        method: 'get',
    })
}

export async function apiGetAccountSettingBillingData() {
    return ApiService.fetchData({
        url: '/account/setting/billing',
        method: 'get',
    })
}

export async function apiGetAccountInvoiceData(params) {
    return ApiService.fetchData({
        url: '/account/invoice',
        method: 'get',
        params,
    })
}

export async function apiGetAccountLogData(data) {
    return ApiService.fetchData({
        url: '/account/log',
        method: 'post',
        data,
    })
}

export async function apiGetAccountFormData() {
    return ApiService.fetchData({
        url: '/account/form',
        method: 'get',
    })
}

export async function apiGetAccountdetailsData() {
    return ApiService.fetchData({
        url: `/Admin/detail`,
        method: 'get',
    })
}

export async function apiPutAdminprofilesData(data) {
    return ApiService.fetchData({
        url: `/Admin/profile`,
        method: 'put',
        data,
    })
}
export async function apiPutAdminpasswordData(data) {
    return ApiService.fetchData({
        url: `/Admin/password`,
        method: 'put',
        data,
    })
}
export async function apiPutAdminEmailData(data) {
    return ApiService.fetchData({
        url: `/Admin/email`,
        method: 'put',
        data,
    })
}
