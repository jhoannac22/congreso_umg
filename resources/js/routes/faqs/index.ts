import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/admin/faqs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/faqs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/admin/faqs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/admin/faqs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/admin/faqs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/admin/faqs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/admin/faqs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/admin/faqs'
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
* @see \App\Http\Controllers\Api\FaqController::store
 * @see app/Http/Controllers/Api/FaqController.php:51
 * @route '/api/v1/admin/faqs'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/admin/faqs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\FaqController::store
 * @see app/Http/Controllers/Api/FaqController.php:51
 * @route '/api/v1/admin/faqs'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FaqController::store
 * @see app/Http/Controllers/Api/FaqController.php:51
 * @route '/api/v1/admin/faqs'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\FaqController::store
 * @see app/Http/Controllers/Api/FaqController.php:51
 * @route '/api/v1/admin/faqs'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\FaqController::store
 * @see app/Http/Controllers/Api/FaqController.php:51
 * @route '/api/v1/admin/faqs'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/admin/faqs/{faq}'
 */
export const show = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/faqs/{faq}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/admin/faqs/{faq}'
 */
show.url = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { faq: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { faq: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    faq: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        faq: typeof args.faq === 'object'
                ? args.faq.id
                : args.faq,
                }

    return show.definition.url
            .replace('{faq}', parsedArgs.faq.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/admin/faqs/{faq}'
 */
show.get = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/admin/faqs/{faq}'
 */
show.head = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/admin/faqs/{faq}'
 */
    const showForm = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/admin/faqs/{faq}'
 */
        showForm.get = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/admin/faqs/{faq}'
 */
        showForm.head = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\FaqController::update
 * @see app/Http/Controllers/Api/FaqController.php:89
 * @route '/api/v1/admin/faqs/{faq}'
 */
export const update = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/admin/faqs/{faq}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\FaqController::update
 * @see app/Http/Controllers/Api/FaqController.php:89
 * @route '/api/v1/admin/faqs/{faq}'
 */
update.url = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { faq: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { faq: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    faq: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        faq: typeof args.faq === 'object'
                ? args.faq.id
                : args.faq,
                }

    return update.definition.url
            .replace('{faq}', parsedArgs.faq.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FaqController::update
 * @see app/Http/Controllers/Api/FaqController.php:89
 * @route '/api/v1/admin/faqs/{faq}'
 */
update.put = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\FaqController::update
 * @see app/Http/Controllers/Api/FaqController.php:89
 * @route '/api/v1/admin/faqs/{faq}'
 */
update.patch = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\FaqController::update
 * @see app/Http/Controllers/Api/FaqController.php:89
 * @route '/api/v1/admin/faqs/{faq}'
 */
    const updateForm = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\FaqController::update
 * @see app/Http/Controllers/Api/FaqController.php:89
 * @route '/api/v1/admin/faqs/{faq}'
 */
        updateForm.put = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\FaqController::update
 * @see app/Http/Controllers/Api/FaqController.php:89
 * @route '/api/v1/admin/faqs/{faq}'
 */
        updateForm.patch = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\FaqController::destroy
 * @see app/Http/Controllers/Api/FaqController.php:112
 * @route '/api/v1/admin/faqs/{faq}'
 */
export const destroy = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/admin/faqs/{faq}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\FaqController::destroy
 * @see app/Http/Controllers/Api/FaqController.php:112
 * @route '/api/v1/admin/faqs/{faq}'
 */
destroy.url = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { faq: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { faq: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    faq: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        faq: typeof args.faq === 'object'
                ? args.faq.id
                : args.faq,
                }

    return destroy.definition.url
            .replace('{faq}', parsedArgs.faq.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FaqController::destroy
 * @see app/Http/Controllers/Api/FaqController.php:112
 * @route '/api/v1/admin/faqs/{faq}'
 */
destroy.delete = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\FaqController::destroy
 * @see app/Http/Controllers/Api/FaqController.php:112
 * @route '/api/v1/admin/faqs/{faq}'
 */
    const destroyForm = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\FaqController::destroy
 * @see app/Http/Controllers/Api/FaqController.php:112
 * @route '/api/v1/admin/faqs/{faq}'
 */
        destroyForm.delete = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const faqs = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default faqs