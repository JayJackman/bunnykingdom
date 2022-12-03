

export enum Color
{
    LavaRed = "#CF1020",
    BrightRed = "#FF0000",
    Red = "#AA0000",
    Green = "#008000",
    Blue = "#0044EE",
    Yellow = "#CCBB55",
    BrightYellow = "#FFFF00",
    Gray = "#AAAAAA",
    Orange = "#FF8800",
    LightGreen = "#00FA44",
    Black = "#000000",
    White = "#FFFFFF",
    Pink = "#FF00FF",
    SkyBlue = "#B2FFFF",
    Purple = "#800080",
    RiverBlue = "#00BBFF",
    MeadowGreen = "#AEF359",
    LightGray = "#DDDDDD",
    BurntOrange = "#CC5500",
    WoodBrown = "#603B2A",
    FishBlue = "#0A3CCF",
    Gold = "#D4AF37",
    Iron = "#A19D94",
    Copper = "#B87333",
    Diamond = "#B9F2FF",
}

export class TileColors
{
    static Farm: Color = Color.BurntOrange
    static Forest: Color = Color.Green
    static River: Color = Color.RiverBlue
    static City: Color = Color.Yellow
    static Mountain: Color = Color.Gray
    static Meadow: Color = Color.MeadowGreen
    static Lava: Color = Color.LavaRed
    static TextForeground: Color = Color.Black
    static TextBackground: Color = Color.LightGray
}


export class PlayerColors
{
    static Red = Color.BrightRed
    static White = Color.White
    static Pink = Color.Pink
    static Yellow = Color.BrightYellow
    static Black = Color.Black
}

export class SkyTowerColors
{
    static Blue = Color.SkyBlue
    static Red = Color.Red
    static Purple = Color.Purple
}

export class ResourceColors
{
    static Carrot = Color.Orange
    static Wood = Color.WoodBrown
    static Fish = Color.FishBlue
    static CarrotSpice = Color.Orange
    static Mushroom = Color.WoodBrown
    static Pearl = Color.FishBlue
    static Gold = Color.Gold
    static Iron = Color.Iron
    static Copper = Color.Copper
    static Diamond = Color.Diamond
}
