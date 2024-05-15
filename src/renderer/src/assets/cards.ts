const baseCards = import.meta.glob("./cards/PNG/*.png", {
  'eager': true, "import": "default"
});

const basePath = "./cards/PNG/"
const cardData: Record<string, unknown> = {}

Object.keys(baseCards).forEach((cardKey) => {
  cardData[cardKey.replace(basePath, "").replace(".png", "")] = baseCards[cardKey];
})

export const cards = {...cardData};