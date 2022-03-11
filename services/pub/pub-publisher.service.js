import Joi from 'joi'
import { BaseJsonService } from '../index.js'

const schema = Joi.object({
  publisherId: Joi.string().allow(null).required(),
}).required()

class PubPublisher extends BaseJsonService {
  static category = 'other'

  static route = {
    base: 'pub/publisher',
    pattern: ':packageName',
  }

  static examples = [
    {
      title: 'Pub Publisher',
      namedParams: { packageName: 'example' },
      staticPreview: {
        label: 'publisher',
        message: 'my.publisher.io',
        color: 'blue',
      },
      keywords: ['dart', 'dartlang'],
    },
  ]

  static defaultBadgeData = { label: 'publisher' }

  async fetch({ packageName }) {
    return this._requestJson({
      schema,
      url: `https://pub.dev/api/packages/${packageName}/publisher`,
    })
  }

  async handle({ packageName }) {
    const data = await this.fetch({ packageName })
    const publisher = data.publisherId
    return {
      label: 'publisher',
      message: publisher == null ? 'unverified' : publisher,
      color: publisher == null ? 'red' : 'blue',
    }
  }
}

export { PubPublisher }
