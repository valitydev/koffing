import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { AuthService } from './app/auth/services/auth.service';

if (process.env.ENV === 'production') {
    enableProdMode();
}

AuthService.init().then(() => platformBrowserDynamic().bootstrapModule(AppModule));
