SHARED_VARIABLES = {
    cardAttributes: {
        suits: {
            types: ["club", "diamond", "spade", "heart"],
            decrypt: {C:"club", D:"diamond", S:"spade", H:"heart"}
        },
        faces: {
            types: ["ace", "king", "queen", "jack", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            decrypt: {A:"ace", K:"king", Q:"queen", J:"jack", 2:"2", 3:"3", 4:"4", 5:"5", 6:"6", 7:"7", 8:"8", 9:"9", 10:"10"}
        }
    },
    pokerRules: ['straightFlush', 'flush', 'straight', 'fullHouse', 'fourOfAKind', 'threeOfAKind', 'twoPairs', 'onePair'],
    pokerHands: {
        highCard: "High card: ",
        onePair: "One pair",
        twoPairs: "Two pairs",
        threeOfAKind: "Three of a kind",
        straight: "Straight",
        flush: "Flush",
        fullHouse: "Full house",
        fourOfAKind: "Four of a kind",
        straightFlush: "Straight flush"
    }
};

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(character) {
        return character.toUpperCase();
    });
};
String.prototype.cleanInput = function() {
    return this.replace(/\s+$/, '').replace(/^\s+/, '')
};
