import React from 'react';
import { Link } from 'react-navi';

import './layout.css';

function Layout(props) {
    return (
        <div className="module-border-wrap">
            <div className="module">
                <nav className="navigation">
                    <Link href="/">
                        Birbs
                    </Link>
                    <section>
                        <Link href="/register">
                            Sign up
                        </Link>
                        <Link href="/login">
                            Login
                        </Link>
                    </section>
                </nav>
                {props.children}
            </div>
        </div>
    );
}

export default Layout;
