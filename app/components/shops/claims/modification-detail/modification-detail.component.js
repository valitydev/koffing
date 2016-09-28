shops.component('modificationDetail', {
    template: `
    <dl ng-show="$ctrl.value">
        <dt>{{$ctrl.displayName}}</dt>
        <dd>{{$ctrl.value}}</dd>
    </dl>`,
    bindings: {
        displayName: '<',
        value: '<'
    }
});
