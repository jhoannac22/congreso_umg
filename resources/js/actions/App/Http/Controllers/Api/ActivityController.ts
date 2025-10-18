import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/activities'
 */
const index7be484daeceeca1396870cd7d4b4fc45 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index7be484daeceeca1396870cd7d4b4fc45.url(options),
    method: 'get',
})

index7be484daeceeca1396870cd7d4b4fc45.definition = {
    methods: ["get","head"],
    url: '/api/v1/activities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/activities'
 */
index7be484daeceeca1396870cd7d4b4fc45.url = (options?: RouteQueryOptions) => {
    return index7be484daeceeca1396870cd7d4b4fc45.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/activities'
 */
index7be484daeceeca1396870cd7d4b4fc45.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index7be484daeceeca1396870cd7d4b4fc45.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/activities'
 */
index7be484daeceeca1396870cd7d4b4fc45.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index7be484daeceeca1396870cd7d4b4fc45.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/activities'
 */
    const index7be484daeceeca1396870cd7d4b4fc45Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index7be484daeceeca1396870cd7d4b4fc45.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/activities'
 */
        index7be484daeceeca1396870cd7d4b4fc45Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index7be484daeceeca1396870cd7d4b4fc45.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/activities'
 */
        index7be484daeceeca1396870cd7d4b4fc45Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index7be484daeceeca1396870cd7d4b4fc45.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index7be484daeceeca1396870cd7d4b4fc45.form = index7be484daeceeca1396870cd7d4b4fc45Form
    /**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/admin/activities'
 */
const index9b2bc631e4c6e8b2a90b583abdcc2ae5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index9b2bc631e4c6e8b2a90b583abdcc2ae5.url(options),
    method: 'get',
})

index9b2bc631e4c6e8b2a90b583abdcc2ae5.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/activities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/admin/activities'
 */
index9b2bc631e4c6e8b2a90b583abdcc2ae5.url = (options?: RouteQueryOptions) => {
    return index9b2bc631e4c6e8b2a90b583abdcc2ae5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/admin/activities'
 */
index9b2bc631e4c6e8b2a90b583abdcc2ae5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index9b2bc631e4c6e8b2a90b583abdcc2ae5.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/admin/activities'
 */
index9b2bc631e4c6e8b2a90b583abdcc2ae5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index9b2bc631e4c6e8b2a90b583abdcc2ae5.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/admin/activities'
 */
    const index9b2bc631e4c6e8b2a90b583abdcc2ae5Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index9b2bc631e4c6e8b2a90b583abdcc2ae5.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/admin/activities'
 */
        index9b2bc631e4c6e8b2a90b583abdcc2ae5Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index9b2bc631e4c6e8b2a90b583abdcc2ae5.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/admin/activities'
 */
        index9b2bc631e4c6e8b2a90b583abdcc2ae5Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index9b2bc631e4c6e8b2a90b583abdcc2ae5.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index9b2bc631e4c6e8b2a90b583abdcc2ae5.form = index9b2bc631e4c6e8b2a90b583abdcc2ae5Form

export const index = {
    '/api/v1/activities': index7be484daeceeca1396870cd7d4b4fc45,
    '/api/v1/admin/activities': index9b2bc631e4c6e8b2a90b583abdcc2ae5,
}

/**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/activities/{activity}'
 */
const showb4c760ceeac767f5c5c971ef150610e6 = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showb4c760ceeac767f5c5c971ef150610e6.url(args, options),
    method: 'get',
})

