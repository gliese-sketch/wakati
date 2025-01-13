import { apiReference } from '@scalar/hono-api-reference'

import type { OpenAPIHono } from "@hono/zod-openapi";
import packageJSON from '../../package.json'

export default function configureOpenAPI(app: OpenAPIHono) {
    app.doc('/doc', {
        openapi: '3.0.0',
        info: {
            version: packageJSON.version,
            title: 'Wakati',
            description: "Text Intelligence Platform"
        },
    })


    app.get(
        '/reference',
        apiReference({
            theme: "elysiajs",
            spec: {
                url: '/doc',
            },
        }),
    )

}