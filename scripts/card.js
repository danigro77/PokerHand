var Card = Class.create({
    initialize: function(face, suit) {
        this.face = face;
        this.suit = suit;
        this.rank = this.getRank();
    },
    getRank: function() {
        switch(this.face) {
            case 'ace':
                return 14;
                break;
            case 'king':
                return 13;
                break;
            case 'queen':
                return 12;
                break;
            case 'jack':
                return 11;
                break;
            default:
                return parseInt(this.face);
        }
    },
    toSymbol: function() {
        var faceSym;
        if (this.face === "10" || this.face === 10) {
            faceSym = '10';
        } else {
            faceSym = this.face[0].toUpperCase()
        }
        return faceSym + this.suit[0].toUpperCase();
    },
    toString: function() {
        return this.face.capitalize() + " of " + this.suit.capitalize() + "s";
    },
    toImagePath: function() {
        return './images/' + this.toSymbol() + '.png';
    }
});