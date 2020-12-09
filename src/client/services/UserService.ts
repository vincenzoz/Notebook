import { User } from "../../shared/models/User"

function getMockUser(): User {
    const mockedUser: User = {
        username: "Jhon",
        email: "user@mail.com",
        password: ""
    }

    return mockedUser
}

export default getMockUser