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
exports.TownCommand = void 0;
var CommandTools_1 = require("./utils/CommandTools");
var earthmc_1 = require("earthmc");
var TownCommand = /** @class */ (function () {
    function TownCommand(entity, Send) {
        this.entity = entity;
        this.Send = Send;
    }
    TownCommand.prototype.town = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        if (!this.entity.user) {
                            throw new Error("User is null or undefined.");
                        }
                        return [4 /*yield*/, this.Send.sendUserMessage('This is the main /town command. ')];
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
    TownCommand.prototype.search = function (town, server) {
        if (town === void 0) { town = "random"; }
        if (server === void 0) { server = "aurora"; }
        return __awaiter(this, void 0, void 0, function () {
            var commandString, townlookup, locationUrl, fields, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        commandString = "/town search town: " + town + " server: " + server;
                        if (!this.entity.user) {
                            throw new Error("User is null or undefined.");
                        }
                        townlookup = earthmc_1.OfficialApi.town(town);
                        locationUrl = "https://earthmc.net/map/" + server + "/?zoom=4&x=" + townlookup.spawn.x + "&z=" + townlookup.spawn.z;
                        fields = [
                            { name: 'Name', value: town, inline: true },
                            { name: 'Residents', value: townlookup.residents.toString(), inline: true },
                            { name: "chunks", value: townlookup.chunks.toString(), inline: true },
                            { name: 'worth', value: Number(townlookup.chunks * 16), inline: true },
                            { name: 'Nation', value: townlookup.nation, inline: true },
                            { name: 'Mayor', value: townlookup.Mayor, inline: true },
                            { name: 'Capital', value: townlookup.Capital, inline: true },
                            { name: "Location", value: "[" + Math.round(townlookup.spawn.x) + ", " + Math.round(townlookup.spawn.z) + "](" + locationUrl + ")", inline: true },
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
    TownCommand.prototype.ranklist = function (town, server) {
        if (server === void 0) { server = "aurora"; }
        return __awaiter(this, void 0, void 0, function () {
            var commandString, townsLookup, embedString, rank, rankString, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        commandString = "/nation ranklist town: " + town + " server: " + server;
                        townsLookup = earthmc_1.OfficialApi.town(town);
                        embedString = "**" + townsLookup.rank + "'s Ranked Residents**\n";
                        for (rank in townsLookup.ranks) {
                            if (townsLookup.ranks.hasOwnProperty(rank)) {
                                rankString = CommandTools_1.CommandTools.listToString(townsLookup.ranks[rank]);
                                embedString += rank.charAt(0).toUpperCase() + rank.slice(1) + ":\n```" + rankString.slice(0, 1022) + "```\n";
                            }
                        }
                        return [4 /*yield*/, this.Send.sendUserMessage(embedString)];
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
    return TownCommand;
}());
exports.TownCommand = TownCommand;
