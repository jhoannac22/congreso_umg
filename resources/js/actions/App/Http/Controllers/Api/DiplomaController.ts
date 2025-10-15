import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\DiplomaController::index
 * @see app/Http/Controllers/Api/DiplomaController.php:19
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
 * @see app/Http/Controllers/Api/DiplomaController.php:19
 * @route '/api/v1/diplomas'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DiplomaController::index
 * @see app/Http/Controllers/Api/DiplomaController.php:19
 * @route '/api/v1/diplomas'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\DiplomaController::index
 * @see app/Http/Controllers/Api/DiplomaController.php:19
 * @route '/api/v1/diplomas'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\DiplomaController::index
 * @see app/Http/Controllers/Api/DiplomaController.php:19
 * @route '/api/v1/diplomas'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\DiplomaController::index
 * @see app/Http/Controllers/Api/DiplomaController.php:19
 * @route '/api/v1/diplomas'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\DiplomaController::index
 * @see app/Http/Controllers/Api/DiplomaController.php:19
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
 * @see app/Http/Controllers/Api/DiplomaController.php:66
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
 * @see app/Http/Controllers/Api/DiplomaController.php:66
 * @route '/api/v1/diplomas'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DiplomaController::store
 * @see app/Http/Controllers/Api/DiplomaController.php:66
 * @route '/api/v1/diplomas'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\DiplomaController::store
 * @see app/Http/Controllers/Api/DiplomaController.php:66
 * @route '/api/v1/diplomas'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\DiplomaController::store
 * @see app/Http/Controllers/Api/DiplomaController.php:66
 * @route '/api/v1/diplomas'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\DiplomaController::show
 * @see app/Http/Controllers/Api/DiplomaController.php:112
 * @route '/api/v1/diplomas/{diploma}'
 */
export const show = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/diplomas/{diploma}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\DiplomaController::show
 * @see app/Http/Controllers/Api/DiplomaController.php:112
 * @route '/api/v1/diplomas/{diploma}'
 */
show.url = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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
 * @see app/Http/Controllers/Api/DiplomaController.php:112
 * @route '/api/v1/diplomas/{diploma}'
 */
show.get = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\DiplomaController::show
 * @see app/Http/Controllers/Api/DiplomaController.php:112
 * @route '/api/v1/diplomas/{diploma}'
 */
show.head = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\DiplomaController::show
 * @see app/Http/Controllers/Api/DiplomaController.php:112
 * @route '/api/v1/diplomas/{diploma}'
 */
    const showForm = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\DiplomaController::show
 * @see app/Http/Controllers/Api/DiplomaController.php:112
 * @route '/api/v1/diplomas/{diploma}'
 */
        showForm.get = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\DiplomaController::show
 * @see app/Http/Controllers/Api/DiplomaController.php:112
 * @route '/api/v1/diplomas/{diploma}'
 */
        showForm.head = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
 * @see app/Http/Controllers/Api/DiplomaController.php:125
 * @route '/api/v1/diplomas/{diploma}'
 */
export const update = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/diplomas/{diploma}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\DiplomaController::update
 * @see app/Http/Controllers/Api/DiplomaController.php:125
 * @route '/api/v1/diplomas/{diploma}'
 */
update.url = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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
 * @see app/Http/Controllers/Api/DiplomaController.php:125
 * @route '/api/v1/diplomas/{diploma}'
 */
update.put = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\DiplomaController::update
 * @see app/Http/Controllers/Api/DiplomaController.php:125
 * @route '/api/v1/diplomas/{diploma}'
 */
update.patch = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\DiplomaController::update
 * @see app/Http/Controllers/Api/DiplomaController.php:125
 * @route '/api/v1/diplomas/{diploma}'
 */
    const updateForm = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Api/DiplomaController.php:125
 * @route '/api/v1/diplomas/{diploma}'
 */
        updateForm.put = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Api/DiplomaController.php:125
 * @route '/api/v1/diplomas/{diploma}'
 */
        updateForm.patch = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Api/DiplomaController.php:150
 * @route '/api/v1/diplomas/{diploma}'
 */
export const destroy = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/diplomas/{diploma}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\DiplomaController::destroy
 * @see app/Http/Controllers/Api/DiplomaController.php:150
 * @route '/api/v1/diplomas/{diploma}'
 */
