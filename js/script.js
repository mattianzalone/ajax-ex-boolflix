$(document).ready(function(){
    $('button').click(function(){
        var film = $("input").val();
        reset();
        insertFilm(film);
    })
})




                        // FUNZIONI

function stars(num){
    var star = '';
    for (var i = 0; i < 5; i++) {
        star += '<i class="fas fa-star"></i>';
    }
    return star;
}


function reset(){
$('.container').empty();
$('input').val('');
}

function insertFilm(data){
    $.ajax({
        url: 'https://api.themoviedb.org/3/search/movie',
        method: 'Get',
        data:{
            api_key: '4196130437963c18fc858b91cc3e575e',
            language: 'it-IT',
            query: data
        },
        success : function(risposta){
            if (risposta.total_results > 0) {
                printFilm(risposta.results);
            } else {
                noResult();
            }

        },
        error: function(){
            alert ('errore');
        }
    });
}

function printFilm(data){
    var source = $('#entry-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < data.length; i++) {
        var titoli = data[i].title;
        var votoStars = data[i].vote_average/2;
        var context ={
                title: titoli,
                original_title: data[i].original_title,
                original_language: data[i].original_language,
                vote_average: stars(data[i].vote_average)
        }
        var html = template(context);
        $('.container').append(html);
    }
}

function noResult(){
  var source = $("#no-result-template").html();
  var template = Handlebars.compile(source);
  var context = {
    noResult: 'Non ci sono risultati'
  };
  var html = template(context);
  $('.container').append(html);
}
