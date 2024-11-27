import Fluent
import FluentPostgresDriver
import Vapor

func ConfigureConnection(_ app: Application) {
    app.databases.use(
        .postgres(
            configuration: .init(
                hostname: "localhost",
                port: 5440,
                username: "hackathonconnect",
                password: "vRexyDivQ5040MS",
                database: "hackathon",
                tls: .disable
            )
        ),
        as: .psql
    )
    
    app.migrations.add([
        CreateUsersTable(),
        CreateUsersMoodTable()
    ])
}

struct CreateUsersTable: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("users")
            .id()
            .field("username", .string)
            .field("password", .string)
            .field("created", .datetime)
            .create()
    }
    
    func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema("users").delete()
    }
}

struct CreateUsersMoodTable: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("users_mood")
            .id()
            .field("user_id", .uuid)
            .field("mood", .string)
            .field("created", .datetime)
            .create()
    }
    
    func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema("users_mood").delete()
    }
}

final class User: Model, Content, @unchecked Sendable {
    
    static let schema: String = "users"
    
    @ID(key: .id)
    var id: UUID?
    
    @Field(key: "username")
    var username: String
    
    @Field(key: "password")
    var password: String
    
    @Timestamp(key: "created", on: .create)
    var created: Date?
    
    init() {}
    
    init(id: UUID? = nil, username: String, password: String) {
        self.id = id
        self.username = username
        self.password = password
    }
}

final class UserMood: Model, Content, @unchecked Sendable {
    
    static let schema: String = "users_mood"
    
    @ID(key: .id)
    var id: UUID?
    
    @Field(key: "user_id")
    var userId: UUID
    
    @Field(key: "mood")
    var mood: String
    
    @Timestamp(key: "created", on: .create)
    var created: Date?
    
    init() {}
    
    init(userId: UUID, mood: String) {
        self.userId = userId
        self.mood = mood
    }
}
