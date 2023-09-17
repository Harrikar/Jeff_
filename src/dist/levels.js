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
exports.Level = void 0;
var discord_js_1 = require("discord.js");
var admin = require("firebase-admin");
var serviceAccount = require('jeff-db-firebase-adminsdk-qekso-80d55b4f4c.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://console.firebase.google.com/u/1/project/jeff-db/database/jeff-db-default-rtdb/data/~2F'
});
var db = admin.firestore();
var Level = /** @class */ (function () {
    function Level(entity, Send) {
        this.entity = entity;
        this.Send = Send;
    }
    Level.prototype.level = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usersCollection, usernamesCollection;
            var _this = this;
            return __generator(this, function (_a) {
                usersCollection = db.collection('users');
                usernamesCollection = db.collection('usernames');
                this.entity.on('message', function (message) { return __awaiter(_this, void 0, void 0, function () {
                    function level() {
                        Level_1 = +20;
                    }
                    var userId, userRef, userSnapshot, user, xp_upd, Level_1, newlvl, user_data, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 9, , 10]);
                                if (!!message.author.bot) return [3 /*break*/, 8];
                                userId = message.author.id;
                                userRef = db.collection('users').doc(userId);
                                return [4 /*yield*/, userRef.get()];
                            case 1:
                                userSnapshot = _a.sent();
                                if (!userSnapshot.exists) return [3 /*break*/, 5];
                                user = userSnapshot.data();
                                xp_upd = {
                                    xp: user.xp + 1
                                };
                                Level_1 = 100;
                                return [4 /*yield*/, usersCollection.doc(userId).update(xp_upd)];
                            case 2:
                                _a.sent();
                                if (!(user.xp > Level_1)) return [3 /*break*/, 4];
                                newlvl = {
                                    level: level,
                                    Level: user.level + 1
                                };
                                // Update the level in the 'users' collection
                                return [4 /*yield*/, usersCollection.doc(userId).update(newlvl)];
                            case 3:
                                // Update the level in the 'users' collection
                                _a.sent();
                                _a.label = 4;
                            case 4: return [3 /*break*/, 8];
                            case 5:
                                user_data = {
                                    id: userId,
                                    Level: 0,
                                    xp: 0,
                                    name: message.author.username
                                };
                                return [4 /*yield*/, usersCollection.doc(userId).set(user_data)];
                            case 6:
                                _a.sent();
                                // Associate the username with the user ID in the 'usernames' collection
                                return [4 /*yield*/, usernamesCollection.doc(message.author.username).set({
                                        userId: userId
                                    })];
                            case 7:
                                // Associate the username with the user ID in the 'usernames' collection
                                _a.sent();
                                _a.label = 8;
                            case 8: return [3 /*break*/, 10];
                            case 9:
                                error_1 = _a.sent();
                                this.Send.sendErrorEmbed(error_1);
                                return [3 /*break*/, 10];
                            case 10: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    Level.prototype.showlevel = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var usernameDoc, userId, userDoc, commandString, userData, embed, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        return [4 /*yield*/, db.collection('usernames').doc(username).get()];
                    case 1:
                        usernameDoc = _a.sent();
                        if (!usernameDoc.exists) return [3 /*break*/, 7];
                        userId = usernameDoc.data().userId;
                        return [4 /*yield*/, db.collection('users').doc(userId).get()];
                    case 2:
                        userDoc = _a.sent();
                        commandString = "Level of " + username;
                        if (!userDoc.exists) return [3 /*break*/, 4];
                        userData = userDoc.data();
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle("`" + commandString + "`")
                            .setDescription('User level')
                            .setFooter(commandString)
                            .setAuthor(this.entity.user);
                        embed.addFields({ name: 'Name', value: username, inline: true }, { name: 'Level and XP', value: userData.level + " (XP: " + userData.xp + ")", inline: true });
                        return [4 /*yield*/, this.Send.sendUserEmbed(embed)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.Send.sendUserMessage('User data not found.')];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.Send.sendUserMessage('User isn\'t registered or you have an invalid or old username.')];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_2 = _a.sent();
                        this.Send.sendErrorEmbed(error_2);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    Level.prototype.onUserUpdate = function (oldUser, newUser) {
        return __awaiter(this, void 0, void 0, function () {
            var oldUsername, newUsername, usernameDoc, userId, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        oldUsername = oldUser.username;
                        newUsername = newUser.username;
                        if (!(oldUsername !== newUsername)) return [3 /*break*/, 3];
                        return [4 /*yield*/, db.collection('usernames').doc(oldUsername).get()];
                    case 1:
                        usernameDoc = _a.sent();
                        if (!usernameDoc.exists) return [3 /*break*/, 3];
                        userId = usernameDoc.data().userId;
                        return [4 /*yield*/, db.collection('usernames').doc(oldUsername).update(newUsername)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        throw new error_3(error_3);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Level;
}());
exports.Level = Level;