showb4c760ceeac767f5c5c971ef150610e6.definition = {
    methods: ["get","head"],
    url: '/api/v1/activities/{activity}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/activities/{activity}'
 */
showb4c760ceeac767f5c5c971ef150610e6.url = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { activity: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: typeof args.activity === 'object'
                ? args.activity.id
                : args.activity,
                }

    return showb4c760ceeac767f5c5c971ef150610e6.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/activities/{activity}'
 */
showb4c760ceeac767f5c5c971ef150610e6.get = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showb4c760ceeac767f5c5c971ef150610e6.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/activities/{activity}'
 */
showb4c760ceeac767f5c5c971ef150610e6.head = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showb4c760ceeac767f5c5c971ef150610e6.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/activities/{activity}'
 */
    const showb4c760ceeac767f5c5c971ef150610e6Form = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showb4c760ceeac767f5c5c971ef150610e6.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/activities/{activity}'
 */
        showb4c760ceeac767f5c5c971ef150610e6Form.get = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showb4c760ceeac767f5c5c971ef150610e6.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/activities/{activity}'
 */
        showb4c760ceeac767f5c5c971ef150610e6Form.head = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showb4c760ceeac767f5c5c971ef150610e6.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showb4c760ceeac767f5c5c971ef150610e6.form = showb4c760ceeac767f5c5c971ef150610e6Form
    /**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/admin/activities/{activity}'
 */
const showfce21df800562b30b839403e75586158 = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showfce21df800562b30b839403e75586158.url(args, options),
    method: 'get',
})

showfce21df800562b30b839403e75586158.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/activities/{activity}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/admin/activities/{activity}'
 */
showfce21df800562b30b839403e75586158.url = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { activity: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: typeof args.activity === 'object'
                ? args.activity.id
                : args.activity,
                }

    return showfce21df800562b30b839403e75586158.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/admin/activities/{activity}'
 */
showfce21df800562b30b839403e75586158.get = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showfce21df800562b30b839403e75586158.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/admin/activities/{activity}'
 */
showfce21df800562b30b839403e75586158.head = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showfce21df800562b30b839403e75586158.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/admin/activities/{activity}'
 */
    const showfce21df800562b30b839403e75586158Form = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showfce21df800562b30b839403e75586158.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/admin/activities/{activity}'
 */
        showfce21df800562b30b839403e75586158Form.get = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showfce21df800562b30b839403e75586158.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/admin/activities/{activity}'
 */
        showfce21df800562b30b839403e75586158Form.head = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showfce21df800562b30b839403e75586158.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showfce21df800562b30b839403e75586158.form = showfce21df800562b30b839403e75586158Form

export const show = {
    '/api/v1/activities/{activity}': showb4c760ceeac767f5c5c971ef150610e6,
    '/api/v1/admin/activities/{activity}': showfce21df800562b30b839403e75586158,
}

/**
* @see \App\Http\Controllers\Api\ActivityController::register
 * @see app/Http/Controllers/Api/ActivityController.php:296
 * @route '/api/v1/activities/{activity}/register'
 */
export const register = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(args, options),
    method: 'post',
})

register.definition = {
    methods: ["post"],
    url: '/api/v1/activities/{activity}/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ActivityController::register
 * @see app/Http/Controllers/Api/ActivityController.php:296
 * @route '/api/v1/activities/{activity}/register'
 */
register.url = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: args.activity,
                }

    return register.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityController::register
 * @see app/Http/Controllers/Api/ActivityController.php:296
 * @route '/api/v1/activities/{activity}/register'
 */
register.post = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ActivityController::register
 * @see app/Http/Controllers/Api/ActivityController.php:296
 * @route '/api/v1/activities/{activity}/register'
 */
    const registerForm = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: register.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityController::register
 * @see app/Http/Controllers/Api/ActivityController.php:296
 * @route '/api/v1/activities/{activity}/register'
 */
        registerForm.post = (args: { activity: string | number } | [activity: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: register.url(args, options),
            method: 'post',
        })
    
    register.form = registerForm
/**
* @see \App\Http\Controllers\Api\ActivityController::store
 * @see app/Http/Controllers/Api/ActivityController.php:52
 * @route '/api/v1/admin/activities'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/admin/activities',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ActivityController::store
 * @see app/Http/Controllers/Api/ActivityController.php:52
 * @route '/api/v1/admin/activities'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityController::store
 * @see app/Http/Controllers/Api/ActivityController.php:52
 * @route '/api/v1/admin/activities'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ActivityController::store
 * @see app/Http/Controllers/Api/ActivityController.php:52
 * @route '/api/v1/admin/activities'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityController::store
 * @see app/Http/Controllers/Api/ActivityController.php:52
 * @route '/api/v1/admin/activities'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\ActivityController::update
 * @see app/Http/Controllers/Api/ActivityController.php:96
 * @route '/api/v1/admin/activities/{activity}'
 */
