module.exports = function i18n(item) {
  const languages = [];
  Object.keys(item.labels).map(language => {
    if (language === 'en') {
      languages.push({
        label: item.labels[language],
        description: item.descriptions[language],
        aliases: [
          ...(item.aliases[language] ? item.aliases[language] : []),
          ...(item.claims['P1705'] ? item.claims['P1705'].map(claim => claim.value.text) : []),// native label
          ...(item.claims['P1638'] ? item.claims['P1638'].map(claim => claim.value.text) : [])// codename
        ],
        languageCode: language
      });
    }
  })
  return languages;
}
