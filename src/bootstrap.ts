import 'zone.js';
import 'reflect-metadata';
import 'bootstrap'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }  from './app.component';

platformBrowserDynamic().bootstrapModule(AppModule);   