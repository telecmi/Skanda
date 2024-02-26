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
    blogMetaData: '',
    blogOgData: '',
    blogArtData: '',
    blogTwitterData: '',
    blogTableData: '',
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
  setBlogMetaData = (e) => { this.setState({ blogMetaData: e }) };
  setBlogOgData = (e) => { this.setState({ blogOgData: e }) };
  setBlogArtData = (e) => { this.setState({ blogArtData: e }) };
  setBlogTwitterData = (e) => { this.setState({ blogTwitterData: e }) };
  setBlogTableData = (e) => { this.setState({ blogTableData: e }) };

  render() {
    const { children } = this.props;
    const { editUserModal, deleteUserModal, addUserModal, editUserData, deleteBlogModal, editBlogData, addBlogModal, deleteBlogData, editBlogModal, blogMetaData, blogArtData, blogOgData, blogTwitterData, blogTableData } = this.state;

    return (
      <AppStateContext.Provider
        value={{
          addUserModal, editUserModal, deleteUserModal, editUserData, deleteBlogModal, editBlogData, addBlogModal, deleteBlogData, editBlogModal, blogMetaData, blogArtData, blogOgData, blogTwitterData, blogTableData,

          setAddUserModal: this.setAddUserModal, setEditUserModal: this.setEditUserModal, setDeleteUserModal: this.setDeleteUserModal, setEditUserData: this.setEditUserData, setDeleteBlogModal: this.setDeleteBlogModal, setEditBlogData: this.setEditBlogData, setAddBlogModal: this.setAddBlogModal, setDeleteBlogData: this.setDeleteBlogData, setEditBlogModal: this.setEditBlogModal, setBlogMetaData: this.setBlogMetaData, setBlogArtData: this.setBlogArtData, setBlogOgData: this.setBlogOgData, setBlogTwitterData: this.setBlogTwitterData, setBlogTableData: this.setBlogTableData
        }}
      >
        {children}
      </AppStateContext.Provider>
    );
  }
}

export default AppStateContext