$(document).ready(function(){
    $('button').click(function(){
        var film = $("input").val();
        $('.container').empty();
        $.ajax({
            url: 'https://api.themoviedb.org/3/search/movie',
            method: 'Get',
            data:{
                api_key: '4196130437963c18fc858b91cc3e575e',
                language: 'it-IT',
                query: film
            },
            success : function(risposta){
                for (var i = 0; i < risposta.results.length; i++) {
                    var source = $('#entry-template').html();
                    var template = Handlebars.compile(source);
                    var titoli = risposta.results[i].title;
                    var context ={
                            title: titoli,
                            original_title: risposta.results[i].original_title,
                            original_language: risposta.results[i].original_language,
                            vote_average: risposta.results[i].vote_average
                    }
                    var html = template(context);
                    $('.container').append(html);
                }

            },
            error: function(){
                alert ('errore');
            }
        });
    })
})
