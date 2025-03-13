import db from "@/configs/db";
import USER_TABLE from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req){

    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

    let data;
    let eventType;
   
    const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;
    if (webhookSecret) {
         let event;
      let signature = req.headers["stripe-signature"];
  
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        return res.sendStatus(400);
      }
     
      data = event.data;
      eventType = event.type;
    } else {
      
      data = req.body.data;
      eventType = req.body.type;
    }
  
    switch (eventType) {
      case 'checkout.session.completed':
      
        const result =await db.update(USER_TABLE)
        .set({
            isMember:true
        }).where(eq(USER_TABLE.email,data.customer_details.email))
        

        break;
      case 'invoice.paid':
      break;
      case 'invoice.payment_failed':
       
        break;
      default:
      
    }
    return NextResponse.json({result:'success'})


}
