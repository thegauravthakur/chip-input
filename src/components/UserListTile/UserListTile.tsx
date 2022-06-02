﻿import { UserInfo } from '../../shared/user';
import { Dispatch, RefObject, SetStateAction } from 'react';
import './UserListTile.css';

interface UserListTileProps {
    user: UserInfo;
    allUsers: UserInfo[];
    setUsers: Dispatch<SetStateAction<UserInfo[]>>;
    inputValue: string;
    searchInputRef: RefObject<HTMLInputElement>;
}

function getModifiedName(name: string, searchTerm: string) {
    if (searchTerm.length === 0) return name;
    const startIndex = name.toLowerCase().indexOf(searchTerm.toLowerCase());
    const endIndex = startIndex + searchTerm.length;
    const matchedTerm = name.substring(startIndex, endIndex);
    return [
        name.substring(0, startIndex),
        <span key={matchedTerm} className='search-match'>
            {matchedTerm}
        </span>,
        name.substring(endIndex, name.length),
    ];
}

export function UserListTile({
    user,
    setUsers,
    allUsers,
    inputValue,
    searchInputRef,
}: UserListTileProps) {
    const modifiedName = getModifiedName(user.name, inputValue);
    function onListTileClick() {
        searchInputRef.current?.focus();
        const users = [...allUsers];
        const selectedUser = users.find(({ email }) => email === user.email);
        if (selectedUser) {
            selectedUser.isSelected = true;
            setUsers(users);
        }
        searchInputRef.current?.focus();
    }

    return (
        <li>
            <button
                className='list-item-wrapper'
                type='button'
                onClick={onListTileClick}
                aria-label={`select ${user.name}`}
            >
                <img
                    className='user-profile-picture'
                    src={user.profileURL}
                    alt={`${user.name} profile`}
                />
                <p className='user-name'>{modifiedName}</p>
                <p className='user-email'>{user.email}</p>
            </button>
        </li>
    );
}