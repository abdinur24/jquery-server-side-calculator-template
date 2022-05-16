$(document).ready(handleReady)

function handleReady(){
    console.log('jq ready')

    $('#submit-button').on('click', getCalculation);

    $('#add-button').on('click', function(){
        operator = '+';
    });
    $('#sub-button').on('click', function(){
        operator = '-';
    });
    $('#multi-button').on('click', function(){
        operator = '*';
    });
    $('#div-button').on('click', function(){
        operator = '/';
    });

    $('#clear-button').on('click', function(){
        $('#first-number').val('');
        $('#second-number').val('');
    })

    $('#delete').on('click', deleteHistory);

    showCalculations();
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



