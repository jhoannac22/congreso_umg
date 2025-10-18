import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/admin/activities'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/activities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/admin/activities'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/admin/activities'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/admin/activities'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/admin/activities'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/admin/activities'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ActivityController::index
 * @see app/Http/Controllers/Api/ActivityController.php:16
 * @route '/api/v1/admin/activities'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
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
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/admin/activities/{activity}'
 */
export const show = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/activities/{activity}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/admin/activities/{activity}'
 */
show.url = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/admin/activities/{activity}'
 */
show.get = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/admin/activities/{activity}'
 */
show.head = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/admin/activities/{activity}'
 */
    const showForm = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/admin/activities/{activity}'
 */
        showForm.get = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ActivityController::show
 * @see app/Http/Controllers/Api/ActivityController.php:83
 * @route '/api/v1/admin/activities/{activity}'
 */
        showForm.head = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
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