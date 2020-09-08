/*
// rpg.js
// Author : Hana#0353
// onetap the rpg
// boredom is the only motivation i have
*/

xp = 0
level = 1
xp_required = 100
prefix = "[onetap]"


load();

function on_say()
{
    me = Entity.GetLocalPlayer()
    text = Event.GetString("text")
    userid = Event.GetInt("userid")
    chatter = Entity.GetEntityFromUserID(userid)

    if (chatter == me && text == "!help")
    {
        /* Question : why am i doing this */
        /* Answer : Sheer boredom */
        Cheat.PrintChat("use !level to see your current level")
        Cheat.PrintChat("use !xp to see your current xp away from next level")
    }
    if (chatter == me && text == "!xp")
    {
        Cheat.PrintChat("\x01 \x03" + prefix + "\x03 \x01" + " you have " + xp + "xp you are " + (xp_required - xp) + "xp off the next level")
    }
    if (chatter == me && text == "!level")
    {
        Cheat.PrintChat("\x01 \x03" + prefix + "\x03 \x01" + " you are level " + level)
    }  
}

function on_death()
{
   me = Entity.GetLocalPlayer()
   weapon = Event.GetInt("weapon")
   assiter = Entity.GetEntityFromUserID(Event.GetInt("assister"))
   dead_player = Entity.GetEntityFromUserID(Event.GetInt("userid"))
   attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"))
   var headshot = Event.GetInt("headshot")

   if (dead_player == me && attacker == me)
   {
       xp = xp - 5
       Cheat.PrintChat("\x01 \x03" + prefix + "\x03 \x01" + "you lost 5 points due to suiciding")
   }
   else if (dead_player == me && attacker != me)
   {
    xp = xp - 5
    Cheat.PrintChat("\x01 \x03" + prefix + "\x03 \x01" + "you lost 5 points due to dying")
   }
   else if (dead_player != me && attacker != me && assiter == me)
   {
    xp = xp + 1
    Cheat.PrintChat("\x01 \x03" + prefix + "\x03 \x01" + "you gained 1 point due to getting an assist")
   }
   else if (dead_player != me && attacker == me && headshot == 0)
   {
    xp = xp + 5
    Cheat.PrintChat("\x01 \x03" + prefix + "\x03 \x01" + "you gained 5 points due to getting a kill")
   }
   else if (dead_player != me && attacker == me && headshot == 1)
   {
    xp = xp + 7
    Cheat.PrintChat("\x01 \x03" + prefix + "\x03 \x01" + "you gained 7 points due to getting a headshot kill")
   }

}
function on_cm()
{
    if (xp >= xp_required)
    {
        anim_time = 0;
        old_level = level
        level = level + 1
        xp_required = xp_required * 1.5
        Cheat.PrintChat("\x01 \x03" + prefix + "\x03 \x01" + "You leveled up!!! you were level " + old_level + " you are now level " + level)
       
    }
    if (Globals.Tickcount() % 1920 == 0)
    {
        save(); 
    }   
}

function on_detach()
{
    save();
}

function load()
{
    xp = Convar.GetFloat("xbox_autothrottle")
    level = Convar.GetFloat("xbox_throttlebias")
    xp_required = Convar.GetFloat("xbox_throttlespoof")
    Cheat.Print("successfully loaded from last save!" + "\n")
}

function save()
{
    Convar.SetFloat("xbox_autothrottle",xp)
    Convar.SetFloat("xbox_throttlebias", level)
    Convar.SetFloat("xbox_throttlespoof", xp_required) 
    Cheat.Print("successfully saved!" + "\n")
}

Cheat.RegisterCallback("Unload","on_detach" )
Cheat.RegisterCallback("CreateMove","on_cm" )
Cheat.RegisterCallback("player_death", "on_death" )
Cheat.RegisterCallback("player_say", "on_say")