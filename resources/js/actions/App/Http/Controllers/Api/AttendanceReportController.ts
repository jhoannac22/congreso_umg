import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\AttendanceReportController::getStats
* @see app/Http/Controllers/Api/AttendanceReportController.php:17
* @route '/api/v1/attendance/stats'
*/
export const getStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStats.url(options),
    method: 'get',
})

getStats.definition = {
    methods: ["get","head"],
    url: '/api/v1/attendance/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AttendanceReportController::getStats
* @see app/Http/Controllers/Api/AttendanceReportController.php:17
* @route '/api/v1/attendance/stats'
*/
getStats.url = (options?: RouteQueryOptions) => {




    return getStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceReportController::getStats
* @see app/Http/Controllers/Api/AttendanceReportController.php:17
* @route '/api/v1/attendance/stats'
*/
getStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AttendanceReportController::getStats
* @see app/Http/Controllers/Api/AttendanceReportController.php:17
* @route '/api/v1/attendance/stats'
*/
getStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStats.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AttendanceReportController::getStats
* @see app/Http/Controllers/Api/AttendanceReportController.php:17
* @route '/api/v1/attendance/stats'
*/
const getStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getStats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AttendanceReportController::getStats
* @see app/Http/Controllers/Api/AttendanceReportController.php:17
* @route '/api/v1/attendance/stats'
*/
getStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getStats.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AttendanceReportController::getStats
* @see app/Http/Controllers/Api/AttendanceReportController.php:17
* @route '/api/v1/attendance/stats'
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

/**
* @see \App\Http\Controllers\Api\AttendanceReportController::getReports
* @see app/Http/Controllers/Api/AttendanceReportController.php:52
* @route '/api/v1/attendance/reports'
*/
export const getReports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReports.url(options),
    method: 'get',
})

getReports.definition = {
    methods: ["get","head"],
    url: '/api/v1/attendance/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AttendanceReportController::getReports
* @see app/Http/Controllers/Api/AttendanceReportController.php:52
* @route '/api/v1/attendance/reports'
*/
getReports.url = (options?: RouteQueryOptions) => {




    return getReports.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceReportController::getReports
* @see app/Http/Controllers/Api/AttendanceReportController.php:52
* @route '/api/v1/attendance/reports'
*/
getReports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReports.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AttendanceReportController::getReports
* @see app/Http/Controllers/Api/AttendanceReportController.php:52
* @route '/api/v1/attendance/reports'
*/
getReports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getReports.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AttendanceReportController::getReports
* @see app/Http/Controllers/Api/AttendanceReportController.php:52
* @route '/api/v1/attendance/reports'
*/
const getReportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getReports.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AttendanceReportController::getReports
* @see app/Http/Controllers/Api/AttendanceReportController.php:52
* @route '/api/v1/attendance/reports'
*/
getReportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getReports.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AttendanceReportController::getReports
* @see app/Http/Controllers/Api/AttendanceReportController.php:52
* @route '/api/v1/attendance/reports'
*/
getReportsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getReports.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getReports.form = getReportsForm

const AttendanceReportController = { getStats, getReports }

export default AttendanceReportController