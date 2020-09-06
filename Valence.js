/*
// Valence.js 
// Author : Hana#0353
// Features : Indicators, watermark, keybinds, speclist, chat and console logs, in air hitchance, mindamage override, some attempt at decent AA, useless Auto invert
/*

/* agh kill me ;w; */

var first_call = false;
var first_call2 = false;
var chargestate = 0 /* stating chargestate up here cause it was giving random errors saying it wasnt defined despite it being define at line 106 */
var user = Cheat.GetUsername()

/* making a ui so it can be enabled and disabled at will cause always enabled indicators sucky */
UI.AddLabel("                   Valence") /* like 93829 spaces so it renders in middle */
UI.AddCheckbox("Enable");
UI.AddDropdown("Tabs",["Rage","Anti-Aim","Misc"])
UI.AddDropdown("Misc Subtab",["General", "Indicators", "positional vars"] )
UI.AddCheckbox("Indicators");

UI.AddMultiDropdown("indicators",["Shift", "Fake", "Slow walk", "Hitchance","Min Damage", "K/D"]); 
UI.AddDropdown("KD mode", ["KDA", "KDR"] )

UI.AddColorPicker("Title Color");
UI.AddColorPicker("Outline Color");
UI.AddCheckbox("Outline Rainbow")

UI.AddCheckbox("Watermark"); 
UI.AddCheckbox("Keybinds list");
UI.AddCheckbox("Spectator list")

/* addding all the sliders cause i have no idea how to do proper dragging */
UI.AddSliderInt("Keybinds x", 10, 1920)
UI.AddSliderInt("Keybinds y", 10, 1080)
UI.AddSliderInt("Indicator x", 10, 1920)
UI.AddSliderInt("Indicator y", 10, 1080)
UI.AddSliderInt("Spectator x", 10 ,1920)
UI.AddSliderInt("Spectator y", 10 ,1080)

UI.AddCheckbox("AA override")
UI.AddHotkey("AA inverter")
UI.AddCheckbox("Auto invert")
UI.AddDropdown("Invert mode", ["on hurt"])
UI.AddCheckbox("logs")
UI.AddMultiDropdown("things to log", ["Damage done","Damaged by","Ragebot fired", "Player bought", "Misses"])
UI.AddMultiDropdown("Log mode", ["console","chat"])

UI.AddHotkey("Mindamage override")
UI.AddDropdown("Weapon type", ["General","Pistol", "Heavy pistol", "Scout", "AWP", "Auto"])
UI.AddMultiDropdown("Active Air weapons",["General","Pistol", "Heavy pistol", "Scout", "AWP", "Auto"] )

UI.AddSliderInt("Heavy Pistol mindamage override",0 , 130)
UI.AddSliderInt("Pistol mindamage override",0 ,130 )
UI.AddSliderInt("Scout mindamage override",0 ,130 )
UI.AddSliderInt("Auto mindamage override",0 ,130 )
UI.AddSliderInt("Awp mindamage override",0 ,130 )
UI.AddSliderInt("General mindamage override",0 ,130)

UI.AddSliderInt("Heavy Pistol Air hitchance",0 ,70)
UI.AddSliderInt("Pistol Air hitchance",0 ,70 )
UI.AddSliderInt("Scout Air hitchance",0 ,70 )
UI.AddSliderInt("Auto Air hitchance",0 ,70 )
UI.AddSliderInt("Awp Air hitchance",0 ,70 )
UI.AddSliderInt("General Air hitchance",0 ,70)

UI.AddCheckbox("Dt customization")
UI.AddSliderInt( "Shift", 0, 14 );
UI.AddSliderInt( "Tolerance", 0, 8 );

UI.AddLabel("Welcome, " + user + " hope you enjoy!")

/* adding default colors also don't know if these work ^^ */
UI.SetColor('Misc', 'JAVASCRIPT', 'Script items', "Outline Color", [185, 135, 255,205])
UI.SetColor('Misc', 'JAVASCRIPT', 'Script items', "Title Color", [55, 175, 194,205])

/* default values so you can see them at first don't know if these work and honestly i don't have enough of a care to check*/
UI.SetValue('Misc','JAVASCRIPT', 'Script items', "Indicator x", 20 )
UI.SetValue('Misc','JAVASCRIPT', 'Script items', "Indicator y", 560 )
UI.SetValue('Misc','JAVASCRIPT', 'Script items', "Keybinds x",415 )
UI.SetValue('Misc','JAVASCRIPT', 'Script items', "Keybinds y", 200 )
UI.SetValue('Misc','JAVASCRIPT', 'Script items', "Spectator x", 280 )
UI.SetValue('Misc','JAVASCRIPT', 'Script items', "Spectator y", 200 )

damage_values = function(_override_damage, _restore_damage) /* peer practically did the damage override for me thanks <3 */
{
    this.override_damage = _override_damage;
    this.restore_damage = _restore_damage;
}
hitchance_values = function(_override_hitchance, _restore_hitchance)
{
    this.override_hitchance = _override_hitchance;
    this.restore_hitchance = _restore_hitchance;
}

