var Hand = Class.create({
    initialize: function(cards) {
        if (typeof cards === "string") {
            this.cards = [];
            this.translateToCards(cards);
        } else {
            this.cards = cards;
        }
        this.poker = [];
    },
    translateToCards: function(cardString) { // cardString = 'AC AD 7H 5D 5H'
        var face, suit, cardSymbols;
        var errors = [];
        var cards = cardString.split(' ');
        for (var i=0; i<cards.length;i++) {
            cardSymbols = cards[i].split('');
            suit = SHARED_VARIABLES.suits.decrypt[cardSymbols[1]];
            face = SHARED_VARIABLES.faces.decrypt[cardSymbols[0]];
            if (suit != undefined && face != undefined) {
                this.cards.push(new Card(suit, face));
            } else {
                errors.push(cards[i]);
            }
        }
        this.errorMessages(errors);
    },
    errorMessages: function(errors) {
        if (errors.length > 0) {
            var newInput = prompt("Those cards do not exist. Please check for typos! " + errors.join(' '));
            if (newInput != null) {
                this.translateToCards(newInput);
            }
        }
    }
});