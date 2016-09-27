app.component('app', {
    templateUrl: 'components/app/app.html',
    $routeConfig: [
        {path: '/shops', name: 'Shops', component: 'shops'},
        {path: '/shops/add', name: 'AddShop', component: 'claimForm'},
        {path: '/shops/edit/:shopId', name: 'EditShop', component: 'claimForm'},
        {path: '/analytics', name: 'Analytics', component: 'analytics', useAsDefault: true},
        {path: '/analytics/...', component: 'analytics'}
    ]
});

app.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});

app.value('$routerRootComponent', 'app');
