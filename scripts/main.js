( function($) {
    $(document).ready(function() {
        var deck = new Deck(),
            $container = $('.cards-container ul'),
            $template = $('#templates li'),
            $newButton = $('#new-hand');

        var fillContent = function(card) {
            var renderCard = $template.clone();
            renderCard.addClass(card.toSymbol());
            renderCard.find('img').prop('src', card.toImagePath()).prop('alt', card.toString());
            renderCard.find('name').html(card.toString());
            return $container.append(renderCard);
        };

        $newButton.on('click',  function() {
            var hand = deck.getHand(5);
            $container.html('');

            for (var i=0; i< hand.cards.length; i++) {
                fillContent(hand.cards[i]);
            }
        });

    });
} ) ( jQuery );

