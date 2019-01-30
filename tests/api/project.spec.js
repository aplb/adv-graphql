const db = require('../db')
const { runQuery } = require('../run')
const projectResolvers = require('../../src/api/project/project.resolvers')

describe('Project', () => {
  beforeAll(db.connectToDB)
  afterAll(db.disconnectDB)
  afterEach(db.cleanDB)

  describe('resolvers', () => {
    describe('project', () => {
      test('should resolve correctly', async () => {
        const input = { name: 'test', description: 'test' }

        const result = await projectResolvers.Mutation.newProject(
          {},
          { input },
          {
            models: {
              project: db.models.project
            }
          })
          
          expect(result).toBeDefined()
          expect(result.name).toEqual(input.name)
          expect(result.description).toEqual(input.description)
      })

      test('should have correct query', async () => {
        const input = { name: 'test', description: 'test' }

        const { data, errors } = await runQuery(`
          mutation test($input: NewProjectInput!) {
            newProject (input: $input) {
              name
              description
            }
          }
        `, { input })

        expect(errors).toBeUndefined()
        expect(data.newProject.name).toEqual(input.name)
        expect(data.newProject.description).toEqual(input.description)
      })
    })
  })
})
