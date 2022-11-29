enum Resource
{
    None,

    Fish,
    Wood,
    Carrot,
    Pearl,
    Mushroom,
    CarrotSpice,
    Copper,
    Iron,
    Gold,
    Diamond,

    Variable,
}

export function resourceToChar(resource: Resource): string
{
    switch (resource)
    {
        case Resource.None: return ""
        case Resource.Fish: return "F"
        case Resource.Wood: return "W"
        case Resource.Carrot: return "C"
        case Resource.Pearl: return "P"
        case Resource.Mushroom: return "M"
        case Resource.CarrotSpice: return "Cs"
        case Resource.Copper: return "Cu"
        case Resource.Iron: return "I"
        case Resource.Gold: return "G"
        case Resource.Diamond: return "D"
        case Resource.Variable: return "?"
    }
}

export function resourceToString(resource?: Resource): string
{
    switch (resource)
    {
        case Resource.None: return "None"
        case Resource.Fish: return "Fish"
        case Resource.Wood: return "Wood"
        case Resource.Carrot: return "Carrot"
        case Resource.Pearl: return "Pearl"
        case Resource.Mushroom: return "Mushroom"
        case Resource.CarrotSpice: return "Carrot Spice"
        case Resource.Copper: return "Copper"
        case Resource.Iron: return "Iron"
        case Resource.Gold: return "Gold"
        case Resource.Diamond: return "Diamond"
        case Resource.Variable: return "Variable"
        default: return "undefined"
    }
}

// function resourceTypeToString(resource: ResourceType)
// {
//     switch(resource)
//     {
//         case ResourceType
//     }
// }


export { Resource }
