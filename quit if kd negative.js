function on_draw()
{
    var me = Entity.GetLocalPlayer() 
    var kills = Entity.GetProp(me,"CPlayerResource" ,"m_iKills")
    var deaths = Entity.GetProp(me,"CPlayerResource" ,"m_iDeaths")
    if (kills < deaths)
    {
        Cheat.ExecuteCommand("quit")
    }

}

Cheat.RegisterCallback("Draw","on_draw")
