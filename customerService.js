// Sér um gögn viðskiptavinar í kerfinu

const customerService = () => {

    // Nær í alla viðskiptavini
    const getAllCustomers = (cb, errorCb) => {
        // Your implementation goes here
        Customer.find({}, (error, customers) => {
            if(error)
            {
                err(error);
            }
            else
            {
                cb(customers);
            }
        });
    };

    //Nær í akveðinn viðskiptavin í kerfinu
    const getCustomerById = (id, cb, errorCb) => {
        // Your implementation goes here
        Customer.findById(id, (error, customer) => {
            if(error)
            {
                err(error);
            }
            else if (customer === null)
            {
                err(getNotFoundError('customer', 'id', id));
            }
            else
            {
                cb(customer);
            }
        });
    };

    // Sækir öll tilboð hjá ákveðnum við skiptavini
    const getCustomerAuctionBids = (customerId, cb, errorCb) => {
        // Your implementation goes here
        Customer.findById(customerId, (error, customer) => {
            if(error)
            {
                err(error);
            }
            else if(customer !== null)
            {
                findBidsByCustomer(customerId, cb, err);
            }
            else
            {
                err(getNotFoundError('Customer', 'id', customerId));
            }
        });
    };

    // Búatil nýjan viðskiptvin
	const createCustomer = (customer, cb, errorCb) => {
        // Your implementation goes here
        Customer.create({
            name: customer.name,
            username: customer.username,
            email: customer.email,
            address: customer.address
            }, error => {
                if(error)
                {
                    err(error);
                }
                else
                {
                    cb(true);
                }
            }
        );
    };

    return {
        getAllCustomers,
        getCustomerById,
        getCustomerAuctionBids,
		createCustomer
    };
};

module.exports = customerService();
