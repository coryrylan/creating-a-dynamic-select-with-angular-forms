import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">

      <label for="orders">Order</label>
      <select formControlName="orders" id="orders">
        <option *ngFor="let order of orders; let i = index" [value]="orders[i].id">
          {{orders[i].name}}
        </option>
      </select>

      <br><br>
      <button>submit</button>
    </form>

  `,
})
export class App {
form: FormGroup;
  orders: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      orders: ['']
    });

    // async orders
    of(this.getOrders()).subscribe(orders => {
      this.orders = orders;
      this.form.controls['orders'].patchValue(this.orders[0].id);
    });

    // synchronous orders
    // this.orders = this.getOrders();
    // this.form.controls.orders.patchValue(this.orders[0].id);
  }

  getOrders() {
    return [
      { id: '1', name: 'order 1' },
      { id: '2', name: 'order 2' },
      { id: '3', name: 'order 3' },
      { id: '4', name: 'order 4' }
    ];
  }

  submit() {
    console.log(this.form.value);
  }
}

bootstrapApplication(App);
