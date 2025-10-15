import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\CategoryController::index
 * @see app/Http/Controllers/Api/CategoryController.php:16
 * @route '/api/v1/categories'
 */
const indexae6261c1e7a5496a97e0f1b92f04cf12 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexae6261c1e7a5496a97e0f1b92f04cf12.url(options),
    method: 'get',
})

indexae6261c1e7a5496a97e0f1b92f04cf12.definition = {
    methods: ["get","head"],
    url: '/api/v1/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\CategoryController::index
 * @see app/Http/Controllers/Api/CategoryController.php:16
 * @route '/api/v1/categories'
 */
indexae6261c1e7a5496a97e0f1b92f04cf12.url = (options?: RouteQueryOptions) => {
    return indexae6261c1e7a5496a97e0f1b92f04cf12.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CategoryController::index
 * @see app/Http/Controllers/Api/CategoryController.php:16
 * @route '/api/v1/categories'
 */
indexae6261c1e7a5496a97e0f1b92f04cf12.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexae6261c1e7a5496a97e0f1b92f04cf12.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\CategoryController::index
 * @see app/Http/Controllers/Api/CategoryController.php:16
 * @route '/api/v1/categories'
 */
indexae6261c1e7a5496a97e0f1b92f04cf12.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexae6261c1e7a5496a97e0f1b92f04cf12.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\CategoryController::index
 * @see app/Http/Controllers/Api/CategoryController.php:16
 * @route '/api/v1/categories'
 */
    const indexae6261c1e7a5496a97e0f1b92f04cf12Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexae6261c1e7a5496a97e0f1b92f04cf12.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\CategoryController::index
 * @see app/Http/Controllers/Api/CategoryController.php:16
 * @route '/api/v1/categories'
 */
        indexae6261c1e7a5496a97e0f1b92f04cf12Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexae6261c1e7a5496a97e0f1b92f04cf12.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\CategoryController::index
 * @see app/Http/Controllers/Api/CategoryController.php:16
 * @route '/api/v1/categories'
 */
        indexae6261c1e7a5496a97e0f1b92f04cf12Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexae6261c1e7a5496a97e0f1b92f04cf12.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexae6261c1e7a5496a97e0f1b92f04cf12.form = indexae6261c1e7a5496a97e0f1b92f04cf12Form
    /**
* @see \App\Http\Controllers\Api\CategoryController::index
 * @see app/Http/Controllers/Api/CategoryController.php:16
 * @route '/api/v1/admin/categories'
 */
const index3221948b6c2bf03e91db89502c5cf79f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index3221948b6c2bf03e91db89502c5cf79f.url(options),
    method: 'get',
})

index3221948b6c2bf03e91db89502c5cf79f.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\CategoryController::index
 * @see app/Http/Controllers/Api/CategoryController.php:16
 * @route '/api/v1/admin/categories'
 */
index3221948b6c2bf03e91db89502c5cf79f.url = (options?: RouteQueryOptions) => {
    return index3221948b6c2bf03e91db89502c5cf79f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CategoryController::index
 * @see app/Http/Controllers/Api/CategoryController.php:16
 * @route '/api/v1/admin/categories'
 */
index3221948b6c2bf03e91db89502c5cf79f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index3221948b6c2bf03e91db89502c5cf79f.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\CategoryController::index
 * @see app/Http/Controllers/Api/CategoryController.php:16
 * @route '/api/v1/admin/categories'
 */
index3221948b6c2bf03e91db89502c5cf79f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index3221948b6c2bf03e91db89502c5cf79f.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\CategoryController::index
 * @see app/Http/Controllers/Api/CategoryController.php:16
 * @route '/api/v1/admin/categories'
 */
    const index3221948b6c2bf03e91db89502c5cf79fForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index3221948b6c2bf03e91db89502c5cf79f.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\CategoryController::index
 * @see app/Http/Controllers/Api/CategoryController.php:16
 * @route '/api/v1/admin/categories'
 */
        index3221948b6c2bf03e91db89502c5cf79fForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index3221948b6c2bf03e91db89502c5cf79f.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\CategoryController::index
 * @see app/Http/Controllers/Api/CategoryController.php:16
 * @route '/api/v1/admin/categories'
 */
        index3221948b6c2bf03e91db89502c5cf79fForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index3221948b6c2bf03e91db89502c5cf79f.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index3221948b6c2bf03e91db89502c5cf79f.form = index3221948b6c2bf03e91db89502c5cf79fForm

export const index = {
    '/api/v1/categories': indexae6261c1e7a5496a97e0f1b92f04cf12,
    '/api/v1/admin/categories': index3221948b6c2bf03e91db89502c5cf79f,
}

/**
* @see \App\Http\Controllers\Api\CategoryController::show
 * @see app/Http/Controllers/Api/CategoryController.php:52
 * @route '/api/v1/categories/{category}'
 */
const show56269d5a8b54256c47036b8db0f372b1 = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show56269d5a8b54256c47036b8db0f372b1.url(args, options),
    method: 'get',
})

show56269d5a8b54256c47036b8db0f372b1.definition = {
    methods: ["get","head"],
    url: '/api/v1/categories/{category}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\CategoryController::show
 * @see app/Http/Controllers/Api/CategoryController.php:52
 * @route '/api/v1/categories/{category}'
 */
show56269d5a8b54256c47036b8db0f372b1.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return show56269d5a8b54256c47036b8db0f372b1.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CategoryController::show
 * @see app/Http/Controllers/Api/CategoryController.php:52
 * @route '/api/v1/categories/{category}'
 */
show56269d5a8b54256c47036b8db0f372b1.get = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show56269d5a8b54256c47036b8db0f372b1.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\CategoryController::show
 * @see app/Http/Controllers/Api/CategoryController.php:52
 * @route '/api/v1/categories/{category}'
 */
show56269d5a8b54256c47036b8db0f372b1.head = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show56269d5a8b54256c47036b8db0f372b1.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\CategoryController::show
 * @see app/Http/Controllers/Api/CategoryController.php:52
 * @route '/api/v1/categories/{category}'
 */
    const show56269d5a8b54256c47036b8db0f372b1Form = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show56269d5a8b54256c47036b8db0f372b1.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\CategoryController::show
 * @see app/Http/Controllers/Api/CategoryController.php:52
 * @route '/api/v1/categories/{category}'
 */
        show56269d5a8b54256c47036b8db0f372b1Form.get = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show56269d5a8b54256c47036b8db0f372b1.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\CategoryController::show
 * @see app/Http/Controllers/Api/CategoryController.php:52
 * @route '/api/v1/categories/{category}'
 */
        show56269d5a8b54256c47036b8db0f372b1Form.head = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show56269d5a8b54256c47036b8db0f372b1.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show56269d5a8b54256c47036b8db0f372b1.form = show56269d5a8b54256c47036b8db0f372b1Form
    /**
* @see \App\Http\Controllers\Api\CategoryController::show
 * @see app/Http/Controllers/Api/CategoryController.php:52
 * @route '/api/v1/admin/categories/{category}'
 */
const show46ee27a744eb01dbdfc633660107f824 = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show46ee27a744eb01dbdfc633660107f824.url(args, options),
    method: 'get',
})

show46ee27a744eb01dbdfc633660107f824.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/categories/{category}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\CategoryController::show
 * @see app/Http/Controllers/Api/CategoryController.php:52
 * @route '/api/v1/admin/categories/{category}'
 */
show46ee27a744eb01dbdfc633660107f824.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return show46ee27a744eb01dbdfc633660107f824.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CategoryController::show
 * @see app/Http/Controllers/Api/CategoryController.php:52
 * @route '/api/v1/admin/categories/{category}'
 */
show46ee27a744eb01dbdfc633660107f824.get = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show46ee27a744eb01dbdfc633660107f824.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\CategoryController::show
 * @see app/Http/Controllers/Api/CategoryController.php:52
 * @route '/api/v1/admin/categories/{category}'
 */
show46ee27a744eb01dbdfc633660107f824.head = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show46ee27a744eb01dbdfc633660107f824.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\CategoryController::show
 * @see app/Http/Controllers/Api/CategoryController.php:52
 * @route '/api/v1/admin/categories/{category}'
 */
    const show46ee27a744eb01dbdfc633660107f824Form = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show46ee27a744eb01dbdfc633660107f824.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\CategoryController::show
 * @see app/Http/Controllers/Api/CategoryController.php:52
 * @route '/api/v1/admin/categories/{category}'
 */
        show46ee27a744eb01dbdfc633660107f824Form.get = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show46ee27a744eb01dbdfc633660107f824.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\CategoryController::show
 * @see app/Http/Controllers/Api/CategoryController.php:52
 * @route '/api/v1/admin/categories/{category}'
 */
        show46ee27a744eb01dbdfc633660107f824Form.head = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show46ee27a744eb01dbdfc633660107f824.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show46ee27a744eb01dbdfc633660107f824.form = show46ee27a744eb01dbdfc633660107f824Form

