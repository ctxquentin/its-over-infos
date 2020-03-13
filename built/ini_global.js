"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var parser = require("node-html-parser");
var axios_1 = require("axios");
var configz = require("./configz/constants");
var urlGuild = configz.urlGuild;
var urlMembers = configz.urlMembersGuilde;
exports.getGuildData = function (url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, final_data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    response = axios_1.default.get(url);
                    return [4 /*yield*/, response];
                case 1:
                    data = _a.sent();
                    final_data = exports.parseActu(data);
                    return [2 /*return*/, final_data];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getGuildClassPages = function (url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, final_data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    response = axios_1.default.get(url);
                    return [4 /*yield*/, response];
                case 1:
                    data = _a.sent();
                    final_data = exports.parseClassPages(data);
                    return [2 /*return*/, final_data];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getGuildClass = function (pages, url, classe) {
    return __awaiter(this, void 0, void 0, function () {
        var classesAmount_1, n, arrayOfAllClasses, res, data, final_data, final_string, amount, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    classesAmount_1 = {
                        "Ecaflip": 0, "Eniripsa": 0, "Iop": 0, "Cra": 0, "Feca": 0, "Sacrieur": 0,
                        "Sadida": 0, "Osamodas": 0, "Enutrof": 0, "Sram": 0, "Xelor": 0, "Pandawa": 0,
                        "Roublard": 0, "Zobal": 0, "Steamer": 0, "Eliotrope": 0, "Huppermage": 0, "Ouginak": 0
                    };
                    n = 0;
                    arrayOfAllClasses = [];
                    _a.label = 1;
                case 1:
                    if (!(n < pages)) return [3 /*break*/, 3];
                    n++;
                    res = axios_1.default.get(url + '?page=' + n);
                    return [4 /*yield*/, res];
                case 2:
                    data = _a.sent();
                    final_data = exports.parseClass(data);
                    arrayOfAllClasses = arrayOfAllClasses.concat(final_data);
                    return [3 /*break*/, 1];
                case 3:
                    ;
                    arrayOfAllClasses.forEach(function (element) {
                        classesAmount_1[element]++;
                    });
                    final_string = '';
                    for (amount in classesAmount_1) {
                        final_string += amount + ": " + classesAmount_1[amount] + " \n";
                    }
                    if (classe !== undefined) {
                        final_string = 'Il y a ' + classesAmount_1[classe.charAt(0).toUpperCase() + classe.slice(1)] + ' ' + classe + ' dans la guilde.';
                        if (classesAmount_1[classe.charAt(0).toUpperCase() + classe.slice(1)] == undefined)
                            final_string = 'Nom de classe incorrecte';
                    }
                    return [2 /*return*/, final_string];
                case 4:
                    err_2 = _a.sent();
                    console.log(err_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.getCatFact = function () {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    response = axios_1.default.get('https://some-random-api.ml/facts/cat');
                    return [4 /*yield*/, response];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getMeme = function () {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    response = axios_1.default.get('https://some-random-api.ml/meme');
                    return [4 /*yield*/, response];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getPikaPic = function () {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    response = axios_1.default.get('https://some-random-api.ml/pikachuimg');
                    return [4 /*yield*/, response];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 2:
                    error_4 = _a.sent();
                    console.log(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.parseActu = function (html) {
    var root = parser.parse(html.data);
    var actus = root.querySelectorAll('.ak-actions-list .ak-title');
    var string = '';
    actus.forEach(function (element) {
        string += exports.strip(element.toString()).trim() + '\n';
    });
    return string;
};
exports.parseClassPages = function (html) {
    var root = parser.parse(html.data);
    var pagesLi = root.querySelectorAll('.ak-pagination .pagination li');
    var lastPageButt = pagesLi[pagesLi.length - 1].toString();
    var amountPages = lastPageButt.split('?page=')[1].charAt(0);
    return amountPages;
};
exports.parseClass = function (html) {
    var root = parser.parse(html.data);
    var icons = root.querySelectorAll('.ak-breed-icon');
    var listOfClass = [];
    icons.forEach(function (element) {
        listOfClass.push(element.rawAttrs.split(' ')[2].split('"')[1]);
    });
    return listOfClass;
};
exports.strip = function (s) {
    return s.replace(/<[^>]*>?/gm, '');
};