/* fucking gay damage values */
var general = new damage_values(UI.GetValue('Misc','JAVASCRIPT','Script items', "General Air hitchance"), UI.GetValue("Rage", "GENERAL", "Targeting", "Minimum damage"));
var pistol = new damage_values(UI.GetValue('Misc','JAVASCRIPT','Script items', "Pistol mindamage override"), UI.GetValue("Rage", "PISTOL", "Targeting", "Minimum damage"));
var heavy = new damage_values(UI.GetValue('Misc','JAVASCRIPT','Script items', "Heavy Pistol mindamage override"), UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage"));
var scout = new damage_values(UI.GetValue('Misc','JAVASCRIPT','Script items', "Scout Air hitchance"), UI.GetValue("Rage", "SCOUT", "Targeting", "Minimum damage"));
var awp = new damage_values(UI.GetValue('Misc','JAVASCRIPT','Script items', "Awp mindamage override"), UI.GetValue("Rage", "AWP", "Targeting", "Minimum damage"));
var auto = new damage_values(UI.GetValue('Misc','JAVASCRIPT','Script items', "Auto mindamage override"), UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage"));
/* fucking gay Hitchance values */
var generalA = new hitchance_values(UI.GetValue('Misc','JAVASCRIPT','Script items', "General Air hitchance"), UI.GetValue("Rage", "GENERAL","Accuracy", "Hitchance"));
var pistolA = new hitchance_values(UI.GetValue('Misc','JAVASCRIPT','Script items', "Pistol Air hitchance"), UI.GetValue("Rage", "PISTOL", "Accuracy", "Hitchance"));
var heavyA = new hitchance_values(UI.GetValue('Misc','JAVASCRIPT','Script items', "Heavy Pistol Air hitchance"), UI.GetValue("Rage", "HEAVY PISTOL", "Accuracy", "Hitchance"));
var scoutA = new hitchance_values(UI.GetValue('Misc','JAVASCRIPT','Script items', "Scout Air hitchance"), UI.GetValue("Rage", "SCOUT", "Accuracy", "Hitchance"));
var awpA = new hitchance_values(UI.GetValue('Misc','JAVASCRIPT','Script items', "Awp Air hitchance"), UI.GetValue("Rage", "AWP", "Accuracy", "Hitchance"));
var autoA = new hitchance_values(UI.GetValue('Misc','JAVASCRIPT','Script items', "Auto Air hitchance"), UI.GetValue("Rage", "AUTOSNIPER", "Accuracy", "Hitchance"));


function getDropdownValue(value, index) /* making a function to read drop downs so i can have a cleaner ui than like 47843 checkboxes */
{
    var mask = 1 << index;
    return value & mask ? true : false;
}

function isHeavyP(name)  /* checking for all the pistols that aren't classified as non Heavy */
{
    if (name == "r8 revolver" || name == "desert eagle")
    {
        return true
    }
}

function isAuto(name) /* combining the autos into one basic identifier to make it easier to write later on */
{
    if(name == "g3sg1" || name == "scar 20")
    {
        return true
    }
}

function isPistol(name) /* combining the non heavy pistols into one basic  identifier to make it easier to write later on  rather than writing the if statement below in an indicator */
{
    if(name == "glock 18" ||  name == "dual berettas" || name == "p250" || name == "tec 9" || name == "five seven" || name == "usp s" || name == "p2000")
    {
        return true
    }
}

var m_choke = 0;

var prefix = "[Valence]" /* prefix feel free to change just dont change then claim as your own */
var ragebot_shot = false;
var shot_tick = 0;
var player_hit = false;

function on_purchase()
{
     /* im rediclaring this in every fucking one bcs it doesn't update if not  meaning you have to reload if you change */
    var log_options = (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "things to log")).toString(2).split("").reverse().map(Number);
    var log_modes =  (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Log mode")).toString(2).split("").reverse().map(Number);
    buyerid = Event.GetInt("userid")
    team = Event.GetInt("team")
    weapon = Event.GetString("weapon")
    buyer = Entity.GetEntityFromUserID(buyerid)
    string_buy = " " + Entity.GetName(buyer) + " bought a " + weapon
    if (log_options[3])
    {
        if (Entity.IsEnemy(buyer))
        {
            if (log_modes[0])
            {
                Cheat.PrintColor(outlineCol, prefix + " ")
                Cheat.Print(string_buy + "\n")
            }
            if (log_modes[1])
            {
                
                Cheat.PrintChat("\x01 \x03"  + prefix  +"\x03 \x01" + string_buy + "\n")
            }   
        }
    }
} 

function on_hit()
{
     /* im rediclaring this in every fucking one bcs it doesn't update if not  meaning you have to reload if you change */
    var log_options = (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "things to log")).toString(2).split("").reverse().map(Number);
    var log_modes =  (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Log mode")).toString(2).split("").reverse().map(Number);
    const hitgroup_to_name = [
        "generic",
        "head",
        "chest",
        "stomach",
        "left arm",
        "right arm",
        "left leg",
        "right leg",
        "body"
    ];
    var attackerid = Event.GetInt("attacker")
    var victimid = Event.GetInt("userid")
    var L_Player = Entity.GetLocalPlayer() 
    var attacker = Entity.GetEntityFromUserID(attackerid)
    var victim = Entity.GetEntityFromUserID(victimid)
    var dmgH = Event.GetInt("dmg_health")
    var hitgroup_index = Event.GetInt("hitgroup");
    string_hit = " Hit " + Entity.GetName(victim) + " For " + dmgH + " in the " + (hitgroup_to_name[hitgroup_index])
    string_hurt = " Hurt by " + Entity.GetName(attacker) + " For " + dmgH + " in the " + (hitgroup_to_name[hitgroup_index])
    if (log_options[0])
    {
        if (attacker == L_Player && victim != L_Player) /* checking that we're the attacker so it doesn't spam the chat and crash */
        {
            player_hit = true;
            if (log_modes[0])
            {
                Cheat.PrintColor(outlineCol, prefix + " ")
                Cheat.Print(string_hit + "\n")
            }
            if (log_modes[1])
            {
                /* if for any reason u wanna change the colors */
                /* \x01 - white
                    \x02 - red
                    \x03 - purple (light)
                    \x04 - Green 
                    \x05 - pale yellow/green 
                    \x06 - more green?
                    \x07 - lighter red
                    \x08 - gray
                    \x09 - yellow
                    \x10 - orangish yellow
                    I don't know if you can mix but i cant be bothered testing 
                */
                Cheat.PrintChat("\x01 \x03"  + prefix  +"\x04 \x01" + string_hit + "\n")
            }
        }
    }
    if (log_options[1])
    {
        /* don't wanna see when we are hitting ourselves */
        if (attacker != L_Player && victim == L_Player) {
            if (log_modes[0])
            {
                Cheat.PrintColor(outlineCol, prefix + " ")
                Cheat.Print(string_hurt + "\n")
            }
            if (log_modes[1])
            {
                Cheat.PrintChat("\x01 \x03"  + prefix  +"\x03 \x01" + string_hurt + "\n")
            }
           
            
        }
    }

    if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Auto invert") && UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Invert mode") == 0) {
        if  (attacker != L_Player && victim == L_Player) /* holy shit this is so fucking useless*/
        {
            UI.ToggleHotkey('Misc', 'JAVASCRIPT', 'Script items', "AA inverter");
           
        }
    }    

}
function on_fire()
{ 

    ragebot_shot = true;
    shot_tick = Globals.Tickcount();

    /* im rediclaring this in every fucking one bcs it doesn't update if not  meaning you have to reload if you change */
    var log_options = (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "things to log")).toString(2).split("").reverse().map(Number);
    var log_modes =  (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Log mode")).toString(2).split("").reverse().map(Number);
    /* Simplified hitboxes cause the end user doesn't need the exact hitbox location and it looks better with general hitgroups*/
    const simplified_hitboxes = [
        "head",
        "head",
        "stomach",
        "body",
        "chest",
        "chest",
        "upper chest",
        "left leg",
        "right leg",
        "left leg",
        "right leg",
        "left leg",
        "right leg",
        "left arm",
        "right arm",
        "left arm",
        "left arm",
        "right arm",
        "right arm",
        "generic"
      ];

    var target_index = Event.GetInt("target_index");
    var hitbox_index = Event.GetInt("hitbox");

    var string = " fired shot " + "at " + Entity.GetName(target_index) + "'s " + (simplified_hitboxes[hitbox_index])+ ", hitchance: " + Event.GetInt("hitchance") + ", safepoint: " + (Event.GetInt("safepoint") == 1 ? "enabled" : "disabled");
      if (log_options[2])
        {
            if (log_modes[0])
            {
                Cheat.PrintColor(outlineCol, prefix + " ")
                Cheat.Print(string + "\n")
            }
            if (log_modes[1])
            {
                Cheat.PrintChat("\x01 \x03"  + prefix  +"\x03 \x01" + string + "\n")
            }
        }
    /*printing it both in console and in chat for ease of access */
}

