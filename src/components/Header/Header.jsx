import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const navItems = [
        {
            name: 'Home',
            path: '/',
            active: true
        },
        {
            name: 'Login',
            path: '/login',
            active: !authStatus
        },
        {
            name: 'Signup',
            path: '/signup',
            active: !authStatus
        },
        {
            name: 'All Posts',
            path: '/all-posts',
            active: authStatus
        },
        {
            name: 'Add Post',
            path: '/add-post',
            active: authStatus
        },
    ]
    return(
        <header className='py-4 shadow bg-gray-500'>
        <Container>
            <nav className='flex'>
                <div className='mr-4 absolute top-1'>
                    <Link to='/'>
                        <Logo width='100px' />
                    </Link>
                </div>
                <ul className='flex ml-auto'>
                    { navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>
                                <button 
                                    onClick={() => navigate(item.path)}
                                    className='inline-block px-6 py-2 duration-200 cursor-pointer hover:bg-blue-100 rounded-full'
                                >{item.name}</button>
                            </li>
                        ) : null
                    )}

                    { authStatus && (
                        <li>
                            <LogoutBtn />
                        </li>
                    )}
                </ul>
            </nav>
        </Container>
        </header>
    )
}

export default Header;