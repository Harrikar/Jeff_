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
exports.__esModule = true;
exports.Alliance = void 0;
var earthmc_1 = require("earthmc");
var CommandTools_1 = require("./utils/CommandTools");
var earthmc_2 = require("earthmc");
var Alliance = /** @class */ (function () {
    function Alliance(entity, Send) {
        this.entity = entity;
        this.Send = Send;
    }
    Alliance.prototype.a = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.entity.on('message', function (message) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        try {
                            this.Send.sendUserMessage("this is the main /a command for alliance info use /a info");
                        }
                        catch (e) {
                            this.Send.sendUserEmbed(e);
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    Alliance.prototype.info = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var commandString;
            var _this = this;
            return __generator(this, function (_a) {
                commandString = "info of alliance " + name;
                this.entity.on('message', function (message) { return __awaiter(_this, void 0, void 0, function () {
                    var alliance, members, inputList, splited, totalBalance, _i, splited_1, nationName, nation, error_1, fields, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 7, , 8]);
                                alliance = earthmc_1.Aurora.alliance(name);
                                members = alliance.members;
                                inputList = CommandTools_1.CommandTools.splitOnChanges(members);
                                splited = CommandTools_1.CommandTools.varnew(inputList);
                                totalBalance = 0;
                                _i = 0, splited_1 = splited;
                                _a.label = 1;
                            case 1:
                                if (!(_i < splited_1.length)) return [3 /*break*/, 6];
                                nationName = splited_1[_i];
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 5]);
                                return [4 /*yield*/, earthmc_2.OfficialApi.nation(nationName)];
                            case 3:
                                nation = _a.sent();
                                totalBalance += nation.balance;
                                return [3 /*break*/, 5];
                            case 4:
                                error_1 = _a.sent();
                                this.Send.sendErrorEmbed(error_1);
                                return [3 /*break*/, 5];
                            case 5:
                                _i++;
                                return [3 /*break*/, 1];
                            case 6:
                                fields = [
                                    { name: 'Name', value: name + " " + alliance.discord + " ", inline: true },
                                    { name: 'Residents', value: alliance.Residents, inline: true },
                                    { name: 'Towns', value: alliance.Towns },
                                    { name: 'Total Balance', value: totalBalance.toString(), inline: true },
                                    { name: 'Residents', value: alliance.residents, inline: true }
                                ];
                                this.Send.sendUserEmbed(fields);
                                return [3 /*break*/, 8];
                            case 7:
                                e_1 = _a.sent();
                                this.Send.sendErrorEmbed(e_1);
                                return [3 /*break*/, 8];
                            case 8: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    return Alliance;
}());
exports.Alliance = Alliance;
