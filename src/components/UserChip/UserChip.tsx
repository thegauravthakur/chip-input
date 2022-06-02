import { UserInfo } from '../../shared/user';
import { CrossIcon } from '../../icons/CrossIcon';
import './UserChip.css';
import { Dispatch, RefObject, SetStateAction } from 'react';

interface UserChipProps {
    user: UserInfo;
    setUsers: Dispatch<SetStateAction<UserInfo[]>>;
    allUsers: UserInfo[];
    searchInputRef: RefObject<HTMLInputElement>;
}

export function UserChip({
    user,
    setUsers,
    allUsers,
    searchInputRef,
}: UserChipProps) {
    function onCloseIconClick() {
        const users = [...allUsers];
        const selectedUser = users.find(({ email }) => email === user.email);
        if (selectedUser) {
            selectedUser.isSelected = false;
            setUsers(users);
        }
        searchInputRef.current?.focus();
    }
    return (
        <div
            tabIndex={0}
            className='user-chip-wrapper'
            aria-label={`${user.name} chip`}
            onKeyDown={(event) => {
                if (event.key === 'Backspace') {
                    onCloseIconClick();
                    searchInputRef.current?.focus();
                }
            }}
        >
            <img
                src={user.profileURL}
                className='user-chip-picture'
                alt={`${user.name} profile`}
            />
            <p>{user.name}</p>
            <CrossIcon
                ariaLabel={`remove ${user.name} chip`}
                onClick={onCloseIconClick}
            />
        </div>
    );
}
