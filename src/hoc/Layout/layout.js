import React, { Component } from 'react';
import './layout.css'


class Layout extends Component {

    state = {
      showNav:false
    }

    toggleSidenav = (action) =>{
        this.setState({
            showNav:action
        })
    }

    render(){
        return(
            <div>
                {this.props.children}
            </div>
        )
    }

}

export default Layout;

/*
Pete:  don't need a nav right now

import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';


<Header
                    showNav={this.state.showNav}
                    onHideNav={() => this.toggleSidenav(false)}
                    onOpenNav={() => this.toggleSidenav(true)}
                />


after this.props.children, looks like clutter to me
<Footer/>

*/