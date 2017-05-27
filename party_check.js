on("chat:message",function(msg){
    'use strict';

    var SCRIPT_NAME = "party-check";

    if (msg.type !== "api") {
        return;
    }

    var args = msg.content.split(/(\s+)/).filter(function(e) {
        return e.trim().length > 0;
    });

    if (args[0] !== "!party-check") {
        return;
    }

    if (args.length !== 2) {
        sendChat(
            SCRIPT_NAME,
            "/w " + msg.who + " usage: !" + SCRIPT_NAME + " SKILL_NAME");
        return;
    }

    var skillName = args[1];

    var playerCharacters = filterObjs(function(obj) {
        if (obj.get("type") !== "character") {
            return false;
        }

        return obj.get("controlledby") !== "";
    });

    playerCharacters.forEach(function(character) {
        var name = character.get("name");
        var modName = skillName + "_bonus";
        var roll = "1d20+[[@{" + name + "|" + modName + "}]]"
        var rollMsg = "/gmroll " + roll + " " + skillName + " check";
        sendChat(name, rollMsg);
    });
});
