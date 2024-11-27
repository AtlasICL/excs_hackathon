//
//  File.swift
//  hackathon
//
//  Created by Mykhailo Artemiev on 27/11/2024.
//

import Foundation
import Vapor
import Fluent
import Crypto

func decodeRequest(req: Request) throws -> [String: Any] {
    return try (JSONSerialization.jsonObject(with: req.body.data!, options: []) as? [String: Any]) ?? [:]
}

func GenrerateResponse(dictionary: [String: Any]) -> Response {
    return Response(status: .ok, body: .init(data: try! JSONSerialization.data(withJSONObject: dictionary, options: [])))
}

func ValidateUser(token: UUID) async throws -> Bool {
    guard let _ = try await User.query(on: app.db).filter(\.$id == token).first() else {
        return false
    }
    return true
}
