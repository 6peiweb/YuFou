const EmojiData = require('@@/js/emoji.data')

let ImageData: any = {}

for (let prop in EmojiData) ImageData = Object.assign(ImageData, EmojiData[prop])

export default function createEmoji (emojiName: string, size: number) {
  let img = new Image(size, size)
  img.src = `./css-sprite/emoji/${ImageData[emojiName]}`
  return img
}
