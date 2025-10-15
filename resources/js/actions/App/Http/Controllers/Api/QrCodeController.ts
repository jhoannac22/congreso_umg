import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\QrCodeController::show
 * @see app/Http/Controllers/Api/QrCodeController.php:138
 * @route '/api/v1/qr-codes/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/qr-codes/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\QrCodeController::show
 * @see app/Http/Controllers/Api/QrCodeController.php:138
 * @route '/api/v1/qr-codes/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\QrCodeController::show
 * @see app/Http/Controllers/Api/QrCodeController.php:138
 * @route '/api/v1/qr-codes/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\QrCodeController::show
 * @see app/Http/Controllers/Api/QrCodeController.php:138
 * @route '/api/v1/qr-codes/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\QrCodeController::show
 * @see app/Http/Controllers/Api/QrCodeController.php:138
 * @route '/api/v1/qr-codes/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\QrCodeController::show
 * @see app/Http/Controllers/Api/QrCodeController.php:138
 * @route '/api/v1/qr-codes/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\QrCodeController::show
 * @see app/Http/Controllers/Api/QrCodeController.php:138
 * @route '/api/v1/qr-codes/{id}'
 */
        showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\QrCodeController::generateForRegistration
 * @see app/Http/Controllers/Api/QrCodeController.php:27
 * @route '/api/v1/qr-codes/generate/registration'
 */
export const generateForRegistration = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateForRegistration.url(options),
    method: 'post',
})

generateForRegistration.definition = {
    methods: ["post"],
    url: '/api/v1/qr-codes/generate/registration',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\QrCodeController::generateForRegistration
 * @see app/Http/Controllers/Api/QrCodeController.php:27
 * @route '/api/v1/qr-codes/generate/registration'
 */
generateForRegistration.url = (options?: RouteQueryOptions) => {
    return generateForRegistration.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\QrCodeController::generateForRegistration
 * @see app/Http/Controllers/Api/QrCodeController.php:27
 * @route '/api/v1/qr-codes/generate/registration'
 */
generateForRegistration.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateForRegistration.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\QrCodeController::generateForRegistration
 * @see app/Http/Controllers/Api/QrCodeController.php:27
 * @route '/api/v1/qr-codes/generate/registration'
 */
    const generateForRegistrationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: generateForRegistration.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\QrCodeController::generateForRegistration
 * @see app/Http/Controllers/Api/QrCodeController.php:27
 * @route '/api/v1/qr-codes/generate/registration'
 */
        generateForRegistrationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: generateForRegistration.url(options),
            method: 'post',
        })
    
    generateForRegistration.form = generateForRegistrationForm
/**
* @see \App\Http\Controllers\Api\QrCodeController::generateForActivity
 * @see app/Http/Controllers/Api/QrCodeController.php:92
 * @route '/api/v1/qr-codes/generate/activity'
 */
export const generateForActivity = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateForActivity.url(options),
    method: 'post',
})

generateForActivity.definition = {
    methods: ["post"],
    url: '/api/v1/qr-codes/generate/activity',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\QrCodeController::generateForActivity
 * @see app/Http/Controllers/Api/QrCodeController.php:92
 * @route '/api/v1/qr-codes/generate/activity'
 */
generateForActivity.url = (options?: RouteQueryOptions) => {
    return generateForActivity.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\QrCodeController::generateForActivity
 * @see app/Http/Controllers/Api/QrCodeController.php:92
 * @route '/api/v1/qr-codes/generate/activity'
 */
generateForActivity.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateForActivity.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\QrCodeController::generateForActivity
 * @see app/Http/Controllers/Api/QrCodeController.php:92
 * @route '/api/v1/qr-codes/generate/activity'
 */
    const generateForActivityForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: generateForActivity.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\QrCodeController::generateForActivity
 * @see app/Http/Controllers/Api/QrCodeController.php:92
 * @route '/api/v1/qr-codes/generate/activity'
 */
        generateForActivityForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: generateForActivity.url(options),
            method: 'post',
        })
    
    generateForActivity.form = generateForActivityForm
