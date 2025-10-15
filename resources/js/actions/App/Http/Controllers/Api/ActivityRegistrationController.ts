import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ActivityRegistrationController::checkRegistration
 * @see app/Http/Controllers/Api/ActivityRegistrationController.php:222
 * @route '/api/v1/activities/{activity}/check-registration'
 */
export const checkRegistration = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkRegistration.url(args, options),
    method: 'post',
})

checkRegistration.definition = {
    methods: ["post"],
    url: '/api/v1/activities/{activity}/check-registration',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ActivityRegistrationController::checkRegistration
 * @see app/Http/Controllers/Api/ActivityRegistrationController.php:222
 * @route '/api/v1/activities/{activity}/check-registration'
 */
checkRegistration.url = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return checkRegistration.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityRegistrationController::checkRegistration
 * @see app/Http/Controllers/Api/ActivityRegistrationController.php:222
 * @route '/api/v1/activities/{activity}/check-registration'
 */
checkRegistration.post = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkRegistration.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ActivityRegistrationController::checkRegistration
 * @see app/Http/Controllers/Api/ActivityRegistrationController.php:222
 * @route '/api/v1/activities/{activity}/check-registration'
 */
    const checkRegistrationForm = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: checkRegistration.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityRegistrationController::checkRegistration
 * @see app/Http/Controllers/Api/ActivityRegistrationController.php:222
 * @route '/api/v1/activities/{activity}/check-registration'
 */
        checkRegistrationForm.post = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: checkRegistration.url(args, options),
            method: 'post',
        })
    
    checkRegistration.form = checkRegistrationForm
/**
* @see \App\Http\Controllers\Api\ActivityRegistrationController::myActivities
 * @see app/Http/Controllers/Api/ActivityRegistrationController.php:172
 * @route '/api/v1/my-activities'
 */
export const myActivities = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myActivities.url(options),
    method: 'get',
})

myActivities.definition = {
    methods: ["get","head"],
    url: '/api/v1/my-activities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ActivityRegistrationController::myActivities
 * @see app/Http/Controllers/Api/ActivityRegistrationController.php:172
 * @route '/api/v1/my-activities'
 */
myActivities.url = (options?: RouteQueryOptions) => {
    return myActivities.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityRegistrationController::myActivities
 * @see app/Http/Controllers/Api/ActivityRegistrationController.php:172
 * @route '/api/v1/my-activities'
 */
myActivities.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myActivities.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\ActivityRegistrationController::myActivities
 * @see app/Http/Controllers/Api/ActivityRegistrationController.php:172
 * @route '/api/v1/my-activities'
 */
myActivities.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myActivities.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\ActivityRegistrationController::myActivities
 * @see app/Http/Controllers/Api/ActivityRegistrationController.php:172
 * @route '/api/v1/my-activities'
 */
    const myActivitiesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: myActivities.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityRegistrationController::myActivities
 * @see app/Http/Controllers/Api/ActivityRegistrationController.php:172
 * @route '/api/v1/my-activities'
 */
        myActivitiesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: myActivities.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\ActivityRegistrationController::myActivities
 * @see app/Http/Controllers/Api/ActivityRegistrationController.php:172
 * @route '/api/v1/my-activities'
 */
        myActivitiesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: myActivities.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    myActivities.form = myActivitiesForm
/**
* @see \App\Http\Controllers\Api\ActivityRegistrationController::cancel
 * @see app/Http/Controllers/Api/ActivityRegistrationController.php:119
 * @route '/api/v1/activities/{activity}/cancel'
 */
export const cancel = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/api/v1/activities/{activity}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ActivityRegistrationController::cancel
 * @see app/Http/Controllers/Api/ActivityRegistrationController.php:119
 * @route '/api/v1/activities/{activity}/cancel'
 */
cancel.url = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return cancel.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ActivityRegistrationController::cancel
 * @see app/Http/Controllers/Api/ActivityRegistrationController.php:119
 * @route '/api/v1/activities/{activity}/cancel'
 */
cancel.post = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\ActivityRegistrationController::cancel
 * @see app/Http/Controllers/Api/ActivityRegistrationController.php:119
 * @route '/api/v1/activities/{activity}/cancel'
 */
    const cancelForm = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\ActivityRegistrationController::cancel
 * @see app/Http/Controllers/Api/ActivityRegistrationController.php:119
 * @route '/api/v1/activities/{activity}/cancel'
 */
        cancelForm.post = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(args, options),
            method: 'post',
        })
    
    cancel.form = cancelForm
const ActivityRegistrationController = { checkRegistration, myActivities, cancel }

export default ActivityRegistrationController