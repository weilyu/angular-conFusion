import {Injectable} from '@angular/core';
import {Promotion} from '../shared/promotion';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import {Http} from '@angular/http';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
import {baseURL} from '../shared/baseurl';

@Injectable()
export class PromotionService {

  constructor(private http: Http,
              private processHTTPMsgService: ProcessHTTPMsgService) {
  }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get(baseURL + 'promotions').map(res => {
      return this.processHTTPMsgService.extractData(res);
    }).catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions/' + id).map(res => {
      return this.processHTTPMsgService.extractData(res);
    }).catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions?featured=true').map(res => {
      return this.processHTTPMsgService.extractData(res)[0];
    }).catch(error => {
      return this.processHTTPMsgService.handleError(error);
    });
  }

}
