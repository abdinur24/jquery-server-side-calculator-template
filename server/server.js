const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;



app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }));

app.use(express.static('server/public'));

let calcHistory = [];
let result = '';


app.post('/calculation', (req, res) => {
    let sum = req.body;
    console.log(req.body);
    if(sum.operator === '+'){
        result = Number(sum.number1) + Number(sum.number2)
    }else if (sum.operator === '-'){
       result =  Number(sum.number1) - Number(sum.nummber2)
    }else if (sum.operator === '*'){
       result =  Number((sum.number1) * (sum.nummber2))
    }else if (sum.operator === '/'){
       result = Number(sum.number1) / Number(sum.nummber2)
    }else{
        console.log('Equation not working')
    }
    console.log(result);
    calcHistory.push(sum)
    res.sendStatus(200);
});

app.get('/calculation', (req, res) => {
    // ...
    console.log(calcHistory);
    res.send(calcHistory);
});

app.get('/clear', (req, res) => {
    calcHistory = [];
    res.sendStatus(200);
});
















app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
  })









  