import React from 'react'
import user from "../../../../assets/coverimage.jpg"

const PageNotifiFriendsNews = () => {
    return (
        <div className='flex justify-between items-center w-full m-1 p-1 border-2 shadow-xl '>
            <div className="h-12 w-12 rounded-full">
                <img src={user} alt="page image" className='h-full w-full object-cover' />
            </div>
            <div className="flex flex-col justify-center items-start w-44">
                <p className="font-bold text-base">
                    page, friends, Notification
                </p>
                <p className="text-sm">
                    Category
                </p>
            </div>
        </div>
    )
}

export default PageNotifiFriendsNews