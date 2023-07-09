import { Model } from 'objection';

export default class Country extends Model {
  static tableName = 'countries';

  static relationMappings = {
    translations: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/CountryTranslation`,
      join: {
        from: 'countries.id',
        to: 'country_translations.countryId'
      }
    }
  };
}
