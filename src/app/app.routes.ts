import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: '**',    component: NoContentComponent },
];
