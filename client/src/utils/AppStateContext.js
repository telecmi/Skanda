import React, { Component, createContext } from 'react';

const AppStateContext = createContext();

export class AppStateProvider extends Component {
  state = {
    addUserModal: false,
    editUserModal: false,
    deleteUserModal: false,
    editUserData: '',
    deleteBlogModal: false,
    editBlogData: '',
    deleteBlogData: '',
    addBlogModal: false,
    editBlogModal: false,
  };

  setAddUserModal = (e) => { this.setState({ addUserModal: e }) };
  setEditUserModal = (e) => { this.setState({ editUserModal: e }) };
  setDeleteUserModal = (e) => { this.setState({ deleteUserModal: e }) };
  setEditUserData = (e) => { this.setState({ editUserData: e }) };
  setDeleteBlogModal = (e) => { this.setState({ deleteBlogModal: e }) };
  setEditBlogData = (e) => { this.setState({ editBlogData: e }) };
  setAddBlogModal = (e) => { this.setState({ addBlogModal: e }) };
  setEditBlogModal = (e) => { this.setState({ editBlogModal: e }) };
  setDeleteBlogData = (e) => { this.setState({ deleteBlogData: e }) };

  render() {
    const { children } = this.props;
    const { editUserModal, deleteUserModal, addUserModal, editUserData, deleteBlogModal, editBlogData, addBlogModal, deleteBlogData, editBlogModal } = this.state;

    return (
      <AppStateContext.Provider
        value={{
          addUserModal, editUserModal, deleteUserModal, editUserData, deleteBlogModal, editBlogData, addBlogModal, deleteBlogData, editBlogModal,

          setAddUserModal: this.setAddUserModal, setEditUserModal: this.setEditUserModal, setDeleteUserModal: this.setDeleteUserModal, setEditUserData: this.setEditUserData, setDeleteBlogModal: this.setDeleteBlogModal, setEditBlogData: this.setEditBlogData, setAddBlogModal: this.setAddBlogModal, setDeleteBlogData: this.setDeleteBlogData, setEditBlogModal: this.setEditBlogModal
        }}
      >
        {children}
      </AppStateContext.Provider>
    );
  }
}

export default AppStateContext