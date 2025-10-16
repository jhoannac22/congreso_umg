import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\AttendanceController::checkInByEmail
* @see app/Http/Controllers/Api/AttendanceController.php:510
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
* @see app/Http/Controllers/Api/AttendanceController.php:510
* @route '/api/v1/attendance/check-in-email'
*/
checkInByEmail.url = (options?: RouteQueryOptions) => {




    return checkInByEmail.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::checkInByEmail
* @see app/Http/Controllers/Api/AttendanceController.php:510
* @route '/api/v1/attendance/check-in-email'
*/
checkInByEmail.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkInByEmail.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::checkInByEmail
* @see app/Http/Controllers/Api/AttendanceController.php:510
* @route '/api/v1/attendance/check-in-email'
*/
const checkInByEmailForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: checkInByEmail.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::checkInByEmail
* @see app/Http/Controllers/Api/AttendanceController.php:510
* @route '/api/v1/attendance/check-in-email'
*/
checkInByEmailForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: checkInByEmail.url(options),
    method: 'post',
})

checkInByEmail.form = checkInByEmailForm

/**
* @see \App\Http\Controllers\Api\AttendanceController::index
* @see app/Http/Controllers/Api/AttendanceController.php:29
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
* @see app/Http/Controllers/Api/AttendanceController.php:29
* @route '/api/v1/attendances'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::index
* @see app/Http/Controllers/Api/AttendanceController.php:29
* @route '/api/v1/attendances'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::index
* @see app/Http/Controllers/Api/AttendanceController.php:29
* @route '/api/v1/attendances'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::index
* @see app/Http/Controllers/Api/AttendanceController.php:29
* @route '/api/v1/attendances'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::index
* @see app/Http/Controllers/Api/AttendanceController.php:29
* @route '/api/v1/attendances'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::index
* @see app/Http/Controllers/Api/AttendanceController.php:29
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
* @see app/Http/Controllers/Api/AttendanceController.php:71
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
* @see app/Http/Controllers/Api/AttendanceController.php:71
* @route '/api/v1/attendances'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::store
* @see app/Http/Controllers/Api/AttendanceController.php:71
* @route '/api/v1/attendances'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::store
* @see app/Http/Controllers/Api/AttendanceController.php:71
* @route '/api/v1/attendances'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::store
* @see app/Http/Controllers/Api/AttendanceController.php:71
* @route '/api/v1/attendances'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\AttendanceController::show
* @see app/Http/Controllers/Api/AttendanceController.php:99
* @route '/api/v1/attendances/{attendance}'
*/
export const show = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/v1/attendances/{attendance}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AttendanceController::show
* @see app/Http/Controllers/Api/AttendanceController.php:99
* @route '/api/v1/attendances/{attendance}'
*/
show.url = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attendance: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { attendance: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            attendance: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        attendance: typeof args.attendance === 'object'
        ? args.attendance.id
        : args.attendance,
    }

    return show.definition.url
            .replace('{attendance}', parsedArgs.attendance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::show
* @see app/Http/Controllers/Api/AttendanceController.php:99
* @route '/api/v1/attendances/{attendance}'
*/
show.get = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::show
* @see app/Http/Controllers/Api/AttendanceController.php:99
* @route '/api/v1/attendances/{attendance}'
*/
show.head = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::show
* @see app/Http/Controllers/Api/AttendanceController.php:99
* @route '/api/v1/attendances/{attendance}'
*/
const showForm = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::show
* @see app/Http/Controllers/Api/AttendanceController.php:99
* @route '/api/v1/attendances/{attendance}'
*/
showForm.get = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::show
* @see app/Http/Controllers/Api/AttendanceController.php:99
* @route '/api/v1/attendances/{attendance}'
*/
showForm.head = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see app/Http/Controllers/Api/AttendanceController.php:112
* @route '/api/v1/attendances/{attendance}'
*/
export const update = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/v1/attendances/{attendance}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\AttendanceController::update
* @see app/Http/Controllers/Api/AttendanceController.php:112
* @route '/api/v1/attendances/{attendance}'
*/
update.url = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attendance: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { attendance: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            attendance: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        attendance: typeof args.attendance === 'object'
        ? args.attendance.id
        : args.attendance,
    }

    return update.definition.url
            .replace('{attendance}', parsedArgs.attendance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::update
* @see app/Http/Controllers/Api/AttendanceController.php:112
* @route '/api/v1/attendances/{attendance}'
*/
update.put = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::update
* @see app/Http/Controllers/Api/AttendanceController.php:112
* @route '/api/v1/attendances/{attendance}'
*/
update.patch = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::update
* @see app/Http/Controllers/Api/AttendanceController.php:112
* @route '/api/v1/attendances/{attendance}'
*/
const updateForm = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Api/AttendanceController.php:112
* @route '/api/v1/attendances/{attendance}'
*/
updateForm.put = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Api/AttendanceController.php:112
* @route '/api/v1/attendances/{attendance}'
*/
updateForm.patch = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Api/AttendanceController.php:129
* @route '/api/v1/attendances/{attendance}'
*/
export const destroy = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/v1/attendances/{attendance}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\AttendanceController::destroy
* @see app/Http/Controllers/Api/AttendanceController.php:129
* @route '/api/v1/attendances/{attendance}'
*/
destroy.url = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attendance: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { attendance: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            attendance: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        attendance: typeof args.attendance === 'object'
        ? args.attendance.id
        : args.attendance,
    }

    return destroy.definition.url
            .replace('{attendance}', parsedArgs.attendance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::destroy
* @see app/Http/Controllers/Api/AttendanceController.php:129
* @route '/api/v1/attendances/{attendance}'
*/
destroy.delete = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::destroy
* @see app/Http/Controllers/Api/AttendanceController.php:129
* @route '/api/v1/attendances/{attendance}'
*/
const destroyForm = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Api/AttendanceController.php:129
* @route '/api/v1/attendances/{attendance}'
*/
destroyForm.delete = (args: { attendance: number | { id: number } } | [attendance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see app/Http/Controllers/Api/AttendanceController.php:380
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
* @see app/Http/Controllers/Api/AttendanceController.php:380
* @route '/api/v1/attendances/check-out'
*/
checkOut.url = (options?: RouteQueryOptions) => {




    return checkOut.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::checkOut
* @see app/Http/Controllers/Api/AttendanceController.php:380
* @route '/api/v1/attendances/check-out'
*/
checkOut.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkOut.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::checkOut
* @see app/Http/Controllers/Api/AttendanceController.php:380
* @route '/api/v1/attendances/check-out'
*/
const checkOutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: checkOut.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::checkOut
* @see app/Http/Controllers/Api/AttendanceController.php:380
* @route '/api/v1/attendances/check-out'
*/
checkOutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: checkOut.url(options),
    method: 'post',
})

checkOut.form = checkOutForm

/**
* @see \App\Http\Controllers\Api\AttendanceController::report
* @see app/Http/Controllers/Api/AttendanceController.php:872
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
* @see app/Http/Controllers/Api/AttendanceController.php:872
* @route '/api/v1/attendances/report'
*/
reportb48ef142eb5f5695bcd057b817ade407.url = (options?: RouteQueryOptions) => {




    return reportb48ef142eb5f5695bcd057b817ade407.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::report
* @see app/Http/Controllers/Api/AttendanceController.php:872
* @route '/api/v1/attendances/report'
*/
reportb48ef142eb5f5695bcd057b817ade407.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reportb48ef142eb5f5695bcd057b817ade407.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::report
* @see app/Http/Controllers/Api/AttendanceController.php:872
* @route '/api/v1/attendances/report'
*/
reportb48ef142eb5f5695bcd057b817ade407.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reportb48ef142eb5f5695bcd057b817ade407.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::report
* @see app/Http/Controllers/Api/AttendanceController.php:872
* @route '/api/v1/attendances/report'
*/
const reportb48ef142eb5f5695bcd057b817ade407Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reportb48ef142eb5f5695bcd057b817ade407.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::report
* @see app/Http/Controllers/Api/AttendanceController.php:872
* @route '/api/v1/attendances/report'
*/
reportb48ef142eb5f5695bcd057b817ade407Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: reportb48ef142eb5f5695bcd057b817ade407.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::report
* @see app/Http/Controllers/Api/AttendanceController.php:872
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
* @see app/Http/Controllers/Api/AttendanceController.php:872
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
* @see app/Http/Controllers/Api/AttendanceController.php:872
* @route '/api/v1/admin/reports/attendance'
*/
report4da0f3b3fd375f57c74d9131d29b7ae6.url = (options?: RouteQueryOptions) => {




    return report4da0f3b3fd375f57c74d9131d29b7ae6.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceController::report
* @see app/Http/Controllers/Api/AttendanceController.php:872
* @route '/api/v1/admin/reports/attendance'
*/
report4da0f3b3fd375f57c74d9131d29b7ae6.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: report4da0f3b3fd375f57c74d9131d29b7ae6.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::report
* @see app/Http/Controllers/Api/AttendanceController.php:872
* @route '/api/v1/admin/reports/attendance'
*/
report4da0f3b3fd375f57c74d9131d29b7ae6.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: report4da0f3b3fd375f57c74d9131d29b7ae6.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::report
* @see app/Http/Controllers/Api/AttendanceController.php:872
* @route '/api/v1/admin/reports/attendance'
*/
const report4da0f3b3fd375f57c74d9131d29b7ae6Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: report4da0f3b3fd375f57c74d9131d29b7ae6.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::report
* @see app/Http/Controllers/Api/AttendanceController.php:872
* @route '/api/v1/admin/reports/attendance'
*/
report4da0f3b3fd375f57c74d9131d29b7ae6Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: report4da0f3b3fd375f57c74d9131d29b7ae6.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\AttendanceController::report
* @see app/Http/Controllers/Api/AttendanceController.php:872
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


const AttendanceController = { checkInByEmail, index, store, show, update, destroy, checkOut, report }

export default AttendanceController