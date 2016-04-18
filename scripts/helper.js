SHARED_VARIABLES = {
    suits: {
        types: ["club", "diamond", "spade", "heart"],
        decrypt: {C:"club", D:"diamond", S:"spade", H:"heart"}
    },
    faces: {
        types: ["ace", "king", "queen", "jack", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        decrypt: {A:"ace", K:"king", Q:"queen", J:"jack", 2:"2", 3:"3", 4:"4", 5:"5", 6:"6", 7:"7", 8:"8", 9:"9", 10:"10"}
    }
};

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};
