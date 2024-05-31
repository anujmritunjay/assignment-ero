const ErrorHandler = require('./../utilities/errorHandler')
const Customer = require('./../models/customer')

exports.addCustomer = async(req, res, next)=>{
    try {
        const { name, email, phone, address } = req.body;
        const customer = await Customer.create({ name, email, phone, address });
        if(customer && customer.id){
            res.status(201).json({
                success: true,
                data: customer.dataValues
            })
        }else{
            return next(new ErrorHandler('Failed to create customer'))
        }
    } catch (error) {
        return next(error)
    }
}


exports.getCustomer = async(req, res, next)=>{
    try {
        const customerId  = req.params.customerId;
        const customer = await Customer.findByPk(customerId)
        if(customer && customer.id){
            res.status(201).json({
                success: true,
                data: customer.dataValues
            })
        }else{
            return next(new ErrorHandler('Failed to create customer'))
        }
    } catch (error) {
        return next(error)
    }
}


exports.updateCustomer = async (req, res, next) => {
    try {
        const customerId = req.params.customerId;
        const { name, email, phone, address } = req.body;

        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            return next(new ErrorHandler('Customer not found', 404));
        }

        const data = await Customer.update({ name, email, phone, address }, { where: { id: customerId } });
        const updatedCustomer = await Customer.findByPk(customerId);

        res.status(200).json({
            success: true,
            data: updatedCustomer
        });
    } catch (error) {
        return next(error);
    }
};

exports.getAllCustomers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const customers = await Customer.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']] 
        });

        res.status(200).json({
            success: true,
            data: customers.rows,
            total: customers.count,
            page: page,
        });
    } catch (error) {
        return next(error);
    }
};


exports.deleteCustomer = async (req, res, next) => {
    try {
        const customerId = req.params.customerId;

        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            return next(new ErrorHandler('Customer not found', 404));
        }

        await customer.destroy();

        res.status(200).json({
            success: true,
            message: 'Customer deleted successfully'
        });
    } catch (error) {
        return next(error);
    }
};


