import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { map } from 'rxjs/operators';

interface IApiResponse {
  message: string;
}

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.css']
})
export class PingComponent implements OnInit {

  API_URL = 'http://localhost:3010/api';
  message: string;

  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
  }

  public ping(): void {
    this.message = '';
    this.http.get<IApiResponse>(`${this.API_URL}/public`)
      .subscribe(
        data => this.message = data.message,
        error => this.message = error
      );
  }

  public securedPing(): void {
    this.message = '';
    this.http.get<IApiResponse>(`${this.API_URL}/private`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.auth.accessToken}`)
    })
      .subscribe(
        data => this.message = data.message,
        error => this.message = error
      );
  }

  public securedWrite(): void {
    this.message = '';
    this.http.get<IApiResponse>(`${this.API_URL}/private-write`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.auth.accessToken}`)
    })
      .subscribe(
        data => this.message = data.message,
        error => this.message = error
      );
  }

  public securedClaims(): void {
    this.message = '';
    this.http.get<IApiResponse>(`${this.API_URL}/claims`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.auth.accessToken}`)
    })
      .subscribe(
        data => { this.message = data.message, console.log(data) } ,
        error => this.message = error
      );
  }
}
