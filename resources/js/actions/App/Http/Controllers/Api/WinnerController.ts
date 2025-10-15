import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/winners'
 */
const indexa951658b13ada9960a97495004990d56 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa951658b13ada9960a97495004990d56.url(options),
    method: 'get',
})

indexa951658b13ada9960a97495004990d56.definition = {
    methods: ["get","head"],
    url: '/api/v1/winners',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/winners'
 */
indexa951658b13ada9960a97495004990d56.url = (options?: RouteQueryOptions) => {
    return indexa951658b13ada9960a97495004990d56.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/winners'
 */
indexa951658b13ada9960a97495004990d56.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa951658b13ada9960a97495004990d56.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/winners'
 */
indexa951658b13ada9960a97495004990d56.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexa951658b13ada9960a97495004990d56.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/winners'
 */
    const indexa951658b13ada9960a97495004990d56Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexa951658b13ada9960a97495004990d56.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/winners'
 */
        indexa951658b13ada9960a97495004990d56Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexa951658b13ada9960a97495004990d56.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/winners'
 */
        indexa951658b13ada9960a97495004990d56Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexa951658b13ada9960a97495004990d56.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexa951658b13ada9960a97495004990d56.form = indexa951658b13ada9960a97495004990d56Form
    /**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/judge/winners'
 */
const index33eb32bf4c84650dba85faa48c27ec15 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index33eb32bf4c84650dba85faa48c27ec15.url(options),
    method: 'get',
})

index33eb32bf4c84650dba85faa48c27ec15.definition = {
    methods: ["get","head"],
    url: '/api/v1/judge/winners',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/judge/winners'
 */
index33eb32bf4c84650dba85faa48c27ec15.url = (options?: RouteQueryOptions) => {
    return index33eb32bf4c84650dba85faa48c27ec15.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/judge/winners'
 */
index33eb32bf4c84650dba85faa48c27ec15.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index33eb32bf4c84650dba85faa48c27ec15.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/judge/winners'
 */
index33eb32bf4c84650dba85faa48c27ec15.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index33eb32bf4c84650dba85faa48c27ec15.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/judge/winners'
 */
    const index33eb32bf4c84650dba85faa48c27ec15Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index33eb32bf4c84650dba85faa48c27ec15.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/judge/winners'
 */
        index33eb32bf4c84650dba85faa48c27ec15Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index33eb32bf4c84650dba85faa48c27ec15.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\WinnerController::index
 * @see app/Http/Controllers/Api/WinnerController.php:16
 * @route '/api/v1/judge/winners'
 */
        index33eb32bf4c84650dba85faa48c27ec15Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index33eb32bf4c84650dba85faa48c27ec15.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index33eb32bf4c84650dba85faa48c27ec15.form = index33eb32bf4c84650dba85faa48c27ec15Form

export const index = {
    '/api/v1/winners': indexa951658b13ada9960a97495004990d56,
    '/api/v1/judge/winners': index33eb32bf4c84650dba85faa48c27ec15,
}

/**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/winners'
 */
const storea951658b13ada9960a97495004990d56 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storea951658b13ada9960a97495004990d56.url(options),
    method: 'post',
})

storea951658b13ada9960a97495004990d56.definition = {
    methods: ["post"],
    url: '/api/v1/winners',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/winners'
 */
storea951658b13ada9960a97495004990d56.url = (options?: RouteQueryOptions) => {
    return storea951658b13ada9960a97495004990d56.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/winners'
 */
storea951658b13ada9960a97495004990d56.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storea951658b13ada9960a97495004990d56.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/winners'
 */
    const storea951658b13ada9960a97495004990d56Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storea951658b13ada9960a97495004990d56.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/winners'
 */
        storea951658b13ada9960a97495004990d56Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storea951658b13ada9960a97495004990d56.url(options),
            method: 'post',
        })
    
    storea951658b13ada9960a97495004990d56.form = storea951658b13ada9960a97495004990d56Form
    /**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/judge/winners'
 */
const store33eb32bf4c84650dba85faa48c27ec15 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store33eb32bf4c84650dba85faa48c27ec15.url(options),
    method: 'post',
})

