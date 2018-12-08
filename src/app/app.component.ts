import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { HomePage } from "app/pages/home/home";
import { Platform } from "ionic-angular";
import { HomeBrowserPage } from "app/pages/home-browser/home-browser";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    translateService: TranslateService
  ) {
    platform.ready().then(() => {
      if (platform.is('core') && platform.width() > 991) {
        this.rootPage = HomeBrowserPage;
      }
      statusBar.styleDefault();
      splashScreen.hide();
      translateService.setDefaultLang('en');
    });
  }
}
