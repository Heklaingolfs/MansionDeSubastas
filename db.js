const mongoose = require('mongoose');
const artSchema = require('../schemas/art');
const artistSchema = require('../schemas/artist');
const auctionSchema = require('../schemas/auction');
const auctionBidSchema = require('../schemas/auctionBid');
const customerSchema = require('../schemas/customer');

const connection = mongoose.createConnection('insert-your-mongodb-connection-string-here', { useNewUrlParser: true });

/*
????? 
const mongoDBString = "mongodb://subastista:i-love-ponies1@ds123753.mlab.com:23753/mansiondesubastas"
const connection = mongoose.createConnection(mongoDBString, { useNewUrlParser: true });
*/

module.exports = {
    Art: connection.model('Art', artSchema),
    Artist: connection.model('Artist', artistSchema),
    Auction: connection.model('Auction', auctionSchema),
    AuctionBid: connection.model('AuctionBid', auctionBidSchema),
    Customer: connection.model('Customer', customerSchema)
};
