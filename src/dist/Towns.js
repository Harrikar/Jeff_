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
var discord_js_1 = require("discord.js");
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
            var commandString, allTownsLookup, towns, Mayor, embed, chunks_worth, town_spawn_x, town_spawn_z, town_spawn, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        commandString = "/town search town: " + town + " server: " + server;
                        if (!this.entity.user) {
                            throw new Error("User is null or undefined.");
                        }
                        if (town.toLowerCase() === "random") {
                            allTownsLookup = earthmc_1.OfficialApi.towns.all;
                            town = String(CommandTools_1.CommandTools.random_choice(allTownsLookup.allTowns));
                        }
                        towns = earthmc_1.OfficialApi.town(town);
                        Mayor = earthmc_1.OfficialApi.townsLookup.Mayor;
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle("`" + towns.strings.nation + "`")
                            .setDescription(towns.strings.board)
                            .setFooter(commandString)
                            .setAuthor(this.entity.user);
                        chunks_worth = towns.Chunks.worth();
                        town_spawn_x = towns.spawn.x;
                        town_spawn_z = towns.spawn.z;
                        town_spawn = town_spawn_x + ',' + town_spawn_z;
                        embed.addFields({ name: 'Name', value: towns.name, inline: true }, { name: "Mayor", value: Mayor, inline: true }, { name: 'Nation', value: towns.nation, inline: true }, { name: 'Balance', value: towns.balance, inline: true }, { name: " Chunks (worth " + chunks_worth + ")", value: towns.Chunks, inline: true }, { name: ' Resident', value: towns.numResidents, inline: true }, { name: "Spawn", value: towns.town_spawn, inline: true });
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
    TownCommand.prototype.ranklist = function (town, server) {
        if (server === void 0) { server = "aurora"; }
        return __awaiter(this, void 0, void 0, function () {
            var commandString, townsLookup, embed, rank, rankString, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        commandString = "/nation ranklist town: " + town + " server: " + server;
                        townsLookup = earthmc_1.OfficialApi.town(town);
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle("`" + townsLookup.rank + "'s Ranked Residents`")
                            .setFooter(commandString)
                            .setAuthor(this.entity.user);
                        for (rank in townsLookup.ranks) {
                            if (townsLookup.ranks.hasOwnProperty(rank)) {
                                rankString = CommandTools_1.CommandTools.listToString(townsLookup.ranks[rank]);
                                embed.addField(rank.charAt(0).toUpperCase() + rank.slice(1), "```" + rankString.slice(0, 1022) + "```", true);
                            }
                        }
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
    return TownCommand;
}());
exports.TownCommand = TownCommand;
