import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\AttendanceController::checkInByEmail
 * @see app/Http/Controllers/Api/AttendanceController.php:75
 * @route '/api/v1/attendance/check-in-email'
 */
export const checkInByEmail = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkInByEmail.url(options),
    method: 'post',
})

checkInByEmail.definition = {
    methods: ["post"],
    url: '/api/v1/attendance/check-in-email',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AttendanceController::checkInByEmail
 * @see app/Http/Controllers/Api/AttendanceController.php:75
 * @route '/api/v1/attendance/check-in-email'
 */
checkInByEmail.url = (options?: RouteQueryOptions) => {
    return checkInByEmail.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::checkInByEmail
 * @see app/Http/Controllers/Api/AttendanceController.php:75
 * @route '/api/v1/attendance/check-in-email'
 */
checkInByEmail.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkInByEmail.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\AttendanceController::checkInByEmail
 * @see app/Http/Controllers/Api/AttendanceController.php:75
 * @route '/api/v1/attendance/check-in-email'
 */
    const checkInByEmailForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: checkInByEmail.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AttendanceController::checkInByEmail
 * @see app/Http/Controllers/Api/AttendanceController.php:75
 * @route '/api/v1/attendance/check-in-email'
 */
        checkInByEmailForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: checkInByEmail.url(options),
            method: 'post',
        })
    
    checkInByEmail.form = checkInByEmailForm
/**
* @see \App\Http\Controllers\Api\AttendanceController::validateQrCode
 * @see app/Http/Controllers/Api/AttendanceController.php:28
 * @route '/api/v1/attendance/validate-qr'
 */
export const validateQrCode = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateQrCode.url(options),
    method: 'post',
})

validateQrCode.definition = {
    methods: ["post"],
    url: '/api/v1/attendance/validate-qr',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AttendanceController::validateQrCode
 * @see app/Http/Controllers/Api/AttendanceController.php:28
 * @route '/api/v1/attendance/validate-qr'
 */
validateQrCode.url = (options?: RouteQueryOptions) => {
    return validateQrCode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::validateQrCode
 * @see app/Http/Controllers/Api/AttendanceController.php:28
 * @route '/api/v1/attendance/validate-qr'
 */
validateQrCode.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateQrCode.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\AttendanceController::validateQrCode
 * @see app/Http/Controllers/Api/AttendanceController.php:28
 * @route '/api/v1/attendance/validate-qr'
 */
    const validateQrCodeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: validateQrCode.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AttendanceController::validateQrCode
 * @see app/Http/Controllers/Api/AttendanceController.php:28
 * @route '/api/v1/attendance/validate-qr'
 */
        validateQrCodeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: validateQrCode.url(options),
            method: 'post',
        })
    
    validateQrCode.form = validateQrCodeForm
/**
* @see \App\Http\Controllers\Api\AttendanceController::index
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/v1/attendances',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AttendanceController::index
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::index
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\AttendanceController::index
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\AttendanceController::index
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\AttendanceController::index
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\AttendanceController::index
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances'
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
* @see \App\Http\Controllers\Api\AttendanceController::store
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/v1/attendances',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AttendanceController::store
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::store
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\AttendanceController::store
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AttendanceController::store
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\AttendanceController::show
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
export const show = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/attendances/{attendance}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AttendanceController::show
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
show.url = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attendance: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    attendance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        attendance: args.attendance,
                }

    return show.definition.url
            .replace('{attendance}', parsedArgs.attendance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::show
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
show.get = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\AttendanceController::show
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
show.head = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\AttendanceController::show
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
    const showForm = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\AttendanceController::show
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
        showForm.get = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\AttendanceController::show
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
        showForm.head = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\AttendanceController::update
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
export const update = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/attendances/{attendance}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\AttendanceController::update
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
update.url = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attendance: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    attendance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        attendance: args.attendance,
                }

    return update.definition.url
            .replace('{attendance}', parsedArgs.attendance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::update
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
update.put = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Api\AttendanceController::update
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
update.patch = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\AttendanceController::update
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
    const updateForm = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AttendanceController::update
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
        updateForm.put = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Api\AttendanceController::update
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
        updateForm.patch = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\AttendanceController::destroy
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
export const destroy = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/attendances/{attendance}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\AttendanceController::destroy
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
destroy.url = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attendance: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    attendance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        attendance: args.attendance,
                }

    return destroy.definition.url
            .replace('{attendance}', parsedArgs.attendance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::destroy
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
destroy.delete = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Api\AttendanceController::destroy
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
    const destroyForm = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AttendanceController::destroy
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/{attendance}'
 */
        destroyForm.delete = (args: { attendance: string | number } | [attendance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\AttendanceController::checkOut
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/check-out'
 */
export const checkOut = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkOut.url(options),
    method: 'post',
})

