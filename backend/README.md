REQUEST SYNTAX

register: (path /register) json {username: $username, password: $password} -> 
  response: json {status: "dropped"} or json {status: "approved", token: $token}

login: (path /login) json {username: $username, password: $password} -> 
  response: json {status: "dropped"} or json {status: "approved", token: $token}

record mood: (path /record) json {token: $token, mood: $mood} -> 
  response: json {status: "dropped"} or json {status: "approved"}

get mood: (path /get) json {token: $token} ->
  response: json {status: "dropped"} or json {status: "approved", mood: 2DArray[[$mood, $date],[$mood, $date]]}
