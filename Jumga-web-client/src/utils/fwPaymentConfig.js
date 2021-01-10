export const fwPaymentConfig = ({customer,meta,amount,currency}) => {
return {
    public_key: process.env.REACT_APP_FW_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: amount|| 20,
    currency: currency || "USD",
    redirect_url: '/appreciation',
    payment_options: 'account,card,banktransfer,mobilemoney,ussd',
    customer,
    meta: meta,
    customizations: {
        title: 'make Payment',
        description: 'paymentbeing made'
        //   logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    }
};
} 

// {
//     email: "profkiti@gmail.com",
//     //   phonenumber: '09050386548',
//     name: "chibuokem Jerry"
// }