checkOut.definition = {
    methods: ["post"],
    url: '/api/v1/attendances/check-out',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AttendanceController::checkOut
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/check-out'
 */
checkOut.url = (options?: RouteQueryOptions) => {
    return checkOut.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::checkOut
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/check-out'
 */
checkOut.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkOut.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\AttendanceController::checkOut
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/check-out'
 */
    const checkOutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: checkOut.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AttendanceController::checkOut
 * @see app/Http/Controllers/Api/AttendanceController.php:0
 * @route '/api/v1/attendances/check-out'
 */
        checkOutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: checkOut.url(options),
            method: 'post',
        })
    
    checkOut.form = checkOutForm
/**
* @see \App\Http\Controllers\Api\AttendanceController::report
 * @see app/Http/Controllers/Api/AttendanceController.php:252
 * @route '/api/v1/attendances/report'
 */
const reportb48ef142eb5f5695bcd057b817ade407 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reportb48ef142eb5f5695bcd057b817ade407.url(options),
    method: 'get',
})

reportb48ef142eb5f5695bcd057b817ade407.definition = {
    methods: ["get","head"],
    url: '/api/v1/attendances/report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AttendanceController::report
 * @see app/Http/Controllers/Api/AttendanceController.php:252
 * @route '/api/v1/attendances/report'
 */
reportb48ef142eb5f5695bcd057b817ade407.url = (options?: RouteQueryOptions) => {
    return reportb48ef142eb5f5695bcd057b817ade407.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::report
 * @see app/Http/Controllers/Api/AttendanceController.php:252
 * @route '/api/v1/attendances/report'
 */
reportb48ef142eb5f5695bcd057b817ade407.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reportb48ef142eb5f5695bcd057b817ade407.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\AttendanceController::report
 * @see app/Http/Controllers/Api/AttendanceController.php:252
 * @route '/api/v1/attendances/report'
 */
reportb48ef142eb5f5695bcd057b817ade407.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reportb48ef142eb5f5695bcd057b817ade407.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\AttendanceController::report
 * @see app/Http/Controllers/Api/AttendanceController.php:252
 * @route '/api/v1/attendances/report'
 */
    const reportb48ef142eb5f5695bcd057b817ade407Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reportb48ef142eb5f5695bcd057b817ade407.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\AttendanceController::report
 * @see app/Http/Controllers/Api/AttendanceController.php:252
 * @route '/api/v1/attendances/report'
 */
        reportb48ef142eb5f5695bcd057b817ade407Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reportb48ef142eb5f5695bcd057b817ade407.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\AttendanceController::report
 * @see app/Http/Controllers/Api/AttendanceController.php:252
 * @route '/api/v1/attendances/report'
 */
        reportb48ef142eb5f5695bcd057b817ade407Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reportb48ef142eb5f5695bcd057b817ade407.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reportb48ef142eb5f5695bcd057b817ade407.form = reportb48ef142eb5f5695bcd057b817ade407Form
    /**
* @see \App\Http\Controllers\Api\AttendanceController::report
 * @see app/Http/Controllers/Api/AttendanceController.php:252
 * @route '/api/v1/admin/reports/attendance'
 */
const report4da0f3b3fd375f57c74d9131d29b7ae6 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: report4da0f3b3fd375f57c74d9131d29b7ae6.url(options),
    method: 'get',
})

report4da0f3b3fd375f57c74d9131d29b7ae6.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/reports/attendance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AttendanceController::report
 * @see app/Http/Controllers/Api/AttendanceController.php:252
 * @route '/api/v1/admin/reports/attendance'
 */
