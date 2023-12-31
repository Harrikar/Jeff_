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
exports.Devcommands = void 0;
var pm2 = require("pm2");
var Devcommands = /** @class */ (function () {
    function Devcommands(entity, send) {
        this.entity = entity;
        this.send = send;
    }
    Devcommands.prototype.restart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.entity.on('message', function (message) { return __awaiter(_this, void 0, void 0, function () {
                    var guildId, guild, user, roleId, user_id, member, e_1;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 4, , 5]);
                                guildId = '1131117400985706538';
                                guild = this.entity.guilds.cache.get(guildId);
                                if (!guild) {
                                    return [2 /*return*/];
                                }
                                user = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.user;
                                roleId = '1131896754070093954';
                                if (!user) return [3 /*break*/, 3];
                                user_id = user.id;
                                member = guild.members.cache.get(user_id);
                                if (!(member && member.roles.cache.has(roleId))) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.send.sendUserMessage('restarting')];
                            case 1:
                                _b.sent();
                                pm2.restart;
                                return [3 /*break*/, 3];
                            case 2:
                                this.send.sendUserMessage('this command is for devs only');
                                _b.label = 3;
                            case 3: return [3 /*break*/, 5];
                            case 4:
                                e_1 = _b.sent();
                                throw new Error;
                            case 5: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    Devcommands.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.entity.on('message', function (message) { return __awaiter(_this, void 0, void 0, function () {
                    var guildId, guild, user, roleId, member, e_2;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 4, , 5]);
                                guildId = '1131117400985706538';
                                guild = this.entity.guilds.cache.get(guildId);
                                if (!guild) {
                                    return [2 /*return*/];
                                }
                                user = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.user;
                                roleId = '1131896754070093954';
                                if (!user) return [3 /*break*/, 3];
                                member = guild.members.cache.get(user.id);
                                if (!(member && member.roles.cache.has(roleId))) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.send.sendUserMessage('stoping')];
                            case 1:
                                _b.sent();
                                pm2.stop;
                                return [3 /*break*/, 3];
                            case 2:
                                this.send.sendUserMessage('this command is for devs only');
                                _b.label = 3;
                            case 3: return [3 /*break*/, 5];
                            case 4:
                                e_2 = _b.sent();
                                throw new Error;
                            case 5: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    return Devcommands;
}());
exports.Devcommands = Devcommands;
