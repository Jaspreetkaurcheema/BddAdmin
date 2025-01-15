import ApiService from './ApiService'

export async function apiGetCategoriesData() {
    return ApiService.fetchData({
        url: '/knowledge-base/categories',
        method: 'get',
    })
}

export async function apiQueryArticleList(data) {
    return ApiService.fetchData({
        url: '/knowledge-base/articles-query',
        method: 'post',
        data,
    })
}

// export async function apiGetArticle(params) {
//     return ApiService.fetchData({
//         url: '/knowledge-base/article',
//         method: 'get',
//         params,
//     })
// }
export async function apiGetArticle(params) {
    return ApiService.fetchData({
        url: `/Admin/pages/${params.id}`,
        method: 'get',
        params,
    })
}

// export async function apiPostArticle(data) {
//     return ApiService.fetchData({
//         url: '/knowledge-base/article',
//         method: 'post',
//         data,
//     })
// }
export async function apiPostArticle(data) {
    return ApiService.fetchData({
        url: '/Admin/add/pages',
        method: 'post',
        data,
    })
}
export async function apiEditArticle(data,id) {

    console.log(id,'ghsdh')
    return ApiService.fetchData({
        url: `/Admin/pages/${id}`,
        method: 'put',
        data,
    })
}
export async function apiGetOthersArticleList(params) {
    return ApiService.fetchData({
        url: '/knowledge-base/others-article',
        method: 'get',
        params,
    })
}

// export async function apiGetCategorizedArticles(params) {
//     return ApiService.fetchData({
//         url: '/knowledge-base/categorized-articles',
//         method: 'get',
//         params,
//     })
// }
export async function apiGetCategorizedArticles(params) {
    return ApiService.fetchData({
        url: '/Admin/pages',
        method: 'get',
        params,
    })
}
export async function apiDeleteCategorizedArticles(data) {

    console.log(data,'parajjkdkjdjfk')
    return ApiService.fetchData({
        url: `/Admin/page/${data.pageId}`,
        method: 'delete',
        data
        
    })
}