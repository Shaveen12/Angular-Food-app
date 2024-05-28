import { CartItem } from './CartItem'; // Update the import statement to use the correct casing for the file name 'CartItem'

export class Cart{
    items:CartItem[] = [];
    totalPrice:number = 0;
    totalCount:number = 0;  
}