import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coefficient } from '../models/coefficient.model';
import { HttpClient } from '@angular/common/http';
import { Forecast } from '../models/forecast.model';
import { Product } from '../models/product.model';
import { Resource } from '../models/resource.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCoefficients(): Observable<Array<Coefficient>> {
    return this.http.get<Array<Coefficient>>('api/Coefficients');
  }

  getForecasts(): Observable<Array<Forecast>> {
    return this.http.get<Array<Forecast>>('api/Forecasts');
  }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>('api/Products');
  }

  getResources(): Observable<Array<Resource>> {
    return this.http.get<Array<Resource>>('api/Resources');
  }

  updateCoefficient(coefficient: Coefficient): Observable<any> {
    return this.http.put('api/Coefficients/' + coefficient.id, coefficient);
  }

  updateForecast(forecast: Forecast): Observable<any> {
    return this.http.put('api/Forecasts/' + forecast.id, forecast);
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put('api/Products/' + product.code, product);
  }

  updateResource(resource: Resource): Observable<any> {
    return this.http.put('api/Resources/' + resource.id, resource);
  }

  deleteCoefficient(coefficient: Coefficient): Observable<any> {
    return this.http.delete('api/Coefficients/' + coefficient.id);
  }

  deleteForecast(forecast: Forecast): Observable<any> {
    return this.http.delete('api/Forecasts/' + forecast.id);
  }

  deleteProduct(product: Product): Observable<any> {
    return this.http.delete('api/Products/' + product.code);
  }

  deleteResource(resource: Resource): Observable<any> {
    return this.http.delete('api/Resources/' + resource.id);
  }

  addCoefficient(coefficient: Coefficient): Observable<any> {
    return this.http.post('api/Coefficients', coefficient);
  }

  addForecast(forecast: Forecast): Observable<any> {
    return this.http.post('api/Forecasts', forecast);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post('api/Products', product);
  }

  addResource(resource: Resource): Observable<any> {
    return this.http.post('api/Resources', resource);
  }
}
