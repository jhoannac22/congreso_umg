import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\EmailController::verifyEmail
 * @see app/Http/Controllers/Api/EmailController.php:143
 * @route '/api/v1/verify-email'
 */
export const verifyEmail = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyEmail.url(options),
    method: 'post',
})

verifyEmail.definition = {
    methods: ["post"],
    url: '/api/v1/verify-email',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\EmailController::verifyEmail
 * @see app/Http/Controllers/Api/EmailController.php:143
 * @route '/api/v1/verify-email'
 */
verifyEmail.url = (options?: RouteQueryOptions) => {
    return verifyEmail.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\EmailController::verifyEmail
 * @see app/Http/Controllers/Api/EmailController.php:143
 * @route '/api/v1/verify-email'
 */
verifyEmail.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyEmail.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\EmailController::verifyEmail
 * @see app/Http/Controllers/Api/EmailController.php:143
 * @route '/api/v1/verify-email'
 */
    const verifyEmailForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verifyEmail.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\EmailController::verifyEmail
 * @see app/Http/Controllers/Api/EmailController.php:143
 * @route '/api/v1/verify-email'
 */
        verifyEmailForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verifyEmail.url(options),
            method: 'post',
        })
    
    verifyEmail.form = verifyEmailForm
/**
* @see \App\Http\Controllers\Api\EmailController::resendVerification
 * @see app/Http/Controllers/Api/EmailController.php:25
 * @route '/api/v1/resend-verification'
 */
export const resendVerification = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resendVerification.url(options),
    method: 'post',
})

resendVerification.definition = {
    methods: ["post"],
    url: '/api/v1/resend-verification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\EmailController::resendVerification
 * @see app/Http/Controllers/Api/EmailController.php:25
 * @route '/api/v1/resend-verification'
 */
resendVerification.url = (options?: RouteQueryOptions) => {
    return resendVerification.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\EmailController::resendVerification
 * @see app/Http/Controllers/Api/EmailController.php:25
 * @route '/api/v1/resend-verification'
 */
resendVerification.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resendVerification.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\EmailController::resendVerification
 * @see app/Http/Controllers/Api/EmailController.php:25
 * @route '/api/v1/resend-verification'
 */
    const resendVerificationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: resendVerification.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\EmailController::resendVerification
 * @see app/Http/Controllers/Api/EmailController.php:25
 * @route '/api/v1/resend-verification'
 */
        resendVerificationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: resendVerification.url(options),
            method: 'post',
        })
    
    resendVerification.form = resendVerificationForm
/**
* @see \App\Http\Controllers\Api\EmailController::sendRegistrationConfirmation
 * @see app/Http/Controllers/Api/EmailController.php:52
 * @route '/api/v1/send-registration-confirmation'
 */
export const sendRegistrationConfirmation = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendRegistrationConfirmation.url(options),
    method: 'post',
})

sendRegistrationConfirmation.definition = {
    methods: ["post"],
    url: '/api/v1/send-registration-confirmation',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\EmailController::sendRegistrationConfirmation
 * @see app/Http/Controllers/Api/EmailController.php:52
 * @route '/api/v1/send-registration-confirmation'
 */
sendRegistrationConfirmation.url = (options?: RouteQueryOptions) => {
    return sendRegistrationConfirmation.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\EmailController::sendRegistrationConfirmation
 * @see app/Http/Controllers/Api/EmailController.php:52
 * @route '/api/v1/send-registration-confirmation'
 */
sendRegistrationConfirmation.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendRegistrationConfirmation.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\EmailController::sendRegistrationConfirmation
 * @see app/Http/Controllers/Api/EmailController.php:52
 * @route '/api/v1/send-registration-confirmation'
 */
    const sendRegistrationConfirmationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sendRegistrationConfirmation.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\EmailController::sendRegistrationConfirmation
 * @see app/Http/Controllers/Api/EmailController.php:52
 * @route '/api/v1/send-registration-confirmation'
 */
        sendRegistrationConfirmationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sendRegistrationConfirmation.url(options),
            method: 'post',
        })
    
    sendRegistrationConfirmation.form = sendRegistrationConfirmationForm
/**
* @see \App\Http\Controllers\Api\EmailController::sendEventReminder
 * @see app/Http/Controllers/Api/EmailController.php:77
 * @route '/api/v1/send-event-reminder'
 */
export const sendEventReminder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendEventReminder.url(options),
    method: 'post',
})

sendEventReminder.definition = {
    methods: ["post"],
    url: '/api/v1/send-event-reminder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\EmailController::sendEventReminder
 * @see app/Http/Controllers/Api/EmailController.php:77
 * @route '/api/v1/send-event-reminder'
 */
sendEventReminder.url = (options?: RouteQueryOptions) => {
    return sendEventReminder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\EmailController::sendEventReminder
 * @see app/Http/Controllers/Api/EmailController.php:77
 * @route '/api/v1/send-event-reminder'
 */
sendEventReminder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendEventReminder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\EmailController::sendEventReminder
 * @see app/Http/Controllers/Api/EmailController.php:77
 * @route '/api/v1/send-event-reminder'
 */
    const sendEventReminderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sendEventReminder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\EmailController::sendEventReminder
 * @see app/Http/Controllers/Api/EmailController.php:77
 * @route '/api/v1/send-event-reminder'
 */
        sendEventReminderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sendEventReminder.url(options),
            method: 'post',
        })
    
    sendEventReminder.form = sendEventReminderForm
/**
* @see \App\Http\Controllers\Api\EmailController::sendBulkEventReminders
 * @see app/Http/Controllers/Api/EmailController.php:112
 * @route '/api/v1/admin/send-bulk-event-reminders'
 */
export const sendBulkEventReminders = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendBulkEventReminders.url(options),
    method: 'post',
})

sendBulkEventReminders.definition = {
    methods: ["post"],
    url: '/api/v1/admin/send-bulk-event-reminders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\EmailController::sendBulkEventReminders
 * @see app/Http/Controllers/Api/EmailController.php:112
 * @route '/api/v1/admin/send-bulk-event-reminders'
 */
sendBulkEventReminders.url = (options?: RouteQueryOptions) => {
    return sendBulkEventReminders.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\EmailController::sendBulkEventReminders
 * @see app/Http/Controllers/Api/EmailController.php:112
 * @route '/api/v1/admin/send-bulk-event-reminders'
 */
sendBulkEventReminders.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendBulkEventReminders.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\EmailController::sendBulkEventReminders
 * @see app/Http/Controllers/Api/EmailController.php:112
 * @route '/api/v1/admin/send-bulk-event-reminders'
 */
    const sendBulkEventRemindersForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sendBulkEventReminders.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\EmailController::sendBulkEventReminders
 * @see app/Http/Controllers/Api/EmailController.php:112
 * @route '/api/v1/admin/send-bulk-event-reminders'
 */
        sendBulkEventRemindersForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sendBulkEventReminders.url(options),
            method: 'post',
        })
    
    sendBulkEventReminders.form = sendBulkEventRemindersForm
const EmailController = { verifyEmail, resendVerification, sendRegistrationConfirmation, sendEventReminder, sendBulkEventReminders }

export default EmailController