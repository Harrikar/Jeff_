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
var discord_js_1 = require("discord.js");
var CommandTools_1 = require("./utils/CommandTools");
var earthmc_1 = require("earthmc");
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
            var commandString, allNationsLookup, nations, locationUrl, embed, chunks_worth, alliance, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        commandString = "/nation search nation: " + nation + " server: " + server;
                        if (!this.entity.user) {
                            throw new Error("User is null or undefined.");
                        }
                        if (nation.toLowerCase() === "random") {
                            allNationsLookup = earthmc_1.OfficialApi.nations.all();
                            nation = String(CommandTools_1.CommandTools.random_choice(allNationsLookup.allNations));
                        }
                        nations = earthmc_1.OfficialApi.nation(nation);
                        locationUrl = "https://earthmc.net/map/" + server + "/?zoom=4&x=" + nations.spawn.x + "&z=" + nations.spawn.z;
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle("`" + nations.strings.nation + "`")
                            .setDescription(nations.strings.board)
                            .setFooter(commandString)
                            .setAuthor(this.entity.user);
                        chunks_worth = nations.Chunks * 16;
                        alliance = earthmc_1.Aurora.alliance(nation);
                        embed.addFields({ name: 'Name', value: nations.name, inline: true }, { name: "King", value: nations.King, inline: true }, { name: "Capital", value: nations.Capital, inline: true }, { name: "Rank", value: nations.ranklist, inline: true }, { name: "Location", value: "[" + Math.round(nations.spawn.x) + ", " + Math.round(nations.spawn.z) + "](" + locationUrl + ")", inline: true }, { name: "Alliance", value: alliance, inline: true }, { name: "Residents", value: nations.stats.numResidents.toString(), inline: true }, { name: "Towns", value: nations.stats.numTowns.toString(), inline: true }, { name: "Chunks (" + chunks_worth + " worth of gold)", value: nations.Chunks, inline: true });
                        return [4 /*yield*/, this.Send.sendUserEmbed(embed)];
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
            var commandString, nations, embed, residentsString, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        commandString = "/nation reslist nation: " + nation + " server: " + server;
                        nations = earthmc_1.OfficialApi.nation(nation);
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle("`" + nations.strings.nation + "'s Residents`")
                            .setFooter(commandString)
                            .setAuthor(this.entity.user);
                        residentsString = CommandTools_1.CommandTools.listToString(nations.residents);
                        embed.addField("Residents", "```" + residentsString.slice(0, 1018) + "```", true);
                        return [4 /*yield*/, this.Send.sendUserEmbed(embed)];
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
            var commandString, nations, embed, rank, rankString, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        commandString = "/nation ranklist nation: " + nation + " server: " + server;
                        nations = earthmc_1.OfficialApi.nation(nation);
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle("`" + nations.rank + "'s Ranked Residents`")
                            .setFooter(commandString)
                            .setAuthor(this.entity.user);
                        for (rank in nations.ranks) {
                            if (nations.ranks.hasOwnProperty(rank)) {
                                rankString = CommandTools_1.CommandTools.listToString(nations.ranks[rank]);
                                embed.addField(rank.charAt(0).toUpperCase() + rank.slice(1), "```" + rankString.slice(0, 1022) + "```", true);
                            }
                        }
                        return [4 /*yield*/, this.Send.sendUserEmbed(embed)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_4 = _a.sent();
                        return [4 /*yield*/, this.Send.sendErrorEmbed(e_4)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Nations.prototype.allylist = function (nation, server) {
        if (server === void 0) { server = "aurora"; }
        return __awaiter(this, void 0, void 0, function () {
            var commandString, nations, embed, alliesString, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        commandString = "/nation allylist nation: " + nation + " server: " + server;
                        nations = earthmc_1.OfficialApi.nation(nation);
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle("`" + nations.allies + "'s Allies`")
                            .setFooter(commandString)
                            .setAuthor(this.entity.user);
                        if (nations.allies.length !== 0) {
                            alliesString = CommandTools_1.CommandTools.listToString(nations.allies);
                            embed.addField("Allies", "```" + alliesString.slice(0, 1018) + "```", true);
                        }
                        else {
                            embed.addField("Allies", nations.allies + " has no allies :)", true);
                        }
                        return [4 /*yield*/, this.Send.sendUserEmbed(embed)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_5 = _a.sent();
                        return [4 /*yield*/, this.Send.sendErrorEmbed(e_5)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Nations.prototype.enemylist = function (nation, server) {
        if (server === void 0) { server = "aurora"; }
        return __awaiter(this, void 0, void 0, function () {
            var commandString, nations, embed, enemiesString, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        commandString = "/nation enemylist nation: " + nation + " server: " + server;
                        nations = earthmc_1.OfficialApi.nation(nation);
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle("`" + nations + " Enemies`") // Please replace with appropriate property
                            .setFooter(commandString)
                            .setAuthor(this.entity.user);
                        if (nations.enemies.length !== 0) {
                            enemiesString = CommandTools_1.CommandTools.listToString(nations.enemies);
                            embed.addField("Enemies", "```" + enemiesString.slice(0, 1018) + "```", true);
                        }
                        else {
                            embed.addField("Enemies", nations.enemies + " has no enemies :)", true);
                        }
                        return [4 /*yield*/, this.Send.sendUserEmbed(embed)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_6 = _a.sent();
                        return [4 /*yield*/, this.Send.sendErrorEmbed(e_6)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Nations.prototype.townlist = function (nation, server) {
        if (server === void 0) { server = "aurora"; }
        return __awaiter(this, void 0, void 0, function () {
            var commandString, nations, embed, townsString, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        commandString = "/nation townlist nation: " + nation + " server: " + server;
                        nations = earthmc_1.OfficialApi.nation(nation);
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle("`" + nations.strings.nation + "'s Towns`")
                            .setFooter(commandString)
                            .setAuthor(this.entity.user);
                        townsString = CommandTools_1.CommandTools.listToString(nations.towns);
                        embed.addField("Towns", "```" + townsString.slice(0, 1018) + "```", true);
                        return [4 /*yield*/, this.Send.sendUserEmbed(embed)];
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
            var commandString, nations, allNationsLookup, embed, allyList_1, allNations, unalliedList, i, unalliedString, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        commandString = "/nation unallied nation: " + nation + " server: " + server;
                        nations = earthmc_1.OfficialApi.nation(nation);
                        allNationsLookup = earthmc_1.OfficialApi.nation.all();
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle("`" + nations.strings.nation + "'s Unallied Nations`")
                            .setFooter(commandString)
                            .setAuthor(this.entity.user);
                        allyList_1 = nations.allies;
                        allNations = allNationsLookup.allNations.slice();
                        allNations.splice(allNations.indexOf(nations.strings.nation), 1);
                        unalliedList = allNations.filter(function (nation) { return !allyList_1.includes(nation); });
                        if (unalliedList.length !== 0) {
                            for (i = 0; i < unalliedList.length; i += 15) {
                                unalliedString = unalliedList.slice(i, i + 15).join(' ');
                                embed.addField(i > 0 ? 'Unallied (Continued)' : 'Unallied', "```" + unalliedString + "```", true);
                            }
                        }
                        else {
                            embed.addField("Unallied", nations.unallied + " has allied everyone :)", true);
                        }
                        return [4 /*yield*/, this.Send.sendUserEmbed(embed)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        e_8 = _a.sent();
                        return [4 /*yield*/, this.Send.sendErrorEmbed(e_8)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Nations;
}());
exports.Nations = Nations;
