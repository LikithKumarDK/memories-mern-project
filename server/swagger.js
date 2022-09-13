import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Memories API',
      description: 'A Simple Express Memories API',
      version: '1.0.0',
    },
    basePath: '/',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT"
        },
        // jwt: {
        //   type: "http",
        //   scheme: "bearer",
        //   in: "header",
        //   bearerFormat: "JWT"
        // },
      }
    },
    security: [{
      bearerAuth: [],
      // jwt: []
    }],
  },
  // looks for configuration in specified directories
  apis: ['./routes/*.js'],
});

function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

export default swaggerDocs