export const update = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/admin/activities/{activity}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\ActivityController::update
 * @see app/Http/Controllers/Api/ActivityController.php:96
 * @route '/api/v1/admin/activities/{activity}'
 */
update.url = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { activity: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: typeof args.activity === 'object'
                ? args.activity.id
                : args.activity,
                }

    return update.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityController::update
 * @see app/Http/Controllers/Api/ActivityController.php:96
 * @route '/api/v1/admin/activities/{activity}'
 */
update.put = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\ActivityController::update
 * @see app/Http/Controllers/Api/ActivityController.php:96
 * @route '/api/v1/admin/activities/{activity}'
 */
update.patch = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\ActivityController::update
 * @see app/Http/Controllers/Api/ActivityController.php:96
 * @route '/api/v1/admin/activities/{activity}'
 */
    const updateForm = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityController::update
 * @see app/Http/Controllers/Api/ActivityController.php:96
 * @route '/api/v1/admin/activities/{activity}'
 */
        updateForm.put = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\ActivityController::update
 * @see app/Http/Controllers/Api/ActivityController.php:96
 * @route '/api/v1/admin/activities/{activity}'
 */
        updateForm.patch = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Api\ActivityController::destroy
 * @see app/Http/Controllers/Api/ActivityController.php:128
 * @route '/api/v1/admin/activities/{activity}'
 */
export const destroy = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/admin/activities/{activity}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\ActivityController::destroy
 * @see app/Http/Controllers/Api/ActivityController.php:128
 * @route '/api/v1/admin/activities/{activity}'
 */
destroy.url = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { activity: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: typeof args.activity === 'object'
                ? args.activity.id
                : args.activity,
                }

    return destroy.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityController::destroy
 * @see app/Http/Controllers/Api/ActivityController.php:128
 * @route '/api/v1/admin/activities/{activity}'
 */
destroy.delete = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\ActivityController::destroy
 * @see app/Http/Controllers/Api/ActivityController.php:128
 * @route '/api/v1/admin/activities/{activity}'
 */
    const destroyForm = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityController::destroy
 * @see app/Http/Controllers/Api/ActivityController.php:128
 * @route '/api/v1/admin/activities/{activity}'
 */
        destroyForm.delete = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Api\ActivityController::toggleStatus
 * @see app/Http/Controllers/Api/ActivityController.php:147
 * @route '/api/v1/admin/activities/{activity}/toggle-status'
 */
export const toggleStatus = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

toggleStatus.definition = {
    methods: ["patch"],
    url: '/api/v1/admin/activities/{activity}/toggle-status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\ActivityController::toggleStatus
 * @see app/Http/Controllers/Api/ActivityController.php:147
 * @route '/api/v1/admin/activities/{activity}/toggle-status'
 */
toggleStatus.url = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { activity: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: typeof args.activity === 'object'
                ? args.activity.id
                : args.activity,
                }

    return toggleStatus.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityController::toggleStatus
 * @see app/Http/Controllers/Api/ActivityController.php:147
 * @route '/api/v1/admin/activities/{activity}/toggle-status'
 */
toggleStatus.patch = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\ActivityController::toggleStatus
 * @see app/Http/Controllers/Api/ActivityController.php:147
 * @route '/api/v1/admin/activities/{activity}/toggle-status'
 */
    const toggleStatusForm = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityController::toggleStatus
 * @see app/Http/Controllers/Api/ActivityController.php:147
 * @route '/api/v1/admin/activities/{activity}/toggle-status'
 */
        toggleStatusForm.patch = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleStatus.form = toggleStatusForm
/**
* @see \App\Http\Controllers\Api\ActivityController::participants
 * @see app/Http/Controllers/Api/ActivityController.php:160
 * @route '/api/v1/admin/activities/{activity}/participants'
 */
export const participants = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: participants.url(args, options),
    method: 'get',
})

