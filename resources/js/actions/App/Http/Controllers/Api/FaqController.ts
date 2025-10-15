import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/faqs'
 */
const indexa21ea82b828a67bd66bff0afc1824062 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa21ea82b828a67bd66bff0afc1824062.url(options),
    method: 'get',
})

indexa21ea82b828a67bd66bff0afc1824062.definition = {
    methods: ["get","head"],
    url: '/api/v1/faqs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/faqs'
 */
indexa21ea82b828a67bd66bff0afc1824062.url = (options?: RouteQueryOptions) => {
    return indexa21ea82b828a67bd66bff0afc1824062.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/faqs'
 */
indexa21ea82b828a67bd66bff0afc1824062.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa21ea82b828a67bd66bff0afc1824062.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/faqs'
 */
indexa21ea82b828a67bd66bff0afc1824062.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexa21ea82b828a67bd66bff0afc1824062.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/faqs'
 */
    const indexa21ea82b828a67bd66bff0afc1824062Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexa21ea82b828a67bd66bff0afc1824062.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/faqs'
 */
        indexa21ea82b828a67bd66bff0afc1824062Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexa21ea82b828a67bd66bff0afc1824062.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/faqs'
 */
        indexa21ea82b828a67bd66bff0afc1824062Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexa21ea82b828a67bd66bff0afc1824062.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexa21ea82b828a67bd66bff0afc1824062.form = indexa21ea82b828a67bd66bff0afc1824062Form
    /**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/admin/faqs'
 */
const index3cb0a6abaff1a5788cfd31e8fc065cb1 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index3cb0a6abaff1a5788cfd31e8fc065cb1.url(options),
    method: 'get',
})

index3cb0a6abaff1a5788cfd31e8fc065cb1.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/faqs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/admin/faqs'
 */
index3cb0a6abaff1a5788cfd31e8fc065cb1.url = (options?: RouteQueryOptions) => {
    return index3cb0a6abaff1a5788cfd31e8fc065cb1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/admin/faqs'
 */
index3cb0a6abaff1a5788cfd31e8fc065cb1.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index3cb0a6abaff1a5788cfd31e8fc065cb1.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/admin/faqs'
 */
index3cb0a6abaff1a5788cfd31e8fc065cb1.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index3cb0a6abaff1a5788cfd31e8fc065cb1.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/admin/faqs'
 */
    const index3cb0a6abaff1a5788cfd31e8fc065cb1Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index3cb0a6abaff1a5788cfd31e8fc065cb1.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/admin/faqs'
 */
        index3cb0a6abaff1a5788cfd31e8fc065cb1Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index3cb0a6abaff1a5788cfd31e8fc065cb1.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\FaqController::index
 * @see app/Http/Controllers/Api/FaqController.php:15
 * @route '/api/v1/admin/faqs'
 */
        index3cb0a6abaff1a5788cfd31e8fc065cb1Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index3cb0a6abaff1a5788cfd31e8fc065cb1.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index3cb0a6abaff1a5788cfd31e8fc065cb1.form = index3cb0a6abaff1a5788cfd31e8fc065cb1Form

export const index = {
    '/api/v1/faqs': indexa21ea82b828a67bd66bff0afc1824062,
    '/api/v1/admin/faqs': index3cb0a6abaff1a5788cfd31e8fc065cb1,
}

/**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/faqs/{faq}'
 */
const show378a1e538ff45eee80e2435f0bba8a35 = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show378a1e538ff45eee80e2435f0bba8a35.url(args, options),
    method: 'get',
})

