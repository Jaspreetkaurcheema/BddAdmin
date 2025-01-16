import ApiService from './ApiService'

export async function apiGetCrmDashboardData(data) {
    return ApiService.fetchData({
        url: '/users',
        method: 'get',
        data,
    })
}

export async function apiGetCrmCalendar() {
    return ApiService.fetchData({
        url: '/crm/calendar',
        method: 'get',
    })
}

export async function apiGetCrmCustomers(data) {
    console.log(data,'datdatdata')
    return ApiService.fetchData({
        url: '/Admin/users',
        method: 'post',
        data,
    })
}
export async function apiGetAppSports(params) {
    console.log(params,'datdatdata')
    return ApiService.fetchData({
        url:`/Admin/sport/${params}`,
        method: 'get',
        
    })
}
export async function apiGetAppPoolEvents(data) {
    console.log(data,'datdatdata')
    return ApiService.fetchData({
        url: '/Admin/events/list',
        method: 'post',
        data,
    })
}
export async function apiGetAppPoolGames(data) {
    console.log(data,'datdatdata')
    return ApiService.fetchData({
        url: '/Admin/games',
        method: 'post',
        data,
    })
}
export async function apiGetAppPoolEntries(data) {
    console.log(data,'datdatdata')
    return ApiService.fetchData({
        url: '/Admin/pool/entries',
        method: 'post',
        data,
    })
}
export async function apiGetAppPoolMembers(data) {
    console.log(data,'datdatdata')
    return ApiService.fetchData({
        url: '/Admin/pool/members',
        method: 'post',
        data,
    })
}
export async function apiGetAppPoolLeader(data) {
    console.log(data,'datdatdata')
    return ApiService.fetchData({
        url: '/Admin/leader/board/list',
        method: 'post',
        data,
    })
}
export async function apiGetAppPoolAnalytic(data) {
    console.log(data,'datdatdata')
    return ApiService.fetchData({
        url: '/Admin/pool/analytic/list',
        method: 'post',
        data,
    })
}


export async function apiGetCrmPools(data) {
    console.log(data,'datdatdata')
    return ApiService.fetchData({
        url: '/Admin/pools/list',
        method: 'post',
        data,
    })
}
export async function apiGetCrmSubscriptions(data) {
    console.log(data,'datdatdata')
    return ApiService.fetchData({
        url: '/Admin/subscription/list',
        method: 'post',
        data,
    })
}
export async function apiGetAppInquiries(data) {
    console.log(data,'datdatdata')
    return ApiService.fetchData({
        url: '/Admin/inquiries/list',
        method: 'post',
        data,
    })
}
export async function apiGetCorInquiries(data) {
     return ApiService.fetchData({
        url: '/Admin/contact/form/list',
        method: 'post',
        data,
    })
}
export async function apiGetAppReply(data) {
    console.log(data,'datdatdataReplu')
    return ApiService.fetchData({
        url: `/Admin/inquiry/${parseInt(data.id)}`,
        method: 'get',
        data,
    })
}
export async function apiAddInquiry(data) {
   
    return ApiService.fetchData({
        url: '/Admin/inquiry/reply',
        method: 'post',
        data,
    })
}


export async function apiGetCrmCustomersStatistic(params) {
    return ApiService.fetchData({
        url: '/Admin/filter',
        method: 'get',
        params,
    })
}

export async function apiGetPromoCode(data) {
    return ApiService.fetchData({
        url: '/promo-codes',
        method: 'post',
        data,
    })
}
export async function apiGetPayments(data) {
    return ApiService.fetchData({
        url: 'Admin/payment/list',
        method: 'post',
        data,
    })
}

export async function apiGetFaqs(data) {
    return ApiService.fetchData({
        url: '/Admin/faq/list',
        method: 'post',
        data,
    })
}

export async function apPutFaq(data) {
    console.log(data,'4321')
    return ApiService.fetchData({
        url: `/Admin/faq/${data.id}`,
        method: 'put',
        data,
    })
}

