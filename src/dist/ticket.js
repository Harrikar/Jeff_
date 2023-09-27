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
exports.Ticket = void 0;
var Ticket = /** @class */ (function () {
    function Ticket(entity, send) {
        this.entity = entity;
        this.send = send;
    }
    Ticket.prototype.ticket = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.send.sendUserMessage('this is the main ticket command use the /ticket open to open a ticket');
                }
                catch (e) {
                    this.send.sendUserMessage("Unexpected error " + e);
                }
                return [2 /*return*/];
            });
        });
    };
    Ticket.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.entity.on('message', function (message) { return __awaiter(_this, void 0, void 0, function () {
                    var guild, channel, ticketer, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                guild = message.guild;
                                return [4 /*yield*/, guild.channels.create('new-channel', {
                                        name: message.author + " ticket ",
                                        type: 'GUILD_TEXT',
                                        topic: '',
                                        reason: "ticket channel for " + message.author
                                    })];
                            case 1:
                                channel = _a.sent();
                                ticketer = message.author;
                                channel.send(message.author + " list the reason for opening your ticket and an admin will be here to help you");
                                return [3 /*break*/, 3];
                            case 2:
                                e_1 = _a.sent();
                                this.send.sendErrorsend(e_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    Ticket.prototype.claim = function (channel) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.entity.on('message', function (message) { return __awaiter(_this, void 0, void 0, function () {
                    var guildId, guild, user, roleId, member;
                    return __generator(this, function (_a) {
                        try {
                            guildId = '1038964213961457674';
                            guild = this.entity.guilds.cache.get(guildId);
                            if (!guild) {
                                return [2 /*return*/];
                            }
                            user = message.author;
                            roleId = '1039114027198070864';
                            member = guild.members.cache.get(user.id);
                            if (member && member.roles.cache.has(roleId)) {
                                channel.send(message.author + " will help your ticket");
                            }
                            else {
                                channel.send('you dont hace the perms for this');
                            }
                        }
                        catch (e) {
                            this.send.sendErrorsend(e);
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    Ticket.prototype.close = function (channel, ticketer) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.entity.on('message', function (message) { return __awaiter(_this, void 0, void 0, function () {
                    var guildId, guild, user, roleId, member;
                    return __generator(this, function (_a) {
                        try {
                            guildId = '1038964213961457674';
                            guild = this.entity.guilds.cache.get(guildId);
                            if (!guild) {
                                return [2 /*return*/];
                            }
                            user = message.author;
                            roleId = '1039114027198070864';
                            member = guild.members.cache.get(user.id);
                            if (member && member.roles.cache.has(roleId)) {
                                channel.send(message.author + " closed your ticket");
                            }
                            else {
                                channel.send('you dont hace the perms for this');
                            }
                            ticketer.send("your ticket was close by " + message.author);
                        }
                        catch (e) {
                            this.send.sendErrorsend(e);
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    return Ticket;
}());
exports.Ticket = Ticket;
