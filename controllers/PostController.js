const PostModel = require('../models/Post');
const UserModel = require('../models/User');
const appError = require('../service/appError');
const success = require('../service/responseSuccess');

module.exports = {
    async getPosts(req, res, next) {
        const { s, q } = req.query;
        const timeSort = s === 'asc' ? 'createdAt' : '-createdAt';
        const userQuery = q !== undefined ? { "content": new RegExp(req.query.q) } : {};
        const result = await PostModel.find(userQuery).populate({
            path: 'userID',
            select: 'name avatar',
        }).sort(timeSort);
        success(res, result);
    },
    async insertPost(req, res, next) {
        const data = req.body;
        const {
            userID,
            content,
        } = data;

        if ( !userID ) {
            return appError('請登入帳號', next);
        }

        if ( !content ) {
            return appError('【貼文內容】必填', next);
        }

        const hasUserID = await UserModel.findById(userID).exec();
        if ( !hasUserID ) {
            return appError('請註冊帳號', next);
        }

        const result = await PostModel.create(data);
        success(res, result, 201);
    },
    async delSinglePost(req, res, next) {
        const { userID } = req.body;
        const { id } = req.params;

        if ( !userID ) {
            return appError('請登入帳號', next);
        }

        const hasUserID = await UserModel.findById(userID).exec();
        if ( !hasUserID ) {
            return appError('請註冊帳號', next);
        }

        const result = await PostModel.findByIdAndDelete(id);
        if ( !result ) {
            return appError('沒有這則貼文', next);
        }
        success(res, '成功刪除單筆貼文');
    },
    async delAllPosts(req, res, next) {
        if ( req.originalUrl !== '/posts' ) {
            return appError(`伺服器收到 ${req.originalUrl} 與 /posts 不符`, next);
        }

        const { userID } = req.body;

        if ( !userID ) {
            return appError('請登入帳號', next);
        }

        const hasUserID = await UserModel.findById(userID).exec();
        if ( !hasUserID ) {
            return appError('請註冊帳號', next);
        }

        const result = await PostModel.deleteMany();
        if ( result.deletedCount === 0 ) {
            return appError('已無貼文', next);
        }
        success(res, '成功刪除全部貼文');
    }
}
