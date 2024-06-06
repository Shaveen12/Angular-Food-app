import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../services/user.service';
import { TitleComponent } from '../../partials/title/title.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { OrderItemsComponent } from '../../partials/order-items/order-items.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [TitleComponent, TextInputComponent, OrderItemsComponent, ReactiveFormsModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent {
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(cartService: CartService, 
              private formBuilder: FormBuilder,
              private userService: UserService,
              private orderService: OrderService,
              private router: Router) {
                const cart = cartService.getCart();
                this.order.items = cart.items;
                this.order.totalPrice= cart.totalPrice;
            }

  ngOnInit():void {
    let {name, address} = this.userService.currentUser();
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required]
    });
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      alert("Please fill in the form");
      return;
    }

  
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    this.orderService.create(this.order).subscribe({
      next: () => {
          this.router.navigate(['/payment']);
      },
      error: (errorResponse) => {
        alert(errorResponse.error);
      }
    })
  }

}
