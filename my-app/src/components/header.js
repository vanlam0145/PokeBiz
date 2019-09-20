import React from "react";
import auth from '../auth';

export const Header = props => {
    return (
        <div>
            <header>
                <div className="profile-page sidebar-collapse">
                    <nav className="navbar navbar-expand-lg fixed-top bg-primary" color-on-scroll={400}>
                        <div className="container">
                            <div className="navbar-translate"><a className="navbar-brand" href="./home" rel="tooltip">Home</a>
                                <button className="navbar-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-bar bar1" /><span className="navbar-toggler-bar bar2" /><span className="navbar-toggler-bar bar3" /></button>
                            </div>
                            <div className="collapse navbar-collapse justify-content-end" id="navigation">
                                <ul className="navbar-nav">
                                    <li className="nav-item"><a className="nav-link smooth-scroll" href="./user">User</a></li>
                                    <li className="nav-item"><a className="nav-link smooth-scroll" href="./test">Test</a></li>
                                    <li className="nav-item"><a className="nav-link smooth-scroll" href="./bag">Bag</a></li>
                                    <li className="nav-item"><a className="nav-link smooth-scroll" href="#experience">Experience</a></li>
                                    <li className="nav-item"><a className="nav-link smooth-scroll" href="#contact">Contact</a></li>
                                    <li>
                                    <button type="button" class="btn btn-neutral btn-round" style={{ height: '2rem', }} onClick={() => {
                                        auth.logout(() => {
                                            props.history.push("/");
                                        });
                                    }}>Logout</button>
                                  </li>
                                    
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
            <div className="page-content">
            </div>
        </div>

    );
}
export default Header;