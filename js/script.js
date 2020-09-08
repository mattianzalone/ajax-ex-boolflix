$(document).ready(function(){
    $('button').click(function(){
        init();
    })
})
$('input').keydown(function(){
  if (event.which == 13 || event.keyCode == 13){
    init();
  }
});



                        // FUNZIONI
function init(){
    var queryInput = $('input').val();
    reset();
    var url1 = 'https://api.themoviedb.org/3/search/movie';
    var url2 = 'https://api.themoviedb.org/3/search/tv';
    insertFilm(queryInput,url1,'Film')
    insertFilm(queryInput,url2,'Tv');
}

function reset(){
$('.container-film').empty();
$('.container-tv').empty();
$('input').val('');
}

function insertFilm(data,url,type){
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
                printFilm(risposta.results,type);
            } else {
                noResult(type);
            }

        },
        error: function(){
            alert ('errore');
        }
    });
}

function printFilm(data, type){
    var source = $('#entry-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < data.length; i++) {
        if (type == 'Film') {
            var titoli = data[i].title;
            var titolo_originale = data[i].original_title;
        } else if (type == 'Tv') {
            var titoli = data[i].name;
            var titolo_originale = data[i].original_name;
        }
        var context ={
            tipo : type,
            title: titoli,
            original_title: titolo_originale,
            original_language: flag(data[i].original_language),
            vote_average: stars(data[i].vote_average),
            poster: insertPoster(data[i].poster_path,titoli),
            overview: data[i].overview.substring(0,200)+'[...]'
        }
        var html = template(context);
        if (type == 'Film') {
            $('.container-film').append(html);
        } else {
            $('.container-tv').append(html);
        }

    }
}

function insertPoster(poster,titoli){
  var urlBase = 'https://image.tmdb.org/t/p/w185';
  var percorso = urlBase + poster;
  poster_image = '<img src="'+percorso+'" class="poster" alt="'+titoli+'">';
  if (poster == null){
    poster_image = '<img src="img/default-poster.png" class="poster" alt="'+titoli+'">';
  }

  return poster_image;
}

function flag (lingua){
    var lingua = ['en','it'];
    if (lingua.includes(lingua)) {
        return '<img src="img/'+lingua+'.svg" class="flag">';
    }
    return lingua;
}

function stars(num){
    var resto = num % 2;
    num = Math.floor(num/2);
    var star = '';
    for (var i = 0; i < 5; i++) {
        if (i < num) {
            star += '<i class="fas fa-star"></i>';
        } else if (resto != 0) {
            star += '<i class="fas fa-star-half-alt"></i>';
            resto = 0;
        } else {
            star += '<i class="far fa-star"></i>';
        }
    }
    return star;
}

function noResult(){
  var source = $("#no-result-template").html();
  var template = Handlebars.compile(source);
  var context = {
    noResult: 'Non ci sono risultati'
  };
  var html = template(context);
  $('.container-film').append(html);
  $('.container-tv').append(html);
}
