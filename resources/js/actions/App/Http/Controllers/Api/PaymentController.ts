import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\PaymentController::create
 * @see app/Http/Controllers/Api/PaymentController.php:19
 * @route '/api/v1/activities/{activity}/payments'
 */
export const create = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(args, options),
    method: 'post',
})

create.definition = {
    methods: ["post"],
    url: '/api/v1/activities/{activity}/payments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\PaymentController::create
 * @see app/Http/Controllers/Api/PaymentController.php:19
 * @route '/api/v1/activities/{activity}/payments'
 */
create.url = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PaymentController::create
 * @see app/Http/Controllers/Api/PaymentController.php:19
 * @route '/api/v1/activities/{activity}/payments'
 */
create.post = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\PaymentController::create
 * @see app/Http/Controllers/Api/PaymentController.php:19
 * @route '/api/v1/activities/{activity}/payments'
 */
    const createForm = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: create.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\PaymentController::create
 * @see app/Http/Controllers/Api/PaymentController.php:19
 * @route '/api/v1/activities/{activity}/payments'
 */
        createForm.post = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: create.url(args, options),
            method: 'post',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Api\PaymentController::uploadProof
 * @see app/Http/Controllers/Api/PaymentController.php:100
 * @route '/api/v1/payments/{payment}/upload-proof'
 */
export const uploadProof = (args: { payment: string | number | { id: string | number } } | [payment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadProof.url(args, options),
    method: 'post',
})

uploadProof.definition = {
    methods: ["post"],
    url: '/api/v1/payments/{payment}/upload-proof',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\PaymentController::uploadProof
 * @see app/Http/Controllers/Api/PaymentController.php:100
 * @route '/api/v1/payments/{payment}/upload-proof'
 */
uploadProof.url = (args: { payment: string | number | { id: string | number } } | [payment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { payment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    payment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payment: typeof args.payment === 'object'
                ? args.payment.id
                : args.payment,
                }

    return uploadProof.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PaymentController::uploadProof
 * @see app/Http/Controllers/Api/PaymentController.php:100
 * @route '/api/v1/payments/{payment}/upload-proof'
 */
uploadProof.post = (args: { payment: string | number | { id: string | number } } | [payment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadProof.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\PaymentController::uploadProof
 * @see app/Http/Controllers/Api/PaymentController.php:100
 * @route '/api/v1/payments/{payment}/upload-proof'
 */
    const uploadProofForm = (args: { payment: string | number | { id: string | number } } | [payment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadProof.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\PaymentController::uploadProof
 * @see app/Http/Controllers/Api/PaymentController.php:100
 * @route '/api/v1/payments/{payment}/upload-proof'
 */
        uploadProofForm.post = (args: { payment: string | number | { id: string | number } } | [payment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadProof.url(args, options),
            method: 'post',
        })
    
    uploadProof.form = uploadProofForm
/**
* @see \App\Http\Controllers\Api\PaymentController::checkPaymentStatus
 * @see app/Http/Controllers/Api/PaymentController.php:202
 * @route '/api/v1/activities/{activity}/check-payment'
 */
export const checkPaymentStatus = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkPaymentStatus.url(args, options),
    method: 'get',
})

checkPaymentStatus.definition = {
    methods: ["get","head"],
    url: '/api/v1/activities/{activity}/check-payment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\PaymentController::checkPaymentStatus
 * @see app/Http/Controllers/Api/PaymentController.php:202
 * @route '/api/v1/activities/{activity}/check-payment'
 */
checkPaymentStatus.url = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return checkPaymentStatus.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PaymentController::checkPaymentStatus
 * @see app/Http/Controllers/Api/PaymentController.php:202
 * @route '/api/v1/activities/{activity}/check-payment'
 */
checkPaymentStatus.get = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkPaymentStatus.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\PaymentController::checkPaymentStatus
 * @see app/Http/Controllers/Api/PaymentController.php:202
 * @route '/api/v1/activities/{activity}/check-payment'
 */
checkPaymentStatus.head = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkPaymentStatus.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\PaymentController::checkPaymentStatus
 * @see app/Http/Controllers/Api/PaymentController.php:202
 * @route '/api/v1/activities/{activity}/check-payment'
 */
    const checkPaymentStatusForm = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: checkPaymentStatus.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\PaymentController::checkPaymentStatus
 * @see app/Http/Controllers/Api/PaymentController.php:202
 * @route '/api/v1/activities/{activity}/check-payment'
 */
        checkPaymentStatusForm.get = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: checkPaymentStatus.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\PaymentController::checkPaymentStatus
 * @see app/Http/Controllers/Api/PaymentController.php:202
 * @route '/api/v1/activities/{activity}/check-payment'
 */
        checkPaymentStatusForm.head = (args: { activity: string | number | { id: string | number } } | [activity: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: checkPaymentStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    checkPaymentStatus.form = checkPaymentStatusForm
/**
* @see \App\Http\Controllers\Api\PaymentController::myPayments
 * @see app/Http/Controllers/Api/PaymentController.php:182
 * @route '/api/v1/my-payments'
 */
export const myPayments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myPayments.url(options),
    method: 'get',
})

myPayments.definition = {
    methods: ["get","head"],
    url: '/api/v1/my-payments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\PaymentController::myPayments
 * @see app/Http/Controllers/Api/PaymentController.php:182
 * @route '/api/v1/my-payments'
 */
myPayments.url = (options?: RouteQueryOptions) => {
    return myPayments.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PaymentController::myPayments
 * @see app/Http/Controllers/Api/PaymentController.php:182
 * @route '/api/v1/my-payments'
 */
myPayments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myPayments.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\PaymentController::myPayments
 * @see app/Http/Controllers/Api/PaymentController.php:182
 * @route '/api/v1/my-payments'
 */
myPayments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myPayments.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\PaymentController::myPayments
 * @see app/Http/Controllers/Api/PaymentController.php:182
 * @route '/api/v1/my-payments'
 */
    const myPaymentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: myPayments.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\PaymentController::myPayments
 * @see app/Http/Controllers/Api/PaymentController.php:182
 * @route '/api/v1/my-payments'
 */
        myPaymentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: myPayments.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\PaymentController::myPayments
 * @see app/Http/Controllers/Api/PaymentController.php:182
 * @route '/api/v1/my-payments'
 */
        myPaymentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: myPayments.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    myPayments.form = myPaymentsForm
/**
* @see \App\Http\Controllers\Api\PaymentController::confirm
 * @see app/Http/Controllers/Api/PaymentController.php:141
 * @route '/api/v1/admin/payments/{payment}/confirm'
 */
export const confirm = (args: { payment: string | number | { id: string | number } } | [payment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirm.url(args, options),
    method: 'post',
})

confirm.definition = {
    methods: ["post"],
    url: '/api/v1/admin/payments/{payment}/confirm',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\PaymentController::confirm
 * @see app/Http/Controllers/Api/PaymentController.php:141
 * @route '/api/v1/admin/payments/{payment}/confirm'
 */
confirm.url = (args: { payment: string | number | { id: string | number } } | [payment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { payment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    payment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payment: typeof args.payment === 'object'
                ? args.payment.id
                : args.payment,
                }

    return confirm.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PaymentController::confirm
 * @see app/Http/Controllers/Api/PaymentController.php:141
 * @route '/api/v1/admin/payments/{payment}/confirm'
 */
confirm.post = (args: { payment: string | number | { id: string | number } } | [payment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirm.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\PaymentController::confirm
 * @see app/Http/Controllers/Api/PaymentController.php:141
 * @route '/api/v1/admin/payments/{payment}/confirm'
 */
    const confirmForm = (args: { payment: string | number | { id: string | number } } | [payment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: confirm.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\PaymentController::confirm
 * @see app/Http/Controllers/Api/PaymentController.php:141
 * @route '/api/v1/admin/payments/{payment}/confirm'
 */
        confirmForm.post = (args: { payment: string | number | { id: string | number } } | [payment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: confirm.url(args, options),
            method: 'post',
        })
    
    confirm.form = confirmForm
/**
* @see \App\Http\Controllers\Api\PaymentController::reject
 * @see app/Http/Controllers/Api/PaymentController.php:161
 * @route '/api/v1/admin/payments/{payment}/reject'
 */
export const reject = (args: { payment: string | number | { id: string | number } } | [payment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/api/v1/admin/payments/{payment}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\PaymentController::reject
 * @see app/Http/Controllers/Api/PaymentController.php:161
 * @route '/api/v1/admin/payments/{payment}/reject'
 */
reject.url = (args: { payment: string | number | { id: string | number } } | [payment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { payment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    payment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payment: typeof args.payment === 'object'
                ? args.payment.id
                : args.payment,
                }

    return reject.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PaymentController::reject
 * @see app/Http/Controllers/Api/PaymentController.php:161
 * @route '/api/v1/admin/payments/{payment}/reject'
 */
reject.post = (args: { payment: string | number | { id: string | number } } | [payment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\PaymentController::reject
 * @see app/Http/Controllers/Api/PaymentController.php:161
 * @route '/api/v1/admin/payments/{payment}/reject'
 */
    const rejectForm = (args: { payment: string | number | { id: string | number } } | [payment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\PaymentController::reject
 * @see app/Http/Controllers/Api/PaymentController.php:161
 * @route '/api/v1/admin/payments/{payment}/reject'
 */
        rejectForm.post = (args: { payment: string | number | { id: string | number } } | [payment: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
const PaymentController = { create, uploadProof, checkPaymentStatus, myPayments, confirm, reject }

export default PaymentController