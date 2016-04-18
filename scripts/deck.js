var Deck = Class.create({
    initialize: function() {
        this.cards = [];
        this.hands = [];
        this.generate();
    },
    generate: function() {
        var suits = ["club", "diamond", "spade", "heart"],
            faces = ["ace", "king", "queen", "jack", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        var card;
            for (var suitIndex=0; suitIndex<suits.length; suitIndex++) {
            for (var faceIndex=0; faceIndex<faces.length; faceIndex++) {
                card = this.buildCard(suits[suitIndex], faces[faceIndex]);
                this.cards.push(card);
            }
        }
    },
    buildCard: function (suit, face) {
        return new Card(suit, face);
    },
    getHand: function(numOfCards) {
        var randomCard, pickedCards;
        if (this.cards.length <= numOfCards) {
            this.generate();
        }
        pickedCards = [];
        for (var i=0; i<numOfCards; i++) {
            randomCard = this.pickRandomCard();
            pickedCards.push(randomCard);
        }
        var hand = new Hand(pickedCards);
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