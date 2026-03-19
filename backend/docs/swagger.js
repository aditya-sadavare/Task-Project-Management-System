const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task & Project Management API',
      version: '1.0.0',
      description:
        `Backend API for a Task & Project Management System built with Node.js, Express, PostgreSQL, and JWT authentication.

## First time? How to use JWT token in Swagger

1. Get a token:
   - Use **POST /api/auth/register** (first time) or **POST /api/auth/login**.
   - Click **Try it out** → fill the body → **Execute**.
   - Copy the \`token\` from the response.

2. Authorize in Swagger:
   - Click the **Authorize** button (top-right).
   - Paste: \`Bearer <token>\`
     - Example: \`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\`
   - Click **Authorize** → Close.

3. Call protected endpoints:
   - Swagger will automatically send \`Authorization: Bearer <token>\`.

Notes:
- If you see **401**, login again and re-authorize (token missing/expired).
- Some endpoints require roles (Manager/Admin/Admin).`
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'Paste your JWT here as: `Bearer <token>` (get token from POST /api/auth/login or /api/auth/register).'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
            role: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' }
          }
        },
        Project: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            description: { type: 'string' },
            start_date: { type: 'string', format: 'date' },
            end_date: { type: 'string', format: 'date' },
            status: { type: 'string' },
            created_by: { type: 'integer' },
            created_at: { type: 'string', format: 'date-time' }
          }
        },
        Task: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            description: { type: 'string' },
            priority: { type: 'string' },
            status: { type: 'string' },
            due_date: { type: 'string', format: 'date' },
            assigned_user: { type: 'integer', nullable: true },
            project_id: { type: 'integer', nullable: true }
          }
        },
        Comment: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            task_id: { type: 'integer' },
            user_id: { type: 'integer' },
            comment_text: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' }
          }
        },
        ProjectMember: {
          type: 'object',
          description: 'Join table between projects and users',
          properties: {
            project_id: { type: 'integer' },
            user_id: { type: 'integer' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    paths: {
      '/api/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'Register a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'password'],
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', format: 'password' },
                    role: {
                      type: 'string',
                      enum: ['Admin', 'Manager', 'User']
                    }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: 'User registered',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/User' }
                }
              }
            },
            400: { description: 'Email already registered' }
          }
        }
      },
      '/api/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Login and obtain JWT',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', format: 'password' }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Login successful',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      token: { type: 'string' },
                      user: { $ref: '#/components/schemas/User' }
                    }
                  }
                }
              }
            },
            401: { description: 'Invalid credentials' }
          }
        }
      },
      '/api/projects': {
        post: {
          tags: ['Projects'],
          summary: 'Create project (Manager/Admin)',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: {
                    name: { type: 'string', example: 'Library Management System' },
                    description: { type: 'string', example: 'Manage books, members, and lending.' },
                    start_date: { type: 'string', format: 'date', example: '2026-03-10' },
                    end_date: { type: 'string', format: 'date', example: '2026-04-10' },
                    status: { type: 'string', enum: ['Planned', 'Active', 'Completed'], example: 'Active' }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Project created',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Project' }
                }
              }
            }
          }
        },
        get: {
          tags: ['Projects'],
          summary: 'List all projects',
          responses: {
            200: {
              description: 'List of projects',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Project' }
                  }
                }
              }
            }
          }
        }
      },
      '/api/projects/{id}': {
        get: {
          tags: ['Projects'],
          summary: 'Get project by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            200: {
              description: 'Project found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Project' }
                }
              }
            },
            404: { description: 'Project not found' }
          }
        },
        put: {
          tags: ['Projects'],
          summary: 'Update project (Manager/Admin)',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    start_date: { type: 'string', format: 'date' },
                    end_date: { type: 'string', format: 'date' },
                    status: { type: 'string', enum: ['Planned', 'Active', 'Completed'] }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Project updated',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Project' }
                }
              }
            },
            404: { description: 'Project not found' }
          }
        },
        delete: {
          tags: ['Projects'],
          summary: 'Delete project (Manager/Admin)',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'integer' }
            }
          ],
          responses: {
            204: { description: 'Project deleted' }
          }
        }
      },
      '/api/tasks': {
        post: {
          tags: ['Tasks'],
          summary: 'Create task (Manager/Admin)',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['title', 'description', 'due_date'],
                  properties: {
                    title: { type: 'string', example: 'Setup DB' },
                    description: { type: 'string', example: 'Create PostgreSQL database and tables' },
                    priority: { type: 'string', enum: ['Low', 'Medium', 'High'], example: 'High' },
                    status: { type: 'string', enum: ['Pending', 'In Progress', 'Completed'], example: 'Pending' },
                    due_date: { type: 'string', format: 'date', example: '2026-03-20' },
                    assigned_user_id: { type: 'integer', nullable: true, example: 1 },
                    project_id: { type: 'integer', nullable: true, example: 1 }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Task created',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Task' }
                }
              }
            }
          }
        },
        get: {
          tags: ['Tasks'],
          summary: 'List all tasks',
          responses: {
            200: {
              description: 'List of tasks',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Task' }
                  }
                }
              }
            }
          }
        }
      },
      '/api/tasks/{id}': {
        get: {
          tags: ['Tasks'],
          summary: 'Get task by id',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: { description: 'Task found' },
            404: { description: 'Task not found' }
          }
        },
        put: {
          tags: ['Tasks'],
          summary: 'Update task (User can update status; Manager/Admin can update non-status fields)',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  description:
                    "User role may update 'status'. Manager/Admin should update other fields (e.g. priority, due_date, assignment).",
                  properties: {
                    status: { type: 'string', enum: ['Pending', 'In Progress', 'Completed'] },
                    title: { type: 'string' },
                    description: { type: 'string' },
                    priority: { type: 'string', enum: ['Low', 'Medium', 'High'] },
                    due_date: { type: 'string', format: 'date' },
                    assigned_user: { type: 'integer', nullable: true, description: 'User ID' },
                    project_id: { type: 'integer', nullable: true }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Task updated' },
            404: { description: 'Task not found' }
          }
        },
        delete: {
          tags: ['Tasks'],
          summary: 'Delete task (Manager/Admin)',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            204: { description: 'Task deleted' }
          }
        }
      },
      '/api/comments': {
        post: {
          tags: ['Comments'],
          summary: 'Create comment on task',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['task_id', 'comment_text'],
                  properties: {
                    task_id: { type: 'integer', example: 1 },
                    comment_text: { type: 'string', example: 'I started working on this.' }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Comment created',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Comment' }
                }
              }
            }
          }
        }
      },
      '/api/comments/{taskId}': {
        get: {
          tags: ['Comments'],
          summary: 'Get comments for task',
          parameters: [
            { name: 'taskId', in: 'path', required: true, schema: { type: 'integer' } }
          ],
          responses: {
            200: {
              description: 'List of comments',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Comment' }
                  }
                }
              }
            }
          }
        }
      },
      '/api/dashboard/user': {
        get: {
          tags: ['Dashboard'],
          summary: 'User dashboard (task stats for assigned user)',
          responses: {
            200: {
              description: 'Dashboard data',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      totalTasks: { type: 'integer' },
                      completedTasks: { type: 'integer' },
                      pendingTasks: { type: 'integer' },
                      inProgressTasks: { type: 'integer' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/api/dashboard/manager': {
        get: {
          tags: ['Dashboard'],
          summary: 'Manager dashboard (Manager: own projects; Admin: global totals)',
          responses: {
            200: {
              description: 'Dashboard data',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      totalProjects: { type: 'integer' },
                      totalTasks: { type: 'integer' },
                      completedTasks: { type: 'integer' },
                      pendingTasks: { type: 'integer' },
                      inProgressTasks: { type: 'integer' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/api/admin/users': {
        get: {
          tags: ['Admin'],
          summary: 'Get all users (Admin)',
          responses: {
            200: {
              description: 'List of users',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          }
        }
      },
      '/api/admin/user-role': {
        put: {
          tags: ['Admin'],
          summary: 'Update user role (Admin)',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['userId', 'role'],
                  properties: {
                    userId: { type: 'integer', example: 5 },
                    role: { type: 'string', enum: ['Admin', 'Manager', 'User'], example: 'Manager' }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'User updated',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/User' }
                }
              }
            },
            404: { description: 'User not found' }
          }
        }
      }
    }
  },
  apis: []
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

