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
exports.Nations = void 0;
var CommandTools_1 = require("./utils/CommandTools");
var earthmc_1 = require("earthmc");
var discord_js_1 = require("discord.js");
var Nations = /** @class */ (function () {
    function Nations(entity, send) {
        this.entity = entity;
        this.send = send;
    }
    Nations.prototype.nation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        if (!this.entity.user) {
                            throw new Error("User is null or undefined.");
                        }
                        return [4 /*yield*/, this.send.sendUserMessage('This is the main /nation command. Use subcommands like `/nation search`, `/nation reslist`, etc.')];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_1 = _a.sent();
                        return [4 /*yield*/, this.send.sendErrorsend(e_1)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Nations.prototype.search = function (nation, server) {
        if (server === void 0) { server = "aurora"; }
        return __awaiter(this, void 0, void 0, function () {
            var commandString, nations, locationUrl, chunks_worth, embed, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        commandString = "/nation search nation: " + nation + " server: " + server;
                        if (!this.entity.user) {
                            throw new Error("User is null or undefined.");
                        }
                        return [4 /*yield*/, earthmc_1.OfficialAPI.nation(nation)];
                    case 1:
                        nations = _a.sent();
                        locationUrl = "https://earthmc.net/map/" + server + "/?zoom=4&x=" + nations.spawn.x + "&z=" + nations.spawn.z;
                        chunks_worth = nations.Chunks * 16;
                        embed = new discord_js_1.EmbedBuilder()
                            .setAuthor(this.entity.user.displayName.toString)
                            .setDescription(commandString)
                            .setColor('DarkGreen')
                            .setTitle("info for " + nation + " nation");
                        embed.addFields({ name: 'Name', value: nation, inline: true }, { name: "King", value: nations.King, inline: true }, { name: "Balance", value: nations.balance, inline: true }, { name: "Chunks " + chunks_worth, value: nations.Chunks, inline: true }, { name: "Location", value: "[" + Math.round(nations.spawn.x) + ", " + Math.round(nations.spawn.z) + "](" + locationUrl + ")", inline: true }, { name: 'Towns', value: nations.Towns.toString(), inline: true }, { name: 'Residents', value: nations.residents.toString(), inline: true });
                        return [4 /*yield*/, this.send.sendUsersend(embed)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        e_2 = _a.sent();
                        return [4 /*yield*/, this.send.sendErrorsend(e_2)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Nations.prototype.reslist = function (nation, server) {
        if (server === void 0) { server = "aurora"; }
        return __awaiter(this, void 0, void 0, function () {
            var commandString, nations, residentsString, embed, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 7]);
                        commandString = "/nation reslist nation: " + nation + " server: " + server;
                        return [4 /*yield*/, earthmc_1.OfficialAPI.nation(nation)];
                    case 1:
                        nations = _a.sent();
                        residentsString = CommandTools_1.CommandTools.listToString(nations.residents);
                        if (!!this.entity.user) return [3 /*break*/, 2];
                        this.send.sendUserMessage('Not possible to identify user');
                        return [3 /*break*/, 4];
                    case 2:
                        embed = new discord_js_1.EmbedBuilder()
                            .setAuthor(this.entity.user.displayName.toString)
                            .setDescription(commandString)
                            .setColor('DarkGreen')
                            .setTitle("info for " + nation + " nation")
                            .addFields({ name: 'Residents', value: residentsString, inline: true });
                        return [4 /*yield*/, this.send.sendUsersend(embed)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_3 = _a.sent();
                        return [4 /*yield*/, this.send.sendErrorsend(e_3)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Nations.prototype.ranklist = function (nation, server) {
        if (server === void 0) { server = "aurora"; }
        return __awaiter(this, void 0, void 0, function () {
            var commandString, nations, _a, _b, _i, rank, rankString, fields, e_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 6, , 8]);
                        commandString = "/nation ranklist nation: " + nation + " server: " + server;
                        return [4 /*yield*/, earthmc_1.OfficialAPI.nation(nation)];
                    case 1:
                        nations = _c.sent();
                        _a = [];
                        for (_b in nations.ranks)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        rank = _a[_i];
                        if (!nations.ranks.hasOwnProperty(rank)) return [3 /*break*/, 4];
                        rankString = CommandTools_1.CommandTools.listToString(nations.ranks[rank]);
                        fields = [rank.charAt(0).toUpperCase() + rank.slice(1), "```" + rankString.slice(0, 1022) + "```", true];
                        return [4 /*yield*/, this.send.sendUsersend(fields)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_4 = _c.sent();
                        return [4 /*yield*/, this.send.sendErrorsend(e_4)];
                    case 7:
                        _c.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Nations.prototype.allylist = function (nation, server) {
        if (server === void 0) { server = "aurora"; }
        return __awaiter(this, void 0, void 0, function () {
            var commandString, nations, alliesString, embed, embed, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 8]);
                        commandString = "/nation allylist nation: " + nation + " server: " + server;
                        return [4 /*yield*/, earthmc_1.OfficialAPI.nation(nation)];
                    case 1:
                        nations = _a.sent();
                        if (!(nations.allies.length !== 0)) return [3 /*break*/, 3];
                        alliesString = CommandTools_1.CommandTools.listToString(nations.allies);
                        embed = new discord_js_1.EmbedBuilder();
                        if (this.entity.user) {
                            embed.setAuthor(this.entity.user.displayName.toString);
                        }
                        embed.setDescription(commandString);
                        embed.setColor('DarkGreen');
                        embed.setTitle("info for " + nation + " nation");
                        embed.addFields({ name: 'Allies', value: alliesString, inline: true });
                        return [4 /*yield*/, this.send.sendUsersend(embed)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        embed = new discord_js_1.EmbedBuilder();
                        if (this.entity.user) {
                            embed.setAuthor(this.entity.user.displayName.toString);
                        }
                        embed.setDescription(commandString);
                        embed.setColor('DarkGreen');
                        embed.setTitle("info for " + nation + " nation");
                        embed.addFields({ name: 'This nation has no allied nations :/', value: '', inline: true });
                        return [4 /*yield*/, this.send.sendUsersend(embed)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_5 = _a.sent();
                        return [4 /*yield*/, this.send.sendErrorsend(e_5)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Nations.prototype.enemylist = function (nation, server) {
        if (server === void 0) { server = "aurora"; }
        return __awaiter(this, void 0, void 0, function () {
            var commandString, nations, enemiesString, fields, fields, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 8]);
                        commandString = "/nation enemylist nation: " + nation + " server: " + server;
                        return [4 /*yield*/, earthmc_1.OfficialAPI.nation(nation)];
                    case 1:
                        nations = _a.sent();
                        if (!(nations.enemies.length !== 0)) return [3 /*break*/, 3];
                        enemiesString = CommandTools_1.CommandTools.listToString(nations.enemies);
                        fields = ["Enemies", "```" + enemiesString.slice(0, 1018) + "```", true];
                        return [4 /*yield*/, this.send.sendUsersend(fields)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        fields = ["Enemies", nations.enemies + " has no enemies :)", true];
                        return [4 /*yield*/, this.send.sendUsersend(fields)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_6 = _a.sent();
                        return [4 /*yield*/, this.send.sendErrorsend(e_6)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Nations.prototype.townlist = function (nation, server) {
        if (server === void 0) { server = "aurora"; }
        return __awaiter(this, void 0, void 0, function () {
            var commandString, nations, townsString, fields, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        commandString = "/nation townlist nation: " + nation + " server: " + server;
                        return [4 /*yield*/, earthmc_1.OfficialAPI.nation(nation)];
                    case 1:
                        nations = _a.sent();
                        townsString = CommandTools_1.CommandTools.listToString(nations.towns);
                        fields = ["Towns", "```" + townsString.slice(0, 1018) + "```", true];
                        return [4 /*yield*/, this.send.sendUsersend(fields)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        e_7 = _a.sent();
                        return [4 /*yield*/, this.send.sendErrorsend(e_7)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Nations.prototype.unallied = function (nation, server) {
        if (server === void 0) { server = "aurora"; }
        return __awaiter(this, void 0, void 0, function () {
            var commandString, nations, unalliedList, i, unalliedString, fields, fields, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 11]);
                        commandString = "/nation unallied nation: " + nation + " server: " + server;
                        return [4 /*yield*/, earthmc_1.OfficialAPI.nation(nation)];
                    case 1:
                        nations = _a.sent();
                        unalliedList = nations.unalliedList;
                        if (!(unalliedList.length !== 0)) return [3 /*break*/, 6];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < unalliedList.length)) return [3 /*break*/, 5];
                        unalliedString = unalliedList.slice(i, i + 15).join(' ');
                        fields = [i > 0 ? 'Unallied (Continued)' : 'Unallied', "```" + unalliedString + "```", true];
                        return [4 /*yield*/, this.send.sendUsersend(fields)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i += 15;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        fields = ["Unallied", nations.unallied + " has allied everyone :)", true];
                        return [4 /*yield*/, this.send.sendUsersend(fields)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        e_8 = _a.sent();
                        return [4 /*yield*/, this.send.sendErrorsend(e_8)];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    return Nations;
}());
exports.Nations = Nations;
