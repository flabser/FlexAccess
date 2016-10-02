import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from 'ng2-translate/ng2-translate';
import { Observable } from 'rxjs/Observable';

import { SharedModule } from './shared/shared.module';

import { AppService, ActivityService } from './services';

import { App } from './components/app';
import { HomeComponent } from './components/home';
import { ActivitiesComponent } from './components/activities';
import { UserProfileComponent } from './components/user-profile';
import { LoginComponent } from './components/login';

import { DateFormatPipe, TextTransformPipe } from './pipes';

import { APP_ROUTES } from './app.routes';
import { AuthGuard } from './auth.guard';

@NgModule({
    bootstrap: [App],
    declarations: [
        App,
        HomeComponent,
        ActivitiesComponent,
        UserProfileComponent,
        LoginComponent,
        DateFormatPipe, TextTransformPipe
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(APP_ROUTES, { useHash: true }),
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (trs: AppService) => new CustomTranslateLoader(trs),
            deps: [AppService]
        }),
        SharedModule
    ],
    providers: [
        AppService,
        ActivityService,
        AuthGuard
    ]
})

export class AppModule { }

class CustomTranslateLoader implements TranslateLoader {
    constructor(private appService: AppService) { }
    public getTranslation(lang: string): Observable<any> {
        return this.appService.getTranslations();
    }
}

declare const webpack: {
    ENV: string
};

if (webpack.ENV === 'production') {
    enableProdMode();
}
