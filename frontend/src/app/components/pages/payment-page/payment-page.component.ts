import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { TitleComponent } from '../../partials/title/title.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { OrderItemsComponent } from '../../partials/order-items/order-items.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [TitleComponent, TextInputComponent, OrderItemsComponent, ReactiveFormsModule],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent {
  order:Order = new Order();
  
  constructor(orderService: OrderService, router: Router) {
    orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
        //console.log(order);
      },
      error: () => {
        router.navigateByUrl('/checkout');
      }
    });
  }
}
