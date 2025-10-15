import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../wayfinder'
/**
 * @see routes/web.php:6
 * @route '/'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:6
 * @route '/'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:6
 * @route '/'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:6
 * @route '/'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:6
 * @route '/'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:6
 * @route '/'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:6
 * @route '/'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
/**
 * @see routes/web.php:10
 * @route '/activities'
 */
export const activities = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activities.url(options),
    method: 'get',
})

activities.definition = {
    methods: ["get","head"],
    url: '/activities',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:10
 * @route '/activities'
 */
activities.url = (options?: RouteQueryOptions) => {
    return activities.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:10
 * @route '/activities'
 */
activities.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activities.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:10
 * @route '/activities'
 */
activities.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: activities.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:10
 * @route '/activities'
 */
    const activitiesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: activities.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:10
 * @route '/activities'
 */
        activitiesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: activities.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:10
 * @route '/activities'
 */
        activitiesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: activities.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    activities.form = activitiesForm
/**
 * @see routes/web.php:14
 * @route '/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:14
 * @route '/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:14
 * @route '/register'
 */
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:14
 * @route '/register'
 */
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:14
 * @route '/register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: register.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:14
 * @route '/register'
 */
        registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:14
 * @route '/register'
 */
        registerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    register.form = registerForm
/**
 * @see routes/web.php:18
 * @route '/faq'
 */
export const faq = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: faq.url(options),
    method: 'get',
})

faq.definition = {
    methods: ["get","head"],
    url: '/faq',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:18
 * @route '/faq'
 */
faq.url = (options?: RouteQueryOptions) => {
    return faq.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:18
 * @route '/faq'
 */
faq.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: faq.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:18
 * @route '/faq'
 */
faq.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: faq.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:18
 * @route '/faq'
 */
    const faqForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: faq.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:18
 * @route '/faq'
 */
        faqForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: faq.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:18
 * @route '/faq'
 */
        faqForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: faq.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    faq.form = faqForm
/**
 * @see routes/web.php:22
 * @route '/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:22
 * @route '/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:22
 * @route '/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:22
 * @route '/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:22
 * @route '/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:22
 * @route '/login'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:22
 * @route '/login'
 */
        loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
 * @see routes/web.php:26
 * @route '/confirmation'
 */
export const confirmation = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmation.url(options),
    method: 'get',
})

confirmation.definition = {
    methods: ["get","head"],
    url: '/confirmation',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:26
 * @route '/confirmation'
 */
confirmation.url = (options?: RouteQueryOptions) => {
    return confirmation.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:26
 * @route '/confirmation'
 */
confirmation.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmation.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:26
 * @route '/confirmation'
 */
confirmation.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: confirmation.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:26
 * @route '/confirmation'
 */
    const confirmationForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: confirmation.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:26
 * @route '/confirmation'
 */
        confirmationForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: confirmation.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:26
 * @route '/confirmation'
 */
        confirmationForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: confirmation.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    confirmation.form = confirmationForm
/**
 * @see routes/web.php:30
 * @route '/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:30
 * @route '/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:30
 * @route '/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:30
 * @route '/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:30
 * @route '/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:30
 * @route '/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:30
 * @route '/dashboard'
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
 * @see routes/web.php:34
 * @route '/verify-email'
 */
export const verifyEmail = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verifyEmail.url(options),
    method: 'get',
})

verifyEmail.definition = {
    methods: ["get","head"],
    url: '/verify-email',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:34
 * @route '/verify-email'
 */
verifyEmail.url = (options?: RouteQueryOptions) => {
    return verifyEmail.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:34
 * @route '/verify-email'
 */
verifyEmail.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verifyEmail.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:34
 * @route '/verify-email'
 */
verifyEmail.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verifyEmail.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:34
 * @route '/verify-email'
 */
    const verifyEmailForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: verifyEmail.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:34
 * @route '/verify-email'
 */
        verifyEmailForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verifyEmail.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:34
 * @route '/verify-email'
 */
        verifyEmailForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verifyEmail.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    verifyEmail.form = verifyEmailForm
/**
 * @see routes/web.php:38
 * @route '/participant-qr'
 */
export const participantQr = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: participantQr.url(options),
    method: 'get',
})

participantQr.definition = {
    methods: ["get","head"],
    url: '/participant-qr',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:38
 * @route '/participant-qr'
 */
participantQr.url = (options?: RouteQueryOptions) => {
    return participantQr.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:38
 * @route '/participant-qr'
 */
participantQr.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: participantQr.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:38
 * @route '/participant-qr'
 */
participantQr.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: participantQr.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:38
 * @route '/participant-qr'
 */
    const participantQrForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: participantQr.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:38
 * @route '/participant-qr'
 */
        participantQrForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: participantQr.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:38
 * @route '/participant-qr'
 */
        participantQrForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: participantQr.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    participantQr.form = participantQrForm
/**
 * @see routes/web.php:42
 * @route '/my-activities'
 */
export const myActivities = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myActivities.url(options),
    method: 'get',
})

myActivities.definition = {
    methods: ["get","head"],
    url: '/my-activities',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:42
 * @route '/my-activities'
 */
myActivities.url = (options?: RouteQueryOptions) => {
    return myActivities.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:42
 * @route '/my-activities'
 */
myActivities.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: myActivities.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:42
 * @route '/my-activities'
 */
myActivities.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: myActivities.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:42
 * @route '/my-activities'
 */
    const myActivitiesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: myActivities.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:42
 * @route '/my-activities'
 */
        myActivitiesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: myActivities.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:42
 * @route '/my-activities'
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
 * @see routes/web.php:46
 * @route '/participant-dashboard'
 */
export const participantDashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: participantDashboard.url(options),
    method: 'get',
})

participantDashboard.definition = {
    methods: ["get","head"],
    url: '/participant-dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:46
 * @route '/participant-dashboard'
 */
participantDashboard.url = (options?: RouteQueryOptions) => {
    return participantDashboard.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:46
 * @route '/participant-dashboard'
 */
participantDashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: participantDashboard.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:46
 * @route '/participant-dashboard'
 */
participantDashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: participantDashboard.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:46
 * @route '/participant-dashboard'
 */
    const participantDashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: participantDashboard.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:46
 * @route '/participant-dashboard'
 */
        participantDashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: participantDashboard.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:46
 * @route '/participant-dashboard'
 */
        participantDashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: participantDashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    participantDashboard.form = participantDashboardForm