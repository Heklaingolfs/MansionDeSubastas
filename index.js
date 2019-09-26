const express = require('express');
const bodyParser = require('body-parser');
const artService = require('./services/artService');
const artistService = require('./services/artistService');
const auctionService = require('./services/auctionService');
const customerService = require('./services/customerService');
const { checkError, raiseError } = require('./utils/errorResponses');
const router = express.Router();
const app = express();
const port = 3000;

/*
*// Routes fyrir arts resourse í kerfinu //*
*/

// [GET] /api/arts  **  Nær í arts í kerfinu
router.get('/arts', (req, res) =>
    artService.getAllArts(
        arts => res.json(arts),
        err => raiseError.internalServerError(res, err)
    )
);

// [GET] /api/arts/:id  **  Nær í arts í kerfinu með art auðkenni
router.get('/arts/:id', (req, res) => {
    const { id } = req.params;
    artService.getArtById(id,
        art => res.json(art),
        err => {
            if(checkError.isNotFoundError(err)) return raiseError.notFound(res, err);  
            if(checkError.isFormatError(err))   return raiseError.badRequest(res, err);
            else                                return raiseError.internalServerError(res, err);
        }
    );
});

// [POST] /api/arts  **  Býr til nýjan art í kerfinu
router.post('/arts', (req, res) => {
    const { body } = req;
    artService.createArt(body,
        // Gengur upp - 201
        success => res.status(201).send(),
        err => {
            if(checkError.isValidationError(err))
            {
                // 401 error 
                return raiseError.preconditionFailed(res, err);
            }
            if(checkError.isFormatError(err))
            {
                // 400 error
                return raiseError.badRequest(res, err);
            }
            if(checkError.isBadExternalIdError(err))
            {
                // 404 error
                return raiseError.notFoundExternalId(res, err);
            }
            else
            {
                // 500 error
                return raiseError.internalServerError(res, err);
            }
        }
    );
});


// [GET] /api/arts  **  Nær í alla artista í kerfinu
router.get('/artists', (req, res) =>
    artistService.getAllArtists(
        arts => res.json(arts),
        // 500 error
        err => raiseError.internalServerError(res, err)
    )
);

// [GET] /api/arts/:id  **  Nær í artista í kerfinu eftir atrista auðkenni
router.get('/artists/:id', (req, res) => {
    const { id } = req.params;
    artistService.getArtistById(id,
        artist => res.json(artist),
        err => {
            if(checkError.isNotFoundError(err))
            {
                // 404 error
                return raiseError.notFound(res, err);
            }
            if(checkError.isFormatError(err))
            {
                // 400 errror
                return raiseError.badRequest(res, err);
            }
            else
            {
                // 500 error
                return raiseError.internalServerError(res, err);
            }
        }
    );
});

// [POST] /api/arts  **  Býr til nýjan artista resource í kerfinu
router.post('/artists', (req, res) => {
    // Nýr artist object feer í gegnum request body
    const { body } = req;
    artistService.createArtist(body,
      success => res.status(201).send(),
      err => {
          if (checkError.isValidationError(err))
          {
              // 412 error
              return raiseError.preconditionFailed(res, err);
          }
          else
          {
              // 500 error
              return raiseError.internalServerError(res, err);
          }
      }
    );
});

/*
*// Routes fyrir viðskiptavininn í kerfinu //*
*/


// [GET] /api/customers  **  Nær í alla viðskiptavini í kerfinu
router.get('/customers', (req, res) =>
    customerService.getAllCustomers(
        customers => res.json(customers),
        err => raiseError.internalServerError(res, err)
    )
);

// [GET] /api/customers/:id  **  Nær í viðskiptavin í gegun auðkenni viðskiptavinar
router.get('/customers/:id', (req, res) => {
    const { id } = req.params;
    customerService.getCustomerById(id,
        customer => res.json(customer),
        err => {
            if(checkError.isNotFoundError(err))
            {
                // 404 error
                return raiseError.notFound(res, err);
            }
            if(checkError.isFormatError(err))
            {
                // 400 error
                return raiseError.badRequest(res, err);
            }
            else
            {
                // 500 error
                return raiseError.internalServerError(res, err);
            }
        }
    );
});

// [POST] /api/customers  **  Býr til nýjan viðskitpavin í kerfið
router.post('/customers', (req, res) => {
    const { body } = req;
    // 201 - created
    customerService.createCustomer(body,
        success => res.status(201).send(),
        err => {
            if (checkError.isValidationError(err)){
                // 412 error
                return raiseError.preconditionFailed(res, err);
            }
            else
            {
                // 500 error
                return raiseError.internalServerError(res, err);
            }
        }
    );
});

// [GET] /api/customers/:id/auction-bids  **  Sækir öll uppboðs tilboð sem viðskiptavinur á eftir auðkenni viðskitpavinar
router.get('/customers/:id/auction-bids', (req, res) => {
    const { id } = req.params;
    customerService.getCustomerAuctionBids(id, bids => res.json(bids),
        err => {
            if (checkError.isFormatError(err)){
                // 400 error
                return raiseError.badRequest(res, err);
            }
            else if (checkError.isNotFoundError(err))
            {
                // 404 error
                return raiseError.notFound(res, err);
            }
            else
            {
                // 500 error
                return raiseError.internalServerError(res, err);
            }
        }
    )
});