store33eb32bf4c84650dba85faa48c27ec15.definition = {
    methods: ["post"],
    url: '/api/v1/judge/winners',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/judge/winners'
 */
store33eb32bf4c84650dba85faa48c27ec15.url = (options?: RouteQueryOptions) => {
    return store33eb32bf4c84650dba85faa48c27ec15.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/judge/winners'
 */
store33eb32bf4c84650dba85faa48c27ec15.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store33eb32bf4c84650dba85faa48c27ec15.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/judge/winners'
 */
    const store33eb32bf4c84650dba85faa48c27ec15Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store33eb32bf4c84650dba85faa48c27ec15.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::store
 * @see app/Http/Controllers/Api/WinnerController.php:56
 * @route '/api/v1/judge/winners'
 */
        store33eb32bf4c84650dba85faa48c27ec15Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store33eb32bf4c84650dba85faa48c27ec15.url(options),
            method: 'post',
        })
    
    store33eb32bf4c84650dba85faa48c27ec15.form = store33eb32bf4c84650dba85faa48c27ec15Form

export const store = {
    '/api/v1/winners': storea951658b13ada9960a97495004990d56,
    '/api/v1/judge/winners': store33eb32bf4c84650dba85faa48c27ec15,
}

/**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/winners/{winner}'
 */
const show980b5e4b4b1ee291c7a869a07a625eed = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show980b5e4b4b1ee291c7a869a07a625eed.url(args, options),
    method: 'get',
})

show980b5e4b4b1ee291c7a869a07a625eed.definition = {
    methods: ["get","head"],
    url: '/api/v1/winners/{winner}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/winners/{winner}'
 */
show980b5e4b4b1ee291c7a869a07a625eed.url = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show980b5e4b4b1ee291c7a869a07a625eed.definition.url
            .replace('{winner}', parsedArgs.winner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/winners/{winner}'
 */
show980b5e4b4b1ee291c7a869a07a625eed.get = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show980b5e4b4b1ee291c7a869a07a625eed.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/winners/{winner}'
 */
show980b5e4b4b1ee291c7a869a07a625eed.head = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show980b5e4b4b1ee291c7a869a07a625eed.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/winners/{winner}'
 */
    const show980b5e4b4b1ee291c7a869a07a625eedForm = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show980b5e4b4b1ee291c7a869a07a625eed.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/winners/{winner}'
 */
        show980b5e4b4b1ee291c7a869a07a625eedForm.get = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show980b5e4b4b1ee291c7a869a07a625eed.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/winners/{winner}'
 */
        show980b5e4b4b1ee291c7a869a07a625eedForm.head = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show980b5e4b4b1ee291c7a869a07a625eed.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show980b5e4b4b1ee291c7a869a07a625eed.form = show980b5e4b4b1ee291c7a869a07a625eedForm
    /**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/judge/winners/{winner}'
 */
const showe841a4d1a9ee0b1f933435f8d1b34008 = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showe841a4d1a9ee0b1f933435f8d1b34008.url(args, options),
    method: 'get',
})

showe841a4d1a9ee0b1f933435f8d1b34008.definition = {
    methods: ["get","head"],
    url: '/api/v1/judge/winners/{winner}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/judge/winners/{winner}'
 */
showe841a4d1a9ee0b1f933435f8d1b34008.url = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return showe841a4d1a9ee0b1f933435f8d1b34008.definition.url
            .replace('{winner}', parsedArgs.winner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/judge/winners/{winner}'
 */
showe841a4d1a9ee0b1f933435f8d1b34008.get = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showe841a4d1a9ee0b1f933435f8d1b34008.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/judge/winners/{winner}'
 */
showe841a4d1a9ee0b1f933435f8d1b34008.head = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showe841a4d1a9ee0b1f933435f8d1b34008.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/judge/winners/{winner}'
 */
    const showe841a4d1a9ee0b1f933435f8d1b34008Form = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showe841a4d1a9ee0b1f933435f8d1b34008.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/judge/winners/{winner}'
 */
        showe841a4d1a9ee0b1f933435f8d1b34008Form.get = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showe841a4d1a9ee0b1f933435f8d1b34008.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\WinnerController::show
 * @see app/Http/Controllers/Api/WinnerController.php:95
 * @route '/api/v1/judge/winners/{winner}'
 */
        showe841a4d1a9ee0b1f933435f8d1b34008Form.head = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showe841a4d1a9ee0b1f933435f8d1b34008.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showe841a4d1a9ee0b1f933435f8d1b34008.form = showe841a4d1a9ee0b1f933435f8d1b34008Form

export const show = {
    '/api/v1/winners/{winner}': show980b5e4b4b1ee291c7a869a07a625eed,
    '/api/v1/judge/winners/{winner}': showe841a4d1a9ee0b1f933435f8d1b34008,
}

/**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/winners/{winner}'
 */
const update980b5e4b4b1ee291c7a869a07a625eed = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update980b5e4b4b1ee291c7a869a07a625eed.url(args, options),
    method: 'put',
})

