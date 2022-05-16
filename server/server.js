const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;



app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }));

app.use(express.static('server/public'));

let calcHistory = [];



app.post('/calculation', (req, res) => {
    let sum = req.body;
    let result;
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

    let objResult = {
        number1: sum.number1,
        operator: sum.operator,
        number2: sum.number2,
        result: result
    }
    console.log(result);
    calcHistory.push(objResult)
    res.sendStatus(200);
});

app.get('/history', (req, res) => {
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









  