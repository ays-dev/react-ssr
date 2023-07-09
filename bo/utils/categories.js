module.exports = [{
  slug: 'films',
  precedence: 3,
  production: true,
  countries: [
    { key: 'countryOfOrigin', property: 'P495' }
  ],
  claims: ['Q11424'],
  noclaims: ['series'],
  base: [
    // 'originalCountry',
    // 'titles' (using originalLanguages) ?,
    // 'workingTitle',
    { path: 'value.amount', key: 'runtime', property: 'P2047', to: 'duration'},
    { path: 'value', key: 'publicationDate', property: 'P577', to: 'startAt' }
  ],
  tags: [
    { key: 'instanceOf', property: 'P31' },
    { key: 'genres', property: 'P136' },
    { key: 'mainSubject', property: 'P921' },
    { key: 'movement', property: 'P135' },
    { key: 'sport', property: 'P641' }
    // sport*

    // movement P135*
    // color (+ for b&w)
    // has quality (+ for certain values)
    // FSK film rating (german)
    // JMK film rating (australian)
    // original language of work (+)
    // filming location (+)
    // award received (+)
    // uses P2283 (+ for certain values)
  ],
  relations: [
    { key: 'director', property: 'P57' , credit: true},// credit
    { key: 'inspiredBy', property: 'P941' },
    { key: 'namedAfter', property: 'P138' },
    { key: 'screenwriter', property: 'P58' },
    { key: 'directorOfPhotography', property: 'P344' },
    { key: 'composer', property: 'P86' },
    { key: 'followedBy', property: 'P156' },
    { key: 'follows', property: 'P155' },
    { key: 'series', withQualifier: ['followedBy', 'follows'], property: 'P179' },
    { key: 'takesPlaceInFictionalUniverse', property: 'P1434' },
    { key: 'fromFictionalUniverse', property: 'P1080' },
    { key: 'presentInWork', property: 'P1441' },
    { key: 'basedOn', property: 'P144' },
    { key: 'artDirector', property: 'P3174' },
    { key: 'afterAWorkBy', property: 'P1877' },
    { key: 'contributorsToTheCreativeWork', property: 'P767' },
    { key: 'contributedToCreativeWork', property: 'P3919' },
    { key: 'castMember', withQualifier: ['characterRole'], property: 'P161' },
    { key: 'producer', property: 'P162' },
    { key: 'soundtrackAlbum', property: 'P406' },
    { key: 'narrativeLocation', property: 'P840' },
    { key: 'originalLanguageOfWork', property: 'P364' },
    { key: 'choreographer', property: 'P1809' },
    { key: 'costumeDesigner', property: 'P2515' },

    // { key: 'productionCompany', property: 'P272' },
    // { key: 'filmEditor', property: 'P1040' },
    // { key: 'filmingLocation', property: 'P915' },
    // { key: 'productionDesigner', property: 'P2554' },

    // { key: 'commonsCategory', property: 'P373' },
    // { key: 'voiceActor', property: '' },
    // { key: 'executiveProducer', property: '' },
    // { key: 'characters', property: '' },
    // 'inspiredBy?'*
    // 'namedAfter?'*
    // screenwriter*
    // director of photography*
    // composer*
    // followed By*
    // follows*
    // series*
    // takes place in fictional universe*
    // cast member*
    // dedicated to*
    // pendant of*
    // unveiled by*
    // after a work by*
    // art director*
    // storyboard artist*
    // scenographer*
    // representation of*
    // based on*
    // narrative location
    // costume designer
    // make-up artist
    // voice actor
    // executive producer
    // participant of
    // film editor
    // producer
    // production company
    // distributor
    // original network
    // film crew member
  ],
}, {
  slug: 'series',
  production: true,
  countries: [
    { key: 'countryOfOrigin', property: 'P495' }
  ],
  precedence: 2,
  claims: ['Q5398426'],
  base: [
    { key: 'startTime', property: 'P580', to: 'startAt', path: 'value'},
    { key: 'endTime', property: 'P582', to: 'endAt', path: 'value'},
    { key: 'publicationDate', property: 'P577', to: 'startAt', path: 'value'},
    { key: 'dateOfEnd', property: 'P570', to: 'endAt', path: 'value'},
    { key: 'runtime', property: 'P2047', to: 'duration', path: 'value.amount'},
    { key: 'numberOfSeasons', property: 'P2437', to: 'numberOfParts', path: 'value.amount'},
    { key: 'numberOfEpisodes', property: 'P1113', to: 'numberOfSubparts', path: 'value.amount'},
    // ?number of parts of a work of art
  ],
  tags: [
    { key: 'instanceOf', property: 'P31' },
    { key: 'genres', property: 'P136' },
    { key: 'mainSubject', property: 'P921' },
    { key: 'movement', property: 'P135' },
    { key: 'sport', property: 'P641' }

    // color
    // has quality
  ],
  relations: [
    { key: 'creator', property: 'P170' , credit: true},// credit
    { key: 'inspiredBy', property: 'P941' },
    { key: 'namedAfter', property: 'P138' },
    { key: 'screenwriter', property: 'P58' },
    { key: 'directorOfPhotography', property: 'P344' },
    { key: 'composer', property: 'P86' },
    { key: 'followedBy', property: 'P156' },
    { key: 'follows', property: 'P155' },
    { key: 'series', withQualifier: ['followedBy', 'follows'], property: 'P179' },
    { key: 'takesPlaceInFictionalUniverse', property: 'P1434' },
    { key: 'fromFictionalUniverse', property: 'P1080' },
    { key: 'presentInWork', property: 'P1441' },
    { key: 'contributorsToTheCreativeWork', property: 'P767' },
    { key: 'contributedToCreativeWork', property: 'P3919' },
    { key: 'afterAWorkBy', property: 'P1877' },
    { key: 'artDirector', property: 'P3174' },
    { key: 'producer', property: 'P162' },
    { key: 'soundtrackAlbum', property: 'P406' },
    { key: 'narrativeLocation', property: 'P840' },
    { key: 'originalLanguageOfWork', property: 'P364' },
    { key: 'choreographer', property: 'P1809' },
    { key: 'costumeDesigner', property: 'P2515' },
    // { key: 'originalNetwork', property: 'P449' },
    // { key: 'productionCompany', property: 'P272' },
    // { key: 'castMember', withQualifier: ['characterRole'], property: 'P161' },
    // { key: 'filmingLocation', property: 'P915' },
    // { key: 'filmEditor', property: 'P1040' },
    // { key: 'productionDesigner', property: 'P2554' },

    // { key: 'commonsCategory', property: 'P373' },
    // { key: 'voiceActor', property: '' },
    // { key: 'executiveProducer', property: '' },
    // voice actor
    // original network*
    // composer*
    // cast member*
    // characters*
    // director*
    // voice actor
    // production company
  ],
// }, {
//   slug: 'games', // + softwares ?
//   claims: ['Q11410']
}, {
  slug: 'books', // >literary works
  precedence: 5,
  production: true,
  countries: [
    { key: 'countryOfOrigin', property: 'P495' }
  ],
  claims: ['Q7725634'],//'Q571',
  noclaims: ['albums', 'songs'],
  base: [
    { path: 'value', key: 'publicationDate', property: 'P577', to: 'startAt' },
    { path: 'value.amount', key: 'numberOfPages', property: 'P1104', to: 'numberOfSubparts' },
  ],
  tags: [
    { key: 'instanceOf', property: 'P31' },
    { key: 'genres', property: 'P136' },
    // { key: 'mainSubject', property: 'P921' },// 60000 tags !
    { key: 'movement', property: 'P135' },
    { key: 'sport', property: 'P641' }

    // intended public*
  ],
  relations: [
    { key: 'author', property: 'P50' , credit: true},// credit
    { key: 'inspiredBy', property: 'P941' },
    { key: 'namedAfter', property: 'P138' },
    { key: 'followedBy', property: 'P156' },
    { key: 'follows', property: 'P155' },
    { key: 'series', withQualifier: ['followedBy', 'follows'], property: 'P179' },
    { key: 'takesPlaceInFictionalUniverse', property: 'P1434' },
    { key: 'fromFictionalUniverse', property: 'P1080' },
    { key: 'presentInWork', property: 'P1441' },
    { key: 'basedOn', property: 'P144' },
    { key: 'hasPart', property: 'P527' },
    { key: 'partOf', property: 'P361' },
    { key: 'editor', property: 'P98' },
    { key: 'publishedIn', property: 'P1433' },
    { key: 'contributorsToTheCreativeWork', property: 'P767' },
    { key: 'contributedToCreativeWork', property: 'P3919' },
    { key: 'illustrator', property: 'P110' },
    { key: 'schoolOf', property: 'P3080' },
    { key: 'intendedPublic', property: 'P2360' },
    { key: 'afterAWorkBy', property: 'P1877' },
    { key: 'narrativeLocation', property: 'P840' },
    // { key: 'publisher', property: 'P123' },
    // { key: 'languageOfWorkOrName', property: 'P407' },

    // { key: 'commonsCategory', property: 'P373' },
    // { key: 'soundtrackAlbum', property: 'P406' },
    // { key: 'isRectoOf', property: '' },
    // { key: 'isVersoOf', property: '' },
    // has part*
    // part of*
    // editor*
    // publisher*
    // published in*
    // characters P674*
    // contributor(s) to the subject*
    // illustrator*
    // printed by
    // exemplar of
    // has edition
    // is recto of
    // is verso of
    // translator
  ],
// }, {
//   slug: 'musics', // =musical works
//   claims: ['Q2188189']
}, {
  slug: 'peoples',
  precedence: 8,
  // production: true,
  countries: [
    { key: 'countryOfCitizenship', property: 'P27' }
  ],
  claims: ['Q5'],
  noclaims: ['bands', 'organizations'],
  base: [
    { path: 'value', key: 'dateOfBirth', property: 'P569', to: 'startAt' },
    { path: 'value', key: 'dateOfDeath', property: 'P570', to: 'endAt' }
    // sport
  ],
  tags: [
    { key: 'instanceOf', property: 'P31' },
    { key: 'gender', property: 'P21' },
    { key: 'genres', property: 'P136' },
    { key: 'occupation', property: 'P106' },
    { key: 'fieldOfWork', property: 'P101' },

    // field of work*

    // noble title
    // 'ethnic group'
  ],
  relations: [
    { key: 'schoolOf', property: 'P3080' },
    { key: 'sibling', property: 'P3373' },
    { key: 'relative', property: 'P1038' },
    { key: 'incarnationOf', property: 'P3701' },
    { key: 'notableWork', property: 'P800' },
    { key: 'contributedToTheCreativeWork', property: 'P3919' },
    // position held*
    // inspired by*
    // student of*
    // affiliation*

    // place of burial
    //honorific suffix
    //awards
    //member of political party
    // sibling P3373
    // relative P1038
    // wears
    // incarnation of
  ]
}, {
  slug: 'places', // + geographic location Q2221906, geographic regions (Q82794, 5M), geographical object (Q618123)
  precedence: 6,
  production: true,
  countries: [
    { key: 'country', property: 'P17' }
  ],
  // claims: 'Q17334923',// location
  // claims: 'Q15284',// municipality
  // claims: 'Q1200957',// touristic
  claims: ['Q7551384', 'Q1200957', 'Q1549591'],// social space + touristic
  //Q1549591 big cities
  base: [
    { path: 'value', key: 'inception', property: 'P571', to: 'startAt' },
    // dissolved, abolished or demolished*

  ],
  tags: [
    { key: 'instanceOf', property: 'P31' },
    { key: 'architecturalStyle', property: 'P149' }
    // architectural style
  ],
  relations: [
    { key: 'ownedBy', property: 'P127', credit: true },
    { key: 'occupant', property: 'P466' },
    { key: 'founder', property: 'P112' },
    { key: 'architect', property: 'P84'},
    { key: 'namedAfter', property: 'P138' },
    { key: 'partOf', property: 'P361' },
    { key: 'locatedOnStreet', property: 'P669' },
    { key: 'mainBuildingContractor', property: 'P193' },
    { key: 'structuralEngineer', property: 'P631' },
    { key: 'heritageDesignation', property: 'P1435' }

    // { key: 'commonsCategory', property: 'P373' },
    // { key: 'country', property: 'P17' },// credit
    // main building contractor*
    // structural engineer
    // occupant
    // heritage designation

  ],
// }, {
//   slug: 'events',
//   claims: ['Q1656682']
// }, {
//   slug: 'transports', // =itinetarity, +transports(Q334166)
//   claims: ['Q1322323']
}, {
  slug: 'organizations', // >group of humans
  precedence: 9,
  // production: true,
  countries: [
    { key: 'country', property: 'P17' }
  ],
  claims: ['Q43229'],
  noclaims: ['bands', 'places', 'peoples'],
  base: [
    { key: 'inception', property: 'P571', to: 'startAt' },
    { action: 'count', key: 'hasPart', property: 'P527', to: 'numberOfParts', label:'numberOfActiveMembers' },
  ],
  tags: [
    { key: 'instanceOf', property: 'P31' },
    { key: 'industry', property: 'P452' },
    // industry*

    // { key: 'genres', property: 'P136' },
    // { key: 'mainSubject', property: 'P921' },
    // { key: 'occupation', property: 'P106' }
  ],
  relations: [
    { key: 'ownedBy', property: 'P127', credit: true },
    { key: 'founder', property: 'P112' },
    // { key: 'commonsCategory', property: 'P373' },
    // parent organization*
    // source of income*
    // headquarters location*
    // sponsor
    // manager/director
    // member of
    // subsidiary
    // chief executive officer
    // award received
    // { action: 'flag', key: 'hasPart', property: 'P527', flag: 'activeMembers' }
  ],
// }, {
//   slug: 'languages',
//   claims: ['Q315']
// }, {
//   slug: 'clothes', // >costumes
//   claims: ['Q1065579']
// }, {
//   slug: 'platforms',
//   claims: ['Q241317']
// }, {
//   slug: 'foods',
//   claims: ['Q2095']
// }, {
//   slug: 'visuals',
//   claims: ['Q4502142']
// }, {
//   slug: 'mobiles',
//   claims: ['Q19723444']
// }, {
//   slug: 'automobiles',
//   claims: ['Q3231690']
}, {
  slug: 'albums',
  precedence: 4,
  production: true,
  countries: [
    { key: 'countryOfOrigin', property: 'P495' }
  ],
  claims: ['Q482994'],
  noclaims: ['songs'],
  base: [
    { path: 'value.amount', key: 'publicationDate', property: 'P577', to: 'startAt' },
    { action: 'count', key: 'numberOfTracks', property: 'P658', to: 'numberOfSubparts' }
  ],
  tags: [
    { key: 'instanceOf', property: 'P31' },
    { key: 'genres', property: 'P136' },
    { key: 'mainSubject', property: 'P921' },
    { key: 'voiceType', property: 'P412' },
    { key: 'tonality', property: 'P826' },
    { key: 'movement', property: 'P135' },
    // voice type
    // tonality
    // tempo marking
    // beats per minute (unit: bpm)
    // Fach
  ],
  relations: [
    { key: 'performer', property: 'P175' , credit: true},// credit
    // { key: 'commonsCategory', property: 'P373' },
    { key: 'partOf', property: 'P361' },
    { key: 'inspiredBy', property: 'P941' },
    { key: 'namedAfter', property: 'P138' },
    { key: 'followedBy', property: 'P156' },
    { key: 'follows', property: 'P155' },
    { key: 'series', withQualifier: ['followedBy', 'follows'], property: 'P179' },
    { key: 'takesPlaceInFictionalUniverse', property: 'P1434' },
    { key: 'fromFictionalUniverse', property: 'P1080' },
    { key: 'presentInWork', property: 'P1441' },
    { key: 'basedOn', property: 'P144' },
    { key: 'recordLabel', property: 'P264' },
    { key: 'producer', property: 'P162' },
    { key: 'influencedBy', property: 'P737' },
    { key: 'lyricsBy', property: 'P676' },
    { key: 'instrumentation', property: 'P870' },
    { key: 'themeMusic', property: 'P942' },
    { key: 'hasMelody', property: 'P1625' },
    { key: 'contributorsToTheCreativeWork', property: 'P767' },
    { key: 'contributedToCreativeWork', property: 'P3919' },
    { key: 'afterAWorkBy', property: 'P1877' },
    { key: 'artDirector', property: 'P3174' },
    { key: 'directorOfPhotography', property: 'P344' },
    { key: 'originalLanguageOfWork', property: 'P364' },

    // { key: 'coverArtist', property: '' },
    // record label*
    // producer*
    // influenced by (band)*
    // lyrics by*
    // instrumentation*
    // theme music*
    // has melody*
    // cover artist
    // { key: 'tracklist', property: 'P658' }
  ],
}, {
  slug: 'bands',
  precedence: 7,
  production: true,
  countries: [
    { key: 'countryOfOrigin', property: 'P495' }
  ],
  claims: ['Q215380', 'Q2088357'],// band, + missing #musical ensemble
  base: [
    { path: 'value', key: 'inception', property: 'P571', to: 'startAt' },
    // dissolved, abolished or demolished*

    // { action: 'count', key: 'hasPart', property: 'P527', to: 'numberOfParts', label:'numberOfActiveMembers' },
  ],
  tags:[
    { key: 'instanceOf', property: 'P31' },
    { key: 'genres', property: 'P136' },
    { key: 'mainSubject', property: 'P921' },
    { key: 'voiceType', property: 'P412' },
    { key: 'tonality', property: 'P826' },
    { key: 'movement', property: 'P135' }
  ],
  relations: [
    { key: 'members', placeholder: 'hasPart', property: 'P527' , credit: true },// credit if 'active'
    // { key: 'commonsCategory', property: 'P373' },
    { key: 'inspiredBy', property: 'P941' },
    { key: 'namedAfter', property: 'P138' },
    { key: 'basedOn', property: 'P144' },
    { key: 'recordLabel', property: 'P264' },
    { key: 'producer', property: 'P162' },
    { key: 'influencedBy', property: 'P737' },
    { key: 'instrumentation', property: 'P870' },
    { key: 'schoolOf', property: 'P3080' },
    { key: 'artDirector', property: 'P3174' },
    { key: 'originalLanguageOfWork', property: 'P364' },
    // location of formation
  ],
}, {
  slug: 'songs',
  production: true,
  claims: ['Q7366'],
  noclaims: ['books'],
  base: [
    { key: 'runtime', property: 'P2047', to: 'duration'},
    { key: 'publicationDate', property: 'P577', to: 'startAt' }
  ],
  tags: [
    { key: 'instanceOf', property: 'P31' },
    { key: 'genres', property: 'P136' },
    { key: 'mainSubject', property: 'P921' },
    { key: 'voiceType', property: 'P412' },
    { key: 'tonality', property: 'P826' },
    { key: 'movement', property: 'P135' },
    // voice type
    // tonality
    // tempo marking
    // beats per minute (unit: bpm)
    // Fach
  ],
  relations: [
    { key: 'performer', property: 'P175' , credit: true},// credit
    // { key: 'commonsCategory', property: 'P373' },
    { key: 'partOf', property: 'P361' },
    { key: 'inspiredBy', property: 'P941' },
    { key: 'namedAfter', property: 'P138' },
    { key: 'followedBy', property: 'P156' },
    { key: 'follows', property: 'P155' },
    { key: 'series', withQualifier: ['followedBy', 'follows'], property: 'P179' },
    { key: 'takesPlaceInFictionalUniverse', property: 'P1434' },
    { key: 'fromFictionalUniverse', property: 'P1080' },
    { key: 'presentInWork', property: 'P1441' },
    { key: 'basedOn', property: 'P144' },
    { key: 'recordLabel', property: 'P264' },
    { key: 'producer', property: 'P162' },
    { key: 'influencedBy', property: 'P737' },
    { key: 'lyricsBy', property: 'P676' },
    { key: 'instrumentation', property: 'P870' },
    { key: 'themeMusic', property: 'P942' },
    { key: 'hasMelody', property: 'P1625' },
    { key: 'contributorsToTheCreativeWork', property: 'P767' },
    { key: 'contributedToCreativeWork', property: 'P3919' },
    { key: 'afterAWorkBy', property: 'P1877' },
    { key: 'artDirector', property: 'P3174' },
    { key: 'directorOfPhotography', property: 'P344' },
    { key: 'originalLanguageOfWork', property: 'P364' },
  ],
}, {
  slug: 'video-games',
  precedence: 1,
  production: true,
  countries: [
    { key: 'countryOfOrigin', property: 'P495' }
  ],
  claims: ['Q7889'],
  base: [
    { path: 'value', key: 'publicationDate', property: 'P577', to: 'startAt' }
  ],
  tags: [
    { key: 'instanceOf', property: 'P31' },
    { key: 'genres', property: 'P136' },
    { key: 'mainSubject', property: 'P921' },
    { key: 'movement', property: 'P135' },
    { key: 'gameMode', property: 'P404' },
    // gameMode*
    { key: 'sport', property: 'P641' }
    // inputMode
    // distribution (ie: DVD)
  ],
  relations: [
    { key: 'publisher', property: 'P123', credit: true },//credit
    { key: 'director', property: 'P57' },
    // { key: 'commonsCategory', property: 'P373' },
    { key: 'partOf', property: 'P361' },
    { key: 'inspiredBy', property: 'P941' },
    { key: 'namedAfter', property: 'P138' },
    { key: 'followedBy', property: 'P156' },
    { key: 'follows', property: 'P155' },
    { key: 'series', withQualifier: ['followedBy', 'follows'], property: 'P179' },
    { key: 'takesPlaceInFictionalUniverse', property: 'P1434' },
    { key: 'fromFictionalUniverse', property: 'P1080' },
    { key: 'presentInWork', property: 'P1441' },
    { key: 'basedOn', property: 'P144' },
    { key: 'gameArtist', property: 'P3080' },
    { key: 'designedBy', property: 'P287' },
    { key: 'platform', property: 'P400' },
    { key: 'developer', property: 'P178' },
    { key: 'composer', property: 'P86' },
    { key: 'afterAWorkBy', property: 'P1877' },
    { key: 'artDirector', property: 'P3174' },
    { key: 'directorOfPhotography', property: 'P344' },
    { key: 'illustrator', property: 'P110' },
    { key: 'originalLanguageOfWork', property: 'P364' },
    { key: 'productionDesigner', property: 'P2554' },
    // director*
    // game artist*
    // designed by*
    // platform*
    // developer*
    // composer*
    // producer
    // distribution
    // software engine
    // narrative location
  ]
// }, {
//   slug: 'countries',
//   claims: ['Q6256']
// }, {
//   slug: 'fictionnal entity', // +deities (Q178885), fictionnal organisms (Q30017383)
//   claims: ['Q14897293']
// }, {
//   slug: 'episode',
//   claims: ['Q21191270'],
//   base: [
//     { key: 'runtime', property: 'P2047', to: 'duration'},
//     { key: 'publicationDate', property: 'P577', to: 'startAt' },
//     { key: 'firstPerformance', property: 'P1191', to: 'startAt' }
//   ],
//   tags: [
//     { key: 'instanceOf', property: 'P31' },
//     { key: 'mainSubject', property: 'P921' }
//   ],
//   relations: [
//     { key: 'creator', property: 'P170' }
//   ],
// }, {
//   slug: 'season',
//   claims: ['Q3464665']
// }, {
//   slug: 'machines',
//   claims: ['Q11019']
//   + animals
//   + street art, architectural structure (Q811979)
//   + sport teams
//   + machines (Q11019, 86k)?
//   + fictionnal objects (Q23010327)
//   + flags
//   + currencies
//   + products, cards, toys, modelisms, perfums, music instruments, ustensils
//   + franchises
}];
