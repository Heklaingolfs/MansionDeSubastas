// Vinnur uppboðin í kerfinu
const auctionService = () => {

    //Nær í öll uppboð
    const getAllAuctions = (cb, errorCb) => {
        // Your implementation goes here
        Auction.find({}, (error, auctions) => { 
            if (error) 
            {
                err(error); 
            }
            else 
            {
                cb(auctions); 
            }});
    };

    // Nær í uppboð eftir aukenni
    const getAuctionById = (id, cb, errorCb) => {
        // Your implementation goes here
        Auction.findById(id, (error, auction) => {
            if (error)
            {
                err(error);
            }
            else if (auction === null)
            {
                err(getNotFoundError('auction', 'id', id));
            }
            else
            {
                cb(auction);
            }
        });

    };

    // Nær í sigurvegara fyrir uppboðið með uppboðs auðikenni
    const getAuctionWinner = (auctionId, cb, errorCb) => {
        // Your implementation goes here
        Auction.findById(auctionId, (error, auction) => {
            if(error)
            {
                err(error);
            }
            else if(auction === null)
            {
                err(getNotFoundError('auction', 'id', auctionId));
            }
            else if(auction.endDate > new Date())
            {
                err(getCustomError(409, 'Auction has not finished'));
            }
            else if(!auction.auctionWinner)
            {
                cb('This auction had no bids.');
            }
            else 
            {
                Customer.findById(auction.auctionWinner, (customerError, customer) => {
                    if (customerError)
                    {
                        err(customerError);
                    }
                    else
                    {
                        cb(customer);
                    }
                })
            }
        });
    };
// Búa til nýtt uppboð í kerfið
	const createAuction = (auction, cb, errorCb) => {
        // Your implementation goes here
        // Byrja á að ath hvort auðkenni sé til
        Art.findById(auction.artId, (error, art) => {
            if(error)
            {
                err(error);
            }
            else if(!art)
            {
                err(getExternalIdNotFoundError('artId', auction.artId));
            }
            else if (!art.isAuctionItem)
            {
                err(getCustomError(412, 'The art being put up for auction is not an auction item'));
            }
            else
            {
                createNewAuction(auction, cb, err);
            }
        });
    };

    // Fær tilboð í uppboðið
	const getAuctionBidsWithinAuction = (auctionId, cb, errorCb) => {
        // Your implementation goes here
        // Byrja á að ath hvort uppboðsauðkennið sé rétt
        Auction.findById(auctionId, (auctionError, auction) => {
            if(auctionError)
            {
                err(auctionError);
            }
            else if(auction === null)
            {
                err(getNotFoundError('auction', 'id', auctionId));
            }
            else {
                AuctionBid.find({ auctionId }, (error, bids) => {
                    if(error)
                    {
                        err(error);
                    }
                    else
                    {
                        cb(bids);
                    }
                });
            }
        })
    };

	const placeNewBid = (auctionId, customerId, price, cb, errorCb) => {
		// Your implementation goes here
        Auction.findById(auctionId, (error, auction) => {
            if(error)
            {
                err(error);
            }
            else if(auction === null)
            {
                err(getNotFoundError('Auction', '_id', auctionId));
            }
            else if(auction.endDate < new Date())
            {
                err(getCustomError(403, 'Auction has reached end date' ));
            }
            else if(auction.minimumPrice > price)
            {
                err(getCustomError(412, 'Bid price cannot be less than minimum asking price'));
            }
            else
            {
                validateCustomerAndPlaceBid(auctionId, customerId, price, auction, cb, err);
            }
        });
    }
    return {
        getAllAuctions,
        getAuctionById,
        getAuctionWinner,
        createAuction,
        getAuctionBidsWithinAuction,
        placeNewBid
    };
};

module.exports = auctionService();