import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
 * @see routes/web.php:42
 * @route '/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:42
 * @route '/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:42
 * @route '/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:42
 * @route '/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:42
 * @route '/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:42
 * @route '/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:42
 * @route '/admin/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
 * @see routes/web.php:88
 * @route '/admin/diplomas'
 */
export const diplomas = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: diplomas.url(options),
    method: 'get',
})

diplomas.definition = {
    methods: ["get","head"],
    url: '/admin/diplomas',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:88
 * @route '/admin/diplomas'
 */
diplomas.url = (options?: RouteQueryOptions) => {
    return diplomas.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:88
 * @route '/admin/diplomas'
 */
diplomas.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: diplomas.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:88
 * @route '/admin/diplomas'
 */
diplomas.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: diplomas.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:88
 * @route '/admin/diplomas'
 */
    const diplomasForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: diplomas.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:88
 * @route '/admin/diplomas'
 */
        diplomasForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: diplomas.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:88
 * @route '/admin/diplomas'
 */
        diplomasForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: diplomas.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    diplomas.form = diplomasForm
/**
 * @see routes/web.php:92
 * @route '/admin/attendance'
 */
export const attendance = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendance.url(options),
    method: 'get',
})

attendance.definition = {
    methods: ["get","head"],
    url: '/admin/attendance',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:92
 * @route '/admin/attendance'
 */
attendance.url = (options?: RouteQueryOptions) => {
    return attendance.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:92
 * @route '/admin/attendance'
 */
attendance.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendance.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:92
 * @route '/admin/attendance'
 */
attendance.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: attendance.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:92
 * @route '/admin/attendance'
 */
    const attendanceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: attendance.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:92
 * @route '/admin/attendance'
 */
        attendanceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendance.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:92
 * @route '/admin/attendance'
 */
        attendanceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendance.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    attendance.form = attendanceForm
/**
 * @see routes/web.php:96
 * @route '/admin/winners'
 */
export const winners = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: winners.url(options),
    method: 'get',
})

winners.definition = {
    methods: ["get","head"],
    url: '/admin/winners',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:96
 * @route '/admin/winners'
 */
winners.url = (options?: RouteQueryOptions) => {
    return winners.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:96
 * @route '/admin/winners'
 */
winners.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: winners.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:96
 * @route '/admin/winners'
 */
winners.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: winners.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:96
 * @route '/admin/winners'
 */
    const winnersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: winners.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:96
 * @route '/admin/winners'
 */
        winnersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: winners.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:96
 * @route '/admin/winners'
 */
        winnersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: winners.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    winners.form = winnersForm
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
diplomas: Object.assign(diplomas, diplomas),
attendance: Object.assign(attendance, attendance),
winners: Object.assign(winners, winners),
}

export default admin