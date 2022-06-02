import { UserInfo } from '../../lib/users';
import {
    Dispatch,
    MutableRefObject,
    RefObject,
    SetStateAction,
    KeyboardEvent,
} from 'react';
import './UserListTile.css';

interface UserListTileProps {
    user: UserInfo;
    allUsers: UserInfo[];
    setUsers: Dispatch<SetStateAction<UserInfo[]>>;
    setSearchValue: Dispatch<SetStateAction<string>>;
    inputValue: string;
    searchInputRef: RefObject<HTMLInputElement>;
    insertOrder: MutableRefObject<number>;
}

function focusNextElement(event: KeyboardEvent<HTMLButtonElement>) {
    event.preventDefault();
    const targetElement =
        event.currentTarget.parentElement?.nextSibling?.firstChild;
    if (targetElement) (targetElement as HTMLFormElement).focus();
}

function focusPreviousElement(
    event: KeyboardEvent<HTMLButtonElement>,
    searchInputRef: RefObject<HTMLInputElement>
) {
    event.preventDefault();
    const targetElement =
        event.currentTarget.parentElement?.previousSibling?.firstChild;
    // check if active element is the first element in the list
    // in such case move focus to input element
    if (
        event.currentTarget.parentElement?.parentElement?.firstChild ===
        document.activeElement?.parentElement
    )
        searchInputRef.current?.focus();
    else if (targetElement) (targetElement as HTMLFormElement).focus();
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
    insertOrder,
    setSearchValue,
}: UserListTileProps) {
    const modifiedName = getModifiedName(user.name, inputValue);
    function onListTileClick() {
        searchInputRef.current?.focus();
        const users = [...allUsers];
        const selectedUser = users.find(({ email }) => email === user.email);
        if (selectedUser) {
            selectedUser.isSelected = true;
            selectedUser.order = insertOrder.current + 1;
            insertOrder.current += 1;
            setUsers(users);
        }
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
            setSearchValue('');
            searchInputRef.current.focus();
        }
    }

    return (
        <li>
            <button
                className='list-item-wrapper'
                type='button'
                onClick={onListTileClick}
                aria-label={`select ${user.name}`}
                onKeyDown={(event) => {
                    if (event.key === 'ArrowDown') focusNextElement(event);
                    if (event.key === 'ArrowUp')
                        focusPreviousElement(event, searchInputRef);
                }}
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
