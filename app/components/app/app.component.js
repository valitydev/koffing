app.component('app', {
    templateUrl: 'components/app/app.html',
    $routeConfig: [
        {path: '/analytics', name: 'Analytics', component: 'analytics', useAsDefault: true},
        {path: '/analytics/...', component: 'analytics'},
        {path: '/dashboard', name: 'Dashboard', component: 'dashboard'},
        {path: '/finance', name: 'Finance', component: 'finance'}
    ]
});

app.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});

app.value('$routerRootComponent', 'app');
