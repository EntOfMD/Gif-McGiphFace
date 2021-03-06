// pre-defined list of topics, later to be converted to buttons
let topics = [
    'zenyatta',
    'Spirited Away',
    'Howls Moving Castle',
    'My Neighbor Totoro',
    'Princess Mononoke',
    'Grave of the Fireflies',
    'Trainspotting'
];

// a constructor.. this wasn't asked or taught at the class, but it's something I knew at the time
function Gif(id, rating, title, url, still, original) {
    this.id = id;
    this.rating = rating;
    this.title = title;
    this.url = url;
    this.still = still;
    this.original = original;
}

// one object to house all the functions
const fx = {
    // this function  takes in giphy response and spits out objects with cards attached
    ConstructGifs: function(data) {
        $('#gif_display').empty();
        for (i = 0; i < data.length; i++) {
            var gif_data = new Gif(
                data[i].id,
                data[i].rating,
                data[i].title,
                data[i].url,
                data[i].images.fixed_height_still.url,
                data[i].images.original.url
            );

            let gif_img = $('<img>');
            let gif_card = $('<div>');

            gif_card.prepend(`<div class="card" style="width: 18rem;">
                         `);

            gif_img.addClass('mx-3 my-3 tall gif');
            gif_img.attr('src', gif_data.still);
            gif_img.attr('data-still', gif_data.still);
            gif_img.attr('data-animate', gif_data.original);
            gif_card.addClass('single');
            gif_card.append(gif_img);
            gif_card.append(` <div class="card-body">
                         <p class="card-text title">${
                             gif_data.title
                         }. Rated: <strong>${gif_data.rating}</strong></p>
                       </div></div>`);
            $('#gif_display').prepend(gif_card);
        }
    },
    // this function is responsible for animating or making the gifs still on click
    animate: function() {
        $('.gif').on('click', function() {
            var state = $(this).attr('data-state');
            if (state === 'still') {
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            }
        });
    },
    // this function is responsible for doing ajax calls
    fetchGifs: function() {
        let q = $(this).attr('data-name');

        let APIKEY = `OLDkiP8Zn4nD6tLAVIcPIvuYklXx0t6S`;

        let qURL =
            'https://api.giphy.com/v1/gifs/search?api_key=' +
            APIKEY +
            '&q=' +
            q +
            '&limit=10&offset=0&rating=R&lang=en';

        $.ajax({
            url: qURL,
            method: 'GET',
            contentType: 'application/json',
            responseType: 'application/json'
        }).then(function(res) {
            if (res.meta.status === 200) {
                fx.ConstructGifs(res.data);
                console.log(
                    `Successfully fetched data. API MSG: ${res.meta.msg}`
                );
            } else {
                console.log('no');
            }
            $('.jumbotron').show();
        });
    },
    // last is one to spit out buttons of pre-defined array on top
    renderButtons: function() {
        $('#buttons').empty();
        for (i = 0; i < topics.length; i++) {
            var genBtn = $('<button>');
            genBtn.addClass(
                'btn btn-outline-danger btn-sm mx-1 user_gen_btn font-weight-bold text-dark'
            );
            genBtn.attr('data-name', topics[i]);
            genBtn.text(topics[i]);
            $('#buttons').append(genBtn);
        }
    }
};

$(function() {
    //WHEN the user clicks this, badabing dababoom, magic happens and puts the search term into the topics Arr and display the topic list
    $('#user_btn').click(e => {
        e.preventDefault();

        let searchTerm = $('#user_input')
            .val()
            .trim();
        topics.push(searchTerm);
        fx.renderButtons();
        $('#user_input').val('');
    });
    //inital rendering of hard-coded topics
    fx.renderButtons();

    $(document).on('click', '.user_gen_btn', fx.fetchGifs);
    $(document).on('click', 'img', fx.animate);
});
