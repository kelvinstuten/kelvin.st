
import Link from "next/link";

const navLinks = [
    {title: 'Home', path: '/'},
    {title: 'About', path: '/about'},
    {title: 'Contact', path: '/contact'}
]

export default function Header() {
    return (
        <header className="bg-gray-500">
            <div className="container flex">
                <ul className="flex space-x-12">
                    {navLinks.map((item) =>(
                        <li key={item.title}>
                            <Link href={item.path}>
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}
