$(document).ready(handleReady)

function handleReady(){
    console.log('jq ready')

    $('#submit-button').on('click', getCalculation);

    $('#add-button').on('click', () => {
        operator === '+'
    });
    $('#sub-button').on('click', () => {
        operator === '-'
    });
    $('#multi-button').on('click', () => {
        operator === '*'
    });
    $('#div-button').on('click', () => {
        operator === '/'
    });
}

let operator = '';

function getCalculation(){
    $.ajax({
        method: 'POST',
        url: '/calculation',
        data: {
           number1: $('#first-number').val(),
           operator: operator,
           number2: $('#second-number').val()
        }
    }).then(function(result){
        showCalculations();
        $('#first-number').val('');
        $('#second-number').val('');
    })
}

function showCalculations(){
    $.ajax({
        method: 'GET',
        url: '/calculation'
    }).then(function (response){
       let history = response
       for(let i=0; i < history.length; i++){
           $('#total').append(`
                <li>${history[i].number1, history[i].operator , history[i].number2}</li>
           `)
       }
    })
}


