let topics = [
    'puppies',
    'cats',
    'birds',
    'pigs',
    'hamsters',
    'elephants',
    'lions'
];

const fx = {
    renderButtons: () => {
        $('#buttons').empty();
        for (i = 0; i < topics.length; i++) {
            var genBtn = $('<button>');
            genBtn.addClass('btn btn-outline-info btn-sm mx-1');
            genBtn.attr('data-name', topics[i]);
            genBtn.text(topics[i]);
            $('#buttons').append(genBtn);
        }
    }
};

$(function() {
    //inital rendering of hard-coded topics
    fx.renderButtons();
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
});
