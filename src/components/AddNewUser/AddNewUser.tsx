import React, {
    Dispatch,
    RefObject,
    SetStateAction,
    useMemo,
    useRef,
    useState,
    KeyboardEvent,
} from 'react';
import { UserListTile } from '../UserListTile';
import './AddNewUser.css';
import { UserInfo } from '../../lib/users';
import { useClickAwayListener } from '../../hooks/ClickAwayListener';

interface AddNewUserProps {
    users: UserInfo[];
    setUsers: Dispatch<SetStateAction<UserInfo[]>>;
    searchInputRef: RefObject<HTMLInputElement>;
}

function focusFirstSuggestion(event: KeyboardEvent<HTMLInputElement>) {
    const targetElement =
        event.currentTarget.nextSibling?.firstChild?.firstChild;
    if (targetElement) {
        (targetElement as HTMLFormElement).focus();
    }
}

function focusPreviousChip(event: KeyboardEvent<HTMLInputElement>) {
    const targetElement =
        event.currentTarget.parentElement?.previousElementSibling;
    if (targetElement) {
        (targetElement as HTMLInputElement).focus();
    }
}

function getUsersToShow(users: UserInfo[], input: string) {
    return users.filter(
        ({ name, isSelected }) =>
            name.toLowerCase().includes(input.toLowerCase()) && !isSelected
    );
}

export function AddNewUser({
    users,
    setUsers,
    searchInputRef,
}: AddNewUserProps) {
    const searchBoxRef = useRef<HTMLDivElement>(null);
    const [searchValue, setSearchValue] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const insertOrder = useRef(0);

    const usersToShow = useMemo(
        () => getUsersToShow(users, searchValue),
        [searchValue, users]
    );

    useClickAwayListener(() => {
        setIsInputFocused(false);
    }, searchBoxRef);

    return (
        <div
            role='searchbox'
            aria-label='user search box'
            ref={searchBoxRef}
            className='add-new-user-container'
        >
            <input
                role='search'
                ref={searchInputRef}
                className='add-new-user-input'
                placeholder='Add new user...'
                aria-label='search for new user'
                type='text'
                onChange={(event) => {
                    setSearchValue(event.target.value);
                }}
                onFocus={() => setIsInputFocused(true)}
                onKeyDown={(event) => {
                    if (
                        event.key === 'Backspace' &&
                        event.currentTarget.value === '' &&
                        users.some((user) => user.isSelected)
                    ) {
                        focusPreviousChip(event);
                        setIsInputFocused(false);
                    }

                    if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        focusFirstSuggestion(event);
                    }
                }}
            />
            {isInputFocused && (
                <ul
                    aria-label='search results'
                    className='choose-user-container'
                >
                    {usersToShow.map((user, index) => (
                        <UserListTile
                            allUsers={users}
                            searchInputRef={searchInputRef}
                            setSearchValue={setSearchValue}
                            setUsers={setUsers}
                            user={user}
                            inputValue={searchValue}
                            key={user.email}
                            insertOrder={insertOrder}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