function on_cm()
{
    var log_options = (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "things to log")).toString(2).split("").reverse().map(Number);
    var log_modes =  (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Log mode")).toString(2).split("").reverse().map(Number);
    chargestate = Exploit.GetCharge()  /* setting the chargestate value for the indicator further down */

    if (log_options[4]) {
        if(ragebot_shot)
        {
            /* if not hit and shot  in same tick you missed */
            if(Globals.Tickcount() == shot_tick + 1 && player_hit != true)
            {
                if (log_modes[0])
                {
                    Cheat.PrintColor(outlineCol, prefix + " ")
                    Cheat.Print("Shot missed" + "\n")
                }
                if (log_modes[1])
                {
                    Cheat.PrintChat("\x01 \x03"  + prefix  +"\x03 \x01" + " Shot missed" + "\n")
                }

                shot_tick = 0;
                player_hit = false;
                ragebot_shot = false
            }
            /* checking if shot and hit in same tick */
            else if (Globals.Tickcount() == shot_tick + 1 && player_hit == true)
            {
                player_hit = false;
                shot_tick = 0;
                ragebot_shot = false;
                /* so that we can reloop this code allowing it to check more than one shot */
            }
        }
    }

    if (Globals.Tickcount() % 16 == 0)  { /*this shows the highest choke per 16 ticks so every quarter of a second on 64 tick servers or every 8th on 128 tick servers i believe*/ 
        m_choke = 0;
        return;
    } 
    /* Thanks for the help with this April */
    m_choke = Math.max(m_choke, Globals.ChokedCommands())   

    if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Dt customization"))
    {
        Exploit.OverrideShift(UI.GetValue('Misc', 'JAVASCRIPT',"Script items", "Shift"))
        Exploit.OverrideTolerance(UI.GetValue('Misc', 'JAVASCRIPT',"Script items", "Tolerance"))
    }

    else if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Dt customization")) /* if you dont have double tap customization on it'll revert to default values */
    {
        Exploit.OverrideShift(12)
        Exploit.OverrideTolerance(2)
    }

    if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "AA override")){
        /* non inverted aa */
        AntiAim.SetOverride(1); /* enabling override */
        AntiAim.SetRealOffset(-60) /* this is real  body */
        AntiAim.SetFakeOffset(0) /* this is real head */
        AntiAim.SetLBYOffset(120)  /* this is fake offset more or less*/
        /* onetaps labeling doesn't make too much sense tbh */

        if (UI.IsHotkeyActive('Misc', 'JAVASCRIPT', 'Script items', "AA inverter"))
        {
        /* inverted AA */
        AntiAim.SetOverride(1)
        AntiAim.SetRealOffset(60)
        AntiAim.SetFakeOffset(0)
        AntiAim.SetLBYOffset(-120)
        
        }
    }
    else if (!UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "AA override"))
    {
        AntiAim.SetOverride(0) /* if you turn it off it will actually disable */
    }
   
    var me = Entity.GetLocalPlayer()  /* checking for our player cause idgaf if enemy is in air */
    var inair = Entity.GetProp(me,"CBasePlayer" ,"m_fFlags")    /* you don't understand how many "m_fFlags" there is */
    
    if (UI.IsMenuOpen())
    {
        if (!first_call2)
        {
            /* if the menu is open it resets first_call2 so we restore our normal hitchance*/
            UI.SetValue("Rage", "GENERAL", "Accuracy", "Hitchance", generalA.restore_hitchance);
            UI.SetValue("Rage", "PISTOL", "Accuracy", "Hitchance", pistolA.restore_hitchance);
            UI.SetValue("Rage", "HEAVY PISTOL", "Accuracy", "Hitchance", heavyA.restore_hitchance);
            UI.SetValue("Rage", "SCOUT", "Accuracy", "Hitchance", scoutA.restore_hitchance);
            UI.SetValue("Rage", "AWP", "Accuracy", "Hitchance", awpA.restore_hitchance);
            UI.SetValue("Rage", "AUTOSNIPER", "Accuracy", "Hitchance", autoA.restore_hitchance);

            first_call2 = true;
        } 
        
        /*incase of any changes made we recache our restore and override hitchances */
        generalA.restore_hitchance = UI.GetValue("Rage", "GENERAL","Accuracy", "Hitchance");
        pistolA.restore_hitchance = UI.GetValue("Rage", "PISTOL", "Accuracy", "Hitchance");
        heavyA.restore_hitchance = UI.GetValue("Rage", "HEAVY PISTOL", "Accuracy", "Hitchance");
        scoutA.restore_hitchance = UI.GetValue("Rage", "SCOUT", "Accuracy", "Hitchance");
        awpA.restore_hitchance = UI.GetValue("Rage", "AWP", "Accuracy", "Hitchance");
        autoA.restore_hitchance = UI.GetValue("Rage", "AUTOSNIPER","Accuracy", "Hitchance");
          
        generalA.override_hitchance = UI.GetValue('Misc','JAVASCRIPT','Script items', "General Air hitchance");
        pistolA.override_hitchance = UI.GetValue('Misc','JAVASCRIPT','Script items', "Pistol Air hitchance");
        heavyA.override_hitchance = UI.GetValue('Misc','JAVASCRIPT','Script items', "Heavy Pistol Air hitchance");
        scoutA.override_hitchance = UI.GetValue('Misc','JAVASCRIPT','Script items', "Scout Air hitchance");
        awpA.override_hitchance= UI.GetValue('Misc','JAVASCRIPT','Script items', "Awp Air hitchance");
        autoA.override_hitchance = UI.GetValue('Misc','JAVASCRIPT','Script items', "Auto Air hitchance");

     } 
     else 
     {
        var Airoptions = (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Active Air weapons")).toString(2).split("").reverse().map(Number);
        var air =  (!(inair & 1)) /* check if player is in air */
        /* Since not everyone would want every weapon shooting in air  we make a check for the ones you want to override */
        if (Airoptions[0])
        {
        UI.SetValue("Rage", "GENERAL","Accuracy", "Hitchance", air ? generalA.override_hitchance : generalA.restore_hitchance);
        }
        if (Airoptions[1])
        {
        UI.SetValue("Rage", "PISTOL", "Accuracy", "Hitchance", air  ? pistolA.override_hitchance  : pistolA.restore_hitchance );
        }
        if (Airoptions[2])
        {
        UI.SetValue("Rage", "HEAVY PISTOL", "Accuracy", "Hitchance", air ? heavyA.override_hitchance : heavyA.restore_hitchance );
        }
        if (Airoptions[3])
        {
        UI.SetValue("Rage", "SCOUT", "Accuracy", "Hitchance", air ? scoutA.override_hitchance : scoutA.restore_hitchance);
        }
        if (Airoptions[4])
        {
        UI.SetValue("Rage", "AWP", "Accuracy", "Hitchance", air  ? awpA.override_hitchance  : awpA.restore_hitchance );
        }
        if (Airoptions[5])
        {
        UI.SetValue("Rage", "AUTOSNIPER","Accuracy", "Hitchance", air  ? autoA.override_hitchance  : autoA.restore_hitchance );
        }
        first_call2 = false;
        
     }   
}

