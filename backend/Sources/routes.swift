import Foundation
import Vapor

func ConfigureRoutes(app: Application) {
    
    app.post("register") { req in
        return try await RegisterRequest(req: req)
    }
    
    app.post("login") { req in
        return try await LoginRequest(req: req)
    }
    
    app.post("record") { req in
        return try await RecordRequest(req: req)
    }
    
    app.post("get") { req in
        return try await GetRequest(req: req)
    }
}
