const express = require('express')
const Razorpay = require('razorpay')

let app = express()

const razorpay = new Razorpay({
    key_id:'rzp_test_jl8uVftI4crHq0',
    key_secret:'BHjhFJieNzzu8CfTBAUsWSCB'
})

app.set('views', 'views')
app.set('views engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', (req,res) => {
    res.render('razorpay.ejs')
})

app.post('/order', (req, res) => {
    let options = {
        amount: 50000,
        currency: "INR",
    };
    razorpay.orders.create(options, function (err, order) {
        console.log(order)
        res.json(order)
    })

})

app.post('/is-order-complete', (req, res) =>{
    razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument)=>{
        if (paymentDocument.status == "captured"){
            res.send('payment successfull')
        }else{
            res.redirect('/')
        }
    })

})

app.listen(5000)