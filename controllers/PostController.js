const PostModel = require('../models/Post');
const { success, error } = require('../service/responseHandle');

module.exports = {
    async getPosts(req, res) {
        try {
            const { s, q } = req.query;
            const timeSort = s === 'asc' ? 'createdAt' : '-createdAt';
            const userQuery = q !== undefined ? { "content": new RegExp(req.query.q) } : {};
            const result = await PostModel.find(userQuery).populate({
                path: 'userID',
                select: 'name avatar',
            }).sort(timeSort);
            success(res, result);
        } catch(err) {
            error(res, err.message);
        }
    },
    async insertPost(req, res) {
        try {
            const data = req.body;
            const {
                userID,
                content,
            } = data;

            if ( !userID ) {
                error(res, '請登入帳號');
                return;
            }

            if ( !content ) {
                error(res, '【貼文內容】必填');
                return;
            }

            const result = await PostModel.create(data);
            success(res, result);
        } catch(err) {
            error(res, err.message);
        }
    },
}
