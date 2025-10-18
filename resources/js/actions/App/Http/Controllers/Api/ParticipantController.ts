import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ParticipantController::dashboard
 * @see app/Http/Controllers/Api/ParticipantController.php:30
 * @route '/api/v1/dashboard/participants'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/api/v1/dashboard/participants',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ParticipantController::dashboard
 * @see app/Http/Controllers/Api/ParticipantController.php:30
 * @route '/api/v1/dashboard/participants'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ParticipantController::dashboard
 * @see app/Http/Controllers/Api/ParticipantController.php:30
 * @route '/api/v1/dashboard/participants'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ParticipantController::dashboard
 * @see app/Http/Controllers/Api/ParticipantController.php:30
 * @route '/api/v1/dashboard/participants'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ParticipantController::dashboard
 * @see app/Http/Controllers/Api/ParticipantController.php:30
 * @route '/api/v1/dashboard/participants'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ParticipantController::dashboard
 * @see app/Http/Controllers/Api/ParticipantController.php:30
 * @route '/api/v1/dashboard/participants'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ParticipantController::dashboard
 * @see app/Http/Controllers/Api/ParticipantController.php:30
 * @route '/api/v1/dashboard/participants'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
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
export const show = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
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
show.url = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
show.get = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ParticipantController::show
 * @see app/Http/Controllers/Api/ParticipantController.php:121
 * @route '/api/v1/participants/{participant}'
 */
show.head = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ParticipantController::show
 * @see app/Http/Controllers/Api/ParticipantController.php:121
 * @route '/api/v1/participants/{participant}'
 */
    const showForm = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ParticipantController::show
 * @see app/Http/Controllers/Api/ParticipantController.php:121
 * @route '/api/v1/participants/{participant}'
 */
        showForm.get = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ParticipantController::show
 * @see app/Http/Controllers/Api/ParticipantController.php:121
 * @route '/api/v1/participants/{participant}'
 */
        showForm.head = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
export const update = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
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
update.url = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
update.put = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\ParticipantController::update
 * @see app/Http/Controllers/Api/ParticipantController.php:168
 * @route '/api/v1/participants/{participant}'
 */
update.patch = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\ParticipantController::update
 * @see app/Http/Controllers/Api/ParticipantController.php:168
 * @route '/api/v1/participants/{participant}'
 */
    const updateForm = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
        updateForm.put = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
        updateForm.patch = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
export const destroy = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
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
destroy.url = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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
destroy.delete = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\ParticipantController::destroy
 * @see app/Http/Controllers/Api/ParticipantController.php:181
 * @route '/api/v1/participants/{participant}'
 */
    const destroyForm = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
        destroyForm.delete = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\ParticipantController::showByEmail
 * @see app/Http/Controllers/Api/ParticipantController.php:134
 * @route '/api/v1/participants/by-email/{email}'
 */
export const showByEmail = (args: { email: string | number } | [email: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showByEmail.url(args, options),
    method: 'get',
})

