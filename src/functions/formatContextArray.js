import { result } from "lodash-es"

const titleize = (str) => {
    return str[0].toUpperCase() + str.slice(1)
}

const formatLanguageObject = (languageObject) => {
    let formattedObject = { value: languageObject.language.code.toUpperCase(), label: `${titleize(languageObject.language.language)} (${languageObject.language.code.toUpperCase()})` }
    return formattedObject
}

const formatContextArray = (langArray) => {
    let resultingObject = {}
    if (langArray.length > 0) {
        for (let i = 0; i < langArray.length; i++) {
            let languageObject = langArray[i]
            if (resultingObject[languageObject.context.id]) {
                resultingObject[languageObject.context.id].push(formatLanguageObject(languageObject))
            } else {
                resultingObject[languageObject.context.id] = [formatLanguageObject(languageObject)]
            }
        }
    }
    else {
        resultingObject = [{ label: "None", value: " " }]
    }
    return resultingObject
}
export default formatContextArray

/*

  [
      { context:1, langArray: [{ value: "value", label: "label" }] },
      { context:2, langArray: [{ value: "value", label: "label" }] }
    ]

*/