show378a1e538ff45eee80e2435f0bba8a35.definition = {
    methods: ["get","head"],
    url: '/api/v1/faqs/{faq}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/faqs/{faq}'
 */
show378a1e538ff45eee80e2435f0bba8a35.url = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show378a1e538ff45eee80e2435f0bba8a35.definition.url
            .replace('{faq}', parsedArgs.faq.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/faqs/{faq}'
 */
show378a1e538ff45eee80e2435f0bba8a35.get = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show378a1e538ff45eee80e2435f0bba8a35.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/faqs/{faq}'
 */
show378a1e538ff45eee80e2435f0bba8a35.head = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show378a1e538ff45eee80e2435f0bba8a35.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/faqs/{faq}'
 */
    const show378a1e538ff45eee80e2435f0bba8a35Form = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show378a1e538ff45eee80e2435f0bba8a35.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/faqs/{faq}'
 */
        show378a1e538ff45eee80e2435f0bba8a35Form.get = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show378a1e538ff45eee80e2435f0bba8a35.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/faqs/{faq}'
 */
        show378a1e538ff45eee80e2435f0bba8a35Form.head = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show378a1e538ff45eee80e2435f0bba8a35.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show378a1e538ff45eee80e2435f0bba8a35.form = show378a1e538ff45eee80e2435f0bba8a35Form
    /**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/admin/faqs/{faq}'
 */
const show959f93f0f1f01e2759f8fe9ffbbe2fa4 = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show959f93f0f1f01e2759f8fe9ffbbe2fa4.url(args, options),
    method: 'get',
})

show959f93f0f1f01e2759f8fe9ffbbe2fa4.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/faqs/{faq}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/admin/faqs/{faq}'
 */
show959f93f0f1f01e2759f8fe9ffbbe2fa4.url = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show959f93f0f1f01e2759f8fe9ffbbe2fa4.definition.url
            .replace('{faq}', parsedArgs.faq.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/admin/faqs/{faq}'
 */
show959f93f0f1f01e2759f8fe9ffbbe2fa4.get = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show959f93f0f1f01e2759f8fe9ffbbe2fa4.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/admin/faqs/{faq}'
 */
show959f93f0f1f01e2759f8fe9ffbbe2fa4.head = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show959f93f0f1f01e2759f8fe9ffbbe2fa4.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/admin/faqs/{faq}'
 */
    const show959f93f0f1f01e2759f8fe9ffbbe2fa4Form = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show959f93f0f1f01e2759f8fe9ffbbe2fa4.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/admin/faqs/{faq}'
 */
        show959f93f0f1f01e2759f8fe9ffbbe2fa4Form.get = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show959f93f0f1f01e2759f8fe9ffbbe2fa4.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\FaqController::show
 * @see app/Http/Controllers/Api/FaqController.php:78
 * @route '/api/v1/admin/faqs/{faq}'
 */
        show959f93f0f1f01e2759f8fe9ffbbe2fa4Form.head = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show959f93f0f1f01e2759f8fe9ffbbe2fa4.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show959f93f0f1f01e2759f8fe9ffbbe2fa4.form = show959f93f0f1f01e2759f8fe9ffbbe2fa4Form

export const show = {
    '/api/v1/faqs/{faq}': show378a1e538ff45eee80e2435f0bba8a35,
    '/api/v1/admin/faqs/{faq}': show959f93f0f1f01e2759f8fe9ffbbe2fa4,
}

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
/**
* @see \App\Http\Controllers\Api\FaqController::toggleStatus
 * @see app/Http/Controllers/Api/FaqController.php:124
 * @route '/api/v1/admin/faqs/{faq}/toggle-status'
 */
export const toggleStatus = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

toggleStatus.definition = {
    methods: ["patch"],
    url: '/api/v1/admin/faqs/{faq}/toggle-status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\FaqController::toggleStatus
 * @see app/Http/Controllers/Api/FaqController.php:124
 * @route '/api/v1/admin/faqs/{faq}/toggle-status'
 */
toggleStatus.url = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return toggleStatus.definition.url
            .replace('{faq}', parsedArgs.faq.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FaqController::toggleStatus
 * @see app/Http/Controllers/Api/FaqController.php:124
 * @route '/api/v1/admin/faqs/{faq}/toggle-status'
 */
toggleStatus.patch = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\FaqController::toggleStatus
 * @see app/Http/Controllers/Api/FaqController.php:124
 * @route '/api/v1/admin/faqs/{faq}/toggle-status'
 */
    const toggleStatusForm = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\FaqController::toggleStatus
 * @see app/Http/Controllers/Api/FaqController.php:124
 * @route '/api/v1/admin/faqs/{faq}/toggle-status'
 */
        toggleStatusForm.patch = (args: { faq: number | { id: number } } | [faq: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleStatus.form = toggleStatusForm
const FaqController = { index, show, store, update, destroy, toggleStatus }

export default FaqController