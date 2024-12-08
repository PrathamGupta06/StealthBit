import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);
    res.status(406).send(err.message);
};

export default errorHandler;

