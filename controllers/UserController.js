const bcrypt = require('bcryptjs');

const UserModel = require('../models/User');
const { success, error } = require('../service/responseHandle');

module.exports = {
    async getUser(req, res) {
        try {
            const { id } = req.params;
            const data = await UserModel.findById(id, 'name avatar');
            success(res, data);
        } catch(err) {
            error(res, err.message);
        }
    },
    async insertUser(req, res) {
        try {
            const data = req.body;
            const {
                name,
                sex,
                email,
                password,
            } = data;

            if ( !name ) {
                error(res, '【暱稱】必填');
                return;
            }

            if ( !sex ) {
                error(res,  '【性別】必填');
                return;
            }

            if ( !email ) {
                error(res, '【帳號】必填');
                return;
            }

            if ( !password ) {
                error(res, '【密碼】必填');
                return;
            }

            data.password = await bcrypt.hash(data.password, 12);

            const result = await UserModel.create(data);
            result.password = undefined;

            success(res, result);
        } catch(err) {
            error(res, err.message);
        }
    }
}
