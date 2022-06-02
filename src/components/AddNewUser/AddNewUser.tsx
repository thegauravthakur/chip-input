import React, {
    Dispatch,
    RefObject,
    SetStateAction,
    useMemo,
    useRef,
    useState,
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
                        event.currentTarget.value === ''
                    ) {
                        const targetElement =
                            event.currentTarget.parentElement
                                ?.previousElementSibling;
                        if (targetElement) {
                            setIsInputFocused(false);
                            (targetElement as HTMLInputElement).focus();
                        }
                    }
                }}
            />
            {isInputFocused && (
                <ul
                    aria-label='search results'
                    className='choose-user-container'
                >
                    {usersToShow.map((user) => (
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
