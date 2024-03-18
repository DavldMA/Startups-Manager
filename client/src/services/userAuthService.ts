export const register = async (values: any) => {
    
    try {
        const username: any = values.username;
        const password: any = values.password;
        const confirmPassword: any = values.confirmPassword;
        if (password !== confirmPassword) {
            return("Passwords do not match")
        }

        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'username': username,
                'password': password
            },
            body: JSON.stringify({})
        });

        const data = await response.json();

        return null;
    } catch {
        return("Something went wrong");
    }
}

export const login = async (values: any) => {
    try {
        const username: any = values.username;
        const password: any = values.password;
    
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json', 
            'username': username,
            'password': password
            },
            body: JSON.stringify({})
        });
    
        
    
        const data = await response.json();
        if(data.token) {
            localStorage.setItem("user", JSON.stringify(data))
            return null;
        } 
        return ("Login incorrect")
    } catch {
        return("Something went wrong");
    }
};

export const logout = () => {
    localStorage.clear();
    return 200
};

export const profile = async () => {
    const userStr = getCurrentUser()
    const token = userStr.token;
    const response = await fetch('http://localhost:8080/profile', {
        method: 'GET', 
        headers: {
        'Content-Type': 'application/json', 
        'token': token,
        },
    });
    const data = await response.json();
    return data[0];
};

export const isAdmin = async () => {
    const user = await profile()
    if(user.role === "admin") return true
    return false
}

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {return JSON.parse(userStr);}

    return userStr;
};