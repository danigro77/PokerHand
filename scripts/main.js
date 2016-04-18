( function($) {
    $(document).ready(function() {
        var deck = new Deck(),
            $container = $('.cards-container ul'),
            $template = $('#templates li'),
            $newRandomButton = $('#new-hand-random'),
            $newReadButton = $('#new-hand-text');

        var fillContent = function(card) {
            var renderCard = $template.clone();
            renderCard.addClass(card.toSymbol());
            renderCard.find('img').prop('src', card.toImagePath()).prop('alt', card.toString());
            renderCard.find('name').html(card.toString());
            return $container.append(renderCard);
        };

        $newRandomButton.on('click',  function() {
            var hand = deck.getHand(5);
            $container.html('');

            for (var i=0; i< hand.cards.length; i++) {
                fillContent(hand.cards[i]);
            }
        });

        $newReadButton.on('click',  function() {
            var $inputField = $("input");
            var hand = new Hand($inputField.val());
            $inputField.val('');
            $container.html('');

            for (var i=0; i< hand.cards.length; i++) {
                fillContent(hand.cards[i]);
            }
        });

    });
} ) ( jQuery );

