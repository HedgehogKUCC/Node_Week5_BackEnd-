const bcrypt = require('bcryptjs');

const UserModel = require('../models/User');
const appError = require('../service/appError');
const success = require('../service/responseSuccess');

module.exports = {
    async getUser(req, res, next) {
        try {
            const { id } = req.params;
            const data = await UserModel.findById(id, 'name avatar');
            success(res, data);
        } catch(err) {
            return appError(err.message, next);
        }
    },
    async insertUser(req, res, next) {
        try {
            const data = req.body;
            const {
                name,
                sex,
                email,
                password,
            } = data;

            if ( !name ) {
                return appError('【暱稱】必填', next);
            }

            if ( !sex ) {
                return appError('【性別】必填', next);
            }

            if ( !email ) {
                return appError('【帳號】必填', next);
            }

            if ( !password ) {
                return appError('【密碼】必填', next);
            }

            data.password = await bcrypt.hash(data.password, 12);

            const result = await UserModel.create(data);
            result.password = undefined;

            success(res, result, 201);
        } catch(err) {
            return appError(err.message, next);
        }
    }
}
