import { Component, Input } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'order-items',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.css'
})
export class OrderItemsComponent {
  @Input()
  order!:Order;

}
