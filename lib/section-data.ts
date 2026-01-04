import { SectionConfig } from "@/types/prompt";

export const SECTIONS: SectionConfig[] = [
    {
        id: "character",
        label: "Character",
        color: "section-character",
        visibleFor: ["photo", "video"],
        fields: [
            { id: "gender", label: "Gender", options: ["Male", "Female", "Non-binary", "Androgynous", "Robot", "Alien", "Creature"] },
            { id: "race", label: "Race/Ethnicity", options: ["Caucasian", "African", "Asian", "Latino", "Middle Eastern", "Native American", "Fantasy Race", "Mixed"] },
            { id: "age", label: "Age", options: ["Infant", "Child", "Teenager", "Young Adult", "Adult", "Middle-aged", "Elderly", "Ancient"] },
            { id: "body", label: "Body Type", options: ["Slim", "Athletic", "Muscular", "Curvy", "Plus-size", "Skinny", "Average", "Giant", "Petite"] },
            { id: "skin", label: "Skin Details", options: ["Pale", "Tan", "Dark", "Freckled", "Scarred", "Tattooed", "Oily", "Wet", "Rough", "Porcelain", "Metallic", "Glowing"] },
            { id: "hair_style", label: "Hair Style", options: ["Long", "Short", "Bald", "Buzz Cut", "Bob", "Curly", "Straight", "Wavy", "Braided", "Dreadlocks", "Messy", "Slicked Back"] },
            { id: "hair_color", label: "Hair Color", options: ["Black", "Blonde", "Brunette", "Red", "White", "Grey", "Pink", "Blue", "Green", "Pastel", "Neon"] },
            { id: "eyes", label: "Eyes", options: ["Blue", "Green", "Brown", "Hazel", "Grey", "Red", "Glowing", "Heterochromia", "Blind"] },
            { id: "expression", label: "Expression", options: ["Happy", "Sad", "Angry", "Neutral", "Surprised", "Fearful", "Disgusted", "Stoic", "Seductive", "Crazy", "Tired"] },
        ],
    },
    {
        id: "clothing",
        label: "Clothing",
        color: "section-clothing",
        visibleFor: ["photo", "video"],
        fields: [
            { id: "style", label: "Style", options: ["Casual", "Formal", "Streetwear", "Cyberpunk", "Steampunk", "Fantasy", "Sci-fi", "Vintage", "Retro", "Minimalist", "Avant-garde", "Military", "Goth", "Punk"] },
            { id: "top", label: "Tops", options: ["T-shirt", "Shirt", "Blouse", "Hoodie", "Jacket", "Coat", "Tank Top", "Suit Jacket", "Robe", "Armor", "Sweater"] },
            { id: "bottom", label: "Bottoms", options: ["Jeans", "Trousers", "Shorts", "Skirt", "Dress", "Leggings", "Cargo Pants", "Sweatpants"] },
            { id: "footwear", label: "Footwear", options: ["Sneakers", "Boots", "Heels", "Sandals", "Barefoot", "Loafers", "Combat Boots"] },
            { id: "accessories", label: "Accessories", options: ["Glasses", "Sunglasses", "Hat", "Cap", "Beanie", "Mask", "Jewelry", "Watch", "Scarf", "Gloves", "Backpack", "Headphones"] },
            { id: "fabric", label: "Fabric/Material", options: ["Cotton", "Leather", "Denim", "Silk", "Velvet", "Latex", "Metallic", "Fur", "Lace", "Nylon"] },
        ],
    },
    {
        id: "pose",
        label: "Pose",
        color: "section-pose",
        visibleFor: ["photo", "video"],
        fields: [
            { id: "type", label: "Pose Type", options: ["Standing", "Sitting", "Lying Down", "Walking", "Running", "Jumping", "Fighting", "Dancing", "Floating", "Flying", "Falling", "Kneeling"] },
            { id: "angle", label: "Angle", options: ["Front View", "Side View", "Back View", "Three-Quarter View", "Over-the-shoulder", "Dynamic Angle"] },
            { id: "framing", label: "Framing", options: ["Close-up", "Medium Shot", "Full Body", "Cowboy Shot", "Extreme Close-up", "Wide Shot"] },
            { id: "gaze", label: "Gaze", options: ["Looking at Camera", "Looking Away", "Looking Up", "Looking Down", "Closed Eyes", "Squinting"] },
        ],
    },
    {
        id: "place",
        label: "Place",
        color: "section-place",
        visibleFor: ["photo", "video"],
        fields: [
            { id: "setting", label: "Setting", options: ["Indoor", "Outdoor", "Studio", "Nature", "Urban", "Space", "Underwater", "Fantasy World", "Cyberpunk City"] },
            { id: "location", label: "Specific Location", options: ["Bedroom", "Living Room", "Kitchen", "Office", "Street", "Forest", "Beach", "Mountain", "Desert", "City Setting", "Ruins", "Laboratory", "Spaceship"] },
            { id: "time", label: "Time of Day", options: ["Dawn", "Morning", "Noon", "Afternoon", "Sunset", "Dusk", "Night", "Midnight", "Golden Hour", "Blue Hour"] },
            { id: "weather", label: "Weather", options: ["Sunny", "Cloudy", "Rainy", "Stormy", "Snowy", "Foggy", "Misty", "Windy"] },
        ]
    },
    {
        id: "cinematography",
        label: "Cinematography",
        color: "section-cinematography",
        visibleFor: ["photo", "video"],
        fields: [
            { id: "shot_type", label: "Shot Type", options: ["Macro", "Telephoto", "Wide Angle", "Fisheye", "Drone", "GoPro", "CCTV", "Polaroid", "Vintage Film", "Isometric"] },
            { id: "camera", label: "Camera Model", options: ["Sony A7RIV", "Canon R5", "Nikon Z9", "Leica M11", "Hasselblad", "Fujifilm GFX", "Arri Alexa", "Red Komodo", "iPhone", "Film Camera"] },
            { id: "film_stock", label: "Film Stock", options: ["Kodak Portra 400", "Kodak Gold 200", "Fujifilm Velvia", "Ilford HP5", "Cinestill 800T", "Ektachrome"] },
            { id: "lighting_style", label: "Lighting Style", options: ["Cinematic", "Studio", "Natural", "Volumetric", "Rembrandt", "Split", "Butterfly", "Loop", "Rim Light", "Silhouette", "Neon", "Cyberpunk"] },
            { id: "effects", label: "Effects", options: ["Bokeh", "Motion Blur", "Grain", "Vignette", "Chromatic Aberration", "Lens Flare", "Double Exposure", "Glitch"] },
        ]
    },
    {
        id: "lighting",
        label: "Lighting",
        color: "section-lighting",
        visibleFor: ["photo", "video"],
        fields: [
            { id: "source", label: "Light Source", options: ["Sun", "Moon", "Lamp", "Fire", "Neon Sign", "Candle", "Flash", "Softbox", "Ring Light"] },
            { id: "color", label: "Light Color", options: ["Warm", "Cool", "Neutral", "Red", "Blue", "Green", "Purple", "Orange", "Multicolor"] },
            { id: "intensity", label: "Intensity", options: ["Bright", "Dim", "Soft", "Harsh", "Shadowy", "High Contrast", "Low Contrast"] },
        ]
    },
    {
        id: "palette",
        label: "Color Palette",
        color: "section-palette",
        visibleFor: ["photo", "video"],
        fields: [
            { id: "main", label: "Dominant Colors", options: ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Black", "White", "Grey", "Brown", "Gold", "Silver"] },
            { id: "vibe", label: "Vibe", options: ["Pastel", "Neon", "Dark", "Moody", "Vibrant", "Muted", "Monochrome", "Analogous", "Complementary", "Triadic"] },
        ]
    },
    {
        id: "cameraMotion",
        label: "Camera Motion",
        color: "section-video",
        visibleFor: ["video"],
        fields: [
            { id: "movement", label: "Movement", options: ["Static", "Pan", "Tilt", "Zoom In", "Zoom Out", "Dolly In", "Dolly Out", "Truck", "Pedestal", "Arc", "Handheld", "Shake", "Tracking"] },
            { id: "speed", label: "Speed", options: ["Slow", "Normal", "Fast", "Hyperlapse", "Timelapse", "Slow Motion", "Ramp"] },
            { id: "style", label: "Style", options: ["Smooth", "Jerky", "Cinematic", "FPV", "Drone", "Steadicam", "Gimbal"] },
        ],
    },
    {
        id: "action",
        label: "Character Action",
        color: "section-video",
        visibleFor: ["video"],
        fields: [
            { id: "activity", label: "Activity", options: ["Walking", "Running", "Dancing", "Fighting", "Swimming", "Driving", "Flying", "Talking", "Laughing", "Crying", "Eating", "Drinking", "Smoking", "Reading", "Writing", "Typing"] },
            { id: "interaction", label: "Interaction", options: ["With Object", "With Person", "With Animal", "With Environment"] },
        ]
    },
    {
        id: "sound",
        label: "Sound",
        color: "section-video",
        visibleFor: ["video"],
        fields: [
            { id: "details", label: "Sound Effects", options: ["Footsteps", "Rain", "Wind", "Traffic", "Explosion", "Gunshots", "Screams", "Whispers", "Music", "Silence", "Ambient"] },
        ]
    },
    {
        id: "speech",
        label: "Speech",
        color: "section-video",
        visibleFor: ["video"],
        fields: [
            { id: "language", label: "Language", options: ["English", "Spanish", "French", "German", "Japanese", "Chinese", "Russian", "Arabic"] },
            { id: "accent", label: "Accent", options: ["American", "British", "Australian", "Southern", "New York", "Russian", "French", "German"] },
            { id: "tone", label: "Tone", options: ["Angry", "Happy", "Sad", "Neutral", "Excited", "Scared", "Whispering", "Shouting"] },
        ]
    }
];