export async function apPutCrmCustomer(data) {
    console.log(data,'4321')
    return ApiService.fetchData({
        url: `/Admin/edit/${data.id}`,
        method: 'put',
        data,
    })
}

export async function apPutCrmEventPool(data) {
    console.log(data,'4321')
    return ApiService.fetchData({
        url: `/Admin/pool/event/${data.id}`,
        method: 'put',
        data,
    })
}

export async function apPutCrmPromo(data) {
    return ApiService.fetchData({
        url: `/promo-code/${data.id}`,
        method: 'put',
        data,
    })
}
export async function apDeleteCrmPromo(data) {
    console.log(data,'datadata4321')
    return ApiService.fetchData({
        url: `/promo-code/${data.id}`,
        method: 'patch',
        data,
    })
}
export async function apDeleteEvent(data) {
    console.log(data,'datadata4321')
    return ApiService.fetchData({
        url: `/Admin/poolEvent/${data.poolEventId}`,
        method: 'delete',
        data,
    })
}
export async function apDeleteFaq(data) {
    console.log(data,'datadata4321')
    return ApiService.fetchData({
        url: `/Admin/faq/${data.faqId}`,
        method: 'delete',
        data,
    })
}
export async function apiGetCrmCustomerDetails(params) {
    console.log(params.id,'paramssssss12')
    return ApiService.fetchData({
        url: `/Admin/user/${params.id}`,
        method: 'get',
    
    })
}
export async function apiGetPoolEventDetail(params) {
    return ApiService.fetchData({
        url: `/Admin/event/${params.id}`,
        method: 'get',
    
    })
}
export async function apiGetCrmPoolList(data) {

    return ApiService.fetchData({
        url: `/Admin/user/createdlist`,
        method: 'post',
        data
    
    })
}
export async function apiGetCrmActivePoolList(data) {

    return ApiService.fetchData({
        url: `/Admin/active/pools`,
        method: 'post',
        data
    
    })
}
export async function apiGetCrmFeaturedPoolList(data) {

    return ApiService.fetchData({
        url: `/Admin/featured/pools`,
        method: 'post',
        data
    
    })
}
export async function apiGetCrmPaymentPoolList(data) {

    return ApiService.fetchData({
        url: `/Admin/user/transactions`,
        method: 'post',
        data
    
    })
}
export async function apiGetCrmAccomplishList(data) {

    return ApiService.fetchData({
        url: `/Admin/recent/accomplishments`,
        method: 'post',
        data
    
    })
}
export async function apiGetEntriesList(data) {

    return ApiService.fetchData({
        url: `/Admin/user/pool/entries`,
        method: 'post',
        data
    
    })
}
export async function apiGetHistoryList(data) {

    return ApiService.fetchData({
        url: `/Admin/user/pool/history`,
        method: 'post',
        data
    
    })
}
export async function apiGetCrmPoolDetails(params) {
    console.log(params.id,'paramssssss12')
    return ApiService.fetchData({
        url: `/Admin/pool/${params.id}`,
        method: 'get',
    
    })
}
export async function apiGetPoolStats(params) {
    return ApiService.fetchData({
        url: `/Admin/user/pool/stats?user_id=${params.id}`,
        method: 'get'   
    })
}
export async function apiGetCrmPoolEventDetails(data) {
    // console.log(params.id,'paramssssss13')
    return ApiService.fetchData({
        url: `/Admin/games/list`,
        method: 'post',
        data
    
    })
}
export async function apiGetCrmPoolTeamDetails(data) {
    // console.log(params.id,'paramssssss13')
    return ApiService.fetchData({
        url: `/Admin/team/list`,
        method: 'post',
        data
    
    })
}

export async function apiDeleteCrmCustomer(params) {
    console.log(params,'pppppp')
    return ApiService.fetchData({
        url:`/user/${params.id}`,
        method: 'patch',
        
    })
}

export async function apiGetCrmMails(params) {
    return ApiService.fetchData({
        url: '/crm/mails',
        method: 'get',
        params,
    })
}

export async function apiGetCrmMail(params) {
    return ApiService.fetchData({
        url: '/crm/mail',
        method: 'get',
        params,
    })
}
