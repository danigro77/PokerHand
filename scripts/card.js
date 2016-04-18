var Card = Class.create({
    initialize: function(face, suit) {
        this.face = face;
        this.suit = suit;
    },
    toSymbol: function() {
        return this.face[0].toUpperCase() + this.suit[0].toUpperCase();
    },
    toString: function() {
        return this.face.capitalize() + " " + this.suit.capitalize();
    },
    toImagePath: function() {
        return "#";
        // return './images/' + this.face + '_' + this.suit + '.jpg';
    }
});