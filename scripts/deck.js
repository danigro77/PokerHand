var Deck = Class.create({
    initialize: function() {
        this.cards = [];
        this.hands = [];
        this.generateCards();
    },
    generateCards: function() {
        var suits = SHARED_VARIABLES.cardAttributes.suits.types,
            faces = SHARED_VARIABLES.cardAttributes.faces.types;
        var card;
        
        for (var suitIndex=0; suitIndex<suits.length; suitIndex++) {
            for (var faceIndex=0; faceIndex<faces.length; faceIndex++) {
                card = new Card(faces[faceIndex], suits[suitIndex]);
                this.cards.push(card);
            }
        }
    },
    generateHand: function(numOfCards) {
        var randomCard;
        var pickedCards = [];
        for (var i=0; i<numOfCards; i++) {
            randomCard = this.pickRandomCard();
            pickedCards.push(randomCard);
        }
        return new Hand(pickedCards);
    },
    getHand: function(numOfCards) {
        var hand;
        if (this.cards.length <= numOfCards) {
            this.generateCards();
        }
        hand = this.generateHand(numOfCards);
        this.hands.push(hand);
        return hand;
    },
    pickRandomCard: function() {
        var index, card;
        index = Math.floor(Math.random()*this.cards.length);
        card = this.cards[index];
        this.cards.splice(index, 1);
        return card;
    }

});