participants.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/activities/{activity}/participants',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ActivityController::participants
 * @see app/Http/Controllers/Api/ActivityController.php:160
 * @route '/api/v1/admin/activities/{activity}/participants'
 */
participants.url = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { activity: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: typeof args.activity === 'object'
                ? args.activity.id
                : args.activity,
                }

    return participants.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityController::participants
 * @see app/Http/Controllers/Api/ActivityController.php:160
 * @route '/api/v1/admin/activities/{activity}/participants'
 */
participants.get = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: participants.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ActivityController::participants
 * @see app/Http/Controllers/Api/ActivityController.php:160
 * @route '/api/v1/admin/activities/{activity}/participants'
 */
participants.head = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: participants.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ActivityController::participants
 * @see app/Http/Controllers/Api/ActivityController.php:160
 * @route '/api/v1/admin/activities/{activity}/participants'
 */
    const participantsForm = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: participants.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityController::participants
 * @see app/Http/Controllers/Api/ActivityController.php:160
 * @route '/api/v1/admin/activities/{activity}/participants'
 */
        participantsForm.get = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: participants.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ActivityController::participants
 * @see app/Http/Controllers/Api/ActivityController.php:160
 * @route '/api/v1/admin/activities/{activity}/participants'
 */
        participantsForm.head = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: participants.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    participants.form = participantsForm
/**
* @see \App\Http\Controllers\Api\ActivityController::approveParticipant
 * @see app/Http/Controllers/Api/ActivityController.php:179
 * @route '/api/v1/admin/activities/{activity}/participants/{participant}/approve'
 */
export const approveParticipant = (args: { activity: string | number | { id: string | number }, participant: string | number | { id: string | number } } | [activity: string | number | { id: string | number }, participant: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approveParticipant.url(args, options),
    method: 'patch',
})

