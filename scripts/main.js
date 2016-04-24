( function($) {
    $(document).ready(function() {
        var deck = new Deck(),
            $container = $('.cards-container ul'),
            $template = $('#templates li'),
            $handKind = $('.hand-kind'),
            $newRandomButton = $('#new-hand-random'),
            $newReadButton = $('#new-hand-text'),
            $inputField = $("input");

        // FUNCTIONS =======================================

        var fillContent = function(card) {
            var renderCard = $template.clone();
            renderCard.addClass(card.toSymbol());
            renderCard.find('img').prop('src', card.toImagePath()).prop('alt', card.toString());
            renderCard.find('.name').html(card.toString());
            return $container.append(renderCard);
        };

        var showContent = function(hand) {
            $container.html('');
            var cards = hand.sortedCards();

            for (var i=0; i< cards.length; i++) {
                fillContent(cards[i]);
            }
            $handKind.html(hand.pokerHand);
        };
        
        // EVENTS =======================================

        $newRandomButton.on('click',  function() {
            var hand = deck.getHand(5);

            showContent(hand);
        });

        $newReadButton.on('click',  function() {
            var input = $inputField.val(),
                hand = new Hand(input);
            
            if (hand.validHandInput(hand.cards)) {
                $inputField.removeClass('red');
                $inputField.val('');
                showContent(hand);
            } else {
                $inputField.addClass('red');
            }

        });

    });
} ) ( jQuery );

