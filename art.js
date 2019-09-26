const Schema = require('mongoose').Schema;

// Schema fyrir arts

module.exports = new Schema(

{
    //Art titill
    title: { type: String, required: true },

    // Auðkenni fyrir artista á arti
    artistId: { type: Schema.Types.ObjectId, required: true },

    // Dagseetning á arti
    date: { type: Date, required: true, default: new Date() },

    // Fylki af URLum fyrir myndir af artinu
    images: Array,

    // Lýsing á artinu
    description: String,

    // Boolian sem sendir true ef afftið er á uppboði
    isAuctionItem: { type: Boolean, default: false },
    
}, { collection: 'arts' });
