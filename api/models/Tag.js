import { Model, QueryBuilder } from 'objection';

function selectLanguage(language) {
  return builder => builder.where('languageCode', language);
}

class TagQueryBuilder extends QueryBuilder {
  mostUsedTags(category, query) {
    const filterCategory = category ? `AND a.category = "${category}"` : '';
    const filterQuery = query
      ? ` INNER JOIN article_translations atr ON atr.articleId = a.id AND atr.languageCode = "EN" AND atr.label LIKE "%${query}%"`
      : '';
    const rawJoin = 'INNER JOIN article_tags at ON t.id = at.tagId '
      + `INNER JOIN articles a ON a.id = at.articleId ${filterCategory} `
      + 'INNER JOIN tag_translations tt ON tt.tagId = t.id AND tt.languageCode = "EN"'
      + filterQuery;

    return this
      .select(Tag.raw('t.id, tt.label, a.category'))
      .from(Tag.raw('tags t'))
      .joinRaw(rawJoin)
      .groupBy(Tag.raw('t.id, tt.label, a.category'))
      .orderByRaw('count(t.id) DESC')
      .limit(10);
  }

  findOneById(slug) {
    const articleScope = '[translations(selectLanguage)]';

    return this
      .eager(articleScope, { selectLanguage: selectLanguage('EN') })
      .where({ slug })
      .first();
  }

  findByCategory(category) {
    const articleScope = '[translations(selectLanguage)]';

    return this
      .eager(articleScope, { selectLanguage: selectLanguage('EN') })
      .where({ category })
      .limit(10);
  }

}

export default class Tag extends Model {
  static tableName = 'tags';

  static QueryBuilder = TagQueryBuilder;

  static relationMappings = {
    translations: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/TagTranslation`,
      join: {
        from: 'tags.id',
        to: 'tag_translations.tagId'
      }
    }
  };
}
