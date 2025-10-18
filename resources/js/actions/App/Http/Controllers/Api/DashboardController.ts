import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\DashboardController::getStats
 * @see app/Http/Controllers/Api/DashboardController.php:19
 * @route '/api/v1/admin/dashboard/stats'
 */
export const getStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStats.url(options),
    method: 'get',
})

getStats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/dashboard/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\DashboardController::getStats
 * @see app/Http/Controllers/Api/DashboardController.php:19
 * @route '/api/v1/admin/dashboard/stats'
 */
getStats.url = (options?: RouteQueryOptions) => {
    return getStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DashboardController::getStats
 * @see app/Http/Controllers/Api/DashboardController.php:19
 * @route '/api/v1/admin/dashboard/stats'
 */
getStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\DashboardController::getStats
 * @see app/Http/Controllers/Api/DashboardController.php:19
 * @route '/api/v1/admin/dashboard/stats'
 */
getStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\DashboardController::getStats
 * @see app/Http/Controllers/Api/DashboardController.php:19
 * @route '/api/v1/admin/dashboard/stats'
 */
    const getStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getStats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\DashboardController::getStats
 * @see app/Http/Controllers/Api/DashboardController.php:19
 * @route '/api/v1/admin/dashboard/stats'
 */
        getStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getStats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\DashboardController::getStats
 * @see app/Http/Controllers/Api/DashboardController.php:19
 * @route '/api/v1/admin/dashboard/stats'
 */
        getStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getStats.form = getStatsForm
const DashboardController = { getStats }

export default DashboardController