/**
* @see \App\Http\Controllers\Api\QrCodeController::regenerate
 * @see app/Http/Controllers/Api/QrCodeController.php:229
 * @route '/api/v1/qr-codes/regenerate'
 */
export const regenerate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerate.url(options),
    method: 'post',
})

regenerate.definition = {
    methods: ["post"],
    url: '/api/v1/qr-codes/regenerate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\QrCodeController::regenerate
 * @see app/Http/Controllers/Api/QrCodeController.php:229
 * @route '/api/v1/qr-codes/regenerate'
 */
regenerate.url = (options?: RouteQueryOptions) => {
    return regenerate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\QrCodeController::regenerate
 * @see app/Http/Controllers/Api/QrCodeController.php:229
 * @route '/api/v1/qr-codes/regenerate'
 */
regenerate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerate.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\QrCodeController::regenerate
 * @see app/Http/Controllers/Api/QrCodeController.php:229
 * @route '/api/v1/qr-codes/regenerate'
 */
    const regenerateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: regenerate.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\QrCodeController::regenerate
 * @see app/Http/Controllers/Api/QrCodeController.php:229
 * @route '/api/v1/qr-codes/regenerate'
 */
        regenerateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: regenerate.url(options),
            method: 'post',
        })
    
    regenerate.form = regenerateForm
/**
* @see \App\Http\Controllers\Api\QrCodeController::cleanupExpired
 * @see app/Http/Controllers/Api/QrCodeController.php:284
 * @route '/api/v1/qr-codes/cleanup-expired'
 */
export const cleanupExpired = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cleanupExpired.url(options),
    method: 'post',
})

cleanupExpired.definition = {
    methods: ["post"],
    url: '/api/v1/qr-codes/cleanup-expired',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\QrCodeController::cleanupExpired
 * @see app/Http/Controllers/Api/QrCodeController.php:284
 * @route '/api/v1/qr-codes/cleanup-expired'
 */
cleanupExpired.url = (options?: RouteQueryOptions) => {
    return cleanupExpired.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\QrCodeController::cleanupExpired
 * @see app/Http/Controllers/Api/QrCodeController.php:284
 * @route '/api/v1/qr-codes/cleanup-expired'
 */
cleanupExpired.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cleanupExpired.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\QrCodeController::cleanupExpired
 * @see app/Http/Controllers/Api/QrCodeController.php:284
 * @route '/api/v1/qr-codes/cleanup-expired'
 */
    const cleanupExpiredForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cleanupExpired.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\QrCodeController::cleanupExpired
 * @see app/Http/Controllers/Api/QrCodeController.php:284
 * @route '/api/v1/qr-codes/cleanup-expired'
 */
        cleanupExpiredForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cleanupExpired.url(options),
            method: 'post',
        })
    
    cleanupExpired.form = cleanupExpiredForm
/**
* @see \App\Http\Controllers\Api\QrCodeController::getParticipantQrCodes
 * @see app/Http/Controllers/Api/QrCodeController.php:312
 * @route '/api/v1/qr-codes/participant/{participant_id}'
 */
export const getParticipantQrCodes = (args: { participant_id: string | number } | [participant_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getParticipantQrCodes.url(args, options),
    method: 'get',
})

