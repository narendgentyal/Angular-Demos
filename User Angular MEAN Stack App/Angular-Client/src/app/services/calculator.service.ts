import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  // Addition
  addition(fn:number, sn:number){
    return fn+sn;
  }
  // Multiplication
  multiplication(fn:number, sn:number){
    return fn*sn;
  }
}