/*
*// Routes fyrir artista resourse í kerfinu //*
*/

// [GET] /api/auctions  **  Sækir til boðin sem eru í kerfinu
router.get('/auctions', (req, res) =>
    auctionService.getAllAuctions( 
        auctions => res.json(auctions),
        err => checkError.internalServerError(res, err)
    )
);

// [GET] /api/auctions/:id  **  Sækir uppboð eftir uppboðs auðkenni
router.get('/auctions/:id', (req, res) => {
    const { id } = req.params;
    auctionService.getAuctionById(id, auction => res.json(auction),
        err => {
            if(checkError.isNotFoundError(err))
            {
                return raiseError.notFound(res, err);
            }
            if(checkError.isFormatError(err))
            {
                // 400 error
                return raiseError.badRequest(res, err);
            }
            else
            {
                // 500 error
                return raiseError.internalServerError(res, err);
            }
        }
    );
});

// [GET] /api/auctions/:id/winner  **  Sækir sigurvegara á uppboði eftir uppboðs aukenni
router.get('/auctions/:id/winner', (req, res) => {
    const { id } = req.params;
    auctionService.getAuctionWinner(id, auction => res.send(auction),
        err => {
            if(checkError.isNotFoundError(err))
            {
                // 404 error
                return raiseError.notFound(res, err);
            }
            if(checkError.isCustomError(err)){
                // 409 conflict error
                return raiseError.customError(res, err);
            }
            if(checkError.isFormatError(err))
            {
                // 400 error
                return raiseError.badRequest(res, err);
            }
            if(checkError.isValidationError(err))
            {
                // 412 error
                return raiseError.preconditionFailed(res, err);
            }
            else
            {
                // 500 error
                return raiseError.internalServerError(res, err);
            }
        }
    );
});

// [POST] /api/auctions  **  Býr til nýtt uppboð í kerfinu
router.post('/auctions', (req, res) => {
    const { body } = req;
    // stadus 201 - created
    auctionService.createAuction(body,
        success => res.status(201).send(),
        err => {
            if(checkError.isCustomError(err))
            {
                return raiseError.customError(res, err);
            }
            if(checkError.isFormatError(err))
            {
                return raiseError.badRequest(res, err);
            }
            if(checkError.isBadExternalIdError(err))
            {
                return raiseError.notFoundExternalId(res, err);
            }
            if(checkError.isValidationError(err))
            {
                // 412 error - ef modelið er ekki rétt
                return raiseError.preconditionFailed(res, err);
            }
            else
            {
                return raiseError.internalServerError(res, err);
            }
        }
    );
});

// [GET] /api/auctions/:id/bids  **  Sækir öll tilboð í uppboð sem tengjast uppboði
router.get('/auctions/:id/bids', (req, res) => {
    const { id } = req.params;
    auctionService.getAuctionBidsWithinAuction(id,
        bids => res.json(bids),
        err => {
            if(checkError.isCustomError(err))
            {
                return raiseError.isCustomError(res, err);
            }
            if(checkError.isNotFoundError(err))
            {
                // 404 error
                return raiseError.notFound(res, err);
            }
            if(checkError.isFormatError(err))
            {
                // 400 error
                return raiseError.badRequest(res, err);
            }
            else
            {
                // 500 error
                return raiseError.internalServerError(res, err);
            }
        }
    );
});

// [POST] /api/auctions/:id/bids  **  Býr til nýtt tilboðs uppboð í kverfinu
router.post('/auctions/:id/bids', (req, res) => {
    const { body } = req;
    const { id } = req.params;
    // status 201 - created
    auctionService.placeNewBid(id, body.customerId, body.price,
        newAuction => res.status(201).send(),
        err => {
            if(checkError.isNotFoundError(err))
            {
                // 404 error
                return raiseError.notFound(res, err);
            }
            if(checkError.isCustomError(err))
            {
                // 412 error - modelið er ekki rétt
                return raiseError.customError(res, err);
            }
            if(checkError.isFormatError(err))
            {
                // 400 error
                return raiseError.badRequest(res, err);
            }
            if(checkError.isValidationError(err))
            {
                // 403 error - ef tímasetning er liðin
                return raiseError.preconditionFailed(res, err);
            }
            if(checkError.isBadExternalIdError(err)){
                return raiseError.notFoundExternalId(res, err);
            }
            else
            {
                // 500 error
                return raiseError.internalServerError(res, err);
            }
        }
    );
});

/*
*// Skipulag serversins á portið //*
*/
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    if (err) {
      res.status(400).send('Invalid request data');
    } else {
      next()
    }
});
app.use('/api', router);
app.listen(port || process.env.PORT, () => console.log(`The server is listening on port ${port}`));