getParticipantQrCodes.definition = {
    methods: ["get","head"],
    url: '/api/v1/qr-codes/participant/{participant_id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\QrCodeController::getParticipantQrCodes
 * @see app/Http/Controllers/Api/QrCodeController.php:312
 * @route '/api/v1/qr-codes/participant/{participant_id}'
 */
getParticipantQrCodes.url = (args: { participant_id: string | number } | [participant_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { participant_id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    participant_id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        participant_id: args.participant_id,
                }

    return getParticipantQrCodes.definition.url
            .replace('{participant_id}', parsedArgs.participant_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\QrCodeController::getParticipantQrCodes
 * @see app/Http/Controllers/Api/QrCodeController.php:312
 * @route '/api/v1/qr-codes/participant/{participant_id}'
 */
getParticipantQrCodes.get = (args: { participant_id: string | number } | [participant_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getParticipantQrCodes.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\QrCodeController::getParticipantQrCodes
 * @see app/Http/Controllers/Api/QrCodeController.php:312
 * @route '/api/v1/qr-codes/participant/{participant_id}'
 */
getParticipantQrCodes.head = (args: { participant_id: string | number } | [participant_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getParticipantQrCodes.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\QrCodeController::getParticipantQrCodes
 * @see app/Http/Controllers/Api/QrCodeController.php:312
 * @route '/api/v1/qr-codes/participant/{participant_id}'
 */
    const getParticipantQrCodesForm = (args: { participant_id: string | number } | [participant_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getParticipantQrCodes.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\QrCodeController::getParticipantQrCodes
 * @see app/Http/Controllers/Api/QrCodeController.php:312
 * @route '/api/v1/qr-codes/participant/{participant_id}'
 */
        getParticipantQrCodesForm.get = (args: { participant_id: string | number } | [participant_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getParticipantQrCodes.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\QrCodeController::getParticipantQrCodes
 * @see app/Http/Controllers/Api/QrCodeController.php:312
 * @route '/api/v1/qr-codes/participant/{participant_id}'
 */
        getParticipantQrCodesForm.head = (args: { participant_id: string | number } | [participant_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getParticipantQrCodes.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getParticipantQrCodes.form = getParticipantQrCodesForm
/**
* @see \App\Http\Controllers\Api\QrCodeController::getActivityStats
 * @see app/Http/Controllers/Api/QrCodeController.php:188
 * @route '/api/v1/qr-codes/activity/{activity_id}/stats'
 */
export const getActivityStats = (args: { activity_id: string | number } | [activity_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getActivityStats.url(args, options),
    method: 'get',
})

getActivityStats.definition = {
    methods: ["get","head"],
    url: '/api/v1/qr-codes/activity/{activity_id}/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\QrCodeController::getActivityStats
 * @see app/Http/Controllers/Api/QrCodeController.php:188
 * @route '/api/v1/qr-codes/activity/{activity_id}/stats'
 */
getActivityStats.url = (args: { activity_id: string | number } | [activity_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity_id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    activity_id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activity_id: args.activity_id,
                }

    return getActivityStats.definition.url
            .replace('{activity_id}', parsedArgs.activity_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\QrCodeController::getActivityStats
 * @see app/Http/Controllers/Api/QrCodeController.php:188
 * @route '/api/v1/qr-codes/activity/{activity_id}/stats'
 */
getActivityStats.get = (args: { activity_id: string | number } | [activity_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getActivityStats.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\QrCodeController::getActivityStats
 * @see app/Http/Controllers/Api/QrCodeController.php:188
 * @route '/api/v1/qr-codes/activity/{activity_id}/stats'
 */
getActivityStats.head = (args: { activity_id: string | number } | [activity_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getActivityStats.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\QrCodeController::getActivityStats
 * @see app/Http/Controllers/Api/QrCodeController.php:188
 * @route '/api/v1/qr-codes/activity/{activity_id}/stats'
 */
    const getActivityStatsForm = (args: { activity_id: string | number } | [activity_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getActivityStats.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\QrCodeController::getActivityStats
 * @see app/Http/Controllers/Api/QrCodeController.php:188
 * @route '/api/v1/qr-codes/activity/{activity_id}/stats'
 */
        getActivityStatsForm.get = (args: { activity_id: string | number } | [activity_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getActivityStats.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\QrCodeController::getActivityStats
 * @see app/Http/Controllers/Api/QrCodeController.php:188
 * @route '/api/v1/qr-codes/activity/{activity_id}/stats'
 */
        getActivityStatsForm.head = (args: { activity_id: string | number } | [activity_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getActivityStats.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getActivityStats.form = getActivityStatsForm
const QrCodeController = { show, generateForRegistration, generateForActivity, regenerate, cleanupExpired, getParticipantQrCodes, getActivityStats }

export default QrCodeController