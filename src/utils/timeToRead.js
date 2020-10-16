const _countWords = text => text.split(" ").length

const _stripPostHtml = html => {
    const withoutStyleTag = html.split("<style")[0]
    const strippedString = withoutStyleTag.replace(/(<([^>]+)>)/gi, "")
    return strippedString
}

const getTimeToRead = text => {
    const strippedText = _stripPostHtml(text)
    const wpm = 220 // human word reading speed
    const estimatedRaw = _countWords(strippedText) / wpm
    const minutes = Math.round(estimatedRaw)
    const readingTime = minutes < 1 ? "less than a min" : minutes + " min read"
    return readingTime
}

export default getTimeToRead;