report4da0f3b3fd375f57c74d9131d29b7ae6.url = (options?: RouteQueryOptions) => {
    return report4da0f3b3fd375f57c74d9131d29b7ae6.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::report
 * @see app/Http/Controllers/Api/AttendanceController.php:252
 * @route '/api/v1/admin/reports/attendance'
 */
report4da0f3b3fd375f57c74d9131d29b7ae6.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: report4da0f3b3fd375f57c74d9131d29b7ae6.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\AttendanceController::report
 * @see app/Http/Controllers/Api/AttendanceController.php:252
 * @route '/api/v1/admin/reports/attendance'
 */
report4da0f3b3fd375f57c74d9131d29b7ae6.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: report4da0f3b3fd375f57c74d9131d29b7ae6.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\AttendanceController::report
 * @see app/Http/Controllers/Api/AttendanceController.php:252
 * @route '/api/v1/admin/reports/attendance'
 */
    const report4da0f3b3fd375f57c74d9131d29b7ae6Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: report4da0f3b3fd375f57c74d9131d29b7ae6.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\AttendanceController::report
 * @see app/Http/Controllers/Api/AttendanceController.php:252
 * @route '/api/v1/admin/reports/attendance'
 */
        report4da0f3b3fd375f57c74d9131d29b7ae6Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: report4da0f3b3fd375f57c74d9131d29b7ae6.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\AttendanceController::report
 * @see app/Http/Controllers/Api/AttendanceController.php:252
 * @route '/api/v1/admin/reports/attendance'
 */
        report4da0f3b3fd375f57c74d9131d29b7ae6Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: report4da0f3b3fd375f57c74d9131d29b7ae6.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    report4da0f3b3fd375f57c74d9131d29b7ae6.form = report4da0f3b3fd375f57c74d9131d29b7ae6Form

export const report = {
    '/api/v1/attendances/report': reportb48ef142eb5f5695bcd057b817ade407,
    '/api/v1/admin/reports/attendance': report4da0f3b3fd375f57c74d9131d29b7ae6,
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::getStats
 * @see app/Http/Controllers/Api/AttendanceController.php:293
 * @route '/api/v1/admin/attendance/stats'
 */
export const getStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStats.url(options),
    method: 'get',
})

getStats.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/attendance/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AttendanceController::getStats
 * @see app/Http/Controllers/Api/AttendanceController.php:293
 * @route '/api/v1/admin/attendance/stats'
 */
getStats.url = (options?: RouteQueryOptions) => {
    return getStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::getStats
 * @see app/Http/Controllers/Api/AttendanceController.php:293
 * @route '/api/v1/admin/attendance/stats'
 */
getStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\AttendanceController::getStats
 * @see app/Http/Controllers/Api/AttendanceController.php:293
 * @route '/api/v1/admin/attendance/stats'
 */
getStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\AttendanceController::getStats
 * @see app/Http/Controllers/Api/AttendanceController.php:293
 * @route '/api/v1/admin/attendance/stats'
 */
    const getStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getStats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\AttendanceController::getStats
 * @see app/Http/Controllers/Api/AttendanceController.php:293
 * @route '/api/v1/admin/attendance/stats'
 */
        getStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getStats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\AttendanceController::getStats
 * @see app/Http/Controllers/Api/AttendanceController.php:293
 * @route '/api/v1/admin/attendance/stats'
 */
        getStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getStats.form = getStatsForm
/**
* @see \App\Http\Controllers\Api\AttendanceController::exportExcel
 * @see app/Http/Controllers/Api/AttendanceController.php:353
 * @route '/api/v1/admin/attendance/export-excel'
 */
export const exportExcel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportExcel.url(options),
    method: 'get',
})

exportExcel.definition = {
    methods: ["get","head"],
    url: '/api/v1/admin/attendance/export-excel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AttendanceController::exportExcel
 * @see app/Http/Controllers/Api/AttendanceController.php:353
 * @route '/api/v1/admin/attendance/export-excel'
 */
exportExcel.url = (options?: RouteQueryOptions) => {
    return exportExcel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::exportExcel
 * @see app/Http/Controllers/Api/AttendanceController.php:353
 * @route '/api/v1/admin/attendance/export-excel'
 */
exportExcel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportExcel.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\AttendanceController::exportExcel
 * @see app/Http/Controllers/Api/AttendanceController.php:353
 * @route '/api/v1/admin/attendance/export-excel'
 */
exportExcel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportExcel.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\AttendanceController::exportExcel
 * @see app/Http/Controllers/Api/AttendanceController.php:353
 * @route '/api/v1/admin/attendance/export-excel'
 */
    const exportExcelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportExcel.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\AttendanceController::exportExcel
 * @see app/Http/Controllers/Api/AttendanceController.php:353
 * @route '/api/v1/admin/attendance/export-excel'
 */
        exportExcelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportExcel.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\AttendanceController::exportExcel
 * @see app/Http/Controllers/Api/AttendanceController.php:353
 * @route '/api/v1/admin/attendance/export-excel'
 */
        exportExcelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportExcel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportExcel.form = exportExcelForm
const AttendanceController = { checkInByEmail, validateQrCode, index, store, show, update, destroy, checkOut, report, getStats, exportExcel }

export default AttendanceController