update980b5e4b4b1ee291c7a869a07a625eed.definition = {
    methods: ["put","patch"],
    url: '/api/v1/winners/{winner}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/winners/{winner}'
 */
update980b5e4b4b1ee291c7a869a07a625eed.url = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update980b5e4b4b1ee291c7a869a07a625eed.definition.url
            .replace('{winner}', parsedArgs.winner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/winners/{winner}'
 */
update980b5e4b4b1ee291c7a869a07a625eed.put = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update980b5e4b4b1ee291c7a869a07a625eed.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/winners/{winner}'
 */
update980b5e4b4b1ee291c7a869a07a625eed.patch = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update980b5e4b4b1ee291c7a869a07a625eed.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/winners/{winner}'
 */
    const update980b5e4b4b1ee291c7a869a07a625eedForm = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update980b5e4b4b1ee291c7a869a07a625eed.url(args, {
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
        update980b5e4b4b1ee291c7a869a07a625eedForm.put = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update980b5e4b4b1ee291c7a869a07a625eed.url(args, {
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
        update980b5e4b4b1ee291c7a869a07a625eedForm.patch = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update980b5e4b4b1ee291c7a869a07a625eed.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update980b5e4b4b1ee291c7a869a07a625eed.form = update980b5e4b4b1ee291c7a869a07a625eedForm
    /**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/judge/winners/{winner}'
 */
const updatee841a4d1a9ee0b1f933435f8d1b34008 = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatee841a4d1a9ee0b1f933435f8d1b34008.url(args, options),
    method: 'put',
})

updatee841a4d1a9ee0b1f933435f8d1b34008.definition = {
    methods: ["put","patch"],
    url: '/api/v1/judge/winners/{winner}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/judge/winners/{winner}'
 */
updatee841a4d1a9ee0b1f933435f8d1b34008.url = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updatee841a4d1a9ee0b1f933435f8d1b34008.definition.url
            .replace('{winner}', parsedArgs.winner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/judge/winners/{winner}'
 */
updatee841a4d1a9ee0b1f933435f8d1b34008.put = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatee841a4d1a9ee0b1f933435f8d1b34008.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/judge/winners/{winner}'
 */
updatee841a4d1a9ee0b1f933435f8d1b34008.patch = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatee841a4d1a9ee0b1f933435f8d1b34008.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::update
 * @see app/Http/Controllers/Api/WinnerController.php:108
 * @route '/api/v1/judge/winners/{winner}'
 */
    const updatee841a4d1a9ee0b1f933435f8d1b34008Form = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updatee841a4d1a9ee0b1f933435f8d1b34008.url(args, {
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
        updatee841a4d1a9ee0b1f933435f8d1b34008Form.put = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updatee841a4d1a9ee0b1f933435f8d1b34008.url(args, {
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
        updatee841a4d1a9ee0b1f933435f8d1b34008Form.patch = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updatee841a4d1a9ee0b1f933435f8d1b34008.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updatee841a4d1a9ee0b1f933435f8d1b34008.form = updatee841a4d1a9ee0b1f933435f8d1b34008Form

export const update = {
    '/api/v1/winners/{winner}': update980b5e4b4b1ee291c7a869a07a625eed,
    '/api/v1/judge/winners/{winner}': updatee841a4d1a9ee0b1f933435f8d1b34008,
}

/**
* @see \App\Http\Controllers\Api\WinnerController::destroy
 * @see app/Http/Controllers/Api/WinnerController.php:132
 * @route '/api/v1/winners/{winner}'
 */
const destroy980b5e4b4b1ee291c7a869a07a625eed = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy980b5e4b4b1ee291c7a869a07a625eed.url(args, options),
    method: 'delete',
})

destroy980b5e4b4b1ee291c7a869a07a625eed.definition = {
    methods: ["delete"],
    url: '/api/v1/winners/{winner}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::destroy
 * @see app/Http/Controllers/Api/WinnerController.php:132
 * @route '/api/v1/winners/{winner}'
 */
destroy980b5e4b4b1ee291c7a869a07a625eed.url = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy980b5e4b4b1ee291c7a869a07a625eed.definition.url
            .replace('{winner}', parsedArgs.winner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::destroy
 * @see app/Http/Controllers/Api/WinnerController.php:132
 * @route '/api/v1/winners/{winner}'
 */
destroy980b5e4b4b1ee291c7a869a07a625eed.delete = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy980b5e4b4b1ee291c7a869a07a625eed.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::destroy
 * @see app/Http/Controllers/Api/WinnerController.php:132
 * @route '/api/v1/winners/{winner}'
 */
    const destroy980b5e4b4b1ee291c7a869a07a625eedForm = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy980b5e4b4b1ee291c7a869a07a625eed.url(args, {
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
        destroy980b5e4b4b1ee291c7a869a07a625eedForm.delete = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy980b5e4b4b1ee291c7a869a07a625eed.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy980b5e4b4b1ee291c7a869a07a625eed.form = destroy980b5e4b4b1ee291c7a869a07a625eedForm
    /**
* @see \App\Http\Controllers\Api\WinnerController::destroy
 * @see app/Http/Controllers/Api/WinnerController.php:132
 * @route '/api/v1/judge/winners/{winner}'
 */
const destroye841a4d1a9ee0b1f933435f8d1b34008 = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroye841a4d1a9ee0b1f933435f8d1b34008.url(args, options),
    method: 'delete',
})

destroye841a4d1a9ee0b1f933435f8d1b34008.definition = {
    methods: ["delete"],
    url: '/api/v1/judge/winners/{winner}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::destroy
 * @see app/Http/Controllers/Api/WinnerController.php:132
 * @route '/api/v1/judge/winners/{winner}'
 */
destroye841a4d1a9ee0b1f933435f8d1b34008.url = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroye841a4d1a9ee0b1f933435f8d1b34008.definition.url
            .replace('{winner}', parsedArgs.winner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::destroy
 * @see app/Http/Controllers/Api/WinnerController.php:132
 * @route '/api/v1/judge/winners/{winner}'
 */
destroye841a4d1a9ee0b1f933435f8d1b34008.delete = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroye841a4d1a9ee0b1f933435f8d1b34008.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::destroy
 * @see app/Http/Controllers/Api/WinnerController.php:132
 * @route '/api/v1/judge/winners/{winner}'
 */
    const destroye841a4d1a9ee0b1f933435f8d1b34008Form = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroye841a4d1a9ee0b1f933435f8d1b34008.url(args, {
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
        destroye841a4d1a9ee0b1f933435f8d1b34008Form.delete = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroye841a4d1a9ee0b1f933435f8d1b34008.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroye841a4d1a9ee0b1f933435f8d1b34008.form = destroye841a4d1a9ee0b1f933435f8d1b34008Form

export const destroy = {
    '/api/v1/winners/{winner}': destroy980b5e4b4b1ee291c7a869a07a625eed,
    '/api/v1/judge/winners/{winner}': destroye841a4d1a9ee0b1f933435f8d1b34008,
}

/**
* @see \App\Http\Controllers\Api\WinnerController::byYear
 * @see app/Http/Controllers/Api/WinnerController.php:144
 * @route '/api/v1/winners/by-year/{year}'
 */
export const byYear = (args: { year: string | number } | [year: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byYear.url(args, options),
    method: 'get',
})

byYear.definition = {
    methods: ["get","head"],
    url: '/api/v1/winners/by-year/{year}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::byYear
 * @see app/Http/Controllers/Api/WinnerController.php:144
 * @route '/api/v1/winners/by-year/{year}'
 */
byYear.url = (args: { year: string | number } | [year: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { year: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    year: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        year: args.year,
                }

    return byYear.definition.url
            .replace('{year}', parsedArgs.year.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::byYear
 * @see app/Http/Controllers/Api/WinnerController.php:144
 * @route '/api/v1/winners/by-year/{year}'
 */
byYear.get = (args: { year: string | number } | [year: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byYear.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\WinnerController::byYear
 * @see app/Http/Controllers/Api/WinnerController.php:144
 * @route '/api/v1/winners/by-year/{year}'
 */
byYear.head = (args: { year: string | number } | [year: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byYear.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::byYear
 * @see app/Http/Controllers/Api/WinnerController.php:144
 * @route '/api/v1/winners/by-year/{year}'
 */
    const byYearForm = (args: { year: string | number } | [year: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: byYear.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::byYear
 * @see app/Http/Controllers/Api/WinnerController.php:144
 * @route '/api/v1/winners/by-year/{year}'
 */
        byYearForm.get = (args: { year: string | number } | [year: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byYear.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\WinnerController::byYear
 * @see app/Http/Controllers/Api/WinnerController.php:144
 * @route '/api/v1/winners/by-year/{year}'
 */
        byYearForm.head = (args: { year: string | number } | [year: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byYear.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    byYear.form = byYearForm
/**
* @see \App\Http\Controllers\Api\WinnerController::byActivity
 * @see app/Http/Controllers/Api/WinnerController.php:169
 * @route '/api/v1/winners/by-activity/{activity}'
 */
export const byActivity = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byActivity.url(args, options),
    method: 'get',
})

byActivity.definition = {
    methods: ["get","head"],
    url: '/api/v1/winners/by-activity/{activity}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::byActivity
 * @see app/Http/Controllers/Api/WinnerController.php:169
 * @route '/api/v1/winners/by-activity/{activity}'
 */
byActivity.url = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return byActivity.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::byActivity
 * @see app/Http/Controllers/Api/WinnerController.php:169
 * @route '/api/v1/winners/by-activity/{activity}'
 */
byActivity.get = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byActivity.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\WinnerController::byActivity
 * @see app/Http/Controllers/Api/WinnerController.php:169
 * @route '/api/v1/winners/by-activity/{activity}'
 */
byActivity.head = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byActivity.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::byActivity
 * @see app/Http/Controllers/Api/WinnerController.php:169
 * @route '/api/v1/winners/by-activity/{activity}'
 */
    const byActivityForm = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: byActivity.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::byActivity
 * @see app/Http/Controllers/Api/WinnerController.php:169
 * @route '/api/v1/winners/by-activity/{activity}'
 */
        byActivityForm.get = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byActivity.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\WinnerController::byActivity
 * @see app/Http/Controllers/Api/WinnerController.php:169
 * @route '/api/v1/winners/by-activity/{activity}'
 */
        byActivityForm.head = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byActivity.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    byActivity.form = byActivityForm
/**
* @see \App\Http\Controllers\Api\WinnerController::publish
 * @see app/Http/Controllers/Api/WinnerController.php:194
 * @route '/api/v1/judge/winners/publish/{winner}'
 */
export const publish = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: publish.url(args, options),
    method: 'post',
})

publish.definition = {
    methods: ["post"],
    url: '/api/v1/judge/winners/publish/{winner}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::publish
 * @see app/Http/Controllers/Api/WinnerController.php:194
 * @route '/api/v1/judge/winners/publish/{winner}'
 */
publish.url = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return publish.definition.url
            .replace('{winner}', parsedArgs.winner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::publish
 * @see app/Http/Controllers/Api/WinnerController.php:194
 * @route '/api/v1/judge/winners/publish/{winner}'
 */
publish.post = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: publish.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::publish
 * @see app/Http/Controllers/Api/WinnerController.php:194
 * @route '/api/v1/judge/winners/publish/{winner}'
 */
    const publishForm = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: publish.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::publish
 * @see app/Http/Controllers/Api/WinnerController.php:194
 * @route '/api/v1/judge/winners/publish/{winner}'
 */
        publishForm.post = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: publish.url(args, options),
            method: 'post',
        })
    
    publish.form = publishForm
/**
* @see \App\Http\Controllers\Api\WinnerController::unpublish
 * @see app/Http/Controllers/Api/WinnerController.php:207
 * @route '/api/v1/judge/winners/unpublish/{winner}'
 */
export const unpublish = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unpublish.url(args, options),
    method: 'post',
})

unpublish.definition = {
    methods: ["post"],
    url: '/api/v1/judge/winners/unpublish/{winner}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\WinnerController::unpublish
 * @see app/Http/Controllers/Api/WinnerController.php:207
 * @route '/api/v1/judge/winners/unpublish/{winner}'
 */
unpublish.url = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return unpublish.definition.url
            .replace('{winner}', parsedArgs.winner.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\WinnerController::unpublish
 * @see app/Http/Controllers/Api/WinnerController.php:207
 * @route '/api/v1/judge/winners/unpublish/{winner}'
 */
unpublish.post = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unpublish.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\WinnerController::unpublish
 * @see app/Http/Controllers/Api/WinnerController.php:207
 * @route '/api/v1/judge/winners/unpublish/{winner}'
 */
    const unpublishForm = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: unpublish.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\WinnerController::unpublish
 * @see app/Http/Controllers/Api/WinnerController.php:207
 * @route '/api/v1/judge/winners/unpublish/{winner}'
 */
        unpublishForm.post = (args: { winner: number | { id: number } } | [winner: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: unpublish.url(args, options),
            method: 'post',
        })
    
    unpublish.form = unpublishForm
const WinnerController = { index, store, show, update, destroy, byYear, byActivity, publish, unpublish }

export default WinnerController