import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/winners'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/winners',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/winners'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/winners'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/winners'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/winners'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/winners'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/winners'
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
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/judge/winners'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/judge/winners',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/judge/winners'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/judge/winners'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/judge/winners'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/judge/winners'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/judge/winners'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/judge/winners'
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
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/winners'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/winners',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/winners'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/winners'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/winners'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/winners'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/judge/winners'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/judge/winners',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/judge/winners'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/judge/winners'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/judge/winners'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/judge/winners'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/winners/{winner}'
 */
export const show = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/winners/{winner}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/winners/{winner}'
 */
show.url = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { winner: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { winner: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    winner: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        winner: typeof args.winner === 'object'
                ? args.winner.id
                : args.winner,
                }

    return show.definition.url
            .replace('{winner}', parsedArgs.winner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/winners/{winner}'
 */
show.get = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/winners/{winner}'
 */
show.head = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/winners/{winner}'
 */
    const showForm = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/winners/{winner}'
 */
        showForm.get = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/winners/{winner}'
 */
        showForm.head = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/judge/winners/{winner}'
 */
export const show = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/judge/winners/{winner}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/judge/winners/{winner}'
 */
show.url = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { winner: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { winner: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    winner: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        winner: typeof args.winner === 'object'
                ? args.winner.id
                : args.winner,
                }

    return show.definition.url
            .replace('{winner}', parsedArgs.winner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/judge/winners/{winner}'
 */
show.get = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/judge/winners/{winner}'
 */
show.head = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/judge/winners/{winner}'
 */
    const showForm = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/judge/winners/{winner}'
 */
        showForm.get = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/judge/winners/{winner}'
 */
        showForm.head = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/winners/{winner}'
 */
export const update = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/winners/{winner}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/winners/{winner}'
 */
update.url = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { winner: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { winner: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    winner: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        winner: typeof args.winner === 'object'
                ? args.winner.id
                : args.winner,
                }

    return update.definition.url
            .replace('{winner}', parsedArgs.winner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/winners/{winner}'
 */
update.put = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/winners/{winner}'
 */
update.patch = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/winners/{winner}'
 */
    const updateForm = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/winners/{winner}'
 */
        updateForm.put = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/winners/{winner}'
 */
        updateForm.patch = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/judge/winners/{winner}'
 */
export const update = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/judge/winners/{winner}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/judge/winners/{winner}'
 */
update.url = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { winner: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { winner: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    winner: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        winner: typeof args.winner === 'object'
                ? args.winner.id
                : args.winner,
                }

    return update.definition.url
            .replace('{winner}', parsedArgs.winner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/judge/winners/{winner}'
 */
update.put = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/judge/winners/{winner}'
 */
update.patch = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/judge/winners/{winner}'
 */
    const updateForm = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/judge/winners/{winner}'
 */
        updateForm.put = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/judge/winners/{winner}'
 */
        updateForm.patch = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\WinnerController::destroy
 * @see app/Http/Controllers/Api/WinnerController.php:132
 * @route '/api/v1/winners/{winner}'
 */
export const destroy = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/winners/{winner}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::destroy
 * @see app/Http/Controllers/Api/WinnerController.php:132
 * @route '/api/v1/winners/{winner}'
 */
destroy.url = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { winner: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { winner: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    winner: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        winner: typeof args.winner === 'object'
                ? args.winner.id
                : args.winner,
                }

    return destroy.definition.url
            .replace('{winner}', parsedArgs.winner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::destroy
 * @see app/Http/Controllers/Api/WinnerController.php:132
 * @route '/api/v1/winners/{winner}'
 */
destroy.delete = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::destroy
 * @see app/Http/Controllers/Api/WinnerController.php:132
 * @route '/api/v1/winners/{winner}'
 */
    const destroyForm = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::destroy
 * @see app/Http/Controllers/Api/WinnerController.php:132
 * @route '/api/v1/winners/{winner}'
 */
        destroyForm.delete = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\WinnerController::destroy
 * @see app/Http/Controllers/Api/WinnerController.php:132
 * @route '/api/v1/judge/winners/{winner}'
 */
export const destroy = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/judge/winners/{winner}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::destroy
 * @see app/Http/Controllers/Api/WinnerController.php:132
 * @route '/api/v1/judge/winners/{winner}'
 */
destroy.url = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { winner: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { winner: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    winner: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        winner: typeof args.winner === 'object'
                ? args.winner.id
                : args.winner,
                }

    return destroy.definition.url
            .replace('{winner}', parsedArgs.winner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::destroy
 * @see app/Http/Controllers/Api/WinnerController.php:132
 * @route '/api/v1/judge/winners/{winner}'
 */
destroy.delete = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::destroy
 * @see app/Http/Controllers/Api/WinnerController.php:132
 * @route '/api/v1/judge/winners/{winner}'
 */
    const destroyForm = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::destroy
 * @see app/Http/Controllers/Api/WinnerController.php:132
 * @route '/api/v1/judge/winners/{winner}'
 */
        destroyForm.delete = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm