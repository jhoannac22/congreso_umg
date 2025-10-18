import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Api\DiplomaController::index
 * @see app/Http/Controllers/Api/DiplomaController.php:23
 * @route '/api/v1/diplomas'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/diplomas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\DiplomaController::index
 * @see app/Http/Controllers/Api/DiplomaController.php:23
 * @route '/api/v1/diplomas'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DiplomaController::index
 * @see app/Http/Controllers/Api/DiplomaController.php:23
 * @route '/api/v1/diplomas'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\DiplomaController::index
 * @see app/Http/Controllers/Api/DiplomaController.php:23
 * @route '/api/v1/diplomas'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\DiplomaController::index
 * @see app/Http/Controllers/Api/DiplomaController.php:23
 * @route '/api/v1/diplomas'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\DiplomaController::index
 * @see app/Http/Controllers/Api/DiplomaController.php:23
 * @route '/api/v1/diplomas'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\DiplomaController::index
 * @see app/Http/Controllers/Api/DiplomaController.php:23
 * @route '/api/v1/diplomas'
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
* @see \App\Http\Controllers\Api\DiplomaController::store
 * @see app/Http/Controllers/Api/DiplomaController.php:70
 * @route '/api/v1/diplomas'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/diplomas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\DiplomaController::store
 * @see app/Http/Controllers/Api/DiplomaController.php:70
 * @route '/api/v1/diplomas'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DiplomaController::store
 * @see app/Http/Controllers/Api/DiplomaController.php:70
 * @route '/api/v1/diplomas'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\DiplomaController::store
 * @see app/Http/Controllers/Api/DiplomaController.php:70
 * @route '/api/v1/diplomas'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\DiplomaController::store
 * @see app/Http/Controllers/Api/DiplomaController.php:70
 * @route '/api/v1/diplomas'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\DiplomaController::show
 * @see app/Http/Controllers/Api/DiplomaController.php:116
 * @route '/api/v1/diplomas/{diploma}'
 */
export const show = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/diplomas/{diploma}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\DiplomaController::show
 * @see app/Http/Controllers/Api/DiplomaController.php:116
 * @route '/api/v1/diplomas/{diploma}'
 */
show.url = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { diploma: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { diploma: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    diploma: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        diploma: typeof args.diploma === 'object'
                ? args.diploma.id
                : args.diploma,
                }

    return show.definition.url
            .replace('{diploma}', parsedArgs.diploma.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DiplomaController::show
 * @see app/Http/Controllers/Api/DiplomaController.php:116
 * @route '/api/v1/diplomas/{diploma}'
 */
show.get = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\DiplomaController::show
 * @see app/Http/Controllers/Api/DiplomaController.php:116
 * @route '/api/v1/diplomas/{diploma}'
 */
show.head = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\DiplomaController::show
 * @see app/Http/Controllers/Api/DiplomaController.php:116
 * @route '/api/v1/diplomas/{diploma}'
 */
    const showForm = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\DiplomaController::show
 * @see app/Http/Controllers/Api/DiplomaController.php:116
 * @route '/api/v1/diplomas/{diploma}'
 */
        showForm.get = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\DiplomaController::show
 * @see app/Http/Controllers/Api/DiplomaController.php:116
 * @route '/api/v1/diplomas/{diploma}'
 */
        showForm.head = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\DiplomaController::update
 * @see app/Http/Controllers/Api/DiplomaController.php:129
 * @route '/api/v1/diplomas/{diploma}'
 */
export const update = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/diplomas/{diploma}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\DiplomaController::update
 * @see app/Http/Controllers/Api/DiplomaController.php:129
 * @route '/api/v1/diplomas/{diploma}'
 */
update.url = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { diploma: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { diploma: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    diploma: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        diploma: typeof args.diploma === 'object'
                ? args.diploma.id
                : args.diploma,
                }

    return update.definition.url
            .replace('{diploma}', parsedArgs.diploma.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DiplomaController::update
 * @see app/Http/Controllers/Api/DiplomaController.php:129
 * @route '/api/v1/diplomas/{diploma}'
 */
update.put = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\DiplomaController::update
 * @see app/Http/Controllers/Api/DiplomaController.php:129
 * @route '/api/v1/diplomas/{diploma}'
 */
update.patch = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\DiplomaController::update
 * @see app/Http/Controllers/Api/DiplomaController.php:129
 * @route '/api/v1/diplomas/{diploma}'
 */
    const updateForm = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\DiplomaController::update
 * @see app/Http/Controllers/Api/DiplomaController.php:129
 * @route '/api/v1/diplomas/{diploma}'
 */
        updateForm.put = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\DiplomaController::update
 * @see app/Http/Controllers/Api/DiplomaController.php:129
 * @route '/api/v1/diplomas/{diploma}'
 */
        updateForm.patch = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\DiplomaController::destroy
 * @see app/Http/Controllers/Api/DiplomaController.php:154
 * @route '/api/v1/diplomas/{diploma}'
 */
export const destroy = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/diplomas/{diploma}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\DiplomaController::destroy
 * @see app/Http/Controllers/Api/DiplomaController.php:154
 * @route '/api/v1/diplomas/{diploma}'
 */
destroy.url = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { diploma: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { diploma: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    diploma: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        diploma: typeof args.diploma === 'object'
                ? args.diploma.id
                : args.diploma,
                }

    return destroy.definition.url
            .replace('{diploma}', parsedArgs.diploma.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DiplomaController::destroy
 * @see app/Http/Controllers/Api/DiplomaController.php:154
 * @route '/api/v1/diplomas/{diploma}'
 */
destroy.delete = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\DiplomaController::destroy
 * @see app/Http/Controllers/Api/DiplomaController.php:154
 * @route '/api/v1/diplomas/{diploma}'
 */
    const destroyForm = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\DiplomaController::destroy
 * @see app/Http/Controllers/Api/DiplomaController.php:154
 * @route '/api/v1/diplomas/{diploma}'
 */
        destroyForm.delete = (args: { diploma: string | number | { id: string | number } } | [diploma: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const diplomas = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default diplomas