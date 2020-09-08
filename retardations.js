var facts = ["Giraffes are unable to cough.","Polar bear fur is not white, it's clear.", "Blue eyes are the most sensitive to light, dark brown the least sensitive.", "A one ounce milk chocolate bar has 6 mg of caffeine.", "Panophobia is the fear of everything.", "Infants spend more time dreaming than adults do.", "Forest fires move faster uphill than downhill.", "In just about every species of mammal, the female lives longer than the male.", "Cats make over 100 different vocal sounds; dogs can make about ten.", "The word 'set' has more definitions than any other word in the English language."]
var jokes = ["Why did the cowboy have a weiner dog?, Somebody told him to get a long little doggy.", "How can you tell a vampire has a cold?, They start coffin.", "Just read a few facts about frogs,They were ribbiting.","What did the left eye say to the right eye?  Between us, something smells!", "I used to be addicted to soap, but I'm clean now.","What time is it? I don't know... it keeps changing.", "Yesterday a clown held a door open for me. I thought it was a nice jester.", "The other day I was listening to a song about superglue, it’s been stuck in my head ever since.", "Why do valley girls hang out in odd numbered groups? Because they can't even.", "Don't tell secrets in corn fields. Too many ears around."]
/* note there is only like 10 of each you can add your own  but i was too lazy

*/
function get_rand_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
} /* getting random integer */

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
        Cheat.PrintChat("use !fact to get a random fact")
        Cheat.PrintChat("use !joke to get a random joke")
        Cheat.PrintChat("use !random number from a random number 0 to 100")
    }

    if (chatter == me && text == "!joke")
    {
        random_joke = jokes[get_rand_int(0, jokes.length)]
        Cheat.PrintChat(random_joke)
    }

    if (chatter == me && text == "!fact")
    {
        random_fact = facts[get_rand_int(0, jokes.length)]
        Cheat.PrintChat(random_fact)
    }

    if (chatter == me && text == "!random number")
    {
        random_numb = get_rand_int(0,100)
        Cheat.PrintChat(random_numb)
    }
}
Cheat.RegisterCallback("player_say", "on_say")