approveParticipant.definition = {
    methods: ["patch"],
    url: '/api/v1/admin/activities/{activity}/participants/{participant}/approve',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\ActivityController::approveParticipant
 * @see app/Http/Controllers/Api/ActivityController.php:179
 * @route '/api/v1/admin/activities/{activity}/participants/{participant}/approve'
 */
approveParticipant.url = (args: { activity: string | number | { id: string | number }, participant: string | number | { id: string | number } } | [activity: string | number | { id: string | number }, participant: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                    participant: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: typeof args.activity === 'object'
                ? args.activity.id
                : args.activity,
                                participant: typeof args.participant === 'object'
                ? args.participant.id
                : args.participant,
                }

    return approveParticipant.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace('{participant}', parsedArgs.participant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityController::approveParticipant
 * @see app/Http/Controllers/Api/ActivityController.php:179
 * @route '/api/v1/admin/activities/{activity}/participants/{participant}/approve'
 */
approveParticipant.patch = (args: { activity: string | number | { id: string | number }, participant: string | number | { id: string | number } } | [activity: string | number | { id: string | number }, participant: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approveParticipant.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\ActivityController::approveParticipant
 * @see app/Http/Controllers/Api/ActivityController.php:179
 * @route '/api/v1/admin/activities/{activity}/participants/{participant}/approve'
 */
    const approveParticipantForm = (args: { activity: string | number | { id: string | number }, participant: string | number | { id: string | number } } | [activity: string | number | { id: string | number }, participant: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approveParticipant.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityController::approveParticipant
 * @see app/Http/Controllers/Api/ActivityController.php:179
 * @route '/api/v1/admin/activities/{activity}/participants/{participant}/approve'
 */
        approveParticipantForm.patch = (args: { activity: string | number | { id: string | number }, participant: string | number | { id: string | number } } | [activity: string | number | { id: string | number }, participant: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approveParticipant.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    approveParticipant.form = approveParticipantForm
/**
* @see \App\Http\Controllers\Api\ActivityController::rejectParticipant
 * @see app/Http/Controllers/Api/ActivityController.php:208
 * @route '/api/v1/admin/activities/{activity}/participants/{participant}/reject'
 */
export const rejectParticipant = (args: { activity: string | number | { id: string | number }, participant: string | number | { id: string | number } } | [activity: string | number | { id: string | number }, participant: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: rejectParticipant.url(args, options),
    method: 'patch',
})

rejectParticipant.definition = {
    methods: ["patch"],
    url: '/api/v1/admin/activities/{activity}/participants/{participant}/reject',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\ActivityController::rejectParticipant
 * @see app/Http/Controllers/Api/ActivityController.php:208
 * @route '/api/v1/admin/activities/{activity}/participants/{participant}/reject'
 */
rejectParticipant.url = (args: { activity: string | number | { id: string | number }, participant: string | number | { id: string | number } } | [activity: string | number | { id: string | number }, participant: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    activity: args[0],
                    participant: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity: typeof args.activity === 'object'
                ? args.activity.id
                : args.activity,
                                participant: typeof args.participant === 'object'
                ? args.participant.id
                : args.participant,
                }

    return rejectParticipant.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace('{participant}', parsedArgs.participant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityController::rejectParticipant
 * @see app/Http/Controllers/Api/ActivityController.php:208
 * @route '/api/v1/admin/activities/{activity}/participants/{participant}/reject'
 */
rejectParticipant.patch = (args: { activity: string | number | { id: string | number }, participant: string | number | { id: string | number } } | [activity: string | number | { id: string | number }, participant: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: rejectParticipant.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\ActivityController::rejectParticipant
 * @see app/Http/Controllers/Api/ActivityController.php:208
 * @route '/api/v1/admin/activities/{activity}/participants/{participant}/reject'
 */
    const rejectParticipantForm = (args: { activity: string | number | { id: string | number }, participant: string | number | { id: string | number } } | [activity: string | number | { id: string | number }, participant: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: rejectParticipant.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityController::rejectParticipant
 * @see app/Http/Controllers/Api/ActivityController.php:208
 * @route '/api/v1/admin/activities/{activity}/participants/{participant}/reject'
 */
        rejectParticipantForm.patch = (args: { activity: string | number | { id: string | number }, participant: string | number | { id: string | number } } | [activity: string | number | { id: string | number }, participant: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: rejectParticipant.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    rejectParticipant.form = rejectParticipantForm
/**
* @see \App\Http\Controllers\Api\ActivityController::report
 * @see app/Http/Controllers/Api/ActivityController.php:233
 * @route '/api/v1/admin/reports/activities'
 */
export const report = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: report.url(options),
    method: 'get',
})

report.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/reports/activities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ActivityController::report
 * @see app/Http/Controllers/Api/ActivityController.php:233
 * @route '/api/v1/admin/reports/activities'
 */
report.url = (options?: RouteQueryOptions) => {
    return report.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityController::report
 * @see app/Http/Controllers/Api/ActivityController.php:233
 * @route '/api/v1/admin/reports/activities'
 */
report.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: report.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ActivityController::report
 * @see app/Http/Controllers/Api/ActivityController.php:233
 * @route '/api/v1/admin/reports/activities'
 */
report.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: report.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ActivityController::report
 * @see app/Http/Controllers/Api/ActivityController.php:233
 * @route '/api/v1/admin/reports/activities'
 */
    const reportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: report.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityController::report
 * @see app/Http/Controllers/Api/ActivityController.php:233
 * @route '/api/v1/admin/reports/activities'
 */
        reportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: report.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ActivityController::report
 * @see app/Http/Controllers/Api/ActivityController.php:233
 * @route '/api/v1/admin/reports/activities'
 */
        reportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: report.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    report.form = reportForm
const ActivityController = { index, show, register, store, update, destroy, toggleStatus, participants, approveParticipant, rejectParticipant, report }

export default ActivityController