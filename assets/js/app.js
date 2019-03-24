let topics = [
    'puppies',
    'cats',
    'birds',
    'pigs',
    'hamsters',
    'elephants',
    'lions'
];

function Gif(id, rating, title, url, still, original) {
    this.id = id;
    this.rating = rating;
    this.title = title;
    this.url = url;
    // this.images['original'].url = original;
    // this.iamges['480w_still'].url = still;
}

const variables = {
    gif_meta: []
};
const fx = {
    showToDOM: () => {
        let gif_img = $('<img>');
        variables.gif_meta.forEach(e => {
            gif_img.attr('src', e.url);

            $('#gif_display').prepend(gif_img);
        });
    },
    ConstructGifs: data => {
        for (i = 0; i < data.length; i++) {
            var gif_data = new Gif(
                data[i].id,
                data[i].rating,
                data[i].title,
                data[i].url
                // data[i].still,
                // data[i].original
            );
            variables.gif_meta.push(gif_data);
            fx.showToDOM(data);
        }
    },
    fetchGifs: () => {
        // let q = $(this).attr('data-name');  <--- THIS DOESN'T EVER WORK FOR ME.. IT SHOWS UNDEFINED..
        let q = $(this).attr('data-name');

        let APIKEY = `OLDkiP8Zn4nD6tLAVIcPIvuYklXx0t6S`;

        let qURL =
            'https://api.giphy.com/v1/gifs/search?api_key=' +
            APIKEY +
            '&q=' +
            q +
            '&limit=10&offset=0&rating=PG&lang=en';
        // console.log(this);
        $.ajax({
            url: qURL,
            method: 'GET',
            contentType: 'application/json',
            responseType: 'application/json'
        }).then(res => {
            if (res.meta.status === 200) {
                fx.ConstructGifs(res.data);
                console.log(
                    `Successfully fetched data. API MSG: ${res.meta.msg}`
                );
            } else {
                console.log('no');
            }
        });
    },
    renderButtons: () => {
        $('#buttons').empty();
        for (i = 0; i < topics.length; i++) {
            var genBtn = $('<button>');
            genBtn.addClass('btn btn-outline-danger btn-sm mx-1 user_gen_btn');
            genBtn.attr('data-name', topics[i]);
            genBtn.html(topics[i]);
            $('#buttons').append(genBtn);
        }
    }
};

$(function() {
    //this clears out the search field when user clicks it
    $('input').focus(() => {
        $('#user_input').val('');
    });
    //WHEN the user clicks this, badabing dababoom, magic happens and puts the search term into the topics Arr and display the topic list
    $('#user_btn').click(e => {
        e.preventDefault();
        let searchTerm = $('#user_input')
            .val()
            .trim();
        topics.push(searchTerm);
        fx.renderButtons();
    });
    $(document).on('click', '.user_gen_btn', fx.fetchGifs);

    //inital rendering of hard-coded topics
    fx.renderButtons();
    console.log($('.user_gen_btn')[0].innerText);
});
