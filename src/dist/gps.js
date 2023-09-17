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
var discord_js_1 = require("discord.js");
var Embeds_1 = require("./utils/Embeds");
var earthmc_1 = require("earthmc");
var Gps = /** @class */ (function () {
    function Gps(entity) {
        this.entity = entity;
    }
    Gps.prototype.sendUserEmbed = function (embed) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 6]);
                        if (!this.entity.user) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.entity.user.send({ embed: embed })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2: throw new Error("User is null or undefined.");
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        e_1 = _a.sent();
                        return [4 /*yield*/, this.sendErrorEmbed(e_1)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Gps.prototype.sendErrorEmbed = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            var embed, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        embed = Embeds_1.Embeds.errorEmbed('An error occurred while processing your request.', error);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!this.entity.user) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.entity.user.send({ embed: embed })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3: throw new Error("User is null or undefined.");
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        console.error("An error occurred while sending an error message:", e_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Gps.prototype.sendUserMessage = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 6]);
                        if (!this.entity.user) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.entity.user.send(content)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2: throw new Error("User is null or undefined.");
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        e_3 = _a.sent();
                        return [4 /*yield*/, this.sendErrorEmbed(e_3)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Gps.prototype.find = function (x, z, route) {
        return __awaiter(this, void 0, void 0, function () {
            var server, commandString, location, route_1, route_2, embed, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        if (!this.entity.user) {
                            throw new Error("User is null or undefined.");
                        }
                        server = 'aurora';
                        commandString = "/find : " + x + " and " + z + " server: " + server;
                        return [4 /*yield*/, this.sendUserMessage('This is the main /player command. Use subcommands like `/player search`.')];
                    case 1:
                        _a.sent();
                        if (route === 'fastest') {
                            location = x + '' + z;
                            route_1 = earthmc_1.Aurora.gps.fastest(x, z);
                        }
                        else if (route === 'safest') {
                            route_2 = earthmc_1.Aurora.gps.safest(x, z);
                        }
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle("`" + route + "Route you chose")
                            .setFooter(commandString)
                            .setAuthor(this.entity.user);
                        embed.addFields({ name: 'Closest spawn', value: route, inline: true });
                        return [4 /*yield*/, this.sendUserEmbed(embed)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        e_4 = _a.sent();
                        return [4 /*yield*/, this.sendErrorEmbed(e_4)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Gps;
}());
exports["default"] = Gps;
