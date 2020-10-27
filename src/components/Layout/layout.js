import React from 'react';
import { Link } from 'react-router-dom';

import './layout.css';

function Layout(props) {
    return (
        <div className="module-border-wrap">
            <div className="module">
                <nav className="navigation">
                    <Link to="/">
                        Birbs
                    </Link>
                    <section>
                        <Link to="/register">
                            Sign up
                        </Link>
                        <Link to="/login">
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
