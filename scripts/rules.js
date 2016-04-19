var Rules = Class.create({
    initialize: function(sortedHand) {
        this.sortedHand = sortedHand;
        this.foundRules = {};
    },
    isFlush: function (suits) {
        var result = false,
            foundSuits = this.sortedHand.suits;

        for (var i=0; i<suits.length;i++) {
            var cardsSameSuitLength = foundSuits[suits[i]];
            if (cardsSameSuitLength !== undefined && cardsSameSuitLength == 5) {
                result = true;                          // TRUE if a hand has 5 cards with the same suit
                break;
            }
        }
        return result;
    },
    isStraight: function () {
        var result = true,
            rankedCards = this.sortedHand.rankedCards,
            lastRank = rankedCards[0].rank+1;

        for (var i=0; i<rankedCards.length;i++) {
            if (rankedCards[i].rank + 1 == lastRank) {  // since the cards are sorted from biggest to smallest
                lastRank = rankedCards[i].rank;         // I exclude this way cards that have the same value or
            }                                           // a value more than 1 smaller.
            else {
                result = false;
                break;
            }
        }
        return result;
    },
    findHighCard: function() {
        this.foundRules.highCard = this.sortedHand.rankedCards[0];
    },
    findSameFaces: function (faces) {
        var ofAKind = 0,
            pairs = 0,
            foundFaces = this.sortedHand.faces;
        
        for (var i=0; i<faces.length;i++) {

            if (foundFaces[faces[i]] !== undefined) {
                var cardsSameFaceLength = foundFaces[faces[i]];
                if (cardsSameFaceLength > ofAKind) {
                    ofAKind = cardsSameFaceLength;
                }
                if (cardsSameFaceLength == 2) {
                    pairs++;
                }
            }
        }
        return {ofAKind: ofAKind, pairs: pairs}
    },
    applyFaceRules: function(faces) {
        var counted = this.findSameFaces(faces);

        if (counted.ofAKind == 3 && counted.pairs == 1) {
            this.foundRules.fullHouse = true;
        } else if (counted.ofAKind == 4) {
            this.foundRules.fourOfAKind = true;
        } else if (counted.ofAKind == 3) {
            this.foundRules.threeOfAKind = true;
        } else if (counted.pairs == 2) {
            this.foundRules.twoPairs = true;
        } else if (counted.pairs == 1) {
            this.foundRules.onePair = true;
        }
    },
    applyStraightFlushRules: function(suits) {
        var isFlush = this.isFlush(suits),
            isStraight = this.isStraight();

        if (isFlush && isStraight) {
            this.foundRules.straightFlush = true;
        } else if (isFlush) {
            this.foundRules.flush = true;
        } else if (isStraight) {
            this.foundRules.straight = true;
        }
    },
    applyToHand: function() {
        var suits = SHARED_VARIABLES.cardAttributes.suits.types,
            faces = SHARED_VARIABLES.cardAttributes.faces.types;

        this.findHighCard();
        this.applyStraightFlushRules(suits);
        this.applyFaceRules(faces);

        return this.toString();
    },
    toString: function() {
        var tmp = [],
            ruleNames = SHARED_VARIABLES.pokerRules,
            ruleMessages = SHARED_VARIABLES.pokerHands;

        var sym = this.foundRules.highCard.toSymbol(),
            text = ruleMessages.highCard + sym;
        tmp.push(text);

        for (var i=0;i<ruleNames.length;i++) {

            if (this.foundRules[ruleNames[i]]) {
                tmp.push(ruleMessages[ruleNames[i]]);
            }
        }
        return tmp.join(', ');
    }
});
