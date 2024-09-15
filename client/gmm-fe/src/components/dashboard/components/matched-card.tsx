'use client'

import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faGlobe, faLocationDot, faUpDown, faUser, faWeightScale } from '@fortawesome/free-solid-svg-icons'
import { Link } from '@/lib/navigation'
import { User } from '@/lib/schemas/user'
import { useGetDownloadUrlQuery } from '@/lib/user/api'

export default function MatchedCard({ user }: { user: User }) {
    const { data: imageUrl } = useGetDownloadUrlQuery(user?.pictures ? user?.pictures[0] : '', { skip: (!user?.pictures || !user?.pictures[0]) });

    return (
        <div className='grid grid-cols-2 gap-4 h-full'>
            <div className="rounded-se-3xl rounded-es-3xl overflow-hidden h-full">
                {imageUrl && <Image
                    src={imageUrl}
                    className="object-cover w-full h-[21rem] object-top"
                    width={297}
                    height={400}
                    alt="Hero image"
                />
                }
                <div className="relative">
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent from-90%  to-muted-foreground"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
                        <h2 className="text-background font-semibold text-3xl">{user.firstName} {user.lastName}</h2>

                        <div className="space-y-2 font-thin">
                            <p className="flex gap-2 bg-[#ffffffbb] rounded-full truncate text-xs font-semibold px-2 shadow-lg">
                                <Image
                                    className="w-4 h-4"
                                    width={512}
                                    height={512}
                                    src={`/icons/lang/en.svg`}
                                    alt="Language Flag"
                                />
                                <span>{user.nationality} Nationality / Passport</span>
                            </p>
                            <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
                                <span>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </span>
                                <span>{user.city}, {user.country}</span>
                            </p>

                            <div className="flex gap-2">
                                <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
                                    <span>
                                        <FontAwesomeIcon icon={faUpDown} />
                                    </span>
                                    <span>{user.height} cm</span>
                                </p>
                                <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
                                    <span>
                                        <FontAwesomeIcon icon={faWeightScale} />
                                    </span>
                                    <span>{user.weight} kg </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-se-3xl rounded-es-3xl overflow-hidden flex flex-col bg-muted p-5 gap-5">
                <div className='text-center'>
                    <h1 className="font-bold text-secondary">You&apos;re Matched!</h1>
                    <p className='text-center text-xs text-muted-foreground'>Explore options below to get to know your potential spouse</p>
                </div>

                <div className='space-y-3'>
                    <Link href="/dashboard/compatibility/basic-information" className='flex gap-4 items-center'>
                        <div className='rounded-md bg-primary p-2 aspect-square text-primary-foreground flex items-center justify-center'><FontAwesomeIcon icon={faUser} /></div>
                        <span className='text-xs text-secondary font-bold'>View Profile</span>
                    </Link>
                    <Link href="/chat/1" className='flex gap-4 items-center'>
                        <div className='rounded-md bg-primary p-2 aspect-square text-primary-foreground flex items-center justify-center'><FontAwesomeIcon icon={faComment} /></div>
                        <span className='text-xs text-secondary font-bold'>Chat & Move to Step 2</span>
                    </Link>
                    <Link href="/dashboard/compatibility/basic-information" className='flex gap-4 items-center'>
                        <div className='rounded-md bg-primary p-2 aspect-square text-primary-foreground flex items-center justify-center'><FontAwesomeIcon icon={faUser} /></div>
                        <span className='text-xs text-secondary font-bold'>Check Compatibility</span>
                    </Link>
                    <Link href="" className='flex gap-4 items-center cursor-default'>
                        <div className='rounded-md bg-[#dedede] p-2 aspect-square text-primary-foreground flex items-center justify-center'><FontAwesomeIcon icon={faGlobe} /></div>
                        <span className='text-xs text-secondary font-bold'>Step 4 Guardian Service</span>
                    </Link>
                </div>
            </div>

        </div>
    )
}