destroy.url = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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
 * @see app/Http/Controllers/Api/DiplomaController.php:150
 * @route '/api/v1/diplomas/{diploma}'
 */
destroy.delete = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\DiplomaController::destroy
 * @see app/Http/Controllers/Api/DiplomaController.php:150
 * @route '/api/v1/diplomas/{diploma}'
 */
    const destroyForm = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/Api/DiplomaController.php:150
 * @route '/api/v1/diplomas/{diploma}'
 */
        destroyForm.delete = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\DiplomaController::generate
 * @see app/Http/Controllers/Api/DiplomaController.php:167
 * @route '/api/v1/diplomas/generate/{participant}/{activity}'
 */
export const generate = (args: { participant: number | { id: number }, activity: number | { id: number } } | [participant: number | { id: number }, activity: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(args, options),
    method: 'post',
})

generate.definition = {
    methods: ["post"],
    url: '/api/v1/diplomas/generate/{participant}/{activity}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\DiplomaController::generate
 * @see app/Http/Controllers/Api/DiplomaController.php:167
 * @route '/api/v1/diplomas/generate/{participant}/{activity}'
 */
generate.url = (args: { participant: number | { id: number }, activity: number | { id: number } } | [participant: number | { id: number }, activity: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    participant: args[0],
                    activity: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        participant: typeof args.participant === 'object'
                ? args.participant.id
                : args.participant,
                                activity: typeof args.activity === 'object'
                ? args.activity.id
                : args.activity,
                }

    return generate.definition.url
            .replace('{participant}', parsedArgs.participant.toString())
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DiplomaController::generate
 * @see app/Http/Controllers/Api/DiplomaController.php:167
 * @route '/api/v1/diplomas/generate/{participant}/{activity}'
 */
generate.post = (args: { participant: number | { id: number }, activity: number | { id: number } } | [participant: number | { id: number }, activity: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\DiplomaController::generate
 * @see app/Http/Controllers/Api/DiplomaController.php:167
 * @route '/api/v1/diplomas/generate/{participant}/{activity}'
 */
    const generateForm = (args: { participant: number | { id: number }, activity: number | { id: number } } | [participant: number | { id: number }, activity: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: generate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\DiplomaController::generate
 * @see app/Http/Controllers/Api/DiplomaController.php:167
 * @route '/api/v1/diplomas/generate/{participant}/{activity}'
 */
        generateForm.post = (args: { participant: number | { id: number }, activity: number | { id: number } } | [participant: number | { id: number }, activity: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: generate.url(args, options),
            method: 'post',
        })
    
    generate.form = generateForm
/**
* @see \App\Http\Controllers\Api\DiplomaController::download
 * @see app/Http/Controllers/Api/DiplomaController.php:206
 * @route '/api/v1/diplomas/download/{diploma}'
 */
export const download = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/api/v1/diplomas/download/{diploma}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\DiplomaController::download
 * @see app/Http/Controllers/Api/DiplomaController.php:206
 * @route '/api/v1/diplomas/download/{diploma}'
 */
download.url = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return download.definition.url
            .replace('{diploma}', parsedArgs.diploma.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DiplomaController::download
 * @see app/Http/Controllers/Api/DiplomaController.php:206
 * @route '/api/v1/diplomas/download/{diploma}'
 */
download.get = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\DiplomaController::download
 * @see app/Http/Controllers/Api/DiplomaController.php:206
 * @route '/api/v1/diplomas/download/{diploma}'
 */
download.head = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\DiplomaController::download
 * @see app/Http/Controllers/Api/DiplomaController.php:206
 * @route '/api/v1/diplomas/download/{diploma}'
 */
    const downloadForm = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\DiplomaController::download
 * @see app/Http/Controllers/Api/DiplomaController.php:206
 * @route '/api/v1/diplomas/download/{diploma}'
 */
        downloadForm.get = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\DiplomaController::download
 * @see app/Http/Controllers/Api/DiplomaController.php:206
 * @route '/api/v1/diplomas/download/{diploma}'
 */
        downloadForm.head = (args: { diploma: number | { id: number } } | [diploma: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
const DiplomaController = { index, store, show, update, destroy, generate, download }

export default DiplomaController