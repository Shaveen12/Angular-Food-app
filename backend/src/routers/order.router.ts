import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from "../http_status";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status";
import  auth  from "../middlewares/auth.mid";

const router = Router();
router.use(auth);

router.post('/create',asyncHandler(
    async (req:any, res:any) => {
        const requestOrder = req.body;
        //console.log(req);

        if(requestOrder.items.length <= 0){
            res.status(HTTP_BAD_REQUEST).send('Cart is empty!');
            return;
        }

        await OrderModel.deleteOne({
            user: req.user.id,
            status: OrderStatus.NEW
        });

        const newOrder = new OrderModel({...requestOrder, user: req.user.id});
        await newOrder.save();
        res.json(newOrder);


    }
) )

router.get('/newOrderForCurrentUser', asyncHandler(
    async (req:any, res:any) => {
        const order = await OrderModel.findOne({
            user: req.user.id,
            status: OrderStatus.NEW
        });
        
        if(order){
        console.log(order);
        res.json(order);
        } else {
            res.status(HTTP_BAD_REQUEST).send('No new order found!');
        }
    }
))

export default router;