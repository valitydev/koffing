app.component('app', {
    templateUrl: 'components/app/app.html',
    $routeConfig: [
        {path: '/dashboard', name: 'Dashboard', component: 'dashboard', useAsDefault: true},
        {path: '/finance', name: 'Finance', component: 'finance'}
    ]
});

app.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});

app.value('$routerRootComponent', 'app');
