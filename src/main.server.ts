import 'zone.js/node';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { renderApplication } from '@angular/platform-server';

import { config } from './app/app.config.server';
import { AppComponent } from './app/app.component';
import { APP_BASE_HREF } from '@angular/common';


// set the base href
const baseHref = process.env['CF_PAGES_URL'] ?? `http://localhost:8888`;

if (import.meta.env.PROD) {
  enableProdMode();
}

export function bootstrap() {
  return bootstrapApplication(AppComponent, config);
}

export default async function render(url: string, document: string) {
  const html = await renderApplication(bootstrap, {
    document,
    url: `${baseHref}${url}`,
    platformProviders: [{ provide: APP_BASE_HREF, useValue: baseHref }],
  });

  return html;
}
