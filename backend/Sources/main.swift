import Vapor
import Fluent

// Configure the application
var env = try Environment.detect()
try LoggingSystem.bootstrap(from: &env)
let app = Application(env)
defer { app.shutdown() }
app.http.server.configuration.hostname = "127.0.0.1"
app.http.server.configuration.port = 8075
ConfigureConnection(app)
try app.autoMigrate().wait()

let corsConfig = CORSMiddleware(
    configuration: .init(
        allowedOrigin: .all,
        allowedMethods: [.GET, .POST, .PUT, .DELETE, .OPTIONS, .PATCH],
        allowedHeaders: [.accept, .authorization, .contentType, .origin, .xRequestedWith]
    )
)

app.middleware.use(corsConfig)

ConfigureRoutes(app: app)

try app.run()
