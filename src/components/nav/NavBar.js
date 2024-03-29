

export const NavBar = ({ isLoggedIn, onLogout }) => {
    return (
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/search">Search</a></li>
                {isLoggedIn ? (<li><button onClick={onLogout}>Logout</button></li>) : (
                    <li><a href="/login">Login</a></li>
                )}
            </ul>
        </nav>
    )
}