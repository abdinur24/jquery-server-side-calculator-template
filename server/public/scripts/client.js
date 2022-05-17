$(document).ready(handleReady)

function handleReady(){
    console.log('jq ready')

    $('#submit-button').on('click', getCalculation);

    $('#add-button').on('click', add);
    $('#sub-button').on('click', subtract);
    $('#multi-button').on('click', multiply);
    $('#div-button').on('click', divide);

    $('#clear-button').on('click', function(){
        $('#first-number').val('');
        $('#second-number').val('');
    })

    $('#delete').on('click', deleteHistory);

    showCalculations();
}

let operator = '';

function add(event){
    operator = '+';
    $('.operator').removeClass('selected');
    $(event.target).addClass('selected');
}
    
function subtract(event){
    operator = '-';
    $('.operator').removeClass('selected');
    $(event.target).addClass('selected');
}

function multiply(event){
    operator = '*';
    $('.operator').removeClass('selected');
    $(event.target).addClass('selected');
}

function divide(event){
    operator = '/';
    $('.operator').removeClass('selected');
    $(event.target).addClass('selected');
}

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
        url: '/history'
    }).then(function (response){
        console.log(response)
       let history = response;
       $('#total').empty();
       for(let i=0; i < history.length; i++){
           $('#total').append(`
                <li>${history[i].number1} ${history[i].operator}  ${history[i].number2}</li>
           `)
       }
       if (history.length > 0) {
        $('#calc-totals').text(history[history.length - 1].result);
     }
    })
}

function deleteHistory(){
    $.ajax({
        method: 'DELETE',
        url:    '/history'
    }).then(function(response){
        showCalculations();
        $('#calc-totals').text('');
    })
}