function get_spec() /*this function gets and pushes spectators for the spec list to print*/
{
    var spectators = [];
    var players = Entity.GetPlayers();
    for ( i = 0; i < players.length; i++)
    {
        var curplayers = players[i]

        if (Entity.GetProp(curplayers, "CBasePlayer", "m_hObserverTarget") != "m_hObserverTarget")
        {
            var observetarget = Entity.GetProp(curplayers, "CBasePlayer", "m_hObserverTarget")

            if (observetarget == Entity.GetLocalPlayer())
            {
                var names = Entity.GetName(curplayers)
                if (!Entity.IsDormant(curplayers)) /* a dormant check for spectators so spec list clears when player is no longer speccing after round so it clears properly on round change */
                {
                    spectators.push(names)
                }
                
            }
        }
    }
    return spectators;
}

function on_draw()
{
    /* i wanted my ui as clean as possible even if it cost my sanity which it did */
    /* variables used to clean up the menu */
    var options = (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "indicators")).toString(2).split("").reverse().map(Number);
    var master_switch = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Enable");
    var indicators_switch = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Indicators");
    var dt_switch =   UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Dt customization");
    var invert_switch = UI.GetValue('Misc','JAVASCRIPT', 'Script items', "Auto invert")
    var indic_switch
    var aa_switch
    var rage_switch
    var misc_switch
    var misc1_switch
    var misc2_switch
    var misc3_switch
    var logs_switch = UI.GetValue('Misc','JAVASCRIPT', 'Script items', "logs")
    var kdr_switch = options[4]
     /* so many switches o.o*/
    var index = UI.GetValue('Misc','JAVASCRIPT','Script items', "Weapon type");
    var tab_index =  UI.GetValue('Misc','JAVASCRIPT','Script items', "Tabs");
    var subtab_index = UI.GetValue('Misc','JAVASCRIPT','Script items', "Misc Subtab")
    /*indexs for weapon based stuff and tab stuff */
  
    /* im sure theres a better way to do all this but for now this will do */
    if (tab_index == 0)
    {
        rage_switch = true
        misc_switch = false
        misc1_switch = false
        misc2_switch = false
        misc3_switch = false
        aa_switch = false
        invert_switch = false
        indicators_switch = false
        keybind_switch = false
        kdr_switch = false
        logs_switch = false
        spec_switch = false
        indic_switch = false
    }
    else if (tab_index == 1)
    {
        aa_switch = true
        rage_switch = false
        dt_switch = false
        misc_switch = false
        misc1_switch = false
        misc2_switch = false
        misc3_switch = false
        indicators_switch = false
        keybind_switch = false
        kdr_switch = false
        spec_switch = false
        logs_switch = false
        indic_switch = false
    }
    else if (tab_index == 2)
    {
        rage_switch = false
        aa_switch = false
        invert_switch = false
        dt_switch = false
        misc_switch = true
    
        /* all this does is  make subtabs and is probably a waste of time but oh well */
        if (subtab_index == 0)
        {
            misc1_switch = true
            misc2_switch = false
            misc3_switch = false
            indic_switch = false
            kdr_switch = false
            indicators_switch = false
        }
        else if (subtab_index == 1)
        {
            misc1_switch = false
            misc2_switch = true
            misc3_switch = false
            logs_switch = false
            indic_switch = true
        }
        else if (subtab_index == 2)
        {
            misc1_switch = false
            misc2_switch = false
            misc3_switch = true
            logs_switch = false
            indic_switch = false
            kdr_switch = false
            indicators_switch = false
        }
    }
    
    if (master_switch == false)
    {
        rage_switch = false
        misc_switch = false
        misc1_switch = false
        misc2_switch = false
        misc3_switch = false
        logs_switch = false
        aa_switch = false
        invert_switch = false
        indicators_switch = false
        keybind_switch = false
        dt_switch = false
        kdr_switch = false
        spec_switch = false   
        indic_switch = false
    }
    
        UI.SetEnabled('Misc','JAVASCRIPT','Script items', "Tabs",master_switch )
        UI.SetEnabled('Misc','JAVASCRIPT', 'Script items', "Misc Subtab", misc_switch )

        /* Anti-Aim stuff */
        UI.SetEnabled('Misc','JAVASCRIPT', 'Script items', "AA override",aa_switch)
        UI.SetEnabled('Misc','JAVASCRIPT', 'Script items',"AA inverter",aa_switch )
        UI.SetEnabled('Misc','JAVASCRIPT', 'Script items', "Auto invert", aa_switch)
        UI.SetEnabled('Misc','JAVASCRIPT', 'Script items', "Invert mode", invert_switch )

        /* Ragebot Stuff */
        UI.SetEnabled('Misc','JAVASCRIPT','Script items', "Weapon type", rage_switch)
        UI.SetEnabled('Misc','JAVASCRIPT','Script items', "Active Air weapons", rage_switch)
        UI.SetEnabled('Misc','JAVASCRIPT','Script items', "Mindamage override",rage_switch)
       
        /* general */
        UI.SetEnabled('Misc','JAVASCRIPT','Script items', "General mindamage override", index == 0 ? rage_switch: false);
        UI.SetEnabled('Misc','JAVASCRIPT','Script items', "General Air hitchance", index == 0 ? rage_switch: false);
        
        /* normal pistols*/
        UI.SetEnabled('Misc','JAVASCRIPT','Script items', "Pistol mindamage override",  index == 1 ? rage_switch : false);
        UI.SetEnabled('Misc','JAVASCRIPT','Script items', "Pistol Air hitchance",  index == 1 ? rage_switch : false);
        
        /* heavy pistols */
        UI.SetEnabled('Misc','JAVASCRIPT','Script items', "Heavy Pistol mindamage override",  index == 2 ? rage_switch : false);
        UI.SetEnabled('Misc','JAVASCRIPT','Script items', "Heavy Pistol Air hitchance",  index == 2 ? rage_switch : false);
        
        /* Scout settings */
        UI.SetEnabled('Misc','JAVASCRIPT','Script items', "Scout mindamage override",  index == 3 ? rage_switch : false);
        UI.SetEnabled('Misc','JAVASCRIPT','Script items', "Scout Air hitchance",  index == 3 ? rage_switch : false);
        
        /* awp settings */
        UI.SetEnabled('Misc','JAVASCRIPT','Script items', "Awp mindamage override",  index == 4 ? rage_switch : false);
        UI.SetEnabled('Misc','JAVASCRIPT','Script items', "Awp Air hitchance",  index == 4 ? rage_switch : false);

        /* Auto settings */
        UI.SetEnabled('Misc','JAVASCRIPT','Script items', "Auto mindamage override",  index == 5 ? rage_switch : false);  
        UI.SetEnabled('Misc','JAVASCRIPT','Script items', "Auto Air hitchance",  index == 5 ? rage_switch : false);  
        
        /* double tap stuff */
        UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', "Dt customization",rage_switch )
        UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', "Shift",dt_switch )
        UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', "Tolerance",dt_switch)

        /* all the misc stuff */ 
        /* unlike the other two tabs misc has subtabs */
        
        /* 1st sub tab everything not indicators or  positions */
        UI.SetEnabled('Misc','JAVASCRIPT', 'Script items', "logs", misc1_switch)
        UI.SetEnabled('Misc','JAVASCRIPT', 'Script items', "things to log", logs_switch )
        UI.SetEnabled('Misc','JAVASCRIPT', 'Script items', "Log mode", logs_switch )

        /* 2nd subtab stuff all the stuff do with indicators and stuff */
        UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', "Indicators", indic_switch)
        UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', "indicators", indicators_switch)
        
        /* this enables if you have KDR/KDA mode enabled for indicators */
        UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', "KD mode", kdr_switch)

        /* these are the other stuff */
        UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', "Spectator list", misc2_switch)
        UI.SetEnabled('Misc','JAVASCRIPT', 'Script items', "Watermark", misc2_switch)
        UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', "Keybinds list", misc2_switch)

        /* this is colors but still in 2nd subtabs*/
        UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', "Title Color", misc2_switch)
        UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', "Outline Color", misc2_switch)
        UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', "Outline Rainbow", misc2_switch)

        /* 3rd subtabs stuff all positions */
        UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', "Spectator x",misc3_switch)
        UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', "Spectator y",misc3_switch)

        UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', "Indicator y",misc3_switch )
        UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', "Indicator x",misc3_switch)
       
        UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', "Keybinds x",misc3_switch)
        UI.SetEnabled('Misc', 'JAVASCRIPT', 'Script items', "Keybinds y",misc3_switch)

     /* menu cleanup stuff */
     
    /* checks for  values */

    /* i have literally accounted for every keybind in the AA tab Rage tab and my script besides jitter offset i really hate this */
     var fb_Active = UI.IsHotkeyActive("Rage", "General", "Force body aim")
     var sp_Active = UI.IsHotkeyActive("Rage", "General", "Force safe point")
     var ro_Active = UI.IsHotkeyActive("Rage", "General", "Resolver override")
     var hs_Active = UI.IsHotkeyActive("Rage", "Exploits","Hide shots");
     var dt_Active = UI.IsHotkeyActive("Rage", "Exploits", "Doubletap");
     var sw_Active = UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk");
     var fd_Active = UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")
     var mousedir_Active = UI.IsHotkeyActive("Anti-Aim", "Rage Anti-Aim", "Mouse dir");
     var aainvert_Active = UI.IsHotkeyActive('Misc', 'JAVASCRIPT', 'Script items', "AA inverter");
     var md_active = UI.IsHotkeyActive("Misc","JAVASCRIPT", "Script items","Mindamage override")
     var sw_type = UI.GetValue("Anti-Aim", "Extra", "Slow walk mode");
     var sw_text = " ";
    /* checks for values */

    /* Fonts and stuff*/
     var font = Render.AddFont("Verdana", 10, 800);
     var fontIn = Render.AddFont("Verdana", 10 ,400 )
     var fontWater = Render.AddFont("Verdana",10 ,100 )
     /* Fonts and rendering variables */

     /* indicator variables */
     var heavymd = "" + UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage") 
     var scoutmd = "" +UI.GetValue("Rage", "SCOUT", "Targeting", "Minimum damage")
     var awpmd = "" +UI.GetValue("Rage", "AWP", "Targeting", "Minimum damage")
     var automd = "" +UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage")
     var pistolmd = "" +UI.GetValue("Rage", "PISTOL", "Targeting", "Minimum damage")
     var generalmd = "" +UI.GetValue("Rage", "GENERAL", "Targeting", "Minimum damage")
     
     var heavyhc = "" + UI.GetValue("Rage", "HEAVY PISTOL", "Accuracy", "Hitchance")
     var scouthc = "" +UI.GetValue("Rage", "SCOUT", "Accuracy", "Hitchance")
     var awphc = "" +UI.GetValue("Rage", "AWP", "Accuracy", "Hitchance")
     var autohc = "" +UI.GetValue("Rage", "AUTOSNIPER", "Accuracy", "Hitchance")
     var pistolhc = "" +UI.GetValue("Rage", "PISTOL", "Accuracy", "Hitchance")
     var generalhc = "" +UI.GetValue("Rage", "GENERAL", "Accuracy", "Hitchance")
    
     var me = Entity.GetLocalPlayer() /* getting values for the KDA / KDR indicator */
     var kills = Entity.GetProp(me,"CPlayerResource" ,"m_iKills")
     var Assits = Entity.GetProp(me,"CPlayerResource" ,"m_iAssists")
     var Deaths = Entity.GetProp(me,"CPlayerResource" ,"m_iDeaths")
     
     /* using the prop cause Local.Getlatency is really dumb */
     var ping = Entity.GetProp(me,"CPlayerResource" ,"m_iPing")
     var ip = World.GetServerString()
     var tick = Globals.Tickrate()

     /* pasted fake stuff from  https://www.onetap.com/threads/fake-indicator.27122/ because im quite simply too retarded */
     var realyaw = Local.GetRealYaw();
     var fakeyaw = Local.GetFakeYaw();
     var delta = Math.min(Math.abs(realyaw - fakeyaw) / 2, 60).toFixed(1); /* this isn't an accurate method but its the best you have cause onetap doesn't let you use m_flPoseParameters */ 
     /* indicator variables */

     /* Screen based variables */
     var screen_size = Render.GetScreenSize();
     var x_left = screen_size[0] - 310;
     var y_water = screen_size[1] - screen_size[1] + 10
     /* these y_offsets allow us to have the flags and stuff in non forced posistions */
     var y_offset = 0;
     var y_offset2 = 0;
     /* i don' t know how to do dragging don't bully me ;w; */
     var indicator_x = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Indicator x")
     var indicator_y = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Indicator y")
     var keybind_x = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Keybinds x")
     var keybind_y = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Keybinds y")
     var spectator_x = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Spectator x")
     var spectator_y = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Spectator y")
     /* Screen based variables */

     /* most common colours i would use for this */
     green = [45,255,45,225]
     red = [235, 45, 45,225 ]
     blue = [0,0,255,225]
     white = [235, 235, 235,225]  
   
     var rainbow = [ /* thanks April <3 */
        Math.floor(Math.sin(Global.Realtime() * 2) * 127 + 128),
        Math.floor(Math.sin(Global.Realtime() * 2 + 2) * 127 + 128),
        Math.floor(Math.sin(Global.Realtime() * 2 + 4) * 127 + 128),
        225
    ];   /* not using full alpha to save eyes */
 
    /* other variables and stuff that i never knew how to section */
     txtcolor = UI.GetColor('Misc', 'JAVASCRIPT', 'Script items', "Title Color");
     outlineCol = UI.GetColor('Misc', 'JAVASCRIPT', 'Script items', "Outline Color");
     var weapon = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
     var KD_mode = UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "KD mode")

     /* other variables and stuff that i never knew how to section */

    /* figuring out what slow walk mode is being used as onetap stores group boxes as 0,1,2,3 etc */
    switch(sw_type) {
        case 0: sw_text = "Accurate"; break;
        case 1: sw_text = "Slide Fast"; break;
        case 2: sw_text = "Slide Slow"; break;
      }

      /* accounting for dynamic mindamage in possibly the worst way :x */
      if (automd ==  "0"){
        automd = "Dyn"
      }  
      if (heavymd == "0"){
          heavymd = "Dyn"
      }
      if (scoutmd == "0"){
          scoutmd = "Dyn"
      }
      if (awpmd == "0"){
          awpmd = "Dyn"
      }
      if (pistolmd == "0")
      {
          pistolmd = "Dyn"
      }
      if (generalmd == "0")
      {
          generalmd = "Dyn"
      }
      
      if (UI.IsMenuOpen())
      {
          if (UI.IsHotkeyActive('Misc',  'JAVASCRIPT', 'Script items',"Mindamage override" ))
              UI.ToggleHotkey('Misc',  'JAVASCRIPT', 'Script items',"Mindamage override")
  
            /*
             we want to set our restore damage back to the original value
             this will only get called once each time the menu gets opened
            */
          if (!first_call)
          {
              UI.SetValue("Rage", "GENERAL", "Targeting", "Minimum damage", general.restore_damage);
              UI.SetValue("Rage", "PISTOL", "Targeting", "Minimum damage", pistol.restore_damage);
              UI.SetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage", heavy.restore_damage);
              UI.SetValue("Rage", "SCOUT", "Targeting", "Minimum damage", scout.restore_damage);
              UI.SetValue("Rage", "AWP", "Targeting", "Minimum damage", awp.restore_damage);
              UI.SetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage", auto.restore_damage);
  
              first_call = true;
          }
  
          /*while you're in the menu you could make changes to either */
          /* the script sliders or the onetap damage sliders so we want to store both incase that happens */
          
  
          //store the restore damage values in a weapon object
          general.restore_damage = UI.GetValue("Rage", "GENERAL", "Targeting", "Minimum damage");
          pistol.restore_damage = UI.GetValue("Rage", "PISTOL", "Targeting", "Minimum damage");
          heavy.restore_damage = UI.GetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage");
          scout.restore_damage = UI.GetValue("Rage", "SCOUT", "Targeting", "Minimum damage");
          awp.restore_damage = UI.GetValue("Rage", "AWP", "Targeting", "Minimum damage");
          auto.restore_damage = UI.GetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage");
  
          //store the override damage values in the same objects
          general.override_damage = UI.GetValue('Misc','JAVASCRIPT','Script items', "General mindamage override");
          pistol.override_damage = UI.GetValue('Misc','JAVASCRIPT','Script items', "Pistol mindamage override");
          heavy.override_damage = UI.GetValue('Misc','JAVASCRIPT','Script items', "Heavy Pistol mindamage override");
          scout.override_damage = UI.GetValue('Misc','JAVASCRIPT','Script items', "Scout mindamage override");
          awp.override_damage = UI.GetValue('Misc','JAVASCRIPT','Script items', "Awp mindamage override");
          auto.override_damage = UI.GetValue('Misc','JAVASCRIPT','Script items', "Auto mindamage override");
  
          /*so now  all weapon objects hold both the restore damage and the override damage */

          /*  this code will keep looping while the menu is open */
          /*so whenever you change something it will update live without fucking up and just reseting your mindamage to the old restore value*/
      }
      else
      {
          //whenever the menu is not open:
          //store if our hotkey is true or false in a variable
          var hotkey_state = UI.IsHotkeyActive( 'Misc',  'JAVASCRIPT', 'Script items',"Mindamage override" )
  
          /* set our actual minimum damage slider to either our restore damage or our override damage */
          
          UI.SetValue("Rage", "GENERAL", "Targeting", "Minimum damage", hotkey_state ? general.override_damage : general.restore_damage);
          UI.SetValue("Rage", "PISTOL", "Targeting", "Minimum damage", hotkey_state ? pistol.override_damage : pistol.restore_damage);
          UI.SetValue("Rage", "HEAVY PISTOL", "Targeting", "Minimum damage", hotkey_state ? heavy.override_damage : heavy.restore_damage);
          UI.SetValue("Rage", "SCOUT", "Targeting", "Minimum damage", hotkey_state ? scout.override_damage : scout.restore_damage);
          UI.SetValue("Rage", "AWP", "Targeting", "Minimum damage", hotkey_state ? awp.override_damage : awp.restore_damage);
          UI.SetValue("Rage", "AUTOSNIPER", "Targeting", "Minimum damage", hotkey_state ? auto.override_damage : auto.restore_damage);
  
          /* this code will keep looping */
          /*we want our script to set our damage sliders back to the restore damage when our menu is open so we can edit it*/
          /*setting first_call to false will trigger the if on line 31 again when the menu gets opened*/
          
          first_call = false;
      }

      if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Outline Rainbow"))
      {
          UI.SetColor('Misc', 'JAVASCRIPT', 'Script items', "Outline Color", rainbow)
      }

     if (Entity.IsAlive(Entity.GetLocalPlayer()) || UI.IsMenuOpen()) { /* getting if local player is alive so it doesn't draw while in main menu */
      if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Enable"))
        if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Indicators")){ /* final check for if its actually enabled */

            /* making the box to make things look cool and stuff */
             Render.FilledRect(indicator_x - 15 ,indicator_y - 19.5 ,135 ,135 ,outlineCol)
             Render.FilledRect(indicator_x - 12 ,indicator_y - 16.5,130 ,130 ,[26,26,26,255] )
             Render.StringCustom(indicator_x + 52.5, indicator_y - 15 ,2 , "Indicators" , txtcolor , font)
             Render.Line(indicator_x - 12,indicator_y + 2,indicator_x + 118, indicator_y + 2 ,outlineCol )
            if (options[0]) {
                if (chargestate == 1 && dt_Active){ /* i probably could've made the double tap indicator a hell of a lot better than this but this was the easy method */
                    Render.StringCustom(indicator_x - 8,indicator_y + 5 + y_offset,0, "Charge", green ,fontIn )   
                    
                }
                else if (chargestate !== 1 && dt_Active) {
                    Render.StringCustom(indicator_x - 8,indicator_y + 5 + y_offset, 0, "Charge", red ,fontIn )
                }
                else if (hs_Active) {
                    Render.StringCustom(indicator_x - 8,indicator_y + 5 + y_offset,0, "Hideshots", green ,fontIn )
                    
                }else
                Render.StringCustom(indicator_x - 8,indicator_y + 5 + y_offset,0, "Fakelag:" + m_choke, white ,fontIn )
               
                y_offset = y_offset + 17;
               
            }
            if (options[1]) { /* pasted fake stuff from  https://www.onetap.com/threads/fake-indicator.27122/ because im quite simply too retarded */
                /* this only works with the inverter in my script that works with my aa its not hard to make it work for the cheats one*/
                if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "AA override") && !UI.IsHotkeyActive('Misc', 'JAVASCRIPT', 'Script items', "AA inverter")){
                Render.StringCustom(indicator_x - 8,indicator_y + 5 + y_offset,0,"Fake:" + delta + " R", white ,fontIn )
                    y_offset = y_offset + 17;
                }
                else if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "AA override") && UI.IsHotkeyActive('Misc', 'JAVASCRIPT', 'Script items', "AA inverter")){
                    Render.StringCustom(indicator_x - 8,indicator_y + 5 + y_offset,0,"Fake:" + delta + " L", white ,fontIn )
                    y_offset = y_offset + 17;
                }
                else {
                    Render.StringCustom(indicator_x - 8,indicator_y + 5 + y_offset,0,"Fake:" + delta , white ,fontIn )
                    y_offset = y_offset + 17;
                }
                
            }
            if (options[2]) {
                /* incase you ever wanted to see what slowwalk mode you are using */
                Render.StringCustom(indicator_x - 9,indicator_y + 5 + y_offset,0,"SW: " + sw_text, white ,fontIn )
                y_offset = y_offset + 17;
           }
           if (options[3]){
            if (isHeavyP(weapon)) {
                
                Render.StringCustom(indicator_x - 9,indicator_y + 5 + y_offset,0,"Hitchance: " + heavyhc, white ,fontIn )
                y_offset = y_offset + 17;
            }
            else  if (isAuto(weapon)){
                Render.StringCustom(indicator_x - 9,indicator_y + 5 + y_offset,0,"Hitchance: " + autohc, white ,fontIn )
                y_offset = y_offset + 17;
            }
            else if (isPistol(weapon)) {
                Render.StringCustom(indicator_x - 9,indicator_y + 5 + y_offset,0,"Hitchance: " + pistolhc, white ,fontIn )
                y_offset = y_offset + 17;
            }
            else if (weapon == "ssg 08") {
                Render.StringCustom(indicator_x - 9,indicator_y + 5 + y_offset,0,"Hitchance: " + scouthc, white ,fontIn )
                y_offset = y_offset + 17;
            }
            else if (weapon == "awp") {
                Render.StringCustom(indicator_x - 9,indicator_y + 5 + y_offset,0,"Hitchance: " + awphc, white ,fontIn )
                y_offset = y_offset + 17;
            }
            else {
                Render.StringCustom(indicator_x - 9,indicator_y + 5 + y_offset,0,"Hitchance: " + generalhc, white ,fontIn)
                y_offset = y_offset + 17;
            }
        } 
        if (options[4]){ /* the md value will auto update with the override and adding some indication of it was too big so we just leave as is :X */
                if (isHeavyP(weapon)) {
                    Render.StringCustom(indicator_x - 9,indicator_y + 5 + y_offset,0,"Min Damage: " + heavymd , white ,fontIn )
                    y_offset = y_offset + 17;
                }
                else  if (isAuto(weapon)){
                    Render.StringCustom(indicator_x - 9,indicator_y + 5 + y_offset,0,"Min Damage: " + automd, white ,fontIn )
                    y_offset = y_offset + 17;
                }
                else if (isPistol(weapon)) {
                    Render.StringCustom(indicator_x - 9,indicator_y + 5 + y_offset,0,"Min Damage: " + pistolmd, white ,fontIn )
                    y_offset = y_offset + 17;
                }
                else if (weapon == "ssg 08") {
                    Render.StringCustom(indicator_x - 9,indicator_y + 5 + y_offset,0,"Min Damage: " + scoutmd, white ,fontIn )
                    y_offset = y_offset + 17;
                }
                else if (weapon == "awp") {
                    Render.StringCustom(indicator_x - 9,indicator_y + 5 + y_offset,0,"Min Damage: " + awpmd, white ,fontIn )
                    y_offset = y_offset + 17;
                }
                else {
                    Render.StringCustom(indicator_x - 9,indicator_y + 5 + y_offset,0,"Min Damage: " + generalmd, white ,fontIn)
                    y_offset = y_offset + 17;
                }
            }  
        if (options[5]) {
            if (!Entity.IsValid(Entity.GetLocalPlayer()))
            {
                kills = 0, Deaths = 0, Assits = 0 /* if not in game props return as "prop name" so to fix that we just check for a valid entity */
            }
            if (KD_mode == 0) {
            Render.StringCustom(indicator_x - 9,indicator_y + 5 + y_offset,0,"KDA: " + kills + "-" + Deaths + "-" + Assits, white ,fontIn)
            y_offset = y_offset + 17;
            }
            else 
            {
                var KDR = (kills / Deaths) /* kd ratio */
                if (Deaths == 0) 
                {
                    KDR = kills /* in this situation where death is equal to  0 its impossible to divide by 0 so we set it to the amount of kills */
                }
               
                Render.StringCustom(indicator_x - 9,indicator_y + 5 + y_offset,0,"KDR:" + kills + " / " + Deaths + " = " + (KDR).toFixed(2), white ,fontIn)
                y_offset = y_offset + 17;
            }
        
        }         
    }  
}
        if (Entity.IsAlive(Entity.GetLocalPlayer()) || UI.IsMenuOpen()) { /* i am genuinely losing my sanity about here send help */
            if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Enable"))  {
                if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Keybinds list")){ 
                    
                    Render.FilledRect(keybind_x - 12 ,keybind_y - 16.5,130 ,20 ,[26,26,26,255] )
                    Render.StringCustom(keybind_x + 52.5, keybind_y - 15 ,2 , "Keybinds" , txtcolor , font)
                    Render.FilledRect(keybind_x - 12,keybind_y + 2 ,130 ,3 ,outlineCol )
                
                    if (dt_Active) {
                        Render.StringCustom(keybind_x - 8,keybind_y + 5 + y_offset2,0, "Doubletap",white,fontIn)
                        y_offset2 = y_offset2 + 17
                    }   
                    if (sw_Active)
                    {
                        Render.StringCustom(keybind_x - 8,keybind_y + 5 + y_offset2,0, "Slow walk",white ,fontIn )
                        y_offset2 = y_offset2 + 17
                    } 
                    if (aainvert_Active)
                    {
                        Render.StringCustom(keybind_x - 8,keybind_y + 5 + y_offset2,0, "AA inverter",white ,fontIn )
                        y_offset2 = y_offset2 + 17
                    }
                    if (fd_Active)
                    {
                        Render.StringCustom(keybind_x - 8,keybind_y + 5 + y_offset2,0, "Fake duck",white ,fontIn )
                        y_offset2 = y_offset2 + 17
                    }
                    if (md_active)
                    {
                        Render.StringCustom(keybind_x - 8,keybind_y + 5 + y_offset2,0, "Damage override",white ,fontIn )
                        y_offset2 = y_offset2 + 17
                    }
                    if (fb_Active)
                    {
                        Render.StringCustom(keybind_x - 8,keybind_y + 5 + y_offset2,0, "Force baim",white ,fontIn )
                        y_offset2 = y_offset2 + 17
                    }
                    if (hs_Active)
                    {
                        Render.StringCustom(keybind_x - 8,keybind_y + 5 + y_offset2,0, "Hide shots",white ,fontIn )
                        y_offset2 = y_offset2 + 17
                    }
                    if (sp_Active)
                    {
                        Render.StringCustom(keybind_x - 8,keybind_y + 5 + y_offset2,0, "Force safepoint",white ,fontIn )
                        y_offset2 = y_offset2 + 17
                    }
                    if (ro_Active)
                    {
                        Render.StringCustom(keybind_x - 8,keybind_y + 5 + y_offset2,0, "Resolver override",white ,fontIn )
                        y_offset2 = y_offset2 + 17
                    }
                    if (mousedir_Active)
                    {
                        Render.StringCustom(keybind_x - 8,keybind_y + 5 + y_offset2,0, "Mouse direction",white ,fontIn )
                        y_offset2 = y_offset2 + 17
                    }
                }
            }    
        }
        if (Entity.IsAlive(Entity.GetLocalPlayer()) || UI.IsMenuOpen()) {  /* yup sanity gone */
            if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Enable"))  {
                if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Spectator list")){ 
                    var spectating = get_spec(); 
                    Render.FilledRect(spectator_x - 12 ,spectator_y - 16.5,130 ,20 ,[26,26,26,255] )
                    Render.StringCustom(spectator_x + 52.5, spectator_y - 15 ,2 , "Spectators" , txtcolor , font)
                    Render.FilledRect(spectator_x - 12,spectator_y + 2 ,130 ,3 ,outlineCol )
                    for (i = 0; i < spectating.length; i++)
                    {
                        /* side note : if the player has unicode charachters like ø it will fuck up */
                    Render.StringCustom(spectator_x - 8, spectator_y + 5 + 15 * i,0, spectating[i] ,white ,fontIn ) /* printing player names with spacing each time so it doesnt appear all together */
                    }
                }
            }
        }
            if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Enable"))  {
                if (UI.GetValue('Misc', 'JAVASCRIPT', 'Script items', "Watermark")){ 
                    if (ip == "") /* ip returns as "" when not in game so to fix this for watermark just simply change ip value when this is the situation */
                    {
                        ip = "not connected"
                    }
                    if (!Entity.IsValid(Entity.GetLocalPlayer()))  /* if entity is invalid its highly likely we aren't in game so set ping to 0 else it will say prop name */
                    {
                        ping = 0
                    }
                    
                    /* this gets the size of all the text that will be on the watermark */
                    var  txt_size = Render.TextSizeCustom("onetap" + " | " + user +" | " + ip + " | " + ping + "ms" + " | "  + tick + " Tick", fontWater); /* getting text width so it auto resizes and doesnt fucking breeeeeak */
                   
                    /* here you can see why we got the size as we now use it to resize the watermark */
                    Render.FilledRect(x_left - txt_size[0]/5 - 7 ,y_water ,txt_size[0] + 10 ,20 ,[26,26,26,255])
                    Render.FilledRect(x_left - txt_size[0]/5 - 7,y_water + 20 ,txt_size[0] + 10 ,3 ,outlineCol )

                    Render.StringCustom(x_left - txt_size[0]/5  ,y_water + 1 ,0 ,"onetap | " + user +" | " + ip + " | " + ping + "ms" + " | "  + tick + " Tick" ,txtcolor ,fontWater ) /* actually drawing the text */  
             }
        }       
}     

function on_detach() /* when u unload or detach a script it doesn't disable AA override luckily its just a couple of extra lines :p */
{
    AntiAim.SetOverride(0)
}

Cheat.RegisterCallback("item_purchase","on_purchase")
Cheat.RegisterCallback("Unload","on_detach") 
Cheat.RegisterCallback("Draw","on_draw")
Cheat.RegisterCallback("CreateMove", "on_cm")
Cheat.RegisterCallback("ragebot_fire" ,"on_fire" )
Cheat.RegisterCallback("player_hurt","on_hit" )
