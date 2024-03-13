import React, { Component } from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Listbox, } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import AppStateContext from '../../../utils/AppStateContext';
import axiosInstance from '../../../services/apiconfig';
import _ from 'underscore'

const people = [
    { name: 'Admin' },
    { name: 'SEO' },
    { name: 'Content Writter' },
];


class Example extends Component {

    static contextType = AppStateContext
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            photo: '',
            role: people[0],
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            cpassword: ''
        };
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (e) => {
        this.setState({ role: e.name });
        this.setState({ roleEdited: true });
    };

    firstnameChange = (e) => {
        this.setState({ firstname: e.target.value.replace(/\s/g, "") })
        this.setState({ firstnameEdited: true })
    }

    lastnameChange = (e) => {
        this.setState({ lastname: e.target.value.replace(/\s/g, "") })
        this.setState({ lastnameEdited: true })
    }

    emailChange = (e) => {
        this.setState({ email: e.target.value.replace(/\s/g, "") })
        this.setState({ emailEdited: true })
    }

    passwordChange = (e) => {
        this.setState({ password: e.target.value.replace(/\s/g, "") })
        this.setState({ passwordEdited: true })
    }
    cpasswordChange = (e) => {
        this.setState({ cpassword: e.target.value.replace(/\s/g, "") })
        this.setState({ cpasswordEdited: true })
    }

    userUpdate = () => {
        const { setEditUserModal, editUserData } = this.context;

        let cpassword = this.state.cpasswordEdited ? this.state.cpassword : editUserData.password


        const userData = {
            firstname: this.state.firstnameEdited ? this.state.firstname : editUserData.firstname,
            lastname: this.state.lastnameEdited ? this.state.lastname : editUserData.lastname,
            email: this.state.emailEdited ? this.state.email : editUserData.email,
            role: this.state.roleEdited ? this.state.role : editUserData.role,
            photo: this.state.photoEdited ? this.state.photo : editUserData.photo,
            password: this.state.passwordEdited ? this.state.password : editUserData.password,
            id: editUserData.id
        };

        if (_.isEmpty(userData.email) || _.isEmpty(userData.firstname) || _.isEmpty(userData.lastname) || _.isEmpty(userData.password)) {
            alert('fill the details')
        }
        else if (userData.password !== cpassword) {
            alert('Password and confirm password not same')
        }
        else {
            axiosInstance.post('/userEdit', userData).then((e) => {
                if (e.data.code === 200) {
                    this.setState({ roleEdited: false, firstnameEdited: false, lastnameEdited: false, emailEdited: false, passwordEdited: false, cpasswordEdited: false, photoEdited: false })
                    setEditUserModal(false);
                    this.props.reload()
                }
            }).catch((err) => console.log(err))
        }

    };

    userCancel = () => {
        const { setEditUserModal } = this.context;
        setEditUserModal(false)
    }

    handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            // Set the selected image to the state
            this.setState({ photo: reader.result });
            this.setState({ photoEdited: true });

        };

        if (selectedImage) {
            // Read the selected image as a data URL
            reader.readAsDataURL(selectedImage);
        }
    };


    componentDidMount() {
    }

    render() {

        return (
            <Transition.Root show={this.context.editUserModal} as={Fragment} onClose={this.handleClose}>
                <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:w-full sm:max-w-md sm:p-6">

                                <div className='flex justify-between'>
                                    <div className="col-span-full pb-4">
                                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                            Photo
                                        </label>
                                        <div className=" flex items-center gap-x-3 ">
                                            {
                                                this.state.photoEdited ?
                                                    <div className='h-12 w-12 rounded-full overflow-hidden flex'>
                                                        <img className='h-12 w-12 rounded' src={this.state.photo} alt="user profile" />
                                                    </div>
                                                    :
                                                    this.context.editUserData.photo ?

                                                        <div className='h-12 w-12 rounded-full overflow-hidden flex'>
                                                            <img className='h-12 w-12 rounded' src={this.context.editUserData.photo} alt="user profile" />
                                                        </div> :

                                                        <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                                            }

                                            <div className=" flex text-sm leading-6 text-gray-600 border border-gray px-3 py-2 rounded-lg">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white "
                                                >
                                                    <span className='text-black'>Upload</span>
                                                    <input onChange={this.handleImageChange} id="file-upload" accept="image/*" name="file-upload" type="file" className="sr-only" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="">
                                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                            Role *
                                        </label>
                                        <Listbox value={this.state.roleEdited ? this.state.role : this.context.editUserData ? this.context.editUserData.role : ''} onChange={this.handleChange}>
                                            <div className="relative mt-1">
                                                <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                                    <span className="block truncate capitalize">{this.state.roleEdited ? this.state.role : this.context.editUserData ? this.context.editUserData.role : this.state.role.name}</span>
                                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                        <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    </span>
                                                </Listbox.Button>
                                                <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute top-full right-0 w-fit overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                        {people.map((person, personIdx) => (
                                                            <Listbox.Option
                                                                key={personIdx}
                                                                className={({ active }) =>
                                                                    `relative cursor-default select-none py-2 px-5 ${active ? 'bg-red-100 text-red-500' : 'text-gray-900'
                                                                    }`
                                                                }
                                                                value={person}
                                                            >
                                                                {({ selected }) => (
                                                                    <>
                                                                        <span
                                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                                }`}
                                                                        >
                                                                            {person.name}
                                                                        </span>
                                                                        {selected ? (
                                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </Listbox>
                                    </div>
                                </div>

                                <div className="sm:col-span-3 pb-4">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        First name *
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={this.firstnameChange}
                                            defaultValue={this.context.editUserData.firstname}
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3 pb-4">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Last name *
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={this.lastnameChange}
                                            defaultValue={this.context.editUserData.lastname}
                                            type="text"
                                            name="first-name"
                                            id="last-name"
                                            autoComplete="given-name"
                                            className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3 pb-4">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email *
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={this.emailChange}
                                            defaultValue={this.context.editUserData.email}
                                            type="text"
                                            name="first-name"
                                            id="email"
                                            autoComplete="given-name"
                                            className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3 pb-4">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password *
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={this.passwordChange}
                                            defaultValue={this.context.editUserData.password}
                                            type="password"
                                            name="first-name"
                                            id="password"
                                            autoComplete="given-name"
                                            className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3 pb-4">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Conform Password *
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={this.cpasswordChange}
                                            defaultValue={this.context.editUserData.password}
                                            type="password"
                                            name="first-name"
                                            id="confirm-password"
                                            autoComplete="given-name"
                                            className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="mt-5 sm:mt-6 flex space-x-10 justify-center">
                                    <button onClick={this.userUpdate}
                                        type="button"
                                        className="mt-3 w-20 inline-flex justify-center  rounded-md bg-[#e84c3d] py-2 text-sm font-semibold text-white outline-none sm:mt-0"
                                    >
                                        Save
                                    </button>
                                    <button onClick={this.userCancel}
                                        type="button"
                                        className="mt-3 w-20 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 sm:mt-0 ring-1"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        );
    }
}

export default Example;
