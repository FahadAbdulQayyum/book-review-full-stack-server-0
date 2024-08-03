"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_1 = require("../controller/books");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.get('/', books_1.getBooks)
    .post('/', books_1.addBook)
    .put('/:id', auth_1.default, books_1.updateBook)
    .delete('/:id', auth_1.default, books_1.deleteBook);
exports.default = router;
