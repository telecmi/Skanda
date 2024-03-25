import React, { Component } from 'react';
import UsersList from './user/users'
import BlogData from './blog/blog'
import Header from './layout/header'
import SideBar from './layout/sidebar'
import SideBarMob from './layout/sidebarMob';
import Category from './category/category';
import AppStateContext from '../../utils/AppStateContext';
import { Navigate } from 'react-router-dom'


class Example extends Component {

    static contextType = AppStateContext
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            currentNavigation: '',
            addUserModal: false,
            editUserModal: false,
            deleteUserModal: false,
        };
    }

    componentDidMount() {
        const currentPath = window.location.pathname.substring(1);

        if (currentPath === 'home') {
            this.setState({ currentNavigation: 'blog' });
        } else {
            this.setState({ currentNavigation: 'blog' });
        }

        const userData = JSON.parse(localStorage.getItem('user'));

        if (!userData) {
            this.setState({ navigate: true })
        }
    }

    redirect = (e) => {
        this.setState({ currentNavigation: e });
    }

    addUserModalBool = () => {
        this.setState({ addUserModal: true })
    }

    addUser = () => {
        this.setState({ addUserModal: false })
    }

    editUser = () => {
        this.setState({ editUserModal: true })
    }

    DeleteUser = () => {
        this.setState({ deleteUserModal: true })
    }



    render() {

        return (
            <>
                {this.state.navigate && <Navigate to='/' />}

                <SideBarMob redirect={this.redirect} />

                <SideBar redirect={this.redirect} />

                <div className="lg:pl-72">

                    {this.context.addBlogModal || this.context.editBlogModal ? '' : <Header />}

                    <div className="px-2 sm:px-6 lg:px-8">
                        {
                            this.state.currentNavigation === 'blog' &&
                            <BlogData />
                        }
                        {
                            this.state.currentNavigation === 'category' &&
                            <Category />
                        }
                        {
                            this.state.currentNavigation === 'users' && <UsersList addUser={this.addUserModalBool} editUser={this.editUser} deleteUser={this.deleteUser} />
                        }
                    </div>
                </div>

            </>
        );
    }
}

export default Example;
