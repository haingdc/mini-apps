import Link from 'next/link'

const linkStyle = {
 marginRight: 15
}

const Header = () => (
 <div>
   <Link href='/' style={linkStyle}>
     <a>Home</a>
   </Link>
   <Link href='/about' style={linkStyle}>
     <a>About</a>
   </Link>
 </div>
)

export default Header