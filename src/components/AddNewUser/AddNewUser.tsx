import React, {
    Dispatch,
    MutableRefObject,
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
    const containerRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);

    const usersToShow = useMemo(
        () => getUsersToShow(users, input),
        [input, users]
    );

    useClickAwayListener(() => {
        setIsInputFocused(false);
    }, containerRef);

    return (
        <div
            role='searchbox'
            ref={containerRef}
            className='add-new-user-container'
        >
            <input
                role='search'
                ref={searchInputRef}
                className='add-new-user-input'
                placeholder='Add new user...'
                type='text'
                onChange={(event) => {
                    setInput(event.target.value);
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
                <ul role='listbox' className='choose-user-container'>
                    {usersToShow.map((user) => (
                        <UserListTile
                            allUsers={users}
                            searchInputRef={searchInputRef}
                            setUsers={setUsers}
                            user={user}
                            inputValue={input}
                            key={user.email}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
