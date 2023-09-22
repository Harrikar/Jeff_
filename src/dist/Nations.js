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
var earthmc_2 = require("earthmc");
var Nations = /** @class */ (function () {
    function Nations(entity, Send) {
        this.entity = entity;
        this.Send = Send;
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
                        return [4 /*yield*/, this.Send.sendUserMessage('This is the main /nation command. Use subcommands like `/nation search`, `/nation reslist`, etc.')];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_1 = _a.sent();
                        return [4 /*yield*/, this.Send.sendErrorEmbed(e_1)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Nations.prototype.search = function (nation, server) {
        if (nation === void 0) { nation = "random"; }
        if (server === void 0) { server = "aurora"; }
        return __awaiter(this, void 0, void 0, function () {
            var commandString, allNationsLookup, nations, locationUrl, chunks_worth, alliance, fields, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        commandString = "/nation search nation: " + nation + " server: " + server;
                        if (!this.entity.user) {
                            throw new Error("User is null or undefined.");
                        }
                        if (nation.toLowerCase() === "random") {
                            allNationsLookup = earthmc_2.OfficialApi.nations.all();
                            nation = String(CommandTools_1.CommandTools.random_choice(allNationsLookup.allNations));
                        }
                        nations = earthmc_2.OfficialApi.nation(nation);
                        locationUrl = "https://earthmc.net/map/" + server + "/?zoom=4&x=" + nations.spawn.x + "&z=" + nations.spawn.z;
                        chunks_worth = nations.Chunks * 16;
                        alliance = earthmc_1.Aurora.alliance(nation);
                        fields = [
                            { name: '', value: this.entity.user.avatarURL, inline: true },
                            { name: 'Name', value: nations.name, inline: true },
                            { name: "King", value: nations.King, inline: true },
                            { name: "Capital", value: nations.Capital, inline: true },
                            { name: "Rank", value: nations.ranklist, inline: true },
                            { name: "Location", value: "[" + Math.round(nations.spawn.x) + ", " + Math.round(nations.spawn.z) + "](" + locationUrl + ")", inline: true },
                            { name: "Alliance", value: alliance, inline: true },
                            { name: "Residents", value: nations.stats.numResidents.toString(), inline: true },
                            { name: "Towns", value: nations.stats.numTowns.toString(), inline: true },
                            { name: "Chunks (" + chunks_worth + " worth of gold)", value: nations.Chunks, inline: true },
                            { name: "Quoried by " + this.entity.user.username, inline: true },
                            { name: 'bot desinged and coded by charis_k', inline: true }
                        ];
                        return [4 /*yield*/, this.Send.sendUserEmbed(fields)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_2 = _a.sent();
                        return [4 /*yield*/, this.Send.sendErrorEmbed(e_2)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Nations.prototype.reslist = function (nation, server) {
        if (server === void 0) { server = "aurora"; }
        return __awaiter(this, void 0, void 0, function () {
            var commandString, nations, residentsString, fields, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        commandString = "/nation reslist nation: " + nation + " server: " + server;
                        nations = earthmc_2.OfficialApi.nation(nation);
                        residentsString = CommandTools_1.CommandTools.listToString(nations.residents);
                        fields = ["Residents", "```" + residentsString.slice(0, 1018) + "```", true];
                        return [4 /*yield*/, this.Send.sendUserEmbed(fields)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_3 = _a.sent();
                        return [4 /*yield*/, this.Send.sendErrorEmbed(e_3)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
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
                        _c.trys.push([0, 5, , 7]);
                        commandString = "/nation ranklist nation: " + nation + " server: " + server;
                        nations = earthmc_2.OfficialApi.nation(nation);
                        _a = [];
                        for (_b in nations.ranks)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        rank = _a[_i];
                        if (!nations.ranks.hasOwnProperty(rank)) return [3 /*break*/, 3];
                        rankString = CommandTools_1.CommandTools.listToString(nations.ranks[rank]);
                        fields = [rank.charAt(0).toUpperCase() + rank.slice(1), "```" + rankString.slice(0, 1022) + "```", true];
                        return [4 /*yield*/, this.Send.sendUserEmbed(fields)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_4 = _c.sent();
                        return [4 /*yield*/, this.Send.sendErrorEmbed(e_4)];
                    case 6:
                        _c.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Nations.prototype.allylist = function (nation, server) {
        if (server === void 0) { server = "aurora"; }
        return __awaiter(this, void 0, void 0, function () {
            var commandString, nations, alliesString, fields, fields, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 7]);
                        commandString = "/nation allylist nation: " + nation + " server: " + server;
                        nations = earthmc_2.OfficialApi.nation(nation);
                        if (!(nations.allies.length !== 0)) return [3 /*break*/, 2];
                        alliesString = CommandTools_1.CommandTools.listToString(nations.allies);
                        fields = ["Allies", "```" + alliesString.slice(0, 1018) + "```", true];
                        return [4 /*yield*/, this.Send.sendUserEmbed(fields)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        fields = ["Allies", nations.allies + " has no allies :)", true];
                        return [4 /*yield*/, this.Send.sendUserEmbed(fields)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_5 = _a.sent();
                        return [4 /*yield*/, this.Send.sendErrorEmbed(e_5)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
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
                        _a.trys.push([0, 5, , 7]);
                        commandString = "/nation enemylist nation: " + nation + " server: " + server;
                        nations = earthmc_2.OfficialApi.nation(nation);
                        if (!(nations.enemies.length !== 0)) return [3 /*break*/, 2];
                        enemiesString = CommandTools_1.CommandTools.listToString(nations.enemies);
                        fields = ["Enemies", "```" + enemiesString.slice(0, 1018) + "```", true];
                        return [4 /*yield*/, this.Send.sendUserEmbed(fields)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        fields = ["Enemies", nations.enemies + " has no enemies :)", true];
                        return [4 /*yield*/, this.Send.sendUserEmbed(fields)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_6 = _a.sent();
                        return [4 /*yield*/, this.Send.sendErrorEmbed(e_6)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
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
                        _a.trys.push([0, 2, , 4]);
                        commandString = "/nation townlist nation: " + nation + " server: " + server;
                        nations = earthmc_2.OfficialApi.nation(nation);
                        townsString = CommandTools_1.CommandTools.listToString(nations.towns);
                        fields = ["Towns", "```" + townsString.slice(0, 1018) + "```", true];
                        return [4 /*yield*/, this.Send.sendUserEmbed(fields)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_7 = _a.sent();
                        return [4 /*yield*/, this.Send.sendErrorEmbed(e_7)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Nations.prototype.unallied = function (nation, server) {
        if (server === void 0) { server = "aurora"; }
        return __awaiter(this, void 0, void 0, function () {
            var commandString, nations, allNationsLookup, allyList_1, allNations, unalliedList, i, unalliedString, fields, fields, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 10]);
                        commandString = "/nation unallied nation: " + nation + " server: " + server;
                        nations = earthmc_2.OfficialApi.nation(nation);
                        allNationsLookup = earthmc_2.OfficialApi.nation.all();
                        allyList_1 = nations.allies;
                        allNations = allNationsLookup.allNations.slice();
                        allNations.splice(allNations.indexOf(nations.strings.nation), 1);
                        unalliedList = allNations.filter(function (nation) { return !allyList_1.includes(nation); });
                        if (!(unalliedList.length !== 0)) return [3 /*break*/, 5];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < unalliedList.length)) return [3 /*break*/, 4];
                        unalliedString = unalliedList.slice(i, i + 15).join(' ');
                        fields = [i > 0 ? 'Unallied (Continued)' : 'Unallied', "```" + unalliedString + "```", true];
                        return [4 /*yield*/, this.Send.sendUserEmbed(fields)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i += 15;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        fields = ["Unallied", nations.unallied + " has allied everyone :)", true];
                        return [4 /*yield*/, this.Send.sendUserEmbed(fields)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_8 = _a.sent();
                        return [4 /*yield*/, this.Send.sendErrorEmbed(e_8)];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    return Nations;
}());
exports.Nations = Nations;
