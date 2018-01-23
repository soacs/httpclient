import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HttpClient Tutorial';
  // url = 'http://angularorange.io/json/httpclientdata.json';
  url = environment.url;
  result: any = {};
  interfaceResult: any = { name: "dummy", address:"dummy", phone: "dummy"};
  error: string;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get(this.url).subscribe(data => {
      console.log("the response data: " + data);
      console.log("the response data['name']: " + data['name']);
      //console.log("the response data.name: " + data.name);
      console.log("The JSON response: " + JSON.stringify(data));
      this.result = data;
    });
  }

  interfaceCall() {
    this.http.get<DataResponse>(this.url).subscribe(data => {
        console.log("Name: " + data.name);
        console.log("Address: " + data.address);
        console.log("Phone: " + data.phone);
        this.interfaceResult = data;
      },
      (err: HttpErrorResponse) => {

        if (err.error instanceof Error) {
          console.log("Client-side error occured: " + JSON.stringify(err));
          this.error = err.message;
        } else {
          console.log("Server-side error occured: err = "  + JSON.stringify(err));
          console.log("err.message =  "  + err.message);
        }
      }
    );
  }

  sendData(){
    let url:string = "http://s3.amazonaws.com/angularorangetest/stevedata.json";
    const req = this.http.post(url, {
      name: 'steve',
      address: '12 mason street',
      phone: '203-214-5049'
    }).subscribe(res => {
        console.log(res);
      },
      err => {
        console.log("Error occured: " + err.message);
      }
    );
  }
}

interface DataResponse {
  name: string;
  address: string;
  phone: string;
}