export const show = {
    '/api/v1/categories/{category}': show56269d5a8b54256c47036b8db0f372b1,
    '/api/v1/admin/categories/{category}': show46ee27a744eb01dbdfc633660107f824,
}

/**
* @see \App\Http\Controllers\Api\CategoryController::store
 * @see app/Http/Controllers/Api/CategoryController.php:39
 * @route '/api/v1/admin/categories'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/admin/categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\CategoryController::store
 * @see app/Http/Controllers/Api/CategoryController.php:39
 * @route '/api/v1/admin/categories'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CategoryController::store
 * @see app/Http/Controllers/Api/CategoryController.php:39
 * @route '/api/v1/admin/categories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\CategoryController::store
 * @see app/Http/Controllers/Api/CategoryController.php:39
 * @route '/api/v1/admin/categories'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\CategoryController::store
 * @see app/Http/Controllers/Api/CategoryController.php:39
 * @route '/api/v1/admin/categories'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\CategoryController::update
 * @see app/Http/Controllers/Api/CategoryController.php:65
 * @route '/api/v1/admin/categories/{category}'
 */
export const update = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/admin/categories/{category}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\CategoryController::update
 * @see app/Http/Controllers/Api/CategoryController.php:65
 * @route '/api/v1/admin/categories/{category}'
 */
update.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return update.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CategoryController::update
 * @see app/Http/Controllers/Api/CategoryController.php:65
 * @route '/api/v1/admin/categories/{category}'
 */
update.put = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\CategoryController::update
 * @see app/Http/Controllers/Api/CategoryController.php:65
 * @route '/api/v1/admin/categories/{category}'
 */
update.patch = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\CategoryController::update
 * @see app/Http/Controllers/Api/CategoryController.php:65
 * @route '/api/v1/admin/categories/{category}'
 */
    const updateForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\CategoryController::update
 * @see app/Http/Controllers/Api/CategoryController.php:65
 * @route '/api/v1/admin/categories/{category}'
 */
        updateForm.put = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\CategoryController::update
 * @see app/Http/Controllers/Api/CategoryController.php:65
 * @route '/api/v1/admin/categories/{category}'
 */
        updateForm.patch = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\CategoryController::destroy
 * @see app/Http/Controllers/Api/CategoryController.php:78
 * @route '/api/v1/admin/categories/{category}'
 */
export const destroy = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/admin/categories/{category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\CategoryController::destroy
 * @see app/Http/Controllers/Api/CategoryController.php:78
 * @route '/api/v1/admin/categories/{category}'
 */
destroy.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return destroy.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CategoryController::destroy
 * @see app/Http/Controllers/Api/CategoryController.php:78
 * @route '/api/v1/admin/categories/{category}'
 */
destroy.delete = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\CategoryController::destroy
 * @see app/Http/Controllers/Api/CategoryController.php:78
 * @route '/api/v1/admin/categories/{category}'
 */
    const destroyForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\CategoryController::destroy
 * @see app/Http/Controllers/Api/CategoryController.php:78
 * @route '/api/v1/admin/categories/{category}'
 */
        destroyForm.delete = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\CategoryController::toggleStatus
 * @see app/Http/Controllers/Api/CategoryController.php:97
 * @route '/api/v1/admin/categories/{category}/toggle-status'
 */
export const toggleStatus = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

toggleStatus.definition = {
    methods: ["patch"],
    url: '/api/v1/admin/categories/{category}/toggle-status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\CategoryController::toggleStatus
 * @see app/Http/Controllers/Api/CategoryController.php:97
 * @route '/api/v1/admin/categories/{category}/toggle-status'
 */
toggleStatus.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return toggleStatus.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CategoryController::toggleStatus
 * @see app/Http/Controllers/Api/CategoryController.php:97
 * @route '/api/v1/admin/categories/{category}/toggle-status'
 */
toggleStatus.patch = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\CategoryController::toggleStatus
 * @see app/Http/Controllers/Api/CategoryController.php:97
 * @route '/api/v1/admin/categories/{category}/toggle-status'
 */
    const toggleStatusForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\CategoryController::toggleStatus
 * @see app/Http/Controllers/Api/CategoryController.php:97
 * @route '/api/v1/admin/categories/{category}/toggle-status'
 */
        toggleStatusForm.patch = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleStatus.form = toggleStatusForm
const CategoryController = { index, show, store, update, destroy, toggleStatus }

export default CategoryController