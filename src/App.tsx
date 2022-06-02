import React, { useMemo, useRef, useState } from 'react';
import { AddNewUser } from './components/AddNewUser';
import { UserInfo, usersInfo } from './shared/user';
import './App.css';
import { UserChip } from './components/UserChip';

function getUsersToShow(users: UserInfo[]) {
    return users.filter(({ isSelected }) => isSelected);
}

function App() {
    const [users, setUsers] = useState(usersInfo);
    const usersToShow = useMemo(() => getUsersToShow(users), [users]);
    const searchInputRef = useRef<HTMLInputElement>(null);

    return (
        <main className='user-box'>
            {usersToShow.map((user) => (
                <UserChip
                    setUsers={setUsers}
                    allUsers={users}
                    key={user.email}
                    user={user}
                    searchInputRef={searchInputRef}
                />
            ))}
            <AddNewUser
                searchInputRef={searchInputRef}
                setUsers={setUsers}
                users={users}
            />
        </main>
    );
}

export default App;
