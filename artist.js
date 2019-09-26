const Schema = require('mongoose').Schema;

// Schema fyrir artista

module.exports = new Schema(

    // Nafn á aftistanum
    {
    name: { type: String, required: true },

    // Nickname fyrir artistann
    nickname: { type: String, required: true },

    // Heimilisfang artistans
    address: { type: String, required: true },

    // Dagsetning þegar artistin bættist við í uppboðshópinn
    memberSince: { type: Date, required: true, default: new Date() },
    
}, { collection: 'artists' });
