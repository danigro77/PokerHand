var Hand = Class.create({
    initialize: function(cards) {
        this.fullHand = 5;
        if (typeof cards === "string" && cards.length === 0) {  // when no input, but text was submitted
            this.handleErrors({alert: 'You need to fill out the form!'});
        } else if (typeof cards === "string") {                 // when user input
            this.cards = [];
            this.handleInput(cards.cleanInput());
        } else {                                                // when random cards are requested
            this.cards = cards;
        }
        this.cardsAndStats = {suits: {}, faces: {}};
        this.pokerHand = this.applyRules();
    },
    handleInput: function(cardString) {                    // cardString = 'AC AD 7H 5D 5H'
        var cards = cardString.split(' ');

        if (this.validHandInput(cards)) {
            this.transformToCards(cards);
        } else if (cards.length > this.fullHand) {
            this.handleErrors({alert: "You asked for too many cards. A hand can only hold 5."});
        } else if (cards.length < this.fullHand) {
            this.handleErrors({alert: "You need more cards. A hand holds 5."});
        } else {
            this.handleErrors({alert: "Only 5 unique cards are allowed."});
        }
    },
    handleErrors: function(errors) {
        if (errors.typo !== undefined) {
            alert("Cards not found. Please check for typos: " + errors.typo.join(' '));
        }
        if (errors.alert !== undefined) {
            alert(errors.alert);
        }
    },
    transformToCards: function(cards) {
        var face, suit, suitFace;
        var errors = [];
        
        for (var i=0; i<this.fullHand;i++) {
            suitFace = this.decryptFaceSuit(cards[i]);
            face = suitFace.face;
            suit = suitFace.suit;

            if (suit !== undefined && face !== undefined && this.cards.length <= this.fullHand) {
                this.cards.push(new Card(face, suit));
            } else {
                errors.push(cards[i]);
            }
        }
        if (errors.length > 0) {
            this.handleErrors({typo: errors});
        }
    },
    decryptFaceSuit: function (card) {
        var cardSymbols, symF, symS;
        cardSymbols = card.split('');

        if (cardSymbols.length === 3) {
            symF = cardSymbols.slice(0, 2).join('');
            symS = cardSymbols[2];
        } else {
            symS = cardSymbols[1];
            symF = cardSymbols[0];
        }
        suit = SHARED_VARIABLES.cardAttributes.suits.decrypt[symS];
        face = SHARED_VARIABLES.cardAttributes.faces.decrypt[symF];

        return {suit: suit, face: face};
    },
    applyRules: function() {
        if (this.cards !== undefined && this.cards.length === this.fullHand) {
            this.sortCards();
            this.countCards();
            var rules = new Rules(this.cardsAndStats);
            return rules.applyToHand();
        }
    },
    sortCards: function() {
        this.cardsAndStats.rankedCards = this.cards.sort(function (a, b) {
            return b.rank - a.rank
        });
    },
    countCards: function () {
        for (var i=0; i<this.cards.length; i++) {
            var card = this.cards[i];
            if (this.cardsAndStats.suits[card.suit] === undefined) {
                this.cardsAndStats.suits[card.suit] = 0;
            }
            if (this.cardsAndStats.faces[card.face] === undefined) {
                this.cardsAndStats.faces[card.face] = 0;
            }
            this.cardsAndStats.suits[card.suit]++;
            this.cardsAndStats.faces[card.face]++;
        }
    },
    validHandInput: function (cards) {
        var fiveCards = cards !== undefined && cards.length === this.fullHand;
        return fiveCards && this.uniqueCards(cards)
    },
    uniqueCards: function (cards) {
        var unique = true,
            sorted = cards.sort();
        for (var i=0; i<sorted.length-1; i++) {
            if (sorted[i] === sorted[i+1]) {
                unique = false;
                break;
            }
        }
        return unique;
    }
});