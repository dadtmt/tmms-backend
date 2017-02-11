import { transformDataToPages } from './StoryFeedWithData'

describe('transformDataToPages', () => {
  it('return pages array', () => {
    const data = {
      'viewer': {
        'allPages': {
          'edges': [
            {
              'cursor': 'Y3Vyc29yOjU0',
              'node': {
                'id': 'UGFnZTo1NA==',
                'text': '{\'entityMap\':{},\'blocks\':[{\'key\':\'1q0f0\',\'text\':\'aa\',\'type\':\'unstyled\',\'depth\':0,\'inlineStyleRanges\':[],\'entityRanges\':[],\'data\':{}}]}',
                'choices': {
                  'edges': [
                    {
                      'node': {
                        'id': 'Q2hvaWNlOjM3',
                        'text': '{\'entityMap\':{},\'blocks\':[{\'key\':\'bo88m\',\'text\':\'a\',\'type\':\'unstyled\',\'depth\':0,\'inlineStyleRanges\':[],\'entityRanges\':[],\'data\':{}}]}',
                        'made': false
                      }
                    }
                  ]
                }
              }
            },
            {
              'cursor': 'Y3Vyc29yOjUz',
              'node': {
                'id': 'UGFnZTo1Mw==',
                'text': '{\'entityMap\':{},\'blocks\':[{\'key\':\'a1mjs\',\'text\':\'antoher page\',\'type\':\'unstyled\',\'depth\':0,\'inlineStyleRanges\':[],\'entityRanges\':[],\'data\':{}}]}',
                'choices': {
                  'edges': [
                    {
                      'node': {
                        'id': 'Q2hvaWNlOjM2',
                        'text': '{\'entityMap\':{},\'blocks\':[{\'key\':\'4cmds\',\'text\':\'rety\',\'type\':\'unstyled\',\'depth\':0,\'inlineStyleRanges\':[],\'entityRanges\':[],\'data\':{}}]}',
                        'made': true
                      }
                    }
                  ]
                }
              }
            },
            {
              'cursor': 'Y3Vyc29yOjUy',
              'node': {
                'id': 'UGFnZTo1Mg==',
                'text': '{\'entityMap\':{},\'blocks\':[{\'key\':\'afcg\',\'text\':\'first PAge\',\'type\':\'unstyled\',\'depth\':0,\'inlineStyleRanges\':[],\'entityRanges\':[],\'data\':{}}]}',
                'choices': {
                  'edges': [
                    {
                      'node': {
                        'id': 'Q2hvaWNlOjM1',
                        'text': '{\'entityMap\':{},\'blocks\':[{\'key\':\'6reaa\',\'text\':\'2nd choice\',\'type\':\'unstyled\',\'depth\':0,\'inlineStyleRanges\':[],\'entityRanges\':[],\'data\':{}}]}',
                        'made': false
                      }
                    },
                    {
                      'node': {
                        'id': 'Q2hvaWNlOjM0',
                        'text': '{\'entityMap\':{},\'blocks\':[{\'key\':\'6reaa\',\'text\':\'ffff\',\'type\':\'unstyled\',\'depth\':0,\'inlineStyleRanges\':[],\'entityRanges\':[],\'data\':{}}]}',
                        'made': false
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    }
    expect(transformDataToPages(data)).toMatchSnapshot()
  })
})
