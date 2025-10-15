import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ParticipantController::index
 * @see app/Http/Controllers/Api/ParticipantController.php:46
 * @route '/api/v1/participants'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/participants',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ParticipantController::index
 * @see app/Http/Controllers/Api/ParticipantController.php:46
 * @route '/api/v1/participants'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ParticipantController::index
 * @see app/Http/Controllers/Api/ParticipantController.php:46
 * @route '/api/v1/participants'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ParticipantController::index
 * @see app/Http/Controllers/Api/ParticipantController.php:46
 * @route '/api/v1/participants'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ParticipantController::index
 * @see app/Http/Controllers/Api/ParticipantController.php:46
 * @route '/api/v1/participants'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ParticipantController::index
 * @see app/Http/Controllers/Api/ParticipantController.php:46
 * @route '/api/v1/participants'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ParticipantController::index
 * @see app/Http/Controllers/Api/ParticipantController.php:46
 * @route '/api/v1/participants'
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
* @see \App\Http\Controllers\Api\ParticipantController::store
 * @see app/Http/Controllers/Api/ParticipantController.php:84
 * @route '/api/v1/participants'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/participants',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ParticipantController::store
 * @see app/Http/Controllers/Api/ParticipantController.php:84
 * @route '/api/v1/participants'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ParticipantController::store
 * @see app/Http/Controllers/Api/ParticipantController.php:84
 * @route '/api/v1/participants'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ParticipantController::store
 * @see app/Http/Controllers/Api/ParticipantController.php:84
 * @route '/api/v1/participants'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ParticipantController::store
 * @see app/Http/Controllers/Api/ParticipantController.php:84
 * @route '/api/v1/participants'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\ParticipantController::show
 * @see app/Http/Controllers/Api/ParticipantController.php:121
 * @route '/api/v1/participants/{participant}'
 */
export const show = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/participants/{participant}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ParticipantController::show
 * @see app/Http/Controllers/Api/ParticipantController.php:121
 * @route '/api/v1/participants/{participant}'
 */
show.url = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { participant: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { participant: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    participant: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        participant: typeof args.participant === 'object'
                ? args.participant.id
                : args.participant,
                }

    return show.definition.url
            .replace('{participant}', parsedArgs.participant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ParticipantController::show
 * @see app/Http/Controllers/Api/ParticipantController.php:121
 * @route '/api/v1/participants/{participant}'
 */
show.get = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ParticipantController::show
 * @see app/Http/Controllers/Api/ParticipantController.php:121
 * @route '/api/v1/participants/{participant}'
 */
show.head = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ParticipantController::show
 * @see app/Http/Controllers/Api/ParticipantController.php:121
 * @route '/api/v1/participants/{participant}'
 */
    const showForm = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ParticipantController::show
 * @see app/Http/Controllers/Api/ParticipantController.php:121
 * @route '/api/v1/participants/{participant}'
 */
        showForm.get = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ParticipantController::show
 * @see app/Http/Controllers/Api/ParticipantController.php:121
 * @route '/api/v1/participants/{participant}'
 */
        showForm.head = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\ParticipantController::update
 * @see app/Http/Controllers/Api/ParticipantController.php:168
 * @route '/api/v1/participants/{participant}'
 */
export const update = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/participants/{participant}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\ParticipantController::update
 * @see app/Http/Controllers/Api/ParticipantController.php:168
 * @route '/api/v1/participants/{participant}'
 */
update.url = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { participant: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { participant: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    participant: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        participant: typeof args.participant === 'object'
                ? args.participant.id
                : args.participant,
                }

    return update.definition.url
            .replace('{participant}', parsedArgs.participant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ParticipantController::update
 * @see app/Http/Controllers/Api/ParticipantController.php:168
 * @route '/api/v1/participants/{participant}'
 */
update.put = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\ParticipantController::update
 * @see app/Http/Controllers/Api/ParticipantController.php:168
 * @route '/api/v1/participants/{participant}'
 */
update.patch = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\ParticipantController::update
 * @see app/Http/Controllers/Api/ParticipantController.php:168
 * @route '/api/v1/participants/{participant}'
 */
    const updateForm = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ParticipantController::update
 * @see app/Http/Controllers/Api/ParticipantController.php:168
 * @route '/api/v1/participants/{participant}'
 */
        updateForm.put = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\ParticipantController::update
 * @see app/Http/Controllers/Api/ParticipantController.php:168
 * @route '/api/v1/participants/{participant}'
 */
        updateForm.patch = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\ParticipantController::destroy
 * @see app/Http/Controllers/Api/ParticipantController.php:181
 * @route '/api/v1/participants/{participant}'
 */
export const destroy = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/participants/{participant}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\ParticipantController::destroy
 * @see app/Http/Controllers/Api/ParticipantController.php:181
 * @route '/api/v1/participants/{participant}'
 */
destroy.url = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { participant: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { participant: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    participant: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        participant: typeof args.participant === 'object'
                ? args.participant.id
                : args.participant,
                }

    return destroy.definition.url
            .replace('{participant}', parsedArgs.participant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ParticipantController::destroy
 * @see app/Http/Controllers/Api/ParticipantController.php:181
 * @route '/api/v1/participants/{participant}'
 */
destroy.delete = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\ParticipantController::destroy
 * @see app/Http/Controllers/Api/ParticipantController.php:181
 * @route '/api/v1/participants/{participant}'
 */
    const destroyForm = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ParticipantController::destroy
 * @see app/Http/Controllers/Api/ParticipantController.php:181
 * @route '/api/v1/participants/{participant}'
 */
        destroyForm.delete = (args: { participant: number | { id: number } } | [participant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const participants = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default participants