showByEmail.definition = {
    methods: ["get","head"],
    url: '/api/v1/participants/by-email/{email}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ParticipantController::showByEmail
 * @see app/Http/Controllers/Api/ParticipantController.php:134
 * @route '/api/v1/participants/by-email/{email}'
 */
showByEmail.url = (args: { email: string | number } | [email: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { email: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    email: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        email: args.email,
                }

    return showByEmail.definition.url
            .replace('{email}', parsedArgs.email.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ParticipantController::showByEmail
 * @see app/Http/Controllers/Api/ParticipantController.php:134
 * @route '/api/v1/participants/by-email/{email}'
 */
showByEmail.get = (args: { email: string | number } | [email: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showByEmail.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ParticipantController::showByEmail
 * @see app/Http/Controllers/Api/ParticipantController.php:134
 * @route '/api/v1/participants/by-email/{email}'
 */
showByEmail.head = (args: { email: string | number } | [email: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showByEmail.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ParticipantController::showByEmail
 * @see app/Http/Controllers/Api/ParticipantController.php:134
 * @route '/api/v1/participants/by-email/{email}'
 */
    const showByEmailForm = (args: { email: string | number } | [email: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showByEmail.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ParticipantController::showByEmail
 * @see app/Http/Controllers/Api/ParticipantController.php:134
 * @route '/api/v1/participants/by-email/{email}'
 */
        showByEmailForm.get = (args: { email: string | number } | [email: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showByEmail.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ParticipantController::showByEmail
 * @see app/Http/Controllers/Api/ParticipantController.php:134
 * @route '/api/v1/participants/by-email/{email}'
 */
        showByEmailForm.head = (args: { email: string | number } | [email: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showByEmail.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showByEmail.form = showByEmailForm
/**
* @see \App\Http\Controllers\Api\ParticipantController::registerActivity
 * @see app/Http/Controllers/Api/ParticipantController.php:193
 * @route '/api/v1/participants/{participant}/register-activity'
 */
export const registerActivity = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: registerActivity.url(args, options),
    method: 'post',
})

registerActivity.definition = {
    methods: ["post"],
    url: '/api/v1/participants/{participant}/register-activity',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ParticipantController::registerActivity
 * @see app/Http/Controllers/Api/ParticipantController.php:193
 * @route '/api/v1/participants/{participant}/register-activity'
 */
registerActivity.url = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return registerActivity.definition.url
            .replace('{participant}', parsedArgs.participant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ParticipantController::registerActivity
 * @see app/Http/Controllers/Api/ParticipantController.php:193
 * @route '/api/v1/participants/{participant}/register-activity'
 */
registerActivity.post = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: registerActivity.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ParticipantController::registerActivity
 * @see app/Http/Controllers/Api/ParticipantController.php:193
 * @route '/api/v1/participants/{participant}/register-activity'
 */
    const registerActivityForm = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: registerActivity.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ParticipantController::registerActivity
 * @see app/Http/Controllers/Api/ParticipantController.php:193
 * @route '/api/v1/participants/{participant}/register-activity'
 */
        registerActivityForm.post = (args: { participant: string | number | { id: string | number } } | [participant: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: registerActivity.url(args, options),
            method: 'post',
        })
    
    registerActivity.form = registerActivityForm
/**
* @see \App\Http\Controllers\Api\ParticipantController::unregisterActivity
 * @see app/Http/Controllers/Api/ParticipantController.php:237
 * @route '/api/v1/participants/{participant}/unregister-activity/{activity}'
 */
export const unregisterActivity = (args: { participant: string | number | { id: string | number }, activity: string | number | { id: string | number } } | [participant: string | number | { id: string | number }, activity: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: unregisterActivity.url(args, options),
    method: 'delete',
})

unregisterActivity.definition = {
    methods: ["delete"],
    url: '/api/v1/participants/{participant}/unregister-activity/{activity}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\ParticipantController::unregisterActivity
 * @see app/Http/Controllers/Api/ParticipantController.php:237
 * @route '/api/v1/participants/{participant}/unregister-activity/{activity}'
 */
unregisterActivity.url = (args: { participant: string | number | { id: string | number }, activity: string | number | { id: string | number } } | [participant: string | number | { id: string | number }, activity: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
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

    return unregisterActivity.definition.url
            .replace('{participant}', parsedArgs.participant.toString())
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ParticipantController::unregisterActivity
 * @see app/Http/Controllers/Api/ParticipantController.php:237
 * @route '/api/v1/participants/{participant}/unregister-activity/{activity}'
 */
unregisterActivity.delete = (args: { participant: string | number | { id: string | number }, activity: string | number | { id: string | number } } | [participant: string | number | { id: string | number }, activity: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: unregisterActivity.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\ParticipantController::unregisterActivity
 * @see app/Http/Controllers/Api/ParticipantController.php:237
 * @route '/api/v1/participants/{participant}/unregister-activity/{activity}'
 */
    const unregisterActivityForm = (args: { participant: string | number | { id: string | number }, activity: string | number | { id: string | number } } | [participant: string | number | { id: string | number }, activity: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: unregisterActivity.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ParticipantController::unregisterActivity
 * @see app/Http/Controllers/Api/ParticipantController.php:237
 * @route '/api/v1/participants/{participant}/unregister-activity/{activity}'
 */
        unregisterActivityForm.delete = (args: { participant: string | number | { id: string | number }, activity: string | number | { id: string | number } } | [participant: string | number | { id: string | number }, activity: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: unregisterActivity.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    unregisterActivity.form = unregisterActivityForm
/**
* @see \App\Http\Controllers\Api\ParticipantController::report
 * @see app/Http/Controllers/Api/ParticipantController.php:274
 * @route '/api/v1/admin/reports/participants'
 */
export const report = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: report.url(options),
    method: 'get',
})

report.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/reports/participants',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ParticipantController::report
 * @see app/Http/Controllers/Api/ParticipantController.php:274
 * @route '/api/v1/admin/reports/participants'
 */
report.url = (options?: RouteQueryOptions) => {
    return report.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ParticipantController::report
 * @see app/Http/Controllers/Api/ParticipantController.php:274
 * @route '/api/v1/admin/reports/participants'
 */
report.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: report.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ParticipantController::report
 * @see app/Http/Controllers/Api/ParticipantController.php:274
 * @route '/api/v1/admin/reports/participants'
 */
report.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: report.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ParticipantController::report
 * @see app/Http/Controllers/Api/ParticipantController.php:274
 * @route '/api/v1/admin/reports/participants'
 */
    const reportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: report.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ParticipantController::report
 * @see app/Http/Controllers/Api/ParticipantController.php:274
 * @route '/api/v1/admin/reports/participants'
 */
        reportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: report.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ParticipantController::report
 * @see app/Http/Controllers/Api/ParticipantController.php:274
 * @route '/api/v1/admin/reports/participants'
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
const ParticipantController = { dashboard, index, store, show, update, destroy, showByEmail, registerActivity, unregisterActivity, report }

export default ParticipantController