import { Injectable } from '@angular/core';
import { logEvent } from 'firebase/analytics';

import { analytics } from '../firebase/firebase.config';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor() {
    this.logPageView();
  }

  logPageView(
    url: string = window.location.href,
    title: string = document.title
  ): void {
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_location: url,
        page_title: title,
      });
    }
  }

  logCustomEvent(eventName: string, params: Record<string, any> = {}): void {
    if (analytics) {
      logEvent(analytics, eventName, params);
    }
  }
}
